import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API from "../API";
import logo from "../assets/accenlearn-logo.png";
import toast, { Toaster } from "react-hot-toast";
import { 
  LogOut, Home, LayoutDashboard, PhoneCall, Activity, FileSpreadsheet, 
  PlusCircle, List, Code, Briefcase, Users, GraduationCap, 
  Bookmark, CheckSquare, XCircle, HelpCircle, FileText, UserCog, 
  LineChart, UploadCloud, TrendingUp, CheckCircle, CalendarPlus, 
  UserCheck, CalendarDays
} from "lucide-react";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/admin/logout`, {}, { withCredentials: true });
      toast.success("Logout successful!");
      setTimeout(() => {
        localStorage.removeItem("adminToken");
        navigate("/AdminLogin");
      }, 2000);
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("adminToken");
      navigate("/AdminLogin");
    }
  };

  const isActive = (path) => {
    return location.pathname === path 
      ? "bg-indigo-500/10 text-indigo-400 font-semibold shadow-[0_2px_10px_rgba(99,102,241,0.05)] border border-indigo-500/20" 
      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium border border-transparent";
  };

  const menuItems = [
//    { category: "CRM Governance" },
//    { to: "/AdvAdminDashboard", icon: LayoutDashboard, text: "Admin Dashboard" },
//    { to: "/Admin/CallLogs", icon: PhoneCall, text: "Call Activity Logs" },

//    { to: "/Admin/Reports", icon: FileSpreadsheet, text: "System Reports" },
    
//    { category: "Course Management" },


    { to: "/AddAdvCourse", icon: PlusCircle, text: "Create Course" },
    { to: "/AddAdvModule", icon: List, text: "Course List" },
    { to: "/AdvExercisePage", icon: Code, text: "Exercise Builder" },
    { to: "/CreateAdvOperation", icon: Briefcase, text: "Create Operation" },
    { to: "/CreateAdvTeam", icon: Users, text: "Create Team" },
    { to: "/CreateHR", icon: UserCog, text: "Create HR" },
    { to: "/AdvOnBoardingDetails", icon: GraduationCap, text: "Onboarding" },
    { to: "/AdvBooked", icon: Bookmark, text: "Booked" },
    { to: "/AdvFullPaid", icon: CheckSquare, text: "FullPaid" },
    { to: "/AdvDefault", icon: XCircle, text: "Default" },
    
    { category: "Operations & Analytics" },
    { to: "/AdvanceQueries", icon: HelpCircle, text: "Course Queries" },
//    { to: "/AdvLeadManagement", icon: Users, text: "Lead Mgmt" },
    { to: "/AdvFormLeads", icon: FileText, text: "Form Leads" },
    { to: "/AdvTeamDetail", icon: Users, text: "Team Details" },
    { to: "/AdvUserManagement", icon: UserCog, text: "User Mgmt" },
//    { to: "/AdminAnalytics", icon: LineChart, text: "Analytics" },
//    { to: "/BulkImport", icon: UploadCloud, text: "Bulk Import Leads" },
    { to: "/AdvRevenueSheet", icon: TrendingUp, text: "Revenue Sheet" },
    
    { category: "Special Programs" },
    { to: "/AdvProjectPage", icon: CheckCircle, text: "Project Mgmt" },
    { to: "/CreateInterview", icon: CalendarPlus, text: "Create Mentor Meeting" },
    { to: "/MasterClasses", icon: GraduationCap, text: "Master Class" },
//    { to: "/admin-career-assessment", icon: UserCheck, text: "Career Assessments" },
    { to: "/Admin/Attendance", icon: CalendarDays, text: "Attendance" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <div className="z-[1000] fixed top-0 left-0 w-full h-[70px] bg-[#0A0F1C]/90 backdrop-blur-xl border-b border-white/5 flex items-center px-6 justify-between shadow-sm">
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
          style: { background: '#1e1e2d', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        }} />
        
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Accenlearn Logo" className="h-9 object-contain drop-shadow-md" />
          </Link>
          <div className="h-6 w-px bg-white/10 ml-2"></div>
          <span className="text-indigo-400/80 text-xs font-black tracking-[0.2em] uppercase ml-2 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">Admin Portal</span>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 border border-rose-500/20 rounded-xl transition-all font-bold text-sm shadow-sm group">
          <LogOut size={16} className="group-hover:animate-pulse" /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="fixed top-[70px] left-0 w-[265px] h-[calc(100vh-70px)] bg-[#0B0F19]/95 backdrop-blur-2xl border-r border-white/5 overflow-y-auto custom-scrollbar pb-10 z-[900]">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-40 bg-indigo-500/5 blur-[60px] pointer-events-none"></div>

        <div className="flex flex-col py-6 relative z-10">
          
          <div className="px-4 mb-2">
            <Link to="/AdminDashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[13px] group ${isActive('/AdminDashboard')}`}>
              <Home size={18} className={`${location.pathname === '/AdminDashboard' ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-300'} transition-colors`} /> 
              <span>Home</span>
            </Link>
          </div>

          {menuItems.map((item, index) => {
            if (item.category) {
              return (
                <div key={index} className="mt-8 mb-3 px-7">
                  <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.15em] flex items-center gap-2">
                    <span className="w-2 h-px bg-slate-700"></span>
                    {item.category}
                  </h3>
                </div>
              );
            }

            const active = location.pathname === item.to;
            const Icon = item.icon;

            return (
              <div key={index} className="px-4 mb-1">
                <Link to={item.to} className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-[13px] group ${isActive(item.to)}`}>
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={`${active ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-300'} transition-colors`} /> 
                    <span className="truncate">{item.text}</span>
                  </div>
                  {item.isLive && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}} />
    </>
  );
};

export default AdminHeader;
