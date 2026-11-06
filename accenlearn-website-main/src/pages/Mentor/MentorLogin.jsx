import React, { useState } from "react";
import axios from "axios";
import API from "../../API";
import { FaLock, FaEnvelope, FaShieldAlt } from "react-icons/fa";

const MentorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/interviewer/interviewer-login`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.status === 200) {
        setSuccess(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("interviewerToken", res.data.token);
          localStorage.setItem("interviewerId", res.data.interviewer.id);
          localStorage.setItem("interviewerName", res.data.interviewer.fullname);

          // If on main website, redirect to the app's MentorDashboard or internal dashboard
          setTimeout(() => {
            const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            if (isLocal && window.location.port === "5173") {
              // Redirect to main LMS app on port 5174
              window.location.href = `http://localhost:5174/MentorDashboard`;
            } else {
              window.location.href = "/MentorDashboard";
            }
          }, 1200);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl mb-4">
            <FaShieldAlt />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Mentor Portal Login</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Sign in with your official ID (e.g. <code className="text-indigo-300">name@accenlearn.com</code>)
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            Login Successful! Redirecting to Mentor Dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              User ID / Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <FaEnvelope />
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@accenlearn.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <FaLock />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Default password provided in offer letter: <code className="text-amber-300">Accenlearn@123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-900/40 text-sm uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Authenticating...
              </>
            ) : (
              "Log In to Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            Need onboarding assistance? Contact{" "}
            <a href="mailto:operations@accenlearn.com" className="text-indigo-400 hover:underline">
              operations@accenlearn.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorLogin;

