import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const DataAnalytics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "Data Analytics & Business Intelligence",
  "heroSubtitle": "Transform raw data into strategic business decisions using SQL, Excel, Python, and Power BI in this 16-week program.",
  "toolsSubtitle": "Master the modern Data Analyst stack",
  "trackSubtitle": "A dedicated Analytics track tailored to your current experience level.",
  "trackButtonLabel": "Start Your Analytics Career →",
  "projectLabel": "Analytics Project",
  "careerOutcomesDomain": "DataScience",
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
      "value": "20+ Datasets",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "Business Insights",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "Excel",
      "img": "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg"
    },
    {
      "name": "SQL",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
    },
    {
      "name": "Power BI",
      "img": "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg"
    },
    {
      "name": "Tableau",
      "img": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png"
    },
    {
      "name": "Python",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    },
    {
      "name": "Pandas",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Junior Data Analysts & Reporting Specialists",
      "desc": "Master the fundamentals of data cleaning, SQL querying, and basic dashboarding.",
      "benefits": [
        "Clean and analyze messy datasets using Advanced Excel (VLOOKUPs, Pivot Tables)",
        "Write complex SQL queries to extract data from relational databases",
        "Build basic interactive dashboards using Power BI"
      ],
      "quote": "I want to transition into a tech career by leveraging my analytical skills.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Business Intelligence (BI) Analysts",
      "desc": "Transition into complex data modeling and enterprise dashboard architecture.",
      "benefits": [
        "Develop complex DAX calculations and data models in Power BI",
        "Automate data ETL pipelines using Python and Pandas",
        "Perform cohort analysis and A/B testing evaluation"
      ],
      "quote": "I need to build automated dashboards that drive executive decision making.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Analytics Managers & Data Strategy Leads",
      "desc": "Lead analytics teams and define enterprise data strategy.",
      "benefits": [
        "Define KPIs and metrics frameworks for entire business units",
        "Manage data governance and self-service BI rollouts",
        "Lead cross-functional teams to embed data into product strategy"
      ],
      "quote": "My focus is on managing data teams, defining KPIs, and driving business strategy.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–3",
      "title": "Advanced Excel & Data Cleaning",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Data Cleaning techniques and Conditional Formatting",
        "Advanced Functions (XLOOKUP, INDEX/MATCH, IFs)",
        "Data Summarization with Pivot Tables and Pivot Charts",
        "Introduction to Power Query in Excel"
      ],
      "application": "Cleaning and Analyzing a Messy Sales Dataset in Excel"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 4–6",
      "title": "SQL for Data Analysis",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Relational Database Fundamentals (Keys, Normalization)",
        "CRUD Operations and Aggregation Functions (GROUP BY)",
        "Complex Joins, Subqueries, and CTEs (Common Table Expressions)",
        "Window Functions (RANK, LEAD, LAG) for advanced analysis"
      ],
      "application": "Querying a complex Retail Database to find Churn Metrics"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 7–9",
      "title": "Business Intelligence (Power BI)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Connecting to Data Sources and Power Query Editor",
        "Data Modeling (Star Schemas, Relationships)",
        "Introduction to DAX (Data Analysis Expressions)",
        "Designing Interactive Visualizations and Dashboards"
      ],
      "application": "Building an Interactive HR Attrition Dashboard"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 10–12",
      "title": "Data Visualization (Tableau)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Tableau Interface and connecting to data",
        "Creating Worksheets, calculated fields, and parameters",
        "Building complex Dashboards and Stories",
        "Best practices in Data Storytelling and UI design"
      ],
      "application": "Developing a Global Supply Chain Tableau Story"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 13–15",
      "title": "Python for Data Analysis",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Python Basics for Analysts (Lists, Dictionaries, Loops)",
        "Data Wrangling with Pandas (DataFrames, Grouping, Merging)",
        "Exploratory Data Analysis (EDA) techniques",
        "Basic Data Visualization with Matplotlib and Seaborn"
      ],
      "application": "Automated Data Cleaning Script using Pandas"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 16",
      "title": "Portfolio Polish & Placement",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Compiling a professional GitHub/Kaggle portfolio",
        "Presentation skills: Communicating insights to stakeholders",
        "SQL whiteboard interview prep",
        "Resume review and job placement assistance"
      ],
      "application": "Final Analytics Portfolio Presentation"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "Target",
      "title": "Financial Performance Tracker",
      "desc": "Use Advanced Excel and Pivot Tables to build a dynamic financial tracker evaluating revenue, expenses, and profit margins over 5 years.",
      "tools": [
        "Excel",
        "Pivot Tables",
        "Power Query"
      ]
    },
    {
      "icon": "Layers",
      "title": "E-Commerce Customer Churn",
      "desc": "Write complex SQL CTEs and Window Functions to analyze a massive e-commerce database, identifying factors leading to customer churn.",
      "tools": [
        "SQL",
        "PostgreSQL",
        "CTEs"
      ]
    },
    {
      "icon": "MonitorPlay",
      "title": "Executive Sales Dashboard",
      "desc": "Build a fully interactive Power BI dashboard utilizing complex DAX measures and Star Schema modeling for executive reporting.",
      "tools": [
        "Power BI",
        "DAX",
        "Data Modeling"
      ]
    },
    {
      "icon": "Workflow",
      "title": "Python Automated EDA",
      "desc": "Write a Python script using Pandas to automatically clean, aggregate, and visualize missing values and correlations in a massive CSV.",
      "tools": [
        "Python",
        "Pandas",
        "Matplotlib"
      ]
    }
  ],
  "faqData": [
    {
      "q": "What is the difference between Data Analytics and Data Science?",
      "a": "Data Analytics focuses on analyzing historical data to make business decisions (SQL, BI tools). Data Science involves building predictive machine learning models."
    },
    {
      "q": "Do I need a strong math background?",
      "a": "No. Basic arithmetic and logic are sufficient. Data Analytics is more about business intuition and asking the right questions of the data."
    },
    {
      "q": "Do I need to know how to code?",
      "a": "We teach SQL and Python from scratch. SQL is essentially required for analysts, while Python is a massive bonus that we will teach you."
    },
    {
      "q": "Are we learning Power BI or Tableau?",
      "a": "You will learn both! Both are industry leaders, and knowing both makes your resume incredibly competitive."
    },
    {
      "q": "Can I take this if I have a non-technical degree?",
      "a": "Absolutely. Data Analytics is one of the best transition careers for people from Finance, Marketing, Operations, and Healthcare."
    },
    {
      "q": "Will I build a portfolio?",
      "a": "Yes. By the end, you will have a public portfolio of SQL queries, Python scripts, and interactive Dashboards to show employers."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default DataAnalytics;
