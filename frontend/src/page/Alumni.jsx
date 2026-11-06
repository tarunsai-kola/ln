import { Helmet } from 'react-helmet-async';
import { useState, useMemo, useEffect } from "react";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
import axios from "axios";
import AlumniData from "../Components/alumniData";
import API from "../API";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ArrowRight, ArrowUpRight, 
  MapPin, ChevronRight, Zap
} from "lucide-react";

import alumniIndian from "../assets/alumni_indian.png";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };
const fastTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const filterCategories = [
  'All Pathways', 'Software Engineering', 'Data Analytics', 'Data Science', 
  'Digital Marketing', 'Cybersecurity', 'AI & Full Stack', 'Career Switchers', 'Freshers'
];

const Alumni = () => {
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Pathways');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [filteredResults, setFilteredResults] = useState(AlumniData);
  const [isFlipped, setIsFlipped] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setFilteredResults(
      AlumniData.filter((a) => {
        const matchesQuery = !searchQuery || 
          (a.name && a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (a.role && a.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (a.post && a.post.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (a.location && a.location.toLowerCase().includes(searchQuery.toLowerCase()));
        
        let matchesFilter = true;
        if (activeFilter === 'Freshers') {
          matchesFilter = a.pre === 'Fresher';
        } else if (activeFilter === 'Career Switchers') {
          matchesFilter = a.pre === 'Career Switcher';
        } else if (activeFilter !== 'All Pathways') {
          matchesFilter = a.domain === activeFilter;
        }

        return matchesQuery && matchesFilter;
      }).slice(0, 100)
    );
  }, [activeFilter, searchQuery]);

  const handleCardClick = (alumni) => {
    if (!alumni?.name) return;
    setIsFlipped(false);
    setSelectedAlumni(alumni);
  };

  const handleCloseDialog = () => {
    setSelectedAlumni(null);
    setIsFlipped(false);
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const errors = {};

    if (!data.email.includes("@")) errors.email = "Invalid email";
    if (data.contact?.length < 10) errors.contact = "Invalid phone number";
    if (!data.graduationYear || data.graduationYear < 1900)
      errors.graduationYear = "Invalid year";

    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    try {
      const response = await axios.post(`${API}/alumni-data`, {
        fullName: data.fullName,
        contact: data.contact,
        email: data.email,
        graduationYear: Number(data.graduationYear),
        currentCompany: data.currentCompany,
        yearsOfExperience: Number(data.yearsOfExperience),
        advancedDomains: data.advancedDomains
          ? Array.isArray(data.advancedDomains)
            ? data.advancedDomains
            : [data.advancedDomains]
          : [],
      });

      if (!response.data.success) {
        setFormErrors({ general: response.data.message });
        return;
      }
      handleCloseDialog();
      alert("Form submitted successfully!");
    } catch (error) {
      setFormErrors({ general: "Failed to submit form. Please try again." });
    }
  };

  return (
    <div className="bg-[#030303] min-h-screen font-sans text-white selection:bg-[#F15B29]/30 selection:text-white overflow-hidden relative">
      {/* Global Ambient Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle,_rgba(241,91,41,0.06)_0%,_transparent_60%)] pointer-events-none mix-blend-screen z-0 blur-3xl"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none mix-blend-screen z-0 blur-3xl"></div>

      <Helmet>
          <title>Accenlearn Outcomes | Elite Career Transitions</title>
          <meta name="description" content="The ecosystem for engineering meaningful career transitions. View the outcome ledger and success dossiers."/>
      </Helmet>
      
      {/* 1. HERO: THE TRANSITION THESIS (Cinematic, Glassmorphic) */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 px-6 lg:px-12 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-20 z-10">
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex-1 max-w-3xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/50 mb-10">
            <div className="w-1.5 h-1.5 bg-[#F15B29] rounded-full shadow-[0_0_8px_#F15B29]"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">The Transition Thesis</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[88px] font-medium tracking-tighter leading-[1.05] mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">Where ambition</span> <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">meets architecture.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 leading-relaxed font-light max-w-xl mb-12">
            This is not a course catalog. It is an ecosystem engineered for meaningful career transitions. We provide the forensic guidance, rigorous portfolios, and pipeline intelligence required to shift your professional trajectory.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => setShowApplyPopup(true)}
              className="relative overflow-hidden px-8 py-4 bg-white text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
              Initiate Strategy Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => { document.getElementById('ledger').scrollIntoView({ behavior: 'smooth' }) }}
              className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-semibold text-sm rounded-xl hover:bg-white/10 hover:border-white/20 transition-all shadow-lg"
            >
              Examine the Evidence
            </button>
          </motion.div>
        </motion.div>

        {/* Forensic Artifact in Hero (Dynamic Glass Card) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateX: 10, rotateY: -10 }} 
          animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }} 
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full lg:w-[480px] shrink-0 relative perspective-1000"
        >
          {/* Back glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F15B29]/30 to-transparent blur-3xl -z-10 rounded-full animate-pulse opacity-50"></div>
          
          <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden group hover:border-white/40 transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="absolute top-0 right-0 p-6 flex items-center gap-2">
              <Zap className="w-3 h-3 text-[#F15B29]" />
              <span className="text-[9px] text-white/50 tracking-[0.2em] uppercase font-mono">AX-8492</span>
            </div>
            
            <div className="text-[10px] text-white/50 tracking-[0.2em] uppercase mb-8">Verified Pivot</div>
            
            <div className="flex flex-col gap-6 relative z-10">
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">Origin State</div>
                <div className="text-xl text-white/70 font-light">Retail Management</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shadow-inner">
                  <ArrowRight className="w-3 h-3 text-white/50" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-white/20 to-transparent"></div>
              </div>
              
              <div>
                <div className="text-[10px] text-[#F15B29] uppercase tracking-[0.2em] mb-2 drop-shadow-[0_0_8px_rgba(241,91,41,0.5)]">Domain</div>
                <div className="text-3xl text-white font-medium tracking-tight mb-4">Data Scientist</div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-black/40 border border-white/10 px-3 py-1.5 rounded-full text-white/70 shadow-inner">FinTech Sector</span>
                  <span className="text-xs text-white border border-[#F15B29]/50 px-3 py-1.5 rounded-full bg-[#F15B29]/20 shadow-[0_0_15px_rgba(241,91,41,0.2)]">+120% Comp</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. PROOF ARCHITECTURE: THE OUTCOME LEDGER (Gleaming Grid) */}
      <section id="ledger" className="relative z-10 border-y border-white/10 bg-black/40 backdrop-blur-md">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none mix-blend-overlay"></div>
        
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold flex items-center gap-4">
              <span className="w-8 h-px bg-white/20"></span>
              The Outcome Ledger
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { label: "Verified Transitions", value: "45%", desc: "Learners moving entirely outside their previous industry." },
              { label: "Salary Progression", value: "140%", desc: "Average compensation growth for career switchers.", highlight: true },
              { label: "Active Network", value: "5,000+", desc: "Alumni integrated into global tech ecosystems." },
              { label: "Hiring Partners", value: "300+", desc: "Organizations that have onboarded Accenlearn talent." },
            ].map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} 
                className={`relative p-8 rounded-3xl border ${stat.highlight ? 'bg-gradient-to-b from-[#F15B29]/10 to-transparent border-[#F15B29]/30 shadow-[0_0_30px_rgba(241,91,41,0.05)]' : 'bg-white/5 border-white/10'} backdrop-blur-sm group hover:-translate-y-1 transition-transform duration-500`}
              >
                {stat.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#F15B29] to-transparent opacity-50"></div>}
                
                <div className={`text-5xl lg:text-6xl font-light tracking-tighter mb-6 bg-clip-text text-transparent ${stat.highlight ? 'bg-gradient-to-b from-white to-[#F15B29]/80' : 'bg-gradient-to-b from-white to-white/50'}`}>
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold mb-3">{stat.label}</div>
                <div className="text-sm text-white/40 font-light leading-relaxed">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SUCCESS DOSSIERS: THE LIVING ARCHIVE (Rich Glass Cards) */}
      <section className="py-32 px-6 lg:px-12 max-w-[1600px] mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-white/20"></span>
              The Living Archive
            </h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white/90">Forensic proof of trajectory.</h3>
          </div>
          
          <div className="flex flex-col gap-5 w-full md:w-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-xl blur group-focus-within:bg-white/10 transition-colors"></div>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 z-10" />
              <input 
                type="text" 
                placeholder="Query archive by role, industry..." 
                className="relative w-full md:w-[360px] bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {filterCategories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveFilter(cat)}
                  className={`whitespace-nowrap px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] font-semibold rounded-full border transition-all ${
                    activeFilter === cat 
                    ? 'border-white/40 text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                    : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredResults.map((alumni, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={fastTransition}
                onClick={() => handleCardClick(alumni)}
                className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col justify-between cursor-pointer hover:bg-white/[0.08] hover:border-white/30 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.05)] transition-all duration-500 min-h-[300px] overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div>
                    <h4 className="text-xl font-medium text-white mb-2">{alumni.name}</h4>
                    <p className="text-[10px] text-white/40 font-mono uppercase flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {alumni.location || "Global"}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-3 h-3 text-white/50 group-hover:text-black" />
                  </div>
                </div>
                
                <div className="space-y-5 relative z-10">
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Origin</div>
                    <div className="text-sm text-white/70 font-light truncate">{alumni.pre}</div>
                  </div>
                  
                  <div className="relative pl-4 border-l-2 border-[#F15B29]/50">
                    <div className="flex justify-between items-end mb-1">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-[#F15B29] drop-shadow-[0_0_5px_rgba(241,91,41,0.5)]">Domain</div>
                      {alumni.package && <div className="text-[9px] uppercase tracking-widest text-white/80 font-mono bg-white/10 px-2 py-0.5 rounded-sm">{alumni.package}</div>}
                    </div>
                    <div className="text-lg text-white font-medium">{alumni.postRole || alumni.post}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. FEATURED NARRATIVES: DEEP DIVES (Cinematic Imagery) */}
      <section className="py-32 px-6 lg:px-12 max-w-[1600px] mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-white/20"></span>
            Deep Dives
          </h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white/90">Anatomy of a pivot.</h3>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 rounded-3xl overflow-hidden group relative min-h-[500px]">
            {/* Parallax-style image */}
            <img src={alumniIndian} alt="Case Study" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-80 transition-all duration-[2s] ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            
            {/* Floating Glass Panel */}
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 max-w-2xl bg-black/40 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
              <div className="inline-block bg-[#F15B29]/20 border border-[#F15B29]/50 text-[#F15B29] text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6">Flagship Analysis</div>
              <h4 className="text-2xl md:text-4xl font-light leading-tight text-white mb-8">
                Engineering the technical depth required to pivot into advanced analytics at a Tier-1 firm.
              </h4>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/20 pt-6">
                <div className="flex gap-8">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Subject</div>
                    <div className="text-sm text-white font-medium">Priya Patel</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Intervention</div>
                    <div className="text-sm text-white font-medium">Architecture</div>
                  </div>
                </div>
                <button className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-white flex items-center gap-2 transition-colors bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">
                  Read Report <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col justify-between group cursor-pointer hover:border-white/30 hover:bg-white/10 transition-all duration-500 shadow-lg">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2"><span className="w-4 h-px bg-white/40"></span> Study 02</div>
                <h5 className="text-xl font-light text-white/90 leading-relaxed mb-4 group-hover:text-white">From zero frontend knowledge to a production-grade full-stack portfolio.</h5>
              </div>
              <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-[#F15B29] transition-colors font-semibold">
                <span>Rahul Sharma</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F15B29]/10">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col justify-between group cursor-pointer hover:border-white/30 hover:bg-white/10 transition-all duration-500 shadow-lg">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2"><span className="w-4 h-px bg-white/40"></span> Study 03</div>
                <h5 className="text-xl font-light text-white/90 leading-relaxed mb-4 group-hover:text-white">Mapping marketing intuition into structured product management.</h5>
              </div>
              <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-[#F15B29] transition-colors font-semibold">
                <span>Ananya Gupta</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F15B29]/10">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAREER OS: OPERATING MODEL (Glowing Spotlight Grid) */}
      <section className="py-32 relative z-10 border-y border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-white/20"></span>
              The Operating Model
              <span className="w-8 h-px bg-white/20"></span>
            </h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white/90 leading-tight">
              A coordinated machinery behind every outcome.
            </h3>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Mentor-Led Architecture", desc: "Direct 1-on-1 guidance from active senior engineers shaping current industry standards, not academic theorists." },
              { num: "02", title: "Production Portfolios", desc: "Code and architecture reviews designed to enforce scalability, clean code, and deployment readiness." },
              { num: "03", title: "Mock Interview Loops", desc: "Simulated technical and behavioral gauntlets orchestrated to build unshakeable confidence under pressure." },
              { num: "04", title: "Profile Optimization", desc: "Strategic parsing of your past experience to bypass automated screening and capture recruiter intent." },
              { num: "05", title: "Pipeline Guidance", desc: "End-to-end tactical support for navigating the recruitment processes of tier-1 and high-growth organizations." },
              { num: "06", title: "Network Intelligence", desc: "Internal visibility and referral opportunities leveraged through our extensive, active alumni ecosystem." },
            ].map((pillar, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden">
                {/* Spotlight hover effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <div className="text-6xl font-light text-white/5 group-hover:text-white/10 transition-colors absolute top-4 right-4">{pillar.num}</div>
                <h4 className="text-xl font-medium text-white mb-4 relative z-10 pt-10">{pillar.title}</h4>
                <p className="text-sm text-white/50 font-light leading-relaxed relative z-10">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. CONVERSION: THE INEVITABLE NEXT STEP (Glowing Finale) */}
      <section className="py-40 lg:py-56 px-6 lg:px-12 flex flex-col items-center justify-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F15B29]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 text-center max-w-2xl">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold mb-8">Initialization</h2>
          <h3 className="text-6xl md:text-[80px] font-medium tracking-tighter text-white mb-8">
            Define your <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F15B29]">trajectory.</span>
          </h3>
          <p className="text-lg text-white/50 font-light mb-12 max-w-xl mx-auto">
            You have reviewed the evidence. The next step is a concrete analysis of your baseline and the architecture required for your transition.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => setShowApplyPopup(true)}
              className="px-10 py-5 bg-white text-black font-semibold text-sm rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex justify-center items-center gap-3"
            >
              Book Strategy Session <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-md text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors"
            >
              Review Pathways
            </button>
          </div>
        </motion.div>
      </section>

      {/* Apply Popup */}
      {showApplyPopup && <AdvancedApplyPopup onClose={() => setShowApplyPopup(false)} />}
      
      {/* DOSSIER MODAL (Premium Glass) */}
      <AnimatePresence>
        {selectedAlumni && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={fastTransition}
              className="relative w-full max-w-2xl bg-black/50 border border-white/20 p-8 md:p-12 max-h-[90vh] overflow-y-auto scrollbar-hide shadow-[0_0_60px_rgba(0,0,0,0.8)] rounded-3xl"
            >
              <button
                onClick={handleCloseDialog}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/50 hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>
              
              {!isFlipped ? (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-8 font-mono">Dossier / {selectedAlumni.name.split(' ')[0]}</div>
                  
                  <div className="mb-10 pb-10 border-b border-white/10">
                    <h2 className="text-4xl font-light text-white mb-3 tracking-tight">{selectedAlumni.name}</h2>
                    <p className="text-sm font-medium text-[#F15B29] uppercase tracking-widest">
                      {selectedAlumni.role} <span className="text-white/20 mx-2">/</span> <span className="text-white/50">{selectedAlumni.post}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">Location</div>
                      <div className="text-sm font-light text-white">{selectedAlumni.location || "Global"}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">Context</div>
                      <div className="text-sm font-light text-white">{selectedAlumni.experience || "Professional Standard"}</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-8 rounded-3xl mb-12 shadow-inner">
                    <div className="mb-8">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">Origin State</p>
                      <p className="font-medium text-xl text-white/90">{selectedAlumni.pre}</p>
                      <p className="text-xs text-white/40 font-light mt-1">{selectedAlumni.preRole}</p>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-white/20 to-transparent mb-8 w-full"></div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#F15B29]">Domain</p>
                        {selectedAlumni.package && <p className="text-[9px] uppercase tracking-[0.2em] text-white font-mono bg-white/10 px-2 py-1 rounded-sm border border-white/20">Comp: {selectedAlumni.package}</p>}
                      </div>
                      <p className="font-medium text-2xl text-white">{selectedAlumni.postRole || selectedAlumni.post}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFlipped(true)}
                    className="w-full bg-white text-black font-semibold text-sm py-4 rounded-xl hover:bg-white/90 transition-all hover:scale-[1.02] flex justify-center items-center gap-2"
                  >
                    Architect Similar Transition
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-8 font-mono">Initialization</div>
                  
                  <h2 className="text-3xl font-light text-white mb-2 tracking-tight">
                    Submit baseline parameters.
                  </h2>
                  <p className="text-white/50 font-light mb-10 text-sm">Provide context to orchestrate your transition architecture.</p>
                  
                  {formErrors.general && (
                    <div className="border border-red-500/30 bg-red-500/10 text-red-400 p-4 rounded-xl text-xs uppercase tracking-widest font-semibold mb-8">
                      {formErrors.general}
                    </div>
                  )}
                  
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="Full name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 focus:bg-white/10 transition-all" />
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <input type="tel" name="contact" placeholder="Contact number" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 focus:bg-white/10 transition-all" />
                        {formErrors.contact && <p className="text-red-400 text-[10px] mt-2 uppercase tracking-widest">{formErrors.contact}</p>}
                      </div>
                      <div>
                        <input type="email" name="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 focus:bg-white/10 transition-all" />
                        {formErrors.email && <p className="text-red-400 text-[10px] mt-2 uppercase tracking-widest">{formErrors.email}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <input type="number" name="graduationYear" placeholder="Grad Year" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 focus:bg-white/10 transition-all" />
                      <input type="number" name="yearsOfExperience" placeholder="Years of Exp." required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 focus:bg-white/10 transition-all" />
                    </div>
                    
                    <input type="text" name="currentCompany" placeholder="Current company (or None)" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 focus:bg-white/10 transition-all" />
                    
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-6">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 mb-4">Target Pathway</p>
                      <div className="grid grid-cols-2 gap-4">
                        {["Data Science & AI", "Software Engineering", "Product Management", "Marketing & Growth"].map(domain => (
                          <label key={domain} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="advancedDomains" value={domain} className="w-4 h-4 text-white border-white/30 rounded focus:ring-white/50 bg-transparent accent-white" />
                            <span className="text-xs font-light text-white/70 group-hover:text-white transition-colors">{domain}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setIsFlipped(false)} className="px-6 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold text-white/50 hover:bg-white/10 hover:text-white transition-all">Return</button>
                      <button type="submit" className="flex-1 bg-white text-black rounded-xl font-semibold hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">Submit Request</button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alumni;
