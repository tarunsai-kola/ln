/**
 * Reusable Framer Motion animation components for Accenlearn landing page.
 * Provides scroll-triggered reveals, staggered children, and hover effects.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── FadeUp on scroll ─── */
export function FadeUp({ children, delay = 0, distance = 28, duration = 0.65, once = true, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container for child animations ─── */
export function StaggerGroup({ children, stagger = 0.1, delayChildren = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren } } }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Child item for stagger groups ─── */
export function StaggerItem({ children, style = {}, className = "", distance = 24 }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: distance, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scale in on scroll ─── */
export function ScaleIn({ children, delay = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Slide from left ─── */
export function SlideLeft({ children, delay = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Slide from right ─── */
export function SlideRight({ children, delay = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Number Counter ─── */
import { useState, useEffect } from "react";

export function AnimatedCounter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    const numTarget = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    const finalSuffix = suffix || String(target).replace(/[0-9.]/g, "");
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget) + finalSuffix);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(numTarget + finalSuffix);
    };
    requestAnimationFrame(animate);
  }, [inView]);

  return <span ref={ref}>{count}</span>;
}

/* ─── Hover Card with lift ─── */
export function HoverCard({ children, style = {}, className = "" }) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(30,144,255,0.15)', borderColor: 'rgba(30,144,255,0.45)', transition: { duration: 0.25 } }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
