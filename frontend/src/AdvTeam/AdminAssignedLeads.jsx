import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  Users,
  Search,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronDown,
  UserCheck,
  Send,
  Building,
  GraduationCap,
  Sparkles,
  FileText,
  X,
  ExternalLink,
  ChevronRight,
  User,
  ArrowRight
} from "lucide-react";

const LEAD_STATUS_OPTIONS = [
  { value: "New", label: "New Lead", badge: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "Attempting Contact", label: "Attempting Contact", badge: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "Connected", label: "Connected / In Call", badge: "bg-purple-100 text-purple-700 border-purple-200" },
  { value: "Interested", label: "Interested", badge: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "Demo Scheduled", label: "Demo Scheduled", badge: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { value: "Enrolled", label: "Enrolled / Booked", badge: "bg-green-100 text-green-800 border-green-300" },
  { value: "Not Interested", label: "Not Interested", badge: "bg-rose-100 text-rose-700 border-rose-200" },
];

const getStatusBadgeClass = (status) => {
  const found = LEAD_STATUS_OPTIONS.find((s) => s.value === status);
  return found ? found.badge : "bg-slate-100 text-slate-600 border-slate-200";
};

const AdminAssignedLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scope, setScope] = useState("my"); // "my" or "team"
  const [selectedMember, setSelectedMember] = useState("all");
  const [teamMembers, setTeamMembers] = useState([]);

  // Detail Modal State
  const [activeLead, setActiveLead] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Remark Modal State
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [remarkLead, setRemarkLead] = useState(null);
  const [newRemarkText, setNewRemarkText] = useState("");
  const [isSubmittingRemark, setIsSubmittingRemark] = useState(false);

  // Auth User Data
  const advTeamId = localStorage.getItem("advTeamId");
  const advTeamName = localStorage.getItem("advTeamName") || "Sales Specialist";
  const advTeamEmail = localStorage.getItem("advTeamEmail") || "";
  const [userProfile, setUserProfile] = useState(null);

  const designation = (userProfile?.designation || localStorage.getItem("advTeamDesignation") || "").toUpperCase();
  const userTeam = userProfile?.team || localStorage.getItem("advTeamTeam") || "";

  const isLeaderOrManager =
    designation.includes("LEADER") ||
    designation.includes("MANAGER") ||
    designation.includes("HEAD") ||
    advTeamName.toLowerCase().includes("sumeetha");

  // Fetch current user details & team members
  const fetchUserProfile = async () => {
    if (!advTeamId) return;
    try {
      const res = await axios.get(`${API}/getadvteam`, { params: { advTeamId } });
      setUserProfile(res.data);
    } catch (err) {
      console.error("Failed to load user profile:", err);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`${API}/getadvteam`);
      const allMembers = Array.isArray(res.data) ? res.data : [];
      if (userTeam && userTeam !== "Management") {
        setTeamMembers(allMembers.filter((m) => m.team === userTeam));
      } else {
        setTeamMembers(allMembers);
      }
    } catch (err) {
      console.error("Failed to load team members:", err);
    }
  };

  // Fetch leads assigned by admin
  const fetchAssignedLeads = async (showToast = false) => {
    if (!advTeamId && !advTeamName) return;
    if (showToast) setIsRefreshing(true);
    try {
      const res = await axios.get(`${API}/advancequeries/assigned`, {
        params: {
          salespersonId: advTeamId,
          salespersonName: advTeamName,
          salespersonEmail: advTeamEmail,
          team: userTeam,
          designation,
          scope,
          status: statusFilter,
          search: searchQuery,
        },
      });

      if (res.data.success) {
        setLeads(res.data.leads || []);
      }
      if (showToast) toast.success("Assigned leads refreshed!");
    } catch (err) {
      console.error("Error fetching assigned leads:", err);
      toast.error("Failed to fetch assigned leads");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    fetchAssignedLeads();
  }, [scope, statusFilter]);

  // Handle Search Filter (client-side instantaneous search)
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Team member filter when viewing team scope
      if (scope === "team" && selectedMember !== "all") {
        const leadMember = lead.assignedToName || lead.assignedToEmail || "";
        if (leadMember.toLowerCase() !== selectedMember.toLowerCase()) {
          return false;
        }
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (lead.name && lead.name.toLowerCase().includes(q)) ||
        (lead.email && lead.email.toLowerCase().includes(q)) ||
        (lead.phone && lead.phone.toLowerCase().includes(q)) ||
        (lead.interestedDomain && lead.interestedDomain.toLowerCase().includes(q)) ||
        (lead.domain && lead.domain.toLowerCase().includes(q)) ||
        (lead.goal && lead.goal.toLowerCase().includes(q)) ||
        (lead.assignedToName && lead.assignedToName.toLowerCase().includes(q))
      );
    });
  }, [leads, searchQuery, scope, selectedMember]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = leads.length;
    const fresh = leads.filter((l) => (l.leadStatus || "New") === "New").length;
    const inProgress = leads.filter((l) =>
      ["Attempting Contact", "Connected", "Interested", "Demo Scheduled"].includes(l.leadStatus)
    ).length;
    const enrolled = leads.filter((l) => (l.leadStatus || "") === "Enrolled").length;
    return { total, fresh, inProgress, enrolled };
  }, [leads]);

  // Handle Quick Status Change
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await axios.put(`${API}/advancequery/${leadId}/lead-status`, {
        leadStatus: newStatus,
        salespersonName: advTeamName,
        remark: `Status updated to ${newStatus}`,
      });

      if (res.data.success) {
        toast.success(`Lead marked as ${newStatus}`);
        setLeads((prev) =>
          prev.map((item) =>
            item._id === leadId
              ? {
                  ...item,
                  leadStatus: newStatus,
                  lastContactedAt: new Date().toISOString(),
                  remarks: [
                    ...(item.remarks || []),
                    { text: `Status updated to ${newStatus}`, by: advTeamName, createdAt: new Date() },
                  ],
                }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    }
  };

  // Handle Add Remark
  const handleOpenRemarkModal = (lead) => {
    setRemarkLead(lead);
    setNewRemarkText("");
    setRemarkModalOpen(true);
  };

  const handleAddRemarkSubmit = async (e) => {
    e.preventDefault();
    if (!newRemarkText.trim() || !remarkLead) return;
    setIsSubmittingRemark(true);
    try {
      const res = await axios.post(`${API}/advancequery/${remarkLead._id}/remark`, {
        text: newRemarkText.trim(),
        by: advTeamName,
      });

      if (res.data.success) {
        toast.success("Remark added!");
        setLeads((prev) =>
          prev.map((item) =>
            item._id === remarkLead._id ? { ...item, remarks: res.data.remarks } : item
          )
        );
        setRemarkModalOpen(false);
        setNewRemarkText("");
      }
    } catch (err) {
      console.error("Failed to add remark:", err);
      toast.error("Failed to save remark");
    } finally {
      setIsSubmittingRemark(false);
    }
  };

  // WhatsApp Message Launcher
  const sendWhatsApp = (lead) => {
    const rawPhone = String(lead.phone || "").replace(/[^0-9]/g, "");
    const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const domainText = lead.interestedDomain || lead.domain || "Advance Career Program";
    const studentName = lead.name ? lead.name.trim() : "Student";

    const msg = `Hello ${studentName},

Greetings from Accenlearn Solutions!

This is ${advTeamName} from the Academic Partnerships & Admissions Team. I received your inquiry regarding our "${domainText}" program.

I would love to share the detailed curriculum syllabus, live mentor sessions structure, and the career roadmap with you.

Are you available for a brief 5-minute call today?

Looking forward to connecting with you!

Best regards,
${advTeamName}
Accenlearn Solutions`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return `${d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}, ${d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] max-md:ml-0 mt-[70px] p-6 sm:p-8 md:p-10 text-slate-800">
      <Toaster position="top-right" />

      <div className="max-w-[1500px] mx-auto space-y-6">
        {/* ── TOP HEADER ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 flex items-center justify-center">
                <Users size={24} />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  Admin Assigned Leads
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Inbound Queries
                  </span>
                </h1>
                <p className="text-slate-500 text-sm mt-0.5">
                  Direct student queries from the advance portal assigned to you for consultation and enrollment.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Scope Toggle for Leaders/Managers */}
            {isLeaderOrManager && (
              <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setScope("my")}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    scope === "my"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  My Leads
                </button>
                <button
                  onClick={() => setScope("team")}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    scope === "team"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Users size={14} /> Team Leads
                </button>
              </div>
            )}

            <button
              onClick={() => fetchAssignedLeads(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition border border-slate-200/80 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* ── METRIC STAT CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Total Assigned
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900">{stats.total}</span>
              <span className="p-2 rounded-xl bg-slate-100 text-slate-600">
                <Users size={18} />
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-1">
              Fresh Leads (New)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-blue-600">{stats.fresh}</span>
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Sparkles size={18} />
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-bold text-purple-500 uppercase tracking-wider block mb-1">
              In Discussion
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-purple-600">{stats.inProgress}</span>
              <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Clock size={18} />
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block mb-1">
              Enrolled / Converted
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-emerald-600">{stats.enrolled}</span>
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={18} />
              </span>
            </div>
          </div>
        </div>

        {/* ── FILTERS & CONTROLS ── */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search candidate name, email, phone, domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Team Member Filter (for Manager/Leader when scope is team) */}
            {scope === "team" && isLeaderOrManager && teamMembers.length > 0 && (
              <div className="relative">
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer pr-8"
                >
                  <option value="all">All Team Members ({teamMembers.length})</option>
                  {teamMembers.map((m) => (
                    <option key={m._id} value={m.fullname}>
                      {m.fullname} ({m.designation || "Specialist"})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Status Filter Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer pr-8"
              >
                <option value="all">All Statuses</option>
                {LEAD_STATUS_OPTIONS.map((st) => (
                  <option key={st.value} value={st.value}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs font-bold text-slate-500 px-3 py-2 bg-slate-100 rounded-xl">
              {filteredLeads.length} Lead(s)
            </div>
          </div>
        </div>

        {/* ── LEADS TABLE / LIST ── */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs font-bold text-slate-500">Loading your assigned leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-24 text-center px-4">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100">
                <Users size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Assigned Leads Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {searchQuery || statusFilter !== "all"
                  ? "No leads matched your filter criteria. Try clearing search or filters."
                  : "When admin assigns course queries to you, they will appear here instantly."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-4 px-5 text-center w-12">#</th>
                    <th className="py-4 px-5">Candidate Profile</th>
                    <th className="py-4 px-5">Interested Program</th>
                    <th className="py-4 px-5">Primary Goal & Challenge</th>
                    {scope === "team" && <th className="py-4 px-5">Assigned To</th>}
                    <th className="py-4 px-5">Lead Status</th>
                    <th className="py-4 px-5 text-center">Contact Actions</th>
                    <th className="py-4 px-5 text-center">Remarks & Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead, idx) => {
                    const cleanPhone = String(lead.phone || "").replace(/[^0-9]/g, "");
                    const latestRemark =
                      Array.isArray(lead.remarks) && lead.remarks.length > 0
                        ? lead.remarks[lead.remarks.length - 1]
                        : null;

                    return (
                      <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Index */}
                        <td className="py-4 px-5 text-center font-bold text-slate-400">
                          {idx + 1}
                        </td>

                        {/* Candidate Profile */}
                        <td className="py-4 px-5">
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-900 capitalize text-sm">
                              {lead.name || "N/A"}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <span className="font-semibold text-slate-700">{lead.phone}</span>
                              <span>•</span>
                              <span className="max-w-[160px] truncate text-slate-400">{lead.email}</span>
                            </div>
                            {lead.passedOutYear && (
                              <span className="inline-block text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                                Passout: {lead.passedOutYear}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Program Interest */}
                        <td className="py-4 px-5">
                          <div className="space-y-1">
                            <span className="inline-block font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg text-xs capitalize">
                              {lead.interestedDomain || lead.domain || "Advance Track"}
                            </span>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock size={11} />
                              <span>Assigned: {formatDateTime(lead.assignedAt || lead.createdAt)}</span>
                            </div>
                          </div>
                        </td>

                        {/* Goal & Challenge */}
                        <td className="py-4 px-5 max-w-xs">
                          <div className="space-y-0.5">
                            <p className="font-semibold text-slate-700 truncate capitalize max-w-[220px]">
                              {lead.goal === "Other" ? lead.goalOther : lead.goal || "N/A"}
                            </p>
                            {lead.reason && (
                              <p className="text-[11px] text-slate-400 truncate max-w-[220px]">
                                {lead.reason}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Assigned Specialist (when team view) */}
                        {scope === "team" && (
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs uppercase">
                                {lead.assignedToName ? lead.assignedToName.charAt(0) : "S"}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-xs">
                                  {lead.assignedToName || "Unassigned"}
                                </p>
                                <p className="text-[10px] text-slate-400">{lead.assignedToTeam || "Team"}</p>
                              </div>
                            </div>
                          </td>
                        )}

                        {/* Lead Status Select */}
                        <td className="py-4 px-5">
                          <div className="relative w-44">
                            <select
                              value={lead.leadStatus || "New"}
                              onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                              className={`w-full text-xs font-bold appearance-none border rounded-xl px-3 py-2 outline-none cursor-pointer pr-7 transition ${getStatusBadgeClass(
                                lead.leadStatus || "New"
                              )}`}
                            >
                              {LEAD_STATUS_OPTIONS.map((st) => (
                                <option key={st.value} value={st.value}>
                                  {st.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={12}
                              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 opacity-60"
                            />
                          </div>
                        </td>

                        {/* Contact Actions */}
                        <td className="py-4 px-5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* WhatsApp Button */}
                            <button
                              onClick={() => sendWhatsApp(lead)}
                              className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200/60 transition cursor-pointer"
                              title="Chat on WhatsApp (Pre-filled Intro)"
                            >
                              <MessageSquare size={14} />
                            </button>

                            {/* Call Button */}
                            <a
                              href={`tel:${cleanPhone}`}
                              className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200/60 transition cursor-pointer"
                              title="Direct Phone Call"
                            >
                              <Phone size={14} />
                            </a>

                            {/* Email Button */}
                            <a
                              href={`mailto:${lead.email}?subject=Advance Program Inquiry - Accenlearn Solutions`}
                              className="p-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200/60 transition cursor-pointer"
                              title="Send Email"
                            >
                              <Mail size={14} />
                            </a>
                          </div>
                        </td>

                        {/* Remarks & Details */}
                        <td className="py-4 px-5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Remark Button */}
                            <button
                              onClick={() => handleOpenRemarkModal(lead)}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] border border-slate-200/80 transition flex items-center gap-1 cursor-pointer"
                              title="Add or view remarks"
                            >
                              <FileText size={12} />
                              <span>{lead.remarks?.length || 0}</span>
                            </button>

                            {/* View Full Info */}
                            <button
                              onClick={() => {
                                setActiveLead(lead);
                                setDetailModalOpen(true);
                              }}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
                              title="View Full Questionnaire Details"
                            >
                              <ExternalLink size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL: LEAD FULL DETAILS ── */}
      {detailModalOpen && activeLead && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-6 sm:p-7 relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setDetailModalOpen(false);
                setActiveLead(null);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="mb-5 pb-3 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users size={20} className="text-indigo-600" />
                Candidate Full Query Details
              </h2>
              <p className="text-xs text-slate-500 mt-1">Submitted through Advance Website Inquiry Form</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-1.5">
                <p className="text-sm font-bold text-indigo-950 capitalize">{activeLead.name}</p>
                <div className="flex flex-wrap items-center gap-3 text-slate-600">
                  <span>📱 {activeLead.phone}</span>
                  <span>✉️ {activeLead.email}</span>
                </div>
                {activeLead.passedOutYear && (
                  <p className="text-slate-600">🎓 Year of Passing: <strong>{activeLead.passedOutYear}</strong></p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block font-bold uppercase text-[10px]">Interested Domain</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {activeLead.interestedDomain || activeLead.domain || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold uppercase text-[10px]">Assigned Date</span>
                  <span className="font-bold text-slate-800">
                    {formatDate(activeLead.assignedAt || activeLead.createdAt)}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <div>
                  <span className="text-slate-400 block font-bold uppercase text-[10px] mb-0.5">Primary Career Goal</span>
                  <p className="font-semibold text-slate-800">
                    {activeLead.goal === "Other" ? activeLead.goalOther : activeLead.goal || "N/A"}
                  </p>
                </div>

                {activeLead.reason && (
                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px] mb-0.5">Biggest Career Challenge</span>
                    <p className="text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                      {activeLead.reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Remarks History */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-slate-500 font-bold uppercase text-[10px] block">
                  Remarks & Followup History ({activeLead.remarks?.length || 0})
                </span>
                {Array.isArray(activeLead.remarks) && activeLead.remarks.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {activeLead.remarks.map((r, i) => (
                      <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px]">
                        <p className="text-slate-800 font-medium">{r.text}</p>
                        <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                          <span>By: {r.by || "Specialist"}</span>
                          <span>{formatDateTime(r.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-[11px]">No remarks logged yet.</p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => sendWhatsApp(activeLead)}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare size={15} /> WhatsApp Candidate
              </button>
              <button
                onClick={() => {
                  setDetailModalOpen(false);
                  handleOpenRemarkModal(activeLead);
                }}
                className="py-3 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                <FileText size={15} /> Add Remark
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ADD REMARK ── */}
      {remarkModalOpen && remarkLead && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-7 relative border border-slate-100">
            <button
              onClick={() => {
                setRemarkModalOpen(false);
                setRemarkLead(null);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="mb-4 pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText size={18} className="text-indigo-600" />
                Add Remark / Call Note
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                For candidate: <strong className="text-slate-800">{remarkLead.name}</strong> ({remarkLead.phone})
              </p>
            </div>

            <form onSubmit={handleAddRemarkSubmit} className="space-y-4">
              <div>
                <label className="font-bold text-slate-600 uppercase text-[10px] tracking-wider block mb-1">
                  Note / Discussion Summary
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Called candidate, they are interested in Data Science cohort. Scheduled demo for Friday 6 PM..."
                  value={newRemarkText}
                  onChange={(e) => setNewRemarkText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
                ></textarea>
              </div>

              {/* Past Remarks View */}
              {Array.isArray(remarkLead.remarks) && remarkLead.remarks.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Previous Remarks ({remarkLead.remarks.length})
                  </span>
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                    {remarkLead.remarks.map((r, i) => (
                      <div key={i} className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-[11px]">
                        <p className="text-slate-700">{r.text}</p>
                        <span className="text-[9px] text-slate-400 block mt-0.5">
                          {r.by || "Specialist"} • {formatDateTime(r.createdAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setRemarkModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingRemark}
                  className="flex-[2] py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  {isSubmittingRemark ? "Saving Note..." : "Save Remark"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAssignedLeads;

