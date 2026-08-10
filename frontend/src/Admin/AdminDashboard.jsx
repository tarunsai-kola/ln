import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import { 
  BookOpen, Book, Users, Briefcase, 
  UserCheck, Bookmark, CheckSquare, XCircle, 
  Filter, Download, Loader, Calendar,
  TrendingUp, Shield
} from "lucide-react";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [advCourses, setAdvCourses] = useState([]);
  const [Operation, setOperation] = useState([]);
  const [AdvOperation, setAdvOperation] = useState([]);
  const [bda, setBda] = useState([]);
  const [payment, setPayment] = useState([]);
  const [advPayment, setAdvPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1).toLocaleString("default", { month: "long", year: "numeric" });

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/getcourses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchAdvCourses = async () => {
    try {
      const response = await axios.get(`${API}/getadvcourses`);
      setAdvCourses(response.data);
    } catch (error) {
      console.error("Error fetching adv courses:", error);
    }
  };

  const fetchOperation = async () => {
    try {
      const response = await axios.get(`${API}/getoperation`);
      setOperation(response.data);
    } catch (error) {
      console.error("Error fetching operation:", error);
    }
  };

  const fetchAdvOperation = async () => {
    try {
      const response = await axios.get(`${API}/getadvoperation`);
      setAdvOperation(response.data);
    } catch (error) {
      console.error("Error fetching ADV operation:", error);
    }
  };

  const fetchBda = async () => {
    try {
      const response = await axios.get(`${API}/getbda`);
      setBda(response.data);
    } catch (error) {
      console.error("Error fetching bda:", error);
    }
  };

  const fetchNewStudent = async () => {
    try {
      const response = await axios.get(`${API}/getnewstudentenroll?all=true`);
      setPayment(response.data);
      setFilteredPayments(response.data);
    } catch (error) {
      console.error("Error fetching new student:", error);
    }
  };

  const fetchAdvEnrollments = async () => {
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      setAdvPayment(response.data);
    } catch (error) {
      console.error("Error fetching adv enrollments:", error);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await Promise.all([fetchCourses(), fetchAdvCourses()]);
        await Promise.all([fetchOperation(), fetchAdvOperation(), fetchBda()]);
        await Promise.all([fetchNewStudent(), fetchAdvEnrollments()]);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filterPaymentsByDate = () => {
    let filteredData = payment;
    if (startDate) {
      filteredData = filteredData.filter(item => new Date(item.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      filteredData = filteredData.filter(item => new Date(item.createdAt) <= new Date(endDate));
    }
    setFilteredPayments(filteredData);
    toast.success("Data filtered successfully.");
    setShowFilters(false);
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilteredPayments(payment);
    toast.success("Filters cleared.");
  };

  const exportToExcel = () => {
    if (filteredPayments.length === 0) {
      toast.error("No data to export based on current filters.");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(filteredPayments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");
    const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelFile], { type: "application/octet-stream" });
    saveAs(blob, "filtered_students.xlsx");
    toast.success("Data exported successfully.");
    setShowFilters(false);
  };

  const statCards = [
    { title: "Standard Courses", value: courses.length, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { title: "Advanced Courses", value: advCourses.length, icon: Book, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
    { title: "Operations", value: Operation.length, icon: Shield, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
    { title: "Adv Operations", value: AdvOperation.length, icon: Briefcase, color: "text-fuchsia-600", bg: "bg-fuchsia-50", border: "border-fuchsia-100" },
    { title: "Active BDAs", value: bda.length, icon: Users, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100" },
    { title: "Total Booked", value: payment.filter(item => item.status === "booked").length, icon: Bookmark, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { title: "Fully Paid", value: payment.filter(item => item.status === "fullPaid").length, icon: CheckSquare, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { title: "Defaulted", value: payment.filter(item => item.status === "default").length, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
  ];

  return (
    <div className="admin-content-wrap min-h-screen bg-[#F4F7FE] p-6 sm:p-10 font-sans md:ml-64 relative">
      <Toaster position="top-center" />

      {/* Header Area */}
      <div className="max-w-[1600px] mx-auto mb-10">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight m-0 flex items-center gap-3">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Overview of system metrics, course enrollments, and operations.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 relative z-50">
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm border ${showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Filter size={18} className={showFilters ? "text-indigo-600" : "text-slate-400"} />
              Filter Data
            </button>
            <button 
              onClick={exportToExcel} 
              className="px-5 py-2.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download size={18} className="text-emerald-500" />
              Export Excel
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute top-14 right-36 w-[320px] bg-white border border-slate-200 rounded-2xl shadow-xl p-5 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" /> Date Range Filter
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                  
                  <div className="pt-2 flex flex-col gap-2">
                    <button onClick={filterPaymentsByDate} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm">
                      Apply Filters
                    </button>
                    {(startDate || endDate) && (
                      <button onClick={clearFilters} className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 h-32 animate-pulse flex items-center shadow-sm">
              <div className="w-14 h-14 bg-slate-100 rounded-full mr-4"></div>
              <div className="flex-1 space-y-3">
                <div className="h-3 bg-slate-100 rounded-md w-1/2"></div>
                <div className="h-6 bg-slate-100 rounded-md w-1/3"></div>
              </div>
            </div>
          ))
        ) : (
          statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} border ${stat.border} flex items-center justify-center shrink-0`}>
                  <Icon size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{stat.title}</div>
                  <div className="text-3xl font-black text-slate-800 leading-none">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Tables Section */}
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Standard Courses Table */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800 m-0 flex items-center gap-2">
              <BookOpen className="text-blue-500" size={20} /> Standard Courses Overview
            </h3>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider">
              {courses.length} Total
            </span>
          </div>
          
          {loading ? (
            <div className="p-24 flex flex-col justify-center items-center gap-4">
              <Loader className="animate-spin text-blue-500" size={32} />
              <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest">Loading courses...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider w-16">No.</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Course Name</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Total Sessions</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Enrollments ({currentMonth})</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Enrollments ({nextMonth})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {courses.map((course, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-8 py-4 font-semibold text-slate-400">{index + 1}</td>
                      <td className="px-8 py-4 font-bold text-slate-700">{course.title}</td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold bg-slate-100 text-slate-600">
                          {course.session ? Object.keys(course.session).length : 0}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold bg-emerald-50 text-emerald-600">
                          {payment?.filter(item => item.domainId === course._id && item.monthOpted === currentMonth).length || 0}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold bg-blue-50 text-blue-600">
                          {payment?.filter(item => item.domainId === course._id && item.monthOpted === nextMonth).length || 0}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-12 text-center text-slate-500 font-medium">No standard courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Advanced Courses Table */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800 m-0 flex items-center gap-2">
              <Book className="text-purple-500" size={20} /> Advanced Courses Overview
            </h3>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider">
              {advCourses.length} Total
            </span>
          </div>
          
          {loading ? (
            <div className="p-24 flex flex-col justify-center items-center gap-4">
              <Loader className="animate-spin text-purple-500" size={32} />
              <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest">Loading courses...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider w-16">No.</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Course Name</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Total Sessions</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Enrollments ({currentMonth})</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Enrollments ({nextMonth})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {advCourses.map((course, index) => (
                    <tr key={index} className="hover:bg-purple-50/50 transition-colors">
                      <td className="px-8 py-4 font-semibold text-slate-400">{index + 1}</td>
                      <td className="px-8 py-4 font-bold text-slate-700">{course.title}</td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold bg-slate-100 text-slate-600">
                          {course.sessions?.length || 0}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold bg-emerald-50 text-emerald-600">
                          {advPayment?.filter(item => item.domainId === course._id && item.monthOpted === currentMonth).length || 0}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-bold bg-purple-50 text-purple-600">
                          {advPayment?.filter(item => item.domainId === course._id && item.monthOpted === nextMonth).length || 0}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {advCourses.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-12 text-center text-slate-500 font-medium">No advanced courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
