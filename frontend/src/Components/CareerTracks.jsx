import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaDatabase, FaRobot, FaPaintBrush, FaArrowRight, FaCheckCircle, FaClock, FaSuitcase, FaShieldAlt, FaChartLine } from "react-icons/fa";

const tracks = [
  {
    id: "ds-genai",
    title: "Data Science & Generative AI",
    icon: <FaRobot />,
    desc: "Master predictive modeling, deep learning, and architect LLM-powered applications. Become a dual-threat in traditional data science and modern GenAI.",
    duration: "6 Months",
    role: "AI / Data Scientist",
    outcomes: [
      "Predictive modeling & machine learning",
      "Build custom GPTs & RAG pipelines",
      "Deploy AI models to production",
      "Advanced Python & PyTorch"
    ],
    link: "/Advance"
  },
  {
    id: "da-ai",
    title: "Data Analytics & AI",
    icon: <FaDatabase />,
    desc: "Combine traditional business intelligence with AI-driven analytics. Extract actionable insights and automate reporting using modern data tools.",
    duration: "5 Months",
    role: "Data Analyst / BI Developer",
    outcomes: [
      "Advanced SQL & Python",
      "Tableau & PowerBI Dashboards",
      "AI-assisted data analysis",
      "Real-world business capstones"
    ],
    link: "/Advance"
  },
  {
    id: "ai-fsd",
    title: "AI-Powered Full Stack Development",
    icon: <FaLaptopCode />,
    desc: "Build secure, scalable MERN stack applications augmented with AI integrations. Learn to code faster with AI assistants and build intelligent features.",
    duration: "6 Months",
    role: "Full Stack Engineer",
    outcomes: [
      "React, Node.js, MongoDB",
      "Integrate OpenAI & LLM APIs",
      "System Design & Cloud Deployment",
      "Production-grade web apps"
    ],
    link: "/Advance"
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: <FaShieldAlt />,
    desc: "Defend against modern digital threats. Learn ethical hacking, network security, and secure architecture for enterprise systems.",
    duration: "5 Months",
    role: "Security Analyst",
    outcomes: [
      "Vulnerability assessment & Pen-testing",
      "Network & Cloud Security",
      "Incident response protocols",
      "Security compliance & frameworks"
    ],
    link: "/Advance"
  },
  {
    id: "dm-ai",
    title: "Digital Marketing & AI",
    icon: <FaChartLine />,
    desc: "Execute high-ROI campaigns using AI-generated content and predictive analytics. Master SEO, performance marketing, and conversion optimization.",
    duration: "4 Months",
    role: "Growth Marketer",
    outcomes: [
      "Meta Ads & Google Ads mastery",
      "AI-driven content generation",
      "Advanced SEO & Analytics",
      "Conversion Rate Optimization"
    ],
    link: "/Advance"
  }
];

const CareerTracks = () => {
  const [activeTrack, setActiveTrack] = useState(tracks[0]);

  return (
    <section className="cine-programs-chapter">
      <div className="cine-container">
        <motion.span 
          className="cine-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Career Tracks
        </motion.span>
        
        <motion.h2 
          className="cine-h2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Choose your <span className="cine-text-electric">transformation.</span>
        </motion.h2>

        <div className="cine-programs-layout">
          <div className="cine-program-tabs">
            {tracks.map((track) => (
              <button 
                key={track.id}
                className={`cine-program-tab ${activeTrack.id === track.id ? 'active' : ''}`}
                onClick={() => setActiveTrack(track)}
              >
                {track.title}
              </button>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTrack.id}
                className="cine-program-content-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="cine-program-meta">
                  <div className="cine-meta-item">
                    <FaClock /> {activeTrack.duration}
                  </div>
                  <div className="cine-meta-item">
                    <FaSuitcase /> {activeTrack.role}
                  </div>
                </div>

                <h3 className="cine-program-title">{activeTrack.title}</h3>
                <p className="cine-program-desc">{activeTrack.desc}</p>

                <div className="cine-program-outcomes">
                  {activeTrack.outcomes.map((outcome, idx) => (
                    <div key={idx} className="cine-outcome-item">
                      <FaCheckCircle className="cine-outcome-icon" />
                      <span className="cine-outcome-text">{outcome}</span>
                    </div>
                  ))}
                </div>

                <Link to={activeTrack.link} className="cine-btn-primary" style={{ display: "inline-flex" }}>
                  View Program Curriculum <FaArrowRight />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTracks;
