import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import AccenlearnLogo from "../assets/accenlearn-logo.png";
import LoginSideImage from "../assets/login_side_image.jpg";

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
    <div className="min-h-screen bg-slate-50 flex relative font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="w-full min-h-screen flex flex-col lg:flex-row relative z-10">
        
        {/* Left Side: Image */}
        <div className="hidden lg:flex lg:w-1/2 min-h-screen relative bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
            <img src={LoginSideImage} alt="Tech Education" className="w-full h-full object-cover opacity-90" />
            <div className="absolute bottom-16 left-16 z-20 max-w-md">
                <h2 className="text-4xl font-black text-white mb-4 leading-tight">Elevate Your Career.</h2>
                <p className="text-slate-300 text-base leading-relaxed">Join Accenlearn and gain access to world-class mentorship, cutting-edge curriculum, and a thriving community of professionals.</p>
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
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome back</h2>
              <p className="text-slate-500 font-medium text-sm">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                   Email
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all sm:text-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-12 py-3 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password & Options */}
              <div className="flex justify-between items-center pt-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="rounded border-slate-300 text-blue-600 focus:ring-blue-600/20" />
                  <label htmlFor="remember" className="text-sm font-medium text-slate-600">Remember for 30 days</label>
                </div>
                <Link to="/forgotpassword" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold tracking-wide transition-all shadow-sm shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex justify-center items-center"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs font-semibold text-slate-500">
                <span className="px-4 bg-white">OR</span>
              </div>
            </div>

            {/* OTP Login Alternative */}
            <Link 
              to="/Loginwithotp" 
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold transition-all shadow-sm"
            >
              <Smartphone size={18} className="text-slate-500" />
              Sign in with OTP
            </Link>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
