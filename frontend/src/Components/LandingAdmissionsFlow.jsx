import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, PhoneCall, GraduationCap } from 'lucide-react';

const LandingAdmissionsFlow = () => {
  const steps = [
    {
      icon: <ClipboardCheck size={28} />,
      label: "Step 01",
      title: "Profile Screening",
      desc: "Submit a short application. We review your current role, technical background, and career goals to confirm our curriculum is a strong match for your trajectory.",
      time: "Takes 2 minutes",
      glowColor: "group-hover:from-purple-500/20 group-hover:to-fuchsia-500/20",
      iconGlow: "text-fuchsia-400",
      numberColor: "from-purple-500 to-fuchsia-500"
    },
    {
      icon: <PhoneCall size={28} />,
      label: "Step 02",
      title: "Fitment Call",
      desc: "A focused 15-minute 1:1 call with our admissions team. We assess your commitment level, technical baseline, and program readiness — not your current skill level.",
      time: "15-minute call",
      glowColor: "group-hover:from-blue-500/20 group-hover:to-cyan-500/20",
      iconGlow: "text-[#2563EB]",
      numberColor: "from-blue-500 to-cyan-500"
    },
    {
      icon: <GraduationCap size={28} />,
      label: "Step 03",
      title: "Admission & Onboarding",
      desc: "If selected, receive your offer, secure your seat, and gain instant access to the pre-cohort resources and your dedicated cohort community channel.",
      time: "Start within 48 hours",
      glowColor: "group-hover:from-orange-500/20 group-hover:to-rose-500/20",
      iconGlow: "text-orange-400",
      numberColor: "from-orange-500 to-rose-500"
    }
  ];

  return (
    <section className="py-32 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      
      {/* Cinematic TV Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />

      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#DBEAFE]/40 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-28">
          <div className="inline-flex items-center justify-center relative">
            <div className="absolute inset-0 bg-blue-100/50 blur-md rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <span className="relative inline-block text-[11px] font-black tracking-[0.2em] uppercase text-[#2563EB] border border-[#E2E8F0] bg-white px-5 py-2 rounded-full mb-6 backdrop-blur-sm shadow-sm hover:border-[#2563EB] transition-all duration-300">
              Admissions Process
            </span>
          </div>
          <h2 className="lp-font-outfit text-[#0F172A] font-extrabold text-4xl md:text-6xl mb-6 tracking-tight drop-shadow-sm">
            What happens after you apply.
          </h2>
          <p className="text-[#64748B] text-[18px] max-w-2xl mx-auto leading-relaxed font-medium">
            We reject more applications than we accept. Our selection process is straightforward, transparent, and quick.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          
          {/* Glowing Connecting Line */}
          <div className="hidden md:block absolute top-[60px] left-[18%] right-[18%] h-[1px] bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent pointer-events-none" />
          <div className="hidden md:block absolute top-[60px] left-[18%] right-[18%] h-[1px] bg-gradient-to-r from-transparent via-[#DBEAFE]/80 to-transparent pointer-events-none blur-sm" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
              className="group relative"
            >
              {/* Extreme Colored Hover Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${step.glowColor} rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700`} />
              
              {/* Inner Card */}
              <div className="relative h-full bg-[#F8FAFC] backdrop-blur-3xl border border-[#E2E8F0] rounded-[2.5rem] p-10 overflow-hidden flex flex-col items-center text-center transform group-hover:-translate-y-2 group-hover:border-[#2563EB]/50 transition-all duration-500 shadow-sm group-hover:shadow-xl">
                
                {/* Inner Top Lighting Beam */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-blue-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Huge Background Number */}
                <div className={`absolute -bottom-10 -right-4 text-[150px] font-black italic opacity-[0.03] group-hover:opacity-10 text-transparent bg-clip-text bg-gradient-to-br ${step.numberColor} transition-all duration-700 pointer-events-none select-none leading-none`}>
                  0{idx + 1}
                </div>

                {/* Icon Glass Circle */}
                <div className="w-[80px] h-[80px] rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] mb-8 relative group-hover:scale-110 transition-transform duration-500 z-10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                  <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${step.numberColor}`} />
                  <span className={`relative z-10 group-hover:${step.iconGlow} transition-colors duration-500`}>
                    {step.icon}
                  </span>
                </div>

                <div className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-4 z-10">{step.label}</div>
                <h3 className="text-2xl font-black text-[#0F172A] mb-4 tracking-tight z-10 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-500">{step.title}</h3>
                <p className="text-[#64748B] font-medium text-[15px] leading-relaxed mb-10 z-10">{step.desc}</p>

                <div className="mt-auto relative z-10">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#475569] bg-white border border-[#E2E8F0] px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:bg-[#F8FAFC] group-hover:border-[#2563EB] transition-all duration-300 backdrop-blur-md">
                    {step.time}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingAdmissionsFlow;
