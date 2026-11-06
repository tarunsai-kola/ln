import React from "react";
import { FaLaptopCode, FaProjectDiagram, FaUserTie, FaCertificate, FaHandshake, FaChalkboardTeacher } from "react-icons/fa";
import { COMPANY_IMAGES } from "../../../shared/ImageHelper";

const ProgramHighlights = ({ features = [] }) => {
  const highlightCards = [
    {
      icon: <FaLaptopCode className="w-6 h-6 text-white" />,
      title: "Live Interactive Classes",
      desc: "Learn directly from industry experts with real-time doubt clearing and interactive sessions.",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-100 hover:border-blue-300",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
    },
    {
      icon: <FaProjectDiagram className="w-6 h-6 text-white" />,
      title: "Real-World Projects",
      desc: "Build a strong portfolio by working on capstone projects sourced from top tech companies.",
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-100 hover:border-emerald-300",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/30"
    },
    {
      icon: <FaChalkboardTeacher className="w-6 h-6 text-white" />,
      title: "Structured Curriculum",
      desc: "A step-by-step roadmap designed to take you from fundamentals to advanced concepts.",
      bg: "bg-gradient-to-br from-purple-50 to-fuchsia-50 hover:from-purple-100 hover:to-fuchsia-100 border-purple-100 hover:border-purple-300",
      iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-purple-500/30"
    },
    {
      icon: <FaUserTie className="w-6 h-6 text-white" />,
      title: "1:1 Expert Mentorship",
      desc: "Get personalized guidance, code reviews, and career advice from top 1% mentors.",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-amber-100 hover:border-amber-300",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/30"
    },
    {
      icon: <FaHandshake className="w-6 h-6 text-white" />,
      title: "Placement Assistance",
      desc: "Dedicated career support including mock interviews, resume building, and job referrals.",
      bg: "bg-gradient-to-br from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border-rose-100 hover:border-rose-300",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-500 shadow-rose-500/30"
    },
    {
      icon: <FaCertificate className="w-6 h-6 text-white" />,
      title: "Global Certification",
      desc: "Earn industry-recognized certificates to validate your skills and boost your profile.",
      bg: "bg-gradient-to-br from-cyan-50 to-sky-50 hover:from-cyan-100 hover:to-sky-100 border-cyan-100 hover:border-cyan-300",
      iconBg: "bg-gradient-to-br from-cyan-500 to-sky-500 shadow-cyan-500/30"
    }
  ];

  return (
    <section className="relative bg-white py-20 border-b border-slate-200 overflow-hidden">
      {/* Abstract Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] z-0 pointer-events-none mix-blend-multiply" 
        style={{ backgroundImage: `url('/bg-highlights.png')` }}
      ></div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Trust Marquee */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            500+ Top Companies Hire Our Graduates
          </p>
          
          <div className="relative flex overflow-hidden group">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div className="flex animate-marquee group-hover:pause gap-12 items-center px-6">
              {[...COMPANY_IMAGES, ...COMPANY_IMAGES].map((company, idx) => (
                <div key={idx} className="flex-shrink-0 w-[120px] h-[60px] flex items-center justify-center transition-all duration-300">
                  <img src={company.img} alt={`Company ${company.id}`} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Program Highlights</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to master your domain and launch your tech career.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightCards.map((card, idx) => (
              <div key={idx} className={`${card.bg} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          width: max-content;
        }
        .group:hover .pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ProgramHighlights;
