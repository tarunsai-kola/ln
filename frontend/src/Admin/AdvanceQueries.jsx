import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AdvanceQueries = () => {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const getQueries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/advancequeries`);
      setQueries(response.data);
      setFilteredQueries(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load advance queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = queries.filter((query) => {
      return (
        (query.email && query.email.toLowerCase().includes(value.toLowerCase())) ||
        (query.phone && query.phone.toLowerCase().includes(value.toLowerCase())) ||
        (query.name && query.name.toLowerCase().includes(value.toLowerCase())) ||
        (query.currentRole && query.currentRole.toLowerCase().includes(value.toLowerCase())) ||
        (query.interestedDomain && query.interestedDomain.toLowerCase().includes(value.toLowerCase()))
      );
    });
    setFilteredQueries(filtered);
  };

  const handleSelectChange = async (event, id) => {
    const updatedAction = event.target.value;
    try {
      await axios.put(`${API}/advancequery/${id}`, { action: updatedAction });
      toast.success("Query updated successfully");
      getQueries(); // Refresh data to get updated background colors etc.
    } catch (error) {
      console.error("Error updating query:", error);
      toast.error("Failed to update query status");
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };

  const groupedData = filteredQueries.reduce((acc, query) => {
    const date = formatDate(query.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(query);
    return acc;
  }, {});

  const handleDialogOpen = (query) => {
    setDialogData(query);
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setDialogData(null);
  };

  const convertToIST = (utcDate) => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 0);
    date.setMinutes(date.getMinutes() + 0);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Status Badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "Shared":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Not Interested":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Already Paid":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Shared to CRM":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Unseen":
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1e293b', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Advance Course Queries</h1>
            <p className="text-slate-500 mt-1">Review and manage inbound queries for advance programs.</p>
          </div>

          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl shadow-sm p-1.5 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-80">
              <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search by name, email, phone, role..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 text-sm outline-none bg-transparent placeholder-slate-400 text-slate-700"
              />
            </div>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            <div className="px-4 py-2.5 bg-slate-50 rounded-lg whitespace-nowrap">
              <span className="text-sm font-semibold text-slate-700">{filteredQueries.length} found</span>
            </div>
          </div>
        </div>

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
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">#</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Candidate Profile</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Professional Background</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Program Interest</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status & Action</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.keys(groupedData).length > 0 ? (
                  Object.keys(groupedData).sort((a, b) => {
                    const dateA = a.split("/").reverse().join("");
                    const dateB = b.split("/").reverse().join("");
                    return dateB.localeCompare(dateA);
                  }).map((date) => (
                    <React.Fragment key={date}>
                      {/* Date Group Header */}
                      <tr className="bg-slate-50/80 border-y border-slate-200">
                        <td colSpan="6" className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <i className="fa fa-calendar-day text-blue-500 text-sm"></i>
                            <span className="text-sm font-bold text-slate-800">{date}</span>
                            <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              {groupedData[date].length} queries
                            </span>
                          </div>
                        </td>
                      </tr>
                      
                      {groupedData[date].map((query, index) => (
                        <tr key={query._id} className={`hover:bg-slate-50 transition-colors group ${query.action === 'Unseen' || !query.action ? 'bg-amber-50/30' : ''}`}>
                          {/* Sl No */}
                          <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                            {index + 1}
                          </td>

                          {/* Candidate Profile */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800 capitalize mb-1">
                                {query.name || "N/A"}
                              </span>
                              <div className="flex items-center gap-3 text-xs text-slate-600">
                                <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                                  <i className="fa fa-envelope text-slate-400"></i> {query.email || "N/A"}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                                  <i className="fa fa-phone text-emerald-500"></i> {query.phone || "N/A"}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Professional Background */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-semibold text-slate-700 capitalize">
                                  {query.currentRole || "N/A"}
                                </span>
                                {query.passedOutYear && (
                                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                    Class of {query.passedOutYear}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <i className="fa fa-briefcase text-slate-400"></i>
                                {query.experience ? `${query.experience} Experience` : "No experience listed"}
                              </div>
                            </div>
                          </td>

                          {/* Program Interest */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1.5">
                              <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100 w-fit capitalize">
                                {query.interestedDomain || "N/A"}
                              </span>
                              <span className="text-xs text-slate-500 truncate max-w-[200px] capitalize">
                                <span className="font-medium">Goal:</span> {query.goal === "Other" ? query.goalOther : query.goal || "N/A"}
                              </span>
                            </div>
                          </td>

                          {/* Status & Action */}
                          <td className="px-6 py-4">
                            <div className="relative w-full max-w-[160px]">
                              <select
                                value={query.action || "Unseen"}
                                onChange={(event) => handleSelectChange(event, query._id)}
                                className={`w-full text-xs font-bold appearance-none border rounded-lg px-3 py-2 outline-none transition-all cursor-pointer pr-8 ${getStatusBadge(query.action)}`}
                              >
                                <option value="Unseen">Unseen</option>
                                <option value="Shared">Shared</option>
                                <option value="Not Interested">Not Interested</option>
                                <option value="Already Paid">Already Paid</option>
                                <option value="Shared to CRM">Shared to CRM</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 opacity-50">
                                <i className="fa fa-chevron-down text-[10px]"></i>
                              </div>
                            </div>
                          </td>

                          {/* Details */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3 text-sm">
                              <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                {convertToIST(query.createdAt)}
                              </span>
                              <button
                                onClick={() => handleDialogOpen(query)}
                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white border border-blue-100 transition-all group-hover:shadow-sm"
                                title="View More Details"
                              >
                                <i className="fa fa-info-circle text-sm"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      {!loading && (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fa fa-inbox text-2xl text-slate-300"></i>
                          </div>
                          <h3 className="text-base font-bold text-slate-800">No queries found</h3>
                          <p className="text-sm text-slate-500 mt-1 max-w-sm">There are no advanced course queries matching your search criteria.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* More Details Dialog Overlay */}
        {dialogVisible && dialogData && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* Dialog Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Query Details</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm font-medium text-blue-600 capitalize">{dialogData.name}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(dialogData.action)}`}>
                      {dialogData.action || "Unseen"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleDialogClose}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm"
                >
                  <i className="fa fa-times text-lg"></i>
                </button>
              </div>

              {/* Dialog Content */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-white">
                <div className="space-y-8">
                  
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 mb-1">Email Address</span>
                        <span className="text-sm font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">{dialogData.email || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 mb-1">Phone Number</span>
                        <span className="text-sm font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">{dialogData.phone || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Background */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">Professional Background</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 mb-1">Current Role</span>
                        <span className="text-sm font-semibold text-slate-800 capitalize">{dialogData.currentRole || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 mb-1">Experience Level</span>
                        <span className="text-sm font-semibold text-slate-800">{dialogData.experience || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 mb-1">Passed Out Year</span>
                        <span className="text-sm font-semibold text-slate-800">{dialogData.passedOutYear || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Query & Interests */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-200">Query Details</h3>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 mb-1">Interested Domain</span>
                          <span className="text-sm font-bold text-blue-600 capitalize">{dialogData.interestedDomain || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 mb-1">Specific Domain Mentioned</span>
                          <span className="text-sm font-semibold text-slate-800 capitalize">
                            {dialogData.domain === "Other" ? dialogData.domainOther : dialogData.domain || "N/A"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col pt-4 border-t border-slate-200">
                        <span className="text-xs text-slate-500 mb-2">Primary Goal</span>
                        <p className="text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100 capitalize">
                          {dialogData.goal === "Other" ? dialogData.goalOther : dialogData.goal || "N/A"}
                        </p>
                      </div>

                      {dialogData.reason && (
                        <div className="flex flex-col pt-4 border-t border-slate-200">
                          <span className="text-xs text-slate-500 mb-2">Detailed Reason / Message</span>
                          <p className="text-sm text-slate-700 bg-white p-4 rounded-xl border border-slate-100 leading-relaxed italic">
                            "{dialogData.reason}"
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500">Query Submitted On</span>
                          <span className="text-xs font-bold text-slate-700">
                            {formatDate(dialogData.createdAt)} at {convertToIST(dialogData.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvanceQueries;
