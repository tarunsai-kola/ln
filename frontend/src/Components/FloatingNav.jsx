import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingNav = ({ onApplyClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { name: "Overview", id: "overview" },
    { name: "Career Paths", id: "paths" },
    { name: "Curriculum", id: "curriculum" },
    { name: "Projects", id: "projects" },
    { name: "Market Reality", id: "market" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero a bit (e.g., 300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      let currentActive = 'overview';
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // If the top of the section is near the top of the viewport
        if (rect.top <= 200) {
          currentActive = section.id;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // navItems is static inside component, empty array is fine

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 lg:bottom-10 left-1/2 z-[100] w-[95%] max-w-fit"
        >
          {/* Glassy Dark Pill Background */}
          <div className="flex items-center gap-1 md:gap-3 p-1.5 md:p-2 rounded-full bg-black/40 shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl mx-auto overflow-x-auto hide-scrollbar max-w-full">
            
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-full text-[13px] md:text-sm font-bold transition-all whitespace-nowrap ${
                  activeSection === item.id 
                    ? "text-black bg-white shadow-sm" 
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Premium CTA Pill */}
            <button
              onClick={onApplyClick}
              className="ml-1 md:ml-2 px-6 md:px-7 py-2 md:py-2.5 rounded-full text-[13px] md:text-sm font-black text-black bg-white hover:bg-gray-200 transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
              Apply Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
