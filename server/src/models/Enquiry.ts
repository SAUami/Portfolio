import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    businessOrSchoolName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxlength: 30,
      default: '',
    },
    serviceRequired: {
      type: String,
      required: true,
      trim: true,
    },
    estimatedBudget: {
      type: String,
      trim: true,
      maxlength: 80,
      default: '',
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 15,
      maxlength: 3000,
    },
    desiredTimeline: {
      type: String,
      trim: true,
      maxlength: 80,
      default: '',
    },
    consent: {
      type: Boolean,
      required: true,
    },
    ipAddress: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'responded', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
