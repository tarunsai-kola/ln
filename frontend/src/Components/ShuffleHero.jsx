import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import heroImage from '../../Accenlearn/images/publicspeech2.jpg';

/* ─── Counter Hook ─── */
function useCounter(numStr, duration = 2200) {
  const [count, setCount] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        const num = parseFloat(numStr.replace(/[^0-9.]/g, ""));
        const sfx = numStr.replace(/[0-9.]/g, "");
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * num) + sfx);
          if (p < 1) requestAnimationFrame(tick);
          else setCount(numStr);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  return { count, ref };
}

/* ─── Animated stat pill ─── */
function HeroPill({ num, label, delay }) {
  const { count, ref } = useCounter(num);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: "rgba(30,144,255,0.55)", background: "rgba(30,144,255,0.09)" }}
      style={{
        flex: 1,
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(30,144,255,0.18)",
        borderRadius: "16px",
        padding: "18px 12px",
        textAlign: "center",
        backdropFilter: "blur(8px)",
        transition: "border-color 0.2s, background 0.2s",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 800, color: "#1E90FF", lineHeight: 1, letterSpacing: "-0.02em" }}>
        {count}
      </div>
      <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.38)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "6px" }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Floating UI Card ─── */
function FloatCard({ children, style, delay = 0.9, floatDist = 10 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        background: "rgba(10,24,50,0.88)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(30,144,255,0.25)",
        borderRadius: "16px",
        boxShadow: "0 24px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        ...style,
      }}
    >
      <motion.div
        animate={{ y: [0, -floatDist, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const ShuffleHero = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    controls.start("visible");
  }, []);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
  };

  const line = {
    hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const upIn = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0B1E3A",
        position: "relative",
        overflow: "hidden",
        padding: "92px 24px 120px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Fine dot grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(30,144,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Corner vignette fade */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(11,30,58,0) 0%, #0B1E3A 100%)",
      }} />

      {/* Drifting ambient orb — electric blue */}
      <motion.div
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-15%", left: "28%",
          width: "720px", height: "560px",
          background: "radial-gradient(circle, rgba(30,144,255,0.10) 0%, transparent 65%)",
          zIndex: 0, pointerEvents: "none", borderRadius: "50%",
        }}
      />

      {/* Second subtler orb */}
      <motion.div
        animate={{ x: [0, -40, 20, 0], y: [0, -30, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute", bottom: "10%", right: "5%",
          width: "500px", height: "400px",
          background: "radial-gradient(circle, rgba(77,163,255,0.07) 0%, transparent 65%)",
          zIndex: 0, pointerEvents: "none", borderRadius: "50%",
        }}
      />

      {/* ─── Main Grid ─── */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "1240px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1.08fr 0.92fr",
        gap: "64px", alignItems: "center",
      }} className="atx-hero-wrap">

        {/* LEFT: Copy */}
        <div>
          {/* Kicker badge */}
          <motion.div {...upIn(0)} style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(30,144,255,0.08)", border: "1px solid rgba(30,144,255,0.28)",
            borderRadius: "100px", padding: "6px 16px 6px 8px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.13em",
            textTransform: "uppercase", color: "#4DA3FF", marginBottom: "32px",
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: "rgba(30,144,255,0.18)", borderRadius: "100px",
              padding: "3px 10px", fontSize: "10px",
            }}>
              <motion.span
                style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1E90FF", display: "inline-block" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              Live
            </span>
            India's Premier Tech Career Platform
          </motion.div>

          {/* Headline — line-by-line stagger */}
          <motion.div variants={stagger} initial="hidden" animate={controls} style={{ marginBottom: "24px" }}>
            {[
              { text: "Accelerate Your", color: "#fff", weight: 700 },
              { text: "Tech Career.", color: "#fff", weight: 800 },
              { text: "Get Hired.", color: "#1E90FF", weight: 800 },
            ].map((line_item, i) => (
              <motion.div
                key={i}
                variants={line}
                style={{
                  display: "block",
                  fontSize: "clamp(40px, 5.8vw, 72px)",
                  fontWeight: line_item.weight,
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  color: line_item.color,
                }}
              >
                {line_item.text}
              </motion.div>
            ))}
          </motion.div>

          {/* Subheadline */}
          <motion.p {...upIn(0.6)} style={{
            fontSize: "clamp(15px,1.6vw,17px)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.52)",
            maxWidth: "500px",
            margin: "0 0 40px",
          }}>
            Industry-aligned programs in Full Stack, Data Science, AI & more.
            Real projects, expert mentors, and placement support from day one.
          </motion.p>

          {/* CTA Row */}
          <motion.div {...upIn(0.72)} style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "56px" }}>
            <motion.div whileHover={{ scale: 1.04, boxShadow: "0 20px 52px rgba(30,144,255,0.48)" }} whileTap={{ scale: 0.96 }}>
              <Link to="/Advance" style={{
                display: "inline-flex", alignItems: "center", gap: "9px",
                background: "#1E90FF", color: "#fff", fontWeight: 700,
                fontSize: "14px", padding: "15px 30px", borderRadius: "12px",
                textDecoration: "none", letterSpacing: "0.015em",
                boxShadow: "0 8px 32px rgba(30,144,255,0.35)",
                position: "relative", overflow: "hidden",
              }}>
                Explore Programs
                <motion.svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ borderColor: "rgba(30,144,255,0.6)", background: "rgba(30,144,255,0.06)", color: "#4DA3FF" }}
              style={{
                display: "inline-flex", alignItems: "center",
                border: "1px solid rgba(255,255,255,0.18)", borderRadius: "12px",
                transition: "all 0.2s",
              }}
            >
              <Link to="/Mentorship" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: "rgba(255,255,255,0.78)", fontWeight: 600,
                fontSize: "14px", padding: "14px 26px",
                textDecoration: "none", borderRadius: "12px",
              }}>
                View Mentorship
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div {...upIn(0.85)} style={{ display: "flex", gap: "10px", maxWidth: "460px" }}>
            <HeroPill num="10,000+" label="Students" delay={0.9} />
            <HeroPill num="170+" label="Mentors" delay={1.0} />
            <HeroPill num="500+" label="Hiring Co." delay={1.1} />
            <HeroPill num="95%" label="Placement" delay={1.2} />
          </motion.div>
        </div>

        {/* RIGHT: Visual composition */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", paddingBottom: "30px", paddingLeft: "16px" }}
          className="atx-hero-image-wrap"
        >
          {/* Ambient glow behind image */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: "-24px",
              background: "radial-gradient(circle at 45% 45%, rgba(30,144,255,0.18) 0%, transparent 60%)",
              borderRadius: "50%", pointerEvents: "none",
            }}
          />

          {/* Main image frame */}
          <div style={{
            position: "relative",
            borderRadius: "24px",
            border: "1px solid rgba(30,144,255,0.2)",
            padding: "5px",
            background: "rgba(16,42,76,0.4)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
            <motion.img
              src={heroImage}
              alt="Students in a tech mentoring session at Accenlearn"
              style={{ width: "100%", height: "440px", objectFit: "cover", borderRadius: "20px", display: "block" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.55 }}
            />
            {/* Gradient overlay on image bottom */}
            <div style={{
              position: "absolute", bottom: 5, left: 5, right: 5, height: "40%",
              borderRadius: "0 0 20px 20px",
              background: "linear-gradient(to top, rgba(11,30,58,0.65) 0%, transparent 100%)",
              pointerEvents: "none",
            }} />

            {/* Live dot badge inside image */}
            <div style={{
              position: "absolute", top: "18px", left: "18px",
              background: "rgba(11,30,58,0.82)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(30,144,255,0.22)", borderRadius: "100px",
              padding: "6px 12px 6px 8px",
              display: "flex", alignItems: "center", gap: "7px",
              fontSize: "11px", fontWeight: 700, color: "#4DA3FF",
            }}>
              <motion.span
                style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px rgba(34,197,94,0.7)" }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              Live Mentoring
            </div>
          </div>

          {/* Float card: Placement stat */}
          <FloatCard style={{ bottom: "-10px", left: "-24px", padding: "16px 20px", minWidth: "200px" }} delay={1.0} floatDist={9}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "rgba(30,144,255,0.15)", border: "1px solid rgba(30,144,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E90FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>95%</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "3px" }}>Placement Rate</div>
              </div>
            </div>
          </FloatCard>

          {/* Float card: Outcome chip */}
          <FloatCard style={{ top: "-14px", right: "-10px", padding: "14px 18px" }} delay={1.15} floatDist={7}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Full Stack Dev", "Data Science", "AI & ML"].map((t, i) => (
                <div key={t} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  fontSize: "11px", fontWeight: 600, color: i === 0 ? "#4DA3FF" : "rgba(255,255,255,0.55)",
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
                    background: i === 0 ? "#1E90FF" : "rgba(255,255,255,0.2)",
                  }} />
                  {t}
                </div>
              ))}
            </div>
          </FloatCard>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @media (max-width: 960px) {
          .atx-hero-wrap { grid-template-columns: 1fr !important; gap: 48px !important; }
          .atx-hero-image-wrap { order: -1; padding-left: 0 !important; padding-bottom: 40px !important; }
          .atx-hero-image-wrap img { height: 300px !important; }
        }
        @media (max-width: 520px) {
          section[style] { padding: 64px 16px 80px !important; }
        }
      `}</style>
    </section>
  );
};

export default ShuffleHero;
