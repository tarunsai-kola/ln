import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast, { Toaster } from "react-hot-toast";
import { GraduationCap, Plus, X, Edit2, Trash2, Download, Users, FileText, CheckCircle2, AlertCircle, CalendarDays, Link as LinkIcon, Image as ImageIcon, Clock, MapPin, Tag, Globe, Award, Target, Star, Briefcase, LayoutTemplate } from "lucide-react";

const MasterClasses = () => {
  const [isFormVisible, setisFormVisible] = useState(false);
  const [editClassId, setEditClassId] = useState(null);
  const [allMasterClass, setAllMasterClass] = useState([]);
  const [selectedMC, setSelectedMC] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    link: "",
    image: "",
    subheading: "",
    duration: "",
    venue: "",
    registeredCount: "",
    rating: "",
    level: "",
    price: "",
    language: "",
    certificateAvailable: "",
    instructorName: "",
    instructorLinkedIn: "",
    instructorDesignation: "",
    instructorExpertise: "",
    instructorCredibility: "",
    instructorExperience: "",
    instructorLearnersMentored: "",
    instructorRating: "",
    instructorSessions: "",
    instructorCompanyTags: "",
    instructorPhoto: "",
    whyAttend: "",
    whatYouWillLearn: "",
    whoShouldAttend: "",
    transformationBefore: "",
    transformationAfter: "",
    faqs: "",
  });

  const [takeaways, setTakeaways] = useState([{ title: "", desc: "" }]);
  const [faqsList, setFaqsList] = useState([{ q: "", a: "" }]);

  const resetForm = () => {
    setFormData({
      title: "",
      start: "",
      end: "",
      link: "",
      image: "",
      subheading: "",
      duration: "",
      venue: "",
      registeredCount: "",
      rating: "",
      level: "",
      price: "",
      language: "",
      certificateAvailable: "",
      instructorName: "",
      instructorLinkedIn: "",
      instructorDesignation: "",
      instructorExpertise: "",
      instructorCredibility: "",
      instructorExperience: "",
      instructorLearnersMentored: "",
      instructorRating: "",
      instructorSessions: "",
      instructorCompanyTags: "",
      instructorPhoto: "",
      whyAttend: "",
      whatYouWillLearn: "",
      whoShouldAttend: "",
      transformationBefore: "",
      transformationAfter: "",
      faqs: "",
    });
    setTakeaways([{ title: "", desc: "" }]);
    setFaqsList([{ q: "", a: "" }]);
    setEditClassId(null);
    setisFormVisible(false);
    setActiveTab("basic");
  };

  const isDriveFolderUrl = (url) =>
    typeof url === "string" && url.includes("drive.google.com/drive/folders");

  const convertGoogleDriveUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    if (isDriveFolderUrl(url)) return null;
    const trimmed = url.trim();
    if (trimmed.includes("lh3.googleusercontent.com")) return trimmed;
    const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/?&#]+)/);
    if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
    const idMatch = trimmed.match(/[?&]id=([^&#]+)/);
    if (idMatch && trimmed.includes("drive.google.com")) return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    return trimmed;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDriveFolderUrl(formData.image)) {
      toast.error("Cover Image: This is a folder link. Please share a specific FILE.");
      return;
    }
    if (isDriveFolderUrl(formData.instructorPhoto)) {
      toast.error("Instructor Photo: This is a folder link. Please share a specific FILE.");
      return;
    }
    const sanitizedData = {
      ...formData,
      whatYouWillLearn: JSON.stringify(takeaways),
      faqs: JSON.stringify(faqsList),
      image: convertGoogleDriveUrl(formData.image) || formData.image,
      instructorPhoto: convertGoogleDriveUrl(formData.instructorPhoto) || formData.instructorPhoto,
    };
    try {
      if (editClassId) {
        await axios.put(`${API}/masterclass/${editClassId}`, sanitizedData);
        toast.success("MasterClass updated successfully");
      } else {
        await axios.post(`${API}/addmasterclass`, sanitizedData);
        toast.success("MasterClass created successfully");
      }
      fetchMasterclass();
      resetForm();
    } catch (error) {
      toast.error("Error saving MasterClass");
      console.error(error);
    }
  };

  const fetchMasterclass = async () => {
    try {
      const response = await axios.get(`${API}/allmasterclass`);
      setAllMasterClass(response.data);
    } catch (error) {
      console.error("Error fetching MasterClass:", error);
    }
  };

  const handleEdit = (masterclass) => {
    if (window.confirm("Are you sure you want to edit the Master Class?")) {
      let parsedTakeaways = [{ title: "", desc: "" }];
      try {
        if (masterclass.whatYouWillLearn) {
          const parsed = JSON.parse(masterclass.whatYouWillLearn);
          if (Array.isArray(parsed) && parsed.length > 0) parsedTakeaways = parsed;
        }
      } catch (e) {}

      let parsedFaqs = [{ q: "", a: "" }];
      try {
        if (masterclass.faqs) {
          const parsed = JSON.parse(masterclass.faqs);
          if (Array.isArray(parsed) && parsed.length > 0) parsedFaqs = parsed;
        }
      } catch (e) {}

      setTakeaways(parsedTakeaways);
      setFaqsList(parsedFaqs);
      setFormData({
        title: masterclass.title || "",
        start: masterclass.start || "",
        end: masterclass.end || "",
        link: masterclass.link || "",
        image: masterclass.image || "",
        subheading: masterclass.subheading || "",
        duration: masterclass.duration || "",
        venue: masterclass.venue || "",
        registeredCount: masterclass.registeredCount || "",
        rating: masterclass.rating || "",
        level: masterclass.level || "",
        price: masterclass.price || "",
        language: masterclass.language || "",
        certificateAvailable: masterclass.certificateAvailable || "",
        instructorName: masterclass.instructorName || "",
        instructorLinkedIn: masterclass.instructorLinkedIn || "",
        instructorDesignation: masterclass.instructorDesignation || "",
        instructorExpertise: masterclass.instructorExpertise || "",
        instructorCredibility: masterclass.instructorCredibility || "",
        instructorExperience: masterclass.instructorExperience || "",
        instructorLearnersMentored: masterclass.instructorLearnersMentored || "",
        instructorRating: masterclass.instructorRating || "",
        instructorSessions: masterclass.instructorSessions || "",
        instructorCompanyTags: masterclass.instructorCompanyTags || "",
        instructorPhoto: masterclass.instructorPhoto || "",
        whyAttend: masterclass.whyAttend || "",
        whatYouWillLearn: masterclass.whatYouWillLearn || "",
        whoShouldAttend: masterclass.whoShouldAttend || "",
        transformationBefore: masterclass.transformationBefore || "",
        transformationAfter: masterclass.transformationAfter || "",
        faqs: masterclass.faqs || "",
      });
      setEditClassId(masterclass._id);
      setisFormVisible(true);
      setActiveTab("basic");
    }
  };

  const handlePdfChange = async (e, masterclass) => {
    const newPdf = e.target.value;
    if (masterclass.status === "completed"){
      try {
        await axios.put(`${API}/masterclass/${masterclass._id}`, { pdfstatus: newPdf });
        fetchMasterclass();
      } catch (error) {}
    } else {
      alert("please change the status first");
    }
  };

  const handleStatusChange = async (e, id) => {
    const newStatus = e.target.value;
    try {
      await axios.put(`${API}/masterclass/${id}`, { status: newStatus });
      fetchMasterclass();
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this MasterClass?")) return;
    try {
      await axios.delete(`${API}/masterclass/${id}`);
      toast.success("MasterClass deleted successfully!");
      fetchMasterclass();
    } catch (error) {
      toast.error("Error deleting MasterClass");
    }
  };

  const exportToExcel = () => {
    if (selectedMC.applications === 0) {
      toast.error("No data available to download!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(selectedMC.applications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Masterclass Data");
    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelFile], { bookType: "xlsx", type: "application/octet-stream" });
    saveAs(blob,`${selectedMC.title}.xlsx`);
    toast.success("Downloaded successfully.");
  };

  useEffect(() => {
    fetchMasterclass();
  }, []);

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50 p-6 sm:p-10 font-sans relative overflow-hidden md:ml-64">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none"></div>

      <Toaster position="top-center" toastOptions={{ 
          style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } 
      }} />

      {isFormVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-4xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center px-8 py-5 bg-white border-b border-slate-100 z-10 shrink-0">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3 m-0">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner">
                    {editClassId ? <Edit2 size={20} /> : <GraduationCap size={20} />}
                </div>
                {editClassId ? "Edit MasterClass" : "Add New MasterClass"}
              </h2>
              <button onClick={resetForm} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex px-8 py-3 bg-slate-50/50 border-b border-slate-100 shrink-0 gap-3">
              <button type="button" onClick={() => setActiveTab("basic")} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "basic" ? "bg-purple-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"}`}>
                <FileText size={16} /> Basic Info
              </button>
              <button type="button" onClick={() => setActiveTab("instructor")} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "instructor" ? "bg-purple-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"}`}>
                <Briefcase size={16} /> Instructor
              </button>
              <button type="button" onClick={() => setActiveTab("landing")} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "landing" ? "bg-purple-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"}`}>
                <LayoutTemplate size={16} /> Page Content
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar bg-slate-50/30">
                
                {activeTab === "basic" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Masterclass Title <span className="text-rose-500">*</span></label>
                      <input value={formData.title} onChange={handleChange} type="text" name="title" placeholder="Enter Masterclass title" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Start Date & Time <span className="text-rose-500">*</span></label>
                        <input value={formData.start} onChange={handleChange} type="datetime-local" name="start" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" required />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">End Date & Time <span className="text-rose-500">*</span></label>
                        <input value={formData.end} onChange={handleChange} type="datetime-local" name="end" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">WhatsApp Group Link <span className="text-rose-500">*</span></label>
                        <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="https://chat.whatsapp.com/..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" required />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Cover Card Image URL <span className="text-rose-500">*</span></label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL or Drive share link" className={`w-full px-4 py-3 bg-white border ${isDriveFolderUrl(formData.image) ? 'border-rose-500 focus:ring-rose-500/50' : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/50'} rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400`} required />
                        {isDriveFolderUrl(formData.image) ? (
                          <span className="text-[11px] text-rose-500 font-bold mt-1 block leading-tight">✗ This is a FOLDER link. Please share the specific FILE.</span>
                        ) : (
                          <span className="text-[10px] text-purple-500 font-medium mt-1 block">✓ Drive FILE links are auto-converted.</span>
                        )}
                        {formData.image && !isDriveFolderUrl(formData.image) && (
                          <img src={convertGoogleDriveUrl(formData.image)} alt="Preview" className="w-full max-h-32 object-cover rounded-lg mt-3 border border-slate-200" onError={(e) => { e.target.style.display = 'none'; }} onLoad={(e) => { e.target.style.display = 'block'; }} />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Subheading (Value Proposition)</label>
                      <input type="text" name="subheading" value={formData.subheading} onChange={handleChange} placeholder="Master automation testing frameworks..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Duration</label>
                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="90 Mins" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Venue</label>
                        <input type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="Online Live" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Price Option</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="100% Free" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Language</label>
                        <input type="text" name="language" value={formData.language} onChange={handleChange} placeholder="English" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Certificate?</label>
                        <input type="text" name="certificateAvailable" value={formData.certificateAvailable} onChange={handleChange} placeholder="Yes" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Registered Display</label>
                        <input type="text" name="registeredCount" value={formData.registeredCount} onChange={handleChange} placeholder="3,840+" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Rating Display</label>
                        <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="4.8" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Target Level</label>
                        <input type="text" name="level" value={formData.level} onChange={handleChange} placeholder="Beginner" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      </div>
                    </div>
                  </div>
                )}

            {/* Tab 2: Instructor Info */}
            {activeTab === "instructor" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Instructor Name</label>
                    <input type="text" name="instructorName" value={formData.instructorName} onChange={handleChange} placeholder="Abhijeet Gupta" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">LinkedIn Profile (Optional)</label>
                    <input type="url" name="instructorLinkedIn" value={formData.instructorLinkedIn} onChange={handleChange} placeholder="https://linkedin.com/in/..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Instructor Designation</label>
                  <input type="text" name="instructorDesignation" value={formData.instructorDesignation} onChange={handleChange} placeholder="Project Engineer at WIPRO" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Instructor Photo URL</label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input type="text" name="instructorPhoto" value={formData.instructorPhoto} onChange={handleChange} placeholder="Image URL or Drive share link" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                      <span className="text-[10px] text-purple-500 font-medium mt-1 block">✓ Drive links are auto-converted</span>
                    </div>
                    {formData.instructorPhoto && (
                      <img src={convertGoogleDriveUrl(formData.instructorPhoto)} alt="Preview" className="w-16 h-16 object-cover rounded-full border-2 border-purple-500 shrink-0 shadow-sm" onError={(e) => { e.target.style.display = 'none'; }} onLoad={(e) => { e.target.style.display = 'block'; }} />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Areas of Expertise</label>
                  <input type="text" name="instructorExpertise" value={formData.instructorExpertise} onChange={handleChange} placeholder="Automation Testing & QA Lead" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Short Bio / Achievements</label>
                  <textarea name="instructorCredibility" value={formData.instructorCredibility} onChange={handleChange} placeholder="Trained and mentored 5,000+ QA professionals..." className="w-full h-24 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400 custom-scrollbar resize-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Years Experience</label>
                    <input type="text" name="instructorExperience" value={formData.instructorExperience} onChange={handleChange} placeholder="5+ Years" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Learners Mentored</label>
                    <input type="text" name="instructorLearnersMentored" value={formData.instructorLearnersMentored} onChange={handleChange} placeholder="5,000+" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Instructor Rating</label>
                    <input type="text" name="instructorRating" value={formData.instructorRating} onChange={handleChange} placeholder="4.9" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Sessions Done</label>
                    <input type="text" name="instructorSessions" value={formData.instructorSessions} onChange={handleChange} placeholder="40+ Live Classes" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Company Badges (Comma-separated)</label>
                  <input type="text" name="instructorCompanyTags" value={formData.instructorCompanyTags} onChange={handleChange} placeholder="WIPRO, QA Specialist, Ex-Amazon" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                </div>
              </div>
            )}

            {/* Tab 3: Landing Content */}
            {activeTab === "landing" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Why Attend (Problem Statement)</label>
                  <textarea name="whyAttend" value={formData.whyAttend} onChange={handleChange} placeholder="Describe user pain points..." className="w-full h-24 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400 custom-scrollbar resize-none" />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Who Should Attend (Comma-separated)</label>
                  <input type="text" name="whoShouldAttend" value={formData.whoShouldAttend} onChange={handleChange} placeholder="Students, QA Professionals, Self-learners" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Before Attending (Pain points, Comma-separated)</label>
                  <input type="text" name="transformationBefore" value={formData.transformationBefore} onChange={handleChange} placeholder="Stuck in tutorial loop, No portfolio" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">After Attending (Achievements, Comma-separated)</label>
                  <input type="text" name="transformationAfter" value={formData.transformationAfter} onChange={handleChange} placeholder="Clear roadmap, Built framework" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400" />
                </div>
                
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">Takeaways / Strategies to Learn</label>
                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                    {takeaways.map((item, index) => (
                      <div key={index} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex-1 flex flex-col gap-2">
                          <input type="text" placeholder="Title (e.g. Career Roadmap)" value={item.title || ""} onChange={(e) => { const n = [...takeaways]; n[index].title = e.target.value; setTakeaways(n); }} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" />
                          <input type="text" placeholder="Description" value={item.desc || ""} onChange={(e) => { const n = [...takeaways]; n[index].desc = e.target.value; setTakeaways(n); }} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" />
                        </div>
                        {takeaways.length > 1 && (
                          <button type="button" onClick={() => setTakeaways(takeaways.filter((_, i) => i !== index))} className="w-9 h-9 shrink-0 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => setTakeaways([...takeaways, { title: "", desc: "" }])} className="px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1 mt-2">
                      <Plus size={14} /> Add Takeaway
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">Frequently Asked Questions</label>
                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                    {faqsList.map((item, index) => (
                      <div key={index} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex-1 flex flex-col gap-2">
                          <input type="text" placeholder="Question" value={item.q || ""} onChange={(e) => { const n = [...faqsList]; n[index].q = e.target.value; setFaqsList(n); }} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" />
                          <input type="text" placeholder="Answer" value={item.a || ""} onChange={(e) => { const n = [...faqsList]; n[index].a = e.target.value; setFaqsList(n); }} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" />
                        </div>
                        {faqsList.length > 1 && (
                          <button type="button" onClick={() => setFaqsList(faqsList.filter((_, i) => i !== index))} className="w-9 h-9 shrink-0 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => setFaqsList([...faqsList, { q: "", a: "" }])} className="px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1 mt-2">
                      <Plus size={14} /> Add FAQ
                    </button>
                  </div>
                </div>
              </div>
            )}
              </div>

              <div className="px-8 py-5 bg-white border-t border-slate-100 shrink-0 flex justify-end">
                <button type="submit" className="bg-purple-600 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} />
                  {editClassId ? "Update Master Class" : "Create Master Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedMC && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col h-[85vh] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
              <div>
                <h2 className="text-2xl font-black text-slate-800 m-0">{selectedMC.title}</h2>
                <a href={selectedMC.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1 mt-2">
                  <LinkIcon size={14} /> {selectedMC.link}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={exportToExcel} className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm">
                  <Download size={16} /> Export CSV
                </button>
                <button onClick={() => setSelectedMC(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto custom-scrollbar p-8">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest w-16">#</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Name</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Email</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Exp. (Yrs)</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Field</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {selectedMC.applications?.map((application, index) => (
                      <tr key={index} className="hover:bg-purple-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-400">{index + 1}</td>
                        <td className="px-6 py-4 font-bold text-slate-800">{application.name}</td>
                        <td className="px-6 py-4 text-slate-600">{application.email}</td>
                        <td className="px-6 py-4 text-center font-medium text-slate-700">{application.experience}</td>
                        <td className="px-6 py-4 text-center">
                            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold">{application.field}</span>
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-medium text-slate-700">{application.phone}</td>
                      </tr>
                    ))}
                    {(!selectedMC.applications || selectedMC.applications.length === 0) && (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500 font-medium">No registrations yet for this MasterClass.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight m-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600 flex items-center gap-3">
              <GraduationCap className="text-purple-600" size={40} />
              MasterClasses
            </h1>
            <p className="text-base font-medium text-slate-500 mt-2 m-0 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              Manage and create live sessions
            </p>
          </div>
          <button onClick={() => setisFormVisible(true)} className="bg-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
            <Plus size={18} strokeWidth={2.5} /> Add MasterClass
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl overflow-hidden relative">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest w-16">#</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">MasterClass Info</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Registrations</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">PDF Access</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {allMasterClass?.map((masterclass, index) => (
                  <tr key={index} className="hover:bg-purple-50/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 max-w-[300px]">
                        <span className="font-bold text-slate-900 text-base truncate" title={masterclass.title}>{masterclass.title}</span>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-slate-500 font-medium mt-1">
                          <span className="flex items-center gap-1"><CalendarDays size={12} className="text-purple-400" /> {new Date(masterclass.start).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="hidden sm:inline text-slate-300">-</span>
                          <span className="flex items-center gap-1"><Clock size={12} className="text-pink-400" /> {new Date(masterclass.end).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => setSelectedMC(masterclass)} className="bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-xl font-bold transition-colors inline-flex items-center gap-2 border border-purple-100 hover:border-purple-600">
                        <Users size={16} /> {masterclass.applications?.length || 0}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                          masterclass.pdfstatus ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'
                        }`}>
                          {masterclass.pdfstatus ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                        <select
                          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-purple-500 focus:border-purple-500 p-1 w-24 cursor-pointer"
                          onChange={(e) => handlePdfChange(e, masterclass)}
                          value={masterclass.pdfstatus ? "true" : "false"}
                        >
                          <option value="true">ACTIVE</option>
                          <option value="false">INACTIVE</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                          masterclass.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                          masterclass.status === 'ongoing' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                          'bg-amber-50 text-amber-600 border-amber-200'
                        }`}>
                          {masterclass.status}
                        </span>
                        <select
                          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-purple-500 focus:border-purple-500 p-1 w-28 cursor-pointer"
                          onChange={(e) => handleStatusChange(e, masterclass._id)}
                          value={masterclass.status || "upcoming"}
                        >
                          <option value="upcoming">UPCOMING</option>
                          <option value="ongoing">ONGOING</option>
                          <option value="completed">COMPLETED</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(masterclass)} className="w-9 h-9 rounded-xl flex items-center justify-center bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-all shadow-sm" title="Edit MasterClass">
                          <Edit2 size={16} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => handleDelete(masterclass._id)} className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm" title="Delete MasterClass">
                          <Trash2 size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {allMasterClass?.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                          <GraduationCap size={48} className="mb-4 text-slate-300" strokeWidth={1} />
                          <p className="text-lg font-bold text-slate-600 mb-1">No MasterClasses Found</p>
                          <p className="text-sm">Click the Add MasterClass button to create your first session.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
      `}</style>
    </div>
  );
};
export default MasterClasses;
