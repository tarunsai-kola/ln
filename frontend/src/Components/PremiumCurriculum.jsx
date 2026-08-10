import React, { useState, useEffect, useRef } from "react";

const PremiumCurriculum = ({ 
  phases = [], 
  title = "16-Week Roadmap", 
  accentColor = "text-[#34d399]", 
  bgColor = "bg-[#0B0F13]",
  cardBgColor = "bg-[#12161A]"
}) => {
  const [activePhase, setActivePhase] = useState(phases[0]?.id || "");
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Get the first visible entry
          setActivePhase(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px" } // Triggers when element is near the top
    );

    phases.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.current.observe(el);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const scrollToPhase = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for sticky header if exists
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className={`${bgColor} text-gray-300 py-12 md:py-24 px-6 md:px-12 font-sans border-t border-white/5`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <span className={`${accentColor} text-xs font-bold tracking-[0.2em] uppercase mb-4 block`}>
            CURRICULUM
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-2xl">
            Hands-on projects. Industry-proven mentors. Production-ready skills.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left: Sticky Navigation */}
          <div className="lg:w-[35%] relative">
            <div className={`lg:sticky lg:top-32 flex flex-col p-6 lg:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]`}>
              {phases.map((p) => {
                const isActive = activePhase === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => scrollToPhase(p.id)}
                    className={`text-left py-6 border-b border-white/10 last:border-b-0 group transition-all duration-300 ${
                      isActive ? "bg-white/5 px-4 -mx-4 rounded-2xl border-transparent" : "hover:bg-white/5 hover:px-4 hover:-mx-4 hover:rounded-2xl"
                    }`}
                  >
                    <div className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 ${accentColor}`}>
                      {p.phase} ({p.duration}):
                    </div>
                    <div className={`font-semibold text-base md:text-xl transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {p.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Scrolling Cards */}
          <div className="lg:w-[65%] flex flex-col gap-8">
            {phases.map((p) => (
              <div 
                key={p.id} 
                id={p.id}
                className={`${cardBgColor} border border-white/10 rounded-2xl p-6 md:p-10 shadow-xl transition-all duration-300 hover:border-white/20`}
              >
                {/* Card Header */}
                <div className="border-b border-white/10 pb-6 mb-6">
                  <div className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 ${accentColor}`}>
                    {p.phase} ({p.duration})
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {p.title}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="flex flex-col gap-8">
                  {/* Focus */}
                  <div>
                    <h4 className={`${accentColor} text-xs font-bold tracking-[0.15em] uppercase mb-4`}>
                      {p.focusLabel}
                    </h4>
                    <ul className="space-y-3">
                      {p.focus.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#A1A1AA] leading-relaxed text-sm md:text-base">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#A1A1AA] flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real World Application */}
                  <div>
                    <h4 className={`${accentColor} text-xs font-bold tracking-[0.15em] uppercase mb-4`}>
                      REAL-WORLD APPLICATION
                    </h4>
                    <p className="text-[#A1A1AA] leading-relaxed text-sm md:text-base">
                      {p.application}
                    </p>
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

export default PremiumCurriculum;
