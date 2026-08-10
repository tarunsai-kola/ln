import PaymentPlanWidget from "./PaymentPlanWidget";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown, CheckCircle2, TerminalSquare, Network, BrainCircuit,
  ShieldCheck, Workflow, Layers, ArrowRight,
  Briefcase, TrendingUp, Landmark, BarChart3, UserCheck, Code,
  Cpu, Server, MonitorPlay, MessageSquare, Target
} from "lucide-react";
import AdvancedApplyPopup from "./AdvancedApplyPopup";
import PremiumCurriculum from "./PremiumCurriculum";
import ProgramStatsBar from "./ProgramStatsBar";
import TopOnePercent from "./TopOnePercent";
import Certification from "../page/AdvanceCourse/Components/Certification";
import ApplyNowButton from "../page/AdvanceCourse/Components/ApplyNowButton";
import SalaryGrowth from "./SalaryGrowth";
import CareerOutcomes from "./CareerOutcomes";
import MarketLeaders from "./MarketLeaders";
import MeetYourMentors from "./MeetYourMentors";
import FloatingNav from "./FloatingNav";
import AuthorityMarquee from "./AuthorityMarquee";
import "../page/VLSI.css";





const PremiumCourseLayout = ({ data }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Map string icon names to actual Lucide components
  const iconMap = {
    ChevronDown, CheckCircle2, TerminalSquare, Network, BrainCircuit,
    ShieldCheck, Workflow, Layers, ArrowRight,
    Briefcase, TrendingUp, Landmark, BarChart3, UserCheck, Code,
    Cpu, Server, MonitorPlay, MessageSquare, Target
  };

  const [activeCareerPath, setActiveCareerPath] = useState(0);
  const [isCareerPathHovered, setIsCareerPathHovered] = useState(false);
  const [heroImageIdx, setHeroImageIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-rotate Hero Images
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % data.heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate Career Paths
  useEffect(() => {
    if (isCareerPathHovered) return;
    const timer = setInterval(() => {
      setActiveCareerPath((prev) => (prev + 1) % data.careerPaths.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isCareerPathHovered]);

  return (
    <div className="ds-bg">

      {/* ============================================================
          1. HERO
          ============================================================ */}
      <section id="overview" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-[#020408]">
        
        {/* 1. Full-Bleed Immersive Background */}
        <div className="absolute inset-0 z-0">
          {data.heroImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${data.heroTitle} ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover mix-blend-screen transition-opacity duration-[2000ms] ease-in-out ${heroImageIdx === idx ? "opacity-50" : "opacity-0"}`}
            />
          ))}
          
          {/* Deep Vignette Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,4,8,0.3)_0%,rgba(2,4,8,0.95)_100%)] pointer-events-none" />
          
          {/* Intense Floating Orbs for 3D Depth (Gold Theme) */}
          <div 
            className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#eab308]/20 blur-[130px] rounded-full pointer-events-none mix-blend-screen animate-pulse" 
          />
          <div 
            className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-[#f59e0b]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen animate-pulse" 
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* 2. Floating God-Tier Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center mt-[-8vh]">
          {/* Premium Glass Badge */}
          <div
            className="mb-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase border border-white/15 bg-white/[0.03] backdrop-blur-2xl text-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-[#eab308] opacity-100" />
              <span className="absolute w-4 h-4 rounded-full bg-[#eab308]/40 animate-ping" />
            </div>
            16-Week Professional Program
          </div>

          {/* Epic Metallic Typography */}
          <h1
            className="font-black ag-font-outfit mb-8 leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontSize: "clamp(50px, 9vw, 110px)" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] pb-2">
              {data.heroTitle}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-[22px] text-gray-400 mb-16 max-w-3xl leading-relaxed font-medium px-4 drop-shadow-lg"
          >
            {data.heroSubtitle}
          </p>

          {/* Hyper-Premium Interactive Elements */}
          <div className="flex flex-col items-center gap-12 px-4">
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* Spinning Conic Gradient Button */}
              <div className="relative group rounded-full p-[2px] overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.7)] transition-shadow duration-500">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(234,179,8,1)_360deg)] animate-[spin_3s_linear_infinite] opacity-100" />
                <div className="absolute inset-0 bg-[#eab308]/20 backdrop-blur-md" />
                <div className="relative">
                  <ApplyNowButton
                    courseValue={data.careerOutcomesDomain || "Advanced Course"}
                    className="!px-12 !py-5 !text-[16px] !rounded-full !bg-[#05070a]/90 hover:!bg-[#05070a]/70 transition-colors backdrop-blur-2xl text-white font-black tracking-wide"
                    label="Apply Now"
                  />
                </div>
              </div>

              {/* Glass Outline Button */}
              <button
                onClick={() => setShowPopup(true)}
                className="px-12 py-5 text-[16px] font-black tracking-wide rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl text-gray-200 hover:bg-white/15 hover:border-white/40 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                View Curriculum
              </button>
            </div>
            
            {/* Gold Placement Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 mx-auto w-fit bg-[#241a04] rounded-[16px] py-3 px-8 md:px-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 shadow-2xl border border-[#4d3306]"
            >
               {/* Placements */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#a16207] flex items-center justify-center shadow-inner shrink-0">
                     <Briefcase className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-yellow-100/70 text-[10px] font-bold mb-0.5">Placements</p>
                     <p className="text-white text-[20px] font-bold leading-none">1100+</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-white/10"></div>

               {/* Salary Hike */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#a16207] flex items-center justify-center shadow-inner shrink-0">
                     <TrendingUp className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-yellow-100/70 text-[10px] font-bold mb-0.5">Salary Hike</p>
                     <p className="text-white text-[18px] font-bold leading-[1.1]">Upto <br/> 350%</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-white/10"></div>

               {/* ROI */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#a16207] flex items-center justify-center shadow-inner shrink-0">
                     <Landmark className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-yellow-100/70 text-[10px] font-bold mb-0.5">ROI on Course</p>
                     <p className="text-white text-[20px] font-bold leading-none">10x to 20X</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <ProgramStatsBar stats={data.trustStats} labelColor="text-[#eab308]" />
      
      {/* COLLABORATION COMPANY MARQUEE */}
      <AuthorityMarquee theme="dark" />

      {/* TOP ONE PERCENT (PROGRAM HIGHLIGHTS) */}
      <TopOnePercent
        badge="Program Highlights"
        title="Built for"
        titleHighlight={data.seriousCareersLabel || "Serious Careers"}
        subtitle={data.topOnePercentSubtitle || "Gain the technical depth required to stand out in the top 1% of the tech industry."}
      />

      {/* CAREER TRACKS */}
      <section id="paths" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="inline-block bg-[#eab308]/15 text-[#eab308] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Career Tracks
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight leading-tight">
                Find the right track for your role
              </h2>
              <p className="text-gray-400 text-lg mt-3">
                {data.trackSubtitle}
              </p>
            </div>
            <ApplyNowButton
              courseValue={data.careerOutcomesDomain || "Advanced Course"}
              className="!px-6 !py-3 !text-sm !rounded-xl whitespace-nowrap !bg-[#eab308] hover:!bg-[#ca8a04] !text-black"
              label={data.trackButtonLabel}
            />
          </div>

          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            onMouseEnter={() => setIsCareerPathHovered(true)}
            onMouseLeave={() => setIsCareerPathHovered(false)}
          >
            {/* Accordions */}
            <div className="flex flex-col gap-4">
              {data.careerPaths.map((path, idx) => {
                const isActive = activeCareerPath === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      isActive ? "border-white/20 bg-white/[0.04]" : "border-white/5 bg-[#0A0A0A] hover:border-white/10"
                    }`}
                    onClick={() => setActiveCareerPath(idx)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-[#eab308] text-black text-[11px] font-bold px-3 py-1 rounded">
                          {path.exp}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white">{path.title}</h3>

                      <div 
                        className={`transition-all duration-500 ease-in-out overflow-hidden`}
                        style={{ maxHeight: isActive ? '500px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="text-gray-400 text-sm leading-relaxed mt-3 mb-5">{path.desc}</p>
                        <div className="pt-5 border-t border-white/10">
                          <h4 className="text-white font-bold text-sm mb-3">What you'll gain</h4>
                          <ul className="flex flex-col gap-2.5">
                            {path.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-gray-400 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#eab308] shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto border border-white/10">
              {data.careerPaths.map((path, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeCareerPath === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                    <p className="text-white text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-[#eab308] pl-5 drop-shadow-lg">
                      "{path.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <PremiumCurriculum 
        phases={data.phases} 
        title={data.roadmapTitle || "Advanced Curriculum Roadmap"} 
        accentColor="text-[#eab308]" 
        bgColor="bg-[#020408]"
        cardBgColor="bg-[#0B1014]"
      />

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="inline-block bg-[#eab308]/15 text-[#eab308] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Projects
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight">
                Flagship Capstone Projects
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.capstoneProjects.map((project, i) => (
              <div
                key={i}
                className="glass-panel rounded-[28px] p-8 relative overflow-hidden group cursor-pointer border border-white/5 hover:border-[#eab308]/30 transition-all duration-500 min-h-[380px] flex flex-col"
                onClick={() => setShowPopup(true)}
              >
                 {/* Faded Background Image */}
                 <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10 group-hover:opacity-30 mix-blend-luminosity transition-all duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${data.heroImages[i % data.heroImages.length]})` }}
                 ></div>
                 {/* Gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent z-0 pointer-events-none"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                          {React.createElement(iconMap[project.icon] || Layers, {
                            size: 24,
                            className: "text-gray-400 group-hover:text-[#eab308] transition-colors duration-500",
                            strokeWidth: 1.5,
                          })}
                       </div>
                       <span className="text-[11px] font-bold text-[#eab308] bg-[#eab308]/10 px-3 py-1.5 rounded-full border border-[#eab308]/20 backdrop-blur-md">{data.projectLabel || "Advanced Project"}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#eab308] transition-colors">
                       {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                       {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                       {project.tools.slice(0,3).map(t => (
                          <span key={t} className="text-[10px] font-semibold bg-white/5 border border-white/5 text-zinc-300 px-3 py-1.5 rounded-lg">
                             {t}
                          </span>
                       ))}
                       {project.tools.length > 3 && (
                          <span className="text-[10px] font-semibold bg-white/5 border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg">
                             +{project.tools.length - 3}
                          </span>
                       )}
                    </div>

                    <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 pt-4 border-t border-white/5">
                       View Project Details <ArrowRight size={16} className="ml-2 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                 </div>
              </div>
            ))}

            {/* 6th card: Clean CTA */}
            <div className="bg-gradient-to-br from-[#eab308]/5 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-[#eab308]/10">
              <div className="w-16 h-16 bg-[#eab308]/10 rounded-full flex items-center justify-center mb-6 border border-[#eab308]/30">
                <Layers size={28} className="text-[#eab308]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 leading-tight ag-font-outfit">
                More projects<br/>waiting for you
              </h3>
              <p className="text-gray-400 text-[15px] mb-8 max-w-[240px] leading-relaxed">
                Build a portfolio that proves your expertise and gets you hired.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-[#eab308] hover:bg-[#ca8a04] text-black font-bold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_4px_14px_rgba(234,179,8,0.4)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.6)] hover:-translate-y-0.5"
              >
                Start Learning <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="py-24 px-6 bg-[#0B0F13]">
        <div className="max-w-6xl mx-auto">
          <Certification />
        </div>
      </section>

      
      {/* TOOLS & TECHNOLOGIES */}
      <section id="tools" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#eab308]/15 text-[#eab308] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black ag-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-slate-400 text-lg">{data.toolsSubtitle || "Master the modern tech stack"}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {data.toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#0B0F13] rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-[#eab308]/50 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={`w-9 h-9 object-contain ${tool.invert ? "invert opacity-80" : ""}`} />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest text-center leading-tight uppercase group-hover:text-[#eab308] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY GROWTH */}
      {data.careerOutcomesDomain && <SalaryGrowth domain={data.careerOutcomesDomain} />}

      {/* CAREER OUTCOMES */}
      {data.careerOutcomesDomain && <CareerOutcomes domain={data.careerOutcomesDomain} />}

      {/* MARKET LEADERS */}
      <MarketLeaders />

      {/* MEET YOUR MENTORS */}
      <MeetYourMentors />

      {/* PRICING */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/5" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#eab308]/15 text-[#eab308] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Pricing & Financing
            </span>
            <h2 className="text-3xl md:text-[44px] font-black text-white tracking-tight mb-3">
              Invest in your future
            </h2>
            <p className="text-gray-400 text-lg">Transparent pricing. Flexible payment options.</p>
          </div>
          <PaymentPlanWidget basePrice={51999} durationMonths={6} courseName={data.careerOutcomesDomain || "Advanced Course"} themeColor="#eab308" />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "96px 24px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 className="ag-font-outfit" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.02em", textAlign: "center", marginBottom: "48px" }}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.faqData.map((faq, i) => (
              <div key={i} className="ag-card" style={{ cursor: "pointer", padding: "0" }} onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}>
                <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ fontWeight: 700, color: "var(--text)", fontSize: "15px", margin: 0 }}>{faq.q}</h4>
                  <ChevronDown size={18} style={{ color: "#64748b", transform: openFaqIdx === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                </div>
                {openFaqIdx === i && (
                  <div style={{ padding: "0 24px 20px", color: "#94a3b8", fontSize: "14px", lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showPopup && <AdvancedApplyPopup onClose={() => setShowPopup(false)} initialDomain={data.careerOutcomesDomain || "Advanced Course"} />}
    </div>
  );
};

export default PremiumCourseLayout;