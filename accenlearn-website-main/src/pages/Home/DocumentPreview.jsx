import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "antd";
import { FaArrowLeft, FaDownload, FaExpand, FaCertificate, FaQuoteLeft } from "react-icons/fa";
import { FEEDBACKS } from "./Feedback";
import SwiperComponent from "../../components/SwiperComponent";
import { SwiperSlide } from "swiper/react";

const DocumentPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [previewDoc, setPreviewDoc] = useState(location.state || {});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!previewDoc.url) {
      navigate("/");
    }
  }, [previewDoc.url, navigate]);

  const handleDocClick = (e, url, title, student) => {
    e.preventDefault();
    if (url === "#") return;
    setPreviewDoc({ url, title, student });
  };

  if (!previewDoc.url) return null;

  return (
    <div className="min-h-screen pt-4 sm:pt-6 pb-20 bg-gradient-to-br from-gray-50 to-white px-4 md:px-10">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10 animate__animated animate__fadeIn">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all group z-10"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="overflow-hidden">
              <h1 className="text-xl md:text-3xl font-black text-primary uppercase tracking-tighter truncate">
                Verification Portal
              </h1>
              <p className="text-[10px] md:text-sm font-bold text-secondary uppercase tracking-[0.2em] mt-1 truncate">
                Authenticity Check · AccenLearn Credentials
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
             <button 
               onClick={() => window.print()}
               className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white border border-gray-100 shadow-sm rounded-xl text-[10px] md:text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
             >
               <FaExpand size={12} md:size={14} />
               PRINT
             </button>
             <a 
               href={previewDoc.url} 
               download={`${previewDoc.student}_${previewDoc.title}`}
               className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-primary text-white shadow-lg shadow-primary/20 rounded-xl text-[10px] md:text-sm font-bold hover:bg-primary/90 transition-all"
             >
               <FaDownload size={12} md:size={14} />
               DOWNLOAD
             </a>
          </div>
        </div>

        {/* Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Side: Selected Student Feedback Only */}
          <div className="lg:col-span-5 xl:col-span-4 w-full h-full">
            <div className="animate__animated animate__fadeIn flex flex-col gap-6">
              {FEEDBACKS.filter(item => item.name === previewDoc.student).map((item, index) => (
                <div
                  key={item.name + index}
                  className="group relative rounded-[2rem] md:rounded-[2.5rem] border border-primary/20 bg-white shadow-2xl overflow-hidden flex flex-col w-full min-h-[550px] md:min-h-[600px] animate__animated animate__zoomIn animate__faster"
                >
                  {/* Top Accent Border */}
                  <div className="absolute top-0 left-0 w-full h-2 md:h-2.5 bg-primary" />

                  <div className="relative p-6 md:p-10 pt-10 flex flex-col flex-grow">
                    {/* Header Section (Not absolute to prevent overlap) */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg flex-shrink-0">
                        <FaQuoteLeft size={18} />
                      </div>
                      <span className="text-[10px] md:text-xs font-black uppercase text-primary tracking-[0.2em] bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-primary/10 shadow-sm whitespace-nowrap">
                        {item.track}
                      </span>
                    </div>

                    <div className="flex-grow flex flex-col justify-center">
                      <p className="text-gray-800 text-lg md:text-xl lg:text-2xl leading-relaxed italic font-bold">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="pt-8 md:pt-10 border-t border-gray-100 flex flex-col gap-8 md:gap-10 mt-auto">
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl md:rounded-[2rem] border-4 border-white shadow-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center overflow-hidden">
                          <h4 className="text-xl md:text-2xl font-black text-primary leading-tight truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm md:text-base font-bold text-secondary tracking-tight uppercase mt-0.5 md:mt-1 truncate">
                            {item.role}
                          </p>
                          <div className="flex items-center gap-2 mt-2 md:mt-3 bg-secondary/10 px-3 py-1 rounded-full w-fit">
                            <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
                            <span className="text-[9px] md:text-[10px] font-black text-secondary uppercase tracking-widest truncate">
                              Placed at: {item.placedAt}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-nowrap gap-3 md:gap-4">
                        <button
                          onClick={(e) => handleDocClick(e, item.certificateUrl, "Certificate of Achievement", item.name)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black transition-all duration-300 border ${
                            previewDoc.url === item.certificateUrl
                              ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.02]"
                              : "bg-gray-50 text-primary border-gray-100 hover:border-primary/20 hover:bg-white"
                          } whitespace-nowrap uppercase tracking-wider`}
                        >
                          <FaCertificate className="text-xs md:text-sm" />
                          CERTIFICATE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Back to Browse Button */}
              <button 
                onClick={() => navigate("/")}
                className="mt-4 md:mt-8 w-full flex items-center justify-center gap-3 py-4 text-xs md:text-sm font-black text-gray-400 hover:text-primary transition-all group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                BACK TO BROWSE ALL REVIEWS
              </button>
            </div>
          </div>

          {/* Right Side: Document Viewer */}
          <div className="lg:col-span-7 xl:col-span-8 w-full h-full lg:sticky lg:top-32 animate__animated animate__fadeIn">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-2xl p-4 md:p-8 flex flex-col min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
              <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 border-b border-gray-100">
                <div className="overflow-hidden">
                  <h3 className="text-lg md:text-xl font-black text-primary uppercase tracking-tighter truncate">
                    {previewDoc.title}
                  </h3>
                  <p className="text-[10px] md:text-xs font-bold text-secondary uppercase tracking-[0.2em] mt-1 truncate">
                    Issued to: {previewDoc.student}
                  </p>
                </div>
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                  <FaCertificate size={18} md:size={20} />
                </div>
              </div>

              <div className="flex-grow bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative group/viewer flex items-center justify-center border-2 border-dashed border-gray-200 p-4 md:p-8">
                <div key={previewDoc.url} className="w-full h-full animate__animated animate__fadeIn flex items-center justify-center">
                   <Image
                    src={previewDoc.url}
                    alt={previewDoc.title}
                    className="max-w-full max-h-[50vh] md:max-h-[60vh] object-contain rounded-xl shadow-2xl border-4 border-white mx-auto"
                    preview={true}
                  />
                  
                  {/* Floating Verification Badge */}
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/95 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-xl border border-green-100 flex items-center gap-2 md:gap-3 animate__animated animate__bounceIn animate__delay-1s">
                    <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
                    <span className="text-[8px] md:text-[10px] font-black text-green-600 uppercase tracking-widest whitespace-nowrap">Verified Portal</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 flex items-center justify-between text-gray-400">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest truncate">AccenLearn Digital Authentication</p>
                <div className="flex gap-1 md:gap-1.5 flex-shrink-0">
                  <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-secondary animate-pulse"></div>
                  <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
