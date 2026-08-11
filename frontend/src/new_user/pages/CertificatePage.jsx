import React, { useState, useEffect } from 'react';
import { useDashboard } from "../DashboardContext";
import { SectionHeader } from "../new-dashboad";
import axios from 'axios';
import API from "../../API";
import toast from "react-hot-toast";

const CertificatePage = () => {
    const { enrollment } = useDashboard();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [showTraining, setShowTraining] = useState(false);

    const fetchCertificate = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail) {
                setLoading(false);
                return;
            }
            const response = await axios.get(`${API}/getcertificate?email=${userEmail}`);

            if (response.data) {
                const certData = response.data;

                const dateApplied = certData.startdate
                    ? new Date(certData.startdate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
                    : certData.createdAt
                        ? new Date(certData.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
                        : "Recently Applied";

                setCertificates([{
                    id: certData._id,
                    name: certData.domain || enrollment?.domainId?.title || "Full Stack Web Development",
                    dateApplied: dateApplied,
                    status: certData.delivered ? "Issued" : "Processing",
                    link: certData.url || "#",
                    delivered: certData.delivered,
                    // Context data for the modal
                    domain: certData.domain || enrollment?.domainId?.title || "Full Stack Web Development",
                    rawName: certData.name || "Student",
                    rawStartDate: certData.startdate || certData.createdAt || new Date().toISOString(),
                    rawUrl: certData.url
                }]);
            } else {
                setCertificates([]);
            }
        } catch (error) {
            console.error("Error fetching certificate:", error);
            // If not found (404), certificates stay empty
            setCertificates([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificate();
    }, [enrollment]);

    /* Handle Apply Certificate */
    const handleApplyCertificate = async () => {
        if (!enrollment) {
            toast.error("No active enrollment found.");
            return;
        }

        if (!window.confirm("Are you sure your internship is complete? If not, please cancel. If it's complete, click 'OK' to proceed.")) {
            return;
        }
        if (!window.confirm("Do you really want to apply for your certificate?")) {
            return;
        }

        const userName = localStorage.getItem("userName") || enrollment?.fullname || "Student";
        const userEmail = localStorage.getItem("userEmail") || enrollment?.email;
        const name = userName
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        const domain = enrollment?.domainId?.title || enrollment?.domain?.title || "Full Stack Web Development";

        try {
            setLoading(true);
            const response = await axios.post(`${API}/applycertificate`, {
                name,
                email: userEmail,
                domain,
            });
            toast.success("Certificate Applied successfully!");
            fetchCertificate();
        } catch (error) {
            console.error("Error adding certificate:", error.response?.data?.error || "Server error");
            toast.error(error.response?.data?.error || "Failed to apply, or you have already applied.");
            fetchCertificate();
        }
    };

    /* Helper to generate Training Certificate URL */
    const getTrainingCertUrl = () => {
        if (!selectedCertificate) return "";
        let finalOutput = selectedCertificate.domain + " on " + new Date(selectedCertificate.rawStartDate).toLocaleString('en-US', { month: 'long', year: 'numeric' });
        return `https://res.cloudinary.com/do5gatqvs/image/upload/co_rgb:000000,l_text:times%20new%20roman_65_bold_normal_left:${encodeURIComponent(selectedCertificate.rawName)}/fl_layer_apply,y_20/co_rgb:000000,l_text:times%20new%20roman_25_bold_normal_left:${encodeURIComponent(finalOutput)}/fl_layer_apply,y_225/training_certificate_demo_vknkst`;
    };

    /* Helper to add to LinkedIn */
    const addLinkedin = (data, isTraining = false) => {
        let year = new Date(data.rawStartDate).toLocaleDateString("en-US", { year: "numeric" });
        let month = new Date(data.rawStartDate).toLocaleDateString("en-US", { month: "numeric" });
        let certUrl = isTraining ? getTrainingCertUrl() : data.rawUrl;
        let certName = isTraining ? `Training Certificate - ${data.domain}` : data.domain;

        let linkurl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationName=Accenlearn&issueYear=${year}&issueMonth=${month}&certUrl=${certUrl}&certId=${data.id}`;
        window.open(linkurl, "_blank");
    };

    /* Download Internship Certificate via Proxy */
    const downloadInternshipCertificate = () => {
        const proxyUrl = `${API}/download-proxy?url=${encodeURIComponent(selectedCertificate.rawUrl)}`;
        window.open(proxyUrl, "_self");
        toast.success("Download started...");
    };

    return (
        <div className="nd-page-header fade-in relative">
            {/* Certificate Modal Overlay */}
            {selectedCertificate && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                    onClick={() => setSelectedCertificate(null)}
                >
                    <div
                        className="bg-[#12121e] border border-white/10 rounded-2xl max-w-3xl w-full shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-[#1a1a2e] border-b border-white/5 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 rounded-full p-2 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#8b5cf6] text-2xl">verified</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg leading-tight">Certificate of Completion</h3>
                                    <p className="text-gray-400 text-sm font-medium">{selectedCertificate.domain}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCertificate(null)}
                                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Toggle: Internship / Training */}
                        <div className="flex justify-center py-4 bg-[#12121e] border-b border-white/5">
                            <div className="flex items-center gap-0 bg-[#1a1a2e] rounded-full p-1 border border-white/5">
                                <button
                                    onClick={() => setShowTraining(false)}
                                    className={`px-5 py-1.5 rounded-full text-sm flex items-center gap-1.5 font-semibold transition-all duration-300 ${!showTraining
                                        ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    🎓 Internship
                                </button>
                                <button
                                    onClick={() => setShowTraining(true)}
                                    className={`px-5 py-1.5 rounded-full text-sm flex items-center gap-1.5 font-semibold transition-all duration-300 ${showTraining
                                        ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    📘 Training
                                </button>
                            </div>
                        </div>

                        {/* Certificate Image */}
                        <div className="p-6 bg-[#0f0f17]">
                            <div className="bg-white/5 rounded-xl shadow-md overflow-hidden border border-white/10 p-2 relative group">
                                <img
                                    src={showTraining ? getTrainingCertUrl() : selectedCertificate.rawUrl}
                                    alt="Certificate"
                                    className="w-full object-contain rounded border border-white/5"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm rounded-xl">
                                   <button 
                                      className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                                      onClick={() => {
                                          if (showTraining) {
                                              const trainingUrl = getTrainingCertUrl();
                                              const proxyUrl = `${API}/download-proxy?url=${encodeURIComponent(trainingUrl)}`;
                                              window.open(proxyUrl, '_self');
                                          } else {
                                              downloadInternshipCertificate();
                                          }
                                      }}
                                   >
                                      <span className="material-symbols-outlined">download</span> Download High-Res
                                   </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="px-6 py-5 bg-[#12121e] border-t border-white/5">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                {/* Left side - Info */}
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#8b5cf6] text-lg">business</span>
                                        <span>Issued by <strong className="text-white">ACCENLEARN</strong></span>
                                    </div>
                                    <a
                                        className="text-[#8b5cf6] hover:text-[#a78bfa] flex items-center gap-1 font-medium transition-colors"
                                        href={showTraining ? getTrainingCertUrl() : selectedCertificate.rawUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="material-symbols-outlined text-lg">open_in_new</span>
                                        View Full Size
                                    </a>
                                </div>

                                {/* Right side - Action Buttons */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        className="bg-[#0077B5] hover:bg-[#006097] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors shadow-sm text-sm border border-[#0077b5]/50"
                                        onClick={() => addLinkedin(selectedCertificate, showTraining)}
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        Add to LinkedIn
                                    </button>
                                    <button
                                        className="bg-[#1e1e2d] hover:bg-[#2a2a3c] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors shadow-sm text-sm border border-white/10"
                                        onClick={() => {
                                            if (showTraining) {
                                                const trainingUrl = getTrainingCertUrl();
                                                const proxyUrl = `${API}/download-proxy?url=${encodeURIComponent(trainingUrl)}`;
                                                window.open(proxyUrl, '_self');
                                                toast.success('Download started...');
                                            } else {
                                                downloadInternshipCertificate();
                                            }
                                        }}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <SectionHeader
                title="Certificates"
                icon="workspace_premium"
                subtitle="View and download your earned certificates"
            />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6 relative z-10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 uppercase tracking-wider text-xs font-bold text-gray-500">
                                <th className="p-4 pl-6 font-semibold">Certificate Name</th>
                                <th className="p-4 font-semibold">Date Applied</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 pr-6 text-right font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">
                                        <div className="flex justify-center items-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : certificates.length > 0 ? (
                                certificates.map((cert) => (
                                    <tr key={cert.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                                        <td className="p-4 pl-6 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                                <span className="material-symbols-outlined">code</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{cert.name}</span>
                                        </td>
                                        <td className="p-4 text-gray-600 font-medium">
                                            {cert.dateApplied}
                                        </td>
                                        <td className="p-4">
                                            {cert.status === "Issued" ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-bold border border-green-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                    {cert.status}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-bold border border-orange-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                    {cert.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            {cert.status === "Issued" && cert.link !== "#" ? (
                                                <button
                                                    onClick={() => {
                                                        setShowTraining(false);
                                                        setSelectedCertificate(cert);
                                                    }}
                                                    className="inline-flex items-center justify-end gap-1.5 text-[#8b5cf6] font-bold hover:text-orange-700 transition-colors bg-transparent border-none cursor-pointer"
                                                >
                                                    View <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                                </button>
                                            ) : (
                                                <span className="inline-flex items-center justify-end gap-1.5 text-gray-400 font-bold cursor-not-allowed">
                                                    View <span className="material-symbols-outlined text-[18px]">lock</span>
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
                                            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-[#8b5cf6] mb-2">
                                                <span className="material-symbols-outlined text-4xl">workspace_premium</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">No certificates found</h3>
                                                <p className="text-sm text-gray-500 mb-6">
                                                    You haven't applied for your course certificate yet. If you have completed your course, you can apply now.
                                                </p>
                                                <button
                                                    onClick={handleApplyCertificate}
                                                    className="bg-[#8b5cf6] hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors flex items-center gap-2 mx-auto"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                                    Apply for Certificate
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CertificatePage;
