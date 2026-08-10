const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'page');

const courses = [
  {
    componentName: 'IoTRobotics',
    data: {
      heroTitle: "IoT & Robotics",
      heroSubtitle: "Engineer connected devices, smart sensors, and autonomous robotic systems in this intensive 24-week hardware program.",
      toolsSubtitle: "Master the modern IoT & Robotics stack",
      trackSubtitle: "A dedicated hardware track tailored to your current experience level.",
      trackButtonLabel: "Start Your IoT Career →",
      projectLabel: "Hardware Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "15+ Prototypes", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "IoT Architecture", label: "Core Focus" }
      ],
      toolsList: [
        { name: "Arduino", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" },
        { name: "Raspberry Pi", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
        { name: "AWS IoT", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Junior IoT Developers & Robotics Technicians",
          desc: "Build the foundational skills to program microcontrollers and interface with basic sensors.",
          benefits: ["Program ESP32 and Arduino microcontrollers using C/C++", "Interface with Analog and Digital sensors (Temperature, Motion, IMUs)", "Understand basic DC and Servo motor control for robotics"],
          quote: "I want to start building smart devices that interact with the physical world.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "IoT Systems Engineers & Robotics Developers",
          desc: "Transition into designing networked systems and complex robotic kinematics.",
          benefits: ["Implement secure MQTT communication protocols over WiFi/Cellular", "Develop Embedded Linux applications on Raspberry Pi using Python", "Implement basic autonomous navigation using ROS (Robot Operating System)"],
          quote: "I need to connect my devices to the cloud securely and build autonomous systems.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "IoT Solutions Architects & Robotics Leads",
          desc: "Design enterprise-scale IoT cloud architectures and manage robotics engineering teams.",
          benefits: ["Architect massive IoT fleets using AWS IoT Core and Azure IoT Hub", "Design secure Edge Computing pipelines and Over-The-Air (OTA) updates", "Lead multi-disciplinary teams (Hardware, Firmware, Cloud) to launch products"],
          quote: "My focus is on managing millions of connected devices securely and analyzing telemetry at scale.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Microcontrollers & Sensors", focusLabel: "CURRICULUM",
          focus: ["Introduction to Arduino, ESP32, and Embedded C++", "Digital & Analog I/O, PWM, and Hardware Interrupts", "Interfacing Sensors (DHT11, Ultrasonic, Accelerometers)", "Basic Actuators (DC Motors, Servos, Relays)"],
          application: "Building a Smart Automated Greenhouse Controller"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "IoT Communication Protocols", focusLabel: "CURRICULUM",
          focus: ["Local Communication (UART, I2C, SPI)", "Wireless Protocols (WiFi, Bluetooth Low Energy, LoRaWAN)", "Publish-Subscribe Messaging with MQTT", "Securing IoT communications using TLS/SSL"],
          application: "Wireless Sensor Network using ESP-NOW and MQTT"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Cloud Integration & Analytics", focusLabel: "CURRICULUM",
          focus: ["Connecting devices to AWS IoT Core", "Processing Telemetry Data with AWS Lambda & DynamoDB", "Visualizing Sensor Data in Real-Time Dashboards", "Edge Computing principles (Processing data locally)"],
          application: "Enterprise IoT Dashboard for Fleet Monitoring"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Robotics Foundations", focusLabel: "CURRICULUM",
          focus: ["Kinematics: Understanding robotic movement and joints", "PID Controllers (Proportional-Integral-Derivative) for smooth motion", "Motor Encoders and Closed-Loop Control Systems", "Line Following and Obstacle Avoidance Algorithms"],
          application: "Building an Autonomous PID Line-Following Robot"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 17–20", title: "Advanced Robotics (ROS & Linux)", focusLabel: "CURRICULUM",
          focus: ["Introduction to Embedded Linux and Raspberry Pi", "Python for Hardware Control (GPIO, PiCamera)", "Introduction to ROS (Robot Operating System) Nodes and Topics", "Computer Vision for Robotics using OpenCV"],
          application: "Raspberry Pi based Object Tracking Turret"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 21–24", title: "Security, OTA & Production", focusLabel: "CURRICULUM",
          focus: ["IoT Security Vulnerabilities and Mitigation (Botnets, DDoS)", "Implementing Over-The-Air (OTA) Firmware Updates", "PCB Design Basics (Schematics to Gerber files)", "Interview Prep, Project Polishing, and Placement"],
          application: "Final Secure End-to-End IoT Product Prototype"
        }
      ],
      capstoneProjects: [
        { icon: "Network", title: "Smart City Traffic Controller", desc: "Design a networked system of ESP32 microcontrollers that uses ultrasonic sensors to optimize traffic light timing via MQTT.", tools: ["ESP32", "MQTT", "C++"] },
        { icon: "Cpu", title: "Autonomous Warehouse Robot", desc: "Build a differential-drive robot that navigates a maze using PID control, motor encoders, and ultrasonic obstacle avoidance.", tools: ["Arduino", "PID", "Sensors"] },
        { icon: "Server", title: "AWS Cloud Telemetry Dashboard", desc: "Connect an ESP32 weather station to AWS IoT Core, securely transmitting telemetry to be visualized in a web dashboard.", tools: ["AWS IoT", "ESP32", "DynamoDB"] },
        { icon: "BrainCircuit", title: "ROS Vision-Based Sorter", desc: "Utilize a Raspberry Pi, OpenCV, and ROS to detect specific colored objects on a conveyor belt and trigger a servo sorting arm.", tools: ["ROS", "Python", "OpenCV"] }
      ],
      faqData: [
        { q: "Do I need to buy hardware kits?", a: "Yes, you will need a basic electronics kit containing an ESP32, sensors, jumper wires, and motors. We will provide a cheap Amazon purchase list (~$40) before Week 1." },
        { q: "What is the difference between IoT and Embedded Systems?", a: "Embedded Systems focuses heavily on the low-level microchip itself. IoT focuses on taking that chip and connecting it securely to the Cloud." },
        { q: "Is coding experience required?", a: "Basic programming logic is helpful, but we teach the necessary C++ and Python from scratch." },
        { q: "Will we learn ROS (Robot Operating System)?", a: "Yes, Phase 5 introduces the fundamental concepts of ROS nodes, topics, and messages using a Raspberry Pi." },
        { q: "Is this program suitable for Mechanical Engineers?", a: "Absolutely! Mechanical, Electrical, and Electronics engineers excel in this course as it bridges the gap between hardware and software." },
        { q: "How are the final projects evaluated?", a: "You will record video demonstrations of your hardware working in the real world and submit your GitHub repositories for code review." }
      ]
    }
  },
  {
    componentName: 'AutoCAD',
    data: {
      heroTitle: "AutoCAD & 3D Modeling",
      heroSubtitle: "Master 2D drafting, 3D architectural modeling, and industrial design principles in this intensive 16-week professional program.",
      toolsSubtitle: "Master the modern Drafting & Design stack",
      trackSubtitle: "A dedicated Design track tailored to your current experience level.",
      trackButtonLabel: "Start Your Design Career →",
      projectLabel: "Design Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "16 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "20+ Blueprints", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "2D & 3D Drafting", label: "Core Focus" }
      ],
      toolsList: [
        { name: "AutoCAD", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Autodesk_AutoCAD_icon.png" },
        { name: "Revit", img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Revit_Architecture_icon.png" },
        { name: "SketchUp", img: "https://upload.wikimedia.org/wikipedia/commons/0/00/SketchUp_Logo.svg" },
        { name: "SolidWorks", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/SolidWorks_Logo.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Junior CAD Drafters & Design Assistants",
          desc: "Master the fundamentals of 2D drafting, geometry, and technical drawing standards.",
          benefits: ["Create precise 2D floor plans, elevations, and mechanical parts", "Master AutoCAD layers, blocks, and dimensioning", "Understand industry drafting standards (ANSI/ISO)"],
          quote: "I want to transition into a professional drafting role in architecture or manufacturing.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "CAD Designers & 3D Modelers",
          desc: "Transition from flat 2D drawings to complex 3D modeling and rendering.",
          benefits: ["Build complex 3D architectural models and mechanical assemblies", "Generate photorealistic renderings and walkthroughs", "Integrate AutoCAD with BIM (Building Information Modeling) workflows"],
          quote: "I need to upgrade my skills to 3D modeling and parametric design.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Design Leads & BIM Managers",
          desc: "Lead large-scale infrastructure projects and manage design teams.",
          benefits: ["Manage multi-disciplinary BIM coordination (Architectural, MEP, Structural)", "Develop custom AutoCAD LISP scripts to automate workflows", "Lead project design lifecycles from concept to construction documentation"],
          quote: "My focus is on managing large-scale design projects and optimizing team workflows.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–3", title: "AutoCAD Interface & 2D Drafting", focusLabel: "CURRICULUM",
          focus: ["Navigating the AutoCAD UI, Command Line, and Workspace", "Coordinate systems (Absolute, Relative, Polar)", "Basic Draw and Modify commands (Line, Trim, Extend, Offset)", "Understanding Orthographic Projections"],
          application: "Drafting a detailed 2D Mechanical Part"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 4–6", title: "Advanced 2D & Organization", focusLabel: "CURRICULUM",
          focus: ["Layer Management, Linetypes, and Lineweights", "Creating and utilizing reusable Blocks and WBlocks", "Hatching, Gradients, and Design Center", "Advanced dimensioning, leaders, and text styles"],
          application: "Creating a comprehensive 2D Residential Floor Plan"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 7–9", title: "Layouts, Plotting & Standards", focusLabel: "CURRICULUM",
          focus: ["Model Space vs Paper Space layouts", "Creating title blocks and setting up viewports", "Scaling annotations and dimensions for print", "Plotting to PDF and physical printers using CTB files"],
          application: "Publishing a Multi-Sheet Construction Document Set"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 10–12", title: "3D Modeling Fundamentals", focusLabel: "CURRICULUM",
          focus: ["Navigating the 3D workspace and manipulating the UCS", "Extrude, Revolve, Sweep, and Loft commands", "Boolean operations (Union, Subtract, Intersect)", "Creating 3D primitive solids and surface modeling"],
          application: "Modeling a 3D Mechanical Gear Assembly"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 13–15", title: "3D Architectural & Rendering", focusLabel: "CURRICULUM",
          focus: ["Converting 2D floor plans into 3D structures", "Applying materials, textures, and lighting", "Camera setup and creating walkthrough animations", "Exporting models to external renderers"],
          application: "Rendering a Photorealistic 3D Interior Room"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 16", title: "Portfolio Polish & Placement", focusLabel: "CURRICULUM",
          focus: ["Compiling a professional CAD portfolio", "Introduction to AutoLISP for automation", "Technical drawing interview tests", "Resume review and job placement assistance"],
          application: "Final Portfolio Submission"
        }
      ],
      capstoneProjects: [
        { icon: "Layers", title: "Complete Residential Blueprint", desc: "Draft a full set of 2D residential plans including floor plans, elevations, section views, and electrical layouts to industry standards.", tools: ["AutoCAD 2D", "Layers", "Layouts"] },
        { icon: "Target", title: "Parametric Mechanical Assembly", desc: "Model a complex 3D mechanical engine part, utilizing precise boolean operations, fillets, and generating orthographic projection views.", tools: ["AutoCAD 3D", "Solid Modeling", "Drafting"] },
        { icon: "MonitorPlay", title: "3D Architectural Walkthrough", desc: "Extrude a 2D floor plan into a full 3D house, apply realistic textures/lighting, and generate a video walkthrough.", tools: ["AutoCAD 3D", "Rendering", "Materials"] },
        { icon: "Workflow", title: "Automated LISP Workflow", desc: "Develop a custom AutoLISP script to automate a repetitive drafting task, significantly increasing your workflow speed.", tools: ["AutoLISP", "Automation", "AutoCAD"] }
      ],
      faqData: [
        { q: "Is this for architecture or mechanical engineering?", a: "Both! The core concepts of AutoCAD apply universally. We include projects tailored to both Architectural drafting and Mechanical design." },
        { q: "Do I need to purchase AutoCAD?", a: "Autodesk provides a free 1-year Educational License to students, which we will help you set up in Week 1." },
        { q: "What computer specs do I need?", a: "You need a PC or Mac with at least 8GB of RAM (16GB recommended) and a dedicated graphics card for the 3D modeling phases." },
        { q: "Does the course cover BIM or Revit?", a: "This course primarily focuses on mastering AutoCAD. We briefly introduce BIM concepts, but deep Revit training is a separate advanced track." },
        { q: "Can I get a job as a Drafter without a degree?", a: "Yes, the drafting industry relies heavily on strong portfolios. If you can produce clean, standard-compliant drawings, you can secure drafting roles." },
        { q: "How long is the course?", a: "This is a fast-paced 16-week (4-month) intensive course designed to get you job-ready quickly." }
      ]
    }
  },
  {
    componentName: 'GraphicDesign',
    data: {
      heroTitle: "Graphic Design & UI Visuals",
      heroSubtitle: "Master Adobe Creative Cloud, typography, branding, and digital illustration in this comprehensive 16-week creative program.",
      toolsSubtitle: "Master the modern Creative stack",
      trackSubtitle: "A dedicated Creative track tailored to your current experience level.",
      trackButtonLabel: "Start Your Design Career →",
      projectLabel: "Design Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "16 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "20+ Assets", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "Adobe CC", label: "Core Focus" }
      ],
      toolsList: [
        { name: "Photoshop", img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
        { name: "Illustrator", img: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
        { name: "InDesign", img: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg" },
        { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
        { name: "After Effects", img: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Junior Graphic Designers & Visual Artists",
          desc: "Master the fundamentals of color theory, typography, and Adobe Creative Cloud tools.",
          benefits: ["Create stunning photo manipulations and composites in Photoshop", "Design crisp vector logos and illustrations in Illustrator", "Understand the foundational principles of layout and alignment"],
          quote: "I want to turn my creative ideas into professional digital assets.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Brand Designers & Art Directors",
          desc: "Transition into designing comprehensive brand identities and print publications.",
          benefits: ["Develop complete brand guidelines (logos, typography, color palettes)", "Design multi-page layouts (magazines, brochures) using InDesign", "Create engaging social media campaigns and digital marketing assets"],
          quote: "I want to design entire brand experiences, not just single images.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Creative Directors & Lead Designers",
          desc: "Lead creative teams and direct the visual strategy for major campaigns.",
          benefits: ["Direct photoshoots, video productions, and overall visual strategy", "Manage client relationships and pitch creative concepts", "Ensure brand consistency across all global touchpoints"],
          quote: "My focus is on creative leadership, strategy, and directing major campaigns.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–3", title: "Design Theory & Photoshop", focusLabel: "CURRICULUM",
          focus: ["Color Theory, Typography, and Composition principles", "Photoshop Interface, Layers, Masks, and Selections", "Photo Retouching, Color Correction, and Blending Modes", "Creating Photo Manipulations and Digital Composites"],
          application: "Designing a Cinematic Movie Poster"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 4–6", title: "Vector Graphics (Illustrator)", focusLabel: "CURRICULUM",
          focus: ["Illustrator Interface, Pen Tool Mastery, and Bezier Curves", "Working with Shapes, Pathfinders, and Gradients", "Typography in Illustrator and Custom Lettering", "Designing Vector Icons, Badges, and Flat Illustrations"],
          application: "Creating a Scalable Flat Illustration & Icon Set"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 7–9", title: "Branding & Identity", focusLabel: "CURRICULUM",
          focus: ["The psychology of Logo Design and Branding", "Creating Mood Boards and exploring design concepts", "Developing comprehensive Brand Guidelines", "Designing Business Cards, Letterheads, and Merch"],
          application: "Complete Brand Identity Package for a Startup"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 10–12", title: "Print Layout & InDesign", focusLabel: "CURRICULUM",
          focus: ["InDesign Interface, Master Pages, and Grids", "Typography Formatting (Paragraph & Character Styles)", "Image placing, text wrapping, and pre-flighting", "Exporting files for professional Print (CMYK, Bleeds)"],
          application: "Designing a 4-Page Magazine Editorial Layout"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 13–15", title: "Digital & UI Visuals (Figma)", focusLabel: "CURRICULUM",
          focus: ["Designing for Screens (Web vs Mobile, RGB vs CMYK)", "Figma Basics: Frames, Components, and Auto-Layout", "Designing Social Media Ad Campaigns", "Creating basic UI/UX wireframes and mockups"],
          application: "Designing an engaging Instagram Ad Campaign"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 16", title: "Portfolio Polish & Placement", focusLabel: "CURRICULUM",
          focus: ["Curating a professional design portfolio on Behance", "Presenting your design decisions effectively", "Freelancing tips: Finding clients and pricing your work", "Resume review and agency interview preparation"],
          application: "Final Behance Portfolio Launch"
        }
      ],
      capstoneProjects: [
        { icon: "Layers", title: "Cinematic Movie Poster", desc: "Use advanced Photoshop masking, blending modes, and typography to create a hyper-realistic, professional movie poster.", tools: ["Photoshop", "Typography", "Compositing"] },
        { icon: "Target", title: "Corporate Identity Package", desc: "Design a logo from scratch in Illustrator and build a complete branding package including business cards, letterheads, and brand guidelines.", tools: ["Illustrator", "Branding", "Vector"] },
        { icon: "Workflow", title: "Magazine Editorial Layout", desc: "Use InDesign to layout a professional 4-page magazine spread, mastering text wrapping, master pages, and print-ready bleeds.", tools: ["InDesign", "Print Design", "Typography"] },
        { icon: "MonitorPlay", title: "Digital Marketing Campaign", desc: "Design a cohesive set of social media advertisements and web banners using Figma, optimized for various screen sizes.", tools: ["Figma", "Digital Design", "UI"] }
      ],
      faqData: [
        { q: "Do I need to know how to draw?", a: "No! While drawing skills can be helpful for illustration, graphic design is primarily about composition, layout, typography, and utilizing software tools." },
        { q: "Do I need to buy Adobe Creative Cloud?", a: "Yes, you will need a subscription to Adobe Creative Cloud (at least Photoshop, Illustrator, and InDesign). Adobe offers heavy student discounts." },
        { q: "Mac or PC?", a: "Both are perfectly fine! The Adobe tools operate almost identically on both Windows and macOS." },
        { q: "Will this teach me UI/UX?", a: "We cover the visual design aspects of UI (in Phase 5 with Figma), but this is primarily a Graphic Design course. Deep UX research is a separate discipline." },
        { q: "How do I build my portfolio?", a: "Every assignment in this course is designed to be a portfolio piece. By Week 16, you will have a full Behance portfolio ready to show employers." },
        { q: "Can I freelance after this course?", a: "Absolutely. Graphic Design has one of the largest freelance markets in the world, and we cover freelancing basics in the final week." }
      ]
    }
  },
  {
    componentName: 'DataAnalytics',
    data: {
      heroTitle: "Data Analytics & Business Intelligence",
      heroSubtitle: "Transform raw data into strategic business decisions using SQL, Excel, Python, and Power BI in this 16-week program.",
      toolsSubtitle: "Master the modern Data Analyst stack",
      trackSubtitle: "A dedicated Analytics track tailored to your current experience level.",
      trackButtonLabel: "Start Your Analytics Career →",
      projectLabel: "Analytics Project",
      careerOutcomesDomain: "DataScience",
      trustStats: [
        { value: "16 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "20+ Datasets", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "Business Insights", label: "Core Focus" }
      ],
      toolsList: [
        { name: "Excel", img: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg" },
        { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
        { name: "Power BI", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
        { name: "Tableau", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Junior Data Analysts & Reporting Specialists",
          desc: "Master the fundamentals of data cleaning, SQL querying, and basic dashboarding.",
          benefits: ["Clean and analyze messy datasets using Advanced Excel (VLOOKUPs, Pivot Tables)", "Write complex SQL queries to extract data from relational databases", "Build basic interactive dashboards using Power BI"],
          quote: "I want to transition into a tech career by leveraging my analytical skills.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Business Intelligence (BI) Analysts",
          desc: "Transition into complex data modeling and enterprise dashboard architecture.",
          benefits: ["Develop complex DAX calculations and data models in Power BI", "Automate data ETL pipelines using Python and Pandas", "Perform cohort analysis and A/B testing evaluation"],
          quote: "I need to build automated dashboards that drive executive decision making.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Analytics Managers & Data Strategy Leads",
          desc: "Lead analytics teams and define enterprise data strategy.",
          benefits: ["Define KPIs and metrics frameworks for entire business units", "Manage data governance and self-service BI rollouts", "Lead cross-functional teams to embed data into product strategy"],
          quote: "My focus is on managing data teams, defining KPIs, and driving business strategy.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–3", title: "Advanced Excel & Data Cleaning", focusLabel: "CURRICULUM",
          focus: ["Data Cleaning techniques and Conditional Formatting", "Advanced Functions (XLOOKUP, INDEX/MATCH, IFs)", "Data Summarization with Pivot Tables and Pivot Charts", "Introduction to Power Query in Excel"],
          application: "Cleaning and Analyzing a Messy Sales Dataset in Excel"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 4–6", title: "SQL for Data Analysis", focusLabel: "CURRICULUM",
          focus: ["Relational Database Fundamentals (Keys, Normalization)", "CRUD Operations and Aggregation Functions (GROUP BY)", "Complex Joins, Subqueries, and CTEs (Common Table Expressions)", "Window Functions (RANK, LEAD, LAG) for advanced analysis"],
          application: "Querying a complex Retail Database to find Churn Metrics"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 7–9", title: "Business Intelligence (Power BI)", focusLabel: "CURRICULUM",
          focus: ["Connecting to Data Sources and Power Query Editor", "Data Modeling (Star Schemas, Relationships)", "Introduction to DAX (Data Analysis Expressions)", "Designing Interactive Visualizations and Dashboards"],
          application: "Building an Interactive HR Attrition Dashboard"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 10–12", title: "Data Visualization (Tableau)", focusLabel: "CURRICULUM",
          focus: ["Tableau Interface and connecting to data", "Creating Worksheets, calculated fields, and parameters", "Building complex Dashboards and Stories", "Best practices in Data Storytelling and UI design"],
          application: "Developing a Global Supply Chain Tableau Story"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 13–15", title: "Python for Data Analysis", focusLabel: "CURRICULUM",
          focus: ["Python Basics for Analysts (Lists, Dictionaries, Loops)", "Data Wrangling with Pandas (DataFrames, Grouping, Merging)", "Exploratory Data Analysis (EDA) techniques", "Basic Data Visualization with Matplotlib and Seaborn"],
          application: "Automated Data Cleaning Script using Pandas"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 16", title: "Portfolio Polish & Placement", focusLabel: "CURRICULUM",
          focus: ["Compiling a professional GitHub/Kaggle portfolio", "Presentation skills: Communicating insights to stakeholders", "SQL whiteboard interview prep", "Resume review and job placement assistance"],
          application: "Final Analytics Portfolio Presentation"
        }
      ],
      capstoneProjects: [
        { icon: "Target", title: "Financial Performance Tracker", desc: "Use Advanced Excel and Pivot Tables to build a dynamic financial tracker evaluating revenue, expenses, and profit margins over 5 years.", tools: ["Excel", "Pivot Tables", "Power Query"] },
        { icon: "Layers", title: "E-Commerce Customer Churn", desc: "Write complex SQL CTEs and Window Functions to analyze a massive e-commerce database, identifying factors leading to customer churn.", tools: ["SQL", "PostgreSQL", "CTEs"] },
        { icon: "MonitorPlay", title: "Executive Sales Dashboard", desc: "Build a fully interactive Power BI dashboard utilizing complex DAX measures and Star Schema modeling for executive reporting.", tools: ["Power BI", "DAX", "Data Modeling"] },
        { icon: "Workflow", title: "Python Automated EDA", desc: "Write a Python script using Pandas to automatically clean, aggregate, and visualize missing values and correlations in a massive CSV.", tools: ["Python", "Pandas", "Matplotlib"] }
      ],
      faqData: [
        { q: "What is the difference between Data Analytics and Data Science?", a: "Data Analytics focuses on analyzing historical data to make business decisions (SQL, BI tools). Data Science involves building predictive machine learning models." },
        { q: "Do I need a strong math background?", a: "No. Basic arithmetic and logic are sufficient. Data Analytics is more about business intuition and asking the right questions of the data." },
        { q: "Do I need to know how to code?", a: "We teach SQL and Python from scratch. SQL is essentially required for analysts, while Python is a massive bonus that we will teach you." },
        { q: "Are we learning Power BI or Tableau?", a: "You will learn both! Both are industry leaders, and knowing both makes your resume incredibly competitive." },
        { q: "Can I take this if I have a non-technical degree?", a: "Absolutely. Data Analytics is one of the best transition careers for people from Finance, Marketing, Operations, and Healthcare." },
        { q: "Will I build a portfolio?", a: "Yes. By the end, you will have a public portfolio of SQL queries, Python scripts, and interactive Dashboards to show employers." }
      ]
    }
  }
];

courses.forEach(course => {
  const componentPath = path.join(pagesDir, `${course.componentName}.jsx`);
  if (!fs.existsSync(componentPath)) {
    console.log(`Skipping ${course.componentName} - file not found`);
    return;
  }
  
  let content = fs.readFileSync(componentPath, 'utf8');
  const regex = /const courseData = \{[\s\S]*?(?=courseData\.heroImages =)/;
  const newDataString = `const courseData = ${JSON.stringify(course.data, null, 2)};\n\n  `;
  
  content = content.replace(regex, newDataString);
  fs.writeFileSync(componentPath, content, 'utf8');
  console.log(`Enriched ${course.componentName}.jsx`);
});

console.log('Batch 3 enrichment complete!');
