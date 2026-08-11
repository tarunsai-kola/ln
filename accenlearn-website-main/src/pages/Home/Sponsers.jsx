import React from "react";
import { ACCENLEARN_PROVIDES_DATA, SPONSERS_DATA } from "../../shared/data";
import TitleText from "../../components/TitleText";
import LeftImageCard from "../../components/LeftImageCard";
import { COMPANY_IMAGES } from "../../shared/ImageHelper";
import _ from "lodash";
import providesMentorImg from "../../assets/provides_mentor.png";
import providesPathImg from "../../assets/provides_path.png";
import providesTrainingImg from "../../assets/provides_training.png";

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
          title={<>Get Hired by Top Brands <br className="sm:hidden md:block lg:hidden" /> Backed by 250+ Hiring Partners</>}
          underline={false}
        />

        <div className="overflow-hidden w-full relative py-4">
          <div className="animate-marquee gap-8 sm:gap-12 opacity-90 w-max items-center" style={{ animationDuration: '30s' }}>
            {[...COMPANY_IMAGES, ...COMPANY_IMAGES].map((res, index) => (
              <img
                key={index}
                src={res.img}
                alt=""
                className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] object-contain shrink-0"
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full relative mt-3 sm:mt-4 py-4">
          <div className="animate-marquee gap-8 sm:gap-12 opacity-90 w-max items-center" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
            {[...COMPANY_IMAGES, ...COMPANY_IMAGES].map((res, index) => (
              <img
                key={`rev-${index}`}
                src={res.img}
                alt=""
                className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] object-contain shrink-0"
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
            
            {/* Card 1: Mentorship */}
            <div data-aos="fade-up" className="relative h-64 sm:h-72 rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <img src={providesMentorImg} alt="Expert Mentorship" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-bold text-white text-2xl mb-2 group-hover:-translate-y-1 transition-transform duration-300">Expert Mentorship</h3>
                <p className="text-slate-200 text-sm sm:text-base opacity-90 group-hover:-translate-y-1 transition-transform duration-300 delay-75">Get mentored by top professionals in the field.</p>
              </div>
            </div>

            {/* Card 2: Customized Paths */}
            <div data-aos="fade-up" data-aos-delay="100" className="relative h-64 sm:h-72 rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <img src={providesPathImg} alt="Customized Paths" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-bold text-white text-2xl mb-2 group-hover:-translate-y-1 transition-transform duration-300">Customized Paths</h3>
                <p className="text-slate-200 text-sm sm:text-base opacity-90 group-hover:-translate-y-1 transition-transform duration-300 delay-75">Programs customized to match your goals and ambitions.</p>
              </div>
            </div>

            {/* Card 3: Industrial Training */}
            <div data-aos="fade-up" className="relative h-64 sm:h-72 rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <img src={providesTrainingImg} alt="Industrial Training" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-bold text-white text-2xl mb-2 group-hover:-translate-y-1 transition-transform duration-300">Industrial Training</h3>
                <p className="text-slate-200 text-sm sm:text-base opacity-90 group-hover:-translate-y-1 transition-transform duration-300 delay-75">Skills designed to meet market and MNC standards.</p>
              </div>
            </div>

            {/* Card 4: Proven Success */}
            <div data-aos="fade-up" data-aos-delay="100" className="relative h-64 sm:h-72 rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Proven Success" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-bold text-white text-2xl mb-2 group-hover:-translate-y-1 transition-transform duration-300">Proven Success</h3>
                <p className="text-slate-200 text-sm sm:text-base opacity-90 group-hover:-translate-y-1 transition-transform duration-300 delay-75">Alumni excelling in leading global companies.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsers;
