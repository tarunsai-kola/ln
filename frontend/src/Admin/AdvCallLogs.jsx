import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';

const AdvCallLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLogs, setTotalLogs] = useState(0);
    const [playingUrl, setPlayingUrl] = useState(null);

    useEffect(() => {
        fetchLogs();
    }, [page]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/adv-reports/all-activities?page=${page}&limit=30`);
            setLogs(res.data.logs);
            setTotalPages(res.data.pages);
            setTotalLogs(res.data.total);
        } catch (error) {
            toast.error("Failed to fetch call activities");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const getOutcomeStyle = (outcome) => {
        const s = (outcome || "").toLowerCase();
        if (s.includes('converted') || s.includes('booked') || s.includes('won')) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
        if (s.includes('interested') || s.includes('connected')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
        if (s.includes('no_answer') || s.includes('rnr') || s.includes('busy') || s.includes('switched') || s.includes('not_reachable')) return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
        if (s.includes('junk') || s.includes('wrong') || s.includes('not_interested') || s.includes('lost')) return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
        if (s.includes('follow_up') || s.includes('callback')) return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    };

    const formatDuration = (seconds) => {
        const m = Math.floor((seconds || 0) / 60);
        const s = (seconds || 0) % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50 font-sans text-slate-700" style={{ paddingBottom: playingUrl ? '100px' : '40px' }}>
            <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' } }} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            <i className="fa fa-phone-square text-indigo-500"></i>
                            Call Activity Logs
                        </h1>
                        <p className="text-sm text-slate-600 mt-1">
                            Monitor and review team interactions with leads. Showing <span className="font-semibold text-slate-900">{totalLogs}</span> total records.
                        </p>
                    </div>
                    
                    {/* Pagination Controls Top */}
                    <div className="flex items-center gap-3 bg-slate-50 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                        <span className="text-sm font-medium text-slate-700 border-r border-slate-200 pr-3">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || loading}
                                className="p-1.5 rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                                title="Previous Page"
                            >
                                <i className="fa fa-chevron-left text-sm"></i>
                            </button>
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || loading}
                                className="p-1.5 rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                                title="Next Page"
                            >
                                <i className="fa fa-chevron-right text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-slate-50 backdrop-blur-md rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-white border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Lead Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Agent Details</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Outcome</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Recording</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Summary</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    Array(7).fill(0).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan="7" className="px-6 py-6 bg-slate-50">
                                                <div className="h-4 bg-slate-100 rounded w-full max-w-2xl mx-auto"></div>
                                            </td>
                                        </tr>
                                    ))
                                ) : logs.length > 0 ? logs.map((log) => {
                                    const { date, time } = formatDate(log.createdAt);
                                    const outcomeStyle = getOutcomeStyle(log.callOutcome || log.disposition);
                                    
                                    return (
                                        <tr key={log._id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-slate-900">{date}</div>
                                                <div className="text-xs text-slate-600 mt-0.5">{time}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-slate-900">{log.leadId?.full_name || 'Unknown Lead'}</div>
                                                <div className="text-xs text-indigo-600 font-medium mt-0.5 flex items-center gap-1.5">
                                                    <i className="fa fa-phone text-[10px]"></i> {log.leadId?.phone_number || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-sm text-indigo-300 shadow-sm">
                                                        {(log.specialistName || log.specialistId?.name || 'A').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-900">
                                                            {log.specialistName || log.specialistId?.name || 'Unknown Agent'}
                                                        </div>
                                                        <div className="text-[11px] font-medium text-slate-600 uppercase tracking-wide mt-0.5">
                                                            {log.teamId?.team_name || log.specialistId?.team_id?.team_name || 'Unassigned'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-start gap-1.5">
                                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide border ${outcomeStyle}`}>
                                                        {(log.callOutcome || log.disposition || 'N/A').replace(/_/g, ' ')}
                                                    </span>
                                                    {log.stage && (
                                                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                                                            Stage: {log.stage}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-slate-900">
                                                    {formatDuration(log.duration)}
                                                </div>
                                                <div className="text-xs text-slate-600 mt-0.5">Talk Time</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {log.recordingUrl ? (
                                                    <button 
                                                        onClick={() => setPlayingUrl(log.recordingUrl)}
                                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                                            playingUrl === log.recordingUrl 
                                                            ? 'bg-indigo-600 text-slate-900 shadow-md shadow-indigo-500/20' 
                                                            : 'bg-slate-100 text-indigo-600 border border-slate-600 hover:bg-slate-100 group-hover:scale-105'
                                                        }`}
                                                        title="Play Audio Recording"
                                                    >
                                                        <i className={`fa ${playingUrl === log.recordingUrl ? 'fa-volume-up animate-pulse' : 'fa-play'} text-xs ml-0.5`}></i>
                                                    </button>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200">
                                                        <i className="fa fa-microphone-slash text-[10px]"></i> None
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal min-w-[250px] max-w-sm">
                                                <div className="text-sm text-slate-700 line-clamp-2">
                                                    {log.summary || <span className="text-slate-500 italic">No summary provided.</span>}
                                                </div>
                                                {log.remark && (
                                                    <div className="mt-2 text-xs text-slate-700 bg-amber-500/10 border border-amber-500/20 p-2 rounded-md">
                                                        <span className="font-semibold text-amber-600 mr-1">Note:</span> 
                                                        {log.remark}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3 border border-slate-200">
                                                    <i className="fa fa-inbox text-2xl text-slate-500"></i>
                                                </div>
                                                <h3 className="text-sm font-medium text-slate-900">No Call Logs Found</h3>
                                                <p className="text-xs text-slate-600 mt-1">There are no call activities recorded for this period.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Pagination Details */}
                    {!loading && logs.length > 0 && (
                        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <p className="text-sm text-slate-600">
                                Showing <span className="font-semibold text-slate-900">{logs.length}</span> records on this page.
                            </p>
                            
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md shadow-sm hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-sm font-medium text-slate-700 px-2">
                                    {page} / {totalPages}
                                </span>
                                <button 
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md shadow-sm hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Audio Player Overlay */}
            {playingUrl && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl z-[100] px-4 animate-in slide-in-from-bottom-8 duration-300">
                    <div className="bg-slate-50 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] flex items-center gap-4 sm:gap-6">
                        <button 
                            onClick={() => setPlayingUrl(null)}
                            className="shrink-0 w-10 h-10 rounded-full bg-white text-slate-600 hover:bg-rose-500/20 hover:text-rose-600 border border-transparent hover:border-rose-500/30 flex items-center justify-center transition-all"
                            title="Close Player"
                        >
                            <i className="fa fa-times text-lg"></i>
                        </button>
                        
                        <div className="shrink-0 hidden sm:block">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                <i className="fa fa-headphones text-indigo-600 text-xl animate-pulse"></i>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Now Playing</span>
                                <span className="text-xs font-medium text-slate-600">Call Recording</span>
                            </div>
                            <audio 
                                src={playingUrl} 
                                controls 
                                autoPlay 
                                className="w-full h-8 outline-none custom-audio-player"
                                style={{
                                    filter: 'invert(100%) hue-rotate(180deg) contrast(1.2)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvCallLogs;
