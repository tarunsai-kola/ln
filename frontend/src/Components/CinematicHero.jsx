import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaBriefcase, FaGraduationCap, FaCheckCircle, FaLaptopCode, FaComments, FaAward } from "react-icons/fa";
import { AnimatedCounter } from "./AnimationKit";

const CinematicHero = () => {
  // Motion variants for staged entry of text/buttons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  // Helper for dashboard cards to combine entry animation with continuous floating
  const floatingCard = (delay, floatDuration, yRange) => ({
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: yRange,
      transition: {
        opacity: { duration: 0.8, delay, ease: "easeOut" },
        scale: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
        y: { 
          duration: floatDuration, 
          delay: delay + 0.8, 
          repeat: Infinity, 
          repeatType: "mirror", 
          ease: "easeInOut" 
        }
      }
    }
  });

  // Dynamic Data for Live Cards
  const mentors = [
    { name: "Rahul K.", role: "Senior SDE Mentor", quote: `"The system design curriculum here is exactly what we test for in MAANG interviews."`, initial: "R", color: "rgba(255,255,255,0.06)", textColor: "#A1A1AA" },
    { name: "Ananya S.", role: "Data Science Lead", quote: `"We built this program to bridge the gap between academic theory and production-grade ML."`, initial: "A", color: "rgba(255,255,255,0.06)", textColor: "#A1A1AA" },
    { name: "Vikram D.", role: "Product Designer", quote: `"Our students learn to think like product owners, delivering end-to-end user experiences."`, initial: "V", color: "rgba(255,255,255,0.06)", textColor: "#A1A1AA" },
    { name: "Aditya V.", role: "Lead Engineer", quote: `"I'll guide you to build production-ready applications and scale your career."`, initial: "A", color: "rgba(255,255,255,0.06)", textColor: "#A1A1AA" }
  ];

  const students = [
    { name: "Arjun", company: "Infosys" },
    { name: "Neha", company: "TCS Digital" },
    { name: "Siddharth", company: "Accenture" },
    { name: "Kavya", company: "Amazon" }
  ];

  const [mentorIdx, setMentorIdx] = useState(0);
  const [studentIdx, setStudentIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePos({ x: clientX - left, y: clientY - top });
  };

  useEffect(() => {
    const mentorInterval = setInterval(() => {
      setMentorIdx((prev) => (prev + 1) % mentors.length);
    }, 6000); // Change mentor every 6 seconds

    const studentInterval = setInterval(() => {
      setStudentIdx((prev) => (prev + 1) % students.length);
    }, 4500); // Change student every 4.5 seconds

    return () => {
      clearInterval(mentorInterval);
      clearInterval(studentInterval);
    };
  }, []);

  return (
    <section 
      className="cine-hero-chapter" 
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      {/* Layer 1: Atmosphere */}
      <div className="cine-hero-bg"></div>
      <div className="cine-hero-grid"></div>
      <div className="cine-hero-grid-interactive"></div>
      
      <div className="cine-container cine-hero-content">
        
        {/* Layer 2: Message Layer (Left) */}
        <motion.div 
          className="cine-hero-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants} className="cine-eyebrow" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", background: "#FF8803", borderRadius: "50%", boxShadow: "0 0 8px rgba(255,136,3,0.5)", flexShrink: 0 }}></span>
            The Flagship Career Platform
          </motion.span>
          
          <motion.h1 variants={itemVariants} className="cine-hero-headline">
            <span className="block-line">Where ambitious</span>
            <span className="block-line">students become</span>
            <span className="block-line">hireable tech</span>
            <span className="block-line">professionals.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="cine-subtext" style={{ fontSize: "20px" }}>
            Don't just take courses. Accelerate your career with industry-led programs, 1:1 expert mentorship, and a proven pipeline to 500+ top tech companies.
          </motion.p>
          
          <motion.div variants={itemVariants} className="cine-hero-actions">
            <Link to="/Advance" className="cine-btn-primary">
              Accelerate Your Career <FaArrowRight />
            </Link>
            <Link to="/ContactUs" className="cine-btn-secondary">
              View Placements
            </Link>
          </motion.div>
          
          {/* Trust Strip */}
          <motion.div variants={itemVariants} style={{ display: "flex", gap: "24px", marginTop: "40px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {["👨‍💻", "👩‍💼", "👨‍🔬", "👩‍💻"].map((e, i) => (
                <div key={i} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--cine-surface)", border: "2px solid var(--cine-midnight)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i > 0 ? "-12px" : "0", zIndex: 10 - i }}>
                  {e}
                </div>
              ))}
            </div>
            <div style={{ fontSize: "14px", color: "var(--cine-slate)", lineHeight: 1.4 }}>
              Join <strong>10,000+</strong> students building <br/>their future at Accenlearn.
            </div>
          </motion.div>
        </motion.div>
        
        {/* Layer 3: Proof Dashboard (Right) - 8 Layered Cards */}
        <div className="cine-hero-dashboard">
          
          {/* 1. Main Stat Panel */}
          <motion.div 
            className="cine-dash-panel card-hero"
            {...floatingCard(0.5, 6, [0, -15, 0])}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <span className="dash-label-sm">Placement Outcomes</span>
            <div style={{ fontSize: "56px", fontWeight: "800", color: "var(--cine-white)", lineHeight: 1, marginBottom: "8px" }}>
              <AnimatedCounter target="240" suffix="%" duration={2000} />
            </div>
            <div style={{ fontSize: "15px", color: "var(--cine-slate)", marginBottom: "24px" }}>Average Salary Hike in 2024</div>
            
            <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden", marginTop: "16px" }}>
              <motion.div 
                style={{ width: "100%", height: "100%", background: "#1462EE" }}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* 2. Mentor Authority Panel (DYNAMIC) */}
          <motion.div 
            className="cine-dash-panel card-testimonial"
            {...floatingCard(0.7, 7, [0, 15, 0])}
            whileHover={{ y: 5, transition: { duration: 0.2 } }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mentorIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: mentors[mentorIdx].color, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: mentors[mentorIdx].textColor, fontWeight: "700" }}>
                    {mentors[mentorIdx].initial}
                  </div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "white" }}>{mentors[mentorIdx].name}</div>
                    <div style={{ fontSize: "13px", color: "var(--cine-slate)" }}>{mentors[mentorIdx].role}</div>
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "8px", fontSize: "12px", color: "var(--cine-text-light)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  {mentors[mentorIdx].quote}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 3. Companies Panel */}
          <motion.div 
            className="cine-dash-panel card-stat"
            {...floatingCard(0.9, 5, [0, -10, 0])}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <FaBriefcase style={{ fontSize: "22px", color: "rgba(255,255,255,0.6)", marginBottom: "12px" }} />
            <div style={{ fontSize: "28px", fontWeight: "800", color: "white" }}>500+</div>
            <div style={{ fontSize: "14px", color: "var(--cine-slate)" }}>Hiring Partners</div>
          </motion.div>

          {/* 4. Student Success Signal (DYNAMIC) */}
          <motion.div 
            className="cine-dash-panel card-placement"
            {...floatingCard(1.1, 6.5, [0, 12, 0])}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={studentIdx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(20, 98, 238, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(20, 98, 238, 0.25)", flexShrink: 0 }}>
                  <FaGraduationCap style={{ color: "#1462EE", fontSize: "16px" }} />
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--cine-slate)", marginBottom: "2px" }}>Recently Placed</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "white", lineHeight: 1.2 }}>{students[studentIdx].name} joined {students[studentIdx].company}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 5. Support Badge (95% Placement) */}
          <motion.div 
            className="cine-dash-panel card-pill-a"
            {...floatingCard(0.6, 5.5, [0, -8, 0])}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FaCheckCircle style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px" }} />
              <div style={{ fontSize: "14px", fontWeight: "600", color: "white", lineHeight: 1.2 }}>
                95% Placement<br/>Support
              </div>
            </div>
          </motion.div>

          {/* 6. Live Projects */}
          <motion.div 
            className="cine-dash-panel card-pill-b"
            {...floatingCard(1.0, 7.5, [0, 10, 0])}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ padding: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <FaLaptopCode style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }} />
              </div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "white" }}>
                Live Projects + Internship
              </div>
            </div>
          </motion.div>

          {/* 7. Curriculum Badge */}
          <motion.div 
            className="cine-dash-panel card-pill-c"
            {...floatingCard(0.8, 8, [0, -12, 0])}
            whileHover={{ scale: 1.05, opacity: 1, transition: { duration: 0.2 } }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
              <FaAward style={{ color: "var(--cine-slate)", fontSize: "18px" }} />
              <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--cine-slate)" }}>
                Industry-Ready Curriculum
              </div>
            </div>
          </motion.div>

          {/* 8. Mock Interviews */}
          <motion.div 
            className="cine-dash-panel card-pill-d"
            {...floatingCard(1.2, 5, [0, 8, 0])}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FaComments style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", flexShrink: 0 }} />
              <div style={{ fontSize: "13px", fontWeight: "600", color: "white", lineHeight: 1.3 }}>
                Mock Interviews +<br/>Resume Review
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
