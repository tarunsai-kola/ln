import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import API from "../API";
import {
  Users,
  UserCheck,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ShieldAlert,
  Briefcase,
  BookOpen,
  RefreshCw,
  X,
  UserX,
  Plus,
  Sparkles
} from "lucide-react";

const AssignMentorOp = () => {
  const [mentors, setMentors] = useState([]);
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOp, setFilterOp] = useState("all"); // 'all', 'assigned', 'unassigned', or opId

  // Selection for bulk assignment
  const [selectedMentorIds, setSelectedMentorIds] = useState([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetMentors, setTargetMentors] = useState([]); // Array of mentors being assigned
  const [selectedOpId, setSelectedOpId] = useState("");
  const [perSessionRate, setPerSessionRate] = useState(0);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mentorsRes, opsRes] = await Promise.all([
        axios.get(`${API}/api/mentor-checkin/mentors-with-ops`),
        axios.get(`${API}/api/mentor-checkin/operations-list`)
      ]);
      setMentors(mentorsRes.data || []);
      setOperations(opsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load mentor and operation data");
    } finally {
      setLoading(false);
    }
  };

  // Open modal for single mentor
  const handleOpenSingleAssign = (mentor) => {
    setTargetMentors([mentor]);
    setSelectedOpId(mentor.assignedOperationId || "");
    setPerSessionRate(mentor.perSessionRate || 0);
    setIsModalOpen(true);
  };

  // Open modal for bulk assignment
  const handleOpenBulkAssign = () => {
    if (selectedMentorIds.length === 0) {
      toast.error("Please select at least one mentor to assign");
      return;
    }
    const selectedList = mentors.filter((m) => selectedMentorIds.includes(m._id));
    setTargetMentors(selectedList);
    setSelectedOpId("");
    setPerSessionRate(0);
    setIsModalOpen(true);
  };

  // Handle Assignment submit
  const handleSaveAssignment = async (e) => {
    e.preventDefault();
    if (!selectedOpId) {
      toast.error("Please select an Operation Executive");
      return;
    }

    const chosenOp = operations.find((o) => o._id === selectedOpId);
    if (!chosenOp) {
      toast.error("Invalid Operation selection");
      return;
    }

    setAssigning(true);
    try {
      const mentorIds = targetMentors.map((m) => m._id);

      if (mentorIds.length === 1) {
        await axios.post(`${API}/api/mentor-checkin/assign-operation`, {
          mentorId: mentorIds[0],
          operationId: chosenOp._id,
          operationName: chosenOp.fullname,
          operationEmail: chosenOp.email,
          operationType: chosenOp.type,
          perSessionRate: Number(perSessionRate) || 0
        });
      } else {
        await axios.post(`${API}/api/mentor-checkin/bulk-assign-operation`, {
          mentorIds,
          operationId: chosenOp._id,
          operationName: chosenOp.fullname,
          operationEmail: chosenOp.email,
          operationType: chosenOp.type
        });
      }

      toast.success(`Successfully assigned ${mentorIds.length} mentor(s) to ${chosenOp.fullname}!`);
      setIsModalOpen(false);
      setSelectedMentorIds([]);
      fetchData();
    } catch (error) {
      console.error("Error saving assignment:", error);
      toast.error("Failed to assign mentor");
    } finally {
      setAssigning(false);
    }
  };

  // Unassign mentor
  const handleUnassign = async (mentor) => {
    if (!window.confirm(`Are you sure you want to unassign ${mentor.fullname} from operation?`)) {
      return;
    }
    try {
      await axios.post(`${API}/api/mentor-checkin/assign-operation`, {
        mentorId: mentor._id,
        operationId: null,
        operationName: "",
        operationEmail: "",
        operationType: "",
        perSessionRate: mentor.perSessionRate || 0
      });
      toast.success(`${mentor.fullname} unassigned from operation.`);
      fetchData();
    } catch (error) {
      console.error("Error unassigning:", error);
      toast.error("Failed to unassign mentor");
    }
  };

  // Toggle selection for bulk
  const handleSelectMentor = (id) => {
    setSelectedMentorIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (filteredList) => {
    if (selectedMentorIds.length === filteredList.length) {
      setSelectedMentorIds([]);
    } else {
      setSelectedMentorIds(filteredList.map((m) => m._id));
    }
  };

  // Filter mentors
  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.assignedOperationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.subjects && m.subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())));

    if (!matchesSearch) return false;

    if (filterOp === "all") return true;
    if (filterOp === "assigned") return !!m.assignedOperationId;
    if (filterOp === "unassigned") return !m.assignedOperationId;
    return m.assignedOperationId === filterOp;
  });

  const totalMentors = mentors.length;
  const assignedCount = mentors.filter((m) => m.assignedOperationId).length;
  const unassignedCount = totalMentors - assignedCount;

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50/70 font-sans p-6 sm:p-10 relative overflow-hidden md:ml-[265px] pt-24 pb-16">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1e293b', color: '#fff', borderRadius: '12px' }
      }} />

      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0">
              <UserCheck size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Assign Mentor OP
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Operation Alignment
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-1">
                Assign mentors to Operation team executives to verify daily class recordings and approve session pay
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-all active:scale-95"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-indigo-600" : ""} />
              Refresh
            </button>
            {selectedMentorIds.length > 0 && (
              <button
                onClick={handleOpenBulkAssign}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
              >
                <Users size={14} />
                Bulk Assign ({selectedMentorIds.length})
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Users size={22} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Mentors</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{totalMentors}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <CheckCircle size={22} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Assigned to OP</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-0.5">{assignedCount}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
              <ShieldAlert size={22} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Unassigned</p>
              <h3 className="text-2xl font-black text-amber-600 mt-0.5">{unassignedCount}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
              <Briefcase size={22} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">OP Executives</p>
              <h3 className="text-2xl font-black text-purple-600 mt-0.5">{operations.length}</h3>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by mentor name, email, subject, course, operation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <Filter size={15} className="text-slate-400 hidden sm:block" />
            <select
              value={filterOp}
              onChange={(e) => setFilterOp(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition-all cursor-pointer w-full md:w-auto"
            >
              <option value="all">All Mentors (Any Status)</option>
              <option value="assigned">Assigned to Operation Only</option>
              <option value="unassigned">Unassigned Mentors Only</option>
              <optgroup label="Filter by Specific Operation Executive">
                {operations.map((op) => (
                  <option key={op._id} value={op._id}>
                    {op.fullname} ({op.type})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-24 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-600 mb-3"></div>
              <p className="text-slate-500 font-semibold text-xs">Loading mentors and operation roster...</p>
            </div>
          ) : filteredMentors.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <Users size={44} className="mx-auto mb-3 text-slate-300" />
              <h3 className="text-base font-bold text-slate-700">No mentors found</h3>
              <p className="text-xs text-slate-400 mt-1">Try clearing your search or status filter</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={
                          filteredMentors.length > 0 &&
                          selectedMentorIds.length === filteredMentors.length
                        }
                        onChange={() => handleSelectAll(filteredMentors)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                    </th>
                    <th className="py-4 px-4">Mentor Info</th>
                    <th className="py-4 px-4">Assigned Course</th>
                    <th className="py-4 px-4">Assigned Operation</th>
                    <th className="py-4 px-4 text-center">Check-Ins / Uploads</th>
                    <th className="py-4 px-4 text-center">Session Rate</th>
                    <th className="py-4 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {filteredMentors.map((m) => {
                    const isSelected = selectedMentorIds.includes(m._id);
                    return (
                      <tr
                        key={m._id}
                        className={`hover:bg-slate-50/70 transition-colors ${
                          isSelected ? "bg-indigo-50/40" : ""
                        }`}
                      >
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectMentor(m._id)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                          />
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-sm flex-shrink-0">
                              {m.fullname ? m.fullname.charAt(0).toUpperCase() : "M"}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-snug">{m.fullname}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{m.email}</p>
                              {m.phone && <p className="text-xs text-slate-400 mt-0.5">{m.phone}</p>}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          {m.courseTitle ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              <BookOpen size={12} className="flex-shrink-0" />
                              <span className="truncate max-w-[200px]">{m.courseTitle}</span>
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 italic">No Course Linked</span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          {m.assignedOperationId ? (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                              <div>
                                <p className="font-bold text-emerald-900 text-xs leading-none">
                                  {m.assignedOperationName}
                                </p>
                                {m.assignedOperationEmail && (
                                  <p className="text-[10px] text-emerald-700 mt-0.5">
                                    {m.assignedOperationEmail}
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              <ShieldAlert size={12} />
                              Unassigned
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5 text-xs">
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 font-bold text-slate-700">
                              {m.stats?.total || 0} Total
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                              ✓ {m.stats?.verified || 0}
                            </span>
                            {m.stats?.pending > 0 && (
                              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
                                ⏳ {m.stats.pending}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-center font-bold text-slate-800">
                          {m.perSessionRate ? (
                            <span className="text-emerald-700 font-extrabold">
                              ₹{m.perSessionRate.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs font-normal">-</span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenSingleAssign(m)}
                              className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 hover:border-indigo-600 font-bold text-xs transition-all shadow-sm"
                            >
                              {m.assignedOperationId ? "Reassign" : "Assign OP"}
                            </button>
                            {m.assignedOperationId && (
                              <button
                                onClick={() => handleUnassign(m)}
                                title="Unassign operation"
                                className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                              >
                                <UserX size={15} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Assign Mentor to Operation</h3>
                  <p className="text-xs text-slate-500">
                    Operation will verify daily class recordings & approve session pay
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAssignment} className="p-6 space-y-5">
              {/* Target Mentor(s) Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Selected Mentor{targetMentors.length > 1 ? "s" : ""} ({targetMentors.length})
                </label>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 max-h-36 overflow-y-auto space-y-1.5">
                  {targetMentors.map((tm) => (
                    <div key={tm._id} className="flex items-center justify-between text-xs text-slate-700">
                      <span className="font-bold text-slate-900">{tm.fullname}</span>
                      <span className="text-slate-500 truncate max-w-[200px]">{tm.email}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Operation Executive */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Select Operation Executive <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={selectedOpId}
                  onChange={(e) => setSelectedOpId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="">-- Choose Operation Team Member --</option>
                  <optgroup label="Standard Operation Team">
                    {operations
                      .filter((o) => o.type === "Operation")
                      .map((op) => (
                        <option key={op._id} value={op._id}>
                          {op.fullname} ({op.email})
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="ADV Operation Team">
                    {operations
                      .filter((o) => o.type === "AdvOperation")
                      .map((op) => (
                        <option key={op._id} value={op._id}>
                          {op.fullname} ({op.email})
                        </option>
                      ))}
                  </optgroup>
                </select>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  The chosen operation executive will see these mentors in their "Mentor Check-In" dashboard tab.
                </p>
              </div>

              {/* Per Session Rate (₹) */}
              {targetMentors.length === 1 && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Default Per-Session Pay Rate (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={perSessionRate}
                      onChange={(e) => setPerSessionRate(e.target.value)}
                      placeholder="e.g. 1500"
                      className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Used to calculate pay when the operation department confirms the class recording.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigning}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {assigning ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white/20 border-t-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={14} />
                      Save Assignment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignMentorOp;
