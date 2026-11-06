import React, { useState } from "react";
import TitleText from "../../components/TitleText";

// const STEPS = [
//   "Explore Our Programs",
//   "Register with us",
//   "Get a call",
//   "Pay course fees",
//   "Start Learning",
// ];

const STEPS = [
  {
    title: "Explore Our Programs",
    desc: "Browse curated tracks tailored to roles, skills, and outcomes.",
  },
  {
    title: "Register with us",
    desc: "Create your profile and lock in your preferred cohort.",
  },
  {
    title: "Get a call",
    desc: "Our team connects to align goals, timelines, and support.",
  },
  {
    title: "Pay course fees",
    desc: "Complete enrollment with secure payment options.",
  },
  {
    title: "Start Learning",
    desc: "Attend live sessions, build projects, and get mentor guidance.",
  },
];


const Enrole = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <TitleText title="How to Enroll?" description={`Getting started with AccenLearn is simple and hassle-free. Follow
          these steps to begin your learning journey.`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
      
        <div className="relative">
          <div className="lg:sticky lg:top-24">
            <img
              src="https://t4.ftcdn.net/jpg/03/30/75/05/360_F_330750599_3wWrN87aNbJDOiq2lIYPgtIf6njhjQKd.jpg"
              alt="Program Flow"
              className="w-full rounded-3xl shadow-xl"
            />
          </div>
        </div>

       
        <div className="flex gap-4 overflow-hidden lg:flex-row flex-col">
          {STEPS.map((step, index) => {
            const isOpen = activeIndex === index;
            const isNext = activeIndex + 1 === index;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer lg:h-[320px] h-full rounded-2xl border transition-all duration-500
                  ${isOpen
                  ? "lg:w-[60%] w-full bg-primary/5 border-primary shadow-xl"
                  : "lg:w-[10%] w-full bg-white border-gray-200 hover:shadow-md"}
                `}
              >
                <div className="h-full flex flex-col p-4">
                  
                
                  <span className={`h-10 w-10 mb-4 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-semibold ${isNext ? "animate-blink shadow-[0_0_15px_rgba(124,207,0,0.5)]" : ""}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                
                  <h3
                    className={`title_text !text-lg !text-primary transition-all
                      ${!isOpen ? "lg:rotate-90 origin-left whitespace-nowrap" : ""}
                    `}
                  >
                    {step.title}
                  </h3>


                  {isOpen ? (
                    <p className="global_text text-gray-700 mt-4 leading-relaxed text-sm sm:text-base md:text-lg">
                      {step.desc}
                    </p>
                  ) : (
                    <p className="global_text text-gray-700 mt-4 leading-relaxed block lg:hidden text-sm sm:text-base md:text-lg">
                      {step.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Enrole;
