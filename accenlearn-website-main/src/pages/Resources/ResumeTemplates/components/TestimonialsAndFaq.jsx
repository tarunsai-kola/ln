import React, { useState } from "react";
import {
  FaChevronDown,
  FaCheckCircle,
  FaQuestionCircle
} from "react-icons/fa";
import { FAQ_QUESTIONS } from "../data/templatesData";

const TestimonialsAndFaq = () => {
  const [openFaqId, setOpenFaqId] = useState("faq-1");

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-8">
      {/* =========================================================
          FAQ SECTION (MODERN ACCORDION)
         ========================================================= */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Everything you need to know about ATS compatibility, downloading files, and editing your resume.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQ_QUESTIONS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-primary shadow-lg ring-1 ring-primary/20"
                    : "bg-white border-gray-200/80 hover:border-gray-300 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-primary" : "text-gray-900"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"}`}>
                    <FaChevronDown className="text-xs" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="pt-2">{faq.answer}</p>
                    <div className="mt-3 pt-3 border-t border-gray-100/60 flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
                      <FaCheckCircle /> Verified by AccenLearn Tech Placement Team
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still need help? Box */}
        <div className="max-w-4xl mx-auto mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <FaQuestionCircle className="text-primary" /> Have a question about custom formatting or college templates?
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Our career support team responds to student inquiries within 24 hours.
            </p>
          </div>
          <a
            href="mailto:support@accenlearn.com"
            className="px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs rounded-xl border border-gray-300 shadow-xs shrink-0 transition-all cursor-pointer"
          >
            Contact Career Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAndFaq;
