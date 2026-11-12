import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import {
  Search,
  Plus,
  Calendar,
  BookOpen,
  BadgeCheck,
  AlertOctagon,
  IndianRupee,
  Clock,
  CheckCircle2,
  Mail,
  Send,
  Info,
  Edit3,
  Phone,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  X,
  KeyRound,
  User,
  ShieldCheck,
  CalendarDays,
  FileText
} from "lucide-react";
import { FaWhatsapp, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { PiLockKeyOpenFill, PiLockKeyFill } from "react-icons/pi";

const formatINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
};

const BookedAmount = () => {
  /* ── State ── */
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [course, setCourse] = useState([]);
  const [bda, setBda] = useState([]);
  const [operationData, setOperationData] = useState(null);
  const [newStudent, setNewStudent] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Form Fields
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
  const [monthsToShow, setMonthsToShow] = useState([]);
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [modeofpayment, setModeofpayment] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [branch, setBranch] = useState("");
  const [yearOfPassingOut, setYearOfPassingOut] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [internshipstartsmonth, setInternshipstartsmonth] = useState("");
  const [internshipendsmonth, setInternshipendsmonth] = useState("");
  const [batchTiming, setBatchTiming] = useState("");
  const [referFriend, setReferFriend] = useState("");
  const [languages, setLanguages] = useState(["English"]);
  const [editingStudentId, setEditingStudentId] = useState(null);

  // Offer Letter Modal State
  const [offerData, setOfferData] = useState(null);
  const [offerFullname, setOfferFullname] = useState("");
  const [offerDomain, setOfferDomain] = useState("");
  const [offerEmail, setOfferEmail] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [offerDuration, setOfferDuration] = useState("");
  const [offerStart, setOfferStart] = useState("");
  const [offerEnd, setOfferEnd] = useState("");
  const [offerLocation, setOfferLocation] = useState("Online");
  const [isOfferLetterSending, setIsOfferLetterSending] = useState(false);

  // Detail Dialog State
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  // Filtering & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const operationName = localStorage.getItem("advOperationName") || "Operations";

  /* ── Date Helpers ── */
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
    const ci = d.getMonth();
    const cy = d.getFullYear();
    const pastMonths = [];
    for (let i = 0; i < 4; i++) {
      const td = new Date(cy, ci - i, 1);
      pastMonths.push(`${m[td.getMonth()]} ${td.getFullYear()}`);
    }
    return pastMonths;
  };

  const getMonthFromDate = (date) => {
    if (!date) return "";
    const m = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const buildDynamicMonths = (students = []) => {
    const set = new Set();
    students.forEach((s) => {
      const m = getMonthFromDate(s.createdAt);
      if (m) set.add(m);
    });
    // Include standard past 4 months as fallback
    const past = getPastMonths();
    past.forEach((p) => set.add(p));

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return Array.from(set).sort((a, b) => {
      const partsA = a.split(" ");
      const partsB = b.split(" ");
      const dateA = new Date(parseInt(partsA[1] || 0), monthNames.indexOf(partsA[0]), 1);
      const dateB = new Date(parseInt(partsB[1] || 0), monthNames.indexOf(partsB[0]), 1);
      return dateB - dateA;
    });
  };

  const generateOptedMonthOptions = (students = []) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const optionsSet = new Set();

    // 1. Gather existing cohort months from all student records
    if (Array.isArray(students)) {
      students.forEach((s) => {
        if (s.monthOpted && typeof s.monthOpted === "string" && s.monthOpted.trim()) {
          optionsSet.add(s.monthOpted.trim());
        }
        if (s.internshipstartsmonth && typeof s.internshipstartsmonth === "string" && s.internshipstartsmonth.trim()) {
          optionsSet.add(s.internshipstartsmonth.trim());
        }
      });
    }

    // 2. Generate comprehensive year-aware cohort months (past year, current year, next 2 years)
    const cy = new Date().getFullYear();
    for (let yr = cy - 1; yr <= cy + 2; yr++) {
      for (const m of monthNames) {
        optionsSet.add(`${m} ${yr}`);
      }
    }

    // 3. Include plain month names for legacy backwards-compatibility
    monthNames.forEach((m) => optionsSet.add(m));

    return Array.from(optionsSet);
  };

  const formatCleanDate = (val) => {
    if (!val) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [y, mn, d] = val.split("-");
      const dt = new Date(parseInt(y), parseInt(mn) - 1, parseInt(d));
      return dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    }
    return val;
  };

  /* ── Calculations ── */
  useEffect(() => {
    const price = parseFloat(programPrice) || 0;
    const paid = parseFloat(paidAmount) || 0;
    setRemainingAmount(price - paid);
  }, [programPrice, paidAmount]);

  useEffect(() => {
    const today = new Date();
    const min = today.toISOString().split("T")[0];
    const max = new Date(today.setDate(today.getDate() + 5))
      .toISOString()
      .split("T")[0];
    setMinDate(min);
    setMaxDate(max);

    setMonthsToShow(generateOptedMonthOptions());
  }, []);

  /* ── API Data Fetching ── */
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/getadvcourses`);
      setCourse(res.data);
    } catch (err) {
      console.error("Error fetching adv courses:", err);
    }
  };

  const fetchBda = async () => {
    try {
      const [bdaRes, teamRes] = await Promise.allSettled([
        axios.get(`${API}/getbda`),
        axios.get(`${API}/getadvteam`),
      ]);
      const bdaData =
        bdaRes.status === "fulfilled" && Array.isArray(bdaRes.value.data)
          ? bdaRes.value.data
          : [];
      const teamRaw = teamRes.status === "fulfilled" ? teamRes.value.data : [];
      const teamData = Array.isArray(teamRaw)
        ? teamRaw
        : Array.isArray(teamRaw?.data)
          ? teamRaw.data
          : [];
      setBda([...bdaData, ...teamData]);
    } catch (err) {
      console.error("Error fetching bda/advteam:", err);
      setBda([]);
    }
  };

  const fetchOperationData = async () => {
    const operationId = localStorage.getItem("advOperationId");
    try {
      const res = await axios.get(`${API}/getadvoperation`, {
        params: { operationId },
      });
      setOperationData(res.data);
    } catch (err) {
      console.error("Failed to fetch operation user data", err);
    }
  };

  const fetchNewStudent = async (showToast = false) => {
    const opName = localStorage.getItem("advOperationName") || "";
    const cleanOp = opName.trim().toLowerCase();
    if (showToast) setIsRefreshing(true);
    try {
      const res = await axios.get(`${API}/getadvenrolls?all=true`);
      const rawData = res.data;
      const list = Array.isArray(rawData) ? rawData : (rawData?.data || []);

      const booked = list.filter((item) => {
        const isBooked = String(item.status || "").toLowerCase() === "booked";
        if (!isBooked) return false;
        if (!cleanOp) return true;
        const itemOp = String(item.operationName || "").trim().toLowerCase();
        return itemOp === cleanOp || itemOp.includes(cleanOp) || cleanOp.includes(itemOp);
      });
      setNewStudent(booked);

      // Build dynamic month list from booked items + fallback months
      const dynamicMonths = buildDynamicMonths(booked);
      setMonths(dynamicMonths);
      setMonthsToShow(generateOptedMonthOptions(booked));

      const curMonth = getCurrentMonth();
      let activeMonth = selectedMonth;

      if (!activeMonth) {
        // If current month has records, use it; otherwise pick the latest month that has records
        const hasRecordsInCurrent = booked.some((s) => getMonthFromDate(s.createdAt) === curMonth);
        if (hasRecordsInCurrent) {
          activeMonth = curMonth;
        } else if (dynamicMonths.length > 0) {
          activeMonth = dynamicMonths[0];
        } else {
          activeMonth = curMonth;
        }
        setSelectedMonth(activeMonth);
      }

      let filtered = booked;
      if (activeMonth && activeMonth !== "all") {
        filtered = booked.filter(
          (student) => getMonthFromDate(student.createdAt) === activeMonth
        );
      }
      setFilteredStudents(filtered);
    } catch (err) {
      console.error("Error fetching booked students:", err);
    } finally {
      if (showToast) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchBda();
    fetchNewStudent();
    fetchOperationData();
  }, []);

  /* ── Filter Handlers ── */
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    setCurrentPage(1);
    let filtered = newStudent;
    if (month && month !== "all") {
      filtered = filtered.filter(
        (student) => getMonthFromDate(student.createdAt) === month
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(matchesSearchQuery);
    }
    setFilteredStudents(filtered);
  };

  const matchesSearchQuery = (student) => {
    const q = searchQuery.toLowerCase();
    return (
      (student.email && String(student.email).toLowerCase().includes(q)) ||
      (student.phone && String(student.phone).toLowerCase().includes(q)) ||
      (student.fullname && String(student.fullname).toLowerCase().includes(q)) ||
      (student.counselor && String(student.counselor).toLowerCase().includes(q)) ||
      (student.domain && String(student.domain).toLowerCase().includes(q)) ||
      (student.whatsAppNumber && String(student.whatsAppNumber).toLowerCase().includes(q)) ||
      (student.clearPaymentMonth && String(student.clearPaymentMonth).toLowerCase().includes(q))
    );
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
    let filtered = newStudent;
    if (selectedMonth && selectedMonth !== "all") {
      filtered = filtered.filter(
        (student) => getMonthFromDate(student.createdAt) === selectedMonth
      );
    }
    if (val) {
      filtered = filtered.filter(matchesSearchQuery);
    }
    setFilteredStudents(filtered);
  };

  /* ── Form Actions ── */
  const resetForm = () => {
    setiscourseFormVisible(false);
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
    setModeofpayment("");
    setCollegeName("");
    setBranch("");
    setYearOfPassingOut("");
    setCompanyName("");
    setRole("");
    setTransactionId("");
    setInternshipstartsmonth("");
    setInternshipendsmonth("");
    setBatchTiming("");
    setReferFriend("");
    setLanguages(["English"]);
    setEditingStudentId(null);
  };

  const handleAddNewCandidate = () => {
    resetForm();
    setEditingStudentId(null);
    setiscourseFormVisible(true);
  };

  const handleEdit = (studentId) => {
    const student = newStudent.find((item) => item._id === studentId);
    if (!student) return;
    setEditingStudentId(student._id);
    setFullname(student.fullname || "");
    setEmail(student.email || "");
    setPhone(student.phone || "");
    setWhatsAppNumber(student.whatsAppNumber || "");
    setCounselor(student.counselor || "");
    setDomain(student.domain || "");
    setProgramPrice(student.programPrice || "");
    setPaidAmount(student.paidAmount || "");
    setRemainingAmount(student.remainingAmount || 0);

    // Resolve original Month Opted with fallback to internship starts month
    const originalMonth = (student.monthOpted || student.internshipstartsmonth || "").trim();
    if (originalMonth) {
      const matched = monthsToShow.find(
        (m) => m.toLowerCase() === originalMonth.toLowerCase()
      );
      if (matched) {
        setMonthOpted(matched);
      } else {
        setMonthsToShow((prev) => [originalMonth, ...prev]);
        setMonthOpted(originalMonth);
      }
    } else {
      setMonthOpted("");
    }
    setClearPaymentMonth(() => {
      try {
        return student.clearPaymentMonth
          ? new Date(student.clearPaymentMonth).toISOString().split("T")[0]
          : "";
      } catch (e) {
        return "";
      }
    });
    setModeofpayment(student.modeofpayment || "");
    setCollegeName(student.collegeName || "");
    setBranch(student.branch || "");
    setYearOfPassingOut(student.yearOfStudy || student.yearOfPassingOut || "");
    setCompanyName(student.companyName || "");
    setRole(student.role || "");
    setTransactionId(student.transactionId || "");
    setInternshipstartsmonth(student.internshipstartsmonth || "");
    setInternshipendsmonth(student.internshipendsmonth || "");
    setBatchTiming(student.batchTiming || "");
    setReferFriend(student.referFriend || "");
    setLanguages(student.languages || ["English"]);
    setiscourseFormVisible(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!operationData) {
      toast.error("Operation data not loaded. Please wait or refresh.");
      return;
    }

    const formData = {
      fullname,
      email: email.trim(),
      phone,
      whatsAppNumber,
      counselor: counselor.trim(),
      domain: domain.trim(),
      programPrice,
      paidAmount,
      remainingAmount,
      monthOpted,
      modeofpayment,
      collegeName,
      branch,
      yearOfPassingOut,
      companyName,
      role,
      transactionId,
      languages,
      internshipstartsmonth,
      internshipendsmonth,
      referFriend,
      clearPaymentMonth,
      operationName: operationData.fullname,
      operationId: operationData._id,
      batchTiming,
    };
    try {
      let response;
      if (editingStudentId) {
        response = await axios.put(
          `${API}/editadvstudentdetails/${editingStudentId}`,
          formData
        );
      } else {
        response = await axios.post(`${API}/advenroll`, formData);
      }
      if (response.status === 200 || response.status === 201) {
        toast.success(
          editingStudentId ? "Student updated successfully." : "Form submitted successfully."
        );
        fetchNewStudent();
        resetForm();
      } else {
        toast.error("Error submitting the form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message;
      toast.error(`Error: ${errorMsg}`);
    }
  };

  /* ── Remarks ── */
  const handleRemarkChange = async (e, studentId) => {
    const selectedRemark = e.target.value;
    if (!selectedRemark || !studentId) return;

    try {
      const response = await axios.post(`${API}/updateremark`, {
        remark: selectedRemark,
        studentId,
      });
      if (response.status === 200) {
        toast.success("Remark updated!");
        setNewStudent((prev) =>
          prev.map((student) =>
            student._id === studentId
              ? { ...student, remark: [...(student.remark || []), selectedRemark] }
              : student
          )
        );
        setFilteredStudents((prev) =>
          prev.map((student) =>
            student._id === studentId
              ? { ...student, remark: [...(student.remark || []), selectedRemark] }
              : student
          )
        );
      }
    } catch (error) {
      toast.error("An error occurred while updating the remark.");
    }
  };

  /* ── Offer Letter ── */
  const handleOpenOfferLetter = (student) => {
    setOfferData(student);
    setOfferFullname(student.fullname || "");
    setOfferDomain(student.domain || "");
    setOfferEmail(student.email || "");

    const todayFormatted = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setOfferDate(student.offerDate || todayFormatted);
    setOfferDuration(student.offerDuration || student.program || "3 Months");
    setOfferStart(student.offerStart || student.internshipstartsmonth || student.monthOpted || "");
    setOfferEnd(student.offerEnd || student.internshipendsmonth || "");
    setOfferLocation(student.offerLocation || "Online");
  };

  const resetOfferLeter = () => {
    setOfferData(null);
    setOfferFullname("");
    setOfferDomain("");
    setOfferEmail("");
    setOfferDate("");
    setOfferDuration("");
    setOfferStart("");
    setOfferEnd("");
    setOfferLocation("Online");
  };

  const sendOfferleter = async (e) => {
    e.preventDefault();
    setIsOfferLetterSending(true);

    const cleanDate = formatCleanDate(offerDate);
    const cleanStart = formatCleanDate(offerStart);
    const cleanEnd = formatCleanDate(offerEnd);

    const offerLetterDetails = {
      id: offerData._id,
      fullname: (offerFullname || offerData.fullname || "")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" "),
      domain: offerDomain || offerData.domain || "",
      email: (offerEmail || offerData.email || "").trim(),
      date: cleanDate,
      duration: offerDuration,
      start: cleanStart,
      end: cleanEnd,
      location: offerLocation || "Online",
      smtpConfig: "SMTP_MAIL2",
    };

    try {
      await axios.post(`${API}/sendofferletter`, offerLetterDetails);
      toast.success("Offer letter sent successfully!");
      fetchNewStudent();
      resetOfferLeter();
    } catch (error) {
      console.error("Error sending offer letter:", error);
      toast.error(error.response?.data?.error || "Error sending offer letter");
    } finally {
      setIsOfferLetterSending(false);
    }
  };

  /* ── Credentials & Account ── */
  const handleSendEmail = async (value) => {
    if (value.isSending) return;
    value.isSending = true;
    const emailData = {
      fullname: value.fullname,
      email: value.email,
      phone: value.phone,
      program: value.program,
      counselor: value.counselor,
      domain: value.domain,
      clearPaymentMonth: value.clearPaymentMonth,
      monthOpted: value.monthOpted,
    };
    try {
      const response = await axios.post(`${API}/send-email`, emailData);
      if (response.status === 200) {
        toast.success("Credentials email sent successfully!");
        await axios.put(`${API}/mailsendedchange/${value._id}`, { mailSended: true });
        setNewStudent((prev) =>
          prev.map((s) => (s._id === value._id ? { ...s, mailSended: true } : s))
        );
        setFilteredStudents((prev) =>
          prev.map((s) => (s._id === value._id ? { ...s, mailSended: true } : s))
        );
      }
    } catch (error) {
      toast.error("Failed to send credentials email.");
    } finally {
      value.isSending = false;
    }
  };

  const createAccount = async (value) => {
    if (value.isSending) return;
    value.isSending = true;
    const Data = {
      fullname: value.fullname.trim(),
      email: value.email.trim(),
      phone: value.phone,
      advance: true,
    };
    try {
      const response = await axios.post(`${API}/users`, Data);
      if (response.status === 200) {
        toast.success("User account created successfully!");
        await axios.put(`${API}/mailsendedchange/${value._id}`, { userCreated: true });
        setNewStudent((prev) =>
          prev.map((s) => (s._id === value._id ? { ...s, userCreated: true } : s))
        );
        setFilteredStudents((prev) =>
          prev.map((s) => (s._id === value._id ? { ...s, userCreated: true } : s))
        );
      }
    } catch (error) {
      toast.success("User already created (check active users).");
    } finally {
      value.isSending = false;
    }
  };

  /* ── Copy Mobile Numbers ── */
  const handleCopyMobileNumbers = (selectedDate) => {
    const students = groupedData[selectedDate];
    if (Array.isArray(students)) {
      const mobileNumbers = students
        .map((s) => s.whatsAppNumber || s.phone)
        .filter(Boolean)
        .join("\n");
      navigator.clipboard
        .writeText(mobileNumbers)
        .then(() => toast.success(`Copied ${students.length} WhatsApp numbers!`))
        .catch(() => toast.error("Failed to copy numbers."));
    }
  };

  /* ── Dialog Handlers ── */
  const handleDialogOpen = (item) => {
    setDialogData(item);
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setDialogData(null);
  };

  /* ── Pagination ── */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedMonth, newStudent]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

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

  // Aggregate Stats for selected month
  const totalBookedValue = useMemo(() => {
    return filteredStudents.reduce((acc, s) => acc + (s.programPrice || 0), 0);
  }, [filteredStudents]);

  const totalPaidCollected = useMemo(() => {
    return filteredStudents.reduce((acc, s) => acc + (s.paidAmount || 0), 0);
  }, [filteredStudents]);

  const totalPendingAmount = Math.max(0, totalBookedValue - totalPaidCollected);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans ml-[260px] mt-[70px] p-6 lg:p-8">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ── Executive Header Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-7 md:p-8 shadow-xl shadow-slate-900/10 mb-8 border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Booked Pipeline Console
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                <Calendar size={13} className="text-slate-500" />
                {selectedMonth || getCurrentMonth()}
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                Advance Booked Payments
                <Sparkles size={20} className="text-amber-400 hidden sm:inline" />
              </h1>
              <p className="text-slate-400 text-xs md:text-sm font-normal max-w-xl">
                Track booked enrollments, follow up on pending instalments, send WhatsApp payment links, and dispatch offer letters.
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
              <RefreshCw size={14} className={isRefreshing ? "animate-spin text-amber-400" : "text-slate-400"} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>

            <button
              onClick={handleAddNewCandidate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Candidate</span>
            </button>
          </div>
        </div>

        {/* Aggregate Mini KPI Pills */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-slate-400 font-semibold block text-[11px]">Booked Students</span>
            <span className="text-xl font-black text-white mt-0.5 block">{filteredStudents.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-slate-400 font-semibold block text-[11px]">Total Pipeline</span>
            <span className="text-xl font-black text-white mt-0.5 block">{formatINR(totalBookedValue)}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-emerald-400 font-semibold block text-[11px]">Collected So Far</span>
            <span className="text-xl font-black text-emerald-400 mt-0.5 block">{formatINR(totalPaidCollected)}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-amber-400 font-semibold block text-[11px]">Pending Balance</span>
            <span className="text-xl font-black text-amber-400 mt-0.5 block">{formatINR(totalPendingAmount)}</span>
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
            placeholder="Search by name, email, phone, WhatsApp or counselor..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
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
              className="w-full md:w-52 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all cursor-pointer appearance-none"
            >
              <option value="all">All Months ({newStudent.length})</option>
              {months.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs whitespace-nowrap">
            {filteredStudents.length} Records
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
                <th className="py-4 px-4">Financials</th>
                <th className="py-4 px-4">Program & Due Date</th>
                <th className="py-4 px-4">Hierarchy</th>
                <th className="py-4 px-4 text-center">Actions & Links</th>
                <th className="py-4 px-4 text-center">Remark & Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map((date) => (
                  <React.Fragment key={date}>
                    {/* Date Separator Banner */}
                    <tr
                      onClick={() => handleCopyMobileNumbers(date)}
                      className="group cursor-pointer bg-slate-50/70 hover:bg-emerald-50/50 transition-colors border-y border-slate-200/60"
                      title="Click to copy WhatsApp numbers for this date"
                    >
                      <td colSpan={7} className="py-2.5 px-5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span className="flex items-center gap-2 text-emerald-700">
                            <CalendarDays size={14} className="text-emerald-600" />
                            <span>{date}</span>
                            <span className="text-slate-400 font-normal ml-2">
                              ({groupedData[date].length} {groupedData[date].length === 1 ? "student" : "students"})
                            </span>
                          </span>

                          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 group-hover:underline">
                            <Copy size={12} /> Click to Copy Phone Numbers
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Student Rows */}
                    {groupedData[date].map((item, index) => {
                      try {
                        const bdaArr = Array.isArray(bda) ? bda : [];
                        const counselorClean = String(item.counselor || "").trim().toLowerCase();
                        const bdaObj = bdaArr.find(
                          (b) => b && String(b.fullname || "").trim().toLowerCase() === counselorClean
                        );
                        const teamName = bdaObj?.team || "";
                        const managers = bdaArr.filter(
                          (b) => b && b.designation && String(b.designation).toLowerCase() === "manager"
                        );
                        const managerObj = managers.find(
                          (mgr) => Array.isArray(mgr?.teams) && mgr.teams.includes(teamName)
                        );
                        const managerName = managerObj?.fullname || "";

                        const priceNum = Number(item.programPrice) || 0;
                        const paidNum = Number(item.paidAmount) || 0;
                        const dueAmount = Math.max(0, priceNum - paidNum);

                        let lastRemark = "";
                        if (Array.isArray(item.remark) && item.remark.length > 0) {
                          const rawR = item.remark[item.remark.length - 1];
                          lastRemark = typeof rawR === "string" ? rawR : JSON.stringify(rawR);
                        } else if (item.remark && typeof item.remark === "string") {
                          lastRemark = item.remark;
                        }

                        // WhatsApp message builder
                        const opN = String(item.operationName || operationName || "Operations Team");
                        const formattedOpName = opN.length > 0 ? opN.charAt(0).toUpperCase() + opN.slice(1) : "Operations Team";
                        const rawNum = String(item.whatsAppNumber || item.phone || "").replace(/[^0-9]/g, "");
                        const cleanNum = rawNum.length === 10 ? `91${rawNum}` : rawNum;
                        const studentName = String(item.fullname || "Student").trim();
                        const studentInitial = studentName.length > 0 ? studentName.charAt(0).toUpperCase() : "S";

                        const whatsappMessage = `Hello ${studentName},

Greetings from AccenLearn Solutions! 

This is ${formattedOpName} from the Operations Department. We are contacting you regarding your application for the AccenLearn × IBM Nationwide Training & Internship Program.

💳 Pending Amount: ₹${dueAmount}

Kindly complete the pending payment by the end of today using the payment link below:

https://pages.razorpay.com/pl_TRiygaO4jzqd0n/view

Once the payment is completed, please share the payment receipt/screenshot with us. After verification, we will provide you with the class access details.

Thank you for your prompt response.

Regards,
${formattedOpName}
Operations Department
AccenLearn Solutions`;

                        return (
                          <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                            {/* Row Number */}
                            <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                              {indexOfFirstItem + index + 1}
                            </td>

                            {/* Student Info */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs uppercase flex-shrink-0">
                                  {studentInitial}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800 capitalize leading-tight">
                                    {studentName}
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
                                  <span className="font-black text-emerald-600 text-sm">
                                    {formatINR(item.paidAmount)}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    of {formatINR(item.programPrice)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                                    Due: {formatINR(dueAmount)}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Program & Due Date */}
                            <td className="py-3.5 px-4">
                              <div className="space-y-1">
                                <span className="inline-block font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                                  {item.domain || item.program || "Advance Track"}
                                </span>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                  <Clock size={11} className="text-slate-400" />
                                  <span>Due: <strong className="text-slate-700">{item.clearPaymentMonth || "N/A"}</strong></span>
                                </div>
                              </div>
                            </td>

                            {/* Hierarchy */}
                            <td className="py-3.5 px-4">
                              <div className="flex flex-col text-[11px] space-y-0.5">
                                {managerName && (
                                  <span className="font-bold text-slate-700">
                                    {managerName} <span className="text-[10px] text-slate-400 font-normal">(Mgr)</span>
                                  </span>
                                )}
                                {teamName && (
                                  <span className="font-semibold text-slate-500">{teamName}</span>
                                )}
                                {item.counselor && (
                                  <span className="text-slate-400 text-[10px]">BDA: {item.counselor}</span>
                                )}
                              </div>
                            </td>

                            {/* Actions & Tools */}
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* Edit Button */}
                                <button
                                  onClick={() => handleEdit(item._id)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                  title="Edit Candidate Details"
                                >
                                  <Edit3 size={14} />
                                </button>

                                {/* WhatsApp Direct Reminder */}
                                <a
                                  href={`https://web.whatsapp.com/send?phone=${cleanNum}&text=${encodeURIComponent(whatsappMessage)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                                  title="Send WhatsApp Payment Link"
                                >
                                  <FaWhatsapp size={15} />
                                </a>

                                {/* Send Credentials */}
                                <button
                                  onClick={() => handleSendEmail(item)}
                                  className={`p-1.5 rounded-lg transition ${item.mailSended
                                      ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                      : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                                    }`}
                                  title={item.mailSended ? "Credentials Sent (Click to resend)" : "Send Credentials"}
                                >
                                  {item.mailSended ? <PiLockKeyOpenFill size={15} /> : <PiLockKeyFill size={15} />}
                                </button>

                                {/* Create User Account */}
                                <button
                                  onClick={() => createAccount(item)}
                                  className={`p-1.5 rounded-lg transition ${item.userCreated
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                                    }`}
                                  title={item.userCreated ? "User Account Created" : "Create LMS Account"}
                                >
                                  {item.userCreated ? <FaUserCheck size={14} /> : <FaUserTimes size={14} />}
                                </button>

                                {/* Send Offer Letter */}
                                <button
                                  onClick={() => handleOpenOfferLetter(item)}
                                  className={`p-1.5 rounded-lg transition ${item.offerlettersended
                                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                  title={item.offerlettersended ? "Offer Letter Sent (Click to resend)" : "Send Offer Letter"}
                                >
                                  <FileText size={14} />
                                </button>

                                {/* More Info */}
                                <button
                                  onClick={() => handleDialogOpen(item)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                                  title="View Complete Enrollment Details"
                                >
                                  <Info size={14} />
                                </button>
                              </div>
                            </td>

                            {/* Remark & Update */}
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex flex-col items-center gap-1">
                                {lastRemark && (
                                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                    {lastRemark}
                                  </span>
                                )}
                                <select
                                  onChange={(e) => handleRemarkChange(e, item._id)}
                                  defaultValue=""
                                  className="bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                                >
                                  <option value="" disabled>Update</option>
                                  <option value="Cleared">Cleared</option>
                                  <option value="Default">Default</option>
                                  <option value="DNP">DNP</option>
                                  <option value="NATC">NATC</option>
                                  <option value="Interested">Interested</option>
                                  <option value="Call Back">Call Back</option>
                                  <option value="Wrong Number">Wrong Number</option>
                                  <option value="switch off">switch off</option>
                                  <option value="Counsellor said pay before class start">Counsellor said pay before class start</option>
                                </select>
                              </div>
                            </td>
                          </tr>
                        );
                      } catch (rowErr) {
                        console.error("Error rendering student row:", rowErr, item);
                        return null;
                      }
                    })}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    <BookOpen size={36} className="mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-sm">No booked records found for {selectedMonth || "this period"}.</p>
                    <p className="text-xs text-slate-400 mt-1">Try choosing a different month or clearing your search filter.</p>
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
              Showing <span className="font-bold">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-bold">{Math.min(indexOfLastItem, filteredStudents.length)}</span> of{" "}
              <span className="font-bold">{filteredStudents.length}</span> students
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="font-bold px-2">Page {currentPage} of {totalPages}</span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add / Edit Enrollment Modal ── */}
      {iscourseFormVisible && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 relative overflow-y-auto max-h-[90vh] border border-slate-100">
            <button
              onClick={resetForm}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
            >
              <X size={16} />
            </button>

            <div className="mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {editingStudentId ? "Edit Advance Enrollment" : "New Candidate Registration"}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ensure financial figures and payment due dates are verified before submission.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Full Name</label>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  type="text"
                  placeholder="Student Full Name"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="student@gmail.com"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Contact Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="Primary Phone Number"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">WhatsApp Number</label>
                <input
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  type="number"
                  placeholder="WhatsApp Number"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Counselor / BDA</label>
                <input
                  value={counselor}
                  onChange={(e) => setCounselor(e.target.value)}
                  type="text"
                  placeholder="Counselor Name"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Domain / Course</label>
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  type="text"
                  placeholder="e.g. Data Science, MERN"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Program Price (₹)</label>
                <input
                  value={programPrice}
                  onChange={(e) => setProgramPrice(e.target.value)}
                  type="number"
                  placeholder="Total Price"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Paid Amount (₹)</label>
                <input
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  type="number"
                  placeholder="Amount Paid Now"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Remaining Due (₹)</label>
                <input
                  value={remainingAmount}
                  disabled
                  type="number"
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Month Opted</label>
                <select
                  value={monthOpted}
                  onChange={(e) => setMonthOpted(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="" disabled>Select Month</option>
                  {monthOpted && !monthsToShow.some((m) => m.toLowerCase() === monthOpted.toLowerCase()) && (
                    <option value={monthOpted}>{monthOpted}</option>
                  )}
                  {monthsToShow.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Clear Payment Due Date</label>
                <input
                  value={clearPaymentMonth}
                  onChange={(e) => setClearPaymentMonth(e.target.value)}
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Batch Timing</label>
                <select
                  value={batchTiming}
                  onChange={(e) => setBatchTiming(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="">Select Batch Timing</option>
                  <option value="Monday-Friday (8:00 pm - 9:30 pm)">Monday-Friday (8:00 pm - 9:30 pm)</option>
                  <option value="Saturday-Sunday (1 to 2 hours per day)">Saturday-Sunday (1 to 2 hours per day)</option>
                </select>
              </div>

              <div className="col-span-full pt-4 border-t border-slate-100 flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  {editingStudentId ? "Update Student" : "Submit Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Send Offer Letter Modal ── */}
      {offerData && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-6 sm:p-7 relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={resetOfferLeter}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
            >
              <X size={16} />
            </button>

            <div className="mb-5 pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Mail className="text-emerald-600" size={18} />
                Send Offer Letter
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify details before dispatching candidate's official internship offer.
              </p>
            </div>

            <form onSubmit={sendOfferleter} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Candidate Name</label>
                  <input
                    type="text"
                    value={offerFullname}
                    onChange={(e) => setOfferFullname(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Domain / Track</label>
                  <input
                    type="text"
                    value={offerDomain}
                    onChange={(e) => setOfferDomain(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">Candidate Email</label>
                <input
                  type="email"
                  value={offerEmail}
                  onChange={(e) => setOfferEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-600">Letter Date</label>
                    <span
                      onClick={() => setOfferDate(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }))}
                      className="text-[10px] text-emerald-600 cursor-pointer font-bold hover:underline"
                    >
                      Set Today
                    </span>
                  </div>
                  <input
                    type="text"
                    value={offerDate}
                    onChange={(e) => setOfferDate(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={offerDuration}
                    onChange={(e) => setOfferDuration(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-700">Preview Summary:</div>
                <div>Candidate: <strong className="text-slate-800">{offerFullname}</strong> ({offerEmail})</div>
                <div>Role: <strong className="text-slate-800">{offerDomain} Intern</strong></div>
                <div>Duration: <strong className="text-slate-800">{offerDuration}</strong></div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={resetOfferLeter}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isOfferLetterSending}
                  className="flex-[2] py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/30"
                >
                  <Send size={14} />
                  <span>{isOfferLetterSending ? "Dispatching..." : "Send Offer Letter"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Student Details Modal ── */}
      {dialogVisible && dialogData && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative border border-slate-100 max-h-[90vh] overflow-y-auto text-xs">
            <button
              onClick={handleDialogClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
            >
              <X size={16} />
            </button>

            <div className="mb-4 pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Info className="text-emerald-600" size={18} />
                Candidate Full File
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive registration parameters.</p>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Name</span>
                  <span className="font-bold text-slate-800 text-sm capitalize">{dialogData.fullname}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Domain</span>
                  <span className="font-bold text-slate-800">{dialogData.domain || "N/A"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                  <span className="font-semibold text-slate-700 break-all">{dialogData.email || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp / Contact</span>
                  <span className="font-semibold text-slate-700">{dialogData.whatsAppNumber || dialogData.phone || "N/A"}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Price</span>
                  <span className="font-bold text-slate-800">{formatINR(dialogData.programPrice)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Paid</span>
                  <span className="font-bold text-emerald-600">{formatINR(dialogData.paidAmount)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Due</span>
                  <span className="font-bold text-amber-600">
                    {formatINR((dialogData.programPrice || 0) - (dialogData.paidAmount || 0))}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div>Counselor: <strong className="text-slate-700">{dialogData.counselor || "N/A"}</strong></div>
                <div>Clear Month: <strong className="text-slate-700">{dialogData.clearPaymentMonth || "N/A"}</strong></div>
                <div>Month Opted: <strong className="text-slate-700">{dialogData.monthOpted || dialogData.internshipstartsmonth || "N/A"}</strong></div>
                <div>Batch Timing: <strong className="text-slate-700">{dialogData.batchTiming || "N/A"}</strong></div>
                {dialogData.collegeName && <div>College: <strong className="text-slate-700">{dialogData.collegeName}</strong></div>}
                {dialogData.transactionId && <div>Txn ID: <strong className="text-slate-700">{dialogData.transactionId}</strong></div>}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={handleDialogClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedAmount;
