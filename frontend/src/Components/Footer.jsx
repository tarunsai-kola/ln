import React from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaPhone, FaEnvelope, FaQuestionCircle } from "react-icons/fa";

const MAIN_URL = import.meta.env.VITE_MAIN_WEBSITE_URL || "https://accenlearn.in";

const CONTACT_INFO = [
  { id: 1, icon: FaPhone, value: "+91 9344322482" },
  { id: 2, icon: FaEnvelope, value: "accenlearn@gmail.com" },
];

const SOCIAL_ITEMS = [
  { id: 1, icon: FaInstagram, name: "Instagram", link: "https://www.instagram.com/accenlearn/" },
  { id: 2, icon: FaLinkedin, name: "LinkedIn", link: "https://www.linkedin.com/company/accenlearn" },
  { id: 3, icon: FaFacebook, name: "Facebook", link: "https://www.facebook.com/share/1BWbrXqtvS/" },
];

const PROGRAMS_DATA = [
  { id: 1, text: "LIVE & ONLINE CLASSES" },
  { id: 2, text: "EXPERT - LED TRAINING" },
  { id: 3, text: "PRACTICAL EXPERIENCE" },
  { id: 4, text: "CONNECT AND COLLABORATE" },
];

const QUICK_LINKS = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/about" },
  { id: 4, name: "Contact", link: "/contact" },
];

const TECH_PROGRAMS = [
  { id: 1, name: "Artificial Intelligence", link: "/programs/tech/artificial-intelligence" },
  { id: 2, name: "Data Structures and Algorithms", link: "/programs/tech/data-structures-and-algorithms" },
  { id: 3, name: "Full Stack Software Development", link: "/programs/tech/full-stack-software-development" },
  { id: 4, name: "Machine Learning", link: "/programs/tech/machine-learning" },
  { id: 5, name: "Data Science", link: "/programs/tech/data-science" },
  { id: 7, name: "Cloud Computing", link: "/programs/tech/cloud-computing" },
  { id: 8, name: "Cyber Security", link: "/programs/tech/cyber-security" },
  { id: 9, name: "Data Analytics", link: "/programs/tech/data-analytics" },
  { id: 10, name: "DevOps", link: "/programs/tech/devops" },
  { id: 11, name: "SQL", link: "/programs/tech/sql" },
];

const OTHER_PROGRAMS = [
  {
    id: 2,
    name: "Management Programs",
    children: [
      { id: 1, name: "Digital Marketing", link: "/programs/management/digital-marketing" },
      { id: 2, name: "Human Resource", link: "/programs/management/human-resource" },
      { id: 3, name: "Finance", link: "/programs/management/finance" },
      { id: 4, name: "Business Analytics", link: "/programs/management/business-analytics" },
      { id: 5, name: "Stock Market", link: "/programs/management/stock-market" },
      { id: 6, name: "Graphics Designing", link: "/programs/management/graphics-designing" },
    ]
  },
  {
    id: 3,
    name: "Medical Programs",
    children: [
      { id: 1, name: "Psychology", link: "/programs/medical/psychology" },
      { id: 2, name: "Medical Coding", link: "/programs/medical/medical-coding" }
    ]
  }
];

const BackgroundButton = ({ text, onClick, Icon }) => {
  return (
    <button
      className="bg-[#7ccf00] !cursor-pointer shadow-lg text-white px-4 sm:px-5 py-2.5 sm:py-3 min-h-[48px] rounded-full font-bold flex items-center justify-center gap-x-1.5 sm:gap-x-2 text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0 transition-all hover:bg-[#080331] active:scale-95"
      onClick={onClick}
    >
      {Icon && <Icon className="inline-block !text-base sm:!text-lg flex-shrink-0" />}
      {text}
    </button>
  );
};

const Footer = () => {
  return (
    <div className="w-full text-white rounded-t-[36px] relative overflow-hidden" style={{ backgroundColor: "#3d9aa3", marginTop: "auto" }}>
      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 mb-6">
          <div className="lg:max-w-[400px]">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug drop-shadow-md text-white">
              Take the First Step <br /> Towards Mastery!
            </h1>
            <p className="mt-2.5 max-w-[420px] text-xs sm:text-sm opacity-90 leading-relaxed text-white">
              Join thousands of learners gaining in-demand skills through
              expert-led courses. Grow at your own pace, earn certificates, and
              level up your future.
            </p>

            <div className="mt-4 cursor-pointer hover:scale-105 transition-transform duration-300 text-white inline-block">
              <BackgroundButton Icon={FaQuestionCircle} text={"Enquire Now"} onClick={() => window.location.href = `${MAIN_URL}/internship`} />
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:mt-0">
            <h1 className="text-base sm:text-lg font-bold mb-2 text-white">Contact Us</h1>
            {CONTACT_INFO.map((res) => (
              <div
                key={res.id}
                className="mt-1.5 flex items-center gap-x-2 sm:gap-x-3 opacity-90 hover:opacity-100 transition-all"
              >
                <res.icon size={15} className="inline-block flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">{res.value}</span>
              </div>
            ))}
          </div>

          {/* Stay Updated */}
          <div className="lg:mt-0 max-w-md">
            <h1 className="text-base sm:text-lg font-bold mb-2 text-white">Stay Updated</h1>
            <div className="flex items-center bg-white rounded-2xl overflow-hidden p-1 shadow-inner">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none px-3.5 py-2 text-[#080331] placeholder:text-gray-500 flex-grow text-xs sm:text-sm w-full min-h-[44px] sm:min-h-[48px]"
              />
              <button className="bg-[#080331] hover:bg-[#080331]/90 text-white px-4 sm:px-5 py-2 rounded-xl font-bold transition-all text-xs sm:text-sm shadow-lg shrink-0 min-h-[44px] sm:min-h-[48px] flex items-center justify-center">
                Subscribe
              </button>
            </div>

            {/* Social Media Logos */}
            <div className="mt-6 flex items-center gap-x-2 sm:gap-x-4">
              {SOCIAL_ITEMS.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-all duration-300 hover:scale-125 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full hover:bg-white/10"
                  aria-label={social.name}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 pt-4">
          {/* Programs */}
          <div>
            <h1 className="text-base sm:text-lg font-bold mb-2">Programs</h1>
            <div className="flex flex-col gap-y-1 sm:gap-y-1.5">
              {PROGRAMS_DATA.map((item) => (
                <a
                  key={item.id}
                  href={`${MAIN_URL}/programs/tech/artificial-intelligence`}
                  className={`${
                    item.id === 1 ? "!text-white font-bold" : "text-white/80"
                  } hover:text-white transition-all flex items-center gap-x-2 group text-xs sm:text-sm`}
                >
                  <span className="capitalize group-hover:translate-x-1 transition-all">
                    {item.text?.toLowerCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h1 className="text-base sm:text-lg font-bold mb-2">Quick Links</h1>
            <div className="flex flex-col gap-y-1 sm:gap-y-1.5">
              {QUICK_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={`${MAIN_URL}${item.link}`}
                  className="text-white/80 hover:text-white transition-all flex items-center gap-x-2 group text-xs sm:text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-all">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Tech/IT Programs */}
          <div>
            <h1 className="text-base sm:text-lg font-bold mb-2">Tech/IT Programs</h1>
            <div className="flex flex-col gap-y-1 sm:gap-y-1.5">
              {TECH_PROGRAMS.map((subItem) => (
                <a
                  key={subItem.id}
                  href={`${MAIN_URL}${subItem.link}`}
                  className="text-white/80 hover:text-white transition-all flex items-center gap-x-2 group text-xs sm:text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-all">
                    {subItem.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Management & Medical Programs */}
          <div>
            <h1 className="text-base sm:text-lg font-bold mb-2">Other Programs</h1>
            <div className="flex flex-col gap-y-1 sm:gap-y-1.5">
              {OTHER_PROGRAMS.map((category) => (
                <div key={category.id} className="mb-2.5">
                  <h2 className="text-white font-semibold mb-1 text-xs sm:text-sm">{category.name}</h2>
                  <div className="flex flex-col gap-y-1 pl-2">
                    {category.children?.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={`${MAIN_URL}${subItem.link}`}
                        className="text-white/80 hover:text-white transition-all flex items-center gap-x-2 group text-[11px] sm:text-xs"
                      >
                        <span className="group-hover:translate-x-1 transition-all">
                          {subItem.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-24 pb-4 mt-2">
        <div className="w-full h-[1px] bg-white/60 my-2"></div>
        <div className="py-1 text-center opacity-90">
          <h1 className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} ACCENLEARN. All Rights Reserved.
            Empowering Learning Worldwide.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
