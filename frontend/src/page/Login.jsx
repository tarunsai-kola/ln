import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import AccenlearnLogo from "../assets/accenlearn-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/checkuserauth`, {
        email,
        password,
      });
      toast.success("Login successful!");
      if (response.status === 200) {
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("advance", response.data.advance);
        
        // Small delay for animation
        setTimeout(() => {
          if (response.data.advance) {
            navigate("/advancedashboard");
          } else {
            navigate("/Dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Your account is inactive. Please contact support.");
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(
          error.response?.data?.message ||
          "An error occurred while logging in. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] flex items-center justify-center relative overflow-hidden font-sans p-4 selection:bg-blue-500/30">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { background: '#1e1e2d', color: '#fff' } }} />
      
      {/* Hyper-Premium Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
      </div>

      {/* Main Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] relative z-10 mt-10"
      >
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.15)] mb-6 hover:scale-105 transition-transform backdrop-blur-md">
            <img src={AccenlearnLogo} alt="Accenlearn Logo" className="h-10 w-auto object-contain" />
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2 ag-font-outfit">Welcome Back</h2>
          <p className="text-gray-400 font-light">Sign in to your dashboard.</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
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
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-12 py-3.5 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end -mt-2">
              <Link to="/forgotpassword" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors tracking-wide">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-4 bg-white hover:bg-gray-100 text-black rounded-2xl font-black tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center group hover:scale-[1.02] duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-500">
              <span className="px-4 bg-[#0a0a12]">Or</span>
            </div>
          </div>

          {/* OTP Login Alternative */}
          <Link 
            to="/Loginwithotp" 
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-gray-300 hover:text-white font-bold transition-all shadow-sm group hover:border-white/20"
          >
            <Smartphone size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
            Sign in with OTP
          </Link>
        </div>


      </motion.div>
    </div>
  );
};

export default Login;
