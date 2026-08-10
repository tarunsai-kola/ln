import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import checkAdminAuth from "../checkAdminAuth";
import toast, { Toaster } from 'react-hot-toast';
import { Mail, KeyRound, ShieldCheck, ArrowRight, Lock, ShieldAlert } from 'lucide-react';

const AdminLogIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); 
  const [isTimerActive, setIsTimerActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!localStorage.getItem("adminToken")) return;
      
      const isAdmin = await checkAdminAuth();
      if (isAdmin) {
        navigate("/AdminDashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    try {
      await axios.post(`${API}/otpsend`, { email });
      setIsOtpSent(true);
      setTimeLeft(120);
      setIsTimerActive(true);
      toast.success("OTP sent to your email!");
    }
    catch (err) {
      console.error("OTP error:", err.response?.data || err.message);
      const msg = err.response?.data?.message || "Failed to send OTP. Try again.";
      toast.error(msg);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("OTP is required");
      return;
    }
    try {
      const response = await axios.post(`${API}/otpverify`, { email, otp });
      if(response.status === 200){
        toast.success('Login successful!!!');
        setTimeout(() => {
           localStorage.setItem("adminToken", response.data.token);
           localStorage.setItem("adminId", response.data.adminId);
           localStorage.setItem("adminName", response.data.adminName);
           navigate("/AdminDashboard");
        }, 1500);
      }
    } catch (err) {
      toast.error("Failed to verify OTP or Invalid OTP");
    }
  };

  const handleResendOtp = () => {
    handleSendOtp();
    setOtp(""); 
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-slate-900 rounded-b-[100px] shadow-2xl shadow-slate-900/20 -z-0 transform -translate-y-10 skew-y-2"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="w-full max-w-[440px] relative z-10 animate-[fadeIn_0.5s_ease-out] mt-10">
        
        {/* Header Section */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 text-slate-800 shadow-lg shadow-slate-900/10">
            <ShieldCheck size={40} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Admin Portal</h1>
          <p className="text-slate-300 font-medium text-sm">Secure access for Accenlearn administrators</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 relative overflow-hidden transition-all duration-300">
          
          <div className="space-y-6 relative z-10">
            
            {/* Email Input */}
            <div className={`space-y-2 transition-all duration-500 ${isOtpSent ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isOtpSent}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all sm:text-sm disabled:bg-slate-100 disabled:text-slate-500"
                  placeholder="admin@Accenlearn.in"
                />
              </div>
            </div>

            {/* OTP Input (Fades in if OTP sent) */}
            {isOtpSent && (
              <div className="space-y-2 animate-[fadeIn_0.5s_ease-out]">
                <div className="flex justify-between items-center ml-1 mb-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Security Code
                  </label>
                  <span className={`text-xs font-bold ${timeLeft <= 30 ? 'text-rose-500 animate-pulse' : 'text-indigo-600'}`}>
                    0{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 font-bold placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-center tracking-[0.5em] text-lg"
                    placeholder="------"
                    maxLength={6}
                  />
                </div>
                
                {/* Resend OTP */}
                {timeLeft === 0 && (
                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={handleResendOtp}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
                    >
                      Resend OTP Code
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4 border-b border-slate-100 pb-8">
              <button
                onClick={isOtpSent ? handleVerifyOtp : handleSendOtp}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group"
              >
                {isOtpSent ? (
                  <>
                    <Lock size={18} className="group-hover:scale-110 transition-transform" /> Secure Login
                  </>
                ) : (
                  <>
                    Send OTP <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">
              <ShieldAlert size={14} className="text-slate-400" />
              Protected by Accenlearn Gateway
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogIn;
