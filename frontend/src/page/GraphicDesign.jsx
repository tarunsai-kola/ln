import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const GraphicDesign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "Graphic Design & UI Visuals",
  "heroSubtitle": "Master Adobe Creative Cloud, typography, branding, and digital illustration in this comprehensive 16-week creative program.",
  "toolsSubtitle": "Master the modern Creative stack",
  "trackSubtitle": "A dedicated Creative track tailored to your current experience level.",
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
      "value": "20+ Assets",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "Adobe CC",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "Photoshop",
      "img": "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
    },
    {
      "name": "Illustrator",
      "img": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
    },
    {
      "name": "InDesign",
      "img": "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg"
    },
    {
      "name": "Figma",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
    },
    {
      "name": "After Effects",
      "img": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Junior Graphic Designers & Visual Artists",
      "desc": "Master the fundamentals of color theory, typography, and Adobe Creative Cloud tools.",
      "benefits": [
        "Create stunning photo manipulations and composites in Photoshop",
        "Design crisp vector logos and illustrations in Illustrator",
        "Understand the foundational principles of layout and alignment"
      ],
      "quote": "I want to turn my creative ideas into professional digital assets.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Brand Designers & Art Directors",
      "desc": "Transition into designing comprehensive brand identities and print publications.",
      "benefits": [
        "Develop complete brand guidelines (logos, typography, color palettes)",
        "Design multi-page layouts (magazines, brochures) using InDesign",
        "Create engaging social media campaigns and digital marketing assets"
      ],
      "quote": "I want to design entire brand experiences, not just single images.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Creative Directors & Lead Designers",
      "desc": "Lead creative teams and direct the visual strategy for major campaigns.",
      "benefits": [
        "Direct photoshoots, video productions, and overall visual strategy",
        "Manage client relationships and pitch creative concepts",
        "Ensure brand consistency across all global touchpoints"
      ],
      "quote": "My focus is on creative leadership, strategy, and directing major campaigns.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–3",
      "title": "Design Theory & Photoshop",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Color Theory, Typography, and Composition principles",
        "Photoshop Interface, Layers, Masks, and Selections",
        "Photo Retouching, Color Correction, and Blending Modes",
        "Creating Photo Manipulations and Digital Composites"
      ],
      "application": "Designing a Cinematic Movie Poster"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 4–6",
      "title": "Vector Graphics (Illustrator)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Illustrator Interface, Pen Tool Mastery, and Bezier Curves",
        "Working with Shapes, Pathfinders, and Gradients",
        "Typography in Illustrator and Custom Lettering",
        "Designing Vector Icons, Badges, and Flat Illustrations"
      ],
      "application": "Creating a Scalable Flat Illustration & Icon Set"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 7–9",
      "title": "Branding & Identity",
      "focusLabel": "CURRICULUM",
      "focus": [
        "The psychology of Logo Design and Branding",
        "Creating Mood Boards and exploring design concepts",
        "Developing comprehensive Brand Guidelines",
        "Designing Business Cards, Letterheads, and Merch"
      ],
      "application": "Complete Brand Identity Package for a Startup"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 10–12",
      "title": "Print Layout & InDesign",
      "focusLabel": "CURRICULUM",
      "focus": [
        "InDesign Interface, Master Pages, and Grids",
        "Typography Formatting (Paragraph & Character Styles)",
        "Image placing, text wrapping, and pre-flighting",
        "Exporting files for professional Print (CMYK, Bleeds)"
      ],
      "application": "Designing a 4-Page Magazine Editorial Layout"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 13–15",
      "title": "Digital & UI Visuals (Figma)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Designing for Screens (Web vs Mobile, RGB vs CMYK)",
        "Figma Basics: Frames, Components, and Auto-Layout",
        "Designing Social Media Ad Campaigns",
        "Creating basic UI/UX wireframes and mockups"
      ],
      "application": "Designing an engaging Instagram Ad Campaign"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 16",
      "title": "Portfolio Polish & Placement",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Curating a professional design portfolio on Behance",
        "Presenting your design decisions effectively",
        "Freelancing tips: Finding clients and pricing your work",
        "Resume review and agency interview preparation"
      ],
      "application": "Final Behance Portfolio Launch"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "Layers",
      "title": "Cinematic Movie Poster",
      "desc": "Use advanced Photoshop masking, blending modes, and typography to create a hyper-realistic, professional movie poster.",
      "tools": [
        "Photoshop",
        "Typography",
        "Compositing"
      ]
    },
    {
      "icon": "Target",
      "title": "Corporate Identity Package",
      "desc": "Design a logo from scratch in Illustrator and build a complete branding package including business cards, letterheads, and brand guidelines.",
      "tools": [
        "Illustrator",
        "Branding",
        "Vector"
      ]
    },
    {
      "icon": "Workflow",
      "title": "Magazine Editorial Layout",
      "desc": "Use InDesign to layout a professional 4-page magazine spread, mastering text wrapping, master pages, and print-ready bleeds.",
      "tools": [
        "InDesign",
        "Print Design",
        "Typography"
      ]
    },
    {
      "icon": "MonitorPlay",
      "title": "Digital Marketing Campaign",
      "desc": "Design a cohesive set of social media advertisements and web banners using Figma, optimized for various screen sizes.",
      "tools": [
        "Figma",
        "Digital Design",
        "UI"
      ]
    }
  ],
  "faqData": [
    {
      "q": "Do I need to know how to draw?",
      "a": "No! While drawing skills can be helpful for illustration, graphic design is primarily about composition, layout, typography, and utilizing software tools."
    },
    {
      "q": "Do I need to buy Adobe Creative Cloud?",
      "a": "Yes, you will need a subscription to Adobe Creative Cloud (at least Photoshop, Illustrator, and InDesign). Adobe offers heavy student discounts."
    },
    {
      "q": "Mac or PC?",
      "a": "Both are perfectly fine! The Adobe tools operate almost identically on both Windows and macOS."
    },
    {
      "q": "Will this teach me UI/UX?",
      "a": "We cover the visual design aspects of UI (in Phase 5 with Figma), but this is primarily a Graphic Design course. Deep UX research is a separate discipline."
    },
    {
      "q": "How do I build my portfolio?",
      "a": "Every assignment in this course is designed to be a portfolio piece. By Week 16, you will have a full Behance portfolio ready to show employers."
    },
    {
      "q": "Can I freelance after this course?",
      "a": "Absolutely. Graphic Design has one of the largest freelance markets in the world, and we cover freelancing basics in the final week."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default GraphicDesign;
