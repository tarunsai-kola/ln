import React, { useState } from "react";
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
  UserCheck, CalendarDays, Bot, Calculator, CalendarX,
  ChevronDown, ChevronRight, Settings, Target, BookOpen,
  DollarSign, Shield, UserPlus, ClipboardList
} from "lucide-react";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (category) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

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
    { category: "Course Management", icon: BookOpen },
    { to: "/AddAdvCourse", icon: PlusCircle, text: "Create Course" },
    { to: "/AddAdvModule", icon: List, text: "Course List" },
    { to: "/AdvExercisePage", icon: Code, text: "Exercise Builder" },
    { to: "/AddCodingProblem", icon: Code, text: "Add Coding Problem" },
    { to: "/AddAIMockInterview", icon: Bot, text: "AI Mock Interview" },
    { to: "/MasterClasses", icon: GraduationCap, text: "Master Class" },

    { category: "Team & People", icon: Users },
    { to: "/CreateAdvOperation", icon: Briefcase, text: "Create Operation" },
    { to: "/CreateAdvTeam", icon: Users, text: "Create Team" },
    { to: "/CreateHR", icon: UserCog, text: "Create HR" },
    { to: "/CreateInterviewer", icon: GraduationCap, text: "Create Mentor" },
    { to: "/CreateInterviewer?tab=applications", icon: FileText, text: "Mentor Applications" },
    { to: "/AssignMentorOp", icon: UserCheck, text: "Assign Mentor ↔ OP" },
    { to: "/CreateInterview", icon: CalendarPlus, text: "Create Mentor Meeting" },

    { category: "Student Pipeline", icon: ClipboardList },
    { to: "/AdvOnBoardingDetails", icon: GraduationCap, text: "Onboarding" },
    { to: "/AdvBooked", icon: Bookmark, text: "Booked" },
    { to: "/AdvFullPaid", icon: CheckSquare, text: "Full Paid" },
    { to: "/AdvDefault", icon: XCircle, text: "Default" },

    { category: "Leads & Queries", icon: HelpCircle },
    { to: "/AdvanceQueries", icon: HelpCircle, text: "Course Queries" },
    // { to: "/AdvFormLeads", icon: FileText, text: "Form Leads" },
    { to: "/AdvReferrals", icon: Users, text: "Student Referrals" },

    { category: "Operations & Analytics", icon: LineChart },
    { to: "/AdvTeamDetail", icon: Users, text: "Team Details" },
    { to: "/AdvUserManagement", icon: UserCog, text: "User Mgmt" },
    { to: "/AdvRevenueSheet", icon: TrendingUp, text: "Revenue Sheet" },
    { to: "/AdvProjectPage", icon: CheckCircle, text: "Project Mgmt" },

    { category: "Payroll & Attendance", icon: CalendarDays },
    { to: "/SalaryCalculator", icon: Calculator, text: "Target Salary Plans" },
    { to: "/attendcal", icon: Calculator, text: "Attendance Salary Calc" },
    { to: "/Admin/Attendance", icon: CalendarDays, text: "Attendance" },
    { to: "/admin/absent-requests", icon: CalendarX, text: "Absent Requests" },
  ];

  // Group items by category for collapsible rendering
  const groupedMenu = [];
  let currentGroup = null;
  menuItems.forEach((item) => {
    if (item.category) {
      currentGroup = { category: item.category, categoryIcon: item.icon, items: [] };
      groupedMenu.push(currentGroup);
    } else if (currentGroup) {
      currentGroup.items.push(item);
    }
  });

  // Check if any item in a group is active
  const isGroupActive = (items) => {
    return items.some((item) => location.pathname === item.to);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="z-[1000] fixed top-0 left-0 w-full h-[70px] bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center px-6 justify-between shadow-sm">
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
          style: { background: '#1e1e2d', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        }} />

        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Accenlearn Logo" className="h-9 object-contain drop-shadow-sm" />
          </Link>
          <div className="h-6 w-px bg-slate-200 ml-2"></div>
          <span className="text-indigo-600 text-xs font-black tracking-[0.2em] uppercase ml-2 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 shadow-sm">Admin Portal</span>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 border border-rose-100 rounded-xl transition-all font-bold text-sm shadow-sm group">
          <LogOut size={16} className="group-hover:animate-pulse" /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="fixed top-[70px] left-0 w-[265px] h-[calc(100vh-70px)] bg-[#0B0F19]/95 backdrop-blur-2xl border-r border-white/5 overflow-y-auto custom-scrollbar pb-10 z-[900]">

        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-40 bg-indigo-500/5 blur-[60px] pointer-events-none"></div>

        <div className="flex flex-col py-6 relative z-10">

          {/* Home - always visible */}
          <div className="px-4 mb-4">
            <Link to="/AdminDashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[13px] group ${isActive('/AdminDashboard')}`}>
              <Home size={18} className={`${location.pathname === '/AdminDashboard' ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-300'} transition-colors`} />
              <span>Home</span>
            </Link>
          </div>

          {/* Grouped Sections */}
          {groupedMenu.map((group, gIdx) => {
            const isCollapsed = collapsedSections[group.category] ?? false;
            const groupActive = isGroupActive(group.items);
            const CategoryIcon = group.categoryIcon;

            return (
              <div key={gIdx} className="mb-1">
                {/* Category Header - Clickable */}
                <button
                  onClick={() => toggleSection(group.category)}
                  className={`w-full flex items-center justify-between px-5 py-2.5 transition-all group cursor-pointer ${groupActive ? "text-indigo-300" : "text-slate-500 hover:text-slate-300"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <CategoryIcon size={14} className={groupActive ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-400"} />
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                      {group.category}
                    </h3>
                    {groupActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"></span>
                    )}
                  </div>
                  {isCollapsed ? (
                    <ChevronRight size={14} className="text-slate-600" />
                  ) : (
                    <ChevronDown size={14} className="text-slate-600" />
                  )}
                </button>

                {/* Items */}
                {!isCollapsed && (
                  <div className="mt-0.5 space-y-0.5">
                    {group.items.map((item, iIdx) => {
                      const active = location.pathname === item.to;
                      const Icon = item.icon;
                      return (
                        <div key={iIdx} className="px-4">
                          <Link to={item.to} className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all text-[13px] group ${isActive(item.to)}`}>
                            <div className="flex items-center gap-3">
                              <Icon size={16} className={`${active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-300'} transition-colors`} />
                              <span className="truncate">{item.text}</span>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
