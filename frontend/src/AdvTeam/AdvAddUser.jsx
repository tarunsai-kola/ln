import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';
import { UserPlus, Mail, User, ShieldCheck, ChevronRight, CheckCircle2, History } from 'lucide-react';

const AdvAddUser = () => {
  const [fullname, setFullname] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [option, setOption] = useState('');
  const advTeamName = localStorage.getItem('advTeamName');
  
  const [getTransactionId, setGetTransactionId] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTransactionIdList = async () => {
    try {
      const response = await axios.get(`${API}/gettransactionid`);
      setGetTransactionId(response.data.filter((item) => item.counselor === advTeamName).reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExecutives = async () => {
    try {
      const response = await axios.get(`${API}/getmarketing`);
      setExecutives(response.data);
    } catch (error) {
      console.error('Error fetching executives:', error);
      toast.error('Failed to load executives');
    }
  };

  useEffect(() => {
    getTransactionIdList();
    fetchExecutives();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const isLeadOption = ['SGFL', 'CGFL', 'Meta Ads', 'LinkedIn Campaign', 'Email Campaign'].includes(option);
    const selectedExecutive = !isLeadOption ? executives.find(exec => exec.fullname === option) : null;

    const data = {
      fullname,
      transactionId,
      counselor: advTeamName,
      lead: isLeadOption ? option : undefined,
      executiveId: selectedExecutive?._id,
      executiveName: selectedExecutive?.fullname
    };
    
    try {
      await axios.post(`${API}/addtransactionid`, data);
      toast.success('Pre-enrollment generated successfully!');
      setFullname('');
      setTransactionId('');
      setOption('');
      getTransactionIdList();
    } catch (error) {
      toast.error('Error adding details or candidate already exists');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header Banner */}
      <div className="bg-indigo-600 rounded-3xl p-8 mb-8 shadow-lg shadow-indigo-200 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
          <UserPlus size={250} />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
            Candidate Pre-Enrollment
          </h1>
          <p className="text-indigo-100 font-medium max-w-xl">
            Hi <span className="font-bold text-white bg-indigo-500/50 px-2 py-0.5 rounded mx-1">{advTeamName}</span>, 
            please register the candidate's verified email ID below before sharing the official onboarding portal link.
          </p>
        </div>
        
        <div className="relative z-10 mt-6 md:mt-0 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
          <ShieldCheck className="text-emerald-300" size={24} />
          <div>
            <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Authentication Required</div>
            <div className="text-sm font-bold text-white">Secure Link Generation</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Form */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <UserPlus className="text-indigo-600" size={20} /> Register Candidate
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Candidate Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={fullname}
                    placeholder="Enter full name"
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Verified Email ID</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={transactionId}
                    placeholder="Candidate email address"
                    onChange={(e) => setTransactionId(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mt-1.5 ml-1">Must match the email used for onboarding.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Attribution Source</label>
                <select
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Lead Source or Executive</option>
                  <optgroup label="Direct Marketing Leads">
                    <option value="SGFL">SGFL (Self Generated)</option>
                    <option value="CGFL">CGFL (Company Generated)</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="LinkedIn Campaign">LinkedIn Campaign</option>
                    <option value="Email Campaign">Email Campaign</option>
                  </optgroup>
                  <optgroup label="Assigned Executives">
                    {executives.map((executive) => (
                      <option key={executive._id} value={executive.fullname}>
                        {executive.fullname}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="pt-2">
                <button 
                  disabled={isSubmitting} 
                  type="submit"
                  className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isSubmitting 
                    ? 'bg-indigo-400 cursor-not-allowed text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} /> Generate Onboarding Record
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: History Table */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <History className="text-indigo-500" size={20} /> Registration History
              </h3>
              <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold shadow-sm">
                Total: {getTransactionId.length}
              </span>
            </div>
            
            {getTransactionId.length === 0 ? (
              <div className="flex-1 p-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <UserPlus className="text-slate-300 w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">No Records Yet</h3>
                <p className="text-slate-500 text-sm">Candidates you register will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto flex-1 custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-12 text-center">#</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate Profile</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Attribution</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Date Added</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {getTransactionId.map((record, index) => (
                      <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-400 text-center">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm">{record.fullname}</span>
                            <span className="text-xs font-semibold text-indigo-600">{record.transactionId}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-slate-100 text-slate-600 border border-slate-200">
                            {record.executive || record.lead || 'Not Assigned'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs font-semibold text-slate-500">
                            {record.createdAt ? new Date(record.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdvAddUser;
