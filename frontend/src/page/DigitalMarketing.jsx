import PaymentPlanWidget from "../Components/PaymentPlanWidget";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown, CheckCircle2, TerminalSquare, Network, BrainCircuit,
  ShieldCheck, Workflow, Layers, ArrowRight, TrendingUp, Landmark,
  Megaphone, Search, PenTool, BarChart3, Mail, Users
} from "lucide-react";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
import PremiumCurriculum from "../Components/PremiumCurriculum";
import ProgramStatsBar from "../Components/ProgramStatsBar";
import TopOnePercent from "../Components/TopOnePercent";
import Certification from "./AdvanceCourse/Components/Certification";
import ApplyNowButton from "./AdvanceCourse/Components/ApplyNowButton";
import SalaryGrowth from "../Components/SalaryGrowth";
import CareerOutcomes from "../Components/CareerOutcomes";
import MarketLeaders from "../Components/MarketLeaders";
import MeetYourMentors from "../Components/MeetYourMentors";
import AuthorityMarquee from "../Components/AuthorityMarquee";
import FloatingNav from "../Components/FloatingNav";
import "./DigitalMarketing.css"; 

// Reusing career path images
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";

/* ─── Static Data ─── */
const trustStats = [
  { value: "16 Weeks", label: "Duration" },
  { value: "100% Online", label: "Format" },
  { value: "30+ Tools", label: "Mastered" },
  { value: "Live Budgets", label: "Real Campaigns" },
  { value: "AI-Powered", label: "Marketing Workflows" },
];

const toolsList = [
  { name: "Analytics", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Facebook", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" },
  { name: "WordPress", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Mailchimp", img: "/tools/mailchimp.svg", invert: true },
  { name: "HubSpot", img: "https://cdn.worldvectorlogo.com/logos/hubspot-1.svg" },
  { name: "Canva", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
  { name: "Semrush", img: "/tools/semrush.svg", invert: true },
  { name: "ChatGPT", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", invert: true },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
];

const careerPaths = [
  {
    exp: "0–2 Years",
    title: "Digital Marketing Executives",
    desc: "Build a strong foundation in modern marketing. Transition from theory to executing high-ROI campaigns using SEO, Meta Ads, and Google Ads.",
    benefits: [
      "Master SEO, Keyword Strategy, and On-Page/Off-Page Optimization",
      "Run profitable Lead Generation Campaigns on Meta & Google",
      "Create high-converting content with Canva, CapCut, and ChatGPT"
    ],
    quote: "I want to stop guessing and start running campaigns that actually bring in measurable revenue.",
    image: careerPath0,
  },
  {
    exp: "2–6 Years",
    title: "Performance & Growth Marketers",
    desc: "Level up your marketing game by integrating AI, mastering GA4 analytics, and automating complex CRM workflows.",
    benefits: [
      "Integrate AI (Claude, Gemini, Midjourney) into daily content workflows",
      "Master GA4, Looker Studio, and deep funnel analysis",
      "Build complex email automation and lead scoring in HubSpot/Zapier"
    ],
    quote: "I need to leverage AI and automation to scale my campaigns and dramatically improve my ROAS.",
    image: careerPath1,
  },
  {
    exp: "6–10+ Years",
    title: "Marketing Directors & Strategy Leads",
    desc: "Learn to design comprehensive 360° digital growth strategies, manage large ad budgets, and lead marketing teams.",
    benefits: [
      "End-to-End Marketing Strategy, CRO, and A/B Testing",
      "Marketing Attribution and Customer Retention Architecture",
      "Leading cross-functional marketing and design teams"
    ],
    quote: "My focus is entirely on overarching growth strategy, analytics dashboards, and scaling brand presence.",
    image: careerPath2,
  },
];

const dmPhases = [
  {
    id: "phase-1",
    phase: "PHASE 1",
    duration: "WEEKS 1–4",
    title: "Marketing Foundations & SEO",
    focusLabel: "CURRICULUM",
    focus: [
      "W1: Marketing Foundations (Funnel, Lead Gen, KPIs, AI in Marketing)",
      "W2: Search Engine Optimization (On-Page, Technical, AI-SEO, Ahrefs)",
      "W3: Google Ads & Search (Search/Display/Video Ads, Conversion Tracking)",
      "W4: Social Media Marketing (Meta Suite, Organic Growth, Community)"
    ],
    application: "SEO Audit, Google Ads Campaign, Meta Organic Growth Plan"
  },
  {
    id: "phase-2",
    phase: "PHASE 2",
    duration: "WEEKS 5–8",
    title: "Performance, AI & Analytics",
    focusLabel: "CURRICULUM",
    focus: [
      "W5: Performance Marketing (Lead Gen Funnels, Retargeting, ROAS)",
      "W6: Content Marketing & AI (Prompt Engineering, Claude, Copywriting)",
      "W7: Analytics & Automation (GA4, HubSpot, Zapier, Mailchimp)",
      "W8: Advanced Growth (CRO, A/B Testing, Looker Studio Dashboarding)"
    ],
    application: "Performance Funnel, AI Content Plan, Marketing Automation Workflow"
  },
  {
    id: "phase-3",
    phase: "PHASE 3",
    duration: "WEEKS 9–12",
    title: "Industry Capstone Projects",
    focusLabel: "CURRICULUM",
    focus: [
      "W9: SEO & Organic Growth Project (Keyword Strategy, Search Console)",
      "W10: Performance Marketing Project (Google & Meta Ads Execution)",
      "W11: Marketing Automation Project (CRM Setup, Nurture Workflow)",
      "W12: Industry Capstone Project (End-to-End Marketing Strategy)"
    ],
    application: "Execute real-world marketing campaigns and business growth projects."
  },
  {
    id: "phase-4",
    phase: "PHASE 4",
    duration: "WEEKS 13–16",
    title: "Placement Preparation",
    focusLabel: "CURRICULUM",
    focus: [
      "W13: Personal Branding & Portfolio (LinkedIn, Case Study Portfolio)",
      "W14: Interview Preparation (SEO, Ads, GA4, AI Marketing Questions)",
      "W15: Industry Simulations (Client Pitches, Budget Scenarios)",
      "W16: Placement Acceleration (Job Search Strategy, HR Prep, Referrals)"
    ],
    application: "ATS-Friendly Resume, Interview Readiness, Job Offer Acceleration"
  }
];

const capstoneProjects = [
  { icon: Search, title: "SEO Audit & Optimization", desc: "Perform a complete technical and on-page SEO audit, keyword strategy, and build a Looker Studio SEO Dashboard.", tools: ["Ahrefs", "Search Console", "GA4"] },
  { icon: Megaphone, title: "Google Ads Lead Gen", desc: "Launch and optimize a Google Search/Display campaign focused entirely on driving high-intent B2B leads.", tools: ["Google Ads", "Tag Manager"] },
  { icon: Users, title: "Meta Ads Funnel", desc: "Design a full-funnel Meta Ads strategy including landing page creation, A/B testing creatives, and retargeting.", tools: ["Meta Ads", "Canva AI", "Clarity"] },
  { icon: Network, title: "Marketing Automation", desc: "Build a robust CRM workflow mapping lead scoring to automated email nurture sequences.", tools: ["HubSpot", "Zapier", "Mailchimp"] },
  { icon: PenTool, title: "AI Content Marketing", desc: "Leverage Claude and Gemini to scale content production, blogs, and copywriting for a brand.", tools: ["Claude", "Gemini", "WordPress"] },
  { icon: BarChart3, title: "Growth Marketing Dashboard", desc: "Integrate multi-channel marketing data into a comprehensive analytics dashboard for executive reporting.", tools: ["GA4", "Looker Studio"] },
];

const faqData = [
  { q: "What is the duration of the program?", a: "The program runs for 16 weeks (4 months), featuring live interactive sessions and real campaign execution." },
  { q: "Do I need prior marketing experience?", a: "No, Phase 1 starts from absolute marketing foundations and consumer journeys before scaling up to complex ads and AI." },
  { q: "What tools will I learn?", a: "You will master 30+ industry tools including Meta Ads, Google Ads, GA4, Ahrefs, HubSpot, Zapier, ChatGPT, and Midjourney." },
  { q: "Do you provide placement support?", a: "Yes! Weeks 13-16 are completely dedicated to Resume building, Portfolio creation, Mock Interviews, and direct Placement Outreach." },
  { q: "How much AI is involved?", a: "AI is deeply integrated. You will learn Prompt Engineering, AI SEO, AI Content Generation (Claude/Gemini), and AI Image Generation (Midjourney/Canva)." },
];

const DigitalMarketing = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeCareerPath, setActiveCareerPath] = useState(0);
  const [isCareerPathHovered, setIsCareerPathHovered] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-rotate Career Paths
  useEffect(() => {
    if (isCareerPathHovered) return;
    const timer = setInterval(() => {
      setActiveCareerPath((prev) => (prev + 1) % careerPaths.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isCareerPathHovered]);

  return (
    <div className="dm-bg">
      <FloatingNav />
      {/* ============================================================
          1. HERO
          ============================================================ */}
      <section id="overview" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-[#050200]">
        
        {/* 1. Full-Bleed Minimalist Bright Background */}
        <div className="absolute inset-0 z-0 bg-[#080300]">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

          {/* Vignette Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(5,2,0,0.98)_100%)] pointer-events-none" />
          
          {/* Bright Glowing Amber/Orange Orbs for Depth */}
          <div 
            className="absolute top-[5%] left-[20%] w-[500px] h-[500px] bg-[#f59e0b]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen" 
          />
          <div 
            className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-[#ea580c]/15 blur-[150px] rounded-full pointer-events-none mix-blend-screen" 
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* 2. Floating God-Tier Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center mt-[-8vh]">
          {/* Premium Glass Badge */}
          <div
            className="mb-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase border border-amber-500/30 bg-amber-900/20 backdrop-blur-2xl text-amber-200 shadow-[0_10px_40px_rgba(245,158,11,0.1)]"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-amber-400 opacity-100" />
              <span className="absolute w-4 h-4 rounded-full bg-amber-200/50 animate-ping" />
            </div>
            16-Week Professional Program
          </div>

          {/* Epic Metallic Typography */}
          <h1
            className="font-black ag-font-outfit mb-8 leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontSize: "clamp(50px, 9vw, 110px)" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300 pb-2">
              Digital Marketing
            </span>
            <span className="relative inline-block mt-2">
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-orange-600 drop-shadow-md">
                & AI Professional
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-[22px] text-amber-100/70 mb-16 max-w-3xl leading-relaxed font-medium px-4"
          >
            Plan, execute, and scale high-ROI digital campaigns using modern ad platforms, deep analytics, and cutting-edge AI workflows.
          </p>

          {/* Hyper-Premium Interactive Elements */}
          <div className="flex flex-col items-center gap-12 px-4">
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* Spinning Conic Gradient Button */}
              <div className="relative group rounded-full p-[2px] overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_50px_rgba(234,88,12,0.4)] transition-shadow duration-500">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(245,158,11,0.8)_360deg)] animate-[spin_3s_linear_infinite] opacity-100" />
                <div className="absolute inset-0 bg-amber-600/20 backdrop-blur-md" />
                <div className="relative">
                  <ApplyNowButton
                    courseValue="Digital Marketing"
                    className="!px-12 !py-5 !text-[16px] !rounded-full !bg-[#050200] hover:!bg-[#0f0600] transition-colors backdrop-blur-2xl text-white font-black tracking-wide"
                    label="Apply Now"
                  />
                </div>
              </div>

              {/* Glass Outline Button */}
              <button
                onClick={() => setShowPopup(true)}
                className="px-12 py-5 text-[16px] font-black tracking-wide rounded-full border border-amber-600/50 bg-white/5 backdrop-blur-2xl text-amber-200 hover:bg-white/10 hover:border-amber-400 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                View Curriculum
              </button>
            </div>
            
            {/* Ice White Placement Banner (Styled for Dark/Amber Theme) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 mx-auto w-fit bg-[#0f0600] rounded-[16px] py-3 px-8 md:px-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 shadow-2xl border border-amber-900/50"
            >
               {/* Placements */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-amber-950/50 flex items-center justify-center shadow-inner shrink-0 border border-amber-800/50">
                     <Megaphone className="text-amber-400" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-amber-200/60 text-[10px] font-bold mb-0.5">Placements</p>
                     <p className="text-white text-[20px] font-bold leading-none">1100+</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-amber-900/50"></div>

               {/* Salary Hike */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-amber-950/50 flex items-center justify-center shadow-inner shrink-0 border border-amber-800/50">
                     <TrendingUp className="text-amber-400" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-amber-200/60 text-[10px] font-bold mb-0.5">Salary Hike</p>
                     <p className="text-white text-[18px] font-bold leading-[1.1]">Upto <br/> 350%</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-amber-900/50"></div>

               {/* ROI */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-amber-950/50 flex items-center justify-center shadow-inner shrink-0 border border-amber-800/50">
                     <Landmark className="text-amber-400" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-amber-200/60 text-[10px] font-bold mb-0.5">ROI on Course</p>
                     <p className="text-white text-[20px] font-bold leading-none">10x to 20X</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <ProgramStatsBar stats={trustStats} labelColor="text-amber-200" />
      
      {/* COLLABORATION COMPANY MARQUEE */}
      <AuthorityMarquee theme="dark" />

      {/* TOP ONE PERCENT (PROGRAM HIGHLIGHTS) */}
      <TopOnePercent
        badge="Program Highlights"
        title="Engineered for"
        titleHighlight="Modern Growth Marketers"
        subtitle="Master the entire digital ecosystem, from SEO and Paid Ads to cutting edge AI content generation and marketing automation."
      />

      {/* CAREER TRACKS */}
      <section id="paths" className="py-24 px-6 bg-[#0f0600] border-t border-amber-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="inline-block bg-amber-950/50 text-amber-400 border border-amber-800/50 font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Career Tracks
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight leading-tight">
                Find the right track for your role
              </h2>
              <p className="text-amber-100/60 text-lg mt-3">
                A dedicated growth and performance track for every stage of your career.
              </p>
            </div>
            <ApplyNowButton
              courseValue="Digital Marketing"
              className="!px-6 !py-3 !text-sm !rounded-xl whitespace-nowrap !bg-amber-500 hover:!bg-amber-400 !text-black font-bold"
              label="Start Growing →"
            />
          </div>

          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            onMouseEnter={() => setIsCareerPathHovered(true)}
            onMouseLeave={() => setIsCareerPathHovered(false)}
          >
            {/* Accordions */}
            <div className="flex flex-col gap-4">
              {careerPaths.map((path, idx) => {
                const isActive = activeCareerPath === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      isActive ? "border-amber-600/50 bg-amber-950/40" : "border-amber-900/30 bg-[#1a0a00] hover:border-amber-700/50"
                    }`}
                    onClick={() => setActiveCareerPath(idx)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-amber-900/50 text-amber-300 border border-amber-700/50 text-[11px] font-bold px-3 py-1 rounded">
                          {path.exp}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-amber-500/50 transition-transform duration-300 ${isActive ? "rotate-180 text-amber-400" : ""}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white">{path.title}</h3>

                      <div 
                        className={`transition-all duration-500 ease-in-out overflow-hidden`}
                        style={{ maxHeight: isActive ? '500px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="text-amber-100/60 text-sm leading-relaxed mt-3 mb-5">{path.desc}</p>
                        <div className="pt-5 border-t border-amber-900/30">
                          <h4 className="text-white font-bold text-sm mb-3">What you'll gain</h4>
                          <ul className="flex flex-col gap-2.5">
                            {path.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-amber-100/60 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
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
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto border border-amber-900/30 grayscale sepia-[0.3]">
              {careerPaths.map((path, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeCareerPath === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-full object-cover mix-blend-screen opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#0a0400]/40 to-transparent flex flex-col justify-end p-8">
                    <p className="text-white text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-amber-500 pl-5 drop-shadow-lg">
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
        phases={dmPhases} 
        title="16-Week Marketing Roadmap" 
        accentColor="text-amber-400" 
        bgColor="bg-[#050200]"
        cardBgColor="bg-[#0f0600]"
      />

      {/* TECH STACK */}
      <section id="tools" className="py-24 px-6 bg-[#0f0600] border-t border-amber-950/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-950/50 text-amber-400 border border-amber-800/50 font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black ag-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-gray-400 text-lg">Master the modern digital marketing &amp; AI business stack</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#1a0b02] rounded-2xl flex items-center justify-center overflow-hidden border border-amber-950/50 transition-all duration-300 group-hover:scale-110 group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={`w-9 h-9 object-contain ${tool.invert ? "invert opacity-80" : ""}`} />
                  ) : (
                    <span className="text-sm font-bold text-gray-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest text-center leading-tight uppercase group-hover:text-amber-400 transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-[#0f0600] border-t border-amber-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="inline-block bg-amber-950/50 text-amber-400 border border-amber-800/50 font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Projects
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight">
                Flagship Marketing Portfolios
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capstoneProjects.map((project, i) => (
              <div
                key={i}
                className="glass-panel rounded-[28px] p-8 relative overflow-hidden group cursor-pointer border border-amber-900/30 hover:border-amber-500/50 transition-all duration-500 min-h-[380px] flex flex-col bg-[#1a0a00]"
                onClick={() => setShowPopup(true)}
              >
                 {/* Gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0a0400]/60 to-transparent z-0 pointer-events-none"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#050200] border border-amber-900/50 text-white shadow-[0_0_20px_rgba(245,158,11,0.05)] group-hover:scale-110 group-hover:border-amber-500 transition-all duration-500">
                          {React.createElement(project.icon, {
                            size: 24,
                            className: "text-amber-500/70 group-hover:text-amber-400 transition-colors duration-500",
                            strokeWidth: 1.5,
                          })}
                       </div>
                       <span className="text-[11px] font-bold text-amber-200 bg-amber-950/50 px-3 py-1.5 rounded-full border border-amber-800/50 backdrop-blur-md">Growth Project</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-amber-200 transition-colors">
                       {project.title}
                    </h3>
                    
                    <p className="text-amber-100/60 text-sm leading-relaxed mb-8 flex-grow">
                       {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                       {project.tools.slice(0,3).map(t => (
                          <span key={t} className="text-[10px] font-semibold bg-[#050200] border border-amber-900/50 text-amber-300/80 px-3 py-1.5 rounded-lg">
                             {t}
                          </span>
                       ))}
                       {project.tools.length > 3 && (
                          <span className="text-[10px] font-semibold bg-[#050200] border border-amber-900/50 text-amber-300/60 px-3 py-1.5 rounded-lg">
                             +{project.tools.length - 3}
                          </span>
                       )}
                    </div>

                    <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 pt-4 border-t border-amber-900/30">
                       View Project Details <ArrowRight size={16} className="ml-2 text-amber-500/70 group-hover:text-amber-400 transition-colors" />
                    </div>
                 </div>
              </div>
            ))}

            {/* 7th card: Clean CTA */}
            <div className="bg-gradient-to-br from-amber-900 to-orange-950 border border-amber-700/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-amber-500">
              <div className="w-16 h-16 bg-amber-950 rounded-full flex items-center justify-center mb-6 border border-amber-800">
                <Layers size={28} className="text-amber-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 leading-tight ag-font-outfit">
                360° Marketing<br/>Strategy
              </h3>
              <p className="text-amber-100/70 text-[15px] mb-8 max-w-[240px] leading-relaxed">
                Build 8 comprehensive portfolios combining Ads, SEO, and AI workflows.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-white hover:bg-amber-100 text-black font-bold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_4px_14px_rgba(245,158,11,0.2)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:-translate-y-0.5"
              >
                Start Growing <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="py-24 px-6 bg-[#050200]">
        <div className="max-w-6xl mx-auto">
          <Certification />
        </div>
      </section>

      {/* SALARY GROWTH */}
      <SalaryGrowth domain="DigitalMarketing" />

      {/* CAREER OUTCOMES */}
      <CareerOutcomes domain="DigitalMarketing" />

      {/* MARKET LEADERS */}
      <MarketLeaders />

      {/* MEET YOUR MENTORS */}
      <MeetYourMentors />

      {/* PRICING */}
      <section className="py-24 px-6 bg-[#0f0600] border-t border-white/5" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#f59e0b]/15 text-[#f59e0b] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Pricing & Financing
            </span>
            <h2 className="text-3xl md:text-[44px] font-black text-white tracking-tight mb-3">
              Invest in your future
            </h2>
            <p className="text-gray-400 text-lg">Transparent pricing. Flexible payment options.</p>
          </div>
          <PaymentPlanWidget basePrice={51999} durationMonths={6} courseName="Digital Marketing" themeColor="#f59e0b" />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "96px 24px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 className="ag-font-outfit" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.02em", textAlign: "center", marginBottom: "48px" }}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqData.map((faq, i) => (
              <div key={i} className="ag-card" style={{ cursor: "pointer", padding: "0" }} onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}>
                <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ fontWeight: 700, color: "var(--text)", fontSize: "15px", margin: 0 }}>{faq.q}</h4>
                  <ChevronDown size={18} style={{ color: "var(--text-muted)", transform: openFaqIdx === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                </div>
                {openFaqIdx === i && (
                  <div style={{ padding: "0 24px 20px", color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showPopup && <AdvancedApplyPopup onClose={() => setShowPopup(false)} initialDomain="Digital Marketing" />}
    </div>
  );
};

export default DigitalMarketing;