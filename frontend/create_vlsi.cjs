const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'page', 'DataScience.jsx');
const destPath = path.join(__dirname, 'src', 'page', 'VLSI.jsx');

let content = fs.readFileSync(srcPath, 'utf8');

// Basic text replacements
content = content.replace(/DataScience/g, 'VLSI');
content = content.replace(/Data Science \& GenAI/g, 'VLSI Design');
content = content.replace(/Data Science/g, 'VLSI Design');
content = content.replace(/Data Analyst \/ BI Developer/g, 'VLSI Engineer');
content = content.replace(/Data Analysts/g, 'VLSI Engineers');
content = content.replace(/16 Weeks/g, '20 Weeks');

// Specific subtitle and text fixes
content = content.replace(/A dedicated VLSI Design track/g, 'A dedicated VLSI track');
content = content.replace(/Start Your VLSI Design Career/g, 'Start Your VLSI Career');
content = content.replace(/Master the modern VLSI Design \& AI stack/g, 'Master the modern VLSI & Semiconductor design stack');

// Tools List
content = content.replace(
  /const toolsList = \[([\s\S]*?)\];/g,
  `const toolsList = [
  { name: "Verilog", img: "/icons/verilog.svg" },
  { name: "SystemVerilog", img: "/icons/systemverilog.svg" },
  { name: "Cadence", img: "/icons/cadence.svg" },
  { name: "Synopsys", img: "/icons/synopsys.svg" },
  { name: "ModelSim", img: "/icons/modelsim.svg" },
  { name: "Xilinx", img: "/icons/xilinx.svg" },
  { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "UVM", img: "/icons/uvm.svg" },
];`
);

// Phases
content = content.replace(/Python, Data \& Visualization/g, 'Digital Logic & Verilog');
content = content.replace(/Machine Learning \& Predictive Modeling/g, 'Advanced SystemVerilog & UVM');
content = content.replace(/Generative AI \& RAG Systems/g, 'Physical Design & ASIC Flow');
content = content.replace(/Capstone \& Real-World Deployment/g, 'Verification & SOC Capstone');

// Export and Component Name
content = content.replace(/const VLSI Design =/g, 'const VLSI =');
content = content.replace(/export default VLSI Design;/g, 'export default VLSI;');

// Projects
content = content.replace(
  /const capstoneProjects = \[([\s\S]*?)\];/g,
  `const capstoneProjects = [
  { icon: TerminalSquare, title: "16-bit RISC Processor Design", desc: "Design, code, and simulate a custom 16-bit RISC CPU architecture with a pipelined datapath.", tools: ["Verilog", "ModelSim", "EDA"] },
  { icon: CheckCircle2, title: "AMBA AHB Bus Verification", desc: "Develop a robust UVM testbench to verify the standard AMBA AHB bus protocol and interface.", tools: ["SystemVerilog", "UVM", "Cadence"] },
  { icon: Layers, title: "ASIC Standard Cell Layout", desc: "Perform physical design, placement, and routing for standard cells in a modern process node.", tools: ["Synopsis", "Layout", "DRC/LVS"] },
  { icon: Network, title: "FIFO Memory Controller", desc: "Design an asynchronous FIFO memory controller addressing advanced Clock Domain Crossing (CDC).", tools: ["CDC", "Logic Synthesis", "Verilog"] },
  { icon: Code, title: "UART Communication IP", desc: "Develop a reusable UART IP core for serial communication in modern SoC architectures.", tools: ["IP Design", "FPGA", "Simulation"] },
];`
);

// Career Paths
content = content.replace(
  /const careerPaths = \[([\s\S]*?)\];/g,
  `const careerPaths = [
  {
    exp: "0–2 Years",
    title: "VLSI Engineers & Junior Verification Engineers",
    desc: "Build the foundational Digital Logic, Verilog, and SV skills to transition into high-growth VLSI Design roles.",
    benefits: [
      "End-to-end workflows across RTL design and simulation",
      "Understanding of computer architecture and CMOS fundamentals",
      "Hands-on custom processor design and FPGA prototyping"
    ],
    quote: "I want to move beyond academic concepts and start designing real semiconductor logic.",
    image: careerPath0,
  },
  {
    exp: "2–6 Years",
    title: "Mid-Level ASIC & Verification Engineers",
    desc: "Move from solid contributor to an advanced Verification Engineer capable of implementing UVM testbenches.",
    benefits: [
      "Architect reusable testbenches with UVM methodologies",
      "Master advanced SystemVerilog constructs and coverage",
      "Debug complex IP blocks and SoC interfaces"
    ],
    quote: "I need to upgrade my skills from basic Verilog to modern, industry-standard UVM verification.",
    image: careerPath1,
  },
  {
    exp: "6–10+ Years",
    title: "ASIC Architects & Tech Leads",
    desc: "Lead chip transformation—design enterprise-scale SoC architectures and manage high-performing VLSI teams.",
    benefits: [
      "Enterprise SoC Strategy and Physical Design Governance",
      "Taping out high-performance chips at lower process nodes",
      "Leading hardware engineering teams and maximizing yield"
    ],
    quote: "My focus is on architecture, scalability, and PPA. I need to design SoCs that drive hardware innovation.",
    image: careerPath2,
  },
];`
);

// FAQ
content = content.replace(
  /const faqData = \[([\s\S]*?)\];/g,
  `const faqData = [
  { q: "What is the duration of the program?", a: "The program runs for 20 weeks (5 months), 100% online with live weekend sessions." },
  { q: "Who is this program for?", a: "ECE, EE students, and electronics engineers looking to master VLSI Design, Verilog, and Hardware modeling." },
  { q: "Will I get certified?", a: "Yes. You earn Professional Certifications in VLSI Design, SystemVerilog Verification, and Physical Design." },
  { q: "Do you provide placement support?", a: "Yes, Phase 4 is entirely dedicated to Resume Mastery, Interview Prep, Case Studies, and Core Company Placement Support." },
  { q: "What kind of projects will I build?", a: "You will build 10+ hands-on projects, ranging from RISC Processor Design to UVM Testbenches and SoC IP Cores." },
];`
);

// Remove PaymentPlanWidget invocation
content = content.replace(/<PaymentPlanWidget[\s\S]*?\/>/, '');

// Data Project Label fix
content = content.replace(/>VLSI Design Project</g, '>VLSI Project<');

// Hero Section Fixes
content = content.replace(/Advanced VLSI Design \&/g, 'Advanced VLSI Design');
content = content.replace(
  /<span className="relative inline-block mt-2">[\s\S]*?Generative AI[\s\S]*?<\/span>\s*<\/span>/,
  ''
);
content = content.replace(
  /Build job-ready skills in Data Analytics, Machine Learning, and AI-Powered Data Products in this intensive 16-week program./g,
  'Build job-ready skills in RTL Design, SystemVerilog Verification, and SoC Architecture in this intensive 20-week program.'
);

fs.writeFileSync(destPath, content, 'utf8');
console.log('VLSI.jsx regenerated perfectly!');
