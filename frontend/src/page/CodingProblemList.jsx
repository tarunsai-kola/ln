import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API from '../API';
import { SectionHeader } from '../new_user/new-dashboad';

const CodingProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const subjectPills = ['All', 'SQL', 'React', 'DSA Beginner', 'DSA Advanced', 'Web Development', 'Algorithms'];

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/coding-problems`);
            if (res.data.success) {
                setProblems(res.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching problems", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProblems = problems.filter((prob) => {
        const matchesSubject = selectedSubject === 'All' || 
            (prob.subject && prob.subject.toLowerCase() === selectedSubject.toLowerCase());
        const matchesDiff = selectedDifficulty === 'All' || 
            (prob.difficulty && prob.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
        const matchesSearch = !searchQuery || 
            (prob.title && prob.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (prob.subject && prob.subject.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSubject && matchesDiff && matchesSearch;
    });

    const easyCount = problems.filter(p => p.difficulty === 'Easy').length;
    const medCount = problems.filter(p => p.difficulty === 'Medium').length;
    const hardCount = problems.filter(p => p.difficulty === 'Hard').length;

    return (
        <div className="nd-section-body space-y-6">
            {/* Standard Dashboard Hero Header */}
            <SectionHeader 
                icon="code" 
                title="Coding & Practice Studio" 
                subtitle="Master DSA algorithms, SQL database queries, and interactive React UI components in real-time" 
            />

            {/* Stat Cards - Matching dashboard aesthetic */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">terminal</span>
                        </div>
                        <div>
                            <span className="text-2xl font-extrabold text-gray-900 block">{problems.length}</span>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Problems</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                        </div>
                        <div>
                            <span className="text-2xl font-extrabold text-emerald-600 block">{easyCount}</span>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Easy</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">trending_up</span>
                        </div>
                        <div>
                            <span className="text-2xl font-extrabold text-amber-600 block">{medCount}</span>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Medium</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/50 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">bolt</span>
                        </div>
                        <div>
                            <span className="text-2xl font-extrabold text-rose-600 block">{hardCount}</span>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hard</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm space-y-4">
                {/* Search and Difficulty Select */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search challenges by title or topic..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl pl-10 pr-9 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Difficulty:</span>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer transition"
                        >
                            <option value="All">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>

                {/* Subject Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 shrink-0">Topics:</span>
                    {subjectPills.map((sub) => {
                        const active = selectedSubject.toLowerCase() === sub.toLowerCase();
                        return (
                            <button
                                key={sub}
                                onClick={() => setSelectedSubject(sub)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 ${
                                    active
                                        ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                }`}
                            >
                                {sub}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Problem Table Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-16 flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-sm font-semibold text-gray-600">Loading coding challenges...</p>
                    </div>
                ) : filteredProblems.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                                    <th className="px-6 py-4 w-16 text-center">#</th>
                                    <th className="px-6 py-4">Challenge Title</th>
                                    <th className="px-6 py-4">Subject / Topic</th>
                                    <th className="px-6 py-4">Difficulty</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProblems.map((prob, idx) => (
                                    <tr 
                                        key={prob._id} 
                                        className="hover:bg-purple-50/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4 text-center text-xs font-bold text-gray-400 font-mono">
                                            {idx + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {(() => {
                                                const isSql = prob.subject === 'SQL';
                                                const isReact = prob.subject === 'React';
                                                return (
                                                    <Link 
                                                        to={`/advancedashboard/coding/${prob._id}`}
                                                        className="text-gray-900 font-bold hover:text-purple-600 transition-colors text-sm flex items-center gap-2.5"
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                                                            isSql 
                                                                ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' 
                                                                : isReact
                                                                    ? 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white'
                                                                    : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                                                        }`}>
                                                            <span className="material-symbols-outlined text-[16px]">
                                                                {isSql ? 'database' : isReact ? 'widgets' : 'code'}
                                                            </span>
                                                        </div>
                                                        <span className="truncate max-w-md">{prob.title}</span>
                                                    </Link>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                prob.subject === 'SQL'
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                                    : prob.subject === 'React'
                                                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-100'
                                                        : 'bg-purple-50 text-purple-700 border border-purple-100'
                                            }`}>
                                                {prob.subject || 'DSA'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                                                prob.difficulty === 'Easy' 
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                                    : prob.difficulty === 'Medium' 
                                                        ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                            }`}>
                                                {prob.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                to={`/advancedashboard/coding/${prob._id}`}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-sm shadow-purple-500/20 hover:shadow-md transition-all duration-200 active:scale-95"
                                            >
                                                <span>Solve</span>
                                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-16 px-4 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                            <span className="material-symbols-outlined text-[32px]">code_off</span>
                        </div>
                        <h3 className="text-base font-bold text-gray-800">No challenges found</h3>
                        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                            No coding problems match your selected filters. Try choosing "All Difficulties" or clearing your search.
                        </p>
                        {(selectedSubject !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
                            <button
                                onClick={() => {
                                    setSelectedSubject('All');
                                    setSelectedDifficulty('All');
                                    setSearchQuery('');
                                }}
                                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodingProblemList;
