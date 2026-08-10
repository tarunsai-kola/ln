import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const FullStackWeb = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "Full Stack Web Development (MERN)",
  "heroSubtitle": "Build highly scalable, interactive web applications from frontend to backend using React, Node.js, and MongoDB in this 24-week bootcamp.",
  "toolsSubtitle": "Master the modern MERN stack",
  "trackSubtitle": "A dedicated Software Engineering track tailored to your current experience level.",
  "trackButtonLabel": "Start Your Engineering Career →",
  "projectLabel": "Web App Project",
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
      "value": "15+ Projects",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "MERN Stack",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "React",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
    },
    {
      "name": "Node.js",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
    },
    {
      "name": "Express",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      "invert": true
    },
    {
      "name": "MongoDB",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
    },
    {
      "name": "JavaScript",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
    },
    {
      "name": "TypeScript",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
    },
    {
      "name": "Next.js",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      "invert": true
    },
    {
      "name": "Tailwind",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Frontend Developers & Junior Engineers",
      "desc": "Master HTML, CSS, JavaScript, and React to build pixel-perfect user interfaces.",
      "benefits": [
        "Build responsive layouts using modern CSS and Tailwind",
        "Master JavaScript DOM manipulation and ES6+ syntax",
        "Develop interactive Single Page Applications (SPAs) using React"
      ],
      "quote": "I want to build beautiful interfaces and break into the tech industry.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Full Stack Developers",
      "desc": "Transition into end-to-end development, handling both React frontends and Node.js backends.",
      "benefits": [
        "Design secure RESTful APIs using Node.js and Express",
        "Model and query complex data structures using MongoDB and Mongoose",
        "Implement secure JWT authentication and role-based access control"
      ],
      "quote": "I want to be able to build and deploy entire applications by myself.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Technical Leads & Frontend Architects",
      "desc": "Design scalable system architectures and lead engineering teams.",
      "benefits": [
        "Master Server-Side Rendering (SSR) and SEO optimization with Next.js",
        "Design scalable microservices and robust database indexing strategies",
        "Lead code reviews, CI/CD deployment strategies, and system design"
      ],
      "quote": "My focus is on application performance, scalable system design, and leading teams.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Frontend Foundations",
      "focusLabel": "CURRICULUM",
      "focus": [
        "HTML5 Semantic Elements & CSS3 Flexbox/Grid",
        "Modern JavaScript (ES6+): Promises, Async/Await, Arrow Functions",
        "DOM Manipulation and Event Handling",
        "Responsive Design with Tailwind CSS"
      ],
      "application": "Building a Responsive E-Commerce Landing Page"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "React.js & State Management",
      "focusLabel": "CURRICULUM",
      "focus": [
        "React Architecture, JSX, and Component Lifecycle",
        "React Hooks (useState, useEffect, useMemo, custom hooks)",
        "Advanced State Management with Redux Toolkit or Zustand",
        "Client-side routing with React Router v6"
      ],
      "application": "Interactive Movie Database SPA with API Integration"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "Backend Development (Node & Express)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Node.js runtime, Event Loop, and File System",
        "Building RESTful APIs with Express.js",
        "Middleware, Error Handling, and Input Validation",
        "Authentication & Authorization with JWT and Bcrypt"
      ],
      "application": "Developing a Secure REST API for a Task Manager"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–16",
      "title": "Databases (MongoDB)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "NoSQL Database Concepts and MongoDB setup",
        "Object Data Modeling (ODM) with Mongoose",
        "Complex Queries, Aggregation Pipelines, and Indexing",
        "Connecting the Express API to MongoDB seamlessly"
      ],
      "application": "Integrating the Backend API with a Database"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 17–20",
      "title": "Next.js & Advanced React",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Introduction to Next.js App Router",
        "Server-Side Rendering (SSR) vs Static Site Generation (SSG)",
        "Data Fetching Strategies and SEO Optimization",
        "Introduction to TypeScript for React Applications"
      ],
      "application": "Building an SEO-Optimized Tech Blog with Next.js"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 21–24",
      "title": "Deployment & Capstone",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Deploying frontends on Vercel and backends on Render/Heroku",
        "Full MERN Integration (Connecting React to Express)",
        "WebSockets for Real-Time Communication (Socket.io)",
        "Technical Interview Prep, System Design basics, & Portfolio Polish"
      ],
      "application": "End-to-End MERN Stack Capstone Project Deployment"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "TerminalSquare",
      "title": "Full-Stack E-Commerce Platform",
      "desc": "Build a complete online store with product listings, a shopping cart, Stripe payment integration, and an admin dashboard.",
      "tools": [
        "React",
        "Node.js",
        "MongoDB",
        "Stripe"
      ]
    },
    {
      "icon": "MessageSquare",
      "title": "Real-Time Chat Application",
      "desc": "Develop a messaging app supporting private chats and group rooms using WebSockets for instantaneous communication.",
      "tools": [
        "Socket.io",
        "React",
        "Express"
      ]
    },
    {
      "icon": "CheckCircle2",
      "title": "Project Management Kanban Board",
      "desc": "Create a Trello clone with drag-and-drop functionality, secure user authentication, and real-time state updates.",
      "tools": [
        "React",
        "Redux",
        "Tailwind"
      ]
    },
    {
      "icon": "Layers",
      "title": "Next.js Tech Blog",
      "desc": "Build an SEO-friendly, server-side rendered blog platform with Markdown support and a custom CMS interface.",
      "tools": [
        "Next.js",
        "TypeScript",
        "Vercel"
      ]
    }
  ],
  "faqData": [
    {
      "q": "Is this program for beginners?",
      "a": "Yes. We start from absolute scratch with HTML and CSS in Week 1 before progressively moving into advanced JavaScript and React."
    },
    {
      "q": "Why the MERN stack?",
      "a": "MERN (MongoDB, Express, React, Node) uses JavaScript for both the frontend and backend, making it the most popular and efficient stack for modern web development."
    },
    {
      "q": "Will I learn TypeScript?",
      "a": "Yes, we introduce TypeScript in Phase 5 as it is rapidly becoming the industry standard for robust enterprise React applications."
    },
    {
      "q": "Do I need a powerful computer?",
      "a": "No. Any standard laptop (Windows, Mac, or Linux) made in the last 5-7 years is sufficient for Web Development."
    },
    {
      "q": "Will I build a portfolio?",
      "a": "Absolutely. You will build 15+ minor projects and 4 major capstones, all hosted live on GitHub and Vercel for employers to see."
    },
    {
      "q": "What is the average salary for a Full Stack Developer?",
      "a": "Junior developers typically start around 6-8 LPA in India, while experienced MERN stack developers can easily command 15-25+ LPA."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default FullStackWeb;
