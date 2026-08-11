import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaWhatsapp, FaDownload, FaBriefcase, FaChalkboardTeacher } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Tooltip } from "antd";
import { IMAGE_HELPER } from "../shared/ImageHelper";
import { initGA, trackPageView, trackOutboundLink } from "../utils/analytics";
import AdvancedApplyPopup from "../components/AdvancedApplyPopup";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const location = useLocation();

  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAdvancedPopup, setShowAdvancedPopup] = useState(false);

  useEffect(() => {
    const popupAlreadyShown = sessionStorage.getItem("accenlearnAdvancedPopupShown");
    if (!popupAlreadyShown && location.pathname === "/") {
      const timer = setTimeout(() => {
        setShowAdvancedPopup(true);
        sessionStorage.setItem("accenlearnAdvancedPopupShown", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsNavVisible(true);
    setLastScrollY(0);

    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        setIsNavVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      const scrollDifference = currentScrollY - lastScrollY;

      if (scrollDifference > 6) {
        setIsNavVisible(false);
      } else if (scrollDifference < -6) {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (!isBrochureModalOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsBrochureModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isBrochureModalOpen]);

  const closeBrochureModal = () => {
    setIsBrochureModalOpen(false);
  };

  const handleWhatsAppClick = () => {
    trackOutboundLink("https://wa.me/9344322482");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden !bg-secondary/10 !text-black">
      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 sm:bottom-10 sm:right-10">
        {/* Brochure button */}
        <Tooltip title="Download Pamphlet">
          <button
            type="button"
            onClick={() => setIsBrochureModalOpen(true)}
            aria-label="Open brochure download options"
            className="group relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-white p-0.5 shadow-xl transition-all duration-300 hover:scale-110 sm:h-12 sm:w-12"
          >
            <img
              src={IMAGE_HELPER.BROCHURE_ICON}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />

            <span className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
              <FaDownload className="text-xs text-white sm:text-sm" />
            </span>
          </button>
        </Tooltip>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/9344322482"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label="Chat with AccenLearn on WhatsApp"
        >
          <Tooltip title="Chat with us on WhatsApp">
            <FaWhatsapp className="h-10 w-10 cursor-pointer rounded-full bg-green-500 p-2 text-white shadow-lg transition-all duration-300 hover:scale-110 sm:h-12 sm:w-12" />
          </Tooltip>
        </a>
      </div>

      {/* Navbar */}
      <div
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-[200px] pointer-events-none opacity-0"
        }`}
      >
        <Navbar />
      </div>

      {/* Homepage hero */}
      {location.pathname === "/" && (
        <div className="w-full">
          <Hero />
        </div>
      )}

      {/* Page content */}
      <main
        className={`min-h-inherit mx-auto w-full ${
          location.pathname === "/" || location.pathname.startsWith("/programs/")
            ? ""
            : "max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-[155px] sm:pt-[165px] lg:pt-[175px]"
        }`}
      >
        <Outlet />
      </main>

      <Footer />

      {/* Brochure selection modal */}
      {isBrochureModalOpen && (
        <div
          className="animate__animated animate__fadeIn fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeBrochureModal}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="brochure-modal-title"
            className="animate__animated animate__zoomIn animate__faster relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeBrochureModal}
              aria-label="Close brochure modal"
              className="absolute right-4 top-4 z-50 rounded-full bg-gray-100 p-2 text-gray-600 shadow-md transition-colors hover:bg-gray-200"
            >
              <IoClose size={24} />
            </button>

            <h2 id="brochure-modal-title" className="sr-only">
              AccenLearn brochure download options
            </h2>

            <div className="flex h-full flex-col md:flex-row">
              {/* Placement assistance */}
              <div className="flex w-full flex-col items-center justify-center bg-white p-8 text-center md:w-1/2 lg:p-12">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary/10 shadow-sm">
                  <FaBriefcase size={32} className="text-secondary" />
                </div>

                <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-primary lg:text-3xl">
                  Placement Assistance
                </h3>

                <p className="mb-8 text-sm text-gray-500 lg:text-base">
                  Learn about our placement support, hiring partners, and career
                  acceleration programmes.
                </p>

                <a
                  href={IMAGE_HELPER.PLACEMENT_PDF}
                  download="AccenLearn_Placement_Assistance.pdf"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-secondary py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg transition-all hover:bg-primary"
                >
                  <FaDownload />
                  Download Guide
                </a>
              </div>

              {/* Programs and training */}
              <div className="flex w-full flex-col items-center justify-center bg-gradient-to-br from-primary to-primary/90 p-8 text-center text-white md:w-1/2 lg:p-12">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 shadow-xl backdrop-blur-md">
                  <FaChalkboardTeacher size={32} />
                </div>

                <h3 className="mb-4 text-2xl font-black uppercase tracking-tight lg:text-3xl">
                  Programs &amp; Training
                </h3>

                <p className="mb-8 text-sm text-white/80 lg:text-base">
                  Get our comprehensive brochure covering technical,
                  management, and medical programs.
                </p>

                <a
                  href={IMAGE_HELPER.BROCHURE_PDF}
                  download="AccenLearn_Workshop_Training_Brochure.pdf"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 text-sm font-black uppercase tracking-wider text-primary shadow-lg transition-all hover:bg-secondary hover:text-white"
                >
                  <FaDownload />
                  Download Brochure
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-8 py-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                AccenLearn Official Brochures
              </span>

              <div className="flex gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Homepage course enquiry popup */}
      {showAdvancedPopup && <AdvancedApplyPopup onClose={() => setShowAdvancedPopup(false)} />}
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;