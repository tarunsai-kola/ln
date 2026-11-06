import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { Users, LogIn, Ban, ArrowLeft, ShieldAlert, BadgeCent } from "lucide-react";

const AdvTeamTeamLogin = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const managerId = localStorage.getItem("advTeamId");
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const mgrRes = await axios.get(`${API}/getadvteam`, { params: { advTeamId: managerId } });
      const mgr = mgrRes.data;

      const designation = (mgr.designation || "").toUpperCase();
      const authorized = designation.includes("MANAGER") || designation.includes("LEADER");
      setIsAuthorized(authorized);
      
      if (!authorized) {
        setLoading(false);
        return;
      }

      const allRes = await axios.get(`${API}/getadvteam`);
      const allMembers = allRes.data;

      const managerTeams = mgr.teams && mgr.teams.length > 0 ? mgr.teams : [mgr.team];

      const filtered = allMembers.filter(member => {
        if (member._id === managerId) return false;
        if (member.status === "Inactive") return false; 
        
        const memberTeams = member.teams && member.teams.length > 0 ? member.teams : [member.team];
        const isTeamMatch = managerTeams.some(t => memberTeams.includes(t)) || 
                           managerTeams.includes(member.team) || 
                           memberTeams.includes(mgr.team);
        
        if (!isTeamMatch) return false;

        const memberDesignation = (member.designation || "").toUpperCase();
        const isManagerOrLeader = memberDesignation.includes("MANAGER") || memberDesignation.includes("LEADER");
        
        if (designation.includes("LEADER")) {
           return !isManagerOrLeader; 
        }
        
        if (designation.includes("MANAGER")) {
           return !memberDesignation.includes("MANAGER");
        }

        return true;
      });

      setTeamMembers(filtered);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async (userId) => {
    try {
      const response = await axios.post(`${API}/manager-impersonate-advteam`, { userId, managerId });
      if (response.status === 200) {
        toast.success("Impersonation successful!");
        const { token, bdaId, bdaName, designation } = response.data;
        
        const impersonateUrl = `/advteam/home?impToken=${encodeURIComponent(token)}&impId=${bdaId}&impName=${encodeURIComponent(bdaName)}&impRole=${encodeURIComponent(designation || "")}&impType=advTeamToken`;
        
        setTimeout(() => {
          window.open(impersonateUrl, "_blank");
        }, 500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to login to team member");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10 flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl shadow-slate-200/50 max-w-md w-full text-center border border-slate-100">
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Ban className="text-rose-500 w-12 h-12" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3">Access Denied</h2>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Your role does not have permission to access the team portfolio. This area is reserved for Managers and Leaders.
          </p>
          <button 
            onClick={() => window.location.href = "/advteam/home"}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-slate-200"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-8 shadow-lg shadow-indigo-200/50 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
          <Users size={250} />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
            Team Portfolio Access
          </h1>
          <p className="text-blue-100 font-medium max-w-xl">
            Monitor your team's sales performance and seamlessly impersonate their accounts to provide direct assistance.
          </p>
        </div>
        
        <div className="relative z-10 mt-6 md:mt-0 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
          <ShieldAlert className="text-blue-200" size={24} />
          <div>
            <div className="text-xs font-bold text-blue-200 uppercase tracking-wider">Manager Access</div>
            <div className="text-sm font-bold text-white">Authorized Personnel</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full animate-[fadeIn_0.3s_ease-out]">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Users className="text-blue-500" size={20} /> Team Roster
          </h3>
          <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold shadow-sm">
            Total Members: {teamMembers.length}
          </span>
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-bold tracking-wide">Loading your team roster...</p>
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-100">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-16">#</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Member</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role & Designation</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Assignment</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {teamMembers.map((member, index) => (
                  <tr key={member._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-5 text-sm font-bold text-slate-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg">
                          {member.fullname?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{member.fullname}</span>
                          <span className="text-xs font-medium text-slate-500">{member.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase bg-blue-50 text-blue-700 border border-blue-100">
                        {member.designation}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <BadgeCent size={16} className="text-slate-400" />
                        {member.team || (member.teams ? member.teams.join(", ") : "N/A")}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => handleLogin(member._id)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-blue-600 hover:border-blue-600 rounded-xl text-xs font-bold transition-all shadow-sm group-hover:shadow-md"
                      >
                        Impersonate <LogIn size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Ban className="text-slate-300 w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No Eligible Members</h3>
            <p className="text-slate-500 text-sm">There are no team members assigned to you that you can impersonate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvTeamTeamLogin;
