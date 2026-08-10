import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { 
  Users, Search, Calendar, ChevronLeft, ChevronRight, X, Clock,
  UserCheck, ArrowRight, Filter, Download, Send,
  Loader, Edit3, AlertCircle, Plus, Bell, Mail, Shield, CalendarDays
} from "lucide-react";

const AdminAttendance = () => {
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
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ email: "", name: "", role: "Employee", pin: "" });
  const [addingMember, setAddingMember] = useState(false);
  
  const [dailySummary, setDailySummary] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  
  const [isOverrideActive, setIsOverrideActive] = useState(false);
  const [loadingOverride, setLoadingOverride] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API}/api/atd/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: 50, search, month: filterMonth, year: filterYear }
      });
      setMembers(res.data.data);
      setTotalMembers(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, filterMonth, filterYear]);

  const fetchDailySummary = useCallback(async () => {
    setLoadingSummary(true);
    try {
      const token = localStorage.getItem("adminToken");
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

  const fetchOverrideStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API}/api/atd/admin/attendance-override`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsOverrideActive(res.data.value);
    } catch (err) {
      console.error("Failed to fetch override status");
    }
  }, []);

  useEffect(() => {
    fetchMembers();
    fetchDailySummary();
    fetchOverrideStatus();
  }, [fetchMembers, fetchDailySummary, fetchOverrideStatus]);

  const fetchUserDetail = async (userId, page = 1) => {
    setLoadingHistory(true);
    try {
      const token = localStorage.getItem("adminToken");
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
      const token = localStorage.getItem("adminToken");
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
        const row = { "Name": m.name, "Email": m.email, "Role": m.role || "Member" };
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
      const token = localStorage.getItem("adminToken");
      await axios.post(`${API}/api/atd/admin/send-report/${user._id}`, { month: filterMonth, year: filterYear }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`Report sent to ${user.email}`);
    } catch (err) {
      toast.error("Failed to send report");
    } finally {
      setSendingReport(null);
    }
  };

  const sendAllReports = async () => {
    if (!window.confirm(`Are you sure you want to send reports to ALL employees for ${monthNames[filterMonth]} ${filterYear}?`)) return;
    setIsBulkSending(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${API}/api/atd/admin/send-all-reports`, { month: filterMonth, year: filterYear }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Bulk report dispatch started successfully");
    } catch (err) {
      toast.error("Failed to start bulk dispatch");
    } finally {
      setIsBulkSending(false);
    }
  };

  const sendReminders = async () => {
    if (!window.confirm("Send attendance reminders to all employees who haven't marked attendance today?")) return;
    setIsReminding(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${API}/api/atd/admin/send-reminders`, {}, { headers: { Authorization: `Bearer ${token}` } });
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
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${API}/api/atd/admin/send-absent-mails`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to send absent emails");
    } finally {
      setIsSendingAbsent(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.email || !newMember.name || !newMember.pin) { toast.error("Please fill all fields"); return; }
    if (newMember.pin.length < 4 || newMember.pin.length > 6) { toast.error("PIN must be 4-6 digits"); return; }

    setAddingMember(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${API}/api/atd/admin/add-user`, newMember, { headers: { Authorization: `Bearer ${token}` } });
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
    if (!editingUser.email || !editingUser.name || !editingUser.pin) { toast.error("Please fill all fields"); return; }
    setIsUpdatingUser(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(`${API}/api/atd/admin/user/${editingUser._id}`, editingUser, { headers: { Authorization: `Bearer ${token}` } });
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

  const handleToggleOverride = async () => {
    const newVal = !isOverrideActive;
    if (!window.confirm(`Are you sure you want to turn ${newVal ? 'ON' : 'OFF'} the Emergency Attendance Override?\n\nIf ON, ALL new attendance marked from now on will be recorded at 11:00 AM IST (Full/On-Time).`)) return;
    
    setLoadingOverride(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${API}/api/atd/admin/attendance-override`, { value: newVal }, { headers: { Authorization: `Bearer ${token}` } });
      setIsOverrideActive(newVal);
      toast.success(`Emergency Override is now ${newVal ? 'ACTIVE' : 'INACTIVE'}`);
    } catch (err) {
      toast.error("Failed to update override status");
    } finally {
      setLoadingOverride(false);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="admin-content-wrap min-h-screen bg-[#F4F7FE] p-6 sm:p-10 font-sans md:ml-64 relative">
      <Toaster position="top-center" />

      {/* Header Area */}
      <div className="max-w-[1500px] mx-auto mb-10">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight m-0 flex items-center gap-3">
              Attendance Hub
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Manage daily check-ins, employee presence, and generate reports.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
              <Plus size={18} strokeWidth={2.5} /> Add Member
            </button>
            <button onClick={sendReminders} disabled={isReminding} className="px-4 py-2.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50">
              {isReminding ? <Loader size={18} className="animate-spin text-amber-500" /> : <Bell size={18} className="text-amber-500" />}
              <span className="hidden sm:inline">Remind</span>
            </button>
            <button onClick={sendAbsentMails} disabled={isSendingAbsent} className="px-4 py-2.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50">
              {isSendingAbsent ? <Loader size={18} className="animate-spin text-rose-500" /> : <Mail size={18} className="text-rose-500" />}
              <span className="hidden sm:inline">Absent</span>
            </button>
            <button onClick={sendAllReports} disabled={isBulkSending} className="px-4 py-2.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50">
              {isBulkSending ? <Loader size={18} className="animate-spin text-indigo-500" /> : <Send size={18} className="text-indigo-500" />}
              <span className="hidden sm:inline">Reports</span>
            </button>
            <button 
              onClick={handleToggleOverride} 
              disabled={loadingOverride}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm border ${isOverrideActive ? 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
              title="Emergency Override"
            >
              {loadingOverride ? <Loader size={18} className="animate-spin" /> : <AlertCircle size={18} className={isOverrideActive ? "text-orange-500" : "text-slate-400"} />}
              <span className="hidden sm:inline">Override</span>
            </button>
            <button onClick={exportToExcel} disabled={exportLoading} className="px-5 py-2.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50">
              {exportLoading ? <Loader size={18} className="animate-spin text-emerald-500" /> : <Download size={18} className="text-emerald-500" />}
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Daily Department Summary */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loadingSummary ? (
          <div className="col-span-full py-10 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 font-medium shadow-sm">Loading summary...</div>
        ) : (dailySummary && dailySummary.length > 0) ? (
          dailySummary.map((s, i) => {
            const icons = [
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><UserCheck size={24} /></div>,
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><UserCheck size={24} /></div>,
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><UserCheck size={24} /></div>,
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><UserCheck size={24} /></div>,
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center"><UserCheck size={24} /></div>
            ];
            return (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                {icons[i % icons.length]}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{s.department || "Other"}</div>
                  <div className="text-2xl font-black text-slate-800 flex items-baseline gap-1">
                    {s.count} <span className="text-sm font-semibold text-slate-500">Present</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-10 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 font-medium shadow-sm">No records found for today</div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1500px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Controls */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search employee..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={filterMonth} 
                onChange={(e) => { setFilterMonth(e.target.value); setCurrentPage(1); }}
                className="pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer outline-none transition-colors"
              >
                {monthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={filterYear} 
                onChange={(e) => { setFilterYear(e.target.value); setCurrentPage(1); }}
                className="pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer outline-none transition-colors"
              >
                {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-24 flex flex-col justify-center items-center gap-4">
            <Loader className="animate-spin text-indigo-500" size={40} />
            <p className="text-slate-400 font-semibold text-sm">Loading employees...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Total</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Full Present</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Late</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Half Day</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {members.map((user) => (
                  <tr key={user._id} onClick={() => handleUserClick(user)} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800">{user.name}</span>
                            {user.status === 'inactive' && (
                              <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md font-bold uppercase border border-rose-100">Inactive</span>
                            )}
                          </div>
                          <div className="text-slate-500 text-xs font-medium mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                        {user.role || "Member"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold bg-slate-100 text-slate-700">
                        {user.daysPresent}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold bg-emerald-50 text-emerald-600">
                        {user.onTimeCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold ${user.lateCount > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                        {user.lateCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold ${user.halfDayCount > 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                        {user.halfDayCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); sendReport(user, e); }}
                          disabled={sendingReport === user._id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                          title="Send Report"
                        >
                          {sendingReport === user._id ? <Loader size={14} className="animate-spin" /> : <Send size={14} />}
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingUser(user); setShowEditUserModal(true); }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-indigo-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                          title="Edit User"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700 transition-colors">
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-20 text-center">
                      <Search className="text-slate-300 mx-auto mb-3" size={32} />
                      <p className="text-slate-500 font-semibold">No employees found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
            <span className="text-sm font-semibold text-slate-500">
              Page {currentPage} of {totalPages} <span className="font-normal text-slate-400 ml-1">({totalMembers} results)</span>
            </span>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold text-sm hover:bg-slate-50 disabled:opacity-50 transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold text-sm hover:bg-slate-50 disabled:opacity-50 transition-colors flex items-center gap-1"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800 m-0">Add New Member</h2>
                <p className="text-sm text-slate-500 mt-1">Register employee for attendance tracking</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input type="text" placeholder="e.g. John Doe" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" placeholder="john@Accenlearn.com" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Designation / Role</label>
                <input type="text" placeholder="e.g. Software Engineer" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Predefined PIN (4-6 digits)</label>
                <input type="text" placeholder="123456" value={newMember.pin} onChange={e => setNewMember({...newMember, pin: e.target.value})} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500" />
              </div>
              <button type="submit" disabled={addingMember} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors mt-2 flex justify-center items-center gap-2">
                {addingMember ? <Loader size={18} className="animate-spin" /> : "Add Member"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800 m-0">Edit Credentials</h2>
                <p className="text-sm text-slate-500 mt-1">Update profile information</p>
              </div>
              <button onClick={() => setShowEditUserModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Designation / Role</label>
                <input type="text" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employee PIN</label>
                <input type="text" value={editingUser.pin || ""} onChange={e => setEditingUser({...editingUser, pin: e.target.value})} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Account Status</label>
                <select value={editingUser.status || "active"} onChange={e => setEditingUser({...editingUser, status: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 bg-white">
                  <option value="active">Active (Access Allowed)</option>
                  <option value="inactive">Inactive (Access Blocked)</option>
                </select>
              </div>
              <button type="submit" disabled={isUpdatingUser} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors mt-2 flex justify-center items-center gap-2">
                {isUpdatingUser ? <Loader size={18} className="animate-spin" /> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail History Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-6 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-2xl">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 m-0">{selectedUser.name}</h2>
                  <div className="text-sm font-medium text-slate-500 mt-1">{selectedUser.email} • {selectedUser.role}</div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white border border-slate-200 text-slate-600 shadow-sm">
                      <Calendar size={12} className="text-slate-400" /> {monthNames[filterMonth]} {filterYear}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <UserCheck size={12} /> Full: {selectedUser.onTimeCount}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                      <Clock size={12} /> Late: {selectedUser.lateCount}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                      <Clock size={12} /> Half: {selectedUser.halfDayCount}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-700 m-0 flex items-center gap-2">
                  <CalendarDays size={16} className="text-slate-400" /> Attendance Log
                </h3>
                <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                  Detailed View
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2">
                {loadingHistory ? (
                  <div className="h-full flex items-center justify-center text-slate-400">
                    <Loader className="animate-spin text-indigo-400 mr-2" size={24} /> Loading records...
                  </div>
                ) : (!userHistory || userHistory.length === 0) ? (
                  <div className="h-full flex items-center justify-center text-slate-400 font-medium">
                    No records found for this month.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userHistory.map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center border ${
                            h.isHalfDay ? 'bg-rose-50 text-rose-600 border-rose-100' : h.isLate ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          }`}>
                            <span className="text-lg font-bold leading-none">{new Date(h.date).getDate()}</span>
                            <span className="text-[10px] font-semibold uppercase">{new Date(h.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800 text-sm">{new Date(h.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                            <div className="text-[10px] font-bold mt-0.5">
                              {h.isHalfDay ? <span className="text-rose-500">HALF DAY</span> :
                               h.isLate ? <span className="text-amber-500">LATE</span> :
                               <span className="text-emerald-500">ON TIME</span>}
                            </div>
                            {h.ip && (
                              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                <Shield size={10} /> {h.ip === "::1" || h.ip === "127.0.0.1" ? "Localhost" : h.ip}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                            h.isHalfDay ? 'bg-rose-50 text-rose-600 border-rose-100' : h.isLate ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                            <Clock size={14} /> 
                            {h.timestamp ? new Date(new Date(h.timestamp).getTime() + (5.5 * 60 * 60 * 1000)).getUTCHours().toString().padStart(2, '0') + ":" + new Date(new Date(h.timestamp).getTime() + (5.5 * 60 * 60 * 1000)).getUTCMinutes().toString().padStart(2, '0') : "--:--"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Modal Pagination */}
              {historyTotalPages > 1 && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">
                    Page {historyPage} of {historyTotalPages}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      disabled={historyPage === 1}
                      onClick={() => fetchUserDetail(selectedUser._id, historyPage - 1)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-1 hover:bg-slate-50 disabled:opacity-50 transition-colors text-sm font-semibold"
                    >
                      <ChevronLeft size={16} /> Prev
                    </button>
                    <button 
                      disabled={historyPage === historyTotalPages}
                      onClick={() => fetchUserDetail(selectedUser._id, historyPage + 1)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-1 hover:bg-slate-50 disabled:opacity-50 transition-colors text-sm font-semibold"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance;
