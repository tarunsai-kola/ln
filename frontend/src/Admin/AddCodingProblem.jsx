import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../API';
import AdminHeader from './AdminHeader';
import toast, { Toaster } from 'react-hot-toast';

const AddCodingProblem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('DSA Beginner');
    const [difficulty, setDifficulty] = useState('Easy');
    
    // Precode states
    const [pyCode, setPyCode] = useState('def solve():\n    # Write your code here\n    pass');
    const [sqlCode, setSqlCode] = useState('-- Write your SQL query here\nSELECT * FROM Employees;');
    const [reactCode, setReactCode] = useState("import React, { useState } from 'react';\n\nexport default function App() {\n    const [count, setCount] = useState(0);\n    return (\n        <div className=\"p-4 text-center space-y-3 bg-slate-900 text-white rounded-xl\">\n            <h2 className=\"text-lg font-bold\">Counter: {count}</h2>\n            <button onClick={() => setCount(count + 1)} className=\"px-3 py-1 bg-purple-600 rounded\">+1 Increment</button>\n        </div>\n    );\n}");
    const [cppCode, setCppCode] = useState('#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}');
    const [javaCode, setJavaCode] = useState('public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}');
    const [jsCode, setJsCode] = useState('function solve() {\n    // Write your code here\n}\nsolve();');

    // Test cases
    const [testCases, setTestCases] = useState([{ input: '', output: '', isHidden: false }]);
    const [existingProblems, setExistingProblems] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [activeTab, setActiveTab] = useState('create'); // 'create' | 'list'

    useEffect(() => {
        fetchExistingProblems();
    }, []);

    const fetchExistingProblems = async () => {
        setLoadingList(true);
        try {
            const res = await axios.get(`${API}/api/coding-problems`);
            if (res.data.success) {
                setExistingProblems(res.data.data || []);
            }
        } catch (err) {
            console.error("Error fetching existing coding problems:", err);
        } finally {
            setLoadingList(false);
        }
    };

    const handleTestCaseChange = (index, field, value) => {
        const newTestCases = [...testCases];
        newTestCases[index][field] = value;
        setTestCases(newTestCases);
    };

    const addTestCase = () => {
        setTestCases([...testCases, { input: '', output: '', isHidden: false }]);
    };

    const removeTestCase = (index) => {
        const newTestCases = testCases.filter((_, i) => i !== index);
        setTestCases(newTestCases);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const problemData = {
                title,
                description,
                subject,
                difficulty,
                preCode: {
                    python: pyCode,
                    sql: sqlCode,
                    react: reactCode,
                    cpp: cppCode,
                    java: javaCode,
                    javascript: jsCode
                },
                testCases
            };

            const res = await axios.post(`${API}/api/coding-problems`, problemData);
            if (res.data.success) {
                toast.success('Coding problem added successfully!');
                setTitle('');
                setDescription('');
                setTestCases([{ input: '', output: '', isHidden: false }]);
                fetchExistingProblems();
                setActiveTab('list');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding problem');
            console.error(error);
        }
    };

    const handleDeleteProblem = async (id) => {
        if (!window.confirm("Are you sure you want to delete this coding problem?")) return;
        try {
            const res = await axios.delete(`${API}/api/coding-problems/${id}`);
            if (res.data.success) {
                toast.success("Problem deleted successfully");
                fetchExistingProblems();
            }
        } catch (error) {
            toast.error("Failed to delete problem");
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const problems = JSON.parse(event.target.result);
                if (!Array.isArray(problems)) {
                    toast.error("JSON file must contain an array of problems.");
                    return;
                }
                const res = await axios.post(`${API}/api/coding-problems/bulk`, { problems });
                if (res.data.success) {
                    toast.success(res.data.message || 'Bulk upload successful!');
                    fetchExistingProblems();
                    setActiveTab('list');
                }
            } catch (err) {
                toast.error("Failed to parse or upload JSON.");
                console.error(err);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const downloadSampleJson = () => {
        const sampleJson = [
            {
                "title": "Two Sum",
                "description": "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>",
                "subject": "DSA Beginner",
                "difficulty": "Easy",
                "preCode": {
                    "python": "def twoSum(nums, target):\n    # Write your code here\n    pass",
                    "javascript": "function twoSum(nums, target) {\n    // Write your code here\n}",
                    "cpp": "#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n    return {};\n}",
                    "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}"
                },
                "testCases": [
                    {
                        "input": "[2,7,11,15]\n9",
                        "output": "[0,1]",
                        "isHidden": false
                    }
                ]
            }
        ];
        const blob = new Blob([JSON.stringify(sampleJson, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sample-problems.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <AdminHeader />
            <Toaster position="top-right" />
            
            <div className="p-4 sm:p-8 max-w-5xl mx-auto pt-24 pb-20">
                {/* Header section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
                            <span className="material-symbols-outlined text-[15px]">code</span>
                            Admin Coding Studio
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Coding Challenge Manager</h1>
                        <p className="text-slate-500 text-sm mt-1">Create single questions or bulk upload coding exercises for learners.</p>
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

                {/* Tabs */}
                <div className="flex gap-4 border-b border-slate-200 mb-6">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`pb-3 text-sm font-bold transition border-b-2 flex items-center gap-2 ${
                            activeTab === 'create'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-slate-400 hover:text-slate-700'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">add_circle</span>
                        Add New Problem
                    </button>
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`pb-3 text-sm font-bold transition border-b-2 flex items-center gap-2 ${
                            activeTab === 'list'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-slate-400 hover:text-slate-700'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">list_alt</span>
                        Active Question Bank ({existingProblems.length})
                    </button>
                </div>

                {activeTab === 'create' ? (
                    <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6">
                        <div>
                            <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">Problem Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Reverse a Linked List"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                                required 
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">Subject / Category</label>
                                <input 
                                    type="text" 
                                    list="subjectsList"
                                    placeholder="e.g. SQL, React, DSA Beginner, Web Development"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition" 
                                    value={subject} 
                                    onChange={e => setSubject(e.target.value)} 
                                    required 
                                />
                                <datalist id="subjectsList">
                                    <option value="SQL" />
                                    <option value="React" />
                                    <option value="DSA Beginner" />
                                    <option value="DSA Advanced" />
                                    <option value="Web Development" />
                                    <option value="Algorithms" />
                                </datalist>
                            </div>
                            <div>
                                <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">Difficulty</label>
                                <select 
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none cursor-pointer transition font-medium" 
                                    value={difficulty} 
                                    onChange={e => setDifficulty(e.target.value)}
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">Problem Description (HTML Supported)</label>
                            <textarea 
                                placeholder="Enter problem statement, constraints, and explanation..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none h-36 font-sans resize-y transition" 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-indigo-600 text-[18px]">code</span>
                                Starter Code Templates (Pre-Code)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-2xl border border-blue-200/60">
                                    <label className="block text-blue-700 text-xs font-bold mb-1.5 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[15px]">database</span>
                                        SQL (SQLite)
                                    </label>
                                    <textarea 
                                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 font-mono text-xs h-28 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
                                        value={sqlCode} 
                                        onChange={e => setSqlCode(e.target.value)}
                                    />
                                </div>
                                <div className="bg-slate-50 p-3 rounded-2xl border border-cyan-200/60">
                                    <label className="block text-cyan-700 text-xs font-bold mb-1.5 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[15px]">widgets</span>
                                        React (JSX Live)
                                    </label>
                                    <textarea 
                                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 font-mono text-xs h-28 outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" 
                                        value={reactCode} 
                                        onChange={e => setReactCode(e.target.value)}
                                    />
                                </div>
                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                                    <label className="block text-slate-600 text-xs font-bold mb-1.5">Python 3</label>
                                    <textarea 
                                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 font-mono text-xs h-28 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                        value={pyCode} 
                                        onChange={e => setPyCode(e.target.value)}
                                    />
                                </div>
                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                                    <label className="block text-slate-600 text-xs font-bold mb-1.5">JavaScript (Node.js)</label>
                                    <textarea 
                                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 font-mono text-xs h-28 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                        value={jsCode} 
                                        onChange={e => setJsCode(e.target.value)}
                                    />
                                </div>
                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                                    <label className="block text-slate-600 text-xs font-bold mb-1.5">Java</label>
                                    <textarea 
                                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 font-mono text-xs h-28 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                        value={javaCode} 
                                        onChange={e => setJavaCode(e.target.value)}
                                    />
                                </div>
                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                                    <label className="block text-slate-600 text-xs font-bold mb-1.5">C++</label>
                                    <textarea 
                                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 font-mono text-xs h-28 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                        value={cppCode} 
                                        onChange={e => setCppCode(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">fact_check</span>
                                    Test Cases
                                </h3>
                                <button 
                                    type="button" 
                                    onClick={addTestCase} 
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-[15px]">add</span>
                                    Add Test Case
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {testCases.map((tc, index) => (
                                    <div key={index} className="border border-slate-200 p-4 rounded-2xl bg-slate-50/70 relative">
                                        {testCases.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => removeTestCase(index)} 
                                                className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 text-xs font-bold p-1 rounded-lg hover:bg-rose-50 transition"
                                                title="Delete test case"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        )}
                                        <div className="text-xs font-bold text-slate-500 mb-2">Test Case #{index + 1}</div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 mb-1">Input (STDIN)</label>
                                                <textarea 
                                                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-mono text-xs text-slate-800 h-20 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                                    value={tc.input} 
                                                    onChange={e => handleTestCaseChange(index, 'input', e.target.value)} 
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 mb-1">Expected Output (STDOUT)</label>
                                                <textarea 
                                                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-mono text-xs text-slate-800 h-20 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                                    value={tc.output} 
                                                    onChange={e => handleTestCaseChange(index, 'output', e.target.value)} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                id={`hidden-${index}`} 
                                                checked={tc.isHidden} 
                                                onChange={e => handleTestCaseChange(index, 'isHidden', e.target.checked)} 
                                                className="rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer" 
                                            />
                                            <label htmlFor={`hidden-${index}`} className="text-xs font-medium text-slate-600 cursor-pointer">
                                                Hidden Test Case (Used for evaluation, hidden from problem description)
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-md text-sm flex items-center justify-center gap-2 active:scale-98"
                        >
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            Save Coding Challenge
                        </button>
                    </form>
                ) : (
                    <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
                        {loadingList ? (
                            <div className="py-20 flex flex-col items-center justify-center">
                                <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                                <span className="text-xs font-semibold text-slate-500">Loading active problems...</span>
                            </div>
                        ) : existingProblems.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                                            <th className="px-6 py-4">Title</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4">Difficulty</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {existingProblems.map((prob) => (
                                            <tr key={prob._id} className="hover:bg-slate-50/60 transition">
                                                <td className="px-6 py-4 font-bold text-slate-900">
                                                    {prob.title}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                        {prob.subject || 'DSA'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                        prob.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                        prob.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                        'bg-rose-50 text-rose-700 border border-rose-200'
                                                    }`}>
                                                        {prob.difficulty}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteProblem(prob._id)}
                                                        className="text-rose-600 hover:text-rose-800 p-2 rounded-xl hover:bg-rose-50 transition"
                                                        title="Delete Problem"
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
                                <p className="text-sm font-semibold text-slate-700">No coding problems in database</p>
                                <p className="text-xs text-slate-400 mt-1">Switch to "Add New Problem" tab to create your first problem.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCodingProblem;
