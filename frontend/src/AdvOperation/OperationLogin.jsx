import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { Mail, KeyRound, ArrowRight, ShieldCheck, Shield, ArrowLeft } from 'lucide-react';

const OperationLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API}/advoperationsendotp`, { email });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success('OTP sent to your email!');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API}/advoperationverifyotp`, {
        email,
        otp,
      });
      if (response.status === 200) {
        toast.success('OTP verified successfully!');
        const loginTime = new Date().getTime();
        setTimeout(() => {
          localStorage.setItem("advOperationId", response.data._id);
          localStorage.setItem("advOperationName", response.data.operationName);
          localStorage.setItem("advOperationToken", response.data.token);
          localStorage.setItem("sessionStartTime", loginTime);
          navigate("/AdvOperationDashboard");
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (errorRef.current && !errorRef.current.contains(event.target)) {
        toast.dismiss(); 
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-indigo-600 rounded-b-[100px] shadow-2xl shadow-indigo-200/50 -z-0 transform -translate-y-10 skew-y-2"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="w-full max-w-[440px] relative z-10 animate-[fadeIn_0.5s_ease-out] mt-10" ref={errorRef}>
        
        {/* Header Section */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 shadow-lg shadow-indigo-900/10">
            <ShieldCheck size={40} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Operations Login</h1>
          <p className="text-indigo-100 font-medium text-sm">Secure access for Accenlearn operations team</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 relative overflow-hidden transition-all duration-300">
          
          <div className="space-y-6 relative z-10">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Corporate Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all sm:text-sm"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>Send Verification Code <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                {/* OTP Input */}
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                    <span>One Time Password</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                      <KeyRound size={18} />
                    </div>
                    <input
                      type="text"
                      id="otp"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 font-bold placeholder-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-center tracking-[0.5em] text-lg"
                      placeholder="------"
                      maxLength={6}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Verify & Secure Login"
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5 w-full"
                    onClick={() => setOtpSent(false)}
                  >
                    <ArrowLeft size={16} /> Use a different email
                  </button>
                </div>
              </form>
            )}

            <div className="text-center flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest pt-6 border-t border-slate-100">
              <Shield size={14} className="text-slate-400" />
              Protected by Accenlearn Gateway
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OperationLogin;
