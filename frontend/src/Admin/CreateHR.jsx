import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { Users, Plus, X, Edit2, Trash2, EyeOff, Send, Mail, UserCog, User, ShieldCheck, Lock } from "lucide-react";

const CreateHR = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [hrList, setHrList] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    designation: "HR Manager",
  });

  const [editingHrId, setEditingHrId] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
    if (isFormVisible) resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHR = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      designation: formData.designation.trim(),
    };
    try {
      if (editingHrId) {
        const response = await axios.put(`${API}/updatehr/${editingHrId}`, newHR);
        toast.success("HR updated successfully!");
        setHrList((prev) => prev.map((item) => (item._id === editingHrId ? response.data : item)));
      } else {
        const response = await axios.post(`${API}/createhr`, newHR);
        toast.success("HR created successfully!");
        setHrList((prev) => [response.data, ...prev]);
      }
      resetForm();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "There was an error while creating or updating the HR";
      toast.error(errorMessage);
    }
  };

  const fetchHR = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/gethr`);
      setHrList(response.data.filter((item) => item && item.status === "Active"));
    } catch (error) {
      console.error("There was an error fetching HR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHR();
  }, []);

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      designation: "HR Manager",
    });
    setEditingHrId(null);
    setIsFormVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "fullname" || name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleDelete = async (_id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this HR account?");
    if (isConfirmed) {
      try {
        await axios.delete(`${API}/deletehr/${_id}`);
        setHrList((prev) => prev.filter((item) => item._id !== _id));
        toast.success("HR deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete HR.");
      }
    }
  };

  const handleEdit = (hr) => {
    setFormData({
      fullname: hr.fullname,
      email: hr.email,
      password: hr.password || "",
      designation: hr.designation || "HR Manager",
    });
    setEditingHrId(hr._id);
    setIsFormVisible(true);
  };

  const handleSendEmail = async (hr) => {
    try {
      const response = await axios.post(`${API}/sendmailtohr`, {
        fullname: hr.fullname,
        email: hr.email,
      });
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        await axios.put(`${API}/mailsendedhr/${hr._id}`, { mailSended: true });
        fetchHR();
      }
    } catch (error) {
      toast.error("An error occurred while sending the email.");
    }
  };

  const handleChangeStatus = async (hrId, status) => {
    const isConfirmed = window.confirm(`Are you sure you want to make this account ${status}?`);
    if (isConfirmed) {
      try {
        await axios.put(`${API}/updatehrstatus/${hrId}`, { status });
        toast.success(`Account status updated to ${status}!`);
        if (status === "Inactive") {
          setHrList((prev) => prev.filter((item) => item._id !== hrId));
        } else {
          fetchHR();
        }
      } catch (error) {
        toast.error("An error occurred while updating status.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pt-[90px] lg:ml-[265px] p-6 relative">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                <UserCog size={24} className="text-indigo-600" />
              </div>
              HR Management
            </h1>
            <p className="text-slate-500 font-medium mt-2 ml-1">Create, manage, and assign human resource personnel.</p>
          </div>
          <button 
            onClick={toggleVisibility}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 hover:-translate-y-0.5"
          >
            {isFormVisible ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add New HR</>}
          </button>
        </div>

        {/* Modal / Inline Form */}
        {isFormVisible && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                {editingHrId ? <Edit2 size={20} className="text-indigo-500" /> : <Plus size={20} className="text-indigo-500" />}
                {editingHrId ? "Edit HR Account" : "Create New HR Account"}
              </h2>
              <button onClick={resetForm} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><User size={18} /></div>
                  <input
                    value={formData.fullname}
                    onChange={handleChange}
                    type="text"
                    name="fullname"
                    placeholder="John Doe"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><Mail size={18} /></div>
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="hr@Accenlearn.in"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Designation</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><ShieldCheck size={18} /></div>
                  <input
                    value={formData.designation}
                    onChange={handleChange}
                    type="text"
                    name="designation"
                    placeholder="HR Manager"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Account Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><Lock size={18} /></div>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder={editingHrId ? "Leave blank to keep unchanged" : "Create password"}
                    required={!editingHrId}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  {editingHrId ? "Save Changes" : "Create HR Account"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Users size={20} />
            </div>
            <h2 className="text-lg font-black text-slate-800">Active HR Accounts</h2>
            <div className="ml-auto bg-white px-3 py-1 rounded-full border border-slate-200 text-xs font-bold text-slate-500 shadow-sm">
              {hrList.length} Total
            </div>
          </div>

          <div className="p-6 md:p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-bold text-slate-400">Loading HR directory...</p>
              </div>
            ) : hrList.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Users size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-600 mb-1">No HR Accounts Found</h3>
                <p className="text-sm text-slate-500 mb-6">Get started by creating your first HR personnel account.</p>
                <button onClick={toggleVisibility} className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-indigo-600 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
                  <Plus size={18} /> Add HR Account
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400 w-16">ID</th>
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400">Personnel Info</th>
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400">Designation</th>
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400">Status</th>
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400 text-center">Credentials</th>
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hrList.map((hr, index) => (
                      <tr key={hr._id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-4 text-sm font-bold text-slate-400">
                          #{String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">
                              {hr.fullname.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 capitalize">{hr.fullname}</div>
                              <div className="text-xs font-semibold text-slate-500 lowercase">{hr.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                            <ShieldCheck size={14} /> {hr.designation}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{hr.status}</span>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <button 
                            onClick={() => handleSendEmail(hr)}
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                              hr.mailSended 
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100" 
                              : "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100"
                            }`}
                            title={hr.mailSended ? "Credentials Sent" : "Send Credentials"}
                          >
                            <Send size={16} />
                          </button>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(hr)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all" title="Edit">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => handleChangeStatus(hr._id, "Inactive")} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 shadow-sm transition-all" title="Deactivate">
                              <EyeOff size={14} />
                            </button>
                            <button onClick={() => handleDelete(hr._id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white shadow-sm transition-all" title="Delete permanently">
                              <Trash2 size={14} />
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
        </div>
      </div>
    </div>
  );
};

export default CreateHR;
