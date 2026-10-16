import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Search possible .env locations so it loads correctly regardless of working directory
const candidateEnvPaths = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(process.cwd(), 'server', '.env'),
  path.resolve(process.cwd(), '.env'),
];

for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  BUSINESS_EMAIL: process.env.BUSINESS_EMAIL || 'vedyxa.in@gmail.com',
  
  // Admin credentials for founder login portal
  ADMIN_EMAIL: (process.env.ADMIN_EMAIL || 'vedyxa.in@gmail.com').toLowerCase(),
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'Saurabh@2026',
  JWT_SECRET: process.env.JWT_SECRET || 'saurabh-portfolio-secret-key-2026',

  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI || '',
  isDatabaseConfigured: Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0),

  // SMTP Email configuration
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_FROM: process.env.SMTP_FROM || '"Saurabh Sharma Studio" <vedyxa.in@gmail.com>',
  isEmailConfigured: Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    !process.env.SMTP_HOST.includes('example.com')
  ),

  // CRM / Google Sheets optional adapter
  ENABLE_CRM_ADAPTER: process.env.ENABLE_CRM_ADAPTER === 'true',
  CRM_WEBHOOK_URL: process.env.CRM_WEBHOOK_URL || '',
  CRM_API_KEY: process.env.CRM_API_KEY || '',
  isCrmConfigured: Boolean(
    process.env.ENABLE_CRM_ADAPTER === 'true' &&
    process.env.CRM_WEBHOOK_URL &&
    !process.env.CRM_WEBHOOK_URL.includes('YOUR_SCRIPT_ID')
  ),
};
