import React, { useState } from "react";
import { FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

const CareerTracks = ({ title, tracks = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Safeguard against empty tracks
  if (!tracks || tracks.length === 0) return null;

  return (
    <section className="relative bg-slate-50 py-24 border-b border-slate-200 overflow-hidden">
      {/* Abstract Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] z-0 pointer-events-none mix-blend-multiply" 
        style={{ backgroundImage: `url('/bg-careertracks.png')` }}
      ></div>

      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tailored for Every Career Stage</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">No matter where you are in your journey, our curriculum adapts to get you to the next level.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tracks.map((track, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === idx 
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
              }`}
            >
              <span className="block text-[10px] uppercase opacity-70 mb-0.5">{track.level}</span>
              {track.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[80px]"></div>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            {/* Left Col: Info */}
            <div>
              <div className="inline-block px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wide uppercase mb-4">
                Target Role
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{tracks[activeTab].role}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">{tracks[activeTab].description}</p>
              
              <div className="space-y-4">
                <p className="text-slate-900 font-semibold">What you'll gain:</p>
                {tracks[activeTab].gains.map((gain, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{gain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Testimonial Card */}
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm rounded-2xl p-8 relative w-full">
                <FaQuoteLeft className="absolute top-6 right-6 w-8 h-8 text-slate-100" />
                <p className="text-slate-700 italic leading-relaxed mb-6 relative z-10">
                  "{tracks[activeTab].quote}"
                </p>
                <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                    {tracks[activeTab].author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold text-sm">{tracks[activeTab].author}</div>
                    <div className="text-slate-500 text-xs">{tracks[activeTab].authorRole}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CareerTracks;
