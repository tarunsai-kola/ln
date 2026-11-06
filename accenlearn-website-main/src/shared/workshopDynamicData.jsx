import React from "react";
import { FaPython, FaReact, FaAws, FaDocker, FaDatabase, FaNodeJs, FaJava, FaCode, FaServer, FaCogs, FaMobileAlt, FaChartBar, FaBrain, FaNetworkWired, FaLock, FaRocket } from "react-icons/fa";
import { SiTensorflow, SiKubernetes, SiMongodb, SiGraphql, SiPytorch, SiKeras, SiDjango, SiAngular, SiSpringboot, SiPostgresql, SiMysql, SiApachespark, SiApachekafka, SiSolidity, SiFigma } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

// Helper to generate dynamic tech stacks
const TECH_STACKS = {
  "Artificial Intelligence": [
    { icon: <FaPython className="w-8 h-8 text-blue-500" />, name: "Python" },
    { icon: <SiTensorflow className="w-8 h-8 text-orange-500" />, name: "TensorFlow" },
    { icon: <SiPytorch className="w-8 h-8 text-red-500" />, name: "PyTorch" },
    { icon: <FaBrain className="w-8 h-8 text-pink-500" />, name: "Deep Learning" },
    { icon: <FaAws className="w-8 h-8 text-orange-400" />, name: "AWS SageMaker" },
    { icon: <SiKeras className="w-8 h-8 text-red-600" />, name: "Keras" },
    { icon: <FaChartBar className="w-8 h-8 text-green-500" />, name: "Data Viz" },
  ],
  "Full Stack Software Development": [
    { icon: <FaReact className="w-8 h-8 text-cyan-400" />, name: "React" },
    { icon: <FaNodeJs className="w-8 h-8 text-green-500" />, name: "Node.js" },
    { icon: <TbBrandNextjs className="w-8 h-8 text-slate-800" />, name: "Next.js" },
    { icon: <SiMongodb className="w-8 h-8 text-green-400" />, name: "MongoDB" },
    { icon: <FaDocker className="w-8 h-8 text-blue-500" />, name: "Docker" },
    { icon: <SiGraphql className="w-8 h-8 text-pink-500" />, name: "GraphQL" },
    { icon: <FaAws className="w-8 h-8 text-orange-400" />, name: "AWS" },
  ],
  "Data Science": [
    { icon: <FaPython className="w-8 h-8 text-blue-500" />, name: "Python" },
    { icon: <FaDatabase className="w-8 h-8 text-indigo-400" />, name: "SQL" },
    { icon: <SiApachespark className="w-8 h-8 text-orange-500" />, name: "Spark" },
    { icon: <FaChartBar className="w-8 h-8 text-green-500" />, name: "Tableau" },
    { icon: <SiTensorflow className="w-8 h-8 text-orange-500" />, name: "TensorFlow" },
    { icon: <FaAws className="w-8 h-8 text-orange-400" />, name: "AWS" },
  ],
  "DevOps": [
    { icon: <FaDocker className="w-8 h-8 text-blue-500" />, name: "Docker" },
    { icon: <SiKubernetes className="w-8 h-8 text-blue-500" />, name: "Kubernetes" },
    { icon: <FaAws className="w-8 h-8 text-orange-400" />, name: "AWS" },
    { icon: <FaServer className="w-8 h-8 text-slate-700" />, name: "Jenkins" },
    { icon: <FaPython className="w-8 h-8 text-blue-500" />, name: "Python" },
    { icon: <FaNetworkWired className="w-8 h-8 text-teal-500" />, name: "Terraform" },
  ],
  "Default": [
    { icon: <FaCode className="w-8 h-8 text-blue-500" />, name: "Programming" },
    { icon: <FaServer className="w-8 h-8 text-slate-700" />, name: "Systems" },
    { icon: <FaDatabase className="w-8 h-8 text-indigo-400" />, name: "Databases" },
    { icon: <FaCogs className="w-8 h-8 text-orange-500" />, name: "Engineering" },
    { icon: <FaNetworkWired className="w-8 h-8 text-teal-500" />, name: "Architecture" },
  ],
  "UI/UX Design": [
    { icon: <SiFigma className="w-8 h-8 text-pink-500" />, name: "Figma" },
    { icon: <FaMobileAlt className="w-8 h-8 text-slate-800" />, name: "Prototyping" },
    { icon: <FaChartBar className="w-8 h-8 text-blue-500" />, name: "User Research" },
  ],
  "Embedded Systems": [
    { icon: <FaCogs className="w-8 h-8 text-slate-700" />, name: "Microcontrollers" },
    { icon: <FaCode className="w-8 h-8 text-blue-500" />, name: "Embedded C/C++" },
    { icon: <FaNetworkWired className="w-8 h-8 text-green-500" />, name: "RTOS" },
  ],
  "VLSI Design": [
    { icon: <FaCogs className="w-8 h-8 text-blue-600" />, name: "ASIC/FPGA" },
    { icon: <FaCode className="w-8 h-8 text-slate-700" />, name: "Verilog/VHDL" },
    { icon: <FaDatabase className="w-8 h-8 text-green-600" />, name: "CMOS Design" },
  ],
  "Android App Development": [
    { icon: <FaMobileAlt className="w-8 h-8 text-green-500" />, name: "Android SDK" },
    { icon: <FaJava className="w-8 h-8 text-orange-500" />, name: "Kotlin/Java" },
    { icon: <FaDatabase className="w-8 h-8 text-blue-500" />, name: "Room DB" },
  ],
  "IoT & Robotics": [
    { icon: <FaNetworkWired className="w-8 h-8 text-blue-500" />, name: "IoT Protocols" },
    { icon: <FaCogs className="w-8 h-8 text-slate-700" />, name: "Robotics" },
    { icon: <FaCode className="w-8 h-8 text-green-500" />, name: "C++/Python" },
  ],
  "AutoCAD": [
    { icon: <FaCogs className="w-8 h-8 text-blue-500" />, name: "2D Drafting" },
    { icon: <FaCode className="w-8 h-8 text-slate-600" />, name: "3D Modeling" },
    { icon: <FaNetworkWired className="w-8 h-8 text-orange-500" />, name: "Design Standards" },
  ]
};

// Helper to generate dynamic salary data
const SALARY_DATA = {
  "Artificial Intelligence": {
    entry: { min: "8 LPA", avg: "12 LPA", max: "18 LPA", roles: "Junior AI Engineer, ML Analyst, Data Trainee", companies: ["Google", "Microsoft", "OpenAI", "TCS"] },
    mid: { min: "18 LPA", avg: "25 LPA", max: "35 LPA", roles: "ML Engineer, AI Researcher, Senior Analyst", companies: ["Amazon", "Meta", "NVIDIA", "Infosys"] },
    senior: { min: "35 LPA", avg: "50 LPA", max: "80+ LPA", roles: "Principal AI Scientist, Head of AI, Lead ML Architect", companies: ["Google DeepMind", "Tesla", "Apple", "Uber"] }
  },
  "Full Stack Software Development": {
    entry: { min: "5 LPA", avg: "8 LPA", max: "12 LPA", roles: "Junior Developer, Frontend Engineer, Trainee", companies: ["TCS", "Infosys", "Wipro", "Accenture"] },
    mid: { min: "12 LPA", avg: "18 LPA", max: "28 LPA", roles: "Senior SDE, Tech Lead, Full Stack Specialist", companies: ["Amazon", "Microsoft", "Goldman Sachs", "Walmart Labs"] },
    senior: { min: "25 LPA", avg: "40 LPA", max: "60+ LPA", roles: "Staff Engineer, Architect, Engineering Manager", companies: ["Google", "Meta", "Netflix", "Atlassian"] }
  },
  "Default": {
    entry: { min: "4 LPA", avg: "7 LPA", max: "10 LPA", roles: "Associate, Analyst, Trainee", companies: ["Top Tier IT", "MNCs", "Startups"] },
    mid: { min: "10 LPA", avg: "15 LPA", max: "22 LPA", roles: "Specialist, Senior Associate, Consultant", companies: ["Fortune 500", "Product Companies"] },
    senior: { min: "20 LPA", avg: "30 LPA", max: "45+ LPA", roles: "Lead, Manager, Principal", companies: ["Global Tech Giants", "Industry Leaders"] }
  },
  "UI/UX Design": {
    entry: { min: "4 LPA", avg: "6 LPA", max: "10 LPA", roles: "Junior UI/UX Designer, Visual Designer", companies: ["TCS", "Cognizant", "Zomato", "Swiggy"] },
    mid: { min: "10 LPA", avg: "15 LPA", max: "22 LPA", roles: "Senior Product Designer, UX Researcher", companies: ["Amazon", "Flipkart", "Paytm", "Cred"] },
    senior: { min: "22 LPA", avg: "35 LPA", max: "50+ LPA", roles: "Lead Product Designer, Head of Design", companies: ["Google", "Meta", "Airbnb", "Uber"] }
  },
  "Embedded Systems": {
    entry: { min: "4 LPA", avg: "7 LPA", max: "10 LPA", roles: "Embedded Software Engineer, Firmware Trainee", companies: ["Bosch", "TCS", "HCL", "Wipro"] },
    mid: { min: "10 LPA", avg: "16 LPA", max: "25 LPA", roles: "Senior Firmware Engineer, Systems Designer", companies: ["Qualcomm", "Intel", "Texas Instruments", "NXP"] },
    senior: { min: "25 LPA", avg: "38 LPA", max: "60+ LPA", roles: "Lead Embedded Architect, Systems Architect", companies: ["Apple", "Tesla", "NVIDIA", "Samsung"] }
  },
  "VLSI Design": {
    entry: { min: "6 LPA", avg: "10 LPA", max: "15 LPA", roles: "ASIC Verification Engineer, Layout Design Trainee", companies: ["Intel", "AMD", "Wipro", "TCS"] },
    mid: { min: "15 LPA", avg: "24 LPA", max: "35 LPA", roles: "Physical Design Engineer, Senior Verification Engineer", companies: ["Qualcomm", "Broadcom", "NVIDIA", "MediaTek"] },
    senior: { min: "35 LPA", avg: "50 LPA", max: "80+ LPA", roles: "Principal VLSI Architect, Silicon Lead", companies: ["Intel", "Apple", "AMD", "NVIDIA"] }
  },
  "Android App Development": {
    entry: { min: "4 LPA", avg: "6 LPA", max: "10 LPA", roles: "Junior Android Developer, Mobile App Trainee", companies: ["TCS", "Infosys", "Startups"] },
    mid: { min: "10 LPA", avg: "16 LPA", max: "25 LPA", roles: "Senior Android Developer, Mobile Tech Lead", companies: ["Zomato", "Swiggy", "PhonePe", "Dream11"] },
    senior: { min: "25 LPA", avg: "35 LPA", max: "50+ LPA", roles: "Lead Mobile Architect, Engineering Manager", companies: ["Google", "Uber", "Spotify", "Netflix"] }
  },
  "IoT & Robotics": {
    entry: { min: "5 LPA", avg: "8 LPA", max: "12 LPA", roles: "IoT Developer, Robotics Trainee", companies: ["Bosch", "TCS", "L&T", "Siemens"] },
    mid: { min: "12 LPA", avg: "18 LPA", max: "28 LPA", roles: "Senior IoT Architect, Robotics Engineer", companies: ["ABB", "Honeywell", "GE", "Amazon Robotics"] },
    senior: { min: "28 LPA", avg: "40 LPA", max: "65+ LPA", roles: "Principal Robotics Scientist, Head of IoT", companies: ["Tesla", "Boston Dynamics", "Amazon", "NVIDIA"] }
  },
  "AutoCAD": {
    entry: { min: "3 LPA", avg: "5 LPA", max: "8 LPA", roles: "Draftsman, CAD Trainee, Junior Designer", companies: ["L&T", "Tata Projects", "Godrej", "Design Firms"] },
    mid: { min: "8 LPA", avg: "12 LPA", max: "18 LPA", roles: "Senior CAD Designer, Project Lead", companies: ["Atkins", "Fluor", "Jacobs", "AECOM"] },
    senior: { min: "18 LPA", avg: "25 LPA", max: "35+ LPA", roles: "Design Manager, Lead Architect", companies: ["Foster + Partners", "L&T Construction", "Global EPCs"] }
  }
};

// Domain-specialized production capstone projects
export const getProjectsForDomain = (courseTitle) => {
  const t = courseTitle || "Technical Domains";

  // 1. Artificial Intelligence & Machine Learning
  if (t.includes("Artificial Intelligence") || t.includes("Machine Learning") || t.includes("AI")) {
    return [
      {
        category: "Generative AI & LLMs",
        title: "Autonomous Enterprise RAG & Multi-Agent Assistant",
        desc: "Architected a hybrid retrieval pipeline combining dense vector embeddings with BM25 reranking, dynamic document chunking, and hallucination guardrails across 500k+ technical documents.",
        deliverable: "Multi-agent orchestration system with sub-200ms latency and automated eval metrics.",
        tech: ["LangGraph", "vLLM", "Qdrant", "PyTorch", "FastAPI"],
        featured: true
      },
      {
        category: "Computer Vision",
        title: "Edge Defect Detection with TensorRT Acceleration",
        desc: "Engineered an industrial edge vision pipeline detecting micro-defects on assembly lines with INT8 quantization, automated data augmentation, and high-speed video inference.",
        deliverable: "Quantized edge container running at 60+ FPS with 96.4% mean Average Precision (mAP).",
        tech: ["YOLOv10", "TensorRT", "OpenCV", "PyTorch", "Docker"],
        featured: false
      },
      {
        category: "MLOps Platform",
        title: "Automated Continuous Training & Feature Serving Pipeline",
        desc: "Constructed a zero-touch MLOps framework handling daily retraining triggers, Evidently AI drift detection, Feast online feature retrieval, and Canary rollout routing.",
        deliverable: "Fully automated CI/CD machine learning lifecycle on Kubernetes with Prometheus telemetry.",
        tech: ["MLflow", "Kubeflow", "Feast", "Docker", "AWS SageMaker"],
        featured: false
      },
      {
        category: "Conversational Systems",
        title: "Streaming Voice AI Agent with Dynamic Function Calling",
        desc: "Developed a bidirectional streaming voice assistant integrating Whisper streaming ASR, semantic intent parsing, function calling, and low-latency voice synthesis.",
        deliverable: "Sub-400ms voice-to-voice interactive conversational pipeline tested over WebSockets.",
        tech: ["Whisper API", "Transformers", "WebSockets", "FastAPI", "Redis"],
        featured: false
      },
      {
        category: "Predictive Analytics",
        title: "Enterprise Churn Risk & Explainable Decision Engine",
        desc: "Built a production gradient-boosted churn prediction engine equipped with SHAP attribution plots, automated risk scoring, and webhook notification triggers.",
        deliverable: "Calibrated probability model with real-time API endpoints and operational Streamlit cockpit.",
        tech: ["XGBoost", "SHAP", "Scikit-Learn", "PostgreSQL", "Streamlit"],
        featured: false
      }
    ];
  }

  // 2. Cyber Security
  if (t.includes("Cyber Security") || t.includes("Security")) {
    return [
      {
        category: "Offensive Security",
        title: "Full-Scope Enterprise Red-Team Penetration Engagement",
        desc: "Simulated an advanced adversary attack across Windows Active Directory forest, executing Kerberoasting, privilege escalation, internal pivoting, and egress filtering evasion.",
        deliverable: "Comprehensive technical penetration testing report with CVE mitigations and remediation scripts.",
        tech: ["Burp Suite Pro", "BloodHound", "Metasploit", "Active Directory", "Wireshark"],
        featured: true
      },
      {
        category: "Defensive SecOps",
        title: "Automated SIEM Threat Hunting & SOC Alert Pipeline",
        desc: "Configured an enterprise SIEM ingesting multi-source telemetry, developing custom Sigma rules, and mapping adversary activity to the MITRE ATT&CK enterprise matrix.",
        deliverable: "Live security dashboard with automated IP blacklisting playbooks and incident response alerts.",
        tech: ["Splunk Enterprise", "Sigma Rules", "Elastic SIEM", "Suricata", "Python"],
        featured: false
      },
      {
        category: "Cloud Security",
        title: "Multi-Cloud Zero-Trust Perimeter & IAM Governance Suite",
        desc: "Hardened AWS and Azure enterprise perimeters using least-privilege IAM roles, automated S3 bucket encryption auditing, and HashiCorp Vault secrets rotation.",
        deliverable: "Audited Terraform IaC templates achieving 100% compliance with CIS Cloud Benchmarks.",
        tech: ["Prisma Cloud", "AWS IAM", "HashiCorp Vault", "Terraform", "WAF"],
        featured: false
      },
      {
        category: "Digital Forensics",
        title: "Malware Triage & Reverse Engineering Analysis Sandbox",
        desc: "Analyzed obfuscated ransomware binaries in an isolated sandbox, extracting C2 IP configurations, registry persistence keys, and unpacking encrypted payload stages.",
        deliverable: "Forensic analysis dossier, IOC indicators of compromise, and custom YARA signatures.",
        tech: ["Ghidra", "x64dbg", "Volatility", "YARA", "Cuckoo Sandbox"],
        featured: false
      },
      {
        category: "AppSec Engineering",
        title: "Automated DevSecOps Pipeline with SAST & DAST Gating",
        desc: "Integrated automated security testing into GitLab CI pipelines, enforcing zero-vulnerability PR gating with software composition analysis and container image scanning.",
        deliverable: "Automated CI/CD security pipeline preventing high/critical CVEs from reaching production.",
        tech: ["Snyk", "SonarQube", "OWASP ZAP", "Trivy", "GitLab CI"],
        featured: false
      }
    ];
  }

  // 3. Cloud Computing & DevOps
  if (t.includes("Cloud") || t.includes("DevOps")) {
    return [
      {
        category: "Cloud Architecture",
        title: "Multi-Region Highly Available Kubernetes Infrastructure",
        desc: "Designed and provisioned an enterprise AWS EKS cluster spanning multiple geographic regions with Istio service mesh mTLS, cross-region Route 53 latency routing, and auto-scaling.",
        deliverable: "Production Kubernetes cluster with automated failover and 99.99% uptime benchmark.",
        tech: ["AWS EKS", "Istio Mesh", "Terraform", "Helm", "Prometheus/Grafana"],
        featured: true
      },
      {
        category: "GitOps & Automation",
        title: "Declarative GitOps Continuous Delivery Platform",
        desc: "Built a zero-touch declarative deployment engine with ArgoCD, GitHub Actions, semantic release gating, automated rollback policies, and Slack notification webhooks.",
        deliverable: "Fully automated pull-request-to-production deployment pipeline completing in under 4 minutes.",
        tech: ["ArgoCD", "GitHub Actions", "Docker", "Kustomize", "Slack Webhooks"],
        featured: false
      },
      {
        category: "IaC & Governance",
        title: "Modular Enterprise Infrastructure as Code Framework",
        desc: "Architected modular Terraform modules provisioning secure VPCs, private subnets, bastion jumpboxes, Aurora serverless clusters, and KMS envelope encryption.",
        deliverable: "Audited, versioned Terraform registry passing Terratest and Checkov security scans.",
        tech: ["Terraform", "Terragrunt", "AWS VPC", "Aurora DB", "Checkov"],
        featured: false
      },
      {
        category: "Site Reliability",
        title: "Unified Observability & Distributed APM Telemetry Stack",
        desc: "Deployed full-stack distributed tracing and metric aggregation across 30+ containerized microservices with OpenTelemetry, Jaeger tracing, and Grafana Loki logs.",
        deliverable: "Real-time SRE cockpit tracking SLIs/SLOs with automated PagerDuty incident escalation.",
        tech: ["OpenTelemetry", "Jaeger", "Grafana Loki", "Prometheus", "Alertmanager"],
        featured: false
      },
      {
        category: "FinOps Engineering",
        title: "Cloud Cost Optimization & Predictive Spot Auto-Scaler",
        desc: "Designed an automated Kubernetes spot-instance fallback engine and right-sizing controller cutting monthly cloud infrastructure expenditures by 44%.",
        deliverable: "Automated cost governance controller with weekly executive cost savings audit reports.",
        tech: ["Karpenter", "AWS Cost Explorer", "Python Boto3", "HPA", "Kubecost"],
        featured: false
      }
    ];
  }

  // 4. Full Stack Software Development & DSA
  if (t.includes("Full Stack") || t.includes("Software Development") || t.includes("Data Structures") || t.includes("Android")) {
    return [
      {
        category: "Full Stack SaaS",
        title: "Enterprise Multi-Tenant SaaS Platform with RBAC & Billing",
        desc: "Architected a scalable SaaS web application featuring multi-tenant PostgreSQL schema isolation, Stripe billing webhooks, granular RBAC permissions, and SSR rendering.",
        deliverable: "Fully functional SaaS application with live payment checkout, JWT auth, and admin portal.",
        tech: ["Next.js 14", "TypeScript", "Node.js", "PostgreSQL", "Stripe API", "Tailwind CSS"],
        featured: true
      },
      {
        category: "Backend Systems",
        title: "High-Throughput Distributed Event Streaming Engine",
        desc: "Engineered an event-driven processing microservice processing 40k events/sec using Kafka message partitioning, Redis caching layers, and optimistic database concurrency.",
        deliverable: "Benchmarked event pipeline with zero message drop under simulated surge conditions.",
        tech: ["Node.js", "Apache Kafka", "Redis", "Docker", "Prisma ORM"],
        featured: false
      },
      {
        category: "Real-Time Systems",
        title: "Collaborative Real-Time Workspace with Conflict-Free Replicated Data",
        desc: "Constructed a multi-user collaborative whiteboard and rich-text document suite utilizing CRDT algorithms, WebSockets, client-side presence indicators, and offline sync.",
        deliverable: "Production-ready collaborative editor handling simultaneous typing with zero merge collisions.",
        tech: ["React.js", "WebSockets", "Yjs (CRDT)", "Node.js", "IndexedDB"],
        featured: false
      },
      {
        category: "Algorithms & Dispatch",
        title: "Algorithmic Routing & Intelligent Spatial Dispatch Engine",
        desc: "Implemented custom graph routing algorithms (A* search, Dijkstra) for real-time delivery rider allocation, dynamic ETA updates, and spatial geofence matching.",
        deliverable: "High-efficiency spatial dispatch service reducing simulated delivery travel latency by 26%.",
        tech: ["TypeScript", "Graph Algorithms", "PostGIS", "Redis Geo", "Leaflet"],
        featured: false
      },
      {
        category: "API Architecture",
        title: "Enterprise REST & GraphQL Gateway with Sliding-Window Rate Limiting",
        desc: "Constructed a centralized API gateway with JWT validation, Redis token bucket rate limiting, automated request validation, and self-documenting OpenAPI specs.",
        deliverable: "Resilient API gateway shielding downstream microservices from traffic surges and DDoS attacks.",
        tech: ["NestJS", "GraphQL", "Redis", "Docker", "Swagger"],
        featured: false
      }
    ];
  }

  // 5. Data Science, Data Analytics & SQL
  if (t.includes("Data") || t.includes("Analytics") || t.includes("SQL")) {
    return [
      {
        category: "Lakehouse Engineering",
        title: "Enterprise Modern Data Stack & Predictive Churn Pipeline",
        desc: "Architected an automated ELT pipeline transforming millions of raw ERP transactions into analytics-ready Snowflake tables using dbt, with automated ML churn scoring.",
        deliverable: "Production data warehouse with automated daily DAGs, dbt documentation, and executive BI.",
        tech: ["Snowflake", "dbt", "Apache Airflow", "Python", "Tableau"],
        featured: true
      },
      {
        category: "Advanced Analytics",
        title: "Customer RFM Behavioral Segmentation & Cohort Analysis",
        desc: "Analyzed 1.5M+ retail purchase logs using K-Means clustering, Recency-Frequency-Monetary (RFM) modeling, and retention cohorts to uncover high-margin buyer personas.",
        deliverable: "Interactive customer persona dashboard with automated lifecycle marketing recommendations.",
        tech: ["Python (Pandas/NumPy)", "Scikit-Learn", "PostgreSQL", "Seaborn"],
        featured: false
      },
      {
        category: "Predictive Modeling",
        title: "Real-Time Financial Anomaly & Fraud Scoring Engine",
        desc: "Trained an imbalanced classification pipeline detecting fraudulent financial transactions with SMOTE resampling, Isolation Forests, and sub-second REST API scoring.",
        deliverable: "Production API endpoint with 94.6% fraud detection precision and explainable SHAP reasoning.",
        tech: ["XGBoost", "Imbalanced-Learn", "SQL Window Functions", "FastAPI"],
        featured: false
      },
      {
        category: "Forecasting",
        title: "Multi-Location Inventory Demand & Time-Series Forecaster",
        desc: "Constructed hierarchical time-series models with Prophet and SARIMAX predicting SKU-level demand 90 days out, reducing inventory holding costs by 18%.",
        deliverable: "Automated replenishment dashboard delivering high-accuracy seasonal demand forecasts.",
        tech: ["Prophet", "Statsmodels", "SQL", "Power BI", "Python"],
        featured: false
      },
      {
        category: "Business Intelligence",
        title: "C-Suite Executive Unit Economics & Growth Cockpit",
        desc: "Developed an institutional BI dashboard tracking CAC-to-LTV ratios, monthly recurring revenue (MRR), payback duration, and departmental EBITDA margins.",
        deliverable: "Published Power BI dashboard with row-level security and automated scheduled data refresh.",
        tech: ["Power BI", "Advanced DAX", "Complex SQL CTEs", "Snowflake"],
        featured: false
      }
    ];
  }

  // 6. Embedded Systems & VLSI Design
  if (t.includes("Embedded") || t.includes("VLSI")) {
    return [
      {
        category: "Safety-Critical Embedded",
        title: "Automotive CAN Bus ECU Controller with FreeRTOS",
        desc: "Engineered safety-critical electronic control unit (ECU) firmware running FreeRTOS on STM32 ARM Cortex, managing deterministic sensor sampling and CAN 2.0B bus telemetry.",
        deliverable: "Hardware-tested firmware binary with deterministic task scheduling under 2ms latency.",
        tech: ["STM32 ARM Cortex", "FreeRTOS", "Embedded C", "CAN Bus", "Logic Analyzer"],
        featured: true
      },
      {
        category: "Silicon Verification",
        title: "Universal Verification Methodology (UVM) Testbench for AXI4 Bus",
        desc: "Constructed a comprehensive UVM verification environment with constrained-random sequences, SystemVerilog assertions (SVA), scoreboards, and functional coverage models.",
        deliverable: "Verified RTL design achieving 100% functional and code coverage closure.",
        tech: ["SystemVerilog", "UVM", "QuestaSim / ModelSim", "AXI4 Protocol"],
        featured: false
      },
      {
        category: "Processor Design",
        title: "Pipelined 32-Bit RISC-V Processor Core on FPGA",
        desc: "Designed and synthesized a 5-stage pipelined RV32I processor core in Verilog featuring hazard resolution, data forwarding, branch prediction, and memory bus interfaces.",
        deliverable: "FPGA-synthesized processor core executing compiled C and assembly test programs.",
        tech: ["Verilog HDL", "Xilinx Vivado", "Basys 3 FPGA", "GTKWave", "RISC-V ISA"],
        featured: false
      },
      {
        category: "Industrial IoT",
        title: "Ultra-Low-Power Sensor Node with BLE & LoRaWAN",
        desc: "Programmed edge sensor firmware with deep sleep power profiling (<12uA), hardware encryption, dynamic frequency scaling, and long-range LoRaWAN cloud uplinks.",
        deliverable: "Battery-powered wireless sensor node operational for 2+ years on a single coin cell.",
        tech: ["ESP32 / nRF52", "LoRaWAN", "I2C/SPI Protocols", "Power Profiler"],
        featured: false
      },
      {
        category: "Physical Design",
        title: "ASIC Digital Backend Flow & Static Timing Closure (STA)",
        desc: "Executed complete physical design flow from synthesized gate-level netlist through floorplanning, power distribution networks, clock tree synthesis, and timing closure.",
        deliverable: "Tape-out clean GDSII layout with zero setup/hold timing violations at 500MHz.",
        tech: ["Cadence Innovus / Synopsys", "PrimeTime STA", "DRC/LVS Verification", "LEF/DEF"],
        featured: false
      }
    ];
  }

  // 7. UI/UX Design & Digital Products
  if (t.includes("UI/UX") || t.includes("Graphics") || t.includes("Design")) {
    return [
      {
        category: "Enterprise Product Design",
        title: "Scalable Enterprise SaaS Platform & 200+ Component Design System",
        desc: "Conducted user research, mapped complex enterprise workflows, and engineered an atomic design system with design tokens, component variants, and WCAG AAA accessibility.",
        deliverable: "Complete Figma design system, clickable desktop/mobile prototype, and handoff specs.",
        tech: ["Figma", "Design Tokens", "Auto-Layout", "Zeroheight", "User Research"],
        featured: true
      },
      {
        category: "FinTech UX/UI",
        title: "Mobile Banking & Micro-Investment Experience",
        desc: "Designed an intuitive mobile financial application streamlining wealth management, biometric payments, and personal budgeting, validated through 20+ usability tests.",
        deliverable: "High-fidelity interactive prototype achieving 94% task completion in user benchmarking.",
        tech: ["Figma", "Protopie", "Usability Benchmarking", "Information Architecture"],
        featured: false
      },
      {
        category: "Healthcare UX",
        title: "Telemedicine Patient Portal & Clinical Consultation Suite",
        desc: "Simplified remote doctor booking, electronic prescriptions, and live tele-consultations with an accessible visual hierarchy tailored for diverse user demographics.",
        deliverable: "Comprehensive UX case study with detailed user personas, journey maps, and wireframes.",
        tech: ["Figma", "WCAG 2.1 Guidelines", "Wireframing", "Card Sorting"],
        featured: false
      },
      {
        category: "Conversion Design",
        title: "D2C E-Commerce Funnel Optimization & 1-Click Checkout",
        desc: "Redesigned product exploration pages and streamlined cart checkouts using behavioral heuristics and heat-map insights, cutting user abandonment by 31%.",
        deliverable: "Production-ready responsive web layouts with comprehensive design documentation.",
        tech: ["Figma", "Heuristic Evaluation", "Micro-Copy Strategy", "Hotjar Analytics"],
        featured: false
      },
      {
        category: "Motion & Interaction",
        title: "Interactive Micro-Interactions & Lottie Animation Library",
        desc: "Created dynamic state transitions, haptic animation states, and vector celebrations exported directly to production Lottie JSON for seamless developer handoff.",
        deliverable: "Interactive component prototype and production-ready JSON animation library.",
        tech: ["After Effects", "Lottie", "Principle", "Figma Smart Animate"],
        featured: false
      }
    ];
  }

  // 8. Digital Marketing
  if (t.includes("Marketing")) {
    return [
      {
        category: "Performance Marketing",
        title: "Omnichannel Paid Media Campaign & 3.8x ROAS Scaling Strategy",
        desc: "Structured and executed end-to-end performance marketing across Google Search, Meta Ads, and Performance Max with dynamic remarketing and multi-touch attribution.",
        deliverable: "Live campaign performance audit dossier showcasing 3.8x ROAS and 28% lower CAC.",
        tech: ["Google Ads", "Meta Ads Manager", "Google Tag Manager", "GA4", "Looker Studio"],
        featured: true
      },
      {
        category: "SEO Strategy",
        title: "Enterprise Technical SEO Audit & Keyword Cluster Roadmap",
        desc: "Audited site architecture, resolved indexing and canonical issues, optimized Core Web Vitals, and built an authoritative 50-topic keyword cluster to capture organic intent.",
        deliverable: "60-page comprehensive technical SEO audit and executable content calendar.",
        tech: ["Ahrefs", "SEMrush", "Screaming Frog", "Search Console", "Schema.org"],
        featured: false
      },
      {
        category: "Conversion Science",
        title: "High-Velocity CRO Landing Page Experimentation Program",
        desc: "Designed and executed multivariate A/B tests on key commercial landing pages using heatmaps, scroll maps, and psychological value propositions to lift conversions by 24%.",
        deliverable: "Statistically validated A/B experiment report with documented conversion uplifts.",
        tech: ["Hotjar", "VWO", "Google Analytics 4", "Unbounce", "Split Testing"],
        featured: false
      },
      {
        category: "Lifecycle Marketing",
        title: "Automated Customer Retention & Email Segmentation Funnel",
        desc: "Built behavioral email and SMS automation workflows for customer onboarding, abandoned cart recovery, and win-back campaigns using predictive customer segmentations.",
        deliverable: "7-stage automated retention email workflow generating measurable repeat revenue.",
        tech: ["Klaviyo / HubSpot", "Behavioral Triggers", "HTML Email Design", "A/B Testing"],
        featured: false
      },
      {
        category: "Brand & Influencer",
        title: "Programmatic Influencer ROI Tracking & Attribution Model",
        desc: "Constructed an influencer performance attribution model calculating true Earned Media Value (EMV), tracking unique referral conversions, and managing creator contracts.",
        deliverable: "End-to-end influencer marketing ROI framework and commercial performance dashboard.",
        tech: ["Affiliate Tracking", "Looker Studio", "Excel Financial Modeling", "Social Analytics"],
        featured: false
      }
    ];
  }

  // 9. Human Resource (HR)
  if (t.includes("Human Resource") || t.includes("HR")) {
    return [
      {
        category: "Talent Strategy",
        title: "Competency-Based Technical Hiring & Interview Rubric Architecture",
        desc: "Constructed a standardized talent acquisition playbook with structured behavioral scorecards, bias-free evaluation rubrics, and automated ATS workflow stages.",
        deliverable: "Complete talent acquisition framework reducing average time-to-hire by 21 days.",
        tech: ["Greenhouse / Lever ATS", "LinkedIn Recruiter", "Competency Modeling", "Excel Analytics"],
        featured: true
      },
      {
        category: "People Analytics",
        title: "Predictive Employee Attrition & Workforce Retention Cockpit",
        desc: "Built an interactive analytics dashboard correlating engagement survey sentiment, tenure milestones, and compensation parity to forecast quarterly turnover risks.",
        deliverable: "Executive HR analytics dashboard with targeted retention intervention strategies.",
        tech: ["Power BI", "HR Metrics", "Survey Analytics", "Workday Data Models"],
        featured: false
      },
      {
        category: "Total Rewards",
        title: "Modern Compensation Banding & ESOP Incentive Structure",
        desc: "Designed equitable salary benchmark bands, departmental grading hierarchies, and performance-linked bonus formulas aligned with competitive industry market surveys.",
        deliverable: "Complete corporate compensation architecture and employee equity incentive policy.",
        tech: ["Mercer / Radford Surveys", "Grading Hierarchies", "Payroll Compliance", "Excel"],
        featured: false
      },
      {
        category: "Performance Ops",
        title: "Continuous Feedback & OKR Performance Management System",
        desc: "Replaced outdated annual performance reviews with continuous quarterly OKR tracking, 360-degree peer evaluations, and structured manager calibration sessions.",
        deliverable: "Company-wide performance management implementation guide and evaluation rubrics.",
        tech: ["Lattice / Culture Amp", "OKR Frameworks", "Manager Guides", "Feedback Systems"],
        featured: false
      },
      {
        category: "Statutory Compliance",
        title: "Enterprise Labor Law Governance & Policy Handbook",
        desc: "Authored legally compliant organizational workplace policies covering POSH regulations, statutory benefits, hybrid work policies, and progressive disciplinary frameworks.",
        deliverable: "Legally reviewed Employee Handbook and HR operational standard operating procedures.",
        tech: ["Labor Law Standards", "POSH Compliance", "HR Policy Writing", "SOP Development"],
        featured: false
      }
    ];
  }

  // 10. Finance & Capital Markets
  if (t.includes("Finance") || t.includes("Stock Market")) {
    return [
      {
        category: "Valuation & Modeling",
        title: "Audit-Ready 3-Statement Financial Model & DCF Valuation",
        desc: "Built an institutional dynamic 3-statement forecast model for a listed public enterprise with working capital schedules, debt waterfalls, DCF valuation, and sensitivity tables.",
        deliverable: "Institutional financial model with Monte Carlo simulations and target price recommendation.",
        tech: ["Advanced Financial Modeling", "DCF", "WACC Calculation", "Scenario Analysis"],
        featured: true
      },
      {
        category: "Investment Banking",
        title: "Strategic M&A Accretion/Dilution Analysis & Deal Pitch Deck",
        desc: "Modeled a corporate acquisition transaction, evaluating cash vs. stock consideration, cost synergies, pro-forma EPS accretion, and post-merger debt service capacity.",
        deliverable: "Investment committee pitch deck with transaction structuring rationale and financial terms.",
        tech: ["M&A Accretion Modeling", "CapIQ / Bloomberg Concepts", "Pitch Deck Creation", "Excel"],
        featured: false
      },
      {
        category: "Portfolio Strategy",
        title: "Multi-Asset Risk-Adjusted Portfolio Optimization Framework",
        desc: "Applied Modern Portfolio Theory (MPT) to calculate optimal asset weightings on the Efficient Frontier, measuring Value at Risk (VaR), Sharpe ratios, and beta exposure.",
        deliverable: "Institutional asset allocation proposal and risk mitigation framework.",
        tech: ["Markowitz Optimization", "VaR Calculations", "Python / Excel", "Backtesting"],
        featured: false
      },
      {
        category: "Equity Research",
        title: "Institutional Equity Research Initiating Coverage Report",
        desc: "Authored a 25-page initiating coverage note on an industry sector leader, featuring competitive moat evaluation (Porter's Five Forces), revenue catalysts, and trading comps.",
        deliverable: "Professional equity research report formatted for asset manager and institutional review.",
        tech: ["Equity Research", "Financial Ratio Analysis", "EV/EBITDA Multiples", "Forecasting"],
        featured: false
      },
      {
        category: "Treasury Management",
        title: "Corporate Working Capital & Foreign Exchange Hedging Study",
        desc: "Optimized corporate cash conversion cycles (CCC) and modeled currency hedging strategies using FX forward contracts to protect operating margins from forex swings.",
        deliverable: "Treasury risk policy proposal minimizing borrowing costs and currency exposure.",
        tech: ["Cash Flow Forecasting", "Forex Hedging", "Working Capital Optimization"],
        featured: false
      }
    ];
  }

  // 11. Medical Coding
  if (t.includes("Medical Coding")) {
    return [
      {
        category: "Surgical Coding",
        title: "Multispecialty Operative Chart Auditing & CPT Modifiers Portfolio",
        desc: "Audited 150+ complex operative reports across orthopedic, cardiology, and general surgery, assigning accurate CPT codes, primary modifiers (-59, -51, -25), and medical necessity.",
        deliverable: "Verified surgical chart audit portfolio achieving 98%+ accuracy under AAPC rubric.",
        tech: ["CPT 2024", "ICD-10-CM", "HCPCS Level II", "EncoderPro", "AAPC Guidelines"],
        featured: true
      },
      {
        category: "Inpatient Hospital Coding",
        title: "Hospital Inpatient Chart Review & MS-DRG Reimbursement Study",
        desc: "Evaluated complex hospital inpatient stays, accurately selecting the Principal Diagnosis, secondary comorbidities (CC/MCC), and calculating correct MS-DRG weights.",
        deliverable: "Comprehensive inpatient DRG assignment documentation eliminating revenue leakage.",
        tech: ["ICD-10-PCS", "MS-DRG Grouper", "UHDDS Guidelines", "Hospital Chart Review"],
        featured: false
      },
      {
        category: "Revenue Integrity",
        title: "Healthcare Payer Denial Mitigation & Reconsideration Appeals Dossier",
        desc: "Investigated denied insurance claims, identified root causes (unbundling, medical necessity, modifier errors), and drafted formal medical necessity appeals with clinical proof.",
        deliverable: "Formal payer appeal packet successfully recovering disputed healthcare claims.",
        tech: ["CMS Reimbursement", "Denial Management", "Payer Contracts", "A/R Aging Analysis"],
        featured: false
      },
      {
        category: "Outpatient Clinic",
        title: "Physician Evaluation & Management (E/M) Guidelines Compliance Audit",
        desc: "Mastered 2021/2023 AMA E/M guidelines, auditing outpatient clinic visits to establish Medical Decision Making (MDM) complexity levels based on problems, data, and risk.",
        deliverable: "Outpatient physician compliance audit protecting clinics from audit recoupments.",
        tech: ["AMA E/M MDM Table", "Outpatient Records", "Audit Spreadsheets", "EncoderPro"],
        featured: false
      },
      {
        category: "Healthcare Governance",
        title: "HIPAA Security & Health Information Privacy Protocol",
        desc: "Constructed an organizational healthcare documentation protocol auditing EHR access logs and establishing compliant standard operating procedures for patient record releases.",
        deliverable: "Hospital-wide health information compliance manual and staff training guidelines.",
        tech: ["HIPAA Privacy & Security Rules", "EHR Record Protocols", "Audit Sampling"],
        featured: false
      }
    ];
  }

  // 12. Psychology
  if (t.includes("Psychology")) {
    return [
      {
        category: "Clinical Formulation",
        title: "12-Session Evidence-Based CBT Case Formulation & Treatment Plan",
        desc: "Constructed an evidence-based Cognitive Behavioral Therapy treatment plan for mood and anxiety disorders, integrating cognitive conceptualization diagrams and behavioral experiments.",
        deliverable: "Comprehensive clinical case formulation dossier with session-by-session milestones.",
        tech: ["CBT Formulation", "Thought Records", "Beck Depression/Anxiety Inventories", "DSM-5-TR"],
        featured: true
      },
      {
        category: "Psychometrics",
        title: "Standardized Psychological Assessment & Psychometric Battery",
        desc: "Administered and interpreted standardized psychological assessment batteries evaluating personality traits, cognitive functions, and affective states with ethical diagnostic write-ups.",
        deliverable: "Professional psychometric assessment report with personalized therapeutic recommendations.",
        tech: ["Big Five / MMPI Concepts", "Wechsler Subscales", "Diagnostic Reporting", "Clinical Ethics"],
        featured: false
      },
      {
        category: "Corporate Wellbeing",
        title: "Enterprise Workplace Mental Health & Burnout Mitigation Program",
        desc: "Designed an organizational psychoeducational initiative addressing employee burnout, psychological safety, and stress resilience for high-pressure corporate environments.",
        deliverable: "4-module corporate mental wellness curriculum and manager facilitation guide.",
        tech: ["EAP Frameworks", "Maslach Burnout Inventory", "MBSR Mindfulness", "Workshops"],
        featured: false
      },
      {
        category: "Crisis Protocol",
        title: "Crisis Intervention & Psychological First Aid Standard Operating Procedure",
        desc: "Built a structured protocol for handling acute psychological crises, suicide ideation risk assessments, and emergency referral pathways with strict ethical boundaries.",
        deliverable: "Crisis triage standard operating procedure and safety planning template.",
        tech: ["C-SSRS Risk Scale", "Stanley-Brown Safety Plan", "Crisis De-escalation", "Ethics"],
        featured: false
      },
      {
        category: "Educational Guidance",
        title: "Adolescent Behavioral Guidance & Academic Intervention Blueprint",
        desc: "Developed an individualized counseling intervention plan addressing academic anxiety, procrastination, and emotional regulation in adolescent students.",
        deliverable: "Structured guidance plan with collaboration rubrics for educators and parents.",
        tech: ["Behavioral Modification", "Solution-Focused Brief Therapy", "Family Systems"],
        featured: false
      }
    ];
  }

  // 13. General / Technology Default
  return [
    {
      category: "Enterprise Scale",
      title: `${t} High-Performance Microservices Architecture`,
      desc: `Architected a high-throughput, horizontally scalable distributed backend handling high concurrency for ${t} applications.`,
      deliverable: "Production codebase with automated test suites and containerized deployment.",
      tech: ["Node.js / Python", "Docker", "PostgreSQL", "Redis", "REST APIs"],
      featured: true
    },
    {
      category: "Cloud Native",
      title: `${t} Cloud Infrastructure & Automated CI/CD Pipeline`,
      desc: `Provisioned multi-environment cloud infrastructure using Infrastructure as Code with automated testing and deployment gates.`,
      deliverable: "Audited Terraform repository and zero-downtime deployment pipelines.",
      tech: ["AWS", "Docker", "GitHub Actions", "Terraform", "Monitoring"],
      featured: false
    },
    {
      category: "Data Systems",
      title: `Real-Time Data Pipeline & Analytics Engine for ${t}`,
      desc: `Constructed an automated stream-and-batch processing pipeline transforming raw events into clean reporting metrics.`,
      deliverable: "End-to-end data processing system with automated ingestion jobs.",
      tech: ["SQL", "Python", "Data Warehousing", "Airflow"],
      featured: false
    },
    {
      category: "API Gateway",
      title: `Enterprise Secure Gateway & Authentication Service for ${t}`,
      desc: `Built a centralized API gateway with token authentication, sliding-window rate limiting, and automated security validation.`,
      deliverable: "Resilient security gateway shielding internal microservices from overload.",
      tech: ["OAuth 2.0", "Redis", "Express / FastAPI", "Swagger"],
      featured: false
    },
    {
      category: "Monitoring & Ops",
      title: `${t} System Telemetry & Executive Monitoring Suite`,
      desc: `Implemented full-stack metric collection and alerting dashboards providing 360-degree observability into system health.`,
      deliverable: "Real-time telemetry dashboard with automated alerting triggers.",
      tech: ["Prometheus", "Grafana", "Log Analysis", "Docker"],
      featured: false
    }
  ];
};

export const getDynamicWorkshopData = (title) => {
  const safeTitle = title || "Technical Domains";

  // Try to find exact matches, otherwise fallback to generic generated content
  const techStack = TECH_STACKS[title] || TECH_STACKS["Default"];
  const salaryData = SALARY_DATA[title] || SALARY_DATA["Default"];
  const projects = getProjectsForDomain(title);

  // Generate domain-tailored dynamic curriculum roadmap
  const getCurriculumForDomain = (courseTitle) => {
    const t = courseTitle || "Technology";

    // 1. Artificial Intelligence
    if (t === "Artificial Intelligence") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Math Foundations & Deep Learning Core",
          icon: <FaBrain className="w-5 h-5 text-blue-500" />,
          topics: [
            "Linear Algebra, Multivariate Calculus & Vectorized Backpropagation",
            "Deep Neural Networks with PyTorch 2.x & Custom Autograd Functions",
            "Advanced Convolutional Architectures, ResNets & Vision Transformers (ViT)",
            "Sequence Modeling: LSTMs, Bidirectional GRUs & Attention Foundations"
          ],
          application: "Build and train a custom Vision Transformer (ViT) on medical image classification with mixed-precision training."
        },
        {
          weeks: "Weeks 5-8",
          title: "Generative AI, Transformers & LLM Engineering",
          icon: <FaCode className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Transformer Architecture & Multi-Head Self-Attention from Scratch",
            "Fine-Tuning Open Source LLMs (Llama 3, Mistral) with LoRA & QLoRA",
            "Retrieval-Augmented Generation (RAG) with Hybrid Search & Re-ranking",
            "Vector Database Clustering (Pinecone, Qdrant, Milvus) & Embeddings"
          ],
          application: "Architect an enterprise-scale RAG system integrating multi-document parsing, semantic caching, and re-ranking."
        },
        {
          weeks: "Weeks 9-12",
          title: "Autonomous Agents & Multimodal AI",
          icon: <FaNetworkWired className="w-5 h-5 text-blue-500" />,
          topics: [
            "Autonomous Multi-Agent Systems using LangGraph, AutoGen & Tool Use",
            "Multimodal Vision-Language Models (CLIP, LLaVA, Whisper) & Diffusion",
            "Reinforcement Learning from Human Feedback (RLHF) & Direct Preference (DPO)",
            "AI Safety, Guardrails (NeMo Guardrails), and Hallucination Mitigation"
          ],
          application: "Construct an autonomous multi-agent developer crew that parses GitHub issues, writes code, tests, and raises pull requests."
        },
        {
          weeks: "Weeks 13-16",
          title: "Production MLOps, vLLM & Deployment",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "High-Throughput Inference with vLLM, TensorRT-LLM & Quantization (INT4/FP8)",
            "Enterprise Model Serving via Triton Inference Server & FastAPI",
            "Model Observability, Drift Detection & Token Cost Monitoring (Weights & Biases)",
            "Kubernetes GPU Orchestration, Ray Cluster Scaling & Zero-Downtime CI/CD"
          ],
          application: "Deploy a high-throughput, latency-optimized LLM serving cluster handling 500+ concurrent requests with GPU auto-scaling."
        }
      ];
    }

    // 2. Machine Learning
    if (t === "Machine Learning") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Mathematical Optimization & Advanced Tabular ML",
          icon: <FaBrain className="w-5 h-5 text-blue-500" />,
          topics: [
            "Convex Optimization, Stochastic Gradient Descent & Regularization Theory",
            "Advanced Gradient Boosting: XGBoost, LightGBM & CatBoost Hyperopt",
            "High-Dimensional Feature Engineering & Manifold Learning (t-SNE, UMAP)",
            "Probabilistic Modeling, Bayesian Optimization & Markov Chain Monte Carlo"
          ],
          application: "Build an automated tabular competition pipeline utilizing multi-model stacking, out-of-fold blending, and Bayesian tuning."
        },
        {
          weeks: "Weeks 5-8",
          title: "Deep Representations & Time-Series Modeling",
          icon: <FaServer className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Deep Neural Architecture Design, Initialization & Adaptive Learning Rates",
            "Self-Supervised & Contrastive Representation Learning (SimCLR)",
            "Advanced Time-Series Forecasting: Temporal Fusion Transformers & Prophet",
            "Anomaly Detection in High-Frequency Streams using Isolation Forests & VAEs"
          ],
          application: "Deploy a multi-asset financial time-series forecasting model with dynamic volatility bounds and live streaming anomaly alerts."
        },
        {
          weeks: "Weeks 9-12",
          title: "Distributed Training & Recommender Systems",
          icon: <FaNetworkWired className="w-5 h-5 text-blue-500" />,
          topics: [
            "Distributed Machine Learning with PyTorch DDP & Ray Train",
            "Graph Neural Networks (GNNs) with PyTorch Geometric for Network Analysis",
            "Two-Tower Deep Recommender Systems & Approximate Nearest Neighbors",
            "Explainable AI (XAI): SHAP Values, Integrated Gradients & Counterfactuals"
          ],
          application: "Implement an enterprise personalized recommendation engine scaling across 1M+ user-item interactions with sub-20ms retrieval."
        },
        {
          weeks: "Weeks 13-16",
          title: "End-to-End MLOps & Production Pipelines",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Enterprise Feature Stores (Feast) & Experiment Tracking with MLflow",
            "Automated Model CI/CD (CML, GitHub Actions & Containerized Workflows)",
            "Data Drift, Concept Drift & Model Performance Auditing (Evidently AI)",
            "Production Cloud Deployment to AWS SageMaker & GCP Vertex AI"
          ],
          application: "Deliver a production churn prediction microservice integrated with automated feature stores, drift alerts, and auto-retraining."
        }
      ];
    }

    // 3. Data Science
    if (t === "Data Science") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Statistical Inference & High-Performance Data Processing",
          icon: <FaChartBar className="w-5 h-5 text-blue-500" />,
          topics: [
            "Rigorous Hypothesis Testing, Power Analysis & Causal Inference Frameworks",
            "High-Throughput Vectorized Data Wrangling with Polars, DuckDB & NumPy",
            "Advanced Analytical SQL: Window Frames, Recursive CTEs & Execution Tuning",
            "Exploratory Data Analysis, Non-Parametric Tests & Outlier Diagnostics"
          ],
          application: "Design an end-to-end causal inference and A/B experimentation engine analyzing multi-variant conversion lifts."
        },
        {
          weeks: "Weeks 5-8",
          title: "Predictive Analytics & Advanced Machine Learning",
          icon: <FaBrain className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Supervised Learning: Gradient Boosting, ElasticNet & Cross-Validation Strategy",
            "High-Cardinality Target Encodings & Imbalanced Learning (SMOTE-NC, Focal Loss)",
            "Unsupervised Segmentation: Hierarchical Clustering & Gaussian Mixture Models",
            "NLP for Data Science: Embeddings, Topic Modeling & Transformer Sentiment"
          ],
          application: "Develop a customer lifetime value (LTV) and risk scoring engine for a subscription platform with automated feature pipelines."
        },
        {
          weeks: "Weeks 9-12",
          title: "Big Data Processing & Modern Cloud Warehousing",
          icon: <FaDatabase className="w-5 h-5 text-blue-500" />,
          topics: [
            "Distributed Data Processing with Apache Spark (PySpark) & Delta Lake",
            "Cloud Data Warehousing: Snowflake Architecture & Google BigQuery Optimization",
            "Data Transformation Modeling with dbt (Data Build Tool) & Jinja Macros",
            "Automated Orchestration with Apache Airflow & Data Quality Testing (Great Expectations)"
          ],
          application: "Construct an incremental ELT pipeline processing multi-gigabyte logs into partitioned analytical warehouse marts."
        },
        {
          weeks: "Weeks 13-16",
          title: "Executive Dashboards, MLOps & Capstone Insights",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Interactive Enterprise Dashboards with Tableau & Power BI DAX Modeling",
            "Building Data Science Web Applications with Streamlit & FastAPI",
            "Model Governance, Data Privacy Compliance (GDPR/CCPA) & Bias Auditing",
            "Comprehensive Data Science Capstone & Executive Decision Framework"
          ],
          application: "Deliver a live interactive executive analytics platform connected to real-time predictive models and automated anomaly alerts."
        }
      ];
    }

    // 4. Data Analytics
    if (t === "Data Analytics") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Advanced SQL & Relational Data Engineering",
          icon: <FaDatabase className="w-5 h-5 text-blue-500" />,
          topics: [
            "Complex Multi-Table Joins, Self-Joins & Set Theory Logic",
            "Analytical Window Functions: DENSE_RANK, NTILE, LAG/LEAD & Running Sums",
            "Recursive CTEs, Subquery Refactoring & Query Plan (EXPLAIN) Optimization",
            "Data Hygiene, Deduplication & REST API Ingestion into Relational Schemas"
          ],
          application: "Build a robust database audit engine extracting raw transactional records into normalized reporting schemas."
        },
        {
          weeks: "Weeks 5-8",
          title: "Enterprise BI, Advanced Power BI & Tableau",
          icon: <FaChartBar className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Advanced Power BI DAX: CALCULATE, Time Intelligence & Virtual Tables",
            "Star Schema Dimensional Modeling: Fact Tables, Conformed Dimensions",
            "Tableau Advanced Calculations, Level of Detail (LOD) Expressions & Actions",
            "Executive Dashboard UX, Dynamic Tooltips & Row-Level Security (RLS)"
          ],
          application: "Design an executive corporate revenue and profitability dashboard with multi-currency conversion and role-based access."
        },
        {
          weeks: "Weeks 9-12",
          title: "Python for Analytics & Statistical Modeling",
          icon: <FaCode className="w-5 h-5 text-blue-500" />,
          topics: [
            "Pandas & DuckDB for Rapid Analytical Aggregations & Pivot Tables",
            "Descriptive & Inferential Statistics, Correlation Matrices & Hypothesis Testing",
            "Time-Series Decomposition, Trend Analysis & Moving Average Forecasting",
            "Customer Segmentation with RFM (Recency, Frequency, Monetary) & K-Means"
          ],
          application: "Implement an automated customer retention and RFM cohort analysis dashboard with automated quarterly churn projections."
        },
        {
          weeks: "Weeks 13-16",
          title: "Cloud Data Marts, Automation & Capstone Delivery",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Cloud Analytics Marts with Snowflake & Google BigQuery Data Export",
            "Data Pipeline Transformation & Automated Schema Testing with dbt",
            "Scheduled Report Delivery via Airflow & Python Email Automations",
            "Comprehensive Analytics Capstone: Commercial Revenue & Growth Audit"
          ],
          application: "Deploy a scheduled cloud analytics pipeline that aggregates multi-channel sales data into executive KPI presentations."
        }
      ];
    }

    // 5. Full Stack Software Development
    if (t === "Full Stack Software Development") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Advanced TypeScript & React 19 Architecture",
          icon: <FaCode className="w-5 h-5 text-blue-500" />,
          topics: [
            "Advanced TypeScript: Generics, Mapped Types & Conditional Type Inference",
            "React 19 Core: Server Components (RSC), Actions, Suspense & Concurrent Rendering",
            "Next.js App Router, Incremental Static Regeneration (ISR) & Route Handlers",
            "Enterprise State Architecture: Zustand, TanStack Query (React Query) & Context"
          ],
          application: "Build a high-performance, real-time collaboration dashboard with Server Components, optimistic UI, and strict TypeScript."
        },
        {
          weeks: "Weeks 5-8",
          title: "Scalable Backend Engineering & API Systems",
          icon: <FaServer className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Node.js Internals, Event Loop Lifecycle, Clustering & Worker Threads",
            "Enterprise NestJS / Express Architecture with Clean Dependency Injection",
            "RESTful API Versioning, GraphQL Federation & Type-Safe tRPC Systems",
            "Authentication & Authorization: OAuth 2.0, JWT Refresh Tokens, RBAC & MFA"
          ],
          application: "Architect an enterprise microservice backend featuring role-based authorization, rate limiting, and GraphQL federation."
        },
        {
          weeks: "Weeks 9-12",
          title: "Distributed Systems, Caching & Message Queues",
          icon: <FaNetworkWired className="w-5 h-5 text-blue-500" />,
          topics: [
            "Polyglot Persistence: PostgreSQL (Prisma/Drizzle) & MongoDB Document Design",
            "In-Memory Caching Strategies, Distributed Locks & Session Management with Redis",
            "Event-Driven Architecture with Apache Kafka, RabbitMQ & BullMQ Workers",
            "Real-Time Bi-Directional Protocols with WebSockets & Server-Sent Events (SSE)"
          ],
          application: "Develop a high-throughput event-driven messaging service handling 50,000 real-time notifications with Redis and Kafka."
        },
        {
          weeks: "Weeks 13-16",
          title: "Cloud Native DevOps, Testing & Production Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Multi-Stage Docker Builds & Container Security Best Practices",
            "Automated Testing Suites: Vitest, Supertest & Playwright E2E Automation",
            "CI/CD Deployment Pipelines with GitHub Actions, AWS ECS & Vercel",
            "Production SaaS Capstone with Stripe Webhooks, Monitoring & Observability"
          ],
          application: "Deploy a production-grade multi-tenant SaaS application with automated zero-downtime CI/CD and payment processing."
        }
      ];
    }

    // 6. Data Structures and Algorithms
    if (t === "Data Structures and Algorithms") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Algorithmic Complexity & Advanced Linear Patterns",
          icon: <FaCode className="w-5 h-5 text-blue-500" />,
          topics: [
            "Asymptotic Analysis: Big O, Omega, Theta, Master Theorem & Space Bounds",
            "Mastering Pointer Patterns: Two-Pointers, Sliding Window, Prefix Sum Arrays",
            "Monotonic Stacks & Deques: Next Greater Element, Largest Rectangle Patterns",
            "Advanced Sorting (QuickSelect, MergeSort) & Binary Search on Answer Spaces"
          ],
          application: "Solve and benchmark 50+ medium-to-hard LeetCode patterns with optimized time and space complexity."
        },
        {
          weeks: "Weeks 5-8",
          title: "Non-Linear Structures: Trees, Heaps & Tries",
          icon: <FaBrain className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Binary Search Trees (BST), AVL Trees & Red-Black Tree Balancing Theory",
            "Tree Traversal Strategies: Level-Order, Morris Traversal & Lowest Common Ancestor",
            "Min/Max Heaps, Priority Queues & Running Median Tracking Patterns",
            "Trie (Prefix Tree) Architectures & Suffix Structures for String Search"
          ],
          application: "Implement an autocomplete prefix search engine using optimized Tries and a dual-heap running median tracker."
        },
        {
          weeks: "Weeks 9-12",
          title: "Advanced Graphs & Network Connectivity",
          icon: <FaNetworkWired className="w-5 h-5 text-blue-500" />,
          topics: [
            "Graph Modeling: BFS, DFS, Topological Sorting & Cycle Detection in DAGs",
            "Shortest Path Algorithms: Dijkstra, Bellman-Ford & Floyd-Warshall Algorithms",
            "Minimum Spanning Trees (Kruskal, Prim) & Disjoint Set Union (DSU) with Path Compression",
            "Network Flow: Ford-Fulkerson, Bipartite Matching & Tarjan's Bridge Finding"
          ],
          application: "Architect a routing and network connectivity graph solver calculating shortest paths and bridge detection in social networks."
        },
        {
          weeks: "Weeks 13-16",
          title: "Dynamic Programming, Backtracking & FAANG Mock Interviews",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Dynamic Programming Mastery: Memoization vs Tabulation, 1D vs 2D State Transitions",
            "Classic DP Patterns: 0/1 Knapsack, Longest Common Subsequence, Matrix Chain, Bitmask DP",
            "Backtracking Frameworks: N-Queens, Sudoku Solver & Subsets/Permutations",
            "FAANG Live Whiteboard Simulation: Problem Deconstruction, Edge Cases & Complexity Defense"
          ],
          application: "Master 100+ high-frequency FAANG interview challenges, explaining step-by-step state transitions and constraints."
        }
      ];
    }

    // 7. DevOps
    if (t === "DevOps") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Linux Internals, Scripting & Container Hardening",
          icon: <FaServer className="w-5 h-5 text-blue-500" />,
          topics: [
            "Linux Kernel Architecture, Systemd, cgroups, Namespaces & Network Namespaces",
            "Advanced Bash Scripting & Python Automation for Systems Engineering",
            "Docker Deep Dive: Multi-Stage Optimization, Rootless Containers & Trivy Scanning",
            "Container Registries, Distroless Images & Image Signing with Cosign"
          ],
          application: "Package a polyglot microservice stack into minimal, distroless container images audited for zero high-severity CVEs."
        },
        {
          weeks: "Weeks 5-8",
          title: "Enterprise CI/CD & Infrastructure as Code (IaC)",
          icon: <FaCode className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Advanced GitHub Actions & GitLab CI/CD: Matrix Builds, Reusable Workflows & Caching",
            "SonarQube Static Analysis, Automated SAST/DAST & Quality Gate Enforcement",
            "Terraform Architecture: Modules, Remote State Locking (S3/DynamoDB) & Terragrunt",
            "Ansible Playbooks for Configuration Management, Role Hierarchies & Idempotency"
          ],
          application: "Construct an automated GitOps CI/CD pipeline that provisions cloud environments with Terraform upon pull request creation."
        },
        {
          weeks: "Weeks 9-12",
          title: "Kubernetes Orchestration, Helm & GitOps",
          icon: <FaNetworkWired className="w-5 h-5 text-blue-500" />,
          topics: [
            "Kubernetes Core: Deployments, StatefulSets, Ingress Controllers & NetworkPolicies",
            "Helm Chart Creation, Templating, Dependency Management & Kustomize Overlays",
            "GitOps Continuous Delivery with ArgoCD & Flux CD for Automated Reconciliations",
            "Service Mesh Architecture: Istio Traffic Management, Canaries & Mutual TLS (mTLS)"
          ],
          application: "Deploy an enterprise Kubernetes cluster with ArgoCD GitOps, auto-scaling (HPA), and Istio service mesh security."
        },
        {
          weeks: "Weeks 13-16",
          title: "Observability, Site Reliability (SRE) & Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Full Observability Stack: Prometheus Metric Scraping, PromQL & Grafana Dashboards",
            "Log Aggregation with Grafana Loki / FluentBit & Distributed Tracing with OpenTelemetry",
            "SRE Principles: Defining SLIs, SLOs, Error Budgets & Automated Incident Pagers",
            "Chaos Engineering with Chaos Mesh: Resilience Testing Under Node Failures"
          ],
          application: "Architect a self-healing, multi-region production cloud deployment with automated rollbacks upon SLO violation."
        }
      ];
    }

    // 8. Cloud Computing
    if (t === "Cloud Computing") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Enterprise Cloud Networking & Compute Foundations",
          icon: <FaNetworkWired className="w-5 h-5 text-blue-500" />,
          topics: [
            "Cloud Global Infrastructure, Custom VPCs, Subnetting, Route Tables & NAT Gateways",
            "VPC Peering, AWS Transit Gateway & Direct Connect Network Topologies",
            "Compute Architectures: EC2 Nitro Instances, Auto-Scaling Groups & Target Tracking",
            "Identity & Access Management (IAM): Cross-Account Roles, Permission Boundaries & SCPs"
          ],
          application: "Design a highly secure, multi-tier VPC architecture with private subnets, NAT gateways, and least-privilege IAM policies."
        },
        {
          weeks: "Weeks 5-8",
          title: "Serverless Architecture & Cloud Storage Systems",
          icon: <FaServer className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Event-Driven Serverless with AWS Lambda, EventBridge, SQS FIFO & SNS Fanout",
            "Object Storage Engineering: S3 Lifecycle Rules, Replication & Versioning Security",
            "High-Performance Cloud Storage: Amazon EBS Provisioned IOPS, EFS & FSx for Lustre",
            "API Gateway Architecture: REST/WebSocket APIs, Throttling & Lambda Authorizers"
          ],
          application: "Build a globally distributed, event-driven serverless order-processing platform using API Gateway, Lambda, and DynamoDB."
        },
        {
          weeks: "Weeks 9-12",
          title: "Cloud Databases, Security & Infrastructure as Code",
          icon: <FaDatabase className="w-5 h-5 text-blue-500" />,
          topics: [
            "Relational Cloud Databases: Amazon Aurora Multi-Region Clusters & Read Replicas",
            "NoSQL at Scale: DynamoDB Single-Table Design, Global Tables & DynamoDB Streams",
            "Cloud Security: AWS WAF, Shield DDoS Protection, KMS Key Management & Secrets Manager",
            "Cloud IaC with Terraform & AWS Cloud Development Kit (CDK) in TypeScript"
          ],
          application: "Implement an automated FinOps auditing system that detects idle resources, enforces tagging, and trims cloud costs by 35%."
        },
        {
          weeks: "Weeks 13-16",
          title: "FinOps, Disaster Recovery & Multi-Cloud Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "FinOps: Cost Allocation Tags, Compute Savings Plans & Reserved Instance Modeling",
            "High Availability & Disaster Recovery: RPO/RTO Strategies (Pilot Light vs Active-Active)",
            "Cloud Migration Methodologies: The 7 Rs, Database Migration Service (DMS) & Serverless Lift",
            "Capstone: Resilient Multi-Region Cloud Architecture with Route 53 Health Checks"
          ],
          application: "Execute a simulated lift-and-shift modernization of an on-premises enterprise application to a cloud-native architecture."
        }
      ];
    }

    // 9. Cyber Security
    if (t === "Cyber Security") {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Offensive Reconnaissance & Network Security",
          icon: <FaLock className="w-5 h-5 text-blue-500" />,
          topics: [
            "TCP/IP Vulnerability Exploitation, Wireshark Packet Dissection & Protocol Analysis",
            "Open Source Intelligence (OSINT), Active/Passive Network Enumeration & Nmap NSE",
            "Firewall Evasion, Port Scanning Techniques & Banner Grabbing Methodologies",
            "Linux & Windows Privilege Escalation Vectors & Misconfiguration Exploits"
          ],
          application: "Perform a comprehensive reconnaissance and vulnerability scan on a simulated corporate network perimeter."
        },
        {
          weeks: "Weeks 5-8",
          title: "Web Application Penetration Testing & OWASP Top 10",
          icon: <FaCode className="w-5 h-5 text-indigo-500" />,
          topics: [
            "OWASP Top 10 Deep Dive: Blind SQLi, Stored/Reflected XSS, SSRF & CSRF",
            "Broken Access Control, Insecure Direct Object References (IDOR) & Business Logic Flaws",
            "Burp Suite Professional Automation, Macro Scripting & Turbo Intruder",
            "API Security Testing: REST, GraphQL, and OAuth 2.0 Token Vulnerabilities"
          ],
          application: "Conduct an authorized penetration test on a deliberately vulnerable enterprise banking application and file CVSS reports."
        },
        {
          weeks: "Weeks 9-12",
          title: "SOC Operations, Threat Intelligence & Digital Forensics",
          icon: <FaServer className="w-5 h-5 text-blue-500" />,
          topics: [
            "Security Information & Event Management (SIEM): Splunk Query Language & ELK Rules",
            "Endpoint Detection & Response (EDR), Sysmon Event Analysis & Threat Hunting",
            "MITRE ATT&CK Framework Mapping & Indicator of Compromise (IoC) Extraction",
            "Memory Forensics with Volatility & Dead-Disk Analysis with Autopsy"
          ],
          application: "Investigate a simulated ransomware breach scenario, reconstruct the attack chain, and generate an incident containment plan."
        },
        {
          weeks: "Weeks 13-16",
          title: "Cloud Security, DevSecOps & Red/Blue Team Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Cloud Security Auditing for AWS/Azure with Prisma Cloud, ScoutSuite & Prowler",
            "DevSecOps Pipeline Integration: Automated SAST (Semgrep), DAST (ZAP) & Container Scanning",
            "Compliance Frameworks: ISO 27001, SOC2 Type II, NIST Cybersecurity Framework & GDPR",
            "Capstone: Live Cyber Range Red Team vs Blue Team Incident Simulation"
          ],
          application: "Secure an enterprise cloud infrastructure against simulated active exploitation, remediating 10 critical CVEs in real time."
        }
      ];
    }

    // 10. UI/UX Design & Graphics
    if (t.includes("UI/UX") || t.includes("Graphics") || t.includes("Design")) {
      return [
        {
          weeks: "Weeks 1-4",
          title: "UX Research, Information Architecture & User Psychology",
          icon: <FaBrain className="w-5 h-5 text-blue-500" />,
          topics: [
            "Generative User Research Methodologies, Ethnographic Studies & Stakeholder Interviews",
            "Empathy Mapping, Data-Backed User Personas & End-to-End Journey Mapping",
            "Information Architecture, Mental Models, Card Sorting & Navigation Hierarchies",
            "Heuristic Evaluation Methodologies & WCAG 2.2 Accessibility Compliance Auditing"
          ],
          application: "Conduct in-depth generative user research and establish an evidence-based product architecture for a complex B2B workflow."
        },
        {
          weeks: "Weeks 5-8",
          title: "Advanced Figma Architecture & Tokenized Design Systems",
          icon: <FaCode className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Figma Masterclass: Auto-Layout 5.0, Component Properties & Nested Variants",
            "Design Token Architecture: Typography Scales, Spacing Systems & Color Themes",
            "Interactive Advanced Prototyping: Variables, Conditional Logic & Component States",
            "Micro-Interactions, Animation Curves & Haptic Feedback Design Patterns"
          ],
          application: "Architect a production-ready, multi-brand design system with tokenized components, light/dark themes, and documentation."
        },
        {
          weeks: "Weeks 9-12",
          title: "Product Strategy, Usability Testing & Conversion UX",
          icon: <FaChartBar className="w-5 h-5 text-blue-500" />,
          topics: [
            "Usability Testing Protocols: Unmoderated Testing (Maze), Treejack & Task Completion Metrics",
            "Data-Informed UX: Analyzing Heatmaps, Drop-off Funnels & Conversion Rate Optimization (CRO)",
            "Complex Data Display: Designing High-Density Tables, Financial Dashboards & Charts",
            "Platform Conventions: Apple Human Interface Guidelines vs Google Material Design 3"
          ],
          application: "Redesign a high-friction enterprise analytics dashboard, demonstrating a measurable 40% reduction in task completion time."
        },
        {
          weeks: "Weeks 13-16",
          title: "Developer Handoff, Design Leadership & Portfolio Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Developer Handoff Workflows: Design Specs, Token Export & Zero-Friction Engineering Sync",
            "Design System Governance, Versioning Workflows & Multi-Designer Team Operations",
            "Strategic Design Storytelling: Presenting Business Impact to C-Level Leadership",
            "Flagship Capstone: Complete End-to-End Case Study from Hypothesis to Final Prototypes"
          ],
          application: "Present a comprehensive design case study defending trade-offs, research insights, and business impact to design directors."
        }
      ];
    }

    // 11. Digital Marketing
    if (t.includes("Marketing")) {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Technical SEO, Semantic Search & Content Architecture",
          icon: <FaChartBar className="w-5 h-5 text-blue-500" />,
          topics: [
            "Technical SEO Auditing: Core Web Vitals, Crawl Budgets, Canonicalization & Log Auditing",
            "Semantic Search Architecture: Topic Clusters, Entity Optimization & Schema Markup",
            "Programmatic SEO Engines, AI-Assisted Content Pipelines & Keyword Intent Stratification",
            "Competitor Gap Analysis & Backlink Profile Diagnostics (Ahrefs, Semrush, Screaming Frog)"
          ],
          application: "Perform a comprehensive technical SEO overhaul on an e-commerce platform and build a programmatic content engine."
        },
        {
          weeks: "Weeks 5-8",
          title: "Paid Acquisition Engineering (Meta, Google & LinkedIn Ads)",
          icon: <FaCode className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Meta Ads Manager Mastery: Advantage+ Shopping, Conversion API (CAPI) & Custom Audiences",
            "Google Ads Performance Max (PMax), Search Bidding Algorithms & YouTube Action Ads",
            "B2B Demand Generation: LinkedIn Campaign Manager & Account-Based Marketing (ABM)",
            "High-Converting Creative Frameworks, UGC Funnels & Dynamic Creative Testing"
          ],
          application: "Launch and optimize a live multi-channel paid acquisition campaign managing creative iterations and audience testing."
        },
        {
          weeks: "Weeks 9-12",
          title: "Marketing Analytics, Attribution & CRO Testing",
          icon: <FaDatabase className="w-5 h-5 text-blue-500" />,
          topics: [
            "Google Analytics 4 (GA4) Custom Explorations, BigQuery Export & Server-Side GTM",
            "Multi-Touch Attribution Modeling (Data-Driven, W-Shaped) vs Last-Click Realities",
            "Conversion Rate Optimization (CRO): A/B Testing Hypotheses, Heatmaps & Landing Page UX",
            "Marketing Automation & Lifecycle Marketing: Retention Workflows, Klaviyo & HubSpot CRM"
          ],
          application: "Build an end-to-end full-funnel attribution dashboard in Looker Studio connecting ad spend directly to sales CRM deals."
        },
        {
          weeks: "Weeks 13-16",
          title: "Growth Loops, Unit Economics & Enterprise GTM Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Designing Viral Referral Loops, Product-Led Growth (PLG) & Organic Flywheels",
            "Unit Economics for High-Growth Brands: CAC, LTV, Payback Period & Cohort Analysis",
            "Multi-Crore Media Planning, Budget Allocation Frameworks & Agency Management",
            "Final Capstone: Full-Funnel Go-to-Market Strategy & Live Commercial Presentation"
          ],
          application: "Defend an omnichannel GTM scale strategy for a brand with unit economics, attribution models, and growth projections."
        }
      ];
    }

    // 12. Human Resource
    if (t.includes("Human Resource") || t.includes("HR")) {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Strategic Talent Acquisition & Sourcing Intelligence",
          icon: <FaBrain className="w-5 h-5 text-blue-500" />,
          topics: [
            "Advanced Sourcing Methodologies: Boolean Algorithms, GitHub/LinkedIn Deep Sourcing",
            "Applicant Tracking System (ATS) Architecture, Sourcing Automation & Candidate Flow",
            "Competency-Based Interviewing Frameworks & Structured Behavioral Assessments (STAR)",
            "Employer Branding Strategies, Candidate Experience Audits & Talent Community Building"
          ],
          application: "Design an end-to-end recruitment pipeline for critical technical roles from talent mapping to final offer rollout."
        },
        {
          weeks: "Weeks 5-8",
          title: "Total Rewards, Compensation Modeling & People Analytics",
          icon: <FaChartBar className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Compensation Benchmarking, Grade Structure Architecture & Salary Band Formulation",
            "Total Rewards Design: ESOPs, Performance Bonuses, Retainers & Executive Benefits",
            "People Analytics: Calculating Time-to-Fill, Quality-of-Hire, Cost-per-Hire & Churn Rate",
            "Building Real-Time Human Capital Dashboards with Tableau & Power BI"
          ],
          application: "Formulate a competitive compensation benchmarking model with salary bandings and retention incentives for high-demand talent."
        },
        {
          weeks: "Weeks 9-12",
          title: "Performance Management, HRBP & Labor Compliance",
          icon: <FaServer className="w-5 h-5 text-blue-500" />,
          topics: [
            "Strategic HR Business Partnering (HRBP): Aligning HR Initiatives with Business Revenue",
            "Modern Performance Frameworks: OKRs, Continuous Feedback vs Annual Bell Curves",
            "Labor Law Compliance: Factories Act, Industrial Disputes, Gratuity, PF, ESI & POSH Act",
            "Organizational Conflict Resolution, Grievance Redressal & Mediation Frameworks"
          ],
          application: "Construct an enterprise performance appraisal framework aligned with quarterly business OKRs and succession plans."
        },
        {
          weeks: "Weeks 13-16",
          title: "Organizational Development, Culture & Leadership Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Change Management Models (Kotter, ADKAR) & Culture Transformation in High-Growth Firms",
            "Executive Leadership Development, Succession Planning & High-Potential (HiPo) Programs",
            "Global Remote & Hybrid Workforce Policies: Cross-Border Compliance & Asynchronous Culture",
            "Capstone: Comprehensive Strategic Human Capital Blueprint Presentation"
          ],
          application: "Present a comprehensive People & Culture transformation blueprint to executive leadership managing a 1,000+ employee company."
        }
      ];
    }

    // 13. Finance & Stock Market
    if (t.includes("Finance") || t.includes("Stock Market")) {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Financial Accounting, 3-Statement Modeling & Ratio Analysis",
          icon: <FaChartBar className="w-5 h-5 text-blue-500" />,
          topics: [
            "Advanced Corporate Financial Statement Interlinkages (Income Statement, Balance Sheet, Cash Flow)",
            "Financial Ratio Diagnostics: DuPont Analysis, Working Capital Metrics & Solvency",
            "Dynamic Financial Modeling in Excel: Dynamic Drivers, Error Handling & Sensitivity Tables",
            "Cost of Capital Estimation: WACC Calculation, Capital Asset Pricing Model (CAPM)"
          ],
          application: "Build an integrated, dynamic 3-statement financial forecasting model for a publicly listed company from scratch."
        },
        {
          weeks: "Weeks 5-8",
          title: "Corporate Valuation, M&A & Private Equity Modeling",
          icon: <FaDatabase className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Discounted Cash Flow (DCF) Modeling: Unlevered Free Cash Flow & Terminal Multiples",
            "Relative Valuation: Comparable Company Analysis (Comps) & Precedent Transactions",
            "Mergers & Acquisitions (M&A): Accretion/Dilution Analysis, Synergies & Purchase Price Allocation",
            "Leveraged Buyout (LBO) Modeling: Debt Tranches, Returns Waterfall & IRR Analysis"
          ],
          application: "Execute a comprehensive institutional DCF and comparable company valuation defending target acquisition prices."
        },
        {
          weeks: "Weeks 9-12",
          title: "Derivatives, Portfolio Theory & Quantitative Trading",
          icon: <FaBrain className="w-5 h-5 text-blue-500" />,
          topics: [
            "Modern Portfolio Theory (MPT), Efficient Frontier & Value at Risk (VaR) Estimation",
            "Options Mechanics: Options Greeks (Delta, Gamma, Theta, Vega) & Black-Scholes Pricing",
            "Hedging Strategies: Long/Short Equities, Futures Roll-over & Delta-Neutral Options Chains",
            "Algorithmic Trading Foundations with Python: Backtesting Quantitative Trading Rules"
          ],
          application: "Author an institutional equity research report featuring revenue drivers, valuation multiples, and risk factors."
        },
        {
          weeks: "Weeks 13-16",
          title: "Corporate Treasury, Governance & Investment Pitch Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Corporate Treasury Management, Foreign Exchange (FX) Risk & Working Capital Optimization",
            "Capital Raising: IPO Process, Debt Syndication & Private Placement Memorandums",
            "Regulatory Compliance: SEBI / SEC Reporting Standards & ESG Investment Frameworks",
            "Capstone: Institutional Deal Pitch to Investment Committee with Sensitivity Analyses"
          ],
          application: "Pitch a multi-million dollar buyout or debt financing proposal to an investment committee with sensitivity analyses."
        }
      ];
    }

    // 14. Medical Coding
    if (t.includes("Medical Coding")) {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Medical Anatomy, Terminology & ICD-10-CM Coding",
          icon: <FaBrain className="w-5 h-5 text-blue-500" />,
          topics: [
            "Medical Terminology: Roots, Prefixes, Suffixes & Anatomical Directional Terms",
            "Comprehensive Human Anatomy & Pathophysiology Across Major Body Systems",
            "ICD-10-CM Official Coding Guidelines: Conventions, Punctuation & Neoplasm Coding",
            "Diagnostic Coding from Real Clinical Physician Documentation & Progress Notes"
          ],
          application: "Code complex clinical charts across cardiology, respiratory, and musculoskeletal disease classifications accurately."
        },
        {
          weeks: "Weeks 5-8",
          title: "CPT Procedural Coding, E/M Guidelines & HCPCS Level II",
          icon: <FaCode className="w-5 h-5 text-indigo-500" />,
          topics: [
            "CPT Manual Structure, Surgical Package Rules & Essential Modifiers (-25, -59, -51)",
            "Evaluation & Management (E/M) Auditing Guidelines: MDM Scoring & Time-Based Rules",
            "Surgical Coding: Integumentary, Cardiovascular, Musculoskeletal & Endoscopy",
            "HCPCS Level II National Codes: Durable Medical Equipment (DME), Drugs & Supplies"
          ],
          application: "Audit and code outpatient operative surgical reports with proper CPT modifiers and medical necessity matching."
        },
        {
          weeks: "Weeks 9-12",
          title: "Inpatient ICD-10-PCS, Specialty Coding & Revenue Cycle (RCM)",
          icon: <FaDatabase className="w-5 h-5 text-blue-500" />,
          topics: [
            "ICD-10-PCS Procedure Coding: Root Operations, Body Parts, Approaches & Qualifiers",
            "High-Specialty Coding: Oncology Infusion, Anesthesia Coding & Diagnostic Radiology",
            "Revenue Cycle Management (RCM) Workflows, Claim Scrubber Logic & CMS-1500 Forms",
            "Denial Management: Root Cause Analysis, Appeals & Correct Coding Initiative (CCI) Edits"
          ],
          application: "Resolve and appeal high-value claim denials by reviewing physician documentation against CCI edits and LCD guidelines."
        },
        {
          weeks: "Weeks 13-16",
          title: "Healthcare Compliance, CPC Examination Drills & Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Healthcare Compliance: HIPAA Privacy/Security, OIG Work Plan, False Claims Act",
            "Clinical Documentation Improvement (CDI) & Compliant Physician Query Processes",
            "Intensive AAPC Certified Professional Coder (CPC) Mock Examination Drills & Speed Tests",
            "Capstone: Comprehensive 100-Chart Inpatient/Outpatient Hospital Audit Simulation"
          ],
          application: "Complete a simulated 100-chart comprehensive inpatient/outpatient hospital audit under timed exam conditions."
        }
      ];
    }

    // 15. Psychology
    if (t.includes("Psychology")) {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Neurobiology of Behavior & Developmental Trajectories",
          icon: <FaBrain className="w-5 h-5 text-blue-500" />,
          topics: [
            "Neuroanatomy, Neurotransmitters, Limbic System & Biological Bases of Behavior",
            "Lifespan Developmental Psychology: Attachment Theory, Cognitive & Moral Development",
            "Cognitive Architectures: Executive Function, Memory Consolidation, Attention & Perception",
            "Major Theoretical Models of Personality: Psychodynamic, Humanistic, Behavioral & Trait"
          ],
          application: "Formulate a comprehensive developmental case study analyzing cognitive and personality behavioral trajectories."
        },
        {
          weeks: "Weeks 5-8",
          title: "Clinical Psychopathology & Diagnostic Assessment (DSM-5-TR)",
          icon: <FaServer className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Clinical Diagnosis using DSM-5-TR: Mood, Anxiety & Obsessive-Compulsive Disorders",
            "Trauma- and Stressor-Related Disorders, PTSD & Dissociative Spectrum Diagnostics",
            "Personality Disorder Clusters & Neurodevelopmental/Psychotic Differential Diagnosis",
            "Clinical Interviewing Methodologies & Conducting the Mental Status Examination (MSE)"
          ],
          application: "Conduct a simulated clinical intake assessment and draft an evidence-based clinical Mental Status Examination (MSE) report."
        },
        {
          weeks: "Weeks 9-12",
          title: "Evidence-Based Psychotherapies & Counseling Frameworks",
          icon: <FaCode className="w-5 h-5 text-blue-500" />,
          topics: [
            "Cognitive Behavioral Therapy (CBT): Core Beliefs, Automatic Thoughts & Behavioral Experiments",
            "Third-Wave Modalities: Acceptance and Commitment Therapy (ACT) & Dialectical Behavioral Skills",
            "Solution-Focused Brief Therapy (SFBT) & Person-Centered Motivational Interviewing",
            "Psychometric Assessment: Reliability, Validity, MMPI, BDI & Clinical Interpretation"
          ],
          application: "Design a tailored, multi-week CBT intervention plan targeting specific anxiety and depressive behavioral patterns."
        },
        {
          weeks: "Weeks 13-16",
          title: "Applied Behavioral Health, Ethics & Wellness Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Workplace Mental Health & Industrial-Organizational Psychology (Burnout & Culture)",
            "Crisis Intervention Frameworks, Suicide Risk Assessment & Safety Planning Protocols",
            "Clinical Ethics, Confidentiality Boundaries & Multicultural Counseling Competencies",
            "Capstone: Comprehensive Community Mental Health Program & Clinical Intervention Design"
          ],
          application: "Present a comprehensive community or corporate mental wellness program addressing workplace burnout and resilience."
        }
      ];
    }

    // 16. Embedded Systems & Hardware Engineering
    if (t.includes("Embedded") || t.includes("VLSI") || t.includes("IoT") || t.includes("Robotics") || t.includes("AutoCAD")) {
      return [
        {
          weeks: "Weeks 1-4",
          title: "Low-Level Architecture, Microcontrollers & Hardware Drivers",
          icon: <FaCogs className="w-5 h-5 text-blue-500" />,
          topics: [
            "Advanced Embedded C/C++: Pointers, Memory Mapping, Volatile & Bit Manipulation",
            "ARM Cortex-M Architecture: Registers, Pipeline Stages, Interrupt Vector Table (NVIC)",
            "Clock Trees, Hardware Timers, Watchdogs & Bare-Metal Driver Engineering",
            "Oscilloscope, Logic Analyzer Debugging, JTAG/SWD & Protocol Decoders"
          ],
          application: "Develop bare-metal drivers from scratch for an ARM Cortex-M4 microcontroller reading sensor inputs via interrupts."
        },
        {
          weeks: "Weeks 5-8",
          title: "Hardware Interfacing & High-Speed Communication Protocols",
          icon: <FaServer className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Serial Bus Engineering: UART, High-Speed SPI & I2C Timing Verification",
            "Direct Memory Access (DMA) Controllers for Zero-CPU Peripheral Transfers",
            "Analog Subsystems: SAR ADC Sampling, DMA Buffering & Filtering Algorithms",
            "Low-Power Design: Sleep Modes, Power Domains & Battery Optimization Profiles"
          ],
          application: "Implement a multi-sensor telemetry logger streaming accelerometer and temperature data over SPI and DMA with zero CPU blocking."
        },
        {
          weeks: "Weeks 9-12",
          title: "Real-Time Operating Systems (RTOS) Architecture",
          icon: <FaNetworkWired className="w-5 h-5 text-blue-500" />,
          topics: [
            "FreeRTOS Kernel Internals: Preemptive Scheduling, Task States & Context Switching",
            "Inter-Task Synchronization: Binary/Counting Semaphores, Mutexes & Priority Inversion",
            "Message Queues, Stream Buffers, Event Groups & Software Timers",
            "Memory Management Schemes, Stack Overflow Detection & Deterministic Execution"
          ],
          application: "Build a deterministic multi-threaded RTOS application coordinating motor control, sensor sampling, and safety alarms."
        },
        {
          weeks: "Weeks 13-16",
          title: "Industrial IoT, Over-The-Air Updates & Production Capstone",
          icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
          topics: [
            "Wireless Stacks: BLE 5.0, Wi-Fi 6 & Industrial Protocols (CAN Bus, Modbus)",
            "Secure Bootloaders & Fail-Safe Dual-Partition Over-The-Air (OTA) Firmware Updates",
            "Embedded Linux Foundations: U-Boot, Device Tree Overlays & Yocto Projects",
            "Capstone: Industrial Connected Hardware Gateway with Cloud Telemetry"
          ],
          application: "Deploy a secure, industrial-grade IoT gateway with encrypted MQTT telemetry, local sensor processing, and fail-safe OTA updates."
        }
      ];
    }

    // Default Fallback (for any other technology/engineering courses)
    return [
      {
        weeks: "Weeks 1-4",
        title: "Advanced Foundations & Architecture",
        icon: <FaCode className="w-5 h-5 text-blue-500" />,
        topics: [
          `In-Depth Core Principles & Theoretical Foundations of ${t}`,
          "Modern Development Toolchains, Strict Type Systems & Environment Architecture",
          "Clean Code Patterns, Modular Design & Automated Unit Testing Suites",
          "Advanced Algorithmic Thinking & Efficient Data Structures for Problem Solving"
        ],
        application: `Build a robust foundational implementation establishing production standards in ${t}.`
      },
      {
        weeks: "Weeks 5-8",
        title: "Enterprise Application & System Integration",
        icon: <FaServer className="w-5 h-5 text-indigo-500" />,
        topics: [
          `Advanced Architectural Patterns & Scalable Design Principles in ${t}`,
          "Data Modeling, Concurrency Control, State Management & Caching",
          "Secure API Integrations, Authentication Mechanisms & Security Hardening",
          "Performance Profiling, Memory Optimization & Latency Reduction Techniques"
        ],
        application: `Architect and optimize a high-throughput module solving complex business logic in ${t}.`
      },
      {
        weeks: "Weeks 9-12",
        title: "Distributed Scalability & Cloud Native Engineering",
        icon: <FaNetworkWired className="w-5 h-5 text-blue-500" />,
        topics: [
          "Distributed Architecture Design: Microservices, Event-Driven & High Availability",
          "Cloud Platform Integration, Managed Services & Infrastructure as Code",
          "Asynchronous Messaging, Distributed Transactions & Fault Tolerance",
          "Observability Engineering: Metrics, Distributed Tracing & Centralized Logging"
        ],
        application: `Design and simulate an enterprise-scale distributed solution for ${t} capable of serving millions of requests.`
      },
      {
        weeks: "Weeks 13-16",
        title: "Production Deployment, CI/CD & Capstone Project",
        icon: <FaRocket className="w-5 h-5 text-indigo-500" />,
        topics: [
          "Automated Continuous Integration & Continuous Deployment (CI/CD) Pipelines",
          "Container Orchestration, Automated Scaling & Blue/Green Deployments",
          "Production Monitoring, SLA/SLO Adherence & Disaster Recovery Readiness",
          "Comprehensive Enterprise Capstone Presentation & Technical Defense"
        ],
        application: `Deploy a production-ready, fully monitored end-to-end capstone system solving real industry challenges in ${t}.`
      }
    ];
  };

  const curriculum = getCurriculumForDomain(safeTitle);

  // Generate domain-tailored dynamic career tracks
  const getCareerTracks = (courseTitle) => {
    const t = courseTitle || "Technology";

    // Design & Creative
    if (t.includes("UI/UX") || t.includes("Graphics") || t.includes("Design")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: `Junior ${t} Specialist / Associate`,
          description: `Launch your creative career by mastering design systems, user-centric thinking, and interactive prototypes for modern applications.`,
          gains: [
            "Portfolio of polished, production-ready design case studies & Figma prototypes",
            "1-on-1 portfolio review, critique drills, and resume optimization",
            "Curated introductions to product startups, design agencies, and tech studios",
            "Confidence to defend design rationale clearly in stakeholder walkthroughs"
          ],
          quote: `Having a polished portfolio of end-to-end case studies set me apart immediately. I joined a product startup within 8 weeks of graduating.`,
          author: "Tanvi M.",
          authorRole: "Product Designer"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: `Senior ${t} Lead / UX Strategist`,
          description: `Elevate your design impact, scale cross-platform design systems, and lead user research to command senior compensation.`,
          gains: [
            "Advanced tokenized design systems and cross-platform component architecture",
            "Transitioning from visual execution to strategic UX research and discovery",
            "Data-informed UX optimization, conversion heuristics, and usability testing",
            "Senior design portfolio presentation and compensation negotiation strategies"
          ],
          quote: `Bridging the gap between user experience and business metrics accelerated my career and helped me secure a senior designer role with an 85% hike.`,
          author: "Rohit K.",
          authorRole: "Senior UX Strategist"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: `Design Director / Head of ${t}`,
          description: `Direct design strategy across product suites, establish organizational design maturity, and lead cross-functional design organizations.`,
          gains: [
            "Enterprise design governance, accessibility standards, and brand cohesion",
            "Aligning design vision directly with business objectives and product roadmaps",
            "Executive stakeholder communication and design advocacy at leadership levels",
            "Building, hiring, and mentoring multi-disciplinary product design teams"
          ],
          quote: `The executive perspective on design leadership reshaped how I guide product teams. Today, I lead a team of 12 designers across web and mobile platforms.`,
          author: "Meera S.",
          authorRole: "Head of Product Design"
        }
      ];
    }

    // Digital Marketing
    if (t.includes("Marketing")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: "Associate Digital Marketing Specialist",
          description: `Kickstart your marketing career with practical experience in performance advertising, SEO strategy, and conversion funnel optimization.`,
          gains: [
            "Live campaign experience across Meta Ads, Google Ads, and organic SEO funnels",
            "Targeted resume optimization and growth case-study interview preparation",
            "Curated referrals to premier digital agencies and fast-scaling D2C brands",
            "Command over analytics dashboards and campaign audits for interview assessments"
          ],
          quote: `Managing live ad budgets and executing real SEO audits during the program gave me an undeniable edge. I secured a growth marketing role in under 2 months.`,
          author: "Rhea K.",
          authorRole: "Growth Marketing Associate"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: "Performance Marketing Lead / Growth Strategist",
          description: `Scale omnichannel growth loops, optimize paid customer acquisition (CAC), and lead high-budget performance campaigns.`,
          gains: [
            "Full-funnel customer acquisition, attribution modeling, and retention workflows",
            "Transitioning from tactical campaign execution to overarching growth strategy",
            "Advanced marketing automation, CRM segmentation, and CRO testing",
            "Client pitch preparation, agency leadership, and compensation negotiation"
          ],
          quote: `Transitioning from basic ad management into full-funnel growth strategy opened senior doors and helped me negotiate a 110% package increase.`,
          author: "Varun S.",
          authorRole: "Performance Marketing Lead"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: "VP of Growth / Head of Digital Acquisition",
          description: `Lead enterprise-level marketing investments, drive multi-channel market expansion, and scale company-wide customer acquisition.`,
          gains: [
            "Enterprise brand positioning and multi-crore media allocation strategy",
            "Strategic P&L management, CAC-to-LTV governance, and international expansion",
            "Cross-functional leadership with product, sales, and analytics divisions",
            "Building, hiring, and mentoring high-velocity performance marketing teams"
          ],
          quote: `The strategic marketing frameworks transformed my approach to market expansion. Today, I direct marketing operations across international markets.`,
          author: "Arjun B.",
          authorRole: "Head of Digital Growth"
        }
      ];
    }

    // Human Resource
    if (t.includes("Human Resource") || t.includes("HR")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: "Associate HR Specialist / Talent Acquisition Executive",
          description: `Begin your human resources career with practical training in modern recruitment sourcing, HRMS systems, and employee engagement.`,
          gains: [
            "Proficiency in modern ATS platforms, Boolean sourcing, and candidate screening",
            "HR resume optimization, behavioral interview preparation, and talent drills",
            "Direct introductions to corporate recruitment teams and staffing partners",
            "Practical mastery of labor compliance, onboarding flows, and payroll operations"
          ],
          quote: `The real-world simulations on talent sourcing and onboarding workflows gave me the exact skills needed to land a corporate HR position immediately.`,
          author: "Pooja N.",
          authorRole: "Talent Acquisition Specialist"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: "HR Business Partner (HRBP) / Talent Manager",
          description: `Step into strategic HR partner roles, shape organizational culture, implement performance management, and lead employee retention.`,
          gains: [
            "Strategic HRBP alignment, competency mapping, and OKR implementation",
            "Compensation benchmarking, succession planning, and talent retention",
            "HR analytics dashboards, employee pulse metrics, and workforce planning",
            "Strategic conflict resolution, mediation, and leadership advisory skills"
          ],
          quote: `The pivot from operational HR to a strategic HR Business Partner role completely transformed my trajectory and unlocked rapid promotions.`,
          author: "Suresh P.",
          authorRole: "Senior HR Business Partner"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: "VP of People & Culture / Head of HR",
          description: `Champion enterprise workforce strategy, lead organizational transformation, and govern talent architecture across corporate divisions.`,
          gains: [
            "Enterprise talent architecture, corporate culture redesign, and change management",
            "Executive leadership coaching and board-level compensation governance",
            "Future-of-work policies, employer brand architecture, and hybrid operations",
            "Directing multi-location HR divisions and mentoring organizational leaders"
          ],
          quote: `The leadership modules provided a clear framework for company-wide transformation. Today, I manage people operations across multiple regional offices.`,
          author: "Sunita V.",
          authorRole: "VP of People & Culture"
        }
      ];
    }

    // Finance & Stock Market
    if (t.includes("Finance") || t.includes("Stock Market")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: `Associate Financial Analyst / Equity Research Trainee`,
          description: `Launch your career in corporate finance and investments with real-world financial modeling, valuation techniques, and market research.`,
          gains: [
            "Hands-on 3-statement financial modeling, DCF valuation, and ratio analysis",
            "Finance resume refinement and technical modeling interview simulations",
            "Direct access to hiring networks in investment banking, advisory, and corporate finance",
            "Practical mastery to defend financial valuation models in technical interview rounds"
          ],
          quote: `Building full valuation models for real listed companies gave me the confidence to ace my interviews. I received an analyst offer within two months.`,
          author: "Aditya J.",
          authorRole: "Financial Analyst"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: `Senior Financial Analyst / Portfolio Strategist`,
          description: `Advance into strategic corporate advisory, portfolio management, and complex capital budgeting to secure premium finance compensation.`,
          gains: [
            "Advanced M&A due diligence, corporate restructuring, and capital planning",
            "Transitioning from financial reporting into strategic investment advisory",
            "Deep command of risk management models, derivatives, and financial analytics",
            "Executive pitch preparation and compensation benchmarking techniques"
          ],
          quote: `The depth in valuation modeling enabled me to transition from routine financial reporting to a high-impact investment advisory role.`,
          author: "Neha G.",
          authorRole: "Senior Equity Strategist"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: `Director of Corporate Finance / Chief Investment Strategist`,
          description: `Lead enterprise capital allocation, manage institutional asset portfolios, and guide strategic executive financial decisions.`,
          gains: [
            "Enterprise capital structure optimization, treasury oversight, and investor relations",
            "Strategic risk governance, regulatory compliance, and cross-border M&A leadership",
            "Board-level financial reporting and long-term enterprise capital deployment",
            "Managing multi-million dollar portfolios and directing analyst teams"
          ],
          quote: `The high-level portfolio allocation strategies reshaped how I approach investment leadership. I now oversee asset strategy across diverse market segments.`,
          author: "Rajiv M.",
          authorRole: "Head of Investment Strategy"
        }
      ];
    }

    // Medical Coding
    if (t.includes("Medical Coding")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: "Certified Medical Coder / Health Data Specialist",
          description: `Enter the healthcare industry with practical mastery of ICD-10-CM, CPT, and HCPCS coding for insurance billing and clinical charts.`,
          gains: [
            "Intensive real-chart auditing and clinical documentation coding practice",
            "CPC exam preparation strategies, timed mock tests, and resume building",
            "Direct placement connections with accredited US healthcare RCM and hospital partners",
            "Speed and high accuracy required to clear hospital provider technical assessments"
          ],
          quote: `Practicing on real hospital case records gave me the exact skills required to pass my credentialing exam and land a position right away.`,
          author: "Swathi B.",
          authorRole: "Medical Coding Specialist"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: "Senior Medical Auditor / Coding Quality Lead",
          description: `Advance into high-specialty surgical coding, denial management, and audit leadership to command higher industry packages.`,
          gains: [
            "Advanced inpatient/surgical specialty coding and compliance audits",
            "Transitioning into quality assurance (QA), team mentoring, and denial resolution",
            "Revenue cycle management (RCM) optimization and payer guideline navigation",
            "Senior healthcare billing advisory and audit defense techniques"
          ],
          quote: `The specialized audit training helped me advance into a Quality Analyst position with substantial salary growth.`,
          author: "Ramesh D.",
          authorRole: "Senior Coding Quality Lead"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: "Director of Health Information Management / RCM Head",
          description: `Direct enterprise health informatics, manage multi-facility revenue cycle divisions, and ensure complete regulatory compliance.`,
          gains: [
            "Enterprise RCM governance, compliance programs, and healthcare regulations",
            "Clinical documentation improvement (CDI) leadership and EHR integration",
            "Managing large coding operations, offshore teams, and SLA delivery",
            "Executive healthcare analytics, reimbursement strategy, and provider relations"
          ],
          quote: `Leading healthcare operations requires deep regulatory foresight. This program provided the strategic foundation to lead multi-site teams.`,
          author: "Dr. Kavitha L.",
          authorRole: "Director of HIM & Coding Compliance"
        }
      ];
    }

    // Psychology
    if (t.includes("Psychology")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: "Associate Behavioral Counselor / Research Associate",
          description: `Build a grounded career in psychological assessment, mental wellness coaching, and applied behavioral research.`,
          gains: [
            "Practical understanding of cognitive behavioral tools & intake assessments",
            "Ethics, case documentation, and specialized interview prep",
            "Connections with healthcare centers, schools, and corporate wellness firms",
            "Practical mastery of client rapport building, active listening, and assessment"
          ],
          quote: `The structured roleplay scenarios and case formulation exercises prepared me thoroughly for practical fieldwork.`,
          author: "Nandita K.",
          authorRole: "Associate Wellness Counselor"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: "Senior Psychological Consultant / Corporate Wellness Specialist",
          description: `Advance into corporate mental health advisory, organizational psychology, and specialized clinical counseling programs.`,
          gains: [
            "Advanced therapeutic frameworks, trauma-informed care, and intervention design",
            "Organizational psychology, leadership wellness, and stress management programs",
            "Psychometric testing interpretation, statistical analysis, and program design",
            "Establishing private consultancy practices and corporate wellness partnerships"
          ],
          quote: `Shifting into corporate mental health and behavioral consultation allowed me to scale my practice significantly.`,
          author: "Deepak M.",
          authorRole: "Behavioral Wellness Consultant"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: "Director of Psychological Programs / Clinical Lead",
          description: `Direct institutional mental health programs, oversee clinical governance, and champion evidence-based behavioral initiatives.`,
          gains: [
            "Program development for institutions, hospitals, and multinational organizations",
            "Supervision, ethical oversight, and clinical protocol governance",
            "Mental health advocacy, policy formulation, and research leadership",
            "Leading multidisciplinary teams of psychologists, counselors, and researchers"
          ],
          quote: `The executive perspective on mental healthcare delivery has been instrumental in shaping our community health initiatives.`,
          author: "Dr. Shalini R.",
          authorRole: "Director of Psychological Programs"
        }
      ];
    }

    // Data & Analytics (Data Science, Data Analytics, Business Analytics, SQL)
    if (t.includes("Data") || t.includes("Analytics") || t.includes("SQL")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: `Associate ${t} Analyst / BI Specialist`,
          description: `Launch your analytics career by transforming complex raw data into actionable dashboards, SQL models, and executive insights.`,
          gains: [
            `Portfolio-ready SQL models, interactive BI dashboards, and data pipelines`,
            "1-on-1 business case problem solving and analytics interview drill-downs",
            "Curated introductions to active hiring networks in analytics and product companies",
            "Practical mastery to ace live SQL tests and data interpretation challenges"
          ],
          quote: `Building full business intelligence dashboards using real company datasets gave me immediate credibility during technical interviews.`,
          author: "Aakash S.",
          authorRole: "Associate Data Analyst"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: `Senior ${t} Specialist / Analytics Lead`,
          description: `Drive predictive insights, architect scalable data models, and connect analytics directly to commercial business decisions.`,
          gains: [
            "Advanced statistical modeling, automated data pipelines, and predictive algorithms",
            "Transitioning from reporting metrics to driving commercial strategy",
            "In-depth command of modern cloud data platforms, dbt, and warehouse optimization",
            "Stakeholder influence, cross-functional communication, and package negotiation"
          ],
          quote: `Learning to tie data science models directly to revenue growth helped me stand out and secure a 110% package upgrade.`,
          author: "Sneha P.",
          authorRole: "Senior Data Scientist"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: `Director of Data & Analytics / Chief Analytics Architect`,
          description: `Lead enterprise-wide data strategy, build centralized data platforms, and steer organizational decision-making with advanced analytics.`,
          gains: [
            "Enterprise data architecture, governance frameworks, and data warehouse roadmaps",
            "Aligning analytics deliverables directly with C-suite commercial priorities",
            "Scalable infrastructure planning, data quality governance, and MLOps alignment",
            "Building, hiring, and mentoring high-velocity analytics and data science divisions"
          ],
          quote: `The curriculum provided the exact architectural depth needed to transition into an enterprise data leadership role.`,
          author: "Vikramaditya T.",
          authorRole: "Director of Data & Analytics"
        }
      ];
    }

    // Cloud, Infrastructure & Cyber Security
    if (t.includes("Cloud") || t.includes("DevOps") || t.includes("Security")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: `Associate ${t} Engineer / Analyst`,
          description: `Launch your career in modern infrastructure and security by managing cloud environments, CI/CD pipelines, and robust defenses.`,
          gains: [
            `Hands-on infrastructure projects built with modern cloud and security tooling`,
            "Targeted resume optimization & simulated technical incident walkthroughs",
            "Direct introductions to hiring managers at cloud consultancies and tech enterprises",
            "Practical mastery to pass architecture reviews and technical screening rounds"
          ],
          quote: `Hands-on labs simulating real production outages and security configurations gave me practical confidence that shone in technical rounds.`,
          author: "Kunal T.",
          authorRole: "Cloud Infrastructure Associate"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: `Senior ${t} Specialist / Lead Engineer`,
          description: `Automate enterprise infrastructure, orchestrate resilient distributed deployments, and safeguard mission-critical systems.`,
          gains: [
            "Advanced container orchestration, Infrastructure-as-Code, and zero-trust policies",
            "Transitioning from day-to-day operations to strategic platform engineering",
            "Mastering cloud cost optimization, disaster recovery, and compliance standards",
            "Senior technical consulting, incident review drills, and package negotiation"
          ],
          quote: `Mastering Kubernetes orchestration and automated IaC completely changed my trajectory, landing me a lead role with a 115% raise.`,
          author: "Naveen B.",
          authorRole: "Senior DevOps Engineer"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: `Principal ${t} Architect / Head of Infrastructure`,
          description: `Define enterprise cloud & security architecture, lead digital transformation migrations, and ensure 99.99% availability.`,
          gains: [
            "Architecting multi-cloud resilience, compliance governance, and security posture",
            "Engineering management for global infrastructure and platform reliability teams",
            "Strategic technology selection and long-term enterprise infrastructure roadmaps",
            "Mentoring, team building, and leading organizational infrastructure initiatives"
          ],
          quote: `The architectural case studies and deep-dives prepared me to lead enterprise-wide cloud migrations across global regions.`,
          author: "Hariharan P.",
          authorRole: "Principal Cloud Architect"
        }
      ];
    }

    // Hardware & Core Engineering (Embedded, VLSI, IoT, AutoCAD)
    if (t.includes("Embedded") || t.includes("VLSI") || t.includes("IoT") || t.includes("Robotics") || t.includes("AutoCAD")) {
      return [
        {
          level: "0-2 Years",
          label: "Graduates & Early Career",
          role: `Associate ${t} Engineer / Designer`,
          description: `Launch your engineering career with industry-grade simulations, circuit/modeling design, and practical laboratory workflows.`,
          gains: [
            `Portfolio-ready design schematics, simulation models, and hardware projects`,
            "Core engineering resume refinement & technical interview preparation",
            "Curated introductions to semiconductor, automotive, and manufacturing firms",
            "Practical mastery to solve design rules, timing, and modeling questions in interviews"
          ],
          quote: `Working on industry-standard simulation and prototyping tools gave me the practical edge needed to crack core engineering interviews.`,
          author: "Gautam K.",
          authorRole: "Hardware Design Associate"
        },
        {
          level: "2-6 Years",
          label: "Mid-Level Professionals",
          role: `Senior ${t} Specialist / Module Lead`,
          description: `Lead complex physical designs, micro-architectures, or mechanical models and command premium compensation in core industries.`,
          gains: [
            "Advanced design verification, optimization methodologies, and standard compliance",
            "Transitioning from component-level tasks to complete system ownership",
            "Mastery of state-of-the-art industry CAD/EDA toolchains and protocols",
            "Technical leadership development and senior package negotiation strategies"
          ],
          quote: `Upgrading to modern verification and physical design methodologies helped me land a senior role at a tier-1 technology firm.`,
          author: "Prashant M.",
          authorRole: "Senior Silicon Designer"
        },
        {
          level: "6-10+ Years",
          label: "Senior & Leadership",
          role: `Principal Systems / Design Architect in ${t}`,
          description: `Direct end-to-end hardware development, drive product research, and lead multidisciplinary engineering initiatives.`,
          gains: [
            "Enterprise system architecture, yield optimization, and product lifecycle strategy",
            "Cross-disciplinary leadership across hardware, firmware, and manufacturing",
            "Strategic technology roadmap definition and vendor partnership management",
            "Building and scaling technical engineering and simulation teams"
          ],
          quote: `The comprehensive system-level design training enabled me to transition into leading complex product development programs.`,
          author: "Dr. Arvind S.",
          authorRole: "Principal Hardware Architect"
        }
      ];
    }

    // Default Tech & Software Engineering (AI, ML, Full Stack, DSA, Android, etc.)
    return [
      {
        level: "0-2 Years",
        label: "Graduates & Early Career",
        role: `Associate ${t} Engineer / Analyst`,
        description: `Launch your career in ${t} by developing high-demand applied skills, building real-world projects, and securing your entry into top tech companies.`,
        gains: [
          `Portfolio-ready implementations in real-world ${t} workflows`,
          "Targeted resume refinement & 1-on-1 mock interview drill-downs",
          "Curated introductions to active hiring networks and partner firms",
          "Practical mastery to ace coding rounds and system walkthroughs"
        ],
        quote: `Building tangible ${t} systems gave me distinct talking points that set me apart. I landed a full-time role within 10 weeks of finishing the course.`,
        author: "Ananya R.",
        authorRole: "Associate Software Engineer"
      },
      {
        level: "2-6 Years",
        label: "Mid-Level Professionals",
        role: `Senior ${t} Specialist`,
        description: `Elevate your impact in ${t}, pivot away from legacy stacks into high-growth domains, and negotiate higher compensation packages.`,
        gains: [
          "Advanced architectural patterns, deployment pipelines, and optimization",
          "Clear progression pathways from individual contributor to tech owner",
          "In-depth command of modern production-grade tooling and frameworks",
          "Compensation benchmarking and strategic offer negotiation techniques"
        ],
        quote: `I felt boxed in by outdated tools. Transitioning into modern ${t} unlocked immediate opportunities and secured me a 120% pay upgrade.`,
        author: "Karthik V.",
        authorRole: "Senior Systems Engineer"
      },
      {
        level: "6-10+ Years",
        label: "Senior & Leadership",
        role: `Staff / Lead Architect in ${t}`,
        description: `Position yourself at the forefront of technical strategy, architect enterprise-scale solutions, and guide engineering teams through modern ${t} transformations.`,
        gains: [
          "Architecting resilient, production-ready distributed architectures",
          "High-performance engineering management and product alignment",
          "Data-driven technology selection and executive-level roadmapping",
          "Scaling multi-disciplinary tech teams and mentoring future leads"
        ],
        quote: `The architectural case studies and design discussions reshaped how I build systems. I now lead a team of 15+ engineers driving strategic ${t} initiatives.`,
        author: "Siddharth N.",
        authorRole: "Principal Technology Architect"
      }
    ];
  };

  const careerTracks = getCareerTracks(safeTitle);

  return {
    techStack,
    salaryData,
    projects,
    curriculum,
    careerTracks
  };
};
