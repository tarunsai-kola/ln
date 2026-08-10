import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { 
  Search, Plus, Info, Send, X, Mail, Lock, Unlock, 
  UserX, UserCheck, BookOpen, ChevronRight, CalendarDays
} from "lucide-react";

const AdvBookedPayment = () => {
  /* ── State ── */
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [course, setCourse] = useState([]);
  const [offerData, setOfferData] = useState(null);
  const [offerDate, setOfferDate] = useState("");
  const [offerDuration, setOfferDuration] = useState("");
  const [offerStart, setOfferStart] = useState("");
  const [offerEnd, setOfferEnd] = useState("");
  const [offerLocation, setOfferLocation] = useState("Online");
  const [isOfferLetterSending, setIsOfferLetterSending] = useState(false);
  const [advTeam, setAdvTeam] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [counselor, setCounselor] = useState("");
  const [domain, setDomain] = useState("");
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [monthsToShow, setMonthsToShow] = useState([]);
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [advEnrolls, setAdvEnrolls] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [operationData, setOperationData] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  /* ── Helpers ── */
  const resetForm = () => {
    setiscourseFormVisible(false);
    setFullname(""); setEmail(""); setPhone(""); setProgram(""); setCounselor(""); setDomain("");
    setProgramPrice(""); setPaidAmount(""); setMonthOpted(""); setClearPaymentMonth(""); setEditingStudentId(null);
  };
  
  const resetOfferLeter = () => { 
    setOfferData(null); setOfferDate(""); setOfferDuration(""); setOfferStart(""); setOfferEnd(""); setOfferLocation("Online"); 
  };
  
  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");
  
  const getCurrentMonth = () => { 
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"]; 
    const d = new Date(); return `${m[d.getMonth()]} ${d.getFullYear()}`; 
  };
  
  const getPastMonths = () => { 
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"]; 
    const d = new Date(); const ci = d.getMonth(); const cy = d.getFullYear(); 
    return Array.from({length:4},(_,i)=>{ 
      const td=new Date(cy,ci-i,1); return `${m[td.getMonth()]} ${td.getFullYear()}`; 
    }); 
  };
  
  const getMonthFromDate = (date) => { 
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"]; 
    const d = new Date(date); return `${m[d.getMonth()]} ${d.getFullYear()}`; 
  };

  /* ── Fetch ── */
  const fetchCourses = async () => { try { const r = await axios.get(`${API}/getadvcourses`); setCourse(r.data); } catch(e){} };
  const fetchAdvTeam = async () => { try { const r = await axios.get(`${API}/getadvteam`); setAdvTeam(r.data); } catch(e){} };
  const fetchOperationData = async () => { const operationId = localStorage.getItem("advOperationId"); try { const r = await axios.get(`${API}/getadvoperation`,{params:{operationId}}); setOperationData(r.data[0] || r.data); } catch(e){} };

  const fetchAdvEnrolls = async () => {
    const operationName = localStorage.getItem("advOperationName");
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      const dataArray = response.data.data || response.data;
      const bookedStudents = dataArray.filter(i => i.status === "booked" && i.operationName === operationName);
      setAdvEnrolls(bookedStudents);
      const currentMonth = getCurrentMonth();
      setSelectedMonth(currentMonth);
      setFilteredStudents(bookedStudents.filter(s => getMonthFromDate(s.createdAt) === currentMonth));
    } catch(e) { console.error(e); }
  };

  useEffect(() => {
    fetchCourses(); fetchAdvTeam(); fetchAdvEnrolls(); fetchOperationData();
    setMonths(getPastMonths());
  }, []);

  useEffect(() => {
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);
    setMaxDate(new Date(today.setDate(today.getDate()+5)).toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    setMonthsToShow(["January","February","March","April","May","June","July","August","September","October","November","December"]);
  }, []);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedMonth, advEnrolls]);

  /* ── Handlers ── */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { 
        fullname, email:email.trim(), phone, program, counselor:counselor.trim(), 
        domain:domain.trim(), programPrice, paidAmount, monthOpted, clearPaymentMonth, 
        operationName: operationData?.fullname, operationId: operationData?._id 
    };
    try {
      let r = editingStudentId ? await axios.put(`${API}/editadvenroll/${editingStudentId}`,formData) : await axios.post(`${API}/advenroll`,formData);
      if (r.status===200||r.status===201) { toast.success(editingStudentId?"Student updated.":"Submitted."); fetchAdvEnrolls(); resetForm(); }
      else toast.error("Error submitting.");
    } catch { toast.error("Error or student already exists."); }
  };

  const handleRemarkChange = async (e, studentId) => {
    const sel = e.target.value;
    setRemarks(sel);
    if (sel && studentId) {
      try {
        const r = await axios.post(`${API}/updateadvenrollremark`,{remark:sel,studentId});
        if(r.status===200) toast.success(r.data.message); else toast.error(r.data.error);
      } catch { toast.error("Error updating remark."); }
    }
  };

  const handleEdit = (studentId) => {
    if(!window.confirm("Edit this?")) return;
    const s = advEnrolls.find(i=>i._id===studentId);
    setFullname(s.fullname); setEmail(s.email); setPhone(s.phone); setWhatsAppNumber(s.whatsAppNumber);
    setProgram(s.program); setCounselor(s.counselor); setDomain(s.domain); setProgramPrice(s.programPrice);
    setPaidAmount(s.paidAmount); setMonthOpted(s.monthOpted); setClearPaymentMonth(s.clearPaymentMonth);
    setEditingStudentId(studentId); setiscourseFormVisible(true);
  };

  const handleSendEmail = async (value) => {
    if(value.isSending) return; value.isSending=true;
    const emailData = { fullname:value.fullname,email:value.email,phone:value.phone,program:value.program,counselor:value.counselor,domain:value.domain,clearPaymentMonth:value.clearPaymentMonth,monthOpted:value.monthOpted };
    try {
      const r = await axios.post(`${API}/send-email`,emailData);
      if(r.status===200){
        toast.success("Email sent!"); 
        const upd = await axios.put(`${API}/advmailsendedchange/${value._id}`,{mailSended:true});
        if(upd.status===200){ toast.success("Record updated!"); const upFn=(p)=>p.map(s=>s._id===value._id?{...s,mailSended:true}:s); setAdvEnrolls(upFn); setFilteredStudents(upFn); }
        else toast.error("Failed to update.");
      } else toast.error("Failed to send email.");
    } catch { toast.error("Error sending email."); } finally { value.isSending=false; }
  };

  const handleDialogOpen = (item) => { setDialogData(item); setDialogVisible(true); };
  const handleDialogClose = () => { setDialogVisible(false); setDialogData(null); };

  const handleSearchChange = (e) => {
    const v = e.target.value; setSearchQuery(v);
    setFilteredStudents(advEnrolls.filter(s=>(s.email&&s.email.toLowerCase().includes(v.toLowerCase()))||(s.phone&&s.phone.toLowerCase().includes(v.toLowerCase()))||(s.fullname&&s.fullname.toLowerCase().includes(v.toLowerCase()))||(s.counselor&&s.counselor.toLowerCase().includes(v.toLowerCase()))||(s.operationName&&s.operationName.toLowerCase().includes(v.toLowerCase()))||(s.createdAt&&s.createdAt.toLowerCase().includes(v.toLowerCase()))||(s.clearPaymentMonth&&s.clearPaymentMonth.toLowerCase().includes(v.toLowerCase()))||(s.collegeName&&s.collegeName.toLowerCase().includes(v.toLowerCase()))||(s.branch&&s.branch.toLowerCase().includes(v.toLowerCase()))));
  };

  const handleAddNewCandidate = () => { resetForm(); setEditingStudentId(null); setiscourseFormVisible(true); };

  const handleSendOnboardingDetails = async (value) => {
    if(!window.confirm("Send onboarding email?")) return;
    const emailData = {fullname:value.fullname,email:value.email,program:value.program,domain:value.domain,clearPaymentMonth:value.clearPaymentMonth,monthOpted:value.monthOpted};
    try {
      const r = await axios.post(`${API}/sendedOnboardingMail`,emailData);
      if(r.status===200){
        toast.success("Onboarding email sent!");
        const upd = await axios.put(`${API}/advmailsendedchange/${value._id}`,{onboardingSended:true});
        if(upd.status===200){ toast.success("Record updated!"); const upFn=(p)=>p.map(s=>s._id===value._id?{...s,onboardingSended:true}:s); setAdvEnrolls(upFn); setFilteredStudents(upFn); }
        else toast.error("Failed to update.");
      } else toast.error("Failed to send onboarding email.");
    } catch { toast.error("Error."); }
  };

  const handleCopyMobileNumbers = (selectedDate) => {
    const students = groupedData[selectedDate];
    if(Array.isArray(students)){ navigator.clipboard.writeText(students.map(s=>s.whatsAppNumber).join("\n")).then(()=>toast.success("Numbers copied!")).catch(e=>toast.error("Failed: "+e)); }
    else alert("No students found.");
  };

  const createAccount = async (value) => {
    if(value.isSending) return; value.isSending=true;
    try {
      const r = await axios.post(`${API}/users`,{fullname:value.fullname.trim(),email:value.email.trim(),phone:value.phone});
      if(r.status===200){
        toast.success("User created!");
        const upd = await axios.put(`${API}/advmailsendedchange/${value._id}`,{userCreated:true});
        if(upd.status===200){ toast.success("Record updated!"); const upFn=(p)=>p.map(s=>s._id===value._id?{...s,userCreated:true}:s); setAdvEnrolls(upFn); setFilteredStudents(upFn); }
        else toast.error("Failed to update.");
      } else toast.error("Failed to create user.");
    } catch { toast.success("User already created — check active users."); } finally { value.isSending=false; }
  };

  const handleMonthChange = (e) => {
    const m = e.target.value; setSelectedMonth(m);
    setFilteredStudents(advEnrolls.filter(s=>getMonthFromDate(s.createdAt)===m));
  };

  const sendOfferleter = async (e) => {
    e.preventDefault(); setIsOfferLetterSending(true);
    const offerLetterDetails = { id:offerData._id, fullname:offerData.fullname.split(" ").map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(" "), domain:offerData.domain, email:offerData.email, date:new Date(offerDate).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"}), duration:offerDuration, start:new Date(offerStart).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"}), end:new Date(offerEnd).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"}), location:offerLocation, smtpConfig:'SMTP_MAIL2' };
    try { await axios.post(`${API}/sendofferletter`,offerLetterDetails); toast.success("Offer letter sent!"); fetchAdvEnrolls(); resetOfferLeter(); }
    catch(e){ console.error(e); }
    finally { setIsOfferLetterSending(false); }
  };

  /* ── Pagination & grouping ── */
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const nextPage = () => { if(currentPage<totalPages) setCurrentPage(p=>p+1); };
  const prevPage = () => { if(currentPage>1) setCurrentPage(p=>p-1); };

  const groupedData = currentItems.reduce((acc,item)=>{ 
      const d=formatDate(item.createdAt); 
      if(!acc[d]) acc[d]=[]; 
      acc[d].push(item); 
      return acc; 
  },{});

  /* ── RENDER ── */
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10">
      <Toaster position="top-center" />

      {/* ── Offer Letter Modal ── */}
      {offerData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div onClick={resetOfferLeter} className="absolute inset-0" />
          <div className="bg-white relative z-[1001] w-full max-w-md rounded-3xl shadow-2xl p-8 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  <Send className="text-indigo-600" /> Send Offer Letter
              </h2>
              <button onClick={resetOfferLeter} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6">
              <p className="text-sm text-slate-600 mb-1">Name: <strong className="text-indigo-900">{offerData?.fullname}</strong></p>
              <p className="text-sm text-slate-600 mb-1">Domain: <strong className="text-indigo-900">{offerData?.domain}</strong></p>
              <p className="text-sm text-slate-600">Email: <strong className="text-indigo-900">{offerData?.email}</strong></p>
            </div>
            
            <form onSubmit={sendOfferleter} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Offer Letter Date</label>
                <input type="date" value={offerDate} onChange={e=>setOfferDate(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Internship Duration</label>
                <select value={offerDuration} onChange={e=>setOfferDuration(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                  <option value="">Select Duration</option>
                  {["One","Two","Three","Four","Five","Six"].map(v=><option key={v} value={v}>{v} Months</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Start Date</label>
                    <input type="date" value={offerStart} onChange={e=>setOfferStart(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">End Date</label>
                    <input type="date" value={offerEnd} onChange={e=>setOfferEnd(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"/>
                  </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Reporting Location</label>
                <select value={offerLocation} onChange={e=>setOfferLocation(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                  <option value="Online">Online</option><option value="Offline">Offline</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={resetOfferLeter} className="flex-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl py-3 font-bold transition-all shadow-sm">Cancel</button>
                <button type="submit" disabled={isOfferLetterSending} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-bold transition-all shadow-sm flex justify-center items-center gap-2">
                    {isOfferLetterSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Send size={18}/> Send Letter</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Enrollment Form Modal ── */}
      {iscourseFormVisible && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div onClick={resetForm} className="absolute inset-0" />
          <div className="bg-white relative z-[1001] w-full max-w-lg rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto custom-scrollbar animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  <BookOpen className="text-indigo-600" /> {editingStudentId?"Edit Enrollment":"Add New Enrollment"}
              </h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {[{ph:"Candidate Full Name",val:fullname,set:setFullname,type:"text"},{ph:"Candidate Email",val:email,set:setEmail,type:"text"},{ph:"Contact No",val:phone,set:setPhone,type:"number"},{ph:"WhatsApp No",val:whatsAppNumber,set:setWhatsAppNumber,type:"number"}].map(({ph,val,set,type})=>(
                <div key={ph}>
                    <input value={val} onChange={e=>set(e.target.value)} type={type} placeholder={ph} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"/>
                </div>
              ))}
              
              <div className="grid grid-cols-2 gap-4">
                  <select value={program} onChange={e=>setProgram(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                    <option value="" disabled>Mode of Program</option>
                    {["Self-guided","Instructor Led","Career Advancement"].map(v=><option key={v} value={v}>{v}</option>)}
                  </select>
                  <select disabled={editingStudentId!==null} value={counselor} onChange={e=>setCounselor(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer disabled:opacity-50">
                    <option value="" disabled>Select Counselor</option>
                    {advTeam.map(i=><option key={i._id} value={i.fullname}>{i.fullname}</option>)}
                  </select>
              </div>

              <select value={domain} onChange={e=>setDomain(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                <option value="" disabled>Select Domain</option>
                {course.map(i=><option key={i._id} value={i.title}>{i.title}</option>)}
              </select>

              <select value={monthOpted} onChange={e=>setMonthOpted(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                <option value="" disabled>Select Month Opted</option>
                {monthsToShow.map((m,i)=><option key={i} value={m}>{m}</option>)}
              </select>

              <div className="grid grid-cols-2 gap-4">
                  <input value={programPrice} onChange={e=>setProgramPrice(e.target.value)} type="number" placeholder="Program Price" required disabled={editingStudentId!==null} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"/>
                  <input value={paidAmount} onChange={e=>setPaidAmount(e.target.value)} type="number" placeholder="Paid Amount" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Next Instalment Date</label>
                <input value={clearPaymentMonth} onChange={e=>setClearPaymentMonth(e.target.value)} type="date" min={minDate} max={maxDate} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"/>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3.5 font-black tracking-wide transition-all shadow-md shadow-indigo-200">
                      {editingStudentId?"Save Changes":"Submit Enrollment"}
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="bg-indigo-600 rounded-3xl p-8 mb-8 shadow-lg shadow-indigo-200/50 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
          <BookOpen size={250} />
        </div>
        
        <div className="relative z-10 mb-6 md:mb-0">
          <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
            Booked Payments Operations
          </h1>
          <p className="text-indigo-100 font-medium max-w-xl">
            Advance Program — Manage enrolled students with pending full payments, track follow-ups, and send credentials.
          </p>
        </div>
        
        <div className="relative z-10">
            <button onClick={handleAddNewCandidate} className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2">
            <Plus size={20}/> Add Enrollment
            </button>
        </div>
      </div>

      {/* ── Filters bar ── */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center animate-[fadeIn_0.3s_ease-out]">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search by name, email, phone…" value={searchQuery} onChange={handleSearchChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>
        
        {/* Month filter */}
        <div className="relative w-full md:w-auto">
            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select value={selectedMonth} onChange={handleMonthChange} className="w-full md:w-48 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all cursor-pointer appearance-none">
            {months.map((m,i)=><option key={i} value={m}>{m}</option>)}
            </select>
        </div>

        {/* Count badge */}
        <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-5 py-3 rounded-xl font-black text-sm whitespace-nowrap w-full md:w-auto text-center">
          {filteredStudents.length} Records found
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-[fadeIn_0.4s_ease-out]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Sl","Student Details","Financials","Dates","Hierarchy","Actions","Comms","Remark & Update"].map((h, i) => (
                  <th key={i} className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map(date => (
                  <React.Fragment key={date}>
                    {/* Date separator row */}
                    <tr onClick={()=>handleCopyMobileNumbers(date)} className="group cursor-pointer hover:bg-indigo-50/50 transition-colors">
                      <td colSpan={8} className="px-6 py-3 bg-slate-50/50 border-l-4 border-l-indigo-500 text-indigo-700 font-bold text-xs uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={14}/> {date} 
                            <span className="text-slate-400 font-medium normal-case ml-2 opacity-0 group-hover:opacity-100 transition-opacity">— Click to copy WhatsApp numbers</span>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Student rows */}
                    {groupedData[date].map((item, index) => {
                      const advTeamObj = advTeam.find(b=>b.fullname===item.counselor);
                      const teamName = advTeamObj?.team||'';
                      const managers = advTeam.filter(b=>b.designation&&b.designation.toLowerCase()==='manager');
                      const managerObj = managers.find(mgr=>Array.isArray(mgr.teams)&&mgr.teams.includes(teamName));
                      const managerName = managerObj?.fullname||'';
                      const lastRemark = item.remark&&item.remark[item.remark.length-1];

                      // row color based on remark
                      let rowClass = "hover:bg-slate-50 transition-colors ";
                      if(lastRemark==="Cleared") rowClass += "bg-emerald-50/30";
                      else if(lastRemark==="Default") rowClass += "bg-rose-50/30";
                      else if(lastRemark==="DNP"||lastRemark==="NATC") rowClass += "bg-amber-50/30";

                      return (
                        <tr key={item._id} className={rowClass}>
                          <td className="px-6 py-4 text-xs font-bold text-slate-400 text-center">{index+1}</td>
                          
                          {/* Student Details */}
                          <td className="px-6 py-4">
                              <div className="flex flex-col">
                                  <span className="font-bold text-slate-800 capitalize">{item.fullname}</span>
                                  <span className="text-xs font-semibold text-slate-500">{item.whatsAppNumber || item.phone}</span>
                              </div>
                          </td>
                          
                          {/* Financials */}
                          <td className="px-6 py-4">
                              <div className="flex flex-col gap-1 text-sm">
                                  <span className="font-bold text-slate-800">₹{Number(item.programPrice).toLocaleString()} <span className="text-[10px] text-slate-400 uppercase">Total</span></span>
                                  <span className="font-bold text-emerald-600">₹{Number(item.paidAmount).toLocaleString()} <span className="text-[10px] text-emerald-400 uppercase">Paid</span></span>
                                  <span className="font-black text-amber-500">₹{(item.programPrice-item.paidAmount).toLocaleString()} <span className="text-[10px] text-amber-400 uppercase">Due</span></span>
                              </div>
                          </td>
                          
                          {/* Dates */}
                          <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                  <span className="inline-block bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded text-xs capitalize text-center border border-slate-200">{item.monthOpted}</span>
                                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1"><CalendarDays size={12}/> Due: {item.clearPaymentMonth || 'N/A'}</span>
                              </div>
                          </td>
                          
                          {/* Hierarchy */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-700 text-xs">{managerName || 'No Manager'} <span className="text-slate-400 font-semibold">(Mgr)</span></span>
                              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{teamName || 'No Team'}</span>
                            </div>
                          </td>
                          
                          {/* Actions */}
                          <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button onClick={()=>handleEdit(item._id)} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors">Edit</button>
                                <button onClick={()=>handleDialogOpen(item)} className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg p-1.5 transition-colors" title="Info">
                                    <Info size={16} />
                                </button>
                              </div>
                          </td>
                          
                          {/* Comms (Credentials, User, Onboarding, Offer) */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                                {/* Credentials */}
                                <button onClick={!item.mailSended?()=>handleSendEmail(item):null} className={`p-1.5 rounded-lg border ${item.mailSended ? 'bg-emerald-50 border-emerald-200 text-emerald-600 cursor-default' : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 transition-colors'}`} title="Credentials Email">
                                    {item.mailSended ? <Unlock size={16}/> : <Lock size={16}/>}
                                </button>
                                
                                {/* Create User */}
                                <button onClick={()=>createAccount(item)} className={`p-1.5 rounded-lg border ${item.userCreated ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 transition-colors'}`} title="Create User Account">
                                    {item.userCreated ? <UserCheck size={16}/> : <UserX size={16}/>}
                                </button>

                                {/* Onboarding */}
                                <button onClick={()=>handleSendOnboardingDetails(item)} className={`p-1.5 rounded-lg border ${item.onboardingSended ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors'}`} title="Send Onboarding">
                                    <Mail size={16}/>
                                </button>

                                {/* Offer Letter */}
                                <button onClick={()=>setOfferData(item)} className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-bold ${item.offerlettersended ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100 transition-colors'}`} title="Offer Letter">
                                    <Send size={14}/> {item.offerlettersended ? 'Sent' : 'Send'}
                                </button>
                            </div>
                          </td>
                          
                          {/* Remark & Update */}
                          <td className="px-6 py-4">
                              <div className="flex flex-col gap-2">
                                <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border text-center ${lastRemark==="Cleared"?"bg-emerald-50 text-emerald-700 border-emerald-200":lastRemark==="Default"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200"}`}>
                                    {lastRemark||"None"}
                                </span>
                                <select onChange={e=>handleRemarkChange(e,item._id)} defaultValue="Select Remark"
                                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-600 outline-none focus:border-indigo-500 cursor-pointer">
                                  <option disabled value="Select Remark">Select Remark</option>
                                  {["Reminder Issued","DNP","NATC","Not Interested","Cut Call","Default","Cleared","Half_Cleared","Switch Off","Call Back later","Busy","Declined","Need More Time","Reviews are not good","When Batch Starts","No response","False pitch so not intrested","Offer letter issues","Counselor Told To Pay Before Class Start"].map(r=>(
                                    <option key={r} value={r}>{r}</option>
                                  ))}
                                </select>
                              </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                    <td colSpan={8} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="text-slate-300 w-10 h-10" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 mb-1">No Records Found</h3>
                            <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
                        </div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredStudents.length > itemsPerPage && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
            <span className="text-sm font-bold text-slate-500">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
                <button onClick={prevPage} disabled={currentPage===1} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm">Previous</button>
                <button onClick={nextPage} disabled={currentPage===totalPages} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Details Dialog ── */}
      {dialogVisible && dialogData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div onClick={handleDialogClose} className="absolute inset-0" />
          <div className="bg-white relative z-[1001] w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Info className="text-indigo-600" /> Student Info
              </h2>
              <button onClick={handleDialogClose} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="space-y-3">
              {[
                ["Email",dialogData.email],
                ["Phone",dialogData.phone],
                ["Program",dialogData.program],
                ["Domain Opted",dialogData.domain],
                ["Counselor",dialogData.counselor],
                ["College Name",dialogData.collegeName],
                ["Branch",dialogData.branch],
                ["Aadhar No",dialogData.aadharNumber],
                ["Next Instalment",dialogData.clearPaymentMonth||"N/A"]
              ].map(([k,v])=>(
                <div key={k} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{k}</span>
                  <span className="text-sm font-black text-slate-800 text-right max-w-[60%] truncate" title={v}>{v || '—'}</span>
                </div>
              ))}
            </div>
            
            <button onClick={handleDialogClose} className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 font-bold transition-all shadow-md">
                Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvBookedPayment;
