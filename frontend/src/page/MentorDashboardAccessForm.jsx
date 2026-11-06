import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import {
  FaUserTie,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaBuilding,
  FaBriefcase,
  FaClock,
  FaGraduationCap,
  FaGoogleDrive,
  FaLinkedin,
  FaGithub,
  FaUniversity,
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FALLBACK_DOMAINS = [
  "Full Stack Web Development",
  "Artificial Intelligence & Machine Learning",
  "Data Science & Analytics",
  "Cyber Security & Ethical Hacking",
  "Cloud Computing & DevOps",
  "VLSI Design & Verification",
  "Embedded Systems & IoT",
  "Digital Marketing & Growth",
  "Product Management",
  "UI/UX Design",
  "Automation & Software Testing",
  "Investment Banking & Financial Modeling",
  "Medical Coding",
];

const MentorDashboardAccessForm = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    companyEmail: "",
    phone: "",
    whatsAppNumber: "",
    companyName: "",
    role: "",
    experience: "",
    optedDomain: "",
    optedCourseId: "",
    resumeLink: "",
    photoLink: "",
    linkedin: "",
    github: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    upiNumber: "",
    agreedToTerms: false,
  });

  const [sameAsPhone, setSameAsPhone] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const res = await axios.get(`${API}/getadvcourses`);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setCourses(res.data);
      } else {
        // Try standard courses endpoint
        const stdRes = await axios.get(`${API}/getcourses`);
        if (stdRes.data && Array.isArray(stdRes.data) && stdRes.data.length > 0) {
          setCourses(stdRes.data);
        } else {
          setCourses(FALLBACK_DOMAINS.map((title) => ({ _id: title, title })));
        }
      }
    } catch (err) {
      console.warn("Using fallback course list:", err.message);
      setCourses(FALLBACK_DOMAINS.map((title) => ({ _id: title, title })));
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      phone: val,
      whatsAppNumber: sameAsPhone ? val : prev.whatsAppNumber,
    }));
  };

  const handleSameAsPhoneToggle = (checked) => {
    setSameAsPhone(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, whatsAppNumber: prev.phone }));
    }
  };

  const handleDomainSelect = (e) => {
    const selectedTitle = e.target.value;
    const matched = courses.find((c) => c.title === selectedTitle);
    setFormData((prev) => ({
      ...prev,
      optedDomain: selectedTitle,
      optedCourseId: matched && matched._id !== selectedTitle ? matched._id : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate Account Numbers match
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      setErrorMessage("Bank Account Number and Confirmation Account Number do not match!");
      window.scrollTo({ top: 700, behavior: "smooth" });
      return;
    }

    if (!formData.agreedToTerms) {
      setErrorMessage("Please accept the Freelance Mentorship terms and conditions to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        companyEmail: formData.companyEmail.trim(),
        phone: formData.phone.trim(),
        whatsAppNumber: formData.whatsAppNumber.trim(),
        companyName: formData.companyName.trim(),
        role: formData.role.trim(),
        experience: formData.experience.trim(),
        optedDomain: formData.optedDomain,
        optedCourseId: formData.optedCourseId || null,
        resumeLink: formData.resumeLink.trim(),
        photoLink: formData.photoLink.trim(),
        linkedin: formData.linkedin.trim(),
        github: formData.github.trim(),
        accountNumber: formData.accountNumber.trim(),
        ifscCode: formData.ifscCode.toUpperCase().trim(),
        bankName: formData.bankName.trim(),
        branchName: formData.branchName.trim(),
        upiNumber: formData.upiNumber.trim(),
      };

      const response = await axios.post(`${API}/api/mentor-onboarding/submit`, payload);

      if (response.data && response.data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(response.data?.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(
        error.response?.data?.message || "Network or server error while submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      {/* ── Background Glow ── */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* ── Brand Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <FaShieldAlt className="text-indigo-400" />
            Accenlearn Academic & Mentorship Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Mentor Onboarding & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Dashboard Access Form
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to Accenlearn! Please submit your verified professional, domain, and payout details to complete your
            freelance mentor registration and receive your formal offer letter.
          </p>
        </div>

        {/* ── Error Banner ── */}
        {errorMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-3 animate-shake">
            <FaInfoCircle className="text-xl mt-0.5 flex-shrink-0 text-rose-400" />
            <div>
              <p className="font-semibold text-rose-200">Please review the form:</p>
              <p className="text-sm mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* ── Success Card ── */}
        {isSubmitted ? (
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-emerald-950/30 text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-4xl mb-6 shadow-lg shadow-emerald-500/20">
              <FaCheckCircle />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Application Submitted Successfully!</h2>
            <p className="text-emerald-400 font-semibold mt-2 text-lg">
              Welcome to the Accenlearn Mentorship Fraternity
            </p>

            <div className="mt-8 p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-left max-w-xl mx-auto space-y-3 text-sm text-slate-300">
              <div className="flex justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Mentor Name:</span>
                <span className="font-bold text-white">{formData.fullname}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Opted Domain:</span>
                <span className="font-bold text-indigo-300">{formData.optedDomain}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Primary Email:</span>
                <span className="font-medium text-white">{formData.email}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Current Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs border border-amber-500/30">
                  Under Operational Review
                </span>
              </div>
            </div>

            <div className="mt-8 bg-indigo-950/50 border border-indigo-500/30 p-5 rounded-2xl max-w-xl mx-auto text-sm text-indigo-200">
              <p className="font-semibold text-white mb-1">What Happens Next?</p>
              <p>
                Our Operations team is reviewing your profile and credentials. Once approved, your formal{" "}
                <strong>Freelance Mentor Engagement Offer Letter</strong> will be delivered directly to your registered
                email with portal credentials.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://web.whatsapp.com/send?phone=916374431801&text=${encodeURIComponent(
                  `Hello Operations Team, I have submitted my Mentor Onboarding Form on Accenlearn for ${formData.optedDomain}. Mentor Name: ${formData.fullname}, Email: ${formData.email}. Kindly assist with next steps.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-900/30"
              >
                <FaWhatsapp className="text-xl" />
                Contact Operations on WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition border border-slate-700"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* ── Main Form Card ── */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-indigo-950/40 space-y-10"
          >
            {/* ── Section 1: Personal & Contact ── */}
            <div>
              <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-base">
                  <FaUserTie />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">1. Personal & Contact Information</h2>
                  <p className="text-xs text-slate-400">Direct contact coordinates for session coordination</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Mentor Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <FaUserTie />
                    </span>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Rajesh Kumar"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Personal Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rajesh.kumar@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Official / Company Email <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <FaBuilding />
                    </span>
                    <input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      placeholder="rajesh@company.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Contact Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <FaPhoneAlt />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="9876543210"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      WhatsApp Number <span className="text-rose-400">*</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-indigo-300 hover:text-indigo-200">
                      <input
                        type="checkbox"
                        checked={sameAsPhone}
                        onChange={(e) => handleSameAsPhoneToggle(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                      />
                      Same as phone number
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-emerald-500">
                      <FaWhatsapp />
                    </span>
                    <input
                      type="tel"
                      name="whatsAppNumber"
                      value={formData.whatsAppNumber}
                      onChange={handleChange}
                      placeholder="9876543210"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 2: Professional Background ── */}
            <div>
              <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-base">
                  <FaBriefcase />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">2. Professional Background & Experience</h2>
                  <p className="text-xs text-slate-400">Current organization, domain seniority, and social links</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Current Company / Org <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <FaBuilding />
                    </span>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Google / Microsoft / TCS"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Role in Company <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <FaBriefcase />
                    </span>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Senior Data Scientist"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Total Experience <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <FaClock />
                    </span>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 5+ Years"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    LinkedIn Profile URL <span className="text-slate-400 font-normal">(Recommended)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-blue-400">
                      <FaLinkedin />
                    </span>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    GitHub / Portfolio Link <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <FaGithub />
                    </span>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 3: Opted Domain (from Advanced Courses List) ── */}
            <div>
              <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-base">
                  <FaGraduationCap />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">3. Opted Mentorship Domain</h2>
                  <p className="text-xs text-slate-400">
                    Select your primary specialization from our active Advanced Programs
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Domain from Active Programs <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-amber-400 pointer-events-none">
                    <FaGraduationCap />
                  </span>
                  <select
                    name="optedDomain"
                    value={formData.optedDomain}
                    onChange={handleDomainSelect}
                    required
                    className="w-full pl-10 pr-10 py-3.5 bg-slate-800/70 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-sm appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">
                      {loadingCourses ? "-- Fetching Active Courses... --" : "-- Select Mentorship Domain --"}
                    </option>
                    {courses.map((course) => (
                      <option key={course._id || course.title} value={course.title} className="bg-slate-900 text-white">
                        {course.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                  <FaInfoCircle className="text-amber-400 flex-shrink-0" />
                  Your offer letter and batch student allocations will be tailored specifically to this domain.
                </p>
              </div>
            </div>

            {/* ── Section 4: Document Drive Links ── */}
            <div>
              <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-base">
                  <FaGoogleDrive />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">4. Verification & Document Drive Links</h2>
                  <p className="text-xs text-slate-400">
                    Google Drive link for your CV/Resume and profile photo (Please set access to "Anyone with the link")
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Resume / CV Google Drive Link <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-emerald-400">
                      <FaGoogleDrive />
                    </span>
                    <input
                      type="url"
                      name="resumeLink"
                      value={formData.resumeLink}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/file/d/..."
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-sm"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1.5">
                    Ensure access is set to <strong>"Anyone with the link can view"</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Profile Photo / Photo ID Drive Link <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-emerald-400">
                      <FaGoogleDrive />
                    </span>
                    <input
                      type="url"
                      name="photoLink"
                      value={formData.photoLink}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/file/d/..."
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-sm"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1.5">Used for faculty card in mentor portal</span>
                </div>
              </div>
            </div>

            {/* ── Section 5: Bank & Payout Details ── */}
            <div>
              <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-base">
                  <FaUniversity />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">5. Bank Details & UPI (For Session Payouts)</h2>
                  <p className="text-xs text-slate-400">
                    Accurate bank coordinates for monthly per-session freelance honorarium clearance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Bank Account Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-cyan-400">
                      <FaMoneyCheckAlt />
                    </span>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      placeholder="e.g. 123456789012"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Confirm Bank Account Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-cyan-400">
                      <FaMoneyCheckAlt />
                    </span>
                    <input
                      type="text"
                      name="confirmAccountNumber"
                      value={formData.confirmAccountNumber}
                      onChange={handleChange}
                      placeholder="Re-enter bank account number"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Bank IFSC Code <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <FaUniversity />
                    </span>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          ifscCode: e.target.value.toUpperCase(),
                        }))
                      }
                      placeholder="e.g. HDFC0001234"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm uppercase tracking-wider"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Bank Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="e.g. HDFC Bank / ICICI / SBI"
                    required
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Bank Branch <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    placeholder="e.g. Koramangala, Bengaluru"
                    required
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    UPI ID / UPI Number <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="upiNumber"
                    value={formData.upiNumber}
                    onChange={handleChange}
                    placeholder="e.g. username@okaxis or 9876543210@upi"
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm"
                  />
                </div>
              </div>
            </div>

            {/* ── Section 6: Terms & Submit ── */}
            <div className="pt-4 border-t border-slate-800">
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:bg-slate-800 transition">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 w-4 h-4 flex-shrink-0"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I hereby confirm that all personal, professional, domain, and banking details provided above are
                  accurate. I agree to engage with Accenlearn Solutions as a <strong>Freelance Domain Mentor</strong> and
                  receive my official engagement offer letter and portal access credentials.
                </span>
              </label>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-base uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-indigo-950/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting Onboarding Details...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="text-lg" />
                      Submit Mentor Onboarding Application
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-slate-500 mt-4">
                Encrypted & Secured by Accenlearn Academic Partnerships. Your banking credentials are held in strict
                confidentiality for direct honorarium disbursement.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MentorDashboardAccessForm;
