import React, { useState, useEffect, useRef } from "react";
import {
  FaCheckCircle,
  FaSpinner,
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaUsers,
  FaCertificate,
  FaRocket,
  FaChevronDown,
  FaPlay,
  FaStar,
  FaCode,
  FaDatabase,
  FaBrain,
  FaCloud,
  FaShieldAlt,
  FaMobileAlt,
  FaChartBar,
  FaCogs,
  FaFileCode,
  FaRobot,
  FaNetworkWired,
  FaPalette,
  FaChartLine,
  FaMoneyBillWave,
  FaUserTie,
  FaHospital,
  FaHeartbeat,
  FaRegFileAlt,
  FaLaptopMedical,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaMicrochip,
  FaDraftingCompass,
  FaPaintBrush,
  FaWhatsapp
} from "react-icons/fa";
import { MdWork, MdVerified, MdTrendingUp, MdArrowForward } from "react-icons/md";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import brandLogo from "../assets/logo.png";

// ─── Custom IBM Logo Component ──────────────────────────────────────────────
const IbmLogo = ({ size = 18, style = {} }) => (
  <span
    style={{
      fontWeight: 900,
      fontSize: size,
      letterSpacing: "-1px",
      color: "#0F62FE", // IBM Blue
      fontFamily: "Arial Black, sans-serif",
      lineHeight: 1,
      ...style,
    }}
  >
    IBM
  </span>
);

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_IOTIP_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbw1pVEKfm88g3n7vjsFKsb7uCIWIveejTtDxEG98Cjemw33mxV28LZaa2UT1rk3iw-F/exec";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/LMPZLRQCj0CGO9TfLIuYLi";

// ─── Data Structures: All 24 Domains Across Tech, Management & Medical ────────
const DOMAINS = [
  // Tech / IT Programs (16)
  { icon: FaBrain, label: "Artificial Intelligence", category: "Tech", tag: "Hot", salary: "₹8.5 - 16 LPA", color: "#6366F1" },
  { icon: FaCode, label: "Data Structures & Algorithms (DSA)", category: "Tech", tag: "Core", salary: "₹8 - 15 LPA", color: "#EC4899" },
  { icon: FaLaptopCode, label: "Full Stack Development", category: "Tech", tag: "In Demand", salary: "₹7 - 14 LPA", color: "#06B6D4" },
  { icon: FaRobot, label: "Machine Learning", category: "Tech", tag: "Advanced", salary: "₹9 - 18 LPA", color: "#8B5CF6" },
  { icon: FaDatabase, label: "Data Science", category: "Tech", tag: "Trending", salary: "₹8 - 15 LPA", color: "#10B981" },
  { icon: FaCloud, label: "Cloud Computing", category: "Tech", tag: "High Growth", salary: "₹9 - 16 LPA", color: "#F59E0B" },
  { icon: FaShieldAlt, label: "Cyber Security", category: "Tech", tag: "High Demand", salary: "₹8 - 15 LPA", color: "#EF4444" },
  { icon: FaChartBar, label: "Data Analytics", category: "Tech", tag: "Analytics", salary: "₹6 - 12 LPA", color: "#3B82F6" },
  { icon: FaCogs, label: "DevOps", category: "Tech", tag: "Enterprise", salary: "₹8 - 16 LPA", color: "#14B8A6" },
  { icon: FaDatabase, label: "SQL", category: "Tech", tag: "Essential", salary: "₹5 - 10 LPA", color: "#64748B" },
  { icon: FaPalette, label: "UI/UX Design", category: "Tech", tag: "Design", salary: "₹6 - 12 LPA", color: "#D946EF" },
  { icon: FaMicrochip, label: "Embedded Systems", category: "Tech", tag: "Hardware", salary: "₹6 - 12 LPA", color: "#0EA5E9" },
  { icon: FaFileCode, label: "VLSI Design", category: "Tech", tag: "Semiconductor", salary: "₹7 - 14 LPA", color: "#8B5CF6" },
  { icon: FaMobileAlt, label: "Android App Development", category: "Tech", tag: "Mobile", salary: "₹6 - 12 LPA", color: "#22C55E" },
  { icon: FaNetworkWired, label: "IoT & Robotics", category: "Tech", tag: "Future Tech", salary: "₹7 - 15 LPA", color: "#F97316" },
  { icon: FaDraftingCompass, label: "AutoCAD", category: "Tech", tag: "Core CAD", salary: "₹5 - 9 LPA", color: "#EAB308" },

  // Management Programs (6)
  { icon: FaChartLine, label: "Digital Marketing", category: "Management", tag: "Growth", salary: "₹5 - 10 LPA", color: "#F97316" },
  { icon: FaUserTie, label: "Human Resource", category: "Management", tag: "Corporate", salary: "₹5 - 9 LPA", color: "#3B82F6" },
  { icon: FaMoneyBillWave, label: "Finance", category: "Management", tag: "Fintech", salary: "₹6 - 12 LPA", color: "#10B981" },
  { icon: FaChartBar, label: "Business Analytics", category: "Management", tag: "Strategy", salary: "₹7 - 14 LPA", color: "#6366F1" },
  { icon: MdTrendingUp, label: "Stock Market", category: "Management", tag: "Trading", salary: "₹6 - 15 LPA", color: "#E11D48" },
  { icon: FaPaintBrush, label: "Graphics Designing", category: "Management", tag: "Creative", salary: "₹4 - 8 LPA", color: "#A855F7" },

  // Medical Programs (2)
  { icon: FaHeartbeat, label: "Psychology", category: "Medical", tag: "Clinical", salary: "₹4 - 8 LPA", color: "#F43F5E" },
  { icon: FaHospital, label: "Medical Coding", category: "Medical", tag: "Healthcare", salary: "₹5 - 9 LPA", color: "#EC4899" },
];

const LMS_TABS = [
  { id: "resume", label: "AI Resume Checker", icon: FaRegFileAlt, desc: "Get real-time ATS scoring and personalized improvement suggestions to beat the bots.", color: "#6366F1" },
  { id: "code", label: "DSA Code Console", icon: FaCode, desc: "Practice coding questions in an integrated IDE with live test cases and syntax highlighting.", color: "#10B981" },
  { id: "interview", label: "Mock Interview AI", icon: FaUsers, desc: "Simulate real interviews with AI avatars and receive instant feedback on your answers and body language.", color: "#06B6D4" },
  { id: "projects", label: "Live Startup Projects", icon: FaRocket, desc: "Work on real-world repositories from Bengaluru startups. Earn verifiable project certificates.", color: "#F59E0B" },
];

const INDIAN_STATES_AND_UTS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Delhi (NCT)",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry"
];

const PREFERRED_LANGUAGES = [
  "English",
  "Hindi",
  "Hindi / English (Bilingual)",
  "Telugu",
  "Tamil",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Other"
];

// ─── Main Component ──────────────────────────────────────────────────────────
const IotipPage = () => {
  const [activeTab, setActiveTab] = useState(LMS_TABS[0].id);
  const [typedText, setTypedText] = useState("");
  const domainsText = ["Artificial Intelligence", "Full Stack", "Data Science", "Cloud Computing"];
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const formRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    whatsappNumber: "",
    collegeEmail: "",
    personalEmail: "",
    stateRegion: "",
    otherCountry: "",
    collegeName: "",
    branchOrStream: "",
    year: "",
    domain: "",
    domains: [],
    preferredLanguages: [],
    otherLanguage: "",
    preferredLanguage: "",
    acknowledged: false
  });
  const [status, setStatus] = useState("IDLE");
  const [submittedRefId, setSubmittedRefId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFormCategory, setSelectedFormCategory] = useState("All");

  const filteredPageDomains = selectedCategory === "All" 
    ? DOMAINS 
    : DOMAINS.filter(d => d.category === selectedCategory);

  const filteredFormDomains = selectedFormCategory === "All"
    ? DOMAINS
    : DOMAINS.filter(d => d.category === selectedFormCategory);

  // Typing Effect
  useEffect(() => {
    const currentString = domainsText[textIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && typedText === currentString) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % domainsText.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentString.substring(0, typedText.length - 1)
          : currentString.substring(0, typedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex]);

  // Auto-scroll LMS Tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((currentTabId) => {
        const currentIndex = LMS_TABS.findIndex(t => t.id === currentTabId);
        const nextIndex = (currentIndex + 1) % LMS_TABS.length;
        return LMS_TABS[nextIndex].id;
      });
    }, 4000); // Cycles every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Form Handlers
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  // Single domain selection only
  const handleDomainToggle = (domain) => {
    setFormData((prev) => ({
      ...prev,
      domain: prev.domain === domain ? "" : domain,
      domains: prev.domain === domain ? [] : [domain]
    }));
  };

  // Multiple language selection toggle
  const handleLanguageToggle = (lang) => {
    setFormData((prev) => {
      const isAlready = prev.preferredLanguages.includes(lang);
      const nextLangs = isAlready
        ? prev.preferredLanguages.filter((l) => l !== lang)
        : [...prev.preferredLanguages, lang];
      return {
        ...prev,
        preferredLanguages: nextLangs,
        preferredLanguage: nextLangs.join(", ")
      };
    });
  };

  // Form Progress Calculation
  const calculateProgress = () => {
    let fieldsFilled = 0;
    const totalFields = 11;
    if (formData.fullName.trim()) fieldsFilled++;
    if (formData.phoneNumber.trim()) fieldsFilled++;
    if (formData.whatsappNumber.trim()) fieldsFilled++;
    if (formData.collegeEmail.trim()) fieldsFilled++;
    if (formData.personalEmail.trim()) fieldsFilled++;
    if (formData.stateRegion.trim()) fieldsFilled++;
    if (formData.collegeName.trim()) fieldsFilled++;
    if (formData.branchOrStream.trim()) fieldsFilled++;
    if ((formData.year || "").trim()) fieldsFilled++;
    if (formData.domain.trim() || (formData.domains || []).length > 0) fieldsFilled++;
    if ((formData.preferredLanguages || []).length > 0 || (formData.preferredLanguage || "").trim()) fieldsFilled++;
    return Math.round((fieldsFilled / totalFields) * 100);
  };

  const nextStep = () => {
    if (formStep === 1) {
      if (!formData.fullName.trim()) {
        alert("Please enter your Full Name.");
        return;
      }
      if (!formData.phoneNumber.trim()) {
        alert("Please enter your Phone Number.");
        return;
      }
      if (!formData.whatsappNumber.trim()) {
        alert("Please enter your WhatsApp Number.");
        return;
      }
      if (!formData.collegeEmail.trim()) {
        alert("Please enter your College Email.");
        return;
      }
      if (!formData.personalEmail.trim()) {
        alert("Please enter your Personal Email.");
        return;
      }
    } else if (formStep === 2) {
      if (!formData.stateRegion.trim()) {
        alert("Please select your State / Region.");
        return;
      }
      if (formData.stateRegion === "Other Country" && !(formData.otherCountry || "").trim()) {
        alert("Please enter your Country / Region.");
        return;
      }
      if (!formData.collegeName.trim()) {
        alert("Please enter your College Name.");
        return;
      }
      if (!formData.branchOrStream.trim()) {
        alert("Please enter your Branch or Stream.");
        return;
      }
      if (!(formData.year || "").trim()) {
        alert("Please select your Year of Passing / Study.");
        return;
      }
      const langs = [
        ...(formData.preferredLanguages || []).filter((l) => l !== "Other"),
        ...((formData.preferredLanguages || []).includes("Other") && (formData.otherLanguage || "").trim()
          ? [(formData.otherLanguage || "").trim()]
          : (formData.preferredLanguages || []).includes("Other")
          ? ["Other"]
          : [])
      ];
      if (langs.length === 0 && !(formData.preferredLanguage || "").trim()) {
        alert("Please select at least one preferred language.");
        return;
      }
    }
    setFormStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setFormStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chosenDomain = formData.domain || (formData.domains.length > 0 ? formData.domains[0] : "");
    if (!chosenDomain) {
      alert("Please choose a domain track.");
      return;
    }

    const resolvedLanguages = [
      ...formData.preferredLanguages.filter((l) => l !== "Other"),
      ...(formData.preferredLanguages.includes("Other") && formData.otherLanguage.trim()
        ? [formData.otherLanguage.trim()]
        : formData.preferredLanguages.includes("Other")
        ? ["Other"]
        : [])
    ].join(", ") || formData.preferredLanguage.trim();

    if (!resolvedLanguages) {
      alert("Please select at least one preferred language.");
      return;
    }

    if (!formData.acknowledged) {
      alert("Please confirm the Declaration & Acknowledgement before submitting.");
      return;
    }
    setStatus("SUBMITTING");
    setErrorMessage("");

    const resolvedCountry = formData.stateRegion === "Other Country"
      ? (formData.otherCountry.trim() || "International")
      : "India";

    const payload = {
      // 1. full name
      "full name": formData.fullName.trim(),
      // 2. phone number
      "phone number": formData.phoneNumber.trim(),
      // 3. watsapp number
      "watsapp number": formData.whatsappNumber.trim(),
      // 4. college email
      "college email": formData.collegeEmail.trim(),
      // 5. personal email
      "personal email": formData.personalEmail.trim(),
      // 6. state / region
      "state / region": formData.stateRegion.trim(),
      state: formData.stateRegion.trim(),
      country: resolvedCountry,
      // 8. college name
      "college name": formData.collegeName.trim(),
      // 9. branch or stream
      "branch or stream": formData.branchOrStream.trim(),
      // Year of passing / study
      "year of passing": formData.year || "",
      year: formData.year || "",
      // 10. domain (single chosen domain)
      domain: chosenDomain,
      // 11. preferred language (multi-select joined string)
      "preferred language": resolvedLanguages,

      // Exact Title Case sequence:
      "Full Name": formData.fullName.trim(),
      "Phone Number": formData.phoneNumber.trim(),
      "WhatsApp Number": formData.whatsappNumber.trim(),
      "College Email": formData.collegeEmail.trim(),
      "Personal Email": formData.personalEmail.trim(),
      "State / Region": formData.stateRegion.trim(),
      "State": formData.stateRegion.trim(),
      "Country": resolvedCountry,
      "College Name": formData.collegeName.trim(),
      "Branch or Stream": formData.branchOrStream.trim(),
      "Year of Passing": formData.year || "",
      "Year": formData.year || "",
      "Domain": chosenDomain,
      "Preferred Language": resolvedLanguages,

      // camelCase sequence:
      fullName: formData.fullName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      whatsappNumber: formData.whatsappNumber.trim(),
      collegeEmail: formData.collegeEmail.trim(),
      personalEmail: formData.personalEmail.trim(),
      stateRegion: formData.stateRegion.trim(),
      collegeName: formData.collegeName.trim(),
      branchOrStream: formData.branchOrStream.trim(),
      yearOfStudy: formData.year || "",
      preferredLanguages: resolvedLanguages,
      preferredLanguage: resolvedLanguages,
      languages: resolvedLanguages,

      // Ordered row array sequence:
      orderedValues: [
        formData.fullName.trim(),
        formData.phoneNumber.trim(),
        formData.whatsappNumber.trim(),
        formData.collegeEmail.trim(),
        formData.personalEmail.trim(),
        formData.stateRegion.trim(),
        resolvedCountry,
        formData.collegeName.trim(),
        formData.branchOrStream.trim(),
        formData.year || "",
        chosenDomain,
        resolvedLanguages
      ],

      // Common aliases for backend compatibility:
      name: formData.fullName.trim(),
      phone: formData.phoneNumber.trim(),
      whatsapp: formData.whatsappNumber.trim(),
      email: formData.collegeEmail.trim(),
      college: formData.collegeName.trim(),
      branch: formData.branchOrStream.trim(),
      domains: chosenDomain,
      language: resolvedLanguages,
      "Preferred Languages": resolvedLanguages,
      declaration: formData.acknowledged ? "Agreed" : "No",
      "Declaration & Acknowledgement": "I confirm all details are accurate and understand that a nominal program fee applies for iotip 2026.",
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}`);
      }

      const data = await response.json();

      // Only show SUCCESS after successful response verification from the script!
      if (data && (data.result === "success" || data.status === "success" || data.refId)) {
        setStatus("SUCCESS");
        setSubmittedRefId(data.refId || "");
        setFormData({
          fullName: "",
          phoneNumber: "",
          whatsappNumber: "",
          collegeEmail: "",
          personalEmail: "",
          stateRegion: "",
          otherCountry: "",
          collegeName: "",
          branchOrStream: "",
          year: "",
          domain: "",
          domains: [],
          preferredLanguages: [],
          otherLanguage: "",
          preferredLanguage: "",
          acknowledged: false
        });
        setFormStep(1);

        // Automatic redirect to the official WhatsApp student community group
        setTimeout(() => {
          window.location.href = WHATSAPP_GROUP_URL;
        }, 1500);
      } else {
        throw new Error(data?.message || data?.error || "Submission could not be recorded. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("ERROR");
      setErrorMessage(err.message || "Failed to submit. Please check your internet connection and try again.");
    }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="v2-root" id="v2-landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        /* ── Master Theme & Reset (Warm Editorial Gallery Theme) ── */
        .v2-root {
          --bg-deep: #E8E6E1;
          --bg-surface: #DFDDD7;
          --bg-card: #FFFFFF;
          --glass: rgba(255, 255, 255, 0.7);
          --glass-border: rgba(0, 0, 0, 0.12);
          --primary-grad: linear-gradient(135deg, #111111, #333333);
          --accent-cyan: #111111;
          --accent-green: #15803D;
          --text-main: #111111;
          --text-muted: #555555;
          
          background-color: var(--bg-deep);
          color: var(--text-main);
          font-family: 'Inter', -apple-system, sans-serif;
          overflow-x: hidden;
        }

        .glass-card {
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
        }

        .gradient-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          color: #111111;
        }
        
        .btn-glow {
          background: #000000;
          color: #FFFFFF;
          padding: 13px 32px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.25s ease;
          border: 1px solid #000;
          cursor: pointer;
          position: relative;
          z-index: 1;
          overflow: hidden;
          letter-spacing: -0.2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-glow:hover {
          background: #222222;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }


        /* ── Editorial Hero Section ── */
        .editorial-hero {
          background-color: #E8E6E1;
          color: #111;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .eh-nav {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 32px 6%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }
        .eh-nav-brand { 
          font-size: 1.7rem; 
          font-weight: 600; 
          letter-spacing: -0.5px; 
          color: #111; 
          font-family: 'Playfair Display', Georgia, serif;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .eh-nav-links { 
          display: flex; 
          gap: 36px; 
          font-size: 0.95rem; 
          font-weight: 500; 
          color: #333; 
        }
        .eh-nav-links a, .eh-nav-links span {
          cursor: pointer;
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }
        .eh-nav-links a:hover, .eh-nav-links span:hover {
          color: #000;
        }
        .eh-nav-btn { 
          background: #000; 
          color: #fff; 
          padding: 12px 28px; 
          border-radius: 50px;
          font-weight: 600; 
          font-size: 0.9rem; 
          border: none; 
          cursor: pointer;
          letter-spacing: -0.2px;
          transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        }
        .eh-nav-btn:hover {
          transform: translateY(-2px);
          background: #222;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
        }
        
        .eh-nav-brand-img {
          height: 40px;
          width: auto;
          object-fit: contain;
          transition: transform 0.2s;
        }
        .eh-nav-brand-img:hover {
          transform: scale(1.03);
        }
        
        .eh-huge-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 8vh 0 8vh 0;
          pointer-events: none;
          z-index: 1;
        }
        .eh-huge-text span {
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: clamp(6.5rem, 15vw, 16.5rem);
          line-height: 0.82;
          letter-spacing: -0.035em;
          color: #111111;
          font-weight: 700;
        }
        
        .eh-desktop-badge {
          position: absolute;
          top: 96px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(17, 17, 17, 0.94);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          padding: 7px 20px;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.4px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.12);
          z-index: 4;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .eh-desktop-badge strong {
          color: #10B981;
          font-weight: 700;
        }
        @media (max-width: 1024px) {
          .eh-desktop-badge {
            display: none;
          }
        }
        
        .eh-center-object-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(280px, 35vw, 490px);
          max-height: 52vh;
        }
        
        .eh-center-object {
          width: 100%;
          height: auto;
          max-height: 52vh;
          object-fit: contain;
          filter: drop-shadow(0 25px 45px rgba(0,0,0,0.18));
          pointer-events: none;
          user-select: none;
          position: relative;
          z-index: 2;
        }
        
        .eh-cyber-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .eh-cyber-svg {
          width: 100%;
          height: 100%;
          max-height: 52vh;
          overflow: visible;
        }
        
        .eh-scholar-badge {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(17, 17, 17, 0.94);
          backdrop-filter: blur(10px);
          color: #FFFFFF;
          padding: 6px 18px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          white-space: nowrap;
          pointer-events: none;
        }
        .eh-scholar-badge span {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #10B981;
          font-family: 'Inter', sans-serif !important;
        }
        .eh-scholar-badge small {
          font-size: 0.6rem;
          color: #D1D5DB;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif !important;
        }
        
        .eh-features {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: space-between;
          padding: 16vh 6%;
          z-index: 3;
          pointer-events: none;
        }
        .eh-col { 
          display: flex; 
          flex-direction: column; 
          justify-content: space-between; 
          pointer-events: auto; 
          width: 275px; 
        }
        
        .eh-feature { 
          position: relative; 
          background: rgba(232, 230, 225, 0.45);
          backdrop-filter: blur(8px);
          padding: 12px 14px;
          border-radius: 6px;
        }
        .eh-feature h3 { 
          font-size: 1.55rem; 
          font-weight: 600; 
          letter-spacing: -0.5px; 
          margin-bottom: 8px; 
          color: #111; 
          line-height: 1.15; 
        }
        .eh-feature p { 
          font-size: 0.88rem; 
          line-height: 1.55; 
          color: #3b3b3b; 
          font-weight: 400; 
        }
        
        .eh-line { position: absolute; border-bottom: 1.5px dashed #555; width: 13vw; max-width: 170px; }
        .eh-line::after { content: ''; position: absolute; right: -5px; top: -4.5px; width: 9px; height: 9px; border-radius: 50%; background: #111; }
        .el-left::after { right: auto; left: -5px; }
        
        .el-1 { top: 35px; right: -11.5vw; transform: rotate(12deg); }
        .el-2 { top: 35px; right: -11.5vw; transform: rotate(-12deg); }
        .el-3 { top: 35px; left: -11.5vw; transform: rotate(168deg); }
        .el-4 { top: 35px; left: -11.5vw; transform: rotate(192deg); }
        
        .eh-footer { 
          position: absolute; 
          bottom: 22px; 
          left: 5%; 
          font-size: 0.88rem; 
          font-weight: 600; 
          color: #222; 
          letter-spacing: 0.2px; 
          z-index: 10; 
          background: rgba(232, 230, 225, 0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .eh-scroll { 
          position: absolute; bottom: 0; right: 0; width: 75px; height: 75px; 
          border-top-left-radius: 24px;
          background: #000; color: white; display: flex; align-items: center; justify-content: center; 
          z-index: 10; cursor: pointer; transition: background 0.2s;
        }
        .eh-scroll:hover { background: #222; }
        
        .eh-hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .eh-mobile-badge {
          display: none;
        }
        .eh-mobile-hero-details {
          display: none;
        }
        
        /* ── Tablet & Mobile Responsive ── */
        @media (max-width: 1024px) {
          .editorial-hero {
            min-height: auto;
            padding: 85px 20px 45px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            position: relative;
          }
          
          .eh-nav {
            position: fixed;
            top: 0; left: 0; right: 0;
            padding: 14px 20px;
            background: rgba(232, 230, 225, 0.94);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            z-index: 100;
          }
          .eh-nav-links { display: none; }
          .eh-nav-brand { font-size: 1.35rem; }
          .eh-nav-btn { padding: 9px 18px; font-size: 0.82rem; }
          
          /* Hide giant background text on mobile to avoid breaking the layout */
          .eh-huge-text {
            display: none !important;
          }
          
          .eh-hero-content {
            margin: 10px 0 24px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .eh-mobile-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #111111;
            color: #FFFFFF;
            padding: 6px 14px;
            border-radius: 50px;
            font-size: 0.74rem;
            font-weight: 600;
            letter-spacing: 0.3px;
            margin-bottom: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          
          .eh-center-logo {
            width: min(78vw, 260px);
            height: auto;
            max-height: 120px;
            margin: 0 auto 16px;
            filter: drop-shadow(0 8px 18px rgba(0,0,0,0.08));
          }
          
          .eh-mobile-hero-details {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 580px;
            margin: 0 auto;
          }
          
          .eh-mobile-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: clamp(1.8rem, 6.5vw, 2.5rem);
            font-weight: 700;
            line-height: 1.15;
            letter-spacing: -0.02em;
            color: #111111;
            margin-bottom: 12px;
          }
          .eh-mobile-title em {
            font-style: italic;
          }
          
          .eh-mobile-subtitle {
            font-size: 0.92rem;
            line-height: 1.55;
            color: #444444;
            margin-bottom: 20px;
            max-width: 440px;
          }
          
          .eh-mobile-cta {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-bottom: 12px;
          }
          .eh-mobile-cta .btn-glow {
            width: 100%;
            max-width: 320px;
            padding: 14px 24px;
            font-size: 0.95rem;
          }
          
          .eh-features {
            position: relative;
            inset: auto;
            padding: 16px 0 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            width: 100%;
            max-width: 650px;
            z-index: 3;
            pointer-events: auto;
          }
          .eh-col {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .eh-feature {
            background: #FFFFFF;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            padding: 16px 16px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.03);
            text-align: left;
          }
          .eh-feature h3 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 1.18rem;
            margin-bottom: 6px;
            font-weight: 700;
          }
          .eh-feature p {
            font-size: 0.83rem;
            line-height: 1.45;
            color: #444;
          }
          
          .eh-line { display: none !important; }
          .eh-scroll { display: none !important; }
          
          .eh-footer {
            position: relative;
            bottom: auto;
            left: auto;
            margin-top: 28px;
            font-size: 0.84rem;
            color: #777;
            text-align: center;
          }
        }
        
        @media (max-width: 600px) {
          .eh-features {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        /* ── Marquee & Stats ── */
        .stats-bar {
          border-top: 1px solid #111111;
          border-bottom: 1px solid #111111;
          background: #E0DDD7;
          padding: 48px 5%;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 768px) { 
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } 
          .stats-bar { padding: 32px 5%; }
        }
        
        .stat-card {
          text-align: center;
          padding: 10px 20px;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
        .stat-card:last-child { border-right: none; }
        @media (max-width: 768px) {
          .stat-card:nth-child(2) { border-right: none; }
          .stat-card { padding: 8px 10px; }
        }
        .stat-value {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #111111;
          margin-bottom: 6px;
          display: flex;
          justify-content: center;
          align-items: baseline;
          letter-spacing: -1px;
        }
        .stat-label { color: #555555; font-size: 0.82rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; }

        /* ── LMS Showcase ── */
        .section-padding { padding: 110px 6%; }
        @media (max-width: 768px) {
          .section-padding { padding: 55px 5%; }
          .section-header { margin-bottom: 35px; }
        }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-tag { color: #555555; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; margin-bottom: 12px; display: block; }
        .section-title { 
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 4.5vw, 3.4rem); 
          font-weight: 700; 
          margin-bottom: 18px; 
          color: #111111;
          letter-spacing: -0.02em;
        }
        
        .lms-showcase {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 50px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: center;
        }
        @media (max-width: 900px) { .lms-showcase { grid-template-columns: 1fr; } }
        
        .lms-tabs { display: flex; flex-direction: column; gap: 14px; }
        .lms-tab {
          padding: 22px;
          border-radius: 6px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.08);
          color: #444444;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex; align-items: flex-start; gap: 18px;
        }
        .lms-tab:hover { background: #FFFFFF; border-color: rgba(0,0,0,0.2); transform: translateX(4px); }
        .lms-tab.active {
          background: #111111;
          border-color: #111111;
          color: #FFFFFF;
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
          transform: translateX(8px);
        }
        .tab-icon { font-size: 24px; padding: 12px; border-radius: 6px; background: rgba(0,0,0,0.05); color: #111; transition: all 0.3s; }
        .lms-tab.active .tab-icon { background: #262626; color: #FFFFFF !important; }
        .tab-content { display: flex; flex-direction: column; gap: 6px; }
        .tab-title { font-weight: 700; font-size: 1.15rem; letter-spacing: -0.2px; }
        .tab-desc { font-size: 0.9rem; line-height: 1.55; display: none; color: #CCCCCC; }
        .lms-tab.active .tab-desc { display: block; }

        .lms-visual {
          position: relative;
          background: #18191E;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.2);
          box-shadow: 0 30px 60px rgba(0,0,0,0.14);
          overflow: hidden;
          min-height: 500px;
          display: flex; flex-direction: column;
        }
        .mockup-ui { width: 100%; height: 100%; display: flex; flex-direction: column; flex: 1;}
        .mockup-header { 
          height: 48px; 
          background: #24252B; 
          border-bottom: 1px solid rgba(255,255,255,0.08); 
          display: flex; 
          align-items: center; 
          padding: 0 20px; 
          gap: 8px;
        }
        .mockup-header-title { color: #8E929E; font-size: 0.85rem; font-weight: 500; margin-left: 10px; }
        .mockup-dot { width: 11px; height: 11px; border-radius: 50%; background: #555; }
        .mockup-body { 
          flex: 1; 
          padding: 40px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          position: relative; 
          background: #111317; 
          color: #FFF;
        }

        /* ── Domain Matrix ── */
        .section-domains {
          background-color: #E2DFD9;
          border-top: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .domain-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .domain-card {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.03);
        }
        .domain-card:hover { 
          transform: translateY(-5px); 
          border-color: #000000;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
        }
        .domain-icon { font-size: 32px; margin-bottom: 20px; }
        .domain-tag { 
          position: absolute; 
          top: 20px; right: 20px; 
          padding: 4px 10px; 
          border-radius: 4px; 
          font-size: 0.72rem; 
          font-weight: 700; 
          background: #111111; 
          color: #FFFFFF;
          letter-spacing: 0.5px;
        }
        .domain-title { 
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.3rem; 
          font-weight: 700; 
          margin-bottom: 12px; 
          color: #111111;
        }
        .domain-salary { 
          font-size: 0.9rem; 
          color: #15803D; 
          font-weight: 700; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
        }

        /* ── Comparison Matrix Redesign ── */
        .section-compare {
          background-color: #E8E6E1;
        }
        .compare-grid-wrapper {
          position: relative;
          max-width: 1050px;
          margin: 0 auto;
        }
        .compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        @media (max-width: 768px) {
          .compare-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        .compare-col {
          padding: 44px 34px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .col-traditional {
          background-color: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
        }
        .col-traditional h3 {
          font-family: 'Playfair Display', Georgia, serif;
          color: #555555 !important;
          font-size: 1.6rem !important;
        }
        .col-accenlearn {
          background-color: #0E0E10;
          color: #FFFFFF;
          border: 1px solid #0E0E10;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.14);
          position: relative;
        }
        .col-accenlearn h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.6rem !important;
          color: #FFFFFF !important;
        }
        .compare-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .compare-icon {
          flex-shrink: 0;
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .col-traditional .compare-icon { background: rgba(239,68,68,0.1); color: #DC2626; }
        .col-accenlearn .compare-icon { background: rgba(255,255,255,0.15); color: #FFFFFF; }
        .col-traditional .compare-text h4 { margin: 0 0 4px 0; font-size: 0.82rem; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .col-traditional .compare-text p { margin: 0; font-size: 1rem; font-weight: 600; color: #444; line-height: 1.4; }
        .col-accenlearn .compare-text h4 { margin: 0 0 4px 0; font-size: 0.82rem; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .col-accenlearn .compare-text p { margin: 0; font-size: 1.05rem; font-weight: 700; color: #FFFFFF; line-height: 1.4; }
        
        .vs-circle {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 52px; height: 52px;
          background: #E8E6E1;
          border: 2px solid #111111;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.95rem; color: #111111;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .vs-circle { position: relative; top: auto; left: auto; transform: none; margin: -20px auto; }
        }

        /* ── Testimonials ── */
        .section-testimonials {
          background-color: #E2DFD9;
          border-top: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .testimonial-wrapper { max-width: 960px; margin: 0 auto; }
        .testi-card {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          display: grid; grid-template-columns: 1fr 1.3fr; gap: 40px; align-items: center;
          padding: 44px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
        }
        @media (max-width: 768px) { .testi-card { grid-template-columns: 1fr; text-align: center; padding: 28px; } }
        .testi-img-wrap {
          border-radius: 8px; overflow: hidden; aspect-ratio: 1/1; position: relative;
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
        }
        .testi-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .testi-quote { 
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.35rem; 
          font-style: italic; 
          line-height: 1.6; 
          margin-bottom: 24px; 
          color: #111111;
        }
        .testi-author { font-weight: 700; font-size: 1.15rem; color: #111111; }
        .testi-role { font-size: 0.9rem; color: #666666; font-weight: 500; }

        /* ── Value Addition Section ── */
        .value-section {
          background-color: #E2DFD9;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 40px auto 0;
        }
        @media (max-width: 992px) {
          .value-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .value-grid { grid-template-columns: 1fr; }
        }
        .value-card {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 32px 28px;
          position: relative;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.06);
          border-color: rgba(0, 0, 0, 0.2);
        }
        .value-number {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.8rem;
          font-style: italic;
          font-weight: 700;
          color: #D1CEC7;
          position: absolute;
          top: 24px;
          right: 28px;
        }
        .value-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: #F5F3ED;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .value-title {
          font-size: 1.22rem;
          font-weight: 700;
          color: #111111;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .value-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #555555;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .value-pill {
          display: inline-block;
          align-self: flex-start;
          padding: 4px 12px;
          background: #F3F1EC;
          border-radius: 20px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #222222;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .value-cta-banner {
          max-width: 1200px;
          margin: 45px auto 0;
          background: #111111;
          color: #FFFFFF;
          border-radius: 12px;
          padding: 34px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        @media (max-width: 768px) {
          .value-cta-banner {
            flex-direction: column;
            text-align: center;
            padding: 26px 20px;
          }
        }
        .vcb-text h4 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.45rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #FFFFFF;
        }
        .vcb-text p {
          color: #D1D5DB;
          font-size: 0.92rem;
          line-height: 1.5;
          margin: 0;
        }
        .value-cta-banner .btn-glow {
          background: #FFFFFF;
          color: #111111;
          border-color: #FFFFFF;
          white-space: nowrap;
        }
        .value-cta-banner .btn-glow:hover {
          background: #E5E7EB;
          color: #000000;
        }

        /* ── Application Sheet Badges Strip ── */
        .sheet-perks-strip {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 800px;
          margin: 24px auto 36px;
        }
        .s-perk {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #222222;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }
        .s-perk span {
          color: #15803D;
          font-weight: 800;
        }

        /* ── Form Section ── */
        .enroll-section {
          background-color: #E8E6E1;
          padding: 110px 5%;
          position: relative;
        }
        .form-container {
          max-width: 800px; margin: 0 auto;
          background: #FFFFFF;
          padding: 50px;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          box-shadow: 0 30px 60px rgba(0,0,0,0.06);
          position: relative;
          z-index: 10;
        }
        @media (max-width: 600px) { .form-container { padding: 30px 20px; } }

        .progress-bar-wrap { width: 100%; height: 5px; background: #E5E2DA; border-radius: 4px; margin-bottom: 40px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: #000000; transition: width 0.3s ease; }
        
        .form-step-title { 
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.65rem; 
          font-weight: 700; 
          margin-bottom: 24px; 
          color: #111111;
        }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
        .form-grid .full-w { grid-column: 1 / -1; }

        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-label { font-size: 0.85rem; font-weight: 600; color: #222222; }
        .form-input, .form-select {
          padding: 14px 16px;
          background: #F9F8F5;
          border: 1px solid #D6D3CB;
          border-radius: 6px;
          color: #111111; font-family: inherit; font-size: 1rem;
          transition: all 0.2s;
        }
        .form-input:focus, .form-select:focus { 
          border-color: #000000; 
          outline: none; 
          background: #FFFFFF; 
          box-shadow: 0 0 0 2px rgba(0,0,0,0.1); 
        }
        .form-select option { background: #FFFFFF; color: #111111; }

        .domain-filter-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 35px;
          flex-wrap: wrap;
        }
        .d-tab-btn {
          padding: 8px 22px;
          border-radius: 30px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          background: rgba(255, 255, 255, 0.7);
          font-size: 0.88rem;
          font-weight: 600;
          color: #333333;
          cursor: pointer;
          transition: all 0.2s;
        }
        .d-tab-btn.active {
          background: #000000;
          color: #FFFFFF;
          border-color: #000000;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .d-tab-btn:hover:not(.active) {
          background: #FFFFFF;
          border-color: #000;
        }

        .domain-form-filter {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .df-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid #D6D3CB;
          background: #F5F3ED;
          font-size: 0.8rem;
          font-weight: 600;
          color: #444;
          cursor: pointer;
          transition: all 0.2s;
        }
        .df-btn.active {
          background: #000000;
          color: #FFFFFF;
          border-color: #000000;
        }
        .df-btn:hover:not(.active) {
          border-color: #000000;
        }

        .domain-chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
          max-height: 340px;
          overflow-y: auto;
          padding: 4px;
        }
        .d-chip {
          padding: 9px 15px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          background: #F5F3ED;
          border: 1px solid #D6D3CB;
          color: #333333;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          user-select: none;
        }
        .d-chip.selected {
          background: #000000;
          border-color: #000000;
          color: #FFFFFF;
          font-weight: 600;
        }
        .d-chip:hover {
          transform: translateY(-1px);
          border-color: #000000;
        }

        .lang-chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }
        .lang-chip {
          padding: 8px 16px;
          border-radius: 24px;
          font-size: 0.88rem;
          font-weight: 500;
          background: #F5F3ED;
          border: 1px solid #D6D3CB;
          color: #333333;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          user-select: none;
        }
        .lang-chip.selected {
          background: #000000;
          border-color: #000000;
          color: #FFFFFF;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }
        .lang-chip:hover {
          border-color: #000000;
        }

        .form-actions { display: flex; justify-content: space-between; margin-top: 40px; }
        .btn-secondary { 
          padding: 12px 28px; 
          background: transparent; 
          border: 1px solid #111111; 
          color: #111111; 
          border-radius: 50px; 
          cursor: pointer; 
          font-weight: 600; 
          transition: all 0.2s; 
        }
        .btn-secondary:hover { background: rgba(0,0,0,0.05); }
      `}</style>



      {/* ── Editorial Hero ── */}
      <section className="editorial-hero">
        <nav className="eh-nav">
          <a href="https://www.accenlearn.com/" className="eh-nav-brand">
            <img src={brandLogo} alt="Accenlearn" className="eh-nav-brand-img" />
          </a>
          <div className="eh-nav-links">
            <a href="https://www.accenlearn.com/">Programs</a>
            <a href="https://www.accenlearn.com/mentor">Mentors</a>
            <a href="https://www.accenlearn.com/alumni">Alumni</a>
            <span onClick={scrollToForm}>Contact</span>
          </div>
          <button className="eh-nav-btn" onClick={scrollToForm}>Enroll Now</button>
        </nav>

        {/* Editorial Top Pill on Desktop */}
        {/* <div className="eh-desktop-badge">
          <span>✦</span>
          <strong>WINTER INTERNSHIP 2026</strong>
          <span>•</span>
          <span>Industry Oriented Training &amp; Internship Program (IOTIP)</span>
        </div> */}

        <div className="eh-huge-text">
          <span>Accen</span>
          <span>Learn</span>
        </div>

        <div className="eh-hero-content">
          <div className="eh-mobile-badge">
            ✦ WINTER INTERNSHIP 2026 • IOTIP
          </div>
          
          <div className="eh-center-object-wrap">
            <img 
              src="/classical_bust_plaster.png" 
              alt="The Digital Scholar - Accenlearn IOTIP" 
              className="eh-center-object" 
            />
            {/* Cybernetic Neural Visor & Circuit Overlay */}
            <div className="eh-cyber-overlay">
              <svg viewBox="0 0 400 520" className="eh-cyber-svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <linearGradient id="visorGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="cyberGlow" x1="-30%" y1="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Cybernetic Neural Visor precisely covering eye sockets */}
                <path 
                  d="M 126 138 Q 202 130 274 136 Q 278 148 272 156 Q 202 150 126 156 Z" 
                  fill="url(#visorGlass)" 
                  stroke="url(#cyberGrad)" 
                  strokeWidth="2.2"
                  filter="url(#cyberGlow)"
                />
                
                {/* Horizontal internal HUD optic beam across pupils */}
                <line x1="134" y1="145" x2="266" y2="145" stroke="#06B6D4" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.9" />
                
                {/* Eye pupil targeting brackets */}
                <path d="M 158 138 L 152 138 L 152 150 L 158 150" fill="none" stroke="#10B981" strokeWidth="1.2" />
                <path d="M 176 138 L 182 138 L 182 150 L 176 150" fill="none" stroke="#10B981" strokeWidth="1.2" />
                <circle cx="167" cy="144" r="2.2" fill="#10B981" filter="url(#cyberGlow)" />
                
                <path d="M 226 138 L 220 138 L 220 150 L 226 150" fill="none" stroke="#06B6D4" strokeWidth="1.2" />
                <path d="M 244 138 L 250 138 L 250 150 L 244 150" fill="none" stroke="#06B6D4" strokeWidth="1.2" />
                <circle cx="235" cy="144" r="2.2" fill="#06B6D4" filter="url(#cyberGlow)" />
                
                {/* Nasal Bridge Neural Core */}
                <circle cx="202" cy="143" r="10" fill="none" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx="202" cy="143" r="3" fill="#10B981" filter="url(#cyberGlow)" />
                
                {/* Left Temple Stem & Power node */}
                <path 
                  d="M 126 142 L 104 140 L 94 145" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="1.8" 
                  opacity="0.9"
                />
                <circle cx="94" cy="145" r="3.2" fill="#10B981" filter="url(#cyberGlow)" />
                <circle cx="104" cy="140" r="1.8" fill="#06B6D4" />
                
                {/* Right Temple Stem & Power node */}
                <path 
                  d="M 274 140 L 294 138 L 304 143" 
                  fill="none" 
                  stroke="#06B6D4" 
                  strokeWidth="1.8" 
                  opacity="0.9"
                />
                <circle cx="304" cy="143" r="3.2" fill="#06B6D4" filter="url(#cyberGlow)" />
                <circle cx="294" cy="138" r="1.8" fill="#10B981" />
              </svg>
            </div>
            
            <div className="eh-scholar-badge">
              <span>✦ IOTIP 2026</span>
              <small>INDUSTRY ORIENTED TRAINING &amp; INTERNSHIP PROGRAM</small>
            </div>
          </div>

          <div className="eh-mobile-hero-details">
            <h1 className="eh-mobile-title">
              Industry Oriented Training & <em>Winter Internship</em>
            </h1>
            <p className="eh-mobile-subtitle">
              Accenlearn’s flagship IOTIP Winter Internship program bridges academia with real corporate engineering: live Bengaluru startup repositories, official IBM certifications, and guaranteed MNC placement drives.
            </p>
            <div className="eh-mobile-cta">
              <button className="btn-glow" onClick={scrollToForm}>
                Apply For Winter Internship <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="eh-features">
          <div className="eh-col">
            <div className="eh-feature">
              <h3>Industry Training</h3>
              <p>Comprehensive corporate curriculum engineered by MNC tech architects. Learn industry-standard architectures, clean coding, and production deployment.</p>
              <div className="eh-line el-1"></div>
            </div>
            <div className="eh-feature">
              <h3>Winter Internship</h3>
              <p>Work on live repositories from Bengaluru tech startups. Build a standout recruiter portfolio and earn a verified Internship Certificate & LOR.</p>
              <div className="eh-line el-2"></div>
            </div>
          </div>
          <div className="eh-col">
            <div className="eh-feature">
              <h3>IBM Certification</h3>
              <p>Earn globally accredited IBM credentials and an ATS-engineered resume designed to bypass corporate screeners and catch recruiter attention.</p>
              <div className="eh-line el-left el-3"></div>
            </div>
            <div className="eh-feature">
              <h3>Placement Support</h3>
              <p>Unlock direct access to Accenlearn's dedicated MNC hiring portal, 1-on-1 mock interviews with active engineers, and high-package placement drives.</p>
              <div className="eh-line el-left el-4"></div>
            </div>
          </div>
        </div>

        <div className="eh-footer">© Accenlearn Edutech • Industry Oriented Training & Internship Program (IOTIP)</div>
        
        <div className="eh-scroll">
          <MdArrowForward size={32} style={{ transform: "rotate(45deg)" }} />
        </div>
      </section>

      {/* ── Stats Marquee ── */}
      <section className="stats-bar">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value"><CountUp end={10000} duration={2.5} separator="," />+</div>
            <div className="stat-label">Students Placed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value"><CountUp end={500} duration={2.5} />+</div>
            <div className="stat-label">Hiring Partners</div>
          </div>
          <div className="stat-card">
            <div className="stat-value"><CountUp end={50} duration={2.5} />+</div>
            <div className="stat-label">Live Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: "#F59E0B" }}>4.9/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </section>

      {/* ── Value Addition to Student's Life (Winter Internship 2026) ── */}
      <section className="section-padding value-section">
        <div className="section-header">
          <span className="section-tag">Career Transformation</span>
          <h2 className="section-title">
            How <span className="gradient-text">IOTIP Winter Internship</span> Adds Value to Your Life
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 680, margin: "10px auto 0", fontSize: "1rem" }}>
            College curricula focus on textbook theory. The <strong>Industry Oriented Training &amp; Internship Program (IOTIP)</strong> equips you with production-ready software engineering, verified corporate credentials, and a high-paying career launchpad.
          </p>
        </div>

        <div className="value-grid">
          <div className="value-card">
            <div className="value-number">01</div>
            <div className="value-icon-wrap" style={{ color: "#6366F1" }}>
              <FaLaptopCode size={24} />
            </div>
            <h3 className="value-title">Zero Textbook Fluff, 100% Industry Engineering</h3>
            <p className="value-desc">
              Stop cramming outdated syllabus notes. Build real-world full-stack platforms, scalable microservices, and AI models matching the actual tech stacks of Bengaluru &amp; Silicon Valley tech companies.
            </p>
            <div className="value-pill">Practical Competence</div>
          </div>

          <div className="value-card">
            <div className="value-number">02</div>
            <div className="value-icon-wrap" style={{ color: "#10B981" }}>
              <FaRocket size={24} />
            </div>
            <h3 className="value-title">Work on Live Startup Repositories</h3>
            <p className="value-desc">
              Contribute actual code and pull requests to live startup repositories. Build an undeniable GitHub portfolio with deployed links so recruiters can verify your proof of work instantly.
            </p>
            <div className="value-pill">Proof of Work</div>
          </div>

          <div className="value-card">
            <div className="value-number">03</div>
            <div className="value-icon-wrap" style={{ color: "#0F62FE" }}>
              <FaCertificate size={24} />
            </div>
            <h3 className="value-title">Official IBM Global Certification</h3>
            <p className="value-desc">
              Earn globally accredited credentials backed by IBM. Stand out in the top 5% of freshers across India with an internationally verifiable digital badge on LinkedIn.
            </p>
            <div className="value-pill">Global Credibility</div>
          </div>

          <div className="value-card">
            <div className="value-number">04</div>
            <div className="value-icon-wrap" style={{ color: "#F59E0B" }}>
              <FaGraduationCap size={24} />
            </div>
            <h3 className="value-title">College Credit &amp; NOC Compliant</h3>
            <p className="value-desc">
              100% recognized for academic college requirements. Receive formal Offer Letters, Weekly Logbooks, Project Reports, and a verified LOR for your university HOD and TPO.
            </p>
            <div className="value-pill">Academic Approval</div>
          </div>

          <div className="value-card">
            <div className="value-number">05</div>
            <div className="value-icon-wrap" style={{ color: "#EC4899" }}>
              <FaRegFileAlt size={24} />
            </div>
            <h3 className="value-title">AI Resume &amp; ATS Score 90+</h3>
            <p className="value-desc">
              Transform your resume from automated rejection into an interview magnet. Our built-in AI optimizes keywords, project bullets, and ATS layout to beat corporate screening bots.
            </p>
            <div className="value-pill">Recruiter Shortlisting</div>
          </div>

          <div className="value-card">
            <div className="value-number">06</div>
            <div className="value-icon-wrap" style={{ color: "#14B8A6" }}>
              <FaBriefcase size={24} />
            </div>
            <h3 className="value-title">Dedicated MNC Placement Drives (₹6 - 18 LPA)</h3>
            <p className="value-desc">
              Unlock access to 500+ corporate hiring partners. Participate in dedicated hiring drives, 1-on-1 mock interviews with active MNC tech leads, and complete salary negotiation mentorship.
            </p>
            <div className="value-pill">Placement Assurance</div>
          </div>
        </div>

        {/* High Conversion Banner */}
        <div className="value-cta-banner">
          <div className="vcb-text">
            <h4>Make this winter vacation the defining milestone of your college career</h4>
            <p>Don't waste 4 weeks scrolling. Join 10,000+ peers who built production projects, earned IBM credentials, and secured top jobs.</p>
          </div>
          <button className="btn-glow" onClick={scrollToForm}>
            Apply On This Sheet Now <MdArrowForward style={{ display: "inline" }} />
          </button>
        </div>
      </section>

      {/* ── LMS Showcase ── */}
      <section className="section-padding">
        <div className="section-header">
         
          <h2 className="section-title">Experience the <span className="gradient-text">LMS Portal</span></h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 600, margin: "0 auto", fontSize: "1.1rem" }}>
            Not just recorded videos. A complete interactive ecosystem designed to make you placement-ready from day one.
          </p>
        </div>
        
        <div className="lms-showcase">
          <div className="lms-tabs">
            {LMS_TABS.map(tab => (
              <div 
                key={tab.id} 
                className={`lms-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="tab-icon" style={{ color: tab.color }}>
                  <tab.icon />
                </div>
                <div className="tab-content">
                  <div className="tab-title">{tab.label}</div>
                  <div className="tab-desc">{tab.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lms-visual">
            <div className="mockup-ui">
              <div className="mockup-header">
                <div className="mockup-dot"></div><div className="mockup-dot"></div><div className="mockup-dot"></div>
                <div className="mockup-header-title">portal.accenlearn.com</div>
              </div>
              <div className="mockup-body" style={{
                backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.8), rgba(11, 15, 25, 0.95)), url(${
                  activeTab === 'resume' ? 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80' :
                  activeTab === 'code' ? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' :
                  activeTab === 'interview' ? 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80' :
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                {activeTab === "resume" && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 120, height: 120, borderRadius: "50%", border: "8px solid #10B981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 900, margin: "0 auto 20px" }}>94%</div>
                    <h3 style={{ marginBottom: 10 }}>ATS Match Score: Excellent</h3>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                      <span style={{ padding: "4px 12px", background: "rgba(16,185,129,0.2)", color: "#10B981", borderRadius: 20, fontSize: "0.8rem" }}>✓ Keywords Matched</span>
                      <span style={{ padding: "4px 12px", background: "rgba(16,185,129,0.2)", color: "#10B981", borderRadius: 20, fontSize: "0.8rem" }}>✓ Format Passed</span>
                    </div>
                  </div>
                )}
                {activeTab === "code" && (
                  <div style={{ width: "100%", height: "100%", background: "#0f172a", borderRadius: 8, padding: 16, fontFamily: "monospace", color: "#cbd5e1" }}>
                    <div style={{ color: "#c678dd", marginBottom: 8 }}>function <span style={{ color: "#61afef" }}>twoSum</span>(nums, target) {'{'}</div>
                    <div style={{ paddingLeft: 20 }}>const map = new Map();</div>
                    <div style={{ paddingLeft: 20 }}>for (let i = 0; i &lt; nums.length; i++) {'{'}</div>
                    <div style={{ paddingLeft: 40, color: "#98c379" }}>// Implementation here</div>
                    <div style={{ paddingLeft: 20 }}>{'}'}</div>
                    <div style={{ marginBottom: 8 }}>{'}'}</div>
                    <div style={{ padding: 12, background: "rgba(16,185,129,0.1)", borderLeft: "4px solid #10B981", marginTop: 20 }}>✓ All 42 Test Cases Passed (Runtime: 56ms)</div>
                  </div>
                )}
                {activeTab === "interview" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
                    <div style={{ display: "flex", gap: 20 }}>
                      <div style={{ flex: 1, height: 160, background: "#334155", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <FaRobot size={40} color="#94a3b8" />
                        <span style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.5)", padding: "2px 8px", borderRadius: 4, fontSize: "0.7rem" }}>AI Interviewer (HR)</span>
                      </div>
                      <div style={{ flex: 1, height: 160, background: "#475569", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#cbd5e1" }}></div>
                        <span style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.5)", padding: "2px 8px", borderRadius: 4, fontSize: "0.7rem" }}>You (Camera Active)</span>
                      </div>
                    </div>
                    <div style={{ padding: 16, background: "rgba(99,102,241,0.1)", borderRadius: 8, borderLeft: "4px solid #6366F1" }}>
                      <strong style={{ display: "block", marginBottom: 4, fontSize: "0.85rem", color: "#818cf8" }}>Feedback:</strong>
                      "Great technical explanation of React hooks. Try to maintain more eye contact with the camera to show confidence."
                    </div>
                  </div>
                )}
                {activeTab === "projects" && (
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ padding: 20, background: "rgba(255,255,255,0.05)", borderRadius: 12, border: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4 style={{ margin: 0, marginBottom: 4 }}>FinTech Dashboard UI</h4>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sponsored by Razorpay Alumni</div>
                      </div>
                      <span style={{ padding: "6px 12px", background: "rgba(16,185,129,0.2)", color: "#10B981", borderRadius: 20, fontSize: "0.8rem", fontWeight: 700 }}>Completed</span>
                    </div>
                    <div style={{ padding: 20, background: "rgba(255,255,255,0.05)", borderRadius: 12, border: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4 style={{ margin: 0, marginBottom: 4 }}>AI Chatbot Integration</h4>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sponsored by YC Startup</div>
                      </div>
                      <span style={{ padding: "6px 12px", background: "rgba(245,158,11,0.2)", color: "#F59E0B", borderRadius: 20, fontSize: "0.8rem", fontWeight: 700 }}>In Progress (75%)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Domains ── */}
      <section className="section-padding section-domains">
        <div className="section-header">
          <span className="section-tag">Career Acceleration Tracks</span>
          <h2 className="section-title">Master <span className="gradient-text">High-Paying</span> Domains</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 640, margin: "10px auto 0", fontSize: "0.95rem" }}>
            Explore 24+ industry-vetted programs across Engineering, Management, and Healthcare with IBM certification and dedicated placement support.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="domain-filter-tabs">
          {[
            { label: "All (24)", key: "All" },
            { label: "Tech / IT (16)", key: "Tech" },
            { label: "Management (6)", key: "Management" },
            { label: "Medical (2)", key: "Medical" },
          ].map((tab, idx) => (
            <button
              key={idx}
              className={`d-tab-btn ${selectedCategory === tab.key ? "active" : ""}`}
              onClick={() => setSelectedCategory(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="domain-grid">
          {filteredPageDomains.map((d, i) => (
            <div key={i} className="glass-card domain-card">
              <span className="domain-tag">{d.tag}</span>
              <div className="domain-icon" style={{ color: d.color }}>
                <d.icon />
              </div>
              <h3 className="domain-title">{d.label}</h3>
              <div className="domain-salary">
                <MdTrendingUp size={18} /> Avg: {d.salary}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="section-padding section-compare">
        <div className="section-header">
          <h2 className="section-title">The <span className="gradient-text">Accenlearn</span> Difference</h2>
        </div>
        <div className="compare-grid-wrapper">
          <div className="compare-grid">
            {/* Traditional Coaching */}
            <div className="compare-col col-traditional">
              <h3 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.5rem', margin: '0 0 10px' }}>Traditional Coaching</h3>
              
              <div className="compare-item">
                <div className="compare-icon"><FaRegTimesCircle size={16} /></div>
                <div className="compare-text"><h4>Certification Authority</h4><p>Local Institute Certificates</p></div>
              </div>
              <div className="compare-item">
                <div className="compare-icon"><FaRegTimesCircle size={16} /></div>
                <div className="compare-text"><h4>Project Experience</h4><p>Dummy / Generic Projects</p></div>
              </div>
              <div className="compare-item">
                <div className="compare-icon"><FaRegTimesCircle size={16} /></div>
                <div className="compare-text"><h4>Interactive LMS</h4><p>None / Just Recorded Videos</p></div>
              </div>
              <div className="compare-item">
                <div className="compare-icon"><FaRegTimesCircle size={16} /></div>
                <div className="compare-text"><h4>Job Placement</h4><p>Manual Telegram Groups</p></div>
              </div>
              <div className="compare-item">
                <div className="compare-icon"><FaRegTimesCircle size={16} /></div>
                <div className="compare-text"><h4>Mentorship</h4><p>Academic Teachers</p></div>
              </div>
            </div>

            {/* VS Badge */}
            <div className="vs-circle">VS</div>

            {/* Accenlearn IOTIP + IBM */}
            <div className="compare-col col-accenlearn">
              <h3 style={{ textAlign: 'center', color: 'white', fontSize: '1.45rem', margin: '0 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>Accenlearn IOTIP + <IbmLogo size={20} style={{ color: '#60A5FA' }} /></h3>
              
              <div className="compare-item">
                <div className="compare-icon"><FaRegCheckCircle size={16} /></div>
                <div className="compare-text"><h4>Certification & Credentials</h4><p>Global IBM Certificate + Internship LOR</p></div>
              </div>
              <div className="compare-item">
                <div className="compare-icon"><FaRegCheckCircle size={16} /></div>
                <div className="compare-text"><h4>Project Experience</h4><p>Live Startup & MNC Repositories</p></div>
              </div>
              <div className="compare-item">
                <div className="compare-icon"><FaRegCheckCircle size={16} /></div>
                <div className="compare-text"><h4>Interactive LMS</h4><p>Code Console, ATS Checker, AI Mocks</p></div>
              </div>
              <div className="compare-item">
                <div className="compare-icon"><FaRegCheckCircle size={16} /></div>
                <div className="compare-text"><h4>Job Placement</h4><p>Dedicated In-Platform MNC Portal & Drives</p></div>
              </div>
              <div className="compare-item">
                <div className="compare-icon"><FaRegCheckCircle size={16} /></div>
                <div className="compare-text"><h4>Mentorship</h4><p>Active Corporate Tech Leads & Architects</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-padding section-testimonials">
        <div className="section-header" style={{ marginBottom: 40 }}>
          <h2 className="section-title">What Our <span className="gradient-text">Alumni Say</span></h2>
        </div>
        <div className="testimonial-wrapper">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="testi-swiper"
          >
            <SwiperSlide>
              <div className="testi-card">
                <div className="testi-img-wrap">
                  <img src="/assets/alumni_testimonial.jpg" alt="Alumni" />
                </div>
                <div>
                  <div style={{ display: "flex", gap: 4, color: "#F59E0B", marginBottom: 20 }}>
                    {[1,2,3,4,5].map(i => <FaStar key={i} />)}
                  </div>
                  <div className="testi-quote">
                    "The IBM certification got my resume past the HR filter, but the live projects and mock interviews were what actually helped me clear the technical rounds. Accenlearn gives you the complete package."
                  </div>
                  <div className="testi-author">Priya Sharma</div>
                  <div className="testi-role">Software Engineer @ Infosys (150% Hike)</div>
                </div>
              </div>
            </SwiperSlide>
            {/* Can add more slides here */}
          </Swiper>
        </div>
      </section>

      {/* ── Gamified Form / Application Sheet ── */}
      <section className="enroll-section" ref={formRef}>
        <div className="section-header">
          <span className="section-tag">Winter Internship 2026 Application Sheet</span>
          <h2 className="section-title">
            Winter Internship 2026 <span className="gradient-text">Registration Sheet</span>
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 660, margin: "10px auto 0", fontSize: "0.98rem" }}>
            <strong>Industry Oriented Training &amp; Internship Program (IOTIP)</strong> — Fill this sheet to reserve your winter internship cohort, lock in IBM certification credentials, and receive your official offer letter.
          </p>
        </div>

        {/* Value Assurance Badges Above Sheet */}
        <div className="sheet-perks-strip">
          <div className="s-perk"><span>✓</span> College NOC &amp; Credit Approved</div>
          <div className="s-perk"><span>✓</span> Live Startup Repository PRs</div>
          <div className="s-perk"><span>✓</span> Official IBM Certification</div>
          <div className="s-perk"><span>✓</span> Verified LOR &amp; Experience Certificate</div>
          <div className="s-perk"><span>✓</span> 500+ MNC Placement Drives</div>
        </div>

        <div className="form-container">
          {status === "SUCCESS" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: 80, height: 80, background: "rgba(16,185,129,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "#10B981" }}>
                <FaCheckCircle size={40} />
              </div>
              <h3 style={{ fontSize: "2rem", marginBottom: 12 }}>You're all set! 🎉</h3>
              
              {submittedRefId && (
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#F5F3ED",
                  border: "1px solid #D6D3CB",
                  padding: "8px 22px",
                  borderRadius: "50px",
                  fontWeight: "700",
                  fontSize: "0.92rem",
                  color: "#111",
                  margin: "0 auto 20px"
                }}>
                  Registration ID: <span style={{ color: "#0F62FE", fontFamily: "monospace", fontSize: "1rem" }}>{submittedRefId}</span>
                </div>
              )}

              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: 540, margin: "0 auto 20px", lineHeight: 1.6 }}>
                Your Winter Internship 2026 application sheet has been successfully recorded in our system. Our academic counsellor will connect with you within 24 hours.
              </p>

              <div style={{
                background: "rgba(37, 211, 102, 0.1)",
                border: "1px solid #25D366",
                borderRadius: "12px",
                padding: "14px 22px",
                maxWidth: 520,
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "#15803D",
                fontWeight: 700,
                fontSize: "0.95rem"
              }}>
                <FaSpinner className="fa-spin" style={{ color: "#25D366", fontSize: "1.1rem" }} />
                <span>Redirecting you to the official WhatsApp Group...</span>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
                <a 
                  href={WHATSAPP_GROUP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-glow" 
                  style={{ 
                    background: "#25D366", 
                    borderColor: "#25D366",
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: 8,
                    textDecoration: "none",
                    color: "#ffffff"
                  }}
                >
                  <FaWhatsapp size={19} /> Join WhatsApp Group Now
                </a>
                <button className="btn-secondary" onClick={() => { setStatus("IDLE"); setSubmittedRefId(""); }}>
                  Submit Another Sheet
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Progress Bar */}
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${calculateProgress()}%` }}></div>
              </div>

              {/* Step 1: Contact Details (Items 1-5 in exact order) */}
              {formStep === 1 && (
                <div className="form-step">
                  <h3 className="form-step-title">1. Student Contact Information</h3>
                  <div className="form-grid">
                    {/* 1. Full Name */}
                    <div className="form-group full-w">
                      <label className="form-label">Full Name *</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        placeholder="e.g. Rahul Kumar" 
                        required 
                      />
                    </div>
                    {/* 2. Phone Number */}
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input 
                        className="form-input" 
                        type="tel" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                        placeholder="+91 98765 43210" 
                        required 
                      />
                    </div>
                    {/* 3. WhatsApp Number */}
                    <div className="form-group">
                      <label className="form-label">WhatsApp Number *</label>
                      <input 
                        className="form-input" 
                        type="tel" 
                        name="whatsappNumber" 
                        value={formData.whatsappNumber} 
                        onChange={handleChange} 
                        placeholder="+91 98765 43210" 
                        required 
                      />
                    </div>
                    {/* 4. College Email */}
                    <div className="form-group">
                      <label className="form-label">College Email *</label>
                      <input 
                        className="form-input" 
                        type="email" 
                        name="collegeEmail" 
                        value={formData.collegeEmail} 
                        onChange={handleChange} 
                        placeholder="student@college.edu.in" 
                        required 
                      />
                    </div>
                    {/* 5. Personal Email */}
                    <div className="form-group">
                      <label className="form-label">Personal Email *</label>
                      <input 
                        className="form-input" 
                        type="email" 
                        name="personalEmail" 
                        value={formData.personalEmail} 
                        onChange={handleChange} 
                        placeholder="student.personal@gmail.com" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-actions" style={{ justifyContent: "flex-end" }}>
                    <button type="button" className="btn-glow" onClick={nextStep}>
                      Next Step <MdArrowForward style={{ display: "inline", verticalAlign: "middle" }} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Academic Details */}
              {formStep === 2 && (
                <div className="form-step">
                  <h3 className="form-step-title">2. Location &amp; College Background</h3>
                  <div className="form-grid">
                    {/* State / Region */}
                    <div className="form-group full-w">
                      <label className="form-label">State / Region *</label>
                      <select 
                        className="form-select" 
                        name="stateRegion" 
                        value={formData.stateRegion} 
                        onChange={handleChange} 
                        required
                      >
                        <option value="">— Select your state / region —</option>
                        {INDIAN_STATES_AND_UTS.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                        <optgroup label="International">
                          <option value="Other Country">Other Country</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Conditional Country input if Other Country is selected */}
                    {formData.stateRegion === "Other Country" && (
                      <div className="form-group full-w">
                        <label className="form-label">Specify Country / Region *</label>
                        <input 
                          className="form-input" 
                          type="text" 
                          name="otherCountry" 
                          value={formData.otherCountry} 
                          onChange={handleChange} 
                          placeholder="e.g. United States, United Kingdom, UAE, Canada" 
                          required 
                        />
                      </div>
                    )}

                    {/* College Name */}
                    <div className="form-group full-w">
                      <label className="form-label">College Name *</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        name="collegeName" 
                        value={formData.collegeName} 
                        onChange={handleChange} 
                        placeholder="e.g. IIT Madras / VIT Vellore / BITS Pilani" 
                        required 
                      />
                    </div>
                    {/* Branch or Stream (50% width) */}
                    <div className="form-group">
                      <label className="form-label">Branch or Stream *</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        name="branchOrStream" 
                        value={formData.branchOrStream} 
                        onChange={handleChange} 
                        placeholder="e.g. CSE / IT / AI &amp; ML / Commerce" 
                        required 
                      />
                    </div>

                    {/* Year of Passing / Study (beside branch) */}
                    <div className="form-group">
                      <label className="form-label">Year of Passing / Study *</label>
                      <select 
                        className="form-select" 
                        name="year" 
                        value={formData.year || ""} 
                        onChange={handleChange} 
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Pass Out">Pass Out</option>
                      </select>
                    </div>

                    {/* Preferred Language (Multi-Select) placed in Step 2 */}
                    <div className="form-group full-w" style={{ marginTop: 8, paddingTop: 16, borderTop: "1px dashed rgba(0,0,0,0.12)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                        <label className="form-label" style={{ margin: 0 }}>
                          Preferred Language * <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "#666" }}>(Select one or multiple options)</span>
                        </label>
                        {(formData.preferredLanguages || []).length > 0 && (
                          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F62FE" }}>
                            ✓ {(formData.preferredLanguages || []).length} selected: {(formData.preferredLanguages || []).join(", ")}
                          </span>
                        )}
                      </div>
                      <p style={{ color: "var(--text-muted)", marginBottom: 10, fontSize: "0.85rem" }}>
                        Choose all languages you are comfortable with for training &amp; mentorship:
                      </p>

                      <div className="lang-chip-group">
                        {PREFERRED_LANGUAGES.map((lang, idx) => {
                          const isSelected = (formData.preferredLanguages || []).includes(lang);
                          return (
                            <div
                              key={idx}
                              className={`lang-chip ${isSelected ? "selected" : ""}`}
                              onClick={() => handleLanguageToggle(lang)}
                            >
                              <span>{lang}</span>
                              {isSelected && <FaCheckCircle style={{ fontSize: "0.85rem", color: "#60A5FA" }} />}
                            </div>
                          );
                        })}
                      </div>

                      {(formData.preferredLanguages || []).includes("Other") && (
                        <div className="form-group full-w" style={{ marginTop: 12 }}>
                          <label className="form-label">Specify Other Language(s) *</label>
                          <input
                            className="form-input"
                            type="text"
                            name="otherLanguage"
                            value={formData.otherLanguage || ""}
                            onChange={(e) => setFormData({ ...formData, otherLanguage: e.target.value })}
                            placeholder="e.g. Odia, Punjabi, Assamese, French, etc."
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                    <button type="button" className="btn-glow" onClick={nextStep}>
                      Next Step <MdArrowForward style={{ display: "inline", verticalAlign: "middle" }} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Domain Track Selection (Single Choice) */}
              {formStep === 3 && (
                <div className="form-step">
                  <h3 className="form-step-title">3. Choose Your Winter Internship Track</h3>
                  
                  {/* 10. Domain */}
                  <label className="form-label" style={{ marginBottom: 6, display: "block" }}>
                    Select Your Domain Track * {formData.domain ? <span style={{ color: "#0F62FE", fontWeight: 700 }}>— Selected: {formData.domain}</span> : <span style={{ color: "#666", fontWeight: 400 }}>(Choose 1 Domain Track)</span>}
                  </label>
                  <p style={{ color: "var(--text-muted)", marginBottom: 14, fontSize: "0.88rem" }}>
                    Please select the single domain track you want to specialize in during this winter internship.
                  </p>
                  
                  {/* Category Filter for Form */}
                  <div className="domain-form-filter">
                    {[
                      { label: "All (24)", key: "All" },
                      { label: "Tech / IT (16)", key: "Tech" },
                      { label: "Management (6)", key: "Management" },
                      { label: "Medical (2)", key: "Medical" },
                    ].map((cat, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`df-btn ${selectedFormCategory === cat.key ? "active" : ""}`}
                        onClick={() => setSelectedFormCategory(cat.key)}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="domain-chip-group">
                    {filteredFormDomains.map((d, i) => {
                      const isSelected = formData.domain === d.label || (formData.domains || []).includes(d.label);
                      return (
                        <div 
                          key={i} 
                          className={`d-chip ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleDomainToggle(d.label)}
                        >
                          <d.icon />
                          <span>{d.label}</span>
                          {isSelected && <FaCheckCircle style={{ marginLeft: 4, fontSize: '0.85rem' }} />}
                        </div>
                      );
                    })}
                  </div>

                  {status === "ERROR" && (
                    <div style={{
                      background: "#FEE2E2",
                      border: "1px solid #F87171",
                      color: "#991B1B",
                      padding: "12px 18px",
                      borderRadius: "8px",
                      marginTop: "16px",
                      fontSize: "0.88rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px"
                    }}>
                      <span>⚠️ {errorMessage || "Submission failed. Please check your internet connection and try again."}</span>
                      <button 
                        type="button" 
                        onClick={() => setStatus("IDLE")} 
                        style={{ background: "none", border: "none", color: "#991B1B", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {/* Declaration & Acknowledgement Checkbox */}
                  <div 
                    className="declaration-box"
                    style={{
                      marginTop: "22px",
                      marginBottom: "18px",
                      padding: "14px 18px",
                      background: formData.acknowledged ? "rgba(16, 185, 129, 0.06)" : "#F8FAFC",
                      border: formData.acknowledged ? "1.5px solid #10B981" : "1.5px solid #CBD5E1",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "left"
                    }}
                    onClick={() => setFormData((prev) => ({ ...prev, acknowledged: !prev.acknowledged }))}
                  >
                    <input
                      type="checkbox"
                      id="declaration-acknowledgement"
                      name="declaration"
                      checked={!!formData.acknowledged}
                      onChange={(e) => setFormData((prev) => ({ ...prev, acknowledged: e.target.checked }))}
                      onClick={(e) => e.stopPropagation()}
                      required
                      style={{
                        marginTop: "3px",
                        width: "19px",
                        height: "19px",
                        accentColor: "#0F62FE",
                        cursor: "pointer",
                        flexShrink: 0
                      }}
                    />
                    <label 
                      htmlFor="declaration-acknowledgement"
                      style={{
                        fontSize: "0.88rem",
                        lineHeight: 1.55,
                        color: "#334155",
                        cursor: "pointer",
                        userSelect: "none",
                        margin: 0
                      }}
                    >
                      <strong style={{ color: "#0F172A", fontWeight: 700 }}>Declaration &amp; Acknowledgement:</strong>{" "}
                      I confirm all details are accurate and understand that a nominal program fee applies for iotip 2026.
                    </label>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                    <button 
                      type="submit" 
                      className="btn-glow" 
                      disabled={status === "SUBMITTING"}
                      style={{
                        opacity: (!formData.acknowledged && status !== "SUBMITTING") ? 0.8 : 1
                      }}
                    >
                      {status === "SUBMITTING" ? <><FaSpinner className="fa-spin" style={{ marginRight: 8 }} /> Submitting...</> : "Submit Registration"}
                    </button>
                  </div>
                  <div style={{ textAlign: "center", marginTop: 20, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    🔒 100% Secure. We never share your data.
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </section>
      <style>{`
        .fa-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

export default IotipPage;
