import React from "react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaFileAlt,
  FaLightbulb,
  FaBolt,
  FaCrosshairs,
  FaRegFileAlt,
  FaSearch,
  FaInfoCircle,
  FaExclamationTriangle,
  FaMagic
} from "react-icons/fa";
import { ATS_WRITING_TIPS } from "../data/templatesData";

const AtsEduSection = () => {
  const getTipIcon = (name) => {
    switch (name) {
      case "page": return <FaRegFileAlt className="text-xl" />;
      case "chart": return <FaChartLine className="text-xl" />;
      case "bolt": return <FaBolt className="text-xl" />;
      case "target": return <FaCrosshairs className="text-xl" />;
      case "shield": return <FaShieldAlt className="text-xl" />;
      case "search": return <FaSearch className="text-xl" />;
      default: return <FaLightbulb className="text-xl" />;
    }
  };

  return (
    <div className="space-y-20 py-12">
      {/* =========================================================
          1. ATS INFORMATION & EDUCATION SECTION
         ========================================================= */}
      <div className="bg-gradient-to-br from-gray-950 via-[#102d32] to-gray-950 text-white rounded-[32px] p-7 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden border border-gray-800/80">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/25 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs uppercase tracking-widest border border-emerald-500/30">
            <FaCheckCircle className="text-emerald-400" /> Demystifying Corporate Screening
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            How Applicant Tracking Systems (<span className="text-secondary">ATS</span>) Work
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Over 75% of job applications are rejected by automated software before a recruiter ever lays eyes on them. Here is what you need to know to pass every digital screening.
          </p>
        </div>

        {/* 3 Core Pillar Cards (What is ATS, Why it Matters, How our Templates Help) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {/* Card 1: What is ATS? */}
          <div className="bg-white/[0.07] backdrop-blur-xl rounded-3xl p-7 border border-white/10 hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/30 flex items-center justify-center text-secondary mb-5 shadow-inner border border-white/10 group-hover:scale-110 transition-transform">
                <FaRobot className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                What is an ATS?
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                An <strong className="text-white">Applicant Tracking System (ATS)</strong> is enterprise recruitment software (like Workday, Greenhouse, Taleo, or Lever) used by employers to automatically collect, scan, sort, and rank thousands of candidate resumes based on strict keyword algorithms.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/10 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
              ✔ Used by 99% of Fortune 500 tech firms
            </div>
          </div>

          {/* Card 2: Why ATS Matters */}
          <div className="bg-white/[0.07] backdrop-blur-xl rounded-3xl p-7 border border-white/10 hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-5 shadow-inner border border-white/10 group-hover:scale-110 transition-transform">
                <FaExclamationTriangle className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                Why Does ATS Matter?
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                If your document contains complex multi-column tables, text boxes, custom icons, or unsupported fonts, the ATS parser garbles or skips the content entirely—scoring your resume a <strong className="text-red-300 font-bold">0/100</strong> and instantly triggering an automated rejection email.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/10 text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
              ⚠ Visual clutter destroys parser accuracy
            </div>
          </div>

          {/* Card 3: How These Templates Help */}
          <div className="bg-white/[0.07] backdrop-blur-xl rounded-3xl p-7 border border-white/10 hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 shadow-inner border border-white/10 group-hover:scale-110 transition-transform">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                How Our Templates Help
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Every AccenLearn template is engineered from the ground up with <strong className="text-white font-semibold">strict single-column XML hierarchy</strong>, standard recruiter headings, and clean semantic spacing that guarantees 100% flawless parsing and maximum scannability.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/10 text-[11px] font-bold text-secondary flex items-center gap-1.5">
              ✨ Engineered by senior tech recruiters
            </div>
          </div>
        </div>

        {/* Benefits Summary Bar */}
        <div className="mt-10 bg-white/[0.04] rounded-2xl p-6 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center relative z-10">
          <div>
            <span className="block text-2xl font-black text-secondary font-mono">100%</span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Flawless Text Parsing</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-emerald-400 font-mono">6 Sec</span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Recruiter Eye Scan</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-white font-mono">0</span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hidden Graphic Layers</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-blue-400 font-mono">250+</span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Companies Tested</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. RESUME WRITING TIPS (6 MODERN CARDS)
         ========================================================= */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-primary tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3 border border-primary/20">
            Recruiter Playbook
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            6 Golden Rules for a High-Converting Resume
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Apply these essential writing habits alongside our ATS templates to turn your resume into a top-1% interview magnet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {ATS_WRITING_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-110 ${tip.color}`}>
                    {getTipIcon(tip.iconName)}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    Rule #{tip.id}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2.5">
                  {tip.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
                <span className="flex items-center gap-1 text-emerald-600">✔ Recruiter Approved</span>
                <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform">High Impact →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AtsEduSection;
