import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    Cell, PieChart, Pie, LineChart, Line, Area, AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Database, Target, PhoneCall, Info, Users, X, ChevronRight, Award, DollarSign, AlertCircle, BarChart2, Filter, RotateCw } from 'lucide-react';
import API from '../API';

// ────────────── CALL OUTCOME CONFIG ──────────────
const OUTCOMES = [
    { key: 'fresh',              label: 'Fresh',             icon: 'fiber_new',       color: '#64748B', bg: '#f1f5f9' },
    { key: 'interested',         label: 'Interested',        icon: 'check_circle',    color: '#10B981', bg: '#ecfdf5' },
    { key: 'follow_up',          label: 'Follow Up',         icon: 'call',            color: '#3B82F6', bg: '#eff6ff' },
    { key: 'callback_requested', label: 'Callback',          icon: 'history',         color: '#8B5CF6', bg: '#f5f3ff' },
    { key: 'no_answer',          label: 'No Answer',         icon: 'phone_disabled',  color: '#F59E0B', bg: '#fffbeb' },
    { key: 'not_interested',     label: 'Not Interested',    icon: 'cancel',          color: '#EF4444', bg: '#fef2f2' },
    { key: 'junk',               label: 'Junk',              icon: 'delete',          color: '#94A3B8', bg: '#f8fafc' },
    { key: 'converted',          label: 'Converted',         icon: 'stars',           color: '#EC4899', bg: '#fdf4ff' },
    { key: 'unused',             label: 'Unused',            icon: 'block',           color: '#CBD5E1', bg: '#f8fafc' },
];

const AdminAnalytics = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [stats, setStats] = useState({ totalLeads: 0, freshLeads: 0, convertedLeads: 0, totalCallsToday: 0 });
    const [compStats, setCompStats] = useState({ summary: { total: 0, converted: 0, junk: 0 }, growth: { total: 0, converted: 0, junk: 0 }, domainBreakdown: [], sourceBreakdown: [] });
    const [funnel, setFunnel] = useState({ total: 0, assigned: 0, contacted: 0, followups: 0, converted: 0 });
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    // [x] Refactor Team Analysis Grid
    // [/] Refactor Side Drawer (Member Drill-down) & Logs Table
    const [teamData, setTeamData] = useState({ managers: [], leaders: [], specialists: [] });
    const [teamLoading, setTeamLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [memberMonthly, setMemberMonthly] = useState([]);
    const [memberLoading, setMemberLoading] = useState(false);
    const [activeRoleTab, setActiveRoleTab] = useState('specialists');
    const [teamSearchQuery, setTeamSearchQuery] = useState('');
    const drawerRef = useRef(null);

    // Outcome logs
    const [selectedOutcome, setSelectedOutcome] = useState(null);
    const [outcomeLogs, setOutcomeLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [sourceFilter, setSourceFilter] = useState('');
    const [uniqueSources, setUniqueSources] = useState([]);
    const [logsPage, setLogsPage] = useState(1);
    const [totalLogsPages, setTotalLogsPages] = useState(1);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1];

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, funnelRes, boardRes, compRes] = await Promise.allSettled([
                axios.get(`${API}/api/adv-reports/admin-global-stats`),
                axios.get(`${API}/api/adv-reports/funnel`),
                axios.get(`${API}/api/adv-reports/leaderboard`),
                axios.get(`${API}/api/adv-reports/comprehensive-stats?month=${selectedMonth}&year=${selectedYear}`)
            ]);
            if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
            if (funnelRes.status === 'fulfilled') setFunnel(funnelRes.value.data);
            if (boardRes.status === 'fulfilled') setLeaderboard(boardRes.value.data || []);
            if (compRes.status === 'fulfilled') setCompStats(compRes.value.data);
        } catch (err) {
            toast.error("Failed to fetch analytics");
        } finally {
            setLoading(false);
        }
    };

    const fetchTeamAnalysis = async () => {
        setTeamLoading(true);
        try {
            const res = await axios.get(`${API}/api/adv-reports/team-analysis?month=${selectedMonth}&year=${selectedYear}`);
            setTeamData(res.data || { managers: [], leaders: [], specialists: [] });
        } catch {
            toast.error("Failed to fetch team analysis");
        } finally {
            setTeamLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchTeamAnalysis();
    }, [selectedMonth, selectedYear]);

    // Close drawer on outside click
    useEffect(() => {
        const handler = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target)) {
                setDrawerOpen(false);
            }
        };
        if (drawerOpen) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [drawerOpen]);

    const fetchOutcomeLogs = async (member, outcome, source = '', page = 1) => {
        // If clicking same outcome with no source filter and on page 1, toggle close
        if (selectedOutcome === outcome && source === sourceFilter && source === '' && page === 1) {
            setSelectedOutcome(null);
            setOutcomeLogs([]);
            setSourceFilter('');
            setLogsPage(1);
            return;
        }

        setSelectedOutcome(outcome);
        setSourceFilter(source);
        setLogsPage(page);
        setLogsLoading(true);

        try {
            const res = await axios.get(
                `${API}/api/adv-reports/member-outcome-logs?memberId=${member._id}&outcome=${outcome}&month=${selectedMonth}&year=${selectedYear}${source ? `&source=${encodeURIComponent(source)}` : ''}&page=${page}&limit=20`
            );
            const logs = res.data?.logs || [];
            setOutcomeLogs(logs);
            setTotalLogsPages(res.data?.pages || 1);

            // Extract unique raw source values (as stored in DB) for filter dropdown
            if (source === '' && page === 1) {
                const rawSources = [...new Set(
                    logs.map(l => l.sourceRaw || l.source?.replace(/\s+/g, '_').toLowerCase()).filter(Boolean)
                )].sort();
                setUniqueSources(rawSources);
            }
        } catch {
            toast.error('Failed to load call logs');
        } finally {
            setLogsLoading(false);
        }
    };

    const handleMarkDialed = async (leadId) => {
        if (!window.confirm("Are you sure you want to reset this lead to 'Dialed'? This will delete its current outcome and logs.")) return;
        
        try {
            await axios.put(`${API}/api/adv-leads/make-dialed/${leadId}`);
            toast.success("Lead reset to Dialed status");
            // Re-fetch only the logs for the current outcome to reflect changes
            fetchOutcomeLogs(selectedMember, selectedOutcome, sourceFilter);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to reset lead");
        }
    };

    const openMemberDrawer = async (member) => {
        setSelectedMember(member);
        setDrawerOpen(true);
        setMemberMonthly([]);
        setMemberLoading(true);
        setSelectedOutcome(null);
        setOutcomeLogs([]);
        try {
            const res = await axios.get(`${API}/api/adv-reports/member-monthly?memberId=${member._id}&year=${selectedYear}`);
            setMemberMonthly(res.data || []);
        } catch {
            toast.error("Failed to fetch member trend");
        } finally {
            setMemberLoading(false);
        }
    };

    const calculateWidth = (val) => {
        if (!funnel.total || funnel.total === 0) return '5%';
        const pct = Math.max(5, (val / funnel.total) * 100);
        return `${pct}%`;
    };

    const fmt = (n) => (n || 0).toLocaleString('en-IN');
    const fmtRs = (n) => `₹${(n || 0).toLocaleString('en-IN')}`;

    const StatusIndicator = ({ value }) => (
        <span style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '12px', fontWeight: '600',
            color: value >= 0 ? '#10B981' : '#EF4444',
            background: value >= 0 ? '#ecfdf5' : '#fef2f2',
            padding: '2px 8px', borderRadius: '12px', marginTop: '5px'
        }}>
            {value >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(value)}%
        </span>
    );

    // Filter members by search
    const getFilteredMembers = () => {
        const list = teamData[activeRoleTab] || [];
        if (!teamSearchQuery.trim()) return list;
        const q = teamSearchQuery.toLowerCase();
        return list.filter(m => 
            (m.name || '').toLowerCase().includes(q) ||
            (m.team || '').toLowerCase().includes(q)
        );
    };

    // Rank badge
    const RankBadge = ({ idx }) => {
        if (idx === 0) return <span style={{ fontSize: '20px' }}>🥇</span>;
        if (idx === 1) return <span style={{ fontSize: '20px' }}>🥈</span>;
        if (idx === 2) return <span style={{ fontSize: '20px' }}>🥉</span>;
        return <span style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', minWidth: '24px', textAlign: 'center' }}>#{idx + 1}</span>;
    };

    // ── Custom Tooltip for recharts ──
    const RevenueTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div style={{ background: '#1e293b', padding: '12px 16px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', minWidth: '160px' }}>
                <p style={{ margin: '0 0 8px', color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>{label}</p>
                {payload.map((p, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', color: p.color, fontSize: '13px', fontWeight: '700' }}>
                        <span>{p.name}</span>
                        <span>₹{(p.value || 0).toLocaleString('en-IN')}</span>
                    </div>
                ))}
            </div>
        );
    };

    const LeadTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div style={{ background: '#1e293b', padding: '12px 16px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                <p style={{ margin: '0 0 8px', color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>{label}</p>
                {payload.map((p, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', color: p.color, fontSize: '13px', fontWeight: '700' }}>
                        <span>{p.name}</span>
                        <span>{p.value || 0}</span>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) return (
        <div id="create-marketing-team" className="admin-content-wrap">
            <div className="coursetable" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div className="loader">Loading analytics...</div>
            </div>
        </div>
    );

    const roleTabs = [
        { key: 'specialists', label: 'SR Specialists', icon: 'support_agent', count: teamData.specialists?.length || 0 },
        { key: 'leaders',     label: 'Team Leaders',   icon: 'manage_accounts', count: teamData.leaders?.length || 0 },
        { key: 'managers',    label: 'Managers',        icon: 'admin_panel_settings', count: teamData.managers?.length || 0 },
    ];

    const filteredMembers = getFilteredMembers();

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50/50 p-6 sm:p-10 font-sans">
            <Toaster position="top-center" />
            <div className="max-w-[1600px] mx-auto space-y-10">
                {/* Header with Filters */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight m-0 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                            Insights Dashboard
                        </h1>
                        <p className="text-sm font-medium text-slate-500 mt-2 m-0 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Performance analysis & live lead breakdown
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/60 backdrop-blur-xl">
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-slate-600 font-medium text-sm">
                            <Calendar size={16} className="text-blue-500" />
                            <select 
                                value={selectedMonth} 
                                onChange={(e) => setSelectedMonth(e.target.value)} 
                                className="bg-transparent border-none outline-none cursor-pointer appearance-none pr-2 font-bold text-slate-800"
                            >
                                {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                            </select>
                        </div>
                        <div className="px-3 py-2 bg-slate-50 rounded-xl text-slate-600 font-medium text-sm">
                            <select 
                                value={selectedYear} 
                                onChange={(e) => setSelectedYear(e.target.value)} 
                                className="bg-transparent border-none outline-none cursor-pointer appearance-none pr-2 font-bold text-slate-800"
                            >
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Leads', value: compStats.summary.total, growth: compStats.growth.total, icon: <Database size={24} className="text-blue-500" />, bg: 'bg-blue-500', glow: 'shadow-blue-500/20' },
                        { label: 'Conversions', value: compStats.summary.converted, growth: compStats.growth.converted, icon: <Target size={24} className="text-emerald-500" />, bg: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
                        { label: 'Junk Leads', value: compStats.summary.junk, growth: compStats.growth.junk, icon: <Info size={24} className="text-rose-500" />, bg: 'bg-rose-500', glow: 'shadow-rose-500/20' },
                        { label: 'Calls Today', value: stats.totalCallsToday, icon: <PhoneCall size={24} className="text-indigo-500" />, bg: 'bg-indigo-500', glow: 'shadow-indigo-500/20' }
                    ].map((kpi, i) => (
                        <div key={i} className={`relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group`}>
                            {/* Subtle background glow effect */}
                            <div className={`absolute -right-8 -top-8 w-24 h-24 ${kpi.bg} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}></div>
                            
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-2xl bg-white shadow-md ${kpi.glow}`}>
                                    {kpi.icon}
                                </div>
                                {kpi.growth !== undefined && (
                                    <StatusIndicator value={kpi.growth} />
                                )}
                            </div>
                            
                            <div className="relative z-10">
                                <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">{kpi.label}</p>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight m-0">{(kpi.value || 0).toLocaleString()}</h2>
                            </div>
                        </div>
                    ))}
                </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 gap-6">
                {/* Domain Analysis - FULL WIDTH & HORIZONTAL */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-indigo-50 rounded-xl">
                            <BarChart2 size={20} className="text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 m-0">
                            Analysis by Domain <span className="text-slate-400 font-medium ml-2">— {months[selectedMonth-1]} {selectedYear}</span>
                        </h3>
                    </div>
                    <div style={{ height: Math.max(400, (compStats.domainBreakdown?.length || 0) * 35) + 'px' }} className="w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                layout="vertical" 
                                data={compStats.domainBreakdown} 
                                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                            >
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis 
                                    dataKey="domain" 
                                    type="category" 
                                    width={140} 
                                    stroke="#475569" 
                                    fontSize={12} 
                                    fontWeight="600"
                                    tickLine={false} 
                                    axisLine={false}
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                                />
                                <Bar dataKey="total" fill="#3b82f6" name="Total Leads" radius={[0, 4, 4, 0]} barSize={16} />
                                <Bar dataKey="converted" fill="#10b981" name="Converted" radius={[0, 4, 4, 0]} barSize={16} />
                                <Bar dataKey="junk" fill="#f43f5e" name="Junk" radius={[0, 4, 4, 0]} barSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Source Analysis */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 m-0 mb-8">Analysis by Source</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={compStats.sourceBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="source" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                                <Bar dataKey="total" fill="#6366f1" name="Total Leads" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mb-10">
                {/* Funnel */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 m-0 mb-8">Conversion Funnel Efficiency</h3>
                    <div className="flex flex-col gap-4 flex-1 justify-center">
                        {[
                            { label: 'Total Leads', value: funnel.total, color: 'from-blue-400 to-blue-600', bg: 'bg-blue-500' },
                            { label: 'Assigned', value: funnel.assigned, color: 'from-indigo-400 to-indigo-600', bg: 'bg-indigo-500' },
                            { label: 'Contacted', value: funnel.contacted, color: 'from-violet-400 to-violet-600', bg: 'bg-violet-500' },
                            { label: 'Follow-ups', value: funnel.followups, color: 'from-purple-400 to-purple-600', bg: 'bg-purple-500' },
                            { label: 'Converted ✅', value: funnel.converted, color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-500' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-[120px] text-sm font-semibold text-slate-600">{item.label}</div>
                                <div className="flex-1 bg-slate-50 rounded-full h-10 overflow-hidden relative shadow-inner border border-slate-100">
                                    <div 
                                        style={{ width: calculateWidth(item.value) }} 
                                        className={`h-full bg-gradient-to-r ${item.color} flex items-center pl-4 text-white text-sm font-bold shadow-sm transition-all duration-1000 ease-out`}
                                    >
                                        {item.value}
                                    </div>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                                        {funnel.total > 0 ? ((item.value / funnel.total) * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-400 opacity-[0.03] rounded-full blur-3xl"></div>
                    
                    <h3 className="text-lg font-bold text-slate-800 m-0 mb-8 flex items-center gap-2">
                        <span className="text-xl">🏆</span> Hall of Fame
                    </h3>
                    
                    {leaderboard.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 font-medium bg-slate-50 rounded-2xl">No data for current filters.</div>
                    ) : (
                        <div className="space-y-3 relative z-10">
                            {leaderboard.slice(0, 5).map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                                        idx === 0 ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-200 shadow-sm shadow-amber-100' :
                                        idx === 1 ? 'bg-gradient-to-r from-slate-50 to-slate-100/50 border-slate-200 shadow-sm' :
                                        idx === 2 ? 'bg-gradient-to-r from-orange-50 to-orange-100/50 border-orange-200 shadow-sm' :
                                        'bg-white border-slate-100 hover:border-slate-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                                            idx === 0 ? 'bg-white text-amber-500 shadow-sm' :
                                            idx === 1 ? 'bg-white text-slate-500 shadow-sm' :
                                            idx === 2 ? 'bg-white text-orange-600 shadow-sm' :
                                            'bg-slate-50 text-slate-400'
                                        }`}>
                                            {idx === 0 ? '1' : idx === 1 ? '2' : idx === 2 ? '3' : idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="m-0 text-sm font-bold text-slate-800">{item.name}</h4>
                                            <p className="m-0 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Rank {idx + 1}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xl font-black ${idx < 3 ? 'text-emerald-600' : 'text-slate-700'}`}>{item.conversions}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conv</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* TEAM ANALYSIS SECTION                                   */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div className="mt-4">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Users size={28} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 m-0 tracking-tight">Team Analysis</h2>
                            <p className="text-sm font-medium text-slate-500 m-0 mt-0.5">
                                Click any member to view drill-down analytics & revenue
                            </p>
                        </div>
                    </div>
                    {/* Search */}
                    <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200/60 shadow-sm min-w-[280px] focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                        <input
                            value={teamSearchQuery}
                            onChange={e => setTeamSearchQuery(e.target.value)}
                            placeholder="Search team members..."
                            className="border-none outline-none text-sm font-semibold text-slate-800 bg-transparent w-full"
                        />
                    </div>
                </div>

                {/* Role Tabs */}
                <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200/60 w-fit shadow-sm overflow-x-auto max-w-full hide-scrollbar">
                    {roleTabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveRoleTab(tab.key)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                                activeRoleTab === tab.key 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25' 
                                : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                            {tab.label}
                            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                                activeRoleTab === tab.key ? 'bg-white/25 text-white' : 'bg-slate-100 text-indigo-500'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Members Grid */}
                {teamLoading ? (
                    <div className="flex flex-col items-center justify-center h-[250px] bg-white rounded-3xl border border-slate-200/60 shadow-sm">
                        <span className="material-symbols-outlined text-4xl text-indigo-500 animate-spin mb-4">sync</span>
                        <p className="font-bold text-slate-500 text-sm tracking-wide">Loading team data...</p>
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
                        <span className="material-symbols-outlined text-5xl mb-4">group_off</span>
                        <p className="font-bold text-base m-0 text-slate-500">
                            {teamSearchQuery ? `No members match "${teamSearchQuery}"` : 'No members in this category'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {filteredMembers.map((member, idx) => {
                            const convRate = member.totalLeads > 0
                                ? ((member.converted / member.totalLeads) * 100).toFixed(1)
                                : '0.0';
                            
                            const gradients = [
                                'from-indigo-500 to-purple-500',
                                'from-emerald-400 to-teal-500',
                                'from-amber-400 to-orange-500',
                                'from-rose-400 to-red-500',
                                'from-violet-500 to-fuchsia-500',
                                'from-pink-400 to-rose-500'
                            ];
                            const bgGradient = gradients[idx % gradients.length];

                            return (
                                <div
                                    key={member._id}
                                    onClick={() => openMemberDrawer(member)}
                                    className="group relative bg-white rounded-3xl border border-slate-200/60 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 overflow-hidden"
                                >
                                    {/* Rank accent */}
                                    {idx < 3 && (
                                        <div className={`absolute top-0 right-0 w-0 h-0 border-solid border-t-0 border-r-[50px] border-b-[50px] border-l-0 ${
                                            idx === 0 ? 'border-r-amber-400' : idx === 1 ? 'border-r-slate-400' : 'border-r-orange-500'
                                        } border-b-transparent border-l-transparent`}></div>
                                    )}

                                    {/* Member Header */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bgGradient} flex items-center justify-center text-white font-black text-xl shadow-md shrink-0`}>
                                            {(member.name || '?')[0]?.toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <RankBadge idx={idx} />
                                                <h3 className="m-0 text-base font-black text-slate-800 truncate">{member.name}</h3>
                                            </div>
                                            <p className="m-0 mt-1 text-xs font-bold text-slate-500">
                                                {member.designation} <span className="mx-1">•</span> <span className="text-indigo-600">{member.team}</span>
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <div className="text-xl font-black text-indigo-600">{fmt(member.totalLeads)}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Leads</div>
                                        </div>
                                    </div>

                                    {/* Outcome Chips Row */}
                                    <div className="flex gap-2 flex-wrap mb-5">
                                        {OUTCOMES.map(o => {
                                            if (!member[o.key]) return null;
                                            return (
                                                <div key={o.key} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-100" style={{ backgroundColor: o.bg }}>
                                                    <span className="material-symbols-outlined text-[14px]" style={{ color: o.color }}>{o.icon}</span>
                                                    <span className="text-xs font-black" style={{ color: o.color }}>{fmt(member[o.key] || 0)}</span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Revenue & Conversion Footer */}
                                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100/80">
                                        <div className="text-center">
                                            <div className="text-sm font-black text-emerald-500">{fmtRs(member.totalRevenue)}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Rev</div>
                                        </div>
                                        <div className="text-center border-l border-r border-slate-100/80">
                                            <div className="text-sm font-black text-amber-500">{fmtRs(member.pendingRevenue)}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pending</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-black text-indigo-500">{convRate}%</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Conv Rate</div>
                                        </div>
                                    </div>

                                    {/* View Details Hint */}
                                    <div className="flex items-center justify-center gap-1 mt-4 text-xs font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>View full analytics</span>
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* SIDE DRAWER — MEMBER DRILL-DOWN                         */}
            {/* ═══════════════════════════════════════════════════════ */}

            {/* Overlay */}
            {drawerOpen && (
                <div
                    onClick={() => setDrawerOpen(false)}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[1000] animate-in fade-in duration-300"
                />
            )}

            {/* Drawer Panel */}
            <div
                ref={drawerRef}
                className={`fixed top-0 right-0 h-screen w-full max-w-[680px] bg-white z-[1001] flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    drawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {selectedMember && (
                    <div className="flex flex-col h-full overflow-hidden">
                        {/* Drawer Header */}
                        <div className="p-8 pb-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shrink-0 shadow-inner">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black border border-white/30 shadow-sm">
                                        {(selectedMember.name || '?')[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="m-0 text-2xl font-black tracking-tight">{selectedMember.name}</h2>
                                        <p className="m-0 mt-1 text-indigo-100 font-semibold text-sm">
                                            {selectedMember.designation} <span className="mx-1.5 opacity-50">•</span> {selectedMember.team}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setDrawerOpen(false)} 
                                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Revenue Summary in header */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'Total Revenue', value: fmtRs(selectedMember.totalRevenue), icon: <DollarSign size={16} />, },
                                    { label: 'Pending', value: fmtRs(selectedMember.pendingRevenue), icon: <AlertCircle size={16} />, },
                                    { label: 'Total Leads', value: fmt(selectedMember.totalLeads), icon: <BarChart2 size={16} />, },
                                ].map((s, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                                        <div className="flex items-center gap-1.5 text-indigo-100 mb-1.5 text-xs font-bold uppercase tracking-wider">
                                            {s.icon} {s.label}
                                        </div>
                                        <div className="text-xl font-black">{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Drawer Body */}
                        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                            {/* All 9 Outcome Breakdown */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="m-0 text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <Award size={20} className="text-indigo-500" /> Lead Outcome Breakdown
                                    </h3>
                                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Click card for logs</span>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-3">
                                    {OUTCOMES.map(o => {
                                        const val = selectedMember[o.key] || 0;
                                        const pct = selectedMember.totalLeads > 0 ? ((val / selectedMember.totalLeads) * 100).toFixed(1) : '0.0';
                                        const isActive = selectedOutcome === o.key;
                                        return (
                                            <div
                                                key={o.key}
                                                onClick={() => {
                                                    setSourceFilter('');
                                                    fetchOutcomeLogs(selectedMember, o.key);
                                                }}
                                                className={`rounded-2xl p-4 border-2 cursor-pointer transition-all duration-200 group ${
                                                    isActive 
                                                    ? 'scale-[1.02] shadow-lg shadow-indigo-500/20' 
                                                    : 'hover:-translate-y-1 hover:shadow-md'
                                                }`}
                                                style={{
                                                    backgroundColor: isActive ? o.color : '#fff',
                                                    borderColor: isActive ? o.color : o.color + '20'
                                                }}
                                            >
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <span className="material-symbols-outlined text-[16px]" style={{ color: isActive ? '#fff' : o.color }}>{o.icon}</span>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? '#fff' : o.color }}>{o.label}</span>
                                                </div>
                                                <div className={`text-2xl font-black leading-none ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? '#fff' : o.color }}>{fmt(val)}</div>
                                                <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : `${o.color}20` }}>
                                                    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, backgroundColor: isActive ? '#fff' : o.color }} />
                                                </div>
                                                <div className={`text-[10px] font-bold mt-1.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{pct}% of total</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* ── Call Logs Panel ── */}
                                {selectedOutcome && (
                                    <div className="mt-6 rounded-3xl bg-white border shadow-sm overflow-hidden animate-in slide-in-from-top-4 duration-300" style={{ borderColor: `${OUTCOMES.find(o => o.key === selectedOutcome)?.color}30` }}>
                                        {/* Panel Header */}
                                        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: `${OUTCOMES.find(o => o.key === selectedOutcome)?.color}08`, borderColor: `${OUTCOMES.find(o => o.key === selectedOutcome)?.color}20` }}>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg" style={{ color: OUTCOMES.find(o => o.key === selectedOutcome)?.color }}>
                                                    {OUTCOMES.find(o => o.key === selectedOutcome)?.icon}
                                                </span>
                                                <span className="font-bold text-sm text-slate-800">
                                                    {OUTCOMES.find(o => o.key === selectedOutcome)?.label} Leads
                                                </span>
                                                {!logsLoading && (
                                                    <span className="text-[10px] font-black text-white px-2 py-0.5 rounded-full ml-2 shadow-sm" style={{ backgroundColor: OUTCOMES.find(o => o.key === selectedOutcome)?.color }}>
                                                        {outcomeLogs.length} records
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {/* Source Filter Dropdown */}
                                                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20">
                                                    <Filter size={14} className="text-slate-400" />
                                                    <select 
                                                        value={sourceFilter}
                                                        onChange={(e) => fetchOutcomeLogs(selectedMember, selectedOutcome, e.target.value)}
                                                        className="border-none bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer pr-4"
                                                    >
                                                        <option value="">All Sources</option>
                                                        {uniqueSources.map(s => (
                                                            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <button 
                                                    onClick={() => { setSelectedOutcome(null); setOutcomeLogs([]); setSourceFilter(''); }} 
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Logs Body */}
                                        {logsLoading ? (
                                            <div className="p-10 flex flex-col items-center justify-center">
                                                <span className="material-symbols-outlined text-3xl text-indigo-500 animate-spin mb-3">sync</span>
                                                <p className="text-sm font-bold text-slate-400 m-0">Fetching call logs...</p>
                                            </div>
                                        ) : outcomeLogs.length === 0 ? (
                                            <div className="p-10 flex flex-col items-center justify-center text-slate-400">
                                                <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                                                <p className="text-sm font-bold m-0">No call logs found for this outcome</p>
                                            </div>
                                        ) : (
                                            <div className="max-h-[380px] overflow-y-auto">
                                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                                        <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10 shadow-sm">
                                                            <tr>
                                                                {['#', 'Lead Name', 'Phone', 'Source', 'Domain', 'Date', 'Summary', 'Action'].map(h => (
                                                                    <th key={h} className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-100">
                                                            {outcomeLogs.map((log, i) => (
                                                                <tr key={log._id} className="hover:bg-slate-50 transition-colors group">
                                                                    <td className="px-4 py-3 text-xs font-bold text-slate-400">{(logsPage - 1) * 20 + i + 1}</td>
                                                                    <td className="px-4 py-3 text-sm font-bold text-slate-800">{log.name}</td>
                                                                    <td className="px-4 py-3 text-xs font-mono font-medium text-slate-500">
                                                                        {log.phone ? log.phone.slice(0, -4) + '••••' : '—'}
                                                                    </td>
                                                                    <td className="px-4 py-3">
                                                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                                            {log.source || '—'}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-4 py-3 text-xs font-bold text-indigo-600">{log.domain}</td>
                                                                    <td className="px-4 py-3 text-xs font-medium text-slate-500">
                                                                        {log.date ? new Date(log.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-xs font-medium text-slate-600 max-w-[200px] truncate" title={log.summary}>
                                                                        {log.summary || '—'}
                                                                    </td>
                                                                    <td className="px-4 py-3">
                                                                        <button
                                                                            onClick={() => handleMarkDialed(log._id)}
                                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                                                        >
                                                                            <RotateCw size={12} /> Dialed
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* Pagination Controls */}
                                                {totalLogsPages > 1 && (
                                                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-200">
                                                        <div className="text-xs font-bold text-slate-500">
                                                            Page <span className="text-slate-800">{logsPage}</span> of {totalLogsPages}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                disabled={logsPage === 1 || logsLoading}
                                                                onClick={() => fetchOutcomeLogs(selectedMember, selectedOutcome, sourceFilter, logsPage - 1)}
                                                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                                                                    logsPage === 1 
                                                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                                                                }`}
                                                            >
                                                                <span className="material-symbols-outlined text-[16px]">chevron_left</span> Prev
                                                            </button>
                                                            <button 
                                                                disabled={logsPage >= totalLogsPages || logsLoading}
                                                                onClick={() => fetchOutcomeLogs(selectedMember, selectedOutcome, sourceFilter, logsPage + 1)}
                                                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                                                                    logsPage >= totalLogsPages 
                                                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                                                                }`}
                                                            >
                                                                Next <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Monthly Trend Charts */}
                            <div>
                                <h3 className="m-0 mb-4 text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <BarChart2 size={20} className="text-indigo-500" /> Monthly Lead Trend — {selectedYear}
                                </h3>
                                {memberLoading ? (
                                    <div className="flex items-center justify-center h-[200px] bg-white rounded-3xl border border-slate-200 shadow-sm">
                                        <span className="material-symbols-outlined text-3xl text-indigo-500 animate-spin">sync</span>
                                    </div>
                                ) : (
                                    <div className="h-[220px] mb-8 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={memberMonthly} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                                    <Tooltip 
                                                        cursor={{ fill: '#f1f5f9' }} 
                                                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    />
                                                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                                                    <Bar dataKey="converted" name="Converted" fill="#10b981" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="interested" name="Interested" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="not_interested" name="Not Interested" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="junk" name="Junk" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>

                                        {/* Revenue Trend */}
                                        <h3 className="m-0 mb-4 text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <DollarSign size={20} className="text-emerald-500" /> Monthly Revenue Trend
                                        </h3>
                                        <div className="h-[220px] bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-4">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={memberMonthly} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="gradPend" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                                                    <Tooltip 
                                                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    />
                                                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                                                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={3} fill="url(#gradRev)" />
                                                    <Area type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={3} fill="url(#gradPend)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
            `}</style>
            </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
