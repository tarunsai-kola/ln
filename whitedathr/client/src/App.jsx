import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FileText,
  Send,
  Download,
  Calendar,
  Briefcase,
  Building,
  DollarSign,
  Target,
  Clock,
  Sparkles,
  Eye,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Phone,
  Layers,
  History,
  Copy,
  Printer,
  Share2,
  ExternalLink,
  HelpCircle,
  X,
  ChevronRight
} from "lucide-react";

// Helper date formatters
const formatDateToDisplay = (dateInput) => {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return dateInput;
  const day = String(d.getDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const getTodayInputDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getFutureInputDate = (daysAhead = 7) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("form"); // "form" | "preview" | "history"
  const [previewSection, setPreviewSection] = useState("all"); // "all" | "letter" | "annexure"
  const [letterType, setLetterType] = useState("intern"); // "intern" | "full_time"

  // Loading states
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingDocx, setLoadingDocx] = useState(false);

  // Server status & config
  const [configStatus, setConfigStatus] = useState({
    emailConfigured: false,
    emailUser: "",
    letterheadReady: true,
  });
  const [showConfigModal, setShowConfigModal] = useState(false);

  // History State
  const [historyList, setHistoryList] = useState([]);
  const [historySearch, setHistorySearch] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    offerDateInput: getTodayInputDate(),
    joiningDateInput: getFutureInputDate(7),
    department: "Inside Sales",
    designation: "Business Development Intern",
    fixedCompensation: "12,500",
    incentive: "10,000",
    // Intern fields
    internshipDuration: "four (4) months",
    ojtDays: "10 working days",
    // Full Time fields
    monthlyTargets: "target to be confirmed by management",
    probationPeriod: "four (4) months",
    postProbationCtc: "4.0 LPA",
    includePostProbationCtc: true,
    // Email specifics
    ccEmail: "hr@growmoresolutions.net",
    customNotes: "",
    workLocation:
      "Grow More Solutions at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.",
    sentBy: "Grow More HR Team",
  });

  // Check backend server config on mount
  const checkConfigStatus = async () => {
    try {
      const res = await axios.get("/api/config-status");
      setConfigStatus(res.data);
    } catch (err) {
      console.warn("Could not reach backend /api/config-status:", err.message);
    }
  };

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get("/api/history");
      setHistoryList(res.data || []);
    } catch (err) {
      console.warn("Could not fetch history:", err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    checkConfigStatus();
    fetchHistory();
  }, []);

  useEffect(() => {
    if (activeTab === "history") {
      fetchHistory();
    }
  }, [activeTab]);

  // Handle Type toggle
  const handleTypeChange = (type) => {
    setLetterType(type);
    if (type === "intern") {
      setFormData((prev) => ({
        ...prev,
        designation: "Business Development Intern",
        fixedCompensation: "12,500",
        incentive: "10,000",
        internshipDuration: "four (4) months",
        ojtDays: "10 working days",
        includePostProbationCtc: false,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        designation: "Business Development Associate",
        fixedCompensation: "15,000",
        incentive: "10,000",
        monthlyTargets: "target to be confirmed by management",
        probationPeriod: "four (4) months",
        includePostProbationCtc: true,
        postProbationCtc: prev.postProbationCtc || "4.0 LPA",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getPayload = () => {
    return {
      letterType,
      candidateName: formData.candidateName.trim(),
      candidateEmail: formData.candidateEmail.trim(),
      candidatePhone: formData.candidatePhone.trim(),
      offerDate: formatDateToDisplay(formData.offerDateInput),
      dateOfJoining: formatDateToDisplay(formData.joiningDateInput),
      department: formData.department.trim(),
      designation: formData.designation.trim(),
      fixedCompensation: formData.fixedCompensation.trim(),
      incentive: formData.incentive.trim(),
      internshipDuration: formData.internshipDuration.trim(),
      ojtDays: formData.ojtDays.trim(),
      monthlyTargets: formData.monthlyTargets.trim(),
      probationPeriod: formData.probationPeriod.trim(),
      postProbationCtc: formData.includePostProbationCtc ? formData.postProbationCtc.trim() : "",
      includePostProbationCtc: Boolean(formData.includePostProbationCtc),
      ccEmail: formData.ccEmail.trim(),
      customNotes: formData.customNotes.trim(),
      workLocation: formData.workLocation.trim(),
      sentBy: formData.sentBy.trim() || "Grow More HR Team",
      emailSubject: `Offer Letter - ${formData.candidateName.trim() || "Candidate"} - ${formData.designation.trim()} | Grow More Solutions`,
    };
  };

  const validateForm = () => {
    if (!formData.candidateName.trim()) {
      toast.error("Please enter the candidate's full name");
      return false;
    }
    if (!formData.candidateEmail.trim()) {
      toast.error("Please enter the candidate's email address");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.candidateEmail.trim())) {
      toast.error("Please enter a valid candidate email");
      return false;
    }
    if (!formData.offerDateInput) {
      toast.error("Please specify the offer date");
      return false;
    }
    if (!formData.joiningDateInput) {
      toast.error("Please specify the date of joining");
      return false;
    }
    return true;
  };

  // 1. Download PDF
  const handleDownloadPdf = async () => {
    if (!validateForm()) return;
    setLoadingPdf(true);
    const toastId = toast.loading("Generating high-resolution official PDF...");
    try {
      const payload = getPayload();
      const res = await axios.post("/api/download-pdf", payload, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const cleanName = (payload.candidateName || "Candidate").replace(/[^a-zA-Z0-9_-]/g, "_");
      link.setAttribute("download", `GrowMore_Offer_Letter_${cleanName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Official PDF downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error("PDF download failed:", err);
      toast.error("Failed to generate PDF file.", { id: toastId });
    } finally {
      setLoadingPdf(false);
    }
  };

  // 2. Download DOCX
  const handleDownloadDocx = async () => {
    if (!validateForm()) return;
    setLoadingDocx(true);
    const toastId = toast.loading("Generating customized DOCX document...");
    try {
      const payload = getPayload();
      const res = await axios.post("/api/download-docx", payload, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const cleanName = (payload.candidateName || "Candidate").replace(/[^a-zA-Z0-9_-]/g, "_");
      link.setAttribute("download", `GrowMore_Offer_Letter_${cleanName}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("DOCX template downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error("DOCX download failed:", err);
      toast.error("Failed to generate DOCX file.", { id: toastId });
    } finally {
      setLoadingDocx(false);
    }
  };

  // 3. Send Email
  const handleSendEmail = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    const payload = getPayload();
    const confirmed = window.confirm(
      `Confirm Email Dispatch:\n\nSend ${letterType === "full_time" ? "Full Time" : "Internship"} Offer Letter to ${payload.candidateName} (${payload.candidateEmail})?`
    );
    if (!confirmed) return;

    setLoadingSend(true);
    const toastId = toast.loading("Rendering letterhead, attaching PDF and delivering email...");
    try {
      const res = await axios.post("/api/send-offer-letter", payload);
      if (res.data && res.data.success) {
        toast.success(res.data.message || "Offer letter dispatched successfully!", { id: toastId });
        fetchHistory();
        checkConfigStatus();
      } else {
        toast.error("Failed to send email", { id: toastId });
      }
    } catch (err) {
      console.error("Error sending offer letter:", err);
      const errMsg = err.response?.data?.error || "Error dispatching offer letter.";
      toast.error(errMsg, { id: toastId, duration: 6000 });
      if (errMsg.includes(".env")) {
        setShowConfigModal(true);
      }
    } finally {
      setLoadingSend(false);
    }
  };

  // Share portal link
  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Portal link copied to clipboard! Share it with your team.");
  };

  // Copy full text
  const handleCopyText = () => {
    const candidateDisplay = formData.candidateName.trim() || "[Candidate Name]";
    const offerDateFormatted = formatDateToDisplay(formData.offerDateInput) || "[DD-MMM-YYYY]";
    const joiningDateFormatted = formatDateToDisplay(formData.joiningDateInput) || "[DD-MMM-YYYY]";

    const text = `OFFER LETTER
GROW MORE SOLUTIONS • ACCELERATING GROWTH & SUCCESS
Dear ${candidateDisplay}              Date: ${offerDateFormatted}

Kindly go through the below details and let us know if you have any queries and/or acknowledge your agreement to the same.

Employment Details
Designation: ${formData.designation}
Date of Joining: ${joiningDateFormatted}
Type of Employment: ${letterType === "full_time" ? "Full Time" : "Internship"}
Department: ${formData.department}
Work Location: ${formData.workLocation}
Remuneration: INR ${formData.fixedCompensation} / month + INR ${formData.incentive} Incentive
${letterType === "full_time" && formData.includePostProbationCtc ? `Annual CTC: Up to ${formData.postProbationCtc}\n` : ""}
Engagement:
You are ${letterType === "full_time" ? "employed" : "engaged"} by the Company in the role of ${formData.designation} in the ${formData.department} department with Grow More Solutions.

Full Terms and Annexure-A apply as per Grow More Solutions corporate policy.`;

    navigator.clipboard.writeText(text);
    toast.success("Offer Letter summary copied to clipboard!");
  };

  // History delete
  const handleDeleteHistory = async (id) => {
    if (!window.confirm("Delete this sent offer letter log?")) return;
    try {
      await axios.delete(`/api/history/${id}`);
      setHistoryList((prev) => prev.filter((item) => item.id !== id));
      toast.success("Log entry deleted");
    } catch (err) {
      toast.error("Failed to delete record");
    }
  };

  const candidateDisplay = formData.candidateName.trim() || "[Candidate Name]";
  const offerDateFormatted = formatDateToDisplay(formData.offerDateInput) || "[DD-MMM-YYYY]";
  const joiningDateFormatted = formatDateToDisplay(formData.joiningDateInput) || "[DD-MMM-YYYY]";
  const isFullTimeWithLpa = letterType === "full_time" && formData.includePostProbationCtc && formData.postProbationCtc;

  const filteredHistory = historyList.filter((item) => {
    const q = historySearch.toLowerCase();
    return (
      (item.candidateName || "").toLowerCase().includes(q) ||
      (item.candidateEmail || "").toLowerCase().includes(q) ||
      (item.designation || "").toLowerCase().includes(q) ||
      (item.letterType || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ── TOP EXECUTIVE NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#0c1c38] text-white shadow-lg border-b border-slate-700/60 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo & Brand Info */}
          <div className="flex items-center gap-4">
            <div className="bg-white p-1.5 rounded-xl shadow-md border border-slate-200">
              <img
                src="/image.png"
                alt="Grow More Solutions Logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">GROW MORE</span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  HR Portal
                </span>
              </div>
              <p className="text-xs text-slate-300 tracking-wide hidden sm:block">
                Grow More Solutions • Contact: 8892330514 • https://www.growmoresolutions.net
              </p>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <button
              onClick={() => setShowConfigModal(true)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${configStatus.emailConfigured
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                : "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                }`}
              title="Click to view Gmail .env configuration"
            >
              <span className={`w-2 h-2 rounded-full ${configStatus.emailConfigured ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              {configStatus.emailConfigured ? (
                <span className="hidden md:inline">Gmail Connected ({configStatus.emailUser})</span>
              ) : (
                <span>Connect Gmail (.env)</span>
              )}
            </button>

            {/* Share Portal Link Button */}
            <button
              onClick={handleShareLink}
              className="flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              title="Copy shareable link"
            >
              <Share2 size={14} />
              <span className="hidden sm:inline">Share Link</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── SUBHEADER BANNER (Public Access Notice & Nav Tabs) ── */}
      <div className="bg-white border-b border-slate-200 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-1 border border-emerald-200/60">
                <Sparkles size={12} className="text-emerald-600" /> Public Access • No Login Required
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                Grow More Solutions Offer Letter Portal
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Generate official A4 letterhead offer letters, download PDF/Word documents, and email directly to candidates.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${activeTab === "form"
                  ? "bg-[#0c1c38] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <FileText size={15} /> Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${activeTab === "preview"
                  ? "bg-[#0c1c38] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <Eye size={15} /> A4 Sheet Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${activeTab === "history"
                  ? "bg-[#0c1c38] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <History size={15} /> Sent History
                {historyList.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-sky-100 text-sky-800 rounded-full text-[10px] font-bold">
                    {historyList.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* ══════════════════════════════════════════════════════════
            TAB 1: OFFER LETTER EDITOR
        ══════════════════════════════════════════════════════════ */}
        {activeTab === "form" && (
          <div className="space-y-8">
            {/* Type Switcher Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Select Employment Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleTypeChange("intern")}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-4 ${letterType === "intern"
                    ? "border-sky-600 bg-sky-50/50 shadow-md ring-2 ring-sky-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${letterType === "intern"
                      ? "bg-sky-600 text-white shadow-md shadow-sky-200"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    IN
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-slate-900 text-base">Internship Offer Letter</h3>
                      {letterType === "intern" && (
                        <CheckCircle2 size={16} className="text-sky-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      4-Month duration, 10-day unpaid OJT, INR 12,500 Base + INR 10,000 performance incentive.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange("full_time")}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-4 ${letterType === "full_time"
                    ? "border-sky-600 bg-sky-50/50 shadow-md ring-2 ring-sky-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${letterType === "full_time"
                      ? "bg-[#0c1c38] text-white shadow-md shadow-slate-300"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    FT
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-slate-900 text-base">Full Time Offer Letter</h3>
                      {letterType === "full_time" && (
                        <CheckCircle2 size={16} className="text-sky-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      4-Month probation, INR 15,000 Base + INR 10,000 incentive, post-probation package up to 4.0 LPA.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Form + Sidebar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Form Fields: 2 Columns */}
              <div className="lg:col-span-2 space-y-8">

                {/* 1. Candidate Personal Details */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-6">
                  <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                    <User size={19} className="text-sky-600" />
                    <div>
                      <h2 className="text-base font-black text-slate-900">1. Candidate Information</h2>
                      <p className="text-xs text-slate-500">Recipient details for document generation & delivery</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Candidate Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="candidateName"
                        value={formData.candidateName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Candidate Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                        <input
                          type="email"
                          name="candidateEmail"
                          value={formData.candidateEmail}
                          onChange={handleChange}
                          placeholder="rahul.sharma@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Contact Phone Number
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-3 text-slate-400" />
                        <input
                          type="tel"
                          name="candidatePhone"
                          value={formData.candidatePhone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Key Dates & Department */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-6">
                  <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                    <Calendar size={19} className="text-sky-600" />
                    <div>
                      <h2 className="text-base font-black text-slate-900">2. Dates, Role & Location</h2>
                      <p className="text-xs text-slate-500">Official engagement timeline and organizational unit</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Offer Issue Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="offerDateInput"
                        value={formData.offerDateInput}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Doc format: {formatDateToDisplay(formData.offerDateInput)}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Date of Joining (DOJ) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="joiningDateInput"
                        value={formData.joiningDateInput}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Doc format: {formatDateToDisplay(formData.joiningDateInput)}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Inside Sales"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Designation / Role Title
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Work Location & Office Address
                      </label>
                      <input
                        type="text"
                        name="workLocation"
                        value={formData.workLocation}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Compensation & Tenancy Details */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-6">
                  <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                    <DollarSign size={19} className="text-sky-600" />
                    <div>
                      <h2 className="text-base font-black text-slate-900">3. Remuneration & Terms</h2>
                      <p className="text-xs text-slate-500">Stipend, performance incentives, and probation clauses</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Fixed Base Compensation (INR / month)
                      </label>
                      <input
                        type="text"
                        name="fixedCompensation"
                        value={formData.fixedCompensation}
                        onChange={handleChange}
                        placeholder={letterType === "full_time" ? "15,000" : "12,500"}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Performance Incentive (INR / month)
                      </label>
                      <input
                        type="text"
                        name="incentive"
                        value={formData.incentive}
                        onChange={handleChange}
                        placeholder="10,000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-bold text-slate-900"
                      />
                    </div>

                    {/* Internship Specific Fields */}
                    {letterType === "intern" && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Internship Duration
                          </label>
                          <input
                            type="text"
                            name="internshipDuration"
                            value={formData.internshipDuration}
                            onChange={handleChange}
                            placeholder="four (4) months"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            On Job Training (OJT) Days (Unpaid)
                          </label>
                          <input
                            type="text"
                            name="ojtDays"
                            value={formData.ojtDays}
                            onChange={handleChange}
                            placeholder="10 working days"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                          />
                        </div>
                      </>
                    )}

                    {/* Full Time Specific Fields */}
                    {letterType === "full_time" && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Probation Period Duration
                          </label>
                          <input
                            type="text"
                            name="probationPeriod"
                            value={formData.probationPeriod}
                            onChange={handleChange}
                            placeholder="four (4) months"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Monthly Target Specification
                          </label>
                          <input
                            type="text"
                            name="monthlyTargets"
                            value={formData.monthlyTargets}
                            onChange={handleChange}
                            placeholder="target to be confirmed by management"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                          />
                        </div>

                        {/* Post-Probation CTC Section */}
                        <div className="sm:col-span-2 bg-sky-50/60 border border-sky-200 rounded-2xl p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                name="includePostProbationCtc"
                                checked={formData.includePostProbationCtc}
                                onChange={handleChange}
                                className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500 cursor-pointer"
                              />
                              <span className="font-bold text-sm text-slate-800">
                                Include Post-Probation Annual CTC Clause
                              </span>
                            </label>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                              Recommended
                            </span>
                          </div>

                          {formData.includePostProbationCtc && (
                            <div className="pt-2 space-y-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                  Post-Probation Annual Package (e.g. 4.0 LPA)
                                </label>
                                <input
                                  type="text"
                                  name="postProbationCtc"
                                  value={formData.postProbationCtc}
                                  onChange={handleChange}
                                  placeholder="4.0 LPA"
                                  className="w-full px-4 py-2.5 rounded-xl border border-sky-300 text-sm font-bold text-slate-900 bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                                />
                              </div>

                              {/* Quick Presets */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs text-slate-500 font-medium">Quick presets:</span>
                                {["3.5 LPA", "4.0 LPA", "4.5 LPA", "5.0 LPA", "6.0 LPA"].map((ctc) => (
                                  <button
                                    key={ctc}
                                    type="button"
                                    onClick={() => setFormData((p) => ({ ...p, postProbationCtc: ctc }))}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${formData.postProbationCtc === ctc
                                      ? "bg-sky-600 text-white shadow-sm"
                                      : "bg-white border border-slate-200 text-slate-700 hover:border-sky-300"
                                      }`}
                                  >
                                    {ctc}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 4. Email Settings & HR Custom Note */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-6">
                  <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                    <Mail size={19} className="text-sky-600" />
                    <div>
                      <h2 className="text-base font-black text-slate-900">4. Email Delivery Options</h2>
                      <p className="text-xs text-slate-500">Configure email CC and personalized HR notes</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        CC Email Address
                      </label>
                      <input
                        type="email"
                        name="ccEmail"
                        value={formData.ccEmail}
                        onChange={handleChange}
                        placeholder="hr@growmoresolutions.net"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Sent By (HR Signatory Name)
                      </label>
                      <input
                        type="text"
                        name="sentBy"
                        value={formData.sentBy}
                        onChange={handleChange}
                        placeholder="Grow More HR Team"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all font-medium text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Personal Note from HR (Optional - inserted in email body)
                      </label>
                      <textarea
                        rows={3}
                        name="customNotes"
                        value={formData.customNotes}
                        onChange={handleChange}
                        placeholder="e.g. We were very impressed with your interview performance and look forward to welcoming you to the Grow More family!"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all text-slate-900"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Sidebar Action Panel (Sticky) */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-28 space-y-6">

                  {/* Summary Card Header */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                      Offer Overview
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1">
                      {formData.candidateName.trim() || "Candidate Name"}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {formData.designation} • {letterType === "full_time" ? "Full Time" : "Internship"}
                    </p>
                  </div>

                  {/* Summary Info */}
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 text-xs border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Offer Date:</span>
                      <span className="font-bold text-slate-800">{offerDateFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date of Joining:</span>
                      <span className="font-bold text-slate-800">{joiningDateFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Monthly Base:</span>
                      <span className="font-bold text-slate-800">INR {formData.fixedCompensation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Incentive:</span>
                      <span className="font-bold text-slate-800">INR {formData.incentive}</span>
                    </div>
                    {isFullTimeWithLpa && (
                      <div className="flex justify-between border-t border-slate-200 pt-2">
                        <span className="text-slate-500 font-bold">Annual CTC:</span>
                        <span className="font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                          Up to {formData.postProbationCtc}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Primary Action: Send Email */}
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={loadingSend}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0c1c38] hover:bg-[#122a54] text-white font-black text-sm shadow-lg shadow-slate-300 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loadingSend ? (
                      <>
                        <RefreshCw size={17} className="animate-spin text-sky-400" />
                        <span>Sending Offer Letter...</span>
                      </>
                    ) : (
                      <>
                        <Send size={17} className="text-sky-400" />
                        <span>Send Offer Letter Email</span>
                      </>
                    )}
                  </button>

                  {/* Secondary Download Actions */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={loadingPdf}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs hover:bg-rose-100 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loadingPdf ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                      PDF (Letterhead)
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadDocx}
                      disabled={loadingDocx}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loadingDocx ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                      DOCX (Word)
                    </button>
                  </div>

                  {/* Preview Switch Button */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all cursor-pointer"
                  >
                    <Eye size={15} />
                    <span>View A4 Sheet Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Copy size={13} />
                    <span>Copy Letter Summary</span>
                  </button>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 2: A4 SHEET DOCUMENT PREVIEW
        ══════════════════════════════════════════════════════════ */}
        {activeTab === "preview" && (
          <div className="space-y-6">

            {/* Preview Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Show Section:</span>
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewSection("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${previewSection === "all"
                      ? "bg-[#0c1c38] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    Entire Document (Page 1 & 2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSection("letter")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${previewSection === "letter"
                      ? "bg-[#0c1c38] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    Page 1: Offer Letter
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSection("annexure")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${previewSection === "annexure"
                      ? "bg-[#0c1c38] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    Page 2: Annexure-A
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={14} /> Print
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={loadingPdf}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 flex items-center gap-1.5 cursor-pointer"
                >
                  {loadingPdf ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadDocx}
                  disabled={loadingDocx}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 flex items-center gap-1.5 cursor-pointer"
                >
                  {loadingDocx ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                  Download DOCX
                </button>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  disabled={loadingSend}
                  className="px-4 py-2 rounded-xl bg-[#0c1c38] hover:bg-[#122a54] text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Send size={14} className="text-sky-400" />
                  Send Email
                </button>
              </div>
            </div>

            {/* ── REALISTIC A4 PREVIEW CONTAINER ── */}
            <div className="space-y-10 py-4">

              {/* ── PAGE 1: MAIN OFFER LETTER ── */}
              {(previewSection === "all" || previewSection === "letter") && (
                <div className="a4-sheet a4-bg rounded-lg border border-slate-300 p-8 sm:p-12 font-serif text-slate-800 text-[13px] leading-relaxed select-text">

                  {/* Space reserved for Top Header Letterhead (120px) */}
                  <div className="h-[95px]" />

                  {/* Title */}
                  <div className="text-center font-bold text-lg tracking-wider text-slate-900 border-b border-slate-300 pb-3 mb-5 font-sans">
                    OFFER LETTER
                  </div>

                  {/* Candidate Name & Date */}
                  <div className="flex justify-between items-center font-bold text-xs sm:text-sm mb-4">
                    <div>
                      Dear <span className="text-[#0c1c38] font-black bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{candidateDisplay}</span>
                    </div>
                    <div>
                      Date: <span className="text-[#0c1c38] font-black bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{offerDateFormatted}</span>
                    </div>
                  </div>

                  <p className="text-xs italic text-slate-600 mb-5">
                    Kindly go through the below details and let us know if you have any queries and/or acknowledge your agreement to the same.
                  </p>

                  {/* Employment Details Card */}
                  <div className="mb-5">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-2">
                      Employment Details
                    </h3>
                    <div className="bg-white/95 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs font-sans shadow-sm">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-bold text-slate-500">Designation:</span>
                        <span className="font-black text-slate-900">{formData.designation}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-bold text-slate-500">Date of Joining:</span>
                        <span className="font-black text-[#0c1c38] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{joiningDateFormatted}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-bold text-slate-500">Type of Employment:</span>
                        <span className="font-black text-slate-900">
                          {letterType === "full_time"
                            ? (isFullTimeWithLpa ? `Full Time (${formData.probationPeriod || "4-Month"} Probation)` : "Full Time")
                            : "Internship"}
                        </span>
                      </div>
                      {isFullTimeWithLpa && (
                        <>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="font-bold text-slate-500">Probation Remuneration:</span>
                            <span className="font-bold text-slate-900">
                              INR {formData.fixedCompensation || "15,000"} (Base) + INR {formData.incentive || "10,000"} (Incentive) / month
                            </span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="font-bold text-slate-500">Annual CTC:</span>
                            <span className="font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                              Up to {formData.postProbationCtc} (Subject to performance review post-probation)
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-bold text-slate-500">Department:</span>
                        <span className="font-black text-[#0c1c38] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{formData.department}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-bold text-slate-500">Work Location:</span>
                        <span className="font-medium text-slate-800 text-right max-w-md">{formData.workLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-1">
                      Engagement
                    </h4>
                    <p className="text-xs">
                      You are {letterType === "full_time" ? "employed" : "engaged"} by the Company in the role of <strong>{formData.designation}</strong> in the <span className="bg-blue-50 font-bold px-1 py-0.5 rounded border border-blue-100 text-[#0c1c38]">{formData.department}</span> department with Grow More Solutions at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.
                    </p>
                  </div>

                  {/* Period of Service */}
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-1">
                      Period of Service
                    </h4>
                    <p className="text-xs">
                      {letterType === "full_time"
                        ? isFullTimeWithLpa
                          ? `You shall be on a probationary period of ${formData.probationPeriod || "four (4) months"} from the date of your joining, which includes the job training period. Upon successful completion of probation and based on performance evaluation and management discretion, you may be considered for confirmation with an annual package of up to ${formData.postProbationCtc}.`
                          : `You shall be on a probationary period of ${formData.probationPeriod || "four (4) months"} from the date of your joining, which includes the job training period. Upon successful completion of probation and based on performance assessment, your employment will be confirmed.`
                        : `The internship is for a period of ${formData.internshipDuration} from the date of joining, inclusive of the job training period. The Company may, at its discretion, consider you for further opportunities based on your performance.`}
                    </p>
                  </div>

                  {/* On Job Training Period */}
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-1">
                      On Job Training Period (OJT)
                    </h4>
                    <p className="text-xs">
                      Please be advised that the training period will be of <strong>{formData.ojtDays}</strong>, which will be <strong>UNPAID</strong>. In the event of taking any leave during the On Job Training (OJT) period, it will be necessary to recommence the training from the initial day upon return. This policy ensures the comprehensive acquisition of the skills and knowledge essential for optimal performance in the designated role.
                    </p>
                  </div>

                  {/* Remuneration */}
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-1">
                      Remuneration
                    </h4>
                    {isFullTimeWithLpa ? (
                      <>
                        <p className="text-xs">
                          After {formData.ojtDays} of OJT, during the probationary period of <strong>{formData.probationPeriod || "four (4) months"}</strong>, you will be offered a monthly compensation of <strong>INR <span className="bg-blue-50 px-1 py-0.5 rounded border border-blue-100 text-[#0c1c38] font-black">{formData.fixedCompensation}</span> (Fixed Base) + INR <span className="bg-blue-50 px-1 py-0.5 rounded border border-blue-100 text-[#0c1c38] font-black">{formData.incentive}</span> (Performance-Based Incentive)</strong>. Upon successful completion of the {formData.probationPeriod || "four (4) months"} probation period, subject to satisfactory performance evaluation, target achievements, and management discretion, you may be considered for an annual compensation package of <strong className="text-[#0c1c38] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">up to {formData.postProbationCtc}</strong>. All benefits and allowances will be governed as per company policy.
                        </p>
                        <p className="text-xs font-bold text-slate-700 mt-1">
                          Note: {formData.probationPeriod || "4-Month"} Probation period.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs">
                          After {formData.ojtDays} of OJT, you will be offered a total compensation of <strong>INR <span className="bg-blue-50 px-1 py-0.5 rounded border border-blue-100 text-[#0c1c38] font-black">{formData.fixedCompensation}</span> per month + INR <span className="bg-blue-50 px-1 py-0.5 rounded border border-blue-100 text-[#0c1c38] font-black">{formData.incentive}</span></strong> {letterType === "full_time" ? "performance-based incentive" : "based on performance incentive"}. All benefits and allowances will be governed as per company policy.
                        </p>
                        <p className="text-xs font-bold text-slate-700 mt-1">
                          Note: {letterType === "full_time" ? "4-Month Probation period." : "4-Month Intern period."}
                        </p>
                      </>
                    )}
                    <p className="text-xs text-slate-600 mt-1">
                      For detailed terms of the contract, kindly refer to the Terms of Employment (Annexure-A) for your review and acceptance. If you choose to accept this offer of employment, please revert to our mail confirming your acceptance and also submit the hard copy to the HR Department.
                    </p>
                  </div>

                  {/* Deductions */}
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-1">
                      Deductions
                    </h4>
                    <p className="text-xs">
                      The remuneration for any calendar month shall be subject to deduction under the following conditions:
                      <br />• Unexcused leaves (without prior notice and/or no notice whatsoever).
                      <br />• Destruction of company property.
                      <br />• Loss and/or theft of company data, which includes but is not limited to leads, raw data, and information of clients/prospects; and misappropriation of company resources.
                    </p>
                  </div>

                  {/* Working Hours Policy */}
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-1">
                      Working Hours Policy
                    </h4>
                    <p className="text-xs">
                      <strong>Login Time:</strong> Employees are required to log in by 11:00 AM, with a grace period of 5 minutes allowed for unavoidable delays.
                      <br /><strong>Late Arrivals:</strong> Repeated late logins may be treated as leave or loss of pay as per company policy.
                      <br /><strong>Break Schedule:</strong> Lunch Break: 1:30 PM – 2:30 PM | Tea Break: 5:45 PM – 6:00 PM
                      <br /><strong>Logout Time:</strong> The official logout time is 8:00 PM. Employees may be required to extend working hours based on business requirements.
                    </p>
                  </div>

                  {/* Performance Expectation */}
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-1">
                      Performance Expectation (Target-Based)
                    </h4>
                    <p className="text-xs">
                      You are required to meet assigned performance targets and carry out your responsibilities diligently. Your performance will be reviewed periodically based on quality of work, productivity, and target achievement.{letterType === "full_time" ? ` Failing to meet the minimum monthly targets [${formData.monthlyTargets}] during the probation period.` : ""}
                    </p>
                  </div>

                  {/* Confidentiality & Company Property */}
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0c1c38] font-sans mb-1">
                      Confidentiality & Property
                    </h4>
                    <p className="text-xs">
                      You are required to maintain strict confidentiality of all company and client information during and after your employment. Your individual remuneration is purely between yourself and the company. All company property must be used responsibly and returned in good condition.
                    </p>
                  </div>

                  {/* Acknowledgment Box */}
                  <div className="bg-slate-50/90 border border-slate-300 p-4 rounded-xl mt-6">
                    <h5 className="font-bold text-[11px] uppercase tracking-wider text-[#0c1c38] mb-1 font-sans">
                      Acknowledgment & Acceptance
                    </h5>
                    <p className="text-[11px] text-slate-600 mb-4">
                      ALL EMPLOYEES MUST READ THIS LETTER, THEN FILL OUT AND RETURN THIS PORTION TO THE HUMAN RESOURCES DEPARTMENT WITHIN ONE WEEK OF JOINING.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <span className="text-slate-500 block">Employee Signature:</span>
                        <div className="border-b border-slate-400 mt-6" />
                        <span className="text-slate-900 font-bold mt-1 block">Name: {candidateDisplay}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Date of Acceptance:</span>
                        <div className="border-b border-slate-400 mt-6" />
                        <span className="text-slate-900 font-bold mt-1 block">Date: {offerDateFormatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Clearance for Letterhead Footer */}
                  <div className="h-[75px]" />
                </div>
              )}

              {/* ── PAGE 2: ANNEXURE-A (TERMS OF EMPLOYMENT) ── */}
              {(previewSection === "all" || previewSection === "annexure") && (
                <div className="a4-sheet a4-bg rounded-lg border border-slate-300 p-8 sm:p-12 font-serif text-slate-800 text-[12.5px] leading-relaxed select-text">

                  {/* Space reserved for Top Header Letterhead */}
                  <div className="h-[95px]" />

                  {/* Annexure-A Title */}
                  <div className="text-center font-bold text-lg text-[#0c1c38] font-sans tracking-wide">
                    “ANNEXURE-A”
                  </div>
                  <div className="text-center font-bold text-sm text-slate-700 font-sans tracking-wider mb-6 border-b border-slate-300 pb-3">
                    TERMS OF EMPLOYMENT
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <strong className="text-[#0c1c38] font-sans">1. Employment:</strong> Your employment with the Company will commence from the date of joining mentioned in this letter and will be governed by Grow More Solutions policies.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">2. Roles & Responsibilities:</strong> You are expected to perform your duties diligently, meet assigned targets, and follow instructions from your reporting manager.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">3. Working Hours:</strong> You are required to adhere to the Company’s working hours and attendance policies as communicated. Given your role, you may need to work beyond standard hours when necessary.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">4. Policy Compliance:</strong> You are expected to comply with all Company policies, rules, and regulations as updated from time to time.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">Effectiveness:</strong> Your employment with Grow More Solutions will be governed by the Company’s policies, as modified from time to time. This agreement becomes effective on the commencement of your service.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">Employee Conduct:</strong> All managers and employees are expected to engage with our clients, vendors, guests, and fellow team members with respect and consideration. Behaviours such as rudeness, gossiping, use of profanity, or vulgar language are unacceptable and may result in immediate termination.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">Termination of Employment:</strong> The Company may terminate your employment immediately, with or without notice, under serious offences (embezzlement, intoxication, unauthorized absences, misuse of confidential data), misconduct, breach of contract, or prolonged incompetence.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">Non-Disclosure & Confidentiality:</strong> You agree to maintain strict confidentiality of all source code, graphical assets, databases, leads, client lists, and intellectual property belonging to Grow More Solutions.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">Non-Compete Agreement:</strong> For a period of four (4) months following termination, you agree not to engage in any employment or activity that competes directly or indirectly with Grow More Solutions' business.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">Non-Solicitation Agreement:</strong> During service and for four (4) months following, you agree not to induce any employee to leave Grow More Solutions or solicit any customer of the Company.
                    </div>

                    <div>
                      <strong className="text-[#0c1c38] font-sans">Intellectual Property:</strong> All work products created during your employment shall be considered “works made for hire” and all worldwide rights, title, and interest belong exclusively to Grow More Solutions.
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="mt-8 pt-4 border-t border-slate-300">
                    <p className="text-xs font-bold text-[#0c1c38] italic mb-6">
                      “We sincerely hope you have a rewarding experience with us and that you grow in your role.”
                    </p>

                    <div className="grid grid-cols-2 gap-8 text-xs font-sans">
                      <div>
                        <span className="text-slate-500 block">Employee Signature:</span>
                        <div className="border-b border-slate-400 mt-8" />
                        <span className="text-slate-900 font-bold mt-1 block">Date: {offerDateFormatted}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">HR Authorized Signatory:</span>
                        <div className="border-b border-slate-400 mt-8" />
                        <span className="text-slate-900 font-bold mt-1 block">Grow More HR Department</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Clearance for Letterhead Footer */}
                  <div className="h-[75px]" />
                </div>
              )}

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 3: SENT OFFER LETTER HISTORY
        ══════════════════════════════════════════════════════════ */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-800">Sent Offer Letters History</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Records of offer letters generated and emailed to candidates
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchHistory}
                  disabled={loadingHistory}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <RefreshCw size={14} className={loadingHistory ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>

              {/* Search Bar */}
              <div className="pt-4">
                <input
                  type="text"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  placeholder="Search by candidate name, email, or designation..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
                    <FileText size={24} />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">No Offer Letters Sent Yet</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Fill out the candidate form in the Editor tab and hit Send to generate and email your first offer letter!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3.5">Candidate</th>
                        <th className="px-5 py-3.5">Role & Type</th>
                        <th className="px-5 py-3.5">Date of Joining</th>
                        <th className="px-5 py-3.5">Remuneration</th>
                        <th className="px-5 py-3.5">Sent At</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-4">
                            <div className="font-bold text-slate-900">{item.candidateName}</div>
                            <div className="text-[11px] text-slate-500">{item.candidateEmail}</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-800">{item.designation}</div>
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100 mt-0.5">
                              {item.letterType === "full_time" ? "Full Time" : "Internship"}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-medium text-slate-700">
                            {item.dateOfJoining}
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-bold text-slate-900">INR {item.fixedCompensation}</span>
                            <span className="text-[11px] text-slate-500"> + {item.incentive} Inc</span>
                          </td>
                          <td className="px-5 py-4 text-slate-500">
                            {item.sentAt ? new Date(item.sentAt).toLocaleDateString() : "—"}
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 size={11} /> {item.status || "Delivered"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteHistory(item.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ── GMAIL .ENV CONFIGURATION MODAL ── */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-[#0c1c38] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-sky-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg">Gmail & .env Configuration</h3>
                  <p className="text-xs text-slate-300">How to connect email sending to the portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className={`p-4 rounded-2xl border ${configStatus.emailConfigured ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-900"}`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {configStatus.emailConfigured ? <CheckCircle2 size={16} className="text-emerald-600" /> : <AlertCircle size={16} className="text-amber-600" />}
                  {configStatus.emailConfigured ? "Gmail is Active & Connected!" : "Gmail Credentials Missing in .env"}
                </div>
                <p>
                  {configStatus.emailConfigured
                    ? `Emails are dispatched using: ${configStatus.emailUser}`
                    : "To send offer letters directly from the portal, enter your Gmail and App Password in the .env file."}
                </p>
              </div>

              <div>
                <h4 className="font-black text-slate-900 text-sm mb-2">3 Simple Steps to Connect:</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Open your Google Account Security settings (
                    <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noreferrer" className="text-sky-600 font-bold underline inline-flex items-center gap-0.5">
                      myaccount.google.com/apppasswords <ExternalLink size={10} />
                    </a>
                    ) and create an App Password named <strong>GrowMore HR</strong>.
                  </li>
                  <li>Copy the 16-character generated password (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono font-bold">abcd efgh ijkl mnop</code>).</li>
                  <li>
                    Open the file <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono font-bold">whitedathr/.env</code> and enter:
                    <div className="mt-2 bg-slate-900 text-sky-300 p-3 rounded-xl font-mono text-[11px] select-all">
                      EMAIL_USER=your_email@gmail.com<br />
                      EMAIL_PASS=your_16_char_password
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-500">
                <span className="font-bold text-slate-700">Note:</span> PDF and DOCX download always work directly even if Gmail is not connected yet!
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 flex justify-end border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#0c1c38] text-white text-xs font-bold hover:bg-[#122a54] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} <strong>Grow More Solutions</strong> • All rights reserved.
          </p>
          <p className="text-slate-500">
            Grow More Solutions HR Offer Letter Portal • Tel: 8892330514 • <a href="https://www.growmoresolutions.net/#home" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">growmoresolutions.net</a>
          </p>
        </div>
      </footer>

    </div>
  );
}
