import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "Accenlearn didn't just teach me to code; they taught me how to be an engineer. The curriculum is exactly what hiring managers at product companies look for. I got multiple offers before the program even ended.",
    author: "Rohan S.",
    role: "SDE at TCS Digital",
    initial: "R"
  },
  {
    id: 2,
    quote: "The mentorship is unmatched. My mentor was a Senior Engineer at Microsoft and he completely overhauled the way I approach System Design. Worth every penny and more.",
    author: "Priya M.",
    role: "Backend Developer at Razorpay",
    initial: "P"
  },
  {
    id: 3,
    quote: "Transitioning from a non-CS background was terrifying, but the structured path and 1:1 support gave me confidence. Six months later, I'm working my dream job as a Data Analyst.",
    author: "Karan D.",
    role: "Data Analyst at Fractal",
    initial: "K"
  }
];

const PremiumTestimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="cine-trust-chapter">
      <div className="cine-container">
        <div className="cine-trust-grid">
          
          <div className="cine-trust-content">
            <motion.span 
              className="cine-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Proven Outcomes
            </motion.span>
            
            <motion.h2 
              className="cine-h2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Don't just take <br/>our word for it.
            </motion.h2>
            
            <motion.p 
              className="cine-subtext"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Over 10,000 students have accelerated their careers with Accenlearn. 
              Our alumni network spans the globe's most innovative companies. 
              When you join, you're not just buying a course — you're securing a network.
            </motion.p>
            
            <motion.div 
              style={{ display: "flex", gap: "8px", marginTop: "40px" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setIndex(i)}
                  style={{
                    width: i === index ? "32px" : "12px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === index ? "var(--cine-electric-glow)" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </motion.div>
          </div>

          <div className="cine-testimonial-slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="cine-testimonial-card"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="cine-quote-mark">"</div>
                <p className="cine-testimonial-text">
                  {testimonials[index].quote}
                </p>
                <div className="cine-testimonial-author">
                  <div className="cine-author-avatar">
                    {testimonials[index].initial}
                  </div>
                  <div className="cine-author-info">
                    <h4>{testimonials[index].author}</h4>
                    <p>{testimonials[index].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PremiumTestimonials;
