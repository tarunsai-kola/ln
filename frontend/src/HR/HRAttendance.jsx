import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { 
  Users, Search, Calendar, ChevronLeft, ChevronRight, X, Clock,
  UserCheck, ArrowRight, Filter, Download, Send, Loader, Trash2, Edit3, UserPlus, CheckCircle2, ShieldCheck, Mail
} from "lucide-react";

const HRAttendance = () => {
  const [members, setMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());

  const [selectedUser, setSelectedUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotalPages, setHistoryTotalPages] = useState(1);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [sendingReport, setSendingReport] = useState(null);
  const [isBulkSending, setIsBulkSending] = useState(false);
  const [isReminding, setIsReminding] = useState(false);
  const [isSendingAbsent, setIsSendingAbsent] = useState(false);
  const [updatingRecord, setUpdatingRecord] = useState(null);
  
  const [addingMember, setAddingMember] = useState(false);
  
  const [dailySummary, setDailySummary] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null); 
  const [deletingRecord, setDeletingRecord] = useState(null);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ email: "", name: "", role: "Employee", pin: "" });
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("hrToken");
      const res = await axios.get(`${API}/api/atd/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: 50, search, month: filterMonth, year: filterYear }
      });
      setMembers(res.data.data);
      setTotalMembers(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error("Failed to load members or unauthorized");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, filterMonth, filterYear]);

  const fetchDailySummary = useCallback(async () => {
    setLoadingSummary(true);
    try {
      const token = localStorage.getItem("hrToken");
      const now = new Date();
      const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const today = istTime.toISOString().split("T")[0];
      
      const res = await axios.get(`${API}/api/atd/admin/daily-summary`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { date: today }
      });
      setDailySummary(res.data.summary);
    } catch (err) {
      console.error("Failed to load summary");
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
    fetchDailySummary();
  }, [fetchMembers, fetchDailySummary]);

  const fetchUserDetail = async (userId, page = 1) => {
    setLoadingHistory(true);
    try {
      const token = localStorage.getItem("hrToken");
      const res = await axios.get(`${API}/api/atd/admin/user/${userId}/history`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit: 10, month: filterMonth, year: filterYear }
      });
      setUserHistory(res.data.data);
      setHistoryTotalPages(res.data.totalPages);
      setHistoryPage(page);
    } catch (err) {
      toast.error("Failed to load history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const exportToExcel = async () => {
    setExportLoading(true);
    try {
      const token = localStorage.getItem("hrToken");
      const res = await axios.get(`${API}/api/atd/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { all: true, search, month: filterMonth, year: filterYear }
      });
      
      const daysInMonth = new Date(filterYear, parseInt(filterMonth) + 1, 0).getDate();
      const dayColumns = [];
      for (let i = 1; i <= daysInMonth; i++) {
        dayColumns.push(i.toString().padStart(2, '0'));
      }

      const dataToExport = res.data.data.map(m => {
        const row = {
          "Name": m.name,
          "Email": m.email,
          "Role": m.role || "Member",
        };

        for (let i = 1; i <= daysInMonth; i++) {
          const dayKey = i.toString().padStart(2, '0');
          const dayStr = `${filterYear}-${(parseInt(filterMonth) + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
          const record = m.detailedRecords?.find(r => r.date === dayStr);
          if (record) {
            if (record.status === "Present") row[dayKey] = "P";
            else if (record.status === "Late") row[dayKey] = "L";
            else if (record.status === "Half Day") row[dayKey] = "HD";
          } else {
            row[dayKey] = "-"; 
          }
        }

        row["Total Present"] = m.daysPresent;
        row["Full Present"] = m.onTimeCount;
        row["Late"] = m.lateCount;
        row["Half Day"] = m.halfDayCount;
        row["Month"] = monthNames[filterMonth];
        row["Year"] = filterYear;

        return row;
      });

      const headerOrder = ["Name", "Email", "Role", ...dayColumns, "Total Present", "Full Present", "Late", "Half Day", "Month", "Year"];
      const ws = XLSX.utils.json_to_sheet(dataToExport, { header: headerOrder });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(data, `Attendance_${monthNames[filterMonth]}_${filterYear}.xlsx`);
      toast.success("Report downloaded successfully");
    } catch (err) {
      toast.error("Failed to export report");
    } finally {
      setExportLoading(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserDetail(user._id, 1);
  };

  const sendReport = async (user, e) => {
    if (e) e.stopPropagation();
    setSendingReport(user._id);
    try {
      const token = localStorage.getItem("hrToken");
      await axios.post(`${API}/api/atd/admin/send-report/${user._id}`, {
        month: filterMonth,
        year: filterYear
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Report sent to ${user.email}`);
    } catch (err) {
      toast.error("Failed to send report");
    } finally {
      setSendingReport(null);
    }
  };

  const sendAllReports = async () => {
    if (!window.confirm(`Bulk dispatch reports for ${monthNames[filterMonth]} ${filterYear}?`)) return;
    setIsBulkSending(true);
    try {
      const token = localStorage.getItem("hrToken");
      await axios.post(`${API}/api/atd/admin/send-all-reports`, {
        month: filterMonth,
        year: filterYear
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Bulk report dispatch started");
    } catch (err) {
      toast.error("Failed to start dispatch");
    } finally {
      setIsBulkSending(false);
    }
  };

  const sendReminders = async () => {
    if (!window.confirm("Send attendance reminders to all employees who haven't marked attendance today?")) return;
    setIsReminding(true);
    try {
      const token = localStorage.getItem("hrToken");
      const res = await axios.post(`${API}/api/atd/admin/send-reminders`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to send reminders");
    } finally {
      setIsReminding(false);
    }
  };

  const sendAbsentMails = async () => {
    if (!window.confirm("Send absent notification emails to all employees who haven't marked attendance today?")) return;
    setIsSendingAbsent(true);
    try {
      const token = localStorage.getItem("hrToken");
      const res = await axios.post(`${API}/api/atd/admin/send-absent-mails`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to send absent emails");
    } finally {
      setIsSendingAbsent(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.email || !newMember.name || !newMember.pin) {
      toast.error("Please fill all fields");
      return;
    }
    setAddingMember(true);
    try {
      const token = localStorage.getItem("hrToken");
      await axios.post(`${API}/api/atd/admin/add-user`, newMember, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Member added successfully!");
      setShowAddModal(false);
      setNewMember({ email: "", name: "", role: "Employee", pin: "" });
      fetchMembers();
      fetchDailySummary();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add member");
    } finally {
      setAddingMember(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser.email || !editingUser.name || !editingUser.pin) {
      toast.error("Please fill all fields");
      return;
    }
    setIsUpdatingUser(true);
    try {
      const token = localStorage.getItem("hrToken");
      await axios.patch(`${API}/api/atd/admin/user/${editingUser._id}`, editingUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("User credentials updated");
      setShowEditUserModal(false);
      fetchMembers();
      fetchDailySummary();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update user");
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pt-[90px] lg:ml-[265px] p-6 relative">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><UserPlus size={20} /></div>
                <div>
                  <h2 className="text-lg font-black text-slate-800">Add New Member</h2>
                  <p className="text-xs font-bold text-slate-400">Register employee for attendance</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddMember} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Users size={16} /></div>
                   <input type="text" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Mail size={16} /></div>
                   <input type="email" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Role</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><ShieldCheck size={16} /></div>
                   <input type="text" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">PIN (4-6 digits)</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Clock size={16} /></div>
                   <input type="text" value={newMember.pin} onChange={e => setNewMember({...newMember, pin: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 font-medium tracking-[0.2em] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                </div>
              </div>
              <button type="submit" disabled={addingMember} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 mt-2 disabled:opacity-70 flex items-center justify-center gap-2">
                 {addingMember ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Register Member"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600"><Edit3 size={20} /></div>
                <div>
                  <h2 className="text-lg font-black text-slate-800">Edit Credentials</h2>
                  <p className="text-xs font-bold text-slate-400">Update employee profile & PIN</p>
                </div>
              </div>
              <button onClick={() => setShowEditUserModal(false)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdateUser} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Role</label>
                <input type="text" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Employee PIN</label>
                <input type="text" value={editingUser.pin || ""} onChange={e => setEditingUser({...editingUser, pin: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium tracking-[0.2em] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Account Status</label>
                <select value={editingUser.status || "active"} onChange={e => setEditingUser({...editingUser, status: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-bold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer">
                   <option value="active">Active (Access Allowed)</option>
                   <option value="inactive">Inactive (Access Blocked)</option>
                </select>
              </div>
              <button type="submit" disabled={isUpdatingUser} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 mt-2 disabled:opacity-70 flex items-center justify-center gap-2">
                 {isUpdatingUser ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Update Credentials"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                  <UserCheck size={24} className="text-indigo-600" />
               </div>
               Employee Attendance
            </h1>
            <p className="text-slate-500 font-medium mt-2 ml-1">HR Portal Dashboard & Record Management</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
             <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md text-indigo-600 font-bold rounded-xl transition-all shadow-sm text-sm">
                <UserPlus size={16} /> Add Member
             </button>
             <button onClick={sendReminders} disabled={isReminding} className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-sm shadow-amber-200 text-sm disabled:opacity-70">
                {isReminding ? <><Loader size={16} className="animate-spin"/> Reminding...</> : <><Clock size={16} /> Reminders</>}
             </button>
             <button onClick={sendAbsentMails} disabled={isSendingAbsent} className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all shadow-sm shadow-rose-200 text-sm disabled:opacity-70">
                {isSendingAbsent ? <><Loader size={16} className="animate-spin"/> Sending...</> : <><X size={16} /> Absent Mails</>}
             </button>
             <button onClick={sendAllReports} disabled={isBulkSending} className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-sm shadow-slate-300 text-sm disabled:opacity-70">
                {isBulkSending ? <><Loader size={16} className="animate-spin"/> Dispatching...</> : <><Send size={16} /> Send Reports</>}
             </button>
             <button onClick={exportToExcel} disabled={exportLoading} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md text-emerald-600 font-bold rounded-xl transition-all shadow-sm text-sm">
                {exportLoading ? <><Loader size={16} className="animate-spin"/> Exporting...</> : <><Download size={16} /> Export Excel</>}
             </button>
          </div>
        </div>

        {/* Daily Department Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {loadingSummary ? (
             <div className="col-span-full py-8 text-center text-slate-400 font-bold">Loading department summary...</div>
           ) : dailySummary.length > 0 ? (
             dailySummary.map((s, i) => (
               <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                     <Users size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-1">{s.department || "General"}</div>
                     <div className="text-2xl font-black text-slate-800 leading-none">
                        {s.count} <span className="text-xs font-bold text-slate-400 ml-1">Present</span>
                     </div>
                  </div>
               </div>
             ))
           ) : (
             <div className="col-span-full py-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 font-bold text-sm">
               No attendance records found for today
             </div>
           )}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
           <div className="relative w-full md:w-96 group">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
               <Search size={18} />
             </div>
             <input type="text" placeholder="Search employee..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
           </div>

           <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Calendar size={16} /></div>
                <select value={filterMonth} onChange={(e) => { setFilterMonth(e.target.value); setCurrentPage(1); }} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-8 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm appearance-none min-w-[140px]">
                   {monthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
             </div>
             <div className="relative w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Filter size={16} /></div>
                <select value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setCurrentPage(1); }} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-8 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm appearance-none">
                   {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
             </div>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
             <div className="py-20 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-bold text-slate-400">Loading attendance data...</p>
             </div>
          ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="py-5 px-6 font-black text-xs uppercase tracking-widest text-slate-400">Employee</th>
                      <th className="py-5 px-6 font-black text-xs uppercase tracking-widest text-slate-400">Role</th>
                      <th className="py-5 px-6 font-black text-xs uppercase tracking-widest text-slate-400 text-center">Total</th>
                      <th className="py-5 px-6 font-black text-xs uppercase tracking-widest text-slate-400 text-center">Full</th>
                      <th className="py-5 px-6 font-black text-xs uppercase tracking-widest text-slate-400 text-center">Late</th>
                      <th className="py-5 px-6 font-black text-xs uppercase tracking-widest text-slate-400 text-center">Half Day</th>
                      <th className="py-5 px-6 font-black text-xs uppercase tracking-widest text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {members.map(user => (
                      <tr key={user._id} onClick={() => handleUserClick(user)} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">
                                 {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                 <div className="font-bold text-slate-800 flex items-center gap-2">
                                    {user.name}
                                    {user.status === 'inactive' && (
                                       <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-rose-50 text-rose-500 rounded border border-rose-100">Inactive</span>
                                    )}
                                 </div>
                                 <div className="text-xs font-semibold text-slate-500">{user.email}</div>
                              </div>
                           </div>
                        </td>
                        <td className="py-4 px-6">
                           <span className="inline-flex items-center px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold">
                              {user.role || "Member"}
                           </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                           <span className="inline-flex w-8 h-8 items-center justify-center bg-slate-100 text-slate-800 rounded-full text-xs font-black border border-slate-200">{user.daysPresent}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                           <span className="inline-flex w-8 h-8 items-center justify-center bg-emerald-50 text-emerald-600 rounded-full text-xs font-black border border-emerald-100">{user.onTimeCount}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                           <span className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-xs font-black border ${user.lateCount > 0 ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>{user.lateCount}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                           <span className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-xs font-black border ${user.halfDayCount > 0 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>{user.halfDayCount}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={(e) => { e.stopPropagation(); sendReport(user, e); }} disabled={sendingReport === user._id} className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm flex items-center justify-center transition-all disabled:opacity-50" title="Send Report">
                                 {sendingReport === user._id ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); setEditingUser(user); setShowEditUserModal(true); }} className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm flex items-center justify-center transition-all" title="Edit User">
                                 <Edit3 size={16} />
                              </button>
                              <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                 <ArrowRight size={16} />
                              </div>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
           <div className="flex items-center justify-between mt-8">
              <span className="text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                 <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"><ChevronLeft size={16} /> Prev</button>
                 <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all">Next <ChevronRight size={16} /></button>
              </div>
           </div>
        )}
      </div>

      {/* History Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 lg:pl-[265px]" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xl">
                    {selectedUser.name.charAt(0).toUpperCase()}
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-slate-800">{selectedUser.name}</h2>
                    <p className="text-sm font-semibold text-slate-500">{selectedUser.email}</p>
                 </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors"><X size={18} /></button>
            </div>
            
            <div className="bg-slate-50/50 p-6 max-h-[60vh] overflow-y-auto">
               <h3 className="text-xs font-black tracking-widest uppercase text-slate-400 mb-4 px-2">Attendance Timeline</h3>
               {loadingHistory ? (
                  <div className="py-12 flex justify-center"><Loader size={24} className="animate-spin text-indigo-500" /></div>
               ) : userHistory.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
                     <p className="text-sm font-bold text-slate-400">No records found for this period</p>
                  </div>
               ) : (
                  <div className="space-y-3">
                     {userHistory.map((h, i) => (
                       <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-14 bg-slate-50 border border-slate-100 rounded-xl flex flex-col items-center justify-center">
                                <span className="text-lg font-black text-slate-800 leading-none">{new Date(h.date).getDate()}</span>
                                <span className="text-[10px] font-bold text-indigo-600 uppercase mt-1">{new Date(h.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                             </div>
                             <div>
                                <div className="text-sm font-bold text-slate-800 mb-1">{new Date(h.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                                <div className="flex gap-2">
                                   <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${h.isHalfDay ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                     {h.isHalfDay ? "Half Day" : "Full Present"}
                                   </span>
                                   {h.isLate && !h.isHalfDay && (
                                     <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border bg-amber-50 text-amber-600 border-amber-100">Late</span>
                                   )}
                                </div>
                             </div>
                          </div>
                          <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                             <Clock size={14} className="text-slate-400" />
                             <span className="text-sm font-black text-slate-700">
                                {h.timestamp ? new Date(new Date(h.timestamp).getTime() + (5.5 * 60 * 60 * 1000)).getUTCHours().toString().padStart(2, '0') + ":" + new Date(new Date(h.timestamp).getTime() + (5.5 * 60 * 60 * 1000)).getUTCMinutes().toString().padStart(2, '0') : "--:--"}
                             </span>
                          </div>
                       </div>
                     ))}
                  </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRAttendance;
