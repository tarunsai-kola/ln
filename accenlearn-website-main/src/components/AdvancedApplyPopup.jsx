/* eslint-disable react/prop-types, no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { IMAGE_HELPER } from "../shared/ImageHelper";
import SubhraImg from "../assets/LeaderShip/technical-advisor.png";
import RudraImg from "../assets/LeaderShip/Operation head.png";
import RohanImg from "../assets/LeaderShip/marketing-head.png";
import RajaImg from "../assets/LeaderShip/executivedirector.png";
import PrabhleenImg from "../assets/LeaderShip/anjali-a.png";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaEnvelope, FaBriefcase, FaGraduationCap, FaBullseye, FaCheckCircle, FaChevronDown } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Custom Select Component for a more professional look
const CustomSelect = ({ label, icon, options, name, value, onChange, placeholder, required }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`relative group ${isOpen ? 'z-[1001]' : 'z-[1]'}`} ref={dropdownRef}>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block ml-1 flex items-center gap-2">
                {icon} {label}
            </label>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 bg-slate-50 border ${isOpen ? 'border-emerald-600 ring-4 ring-emerald-600/5' : 'border-slate-200'} rounded-xl cursor-pointer flex items-center justify-between transition-all hover:bg-white`}
            >
                <span className={`text-sm font-medium ${!value ? 'text-slate-400' : 'text-slate-900'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <FaChevronDown className={`text-slate-400 text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-[1002] top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange({ target: { name, value: opt.value } });
                                setIsOpen(false);
                            }}
                            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${value === opt.value ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            {opt.label}
                            {value === opt.value && <FaCheckCircle className="text-xs" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const AdvancedApplyPopup = ({ onClose, initialDomain = "", onSuccess, popupType = "apply" }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        currentRole: "",
        experience: "",
        goal: "",
        interestedDomain: initialDomain,
    });

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API}/advance/register`, {
                ...formData,
                phone: formData.number,
                domain: formData.interestedDomain, // Map to what the backend expects
            });
            toast.success("Application submitted successfully!");
            setIsSuccess(true);
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || "Submission failed");
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-[#0a0a0b]/80 backdrop-blur-md md:p-6 overflow-hidden animate-in fade-in duration-300">
            <div className="w-full max-w-[950px] mt-auto md:my-auto h-[92vh] md:h-fit md:min-h-[500px] xl:h-[650px] bg-white rounded-t-[32px] md:rounded-[24px] shadow-2xl relative flex flex-col md:flex-row animate-in slide-in-from-bottom-full md:zoom-in-95 duration-300 border border-white/10 overflow-hidden">
                
                {/* Mobile Drag Handle (Visual) */}
                <div className="w-full flex justify-center pt-4 pb-2 md:hidden absolute top-0 left-0 bg-white z-[150] rounded-t-[32px]">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                </div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    title="Close"
                    className="absolute top-5 right-5 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-slate-100 hover:bg-rose-500 text-slate-500 hover:text-white rounded-full flex items-center justify-center text-sm md:text-lg font-bold z-[200] shadow-sm transition-all duration-200"
                >
                    ✕
                </button>

                {/* Left Side: Premium Modern Info Column (Light Theme) */}
                <div className="hidden md:flex md:w-[42%] bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 p-10 flex-col justify-between relative overflow-hidden group shadow-inner border-r border-slate-100">
                    <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="mb-10 inline-block h-12">
                            <img src={IMAGE_HELPER.LOGO} alt="Accenlearn" className="h-full object-contain drop-shadow-sm" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.15] mb-5 tracking-tight">
                            Accelerate <br/>Your Tech <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Career.</span>
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-10 font-medium border-l-2 border-emerald-500 pl-4">
                            Join the elite upskilling ecosystem designed exclusively for modern tech professionals.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: <FaCheckCircle />, title: "Premium Curriculum", desc: "Crafted by Top 1% Engineers" },
                                { icon: <FaCheckCircle />, title: "AI-First Approach", desc: "Build with GenAI & Modern Stacks" },
                                { icon: <FaCheckCircle />, title: "Elite Network", desc: "Direct referrals to 500+ partners" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-3.5 rounded-xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all">
                                    <div className="text-emerald-500 mt-0.5 text-lg">{item.icon}</div>
                                    <div>
                                        <p className="text-slate-800 font-bold text-sm tracking-wide">{item.title}</p>
                                        <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 pt-8 mt-6 border-t border-slate-200">
                        <div className="flex -space-x-3 mb-4">
                            {[SubhraImg, RudraImg, RohanImg, RajaImg, PrabhleenImg].map((img, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm transform hover:-translate-y-1 transition-transform">
                                    <img src={img} alt="alumni" className="w-full h-full object-cover object-top" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-600 flex items-center justify-center text-[11px] font-bold text-white shadow-sm z-10">
                                +5k
                            </div>
                        </div>
                        <p className="text-slate-500 text-[11px] font-medium leading-relaxed">Join 5000+ alumni working at top tech giants globally.</p>
                    </div>
                </div>

                {/* Right Side: Professional Form Column */}
                <div className="w-full md:w-[62%] bg-white pt-14 pb-6 px-6 md:p-12 flex flex-col h-full relative z-10 overflow-hidden">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in zoom-in duration-500">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                                <FaCheckCircle className="text-emerald-500 text-4xl md:text-5xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-[#050d2f]">Successfully Sent!</h3>
                            <p className="text-slate-500 max-w-sm mx-auto leading-relaxed text-xs md:text-sm">
                                Thank you for your application. Our team will review your details and connect with you shortly.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-8 px-10 py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg uppercase tracking-widest text-xs"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div className="mb-0 flex-shrink-0">
                                <h3 className="text-xl md:text-2xl font-black text-[#050d2f]">
                                    {popupType === "brochure" ? "Download Curriculum" : "Program Application"}
                                </h3>
                                <p className="text-slate-400 text-xs md:text-sm mt-1">
                                    {popupType === "brochure" 
                                        ? "Complete the details to access the complete syllabus."
                                        : "Complete the steps below to secure your spot."}
                                </p>
                            </div>

                    <form id="advanced-apply-form" onSubmit={handleFormSubmit} className="mt-6 md:mt-8 space-y-5 flex-1 overflow-y-auto px-1 custom-scrollbar pr-3 md:pr-5 pb-6">
                        {/* Name & Phone Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block ml-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                        <FaUser size={14} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Rahul Sharma"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block ml-1">Mobile Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                        <FaPhone size={14} />
                                    </div>
                                    <input
                                        type="number"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your 10 digit mobile"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email with Logic */}
                        <div className="relative group">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block ml-1">Work/Personal Email</label>
                            <div className="relative flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                        <FaEnvelope size={14} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="rahul.sharma@example.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Target Program & Primary Goal section moved up, removing previous grid */}

                        <CustomSelect
                            label="Target Program"
                            icon={<FaBullseye className="text-emerald-500" />}
                            name="interestedDomain"
                            value={formData.interestedDomain}
                            onChange={handleInputChange}
                            placeholder="Select intended learning path"
                            options={[
                                { value: "Artificial Intelligence", label: "Artificial Intelligence" },
                                { value: "Data Structures and Algorithms", label: "Data Structures and Algorithms" },
                                { value: "Full Stack Software Development", label: "Full Stack Software Development" },
                                { value: "Machine Learning", label: "Machine Learning" },
                                { value: "Data Science", label: "Data Science" },
                                { value: "Cloud Computing", label: "Cloud Computing" },
                                { value: "Cyber Security", label: "Cyber Security" },
                                { value: "Data Analytics", label: "Data Analytics" },
                                { value: "DevOps", label: "DevOps" },
                                { value: "SQL", label: "SQL" },
                                { value: "Digital Marketing", label: "Digital Marketing" },
                                { value: "Human Resource", label: "Human Resource" },
                                { value: "Finance", label: "Finance" },
                                { value: "Business Analytics", label: "Business Analytics" },
                                { value: "Stock Market", label: "Stock Market" },
                                { value: "Graphics Designing", label: "Graphics Designing" },
                                { value: "Psychology", label: "Psychology" },
                                { value: "Medical Coding", label: "Medical Coding" }
                            ]}
                        />

                        <CustomSelect
                            label="Primary Goal"
                            icon={<FaCheckCircle className="text-emerald-500" />}
                            name="goal"
                            value={formData.goal}
                            onChange={handleInputChange}
                            placeholder="What do you want to achieve?"
                            options={[
                                { value: "Career Transition", label: "Career Transition" },
                                { value: "Upskilling", label: "Upskilling" },
                                { value: "Other", label: "Other" }
                            ]}
                        />

                        {/* Authorization Checkbox */}
                        <div className="flex items-start gap-3 mt-4 mb-2 animate-in fade-in duration-500">
                            <input 
                                type="checkbox" 
                                id="authorize_popup" 
                                required 
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 cursor-pointer"
                            />
                            <label htmlFor="authorize_popup" className="text-[10px] md:text-[11px] text-slate-500 leading-relaxed cursor-pointer select-none">
                                I authorise <span className="font-bold">Accenlearn</span> & its representatives to contact me with updates and notifications via Email/SMS/WhatsApp/Call. This will override DND/NDNC
                            </label>
                        </div>

                    </form>
                    
                    {/* Submit Footer - Fixed at bottom */}
                    <div className="pt-4 md:pt-6 mt-4 flex-shrink-0 flex gap-3 border-t border-slate-100 bg-white">
                        <button
                            type="button"
                            onClick={onClose}
                            className="hidden md:block flex-1 py-4 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-xl transition-all uppercase tracking-widest text-[11px]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="advanced-apply-form"
                            disabled={loading}
                            className="flex-[2] py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 group"
                        >
                            {loading ? "Submitting..." : (popupType === "brochure" ? "Get Brochure" : "Apply Now")} 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                        </div>
                    )}
                </div>
            </div>
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            `}</style>
        </div>,
        document.body
    );
};

export default AdvancedApplyPopup;
