import React, { useEffect } from "react";
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
  "heroTitle": "Advanced VLSI Design",
  "heroSubtitle": "Build job-ready skills in RTL Design, SystemVerilog Verification, and SoC Architecture in this intensive 24-week program.",
  "toolsSubtitle": "Master the modern VLSI & Semiconductor design stack",
  "trackSubtitle": "A dedicated VLSI track tailored to your current experience level.",
  "trackButtonLabel": "Start Your VLSI Career →",
  "projectLabel": "VLSI Project",
  "careerOutcomesDomain": "SoftwareDeveloper",
  "trustStats": [
    {
      "value": "24 Weeks",
      "label": "Duration"
    },
    {
      "value": "100% Online",
      "label": "Format"
    },
    {
      "value": "10+ Projects",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "RTL & Verification",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "Verilog",
      "img": "/icons/verilog.svg"
    },
    {
      "name": "SystemVerilog",
      "img": "/icons/systemverilog.svg"
    },
    {
      "name": "UVM",
      "img": "/icons/uvm.svg"
    },
    {
      "name": "Cadence",
      "img": "/icons/cadence.svg"
    },
    {
      "name": "Synopsys",
      "img": "/icons/synopsys.svg"
    },
    {
      "name": "ModelSim",
      "img": "/icons/modelsim.svg"
    },
    {
      "name": "Xilinx",
      "img": "/icons/xilinx.svg"
    },
    {
      "name": "Linux",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
    },
    {
      "name": "C++",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
    },
    {
      "name": "Python",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "VLSI Engineers & Junior Verification Engineers",
      "desc": "Build the foundational Digital Logic, Verilog, and SV skills to transition into high-growth VLSI Design roles.",
      "benefits": [
        "End-to-end workflows across RTL design and simulation",
        "Understanding of computer architecture and CMOS fundamentals",
        "Hands-on custom processor design and FPGA prototyping"
      ],
      "quote": "I want to move beyond academic concepts and start designing real semiconductor logic.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Mid-Level ASIC & Verification Engineers",
      "desc": "Move from solid contributor to an advanced Verification Engineer capable of implementing UVM testbenches.",
      "benefits": [
        "Architect reusable testbenches with UVM methodologies",
        "Master advanced SystemVerilog constructs and coverage",
        "Debug complex IP blocks and SoC interfaces"
      ],
      "quote": "I need to upgrade my skills from basic Verilog to modern, industry-standard UVM verification.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "ASIC Architects & Tech Leads",
      "desc": "Lead chip transformation—design enterprise-scale SoC architectures and manage high-performing VLSI teams.",
      "benefits": [
        "Enterprise SoC Strategy and Physical Design Governance",
        "Taping out high-performance chips at lower process nodes",
        "Leading hardware engineering teams and maximizing yield"
      ],
      "quote": "My focus is on architecture, scalability, and PPA. I need to design SoCs that drive hardware innovation.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Digital Logic & Architecture",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Boolean Algebra, Combinational & Sequential Logic Design",
        "Finite State Machines (FSMs) Moore/Mealy",
        "Computer Architecture (Pipelining, Cache, Memory)",
        "Setup & Hold Time, Timing Analysis Fundamentals"
      ],
      "application": "Designing a complex ALU and Traffic Light Controller FSM"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "Verilog HDL & RTL Design",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Verilog Syntax, Data Types, and Operators",
        "Behavioral, Dataflow, and Gate-Level Modeling",
        "Writing Testbenches and Simulation in ModelSim",
        "Synthesizable RTL Coding Guidelines"
      ],
      "application": "RTL Design of an Asynchronous FIFO Memory Controller"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "SystemVerilog for Verification",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Object-Oriented Programming (OOP) in SystemVerilog",
        "Randomization and Constraints",
        "Interprocess Communication (Mailboxes, Semaphores)",
        "Interfaces, Clocking Blocks, and Modports"
      ],
      "application": "Building a Class-Based Verification Environment"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–16",
      "title": "Advanced Verification (UVM)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Universal Verification Methodology (UVM) Architecture",
        "UVM Phases, Factory, and Configuration DB",
        "Writing UVM Agents, Drivers, Monitors, and Scoreboards",
        "Functional Coverage and Assertions (SVA)"
      ],
      "application": "Verifying an AMBA APB/AHB Bus using UVM"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 17–20",
      "title": "Physical Design & FPGA",
      "focusLabel": "CURRICULUM",
      "focus": [
        "ASIC Design Flow overview (Synthesis to Tape-out)",
        "FPGA Architecture (LUTs, CLBs) and Xilinx Vivado",
        "Clock Domain Crossing (CDC) techniques",
        "Static Timing Analysis (STA) deep dive"
      ],
      "application": "Prototyping a custom IP block on an FPGA"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 21–24",
      "title": "Scripting, EDA, & Placement",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Linux/Unix Environment and Shell Scripting for EDA",
        "Python & Perl for VLSI Automation",
        "Mock Technical Interviews (Digital Design, Verilog, SV)",
        "Resume Building and Core Semiconductor Company Referrals"
      ],
      "application": "Automated Regression Testing Script"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "Cpu",
      "title": "16-bit RISC Processor Design",
      "desc": "Design, code, and simulate a custom 16-bit RISC CPU architecture with a pipelined datapath and custom instruction set.",
      "tools": [
        "Verilog",
        "ModelSim",
        "RTL"
      ]
    },
    {
      "icon": "CheckCircle2",
      "title": "AMBA AHB Bus Verification",
      "desc": "Develop a robust UVM testbench to verify the standard AMBA AHB bus protocol, utilizing advanced scoreboarding and coverage.",
      "tools": [
        "SystemVerilog",
        "UVM",
        "Cadence"
      ]
    },
    {
      "icon": "Layers",
      "title": "UART Communication IP",
      "desc": "Develop a synthesizable UART IP core for serial communication handling baud rate generation and parity checking.",
      "tools": [
        "Verilog",
        "FSM",
        "Simulation"
      ]
    },
    {
      "icon": "Network",
      "title": "Asynchronous FIFO CDC",
      "desc": "Design an asynchronous FIFO memory controller addressing advanced Clock Domain Crossing (CDC) issues utilizing Gray Code counters.",
      "tools": [
        "SystemVerilog",
        "CDC",
        "Linting"
      ]
    }
  ],
  "faqData": [
    {
      "q": "What is the duration of the program?",
      "a": "The program runs for 24 weeks (6 months), 100% online with live weekend sessions."
    },
    {
      "q": "Who is this program for?",
      "a": "ECE, EE students, and electronics engineers looking to master VLSI Design, Verilog, and Hardware verification."
    },
    {
      "q": "What tools will we use?",
      "a": "You will get hands-on experience with industry-standard EDA tools like ModelSim, Xilinx Vivado, and concepts applicable to Synopsys/Cadence."
    },
    {
      "q": "Do you provide placement support?",
      "a": "Yes, Phase 6 is entirely dedicated to Resume Mastery, Interview Prep, Technical tests, and Core Company Placement Support."
    },
    {
      "q": "Why focus on SystemVerilog and UVM?",
      "a": "UVM (Universal Verification Methodology) is the gold standard for functional verification in the semiconductor industry, highly demanded by companies like Intel, AMD, and Qualcomm."
    },
    {
      "q": "Do I need prior coding experience?",
      "a": "Basic understanding of C/C++ or digital logic is recommended, but we teach Verilog and SystemVerilog from the ground up."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  return <PremiumCourseLayout data={courseData} />;
};

export default VLSI;
