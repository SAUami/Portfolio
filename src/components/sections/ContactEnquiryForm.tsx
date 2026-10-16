import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Clock,
  Shield,
  HelpCircle,
  Lock,
  Linkedin,
  Instagram,
} from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import { servicesData } from '../../config/services.config';
import { EnquiryFormData, EnquiryResponse } from '../../types';
import { SectionHeading } from '../common/sectionHeading';
import { Button } from '../common/button';

interface ContactEnquiryFormProps {
  prefilledService?: string;
}

export const ContactEnquiryForm: React.FC<ContactEnquiryFormProps> = ({
  prefilledService,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    businessOrSchoolName: '',
    email: '',
    phoneNumber: '',
    serviceRequired: prefilledService || '',
    estimatedBudget: '',
    projectDescription: '',
    desiredTimeline: '',
    consent: false,
    hp_field: '', // Anti-spam honeypot
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success' | 'error' | 'unconfigured'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusDetails, setStatusDetails] = useState<EnquiryResponse['data'] | null>(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceRequired: prefilledService }));
    }
  }, [prefilledService]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (
      !formData.businessOrSchoolName.trim() ||
      formData.businessOrSchoolName.trim().length < 2
    ) {
      newErrors.businessOrSchoolName =
        'Please enter your business, institution, or school name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select the service required for your project.';
    }

    if (
      !formData.projectDescription.trim() ||
      formData.projectDescription.trim().length < 15
    ) {
      newErrors.projectDescription =
        'Please provide at least 15 characters outlining your project objectives.';
    }

    if (!formData.consent) {
      newErrors.consent =
        'Your consent is required so we can reply to your project enquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear specific error on change
    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setStatusMessage('');

    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
      const response = await fetch(`${apiBase}/api/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: EnquiryResponse = await response.json();

      if (response.status === 201 && data.success) {
        setSubmissionStatus('success');
        setStatusMessage(
          data.message ||
            'Your enquiry has been successfully recorded. A confirmation has been sent to your email.'
        );
        setStatusDetails(data.data);
        // Reset form on success
        setFormData({
          fullName: '',
          businessOrSchoolName: '',
          email: '',
          phoneNumber: '',
          serviceRequired: '',
          estimatedBudget: '',
          projectDescription: '',
          desiredTimeline: '',
          consent: false,
          hp_field: '',
        });
      } else if (response.status === 503 || data.error === 'BACKEND_NOT_CONFIGURED') {
        // Honest unconfigured state
        setSubmissionStatus('unconfigured');
        setStatusMessage(
          data.message ||
            'The enquiry backend is currently unconfigured (no MongoDB or SMTP email credentials provided). Please reach out directly via Email or WhatsApp.'
        );
      } else {
        setSubmissionStatus('error');
        setStatusMessage(
          data.message ||
            'An error occurred while submitting your enquiry. Please verify your details or contact directly.'
        );
      }
    } catch {
      // Network failure or backend server not running
      setSubmissionStatus('unconfigured');
      setStatusMessage(
        'The backend API server is currently unreachable or offline. Please contact Saurabh directly via WhatsApp or Email below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-navy-950 relative border-t border-navy-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Initiate Project"
          title="Discuss Your Project &"
          highlightText="Request an Estimate"
          description="Ready to bring your website or web application to life? Provide a few details below to receive a thoughtful review and project estimate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Founder Contacts & Expectations */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="glass-card rounded-2xl p-7 border border-navy-700/80 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Direct Communication</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Prefer a direct conversation? You can contact me directly via email or WhatsApp for quick inquiries or initial project discussions.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-navy-850">
                <a
                  href={brandConfig.founder.emailMailtoUrl}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-navy-900 hover:bg-navy-850 border border-navy-800 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
                >
                  <div className="w-10 h-10 rounded-lg bg-electric-600/10 border border-electric-500/30 flex items-center justify-center text-electric-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Business Email</span>
                    <span className="text-sm font-semibold text-white group-hover:text-electric-300 transition-colors">
                      {brandConfig.founder.email}
                    </span>
                  </div>
                </a>

                {/* Direct Social Media Links */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Connect Directly:
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={brandConfig.founder.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-600 hover:to-sky-500 text-white text-xs font-bold shadow-md shadow-blue-900/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={brandConfig.founder.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-rose-900/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* What Happens Next Checklist */}
              <div className="pt-4 border-t border-navy-850">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  What Happens Next:
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-electric-400 flex-shrink-0 mt-0.5" />
                    <span>Personal review of your brief within 24–48 business hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-violetAccent-400 flex-shrink-0 mt-0.5" />
                    <span>Clarifying questions to understand scope, timelines, and technical constraints.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>A clear, transparent project proposal outlining deliverables and investment.</span>
                  </li>
                </ul>
              </div>

              {/* Privacy Guarantee */}
              <div className="bg-navy-950/80 rounded-xl p-3.5 border border-navy-800 flex items-center gap-2.5 text-xs text-slate-400">
                <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Your contact info is strictly confidential and never shared with third parties.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-navy-700/80 shadow-2xl relative">
              {/* Submission Status Banners */}
              {submissionStatus === 'success' && (
                <div
                  className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-start gap-3 text-emerald-200 text-sm"
                  role="alert"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Enquiry Received Successfully!</h5>
                    <p className="mt-1 text-emerald-300 text-xs sm:text-sm">{statusMessage}</p>
                    {statusDetails && (
                      <div className="mt-2 text-[11px] font-mono text-emerald-400 flex flex-wrap gap-3">
                        <span>Database: {statusDetails.savedToDatabase ? 'Saved' : 'Stateless'}</span>
                        <span>Notification: {statusDetails.notificationSent ? 'Dispatched' : 'Pending'}</span>
                        <span>Receipt: {statusDetails.confirmationSent ? 'Sent' : 'Skipped'}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {submissionStatus === 'unconfigured' && (
                <div
                  className="mb-6 p-4 rounded-xl bg-amber-950/70 border border-amber-500/50 flex items-start gap-3 text-amber-200 text-sm"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">System Notice: Unconfigured Mode</h5>
                    <p className="mt-1 text-amber-300 text-xs sm:text-sm">{statusMessage}</p>
                    <p className="mt-2 text-xs text-amber-400">
                      You can reach Saurabh directly at{' '}
                      <a href={brandConfig.founder.emailMailtoUrl} className="underline font-bold">
                        {brandConfig.founder.email}
                      </a>.
                    </p>
                  </div>
                </div>
              )}

              {submissionStatus === 'error' && (
                <div
                  className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 flex items-start gap-3 text-rose-200 text-sm"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Submission Could Not Be Completed</h5>
                    <p className="mt-1 text-rose-300 text-xs sm:text-sm">{statusMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot Spam Trap (Hidden from genuine human users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp_field">Do not fill this field</label>
                  <input
                    type="text"
                    id="hp_field"
                    name="hp_field"
                    tabIndex={-1}
                    value={formData.hp_field || ''}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                </div>

                {/* Row 1: Full Name & Business/School Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Your Full Name <span className="text-electric-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      className={`w-full px-4 py-2.5 rounded-xl bg-navy-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-navy-700'
                      }`}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="mt-1 text-xs text-rose-400" role="alert">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="businessOrSchoolName"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Business or School Name <span className="text-electric-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="businessOrSchoolName"
                      name="businessOrSchoolName"
                      required
                      placeholder="e.g. Apex Global Academy / TechCorp"
                      value={formData.businessOrSchoolName}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.businessOrSchoolName)}
                      aria-describedby={
                        errors.businessOrSchoolName ? 'businessOrSchoolName-error' : undefined
                      }
                      className={`w-full px-4 py-2.5 rounded-xl bg-navy-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors ${
                        errors.businessOrSchoolName ? 'border-rose-500' : 'border-navy-700'
                      }`}
                    />
                    {errors.businessOrSchoolName && (
                      <p
                        id="businessOrSchoolName-error"
                        className="mt-1 text-xs text-rose-400"
                        role="alert"
                      >
                        {errors.businessOrSchoolName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Email Address <span className="text-electric-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. vikram@organization.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-4 py-2.5 rounded-xl bg-navy-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-navy-700'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-rose-400" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phoneNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Service Required & Estimated Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="serviceRequired"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Service Required <span className="text-electric-400">*</span>
                    </label>
                    <select
                      id="serviceRequired"
                      name="serviceRequired"
                      required
                      value={formData.serviceRequired}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.serviceRequired)}
                      aria-describedby={
                        errors.serviceRequired ? 'serviceRequired-error' : undefined
                      }
                      className={`w-full px-4 py-2.5 rounded-xl bg-navy-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors ${
                        errors.serviceRequired ? 'border-rose-500' : 'border-navy-700'
                      }`}
                    >
                      <option value="" disabled className="bg-navy-950 text-slate-400">
                        Select a service category
                      </option>
                      {servicesData.map((svc) => (
                        <option key={svc.id} value={svc.title} className="bg-navy-950 text-white">
                          {svc.title}
                        </option>
                      ))}
                      <option value="Other Custom Web Project" className="bg-navy-950 text-white">
                        Other Custom Web Project
                      </option>
                    </select>
                    {errors.serviceRequired && (
                      <p
                        id="serviceRequired-error"
                        className="mt-1 text-xs text-rose-400"
                        role="alert"
                      >
                        {errors.serviceRequired}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="estimatedBudget"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Estimated Budget <span className="text-slate-500">(Optional)</span>
                    </label>
                    <select
                      id="estimatedBudget"
                      name="estimatedBudget"
                      value={formData.estimatedBudget || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors"
                    >
                      <option value="" className="bg-navy-950 text-slate-400">
                        Flexible / To be discussed
                      </option>
                      <option value="Under ₹25,000 (Small Website / Fixes)" className="bg-navy-950 text-white">
                        Under ₹25,000 (Starter Website / Fixes)
                      </option>
                      <option value="₹25,000 - ₹60,000 (Standard Business Site)" className="bg-navy-950 text-white">
                        ₹25,000 - ₹60,000 (Standard Business Site)
                      </option>
                      <option value="₹60,000 - ₹1,50,000 (School / E-commerce)" className="bg-navy-950 text-white">
                        ₹60,000 - ₹1,50,000 (School / E-commerce)
                      </option>
                      <option value="₹1,50,000+ (Custom Full-Stack App)" className="bg-navy-950 text-white">
                        ₹1,50,000+ (Custom Full-Stack Application)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Desired Timeline */}
                <div>
                  <label
                    htmlFor="desiredTimeline"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Target Completion Timeline <span className="text-slate-500">(Optional)</span>
                  </label>
                  <select
                    id="desiredTimeline"
                    name="desiredTimeline"
                    value={formData.desiredTimeline || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors"
                  >
                    <option value="" className="bg-navy-950 text-slate-400">
                      Flexible / No fixed deadline
                    </option>
                    <option value="Urgent (Within 1-2 weeks)" className="bg-navy-950 text-white">
                      Urgent (Within 1-2 weeks)
                    </option>
                    <option value="Standard (Within 1 month)" className="bg-navy-950 text-white">
                      Standard (Within 1 month)
                    </option>
                    <option value="Upcoming Quarter (1-3 months)" className="bg-navy-950 text-white">
                      Upcoming Quarter (1-3 months)
                    </option>
                  </select>
                </div>

                {/* Row 5: Project Description */}
                <div>
                  <label
                    htmlFor="projectDescription"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Project Description & Requirements <span className="text-electric-400">*</span>
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    rows={4}
                    required
                    placeholder="Tell me about your business goals, target audience, specific features needed, or existing website links..."
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors.projectDescription)}
                    aria-describedby={
                      errors.projectDescription ? 'projectDescription-error' : undefined
                    }
                    className={`w-full px-4 py-2.5 rounded-xl bg-navy-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors resize-y ${
                      errors.projectDescription ? 'border-rose-500' : 'border-navy-700'
                    }`}
                  />
                  {errors.projectDescription && (
                    <p
                      id="projectDescription-error"
                      className="mt-1 text-xs text-rose-400"
                      role="alert"
                    >
                      {errors.projectDescription}
                    </p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.consent)}
                      className="mt-1 w-4 h-4 rounded border-navy-700 bg-navy-900 text-electric-600 focus:ring-electric-500 focus:ring-offset-navy-950 rounded cursor-pointer"
                    />
                    <span className="text-xs text-slate-300 leading-normal">
                      I consent to Saurabh processing my submitted information to review project requirements, provide an estimate, and respond to this enquiry.{' '}
                      <span className="text-electric-400">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-xs text-rose-400" role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting && <Send className="w-4 h-4" />}
                  >
                    Submit Project Enquiry
                  </Button>
                </div>

                <p className="text-[11px] text-center text-slate-500">
                  Submissions are rate-limited and protected with automated spam detection filters.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
