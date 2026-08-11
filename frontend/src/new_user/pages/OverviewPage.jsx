import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDashboard, getThumbnail } from "../DashboardContext";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { StatCard } from "../new-dashboad";
import { AssignmentMatrixSection, InternshipReadinessSection } from "../components/MatrixSections";
import AttendanceStreak from "../components/AttendanceStreak";

const OverviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        enrollment, loading: contextLoading,
        progressPct, totalSessions,
        programName, isFullyPaid,
    } = useDashboard();

    const { metrics, loading: metricsLoading, refetchMetrics } = useDashboardMetrics();
    const loading = contextLoading || metricsLoading;

    // Re-fetch matrix data every time user lands on Overview page
    useEffect(() => {
        refetchMetrics();
    }, [location.pathname, refetchMetrics]);

    // 1. Program Completion
    // Primary: use progressPct from enrollment context (real-time from AdvEnroll)
    // Fallback: use DashboardMetrics percentage
    const programCompletion = progressPct || metrics?.programCompletion?.percentage || 0;
    const completionStatus = programCompletion >= 80 ? "green" : programCompletion >= 50 ? "yellow" : "red";
    const completionText = programCompletion >= 80 ? "Good Progress" : programCompletion >= 50 ? "Can Improve" : "Needs Improvement";

    // 2. Assignment Score — best score across all levels
    const assignmentMatrix = Array.isArray(metrics?.assignmentMatrix) ? metrics.assignmentMatrix : [];
    const assignmentScore = assignmentMatrix.length > 0
        ? Math.max(...assignmentMatrix.map(l => l.bestScore || 0))
        : 0;
    const assignmentStatus = assignmentScore >= 100 ? "green" : assignmentScore > 0 ? "yellow" : "red";
    const assignmentText = assignmentScore >= 100 ? "Perfect Score" : assignmentScore > 0 ? "In Progress" : "Not Started";

    // 3. Internship Progress — % of 24 weeks completed
    const weeklyProgress = Array.isArray(metrics?.internshipReadiness?.weeklyProgress) ? metrics.internshipReadiness.weeklyProgress : [];
    const doneWeeks = weeklyProgress.filter(w => w.status === 'Submitted' || w.status === 'Approved').length;
    const internshipPct = Math.round((doneWeeks / 24) * 100);
    const internshipStatus = internshipPct >= 100 ? "green" : internshipPct > 0 ? "yellow" : "red";
    const iPhase = `${doneWeeks}/24 Weeks Done`;

    // 4. Placement Readiness
    const readinessScore = metrics?.placementReadiness?.scorePercentage || 0;

    const paymentStatusColor = isFullyPaid ? "green" : "red";
    const paymentStatusText = isFullyPaid ? "Paid in Full" : "Payment Due";

    return (
        <div className="bento-container">
            {/* Welcome Banner */}
            <div className="bento-panel bento-welcome">
                <h1>Welcome back, {enrollment?.userId?.name || "Student"}!</h1>
                <p>Here is your advanced program overview. Continue learning and tracking your progress below.</p>
            </div>

            {/* Stat Cards */}
            {loading ? (
                <>
                    <div className="bento-panel bento-stat bento-skeleton"></div>
                    <div className="bento-panel bento-stat bento-skeleton"></div>
                    <div className="bento-panel bento-stat bento-skeleton"></div>
                    <div className="bento-panel bento-stat bento-skeleton"></div>
                </>
            ) : (
                <>
                    <div className="bento-panel bento-stat">
                        <div className="bento-stat-header">
                            <div className="bento-stat-icon"><span className="material-symbols-outlined">school</span></div>
                            <span className={`bento-stat-pill ${completionStatus}`}>{completionText}</span>
                        </div>
                        <div>
                            <p className="bento-stat-value">{programCompletion}%</p>
                            <p className="bento-stat-label">Completion</p>
                        </div>
                    </div>
                    <div className="bento-panel bento-stat">
                        <div className="bento-stat-header">
                            <div className="bento-stat-icon"><span className="material-symbols-outlined">assignment</span></div>
                            <span className={`bento-stat-pill ${assignmentStatus}`}>{assignmentText}</span>
                        </div>
                        <div>
                            <p className="bento-stat-value">{assignmentScore}%</p>
                            <p className="bento-stat-label">Best Score</p>
                        </div>
                    </div>
                    <div className="bento-panel bento-stat">
                        <div className="bento-stat-header">
                            <div className="bento-stat-icon"><span className="material-symbols-outlined">work</span></div>
                            <span className={`bento-stat-pill ${internshipStatus}`}>{iPhase}</span>
                        </div>
                        <div>
                            <p className="bento-stat-value">{internshipPct}%</p>
                            <p className="bento-stat-label">Internship</p>
                        </div>
                    </div>
                    <div className="bento-panel bento-stat">
                        <div className="bento-stat-header">
                            <div className="bento-stat-icon"><span className="material-symbols-outlined">payments</span></div>
                            <span className={`bento-stat-pill ${paymentStatusColor}`}>{paymentStatusText}</span>
                        </div>
                        <div>
                            <p className="bento-stat-value">{isFullyPaid ? "Paid" : "Pending"}</p>
                            <p className="bento-stat-label">Status</p>
                        </div>
                    </div>
                </>
            )}

            {/* Program Overview Card */}
            {loading ? (
                <div className="bento-panel bento-program bento-skeleton" style={{ height: 160 }} />
            ) : enrollment ? (
                <div className="bento-panel bento-program">
                    <div className="bento-program-left">
                        <div className="bento-program-icon-lg">
                            <span className="material-symbols-outlined">auto_stories</span>
                        </div>
                        <div>
                            <h2 className="bento-program-title">{programName}</h2>
                            <p className="bento-program-sub">{enrollment?.domain?.category || "Professional Program"}</p>
                            <div className="bento-tags">
                                <span className="bento-tag">{totalSessions} Sessions</span>
                                <span className="bento-tag" style={{ color: isFullyPaid ? 'var(--bento-success)' : 'var(--bento-danger)' }}>
                                    {isFullyPaid ? "Active" : "Payment Pending"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bento-program-right">
                        <div className="bento-ring-container">
                            <svg viewBox="0 0 80 80" className="bento-ring-svg">
                                <circle cx="40" cy="40" r="34" className="bento-ring-track" />
                                <circle
                                    cx="40" cy="40" r="34"
                                    className="bento-ring-fill"
                                    strokeDasharray={`${2 * Math.PI * 34}`}
                                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPct / 100)}`}
                                />
                            </svg>
                            <div className="bento-ring-label">
                                <span className="bento-ring-pct">{progressPct}%</span>
                                <span className="bento-ring-sub">Done</span>
                            </div>
                        </div>
                        <button
                            className="bento-btn"
                            onClick={() => navigate("/advancedashboard/learning", {
                                state: {
                                    courseTitle: enrollment?.domain?.title,
                                    sessions: null,
                                    enrollmentId: enrollment?._id,
                                    watchedSessionsFromDB: enrollment?.watchedSessions,
                                    thumbnail: getThumbnail(enrollment?.domain?.title || ""),
                                    isAdvance: enrollment?.advance || !!enrollment?.domainId?.sessions || !!localStorage.getItem("isAdvance"),
                                },
                            })}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_arrow</span>
                            Continue
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bento-panel bento-program">
                    <p style={{ color: 'var(--bento-subtext)' }}>No enrollment found. Contact support to get started.</p>
                </div>
            )}

            {/* Attendance Streak Heatmap */}
            <div className="bento-panel bento-streak">
                <div style={{ transform: 'scale(0.9)', width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
                    <AttendanceStreak userId={localStorage.getItem("userId")} />
                </div>
            </div>

            {/* Assignment Score Matrix */}
            <div className="bento-panel bento-matrix">
                <AssignmentMatrixSection
                    assignmentMatrix={metrics?.assignmentMatrix}
                    loading={metricsLoading}
                />
            </div>

            {/* 24-Week Internship Readiness */}
            <div className="bento-panel bento-matrix">
                <InternshipReadinessSection
                    internshipReadiness={metrics?.internshipReadiness}
                    loading={metricsLoading}
                />
            </div>
        </div>
    );
};

export default OverviewPage;
