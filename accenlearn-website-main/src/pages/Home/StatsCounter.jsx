import React from "react";
import CountUp from "react-countup";
import { IMAGE_HELPER } from "../../shared/ImageHelper";

const StatsCounter = () => {
  const STATS = [
    { count: 250, label: "hiring partners", suffix: "+" },
    { count: 36, label: "Workshop Delivered", suffix: "+" },
    { count: 200, label: "Mentor-led Sessions", suffix: "+" },
    { count: 500, label: "Certified", suffix: "+" },
  ];

  return (
    <section className="relative w-full py-6 sm:py-8">
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-500 min-h-[100px]"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tighter">
              <CountUp 
                start={0}
                end={stat.count} 
                duration={3} 
                separator=","
                suffix={stat.suffix}
                enableScrollSpy={true} 
                scrollSpyOnce={true} 
              >
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-bold opacity-90 uppercase tracking-widest text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
