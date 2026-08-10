import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const LandingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Who is this program for?",
      answer: "This program is built for students, graduates, and aspiring professionals who want practical skills, real project experience, and career-focused learning."
    },
    {
      question: "Is this suitable for working professionals?",
      answer: "Yes. With weekend live classes, recorded sessions, and structured learning support, the program can fit around a working schedule."
    },
    {
      question: "How are the classes conducted?",
      answer: "Learning is delivered through live sessions, LMS access, assignments, assessments, and guided project work in online, offline, or hybrid formats."
    },
    {
      question: "What kind of projects and practice are included?",
      answer: "You will work on practical assignments, mini projects, capstone work, and portfolio-building activities designed around real tools and workflows."
    },
    {
      question: "Is mentorship and career support part of the program?",
      answer: "Yes. Mentor guidance, resume support, mock interviews, and interview preparation are part of Accenlearn’s career-readiness approach."
    },
    {
      question: "Will I receive a certificate after completion?",
      answer: "Yes. Learners receive course completion certificates, with additional recognition for projects or internships where applicable."
    }
  ];

  return (
    <section className="py-28 bg-[#FAFAFA] border-t border-gray-100">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed font-light">
            Everything you need to know before making the most important career investment of your life.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                openIndex === idx ? "border-gray-300 shadow-sm" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className={`font-semibold text-[15px] pr-4 transition-colors ${openIndex === idx ? "text-[#111111]" : "text-gray-700"}`}>
                  {faq.question}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIndex === idx ? "bg-white text-[#0F172A]" : "bg-gray-100 text-[#64748B]"
                }`}>
                  {openIndex === idx ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-6 text-[#64748B] text-sm md:text-[15px] leading-relaxed font-light border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFAQ;
