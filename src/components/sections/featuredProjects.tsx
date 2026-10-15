import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink, Activity, ShoppingBag, CheckCircle, FileText, Smartphone, Globe, Hammer } from 'lucide-react';
import { projectsData } from '../../config/projects.config';
import { SectionHeading } from '../common/sectionHeading';
import { Badge } from '../common/badge';
import { Button } from '../common/button';

export const FeaturedProjects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getProjectIcon = (slug: string) => {
    if (slug === 'medconnect') {
      return <Activity className="w-5 h-5 text-electric-400" />;
    }
    return <ShoppingBag className="w-5 h-5 text-violetAccent-400" />;
  };

  return (
    <section id="projects" className="py-24 bg-navy-950/60 relative border-t border-navy-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Portfolio Projects"
          title="Featured Engineering"
          highlightText="Projects & Deployments"
          description="In-depth explorations demonstrating full-stack architecture, thoughtful UI design, state management, and real-world workflow problem solving with live deployments."
        />

        <div className="space-y-16">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-navy-700/80 hover:border-navy-600 transition-all shadow-2xl shadow-navy-950/80"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left/Text Column */}
                <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {project.workInProgress && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm shadow-amber-950/40">
                        <Hammer className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span>Work In Progress</span>
                      </div>
                    )}
                    {project.liveUrl ? (
                      <Badge variant="emerald" size="sm" dot>
                        Live Prototype
                      </Badge>
                    ) : (
                      <Badge variant="amber" size="sm" dot>
                        Case Study Only
                      </Badge>
                    )}
                    <Badge variant="electric" size="sm">
                      {project.category}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                      {getProjectIcon(project.slug)}
                      <span>{project.title}</span>
                    </h3>
                    <p className="mt-2 text-base text-electric-300 font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights / Features Grid */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Highlighted Capabilities:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.features.slice(0, 4).map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="bg-navy-900/80 rounded-xl p-3 border border-navy-800/80 flex items-start gap-2.5 text-xs text-slate-300"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-white block">
                              {feat.title}
                            </span>
                            <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                              {feat.status === 'implemented' ? 'Working Module' : 'Prototype Interface'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-navy-850 text-slate-300 border border-navy-700/60"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: Live URL + Detailed Case Study */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-navy-950 font-bold text-sm shadow-lg shadow-amber-900/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
                      >
                        <Hammer className="w-4 h-4 text-navy-950 group-hover:rotate-12 transition-transform" />
                        <span>Live Prototype (Work in Progress)</span>
                        <ExternalLink className="w-3.5 h-3.5 text-navy-950" />
                      </a>
                    )}

                    <Link to={`/projects/${project.slug}`}>
                      <Button
                        variant="secondary"
                        size="md"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Read Detailed Case Study
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right/Mockup Column */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative rounded-2xl bg-navy-900/90 border border-navy-700/80 p-5 shadow-xl overflow-hidden group">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                          <Hammer className="w-2.5 h-2.5 text-amber-400" />
                          <span>Under Development</span>
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-1">
                          <Globe className="w-3 h-3 text-slate-500" />
                          {project.slug === 'medconnect' ? 'med-connect-chi.vercel.app' : 'clayvista.onrender.com'}
                        </span>
                      </div>
                    </div>

                    {/* Interactive UI Mockup Representation */}
                    {project.slug === 'medconnect' ? (
                      <div className="space-y-3 font-sans">
                        <div className="bg-navy-950/80 rounded-xl p-3 border border-navy-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-electric-600/20 text-electric-400 flex items-center justify-center font-bold text-xs">
                              Dr
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">Dr. Sarah Rao, MD</div>
                              <div className="text-[11px] text-slate-400">Cardiology • 12+ Yrs Exp</div>
                            </div>
                          </div>
                          <Badge variant="emerald" size="sm">Available Today</Badge>
                        </div>

                        <div className="bg-navy-800/50 rounded-xl p-3 border border-navy-700/60">
                          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                            <span className="font-semibold text-white flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5 text-electric-400" />
                              Digital Prescription Generator
                            </span>
                            <span className="text-[10px] text-electric-300">PDF Ready</span>
                          </div>
                          <div className="h-1.5 w-full bg-navy-950 rounded-full overflow-hidden">
                            <div className="h-full bg-electric-500 rounded-full w-4/5" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                          <div className="bg-navy-950/80 p-2.5 rounded-lg border border-navy-800">
                            <div className="text-electric-400 font-bold">1-Click</div>
                            <div className="text-[10px] text-slate-400">Teleconsultation</div>
                          </div>
                          <div className="bg-navy-950/80 p-2.5 rounded-lg border border-navy-800">
                            <div className="text-violetAccent-400 font-bold">Live on Vercel</div>
                            <div className="text-[10px] text-slate-400">Deployed App</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 font-sans">
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="bg-navy-950/90 rounded-xl p-3 border border-navy-800 space-y-2">
                            <div className="h-20 bg-gradient-to-br from-navy-800 to-navy-900 rounded-lg flex items-center justify-center text-slate-400 text-xs font-mono">
                              [Porcelain Vessel]
                            </div>
                            <div className="text-xs font-bold text-white truncate">Artisanal Ceramic Vase</div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-electric-400 font-semibold">$64.00</span>
                              <Badge variant="violet" size="sm">Handmade</Badge>
                            </div>
                          </div>

                          <div className="bg-navy-950/90 rounded-xl p-3 border border-navy-800 space-y-2">
                            <div className="h-20 bg-gradient-to-br from-navy-800 to-navy-900 rounded-lg flex items-center justify-center text-slate-400 text-xs font-mono">
                              [Glazed Dinnerware]
                            </div>
                            <div className="text-xs font-bold text-white truncate">Stone Tableware Set</div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-electric-400 font-semibold">$120.00</span>
                              <Badge variant="electric" size="sm">Curated</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="bg-navy-800/60 p-2.5 rounded-xl border border-navy-700/60 flex items-center justify-between text-xs">
                          <span className="text-slate-300 flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-violetAccent-400" />
                            Fluid Cart Drawer & Instant Checkout
                          </span>
                          <span className="text-emerald-400 font-mono text-[11px]">Live on Render</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Verified Deployment</span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                        >
                          <span>Open Live App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
