import React from "react";
import { Divider } from "antd";
import { BackgroundButton } from "../components/Button";
import { LuMailQuestion } from "react-icons/lu";
import { CONTACT_INFO, NAV_ITEMS, PROGRAMS_DATA, SOCIAL_ITEMS } from "../shared/data";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  // Get workshops item from NAV_ITEMS (now renamed to Programs)
  const workshopsItem = NAV_ITEMS.find(item => item.name === "Programs");

  return (
    <div className="w-full text-white rounded-t-4xl relative overflow-hidden" style={{ backgroundColor: "#3d9aa3" }}>
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
              <BackgroundButton Icon={LuMailQuestion} text={"Enquire Now"} onClick={() => navigate("/internship")} />
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
                className="bg-transparent border-none outline-none px-3.5 py-2 text-primary placeholder:text-gray-500 flex-grow text-xs sm:text-sm w-full min-h-[44px] sm:min-h-[48px]"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-5 py-2 rounded-xl font-bold transition-all text-xs sm:text-sm shadow-lg shrink-0 min-h-[44px] sm:min-h-[48px] flex items-center justify-center">
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
                <Link
                  key={item.id}
                  to={item.link}
                  className={`${
                    item.id === 1 ? "!text-white font-bold" : "text-white/80"
                    } hover:text-white transition-all flex items-center gap-x-2 group text-xs sm:text-sm`}
                >
                  <span className="capitalize group-hover:translate-x-1 transition-all">
                    {item.text?.toLowerCase()}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h1 className="text-base sm:text-lg font-bold mb-2">Quick Links</h1>
            <div className="flex flex-col gap-y-1 sm:gap-y-1.5">
              {NAV_ITEMS.filter(item => !item.children).map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="text-white/80 hover:text-white transition-all flex items-center gap-x-2 group text-xs sm:text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-all">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tech/IT Programs */}
          {workshopsItem?.children && (
            <div>
              <h1 className="text-base sm:text-lg font-bold mb-2">Tech/IT Programs</h1>
              <div className="flex flex-col gap-y-1 sm:gap-y-1.5">
                {workshopsItem.children[0]?.children?.map((subItem) => (
                  <Link
                    key={subItem.id}
                    to={subItem.link}
                    className="text-white/80 hover:text-white transition-all flex items-center gap-x-2 group text-xs sm:text-sm"
                  >
                    <span className="group-hover:translate-x-1 transition-all">
                      {subItem.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Management & Medical Programs */}
          {workshopsItem?.children && (
            <div>
              <h1 className="text-base sm:text-lg font-bold mb-2">Other Programs</h1>
              <div className="flex flex-col gap-y-1 sm:gap-y-1.5">
                {workshopsItem.children.slice(1).map((category) => (
                  <div key={category.id} className="mb-2.5">
                    <h2 className="text-white font-semibold mb-1 text-xs sm:text-sm">{category.name}</h2>
                    <div className="flex flex-col gap-y-1 pl-2">
                      {category.children?.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.link}
                          className="text-white/80 hover:text-white transition-all flex items-center gap-x-2 group text-[11px] sm:text-xs"
                        >
                          <span className="group-hover:translate-x-1 transition-all">
                            {subItem.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-24 pb-4 mt-2">
        <Divider className="!bg-white/60 !my-2" />
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
