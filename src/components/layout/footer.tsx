import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowUp, Mail, MapPin, ExternalLink, Linkedin, Instagram } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-navy-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-navy-850">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-white font-bold text-xl tracking-tight group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded-lg"
              aria-label="Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-electric-600 to-violetAccent-600 flex items-center justify-center text-white">
                <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-white">{brandConfig.founder.name}</span>
            </Link>

            <p className="mt-4 text-sm text-slate-300 max-w-sm leading-relaxed">
              "{brandConfig.startup.tagline}"
            </p>
            <p className="mt-2 text-xs text-slate-300">
              Building modern websites and web applications with a focus on practical technology, thoughtful interfaces, and reliable delivery.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-electric-400 flex-shrink-0" />
                <span>{brandConfig.founder.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-electric-400 flex-shrink-0" />
                <a
                  href={brandConfig.founder.emailMailtoUrl}
                  className="hover:text-electric-400 transition-colors"
                >
                  {brandConfig.founder.email}
                </a>
              </div>
            </div>

            {/* Social Media Connect */}
            <div className="mt-5 pt-4 border-t border-navy-850 flex items-center gap-3">
              <span className="text-xs font-mono uppercase text-slate-400">Social:</span>
              <a
                href={brandConfig.founder.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Saurabh Sharma on LinkedIn"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-blue-600/20 text-slate-300 hover:text-white border border-navy-800 hover:border-blue-500/50 text-xs font-semibold transition-all group"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
              <a
                href={brandConfig.founder.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Saurabh Sharma on Instagram"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-rose-600/20 text-slate-300 hover:text-white border border-navy-800 hover:border-rose-500/50 text-xs font-semibold transition-all group"
              >
                <Instagram className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#services" className="hover:text-electric-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-electric-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-electric-400 transition-colors">
                  About Founder
                </a>
              </li>
              <li>
                <a href="/#process" className="hover:text-electric-400 transition-colors">
                  Development Process
                </a>
              </li>
              <li>
                <a href="/#why-me" className="hover:text-electric-400 transition-colors">
                  Why Work With Me
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-electric-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Case Studies Column */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              Case Studies
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/projects/medconnect"
                  className="hover:text-electric-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>MedConnect Platform</span>
                  <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-electric-400" />
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/clayvista"
                  className="hover:text-electric-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>ClayVista E-commerce</span>
                  <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-electric-400" />
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-300 leading-normal">
                {brandConfig.startup.statusNote}
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              Solutions
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Business Websites</li>
              <li>School Portals</li>
              <li>Custom Web Applications</li>
              <li>E-commerce Experiences</li>
              <li>Frontend & React Systems</li>
              <li>Node.js / API Integration</li>
              <li>Technical Maintenance</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {currentYear} {brandConfig.founder.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/login" className="text-slate-400 hover:text-electric-400 transition-colors underline-offset-4 hover:underline flex items-center gap-1">
              <span>Founder Portal</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
