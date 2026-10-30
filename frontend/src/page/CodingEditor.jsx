import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import API from '../API';
import ReactLivePreview from '../Components/ReactLivePreview';

const CodingEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [customInput, setCustomInput] = useState('');
    const [useCustomInput, setUseCustomInput] = useState(false);
    const [running, setRunning] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [consoleTab, setConsoleTab] = useState('output'); // 'output' | 'customInput' | 'preview'
    const [fontSize, setFontSize] = useState(14);
    const [copySuccess, setCopySuccess] = useState(false);
    // Theme state: default 'dark' so both sides are unified dark IDE
    const [theme, setTheme] = useState('dark'); // 'dark' | 'light'

    useEffect(() => {
        fetchProblem();
    }, [id]);

    const fetchProblem = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/coding-problems/${id}`);
            if (res.data.success) {
                const data = res.data.data;
                setProblem(data);
                
                // Determine appropriate default language based on problem subject
                let initialLang = 'python';
                if (data.subject === 'SQL' || (data.preCode && data.preCode.sql)) {
                    initialLang = 'sql';
                } else if (data.subject === 'React' || (data.preCode && data.preCode.react)) {
                    initialLang = 'react';
                } else if (data.preCode && data.preCode.javascript) {
                    initialLang = 'javascript';
                }

                setLanguage(initialLang);

                // Prepopulate starter code
                const starterCode = (data.preCode && data.preCode[initialLang]) || 
                    getDefaultStarterCode(initialLang);
                setCode(starterCode);

                if (initialLang === 'react') {
                    setConsoleTab('preview');
                }

                if (data.testCases && data.testCases.length > 0 && !data.testCases[0].isHidden) {
                    setCustomInput(data.testCases[0].input || "");
                }
            }
        } catch (error) {
            console.error("Error fetching problem details", error);
        } finally {
            setLoading(false);
        }
    };

    const getDefaultStarterCode = (lang) => {
        if (lang === 'sql') {
            return "-- Write your SQL query here\n-- Available tables: Employees, Departments, Orders, Customers\nSELECT * FROM Employees;";
        }
        if (lang === 'react') {
            return `import React, { useState } from 'react';\n\n// Interactive React Component Practice\nexport default function App() {\n    const [count, setCount] = useState(0);\n\n    return (\n        <div className="p-6 bg-slate-900 text-white rounded-2xl max-w-sm mx-auto text-center space-y-4 shadow-xl border border-slate-800">\n            <h2 className="text-xl font-bold text-purple-400">Interactive Counter</h2>\n            <div className="text-4xl font-extrabold text-white">{count}</div>\n            <div className="flex justify-center gap-2">\n                <button \n                    onClick={() => setCount(count + 1)}\n                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition active:scale-95"\n                >\n                    +1 Increment\n                </button>\n                <button \n                    onClick={() => setCount(count - 1)}\n                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-xl font-bold transition active:scale-95"\n                >\n                    -1 Decrement\n                </button>\n                <button \n                    onClick={() => setCount(0)}\n                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition"\n                >\n                    Reset\n                </button>\n            </div>\n        </div>\n    );\n}`;
        }
        if (lang === 'python') {
            return "def solve():\n    # Write your code here\n    pass\n\nsolve()";
        }
        if (lang === 'javascript') {
            return "// Write your code here\nfunction solve() {\n    \n}\nsolve();";
        }
        if (lang === 'java') {
            return "public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}";
        }
        if (lang === 'cpp') {
            return "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}";
        }
        return '';
    };

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setLanguage(lang);
        if (lang === 'react') {
            setConsoleTab('preview');
        }
        if (problem && problem.preCode && problem.preCode[lang]) {
            setCode(problem.preCode[lang]);
        } else {
            setCode(getDefaultStarterCode(lang));
        }
    };

    const handleResetCode = () => {
        if (!problem) return;
        if (window.confirm("Reset code to default template? Any unsaved edits will be lost.")) {
            if (problem.preCode && problem.preCode[language]) {
                setCode(problem.preCode[language]);
            } else {
                setCode(getDefaultStarterCode(language));
            }
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleRunCode = async (isSubmit = false) => {
        if (isSubmit) {
            setSubmitting(true);
        } else {
            setRunning(true);
        }

        if (language === 'react') {
            // For React, refresh the preview tab and log success
            setConsoleTab('preview');
            setOutput("⚡ React component compiled and live preview updated!");
            setRunning(false);
            setSubmitting(false);
            return;
        }

        setConsoleTab('output');
        setOutput("Compiling and executing code...");

        let inputToSend = "";
        if (useCustomInput) {
            inputToSend = customInput;
        } else if (isSubmit && problem?.testCases?.length > 0) {
            inputToSend = problem.testCases[0].input || "";
        }

        try {
            const res = await axios.post(`${API}/api/coding-problems/execute`, {
                language,
                sourceCode: code,
                input: inputToSend
            });
            
            if (res.data.success && res.data.data?.run) {
                const rawOut = res.data.data.run.output || res.data.data.run.stderr || "Program executed with no console output.";
                
                if (isSubmit && problem?.testCases?.length > 0) {
                    const expected = (problem.testCases[0].output || "").trim();
                    const actual = rawOut.trim();
                    const passed = actual === expected;
                    
                    const report = `${passed ? '✅ SUCCESS: Test Case Passed!' : '❌ FAILED: Output Mismatch'}\n\n` +
                        `Expected Output:\n${expected}\n\n` +
                        `Your Output:\n${actual}`;
                    setOutput(report);
                } else {
                    setOutput(rawOut);
                }
            } else {
                setOutput(res.data.message || "Error executing code.");
            }
        } catch (error) {
            setOutput(`Execution Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setRunning(false);
            setSubmitting(false);
        }
    };

    const isDark = theme === 'dark';

    if (loading) {
        return (
            <div className={`rounded-2xl border p-20 flex flex-col items-center justify-center text-center shadow-sm ${
                isDark ? 'bg-[#131b2e] border-slate-800 text-slate-200' : 'bg-white border-gray-200 text-gray-700'
            }`}>
                <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-semibold">Loading interactive coding studio...</p>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className={`rounded-2xl border p-16 text-center shadow-sm ${
                isDark ? 'bg-[#131b2e] border-slate-800 text-slate-200' : 'bg-white border-gray-200 text-gray-700'
            }`}>
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">error</span>
                <h3 className="text-lg font-bold">Problem not found</h3>
                <button 
                    onClick={() => navigate('/advancedashboard/coding')} 
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition"
                >
                    Back to Challenges
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 font-sans">
            {/* Top Navigation & Action Bar - Unified Theme */}
            <div className={`rounded-2xl border shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                isDark 
                    ? 'bg-[#131b2e] border-slate-800/90 text-slate-200' 
                    : 'bg-white border-gray-200/80 text-gray-800'
            }`}>
                <div className="flex items-center gap-3 flex-wrap">
                    <button 
                        onClick={() => navigate('/advancedashboard/coding')} 
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                            isDark 
                                ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/70' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        <span>Challenges</span>
                    </button>
                    <div className={`h-5 w-px hidden sm:block ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
                    <h1 className={`text-base sm:text-lg font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {problem.title}
                    </h1>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isDark 
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                            : 'bg-purple-50 text-purple-700 border border-purple-100'
                    }`}>
                        {problem.subject || 'DSA'}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        problem.difficulty === 'Easy' 
                            ? isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : problem.difficulty === 'Medium' 
                                ? isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                : isDark ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                        {problem.difficulty}
                    </span>
                </div>

                {/* Right controls: Theme toggle, Run, Submit */}
                <div className="flex items-center gap-2.5 self-end sm:self-auto flex-wrap">
                    {/* Theme Switcher Button */}
                    <button
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                            isDark 
                                ? 'bg-slate-800/90 text-amber-300 border-slate-700 hover:bg-slate-700' 
                                : 'bg-gray-100 text-slate-700 border-gray-300 hover:bg-gray-200'
                        }`}
                        title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            {isDark ? 'light_mode' : 'dark_mode'}
                        </span>
                        <span className="hidden md:inline">{isDark ? 'Light' : 'Dark'}</span>
                    </button>

                    <button 
                        onClick={() => handleRunCode(false)}
                        disabled={running || submitting}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition shadow-sm ${
                            running 
                                ? 'bg-gray-800/50 text-gray-500 border-gray-700 cursor-not-allowed' 
                                : isDark 
                                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:text-white' 
                                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                        }`}
                    >
                        {running ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-[16px] text-purple-400">sync</span>
                                <span>Running...</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[16px] text-emerald-400">play_arrow</span>
                                <span>Run Code</span>
                            </>
                        )}
                    </button>

                    <button 
                        onClick={() => handleRunCode(true)}
                        disabled={running || submitting}
                        className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition active:scale-95 ${
                            submitting 
                                ? 'bg-purple-800 text-purple-300 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
                        }`}
                    >
                        {submitting ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                                <span>Evaluating...</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                                <span>Submit</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Split Screen Workspace - BOTH SIDES SAME THEME */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                
                {/* Left Column: Problem Details Card (SAME DARK BACKGROUND) */}
                <div className={`lg:col-span-5 rounded-2xl border shadow-sm overflow-hidden flex flex-col h-[750px] transition-colors ${
                    isDark 
                        ? 'bg-[#131b2e] border-slate-800/90 text-slate-300' 
                        : 'bg-white border-gray-200/80 text-gray-700'
                }`}>
                    <div className={`px-5 py-3.5 border-b flex items-center justify-between ${
                        isDark ? 'bg-[#0f1626] border-slate-800/90 text-slate-200' : 'bg-gray-50/60 border-gray-100 text-gray-700'
                    }`}>
                        <div className="flex items-center gap-2 text-xs font-bold">
                            <span className="material-symbols-outlined text-[18px] text-purple-400">description</span>
                            <span>Problem Statement</span>
                        </div>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm leading-relaxed custom-ide-scrollbar">
                        <div>
                            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {problem.title}
                            </h2>
                            <div className="text-xs flex items-center gap-2 text-slate-400">
                                <span>Difficulty: <strong className={isDark ? 'text-slate-200' : 'text-gray-700'}>{problem.difficulty}</strong></span>
                                <span>•</span>
                                <span>Category: <strong className={isDark ? 'text-slate-200' : 'text-gray-700'}>{problem.subject || 'DSA'}</strong></span>
                            </div>
                        </div>

                        {/* Problem HTML statement */}
                        <div 
                            className={`prose prose-sm max-w-none space-y-3 prose-p:my-2 prose-pre:my-2 ${
                                isDark 
                                    ? 'prose-invert text-slate-300 prose-code:bg-slate-900 prose-code:text-purple-300 prose-code:border prose-code:border-purple-800/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs' 
                                    : 'text-gray-700 prose-code:bg-purple-50 prose-code:text-purple-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs'
                            }`}
                            dangerouslySetInnerHTML={{ __html: problem.description }}
                        />

                        {/* Example Cases */}
                        {problem.testCases && problem.testCases.length > 0 && (
                            <div className="pt-2 space-y-4">
                                <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                                    Example Cases
                                </h3>
                                {problem.testCases.filter(tc => !tc.isHidden).map((tc, index) => (
                                    <div key={tc._id || index} className={`rounded-xl p-4 border text-xs font-mono space-y-2 ${
                                        isDark 
                                            ? 'bg-[#0c1220] border-slate-800 text-slate-200' 
                                            : 'bg-gray-50 border-gray-200 text-gray-800'
                                    }`}>
                                        <div className="text-xs font-bold text-purple-400">Example {index + 1}:</div>
                                        <div className="space-y-1.5">
                                            <div>
                                                <span className={`${isDark ? 'text-slate-500' : 'text-gray-400'} select-none`}>Input: </span>
                                                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>{tc.input}</span>
                                            </div>
                                            <div>
                                                <span className={`${isDark ? 'text-slate-500' : 'text-gray-400'} select-none`}>Expected Output: </span>
                                                <span className="font-semibold text-emerald-400">{tc.output}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Code Editor & Console (SAME DARK BACKGROUND) */}
                <div className="lg:col-span-7 flex flex-col gap-4 h-[750px]">
                    
                    {/* Monaco Editor Section */}
                    <div className={`flex-1 rounded-2xl border shadow-md flex flex-col overflow-hidden transition-colors ${
                        isDark 
                            ? 'bg-[#131b2e] border-slate-800/90' 
                            : 'bg-white border-gray-200/80'
                    }`}>
                        {/* Editor Top Bar */}
                        <div className={`px-4 py-2.5 border-b flex items-center justify-between ${
                            isDark ? 'bg-[#0f1626] border-slate-800/90' : 'bg-gray-50/80 border-gray-200'
                        }`}>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-purple-400">code</span>
                                <select 
                                    value={language} 
                                    onChange={handleLanguageChange}
                                    className={`border text-xs font-bold rounded-lg px-3 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-purple-500 ${
                                        isDark 
                                            ? 'bg-slate-800/90 border-slate-700 text-slate-200' 
                                            : 'bg-white border-gray-300 text-gray-700'
                                    }`}
                                >
                                    <option value="python">Python 3</option>
                                    <option value="javascript">JavaScript (Node.js)</option>
                                    <option value="sql">SQL (SQLite Practice)</option>
                                    <option value="react">React (JSX Live)</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={copyCode}
                                    title="Copy code"
                                    className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded transition ${
                                        isDark 
                                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        {copySuccess ? 'check' : 'content_copy'}
                                    </span>
                                    <span>{copySuccess ? 'Copied' : 'Copy'}</span>
                                </button>

                                <button 
                                    onClick={handleResetCode} 
                                    title="Reset to starter template"
                                    className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded transition ${
                                        isDark 
                                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                                    <span>Reset</span>
                                </button>
                            </div>
                        </div>

                        {/* Monaco Editor Container */}
                        <div className="flex-1 relative w-full h-full min-h-[360px]">
                            <Editor
                                height="100%"
                                width="100%"
                                theme={isDark ? "vs-dark" : "light"}
                                language={language === 'sql' ? 'sql' : language === 'react' ? 'javascript' : language === 'cpp' ? 'cpp' : language}
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: fontSize,
                                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                                    padding: { top: 12, bottom: 12 },
                                    scrollBeyondLastLine: false,
                                    roundedSelection: false,
                                    renderLineHighlight: "all",
                                    automaticLayout: true,
                                    lineNumbersMinChars: 3,
                                }}
                            />
                        </div>
                    </div>

                    {/* Console & Test Results Section */}
                    <div className={`h-[280px] rounded-2xl border shadow-md flex flex-col overflow-hidden transition-colors ${
                        isDark 
                            ? 'bg-[#131b2e] border-slate-800/90' 
                            : 'bg-white border-gray-200/80'
                    }`}>
                        {/* Console Tabs */}
                        <div className={`px-4 border-b flex items-center justify-between ${
                            isDark ? 'bg-[#0f1626] border-slate-800/90' : 'bg-gray-50/80 border-gray-200'
                        }`}>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setConsoleTab('output')}
                                    className={`text-xs font-bold py-2.5 flex items-center gap-1.5 transition border-b-2 ${
                                        consoleTab === 'output' 
                                            ? 'border-purple-500 text-purple-400' 
                                            : isDark ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[15px] text-purple-400">terminal</span>
                                    <span>Test Result & Output</span>
                                </button>
                                <button
                                    onClick={() => setConsoleTab('customInput')}
                                    className={`text-xs font-bold py-2.5 flex items-center gap-1.5 transition border-b-2 ${
                                        consoleTab === 'customInput' 
                                            ? 'border-purple-500 text-purple-400' 
                                            : isDark ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[15px] text-indigo-400">input</span>
                                    <span>{language === 'sql' ? 'Custom Schema / Data' : 'Custom Input (STDIN)'}</span>
                                    {useCustomInput && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>}
                                </button>
                                <button
                                    onClick={() => setConsoleTab('preview')}
                                    className={`text-xs font-bold py-2.5 flex items-center gap-1.5 transition border-b-2 ${
                                        consoleTab === 'preview' 
                                            ? 'border-purple-500 text-purple-400' 
                                            : isDark ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[15px] text-emerald-400">preview</span>
                                    <span>Live Preview</span>
                                    {language === 'react' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                                </button>
                            </div>

                            {consoleTab === 'output' && output && (
                                <button 
                                    onClick={() => setOutput('')} 
                                    className={`text-xs flex items-center gap-1 transition ${
                                        isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[14px]">clear_all</span>
                                    <span>Clear</span>
                                </button>
                            )}
                        </div>

                        {/* Console Content */}
                        <div className={`flex-1 overflow-y-auto font-mono text-xs select-text custom-ide-scrollbar ${
                            consoleTab === 'preview' 
                                ? 'p-0' 
                                : `p-4 ${isDark ? 'bg-[#090d16] text-slate-300' : 'bg-gray-50 text-gray-800'}`
                        }`}>
                            {consoleTab === 'preview' ? (
                                <div className="h-full w-full">
                                    <ReactLivePreview code={code} isDark={isDark} />
                                </div>
                            ) : consoleTab === 'output' ? (
                                <pre className={`whitespace-pre-wrap leading-relaxed ${
                                    output.includes('Execution Error') || output.includes('FAILED') || output.includes('Error:')
                                        ? 'text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20'
                                        : output.includes('SUCCESS')
                                            ? 'text-emerald-300 font-bold bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20'
                                            : isDark ? 'text-slate-300' : 'text-gray-800'
                                }`}>
                                    {output || (language === 'sql' 
                                        ? "Click 'Run Code' to execute your SQL query on the practice database." 
                                        : language === 'react'
                                            ? "Switch to the 'Live Preview' tab above to test your React UI in real-time."
                                            : "Click 'Run Code' or 'Submit' to compile and view results.")}
                                </pre>
                            ) : (
                                <div className="h-full flex flex-col space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="customInputCheck"
                                            checked={useCustomInput}
                                            onChange={(e) => setUseCustomInput(e.target.checked)}
                                            className="rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                                        />
                                        <label htmlFor="customInputCheck" className={`text-xs font-semibold cursor-pointer select-none ${
                                            isDark ? 'text-slate-300' : 'text-gray-700'
                                        }`}>
                                            {language === 'sql'
                                                ? "Execute this custom DDL/DML schema before running user query"
                                                : "Feed this input to program STDIN during execution"}
                                        </label>
                                    </div>
                                    <textarea
                                        value={customInput}
                                        onChange={(e) => setCustomInput(e.target.value)}
                                        placeholder={language === 'sql' 
                                            ? "CREATE TABLE MyTable (id INT, val TEXT);\nINSERT INTO MyTable VALUES (1, 'A');"
                                            : "Enter custom input lines here..."}
                                        className={`flex-1 w-full rounded-lg p-3 text-xs font-mono placeholder-gray-500 outline-none focus:ring-1 focus:ring-purple-500 resize-none ${
                                            isDark ? 'bg-slate-900 border border-slate-800 text-slate-200' : 'bg-white border border-gray-200 text-gray-800'
                                        }`}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .custom-ide-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-ide-scrollbar::-webkit-scrollbar-track {
                    background: transparent; 
                }
                .custom-ide-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(156, 163, 175, 0.4); 
                    border-radius: 4px;
                }
                .custom-ide-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(156, 163, 175, 0.7); 
                }
            `}} />
        </div>
    );
};

export default CodingEditor;
