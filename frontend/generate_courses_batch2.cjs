const fs = require('fs');
const path = require('path');

const courses = [
  {
    id: 'IoTRobotics',
    route: 'IoTRobotics',
    componentName: 'IoTRobotics',
    data: {
      heroTitle: "IoT & Robotics",
      heroSubtitle: "Connect hardware with software for smart automation and robotic systems in this 18-week program.",
      toolsSubtitle: "Master the modern Hardware & Automation stack",
      trackSubtitle: "A dedicated Hardware track for every stage of your career.",
      trackButtonLabel: "Start Your Robotics Career →",
      projectLabel: "Hardware Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "18 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "8+ Projects", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "Automation", label: "Core Focus" },
      ],
      toolsList: [
        { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "Arduino", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" },
        { name: "Raspberry Pi", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "IoT Engineers", desc: "Build foundational sensor networks.", benefits: ["Microcontrollers", "Sensor Interfacing", "Basic Robotics"], quote: "I want to connect hardware to the internet.", image: "careerPath0" },
        { exp: "2–6 Years", title: "Robotics Engineers", desc: "Develop autonomous automation systems.", benefits: ["ROS Integration", "Computer Vision", "Motor Control"], quote: "I need to build intelligent robots.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Automation Architects", desc: "Lead industrial automation.", benefits: ["IIoT Platforms", "Enterprise Architecture", "Edge AI"], quote: "I focus on large-scale industrial IoT.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Microcontrollers & C++", focusLabel: "CURRICULUM", focus: ["C++ for Hardware", "Arduino Basics", "Sensor Integration", "Actuators"], application: "Smart Home Node" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–9", title: "IoT & Networking", focusLabel: "CURRICULUM", focus: ["MQTT Protocols", "Raspberry Pi", "Edge Computing", "Cloud IoT Core"], application: "Cloud Connected Weather Station" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 10–14", title: "Robotics Foundations", focusLabel: "CURRICULUM", focus: ["Kinematics Basics", "ROS Framework", "Motor Drivers", "Path Planning"], application: "Autonomous Line Follower" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 15–18", title: "Capstone & Deployment", focusLabel: "CURRICULUM", focus: ["Capstone Project", "System Testing", "Resume Building", "Interview Prep"], application: "Industrial IoT Dashboard" }
      ],
      capstoneProjects: [
        { icon: "Cpu", title: "Autonomous Robot Arm", desc: "Build and program a 3-axis robot arm.", tools: ["Arduino", "Servos", "C++"] },
        { icon: "Network", title: "Smart City Traffic Node", desc: "Deploy a networked sensor array sending data via MQTT.", tools: ["Raspberry Pi", "Python", "MQTT"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "18 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  },
  {
    id: 'DevOps',
    route: 'DevOps',
    componentName: 'DevOps',
    data: {
      heroTitle: "DevOps Engineering",
      heroSubtitle: "Automate deployment pipelines and manage scalable cloud operations in this intensive 26-week program.",
      toolsSubtitle: "Master the modern DevOps stack",
      trackSubtitle: "A dedicated DevOps track for every stage of your career.",
      trackButtonLabel: "Start Your DevOps Career →",
      projectLabel: "Pipeline Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "26 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "Pipelines", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "CI/CD", label: "Core Focus" },
      ],
      toolsList: [
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
        { name: "Jenkins", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
        { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "Release Engineers", desc: "Build foundational CI/CD skills.", benefits: ["Git & Linux", "Docker Containers", "Basic CI/CD"], quote: "I want to automate software delivery.", image: "careerPath0" },
        { exp: "2–6 Years", title: "DevOps Engineers", desc: "Manage scalable infrastructure.", benefits: ["Kubernetes", "Infrastructure as Code", "Monitoring"], quote: "I need to manage complex clusters.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Platform Architects", desc: "Design enterprise DevOps platforms.", benefits: ["DevSecOps", "SRE Practices", "Enterprise Strategy"], quote: "I focus on reliability and security.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–6", title: "Linux & Scripting", focusLabel: "CURRICULUM", focus: ["Linux Admin", "Bash Scripting", "Python for DevOps", "Git & GitHub"], application: "Automated System Scripts" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 7–13", title: "Containers & CI/CD", focusLabel: "CURRICULUM", focus: ["Docker & Compose", "Jenkins Pipelines", "GitHub Actions", "Artifact Management"], application: "Automated Build Pipeline" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 14–20", title: "Kubernetes & IaC", focusLabel: "CURRICULUM", focus: ["Kubernetes Clusters", "Helm Charts", "Terraform", "Ansible"], application: "Infrastructure as Code Deployment" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 21–26", title: "Monitoring & Capstone", focusLabel: "CURRICULUM", focus: ["Prometheus & Grafana", "Capstone Project", "Interview Prep", "DevOps Cert Prep"], application: "Enterprise DevOps Pipeline" }
      ],
      capstoneProjects: [
        { icon: "Workflow", title: "End-to-End CI/CD", desc: "Deploy a microservices app using Jenkins and Kubernetes.", tools: ["Docker", "K8s", "Jenkins"] },
        { icon: "Server", title: "IaC Cloud Setup", desc: "Provision a secure AWS environment using Terraform.", tools: ["Terraform", "AWS", "Bash"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "26 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  },
  {
    id: 'DataAnalytics',
    route: 'DataAnalytics',
    componentName: 'DataAnalytics',
    data: {
      heroTitle: "Data Analytics",
      heroSubtitle: "Extract actionable business insights using modern data tools in this intensive 16-week program.",
      toolsSubtitle: "Master the modern Data stack",
      trackSubtitle: "A dedicated Analytics track for every stage of your career.",
      trackButtonLabel: "Start Your Analytics Career →",
      projectLabel: "Data Project",
      careerOutcomesDomain: "DataAnalytics",
      trustStats: [
        { value: "16 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "Dashboards", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "Insights", label: "Core Focus" },
      ],
      toolsList: [
        { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "Excel", img: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg" },
        { name: "Tableau", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png" },
        { name: "PowerBI", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "Junior Analysts", desc: "Build foundational data processing skills.", benefits: ["SQL Queries", "Excel Analytics", "Basic Dashboards"], quote: "I want to start extracting insights.", image: "careerPath0" },
        { exp: "2–6 Years", title: "BI Developers", desc: "Create interactive business intelligence dashboards.", benefits: ["Advanced PowerBI", "Data Warehousing", "Python Automation"], quote: "I need to build enterprise dashboards.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Analytics Managers", desc: "Lead data-driven business strategy.", benefits: ["Data Strategy", "A/B Testing", "Leading Teams"], quote: "I focus on driving business value through data.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "SQL & Excel", focusLabel: "CURRICULUM", focus: ["Advanced Excel", "Relational Databases", "Complex SQL Queries", "Data Cleaning"], application: "Sales Database Analysis" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Python for Data", focusLabel: "CURRICULUM", focus: ["Python Basics", "Pandas & NumPy", "Matplotlib/Seaborn", "Web Scraping"], application: "Automated Data Reports" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Business Intelligence", focusLabel: "CURRICULUM", focus: ["PowerBI Dashboards", "Tableau Visualizations", "Storytelling with Data", "DAX Formulas"], application: "Executive BI Dashboard" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Capstone & Placement", focusLabel: "CURRICULUM", focus: ["Capstone Project", "A/B Testing Basics", "Interview Prep", "Portfolio Setup"], application: "Comprehensive Data Capstone" }
      ],
      capstoneProjects: [
        { icon: "BarChart3", title: "E-Commerce Dashboard", desc: "Build an interactive PowerBI dashboard analyzing sales trends.", tools: ["PowerBI", "SQL", "Excel"] },
        { icon: "LineChart", title: "Customer Churn Analysis", desc: "Use Python to clean data and analyze customer retention.", tools: ["Python", "Pandas", "Tableau"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "16 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  },
  {
    id: 'EmbeddedSystems',
    route: 'EmbeddedSystems',
    componentName: 'EmbeddedSystems',
    data: {
      heroTitle: "Embedded Systems",
      heroSubtitle: "Design firmware and micro-controller architectures in this intensive 19-week program.",
      toolsSubtitle: "Master the modern Embedded stack",
      trackSubtitle: "A dedicated Embedded track for every stage of your career.",
      trackButtonLabel: "Start Your Embedded Career →",
      projectLabel: "Hardware Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "19 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "Prototypes", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "Firmware", label: "Core Focus" },
      ],
      toolsList: [
        { name: "C", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
        { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "Firmware Engineers", desc: "Write low-level microcontroller code.", benefits: ["C Programming", "Interrupts", "Peripheral Interfacing"], quote: "I want to write bare-metal code.", image: "careerPath0" },
        { exp: "2–6 Years", title: "Embedded Systems Engineers", desc: "Develop complex RTOS applications.", benefits: ["RTOS (FreeRTOS)", "Embedded Linux", "IoT Protocols"], quote: "I need to build concurrent embedded systems.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Systems Architects", desc: "Design full embedded device architectures.", benefits: ["Hardware Architecture", "System Optimization", "Security"], quote: "I focus on complete hardware/software co-design.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–5", title: "C & Microcontrollers", focusLabel: "CURRICULUM", focus: ["Advanced C", "Memory Management", "ARM Cortex-M Basics", "GPIO & Interrupts"], application: "Custom Bare-Metal Driver" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 6–10", title: "Protocols & Peripherals", focusLabel: "CURRICULUM", focus: ["I2C, SPI, UART", "ADC/DAC", "Timers & PWM", "Sensor Interfacing"], application: "Multi-Sensor Data Logger" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 11–15", title: "RTOS & Embedded Linux", focusLabel: "CURRICULUM", focus: ["FreeRTOS Fundamentals", "Task Scheduling", "Mutexes & Semaphores", "Embedded Linux Basics"], application: "RTOS Multitasking App" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 16–19", title: "Capstone & Placement", focusLabel: "CURRICULUM", focus: ["System Integration", "Capstone Project", "Debugging (JTAG/SWD)", "Interview Prep"], application: "Complete Embedded Device" }
      ],
      capstoneProjects: [
        { icon: "Cpu", title: "Smart Thermostat Controller", desc: "Develop firmware for a thermostat using FreeRTOS.", tools: ["C", "FreeRTOS", "ARM"] },
        { icon: "Layers", title: "Embedded Linux Dashboard", desc: "Deploy a Qt application on a custom Yocto Linux image.", tools: ["Linux", "Yocto", "C++"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "19 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  },
  {
    id: 'AutoCAD',
    route: 'AutoCAD',
    componentName: 'AutoCAD',
    data: {
      heroTitle: "AutoCAD & Design",
      heroSubtitle: "Draft and model 2D/3D designs for engineering applications in this 22-week program.",
      toolsSubtitle: "Master the modern Drafting stack",
      trackSubtitle: "A dedicated Design track for every stage of your career.",
      trackButtonLabel: "Start Your Design Career →",
      projectLabel: "Design Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "22 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "Blueprints", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "Drafting", label: "Core Focus" },
      ],
      toolsList: [
        { name: "AutoCAD", img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/AutoCAD_logo.svg" },
        { name: "SolidWorks", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/SolidWorks_Logo.svg", invert: true }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "Junior Drafters", desc: "Create precise 2D technical drawings.", benefits: ["2D Drafting", "Dimensioning", "Basic Modeling"], quote: "I want to start creating professional blueprints.", image: "careerPath0" },
        { exp: "2–6 Years", title: "CAD Designers", desc: "Develop complex 3D models.", benefits: ["3D Modeling", "Assembly Design", "Rendering"], quote: "I need to master 3D engineering design.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Design Leads", desc: "Manage large-scale design projects.", benefits: ["Project Management", "BIM Integration", "Team Lead"], quote: "I focus on architectural or mechanical design management.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–5", title: "2D Drafting Basics", focusLabel: "CURRICULUM", focus: ["AutoCAD Interface", "Drawing Tools", "Layers & Properties", "Dimensioning"], application: "Floor Plan Blueprint" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 6–11", title: "Advanced 2D & Isometric", focusLabel: "CURRICULUM", focus: ["Blocks & Attributes", "Isometric Drawing", "Layouts & Plotting", "Parametric Design"], application: "Mechanical Assembly 2D" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 12–17", title: "3D Modeling", focusLabel: "CURRICULUM", focus: ["3D Workspace", "Solid Modeling", "Surface Modeling", "Rendering Basics"], application: "3D Product Prototype" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 18–22", title: "Capstone & Career", focusLabel: "CURRICULUM", focus: ["Capstone Project", "Industry Standards", "Portfolio Review", "Placement Prep"], application: "Complete Design Portfolio" }
      ],
      capstoneProjects: [
        { icon: "Layers", title: "Residential Floor Plan", desc: "Draft a complete 2D architectural blueprint for a house.", tools: ["AutoCAD 2D"] },
        { icon: "Target", title: "Mechanical Engine Block", desc: "Model a complex 3D engine component.", tools: ["AutoCAD 3D", "SolidWorks"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "22 weeks (100% online)." },
        { q: "Is placement assistance provided?", a: "Yes, we provide 100% placement support." }
      ]
    }
  },
  {
    id: 'GraphicDesign',
    route: 'GraphicDesign',
    componentName: 'GraphicDesign',
    data: {
      heroTitle: "Graphic Design",
      heroSubtitle: "Create stunning visuals, branding, and digital media assets in this creative 23-week program.",
      toolsSubtitle: "Master the modern Creative stack",
      trackSubtitle: "A dedicated Creative track for every stage of your career.",
      trackButtonLabel: "Start Your Creative Career →",
      projectLabel: "Design Project",
      careerOutcomesDomain: "DigitalMarketing",
      trustStats: [
        { value: "23 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "Portfolio", label: "Hands-on Practice" },
        { value: "1 Capstone", label: "Real Projects" },
        { value: "Design", label: "Core Focus" },
      ],
      toolsList: [
        { name: "Photoshop", img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
        { name: "Illustrator", img: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
        { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
        { name: "Premiere", img: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" }
      ],
      careerPaths: [
        { exp: "0–2 Years", title: "Junior Designers", desc: "Create engaging social media assets.", benefits: ["Typography", "Color Theory", "Photo Editing"], quote: "I want to create beautiful graphics.", image: "careerPath0" },
        { exp: "2–6 Years", title: "UI/Visual Designers", desc: "Design brands and interfaces.", benefits: ["Brand Identity", "Web Design (Figma)", "Vector Illustration"], quote: "I need to design complete brand identities.", image: "careerPath1" },
        { exp: "6–10+ Years", title: "Art Directors", desc: "Lead creative campaigns.", benefits: ["Creative Strategy", "Campaign Management", "Mentorship"], quote: "I focus on creative direction and strategy.", image: "careerPath2" }
      ],
      phases: [
        { id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–6", title: "Design Fundamentals", focusLabel: "CURRICULUM", focus: ["Color Theory & Typography", "Layout & Composition", "Photoshop Basics", "Image Retouching"], application: "Poster Design" },
        { id: "phase-2", phase: "PHASE 2", duration: "WEEKS 7–12", title: "Vector & Branding", focusLabel: "CURRICULUM", focus: ["Illustrator Tools", "Logo Design", "Brand Guidelines", "Print Design"], application: "Complete Brand Identity" },
        { id: "phase-3", phase: "PHASE 3", duration: "WEEKS 13–18", title: "UI/UX & Digital Media", focusLabel: "CURRICULUM", focus: ["Figma Basics", "Web Layouts", "Social Media Kits", "Basic Animation"], application: "Website Mockup" },
        { id: "phase-4", phase: "PHASE 4", duration: "WEEKS 19–23", title: "Portfolio & Capstone", focusLabel: "CURRICULUM", focus: ["Capstone Project", "Behance Portfolio", "Freelance Basics", "Interview Prep"], application: "Professional Design Portfolio" }
      ],
      capstoneProjects: [
        { icon: "Layers", title: "Corporate Rebranding", desc: "Complete visual identity redesign for a local business.", tools: ["Illustrator", "Photoshop"] },
        { icon: "MonitorPlay", title: "App UI Prototype", desc: "Design an interactive mobile app prototype.", tools: ["Figma"] }
      ],
      faqData: [
        { q: "What is the duration?", a: "23 weeks (100% online)." },
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

  // Inject image references back in
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

console.log('Finished generating second batch of courses!');
