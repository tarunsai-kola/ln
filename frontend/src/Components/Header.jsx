import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaRunning,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPhone,
  FaMailBulk
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Drawer } from "antd";
import { RiMenu3Fill } from "react-icons/ri";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import logo from "../assets/accenlearn-logo.png";
import AdvancedApplyPopup from "./AdvancedApplyPopup";

const MAIN_URL = import.meta.env.VITE_MAIN_WEBSITE_URL || "http://localhost:5173";

export const CONTACT_INFO = [
  { id: 1, icon: FaPhone, type: "phone", value: "+91 9344322482" },
  { id: 2, icon: FaMailBulk, type: "email", value: "accenlearn@gmail.com" },
];

export const SOCIAL_ITEMS = [
  { id: 1, icon: FaInstagram, name: "Instagram", link: "https://www.instagram.com/accenlearn/" },
  { id: 2, icon: FaLinkedin, name: "LinkedIn", link: "https://www.linkedin.com/company/accenlearn" },
  { id: 3, icon: FaFacebook, name: "Facebook", link: "https://www.facebook.com/share/1BWbrXqtvS/" },
  { id: 5, icon: FaXTwitter, name: "X (Twitter)", link: "https://x.com/Accenlearn" },
];

export const NAV_ITEMS = [
  { id: 1, name: "Home", link: `${MAIN_URL}/` },
  { id: 2, name: "About", link: `${MAIN_URL}/about` },
  {
    id: 3,
    name: "Our Team",
    link: `${MAIN_URL}/mentor`,
    children: [
      { id: 1, name: "Mentor", link: `${MAIN_URL}/mentor` },
      { id: 2, name: "Leadership", link: `${MAIN_URL}/leadership` },
      { id: 3, name: "Collaboration", link: `${MAIN_URL}/collaboration` },
    ],
  },
  { id: 4, name: "Contact", link: `${MAIN_URL}/contact` },
  {
    id: 6,
    name: "Resources",
    link: `${MAIN_URL}/resources/blogs`,
    children: [
      { id: 1, name: "Blogs", link: `${MAIN_URL}/resources/blogs` },
      { id: 2, name: "FAQ", link: `${MAIN_URL}/resources/faq` },
      { id: 3, name: "Resume Templates", link: `${MAIN_URL}/resources/resume-templates` },
    ],
  },
  {
    id: 7,
    name: "Portals",
    link: "#",
    children: [
      { id: 1, name: "Student Portal", link: `/login` },
      { id: 2, name: "Admin Portal", link: `/AdminLogin` },
      { id: 3, name: "HR Portal", link: `/hrlogin` },
      { id: 4, name: "Operations Portal", link: `/OperationLogin` },
      { id: 5, name: "Marketing Portal", link: `/marketing/login` }
    ]
  },
  {
    id: 5,
    name: "Programs",
    link: `${MAIN_URL}/programs/tech/artificial-intelligence`,
    children: [
      {
        id: 1,
        name: "Tech/IT Programs",
        link: `${MAIN_URL}/programs/tech/artificial-intelligence`,
        children: [
          { id: 1, name: "Artificial Intelligence", link: `${MAIN_URL}/programs/tech/artificial-intelligence` },
          { id: 2, name: "Data Structures and Algorithms", link: `${MAIN_URL}/programs/tech/data-structures-and-algorithms` },
          { id: 3, name: "Full Stack Software Development", link: `${MAIN_URL}/programs/tech/full-stack-software-development` },
          { id: 4, name: "Machine Learning", link: `${MAIN_URL}/programs/tech/machine-learning` },
          { id: 5, name: "Data Science", link: `${MAIN_URL}/programs/tech/data-science` },
          { id: 7, name: "Cloud Computing", link: `${MAIN_URL}/programs/tech/cloud-computing` },
          { id: 8, name: "Cyber Security", link: `${MAIN_URL}/programs/tech/cyber-security` },
          { id: 9, name: "Data Analytics", link: `${MAIN_URL}/programs/tech/data-analytics` },
          { id: 10, name: "DevOps", link: `${MAIN_URL}/programs/tech/devops` },
          { id: 11, name: "SQL", link: `${MAIN_URL}/programs/tech/sql` }
        ]
      },
      {
        id: 2,
        name: "Management Programs",
        link: `${MAIN_URL}/programs/management/digital-marketing`,
        children: [
          { id: 1, name: "Digital Marketing", link: `${MAIN_URL}/programs/management/digital-marketing` },
          { id: 2, name: "Human Resource", link: `${MAIN_URL}/programs/management/human-resource` },
          { id: 3, name: "Finance", link: `${MAIN_URL}/programs/management/finance` },
          { id: 4, name: "Business Analytics", link: `${MAIN_URL}/programs/management/business-analytics` },
          { id: 5, name: "Stock Market", link: `${MAIN_URL}/programs/management/stock-market` },
          { id: 6, name: "Graphics Designing", link: `${MAIN_URL}/programs/management/graphics-designing` }
        ]
      },
      {
        id: 3,
        name: "Medical Programs",
        link: `${MAIN_URL}/programs/medical/psychology`,
        children: [
          { id: 1, name: "Psychology", link: `${MAIN_URL}/programs/medical/psychology` },
          { id: 2, name: "Medical Coding", link: `${MAIN_URL}/programs/medical/medical-coding` }
        ]
      }
    ]
  }
];

const NavLink = ({ to, children, ...props }) => {
  if (to && (to.startsWith("http") || to.startsWith(MAIN_URL))) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

const isItemActive = (item, currentPath) => {
  if (!item || !currentPath) return false;
  if (item.link === currentPath) return true;
  if (item.children) {
    return item.children.some((child) => {
      if (child.link === currentPath) return true;
      if (child.children) {
        return child.children.some((sub) => sub.link === currentPath);
      }
      return false;
    });
  }
  return false;
};

const isChildActive = (childLink, currentPath) => {
  if (!childLink || !currentPath) return false;
  return currentPath === childLink;
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [desktopActiveDropdown, setDesktopActiveDropdown] = useState(null);
  const [desktopActiveSubDropdown, setDesktopActiveSubDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const navRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      setDesktopActiveDropdown(null);
      setDesktopActiveSubDropdown(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDesktopActiveDropdown(null);
        setDesktopActiveSubDropdown(null);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDesktopActiveDropdown(null);
        setDesktopActiveSubDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setDesktopActiveDropdown(null);
    setDesktopActiveSubDropdown(null);
    setExpandedItems({});
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleGetStartedClick = () => {
    setShowPopup(true);
  };

  return (
    <>
    <header ref={navRef} className="w-full relative z-50 select-none">
      <div
        className={`absolute top-0 left-0 w-full bg-[#3d9aa3] transition-all duration-300 ease-out -z-10 ${
          isScrolled
            ? "h-0 opacity-0 rounded-none pointer-events-none"
            : "h-[142px] sm:h-[152px] lg:h-[162px] rounded-b-[36px] sm:rounded-b-[46px] lg:rounded-b-[52px] shadow-[0_10px_35px_rgba(61,154,163,0.35)] opacity-100"
        }`}
      />

      <div
        className={`w-full bg-transparent text-white transition-all duration-300 ease-out overflow-hidden ${
          isScrolled
            ? "max-h-0 py-0 opacity-0 -translate-y-full pointer-events-none"
            : "max-h-[50px] py-2 sm:py-2.5 opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-y-1 gap-x-3 sm:gap-x-4 flex-wrap sm:flex-nowrap">
            {CONTACT_INFO.map((res, index) => (
              <React.Fragment key={res.id}>
                <a
                  href={res.link || (res.value?.includes("@") ? `mailto:${res.value}` : `tel:${res.value}`)}
                  className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-200"
                >
                  <res.icon size={15} className="shrink-0 text-white" />
                  <span className="tracking-wide break-all sm:break-normal">{res.value}</span>
                </a>
                {index !== CONTACT_INFO.length - 1 && (
                  <span className="h-3.5 w-px bg-white/30 hidden sm:inline-block shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {SOCIAL_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <item.icon size={16} />
              </a>
            ))}
            <a
              href="https://www.youtube.com/@accenlearn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <FaYoutube size={17} />
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`w-full transition-all duration-300 ease-out px-3 sm:px-6 lg:px-8 ${
          isScrolled ? "pt-2 sm:pt-3" : "pt-2.5 sm:pt-3.5"
        }`}
      >
        <div
          className={`max-w-[1280px] mx-auto flex items-center justify-between transition-all duration-300 ease-out px-4 sm:px-6 lg:px-8 ${
            isScrolled
              ? "h-[64px] sm:h-[68px] bg-white/98 backdrop-blur-lg border border-gray-200/70 shadow-[0_12px_35px_rgba(0,0,0,0.1)] rounded-[18px] sm:rounded-[20px]"
              : "h-[70px] sm:h-[76px] bg-white/95 backdrop-blur-md border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[20px] sm:rounded-[22px]"
          }`}
        >
          <div className="shrink-0 flex items-center">
            <Link
              to="/"
              className="group focus:outline-none flex items-center"
              aria-label="Accenlearn Home"
            >
              <img
                src={logo}
                alt="ACCENLEARN Logo"
                className="w-auto h-[48px] sm:h-[52px] lg:h-[54px] object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-9 h-full">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item, currentPath);
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    if (item.children) {
                      setDesktopActiveDropdown(item.id);
                    }
                  }}
                  onMouseLeave={() => {
                    setDesktopActiveDropdown(null);
                    setDesktopActiveSubDropdown(null);
                  }}
                  className="relative group h-full flex items-center"
                >
                  <NavLink
                    to={item.link}
                    onClick={() => {
                      if (item.children) {
                        setDesktopActiveDropdown((prev) => (prev === item.id ? null : item.id));
                      }
                    }}
                    onKeyDown={(e) => {
                      if (item.children && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setDesktopActiveDropdown(item.id);
                      }
                    }}
                    onFocus={() => {
                      if (item.children) {
                        setDesktopActiveDropdown(item.id);
                      } else {
                        setDesktopActiveDropdown(null);
                        setDesktopActiveSubDropdown(null);
                      }
                    }}
                    aria-haspopup={item.children ? "true" : undefined}
                    aria-expanded={item.children ? desktopActiveDropdown === item.id : undefined}
                    className={`flex items-center gap-1.5 py-2 text-sm xl:text-base font-semibold transition-colors duration-200 relative focus:outline-none ${
                      active
                        ? "!text-[#7ccf00] font-bold"
                        : "text-gray-800 hover:!text-[#7ccf00]"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.children && (
                      <IoChevronDown
                        size={15}
                        className={`transition-transform duration-200 text-gray-500 group-hover:text-[#7ccf00] ${
                          desktopActiveDropdown === item.id ? "rotate-180 text-[#7ccf00]" : ""
                        }`}
                      />
                    )}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-[#7ccf00] rounded-full origin-left transition-transform duration-200 ease-out ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </NavLink>

                  {item.children && (
                    <div
                      className={`absolute top-[88%] left-0 min-w-[260px] bg-white border border-gray-100 shadow-[0_15px_35px_rgba(0,0,0,0.12)] rounded-2xl py-2.5 transition-all duration-200 origin-top z-50 ${
                        desktopActiveDropdown === item.id
                          ? "opacity-100 scale-100 visible pointer-events-auto"
                          : "opacity-0 scale-95 invisible pointer-events-none"
                      }`}
                    >
                      <div className="flex flex-col w-full">
                        {item.children.map((child) => {
                          const childAct = isChildActive(child.link, currentPath);
                          return (
                            <div
                              key={child.id}
                              className="relative group/category"
                              onMouseEnter={() => {
                                if (child.children) {
                                  setDesktopActiveSubDropdown(`${item.id}-${child.id}`);
                                } else {
                                  setDesktopActiveSubDropdown(null);
                                }
                              }}
                            >
                              <NavLink
                                to={child.link}
                                onClick={() => {
                                  setDesktopActiveDropdown(null);
                                  setDesktopActiveSubDropdown(null);
                                }}
                                onFocus={() => {
                                  if (child.children) {
                                    setDesktopActiveSubDropdown(`${item.id}-${child.id}`);
                                  } else {
                                    setDesktopActiveSubDropdown(null);
                                  }
                                }}
                                className={`!text-gray-800 w-full h-[48px] hover:!bg-gray-50/80 flex items-center justify-between px-4 text-sm font-semibold hover:!text-[#7ccf00] transition-colors ${
                                  childAct ? "!text-[#7ccf00] !bg-[#080331]/5 font-bold" : ""
                                }`}
                              >
                                <span>{child.name}</span>
                                {child.children && (
                                  <IoChevronDown
                                    size={14}
                                    className="-rotate-90 ml-2 text-gray-400 group-hover/category:text-[#7ccf00] transition-colors"
                                  />
                                )}
                              </NavLink>

                              {child.children && (
                                <div
                                  className={`absolute top-0 left-full ml-1.5 min-w-[310px] bg-white border border-gray-100 shadow-[0_15px_35px_rgba(0,0,0,0.12)] rounded-2xl py-2 transition-all duration-200 origin-top-left z-50 ${
                                    desktopActiveSubDropdown === `${item.id}-${child.id}`
                                      ? "opacity-100 scale-100 visible pointer-events-auto"
                                      : "opacity-0 scale-95 invisible pointer-events-none"
                                  }`}
                                >
                                  <div className="flex flex-col">
                                    {child.children.map((subChild) => {
                                      const subAct = currentPath === subChild.link || currentPath.startsWith(subChild.link);
                                      return (
                                        <NavLink
                                          key={subChild.id}
                                          to={subChild.link}
                                          onClick={() => {
                                            setDesktopActiveDropdown(null);
                                            setDesktopActiveSubDropdown(null);
                                          }}
                                          className={`!text-gray-800 h-[46px] hover:!bg-gray-50/80 flex items-center px-4 text-sm font-semibold hover:!text-[#7ccf00] transition-colors ${
                                            subAct ? "!text-[#7ccf00] !bg-[#080331]/5 font-bold border-l-2 border-[#7ccf00]" : ""
                                          }`}
                                        >
                                          {subChild.name}
                                        </NavLink>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-3">
              <NavLink
                to="/login"
                className="px-4 py-2 font-bold text-sm lg:text-base text-gray-800 hover:text-[#7ccf00] transition-colors duration-200"
              >
                Login
              </NavLink>
              <button
                type="button"
                onClick={handleGetStartedClick}
                className="group flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-[#080331] text-white font-bold text-sm lg:text-base shadow-[0_4px_16px_rgba(8,3,49,0.3)] hover:shadow-[0_8px_25px_rgba(8,3,49,0.45)] -translate-y-0 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-out cursor-pointer"
              >
                <FaRunning className="text-base group-hover:translate-x-0.5 transition-transform duration-200" />
                <span>Get started</span>
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="p-2.5 sm:p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100 text-gray-800 hover:text-[#080331] transition-all duration-200 focus:outline-none shadow-sm border border-gray-100 min-h-[48px] min-w-[48px] flex items-center justify-center"
              >
                <RiMenu3Fill className="text-xl sm:text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        styles={{
          body: { backgroundColor: "#3d9aa3", padding: "16px" },
          header: { backgroundColor: "#3d9aa3", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "18px 20px" },
        }}
        closeIcon={<span className="text-white text-xl font-bold hover:scale-110 transition-transform min-h-[48px] min-w-[48px] flex items-center justify-center -mr-2">✕</span>}
        title={<h1 className="!text-white text-lg sm:text-xl font-extrabold tracking-wide">ACCENLEARN</h1>}
        size="default"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="font-semibold flex flex-col items-start justify-start gap-y-1.5">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="w-full">
                {item.children ? (
                  <div>
                    <div
                      onClick={() => toggleExpand(item.id)}
                      className={`!text-white text-base h-[50px] w-full flex items-center justify-between px-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all ${
                        isItemActive(item, currentPath)
                          ? "!text-white font-bold bg-white/20 shadow-sm"
                          : ""
                      }`}
                    >
                      <span>{item.name}</span>
                      {expandedItems[item.id] ? (
                        <IoChevronUp className="text-lg transition-transform duration-200" />
                      ) : (
                        <IoChevronDown className="text-lg transition-transform duration-200" />
                      )}
                    </div>

                    {expandedItems[item.id] && (
                      <div className="pl-3 sm:pl-4 mt-1.5 flex flex-col gap-y-1 border-l border-white/25 ml-2.5 animate__animated animate__fadeIn animate__faster">
                        {item.children.map((child) => (
                          <div key={child.id} className="w-full">
                            {child.children ? (
                              <div
                                onClick={() => toggleExpand(`${item.id}-${child.id}`)}
                                className={`!text-white text-sm h-[46px] w-full flex items-center justify-between px-4 rounded-lg cursor-pointer hover:bg-white/10 transition-all ${
                                  isChildActive(child.link, currentPath)
                                    ? "!text-white font-bold bg-white/15"
                                    : "text-white/90"
                                }`}
                              >
                                <span>{child.name}</span>
                                {expandedItems[`${item.id}-${child.id}`] ? (
                                  <IoChevronUp className="text-sm" />
                                ) : (
                                  <IoChevronDown className="text-sm" />
                                )}
                              </div>
                            ) : (
                              <NavLink
                                to={child.link}
                                onClick={() => setMenuOpen(false)}
                                className={`!text-white text-sm h-[46px] w-full flex items-center px-4 rounded-lg hover:bg-white/10 transition-all ${
                                  isChildActive(child.link, currentPath)
                                    ? "!text-white font-bold bg-white/15"
                                    : "text-white/90"
                                }`}
                              >
                                {child.name}
                              </NavLink>
                            )}

                            {expandedItems[`${item.id}-${child.id}`] && child.children && (
                              <div className="pl-3 sm:pl-4 mt-1 flex flex-col gap-y-1 border-l border-white/15 ml-2.5 animate__animated animate__fadeIn animate__faster">
                                {child.children.map((subChild) => (
                                  <NavLink
                                    key={subChild.id}
                                    to={subChild.link}
                                    onClick={() => setMenuOpen(false)}
                                    className={`!text-white text-sm h-[42px] w-full flex items-center px-4 rounded-md hover:bg-white/10 transition-all ${
                                      currentPath === subChild.link
                                        ? "!text-white font-bold bg-white/20 border-l-2 border-white"
                                        : "text-white/85"
                                    }`}
                                  >
                                    {subChild.name}
                                  </NavLink>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.link}
                    onClick={() => setMenuOpen(false)}
                    className={`!text-white text-base h-[50px] w-full flex items-center px-4 rounded-xl hover:bg-white/10 transition-all ${
                      currentPath === item.link
                        ? "!text-white font-bold bg-white/20 border-l-2 border-white shadow-sm"
                        : ""
                    }`}
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 space-y-6 px-2">
            <div className="space-y-3">
              {CONTACT_INFO.map((res) => (
                <a
                  key={res.id}
                  href={res.link || (res.value?.includes("@") ? `mailto:${res.value}` : `tel:${res.value}`)}
                  className="flex items-center gap-3 text-white/90 hover:text-white transition-colors min-h-[48px] py-1"
                >
                  <res.icon size={18} className="text-white shrink-0" />
                  <span className="text-sm font-medium">{res.value}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {SOCIAL_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="bg-black/25 hover:bg-white p-2.5 rounded-xl transition-all duration-300 text-white hover:text-[#080331] hover:scale-110 active:scale-95 border border-white/15 hover:border-white shadow-lg backdrop-blur-sm flex items-center justify-center min-h-[48px] min-w-[48px]"
                >
                  <item.icon size={20} />
                </a>
              ))}
              <a
                href="https://www.youtube.com/@accenlearn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="bg-black/25 hover:bg-white p-2.5 rounded-xl transition-all duration-300 text-white hover:text-[#080331] hover:scale-110 active:scale-95 border border-white/15 hover:border-white shadow-lg backdrop-blur-sm flex items-center justify-center min-h-[48px] min-w-[48px]"
              >
                <FaYoutube size={21} />
              </a>
            </div>

            <div className="pb-4 pt-1">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="w-full mb-3 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-transparent border-2 border-white text-white font-extrabold text-base hover:bg-white/10 active:scale-98 transition-all duration-200"
              >
                <NavLink to="/login" className="w-full text-center">Login</NavLink>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleGetStartedClick();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white text-[#080331] font-extrabold text-base shadow-xl hover:bg-gray-50 active:scale-98 transition-all duration-200"
              >
                <FaRunning className="text-lg" />
                <span>Get started</span>
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
    {showPopup && <AdvancedApplyPopup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Header;
