import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectsShowcase = ({ title, projects = [] }) => {
  return (
    <section className="relative bg-slate-50 py-24 border-b border-slate-200 overflow-hidden">
      {/* Abstract Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.35] z-0 pointer-events-none mix-blend-multiply" 
        style={{ backgroundImage: `url('/bg-projects.png')` }}
      ></div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Flagship Capstone Projects</h2>
            <p className="text-slate-600">Don't just learn theory. Build complex, production-grade applications that solve real industry problems and make your portfolio stand out.</p>
          </div>
          <button className="hidden md:inline-flex px-6 py-3 border border-slate-200 text-slate-700 bg-white rounded-xl hover:bg-slate-100 transition-colors font-semibold text-sm shadow-sm">
            View All Alumni Projects
          </button>
        </div>

        {/* 5-Card Asymmetric Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={`bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8 hover:bg-slate-50 transition-all duration-300 group flex flex-col ${project.featured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white to-slate-50' : ''}`}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
              
              <h3 className={`${project.featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors`}>
                {project.title}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                {project.desc}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-100">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                    View Details <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors ml-auto">
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="md:hidden w-full mt-8 px-6 py-4 border border-slate-200 bg-white text-slate-700 shadow-sm rounded-xl hover:bg-slate-50 transition-colors font-semibold text-sm">
          View All Alumni Projects
        </button>

      </div>
    </section>
  );
};

export default ProjectsShowcase;
