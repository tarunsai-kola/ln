import React from "react";
import { FaCalendarAlt, FaDownload, FaArrowRight } from "react-icons/fa";

const ProgramCTA = ({ duration, brochureUrl, onEnroll, onDownload }) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 py-4 mt-2">
      {/* Duration Badge */}
      <div className="flex items-center gap-3 bg-secondary/15 border border-secondary/20 px-5 py-3 rounded-2xl shrink-0 select-none">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shadow-sm">
          <FaCalendarAlt size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Duration</span>
          <span className="text-sm font-extrabold text-primary leading-none">{duration || "2–3 Months"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 flex-grow sm:flex-grow-0">
        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow active:scale-95"
        >
          <FaDownload size={14} />
          Download Brochure
        </button>

        <button
          onClick={onEnroll}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-secondary text-primary hover:bg-secondary/90 rounded-xl font-black text-sm transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
        >
          Enroll Now
          <FaArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProgramCTA;
