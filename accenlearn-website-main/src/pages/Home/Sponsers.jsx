import React from "react";
import { ACCENLEARN_PROVIDES_DATA, SPONSERS_DATA } from "../../shared/data";
import TitleText from "../../components/TitleText";
import LeftImageCard from "../../components/LeftImageCard";
import { COMPANY_IMAGES } from "../../shared/ImageHelper";
import _ from "lodash";

const Sponsers = () => {

  return (
    <div className="w-full max-w-full overflow-hidden space-y-12 sm:space-y-16 py-6 sm:py-8">
      {/* We are accredited by */}
      <div className="w-full">
        <TitleText title="We are accredited by" underline={false} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full h-full gap-4 sm:gap-6 justify-center items-center">
          {SPONSERS_DATA?.map((res, index) => (
            <div
              data-aos="fade-up"
              key={index}
              className="flex justify-center items-center w-full"
            >
              <img
                src={res.pic}
                alt={res.title}
                className="w-full h-[140px] sm:h-[180px] object-contain rounded-2xl shadow-sm bg-white p-2 border border-gray-100"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <TitleText
          title={<>Get Hired by Top Brands <br className="sm:hidden md:block lg:hidden" /> Backed by 50+ Hiring Partners</>}
          underline={false}
        />

        <div className="marquee marquee-left w-full">
          <div className="marquee-track">
            {[...COMPANY_IMAGES, ...COMPANY_IMAGES].map((res, index) => (
              <img
                key={index}
                src={res.img}
                alt=""
                className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] object-contain rounded-2xl p-2 !bg-white border border-gray-100 shadow-xs shrink-0"
              />
            ))}
          </div>
        </div>

        <div className="marquee marquee-right mt-3 sm:mt-4 w-full">
          <div className="marquee-track">
            {[...COMPANY_IMAGES, ...COMPANY_IMAGES].map((res, index) => (
              <img
                key={index}
                src={res.img}
                alt=""
                className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] object-contain rounded-2xl p-2 !bg-white border border-gray-100 shadow-xs shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden rounded-3xl w-full py-6 lg:py-12">
        <div className="relative mx-auto flex flex-col gap-6 sm:gap-8 w-full">
          <TitleText
            title="ACCENLEARN PROVIDES"
            description={
              <div>
                Industry-aligned paths, mentor support, and portfolio-ready work to help you move faster from learning to landing opportunities.
              </div>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
            {ACCENLEARN_PROVIDES_DATA?.map((res, index) => (
              <div data-aos="fade-up" key={index} className="h-full w-full">
                <LeftImageCard res={res} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsers;
