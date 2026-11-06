import React from "react";
import { FaBriefcase, FaArrowRight, FaChartLine, FaCheckCircle, FaUserTie, FaBuilding } from "react-icons/fa";

// Domain-specific career role configurations with authentic market compensation & competencies
const getDomainCareerRoles = (courseTitle) => {
  const t = courseTitle || "Technical Domains";

  // 1. Artificial Intelligence & Machine Learning
  if (t.includes("Artificial Intelligence") || t.includes("Machine Learning") || t.includes("AI")) {
    return [
      {
        title: "Applied AI Systems Engineer",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "14 LPA",
        highest: "36 LPA",
        desc: "Architects scalable inference pipelines and fine-tunes open-source foundational models for production.",
        skills: ["PyTorch", "vLLM", "Hugging Face", "Model Optimization"],
        hiring: "Enterprise AI Labs & Tech MNCs"
      },
      {
        title: "Generative AI & LLM Specialist",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "16 LPA",
        highest: "42 LPA",
        desc: "Builds agentic workflows, contextual RAG systems, and semantic search platforms using vector stores.",
        skills: ["LangChain", "LlamaIndex", "Vector DBs", "Prompt Engineering"],
        hiring: "AI Startups & Global Consultancies"
      },
      {
        title: "MLOps Platform Engineer",
        badge: "Specialist Role",
        badgeColor: "purple",
        avg: "15 LPA",
        highest: "38 LPA",
        desc: "Automates model CI/CD pipelines, latency benchmarking, drift detection, and cluster orchestration.",
        skills: ["MLflow", "Kubeflow", "Docker", "AWS SageMaker"],
        hiring: "Cloud Providers & FinTech"
      },
      {
        title: "Deep Learning Research Analyst",
        badge: "Core Engineering",
        badgeColor: "amber",
        avg: "13 LPA",
        highest: "32 LPA",
        desc: "Trains custom computer vision and NLP architectures for complex predictive and generative tasks.",
        skills: ["TensorFlow", "CUDA", "OpenCV", "Transformers"],
        hiring: "Autonomous Systems & Healthcare AI"
      },
      {
        title: "AI Product Solutions Architect",
        badge: "Strategic Track",
        badgeColor: "indigo",
        avg: "20 LPA",
        highest: "50 LPA",
        desc: "Aligns enterprise business logic with AI feasibility, model governance, and cost-efficient cloud compute.",
        skills: ["System Architecture", "API Design", "Cloud AI Services", "Security"],
        hiring: "Fortune 500 Enterprises"
      },
      {
        title: "NLP & Conversational AI Engineer",
        badge: "Niche Skill",
        badgeColor: "teal",
        avg: "12 LPA",
        highest: "30 LPA",
        desc: "Develops intelligent voice and text agents with structured entity recognition and intent classification.",
        skills: ["BERT", "spaCy", "Tokenization", "Speech-to-Text"],
        hiring: "Customer Experience Platforms"
      }
    ];
  }

  // 2. Cyber Security
  if (t.includes("Cyber Security") || t.includes("Security")) {
    return [
      {
        title: "Penetration Tester & Ethical Hacker",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "12 LPA",
        highest: "32 LPA",
        desc: "Executes vulnerability assessments, web application attacks, and red-team penetration engagements.",
        skills: ["Burp Suite", "Metasploit", "OWASP Top 10", "Network Pentesting"],
        hiring: "Cybersecurity Consultancies & BFSI"
      },
      {
        title: "SOC Analyst (L2/L3 Threat Hunter)",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "10 LPA",
        highest: "26 LPA",
        desc: "Monitors real-time telemetry, analyzes SIEM alerts, and mitigates advanced persistent threat vectors.",
        skills: ["Splunk", "Sentinel", "Wireshark", "Threat Intelligence"],
        hiring: "Managed Security Services (MSSP)"
      },
      {
        title: "Cloud Security Architect",
        badge: "Strategic Track",
        badgeColor: "purple",
        avg: "18 LPA",
        highest: "45 LPA",
        desc: "Designs zero-trust cloud perimeters, IAM governance policies, and infrastructure hardening protocols.",
        skills: ["AWS/Azure Security", "Prisma Cloud", "IAM", "Kubernetes Hardening"],
        hiring: "Cloud Providers & FinTech MNCs"
      },
      {
        title: "Digital Forensics & Incident Responder",
        badge: "Specialist Role",
        badgeColor: "amber",
        avg: "13 LPA",
        highest: "34 LPA",
        desc: "Performs artifact extraction, malware memory analysis, and root-cause post-mortem investigations.",
        skills: ["EnCase", "Volatility", "YARA Rules", "Incident Management"],
        hiring: "Enterprise Defense & Law Enforcement Tech"
      },
      {
        title: "Application Security (AppSec) Engineer",
        badge: "Core Engineering",
        badgeColor: "indigo",
        avg: "14 LPA",
        highest: "36 LPA",
        desc: "Integrates SAST/DAST automated security gating into CI/CD build cycles and conducts secure code audits.",
        skills: ["Snyk", "SonarQube", "Secure Code Review", "DevSecOps"],
        hiring: "Product Companies & SaaS Unicorns"
      },
      {
        title: "GRC & Cyber Compliance Consultant",
        badge: "Governance Path",
        badgeColor: "teal",
        avg: "11 LPA",
        highest: "28 LPA",
        desc: "Audits systems against international security mandates including ISO 27001, SOC 2, and NIST frameworks.",
        skills: ["ISO 27001", "SOC 2 Type II", "Risk Assessment", "GDPR/HIPAA"],
        hiring: "Big 4 Advisory & Enterprise Tech"
      }
    ];
  }

  // 3. Cloud Computing & DevOps
  if (t.includes("Cloud") || t.includes("DevOps")) {
    return [
      {
        title: "DevOps Automation & CI/CD Engineer",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "12 LPA",
        highest: "32 LPA",
        desc: "Constructs automated zero-downtime deployment pipelines, automated artifact registries, and test runners.",
        skills: ["GitLab CI", "GitHub Actions", "Docker", "ArgoCD"],
        hiring: "SaaS Platforms & E-Commerce"
      },
      {
        title: "Site Reliability Engineer (SRE)",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "14 LPA",
        highest: "38 LPA",
        desc: "Maintains high-availability infrastructure SLOs, incident response alerting, and distributed tracing.",
        skills: ["Prometheus", "Grafana", "Chaos Engineering", "Linux Internals"],
        hiring: "Global Tech Giants & FinTech"
      },
      {
        title: "Enterprise Cloud Architect",
        badge: "Strategic Track",
        badgeColor: "purple",
        avg: "20 LPA",
        highest: "52 LPA",
        desc: "Architects scalable multi-region cloud landing zones, hybrid disaster recovery, and cost governance.",
        skills: ["AWS Solutions Architect", "Azure Cloud", "FinOps", "Disaster Recovery"],
        hiring: "Global System Integrators & Enterprises"
      },
      {
        title: "Kubernetes Platform Engineer",
        badge: "Specialist Role",
        badgeColor: "amber",
        avg: "15 LPA",
        highest: "40 LPA",
        desc: "Deploys production container orchestrators with ingress controllers, service meshes, and custom CRDs.",
        skills: ["Kubernetes (CKA)", "Helm", "Istio", "Terraform"],
        hiring: "Cloud Consultancies & Tech Unicorns"
      },
      {
        title: "Infrastructure as Code (IaC) Specialist",
        badge: "Core Engineering",
        badgeColor: "indigo",
        avg: "13 LPA",
        highest: "34 LPA",
        desc: "Creates modular, audited cloud environments using declarative configuration and state management.",
        skills: ["Terraform", "Ansible", "CloudFormation", "GitOps"],
        hiring: "Enterprise IT & Digital Agencies"
      },
      {
        title: "Cloud Data Platform Engineer",
        badge: "Niche Skill",
        badgeColor: "teal",
        avg: "12 LPA",
        highest: "30 LPA",
        desc: "Provisions cloud storage lakes, serverless streaming endpoints, and managed relational clusters.",
        skills: ["Amazon S3", "Snowflake", "Glue", "Cloud Networking"],
        hiring: "Data-Driven Tech Enterprises"
      }
    ];
  }

  // 4. Full Stack Software Development & DSA
  if (t.includes("Full Stack") || t.includes("Software Development") || t.includes("Data Structures") || t.includes("Android")) {
    return [
      {
        title: "Full Stack Software Engineer",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "10 LPA",
        highest: "28 LPA",
        desc: "Builds responsive client-side web applications coupled with secure, high-throughput server-side REST APIs.",
        skills: ["React.js", "Node.js", "TypeScript", "Tailwind CSS"],
        hiring: "Product Startups & Global IT MNCs"
      },
      {
        title: "Backend Microservices Architect",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "12 LPA",
        highest: "34 LPA",
        desc: "Designs event-driven backend architectures with message queues, connection pooling, and low-latency APIs.",
        skills: ["Express/NestJS", "Kafka", "Redis Caching", "Docker"],
        hiring: "FinTech, E-Commerce & Logistics"
      },
      {
        title: "Frontend Engineering Specialist",
        badge: "Core Engineering",
        badgeColor: "purple",
        avg: "9 LPA",
        highest: "24 LPA",
        desc: "Engineers complex single-page apps with state management, accessibility compliance, and performance tuning.",
        skills: ["Next.js", "Redux Toolkit", "Web Vitals", "Unit Testing"],
        hiring: "SaaS Platforms & Design Studios"
      },
      {
        title: "Distributed Systems & Cloud Developer",
        badge: "Strategic Track",
        badgeColor: "amber",
        avg: "14 LPA",
        highest: "38 LPA",
        desc: "Builds fault-tolerant, horizontally scalable server systems capable of handling millions of daily requests.",
        skills: ["PostgreSQL", "AWS ECS", "Microservices", "System Design"],
        hiring: "Tier-1 Tech Companies & Unicorns"
      },
      {
        title: "Mobile Application Developer",
        badge: "Specialist Role",
        badgeColor: "indigo",
        avg: "10 LPA",
        highest: "26 LPA",
        desc: "Constructs native and hybrid cross-platform mobile experiences with offline caching and background sync.",
        skills: ["React Native / Kotlin", "REST APIs", "App Store Release", "SQLite"],
        hiring: "Consumer Tech & Media Platforms"
      },
      {
        title: "Technical Lead / Module Architect",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "18 LPA",
        highest: "45 LPA",
        desc: "Directs sprint engineering deliverables, reviews pull requests, and guarantees adherence to clean patterns.",
        skills: ["Design Patterns", "Agile Leadership", "Code Auditing", "CI/CD"],
        hiring: "High-Growth Scaleups & Enterprise IT"
      }
    ];
  }

  // 5. Data Science, Data Analytics & SQL
  if (t.includes("Data") || t.includes("Analytics") || t.includes("SQL")) {
    return [
      {
        title: "Enterprise Data Scientist",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "12 LPA",
        highest: "32 LPA",
        desc: "Builds supervised and unsupervised machine learning pipelines to forecast business revenue and churn.",
        skills: ["Python", "Scikit-Learn", "Feature Engineering", "Statistical Analysis"],
        hiring: "Consumer Tech, Retail & Banking"
      },
      {
        title: "Business Intelligence & BI Architect",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "9.5 LPA",
        highest: "24 LPA",
        desc: "Creates executive dashboards and KPI telemetry layers that empower C-suite decisions.",
        skills: ["Power BI", "Tableau", "DAX", "Data Storytelling"],
        hiring: "Global Consultancies & FMCG"
      },
      {
        title: "Data Warehouse & ETL Developer",
        badge: "Specialist Role",
        badgeColor: "purple",
        avg: "13 LPA",
        highest: "34 LPA",
        desc: "Orchestrates automated ELT pipelines, cleans raw transactional databases, and designs star schemas.",
        skills: ["Advanced SQL", "Snowflake", "dbt", "Airflow"],
        hiring: "FinTech & Enterprise Analytics"
      },
      {
        title: "Quantitative Decision Analyst",
        badge: "Strategic Track",
        badgeColor: "amber",
        avg: "11 LPA",
        highest: "28 LPA",
        desc: "Conducts multi-variate A/B hypothesis testing and econometric analysis to optimize product features.",
        skills: ["Causal Inference", "SQL", "Pandas", "Hypothesis Testing"],
        hiring: "E-Commerce Platforms & Ride Sharing"
      },
      {
        title: "Big Data Platform Engineer",
        badge: "Core Engineering",
        badgeColor: "indigo",
        avg: "15 LPA",
        highest: "38 LPA",
        desc: "Manages distributed stream processing clusters handling petabyte-scale raw event ingestions.",
        skills: ["PySpark", "Kafka", "Delta Lake", "Hadoop Ecosystem"],
        hiring: "Telecom, Healthcare & Social Tech"
      },
      {
        title: "Lead Data Analytics Consultant",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "17 LPA",
        highest: "42 LPA",
        desc: "Advises enterprise clients on data modernization, data governance, and analytics monetization.",
        skills: ["Stakeholder Management", "Data Strategy", "SQL", "Cloud Platforms"],
        hiring: "Top-Tier Consulting (MBB/Big 4)"
      }
    ];
  }

  // 6. Embedded Systems & VLSI Design
  if (t.includes("Embedded") || t.includes("VLSI")) {
    return [
      {
        title: "Embedded Firmware Engineer",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "9 LPA",
        highest: "25 LPA",
        desc: "Writes low-level device drivers, memory-constrained firmware, and interrupt routines for microcontrollers.",
        skills: ["Embedded C/C++", "ARM Cortex", "SPI/I2C/UART", "Bare-Metal"],
        hiring: "Automotive, Aerospace & IoT Hardware"
      },
      {
        title: "ASIC / FPGA Verification Engineer",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "14 LPA",
        highest: "36 LPA",
        desc: "Builds constrained-random verification testbenches to validate silicon design logic before chip tape-out.",
        skills: ["SystemVerilog", "UVM Methodology", "Assertions (SVA)", "QuestaSim"],
        hiring: "Semiconductor Giants (Intel/Qualcomm)"
      },
      {
        title: "RTOS Systems Software Developer",
        badge: "Specialist Role",
        badgeColor: "purple",
        avg: "11 LPA",
        highest: "28 LPA",
        desc: "Implements deterministic multitasking, semaphore synchronization, and task scheduling on real-time OS.",
        skills: ["FreeRTOS", "POSIX Threads", "Memory Management", "Debugging"],
        hiring: "Medical Devices & Robotics Firms"
      },
      {
        title: "Physical Design & Timing Engineer",
        badge: "Core Engineering",
        badgeColor: "amber",
        avg: "15 LPA",
        highest: "38 LPA",
        desc: "Executes floorplanning, clock tree synthesis (CTS), place-and-route, and static timing analysis closure.",
        skills: ["Synopsys Primetime", "Cadence Innovus", "DRC/LVS", "STA"],
        hiring: "Fabless Chipmakers & Silicon Foundries"
      },
      {
        title: "IoT Hardware-Firmware Architect",
        badge: "Strategic Track",
        badgeColor: "indigo",
        avg: "12 LPA",
        highest: "30 LPA",
        desc: "Integrates sensor networks with wireless low-power protocols (BLE, LoRa, Zigbee) and cloud gateways.",
        skills: ["ESP32/STM32", "MQTT", "BLE Protocols", "Power Optimization"],
        hiring: "Smart Home, Wearables & Industrial IoT"
      },
      {
        title: "Principal Silicon & Hardware Architect",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "22 LPA",
        highest: "55 LPA",
        desc: "Directs micro-architecture specification definitions, chip power budgets, and silicon bring-up.",
        skills: ["SoC Architecture", "EDA Toolchains", "Silicon Bringup", "FPGA"],
        hiring: "Global Semiconductor Leaders"
      }
    ];
  }

  // 7. Design & UI/UX
  if (t.includes("UI/UX") || t.includes("Graphics") || t.includes("Design")) {
    return [
      {
        title: "Product Designer (UI/UX)",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "9 LPA",
        highest: "25 LPA",
        desc: "Crafts end-to-end digital user experiences from exploratory wireframes to high-fidelity clickable prototypes.",
        skills: ["Figma", "Design Systems", "Interactive Prototyping", "Auto-Layout"],
        hiring: "Product Unicorns & Global Tech"
      },
      {
        title: "Design Systems Architect",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "13 LPA",
        highest: "34 LPA",
        desc: "Standardizes cross-platform UI components, token architectures, and accessibility documentation.",
        skills: ["Token Architecture", "Component Libraries", "WCAG 2.1", "CSS Standards"],
        hiring: "Enterprise SaaS & High-Growth Startups"
      },
      {
        title: "User Experience (UX) Researcher",
        badge: "Specialist Role",
        badgeColor: "purple",
        avg: "10 LPA",
        highest: "26 LPA",
        desc: "Conducts moderated user interviews, usability testing, and analytics-driven behavioral synthesis.",
        skills: ["User Interviews", "Usability Benchmarking", "Card Sorting", "Synthesized Personas"],
        hiring: "Digital Consumer Apps & FinTech"
      },
      {
        title: "Visual & Brand Experience Designer",
        badge: "Core Creative",
        badgeColor: "amber",
        avg: "8 LPA",
        highest: "22 LPA",
        desc: "Elevates product brand identity through bespoke iconographies, marketing touchpoints, and typography.",
        skills: ["Adobe Creative Suite", "Typography", "Visual Hierarchy", "Design Guidelines"],
        hiring: "Creative Agencies & Direct-to-Consumer"
      },
      {
        title: "Interaction & Micro-Motion Designer",
        badge: "Niche Skill",
        badgeColor: "indigo",
        avg: "10.5 LPA",
        highest: "28 LPA",
        desc: "Creates fluid state transitions, haptic feedback models, and interactive vector animations.",
        skills: ["Principle", "Lottie", "After Effects", "Micro-Interactions"],
        hiring: "Gaming, FinTech & Mobile Apps"
      },
      {
        title: "Head of Product Design",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "20 LPA",
        highest: "50 LPA",
        desc: "Leads design strategy, aligns user delight with corporate revenue metrics, and mentors design teams.",
        skills: ["Design Strategy", "Design Ops", "Product Roadmapping", "Executive Stakeholders"],
        hiring: "Enterprise Tech & Growth Startups"
      }
    ];
  }

  // 8. Digital Marketing
  if (t.includes("Marketing")) {
    return [
      {
        title: "Performance Marketing Specialist",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "8 LPA",
        highest: "22 LPA",
        desc: "Manages live paid ad budgets, customer acquisition campaigns, and programmatic bidding optimizations.",
        skills: ["Google Ads", "Meta Ads Manager", "CAC/ROAS Optimization", "A/B Testing"],
        hiring: "D2C Brands, E-Commerce & Media Agencies"
      },
      {
        title: "Technical SEO & Inbound Strategist",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "7.5 LPA",
        highest: "20 LPA",
        desc: "Conducts site crawl audits, optimizes Core Web Vitals, and executes high-intent content clusters.",
        skills: ["SEMrush", "Ahrefs", "Google Search Console", "Schema Markup"],
        hiring: "High-Traffic Content Platforms & SaaS"
      },
      {
        title: "Growth Marketing Manager",
        badge: "Strategic Track",
        badgeColor: "purple",
        avg: "12 LPA",
        highest: "32 LPA",
        desc: "Oversees the entire pirate funnel (AARRR) to accelerate user onboarding, retention, and referral loops.",
        skills: ["Funnel Analytics", "Mixpanel", "Retention Strategy", "Viral Loops"],
        hiring: "Tech Scaleups & Consumer Unicorns"
      },
      {
        title: "Conversion Rate Optimization (CRO) Lead",
        badge: "Specialist Role",
        badgeColor: "amber",
        avg: "9.5 LPA",
        highest: "25 LPA",
        desc: "Designs data-driven landing page experiments, heat-map audits, and checkout flow improvements.",
        skills: ["Hotjar", "VWO", "Google Optimize", "Behavioral Economics"],
        hiring: "E-Commerce & High-Conversion Portals"
      },
      {
        title: "Social Media & Content Brand Strategist",
        badge: "Creative Impact",
        badgeColor: "indigo",
        avg: "6.5 LPA",
        highest: "18 LPA",
        desc: "Builds organic community engagement, viral storytelling campaigns, and multi-channel editorial calendars.",
        skills: ["Content Creation", "Community Building", "Omnichannel Publishing", "Influencer ROI"],
        hiring: "Lifestyle Brands & Media Studios"
      },
      {
        title: "Director of Digital Growth & Marketing",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "18 LPA",
        highest: "45 LPA",
        desc: "Sets global customer acquisition budgets, oversees cross-channel media mix, and directs growth teams.",
        skills: ["Marketing Mix Modeling", "Team Leadership", "Budget Allocation", "P&L Ownership"],
        hiring: "Global Brands & Enterprise Tech"
      }
    ];
  }

  // 9. Human Resource (HR)
  if (t.includes("Human Resource") || t.includes("HR")) {
    return [
      {
        title: "HR Business Partner (HRBP)",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "9 LPA",
        highest: "24 LPA",
        desc: "Partners directly with engineering and business VPs to design org structures and career ladders.",
        skills: ["Strategic HR", "Org Design", "Performance Management", "Stakeholder Alignment"],
        hiring: "Global Tech MNCs & Consulting"
      },
      {
        title: "Talent Acquisition & Sourcing Lead",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "8 LPA",
        highest: "22 LPA",
        desc: "Builds specialized candidate pipelines for high-demand technical roles and streamlines time-to-hire.",
        skills: ["Technical Recruiting", "LinkedIn Recruiter", "ATS Optimization", "Candidate Experience"],
        hiring: "Tech Unicorns & Staffing Consultancies"
      },
      {
        title: "People Analytics & Workforce Strategist",
        badge: "Specialist Role",
        badgeColor: "purple",
        avg: "11 LPA",
        highest: "28 LPA",
        desc: "Analyzes retention telemetry, compensation parity, and workforce productivity to guide leadership.",
        skills: ["HR Analytics", "Power BI/Tableau", "Attrition Modeling", "Workday"],
        hiring: "Fortune 500 Enterprises"
      },
      {
        title: "Compensation & Benefits (C&B) Specialist",
        badge: "Core Governance",
        badgeColor: "amber",
        avg: "10 LPA",
        highest: "26 LPA",
        desc: "Designs equitable salary benchmark bands, ESOP incentive frameworks, and statutory benefits.",
        skills: ["Market Benchmarking", "ESOP Frameworks", "Payroll Compliance", "Total Rewards"],
        hiring: "Corporate Conglomerates & BFSI"
      },
      {
        title: "Learning & Organizational Development Lead",
        badge: "Strategic Track",
        badgeColor: "indigo",
        avg: "9.5 LPA",
        highest: "25 LPA",
        desc: "Constructs internal upskilling curricula, leadership coaching tracks, and onboarding programs.",
        skills: ["L&D Frameworks", "Competency Mapping", "Training Needs Analysis", "Coaching"],
        hiring: "Global IT Services & Enterprise Consultancies"
      },
      {
        title: "Head of People & Human Capital",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "20 LPA",
        highest: "48 LPA",
        desc: "Directs company-wide culture, workplace policy compliance, and talent scaling across multiple locations.",
        skills: ["Executive HR", "Labor Law Compliance", "Culture Transformation", "Board Reporting"],
        hiring: "High-Growth Companies & Enterprises"
      }
    ];
  }

  // 10. Finance & Capital Markets
  if (t.includes("Finance") || t.includes("Stock Market")) {
    return [
      {
        title: "Equity Research Analyst",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "10 LPA",
        highest: "26 LPA",
        desc: "Publishes institutional investment coverage notes, quarterly earnings reviews, and target price models.",
        skills: ["3-Statement Modeling", "DCF Valuation", "Trading Comps", "Earnings Analysis"],
        hiring: "Investment Banks & Brokerage Firms"
      },
      {
        title: "Financial Planning & Analysis (FP&A) Associate",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "9 LPA",
        highest: "24 LPA",
        desc: "Constructs annual corporate operating budgets, variance forecasting, and cash flow simulations.",
        skills: ["Budget Forecasting", "Variance Analysis", "Advanced Excel", "ERP Systems"],
        hiring: "Corporate Enterprises & SaaS Companies"
      },
      {
        title: "Investment Banking Analyst",
        badge: "Strategic Track",
        badgeColor: "purple",
        avg: "14 LPA",
        highest: "36 LPA",
        desc: "Assists in mergers & acquisitions (M&A) pitch decks, LBO modeling, and due-diligence data rooms.",
        skills: ["M&A Accretion/Dilution", "LBO Modeling", "Pitch Deck Creation", "CapIQ"],
        hiring: "Boutique & Bulge Bracket Banks"
      },
      {
        title: "Portfolio Risk & Quantitative Associate",
        badge: "Specialist Role",
        badgeColor: "amber",
        avg: "12 LPA",
        highest: "30 LPA",
        desc: "Evaluates multi-asset portfolio risk exposure using Value at Risk (VaR), Sharpe ratios, and stress tests.",
        skills: ["Risk Metrics (VaR)", "Portfolio Optimization", "Derivatives Pricing", "Python"],
        hiring: "Hedge Funds & Asset Management Firms"
      },
      {
        title: "Corporate Treasury & Capital Markets Analyst",
        badge: "Core Advisory",
        badgeColor: "indigo",
        avg: "9.5 LPA",
        highest: "25 LPA",
        desc: "Manages corporate liquidity, foreign exchange (FX) hedging strategies, and working capital optimization.",
        skills: ["Liquidity Management", "FX Hedging", "Debt Financing", "Treasury Ops"],
        hiring: "Multinational Corporations & NBFCs"
      },
      {
        title: "Managing Director of Financial Advisory",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "22 LPA",
        highest: "55 LPA",
        desc: "Leads institutional deal origination, capital allocation strategy, and high-net-worth portfolio mandates.",
        skills: ["Deal Origination", "Client Mandates", "Capital Markets Strategy", "Executive Advisory"],
        hiring: "Asset Management & Private Equity"
      }
    ];
  }

  // 11. Medical Coding
  if (t.includes("Medical Coding")) {
    return [
      {
        title: "Certified Professional Coder (CPC - AAPC)",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "6 LPA",
        highest: "15 LPA",
        desc: "Assigns precise diagnostic and procedural codes to outpatient medical charts for clean claims submission.",
        skills: ["ICD-10-CM", "CPT Modifiers", "HCPCS Level II", "AAPC Guidelines"],
        hiring: "Healthcare Networks & RCM Firms"
      },
      {
        title: "Inpatient Clinical Coding Specialist (CIC)",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "7.5 LPA",
        highest: "18 LPA",
        desc: "Audits complex hospital inpatient stays, surgical operative reports, and DRG reimbursement assignments.",
        skills: ["ICD-10-PCS", "MS-DRG Grouper", "Inpatient Charting", "Comorbidity Coding"],
        hiring: "Tertiary Care Hospitals & Health Systems"
      },
      {
        title: "Medical Coding Quality Auditor (QA)",
        badge: "Specialist Role",
        badgeColor: "purple",
        avg: "9 LPA",
        highest: "22 LPA",
        desc: "Conducts peer audit reviews, validates clinical documentation compliance, and enforces 95%+ audit standards.",
        skills: ["Chart Audit", "Denial Root Cause", "Compliance Mandates", "Error Analysis"],
        hiring: "Healthcare BPOs & Audit Consultancies"
      },
      {
        title: "Revenue Cycle Management (RCM) Analyst",
        badge: "Strategic Track",
        badgeColor: "amber",
        avg: "7 LPA",
        highest: "18 LPA",
        desc: "Investigates claim rejections, appeals payer denials, and tracks Days in Accounts Receivable (A/R).",
        skills: ["Claim Denial Appeals", "CMS Reimbursement", "Payer Guidelines", "A/R Aging"],
        hiring: "RCM Solutions & Practice Management"
      },
      {
        title: "Clinical Documentation Integrity (CDI) Specialist",
        badge: "Core Healthcare",
        badgeColor: "indigo",
        avg: "8.5 LPA",
        highest: "21 LPA",
        desc: "Bridges clinicians with coding teams to clarify diagnostic specificity and prevent compliance inquiries.",
        skills: ["Physician Queries", "Clinical Chart Review", "Severity of Illness (SOI)", "Risk Adjustment"],
        hiring: "Multispecialty Hospitals & Health Plans"
      },
      {
        title: "Health Information Management (HIM) Lead",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "12 LPA",
        highest: "28 LPA",
        desc: "Oversees hospital health information systems, medical record privacy (HIPAA), and enterprise coding teams.",
        skills: ["HIPAA Compliance", "EHR/EMR Systems", "Team Leadership", "Budget & SLA Oversight"],
        hiring: "Healthcare Networks & Hospital Chains"
      }
    ];
  }

  // 12. Psychology
  if (t.includes("Psychology")) {
    return [
      {
        title: "Clinical Counseling Associate",
        badge: "High Demand",
        badgeColor: "emerald",
        avg: "6 LPA",
        highest: "15 LPA",
        desc: "Conducts structured intake interviews, psychosocial assessments, and supportive counseling sessions.",
        skills: ["Active Listening", "Intake Formulation", "Therapeutic Boundaries", "Case Reporting"],
        hiring: "Mental Health Clinics & Wellness Centers"
      },
      {
        title: "Cognitive Behavioral Therapy (CBT) Practitioner",
        badge: "Fastest Growing",
        badgeColor: "blue",
        avg: "7.5 LPA",
        highest: "18 LPA",
        desc: "Guides clients through evidence-based cognitive restructuring, behavioral experiments, and exposure plans.",
        skills: ["CBT Protocols", "Thought Record Analysis", "Behavioral Activation", "Relapse Prevention"],
        hiring: "Psychological Institutes & Private Practice"
      },
      {
        title: "Corporate Wellness & EAP Consultant",
        badge: "Corporate Track",
        badgeColor: "purple",
        avg: "8.5 LPA",
        highest: "22 LPA",
        desc: "Designs enterprise employee mental wellbeing workshops, stress mitigation tracks, and manager training.",
        skills: ["EAP Program Design", "Stress Management", "Crisis De-escalation", "Workshops"],
        hiring: "Corporate Enterprises & Wellness Consultancies"
      },
      {
        title: "Psychological Assessment Specialist",
        badge: "Specialist Role",
        badgeColor: "amber",
        avg: "7 LPA",
        highest: "17 LPA",
        desc: "Administers standardized psychometric batteries (personality, IQ, aptitude) and drafts comprehensive reports.",
        skills: ["Psychometric Testing", "Diagnostic Scales", "Score Interpretation", "Report Drafting"],
        hiring: "Hospitals, Schools & Assessment Centers"
      },
      {
        title: "Child & Educational Guidance Counselor",
        badge: "Core Counseling",
        badgeColor: "indigo",
        avg: "6 LPA",
        highest: "14 LPA",
        desc: "Assists adolescent learners facing developmental, academic, or social difficulties with structured guidance.",
        skills: ["Developmental Psychology", "Behavioral Modification", "Parent Consultations", "IEP Plans"],
        hiring: "Educational Institutions & Child Guidance"
      },
      {
        title: "Clinical Practice Director / Lead Consultant",
        badge: "Leadership Path",
        badgeColor: "teal",
        avg: "14 LPA",
        highest: "32 LPA",
        desc: "Directs multidisciplinary counseling practices, ensures ethical governance, and supervises clinical interns.",
        skills: ["Ethical Compliance", "Clinical Supervision", "Program Evaluation", "Practice Management"],
        hiring: "Healthcare Networks & Mental Health Trusts"
      }
    ];
  }

  // 13. General / Technology Default
  return [
    {
      title: `${t} Systems Engineer`,
      badge: "High Demand",
      badgeColor: "emerald",
      avg: "10 LPA",
      highest: "26 LPA",
      desc: `Designs and implements robust production systems and core software components tailored for ${t}.`,
      skills: ["System Architecture", "Performance Tuning", "Modern Toolchains", "Code Quality"],
      hiring: "Technology Enterprises & Product Companies"
    },
    {
      title: `${t} Solutions Architect`,
      badge: "Fastest Growing",
      badgeColor: "blue",
      avg: "16 LPA",
      highest: "42 LPA",
      desc: `Directs enterprise ${t} adoption, cloud integration, and high-level architectural decision-making.`,
      skills: ["Enterprise Design", "Cloud Infrastructure", "API Architecture", "Security"],
      hiring: "Global IT Consultancies & Tech MNCs"
    },
    {
      title: `${t} Specialist Consultant`,
      badge: "Strategic Track",
      badgeColor: "purple",
      avg: "12 LPA",
      highest: "30 LPA",
      desc: `Solves high-complexity technical bottlenecks and audits implementation workflows for enterprise clients.`,
      skills: ["Technical Auditing", "Best Practices", "Stakeholder Reviews", "Troubleshooting"],
      hiring: "Consulting Firms & Fortune 500"
    },
    {
      title: "Core Platform Development Lead",
      badge: "Core Engineering",
      badgeColor: "amber",
      avg: "14 LPA",
      highest: "35 LPA",
      desc: "Oversees development sprint velocity, automated testing coverage, and clean modular code standards.",
      skills: ["Agile Engineering", "Automated Testing", "CI/CD Workflows", "Mentorship"],
      hiring: "High-Growth Scaleups & Unicorns"
    },
    {
      title: "Implementation & Integration Engineer",
      badge: "Specialist Role",
      badgeColor: "indigo",
      avg: "9.5 LPA",
      highest: "24 LPA",
      desc: "Connects internal software pipelines with external third-party services and client ecosystems seamlessly.",
      skills: ["API Protocols", "SDKs", "Data Pipeline Sync", "Monitoring"],
      hiring: "SaaS Platforms & Enterprise IT"
    },
    {
      title: "Practice Lead & Technical Manager",
      badge: "Leadership Path",
      badgeColor: "teal",
      avg: "20 LPA",
      highest: "48 LPA",
      desc: `Leads multidisciplinary teams delivering cutting-edge ${t} client initiatives with measurable business impact.`,
      skills: ["Strategic Roadmaps", "Resource Allocation", "P&L Ownership", "Engineering Ops"],
      hiring: "Global Technology Leaders"
    }
  ];
};

const badgeStyleMap = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  blue: "bg-blue-50 text-blue-700 border-blue-200/80",
  purple: "bg-purple-50 text-purple-700 border-purple-200/80",
  amber: "bg-amber-50 text-amber-700 border-amber-200/80",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
  teal: "bg-teal-50 text-teal-700 border-teal-200/80"
};

const CareerOutcomes = ({ title }) => {
  const roles = getDomainCareerRoles(title);

  return (
    <section className="bg-slate-50 py-20 lg:py-24 border-b border-slate-200 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100/30 rounded-full blur-[140px] pointer-events-none -z-0"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-blue-700 text-xs font-bold tracking-wider uppercase">
                Career Pathways & Market Demand
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              High-Impact Roles You Will Qualify For
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Industry hiring rubrics prioritize candidates with tangible domain execution. Our structured curriculum and project capstones prepare you for these specialized positions across tier-1 employers.
            </p>
          </div>

          {/* Hiring Snapshot Pills */}
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/90 rounded-xl shadow-xs text-xs font-semibold text-slate-700">
              <FaCheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Active Placement Drives</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/90 rounded-xl shadow-xs text-xs font-semibold text-slate-700">
              <FaBuilding className="w-4 h-4 text-blue-600" />
              <span><strong className="text-slate-900 font-bold">500+</strong> Corporate Hiring Partners</span>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role, idx) => {
            const badgeClasses = badgeStyleMap[role.badgeColor] || badgeStyleMap.emerald;

            return (
              <div 
                key={idx} 
                className="group relative bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Border Hover Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Header: Icon & Demand Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 shadow-xs group-hover:scale-105 transition-transform">
                      <FaBriefcase className="w-5 h-5" />
                    </div>
                    <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border shadow-2xs ${badgeClasses}`}>
                      {role.badge}
                    </span>
                  </div>
                  
                  {/* Role Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {role.title}
                  </h3>

                  {/* 1-Sentence Role Summary */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-5 min-h-[32px]">
                    {role.desc}
                  </p>
                  
                  {/* Compensation Package Box */}
                  <div className="bg-slate-50/90 border border-slate-200/70 rounded-xl p-3.5 mb-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Average CTC</p>
                      <p className="text-lg font-extrabold text-slate-900">{role.avg}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Top Potential</p>
                      <p className="text-lg font-extrabold text-blue-600">{role.highest}</p>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Key Skills */}
                  <div className="pt-4 border-t border-slate-100 mb-4">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2.5">Key Core Competencies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 bg-slate-100/80 text-slate-700 text-[11px] font-medium rounded-md border border-slate-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Typical Employers / Hiring Context */}
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <FaUserTie className="w-3 h-3 text-blue-500" />
                      <span>Hiring Scope:</span>
                    </span>
                    <span className="font-semibold text-slate-700 text-right truncate max-w-[170px]" title={role.hiring}>
                      {role.hiring}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Placement Support Bar */}
        <div className="mt-12 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
              <FaChartLine className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Want guidance on matching your profile to these career tracks?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Our senior career advisors evaluate your current skillset, academic background, and provide a tailored career switch roadmap.
              </p>
            </div>
          </div>

          <a 
            href="#curriculum"
            className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <span>Review Curriculum Scope</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default CareerOutcomes;
