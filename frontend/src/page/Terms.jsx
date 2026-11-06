import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFileContract, FaChevronRight, FaBalanceScale, FaHandshake } from "react-icons/fa";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-gray-300 font-sans relative overflow-hidden pb-24 selection:bg-indigo-500/30">
      
      {/* Hyper-Premium Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl mb-6 text-indigo-400 shadow-[0_0_30px_rgba(79,70,229,0.15)] backdrop-blur-md">
            <FaFileContract size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 ag-font-outfit">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">Service</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Welcome to Accenlearn. These terms govern your access to our ecosystem of advanced educational programs and technological resources.
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
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-indigo-600/5 text-indigo-400 flex items-center justify-center text-sm font-black border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]">01</span>
                General & Eligibility
              </h2>
              <div className="pl-14 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base font-light">
                <p>These Terms apply universally to all users, students, and visitors of our platform. By utilizing our services, you implicitly agree to abide by these regulations. We reserve the right to continually refine and modify these Terms to reflect operational advancements.</p>
                <p>Users must meet a minimum age requirement of 16 years, or possess verifiable parental consent. Enrollment in advanced cohort programs may necessitate prerequisite qualifications or assessments to ensure cohort quality.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <section className="group">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5 flex items-center gap-4 ag-font-outfit">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-600/5 text-blue-400 flex items-center justify-center text-sm font-black border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">02</span>
                Services & Financials
              </h2>
              <div className="pl-14 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base font-light">
                <p>Accenlearn provisions high-impact educational curricula and architectural training. Program structures, schedules, and tuition models are dynamic and subject to optimization.</p>
                <p>Tuition must be remitted in full (or via an approved payment plan) prior to unlocking platform access. As detailed in our Refund Policy, all fees are <strong className="text-white">strictly non-refundable</strong>.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <section className="group">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5 flex items-center gap-4 ag-font-outfit">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-600/5 text-purple-400 flex items-center justify-center text-sm font-black border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">03</span>
                Intellectual Property Rights
              </h2>
              <div className="pl-14 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base font-light">
                <p>All architectural diagrams, code repositories, video lectures, and proprietary materials are the exclusive intellectual property of Accenlearn and its engineering licensors.</p>
                <p>Unauthorized reproduction, distribution, or unauthorized sharing of our cohort materials is strictly prohibited and constitutes grounds for immediate expulsion without refund.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <section className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors shadow-lg group">
                <div className="mb-4 text-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity"><FaBalanceScale size={24}/></div>
                <h2 className="text-xl font-black text-white mb-3 ag-font-outfit">Liability Limitation</h2>
                <p className="text-sm text-gray-400 leading-relaxed font-light">While we provide immense value and network access, Accenlearn does not guarantee specific employment outcomes, job placements, or financial results.</p>
              </section>

              <section className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors shadow-lg group">
                <div className="mb-4 text-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity"><FaHandshake size={24}/></div>
                <h2 className="text-xl font-black text-white mb-3 ag-font-outfit">Dispute Resolution</h2>
                <p className="text-sm text-gray-400 leading-relaxed font-light">Any disputes arising from these Terms shall be resolved exclusively through binding arbitration in our operating jurisdiction.</p>
              </section>
            </div>
            
            {/* Premium Support Call-to-Action */}
            <section className="mt-12 p-8 md:p-10 bg-gradient-to-br from-indigo-900/30 to-blue-900/10 border border-indigo-500/20 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none"></div>
              <div className="relative z-10 text-center md:text-left">
                <h2 className="text-2xl font-black text-white mb-2 ag-font-outfit">Require Legal Clarification?</h2>
                <p className="text-sm text-gray-400 max-w-sm font-light">For any questions or concerns regarding these Terms, our legal support team is available.</p>
              </div>
              <a href="mailto:support@Accenlearn.com" className="relative z-10 px-8 py-4 bg-white text-indigo-950 hover:bg-indigo-50 font-black rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] whitespace-nowrap hover:scale-105 duration-300">
                Contact Legal
              </a>
            </section>

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
            <Link to="/Privacy" className="flex-1 md:flex-none text-center px-6 py-4 bg-transparent hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group backdrop-blur-md">
              Privacy Policy <FaChevronRight size={10} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
            <Link to="/RefundPolicy" className="flex-1 md:flex-none text-center px-6 py-4 bg-transparent hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group backdrop-blur-md">
              Refund Policy <FaChevronRight size={10} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Terms;
