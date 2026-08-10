import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import API from "../API";
import { CalendarDays, User, Clock, Video, MapPin, RefreshCw, Trash2, CalendarCheck, Calendar, Layers, Plus } from "lucide-react";

const CreateInterview = () => {
    const [interviewers, setInterviewers] = useState([]);
    const [formData, setFormData] = useState({
        interviewName: "",
        interviewerId: "",
        date: "",
        startTime: "",
        endTime: "",
        mode: "Online",
        maxParticipants: 0,
        description: ""
    });

    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        fetchInterviewers();
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            const res = await axios.get(`${API}/api/interview/all`);
            setInterviews(res.data);
        } catch (error) {
            console.error("Failed to fetch interviews", error);
        }
    };

    const fetchInterviewers = async () => {
        try {
            const res = await axios.get(`${API}/api/interviewer/all`);
            setInterviewers(res.data);
        } catch (error) {
            console.error("Failed to fetch interviewers", error);
            toast.error("Could not load interviewers");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/interview/create-interview`, formData);
            if (res.status === 201) {
                toast.success("Interview Schedule Created!");
                setFormData({
                    interviewName: "",
                    interviewerId: "",
                    date: "",
                    startTime: "",
                    endTime: "",
                    mode: "Online",
                    maxParticipants: 0,
                    description: ""
                });
                fetchInterviews(); // Refresh list
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Creation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this interview schedule?")) return;
        try {
            await axios.delete(`${API}/api/interview/delete-interview/${id}`);
            toast.success("Interview deleted successfully");
            fetchInterviews();
        } catch (error) {
            toast.error("Failed to delete interview");
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50 p-6 sm:p-10 font-sans relative overflow-hidden md:ml-64">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>

            <Toaster position="top-center" toastOptions={{ 
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } 
            }} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight m-0 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 flex items-center gap-3">
                        <CalendarCheck className="text-blue-600" size={36} />
                        Create Mentor Meeting
                    </h1>
                    <p className="text-base font-medium text-slate-500 mt-2 m-0 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Schedule and manage mentor sessions with assigned mentors
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-8 mb-10 relative overflow-hidden">
                    {/* Decorative subtle gradient in card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-slate-700 text-sm font-bold uppercase tracking-wider mb-2">
                                    <Layers size={16} className="text-blue-500" /> Session Title <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="interviewName"
                                    placeholder="e.g., Q&A Session"
                                    value={formData.interviewName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="flex items-center gap-2 text-slate-700 text-sm font-bold uppercase tracking-wider">
                                        <User size={16} className="text-blue-500" /> Assign Mentor <span className="text-rose-500">*</span>
                                    </label>
                                    <Link to="/CreateInterviewer" className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors flex items-center gap-1">
                                        <Plus size={12} /> New
                                    </Link>
                                </div>
                                <div className="relative">
                                    <select
                                        name="interviewerId"
                                        value={formData.interviewerId}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" className="text-slate-400">-- Select Mentor --</option>
                                        {interviewers.map((int) => (
                                            <option key={int._id} value={int._id} className="text-slate-900">{int.fullname}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                        <User size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-2 md:col-span-1">
                                <label className="flex items-center gap-2 text-slate-700 text-sm font-bold uppercase tracking-wider mb-2">
                                    <Calendar size={16} className="text-blue-500" /> Date <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-1">
                                <label className="flex items-center gap-2 text-slate-700 text-sm font-bold uppercase tracking-wider mb-2">
                                    <Clock size={16} className="text-blue-500" /> Start Time <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" className="text-slate-400">-- : --</option>
                                        {Array.from({ length: 24 }).map((_, i) => {
                                            const hour = i.toString().padStart(2, '0') + ":00";
                                            return <option key={hour} value={hour} className="text-slate-900">{hour}</option>;
                                        })}
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                        <Clock size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-1">
                                <label className="flex items-center gap-2 text-slate-700 text-sm font-bold uppercase tracking-wider mb-2">
                                    <Clock size={16} className="text-rose-500" /> End Time <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" className="text-slate-400">-- : --</option>
                                        {Array.from({ length: 24 }).map((_, i) => {
                                            const hour = i.toString().padStart(2, '0') + ":00";
                                            return <option key={hour} value={hour} className="text-slate-900">{hour}</option>;
                                        })}
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                        <Clock size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-1">
                                <label className="flex items-center gap-2 text-slate-700 text-sm font-bold uppercase tracking-wider mb-2">
                                    <Video size={16} className="text-blue-500" /> Mode
                                </label>
                                <div className="relative">
                                    <select
                                        name="mode"
                                        value={formData.mode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                        <MapPin size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-blue-600 text-white font-bold py-3.5 px-10 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <CalendarDays size={18} />
                                Schedule Session
                            </button>
                        </div>
                    </form>
                </div>

                {/* Schedule List Table */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative">
                    <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white z-10 relative">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 m-0">
                            Scheduled Sessions
                            <span className="bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded-lg ml-2">{interviews.length} Total</span>
                        </h3>
                        <button 
                            onClick={fetchInterviews} 
                            className="text-sm font-bold text-blue-600 hover:text-white hover:bg-blue-600 transition-colors flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100"
                        >
                            <RefreshCw size={16} /> Refresh
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Name</th>
                                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Mentor</th>
                                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Mode</th>
                                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {interviews.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400">
                                                <CalendarDays size={48} className="mb-4 text-slate-300" strokeWidth={1} />
                                                <p className="text-lg font-bold text-slate-600 mb-1">No Sessions Scheduled</p>
                                                <p className="text-sm">Create a session schedule above to see it here.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    interviews.map((item) => (
                                        <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <span className="font-bold text-slate-900 text-base">{item.interviewName}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                                                        <User size={14} />
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{item.interviewer?.fullname || "Unknown"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-800 font-semibold">{new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                    <span className="text-slate-500 font-mono text-xs flex items-center gap-1 mt-1">
                                                        <Clock size={12} /> {item.startTime} - {item.endTime}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border ${
                                                    item.mode === 'Online' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-700 border-slate-300'
                                                }`}>
                                                    {item.mode === 'Online' ? <Video size={12} /> : <MapPin size={12} />}
                                                    {item.mode}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                                                    item.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'
                                                }`}>
                                                    {item.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm ml-auto"
                                                        title="Delete Interview"
                                                    >
                                                        <Trash2 size={16} strokeWidth={2.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default CreateInterview;
