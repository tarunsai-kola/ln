import React from "react";
import { useNavigate } from "react-router-dom";
import TitleText from "../../components/TitleText";
import TopImageCard from "../../components/TopImageCard";
import SwiperComponent from "../../components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import { COMPANY_IMAGES, IMAGE_HELPER } from "../../shared/ImageHelper";
import { FaMicrochip, FaBriefcase, FaHeartbeat } from "react-icons/fa";

const WORKSHOP_CATEGORIES = [
  {
    title: "Tech/IT Programs",
    slug: "tech",
    accent: "from-primary to-secondary",
    icon: FaMicrochip,
    items: [
      "Artificial Intelligence",
      "Data Science",
      "Data Analytics",
      "Full Stack Software Development",
      "Data Structures and Algorithms",
      "Cyber Security",
      "DevOps",
      "Machine Learning",
      "SQL",
      "Cloud Computing",
    ],
  },
  {
    title: "Management Programs",
    slug: "management",
    accent: "from-secondary to-primary",
    icon: FaBriefcase,
    items: [
      "Human Resource",
      "Business Analytics",
      "Finance",
      "Stock Market",
      "Digital Marketing",
      "Graphics Designing",
    ],
  },
  {
    title: "Medical Programs",
    slug: "medical",
    accent: "from-primary to-secondary",
    icon: FaHeartbeat,
    items: ["Psychology", "Medical Coding"],
  },
];

const FEATURED_WORKSHOPS = [
  {
    title: "AI",
    content: "Design intelligent products with real-world case studies.",
    pic: "https://img.freepik.com/free-vector/flat-world-graphics-day-illustration_23-2148885267.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    title: "Machine Learning",
    content: "Train, evaluate, and ship ML models with production rigor.",
    pic: "https://img.freepik.com/premium-vector/machine-learning-model-training-concept-with-robot-arm-human-interacting-with-computer-screen-brain_48369-51325.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    title: "Data Structures & Algorithms",
    content: "Interview-ready problem solving with hands-on sprints.",
    pic: "https://img.freepik.com/free-vector/business-startup-project-launch-successful-idea_107791-13390.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    title: "Data Science",
    content: "One-line insights to impact: collect, analyze, and decide.",
    pic: "https://img.freepik.com/free-vector/illustration-data-analysis-graph_53876-18132.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    title: "MERN Stack Development",
    content: "Build full-stack apps from idea to deploy-ready product.",
    pic: "https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Stack_9437df2ba9_62af1dd3fc.png",
  },
  {
    title: "Digital Marketing",
    content: "Performance marketing playbooks with live campaign labs.",
    pic: "https://img.freepik.com/premium-vector/digital-marketing-illustration_112255-2905.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    title: "Cyber Security",
    content: "Secure, test, and defend systems through guided labs.",
    pic: "https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37368.jpg?semt=ais_hybrid&w=740&q=80",
  },
];

const Workshop = () => {
  const navigate = useNavigate();

  const handleRedirect = (categorySlug, itemName) => {
    const itemSlug = itemName.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
    navigate(`/programs/${categorySlug}/${itemSlug}`);
  };

  const handleGetStartedClick = () => {
    navigate("/internship");
  };

  return (
    <div className="w-full flex flex-col  ">

      <div className="">
        <div className="flex flex-col items-center gap-2">
          <TitleText title="Our Programs" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-20">
          {WORKSHOP_CATEGORIES.map((category) => (
            <div
              data-aos="fade-up"
              key={category.title}
              className="group h-full rounded-2xl border border-gray-100 bg-white p-5  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r text-white shadow ${category.accent}`}
                >
                  {category.icon && <category.icon size={24} />}
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">{category.title}</span>
                  <span className="text-xs uppercase tracking-wide text-gray-500">
                    Curated modules · Live practice
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 py-4">
                {category.items.map((item) => (
                  <span
                    key={item}
                    onClick={() => handleRedirect(category.slug, item)}
                    className="rounded border border-gray-200 bg-gray-50 px-5 py-4 !text-lg font-semibold text-gray-800 global_text cursor-pointer hover:bg-secondary/10 hover:border-secondary/30 hover:text-secondary transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <div className="flex flex-col items-center gap-2">
          <TitleText title="Our Featured Programs" />
        </div>

        <div className="">
            <SwiperComponent
              navigation={true}
              count={3}
              component={FEATURED_WORKSHOPS.map((res) => (
                <SwiperSlide key={res.title}>
                  <div data-aos="fade-up">
                    <TopImageCard res={res} handleGetStartedClick={handleGetStartedClick} />
                  </div>
                </SwiperSlide>
              ))}
            >
         </SwiperComponent>
        </div>
      </div>
      {/* centificates */}
      <div className="flex flex-col items-center gap-2 mt-10">
          <TitleText title="Earn a Government-Recognized accenlearn Certification" />
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 md:py-10 max-w-6xl mx-auto">
        <div data-aos="fade-right" className="group cursor-pointer">
          <img 
            src={IMAGE_HELPER?.WORKSHOP} 
            className="rounded-2xl w-full h-auto shadow-xl transition-all duration-500 hover:scale-[1.05] hover:rotate-1 hover:shadow-2xl border-4 border-transparent hover:border-secondary/20 animate__animated animate__pulse animate__infinite animate__slower" 
          />
        </div>
        <div data-aos="fade-left" className="group cursor-pointer">
          <img 
            src={IMAGE_HELPER?.TRAINING} 
            className="rounded-2xl w-full h-auto shadow-xl transition-all duration-500 hover:scale-[1.05] hover:rotate-1 hover:shadow-2xl border-4 border-transparent hover:border-primary/20 animate__animated animate__pulse animate__infinite animate__slower" 
          />
        </div>
      </div>
      {/* 300+ Alumni Placed At Leading Companies */}
      <div className="flex flex-col items-center gap-2">
        <TitleText
          title="300+ Alumni Placed At Leading Companies"
          description="Over 300+ successful alumni from our programs have secured placements across top companies and fast-growing organizations who have turned their learning into successful careers with the support of industry-aligned training and placement assistance."
        />

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {COMPANY_IMAGES.map((res) => (
            <img
              key={res.img}
              src={res.img}
              alt=""
              className="w-[100px] h-[100px] object-contain shadow-sm rounded-2xl bg-white p-2"
              data-aos="fade-up"
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Workshop;
