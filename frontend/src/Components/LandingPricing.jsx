import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, IndianRupee, ShieldCheck } from 'lucide-react';

const LandingPricing = () => {
  const features = [
    "24 Weeks of Intensive Live Curriculum",
    "1:1 Mentorship from FAANG Engineers",
    "3 Production-Grade Capstone Projects",
    "Unlimited Technical Mock Interviews",
    "Exclusive Internal Corporate Referrals",
    "Resume, GitHub & LinkedIn Overhaul",
    "Career Support for 12 Months Post-Graduation"
  ];

  return (
    <section className="py-32 bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Ambient center glow to highlight the pricing card against the white background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-[#00FFA3]/10 via-blue-500/5 to-purple-500/5 blur-[100px] pointer-events-none rounded-full" />
      
      {/* Light Cyber Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center relative mb-6">
            <div className="absolute inset-0 bg-[#00FFA3]/20 blur-lg rounded-full animate-pulse" />
            <span className="relative inline-flex items-center gap-2 text-[11px] font-black tracking-[0.2em] uppercase text-[#2563EB] border border-[#0F7B53]/20 bg-[#00FFA3]/10 px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(0,255,163,0.1)]">
              Investment & Pricing
            </span>
          </div>
          <h2 className="lp-font-outfit text-[#111111] font-extrabold text-5xl md:text-6xl mb-6 tracking-tight">
            An investment that pays for itself.
          </h2>
          <p className="text-[#64748B] text-[18px] max-w-2xl mx-auto leading-relaxed font-medium">
            Our graduates typically see a salary hike that covers the full program cost within their first two paychecks.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[1000px] mx-auto relative group"
        >
          {/* Card Outer Glow Border Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFA3] via-blue-500 to-[#00FFA3] rounded-[2.5rem] opacity-30 group-hover:opacity-60 blur-xl transition-all duration-700" />
          
          {/* Main Card Container */}
          <div className="relative bg-[#050505]/90 backdrop-blur-3xl border border-[#E2E8F0] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row z-10">
            
            {/* Left accent glowing bar */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#00FFA3] to-blue-500 hidden md:block shadow-[0_0_15px_rgba(0,255,163,0.5)] z-20" />

            {/* Features panel */}
            <div className="w-full md:w-3/5 p-10 md:p-14 md:pl-16 border-b md:border-b-0 md:border-r border-[#E2E8F0] relative overflow-hidden">
              {/* Inner subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-block px-4 py-1.5 bg-white border border-[#E2E8F0] text-[#0F172A] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-8 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                Premium Engineering Track
              </div>
              <p className="text-[#64748B] text-[15px] mb-10 font-medium leading-relaxed">
                Everything you need to transition into a top-tier product company, structured into a single elite program.
              </p>

              <div className="space-y-5 mb-10">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-[#00FFA3]/50 blur-md rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      <CheckCircle2 size={20} className="text-[#00FFA3] relative z-10 drop-shadow-[0_0_8px_rgba(0,255,163,0.5)]" />
                    </div>
                    <span className="text-[#475569] text-[16px] font-medium group-hover/item:text-[#0F172A] transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price panel */}
            <div className="w-full md:w-2/5 p-10 md:p-14 bg-[#0a0a0a] flex flex-col justify-center relative overflow-hidden">
              {/* Massive background ambient light */}
              <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-br from-[#00FFA3]/5 to-transparent blur-3xl pointer-events-none" />

              <div className="inline-block px-4 py-1.5 bg-[#00FFA3]/10 border border-[#00FFA3]/30 text-[#00FFA3] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-10 self-start shadow-[0_0_15px_rgba(0,255,163,0.2)] animate-pulse">
                Scholarship Available
              </div>

              <div className="mb-4 relative z-10">
                <div className="flex items-start">
                  <IndianRupee size={32} className="text-[#00FFA3] mt-3 mr-1 drop-shadow-[0_0_10px_rgba(0,255,163,0.5)]" />
                  <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 lp-font-outfit tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    59,999
                  </span>
                </div>
                <div className="text-[#64748B] text-lg line-through mt-2 font-bold decoration-[#FF0055]/50 decoration-2">₹85,000</div>
                <div className="text-[#00FFA3] text-[11px] mt-3 font-black uppercase tracking-widest bg-[#00FFA3]/10 border border-[#00FFA3]/20 inline-block px-3 py-1.5 rounded-md">
                  + GST · No-Cost EMI Available
                </div>
              </div>

              <button className="w-full mt-10 py-5 px-6 bg-[#00FFA3] text-black rounded-xl font-black text-[16px] uppercase tracking-wider hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,163,0.6)] transition-all duration-300 relative overflow-hidden group/btn">
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Apply for Scholarship</span>
              </button>

              <div className="mt-8 space-y-3 relative z-10 border-t border-[#E2E8F0] pt-6">
                <p className="text-[13px] font-medium text-[#64748B] text-center flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  EMI starts at ₹5,999/month
                </p>
                <p className="text-[13px] font-black text-[#FF0055] text-center flex items-center justify-center gap-2 drop-shadow-[0_0_8px_rgba(255,0,85,0.5)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0055] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF0055]"></span>
                  </span>
                  Next cohort seats filling fast
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingPricing;
