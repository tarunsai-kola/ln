import React from "react";
import { ACCENLEARN_PROVIDES_DATA, SPONSERS_DATA } from "../../shared/data";
import TitleText from "../../components/TitleText";
import { COMPANY_IMAGES } from "../../shared/ImageHelper";
import JobReadiness from "./JobReadiness";

// Assets for ACCENLEARN PROVIDES
import providesPathImg from "../../assets/provides_path.png";
import providesTrainingImg from "../../assets/provides_training.png";
import strengthProjectsImg from "../../assets/strength_projects.png";
import providesMentorImg from "../../assets/provides_mentor.png";
import providesHiringImg from "../../assets/provides_hiring.jpg";
import strengthPlacementImg from "../../assets/strength_placement.png";

// Icons
import {
  HiSparkles,
  HiAcademicCap,
  HiCommandLine,
  HiChatBubbleLeftRight,
  HiDocumentCheck,
  HiTrophy,
  HiArrowUpRight,
} from "react-icons/hi2";

const PROVIDES_SERVICES = [
  {
    id: 1,
    tag: "Career Pathways",
    title: "Choose Your Path",
    description: "Pick a career-focused program in Tech, Management, or Healthcare.",
    image: providesPathImg,
    icon: HiSparkles,
    accent: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    tag: "Live Mentorship",
    title: "Learn With Experts",
    description: "Attend live and recorded sessions led by industry professionals.",
    image: providesTrainingImg,
    icon: HiAcademicCap,
    accent: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    tag: "Hands-on Labs",
    title: "Build Real Projects",
    description: "Create practical, portfolio-ready work through labs and assignments.",
    image: strengthProjectsImg,
    icon: HiCommandLine,
    accent: "from-emerald-500 to-teal-400",
  },
  {
    id: 4,
    tag: "1-on-1 Guidance",
    title: "Get Mentor Support",
    description: "Resolve doubts and improve through one-to-one guidance and feedback.",
    image: providesMentorImg,
    icon: HiChatBubbleLeftRight,
    accent: "from-amber-500 to-orange-400",
  },
  {
    id: 5,
    tag: "Career Readiness",
    title: "Prepare for Hiring",
    description: "Improve your resume, portfolio, communication, and interview skills.",
    image: providesHiringImg,
    icon: HiDocumentCheck,
    accent: "from-rose-500 to-pink-500",
  },
  {
    id: 6,
    tag: "Hiring Network",
    title: "Get Placement Support",
    description: "Access career guidance and opportunities through AccenLearn’s hiring network.",
    image: strengthPlacementImg,
    icon: HiTrophy,
    accent: "from-emerald-400 to-cyan-500",
  },
];

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

      {/* What It Really Takes to Get a Job Section */}
      <JobReadiness />

      {/* ACCENLEARN PROVIDES Section */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 w-full">
            {PROVIDES_SERVICES.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                  className="relative h-72 sm:h-80 rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer border border-slate-800/80 hover:border-white/30 flex flex-col justify-between"
                >
                  {/* Thematic Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 absolute inset-0"
                  />

                  {/* Multi-layered dark gradient overlay for crystal clear contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/35 backdrop-blur-[0.5px]"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-10 group-hover:opacity-25 transition-opacity duration-500`}></div>

                  {/* Top Badge & Step Pill */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-xl text-white text-xs font-semibold shadow-xs">
                      <Icon className="w-3.5 h-3.5 text-white" />
                      <span>{card.tag}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Bottom Title & Description */}
                  <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end">
                    <h3 className="font-bold text-white text-xl sm:text-2xl mb-2 group-hover:text-blue-300 transition-colors duration-300 flex items-center justify-between gap-2">
                      <span>{card.title}</span>
                      <HiArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-blue-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed opacity-95 group-hover:text-white transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Animated Hover Accent Strip */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${card.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left relative z-10`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsers;
