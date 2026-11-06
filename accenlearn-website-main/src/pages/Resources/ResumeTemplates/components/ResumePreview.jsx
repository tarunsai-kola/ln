import React, { useState } from "react";
import {
  FaPrint,
  FaSearchPlus,
  FaSearchMinus,
  FaRedo,
  FaExpand,
  FaCompress,
  FaFilePdf,
  FaFileWord,
  FaCheckCircle,
  FaLayerGroup,
  FaDownload,
  FaEye
} from "react-icons/fa";

const ResumePreview = ({
  data,
  template = "modern",
  onTemplateChange,
  onPrint,
  onDownloadOption,
  zoomLevel: externalZoom,
  onZoomChange: externalOnZoomChange,
  hideControls = false
}) => {
  // Local zoom state if not controlled externally
  const [localZoom, setLocalZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  const zoom = externalZoom !== undefined ? externalZoom : localZoom;
  const setZoom = (val) => {
    const nextVal = typeof val === "function" ? val(zoom) : val;
    const clamped = Math.min(Math.max(nextVal, 60), 150);
    if (externalOnZoomChange) externalOnZoomChange(clamped);
    else setLocalZoom(clamped);
  };

  const templates = [
    {
      id: "modern",
      name: "Harvard / Tech Standard",
      font: "Arial / Sans-Serif",
      desc: "Single-column FAANG gold standard. Centered header, 1px lines, exact alignment.",
      badge: "Most Popular",
      color: "border-primary bg-primary/5 text-primary"
    },
    {
      id: "classic",
      name: "Executive Classic Serif",
      font: "Times New Roman",
      desc: "Formal serif headings, left-right split contact bar, solid dividers.",
      badge: "Leadership",
      color: "border-blue-600 bg-blue-50/60 text-blue-800"
    },
    {
      id: "minimal",
      name: "High-Density Technical",
      font: "Calibri / Compact",
      desc: "Maximized data density and tight vertical spacing for 1-page scanning.",
      badge: "High Density",
      color: "border-emerald-600 bg-emerald-50/60 text-emerald-800"
    }
  ];

  const renderBullets = (bullets, className) => {
    if (!bullets) return null;
    const list = (Array.isArray(bullets) ? bullets : typeof bullets === "string" ? bullets.split("\n") : [])
      .map((b) => (typeof b === "string" ? b.trim() : ""))
      .filter(Boolean);
    if (list.length === 0) return null;
    return (
      <ul className={className}>
        {list.map((b, bi) => (
          <li key={bi} className="pl-0.5">
            {b}
          </li>
        ))}
      </ul>
    );
  };

  const formatContactLine = () => {
    const items = [
      data?.email?.trim(),
      data?.phone?.trim(),
      data?.location?.trim(),
      data?.linkedin?.trim()?.replace(/^https?:\/\/(www\.)?/, ""),
      data?.github?.trim()?.replace(/^https?:\/\/(www\.)?/, "")
    ].filter(Boolean);

    return items.join("  |  ");
  };

  const getFontFamily = () => {
    if (template === "classic") return '"Times New Roman", Times, serif';
    if (template === "minimal") return "Calibri, Arial, sans-serif";
    return "Arial, Helvetica, sans-serif";
  };

  // Calculate approximate word count & pages for feedback
  const getWordCount = () => {
    let text = `${data?.name || ""} ${data?.targetRole || ""} ${data?.summary || ""}`;
    (data?.experience || []).forEach((e) => {
      text += ` ${e.company || ""} ${e.role || ""} ${Array.isArray(e.bullets) ? e.bullets.join(" ") : e.bullets || ""}`;
    });
    (data?.projects || []).forEach((p) => {
      text += ` ${p.title || ""} ${p.techStack || ""} ${Array.isArray(p.bullets) ? p.bullets.join(" ") : p.bullets || ""}`;
    });
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return words;
  };

  const wordCount = getWordCount();
  const estimatedPages = wordCount > 450 ? 2 : 1;

  return (
    <div className={`space-y-4 transition-all duration-200 ${isFullscreen ? "fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 overflow-y-auto flex flex-col justify-start items-center" : ""}`}>
      
      {/* =========================================================================
          1. VISUAL TEMPLATE SELECTOR CARDS (Hidden on Print & when hideControls)
         ========================================================================= */}
      {!hideControls && (
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-md border border-gray-200/80 print:hidden space-y-3.5 transition-all">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <FaLayerGroup className="text-primary" /> ATS Template Layout:
            </span>
            <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 flex items-center gap-1">
              <FaCheckCircle className="text-emerald-600 text-xs" /> 100% Parser Approved
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {templates.map((tpl) => {
              const isSelected = template === tpl.id;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => onTemplateChange && onTemplateChange(tpl.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between relative group ${
                    isSelected
                      ? "bg-gradient-to-br from-primary/10 via-white to-primary/5 border-2 border-primary shadow-md scale-[1.02]"
                      : "bg-gray-50/80 hover:bg-white border-gray-200/90 hover:border-gray-300 hover:shadow-xs"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-xs font-black tracking-tight ${isSelected ? "text-primary" : "text-gray-900"}`}>
                        {tpl.name}
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-md bg-gray-200/80 text-gray-700 shrink-0">
                        {tpl.font.split("/")[0].trim()}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-gray-600 leading-tight">
                      {tpl.desc}
                    </p>
                  </div>

                  <div className="pt-2.5 mt-2 border-t border-gray-200/60 flex items-center justify-between text-[10px] font-extrabold">
                    <span className={isSelected ? "text-primary" : "text-gray-500"}>
                      {isSelected ? "● Active Mode" : "○ Select Layout"}
                    </span>
                    <span className="text-gray-400 font-normal">
                      1 Column ATS
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          2. COMPACT MODERN PREVIEW TOOLBAR (Requirement 7)
         ========================================================================= */}
      <div className="bg-gray-900 text-white px-4 py-2.5 rounded-2xl shadow-lg border border-gray-800 print:hidden flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Zoom Controls & Fit Width */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setZoom(zoom - 10)}
            className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors cursor-pointer"
            title="Zoom Out (-10%)"
          >
            <FaSearchMinus size={12} />
          </button>
          
          <span className="w-13 text-center font-mono font-black text-xs text-white bg-gray-800 px-2 py-1 rounded-md border border-gray-700 select-none">
            {zoom}%
          </span>
          
          <button
            type="button"
            onClick={() => setZoom(zoom + 10)}
            className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors cursor-pointer"
            title="Zoom In (+10%)"
          >
            <FaSearchPlus size={12} />
          </button>

          <button
            type="button"
            onClick={() => setZoom(100)}
            className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg font-bold transition-colors cursor-pointer text-[11px]"
            title="Fit to Standard 100% Zoom"
          >
            Fit Width
          </button>
        </div>

        {/* Center: A4 & Page Number Indicators */}
        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-300">
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-gray-800/80 px-2.5 py-1 rounded-lg border border-gray-700/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> A4 Portrait • 210 × 297mm
          </span>
          <span className="bg-gray-800/80 px-2.5 py-1 rounded-lg border border-gray-700/80 font-mono text-gray-200">
            Page 1 of {estimatedPages} (~{wordCount} words)
          </span>
        </div>

        {/* Right: Fullscreen, Print & Download Dropdown */}
        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors cursor-pointer hidden sm:block"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
          >
            {isFullscreen ? <FaCompress size={12} /> : <FaExpand size={12} />}
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="min-h-[40px] sm:min-h-0 px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-white font-extrabold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
            title="Quick Print or Save as PDF via Browser"
          >
            <FaPrint className="text-secondary" /> Print
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
              className="min-h-[40px] sm:min-h-0 px-4 py-1.5 bg-gradient-to-r from-primary to-secondary text-white font-extrabold rounded-xl shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer text-xs"
            >
              <FaDownload /> Download ↓
            </button>

            {downloadMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 text-gray-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  Export Options
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDownloadMenuOpen(false);
                    onPrint && onPrint();
                    if (onDownloadOption) onDownloadOption("pdf");
                  }}
                  className="w-full px-3 py-2.5 text-left text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2.5 cursor-pointer"
                >
                  <FaFilePdf className="text-red-500 text-sm" /> PDF Document (.pdf)
                  <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-black">ATS Safe</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDownloadMenuOpen(false);
                    if (onDownloadOption) onDownloadOption("word");
                    else alert("To export as Word (.docx), select all text in the preview and copy into Microsoft Word with pristine single-column fidelity.");
                  }}
                  className="w-full px-3 py-2.5 text-left text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2.5 cursor-pointer"
                >
                  <FaFileWord className="text-blue-500 text-sm" /> Word Document (.docx)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDownloadMenuOpen(false);
                    onPrint && onPrint();
                  }}
                  className="w-full px-3 py-2.5 text-left text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2.5 border-t border-gray-100 cursor-pointer"
                >
                  <FaPrint className="text-gray-600 text-sm" /> Direct Print Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. LIVE RESUME PREVIEW CONTAINER WITH SMOOTH CSS SCALE (Req 6 & 13)
         ========================================================================= */}
      <div className={`flex justify-center overflow-x-auto py-3 transition-all duration-200 ${isFullscreen ? "w-full max-w-5xl" : ""}`}>
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="transition-transform"
        >
          <div
            id="printable-resume-area"
            style={{ fontFamily: getFontFamily() }}
            className="bg-white text-black w-[794px] min-h-[1123px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] rounded-xl border border-gray-300 print:shadow-none print:rounded-none print:border-none print:w-full print:max-w-none print:p-0 print:m-0 p-8 sm:px-10 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex-1">
              {/* =========================================================================
                  TEMPLATE 1: HARVARD / TECH STANDARD (ARIAL/SANS GOLD STANDARD)
                 ========================================================================= */}
              {template === "modern" && (
                <div className="space-y-3.5 text-left text-black">
                  {/* Centered Contact Header */}
                  <div className="text-center pb-1.5">
                    <h1 className="text-[24px] sm:text-[26px] font-bold text-black tracking-tight uppercase leading-none">
                      {data?.name || "YOUR NAME"}
                    </h1>
                    {data?.targetRole?.trim() && (
                      <p className="text-[13px] sm:text-[13.5px] font-bold text-gray-900 tracking-wide mt-1">
                        {data.targetRole}
                      </p>
                    )}
                    <div className="text-[10.5px] text-gray-800 tracking-normal mt-1 leading-normal">
                      {formatContactLine()}
                    </div>
                  </div>

                  {/* Summary */}
                  {data?.summary?.trim() && (
                    <div>
                      <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                        Professional Summary
                      </h2>
                      <p className="text-[11px] leading-[1.38] text-gray-900 text-justify">
                        {data.summary}
                      </p>
                    </div>
                  )}

                  {/* Technical Skills */}
                  {(data?.skills?.languages?.length > 0 || data?.skills?.frameworks?.length > 0 || data?.skills?.tools?.length > 0) && (
                    <div>
                      <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                        Technical Skills
                      </h2>
                      <div className="space-y-0.5 text-[11px] leading-[1.38] text-gray-900">
                        {data?.skills?.languages?.length > 0 && (
                          <div>
                            <span className="font-bold text-black">Languages: </span>
                            <span>{data.skills.languages.join(", ")}</span>
                          </div>
                        )}
                        {data?.skills?.frameworks?.length > 0 && (
                          <div>
                            <span className="font-bold text-black">Frameworks & Libraries: </span>
                            <span>{data.skills.frameworks.join(", ")}</span>
                          </div>
                        )}
                        {data?.skills?.tools?.length > 0 && (
                          <div>
                            <span className="font-bold text-black">Developer Tools & Cloud: </span>
                            <span>{data.skills.tools.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Work Experience */}
                  {data?.experience?.length > 0 && (
                    <div>
                      <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                        Experience
                      </h2>
                      <div className="space-y-3">
                        {data.experience.map((exp, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex flex-wrap justify-between items-baseline gap-1 text-[11.5px]">
                              <div>
                                <span className="font-bold text-black">{exp.role || "Role Title"}</span>
                                {exp.company && <span className="font-medium text-gray-800">, {exp.company}</span>}
                              </div>
                              <div className="font-medium text-gray-800 text-right text-[11px]">
                                <span>{exp.startDate || "Date"}</span>
                                {exp.location && <span> | {exp.location}</span>}
                              </div>
                            </div>
                            {renderBullets(
                              exp.bullets,
                              "list-disc pl-4 space-y-0.5 text-[11px] leading-[1.35] text-gray-900 marker:text-black mt-0.5"
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {data?.projects?.length > 0 && (
                    <div>
                      <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                        Projects
                      </h2>
                      <div className="space-y-2.5">
                        {data.projects.map((proj, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex flex-wrap justify-between items-baseline gap-1 text-[11.5px]">
                              <div className="flex-1 min-w-0 pr-2">
                                <span className="font-bold text-black">{proj.title || "Project Title"}</span>
                                {proj.techStack && (
                                  <span className="font-normal italic text-gray-800 text-[10.5px] ml-1.5">
                                    ({proj.techStack})
                                  </span>
                                )}
                              </div>
                              {proj.link && (
                                <span className="text-[10.5px] font-mono text-gray-800 text-right shrink-0">
                                  {proj.link.replace(/^https?:\/\/(www\.)?/, "")}
                                </span>
                              )}
                            </div>
                            {renderBullets(
                              proj.bullets,
                              "list-disc pl-4 space-y-0.5 text-[11px] leading-[1.35] text-gray-900 marker:text-black mt-0.5"
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {data?.education?.length > 0 && (
                    <div>
                      <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                        Education
                      </h2>
                      <div className="space-y-1">
                        {data.education.map((edu, idx) => (
                          <div key={idx} className="flex flex-wrap justify-between items-baseline text-[11px]">
                            <div>
                              <span className="font-bold text-black">{edu.degree || "Degree Title"}</span>
                              {edu.institution && <span className="text-gray-800">, {edu.institution}</span>}
                            </div>
                            <span className="font-medium text-gray-800 text-right">{edu.year || "Year"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {data?.certifications?.length > 0 && (
                    <div>
                      <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                        Certifications & Achievements
                      </h2>
                      <div className="space-y-0.5 text-[11px] text-gray-900">
                        {data.certifications.map((cert, idx) => (
                          <div key={idx} className="flex flex-wrap justify-between items-baseline">
                            <div>
                              <span className="font-bold text-black">{cert.title || "Certification Title"}</span>
                              {cert.issuer && <span className="text-gray-800"> — {cert.issuer}</span>}
                            </div>
                            {cert.date && (
                              <span className="text-[10.5px] font-mono text-gray-800 text-right">{cert.date}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =========================================================================
                  TEMPLATE 2: EXECUTIVE CLASSIC (TIMES NEW ROMAN TRADITIONAL SERIF)
                 ========================================================================= */}
              {template === "classic" && (
                <div className="space-y-3.5 text-left text-black">
                  {/* Executive Split Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-black pb-2.5 gap-2">
                    <div>
                      <h1 className="text-[25px] font-bold text-black tracking-tight uppercase leading-none">
                        {data?.name || "YOUR NAME"}
                      </h1>
                      {data?.targetRole?.trim() && (
                        <p
                          className="text-[13px] font-bold text-gray-800 uppercase tracking-wider mt-1"
                          style={{ fontFamily: "Arial, sans-serif" }}
                        >
                          {data.targetRole}
                        </p>
                      )}
                    </div>
                    <div
                      className="text-left sm:text-right text-[10.5px] text-gray-900 leading-[1.3]"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      {data?.email && <div>{data.email}</div>}
                      {data?.phone && <div>{data.phone}</div>}
                      {data?.location && <div>{data.location}</div>}
                      {data?.linkedin && <div>{data.linkedin?.replace(/^https?:\/\/(www\.)?/, "")}</div>}
                      {data?.github && <div>{data.github?.replace(/^https?:\/\/(www\.)?/, "")}</div>}
                    </div>
                  </div>

                  {/* Summary */}
                  {data?.summary?.trim() && (
                    <div>
                      <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5">
                        Professional Summary
                      </h2>
                      <p
                        className="text-[11px] leading-[1.38] text-gray-900 text-justify"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        {data.summary}
                      </p>
                    </div>
                  )}

                  {/* Technical Skills */}
                  {(data?.skills?.languages?.length > 0 || data?.skills?.frameworks?.length > 0 || data?.skills?.tools?.length > 0) && (
                    <div>
                      <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5">
                        Technical Expertise
                      </h2>
                      <div
                        className="space-y-0.5 text-[11px] leading-[1.38] text-gray-900"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        {data?.skills?.languages?.length > 0 && (
                          <div>
                            <span className="font-bold text-black">Languages: </span>
                            <span>{data.skills.languages.join(", ")}</span>
                          </div>
                        )}
                        {data?.skills?.frameworks?.length > 0 && (
                          <div>
                            <span className="font-bold text-black">Frameworks & Libraries: </span>
                            <span>{data.skills.frameworks.join(", ")}</span>
                          </div>
                        )}
                        {data?.skills?.tools?.length > 0 && (
                          <div>
                            <span className="font-bold text-black">Developer Tools & Cloud: </span>
                            <span>{data.skills.tools.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Work Experience */}
                  {data?.experience?.length > 0 && (
                    <div>
                      <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-2">
                        Professional Experience
                      </h2>
                      <div className="space-y-3" style={{ fontFamily: "Arial, sans-serif" }}>
                        {data.experience.map((exp, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex flex-wrap justify-between items-baseline gap-1 text-[11.5px]">
                              <div>
                                <span className="font-bold text-black">{exp.role || "Role Title"}</span>
                                {exp.company && (
                                  <span className="font-normal italic text-gray-800"> — {exp.company}</span>
                                )}
                              </div>
                              <div className="font-medium text-gray-800 text-right text-[11px]">
                                <span>{exp.startDate || "Date"}</span>
                                {exp.location && <span> | {exp.location}</span>}
                              </div>
                            </div>
                            {renderBullets(
                              exp.bullets,
                              "list-disc pl-4 space-y-0.5 text-[11px] leading-[1.35] text-gray-900 marker:text-black mt-0.5"
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {data?.projects?.length > 0 && (
                    <div>
                      <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-2">
                        Technical Projects
                      </h2>
                      <div className="space-y-2.5" style={{ fontFamily: "Arial, sans-serif" }}>
                        {data.projects.map((proj, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex flex-wrap justify-between items-baseline gap-1 text-[11.5px]">
                              <div className="flex-1 min-w-0 pr-2">
                                <span className="font-bold text-black">{proj.title || "Project Title"}</span>
                                {proj.techStack && (
                                  <span className="font-normal italic text-gray-800 text-[10.5px] ml-1.5">
                                    [{proj.techStack}]
                                  </span>
                                )}
                              </div>
                              {proj.link && (
                                <span className="text-[10.5px] font-mono text-gray-800 text-right shrink-0">
                                  {proj.link.replace(/^https?:\/\/(www\.)?/, "")}
                                </span>
                              )}
                            </div>
                            {renderBullets(
                              proj.bullets,
                              "list-disc pl-4 space-y-0.5 text-[11px] leading-[1.35] text-gray-900 marker:text-black mt-0.5"
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {data?.education?.length > 0 && (
                    <div>
                      <h2 className="text-[12.5px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5">
                        Education
                      </h2>
                      <div className="space-y-1" style={{ fontFamily: "Arial, sans-serif" }}>
                        {data.education.map((edu, idx) => (
                          <div key={idx} className="flex flex-wrap justify-between items-baseline text-[11px]">
                            <div>
                              <span className="font-bold text-black">{edu.degree || "Degree Title"}</span>
                              {edu.institution && <span className="text-gray-800">, {edu.institution}</span>}
                            </div>
                            <span className="font-medium text-gray-800 text-right">{edu.year || "Year"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =========================================================================
                  TEMPLATE 3: MINIMALIST COMPACT (CALIBRI / HIGH-DENSITY ATS)
                 ========================================================================= */}
              {template === "minimal" && (
                <div className="space-y-2.5 text-left text-black">
                  {/* Compact Header */}
                  <div className="pb-1 border-b border-black">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1">
                      <h1 className="text-[21px] font-bold text-black uppercase tracking-tight leading-none">
                        {data?.name || "YOUR NAME"}
                      </h1>
                      {data?.targetRole?.trim() && (
                        <span className="text-[12px] font-bold text-gray-800 uppercase tracking-wider">
                          {data.targetRole}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-800 tracking-normal mt-1 leading-normal">
                      {formatContactLine()}
                    </div>
                  </div>

                  {/* Summary */}
                  {data?.summary?.trim() && (
                    <div>
                      <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-black/70 pb-0.5 mb-1">
                        Summary
                      </h2>
                      <p className="text-[10.5px] leading-[1.32] text-gray-900 text-justify">
                        {data.summary}
                      </p>
                    </div>
                  )}

                  {/* Skills */}
                  {(data?.skills?.languages?.length > 0 || data?.skills?.frameworks?.length > 0 || data?.skills?.tools?.length > 0) && (
                    <div>
                      <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-black/70 pb-0.5 mb-1">
                        Skills
                      </h2>
                      <div className="space-y-0.5 text-[10.5px] leading-[1.32] text-gray-900">
                        {data?.skills?.languages?.length > 0 && (
                          <div>
                            <strong className="text-black">Languages: </strong>
                            {data.skills.languages.join(", ")}
                          </div>
                        )}
                        {data?.skills?.frameworks?.length > 0 && (
                          <div>
                            <strong className="text-black">Frameworks: </strong>
                            {data.skills.frameworks.join(", ")}
                          </div>
                        )}
                        {data?.skills?.tools?.length > 0 && (
                          <div>
                            <strong className="text-black">Tools & Cloud: </strong>
                            {data.skills.tools.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {data?.experience?.length > 0 && (
                    <div>
                      <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-black/70 pb-0.5 mb-1.5">
                        Experience
                      </h2>
                      <div className="space-y-2">
                        {data.experience.map((exp, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex flex-wrap justify-between items-baseline gap-1 text-[11px]">
                              <div>
                                <span className="font-bold text-black">{exp.role || "Role Title"}</span>
                                {exp.company && <span className="font-medium text-gray-800"> @ {exp.company}</span>}
                              </div>
                              <div className="text-[10.5px] font-medium text-gray-800 text-right">
                                <span>{exp.startDate || "Date"}</span>
                                {exp.location && <span> | {exp.location}</span>}
                              </div>
                            </div>
                            {renderBullets(
                              exp.bullets,
                              "list-disc pl-4 space-y-0.5 text-[10.5px] leading-[1.32] text-gray-900 marker:text-black"
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {data?.projects?.length > 0 && (
                    <div>
                      <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-black/70 pb-0.5 mb-1.5">
                        Projects
                      </h2>
                      <div className="space-y-2">
                        {data.projects.map((proj, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex flex-wrap justify-between items-baseline gap-1 text-[11px]">
                              <div>
                                <span className="font-bold text-black">{proj.title || "Project Title"}</span>
                                {proj.techStack && (
                                  <span className="font-normal text-gray-800 text-[10px] ml-1">
                                    ({proj.techStack})
                                  </span>
                                )}
                              </div>
                              {proj.link && (
                                <span className="text-[10px] font-mono text-gray-800 text-right">
                                  {proj.link.replace(/^https?:\/\/(www\.)?/, "")}
                                </span>
                              )}
                            </div>
                            {renderBullets(
                              proj.bullets,
                              "list-disc pl-4 space-y-0.5 text-[10.5px] leading-[1.32] text-gray-900 marker:text-black"
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education & Certs */}
                  {(data?.education?.length > 0 || data?.certifications?.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-0.5">
                      {data?.education?.length > 0 && (
                        <div>
                          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-black/70 pb-0.5 mb-1">
                            Education
                          </h2>
                          <div className="space-y-0.5 text-[10.5px]">
                            {data.education.map((edu, idx) => (
                              <div key={idx} className="flex justify-between items-baseline">
                                <div>
                                  <span className="font-bold text-black">{edu.degree}</span>
                                  {edu.institution && <span>, {edu.institution}</span>}
                                </div>
                                <span className="text-gray-800 text-right">{edu.year}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {data?.certifications?.length > 0 && (
                        <div>
                          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-black border-b border-black/70 pb-0.5 mb-1">
                            Certifications
                          </h2>
                          <div className="space-y-0.5 text-[10.5px]">
                            {data.certifications.map((cert, idx) => (
                              <div key={idx} className="flex justify-between items-baseline">
                                <div>
                                  <span className="font-bold text-black">{cert.title}</span>
                                  {cert.issuer && <span> — {cert.issuer}</span>}
                                </div>
                                {cert.date && (
                                  <span className="text-[10px] font-mono text-gray-800">{cert.date}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Print-only page number indicator */}
            <div className="hidden print:flex justify-end items-center pt-3 mt-4 text-[9pt] font-sans text-gray-500">
              <span>Page 1 of {estimatedPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

