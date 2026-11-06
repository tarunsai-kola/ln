import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHandHoldingUsd, FaChevronRight, FaShieldAlt, FaRegClock, FaExclamationTriangle } from "react-icons/fa";

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-gray-300 font-sans relative overflow-hidden pb-24 selection:bg-blue-500/30">
      
      {/* Hyper-Premium Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl mb-6 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-md">
            <FaHandHoldingUsd size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 ag-font-outfit">
            Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">Policy</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            We are committed to delivering unparalleled educational experiences. Below are the terms governing our financial agreements and refund procedures.
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[40px] p-8 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        >
          
          <div className="space-y-12">
            
            <section className="group">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5 flex items-center gap-4 ag-font-outfit">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-600/5 text-blue-400 flex items-center justify-center text-sm font-black border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">01</span>
                Non-Refundable Standard
              </h2>
              <div className="pl-14 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base font-light">
                <p>At Accenlearn, we invest heavily in curating industry-leading curricula, engaging expert mentors, and maintaining elite technological infrastructures. For this reason, all fees, tuition, and payments made towards any of our educational programs are strictly <strong className="text-white">non-refundable</strong> under any circumstances.</p>
                <p>This policy remains in effect regardless of participant withdrawal, cancellation, non-completion, dismissal, or any other personal or professional reason affecting program attendance.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <section className="group">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5 flex items-center gap-4 ag-font-outfit">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-indigo-600/5 text-indigo-400 flex items-center justify-center text-sm font-black border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">02</span>
                Program Access Fulfillment
              </h2>
              <div className="pl-14 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base font-light">
                <p>Our commitment to you begins the moment you enroll. Once payment is confirmed, participants immediately receive access to proprietary course materials, platform resources, and cohort assignments. This immediate provisioning constitutes the complete fulfillment of our primary obligation to deliver the digital service.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <section className="group">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5 flex items-center gap-4 ag-font-outfit">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-600/5 text-purple-400 flex items-center justify-center text-sm font-black border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">03</span>
                Exceptional Circumstances
              </h2>
              <div className="pl-14 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base font-light">
                <p>The only exception to our No Refund Policy is in the highly unlikely event that Accenlearn is permanently unable to deliver the agreed-upon program due to unforeseen operational circumstances on our end. In such cases, a prorated refund or alternative program placement will be provided at our sole discretion.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Premium Support Call-to-Action */}
            <section className="mt-12 p-8 md:p-10 bg-gradient-to-br from-blue-900/30 to-indigo-900/10 border border-blue-500/20 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>
              <div className="relative z-10 text-center md:text-left">
                <div className="flex items-center gap-2 mb-3 justify-center md:justify-start text-blue-400">
                  <FaShieldAlt size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Commitment to Quality</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-2 ag-font-outfit">Need Administrative Support?</h2>
                <p className="text-sm text-gray-400 max-w-sm">We are dedicated to offering programs that meet the highest educational standards. Reach out to our support team for any billing inquiries.</p>
              </div>
              <a href="mailto:support@Accenlearn.com" className="relative z-10 px-8 py-4 bg-white text-blue-950 hover:bg-blue-50 font-black rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] whitespace-nowrap hover:scale-105 duration-300">
                Contact Support
              </a>
            </section>

            <div className="text-center pt-8">
              <p className="text-xs text-gray-500 font-medium">By enrolling in our programs, you acknowledge and accept the terms of this No Refund Policy.</p>
            </div>

          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pb-12"
        >
          <Link to="/" className="w-full md:w-auto text-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-all border border-white/10 shadow-lg hover:shadow-xl backdrop-blur-md">
            Back to Home
          </Link>
          <div className="flex gap-4 w-full md:w-auto">
            <Link to="/Terms" className="flex-1 md:flex-none text-center px-6 py-4 bg-transparent hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group backdrop-blur-md">
              Terms of Service <FaChevronRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
            <Link to="/Privacy" className="flex-1 md:flex-none text-center px-6 py-4 bg-transparent hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group backdrop-blur-md">
              Privacy Policy <FaChevronRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default RefundPolicy;
