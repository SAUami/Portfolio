import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Users,
  Sliders,
  CheckCheck,
  CalendarCheck,
  Eye,
  Headphones,
} from 'lucide-react';
import { SectionHeading } from '../common/sectionHeading';
import { Badge } from '../common/badge';

export const WhyWorkWithMe: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const reasons = [
    {
      icon: <Users className="w-6 h-6 text-electric-400" />,
      title: "Direct Founder & Developer Partnership",
      description:
        "You communicate directly with the engineer planning and building your application. There are no account managers, lost-in-translation requirements, or bureaucratic delays.",
      highlight: "Unfiltered Communication",
    },
    {
      icon: <Sliders className="w-6 h-6 text-violetAccent-400" />,
      title: "Tailored to Your Exact Business Goals",
      description:
        "Every layout, form, and feature is purposeful. Rather than forcing your business into rigid off-the-shelf templates, I craft clean interfaces configured to how you work.",
      highlight: "No Bloated Templates",
    },
    {
      icon: <CheckCheck className="w-6 h-6 text-emerald-400" />,
      title: "Clean, Maintainable Modern Code",
      description:
        "Engineered with React, TypeScript, and modern standards. The code is modular, well-commented, and easily extensible by any developer in the future.",
      highlight: "Long-term Value",
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-blue-400" />,
      title: "Transparent Scope & Clear Timelines",
      description:
        "Before writing a line of code, we agree on exact deliverables, milestones, and timelines. You receive regular video demos or written updates as your project takes shape.",
      highlight: "Predictable Delivery",
    },
    {
      icon: <Eye className="w-6 h-6 text-amber-400" />,
      title: "Accessibility & Performance Mindset",
      description:
        "Fast load times, responsive thumb-friendly mobile layouts, WCAG-compliant color contrast, and proper keyboard navigation are treated as essentials, not afterthoughts.",
      highlight: "Inclusive Design",
    },
    {
      icon: <Headphones className="w-6 h-6 text-cyan-400" />,
      title: "Dedicated Post-Launch Support",
      description:
        "Our collaboration doesn't terminate at launch. I assist with domain configuration, hosting setup, and provide agreed warranty support to address any questions promptly.",
      highlight: "Reliable Handover",
    },
  ];

  return (
    <section id="why-me" className="py-24 bg-navy-950 relative border-t border-navy-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Genuine Value"
          title="Why Work With Me"
          highlightText="On Your Next Project"
          description="A collaborative, engineering-driven approach focused on building reliable web experiences that genuinely serve your organization's goals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
              }}
              className="glass-card rounded-2xl p-7 border border-navy-700/80 hover:border-navy-600 flex flex-col justify-between hover:shadow-xl hover:shadow-navy-900/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-850 border border-navy-700 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <Badge variant="outline" size="sm">
                    {item.highlight}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-850/80 flex items-center gap-2 text-xs text-electric-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                <span>Founder Standard</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
