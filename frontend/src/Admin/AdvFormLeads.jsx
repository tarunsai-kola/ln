import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';

const AdvFormLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLeads, setTotalLeads] = useState(0);

    useEffect(() => {
        fetchLeads();
    }, [page]);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/adv-leads/get-adv-form-leads?page=${page}&limit=30`);
            if (res.data.success) {
                setLeads(res.data.leads);
                setTotalPages(res.data.totalPages);
                setTotalLeads(res.data.total);
            }
        } catch (error) {
            toast.error("Failed to fetch leads");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCRM = async (leadId) => {
        try {
            const res = await axios.post(`${API}/api/adv-leads/add-form-lead-to-crm`, { leadId });
            if (res.data.success) {
                toast.success(res.data.message);
                setLeads(prevLeads => prevLeads.map(l => 
                    String(l._id) === String(leadId) ? { ...l, isAddedToCRM: true } : l
                ));
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "";
            if (errorMsg.includes("already exists") || errorMsg.includes("already in the CRM")) {
                toast.success("Lead already exists in CRM. Marking as added.");
                setLeads(prevLeads => prevLeads.map(l => 
                    String(l._id) === String(leadId) ? { ...l, isAddedToCRM: true } : l
                ));
            } else {
                toast.error(errorMsg || "Failed to add lead to CRM");
            }
            console.error(error);
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50/50 p-6 sm:p-10 font-sans">
            <Toaster toastOptions={{ style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' } }} />
            
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight m-0">
                            Advanced Enrollment Leads
                        </h1>
                        <p className="text-slate-500 mt-1 m-0">Manage and track your inbound form submissions.</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl">
                            <i className="fa fa-users text-blue-500"></i>
                            <span className="text-sm font-bold text-blue-900 tracking-wide">
                                {totalLeads} Total Leads
                            </span>
                        </div>

                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                            <span className="flex items-center text-sm font-bold text-slate-600 border-r border-slate-200 pr-3">
                                Page {page} of {totalPages}
                            </span>
                            <div className="flex gap-1">
                                <button 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || loading}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                    title="Previous Page"
                                >
                                    <i className="fa fa-chevron-left text-xs"></i>
                                </button>
                                <button 
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages || loading}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                    title="Next Page"
                                >
                                    <i className="fa fa-chevron-right text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name & Email</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Domain & Goal</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Commitment</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Preferred Time</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="p-20 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <i className="fa fa-spinner fa-spin text-3xl text-blue-500"></i>
                                                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Loading Leads...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : leads.length > 0 ? (
                                    (() => {
                                        const grouped = leads.reduce((acc, lead) => {
                                            const d = new Date(lead.created_at);
                                            const dateKey = d.toLocaleDateString("en-GB");
                                            if (!acc[dateKey]) acc[dateKey] = [];
                                            acc[dateKey].push(lead);
                                            return acc;
                                        }, {});

                                        return Object.keys(grouped).sort((a, b) => {
                                            const dateA = new Date(a.split('/').reverse().join('-'));
                                            const dateB = new Date(b.split('/').reverse().join('-'));
                                            return dateB - dateA;
                                        }).map(date => (
                                            <React.Fragment key={date}>
                                                <tr className="bg-slate-50/50">
                                                    <td colSpan="7" className="px-6 py-3 border-y border-slate-200">
                                                        <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-widest">
                                                            <i className="fa fa-calendar-alt text-blue-500"></i> {date}
                                                        </div>
                                                    </td>
                                                </tr>
                                                {grouped[date].map((lead) => (
                                                    <tr key={lead._id} className="hover:bg-slate-50 transition-colors group">
                                                        <td className="px-6 py-4">
                                                            <div className="font-extrabold text-slate-900 text-sm">{lead.fullName}</div>
                                                            <div className="text-xs font-medium text-slate-500 mt-1">{lead.email}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-bold text-slate-700">{lead.contactNumber}</div>
                                                            <div className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1.5 uppercase tracking-wide">
                                                                <i className="fa fa-whatsapp text-[13px]"></i> WA: {lead.whatsappNumber}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-md inline-block mb-1.5">
                                                                {lead.domain}
                                                            </div>
                                                            <div className="text-xs font-medium text-slate-500 truncate max-w-[200px]" title={lead.primaryGoal}>{lead.primaryGoal}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-xs font-bold text-slate-700 mb-1">{lead.commitmentLevel}</div>
                                                            <div className={`text-[10px] uppercase font-black tracking-widest ${lead.readyToInvest === 'Yes, I\'m ready' ? 'text-emerald-600' : 'text-amber-500'}`}>
                                                                Invest: {lead.readyToInvest}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-bold text-slate-700 mb-1">{lead.connectTime}</div>
                                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lang: {lead.preferredLanguages?.join(', ')}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-xs font-bold text-slate-700">
                                                                {new Date(lead.created_at).toLocaleDateString()}
                                                            </div>
                                                            <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                                                                {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button 
                                                                onClick={() => !lead.isAddedToCRM && handleAddToCRM(lead._id)}
                                                                disabled={lead.isAddedToCRM}
                                                                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 ml-auto
                                                                    ${lead.isAddedToCRM 
                                                                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200 shadow-none' 
                                                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 border border-transparent'}`}
                                                            >
                                                                <i className={`fa ${lead.isAddedToCRM ? 'fa-check' : 'fa-plus'}`}></i>
                                                                {lead.isAddedToCRM ? 'Added' : 'Add to CRM'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ));
                                    })()
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-20 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-200">
                                                    <i className="fa fa-inbox text-3xl text-slate-400"></i>
                                                </div>
                                                <h3 className="text-base font-bold text-slate-900">No Enrollment Leads Found</h3>
                                                <p className="text-sm text-slate-500 mt-1">When leads submit the enrollment form, they will appear here.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvFormLeads;
