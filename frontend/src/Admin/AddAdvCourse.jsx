import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import "react-quill/dist/quill.snow.css";

const AddAdvCourse = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);

  const toggleVisibility = () => {
    setiscourseFormVisible((prevState) => !prevState);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingCourseId(null);
    setShow(true);
    setiscourseFormVisible(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const newCourse = {
      title: title.trim(),
      description: description.trim(),
      show: show,
    };
    try {
      if (editingCourseId) {
        await axios.put(`${API}/editadvcourse/${editingCourseId}`, newCourse, { withCredentials: true });
        alert("Advance course updated successfully!");
      } else {
        await axios.post(`${API}/createadvcourse`, newCourse, { withCredentials: true });
        alert("Advance course created successfully!");
      }
      fetchCourses();
      resetForm();
    } catch (error) {
      console.error("There was an error submitting the advance course:", error);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Add timestamp to prevent browser caching
      const response = await axios.get(`${API}/getadvcourses?t=${Date.now()}`);
      setCourses(response.data || []);
    } catch (error) {
      console.error("There was an error fetching advance courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (_id, selectedCourse) => {
    if (selectedCourse.session && Object.keys(selectedCourse.session).length > 0) {
      alert("You can't delete this course because it has sessions");
      return;
    } else {
      const isConfirmed = window.confirm("Are you sure you want to delete this advance course?");
      if (isConfirmed) {
        axios
          .delete(`${API}/deleteadvcourse/${_id}`, { withCredentials: true })
          .then(() => {
            setCourses((prevCourses) =>
              prevCourses.filter((course) => course._id !== _id)
            );
          })
          .catch((error) => {
            console.error("There was an error deleting the advance course:", error);
          });
      }
    }
  };

  const handleEdit = (courseId) => {
    const isConfirmed = window.confirm("Are you sure you want to edit this?");
    if (isConfirmed) {
      const courseToEdit = courses.find((course) => course._id === courseId);
      setTitle(courseToEdit.title);
      setDescription(courseToEdit.description);
      setShow(courseToEdit.show !== undefined ? courseToEdit.show : true);
      setEditingCourseId(courseId);
      setiscourseFormVisible(true);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div id="AdminAddCourse" className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Advance Courses</h1>
            <p className="text-slate-500 mt-1">Manage and organize all advanced course offerings.</p>
          </div>
          <button
            onClick={toggleVisibility}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95"
          >
            <i className="fa fa-plus text-sm"></i>
            Add New Course
          </button>
        </div>

        {/* Modal Form */}
        {iscourseFormVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingCourseId ? "Edit Course Details" : "Create New Course"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <i className="fa fa-times text-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSumbit} className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Course Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Advanced System Design"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      placeholder="Briefly describe the course objectives and content..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800 min-h-[120px] resize-y"
                      required
                    />
                  </div>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={show}
                        onChange={(e) => setShow(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">Visibility</span>
                      <span className="text-xs text-slate-500">Show in Dashboard Access Form</span>
                    </div>
                  </label>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all"
                  >
                    {editingCourseId ? "Save Changes" : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-20 text-center">#</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course Title</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32 text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses && courses.length > 0 ? (
                    courses.map((course, index) => (
                      <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4 text-sm text-slate-500 font-medium text-center">
                          {(index + 1).toString().padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-slate-800">{course.title}</div>
                          {course.description && (
                            <div className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-md">
                              {course.description}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            course.show 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${course.show ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                            {course.show ? "Visible" : "Hidden"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(course._id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Course"
                            >
                              <i className="fa fa-edit text-lg"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(course._id, course)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Course"
                            >
                              <i className="fa fa-trash-o text-lg"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fa fa-book text-2xl text-slate-400"></i>
                          </div>
                          <h3 className="text-sm font-medium text-slate-900">No courses available</h3>
                          <p className="text-sm text-slate-500 mt-1">Get started by creating a new advanced course.</p>
                          <button
                            onClick={toggleVisibility}
                            className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            + Add New Course
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAdvCourse;

