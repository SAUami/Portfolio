import fs from 'fs';
import path from 'path';
import { Enquiry } from '../models/Enquiry.js';
import { isDbConnected } from '../db/connection.js';
import { ValidatedEnquiry } from '../middleware/validateEnquiry.js';

export interface StoredEnquiry {
  _id: string;
  fullName: string;
  businessOrSchoolName: string;
  email: string;
  phoneNumber?: string;
  serviceRequired: string;
  estimatedBudget?: string;
  projectDescription: string;
  desiredTimeline?: string;
  consent: boolean;
  ipAddress?: string;
  status: 'new' | 'reviewed' | 'responded' | 'archived';
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data folder and file exist for local fallback persistence
function ensureLocalStore(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf-8');
    }
  } catch (err) {
    console.warn('[EnquiryStore] Could not initialize local fallback file:', err);
  }
}

ensureLocalStore();

function readLocalEnquiries(): StoredEnquiry[] {
  try {
    ensureLocalStore();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeLocalEnquiries(enquiries: StoredEnquiry[]): void {
  try {
    ensureLocalStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('[EnquiryStore] Failed to write local fallback data:', err);
  }
}

export async function saveEnquiryRecord(
  data: ValidatedEnquiry,
  ipAddress: string
): Promise<{ id: string; savedToDb: boolean }> {
  const timestamp = new Date().toISOString();
  let dbRecordId: string | null = null;
  let savedToDb = false;

  // 1. Save to MongoDB if available
  if (isDbConnected()) {
    try {
      const record = await Enquiry.create({
        ...data,
        ipAddress,
        status: 'new',
      });
      dbRecordId = record._id.toString();
      savedToDb = true;
    } catch (err) {
      console.warn('[EnquiryStore] MongoDB write failed, using local fallback:', err);
    }
  }

  // 2. Always write to local fallback store as guaranteed persistence
  const fallbackId = dbRecordId || `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const localList = readLocalEnquiries();
  const newRecord: StoredEnquiry = {
    _id: fallbackId,
    ...data,
    ipAddress,
    status: 'new',
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  localList.unshift(newRecord);
  writeLocalEnquiries(localList);

  return { id: fallbackId, savedToDb };
}

export async function fetchAllEnquiries(): Promise<StoredEnquiry[]> {
  if (isDbConnected()) {
    try {
      const records = await Enquiry.find().sort({ createdAt: -1 }).lean();
      return records.map((r) => ({
        _id: r._id.toString(),
        fullName: r.fullName,
        businessOrSchoolName: r.businessOrSchoolName,
        email: r.email,
        phoneNumber: r.phoneNumber,
        serviceRequired: r.serviceRequired,
        estimatedBudget: r.estimatedBudget,
        projectDescription: r.projectDescription,
        desiredTimeline: r.desiredTimeline,
        consent: r.consent,
        ipAddress: r.ipAddress,
        status: r.status as 'new' | 'reviewed' | 'responded' | 'archived',
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
      }));
    } catch (err) {
      console.warn('[EnquiryStore] MongoDB read failed, falling back to local store:', err);
    }
  }

  return readLocalEnquiries();
}

export async function updateStatus(
  id: string,
  newStatus: 'new' | 'reviewed' | 'responded' | 'archived'
): Promise<boolean> {
  let updatedInDb = false;

  if (isDbConnected()) {
    try {
      const res = await Enquiry.findByIdAndUpdate(id, { status: newStatus, updatedAt: new Date() });
      if (res) updatedInDb = true;
    } catch (err) {
      console.warn('[EnquiryStore] MongoDB status update failed:', err);
    }
  }

  // Also update local store
  const localList = readLocalEnquiries();
  const idx = localList.findIndex((item) => item._id === id);
  if (idx !== -1) {
    localList[idx].status = newStatus;
    localList[idx].updatedAt = new Date().toISOString();
    writeLocalEnquiries(localList);
    return true;
  }

  return updatedInDb;
}

export async function deleteRecord(id: string): Promise<boolean> {
  let deletedFromDb = false;

  if (isDbConnected()) {
    try {
      const res = await Enquiry.findByIdAndDelete(id);
      if (res) deletedFromDb = true;
    } catch (err) {
      console.warn('[EnquiryStore] MongoDB delete failed:', err);
    }
  }

  const localList = readLocalEnquiries();
  const filtered = localList.filter((item) => item._id !== id);
  if (filtered.length !== localList.length) {
    writeLocalEnquiries(filtered);
    return true;
  }

  return deletedFromDb;
}
