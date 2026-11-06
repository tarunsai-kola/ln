import React from "react";

const ProgramStatsBar = ({ stats, labelColor = "text-[#d4af37]" }) => {
  return (
    <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-8 mb-24">
      <div className="bg-[#0a0a0b] border border-white/10 rounded-[24px] py-8 px-6 md:px-12 shadow-2xl flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center flex-1 min-w-[140px]">
            <div className="text-2xl md:text-[28px] font-black text-white mb-1.5 tracking-tight">
              {stat.value}
            </div>
            <div className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase ${labelColor} opacity-90`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramStatsBar;
