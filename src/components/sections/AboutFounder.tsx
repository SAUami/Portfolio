import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, Compass, Code, HeartHandshake, CheckCircle2, Linkedin, Instagram } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import { SectionHeading } from '../common/sectionHeading';
import { Badge } from '../common/badge';

export const AboutFounder: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      icon: <Compass className="w-5 h-5 text-electric-400" />,
      title: "Transparent Project Scope",
      description: "Clear deliverables, realistic milestones, and explicit budgets from day one. No surprises or ambiguous scope creep.",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-violetAccent-400" />,
      title: "Direct Founder Collaboration",
      description: "You work directly with the engineer designing and implementing your code. No account manager layers or filtered updates.",
    },
    {
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      title: "Maintainable & Modular Code",
      description: "Using modern React, TypeScript, and clean architecture so your codebase remains extensible, robust, and easy to maintain.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-amber-400" />,
      title: "Client-Centric Problem Solving",
      description: "Technology chosen strictly to serve your business objectives, whether that means a high-converting landing page or a complex web app.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-navy-950 relative border-t border-navy-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Founder, Engineer & Entrepreneur"
          title="Technology With a Practical,"
          highlightText="User-First Approach"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder Bio & Approach */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="flex items-center gap-3">
              <Badge variant="violet" size="md">
                About {brandConfig.founder.name}
              </Badge>
              <span className="text-xs font-mono text-slate-400">
                Location: {brandConfig.founder.location}
              </span>
            </div>

            <div className="space-y-4 text-slate-200 text-base md:text-lg leading-relaxed">
              {brandConfig.founder.aboutBioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-navy-900/60 rounded-xl p-4 border border-navy-800/80 hover:border-navy-700 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Real Founder Image & Credential Card */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-700/80 shadow-2xl relative overflow-hidden">
              {/* Founder Photo */}
              <div className="relative mx-auto w-48 h-48 rounded-full bg-gradient-to-tr from-electric-500 via-indigo-600 to-violetAccent-500 p-1.5 shadow-2xl shadow-electric-600/30 group">
                <img
                  src={brandConfig.founder.image}
                  alt={`${brandConfig.founder.name} - Founder, Engineer & Entrepreneur`}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 right-2 bg-emerald-500 border-2 border-navy-950 text-white rounded-full p-1.5 shadow-lg" title="Verified Founder">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-extrabold text-white">{brandConfig.founder.name}</h3>
                <p className="text-sm text-electric-400 font-semibold mt-0.5">{brandConfig.founder.role}</p>
                <p className="text-xs text-slate-400 mt-1">{brandConfig.founder.location}</p>
              </div>

              <div className="mt-6 pt-5 border-t border-navy-850 space-y-3 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Primary Focus:</span>
                  <span className="font-semibold text-white">Full-Stack Web & Startup Engineering</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Project Model:</span>
                  <span className="font-semibold text-white">Fixed Deliverables & Growth Retainers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Availability:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Accepting New Client Projects
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-850 flex items-center justify-center gap-3">
                <a
                  href={brandConfig.founder.emailMailtoUrl}
                  className="px-3.5 py-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-xs font-semibold text-slate-200 hover:text-white border border-navy-700 transition-colors"
                >
                  Email Saurabh
                </a>
                <a
                  href={brandConfig.founder.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/40 transition-colors group"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>

              {/* Attractive Social Media Connect */}
              <div className="mt-4 pt-4 border-t border-navy-850/80">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block text-center mb-2.5">
                  Follow & Connect Directly:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={brandConfig.founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-600 hover:to-sky-500 text-white text-xs font-bold shadow-md shadow-blue-900/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={brandConfig.founder.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-rose-900/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
