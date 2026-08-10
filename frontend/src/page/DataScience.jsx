import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const DataScience = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "Advanced Data Science & GenAI",
  "heroSubtitle": "Master end-to-end Data Pipelines, Deep Learning, and Generative AI applications in this rigorous 24-week enterprise program.",
  "toolsSubtitle": "Master the modern Data Science & AI stack",
  "trackSubtitle": "A dedicated Data track tailored to your current experience level.",
  "trackButtonLabel": "Start Your Data Career →",
  "projectLabel": "Enterprise Data Project",
  "careerOutcomesDomain": "DataScience",
  "trustStats": [
    {
      "value": "24 Weeks",
      "label": "Duration"
    },
    {
      "value": "100% Online",
      "label": "Format"
    },
    {
      "value": "15+ Projects",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "GenAI",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "Python",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    },
    {
      "name": "SQL",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
    },
    {
      "name": "TensorFlow",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
    },
    {
      "name": "PyTorch",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
    },
    {
      "name": "Pandas",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg"
    },
    {
      "name": "AWS",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      "invert": true
    },
    {
      "name": "Docker",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
    },
    {
      "name": "PowerBI",
      "img": "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Junior Data Analysts & Data Scientists",
      "desc": "Build the foundational Python, SQL, and Data Visualization skills required to break into the tech industry.",
      "benefits": [
        "Master descriptive and predictive analytics workflows",
        "Understand relational database architecture and modern ETL processes",
        "Build hands-on BI dashboards and master data storytelling"
      ],
      "quote": "I want to move beyond spreadsheets and start writing scalable Python and SQL pipelines.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Mid-Level AI Engineers & ML Developers",
      "desc": "Transition from basic analysis to advanced Machine Learning engineering, capable of deploying scalable GenAI applications.",
      "benefits": [
        "Architect ML models using advanced supervised/unsupervised learning techniques",
        "Master Deep Learning frameworks (TensorFlow, PyTorch) for NLP and Computer Vision",
        "Build Generative AI applications powered by LLMs, LangChain, and Vector Databases"
      ],
      "quote": "I need to upgrade my skills from traditional ML to modern, industry-standard Deep Learning and GenAI.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Data Architects & AI Technical Leads",
      "desc": "Lead AI transformation—design enterprise-scale ML architectures and manage high-performing data engineering teams.",
      "benefits": [
        "Design Enterprise AI Strategy and MLOps Pipeline Governance",
        "Deploy high-performance, low-latency models in AWS/GCP cloud environments",
        "Lead data engineering teams and maximize ROI on AI investments"
      ],
      "quote": "My focus is on architecture, scalability, and ROI. I need to design pipelines that drive AI innovation at scale.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Data Foundations & Engineering",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Python for Data Science (NumPy, Pandas, SciPy)",
        "Advanced SQL (CTEs, Window Functions, Query Optimization)",
        "Data Cleaning, Wrangling, and EDA",
        "Version Control with Git & GitHub for Data Teams"
      ],
      "application": "Comprehensive Sales Data Warehouse & EDA Report"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "Statistical Analysis & BI",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Probability distributions, Hypothesis Testing, A/B Testing",
        "Data Visualization using Matplotlib, Seaborn, & Plotly",
        "Enterprise Dashboarding with Power BI & Tableau",
        "Data Storytelling & Executive Presentations"
      ],
      "application": "Interactive Executive Dashboard for Retail Analytics"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "Machine Learning Core",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Supervised Learning: Regression, Classification, SVMs",
        "Unsupervised Learning: K-Means, PCA, Dimensionality Reduction",
        "Ensemble Methods: Random Forest, Gradient Boosting (XGBoost)",
        "Model Evaluation, Cross-Validation, & Hyperparameter Tuning"
      ],
      "application": "Customer Churn Prediction Engine with 90%+ Accuracy"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–16",
      "title": "Deep Learning & Neural Networks",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Artificial Neural Networks (ANNs) and Backpropagation",
        "TensorFlow & Keras Fundamentals",
        "Computer Vision with CNNs (Convolutional Neural Networks)",
        "Natural Language Processing (NLP) with RNNs & LSTMs"
      ],
      "application": "Real-time Object Detection & Sentiment Analysis API"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 17–20",
      "title": "Generative AI & LLMs",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Transformer Architectures (BERT, GPT)",
        "Fine-Tuning Open Source LLMs (Llama 3, Mistral)",
        "Building RAG (Retrieval-Augmented Generation) Pipelines",
        "Vector Databases (Pinecone, ChromaDB) & LangChain"
      ],
      "application": "Enterprise AI Document Assistant (Chat-with-your-PDF)"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 21–24",
      "title": "MLOps, Deployment & Placement",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Model Deployment via Flask/FastAPI & Docker",
        "Cloud ML Platforms (AWS SageMaker, Azure ML)",
        "Continuous Integration / Continuous Deployment (CI/CD) for ML",
        "Mock Interviews, Resume Polish, & Core Company Placement"
      ],
      "application": "End-to-End Cloud-Deployed ML Portfolio Project"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "BrainCircuit",
      "title": "GenAI Document Assistant",
      "desc": "Build a production-ready RAG application using LangChain, OpenAI APIs, and Pinecone to securely query enterprise documents.",
      "tools": [
        "LangChain",
        "Pinecone",
        "Python"
      ]
    },
    {
      "icon": "TrendingUp",
      "title": "Algorithmic Trading Bot",
      "desc": "Develop an LSTM-based deep learning model to forecast stock prices using historical market data and technical indicators.",
      "tools": [
        "PyTorch",
        "Pandas",
        "FastAPI"
      ]
    },
    {
      "icon": "MonitorPlay",
      "title": "Automated Diagnosis Vision System",
      "desc": "Train a Convolutional Neural Network (CNN) to detect anomalies in medical X-Rays with high precision.",
      "tools": [
        "TensorFlow",
        "Keras",
        "Docker"
      ]
    },
    {
      "icon": "BarChart3",
      "title": "Global Supply Chain Dashboard",
      "desc": "Engineer an automated ETL pipeline that feeds into an interactive PowerBI dashboard for executive decision making.",
      "tools": [
        "SQL",
        "PowerBI",
        "AWS"
      ]
    }
  ],
  "faqData": [
    {
      "q": "What are the prerequisites for this program?",
      "a": "A basic understanding of programming logic and high-school level mathematics. We teach Python and SQL from scratch in Phase 1."
    },
    {
      "q": "What is the weekly time commitment?",
      "a": "Expect to spend 10-15 hours per week on live classes, assignments, and project work."
    },
    {
      "q": "Is this program suitable for non-IT professionals?",
      "a": "Yes! Many of our successful alumni transitioned from Mechanical Engineering, Finance, and Marketing into Data Science."
    },
    {
      "q": "How does the placement support work?",
      "a": "We provide 1-on-1 resume reviews, mock technical interviews, portfolio building sessions, and direct referrals to our hiring partners."
    },
    {
      "q": "Will I learn Generative AI?",
      "a": "Absolutely. Phase 5 is entirely dedicated to modern GenAI, LLMs, RAG pipelines, and LangChain."
    },
    {
      "q": "Do I have lifetime access to the materials?",
      "a": "Yes, you get lifetime access to all recorded sessions, code repositories, and future curriculum updates."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  return <PremiumCourseLayout data={courseData} />;
};

export default DataScience;
