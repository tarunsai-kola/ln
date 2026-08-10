const fs = require('fs');
const path = require('path');

const courses = [
  {
    id: 'AIML',
    route: 'AIML',
    componentName: 'AIML',
    data: {
      heroTitle: "AI & Machine Learning",
      heroSubtitle: "Build predictive models, intelligent automation systems, and scale AI architectures in this intensive 15-week program.",
      toolsSubtitle: "Master the modern AI & Machine Learning stack",
      trackSubtitle: "A dedicated AI & ML track for every stage of your career.",
      trackButtonLabel: "Start Your AI Career →",
      projectLabel: "AI Project",
      careerOutcomesDomain: "DataScience",
      trustStats: [
        { value: "15 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "12+ Projects", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "AI & ML", label: "Core Focus" },
      ],
      toolsList: [
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
        { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
        { name: "Scikit-Learn", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
        { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "Junior ML Engineers", desc: "Build the foundational Python and ML skills.", benefits: ["End-to-end ML workflows", "Supervised/Unsupervised Learning", "Predictive Analytics"], quote: "I want to start building real predictive models.", image: "careerPath0" },
        { exp: "2–6 Years", title: "Mid-Level AI Engineers", desc: "Scale AI apps and implement advanced Deep Learning.", benefits: ["Architect AI apps", "Deep Learning & NLP", "Deploy ML Models"], quote: "I need to upgrade from ML to modern AI engineering.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "AI Architects & Leads", desc: "Lead AI transformation and design enterprise architecture.", benefits: ["Enterprise AI Strategy", "Scaling AI products", "Leading ML teams"], quote: "My focus is on AI strategy and ROI.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Python & Data Processing", focusLabel: "CURRICULUM", focus: ["Advanced Python for AI", "Data Wrangling with Pandas", "Exploratory Data Analysis", "Feature Engineering"], application: "Data Processing Pipelines" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Core Machine Learning", focusLabel: "CURRICULUM", focus: ["Supervised Learning (Regression/Classification)", "Unsupervised Learning (Clustering)", "Model Evaluation & Tuning", "Ensemble Methods"], application: "Predictive Modeling Engine" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Deep Learning & AI", focusLabel: "CURRICULUM", focus: ["Neural Networks & Backpropagation", "CNNs for Computer Vision", "RNNs & NLP", "Model Deployment"], application: "Deep Learning Image Classifier" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–15", title: "Industry Capstone & Career", focusLabel: "CURRICULUM", focus: ["Industry Capstone Project", "MLOps Fundamentals", "Resume & Interview Prep", "Placement Support"], application: "End-to-End AI Application" }
      ],
      capstoneProjects: [
        { icon: "BrainCircuit", title: "Fraud Detection System", desc: "Build an ML model to detect fraudulent transactions.", tools: ["Python", "Scikit", "Pandas"] },
        { icon: "Code", title: "Image Classifier API", desc: "Deploy a CNN model via a REST API.", tools: ["TensorFlow", "FastAPI", "Docker"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "15 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  },
  {
    id: 'CyberSecurity',
    route: 'CyberSecurity',
    componentName: 'CyberSecurity',
    data: {
      heroTitle: "Cyber Security",
      heroSubtitle: "Defend systems with ethical hacking, secure cloud architectures, and incident response in this 27-week intensive program.",
      toolsSubtitle: "Master the modern Cyber Security stack",
      trackSubtitle: "A dedicated Cyber Security track for every stage of your career.",
      trackButtonLabel: "Start Your Security Career →",
      projectLabel: "Security Project",
      careerOutcomesDomain: "Cybersecurity",
      trustStats: [
        { value: "27 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "Labs", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "Security", label: "Core Focus" },
      ],
      toolsList: [
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Bash", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", invert: true },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "SOC Analysts", desc: "Build foundational networking and Linux skills.", benefits: ["Networking & Linux", "Threat Hunting", "Log Analysis"], quote: "I want to start catching real threats.", image: "careerPath0" },
        { exp: "2–6 Years", title: "Penetration Testers", desc: "Advanced ethical hacking and vulnerability assessments.", benefits: ["Web App Security", "Network Pentesting", "Exploit Dev"], quote: "I need to upgrade to offensive security.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Security Architects", desc: "Design secure enterprise architectures.", benefits: ["Cloud Security", "Zero Trust Architecture", "Compliance"], quote: "I focus on enterprise security posture.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–6", title: "Networking & OS", focusLabel: "CURRICULUM", focus: ["TCP/IP & OSI Model", "Linux Administration", "Windows Server", "Bash Scripting"], application: "Secure Network Design" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 7–14", title: "Ethical Hacking", focusLabel: "CURRICULUM", focus: ["Vulnerability Assessment", "Metasploit Framework", "Web App Pentesting", "Wireless Security"], application: "Vulnerability Report" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 15–22", title: "Defensive Security", focusLabel: "CURRICULUM", focus: ["SIEM (Splunk)", "Incident Response", "Malware Analysis", "Digital Forensics"], application: "SOC Dashboard Setup" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 23–27", title: "Cloud Sec & Capstone", focusLabel: "CURRICULUM", focus: ["AWS Security", "Zero Trust", "Capstone Project", "Interview Prep"], application: "Secure Cloud Deployment" }
      ],
      capstoneProjects: [
        { icon: "ShieldCheck", title: "Enterprise Penetration Test", desc: "Conduct a full red-team assessment on a simulated corporate network.", tools: ["Kali Linux", "Metasploit", "Nmap"] },
        { icon: "Workflow", title: "SOC Implementation", desc: "Deploy and configure a SIEM to detect active threats.", tools: ["Splunk", "Suricata", "Elastic"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "27 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  },
  {
    id: 'CloudComputing',
    route: 'CloudComputing',
    componentName: 'CloudComputing',
    data: {
      heroTitle: "Cloud Computing",
      heroSubtitle: "Architect and deploy scalable infrastructure on AWS and Azure in this comprehensive 25-week program.",
      toolsSubtitle: "Master the modern Cloud stack",
      trackSubtitle: "A dedicated Cloud Computing track for every stage of your career.",
      trackButtonLabel: "Start Your Cloud Career →",
      projectLabel: "Cloud Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "25 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "AWS/Azure", label: "Platforms" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "Cloud", label: "Core Focus" },
      ],
      toolsList: [
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
        { name: "Azure", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "Cloud Support Engineers", desc: "Build foundational cloud skills.", benefits: ["Linux & Networking", "AWS EC2 & S3", "Identity Management"], quote: "I want to migrate into cloud computing.", image: "careerPath0" },
        { exp: "2–6 Years", title: "Cloud Architects", desc: "Design highly available infrastructures.", benefits: ["Microservices", "Serverless Computing", "Cloud Security"], quote: "I need to design scalable architectures.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Enterprise Cloud Leads", desc: "Lead multi-cloud transformations.", benefits: ["Multi-Cloud Strategy", "FinOps", "Enterprise Migration"], quote: "I focus on enterprise cloud strategy.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–6", title: "Cloud Foundations", focusLabel: "CURRICULUM", focus: ["Linux Admin", "Networking basics", "Virtualization", "Cloud Concepts"], application: "Basic Web Hosting" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 7–14", title: "AWS Architecture", focusLabel: "CURRICULUM", focus: ["VPC & EC2", "S3 & RDS", "IAM & Security", "Serverless (Lambda)"], application: "Scalable 3-Tier Architecture" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 15–20", title: "Azure Infrastructure", focusLabel: "CURRICULUM", focus: ["Azure VMs", "Azure Active Directory", "App Services", "Azure Networking"], application: "Hybrid Cloud Setup" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 21–25", title: "Capstone & Placement", focusLabel: "CURRICULUM", focus: ["Migration Strategies", "Capstone Project", "Interview Prep", "AWS/Azure Cert Prep"], application: "Enterprise Migration Project" }
      ],
      capstoneProjects: [
        { icon: "Server", title: "Multi-Region Web App", desc: "Deploy a highly available, auto-scaling web application across multiple AWS regions.", tools: ["AWS", "Route53", "EC2"] },
        { icon: "Database", title: "Serverless Data Pipeline", desc: "Build a serverless ETL pipeline using Azure Functions and Cosmos DB.", tools: ["Azure", "Functions", "CosmosDB"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "25 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  },
  {
    id: 'FullStackWeb',
    route: 'FullStackWeb',
    componentName: 'FullStackWeb',
    data: {
      heroTitle: "Full Stack Web (MERN)",
      heroSubtitle: "Build secure, scalable full-stack web applications in this intensive 24-week program.",
      toolsSubtitle: "Master the modern Web stack",
      trackSubtitle: "A dedicated Web Dev track for every stage of your career.",
      trackButtonLabel: "Start Your Dev Career →",
      projectLabel: "Dev Project",
      careerOutcomesDomain: "AIFullStack",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "15+ Projects", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "MERN", label: "Core Focus" },
      ],
      toolsList: [
        { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invert: true },
        { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "Frontend Developers", desc: "Build responsive UIs.", benefits: ["HTML/CSS/JS", "React.js", "Tailwind CSS"], quote: "I want to build beautiful web interfaces.", image: "careerPath0" },
        { exp: "2–6 Years", title: "Full Stack Engineers", desc: "Connect APIs and databases.", benefits: ["Node.js APIs", "MongoDB", "Auth & Security"], quote: "I need to build end-to-end applications.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Tech Leads", desc: "Design scalable system architectures.", benefits: ["System Design", "Microservices", "CI/CD Deployment"], quote: "I focus on app performance and architecture.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–6", title: "Frontend Foundations", focusLabel: "CURRICULUM", focus: ["HTML5, CSS3, JS ES6+", "DOM Manipulation", "Responsive Design", "Tailwind CSS"], application: "Interactive Portfolio Website" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 7–12", title: "React.js Mastery", focusLabel: "CURRICULUM", focus: ["React Components & Hooks", "State Management (Redux)", "React Router", "API Integration"], application: "E-Commerce Frontend" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 13–18", title: "Backend (Node & Express)", focusLabel: "CURRICULUM", focus: ["Node.js Fundamentals", "Express.js REST APIs", "MongoDB & Mongoose", "JWT Authentication"], application: "RESTful API Backend" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 19–24", title: "Full Stack Capstone", focusLabel: "CURRICULUM", focus: ["MERN Integration", "WebSockets (Socket.io)", "Deployment (Vercel/Render)", "Interview Prep"], application: "Full Stack Social Network" }
      ],
      capstoneProjects: [
        { icon: "Layers", title: "E-Commerce Platform", desc: "Build a complete MERN store with Stripe payments.", tools: ["React", "Node", "MongoDB"] },
        { icon: "MessageSquare", title: "Real-time Chat App", desc: "Develop a WebSocket-based real-time messaging application.", tools: ["Socket.io", "React", "Express"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "24 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  }
];

// Ensure the page directory exists
const pagesDir = path.join(__dirname, 'src', 'page');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Generate the wrapper components
courses.forEach(course => {
  const componentCode = `import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const ${course.componentName} = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = ${JSON.stringify(course.data, null, 2)};

  // Inject image references back in since JSON.stringify wipes variables
  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default ${course.componentName};
`;
  
  fs.writeFileSync(path.join(pagesDir, `${course.componentName}.jsx`), componentCode, 'utf8');
  console.log(`Generated ${course.componentName}.jsx`);
});

console.log('Finished generating first batch of courses!');
