import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: "Google", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg" },
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg" },
  { name: "Meta", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg" },
  { name: "Amazon", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg" },
  { name: "NVIDIA", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg" },
  { name: "OpenAI", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg" },
  { name: "IBM", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ibm.svg" },
  { name: "Intel", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/intel.svg" },
  { name: "Apple", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg" },
  { name: "Tesla", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tesla.svg" },
];

const HiringPartners = () => {
  return (
    <section className="py-10 border-b border-white/5 relative z-20 bg-[#020408]">
      <div className="max-w-[1400px] mx-auto px-6">
        <p className="text-gray-400 text-xs md:text-[11px] font-black tracking-[0.2em] uppercase mb-8 text-center drop-shadow-md">
          Our alumni build the future at
        </p>
        
        <div 
          className="relative flex overflow-hidden" 
          style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        >
          <motion.div 
            className="flex gap-16 md:gap-24 items-center whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[...partners, ...partners, ...partners].map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-7 md:h-8 w-auto object-contain invert opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HiringPartners;
