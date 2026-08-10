import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const CreateAdvTeam = () => {
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [bda, setBda] = useState([]);
  const [getteamName, setGetTeamName] = useState([]);
  const [teams, setTeams] = useState([{ id: 1, name: "" }]);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    team: "",
    designation: "",
  });

  const [editingBdaId, setEditingBdaId] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleVisibility = () => {
    if (!iscourseFormVisible) {
      setFormData({
        fullname: "",
        email: "",
        password: "",
        team: "",
        designation: "",
      });
      setTeams([{ id: 1, name: "" }]);
      setEditingBdaId(null);
    }
    setiscourseFormVisible(!iscourseFormVisible);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    // For ADV Manager, join all team names; for others, use single team
    const teamValue = formData.designation === "ADV Manager"
      ? teams.map(t => t.name.trim()).filter(name => name !== "").join(", ")
      : formData.team.trim();
    const newBda = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      team: teamValue,
      designation: formData.designation.trim(),
      teams: formData.designation === "ADV Manager" ? teams.map(t => t.name.trim()).filter(name => name !== "") : [],
    };

    try {
      if (editingBdaId) {
        const response = await axios.put(
          `${API}/updateadvteam/${editingBdaId}`,
          newBda
        );
        toast.success("Team member updated successfully!");
        setBda((prevBda) =>
          prevBda.map((item) => item._id === editingBdaId ? response.data : item)
        );
        fetchBda();
      } else {
        const response = await axios.post(`${API}/createadvteam`, newBda);
        toast.success("Team member created successfully!");
        setBda((prevBda) => [response.data, ...prevBda]);
      }
      resetForm();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error creating/updating member";
      toast.error(errorMessage);
    }
  };

  const fetchBda = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/getadvteam`);
      setBda(response.data.filter((item) => item && item.status === "Active"));
    } catch (error) {
      console.error("There was an error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamname = async () => {
    try {
      const response = await axios.get(`${API}/getadvteamname`);
      setGetTeamName(response.data);
    } catch (error) {
      console.error("There was an error fetching team names:", error);
    }
  };

  useEffect(() => {
    fetchBda();
    fetchTeamname();
  }, []);

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      team: "",
      designation: "",
    });
    setTeams([{ id: 1, name: "" }]);
    setEditingBdaId(null);
    setiscourseFormVisible(false);
  };

  const handleAddTeam = () => {
    const newId = teams.length > 0 ? Math.max(...teams.map(t => t.id)) + 1 : 1;
    setTeams([...teams, { id: newId, name: "" }]);
  };

  const handleRemoveTeam = (id) => {
    if (teams.length > 1) {
      setTeams(teams.filter(t => t.id !== id));
    }
  };

  const handleTeamNameChange = (id, value) => {
    setTeams(teams.map(t => t.id === id ? { ...t, name: value } : t));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "fullname" || name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleDelete = async (_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to permanently delete this team member?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${API}/deleteadvteam/${_id}`);
        setBda((prevBda) => prevBda.filter((item) => item._id !== _id));
        toast.success("Team member deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete team member.");
        fetchBda(); 
      }
    }
  };

  const handleEdit = (bdaId) => {
    setFormData({
      fullname: bdaId.fullname,
      email: bdaId.email,
      password: bdaId.password || '',
      team: bdaId.team || '',
      designation: bdaId.designation,
    });

    if (bdaId.designation === "ADV Manager" && bdaId.teams && bdaId.teams.length > 0) {
      setTeams(bdaId.teams.map((teamName, index) => ({ id: index + 1, name: teamName })));
    } else {
      setTeams([{ id: 1, name: "" }]);
    }

    setEditingBdaId(bdaId._id);
    setiscourseFormVisible(true);
  };

  const handleSendEmail = async (value) => {
    const emailData = {
      fullname: value.fullname,
      email: value.email,
    };
    try {
      const response = await axios.post(`${API}/sendmailtoadvteam`, emailData);
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        const bdaData = { mailSended: true };
        const updateResponse = await axios.put(
          `${API}/mailsendedadvteam/${value._id}`,
          bdaData
        );
        if (updateResponse.status === 200) {
          fetchBda();
        }
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the email.");
    }
  };

  const handleChangeStatus = async (bdaId, status) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to mark this account as ${status}?`
    );
    if (isConfirmed) {
      try {
        const response = await axios.put(`${API}/updateadvteamstatus/${bdaId}`, { status });
        if (response.status === 200) {
          toast.success(`Account marked as ${status}!`);
          if (status === "Inactive") {
            setBda((prevBda) => prevBda.filter((item) => item._id !== bdaId));
          } else {
            fetchBda();
          }
        } else {
          toast.error("Failed to update account status.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the status.");
      }
    }
  }

  const handleAddTeamname = (e) => {
    e.preventDefault();
    if(!teamName.trim()) return toast.error("Please enter a team name.");
    const teamData = { teamname: teamName.trim() };
    axios.post(`${API}/addadvteamname`, teamData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Team added successfully!");
          setTeamName("");
          fetchBda();
          fetchTeamname();
        } else {
          toast.error("Failed to add team.");
        }
      })
      .catch((error) => {
        toast.error("Error adding team. It might already exist.");
      });
  }

  const handleloginteam = async (userId, role) => {
    try {
      const response = await axios.post(`${API}/api/admin/impersonate`, 
        { userId, role },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Impersonation successful!");
        const { token, bdaId, userId: resUserId, bdaName, fullname, designation } = response.data;
        
        const targetId = bdaId || resUserId || userId;
        const targetName = bdaName || fullname || "";
        const targetRole = designation || role;

        const impersonateUrl = `/advteam/home?impToken=${encodeURIComponent(token)}&impId=${targetId}&impName=${encodeURIComponent(targetName)}&impRole=${encodeURIComponent(targetRole)}&impType=advTeamToken`;
        
        setTimeout(() => {
          window.open(impersonateUrl, "_blank");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Impersonation failed!");
    }
  };

  const handleChangeAccess = async (id, currentAccess) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to change the create team access for this account?`
    );
    if (isConfirmed) {
      try {
        const newAccess = !currentAccess;
        const response = await axios.put(`${API}/updateadvteamaccess/${id}`, { Access: newAccess });
        if (response.status === 200) {
          toast.success(`Access updated successfully!`);
          setBda((prevBda) =>
            prevBda.map((item) =>
              item._id === id ? { ...item, Access: newAccess } : item
            )
          );
        } else {
          toast.error("Failed to update access.");
        }
      } catch (error) {
        toast.error("An error occurred while updating access.");
        fetchBda(); 
      }
    }
  }

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1e293b', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Team Management</h1>
            <p className="text-slate-500 mt-1">Manage team members, roles, and platform access.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Quick Actions Card */}
            <div className="flex flex-col sm:flex-row items-center bg-white border border-slate-200 rounded-xl shadow-sm p-1 gap-2">
              <form onSubmit={handleAddTeamname} className="flex items-center">
                <input 
                  type="text" 
                  value={teamName} 
                  onChange={(e) => setTeamName(e.target.value)} 
                  placeholder="New Team Name" 
                  className="px-4 py-2 w-48 text-sm outline-none bg-transparent placeholder-slate-400 text-slate-700" 
                />
                <button 
                  type="submit" 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors border border-slate-200/50"
                >
                  Create Team
                </button>
              </form>
              <div className="hidden sm:block w-px h-6 bg-slate-200 mx-1"></div>
              <select
                className="w-full sm:w-auto bg-transparent text-slate-700 text-sm font-medium px-4 py-2 outline-none cursor-pointer appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:10px_10px] bg-[right_12px_center]"
                value={selectedTeamFilter}
                onChange={(e) => setSelectedTeamFilter(e.target.value)}
              >
                <option value="">Filter by Team ({getteamName.length})</option>
                {getteamName.map((team, index) => (
                  <option key={index} value={team.teamname}>{team.teamname}</option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleVisibility}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95 whitespace-nowrap"
            >
              <i className="fa fa-user-plus text-sm"></i>
              Add Member
            </button>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {iscourseFormVisible && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 overflow-y-auto custom-scrollbar py-10">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all my-auto">
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingBdaId ? "Edit Team Member" : "Create Team Member"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <i className="fa fa-times text-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSumbit} className="p-8">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input
                        value={formData.fullname}
                        onChange={handleChange}
                        type="text"
                        name="fullname"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                    <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Secure password"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Role Designation</label>
                    <div className="relative">
                      <select 
                        name="designation" 
                        value={formData.designation} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800 appearance-none font-medium cursor-pointer"
                        required
                      >
                        <option disabled value="" className="text-slate-400">Select Role</option>
                        <option value="ADV Manager">Manager</option>
                        <option value="ADV Leader">Leader</option>
                        <option value="SR Inside Sales Specialist">Senior Inside Sales Specialist</option>
                        <option value="inside_sales_specialist">Inside Sales Specialist</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <i className="fa fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* Single Team Selection */}
                  {(formData.designation === "SR Inside Sales Specialist" || formData.designation === "inside_sales_specialist" || formData.designation === "ADV Leader") && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Assign Team</label>
                      <div className="relative">
                        <select 
                          name="team" 
                          value={formData.team} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50 focus:bg-white text-slate-800 appearance-none font-medium cursor-pointer"
                          required
                        >
                          <option disabled value="" className="text-slate-400">Select Team</option>
                          {getteamName.map((team, index) => (
                            <option key={index} value={team.teamname}>{team.teamname}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                          <i className="fa fa-chevron-down text-xs"></i>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Multiple Teams Selection for Manager */}
                  {formData.designation === "ADV Manager" && (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-sm font-semibold text-slate-700 mb-3 flex justify-between items-center">
                        Managed Teams
                        <span className="text-xs font-normal text-slate-500 px-2 py-1 bg-white rounded-md border border-slate-200 shadow-sm">{teams.length} assigned</span>
                      </label>
                      
                      <div className="space-y-3">
                        {teams.map((team, index) => (
                          <div key={team.id} className="flex gap-2 items-center group">
                            <div className="relative flex-1">
                              <select
                                value={team.name}
                                onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-white text-slate-800 appearance-none font-medium cursor-pointer"
                                required
                              >
                                <option disabled value="" className="text-slate-400">Select Managed Team {index + 1}</option>
                                {getteamName.map((t, idx) => (
                                  <option key={idx} value={t.teamname}>{t.teamname}</option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <i className="fa fa-chevron-down text-xs"></i>
                              </div>
                            </div>
                            
                            {teams.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveTeam(team.id)}
                                className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg border border-red-100 transition-colors"
                                title="Remove Team"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleAddTeam}
                        className="mt-4 w-full py-2.5 border-2 border-dashed border-blue-200 hover:border-blue-400 text-blue-600 font-semibold rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <i className="fa fa-plus text-xs"></i> Add Another Team
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all"
                  >
                    {editingBdaId ? "Save Changes" : "Create Member"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Credentials</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Team / Assignment</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status & Access</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bda && bda.length > 0 ? (
                  bda
                    .filter((member) => {
                      if (selectedTeamFilter && selectedTeamFilter !== "") {
                        return member.team && member.team.includes(selectedTeamFilter);
                      }
                      return true;
                    })
                    .map((member, index) => (
                      <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                        {/* Member Details */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 capitalize">
                              {member.fullname}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mt-1 w-max">
                              {member.designation.replace('ADV ', '')}
                            </span>
                          </div>
                        </td>

                        {/* Credentials */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-sm text-slate-700 font-medium flex items-center gap-2">
                              <i className="fa fa-envelope text-slate-400 text-xs w-3"></i> 
                              {member.email}
                            </span>
                            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 w-max flex items-center gap-2 border border-slate-200 shadow-inner">
                              <i className="fa fa-lock text-slate-400 text-xs w-3"></i> 
                              {member.password}
                            </span>
                          </div>
                        </td>

                        {/* Team Assignment */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 font-medium max-w-[200px] truncate" title={member.team}>
                            {member.team || <span className="text-slate-400 italic">No team</span>}
                          </div>
                        </td>

                        {/* Status & Access */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border ${
                              member.status === 'Active'
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}>
                              {member.status}
                            </span>
                            
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() => handleloginteam(member._id, member.designation)}
                                className="bg-slate-800 hover:bg-slate-900 text-white text-[11px] px-3 py-1 rounded shadow-sm font-bold flex items-center gap-1.5 transition-colors"
                                title="Login as this user"
                              >
                                Login <i className="fa fa-sign-in"></i>
                              </button>
                              
                              <button
                                onClick={() => handleChangeAccess(member._id, member.Access)}
                                className={`w-6 h-6 rounded flex items-center justify-center transition-colors border shadow-sm ${
                                  member.Access 
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" 
                                    : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                }`}
                                title={member.Access ? "Team Create Access: Granted" : "Team Create Access: Denied"}
                              >
                                <i className={`fa fa-${member.Access ? 'check' : 'ban'} text-xs`}></i>
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleSendEmail(member)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                member.mailSended 
                                  ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" 
                                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                              }`}
                              title={member.mailSended ? "Credentials sent previously" : "Send Login Credentials"}
                            >
                              <i className={`fa ${member.mailSended ? 'fa-check' : 'fa-paper-plane'} text-sm`}></i>
                            </button>
                            <div className="w-px h-6 bg-slate-200 mx-1"></div>
                            <button
                              onClick={() => handleEdit(member)}
                              className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                              title="Edit"
                            >
                              <i className="fa fa-edit text-sm"></i>
                            </button>
                            <button
                              onClick={() => handleChangeStatus(member._id, "Inactive")}
                              className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center justify-center transition-colors"
                              title="Deactivate (Set Inactive)"
                            >
                              <i className="fa fa-eye-slash text-sm"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(member._id)}
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                              title="Delete Permanently"
                            >
                              <i className="fa fa-trash text-sm"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      {!loading && (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fa fa-users text-2xl text-slate-400"></i>
                          </div>
                          <h3 className="text-sm font-medium text-slate-900">No team members found</h3>
                          <p className="text-sm text-slate-500 mt-1">Get started by adding a new team member.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdvTeam;
