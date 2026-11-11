import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  Search,
  Calendar,
  CalendarDays,
  AlertOctagon,
  IndianRupee,
  RefreshCw,
  Phone,
  Mail,
  Copy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  TrendingDown,
  UserX
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const formatINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
};

const DefaultPayment = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 30;

  const operationName = localStorage.getItem("advOperationName") || "Operations";

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const getCurrentMonth = () => {
    const m = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getPastMonths = () => {
    const m = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    return Array.from({ length: 4 }, (_, i) => {
      const t = new Date(d.getFullYear(), d.getMonth() - i, 1);
      return `${m[t.getMonth()]} ${t.getFullYear()}`;
    });
  };

  const getMonthFromDate = (date) => {
    const m = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(date);
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const fetchNewStudent = async (showToast = false) => {
    const opName = localStorage.getItem("advOperationName");
    if (showToast) setIsRefreshing(true);
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      const students = response.data.filter(
        (i) => i.status === "default" && i.operationName === opName
      );
      setNewStudent(students);

      const current = getCurrentMonth();
      if (!selectedMonth) {
        setSelectedMonth(current);
        setFilteredStudents(
          students.filter((s) => getMonthFromDate(s.createdAt) === current)
        );
      } else {
        setFilteredStudents(
          students.filter((s) => getMonthFromDate(s.createdAt) === selectedMonth)
        );
      }
    } catch (error) {
      console.error("Error fetching defaulted students:", error);
      toast.error("Failed to load defaulted students roster.");
    } finally {
      if (showToast) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchNewStudent();
    setMonths(getPastMonths());
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedMonth, newStudent]);

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setSearchQuery(v);
    let filtered = newStudent;
    if (selectedMonth) {
      filtered = filtered.filter(
        (s) => getMonthFromDate(s.createdAt) === selectedMonth
      );
    }
    if (v) {
      const q = v.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          (s.email && s.email.toLowerCase().includes(q)) ||
          (s.phone && s.phone.toLowerCase().includes(q)) ||
          (s.fullname && s.fullname.toLowerCase().includes(q)) ||
          (s.counselor && s.counselor.toLowerCase().includes(q)) ||
          (s.operationName && s.operationName.toLowerCase().includes(q)) ||
          (s.domain && s.domain.toLowerCase().includes(q)) ||
          (s.whatsAppNumber && s.whatsAppNumber.toLowerCase().includes(q))
      );
    }
    setFilteredStudents(filtered);
  };

  const handleMonthChange = (e) => {
    const m = e.target.value;
    setSelectedMonth(m);
    let filtered = newStudent.filter(
      (s) => getMonthFromDate(s.createdAt) === m
    );
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          (s.email && s.email.toLowerCase().includes(q)) ||
          (s.phone && s.phone.toLowerCase().includes(q)) ||
          (s.fullname && s.fullname.toLowerCase().includes(q)) ||
          (s.counselor && s.counselor.toLowerCase().includes(q)) ||
          (s.domain && s.domain.toLowerCase().includes(q))
      );
    }
    setFilteredStudents(filtered);
  };

  const handleCopyMobileNumbers = (date, studentsOnDate) => {
    if (Array.isArray(studentsOnDate)) {
      const numbers = studentsOnDate
        .map((s) => s.whatsAppNumber || s.phone)
        .filter(Boolean)
        .join("\n");
      navigator.clipboard
        .writeText(numbers)
        .then(() => toast.success(`Copied ${studentsOnDate.length} WhatsApp numbers!`))
        .catch(() => toast.error("Failed to copy phone numbers."));
    }
  };

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;

  // Grouped by Date
  const groupedData = useMemo(() => {
    return currentItems.reduce((acc, item) => {
      const date = formatDate(item.createdAt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  }, [currentItems]);

  // Aggregates for current filtered view
  const totalContractValue = useMemo(() => {
    return filteredStudents.reduce((acc, s) => acc + (s.programPrice || 0), 0);
  }, [filteredStudents]);

  const totalCollected = useMemo(() => {
    return filteredStudents.reduce((acc, s) => acc + (s.paidAmount || 0), 0);
  }, [filteredStudents]);

  const totalUncollectedLoss = Math.max(0, totalContractValue - totalCollected);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans ml-[260px] mt-[70px] p-6 lg:p-8">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ── Executive Header Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-7 md:p-8 shadow-xl shadow-slate-900/10 mb-8 border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                Recovery & Default Roster
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                <Calendar size={13} className="text-slate-500" />
                {selectedMonth || getCurrentMonth()}
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                Advance Defaulted Payments
                <ShieldAlert size={22} className="text-rose-400 hidden sm:inline" />
              </h1>
              <p className="text-slate-400 text-xs md:text-sm font-normal max-w-xl">
                Audit defaulted advance enrollments, review unfulfilled payment milestones, and coordinate candidate recovery workflows.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => fetchNewStudent(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Refresh roster"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin text-rose-400" : "text-slate-400"} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* Aggregate Mini KPI Pills */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-slate-400 font-semibold block text-[11px]">Defaulted Students</span>
            <span className="text-xl font-black text-rose-400 mt-0.5 block">{filteredStudents.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-slate-400 font-semibold block text-[11px]">Contracted Price</span>
            <span className="text-xl font-black text-white mt-0.5 block">{formatINR(totalContractValue)}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-emerald-400 font-semibold block text-[11px]">Initial Amount Paid</span>
            <span className="text-xl font-black text-emerald-400 mt-0.5 block">{formatINR(totalCollected)}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-rose-400 font-semibold block text-[11px]">Outstanding Loss</span>
            <span className="text-xl font-black text-rose-400 mt-0.5 block">{formatINR(totalUncollectedLoss)}</span>
          </div>
        </div>
      </div>

      {/* ── Filter & Search Toolbar ── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row gap-3.5 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            type="text"
            placeholder="Search defaulted records by name, email, phone, or counselor..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange({ target: { value: "" } })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Month Dropdown & Counter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="w-full md:w-48 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all cursor-pointer appearance-none"
            >
              {months.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200/60 text-rose-700 font-bold text-xs whitespace-nowrap">
            {filteredStudents.length} Defaulted
          </div>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-4 text-center w-12">#</th>
                <th className="py-4 px-4">Student Info</th>
                <th className="py-4 px-4">Financial Overview</th>
                <th className="py-4 px-4">Program & Opted Term</th>
                <th className="py-4 px-4">Counselor / Attribution</th>
                <th className="py-4 px-4 text-center">Contact & Action</th>
                <th className="py-4 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map((date) => (
                  <React.Fragment key={date}>
                    {/* Date Separator Banner */}
                    <tr
                      onClick={() => handleCopyMobileNumbers(date, groupedData[date])}
                      className="group cursor-pointer bg-slate-50/70 hover:bg-rose-50/50 transition-colors border-y border-slate-200/60"
                      title="Click to copy WhatsApp numbers for this date"
                    >
                      <td colSpan={7} className="py-2.5 px-5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span className="flex items-center gap-2 text-rose-700">
                            <CalendarDays size={14} className="text-rose-600" />
                            <span>{date}</span>
                            <span className="text-slate-400 font-normal ml-2">
                              ({groupedData[date].length} {groupedData[date].length === 1 ? "record" : "records"})
                            </span>
                          </span>

                          <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 group-hover:underline">
                            <Copy size={12} /> Click to Copy Numbers
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Student Rows */}
                    {groupedData[date].map((item, index) => {
                      const dueAmount = (item.programPrice || 0) - (item.paidAmount || 0);
                      const rawNum = String(item.whatsAppNumber || item.phone || "").replace(/[^0-9]/g, "");
                      const cleanNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;

                      return (
                        <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                            {indexOfFirst + index + 1}
                          </td>

                          {/* Student Info */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 font-bold flex items-center justify-center text-xs uppercase flex-shrink-0">
                                {item.fullname ? item.fullname.charAt(0) : "D"}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 capitalize leading-tight">
                                  {item.fullname}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                                  <span>{item.whatsAppNumber || item.phone}</span>
                                  {item.email && (
                                    <>
                                      <span>•</span>
                                      <span className="max-w-[140px] truncate text-slate-400">{item.email}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Financials */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-emerald-600 text-xs">
                                  Paid: {formatINR(item.paidAmount)}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  of {formatINR(item.programPrice)}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                                  Default Loss: {formatINR(dueAmount)}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Program & Term */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-1">
                              <span className="inline-block font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                                {item.domain || item.program || "Advance Track"}
                              </span>
                              <div className="text-[11px] text-slate-500">
                                Term: <strong className="text-slate-700 capitalize">{item.monthOpted || "N/A"}</strong>
                              </div>
                            </div>
                          </td>

                          {/* Counselor */}
                          <td className="py-3.5 px-4">
                            <div className="text-slate-700 font-medium capitalize">
                              {item.counselor || "Direct"}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Enrolled: {formatDate(item.createdAt)}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {cleanNum && (
                                <a
                                  href={`https://web.whatsapp.com/send?phone=${cleanNum}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                                  title="Contact via WhatsApp"
                                >
                                  <FaWhatsapp size={15} />
                                </a>
                              )}
                              {item.phone && (
                                <a
                                  href={`tel:${item.phone}`}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                  title="Call Student"
                                >
                                  <Phone size={14} />
                                </a>
                              )}
                              {item.email && (
                                <a
                                  href={`mailto:${item.email}`}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                  title="Send Email"
                                >
                                  <Mail size={14} />
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                              Defaulted
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    <AlertOctagon size={36} className="mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-sm">No defaulted payments found for {selectedMonth || "this period"}.</p>
                    <p className="text-xs text-slate-400 mt-1">Excellent! No student accounts are currently marked as defaulted.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Bar ── */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing <span className="font-bold">{indexOfFirst + 1}</span> to{" "}
              <span className="font-bold">{Math.min(indexOfLast, filteredStudents.length)}</span> of{" "}
              <span className="font-bold">{filteredStudents.length}</span> records
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="font-bold px-2">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultPayment;
