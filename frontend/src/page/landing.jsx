import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  ArrowRight, Users, Target, CheckCircle2, Clock, Code2, LineChart,
  Megaphone, BrainCircuit, ShieldCheck, Workflow, Server, Cpu, Database,
  Briefcase, TrendingUp, Landmark, Star, Sparkles, Quote, TerminalSquare,
  ChevronLeft, ChevronRight, Laptop, Award, ShieldAlert, BookOpen, Settings2
} from "lucide-react";
import "./landing.css"; // Static CSS
import "./landing.css"; // Static CSS

// Premium 3D Hook
const use3DTilt = (config = {}) => {
  const { maxTilt = 15, scale = 1.02 } = config;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, scale, handleMouseMove, handleMouseLeave };
};

// Premium Assets
import techHeroBg from "../assets/tech_hero_bg.png";
import advanceHeroNew from "../assets/advance_hero_new.png";
import agentAiHero from "../assets/agent_ai_hero.png";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";

// New Landing Page Components
import LandingWhyAccenlearn from "../Components/LandingWhyAccenlearn";
import LandingWhoIsThisFor from "../Components/LandingWhoIsThisFor";
import LandingCurriculum from "../Components/LandingCurriculum";
import LandingMentors from "../Components/LandingMentors";
import LandingPlacementProcess from "../Components/LandingPlacementProcess";

import LandingPricing from "../Components/LandingPricing";
import LandingAdmissionsFlow from "../Components/LandingAdmissionsFlow";
import LandingFAQ from "../Components/LandingFAQ";
import LandingCTA from "../Components/LandingCTA";

// Local Company Logos
import amazonLogo from "../assets/company logo/amazon.png.png";
import accentureLogo from "../assets/company logo/Accenture-logo.png";
import deloitteLogo from "../assets/company logo/Deloitte_Logo.png";
import eyLogo from "../assets/company logo/Ey buildings.svg";
import hsbcLogo from "../assets/company logo/HSBC_Logo_2018.png";
import sonyLogo from "../assets/company logo/Sony_logo.svg.png";
import wiproLogo from "../assets/company logo/Wipro_Primary_Logo_Color_RGB.svg";
import tcsLogo from "../assets/company logo/tcs.png";
import pwcLogo from "../assets/company logo/pwc.png";
import musigmaLogo from "../assets/company logo/mu sigma.png";
import professionalBoyBoard from "../assets/professional_boy_board_nobg.png";

const heroImages = [techHeroBg, advanceHeroNew, agentAiHero];

const companies = [
  { name: "Amazon", logo: amazonLogo },
  { name: "Accenture", logo: accentureLogo },
  { name: "Deloitte", logo: deloitteLogo },
  { name: "EY", logo: eyLogo },
  { name: "HSBC", logo: hsbcLogo },
  { name: "Sony", logo: sonyLogo },
  { name: "Wipro", logo: wiproLogo },
  { name: "TCS", logo: tcsLogo },
  { name: "PwC", logo: pwcLogo },
  { name: "Mu Sigma", logo: musigmaLogo }
];

const tracks = [
  {
    id: "ds-genai",
    title: "Data Science & Generative AI",
    icon: <BrainCircuit size={22} />,
    desc: "Master predictive modeling, deep learning, and architect LLM-powered applications. Become a dual-threat in traditional data science and modern GenAI.",
    duration: "6 Months",
    role: "AI / Data Scientist",
    outcomes: ["Predictive modeling & machine learning", "Build custom GPTs & RAG pipelines", "Deploy AI models to production", "Advanced Python & PyTorch"],
    link: "/Advance",
    glow: "rgba(99, 102, 241, 0.08)"
  },
  {
    id: "da-ai",
    title: "Data Analytics & AI",
    icon: <Database size={22} />,
    desc: "Combine traditional business intelligence with AI-driven analytics. Extract actionable insights and automate reporting using modern data tools.",
    duration: "5 Months",
    role: "Data Analyst / BI Developer",
    outcomes: ["Advanced SQL & Python", "Tableau & PowerBI Dashboards", "AI-assisted data analysis", "Real-world business capstones"],
    link: "/Advance",
    glow: "rgba(6, 182, 212, 0.08)"
  },
  {
    id: "ai-fsd",
    title: "AI-Powered Full Stack Development",
    icon: <Code2 size={22} />,
    desc: "Build secure, scalable MERN stack applications augmented with AI integrations. Learn to code faster with AI assistants and build intelligent features.",
    duration: "6 Months",
    role: "Full Stack Engineer",
    outcomes: ["React, Node.js, MongoDB", "Integrate OpenAI & LLM APIs", "System Design & Cloud Deployment", "Production-grade web apps"],
    link: "/SoftwareDeveloper",
    glow: "rgba(16, 185, 129, 0.08)"
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: <ShieldCheck size={22} />,
    desc: "Defend against modern digital threats. Learn ethical hacking, network security, and secure architecture for enterprise systems.",
    duration: "5 Months",
    role: "Security Analyst",
    outcomes: ["Vulnerability assessment & Pen-testing", "Network & Cloud Security", "Incident response protocols", "Security compliance & frameworks"],
    link: "/Advance",
    glow: "rgba(244, 63, 94, 0.08)"
  },
  {
    id: "dm-ai",
    title: "Digital Marketing & AI",
    icon: <Megaphone size={22} />,
    desc: "Execute high-ROI campaigns using AI-generated content and predictive analytics. Master SEO, performance marketing, and conversion optimization.",
    duration: "4 Months",
    role: "Growth Marketer",
    outcomes: ["Meta Ads & Google Ads mastery", "AI-driven content generation", "Advanced SEO & Analytics", "Conversion Rate Optimization"],
    link: "/Advance",
    glow: "rgba(245, 158, 11, 0.08)"
  },
];

const programSlides = [
  {
    id: "ds-genai",
    title: "Master Generative AI & Deep Learning",
    eyebrow: "Flagship AI Track",
    desc: "Build custom RAG pipelines, fine-tune LLMs, and architect autonomous multi-agent swarms using PyTorch and LangChain.",
    link: "/Advance",
    gradient: "from-[#1c1445] via-[#2e0b57] to-[#0b031c]",
    buttonText: "Explore AI Syllabus ↗",
    visualCards: [
      { logo: "Google", role: "AI Research Scientist", detail: "30 mins", action: "Attempt Mock" },
      { logo: "Meta", role: "LLM Engineer - 2", detail: "30 mins" },
      { logo: "Microsoft", role: "GenAI Architect", detail: "45 mins" }
    ]
  },
  {
    id: "ai-fsd",
    title: "Build Enterprise MERN & Next.js Systems",
    eyebrow: "Engineering Fast-Track",
    desc: "Code 10x faster with AI copilots, deploy containerized cloud networks, and architect distributed backend architectures.",
    link: "/SoftwareDeveloper",
    gradient: "from-[#022c20] via-[#044030] to-[#01140e]",
    buttonText: "Explore SDE Syllabus ↗",
    visualCards: [
      { logo: "Microsoft", role: "Software Developer - 2", detail: "45 mins", action: "Attempt Mock" },
      { logo: "Uber", role: "Backend Architect", detail: "30 mins" },
      { logo: "Amazon", role: "SDE 1 (MERN Cluster)", detail: "45 mins" }
    ]
  },
  {
    id: "da-ai",
    title: "Extract Executive Intelligence with SQL & BI",
    eyebrow: "Advanced Analytics Track",
    desc: "Command large-scale datasets, automate reporting models, and design real-time high-performance business dashboards.",
    link: "/Advance",
    gradient: "from-[#052b38] via-[#0a3f52] to-[#021217]",
    buttonText: "Explore Analytics Syllabus ↗",
    visualCards: [
      { logo: "Meta", role: "Business Intelligence Analyst", detail: "30 mins", action: "Attempt Mock" },
      { logo: "Netflix", role: "Senior Data Analyst", detail: "45 mins" },
      { logo: "Google", role: "Data Scientist (BI Lead)", detail: "30 mins" }
    ]
  },
  {
    id: "cyber",
    title: "Ethical Hacking & Zero-Trust Cloud Defense",
    eyebrow: "SecOps Track",
    desc: "Defend against enterprise-grade digital threats, learn cloud penetration testing, and establish high-security compliance audits.",
    link: "/Advance",
    gradient: "from-[#420412] via-[#630920] to-[#1c0106]",
    buttonText: "Explore Cybersecurity Syllabus ↗",
    visualCards: [
      { logo: "CrowdStrike", role: "Ethical Pen-Tester", detail: "45 mins", action: "Attempt Mock" },
      { logo: "Palo Alto", role: "Cloud Security Specialist", detail: "30 mins" },
      { logo: "Cisco", role: "Network Security Auditor", detail: "45 mins" }
    ]
  },
  {
    id: "dm-ai",
    title: "High-ROI Performance Marketing & Copywriting",
    eyebrow: "Growth & Business Track",
    desc: "Deploy automated campaign routines, optimize high-conversion funnels, and write high-ranking copy with custom LLM fine-tunes.",
    link: "/Advance",
    gradient: "from-[#3b1502] via-[#5c2405] to-[#1a0800]",
    buttonText: "Explore Marketing Syllabus ↗",
    visualCards: [
      { logo: "Razorpay", role: "Growth Performance Lead", detail: "30 mins", action: "Attempt Mock" },
      { logo: "Flipkart", role: "SEO Automator Architect", detail: "45 mins" },
      { logo: "Swiggy", role: "Ad Campaign Specialist", detail: "30 mins" }
    ]
  }
];

const cohortSlides = [
  {
    step: "01",
    phase: "Systems & Backend Foundations",
    duration: "Weeks 1–4",
    detail: "Master core software engineering principles in Java or Python. Dive deep into clean OOP logic, algorithmic complexity, concurrency frameworks, and technical problem-solving patterns.",
    outcome: "Write highly optimized, readable, and benchmarked core code foundations.",
    icon: <Cpu size={24} className="text-[#2563EB]" />
  },
  {
    step: "02",
    phase: "Database Architecture & Optimization",
    duration: "Weeks 5–8",
    detail: "Learn data storage optimization. Design structured database schemas, write advanced optimized SQL queries, configure transaction isolation, and learn NoSQL databases like MongoDB.",
    outcome: "Architect low-latency, scalable database layers that handle complex relational models.",
    icon: <Database size={24} className="text-[#2563EB]" />
  },
  {
    step: "03",
    phase: "Modern Client-Side Applications",
    duration: "Weeks 9–12",
    detail: "Construct high-performance frontends. Work with React, Next.js, and TypeScript, implement state management using Redux Toolkit, and set up modern secure routing protocols.",
    outcome: "Create seamless client dashboards optimized for fast initial rendering.",
    icon: <Laptop size={24} className="text-teal-400" />
  },
  {
    step: "04",
    phase: "DevOps & Cloud Deployment Infrastructure",
    duration: "Weeks 13–14",
    detail: "Configure native operations. Containerize application builds with Docker, orchestrate scalable node clusters on Kubernetes, and deploy directly to AWS services using automated CI/CD triggers.",
    outcome: "Scale web systems globally with zero-downtime integration capabilities.",
    icon: <Server size={24} className="text-emerald-400" />
  },
  {
    step: "05",
    phase: "Applied Generative AI & Agents",
    duration: "Weeks 15–16",
    detail: "Embed native artificial intelligence features. Learn prompt pipelines, integrate OpenAI/Anthropic APIs, implement vector search models with custom RAG systems, and build multi-agent flows.",
    outcome: "Deploy intelligent automation modules executing active user tasks autonomously.",
    icon: <BrainCircuit size={24} className="text-amber-400" />
  },
  {
    step: "06",
    phase: "Corporate Sprints & Placements",
    duration: "Weeks 17–24",
    detail: "Execute end-to-end projects in agile, collaborative team structures. Refine personal developer portfolios, complete simulated SDE code boards, and gain direct referrals into corporate staffing tiers.",
    outcome: "Pass core tech evaluation boards and secure high-paying tech vacancies.",
    icon: <Award size={24} className="text-rose-400" />
  }
];

const testimonials = [
  { id: 1, quote: "Accenlearn didn't just teach me to code; they taught me how to be an engineer. The curriculum is exactly what hiring managers look for. I got multiple offers before the program even ended.", author: "Rohan S.", role: "SDE at TCS Digital", initial: "RS", color: "from-indigo-400 to-purple-400" },
  { id: 2, quote: "The mentorship is unmatched. My mentor was a Senior Engineer at Microsoft and he completely overhauled the way I approach System Design. Worth every penny.", author: "Priya M.", role: "Backend Developer at Razorpay", initial: "PM", color: "from-emerald-400 to-teal-400" },
  { id: 3, quote: "Transitioning from a non-CS background was terrifying, but the structured path and 1:1 support gave me confidence. Six months later, I'm working my dream job.", author: "Karan D.", role: "Data Analyst at Fractal", initial: "KD", color: "from-cyan-400 to-blue-400" },
];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#F8FAFC] overflow-hidden">
      {/* Deep space elegant mesh gradient */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#EFF6FF] blur-[120px] opacity-80" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#EFF6FF] blur-[120px] opacity-80" />
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] z-10"></div>
    </div>
  );
};

const renderCompanyLogo = (companyName) => {
  const name = companyName.toLowerCase();
  if (name.includes("google")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
        <span className="text-[11px] font-bold text-zinc-100">Google</span>
      </div>
    );
  }
  if (name.includes("meta")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <svg className="w-3.5 h-3.5 text-[#0064e0]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 0 0-6.36 15.36L8.46 15.5A5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 3.54 9l2.82 2.86A9 9 0 0 0 12 3zm0 18a9 9 0 0 0 6.36-15.36l-2.82 2.86a5.5 5.5 0 0 1-3.54 9 5.5 5.5 0 0 1-3.54-9l-2.82-2.86A9 9 0 0 0 12 21z" fill="currentColor"/>
        </svg>
        <span className="text-[11px] font-bold text-zinc-100">Meta</span>
      </div>
    );
  }
  if (name.includes("microsoft")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <div className="grid grid-cols-2 gap-0.5 shrink-0 select-none">
          <span className="w-1.5 h-1.5 bg-[#f25022]" /><span className="w-1.5 h-1.5 bg-[#7fba00]" />
          <span className="w-1.5 h-1.5 bg-[#00a4ef]" /><span className="w-1.5 h-1.5 bg-[#ffb900]" />
        </div>
        <span className="text-[11px] font-bold text-zinc-100">Microsoft</span>
      </div>
    );
  }
  if (name.includes("amazon")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <span className="text-[#ff9900] font-black text-xs">a</span>
        <span className="text-[11px] font-bold text-zinc-100">Amazon</span>
      </div>
    );
  }
  if (name.includes("netflix")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <span className="text-[#e50914] font-black text-xs">N</span>
        <span className="text-[11px] font-bold text-zinc-100">Netflix</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
      <span className="text-[11px] font-bold text-zinc-100 capitalize">{companyName}</span>
    </div>
  );
};
const bubbleTexts = [
  "To Build Your Dream Career",
  "Trusted by 7000+ students",
  "Average salary hike 350%"
];

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);

  // Premium Parallax & 3D Tilt Hooks
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 800], [0, -150]);
  const heroCardY = useTransform(scrollY, [0, 800], [0, -80]);
  
  const heroTilt = use3DTilt({ maxTilt: 15, scale: 1.04 });
  const bentoTilt1 = use3DTilt({ maxTilt: 10, scale: 1.02 });
  const bentoTilt2 = use3DTilt({ maxTilt: 12, scale: 1.03 });
  const bentoTilt3 = use3DTilt({ maxTilt: 12, scale: 1.03 });

  // Auto-advance program slides every 6 seconds
  useEffect(() => {
    const progInterval = setInterval(() => {
      setCurrentProgramIndex((prev) => (prev + 1) % programSlides.length);
    }, 6000);
    return () => clearInterval(progInterval);
  }, []);

  // Auto-advance bubble text every 2.5 seconds
  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      setBubbleIndex((prev) => (prev + 1) % bubbleTexts.length);
    }, 2500);
    return () => clearInterval(bubbleInterval);
  }, []);

  const handleNextProgram = () => {
    setCurrentProgramIndex((prev) => (prev + 1) % programSlides.length);
  };

  const handlePrevProgram = () => {
    setCurrentProgramIndex((prev) => (prev - 1 + programSlides.length) % programSlides.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-advance cohort progression slides every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % cohortSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % cohortSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + cohortSlides.length) % cohortSlides.length);
  };

  return (
    <div className="lp-bg min-h-screen selection:bg-[#2563EB]/20">
      <Helmet>
        <title>Accenlearn | Premium Advanced Tech Programs & Elite Placements</title>
        <meta name="description" content="Accelerate your technology career with industry-led advanced software engineering, AI, and data science programs backed by 1:1 expert mentorship." />
      </Helmet>

      {/* ─── Hero Section ─── */}
      <section className="scene-3d pt-[40px] md:pt-[110px] pb-[60px] md:pb-[80px]" style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <HeroBackground />

        {/* Ambient Volumetric Glow */}
        <div className="absolute top-[10%] left-[10%] w-[50vw] aspect-square rounded-full blur-[150px] volumetric-glow z-0" style={{ transform: "translateZ(-200px)" }}></div>

        <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 preserve-3d">
          <div className="lp-hero-grid preserve-3d">
            <motion.div
              style={{ y: heroTextY }}
              initial={{ opacity: 0, z: -50, y: 30 }}
              animate={{ opacity: 1, z: 0, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="preserve-3d"
            >

              {/* Epic Subtle Metallic Title */}
              <h1 className="lp-font-outfit text-[#0F172A] font-extrabold leading-[1.05] tracking-tight mb-8 text-glow" style={{ fontSize: "clamp(46px, 5.8vw, 80px)", transform: "translateZ(50px)" }}>
                Where ambitious <br className="hidden md:block"/>
                students become <br className="hidden md:block"/>
                <span className="subtle-gradient-text">
                  hireable tech leaders.
                </span>
              </h1>

              <p style={{ fontSize: "clamp(16px, 1.4vw, 19px)", color: "#475569", lineHeight: 1.6, maxWidth: "580px", marginBottom: "44px", transform: "translateZ(20px)" }} className="font-light">
                Accelerate your technical trajectory. We offer rigorous curriculums, 1:1 senior engineering mentorship, and pathways to 500+ top tech partners.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center mb-10" style={{ transform: "translateZ(40px)" }}>
                {/* Elevated Primary Button */}
                <div className="relative group rounded-full p-[1.5px] overflow-visible shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <button
                    onClick={() => navigate("/Advance")}
                    className="relative px-8 h-[50px] text-sm font-bold tracking-wide rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2.5 shadow-inner"
                  >
                    Explore Advanced Programs <ArrowRight size={15} />
                  </button>
                </div>

                {/* Frost Outline Button */}
                <button
                  onClick={() => setShowPopup(true)}
                  className="px-8 h-[50px] text-sm font-bold tracking-wide rounded-full border border-[#2563EB] bg-white text-[#2563EB] hover:bg-[#EFF6FF] hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                >
                  Schedule Consultation
                </button>
              </div>
            </motion.div>

            {/* Premium 3D Stat Card Block */}
            <motion.div
              style={{ y: heroCardY }}
              initial={{ opacity: 0, x: 50, z: -100 }}
              animate={{ opacity: 1, x: 0, z: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-end w-full preserve-3d"
            >
              <div className="relative w-full max-w-[410px] preserve-3d">


                <motion.div 
                  className="w-full glass-panel-3d rounded-[32px] p-8 relative group dashboard-card-3d bg-white"
                  onMouseMove={heroTilt.handleMouseMove}
                  onMouseLeave={heroTilt.handleMouseLeave}
                  style={{ 
                    rotateX: heroTilt.rotateX, 
                    rotateY: heroTilt.rotateY,
                    scale: heroTilt.scale,
                    transformPerspective: 1200
                  }}
                >
                <div className="absolute inset-0 bg-gradient-to-br from-[#DBEAFE]/30 to-transparent z-0 pointer-events-none rounded-[32px]" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#DBEAFE] rounded-full blur-2xl pointer-events-none" style={{ transform: "translateZ(-20px)" }} />

                <h3 className="text-[#0F172A] font-extrabold text-lg mb-6 flex items-center gap-2" style={{ transform: "translateZ(30px)" }}>
                  <Sparkles className="text-[#2563EB]" size={16} /> Engineering Excellence
                </h3>

                <div className="flex flex-col gap-4 preserve-3d" style={{ transform: "translateZ(40px)" }}>
                  {/* Hands-on Projects */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    whileHover={{ y: -4, scale: 1.01, z: 10 }}
                    className="premium-stat-card flex items-center gap-4 rounded-2xl p-4 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0F7B53]/10 to-[#0F7B53]/5 flex items-center justify-center border border-[#0F7B53]/20 text-[#2563EB] premium-stat-icon-box">
                      <Code2 size={18} />
                    </div>
                    <div>
                      <p className="text-[#64748B] text-[9px] font-bold uppercase tracking-[0.15em] mb-1">Hands-on Projects</p>
                      <p className="text-[#0F172A] text-xl font-black leading-none">50+ Built</p>
                    </div>
                  </motion.div>

                  {/* Mentorship */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    whileHover={{ y: -4, scale: 1.01, z: 10 }}
                    className="premium-stat-card flex items-center gap-4 rounded-2xl p-4 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A5A3D]/10 to-[#0A5A3D]/5 flex items-center justify-center border border-[#0A5A3D]/20 text-[#0A5A3D] premium-stat-icon-box">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="text-[#64748B] text-[9px] font-bold uppercase tracking-[0.15em] mb-1">Expert Mentors</p>
                      <p className="text-[#0F172A] text-xl font-black leading-none">1:1 Guidance</p>
                    </div>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ y: -4, scale: 1.01, z: 10 }}
                    className="premium-stat-card flex items-center gap-4 rounded-2xl p-4 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#209F70]/10 to-[#209F70]/5 flex items-center justify-center border border-[#209F70]/20 text-[#209F70] premium-stat-icon-box">
                      <BrainCircuit size={18} />
                    </div>
                    <div>
                      <p className="text-[#64748B] text-[9px] font-bold uppercase tracking-[0.15em] mb-1">Latest Tech Stack</p>
                      <p className="text-[#0F172A] text-xl font-black leading-none">GenAI & Cloud</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-5 pt-4.5 border-t border-gray-100 text-center text-[#64748B] text-xs flex justify-center items-center gap-1.5 relative z-10" style={{ transform: "translateZ(20px)" }}>
                  <Award size={13} className="text-[#2563EB]" /> Master the skills top tech giants demand
                </div>
              </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Premium Placement Partners Section ─── */}
      {/* ─── Premium Placement Partners Section ─── */}
      <section className="relative py-8 overflow-hidden bg-[#F8FAFC] border-y border-[#E2E8F0]">
        {/* Background Gradients & Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] bg-gradient-to-r from-[#00FFA3]/10 via-blue-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        {/* Marquee Container */}
        <div className="relative w-full max-w-[1500px] mx-auto z-10 flex flex-col gap-4">
            
          {/* Massive Fade edges for dark mode */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#020202] via-[#020202]/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#020202] via-[#020202]/90 to-transparent z-10 pointer-events-none" />
          
          {/* Reel 1 (Scrolls Left) */}
          <div className="flex overflow-hidden group">
            <div className="lp-marquee flex gap-4 md:gap-6 items-center w-max pr-4 md:pr-6">
              {[...companies, ...companies, ...companies].map((c, i) => (
                <div 
                  key={`reel1-${i}`} 
                  className="group/logo flex-shrink-0 flex items-center justify-center w-[140px] h-[55px] bg-white rounded-xl shadow-lg border border-[#E2E8F0] cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,163,0.3)] transition-all duration-300"
                >
                  <img 
                    src={c.logo} 
                    alt={c.name} 
                    className="max-w-[100px] max-h-[30px] object-contain drop-shadow-sm"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  />
                  <span className="hidden text-[12px] font-black text-[#111111] tracking-[0.05em] uppercase">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reel 2 (Scrolls Right) */}
          <div className="flex overflow-hidden group">
            <div className="lp-marquee flex gap-4 md:gap-6 items-center w-max pr-4 md:pr-6" style={{ animationDirection: 'reverse' }}>
              {[...companies, ...companies, ...companies].reverse().map((c, i) => (
                <div 
                  key={`reel2-${i}`} 
                  className="group/logo flex-shrink-0 flex items-center justify-center w-[140px] h-[55px] bg-white rounded-xl shadow-lg border border-[#E2E8F0] cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,163,0.3)] transition-all duration-300"
                >
                  <img 
                    src={c.logo} 
                    alt={c.name} 
                    className="max-w-[100px] max-h-[30px] object-contain drop-shadow-sm"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  />
                  <span className="hidden text-[12px] font-black text-[#111111] tracking-[0.05em] uppercase">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEW: Qualification Filter ─── */}
      <LandingWhoIsThisFor />

      {/* ─── Why Accenlearn (New Comparison Section) ─── */}
      <LandingWhyAccenlearn />

      {/* ─── Bento Edge Section ─── */}
      <section style={{ padding: "30px 0 110px", background: "transparent" }} id="edge">
        <div style={{ width: "min(92%, 1250px)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#22d3ee", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", padding: "6px 16px", borderRadius: "99px", marginBottom: "20px" }}>
              The Accenlearn Edge
            </span>
            <h2 className="lp-font-outfit text-[#0F172A] font-extrabold leading-tight" style={{ fontSize: "clamp(30px, 4.2vw, 50px)", maxWidth: "780px", margin: "0 auto 16px" }}>
              Elite mentorship, production depth,<br className="hidden md:block" /> and outcomes that actually matter.
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.3vw, 17px)", color: "#475569", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto", fontWeight: 400 }}>
              Built for ambitious engineers who want more than beginner tutorials — Accenlearn delivers real production depth, senior-level mentorship, and a hiring-focused system designed for high-growth tech careers.
            </p>
          </div>

          <div className="bento-grid preserve-3d scene-3d">
            {/* Large Bento Card */}
            <motion.div 
              className="bento-large glass-panel-3d rounded-[32px] p-10 flex flex-col justify-end relative group dashboard-card-3d bento-card-gradient bento-dark-gradient"
              onMouseMove={bentoTilt1.handleMouseMove}
              onMouseLeave={bentoTilt1.handleMouseLeave}
              style={{ 
                rotateX: bentoTilt1.rotateX, 
                rotateY: bentoTilt1.rotateY,
                scale: bentoTilt1.scale,
                transformPerspective: 1200
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F7B53]/[0.15] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]" />
              
              {/* Architecture Diagram Graphic */}
              <div className="absolute top-12 left-0 right-0 pointer-events-none hidden md:flex items-start justify-center opacity-90 z-0">
                 <div className="flex flex-col items-center gap-4 w-full transform scale-[0.85] origin-top">
                    {/* API Gateway */}
                    <div className="flex justify-center relative">
                       <div className="flex flex-col items-center gap-2">
                          <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                             <Server size={22} className="text-[#0F172A]/60" />
                          </div>
                          <span className="text-[8px] text-[#0F172A]/40 font-mono tracking-widest uppercase">Load Balancer</span>
                       </div>
                    </div>
                    
                    {/* Connecting lines */}
                    <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent relative">
                       <div className="absolute top-full left-1/2 -translate-x-1/2 w-[220px] h-px bg-[#F8FAFC]" />
                    </div>

                    <div className="flex gap-[70px] w-full justify-center">
                       {/* Microservices */}
                       {[1, 2, 3].map((i) => (
                         <div key={i} className="flex flex-col items-center gap-2 relative">
                            <div className="absolute -top-6 left-1/2 w-px h-6 bg-gradient-to-t from-white/10 to-transparent" />
                            <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] border border-indigo-500/20 flex items-center justify-center backdrop-blur-md shadow-sm">
                               <Cpu size={18} className="text-[#2563EB]" />
                            </div>
                            <span className="text-[7px] text-indigo-300/60 font-mono tracking-wider uppercase">Worker {i}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="absolute top-10 right-10 p-4.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm text-[#0F172A] transform transition-transform duration-700 group-hover:translate-z-20 group-hover:-translate-y-2">
                <Server size={34} strokeWidth={1.5} />
              </div>

              <div className="relative z-10 max-w-xl preserve-3d" style={{ transform: "translateZ(30px)" }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] rounded-full border border-[#E2E8F0] text-[9px] font-bold uppercase tracking-widest text-[#0F172A] mb-6 shadow-sm">
                  <Cpu size={11} /> Infrastructure
                </div>
                <h3 className="lp-font-outfit text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-4">Master Complex Enterprise Architectures.</h3>
                <p className="text-[#475569] text-[15px] leading-relaxed mb-6 font-light">
                  No toy databases. Learn to configure clean distributed backend endpoints, optimize SQL indexing, implement container clusters, and manage scalable cloud server workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["System Design", "Cloud Native", "Kubernetes", "Generative AI"].map((tag, i) => (
                    <span key={i} className="px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm text-xs font-semibold text-[#0F172A]">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Side Bento Card 1 */}
            <motion.div 
              className="glass-panel-3d rounded-[32px] p-8 flex flex-col justify-between relative group dashboard-card-3d bento-card-gradient bento-dark-gradient"
              onMouseMove={bentoTilt2.handleMouseMove}
              onMouseLeave={bentoTilt2.handleMouseLeave}
              style={{ 
                rotateX: bentoTilt2.rotateX, 
                rotateY: bentoTilt2.rotateY,
                scale: bentoTilt2.scale,
                transformPerspective: 1200
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A5A3D]/[0.15] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]" />
              <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] text-[#0F172A] flex items-center justify-center border border-[#E2E8F0] mb-8 transform transition-transform group-hover:translate-z-20 group-hover:scale-110 shadow-inner">
                <Laptop size={22} strokeWidth={1.5} />
              </div>
              <div className="preserve-3d" style={{ transform: "translateZ(20px)" }}>
                <h4 className="text-lg font-bold text-[#0F172A] mb-2.5">Live Mentorship</h4>
                <p className="text-[#475569] text-sm leading-relaxed font-light">
                  Architectural progress audits and weekly casework feedback loops led by active industry practitioners.
                </p>
              </div>
            </motion.div>

            {/* Side Bento Card 2 */}
            <motion.div 
              className="glass-panel-3d rounded-[32px] p-8 flex flex-col justify-between relative group dashboard-card-3d bento-card-gradient bento-dark-gradient"
              onMouseMove={bentoTilt3.handleMouseMove}
              onMouseLeave={bentoTilt3.handleMouseLeave}
              style={{ 
                rotateX: bentoTilt3.rotateX, 
                rotateY: bentoTilt3.rotateY,
                scale: bentoTilt3.scale,
                transformPerspective: 1200
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#209F70]/[0.15] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]" />
              <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] text-[#0F172A] flex items-center justify-center border border-[#E2E8F0] mb-8 transform transition-transform group-hover:translate-z-20 group-hover:scale-110 shadow-inner">
                <Users size={22} strokeWidth={1.5} />
              </div>
              <div className="preserve-3d" style={{ transform: "translateZ(20px)" }}>
                <h4 className="text-lg font-bold text-[#0F172A] mb-2.5">Platform Placements</h4>
                <p className="text-[#475569] text-sm leading-relaxed font-light">
                  Unlock priority referral pipelines to corporate staffing networks across our verified corporate network.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ─── Flagship Programs Slider (New Slide Visual Carousel) ─── */}
      <section className="py-24 lg:py-32 bg-transparent relative overflow-hidden" id="flagship-programs">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#DBEAFE] blur-[150px] rounded-[100%] pointer-events-none opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-[1250px] mx-auto px-6 text-center mb-16 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] shadow-[0_0_15px_rgba(16,185,129,0.15)] text-[#2563EB] font-black text-[11px] uppercase tracking-[3px] px-5 py-2 rounded-full mb-6 backdrop-blur-md"
          >
            Flagship Specializations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lp-font-outfit text-[#0F172A] font-black tracking-tight leading-tight text-glow mb-6" style={{ fontSize: "clamp(36px, 4.5vw, 52px)" }}
          >
            Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#3b82f6]">Career Paths</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#64748B] text-lg font-light max-w-2xl mx-auto"
          >
            Acquire elite system design and AI capabilities through industry-certified program tracks designed for the modern tech landscape.
          </motion.p>
        </div>

        {/* Center-Peek Slider Canvas */}
        <div className="overflow-hidden w-full relative z-10">
          <div className="program-slider-canvas select-none scene-3d">
            <div className="py-8 overflow-visible">
              <div 
                className="program-slider-track items-center preserve-3d"
                style={{
                  transform: `translateX(calc(50vw - (var(--slide-width) / 2) - (${currentProgramIndex} * (var(--slide-width) + var(--slide-gap)))))`,
                  width: "max-content",
                  transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                }}
              >
              {programSlides.map((slide, idx) => {
                const isActive = idx === currentProgramIndex;
                const isPrev = idx < currentProgramIndex;
                
                let transformStyle = "rotateY(0deg) translateZ(0px) scale(1)";
                if (!isActive) {
                  transformStyle = isPrev ? "rotateY(15deg) translateZ(-120px) scale(0.85)" : "rotateY(-15deg) translateZ(-120px) scale(0.85)";
                }

                return (
                  <div
                    key={slide.id}
                    className={`program-slide-card rounded-[40px] p-8 md:p-14 overflow-hidden border ${
                      isActive ? "bg-white border-[#E2E8F0] opacity-100 shadow-[0_20px_40px_rgba(37,99,235,0.08)] z-10 backdrop-blur-2xl" : "bg-[#F8FAFC]/60 border-[#E2E8F0] opacity-40 pointer-events-none z-0 backdrop-blur-md"
                    }`}
                    style={{ transform: transformStyle, transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)" }}
                  >
                    {/* Glowing Accent Ring */}
                    {isActive && <div className={`absolute inset-0 bg-gradient-to-r from-[#DBEAFE] to-[#EFF6FF] opacity-40 blur-3xl pointer-events-none`}></div>}
                    
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center preserve-3d relative z-10">
                      {/* Left Side Program Details */}
                      <div>
                        <div className="inline-block bg-white border border-[#E2E8F0] text-[#2563EB] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl mb-6 shadow-lg">
                          {slide.eyebrow}
                        </div>
                        <h3 className="lp-font-outfit text-[#0F172A] font-black leading-tight tracking-tight mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
                          {slide.title}
                        </h3>
                        <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-10 font-light max-w-xl">
                          {slide.desc}
                        </p>
                        
                        <button
                          onClick={() => navigate(slide.link)}
                          className="px-8 h-[54px] bg-[#2563EB] text-white font-black rounded-2xl hover:bg-[#1D4ED8] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-sm shadow-md hover:shadow-lg"
                        >
                          {slide.buttonText} <ChevronRight size={16} strokeWidth={3} />
                        </button>
                      </div>

                      {/* Right Side Visual Cards Stack */}
                      <div className="relative h-[260px] flex items-center justify-center w-full">
                        <div className="relative w-full max-w-[340px] h-[200px]">
                          {/* Card 1: Bottom (Blurred offset) */}
                          <div className="absolute top-[0px] left-1/2 transform -translate-x-1/2 w-[84%] bg-[#F8FAFC]/60 border border-[#E2E8F0] rounded-[24px] p-4 shadow-2xl opacity-40 blur-[1px] z-0 select-none backdrop-blur-md">
                            <div className="flex justify-between items-center">
                              {renderCompanyLogo(slide.visualCards[2].logo)}
                              <div className="flex items-center gap-1.5 select-none bg-white px-2 py-1 rounded-md">
                                <Clock size={10} className="text-[#64748B]" />
                                <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wide">{slide.visualCards[2].detail}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: Middle (Semi-opaque offset) */}
                          <div className="absolute top-[32px] left-1/2 transform -translate-x-1/2 w-[92%] bg-white/90 border border-[#E2E8F0] rounded-[24px] p-4 shadow-[0_15px_30px_rgba(37,99,235,0.05)] opacity-90 blur-[0.3px] z-10 select-none backdrop-blur-xl">
                            <div className="flex justify-between items-center">
                              {renderCompanyLogo(slide.visualCards[1].logo)}
                              <div className="flex items-center gap-1.5 select-none bg-white px-2 py-1 rounded-md">
                                <Clock size={10} className="text-[#64748B]" />
                                <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wide">{slide.visualCards[1].detail}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 3: Top (Fully sharp card in front) */}
                          <div className="absolute top-[64px] left-1/2 transform -translate-x-1/2 w-[100%] bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-[0_20px_40px_rgba(37,99,235,0.08)] z-20 backdrop-blur-2xl">
                            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3 mb-4">
                              {renderCompanyLogo(slide.visualCards[0].logo)}
                              <div className="flex items-center gap-1.5 select-none bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                                <Clock size={11} className="text-[#2563EB]" />
                                <span className="text-[10px] text-[#2563EB] font-black uppercase tracking-widest">{slide.visualCards[0].detail}</span>
                              </div>
                            </div>
                            
                            <p className="text-[#0F172A] text-sm font-black tracking-wide mb-5 leading-tight">{slide.visualCards[0].role}</p>
                            
                            <button
                              onClick={() => navigate(slide.link)}
                              className="w-full py-3 bg-white hover:bg-[#EFF6FF] border border-[#2563EB] hover:border-[#1D4ED8] text-[#2563EB] hover:text-[#1D4ED8] font-black text-xs rounded-xl tracking-[0.2em] uppercase transition-all duration-300 shadow-sm select-none flex items-center justify-center gap-2"
                            >
                              {slide.visualCards[0].action} <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>

          {/* Unified Navigation Arrow & Pagination Row */}
          <div className="flex items-center justify-center gap-6 mt-12 select-none relative z-20">
            <button 
              onClick={handlePrevProgram} 
              className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#2563EB] hover:scale-110 transition-all shadow-lg backdrop-blur-md" 
              aria-label="Previous Program"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            
            <div className="flex gap-3 items-center bg-[#F8FAFC]/40 px-4 py-3 rounded-full border border-[#E2E8F0] backdrop-blur-xl">
              {programSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentProgramIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 border-none cursor-pointer ${
                    i === currentProgramIndex ? "w-8 bg-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={handleNextProgram} 
              className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#2563EB] hover:scale-110 transition-all shadow-lg backdrop-blur-md" 
              aria-label="Next Program"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Detailed Curriculum Breakdown ─── */}
      <LandingCurriculum />

      {/* ─── Premium Mentor Profiles ─── */}
      <LandingMentors />

      {/* ─── Placement Process ─── */}
      <LandingPlacementProcess />

      {/* ─── NEW: Learner Case Studies ─── */}


      {/* ─── NEW SECTION: Outcome Powerhouse (Your Recipe for a Rockstar Career) ─── */}
      <section style={{ padding: "110px 0", background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.05)" }} id="rockstar-recipe">
        <div style={{ width: "min(92%, 1250px)", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "70px" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#0F7B53", background: "rgba(15,123,83,0.08)", padding: "6px 16px", borderRadius: "99px", marginBottom: "16px" }}>
              Welcome to the Outcome Powerhouse
            </span>
            <h2 className="lp-font-outfit text-[#111111] font-extrabold leading-tight text-glow" style={{ fontSize: "clamp(30px, 4.5vw, 48px)", maxWidth: "800px", margin: "0 auto" }}>
              Your Recipe for a Rockstar Career
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))", gap: "30px" }}>
            {/* Card 1: Get Referrals */}
            <div className="outcome-dark-gradient rounded-[28px] p-8 md:p-10 shadow-lg flex flex-col md:flex-row justify-between gap-8 group overflow-hidden relative min-h-[380px] transition-all duration-500 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F7B53]/[0.05] to-transparent pointer-events-none" />
              
              <div className="flex flex-col justify-between relative z-10 w-full md:w-[45%]">
                <div>
                  <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#f59e0b", background: "rgba(245,158,11,0.15)", padding: "5px 12px", borderRadius: "99px", marginBottom: "18px" }} className="uppercase">
                    Access 3000+ Companies
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-4 leading-snug lp-font-outfit">Get Referrals</h3>
                  <p className="text-[#475569] text-[14.5px] leading-relaxed font-light">
                    Boost your job prospects with direct developer referrals from our vast enterprise network of companies.
                  </p>
                </div>
              </div>

              {/* Logo Cloud Visual (Fully Stylized & Non-Overlapping) */}
              <div className="relative z-10 w-full md:w-[50%] h-[260px] bg-white border border-gray-100 shadow-inner rounded-2xl overflow-hidden flex items-center justify-center p-4">
                <div className="relative w-full h-[220px]">
                  {/* Google */}
                  <div className="absolute top-[6%] left-[8%] px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-2 transform -rotate-6 transition-transform group-hover:scale-105 duration-300">
                    <span className="text-blue-500 font-extrabold text-sm select-none">G</span>
                    <span className="text-gray-800 text-xs font-bold">Google</span>
                  </div>
                  {/* Microsoft */}
                  <div className="absolute bottom-[8%] right-[6%] px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-2 transform rotate-3 transition-transform group-hover:scale-105 duration-300">
                    <div className="grid grid-cols-2 gap-0.5 shrink-0 select-none">
                      <span className="w-1.5 h-1.5 bg-[#f25022]" /><span className="w-1.5 h-1.5 bg-[#7fba00]" />
                      <span className="w-1.5 h-1.5 bg-[#00a4ef]" /><span className="w-1.5 h-1.5 bg-[#ffb900]" />
                    </div>
                    <span className="text-gray-800 text-xs font-bold">Microsoft</span>
                  </div>
                  {/* Infosys */}
                  <div className="absolute top-[40%] left-[38%] px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-2 transform rotate-12 transition-transform group-hover:scale-105 duration-300">
                    <span className="text-[#007cc3] font-black text-xs select-none">Infosys</span>
                  </div>
                  {/* PayPal */}
                  <div className="absolute bottom-[12%] left-[8%] px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-2 transform -rotate-12 transition-transform group-hover:scale-105 duration-300">
                    <span className="text-[#003087] font-black text-xs select-none">PayPal</span>
                  </div>
                  {/* NVIDIA */}
                  <div className="absolute top-[10%] right-[10%] px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-2 transform rotate-6 transition-transform group-hover:scale-105 duration-300">
                    <span className="text-[#76b900] font-black text-xs select-none">NVIDIA</span>
                  </div>
                  {/* Meesho */}
                  <div className="absolute top-[38%] left-[6%] px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-[#ff3f6c] text-[10px] font-black tracking-tight transform -rotate-3 select-none">meesho</div>
                  {/* Rapido */}
                  <div className="absolute top-[48%] right-[8%] px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-[#27272a] text-[10px] font-black tracking-tight transform rotate-6 select-none">rapido</div>
                  {/* Flipkart */}
                  <div className="absolute bottom-[10%] left-[40%] px-3.5 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-[#1f74e5] text-xs font-black transform -rotate-6 select-none">Flipkart</div>
                </div>
              </div>
            </div>

            {/* Card 2: Company-Specific Prep */}
            <div className="outcome-dark-gradient rounded-[28px] p-8 md:p-10 shadow-lg flex flex-col md:flex-row justify-between gap-8 group overflow-hidden relative min-h-[380px] transition-all duration-500 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/[0.05] to-transparent pointer-events-none" />
              
              <div className="flex flex-col justify-between relative z-10 w-full md:w-[45%]">
                <div>
                  <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#38bdf8", background: "rgba(56,189,248,0.15)", padding: "5px 12px", borderRadius: "99px", marginBottom: "18px" }} className="uppercase">
                    Unlimited 1:1 Mock Prep
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-4 leading-snug lp-font-outfit">Company-Specific Mock Prep</h3>
                  <p className="text-[#475569] text-[14.5px] leading-relaxed font-light">
                    Get ready for core evaluations with heavily customized, rigorous 1-on-1 mock interviews tailored specifically for your target companies.
                  </p>
                </div>
              </div>

              {/* Calendar Planner Visual (Fixed Height) */}
              <div className="relative z-10 w-full md:w-[50%] h-[260px] bg-white border border-gray-100 rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-inner">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Tailored Planner</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] font-bold text-[#64748B] bg-gray-50 px-2 py-0.5 rounded border border-gray-200 uppercase">MAY 29</span>
                    <span className="text-[9px] font-bold text-[#64748B] bg-gray-50 px-2 py-0.5 rounded border border-gray-200 uppercase">MAY 30</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 flex-grow justify-center">
                  {/* Task 1: Amazon Practice */}
                  <div className="relative bg-[#fff3e0] rounded-xl p-3 border border-[#ffb74d] shadow-sm flex flex-col justify-between min-h-[82px] group-hover:translate-x-1 transition-transform">
                    <div>
                      <p className="text-[9px] font-bold text-[#e65100] mb-0.5 leading-none">Practice Interview</p>
                      <h4 className="text-[#bf360c] text-xs font-extrabold leading-tight">Scheduled for Amazon</h4>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-[9px] font-bold text-[#e65100]">14:30 - 15:30</span>
                      <span className="px-2.5 py-1 bg-white text-[8px] font-black text-[#e65100] rounded-full flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#ffb74d]">
                        <span className="w-1 h-1 rounded-full bg-[#2563EB] animate-ping" /> Join Mock
                      </span>
                    </div>
                  </div>

                  {/* Task 2: Amazon Round 1 */}
                  <div className="bg-[#e3f2fd] rounded-xl p-3 border border-[#64b5f6] shadow-sm min-h-[64px] flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-[#1565c0] mb-0.5 leading-none">Round 1 Interview</p>
                      <h4 className="text-[#0d47a1] text-xs font-extrabold leading-tight">Scheduled for Amazon</h4>
                    </div>
                    <div className="flex justify-between items-center mt-2.5">
                      <span className="text-[9px] font-bold text-[#1565c0]">15:30 - 16:30</span>
                      <span className="text-[8px] font-bold text-[#1976d2]">Hosted by Accenlearn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Live Coding Practice */}
            <div className="outcome-dark-gradient rounded-[28px] p-8 md:p-10 shadow-lg flex flex-col md:flex-row justify-between gap-8 group overflow-hidden relative min-h-[380px] transition-all duration-500 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/[0.05] to-transparent pointer-events-none" />
              
              <div className="flex flex-col justify-between relative z-10 w-full md:w-[45%]">
                <div>
                  <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#34d399", background: "rgba(52,211,153,0.15)", padding: "5px 12px", borderRadius: "99px", marginBottom: "18px" }} className="uppercase">
                    Interactive Coding Sessions
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-4 leading-snug lp-font-outfit">Live Coding Practice</h3>
                  <p className="text-[#475569] text-[14.5px] leading-relaxed font-light">
                    Improve your core systems execution skills with weekly live coding exercises and real time feedback.
                  </p>
                </div>
              </div>

              {/* Live split mockup (Fixed Height) */}
              <div className="relative z-10 w-full md:w-[50%] h-[260px] grid grid-cols-[0.8fr_1.2fr] gap-3.5 bg-white border border-gray-100 shadow-inner rounded-2xl p-3.5 overflow-hidden">
                {/* Left: Video panel */}
                <div className="relative h-full bg-[#F8FAF8] rounded-xl overflow-hidden flex flex-col justify-between p-2.5 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="px-1.5 py-0.5 rounded bg-red-500 text-[#0F172A] text-[8px] font-bold tracking-wider">LIVE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                  </div>
                  {/* Mentor avatar visual */}
                  <div className="flex flex-col items-center justify-center flex-grow py-2">
                    <div className="w-11 h-11 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-bold text-[#0A5A3D] shadow-sm">SL</div>
                    <span className="text-[9px] font-bold text-gray-600 mt-2">Suryansh L.</span>
                  </div>
                  <div className="text-[8px] text-[#64748B] font-medium text-center">Mentor Lead</div>
                </div>

                {/* Right: Code editor console */}
                <div className="relative h-full bg-[#f1f5f9] rounded-xl border border-gray-200 overflow-hidden flex flex-col justify-between p-3 font-mono text-[9px] text-gray-600">
                  <div className="flex items-center gap-1.5 border-b border-gray-200 pb-2 mb-2 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-red-400" /><span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-[8px] text-[#64748B] ml-1.5 select-none">solution.py</span>
                  </div>
                  <div className="flex-grow select-none flex flex-col gap-1 leading-normal font-medium overflow-hidden">
                    <div className="text-gray-800">1  <span className="text-purple-600 font-bold">def</span> twoSum(nums, target):</div>
                    <div className="text-[#64748B]">2      seen = {}</div>
                    <div className="text-[#64748B]">3      <span className="text-purple-600 font-bold">for</span> i, n <span className="text-indigo-600 font-bold">in</span> enumerate(nums):</div>
                    <div className="text-[#64748B]">4          diff = target - n</div>
                    <div className="text-gray-700">5          <span className="text-purple-600 font-bold">if</span> diff <span className="text-indigo-600 font-bold">in</span> seen:</div>
                    <div className="text-[#2563EB]">6              <span className="text-purple-600 font-bold">return</span> [seen[diff], i]</div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-1.5 text-[8px] text-[#0A5A3D] font-extrabold select-none shrink-0">
                    <span className="w-1 h-1 rounded-full bg-[#2563EB] shadow-lg animate-pulse" /> Verified Compile
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Career Support */}
            <div className="outcome-dark-gradient rounded-[28px] p-8 md:p-10 shadow-lg flex flex-col md:flex-row justify-between gap-8 group overflow-hidden relative min-h-[380px] transition-all duration-500 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fb7185]/[0.05] to-transparent pointer-events-none" />
              
              <div className="flex flex-col justify-between relative z-10 w-full md:w-[45%]">
                <div>
                  <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#fb7185", background: "rgba(251,113,133,0.15)", padding: "5px 12px", borderRadius: "99px", marginBottom: "18px" }} className="uppercase">
                    Lifetime Placement Assistance
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-4 leading-snug lp-font-outfit">Career Support</h3>
                  <p className="text-[#475569] text-[14.5px] leading-relaxed font-light">
                    Continue to receive targeted tech vacancies and active referral support as an alumnus.
                  </p>
                </div>
              </div>

              {/* Connected Timeline Node Graph (Fidelity alignment, No Collisions) */}
              <div className="relative z-10 w-full md:w-[50%] h-[260px] bg-white border border-gray-100 shadow-inner rounded-2xl overflow-hidden p-4.5 flex items-center justify-center">
                <div className="relative w-full flex flex-col gap-3.5">
                  {/* Centered track line passing perfectly under nodes */}
                  <div className="absolute left-[18px] top-4 bottom-4 w-[2px] border-l border-dashed border-[#0F7B53]/30 z-0 pointer-events-none" />

                  {/* Stage 3: Top */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white border border-[#0F7B53]/30 text-[#2563EB] flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <Sparkles size={14} />
                    </div>
                    <div className="flex-grow bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm transition-all duration-300 hover:border-[#0F7B53]/20">
                      <h4 className="text-[#111111] font-extrabold text-[11px] leading-tight">Senior SDE (SDE 2)</h4>
                      <p className="text-[9px] text-[#64748B] mt-0.5">Microsoft • Full-time • 2023-Present</p>
                    </div>
                  </div>

                  {/* Stage 2: Middle */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white border border-[#0A5A3D]/30 text-[#0A5A3D] flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <Code2 size={14} />
                    </div>
                    <div className="flex-grow bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm transition-all duration-300 hover:border-[#0A5A3D]/20">
                      <h4 className="text-[#111111] font-extrabold text-[11px] leading-tight">Software Developer (SDE 1)</h4>
                      <p className="text-[9px] text-[#64748B] mt-0.5">Razorpay • Full-time • 2022-2023</p>
                    </div>
                  </div>

                  {/* Stage 1: Bottom */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 text-[#64748B] flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <TerminalSquare size={14} />
                    </div>
                    <div className="flex-grow bg-gray-50 border border-gray-200 rounded-xl p-2.5 shadow-sm">
                      <h4 className="text-gray-600 font-bold text-[11px] leading-tight">Quality Assurance</h4>
                      <p className="text-[9px] text-[#64748B] mt-0.5">Flipkart • Full-time • 2021-2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── NEW: Admissions Flow ─── */}
      <LandingAdmissionsFlow />





      {/* ─── Immersive Conversion CTA ─── */}
      <LandingCTA />

      {/* ─── FAQ ─── */}
      <LandingFAQ />

      {/* Applied popup for seamless conversions */}
      {showPopup && (
        <AdvancedApplyPopup
          onClose={() => setShowPopup(false)}
          initialDomain="Advance"
        />
      )}
    </div>
  );
};

export default HomePage;
