import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { validateEnquiry, ValidatedEnquiry } from '../middleware/validateEnquiry.js';
import { enquiryLimiter, authLimiter } from '../middleware/ratelimiter.js';
import { isDbConnected } from '../db/connection.js';
import { sendNotificationToFounder, sendConfirmationToVisitor } from '../services/emailService.js';
import { syncToCrm } from '../services/crmAdapter.js';
import { env } from '../config/env.js';
import {
  saveEnquiryRecord,
  fetchAllEnquiries,
  updateStatus,
  deleteRecord,
} from '../services/enquiryStore.js';
import {
  generateAdminToken,
  revokeAdminToken,
  requireAdminAuth,
} from '../middleware/auth.js';

const router = Router();

/**
 * Health check & configuration status endpoint
 */
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    integrations: {
      database: {
        configured: env.isDatabaseConfigured,
        connected: isDbConnected(),
      },
      email: {
        configured: env.isEmailConfigured,
      },
      crmAdapter: {
        configured: env.isCrmConfigured,
      },
    },
  });
});

/**
 * Client project enquiry submission endpoint
 */
router.post(
  '/enquiries',
  enquiryLimiter,
  validateEnquiry,
  async (req: Request, res: Response): Promise<void> => {
    const enquiryData: ValidatedEnquiry = req.body;
    const clientIp = req.ip || req.socket.remoteAddress || '';

    // Persist enquiry to MongoDB and guaranteed persistent backup
    const { id: recordId, savedToDb } = await saveEnquiryRecord(enquiryData, clientIp);

    let emailDispatched = false;
    let visitorConfirmed = false;

    // Send email notification to Saurabh if configured
    if (env.isEmailConfigured) {
      try {
        const notifyResult = await sendNotificationToFounder(enquiryData);
        if (notifyResult.sent) {
          emailDispatched = true;
          console.log(`[Enquiry] Notification sent to Saurabh for ${enquiryData.email}`);
        }

        const confirmResult = await sendConfirmationToVisitor(enquiryData);
        if (confirmResult.sent) {
          visitorConfirmed = true;
          console.log(`[Enquiry] Confirmation receipt sent to client ${enquiryData.email}`);
        }
      } catch (err) {
        console.error('[Enquiry] Email dispatch notice:', err);
      }
    }

    // Optional CRM / Google Sheets sync
    if (env.isCrmConfigured) {
      syncToCrm(enquiryData).catch((err) => {
        console.warn('[Enquiry] CRM sync background notice:', err);
      });
    }

    res.status(201).json({
      success: true,
      message:
        'Thank you! Your project enquiry has been successfully received. Saurabh will review your brief and respond within 24-48 business hours.',
      data: {
        enquiryId: recordId,
        savedToDatabase: savedToDb,
        notificationSent: emailDispatched,
        confirmationSent: visitorConfirmed,
      },
    });
  }
);

/**
 * Helper function for constant-time cryptographic string comparison
 * Prevents timing attack side channels during password verification
 */
function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Admin Authentication: Login
 * Protected with authLimiter to prevent brute-force attacks
 */
router.post('/auth/login', authLimiter, (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: 'MISSING_CREDENTIALS',
      message: 'Please provide both email and password.',
    });
    return;
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const isValidEmail =
    cleanEmail === env.ADMIN_EMAIL || cleanEmail === 'admin';
  const isValidPass = typeof password === 'string' && timingSafeCompare(password, env.ADMIN_PASSWORD);

  if (!isValidEmail || !isValidPass) {
    res.status(401).json({
      success: false,
      error: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password. Please verify your credentials.',
    });
    return;
  }

  const token = generateAdminToken(env.ADMIN_EMAIL);

  res.json({
    success: true,
    message: 'Welcome back, Saurabh! Logged in successfully.',
    token,
    user: {
      name: 'Saurabh Sharma',
      email: env.ADMIN_EMAIL,
      role: 'Founder & Administrator',
    },
  });
});

/**
 * Admin Authentication: Logout
 */
router.post('/auth/logout', (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    revokeAdminToken(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

/**
 * Admin Authentication: Verify Session
 */
router.get('/auth/me', requireAdminAuth, (_req: Request, res: Response): void => {
  res.json({
    success: true,
    user: {
      name: 'Saurabh Sharma',
      email: env.ADMIN_EMAIL,
      role: 'Founder & Administrator',
    },
  });
});

/**
 * Admin Portal: Get all client enquiries
 */
router.get(
  '/admin/enquiries',
  requireAdminAuth,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const enquiries = await fetchAllEnquiries();
      res.json({
        success: true,
        count: enquiries.length,
        enquiries,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: 'FETCH_FAILED',
        message: 'Could not retrieve enquiries.',
      });
    }
  }
);

/**
 * Admin Portal: Update enquiry status (new, reviewed, responded, archived)
 */
router.patch(
  '/admin/enquiries/:id/status',
  requireAdminAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);
    const { status } = req.body;

    const validStatuses = ['new', 'reviewed', 'responded', 'archived'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        error: 'INVALID_STATUS',
        message: 'Status must be one of: new, reviewed, responded, archived',
      });
      return;
    }

    const success = await updateStatus(id, status);
    if (!success) {
      res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Enquiry record not found.',
      });
      return;
    }

    res.json({
      success: true,
      message: `Enquiry marked as "${status}".`,
    });
  }
);

/**
 * Admin Portal: Delete an enquiry
 */
router.delete(
  '/admin/enquiries/:id',
  requireAdminAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);
    const deleted = await deleteRecord(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Enquiry not found or already deleted.',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  }
);

export default router;
