import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard, getThumbnail } from "../DashboardContext";
import { SectionHeader } from "../new-dashboad";
import API from "../../API";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const TrainingPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { enrollData, userData, loading: contextLoading } = useDashboard();
    
    // For Multi-course Tab Selection
    const [selectedEnrollmentIndex, setSelectedEnrollmentIndex] = useState(0);
    const enrollment = enrollData?.[selectedEnrollmentIndex] || enrollData?.[0];

    // For TPO Course Selection
    const [availableCourses, setAvailableCourses] = useState([]);
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch all courses for TPO selection if no enrollments
    const { data: coursesData } = useQuery({
        queryKey: ["all-adv-courses"],
        queryFn: async () => {
            const res = await axios.get(`${API}/getadvcourses`);
            return res.data;
        },
        enabled: enrollData?.length === 0 && userData?.isTPOStudent === true
    });

    useEffect(() => {
        if (coursesData) {
            setAvailableCourses(coursesData.filter(c => c.show));
        }
    }, [coursesData]);

    const { data: sessionsDataRes, isLoading: loadingSessions } = useQuery({
        queryKey: ["sessions", enrollment?._id],
        queryFn: async () => {
            const res = await axios.get(`${API}/advenrollments/${enrollment._id}/sessions`);
            return res.data?.session || {};
        },
        enabled: !!enrollment?._id,
        staleTime: 1000 * 60 * 10,
    });

    const sessionsData = sessionsDataRes || {};
    const sessions = Object.entries(sessionsData);

    const totalSessions = enrollment?.progressStats?.totalSessionsCount || 0;
    const watchedSessions = enrollment?.progressStats?.watchedSessionsCount || 0;

    const loading = contextLoading || loadingSessions;

    const handleCourseToggle = (courseTitle) => {
        if (selectedCourseIds.includes(courseTitle)) {
            setSelectedCourseIds(selectedCourseIds.filter(id => id !== courseTitle));
        } else {
            if (selectedCourseIds.length >= 3) {
                toast.error("You can select a maximum of 3 courses.");
                return;
            }
            setSelectedCourseIds([...selectedCourseIds, courseTitle]);
        }
    };

    const handleTpoEnrollSubmit = async () => {
        if (selectedCourseIds.length === 0) {
            toast.error("Please select at least 1 course");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${API}/api/tpo/tpo-enroll-courses`, {
                email: userData?.email,
                fullname: userData?.fullname,
                phone: userData?.phone,
                collegeName: userData?.collegeName || userData?.college,
                courses: selectedCourseIds
            });
            toast.success("Enrolled successfully!");
            queryClient.invalidateQueries(['enrollments']);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error enrolling in courses");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading && enrollData?.length > 0) {
        return (
            <div className="nd-section-skeleton">
                <div className="nd-skeleton nd-sk-hero" />
                <div className="nd-skeleton nd-sk-card" />
                <div className="nd-skeleton nd-sk-card" />
                <div className="nd-skeleton nd-sk-card" />
            </div>
        );
    }

    if (enrollData?.length === 0) {
        if (userData?.isTPOStudent) {
            return (
                <div className="nd-section-body">
                    <SectionHeader icon="school" title="Select Your Courses" subtitle="Choose up to 3 courses provided by your college placement cell" />
                    
                    <div className="bg-[#11111a] border border-white/10 rounded-2xl p-6 mt-6">
                        <h3 className="text-xl font-bold text-white mb-4">Available Courses ({selectedCourseIds.length}/3 selected)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {availableCourses.map((course) => {
                                const isSelected = selectedCourseIds.includes(course.title);
                                return (
                                    <div 
                                        key={course._id} 
                                        onClick={() => handleCourseToggle(course.title)}
                                        className={`p-4 rounded-xl cursor-pointer border transition-all ${
                                            isSelected 
                                                ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
                                                : 'bg-black/40 border-white/10 hover:border-white/30'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-white font-semibold line-clamp-2">{course.title}</h4>
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                                                {isSelected && <span className="material-symbols-outlined text-[14px] text-white">check</span>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button 
                            onClick={handleTpoEnrollSubmit}
                            disabled={isSubmitting || selectedCourseIds.length === 0}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl disabled:opacity-50 transition-all flex items-center gap-2"
                        >
                            {isSubmitting ? <span className="material-symbols-outlined animate-spin">autorenew</span> : <span className="material-symbols-outlined">how_to_reg</span>}
                            Confirm Enrollment
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="nd-empty-state">
                <span className="material-symbols-outlined nd-empty-icon">menu_book</span>
                <p>No enrollment found. Contact support to get started.</p>
            </div>
        );
    }

    return (
        <div className="nd-section-body">
            <SectionHeader icon="menu_book" title="Training Sessions" subtitle={enrollData.length > 1 ? 'Multiple courses enrolled' : 'Your learning journey'} />

            {enrollData.length > 1 && (
                <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
                    {enrollData.map((enr, idx) => (
                        <button
                            key={enr._id}
                            onClick={() => setSelectedEnrollmentIndex(idx)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                                selectedEnrollmentIndex === idx 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {enr.domain?.title || enr.program}
                        </button>
                    ))}
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-lg font-bold text-white">{enrollment?.domain?.title || enrollment?.program}</h3>
                <p className="text-sm text-gray-400">{watchedSessions} of {totalSessions} sessions completed</p>
            </div>

            {totalSessions === 0 ? (
                <div className="nd-empty-state">
                    <span className="material-symbols-outlined nd-empty-icon">video_library</span>
                    <p>No sessions found for this program.</p>
                </div>
            ) : (
                <div className="nd-session-list">
                    {sessions.map(([key, session], idx) => {
                        const isWatched = idx < watchedSessions;
                        const isCurrent = idx === watchedSessions;
                        return (
                            <div key={key} className={`nd-session-card ${isWatched ? "nd-session-watched" : ""} ${isCurrent ? "nd-session-current" : ""}`}>
                                <div className="nd-session-number">
                                    {isWatched
                                        ? <span className="material-symbols-outlined nd-session-done-icon">check_circle</span>
                                        : <span className="nd-session-num-badge">{idx + 1}</span>
                                    }
                                </div>
                                <div className="nd-session-info">
                                    <p className="nd-session-title">{session?.title || session || `Session ${idx + 1}`}</p>
                                    <p className="nd-session-meta">
                                        {isWatched ? "Completed" : isCurrent ? "In Progress" : "Not Started"}
                                        {session?.duration ? ` · ${session.duration}` : ""}
                                    </p>
                                </div>
                                <div className="nd-session-action">
                                    {isCurrent ? (
                                        <button
                                            className="nd-session-play-btn nd-session-play-active"
                                            onClick={() => navigate("/advancedashboard/learning", {
                                                state: { courseTitle: enrollment?.domain?.title, sessions: sessionsData, enrollmentId: enrollment?._id, watchedSessionsFromDB: enrollment?.watchedSessions, thumbnail: getThumbnail(enrollment?.domain?.title) }
                                            })}
                                        >
                                            <span className="material-symbols-outlined">play_arrow</span>
                                            Continue
                                        </button>
                                    ) : isWatched ? (
                                        <button
                                            className="nd-session-play-btn nd-session-play-done"
                                            onClick={() => navigate("/advancedashboard/learning", {
                                                state: { courseTitle: enrollment?.domain?.title, sessions: sessionsData, enrollmentId: enrollment?._id, watchedSessionsFromDB: enrollment?.watchedSessions, thumbnail: getThumbnail(enrollment?.domain?.title) }
                                            })}
                                        >
                                            <span className="material-symbols-outlined">replay</span>
                                            Rewatch
                                        </button>
                                    ) : (
                                        <span className="nd-session-locked">
                                            <span className="material-symbols-outlined">lock</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TrainingPage;
