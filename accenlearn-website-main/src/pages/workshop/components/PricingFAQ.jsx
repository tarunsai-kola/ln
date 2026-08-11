import React, { useState } from "react";
import { FaGraduationCap, FaChalkboardTeacher, FaBriefcase, FaCheckCircle, FaTimesCircle, FaChevronDown } from "react-icons/fa";

const PricingFAQ = ({ onEnroll }) => {
  const [openFaq, setOpenFaq] = useState(0);

  const pricingTiers = [
    {
      id: "self",
      icon: <FaGraduationCap className="w-6 h-6 text-blue-500" />,
      title: "Self-Guided",
      titleColor: "text-blue-500",
      accentColor: "bg-blue-500",
      iconBg: "bg-blue-50",
      subtitle: "Learn at your own pace",
      price: "6,999",
      subtext: "Enroll now to enjoy extra early bird discounts!",
      features: [
        { name: "Record Session", active: true },
        { name: "Hands On Project", active: true },
        { name: "Certification", active: true },
        { name: "No Live Sessions", active: false },
        { name: "No Doubt Clearing Session", active: false },
        { name: "No Mentor Guidance", active: false },
        { name: "No Placement Assistance", active: false },
      ]
    },
    {
      id: "instructor",
      icon: <FaChalkboardTeacher className="w-6 h-6 text-purple-500" />,
      title: "Instructor-Led",
      titleColor: "text-purple-500",
      accentColor: "bg-purple-500",
      iconBg: "bg-purple-50",
      subtitle: "Get real time assistance",
      price: "9,999",
      subtext: "Enroll now to enjoy extra early bird discounts!",
      features: [
        { name: "All benefits of Self-Guided", active: true },
        { name: "Live Sessions", active: true },
        { name: "Doubt Clearing Session", active: true },
        { name: "Mentor Guidance", active: true },
        { name: "No Placement Assistance", active: false },
      ]
    },
    {
      id: "career",
      icon: <FaBriefcase className="w-6 h-6 text-green-500" />,
      title: "Career Advancement",
      titleColor: "text-green-600",
      accentColor: "bg-green-500",
      iconBg: "bg-green-50",
      subtitle: "Get Job ready",
      price: "15,999",
      subtext: "Enroll now to enjoy extra early bird discounts!",
      features: [
        { name: "All benefits of Self-Guided + Instructor-Led", active: true },
        { name: "Placement Assistance", active: true },
        { name: "Mock Interviews", active: true },
        { name: "Access to Our Hiring Partners", active: true },
        { name: "ATS-Friendly Resume Building", active: true },
      ]
    }
  ];

  const faqs = [
    {
      q: "Who is this program for?",
      a: "This program is designed for students, recent graduates, and early-to-mid career professionals who want to deeply master tech skills and transition into high-paying roles."
    },
    {
      q: "Is there a placement guarantee?",
      a: "While we don't 'guarantee' jobs, we provide comprehensive placement assistance in our Career Advancement tier, including mock interviews, resume building, and direct referrals to our 500+ hiring partners."
    },
    {
      q: "Do I need prior coding experience?",
      a: "Basic programming knowledge is helpful but not strictly required. The curriculum starts with foundational concepts before rapidly accelerating into advanced topics."
    },
    {
      q: "Can I upgrade my tier later?",
      a: "Yes! You can start with the Self-Guided or Instructor-Led tier and upgrade to Career Advancement at any point during the program by paying the difference."
    },
    {
      q: "What if I miss a live class?",
      a: "All live sessions are recorded and made available in your dashboard within 24 hours. You will have lifetime access to these recordings."
    }
  ];

  return (
    <section className="bg-slate-50 py-24 border-b border-slate-200 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pricing Cards */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Path</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Select the learning style that fits your goals and budget.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-32 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <div key={tier.id} className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className={`w-14 h-14 rounded-2xl ${tier.iconBg} flex items-center justify-center mb-4`}>
                  {tier.icon}
                </div>
                <h3 className={`text-xl font-bold mb-1 ${tier.titleColor}`}>{tier.title}</h3>
                <p className="text-slate-500 text-sm">{tier.subtitle}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex justify-center items-start gap-1">
                  <span className="text-3xl font-bold text-slate-900 mt-1">₹</span>
                  <span className="text-5xl font-black text-slate-900">{tier.price}</span>
                </div>
                <p className="text-slate-400 text-xs mt-3">{tier.subtext}</p>
              </div>

              {/* Divider */}
              <div className={`h-1 w-full rounded-full opacity-20 mb-8 ${tier.accentColor}`}></div>

              {/* Features List */}
              <div className="flex-grow space-y-4 mb-10">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {feature.active ? (
                      <FaCheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${tier.titleColor}`} />
                    ) : (
                      <FaCheckCircle className="w-5 h-5 text-slate-200 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.active ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="space-y-3 mt-auto">
                <button 
                  onClick={onEnroll}
                  className="w-full py-3.5 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
                >
                  Enroll Now ↗
                </button>
                <button 
                  onClick={onEnroll}
                  className="w-full py-3.5 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
                >
                  Full Registration ↗
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-900 pr-8">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}>
                    <FaChevronDown className="w-3 h-3 text-slate-500" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="p-6 pt-0 text-slate-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingFAQ;
