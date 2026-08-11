import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleText from "../../components/TitleText";
import TopImageCard from "../../components/TopImageCard";
import SwiperComponent from "../../components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import { COMPANY_IMAGES, IMAGE_HELPER } from "../../shared/ImageHelper";
import { FaMicrochip, FaBriefcase, FaHeartbeat } from "react-icons/fa";
import AdvancedApplyPopup from "../../components/AdvancedApplyPopup";

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

  const [activeCategory, setActiveCategory] = useState(WORKSHOP_CATEGORIES[0]);
  const [activeCourse, setActiveCourse] = useState(WORKSHOP_CATEGORIES[0].items[0]);
  const [showBrochurePopup, setShowBrochurePopup] = useState(false);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveCourse(category.items[0]);
  };

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

        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 mb-24 mt-10 font-sans">
          {/* Top Category Tabs */}
          <div className="flex bg-[#f3f4f6] p-1 mb-8">
            {WORKSHOP_CATEGORIES.map((category) => (
              <button
                key={category.title}
                onClick={() => handleCategoryChange(category)}
                className={`flex-1 py-4 px-2 sm:px-6 flex flex-col items-center justify-center transition-all duration-300 relative ${
                  activeCategory.title === category.title
                    ? "bg-white text-black font-semibold shadow-sm border-t-[3px] border-black"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-t-[3px] border-transparent"
                }`}
              >
                <span className="text-base font-bold">{category.title}</span>
                <span className="text-xs font-normal mt-1 text-gray-500">Curated modules · Live practice</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left Sidebar (Courses) */}
            <div className="w-full lg:w-[280px] flex flex-col border border-gray-200 bg-white">
              {activeCategory.items.map((course) => (
                <button
                  key={course}
                  onClick={() => setActiveCourse(course)}
                  className={`text-left px-6 py-5 text-sm transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
                    activeCourse === course
                      ? "bg-gray-50 text-black font-bold border-l-[4px] border-[#041A4C]"
                      : "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-800 border-l-[4px] border-transparent"
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>

            {/* Right Content Area */}
            <div className="w-full lg:flex-1">
              <div className="bg-[#031540] p-8 sm:p-10 h-full flex flex-col justify-between font-sans">
                
                <div className="relative z-10">
                  <p className="text-[#84a3eb] font-bold tracking-widest text-[11px] mb-4 uppercase">For Professionals Building Skills</p>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 border-b border-[#1c2e5e] pb-8 mb-8">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{activeCourse}</h2>
                      <div className="inline-block bg-white text-[#031540] text-[11px] font-bold px-3 py-1 uppercase tracking-wider">
                        With A New Specialization
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-[#f3ca56]">
                          <span className="text-3xl font-light">(</span>
                          <span className="text-3xl font-bold">4.8+</span>
                          <span className="text-xl">★</span>
                          <span className="text-3xl font-light">)</span>
                        </div>
                        <p className="text-[#84a3eb] text-[11px] mt-1">(25K+ Ratings)</p>
                      </div>
                      <div className="w-px h-12 bg-[#1c2e5e]"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">12</span>
                        <p className="text-[#84a3eb] text-[13px] mt-1">Months</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-[#84a3eb] font-bold tracking-widest text-[11px] uppercase mb-6">What You'll Build</h3>
                  
                  <ul className="space-y-5">
                    <li className="flex gap-4">
                      <span className="text-[#84a3eb] font-bold text-base mt-0.5">01</span>
                      <p className="text-[#cbd5e1] leading-relaxed text-sm">
                        <strong className="text-white font-semibold">Core Fundamentals:</strong> Master the essential concepts of {activeCourse}, building a foundation required by top tech companies and product interviews.
                      </p>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[#84a3eb] font-bold text-base mt-0.5">02</span>
                      <p className="text-[#cbd5e1] leading-relaxed text-sm">
                        <strong className="text-white font-semibold">Hands-on Projects & Labs:</strong> Apply your learning through real-world labs, live assignments, and pair-programming with expert mentors.
                      </p>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[#84a3eb] font-bold text-base mt-0.5">03</span>
                      <p className="text-[#cbd5e1] leading-relaxed text-sm">
                        <strong className="text-white font-semibold">Industry Specialization:</strong> Build, evaluate, and ship production-ready systems from discovery and scoping to end-to-end deployment.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <div className="bg-[#112455] rounded p-6 relative overflow-hidden mb-6">
                    <h4 className="text-[#84a3eb] font-bold tracking-widest text-[10px] uppercase mb-2">Why This Program?</h4>
                    <p className="text-white text-sm w-3/4 leading-relaxed">
                      Expert mentors who build scalable systems that can reason, act, and execute tasks across tools and workflows.
                    </p>
                    {/* Abstract asterisk shape */}
                    <div className="absolute -bottom-4 -right-4 text-[#0d6efd] text-9xl opacity-50 font-black leading-none">*</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleRedirect(activeCategory.slug, activeCourse)}
                      className="flex-1 bg-white text-[#031540] hover:bg-gray-100 py-3 px-6 font-bold text-sm tracking-wider uppercase transition-colors"
                    >
                      Go To Program
                    </button>
                    <button 
                      onClick={() => setShowBrochurePopup(true)}
                      className="flex-1 bg-[#0d6efd] text-white hover:bg-blue-600 py-3 px-6 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      Download Brochure
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
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
      {/* certificates */}
      <div className="relative mt-20 pt-16 pb-32 w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden bg-slate-50">
        <div className="relative z-10 flex flex-col items-center gap-2 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">Certify your Success</h2>
        </div>
        
        {/* SVG Wave Background */}
        <div className="absolute top-[40%] left-0 w-full h-[60%]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path fill="#232338" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,176C672,139,768,85,864,80C960,75,1056,117,1152,144C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto px-4 sm:px-6">
          <div data-aos="fade-right" className="group cursor-pointer">
            <img 
              src={IMAGE_HELPER?.WORKSHOP} 
              className="rounded-lg w-full h-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 border-[6px] border-white" 
            />
          </div>
          <div data-aos="fade-left" className="group cursor-pointer">
            <img 
              src={IMAGE_HELPER?.TRAINING} 
              className="rounded-lg w-full h-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 border-[6px] border-white" 
            />
          </div>
        </div>
      </div>
      {/* 300+ Alumni Placed At Leading Companies */}
      <div className="flex flex-col items-center gap-2">
        <TitleText
          title="300+ Alumni Placed At Leading Companies"
          description="Over 300+ successful alumni from our programs have secured placements across top companies and fast-growing organizations who have turned their learning into successful careers with the support of industry-aligned training and placement assistance."
        />

        <div className="w-[100vw] overflow-hidden mt-12 relative left-1/2 -translate-x-1/2 flex flex-col gap-8">
          {/* Gradient overlays for seamless edges */}
          <div className="absolute left-0 top-0 w-16 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee flex gap-12 md:gap-20 items-center" style={{ animationDuration: '50s' }}>
            {[...COMPANY_IMAGES, ...COMPANY_IMAGES].map((res, index) => (
              <img
                key={`row1-${res.img}-${index}`}
                src={res.img}
                alt="Alumni Company"
                className="w-24 md:w-32 h-12 md:h-16 object-contain transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>

          <div className="animate-marquee flex gap-12 md:gap-20 items-center" style={{ animationDuration: '60s', animationDirection: 'reverse' }}>
            {[...COMPANY_IMAGES.slice().reverse(), ...COMPANY_IMAGES.slice().reverse()].map((res, index) => (
              <img
                key={`row2-${res.img}-${index}`}
                src={res.img}
                alt="Alumni Company"
                className="w-24 md:w-32 h-12 md:h-16 object-contain transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>

      {showBrochurePopup && (
        <AdvancedApplyPopup 
          onClose={() => setShowBrochurePopup(false)} 
          onSuccess={() => setShowBrochurePopup(false)}
          popupType="brochure"
          initialDomain={activeCourse}
        />
      )}
      </div>
  );
};

export default Workshop;
