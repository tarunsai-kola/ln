import React, { useState } from "react";
import { faq } from "../../../data";
import { IoChevronDown } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(faq.map((f) => f.category))];

  const filteredFaqs = faq.filter(
    (f) => selectedCategory === "All" || f.category === selectedCategory
  );

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pt-4 sm:pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-secondary font-bold text-sm tracking-wider uppercase bg-secondary/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-3">
          <FaQuestionCircle /> Help Center
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-primary mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Got questions about our courses, mentorship, or programs? Find your answers right here.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveIndex(null);
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm ${
              selectedCategory === cat
                ? "bg-primary text-white scale-105 shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => (
            <div
              key={item.id || index}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                activeIndex === index ? "border-primary ring-2 ring-primary/10" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-lg uppercase tracking-wider flex-shrink-0">
                    {item.category}
                  </span>
                  <span className={`text-lg sm:text-xl font-bold transition-colors ${
                    activeIndex === index ? "text-primary" : "text-gray-800 group-hover:text-primary"
                  }`}>
                    {item.question}
                  </span>
                </div>
                <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180 text-primary" : "text-gray-400"
                }`}>
                  <IoChevronDown size={22} />
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "max-h-96 opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 bg-gray-50/50 text-gray-600 text-base sm:text-lg leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No FAQs available for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;