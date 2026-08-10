import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import MasterclassModal from "./MasterclassModal";
import { Toaster } from "react-hot-toast";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// Sample placeholder logos for the collaboration section
const IEEE_LOGO = "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg";
const IET_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/IET_Logo.svg/512px-IET_Logo.svg.png";

// Removed hardcoded WORKSHOPS array

const Masterclass = () => {
    const [workshops, setWorkshops] = useState([]);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const res = await axios.get(`${API}/api/workshop/list`);
                setWorkshops(res.data);
            } catch (error) {
                console.error("Failed to fetch workshops", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkshops();
    }, []);

    const handleRegisterClick = (workshop) => {
        setSelectedWorkshop(workshop.title);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white min-h-screen font-display text-gray-900">
            <Header />

            {/* Hero Section */}
            <div className="bg-[#0F1115] text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Accenlearn Masterclass Workshops</h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                    Accelerate your career with our intensive, hands-on workshops led by industry experts.
                </p>
            </div>

            {/* Collaboration Section */}
            <div className="py-12 bg-gray-50 border-b">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">In Collaboration With</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        <img src={IEEE_LOGO} alt="IEEE Logo" className="h-12 opacity-80 hover:opacity-100 transition-opacity" />
                        {/* <img src={IET_LOGO} alt="IET Logo" className="h-12 opacity-80 hover:opacity-100 transition-opacity" /> */}
                        <div className="text-left">
                            <span className="block font-bold text-lg text-gray-800">R&D Cell</span>
                            <span className="block text-sm text-gray-600">CRD College of Engineering</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Workshops Section */}
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Available Workshops</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center py-10 text-gray-500">Loading workshops...</div>
                    ) : workshops.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-gray-500">No active workshops available at the moment.</div>
                    ) : (
                        workshops.map((workshop) => (
                            <div key={workshop._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-2"></div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold mb-3">{workshop.title}</h3>
                                    <p className="text-gray-600 mb-6 flex-1">{workshop.description}</p>
                                    
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-sm uppercase text-gray-500 mb-2">Curriculum</h4>
                                        <ul className="space-y-2">
                                            {workshop.curriculum.map((item, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-gray-700">
                                                    <span className="material-symbols-outlined text-green-500 mr-2 text-[18px]">check_circle</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-500 text-sm mb-6">
                                        <span className="material-symbols-outlined mr-2 text-[18px]">schedule</span>
                                        {workshop.duration}
                                    </div>
                                    
                                    <button
                                        onClick={() => handleRegisterClick(workshop)}
                                        className="w-full bg-[#1462EE] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>



            <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 999999 }} />
            <MasterclassModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                workshopTitle={selectedWorkshop} 
            />
        </div>
    );
};

export default Masterclass;
