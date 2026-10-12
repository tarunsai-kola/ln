import React from "react";
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaLayerGroup, FaArrowRight, FaCodeBranch } from "react-icons/fa";

const ProjectsShowcase = ({ title, projects = [] }) => {
  return (
    <section className="relative bg-slate-50 py-20 lg:py-24 border-b border-slate-200 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-blue-100/35 rounded-full blur-[150px] pointer-events-none -z-0"></div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-blue-700 text-xs font-bold tracking-wider uppercase">
                Production-Grade Portfolio Assets
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Flagship Capstone Projects
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Hiring panels evaluate candidate caliber by technical depth, not theoretical knowledge. Build verifiable, enterprise-grade deliverables with real-world datasets that prove commercial readiness in technical rounds.
            </p>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/90 rounded-xl shadow-xs text-xs font-semibold text-slate-700">
              <FaCheckCircle className="w-4 h-4 text-emerald-500" />
              <span>100% Production Codebase</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/90 rounded-xl shadow-xs text-xs font-semibold text-slate-700">
              <FaCodeBranch className="w-4 h-4 text-blue-600" />
              <span>Architecture & Peer Code Reviews</span>
            </div>
          </div>
        </div>

        {/* 5-Card Asymmetric Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={`group relative bg-white border border-slate-200/90 shadow-xs rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                project.featured 
                  ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-white to-blue-50/40 border-blue-200/70 shadow-sm' 
                  : ''
              }`}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header Tag & Featured Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                      <FaLayerGroup className="w-3 h-3 text-amber-600" />
                      Featured Milestone
                    </span>
                  )}
                </div>
                
                {/* Project Title */}
                <h3 className={`${project.featured ? 'text-2xl sm:text-3xl' : 'text-xl'} font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug`}>
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>

                {/* Deliverable Box */}
                {project.deliverable && (
                  <div className="bg-slate-50/90 border border-slate-200/70 rounded-xl p-3.5 mb-6 flex items-start gap-2.5">
                    <FaCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Core Deliverable: </strong>
                      {project.deliverable}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Card Footer: Tech Stack & Actions */}
              <div className="mt-auto pt-5 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-md bg-slate-100/80 text-slate-700 text-xs font-medium border border-slate-200/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <a 
                    href="#curriculum" 
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:underline"
                  >
                    <span>View Architecture Scope</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                  
                  <div 
                    title="Included in portfolio repository"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Portfolio Guarantee Card */}
        <div className="mt-12 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
              <FaLayerGroup className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                All projects are reviewed by active Senior Engineering Mentors
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Every learner completes full GitHub repository documentation, live hosted URLs, and mock architectural defense rounds.
              </p>
            </div>
          </div>

          <a 
            href="#curriculum"
            className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <span>Explore Curriculum Roadmap</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProjectsShowcase;
