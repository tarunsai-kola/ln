Created At: 2026-07-28T19:24:01Z
Completed At: 2026-07-28T19:24:01Z
File Path: `file:///e:/testing/frontend/src/page/VLSI.jsx`
Total Lines: 647
Total Bytes: 32671
Showing lines 1 to 200
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import PaymentPlanWidget from "../Components/PaymentPlanWidget";
2: import React, { useState, useEffect } from "react";
3: import { motion } from "framer-motion";
4: import {
5:   ChevronDown, CheckCircle2, TerminalSquare, Network, BrainCircuit,
6:   ShieldCheck, Workflow, Layers, ArrowRight,
7:   Briefcase, TrendingUp, Landmark, BarChart3, UserCheck, Code
8: } from "lucide-react";
9: import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
10: import PremiumCurriculum from "../Components/PremiumCurriculum";
11: import ProgramStatsBar from "../Components/ProgramStatsBar";
12: import TopOnePercent from "../Components/TopOnePercent";
13: import Certification from "./AdvanceCourse/Components/Certification";
14: import ApplyNowButton from "./AdvanceCourse/Components/ApplyNowButton";
15: import SalaryGrowth from "../Components/SalaryGrowth";
16: import CareerOutcomes from "../Components/CareerOutcomes";
17: import MarketLeaders from "../Components/MarketLeaders";
18: import MeetYourMentors from "../Components/MeetYourMentors";
19: import FloatingNav from "../Components/FloatingNav";
20: import AuthorityMarquee from "../Components/AuthorityMarquee";
21: import "./VLSI.css";
22: 
23: import heroDsGraphic from "../assets/ds_hero_gold_1.png";
24: import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
25: import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";
26: 
27: const heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
28: 
29: import careerPath0 from "../assets/career_path_0_2.png";
30: import careerPath1 from "../assets/career_path_2_6.png";
31: import careerPath2 from "../assets/career_path_6_10.png";
32: 
33: /* ─── Static Data ─── */
34: const trustStats = [
35:   { value: "20 Weeks", label: "Duration" },
36:   { value: "100% Online", label: "Format" },
37:   { value: "10+ Projects", label: "Hands-on Practice" },
38:   { value: "1 Capstone", label: "Real Projects" },
39:   { value: "GenAI", label: "Core Focus" },
40: ];
41: 
42: 
43: const toolsList = [
44:   { name: "Verilog", img: "/icons/verilog.svg" },
45:   { name: "SystemVerilog", img: "/icons/systemverilog.svg" },
46:   { name: "Cadence", img: "/icons/cadence.svg" },
47:   { name: "Synopsys", img: "/icons/synopsys.svg" },
48:   { name: "ModelSim", img: "/icons/modelsim.svg" },
49:   { name: "Xilinx", img: "/icons/xilinx.svg" },
50:   { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
51:   { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
52:   { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
53:   { name: "UVM", img: "/icons/uvm.svg" },
54: ];
55: 
56: const careerPaths = [
57:   {
58:     exp: "0–2 Years",
59:     title: "VLSI Engineers & Junior Verification Engineers",
60:     desc: "Build the foundational Digital Logic, Verilog, and SV skills to transition into high-growth VLSI Design roles.",
61:     benefits: [
62:       "End-to-end workflows across RTL design and simulation",
63:       "Understanding of computer architecture and CMOS fundamentals",
64:       "Hands-on custom processor design and FPGA prototyping"
65:     ],
66:     quote: "I want to move beyond academic concepts and start designing real semiconductor logic.",
67:     image: careerPath0,
68:   },
69:   {
70:     exp: "2–6 Years",
71:     title: "Mid-Level ASIC & Verification Engineers",
72:     desc: "Move from solid contributor to an advanced Verification Engineer capable of implementing UVM testbenches.",
73:     benefits: [
74:       "Architect reusable testbenches with UVM methodologies",
75:       "Master advanced SystemVerilog constructs and coverage",
76:       "Debug complex IP blocks and SoC interfaces"
77:     ],
78:     quote: "I need to upgrade my skills from basic Verilog to modern, industry-standard UVM verification.",
79:     image: careerPath1,
80:   },
81:   {
82:     exp: "6–10+ Years",
83:     title: "ASIC Architects & Tech Leads",
84:     desc: "Lead chip transformation—design enterprise-scale SoC architectures and manage high-performing VLSI teams.",
85:     benefits: [
86:       "Enterprise SoC Strategy and Physical Design Governance",
87:       "Taping out high-performance chips at lower process nodes",
88:       "Leading hardware engineering teams and maximizing yield"
89:     ],
90:     quote: "My focus is on architecture, scalability, and PPA. I need to design SoCs that drive hardware innovation.",
91:     image: careerPath2,
92:   },
93: ];
94: 
95: const dsPhases = [
96:   {
97:     id: "phase-1",
98:     phase: "PHASE 1",
99:     duration: "WEEKS 1–4",
100:     title: "Digital Logic & Verilog",
101:     focusLabel: "CURRICULUM",
102:     focus: [
103:       "Python for VLSI Design & Advanced Data Analysis (EDA)",
104:       "Data Visualization with Power BI & Tableau",
105:       "SQL for Data Professionals (Joins, CTEs, Window Functions)",
106:       "Statistics & Probability Foundations for ML"
107:     ],
108:     application: "Sales Data Dashboard, Customer Analytics DB, EDA Reports"
109:   },
110:   {
111:     id: "phase-2",
112:     phase: "PHASE 2",
113:     duration: "WEEKS 5–8",
114:     title: "Machine Learning & AI",
115:     focusLabel: "CURRICULUM",
116:     focus: [
117:       "Machine Learning Fundamentals (Supervised & Unsupervised)",
118:       "Advanced ML: Random Forest, XGBoost, Neural Networks",
119:       "Generative AI & LLM Engineering with LangChain",
120:       "Vector Databases, RAG Pipelines & Prompt Engineering"
121:     ],
122:     application: "Customer Churn Prediction, Sales Forecasting, AI Research Assistant"
123:   },
124:   {
125:     id: "phase-3",
126:     phase: "PHASE 3",
127:     duration: "WEEKS 9–12",
128:     title: "Industry Capstone Project",
129:     focusLabel: "CURRICULUM",
130:     focus: [
131:       "Industry Capstone Planning (Marketing, Finance, Healthcare, etc.)",
132:       "Data Pipeline Creation & Model Building",
133:       "Advanced AI Integration (LLM-Based Insights)",
134:       "Deployment & GitHub Portfolio Building"
135:     ],
136:     application: "Deliver a Portfolio-Ready Generative AI Industry Project"
137:   },
138:   {
139:     id: "phase-4",
140:     phase: "PHASE 4",
141:     duration: "WEEKS 13–16",
142:     title: "Placement Preparation",
143:     focusLabel: "CURRICULUM",
144:     focus: [
145:       "Resume & LinkedIn Mastery (ATS-Friendly)",
146:       "Technical & HR Interview Preparation (Python, SQL, ML, GenAI)",
147:       "Business Case Studies & Analytics Challenges",
148:       "Dedicated Placement Cell & Referral Opportunities"
149:     ],
150:     application: "Industry-Ready Resume, Interview Readiness, Job Placement Opportunities"
151:   }
152: ];
153: 
154: const capstoneProjects = [
155:   { icon: TerminalSquare, title: "16-bit RISC Processor Design", desc: "Design, code, and simulate a custom 16-bit RISC CPU architecture with a pipelined datapath.", tools: ["Verilog", "ModelSim", "EDA"] },
156:   { icon: CheckCircle2, title: "AMBA AHB Bus Verification", desc: "Develop a robust UVM testbench to verify the standard AMBA AHB bus protocol and interface.", tools: ["SystemVerilog", "UVM", "Cadence"] },
157:   { icon: Layers, title: "ASIC Standard Cell Layout", desc: "Perform physical design, placement, and routing for standard cells in a modern process node.", tools: ["Synopsis", "Layout", "DRC/LVS"] },
158:   { icon: Network, title: "FIFO Memory Controller", desc: "Design an asynchronous FIFO memory controller addressing advanced Clock Domain Crossing (CDC).", tools: ["CDC", "Logic Synthesis", "Verilog"] },
159:   { icon: Code, title: "UART Communication IP", desc: "Develop a reusable UART IP core for serial communication in modern SoC architectures.", tools: ["IP Design", "FPGA", "Simulation"] },
160: ];
161: 
162: const faqData = [
163:   { q: "What is the duration of the program?", a: "The program runs for 20 weeks (5 months), 100% online with live weekend sessions." },
164:   { q: "Who is this program for?", a: "ECE, EE students, and electronics engineers looking to master VLSI Design, Verilog, and Hardware modeling." },
165:   { q: "Will I get certified?", a: "Yes. You earn Professional Certifications in VLSI Design, SystemVerilog Verification, and Physical Design." },
166:   { q: "Do you provide placement support?", a: "Yes, Phase 4 is entirely dedicated to Resume Mastery, Interview Prep, Case Studies, and Core Company Placement Support." },
167:   { q: "What kind of projects will I build?", a: "You will build 10+ hands-on projects, ranging from RISC Processor Design to UVM Testbenches and SoC IP Cores." },
168: ];
169: 
170: const VLSI = () => {
171:   const [openFaqIdx, setOpenFaqIdx] = useState(null);
172:   const [showPopup, setShowPopup] = useState(false);
173:   const [activeCareerPath, setActiveCareerPath] = useState(0);
174:   const [isCareerPathHovered, setIsCareerPathHovered] = useState(false);
175:   const [heroImageIdx, setHeroImageIdx] = useState(0);
176: 
177:   useEffect(() => {
178:     window.scrollTo(0, 0);
179:   }, []);
180: 
181:   // Auto-rotate Hero Images
182:   useEffect(() => {
183:     const timer = setInterval(() => {
184:       setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
185:     }, 4000);
186:     return () => clearInterval(timer);
187:   }, []);
188: 
189:   // Auto-rotate Career Paths
190:   useEffect(() => {
191:     if (isCareerPathHovered) return;
192:     const timer = setInterval(() => {
193:       setActiveCareerPath((prev) => (prev + 1) % careerPaths.length);
194:     }, 4500);
195:     return () => clearInterval(timer);
196:   }, [isCareerPathHovered]);
197: 
198:   return (
199:     <div className="ds-bg">
200: 
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
