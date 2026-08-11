import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CurriculumRoadmap = ({ phases = [] }) => {
  const [openPhase, setOpenPhase] = useState(0);

  return (
    <section id="curriculum" className="relative bg-white py-24 border-b border-slate-200 overflow-hidden">
      {/* Abstract Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 z-0 pointer-events-none mix-blend-multiply" 
        style={{ backgroundImage: `url('/bg-roadmap.png')` }}
      ></div>

      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Curriculum Roadmap</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">A structured, phase-by-phase learning journey designed by industry veterans to take you from fundamentals to production-ready engineering.</p>
        </div>

        <div className="space-y-4">
          {phases.map((phase, idx) => (
            <div 
              key={idx} 
              className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${openPhase === idx ? "bg-slate-50 shadow-sm" : "bg-white hover:bg-slate-50"}`}
            >
              <button 
                onClick={() => setOpenPhase(openPhase === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white items-center justify-center border border-slate-200 shadow-sm">
                    {phase.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">{phase.weeks}</p>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">{phase.title}</h3>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-300 ${openPhase === idx ? "rotate-180 bg-blue-600" : ""}`}>
                  <FaChevronDown className={`w-4 h-4 ${openPhase === idx ? "text-white" : "text-slate-500"}`} />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openPhase === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-6 pt-0 sm:pl-[88px] text-slate-700">
                  <div className="h-[1px] w-full bg-slate-200 mb-6"></div>
                  <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mb-8 list-none">
                    {phase.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                        <span className="text-sm text-slate-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Real-World Application</p>
                    <p className="text-sm text-slate-700">{phase.application}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CurriculumRoadmap;
