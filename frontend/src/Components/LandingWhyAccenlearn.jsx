import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Briefcase } from 'lucide-react';

const LandingWhyAccenlearn = () => {
  const bentoItems = [
    {
      title: "Learn with real depth, not surface-level content",
      icon: <Code size={22} />,
      desc: "Work on practical projects, strengthen fundamentals, and understand how modern products are actually built. From software development to cloud, AI, and design, each learning path is structured to help you build skills you can apply in interviews, internships, and real work environments.",
      tags: ["Structured Programs", "Real Projects", "Industry Tools", "Capstone Learning"],
      colSpan: "md:col-span-2 md:row-span-2 flex flex-col justify-center",
      delay: 0.1,
      glowColor: "from-[#00FFA3]/20 to-emerald-500/10",
      iconColor: "text-[#00FFA3]"
    },
    {
      title: "Live mentor guidance",
      icon: <Users size={22} />,
      desc: "Learn from working professionals through live classes, doubt-solving, reviews, and continuous feedback designed to keep your progress on track.",
      colSpan: "md:col-span-1 md:row-span-1 flex flex-col justify-center",
      delay: 0.2,
      glowColor: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-[#2563EB]"
    },
    {
      title: "Career readiness support",
      icon: <Briefcase size={22} />,
      desc: "Build resumes, prepare for interviews, complete portfolio projects, and gain access to internship and placement-focused support throughout your learning journey.",
      colSpan: "md:col-span-1 md:row-span-1 flex flex-col justify-center",
      delay: 0.3,
      glowColor: "from-purple-500/20 to-fuchsia-500/10",
      iconColor: "text-purple-400"
    }
  ];

  return (
    <section className="relative overflow-hidden py-28 bg-[#F8FAFC] border-t border-[#E2E8F0]">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#00FFA3]/10 via-blue-500/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center relative mb-6">
            <div className="absolute inset-0 bg-[#00FFA3]/20 blur-lg rounded-full animate-pulse" />
            <span className="relative inline-flex items-center gap-2 text-[11px] font-black tracking-[0.2em] uppercase text-[#00FFA3] border border-[#00FFA3]/30 bg-[#0a0a0a] px-6 py-2 rounded-full shadow-[0_0_20px_rgba(0,255,163,0.15)]">
              Why Accenlearn works
            </span>
          </div>
          <h2 className="lp-font-outfit text-[#0F172A] font-extrabold text-3xl md:text-5xl mb-6 tracking-tight drop-shadow-sm max-w-3xl mx-auto leading-tight">
            Practical learning, expert mentorship, and career support that move you forward
          </h2>
          <p className="text-[#64748B] text-[17px] md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Accenlearn is built for learners who want more than theory. We combine structured programs, real projects, mentor guidance, and career preparation to help students become industry-ready with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.5 }}
              className={`${item.colSpan} group relative bg-white/[0.02] border border-[#E2E8F0] rounded-[2rem] p-8 hover:bg-white/[0.03] hover:border-[#E2E8F0] hover:shadow-2xl transition-all duration-700 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]`}
            >
              {/* Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

              {/* Hover Inner Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              {/* Physical Glass Edge Light */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className={`relative z-10 w-14 h-14 rounded-2xl bg-[#050505] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] border border-[#E2E8F0] flex items-center justify-center mb-6 text-[#64748B] group-hover:border-[#E2E8F0] group-hover:${item.iconColor} transition-all duration-700`}>
                {item.icon}
                {/* Icon Inner Glow */}
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-current pointer-events-none" />
              </div>
              <h3 className={`relative z-10 text-xl md:text-2xl font-extrabold text-[#0F172A] mb-4 tracking-tight group-hover:${item.iconColor} transition-colors duration-700`}>
                {item.title}
              </h3>
              <p className="relative z-10 text-[#64748B] font-medium leading-relaxed text-[15px] group-hover:text-[#475569] transition-colors duration-500">
                {item.desc}
              </p>
              
              {item.tags && (
                <div className="relative z-10 mt-8 flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] font-bold tracking-wide uppercase text-[#475569] bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-full group-hover:bg-[#F8FAFC] transition-colors duration-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingWhyAccenlearn;
