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
        toast.success('OTP sent to your email!', {
          style: {
            background: '#334155',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again.", {
          style: {
            background: '#334155',
            color: '#fff',
          },
        }
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
        toast.success('OTP verified successfully!', {
          style: {
            background: '#334155',
            color: '#fff',
          },
        });
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
        error.response?.data?.message || "Invalid OTP. Please try again.", {
          style: {
            background: '#334155',
            color: '#fff',
          },
        }
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
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Decorative Dark Theme Background Elements - Emerald & Teal */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/30 rounded-full blur-[120px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[100px] pointer-events-none animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
      <div className="absolute top-[20%] right-[20%] w-32 h-32 bg-cyan-500/20 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="w-full max-w-[440px] relative z-10 mt-4" ref={errorRef}>
        
        {/* Header Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="relative mb-6 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl">
              <ShieldCheck className="text-emerald-400 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-2">Operations Login</h1>
          <p className="text-slate-400 font-medium text-sm flex items-center gap-1.5">
            <Shield size={14} className="text-emerald-500" /> Secure access for Accenlearn operations
          </p>
        </div>

        {/* Premium Glassmorphic Form Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden transition-all duration-300">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-80"></div>
          
          <div className="space-y-6 relative z-10">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Corporate Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3.5 text-white font-medium placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-slate-900 transition-all sm:text-sm shadow-inner"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-4 rounded-xl font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:opacity-90 transition-opacity"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2 text-white">
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>Send Verification Code <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                {/* OTP Input */}
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex justify-between">
                    <span>One Time Password</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                      <KeyRound size={18} />
                    </div>
                    <input
                      type="text"
                      id="otp"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3.5 text-white font-bold placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-slate-900 transition-all text-center tracking-[0.5em] text-lg shadow-inner"
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
                    className="relative w-full py-4 rounded-xl font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] transition-opacity"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2 text-white">
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        "Verify & Secure Login"
                      )}
                    </div>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 w-full"
                    onClick={() => setOtpSent(false)}
                  >
                    <ArrowLeft size={16} /> Use a different email
                  </button>
                </div>
              </form>
            )}

            <div className="text-center flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-8 border-t border-slate-700/50">
              <Shield size={12} className="text-slate-500" />
              Protected by Accenlearn Gateway
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OperationLogin;
