import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { 
  MapPin, History, Fingerprint, Send, CheckCircle2, Clock, UserCheck,
  LogOut, Calendar, Navigation, ShieldCheck, Mail, Lock, ArrowRight,
  User, Activity, ChevronLeft, ChevronRight, Check
} from "lucide-react";
import Logo from "../assets/accenlearn-logo.png";

const StatCard = ({ icon, label, value, color, bgColor, subLabel }) => (
  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 group">
     <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${bgColor} ${color}`}>
            {icon}
        </div>
        {subLabel && <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">{subLabel}</div>}
     </div>
     <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
     <div className={`text-4xl font-black tracking-tight ${color}`}>{value}</div>
  </div>
);

const AuthWrapper = ({ children, title, sub }) => (
  <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center relative overflow-hidden font-sans p-4">
    <div className="absolute top-0 left-0 w-full h-[55vh] bg-indigo-600 rounded-b-[100px] shadow-2xl shadow-indigo-200/50 -z-0 transform -translate-y-10 skew-y-2"></div>
    <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
    
    <div className="w-full max-w-[440px] relative z-10 animate-[fadeIn_0.5s_ease-out] mt-10">
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 shadow-lg shadow-indigo-900/10 hover:-translate-y-1 transition-transform">
           <img src={Logo} alt="Logo" className="h-8 object-contain" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">{title}</h2>
        <p className="text-indigo-100 font-medium text-sm">{sub}</p>
      </div>
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-300">
         {children}
      </div>
    </div>
  </div>
);

const Attendance = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [cameFromEmail, setCameFromEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [history, setHistory] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [onTimeCount, setOnTimeCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [halfDayCount, setHalfDayCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("atdToken");
    const storedUser = localStorage.getItem("atdUser");
    if (token && storedUser) {
        setUserData(JSON.parse(storedUser));
        setStep(5);
        fetchHistory(token, 1, filterMonth, filterYear);
    } else if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email);
      setUserData(user);
      if (user.hasPin) setStep(4);
      else setStep(2);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("atdToken");
    if (token && step === 5) {
      fetchHistory(token, currentPage, filterMonth, filterYear);
    }
  }, [currentPage, filterMonth, filterYear]);

  const fetchHistory = async (token, page, month, year) => {
    try {
      const res = await axios.get(`${API}/api/atd/history`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: 5, month: filterMonth, year: filterYear }
      });
      setHistory(res.data.data);
      setTotalRecords(res.data.total);
      setOnTimeCount(res.data.onTimeCount || 0);
      setLateCount(res.data.lateCount || 0);
      setHalfDayCount(res.data.halfDayCount || 0);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/atd/check-user`, { email });
      setUserData(res.data);
      if (res.data.hasPin) {
        setCameFromEmail(true);
        setStep(4); 
      } else {
        handleSendOtp(); 
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Access Denied");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/api/atd/send-otp`, { email });
      setStep(3); 
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/atd/verify-otp`, { email, otp });
      if (resetMode) {
        localStorage.setItem("atdToken", res.data.token);
        localStorage.setItem("atdUser", JSON.stringify(res.data.user));
        setUserData(res.data.user);
        setStep(6);
        setResetMode(false);
      } else {
        loginSuccess(res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSetFirstPin = async (e) => {
    e.preventDefault();
    if (pin.length < 4) {
      toast.error("PIN must be 4-6 digits");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("atdToken");
      await axios.post(`${API}/api/atd/set-pin`, { pin }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("PIN set successfully!");
      setStep(5);
      fetchHistory(token, 1, filterMonth, filterYear);
    } catch (err) {
      toast.error("Failed to set PIN");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/atd/login-pin`, { email, pin });
      if (res.data.requireOtp) {
          toast.error("Security Check: OTP required weekly");
          handleSendOtp();
          return;
      }
      loginSuccess(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || "Wrong PIN");
    } finally {
      setLoading(false);
    }
  };

  const loginSuccess = (data) => {
    localStorage.setItem("atdToken", data.token);
    localStorage.setItem("atdUser", JSON.stringify(data.user));
    setUserData(data.user);
    if (!data.user.hasPin) {
      setPin("");
      setStep(6);
    } else {
      setStep(5); 
      fetchHistory(data.token, 1, filterMonth, filterYear);
      toast.success("Welcome back!");
    }
  };

  const handleMarkAttendance = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported");
      return;
    }
    setMarking(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const token = localStorage.getItem("atdToken");
        await axios.post(`${API}/api/atd/mark`, { lat: latitude, lng: longitude }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Checked in successfully!");
        fetchHistory(token, currentPage, filterMonth, filterYear);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to mark attendance");
      } finally {
        setMarking(false);
      }
    }, () => {
      toast.error("Enable location to check in.");
      setMarking(false);
    });
  };

  const logout = () => {
    localStorage.removeItem("atdToken");
    localStorage.removeItem("atdUser");
    setStep(1);
    setUserData(null);
    setEmail("");
    setPin("");
    setCurrentPage(1);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="font-sans">
      <Toaster position="top-center" />

      {step === 1 && (
        <AuthWrapper title="Employee Access" sub="Enter your corporate email to access the system.">
          <form onSubmit={handleEmailCheck} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Company Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>
        </AuthWrapper>
      )}

      {step === 2 && (
        <AuthWrapper title={`Hello, ${userData?.name?.split(' ')[0] || "User"}`} sub="Verify your identity using one of the methods below.">
          <div className="space-y-4">
            <button onClick={() => setStep(4)} className="w-full flex items-center gap-4 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-4 rounded-2xl text-left group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Lock size={20} />
              </div>
              <div>
                <div className="text-sm font-black text-slate-800 mb-0.5">Login with PIN</div>
                <div className="text-xs font-semibold text-slate-500">Quick access with your 4-6 digit code</div>
              </div>
            </button>
            <button onClick={handleSendOtp} className="w-full flex items-center gap-4 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-4 rounded-2xl text-left group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Send size={20} />
              </div>
              <div>
                <div className="text-sm font-black text-slate-800 mb-0.5">Use Email OTP</div>
                <div className="text-xs font-semibold text-slate-500">Verification code sent to your inbox</div>
              </div>
            </button>
          </div>
        </AuthWrapper>
      )}

      {step === 3 && (
        <AuthWrapper title="Verify Identity" sub={`We sent a 6-digit code to ${email}`}>
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">One Time Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Fingerprint size={18} />
                </div>
                <input
                  type="text"
                  required
                  maxLength="6"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 font-bold placeholder-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-center tracking-[0.5em] text-lg"
                  placeholder="------"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Verify Code"}
            </button>
            <div className="text-center pt-2">
              <button type="button" onClick={handleSendOtp} className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">Resend verification code</button>
            </div>
          </form>
        </AuthWrapper>
      )}

      {step === 4 && (
        <AuthWrapper title="Enter PIN" sub="Access your secure dashboard.">
          <form onSubmit={handleLoginPin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Security PIN</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input
                  type="password"
                  required
                  maxLength="6"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 font-bold placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-center tracking-[0.5em] text-lg"
                  placeholder="****"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Login to Dashboard"}
            </button>
            <div className="flex justify-between items-center pt-2 px-1">
               <button type="button" onClick={() => { if (cameFromEmail) { setStep(1); setCameFromEmail(false); } else { setStep(2); } }} className="text-sm font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1"><ChevronLeft size={16}/> Back</button>
               <button type="button" onClick={() => { setResetMode(true); handleSendOtp(); }} className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Forgot PIN?</button>
            </div>
          </form>
        </AuthWrapper>
      )}

      {step === 6 && (
        <AuthWrapper title="Create Secret PIN" sub="Set a quick access PIN for your next login.">
          <form onSubmit={handleSetFirstPin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">New PIN</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  maxLength="6"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 font-bold placeholder-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-center tracking-[0.5em] text-lg"
                  placeholder="****"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Confirm & Finish"}
            </button>
          </form>
        </AuthWrapper>
      )}

      {step === 5 && (
        <div className="min-h-screen bg-[#f8fafc]">
          <header className="h-[72px] bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100">
                <Navigation size={20} className="text-indigo-600" />
              </div>
              <h1 className="text-lg font-black tracking-tight text-slate-800 hidden sm:block">Attendance <span className="text-indigo-600">Portal</span></h1>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="flex items-baseline gap-1 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                  <Clock size={16} className="text-slate-400 mr-1" />
                  <span className="text-lg font-black text-slate-700">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="text-xs font-bold text-indigo-600 hidden sm:block">{currentTime.toLocaleTimeString([], { second: '2-digit' })}</span>
               </div>
               <button onClick={logout} className="flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 px-4 py-2.5 rounded-xl font-bold transition-colors text-sm">
                 <LogOut size={16} /> <span className="hidden sm:block">Logout</span>
               </button>
            </div>
          </header>

          <main className="max-w-[1200px] mx-auto p-6 md:p-8">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                   <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
                     Welcome, <span className="text-indigo-600">{(userData?.name && userData.name !== "Unknown") ? userData.name.split(' ')[0] : "Member"}</span>
                   </h2>
                   <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
                     <Calendar size={16} className="text-indigo-500" />
                     {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                   </div>
                </div>
                
                <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                   <div className={`w-2.5 h-2.5 rounded-full ${history.some(h => h.date === new Date().toISOString().split("T")[0]) ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"}`} />
                   <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Real-time Sync Active</span>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Actions & Stats */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                   <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-[0.03] pointer-events-none">
                         <Fingerprint size={250} />
                      </div>

                      <div className="flex justify-between items-start mb-8 relative z-10">
                         <div>
                            <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase mb-1">Presence Verification</h3>
                            <div className="text-2xl font-black text-slate-800">
                               {history.some(h => h.date === new Date().toISOString().split("T")[0]) ? "Check-in Confirmed" : "Awaiting Check-in"}
                            </div>
                         </div>
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${history.some(h => h.date === new Date().toISOString().split("T")[0]) ? "bg-emerald-50 text-emerald-500" : "bg-indigo-50 text-indigo-500"}`}>
                            {history.some(h => h.date === new Date().toISOString().split("T")[0]) ? <UserCheck size={28} /> : <MapPin size={28} />}
                         </div>
                      </div>

                      <p className="text-slate-500 font-medium mb-8 leading-relaxed max-w-lg relative z-10">
                        Our system uses high-precision geolocation. Please ensure you are within the designated office boundary to complete verification successfully.
                      </p>

                      <button 
                        onClick={handleMarkAttendance} 
                        disabled={marking || history.some(h => h.date === new Date().toISOString().split("T")[0])} 
                        className={`w-full h-16 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 transition-all relative z-10 ${
                           history.some(h => h.date === new Date().toISOString().split("T")[0]) 
                           ? "bg-emerald-500 shadow-lg shadow-emerald-200 cursor-not-allowed opacity-90" 
                           : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:-translate-y-1"
                        } ${(!marking && !history.some(h => h.date === new Date().toISOString().split("T")[0])) ? "animate-[pulse_2s_ease-in-out_infinite]" : ""}`}
                      >
                         {marking ? <><Activity className="animate-spin" size={24} /> Processing Location...</> : 
                          history.some(h => h.date === new Date().toISOString().split("T")[0]) ? <><CheckCircle2 size={24} /> Verified Today</> : 
                          <><Navigation size={22} /> Confirm Attendance</>}
                      </button>
                   </div>

                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatCard icon={<Fingerprint size={24} />} label="Logins" value={totalRecords} color="text-slate-700" bgColor="bg-slate-100" subLabel={`${monthNames[filterMonth].slice(0,3)} '${filterYear.toString().slice(-2)}`} />
                      <StatCard icon={<UserCheck size={24} />} label="On Time" value={onTimeCount} color="text-emerald-600" bgColor="bg-emerald-50" />
                      <StatCard icon={<Clock size={24} />} label="Late" value={lateCount} color="text-amber-500" bgColor="bg-amber-50" />
                      <StatCard icon={<Clock size={24} />} label="Half Day" value={halfDayCount} color="text-rose-500" bgColor="bg-rose-50" />
                   </div>
                   
                   <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
                      <ShieldCheck size={20} className="text-slate-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                         <strong className="text-slate-800">Policy:</strong> Logins before <strong>11:05 AM</strong> are "Full Present". After <strong>2:00 PM</strong> counts as "Half Day".
                      </p>
                   </div>
                </div>

                {/* Right Column: Log */}
                <div className="lg:col-span-5">
                   <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                               <History size={18} />
                            </div>
                            <h3 className="text-base font-black text-slate-800">Activity Log</h3>
                         </div>
                         
                         <div className="flex items-center gap-2">
                           <select 
                              value={filterMonth} 
                              onChange={(e) => { setFilterMonth(e.target.value); setCurrentPage(1); }} 
                              className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:border-indigo-500 cursor-pointer shadow-sm"
                           >
                              {monthNames.map((name, i) => (<option key={i} value={i}>{name.slice(0, 3)}</option>))}
                           </select>
                           <select 
                              value={filterYear} 
                              onChange={(e) => { setFilterYear(e.target.value); setCurrentPage(1); }} 
                              className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:border-indigo-500 cursor-pointer shadow-sm"
                           >
                              {[2024, 2025, 2026].map(year => (<option key={year} value={year}>{year}</option>))}
                           </select>
                         </div>
                      </div>

                      <div className="p-6 flex-1">
                         {history.length === 0 ? (
                           <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                              <History size={48} className="opacity-20 mb-4" />
                              <p className="font-bold text-sm">No activity recorded yet.</p>
                           </div>
                         ) : (
                           <div className="space-y-4">
                              {history.map((h, i) => {
                                const isHalf = h.isHalfDay || (h.timestamp && new Date(h.timestamp).getHours() >= 14);
                                const isLate = !isHalf && (h.isLate || (h.timestamp && (new Date(h.timestamp).getHours() > 11 || (new Date(h.timestamp).getHours() === 11 && new Date(h.timestamp).getMinutes() > 5))));
                                const statusColor = isHalf ? "text-rose-600 bg-rose-50 border-rose-100" : isLate ? "text-amber-600 bg-amber-50 border-amber-100" : "text-emerald-600 bg-emerald-50 border-emerald-100";
                                const statusText = isHalf ? "HALF DAY" : isLate ? "LATE" : "ON TIME";
                                
                                return (
                                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all bg-white group">
                                    <div className="flex gap-4 items-center">
                                       <div className="w-12 h-14 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center">
                                          <span className="text-lg font-black text-slate-800 leading-none">{new Date(h.date).getDate()}</span>
                                          <span className="text-[10px] font-bold text-indigo-600 uppercase mt-1">{new Date(h.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                       </div>
                                       <div>
                                          <div className="text-sm font-bold text-slate-800 mb-1">{new Date(h.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                                          <div className="flex items-center gap-2">
                                             <span className="text-xs font-semibold text-slate-400">Verified</span>
                                             <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                             <span className={`text-[10px] font-black tracking-widest px-1.5 py-0.5 rounded border ${statusColor}`}>{statusText}</span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                                       {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                 </div>
                               )
                              })}

                              {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-slate-100">
                                   <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"><ChevronLeft size={18} /></button>
                                   <span className="text-sm font-bold text-slate-600">Page {currentPage} of {totalPages}</span>
                                   <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"><ChevronRight size={18} /></button>
                                </div>
                              )}
                           </div>
                         )}
                      </div>
                   </div>
                </div>
             </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Attendance;
