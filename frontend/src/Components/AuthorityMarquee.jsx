import React from "react";
import { motion } from "framer-motion";
import ClientsCarousel from "./our_alumni2";

const AuthorityMarquee = ({ theme = "light" }) => {
  const isDark = theme === "dark";

  return (
    <section className={isDark ? "py-6 md:py-12 w-full" : "cine-proof-chapter"}>
      <div className={isDark ? "max-w-6xl mx-auto px-6" : "cine-container"} style={{ textAlign: "center", marginBottom: "40px" }}>
        <motion.span 
          className={isDark ? "inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5" : "cine-eyebrow"}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Industry Network
        </motion.span>
        
        <motion.h2 
          className={isDark ? "text-3xl md:text-[44px] font-black font-outfit text-white tracking-tight mb-4" : "cine-h2"}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          500+ companies hire our graduates
        </motion.h2>
        
        <motion.p 
          className={isDark ? "text-textMuted text-lg max-w-2xl" : "cine-subtext"}
          style={{ margin: "0 auto" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          From high-growth startups to Fortune 500 giants, Accenlearn alumni are trusted across every tier of the tech industry.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <ClientsCarousel isDark={isDark} />
      </motion.div>
    </section>
  );
};

export default React.memo(AuthorityMarquee);
