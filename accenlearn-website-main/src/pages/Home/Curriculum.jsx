import React, { useMemo } from "react";
import TitleText from "../../components/TitleText";
import { COMPANY_IMAGES } from "../../shared/ImageHelper";
import _ from "lodash";

const Curriculum = () => {
  const shuffledImages = useMemo(() => _.shuffle(COMPANY_IMAGES), []);

  return (
    <div className="w-full">
      <TitleText title="Curriculum Designed by Top Industry Leaders" />
      <p
        className="global_text px-4 lg:px-0 !text-center lg:!text-center !w-full pb-10"
        data-aos="fade-up"
      >
        Our curriculum is thoughtfully crafted by{" "}
        <b>
          top industry leaders and <br className="hidden md:inline" /> subject-matter experts{" "}
        </b>{" "}
        to ensure learners gain <b>real-world, job-ready skills.</b>
      </p>
      <div className="flex flex-wrap gap-4 items-center justify-center w-full">
        {shuffledImages.map((res, index) => (
            <button
              key={index}
              type="button"
              data-aos={"fade-up"} 
              className="p-4 sm:p-5 rounded-2xl sm:rounded-full backdrop-blur-lg border border-gray-100 bg-white shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer group relative overflow-hidden shrink-0"
            >
              <div
                className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
              />
              <div className="relative z-10">
                <img src={res?.img} className="!size-[50px] sm:!size-[60px] object-contain mix-blend-darken" alt="Partner Logo" loading="lazy" />
              </div>
            </button>
          ))}
      </div>
      <div className="flex flex-col gap-6 overflow-hidden">

      </div>

    </div>
  );
};

export default Curriculum;
