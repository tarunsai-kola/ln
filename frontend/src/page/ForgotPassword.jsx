import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaKey, FaArrowLeft } from 'react-icons/fa';
import AccenlearnLogo from "../assets/accenlearn-logo.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API}/send-otp`, { email });
            if (response.status === 200) {
                toast.success('OTP sent to your email');
                setStep(2);
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
            if (response.status === 200) {
                toast.success('OTP verified successfully');
                setStep(3);
                // The verify-otp route implicitly logs the user in by sending a token.
                // Since this is a password reset flow, we should remove the session variables right after.
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`${API}/updatepassword`, { email, newPassword });
            if (response.status === 200) {
                toast.success('Password updated successfully');
                setTimeout(() => navigate('/Login'), 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#05050A] flex items-center justify-center relative overflow-hidden font-sans p-4">
            <Toaster position="top-center" reverseOrder={false} 
                toastOptions={{
                    style: {
                        background: '#1e1e2d',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }
                }} 
            />
            
            {/* Ambient Background Effects */}
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Main Card */}
            <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Logo Header */}
                <div className="flex flex-col items-center mb-8">
                    <Link to="/" className="inline-block p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md mb-6 hover:bg-white/10 transition-colors">
                        <img src={AccenlearnLogo} alt="Accenlearn Logo" className="h-10 w-auto object-contain" />
                    </Link>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Reset Password</h2>
                    <p className="text-gray-400 text-sm">
                        {step === 1 && "Enter your email to receive a recovery code."}
                        {step === 2 && "Enter the 6-digit code sent to your email."}
                        {step === 3 && "Create a new, strong password."}
                    </p>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-1.5 group">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                                    <FaEnvelope className="text-blue-500" /> Registered Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </div>
                                ) : "Send OTP"}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-1.5 group">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                                    <FaKey className="text-blue-500" /> Security Code
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-center tracking-[0.3em] font-bold text-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Verifying...
                                    </div>
                                ) : "Verify OTP"}
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-1.5 group">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                                    <FaLock className="text-blue-500" /> New Password
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Updating...
                                    </div>
                                ) : "Reset Password"}
                            </button>
                        </form>
                    )}

                    {/* Divider & Back Link */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <Link 
                            to="/Login" 
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl text-gray-400 hover:text-white font-medium text-sm transition-all"
                        >
                            <FaArrowLeft size={12} /> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
