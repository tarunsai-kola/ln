const fs = require('fs');
const path = require('path');

const layoutPath = path.join(__dirname, 'src', 'Components', 'PremiumCourseLayout.jsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

const correctImports = `import PaymentPlanWidget from "./PaymentPlanWidget";
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

`;

// Remove leading empty lines or any leftover imports just in case
layoutContent = layoutContent.replace(/^[\s\S]*?(?=import careerPath0)/, '');
layoutContent = correctImports + layoutContent;
fs.writeFileSync(layoutPath, layoutContent, 'utf8');


const vlsiPath = path.join(__dirname, 'src', 'page', 'VLSI.jsx');
const vlsiContent = `import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const VLSI = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
    heroTitle: "Advanced VLSI Design",
    heroSubtitle: "Build job-ready skills in RTL Design, SystemVerilog Verification, and SoC Architecture in this intensive 20-week program.",
    toolsSubtitle: "Master the modern VLSI & Semiconductor design stack",
    trackSubtitle: "A dedicated VLSI track for every stage of your career.",
    trackButtonLabel: "Start Your VLSI Career →",
    projectLabel: "VLSI Project",
    careerOutcomesDomain: "VLSI",
    trustStats: [
      { value: "20 Weeks", label: "Duration" },
      { value: "100% Online", label: "Format" },
      { value: "10+ Projects", label: "Hands-on Practice" },
      { value: "1 Capstone", label: "Real Projects" },
      { value: "GenAI", label: "Core Focus" }
    ],
    toolsList: [
      { name: "Verilog", img: "/icons/verilog.svg" },
      { name: "SystemVerilog", img: "/icons/systemverilog.svg" },
      { name: "Cadence", img: "/icons/cadence.svg" },
      { name: "Synopsys", img: "/icons/synopsys.svg" },
      { name: "ModelSim", img: "/icons/modelsim.svg" },
      { name: "Xilinx", img: "/icons/xilinx.svg" },
      { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "UVM", img: "/icons/uvm.svg" }
    ],
    careerPaths: [
      {
        exp: "0–2 Years",
        title: "VLSI Engineers & Junior Verification Engineers",
        desc: "Build the foundational Digital Logic, Verilog, and SV skills to transition into high-growth VLSI Design roles.",
        benefits: ["End-to-end workflows across RTL design and simulation", "Understanding of computer architecture and CMOS fundamentals", "Hands-on custom processor design and FPGA prototyping"],
        quote: "I want to move beyond academic concepts and start designing real semiconductor logic.",
        image: careerPath0
      },
      {
        exp: "2–6 Years",
        title: "Mid-Level ASIC & Verification Engineers",
        desc: "Move from solid contributor to an advanced Verification Engineer capable of implementing UVM testbenches.",
        benefits: ["Architect reusable testbenches with UVM methodologies", "Master advanced SystemVerilog constructs and coverage", "Debug complex IP blocks and SoC interfaces"],
        quote: "I need to upgrade my skills from basic Verilog to modern, industry-standard UVM verification.",
        image: careerPath1
      },
      {
        exp: "6–10+ Years",
        title: "ASIC Architects & Tech Leads",
        desc: "Lead chip transformation—design enterprise-scale SoC architectures and manage high-performing VLSI teams.",
        benefits: ["Enterprise SoC Strategy and Physical Design Governance", "Taping out high-performance chips at lower process nodes", "Leading hardware engineering teams and maximizing yield"],
        quote: "My focus is on architecture, scalability, and PPA. I need to design SoCs that drive hardware innovation.",
        image: careerPath2
      }
    ],
    phases: [
      {
        id: "phase-1",
        phase: "PHASE 1",
        duration: "WEEKS 1–4",
        title: "Digital Logic & Verilog",
        focusLabel: "CURRICULUM",
        focus: ["Python for VLSI Design & Advanced Data Analysis (EDA)", "Data Visualization with Power BI & Tableau", "SQL for Data Professionals (Joins, CTEs, Window Functions)", "Statistics & Probability Foundations for ML"],
        application: "Sales Data Dashboard, Customer Analytics DB, EDA Reports"
      },
      {
        id: "phase-2",
        phase: "PHASE 2",
        duration: "WEEKS 5–8",
        title: "Machine Learning & AI",
        focusLabel: "CURRICULUM",
        focus: ["Machine Learning Fundamentals (Supervised & Unsupervised)", "Advanced ML: Random Forest, XGBoost, Neural Networks", "Vector Databases, RAG Pipelines & Prompt Engineering"],
        application: "Customer Churn Prediction, Sales Forecasting, AI Research Assistant"
      },
      {
        id: "phase-3",
        phase: "PHASE 3",
        duration: "WEEKS 9–12",
        title: "Industry Capstone Project",
        focusLabel: "CURRICULUM",
        focus: ["Industry Capstone Planning (Marketing, Finance, Healthcare, etc.)", "Data Pipeline Creation & Model Building", "Advanced AI Integration (LLM-Based Insights)", "Deployment & GitHub Portfolio Building"],
        application: "Deliver a Portfolio-Ready Generative AI Industry Project"
      },
      {
        id: "phase-4",
        phase: "PHASE 4",
        duration: "WEEKS 13–16",
        title: "Placement Preparation",
        focusLabel: "CURRICULUM",
        focus: ["Resume & LinkedIn Mastery (ATS-Friendly)", "Technical & HR Interview Preparation (Python, SQL, ML, GenAI)", "Business Case Studies & Analytics Challenges", "Dedicated Placement Cell & Referral Opportunities"],
        application: "Industry-Ready Resume, Interview Readiness, Job Placement Opportunities"
      }
    ],
    capstoneProjects: [
      { icon: "TerminalSquare", title: "16-bit RISC Processor Design", desc: "Design, code, and simulate a custom 16-bit RISC CPU architecture with a pipelined datapath.", tools: ["Verilog", "ModelSim", "EDA"] },
      { icon: "CheckCircle2", title: "AMBA AHB Bus Verification", desc: "Develop a robust UVM testbench to verify the standard AMBA AHB bus protocol and interface.", tools: ["SystemVerilog", "UVM", "Cadence"] },
      { icon: "Layers", title: "ASIC Standard Cell Layout", desc: "Perform physical design, placement, and routing for standard cells in a modern process node.", tools: ["Synopsis", "Layout", "DRC/LVS"] },
      { icon: "Network", title: "FIFO Memory Controller", desc: "Design an asynchronous FIFO memory controller addressing advanced Clock Domain Crossing (CDC).", tools: ["CDC", "Logic Synthesis", "Verilog"] },
      { icon: "Code", title: "UART Communication IP", desc: "Develop a reusable UART IP core for serial communication in modern SoC architectures.", tools: ["IP Design", "FPGA", "Simulation"] }
    ],
    faqData: [
      { q: "What is the duration of the program?", a: "The program runs for 20 weeks (5 months), 100% online with live weekend sessions." },
      { q: "Who is this program for?", a: "ECE, EE students, and electronics engineers looking to master VLSI Design, Verilog, and Hardware modeling." },
      { q: "Will I get certified?", a: "Yes. You earn Professional Certifications in VLSI Design, SystemVerilog Verification, and Physical Design." },
      { q: "Do you provide placement support?", a: "Yes, Phase 4 is entirely dedicated to Resume Mastery, Interview Prep, Case Studies, and Core Company Placement Support." },
      { q: "What kind of projects will I build?", a: "You will build 10+ hands-on projects, ranging from RISC Processor Design to UVM Testbenches and SoC IP Cores." }
    ]
  };

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  return <PremiumCourseLayout data={courseData} />;
};

export default VLSI;
`;

fs.writeFileSync(vlsiPath, vlsiContent, 'utf8');

// Do the same for DataScience
const dsPath = path.join(__dirname, 'src', 'page', 'DataScience.jsx');
const dsContent = `import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const DataScience = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
    heroTitle: "Advanced Data Science & GenAI",
    heroSubtitle: "Build job-ready skills in Data Analytics, Machine Learning, and AI-Powered Data Products in this intensive 16-week program.",
    toolsSubtitle: "Master the modern Data Science & AI stack",
    trackSubtitle: "A dedicated Data track for every stage of your career.",
    trackButtonLabel: "Start Your Data Career →",
    projectLabel: "Data Project",
    careerOutcomesDomain: "DataScience",
    trustStats: [
      { value: "16 Weeks", label: "Duration" },
      { value: "100% Online", label: "Format" },
      { value: "10+ Projects", label: "Hands-on Practice" },
      { value: "1 Capstone", label: "Real Projects" },
      { value: "GenAI", label: "Core Focus" }
    ],
    toolsList: [
      { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      { name: "PowerBI", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
      { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
      { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" }
    ],
    careerPaths: [
      {
        exp: "0–2 Years",
        title: "Data Analysts & Junior ML Engineers",
        desc: "Build the foundational Python, SQL, and Data Visualization skills to transition into high-growth data roles.",
        benefits: ["End-to-end workflows across descriptive and predictive analytics", "Understanding of database architecture and modern ETL", "Hands-on BI dashboarding and data storytelling"],
        quote: "I want to move beyond spreadsheets and start writing scalable Python and SQL pipelines.",
        image: careerPath0
      },
      {
        exp: "2–6 Years",
        title: "Mid-Level Data Scientists & AI Engineers",
        desc: "Move from solid contributor to an advanced Machine Learning engineer capable of deploying GenAI apps.",
        benefits: ["Architect ML models using advanced supervised/unsupervised learning", "Master Deep Learning frameworks (TensorFlow, PyTorch)", "Build GenAI applications powered by LLMs and LangChain"],
        quote: "I need to upgrade my skills from basic ML to modern, industry-standard Deep Learning and Generative AI.",
        image: careerPath1
      },
      {
        exp: "6–10+ Years",
        title: "Data Architects & Tech Leads",
        desc: "Lead data transformation—design enterprise-scale AI architectures and manage high-performing data teams.",
        benefits: ["Enterprise AI Strategy and ML Pipeline Governance", "Deploying high-performance models in the cloud", "Leading data engineering teams and maximizing ROI"],
        quote: "My focus is on architecture, scalability, and ROI. I need to design pipelines that drive AI innovation.",
        image: careerPath2
      }
    ],
    phases: [
      {
        id: "phase-1",
        phase: "PHASE 1",
        duration: "WEEKS 1–4",
        title: "Data Foundations & EDA",
        focusLabel: "CURRICULUM",
        focus: ["Python for Data Science (NumPy, Pandas)", "Data Visualization with Power BI", "Advanced SQL (Joins, CTEs, Window Functions)", "Statistics & Probability Foundations for ML"],
        application: "Sales Data Dashboard, Customer Analytics DB"
      },
      {
        id: "phase-2",
        phase: "PHASE 2",
        duration: "WEEKS 5–8",
        title: "Machine Learning & AI",
        focusLabel: "CURRICULUM",
        focus: ["Machine Learning Fundamentals", "Advanced ML: Random Forest, XGBoost", "Vector Databases, RAG Pipelines & GenAI"],
        application: "Customer Churn Prediction, AI Research Assistant"
      },
      {
        id: "phase-3",
        phase: "PHASE 3",
        duration: "WEEKS 9–12",
        title: "Industry Capstone Project",
        focusLabel: "CURRICULUM",
        focus: ["Industry Capstone Planning", "Data Pipeline Creation & Model Building", "Deployment & GitHub Portfolio Building"],
        application: "Deliver a Portfolio-Ready Generative AI Project"
      },
      {
        id: "phase-4",
        phase: "PHASE 4",
        duration: "WEEKS 13–16",
        title: "Placement Preparation",
        focusLabel: "CURRICULUM",
        focus: ["Resume & LinkedIn Mastery", "Technical & HR Interview Preparation", "Business Case Studies"],
        application: "Industry-Ready Resume, Interview Readiness"
      }
    ],
    capstoneProjects: [
      { icon: "TerminalSquare", title: "Customer Segmentation Engine", desc: "Build a K-Means clustering model to analyze customer data.", tools: ["Python", "Scikit", "Pandas"] },
      { icon: "CheckCircle2", title: "Predictive Maintenance App", desc: "Develop an ML model that predicts equipment failure.", tools: ["TensorFlow", "AWS", "Docker"] }
    ],
    faqData: [
      { q: "What is the duration of the program?", a: "16 weeks (4 months), 100% online." },
      { q: "Who is this program for?", a: "Professionals looking to transition into Data Science and AI." },
      { q: "Will I get certified?", a: "Yes. You earn Professional Certifications in Data Science and GenAI." },
      { q: "Do you provide placement support?", a: "Yes, Phase 4 is entirely dedicated to Resume Mastery, Interview Prep, and Core Company Placement Support." }
    ]
  };

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  return <PremiumCourseLayout data={courseData} />;
};

export default DataScience;
`;
fs.writeFileSync(dsPath, dsContent, 'utf8');
console.log('Fixed everything!');
