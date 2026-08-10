import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { FolderKanban, Plus, X, Edit2, Trash2, Map, FileJson, Copy, CheckCircle2, LayoutTemplate, Layers, AlertCircle } from "lucide-react";

const AdvProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);

    // Form states
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [roadmap, setRoadmap] = useState({});
    const [jsonRoadmap, setJsonRoadmap] = useState("");
    const [showJsonInput, setShowJsonInput] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const coursesRes = await axios.get(`${API}/getadvcourses`);
            setCourses(coursesRes.data);

            // Fetch projects per advance course (avoids broken populate issue with CreateCourse ref)
            const projectArrays = await Promise.all(
                coursesRes.data.map(course =>
                    axios.get(`${API}/api/projects/course/${course._id}`)
                        .then(res => res.data.map(p => ({ ...p, _courseTitle: course.title, _courseId: course._id })))
                        .catch(() => [])
                )
            );
            setProjects(projectArrays.flat());
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const initializeRoadmap = () => {
        const newRoadmap = {};
        for (let i = 1; i <= 24; i++) {
            newRoadmap[i] = { phase: "", tasks: ["", "", "", "", ""] };
        }
        setRoadmap(newRoadmap);
    };

    const toggleForm = () => {
        if (!isFormVisible && !editingProjectId) initializeRoadmap();
        setIsFormVisible(!isFormVisible);
    };

    const resetForm = () => {
        setEditingProjectId(null);
        setSelectedCourseId("");
        setTitle("");
        setDescription("");
        setLevel("Beginner");
        initializeRoadmap();
        setJsonRoadmap("");
        setShowJsonInput(false);
        setIsFormVisible(false);
    };

    const handleTaskChange = (week, taskIdx, value) => {
        const updatedRoadmap = { ...roadmap };
        updatedRoadmap[week].tasks[taskIdx] = value;
        setRoadmap(updatedRoadmap);
    };

    const handlePhaseChange = (week, value) => {
        const updatedRoadmap = { ...roadmap };
        updatedRoadmap[week].phase = value;
        setRoadmap(updatedRoadmap);
    };

    const handleApplyJson = () => {
        try {
            const parsed = JSON.parse(jsonRoadmap);
            const formatted = {};
            for (let i = 1; i <= 24; i++) {
                if (!parsed[i] || !parsed[i].phase || !Array.isArray(parsed[i].tasks)) {
                    throw new Error(`Invalid data for Week ${i}. Must have "phase" string and "tasks" array.`);
                }
                formatted[i] = parsed[i];
            }
            setRoadmap(formatted);
            toast.success("Roadmap applied from JSON!");
            setShowJsonInput(false);
        } catch (error) {
            toast.error("Invalid JSON: " + error.message);
        }
    };

    const copyTemplate = () => {
        const template = {};
        for (let i = 1; i <= 24; i++) {
            template[i] = {
                phase: `Phase ${Math.ceil(i / 4)}`,
                tasks: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"]
            };
        }
        setJsonRoadmap(JSON.stringify(template, null, 2));
        toast.success("Template copied to input!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourseId || !title || !description) {
            return toast.error("Please fill in all basic project details");
        }
        const projectData = { _id: editingProjectId, courseId: selectedCourseId, title, description, level, roadmap };
        try {
            await axios.post(`${API}/api/projects`, projectData);
            toast.success(editingProjectId ? "Project updated successfully!" : "Project created successfully!");
            fetchInitialData();
            resetForm();
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error(error.response?.data?.message || "Error saving project");
        }
    };

    const handleEdit = (project) => {
        setEditingProjectId(project._id);
        setSelectedCourseId(project.courseId?._id || project.courseId);
        setTitle(project.title);
        setDescription(project.description);
        setLevel(project.level);
        const rawRoadmap = project.roadmap instanceof Map ? Object.fromEntries(project.roadmap) : project.roadmap;
        const fullRoadmap = {};
        for (let i = 1; i <= 24; i++) {
            fullRoadmap[i] = rawRoadmap[i] || { phase: "", tasks: ["", "", "", "", ""] };
        }
        setRoadmap(fullRoadmap);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project permanently?")) return;
        try {
            await axios.delete(`${API}/api/projects/${id}`);
            toast.success("Project deleted successfully!");
            fetchInitialData();
        } catch {
            toast.error("Error deleting project");
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50 p-6 sm:p-10 font-sans relative overflow-hidden md:ml-64" id="AdminAddCourse">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
            
            <Toaster position="top-center" toastOptions={{ 
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } 
            }} />
            
            {/* Form Overlay Modal */}
            {isFormVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-slate-100 z-10 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                                    {editingProjectId ? <Edit2 size={24} /> : <FolderKanban size={24} />}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight m-0">
                                        {editingProjectId ? "Edit Project" : "Create New Project"}
                                    </h2>
                                    <p className="text-sm text-slate-500 font-medium m-0 mt-1">
                                        Configure the 24-week roadmap and project details
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={resetForm}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="overflow-y-auto px-8 py-6 custom-scrollbar bg-slate-50/50">
                            <form id="project-form" onSubmit={handleSubmit} className="space-y-8">
                                {/* Basic Info Section */}
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                                        <Layers size={16} /> Basic Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-slate-700 text-sm font-bold mb-2">Advance Course <span className="text-rose-500">*</span></label>
                                            <select 
                                                value={selectedCourseId} 
                                                onChange={(e) => setSelectedCourseId(e.target.value)} 
                                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                                required
                                            >
                                                <option value="" className="text-slate-400">-- Select the associated course --</option>
                                                {courses.map(course => (
                                                    <option key={course._id} value={course._id}>{course.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-slate-700 text-sm font-bold mb-2">Difficulty Level</label>
                                            <select 
                                                value={level} 
                                                onChange={(e) => setLevel(e.target.value)}
                                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="Beginner">Beginner (Foundation)</option>
                                                <option value="Intermediate">Intermediate (Core)</option>
                                                <option value="Advanced">Advanced (Mastery)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 text-sm font-bold mb-2">Project Title <span className="text-rose-500">*</span></label>
                                        <input 
                                            type="text" 
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)} 
                                            placeholder="e.g., Enterprise E-commerce Platform" 
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 text-sm font-bold mb-2">Project Description <span className="text-rose-500">*</span></label>
                                        <textarea 
                                            value={description} 
                                            onChange={(e) => setDescription(e.target.value)} 
                                            placeholder="Provide a comprehensive overview of the project scope and deliverables..." 
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400 h-32 resize-none custom-scrollbar"
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Roadmap Section */}
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-6 gap-4">
                                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 m-0">
                                            <Map size={16} /> 24-Week Curriculum Roadmap
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setShowJsonInput(!showJsonInput)}
                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors"
                                        >
                                            {showJsonInput ? <LayoutTemplate size={16} /> : <FileJson size={16} />}
                                            {showJsonInput ? "Switch to Grid View" : "Import JSON Mode"}
                                        </button>
                                    </div>

                                    {showJsonInput ? (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                            <div className="flex items-center justify-between bg-amber-50 p-4 rounded-xl border border-amber-200">
                                                <div className="flex items-center gap-3 text-amber-800">
                                                    <AlertCircle size={20} className="shrink-0" />
                                                    <p className="text-sm font-medium m-0">Paste your raw 24-week JSON structure here. Need the format?</p>
                                                </div>
                                                <button type="button" onClick={copyTemplate} className="flex items-center gap-2 px-3 py-1.5 bg-amber-200/50 text-amber-800 hover:bg-amber-200 rounded-lg text-xs font-bold transition-colors">
                                                    <Copy size={14} /> Copy Template
                                                </button>
                                            </div>
                                            <textarea
                                                value={jsonRoadmap}
                                                onChange={(e) => setJsonRoadmap(e.target.value)}
                                                placeholder={`{\n  "1": {\n    "phase": "Phase 1",\n    "tasks": ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"]\n  }\n}`}
                                                className="w-full h-[400px] p-5 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 custom-scrollbar"
                                            />
                                            <button 
                                                type="button" 
                                                onClick={handleApplyJson} 
                                                className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
                                            >
                                                <CheckCircle2 size={18} /> Validate & Apply JSON
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-300">
                                            {Object.keys(roadmap).map(week => (
                                                <div key={week} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all group">
                                                    <div className="bg-indigo-50/50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                                                        <span className="text-indigo-800 font-black text-sm">WEEK {week}</span>
                                                    </div>
                                                    <div className="p-4 space-y-4">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter Phase Name"
                                                                value={roadmap[week].phase}
                                                                onChange={(e) => handlePhaseChange(week, e.target.value)}
                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-bold text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:font-medium placeholder:text-slate-400"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            {roadmap[week].tasks.map((task, idx) => (
                                                                <div key={idx} className="flex items-center gap-2 relative">
                                                                    <div className="w-5 h-5 shrink-0 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                                        D{idx + 1}
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder={`Day ${idx + 1} Assignment`}
                                                                        value={task}
                                                                        onChange={(e) => handleTaskChange(week, idx, e.target.value)}
                                                                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                                                                        required
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                        
                        {/* Modal Footer */}
                        <div className="px-8 py-5 bg-white border-t border-slate-100 shrink-0 flex justify-end gap-3">
                            <button 
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                form="project-form"
                                type="submit" 
                                className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
                            >
                                {editingProjectId ? <CheckCircle2 size={18} /> : <Plus size={18} />}
                                {editingProjectId ? "Save Changes" : "Publish Project"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Page Layout */}
            <div className="max-w-[1600px] mx-auto relative z-10">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight m-0 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 flex items-center gap-3">
                            <FolderKanban className="text-indigo-600" size={36} />
                            Advance Course Projects
                        </h1>
                        <p className="text-base font-medium text-slate-500 mt-2 m-0 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            Configure 24-week curriculums and practical assignments
                        </p>
                    </div>
                    
                    <button 
                        className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2" 
                        onClick={toggleForm}
                    >
                        <Plus size={20} strokeWidth={2.5} /> Create New Project
                    </button>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200">
                        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-indigo-100 border-t-indigo-600 mb-4"></div>
                        <p className="text-slate-500 font-medium">Loading project catalog...</p>
                    </div>
                ) : (
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest w-16">#</th>
                                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Master Course</th>
                                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Project Name</th>
                                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Difficulty</th>
                                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {projects.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center justify-center text-slate-400">
                                                    <FolderKanban size={48} className="mb-4 text-slate-300" strokeWidth={1} />
                                                    <p className="text-lg font-bold text-slate-600 mb-1">No Projects Found</p>
                                                    <p className="text-sm">Create your first advanced curriculum project to get started.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        projects.map((proj, index) => (
                                            <tr key={proj._id} className="hover:bg-indigo-50/30 transition-colors group">
                                                <td className="px-6 py-5 text-slate-400 font-mono font-bold text-xs">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                                                        {proj._courseTitle || "Unknown Course"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-slate-900 font-bold text-base">{proj.title}</span>
                                                        <span className="text-slate-500 text-xs font-medium truncate max-w-md" title={proj.description}>
                                                            {proj.description}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                                                        proj.level === 'Advanced' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                                                        proj.level === 'Intermediate' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                                        'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                    }`}>
                                                        {proj.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => handleEdit(proj)}
                                                            className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                            title="Edit Project"
                                                        >
                                                            <Edit2 size={16} strokeWidth={2.5} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(proj._id)}
                                                            className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                            title="Delete Project"
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
                )}
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

export default AdvProjectPage;
