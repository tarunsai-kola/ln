import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { FaDatabase, FaCode, FaCheck, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const AdvExercisePage = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [replaceExisting, setReplaceExisting] = useState(false);
    const [jsonInput, setJsonInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch both advanced and regular courses
                const [advRes, regRes] = await Promise.all([
                    axios.get(`${API}/getadvcourses`),
                    axios.get(`${API}/getcourses`)
                ]);

                // Combine and Deduplicate (just in case)
                const combined = [...advRes.data, ...regRes.data];
                const uniqueCourses = combined.filter((course, index, self) =>
                    index === self.findIndex((c) => c._id === course._id)
                ).sort((a, b) => a.title.localeCompare(b.title));

                setCourses(uniqueCourses);
            } catch (err) {
                console.error("Error fetching courses", err);
                toast.error("Failed to load courses");
            }
        };
        fetchCourses();
    }, []);

    // Fetch stats when a course is selected
    useEffect(() => {
        if (!selectedCourse) {
            setStats(null);
            return;
        }
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${API}/exercise/stats`, { params: { course: selectedCourse } });
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats", err);
            }
        };
        fetchStats();
    }, [selectedCourse]);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedCourse) {
            return toast.error("Please select a Course");
        }

        if (!jsonInput.trim()) {
            return toast.error("Please paste the JSON question data");
        }

        let parsedQuestions;
        try {
            parsedQuestions = JSON.parse(jsonInput);
            if (!Array.isArray(parsedQuestions)) {
                throw new Error("JSON must be an array of objects []");
            }
        } catch (err) {
            return toast.error("Invalid JSON format: " + err.message);
        }

        setLoading(true);
        try {
            const payload = {
                course: selectedCourse,
                replaceExisting,
                questions: parsedQuestions
            };

            const res = await axios.post(`${API}/exercise/upload`, payload);
            toast.success(res.data.message || "Upload successful!");
            setJsonInput(""); // clear after success

            // Refresh stats
            const statsRes = await axios.get(`${API}/exercise/stats`, { params: { course: selectedCourse } });
            setStats(statsRes.data);

        } catch (err) {
            console.error("Upload error:", err.response?.data || err);
            toast.error(err.response?.data?.error || "Failed to upload questions");
        } finally {
            setLoading(false);
        }
    };

    const copyTemplate = () => {
        const template = [
            {
                "difficulty": "Beginner",
                "question": "What is Node.js?",
                "options": ["A web browser", "A runtime environment", "A database", "A framework"],
                "correctAnswer": "A runtime environment",
                "explanation": "Node.js allows running JS on the server.",
                "topic": "Basics"
            }
        ];
        setJsonInput(JSON.stringify(template, null, 2));
        toast.success("Template copied to input!");
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" toastOptions={{
                style: { background: '#1e293b', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
            }} />
            
            <div className="max-w-5xl mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm transition-all duration-300 hover:shadow-md">
                    <form onSubmit={handleUpload}>
                        
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
                            <div className="flex items-center gap-5">
                                <div className="flex-shrink-0 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner border border-blue-100">
                                    <FaCode size={28} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Exercise Management</h2>
                                    <p className="text-slate-500 mt-1 text-sm md:text-base">Upload and manage question banks dynamically for your courses.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Course Selection */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Target Course</label>
                                <div className="relative">
                                    <select
                                        value={selectedCourse}
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                        required
                                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer shadow-sm hover:border-blue-300"
                                    >
                                        <option value="" disabled className="text-slate-400">Select a course to manage exercises...</option>
                                        {courses.map(c => (
                                            <option key={c._id} value={c.title} className="text-slate-800 font-medium">{c.title}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Live Database Stats */}
                            {stats && (
                                <div className="bg-white border border-blue-100 p-6 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h4 className="flex items-center gap-2 mb-5 text-sm font-bold text-blue-700 uppercase tracking-wider">
                                        <FaDatabase className="text-blue-500" /> Current Active Questions
                                    </h4>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Beginner</span>
                                            <span className="text-3xl font-black text-emerald-700">{stats.Beginner}</span>
                                        </div>
                                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                                            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Intermediate</span>
                                            <span className="text-3xl font-black text-amber-700">{stats.Intermediate}</span>
                                        </div>
                                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                                            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">Advanced</span>
                                            <span className="text-3xl font-black text-rose-700">{stats.Advanced}</span>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col items-center justify-center shadow-sm transition-transform hover:-translate-y-1 duration-300">
                                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Total Pool</span>
                                            <span className="text-3xl font-black text-blue-700">{stats.Total}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Replace Existing Toggle */}
                            <label className={`flex items-start gap-4 cursor-pointer border p-6 rounded-2xl transition-all duration-300 ${replaceExisting ? 'bg-rose-50 border-rose-200 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                                <div className="relative flex items-center mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={replaceExisting}
                                        onChange={(e) => setReplaceExisting(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="relative w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500 shadow-inner"></div>
                                </div>
                                <div className="flex-1">
                                    <strong className={`flex items-center gap-2 text-base font-bold mb-1 ${replaceExisting ? 'text-rose-700' : 'text-slate-800'}`}>
                                        <FaExclamationTriangle className={replaceExisting ? 'text-rose-500' : 'text-slate-400'} /> 
                                        Replace Existing Questions
                                    </strong>
                                    <p className={`text-sm leading-relaxed ${replaceExisting ? 'text-rose-600/80' : 'text-slate-500'}`}>
                                        If toggled on, all current questions for this course will be archived before inserting new ones. Active student tests will remain unaffected.
                                    </p>
                                </div>
                            </label>

                            {/* JSON Input Area */}
                            <div className="flex flex-col space-y-3">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                            Questions Payload
                                            <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded uppercase tracking-widest font-bold border border-slate-200">JSON</span>
                                        </label>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <FaInfoCircle /> Must be an array of objects
                                        </p>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={copyTemplate} 
                                        className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all border border-blue-100 focus:ring-2 focus:ring-blue-500/20"
                                    >
                                        <FaCode className="text-xs" /> Load Example Template
                                    </button>
                                </div>

                                <div className="relative group rounded-2xl overflow-hidden border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-8 h-full bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 text-xs font-mono text-slate-400 select-none">
                                        {/* Simple decorative line numbers */}
                                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                                    </div>
                                    <textarea
                                        value={jsonInput}
                                        onChange={(e) => setJsonInput(e.target.value)}
                                        placeholder='[\n  {\n    "difficulty": "Beginner",\n    "question": "...",\n    "options": ["A","B","C","D"],\n    "correctAnswer": "A"\n  }\n]'
                                        className="w-full h-[450px] font-mono text-[13px] pl-12 pr-4 py-4 bg-slate-900 text-blue-300 resize-y focus:outline-none leading-relaxed custom-scrollbar placeholder:text-slate-600"
                                        required
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto sm:min-w-[250px] mx-auto py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base tracking-wide transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing Upload...
                                    </>
                                ) : (
                                    <>
                                        <FaCheck size={18} /> Publish Questions
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdvExercisePage;
