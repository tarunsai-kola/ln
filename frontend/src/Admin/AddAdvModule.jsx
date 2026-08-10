import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../API";

const AddAdvModule = () => {
  const [isLeftSidebar, setisLeftSidebar] = useState(true);
  const [isModuleFormVisible, setisModuleFormVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [editingModule, setEditingModule] = useState(null);

  const leftVisibility = () => {
    setisLeftSidebar((prevState) => !prevState);
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/getadvcourses`);
      const data = response.data || [];
      setCourses(data);
      if (data.length > 0) {
        await fetchCourseDetails(data[0]._id);
      }
    } catch (error) {
      console.error("There was an error fetching advance courses:", error);
    }
  };

  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await axios.get(`${API}/getadvcourses`, {
        params: { courseId },
      });
      setSelectedCourse(response.data || null);
    } catch (error) {
      console.error("There was an error fetching course details:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    fetchCourseDetails(course._id);
    setisModuleFormVisible(false);
    setEditingModule(null);
    setModuleTitle("");
    setModuleDescription("");
    if (window.innerWidth < 1024) {
      setisLeftSidebar(false); // Auto-hide sidebar on mobile after selection
    }
  };

  const handleModuleSubmit = async (event) => {
    event.preventDefault();

    if (selectedCourse) {
      const newSession = {
        title: moduleTitle.trim(),
        description: moduleDescription.trim(),
      };
      const updatedCourse = { ...selectedCourse };

      // Ensure session object exists
      if (!updatedCourse.session || typeof updatedCourse.session !== "object" || Array.isArray(updatedCourse.session)) {
        updatedCourse.session = {};
      }

      if (editingModule) {
        updatedCourse.session[editingModule] = newSession;
      } else {
        updatedCourse.session = {
          ...updatedCourse.session,
          [`session${Object.keys(updatedCourse.session).length + 1}`]: newSession,
        };
      }

      try {
        await axios.put(`${API}/updateadvcourse/${selectedCourse._id}`, updatedCourse);
        alert(editingModule ? "Session Updated" : "Session Added");
        setSelectedCourse(updatedCourse);
        setModuleTitle("");
        setModuleDescription("");
        setEditingModule(null);
        setisModuleFormVisible(false);
      } catch (error) {
        console.error("There was an error updating the advance course:", error);
      }
    }
  };

  const handleEditModule = (key) => {
    const isConfirmed = window.confirm("Are you sure you want to edit this session?");
    if (isConfirmed) {
      const session = selectedCourse.session[key];
      setModuleTitle(session.title);
      setModuleDescription(session.description);
      setEditingModule(key);
      setisModuleFormVisible(true);
    }
  };

  const handleDeleteModule = async (key) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this session?");
    if (isConfirmed) {
      if (selectedCourse) {
        const updatedCourse = { ...selectedCourse };
        const updatedSession = { ...updatedCourse.session };
        delete updatedSession[key];
        updatedCourse.session = updatedSession;

        try {
          await axios.put(`${API}/updateadvcourse/${selectedCourse._id}`, updatedCourse);
          setSelectedCourse(updatedCourse);
          alert("Session Deleted");
        } catch (error) {
          console.error("There was an error deleting the session:", error);
        }
      }
    }
  };

  const resetForm = () => {
    setModuleTitle("");
    setModuleDescription("");
    setEditingModule(null);
    setisModuleFormVisible(false);
  };

  if (!selectedCourse && courses.length === 0) {
    return (
      <div className="admin-content-wrap flex justify-center items-center py-32 bg-slate-50/50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="admin-content-wrap flex flex-col justify-center items-center py-32 bg-slate-50/50">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <i className="fa fa-exclamation-circle text-2xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">No advance courses found</h3>
        <p className="text-slate-500 mt-2">Please create an advance course first in the Add Advance Course section.</p>
      </div>
    );
  }

  const sessionKeys = selectedCourse.session && typeof selectedCourse.session === "object" && !Array.isArray(selectedCourse.session)
    ? Object.keys(selectedCourse.session)
    : [];

  return (
    <div className="admin-content-wrap bg-slate-50/50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
        
        {/* Left Sidebar - Course Selection */}
        {isLeftSidebar && (
          <div className="w-full lg:w-80 flex-shrink-0 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-300">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Advance Courses</h2>
                <p className="text-xs text-slate-500 mt-0.5">Select a course to manage sessions</p>
              </div>
              <button onClick={leftVisibility} className="lg:hidden text-slate-400 hover:text-slate-600">
                <i className="fa fa-times text-lg"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
              <ul className="space-y-1">
                {courses.map((course, index) => {
                  const isActive = selectedCourse?._id === course._id;
                  return (
                    <li
                      key={index}
                      onClick={() => handleCourseClick(course)}
                      className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                        isActive 
                          ? "bg-blue-50 text-blue-700 font-semibold" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate pr-4">{course.title}</span>
                      {isActive && <i className="fa fa-chevron-right text-xs opacity-50"></i>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {/* Right Main Content - Course Details & Sessions */}
        <div className={`flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${!isLeftSidebar ? 'w-full' : ''}`}>
          
          {/* Main Header */}
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {!isLeftSidebar && (
                <button 
                  onClick={leftVisibility} 
                  className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Show course list"
                >
                  <i className="fa fa-bars text-lg"></i>
                </button>
              )}
              <div>
                <h2 className="text-xl font-bold text-slate-800">{selectedCourse.title}</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {sessionKeys.length} {sessionKeys.length === 1 ? 'Session' : 'Sessions'} Total
                </p>
              </div>
            </div>
            <button
              onClick={() => setisModuleFormVisible(true)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <i className="fa fa-plus text-sm"></i>
              Add Session
            </button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/30">
            {sessionKeys.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fa fa-video-camera text-2xl text-slate-400"></i>
                </div>
                <h3 className="text-base font-medium text-slate-900">No sessions yet</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">This course currently has no sessions. Click the "Add Session" button to create one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {sessionKeys.map((key) => {
                  const session = selectedCourse.session[key];
                  return (
                    <div key={key} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                      <div className="p-5 flex-1 border-b border-slate-100">
                        <div className="flex justify-between items-start mb-3">
                          <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg uppercase tracking-wide">
                            {key.replace('session', 'Session ')}
                          </span>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditModule(key)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Session"
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteModule(key)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Session"
                            >
                              <i className="fa fa-trash-o"></i>
                            </button>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">{session.title}</h3>
                        <p className="text-sm text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-100 break-all line-clamp-1" title={session.description}>
                          <i className="fa fa-link mr-2 text-slate-400"></i>
                          {session.description}
                        </p>
                      </div>
                      <div className="bg-slate-900 aspect-video relative flex items-center justify-center">
                        {session.description ? (
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://drive.google.com/file/d/${session.description}/preview`}
                            allow="autoplay"
                            allowFullScreen
                            title={session.title}
                          ></iframe>
                        ) : (
                          <div className="text-slate-500 text-sm flex flex-col items-center">
                            <i className="fa fa-video-slash text-2xl mb-2"></i>
                            <span>No video link provided</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Course Description Section */}
            {selectedCourse.description && (
              <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i className="fa fa-info-circle text-blue-500"></i>
                  Course Description
                </h3>
                <div className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedCourse.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Session Modal */}
      {isModuleFormVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {editingModule ? "Update Session" : "Add New Session"}
              </h2>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
              >
                <i className="fa fa-times text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleModuleSubmit} className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Session Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Introduction to Advanced Concepts"
                    value={moduleTitle}
                    onChange={(e) => setModuleTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Google Drive File ID (Video Link)</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="e.g. 1A2b3C4d5E6f7G8h9I0j"
                    value={moduleDescription}
                    onChange={(e) => setModuleDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800 font-mono text-sm"
                    required
                  />
                  <p className="mt-2 text-xs text-slate-500 flex items-start gap-1">
                    <i className="fa fa-info-circle mt-0.5"></i>
                    Paste only the File ID from the Google Drive share link, not the entire URL.
                  </p>
                </div>
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
                  {editingModule ? "Save Changes" : "Add Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdvModule;

