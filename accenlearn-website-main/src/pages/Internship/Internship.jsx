import React, { useState } from 'react';
import SharedBreadcrumb from '../../components/SharedBreadcrumb';
import TitleText from '../../components/TitleText';
import { FaArrowRight } from 'react-icons/fa';

const Internship = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collegeEmail: '',
    phone: '',
    whatsapp: '',
    college: '',
    degree: '',
    year: '',
    status: '',
    track: '',
    reason: '',
    goal: '',
    referral: 'AL077'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top when submission is successful
  React.useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation for phone and whatsapp: numbers only
    if ((name === 'phone' || name === 'whatsapp') && value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isStudent = formData.status === 'Student';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (isStudent && !emailRegex.test(formData.collegeEmail)) {
      alert("Please enter a valid college email address");
      return;
    }

    setIsLoading(true);
    
    // Using the new script URL provided
    const scriptURL = "https://script.google.com/macros/s/AKfycbxBo80NVIWi53RAQ7aD6E1nbG9iK0CRY-_i0yWpNHAIqYtzK1ZhYeiUuaLqHziO_4kQ/exec";
    
    // Prepare payload based on the requested structure
    const payload = {
      fullName: formData.fullName,
      emailId: formData.email,
      collegeEmailId: isStudent ? formData.collegeEmail : "",
      contactNumber: formData.phone,
      whatsappNumber: formData.whatsapp,
      collegeName: isStudent ? formData.college : "",
      degreeCourse: isStudent ? formData.degree : "",
      yearSemester: isStudent ? formData.year : "",
      currentStatus: formData.status,
      preferredWorkshop: formData.track,
      primaryGoal: isStudent ? formData.goal : ""
    };

    try {
      // Fire the request and immediately show the success state for instant feedback
      fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Faster, avoids preflight for simple requests to GAS
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload)
      }).catch(error => console.error("Background sync failed:", error));

      // Show success state immediately
      setIsSubmitted(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error!", error.message);
      setIsLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-4 sm:pt-6 pb-20 flex flex-col items-center justify-start px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-3xl w-full bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate__animated animate__zoomIn">
          <div className="md:w-5/12 bg-primary p-8 sm:p-12 flex flex-col justify-center items-center text-white space-y-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl sm:text-5xl animate-bounce">
              ✓
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-center uppercase tracking-tight">Success!</h2>
            <div className="h-1.5 w-16 bg-secondary rounded-full"></div>
          </div>
          <div className="md:w-7/12 p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-primary">Application Received</h3>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed">
                Your registration for the <span className="text-secondary font-bold">Future Skills Internship Program</span> has been successfully processed. 
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border-l-4 border-secondary">
              <p className="text-gray-500 text-sm sm:text-base italic">
                Our academic committee will review your credentials and contact you via your registered email address within 24-48 business hours.
              </p>
            </div>
            <button 
              onClick={() => window.location.href = '/'}
              className="group flex items-center justify-center gap-3 w-full bg-primary text-white font-bold py-4 sm:py-5 rounded-2xl hover:bg-secondary transition-all shadow-xl hover:scale-[1.02] active:scale-95"
            >
              Return to Portal
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isStudent = formData.status === 'Student';

  return (
    <div className="min-h-screen pt-4 sm:pt-6 pb-20 bg-gradient-to-br from-[#f3f7ff] via-white to-[#eef2ff] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] right-[5%] w-24 h-24 bg-secondary/10 rounded-2xl rotate-12 animate-float"></div>
        <div className="absolute bottom-[20%] left-[5%] w-16 h-16 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="animate__animated animate__fadeInDown">
          <SharedBreadcrumb title="Internship Program" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 animate__animated animate__zoomIn">
            <div className="text-center mb-10 space-y-4">
              <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-bold tracking-wider animate__animated animate__fadeInDown animate__delay-1s uppercase">
                Future-Ready Careers
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight animate__animated animate__fadeInUp animate__delay-1s">
                Accenlearn Future Skills <br />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Internship Program</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
                In Strategic Collaboration with Industry Leaders. <br />
                Accelerate your professional growth through immersive hands-on exposure and expert mentorship.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Status Selection */}
              <div className="animate__animated animate__fadeInUp animate__delay-1s">
                <div className="text-xl font-bold text-primary mb-6 border-l-4 border-secondary pl-4 py-1">
                  Step 1: Tell us about yourself
                </div>
                <div className="relative group">
                  <select
                    required
                    name="status"
                    className="w-full px-6 py-5 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all appearance-none cursor-pointer font-semibold text-gray-700 hover:bg-white hover:shadow-lg"
                    onChange={handleChange}
                    value={formData.status}
                  >
                    <option value="">Choose Your Path...</option>
                    <option>Student</option>
                    <option>Working Professional</option>
                    <option>Freelancer</option>
                    <option>Entrepreneur</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {formData.status && (
                <div className="space-y-10 animate__animated animate__fadeInUp">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1">
                      Step 2: Personal Information
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group md:col-span-2">
                        <input
                          required
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                          onChange={handleChange}
                          value={formData.fullName}
                        />
                      </div>
                      
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Personal Email Address"
                        className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                        onChange={handleChange}
                        value={formData.email}
                      />
                      
                      {isStudent && (
                        <div className="animate__animated animate__fadeIn">
                          <input
                            required
                            type="email"
                            name="collegeEmail"
                            placeholder="Official College Email"
                            className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                            onChange={handleChange}
                            value={formData.collegeEmail}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                        <input
                          required
                          type="tel"
                          name="phone"
                          placeholder="Contact Number"
                          className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                          onChange={handleChange}
                          value={formData.phone}
                        />
                        <input
                          required
                          type="tel"
                          name="whatsapp"
                          placeholder="WhatsApp Number"
                          className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                          onChange={handleChange}
                          value={formData.whatsapp}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Academic Information - Only for Students */}
                  {isStudent && (
                    <div className="space-y-6 animate__animated animate__fadeIn">
                      <div className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1">
                        Step 3: Academic Details
                      </div>
                      <div className="space-y-4">
                        <input
                          required
                          type="text"
                          name="college"
                          placeholder="College / University Name"
                          className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                          onChange={handleChange}
                          value={formData.college}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            required
                            type="text"
                            name="degree"
                            placeholder="Degree / Course (e.g., B.E CSE)"
                            className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                            onChange={handleChange}
                            value={formData.degree}
                          />
                          <input
                            required
                            type="text"
                            name="year"
                            placeholder="Year / Semester"
                            className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                            onChange={handleChange}
                            value={formData.year}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Program Preferences */}
                  <div className="space-y-6">
                    <div className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1">
                      Step {isStudent ? '4' : '3'}: Program Preferences
                    </div>
                    <div className="space-y-4">
                      <div className="relative">
                        <select
                          required
                          name="track"
                          className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all appearance-none cursor-pointer hover:bg-white hover:shadow-md"
                          onChange={handleChange}
                          value={formData.track}
                        >
                          <option value="">Select Your Workshop Track...</option>
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
                          <option>Human Resource</option>
                          <option>Business Analytics</option>
                          <option>Finance</option>
                          <option>Stock Market</option>
                          <option>Digital Marketing</option>
                          <option>Psychology</option>
                          <option>Graphics Designing</option>
                          <option>Medical Coding</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>

                      {isStudent && (
                        <div className="space-y-4 animate__animated animate__fadeIn">
                          <textarea
                            required
                            name="reason"
                            placeholder="What motivates you to join this program?"
                            className="w-full px-6 py-4 min-h-[120px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all hover:bg-white hover:shadow-md"
                            onChange={handleChange}
                            value={formData.reason}
                          />
                          <div className="relative">
                            <select
                              required
                              name="goal"
                              className="w-full px-6 py-4 min-h-[48px] bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all appearance-none cursor-pointer hover:bg-white hover:shadow-md"
                              onChange={handleChange}
                              value={formData.goal}
                            >
                              <option value="">What is your primary goal?</option>
                              <option>Get Internship</option>
                              <option>Upgrade Skills</option>
                              <option>Career Switch</option>
                              <option>Industry Exposure</option>
                              <option>Just Exploring</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="relative group overflow-hidden rounded-2xl">
                        <input
                          readOnly
                          type="text"
                          value="Referral Code: AL077"
                          className="w-full px-6 py-4 min-h-[48px] bg-primary/5 border border-primary/10 rounded-2xl text-primary/60 font-bold text-center tracking-widest"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden bg-primary text-white font-bold py-5 min-h-[48px] rounded-2xl hover:shadow-[0_20px_40px_rgba(61,154,163,0.3)] transition-all transform hover:-translate-y-1 disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <span className="animate-pulse">Processing...</span>
                        </>
                      ) : (
                        <>
                          Submit Application <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              )}
            </form>

            <p className="text-center mt-12 text-gray-400 text-sm font-medium">
              © 2026 <span className="text-primary">Accenlearn</span>. Empowering future-ready professionals.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Internship;

