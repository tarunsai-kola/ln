import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const Dialog = ({ isOpen, onClose, fullname, errorMessage, email, counselor, domain, monthOpted }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center transform transition-all border border-slate-100 scale-100">
        {errorMessage ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <h2 className="text-xl text-slate-800 font-bold mb-2">Submission Error</h2>
            <p className="text-red-500 font-medium mb-3">{errorMessage}</p>
            <p className="text-sm mt-2 text-slate-500 px-4">
              If you have any doubts, feel free to contact your counselor for more details.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-800">
              Thank You!
            </h3>
            <h3 className="mb-3 text-emerald-600 font-semibold text-lg">
              Welcome to the Advance Program!
            </h3>
            <p className="text-slate-500 mb-2 leading-relaxed">
              Your advance dashboard access form has been submitted successfully.
            </p>
          </div>
        )}
        <button
          className="bg-slate-800 hover:bg-slate-700 rounded-xl px-6 py-3 text-white mt-8 w-full font-bold transition-colors shadow-lg shadow-slate-200"
          onClick={onClose}
        >
          {errorMessage ? "Try Again" : "Continue to Dashboard"}
        </button>
      </div>
    </div>
  );
}

const AdvanceDashboardAccess = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [emailCheckComplete, setEmailCheckComplete] = useState(false);

  const toTitleCase = (value) => {
    if (!value) return "";
    const endsWithSpace = value.endsWith(" ");
    const formatted = value
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    return endsWithSpace ? formatted + " " : formatted;
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [alternativeEmail, setAlternativeEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [branch, setBranch] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [counselor, setCounselor] = useState("");
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [program, setProgram] = useState("");
  const [modeofclasses, setModeOfClasses] = useState("");
  const [domain, setDomain] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [modeofpayment, setModeOfPayment] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [internshipstartsmonth, setInternshipStartsMonth] = useState("");
  const [internshipendsmonth, setInternshipEndsMonth] = useState("");
  const [referFriend, setReferFriend] = useState("");
  const [languages, setLanguages] = useState("English");
  
  const [course, setCourse] = useState([]);
  const [lead, setLead] = useState("");
  
  const [monthsToShow, setMonthsToShow] = useState([]);
  const [endMonthsToShow, setEndMonthsToShow] = useState([]);
  const [startMonthsToShow, setStartMonthsToShow] = useState([]);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getMinMaxDates = () => {
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];
    
    const maxDateObj = new Date(today);
    maxDateObj.setDate(today.getDate() + 5);
    const maxDate = maxDateObj.toISOString().split("T")[0];
    
    return { minDate, maxDate };
  };
  const { minDate, maxDate } = getMinMaxDates();

  const generateMonths = (startOffset, count) => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const result = [];
    for (let i = 0; i < count; i++) {
      const totalOffset = currentMonthIndex + startOffset + i;
      const monthIndex = totalOffset % 12;
      const year = currentYear + Math.floor(totalOffset / 12);
      result.push(`${monthNames[monthIndex]} ${year}`);
    }
    return result;
  };

  useEffect(() => {
    // Show current month + next 3 (4 total) for start month
    setMonthsToShow(generateMonths(0, 4));
  }, []);

  // When start month changes, compute end months for the next 3 months
  useEffect(() => {
    if (!internshipstartsmonth) {
      setEndMonthsToShow([]);
      return;
    }
    const [startMonthName, startYearStr] = internshipstartsmonth.split(" ");
    const startMonthIndex = monthNames.indexOf(startMonthName);
    const startYear = parseInt(startYearStr);
    const result = [];
    for (let i = 1; i <= 3; i++) {
      const totalMonths = startMonthIndex + i;
      const monthIndex = totalMonths % 12;
      const year = startYear + Math.floor(totalMonths / 12);
      result.push(`${monthNames[monthIndex]} ${year}`);
    }
    setEndMonthsToShow(result);
    setInternshipEndsMonth("");
  }, [internshipstartsmonth]);

  // When opted month changes, compute start months for the next 3 months
  useEffect(() => {
    if (!monthOpted) {
      setStartMonthsToShow([]);
      return;
    }
    const [optedMonthName, optedYearStr] = monthOpted.split(" ");
    const optedMonthIndex = monthNames.indexOf(optedMonthName);
    const optedYear = parseInt(optedYearStr);
    const result = [];
    for (let i = 1; i <= 3; i++) {
      const totalMonths = optedMonthIndex + i;
      const monthIndex = totalMonths % 12;
      const year = optedYear + Math.floor(totalMonths / 12);
      result.push(`${monthNames[monthIndex]} ${year}`);
    }
    setStartMonthsToShow(result);
    setInternshipStartsMonth("");
  }, [monthOpted]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/getadvcourses`);
      setCourse(response.data);
    } catch (error) {
      console.error("There was an error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const navigate = useNavigate();
  const resetForm = () => {
    setFullname(""); setEmail(""); setAlternativeEmail("");
    setCollegeName(""); setBranch(""); setYearOfStudy("");
    setPhone(""); setWhatsAppNumber(""); setCounselor("");
    setProgramPrice(""); setPaidAmount(""); setRemainingAmount("");
    setProgram(""); setDomain(""); setMonthOpted("");
    setModeOfClasses("");
    setModeOfPayment(""); setTransactionId(""); setClearPaymentMonth("");
    setInternshipStartsMonth(""); setInternshipEndsMonth("");
    setReferFriend(""); setLanguages("English");
    setIsEmailVerified(false);
    navigate("/registrationform");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const formData = {
      fullname, email: email.trim(), alternativeEmail: alternativeEmail.trim(),
      collegeName, branch, yearOfStudy, phone, whatsAppNumber, counselor: counselor.trim(),
      programPrice, paidAmount, remainingAmount, program, domain: domain.trim(), monthOpted,
      modeofpayment, transactionId, clearPaymentMonth, internshipstartsmonth, internshipendsmonth,
      referFriend, languages: [languages], lead: lead.trim(), modeofclasses
    };

    if (isEmailVerified) {
      try {
        let response = await axios.post(`${API}/advenroll`, formData);
        if (response.status === 200 || response.status === 201) {
          setIsModalOpen(true);
        } else {
          toast.error("Error submitting the form.");
          resetForm();
        }
      } catch (error) {
        let errMessage = "An error occurred.";
        if (error.response) {
          errMessage = error.response.data?.message || error.response.data?.error || "An error occurred while processing your request.";
        } else if (error.request) {
          errMessage = "No response from the server. Please try again later.";
        }
        if (errMessage.toString().toLowerCase().includes("already submitted")) {
          errMessage = "You have already submitted your details.";
        }
        setErrorMessage(errMessage);
        setIsModalOpen(true);
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please enter a valid registered email.");
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = async (e) => {
    const enteredEmail = e.target.value.trim();
    setEmail(enteredEmail);
    setIsEmailVerified(false);
    setEmailCheckComplete(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(enteredEmail)) {
      setIsVerifyingEmail(true);
      try {
        const response = await axios.post(`${API}/verify-transaction-email`, { email: enteredEmail });
        if (response.data.success) {
          setCounselor(response.data.counselor || "");
          setLead(response.data.lead || "");
          setIsEmailVerified(true);
        }
      } catch (error) {
        setCounselor("");
        setLead("");
        setIsEmailVerified(false);
      } finally {
        setIsVerifyingEmail(false);
        setEmailCheckComplete(true);
      }
    } else {
      setCounselor(""); setLead(""); setIsVerifyingEmail(false); setEmailCheckComplete(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 pb-12 font-sans relative overflow-hidden bg-slate-50">
      {/* Background Decorators */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[120px] pointer-events-none"></div>
      
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="relative w-full max-w-5xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-8 md:p-12 z-10">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Personal Details */}
          <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Personal & Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                <input value={fullname} onChange={(e) => setFullname(toTitleCase(e.target.value))} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="text" placeholder="John Doe" />
              </div>
              <div className="flex flex-col space-y-2 relative">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Registered Email</label>
                <input value={email} onChange={handleEmailChange} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="email" placeholder="john@example.com" />
                {isVerifyingEmail && <p className="text-[10px] text-blue-500 absolute -bottom-5 left-1 italic font-semibold flex items-center gap-1"><span className="animate-spin inline-block w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full"></span> Checking...</p>}
                {emailCheckComplete && !isEmailVerified && !isVerifyingEmail && <p className="text-[10px] text-red-500 absolute -bottom-5 left-1 font-semibold flex items-center gap-1">⚠️ Email not found</p>}
                {emailCheckComplete && isEmailVerified && !isVerifyingEmail && <p className="text-[10px] text-emerald-500 absolute -bottom-5 left-1 font-semibold flex items-center gap-1">✓ Verified</p>}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">College Email</label>
                <input value={alternativeEmail} onChange={(e) => setAlternativeEmail(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="email" placeholder="student@college.edu" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">College Name</label>
                <input value={collegeName} onChange={(e) => setCollegeName(toTitleCase(e.target.value))} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="text" placeholder="University Name" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Branch/Department</label>
                <input value={branch} onChange={(e) => setBranch(toTitleCase(e.target.value))} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="text" placeholder="Computer Science" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Year of Study</label>
                <select value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                  <option value="" disabled>Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Contact & Support Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Contact No</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="number" placeholder="Enter mobile number" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Whatsapp Number</label>
                <input value={whatsAppNumber} onChange={(e) => setWhatsAppNumber(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="number" placeholder="Enter whatsapp number" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Counselor Name</label>
                <input value={counselor} readOnly required className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl p-3.5 text-sm focus:outline-none cursor-not-allowed shadow-sm" type="text" placeholder="Counselor's Name (Auto-fetched)" />
              </div>
            </div>
          </div>

          {/* Section 3: Financial Details */}
          <div className="bg-orange-50/30 rounded-2xl p-6 md:p-8 border border-orange-100">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Payment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-orange-600 ml-1">Program Price (₹)</label>
                <input value={programPrice} onChange={(e) => setProgramPrice(e.target.value)} required className="w-full bg-white border border-orange-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm" type="number" placeholder="Total Cost" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Paid Amount (₹)</label>
                <input value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="number" placeholder="Amount Paid" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Remaining Amount (₹)</label>
                <input value={remainingAmount} onChange={(e) => setRemainingAmount(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="number" placeholder="Balance Due" />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Mode of Payment</label>
                <select value={modeofpayment} onChange={(e) => setModeOfPayment(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                  <option value="" disabled>Select Payment Mode</option>
                  <option value="RazorPay">RazorPay</option>
                  <option value="QR Code">QR Code</option>
                  <option value="EaseBuZZ">EaseBuZZ</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Transaction ID</label>
                <input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" type="text" placeholder="Txn ID" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Due Date (For Clear Payment)</label>
                <input value={clearPaymentMonth} onChange={(e) => setClearPaymentMonth(e.target.value)} required min={minDate} max={maxDate} className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm text-slate-600 cursor-pointer" type="date" />
              </div>
            </div>
          </div>

          {/* Section 4: Program Details */}
          <div className="bg-indigo-50/40 rounded-2xl p-6 md:p-8 border border-indigo-100">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Program Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Mode of Program</label>
                <select value={program} onChange={(e) => setProgram(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                  <option value="" disabled>Select Mode of Program</option>
                  <option value="Self-Guided [2 Months – Training & Internship]">Self-Guided [2 Months – Training & Internship]</option>
                  <option value="Instructor-Led [2 Months – Training & Internship]">Instructor-Led [2 Months – Training & Internship]</option>
                  <option value="Career Advancement [3 Months – Training, Internship & Placement Assistance]">Career Advancement [3 Months – Training, Internship & Placement Assistance]</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Mode of Classes</label>
                <select value={modeofclasses} onChange={(e) => setModeOfClasses(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                  <option value="" disabled>Select Mode of Classes</option>
                  <option value="Online Class">Online Class</option>
                  <option value="Offline Class">Offline Class</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Opted Domain</label>
                <select value={domain} onChange={(e) => setDomain(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                  <option value="" disabled>Select Domain</option>
                  {course.filter((item) => item.show === true).map((item, idx) => (<option key={idx} value={item.title}>{item.title}</option>))}
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Opted Month</label>
                <select value={monthOpted} onChange={(e) => setMonthOpted(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                  <option value="" disabled>Select Month</option>
                  {monthsToShow.map((month, index) => (<option key={index} value={month}>{month}</option>))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Internship Starts</label>
                <select value={internshipstartsmonth} onChange={(e) => setInternshipStartsMonth(e.target.value)} required disabled={!monthOpted} className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed">
                  <option value="" disabled>{monthOpted ? "Select Start Month" : "Select Opted Month First"}</option>
                  {startMonthsToShow.map((month, index) => (<option key={index} value={month}>{month}</option>))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Internship Ends</label>
                <select value={internshipendsmonth} onChange={(e) => setInternshipEndsMonth(e.target.value)} required disabled={!internshipstartsmonth} className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed">
                  <option value="" disabled>{internshipstartsmonth ? "Select End Month" : "Select Start Month First"}</option>
                  {endMonthsToShow.map((month, index) => (<option key={index} value={month}>{month}</option>))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
              <h2 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">Refer & Earn Cashback</h2>
              <p className="text-[12px] text-slate-500 mb-4">Provide their Name and Contact Number</p>
              <textarea
                value={referFriend}
                onChange={(e) => setReferFriend(e.target.value)}
                placeholder="E.g., Jane Doe - 9876543210"
                rows={3}
                required
                className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm resize-none"
              ></textarea>
            </div>
            
            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 h-full flex flex-col justify-center">
              <label className="text-[12px] font-bold uppercase tracking-wider text-slate-700 mb-3">Primary Language Known</label>
              <div className="relative">
                <select value={languages} onChange={(e) => setLanguages(e.target.value)} required className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Bengali">Bengali</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={isSubmitting} className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-extrabold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-xl shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing Application...
                </span>
              ) : (
                <span className="flex items-center gap-2 tracking-wide text-base">
                  Submit Dashboard Access Form
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      <Dialog
        isOpen={isModalOpen}
        onClose={closeModal}
        fullname={fullname}
        errorMessage={errorMessage}
        email={email}
        counselor={counselor}
        domain={domain}
        monthOpted={monthOpted}
      />
    </div>
  );
};

export default AdvanceDashboardAccess;
