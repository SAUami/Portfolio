import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { ValidatedEnquiry } from '../middleware/validateEnquiry.js';

let transporter: nodemailer.Transporter | null = null;

export function getEmailTransporter(): nodemailer.Transporter | null {
  if (!env.isEmailConfigured) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  return transporter;
}

function escapeHtml(str: string | undefined): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendNotificationToFounder(enquiry: ValidatedEnquiry): Promise<{ sent: boolean; messageId?: string; error?: string }> {
  const mailer = getEmailTransporter();
  const recipient = env.BUSINESS_EMAIL || env.SMTP_USER;

  if (!mailer || !recipient) {
    return {
      sent: false,
      error: 'SMTP email provider or BUSINESS_EMAIL is not configured in server environment variables.',
    };
  }

  const safeName = escapeHtml(enquiry.fullName);
  const safeOrg = escapeHtml(enquiry.businessOrSchoolName);
  const safeEmail = escapeHtml(enquiry.email);
  const safePhone = escapeHtml(enquiry.phoneNumber) || 'Not provided';
  const safeService = escapeHtml(enquiry.serviceRequired);
  const safeBudget = escapeHtml(enquiry.estimatedBudget) || 'Flexible / To be discussed';
  const safeTimeline = escapeHtml(enquiry.desiredTimeline) || 'Flexible / To be determined';
  const safeDescription = escapeHtml(enquiry.projectDescription);

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0F19; color: #F1F5F9; border-radius: 12px; overflow: hidden; border: 1px solid #1E2D4A;">
      <div style="background: linear-gradient(135deg, #2563EB, #7C3AED); padding: 24px 32px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">New Client Project Enquiry</h1>
        <p style="color: #E2E8F0; margin: 6px 0 0; font-size: 14px;">Received via Saurabh Portfolio Website</p>
      </div>

      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #94A3B8; font-size: 14px; width: 140px;">Client Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #F8FAFC; font-size: 15px; font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #94A3B8; font-size: 14px;">Organization:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #F8FAFC; font-size: 15px;">${safeOrg}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #94A3B8; font-size: 14px;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #60A5FA; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #60A5FA; text-decoration: none;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #94A3B8; font-size: 14px;">Phone / WhatsApp:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #F8FAFC; font-size: 15px;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #94A3B8; font-size: 14px;">Service Required:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #A78BFA; font-size: 15px; font-weight: 600;">${safeService}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #94A3B8; font-size: 14px;">Estimated Budget:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #F8FAFC; font-size: 15px;">${safeBudget}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #94A3B8; font-size: 14px;">Desired Timeline:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1E2D4A; color: #F8FAFC; font-size: 15px;">${safeTimeline}</td>
          </tr>
        </table>

        <div style="background: #141E33; border-radius: 8px; padding: 20px; border-left: 4px solid #3B82F6;">
          <h3 style="color: #94A3B8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px;">Project Description:</h3>
          <p style="color: #F8FAFC; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeDescription}</p>
        </div>
      </div>
      
      <div style="background: #070A12; padding: 16px 32px; border-top: 1px solid #1E2D4A; text-align: center; color: #64748B; font-size: 12px;">
        Sent securely from your Portfolio Enquiry System
      </div>
    </div>
  `;

  try {
    const info = await mailer.sendMail({
      from: env.SMTP_FROM,
      to: recipient,
      subject: `[New Project Enquiry] ${enquiry.serviceRequired} - ${enquiry.businessOrSchoolName} (${enquiry.fullName})`,
      replyTo: enquiry.email,
      html: htmlContent,
    });
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    return {
      sent: false,
      error: error instanceof Error ? error.message : 'Unknown SMTP transmission error',
    };
  }
}

export async function sendConfirmationToVisitor(enquiry: ValidatedEnquiry): Promise<{ sent: boolean; messageId?: string; error?: string }> {
  const mailer = getEmailTransporter();

  if (!mailer) {
    return {
      sent: false,
      error: 'SMTP email provider is not configured. Visitor confirmation omitted.',
    };
  }

  const safeName = escapeHtml(enquiry.fullName);
  const safeOrg = escapeHtml(enquiry.businessOrSchoolName);
  const safeEmail = escapeHtml(enquiry.email);
  const safeService = escapeHtml(enquiry.serviceRequired);
  const safeTimeline = escapeHtml(enquiry.desiredTimeline) || 'To be discussed';

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0F19; color: #F1F5F9; border-radius: 12px; overflow: hidden; border: 1px solid #1E2D4A;">
      <div style="background: linear-gradient(135deg, #2563EB, #7C3AED); padding: 24px 32px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">Thank You for Your Project Enquiry</h1>
        <p style="color: #E2E8F0; margin: 6px 0 0; font-size: 14px;">Saurabh Sharma | Founder, Engineer & Entrepreneur</p>
      </div>

      <div style="padding: 32px;">
        <p style="font-size: 16px; line-height: 1.6; color: #F8FAFC; margin-top: 0;">
          Hi ${safeName},
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1;">
          Thank you for reaching out regarding your project with <strong>${safeOrg}</strong>. I have successfully received your enquiry for <strong>${safeService}</strong>.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1;">
          I review every project brief personally to assess scope, technical requirements, and how we can deliver the highest quality experience. I will get back to you within 24 to 48 business hours with next steps or clarifying questions.
        </p>

        <div style="background: #141E33; border-radius: 8px; padding: 20px; margin: 24px 0; border-left: 4px solid #8B5CF6;">
          <h4 style="margin: 0 0 10px; color: #A78BFA; font-size: 14px; text-transform: uppercase;">Summary of your enquiry:</h4>
          <p style="margin: 4px 0; font-size: 14px; color: #94A3B8;"><strong>Service:</strong> ${safeService}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #94A3B8;"><strong>Target Timeline:</strong> ${safeTimeline}</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1;">
          Warm regards,<br />
          <strong style="color: #F8FAFC;">Saurabh Sharma</strong><br />
          <span style="color: #94A3B8; font-size: 13px;">Founder, Engineer & Entrepreneur</span>
        </p>
      </div>

      <div style="background: #070A12; padding: 16px 32px; border-top: 1px solid #1E2D4A; text-align: center; color: #64748B; font-size: 12px;">
        This is an automated confirmation sent to ${safeEmail}.
      </div>
    </div>
  `;

  try {
    const info = await mailer.sendMail({
      from: env.SMTP_FROM,
      to: enquiry.email,
      subject: `Enquiry Received: ${enquiry.serviceRequired} - Saurabh`,
      html: htmlContent,
    });
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    return {
      sent: false,
      error: error instanceof Error ? error.message : 'Failed to send visitor confirmation',
    };
  }
}
