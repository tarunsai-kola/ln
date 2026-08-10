import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Users, Target, 
  CheckCircle2, Clock, Code2, LineChart, 
  Megaphone, Kanban, BrainCircuit,
  FileText, MessageSquare, MonitorPlay, 
  Award, Star, ShieldCheck, Workflow, Server, Cpu, Database, ChevronLeft, ChevronRight,
  Briefcase, TrendingUp, Landmark
} from "lucide-react";
import { Toaster } from "react-hot-toast";

import ClientsCarousel from "../Components/our_alumni";
import AuthorityMarquee from "../Components/AuthorityMarquee";
// import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
import CountdownTimer from "./AdvanceCourse/Components/CountdownTimer";
import specializationsBg from "../assets/specializations_bg.png";

const programs = [
  { 
    id: "vlsi", 
    icon: <Cpu size={28}/>, 
    name: "VLSI Design", 
    positioning: "Master semiconductor design, verification, and hardware modeling.", 
    dur: "20 Weeks", 
    idealFor: "ECE/EE students entering chip design.", 
    tools: ["Verilog", "SystemVerilog", "EDA"], 
    link: "/VLSI", 
    cat: "Core Engineering", 
    accent: "bg-indigo-500",
    shadow: "shadow-indigo-500/20",
    gradient: "from-indigo-500 to-violet-600",
    bgImage: "/program-bg/vlsi.png"
  },
  { 
    id: "ai-ml", 
    icon: <BrainCircuit size={28}/>, 
    name: "AI & Machine Learning", 
    positioning: "Build predictive models and intelligent automation systems.", 
    dur: "15 Weeks", 
    idealFor: "CS students scaling into AI.", 
    tools: ["Python", "TensorFlow", "Scikit"], 
    link: "/AIML", 
    cat: "AI & Data", 
    accent: "bg-emerald-500",
    shadow: "shadow-emerald-500/20",
    gradient: "from-emerald-400 to-teal-600",
    bgImage: "/program-bg/ai-ml.png"
  },
  { 
    id: "cyber", 
    icon: <ShieldCheck size={28}/>, 
    name: "Cyber Security", 
    positioning: "Defend systems with ethical hacking and security architecture.", 
    dur: "27 Weeks", 
    idealFor: "Students aspiring for SecOps.", 
    tools: ["Pen-testing", "Network Sec", "Crypto"], 
    link: "/CyberSecurity", 
    cat: "Engineering", 
    accent: "bg-rose-500",
    shadow: "shadow-rose-500/20",
    gradient: "from-rose-500 to-red-600",
    bgImage: "/program-bg/cyber.png"
  },
  { 
    id: "cloud", 
    icon: <Server size={28}/>, 
    name: "Cloud Computing", 
    positioning: "Architect and deploy scalable infrastructure on AWS and Azure.", 
    dur: "25 Weeks", 
    idealFor: "Future cloud architects.", 
    tools: ["AWS", "Azure", "Docker"], 
    link: "/CloudComputing", 
    cat: "Engineering", 
    accent: "bg-cyan-500",
    shadow: "shadow-cyan-500/20",
    gradient: "from-cyan-400 to-blue-600",
    bgImage: "/program-bg/cloud.png"
  },
  { 
    id: "iot", 
    icon: <MonitorPlay size={28}/>, 
    name: "IoT & Robotics", 
    positioning: "Connect hardware with software for smart automation systems.", 
    dur: "18 Weeks", 
    idealFor: "Electronics and CS students.", 
    tools: ["Arduino", "Raspberry Pi", "Sensors"], 
    link: "/IoTRobotics", 
    cat: "Core Engineering", 
    accent: "bg-amber-500",
    shadow: "shadow-amber-500/20",
    gradient: "from-amber-400 to-orange-600",
    bgImage: "/program-bg/iot.png"
  },
  { 
    id: "devops", 
    icon: <Workflow size={28}/>, 
    name: "DevOps", 
    positioning: "Automate deployment pipelines and manage scalable cloud operations.", 
    dur: "26 Weeks", 
    idealFor: "Engineers focusing on CI/CD.", 
    tools: ["Kubernetes", "Jenkins", "Terraform"], 
    link: "/DevOps", 
    cat: "Engineering", 
    accent: "bg-fuchsia-500",
    shadow: "shadow-fuchsia-500/20",
    gradient: "from-fuchsia-500 to-purple-600",
    bgImage: "/program-bg/devops.png"
  },
  { 
    id: "data-analytics", 
    icon: <LineChart size={28}/>, 
    name: "Data Analytics", 
    positioning: "Extract actionable business insights using modern data tools.", 
    dur: "16 Weeks", 
    idealFor: "Students targeting data roles.", 
    tools: ["SQL", "PowerBI", "Excel"], 
    link: "/DataAnalytics", 
    cat: "AI & Data", 
    accent: "bg-blue-500",
    shadow: "shadow-blue-500/20",
    gradient: "from-blue-400 to-blue-700",
    bgImage: "/program-bg/da-ai.png"
  },
  { 
    id: "embedded", 
    icon: <Cpu size={28}/>, 
    name: "Embedded Systems", 
    positioning: "Design firmware and micro-controller architectures.", 
    dur: "19 Weeks", 
    idealFor: "ECE/EE core engineering students.", 
    tools: ["C/C++", "Microcontrollers", "RTOS"], 
    link: "/EmbeddedSystems", 
    cat: "Core Engineering", 
    accent: "bg-teal-500",
    shadow: "shadow-teal-500/20",
    gradient: "from-teal-400 to-emerald-600",
    bgImage: "/program-bg/embedded.png"
  },
  { 
    id: "autocad", 
    icon: <Target size={28}/>, 
    name: "AutoCAD", 
    positioning: "Draft and model 2D/3D designs for engineering applications.", 
    dur: "22 Weeks", 
    idealFor: "Mechanical & Civil students.", 
    tools: ["AutoCAD 2D", "AutoCAD 3D", "Drafting"], 
    link: "/AutoCAD", 
    cat: "Design", 
    accent: "bg-orange-500",
    shadow: "shadow-orange-500/20",
    gradient: "from-orange-400 to-red-500",
    bgImage: "/program-bg/autocad.png"
  },
  { 
    id: "graphic-design", 
    icon: <CheckCircle2 size={28}/>, 
    name: "Graphic Design", 
    positioning: "Create stunning visuals, branding, and digital media assets.", 
    dur: "23 Weeks", 
    idealFor: "Creative students and designers.", 
    tools: ["Photoshop", "Illustrator", "Figma"], 
    link: "/GraphicDesign", 
    cat: "Design", 
    accent: "bg-pink-500",
    shadow: "shadow-pink-500/20",
    gradient: "from-pink-400 to-rose-600",
    bgImage: "/program-bg/graphic.png"
  },
  { 
    id: "mern", 
    icon: <Code2 size={28}/>, 
    name: "Full Stack Web (MERN)", 
    positioning: "Build secure, scalable full-stack web applications.", 
    dur: "24 Weeks", 
    idealFor: "Aspiring software developers.", 
    tools: ["React", "Node.js", "MongoDB"], 
    link: "/FullStackWeb", 
    cat: "Engineering", 
    accent: "bg-green-500",
    shadow: "shadow-green-500/20",
    gradient: "from-green-400 to-emerald-600",
    bgImage: "/program-bg/ai-fsd.png"
  }
];

const heroData = [
  {
    id: "ds-genai",
    tab: "AI & Data",
    eyebrow: "Data Science & GenAI",
    title: "Architect the future with Intelligence",
    desc: "Master predictive modeling and deploy scalable LLM pipelines using advanced generative tech.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    badgeLabel: "Admissions Open",
    card1Label: "Career Focus", card1Value: "AI Architect", card1Icon: <BrainCircuit size={20}/>,
    card2Label: "Format", card2Value: "16-Week Sprint", card2Icon: <Clock size={20}/>,
    glowBg: "bg-indigo-600/30",
    gradientText: "from-indigo-400 to-purple-400"
  },
  {
    id: "ai-fsd",
    tab: "Engineering",
    eyebrow: "AI-Powered Full Stack",
    title: "Build the next generation of web scale",
    desc: "Master the MERN stack integrated natively with LLMs. Code faster, scale globally.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    badgeLabel: "Engineering Track",
    card1Label: "Career Focus", card1Value: "Full Stack Engineer", card1Icon: <Code2 size={20}/>,
    card2Label: "Format", card2Value: "16-Week Cohort", card2Icon: <Clock size={20}/>,
    glowBg: "bg-emerald-600/30",
    gradientText: "from-emerald-400 to-teal-400"
  },
  {
    id: "cyber",
    tab: "Security",
    eyebrow: "Cybersecurity",
    title: "Defend against modern digital threats",
    desc: "Become an ethical hacker and secure cloud environments with enterprise-grade defense.",
    image: "https://images.unsplash.com/photo-1563206767533-bc5935cb8ca5?auto=format&fit=crop&w=800&q=80",
    badgeLabel: "Security Track",
    card1Label: "Career Focus", card1Value: "Security Analyst", card1Icon: <ShieldCheck size={20}/>,
    card2Label: "Format", card2Value: "16-Week Cohort", card2Icon: <Clock size={20}/>,
    glowBg: "bg-rose-600/30",
    gradientText: "from-rose-400 to-red-400"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const heroBgImages = [
  "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2121&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
];

const HeroBackground = ({ images }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(bgInterval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0 bg-zinc-950">
       <AnimatePresence mode="popLayout">
          <motion.img 
             key={currentBgIndex}
             src={images[currentBgIndex]} 
             initial={{ opacity: 0, scale: 1.05 }}
             animate={{ opacity: 0.3, scale: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
             alt="Abstract Data Background" 
             className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity grayscale" 
          />
       </AnimatePresence>
       <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950 z-10"></div>
    </div>
  );
};

const ProgramCarousel = ({ filteredPrograms, navigate }) => {
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);

  useEffect(() => {
    setActiveCarouselIdx(0);
  }, [filteredPrograms]);

  useEffect(() => {
    if (filteredPrograms.length <= 1) return;
    const carouselInterval = setInterval(() => {
      setActiveCarouselIdx(prev => (prev + 1) % filteredPrograms.length);
    }, 5000);
    return () => clearInterval(carouselInterval);
  }, [filteredPrograms]);

  if (filteredPrograms.length === 0) return null;

  return (
    <div className="relative glass-panel rounded-[40px] p-[1px] overflow-visible group">
       <div className={`absolute inset-0 bg-gradient-to-br ${filteredPrograms[activeCarouselIdx].gradient} opacity-20 blur-3xl rounded-[40px] transition-all duration-1000 pointer-events-none`}></div>
       
       <div className="bg-[#0A0A0B] rounded-[39px] relative z-10 overflow-hidden flex flex-col min-h-[450px]">
          {/* Faded Background Image */}
          <div 
             className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.25] mix-blend-luminosity pointer-events-none transition-all duration-700"
             style={{ backgroundImage: `url(${filteredPrograms[activeCarouselIdx].bgImage})` }}
          ></div>
          {/* Gradient overlay to ensure text remains readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/90 to-transparent z-0 pointer-events-none"></div>

          <AnimatePresence mode="wait">
             <motion.div 
                key={activeCarouselIdx}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.05, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col md:flex-row flex-grow"
             >
                <div className="p-10 md:p-16 flex flex-col justify-center w-full md:w-3/5 border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
                   <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${filteredPrograms[activeCarouselIdx].gradient} opacity-[0.03] pointer-events-none`}></div>
                   
                   <div className="flex items-center gap-4 mb-8 relative z-10">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.05)]`}>
                        {filteredPrograms[activeCarouselIdx].icon}
                      </div>
                      <div>
                         <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Duration</span>
                         <span className="text-sm font-bold text-zinc-200 bg-white/5 px-3 py-1 rounded-full border border-white/10">{filteredPrograms[activeCarouselIdx].dur}</span>
                      </div>
                   </div>
                   
                   <h3 className={`text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${filteredPrograms[activeCarouselIdx].gradient} mb-6 leading-[1.1] relative z-10`}>
                      {filteredPrograms[activeCarouselIdx].name}
                   </h3>
                   
                   <p className="text-zinc-400 text-lg leading-relaxed font-light mb-10 max-w-lg relative z-10">
                      {filteredPrograms[activeCarouselIdx].positioning}
                   </p>
                   
                   <div className="flex flex-wrap gap-2 relative z-10">
                      {filteredPrograms[activeCarouselIdx].tools.map(t => (
                         <span key={t} className="text-xs font-semibold bg-zinc-900 border border-white/10 text-zinc-300 px-4 py-2 rounded-xl">
                            {t}
                         </span>
                      ))}
                   </div>
                </div>

                <div className="p-10 md:p-16 w-full md:w-2/5 flex flex-col justify-center bg-white/[0.02] relative z-10">
                   <div>
                      <div className="mb-4">
                         <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-3">Ideal Candidate Profile</span>
                         <p className="text-zinc-200 font-medium text-lg">{filteredPrograms[activeCarouselIdx].idealFor}</p>
                      </div>
                   </div>

                   <button 
                      onClick={() => navigate(filteredPrograms[activeCarouselIdx].link)}
                      className={`mt-10 w-full py-5 rounded-2xl font-bold text-white shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 bg-gradient-to-r ${filteredPrograms[activeCarouselIdx].gradient}`}
                   >
                      Explore Track <ArrowRight size={20}/>
                   </button>
                </div>
             </motion.div>
          </AnimatePresence>
       </div>

       {filteredPrograms.length > 1 && (
          <>
             <div className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => setActiveCarouselIdx(prev => prev === 0 ? filteredPrograms.length - 1 : prev - 1)}
                  className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-2xl backdrop-blur-md"
                >
                  <ChevronLeft size={24}/>
                </button>
             </div>
             <div className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => setActiveCarouselIdx(prev => (prev + 1) % filteredPrograms.length)}
                  className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-2xl backdrop-blur-md"
                >
                  <ChevronRight size={24}/>
                </button>
             </div>
          </>
       )}
    </div>
  );
};

const Advance = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPrograms = filter === "All" ? programs : programs.filter(p => p.cat === filter);

  return (
    <div className="bg-zinc-950 text-zinc-300 font-['Plus_Jakarta_Sans'] min-h-screen selection:bg-indigo-500/30">
      <Helmet>
        <title>Ultra-Premium Advanced Programs | Accenlearn</title>
        <meta name="description" content="Explore ultra-premium advanced programs in software, data, product, and marketing." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap');

        .glass-panel {
          background: rgba(24, 24, 27, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .k-title { font-family: 'Outfit', sans-serif; letter-spacing: -0.03em; }
        
        .text-glow {
          text-shadow: 0 0 40px rgba(255,255,255,0.1);
        }

        .mesh-bg {
          background-color: #09090b;
          background-image: 
            radial-gradient(at 40% 20%, hsla(253,16%,7%,1) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(189,100%,56%,0.05) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(355,100%,93%,0.02) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(340,100%,76%,0.03) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(22,100%,77%,0.03) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(242,100%,70%,0.05) 0px, transparent 50%),
            radial-gradient(at 0% 0%, hsla(343,100%,76%,0.02) 0px, transparent 50%);
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-[#050505] flex flex-col items-center">
         {/* Cinematic Background Image */}
         <HeroBackground images={heroBgImages} />
         {/* Massive Background Glow */}
         <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[1000px] aspect-square bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0"></div>
         <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60vw] max-w-[800px] aspect-square bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-[pulse_8s_ease-in-out_infinite] z-0"></div>
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-0"></div>
         
         <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full flex flex-col items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-widest mb-6 text-zinc-300 shadow-2xl backdrop-blur-md"
            >
               <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse"></span>
               Admissions Open for Next Cohort
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="k-title text-5xl sm:text-6xl lg:text-[80px] font-extrabold text-white leading-[1.05] tracking-tight mb-6 text-glow max-w-5xl text-center"
            >
               Architect the <br className="hidden sm:block"/> 
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">future of tech.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-12 max-w-3xl font-light text-center"
            >
               Elite engineering and growth programs designed for ambitious professionals. Master complex systems, leverage AI, and dramatically accelerate your trajectory.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="w-full max-w-5xl relative mt-4"
            >
               <ProgramCarousel filteredPrograms={programs} navigate={navigate} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 mx-auto w-fit bg-[#091C11] rounded-[16px] py-3 px-8 md:px-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 shadow-2xl border border-[#144A2D]"
            >
               {/* Placements */}
               <div className="flex items-center gap-3">
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
               <div className="flex items-center gap-3">
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
               <div className="flex items-center gap-3">
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
      </section>

      {/* AUTHORITY MARQUEE */}
      <AuthorityMarquee theme="dark" />

      {/* 2. PROGRAM CATEGORY & CATALOG */}
      <section className="py-16 lg:py-32 bg-zinc-950 relative z-10" id="catalog" style={{ backgroundImage: `url(${specializationsBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
         <div className="max-w-[1400px] mx-auto px-6">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-16 md:flex justify-between items-end gap-8"
            >
               <div className="max-w-2xl">
                  <h2 className="k-title text-4xl md:text-5xl font-bold text-white mb-6">Discover Specializations</h2>
                  <p className="text-zinc-400 text-lg">Elite curriculums designed to architect your next career leap.</p>
               </div>
               
               <div className="flex flex-wrap gap-2 mt-8 md:mt-0 p-1.5 glass-panel rounded-2xl">
                  {["All", "Engineering", "AI & Data", "Business & Growth"].map(c => (
                     <button 
                        key={c} 
                        onClick={() => setFilter(c)} 
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                           filter === c 
                           ? 'bg-zinc-100 text-zinc-950 shadow-lg' 
                           : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                     >
                        {c}
                     </button>
                  ))}
               </div>
            </motion.div>

             <motion.div 
               layout
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
             >
                <AnimatePresence mode="popLayout">
                   {filteredPrograms.map((prog, idx) => (
                      <motion.div
                         key={prog.id}
                         layout
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.9 }}
                         transition={{ duration: 0.4 }}
                         onClick={() => navigate(prog.link)}
                         className="glass-panel rounded-[28px] p-8 relative overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500 min-h-[380px] flex flex-col"
                      >
                         {/* Faded Background Image */}
                         <div 
                            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10 group-hover:opacity-30 mix-blend-luminosity transition-all duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${prog.bgImage})` }}
                         ></div>
                         {/* Gradient overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent z-0 pointer-events-none"></div>
                         
                         <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-8">
                               <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                                  {prog.icon}
                               </div>
                               <span className="text-[11px] font-bold text-zinc-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">{prog.dur}</span>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-colors">
                               {prog.name}
                            </h3>
                            
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                               {prog.positioning}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                               {prog.tools.slice(0,2).map(t => (
                                  <span key={t} className="text-[10px] font-semibold bg-white/5 border border-white/5 text-zinc-300 px-3 py-1.5 rounded-lg">
                                     {t}
                                  </span>
                               ))}
                               {prog.tools.length > 2 && (
                                  <span className="text-[10px] font-semibold bg-white/5 border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg">
                                     +{prog.tools.length - 2}
                                  </span>
                               )}
                            </div>

                            <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 pt-4 border-t border-white/5">
                               Explore Track <ArrowRight size={16} className="ml-2 text-zinc-400 group-hover:text-white transition-colors" />
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </AnimatePresence>
             </motion.div>
         </div>
      </section>

      {/* 3. BENTO-BOX VALUE FRAMEWORK */}
      <section className="py-16 lg:py-32 bg-[#050505] relative border-y border-white/5 overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" alt="Cyber Security Pattern" className="w-full h-full object-cover opacity-[0.03] mix-blend-luminosity grayscale" />
         </div>
         <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 z-0"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

         <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-20 text-center max-w-3xl mx-auto"
            >
               <h2 className="k-title text-4xl md:text-5xl font-bold text-white mb-6">The Accenlearn Edge</h2>
               <p className="text-zinc-400 text-lg">We engineer our programs like high-performance tech products: structured, scalable, and relentlessly focused on outputs.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[340px]">
               {/* Bento Item 1 - Large */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="md:col-span-2 md:row-span-2 glass-panel rounded-[32px] p-10 lg:p-16 flex flex-col justify-end relative overflow-hidden group border-white/10"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Decorative Architecture Graphic */}
                  <div className="absolute top-10 left-10 right-32 bottom-[300px] pointer-events-none hidden md:flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
                     <div className="relative w-full max-w-md h-full max-h-[250px] mt-10">
                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M15 50 C 40 50, 40 25, 60 25" stroke="rgba(99,102,241,0.4)" strokeWidth="0.5" fill="none" strokeDasharray="1 1"/>
                          <path d="M15 50 C 40 50, 40 75, 60 75" stroke="rgba(16,185,129,0.4)" strokeWidth="0.5" fill="none" strokeDasharray="1 1"/>
                          <path d="M60 25 C 80 25, 80 50, 95 50" stroke="rgba(6,182,212,0.4)" strokeWidth="0.5" fill="none" strokeDasharray="1 1"/>
                          <path d="M60 75 C 80 75, 80 50, 95 50" stroke="rgba(244,63,94,0.4)" strokeWidth="0.5" fill="none" strokeDasharray="1 1"/>
                        </svg>

                        {/* Nodes */}
                        <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl backdrop-blur-md flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                           <MonitorPlay className="text-indigo-400" size={20}/>
                        </div>

                        <div className="absolute top-[25%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                           <Server className="text-emerald-400" size={20}/>
                        </div>

                        <div className="absolute top-[75%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                           <Database className="text-cyan-400" size={20}/>
                        </div>

                        <div className="absolute top-1/2 left-[95%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-xl backdrop-blur-md flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                           <Workflow className="text-rose-400" size={20}/>
                        </div>
                     </div>
                  </div>

                  <div className="hidden md:block absolute top-10 right-10 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md z-20">
                    <Server size={48} className="text-indigo-400" strokeWidth={1}/>
                  </div>
                  
                  <div className="relative z-10 max-w-xl">
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-widest text-indigo-300 mb-8">
                        <Cpu size={14}/> Architecture
                     </div>
                     <h3 className="k-title text-4xl font-bold text-white mb-6 leading-tight">Master Complex Enterprise Systems.</h3>
                     <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-light">
                        Move beyond simple tutorials. We teach you to architect scalable backend logic, handle state across robust frontends, and deploy using modern CI/CD pipelines.
                     </p>
                     <div className="flex flex-wrap gap-3">
                        {["Microservices", "System Design", "Cloud Native"].map((t, i) => (
                          <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 backdrop-blur-md">{t}</span>
                        ))}
                     </div>
                  </div>
               </motion.div>

               {/* Bento Item 2 */}
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="glass-panel rounded-[32px] p-10 flex flex-col justify-between relative overflow-hidden group border-white/10"
               >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-8 group-hover:scale-110 transition-transform">
                     <MonitorPlay size={32} strokeWidth={1.5}/>
                  </div>
                  <div>
                     <h4 className="text-2xl font-bold text-white mb-4">Industry Tooling</h4>
                     <p className="text-zinc-400 leading-relaxed font-light">
                        Configure exact software frameworks utilized by modern engineering teams. No toy tools.
                     </p>
                  </div>
               </motion.div>

               {/* Bento Item 3 */}
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="glass-panel rounded-[32px] p-10 flex flex-col justify-between relative overflow-hidden group border-white/10"
               >
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 mb-8 group-hover:scale-110 transition-transform">
                     <Users size={32} strokeWidth={1.5}/>
                  </div>
                  <div>
                     <h4 className="text-2xl font-bold text-white mb-4">Live Mentorship</h4>
                     <p className="text-zinc-400 leading-relaxed font-light">
                        Direct architectural feedback from active senior engineers to stop bad habits instantly.
                     </p>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 4. PEDAGOGY TIMELINE */}
      <section className="py-16 lg:py-32 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Space Network" className="w-full h-full object-cover opacity-10 mix-blend-overlay grayscale" />
         </div>
         <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-24">
               <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-4 block">The Process</span>
               <h2 className="k-title text-4xl md:text-5xl font-bold text-white mb-6">A disciplined execution framework</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-8 relative">
               <div className="hidden md:block absolute top-[40px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

               {[
                  { step: "01", icon: <BrainCircuit/>, title: "Absorb", desc: "Expert-led framework sessions." },
                  { step: "02", icon: <Code2/>, title: "Execute", desc: "Rigorous weekly code assignments." },
                  { step: "03", icon: <Kanban/>, title: "Build", desc: "End-to-end capstone projects." },
                  { step: "04", icon: <MessageSquare/>, title: "Iterate", desc: "Deep-dive technical reviews." },
                  { step: "05", icon: <Target/>, title: "Deploy", desc: "Mock interviews & market readiness." }
               ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    key={i} 
                    className="flex flex-col relative group items-center text-center"
                  >
                     <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30">
                        <span className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-[11px] font-bold shadow-lg">{item.step}</span>
                        <div className="text-zinc-500 group-hover:text-indigo-400 transition-colors">
                           {item.icon}
                        </div>
                     </div>
                     <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                     <p className="text-sm text-zinc-400 leading-relaxed font-light px-2">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. CAREER OUTCOMES MATRIX */}
      <section className="py-16 lg:py-32 bg-[#050505] overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-20">
               <h2 className="k-title text-4xl md:text-5xl font-bold text-white mb-6">Outcomes & Career Scaffolding</h2>
               <p className="text-zinc-400 text-lg">We engineer an ecosystem designed to optimize your market visibility.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <motion.div whileHover={{ y: -5 }} className="glass-panel rounded-3xl p-8 border-white/10 hover:border-indigo-500/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-8 border border-indigo-500/20">
                     <Workflow size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Execution</h4>
                  <ul className="space-y-4">
                     {["Live mentor sessions", "Tool-based environments", "Weekly code reviews"].map((t, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div> {t}</li>
                     ))}
                  </ul>
               </motion.div>

               <motion.div whileHover={{ y: -5 }} className="glass-panel rounded-3xl p-8 border-white/10 hover:border-cyan-500/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-8 border border-cyan-500/20">
                     <FileText size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Portfolio</h4>
                  <ul className="space-y-4">
                     {["Applied capstones", "GitHub repository review", "Artifact generation"].map((t, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div> {t}</li>
                     ))}
                  </ul>
               </motion.div>

               <motion.div whileHover={{ y: -5 }} className="glass-panel rounded-3xl p-8 border-white/10 hover:border-emerald-500/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-8 border border-emerald-500/20">
                     <Target size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Transition</h4>
                  <ul className="space-y-4">
                     {["Technical mock prep", "Resume engineering", "LinkedIn optimization"].map((t, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div> {t}</li>
                     ))}
                  </ul>
               </motion.div>

               <motion.div whileHover={{ y: -5 }} className="relative rounded-3xl p-8 bg-zinc-900 border border-emerald-500/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center mb-8">
                     <Award size={24} />
                  </div>
                  <h4 className="relative z-10 text-sm font-bold text-white mb-6 uppercase tracking-widest">Verification</h4>
                  <ul className="relative z-10 space-y-4">
                     {["Credential issuance", "Placement referrals", "Ongoing network"].map((t, i) => (
                        <li key={i} className="text-sm text-zinc-200 font-medium flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> {t}</li>
                     ))}
                  </ul>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 6. TESTIMONIALS / TRANSITIONS */}
      <section className="py-20 lg:py-32 bg-[#020408] border-t border-white/5 relative overflow-hidden">
         {/* Subtle background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#eab308]/5 blur-[120px] rounded-full pointer-events-none"></div>
         
         <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6 ag-font-outfit tracking-tight">Demonstrated Transitions</h2>
               <p className="text-gray-400 text-lg md:text-xl font-light">Professionals repositioning into high-growth, technically demanding roles.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Main Featured Testimonial */}
               <motion.div 
                 whileHover={{ y: -8 }} 
                 transition={{ duration: 0.4 }}
                 className="lg:col-span-2 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[32px] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl group"
               >
                  <div className="absolute top-[-10%] right-[-5%] p-8 text-white/[0.02] transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Star size={240} className="drop-shadow-2xl"/>
                  </div>
                  <div className="relative z-10 flex-grow">
                     <div className="flex gap-1.5 mb-8 text-[#eab308]">
                        <Star size={18} fill="currentColor"/><Star size={18} fill="currentColor"/><Star size={18} fill="currentColor"/><Star size={18} fill="currentColor"/><Star size={18} fill="currentColor"/>
                     </div>
                     <h3 className="text-2xl md:text-3xl font-outfit font-medium text-white leading-relaxed mb-12 relative">
                        <span className="absolute -left-6 -top-4 text-6xl text-white/10 font-serif leading-none">"</span>
                        The structured curriculum and intense feedback loop on my casework helped me formulate strategy the exact way tech hiring managers expect. It was a complete professional reset.
                     </h3>
                  </div>
                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 mt-auto group-hover:border-white/20 transition-colors">
                     <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#eab308] to-[#ca8a04] flex items-center justify-center font-black text-black font-outfit text-xl shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                           AS
                        </div>
                        <div>
                           <p className="font-black text-white text-xl tracking-wide">Ananya Sharma</p>
                           <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 uppercase tracking-widest mt-1">Data Analyst <ArrowRight size={12} className="inline mx-1 text-[#eab308]" /> Product Manager</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
               
               {/* Side Testimonials */}
               <div className="flex flex-col gap-8">
                  <motion.div 
                     whileHover={{ y: -8 }} 
                     transition={{ duration: 0.4 }}
                     className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[32px] p-8 flex-1 flex flex-col justify-between shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] backdrop-blur-md group"
                  >
                     <p className="text-gray-300 text-[16px] leading-relaxed mb-8 font-light italic relative">
                        "Watching logic scale into deployed APIs under mentor guidance gave me the architectural confidence to pursue senior backend roles."
                     </p>
                     <div className="border-t border-white/10 pt-6 flex items-center gap-4 mt-auto group-hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(59,130,246,0.15)]">RG</div>
                        <div>
                           <p className="font-bold text-white text-base tracking-wide">Rohan Gupta</p>
                           <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Software Engineer</p>
                        </div>
                     </div>
                  </motion.div>
                  
                  <motion.div 
                     whileHover={{ y: -8 }} 
                     transition={{ duration: 0.4 }}
                     className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[32px] p-8 flex-1 flex flex-col justify-between shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] backdrop-blur-md group"
                  >
                     <p className="text-gray-300 text-[16px] leading-relaxed mb-8 font-light italic relative">
                        "Running live ad-sets and performing advanced analytics audits completely redefined my workflow."
                     </p>
                     <div className="border-t border-white/10 pt-6 flex items-center gap-4 mt-auto group-hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(16,185,129,0.15)]">SV</div>
                        <div>
                           <p className="font-bold text-white text-base tracking-wide">Sanya Verma</p>
                           <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">Growth Lead</p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* 7. ALUMNI NETWORK */}
      <section className="py-12 lg:py-24 bg-[#050505] border-y border-white/5">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="w-full md:w-1/3 text-center md:text-left">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3 block">Network</span>
                  <h3 className="k-title text-3xl font-bold text-white mb-4">Industry Recognition</h3>
                  <p className="text-zinc-400 leading-relaxed font-light">
                     Graduates from Accenlearn advanced cohorts earn interviews across high-growth product teams and global enterprises.
                  </p>
               </div>
               
               <div className="w-full md:w-2/3">
                  <div className="glass-panel rounded-3xl p-8 border-white/5">
                     <div className="opacity-90 transition-opacity duration-300">
                        <ClientsCarousel />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 8. ADMISSIONS CTA (Ultra Premium Block) */}
      <section className="py-16 lg:py-32 bg-zinc-950 relative overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[40px] p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative overflow-hidden bg-[#0A0A0B] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
               <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Code Background" className="w-full h-full object-cover opacity-10 mix-blend-luminosity grayscale" />
               </div>
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 z-0"></div>
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3 z-0"></div>
               
               <div className="relative z-10">
                  <span className="inline-block px-4 py-2 border border-white/20 bg-white/5 rounded-full text-xs font-bold text-white uppercase tracking-widest mb-8 backdrop-blur-md">Admissions Strategy</span>
                  <h2 className="k-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">Determine your optimal track.</h2>
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light mb-10">
                     Speak directly with an advisor regarding curriculum details, expected outcomes, and cohort availability before securing enrollment.
                  </p>
               </div>
               
               <div className="relative z-10 flex flex-col sm:flex-row gap-6 lg:justify-end">
                  <button onClick={() => document.getElementById('catalog').scrollIntoView({behavior:'smooth'})} className="px-8 py-5 rounded-2xl glass-panel text-white font-bold text-lg hover:bg-white/10 transition-colors text-center w-full sm:w-auto">
                     Compare Catalog
                  </button>
                  <button onClick={() => setShowApplyForm(true)} className="px-8 py-5 rounded-2xl bg-white text-zinc-950 font-bold text-lg hover:bg-zinc-200 transition-colors text-center shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full sm:w-auto">
                     Request Callback
                  </button>
               </div>
            </motion.div>
         </div>
      </section>

      <Toaster position="top-center" 
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      {showApplyForm && <AdvancedApplyPopup onClose={() => setShowApplyForm(false)} />}
    </div>
  );
};

export default Advance;
