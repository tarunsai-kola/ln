import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  Calculator,
  Plus,
  Trash2,
  Edit3,
  Users,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Sliders,
  Search,
  UserCheck,
  Layers,
  RefreshCw,
  ShieldCheck,
  Target,
  Calendar,
  Mail,
  Send
} from "lucide-react";

const formatINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
};

const SalaryCalculatorManagement = () => {
  const [activeTab, setActiveTab] = useState("formulas"); // "formulas" | "assign" | "payouts"
  const [formulas, setFormulas] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Month selector for payouts report
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr);
  const [payoutsReport, setPayoutsReport] = useState([]);
  const [loadingPayouts, setLoadingPayouts] = useState(false);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingFormulaId, setEditingFormulaId] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedFormulaForAssign, setSelectedFormulaForAssign] = useState(null);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);
  const [mailTargetMemberId, setMailTargetMemberId] = useState("all");

  // Form State (strictly Target & Salary, NO INCENTIVES)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    metricType: "revenue", // "revenue" | "deals"
    baseSalary: 25000,
    baseTarget: 200000,
    payoutModel: "target_prorata", // "target_prorata" | "guaranteed_base"
    isDefault: false
  });

  // Simulator achievement state (strictly capped at baseTarget)
  const [testAchievement, setTestAchievement] = useState(200000);

  // Fetch Formulas
  const fetchFormulas = async () => {
    try {
      const res = await axios.get(`${API}/api/salary-calculator/formulas`);
      if (res.data.success) {
        setFormulas(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching formulas:", err);
      toast.error("Failed to load salary plans");
    }
  };

  // Fetch Team Members (AdvTeam)
  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`${API}/getadvteam`);
      const members = Array.isArray(res.data) ? res.data : [];
      setTeamMembers(members.filter((m) => m.status !== "Inactive"));
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  };

  // Fetch payouts summary for selected month (strictly fullPaid revenue)
  const fetchPayoutsReport = async (month) => {
    setLoadingPayouts(true);
    try {
      const res = await axios.get(`${API}/api/salary-calculator/all-members-payouts`, {
        params: { month: month || selectedMonth }
      });
      if (res.data.success) {
        setPayoutsReport(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching payouts report:", err);
      toast.error("Failed to load payouts report");
    } finally {
      setLoadingPayouts(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([fetchFormulas(), fetchTeamMembers()]);
    setLoading(false);
  };

  const handleSendTargetSalaryMail = async (specificMemberId = null) => {
    const targetId = specificMemberId || (mailTargetMemberId === "all" ? null : mailTargetMemberId);
    setSendingMail(true);
    const loadingToast = toast.loading("Dispatching Target & Base Salary email(s)...");
    try {
      const res = await axios.post(`${API}/api/salary-calculator/send-target-salary-mail`, {
        memberId: targetId,
        month: selectedMonth
      });

      if (res.data.success) {
        toast.dismiss(loadingToast);
        toast.success(res.data.message || `Emails successfully sent!`);
        setIsMailModalOpen(false);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("Error sending salary/target emails:", err);
      toast.error(err.response?.data?.message || "Failed to send target & salary emails");
    } finally {
      setSendingMail(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (activeTab === "payouts") {
      fetchPayoutsReport(selectedMonth);
    }
  }, [activeTab, selectedMonth]);

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingFormulaId(null);
    setFormData({
      name: "",
      description: "",
      metricType: "revenue",
      baseSalary: 25000,
      baseTarget: 200000,
      payoutModel: "target_prorata",
      isDefault: false
    });
    setTestAchievement(200000);
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (formula) => {
    setEditingFormulaId(formula._id);
    setFormData({
      name: formula.name,
      description: formula.description || "",
      metricType: formula.metricType || "revenue",
      baseSalary: formula.baseSalary,
      baseTarget: formula.baseTarget,
      payoutModel: formula.payoutModel || "target_prorata",
      isDefault: !!formula.isDefault
    });
    setTestAchievement(Math.min(testAchievement, formula.baseTarget));
    setIsFormModalOpen(true);
  };

  // Submit Formula
  const handleSubmitFormula = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Plan name is required");
      return;
    }

    try {
      if (editingFormulaId) {
        const res = await axios.put(`${API}/api/salary-calculator/formulas/${editingFormulaId}`, formData);
        if (res.data.success) {
          toast.success("Plan updated successfully!");
          setIsFormModalOpen(false);
          fetchFormulas();
        }
      } else {
        const res = await axios.post(`${API}/api/salary-calculator/formulas`, formData);
        if (res.data.success) {
          toast.success("New salary plan created!");
          setIsFormModalOpen(false);
          fetchFormulas();
        }
      }
    } catch (err) {
      console.error("Error saving formula:", err);
      toast.error(err.response?.data?.message || "Failed to save formula");
    }
  };

  // Delete Formula
  const handleDeleteFormula = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await axios.delete(`${API}/api/salary-calculator/formulas/${id}`);
      if (res.data.success) {
        toast.success("Formula deleted");
        fetchFormulas();
      }
    } catch (err) {
      console.error("Error deleting formula:", err);
      toast.error("Failed to delete formula");
    }
  };

  // Open Assign Members Modal
  const handleOpenAssignModal = (formula) => {
    setSelectedFormulaForAssign(formula);
    const alreadyAssigned = (formula.assignedMembers || []).map((m) => String(m.memberId || m.email));
    setSelectedMemberIds(alreadyAssigned);
    setIsAssignModalOpen(true);
  };

  const handleToggleMemberSelection = (member) => {
    const idKey = String(member._id || member.email);
    if (selectedMemberIds.includes(idKey)) {
      setSelectedMemberIds(selectedMemberIds.filter((id) => id !== idKey));
    } else {
      setSelectedMemberIds([...selectedMemberIds, idKey]);
    }
  };

  const handleSelectAllTeam = (teamName) => {
    const teamMembersToSelect = teamMembers
      .filter((m) => m.team === teamName || (m.teams && m.teams.includes(teamName)))
      .map((m) => String(m._id || m.email));

    const combined = Array.from(new Set([...selectedMemberIds, ...teamMembersToSelect]));
    setSelectedMemberIds(combined);
  };

  const handleSaveAssignments = async () => {
    if (!selectedFormulaForAssign) return;
    try {
      const membersToAssign = teamMembers
        .filter((m) => selectedMemberIds.includes(String(m._id || m.email)))
        .map((m) => ({
          memberId: m._id,
          fullname: m.fullname,
          email: m.email,
          team: m.team || (m.teams && m.teams[0]) || "General",
          designation: m.designation || "Sales Specialist"
        }));

      const res = await axios.post(`${API}/api/salary-calculator/assign`, {
        formulaId: selectedFormulaForAssign._id,
        members: membersToAssign
      });

      if (res.data.success) {
        toast.success(`Assigned ${membersToAssign.length} specialist(s) to ${selectedFormulaForAssign.name}`);
        setIsAssignModalOpen(false);
        fetchFormulas();
      }
    } catch (err) {
      console.error("Error assigning members:", err);
      toast.error("Failed to assign members");
    }
  };

  const handleUnassignMember = async (formulaId, email) => {
    try {
      const res = await axios.post(`${API}/api/salary-calculator/unassign`, { formulaId, email });
      if (res.data.success) {
        toast.success("Member unassigned");
        fetchFormulas();
      }
    } catch (err) {
      console.error("Error unassigning:", err);
      toast.error("Failed to unassign member");
    }
  };

  // Distinct team list
  const uniqueTeams = useMemo(() => {
    const teams = new Set();
    teamMembers.forEach((m) => {
      if (m.team) teams.add(m.team);
      if (Array.isArray(m.teams)) m.teams.forEach((t) => teams.add(t));
    });
    return Array.from(teams).filter(Boolean);
  }, [teamMembers]);

  // Search & filter
  const [memberSearch, setMemberSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");

  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchesSearch =
        !memberSearch ||
        (m.fullname || "").toLowerCase().includes(memberSearch.toLowerCase()) ||
        (m.email || "").toLowerCase().includes(memberSearch.toLowerCase());
      const matchesTeam =
        teamFilter === "all" ||
        m.team === teamFilter ||
        (Array.isArray(m.teams) && m.teams.includes(teamFilter));
      return matchesSearch && matchesTeam;
    });
  }, [teamMembers, memberSearch, teamFilter]);

  // Compute stats across all formulas
  const stats = useMemo(() => {
    const totalFormulas = formulas.length;
    let totalAssigned = 0;
    let avgBase = 0;
    formulas.forEach((f) => {
      totalAssigned += (f.assignedMembers || []).length;
      avgBase += f.baseSalary || 0;
    });
    return {
      totalFormulas,
      totalAssigned,
      avgBase: totalFormulas > 0 ? Math.round(avgBase / totalFormulas) : 0
    };
  }, [formulas]);

  // Admin Simulator Calculation (strictly up to baseTarget)
  const simulatedSalary = useMemo(() => {
    const target = Number(formData.baseTarget) || 1;
    const base = Number(formData.baseSalary) || 0;
    const achieve = Math.min(Number(testAchievement) || 0, target);
    const pct = Math.round((achieve / target) * 100);
    const earned = formData.payoutModel === "guaranteed_base"
      ? base
      : (achieve >= target ? base : Math.round((achieve / target) * base));
    return {
      target,
      base,
      achieve,
      pct,
      earned
    };
  }, [formData, testAchievement]);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-6 sm:p-8 text-slate-800">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ========================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Salary & Target Management</h1>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                Admin Control
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Configure base salaries and monthly FullPaid targets for sales specialists
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/attendcal"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black rounded-xl border border-rose-200 transition"
          >
            <Calendar className="w-4 h-4 text-rose-600" />
            <span>Attendance Salary Calc (/attendcal)</span>
          </Link>

          <button
            onClick={() => {
              setMailTargetMemberId("all");
              setIsMailModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-4 h-4" />
            <span>Email Target & Salary</span>
          </button>

          <button
            onClick={async () => {
              setRefreshing(true);
              await Promise.all([fetchFormulas(), fetchTeamMembers()]);
              if (activeTab === "payouts") await fetchPayoutsReport(selectedMonth);
              setRefreshing(false);
              toast.success("Synchronized!");
            }}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-indigo-600" : ""}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Plan</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* KPI METRIC CARDS */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salary Plans</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stats.totalFormulas}</h3>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <CheckCircle2 size={13} /> Active business structures
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Sales Specialists</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stats.totalAssigned}</h3>
            <span className="text-[11px] text-slate-500 font-semibold mt-1">
              Out of {teamMembers.length} active specialists
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Monthly Base Pay</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{formatINR(stats.avgBase)}</h3>
            <span className="text-[11px] text-indigo-600 font-bold mt-1">Monthly Plan Average</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB NAVIGATION */}
      {/* ========================================================= */}
      <div className="flex border-b border-slate-200 mb-6 gap-2">
        <button
          onClick={() => setActiveTab("formulas")}
          className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === "formulas"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Salary & Target Plans ({formulas.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("assign")}
          className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === "assign"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Specialist Assignment Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab("payouts")}
          className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === "payouts"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>FullPaid Monthly Report</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: FORMULAS LIST */}
      {/* ========================================================= */}
      {activeTab === "formulas" && (
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-slate-500 font-bold text-sm">Loading plans...</p>
            </div>
          ) : formulas.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
              <Calculator className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No Salary Plans Configured Yet</h3>
              <p className="text-slate-500 text-xs mt-1 max-w-md mx-auto">
                Create a salary structure with base salary and monthly FullPaid targets for your sales team.
              </p>
              <button
                onClick={handleOpenCreateModal}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
              >
                + Create Plan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formulas.map((formula) => {
                const assignedCount = (formula.assignedMembers || []).length;
                return (
                  <div
                    key={formula._id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Title & Actions */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-black text-slate-900">{formula.name}</h3>
                            {formula.isDefault && (
                              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black uppercase tracking-wider">
                                Default Plan
                              </span>
                            )}
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                              {formula.metricType === "deals" ? "FullPaid Deals" : "FullPaid Revenue"}
                            </span>
                          </div>
                          {formula.description && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{formula.description}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(formula)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition"
                            title="Edit Plan"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFormula(formula._id, formula.name)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                            title="Delete Plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Base Numbers */}
                      <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Base Monthly Salary
                          </span>
                          <span className="text-base font-black text-slate-900 mt-0.5 block">
                            {formatINR(formula.baseSalary)}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            FullPaid Monthly Target
                          </span>
                          <span className="text-base font-black text-indigo-600 mt-0.5 block">
                            {formula.metricType === "deals"
                              ? `${formula.baseTarget} FullPaid Deals`
                              : formatINR(formula.baseTarget)}
                          </span>
                        </div>
                      </div>

                      {/* Payout Rule */}
                      <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-900">
                        <span className="font-bold block">Calculation Logic:</span>
                        <span>
                          {formula.payoutModel === "guaranteed_base"
                            ? "Guaranteed 100% Base Salary; target tracks performance."
                            : "Full Base Salary upon reaching 100% of target (calculated pro-rata if below target)."}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-700">
                          {assignedCount} {assignedCount === 1 ? "Specialist Assigned" : "Specialists Assigned"}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenAssignModal(formula)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Assign Specialists</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SPECIALIST ASSIGNMENT MATRIX */}
      {/* ========================================================= */}
      {activeTab === "assign" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Specialist Plan Assignment Matrix</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Map each sales specialist to their specific monthly salary and target plan
              </p>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search specialist name or email..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="all">All Teams</option>
                {uniqueTeams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Sales Specialist</th>
                  <th className="py-3.5 px-4">Team</th>
                  <th className="py-3.5 px-4">Designation</th>
                  <th className="py-3.5 px-4">Assigned Plan</th>
                  <th className="py-3.5 px-4">Base Salary</th>
                  <th className="py-3.5 px-4">FullPaid Target</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeamMembers.map((member) => {
                  let assignedFormula = null;
                  let memberOverride = null;
                  for (const f of formulas) {
                    const match = (f.assignedMembers || []).find(
                      (m) =>
                        (m.email && m.email.toLowerCase() === member.email?.toLowerCase()) ||
                        String(m.memberId) === String(member._id)
                    );
                    if (match) {
                      assignedFormula = f;
                      memberOverride = match;
                      break;
                    }
                  }

                  const effectiveBase = memberOverride?.customBaseSalary || assignedFormula?.baseSalary || "N/A";
                  const effectiveTarget = memberOverride?.customBaseTarget || assignedFormula?.baseTarget || "N/A";

                  return (
                    <tr key={member._id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{member.fullname}</div>
                        <div className="text-[11px] text-slate-400">{member.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
                          {member.team || (member.teams && member.teams[0]) || "General"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {member.designation || "Sales Specialist"}
                      </td>
                      <td className="py-3.5 px-4">
                        {assignedFormula ? (
                          <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                            {assignedFormula.name}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Default Plan</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {effectiveBase !== "N/A" ? formatINR(effectiveBase) : "—"}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-indigo-600">
                        {effectiveTarget !== "N/A"
                          ? assignedFormula?.metricType === "deals"
                            ? `${effectiveTarget} Deals`
                            : formatINR(effectiveTarget)
                          : "—"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSendTargetSalaryMail(member._id)}
                            className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-bold px-2 py-1 rounded-lg hover:bg-indigo-50 border border-indigo-200 transition"
                            title={`Send Target & Salary mail to ${member.fullname}`}
                          >
                            <Mail size={12} />
                            <span>Mail</span>
                          </button>

                          {assignedFormula ? (
                            <button
                              onClick={() => handleUnassignMember(assignedFormula._id, member.email)}
                              className="text-xs text-rose-600 hover:text-rose-800 font-bold px-2 py-1 rounded-lg hover:bg-rose-50 transition"
                            >
                              Unassign
                            </button>
                          ) : (
                            <select
                              onChange={(e) => {
                                if (!e.target.value) return;
                                const formula = formulas.find((f) => f._id === e.target.value);
                                if (formula) {
                                  setSelectedFormulaForAssign(formula);
                                  setSelectedMemberIds([String(member._id || member.email)]);
                                  setIsAssignModalOpen(true);
                                }
                              }}
                              className="text-xs bg-indigo-50 text-indigo-700 font-bold py-1 px-2 rounded-lg border border-indigo-200 focus:outline-none cursor-pointer"
                              defaultValue=""
                            >
                              <option value="" disabled>
                                + Assign Plan
                              </option>
                              {formulas.map((f) => (
                                <option key={f._id} value={f._id}>
                                  {f.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: FULLPAID MONTHLY REPORT */}
      {/* ========================================================= */}
      {activeTab === "payouts" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Monthly FullPaid Salary Report</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculated strictly based on candidates in <strong>FullPaid</strong> status for the selected billing cycle
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setMailTargetMemberId("all");
                  setIsMailModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                <Mail size={13} />
                <span>Email Target & Salary Details</span>
              </button>

              <span className="text-xs font-bold text-slate-500">Billing Month:</span>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              />
            </div>
          </div>

          {loadingPayouts ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-slate-500 font-bold text-xs">Computing FullPaid revenue & salary payouts...</p>
            </div>
          ) : payoutsReport.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No sales activity found for {selectedMonth}.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Sales Specialist</th>
                    <th className="py-3 px-4">Plan</th>
                    <th className="py-3 px-4">Target</th>
                    <th className="py-3 px-4">FullPaid Revenue</th>
                    <th className="py-3 px-4">FullPaid Candidates</th>
                    <th className="py-3 px-4">% Achieved</th>
                    <th className="py-3 px-4">Target Status</th>
                    <th className="py-3 px-4 font-black text-slate-900">Calculated Salary Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payoutsReport.map((item) => {
                    const payout = item.payout;
                    const isTargetMet = payout?.targetAchieved;
                    const pct = payout?.achievementPercent || 0;

                    return (
                      <tr key={item.memberId} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{item.fullname}</div>
                          <div className="text-[11px] text-slate-400">
                            {item.team} • {item.designation}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">
                          {item.assignedFormulaName}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-700">
                          {payout ? formatINR(payout.target) : "—"}
                        </td>
                        <td className="py-3.5 px-4 font-black text-emerald-600">
                          {payout ? formatINR(payout.achievement) : formatINR(item.performance.fullPaidRevenue)}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">
                          {item.performance.fullPaidDeals} Students
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              isTargetMet
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {pct}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[11px] font-bold ${isTargetMet ? "text-emerald-600" : "text-amber-600"}`}>
                            {isTargetMet ? "100% Met ✓" : "In Progress"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                          {payout ? formatINR(payout.earnedSalary) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: PLAN CREATOR & EDITOR */}
      {/* ========================================================= */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[1100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {editingFormulaId ? "Edit Salary & Target Plan" : "Create New Salary & Target Plan"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure base salary and monthly FullPaid targets
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitFormula} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Plan Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Standard Sales Specialist Plan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Metric Type</label>
                  <select
                    value={formData.metricType}
                    onChange={(e) => setFormData({ ...formData, metricType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    <option value="revenue">FullPaid Revenue (INR ₹)</option>
                    <option value="deals">FullPaid Closed Deals Count</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Monthly target and salary rule based strictly on fullPaid enrollments"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              {/* Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100">
                <div>
                  <label className="block text-xs font-bold text-indigo-900 mb-1">
                    Monthly Base Salary (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.baseSalary}
                    onChange={(e) => setFormData({ ...formData, baseSalary: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-900 mb-1">
                    Monthly FullPaid Target *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.baseTarget}
                    onChange={(e) => setFormData({ ...formData, baseTarget: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                  />
                  <span className="text-[10px] text-indigo-600 mt-1 block">
                    {formData.metricType === "deals" ? "Closed deals target" : formatINR(formData.baseTarget)}
                  </span>
                </div>
              </div>

              {/* Payout Rule */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Salary Payout Calculation Rule</label>
                <select
                  value={formData.payoutModel}
                  onChange={(e) => setFormData({ ...formData, payoutModel: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                >
                  <option value="target_prorata">
                    Target Pro-Rata: Full Base Salary on 100% Target Met (pro-rated if below target)
                  </option>
                  <option value="guaranteed_base">
                    Guaranteed Base: 100% Fixed Base Salary with Target Milestone Tracker
                  </option>
                </select>
              </div>

              {/* SIMULATOR (SHOWS TILL TARGET, NOT MORE THAN THAT) */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                      Live Simulator (Up to Target: {formatINR(formData.baseTarget)})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Shows till target only</span>
                </div>

                <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-xl">
                  <span className="text-xs font-semibold text-slate-300 flex-shrink-0">Achievement:</span>
                  {/* Slider strictly up to formData.baseTarget, not more than that */}
                  <input
                    type="range"
                    min="0"
                    max={formData.baseTarget || 200000}
                    step={formData.metricType === "deals" ? 1 : 2500}
                    value={Math.min(testAchievement, formData.baseTarget || 200000)}
                    onChange={(e) => setTestAchievement(Number(e.target.value))}
                    className="flex-1 accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-xs font-black text-indigo-400 w-24 text-right">
                    {formatINR(Math.min(testAchievement, formData.baseTarget || 200000))}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Base Salary</span>
                    <span className="text-sm font-black text-white mt-0.5 block">
                      {formatINR(simulatedSalary.base)}
                    </span>
                  </div>

                  <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Met %</span>
                    <span className="text-sm font-black text-emerald-400 mt-0.5 block">
                      {simulatedSalary.pct}%
                    </span>
                  </div>

                  <div className="bg-indigo-950/80 p-2.5 rounded-xl border border-indigo-700/50">
                    <span className="text-[10px] text-indigo-300 uppercase font-bold block">Earned Salary</span>
                    <span className="text-sm font-black text-indigo-300 mt-0.5 block">
                      {formatINR(simulatedSalary.earned)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Default toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
                <label htmlFor="isDefault" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Set as Default Plan for Sales Specialists
                </label>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/20 transition"
                >
                  {editingFormulaId ? "Save Changes" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ASSIGN SPECIALISTS MODAL */}
      {/* ========================================================= */}
      {isAssignModalOpen && selectedFormulaForAssign && (
        <div className="fixed inset-0 z-[1100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Assign Specialists to: <span className="text-indigo-600">{selectedFormulaForAssign.name}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Base Salary: {formatINR(selectedFormulaForAssign.baseSalary)} • FullPaid Target:{" "}
                  {selectedFormulaForAssign.metricType === "deals"
                    ? `${selectedFormulaForAssign.baseTarget} Deals`
                    : formatINR(selectedFormulaForAssign.baseTarget)}
                </p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl transition"
              >
                ✕
              </button>
            </div>

            {/* Quick Team Select */}
            <div className="p-4 border-b border-slate-100 bg-white flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Select Entire Team:
              </span>
              {uniqueTeams.map((team) => (
                <button
                  key={team}
                  type="button"
                  onClick={() => handleSelectAllTeam(team)}
                  className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 font-bold rounded-lg transition"
                >
                  + {team}
                </button>
              ))}
            </div>

            {/* Members List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {teamMembers.map((member) => {
                const idKey = String(member._id || member.email);
                const isSelected = selectedMemberIds.includes(idKey);

                return (
                  <div
                    key={member._id}
                    onClick={() => handleToggleMemberSelection(member)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50/60 border-indigo-300 shadow-sm"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900">{member.fullname}</div>
                        <div className="text-[11px] text-slate-400">
                          {member.email} • {member.team || (member.teams && member.teams[0]) || "General"}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {member.designation || "Sales Specialist"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                {selectedMemberIds.length} specialist(s) selected
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssignments}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-md transition"
                >
                  Confirm & Save Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: EMAIL TARGET & SALARY DETAILS */}
      {/* ========================================================= */}
      {isMailModalOpen && (
        <div className="fixed inset-0 z-[1200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Email Target & Base Salary Details</h3>
                  <p className="text-xs text-slate-400">Send personalized targets to specialist registered emails</p>
                </div>
              </div>
              <button
                onClick={() => setIsMailModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Recipients
                </label>
                <select
                  value={mailTargetMemberId}
                  onChange={(e) => setMailTargetMemberId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="all">
                    All Active Sales Specialists ({teamMembers.length} members)
                  </option>
                  {teamMembers.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.fullname} — {m.email} ({m.team || "Sales"})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Target Billing Month
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

              {/* Email Content Preview Info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  What the sales specialist will receive:
                </p>
                <ul className="list-disc ml-5 text-slate-600 space-y-1 text-[11px]">
                  <li>Their official <strong>Monthly Base Salary (₹)</strong></li>
                  <li>Their assigned <strong>Monthly Target (₹)</strong> based on FullPaid candidate revenue</li>
                  <li>Their <strong>Assigned Plan Name</strong> & Department</li>
                  <li>Direct button link to open their live Sales Calculator Dashboard</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMailModalOpen(false)}
                  disabled={sendingMail}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSendTargetSalaryMail()}
                  disabled={sendingMail}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-md transition disabled:opacity-50 flex items-center gap-2"
                >
                  {sendingMail ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Mails...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>
                        {mailTargetMemberId === "all"
                          ? `Send to All (${teamMembers.length})`
                          : "Send Email"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculatorManagement;
