import React, { useState, useMemo, useEffect } from "react";
import {
  FaFileAlt,
  FaSearch,
  FaCheckCircle,
  FaDownload,
  FaEye,
  FaEdit,
  FaChartLine,
  FaFilter,
  FaSortAmountDown,
  FaCalendarAlt,
  FaShieldAlt,
  FaMagic,
  FaColumns,
  FaFileWord,
  FaFilePdf,
  FaArrowRight,
  FaRegLightbulb,
  FaArrowLeft,
  FaRedo,
  FaUser,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaLayerGroup,
  FaCertificate,
  FaEllipsisV,
  FaBars,
  FaTimes,
  FaPrint
} from "react-icons/fa";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { calculateAtsScore } from "./components/AtsResumeScore";
import TemplateCard from "./components/TemplateCard";
import TemplatePreviewModal from "./components/TemplatePreviewModal";
import TestimonialsAndFaq from "./components/TestimonialsAndFaq";
import {
  RESUME_CATEGORIES,
  SORT_OPTIONS,
  RESUME_TEMPLATES_LIST
} from "./data/templatesData";

const sampleHighScoringData = {
  name: "Arjun Kumar",
  targetRole: "Full Stack Software Engineer",
  email: "arjun.kumar@accenlearn.com",
  phone: "+91 98765 43210",
  linkedin: "linkedin.com/in/arjunkumar-tech",
  github: "github.com/arjunkumar",
  location: "Bangalore, India",
  summary: "Results-driven Software Engineering student with strong foundation in full-stack web development (React, Node.js, MongoDB) and cloud architectures. Proven track record of engineering scalable web applications handling 10,000+ monthly interactions and reducing query response times by 30%. Eager to leverage strong analytical and algorithmic problem-solving skills in a dynamic tech environment.",
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL", "HTML5/CSS3"],
    frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Redux Toolkit"],
    tools: ["Git & GitHub", "Docker", "AWS (EC2, S3)", "MongoDB", "PostgreSQL", "Linux", "CI/CD Actions"]
  },
  experience: [
    {
      company: "AccenLearn Technologies",
      role: "Software Engineering Intern",
      startDate: "May 2026",
      endDate: "July 2026",
      location: "Bangalore, India",
      bullets: [
        "Engineered high-performance React frontend modules and Node.js REST APIs, increasing user session duration by 28% across 5,000+ daily active users.",
        "Optimized MongoDB aggregation pipelines and database indexing, reducing average backend latency from 450ms to 180ms.",
        "Collaborated with cross-functional design and backend teams to integrate automated testing workflows with 92% code coverage."
      ]
    }
  ],
  projects: [
    {
      title: "AI Technical Interview Analyzer",
      techStack: "Python, FastAPI, React, OpenAI API, Docker",
      link: "github.com/arjunkumar/ai-analyzer",
      bullets: [
        "Architected a real-time speech and coding interview assessment engine utilizing Python and LLM prompt engineering with 94% evaluation accuracy.",
        "Implemented automated resume parsing and keyword density evaluation routines handling 2,000+ concurrent student evaluations daily.",
        "Containerized full-stack microservices using Docker and deployed cloud infrastructure on AWS EC2 with automated CI/CD pipelines."
      ]
    },
    {
      title: "Cloud E-Commerce Platform",
      techStack: "MERN Stack (MongoDB, Express, React, Node), Stripe, Redis",
      link: "github.com/arjunkumar/cloud-shop",
      bullets: [
        "Built a secure e-commerce application supporting 10,000+ monthly transactions with JWT authentication and Role-Based Access Control.",
        "Optimized product search filters and database indexing using Redis caching, accelerating query speeds by 40%."
      ]
    }
  ],
  education: [
    {
      institution: "Vellore Institute of Technology",
      degree: "B.Tech in Computer Science and Engineering",
      year: "2023 – 2027"
    }
  ],
  certifications: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2025"
    },
    {
      title: "Full Stack Web Development Certification",
      issuer: "AccenLearn IT Training",
      date: "2025"
    }
  ]
};

const emptyResumeData = {
  name: "",
  targetRole: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  location: "",
  summary: "",
  skills: { languages: [], frameworks: [], tools: [] },
  experience: [],
  projects: [],
  education: [],
  certifications: []
};

// Skeleton Loader Component for Template Grid (Requirement 12)
const TemplateCardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5 flex flex-col h-[520px] animate-pulse justify-between">
    <div className="h-[260px] bg-gray-100 rounded-2xl w-full mb-4" />
    <div className="space-y-3 flex-1">
      <div className="flex gap-2">
        <div className="h-5 bg-gray-200 rounded-md w-20" />
        <div className="h-5 bg-gray-200 rounded-md w-16" />
      </div>
      <div className="h-6 bg-gray-200 rounded-lg w-4/5" />
      <div className="h-4 bg-gray-100 rounded-md w-2/3" />
      <div className="h-4 bg-gray-100 rounded-md w-full" />
      <div className="h-4 bg-gray-100 rounded-md w-5/6" />
    </div>
    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
      <div className="h-10 bg-gray-200 rounded-xl w-full" />
      <div className="h-10 bg-gray-300 rounded-xl w-full" />
    </div>
  </div>
);

const ResumeTemplates = () => {
  // Main View Mode: "gallery" (Explore 12 ATS Templates & Resources) | "builder" (Interactive Form & Live Editor)
  const [activeTab, setActiveTab] = useState("gallery");

  // Gallery Filters & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [isLoading, setIsLoading] = useState(false);

  // Modal Preview States
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [activePreviewTemplate, setActivePreviewTemplate] = useState(null);

  // Interactive Builder States
  const [builderView, setBuilderView] = useState("both"); // "edit" | "preview" | "both"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordionStep, setActiveAccordionStep] = useState(1);
  const [lastSavedTime, setLastSavedTime] = useState("Just now");
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem("accenlearn_builder_resume_data");
      return saved ? JSON.parse(saved) : sampleHighScoringData;
    } catch (e) {
      return sampleHighScoringData;
    }
  });
  const [selectedBuilderTemplate, setSelectedBuilderTemplate] = useState("modern");

  // Auto-Save Effect
  useEffect(() => {
    try {
      localStorage.setItem("accenlearn_builder_resume_data", JSON.stringify(resumeData));
      const now = new Date();
      setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {}
  }, [resumeData]);

  // Print Handler for Interactive Builder
  const handlePrint = () => {
    window.print();
  };

  // Simulate subtle loading state when user switches filter or sort (Requirement 12)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy]);

  // Filter & Sort Logic
  const filteredAndSortedTemplates = useMemo(() => {
    return RESUME_TEMPLATES_LIST.filter((tpl) => {
      const matchesSearch =
        tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.suitableFor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tpl.category.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === "popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.downloads - a.downloads;
      if (sortBy === "downloads") return b.downloads - a.downloads;
      if (sortBy === "recommended") return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0);
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  // Preview Modal Handlers
  const openPreviewModal = (template) => {
    setActivePreviewTemplate(template);
    setPreviewModalOpen(true);
  };

  const handleNextPreview = () => {
    if (!activePreviewTemplate) return;
    const currentIndex = RESUME_TEMPLATES_LIST.findIndex((t) => t.id === activePreviewTemplate.id);
    const nextIndex = (currentIndex + 1) % RESUME_TEMPLATES_LIST.length;
    setActivePreviewTemplate(RESUME_TEMPLATES_LIST[nextIndex]);
  };

  const handlePrevPreview = () => {
    if (!activePreviewTemplate) return;
    const currentIndex = RESUME_TEMPLATES_LIST.findIndex((t) => t.id === activePreviewTemplate.id);
    const prevIndex = (currentIndex - 1 + RESUME_TEMPLATES_LIST.length) % RESUME_TEMPLATES_LIST.length;
    setActivePreviewTemplate(RESUME_TEMPLATES_LIST[prevIndex]);
  };

  const handleCustomizeFromGallery = (template) => {
    if (template?.builderTemplateId) {
      setSelectedBuilderTemplate(template.builderTemplateId);
    }
    setActiveTab("builder");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className={`pt-2 sm:pt-4 pb-24 px-4 sm:px-6 lg:px-8 ${activeTab === "builder" ? "max-w-[1680px]" : "max-w-[1360px]"} mx-auto relative z-20 bg-gradient-to-b from-gray-50/40 via-white to-gray-50/60 transition-all duration-300`}>
      {/* Print-to-PDF Print Optimization Style Block */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0 !important;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: 100% !important;
          }
          body * {
            visibility: hidden !important;
          }
          #printable-resume-area, #printable-resume-area * {
            visibility: visible !important;
          }
          #printable-resume-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            min-height: 297mm !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 12mm 15mm !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
        }
      `}</style>

      {/* =========================================================================
          MODE 1: GALLERY & CAREER RESOURCE HUB
         ========================================================================= */}
      {activeTab === "gallery" && (
        <div className="space-y-16 sm:space-y-20 animate-in fade-in duration-300">
          
          {/* =========================================================================
              1. COMPACT PAGE INTRODUCTION (Minimal, Elegant & Generous Spacing)
             ========================================================================= */}
          <div className="pt-6 pb-2 text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Free ATS-Friendly Resume Templates
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
              Browse professionally designed ATS-friendly resume templates for students, freshers, and professionals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-xs border border-emerald-200/80 shadow-2xs">
                <FaShieldAlt className="text-emerald-600" /> ATS Friendly
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 font-extrabold text-xs border border-blue-200/80 shadow-2xs">
                <FaCheckCircle className="text-blue-600" /> 100% Free
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-800 font-extrabold text-xs border border-purple-200/80 shadow-2xs">
                <FaCalendarAlt className="text-purple-600" /> Updated Regularly
              </span>
            </div>
          </div>

          {/* =========================================================================
              2. ENHANCED STICKY SEARCH & FILTER BAR (Requirement 2)
             ========================================================================= */}
          <div
            id="templates-grid-section"
            className="sticky top-20 z-30 bg-white/90 backdrop-blur-xl shadow-lg border border-gray-200/90 rounded-3xl p-5 sm:p-7 transition-all duration-300 space-y-5"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              
              {/* Better Search Box with Focus Glow & Clear Button */}
              <div className="relative w-full lg:w-[420px]">
                <FaSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search role (e.g. Software Engineer, Marketing, Finance)..."
                  className="w-full pl-12 pr-14 py-3.5 bg-gray-50 focus:bg-white text-sm font-semibold text-gray-900 placeholder-gray-400 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all outline-hidden"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold text-gray-500 hover:text-gray-800 bg-gray-200/80 hover:bg-gray-300 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Segmented Buttons for Sorting Controls (Requirement 2) */}
              <div className="flex items-center gap-2.5 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 shrink-0">
                <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <FaSortAmountDown className="text-primary text-sm" /> Sort By:
                </span>
                <div className="flex items-center gap-1.5 bg-gray-100/90 p-1.5 rounded-2xl border border-gray-200/60">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSortBy(opt.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        sortBy === opt.id
                          ? "bg-white text-primary shadow-sm font-black scale-105"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Chips (Horizontally scrollable with active shadow & distinct styling) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
              <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
                <FaFilter className="text-xs text-primary" /> Category:
              </span>
              {RESUME_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-primary to-[#28838d] text-white shadow-md scale-105"
                        : "bg-gray-50 hover:bg-gray-100/90 text-gray-700 border border-gray-200/80 hover:border-gray-300 hover:scale-102"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              3. RESUME TEMPLATES GRID WITH SKELETON & EMPTY STATE (Req 3-6, 12, 13)
             ========================================================================= */}
          <div>
            <div className="flex items-center justify-between mb-8 px-1">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  <span>{selectedCategory === "All" ? "All ATS Resume Templates" : `${selectedCategory} Templates`}</span>
                  <span className="text-xs font-extrabold text-primary bg-primary/10 px-3.5 py-1 rounded-full font-mono border border-primary/20">
                    {filteredAndSortedTemplates.length} Available
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  Click <strong className="text-gray-700">Live Preview</strong> to zoom and download directly, or <strong className="text-primary">Customize Resume</strong> to open the interactive builder.
                </p>
              </div>

              {searchQuery && (
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-500 block">
                    Filtering by: <strong className="text-primary">&quot;{searchQuery}&quot;</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>

            {/* Loading Skeletons vs Empty State vs Card Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
                {[1, 2, 3, 4].map((n) => (
                  <TemplateCardSkeleton key={n} />
                ))}
              </div>
            ) : filteredAndSortedTemplates.length === 0 ? (
              <div className="bg-white rounded-3xl p-14 text-center border border-gray-200/80 shadow-sm my-8 max-w-2xl mx-auto space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl shadow-inner border border-primary/20">
                  <FaSearch />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">No matching templates found</h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    We couldn&apos;t find any ATS templates matching your exact criteria (<strong className="text-gray-800">&quot;{searchQuery}&quot;</strong> in category <strong className="text-gray-800">&quot;{selectedCategory}&quot;</strong>).
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/70 text-left text-xs text-gray-600 space-y-1.5 max-w-md mx-auto font-medium">
                  <span className="font-bold text-gray-800 block mb-1">Suggestions to find a template:</span>
                  <p>• Check for spelling errors or try broader keywords (e.g., &quot;Analyst&quot;, &quot;Fresher&quot;).</p>
                  <p>• Select the <strong className="text-primary">All</strong> category chip to browse the entire library.</p>
                  <p>• Switch to our interactive builder where you can customize headings directly.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-8 py-3.5 bg-primary text-white font-extrabold text-sm rounded-2xl shadow-lg hover:bg-primary-dark transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <FaFilter /> Reset All Filters & Browse 12 Templates
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
                {filteredAndSortedTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onPreview={openPreviewModal}
                    onCustomize={handleCustomizeFromGallery}
                    onQuickDownload={(tpl, fmt) => {
                      openPreviewModal(tpl);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* =========================================================================
              4. FAQ ACCORDION SECTION
             ========================================================================= */}
          <TestimonialsAndFaq />

        </div>
      )}

      {/* =========================================================================
          MODE 2: INTERACTIVE FORM BUILDER & LIVE ATS EVALUATION
         ========================================================================= */}
      {activeTab === "builder" && (
        <div className="space-y-6 print:space-y-0 animate-in fade-in duration-300 pt-3">
          
          {/* =========================================================================
              STICKY TOP BUILDER TOOLBAR (Sleek, Premium, Canva/Notion-inspired)
             ========================================================================= */}
          <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-xl p-3.5 sm:p-5 rounded-3xl border border-gray-200/90 shadow-xl print:hidden transition-all duration-200 space-y-3 sm:space-y-4">
            
            {/* Top Row: Navigation, Template Indicator, Auto-Save & Action Controls */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 sm:gap-4">
              
              {/* Left Group: Back Button & Template Name Indicator (Hidden on small mobile, accessible via More menu if needed, or compact) */}
              <div className="flex items-center justify-between md:justify-start gap-2 sm:gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("gallery")}
                  className="min-h-[48px] sm:min-h-0 px-3.5 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:scale-102 active:scale-98 shrink-0"
                >
                  <FaArrowLeft className="text-gray-500" /> <span className="hidden sm:inline">Return to</span> Gallery
                </button>

                <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200/80 shrink-0">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <FaMagic className="text-primary" /> <span className="hidden lg:inline">Active:</span>
                  </span>
                  <span className="text-xs font-black text-gray-900 capitalize bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs text-primary truncate max-w-[120px] xl:max-w-none">
                    {selectedBuilderTemplate}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-emerald-200/70 shrink-0 min-h-[48px] sm:min-h-0 justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="truncate max-w-[130px] sm:max-w-none">Saved: {lastSavedTime}</span>
                </div>
              </div>

              {/* Right Group: Mode Switchers & Actions (Responsive for Mobile, Tablet, Desktop) */}
              <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-2.5 w-full md:w-auto relative">
                {/* Secondary Actions on Desktop/Tablet (`hidden md:flex`) */}
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Reload sample high-scoring resume data? This will overwrite your current fields.")) {
                      setResumeData(sampleHighScoringData);
                    }
                  }}
                  className="hidden md:flex px-3.5 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 rounded-xl text-xs font-extrabold transition-all items-center gap-1.5 cursor-pointer shadow-2xs hover:scale-102 shrink-0"
                  title="Reload sample resume data"
                >
                  <FaRedo className="text-[11px]" /> <span className="hidden xl:inline">Reload Sample</span> Data
                </button>

                {/* Form Editor / Split View / Live Preview Toggle Bar */}
                <div className="flex items-center bg-gray-100/90 p-1 rounded-2xl border border-gray-200/70 w-full md:w-auto justify-between sm:justify-start">
                  <button
                    type="button"
                    onClick={() => setBuilderView("edit")}
                    className={`flex-1 md:flex-initial min-h-[48px] sm:min-h-0 px-3 sm:px-4 py-2 sm:py-2 rounded-xl text-xs sm:text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      builderView === "edit"
                        ? "bg-primary text-white shadow-md scale-[1.02]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                  >
                    <FaEdit className="shrink-0" /> <span>Form</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuilderView("both")}
                    className={`hidden lg:flex px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all items-center justify-center gap-1.5 cursor-pointer ${
                      builderView === "both"
                        ? "bg-primary text-white shadow-md scale-[1.02]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                  >
                    <FaColumns /> Split View
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuilderView("preview")}
                    className={`flex-1 md:flex-initial min-h-[48px] sm:min-h-0 px-3 sm:px-4 py-2 sm:py-2 rounded-xl text-xs sm:text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      builderView === "preview"
                        ? "bg-primary text-white shadow-md scale-[1.02]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                  >
                    <FaEye className="shrink-0" /> <span>Preview</span>
                  </button>
                </div>

                {/* Mobile Overflow Menu Button (`☰ More` for < md breakpoint) */}
                <div className="md:hidden relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="min-h-[48px] px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold rounded-xl text-xs flex items-center gap-1.5 border border-gray-200 shadow-2xs"
                  >
                    <FaBars /> More
                  </button>

                  {mobileMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200/90 py-2.5 px-2 text-gray-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                      <div className="px-3 py-1 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                        Secondary Actions
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (window.confirm("Reload sample high-scoring resume data?")) {
                            setResumeData(sampleHighScoringData);
                          }
                        }}
                        className="w-full min-h-[48px] px-3 py-2 text-left rounded-xl hover:bg-gray-100 text-xs font-bold flex items-center gap-2.5 text-secondary"
                      >
                        <FaRedo /> Reload Sample Data
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handlePrint();
                        }}
                        className="w-full min-h-[48px] px-3 py-2 text-left rounded-xl hover:bg-gray-100 text-xs font-bold flex items-center gap-2.5 text-gray-700"
                      >
                        <FaPrint /> Print / Export PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setBuilderView(builderView === "both" ? "edit" : "both");
                        }}
                        className="w-full min-h-[48px] px-3 py-2 text-left rounded-xl hover:bg-gray-100 text-xs font-bold flex items-center gap-2.5 text-gray-700"
                      >
                        <FaColumns /> {builderView === "both" ? "Form Only View" : "Show Split / Stacked View"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setActiveTab("gallery");
                        }}
                        className="w-full min-h-[48px] px-3 py-2 text-left rounded-xl hover:bg-gray-100 text-xs font-bold flex items-center gap-2.5 text-gray-700"
                      >
                        <FaArrowLeft /> Return to Gallery
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Row: 8-Step Progress Stepper Bar (Fully Responsive horizontal scroll with no wrapping) */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 flex-nowrap whitespace-nowrap scrollbar-none">
                {[
                  { id: 1, label: "1. Contact", icon: <FaUser /> },
                  { id: 2, label: "2. Summary", icon: <FaCode /> },
                  { id: 3, label: "3. Experience", icon: <FaBriefcase /> },
                  { id: 4, label: "4. Education", icon: <FaGraduationCap /> },
                  { id: 5, label: "5. Skills", icon: <FaLayerGroup /> },
                  { id: 6, label: "6. Projects", icon: <FaCode /> },
                  { id: 7, label: "7. Certifications", icon: <FaCertificate /> },
                  { id: 8, label: "8. Review & ATS", icon: <FaShieldAlt /> }
                ].map((step) => {
                  const isActive = activeAccordionStep === step.id;
                  const isCompleted = activeAccordionStep > step.id;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        setActiveAccordionStep(step.id);
                        if (builderView === "preview") setBuilderView("both");
                      }}
                      className={`min-h-[40px] sm:min-h-0 flex items-center gap-1.5 px-3 py-1.5 sm:py-1.5 rounded-xl text-xs sm:text-xs font-extrabold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 border ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-[#28838d] text-white border-primary shadow-md scale-105"
                          : isCompleted
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100"
                          : "bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <span className={`${isActive ? "text-white" : isCompleted ? "text-emerald-600" : "text-gray-400"}`}>
                        {step.icon}
                      </span>
                      <span>{step.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tablet Toggle Notice (`md:` to `< lg:`): Provide prominent [ Form ] [ Preview ] toggle when space doesn't permit side-by-side */}
          {builderView === "both" && (
            <div className="hidden md:flex lg:hidden bg-blue-50/80 border border-blue-200 text-blue-900 px-4 py-2.5 rounded-2xl items-center justify-between text-xs font-bold shadow-2xs">
              <span>Tablet View: Displaying Form & Preview stacked. Use the tabs above to toggle a single view.</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBuilderView("edit")}
                  className="px-3 py-1 bg-white text-primary rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer text-xs font-extrabold"
                >
                  Form Only
                </button>
                <button
                  type="button"
                  onClick={() => setBuilderView("preview")}
                  className="px-3 py-1 bg-white text-primary rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer text-xs font-extrabold"
                >
                  Preview Only
                </button>
              </div>
            </div>
          )}

          {/* Main Builder Grid Layout (45% Form / 55% Preview on Desktop >= 1024px, Single Column Stack on < 1024px) */}
          <div
            className={`grid grid-cols-1 ${
              builderView === "both" ? "lg:grid-cols-12" : "lg:grid-cols-1"
            } gap-6 sm:gap-8 items-start`}
          >
            {/* Form Area (45% in Split View = col-span-5 on lg:/xl:) */}
            <div
              className={`${
                builderView === "both" ? "lg:col-span-5" : "w-full"
              } transition-all print:hidden ${
                builderView === "preview" ? "hidden" : "block"
              }`}
            >
              <ResumeForm
                data={resumeData}
                onChange={setResumeData}
                onClear={() => setResumeData(emptyResumeData)}
                activeStep={activeAccordionStep}
                onStepChange={setActiveAccordionStep}
                onPrint={handlePrint}
              />
            </div>

            {/* Preview & Print Area (55% in Split View = col-span-7 on lg:/xl:) */}
            <div
              className={`${
                builderView === "both"
                  ? "lg:col-span-7 lg:sticky lg:top-40 lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto pr-1"
                  : "w-full"
              } transition-all ${
                builderView === "edit" ? "hidden print:block" : "block"
              }`}
            >
              <ResumePreview
                data={resumeData}
                template={selectedBuilderTemplate}
                onTemplateChange={setSelectedBuilderTemplate}
                onPrint={handlePrint}
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          LIVE PREVIEW MODAL (Opens when user clicks Preview on any Template Card)
         ========================================================================= */}
      <TemplatePreviewModal
        template={activePreviewTemplate}
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        onNext={handleNextPreview}
        onPrev={handlePrevPreview}
        onCustomize={handleCustomizeFromGallery}
        sampleData={sampleHighScoringData}
      />
    </div>
  );
};

export default ResumeTemplates;