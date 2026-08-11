import React, { useState } from "react";
import { FaPython, FaReact, FaAws, FaDocker, FaDatabase, FaNodeJs } from "react-icons/fa";
import { SiTensorflow, SiKubernetes, SiMongodb, SiGraphql } from "react-icons/si";

const SalaryGrowth = ({ title, salaryData, techStack = [] }) => {
  const [activeLevel, setActiveLevel] = useState("mid"); // entry, mid, senior

  const currentData = salaryData ? salaryData[activeLevel] : null;

  return (
    <section className="bg-white py-24 border-b border-slate-200 relative overflow-hidden">
      
      {/* Tech Stack Marquee */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Master the most in-demand technologies</p>
        </div>
        
        <div className="relative flex overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex gap-16 items-center px-4">
            {techStack.map((tech, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm">
                  {tech.icon}
                </div>
                <span className="text-xs font-semibold text-slate-900">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Salary Component */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 shadow-sm rounded-3xl p-8 md:p-12 relative">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Salary Growth & Career Trajectory</h2>
            <p className="text-slate-600">See how your earning potential scales as you gain experience in this domain.</p>
          </div>

          {/* Segmented Control */}
          <div className="flex p-1 bg-slate-200 rounded-xl max-w-md mx-auto mb-12 relative z-10">
            {[
              { id: "entry", label: "Entry Level" },
              { id: "mid", label: "Mid Level" },
              { id: "senior", label: "Senior Level" }
            ].map(level => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  activeLevel === level.id 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>

          {/* Salary Display */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 relative z-10">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Minimum</p>
              <div className="text-3xl font-bold text-slate-900">{currentData.min}</div>
            </div>
            
            <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-2xl p-6 text-center transform md:-translate-y-4 shadow-sm">
              <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">Average</p>
              <div className="text-5xl font-black text-blue-600 mb-2">
                {currentData.avg}
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] uppercase font-bold tracking-widest mt-2">
                Most Common
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Maximum</p>
              <div className="text-3xl font-bold text-slate-900">{currentData.max}</div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 mt-4 text-center">
            <p className="text-slate-600 font-medium mb-4">Target Roles: <span className="text-slate-900 font-bold">{currentData.roles}</span></p>
            <p className="text-slate-500 text-sm mb-4">Top Hiring Companies for this tier:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {currentData.companies.map((company, i) => (
                <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-semibold shadow-sm">
                  {company}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SalaryGrowth;
