import PaymentPlanWidget from "../Components/PaymentPlanWidget";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown, CheckCircle2, TerminalSquare, Network, BrainCircuit,
  ShieldCheck, Workflow, Layers, ArrowRight,
  Briefcase, TrendingUp, Landmark, Code2, Database, Layout, Smartphone, Cloud
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
import "./AIFullStack.css"; // Silver scoped CSS

// We reuse the career path images
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";

/* ─── Static Data ─── */
const trustStats = [
  { value: "16 Weeks", label: "Duration" },
  { value: "100% Online", label: "Format" },
  { value: "8+ Projects", label: "Hands-on Practice" },
  { value: "Full Stack", label: "MERN & Next.js" },
  { value: "AI Integration", label: "Core Focus" },
];


const toolsList = [
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", invert: true },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invert: true },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
];

const careerPaths = [
  {
    exp: "0–2 Years",
    title: "Junior Full Stack Developers",
    desc: "Build a rock-solid foundation in modern web architecture. Transition from basic HTML/CSS to robust React and Node.js applications.",
    benefits: [
      "Master React, Next.js, Tailwind CSS, and DOM Manipulation",
      "Build production-grade REST APIs with Node.js and Express",
      "Deploy full-stack applications with databases (MongoDB/PostgreSQL)"
    ],
    quote: "I want to stop doing tutorials and start building and deploying real applications like a professional.",
    image: careerPath0,
  },
  {
    exp: "2–6 Years",
    title: "Senior AI & Full Stack Engineers",
    desc: "Level up your engineering by integrating powerful AI models into applications, handling complex states, and building scalable systems.",
    benefits: [
      "Integrate OpenAI, Gemini, and Prompt Engineering into applications",
      "Design complex database architectures with Prisma ORM",
      "Implement robust Authentication, Security, and CI/CD pipelines"
    ],
    quote: "I need to master AI integration and build complex SaaS products to reach the senior engineering level.",
    image: careerPath1,
  },
  {
    exp: "6–10+ Years",
    title: "Software Architects & Tech Leads",
    desc: "Learn to design highly scalable enterprise architectures, lead development teams, and oversee production deployments.",
    benefits: [
      "Enterprise System Design, Microservices, and Infrastructure",
      "Leading cross-functional full stack development teams",
      "Deploying scalable infrastructure with Docker and AWS"
    ],
    quote: "My focus is entirely on system architecture, security, and leading teams to build scalable enterprise platforms.",
    image: careerPath2,
  },
];

const sdPhases = [
  {
    id: "phase-1",
    phase: "PHASE 1",
    duration: "WEEKS 1–4",
    title: "Frontend Engineering",
    focusLabel: "CURRICULUM",
    focus: [
      "W1: Web Dev Foundations (HTML5, CSS Grid, Flexbox)",
      "W2: Modern JavaScript (DOM, Async, Fetch, ES6+)",
      "W3: React Development (Components, State, Hooks, Router)",
      "W4: Advanced Frontend (Next.js, Tailwind CSS, Auth UI)"
    ],
    application: "Responsive Business Site, Task Manager App, SaaS Dashboard"
  },
  {
    id: "phase-2",
    phase: "PHASE 2",
    duration: "WEEKS 5–8",
    title: "Backend, AI & DevOps",
    focusLabel: "CURRICULUM",
    focus: [
      "W5: Backend Development (Node.js, Express, REST APIs)",
      "W6: Databases & Integration (MongoDB, PostgreSQL, Prisma)",
      "W7: AI-Powered Dev (OpenAI/Gemini APIs, Cursor AI, Copilot)",
      "W8: Production Ready (Auth, Docker, CI/CD, System Design)"
    ],
    application: "Full Stack CRM, API Development, AI Business Assistant"
  },
  {
    id: "phase-3",
    phase: "PHASE 3",
    duration: "WEEKS 9–12",
    title: "Industry Capstone Projects",
    focusLabel: "CURRICULUM",
    focus: [
      "W9: E-Commerce Platform (Auth, Cart, Payments, Admin DB)",
      "W10: AI SaaS Application (AI Chatbot, Generator, Subscriptions)",
      "W11: Enterprise Management System (CRM, Roles, Analytics)",
      "W12: Industry Capstone Project (End-to-End Build & Deploy)"
    ],
    application: "Deliver massive production-ready applications with full backend infrastructure."
  },
  {
    id: "phase-4",
    phase: "PHASE 4",
    duration: "WEEKS 13–16",
    title: "Placement Preparation",
    focusLabel: "CURRICULUM",
    focus: [
      "W13: Resume, GitHub Portfolio & LinkedIn Branding",
      "W14: Data Structures & Algorithms (100+ LeetCode Problems)",
      "W15: Technical Interview Prep (Frontend, Backend, System Design)",
      "W16: Placement Acceleration (Mock Interviews, Referrals, Outreach)"
    ],
    application: "Industry-Ready Resume, Technical Readiness, Job Offer Acceleration"
  }
];

const capstoneProjects = [
  { icon: Layout, title: "Responsive Business Website", desc: "Build a pixel-perfect, highly responsive marketing website using semantic HTML and CSS Grid.", tools: ["HTML5", "CSS3", "Flexbox"] },
  { icon: Smartphone, title: "React Task Management", desc: "A robust Kanban-style task management app utilizing React state management and hooks.", tools: ["React", "Hooks", "Vite"] },
  { icon: Database, title: "Full Stack CRM System", desc: "Develop a CRM connecting a Next.js frontend to a secure Node.js and PostgreSQL backend.", tools: ["Next.js", "Node", "PostgreSQL"] },
  { icon: Cloud, title: "E-Commerce Platform", desc: "End-to-end shopping platform with product management, cart logic, and secure payment flow.", tools: ["React", "Express", "MongoDB"] },
  { icon: TerminalSquare, title: "AI Business Assistant", desc: "Integrate OpenAI/Gemini APIs to build an intelligent assistant that automates user workflows.", tools: ["OpenAI", "Node", "APIs"] },
  { icon: BrainCircuit, title: "AI SaaS Product", desc: "Launch an AI-powered content generator with subscription models and a prompt library.", tools: ["Next.js", "Tailwind", "Stripe"] },
];

const faqData = [
  { q: "What is the duration of the program?", a: "The program runs for 16 weeks (4 months), 100% online with live interactive sessions." },
  { q: "Do I need prior coding experience?", a: "No, Phase 1 starts from absolute web foundations (HTML/CSS) before scaling up to React and AI APIs." },
  { q: "What stacks are covered?", a: "You will master the MERN stack (MongoDB, Express, React, Node.js) along with Next.js, PostgreSQL, Tailwind, and AI APIs." },
  { q: "Do you provide placement support?", a: "Yes! Weeks 13-16 are completely dedicated to Resume building, DSA (100+ Leetcode), Mock Interviews, and direct Placement Outreach." },
  { q: "Will I learn how to build AI apps?", a: "Absolutely. You will build an AI Business Assistant and an AI SaaS product utilizing OpenAI/Gemini APIs and Prompt Engineering." },
];

const AIFullStack = () => {
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
    <div className="sd-bg">
      <FloatingNav />
      {/* ============================================================
          1. HERO
          ============================================================ */}
      <section id="overview" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-black">
        
        {/* 1. Full-Bleed Minimalist Dark Background */}
        <div className="absolute inset-0 z-0 bg-[#050505]">
          {/* High-tech Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

          {/* Vignette Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />
          
          {/* Bright Glowing Silver Orbs for Depth */}
          <div 
            className="absolute top-[5%] left-[20%] w-[500px] h-[500px] bg-slate-300/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen" 
          />
          <div 
            className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" 
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* 2. Floating God-Tier Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center mt-[-8vh]">
          {/* Premium Glass Badge */}
          <div
            className="mb-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase border border-slate-600/30 bg-slate-800/20 backdrop-blur-2xl text-slate-300 shadow-[0_10px_40px_rgba(255,255,255,0.05)]"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-slate-300 opacity-100" />
              <span className="absolute w-4 h-4 rounded-full bg-slate-100/40 animate-ping" />
            </div>
            16-Week Professional Program
          </div>

          {/* Epic Metallic Typography */}
          <h1
            className="font-black ag-font-outfit mb-8 leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontSize: "clamp(50px, 9vw, 110px)" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-500 pb-2">
              AI-Powered
            </span>
            <span className="relative inline-block mt-2">
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-400 drop-shadow-md">
                Full Stack Developer
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-[22px] text-slate-400 mb-16 max-w-3xl leading-relaxed font-medium px-4"
          >
            Master React, Node.js, Next.js, and integrate powerful AI APIs to build, deploy, and scale production-ready applications.
          </p>

          {/* Hyper-Premium Interactive Elements */}
          <div className="flex flex-col items-center gap-12 px-4">
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* Spinning Conic Gradient Button */}
              <div className="relative group rounded-full p-[2px] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-shadow duration-500">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(255,255,255,0.8)_360deg)] animate-[spin_3s_linear_infinite] opacity-100" />
                <div className="absolute inset-0 bg-slate-500/20 backdrop-blur-md" />
                <div className="relative">
                  <ApplyNowButton
                    courseValue="Software Development"
                    className="!px-12 !py-5 !text-[16px] !rounded-full !bg-black hover:!bg-[#0a0a0a] transition-colors backdrop-blur-2xl text-white font-black tracking-wide"
                    label="Apply Now"
                  />
                </div>
              </div>

              {/* Glass Outline Button */}
              <button
                onClick={() => setShowPopup(true)}
                className="px-12 py-5 text-[16px] font-black tracking-wide rounded-full border border-slate-600 bg-white/5 backdrop-blur-2xl text-slate-300 hover:bg-white/10 hover:border-slate-400 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                View Curriculum
              </button>
            </div>
            
            {/* Ice White Placement Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 mx-auto w-fit bg-[#111] rounded-[16px] py-3 px-8 md:px-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 shadow-2xl border border-slate-800"
            >
               {/* Placements */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shadow-inner shrink-0 border border-slate-700">
                     <Briefcase className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-slate-400 text-[10px] font-bold mb-0.5">Placements</p>
                     <p className="text-white text-[20px] font-bold leading-none">1100+</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-slate-800"></div>

               {/* Salary Hike */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shadow-inner shrink-0 border border-slate-700">
                     <TrendingUp className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-slate-400 text-[10px] font-bold mb-0.5">Salary Hike</p>
                     <p className="text-white text-[18px] font-bold leading-[1.1]">Upto <br/> 350%</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-slate-800"></div>

               {/* ROI */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shadow-inner shrink-0 border border-slate-700">
                     <Landmark className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-slate-400 text-[10px] font-bold mb-0.5">ROI on Course</p>
                     <p className="text-white text-[20px] font-bold leading-none">10x to 20X</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <ProgramStatsBar stats={trustStats} labelColor="text-white" />
      
      {/* COLLABORATION COMPANY MARQUEE */}
      <AuthorityMarquee theme="dark" />

      {/* TOP ONE PERCENT (PROGRAM HIGHLIGHTS) */}
      <TopOnePercent
        badge="Program Highlights"
        title="Engineered for"
        titleHighlight="Full Stack Leaders"
        subtitle="Gain the technical depth required to build complex scalable architectures, SaaS applications, and integrate cutting edge AI models."
      />

      {/* CAREER TRACKS */}
      <section id="paths" className="py-12 md:py-24 px-6 bg-[#0a0a0a] border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="inline-block bg-slate-800 text-white border border-slate-700 font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Career Tracks
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight leading-tight">
                Find the right track for your role
              </h2>
              <p className="text-slate-400 text-lg mt-3">
                A dedicated software engineering track for every stage of your career.
              </p>
            </div>
            <ApplyNowButton
              courseValue="Software Development"
              className="!px-6 !py-3 !text-sm !rounded-xl whitespace-nowrap !bg-white hover:!bg-slate-200 !text-black"
              label="Start Engineering →"
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
                      isActive ? "border-slate-600 bg-slate-900/50" : "border-slate-800 bg-[#111] hover:border-slate-700"
                    }`}
                    onClick={() => setActiveCareerPath(idx)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-slate-800 text-white border border-slate-700 text-[11px] font-bold px-3 py-1 rounded">
                          {path.exp}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-slate-500 transition-transform duration-300 ${isActive ? "rotate-180 text-white" : ""}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white">{path.title}</h3>

                      <div 
                        className={`transition-all duration-500 ease-in-out overflow-hidden`}
                        style={{ maxHeight: isActive ? '500px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="text-slate-400 text-sm leading-relaxed mt-3 mb-5">{path.desc}</p>
                        <div className="pt-5 border-t border-slate-800">
                          <h4 className="text-white font-bold text-sm mb-3">What you'll gain</h4>
                          <ul className="flex flex-col gap-2.5">
                            {path.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
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
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto border border-slate-800 grayscale">
              {careerPaths.map((path, idx) => (
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
                    <p className="text-white text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-white pl-5 drop-shadow-lg">
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
        phases={sdPhases} 
        title="16-Week Engineering Roadmap" 
        accentColor="text-white" 
        bgColor="bg-black"
        cardBgColor="bg-[#0f0f0f]"
      />

      {/* PROJECTS */}
      <section id="projects" className="py-12 md:py-24 px-6 bg-[#0a0a0a] border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="inline-block bg-slate-800 text-white border border-slate-700 font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Projects
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight">
                Flagship Engineering Portfolios
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capstoneProjects.map((project, i) => (
              <div
                key={i}
                className="glass-panel rounded-[28px] p-8 relative overflow-hidden group cursor-pointer border border-slate-800 hover:border-slate-500 transition-all duration-500 min-h-[380px] flex flex-col bg-[#111]"
                onClick={() => setShowPopup(true)}
              >
                 {/* Gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0 pointer-events-none"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black border border-slate-700 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                          {React.createElement(project.icon, {
                            size: 24,
                            className: "text-slate-400 group-hover:text-white transition-colors duration-500",
                            strokeWidth: 1.5,
                          })}
                       </div>
                       <span className="text-[11px] font-bold text-white bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 backdrop-blur-md">Software Project</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-slate-300 transition-colors">
                       {project.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                       {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                       {project.tools.slice(0,3).map(t => (
                          <span key={t} className="text-[10px] font-semibold bg-black border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg">
                             {t}
                          </span>
                       ))}
                       {project.tools.length > 3 && (
                          <span className="text-[10px] font-semibold bg-black border border-slate-700 text-slate-400 px-3 py-1.5 rounded-lg">
                             +{project.tools.length - 3}
                          </span>
                       )}
                    </div>

                    <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 pt-4 border-t border-slate-800">
                       View Project Details <ArrowRight size={16} className="ml-2 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                 </div>
              </div>
            ))}

            {/* 7th card: Clean CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-slate-500">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700">
                <Layers size={28} className="text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 leading-tight ag-font-outfit">
                Enterprise<br/>Architecture
              </h3>
              <p className="text-slate-400 text-[15px] mb-8 max-w-[240px] leading-relaxed">
                Build 8 comprehensive portfolios incorporating Next.js, Node, and AI capabilities.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-white hover:bg-slate-200 text-black font-bold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_4px_14px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
              >
                Start Engineering <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="py-12 md:py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <Certification />
        </div>
      </section>

      
      {/* TOOLS & TECHNOLOGIES */}
      <section id="tools" className="py-12 md:py-24 px-6 bg-[#0a0a0a] border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#10b981]/15 text-[#10b981] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black ag-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-slate-400 text-lg">Master the modern AI &amp; Web development stack</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#000000] rounded-2xl flex items-center justify-center overflow-hidden border border-slate-900 transition-all duration-300 group-hover:scale-110 group-hover:border-[#10b981]/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={`w-9 h-9 object-contain ${tool.invert ? "invert opacity-80" : ""}`} />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest text-center leading-tight uppercase group-hover:text-[#10b981] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY GROWTH */}
      <SalaryGrowth domain="AIFullStack" />

      {/* CAREER OUTCOMES */}
      <CareerOutcomes domain="AIFullStack" />

      {/* MARKET LEADERS */}
      <MarketLeaders />

      {/* MEET YOUR MENTORS */}
      <MeetYourMentors />

      {/* PRICING */}
      <section className="py-12 md:py-24 px-6 bg-[#0a0a0a] border-t border-white/5" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#10b981]/15 text-[#10b981] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Pricing & Financing
            </span>
            <h2 className="text-3xl md:text-[44px] font-black text-white tracking-tight mb-3">
              Invest in your future
            </h2>
            <p className="text-gray-400 text-lg">Transparent pricing. Flexible payment options.</p>
          </div>
          <PaymentPlanWidget basePrice={51999} durationMonths={6} courseName="AI Full Stack" themeColor="#10b981" />
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
                  <ChevronDown size={18} style={{ color: "#a1a1aa", transform: openFaqIdx === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                </div>
                {openFaqIdx === i && (
                  <div style={{ padding: "0 24px 20px", color: "#a1a1aa", fontSize: "14px", lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showPopup && <AdvancedApplyPopup onClose={() => setShowPopup(false)} initialDomain="Software Development" />}
    </div>
  );
};

export default AIFullStack;