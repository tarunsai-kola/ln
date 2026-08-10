import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API from "../API";
import { 
    Users, Phone, Calendar, Clock, ChevronRight, Activity, 
    RefreshCcw, Eye, FileText, PhoneCall, X, UserSearch, History 
} from "lucide-react";

const CALL_OUTCOMES = [
    { value: "interested", label: "✅ Interested", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { value: "not_interested", label: "❌ Not Interested", color: "text-rose-700 bg-rose-50 border-rose-200" },
    { value: "no_answer", label: "📵 No Answer", color: "text-amber-700 bg-amber-50 border-amber-200" },
    { value: "callback_requested", label: "🔄 Callback Requested", color: "text-blue-700 bg-blue-50 border-blue-200" },
    { value: "converted", label: "🏆 Converted", color: "text-purple-700 bg-purple-50 border-purple-200" },
    { value: "junk", label: "🗑️ Junk Leads", color: "text-slate-700 bg-slate-100 border-slate-300" },
    { value: "follow_up", label: "📅 Follow Up", color: "text-pink-700 bg-pink-50 border-pink-200" },
    { value: "qualified", label: "🌟 Qualified", color: "text-orange-700 bg-orange-50 border-orange-200" },
];

const AdvTeamRecord = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 25;

    // Navigation State
    const [view, setView] = useState("specialists"); // "specialists" | "leads" | "history"
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [selectedLead, setSelectedLead] = useState(null);
    const [selectedLeadForDetails, setSelectedLeadForDetails] = useState(null);

    const userId = localStorage.getItem("advTeamId");
    const userName = localStorage.getItem("advTeamName");
    const [userDesignation, setUserDesignation] = useState(localStorage.getItem("advTeamDesignation") || "");

    const fetchRecords = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/adv-leads/get-adv-record`, {
                params: { role: userDesignation, userId, page, limit }
            });
            if (res.data && res.data.activities) {
                setActivities(res.data.activities);
                setTotalPages(res.data.totalPages);
                setTotalCount(res.data.totalCount);
                setCurrentPage(res.data.currentPage);
            } else {
                setActivities([]);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch records");
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfile = async () => {
        if (!userId) return;
        try {
            const res = await axios.get(`${API}/getadvteam`, { params: { advTeamId: userId } });
            if (res.data && res.data.designation) {
                setUserDesignation(res.data.designation);
                localStorage.setItem("advTeamDesignation", res.data.designation);
                localStorage.setItem("advTeamTeam", res.data.team || "");
            }
        } catch (err) {
            console.error("Failed to fetch user profile", err);
        }
    };

    useEffect(() => {
        if (userId && !userDesignation) {
            fetchUserProfile();
        }
    }, [userId, userDesignation]);

    useEffect(() => {
        if (userId && userDesignation) {
            fetchRecords(currentPage);
        }
    }, [userId, userDesignation, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Grouping Logic
    const groupedData = useMemo(() => {
        const specialists = {};

        activities.forEach(act => {
            const specId = act.specialistId?._id || act.specialistStringId || "unknown";
            const specName = act.specialistName || act.specialistId?.name || "Unknown Specialist";
            const leadId = act.leadId?._id || "unknown_lead";
            const leadName = act.leadId?.full_name || "Unknown Lead";
            const leadPhone = act.leadId?.phone_number || "N/A";

            if (!specialists[specId]) {
                specialists[specId] = {
                    id: specId,
                    name: specName,
                    leads: {},
                    totalActivities: 0,
                    lastActivity: null
                };
            }

            if (!specialists[specId].leads[leadId]) {
                specialists[specId].leads[leadId] = {
                    id: leadId,
                    name: leadName,
                    phone: leadPhone,
                    email: act.leadId?.email || "—",
                    domain: act.leadId?.opted_domain || "General",
                    extra_fields: act.leadId?.extra_fields || {},
                    activities: [],
                    lastUpdated: null
                };
            }

            specialists[specId].leads[leadId].activities.push(act);
            specialists[specId].totalActivities++;

            const actDate = new Date(act.createdAt);
            if (!specialists[specId].lastActivity || actDate > new Date(specialists[specId].lastActivity)) {
                specialists[specId].lastActivity = act.createdAt;
            }
            if (!specialists[specId].leads[leadId].lastUpdated || actDate > new Date(specialists[specId].leads[leadId].lastUpdated)) {
                specialists[specId].leads[leadId].lastUpdated = act.createdAt;
            }
        });

        return Object.values(specialists).sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
    }, [activities]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10">
            <Toaster position="top-center" />

            {/* Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Activity Records</h1>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 flex-wrap">
                        <button 
                            className={`flex items-center gap-1.5 transition-colors ${view === 'specialists' ? 'text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full' : 'hover:text-indigo-600'}`}
                            onClick={() => { setView("specialists"); setSelectedSpecialist(null); setSelectedLead(null); }}
                        >
                            <Users size={16} /> All Teams
                        </button>
                        
                        {selectedSpecialist && (
                            <>
                                <ChevronRight size={14} className="text-slate-300" />
                                <button 
                                    className={`flex items-center gap-1.5 transition-colors ${view === 'leads' ? 'text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full' : 'hover:text-indigo-600'}`}
                                    onClick={() => { setView("leads"); setSelectedLead(null); }}
                                >
                                    <UserSearch size={16} /> {selectedSpecialist.name}
                                </button>
                            </>
                        )}

                        {selectedLead && (
                            <>
                                <ChevronRight size={14} className="text-slate-300" />
                                <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                    <PhoneCall size={16} /> {selectedLead.name}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl shadow-sm text-sm font-bold flex items-center gap-2">
                        <Activity size={16} className="text-indigo-500" />
                        Total Logs: <span className="text-indigo-600">{totalCount}</span>
                    </div>
                    <button
                        onClick={() => fetchRecords(currentPage)}
                        className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-xl shadow-sm text-sm font-bold transition-all flex items-center gap-2"
                    >
                        <RefreshCcw size={16} /> Refresh
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-20 flex flex-col items-center justify-center shadow-sm">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-bold tracking-wide">Analyzing Activity Logs...</p>
                </div>
            ) : activities.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-20 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <History className="text-slate-300 w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">No Records Found</h3>
                    <p className="text-slate-500 font-medium">There is no call activity logged for your team on this page.</p>
                </div>
            ) : (
                <>
                    {/* Level 1: Specialists List */}
                    {view === "specialists" && (
                        <div className="animate-[fadeIn_0.3s_ease-out]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {groupedData.map(spec => (
                                    <div
                                        key={spec.id}
                                        className="group relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                                        onClick={() => { setSelectedSpecialist(spec); setView("leads"); }}
                                    >
                                        <div className="absolute -right-6 -bottom-6 text-slate-50 group-hover:text-indigo-50 transition-colors duration-300">
                                            <Users size={120} strokeWidth={1} />
                                        </div>
                                        
                                        <div className="relative z-10 flex-1">
                                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                                                {spec.name.charAt(0).toUpperCase()}
                                            </div>
                                            <h3 className="text-xl font-black text-slate-800 mb-4">{spec.name}</h3>
                                            
                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                                    <UserSearch size={16} className="text-slate-400" />
                                                    <span className="flex-1">Unique Leads</span>
                                                    <span className="bg-white px-2 py-0.5 rounded-md shadow-sm text-slate-800">{Object.keys(spec.leads).length}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                                    <Phone size={16} className="text-slate-400" />
                                                    <span className="flex-1">Total Calls</span>
                                                    <span className="bg-white px-2 py-0.5 rounded-md shadow-sm text-slate-800">{spec.totalActivities}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-slate-400 pt-4 border-t border-slate-100">
                                            <Clock size={12} /> Last active: {formatDate(spec.lastActivity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination UI */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                                <div className="text-sm font-medium text-slate-500">
                                    Showing <span className="text-slate-800 font-bold">{(currentPage - 1) * limit + 1}</span> to <span className="text-slate-800 font-bold">{Math.min(currentPage * limit, totalCount)}</span> of <span className="text-indigo-600 font-black">{totalCount}</span> logs
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Prev
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => {
                                        const p = i + 1;
                                        if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                                            return (
                                                <button
                                                    key={p}
                                                    onClick={() => handlePageChange(p)}
                                                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                                        currentPage === p 
                                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                                        : 'text-slate-600 hover:bg-slate-50 border border-slate-200'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            );
                                        } else if (p === currentPage - 2 || p === currentPage + 2) {
                                            return <span key={p} className="text-slate-400 font-bold px-2">...</span>;
                                        }
                                        return null;
                                    })}
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Level 2: Leads List for Selected Specialist */}
                    {view === "leads" && selectedSpecialist && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Lead Prospect</th>
                                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Activities</th>
                                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Last Updated</th>
                                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {Object.values(selectedSpecialist.leads).sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)).map(lead => (
                                            <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-bold text-slate-800 text-sm">{lead.name}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-slate-600 text-sm bg-slate-100 px-3 py-1 rounded-lg">{lead.phone}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-black text-sm border border-indigo-100">
                                                        {lead.activities.length}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                                                        <Calendar size={14} /> {formatDate(lead.lastUpdated)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <button
                                                        onClick={() => { setSelectedLeadForDetails(lead); }}
                                                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 rounded-xl text-xs font-bold transition-all shadow-sm"
                                                    >
                                                        <Eye size={14} /> Details
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedLead(lead); setView("history"); }}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-indigo-200"
                                                    >
                                                        <History size={14} /> History
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Level 3: Call History for Selected Lead */}
                    {view === "history" && selectedLead && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                    <FileText className="text-indigo-500" size={20} /> Interaction Log for {selectedLead.name}
                                </h3>
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">
                                    {selectedLead.activities.length} Interactions
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest w-[200px]">Date & Time</th>
                                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest w-[250px]">Call Outcome</th>
                                            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Interaction Summary & Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {selectedLead.activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(act => {
                                            const outcome = CALL_OUTCOMES.find(o => o.value === act.callOutcome);
                                            return (
                                                <tr key={act._id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1 text-sm font-semibold text-slate-600">
                                                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-slate-400"/> {new Date(act.createdAt).toLocaleDateString('en-GB')}</span>
                                                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-slate-400"/> {new Date(act.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border ${outcome?.color || 'text-slate-700 bg-slate-50 border-slate-200'}`}>
                                                            {outcome?.label || act.callOutcome}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-2">
                                                            <div className="text-sm font-semibold text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                                {act.summary || "No summary provided for this interaction."}
                                                            </div>
                                                            {act.remark && (
                                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5 mt-1 ml-1">
                                                                    <span>Internal Remark:</span> <span className="text-slate-600 normal-case">{act.remark}</span>
                                                                </div>
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
                </>
            )}

            {/* ── Lead Details Modal ── */}
            {selectedLeadForDetails && (
                <div 
                    onClick={() => setSelectedLeadForDetails(null)}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 sm:p-6"
                >
                    <div 
                        onClick={e => e.stopPropagation()}
                        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-[fadeIn_0.2s_ease-out]"
                    >
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-black tracking-tight text-slate-800 flex items-center gap-2">
                                <FileText className="text-indigo-500" /> Full Lead Intelligence
                            </h2>
                            <button onClick={() => setSelectedLeadForDetails(null)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 mb-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-200">
                                        {selectedLeadForDetails.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-1">{selectedLeadForDetails.name}</h3>
                                        <div className="text-sm font-medium text-slate-500">{selectedLeadForDetails.email || 'No email provided'}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-indigo-100/50">
                                    <div>
                                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Phone Number</div>
                                        <div className="text-sm font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-indigo-100 inline-block">{selectedLeadForDetails.phone}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Target Domain</div>
                                        <div className="text-sm font-bold text-slate-700">{selectedLeadForDetails.domain || 'General Exploration'}</div>
                                    </div>
                                </div>
                            </div>

                            {selectedLeadForDetails.extra_fields && Object.keys(selectedLeadForDetails.extra_fields).length > 0 && (
                                <>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Meta Ads & Custom Questionnaire</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        {Object.entries(selectedLeadForDetails.extra_fields).map(([key, val]) => (
                                            <div key={key}>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">{key.replace(/_/g, ' ')}</div>
                                                <div className="text-sm font-semibold text-slate-800">{String(val) || '—'}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end">
                            <button 
                                onClick={() => setSelectedLeadForDetails(null)} 
                                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-slate-200"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvTeamRecord;
