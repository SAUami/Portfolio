export interface FounderInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  emailMailtoUrl: string;
  phoneWhatsApp: string;
  whatsAppUrl: string;
  image: string;
  linkedinUrl: string;
  instagramUrl: string;
  headline: string;
  heroBio: string;
  aboutBioParagraphs: string[];
}

export interface StartupInfo {
  name: string;
  tagline: string;
  statusNote: string;
}

export interface BrandConfig {
  founder: FounderInfo;
  startup: StartupInfo;
  techStackSummary: string[];
  theme: {
    navyBg: string;
    navyCard: string;
    electricBlue: string;
    subtleViolet: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  icon: string;
  badge?: string;
}

export interface TechItem {
  name: string;
  role: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  status: 'implemented' | 'intended' | 'prototype';
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  liveStatusNotice: string;
  liveUrl?: string; // Live project deployment URL
  workInProgress?: boolean; // Under active construction / work in progress
  problemStatement: string[];
  objectives: string[];
  features: ProjectFeature[];
  techStack: TechItem[];
  challengesAndLearnings: {
    challenge: string;
    solution: string;
    takeaway: string;
  }[];
  disclaimer?: string;
  ctaText: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  details: string[];
  icon: string;
}

export interface WhyWorkPillar {
  title: string;
  description: string;
  highlight: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Engagement' | 'Process' | 'Technical' | 'Support';
}

export interface EnquiryFormData {
  id?: string;
  fullName: string;
  businessOrSchoolName: string;
  email: string;
  phoneNumber?: string;
  serviceRequired: string;
  estimatedBudget?: string;
  projectDescription: string;
  desiredTimeline?: string;
  consent: boolean;
  hp_field?: string;
  status?: 'new' | 'reviewed' | 'responded' | 'archived';
  createdAt?: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  error?: string;
  errors?: { field: string; message: string }[];
  data?: {
    enquiryId?: string | null;
    savedToDatabase?: boolean;
    notificationSent?: boolean;
    confirmationSent?: boolean;
  };
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: AdminUser;
  error?: string;
  message?: string;
}
