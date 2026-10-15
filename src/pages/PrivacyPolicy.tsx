import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Mail } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { brandConfig } from '../config/brand.config';
import { Badge } from '../components/common/badge';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <SEOHead
        title="Privacy Policy | Saurabh Web Studio"
        description="Privacy policy and data handling practices for Saurabh's portfolio and project enquiry system."
        canonicalPath="/privacy"
      />

      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors p-1 rounded"
            >
              <ArrowLeft className="w-4 h-4 text-electric-400" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-navy-700/80 shadow-2xl space-y-8">
            <div>
              <Badge variant="electric" size="sm" className="mb-3">
                Legal & Privacy Standards
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Last updated: October 2026 • Effective immediately
              </p>
            </div>

            <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-electric-400" />
                  <span>1. Overview and Scope</span>
                </h2>
                <p>
                  This Privacy Policy describes how <strong>{brandConfig.founder.name}</strong> ("I", "me", or "the developer") collects, uses, and protects information submitted by visitors and prospective clients through this portfolio website.
                </p>
                <p>
                  I respect your privacy and am committed to maintaining transparency regarding what data is collected and how it is processed.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-violetAccent-400" />
                  <span>2. Information Collected via the Project Enquiry Form</span>
                </h2>
                <p>When you voluntarily submit a project enquiry, the following details may be collected:</p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-300 text-sm">
                  <li><strong>Personal Identifiers:</strong> Your full name and email address.</li>
                  <li><strong>Organizational Details:</strong> Business, school, or institution name.</li>
                  <li><strong>Contact Details:</strong> Phone number or WhatsApp contact (optional).</li>
                  <li><strong>Project Requirements:</strong> Selected service category, budget estimate, timeline requirements, and project description.</li>
                  <li><strong>Technical Data:</strong> IP address and submission timestamp collected strictly for automated spam prevention and rate limiting.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <span>3. Purpose of Processing</span>
                </h2>
                <p>Information submitted through this site is used solely to:</p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-300 text-sm">
                  <li>Review your project requirements and evaluate technical feasibility.</li>
                  <li>Respond to your message with questions, recommendations, or a formal project estimate.</li>
                  <li>Protect the server against automated abuse, scraping, and spam attacks.</li>
                </ul>
                <p>
                  Your information is never sold, leased, rented, or distributed to advertising networks or third-party telemarketers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white">4. Data Storage and Retention</h2>
                <p>
                  If persistent database storage (MongoDB) is configured on the backend, your enquiry records are stored in a protected environment with restricted administrative access. Enquiries are retained for up to 12 months for project communication and reference, after which they are archived or permanently removed.
                </p>
                <p>
                  When email notifications are configured, messages are routed via encrypted SMTP transmission to the founder's business inbox.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white">5. Your Data Rights</h2>
                <p>You retain full rights regarding any personal information you provide:</p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-300 text-sm">
                  <li>You may request a copy of the personal details stored about you.</li>
                  <li>You may request the immediate deletion or amendment of your enquiry records.</li>
                </ul>
                <p>
                  To exercise any of these rights, contact me directly at{' '}
                  <a href={brandConfig.founder.emailMailtoUrl} className="text-electric-400 hover:underline">
                    {brandConfig.founder.email}
                  </a>.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-navy-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-electric-400" />
                  <span>6. Contact Information</span>
                </h2>
                <p>
                  For any privacy questions, concerns, or data erasure requests, please contact:
                </p>
                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 font-mono text-xs sm:text-sm space-y-1">
                  <div><strong>Founder:</strong> {brandConfig.founder.name}</div>
                  <div><strong>Location:</strong> {brandConfig.founder.location}</div>
                  <div>
                    <strong>Email:</strong>{' '}
                    <a href={brandConfig.founder.emailMailtoUrl} className="text-electric-400 hover:underline">
                      {brandConfig.founder.email}
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
