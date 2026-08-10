import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const CreateAdvOperation = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    languages: [],
  });
  const LANGUAGE_OPTIONS = ["English", "Kannada", "Hindi", "Malayalam", "Tamil", "Telugu", "Bengali"];
  const [advOperation, setAdvOperation] = useState([]);
  const [selectedOperationName, setSelectedOperationName] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [editingOperationId, setEditingOperationId] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [targets, setTargets] = useState({});
  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7);

  const toggleVisibility = () => {
    if (!iscourseFormVisible) {
      // Clean form when opening for new creation without resetting visibility state to false
      setFormData({
        fullname: "",
        email: "",
        password: "",
        languages: [],
      });
      setEditingOperationId(null);
    }
    setiscourseFormVisible(!iscourseFormVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOperation = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      languages: formData.languages,
    };
    try {
      if (editingOperationId) {
        await axios.put(
          `${API}/updateadvoperation/${editingOperationId}`,
          newOperation
        );
        toast.success("ADV Operation updated successfully");
      } else {
        await axios.post(
          `${API}/createadvoperation`,
          newOperation
        );
        toast.success("ADV Operation created successfully");
      }
      fetchAdvOperation();
      resetForm();
    } catch (error) {
      toast.error(
        "There was an error while creating or updating the ADV operation"
      );
      console.error("Error creating or updating ADV operation", error);
    }
  };

  const fetchAdvOperation = async () => {
    try {
      const response = await axios.get(`${API}/getadvoperation`);
      setAdvOperation(response.data);
    } catch (error) {
      console.error("There was an error fetching ADV operation:", error);
    }
  };

  const fetchRevenueDetails = async (operationName) => {
    try {
      setRevenueData(null);
      setIsDialogVisible(true);
      setSelectedOperationName(operationName);

      const response = await axios.get(`${API}/getadvenrolls`);
      const allData = response.data.data || response.data;
      const data = allData.filter(item => item.operationName === operationName);

      const revenueByDay = {};
      const revenueByMonth = {};
      let totalRevenue = 0;

      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      const threeMonthsAgo = new Date(today);
      threeMonthsAgo.setMonth(today.getMonth() - 3);

      data.forEach((student) => {
        const createdAt = new Date(student.createdAt);
        const date = createdAt.toLocaleDateString("en-GB");
        const month = createdAt.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        const revenue = student.programPrice || 0;
        const credited = (student.paidAmount || 0);
        const pending = revenue - credited;

        if (createdAt >= sevenDaysAgo) {
          if (!revenueByDay[date]) {
            revenueByDay[date] = { total: 0, credited: 0, pending: 0 };
          }
          revenueByDay[date].total += revenue;
          revenueByDay[date].pending += pending;
          if (student.status === "fullPaid" || (Array.isArray(student.remark) && student.remark[student.remark.length - 1] === "Half_Cleared")) {
            revenueByDay[date].credited += credited;
          }
        }

        if (createdAt >= threeMonthsAgo) {
          if (!revenueByMonth[month]) {
            revenueByMonth[month] = { total: 0, credited: 0, pending: 0 };
          }
          revenueByMonth[month].total += revenue;
          revenueByMonth[month].pending += pending;
          if (student.status === "fullPaid" || (Array.isArray(student.remark) && student.remark[student.remark.length - 1] === "Half_Cleared")) {
            revenueByMonth[month].credited += credited;
          }
        }

        totalRevenue += revenue;
      });

      setRevenueData({
        revenueByDay,
        revenueByMonth,
        totalRevenue,
      });
    } catch (error) {
      console.error("Error fetching ADV operation revenue data:", error);
    }
  };

  useEffect(() => {
    fetchAdvOperation();
  }, []);

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      languages: [],
    });
    setEditingOperationId(null);
    setiscourseFormVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the ADV operation account?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${API}/deleteadvoperation/${id}`);
        toast.success("ADV Operation deleted successfully");
        fetchAdvOperation();
      } catch (error) {
        toast.error("There was an error deleting the ADV operation");
        console.error("Error deleting ADV operation", error);
      }
    }
  };

  const handleEdit = (operation) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to edit the ADV operation details?"
    );
    if (isConfirmed) {
      setFormData({
        fullname: operation.fullname.trim(),
        email: operation.email.trim(),
        password: operation.password,
        languages: operation.languages || [],
      });
      setEditingOperationId(operation._id);
      setiscourseFormVisible(true);
    }
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    setTargets((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await axios.put(`${API}/toggleadvonlinestatus/${id}`);
      if (response.status === 200) {
        toast.success(`Status updated successfully`);
        fetchAdvOperation();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleSendEmail = async (value) => {
    const emailData = {
      fullname: value.fullname,
      email: value.email,
      password: value.password,
    };
    try {
      const response = await axios.post(`${API}/sendmailtoadvoperation`, emailData);

      if (response.status === 200) {
        toast.success("Email sent successfully!");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the email.");
      console.error("Error sending email:", error);
    }
  };

  const handleloginteam = async (userId) => {
    try {
      const response = await axios.post(`${API}/api/admin/impersonate`, 
        { userId, role: "ADV_OPERATION" },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Impersonation successful!");
        const { token, operationName, fullname, _id, userId: resUserId } = response.data;
        
        // Pass credentials via URL so the new tab can save them to its own sessionStorage
        const targetId = _id || resUserId || userId;
        const targetName = operationName || fullname || "";

        const impersonateUrl = `/AdvOperationDashboard?impToken=${encodeURIComponent(token)}&impId=${targetId}&impName=${encodeURIComponent(targetName)}&impType=advOperationToken`;
        
        setTimeout(() => {
          window.open(impersonateUrl, "_blank");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Impersonation failed!");
    }
  };

  const handleAsignTarget = async (e, id) => {
    e.preventDefault();
    const targetValue = targets[id];

    try {
      const response = await axios.post(`${API}/assigntargettoadvoperation/${id}`, {
        target: {
          currentMonth,
          percentage: targetValue,
        },
      });
      if (response.status === 200) {
        toast.success("Target percentage assigned successfully.");
        setTargets((prev) => ({
          ...prev,
          [id]: "",
        }));
        fetchAdvOperation();
      } else {
        toast.error("Failed to assign target.");
      }
    } catch (error) {
      console.error("Error assigning target:", error);
      toast.error("Server error while assigning target.");
    }
  };

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1e293b', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">ADV Operations</h1>
            <p className="text-slate-500 mt-1">Manage operation accounts, targets, and revenue tracking.</p>
          </div>
          <button
            onClick={toggleVisibility}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95"
          >
            <i className="fa fa-plus text-sm"></i>
            Add New Operation
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {iscourseFormVisible && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all">
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingOperationId ? "Edit ADV Operation" : "Create ADV Operation"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <i className="fa fa-times text-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input
                      value={formData.fullname}
                      onChange={handleChange}
                      type="text"
                      name="fullname"
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                      <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Secure password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Spoken Languages</label>
                    <div className="flex flex-wrap gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      {LANGUAGE_OPTIONS.map((lang) => (
                        <label key={lang} className="flex items-center gap-2 cursor-pointer group bg-white px-3 py-2 border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 transition-colors">
                          <input
                            type="checkbox"
                            value={lang}
                            checked={formData.languages.includes(lang)}
                            onChange={(e) => {
                              const { value, checked } = e.target;
                              setFormData((prev) => {
                                const newLanguages = checked
                                  ? [...prev.languages, value]
                                  : prev.languages.filter((l) => l !== value);
                                return { ...prev, languages: newLanguages };
                              });
                            }}
                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{lang}</span>
                        </label>
                      ))}
                    </div>
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
                    {editingOperationId ? "Save Changes" : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Credentials</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status & Access</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Performance Target</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {advOperation && advOperation.length > 0 ? (
                  advOperation.map((operation, index) => (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                      {/* Account Details */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <button 
                            onClick={() => fetchRevenueDetails(operation.fullname)}
                            className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline text-left"
                            title="View Revenue"
                          >
                            {operation.fullname}
                          </button>
                          <div className="text-xs text-slate-500 mt-1 max-w-[200px] truncate" title={operation.languages?.join(", ")}>
                            {operation.languages && operation.languages.length > 0 ? (
                              <div className="flex items-center gap-1">
                                <i className="fa fa-language text-slate-400"></i>
                                {operation.languages.join(", ")}
                              </div>
                            ) : (
                              "No languages"
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Credentials */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-slate-700 font-medium">{operation.email}</span>
                            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 mt-1 w-max">
                              {operation.password}
                            </span>
                          </div>
                          <button
                            onClick={() => handleSendEmail(operation)}
                            className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors shadow-sm"
                            title="Send Login Credentials Email"
                          >
                            <i className="fa fa-envelope text-sm"></i>
                          </button>
                        </div>
                      </td>

                      {/* Status & Access */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => handleToggleStatus(operation._id)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                              operation.isOnline
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full mr-2 ${operation.isOnline ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                            {operation.isOnline ? "Online" : "Offline"}
                          </button>
                          <button
                            onClick={() => handleloginteam(operation._id)}
                            className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                            title="Login as this user"
                          >
                            Login <i className="fa fa-sign-in"></i>
                          </button>
                        </div>
                      </td>

                      {/* Performance Target */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm">
                            <span className="text-slate-500 mr-1">Current:</span>
                            {operation.target && operation.target.some(t => t.currentMonth === currentMonth) ? (
                              <span className="font-bold text-slate-800 bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                                {operation.target.find(t => t.currentMonth === currentMonth).percentage}%
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">None</span>
                            )}
                          </div>
                          <form onSubmit={(e) => handleAsignTarget(e, operation._id)} className="flex items-center gap-2">
                            <div className="relative">
                              <input
                                type="number"
                                placeholder="0"
                                className="w-16 px-2 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-5"
                                value={targets[operation._id] || ""}
                                onChange={(e) => handleInputChange(e, operation._id)}
                                required
                                min="0"
                                max="100"
                              />
                              <span className="absolute right-2 top-1 text-sm text-slate-400">%</span>
                            </div>
                            <button
                              type="submit"
                              className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-blue-200 transition-colors"
                            >
                              Assign
                            </button>
                          </form>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(operation)}
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                            title="Edit"
                          >
                            <i className="fa fa-edit text-sm"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(operation._id)}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                            title="Delete"
                          >
                            <i className="fa fa-trash text-sm"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <i className="fa fa-users text-2xl text-slate-400"></i>
                        </div>
                        <h3 className="text-sm font-medium text-slate-900">No operations found</h3>
                        <p className="text-sm text-slate-500 mt-1">Get started by creating a new ADV operation account.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Dialog */}
        {isDialogVisible && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Revenue Details</h2>
                  <p className="text-sm font-medium text-blue-600 mt-1">{selectedOperationName}</p>
                </div>
                <button
                  onClick={closeDialog}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm"
                >
                  <i className="fa fa-times text-lg"></i>
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/30">
                {revenueData ? (
                  <div className="space-y-8">
                    {/* Total Revenue Highlight Card */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                      <h3 className="text-orange-100 font-semibold uppercase tracking-wider text-sm mb-2">Total Revenue Generated</h3>
                      <div className="text-5xl font-black tracking-tight">
                        ₹{revenueData.totalRevenue.toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Daily Revenue Table */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <i className="fa fa-calendar-day text-blue-500"></i> Last 7 Days
                          </h3>
                        </div>
                        <div className="overflow-x-auto flex-1 p-4">
                          <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                              <tr className="text-slate-500 border-b border-slate-100">
                                <th className="pb-3 font-semibold px-2">Date</th>
                                <th className="pb-3 font-semibold px-2 text-right">Total</th>
                                <th className="pb-3 font-semibold px-2 text-right">Credited</th>
                                <th className="pb-3 font-semibold px-2 text-right">Pending</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {Object.entries(revenueData.revenueByDay).length > 0 ? (
                                Object.entries(revenueData.revenueByDay).map(([date, data]) => (
                                  <tr key={date} className="hover:bg-slate-50">
                                    <td className="py-3 px-2 font-medium text-slate-700">{date}</td>
                                    <td className="py-3 px-2 text-right text-slate-800 font-semibold">₹{data.total.toLocaleString()}</td>
                                    <td className="py-3 px-2 text-right text-emerald-600 font-semibold">₹{data.credited.toLocaleString()}</td>
                                    <td className="py-3 px-2 text-right text-amber-600 font-semibold">₹{data.pending.toLocaleString()}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4" className="py-8 text-center text-slate-500">No revenue data for the last 7 days</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Monthly Revenue Table */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <i className="fa fa-calendar-alt text-emerald-500"></i> Last 3 Months
                          </h3>
                        </div>
                        <div className="overflow-x-auto flex-1 p-4">
                          <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                              <tr className="text-slate-500 border-b border-slate-100">
                                <th className="pb-3 font-semibold px-2">Month</th>
                                <th className="pb-3 font-semibold px-2 text-right">Total</th>
                                <th className="pb-3 font-semibold px-2 text-right">Credited</th>
                                <th className="pb-3 font-semibold px-2 text-right">Pending</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {Object.entries(revenueData.revenueByMonth).length > 0 ? (
                                Object.entries(revenueData.revenueByMonth).map(([month, data]) => (
                                  <tr key={month} className="hover:bg-slate-50">
                                    <td className="py-3 px-2 font-medium text-slate-700">{month}</td>
                                    <td className="py-3 px-2 text-right text-slate-800 font-semibold">₹{data.total.toLocaleString()}</td>
                                    <td className="py-3 px-2 text-right text-emerald-600 font-semibold">₹{data.credited.toLocaleString()}</td>
                                    <td className="py-3 px-2 text-right text-amber-600 font-semibold">₹{data.pending.toLocaleString()}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4" className="py-8 text-center text-slate-500">No revenue data for the last 3 months</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-slate-500 font-medium">Crunching revenue numbers...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAdvOperation;
