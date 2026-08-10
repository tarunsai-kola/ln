import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const LandingWhoIsThisFor = () => {
  const goodFit = [
    "Ambitious CS & Engineering students ready to build production-grade projects and master modern tech stacks.",
    "Students looking to transition from basic college curricula into full-stack, AI, or advanced software engineering.",
    "Individuals prepared to commit 12–15 focused hours per week to upskill alongside their coursework.",
    "Learners who want honest feedback, live mentorship, and a structured path to crack top-tier technical rounds."
  ];

  const badFit = [
    "Students looking only for pre-recorded videos to watch passively without active participation.",
    "Those who are not ready for regular assignments, deep coding sessions, and accountability.",
    "Anyone seeking a 'guaranteed' outcome without putting in consistent effort.",
    "Individuals not open to receiving direct feedback on their code, communication, and interview performance."
  ];

  return (
    <section className="py-28 bg-[#FAFAFA] border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[2.5px] uppercase text-[#111111] border border-gray-300 bg-white px-4 py-1.5 rounded-full mb-5">
            Selective Admissions
          </span>
          <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">
            Who this program is for — and who it is not.
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed font-light">
            We select a small number of committed engineering students for each batch to maintain depth, quality, and outcomes. This is a serious skill-building accelerator, not a casual watch-at-your-own-pace course.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-gray-100 rounded-2xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            style={{ background: 'linear-gradient(171.63deg, #ffffff 2%, #e9f0d3 100%)' }}
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#aeb544]/10 border border-[#aeb544]/20 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-[#969d35]" />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">This IS for you if…</h3>
            </div>
            <div className="space-y-5">
              {goodFit.map((item, idx) => (
                <div key={idx} className="flex gap-3.5">
                  <CheckCircle2 size={17} className="text-[#969d35] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 font-light leading-relaxed text-[15px]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Not for */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-gray-100 rounded-2xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            style={{ background: 'linear-gradient(171.63deg, #ffffff 2%, #fae3e3 100%)' }}
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                <XCircle size={20} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">This is NOT for you if…</h3>
            </div>
            <div className="space-y-5">
              {badFit.map((item, idx) => (
                <div key={idx} className="flex gap-3.5">
                  <XCircle size={17} className="text-[#475569] mt-0.5 flex-shrink-0" />
                  <p className="text-[#64748B] font-light leading-relaxed text-[15px]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingWhoIsThisFor;
