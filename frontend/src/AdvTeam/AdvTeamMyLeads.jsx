import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API from "../API";
import { 
  Eye, List, MousePointerClick, Users, RefreshCcw, 
  Search, Calendar, Filter, X, ChevronLeft, ChevronRight, CheckCircle2 
} from "lucide-react";

const STAGES_AND_DISPOSITIONS = {
    "Fresh Lead": ["New Lead", "Invalid Lead"],
    "Attempting Contact": ["RNR", "Callback Requested", "No Response (Multi-touch)"],
    "First Call Connected": ["In Conversation", "Demo Booked"],
    "Demo Conducted": ["Decision Pending", "Negotiation Review", "Expected Payment Date"],
    "Closed Won": ["Converted"],
    "Closed Lost": ["Irrelevant Lead", "Not Interested", "Pricing Does Not Match", "No Response"]
};

const AdvTeamMyLeads = () => {
    const [leads, setLeads] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [stageFilter, setStageFilter] = useState("Fresh Lead");
    const [dispositionFilter, setDispositionFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sourceFilter, setSourceFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [outcomeCounts, setOutcomeCounts] = useState({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 25;

    // Assign panel state
    const [showAssignPanel, setShowAssignPanel] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [assignCount, setAssignCount] = useState("");
    const [assigning, setAssigning] = useState(false);

    // Manual Assign State
    const [isManualAssignMode, setIsManualAssignMode] = useState(false);
    const [selectedLeadIds, setSelectedLeadIds] = useState([]);

    // Lead View Modal State
    const [selectedLead, setSelectedLead] = useState(null);
    const [selectedLeadForDetails, setSelectedLeadForDetails] = useState(null);

    const userId = localStorage.getItem("advTeamId");
    const userName = localStorage.getItem("advTeamName");

    const [userProfile, setUserProfile] = useState(null);
    const designation = userProfile?.designation || localStorage.getItem("advTeamDesignation") || "";
    const userTeam = userProfile?.team || localStorage.getItem("advTeamTeam") || "";

    const isLeader = designation.toLowerCase().includes("leader");
    const isSpecialist = designation.toLowerCase().includes("specialist") || designation.toLowerCase().includes("sales") || designation.toLowerCase().includes("inside_sales");
    const isManager = designation.toLowerCase().includes("manager") || userName?.toLowerCase().includes("sumeetha");
    const apiRole = isSpecialist ? "SR Inside Sales Specialist" : isLeader ? "ADV Leader" : "ADV Manager";
    const canAssign = isManager;

    const assignTargetLabel = isManager ? "Leader" : "SR Sales Specialist";

    const fetchMyLeads = async (page = 1, overrideStage = stageFilter, overrideStatus = statusFilter) => {
        setLoading(true);
        try {
            const params = { 
                role: apiRole, 
                userId, 
                page, 
                limit, 
                strictlyOwned: true, 
                source: sourceFilter,
                stage: overrideStage,
                disposition: dispositionFilter,
                status: overrideStatus
            };
            const res = await axios.get(`${API}/api/adv-leads/get-adv-leads`, { params });
            if (res.data && res.data.leads) {
                setLeads(res.data.leads);
                setTotalPages(res.data.totalPages);
                setTotalCount(res.data.totalCount);
                setCurrentPage(res.data.currentPage);
            } else {
                setLeads([]);
                setTotalCount(0);
                setTotalPages(1);
            }
        } catch (err) {
            toast.error("Failed to fetch leads");
            setLeads([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchOutcomeCounts = async () => {
        try {
            const res = await axios.get(`${API}/api/adv-leads/get-outcome-counts`, {
                params: { 
                    role: apiRole, 
                    userId, 
                    strictlyOwned: true,
                    source: sourceFilter
                }
            });
            setOutcomeCounts(res.data);
        } catch (err) {
            console.error("Failed to fetch counts", err);
        }
    };

    const fetchTeamMembers = async () => {
        try {
            const res = await axios.get(`${API}/getadvteam`);
            setTeamMembers(res.data);
        } catch (err) {
            console.error("Failed to fetch team members", err);
        }
    };

    const fetchUserProfile = async () => {
        if (!userId) return;
        try {
            const res = await axios.get(`${API}/getadvteam`, { params: { advTeamId: userId } });
            if (res.data) {
                setUserProfile(res.data);
                localStorage.setItem("advTeamDesignation", res.data.designation || "");
                localStorage.setItem("advTeamTeam", res.data.team || "");
            }
        } catch (err) {
            console.error("Failed to fetch user profile", err);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserProfile();
            fetchTeamMembers();
            fetchOutcomeCounts();
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchMyLeads(currentPage, stageFilter, statusFilter);
            fetchOutcomeCounts();
        }
    }, [currentPage, stageFilter, dispositionFilter, statusFilter, sourceFilter, userId]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchMyLeads(newPage, stageFilter, statusFilter);
        }
    };

    const handleBulkAssign = async () => {
        if (!selectedMember) { toast.error(`Please select a ${assignTargetLabel}`); return; }
        const num = parseInt(assignCount);
        if (!num || num < 1) { toast.error("Please enter a valid number"); return; }

        const availableLeadsCount = getAvailableLeadsCount();
        if (num > availableLeadsCount) { 
            toast.error(`Only ${availableLeadsCount} assignable leads available.`); 
            return; 
        }

        setAssigning(true);
        try {
            let res;
            if (isManager) {
                res = await axios.post(`${API}/api/adv-leads/bulk-assign-to-leader`, {
                    managerId: userId,
                    leaderId: selectedMember._id,
                    leaderName: selectedMember.fullname,
                    count: num,
                    assignerName: userName
                });
            } else {
                res = await axios.post(`${API}/api/adv-leads/bulk-assign-to-specialist`, {
                    leaderId: userId,
                    specialistId: selectedMember._id,
                    specialistName: selectedMember.fullname,
                    count: num,
                    assignerName: userName
                });
            }
            toast.success(res.data.message);
            setShowAssignPanel(false);
            setSelectedMember(null);
            setAssignCount("");
            fetchMyLeads(currentPage);
        } catch (err) {
            toast.error(err.response?.data?.message || "Assignment failed");
        } finally {
            setAssigning(false);
        }
    };

    const handleManualAssign = async () => {
        if (selectedLeadIds.length === 0) {
            toast.error("Please select at least one lead");
            return;
        }
        if (!selectedMember) {
            toast.error(`Please select a ${assignTargetLabel} below`);
            return;
        }

        setAssigning(true);
        try {
            const res = await axios.post(`${API}/api/adv-leads/manual-bulk-assign`, {
                leadIds: selectedLeadIds,
                assigneeId: selectedMember._id,
                assigneeName: selectedMember.fullname,
                assigneeRole: selectedMember.designation,
                assignerName: userName
            });
            toast.success(res.data.message);
            setIsManualAssignMode(false);
            setSelectedLeadIds([]);
            setSelectedMember(null);
            fetchMyLeads(currentPage);
        } catch (err) {
            toast.error(err.response?.data?.message || "Manual assignment failed");
        } finally {
            setAssigning(false);
        }
    };

    const toggleLeadSelection = (leadId) => {
        setSelectedLeadIds(prev =>
            prev.includes(leadId) ? prev.filter(id => id !== leadId) : [...prev, leadId]
        );
    };

    const toggleAllSelection = () => {
        if (selectedLeadIds.length === leads.length) {
            setSelectedLeadIds([]);
        } else {
            setSelectedLeadIds(leads.map(l => l._id));
        }
    };

    const assignTargets = (() => {
        const members = teamMembers;
        if (isManager) {
            return members.filter(m => {
                const desig = (m.designation || "").toUpperCase();
                return (desig.includes("LEADER") || desig.includes("SPECIALIST")) && m.Access === true && m.status !== "Inactive";
            });
        } else {
            return members.filter(m => {
                const desig = (m.designation || "").toUpperCase();
                const sameTeam = !userTeam || (m.team || "").trim().toUpperCase() === userTeam.trim().toUpperCase();
                return desig.includes("SPECIALIST") && sameTeam && m.Access === true && m.status !== "Inactive";
            });
        }
    })();

    const getAvailableLeadsCount = () => {
        return (stageFilter || statusFilter) 
        ? totalCount 
        : leads.filter(l => {
            if (isManager) {
                return ["fresh", "assigned_to_team", "assigned_to_manager"].includes(l.status);
            } else if (isLeader) {
                return l.status === "assigned_to_leader";
            }
            return false;
        }).length;
    };
    
    const availableLeadsCount = getAvailableLeadsCount();

    const filteredLeads = leads.filter(l => {
        const matchSearch = (l.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (l.phone_number || "").includes(searchTerm);
        let matchDate = true;
        if (dateFilter && l.created_at) {
          const leadDate = new Date(l.created_at).toISOString().split('T')[0];
          matchDate = leadDate === dateFilter;
        }
        return matchSearch && matchDate;
    });

    const getStatusStyle = (status) => {
        const styles = {
            fresh: 'bg-blue-50 text-blue-700 border-blue-200',
            assigned_to_manager: 'bg-amber-50 text-amber-700 border-amber-200',
            assigned_to_leader: 'bg-purple-50 text-purple-700 border-purple-200',
            assigned_to_specialist: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            in_followup: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            converted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            closed: 'bg-slate-50 text-slate-700 border-slate-200',
        };
        return styles[status] || styles.closed;
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10">
            <Toaster position="top-center" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">My Leads</h1>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        {userName} <span className="mx-1 text-slate-300">|</span> <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{designation}</span>
                    </div>
                </div>

                {canAssign && (
                    <div className="flex flex-wrap gap-3">
                        {!isManualAssignMode ? (
                            <>
                                <button 
                                    onClick={() => { setIsManualAssignMode(true); setSelectedLeadIds([]); }} 
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl text-sm font-bold transition-all shadow-sm"
                                >
                                    <MousePointerClick size={16} /> Manual Assign
                                </button>
                                <button 
                                    onClick={() => setShowAssignPanel(true)} 
                                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-indigo-200"
                                >
                                    <Users size={16} /> Bulk Assign 
                                    {availableLeadsCount > 0 && (
                                        <span className="bg-white text-indigo-600 px-2 py-0.5 rounded-full text-xs font-black ml-1">
                                            {availableLeadsCount}
                                        </span>
                                    )}
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={() => { setIsManualAssignMode(false); setSelectedLeadIds([]); }} 
                                className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl text-sm font-bold transition-all shadow-sm"
                            >
                                <X size={16} /> Cancel Manual Mode
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Quick Stats & Assign Mode Bar */}
            <div className="flex flex-col xl:flex-row gap-4 mb-8">
                <div className="flex gap-4">
                    <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center min-w-[140px]">
                        <span className="text-3xl font-black text-slate-800 tracking-tight">{leads.length}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">This Page</span>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-4 rounded-2xl shadow-md shadow-indigo-200 flex flex-col justify-center min-w-[140px]">
                        <span className="text-3xl font-black text-white tracking-tight">{totalCount}</span>
                        <span className="text-xs font-bold text-indigo-100 uppercase tracking-wide mt-1">Total Leads</span>
                    </div>
                </div>

                {isManualAssignMode && (
                    <div className="flex-1 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm">
                        <div className="flex-1 flex items-center gap-4">
                            <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-amber-800">{selectedLeadIds.length} Selected</h3>
                                <p className="text-xs font-semibold text-amber-600/80 uppercase tracking-wide">Manual Selection Mode</p>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <select 
                                value={selectedMember?._id || ""} 
                                onChange={e => {
                                    const m = assignTargets.find(m => m._id === e.target.value);
                                    setSelectedMember(m || null);
                                }} 
                                className="bg-white border border-amber-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500 min-w-[200px]"
                            >
                                <option value="">Assign to {assignTargetLabel}...</option>
                                {assignTargets.map(m => <option key={m._id} value={m._id}>{m.fullname}</option>)}
                            </select>
                            <button 
                                onClick={handleManualAssign} 
                                disabled={assigning || selectedLeadIds.length === 0 || !selectedMember} 
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                                    (selectedLeadIds.length === 0 || !selectedMember) 
                                    ? 'bg-amber-200/50 text-amber-400 cursor-not-allowed' 
                                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-200'
                                }`}
                            >
                                {assigning ? "Working..." : "Confirm Assign"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Smart Filters */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        placeholder="Search name or phone..." 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>
                
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="date" 
                        value={dateFilter} 
                        onChange={e => setDateFilter(e.target.value)} 
                        className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        title="Filter by Date" 
                    />
                </div>

                <div className="relative min-w-[200px]">
                    <select
                        value={stageFilter}
                        onChange={e => { setStageFilter(e.target.value); setStatusFilter(""); setCurrentPage(1); }}
                        className={`w-full appearance-none pl-4 pr-10 py-2.5 border rounded-xl text-sm font-semibold outline-none transition-all ${
                            stageFilter ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                    >
                        <option value="">📊 All Stages</option>
                        <option value="Fresh Lead">🆕 Fresh Lead</option>
                        <option value="Attempting Contact">📞 Attempting Contact ({outcomeCounts["Attempting Contact"] || 0})</option>
                        <option value="First Call Connected">✅ First Call Connected ({outcomeCounts["First Call Connected"] || 0})</option>
                        <option value="Demo Conducted">🎯 Demo Conducted ({outcomeCounts["Demo Conducted"] || 0})</option>
                        <option value="Closed Won">🏆 Closed Won ({outcomeCounts["Closed Won"] || 0})</option>
                        <option value="Closed Lost">❌ Closed Lost ({outcomeCounts["Closed Lost"] || 0})</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>

                {stageFilter && STAGES_AND_DISPOSITIONS[stageFilter] && (
                    <div className="relative min-w-[180px]">
                        <select
                            value={dispositionFilter}
                            onChange={e => { setDispositionFilter(e.target.value); setCurrentPage(1); }}
                            className={`w-full appearance-none pl-4 pr-10 py-2.5 border rounded-xl text-sm font-semibold outline-none transition-all ${
                                dispositionFilter ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                        >
                            <option value="">🎯 All Dispositions</option>
                            {STAGES_AND_DISPOSITIONS[stageFilter].map(disp => (
                                <option key={disp} value={disp}>{disp}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="relative min-w-[180px]">
                    <select
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setStageFilter(""); setCurrentPage(1); }}
                        className={`w-full appearance-none pl-4 pr-10 py-2.5 border rounded-xl text-sm font-semibold outline-none transition-all ${
                            statusFilter ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                    >
                        <option value="">🔀 Assignment Status</option>
                        <option value="assigned_to_manager">Held by Manager</option>
                        <option value="assigned_to_leader">Sent to Leader</option>
                        <option value="assigned_to_specialist">Sent to Specialist</option>
                        <option value="in_followup">In Follow-up</option>
                        <option value="converted">Converted</option>
                    </select>
                </div>

                <button 
                    onClick={() => fetchMyLeads(1, stageFilter, statusFilter)} 
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
                    title="Refresh List"
                >
                    <RefreshCcw size={18} />
                </button>
            </div>

            {/* Old CRM Filter (Managers Only) */}
            {(userId === "69d4a881cb9305f0d5ecbeb2" || (userName && userName.toLowerCase().includes("sumeetha"))) && (
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-3 border-r border-slate-200">
                        <span className="bg-slate-800 text-white text-[10px] font-black px-2 py-1 rounded tracking-wider">LEGACY</span>
                        <span className="text-sm font-bold text-slate-600 mr-2">Old CRM Status:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["Fresh", "Interested", "Follow Up", "Callback", "No Answer", "Not Interested", "Junk", "Converted", "Unused"].map((status) => {
                            const isActive = statusFilter === status && sourceFilter === "Old CRM";
                            return (
                                <button
                                    key={status}
                                    onClick={() => { setStatusFilter(status); setSourceFilter("Old CRM"); setCurrentPage(1); }}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                        isActive 
                                        ? 'bg-slate-800 border-slate-800 text-white shadow-sm' 
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    {status}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => { setSourceFilter(""); setStatusFilter(""); setCurrentPage(1); }}
                            className="px-4 py-1.5 rounded-lg text-xs font-bold border border-rose-200 text-rose-600 hover:bg-rose-50 transition-all ml-2"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}

            {/* Main Data Table */}
            {loading ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-20 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-medium">Fetching your pipeline...</p>
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <Search className="text-slate-300" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-1">No leads found</h3>
                    <p className="text-slate-500 text-sm">We couldn't find any leads matching your current filters.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    {isManualAssignMode && (
                                        <th className="px-6 py-4 w-12">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedLeadIds.length === leads.length && leads.length > 0} 
                                                onChange={toggleAllSelection}
                                                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                                            />
                                        </th>
                                    )}
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-16">#</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Lead Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Source/Domain</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned To</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Dates</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Score</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredLeads.map((lead, idx) => {
                                    const isSelected = selectedLeadIds.includes(lead._id);
                                    return (
                                        <tr key={lead._id} className={`transition-colors ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'}`}>
                                            {isManualAssignMode && (
                                                <td className="px-6 py-4">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={isSelected} 
                                                        onChange={() => toggleLeadSelection(lead._id)}
                                                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                                                    />
                                                </td>
                                            )}
                                            <td className="px-6 py-4 text-xs font-medium text-slate-400">
                                                {(currentPage - 1) * limit + idx + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-800 mb-0.5">{lead.full_name}</span>
                                                    <span className="text-xs font-medium text-slate-500">{lead.phone_number}</span>
                                                    <span className="text-xs text-slate-400">{lead.email || '—'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1.5 items-start">
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wide">
                                                        {lead.source || 'Direct'}
                                                    </span>
                                                    <span className="text-xs font-semibold text-slate-600">{lead.opted_domain || '—'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                                                        {lead.owner_name ? lead.owner_name.charAt(0).toUpperCase() : 'U'}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-slate-700">{lead.owner_name || lead.current_owner_id?.name || 'Unassigned'}</span>
                                                        <span className="text-xs text-indigo-600 font-medium">
                                                            {lead.team_name || lead.team_id?.team_name || teamMembers.find(m => m.fullname === (lead.owner_name || lead.current_owner_id?.name))?.team || ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                                        <span className="text-[10px] uppercase font-bold text-slate-400 w-12">Created</span>
                                                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-GB') : '—'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                                        <span className="text-[10px] uppercase font-bold text-indigo-400 w-12">Assigned</span>
                                                        {lead.assigned_at ? new Date(lead.assigned_at).toLocaleDateString('en-GB') : '—'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                                    (lead.score || 0) > 15 
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                                                    : 'bg-slate-50 text-slate-500 border-slate-200'
                                                }`}>
                                                    {lead.score || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                                <button 
                                                    onClick={() => setSelectedLeadForDetails(lead)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition-all shadow-sm"
                                                >
                                                    <List size={14} /> Full Intel
                                                </button>
                                                <button 
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 text-indigo-600 rounded-lg text-xs font-bold transition-all shadow-sm"
                                                >
                                                    <Eye size={14} /> View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Bar */}
                    <div className="bg-slate-50 border-t border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm font-medium text-slate-500">
                            Showing <span className="text-slate-800 font-bold">{(currentPage - 1) * limit + 1}</span> to <span className="text-slate-800 font-bold">{Math.min(currentPage * limit, totalCount)}</span> of <span className="text-indigo-600 font-black">{totalCount}</span> leads
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button 
                                disabled={currentPage === 1} 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-transparent transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => {
                                const p = i + 1;
                                if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                                    return (
                                        <button 
                                            key={p} 
                                            onClick={() => handlePageChange(p)} 
                                            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                                                currentPage === p 
                                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                                : 'text-slate-600 hover:bg-white border border-transparent hover:border-slate-200'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    );
                                } else if (p === currentPage - 2 || p === currentPage + 2) {
                                    return <span key={p} className="text-slate-400 px-1">...</span>;
                                }
                                return null;
                            })}

                            <button 
                                disabled={currentPage === totalPages} 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-transparent transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Assign Panel Modal ── */}
            {showAssignPanel && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-black text-slate-800">Bulk Assignment</h2>
                            <button onClick={() => { setShowAssignPanel(false); setSelectedMember(null); setAssignCount(""); }} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center mb-6">
                                <span className="block text-4xl font-black text-indigo-600 mb-1">{availableLeadsCount}</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Available Assignable Leads</span>
                            </div>

                            <div className="space-y-5 mb-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">1. Select Destination ({assignTargetLabel})</label>
                                    <select 
                                        value={selectedMember?._id || ""} 
                                        onChange={e => {
                                            const m = assignTargets.find(m => m._id === e.target.value);
                                            setSelectedMember(m || null);
                                        }} 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    >
                                        <option value="">-- Choose {assignTargetLabel} --</option>
                                        {assignTargets.map(m => <option key={m._id} value={m._id}>{m.fullname} ({m.team})</option>)}
                                    </select>
                                </div>

                                {selectedMember && (
                                    <div className="animate-[fadeIn_0.3s_ease-out]">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">
                                            2. How many to send to <span className="text-indigo-600">{selectedMember.fullname}</span>?
                                        </label>
                                        <div className="flex gap-3">
                                            <input 
                                                type="number" 
                                                min="1" 
                                                max={availableLeadsCount} 
                                                value={assignCount} 
                                                onChange={e => setAssignCount(e.target.value)} 
                                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                                autoFocus 
                                            />
                                            <button 
                                                onClick={() => setAssignCount(String(availableLeadsCount))} 
                                                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-bold transition-colors"
                                            >
                                                Max
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={handleBulkAssign} 
                                disabled={assigning || !selectedMember || !assignCount} 
                                className={`w-full py-4 rounded-xl text-sm font-bold transition-all shadow-sm ${
                                    (!selectedMember || !assignCount) 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                                }`}
                            >
                                {assigning ? "Executing Assignment..." : `Confirm Transfer of ${assignCount || "?"} Leads`}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Lead Details Modal ── */}
            {(selectedLead || selectedLeadForDetails) && (
                <div 
                    onClick={() => { setSelectedLead(null); setSelectedLeadForDetails(null); }}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 sm:p-6"
                >
                    <div 
                        onClick={e => e.stopPropagation()}
                        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-[fadeIn_0.2s_ease-out]"
                    >
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-black tracking-tight text-slate-800">
                                {selectedLeadForDetails ? "📝 Full Lead Intelligence" : "👁️ Lead Quick View"}
                            </h2>
                            <button onClick={() => { setSelectedLead(null); setSelectedLeadForDetails(null); }} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 mb-6 flex flex-wrap gap-6 items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-200">
                                        {(selectedLeadForDetails || selectedLead)?.full_name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 mb-1">{(selectedLeadForDetails || selectedLead)?.full_name}</h3>
                                        <div className="text-sm font-medium text-slate-500">{(selectedLeadForDetails || selectedLead)?.email || 'No email provided'}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Lead Score</div>
                                        <div className="text-xl font-black text-emerald-600">{(selectedLeadForDetails || selectedLead)?.score || 0}</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Contact & Core Info</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                {[
                                    { label: 'Phone Number', value: (selectedLeadForDetails || selectedLead)?.phone_number },
                                    { label: 'Target Domain', value: (selectedLeadForDetails || selectedLead)?.opted_domain },
                                    { label: 'Source Origin', value: (selectedLeadForDetails || selectedLead)?.source },
                                    { label: 'Pipeline Stage', value: (selectedLeadForDetails || selectedLead)?.stage },
                                    { label: 'Disposition', value: (selectedLeadForDetails || selectedLead)?.last_outcome },
                                    { label: 'Work Exp.', value: (selectedLeadForDetails || selectedLead)?.work_experience },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">{item.label}</div>
                                        <div className="text-sm font-bold text-slate-800">{item.value || '—'}</div>
                                    </div>
                                ))}
                            </div>

                            {(selectedLeadForDetails || selectedLead)?.extra_fields && Object.keys((selectedLeadForDetails || selectedLead).extra_fields).length > 0 && (
                                <>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Meta Ads & Custom Data</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        {Object.entries((selectedLeadForDetails || selectedLead).extra_fields).map(([key, val]) => (
                                            <div key={key}>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">{key.replace(/_/g, ' ')}</div>
                                                <div className="text-sm font-semibold text-slate-800">{String(val) || '—'}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">System Architecture</h3>
                            <div className="bg-slate-900 rounded-2xl p-6 text-slate-300">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                    {[
                                        { label: 'Assigned Custodian', value: (selectedLeadForDetails || selectedLead)?.owner_name || (selectedLeadForDetails || selectedLead)?.current_owner_id?.name },
                                        { label: 'Operating Team', value: (selectedLeadForDetails || selectedLead)?.team_name || (selectedLeadForDetails || selectedLead)?.team_id?.team_name },
                                        { label: 'Record ID', value: (selectedLeadForDetails || selectedLead)?._id },
                                        { label: 'Creation Timestamp', value: (selectedLeadForDetails || selectedLead)?.created_at ? new Date((selectedLeadForDetails || selectedLead).created_at).toLocaleString() : '—' },
                                    ].map((item, idx) => (
                                        <div key={idx}>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                                            <div className="text-sm font-medium text-white break-all">{item.value || '—'}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end">
                            <button 
                                onClick={() => { setSelectedLead(null); setSelectedLeadForDetails(null); }} 
                                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-slate-200"
                            >
                                Dismiss Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvTeamMyLeads;
