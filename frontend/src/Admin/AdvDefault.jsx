import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AdvDefault = () => {
  const [defaultEnrollments, setDefaultEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const fetchDefaultEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/getadvenrolls`);
      const enrollments = response.data.data || response.data;
      
      const filtered = enrollments.filter(
        (item) => item.status === "default" || item.status === "Default"
      );
      
      setDefaultEnrollments(filtered);
      setFilteredEnrollments(filtered);
    } catch (error) {
      console.error("Error fetching default enrollments:", error);
      toast.error("Failed to load default enrollments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultEnrollments();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = defaultEnrollments.filter((enroll) => {
      return (
        (enroll.email && enroll.email.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.phone && enroll.phone.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.fullname && enroll.fullname.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.counselor && enroll.counselor.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.operationName && enroll.operationName.toLowerCase().includes(value.toLowerCase())) ||
        (enroll.domain && enroll.domain.toLowerCase().includes(value.toLowerCase()))
      );
    });
    setFilteredEnrollments(filtered);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB");
  };

  const groupedData = filteredEnrollments.reduce((acc, item) => {
    const date = formatDate(item.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const handleDialogOpen = (item) => {
    setDialogData(item);
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

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1e293b', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">ADV Default List</h1>
            <p className="text-slate-500 mt-1">View all defaulted advanced program enrollments.</p>
          </div>

          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl shadow-sm p-1.5 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-80">
              <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search by name, email, domain, phone..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 text-sm outline-none bg-transparent placeholder-slate-400 text-slate-700"
              />
            </div>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            <div className="px-4 py-2.5 bg-slate-50 rounded-lg whitespace-nowrap">
              <span className="text-sm font-semibold text-slate-700">{filteredEnrollments.length} found</span>
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
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Program & Financials</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Team</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
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
                        <td colSpan="5" className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <i className="fa fa-calendar-day text-blue-500 text-sm"></i>
                            <span className="text-sm font-bold text-slate-800">{date}</span>
                            <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              {groupedData[date].length} enrollments
                            </span>
                          </div>
                        </td>
                      </tr>
                      
                      {groupedData[date].map((item, index) => (
                        <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                          {/* Sl No */}
                          <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                            {index + 1}
                          </td>

                          {/* Student Details */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800 capitalize mb-1">
                                {item.fullname || "N/A"}
                              </span>
                              <div className="flex items-center gap-3 text-xs text-slate-600">
                                <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                                  <i className="fa fa-envelope text-slate-400"></i> {item.email || "N/A"}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                                  <i className="fa fa-whatsapp text-emerald-500"></i> {item.whatsAppNumber || item.phone || "N/A"}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Program & Financials */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                  {item.domain || "N/A"}
                                </span>
                                <span className="text-xs text-slate-500">({item.monthOpted || "N/A"})</span>
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-sm">
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Price</span>
                                  <span className="font-semibold text-slate-700">₹{item.programPrice?.toLocaleString() || 0}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Paid</span>
                                  <span className="font-semibold text-emerald-600">₹{item.paidAmount?.toLocaleString() || 0}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Due Date</span>
                                  <span className="font-semibold text-rose-600">{item.clearPaymentMonth || "N/A"}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Assigned To */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-2 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">C</span>
                                <span className="text-slate-700 font-medium">{item.counselor || "N/A"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold">E</span>
                                <span className="text-slate-600">{item.executive || item.lead || "N/A"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded bg-teal-100 text-teal-600 flex items-center justify-center text-[10px] font-bold">O</span>
                                <span className="text-slate-600">{item.operationName || "N/A"}</span>
                              </div>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3 text-sm">
                              <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                {convertToIST(item.createdAt)}
                              </span>
                              <button
                                onClick={() => handleDialogOpen(item)}
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
                    <td colSpan="5" className="px-6 py-20 text-center">
                      {!loading && (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fa fa-ban text-2xl text-slate-300"></i>
                          </div>
                          <h3 className="text-base font-bold text-slate-800">No defaulted enrollments</h3>
                          <p className="text-sm text-slate-500 mt-1 max-w-sm">There are currently no enrollments marked as default.</p>
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
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* Dialog Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Enrollment Details</h2>
                  <p className="text-sm font-medium text-blue-600 mt-1 capitalize">{dialogData.fullname}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Personal & Academic Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">Personal & Academic</h3>
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 mb-1">Email Address</span>
                          <span className="text-sm font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">{dialogData.email || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 mb-1">Phone Number</span>
                          <span className="text-sm font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">{dialogData.phone || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 mb-1">College Name</span>
                          <span className="text-sm font-semibold text-slate-800">{dialogData.collegeName || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-1">Branch</span>
                            <span className="text-sm font-semibold text-slate-800">{dialogData.branch || "N/A"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-1">Year of Passing</span>
                            <span className="text-sm font-semibold text-slate-800">{dialogData.yearOfPassingOut || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">Program Info</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-1">Domain</span>
                            <span className="text-sm font-bold text-blue-600">{dialogData.domain || "N/A"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-1">Batch Timing</span>
                            <span className="text-sm font-semibold text-slate-800">{dialogData.batchTiming || "N/A"}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-1">Company Target</span>
                            <span className="text-sm font-semibold text-slate-800">{dialogData.companyName || "N/A"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-1">Role Target</span>
                            <span className="text-sm font-semibold text-slate-800">{dialogData.role || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Financials & Status */}
                  <div className="space-y-6">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-200">Financial Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-600">Total Program Price</span>
                          <span className="text-sm font-bold text-slate-800">₹{dialogData.programPrice?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-emerald-600">Amount Paid</span>
                          <span className="text-sm font-bold text-emerald-600">₹{dialogData.paidAmount?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <span className="text-sm font-bold text-rose-600">Remaining Balance</span>
                          <span className="text-lg font-black text-rose-600">₹{dialogData.remainingAmount?.toLocaleString() || 0}</span>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-1">Payment Mode</span>
                            <span className="text-sm font-semibold text-slate-800 uppercase">{dialogData.modeofpayment || "N/A"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 mb-1">Due Date (Clear Month)</span>
                            <span className="text-sm font-semibold text-rose-600">{dialogData.clearPaymentMonth || "N/A"}</span>
                          </div>
                        </div>
                        <div className="flex flex-col mt-3">
                          <span className="text-xs text-slate-500 mb-1">Transaction ID</span>
                          <span className="text-xs font-mono font-medium text-slate-700 bg-white px-2 py-1 rounded border border-slate-200 break-all">{dialogData.transactionId || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">System Status</h3>
                      <div className="grid grid-cols-2 gap-y-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-slate-500">Account Created</span>
                          <div className="flex items-center gap-1.5">
                            {dialogData.userCreated ? (
                              <><i className="fa fa-check-circle text-emerald-500"></i><span className="text-sm font-semibold text-emerald-700">Yes</span></>
                            ) : (
                              <><i className="fa fa-times-circle text-rose-500"></i><span className="text-sm font-semibold text-rose-700">No</span></>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-slate-500">Welcome Mail</span>
                          <div className="flex items-center gap-1.5">
                            {dialogData.mailSended ? (
                              <><i className="fa fa-check-circle text-emerald-500"></i><span className="text-sm font-semibold text-emerald-700">Sent</span></>
                            ) : (
                              <><i className="fa fa-times-circle text-rose-500"></i><span className="text-sm font-semibold text-rose-700">Pending</span></>
                            )}
                          </div>
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

export default AdvDefault;
