import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqData } from '../../config/faq.config';
import { SectionHeading } from '../common/sectionHeading';
import { Badge } from '../common/badge';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-navy-950/70 relative border-t border-navy-850">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked"
          highlightText="Questions"
          description="Straightforward answers regarding project scoping, pricing structure, development timelines, and post-launch technical support."
        />

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-navy-700/80 overflow-hidden transition-colors hover:border-navy-600"
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-navy-850 border border-navy-700 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-4 h-4 text-electric-400" />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge variant="outline" size="sm" className="hidden sm:inline-flex">
                      {faq.category}
                    </Badge>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-electric-400' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: shouldReduceMotion ? 0 : 0.25 },
                          opacity: { duration: shouldReduceMotion ? 0 : 0.2 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: shouldReduceMotion ? 0 : 0.2 },
                          opacity: { duration: shouldReduceMotion ? 0 : 0.15 },
                        },
                      }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-navy-850/80">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
