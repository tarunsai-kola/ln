import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IMAGE_HELPER } from "../shared/ImageHelper";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const PopupModal = ({ immediate = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    collegeEmail: "",
    personalEmail: "",
    phone: "",
    college: "",
    year: "",
    course: "",
    language: "",
  });

  useEffect(() => {
    const delay = immediate ? 0 : 4000;
    const timer = setTimeout(() => {
      setIsOpen(true);
      trackEvent("Popup", "Open", "Internship Popup");
    }, delay);
    return () => clearTimeout(timer);
  }, [immediate]);

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setIsLoading(false);
    trackEvent("Popup", "Close", "Internship Popup");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "name" && formData.name.length === 0) {
      trackEvent("Form", "Start", "Internship Form");
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{10,15}$/;

    if (!formData.name.trim()) return "Name is required";
    if (!emailRegex.test(formData.personalEmail)) return "Invalid Personal Email format";
    if (formData.collegeEmail && !emailRegex.test(formData.collegeEmail)) return "Invalid College Email format";
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) return "Invalid Phone Number format";
    if (!formData.year) return "Please select your year of study";
    if (!formData.course) return "Please select an interested domain";
    
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
    trackEvent("Form", "Submit", "Internship Form");
    
    const data = {
      name: formData.name,
      collegeEmail: formData.collegeEmail,
      personalEmail: formData.personalEmail,
      phone: formData.phone,
      college: formData.college,
      year: formData.year,
      course: formData.course,
      language: formData.language
    };

    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycby1AO4FXjkWxfTfAwKKgfvo5vH4huGChboAmyzLdi9TaPgqZLmHAaU_P_IBncz7IzQcWA/exec";
      
      // Send request without awaiting to make it instant for the user
      fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Faster, ignores response
        body: JSON.stringify(data)
      }).catch(err => console.error("Background sync failed:", err));

      // Immediately show success state for an instant experience
      setIsSubmitted(true);
      setIsLoading(false);
      trackEvent("Form", "Success", "Internship Form");
      
      setFormData({
         name: "",
         collegeEmail: "",
         personalEmail: "",
         phone: "",
         college: "",
         year: "",
         course: "",
         language: "",
       });

      setTimeout(() => {
        handleClose();
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      alert("Submission failed. Please check your network or script permissions.");
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate__animated animate__fadeIn"
      onClick={(e) => e.target === e.currentTarget && !isLoading && handleClose()}
    >
      {/* Mobile Offer Badge - Floating Above */}
      {!isLoading && !isSubmitted && (
        <div className="md:hidden absolute top-6 left-1/2 -translate-x-1/2 z-[10001] animate__animated animate__bounceInDown">
          <div className="relative bg-[#080331]/90 backdrop-blur-xl border-2 border-secondary/50 rounded-2xl px-5 py-2 rotate-[-2deg] shadow-2xl">
            <h4 className="text-secondary font-black font-serif text-2xl tracking-tight uppercase">
              30% <span className="text-white">OFFER</span>
            </h4>
            <div className="absolute -top-2 -right-2 bg-secondary text-primary text-[8px] font-black px-1.5 py-0.5 rounded-md rotate-12 shadow-sm">
              LIMITED
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-4xl bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate__animated animate__slideInUp animate__faster max-h-[95vh] mt-12 md:mt-0 w-[calc(100%-1rem)] sm:w-full">
        
        {/* Close Button */}
        {!isLoading && (
          <button 
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[10002] p-2 bg-white/90 md:bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-800 md:text-gray-600 shadow-xl border border-gray-100 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <IoClose size={24} className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* Left Side: Image/Illustration */}
        <div className="hidden md:flex md:w-5/12 bg-primary items-center justify-center p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 text-center animate-float">
            <div className="mb-8 relative inline-block">
              <div className="absolute -inset-4 bg-secondary/20 blur-xl rounded-full animate-pulse"></div>
              <div className="relative bg-black/40 backdrop-blur-md border-2 border-secondary/50 rounded-2xl px-6 py-3 rotate-[-3deg] shadow-[0_10px_30px_rgba(124,207,0,0.3)] animate__animated animate__pulse animate__infinite">
                <h4 className="text-secondary font-black font-serif text-4xl sm:text-5xl tracking-tight uppercase">
                  30% <span className="text-white">OFFER</span>
                </h4>
                <div className="absolute -top-3 -right-3 bg-secondary text-primary text-[10px] font-black px-2 py-1 rounded-lg rotate-12 shadow-md">
                  LIMITED
                </div>
              </div>
            </div>
            <img 
              src={IMAGE_HELPER.HERO_SECTION} 
              alt="Career Growth" 
              className="w-full h-auto rounded-2xl shadow-lg border-4 border-white/20 mb-6"
              loading="lazy"
            />
            <h3 className="text-white text-xl font-bold mb-2">Build Your Future</h3>
            <p className="text-white/80 text-sm">Join 8,023+ learners worldwide</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-5 sm:p-8 lg:p-10 overflow-y-auto custom-scrollbar">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate__animated animate__jackInTheBox">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-12 h-12 text-white animate__animated animate__heartBeat animate__infinite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full border-4 border-white"></div>
              </div>
              <h2 className="text-3xl font-black text-primary mb-4 uppercase tracking-tighter">Registration Confirmed</h2>
              <p className="text-gray-600 font-medium max-w-xs mx-auto">
                Thank you for your interest. Our team will verify your application and reach out within 24-48 business hours.
              </p>
              <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
                  Summer Internship Open!
                </h2>
                <p className="text-gray-500 mt-1">
                  In Strategic Collaboration with Industry Leaders. Accelerate your professional growth through immersive hands-on exposure and expert mentorship.
                </p>
              </div>

              <form id="registrationForm" onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Arjun Sharma"
                    disabled={isLoading}
                    className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Personal Email ID</label>
                  <input
                    required
                    type="email"
                    name="personalEmail"
                    value={formData.personalEmail}
                    placeholder="arjun.sharma@gmail.com"
                    disabled={isLoading}
                    className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">College Email ID</label>
                  <input
                    type="email"
                    name="collegeEmail"
                    value={formData.collegeEmail}
                    placeholder="arjun.sharma@college.edu"
                    disabled={isLoading}
                    className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    required
                    type="text"
                    name="phone"
                    value={formData.phone}
                    placeholder="+91 98745 43210"
                    disabled={isLoading}
                    className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">College</label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      placeholder="IIT BHU"
                      disabled={isLoading}
                      className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Year of Study</label>
                    <div className="relative">
                      <select
                        name="year"
                        value={formData.year}
                        disabled={isLoading}
                        className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select Year of Study</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Interested Domain</label>
                  <div className="relative">
                    <select
                      required
                      name="course"
                      value={formData.course}
                      disabled={isLoading}
                      className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select Interested Domain</option>
                      <option>AI Engineering</option>
                      <option>Data Science</option>
                      <option>Data Analytics</option>
                      <option>Full Stack Software Developer</option>
                      <option>Data Structures and Algorithms (DSA)</option>
                      <option>Cybersecurity</option>
                      <option>DevOps</option>
                      <option>Machine Learning</option>
                      <option>SQL</option>
                      <option>Cloud Fundamentals</option>
                      <option>Digital Marketing</option>
                      <option>Psychology</option>
                      <option>Human Resource</option>
                      <option>Business Analytics</option>
                      <option>Finance</option>
                      <option>Stock Market</option>
                      <option>Graphics Designing</option>
                      <option>Medical Coding</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Preferred Language</label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    placeholder="eg. English, Tamil, Hindi"
                    disabled={isLoading}
                    className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group mt-6 bg-gradient-to-r from-secondary to-secondary/80 text-white font-bold py-4 min-h-[48px] rounded-xl shadow-lg hover:shadow-secondary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      Submitting... <FaSpinner className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Submit <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      
      <style jsx="true">{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default PopupModal;
