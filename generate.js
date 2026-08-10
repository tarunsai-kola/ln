const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'frontend/src/page/SoftwareDeveloper.jsx');
const content = fs.readFileSync(srcPath, 'utf8');

// The replacement config
const pages = [
  {
    name: 'DataScience',
    title: 'Data Science & GenAI',
    desc: 'Master predictive modeling and architect LLM-powered applications.',
    courseValue: 'Data Science',
    tools: '["Python", "PyTorch", "LangChain", "TensorFlow", "HuggingFace", "SQL", "Spark", "Docker", "AWS", "FastAPI"]',
    color: '#8b5cf6', // violet
    programOutline: `[
  {
    phase: "Phase 1",
    weeks: "Weeks 1-4",
    title: "Python & Advanced Data Engineering",
    focus: [
      "Advanced Python (OOP, Functional, Async)",
      "Data manipulation with Pandas & Polars",
      "ETL pipelines and SQL optimization",
      "Exploratory Data Analysis (EDA)",
    ],
    application: "Build an automated data pipeline fetching live financial data, cleaning it, and storing it in a Postgres database."
  },
  {
    phase: "Phase 2",
    weeks: "Weeks 5-8",
    title: "Machine Learning & Predictive Modeling",
    focus: [
      "Supervised & Unsupervised Learning algorithms",
      "Feature Engineering & Selection",
      "Model evaluation, tuning, and cross-validation",
      "Ensemble methods (XGBoost, Random Forest)",
    ],
    application: "Develop a high-accuracy churn prediction model for an e-commerce dataset and expose it via a REST API."
  },
  {
    phase: "Phase 3",
    weeks: "Weeks 9-12",
    title: "Deep Learning & Neural Networks",
    focus: [
      "PyTorch fundamentals and autograd",
      "Convolutional Neural Networks (CNNs) for vision",
      "Recurrent Neural Networks (RNNs/LSTMs) for time series",
      "Model deployment with Docker and FastAPI",
    ],
    application: "Train and deploy an image classification model to detect anomalies in manufacturing quality control."
  },
  {
    phase: "Phase 4",
    weeks: "Weeks 13-16",
    title: "Generative AI & LLM Architecture",
    focus: [
      "Transformer architecture and attention mechanisms",
      "Prompt engineering and fine-tuning (PEFT/LoRA)",
      "Retrieval-Augmented Generation (RAG) with LangChain",
      "Vector databases (Pinecone, ChromaDB)",
    ],
    application: "Build an autonomous AI agent capable of querying enterprise document databases to answer complex questions."
  }
]`,
    capstoneProjects: `[
  { icon: BrainCircuit, title: "Enterprise RAG Search Engine", desc: "A robust retrieval-augmented generation system indexing corporate documents using vector embeddings and LangChain.", tools: ["LangChain", "Pinecone", "OpenAI", "FastAPI"] },
  { icon: TrendingUp, title: "Algorithmic Trading Bot", desc: "Predictive model for stock price movement using LSTMs and real-time market sentiment analysis.", tools: ["PyTorch", "Pandas", "Kafka", "AWS"] },
  { icon: Users, title: "Customer Churn Predictor", desc: "End-to-end machine learning pipeline predicting customer attrition with automated retraining.", tools: ["Scikit-learn", "XGBoost", "Airflow", "Docker"] },
  { icon: TerminalSquare, title: "Medical Image Diagnostic AI", desc: "Computer vision application classifying X-ray scans to assist radiologists, deployed with an interactive UI.", tools: ["PyTorch", "CNNs", "React", "FastAPI"] },
  { icon: Landmark, title: "LLM Financial Analyst", desc: "Generative AI tool that reads financial statements and automatically generates executive summaries.", tools: ["HuggingFace", "Transformers", "Python", "Streamlit"] },
]`,
    careerPaths: `[
  {
    exp: "0-2 Years",
    title: "Junior Data Scientist",
    desc: "Start your career by building data pipelines, analyzing datasets, and deploying baseline predictive models.",
    benefits: [
      "Master Python and SQL for data manipulation",
      "Understand core machine learning algorithms",
      "Deploy models via REST APIs"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    quote: "The ability to not just build models, but put them into production, sets our junior scientists apart."
  },
  {
    exp: "2-5 Years",
    title: "AI Engineer / ML Engineer",
    desc: "Transition from basic modeling to architecting complex neural networks and integrating LLMs into existing products.",
    benefits: [
      "Design and train Deep Learning models",
      "Build RAG systems and autonomous agents",
      "Optimize models for production latency"
    ],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
    quote: "Scaling AI is the hardest part. Engineers who understand MLOps and GenAI are incredibly rare."
  },
  {
    exp: "5+ Years",
    title: "Lead AI Architect",
    desc: "Lead AI strategy, architecting scalable enterprise AI systems and managing teams of data scientists.",
    benefits: [
      "Design scalable AI infrastructure",
      "Lead cross-functional AI initiatives",
      "Navigate AI ethics, compliance, and security"
    ],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    quote: "True leadership in AI requires understanding both the bleeding-edge models and the underlying business value."
  }
]`
  },
  {
    name: 'DataAnalytics',
    title: 'Data Analytics & AI',
    desc: 'Combine traditional BI with AI-driven analytics and insights.',
    courseValue: 'Data Analytics',
    tools: '["SQL", "PowerBI", "Tableau", "Python", "Excel", "Snowflake", "dbt", "AI Analytics", "GCP", "Looker"]',
    color: '#06b6d4', // cyan
    programOutline: `[
  {
    phase: "Phase 1",
    weeks: "Weeks 1-4",
    title: "Advanced SQL & Data Modeling",
    focus: [
      "Complex Joins, Window Functions, and CTEs",
      "Data Warehousing concepts (Star Schema, Snowflake)",
      "Performance tuning and query optimization",
      "dbt (data build tool) fundamentals",
    ],
    application: "Architect a normalized data warehouse for a retail chain and write optimized analytical queries."
  },
  {
    phase: "Phase 2",
    weeks: "Weeks 5-8",
    title: "Python for Data Analysis",
    focus: [
      "Pandas and NumPy for massive datasets",
      "Data cleaning, imputation, and transformation",
      "Statistical analysis and hypothesis testing",
      "Automating reports with Python scripts",
    ],
    application: "Clean and analyze a dirty dataset of 10M+ rows to find actionable business insights regarding seasonal trends."
  },
  {
    phase: "Phase 3",
    weeks: "Weeks 9-12",
    title: "Business Intelligence & Visualization",
    focus: [
      "Power BI & Tableau mastery",
      "DAX (Data Analysis Expressions)",
      "Designing intuitive, high-impact dashboards",
      "Storytelling with data for executives",
    ],
    application: "Build a dynamic, interactive executive dashboard tracking KPIs across multiple business units."
  },
  {
    phase: "Phase 4",
    weeks: "Weeks 13-16",
    title: "AI-Augmented Analytics",
    focus: [
      "Using LLMs (ChatGPT/Claude) for data querying",
      "Automated insights and anomaly detection",
      "Predictive analytics using automated ML tools",
      "Integrating AI into BI workflows",
    ],
    application: "Develop an AI-powered analytics agent that allows executives to query their dashboards using natural language."
  }
]`,
    capstoneProjects: `[
  { icon: LineChart, title: "Executive Retail Dashboard", desc: "A comprehensive Power BI dashboard analyzing sales velocity, inventory turnover, and regional performance.", tools: ["Power BI", "SQL", "DAX", "Snowflake"] },
  { icon: TrendingUp, title: "Marketing ROI Analyzer", desc: "Data pipeline and visualization suite tracking campaign performance and attributing revenue across channels.", tools: ["Tableau", "Python", "dbt", "PostgreSQL"] },
  { icon: BrainCircuit, title: "AI-Powered NLP Analytics", desc: "System that ingests thousands of customer reviews, runs sentiment analysis via AI, and visualizes the results.", tools: ["Python", "OpenAI", "Pandas", "Looker"] },
  { icon: Users, title: "HR Attrition Insights", desc: "Statistical analysis and dashboard identifying key drivers of employee turnover across departments.", tools: ["Excel", "Python", "Tableau", "SQL"] },
  { icon: DollarSign, title: "Financial Forecasting Tool", desc: "Automated pipeline that pulls historical financial data and uses time-series forecasting to predict cash flow.", tools: ["Python", "Prophet", "SQL", "Power BI"] },
]`,
    careerPaths: `[
  {
    exp: "0-2 Years",
    title: "Data Analyst",
    desc: "Begin by writing SQL queries, cleaning datasets, and building foundational dashboards for business teams.",
    benefits: [
      "Master SQL and database querying",
      "Build basic Power BI / Tableau dashboards",
      "Understand business KPIs"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    quote: "A strong foundation in SQL is the absolute prerequisite for any successful data career."
  },
  {
    exp: "2-5 Years",
    title: "Senior BI Analyst / Analytics Engineer",
    desc: "Architect data models, use dbt for transformations, and integrate AI to automate reporting.",
    benefits: [
      "Master dbt and Data Warehousing",
      "Build complex DAX models",
      "Leverage AI for automated insights"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    quote: "We don't just want reports; we want automated, AI-driven insights that tell us what to do next."
  },
  {
    exp: "5+ Years",
    title: "Head of Data & Analytics",
    desc: "Lead the data strategy for the organization, bridging the gap between technical infrastructure and business growth.",
    benefits: [
      "Define enterprise data strategy",
      "Manage teams of analysts and engineers",
      "Drive data-driven culture"
    ],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    quote: "Data leaders must translate complex infrastructure into pure, unadulterated business value."
  }
]`
  },
  {
    name: 'Cybersecurity',
    title: 'Cybersecurity',
    desc: 'Defend modern digital systems with ethical hacking and security architecture.',
    courseValue: 'Cybersecurity',
    tools: '["Kali Linux", "Wireshark", "Metasploit", "Python", "AWS Security", "Burp Suite", "Splunk", "Docker", "Nmap", "Linux"]',
    color: '#e11d48', // rose
    programOutline: `[
  {
    phase: "Phase 1",
    weeks: "Weeks 1-4",
    title: "Network Security & Fundamentals",
    focus: [
      "TCP/IP, OSI Model, and networking protocols",
      "Traffic analysis with Wireshark and tcpdump",
      "Firewalls, VPNs, and IDS/IPS",
      "Linux command line mastery and scripting",
    ],
    application: "Set up a secure enterprise network architecture and capture/analyze malicious traffic traversing the network."
  },
  {
    phase: "Phase 2",
    weeks: "Weeks 5-8",
    title: "Ethical Hacking & Penetration Testing",
    focus: [
      "Vulnerability scanning and enumeration (Nmap)",
      "Exploitation with Metasploit framework",
      "Web application security (OWASP Top 10)",
      "Privilege escalation and post-exploitation",
    ],
    application: "Conduct a full penetration test on a vulnerable web application, exploiting SQLi and XSS to gain root access."
  },
  {
    phase: "Phase 3",
    weeks: "Weeks 9-12",
    title: "Cloud Security & Architecture",
    focus: [
      "AWS/Azure security fundamentals",
      "IAM policies, encryption, and key management",
      "Securing containers (Docker, Kubernetes)",
      "DevSecOps pipelines and automated scanning",
    ],
    application: "Audit an AWS environment, remediate misconfigured S3 buckets, and implement strict IAM least-privilege policies."
  },
  {
    phase: "Phase 4",
    weeks: "Weeks 13-16",
    title: "Incident Response & AI in Security",
    focus: [
      "SIEM tools (Splunk) and log analysis",
      "Threat hunting and threat intelligence",
      "Using AI/LLMs for automated log parsing",
      "Malware analysis and digital forensics",
    ],
    application: "Respond to a simulated ransomware attack, using SIEM logs and AI tools to isolate the threat and write an incident report."
  }
]`,
    capstoneProjects: `[
  { icon: ShieldCheck, title: "Enterprise Penetration Test", desc: "A comprehensive red-team engagement against a simulated corporate network, resulting in a professional executive report.", tools: ["Metasploit", "Burp Suite", "Nmap", "Kali"] },
  { icon: Server, title: "Cloud Infrastructure Hardening", desc: "Auditing and securing a multi-tier AWS application, implementing WAF, GuardDuty, and strict IAM roles.", tools: ["AWS", "Terraform", "Docker", "Linux"] },
  { icon: BrainCircuit, title: "AI-Powered Threat Detection", desc: "A machine learning pipeline that analyzes network traffic logs to detect anomalies and zero-day attacks.", tools: ["Python", "Splunk", "Scikit-learn", "Wireshark"] },
  { icon: TerminalSquare, title: "Automated DevSecOps Pipeline", desc: "Integrating SAST and DAST security scanning tools directly into a CI/CD GitHub Actions pipeline.", tools: ["GitHub Actions", "SonarQube", "OWASP ZAP", "Bash"] },
  { icon: Workflow, title: "Incident Response Playbook", desc: "End-to-end simulated response to a data breach, including forensics, containment, and recovery procedures.", tools: ["Splunk", "Digital Forensics", "Linux", "Python"] },
]`,
    careerPaths: `[
  {
    exp: "0-2 Years",
    title: "Security Operations Center (SOC) Analyst",
    desc: "Monitor network traffic, analyze alerts in SIEM tools, and act as the first line of defense against cyber threats.",
    benefits: [
      "Master traffic analysis (Wireshark)",
      "Learn to triage SIEM alerts",
      "Understand basic incident response"
    ],
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
    quote: "SOC Analysts are the immune system of the organization, detecting the anomalies before they become disasters."
  },
  {
    exp: "2-5 Years",
    title: "Penetration Tester / Security Engineer",
    desc: "Actively hunt for vulnerabilities by simulating cyberattacks, or engineer secure cloud architectures to prevent them.",
    benefits: [
      "Master exploitation frameworks",
      "Secure cloud infrastructure (AWS/Azure)",
      "Implement DevSecOps pipelines"
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    quote: "The best defense is a good offense. Understanding how attackers think is critical to building secure systems."
  },
  {
    exp: "5+ Years",
    title: "CISO / Security Architect",
    desc: "Design enterprise-wide security postures, manage risk, and ensure compliance with global frameworks.",
    benefits: [
      "Design zero-trust architectures",
      "Manage enterprise risk and compliance",
      "Lead incident response teams"
    ],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    quote: "Security is no longer just an IT issue; it is a fundamental business risk that requires executive leadership."
  }
]`
  },
  {
    name: 'DigitalMarketing',
    title: 'Digital Marketing & AI',
    desc: 'Execute high-ROI campaigns using AI-generated content and analytics.',
    courseValue: 'Digital Marketing',
    tools: '["Meta Ads", "Google Ads", "SEO", "ChatGPT", "Midjourney", "Google Analytics", "HubSpot", "Mailchimp", "Canva", "WordPress"]',
    color: '#f59e0b', // amber
    programOutline: `[
  {
    phase: "Phase 1",
    weeks: "Weeks 1-4",
    title: "Performance Marketing & Media Buying",
    focus: [
      "Meta Ads (Facebook/Instagram) architecture",
      "Google Ads (Search, Display, Max Performance)",
      "Audience targeting and lookalike modeling",
      "Budget allocation and ROAS optimization",
    ],
    application: "Launch and manage a simulated $5,000 ad campaign, optimizing for lowest Cost Per Acquisition (CPA)."
  },
  {
    phase: "Phase 2",
    weeks: "Weeks 5-8",
    title: "SEO & Organic Growth Strategy",
    focus: [
      "Technical SEO and site architecture",
      "Keyword research and intent mapping",
      "On-page and Off-page optimization",
      "Local SEO and backlink building",
    ],
    application: "Perform a comprehensive technical SEO audit of a live website and execute a content ranking strategy."
  },
  {
    phase: "Phase 3",
    weeks: "Weeks 9-12",
    title: "AI-Powered Content & Copywriting",
    focus: [
      "Prompt engineering for marketing copy",
      "Generating visuals with Midjourney & DALL-E",
      "Automating social media calendars",
      "Conversion Rate Optimization (CRO)",
    ],
    application: "Use AI tools to rapidly generate a month's worth of multi-channel ad creatives, blogs, and social posts."
  },
  {
    phase: "Phase 4",
    weeks: "Weeks 13-16",
    title: "Data Analytics & CRM Automation",
    focus: [
      "Google Analytics 4 (GA4) & Tag Manager",
      "Email marketing automation (HubSpot)",
      "Lead scoring and funnel optimization",
      "Reporting dashboards for stakeholders",
    ],
    application: "Build an automated lead-nurturing email sequence integrated with GA4 tracking to measure end-to-end ROI."
  }
]`,
    capstoneProjects: `[
  { icon: Megaphone, title: "Omnichannel Ad Campaign", desc: "A cross-platform Meta and Google Ads strategy with A/B tested creatives, managing a simulated enterprise budget.", tools: ["Meta Ads", "Google Ads", "Looker Studio", "Excel"] },
  { icon: Target, title: "AI SEO Content Engine", desc: "An automated workflow utilizing LLMs to research, outline, and write SEO-optimized blog posts at scale.", tools: ["ChatGPT", "Ahrefs", "WordPress", "Python"] },
  { icon: LineChart, title: "GA4 Conversion Funnel Dashboard", desc: "Implementing advanced event tracking via Google Tag Manager and visualizing the user journey drop-offs.", tools: ["GA4", "GTM", "Data Studio", "HTML/JS"] },
  { icon: Users, title: "B2B Lead Nurturing Automation", desc: "A complex HubSpot workflow that scores leads based on engagement and automatically triggers personalized emails.", tools: ["HubSpot", "Zapier", "Mailchimp", "CRM"] },
  { icon: BrainCircuit, title: "Generative AI Brand Identity", desc: "Using Midjourney and AI design tools to completely rebrand a company's visual assets in record time.", tools: ["Midjourney", "Canva", "Photoshop", "Figma"] },
]`,
    careerPaths: `[
  {
    exp: "0-2 Years",
    title: "Growth Marketing Associate",
    desc: "Execute daily marketing operations, manage social media, run basic ad campaigns, and analyze website traffic.",
    benefits: [
      "Learn Google and Meta Ad platforms",
      "Master basic SEO principles",
      "Understand Google Analytics 4"
    ],
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2031&auto=format&fit=crop",
    quote: "Execution is everything in early marketing. You must know the platforms inside and out before you can strategize."
  },
  {
    exp: "2-5 Years",
    title: "Performance Marketer / Growth Lead",
    desc: "Manage large ad budgets, integrate AI to scale content production, and optimize the entire conversion funnel.",
    benefits: [
      "Optimize multi-channel ROAS",
      "Use AI to scale content 10x",
      "Build complex CRM automations"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    quote: "The modern marketer is half creative, half data scientist. AI is the bridge between the two."
  },
  {
    exp: "5+ Years",
    title: "Chief Marketing Officer (CMO)",
    desc: "Lead the overarching brand strategy, align marketing with sales goals, and drive exponential company growth.",
    benefits: [
      "Define brand and market positioning",
      "Manage marketing P&L",
      "Lead teams of specialized marketers"
    ],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    quote: "Great CMOs don't just spend money on ads; they architect predictable, scalable revenue engines."
  }
]`
  }
];

function replaceContent(template, config) {
  let output = template;
  
  // 1. Rename Component
  output = output.replace(/export default function SoftwareDeveloper/g, "export default function " + config.name);
  
  // 2. Rename Helmet title
  output = output.replace(/<title>Software Developer \| ΣxpoGraph<\/title>/g, "<title>" + config.title + " | ΣxpoGraph</title>");
  
  // 3. Rename Hero Main Title
  output = output.replace(/Full Stack AI Software<br \/>Developer/g, config.title.replace('&', '&amp;'));
  
  // 4. Update the small pill label in Hero:
  output = output.replace(/SOFTWARE DEVELOPER/g, config.title.toUpperCase());
  
  // 5. Update courseValue in AdvancedApplyPopup buttons
  output = output.replace(/courseValue="Software Developer"/g, 'courseValue="' + config.courseValue + '"');
  
  // 6. Update Description paragraph
  output = output.replace(
    /Build scalable, secure, and intelligent applications\\. Master the full stack from backend microservices to AI-driven frontend experiences\\./g, 
    config.desc
  );
  
  // 7. Update arrays
  output = output.replace(/const tools = \\[.*?\\];/s, "const tools = " + config.tools + ";");
  output = output.replace(/const programOutline = \\[.*?\\];/s, "const programOutline = " + config.programOutline + ";");
  output = output.replace(/const capstoneProjects = \\[.*?\\];/s, "const capstoneProjects = " + config.capstoneProjects + ";");
  output = output.replace(/const careerPaths = \\[.*?\\];/s, "const careerPaths = " + config.careerPaths + ";");
  
  // 8. Replace specific primary colors
  output = output.replace(/#6366f1/g, config.color);
  output = output.replace(/#818cf8/g, config.color);
  
  // 9. Update "Start Your SD Career" button text
  output = output.replace(/Start Your SD Career/g, "Start Your " + config.courseValue + " Career");
  
  return output;
}

pages.forEach(page => {
  const newContent = replaceContent(content, page);
  const outPath1 = path.join(__dirname, 'frontend/src/page', page.name + '.jsx');
  const outPath2 = path.join(__dirname, 'frontend/FRONTEND/src/page', page.name + '.jsx');
  
  fs.writeFileSync(outPath1, newContent);
  fs.writeFileSync(outPath2, newContent);
  console.log("Generated " + page.name + ".jsx");
});
