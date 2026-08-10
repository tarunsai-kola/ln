import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import API from "../API";

const CreateMentor = () => {
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

    useEffect(() => {
        fetchMentors();
        fetchCourses();
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

    const toggleVisibility = () => {
        setIsFormVisible(!isFormVisible);
        if (isFormVisible) {
            // closing
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
                setIsFormVisible(false); // Close form
                fetchMentors(); // Refresh list
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
            fetchMentors(); // Refresh list
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete mentor");
        }
    };

    return (
        <div id="AdminAddCourse">
            <Toaster position="top-center" reverseOrder={false} />

            {isFormVisible && (
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <span onClick={toggleVisibility}>✖</span>
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
                            className="w-full p-2 border mb-4"
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

            <div className="coursetable">
                <div>
                    <h2>Mentor List</h2>
                    <span onClick={toggleVisibility}>+ Add New Mentor</span>
                </div>

                {loading ? (
                    <div id="loader">
                        <div className="three-body">
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                        </div>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Subjects</th>
                                <th>Assigned Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mentors.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone || "N/A"}</td>
                                    <td>{item.subjects?.join(", ") || "N/A"}</td>
                                    <td>{item.assignedCourseId?.title || "N/A"}</td>
                                    <td>
                                        <button title="Edit" onClick={() => handleEdit(item)} className="mr-2">
                                            <i className="fa fa-edit text-blue-600"></i>
                                        </button>
                                        <button title="Delete" onClick={() => handleDelete(item._id)}>
                                            <i className="fa fa-trash-o text-red-600"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CreateMentor;
