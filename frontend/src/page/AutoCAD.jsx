import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const AutoCAD = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "AutoCAD & 3D Modeling",
  "heroSubtitle": "Master 2D drafting, 3D architectural modeling, and industrial design principles in this intensive 16-week professional program.",
  "toolsSubtitle": "Master the modern Drafting & Design stack",
  "trackSubtitle": "A dedicated Design track tailored to your current experience level.",
  "trackButtonLabel": "Start Your Design Career →",
  "projectLabel": "Design Project",
  "careerOutcomesDomain": "SoftwareDeveloper",
  "trustStats": [
    {
      "value": "16 Weeks",
      "label": "Duration"
    },
    {
      "value": "100% Online",
      "label": "Format"
    },
    {
      "value": "20+ Blueprints",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "2D & 3D Drafting",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "AutoCAD",
      "img": "https://upload.wikimedia.org/wikipedia/commons/2/29/Autodesk_AutoCAD_icon.png"
    },
    {
      "name": "Revit",
      "img": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Revit_Architecture_icon.png"
    },
    {
      "name": "SketchUp",
      "img": "https://upload.wikimedia.org/wikipedia/commons/0/00/SketchUp_Logo.svg"
    },
    {
      "name": "SolidWorks",
      "img": "https://upload.wikimedia.org/wikipedia/commons/e/e0/SolidWorks_Logo.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Junior CAD Drafters & Design Assistants",
      "desc": "Master the fundamentals of 2D drafting, geometry, and technical drawing standards.",
      "benefits": [
        "Create precise 2D floor plans, elevations, and mechanical parts",
        "Master AutoCAD layers, blocks, and dimensioning",
        "Understand industry drafting standards (ANSI/ISO)"
      ],
      "quote": "I want to transition into a professional drafting role in architecture or manufacturing.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "CAD Designers & 3D Modelers",
      "desc": "Transition from flat 2D drawings to complex 3D modeling and rendering.",
      "benefits": [
        "Build complex 3D architectural models and mechanical assemblies",
        "Generate photorealistic renderings and walkthroughs",
        "Integrate AutoCAD with BIM (Building Information Modeling) workflows"
      ],
      "quote": "I need to upgrade my skills to 3D modeling and parametric design.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Design Leads & BIM Managers",
      "desc": "Lead large-scale infrastructure projects and manage design teams.",
      "benefits": [
        "Manage multi-disciplinary BIM coordination (Architectural, MEP, Structural)",
        "Develop custom AutoCAD LISP scripts to automate workflows",
        "Lead project design lifecycles from concept to construction documentation"
      ],
      "quote": "My focus is on managing large-scale design projects and optimizing team workflows.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–3",
      "title": "AutoCAD Interface & 2D Drafting",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Navigating the AutoCAD UI, Command Line, and Workspace",
        "Coordinate systems (Absolute, Relative, Polar)",
        "Basic Draw and Modify commands (Line, Trim, Extend, Offset)",
        "Understanding Orthographic Projections"
      ],
      "application": "Drafting a detailed 2D Mechanical Part"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 4–6",
      "title": "Advanced 2D & Organization",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Layer Management, Linetypes, and Lineweights",
        "Creating and utilizing reusable Blocks and WBlocks",
        "Hatching, Gradients, and Design Center",
        "Advanced dimensioning, leaders, and text styles"
      ],
      "application": "Creating a comprehensive 2D Residential Floor Plan"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 7–9",
      "title": "Layouts, Plotting & Standards",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Model Space vs Paper Space layouts",
        "Creating title blocks and setting up viewports",
        "Scaling annotations and dimensions for print",
        "Plotting to PDF and physical printers using CTB files"
      ],
      "application": "Publishing a Multi-Sheet Construction Document Set"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 10–12",
      "title": "3D Modeling Fundamentals",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Navigating the 3D workspace and manipulating the UCS",
        "Extrude, Revolve, Sweep, and Loft commands",
        "Boolean operations (Union, Subtract, Intersect)",
        "Creating 3D primitive solids and surface modeling"
      ],
      "application": "Modeling a 3D Mechanical Gear Assembly"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 13–15",
      "title": "3D Architectural & Rendering",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Converting 2D floor plans into 3D structures",
        "Applying materials, textures, and lighting",
        "Camera setup and creating walkthrough animations",
        "Exporting models to external renderers"
      ],
      "application": "Rendering a Photorealistic 3D Interior Room"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 16",
      "title": "Portfolio Polish & Placement",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Compiling a professional CAD portfolio",
        "Introduction to AutoLISP for automation",
        "Technical drawing interview tests",
        "Resume review and job placement assistance"
      ],
      "application": "Final Portfolio Submission"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "Layers",
      "title": "Complete Residential Blueprint",
      "desc": "Draft a full set of 2D residential plans including floor plans, elevations, section views, and electrical layouts to industry standards.",
      "tools": [
        "AutoCAD 2D",
        "Layers",
        "Layouts"
      ]
    },
    {
      "icon": "Target",
      "title": "Parametric Mechanical Assembly",
      "desc": "Model a complex 3D mechanical engine part, utilizing precise boolean operations, fillets, and generating orthographic projection views.",
      "tools": [
        "AutoCAD 3D",
        "Solid Modeling",
        "Drafting"
      ]
    },
    {
      "icon": "MonitorPlay",
      "title": "3D Architectural Walkthrough",
      "desc": "Extrude a 2D floor plan into a full 3D house, apply realistic textures/lighting, and generate a video walkthrough.",
      "tools": [
        "AutoCAD 3D",
        "Rendering",
        "Materials"
      ]
    },
    {
      "icon": "Workflow",
      "title": "Automated LISP Workflow",
      "desc": "Develop a custom AutoLISP script to automate a repetitive drafting task, significantly increasing your workflow speed.",
      "tools": [
        "AutoLISP",
        "Automation",
        "AutoCAD"
      ]
    }
  ],
  "faqData": [
    {
      "q": "Is this for architecture or mechanical engineering?",
      "a": "Both! The core concepts of AutoCAD apply universally. We include projects tailored to both Architectural drafting and Mechanical design."
    },
    {
      "q": "Do I need to purchase AutoCAD?",
      "a": "Autodesk provides a free 1-year Educational License to students, which we will help you set up in Week 1."
    },
    {
      "q": "What computer specs do I need?",
      "a": "You need a PC or Mac with at least 8GB of RAM (16GB recommended) and a dedicated graphics card for the 3D modeling phases."
    },
    {
      "q": "Does the course cover BIM or Revit?",
      "a": "This course primarily focuses on mastering AutoCAD. We briefly introduce BIM concepts, but deep Revit training is a separate advanced track."
    },
    {
      "q": "Can I get a job as a Drafter without a degree?",
      "a": "Yes, the drafting industry relies heavily on strong portfolios. If you can produce clean, standard-compliant drawings, you can secure drafting roles."
    },
    {
      "q": "How long is the course?",
      "a": "This is a fast-paced 16-week (4-month) intensive course designed to get you job-ready quickly."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default AutoCAD;
