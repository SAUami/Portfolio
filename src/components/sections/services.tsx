import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Layers,
  Code2,
  Server,
  Wrench,
  ArrowRight,
  Check,
} from 'lucide-react';
import { servicesData } from '../../config/services.config';
import { SectionHeading } from '../common/sectionHeading';
import { Badge } from '../common/badge';

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const shouldReduceMotion = useReducedMotion();

  const getIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-electric-400' };
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'ShoppingCart':
        return <ShoppingCart {...props} />;
      case 'Layers':
        return <Layers {...props} />;
      case 'Code2':
        return <Code2 {...props} />;
      case 'Server':
        return <Server {...props} />;
      case 'Wrench':
        return <Wrench {...props} />;
      default:
        return <Code2 {...props} />;
    }
  };

  const handleEnquireService = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.08,
      },
    }),
  };

  return (
    <section id="services" className="py-24 bg-navy-950 relative border-t border-navy-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Specialized Offerings"
          title="Engineered Web Services"
          highlightText="Tailored To Your Objectives"
          description="From high-impact marketing websites to custom web applications and continuous support, every solution is developed with clean code, strong performance, and genuine usability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group glass-card rounded-2xl p-7 flex flex-col justify-between hover:border-electric-500/50 hover:shadow-xl hover:shadow-electric-600/10 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle accent hover gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-electric-600/5 via-transparent to-violetAccent-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-navy-800/90 border border-navy-700/80 flex items-center justify-center group-hover:border-electric-500/40 group-hover:bg-navy-800 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <Badge variant="electric" size="sm">
                      {service.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-electric-300 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="mt-6 pt-5 border-t border-navy-800/80">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Key Deliverables:
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => handleEnquireService(service.title)}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-navy-850 hover:bg-electric-600 text-slate-200 hover:text-white border border-navy-700 hover:border-electric-500 text-sm font-semibold transition-all duration-200 group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
