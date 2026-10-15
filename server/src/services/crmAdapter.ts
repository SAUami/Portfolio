import { env } from '../config/env.js';
import { ValidatedEnquiry } from '../middleware/validateEnquiry.js';

export interface CrmSyncResult {
  synced: boolean;
  message?: string;
  error?: string;
}

/**
 * Optional server-side adapter for Google Sheets / CRM webhook integration.
 * Remains disabled by default until ENABLE_CRM_ADAPTER=true and CRM_WEBHOOK_URL are provided.
 */
export async function syncToCrm(enquiry: ValidatedEnquiry): Promise<CrmSyncResult> {
  if (!env.isCrmConfigured) {
    return {
      synced: false,
      message: 'CRM integration is disabled or unconfigured.',
    };
  }

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      fullName: enquiry.fullName,
      businessOrSchoolName: enquiry.businessOrSchoolName,
      email: enquiry.email,
      phoneNumber: enquiry.phoneNumber || '',
      serviceRequired: enquiry.serviceRequired,
      estimatedBudget: enquiry.estimatedBudget || '',
      projectDescription: enquiry.projectDescription,
      desiredTimeline: enquiry.desiredTimeline || '',
      apiKey: env.CRM_API_KEY || undefined,
    };

    const response = await fetch(env.CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Saurabh-Portfolio-Server/1.0',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        synced: false,
        error: `CRM endpoint responded with HTTP ${response.status}`,
      };
    }

    return {
      synced: true,
      message: 'Enquiry synced to external CRM/Sheet adapter successfully.',
    };
  } catch (err) {
    return {
      synced: false,
      error: err instanceof Error ? err.message : 'Unknown network failure during CRM dispatch',
    };
  }
}
