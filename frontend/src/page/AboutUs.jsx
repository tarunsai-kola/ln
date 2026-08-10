import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Rocket, Users, Briefcase, ChevronRight, Zap } from "lucide-react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-gray-300 font-sans relative overflow-hidden selection:bg-blue-500/30">
      
      {/* Hyper-Premium Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24">
        
        {/* Hero Section */}
        <div className="max-w-[1100px] mx-auto px-6 text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 font-black text-xs uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          >
            <Rocket size={14} className="text-emerald-400" /> Discover Accenlearn
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeIn}
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-8 ag-font-outfit"
          >
            Empowering Careers.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Transforming Lives.
            </span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="visible" variants={fadeIn}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Accenlearn is more than an educational platform. We are your dedicated career accelerator, bridging the gap between ambition and industry realities to forge the next generation of tech leaders.
          </motion.p>
        </div>

        {/* Our Mission (Core Focus) */}
        <div className="max-w-[1250px] mx-auto px-6 mb-24">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="bg-white/[0.03] backdrop-blur-2xl rounded-[40px] p-10 md:p-16 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-emerald-600/20 flex items-center justify-center border border-white/10 mb-8 shadow-lg">
                  <Target size={32} className="text-blue-400" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight ag-font-outfit">
                  Our Ultimate Mission
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed font-light mb-6">
                  We exist for one singular purpose: <strong className="text-white font-medium">to ensure every single one of our users gets placed in top-tier companies and fundamentally transforms their lives.</strong>
                </p>
                <p className="text-gray-400 leading-relaxed font-light">
                  We don't just sell courses; we engineer careers. By merging academic rigor with practical, hands-on learning, expert mentorship, and an advanced curriculum, we equip individuals with the precise tools they need to solve complex challenges, innovate, and lead confidently in the tech industry.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-[#05050a] border border-white/10 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-center">
                  <div className="space-y-8">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Briefcase size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 ag-font-outfit">Guaranteed Impact</h4>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">Our curriculum is ruthlessly optimized for what the job market demands right now, ensuring you are hire-ready from day one.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Zap size={20} className="text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 ag-font-outfit">Transformative Journey</h4>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">Our commitment extends beyond traditional learning to foster critical thinking and real-world problem-solving in a supportive environment that inspires success.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us / Values */}
        <div className="max-w-[1250px] mx-auto px-6 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 ag-font-outfit">The Accenlearn Edge</h2>
            <p className="text-gray-400 font-light">Why ambitious engineers choose our platform.</p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "Industry-Vetted Curriculum", desc: "Designed by tech leads from top product companies, ensuring you learn exactly what employers test for.", icon: <Users size={24} /> },
              { title: "Elite Mentorship", desc: "Learn directly from practitioners who have navigated the exact career paths you want to conquer.", icon: <Target size={24} /> },
              { title: "Placement Obsessed", desc: "Our success metrics are inextricably tied to your placement outcomes. Your win is our win.", icon: <Rocket size={24} /> }
            ].map((feature, i) => (
              <motion.div 
                key={i} variants={fadeIn}
                className="bg-white/[0.02] border border-white/5 hover:border-white/20 p-8 rounded-3xl transition-all duration-300 hover:bg-white/[0.04] group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 ag-font-outfit">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center bg-gradient-to-br from-blue-900/30 to-indigo-900/10 border border-blue-500/20 rounded-[40px] p-12 md:p-16 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 ag-font-outfit relative z-10">
              Ready to Transform Your Life?
            </h2>
            <p className="text-gray-300 mb-10 max-w-xl mx-auto font-light relative z-10">
              Join thousands of learners who have accelerated their careers and secured their dream roles through our immersive programs.
            </p>
            <Link 
              to="/Advance"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-950 font-black rounded-xl hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 duration-300 relative z-10 text-sm uppercase tracking-widest"
            >
              Explore Programs <ChevronRight size={18} strokeWidth={3} />
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
