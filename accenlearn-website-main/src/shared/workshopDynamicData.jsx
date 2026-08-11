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
  }
};

export const getDynamicWorkshopData = (title) => {
  const safeTitle = title || "Technical Domains";
  
  // Try to find exact matches, otherwise fallback to generic generated content
  const techStack = TECH_STACKS[title] || TECH_STACKS["Default"];
  const salaryData = SALARY_DATA[title] || SALARY_DATA["Default"];

  // Generate generic dynamic projects based on title
  const projects = [
    {
      category: "Enterprise Scale",
      title: `${safeTitle} Analytics Dashboard`,
      desc: `A high-throughput platform capable of processing 1M+ events per minute tailored for ${safeTitle} applications.`,
      tech: techStack.slice(0, 3).map(t => t.name),
      featured: true
    },
    {
      category: "Advanced Applications",
      title: `Predictive ${safeTitle} Model`,
      desc: `Deployed an advanced model utilizing core ${safeTitle} principles with 92% accuracy, integrated via REST API.`,
      tech: techStack.slice(1, 4).map(t => t.name),
      featured: false
    },
    {
      category: "Cloud Native",
      title: `Serverless ${safeTitle} Backend`,
      desc: `Highly scalable, event-driven architecture handling complex processing workloads for ${safeTitle}.`,
      tech: techStack.slice(2, 5).map(t => t.name),
      featured: false
    },
    {
      category: "Data Engineering",
      title: `Automated ${safeTitle} Pipeline`,
      desc: `Architected a robust daily processing pipeline orchestrating heavy workloads specific to ${safeTitle}.`,
      tech: techStack.slice(0, 3).map(t => t.name),
      featured: false
    },
    {
      category: "Innovation",
      title: `Next-Gen ${safeTitle} Engine`,
      desc: `A modern, scalable solution implementing cutting-edge ${safeTitle} concepts with a modern frontend.`,
      tech: techStack.slice(1, 4).map(t => t.name),
      featured: false
    }
  ];

  // Generate dynamic curriculum phases
  const curriculum = [
    {
      weeks: "Weeks 1-4",
      title: "Foundations & Core Concepts",
      icon: <FaCode className="w-5 h-5 text-blue-400" />,
      topics: [
        `Introduction to ${safeTitle}`,
        "Core Principles & Best Practices",
        "Setting up the Environment",
        "Fundamentals and Theory"
      ],
      application: `Build a basic foundational project implementing core ${safeTitle} concepts.`
    },
    {
      weeks: "Weeks 5-8",
      title: "Intermediate Applications",
      icon: <FaServer className="w-5 h-5 text-indigo-400" />,
      topics: [
        "Advanced Patterns & Architecture",
        "Data Handling & State Management",
        "Security & Authentication",
        "Performance Optimization"
      ],
      application: `Optimize a legacy system using advanced ${safeTitle} techniques.`
    },
    {
      weeks: "Weeks 9-12",
      title: "System Design & Architecture",
      icon: <FaNetworkWired className="w-5 h-5 text-blue-400" />,
      topics: [
        "Scalability & Microservices",
        "Cloud Integration",
        "Database Architecture",
        "API Design & Deployment"
      ],
      application: "Design a high-level system architecture for a million-user application."
    },
    {
      weeks: "Weeks 13-16",
      title: "Production Deployment & Capstone",
      icon: <FaRocket className="w-5 h-5 text-indigo-400" />,
      topics: [
        "CI/CD Pipelines",
        "Testing & QA",
        "Monitoring & Analytics",
        "Final Capstone Project Presentation"
      ],
      application: "Deploy a fully functional, production-ready capstone project."
    }
  ];

  // Generate dynamic career tracks
  const careerTracks = [
    {
      level: "0-2 Years",
      label: "Freshers & Early Career",
      role: `Junior ${safeTitle} Engineer / Analyst`,
      description: `Kickstart your career in ${safeTitle} by mastering the foundational skills and landing your first high-paying tech job.`,
      gains: [
        "Strong fundamentals and hands-on portfolio",
        "Mock interviews and resume building",
        "Direct referrals to hiring partners",
        "Confidence to crack technical rounds"
      ],
      quote: `The practical ${safeTitle} projects helped me clear my technical round with ease. I secured a role within 2 months of graduating.`,
      author: "Priya S.",
      authorRole: "Software Engineer"
    },
    {
      level: "2-6 Years",
      label: "Mid-Level Professionals",
      role: `Senior ${safeTitle} Specialist`,
      description: `Accelerate your career growth in ${safeTitle}, transition into specialized roles, and command a significant salary hike.`,
      gains: [
        "Advanced system design and architecture",
        "Transitioning to leadership/senior roles",
        "Mastering modern tools and frameworks",
        "Negotiation strategies for higher packages"
      ],
      quote: `I was stuck in a legacy tech stack. This ${safeTitle} program helped me transition to a modern role with a 120% hike.`,
      author: "Rahul M.",
      authorRole: "Senior Developer"
    },
    {
      level: "6-10+ Years",
      label: "Senior & Leadership",
      role: `Lead / Architect in ${safeTitle}`,
      description: `Position yourself for tech leadership, architecture roles, and driving large-scale digital transformations in the ${safeTitle} space.`,
      gains: [
        "End-to-end scalable architecture design",
        "Engineering management principles",
        "Strategic decision making in tech",
        "Building and scaling technical teams"
      ],
      quote: `The mentorship on system architecture completely changed my approach. I'm now leading a team of 15 engineers in ${safeTitle}.`,
      author: "Anand T.",
      authorRole: "Principal Architect"
    }
  ];

  return {
    techStack,
    salaryData,
    projects,
    curriculum,
    careerTracks
  };
};
