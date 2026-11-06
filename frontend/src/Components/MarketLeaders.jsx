import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';

const insights = [
  {
    id: 1,
    name: "Satya Nadella",
    role: "CEO",
    company: "Microsoft",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg",
    companyLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg",
    insight: (
      <>
        AI is moving from experimentation to a core operational capability. <span className="text-primary font-bold">Every role will soon be an AI-assisted role.</span>
      </>
    ),
    why: "Companies are prioritizing AI fluency over traditional software skills."
  },
  {
    id: 2,
    name: "Sundar Pichai",
    role: "CEO",
    company: "Google",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Sundar_Pichai_%282023%29_cropped.jpg",
    companyLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    insight: (
      <>
        The shift to AI is more profound than the shift to mobile or the web. The most valuable talent will be <span className="text-primary font-bold">those who can build with it.</span>
      </>
    ),
    why: "Early adopters of AI engineering will lead the next decade of tech."
  },
  {
    id: 3,
    name: "Jensen Huang",
    role: "CEO",
    company: "NVIDIA",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Jensen_Huang_%28cropped%29_%282024%29.jpg",
    companyLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg",
    insight: (
      <>
        We are at the tipping point of a new computing era. The demand for engineers who <span className="text-primary font-bold">understand generative AI is outpacing supply globally.</span>
      </>
    ),
    why: "The gap between market demand and talent readiness is your opportunity."
  },
  {
    id: 4,
    name: "Sam Altman",
    role: "CEO",
    company: "OpenAI",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Sam_Altman_November_2022.jpg",
    companyLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    insight: (
      <>
        The professionals who learn to <span className="text-primary font-bold">build and automate with AI right now</span> will stand out significantly faster than those relying on legacy skills.
      </>
    ),
    why: "AI capability is becoming a powerful career multiplier."
  }
];

const MarketLeaders = () => {
  return (
    <section id="market" className="py-24 px-6 bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block bg-primary/10 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5 border border-primary/20">
            Market Reality
          </span>
          <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight leading-tight mb-4">
            The market is not waiting.
          </h2>
          <p className="text-textMuted text-lg">
            AI is no longer an optional skill layer — it is becoming part of how companies hire, operate, and grow.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {insights.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gradient-to-br from-surface2 to-surface rounded-2xl border border-border/60 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden flex flex-col h-full shadow-lg hover:shadow-[0_8px_30px_rgba(19,138,82,0.12)] hover:-translate-y-1"
            >
              {/* Premium Glow Effects */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/20 rounded-full blur-[50px] opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top-Right Company Logo Watermark */}
              <div className="absolute top-8 right-8 opacity-30 group-hover:opacity-70 transition-opacity duration-300">
                <img src={item.companyLogo} alt={item.company} className="w-8 h-8 object-contain invert" />
              </div>

              <div className="p-8 pb-6 flex-1 flex flex-col relative z-10">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center shadow-inner overflow-hidden shadow-[0_4px_12px_rgba(19,138,82,0.2)] shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-black text-primary text-lg font-outfit">{item.company[0]}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-text text-[16px] leading-tight mb-1">{item.name}</h4>
                    <p className="text-textFaint text-[11px] uppercase tracking-widest font-bold">
                      {item.role} <span className="text-primary/50 mx-1">•</span> {item.company}
                    </p>
                  </div>
                </div>

                {/* Insight */}
                <div className="flex-1 relative">
                  <Quote size={28} className="text-primary/20 mb-4 absolute -top-2 -left-2 opacity-50" />
                  <p className="text-white text-[19px] leading-[1.6] font-medium font-outfit relative z-10 pl-6">
                    {item.insight}
                  </p>
                </div>
              </div>

              {/* Why it matters - Highlighted Strip */}
              <div className="bg-primary/[0.03] border-t border-primary/10 p-6 relative z-10 mt-auto group-hover:bg-primary/[0.06] transition-colors">
                <p className="text-[13px] font-bold flex items-start gap-3">
                  <span className="bg-primary/20 text-primary uppercase tracking-widest text-[9px] px-2 py-1 rounded shrink-0 mt-0.5">
                    Why this matters
                  </span>
                  <span className="flex-1 text-textMuted group-hover:text-textFaint transition-colors">{item.why}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Area */}
        <div className="relative overflow-hidden bg-surface2 border border-border rounded-2xl p-10 text-center max-w-4xl mx-auto flex flex-col items-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(19,138,82,0.15)_0%,transparent_70%)] pointer-events-none" />
          
          <h3 className="text-2xl md:text-3xl font-black font-outfit text-text mb-4 relative z-10">
            The opportunity is still open — <br className="hidden md:block" />
            <span className="text-primary">but it will not stay early forever.</span>
          </h3>
          <p className="text-textMuted text-lg mb-8 relative z-10 max-w-lg">
            Build the exact skills companies are actively hiring for and transitioning toward right now.
          </p>
          <a 
            href="#curriculum"
            className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primaryHover text-[#0a0a0a] font-black rounded-xl transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
          >
            View Curriculum <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default MarketLeaders;
