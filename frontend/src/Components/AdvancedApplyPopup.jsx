/* eslint-disable react/prop-types, no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import API from "../API";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaEnvelope, FaBriefcase, FaGraduationCap, FaBullseye, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import AccenlearnLogo from "../assets/accenlearn-logo.png";
import SubhraImg from "../assets/mentors/Subhra.jpg";
import RudraImg from "../assets/mentors/rudra.jpg";
import RohanImg from "../assets/alumni/alumni_1.png";
import RajaImg from "../assets/alumni/raja_singh.png";
import PrabhleenImg from "../assets/alumni/alumni_2.png";

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

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendOTP = async () => {
        const trimmedEmail = formData.email.trim();
        // More standard and loose regex to avoid blocking valid emails
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
            toast.error("Please enter a valid email address (e.g. name@company.com)");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${API}/advance-send-otp`, { email: trimmedEmail });
            setOtpSent(true);
            toast.success("OTP sent to your email");
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.error || "Error sending OTP. Please try again.";
            toast.error(errorMsg);
            console.error("OTP send error:", error);
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async () => {
        if (!otp) {
            toast.error("Please enter the OTP.");
            return;
        }
        setLoading(true);
        try {
            const trimmedEmail = formData.email.trim();
            const trimmedOtp = otp.trim();
            console.log("Verifying OTP for:", trimmedEmail, "with code:", trimmedOtp);
            const response = await axios.post(`${API}/advance-verify-otp`, {
                email: trimmedEmail,
                otp: trimmedOtp,
            });
            if (response.data.success || response.data.token) {
                setEmailVerified(true);
                setOtpSent(false);
                toast.success("Email verified successfully");
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Invalid OTP. Please check and try again.";
            toast.error(errorMsg);
            console.error("OTP verify error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!emailVerified) {
            toast.error("Please verify your email first.");
            return;
        }
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0b]/80 backdrop-blur-md p-4 md:p-6 overflow-y-auto animate-in fade-in duration-300">
            <div className="w-full max-w-[950px] my-auto h-fit min-h-[500px] md:h-[650px] bg-white rounded-[24px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 border border-white/10">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    title="Close"
                    style={{
                        position: 'absolute',
                        top: '24px',
                        right: '24px',
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ff4d4d', // Red for clear visibility
                        color: 'white',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        zIndex: 200,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    ✕
                </button>

                {/* Left Side: Professional Info Column */}
                {/* Left Side: Premium Modern Info Column */}
                <div className="hidden md:flex md:w-[42%] bg-gradient-to-br from-gray-900 via-slate-900 to-black p-10 flex-col justify-between relative overflow-hidden group shadow-inner">
                    <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-[#0F7B53]/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#0F7B53]/30 transition-all duration-700" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="mb-10 drop-shadow-2xl bg-white/5 p-4 rounded-2xl inline-block border border-white/10 backdrop-blur-sm">
                            <img src={AccenlearnLogo} alt="Accenlearn Logo" className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-[1.1] mb-5 tracking-tight">
                            Accelerate <br/>Your Tech <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F7B53] to-emerald-400">Career.</span>
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed mb-10 font-medium border-l-2 border-[#0F7B53] pl-4">
                            Join the elite upskilling ecosystem designed exclusively for modern tech professionals.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: <FaCheckCircle />, title: "Premium Curriculum", desc: "Crafted by Top 1% Engineers" },
                                { icon: <FaCheckCircle />, title: "AI-First Approach", desc: "Build with GenAI & Modern Stacks" },
                                { icon: <FaCheckCircle />, title: "Elite Network", desc: "Direct referrals to 500+ partners" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
                                    <div className="text-[#0F7B53] mt-0.5 text-lg">{item.icon}</div>
                                    <div>
                                        <p className="text-gray-100 font-bold text-sm tracking-wide">{item.title}</p>
                                        <p className="text-gray-400 text-[11px] leading-relaxed mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 pt-8 mt-6 border-t border-white/10">
                        <div className="flex -space-x-3 mb-4">
                            {[SubhraImg, RudraImg, RohanImg, RajaImg, PrabhleenImg].map((img, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform">
                                    <img src={img} alt="alumni" className="w-full h-full object-cover object-top" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-[#0F7B53] flex items-center justify-center text-[11px] font-bold text-white shadow-lg z-10">
                                +5k
                            </div>
                        </div>
                        <p className="text-gray-400 text-[11px] font-medium leading-relaxed">Join 5000+ alumni working at top tech giants globally.</p>
                    </div>
                </div>

                {/* Right Side: Professional Form Column */}
                <div className="w-full md:w-[62%] bg-white p-8 md:p-12 flex flex-col h-full overflow-hidden">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                                <FaCheckCircle className="text-emerald-500 text-5xl" />
                            </div>
                            <h3 className="text-3xl font-black text-[#050d2f]">Successfully Sent!</h3>
                            <p className="text-slate-500 max-w-sm mx-auto leading-relaxed text-sm">
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
                        <>
                            <div className="mb-0">
                                <h3 className="text-2xl font-black text-[#050d2f]">
                                    {popupType === "brochure" ? "Download Curriculum" : "Program Application"}
                                </h3>
                                <p className="text-slate-400 text-sm mt-1">
                                    {popupType === "brochure" 
                                        ? "Complete the details to access the complete syllabus."
                                        : "Complete the steps below to secure your spot."}
                                </p>
                            </div>

                    <form id="advanced-apply-form" onSubmit={handleFormSubmit} className="mt-8 space-y-6 flex-1 overflow-y-auto px-1 custom-scrollbar pr-5 pb-20">
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
                                        placeholder="John Carter"
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
                                        disabled={emailVerified}
                                        required
                                        placeholder="john.carter@example.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                                {!emailVerified && !otpSent && (
                                    <button
                                        type="button"
                                        onClick={sendOTP}
                                        disabled={loading}
                                        className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all shadow-md active:scale-95"
                                    >
                                        Verify
                                    </button>
                                )}
                            </div>

                            {otpSent && !emailVerified && (
                                <div className="mt-4 flex gap-2 animate-in slide-in-from-top-4 duration-300">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="6-Digit OTP"
                                        className="flex-1 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl focus:bg-white focus:border-emerald-600 outline-none transition-all text-sm text-center font-black tracking-[0.4em]"
                                    />
                                    <button
                                        type="button"
                                        onClick={verifyOTP}
                                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            )}

                            {emailVerified && (
                                <div className="mt-2 flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest ml-1">
                                    <FaCheckCircle className="animate-bounce" /> Status: Verified
                                </div>
                            )}
                        </div>

                        {/* Custom Selects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                            <CustomSelect
                                label="Current Role"
                                icon={<FaGraduationCap className="text-emerald-500" />}
                                name="currentRole"
                                value={formData.currentRole}
                                onChange={handleInputChange}
                                placeholder="What's your role?"
                                options={[
                                    { value: "Student", label: "Student" },
                                    { value: "Working Professional", label: "Working Professional" },
                                    { value: "Self Employed", label: "Self Employed" }
                                ]}
                            />
                            <CustomSelect
                                label="Experience"
                                icon={<FaBriefcase className="text-emerald-500" />}
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="Years of exp."
                                options={[
                                    { value: "Fresher", label: "0 (Fresher)" },
                                    { value: "1-2 years", label: "1-2 Years" },
                                    { value: "3-5 years", label: "3-5 Years" },
                                    { value: "5+ years", label: "5+ Years" }
                                ]}
                            />
                        </div>

                        <CustomSelect
                            label="Target Program"
                            icon={<FaBullseye className="text-emerald-500" />}
                            name="interestedDomain"
                            value={formData.interestedDomain}
                            onChange={handleInputChange}
                            placeholder="Select intended learning path"
                            options={[
                                { value: "Data Science", label: "Data Science" },
                                { value: "Data Analytics", label: "Data Analytics" },
                                { value: "Digital Marketing", label: "Digital Marketing" },
                                { value: "Prompt Engineering with GenAI", label: "Prompt Engineering with GenAI" },
                                { value: "Product Management", label: "Product Management" },
                                { value: "MERN Stack Development", label: "MERN Stack Development" }
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
                    
                    {/* Submit Footer - Moved outside scrollable area */}
                    <div className="pt-6 mt-auto flex gap-3 border-t border-slate-100 bg-white">
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '16px',
                                backgroundColor: '#f1f5f9',
                                color: '#64748b',
                                fontWeight: 'bold',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '11px',
                                transition: 'background-color 0.2s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="advanced-apply-form"
                            disabled={!emailVerified || loading}
                            className="flex-[2] py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 group"
                        >
                            {loading ? "Securely Submitting..." : (popupType === "brochure" ? "Get Brochure" : "Send Application")} 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                        </>
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
