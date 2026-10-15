import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  CheckCircle2,
  Download,
  Search,
  ShieldAlert,
  Hammer,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { Badge } from '../components/common/badge';
import { Button } from '../components/common/button';
import { projectsData } from '../config/projects.config';

export const MedConnectCaseStudy: React.FC = () => {
  const project = projectsData.find((p) => p.slug === 'medconnect')!;
  const [activeTab, setActiveTab] = useState<'overview' | 'prescriptions' | 'directory'>('overview');

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <SEOHead
        title="MedConnect Healthcare Platform Case Study | Saurabh"
        description="Comprehensive case study of MedConnect, a healthcare platform architecture designed for doctor discovery, digital prescriptions, and structured patient-practitioner workflows."
        canonicalPath="/projects/medconnect"
      />

      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded p-1"
            >
              <ArrowLeft className="w-4 h-4 text-electric-400" />
              <span>Back to Featured Case Studies</span>
            </Link>
          </div>

          {/* Case Study Header Banner */}
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-navy-700/80 mb-12 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm animate-pulse">
                <Hammer className="w-3.5 h-3.5 text-amber-400" />
                <span>Work In Progress — Active Development</span>
              </div>
              <Badge variant="electric" size="md">
                {project.category}
              </Badge>
              <span className="text-xs font-mono text-slate-400">
                Verified Architecture
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-electric-300 font-medium">
              {project.tagline}
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {project.liveUrl && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-navy-950 font-bold text-sm shadow-lg shadow-amber-900/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
                >
                  <Hammer className="w-4 h-4 text-navy-950 group-hover:rotate-12 transition-transform" />
                  <span>Launch Live Prototype (Work in Progress)</span>
                  <ArrowRight className="w-4 h-4 text-navy-950" />
                </a>
                <span className="text-xs font-mono text-amber-400">
                  Host: {project.liveUrl}
                </span>
              </div>
            )}

            {/* Mandatory Disclaimer Box */}
            <div className="mt-8 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-amber-200 text-xs sm:text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Project Scope Notice:</strong>
                {project.disclaimer}
              </div>
            </div>
          </div>

          {/* Interactive UI Mockup Showcase */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-electric-400" />
                <span>Interface & Workflow Previews</span>
              </h2>

              <div className="flex items-center gap-1.5 bg-navy-900 p-1 rounded-xl border border-navy-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-electric-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Doctor Discovery
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('prescriptions')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'prescriptions'
                      ? 'bg-electric-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Digital Prescription
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('directory')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'directory'
                      ? 'bg-electric-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Appointment Flow
                </button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-navy-700/80 shadow-xl bg-navy-900/70">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300 font-mono">
                        Filter: Cardiology | Teleconsultation | Available Now
                      </span>
                    </div>
                    <Badge variant="emerald" size="sm">2 Specialists Found</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-electric-600/20 text-electric-400 flex items-center justify-center font-bold text-sm">
                          SR
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Dr. Sarah Rao, MD</div>
                          <div className="text-xs text-electric-400 font-medium">Chief Interventional Cardiologist</div>
                          <div className="text-[11px] text-slate-400">12+ Years Experience • AIIMS Delhi Alum</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-navy-850 flex items-center justify-between text-xs text-slate-300">
                        <span>Consultation: ₹800</span>
                        <Badge variant="electric" size="sm">Next Slot: 4:30 PM</Badge>
                      </div>
                    </div>

                    <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-violetAccent-600/20 text-violetAccent-400 flex items-center justify-center font-bold text-sm">
                          AM
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Dr. Anand Mehta, MBBS</div>
                          <div className="text-xs text-violetAccent-400 font-medium">Preventive Cardiology Specialist</div>
                          <div className="text-[11px] text-slate-400">9+ Years Experience • Apollo Fellow</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-navy-850 flex items-center justify-between text-xs text-slate-300">
                        <span>Consultation: ₹650</span>
                        <Badge variant="violet" size="sm">Next Slot: Tomorrow</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'prescriptions' && (
                <div className="space-y-4 font-sans">
                  <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                    <div>
                      <div className="text-xs font-mono text-slate-400">Prescription ID: RX-2026-0891</div>
                      <div className="text-sm font-bold text-white">Patient: Rajesh Kumar • Age: 42 • Gender: Male</div>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-electric-600/20 text-electric-400 border border-electric-500/40 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-electric-600/30 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export PDF</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-navy-950 text-slate-400 uppercase font-mono">
                        <tr>
                          <th className="p-2.5">Medication Name</th>
                          <th className="p-2.5">Dosage</th>
                          <th className="p-2.5">Frequency</th>
                          <th className="p-2.5">Duration</th>
                          <th className="p-2.5">Special Instructions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-850 text-slate-200">
                        <tr>
                          <td className="p-2.5 font-semibold text-white">Atorvastatin Calcium</td>
                          <td className="p-2.5">10 mg</td>
                          <td className="p-2.5">Once Daily (0-0-1)</td>
                          <td className="p-2.5">30 Days</td>
                          <td className="p-2.5 text-slate-400">Take with dinner</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-semibold text-white">Metoprolol Succinate</td>
                          <td className="p-2.5">25 mg</td>
                          <td className="p-2.5">Once Daily (1-0-0)</td>
                          <td className="p-2.5">30 Days</td>
                          <td className="p-2.5 text-slate-400">Take in morning after breakfast</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-navy-950 p-3 rounded-lg border border-navy-850 text-xs text-slate-300">
                    <strong className="text-white block mb-0.5">Doctor's Clinical Notes:</strong>
                    "Monitor resting pulse daily. Repeat lipid panel test in 4 weeks. Maintain low-sodium dietary regimen."
                  </div>
                </div>
              )}

              {activeTab === 'directory' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-navy-950 p-4 rounded-xl border border-navy-800">
                    <div className="w-8 h-8 rounded-full bg-electric-600/20 text-electric-400 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                      1
                    </div>
                    <div className="text-sm font-bold text-white mb-1">Select Specialty</div>
                    <div className="text-xs text-slate-400">
                      Cardiology, Pediatrics, General Medicine, Dermatology.
                    </div>
                  </div>

                  <div className="bg-navy-950 p-4 rounded-xl border border-navy-800">
                    <div className="w-8 h-8 rounded-full bg-violetAccent-600/20 text-violetAccent-400 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                      2
                    </div>
                    <div className="text-sm font-bold text-white mb-1">Pick Slot & Mode</div>
                    <div className="text-xs text-slate-400">
                      Direct video consultation room or clinic time slot.
                    </div>
                  </div>

                  <div className="bg-navy-950 p-4 rounded-xl border border-navy-800">
                    <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                      3
                    </div>
                    <div className="text-sm font-bold text-white mb-1">Instant RX & Follow-up</div>
                    <div className="text-xs text-slate-400">
                      View and download verified prescription PDF post-session.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section: The Problem & Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-navy-700/80 space-y-4">
              <h2 className="text-xl font-bold text-white">Problem Statement</h2>
              <ul className="space-y-3">
                {project.problemStatement.map((prob, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-2" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-navy-700/80 space-y-4">
              <h2 className="text-xl font-bold text-white">Project Objectives</h2>
              <ul className="space-y-3">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Feature Architecture Matrix */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Feature Implementation Matrix</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-navy-900/80 rounded-2xl p-5 border border-navy-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-slate-400">0{idx + 1}</span>
                      <Badge
                        variant={
                          feat.status === 'implemented'
                            ? 'emerald'
                            : feat.status === 'prototype'
                            ? 'electric'
                            : 'violet'
                        }
                        size="sm"
                      >
                        {feat.status === 'implemented'
                          ? 'Implemented'
                          : feat.status === 'prototype'
                          ? 'Prototype UI'
                          : 'Planned / Intended'}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Technology Architecture */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-navy-700/80 mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Verified Technology Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 flex flex-col justify-between"
                >
                  <span className="font-mono text-sm font-bold text-white">{tech.name}</span>
                  <span className="text-xs text-slate-400 mt-1">{tech.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Challenges & Technical Learnings */}
          <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-white">Challenges & Technical Learnings</h2>
            <div className="grid grid-cols-1 gap-5">
              {project.challengesAndLearnings.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 border border-navy-700/80 space-y-3"
                >
                  <h3 className="text-lg font-bold text-white">{item.challenge}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="bg-navy-950/80 p-3.5 rounded-xl border border-navy-850">
                      <span className="text-electric-400 font-bold block mb-1">
                        Architectural Solution:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{item.solution}</p>
                    </div>
                    <div className="bg-navy-950/80 p-3.5 rounded-xl border border-navy-850">
                      <span className="text-violetAccent-400 font-bold block mb-1">
                        Core Takeaway:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{item.takeaway}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action for Similar Projects */}
          <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center border border-electric-500/30 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-electric-600/10 via-transparent to-violetAccent-600/10 pointer-events-none"
              aria-hidden="true"
            />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Planning a Similar Custom Web Application?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6">
              {project.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/#contact">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Discuss Your Project
                </Button>
              </Link>
              <Link to="/#projects">
                <Button variant="secondary" size="lg">
                  View ClayVista Case Study
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
