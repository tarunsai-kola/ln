import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';

const AdminReports = () => {
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        stage: 'all',
    });
    const [loading, setLoading] = useState(false);

    const handleDownload = async (type, format) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API}/api/adv-reports/export/${type}`, {
                params: { ...filters, format },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${type}_report_${new Date().toISOString().split('T')[0]}.${format === 'csv' ? 'csv' : format === 'excel' ? 'xlsx' : 'pdf'}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success(`${type.toUpperCase()} report downloaded successfully`);
        } catch (error) {
            toast.error(`Failed to download ${type} report`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50 text-slate-700 font-sans p-6" style={{ overflowX: 'hidden' }}>
            <Toaster toastOptions={{ style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' } }} />
            
            <div className="max-w-7xl mx-auto py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reporting Center</h1>
                    <p className="text-slate-600 mt-1">Export system data for business intelligence and compliance</p>
                </div>

                {/* Filters Section */}
                <div className="bg-slate-50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">Start Date</label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">End Date</label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">Lead Stage</label>
                        <select
                            value={filters.stage}
                            onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
                        >
                            <option value="all">All Stages</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="interested">Interested</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                        </select>
                    </div>
                </div>

                {/* Report Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Leads Report */}
                    <div className="bg-slate-50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between hover:bg-slate-50 transition-all group">
                        <div>
                            <div className="w-14 h-14 bg-indigo-500/20 text-indigo-600 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:scale-105 transition-transform">
                                <i className="fa fa-users"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Leads Master Report</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">Full dump of lead data including contact info, current stage, and assigned owner.</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDownload('leads', 'csv')}
                                disabled={loading}
                                className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-100 hover:text-slate-900 border border-slate-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <i className="fa fa-file-text-o"></i> CSV
                            </button>
                            <button
                                onClick={() => handleDownload('leads', 'excel')}
                                disabled={loading}
                                className="flex-1 py-3 bg-indigo-600 text-slate-900 font-bold rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <i className="fa fa-file-excel-o"></i> Excel
                            </button>
                        </div>
                    </div>

                    {/* Call Logs */}
                    <div className="bg-slate-50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between hover:bg-slate-50 transition-all group">
                        <div>
                            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-105 transition-transform">
                                <i className="fa fa-phone"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Call Activity Logs</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">Detailed record of all interactions, outcomes, and call durations by agents.</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDownload('calls', 'csv')}
                                disabled={loading}
                                className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-100 hover:text-slate-900 border border-slate-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <i className="fa fa-file-text-o"></i> CSV
                            </button>
                            <button
                                onClick={() => handleDownload('calls', 'excel')}
                                disabled={loading}
                                className="flex-1 py-3 bg-emerald-600 text-slate-900 font-bold rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <i className="fa fa-file-excel-o"></i> Excel
                            </button>
                        </div>
                    </div>

                    {/* Conversions PDF */}
                    <div className="bg-slate-50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between hover:bg-slate-50 transition-all group">
                        <div>
                            <div className="w-14 h-14 bg-rose-500/20 text-rose-600 border border-rose-500/30 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-[0_0_15px_rgba(244,63,94,0.15)] group-hover:scale-105 transition-transform">
                                <i className="fa fa-trophy"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Sales Conversion Report</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">Executive summary of all converted leads. Optimized for PDF presentation.</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDownload('conversions', 'csv')}
                                disabled={loading}
                                className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-100 hover:text-slate-900 border border-slate-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <i className="fa fa-file-text-o"></i> CSV
                            </button>
                            <button
                                onClick={() => handleDownload('conversions', 'pdf')}
                                disabled={loading}
                                className="flex-1 py-3 bg-rose-600 text-slate-900 font-bold rounded-xl hover:bg-rose-500 shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <i className="fa fa-file-pdf-o"></i> PDF
                            </button>
                        </div>
                    </div>

                    {/* Follow-ups */}
                    <div className="bg-slate-50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between opacity-60 cursor-not-allowed">
                        <div>
                            <div className="w-14 h-14 bg-slate-100 text-slate-600 border border-slate-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                                <i className="fa fa-calendar-check-o"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Follow-up Schedules</h3>
                            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Upcoming and overdue follow-up tasks across the sales team (Coming Soon).</p>
                        </div>
                        <button disabled className="w-full py-3 bg-slate-50 text-slate-500 font-bold rounded-xl border border-slate-200 cursor-not-allowed">
                            Unavailable
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
