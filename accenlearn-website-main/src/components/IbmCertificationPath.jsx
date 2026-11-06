import React from "react";
import { FaCircle } from "react-icons/fa";

const IbmCertificationPath = () => {
  return (
    <div className="bg-white py-20 w-full border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">IBM Certification Path</h2>
        <p className="text-lg text-slate-600 mb-12 font-medium">Why and how to get certified.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-stretch">
          
          {/* Left Panel */}
          <div className="bg-slate-50 rounded-[32px] p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl md:text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Why Should You Get Certified?</h3>
              <ul className="space-y-4 md:space-y-5">
                {[
                  "Earn an official IBM digital certificate accepted worldwide",
                  "Gain strong credibility with top companies & recruiters",
                  "Improve your chances of landing high-value tech roles",
                  "Strengthen your portfolio for web development careers",
                  "Showcase your dedication to upskilling & continuous learning"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-blue-500 mt-1.5 shrink-0 text-[10px]">
                      <FaCircle />
                    </span>
                    <span className="text-slate-600 text-[15px] md:text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">How to Get Certified?</h3>
              <p className="text-slate-600 text-[15px] mb-6 font-medium">
                Attend a short online exam to qualify for the official IBM certificate.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-[15px]">Exam Duration:</span>
                  <span className="text-blue-600 font-bold text-[15px]">1 hour</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-[15px]">Mode:</span>
                  <span className="text-blue-600 font-bold text-[15px]">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-[#0a0a1e] rounded-[32px] p-8 md:p-12 flex items-center justify-center relative overflow-hidden shadow-2xl border border-slate-800 h-full">
             <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
             
             <div className="relative z-10 w-full max-w-[500px]">
                {/* Badge */}
                <div className="absolute -top-4 -right-2 md:right-4 bg-[#0a0a1e] text-white text-[11px] font-bold px-4 py-2.5 rounded-full border border-slate-700 shadow-xl flex items-center gap-2 z-20">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  DEMO CERTIFICATE
                </div>
                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-2xl relative z-10 bg-white border-[6px] border-white">
                  <img src="/image.png" alt="IBM Certificate" className="w-full h-auto scale-[1.06]" />
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IbmCertificationPath;
