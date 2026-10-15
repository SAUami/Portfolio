import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// In-memory active admin sessions map: token -> { email, expiresAt }
const activeSessions = new Map<string, { email: string; expiresAt: number }>();

export function generateAdminToken(email: string): string {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  const token = `adm_${randomBytes}`;
  // Session valid for 7 days
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  activeSessions.set(token, { email, expiresAt });
  return token;
}

export function revokeAdminToken(token: string): void {
  activeSessions.delete(token);
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Access denied. Please log in with admin credentials.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);

  if (!session) {
    res.status(401).json({
      success: false,
      error: 'INVALID_SESSION',
      message: 'Your session has expired or is invalid. Please log in again.',
    });
    return;
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    res.status(401).json({
      success: false,
      error: 'SESSION_EXPIRED',
      message: 'Session expired. Please log in again.',
    });
    return;
  }

  next();
}
