import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import API from "../API";
import { 
  GraduationCap, 
  CreditCard, 
  Users, 
  Search, 
  Calendar, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Sparkles,
  Layers
} from "lucide-react";

const DARK_STYLES = `
  html, body { 
    background: #0F172A !important; 
    color: #F1F5F9 !important; 
  }

  #AdvFullPaymentPage {
    background: #0F172A;
    min-height: 100vh;
    margin-left: 260px;
    padding: 90px 28px 40px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #F1F5F9;
    box-sizing: border-box;
  }

  @media (max-width: 900px) {
    #AdvFullPaymentPage {
      margin-left: 0;
      padding: 85px 16px 30px;
    }
  }

  #AdvFullPaymentPage .page-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 24px;
  }

  #AdvFullPaymentPage h1 {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin: 0 0 6px 0;
    background: linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  #AdvFullPaymentPage .page-sub {
    font-size: 13px;
    color: #64748B;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Metric Stat Cards */
  #AdvFullPaymentPage .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin-bottom: 26px;
  }

  #AdvFullPaymentPage .stat-card {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(12px);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  #AdvFullPaymentPage .stat-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.16);
  }

  #AdvFullPaymentPage .stat-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  #AdvFullPaymentPage .stat-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  #AdvFullPaymentPage .stat-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #94A3B8;
    margin-bottom: 4px;
  }

  #AdvFullPaymentPage .stat-value {
    font-size: 22px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.1;
  }

  #AdvFullPaymentPage .stat-sub {
    font-size: 12px;
    font-weight: 600;
    color: #10B981;
    margin-top: 4px;
  }

  /* Section Tabs */
  #AdvFullPaymentPage .view-tabs {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 6px;
    margin-bottom: 24px;
    overflow-x: auto;
    width: fit-content;
  }

  #AdvFullPaymentPage .tab-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    background: transparent;
    color: #94A3B8;
    transition: all 0.2s ease;
    white-space: nowrap;
    font-family: inherit;
  }

  #AdvFullPaymentPage .tab-btn:hover {
    color: #F1F5F9;
    background: rgba(255, 255, 255, 0.04);
  }

  #AdvFullPaymentPage .tab-btn.active {
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
  }

  #AdvFullPaymentPage .tab-btn.active.opted {
    background: linear-gradient(135deg, #6366F1 0%, #4338CA 100%);
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  }

  #AdvFullPaymentPage .tab-badge {
    background: rgba(255, 255, 255, 0.18);
    padding: 2px 7px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 800;
  }

  /* Section Box */
  #AdvFullPaymentPage .section-box {
    background: rgba(30, 41, 59, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 30px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(12px);
  }

  #AdvFullPaymentPage .section-box.opted-theme {
    border-color: rgba(99, 102, 241, 0.25);
  }

  #AdvFullPaymentPage .section-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  #AdvFullPaymentPage .section-title-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  #AdvFullPaymentPage .section-title {
    font-size: 19px;
    font-weight: 800;
    color: #F8FAFC;
    margin: 0;
  }

  #AdvFullPaymentPage .section-chip {
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  /* Filters Bar */
  #AdvFullPaymentPage .filters-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 16px;
    padding: 14px 18px;
    margin-bottom: 20px;
  }

  #AdvFullPaymentPage .search-input-wrap {
    flex: 1;
    min-width: 220px;
    position: relative;
    display: flex;
    align-items: center;
  }

  #AdvFullPaymentPage .search-input-wrap svg {
    position: absolute;
    left: 14px;
    color: #64748B;
    pointer-events: none;
  }

  #AdvFullPaymentPage input[type="text"] {
    width: 100%;
    background: rgba(30, 41, 59, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 12px !important;
    padding: 10px 14px 10px 40px !important;
    color: #F1F5F9 !important;
    font-size: 13px !important;
    outline: none !important;
    font-family: inherit !important;
    transition: all 0.2s ease;
  }

  #AdvFullPaymentPage input::placeholder { color: #64748B !important; }
  #AdvFullPaymentPage input:focus {
    border-color: #6366F1 !important;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
  }

  #AdvFullPaymentPage select {
    background: rgba(30, 41, 59, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 12px !important;
    padding: 10px 16px !important;
    color: #F1F5F9 !important;
    font-size: 13px !important;
    outline: none !important;
    font-family: inherit !important;
    cursor: pointer !important;
    transition: all 0.2s ease;
  }

  #AdvFullPaymentPage select:focus {
    border-color: #6366F1 !important;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
  }

  #AdvFullPaymentPage select option { 
    background: #1E293B; 
    color: #F1F5F9; 
  }

  #AdvFullPaymentPage .count-badge {
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 10px;
    padding: 8px 16px;
    color: #10B981;
    font-weight: 700;
    font-size: 13px;
    white-space: nowrap;
  }

  #AdvFullPaymentPage .count-badge.opted {
    background: rgba(99, 102, 241, 0.12);
    border-color: rgba(99, 102, 241, 0.25);
    color: #818CF8;
  }

  /* Quick chips */
  #AdvFullPaymentPage .quick-chips {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  #AdvFullPaymentPage .chip-btn {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 5px 13px;
    font-size: 11px;
    font-weight: 700;
    color: #94A3B8;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  #AdvFullPaymentPage .chip-btn:hover {
    color: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.2);
  }

  #AdvFullPaymentPage .chip-btn.selected {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.4);
    color: #A5B4FC;
  }

  /* Table */
  #AdvFullPaymentPage .table-wrap {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }

  #AdvFullPaymentPage table {
    width: 100%;
    border-collapse: collapse;
  }

  #AdvFullPaymentPage th {
    background: rgba(15, 23, 42, 0.95);
    color: #94A3B8;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    white-space: nowrap;
    text-align: left;
  }

  #AdvFullPaymentPage td {
    padding: 14px 16px;
    font-size: 13px;
    color: #CBD5E1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    vertical-align: middle;
    white-space: nowrap;
  }

  #AdvFullPaymentPage tr:hover td { 
    background: rgba(255, 255, 255, 0.02); 
  }

  #AdvFullPaymentPage .td-green  { color: #10B981; font-weight: 700; }
  #AdvFullPaymentPage .td-blue   { color: #60A5FA; font-weight: 700; }
  #AdvFullPaymentPage .td-yellow { color: #F59E0B; font-weight: 700; }
  #AdvFullPaymentPage .td-name   { text-transform: capitalize; font-weight: 700; color: #F8FAFC; }

  #AdvFullPaymentPage .badge-opted {
    background: rgba(99, 102, 241, 0.16);
    color: #A5B4FC;
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 20px;
    padding: 3px 11px;
    font-size: 11px;
    font-weight: 800;
    text-transform: capitalize;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  #AdvFullPaymentPage .badge-true {
    background: rgba(16, 185, 129, 0.12);
    color: #10B981;
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 700;
  }

  #AdvFullPaymentPage .badge-false {
    background: rgba(239, 68, 68, 0.12);
    color: #EF4444;
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 700;
  }

  /* Pagination */
  #AdvFullPaymentPage .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  #AdvFullPaymentPage .pagination button {
    border-radius: 10px;
    padding: 8px 18px;
    font-weight: 700;
    font-size: 13px;
    font-family: inherit;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  #AdvFullPaymentPage .pagination .btn-active {
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  #AdvFullPaymentPage .pagination .btn-active.opted {
    background: linear-gradient(135deg, #6366F1 0%, #4338CA 100%);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  #AdvFullPaymentPage .pagination .btn-disabled {
    background: rgba(255, 255, 255, 0.05);
    color: #475569;
    cursor: not-allowed;
  }

  #AdvFullPaymentPage .pagination span {
    color: #94A3B8;
    font-weight: 600;
    font-size: 13px;
  }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.12); border-radius: 99px; }
`;

const FullPayment = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active view tab: "optedMonth" | "paymentMonth" | "both"
  const [activeTab, setActiveTab] = useState("optedMonth");

  // Opted Month Section State
  const [selectedOptedMonth, setSelectedOptedMonth] = useState("");
  const [optedMonthsList, setOptedMonthsList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [searchOptedQuery, setSearchOptedQuery] = useState("");
  const [currentOptedPage, setCurrentOptedPage] = useState(1);

  // Payment Received Month Section State
  const [selectedPaymentMonth, setSelectedPaymentMonth] = useState("");
  const [paymentMonthsList, setPaymentMonthsList] = useState([]);
  const [searchPaymentQuery, setSearchPaymentQuery] = useState("");
  const [currentPaymentPage, setCurrentPaymentPage] = useState(1);

  const itemsPerPage = 25;

  /* ── Date Helpers ── */
  const getCurrentMonthName = () => {
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getMonthFromDate = (date) => {
    if (!date) return "";
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getPastMonthsList = () => {
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const t = new Date(d.getFullYear(), d.getMonth() - i, 1);
      return `${m[t.getMonth()]} ${t.getFullYear()}`;
    });
  };

  const getOptedMonthValue = (student) => {
    return (student.monthOpted || student.optedMonth || student.internshipstartsmonth || "").trim();
  };

  const buildOptedMonthsList = (students) => {
    const set = new Set();
    const mNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const now = new Date();

    // 1. Add future & current months
    for (let i = -1; i <= 5; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      set.add(`${mNames[d.getMonth()]} ${d.getFullYear()}`);
    }

    // 2. Add all unique values actually present in students' data
    students.forEach((s) => {
      const val = getOptedMonthValue(s);
      if (val) set.add(val);
    });

    return Array.from(set);
  };

  /* ── Fetch Data ── */
  const fetchStudents = async () => {
    const operationName = localStorage.getItem("advOperationName");
    try {
      setLoading(true);
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      const rawData = response.data;
      const dataArray = Array.isArray(rawData) ? rawData : (rawData?.data || []);

      const fullPaid = dataArray.filter(
        (i) => i.status === "fullPaid" && (!operationName || i.operationName === operationName)
      );

      setNewStudent(fullPaid);

      // Populate month options
      const current = getCurrentMonthName();
      setSelectedPaymentMonth(current);
      setPaymentMonthsList(getPastMonthsList());

      const dynamicOptedMonths = buildOptedMonthsList(fullPaid);
      setOptedMonthsList(dynamicOptedMonths);
      
      // Default opted month to current month if in list, else first available
      if (dynamicOptedMonths.includes(current)) {
        setSelectedOptedMonth(current);
      } else if (dynamicOptedMonths.length > 0) {
        setSelectedOptedMonth(dynamicOptedMonths[0]);
      } else {
        setSelectedOptedMonth(current);
      }
    } catch (error) {
      console.error("Error fetching advance enrolls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ── Reset page on filter changes ── */
  useEffect(() => {
    setCurrentOptedPage(1);
  }, [searchOptedQuery, selectedOptedMonth, selectedDomain]);

  useEffect(() => {
    setCurrentPaymentPage(1);
  }, [searchPaymentQuery, selectedPaymentMonth]);

  /* ── Dynamic Domain Options ── */
  const domainOptions = useMemo(() => {
    const set = new Set();
    newStudent.forEach((s) => {
      if (s.domain && s.domain.trim()) set.add(s.domain.trim());
    });
    return Array.from(set);
  }, [newStudent]);

  /* ── Match Opted Month Logic ── */
  const matchesOptedMonth = (student, target) => {
    if (!target || target === "all") return true;
    const val = getOptedMonthValue(student).toLowerCase();
    const tgt = target.toLowerCase().trim();
    if (!val) return tgt === "unassigned" || tgt === "none";
    if (val === tgt) return true;

    // Word match (e.g. "April" or "April 2026")
    const parts = tgt.split(" ");
    if (parts.length > 0 && val.includes(parts[0])) {
      if (parts.length > 1) {
        return val.includes(parts[1]) || !val.match(/\d{4}/);
      }
      return true;
    }
    return false;
  };

  /* ── Filtered Datasets ── */
  // 1. Opted Month Candidates
  const filteredOptedStudents = useMemo(() => {
    return newStudent.filter((student) => {
      if (!matchesOptedMonth(student, selectedOptedMonth)) return false;
      if (selectedDomain !== "all" && student.domain !== selectedDomain) return false;

      if (searchOptedQuery.trim()) {
        const q = searchOptedQuery.toLowerCase().trim();
        const opted = getOptedMonthValue(student).toLowerCase();
        const matches = (
          (student.fullname && student.fullname.toLowerCase().includes(q)) ||
          (student.email && student.email.toLowerCase().includes(q)) ||
          (student.phone && student.phone.toLowerCase().includes(q)) ||
          (student.counselor && student.counselor.toLowerCase().includes(q)) ||
          (student.domain && student.domain.toLowerCase().includes(q)) ||
          (student.program && student.program.toLowerCase().includes(q)) ||
          (student.collegeName && student.collegeName.toLowerCase().includes(q)) ||
          (student.branch && student.branch.toLowerCase().includes(q)) ||
          opted.includes(q)
        );
        if (!matches) return false;
      }
      return true;
    });
  }, [newStudent, selectedOptedMonth, selectedDomain, searchOptedQuery]);

  // 2. Payment Month Candidates (by createdAt)
  const filteredPaymentStudents = useMemo(() => {
    return newStudent.filter((student) => {
      if (selectedPaymentMonth && selectedPaymentMonth !== "all") {
        if (getMonthFromDate(student.createdAt) !== selectedPaymentMonth) return false;
      }

      if (searchPaymentQuery.trim()) {
        const q = searchPaymentQuery.toLowerCase().trim();
        const opted = getOptedMonthValue(student).toLowerCase();
        const matches = (
          (student.fullname && student.fullname.toLowerCase().includes(q)) ||
          (student.email && student.email.toLowerCase().includes(q)) ||
          (student.phone && student.phone.toLowerCase().includes(q)) ||
          (student.counselor && student.counselor.toLowerCase().includes(q)) ||
          (student.domain && student.domain.toLowerCase().includes(q)) ||
          (student.program && student.program.toLowerCase().includes(q)) ||
          (student.collegeName && student.collegeName.toLowerCase().includes(q)) ||
          (student.branch && student.branch.toLowerCase().includes(q)) ||
          opted.includes(q)
        );
        if (!matches) return false;
      }
      return true;
    });
  }, [newStudent, selectedPaymentMonth, searchPaymentQuery]);

  /* ── Metrics ── */
  const optedMonthRevenue = useMemo(() => {
    return filteredOptedStudents.reduce((acc, s) => acc + (Number(s.paidAmount) || 0), 0);
  }, [filteredOptedStudents]);

  const paymentMonthRevenue = useMemo(() => {
    return filteredPaymentStudents.reduce((acc, s) => acc + (Number(s.paidAmount) || 0), 0);
  }, [filteredPaymentStudents]);

  const totalLifetimeRevenue = useMemo(() => {
    return newStudent.reduce((acc, s) => acc + (Number(s.paidAmount) || 0), 0);
  }, [newStudent]);

  /* ── Pagination calculations ── */
  const indexOfLastOpted = currentOptedPage * itemsPerPage;
  const currentOptedItems = filteredOptedStudents.slice(indexOfLastOpted - itemsPerPage, indexOfLastOpted);
  const totalOptedPages = Math.ceil(filteredOptedStudents.length / itemsPerPage) || 1;

  const indexOfLastPayment = currentPaymentPage * itemsPerPage;
  const currentPaymentItems = filteredPaymentStudents.slice(indexOfLastPayment - itemsPerPage, indexOfLastPayment);
  const totalPaymentPages = Math.ceil(filteredPaymentStudents.length / itemsPerPage) || 1;

  // Quick suggestion chips for recent & upcoming cohorts
  const quickCohortChips = useMemo(() => {
    const mNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const now = new Date();
    return [
      { label: "All Months", value: "all" },
      { label: `Current (${mNames[now.getMonth()]})`, value: `${mNames[now.getMonth()]} ${now.getFullYear()}` },
      { 
        label: `Next (${mNames[(now.getMonth() + 1) % 12]})`, 
        value: `${mNames[(now.getMonth() + 1) % 12]} ${now.getMonth() + 1 > 11 ? now.getFullYear() + 1 : now.getFullYear()}` 
      },
      { 
        label: `+2 Mo (${mNames[(now.getMonth() + 2) % 12]})`, 
        value: `${mNames[(now.getMonth() + 2) % 12]} ${now.getMonth() + 2 > 11 ? now.getFullYear() + 1 : now.getFullYear()}` 
      }
    ];
  }, []);

  return (
    <div id="AdvFullPaymentPage">
      <style>{DARK_STYLES}</style>

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Full Payments & Program Cohorts</h1>
          <p className="page-sub">
            <Sparkles size={14} color="#60A5FA" />
            Track full paid candidate records by both <strong>Batch Opted Month</strong> and <strong>Payment Received Date</strong>
          </p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="stat-grid">
        {/* Opted Month Card */}
        <div className="stat-card" style={{ borderColor: "rgba(99, 102, 241, 0.3)" }}>
          <div className="stat-icon-wrap" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818CF8" }}>
            <GraduationCap size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">
              Opted: {selectedOptedMonth === "all" ? "All Cohorts" : selectedOptedMonth}
            </span>
            <span className="stat-value">{filteredOptedStudents.length} Candidates</span>
            <span className="stat-sub" style={{ color: "#A5B4FC" }}>
              ₹{optedMonthRevenue.toLocaleString()} Collected
            </span>
          </div>
        </div>

        {/* Payment Month Card */}
        <div className="stat-card" style={{ borderColor: "rgba(16, 185, 129, 0.3)" }}>
          <div className="stat-icon-wrap" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981" }}>
            <CreditCard size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">
              Paid: {selectedPaymentMonth === "all" ? "All Time" : selectedPaymentMonth}
            </span>
            <span className="stat-value">{filteredPaymentStudents.length} Candidates</span>
            <span className="stat-sub">
              ₹{paymentMonthRevenue.toLocaleString()} Inflow
            </span>
          </div>
        </div>

        {/* Total Full Paid Candidates Card */}
        <div className="stat-card" style={{ borderColor: "rgba(59, 130, 246, 0.3)" }}>
          <div className="stat-icon-wrap" style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60A5FA" }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">All-Time Full Paid</span>
            <span className="stat-value">{newStudent.length} Total</span>
            <span className="stat-sub" style={{ color: "#93C5FD" }}>
              ₹{totalLifetimeRevenue.toLocaleString()} Lifetime
            </span>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="view-tabs">
        <button
          className={`tab-btn opted ${activeTab === "optedMonth" ? "active opted" : ""}`}
          onClick={() => setActiveTab("optedMonth")}
        >
          <GraduationCap size={16} />
          Opted Month Data
          <span className="tab-badge">{filteredOptedStudents.length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === "paymentMonth" ? "active" : ""}`}
          onClick={() => setActiveTab("paymentMonth")}
        >
          <CreditCard size={16} />
          Payment Received Month Data
          <span className="tab-badge">{filteredPaymentStudents.length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === "both" ? "active" : ""}`}
          onClick={() => setActiveTab("both")}
        >
          <Layers size={16} />
          View Both Sections
        </button>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: OPTED MONTH DATA (Batch Cohorts)                             */}
      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {(activeTab === "optedMonth" || activeTab === "both") && (
        <div className="section-box opted-theme">
          <div className="section-header">
            <div className="section-title-wrap">
              <div 
                style={{ 
                  background: "rgba(99, 102, 241, 0.2)", 
                  color: "#818CF8", 
                  padding: "8px", 
                  borderRadius: "10px" 
                }}
              >
                <GraduationCap size={22} />
              </div>
              <div>
                <h2 className="section-title">
                  Opted Month Cohort Data:{" "}
                  <span style={{ color: "#A5B4FC" }}>
                    {selectedOptedMonth === "all" ? "All Cohorts" : selectedOptedMonth}
                  </span>
                </h2>
                <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748B" }}>
                  Students scheduled to start program/internship in the opted cohort
                </p>
              </div>
            </div>

            <div className="count-badge opted">
              {filteredOptedStudents.length} Candidates Opted
            </div>
          </div>

          {/* Quick Cohort Filter Chips */}
          <div className="quick-chips">
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>
              Quick Switch:
            </span>
            {quickCohortChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setSelectedOptedMonth(chip.value)}
                className={`chip-btn ${selectedOptedMonth === chip.value ? "selected" : ""}`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Filters Bar for Opted Month */}
          <div className="filters-bar">
            {/* Search Input */}
            <div className="search-input-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search opted candidates by name, email, phone, domain, counselor…"
                value={searchOptedQuery}
                onChange={(e) => setSearchOptedQuery(e.target.value)}
              />
            </div>

            {/* Opted Month Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={16} color="#818CF8" />
              <select
                value={selectedOptedMonth}
                onChange={(e) => setSelectedOptedMonth(e.target.value)}
              >
                <option value="all">All Opted Months</option>
                {optedMonthsList.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Domain Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Filter size={16} color="#94A3B8" />
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                <option value="all">All Domains</option>
                {domainOptions.map((dom, idx) => (
                  <option key={idx} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    {[
                      "Sl",
                      "Name",
                      "Email",
                      "Contact",
                      "Opted Month",
                      "Mode",
                      "Counselor",
                      "Got Payment On",
                      "Domain",
                      "Program Price",
                      "Paid",
                      "Pending",
                      "A/c Created"
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="13" style={{ textAlign: "center", padding: "60px", color: "#94A3B8" }}>
                        Loading candidate records…
                      </td>
                    </tr>
                  ) : Array.isArray(currentOptedItems) && currentOptedItems.length > 0 ? (
                    currentOptedItems.map((item, index) => {
                      const itemOpted = getOptedMonthValue(item) || "N/A";
                      const itemRemaining = Number(item.programPrice || 0) - Number(item.paidAmount || 0);

                      return (
                        <tr key={item._id}>
                          <td>{indexOfLastOpted - itemsPerPage + index + 1}</td>
                          <td className="td-name">{item.fullname}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>
                            <span className="badge-opted">
                              <GraduationCap size={12} />
                              {itemOpted}
                            </span>
                          </td>
                          <td style={{ textTransform: "capitalize" }}>{item.program}</td>
                          <td>{item.counselor}</td>
                          <td>
                            {item.createdAt 
                              ? new Date(item.createdAt).toLocaleDateString("en-GB") 
                              : "N/A"}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>{item.domain}</td>
                          <td className="td-green">
                            ₹{Number(item.programPrice || 0).toLocaleString()}
                          </td>
                          <td className="td-blue">
                            ₹{Number(item.paidAmount || 0).toLocaleString()}
                          </td>
                          <td className="td-yellow">
                            ₹{itemRemaining > 0 ? itemRemaining.toLocaleString() : "0"}
                          </td>
                          <td>
                            <span className={item.mailSended || item.userCreated ? "badge-true" : "badge-false"}>
                              {item.mailSended || item.userCreated ? "Yes" : "No"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="13" style={{ textAlign: "center", padding: "60px", color: "#64748B" }}>
                        No full paid candidate records found for opted cohort{" "}
                        <strong style={{ color: "#F1F5F9" }}>{selectedOptedMonth}</strong>.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredOptedStudents.length > itemsPerPage && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentOptedPage((p) => Math.max(p - 1, 1))}
                  disabled={currentOptedPage === 1}
                  className={currentOptedPage === 1 ? "btn-disabled" : "btn-active opted"}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span>
                  Page {currentOptedPage} of {totalOptedPages}
                </span>
                <button
                  onClick={() => setCurrentOptedPage((p) => Math.min(p + 1, totalOptedPages))}
                  disabled={currentOptedPage === totalOptedPages}
                  className={currentOptedPage === totalOptedPages ? "btn-disabled" : "btn-active opted"}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: PAYMENT RECEIVED MONTH DATA (By Got Payment On / createdAt)  */}
      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {(activeTab === "paymentMonth" || activeTab === "both") && (
        <div className="section-box">
          <div className="section-header">
            <div className="section-title-wrap">
              <div 
                style={{ 
                  background: "rgba(16, 185, 129, 0.18)", 
                  color: "#10B981", 
                  padding: "8px", 
                  borderRadius: "10px" 
                }}
              >
                <CreditCard size={22} />
              </div>
              <div>
                <h2 className="section-title">
                  Payment Received Month Data:{" "}
                  <span style={{ color: "#34D399" }}>
                    {selectedPaymentMonth === "all" ? "All Records" : selectedPaymentMonth}
                  </span>
                </h2>
                <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748B" }}>
                  Students whose full payment was recorded in this calendar billing cycle
                </p>
              </div>
            </div>

            <div className="count-badge">
              {filteredPaymentStudents.length} Payments Received
            </div>
          </div>

          {/* Filters Bar for Payment Month */}
          <div className="filters-bar">
            {/* Search Input */}
            <div className="search-input-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search payments by name, email, phone, counselor, domain…"
                value={searchPaymentQuery}
                onChange={(e) => setSearchPaymentQuery(e.target.value)}
              />
            </div>

            {/* Payment Month Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={16} color="#10B981" />
              <select
                value={selectedPaymentMonth}
                onChange={(e) => setSelectedPaymentMonth(e.target.value)}
              >
                <option value="all">All Payment Months</option>
                {paymentMonthsList.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    {[
                      "Sl",
                      "Name",
                      "Email",
                      "Contact",
                      "Mode",
                      "Counselor",
                      "Got Payment On",
                      "Domain",
                      "Program Price",
                      "Paid",
                      "Pending",
                      "Month Opted",
                      "A/c Created"
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="13" style={{ textAlign: "center", padding: "60px", color: "#94A3B8" }}>
                        Loading payment records…
                      </td>
                    </tr>
                  ) : Array.isArray(currentPaymentItems) && currentPaymentItems.length > 0 ? (
                    currentPaymentItems.map((item, index) => {
                      const itemRemaining = Number(item.programPrice || 0) - Number(item.paidAmount || 0);
                      const itemOpted = getOptedMonthValue(item) || "N/A";

                      return (
                        <tr key={item._id}>
                          <td>{indexOfLastPayment - itemsPerPage + index + 1}</td>
                          <td className="td-name">{item.fullname}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td style={{ textTransform: "capitalize" }}>{item.program}</td>
                          <td>{item.counselor}</td>
                          <td>
                            {item.createdAt 
                              ? new Date(item.createdAt).toLocaleDateString("en-GB") 
                              : "N/A"}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>{item.domain}</td>
                          <td className="td-green">
                            ₹{Number(item.programPrice || 0).toLocaleString()}
                          </td>
                          <td className="td-blue">
                            ₹{Number(item.paidAmount || 0).toLocaleString()}
                          </td>
                          <td className="td-yellow">
                            ₹{itemRemaining > 0 ? itemRemaining.toLocaleString() : "0"}
                          </td>
                          <td>
                            <span className="badge-opted">
                              <GraduationCap size={12} />
                              {itemOpted}
                            </span>
                          </td>
                          <td>
                            <span className={item.mailSended || item.userCreated ? "badge-true" : "badge-false"}>
                              {item.mailSended || item.userCreated ? "Yes" : "No"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="13" style={{ textAlign: "center", padding: "60px", color: "#64748B" }}>
                        No records found for payment month{" "}
                        <strong style={{ color: "#F1F5F9" }}>{selectedPaymentMonth}</strong>.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredPaymentStudents.length > itemsPerPage && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPaymentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPaymentPage === 1}
                  className={currentPaymentPage === 1 ? "btn-disabled" : "btn-active"}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span>
                  Page {currentPaymentPage} of {totalPaymentPages}
                </span>
                <button
                  onClick={() => setCurrentPaymentPage((p) => Math.min(p + 1, totalPaymentPages))}
                  disabled={currentPaymentPage === totalPaymentPages}
                  className={currentPaymentPage === totalPaymentPages ? "btn-disabled" : "btn-active"}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FullPayment;
