import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Drawer } from "antd";
import { RiMenu3Fill, RiArrowDownSLine } from "react-icons/ri";
import logo from "../assets/accenlearn-logo.png";
import AdvancedApplyPopup from "./AdvancedApplyPopup";

const MAIN_URL = import.meta.env.VITE_MAIN_WEBSITE_URL || "https://accenlearn.in";

const NAV_LINKS = [
  {
    name: "Tech/IT Programs", 
    path: `${MAIN_URL}/programs/tech-it`,
    subItems: [
      { name: "Artificial Intelligence", path: `${MAIN_URL}/programs/tech/artificial-intelligence` },
      { name: "Data Structures and Algorithms", path: `${MAIN_URL}/programs/tech/data-structures-and-algorithms` },
      { name: "Full Stack Software Development", path: `${MAIN_URL}/programs/tech/full-stack-software-development` },
      { name: "Machine Learning", path: `${MAIN_URL}/programs/tech/machine-learning` },
      { name: "Data Science", path: `${MAIN_URL}/programs/tech/data-science` },
      { name: "Cloud Computing", path: `${MAIN_URL}/programs/tech/cloud-computing` },
      { name: "Cyber Security", path: `${MAIN_URL}/programs/tech/cyber-security` },
      { name: "Data Analytics", path: `${MAIN_URL}/programs/tech/data-analytics` },
      { name: "DevOps", path: `${MAIN_URL}/programs/tech/devops` },
      { name: "SQL", path: `${MAIN_URL}/programs/tech/sql` },
    ]
  },
  {
    name: "Management Programs",
    path: `${MAIN_URL}/programs/management`,
    subItems: [
      { name: "Digital Marketing", path: `${MAIN_URL}/programs/management/digital-marketing` },
      { name: "Human Resource", path: `${MAIN_URL}/programs/management/human-resource` },
      { name: "Finance", path: `${MAIN_URL}/programs/management/finance` },
      { name: "Business Analytics", path: `${MAIN_URL}/programs/management/business-analytics` },
      { name: "Stock Market", path: `${MAIN_URL}/programs/management/stock-market` },
      { name: "Graphics Designing", path: `${MAIN_URL}/programs/management/graphics-designing` },
    ]
  },
  {
    name: "Medical Programs",
    path: `${MAIN_URL}/programs/medical`,
    subItems: [
      { name: "Psychology", path: `${MAIN_URL}/programs/medical/psychology` },
      { name: "Medical Coding", path: `${MAIN_URL}/programs/medical/medical-coding` }
    ]
  },
  { 
    name: "Our Team", 
    subItems: [
      { name: "Mentor", path: `${MAIN_URL}/mentor` },
      { name: "Leadership", path: `${MAIN_URL}/leadership` },
      { name: "Collaboration", path: `${MAIN_URL}/collaboration` }
    ]
  },
  { 
    name: "Resources", 
    subItems: [
      { name: "Blogs", path: `${MAIN_URL}/resources/blogs` },
      { name: "FAQ", path: `${MAIN_URL}/resources/faq` },
      { name: "Resume Templates", path: `${MAIN_URL}/resources/resume-templates` }
    ]
  },
  { name: "Contact", path: `${MAIN_URL}/contact` },
];

const CustomLink = ({ to, children, className, ...props }) => {
  if (to && (to.startsWith("http") || to.startsWith(MAIN_URL))) {
    return (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleGetStartedClick = () => {
    setShowPopup(true);
  };

  const isTechPage = location.pathname === "/programs/tech-it" || location.pathname === "/programs/management" || location.pathname === "/programs/medical";
  const forceSolidBg = isScrolled || isTechPage;

  const textColor = "text-slate-800 hover:text-blue-600";
  const loginTextColor = "text-slate-800 hover:text-blue-600";
  const underlineBg = "bg-blue-600";

  return (
    <>
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out select-none bg-[rgba(255,255,255,0.92)] backdrop-blur-md ${
        isScrolled
          ? "py-3 shadow-md border-b border-gray-200"
          : "py-5 shadow-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div className="shrink-0 flex items-center">
          <Link to="/" className="focus:outline-none flex items-center group">
            <img
              src={logo}
              alt="ACCENLEARN Logo"
              className="w-auto h-[40px] sm:h-[48px] object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV_LINKS.map((item) => (
            item.subItems ? (
              <div key={item.name} className="relative group cursor-pointer h-10 flex items-center">
                {item.path ? (
                  <CustomLink to={item.path} className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 ${textColor}`}>
                    {item.name}
                    <RiArrowDownSLine className="transition-transform duration-200 group-hover:rotate-180" />
                    <span className={`absolute bottom-1 left-0 w-full h-[2px] ${underlineBg} rounded-full origin-left transition-transform duration-200 scale-x-0 group-hover:scale-x-100`} />
                  </CustomLink>
                ) : (
                  <div className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 ${textColor}`}>
                    {item.name}
                    <RiArrowDownSLine className="transition-transform duration-200 group-hover:rotate-180" />
                    <span className={`absolute bottom-1 left-0 w-full h-[2px] ${underlineBg} rounded-full origin-left transition-transform duration-200 scale-x-0 group-hover:scale-x-100`} />
                  </div>
                )}
                
                {/* Dropdown Menu */}
                <div className="absolute top-10 left-0 pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 py-2 overflow-hidden">
                    {item.subItems.map((subItem) => {
                      const isActive = location.pathname === subItem.path;
                      return (
                        <CustomLink
                          key={subItem.name}
                          to={subItem.path}
                          className={`block px-5 py-3 text-sm font-bold transition-all border-l-4 ${
                            isActive
                              ? "border-[#8cc63f] text-[#8cc63f] bg-slate-100/80"
                              : "border-transparent text-slate-700 hover:border-[#8cc63f] hover:text-[#8cc63f] hover:bg-slate-50"
                          }`}
                        >
                          {subItem.name}
                        </CustomLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <CustomLink
                key={item.name}
                to={item.path}
                className={`relative group flex items-center text-sm font-semibold transition-colors duration-200 ${textColor} h-10`}
              >
                {item.name}
                <span className={`absolute bottom-1 left-0 w-full h-[2px] ${underlineBg} rounded-full origin-left transition-transform duration-200 scale-x-0 group-hover:scale-x-100`} />
              </CustomLink>
            )
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/login"
            className={`text-sm font-bold transition-colors duration-200 ${loginTextColor}`}
          >
            Login
          </Link>
          <button
            onClick={handleGetStartedClick}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-[12px] text-sm font-semibold shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md focus:outline-none transition-colors text-slate-800 hover:text-blue-600 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <RiMenu3Fill className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        placement="right"
        styles={{
          body: { backgroundColor: "#ffffff", padding: "20px" },
          header: { backgroundColor: "#ffffff", borderBottom: "1px solid #f1f5f9", padding: "20px" },
        }}
        closeIcon={<span className="text-slate-600 text-xl">✕</span>}
        title={<span className="text-slate-900 font-bold text-lg">Menu</span>}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              item.subItems ? (
                <div key={item.name} className="flex flex-col">
                  <div className="text-slate-900 text-lg font-bold p-2">
                    {item.name}
                  </div>
                  <div className="flex flex-col ml-2 pl-4 border-l-2 border-slate-100 gap-2 mt-2">
                    {item.subItems.map((subItem) => (
                      <CustomLink
                        key={subItem.name}
                        to={subItem.path}
                        className="text-slate-600 hover:text-blue-600 text-base font-semibold p-2 rounded-lg hover:bg-slate-50 transition-all"
                        onClick={() => setMenuOpen(false)}
                      >
                        {subItem.name}
                      </CustomLink>
                    ))}
                  </div>
                </div>
              ) : (
                <CustomLink
                  key={item.name}
                  to={item.path}
                  className="text-slate-600 hover:text-blue-600 text-lg font-semibold p-2 rounded-lg hover:bg-slate-50 transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </CustomLink>
              )
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-slate-100">
            <Link
              to="/login"
              className="w-full text-center py-3 rounded-[12px] border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Login
            </Link>
            <button
              onClick={() => {
                handleGetStartedClick();
                setMenuOpen(false);
              }}
              className="w-full py-3 rounded-[12px] bg-blue-600 text-white font-bold shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </Drawer>
    </header>
    {showPopup && <AdvancedApplyPopup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Header;
