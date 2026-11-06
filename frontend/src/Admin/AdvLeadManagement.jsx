import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AdvLeadManagement = () => {

    const getLeadField = (lead, keys) => {
        for (const key of keys) {
            const value = lead?.extra_fields?.[key] ?? lead?.[key];
            if (value) return value;
        }
        return "";
    };

    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [managers, setManagers] = useState([]);
    const [freshCount, setFreshCount] = useState(0);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 25;

    // Filters
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Manual Assign State
    const [isManualAssignMode, setIsManualAssignMode] = useState(false);
    const [selectedLeadIds, setSelectedLeadIds] = useState([]);

    // Assign panel state
    const [showAssignPanel, setShowAssignPanel] = useState(false);
    const [selectedAssignee, setSelectedAssignee] = useState(null);
    const [assignCount, setAssignCount] = useState("");
    const [assigning, setAssigning] = useState(false);

    // Email Modal state
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [selectedLeadForEmail, setSelectedLeadForEmail] = useState(null);
    const [emailRecipient, setEmailRecipient] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailDomain, setEmailDomain] = useState("");
    const [emailContent, setEmailContent] = useState("");
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [sendBrochure, setSendBrochure] = useState(false);

    // New Personalized Email & Template state
    const [showSMTPModal, setShowSMTPModal] = useState(false);
    const [personalEmail, setPersonalEmail] = useState("");
    const [appPassword, setAppPassword] = useState("");
    const [templates, setTemplates] = useState([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState("");
    const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState("");
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);

    // Lead Details Modal state
    const [selectedLeadForDetails, setSelectedLeadForDetails] = useState(null);

    const [advDomains, setAdvDomains] = useState(["General"]);

    // Identify current user
    const userId = localStorage.getItem("adminId"); 
    const senderName = localStorage.getItem("adminName") || "Admin";

    const fetchFreshCount = async () => {
        try {
            const res = await axios.get(`${API}/api/adv-leads/fresh-leads-count`);
            setFreshCount(res.data.count || 0);
        } catch (err) {
            console.error("Failed to fetch fresh count");
        }
    };

    const fetchLeads = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/adv-leads/get-adv-leads`, {
                params: { role: "admin", page, limit, month: selectedMonth, year: selectedYear }
            });
            if (res.data && res.data.leads) {
                setLeads(res.data.leads);
                setTotalPages(res.data.totalPages);
                setTotalCount(res.data.totalCount);
                setCurrentPage(res.data.currentPage);
                // freshCount is now bundled in the same response — no extra API call needed
                if (res.data.freshCount !== undefined) {
                    setFreshCount(res.data.freshCount);
                }
            } else {
                setLeads([]);
            }
        } catch (err) {
            toast.error("Failed to fetch leads");
            setLeads([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchManagers = async () => {
        try {
            const res = await axios.get(`${API}/getadvteam`);
            const data = res.data || [];
            // For Admin, show all active team members (Managers, Leaders, Specialists) as potential assignees
            setManagers(data.filter(m => m.status === "Active"));
        } catch (err) {
            console.error("Failed to fetch assignees");
        }
    };

    useEffect(() => {
        const fetchTemplates = async () => {
            if (!userId) return;
            try {
                const res = await axios.get(`${API}/api/adv-leads/get-templates/${userId}`);
                setTemplates(res.data);
            } catch (err) {
                console.error("Failed to fetch templates");
            }
        };
        const fetchSMTPConfig = async () => {
            if (!userId || userId === "Admin") return;
            try {
                const res = await axios.get(`${API}/api/adv-leads/get-smtp-config/${userId}`);
                setPersonalEmail(res.data.smtpEmail || "");
            } catch (err) {
                console.error("Failed to fetch SMTP config");
            }
        };
        const fetchDomains = async () => {
            try {
                const res = await axios.get(`${API}/getadvcourses`);
                const titles = res.data.map(c => c.title.includes("Advance") ? c.title : `${c.title} Advance`);
                setAdvDomains(["General", ...titles]);
            } catch (err) {
                console.error("Failed to fetch domains");
            }
        };
        fetchLeads(currentPage);
        fetchManagers();
        // freshCount is now returned inside fetchLeads — removed separate fetchFreshCount() call
        fetchTemplates();
        fetchSMTPConfig();
        fetchDomains();
    }, [currentPage, selectedMonth, selectedYear, userId]);

    const handleSaveSMTP = async () => {
        if (!personalEmail || !appPassword) return toast.error("Both fields are required");
        try {
            await axios.post(`${API}/api/adv-leads/save-smtp-config`, {
                userId,
                smtpEmail: personalEmail,
                smtpPassword: appPassword
            });
            toast.success("Email credentials saved!");
            setShowSMTPModal(false);
        } catch (err) {
            toast.error("Failed to save credentials");
        }
    };

    const handleSaveTemplate = async () => {
        if (!newTemplateName) return toast.error("Template name is required");
        setIsSavingTemplate(true);
        try {
            const res = await axios.post(`${API}/api/adv-leads/save-template`, {
                name: newTemplateName,
                subject: emailSubject,
                body: emailContent,
                userId
            });
            toast.success("Template saved!");
            setTemplates([res.data.template, ...templates]);
            setShowSaveTemplateModal(false);
            setNewTemplateName("");
        } catch (err) {
            toast.error("Failed to save template");
        } finally {
            setIsSavingTemplate(false);
        }
    };

    const handleDeleteTemplate = async () => {
        if (!selectedTemplateId) return toast.error("Please select a template to delete");
        const template = templates.find(t => t._id === selectedTemplateId);
        if (!window.confirm(`Are you sure you want to delete the template "${template?.name}"?`)) return;

        try {
            await axios.delete(`${API}/api/adv-leads/delete-template/${selectedTemplateId}`);
            toast.success("Template deleted!");
            setTemplates(templates.filter(t => t._id !== selectedTemplateId));
            setSelectedTemplateId("");
            setEmailSubject("");
            setEmailContent("");
        } catch (err) {
            toast.error("Failed to delete template");
        }
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = [new Date().getFullYear(), new Date().getFullYear() - 1];

    const handleMakeDialed = async (leadId) => {
        if (!window.confirm("Are you sure you want to change this lead status to 'dialed'? This will delete all call logs and reset assignments.")) return;
        
        try {
            const res = await axios.put(`${API}/api/adv-leads/make-dialed/${leadId}`);
            toast.success(res.data.message);
            fetchLeads(currentPage);
            fetchFreshCount();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to reset lead");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // ─── Bulk Assign ─────────────────────────────────────────────────────────────
    const handleBulkAssign = async () => {
        if (!selectedAssignee) { toast.error("Please select a person"); return; }
        const num = parseInt(assignCount);
        if (!num || num < 1) { toast.error("Please enter a valid number of leads"); return; }
        if (num > freshCount) { toast.error(`Only ${freshCount} fresh leads available`); return; }

        setAssigning(true);
        try {
            const res = await axios.post(`${API}/api/adv-leads/admin-bulk-assign`, {
                assigneeId: selectedAssignee._id,
                assigneeName: selectedAssignee.fullname,
                assigneeRole: selectedAssignee.designation,
                count: num,
                assignerName: senderName
            });
            toast.success(res.data.message);
            setShowAssignPanel(false);
            setSelectedAssignee(null);
            setAssignCount("");
            fetchLeads(1);
            fetchFreshCount();
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
        if (!selectedAssignee) {
            toast.error(`Please select a person below`);
            return;
        }

        setAssigning(true);
        try {
            const res = await axios.post(`${API}/api/adv-leads/manual-bulk-assign`, {
                leadIds: selectedLeadIds,
                assigneeId: selectedAssignee._id,
                assigneeName: selectedAssignee.fullname,
                assigneeRole: selectedAssignee.designation,
                assignerName: senderName
            });
            toast.success(res.data.message);
            setIsManualAssignMode(false);
            setSelectedLeadIds([]);
            setSelectedAssignee(null);
            fetchLeads(currentPage);
            fetchFreshCount();
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
        if (selectedLeadIds.length === filteredLeads.length) {
            setSelectedLeadIds([]);
        } else {
            setSelectedLeadIds(filteredLeads.map(l => l._id));
        }
    };

    const statusColor = (status) => {
        const map = {
            fresh: { bg: 'rgba(56, 189, 248, 0.1)', border: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' },
            assigned_to_manager: { bg: 'rgba(251, 146, 60, 0.1)', border: 'rgba(251, 146, 60, 0.2)', color: '#fb923c' },
            assigned_to_leader: { bg: 'rgba(167, 139, 250, 0.1)', border: 'rgba(167, 139, 250, 0.2)', color: '#a78bfa' },
            assigned_to_specialist: { bg: 'rgba(129, 140, 248, 0.1)', border: 'rgba(129, 140, 248, 0.2)', color: '#818cf8' },
            in_followup: { bg: 'rgba(250, 204, 21, 0.1)', border: 'rgba(250, 204, 21, 0.2)', color: '#facc15' },
            converted: { bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.2)', color: '#34d399' },
            dialed: { bg: 'rgba(192, 132, 252, 0.1)', border: 'rgba(192, 132, 252, 0.2)', color: '#c084fc' },
        };
        return map[status] || { bg: 'rgba(100, 116, 139, 0.1)', border: 'rgba(100, 116, 139, 0.2)', color: '#94a3b8' };
    };

    const filteredLeads = leads.filter(l => {
        const matchSearch = (l.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (l.phone_number || "").includes(searchTerm);
        const matchStatus = !statusFilter || l.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const formatDate = (date) => {
        if (!date) return "Unknown Date";
        return new Date(date).toLocaleDateString("en-GB");
    };

    // Grouping logic for the leads
    const groupedLeads = filteredLeads.reduce((acc, lead) => {
        const date = formatDate(lead.created_at);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(lead);
        return acc;
    }, {});

    const styles = {
        pagination: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            padding: '16px 20px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #eee'
        }
    }

    return (
        <div id="create-marketing-team" className="admin-content-wrap min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <style>{`
                #create-marketing-team table { width: 100%; border-collapse: separate; border-spacing: 0; }
                #create-marketing-team td { padding: 16px 24px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
                #create-marketing-team tbody tr:hover { background-color: #f8fafc; }
            `}</style>
            <Toaster position="top-center" toastOptions={{ style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' } }} />

            {/* ── Assign Panel Overlay ─────────────────────── */}
            {showAssignPanel && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="m-0 text-2xl font-extrabold text-slate-900 tracking-tight">Assign Fresh Leads</h2>
                            <button 
                                onClick={() => { setShowAssignPanel(false); setSelectedAssignee(null); setAssignCount(""); }}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <i className="fa fa-times text-lg"></i>
                            </button>
                        </div>

                        {/* Fresh leads available badge */}
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-6 flex flex-col items-center justify-center relative overflow-hidden">
                            <i className="fa fa-leaf absolute -right-4 -bottom-4 text-6xl text-blue-100 opacity-50"></i>
                            <span className="text-4xl font-black text-blue-600 tracking-tighter z-10">{freshCount}</span>
                            <div className="text-sm font-bold text-blue-800/70 uppercase tracking-widest mt-1 z-10">Fresh Leads Available</div>
                        </div>

                        {/* Step 1: Select Manager */}
                        <div className="mb-5">
                            <label className="block font-bold text-sm text-slate-700 mb-2">
                                <span className="text-blue-600 mr-1">Step 1 —</span> Select Manager or Leader
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedAssignee?._id || ""}
                                    onChange={e => {
                                        const m = managers.find(m => m._id === e.target.value);
                                        setSelectedAssignee(m || null);
                                    }}
                                    className="w-full pl-4 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer appearance-none"
                                >
                                    <option value="">-- Select a Person --</option>
                                    {managers.map(m => (
                                        <option key={m._id} value={m._id}>{m.fullname} ({m.designation} - {m.team})</option>
                                    ))}
                                </select>
                                <i className="fa fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"></i>
                            </div>
                            {managers.length === 0 && (
                                <p className="mt-2 text-xs font-medium text-rose-500 flex items-center gap-1">
                                    <i className="fa fa-exclamation-circle"></i> No ADV Managers or Leaders found. Create one in Create ADV Team.
                                </p>
                            )}
                        </div>

                        {/* Step 2: Enter count (only visible after manager selected) */}
                        {selectedAssignee && (
                            <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                                <label className="block font-bold text-sm text-slate-700 mb-2">
                                    <span className="text-blue-600 mr-1">Step 2 —</span> Leads to assign to <strong className="text-blue-600">{selectedAssignee.fullname}</strong>?
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        max={freshCount}
                                        placeholder={`Max: ${freshCount}`}
                                        value={assignCount}
                                        onChange={e => setAssignCount(e.target.value)}
                                        className="flex-1 py-3 px-4 border border-slate-300 rounded-xl text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        onKeyDown={e => e.key === 'Enter' && handleBulkAssign()}
                                    />
                                    <button
                                        onClick={() => setAssignCount(String(freshCount))}
                                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
                                    >
                                        Select All
                                    </button>
                                </div>
                                {assignCount && parseInt(assignCount) > freshCount && (
                                    <p className="mt-2 text-xs font-medium text-rose-500 flex items-center gap-1">
                                        <i className="fa fa-exclamation-circle"></i> Only {freshCount} fresh leads available
                                    </p>
                                )}
                            </div>
                        )}

                        <button
                            onClick={handleBulkAssign}
                            disabled={assigning || !selectedAssignee || !assignCount}
                            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-2
                                ${(!selectedAssignee || !assignCount) 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5'}`}
                        >
                            {assigning ? (
                                <><i className="fa fa-spinner fa-spin"></i> Assigning...</>
                            ) : (
                                <><i className="fa fa-check-circle"></i> Assign {assignCount || "?"} Leads to {selectedAssignee?.fullname || "Person"}</>
                            )}
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-[1600px] mx-auto">
                {/* ── Header Row ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ margin: 0 }}>ADV Lead Management</h1>
                        <p className="text-slate-500 mt-1">Review, manage, and assign inbound leads.</p>
                    </div>
                    <div className="flex gap-3">
                        {!isManualAssignMode ? (
                            <>
                                <button
                                    onClick={() => { setIsManualAssignMode(true); setSelectedLeadIds([]); }}
                                    className="px-5 py-2.5 bg-white text-blue-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                                >
                                    <i className="fa fa-mouse-pointer"></i> Manual Assign
                                </button>
                                <button
                                    onClick={() => setShowAssignPanel(true)}
                                    className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                                >
                                    <i className="fa fa-clipboard-list"></i> Bulk Assign
                                    {freshCount > 0 && (
                                        <span className="bg-white text-blue-600 rounded-full px-2 py-0.5 text-xs font-extrabold ml-1">
                                            {freshCount} fresh
                                        </span>
                                    )}
                                </button>

                            </>
                        ) : (
                            <button
                                onClick={() => { setIsManualAssignMode(false); setSelectedLeadIds([]); }}
                                className="px-5 py-2.5 bg-rose-500 text-white hover:bg-rose-600 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                            >
                                <i className="fa fa-times"></i> Cancel Manual Mode
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Stats Row ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Total Leads', count: totalCount, icon: 'fa-users', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
                        { label: 'Fresh Leads', count: freshCount, icon: 'fa-leaf', color: 'text-emerald-600', bg: 'bg-emerald-50/50', border: 'border-emerald-200' },
                        { label: 'Assigned', count: totalCount - freshCount - leads.filter(l => l.status === 'converted').length, icon: 'fa-user-check', color: 'text-blue-600', bg: 'bg-blue-50/50', border: 'border-blue-200' },
                        { label: 'Converted', count: leads.filter(l => l.status === 'converted').length || 'Check API', icon: 'fa-trophy', color: 'text-amber-600', bg: 'bg-amber-50/50', border: 'border-amber-200' },
                    ].map((s, i) => (
                        <div key={i} className={`p-6 rounded-2xl border bg-white shadow-sm flex flex-col justify-center items-center relative overflow-hidden group`}>
                            <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full ${s.bg} flex items-center justify-center opacity-50 transition-transform group-hover:scale-110`}>
                                <i className={`fa ${s.icon} ${s.color} text-xl mt-2 mr-2`}></i>
                            </div>
                            <div className={`text-3xl font-extrabold ${s.color} mb-1 z-10`}>{s.count}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider z-10">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Manual Assign Bar (Full Width) ── */}
                {isManualAssignMode && (
                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl mb-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-inner animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-6">
                            <div className="bg-blue-600 text-white py-2 px-5 rounded-xl text-center min-w-[100px] shadow-sm">
                                <div className="text-2xl font-extrabold">{selectedLeadIds.length}</div>
                                <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">Selected</div>
                            </div>
                            <div>
                                <h3 className="m-0 text-lg font-bold text-blue-900">Manual Assignment Mode</h3>
                                <p className="m-0 text-sm text-blue-600 mt-1">Select leads from the table below and choose an assignee.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 min-w-[300px]">
                                <i className="fa fa-user-tie absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <select
                                    value={selectedAssignee?._id || ""}
                                    onChange={e => {
                                        const m = managers.find(m => m._id === e.target.value);
                                        setSelectedAssignee(m || null);
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer appearance-none"
                                >
                                    <option value="">-- Select Assignee (Manager / Leader / Specialist) --</option>
                                    {managers.map(m => (
                                        <option key={m._id} value={m._id}>
                                            {m.fullname} ({m.designation} - {m.team || 'No Team'})
                                        </option>
                                    ))}
                                </select>
                                <i className="fa fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"></i>
                            </div>
                            
                            <button
                                onClick={handleManualAssign}
                                disabled={assigning || selectedLeadIds.length === 0 || !selectedAssignee}
                                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap
                                    ${(selectedLeadIds.length === 0 || !selectedAssignee) 
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5'}`}
                            >
                                {assigning ? (
                                    <><i className="fa fa-spinner fa-spin"></i> Processing...</>
                                ) : (
                                    <><i className="fa fa-check"></i> Confirm Assignment</>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Filters ── */}
                <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative flex-1 min-w-[250px]">
                        <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input
                            placeholder="Search name or phone..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:bg-white transition-all"
                        />
                    </div>
                    
                    <div className="relative min-w-[180px]">
                        <select 
                            value={statusFilter} 
                            onChange={e => setStatusFilter(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="">All Statuses</option>
                            <option value="fresh">Fresh</option>
                            <option value="dialed">Dialed</option>
                            <option value="assigned_to_manager">Assigned to Manager</option>
                            <option value="assigned_to_leader">Assigned to Leader</option>
                            <option value="assigned_to_specialist">Assigned to Specialist</option>
                            <option value="in_followup">In Follow-up</option>
                            <option value="converted">Converted</option>
                        </select>
                        <i className="fa fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]"></i>
                    </div>

                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 h-[42px]">
                        <div className="flex items-center gap-2 px-3 text-sm font-bold text-slate-600 border-r border-slate-200">
                            <i className="fa fa-calendar-alt text-blue-500"></i>
                            <span>Date Filter</span>
                        </div>
                        <select 
                            value={selectedMonth} 
                            onChange={(e) => { setSelectedMonth(e.target.value); setCurrentPage(1); }}
                            className="bg-transparent border-none outline-none text-sm font-semibold text-slate-700 cursor-pointer px-3 appearance-none hover:text-blue-600 transition-colors"
                        >
                            {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                        </select>
                        <select 
                            value={selectedYear} 
                            onChange={(e) => { setSelectedYear(e.target.value); setCurrentPage(1); }}
                            className="bg-transparent border-none outline-none text-sm font-semibold text-slate-700 cursor-pointer px-2 appearance-none hover:text-blue-600 transition-colors"
                        >
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    <button 
                        onClick={() => { fetchLeads(1); fetchFreshCount(); }}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ml-auto"
                    >
                        <i className="fa fa-sync-alt"></i> Refresh
                    </button>
                </div>

                {/* ── Leads Table ── */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Loading leads...</div>
                ) : filteredLeads.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', border: '2px dashed #eee', borderRadius: '8px', color: '#888' }}>
                        <div style={{ fontSize: '40px' }}>📭</div>
                        <p>No leads found.</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                        {isManualAssignMode && (
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" style={{ width: '40px' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0}
                                                    onChange={toggleAllSelection}
                                                />
                                            </th>
                                        )}
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Domain</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Preferred Language</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" style={{ minWidth: '150px' }}>Situation</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" style={{ minWidth: '150px' }}>Goal</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" style={{ minWidth: '150px' }}>Challenge</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" style={{ minWidth: '150px' }}>Willingness</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Info</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Backend Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(groupedLeads).map((date) => (
                                        <React.Fragment key={date}>
                                            <tr style={{ background: '#f8f9fa' }}>
                                                <td colSpan={isManualAssignMode ? "17" : "16"} style={{ fontWeight: '800', textAlign: 'center', padding: '10px', fontSize: '14px', letterSpacing: '1px', borderBottom: '2px solid #ddd' }}>
                                                    📅 {date}
                                                </td>
                                            </tr>
                                            {groupedLeads[date].map((lead, idx) => {
                                                const sc = statusColor(lead.status);
                                                const isSelected = selectedLeadIds.includes(lead._id);
                                                return (
                                                    <tr key={lead._id} style={{ background: isSelected ? '#f6ffed' : (lead.source === "Website Lead" ? "#fff7e6" : "transparent") }}>
                                                        {isManualAssignMode && (
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected}
                                                                    onChange={() => toggleLeadSelection(lead._id)}
                                                                />
                                                            </td>
                                                        )}
                                                        <td style={{ color: '#888', fontSize: '12px' }}>{(currentPage - 1) * limit + idx + 1}</td>
                                                        <td><strong>{lead.full_name}</strong></td>
                                                        <td style={{ fontSize: '12px', color: '#666' }}>{lead.email}</td>
                                                        <td>{lead.phone_number}</td>
                                                        <td style={{ fontSize: '12px', color: '#666' }}>{lead.source || '—'}</td>
                                                        <td style={{ fontSize: '13px' }}>{lead.opted_domain || '—'}</td>
                                                        <td style={{ fontSize: '12px', color: '#555' }} title={getLeadField(lead, ['preferredLanguage', 'preferred_language', 'language', 'preferred_language?'])}>{getLeadField(lead, ['preferredLanguage', 'preferred_language', 'language', 'preferred_language?']) || '—'}</td>
                                                        <td style={{ fontSize: '11px', color: '#666', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={getLeadField(lead, ['currentSituation', 'what_best_describes_your_current_situation?', 'what_best_describes_your_current_situation'])}>
                                                            {getLeadField(lead, ['currentSituation', 'what_best_describes_your_current_situation?', 'what_best_describes_your_current_situation']) || '—'}
                                                        </td>
                                                        <td style={{ fontSize: '11px', color: '#666', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={getLeadField(lead, ['primaryGoal', 'what_is_your_primary_goal_right_now?', 'what_is_your_primary_goal_right_now'])}>
                                                            {getLeadField(lead, ['primaryGoal', 'what_is_your_primary_goal_right_now?', 'what_is_your_primary_goal_right_now']) || '—'}
                                                        </td>
                                                        <td style={{ fontSize: '11px', color: '#666', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={getLeadField(lead, ['currentChallenge', 'what_is_your_biggest_career_challenge?', 'what_is_your_biggest_career_challenge'])}>
                                                            {getLeadField(lead, ['currentChallenge', 'what_is_your_biggest_career_challenge?', 'what_is_your_biggest_career_challenge']) || '—'}
                                                        </td>
                                                        <td style={{ fontSize: '11px', color: '#666', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={getLeadField(lead, ['readyToInvest', 'upskilling_ready', 'are_you_willing_to_invest_in_a_program_that_provides_training_+internship+100%_placement_support?', 'are_you_willing_to_invest_in_a_program_that_provides_training_+_internship_+100%_placement_support?'])}>
                                                            {getLeadField(lead, ['readyToInvest', 'upskilling_ready', 'are_you_willing_to_invest_in_a_program_that_provides_training_+internship+100%_placement_support?', 'are_you_willing_to_invest_in_a_program_that_provides_training_+_internship_+100%_placement_support?']) || '—'}
                                                        </td>
                                                        <td style={{ fontSize: '12px', color: '#555' }}>{lead.current_status || '—'}</td>
                                                        <td>
                                                            <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color, whiteSpace: 'nowrap' }}>
                                                                {lead.status?.replace(/_/g, ' ')}
                                                            </span>
                                                        </td>
                                                        <td style={{ fontSize: '13px', color: '#555' }}>
                                                            {(() => {
                                                                const name = lead.owner_name || lead.current_owner_id?.name || '—';
                                                                const team = lead.team_name || lead.team_id?.team_name || managers.find(m => m.fullname === name || m._id === (lead.owner_id || lead.current_owner_id?._id))?.team;
                                                                return (
                                                                    <>
                                                                        {name}
                                                                        {team && <><br /><span style={{ color: '#1890ff', fontSize: '11px', fontWeight: '600' }}>({team})</span></>}
                                                                    </>
                                                                );
                                                            })()}
                                                        </td>
                                                        <td>
                                                            <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: (lead.score || 0) > 15 ? '#f6ffed' : '#f5f5f5', border: `1px solid ${(lead.score || 0) > 15 ? '#b7eb8f' : '#d9d9d9'}` }}>
                                                                {lead.score || 0}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                                <button 
                                                                    onClick={() => setSelectedLeadForDetails(lead)}
                                                                    title="View Details"
                                                                    style={{
                                                                        padding: '6px 12px',
                                                                        background: '#1890ff',
                                                                        color: '#fff',
                                                                        border: 'none',
                                                                        borderRadius: '6px',
                                                                        cursor: 'pointer',
                                                                        fontSize: '11px',
                                                                        fontWeight: '600',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '4px'
                                                                    }}
                                                                >
                                                                    <i className="fa fa-eye"></i> View
                                                                </button>
                                                                {["callback_requested", "no_answer", "not_interested", "junk"].includes(lead.last_outcome) && (
                                                                    <button 
                                                                        onClick={() => handleMakeDialed(lead._id)}
                                                                        title="Change to Dialed"
                                                                        style={{
                                                                            padding: '6px 12px',
                                                                            background: '#722ed1', // Deep purple for Dialed
                                                                            color: '#fff',
                                                                            border: 'none',
                                                                            borderRadius: '6px',
                                                                            cursor: 'pointer',
                                                                            fontSize: '11px',
                                                                            fontWeight: '600',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '4px'
                                                                        }}
                                                                    >
                                                                        <i className="fa fa-refresh"></i> Dialed
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                        {/* Pagination UI */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm gap-4">
                            <div className="text-sm font-medium text-slate-500">
                                Showing <strong className="text-slate-900 font-bold">{(currentPage - 1) * limit + 1}</strong> - <strong className="text-slate-900 font-bold">{Math.min(currentPage * limit, totalCount)}</strong> of <strong className="text-slate-900 font-bold">{totalCount}</strong> leads
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1
                                        ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-transparent' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'}`}
                                >
                                    <i className="fa fa-chevron-left text-[10px]"></i> Prev
                                </button>
                                
                                <div className="flex gap-1">
                                    {[...Array(totalPages)].map((_, i) => {
                                        const p = i + 1;
                                        if (p === 1 || p === totalPages || (p >= currentPage - 2 && p <= currentPage + 2)) {
                                            return (
                                                <button
                                                    key={p}
                                                    onClick={() => handlePageChange(p)}
                                                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center
                                                        ${currentPage === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 border'}`}
                                                >
                                                    {p}
                                                </button>
                                            );
                                        } else if (p === currentPage - 3 || p === currentPage + 3) {
                                            return <span key={p} className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1
                                        ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-transparent' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'}`}
                                >
                                    Next <i className="fa fa-chevron-right text-[10px]"></i>
                                </button>
                            </div>
                        </div>
                    </>
                )}


                {/* ─── AI Email Modal ─── */}
                {showEmailModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 2000,
                        backdropFilter: 'blur(5px)'
                    }}>
                        <div style={{
                            backgroundColor: '#fff', padding: '32px', borderRadius: '20px',
                            width: '700px', maxHeight: '90vh', overflowY: 'auto',
                            boxShadow: '0 25px 60px rgba(0,0,0,0.2)', position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
                                <h2 style={{ margin: 0, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '24px' }}>✉️</span> Send Personalized Mail
                                </h2>
                                <button onClick={() => setShowEmailModal(false)} style={{ border: 'none', background: '#f5f5f5', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px' }}>&times;</button>
                            </div>

                            <div style={{ marginBottom: '20px', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    📋 Select existing template (Subject & Body will auto-fill)
                                </label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <select 
                                        value={selectedTemplateId}
                                        onChange={(e) => {
                                            const tId = e.target.value;
                                            setSelectedTemplateId(tId);
                                            const template = templates.find(t => t._id === tId);
                                            if (template) {
                                                setEmailSubject(template.subject);
                                                setEmailContent(template.body);
                                            }
                                        }}
                                        style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', cursor: 'pointer' }}
                                    >
                                        <option value="">-- Choose a Template --</option>
                                        {templates.map(t => (
                                            <option key={t._id} value={t._id}>{t.name}</option>
                                        ))}
                                    </select>
                                    {selectedTemplateId && (
                                        <button 
                                            onClick={handleDeleteTemplate}
                                            title="Delete Selected Template"
                                            style={{ padding: '10px', background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '5px', display: 'block' }}>Recipient Name</label>
                                    <input 
                                        type="text" 
                                        value={selectedLeadForEmail?.full_name || ""} 
                                        readOnly
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#ff9f9', cursor: 'not-allowed' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '5px', display: 'block' }}>Recipient Email</label>
                                    <input 
                                        type="text" 
                                        value={emailRecipient} 
                                        onChange={(e) => setEmailRecipient(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '5px', display: 'block' }}>Email Subject</label>
                                    <button 
                                        onClick={() => {
                                            const prompt = encodeURIComponent(`Write a professional and catchy email for a ${emailDomain} student. The email should be about: ${emailSubject || 'the Advanced Program'}. Mention Accenlearn and include a strong call to action.`);
                                            window.open(`https://chatgpt.com/?q=${prompt}`, '_blank');
                                        }}
                                        style={{ border: 'none', background: 'linear-gradient(135deg, #722ed1 0%, #1890ff 100%)', color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}
                                    >
                                        <span style={{ fontSize: '14px' }}>🤖</span> Generate with ChatGPT
                                    </button>
                                </div>
                                <input 
                                    type="text" 
                                    value={emailSubject} 
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                    placeholder="Enter email subject line..."
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '5px', display: 'block' }}>Selected Domain</label>
                                <select 
                                    value={emailDomain} 
                                    onChange={(e) => {
                                        const newDomain = e.target.value;
                                        setEmailDomain(newDomain);
                                        if (newDomain && newDomain !== "General") {
                                            setSendBrochure(true);
                                        }
                                    }}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff' }}
                                >
                                    {advDomains.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>


                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '5px', display: 'block' }}>Email Content (HTML Preview)</label>
                                <textarea 
                                    value={emailContent}
                                    onChange={(e) => setEmailContent(e.target.value)}
                                    style={{ width: '100%', height: '200px', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '5px', fontFamily: 'monospace', fontSize: '13px' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', background: '#fff7e6', padding: '15px', borderRadius: '12px', border: '1px solid #ffd591' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={sendBrochure} 
                                        onChange={(e) => setSendBrochure(e.target.checked)}
                                        style={{ transform: 'scale(1.5)', cursor: 'pointer' }}
                                        id="brochureCheckAdmin"
                                    />
                                    <label htmlFor="brochureCheckAdmin" style={{ fontWeight: 'bold', cursor: 'pointer', color: '#d46b08' }}>
                                        Include {emailDomain && emailDomain !== "General" ? emailDomain : "Advanced Program"} Brochure PDF
                                    </label>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button 
                                    onClick={async () => {
                                        if(!emailRecipient) { toast.error("Recipient required"); return; }
                                        if(!emailSubject) { toast.error("Subject required"); return; }
                                        if(!emailContent) { toast.error("Content required"); return; }
                                        setIsSendingEmail(true);
                                        try {
                                            await axios.post(`${API}/api/adv-leads/send-lead-mail`, {
                                                leadId: selectedLeadForEmail?._id,
                                                recipientEmail: emailRecipient,
                                                subject: emailSubject,
                                                content: emailContent,
                                                domain: emailDomain,
                                                sendBrochure,
                                                userId,
                                                senderName
                                            });
                                            toast.success("Email sent successfully!");

                                            // Check if we should prompt to save as template
                                            const isExistingTemplate = templates.some(t => t.subject === emailSubject && t.body === emailContent);
                                            if (!isExistingTemplate) {
                                                setShowSaveTemplateModal(true);
                                            }

                                            setShowEmailModal(false);
                                        } catch (err) {
                                            toast.error(err.response?.data?.message || "Failed to send mail");
                                        } finally {
                                            setIsSendingEmail(false);
                                        }
                                    }}
                                    disabled={isSendingEmail}
                                    style={{ 
                                        flex: 2, padding: '14px', background: '#2ecc71', color: '#fff', 
                                        border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer',
                                        fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                                    }}
                                >
                                    {isSendingEmail ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-paper-plane"></i>}
                                    {isSendingEmail ? "Sending..." : "Send Personalized Email"}
                                </button>
                                <button 
                                    onClick={() => setShowEmailModal(false)}
                                    style={{ flex: 1, padding: '14px', background: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── Save Template Modal ─── */}
                {showSaveTemplateModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 2100,
                        backdropFilter: 'blur(3px)'
                    }}>
                        <div style={{
                            backgroundColor: '#fff', padding: '24px', borderRadius: '15px',
                            width: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}>
                            <h3 style={{ marginTop: 0 }}>💾 Save as Template?</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>Would you like to save this message as a template for future use?</p>
                            <input 
                                type="text"
                                placeholder="Template Name (e.g. Welcome Mail)"
                                value={newTemplateName}
                                onChange={(e) => setNewTemplateName(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button 
                                    onClick={handleSaveTemplate}
                                    disabled={isSavingTemplate}
                                    style={{ flex: 1, padding: '12px', background: '#059669', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    {isSavingTemplate ? "Saving..." : "Save Template"}
                                </button>
                                <button 
                                    onClick={() => setShowSaveTemplateModal(false)}
                                    style={{ flex: 1, padding: '12px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    No, thanks
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── SMTP Setup Modal ─── */}
                {showSMTPModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 2050,
                        backdropFilter: 'blur(5px)'
                    }}>
                        <div style={{
                            backgroundColor: '#fff', padding: '32px', borderRadius: '24px',
                            width: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '24px' }}>📧</span> Email Account Setup
                                </h3>
                                <button onClick={() => setShowSMTPModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px', color: '#94a3b8' }}>&times;</button>
                            </div>
                            <div style={{ background: '#f0f9ff', padding: '15px', borderRadius: '12px', border: '1px solid #bae6fd', marginBottom: '24px' }}>
                                <p style={{ fontSize: '13px', color: '#0369a1', margin: 0, lineHeight: '1.5' }}>
                                    <strong>🔒 Personalize your outreach:</strong> Enter your official email and an <strong>App Password</strong>. This allows the system to send professional emails directly from your account.
                                </p>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>Your Professional Email</label>
                                <input 
                                    type="email"
                                    value={personalEmail}
                                    onChange={(e) => setPersonalEmail(e.target.value)}
                                    placeholder="your-name@Accenlearn.com"
                                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                                />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>Mail App Password</label>
                                <input 
                                    type="password"
                                    value={appPassword}
                                    onChange={(e) => setAppPassword(e.target.value)}
                                    placeholder="xxxx xxxx xxxx xxxx"
                                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                                />
                                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
                                    App Passwords can be generated in your Google or Outlook account security settings.
                                </p>
                            </div>
                            <button 
                                onClick={handleSaveSMTP}
                                style={{ width: '100%', padding: '16px', background: '#722ed1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(114, 46, 209, 0.4)' }}
                            >
                                Save Configuration
                            </button>
                        </div>
                    </div>
                )}

                {/* ─── Lead Details Modal ─── */}
                {selectedLeadForDetails && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 3000,
                        backdropFilter: 'blur(5px)'
                    }}>
                        <div style={{
                            backgroundColor: '#fff', padding: '30px', borderRadius: '20px',
                            width: '450px', maxHeight: '90vh', overflowY: 'auto',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #e2e8f0'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1a202c' }}>Lead Briefing</h2>
                                <button onClick={() => setSelectedLeadForDetails(null)} style={{ border: 'none', background: '#f7fafc', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '20px', color: '#718096' }}>&times;</button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Email Address</label>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', wordBreak: 'break-all' }}>{selectedLeadForDetails.email || '—'}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Phone Number</label>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{selectedLeadForDetails.phone_number}</div>
                                </div>
                            </div>

                            {selectedLeadForDetails.last_recording_url && (
                                <div style={{ marginBottom: '24px', padding: '15px', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#0369a1', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Latest Interaction Recording</label>
                                    <audio 
                                        controls 
                                        controlsList="nodownload"
                                        style={{ width: '100%', height: '36px' }}
                                    >
                                        <source src={selectedLeadForDetails.last_recording_url} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}

                            <div style={{ background: '#ffffff', padding: '0px', borderRadius: '0px' }}>
                                <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '14px', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🚀 Candidate Screening Questionnaire</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {[
                                        { label: 'Current Situation', value: getLeadField(selectedLeadForDetails, ['currentSituation', 'what_best_describes_your_current_situation?', 'what_best_describes_your_current_situation']) },
                                        { label: 'Primary Goal', value: getLeadField(selectedLeadForDetails, ['primaryGoal', 'what_is_your_primary_goal_right_now?', 'what_is_your_primary_goal_right_now']) },
                                        { label: 'Career Challenge', value: getLeadField(selectedLeadForDetails, ['currentChallenge', 'what_is_your_biggest_career_challenge?', 'what_is_your_biggest_career_challenge']) },
                                        { label: 'Interest Reason', value: getLeadField(selectedLeadForDetails, ['interestReason']) },
                                        { label: 'Investment Readiness', value: getLeadField(selectedLeadForDetails, ['readyToInvest', 'upskilling_ready', 'are_you_willing_to_invest_in_a_program_that_provides_training_+internship+100%_placement_support?', 'are_you_willing_to_invest_in_a_program_that_provides_training_+_internship_+100%_placement_support?']) },
                                    ].map((item, i) => (
                                        item.value && (
                                            <div key={i} style={{ padding: '12px', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #bae6fd' }}>
                                                <div style={{ fontSize: '10px', fontWeight: '800', color: '#0369a1', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8 }}>{item.label}</div>
                                                <div style={{ fontSize: '13px', color: '#0f172a', fontWeight: '600', lineHeight: '1.4' }}>{item.value || '—'}</div>
                                            </div>
                                        )
                                    ))}

                                    {Object.entries(selectedLeadForDetails.extra_fields || {})
                                        .filter(([key]) => ![
                                            'what_best_describes_your_current_situation?',
                                            'what_is_your_primary_goal_right_now?',
                                            'what_is_your_biggest_career_challenge?',
                                            'are_you_willing_to_invest_in_a_program_that_provides_training_+internship+100%_placement_support?',
                                            'are_you_willing_to_invest_in_a_program_that_provides_training_+_internship_+100%_placement_support?'
                                        ].includes(key))
                                        .map(([key, val]) => (
                                            <div key={key}>
                                                <div style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>{key.replace(/_/g, ' ')}</div>
                                                <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>{val || '—'}</div>
                                            </div>
                                        ))}
                                    
                                    {(!selectedLeadForDetails.extra_fields || Object.keys(selectedLeadForDetails.extra_fields).length === 0) && ![
                                        'what_best_describes_your_current_situation?',
                                        'what_is_your_primary_goal_right_now?',
                                        'what_is_your_biggest_career_challenge?',
                                        'are_you_willing_to_invest_in_a_program_that_provides_training_+internship+100%_placement_support?',
                                        'are_you_willing_to_invest_in_a_program_that_provides_training_+_internship_+100%_placement_support?'
                                    ].some(k => selectedLeadForDetails.extra_fields?.[k] || selectedLeadForDetails[k]) && (
                                        <div style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '13px', textAlign: 'center', padding: '20px' }}>No questionnaire data available.</div>
                                    )}
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '30px' }}>
                                <button 
                                    onClick={() => setSelectedLeadForDetails(null)} 
                                    style={{ width: '100%', padding: '14px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdvLeadManagement;
