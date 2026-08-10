import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, KeyRound, ArrowLeft, Lock } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import AccenlearnLogo from '../assets/accenlearn-logo.png';

const LoginWithOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API}/send-otp`, { email });
      if (response.status === 200) {
        toast.success('OTP sent successfully');
        setShowOtp(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/verify-otp`, { email, otp });
      toast.success('Login successful!!!');
      if (response.status === 200) {
        setTimeout(() => {
          localStorage.setItem('userId', response.data._id);
          localStorage.setItem('userEmail', response.data.email);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('advance', response.data.advance);
          if (response.data.advance) {
            navigate('/advancedashboard');
          } else {
            navigate('/Dashboard');
          }
        }, 2000);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Your account is inactive. Please contact support.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid or expired OTP. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("User not found. Please check your email.");
      } else {
        toast.error(
          error.response?.data?.message || "An error occurred while verifying OTP. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] flex items-center justify-center relative overflow-hidden font-sans p-4 selection:bg-indigo-500/30">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { background: '#1e1e2d', color: '#fff' } }} />

      {/* Hyper-Premium Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
      </div>

      {/* Main Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] relative z-10 mt-10"
      >
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] mb-6 hover:scale-105 transition-transform backdrop-blur-md">
            <img src={AccenlearnLogo} alt="Accenlearn Logo" className="h-10 w-auto object-contain" />
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2 ag-font-outfit">OTP Login</h2>
          <p className="text-gray-400 font-light text-center max-w-[280px]">
            {showOtp 
              ? `We've sent a 6-digit code to ${email}`
              : "Enter your email to receive a secure one-time passcode."}
          </p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-500">
          <form onSubmit={showOtp ? handleVerifyOtp : (e) => { e.preventDefault(); handleSendOtp(); }} className="space-y-6">
            
            <AnimatePresence mode="wait">
              {!showOtp ? (
                /* Email Input */
                <motion.div 
                  key="email-input"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-2"
                >
                  <label htmlFor="email" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                     Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all sm:text-sm"
                    />
                  </div>
                </motion.div>
              ) : (
                /* OTP Input */
                <motion.div 
                  key="otp-input"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-2"
                >
                  <label htmlFor="otp" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    One-Time Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <KeyRound size={18} />
                    </div>
                    <input
                      type="text"
                      id="otp"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white font-bold placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all sm:text-lg tracking-[0.3em] text-center"
                      maxLength={6}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-white hover:bg-gray-100 text-black rounded-2xl font-black tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center group hover:scale-[1.02] duration-300"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  {showOtp ? "Verifying..." : "Sending OTP..."}
                </div>
              ) : (
                showOtp ? "Verify & Sign In" : "Send OTP"
              )}
            </button>
          </form>

          {/* Action links */}
          <div className="mt-8 flex flex-col space-y-4">
            {showOtp && (
              <div className="flex justify-between items-center text-xs font-bold">
                <button 
                  type="button" 
                  onClick={() => setShowOtp(false)}
                  className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Change Email
                </button>
                <button 
                  type="button" 
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50 tracking-wide"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-500">
                <span className="px-4 bg-[#0a0a12]">Or</span>
              </div>
            </div>

            {/* Password Login Alternative */}
            <Link 
              to="/Login" 
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-gray-300 hover:text-white font-bold transition-all shadow-sm group hover:border-white/20"
            >
              <Lock size={18} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
              Sign in with Password
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginWithOtp;
