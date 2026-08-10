Created At: 2026-07-28T19:24:01Z
Completed At: 2026-07-28T19:24:01Z
File Path: `file:///e:/testing/frontend/src/page/VLSI.jsx`
Total Lines: 647
Total Bytes: 32671
Showing lines 1 to 200
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import PaymentPlanWidget from "../Components/PaymentPlanWidget";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";

/* ─── Static Data ─── */
const trustStats = [
  { value: "20 Weeks", label: "Duration" },
  { value: "100% Online", label: "Format" },
  { value: "10+ Projects", label: "Hands-on Practice" },
  { value: "1 Capstone", label: "Real Projects" },
  { value: "GenAI", label: "Core Focus" },
];


const toolsList = [
  { name: "Verilog", img: "/icons/verilog.svg" },
  { name: "SystemVerilog", img: "/icons/systemverilog.svg" },
  { name: "Cadence", img: "/icons/cadence.svg" },
  { name: "Synopsys", img: "/icons/synopsys.svg" },
  { name: "ModelSim", img: "/icons/modelsim.svg" },
42: 
43: const toolsList = [
  { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "UVM", img: "/icons/uvm.svg" },
];

const careerPaths = [
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
const capstoneProjects = [
  { icon: TerminalSquare, title: "16-bit RISC Processor Design", desc: "Design, code, and simulate a custom 16-bit RISC CPU architecture with a pipelined datapath.", tools: ["Verilog", "ModelSim", "EDA"] },
  { icon: CheckCircle2, title: "AMBA AHB Bus Verification", desc: "Develop a robust UVM testbench to verify the standard AMBA AHB bus protocol and interface.", tools: ["SystemVerilog", "UVM", "Cadence"] },
  { icon: Layers, title: "ASIC Standard Cell Layout", desc: "Perform physical design, placement, and routing for standard cells in a modern process node.", tools: ["Synopsis", "Layout", "DRC/LVS"] },
  { icon: Network, title: "FIFO Memory Controller", desc: "Design an asynchronous FIFO memory controller addressing advanced Clock Domain Crossing (CDC).", tools: ["CDC", "Logic Synthesis", "Verilog"] },
  { icon: Code, title: "UART Communication IP", desc: "Develop a reusable UART IP core for serial communication in modern SoC architectures.", tools: ["IP Design", "FPGA", "Simulation"] },
const faqData = [
  { q: "What is the duration of the program?", a: "The program runs for 20 weeks (5 months), 100% online with live weekend sessions." },
  { q: "Who is this program for?", a: "ECE, EE students, and electronics engineers looking to master VLSI Design, Verilog, and Hardware modeling." },
  { q: "Will I get certified?", a: "Yes. You earn Professional Certifications in VLSI Design, SystemVerilog Verification, and Physical Design." },
  { q: "Do you provide placement support?", a: "Yes, Phase 4 is entirely dedicated to Resume Mastery, Interview Prep, Case Studies, and Core Company Placement Support." },
  { q: "What kind of projects will I build?", a: "You will build 10+ hands-on projects, ranging from RISC Processor Design to UVM Testbenches and SoC IP Cores." },
