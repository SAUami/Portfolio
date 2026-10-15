import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, Terminal, CheckCircle2, Linkedin, Instagram } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import { Button } from '../common/button';
import { Badge } from '../common/badge';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-navy-950">
      {/* Background Ambient Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-electric-600/15 via-violetAccent-600/10 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <Badge variant="electric" size="md" dot>
                Available for New Client Projects & Collaborations
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]"
            >
              Turning Ideas Into{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-electric-400 to-violetAccent-400">
                Powerful Digital Experiences.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal"
            >
              {brandConfig.founder.heroBio}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToContact}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Discuss Your Project
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToProjects}
                leftIcon={<Code2 className="w-5 h-5 text-electric-400" />}
              >
                Explore My Work
              </Button>
            </motion.div>

            {/* Quick Social Connect */}
            <motion.div
              variants={itemVariants}
              className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400"
            >
              <span className="font-mono text-slate-400 text-[11px] uppercase tracking-wider">Connect:</span>
              <a
                href={brandConfig.founder.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900/90 hover:bg-blue-950/60 border border-navy-750 hover:border-blue-500/60 text-slate-300 hover:text-blue-300 transition-all shadow-sm hover:shadow-blue-500/20 group"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-xs">LinkedIn</span>
              </a>
              <a
                href={brandConfig.founder.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900/90 hover:bg-rose-950/60 border border-navy-750 hover:border-rose-500/60 text-slate-300 hover:text-rose-300 transition-all shadow-sm hover:shadow-rose-500/20 group"
              >
                <Instagram className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-xs">Instagram</span>
              </a>
            </motion.div>

            {/* Grounded Quality Commitments */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-navy-850 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-electric-400 flex-shrink-0" />
                <span>Modern React & TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-electric-400 flex-shrink-0" />
                <span>Responsive & Accessible</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-electric-400 flex-shrink-0" />
                <span>Direct Founder Collaboration</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Code-Inspired Interactive Graphic / Developer Illustration */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-lg rounded-2xl glass-panel p-1.5 shadow-2xl shadow-navy-950/80 border border-navy-700/80 relative group">
              {/* Terminal Window Header */}
              <div className="bg-navy-900/90 rounded-t-xl px-4 py-3 border-b border-navy-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-electric-400" />
                    developer-profile.ts
                  </span>
                </div>
                <Badge variant="violet" size="sm">
                  Active Workspace
                </Badge>
              </div>

              {/* Code Editor Body */}
              <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto bg-navy-950/70 rounded-b-xl space-y-1">
                <div>
                  <span className="text-violetAccent-400">const</span>{' '}
                  <span className="text-electric-400">founder</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span>{' '}
                  <span className="text-emerald-400">"{brandConfig.founder.name}"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">role:</span>{' '}
                  <span className="text-amber-300">"Founder, Engineer & Entrepreneur"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">coreTech:</span> [
                </div>
                <div className="pl-8 text-electric-300">
                  "React", "TypeScript", "Node.js", "TailwindCSS"
                </div>
                <div className="pl-4">],</div>
                <div className="pl-4">
                  <span className="text-slate-400">standards:</span> &#123;
                </div>
                <div className="pl-8 text-slate-300">
                  accessibility: <span className="text-emerald-400">true</span>,
                </div>
                <div className="pl-8 text-slate-300">
                  responsiveDesign: <span className="text-emerald-400">true</span>,
                </div>
                <div className="pl-8 text-slate-300">
                  cleanCode: <span className="text-emerald-400">true</span>
                </div>
                <div className="pl-4">&#125;,</div>
                <div className="pl-4">
                  <span className="text-slate-400">status:</span>{' '}
                  <span className="text-electric-400">"Building digital solutions"</span>
                </div>
                <div>&#125;;</div>
                <div className="pt-2 text-slate-500 flex items-center gap-2">
                  <span className="text-electric-400">➜</span>
                  <span>ready to build your vision</span>
                  <span className="w-2 h-4 bg-electric-400 animate-pulse inline-block" />
                </div>
              </div>

              {/* Floating Technology Pills */}
              <div className="absolute -bottom-5 -left-4 glass-card px-3.5 py-2.5 rounded-xl shadow-lg flex items-center gap-3 border border-navy-700 bg-navy-900/95">
                <img
                  src={brandConfig.founder.image}
                  alt={brandConfig.founder.name}
                  className="w-8 h-8 rounded-full object-cover border border-electric-400"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{brandConfig.founder.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-electric-300 font-mono">Founder, Engineer & Entrepreneur</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 glass-card px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-navy-700">
                <Sparkles className="w-4 h-4 text-violetAccent-400" />
                <span className="text-xs font-semibold text-white">Full-Stack Precision</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
