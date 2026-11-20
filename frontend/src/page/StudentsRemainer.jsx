import React, { useState, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Upload,
  Calendar,
  Clock,
  Link as LinkIcon,
  Briefcase,
  Send,
  Trash2,
  Plus,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  UserCheck,
  RefreshCw,
  Eye,
  Edit3,
  Search,
  Sparkles,
  ClipboardPaste,
  ShieldCheck,
} from "lucide-react";
import API from "../API";

// Calculate tomorrow's date string (YYYY-MM-DD)
const getTomorrowDateStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const PREDEFINED_TEMPLATES = {
  interview_tomorrow: {
    id: "interview_tomorrow",
    name: "Interview Scheduled Tomorrow (Pre-defined)",
    subject: "HR Accenlearn - Interview Scheduled",
    text: `Dear {name},

We are pleased to inform you that your interview with HR Accenlearn has been scheduled for tomorrow.

Please find the interview schedule below:
📅 Date: {date}
⏰ Time: {time}
💼 Position: {role}
🔗 Meeting Link / Location: {link}

Please ensure that you join the meeting at least 5 minutes prior to the scheduled time, in a quiet environment with a working camera, microphone, and stable internet connection.

If you have any questions or need to reschedule, please reply directly to this email.

Wishing you the very best of luck!`,
  },
  urgent_reminder: {
    id: "urgent_reminder",
    name: "Urgent Interview Reminder",
    subject: "HR Accenlearn - Urgent: Interview Scheduled",
    text: `Dear {name},

This is an urgent reminder regarding your upcoming interview with the HR Team at Accenlearn.

📅 Date: {date}
⏰ Time: {time}
💼 Position: {role}
🔗 Meeting Link: {link}

Please confirm your attendance by replying to this email. Ensure you have your updated resume and portfolio ready.

We look forward to meeting with you!`,
  },
  custom: {
    id: "custom",
    name: "Custom (Paste your own message)",
    subject: "HR Accenlearn - Interview Scheduled",
    text: `Dear {name},

You have an interview scheduled for tomorrow ({date}) at {time} with HR Accenlearn.

Role: {role}
Meeting Link: {link}

Please join on time. If you have any queries, reply to this email.

Best regards,
HR Accenlearn`,
  },
};

export default function StudentsRemainer() {
  // Config state
  const [subject, setSubject] = useState("HR Accenlearn - Interview Scheduled");
  const [selectedTemplateKey, setSelectedTemplateKey] = useState("interview_tomorrow");
  const [messageContent, setMessageContent] = useState(PREDEFINED_TEMPLATES.interview_tomorrow.text);

  // Defaults for candidates when not specified in Excel/CSV
  const [defaultDate, setDefaultDate] = useState(getTomorrowDateStr());
  const [defaultTime, setDefaultTime] = useState("11:00 AM");
  const [defaultLink, setDefaultLink] = useState("https://meet.google.com/new");
  const [defaultRole, setDefaultRole] = useState("Candidate / Intern");

  // Candidates list
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal / Manual input states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [pasteText, setPasteText] = useState("");

  // Sending state
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [testEmail, setTestEmail] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [activeTab, setActiveTab] = useState("candidates"); // 'candidates' or 'preview'

  // Handle template selection
  const handleTemplateChange = (key) => {
    setSelectedTemplateKey(key);
    if (PREDEFINED_TEMPLATES[key]) {
      setMessageContent(PREDEFINED_TEMPLATES[key].text);
      if (PREDEFINED_TEMPLATES[key].subject) {
        setSubject(PREDEFINED_TEMPLATES[key].subject);
      }
    }
  };

  // Parse Excel or CSV
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

        if (!rows || rows.length === 0) {
          toast.error("The uploaded file is empty");
          return;
        }

        // Map columns intelligently
        const parsed = [];
        rows.forEach((row, idx) => {
          // Normalize row keys to lowercase
          const keys = Object.keys(row);
          const getVal = (possibleKeys) => {
            for (const k of keys) {
              const cleanK = k.trim().toLowerCase().replace(/[\s_-]+/g, "");
              for (const pk of possibleKeys) {
                if (cleanK === pk) return String(row[k]).trim();
              }
            }
            return "";
          };

          const name =
            getVal(["name", "candidatename", "fullname", "studentname", "student", "applicant", "leadname"]) ||
            `Candidate ${idx + 1}`;
          const email = getVal(["email", "emailid", "mail", "emailaddress", "e-mail"]);
          const date = getVal(["date", "interviewdate", "day", "scheduledate"]);
          const time = getVal(["time", "interviewtime", "slot", "timeslot"]);
          const link = getVal(["link", "meetinglink", "meetlink", "url", "venue"]);
          const role = getVal(["role", "position", "jobrole", "designation", "domain"]);

          if (email && email.includes("@")) {
            parsed.push({
              id: `${Date.now()}-${idx}-${Math.random()}`,
              name,
              email,
              date: date || "",
              time: time || "",
              link: link || "",
              role: role || "",
              status: "ready", // ready, sending, sent, failed
              error: null,
            });
          }
        });

        if (parsed.length === 0) {
          toast.error("Could not find valid candidate emails. Please check column headers ('Name', 'Email').");
          return;
        }

        setCandidates((prev) => [...prev, ...parsed]);
        toast.success(`Successfully loaded ${parsed.length} candidates from ${file.name}!`);
      } catch (err) {
        console.error("Excel parse error:", err);
        toast.error("Failed to parse file: " + err.message);
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = "";
  };

  // Download Sample Template
  const downloadSampleTemplate = () => {
    const sampleData = [
      {
        "Candidate Name": "John Doe",
        "Email": "john.doe@example.com",
      },
      {
        "Candidate Name": "Priya Sharma",
        "Email": "priya.sharma@example.com",
      },
      {
        "Candidate Name": "Rahul Verma",
        "Email": "rahul.verma@example.com",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Interview_Candidates");
    XLSX.writeFile(wb, "accenlearn_interview_candidates_sample.xlsx");
    toast.success("Sample template downloaded (Candidate Name & Email)!");
  };

  // Add candidate manually
  const handleAddManual = (e) => {
    e.preventDefault();
    if (!manualEmail || !manualEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setCandidates((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        name: manualName.trim() || "Candidate",
        email: manualEmail.trim(),
        status: "ready",
        error: null,
      },
    ]);

    setManualName("");
    setManualEmail("");
    setShowAddModal(false);
    toast.success("Candidate added successfully!");
  };

  // Bulk paste candidate text (unified: extracts Name and Email; Date & Time are unified from settings)
  const handleBulkPaste = () => {
    if (!pasteText.trim()) return;

    const lines = pasteText.split(/\r?\n/);
    const added = [];

    lines.forEach((line, idx) => {
      const cleanLine = line.trim();
      if (!cleanLine) return;

      // Extract email using regex
      const emailMatch = cleanLine.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        const email = emailMatch[0].trim();
        // The candidate name is whatever text comes before the email
        let name = cleanLine.split(email)[0].replace(/[,\t;:-]+$/, "").trim();
        if (!name) {
          // If email was first, check text after it
          const after = cleanLine.split(email)[1] || "";
          name = after.replace(/^[,\t;:-]+/, "").split(/[,\t]+/)[0]?.trim() || "Candidate";
        }
        name = name.replace(/^[,\t;:-]+|[,\t;:-]+$/g, "").trim();

        added.push({
          id: `${Date.now()}-${idx}-${Math.random()}`,
          name: name || "Candidate",
          email: email,
          status: "ready",
          error: null,
        });
      }
    });

    if (added.length === 0) {
      toast.error("Could not find valid emails in pasted text. Expected format: Name, email@domain.com");
      return;
    }

    setCandidates((prev) => [...prev, ...added]);
    setPasteText("");
    setShowPasteModal(false);
    toast.success(`Added ${added.length} candidates from pasted list!`);
  };

  // Remove a candidate
  const handleRemoveCandidate = (id) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  // Clear all candidates
  const handleClearAll = () => {
    if (candidates.length === 0) return;
    if (window.confirm("Are you sure you want to clear all candidates from the list?")) {
      setCandidates([]);
      toast("Candidate list cleared", { icon: "🧹" });
    }
  };

  // Resolve preview interpolation
  const getInterpolatedPreview = (candidate) => {
    const cand = candidate || {
      name: "John Doe",
      email: "john.doe@example.com",
      date: defaultDate,
      time: defaultTime,
      link: defaultLink,
      role: defaultRole,
    };

    const targetDate = defaultDate;
    const targetTime = defaultTime;
    const targetLink = defaultLink;
    const targetRole = defaultRole;

    let sub = subject
      .replace(/\{name\}|\{\{name\}\}/gi, cand.name)
      .replace(/\{date\}|\{\{date\}\}/gi, targetDate)
      .replace(/\{time\}|\{\{time\}\}/gi, targetTime)
      .replace(/\{link\}|\{\{link\}\}/gi, targetLink)
      .replace(/\{role\}|\{\{role\}\}/gi, targetRole);

    let text = messageContent
      .replace(/\{name\}|\{\{name\}\}/gi, cand.name)
      .replace(/\{date\}|\{\{date\}\}/gi, targetDate)
      .replace(/\{time\}|\{\{time\}\}/gi, targetTime)
      .replace(/\{link\}|\{\{link\}\}/gi, targetLink)
      .replace(/\{role\}|\{\{role\}\}/gi, targetRole);

    return { subject: sub, body: text, targetDate, targetTime, targetLink, targetRole, candidate: cand };
  };

  // Send single test email
  const handleSendTestEmail = async () => {
    if (!testEmail || !testEmail.includes("@")) {
      toast.error("Please enter a valid test email address");
      return;
    }

    setIsSendingTest(true);
    const toastId = toast.loading(`Sending test email to ${testEmail}...`);

    try {
      const payload = {
        email: testEmail,
        name: "Test Candidate",
        subject: subject,
        messageContent: messageContent,
        interviewDate: defaultDate,
        interviewTime: defaultTime,
        meetingLink: defaultLink,
        role: defaultRole,
      };

      const res = await axios.post(`${API}/api/studentsremainer/send-test`, payload);
      if (res.data?.success) {
        toast.success(`Test email successfully sent to ${testEmail}!`, { id: toastId });
      } else {
        toast.error(res.data?.error || "Failed to send test email", { id: toastId });
      }
    } catch (err) {
      console.error("Test email error:", err);
      toast.error(err.response?.data?.error || err.message || "Failed to send test email", { id: toastId });
    } finally {
      setIsSendingTest(false);
    }
  };

  // Bulk send interview reminders
  const handleSendAllReminders = async () => {
    if (candidates.length === 0) {
      toast.error("No candidates to send emails to. Please upload or add candidates first.");
      return;
    }

    const readyCandidates = candidates.filter((c) => c.status !== "sent");
    if (readyCandidates.length === 0) {
      toast("All candidates have already been sent emails! Add new candidates or reset list.", { icon: "ℹ️" });
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to send interview reminders to ${readyCandidates.length} candidate(s) from hr@accenlearn.com?`
      )
    ) {
      return;
    }

    setIsSending(true);
    setProgress({ current: 0, total: readyCandidates.length });
    const toastId = toast.loading(`Sending reminders to ${readyCandidates.length} candidates...`);

    try {
      const payload = {
        recipients: readyCandidates.map((c) => ({
          name: c.name,
          email: c.email,
          date: defaultDate,
          time: defaultTime,
          link: defaultLink,
          role: defaultRole,
        })),
        subject,
        messageContent,
        defaultDate,
        defaultTime,
        defaultLink,
        defaultRole,
      };

      const res = await axios.post(`${API}/api/studentsremainer/send-bulk`, payload);

      if (res.data?.success) {
        const { sentCount, failedCount, results } = res.data;

        // Update candidates status locally
        setCandidates((prev) => {
          const map = new Map();
          (results || []).forEach((r) => map.set(r.email.toLowerCase(), r));

          return prev.map((cand) => {
            const resItem = map.get(cand.email.toLowerCase());
            if (resItem) {
              return {
                ...cand,
                status: resItem.status,
                error: resItem.error || null,
              };
            }
            return cand;
          });
        });

        toast.success(
          `Dispatched successfully! Sent: ${sentCount}, Failed: ${failedCount}`,
          { id: toastId, duration: 6000 }
        );
      } else {
        toast.error(res.data?.error || "Bulk sending failed", { id: toastId });
      }
    } catch (err) {
      console.error("Bulk sending error:", err);
      toast.error(err.response?.data?.error || err.message || "Failed to complete bulk email dispatch", { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    if (!searchTerm.trim()) return candidates;
    const q = searchTerm.toLowerCase();
    return candidates.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.role && c.role.toLowerCase().includes(q))
    );
  }, [candidates, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = candidates.length;
    const sent = candidates.filter((c) => c.status === "sent").length;
    const failed = candidates.filter((c) => c.status === "failed").length;
    const ready = total - sent - failed;
    return { total, sent, failed, ready };
  }, [candidates]);

  const previewData = getInterpolatedPreview(candidates[0]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Toaster position="top-right" />

      {/* Top Banner / Public Route Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-orange-500/20">
              AL
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight">Accenlearn HR Portal</h1>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Public Route
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>Direct Access</span>
                <span className="inline-block w-1 h-1 rounded-full bg-slate-600"></span>
                <span>Sender: <strong className="text-orange-400">hr@accenlearn.com</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={downloadSampleTemplate}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Download Sample Excel Sheet"
            >
              <Download className="w-3.5 h-3.5 text-orange-400" />
              <span>Sample Excel</span>
            </button>
            <a
              href="mailto:hr@accenlearn.com"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/30 transition"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>hr@accenlearn.com</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Page Hero */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Automated Candidate Reminders
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Student & Candidate Interview Reminders
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-3xl">
                Upload your Excel or CSV list of candidates. Customize the interview date, time, and meeting link. 
                Emails are dispatched directly from <span className="font-semibold text-slate-900">hr@accenlearn.com</span> with pre-defined or custom message templates.
              </p>
            </div>

            {/* Quick Stat Counters */}
            <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center min-w-[280px]">
              <div className="px-2">
                <div className="text-xs text-slate-500 font-medium">Total</div>
                <div className="text-xl font-bold text-slate-800">{stats.total}</div>
              </div>
              <div className="px-2 border-l border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Ready</div>
                <div className="text-xl font-bold text-blue-600">{stats.ready}</div>
              </div>
              <div className="px-2 border-l border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Sent</div>
                <div className="text-xl font-bold text-emerald-600">{stats.sent}</div>
              </div>
              <div className="px-2 border-l border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Failed</div>
                <div className="text-xl font-bold text-rose-600">{stats.failed}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Email Template & Schedule Configuration (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Content & Schedule Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  Email Content & Template
                </h3>
                <span className="text-xs text-slate-400 font-medium">Step 1</span>
              </div>

              {/* Template Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Choose Template
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(PREDEFINED_TEMPLATES).map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => handleTemplateChange(tmpl.id)}
                      className={`text-left px-3.5 py-2.5 rounded-xl border text-sm transition flex items-center justify-between ${
                        selectedTemplateKey === tmpl.id
                          ? "border-orange-500 bg-orange-50/70 text-orange-950 font-semibold ring-2 ring-orange-500/20"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50"
                      }`}
                    >
                      <span>{tmpl.name}</span>
                      {selectedTemplateKey === tmpl.id && (
                        <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Line */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. HR Accenlearn - Interview Scheduled"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Supports placeholders: {"{name}"}, {"{date}"}, {"{time}"}
                </span>
              </div>

              {/* Unified Schedule Controls */}
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    Interview Schedule (Same for Entire List)
                  </div>
                  <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full border border-orange-200">
                    Unified
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Every candidate in the list receives this exact interview date, time, and meeting link.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Interview Date
                    </label>
                    <input
                      type="date"
                      value={defaultDate}
                      onChange={(e) => setDefaultDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Interview Time
                    </label>
                    <input
                      type="text"
                      value={defaultTime}
                      onChange={(e) => setDefaultTime(e.target.value)}
                      placeholder="e.g. 11:00 AM"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Meeting Link or Location
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={defaultLink}
                      onChange={(e) => setDefaultLink(e.target.value)}
                      placeholder="https://meet.google.com/..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Position / Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={defaultRole}
                      onChange={(e) => setDefaultRole(e.target.value)}
                      placeholder="e.g. Business Development Associate"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Email Message Content Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Body / Message
                  </label>
                  <span className="text-[11px] text-orange-600 font-medium">Editable</span>
                </div>
                <textarea
                  rows={8}
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Paste or write your interview reminder message here..."
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 leading-relaxed"
                />
                <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-600">Available Placeholders:</span>
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 text-orange-700 font-bold border border-slate-200">{"{name}"}</code>
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 text-orange-700 font-bold border border-slate-200">{"{date}"}</code>
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 text-orange-700 font-bold border border-slate-200">{"{time}"}</code>
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 text-orange-700 font-bold border border-slate-200">{"{link}"}</code>
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 text-orange-700 font-bold border border-slate-200">{"{role}"}</code>
                </div>
              </div>

              {/* Single Test Email Box */}
              <div className="pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Send A Test Email First
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="Enter your personal or test email"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={isSendingTest || !testEmail}
                    className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSendingTest ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Send Test</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Excel Upload, Candidate Management & Dispatch (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Upload & Actions Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  Connect Excel / CSV Candidates
                </h3>
                <span className="text-xs text-slate-400 font-medium">Step 2</span>
              </div>

              {/* Drag & Drop Upload Zone */}
              <div className="relative border-2 border-dashed border-slate-200 hover:border-orange-400 bg-slate-50/50 hover:bg-orange-50/30 rounded-2xl p-6 text-center transition group cursor-pointer">
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-orange-600 transition">
                      Click to upload Excel or CSV file
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Supports .xlsx, .xls, and .csv with candidate Name and Email columns
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Candidate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasteModal(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    <ClipboardPaste className="w-3.5 h-3.5" />
                    <span>Paste Text List</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {candidates.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Candidate List & Preview Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Tab Header */}
              <div className="flex items-center justify-between px-5 pt-4 border-b border-slate-200 bg-slate-50/50">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("candidates")}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 ${
                      activeTab === "candidates"
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    Candidates ({candidates.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 ${
                      activeTab === "preview"
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Live Email Preview
                  </button>
                </div>

                {activeTab === "candidates" && candidates.length > 0 && (
                  <div className="relative pb-2">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search candidate..."
                      className="pl-8 pr-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 w-36 sm:w-48"
                    />
                  </div>
                )}
              </div>

              {/* Tab 1: Candidates Table */}
              {activeTab === "candidates" && (
                <div>
                  {candidates.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 space-y-3">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <FileSpreadsheet className="w-7 h-7" />
                      </div>
                      <div className="text-sm font-semibold text-slate-600">No Candidates Loaded Yet</div>
                      <p className="text-xs max-w-sm mx-auto text-slate-400">
                        Upload an Excel/CSV file with candidate names & emails or click "Add Candidate" or "Paste Text List" to get started.
                      </p>
                      <button
                        type="button"
                        onClick={downloadSampleTemplate}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Sample Excel Template
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-wider sticky top-0 border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-3">#</th>
                            <th className="py-2.5 px-3">Candidate Name</th>
                            <th className="py-2.5 px-3">Email Address</th>
                            <th className="py-2.5 px-3">Interview Date & Time (Unified)</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {filteredCandidates.map((c, i) => (
                            <tr key={c.id} className="hover:bg-slate-50/70 transition">
                              <td className="py-2.5 px-3 text-slate-400 font-medium">{i + 1}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-800">{c.name}</td>
                              <td className="py-2.5 px-3 font-mono text-slate-600">{c.email}</td>
                              <td className="py-2.5 px-3">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-xs font-medium">
                                  <Calendar className="w-3 h-3 text-orange-600" />
                                  {defaultDate} • {defaultTime}
                                </span>
                              </td>
                              <td className="py-2.5 px-3">
                                {c.status === "sent" && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                    <CheckCircle2 className="w-3 h-3" /> Sent
                                  </span>
                                )}
                                {c.status === "failed" && (
                                  <span
                                    title={c.error || "Failed to deliver"}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700"
                                  >
                                    <AlertCircle className="w-3 h-3" /> Failed
                                  </span>
                                )}
                                {c.status === "ready" && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                    Ready
                                  </span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCandidate(c.id)}
                                  className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                                  title="Remove Candidate"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
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

              {/* Tab 2: Live HTML Email Preview */}
              {activeTab === "preview" && (
                <div className="p-6 bg-slate-100/70">
                  <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-xs">
                    {/* Header */}
                    <div className="bg-slate-900 p-4 border-b-2 border-orange-500 text-white flex items-center justify-between">
                      <div>
                        <div className="font-extrabold text-base tracking-tight">
                          ACCEN<span className="text-orange-500">LEARN</span>
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest">
                          Human Resources & Talent Acquisition
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold border border-orange-500/30">
                        Interview Schedule
                      </span>
                    </div>

                    {/* Email Content */}
                    <div className="p-5 space-y-4 text-slate-700 leading-relaxed">
                      <div className="font-bold text-sm text-slate-900">
                        Dear {previewData.candidate.name || "Candidate"},
                      </div>

                      <div className="whitespace-pre-line text-slate-600 text-xs">
                        {previewData.body}
                      </div>

                      {/* Schedule Box */}
                      <div className="bg-slate-50 rounded-lg border border-slate-200 p-3.5 space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                          📌 Interview Details
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-slate-500 font-semibold">📅 Date:</span>
                          <span className="col-span-2 font-bold text-slate-900">{previewData.targetDate}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-slate-500 font-semibold">⏰ Time:</span>
                          <span className="col-span-2 font-bold text-slate-900">{previewData.targetTime}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-slate-500 font-semibold">💼 Position:</span>
                          <span className="col-span-2 font-medium text-slate-800">{previewData.targetRole}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-slate-500 font-semibold">🔗 Link / Venue:</span>
                          <span className="col-span-2 font-medium text-blue-600 underline break-all">
                            {previewData.targetLink}
                          </span>
                        </div>
                      </div>

                      {/* Join CTA */}
                      {previewData.targetLink && (
                        <div className="text-center pt-2">
                          <a
                            href={previewData.targetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-orange-600 text-white font-bold px-5 py-2 rounded-lg shadow-sm shadow-orange-500/20 text-xs"
                          >
                            Join Interview Session
                          </a>
                        </div>
                      )}

                      {/* Sign-off */}
                      <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                        Warm regards,<br />
                        <strong className="text-slate-800">HR Team | Accenlearn</strong><br />
                        <span>Email: hr@accenlearn.com</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 p-3 text-center text-[10px] text-slate-400 border-t border-slate-100">
                      Official Communication from Accenlearn HR • hr@accenlearn.com
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Dispatch Action Card */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base text-white flex items-center gap-2">
                    <Send className="w-5 h-5 text-orange-400" />
                    Dispatch All Reminders
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Sends emails sequentially via <strong className="text-orange-400">hr@accenlearn.com</strong> with anti-rate-limit throttling.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSendAllReminders}
                  disabled={isSending || candidates.length === 0}
                  className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Reminders...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send All Reminders ({candidates.length})</span>
                    </>
                  )}
                </button>
              </div>

              {isSending && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Dispatching emails...</span>
                    <span>Please do not close this window</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-orange-500 h-2 rounded-full animate-pulse w-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal 1: Add Candidate Manually */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Add Candidate</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManual} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Candidate Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Candidate Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Unified Schedule Notice */}
              <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200/80 text-xs text-orange-950 flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Interview Schedule (Same for entire list):</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{defaultDate} at {defaultTime}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Applied automatically from the master schedule settings.</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition shadow-sm"
                >
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Bulk Paste Text */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Paste Candidate List</h3>
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div>
              <p className="text-xs text-slate-600 mb-2">
                Paste names and emails (one per line, separated by comma or tab). The same interview date & time (<strong className="text-orange-700">{defaultDate} at {defaultTime}</strong>) applies to all candidates:
              </p>
              <pre className="text-[11px] bg-slate-100 p-2.5 rounded-lg text-slate-800 font-mono mb-3">
                John Doe, john@example.com{"\n"}
                Priya Sharma, priya@example.com
              </pre>

              <textarea
                rows={7}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="John Doe, john@example.com&#10;Priya Sharma, priya@example.com"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkPaste}
                disabled={!pasteText.trim()}
                className="px-4 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition shadow-sm disabled:opacity-50"
              >
                Parse & Add Candidates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
