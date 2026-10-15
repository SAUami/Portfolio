import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { connectToDatabase } from './db/connection.js';
import enquiryRoutes from './routes/EnquiryRoutes.js';
import { generalApiLimiter } from './middleware/ratelimiter.js';

export const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      // In development, allow localhost origins
      if (env.NODE_ENV === 'development' || origin.includes('localhost') || origin === env.CORS_ORIGIN) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Body parsing with strict size limitation
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// General rate limiter for all API endpoints
app.use('/api', generalApiLimiter);

// API Routes
app.use('/api', enquiryRoutes);

// 404 handler for undefined API routes
app.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: 'The requested API endpoint was not found.',
  });
});

// Global error handling middleware
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected internal error occurred on the server.',
  });
});

// Server initialization logic
export async function startServer(): Promise<void> {
  await connectToDatabase();

  app.listen(env.PORT, () => {
    console.log(`[Server] Saurabh Portfolio API running on http://localhost:${env.PORT}`);
    console.log(`[Server] Environment: ${env.NODE_ENV}`);
    console.log(`[Server] Database Configured: ${env.isDatabaseConfigured}`);
    console.log(`[Server] SMTP Email Configured: ${env.isEmailConfigured}`);
    console.log(`[Server] CRM Sync Configured: ${env.isCrmConfigured}`);
  });
}

// Start immediately when run directly (not during unit testing)
if (process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    console.error('[Server] Fatal startup failure:', err);
    process.exit(1);
  });
}
