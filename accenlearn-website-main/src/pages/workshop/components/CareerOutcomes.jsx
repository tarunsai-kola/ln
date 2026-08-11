import React from "react";
import { FaBriefcase, FaArrowRight } from "react-icons/fa";

const CareerOutcomes = ({ title }) => {
  const roles = [
    {
      title: `${title} Engineer`,
      badge: "High Demand",
      avg: "12 LPA",
      highest: "35 LPA",
      skills: ["System Design", "Architecture", "Optimization"]
    },
    {
      title: "Data Scientist / Analyst",
      badge: "Fastest Growing",
      avg: "10 LPA",
      highest: "28 LPA",
      skills: ["Python", "SQL", "Machine Learning"]
    },
    {
      title: "Full Stack Developer",
      badge: "Most Common",
      avg: "9 LPA",
      highest: "25 LPA",
      skills: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Cloud Architect",
      badge: "Premium Role",
      avg: "18 LPA",
      highest: "45 LPA",
      skills: ["AWS/Azure", "Kubernetes", "DevOps"]
    },
    {
      title: "Product Manager (Tech)",
      badge: "Leadership",
      avg: "15 LPA",
      highest: "40 LPA",
      skills: ["Agile", "Strategy", "User Research"]
    },
    {
      title: "Cyber Security Analyst",
      badge: "Niche Skill",
      avg: "11 LPA",
      highest: "30 LPA",
      skills: ["Network Security", "Ethical Hacking", "SIEM"]
    }
  ];

  return (
    <section className="bg-slate-50 py-24 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Career Roles After This Program</h2>
            <p className="text-slate-600">Our alumni have successfully transitioned into these high-growth roles across top tech companies and exciting startups.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-500 cursor-pointer">
            View Placement Report <FaArrowRight />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, idx) => (
            <div key={idx} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-center">
                  <FaBriefcase className="w-5 h-5 text-blue-600" />
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-500/20">
                  {role.badge}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-6">{role.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Avg Package</p>
                  <p className="text-lg font-bold text-slate-900">{role.avg}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Highest</p>
                  <p className="text-lg font-bold text-blue-600">{role.highest}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Key Skills Required</p>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-[11px] font-medium rounded border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CareerOutcomes;
