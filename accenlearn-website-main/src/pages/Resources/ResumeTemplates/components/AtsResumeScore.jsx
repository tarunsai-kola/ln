import React, { useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaCheck, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

export const calculateAtsScore = (data) => {
  if (!data) return { score: 0, details: [] };

  let score = 0;
  const details = [];

  // 1. Contact Information (Max 15 pts)
  let contactPts = 0;
  const missingContact = [];
  if (data.name?.trim()) contactPts += 4; else missingContact.push("Full Name");
  if (data.email?.trim() && data.email.includes("@")) contactPts += 4; else missingContact.push("Professional Email");
  if (data.phone?.trim()) contactPts += 4; else missingContact.push("Phone Number");
  if (data.linkedin?.trim() || data.github?.trim() || data.portfolio?.trim()) contactPts += 3; else missingContact.push("LinkedIn or GitHub URL");

  score += contactPts;
  details.push({
    category: "Contact & Profile Links",
    points: contactPts,
    max: 15,
    passed: contactPts === 15,
    tip: contactPts === 15 
      ? "Excellent: Complete contact details with professional URLs allow parsers and recruiters to reach you directly." 
      : `Missing: ${missingContact.join(", ")}. Add these for +${15 - contactPts} pts.`
  });

  // 2. Target Role & Professional Summary (Max 15 pts)
  let summaryPts = 0;
  if (data.targetRole?.trim()) summaryPts += 5;
  const summaryWords = data.summary?.trim() ? data.summary.trim().split(/\s+/).length : 0;
  if (summaryWords >= 35) {
    summaryPts += 10;
  } else if (summaryWords >= 15) {
    summaryPts += 6;
  }

  score += summaryPts;
  details.push({
    category: "Professional Summary & Target Title",
    points: summaryPts,
    max: 15,
    passed: summaryPts === 15,
    tip: summaryPts === 15
      ? "Strong summary targeting your specific job role with keyword density."
      : summaryWords < 15 
        ? "Add a detailed professional summary (35+ words) focusing on your tech stack and achievements for +10 pts."
        : "Expand your summary slightly with key tools and career objective (+4 pts)."
  });

  // 3. Technical Skills Categorization (Max 20 pts)
  let skillsPts = 0;
  const allSkills = [
    ...(data.skills?.languages || []),
    ...(data.skills?.frameworks || []),
    ...(data.skills?.tools || [])
  ];
  if (allSkills.length >= 10) {
    skillsPts = 20;
  } else if (allSkills.length >= 6) {
    skillsPts = 15;
  } else if (allSkills.length >= 3) {
    skillsPts = 10;
  } else if (allSkills.length > 0) {
    skillsPts = 5;
  }

  score += skillsPts;
  details.push({
    category: "Technical Skills & Keyword Density",
    points: skillsPts,
    max: 20,
    passed: skillsPts === 20,
    tip: skillsPts === 20
      ? `Great: ${allSkills.length} technical skills listed across languages, frameworks, and developer tools.`
      : `Currently ${allSkills.length} skills. Add at least 10 relevant skills/technologies across categories for optimal ATS keyword matching (+${20 - skillsPts} pts).`
  });

  // 4. Experience & Projects Depth (Max 20 pts)
  let depthPts = 0;
  const expCount = (data.experience || []).filter(e => e.company?.trim() || e.role?.trim()).length;
  const projCount = (data.projects || []).filter(p => p.title?.trim()).length;
  const totalEntries = expCount + projCount;

  if (totalEntries >= 3 || (expCount >= 1 && projCount >= 2)) {
    depthPts = 20;
  } else if (totalEntries === 2) {
    depthPts = 15;
  } else if (totalEntries === 1) {
    depthPts = 10;
  }

  score += depthPts;
  details.push({
    category: "Work Experience & Projects Depth",
    points: depthPts,
    max: 20,
    passed: depthPts === 20,
    tip: depthPts === 20
      ? `Solid portfolio structure with ${expCount} work/internship roles and ${projCount} technical projects.`
      : "Add more detailed project or internship experiences (aim for at least 2-3 entries) for +5-10 pts."
  });

  // Collect all bullet point strings from experience & projects
  const allBullets = [];
  (data.experience || []).forEach(e => {
    if (Array.isArray(e.bullets)) allBullets.push(...e.bullets);
    else if (typeof e.bullets === "string") allBullets.push(...e.bullets.split("\n"));
  });
  (data.projects || []).forEach(p => {
    if (Array.isArray(p.bullets)) allBullets.push(...p.bullets);
    else if (typeof p.bullets === "string") allBullets.push(...p.bullets.split("\n"));
  });

  // 5. Action Verbs Check (Max 15 pts)
  const actionVerbs = [
    "engineered", "architected", "developed", "built", "designed", "implemented", 
    "optimized", "spearheaded", "automated", "reduced", "increased", "collaborated", 
    "integrated", "managed", "created", "refactored", "deployed", "scaled", "led",
    "analyzed", "streamlined", "constructed", "orchestrated", "enhanced", "migrated"
  ];
  let foundVerbs = new Set();
  const lowerBulletsText = allBullets.join(" ").toLowerCase();
  actionVerbs.forEach(v => {
    if (new RegExp(`\\b${v}\\b`, "i").test(lowerBulletsText)) {
      foundVerbs.add(v);
    }
  });

  let verbPts = 0;
  if (foundVerbs.size >= 4) {
    verbPts = 15;
  } else if (foundVerbs.size >= 2) {
    verbPts = 10;
  } else if (foundVerbs.size === 1) {
    verbPts = 5;
  }

  score += verbPts;
  details.push({
    category: "High-Impact Action Verbs",
    points: verbPts,
    max: 15,
    passed: verbPts === 15,
    tip: verbPts === 15
      ? `Strong active language! Found distinct action verbs: ${Array.from(foundVerbs).slice(0, 5).join(", ")}.`
      : "Start bullet points with strong action verbs (e.g., Engineered, Deployed, Optimized, Architected) instead of passive phrasing (+5-10 pts)."
  });

  // 6. Quantifiable Impact & Metrics (XYZ Formula) (Max 15 pts)
  let metricsPts = 0;
  let quantifiedBulletsCount = 0;
  const metricRegex = /(\d+%|\$\d+|\d+\+|\b\d+\s*(ms|seconds|users|clients|hrs|hours|x|times)\b|\b(reduced|increased|improved|saved)\s+by\s+\d+)/i;
  
  allBullets.forEach(bullet => {
    if (metricRegex.test(bullet) || /\d+/.test(bullet)) {
      quantifiedBulletsCount++;
    }
  });

  if (quantifiedBulletsCount >= 3) {
    metricsPts = 15;
  } else if (quantifiedBulletsCount >= 1) {
    metricsPts = 9;
  }

  score += metricsPts;
  details.push({
    category: "Quantifiable Impact (XYZ Formula)",
    points: metricsPts,
    max: 15,
    passed: metricsPts === 15,
    tip: metricsPts === 15
      ? "Excellent quantification of outcomes (using percentages, numbers, and scale metrics)."
      : "Use Google's XYZ formula: 'Accomplished [X] as measured by [Y] (e.g. reduced latency by 35%), by doing [Z]'. Add metrics for +6-15 pts."
  });

  return { score: Math.min(100, score), details };
};

const AtsResumeScore = ({ data, onOptimizeClick }) => {
  const { score, details } = calculateAtsScore(data);
  const isApproved = score >= 80;
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gradient-to-br from-white via-gray-50/50 to-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 mb-8 transition-all">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-200/80">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left w-full lg:w-auto">
          {/* Score Gauge */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="10"
                className="text-gray-200"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * score) / 100}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${
                  score >= 80
                    ? "text-green-500"
                    : score >= 65
                    ? "text-amber-500"
                    : "text-red-500"
                }`}
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gray-800">{score}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5 justify-center sm:justify-start">
              <h3 className="text-2xl font-extrabold text-primary">ATS System Evaluation</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-sm ${
                  isApproved
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}
              >
                {isApproved ? (
                  <>
                    <FaCheckCircle className="text-green-600" /> ATS Approved (&gt;80 Score)
                  </>
                ) : (
                  <>
                    <FaExclamationTriangle className="text-amber-600" /> Needs Optimization
                  </>
                )}
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-xl">
              Applicant Tracking Systems scan formatting, keyword density, quantified achievements, and action verbs before a recruiter sees your resume.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0 justify-end">
          <button
            type="button"
            onClick={onOptimizeClick}
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>✨ Load Sample ATS-Ready Data</span>
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full sm:w-auto px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Hide Breakdown</span> <FaChevronUp />
              </>
            ) : (
              <>
                <span>Show Breakdown ({details.filter(d => !d.passed).length} tips)</span> <FaChevronDown />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Breakdown Checklist Accordion */}
      {isExpanded && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          {details.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                item.passed
                  ? "bg-green-50/50 border-green-100 text-green-900"
                  : "bg-gray-50 border-gray-200/80 text-gray-800"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.passed ? (
                  <FaCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <FaInfoCircle className="text-amber-500 text-lg" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-sm text-gray-900">{item.category}</h4>
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-white shadow-xs border border-gray-200 shrink-0">
                    {item.points} / {item.max} pts
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.tip}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AtsResumeScore;
