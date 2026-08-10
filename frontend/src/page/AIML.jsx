import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const AIML = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "Artificial Intelligence & Machine Learning",
  "heroSubtitle": "Engineer intelligent systems, deep neural networks, and scalable AI solutions in this intensive 24-week program.",
  "toolsSubtitle": "Master the modern AI & Deep Learning stack",
  "trackSubtitle": "A dedicated AI track tailored to your current experience level.",
  "trackButtonLabel": "Start Your AI Career →",
  "projectLabel": "AI Engineering Project",
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
      "value": "12+ Projects",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "Deep Learning",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "Python",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
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
      "name": "Scikit-Learn",
      "img": "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg"
    },
    {
      "name": "HuggingFace",
      "img": "https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
    },
    {
      "name": "OpenCV",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg"
    },
    {
      "name": "Docker",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
    },
    {
      "name": "AWS",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      "invert": true
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Junior ML Engineers & AI Researchers",
      "desc": "Master the mathematics and code behind fundamental machine learning algorithms.",
      "benefits": [
        "Implement supervised and unsupervised learning algorithms from scratch",
        "Master data preprocessing, feature engineering, and model validation",
        "Build practical predictive models for real-world business datasets"
      ],
      "quote": "I want to understand the math behind AI and start building my own models.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Deep Learning Engineers & NLP Specialists",
      "desc": "Transition into complex unstructured data problems using deep neural networks.",
      "benefits": [
        "Architect complex CNNs for image recognition and LSTMs for time-series",
        "Utilize HuggingFace transformers for advanced Natural Language Processing",
        "Optimize model inference speed and memory footprint"
      ],
      "quote": "I need to upgrade my skills from Scikit-Learn to advanced PyTorch and Transformer architectures.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "AI Architects & Principal Engineers",
      "desc": "Design scalable MLOps architectures and lead enterprise AI transformation.",
      "benefits": [
        "Design end-to-end MLOps pipelines using Docker, Kubernetes, and AWS SageMaker",
        "Establish AI governance, monitoring, and model retraining strategies",
        "Lead cross-functional teams to integrate AI into legacy applications"
      ],
      "quote": "My focus is on productionizing AI securely and efficiently at enterprise scale.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Python & Applied Math for AI",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Advanced Python (OOP, Decorators, Generators)",
        "Linear Algebra (Vectors, Matrices, Eigenvalues)",
        "Calculus (Derivatives, Gradients, Chain Rule)",
        "Probability & Statistics for Machine Learning"
      ],
      "application": "Building a Custom Gradient Descent Optimizer"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "Classical Machine Learning",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Linear & Logistic Regression, SVMs, Decision Trees",
        "Ensemble Methods (Random Forest, XGBoost, LightGBM)",
        "Clustering (K-Means, DBSCAN) & Dimensionality Reduction (PCA)",
        "Hyperparameter Tuning (GridSearch, Optuna)"
      ],
      "application": "Kaggle Competitions & Predictive Modeling"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "Deep Learning Foundations",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Artificial Neural Networks (ANNs) Architecture",
        "Forward and Backward Propagation Mechanics",
        "Activation Functions, Optimizers (Adam, RMSprop), and Loss Functions",
        "Introduction to PyTorch & TensorFlow APIs"
      ],
      "application": "Custom Multi-Layer Perceptron (MLP) Classifier"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–16",
      "title": "Computer Vision & OpenCV",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Image Processing techniques using OpenCV",
        "Convolutional Neural Networks (CNNs) & Pooling Layers",
        "Transfer Learning (ResNet, VGG, YOLOv8)",
        "Image Segmentation and Object Detection Pipelines"
      ],
      "application": "Real-Time Facial Recognition & Emotion Detection"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 17–20",
      "title": "Natural Language Processing (NLP)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Text Preprocessing (Tokenization, Stemming, Lemmatization)",
        "Word Embeddings (Word2Vec, GloVe, TF-IDF)",
        "Sequence Models (RNNs, GRUs, LSTMs)",
        "Introduction to Transformers and the HuggingFace Ecosystem"
      ],
      "application": "Multilingual Sentiment Analysis & Text Summarization"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 21–24",
      "title": "MLOps & AI Production",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Containerizing ML Models with Docker",
        "Creating Inference APIs using FastAPI",
        "Deploying Models to AWS EC2 and SageMaker",
        "Model Monitoring, Drift Detection, and CI/CD for AI"
      ],
      "application": "Deploying a Scalable AI Microservice"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "BrainCircuit",
      "title": "Autonomous Driving Perception System",
      "desc": "Train a YOLOv8 object detection model to identify pedestrians, vehicles, and traffic signs in real-time video feeds.",
      "tools": [
        "PyTorch",
        "YOLOv8",
        "OpenCV"
      ]
    },
    {
      "icon": "MessageSquare",
      "title": "Customer Support Chatbot",
      "desc": "Build an intelligent NLP chatbot using HuggingFace transformers that can route and answer customer queries automatically.",
      "tools": [
        "HuggingFace",
        "FastAPI",
        "Transformers"
      ]
    },
    {
      "icon": "Target",
      "title": "Fraud Detection Engine",
      "desc": "Develop an XGBoost ensemble model to detect anomalous transaction patterns and deploy it as a high-throughput REST API.",
      "tools": [
        "XGBoost",
        "Scikit",
        "Docker"
      ]
    },
    {
      "icon": "Layers",
      "title": "End-to-End MLOps Pipeline",
      "desc": "Implement a complete automated pipeline that retrains a model when data drift is detected and deploys via GitHub Actions.",
      "tools": [
        "AWS",
        "Docker",
        "Git"
      ]
    }
  ],
  "faqData": [
    {
      "q": "Is this program different from Data Science?",
      "a": "Yes. While Data Science focuses heavily on SQL, BI, and business insights, this program is purely focused on advanced algorithmic engineering, Deep Learning, and AI infrastructure."
    },
    {
      "q": "Do I need a strong math background?",
      "a": "We cover the necessary Linear Algebra and Calculus in Phase 1, but a strong analytical mindset and comfort with logic is highly recommended."
    },
    {
      "q": "Will we learn PyTorch or TensorFlow?",
      "a": "We teach both! You will learn the core concepts in TensorFlow, and build advanced Deep Learning models using PyTorch, which is the current industry standard for AI research."
    },
    {
      "q": "What kind of hardware do I need?",
      "a": "A standard modern laptop is fine. We will utilize cloud-based GPU environments like Google Colab and AWS for heavy model training."
    },
    {
      "q": "How are the capstone projects evaluated?",
      "a": "Projects are reviewed by industry mentors based on code quality, model accuracy, and deployment architecture."
    },
    {
      "q": "Is placement assistance provided?",
      "a": "Yes, we provide extensive portfolio reviews, technical mock interviews, and placement support tailored for AI Engineering roles."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default AIML;
