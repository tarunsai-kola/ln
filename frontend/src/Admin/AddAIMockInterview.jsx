import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import AdminHeader from "./AdminHeader";
import toast, { Toaster } from "react-hot-toast";

const AddAIMockInterview = () => {
    const [question, setQuestion] = useState("");
    const [topic, setTopic] = useState("Full Stack Development");
    const [duration, setDuration] = useState(30);
    const [difficulty, setDifficulty] = useState("Medium");
    const [sampleAnswer, setSampleAnswer] = useState("");

    const [existingQuestions, setExistingQuestions] = useState([]);
    const [availableTopics, setAvailableTopics] = useState([]);
    const [selectedTopicFilter, setSelectedTopicFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [loadingList, setLoadingList] = useState(false);
    const [activeTab, setActiveTab] = useState("create"); // 'create' | 'list'

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoadingList(true);
        try {
            const [qRes, tRes] = await Promise.all([
                axios.get(`${API}/api/ai-mock-interview/questions?limit=50`),
                axios.get(`${API}/api/ai-mock-interview/topics`)
            ]);
            if (qRes.data.success) {
                setExistingQuestions(qRes.data.data || []);
            }
            if (tRes.data.success) {
                setAvailableTopics(tRes.data.data || []);
            }
        } catch (err) {
            console.error("Error fetching AI mock interview questions:", err);
            toast.error("Failed to load interview questions.");
        } finally {
            setLoadingList(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) {
            toast.error("Question cannot be empty.");
            return;
        }

        try {
            const payload = {
                question: question.trim(),
                topic: topic.trim(),
                duration: Number(duration) || 30,
                difficulty,
                sampleAnswer: sampleAnswer.trim()
            };

            const res = await axios.post(`${API}/api/ai-mock-interview/questions`, payload);
            if (res.data.success) {
                toast.success("AI Mock Interview question added!");
                setQuestion("");
                setSampleAnswer("");
                fetchData();
                setActiveTab("list");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add question.");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;
        try {
            const res = await axios.delete(`${API}/api/ai-mock-interview/questions/${id}`);
            if (res.data.success) {
                toast.success("Question deleted successfully.");
                fetchData();
            }
        } catch (error) {
            toast.error("Failed to delete question.");
            console.error(error);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const questions = JSON.parse(event.target.result);
                if (!Array.isArray(questions)) {
                    toast.error("JSON file must contain an array of question objects.");
                    return;
                }
                const res = await axios.post(`${API}/api/ai-mock-interview/questions/bulk`, { questions });
                if (res.data.success) {
                    toast.success(res.data.message || "Bulk questions uploaded successfully!");
                    fetchData();
                    setActiveTab("list");
                }
            } catch (err) {
                toast.error("Failed to parse or upload JSON.");
                console.error(err);
            }
        };
        reader.readAsText(file);
        e.target.value = "";
    };

    const downloadSampleJson = () => {
        const sampleJson = [
            {
                question: "Explain the difference between synchronous and asynchronous execution in JavaScript.",
                topic: "Full Stack Development",
                duration: 30,
                difficulty: "Easy",
                sampleAnswer: "Synchronous execution runs code sequentially line by line blocking further operations until complete, whereas asynchronous execution offloads tasks like I/O or network requests to the event loop."
            },
            {
                question: "What is the bias-variance tradeoff and how does regularization help mitigate overfitting?",
                topic: "Data Science",
                duration: 30,
                difficulty: "Medium",
                sampleAnswer: "Bias represents assumptions in the model leading to underfitting, while variance is sensitivity to fluctuations leading to overfitting. Regularization like L1/L2 penalizes large weights."
            }
        ];
        const blob = new Blob([JSON.stringify(sampleJson, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sample-ai-mock-interview-questions.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredQuestions = existingQuestions.filter((q) => {
        const matchesTopic = selectedTopicFilter === "All" || q.topic === selectedTopicFilter;
        const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.topic.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTopic && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <AdminHeader />
            <Toaster position="top-right" />

            <div className="p-4 sm:p-8 max-w-5xl mx-auto pt-24 pb-20">
                {/* Header section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
                            <span className="material-symbols-outlined text-[15px]">smart_toy</span>
                            AI Mock Interview Engine
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Mock Interview Manager</h1>
                        <p className="text-slate-500 text-sm mt-1">Configure timed (30s) interview questions, topics, and simulated AI practice pools for learners.</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <button
                            type="button"
                            onClick={downloadSampleJson}
                            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[16px] text-slate-500">download</span>
                            Sample JSON
                        </button>
                        <label className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition flex items-center gap-1.5 shadow-sm active:scale-95">
                            <span className="material-symbols-outlined text-[16px]">upload_file</span>
                            Bulk Upload
                            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                        </label>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">question_answer</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Total Questions</p>
                            <p className="text-2xl font-black text-slate-800">{existingQuestions.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">category</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Active Topics</p>
                            <p className="text-2xl font-black text-slate-800">{availableTopics.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">timer</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Default Timer</p>
                            <p className="text-2xl font-black text-slate-800">30 Seconds</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-slate-200 mb-6">
                    <button
                        onClick={() => setActiveTab("create")}
                        className={`pb-3 text-sm font-bold transition border-b-2 flex items-center gap-2 ${
                            activeTab === "create"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-400 hover:text-slate-700"
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">add_circle</span>
                        Add New Question
                    </button>
                    <button
                        onClick={() => setActiveTab("list")}
                        className={`pb-3 text-sm font-bold transition border-b-2 flex items-center gap-2 ${
                            activeTab === "list"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-400 hover:text-slate-700"
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">list_alt</span>
                        Question Bank ({existingQuestions.length})
                    </button>
                </div>

                {activeTab === "create" ? (
                    <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6">
                        <div>
                            <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                                Interview Question Statement *
                            </label>
                            <textarea
                                placeholder="Enter interview question (e.g. Explain how event delegation works in Javascript and why it's useful)..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none h-28 font-sans resize-y transition"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                                    Topic / Domain *
                                </label>
                                <input
                                    type="text"
                                    list="topicsList"
                                    placeholder="e.g. Full Stack Development"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition font-medium"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    required
                                />
                                <datalist id="topicsList">
                                    <option value="Full Stack Development" />
                                    <option value="Data Science" />
                                    <option value="Python" />
                                    <option value="Java" />
                                    <option value="Cyber Security" />
                                    <option value="HR & Behavioral" />
                                    <option value="System Design" />
                                    <option value="Digital Marketing" />
                                    {availableTopics.map((t) => (
                                        <option key={t.name} value={t.name} />
                                    ))}
                                </datalist>
                            </div>

                            <div>
                                <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                                    Timer (Seconds)
                                </label>
                                <input
                                    type="number"
                                    min="10"
                                    max="180"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition font-medium"
                                />
                                <span className="text-[11px] text-slate-400 mt-1 block">Standard full-screen interview is 30s</span>
                            </div>

                            <div>
                                <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                                    Difficulty
                                </label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none cursor-pointer transition font-medium"
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                                Key Points / Sample Answer (Optional for reference)
                            </label>
                            <textarea
                                placeholder="Key points or reference answer for grading / evaluation..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none h-20 font-sans resize-y transition"
                                value={sampleAnswer}
                                onChange={(e) => setSampleAnswer(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-md text-sm flex items-center justify-center gap-2 active:scale-98"
                        >
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            Save AI Mock Interview Question
                        </button>
                    </form>
                ) : (
                    <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden p-6">
                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-xs font-bold text-slate-500 uppercase">Filter Topic:</span>
                                <select
                                    value={selectedTopicFilter}
                                    onChange={(e) => setSelectedTopicFilter(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer"
                                >
                                    <option value="All">All Topics ({existingQuestions.length})</option>
                                    {availableTopics.map((t) => (
                                        <option key={t.name} value={t.name}>
                                            {t.name} ({t.questionCount})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full sm:w-72">
                                <input
                                    type="text"
                                    placeholder="Search question text..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                />
                            </div>
                        </div>

                        {loadingList ? (
                            <div className="py-20 flex flex-col items-center justify-center">
                                <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                                <span className="text-xs font-semibold text-slate-500">Loading interview questions...</span>
                            </div>
                        ) : filteredQuestions.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                                            <th className="px-4 py-3">#</th>
                                            <th className="px-4 py-3">Question</th>
                                            <th className="px-4 py-3">Topic</th>
                                            <th className="px-4 py-3">Timer</th>
                                            <th className="px-4 py-3">Difficulty</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {filteredQuestions.map((q, idx) => (
                                            <tr key={q._id} className="hover:bg-slate-50/60 transition">
                                                <td className="px-4 py-3 text-xs font-bold text-slate-400">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-4 py-3 font-semibold text-slate-800 max-w-md">
                                                    {q.question}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                        {q.topic}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-xs font-medium text-slate-600">
                                                    <span className="inline-flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px] text-amber-500">timer</span>
                                                        {q.duration || 30}s
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                                        q.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                                                        q.difficulty === "Medium" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                                        "bg-rose-50 text-rose-700 border border-rose-200"
                                                    }`}>
                                                        {q.difficulty}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        onClick={() => handleDelete(q._id)}
                                                        className="text-rose-600 hover:text-rose-800 p-1.5 rounded-xl hover:bg-rose-50 transition"
                                                        title="Delete Question"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-20 text-center text-slate-400">
                                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">inbox</span>
                                <p className="text-sm font-semibold text-slate-700">No questions found</p>
                                <p className="text-xs text-slate-400 mt-1">Add your first question or switch filter topic.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddAIMockInterview;

