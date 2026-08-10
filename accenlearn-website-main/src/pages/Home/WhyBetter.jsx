import React from "react";
import TitleText from "../../components/TitleText";
import { WHY_BETTER_DATA } from "../../shared/data";

const WhyBetter = () => {
  return (
    <div className="w-full flex flex-col gap-6 lg:gap-10 ">
      <TitleText
        title="Why Accenlearn is 10X Better?"
        description="We blend industry-grade curriculum, expert mentorship, and placement support so every learner moves faster from classroom to career."
        
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {WHY_BETTER_DATA.map((res, index) => {
          const Icon = res?.icon;

          return (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden bg-white rounded-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform p-6 sm:p-8 md:p-10 w-full"
            >
              <span className="absolute top-4 left-4 z-0 h-32 w-32 rounded-full bg-secondary opacity-75 transition-all duration-500 transform group-hover:scale-[20]" />
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-24 w-24 place-items-center rounded-full bg-white transition-all duration-500 transform group-hover:bg-white">
                  <Icon size={50} className="!text-secondary" />
                </span>
                <div className="space-y-6 pt-6 text-lg leading-8 text-gray-700 transition-all duration-500 group-hover:text-white">
                  <p className="global_text font-semibold group-hover:!text-white">
                    {res?.title}
                  </p>
                </div>
                <div className="pt-6 text-lg font-semibold leading-7">
                  <p>
                    <span className="global_text transition-all !font-normal duration-500 group-hover:!text-white">
                      {res?.content}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyBetter;
