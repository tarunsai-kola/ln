import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SharedBreadcrumb from "../../components/SharedBreadcrumb";
import AdvancedApplyPopup from "../../components/AdvancedApplyPopup";
import { WORKSHOP_CONTENT, DEFAULT_WORKSHOP_CONTENT } from "../../shared/workshopContent";
import { getDynamicWorkshopData } from "../../shared/workshopDynamicData";

// Import all new premium components
import ProgramHero from "./components/ProgramHero";
import ProgramHighlights from "./components/ProgramHighlights";
import CareerTracks from "./components/CareerTracks";
import CurriculumRoadmap from "./components/CurriculumRoadmap";
import ProjectsShowcase from "./components/ProjectsShowcase";
import SalaryGrowth from "./components/SalaryGrowth";
import CareerOutcomes from "./components/CareerOutcomes";
import TestimonialsInstructors from "./components/TestimonialsInstructors";
import PricingFAQ from "./components/PricingFAQ";
import IbmCertificationPath from "../../components/IbmCertificationPath";

const Workshop2 = ({ title = "Technical Domains" }) => {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const { pathname } = useLocation();

  const content = WORKSHOP_CONTENT[title] || DEFAULT_WORKSHOP_CONTENT;
  const resolvedProgram = {
    ...content,
    title: content.title || title,
    duration: content.duration || "2–3 Months",
    brochure: content.brochure || "/brochures/default.pdf",
    highlights: content.highlights || [
      "Designed for students, graduates and professionals",
      "NSDC Accredited",
      "Skill India Certified",
      "Industry Expert Trainers",
      "100+ Internship Partners"
    ]
  };

  const dynamicData = getDynamicWorkshopData(title);

  const handleOpenApplyModal = () => setIsApplyOpen(true);
  const handleCloseApplyModal = () => setIsApplyOpen(false);

  const handleScrollToCurriculum = () => {
    const el = document.getElementById("curriculum");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30">

      <ProgramHero 
        content={content} 
        onEnroll={handleOpenApplyModal} 
        onDownload={handleScrollToCurriculum} 
      />
      
      <ProgramHighlights features={content.features} />
      
      <CareerTracks title={title} tracks={dynamicData.careerTracks} />
      
      <CurriculumRoadmap features={content.features} phases={dynamicData.curriculum} />
      
      <ProjectsShowcase title={title} projects={dynamicData.projects} />
      
      <SalaryGrowth title={title} salaryData={dynamicData.salaryData} techStack={dynamicData.techStack} />
      
      <CareerOutcomes title={title} />
      
      <TestimonialsInstructors />
      
      <IbmCertificationPath />
      <PricingFAQ onEnroll={handleOpenApplyModal} />

      {isApplyOpen && (
        <AdvancedApplyPopup
          onClose={handleCloseApplyModal}
          initialDomain={title}
        />
      )}
    </div>
  );
};

export default Workshop2;
