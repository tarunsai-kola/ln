import React from "react";
import { Link } from "react-router-dom";

const ProgramHero = ({ content, onEnroll, onDownload }) => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-slate-200">
      {/* Course Specific Background Image */}
      {content.heroImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] z-0" 
            style={{ backgroundImage: `url(${content.heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 z-0"></div>
        </>
      )}

      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] pointer-events-none opacity-40 mix-blend-multiply z-0">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-200 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-200 rounded-full blur-[120px] opacity-40"></div>
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none z-0"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-blue-300 text-xs font-bold tracking-[0.2em] uppercase">
              16-WEEK PROFESSIONAL PROGRAM
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            {content.headline.split('.')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              {content.headline.includes('.') ? content.headline.split('.')[1] : "For the Future."}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button 
              onClick={onEnroll}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-1"
            >
              Apply Now
            </button>
            <button 
              onClick={onDownload}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl transition-all duration-300 shadow-sm"
            >
              View Curriculum
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center gap-10 sm:gap-6 mt-20 bg-[#112455] rounded-3xl p-8 lg:px-16 lg:py-10 shadow-2xl border border-white/5">
          {[
            { value: "500+", label: "Hiring Partners" },
            { value: "150%", label: "Avg. Salary Hike" },
            { value: "3x", label: "Return on Investment" },
            { value: "16 Wks", label: "Program Duration" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center w-full sm:w-auto">
              <div className="text-3xl lg:text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-[11px] lg:text-xs font-bold text-[#eab308] uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHero;
