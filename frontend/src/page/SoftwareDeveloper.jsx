import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown, CheckCircle2, TerminalSquare, BrainCircuit,
  ArrowRight, MonitorPlay, CalendarDays, BarChart3, FileSearch,
  Building2, BadgeCheck, UserCheck, TrendingUp, HeartPulse, Users,
  DollarSign, GraduationCap, Code, Layers, Briefcase, Landmark
} from "lucide-react";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
import PremiumCurriculum from "../Components/PremiumCurriculum";
import ProgramStatsBar from "../Components/ProgramStatsBar";
import AuthorityMarquee from "../Components/AuthorityMarquee";
import NonTechReviewsMarquee from "../Components/NonTechReviewsMarquee";
import Certification from "./AdvanceCourse/Components/Certification";
import SalaryGrowth from "../Components/SalaryGrowth";
import CareerOutcomes from "../Components/CareerOutcomes";
import MarketLeaders from "../Components/MarketLeaders";
import MeetYourMentors from "../Components/MeetYourMentors";
import { courseMentors } from "../data/courseMentors";
import PaymentPlanWidget from "../Components/PaymentPlanWidget";
import FloatingNav from "../Components/FloatingNav";
import ApplyNowButton from "./AdvanceCourse/Components/ApplyNowButton";
import "./SoftwareDeveloper.css"; // Static CSS to prevent blinking

import cyberTechBg from "../assets/cyber_tech_bg.png";
import cyberTechBg2 from "../assets/cyber_tech_bg_2.png";
import cyberTechBg3 from "../assets/cyber_tech_bg_3.png";

const heroImages = [cyberTechBg, cyberTechBg2, cyberTechBg3];

import alumni1 from "../assets/alumni/alumni_1.png";
import alumni2 from "../assets/alumni/alumni_2.png";
import alumni3 from "../assets/alumni/alumni_3.png";

/* ─── Tools Data ─── */
const toolsList = [
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Spring Boot", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invert: true },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "OpenAI API", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", invert: true },
];

/* ─── Static Data ─── */
const trustStats = [
  { value: "24 Weeks", label: "Duration" },
  { value: "100% Online", label: "Format" },
  { value: "120+ Hours", label: "Hands-on Practice" },
  { value: "6 Capstones", label: "Real Projects" },
  { value: "15+", label: "Interview Opportunities" },
];

const careerPaths = [
  {
    exp: "0–1 Years",
    title: "Recent Graduates & Aspiring Developers",
    desc: "Build strong software engineering foundations in Java/Python, DSA, database engineering, and full-stack integration.",
    benefits: [
      "Master clean code principles, OOP, and data structures",
      "Build production-grade microservices and frontend applications",
      "Ready for high-paying Software Engineer & Developer roles",
    ],
    quote: "I want a program that bridges the gap between academic theories and industry-standard production development.",
    image: alumni1,
  },
  {
    exp: "1–3 Years",
    title: "Early Career Professionals & Backend/Frontend Developers",
    desc: "Scale up your engineering skills with Cloud-Native tools, distributed systems, and AI workflows.",
    benefits: [
      "Architect microservices with Spring Boot/FastAPI and integrate REST APIs",
      "Deploy apps with Docker, Kubernetes, and CI/CD pipelines on AWS",
      "Elevate your design patterns and database query optimization",
    ],
    quote: "I need to transition from basic scripting to building scalable, secure, and distributed enterprise applications.",
    image: alumni2,
  },
  {
    exp: "3–5 Years",
    title: "Experienced Engineers & Technical Leads",
    desc: "Transition to AI Engineering and System Design. Combine GenAI, LLMs, and System Design.",
    benefits: [
      "Master High-Level and Low-Level System Design (SOLID, design patterns)",
      "Build AI application architectures using RAG, Vector DBs, and LangChain",
      "Optimise distributed systems for high availability and low latency",
    ],
    quote: "I want to integrate AI engineering and advanced system design to step into Tech Lead and Architect roles.",
    image: alumni3,
  },
];

const softwarePhases = [
  {
    id: "sd-phase-1",
    phase: "PHASE 1",
    duration: "WEEKS 1–8",
    title: "Software Engineering Foundations",
    focusLabel: "CURRICULUM",
    focus: [
      "Advanced Java / Python, OOP, and Design Patterns",
      "Collections framework, Multithreading, Clean Code, Exception Handling",
      "Data Structures & Algorithms (Arrays, Linked Lists, Trees, Graphs, Recursion, DP)",
      "Database Engineering (SQL, NoSQL, MongoDB, Joins, Window Functions, Optimization)",
      "Backend Engineering (Spring Boot / FastAPI, REST APIs, Microservices, API Gateway)"
    ],
    application: "Enterprise Employee Management System, Inventory Management Database, E-Commerce Backend System"
  },
  {
    id: "sd-phase-2",
    phase: "PHASE 2",
    duration: "WEEKS 9–12",
    title: "Modern Full Stack Development",
    focusLabel: "CURRICULUM",
    focus: [
      "Frontend Engineering (React.js & Next.js, Modern JS, TypeScript)",
      "State Management (React Hooks, Redux Toolkit)",
      "Full Stack Product Integration, Authentication, RBAC",
      "Payment Gateway Integration and Application Deployment"
    ],
    application: "Netflix Clone, Learning Management System (LMS)"
  },
  {
    id: "sd-phase-3",
    phase: "PHASE 3",
    duration: "WEEKS 13–14",
    title: "Cloud-Native Engineering & DevOps",
    focusLabel: "CURRICULUM",
    focus: [
      "Cloud Engineering (AWS, EC2, S3, RDS, IAM, CloudWatch)",
      "DevOps Foundations (Git, GitHub, Docker, Kubernetes Basics)",
      "CI/CD Pipelines and GitHub Actions"
    ],
    application: "Cloud-Native Application Deployment"
  },
  {
    id: "sd-phase-4",
    phase: "PHASE 4",
    duration: "WEEKS 15–16",
    title: "AI Engineering & Modern Development",
    focusLabel: "CURRICULUM",
    focus: [
      "AI Development Tools (GitHub Copilot, Cursor AI, Claude, AI Code Review)",
      "Generative AI Engineering (Prompt Engineering, OpenAI APIs)",
      "LLM Integration, Vector Databases, Embeddings, RAG",
      "AI Agents and LangChain Fundamentals"
    ],
    application: "AI Resume Analyzer, AI Interview Coach, AI Customer Support Agent, AI Knowledge Assistant"
  },
  {
    id: "sd-phase-5",
    phase: "PHASE 5",
    duration: "WEEKS 17–20",
    title: "Industry Implementation",
    focusLabel: "CURRICULUM",
    focus: [
      "Enterprise Capstone Project: Agile Teams & real software development practices",
      "Sprint cycles: Sprint 1 (Requirements) & Sprint 2 (Architecture)",
      "Sprint cycles: Sprint 3 (Development & Testing) & Sprint 4 (Deployment)"
    ],
    application: "Capstone Project Options: AI Recruitment, CRM, FinTech, EdTech, Healthcare, AI Document Search"
  },
  {
    id: "sd-phase-6",
    phase: "PHASE 6",
    duration: "WEEKS 21–24",
    title: "System Design & Career Acceleration",
    focusLabel: "CURRICULUM",
    focus: [
      "Advanced DSA (Top 150 Coding Problems, Mock Coding Interviews)",
      "System Design (HLD/LLD: Scalability, SOLID, Case Studies: Netflix, Uber)",
      "Product Engineering, Resume & LinkedIn Optimization",
      "Placement Readiness (Mock Technical & HR Interviews, Networking, Salary Negotiation)"
    ],
    application: "Interview readiness and positioning for top-tier SDE/AI engineering roles"
  }
];

const capstoneProjects = [
  { icon: TerminalSquare, title: "AI-Powered Recruitment Platform", desc: "Autonomous screening, resume ranking, and placement coordination with real-time feedback loops.", tools: ["React", "FastAPI", "OpenAI APIs", "PostgreSQL"] },
  { icon: HeartPulse, title: "Healthcare Management System", desc: "Multi-tenant medical records, appointment scheduling, role-based access, and patient health charts.", tools: ["Next.js", "Spring Boot", "MongoDB", "Docker"] },
  { icon: Users, title: "Enterprise CRM Platform", desc: "Highly scalable sales CRM with dashboard reporting, pipeline tracking, and customer contact management.", tools: ["React", "Python", "PostgreSQL", "AWS S3"] },
  { icon: DollarSign, title: "FinTech Loan Management System", desc: "Distributed payment flows, loan application processing, KYC document verification, and ledger storage.", tools: ["Java", "Spring Boot", "PostgreSQL", "AWS EC2"] },
  { icon: GraduationCap, title: "EdTech Learning Platform (LMS)", desc: "Interactive course modules, video streaming, student enrollment trackers, and payment integration.", tools: ["Next.js", "FastAPI", "MongoDB", "Docker"] },
  { icon: BrainCircuit, title: "AI Document Search & Knowledge Platform", desc: "RAG system indexing corporate documents using embeddings and vector search for QA automation.", tools: ["LangChain", "Vector DB", "OpenAI", "Python"] },
];

const faqData = [
  { q: "What is the duration of the program?", a: "The program runs for 24 weeks (6 months) consisting of 16 weeks of core technical training, 4 weeks of enterprise capstone projects, and 4 weeks of career branding & interview prep." },
  { q: "Who is this program designed for?", a: "Recent engineering or computer science graduates and working professionals (0–5 years of experience) looking to fast-track their development skills and break into elite SDE or AI roles." },
  { q: "What is the format of the classes?", a: "The program is 100% online with live mentor-led weekend masterclasses, weekly progress tracking, asynchronous lab assignments, and active Discord community support." },
  { q: "Will I get certified upon completion?", a: "Yes, you earn a professional-grade verifiable Software Engineering and AI Application Developer certification recognized by 500+ corporate hiring partners." },
  { q: "What projects will I build?", a: "You will build over 6 real-world enterprise projects including a Netflix clone, an LMS platform, and a comprehensive AI-powered capstone project such as a recruitment CRM or FinTech solution." },
  { q: "Does the program include placement support?", a: "Yes, the last 4 weeks are entirely dedicated to advanced DSA prep, SOLID system design, resume review, LinkedIn profiling, and mock technical & HR interviews, backed by direct placement support." },
];

const Tag = ({ children }) => (
  <span style={{ display: "inline-block", background: "rgba(99,102,241,0.15)", color: "#6366f1", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", padding: "6px 16px", borderRadius: "999px", marginBottom: "20px" }}>{children}</span>
);

const SoftwareDeveloper = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeCareerPath, setActiveCareerPath] = useState(0);
  const [isCareerPathHovered, setIsCareerPathHovered] = useState(false);
  const [heroImageIdx, setHeroImageIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-rotate Hero Images
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
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

      {/* ============================================================
          1. HERO
          ============================================================ */}
      <section id="overview" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-[#020408]">
        
        {/* 1. Full-Bleed Immersive Background */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Software Engineering ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover mix-blend-screen transition-opacity duration-[2000ms] ease-in-out ${heroImageIdx === idx ? "opacity-50" : "opacity-0"}`}
            />
          ))}
          
          {/* Deep Vignette Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,4,8,0.3)_0%,rgba(2,4,8,0.95)_100%)] pointer-events-none" />
          
          {/* Intense Floating Orbs for 3D Depth */}
          <div 
            className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#6366f1]/20 blur-[130px] rounded-full pointer-events-none mix-blend-screen animate-pulse" 
          />
          <div 
            className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen animate-pulse" 
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
              <span className="absolute w-2 h-2 rounded-full bg-[#818cf8] opacity-100" />
              <span className="absolute w-4 h-4 rounded-full bg-[#818cf8]/40 animate-ping" />
            </div>
            24-WEEK COMPREHENSIVE SDE PROGRAM
          </div>

          {/* Epic Metallic Typography */}
          <h1
            className="font-black sd-font-outfit mb-8 leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontSize: "clamp(50px, 9vw, 110px)" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] pb-2">
              Become the Developer Who Builds
            </span>
            <span className="relative inline-block mt-2">
              <span className="absolute inset-0 bg-[#6366f1]/30 blur-[80px] animate-pulse"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#a5b4fc] via-[#6366f1] to-[#3730a3] drop-shadow-[0_0_60px_rgba(99,102,241,0.8)]">
                The Future
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-[22px] text-gray-400 mb-16 max-w-3xl leading-relaxed font-medium px-4 drop-shadow-lg"
          >
            Master full-stack development, cloud-native architecture, and system design in this intensive 24-week software engineering program.
          </p>

          {/* Hyper-Premium Interactive Elements */}
          <div className="flex flex-col items-center gap-12 px-4">
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* Spinning Conic Gradient Button */}
              <div className="relative group rounded-full p-[2px] overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.7)] transition-shadow duration-500">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(99,102,241,1)_360deg)] animate-[spin_3s_linear_infinite] opacity-100" />
                <div className="absolute inset-0 bg-[#6366f1]/20 backdrop-blur-md" />
                <div className="relative">
                  <ApplyNowButton
                    courseValue="Software Developer"
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
            
            {/* Ultra-Compact Green Placement Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 mx-auto w-fit bg-[#091C11] rounded-[16px] py-3 px-8 md:px-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 shadow-2xl border border-[#144A2D]"
            >
               {/* Placements */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#12764F] flex items-center justify-center shadow-inner shrink-0">
                     <Briefcase className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-emerald-50/70 text-[10px] font-bold mb-0.5">Placements</p>
                     <p className="text-white text-[20px] font-bold leading-none">1100+</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-white/10"></div>

               {/* Salary Hike */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#12764F] flex items-center justify-center shadow-inner shrink-0">
                     <TrendingUp className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-emerald-50/70 text-[10px] font-bold mb-0.5">Salary Hike</p>
                     <p className="text-white text-[18px] font-bold leading-[1.1]">Upto <br/> 350%</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-white/10"></div>

               {/* ROI */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#12764F] flex items-center justify-center shadow-inner shrink-0">
                     <Landmark className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-emerald-50/70 text-[10px] font-bold mb-0.5">ROI on Course</p>
                     <p className="text-white text-[20px] font-bold leading-none">10x to 20X</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <ProgramStatsBar stats={trustStats} labelColor="text-[#d4af37]" />
      
      {/* COLLABORATION COMPANY MARQUEE */}
      <AuthorityMarquee theme="dark" />

      {/* CAREER TRACKS */}
      <section id="paths" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="inline-block bg-[#6366f1]/15 text-[#818cf8] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Career Tracks
              </span>
              <h2 className="text-3xl md:text-[44px] font-black sd-font-outfit text-white tracking-tight leading-tight">
                Find the right path for your role
              </h2>
              <p className="text-gray-400 text-lg mt-3">
                A dedicated track for every stage of your career.
              </p>
            </div>
            <ApplyNowButton
              courseValue="Software Developer"
              className="!px-6 !py-3 !text-sm !rounded-xl whitespace-nowrap !bg-[#6366f1] hover:!bg-[#4f46e5] !text-white"
              label="Start Your SD Career →"
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
                      isActive ? "border-white/20 bg-white/[0.04]" : "border-white/5 bg-[#0A0A0A] hover:border-white/10"
                    }`}
                    onClick={() => setActiveCareerPath(idx)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-[#6366f1] text-white text-[11px] font-bold px-3 py-1 rounded">
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
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366f1] shrink-0" />
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
                    <p className="text-white text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-white/60 pl-5 drop-shadow-lg">
                      "{path.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-24 px-6 bg-[#020408] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#6366f1]/15 text-[#818cf8] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black sd-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-gray-400 text-lg">Master the modern software &amp; AI engineering stack</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#0A0A0A] rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-[#6366f1]/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={`w-9 h-9 object-contain ${tool.invert ? "invert opacity-80" : ""}`} />
                  ) : (
                    <span className="text-sm font-bold text-gray-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest text-center leading-tight uppercase group-hover:text-[#818cf8] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <PremiumCurriculum 
        phases={softwarePhases} 
        title="24-Week Engineering Roadmap" 
        accentColor="text-[#6366f1]" 
        bgColor="bg-[#0B0F13]"
        cardBgColor="bg-[#12161A]"
      />

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="inline-block bg-[#6366f1]/15 text-[#818cf8] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Projects
              </span>
              <h2 className="text-3xl md:text-[44px] font-black sd-font-outfit text-white tracking-tight">
                Production Capstones
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capstoneProjects.map((project, i) => (
              <div
                key={i}
                className="glass-panel rounded-[28px] p-8 relative overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500 min-h-[380px] flex flex-col bg-[#0a0a0a]"
                onClick={() => setShowPopup(true)}
              >
                 {/* Faded Background Image */}
                 <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10 group-hover:opacity-30 mix-blend-luminosity transition-all duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${heroImages[i % heroImages.length]})` }}
                 ></div>
                 {/* Gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent z-0 pointer-events-none"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                          {React.createElement(project.icon, {
                            size: 24,
                            className: "text-gray-400 group-hover:text-[#818cf8] transition-colors duration-500",
                            strokeWidth: 1.5,
                          })}
                       </div>
                       <span className="text-[11px] font-bold text-zinc-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">Enterprise Project</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#818cf8] transition-colors">
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
            <div className="bg-gradient-to-br from-[#6366f1]/5 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-[#6366f1]/10">
              <div className="w-16 h-16 bg-[#6366f1]/10 rounded-full flex items-center justify-center mb-6 border border-[#6366f1]/30">
                <Layers size={28} className="text-[#818cf8]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 leading-tight sd-font-outfit">
                More projects<br/>waiting for you
              </h3>
              <p className="text-gray-400 text-[15px] mb-8 max-w-[240px] leading-relaxed">
                Build a portfolio that proves your expertise and gets you hired.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.6)] hover:-translate-y-0.5"
              >
                Start Learning <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      

      {/* SALARY GROWTH */}
      <SalaryGrowth domain="SoftwareDeveloper" />

      {/* CAREER OUTCOMES */}
      <CareerOutcomes domain="SoftwareDeveloper" />

      {/* MARKET LEADERS */}
      <MarketLeaders />

      {/* MEET YOUR MENTORS */}
      <MeetYourMentors mentorsData={courseMentors.SoftwareDeveloper} />

      {/* PRICING */}
      <section className="py-24 px-6 bg-[#0B0F13] border-t border-white/5" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#6366f1]/15 text-[#818cf8] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Pricing & Financing
            </span>
            <h2 className="text-3xl md:text-[44px] font-black text-white tracking-tight mb-3">
              Invest in your future
            </h2>
            <p className="text-gray-400 text-lg">Transparent pricing. Flexible payment options.</p>
          </div>
          <PaymentPlanWidget basePrice={91000} durationMonths={6} courseName="Software Engineering" themeColor="#6366f1" />
        </div>
      </section>

      {/* NON TECH REVIEWS */}
      <NonTechReviewsMarquee />

      {/* FAQ */}
      <section style={{ padding: "96px 24px", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 className="sd-font-outfit" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.02em", textAlign: "center", marginBottom: "48px" }}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqData.map((faq, i) => (
              <div key={i} className="sd-card" style={{ cursor: "pointer", padding: "0" }} onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}>
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

      {/* Apply Popup */}
      {showPopup && (
        <AdvancedApplyPopup
          onClose={() => setShowPopup(false)}
          initialDomain="Software Developer"
        />
      )}

      {/* Floating Sticky Navigation Bar */}
      <FloatingNav onApplyClick={() => setShowPopup(true)} />
    </div>
  );
};

export default SoftwareDeveloper;