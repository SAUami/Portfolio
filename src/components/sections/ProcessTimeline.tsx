import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, FileCheck, Palette, CodeXml, Rocket } from 'lucide-react';
import { SectionHeading } from '../common/sectionHeading';

export const ProcessTimeline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      number: '01',
      title: 'Discover',
      tagline: 'Understand business goals and requirements',
      description:
        'We start with an in-depth discussion covering your business goals, target audience, brand aesthetic, and technical constraints. This sets clear success criteria.',
      icon: <Search className="w-5 h-5 text-electric-400" />,
      deliverables: ['Goals alignment', 'Audience analysis', 'Requirement checklist'],
    },
    {
      number: '02',
      title: 'Plan',
      tagline: 'Define scope, deliverables, budget, and timeline',
      description:
        'I outline the project specifications, sitemap, technology stack, and agreed milestones. You receive a clear proposal with transparent pricing and target delivery dates.',
      icon: <FileCheck className="w-5 h-5 text-violetAccent-400" />,
      deliverables: ['Detailed proposal', 'Milestone roadmap', 'Technical architecture'],
    },
    {
      number: '03',
      title: 'Design',
      tagline: 'Develop wireframes and visual direction',
      description:
        'Creating accessible UI layouts, responsive design patterns, and typography tokens. We review wireframes and interactive mockups before writing production code.',
      icon: <Palette className="w-5 h-5 text-electric-400" />,
      deliverables: ['Interface wireframes', 'Design tokens & colors', 'Interactive mockup review'],
    },
    {
      number: '04',
      title: 'Build and Test',
      tagline: 'Implement the website and test core flows',
      description:
        'Translating approved designs into clean React/TypeScript code with backend endpoints, database persistence, form validation, cross-browser checks, and mobile testing.',
      icon: <CodeXml className="w-5 h-5 text-emerald-400" />,
      deliverables: ['Semantic, modular code', 'Mobile responsiveness audit', 'Form & flow testing'],
    },
    {
      number: '05',
      title: 'Launch and Support',
      tagline: 'Deploy, hand over, and provide agreed support',
      description:
        'Configuring production hosting, custom domains, SEO essentials, and analytics. Following launch, I provide handover documentation and agreed post-launch warranty support.',
      icon: <Rocket className="w-5 h-5 text-amber-400" />,
      deliverables: ['Live deployment', 'Handover walkthrough', 'Agreed maintenance & warranty'],
    },
  ];

  return (
    <section id="process" className="py-24 bg-navy-950/80 relative border-t border-navy-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Proven Methodology"
          title="A Structured, Transparent"
          highlightText="Development Process"
          description="Every project progresses through five disciplined stages to ensure predictable delivery, proactive communication, and high-quality results."
        />

        {/* Timeline Container */}
        <div className="relative mt-16">
          {/* Desktop connecting line */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-600/20 via-violetAccent-600/40 to-electric-600/20 -translate-y-1/2 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                }}
                className="glass-card rounded-2xl p-6 border border-navy-700/80 flex flex-col justify-between hover:border-electric-500/50 hover:shadow-lg hover:shadow-electric-600/10 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-slate-400 group-hover:text-electric-400 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-navy-800/90 border border-navy-700 flex items-center justify-center group-hover:border-electric-500/40 transition-colors">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-electric-300 font-medium mb-3">
                    {step.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-navy-800/80">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Stage Deliverables:
                  </span>
                  <ul className="space-y-1">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-electric-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
