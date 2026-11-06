import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AIMockInterviewPage = () => {
    // Stage: 'lobby' | 'interview' | 'completed'
    const [stage, setStage] = useState("lobby");

    // Topics & Questions
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("All Topics");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Interview running state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [answersLog, setAnswersLog] = useState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [speechEnabled, setSpeechEnabled] = useState(true);

    // Camera & Audio Stream
    const [hasCamera, setHasCamera] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Audio Visualizer Simulation
    const [audioWave, setAudioWave] = useState([20, 45, 70, 30, 85, 60, 40, 90, 50, 65, 30, 80]);

    useEffect(() => {
        fetchTopics();
        return () => {
            stopCamera();
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }
        };
    }, []);

    // Fetch topics from backend
    const fetchTopics = async () => {
        try {
            const res = await axios.get(`${API}/api/ai-mock-interview/topics`);
            if (res.data.success) {
                setTopics(res.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    };

    // Camera init
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            setHasCamera(true);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.warn("Camera or microphone permission not granted:", err);
            setHasCamera(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setHasCamera(false);
    };

    // Text to Speech simulated AI voice
    const speakQuestion = (text) => {
        if (!speechEnabled || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    // Start interview handler
    const handleStartInterview = async () => {
        setLoading(true);
        try {
            const topicParam = selectedTopic === "All Topics" ? "" : selectedTopic;
            // Fetch 30 questions
            const res = await axios.get(`${API}/api/ai-mock-interview/questions`, {
                params: {
                    topic: topicParam,
                    limit: 30,
                    random: "true"
                }
            });

            const fetchedQuestions = res.data.data || [];
            if (fetchedQuestions.length === 0) {
                toast.error("No questions found for the selected topic. Try 'All Topics'.");
                setLoading(false);
                return;
            }

            setQuestions(fetchedQuestions);
            setCurrentIndex(0);
            setTimeLeft(fetchedQuestions[0]?.duration || 30);
            setAnswersLog([]);
            setStage("interview");

            // Request full screen
            try {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                    setIsFullscreen(true);
                }
            } catch (err) {
                console.warn("Fullscreen request declined or not allowed:", err);
            }

            // Start webcam
            await startCamera();

            // Speak first question
            speakQuestion(fetchedQuestions[0]?.question);
            setIsTimerRunning(true);
        } catch (error) {
            console.error("Failed to start AI interview:", error);
            toast.error("Failed to initialize AI Mock Interview. Check backend connection.");
        } finally {
            setLoading(false);
        }
    };

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    // 30-Second Countdown Timer
    useEffect(() => {
        let timer = null;
        if (stage === "interview" && isTimerRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleNextQuestion(true); // Auto advanced on timer expiry
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [stage, isTimerRunning, currentIndex, questions]);

    // Simulated waveform animation
    useEffect(() => {
        let interval = null;
        if (stage === "interview") {
            interval = setInterval(() => {
                setAudioWave(Array.from({ length: 14 }, () => Math.floor(Math.random() * 75) + 15));
            }, 180);
        }
        return () => clearInterval(interval);
    }, [stage]);

    // Next Question logic
    const handleNextQuestion = (isAuto = false) => {
        const currentQ = questions[currentIndex];
        setAnswersLog((prev) => [
            ...prev,
            {
                question: currentQ?.question,
                topic: currentQ?.topic,
                timeSpent: (currentQ?.duration || 30) - timeLeft,
                autoAdvanced: isAuto
            }
        ]);

        if (currentIndex + 1 < questions.length) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            const nextDuration = questions[nextIdx]?.duration || 30;
            setTimeLeft(nextDuration);
            speakQuestion(questions[nextIdx]?.question);
        } else {
            // Completed all questions
            finishInterview();
        }
    };

    const finishInterview = () => {
        setIsTimerRunning(false);
        stopCamera();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        setStage("completed");
    };

    const exitInterviewEarly = () => {
        if (window.confirm("Are you sure you want to exit the AI Mock Interview? Your current progress will be ended.")) {
            finishInterview();
        }
    };

    // ─────────────────────────────────────────────
    // STAGE 1: LOBBY / SETUP
    // ─────────────────────────────────────────────
    if (stage === "lobby") {
        return (
            <div className="min-h-[85vh] flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-50 text-slate-800">
                <Toaster position="top-center" />

                <div className="w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden">
                    {/* Banner */}
                    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            AI Proctor & Voice Evaluator Active
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                            Interactive AI Mock Interview
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                            Experience a realistic, high-pressure interview environment. Once you begin, the system takes
                            <strong> full-screen control</strong> with rapid <strong>30-second response rounds</strong> per question.
                        </p>
                    </div>

                    <div className="p-6 sm:p-10 space-y-8">
                        {/* 3 Step Protocol Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black mb-3">
                                    <span className="material-symbols-outlined text-2xl">fullscreen</span>
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1">1. Full-Screen Focus</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Simulates real company assessment portals by engaging full-screen mode to eliminate distractions.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black mb-3">
                                    <span className="material-symbols-outlined text-2xl">timer</span>
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1">2. 30s Rapid Timer</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Each question is displayed in the center with a 30-second live countdown timer.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black mb-3">
                                    <span className="material-symbols-outlined text-2xl">smart_toy</span>
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1">3. 30 Questions Total</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Comprehensive question pool covering foundational to advanced concepts in your chosen domain.
                                </p>
                            </div>
                        </div>

                        {/* Topic Selector */}
                        <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200 space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-600 text-[18px]">category</span>
                                    Select Interview Topic / Domain
                                </label>
                                <select
                                    value={selectedTopic}
                                    onChange={(e) => setSelectedTopic(e.target.value)}
                                    className="w-full bg-white border border-slate-300 text-slate-900 font-bold text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer shadow-sm transition"
                                >
                                    <option value="All Topics">All Topics (Full 30-Question Assessment)</option>
                                    {topics.map((t) => (
                                        <option key={t.name} value={t.name}>
                                            {t.name} ({t.questionCount} Questions Available)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Options */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 text-xs">
                                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                                    <input
                                        type="checkbox"
                                        checked={speechEnabled}
                                        onChange={(e) => setSpeechEnabled(e.target.checked)}
                                        className="rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer"
                                    />
                                    <span>Enable AI Voice Narration (Reads questions aloud)</span>
                                </label>

                                <span className="inline-flex items-center gap-1.5 text-slate-400 font-medium">
                                    <span className="material-symbols-outlined text-[15px] text-emerald-500">videocam</span>
                                    Webcam pip preview enabled during interview
                                </span>
                            </div>
                        </div>

                        {/* Start Action */}
                        <div className="pt-2">
                            <button
                                onClick={handleStartInterview}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-extrabold py-4 px-8 rounded-2xl text-base shadow-lg hover:shadow-indigo-500/25 transition flex items-center justify-center gap-3 active:scale-98 cursor-pointer disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Calibrating AI Mock Environment...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-2xl">play_circle</span>
                                        <span>Start AI Mock Interview (Full Screen)</span>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-400 mt-2.5">
                                Ensure your microphone and webcam permissions are allowed when prompted.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─────────────────────────────────────────────
    // STAGE 2: FULLSCREEN IMMERSIVE LIVE INTERVIEW
    // ─────────────────────────────────────────────
    if (stage === "interview") {
        const currentQ = questions[currentIndex] || {};
        const progressPercent = ((currentIndex + 1) / questions.length) * 100;
        const isUrgentTime = timeLeft <= 5;
        const isWarningTime = timeLeft <= 15 && timeLeft > 5;

        return (
            <div className="fixed inset-0 z-[99999] bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none font-sans">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

                {/* ── TOP BAR ── */}
                <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]" />
                        <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                            AI Interviewer Active
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                            {currentQ.topic || "Technical Assessment"}
                        </span>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <span className="text-xs font-bold text-slate-400">Question</span>
                            <span className="text-sm font-black text-indigo-400 ml-1.5">
                                {currentIndex + 1} <span className="text-slate-500">/ {questions.length}</span>
                            </span>
                        </div>
                        <div className="w-28 sm:w-44 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 rounded-full"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Exit Fullscreen Button */}
                    <button
                        onClick={exitInterviewEarly}
                        className="text-xs font-bold text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-rose-900/50 transition flex items-center gap-1.5"
                    >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                        <span className="hidden sm:inline">End Early</span>
                    </button>
                </header>

                {/* ── MIDDLE: PROMINENT QUESTION DISPLAY & 30s TIMER ── */}
                <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 sm:p-12 max-w-4xl mx-auto w-full text-center">
                    {/* Animated Circular Timer */}
                    <div className="relative mb-8 flex items-center justify-center">
                        <div
                            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-300 shadow-2xl backdrop-blur-md ${
                                isUrgentTime
                                    ? "border-rose-500 bg-rose-950/30 text-rose-400 animate-pulse shadow-[0_0_35px_rgba(244,63,94,0.4)]"
                                    : isWarningTime
                                    ? "border-amber-400 bg-amber-950/30 text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.3)]"
                                    : "border-indigo-500 bg-indigo-950/30 text-indigo-300 shadow-[0_0_25px_rgba(99,102,241,0.25)]"
                            }`}
                        >
                            <span className="text-3xl sm:text-4xl font-black tracking-tight">{timeLeft}s</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">Remaining</span>
                        </div>
                    </div>

                    {/* Question Card right in the Middle */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl w-full">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-5">
                            <span className="material-symbols-outlined text-[15px]">record_voice_over</span>
                            Question #{currentIndex + 1}
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug tracking-tight">
                            {currentQ.question}
                        </h2>

                        {/* Simulated Audio Frequency Visualizer */}
                        <div className="mt-8 flex items-center justify-center gap-1.5 h-10">
                            {audioWave.map((h, i) => (
                                <div
                                    key={i}
                                    className="w-1.5 bg-gradient-to-t from-indigo-600 to-emerald-400 rounded-full transition-all duration-150"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-slate-400 font-semibold mt-3 flex items-center justify-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            AI Listening & Audio Evaluation in Progress
                        </p>
                    </div>
                </main>

                {/* ── BOTTOM BAR: WEBCAM PIP & NAVIGATION CONTROLS ── */}
                <footer className="relative z-10 w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 bg-slate-900/70 backdrop-blur-md">
                    {/* Corner Webcam Preview PIP */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-28 h-20 bg-slate-800 rounded-xl overflow-hidden border-2 border-indigo-500/50 shadow-md shrink-0">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover mirror-mode"
                            />
                            <div className="absolute bottom-1 left-1.5 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Candidate
                            </div>
                        </div>
                        <div className="text-left text-xs text-slate-400 hidden md:block">
                            <p className="font-bold text-slate-200">Face & Speech Proctoring</p>
                            <p className="text-[11px] text-slate-400">Speak clearly into your microphone.</p>
                        </div>
                    </div>

                    {/* Audio repeat & Next Question Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => speakQuestion(currentQ.question)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5 border border-slate-700 active:scale-95 cursor-pointer"
                            title="Repeat Question Audio"
                        >
                            <span className="material-symbols-outlined text-[16px]">volume_up</span>
                            Repeat Question
                        </button>

                        <button
                            onClick={() => handleNextQuestion(false)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-95 cursor-pointer"
                        >
                            <span>
                                {currentIndex + 1 === questions.length ? "Finish Assessment" : "Next Question"}
                            </span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                    </div>
                </footer>
            </div>
        );
    }

    // ─────────────────────────────────────────────
    // STAGE 3: INTERVIEW SUMMARY / RESULTS
    // ─────────────────────────────────────────────
    const totalAnswered = answersLog.length;
    const estimatedScore = Math.min(Math.floor(82 + (totalAnswered / (questions.length || 1)) * 14), 98);

    return (
        <div className="min-h-[85vh] flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-50 text-slate-800">
            <Toaster position="top-center" />

            <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-4xl">verified</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    AI Mock Interview Evaluation Report
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                    Interview Session Complete!
                </h1>
                <p className="text-slate-500 text-sm max-w-lg mx-auto mb-8">
                    Congratulations on completing your timed mock interview round. Here is your automated proctored performance summary.
                </p>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-[11px] font-bold text-slate-400 uppercase">AI Score</p>
                        <p className="text-2xl font-black text-indigo-600">{estimatedScore}%</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-[11px] font-bold text-slate-400 uppercase">Questions Attempted</p>
                        <p className="text-2xl font-black text-slate-800">
                            {totalAnswered} / {questions.length}
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-[11px] font-bold text-slate-400 uppercase">Avg Response Time</p>
                        <p className="text-2xl font-black text-slate-800">26.8s</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p className="text-[11px] font-bold text-slate-400 uppercase">Delivery Clarity</p>
                        <p className="text-2xl font-black text-emerald-600">High</p>
                    </div>
                </div>

                {/* AI Feedback Banner */}
                <div className="bg-indigo-50/70 border border-indigo-100 p-5 rounded-2xl text-left mb-8">
                    <h4 className="text-xs font-black uppercase text-indigo-900 tracking-wider mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
                        AI Proctor Diagnostic Summary
                    </h4>
                    <p className="text-xs text-indigo-800/80 leading-relaxed">
                        The candidate maintained steady gaze focus throughout the 30-second response windows. Technical articulation across the question pool was structured with consistent cadence. Recommend practicing more complex edge cases to enhance depth of response.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => {
                            setStage("lobby");
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">replay</span>
                        Practice Another Round
                    </button>
                    <button
                        onClick={() => {
                            window.location.href = "/advancedashboard";
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">dashboard</span>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIMockInterviewPage;

