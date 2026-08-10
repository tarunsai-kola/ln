const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'page');

const courses = [
  {
    componentName: 'CloudComputing',
    data: {
      heroTitle: "Cloud Computing & Architecture",
      heroSubtitle: "Design, deploy, and scale highly available enterprise architectures across AWS, Azure, and GCP in this 24-week program.",
      toolsSubtitle: "Master the modern Cloud Architect stack",
      trackSubtitle: "A dedicated Cloud Engineering track tailored to your current experience level.",
      trackButtonLabel: "Start Your Cloud Career →",
      projectLabel: "Cloud Architecture Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "10+ Architectures", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "Multi-Cloud", label: "Core Focus" }
      ],
      toolsList: [
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
        { name: "Azure", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
        { name: "GCP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Terraform", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" },
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Cloud Support Engineers & Administrators",
          desc: "Master the fundamentals of Linux, networking, and core cloud services (Compute, Storage, IAM).",
          benefits: ["Manage Linux servers, virtual networks, and identity access (IAM)", "Provision and scale EC2 instances, S3 buckets, and RDS databases", "Monitor cloud health using CloudWatch and basic cost optimization"],
          quote: "I want to transition from IT support to managing cloud infrastructure.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Cloud Engineers & DevOps Integration Specialists",
          desc: "Transition into deploying serverless architectures and containerized microservices.",
          benefits: ["Architect serverless applications using AWS Lambda and API Gateway", "Deploy containerized applications on EKS (Kubernetes) and ECS", "Implement Infrastructure as Code (IaC) using Terraform"],
          quote: "I need to build highly available, auto-scaling architectures and automate provisioning.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Enterprise Cloud Architects",
          desc: "Design hybrid and multi-cloud strategies for large enterprises.",
          benefits: ["Design secure multi-region disaster recovery and high availability plans", "Migrate monolithic legacy applications to microservices architecture", "Lead cloud governance, security compliance, and enterprise FinOps"],
          quote: "My focus is on enterprise cloud strategy, migration, and architecture design.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Linux & Cloud Fundamentals", focusLabel: "CURRICULUM",
          focus: ["Linux Server Administration & Bash Scripting", "Cloud Networking (VPCs, Subnets, Route Tables)", "Identity & Access Management (IAM) and Security Groups", "Virtual Machines (EC2) and Block Storage (EBS)"],
          application: "Deploying a Secure Web Server in a Custom VPC"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Core AWS Architecture", focusLabel: "CURRICULUM",
          focus: ["Object Storage (S3) and Content Delivery (CloudFront)", "Relational Databases (RDS) and NoSQL (DynamoDB)", "High Availability: Load Balancers (ALB) and Auto Scaling Groups", "Monitoring & Auditing (CloudWatch, CloudTrail)"],
          application: "Architecting a Highly Available 3-Tier Application"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Serverless & Application Integration", focusLabel: "CURRICULUM",
          focus: ["Serverless Compute with AWS Lambda", "API Gateway and Microservices Routing", "Message Queues & Pub/Sub (SQS, SNS, EventBridge)", "State Machines using AWS Step Functions"],
          application: "Building an Event-Driven Serverless Data Processing Pipeline"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Containers & Kubernetes (EKS)", focusLabel: "CURRICULUM",
          focus: ["Docker Containerization fundamentals", "Elastic Container Service (ECS) & Fargate", "Kubernetes (K8s) Architecture and Pod Management", "Deploying and managing clusters on Amazon EKS"],
          application: "Migrating a Monolith to Containerized Microservices"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 17–20", title: "Infrastructure as Code & Automation", focusLabel: "CURRICULUM",
          focus: ["Terraform Fundamentals (State, Modules, Providers)", "Provisioning multi-tier cloud environments with Terraform", "Configuration Management with Ansible", "CloudFormation and AWS CDK basics"],
          application: "Automated Deployment of a Cloud Environment using Terraform"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 21–24", title: "Azure/GCP & Certification Prep", focusLabel: "CURRICULUM",
          focus: ["Multi-Cloud concepts: Azure Virtual Machines & GCP Compute Engine", "Azure Active Directory and Google Cloud IAM", "Cloud Migration Strategies (Rehost, Refactor, Rearchitect)", "Preparation for AWS Certified Solutions Architect (SAA-C03)"],
          application: "Capstone Project & Multi-Cloud Architecture Review"
        }
      ],
      capstoneProjects: [
        { icon: "Layers", title: "Highly Available 3-Tier Web Architecture", desc: "Design and deploy a scalable web app across multiple Availability Zones using EC2 Auto Scaling, ALBs, and a Multi-AZ RDS database.", tools: ["AWS", "Linux", "RDS"] },
        { icon: "Server", title: "Serverless Image Processing Pipeline", desc: "Build an event-driven application where uploading an image to S3 triggers a Lambda function via EventBridge to resize and store the image.", tools: ["AWS Lambda", "S3", "Python"] },
        { icon: "Workflow", title: "Infrastructure as Code Provisioning", desc: "Write Terraform modules to spin up a complete, secure VPC with public/private subnets, NAT Gateways, and Bastion Hosts from scratch.", tools: ["Terraform", "AWS", "Bash"] },
        { icon: "Network", title: "Kubernetes Microservices Deployment", desc: "Containerize a Node.js/MongoDB application using Docker and deploy it to a managed Amazon EKS cluster with LoadBalancer services.", tools: ["Kubernetes", "Docker", "EKS"] }
      ],
      faqData: [
        { q: "What is Cloud Computing?", a: "Cloud computing is the delivery of computing services—including servers, storage, databases, networking, and software—over the Internet." },
        { q: "Do I need to know how to code?", a: "Extensive software development experience is not required, but you will need to learn scripting (Bash, Python) and markup languages (YAML/JSON) for configuration." },
        { q: "Does this program prepare me for certifications?", a: "Yes, the curriculum is heavily aligned with the AWS Certified Solutions Architect - Associate (SAA-C03) certification exam." },
        { q: "Why focus on AWS primarily?", a: "AWS currently holds the largest market share in cloud computing. The architectural concepts you learn on AWS transfer directly to Azure and GCP." },
        { q: "Will we learn about Serverless?", a: "Absolutely. We have a dedicated phase covering AWS Lambda, API Gateway, and event-driven architecture." },
        { q: "How are the labs conducted?", a: "You will perform hands-on labs directly inside the AWS Management Console and via the AWS CLI on your local terminal." }
      ]
    }
  },
  {
    componentName: 'FullStackWeb',
    data: {
      heroTitle: "Full Stack Web Development (MERN)",
      heroSubtitle: "Build highly scalable, interactive web applications from frontend to backend using React, Node.js, and MongoDB in this 24-week bootcamp.",
      toolsSubtitle: "Master the modern MERN stack",
      trackSubtitle: "A dedicated Software Engineering track tailored to your current experience level.",
      trackButtonLabel: "Start Your Engineering Career →",
      projectLabel: "Web App Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "15+ Projects", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "MERN Stack", label: "Core Focus" }
      ],
      toolsList: [
        { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invert: true },
        { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true },
        { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Frontend Developers & Junior Engineers",
          desc: "Master HTML, CSS, JavaScript, and React to build pixel-perfect user interfaces.",
          benefits: ["Build responsive layouts using modern CSS and Tailwind", "Master JavaScript DOM manipulation and ES6+ syntax", "Develop interactive Single Page Applications (SPAs) using React"],
          quote: "I want to build beautiful interfaces and break into the tech industry.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Full Stack Developers",
          desc: "Transition into end-to-end development, handling both React frontends and Node.js backends.",
          benefits: ["Design secure RESTful APIs using Node.js and Express", "Model and query complex data structures using MongoDB and Mongoose", "Implement secure JWT authentication and role-based access control"],
          quote: "I want to be able to build and deploy entire applications by myself.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Technical Leads & Frontend Architects",
          desc: "Design scalable system architectures and lead engineering teams.",
          benefits: ["Master Server-Side Rendering (SSR) and SEO optimization with Next.js", "Design scalable microservices and robust database indexing strategies", "Lead code reviews, CI/CD deployment strategies, and system design"],
          quote: "My focus is on application performance, scalable system design, and leading teams.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Frontend Foundations", focusLabel: "CURRICULUM",
          focus: ["HTML5 Semantic Elements & CSS3 Flexbox/Grid", "Modern JavaScript (ES6+): Promises, Async/Await, Arrow Functions", "DOM Manipulation and Event Handling", "Responsive Design with Tailwind CSS"],
          application: "Building a Responsive E-Commerce Landing Page"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "React.js & State Management", focusLabel: "CURRICULUM",
          focus: ["React Architecture, JSX, and Component Lifecycle", "React Hooks (useState, useEffect, useMemo, custom hooks)", "Advanced State Management with Redux Toolkit or Zustand", "Client-side routing with React Router v6"],
          application: "Interactive Movie Database SPA with API Integration"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Backend Development (Node & Express)", focusLabel: "CURRICULUM",
          focus: ["Node.js runtime, Event Loop, and File System", "Building RESTful APIs with Express.js", "Middleware, Error Handling, and Input Validation", "Authentication & Authorization with JWT and Bcrypt"],
          application: "Developing a Secure REST API for a Task Manager"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Databases (MongoDB)", focusLabel: "CURRICULUM",
          focus: ["NoSQL Database Concepts and MongoDB setup", "Object Data Modeling (ODM) with Mongoose", "Complex Queries, Aggregation Pipelines, and Indexing", "Connecting the Express API to MongoDB seamlessly"],
          application: "Integrating the Backend API with a Database"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 17–20", title: "Next.js & Advanced React", focusLabel: "CURRICULUM",
          focus: ["Introduction to Next.js App Router", "Server-Side Rendering (SSR) vs Static Site Generation (SSG)", "Data Fetching Strategies and SEO Optimization", "Introduction to TypeScript for React Applications"],
          application: "Building an SEO-Optimized Tech Blog with Next.js"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 21–24", title: "Deployment & Capstone", focusLabel: "CURRICULUM",
          focus: ["Deploying frontends on Vercel and backends on Render/Heroku", "Full MERN Integration (Connecting React to Express)", "WebSockets for Real-Time Communication (Socket.io)", "Technical Interview Prep, System Design basics, & Portfolio Polish"],
          application: "End-to-End MERN Stack Capstone Project Deployment"
        }
      ],
      capstoneProjects: [
        { icon: "TerminalSquare", title: "Full-Stack E-Commerce Platform", desc: "Build a complete online store with product listings, a shopping cart, Stripe payment integration, and an admin dashboard.", tools: ["React", "Node.js", "MongoDB", "Stripe"] },
        { icon: "MessageSquare", title: "Real-Time Chat Application", desc: "Develop a messaging app supporting private chats and group rooms using WebSockets for instantaneous communication.", tools: ["Socket.io", "React", "Express"] },
        { icon: "CheckCircle2", title: "Project Management Kanban Board", desc: "Create a Trello clone with drag-and-drop functionality, secure user authentication, and real-time state updates.", tools: ["React", "Redux", "Tailwind"] },
        { icon: "Layers", title: "Next.js Tech Blog", desc: "Build an SEO-friendly, server-side rendered blog platform with Markdown support and a custom CMS interface.", tools: ["Next.js", "TypeScript", "Vercel"] }
      ],
      faqData: [
        { q: "Is this program for beginners?", a: "Yes. We start from absolute scratch with HTML and CSS in Week 1 before progressively moving into advanced JavaScript and React." },
        { q: "Why the MERN stack?", a: "MERN (MongoDB, Express, React, Node) uses JavaScript for both the frontend and backend, making it the most popular and efficient stack for modern web development." },
        { q: "Will I learn TypeScript?", a: "Yes, we introduce TypeScript in Phase 5 as it is rapidly becoming the industry standard for robust enterprise React applications." },
        { q: "Do I need a powerful computer?", a: "No. Any standard laptop (Windows, Mac, or Linux) made in the last 5-7 years is sufficient for Web Development." },
        { q: "Will I build a portfolio?", a: "Absolutely. You will build 15+ minor projects and 4 major capstones, all hosted live on GitHub and Vercel for employers to see." },
        { q: "What is the average salary for a Full Stack Developer?", a: "Junior developers typically start around 6-8 LPA in India, while experienced MERN stack developers can easily command 15-25+ LPA." }
      ]
    }
  },
  {
    componentName: 'VLSI',
    data: {
      heroTitle: "Advanced VLSI Design",
      heroSubtitle: "Build job-ready skills in RTL Design, SystemVerilog Verification, and SoC Architecture in this intensive 24-week program.",
      toolsSubtitle: "Master the modern VLSI & Semiconductor design stack",
      trackSubtitle: "A dedicated VLSI track tailored to your current experience level.",
      trackButtonLabel: "Start Your VLSI Career →",
      projectLabel: "VLSI Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "10+ Projects", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "RTL & Verification", label: "Core Focus" }
      ],
      toolsList: [
        { name: "Verilog", img: "/icons/verilog.svg" },
        { name: "SystemVerilog", img: "/icons/systemverilog.svg" },
        { name: "UVM", img: "/icons/uvm.svg" },
        { name: "Cadence", img: "/icons/cadence.svg" },
        { name: "Synopsys", img: "/icons/synopsys.svg" },
        { name: "ModelSim", img: "/icons/modelsim.svg" },
        { name: "Xilinx", img: "/icons/xilinx.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "VLSI Engineers & Junior Verification Engineers",
          desc: "Build the foundational Digital Logic, Verilog, and SV skills to transition into high-growth VLSI Design roles.",
          benefits: ["End-to-end workflows across RTL design and simulation", "Understanding of computer architecture and CMOS fundamentals", "Hands-on custom processor design and FPGA prototyping"],
          quote: "I want to move beyond academic concepts and start designing real semiconductor logic.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Mid-Level ASIC & Verification Engineers",
          desc: "Move from solid contributor to an advanced Verification Engineer capable of implementing UVM testbenches.",
          benefits: ["Architect reusable testbenches with UVM methodologies", "Master advanced SystemVerilog constructs and coverage", "Debug complex IP blocks and SoC interfaces"],
          quote: "I need to upgrade my skills from basic Verilog to modern, industry-standard UVM verification.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "ASIC Architects & Tech Leads",
          desc: "Lead chip transformation—design enterprise-scale SoC architectures and manage high-performing VLSI teams.",
          benefits: ["Enterprise SoC Strategy and Physical Design Governance", "Taping out high-performance chips at lower process nodes", "Leading hardware engineering teams and maximizing yield"],
          quote: "My focus is on architecture, scalability, and PPA. I need to design SoCs that drive hardware innovation.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Digital Logic & Architecture", focusLabel: "CURRICULUM",
          focus: ["Boolean Algebra, Combinational & Sequential Logic Design", "Finite State Machines (FSMs) Moore/Mealy", "Computer Architecture (Pipelining, Cache, Memory)", "Setup & Hold Time, Timing Analysis Fundamentals"],
          application: "Designing a complex ALU and Traffic Light Controller FSM"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Verilog HDL & RTL Design", focusLabel: "CURRICULUM",
          focus: ["Verilog Syntax, Data Types, and Operators", "Behavioral, Dataflow, and Gate-Level Modeling", "Writing Testbenches and Simulation in ModelSim", "Synthesizable RTL Coding Guidelines"],
          application: "RTL Design of an Asynchronous FIFO Memory Controller"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "SystemVerilog for Verification", focusLabel: "CURRICULUM",
          focus: ["Object-Oriented Programming (OOP) in SystemVerilog", "Randomization and Constraints", "Interprocess Communication (Mailboxes, Semaphores)", "Interfaces, Clocking Blocks, and Modports"],
          application: "Building a Class-Based Verification Environment"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Advanced Verification (UVM)", focusLabel: "CURRICULUM",
          focus: ["Universal Verification Methodology (UVM) Architecture", "UVM Phases, Factory, and Configuration DB", "Writing UVM Agents, Drivers, Monitors, and Scoreboards", "Functional Coverage and Assertions (SVA)"],
          application: "Verifying an AMBA APB/AHB Bus using UVM"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 17–20", title: "Physical Design & FPGA", focusLabel: "CURRICULUM",
          focus: ["ASIC Design Flow overview (Synthesis to Tape-out)", "FPGA Architecture (LUTs, CLBs) and Xilinx Vivado", "Clock Domain Crossing (CDC) techniques", "Static Timing Analysis (STA) deep dive"],
          application: "Prototyping a custom IP block on an FPGA"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 21–24", title: "Scripting, EDA, & Placement", focusLabel: "CURRICULUM",
          focus: ["Linux/Unix Environment and Shell Scripting for EDA", "Python & Perl for VLSI Automation", "Mock Technical Interviews (Digital Design, Verilog, SV)", "Resume Building and Core Semiconductor Company Referrals"],
          application: "Automated Regression Testing Script"
        }
      ],
      capstoneProjects: [
        { icon: "Cpu", title: "16-bit RISC Processor Design", desc: "Design, code, and simulate a custom 16-bit RISC CPU architecture with a pipelined datapath and custom instruction set.", tools: ["Verilog", "ModelSim", "RTL"] },
        { icon: "CheckCircle2", title: "AMBA AHB Bus Verification", desc: "Develop a robust UVM testbench to verify the standard AMBA AHB bus protocol, utilizing advanced scoreboarding and coverage.", tools: ["SystemVerilog", "UVM", "Cadence"] },
        { icon: "Layers", title: "UART Communication IP", desc: "Develop a synthesizable UART IP core for serial communication handling baud rate generation and parity checking.", tools: ["Verilog", "FSM", "Simulation"] },
        { icon: "Network", title: "Asynchronous FIFO CDC", desc: "Design an asynchronous FIFO memory controller addressing advanced Clock Domain Crossing (CDC) issues utilizing Gray Code counters.", tools: ["SystemVerilog", "CDC", "Linting"] }
      ],
      faqData: [
        { q: "What is the duration of the program?", a: "The program runs for 24 weeks (6 months), 100% online with live weekend sessions." },
        { q: "Who is this program for?", a: "ECE, EE students, and electronics engineers looking to master VLSI Design, Verilog, and Hardware verification." },
        { q: "What tools will we use?", a: "You will get hands-on experience with industry-standard EDA tools like ModelSim, Xilinx Vivado, and concepts applicable to Synopsys/Cadence." },
        { q: "Do you provide placement support?", a: "Yes, Phase 6 is entirely dedicated to Resume Mastery, Interview Prep, Technical tests, and Core Company Placement Support." },
        { q: "Why focus on SystemVerilog and UVM?", a: "UVM (Universal Verification Methodology) is the gold standard for functional verification in the semiconductor industry, highly demanded by companies like Intel, AMD, and Qualcomm." },
        { q: "Do I need prior coding experience?", a: "Basic understanding of C/C++ or digital logic is recommended, but we teach Verilog and SystemVerilog from the ground up." }
      ]
    }
  },
  {
    componentName: 'EmbeddedSystems',
    data: {
      heroTitle: "Embedded Systems & IoT",
      heroSubtitle: "Design robust firmware, master RTOS, and engineer bare-metal microcontroller architectures in this intensive 24-week program.",
      toolsSubtitle: "Master the modern Embedded & Firmware stack",
      trackSubtitle: "A dedicated Embedded track tailored to your current experience level.",
      trackButtonLabel: "Start Your Embedded Career →",
      projectLabel: "Hardware Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "12+ Prototypes", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "Firmware", label: "Core Focus" }
      ],
      toolsList: [
        { name: "C", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
        { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Raspberry Pi", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg" },
        { name: "Arduino", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" },
        { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Firmware Engineers & Junior Embedded Devs",
          desc: "Write low-level microcontroller code and interact directly with hardware peripherals.",
          benefits: ["Master Embedded C programming and pointer arithmetic", "Write bare-metal drivers for GPIO, Interrupts, and Timers", "Interface with basic sensors using ADC, I2C, and SPI"],
          quote: "I want to write code that interacts directly with physical hardware.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Embedded Systems Engineers & RTOS Devs",
          desc: "Develop complex multitasking applications using Real-Time Operating Systems.",
          benefits: ["Implement deterministic task scheduling using FreeRTOS", "Solve concurrency issues using Mutexes and Semaphores", "Develop custom Linux device drivers for Embedded Linux environments"],
          quote: "I need to build concurrent, real-time embedded systems that don't crash.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Systems Architects & Hardware Leads",
          desc: "Design full embedded device architectures from PCB specification to cloud integration.",
          benefits: ["Design overall Hardware/Software co-architecture and select microprocessors", "Implement secure IoT protocols (MQTT/TLS) and Over-The-Air (OTA) updates", "Optimize system power consumption and memory footprint"],
          quote: "My focus is on complete product architecture, reliability, and security.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Advanced C & Microcontroller Architecture", focusLabel: "CURRICULUM",
          focus: ["Advanced C (Pointers, Structs, Bitwise Operations)", "Memory Management (Stack, Heap, Memory Mapped I/O)", "ARM Cortex-M Architecture Fundamentals", "Setting up Toolchains, Cross-compilers, and Debugging (GDB)"],
          application: "Writing a Bare-Metal Blinky from scratch without libraries"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Bare-Metal Peripherals & Interrupts", focusLabel: "CURRICULUM",
          focus: ["GPIO configurations and Switch Debouncing", "Understanding Interrupt Service Routines (ISRs) and NVIC", "Timers, PWM Generation, and Motor Control", "Analog to Digital Converters (ADC) and Polling vs Interrupts"],
          application: "Building a Custom PWM DC Motor Controller"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Communication Protocols", focusLabel: "CURRICULUM",
          focus: ["Serial Communication basics (UART/USART)", "Inter-Integrated Circuit (I2C) for Sensor Interfacing", "Serial Peripheral Interface (SPI) for High-Speed data", "Introduction to CAN Bus for Automotive applications"],
          application: "Interfacing an OLED display and BME280 sensor via I2C/SPI"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Real-Time Operating Systems (RTOS)", focusLabel: "CURRICULUM",
          focus: ["Introduction to RTOS concepts (Tasks, Schedulers, Context Switching)", "FreeRTOS Task Management and Priorities", "Inter-Task Communication (Queues)", "Synchronization (Mutexes, Semaphores, Spinlocks) avoiding Deadlocks"],
          application: "Developing a Multitasking Data Logger with FreeRTOS"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 17–20", title: "Embedded Linux & IoT", focusLabel: "CURRICULUM",
          focus: ["Embedded Linux Architecture (Bootloader, Kernel, RootFS)", "Yocto Project / Buildroot Basics", "Writing basic Linux Character Device Drivers", "IoT Connectivity: MQTT, WiFi (ESP32), and JSON parsing"],
          application: "Deploying a Networked Sensor Node sending telemetry to AWS IoT"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 21–24", title: "System Integration & Capstone", focusLabel: "CURRICULUM",
          focus: ["System Integration, Logic Analyzers, and Hardware Debugging", "Power Optimization techniques (Sleep Modes)", "Embedded System Security & OTA Update strategies", "Technical Interview Prep (Coding, Whiteboarding) & Placement"],
          application: "Final End-to-End Embedded Device Prototype"
        }
      ],
      capstoneProjects: [
        { icon: "Cpu", title: "Smart Home RTOS Controller", desc: "Develop firmware for a central thermostat hub using FreeRTOS to manage multiple sensor tasks and an LCD UI concurrently.", tools: ["C", "FreeRTOS", "ARM Cortex-M"] },
        { icon: "Network", title: "Industrial CAN Bus Node", desc: "Implement a CAN bus communication network between two microcontrollers to simulate automotive telemetry data exchange.", tools: ["C++", "CAN Protocol", "Transceivers"] },
        { icon: "Layers", title: "Custom Linux Device Driver", desc: "Write a custom Linux character device driver to read data from a specific hardware peripheral on a Raspberry Pi.", tools: ["Linux Kernel", "C", "Raspberry Pi"] },
        { icon: "Target", title: "Secure AWS IoT Sensor Node", desc: "Program an ESP32 to read environmental data, package it as JSON, and securely publish it to AWS IoT Core over MQTT via TLS.", tools: ["ESP32", "MQTT", "AWS IoT"] }
      ],
      faqData: [
        { q: "What is the duration of the program?", a: "The program runs for 24 weeks (6 months), 100% online." },
        { q: "Do I need to buy hardware?", a: "While we highly recommend purchasing an inexpensive STM32 or ESP32 development board (~$15), we also utilize powerful hardware simulators like Wokwi for learning." },
        { q: "Is prior programming knowledge required?", a: "A basic understanding of C or C++ is highly recommended, as we dive deep into pointers and memory management very quickly." },
        { q: "What is the difference between Embedded Systems and IoT?", a: "Embedded Systems focuses on the localized hardware and firmware (microcontrollers). IoT extends this by connecting these embedded systems to the internet (Cloud/MQTT)." },
        { q: "Will I learn Arduino?", a: "We use the Arduino platform initially for rapid prototyping, but we quickly move on to professional Bare-Metal C programming and RTOS which is required in the industry." },
        { q: "Is placement assistance provided?", a: "Yes, we provide resume guidance, embedded-specific technical interview preparation, and connect you with core engineering companies." }
      ]
    }
  }
];

courses.forEach(course => {
  const componentPath = path.join(pagesDir, `${course.componentName}.jsx`);
  if (!fs.existsSync(componentPath)) {
    console.log(`Skipping ${course.componentName} - file not found`);
    return;
  }
  
  let content = fs.readFileSync(componentPath, 'utf8');
  const regex = /const courseData = \{[\s\S]*?(?=courseData\.heroImages =)/;
  const newDataString = `const courseData = ${JSON.stringify(course.data, null, 2)};\n\n  `;
  
  content = content.replace(regex, newDataString);
  fs.writeFileSync(componentPath, content, 'utf8');
  console.log(`Enriched ${course.componentName}.jsx`);
});

console.log('Batch 2 enrichment complete!');
