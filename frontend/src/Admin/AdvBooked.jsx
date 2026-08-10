import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AdvBooked = () => {
  const [bookedEnrollments, setBookedEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  // States for Edit Form
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [counselor, setCounselor] = useState("");
  const [domain, setDomain] = useState("");
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [monthOpted, setMonthOpted] = useState("");
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [lead, setLead] = useState("");
  const [operationName, setOperationName] = useState("");
  const [operationId, setOperationId] = useState("");

  const [course, setCourse] = useState([]);
  const [bda, setBda] = useState([]);
  const [operation, setOperation] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [monthsToShow] = useState([
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const fetchBookedEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      const enrollments = response.data.data || response.data;
      const filtered = enrollments.filter((item) => item.status === "booked");
      setBookedEnrollments(filtered);
      setFilteredEnrollments(filtered);
    } catch (error) {
      console.error("Error fetching booked enrollments:", error);
      toast.error("Failed to load booked enrollments");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const results = await Promise.allSettled([
        axios.get(`${API}/getadvcourses`),
        axios.get(`${API}/getadvteam`),
        axios.get(`${API}/getadvoperation`),
        axios.get(`${API}/admin/getallmarketingexecutives`)
      ]);

      if (results[0].status === 'fulfilled') setCourse(results[0].value.data);
      else console.error("Error fetching courses:", results[0].reason);

      if (results[1].status === 'fulfilled') setBda(results[1].value.data);
      else console.error("Error fetching advteam:", results[1].reason);

      if (results[2].status === 'fulfilled') setOperation(results[2].value.data);
      else console.error("Error fetching operation:", results[2].reason);

      if (results[3].status === 'fulfilled') setExecutives(results[3].value.data);
      else console.error("Error fetching executives:", results[3].reason);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBookedEnrollments();
    fetchData();
  }, []);

  const handleStatusChange = async (studentId, action) => {
    try {
      const isConfirmed = window.confirm(`Are you sure you want to move this student to ${action}?`);
      if (!isConfirmed) return;

      const status = action === "fullPaid" ? "fullPaid" : "default";
      await axios.post(`${API}/updateadvenrollstatus`, { id: studentId, status });

      toast.success(`Student moved to ${action} successfully`);
      fetchBookedEnrollments();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleEdit = (studentId) => {
    const editStudent = bookedEnrollments.find((item) => item._id === studentId);
    if (!editStudent) return;

    setEditingStudentId(studentId);
    setFullname(editStudent.fullname || "");
    setEmail(editStudent.email || "");
    setPhone(editStudent.phone || "");
    setWhatsAppNumber(editStudent.whatsAppNumber || "");
    setCounselor(editStudent.counselor || "");
    setDomain(editStudent.domain || "");
    setProgramPrice(editStudent.programPrice || "");
    setPaidAmount(editStudent.paidAmount || "");
    setRemainingAmount(editStudent.programPrice - editStudent.paidAmount || 0);
    setMonthOpted(editStudent.monthOpted || "");
    setClearPaymentMonth(editStudent.clearPaymentMonth || "");
    setLead(editStudent.executive || editStudent.lead || "");
    setOperationName(editStudent.operationName || "");
    setOperationId(editStudent.operationId || "");
    setiscourseFormVisible(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      fullname,
      email: email.trim(),
      phone,
      whatsAppNumber,
      counselor: counselor.trim(),
      domain: domain.trim(),
      programPrice,
      paidAmount,
      remainingAmount: programPrice - paidAmount,
      monthOpted,
      clearPaymentMonth,
      lead,
      operationName,
      operationId,
    };

    try {
      const response = await axios.put(`${API}/editadvstudentdetails/${editingStudentId}`, formData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Student updated successfully");
        fetchBookedEnrollments();
        resetForm();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "An error occurred during update");
    }
  };

  const resetForm = () => {
    setiscourseFormVisible(false);
    setEditingStudentId(null);
    setFullname("");
    setEmail("");
    setPhone("");
    setWhatsAppNumber("");
    setCounselor("");
    setDomain("");
    setProgramPrice("");
    setPaidAmount("");
    setRemainingAmount(0);
    setMonthOpted("");
    setClearPaymentMonth("");
    setLead("");
    setOperationName("");
    setOperationId("");
  };

  const handleDialogOpen = (item) => {
    setDialogData(item);
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setDialogData(null);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = bookedEnrollments.filter((enroll) => {
      return (
        (enroll.email && enroll.email.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.phone && enroll.phone.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.fullname && enroll.fullname.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.counselor && enroll.counselor.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.operationName && enroll.operationName.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.domain && enroll.domain.toLowerCase().includes(value.toLowerCase()))
      );
    });
    setFilteredEnrollments(filtered);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB");
  };

  const groupedData = filteredEnrollments.reduce((acc, item) => {
    const date = formatDate(item.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1e293b', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
      }} />

      {/* Edit Form Modal */}
      {iscourseFormVisible && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Edit Advanced Enrollment</h2>
                <p className="text-sm text-slate-500 mt-1">Update candidate details and assignments</p>
              </div>
              <button onClick={resetForm} className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm">
                <i className="fa fa-times text-lg"></i>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-white">
              <form id="editForm" onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">Personal Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Full Name</label>
                      <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Email Address</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Contact Number</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">WhatsApp Number</label>
                      <input value={whatsAppNumber} onChange={(e) => setWhatsAppNumber(e.target.value)} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" />
                    </div>
                  </div>
                </div>

                {/* Program & Financials */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">Program Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Domain</label>
                      <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm">
                        <option value="" disabled>Select Opted Domain</option>
                        {course.map((item) => (<option key={item._id} value={item.title}>{item.title}</option>))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Opted Month</label>
                      <select value={monthOpted} onChange={(e) => setMonthOpted(e.target.value)} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm">
                        <option value="" disabled>Select Opted Month</option>
                        {monthsToShow.map((month, index) => (<option key={index} value={month}>{month}</option>))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Program Price (₹)</label>
                      <input value={programPrice} onChange={(e) => setProgramPrice(e.target.value)} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm font-semibold" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Paid Amount (₹)</label>
                      <input value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} type="number" className="w-full px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm font-semibold text-emerald-700" required />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-600">Clear Payment Due Date</label>
                      <input value={clearPaymentMonth} onChange={(e) => setClearPaymentMonth(e.target.value)} type="date" className="w-full px-4 py-2.5 bg-rose-50 border border-rose-200 rounded-xl focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all text-sm font-semibold text-rose-700" />
                    </div>
                  </div>
                </div>

                {/* Assignments */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">Assignments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Counselor (BDA)</label>
                      <select value={counselor} onChange={(e) => setCounselor(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm">
                        <option value="" disabled>Select Counselor name</option>
                        {bda.map((item) => (<option key={item._id} value={item.fullname}>{item.fullname}</option>))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Lead / Executive</label>
                      <select value={lead} required onChange={(e) => setLead(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm">
                        <option value="" disabled>Select Lead</option>
                        <option value="CGFL">CGFL</option>
                        <option value="SGFL">SGFL</option>
                        {executives.map((exec) => (<option key={exec._id} value={exec.fullname}>{exec.fullname}</option>))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Operation</label>
                      <select value={operationName} onChange={(e) => {
                        const op = operation.find(item => item.fullname === e.target.value);
                        setOperationName(op.fullname);
                        setOperationId(op._id);
                      }} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm">
                        <option value="" disabled>Select Operation name</option>
                        {operation.map((item) => (<option key={item._id} value={item.fullname}>{item.fullname}</option>))}
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
              <button type="submit" form="editForm" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Booked Enrollments</h1>
            <p className="text-slate-500 mt-1">Manage and update active booked candidates.</p>
          </div>

          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl shadow-sm p-1.5 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-80">
              <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search by name, email, phone, domain..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 text-sm outline-none bg-transparent placeholder-slate-400 text-slate-700"
              />
            </div>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            <div className="px-4 py-2.5 bg-slate-50 rounded-lg whitespace-nowrap">
              <span className="text-sm font-semibold text-slate-700">{filteredEnrollments.length} booked</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">#</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Program & Financials</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignments</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.keys(groupedData).length > 0 ? (
                  Object.keys(groupedData).sort((a, b) => {
                    const dateA = a.split("/").reverse().join("");
                    const dateB = b.split("/").reverse().join("");
                    return dateB.localeCompare(dateA);
                  }).map((date) => (
                    <React.Fragment key={date}>
                      <tr className="bg-slate-50/80 border-y border-slate-200">
                        <td colSpan="5" className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <i className="fa fa-calendar-day text-blue-500 text-sm"></i>
                            <span className="text-sm font-bold text-slate-800">{date}</span>
                            <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              {groupedData[date].length} booked
                            </span>
                          </div>
                        </td>
                      </tr>
                      {groupedData[date].map((item, index) => (
                        <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800 capitalize mb-1">
                                {item.fullname || "N/A"}
                              </span>
                              <div className="flex items-center gap-3 text-xs text-slate-600">
                                <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                                  <i className="fa fa-envelope text-slate-400"></i> {item.email || "N/A"}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                                  <i className="fa fa-whatsapp text-emerald-500"></i> {item.whatsAppNumber || item.phone || "N/A"}
                                </span>
                              </div>
                              {item.remark && item.remark.length > 0 && (
                                <div className="mt-2 text-[11px] text-slate-500 italic max-w-xs truncate" title={item.remark.join(" | ")}>
                                  <i className="fa fa-comment-dots text-slate-400 mr-1"></i>
                                  {item.remark[0]} {item.remark.length > 1 && `(+${item.remark.length - 1} more)`}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                  {item.domain || "N/A"}
                                </span>
                                <span className="text-xs text-slate-500 capitalize">({item.monthOpted || "N/A"})</span>
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-sm">
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Price</span>
                                  <span className="font-semibold text-slate-700">₹{item.programPrice || 0}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Paid</span>
                                  <span className="font-semibold text-emerald-600">₹{item.paidAmount || 0}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-2 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">C</span>
                                <span className="text-slate-700 font-medium">{item.counselor || "N/A"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold">E</span>
                                <span className="text-slate-600">{item.executive || item.lead || "N/A"}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Op: {item.operationName || "N/A"}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleStatusChange(item._id, "fullPaid")} className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-100 transition-all group-hover:shadow-sm" title="Mark as Full Paid">
                                <i className="fa fa-money text-sm"></i>
                              </button>
                              <button onClick={() => handleStatusChange(item._id, "default")} className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white border border-rose-100 transition-all group-hover:shadow-sm" title="Mark as Default (Ban)">
                                <i className="fa fa-ban text-sm"></i>
                              </button>
                              <div className="w-px h-5 bg-slate-200 mx-1"></div>
                              <button onClick={() => handleEdit(item._id)} className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white border border-amber-100 transition-all group-hover:shadow-sm" title="Edit Enrollment">
                                <i className="fa fa-edit text-sm"></i>
                              </button>
                              <button onClick={() => handleDialogOpen(item)} className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white border border-blue-100 transition-all group-hover:shadow-sm" title="View More Details">
                                <i className="fa fa-info-circle text-sm"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center">
                      {!loading && (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fa fa-folder-open text-2xl text-slate-300"></i>
                          </div>
                          <h3 className="text-base font-bold text-slate-800">No booked enrollments</h3>
                          <p className="text-sm text-slate-500 mt-1">There are currently no enrollments with a 'booked' status.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Details Modal */}
        {dialogVisible && dialogData && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Student Details</h2>
                  <p className="text-xs font-medium text-blue-600 mt-0.5 capitalize">{dialogData.fullname}</p>
                </div>
                <button onClick={handleDialogClose} className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm">
                  <i className="fa fa-times"></i>
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b border-slate-100">Contact & Academic</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Email</span><span className="text-sm font-medium text-slate-800">{dialogData.email}</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Phone</span><span className="text-sm font-medium text-slate-800">{dialogData.phone}</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">WhatsApp</span><span className="text-sm font-medium text-slate-800">{dialogData.whatsAppNumber}</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">College</span><span className="text-sm font-medium text-slate-800">{dialogData.collegeName || "N/A"}</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Branch</span><span className="text-sm font-medium text-slate-800">{dialogData.branch || "N/A"}</span></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b border-slate-100">Program & Financials</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Domain</span><span className="text-sm font-bold text-blue-600">{dialogData.domain}</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Total Price</span><span className="text-sm font-medium text-slate-800">₹{dialogData.programPrice}</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Amount Paid</span><span className="text-sm font-medium text-emerald-600">₹{dialogData.paidAmount}</span></div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100"><span className="text-xs font-bold text-rose-500">Pending Amount</span><span className="text-sm font-black text-rose-600">₹{dialogData.programPrice - dialogData.paidAmount}</span></div>
                    <div className="flex justify-between items-center mt-2"><span className="text-xs text-slate-500">Clear Due By</span><span className="text-sm font-medium text-rose-600">{dialogData.clearPaymentMonth || "N/A"}</span></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b border-slate-100">Assignments</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Counselor</span><span className="text-sm font-medium text-slate-800">{dialogData.counselor}</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Operation</span><span className="text-sm font-medium text-slate-800">{dialogData.operationName}</span></div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
                <button onClick={handleDialogClose} className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm w-full">Close Details</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvBooked;
