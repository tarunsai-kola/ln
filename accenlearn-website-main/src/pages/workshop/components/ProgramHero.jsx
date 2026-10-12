import React from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaArrowTrendUp, FaBolt, FaCalendarCheck } from "react-icons/fa6";

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
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-slate-900 text-xs font-bold tracking-[0.2em] uppercase">
              16-WEEK PROFESSIONAL ACCELERATOR
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            {content.headline.split('.')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
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
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              Apply Now
            </button>
            <button
              onClick={onDownload}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow hover:border-slate-300"
            >
              View Curriculum
            </button>
          </div>
        </div>

        {/* 4 Premium Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 lg:mt-20 max-w-5xl mx-auto w-full">
          {[
            {
              value: "500+",
              label: "Hiring Partners",
              subtext: "Direct MNC placement network",
              icon: <FaBuilding className="w-5 h-5" />,
              iconBg: "bg-blue-50",
              iconColor: "text-blue-600",
              accent: "from-blue-500 to-indigo-500",
              badge: "Placement Drive",
            },
            {
              value: "150%",
              label: "Avg. Salary Hike",
              subtext: "Verified career acceleration",
              icon: <FaArrowTrendUp className="w-5 h-5" />,
              iconBg: "bg-emerald-50",
              iconColor: "text-emerald-600",
              accent: "from-emerald-500 to-teal-500",
              badge: "Career Growth",
            },
            {
              value: "3x",
              label: "Career ROI",
              subtext: "Fast investment payback period",
              icon: <FaBolt className="w-5 h-5" />,
              iconBg: "bg-indigo-50",
              iconColor: "text-indigo-600",
              accent: "from-indigo-500 to-purple-500",
              badge: "Value Multiplier",
            },
            {
              value: content.duration ? content.duration.replace("MONTHS", "Mos").replace("2/3 MOS", "16 Wks") : "16 Wks",
              label: "Program Duration",
              subtext: "Hands-on practical deliverables",
              icon: <FaCalendarCheck className="w-5 h-5" />,
              iconBg: "bg-amber-50",
              iconColor: "text-amber-600",
              accent: "from-amber-500 to-orange-500",
              badge: "Flexible Track",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg} ${stat.iconColor} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100/90 px-2.5 py-1 rounded-full">
                  {stat.badge}
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-relaxed">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHero;
