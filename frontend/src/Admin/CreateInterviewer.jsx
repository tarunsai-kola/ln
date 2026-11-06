import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import API from "../API";

const CreateMentor = ({ defaultTab = "active" }) => {
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") || defaultTab;
    const [activeTab, setActiveTab] = useState(initialTab); // "active" or "applications"

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [mentors, setMentors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        subjects: "",
        assignedCourseId: "",
    });

    // Onboarding Applications State
    const [applications, setApplications] = useState([]);
    const [loadingApplications, setLoadingApplications] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [offerTargetApp, setOfferTargetApp] = useState(null);
    const [perSessionRate, setPerSessionRate] = useState("");
    const [isSendingOffer, setIsSendingOffer] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    useEffect(() => {
        fetchMentors();
        fetchCourses();
        fetchApplications();
    }, []);

    const fetchMentors = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/interviewer/all`);
            setMentors(res.data);
        } catch (error) {
            console.error("Failed to fetch mentors", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${API}/getcourses`);
            const advRes = await axios.get(`${API}/getadvcourses`);
            const allCourses = [...(res.data || []), ...(advRes.data || [])];
            setCourses(allCourses);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        }
    };

    const fetchApplications = async () => {
        try {
            setLoadingApplications(true);
            const res = await axios.get(`${API}/api/mentor-onboarding/all`);
            if (res.data && res.data.data) {
                setApplications(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch mentor applications", error);
        } finally {
            setLoadingApplications(false);
        }
    };

    const toggleVisibility = () => {
        setIsFormVisible(!isFormVisible);
        if (isFormVisible) {
            setEditId(null);
            setFormData({ fullname: "", email: "", phone: "", password: "", subjects: "", assignedCourseId: "" });
        }
    };

    const handleEdit = (mentor) => {
        setEditId(mentor._id);
        setFormData({
            fullname: mentor.fullname || "",
            email: mentor.email || "",
            phone: mentor.phone || "",
            password: mentor.password || "",
            subjects: mentor.subjects ? mentor.subjects.join(", ") : "",
            assignedCourseId: mentor.assignedCourseId ? mentor.assignedCourseId._id : "",
        });
        setIsFormVisible(true);
        setActiveTab("active");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                subjects: typeof formData.subjects === 'string' ? formData.subjects.split(",").map(s => s.trim()).filter(Boolean) : formData.subjects
            };
            let response;
            if (editId) {
                response = await axios.put(`${API}/api/interviewer/update-interviewer/${editId}`, payload);
            } else {
                response = await axios.post(`${API}/api/interviewer/create-interviewer`, payload);
            }
            if (response.status === 201 || response.status === 200) {
                toast.success(editId ? "Mentor Updated Successfully!" : "Mentor Created Successfully!");
                setFormData({ fullname: "", email: "", phone: "", password: "", subjects: "", assignedCourseId: "" });
                setEditId(null);
                setIsFormVisible(false);
                fetchMentors();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || (editId ? "Failed to update mentor" : "Failed to create mentor"));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this mentor?")) return;
        try {
            await axios.delete(`${API}/api/interviewer/delete-interviewer/${id}`);
            toast.success("Mentor deleted successfully");
            fetchMentors();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete mentor");
        }
    };

    // ── Application Handlers ──
    const handleOpenOfferModal = (app) => {
        setOfferTargetApp(app);
        setPerSessionRate(app.perSessionRate || "");
        setIsOfferModalOpen(true);
    };

    const handleSendFreelanceOffer = async (e) => {
        e.preventDefault();
        if (!offerTargetApp) return;

        setIsSendingOffer(true);
        const toastId = toast.loading(`Generating & dispatching Freelance Offer Letter to ${offerTargetApp.email}...`);
        try {
            const res = await axios.post(`${API}/api/mentor-onboarding/send-offer-letter/${offerTargetApp._id}`, {
                perSessionRate: Number(perSessionRate) || 0
            });
            if (res.data && res.data.success) {
                toast.success(`Freelance Offer Letter sent to ${offerTargetApp.fullname}! (CC: aravind@accenlearn.com)`, { id: toastId });
                setIsOfferModalOpen(false);
                setOfferTargetApp(null);
                fetchApplications();
            } else {
                toast.error(res.data?.message || "Failed to send offer letter", { id: toastId });
            }
        } catch (err) {
            console.error("Error sending offer letter:", err);
            toast.error(err.response?.data?.message || "Failed to send freelance offer letter", { id: toastId });
        } finally {
            setIsSendingOffer(false);
        }
    };

    const handleCreatePortalAccount = async (app) => {
        if (!window.confirm(`Activate and create Mentor Portal Login Account for ${app.fullname} (${app.email})?`)) return;

        setIsCreatingAccount(true);
        const toastId = toast.loading(`Creating portal login credentials for ${app.fullname}...`);
        try {
            const res = await axios.post(`${API}/api/mentor-onboarding/create-account/${app._id}`, {});
            if (res.data && res.data.success) {
                toast.success(`Mentor account activated! Login credentials emailed to ${app.email}`, { id: toastId });
                fetchApplications();
                fetchMentors();
            } else {
                toast.error(res.data?.message || "Failed to create mentor account", { id: toastId });
            }
        } catch (err) {
            console.error("Error creating portal account:", err);
            toast.error(err.response?.data?.message || "Failed to create portal account", { id: toastId });
        } finally {
            setIsCreatingAccount(false);
        }
    };

    const handleDeleteApplication = async (id) => {
        if (!window.confirm("Are you sure you want to delete this onboarding application?")) return;
        try {
            await axios.delete(`${API}/api/mentor-onboarding/${id}`);
            toast.success("Application deleted");
            fetchApplications();
        } catch (err) {
            toast.error("Failed to delete application");
        }
    };

    const handleViewDetails = (app) => {
        setSelectedApplication(app);
        setIsDetailModalOpen(true);
    };

    const pendingCount = applications.filter(a => !a.offerLetterSent).length;

    return (
        <div id="AdminAddCourse" className="md:ml-[265px] p-4 sm:p-8 bg-slate-900 min-h-screen text-slate-100">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "active" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "bg-slate-800 text-slate-400 hover:text-white"}`}
                    >
                        <span>Active Mentors</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-slate-900/60 font-semibold">{mentors.length}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("applications")}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 relative ${activeTab === "applications" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "bg-slate-800 text-slate-400 hover:text-white"}`}
                    >
                        <span>Onboarding Submissions</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-slate-900/60 font-semibold">{applications.length}</span>
                        {pendingCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black animate-pulse">
                                {pendingCount} Pending
                            </span>
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/AssignMentorOp"
                        className="px-4 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold transition flex items-center gap-2"
                    >
                        <i className="fa fa-user-plus"></i>
                        Assign Mentor OP
                    </Link>

                    {activeTab === "active" && (
                        <button
                            onClick={toggleVisibility}
                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-1.5"
                        >
                            + Add New Mentor
                        </button>
                    )}

                    <button
                        onClick={() => { fetchMentors(); fetchApplications(); }}
                        className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition text-xs"
                        title="Refresh Data"
                    >
                        <i className="fa fa-refresh"></i>
                    </button>
                </div>
            </div>

            {/* Create / Edit Mentor Form Modal */}
            {isFormVisible && (
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <span onClick={toggleVisibility} className="cursor-pointer">✖</span>
                        <h2>{editId ? "Edit Mentor Account" : "Create Mentor Account"}</h2>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <input
                            type="text"
                            name="subjects"
                            value={formData.subjects}
                            onChange={handleChange}
                            placeholder="Subjects (comma separated)"
                        />
                        <select
                            name="assignedCourseId"
                            value={formData.assignedCourseId}
                            onChange={handleChange}
                            className="w-full p-2 border mb-4 rounded"
                            required
                        >
                            <option value="">-- Assign Course --</option>
                            {courses.map(course => (
                                <option key={course._id} value={course._id}>{course.title}</option>
                            ))}
                        </select>
                        <button type="submit">{editId ? "Update Account" : "Create Account"}</button>
                    </form>
                </div>
            )}

            {/* ── TAB 1: ACTIVE MENTORS ── */}
            {activeTab === "active" && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-white">Active Mentors Directory</h2>
                            <p className="text-xs text-slate-400">Mentors registered and assigned to cohorts/courses</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-12 text-center text-slate-400">
                            <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <p className="text-sm">Loading mentors directory...</p>
                        </div>
                    ) : mentors.length === 0 ? (
                        <div className="py-12 text-center text-slate-500 text-sm">
                            No mentors found. Click "+ Add New Mentor" to create one.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/40">
                                        <th className="py-3.5 px-4">Sl</th>
                                        <th className="py-3.5 px-4">Name</th>
                                        <th className="py-3.5 px-4">Email</th>
                                        <th className="py-3.5 px-4">Phone</th>
                                        <th className="py-3.5 px-4">Subjects / Domain</th>
                                        <th className="py-3.5 px-4">Assigned Course</th>
                                        <th className="py-3.5 px-4">Assigned OP</th>
                                        <th className="py-3.5 px-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {mentors.map((item, index) => (
                                        <tr key={item._id} className="hover:bg-slate-800/40 transition">
                                            <td className="py-3.5 px-4 font-semibold text-slate-500">{index + 1}</td>
                                            <td className="py-3.5 px-4 font-bold text-white">{item.fullname}</td>
                                            <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">{item.email}</td>
                                            <td className="py-3.5 px-4 text-slate-300">{item.phone || "N/A"}</td>
                                            <td className="py-3.5 px-4">
                                                <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
                                                    {item.subjects?.join(", ") || "General"}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 text-slate-200">{item.assignedCourseId?.title || "N/A"}</td>
                                            <td className="py-3.5 px-4">
                                                {item.assignedOperationName ? (
                                                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                                                        {item.assignedOperationName}
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs border border-amber-500/20">
                                                        Unassigned
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                                <Link
                                                    to="/AssignMentorOp"
                                                    title="Assign to Operation"
                                                    className="inline-flex items-center justify-center p-2 rounded-lg bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white transition mr-2"
                                                >
                                                    <i className="fa fa-user-plus text-xs"></i>
                                                </Link>
                                                <button
                                                    title="Edit"
                                                    onClick={() => handleEdit(item)}
                                                    className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition mr-2"
                                                >
                                                    <i className="fa fa-edit text-xs"></i>
                                                </button>
                                                <button
                                                    title="Delete"
                                                    onClick={() => handleDelete(item._id)}
                                                    className="inline-flex items-center justify-center p-2 rounded-lg bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white transition"
                                                >
                                                    <i className="fa fa-trash-o text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* ── TAB 2: ONBOARDING SUBMISSIONS & FREELANCE APPLICATIONS ── */}
            {activeTab === "applications" && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span>Mentor Onboarding Submissions</span>
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    /mentordashboardaccessform
                                </span>
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Review submitted applications, banking credentials, and dispatch Freelance Mentor Offer Letters
                            </p>
                        </div>
                        <div className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                            Offer Letter CC: <code className="text-indigo-300 font-bold">aravind@accenlearn.com</code>
                        </div>
                    </div>

                    {loadingApplications ? (
                        <div className="py-12 text-center text-slate-400">
                            <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <p className="text-sm">Fetching onboarding applications...</p>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="py-16 text-center text-slate-500 text-sm">
                            <i className="fa fa-inbox text-3xl mb-2 block opacity-40"></i>
                            No mentor onboarding applications submitted yet.
                            <br />
                            <span className="text-xs text-slate-600">Submissions from <code>/mentordashboardaccessform</code> will arrive here automatically.</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/40">
                                        <th className="py-3.5 px-4">Sl</th>
                                        <th className="py-3.5 px-4">Mentor Contact</th>
                                        <th className="py-3.5 px-4">Current Company & Role</th>
                                        <th className="py-3.5 px-4">Opted Domain</th>
                                        <th className="py-3.5 px-4">Verification Links</th>
                                        <th className="py-3.5 px-4">Bank / UPI</th>
                                        <th className="py-3.5 px-4">Offer Letter</th>
                                        <th className="py-3.5 px-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {applications.map((app, index) => (
                                        <tr key={app._id} className="hover:bg-slate-800/40 transition">
                                            <td className="py-3.5 px-4 font-semibold text-slate-500">{index + 1}</td>

                                            {/* Contact Details */}
                                            <td className="py-3.5 px-4">
                                                <div className="font-bold text-white text-sm">{app.fullname}</div>
                                                <div className="text-xs text-indigo-300 font-mono">{app.email}</div>
                                                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                                                    <span>📞 {app.phone}</span>
                                                    {app.whatsAppNumber && (
                                                        <a
                                                            href={`https://web.whatsapp.com/send?phone=${app.whatsAppNumber.replace(/[^0-9]/g, "")}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-0.5"
                                                            title="Chat on WhatsApp"
                                                        >
                                                            <i className="fa fa-whatsapp"></i> WA
                                                        </a>
                                                    )}
                                                </div>
                                                {app.companyEmail && (
                                                    <div className="text-[11px] text-slate-500 font-mono">Work: {app.companyEmail}</div>
                                                )}
                                            </td>

                                            {/* Company & Role */}
                                            <td className="py-3.5 px-4">
                                                <div className="font-semibold text-slate-200">{app.companyName || "N/A"}</div>
                                                <div className="text-xs text-slate-400">{app.role || "N/A"}</div>
                                                <div className="text-[11px] text-purple-300 font-medium">Exp: {app.experience || "N/A"}</div>
                                            </td>

                                            {/* Domain */}
                                            <td className="py-3.5 px-4">
                                                <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-semibold text-xs border border-indigo-500/30">
                                                    {app.optedDomain}
                                                </span>
                                            </td>

                                            {/* Drive / Social Links */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-2">
                                                    {app.resumeLink && (
                                                        <a
                                                            href={app.resumeLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 transition"
                                                            title="Open Resume Drive Link"
                                                        >
                                                            <i className="fa fa-file-pdf-o"></i> Resume
                                                        </a>
                                                    )}
                                                    {app.photoLink && (
                                                        <a
                                                            href={app.photoLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-2 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition"
                                                            title="Open Photo Link"
                                                        >
                                                            <i className="fa fa-picture-o"></i> Photo
                                                        </a>
                                                    )}
                                                    {app.linkedin && (
                                                        <a
                                                            href={app.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-400 hover:text-blue-300 text-sm"
                                                            title="LinkedIn"
                                                        >
                                                            <i className="fa fa-linkedin"></i>
                                                        </a>
                                                    )}
                                                    {app.github && (
                                                        <a
                                                            href={app.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-slate-300 hover:text-white text-sm"
                                                            title="GitHub"
                                                        >
                                                            <i className="fa fa-github"></i>
                                                        </a>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Bank & UPI */}
                                            <td className="py-3.5 px-4 text-xs">
                                                <div className="font-semibold text-slate-200">{app.bankName}</div>
                                                <div className="text-slate-400 font-mono">A/C: {app.accountNumber}</div>
                                                <div className="text-[11px] text-slate-500 font-mono">IFSC: {app.ifscCode}</div>
                                                {app.upiNumber && (
                                                    <div className="text-[11px] text-cyan-400 font-mono mt-0.5">UPI: {app.upiNumber}</div>
                                                )}
                                            </td>

                                            {/* Offer Letter Status */}
                                            <td className="py-3.5 px-4">
                                                {app.offerLetterSent ? (
                                                    <div>
                                                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-1">
                                                            <i className="fa fa-check"></i> Offer Sent
                                                        </span>
                                                        <div className="text-[10px] text-slate-500 mt-1">
                                                            {app.offerLetterSentDate ? new Date(app.offerLetterSentDate).toLocaleDateString() : "Dispatched"}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold inline-flex items-center gap-1">
                                                        <i className="fa fa-clock-o"></i> Not Sent
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* Send Freelance Offer Letter */}
                                                    <button
                                                        onClick={() => handleOpenOfferModal(app)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${app.offerLetterSent ? "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-900/30"}`}
                                                        title="Send Freelance Mentor Offer Letter"
                                                    >
                                                        <i className="fa fa-send"></i>
                                                        {app.offerLetterSent ? "Resend Offer" : "Send Offer Letter"}
                                                    </button>

                                                    {/* Create / Activate Portal Account */}
                                                    <button
                                                        onClick={() => handleCreatePortalAccount(app)}
                                                        disabled={isCreatingAccount}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${app.interviewerId ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/30" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
                                                        title="Activate Mentor Portal Credentials"
                                                    >
                                                        <i className="fa fa-user-check"></i>
                                                        {app.interviewerId ? "Active" : "Activate"}
                                                    </button>

                                                    {/* View Details */}
                                                    <button
                                                        onClick={() => handleViewDetails(app)}
                                                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-xs"
                                                        title="View Complete Details"
                                                    >
                                                        <i className="fa fa-eye"></i>
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        onClick={() => handleDeleteApplication(app._id)}
                                                        className="p-2 rounded-lg bg-rose-600/10 hover:bg-rose-600 hover:text-white text-rose-400 transition text-xs"
                                                        title="Delete Application"
                                                    >
                                                        <i className="fa fa-trash-o"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* ── MODAL: Send Freelance Offer Letter ── */}
            {isOfferModalOpen && offerTargetApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-slate-100">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                            <div>
                                <h3 className="text-xl font-black text-white">Send Freelance Offer Letter</h3>
                                <p className="text-xs text-indigo-400">Accenlearn Mentor Faculty Program</p>
                            </div>
                            <button
                                onClick={() => { setIsOfferModalOpen(false); setOfferTargetApp(null); }}
                                className="text-slate-400 hover:text-white text-lg"
                            >
                                ✖
                            </button>
                        </div>

                        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 text-xs space-y-2 mb-6">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Mentor Name:</span>
                                <span className="font-bold text-white">{offerTargetApp.fullname}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Recipient Email:</span>
                                <span className="font-mono text-indigo-300">{offerTargetApp.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Opted Domain:</span>
                                <span className="font-semibold text-white">{offerTargetApp.optedDomain}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">CC Included:</span>
                                <span className="font-mono text-emerald-400">aravind@accenlearn.com</span>
                            </div>
                        </div>

                        <form onSubmit={handleSendFreelanceOffer}>
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                    Per-Session Rate (INR) <span className="text-slate-500 font-normal">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">
                                        ₹
                                    </span>
                                    <input
                                        type="number"
                                        value={perSessionRate}
                                        onChange={(e) => setPerSessionRate(e.target.value)}
                                        placeholder="e.g. 1500"
                                        className="w-full pl-8 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                </div>
                                <span className="text-[11px] text-slate-400 mt-1 block">
                                    Leave blank or specify the per-session fee to be printed in the formal PDF offer letter.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setIsOfferModalOpen(false); setOfferTargetApp(null); }}
                                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSendingOffer}
                                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-900/50 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSendingOffer ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Generating PDF & Sending...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa fa-paper-plane"></i>
                                            Dispatch Offer Letter
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── MODAL: Complete Details View ── */}
            {isDetailModalOpen && selectedApplication && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                            <div>
                                <h3 className="text-xl font-black text-white">{selectedApplication.fullname}</h3>
                                <p className="text-xs text-indigo-400">Complete Onboarding Dossier & Banking Details</p>
                            </div>
                            <button
                                onClick={() => { setIsDetailModalOpen(false); setSelectedApplication(null); }}
                                className="text-slate-400 hover:text-white text-lg"
                            >
                                ✖
                            </button>
                        </div>

                        <div className="space-y-6 text-sm">
                            {/* Personal & Professional */}
                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
                                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">1. Personal & Professional</h4>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div><span className="text-slate-400">Personal Email:</span> <span className="font-semibold text-white block">{selectedApplication.email}</span></div>
                                    <div><span className="text-slate-400">Company Email:</span> <span className="font-semibold text-white block">{selectedApplication.companyEmail || "N/A"}</span></div>
                                    <div><span className="text-slate-400">Phone:</span> <span className="font-semibold text-white block">{selectedApplication.phone}</span></div>
                                    <div><span className="text-slate-400">WhatsApp:</span> <span className="font-semibold text-emerald-400 block">{selectedApplication.whatsAppNumber}</span></div>
                                    <div><span className="text-slate-400">Company Name:</span> <span className="font-semibold text-white block">{selectedApplication.companyName}</span></div>
                                    <div><span className="text-slate-400">Role in Company:</span> <span className="font-semibold text-white block">{selectedApplication.role}</span></div>
                                    <div><span className="text-slate-400">Experience:</span> <span className="font-semibold text-white block">{selectedApplication.experience}</span></div>
                                    <div><span className="text-slate-400">Opted Domain:</span> <span className="font-semibold text-indigo-300 block">{selectedApplication.optedDomain}</span></div>
                                </div>
                            </div>

                            {/* Verification & Links */}
                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
                                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">2. Document Links</h4>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Resume Link:</span>
                                        <a href={selectedApplication.resumeLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono truncate max-w-xs">
                                            {selectedApplication.resumeLink}
                                        </a>
                                    </div>
                                    {selectedApplication.photoLink && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Photo Link:</span>
                                            <a href={selectedApplication.photoLink} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-mono truncate max-w-xs">
                                                {selectedApplication.photoLink}
                                            </a>
                                        </div>
                                    )}
                                    {selectedApplication.linkedin && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">LinkedIn:</span>
                                            <a href={selectedApplication.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-mono truncate max-w-xs">
                                                {selectedApplication.linkedin}
                                            </a>
                                        </div>
                                    )}
                                    {selectedApplication.github && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">GitHub:</span>
                                            <a href={selectedApplication.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:underline font-mono truncate max-w-xs">
                                                {selectedApplication.github}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
                                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3">3. Payout & Bank Details</h4>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div><span className="text-slate-400">Bank Name:</span> <span className="font-semibold text-white block">{selectedApplication.bankName}</span></div>
                                    <div><span className="text-slate-400">Branch:</span> <span className="font-semibold text-white block">{selectedApplication.branchName}</span></div>
                                    <div><span className="text-slate-400">Account Number:</span> <span className="font-mono font-bold text-cyan-300 block">{selectedApplication.accountNumber}</span></div>
                                    <div><span className="text-slate-400">IFSC Code:</span> <span className="font-mono font-bold text-cyan-300 block">{selectedApplication.ifscCode}</span></div>
                                    <div><span className="text-slate-400">UPI Number / ID:</span> <span className="font-mono text-white block">{selectedApplication.upiNumber || "N/A"}</span></div>
                                    <div><span className="text-slate-400">Per-Session Rate:</span> <span className="font-bold text-emerald-400 block">{selectedApplication.perSessionRate ? `₹${selectedApplication.perSessionRate}` : "Standard"}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => { setIsDetailModalOpen(false); setSelectedApplication(null); }}
                                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                            >
                                Close Dossier
                            </button>
                            <button
                                onClick={() => {
                                    const app = selectedApplication;
                                    setIsDetailModalOpen(false);
                                    handleOpenOfferModal(app);
                                }}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
                            >
                                <i className="fa fa-send"></i>
                                Send Offer Letter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateMentor;
