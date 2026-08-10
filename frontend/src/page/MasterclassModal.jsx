import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API from "../API";

const MasterclassModal = ({ isOpen, onClose, workshopTitle }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post(`${API}/api/workshop/register`, {
                ...formData,
                workshopTitle
            });
            
            toast.success("Registration successful! Check your email for confirmation.");
            setTimeout(() => {
                onClose();
                setFormData({ name: "", email: "", phone: "", college: "" });
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong during registration.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-[#0F1115] p-6 text-white flex justify-between items-center relative">
                    <div>
                        <h2 className="text-xl font-bold">Workshop Registration</h2>
                        <p className="text-sm text-gray-400 mt-1">{workshopTitle}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors absolute top-6 right-6"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1462EE] focus:border-[#1462EE] outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1462EE] focus:border-[#1462EE] outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1462EE] focus:border-[#1462EE] outline-none transition-all"
                            placeholder="+1 234 567 8900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">College / University Name</label>
                        <input
                            type="text"
                            name="college"
                            required
                            value={formData.college}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1462EE] focus:border-[#1462EE] outline-none transition-all"
                            placeholder="CRD College of Engineering"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 mt-4 rounded-lg font-semibold text-white transition-all ${
                            isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-[#1462EE] hover:bg-blue-700"
                        }`}
                    >
                        {isLoading ? "Registering..." : "Confirm Registration"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MasterclassModal;
