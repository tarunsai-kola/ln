import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { 
  FaUserGraduate, 
  FaCertificate, 
  FaAward, 
  FaChalkboardTeacher, 
  FaHandshake, 
  FaCheckCircle,
  FaSpinner,
  FaArrowRight
} from "react-icons/fa";

const getHighlightIcon = (index) => {
  switch (index) {
    case 0: return <FaUserGraduate size={18} />;
    case 1: return <FaCertificate size={18} />;
    case 2: return <FaAward size={18} />;
    case 3: return <FaChalkboardTeacher size={18} />;
    case 4: return <FaHandshake size={18} />;
    default: return <FaCheckCircle size={18} />;
  }
};

const OverviewModal = ({ isOpen, onClose, program }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    college: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on Escape key press, block scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen || !program) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{10,15}$/;

    if (!formData.name.trim()) return "Full Name is required";
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) return "Invalid Phone Number format";
    if (!emailRegex.test(formData.email)) return "Invalid Email Address format";
    if (!formData.college.trim()) return "College Name is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);

    const payload = {
      name: formData.name,
      personalEmail: formData.email,
      phone: formData.phone,
      college: formData.college,
      course: `${program.title} Program`, // Track program
      year: "Other", // Fill defaults for existing script
      collegeEmail: "",
      language: "English"
    };

    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycby1AO4FXjkWxfTfAwKKgfvo5vH4huGChboAmyzLdi9TaPgqZLmHAaU_P_IBncz7IzQcWA/exec";

      // Send to sheet API background fetch
      fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload)
      }).catch(err => console.error("Google Sheet submission failed:", err));

      setIsSubmitted(true);
      setIsLoading(false);

      // Trigger brochure download if it exists
      if (program.brochure) {
        const link = document.createElement("a");
        link.href = program.brochure;
        link.setAttribute("download", `${program.title.replace(/\s+/g, "_")}_Brochure.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Reset form
      setFormData({ name: "", phone: "", email: "", college: "" });

      // Automatically close modal after showing success state
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);

    } catch (err) {
      setIsLoading(false);
      console.error(err);
      alert("Submission failed. Please check your connection.");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate__animated animate__fadeIn"
      onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
    >
      <div className="relative w-full max-w-4xl bg-[#1f1b3d] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] border border-white/10">
        
        {/* Close Button */}
        {!isLoading && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
        )}

        {/* Left Side: Program Highlights */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center text-white overflow-y-auto">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 uppercase text-center border-b border-white/10 pb-4">
              Overview
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-secondary mb-1">
              Program Highlight
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              Transform Your Skills with Our Comprehensive Program
            </p>
          </div>

          <div className="space-y-4">
            {program.highlights?.map((highlight, index) => {
              const isNSDC = highlight.includes("NSDC");
              const isSkillIndia = highlight.includes("Skill India");

              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary shrink-0">
                    {getHighlightIcon(index)}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-white/90">{highlight}</span>
                    {isNSDC && (
                      <div className="bg-white px-2 py-0.5 rounded flex items-center justify-center shrink-0 border border-gray-200">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/NSDC_Logo.png/120px-NSDC_Logo.png" 
                          alt="NSDC" 
                          className="h-4 w-auto object-contain"
                        />
                      </div>
                    )}
                    {isSkillIndia && (
                      <div className="bg-white px-2 py-0.5 rounded flex items-center justify-center shrink-0 border border-gray-200">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Skill_India_Logo.jpg/120px-Skill_India_Logo.jpg" 
                          alt="Skill India" 
                          className="h-4.5 w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Enquiry Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[#15112d] flex items-center justify-center border-t md:border-t-0 md:border-l border-white/10">
          <div className="w-full bg-white rounded-2xl p-5 sm:p-6 shadow-xl text-gray-800 flex flex-col justify-center min-h-[350px]">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-6 animate__animated animate__zoomIn">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-extrabold text-gray-900 mb-2 uppercase">Request Received</h4>
                <p className="text-sm text-gray-600 max-w-xs">
                  Thank you! Our career experts will reach out to you shortly.
                </p>
                {program.brochure && (
                  <p className="text-xs text-secondary font-bold mt-3 animate-pulse">
                    📥 Your brochure download has started...
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h4 className="text-lg font-black text-primary leading-snug">
                    Fill the form to apply for
                  </h4>
                  <p className="text-sm font-bold text-secondary truncate">
                    {program.title} Program
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3 py-2 text-sm focus:border-secondary focus:bg-white focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3 py-2 text-sm focus:border-secondary focus:bg-white focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3 py-2 text-sm focus:border-secondary focus:bg-white focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      College name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="college"
                      required
                      placeholder="College name"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3 py-2 text-sm focus:border-secondary focus:bg-white focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin text-white" size={16} />
                      Submitting...
                    </>
                  ) : (
                    "Enquiry"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverviewModal;
