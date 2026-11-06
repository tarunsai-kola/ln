import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AdvUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      const [opRes, teamRes] = await Promise.all([
        axios.get(`${API}/getadvoperation?t=${timestamp}`),
        axios.get(`${API}/getadvteam?t=${timestamp}`)
      ]);

      const operations = (opRes.data || []).map(u => ({ ...u, role: "ADV_OPERATION", type: "operation" }));
      const teams = (teamRes.data || []).map(u => ({ ...u, role: u.designation || "ADV_TEAM", type: "team" }));

      setUsers([...operations, ...teams]);
    } catch (error) {
      console.error("Error fetching ADV users:", error);
      toast.error("Failed to refresh user list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (user) => {
    const newStatus = (user.status || "Active") === "Inactive" ? "Active" : "Inactive";
    const action = newStatus === "Active" ? "activate" : "inactivate";

    if (!window.confirm(`Are you sure you want to ${action} ${user.fullname}?`)) return;

    // Optimistic Update: Change status locally first for instant feedback
    const originalUsers = [...users];
    setUsers(users.map(u => 
      u._id === user._id ? { ...u, status: newStatus } : u
    ));

    try {
      const endpoint = user.type === "operation" 
        ? `${API}/updateadvoperationstatus/${user._id}`
        : `${API}/updateadvteamstatus/${user._id}`;
      
      await axios.put(endpoint, { status: newStatus });
      toast.success(`User ${action}d successfully`);
      // Final fetch to synchronize with any server-side changes
      fetchUsers();
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user`);
      // Revert to original state on failure
      setUsers(originalUsers);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`CRITICAL: Permanently delete ${user.fullname}? This cannot be undone.`)) return;

    try {
      const endpoint = user.type === "operation" 
        ? `${API}/deleteadvoperation/${user._id}`
        : `${API}/deleteadvteam/${user._id}`;
      
      await axios.delete(endpoint);
      toast.success("User deleted permanently");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Deletion failed");
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const status = u.status || "Active";
    const matchesFilter = filterStatus === "All" || status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50/50 font-sans p-6 sm:p-10">
      <Toaster position="top-center" />
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight m-0">
                User Management
              </h1>
              <p className="text-sm text-slate-500 mt-1 m-0 font-medium">
                Manage statuses for all Operation and Team members
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <div className="relative">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-[200px] rounded-xl border border-slate-300 bg-white text-slate-700 px-4 py-2.5 shadow-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all appearance-none font-medium text-sm"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active Only</option>
                  <option value="Inactive">Inactive Only</option>
                </select>
                <i className="fa fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]"></i>
              </div>

              <div className="relative flex-grow md:flex-grow-0">
                <input
                  type="text"
                  placeholder="Search name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[300px] rounded-xl border border-slate-300 bg-white text-slate-700 pl-10 pr-4 py-2.5 shadow-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all font-medium text-sm"
                />
                <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              </div>

              <button 
                onClick={fetchUsers}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-500 hover:bg-slate-50 hover:text-blue-600 shadow-sm transition-all"
                title="Refresh List"
              >
                <i className="fa fa-sync-alt"></i>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
               <div className="three-body">
                  <div className="three-body__dot"></div>
                  <div className="three-body__dot"></div>
                  <div className="three-body__dot"></div>
                </div>
                <p className="mt-6 text-slate-500 font-bold uppercase tracking-widest text-xs">Fetching users...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      <th className="px-6 py-5">#</th>
                      <th className="px-6 py-5">Full Name</th>
                      <th className="px-6 py-5">Email</th>
                      <th className="px-6 py-5">Role / Designation</th>
                      <th className="px-6 py-5 text-center">Status</th>
                      <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => {
                        const isActive = (user.status || "Active") === "Active";
                        return (
                          <tr key={user._id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4 text-slate-400 font-mono font-medium text-xs">{index + 1}</td>
                            <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {user.fullname?.charAt(0) || "U"}
                              </div>
                              {user.fullname}
                            </td>
                            <td className="px-6 py-4 text-slate-500 font-medium">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className="bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                                {(user.role || 'N/A').replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                               <span className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border shadow-sm ${
                                 isActive 
                                 ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                                 : "bg-rose-50 text-rose-600 border-rose-200"
                               }`}>
                                 {user.status || "Active"}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end items-center gap-3">
                                <button
                                  onClick={() => handleToggleStatus(user)}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold border shadow-sm transition-all hover:-translate-y-0.5 ${
                                    isActive 
                                    ? "bg-white text-rose-600 border-slate-200 hover:bg-rose-50 hover:border-rose-200" 
                                    : "bg-white text-emerald-600 border-slate-200 hover:bg-emerald-50 hover:border-emerald-200"
                                  }`}
                                >
                                  {isActive ? "Deactivate" : "Activate"}
                                </button>
                                <button
                                  onClick={() => handleDelete(user)}
                                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 shadow-sm transition-all hover:-translate-y-0.5"
                                  title="Permanent Delete"
                                >
                                  <i className="fa fa-trash text-xs"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-2xl text-slate-400">
                              <i className="fa fa-users-slash"></i>
                            </div>
                            <p className="text-slate-500 font-medium">No matching users found in the system.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvUserManagement;
