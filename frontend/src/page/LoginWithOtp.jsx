import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, KeyRound, ArrowLeft, Lock } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import AccenlearnLogo from '../assets/accenlearn-logo.png';
import LoginSideImage from '../assets/login_side_image.jpg';

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
    <div className="min-h-screen bg-slate-50 flex relative font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full min-h-screen flex flex-col lg:flex-row relative z-10">
        
        {/* Left Side: Image */}
        <div className="hidden lg:flex lg:w-1/2 min-h-screen relative bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
            <img src={LoginSideImage} alt="Tech Education" className="w-full h-full object-cover opacity-90" />
            <div className="absolute bottom-16 left-16 z-20 max-w-md">
                <h2 className="text-4xl font-black text-white mb-4 leading-tight">Secure & Seamless Access.</h2>
                <p className="text-slate-300 text-base leading-relaxed">Experience the future of education with robust security and a clean, modern learning environment.</p>
            </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-12 bg-white relative overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-[420px] relative z-10"
          >
        
            {/* Logo Header */}
            <div className="flex flex-col mb-8">
              <Link to="/" className="inline-block mb-8">
                <img src={AccenlearnLogo} alt="Accenlearn Logo" className="h-10 w-auto object-contain" />
              </Link>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">OTP Login</h2>
              <p className="text-slate-500 font-medium text-sm">
                {showOtp 
                  ? `We've sent a 6-digit code to ${email}`
                  : "Enter your email to receive a secure one-time passcode."}
              </p>
            </div>

            <div className="space-y-5">
              {!showOtp ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold tracking-wide transition-all shadow-sm shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Passcode"
                    )}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Enter Passcode</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <KeyRound size={18} />
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all text-center tracking-[0.5em] sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold tracking-wide transition-all shadow-sm shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </div>
                    ) : (
                      "Verify & Sign In"
                    )}
                  </button>
                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setShowOtp(false)}
                      className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1"
                    >
                      <ArrowLeft size={14} /> Change Email
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
                </form>
              )}

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs font-semibold text-slate-500">
                  <span className="px-4 bg-white">OR</span>
                </div>
              </div>

              {/* Password Login Alternative */}
              <Link 
                to="/Login" 
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold transition-all shadow-sm"
              >
                <Lock size={18} className="text-slate-500" />
                Sign in with Password
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithOtp;
