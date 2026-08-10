import React from "react";
import { Link } from "react-router-dom";
import {
  FaFileInvoice,
  FaLinkedin,
  FaUserTie,
  FaMapMarkedAlt,
  FaBookOpen,
  FaArrowRight,
  FaCalendarCheck,
  FaGraduationCap,
  FaMagic,
  FaUsers,
  FaMoneyBillWave
} from "react-icons/fa";
import { RELATED_CAREER_RESOURCES } from "../data/templatesData";

const CareerResourcesSection = () => {
  const getResourceIcon = (id) => {
    switch (id) {
      case "cover-letter": return <FaFileInvoice className="text-2xl text-blue-600" />;
      case "linkedin-guide": return <FaLinkedin className="text-2xl text-sky-600" />;
      case "interview-prep": return <FaUserTie className="text-2xl text-emerald-600" />;
      case "career-roadmaps": return <FaMapMarkedAlt className="text-2xl text-amber-600" />;
      case "salary-guide": return <FaMoneyBillWave className="text-2xl text-teal-600" />;
      default: return <FaBookOpen className="text-2xl text-purple-600" />;
    }
  };

  return (
    <div className="space-y-20 py-12">
      {/* =========================================================
          1. RELATED CAREER RESOURCES SECTION
         ========================================================= */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-secondary uppercase tracking-widest bg-secondary/15 px-4 py-1.5 rounded-full inline-block mb-3 border border-secondary/20">
            Expand Your Career Toolkit
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Related Career & Placement Guides
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Your resume is just the first milestone. Explore our specialized cover letter suites, LinkedIn checklists, and technical interview roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {RELATED_CAREER_RESOURCES.map((res) => (
            <Link
              key={res.id}
              to={res.link}
              className="group bg-white rounded-3xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-gray-100 shadow-xs group-hover:scale-110 transition-transform ${res.iconColor || "bg-blue-50/80 text-blue-600"}`}>
                    {getResourceIcon(res.id)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-700 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {res.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2.5">
                  {res.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-gray-100 flex items-center justify-between text-xs font-extrabold text-primary group-hover:text-primary-dark">
                <span>Explore Guide</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1.5 text-secondary" />
              </div>
            </Link>
          ))}

          {/* 6th Card: Join Community / Peer Review Banner */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between border border-gray-700/80">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-secondary mb-5 border border-white/10">
                <FaUsers className="text-2xl" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-secondary block mb-1">
                Student Perks ✨
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                Need Live Peer Review on Your Resume?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Join our Discord community of 5,000+ tech learners where mentors and peers review resumes every weekend for free.
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-gray-700/80 flex items-center justify-between">
              <span className="text-xs font-extrabold text-secondary tracking-wide">Join Discord Community →</span>
              <span className="text-[10px] font-mono bg-secondary/20 text-secondary px-2 py-0.5 rounded-md">FREE</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. CAREER GUIDANCE CTA SECTION (PREMIUM GRADIENT BOX)
         ========================================================= */}
      <div className="bg-gradient-to-br from-[#133036] via-[#1f5761] to-[#2b7987] rounded-[32px] p-8 sm:p-12 lg:p-16 shadow-[0_24px_60px_rgba(31,87,97,0.35)] relative overflow-hidden text-white border border-white/20">
        {/* Glow & Pattern Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-extrabold text-xs uppercase tracking-widest border border-white/25 shadow-xs">
            <FaMagic className="text-secondary" /> Personalized Career Mentorship
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Need Help Building Your Recruiter-Ready Resume?
          </h2>

          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Don&apos;t leave your job search to chance. Our senior tech mentors can review your exact resume structure, run 1-on-1 mock technical rounds, and prepare you for top tier placements.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/internship"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-primary font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <FaCalendarCheck className="text-secondary text-lg" /> Book Career Guidance
            </Link>

            <Link
              to="/programs"
              className="w-full sm:w-auto px-8 py-4 bg-gray-950/80 hover:bg-gray-950 text-white font-black text-sm sm:text-base rounded-2xl border border-white/25 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-md"
            >
              <FaGraduationCap className="text-secondary text-lg" /> Explore Courses
            </Link>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-white/80 font-bold">
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✔</span> 100% Free Consultation</span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✔</span> Verified Recruiter Mentors</span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✔</span> Instant Feedback Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerResourcesSection;
