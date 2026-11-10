import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
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
  User,
  Mail,
  Phone,
  Layers,
  FileCheck,
  History,
  Info,
  Copy,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Helper to format date to "10-Nov-2026"
const formatDateToDocx = (dateInput) => {
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

const HRSendOfferLetter = () => {
  const [activeTab, setActiveTab] = useState("form"); // "form" | "preview" | "history"
  const [previewSection, setPreviewSection] = useState("all"); // "all" | "letter" | "annexure"
  const [letterType, setLetterType] = useState("intern"); // "intern" | "full_time"
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState("");

  const hrName = localStorage.getItem("hrName") || "HR Team";

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
    probationPeriod: "six (6) months",
    // Email specifics
    ccEmail: "aravind@accenlearn.com",
    customNotes: "",
    workLocation:
      "Accenlearn at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.",
  });

  // Handle Type switch
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
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        designation: "Business Development Associate",
        fixedCompensation: "15,000",
        incentive: "10,000",
        monthlyTargets: "target to be confirmed by management",
        probationPeriod: "six (6) months",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Build Payload
  const getPayload = () => {
    return {
      letterType,
      candidateName: formData.candidateName.trim(),
      candidateEmail: formData.candidateEmail.trim(),
      candidatePhone: formData.candidatePhone.trim(),
      offerDate: formatDateToDocx(formData.offerDateInput),
      dateOfJoining: formatDateToDocx(formData.joiningDateInput),
      department: formData.department.trim(),
      designation: formData.designation.trim(),
      fixedCompensation: formData.fixedCompensation.trim(),
      incentive: formData.incentive.trim(),
      internshipDuration: formData.internshipDuration.trim(),
      ojtDays: formData.ojtDays.trim(),
      monthlyTargets: formData.monthlyTargets.trim(),
      probationPeriod: formData.probationPeriod.trim(),
      ccEmail: formData.ccEmail.trim(),
      customNotes: formData.customNotes.trim(),
      workLocation: formData.workLocation.trim(),
      sentBy: hrName,
      emailSubject: `Offer Letter - ${formData.candidateName.trim() || "Candidate"} - ${formData.designation.trim()} | Accenlearn`,
    };
  };

  // Fetch History
  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get(`${API}/api/hr/offer-letter/history`);
      setHistoryList(res.data || []);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (activeTab === "history") {
      fetchHistory();
    }
  }, [activeTab]);

  // Validation
  const validateForm = () => {
    if (!formData.candidateName.trim()) {
      toast.error("Please enter the candidate full name");
      return false;
    }
    if (!formData.candidateEmail.trim()) {
      toast.error("Please enter the candidate email");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.candidateEmail.trim())) {
      toast.error("Please enter a valid candidate email address");
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

  // 1. Download DOCX
  const handleDownloadDocx = async () => {
    if (!validateForm()) return;
    setLoadingDocx(true);
    try {
      const payload = getPayload();
      const res = await axios.post(`${API}/api/hr/offer-letter/generate-docx`, payload, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const cleanName = (payload.candidateName || "Candidate").replace(/[^a-zA-Z0-9_-]/g, "_");
      link.setAttribute("download", `Accenlearn_Offer_Letter_${cleanName}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("DOCX offer letter downloaded successfully!");
    } catch (err) {
      console.error("Download DOCX failed:", err);
      toast.error("Failed to generate DOCX file.");
    } finally {
      setLoadingDocx(false);
    }
  };

  // 2. Send via Email
  const handleSendEmail = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    const payload = getPayload();
    const confirmSend = window.confirm(
      `Are you sure you want to send the ${letterType === "full_time" ? "Full Time" : "Internship"} Offer Letter to ${payload.candidateName} (${payload.candidateEmail})?`
    );
    if (!confirmSend) return;

    setLoadingSend(true);
    const toastId = toast.loading("Generating offer letter and delivering email...");
    try {
      const res = await axios.post(`${API}/api/hr/offer-letter/send`, payload);
      if (res.data && res.data.success) {
        toast.success(res.data.message || "Offer letter sent successfully!", { id: toastId });
        fetchHistory();
      } else {
        toast.error("Failed to dispatch email", { id: toastId });
      }
    } catch (err) {
      console.error("Error sending offer letter:", err);
      toast.error(err.response?.data?.error || "Error dispatching offer letter.", { id: toastId });
    } finally {
      setLoadingSend(false);
    }
  };

  // History helpers
  const handleDownloadHistoryItem = async (id, name, ext) => {
    try {
      const endpoint = `${API}/api/hr/offer-letter/${id}/download-${ext}`;
      const res = await axios.get(endpoint, { responseType: "blob" });
      const mime = ext === "docx"
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "application/pdf";
      const blob = new Blob([res.data], { type: mime });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const cleanName = (name || "Candidate").replace(/[^a-zA-Z0-9_-]/g, "_");
      link.setAttribute("download", `Accenlearn_Offer_Letter_${cleanName}.${ext}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(`Downloaded ${ext.toUpperCase()}`);
    } catch (err) {
      toast.error(`Failed to download ${ext.toUpperCase()}`);
    }
  };

  const handleDeleteHistoryItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer letter log?")) return;
    try {
      await axios.delete(`${API}/api/hr/offer-letter/${id}`);
      toast.success("Record deleted");
      setHistoryList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete record");
    }
  };

  const filteredHistory = historyList.filter((item) => {
    const q = historySearch.toLowerCase();
    return (
      (item.candidateName || "").toLowerCase().includes(q) ||
      (item.candidateEmail || "").toLowerCase().includes(q) ||
      (item.designation || "").toLowerCase().includes(q) ||
      (item.letterType || "").toLowerCase().includes(q)
    );
  });

  const offerDateFormatted = formatDateToDocx(formData.offerDateInput) || "[DD- MMM- 2026]";
  const joiningDateFormatted = formatDateToDocx(formData.joiningDateInput) || "[DD- MMM- 2026]";
  const candidateDisplay = formData.candidateName.trim() || "[Candidate Name]";

  // Copy full text
  const handleCopyText = () => {
    const fullText = `OFFER LETTER
Dear ${candidateDisplay}\tDate: ${offerDateFormatted}
Kindly go through the below details and let us know if you have any queries and/or acknowledge your agreement to the same.

Employment Details
Designation: ${formData.designation}
Date of Joining: ${joiningDateFormatted}
Type of Employment: ${letterType === "full_time" ? "Full Time" : "Internship"}
Department: ${formData.department}
Work Location: ${formData.workLocation}

Engagement
You are ${letterType === "full_time" ? "employed" : "engaged"} by the Company in the role of ${formData.designation} in the ${formData.department} department with Accenlearn at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.

Period of Service
${letterType === "full_time"
  ? `You shall be on a probationary period of ${formData.probationPeriod} from the date of your joining, which includes the job training period. Upon successful completion of probation and based on performance assessment, your employment will be confirmed.`
  : `The internship is for a period of ${formData.internshipDuration} from the date of joining, inclusive of the job training period. The Company may, at its discretion, consider you for further opportunities based on your performance.`}

On Job Training Period (OJT)
Please be advised that the training period will be of ${formData.ojtDays}, which will be UNPAID. In the event of taking any leave during the On Job Training (OJT) period, it will be necessary to recommence the training from the initial day upon return. This policy ensures the comprehensive acquisition of the skills and knowledge essential for optimal performance in the designated role.

Remuneration
After ${formData.ojtDays} of OJT, you will be offered a total compensation of INR ${formData.fixedCompensation} per month + INR ${formData.incentive} ${letterType === "full_time" ? "performance-based incentive" : "based on performance incentive"}. All benefits and allowances will be governed as per company policy.
Note: 4-Month Intern period.
For detailed terms of the contract, kindly refer to the Terms of Employment (Annexure-A) for your review and acceptance. If you choose to accept this offer of employment, please revert to our mail confirming your acceptance and also submit the hard copy to the HR Department.

Deductions
The remuneration for any calendar month shall be subject to deduction under the following conditions:
• Unexcused leaves (without prior notice and/or no notice whatsoever).
• Destruction of company property.
• Loss and/or theft of company data, which includes but is not limited to leads, raw data, and information of clients/prospects; and misappropriation of company resources.

Working Hours Policy
Login Time: Employees are required to log in by 11:00 AM, with a grace period of 5 minutes allowed for unavoidable delays.
Late Arrivals: Repeated late logins may be treated as leave or loss of pay as per company policy.
Break Schedule:
• Lunch Break: 1:30 PM – 2:30 PM
• Tea Break: 5:45 PM – 6:00 PM
Logout Time: The official logout time is 8:00 PM. Employees may be required to extend working hours based on business requirements, including meetings, celebrations, or critical work for teams requiring additional presence.

Performance Expectation (Target-Based)
You are required to meet assigned performance targets and carry out your responsibilities diligently. Your performance will be reviewed periodically based on quality of work, productivity, and target achievement. Continuous failure to meet expectations may lead to performance improvement plans or further action as per company policy.
${letterType === "full_time" ? `Failing to meet the minimum monthly targets [${formData.monthlyTargets}] during the probation period.` : ""}

Confidentiality
You are required to maintain strict confidentiality of all company and client information during and after your employment. Your individual remuneration is purely between yourself and the company, and you are expected to preserve it and any changes made to it from time to time as personal and confidential.

Company Property
All company property must be used responsibly and returned in good condition upon separation from the organization.

Termination
The company reserves the right to terminate employment in accordance with company policies and applicable laws. Termination may occur in cases of misconduct, policy violations, or performance-related concerns.

ALL EMPLOYEES MUST READ THIS LETTER, THEN FILL OUT AND RETURN THIS PORTION TO THE HUMAN RESOURCES DEPARTMENT WITHIN ONE WEEK OF JOINING
This is to acknowledge that I have received a copy of this Offer Letter and understand that it contains important information on the Company’s general policies and on my obligations as an intern. I am expected to read, understand, and adhere to Company policies and I am governed by the contents of this letter. I understand that the Company may change, rescind, or add to any policies described herein from time to time, and that the most recent policies shall prevail.

Employee Signature:\t
Employee Name:\t${candidateDisplay}
Date:\t

“ANNEXURE-A”
TERMS OF EMPLOYMENT
1. Employment
Your employment with the Company will commence from the date of joining mentioned in this letter and will be governed by Company policies.
2. Roles & Responsibilities
You are expected to perform your duties diligently, meet assigned targets, and follow instructions from your reporting manager.
3. Working Hours
You are required to adhere to the Company’s working hours and attendance policies as communicated. Given your role, you may need to work beyond standard hours when necessary; the Company will strive to provide advance notice, but this may not always be feasible.
4. Policy Compliance
You are expected to comply with all Company policies, rules, and regulations as updated from time to time.

Effectiveness
Your employment with Accenlearn will be governed by the Company’s policies, as modified from time to time at the Company’s discretion. These Terms of Employment must be read as part of all of the Company’s current policies. This agreement becomes effective on the commencement of your internship. The Company reserves the right to withdraw the offer even after acceptance if it becomes aware of any material information that was concealed or misrepresented by you. You are requested to abide by the guidelines and regulations of the office and to maintain the code of conduct and disciplinary rules, which may be framed or modified from time to time. You will employ yourself efficiently and diligently to the best of your ability, carry out all duties assigned to you, and comply with all lawful directions given by the Management.

Employee Conduct
The success of our organization hinges on how we treat each other. All managers and employees are expected to engage with our clients, vendors, guests, and fellow team members with respect and consideration. Behaviours such as rudeness, gossiping, use of profanity, yelling, or employing vulgar or offensive language, along with suggestive or sarcastic gestures, are unacceptable and may result in disciplinary measures, which could include immediate termination.
To uphold a professional atmosphere, employees are prohibited from engaging in personal relationships with clients or guests if such relationships are deemed by the Company to create conflicts of interest, disrupt the workplace, or contribute to a negative or unprofessional environment. Should the Company find that a relationship poses an actual or potential issue, it reserves the right to take appropriate action, which may include transfers, reassignments, shift changes, or termination.

Reassignment
The Company reserves the right to reassign you at any time to a comparable position for which you are deemed qualified, either within the Company or as a secondment to an affiliated entity. Unless a different agreement is made in writing, any reassignment will be governed by the terms and conditions outlined in this contract and will not be considered a termination of this contract or your employment with the Company.

Termination of Employment
The Company may terminate your employment immediately, with or without notice, under the following circumstances:
• Serious Offences: Embezzlement, intoxication, illegal drug abuse, unauthorized absences that exceed Company leave policies, unauthorized disclosure or misuse of the Company’s confidential information, gross insubordination, or receipt of any improper rebate, kickback, or similar compensation related to any opportunity involving the Company, its affiliates, and their employees, contractors, and clients.
• Misconduct: Willful or intentional misconduct in connection with your duties, or being arrested, charged, or convicted of a criminal offence that the Company believes could affect your ability to perform your responsibilities or damage the Company’s reputation.
• Acts of Moral Turpitude: Crimes characterized by baseness or depravity, such as rape, forgery, theft, solicitation, etc.
• Sexual Harassment: Being found guilty under Company policy and local laws.
• Reputational Threats: Any action likely to harm the Company’s reputation.
• Breach of Contract: Any misconduct or violation of the terms of this contract, including Company policies.
• Loss of Business: Any activity that leads to a loss of business.
• Incompetence: Prolonged failure to perform duties effectively, as assessed by the Company.

Return of Company Property
Employees are required to return all Company property in their possession or control immediately upon termination of employment, regardless of the reason. The Company reserves the right to take necessary actions to protect or recover its property. Arrangements should also be made to settle any outstanding dues with the Company, and final settlement will be processed as per the Company’s settlement policy.

Recreational, Social or Athletic Disclaimer Notice
Your employer and its insurance provider will not be responsible for any compensation or benefits for injuries sustained during your voluntary participation in off-duty recreational, social, or athletic activities that are not related to your work responsibilities.

Code of Ethics Policy
The integrity of the Company is its most valuable asset, closely tied to the behaviour of its employees. All employees are expected to fully commit their efforts and attention to their roles, exercise sound judgment, uphold high ethical standards, and steer clear of situations that could create an actual or potential conflict between their personal interests and those of the Company.
Employees must never leverage their positions within the Company or with its clients or guests for personal gain, to further their own interests, or to seek favours or benefits for themselves or their families. A conflict of interest arises when an employee’s loyalties or actions are divided between the interests of the Company and those of another party, such as a competitor, supplier, client, or guest. Both actual conflicts and the appearance of conflicts should be avoided.
If you are uncertain whether a particular transaction, activity, or relationship might constitute a conflict of interest, please consult Human Resources or a Company officer for guidance. These guidelines are not exhaustive but highlight some common conflicts of interest that employees should avoid, including:
• Working for a competitor, supplier, or client.
• Engaging in self-employment that competes with the Company.
• Using proprietary or confidential Company information for personal benefit or to the detriment of the Company.
• Holding a direct or indirect financial interest in, or having a relationship with, a competitor, client, or supplier.
• Utilizing Company assets or the time of colleagues for personal purposes.
• Committing the Company to provide financial or other support to any external activity or organization.
• Developing a personal relationship with a subordinate employee that may affect impartial judgment in decisions impacting the Company or its employees.
Failure to comply with these guidelines, including not disclosing any potential conflicts or seeking exceptions, may result in disciplinary action, up to and including termination of employment. All employees are encouraged to identify any business transactions or dealings that could represent a potential conflict of interest as outlined in this policy.

Non-Disclosure
During your employment with the Company, you may gain access to certain “Confidential Information.” This term refers to all proprietary information and data belonging to the Company, regardless of form, including but not limited to: source code, graphical assets, databases, technical documentation, company internet accounts, processes, business and product plans, leads and client data, software documents and programs, and intellectual property assets such as patents, copyrights, trade secrets, and any commercially sensitive proprietary information.
By accepting this offer, you agree to the following obligations:
• You will maintain the confidentiality of all Confidential Information at all times.
• You will use Confidential Information solely for the purpose of fulfilling authorized tasks or engagements.
• You will not disclose Confidential Information to any third party without prior written consent from the Company, except where disclosure is mandated by law or a competent authority.
• You will ensure that your subordinates comply with these confidentiality obligations.
• You will promptly return all Confidential Information, in both physical and electronic forms, along with any copies or extracts, upon the Company’s request and at the conclusion of your employment.
• You will permanently delete and destroy any copies of Confidential Information in your possession, access, or control upon the termination of your employment, in accordance with the Company’s instructions.
• You acknowledge that any breach of these obligations may result in liability for damages to the Company, and that the Company reserves the right to pursue all available legal remedies, including injunctive relief.

Non-Compete Agreement
The Employee agrees that for a period of six (6) months following the termination or expiration of this agreement (the “Non-Compete Period”), they will not, either directly or indirectly, engage in any employment or activity with any company, association, firm, or individual within India (or as otherwise specified by the Company) that is the same as or similar to the business activities conducted by the Company, or that competes, or is likely to compete, with the Company’s business.
The Employee acknowledges that these non-compete obligations are reasonable and necessary to protect the integrity of the Company’s Confidential Information, as well as to safeguard the goodwill and other legitimate business interests of the Company, its affiliates, and its clients and customers.

Non-Solicitation Agreement
During the term of this agreement and for a period of six (6) months following its termination or expiration, you agree not to:
• Induce or attempt to induce any employee of Accenlearn to terminate their relationship with the Company.
• Interfere in any manner with the relationship between Accenlearn and any of its employees.
• Hire, directly or indirectly, any individual who was employed by Accenlearn at any time during the term of this agreement, whether directly or through another entity.
• Disclose to any person, firm, or corporation the names or addresses of any customers or clients of the Company, or any other related information.
• Solicit, attempt to solicit, or take away any customer of the Company with whom you became acquainted during your employment, as a direct or indirect result of your relationship with the Company.

Intellectual Property
All work products created during your employment shall be considered “works made for hire” under applicable copyright laws. To the extent that any work product does not qualify as a work made for hire, you hereby irrevocably assign all worldwide rights, title, and interest in such work product, including but not limited to patents, copyrights, trade secrets, trademarks, design rights, contracts, and licensing rights, to the Company and its affiliates. You retain no rights to utilize the work product and agree not to challenge the Company’s or its affiliates’ ownership of the work product. You also waive all moral rights associated with the work product and any results or proceeds derived therefrom, even after the termination of your employment. If you possess any rights to the work product that cannot be assigned to the Company or its affiliates, you unconditionally and irrevocably waive the enforcement of such rights and any claims against the Company, its affiliates, or their employees, contractors, or clients concerning such rights. Furthermore, you grant the Company and its affiliates an exclusive, irrevocable, perpetual, worldwide, sublicensable, fully paid-up, and royalty-free license to use such work product. Upon termination or expiration of your employment, you will return to the Company all work products, including any parts or copies thereof created up to the date of termination.
You agree to execute any documents and take any necessary actions, without further consideration, as reasonably requested by the Company, its affiliates, clients, and contractors to fulfil the objectives outlined in this section. This includes waiving any rights, including authors’ moral rights under Section 57 of the Copyright Act, 1957. If the Company is unable, after making reasonable efforts, to obtain your signature on any document necessary to establish the title of the Company and its affiliates, you hereby irrevocably appoint the Company and its duly authorized officers and agents as your attorneys-in-fact, authorized to execute, file, and verify such documents and perform any other lawful acts with the same legal force and effect as if executed by you.
You further agree not to violate or attempt to violate the intellectual property rights, interests, or titles of any third party. Your obligations under this section shall remain in effect and survive any termination or expiration of your employment or these Terms of Employment. The Company shall be entitled to seek immediate injunctive relief or similar remedies in the event of a potential or actual breach of this section by you.

“We sincerely hope you have a rewarding learning experience with us and that you grow in your role.”

Kindly confirm your acceptance by signing below.
Employee Signature:	
Date:	
HR Signature:	
Date:	`;

    navigator.clipboard.writeText(fullText);
    toast.success("Offer Letter text copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[70px] lg:pl-[265px] font-sans pb-16">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Title Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={14} /> HR Management Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                Send Offer Letter
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Customize, generate, and email official Accenlearn offer letters (Internship & Full Time) with full template fidelity.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  activeTab === "form"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText size={15} /> Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  activeTab === "preview"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Eye size={15} /> Document Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  activeTab === "history"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <History size={15} /> Sent History
              </button>
            </div>
          </div>

          {/* Letter Type Switcher */}
          {activeTab !== "history" && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                Select Offer Letter Type
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Intern Option */}
                <div
                  onClick={() => handleTypeChange("intern")}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-start gap-4 ${
                    letterType === "intern"
                      ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-black ${
                      letterType === "intern"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Layers size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-800">
                        Internship Offer Letter
                      </h3>
                      {letterType === "intern" && (
                        <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Template: <span className="font-semibold text-slate-700">Accenlearn_Offer_Letter_Intern.docx</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] font-bold text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        ₹12,500/mo + ₹10,000 Inc.
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        4 Months Intern
                      </span>
                    </div>
                  </div>
                </div>

                {/* Full Time Option */}
                <div
                  onClick={() => handleTypeChange("full_time")}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-start gap-4 ${
                    letterType === "full_time"
                      ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-black ${
                      letterType === "full_time"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Briefcase size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-800">
                        Full Time Offer Letter
                      </h3>
                      {letterType === "full_time" && (
                        <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Template: <span className="font-semibold text-slate-700">Accenlearn_Offer_Letter_Full_Time.docx</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] font-bold text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        ₹15,000/mo + ₹10,000 Inc.
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        Permanent / Probation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TAB 1: FORM EDITOR */}
        {activeTab === "form" && (
          <form onSubmit={handleSendEmail} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Input Form (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Card 1: Candidate Information */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider mb-4">
                    <User size={18} /> Candidate Information
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Candidate Full Name <span className="text-rose-500">*</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Template: [Candidate Name]
                        </span>
                      </label>
                      <input
                        type="text"
                        name="candidateName"
                        value={formData.candidateName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Candidate Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                        <input
                          type="email"
                          name="candidateEmail"
                          value={formData.candidateEmail}
                          onChange={handleChange}
                          placeholder="rahul.sharma@example.com"
                          required
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Candidate Phone Number
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-3 text-slate-400" />
                        <input
                          type="text"
                          name="candidatePhone"
                          value={formData.candidatePhone}
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Employment Dates & Department */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider mb-4">
                    <Calendar size={18} /> Schedule & Placement
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Offer Date <span className="text-rose-500">*</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Template: [DD- MMM- 2026]
                        </span>
                      </label>
                      <input
                        type="date"
                        name="offerDateInput"
                        value={formData.offerDateInput}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                      <div className="text-[11px] text-slate-400 mt-1">
                        Formatted: <span className="font-bold text-slate-600">{offerDateFormatted}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Date of Joining <span className="text-rose-500">*</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Template: [DD- MMM- 2026]
                        </span>
                      </label>
                      <input
                        type="date"
                        name="joiningDateInput"
                        value={formData.joiningDateInput}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                      <div className="text-[11px] text-slate-400 mt-1">
                        Formatted: <span className="font-bold text-slate-600">{joiningDateFormatted}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Department
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Template: [Inside Sales]
                        </span>
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Inside Sales"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Designation / Role
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder={letterType === "full_time" ? "Business Development Associate" : "Business Development Intern"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Work Location
                      </label>
                      <input
                        type="text"
                        name="workLocation"
                        value={formData.workLocation}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 3: Compensation & Specific Terms */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider mb-4">
                    <DollarSign size={18} /> Remuneration & Performance Terms
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Fixed Compensation / Month (INR)
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Template: {letterType === "full_time" ? "[15,000]" : "[12,500]"}
                        </span>
                      </label>
                      <input
                        type="text"
                        name="fixedCompensation"
                        value={formData.fixedCompensation}
                        onChange={handleChange}
                        placeholder={letterType === "full_time" ? "15,000" : "12,500"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Performance Incentive (INR)
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Template: [10,000]
                        </span>
                      </label>
                      <input
                        type="text"
                        name="incentive"
                        value={formData.incentive}
                        onChange={handleChange}
                        placeholder="10,000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                    </div>

                    {letterType === "full_time" ? (
                      <>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                            Probation Monthly Targets
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              Template: [target to be confirmed by management]
                            </span>
                          </label>
                          <input
                            type="text"
                            name="monthlyTargets"
                            value={formData.monthlyTargets}
                            onChange={handleChange}
                            placeholder="target to be confirmed by management"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                          />
                          <p className="text-[11px] text-slate-400 mt-1">
                            Appears in: "Failing to meet the minimum monthly targets [target to be confirmed by management] during the probation period."
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                            Probation Period
                          </label>
                          <input
                            type="text"
                            name="probationPeriod"
                            value={formData.probationPeriod}
                            onChange={handleChange}
                            placeholder="six (6) months"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                            Internship Duration
                          </label>
                          <input
                            type="text"
                            name="internshipDuration"
                            value={formData.internshipDuration}
                            onChange={handleChange}
                            placeholder="four (4) months"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                            On Job Training (OJT) Days
                          </label>
                          <input
                            type="text"
                            name="ojtDays"
                            value={formData.ojtDays}
                            onChange={handleChange}
                            placeholder="10 working days"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Card 4: Email Dispatch Options */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider mb-4">
                    <Mail size={18} /> Email Delivery Options
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        CC Email Address
                      </label>
                      <input
                        type="email"
                        name="ccEmail"
                        value={formData.ccEmail}
                        onChange={handleChange}
                        placeholder="aravind@accenlearn.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Sender Identity
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`Accenlearn HR Team (${hrName})`}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        Special Instructions / Note to Candidate (Optional)
                      </label>
                      <textarea
                        rows={2}
                        name="customNotes"
                        value={formData.customNotes}
                        onChange={handleChange}
                        placeholder="e.g. Please bring original ID proofs and educational certificates on Day 1."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions & Quick Summary */}
              <div className="space-y-6">
                {/* Summary Box */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-[90px]">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileCheck size={18} className="text-indigo-600" /> Summary & Actions
                  </h3>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3 mb-6">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Type:</span>
                      <span className="font-bold text-slate-800 capitalize">
                        {letterType === "full_time" ? "Full Time" : "Internship"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Candidate:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[150px]">
                        {formData.candidateName || "Not provided"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Role:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[150px]">
                        {formData.designation}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Joining:</span>
                      <span className="font-bold text-indigo-600">
                        {joiningDateFormatted}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200">
                      <span className="text-slate-500 font-medium">Compensation:</span>
                      <span className="font-black text-slate-800">
                        ₹{formData.fixedCompensation}/mo + ₹{formData.incentive}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Primary Button: Send Email */}
                    <button
                      type="submit"
                      disabled={loadingSend}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loadingSend ? (
                        <>
                          <RefreshCw size={18} className="animate-spin" />
                          Sending Email...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Offer Letter via Email
                        </>
                      )}
                    </button>

                    {/* Secondary Button: Download DOCX */}
                    <button
                      type="button"
                      onClick={handleDownloadDocx}
                      disabled={loadingDocx}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {loadingDocx ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          Generating Word (.docx)...
                        </>
                      ) : (
                        <>
                          <Download size={16} className="text-indigo-600" />
                          Download Word (.docx)
                        </>
                      )}
                    </button>

                    {/* Preview Switch Button */}
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <Eye size={14} /> Preview Full Document
                    </button>
                  </div>

                  <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-[11px] text-amber-800 flex items-start gap-2">
                    <Info size={16} className="flex-shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      Generated documents are created directly from the authentic Accenlearn templates with all highlighted areas replaced and yellow markers removed.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: LIVE DOCUMENT PREVIEW */}
        {activeTab === "preview" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto">
            {/* Preview Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  {letterType === "full_time" ? "Full Time" : "Internship"} Offer Letter Document Preview
                </span>
                <h2 className="text-xl font-black text-slate-800 mt-1">
                  Accenlearn Solutions
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Copy size={14} /> Copy Full Text
                </button>
                <button
                  type="button"
                  onClick={handleDownloadDocx}
                  className="px-3.5 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-black hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                >
                  <Download size={14} /> Download DOCX
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("form")}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
                >
                  Back to Editor
                </button>
              </div>
            </div>

            {/* Sub-tabs for Section Navigation */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => setPreviewSection("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  previewSection === "all"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Entire Document (Letter + Annexure-A)
              </button>
              <button
                type="button"
                onClick={() => setPreviewSection("letter")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  previewSection === "letter"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Part 1: Main Offer Letter
              </button>
              <button
                type="button"
                onClick={() => setPreviewSection("annexure")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  previewSection === "annexure"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Part 2: Annexure-A (Terms)
              </button>
            </div>

            {/* Document Container */}
            <div className="bg-slate-50 border border-slate-300 rounded-2xl p-8 sm:p-14 font-serif text-slate-800 leading-relaxed text-sm shadow-inner space-y-8">
              
              {/* ── PART 1: MAIN OFFER LETTER ── */}
              {(previewSection === "all" || previewSection === "letter") && (
                <div className="space-y-6">
                  {/* Title */}
                  <div className="text-center font-bold text-xl tracking-wider text-slate-900 border-b border-slate-300 pb-4">
                    OFFER LETTER
                  </div>

                  {/* Salutation & Date */}
                  <div className="flex justify-between items-center font-bold text-sm">
                    <div>
                      Dear <span className="text-indigo-900 font-black bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{candidateDisplay}</span>
                    </div>
                    <div>
                      Date: <span className="text-indigo-900 font-black bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{offerDateFormatted}</span>
                    </div>
                  </div>

                  <p className="text-xs italic text-slate-600">
                    Kindly go through the below details and let us know if you have any queries and/or acknowledge your agreement to the same.
                  </p>

                  {/* Employment Details */}
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 mb-2 font-sans uppercase tracking-wider text-indigo-900">
                      Employment Details
                    </h3>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 text-xs font-sans shadow-sm">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-bold text-slate-500">Designation:</span>
                        <span className="font-black text-slate-900">{formData.designation}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-bold text-slate-500">Date of Joining:</span>
                        <span className="font-black text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{joiningDateFormatted}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-bold text-slate-500">Type of Employment:</span>
                        <span className="font-black text-slate-900">{letterType === "full_time" ? "Full Time" : "Internship"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="font-bold text-slate-500">Department:</span>
                        <span className="font-black text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{formData.department}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-bold text-slate-500">Work Location:</span>
                        <span className="font-medium text-slate-800 text-right max-w-md">{formData.workLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Engagement */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Engagement
                    </h4>
                    <p className="text-xs">
                      You are {letterType === "full_time" ? "employed" : "engaged"} by the Company in the role of <strong>{formData.designation}</strong> in the <span className="bg-indigo-50 font-bold px-1.5 py-0.5 rounded border border-indigo-100 text-indigo-900">{formData.department}</span> department with Accenlearn at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041.
                    </p>
                  </div>

                  {/* Period of Service */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Period of Service
                    </h4>
                    <p className="text-xs">
                      {letterType === "full_time"
                        ? `You shall be on a probationary period of ${formData.probationPeriod} from the date of your joining, which includes the job training period. The Company may, at its discretion, consider you for further opportunities based on your performance.`
                        : `The internship is for a period of ${formData.internshipDuration} from the date of joining, inclusive of the job training period. The Company may, at its discretion, consider you for further opportunities based on your performance.`}
                    </p>
                  </div>

                  {/* On Job Training Period (OJT) */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      On Job Training Period (OJT)
                    </h4>
                    <p className="text-xs">
                      Please be advised that the training period will be of <strong>{formData.ojtDays}</strong>, which will be <strong>UNPAID</strong>. In the event of taking any leave during the On Job Training (OJT) period, it will be necessary to recommence the training from the initial day upon return. This policy ensures the comprehensive acquisition of the skills and knowledge essential for optimal performance in the designated role.
                    </p>
                  </div>

                  {/* Remuneration */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Remuneration
                    </h4>
                    <p className="text-xs">
                      After {formData.ojtDays} of OJT, you will be offered a total compensation of <strong>INR <span className="bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 text-indigo-900 font-black">{formData.fixedCompensation}</span> per month + INR <span className="bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 text-indigo-900 font-black">{formData.incentive}</span></strong> {letterType === "full_time" ? "performance-based incentive" : "based on performance incentive"}. All benefits and allowances will be governed as per company policy.
                    </p>
                    <p className="text-xs font-bold text-slate-700 mt-2">
                      Note: {letterType === "full_time" ? "6-Month Probation period." : "4-Month Intern period."}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      For detailed terms of the contract, kindly refer to the Terms of Employment (Annexure-A) for your review and acceptance. If you choose to accept this offer of employment, please revert to our mail confirming your acceptance and also submit the hard copy to the HR Department.
                    </p>
                  </div>

                  {/* Deductions */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Deductions
                    </h4>
                    <p className="text-xs">
                      The remuneration for any calendar month shall be subject to deduction under the following conditions:
                    </p>
                    <ul className="list-disc pl-5 text-xs space-y-1 mt-1 text-slate-700">
                      <li>Unexcused leaves (without prior notice and/or no notice whatsoever).</li>
                      <li>Destruction of company property.</li>
                      <li>Loss and/or theft of company data, which includes but is not limited to leads, raw data, and information of clients/prospects; and misappropriation of company resources.</li>
                    </ul>
                  </div>

                  {/* Working Hours Policy */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Working Hours Policy
                    </h4>
                    <p className="text-xs"><strong>Login Time:</strong> Employees are required to log in by 11:00 AM, with a grace period of 5 minutes allowed for unavoidable delays.</p>
                    <p className="text-xs mt-1"><strong>Late Arrivals:</strong> Repeated late logins may be treated as leave or loss of pay as per company policy.</p>
                    <div className="text-xs mt-1">
                      <strong>Break Schedule:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>Lunch Break: 1:30 PM – 2:30 PM</li>
                        <li>Tea Break: 5:45 PM – 6:00 PM</li>
                      </ul>
                    </div>
                    <p className="text-xs mt-1"><strong>Logout Time:</strong> The official logout time is 8:00 PM. Employees may be required to extend working hours based on business requirements, including meetings, celebrations, or critical work for teams requiring additional presence.</p>
                  </div>

                  {/* Performance Expectation */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Performance Expectation (Target-Based)
                    </h4>
                    <p className="text-xs">
                      You are required to meet assigned performance targets and carry out your responsibilities diligently. Your performance will be reviewed periodically based on quality of work, productivity, and target achievement. Continuous failure to meet expectations may lead to performance improvement plans or further action as per company policy.
                    </p>
                    {letterType === "full_time" && (
                      <p className="text-xs mt-1">
                        Failing to meet the minimum monthly targets <span className="bg-amber-50 font-bold px-1.5 py-0.5 rounded border border-amber-200 text-amber-900">[{formData.monthlyTargets}]</span> during the probation period.
                      </p>
                    )}
                  </div>

                  {/* Confidentiality */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Confidentiality
                    </h4>
                    <p className="text-xs">
                      You are required to maintain strict confidentiality of all company and client information during and after your employment. Your individual remuneration is purely between yourself and the company, and you are expected to preserve it and any changes made to it from time to time as personal and confidential.
                    </p>
                  </div>

                  {/* Company Property */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Company Property
                    </h4>
                    <p className="text-xs">
                      All company property must be used responsibly and returned in good condition upon separation from the organization.
                    </p>
                  </div>

                  {/* Termination */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans uppercase tracking-wider text-indigo-900">
                      Termination
                    </h4>
                    <p className="text-xs">
                      The company reserves the right to terminate employment in accordance with company policies and applicable laws. Termination may occur in cases of misconduct, policy violations, or performance-related concerns.
                    </p>
                  </div>

                  {/* Acknowledgment block */}
                  <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm space-y-4">
                    <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                      ALL EMPLOYEES MUST READ THIS LETTER, THEN FILL OUT AND RETURN THIS PORTION TO THE HUMAN RESOURCES DEPARTMENT WITHIN ONE WEEK OF JOINING
                    </div>
                    <p className="text-xs text-slate-600">
                      This is to acknowledge that I have received a copy of this Offer Letter and understand that it contains important information on the Company’s general policies and on my obligations as an intern. I am expected to read, understand, and adhere to Company policies and I am governed by the contents of this letter. I understand that the Company may change, rescind, or add to any policies described herein from time to time, and that the most recent policies shall prevail.
                    </p>
                    <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                      <div>
                        <strong>Employee Signature:</strong>
                        <div className="border-b border-slate-400 mt-4 pb-1"></div>
                      </div>
                      <div>
                        <strong>Employee Name:</strong>
                        <div className="border-b border-slate-400 mt-4 pb-1 font-bold text-indigo-900">
                          {candidateDisplay}
                        </div>
                      </div>
                      <div>
                        <strong>Date:</strong>
                        <div className="border-b border-slate-400 mt-4 pb-1 font-bold text-slate-700">
                          {offerDateFormatted}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PART 2: ANNEXURE-A (TERMS OF EMPLOYMENT) ── */}
              {(previewSection === "all" || previewSection === "annexure") && (
                <div className="pt-8 border-t-2 border-slate-300 space-y-6">
                  <div className="text-center font-bold text-xl tracking-wider text-slate-900 border-b border-slate-300 pb-3">
                    “ANNEXURE-A”<br/>
                    <span className="text-base text-slate-700">TERMS OF EMPLOYMENT</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">1. Employment</h4>
                    <p className="text-xs">Your employment with the Company will commence from the date of joining mentioned in this letter and will be governed by Company policies.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">2. Roles & Responsibilities</h4>
                    <p className="text-xs">You are expected to perform your duties diligently, meet assigned targets, and follow instructions from your reporting manager.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">3. Working Hours</h4>
                    <p className="text-xs">You are required to adhere to the Company’s working hours and attendance policies as communicated. Given your role, you may need to work beyond standard hours when necessary; the Company will strive to provide advance notice, but this may not always be feasible.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">4. Policy Compliance</h4>
                    <p className="text-xs">You are expected to comply with all Company policies, rules, and regulations as updated from time to time.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Effectiveness</h4>
                    <p className="text-xs">Your employment with Accenlearn will be governed by the Company’s policies, as modified from time to time at the Company’s discretion. These Terms of Employment must be read as part of all of the Company’s current policies. This agreement becomes effective on the commencement of your internship. The Company reserves the right to withdraw the offer even after acceptance if it becomes aware of any material information that was concealed or misrepresented by you. You are requested to abide by the guidelines and regulations of the office and to maintain the code of conduct and disciplinary rules, which may be framed or modified from time to time. You will employ yourself efficiently and diligently to the best of your ability, carry out all duties assigned to you, and comply with all lawful directions given by the Management.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Employee Conduct</h4>
                    <p className="text-xs">The success of our organization hinges on how we treat each other. All managers and employees are expected to engage with our clients, vendors, guests, and fellow team members with respect and consideration. Behaviours such as rudeness, gossiping, use of profanity, yelling, or employing vulgar or offensive language, along with suggestive or sarcastic gestures, are unacceptable and may result in disciplinary measures, which could include immediate termination.</p>
                    <p className="text-xs mt-2">To uphold a professional atmosphere, employees are prohibited from engaging in personal relationships with clients or guests if such relationships are deemed by the Company to create conflicts of interest, disrupt the workplace, or contribute to a negative or unprofessional environment. Should the Company find that a relationship poses an actual or potential issue, it reserves the right to take appropriate action, which may include transfers, reassignments, shift changes, or termination.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Reassignment</h4>
                    <p className="text-xs">The Company reserves the right to reassign you at any time to a comparable position for which you are deemed qualified, either within the Company or as a secondment to an affiliated entity. Unless a different agreement is made in writing, any reassignment will be governed by the terms and conditions outlined in this contract and will not be considered a termination of this contract or your employment with the Company.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Termination of Employment</h4>
                    <p className="text-xs">The Company may terminate your employment immediately, with or without notice, under the following circumstances:</p>
                    <ul className="list-disc pl-5 text-xs space-y-1 mt-1 text-slate-700">
                      <li><strong>Serious Offences:</strong> Embezzlement, intoxication, illegal drug abuse, unauthorized absences that exceed Company leave policies, unauthorized disclosure or misuse of the Company’s confidential information, gross insubordination, or receipt of any improper rebate, kickback, or similar compensation related to any opportunity involving the Company, its affiliates, and their employees, contractors, and clients.</li>
                      <li><strong>Misconduct:</strong> Willful or intentional misconduct in connection with your duties, or being arrested, charged, or convicted of a criminal offence that the Company believes could affect your ability to perform your responsibilities or damage the Company’s reputation.</li>
                      <li><strong>Acts of Moral Turpitude:</strong> Crimes characterized by baseness or depravity, such as rape, forgery, theft, solicitation, etc.</li>
                      <li><strong>Sexual Harassment:</strong> Being found guilty under Company policy and local laws.</li>
                      <li><strong>Reputational Threats:</strong> Any action likely to harm the Company’s reputation.</li>
                      <li><strong>Breach of Contract:</strong> Any misconduct or violation of the terms of this contract, including Company policies.</li>
                      <li><strong>Loss of Business:</strong> Any activity that leads to a loss of business.</li>
                      <li><strong>Incompetence:</strong> Prolonged failure to perform duties effectively, as assessed by the Company.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Return of Company Property</h4>
                    <p className="text-xs">Employees are required to return all Company property in their possession or control immediately upon termination of employment, regardless of the reason. The Company reserves the right to take necessary actions to protect or recover its property. Arrangements should also be made to settle any outstanding dues with the Company, and final settlement will be processed as per the Company’s settlement policy.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Recreational, Social or Athletic Disclaimer Notice</h4>
                    <p className="text-xs">Your employer and its insurance provider will not be responsible for any compensation or benefits for injuries sustained during your voluntary participation in off-duty recreational, social, or athletic activities that are not related to your work responsibilities.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Code of Ethics Policy</h4>
                    <p className="text-xs">The integrity of the Company is its most valuable asset, closely tied to the behaviour of its employees. All employees are expected to fully commit their efforts and attention to their roles, exercise sound judgment, uphold high ethical standards, and steer clear of situations that could create an actual or potential conflict between their personal interests and those of the Company.</p>
                    <p className="text-xs mt-2">Employees must never leverage their positions within the Company or with its clients or guests for personal gain, to further their own interests, or to seek favours or benefits for themselves or their families. A conflict of interest arises when an employee’s loyalties or actions are divided between the interests of the Company and those of another party, such as a competitor, supplier, client, or guest. Both actual conflicts and the appearance of conflicts should be avoided.</p>
                    <p className="text-xs mt-2">If you are uncertain whether a particular transaction, activity, or relationship might constitute a conflict of interest, please consult Human Resources or a Company officer for guidance. Common conflicts include: working for a competitor/supplier; engaging in self-employment competing with the Company; using confidential information for personal benefit; holding direct/indirect financial interest in competitors; utilizing Company assets or colleague time for personal purposes; committing Company to external sponsorships without authorization; or developing relationships that compromise impartial judgment.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Non-Disclosure</h4>
                    <p className="text-xs">During your employment with the Company, you may gain access to certain “Confidential Information.” This term refers to all proprietary information and data belonging to the Company, regardless of form, including but not limited to: source code, graphical assets, databases, technical documentation, company internet accounts, processes, business and product plans, leads and client data, software documents and programs, and intellectual property assets such as patents, copyrights, trade secrets, and any commercially sensitive proprietary information.</p>
                    <ul className="list-disc pl-5 text-xs space-y-1 mt-1 text-slate-700">
                      <li>You will maintain the confidentiality of all Confidential Information at all times.</li>
                      <li>You will use Confidential Information solely for the purpose of fulfilling authorized tasks or engagements.</li>
                      <li>You will not disclose Confidential Information to any third party without prior written consent from the Company, except where disclosure is mandated by law or a competent authority.</li>
                      <li>You will ensure that your subordinates comply with these confidentiality obligations.</li>
                      <li>You will promptly return all Confidential Information, in both physical and electronic forms, along with any copies or extracts, upon the Company’s request and at the conclusion of your employment.</li>
                      <li>You will permanently delete and destroy any copies of Confidential Information in your possession, access, or control upon the termination of your employment, in accordance with the Company’s instructions.</li>
                      <li>You acknowledge that any breach of these obligations may result in liability for damages to the Company, and that the Company reserves the right to pursue all available legal remedies, including injunctive relief.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Non-Compete Agreement</h4>
                    <p className="text-xs">The Employee agrees that for a period of six (6) months following the termination or expiration of this agreement (the “Non-Compete Period”), they will not, either directly or indirectly, engage in any employment or activity with any company, association, firm, or individual within India (or as otherwise specified by the Company) that is the same as or similar to the business activities conducted by the Company, or that competes, or is likely to compete, with the Company’s business.</p>
                    <p className="text-xs mt-1">The Employee acknowledges that these non-compete obligations are reasonable and necessary to protect the integrity of the Company’s Confidential Information, as well as to safeguard the goodwill and other legitimate business interests of the Company, its affiliates, and its clients and customers.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Non-Solicitation Agreement</h4>
                    <p className="text-xs">During the term of this agreement and for a period of six (6) months following its termination or expiration, you agree not to: (1) induce or attempt to induce any employee of Accenlearn to terminate their relationship; (2) interfere with employee relationships; (3) hire directly or indirectly former employees; (4) disclose customer/client information; or (5) solicit or take away any customer of the Company.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1 font-sans">Intellectual Property</h4>
                    <p className="text-xs">All work products created during your employment shall be considered “works made for hire” under applicable copyright laws. To the extent that any work product does not qualify as a work made for hire, you hereby irrevocably assign all worldwide rights, title, and interest in such work product to the Company. You retain no rights to utilize the work product and agree not to challenge ownership.</p>
                  </div>

                  <div className="text-center italic font-bold text-xs py-3 border-y border-slate-300 text-slate-900">
                    “We sincerely hope you have a rewarding learning experience with us and that you grow in your role.”
                  </div>

                  <div className="pt-4 text-xs font-sans">
                    <p className="font-bold mb-4">Kindly confirm your acceptance by signing below.</p>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                      <div className="space-y-4">
                        <div className="border-b border-slate-400 pb-1">
                          <strong>Employee Signature:</strong>
                        </div>
                        <div className="border-b border-slate-400 pb-1">
                          <strong>Date:</strong> {offerDateFormatted}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="border-b border-slate-400 pb-1">
                          <strong>HR Signature:</strong>
                        </div>
                        <div className="border-b border-slate-400 pb-1">
                          <strong>Date:</strong> {offerDateFormatted}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SENT HISTORY */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-black text-slate-800">
                  Sent Offer Letters Log
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track and manage all offer letters dispatched to candidates through this portal.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search candidate, role, email..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs w-64 focus:border-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={fetchHistory}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                  title="Refresh history"
                >
                  <RefreshCw size={16} className={loadingHistory ? "animate-spin" : ""} />
                </button>
              </div>
            </div>

            {loadingHistory ? (
              <div className="text-center py-16 text-slate-400">
                <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-indigo-600" />
                <span className="text-xs font-bold">Loading records...</span>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <FileText size={36} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-bold text-slate-600">No offer letters dispatched yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Once you send an offer letter, its details and downloads will appear here.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("form")}
                  className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 transition-colors"
                >
                  Create Offer Letter
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-black tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Role & Dept</th>
                      <th className="py-3 px-4">Joining Date</th>
                      <th className="py-3 px-4">Compensation</th>
                      <th className="py-3 px-4">Dispatched At</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredHistory.map((item) => (
                      <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-black text-slate-800">{item.candidateName}</div>
                          <div className="text-[11px] text-slate-400">{item.candidateEmail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              item.letterType === "full_time"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-indigo-100 text-indigo-800"
                            }`}
                          >
                            {item.letterType === "full_time" ? "Full Time" : "Internship"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-700">{item.designation}</div>
                          <div className="text-[11px] text-slate-400">{item.department}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-700">
                          {item.dateOfJoining}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-700">
                          ₹{item.fixedCompensation} + ₹{item.incentive}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                          <div className="text-[10px] text-slate-400">by {item.sentBy || "HR"}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                            <CheckCircle2 size={13} /> {item.status || "Sent"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleDownloadHistoryItem(item._id, item.candidateName, "docx")}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Download Word (.docx)"
                          >
                            <Download size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteHistoryItem(item._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HRSendOfferLetter;
