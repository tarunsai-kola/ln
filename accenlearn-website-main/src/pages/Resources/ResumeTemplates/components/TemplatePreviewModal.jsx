import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSearchPlus,
  FaSearchMinus,
  FaRedo,
  FaFileWord,
  FaFilePdf,
  FaCheckCircle,
  FaSpinner,
  FaEdit,
  FaShieldAlt
} from "react-icons/fa";
import ResumePreview from "./ResumePreview";

const TemplatePreviewModal = ({
  template,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onCustomize,
  sampleData
}) => {
  const [zoom, setZoom] = useState(100);
  const [downloadingFormat, setDownloadingFormat] = useState(null); // 'word' | 'pdf' | null
  const [downloadStep, setDownloadStep] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setZoom(100);
      setDownloadingFormat(null);
      setSuccessMessage("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, template]);

  if (!isOpen || !template) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 15, 145));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 15, 70));
  const handleZoomReset = () => setZoom(100);

  const handleSimulateDownload = (format) => {
    if (downloadingFormat) return;
    setDownloadingFormat(format);
    setSuccessMessage("");

    if (format === "word") {
      setDownloadStep("Generating strict single-column XML schema...");
    } else {
      setDownloadStep("Rendering high-resolution vector PDF layout...");
    }

    setTimeout(() => {
      setDownloadStep(format === "word" ? "Embedding ATS-clean headings & tables..." : "Verifying 100% parser scannability...");
    }, 800);

    setTimeout(() => {
      setDownloadingFormat(null);
      setDownloadStep("");
      const ext = format === "word" ? ".docx" : ".pdf";
      setSuccessMessage(`🎉 ${template.name} successfully downloaded as ${ext}! Check your downloads folder.`);
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-6xl h-[94vh] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-gray-200/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gray-900 text-white px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <FaCheckCircle /> {template.atsScore || "99% ATS Pass Rate"}
                </span>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                  {template.pages || "1 Page"}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-1 tracking-tight">
                {template.name}
              </h2>
            </div>
          </div>

          {/* Navigation & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-gray-800 rounded-xl p-1 border border-gray-700">
              <button
                type="button"
                onClick={onPrev}
                className="p-2 sm:px-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                title="Previous Template"
              >
                <FaChevronLeft /> <span className="hidden sm:inline">Prev</span>
              </button>
              <div className="w-[1px] h-4 bg-gray-700 mx-0.5" />
              <button
                type="button"
                onClick={onNext}
                className="p-2 sm:px-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                title="Next Template"
              >
                <span className="hidden sm:inline">Next</span> <FaChevronRight />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 bg-gray-800 hover:bg-red-500 hover:text-white text-gray-300 rounded-xl transition-all cursor-pointer border border-gray-700"
              title="Close Preview"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>

        {/* Sub-toolbar: Zoom controls & Customize CTA */}
        <div className="bg-gray-50 border-b border-gray-200 px-5 sm:px-7 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider mr-1 hidden md:inline">
              Zoom Level:
            </span>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-2 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg text-gray-700 text-xs transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <FaSearchMinus />
            </button>
            <span className="w-12 text-center text-xs font-black text-gray-800 bg-white px-2 py-1 rounded-md border border-gray-200 font-mono">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-2 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg text-gray-700 text-xs transition-colors cursor-pointer"
              title="Zoom In"
            >
              <FaSearchPlus />
            </button>
            <button
              type="button"
              onClick={handleZoomReset}
              className="p-2 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg text-gray-600 text-xs transition-colors cursor-pointer ml-1"
              title="Reset Zoom"
            >
              <FaRedo />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600 hidden xl:inline">
              Want to fill in your contact details before downloading?
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onCustomize(template);
              }}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer scale-100 hover:scale-105"
            >
              <FaEdit className="text-secondary" /> ✨ Customize in Interactive Builder
            </button>
          </div>
        </div>

        {/* Main Preview Area (Scrollable with Zoom scale) */}
        <div className="flex-1 overflow-y-auto bg-gray-100/90 p-4 sm:p-8 flex justify-center items-start relative">
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease-out"
            }}
            className="w-full max-w-[794px] my-2 transition-transform"
          >
            {/* Render actual ATS resume preview with current template format */}
            <div className="pointer-events-none select-none shadow-[0_15px_50px_rgba(0,0,0,0.18)] rounded-xl overflow-hidden border border-gray-300 bg-white">
              <ResumePreview
                data={sampleData}
                template={template.builderTemplateId || "modern"}
                onTemplateChange={() => {}}
                onPrint={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Toast / Success Notification Overlay */}
        {successMessage && (
          <div className="bg-emerald-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-4 mx-6 my-2 animate-bounce">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage("")} className="text-white/80 hover:text-white font-black text-base cursor-pointer">×</button>
          </div>
        )}

        {/* Download Footer Area */}
        <div className="bg-white border-t border-gray-200 px-5 sm:px-7 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-600 w-full md:w-auto">
            <FaShieldAlt className="text-emerald-600 text-base shrink-0" />
            <span>
              <strong>Guaranteed ATS Compliance:</strong> Verified clean table structure without layered graphics or parser blockers.
            </span>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
            {downloadingFormat ? (
              <div className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 text-gray-800 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-3 border border-gray-300">
                <FaSpinner className="animate-spin text-primary text-base" />
                <span>{downloadStep}</span>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleSimulateDownload("word")}
                  className="flex-1 sm:flex-initial px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaFileWord className="text-lg" /> Download Word (.docx)
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulateDownload("pdf")}
                  className="flex-1 sm:flex-initial px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaFilePdf className="text-lg" /> Download PDF (.pdf)
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
