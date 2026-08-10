import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../API";

const InterviewerDashboard = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // Mentor Auth
    const mentorName = localStorage.getItem("interviewerName");
    const mentorId = localStorage.getItem("interviewerId");

    // Video Upload State
    const [videoForm, setVideoForm] = useState({
        sessionTitle: "",
        driveLink: ""
    });
    const [mentorDetails, setMentorDetails] = useState(null);
    
    useEffect(() => {
        if (!localStorage.getItem("interviewerToken")) {
            navigate("/mentor-login");
        } else {
            fetchInterviews();
            fetchMentorDetails();
        }
    }, []);

    const fetchMentorDetails = async () => {
        try {
            const res = await axios.get(`${API}/api/interviewer/all`);
            const me = res.data.find(m => m._id === mentorId);
            setMentorDetails(me);
        } catch (error) {
            console.error("Failed to load mentor details", error);
        }
    }

    const fetchInterviews = async () => {
        try {
            const res = await axios.get(`${API}/api/interviewer/interviewer-dashboard/${mentorId}`);
            setInterviews(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("interviewerToken");
        localStorage.removeItem("interviewerId");
        localStorage.removeItem("interviewerName");
        navigate("/mentor-login");
    };

    const handleMeetLinkChange = async (interviewId, meetLink) => {
        if (!meetLink) {
            toast.error("Please enter a valid link");
            return;
        }
        try {
            await axios.post(`${API}/api/interview/mentor-add-meet-link`, {
                interviewId,
                meetLink
            });
            toast.success("Meeting link updated successfully!");
            fetchInterviews();
        } catch (error) {
            toast.error("Failed to update link");
        }
    };

    const extractDriveId = (url) => {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        
        if (!mentorDetails?.assignedCourseId?._id && !mentorDetails?.assignedCourseId) {
            toast.error("You are not assigned to any course. Cannot upload video.");
            return;
        }
        
        const courseId = mentorDetails.assignedCourseId._id || mentorDetails.assignedCourseId;

        try {
            await axios.post(`${API}/api/interview/mentor-upload-video`, {
                courseId,
                sessionTitle: videoForm.sessionTitle,
                driveLink: videoForm.driveLink
            });
            toast.success("Video successfully sent to LMS!");
            setVideoForm({ sessionTitle: "", driveLink: "" });
        } catch (error) {
            toast.error("Failed to upload video");
        }
    };

    const driveId = extractDriveId(videoForm.driveLink);

    return (
        <div className="min-h-screen bg-gray-50 font-sans relative">
            <Toaster position="top-center" />
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Mentor Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Welcome, {mentorName}</span>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                </div>
            </header>

            <main className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* SECTION 1: Scheduled Meetings */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Assigned Meetings</h2>
                    {loading ? (
                        <div className="py-10">Loading...</div>
                    ) : interviews.length === 0 ? (
                        <div className="py-10 text-gray-500 bg-white rounded-lg shadow p-6 text-center border">No meetings assigned yet.</div>
                    ) : (
                        <div className="space-y-6">
                            {interviews.map((interview) => (
                                <div key={interview._id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                                    <div className="bg-blue-600 p-4 flex justify-between items-center">
                                        <h3 className="text-white font-bold text-lg">{interview.interviewName}</h3>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold bg-white text-blue-800`}>{interview.mode}</span>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div className="text-gray-700 text-sm">
                                            <strong>Date:</strong> {new Date(interview.date).toDateString()} <br />
                                            <strong>Time:</strong> {interview.startTime} - {interview.endTime}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Google Meet Link</label>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    className="flex-1 border p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Paste meeting link here..."
                                                    defaultValue={interview.meetLink || ""}
                                                    onBlur={(e) => {
                                                        if (e.target.value !== interview.meetLink) {
                                                            handleMeetLinkChange(interview._id, e.target.value);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {interview.meetLink && (
                                                <a href={interview.meetLink} target="_blank" rel="noreferrer" className="text-blue-600 text-xs hover:underline mt-1 inline-block">Test Link</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SECTION 2: Video Upload */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Video to LMS</h2>
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        
                        {!mentorDetails?.assignedCourseId ? (
                            <div className="text-amber-600 bg-amber-50 p-4 rounded-md border border-amber-200">
                                You are not assigned to any course yet. Please contact the administrator.
                            </div>
                        ) : (
                            <form onSubmit={handleVideoSubmit} className="space-y-4">
                                <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded border">
                                    <strong>Assigned Course: </strong> 
                                    {mentorDetails?.assignedCourseId?.title || "Loading..."}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                                    <input 
                                        type="text"
                                        required
                                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. System Design Basics"
                                        value={videoForm.sessionTitle}
                                        onChange={(e) => setVideoForm({...videoForm, sessionTitle: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Google Drive Video Link</label>
                                    <input 
                                        type="text"
                                        required
                                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="https://drive.google.com/file/d/..../view?usp=sharing"
                                        value={videoForm.driveLink}
                                        onChange={(e) => setVideoForm({...videoForm, driveLink: e.target.value})}
                                    />
                                </div>

                                {driveId && (
                                    <div className="mt-4 border rounded-lg overflow-hidden bg-gray-50 p-2">
                                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Video Preview</p>
                                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                            <iframe
                                                src={`https://drive.google.com/file/d/${driveId}/preview`}
                                                className="absolute top-0 left-0 w-full h-full rounded"
                                                allow="autoplay"
                                                title="Preview"
                                            ></iframe>
                                        </div>
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
                                >
                                    Send to LMS
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default InterviewerDashboard;
