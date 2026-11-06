import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/accenlearn-logo.png";
import toast, { Toaster } from "react-hot-toast";
import { LogOut, Calendar, Menu, X } from "lucide-react";

const HRHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hrName = localStorage.getItem("hrName") || "HR Manager";

  const handleLogout = () => {
    localStorage.removeItem("hrToken");
    localStorage.removeItem("hrId");
    localStorage.removeItem("hrName");
    toast.success("Logout successful!!!");
    setTimeout(() => {
      navigate("/hrlogin");
    }, 1000);
  };

  const menuItems = [
    { to: "/hrdashboard", icon: Calendar, text: "Attendance" }
  ];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-white border-b border-slate-200 z-[60] flex items-center justify-between px-4 sm:px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="block">
            <img src={logo} alt="Logo" className="h-8 object-contain" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-black text-slate-800">{hrName}</div>
            <div className="text-xs font-bold text-indigo-600">HR Portal</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">
            {hrName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-[70px] left-0 w-[265px] h-[calc(100vh-70px)] bg-white border-r border-slate-200 z-[50] flex-col py-6 px-4">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-3">Management</div>
        
        <div className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={index}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                    : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                <item.icon size={18} />
                {item.text}
              </Link>
            );
          })}
        </div>

        <div className="pt-6 mt-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="absolute top-0 left-0 w-[280px] h-full bg-white shadow-2xl flex flex-col py-6 px-4 animate-[slideInRight_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-8 px-2">
              <img src={logo} alt="Logo" className="h-8 object-contain" />
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-3">Management</div>
            
            <div className="flex-1 space-y-1 overflow-y-auto">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                        : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.text}
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HRHeader;
