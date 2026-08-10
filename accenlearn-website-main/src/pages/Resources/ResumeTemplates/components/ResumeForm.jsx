import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaLayerGroup,
  FaCertificate,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaPlus,
  FaTrash,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaShieldAlt,
  FaMagic,
  FaRedo
} from "react-icons/fa";
import { calculateAtsScore } from "./AtsResumeScore";

const ResumeForm = ({ data, onChange, onClear, activeStep, onStepChange, onPrint }) => {
  const [internalStep, setInternalStep] = useState(1);
  const [skillInput, setSkillInput] = useState({ languages: "", frameworks: "", tools: "" });

  const currentStep = activeStep || internalStep;
  const setStep = (stepNumber) => {
    if (onStepChange) onStepChange(stepNumber);
    else setInternalStep(stepNumber);
  };

  // Helper to update top-level field
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Helper to update nested array item
  const updateArrayItem = (arrayName, index, field, value) => {
    const updated = [...(data[arrayName] || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, [arrayName]: updated });
  };

  const addArrayItem = (arrayName, emptyTemplate) => {
    onChange({ ...data, [arrayName]: [...(data[arrayName] || []), emptyTemplate] });
  };

  const removeArrayItem = (arrayName, index) => {
    const updated = (data[arrayName] || []).filter((_, i) => i !== index);
    onChange({ ...data, [arrayName]: updated });
  };

  // Helper to add skill
  const addSkill = (category, skillText) => {
    const trimmed = skillText.trim();
    if (!trimmed) return;
    const currentSkills = data.skills?.[category] || [];
    if (!currentSkills.includes(trimmed)) {
      onChange({
        ...data,
        skills: {
          ...data.skills,
          [category]: [...currentSkills, trimmed]
        }
      });
    }
    setSkillInput({ ...skillInput, [category]: "" });
  };

  const removeSkill = (category, index) => {
    const updated = (data.skills?.[category] || []).filter((_, i) => i !== index);
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: updated
      }
    });
  };

  const quickSkillsSuggestions = {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C++", "SQL", "HTML5/CSS3", "Go", "Rust"],
    frameworks: ["React.js", "Node.js", "Express.js", "Next.js", "Tailwind CSS", "Redux Toolkit", "MongoDB", "Django", "Spring Boot"],
    tools: ["Git & GitHub", "Docker", "AWS (EC2, S3)", "PostgreSQL", "Firebase", "Linux", "CI/CD Actions", "Kubernetes", "Jira"]
  };

  // Evaluate section completion status
  const checkSectionStatus = (stepId) => {
    if (stepId === 1) {
      const isComplete = Boolean(data?.name?.trim() && data?.email?.trim() && data?.phone?.trim() && data?.targetRole?.trim());
      return isComplete ? { text: "Complete ✓", color: "bg-emerald-100 text-emerald-800 border-emerald-200" } : { text: "In Progress ⚡", color: "bg-amber-100 text-amber-800 border-amber-200" };
    }
    if (stepId === 2) {
      const words = (data?.summary || "").trim().split(/\s+/).filter(Boolean).length;
      if (words >= 15) return { text: "Complete ✓", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
      if (words > 0) return { text: "In Progress ⚡", color: "bg-amber-100 text-amber-800 border-amber-200" };
      return { text: "Optional", color: "bg-gray-100 text-gray-600 border-gray-200" };
    }
    if (stepId === 3) {
      const hasExp = (data?.experience || []).some(e => e.company?.trim() || e.role?.trim());
      return hasExp ? { text: "Complete ✓", color: "bg-emerald-100 text-emerald-800 border-emerald-200" } : { text: "Optional / Add", color: "bg-gray-100 text-gray-600 border-gray-200" };
    }
    if (stepId === 4) {
      const hasEdu = (data?.education || []).some(e => e.degree?.trim() || e.institution?.trim());
      return hasEdu ? { text: "Complete ✓", color: "bg-emerald-100 text-emerald-800 border-emerald-200" } : { text: "Required *", color: "bg-red-100 text-red-800 border-red-200" };
    }
    if (stepId === 5) {
      const count = (data?.skills?.languages?.length || 0) + (data?.skills?.frameworks?.length || 0) + (data?.skills?.tools?.length || 0);
      if (count >= 5) return { text: `Complete (${count} skills) ✓`, color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
      if (count > 0) return { text: `In Progress (${count})`, color: "bg-amber-100 text-amber-800 border-amber-200" };
      return { text: "Add Skills *", color: "bg-red-100 text-red-800 border-red-200" };
    }
    if (stepId === 6) {
      const hasProj = (data?.projects || []).some(p => p.title?.trim());
      return hasProj ? { text: `Complete (${data.projects.length}) ✓`, color: "bg-emerald-100 text-emerald-800 border-emerald-200" } : { text: "Highly Recommended", color: "bg-blue-100 text-blue-800 border-blue-200" };
    }
    if (stepId === 7) {
      const hasCert = (data?.certifications || []).some(c => c.title?.trim());
      return hasCert ? { text: `Complete (${data.certifications.length}) ✓`, color: "bg-emerald-100 text-emerald-800 border-emerald-200" } : { text: "Optional", color: "bg-gray-100 text-gray-600 border-gray-200" };
    }
    if (stepId === 8) {
      const ats = calculateAtsScore(data || {});
      return { text: `ATS Score: ${ats?.score || 0}%`, color: (ats?.score || 0) >= 80 ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-primary/10 text-primary border-primary/20" };
    }
    return { text: "", color: "" };
  };

  const sections = [
    { id: 1, title: "Contact Information", icon: <FaUser />, subtitle: "Name, email, phone, and online profiles" },
    { id: 2, title: "Professional Summary", icon: <FaCode />, subtitle: "2-4 sentence executive overview" },
    { id: 3, title: "Work Experience", icon: <FaBriefcase />, subtitle: "Positions, internships, and quantified achievements" },
    { id: 4, title: "Education & Degrees", icon: <FaGraduationCap />, subtitle: "Colleges, degrees, graduation dates, and GPA" },
    { id: 5, title: "Technical Skills", icon: <FaLayerGroup />, subtitle: "Languages, frameworks, developer tools, and cloud" },
    { id: 6, title: "Technical Projects", icon: <FaCode />, subtitle: "Standout engineering projects with live links" },
    { id: 7, title: "Certifications & Honors", icon: <FaCertificate />, subtitle: "Recognized industry certificates and awards" },
    { id: 8, title: "Review & ATS Check", icon: <FaShieldAlt />, subtitle: "Parser audit, keyword optimization, and final PDF export" }
  ];

  const atsResult = calculateAtsScore(data || {});
  const atsScore = atsResult?.score || 0;

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-5 sm:p-7 space-y-6">
      {/* Form Top Bar with ATS Score Pill & Clear Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>Interactive ATS Resume Builder</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              v2.5 Pro
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Complete the 8 sections below. Each field updates your live preview in real time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto justify-end">
          <div
            onClick={() => setStep(8)}
            className={`min-h-[48px] sm:min-h-0 px-4 sm:px-3.5 py-2.5 sm:py-1.5 rounded-2xl text-xs font-extrabold flex items-center justify-center sm:justify-start gap-2 cursor-pointer transition-all hover:scale-105 shadow-2xs border ${
              atsScore >= 80
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            <FaShieldAlt className={atsScore >= 80 ? "text-emerald-600" : "text-amber-600"} />
            <span>ATS Score: {atsScore}%</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear all form inputs? You can reload sample data anytime.")) {
                if (onClear) onClear();
              }
            }}
            className="min-h-[48px] sm:min-h-0 px-4 sm:px-3 py-2.5 sm:py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="Reset form fields"
          >
            <FaTrash size={11} /> Clear Data
          </button>
        </div>
      </div>

      {/* Accordion List of 8 Sections */}
      <div className="space-y-3.5">
        {sections.map((section) => {
          const isOpen = currentStep === section.id;
          const status = checkSectionStatus(section.id);

          return (
            <div
              key={section.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-primary shadow-lg bg-white ring-2 ring-primary/10"
                  : "border-gray-200/80 bg-gray-50/60 hover:bg-white hover:border-gray-300"
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setStep(isOpen ? 0 : section.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 transition-all ${
                      isOpen
                        ? "bg-primary text-white shadow-md scale-105"
                        : "bg-white text-gray-600 border border-gray-200/80 shadow-2xs"
                    }`}
                  >
                    {section.icon}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`text-sm sm:text-base font-black tracking-tight truncate ${
                        isOpen ? "text-primary" : "text-gray-900"
                      }`}
                    >
                      {section.id}. {section.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate hidden sm:block">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {status.text && (
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border ${status.color}`}
                    >
                      {status.text}
                    </span>
                  )}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-transform ${
                      isOpen ? "bg-primary/10 text-primary rotate-180" : "bg-gray-200/70 text-gray-600"
                    }`}
                  >
                    <FaChevronDown />
                  </div>
                </div>
              </button>

              {/* Accordion Body Content */}
              {isOpen && (
                <div className="px-5 pb-6 pt-2 border-t border-gray-100/80 space-y-6 animate-in fade-in duration-200">
                  
                  {/* SECTION 1: CONTACT INFORMATION */}
                  {section.id === 1 && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Arjun Kumar"
                            value={data.name || ""}
                            onChange={(e) => updateField("name", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Target Job Title / Role *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Full Stack Software Engineer"
                            value={data.targetRole || ""}
                            onChange={(e) => updateField("targetRole", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. arjun.kumar@accenlearn.com"
                            value={data.email || ""}
                            onChange={(e) => updateField("email", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            placeholder="e.g. +91 98765 43210"
                            value={data.phone || ""}
                            onChange={(e) => updateField("phone", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Location (City, Country) *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Bangalore, India"
                            value={data.location || ""}
                            onChange={(e) => updateField("location", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            LinkedIn URL
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. linkedin.com/in/arjunkumar-tech"
                            value={data.linkedin || ""}
                            onChange={(e) => updateField("linkedin", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            GitHub URL / Portfolio
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. github.com/arjunkumar"
                            value={data.github || ""}
                            onChange={(e) => updateField("github", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 2: PROFESSIONAL SUMMARY */}
                  {section.id === 2 && (
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <label className="block text-xs font-bold text-gray-700">
                            Professional Summary (Aim for 30-50 words)
                          </label>
                          <p className="text-[11px] text-gray-500">
                            Brief executive overview emphasizing years of experience, core tech stack, and top achievement.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            updateField(
                              "summary",
                              "Results-driven Software Engineer with proven expertise in building scalable full-stack web applications using React, Node.js, and Cloud infrastructures. Experienced in optimizing database performance and deploying resilient microservices. Passionate about solving complex algorithmic challenges and collaborating across cross-functional product teams to deliver high-impact digital experiences."
                            );
                          }}
                          className="text-xs text-primary font-extrabold hover:underline flex items-center gap-1 cursor-pointer bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20"
                        >
                          <FaLightbulb /> Insert Sample High-Scoring Summary
                        </button>
                      </div>

                      <textarea
                        rows="4"
                        placeholder="Write a concise 3-4 sentence summary highlighting your top skills, measurable engineering impact, and career objective..."
                        value={data.summary || ""}
                        onChange={(e) => updateField("summary", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 text-xs sm:text-sm font-medium leading-relaxed font-sans transition-all"
                      />
                    </div>
                  )}

                  {/* SECTION 3: WORK EXPERIENCE */}
                  {section.id === 3 && (
                    <div className="space-y-5 pt-2">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-800">
                            Work & Internship Positions
                          </h4>
                          <p className="text-xs text-gray-500">
                            List recent roles in reverse-chronological order. Quantify results with metrics!
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("experience", {
                              company: "",
                              role: "",
                              startDate: "",
                              endDate: "",
                              location: "",
                              bullets: [""]
                            })
                          }
                          className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <FaPlus /> Add Experience Role
                        </button>
                      </div>

                      {(data.experience || []).length === 0 ? (
                        <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 space-y-3">
                          <p className="text-xs text-gray-500 font-medium">
                            No work or internship experience added yet.
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              addArrayItem("experience", {
                                company: "AccenLearn Technologies",
                                role: "Software Engineering Intern",
                                startDate: "May 2026",
                                endDate: "July 2026",
                                location: "Bangalore, India",
                                bullets: [
                                  "Engineered high-performance React frontend modules and Node.js REST APIs, increasing user session duration by 28% across 5,000+ daily active users.",
                                  "Optimized MongoDB aggregation pipelines and database indexing, reducing average backend latency from 450ms to 180ms."
                                ]
                              })
                            }
                            className="px-4 py-2.5 bg-secondary/15 text-secondary font-extrabold text-xs rounded-xl hover:bg-secondary/25 transition-all cursor-pointer border border-secondary/30 inline-flex items-center gap-1.5"
                          >
                            ✨ Insert Sample Internship Entry
                          </button>
                        </div>
                      ) : (
                        (data.experience || []).map((exp, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/90 relative space-y-4 shadow-2xs"
                          >
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                              <span className="text-xs font-black text-gray-800 uppercase tracking-wider">
                                Role #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem("experience", idx)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer flex items-center gap-1 text-xs font-bold"
                              >
                                <FaTrash size={12} /> Remove
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2">
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Company / Organization *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. AccenLearn Technologies"
                                  value={exp.company || ""}
                                  onChange={(e) => updateArrayItem("experience", idx, "company", e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Job Role / Title *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Software Engineering Intern"
                                  value={exp.role || ""}
                                  onChange={(e) => updateArrayItem("experience", idx, "role", e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Duration / Date Range
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. May 2026 - July 2026"
                                  value={exp.startDate || ""}
                                  onChange={(e) => updateArrayItem("experience", idx, "startDate", e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Location
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Bangalore, India / Remote"
                                  value={exp.location || ""}
                                  onChange={(e) => updateArrayItem("experience", idx, "location", e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-gray-700">
                                  Key Achievements (Bullet points - 1 per line)
                                </label>
                                <span className="text-[11px] text-primary font-bold bg-primary/10 px-2.5 py-0.5 rounded-md">
                                  Tip: Action Verb + Task + % Impact
                                </span>
                              </div>
                              <textarea
                                rows="3"
                                placeholder={`• Engineered high-performance React modules, increasing user session duration by 28%.\n• Optimized MongoDB aggregation pipelines, reducing backend latency by 35%.`}
                                value={Array.isArray(exp.bullets) ? exp.bullets.join("\n") : exp.bullets || ""}
                                onChange={(e) => updateArrayItem("experience", idx, "bullets", e.target.value.split("\n"))}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary leading-relaxed font-mono"
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* SECTION 4: EDUCATION & DEGREES */}
                  {section.id === 4 && (
                    <div className="space-y-5 pt-2">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-800">
                            Academic Degrees & Schools
                          </h4>
                          <p className="text-xs text-gray-500">
                            List colleges/universities along with degrees, graduation years, and GPA.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("education", {
                              degree: "",
                              institution: "",
                              year: "",
                              score: ""
                            })
                          }
                          className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <FaPlus /> Add Degree
                        </button>
                      </div>

                      {(data.education || []).map((edu, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/90 relative space-y-4 shadow-2xs"
                        >
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                            <span className="text-xs font-black text-gray-800 uppercase tracking-wider">
                              Degree #{idx + 1}
                            </span>
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem("education", idx)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer flex items-center gap-1 text-xs font-bold"
                              >
                                <FaTrash size={12} /> Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pr-2">
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                Degree / Course Name *
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. B.Tech in Computer Science & Engineering"
                                value={edu.degree || ""}
                                onChange={(e) => updateArrayItem("education", idx, "degree", e.target.value)}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                University / College *
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Vellore Institute of Technology"
                                value={edu.institution || ""}
                                onChange={(e) => updateArrayItem("education", idx, "institution", e.target.value)}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                Graduation Year / GPA
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 2023 – 2027 (GPA: 8.9/10)"
                                value={edu.year || ""}
                                onChange={(e) => updateArrayItem("education", idx, "year", e.target.value)}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 5: TECHNICAL SKILLS & KEYWORDS */}
                  {section.id === 5 && (
                    <div className="space-y-5 pt-2">
                      <div>
                        <h4 className="text-sm font-extrabold text-gray-800">
                          ATS Keyword Tags & Technical Skills
                        </h4>
                        <p className="text-xs text-gray-500">
                          Recruiters and automated ATS scanners parse these skill chips first. Aim for 8-12 tags!
                        </p>
                      </div>

                      {["languages", "frameworks", "tools"].map((cat) => {
                        const titleMap = {
                          languages: "Programming Languages",
                          frameworks: "Libraries & Web Frameworks",
                          tools: "Databases, Cloud & DevOps Tools"
                        };
                        const currentList = data.skills?.[cat] || [];

                        return (
                          <div
                            key={cat}
                            className="p-4.5 rounded-2xl bg-gray-50/90 border border-gray-200/80 space-y-3 shadow-2xs"
                          >
                            <label className="block text-xs font-extrabold text-primary uppercase tracking-wider">
                              {titleMap[cat]}
                            </label>

                            {/* Active Skill Chips */}
                            <div className="flex flex-wrap gap-2 min-h-[32px] items-center">
                              {currentList.length === 0 ? (
                                <span className="text-xs text-gray-400 italic">
                                  No {cat} added yet. Type below or click quick suggestions.
                                </span>
                              ) : (
                                currentList.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl shadow-2xs transition-all hover:border-red-300 group"
                                  >
                                    <span>{skill}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeSkill(cat, idx)}
                                      className="text-gray-400 group-hover:text-red-500 cursor-pointer transition-colors"
                                      title="Remove skill"
                                    >
                                      <FaTimes size={11} />
                                    </button>
                                  </span>
                                ))
                              )}
                            </div>

                            {/* Add Skill Input Row */}
                            <div className="flex gap-2 pt-1">
                              <input
                                type="text"
                                placeholder={`Add a new ${cat.slice(0, -1)}... (Press Enter)`}
                                value={skillInput[cat]}
                                onChange={(e) => setSkillInput({ ...skillInput, [cat]: e.target.value })}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addSkill(cat, skillInput[cat]);
                                  }
                                }}
                                className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                              />
                              <button
                                type="button"
                                onClick={() => addSkill(cat, skillInput[cat])}
                                className="px-4 py-2 bg-primary text-white text-xs font-extrabold rounded-xl hover:bg-primary-dark transition-all cursor-pointer shadow-2xs"
                              >
                                + Add
                              </button>
                            </div>

                            {/* Quick Skill Suggestions */}
                            <div className="pt-1.5 flex flex-wrap items-center gap-1.5">
                              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                                Quick Add:
                              </span>
                              {quickSkillsSuggestions[cat].map((s, i) => {
                                const isAdded = currentList.includes(s);
                                return (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => !isAdded && addSkill(cat, s)}
                                    disabled={isAdded}
                                    className={`px-2.5 py-1 text-[11px] rounded-lg font-bold transition-all cursor-pointer ${
                                      isAdded
                                        ? "bg-emerald-100/70 text-emerald-800 opacity-70 cursor-default"
                                        : "bg-gray-200/80 text-gray-700 hover:bg-primary hover:text-white shadow-2xs"
                                    }`}
                                  >
                                    {isAdded ? "✓ " : "+ "}{s}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* SECTION 6: TECHNICAL PROJECTS */}
                  {section.id === 6 && (
                    <div className="space-y-5 pt-2">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-800">
                            Standout Technical Projects
                          </h4>
                          <p className="text-xs text-gray-500">
                            Showcase 2-3 high-impact software projects with live deployment/GitHub links.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("projects", {
                              title: "",
                              techStack: "",
                              link: "",
                              bullets: [""]
                            })
                          }
                          className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <FaPlus /> Add Project
                        </button>
                      </div>

                      {(data.projects || []).length === 0 ? (
                        <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 space-y-3">
                          <p className="text-xs text-gray-500 font-medium">
                            No projects added yet.
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              addArrayItem("projects", {
                                title: "AI Technical Interview Analyzer",
                                techStack: "Python, FastAPI, React, OpenAI API, Docker",
                                link: "github.com/arjunkumar/ai-analyzer",
                                bullets: [
                                  "Architected a real-time speech and coding interview assessment engine utilizing Python and LLM prompt engineering with 94% evaluation accuracy.",
                                  "Containerized full-stack microservices using Docker and deployed cloud infrastructure on AWS EC2 with automated CI/CD pipelines."
                                ]
                              })
                            }
                            className="px-4 py-2.5 bg-primary text-white font-extrabold text-xs rounded-xl hover:bg-primary-dark transition-all cursor-pointer shadow-md inline-flex items-center gap-1.5"
                          >
                            + Insert Sample Standout Project
                          </button>
                        </div>
                      ) : (
                        (data.projects || []).map((proj, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/90 relative space-y-4 shadow-2xs"
                          >
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                              <span className="text-xs font-black text-gray-800 uppercase tracking-wider">
                                Project #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem("projects", idx)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer flex items-center gap-1 text-xs font-bold"
                              >
                                <FaTrash size={12} /> Remove
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pr-2">
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Project Title *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. AI Interview Analyzer"
                                  value={proj.title || ""}
                                  onChange={(e) => updateArrayItem("projects", idx, "title", e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Tech Stack Used *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Python, FastAPI, React, Docker"
                                  value={proj.techStack || ""}
                                  onChange={(e) => updateArrayItem("projects", idx, "techStack", e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  GitHub / Live URL
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. github.com/arjunkumar/ai-analyzer"
                                  value={proj.link || ""}
                                  onChange={(e) => updateArrayItem("projects", idx, "link", e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none focus:border-primary"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-gray-700">
                                  Project Highlights (1 bullet per line)
                                </label>
                                <span className="text-[11px] text-primary font-bold bg-primary/10 px-2.5 py-0.5 rounded-md">
                                  Tip: Highlight architecture & metrics
                                </span>
                              </div>
                              <textarea
                                rows="3"
                                placeholder={`• Architected real-time assessment engine utilizing Python and LLM prompt engineering with 94% evaluation accuracy.\n• Containerized full-stack microservices using Docker on AWS EC2.`}
                                value={Array.isArray(proj.bullets) ? proj.bullets.join("\n") : proj.bullets || ""}
                                onChange={(e) => updateArrayItem("projects", idx, "bullets", e.target.value.split("\n"))}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-medium focus:outline-none focus:border-primary leading-relaxed font-mono"
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* SECTION 7: CERTIFICATIONS & HONORS */}
                  {section.id === 7 && (
                    <div className="space-y-5 pt-2">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-800">
                            Industry Certifications & Awards
                          </h4>
                          <p className="text-xs text-gray-500">
                            Recognized credentials like AWS, Google Cloud, HackerRank, or hackathon honors.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("certifications", {
                              title: "",
                              issuer: "",
                              date: ""
                            })
                          }
                          className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <FaPlus /> Add Certification
                        </button>
                      </div>

                      {(data.certifications || []).map((cert, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/90 relative flex flex-wrap sm:flex-nowrap items-center gap-3 pr-10 shadow-2xs"
                        >
                          <button
                            type="button"
                            onClick={() => removeArrayItem("certifications", idx)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            title="Remove certification"
                          >
                            <FaTrash size={13} />
                          </button>

                          <div className="flex-1 min-w-[200px]">
                            <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                              Certificate Title *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. AWS Certified Cloud Practitioner"
                              value={cert.title || ""}
                              onChange={(e) => updateArrayItem("certifications", idx, "title", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold"
                            />
                          </div>
                          <div className="w-full sm:w-48">
                            <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                              Issuer
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Amazon Web Services"
                              value={cert.issuer || ""}
                              onChange={(e) => updateArrayItem("certifications", idx, "issuer", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold"
                            />
                          </div>
                          <div className="w-full sm:w-32">
                            <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                              Year
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 2025"
                              value={cert.date || ""}
                              onChange={(e) => updateArrayItem("certifications", idx, "date", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 8: REVIEW & ATS AUDIT */}
                  {section.id === 8 && (
                    <div className="space-y-6 pt-2">
                      <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-[#133038] to-gray-900 text-white space-y-4 shadow-lg">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block mb-2">
                              Real-Time ATS Parser Audit
                            </span>
                            <h4 className="text-xl font-black">
                              Your Resume ATS Readiness Score: {atsScore}%
                            </h4>
                            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                              {atsScore >= 80
                                ? "Excellent! Your resume has strong keyword density, quantified achievements, and standard ATS formatting."
                                : "Good progress! Review the recommendations below to push your score above 80% for top recruiter visibility."}
                            </p>
                          </div>

                          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center shrink-0">
                            <span className="text-2xl font-black text-emerald-400 font-mono">
                              {atsScore}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-300">
                              Score
                            </span>
                          </div>
                        </div>

                        {/* Recommendations List */}
                        <div className="pt-3 border-t border-white/15 space-y-2">
                          <span className="text-xs font-bold text-gray-300 block">
                            Key Recommendations from ATS Audit:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-200">
                            <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                              <FaCheckCircle className="text-emerald-400 shrink-0" />
                              <span>Quantify experience bullets with %, numbers, and dollar metrics.</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                              <FaCheckCircle className="text-emerald-400 shrink-0" />
                              <span>Include at least 8-12 technical skill keywords across categories.</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                              <FaCheckCircle className="text-emerald-400 shrink-0" />
                              <span>Use standard headings like Summary, Experience, and Education.</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                              <FaCheckCircle className="text-emerald-400 shrink-0" />
                              <span>Ensure contact section has valid email, phone, and LinkedIn URL.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Final Action Controls */}
                      <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3 text-emerald-900">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg shrink-0 shadow-sm">
                            <FaCheck />
                          </div>
                          <div>
                            <h5 className="text-sm font-black">
                              Ready to Export or Print?
                            </h5>
                            <p className="text-xs text-emerald-700">
                              Your resume is saved and ready for one-click PDF generation.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={onPrint}
                          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                        >
                          <FaCheckCircle /> Print / Save as PDF
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Section Navigation Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(Math.max(1, section.id - 1))}
                      disabled={section.id === 1}
                      className={`w-full sm:w-auto min-h-[48px] sm:min-h-0 px-4.5 py-2.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        section.id === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                      }`}
                    >
                      <FaArrowLeft /> Previous Section
                    </button>

                    {section.id < 8 ? (
                      <button
                        type="button"
                        onClick={() => setStep(section.id + 1)}
                        className="w-full sm:w-auto min-h-[48px] sm:min-h-0 px-5 py-2.5 sm:py-2 bg-primary text-white text-xs font-extrabold rounded-xl shadow-md hover:bg-primary-dark transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-105"
                      >
                        Next: {sections.find((s) => s.id === section.id + 1)?.title} <FaArrowRight />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onPrint}
                        className="w-full sm:w-auto min-h-[48px] sm:min-h-0 px-5 py-2.5 sm:py-2 bg-emerald-600 text-white text-xs font-extrabold rounded-xl shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-105"
                      >
                        <FaCheck /> Export Final PDF
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeForm;
