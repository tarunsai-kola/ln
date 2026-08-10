const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'page');

const courses = [
  {
    componentName: 'DataScience',
    data: {
      heroTitle: "Advanced Data Science & GenAI",
      heroSubtitle: "Master end-to-end Data Pipelines, Deep Learning, and Generative AI applications in this rigorous 24-week enterprise program.",
      toolsSubtitle: "Master the modern Data Science & AI stack",
      trackSubtitle: "A dedicated Data track tailored to your current experience level.",
      trackButtonLabel: "Start Your Data Career →",
      projectLabel: "Enterprise Data Project",
      careerOutcomesDomain: "DataScience",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "15+ Projects", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "GenAI", label: "Core Focus" }
      ],
      toolsList: [
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
        { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
        { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
        { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "PowerBI", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Junior Data Analysts & Data Scientists",
          desc: "Build the foundational Python, SQL, and Data Visualization skills required to break into the tech industry.",
          benefits: ["Master descriptive and predictive analytics workflows", "Understand relational database architecture and modern ETL processes", "Build hands-on BI dashboards and master data storytelling"],
          quote: "I want to move beyond spreadsheets and start writing scalable Python and SQL pipelines.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Mid-Level AI Engineers & ML Developers",
          desc: "Transition from basic analysis to advanced Machine Learning engineering, capable of deploying scalable GenAI applications.",
          benefits: ["Architect ML models using advanced supervised/unsupervised learning techniques", "Master Deep Learning frameworks (TensorFlow, PyTorch) for NLP and Computer Vision", "Build Generative AI applications powered by LLMs, LangChain, and Vector Databases"],
          quote: "I need to upgrade my skills from traditional ML to modern, industry-standard Deep Learning and GenAI.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Data Architects & AI Technical Leads",
          desc: "Lead AI transformation—design enterprise-scale ML architectures and manage high-performing data engineering teams.",
          benefits: ["Design Enterprise AI Strategy and MLOps Pipeline Governance", "Deploy high-performance, low-latency models in AWS/GCP cloud environments", "Lead data engineering teams and maximize ROI on AI investments"],
          quote: "My focus is on architecture, scalability, and ROI. I need to design pipelines that drive AI innovation at scale.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Data Foundations & Engineering", focusLabel: "CURRICULUM",
          focus: ["Python for Data Science (NumPy, Pandas, SciPy)", "Advanced SQL (CTEs, Window Functions, Query Optimization)", "Data Cleaning, Wrangling, and EDA", "Version Control with Git & GitHub for Data Teams"],
          application: "Comprehensive Sales Data Warehouse & EDA Report"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Statistical Analysis & BI", focusLabel: "CURRICULUM",
          focus: ["Probability distributions, Hypothesis Testing, A/B Testing", "Data Visualization using Matplotlib, Seaborn, & Plotly", "Enterprise Dashboarding with Power BI & Tableau", "Data Storytelling & Executive Presentations"],
          application: "Interactive Executive Dashboard for Retail Analytics"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Machine Learning Core", focusLabel: "CURRICULUM",
          focus: ["Supervised Learning: Regression, Classification, SVMs", "Unsupervised Learning: K-Means, PCA, Dimensionality Reduction", "Ensemble Methods: Random Forest, Gradient Boosting (XGBoost)", "Model Evaluation, Cross-Validation, & Hyperparameter Tuning"],
          application: "Customer Churn Prediction Engine with 90%+ Accuracy"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Deep Learning & Neural Networks", focusLabel: "CURRICULUM",
          focus: ["Artificial Neural Networks (ANNs) and Backpropagation", "TensorFlow & Keras Fundamentals", "Computer Vision with CNNs (Convolutional Neural Networks)", "Natural Language Processing (NLP) with RNNs & LSTMs"],
          application: "Real-time Object Detection & Sentiment Analysis API"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 17–20", title: "Generative AI & LLMs", focusLabel: "CURRICULUM",
          focus: ["Transformer Architectures (BERT, GPT)", "Fine-Tuning Open Source LLMs (Llama 3, Mistral)", "Building RAG (Retrieval-Augmented Generation) Pipelines", "Vector Databases (Pinecone, ChromaDB) & LangChain"],
          application: "Enterprise AI Document Assistant (Chat-with-your-PDF)"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 21–24", title: "MLOps, Deployment & Placement", focusLabel: "CURRICULUM",
          focus: ["Model Deployment via Flask/FastAPI & Docker", "Cloud ML Platforms (AWS SageMaker, Azure ML)", "Continuous Integration / Continuous Deployment (CI/CD) for ML", "Mock Interviews, Resume Polish, & Core Company Placement"],
          application: "End-to-End Cloud-Deployed ML Portfolio Project"
        }
      ],
      capstoneProjects: [
        { icon: "BrainCircuit", title: "GenAI Document Assistant", desc: "Build a production-ready RAG application using LangChain, OpenAI APIs, and Pinecone to securely query enterprise documents.", tools: ["LangChain", "Pinecone", "Python"] },
        { icon: "TrendingUp", title: "Algorithmic Trading Bot", desc: "Develop an LSTM-based deep learning model to forecast stock prices using historical market data and technical indicators.", tools: ["PyTorch", "Pandas", "FastAPI"] },
        { icon: "MonitorPlay", title: "Automated Diagnosis Vision System", desc: "Train a Convolutional Neural Network (CNN) to detect anomalies in medical X-Rays with high precision.", tools: ["TensorFlow", "Keras", "Docker"] },
        { icon: "BarChart3", title: "Global Supply Chain Dashboard", desc: "Engineer an automated ETL pipeline that feeds into an interactive PowerBI dashboard for executive decision making.", tools: ["SQL", "PowerBI", "AWS"] }
      ],
      faqData: [
        { q: "What are the prerequisites for this program?", a: "A basic understanding of programming logic and high-school level mathematics. We teach Python and SQL from scratch in Phase 1." },
        { q: "What is the weekly time commitment?", a: "Expect to spend 10-15 hours per week on live classes, assignments, and project work." },
        { q: "Is this program suitable for non-IT professionals?", a: "Yes! Many of our successful alumni transitioned from Mechanical Engineering, Finance, and Marketing into Data Science." },
        { q: "How does the placement support work?", a: "We provide 1-on-1 resume reviews, mock technical interviews, portfolio building sessions, and direct referrals to our hiring partners." },
        { q: "Will I learn Generative AI?", a: "Absolutely. Phase 5 is entirely dedicated to modern GenAI, LLMs, RAG pipelines, and LangChain." },
        { q: "Do I have lifetime access to the materials?", a: "Yes, you get lifetime access to all recorded sessions, code repositories, and future curriculum updates." }
      ]
    }
  },
  {
    componentName: 'AIML',
    data: {
      heroTitle: "Artificial Intelligence & Machine Learning",
      heroSubtitle: "Engineer intelligent systems, deep neural networks, and scalable AI solutions in this intensive 24-week program.",
      toolsSubtitle: "Master the modern AI & Deep Learning stack",
      trackSubtitle: "A dedicated AI track tailored to your current experience level.",
      trackButtonLabel: "Start Your AI Career →",
      projectLabel: "AI Engineering Project",
      careerOutcomesDomain: "DataScience",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "12+ Projects", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "Deep Learning", label: "Core Focus" }
      ],
      toolsList: [
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
        { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
        { name: "Scikit-Learn", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
        { name: "HuggingFace", img: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
        { name: "OpenCV", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Junior ML Engineers & AI Researchers",
          desc: "Master the mathematics and code behind fundamental machine learning algorithms.",
          benefits: ["Implement supervised and unsupervised learning algorithms from scratch", "Master data preprocessing, feature engineering, and model validation", "Build practical predictive models for real-world business datasets"],
          quote: "I want to understand the math behind AI and start building my own models.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Deep Learning Engineers & NLP Specialists",
          desc: "Transition into complex unstructured data problems using deep neural networks.",
          benefits: ["Architect complex CNNs for image recognition and LSTMs for time-series", "Utilize HuggingFace transformers for advanced Natural Language Processing", "Optimize model inference speed and memory footprint"],
          quote: "I need to upgrade my skills from Scikit-Learn to advanced PyTorch and Transformer architectures.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "AI Architects & Principal Engineers",
          desc: "Design scalable MLOps architectures and lead enterprise AI transformation.",
          benefits: ["Design end-to-end MLOps pipelines using Docker, Kubernetes, and AWS SageMaker", "Establish AI governance, monitoring, and model retraining strategies", "Lead cross-functional teams to integrate AI into legacy applications"],
          quote: "My focus is on productionizing AI securely and efficiently at enterprise scale.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Python & Applied Math for AI", focusLabel: "CURRICULUM",
          focus: ["Advanced Python (OOP, Decorators, Generators)", "Linear Algebra (Vectors, Matrices, Eigenvalues)", "Calculus (Derivatives, Gradients, Chain Rule)", "Probability & Statistics for Machine Learning"],
          application: "Building a Custom Gradient Descent Optimizer"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Classical Machine Learning", focusLabel: "CURRICULUM",
          focus: ["Linear & Logistic Regression, SVMs, Decision Trees", "Ensemble Methods (Random Forest, XGBoost, LightGBM)", "Clustering (K-Means, DBSCAN) & Dimensionality Reduction (PCA)", "Hyperparameter Tuning (GridSearch, Optuna)"],
          application: "Kaggle Competitions & Predictive Modeling"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Deep Learning Foundations", focusLabel: "CURRICULUM",
          focus: ["Artificial Neural Networks (ANNs) Architecture", "Forward and Backward Propagation Mechanics", "Activation Functions, Optimizers (Adam, RMSprop), and Loss Functions", "Introduction to PyTorch & TensorFlow APIs"],
          application: "Custom Multi-Layer Perceptron (MLP) Classifier"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Computer Vision & OpenCV", focusLabel: "CURRICULUM",
          focus: ["Image Processing techniques using OpenCV", "Convolutional Neural Networks (CNNs) & Pooling Layers", "Transfer Learning (ResNet, VGG, YOLOv8)", "Image Segmentation and Object Detection Pipelines"],
          application: "Real-Time Facial Recognition & Emotion Detection"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 17–20", title: "Natural Language Processing (NLP)", focusLabel: "CURRICULUM",
          focus: ["Text Preprocessing (Tokenization, Stemming, Lemmatization)", "Word Embeddings (Word2Vec, GloVe, TF-IDF)", "Sequence Models (RNNs, GRUs, LSTMs)", "Introduction to Transformers and the HuggingFace Ecosystem"],
          application: "Multilingual Sentiment Analysis & Text Summarization"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 21–24", title: "MLOps & AI Production", focusLabel: "CURRICULUM",
          focus: ["Containerizing ML Models with Docker", "Creating Inference APIs using FastAPI", "Deploying Models to AWS EC2 and SageMaker", "Model Monitoring, Drift Detection, and CI/CD for AI"],
          application: "Deploying a Scalable AI Microservice"
        }
      ],
      capstoneProjects: [
        { icon: "BrainCircuit", title: "Autonomous Driving Perception System", desc: "Train a YOLOv8 object detection model to identify pedestrians, vehicles, and traffic signs in real-time video feeds.", tools: ["PyTorch", "YOLOv8", "OpenCV"] },
        { icon: "MessageSquare", title: "Customer Support Chatbot", desc: "Build an intelligent NLP chatbot using HuggingFace transformers that can route and answer customer queries automatically.", tools: ["HuggingFace", "FastAPI", "Transformers"] },
        { icon: "Target", title: "Fraud Detection Engine", desc: "Develop an XGBoost ensemble model to detect anomalous transaction patterns and deploy it as a high-throughput REST API.", tools: ["XGBoost", "Scikit", "Docker"] },
        { icon: "Layers", title: "End-to-End MLOps Pipeline", desc: "Implement a complete automated pipeline that retrains a model when data drift is detected and deploys via GitHub Actions.", tools: ["AWS", "Docker", "Git"] }
      ],
      faqData: [
        { q: "Is this program different from Data Science?", a: "Yes. While Data Science focuses heavily on SQL, BI, and business insights, this program is purely focused on advanced algorithmic engineering, Deep Learning, and AI infrastructure." },
        { q: "Do I need a strong math background?", a: "We cover the necessary Linear Algebra and Calculus in Phase 1, but a strong analytical mindset and comfort with logic is highly recommended." },
        { q: "Will we learn PyTorch or TensorFlow?", a: "We teach both! You will learn the core concepts in TensorFlow, and build advanced Deep Learning models using PyTorch, which is the current industry standard for AI research." },
        { q: "What kind of hardware do I need?", a: "A standard modern laptop is fine. We will utilize cloud-based GPU environments like Google Colab and AWS for heavy model training." },
        { q: "How are the capstone projects evaluated?", a: "Projects are reviewed by industry mentors based on code quality, model accuracy, and deployment architecture." },
        { q: "Is placement assistance provided?", a: "Yes, we provide extensive portfolio reviews, technical mock interviews, and placement support tailored for AI Engineering roles." }
      ]
    }
  },
  {
    componentName: 'CyberSecurity',
    data: {
      heroTitle: "Cyber Security & Ethical Hacking",
      heroSubtitle: "Defend enterprise networks, master penetration testing, and secure cloud infrastructures in this intensive 24-week program.",
      toolsSubtitle: "Master the modern InfoSec & Hacker stack",
      trackSubtitle: "A dedicated Cyber Security track tailored to your current experience level.",
      trackButtonLabel: "Start Your Security Career →",
      projectLabel: "Security Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "24 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "10+ CTFs", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "Ethical Hacking", label: "Core Focus" }
      ],
      toolsList: [
        { name: "Kali Linux", img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg" },
        { name: "Metasploit", img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Metasploit_logo.svg" },
        { name: "Wireshark", img: "https://upload.wikimedia.org/wikipedia/commons/0/00/Wireshark_Icon.png" },
        { name: "Burp Suite", img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Burp_Suite_Logo.png" },
        { name: "Nmap", img: "https://upload.wikimedia.org/wikipedia/commons/3/37/Nmap_Logo.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "AWS Security", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "SOC Analysts & Junior Penetration Testers",
          desc: "Master network fundamentals, threat monitoring, and basic vulnerability assessments.",
          benefits: ["Monitor SIEM alerts and analyze network traffic using Wireshark", "Execute vulnerability scans using Nmap and Nessus", "Understand OSINT (Open Source Intelligence) and social engineering tactics"],
          quote: "I want to become the first line of defense against cyber threats.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "Ethical Hackers & Application Security Engineers",
          desc: "Transition into proactive offensive security and advanced web application penetration testing.",
          benefits: ["Exploit complex vulnerabilities using Metasploit and custom Python scripts", "Master OWASP Top 10 web vulnerabilities using Burp Suite Professional", "Perform privilege escalation and lateral movement in Active Directory environments"],
          quote: "I want to actively hack systems (legally) to find vulnerabilities before the bad guys do.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Security Architects & DevSecOps Leads",
          desc: "Design impenetrable enterprise cloud architectures and lead security compliance programs.",
          benefits: ["Integrate security into CI/CD pipelines (DevSecOps)", "Architect secure AWS/Azure environments with Zero-Trust principles", "Manage incident response, forensics, and corporate compliance (ISO 27001)"],
          quote: "My focus is on enterprise-wide security strategy, compliance, and securing cloud infrastructure.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Networks & Linux Administration", focusLabel: "CURRICULUM",
          focus: ["TCP/IP, Subnetting, Routing, and DNS fundamentals", "Advanced Linux Command Line & Bash Scripting", "Setting up Kali Linux and Virtualized Attack Labs", "Cryptography Basics (Symmetric, Asymmetric, Hashing)"],
          application: "Building a Secure Custom Linux Server"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Network Security & Traffic Analysis", focusLabel: "CURRICULUM",
          focus: ["Packet Sniffing and Traffic Analysis with Wireshark", "Firewalls, IDS/IPS (Snort, Suricata), and VPNs", "Network Reconnaissance and Port Scanning with Nmap", "Vulnerability Scanning with Nessus & OpenVAS"],
          application: "Deploying and Configuring an Enterprise IDS"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Ethical Hacking & Exploitation", focusLabel: "CURRICULUM",
          focus: ["The Cyber Kill Chain and MITRE ATT&CK Framework", "Exploitation using the Metasploit Framework", "Password Cracking (Hashcat, John the Ripper)", "Post-Exploitation, Privilege Escalation, & Rootkits"],
          application: "Rooting a Vulnerable 'Capture The Flag' Machine"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–16", title: "Web Application Penetration Testing", focusLabel: "CURRICULUM",
          focus: ["Understanding HTTP/HTTPS and Web Architectures", "Mastering Burp Suite for Interception & Manipulation", "Exploiting OWASP Top 10 (SQLi, XSS, CSRF, SSRF)", "API Security and Authentication Bypasses"],
          application: "Performing a Full Web App Security Audit"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 17–20", title: "Python for Cybersecurity", focusLabel: "CURRICULUM",
          focus: ["Python Basics for Security Professionals", "Writing Custom Network Scanners and Sniffers", "Automating Exploits and Payload Generation", "Malware Analysis and Reverse Engineering Basics"],
          application: "Developing a Custom Ransomware Simulator"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 21–24", title: "Cloud Security & DevSecOps", focusLabel: "CURRICULUM",
          focus: ["Securing AWS/Azure Infrastructure (IAM, VPCs)", "Integrating Security Tools into CI/CD Pipelines", "Incident Response & Digital Forensics (Autopsy)", "Interview Prep, Cert Guidance (CEH, OSCP), & Placement"],
          application: "Securing a Cloud-Native Microservices Architecture"
        }
      ],
      capstoneProjects: [
        { icon: "ShieldCheck", title: "Enterprise Web App Security Audit", desc: "Perform a comprehensive black-box penetration test on a simulated banking application, exploiting SQLi and XSS, and write a professional remediation report.", tools: ["Burp Suite", "OWASP", "SQLmap"] },
        { icon: "Network", title: "Active Directory Compromise Lab", desc: "Set up a Windows Server domain environment and execute a full attack chain: phishing, Kerberoasting, and Domain Admin privilege escalation.", tools: ["Kali", "Metasploit", "BloodHound"] },
        { icon: "Code", title: "Custom Python Vulnerability Scanner", desc: "Develop a multithreaded Python application that scans IP ranges for open ports, grabs banners, and cross-references known CVEs.", tools: ["Python", "Sockets", "NVD API"] },
        { icon: "Server", title: "Cloud DevSecOps Pipeline", desc: "Build a CI/CD pipeline in GitHub Actions that automatically runs SAST and DAST security scans before deploying infrastructure to AWS.", tools: ["AWS", "Docker", "Trivy"] }
      ],
      faqData: [
        { q: "Is hacking legal to learn?", a: "Yes, you will learn Ethical Hacking in isolated, virtualized lab environments. We strictly teach defensive and authorized offensive techniques." },
        { q: "Do I need to know programming?", a: "Basic programming is helpful, but we teach the necessary Bash and Python scripting required for cybersecurity from the ground up." },
        { q: "Will this help me pass the CEH or OSCP?", a: "Yes. The curriculum maps heavily to the practical knowledge required for certifications like CompTIA Security+, CEH, and OSCP." },
        { q: "What kind of computer do I need?", a: "You need a machine capable of running multiple virtual machines simultaneously (minimum 16GB RAM is highly recommended)." },
        { q: "Are there practical labs?", a: "Absolutely. The course is highly practical, involving weekly Capture The Flag (CTF) challenges and live virtual ranges." },
        { q: "Do you offer placement assistance?", a: "Yes. Our placement cell helps you craft a cybersecurity portfolio and connects you with SOC and Penetration Testing roles." }
      ]
    }
  },
  {
    componentName: 'DevOps',
    data: {
      heroTitle: "DevOps & Cloud Engineering",
      heroSubtitle: "Automate CI/CD pipelines, orchestrate Kubernetes clusters, and manage scalable cloud operations in this rigorous 26-week program.",
      toolsSubtitle: "Master the modern DevOps & Platform stack",
      trackSubtitle: "A dedicated Platform Engineering track tailored to your current experience level.",
      trackButtonLabel: "Start Your DevOps Career →",
      projectLabel: "Infrastructure Project",
      careerOutcomesDomain: "SoftwareDeveloper",
      trustStats: [
        { value: "26 Weeks", label: "Duration" },
        { value: "100% Online", label: "Format" },
        { value: "12+ Pipelines", label: "Hands-on Practice" },
        { value: "4 Capstones", label: "Real Projects" },
        { value: "Automation", label: "Core Focus" }
      ],
      toolsList: [
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
        { name: "Jenkins", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
        { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "Terraform", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" },
        { name: "Ansible", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" },
        { name: "Prometheus", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true }
      ],
      careerPaths: [
        {
          exp: "0–2 Years",
          title: "Release Engineers & Cloud Admins",
          desc: "Master the fundamentals of Linux, Git, and automated software delivery.",
          benefits: ["Manage version control workflows and branch strategies in Git", "Write Bash/Python scripts to automate daily operational tasks", "Build, test, and deploy code using Jenkins and GitHub Actions"],
          quote: "I want to eliminate manual deployments and start automating software delivery.",
          image: "careerPath0"
        },
        {
          exp: "2–6 Years",
          title: "DevOps & SRE Engineers",
          desc: "Manage highly available microservices and scalable cloud infrastructure.",
          benefits: ["Containerize legacy applications using Docker and Docker Compose", "Deploy and orchestrate fault-tolerant clusters using Kubernetes", "Implement Infrastructure as Code (IaC) using Terraform and Ansible"],
          quote: "I need to manage complex, multi-container clusters and ensure zero-downtime deployments.",
          image: "careerPath1"
        },
        {
          exp: "6–10+ Years",
          title: "Platform Architects & Cloud Leads",
          desc: "Design enterprise-wide DevOps platforms, security policies, and observability stacks.",
          benefits: ["Design secure DevSecOps pipelines with automated vulnerability scanning", "Architect multi-region, highly available cloud infrastructures on AWS/GCP", "Implement advanced observability using Prometheus, Grafana, and ELK stack"],
          quote: "My focus is on platform reliability, cost optimization, and enterprise observability.",
          image: "careerPath2"
        }
      ],
      phases: [
        {
          id: "phase-1", phase: "PHASE 1", duration: "WEEKS 1–4", title: "Linux Administration & Scripting", focusLabel: "CURRICULUM",
          focus: ["Advanced Linux OS Architecture, File Systems, and Permissions", "Shell Scripting (Bash) for task automation", "Networking essentials (DNS, Load Balancing, Firewalls)", "Python for Systems Administration"],
          application: "Automated System Backup & Log Rotation Scripts"
        },
        {
          id: "phase-2", phase: "PHASE 2", duration: "WEEKS 5–8", title: "Version Control & CI/CD", focusLabel: "CURRICULUM",
          focus: ["Advanced Git (Rebase, Cherry-Pick, Workflows)", "Continuous Integration Concepts and Artifact Management", "Building Pipelines with Jenkins (Declarative & Scripted)", "Modern CI/CD with GitHub Actions & GitLab CI"],
          application: "Automated Build, Test, and Release Pipeline"
        },
        {
          id: "phase-3", phase: "PHASE 3", duration: "WEEKS 9–12", title: "Containerization with Docker", focusLabel: "CURRICULUM",
          focus: ["Docker Architecture, Images, and Containers", "Writing Optimized Dockerfiles & Multi-stage builds", "Docker Compose for local multi-container development", "Container Registries (DockerHub, AWS ECR)"],
          application: "Containerizing a Full-Stack MERN Application"
        },
        {
          id: "phase-4", phase: "PHASE 4", duration: "WEEKS 13–17", title: "Container Orchestration (Kubernetes)", focusLabel: "CURRICULUM",
          focus: ["Kubernetes Architecture (Control Plane, Nodes, Pods)", "Deployments, Services, Ingress, and ConfigMaps", "StatefulSets, Persistent Volumes, and DaemonSets", "Package Management with Helm Charts"],
          application: "Deploying a Fault-Tolerant Microservices Architecture on K8s"
        },
        {
          id: "phase-5", phase: "PHASE 5", duration: "WEEKS 18–22", title: "Infrastructure as Code (IaC)", focusLabel: "CURRICULUM",
          focus: ["AWS Cloud Fundamentals (EC2, VPC, S3, RDS)", "Provisioning Cloud Infrastructure using Terraform", "Configuration Management with Ansible", "Managing Terraform State and Modules securely"],
          application: "Automated Multi-Tier AWS Infrastructure Provisioning"
        },
        {
          id: "phase-6", phase: "PHASE 6", duration: "WEEKS 23–26", title: "Observability & DevSecOps", focusLabel: "CURRICULUM",
          focus: ["Monitoring Metrics with Prometheus & Grafana", "Centralized Logging with the ELK Stack (Elasticsearch, Logstash, Kibana)", "Integrating Security Scans (Trivy, SonarQube) into Pipelines", "SRE Best Practices, Interview Prep, & Placement"],
          application: "Enterprise Observability Dashboard & DevSecOps Pipeline"
        }
      ],
      capstoneProjects: [
        { icon: "Workflow", title: "End-to-End Microservices CI/CD", desc: "Build a fully automated Jenkins pipeline that builds Docker images, runs unit tests, and deploys a microservices application to a Kubernetes cluster.", tools: ["Jenkins", "Docker", "Kubernetes"] },
        { icon: "Server", title: "AWS Cloud Automation via IaC", desc: "Use Terraform and Ansible to automatically provision a secure Virtual Private Cloud (VPC), configure EC2 instances, and deploy a web server array behind a Load Balancer.", tools: ["Terraform", "Ansible", "AWS"] },
        { icon: "ShieldCheck", title: "DevSecOps Security Pipeline", desc: "Implement a GitHub Actions workflow that performs Static Application Security Testing (SAST) and container vulnerability scanning before pushing to production.", tools: ["GitHub Actions", "Trivy", "SonarQube"] },
        { icon: "BrainCircuit", title: "SRE Observability Stack", desc: "Deploy Prometheus and Grafana onto a Kubernetes cluster to monitor pod health, resource utilization, and set up automated Slack alerts for system degradation.", tools: ["Prometheus", "Grafana", "Slack API"] }
      ],
      faqData: [
        { q: "What is DevOps?", a: "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle and provide continuous delivery with high software quality." },
        { q: "Do I need coding experience?", a: "While DevOps isn't primarily about software engineering, a basic understanding of scripting (Bash, Python) and how code is structured is required. We will teach you the necessary scripting." },
        { q: "Is this program focused on AWS?", a: "Yes, our cloud infrastructure modules primarily focus on AWS as it is the industry leader, but the tools we teach (Terraform, Kubernetes, Docker) are cloud-agnostic." },
        { q: "What is the difference between DevOps and Full Stack?", a: "Full Stack developers write the application code. DevOps engineers build the automated highways that test, secure, and deploy that code to the cloud." },
        { q: "Are there any certifications associated with this?", a: "The curriculum perfectly aligns with the knowledge required for the AWS Certified Solutions Architect and Certified Kubernetes Administrator (CKA) exams." },
        { q: "Will you help me get a job?", a: "Yes, our career services team will help you optimize your resume, prepare for technical system design interviews, and connect you with hiring partners." }
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
  
  // We need to replace the entire courseData object.
  // We'll use regex to find everything from `const courseData = {` down to `courseData.heroImages = `
  const regex = /const courseData = \{[\s\S]*?(?=courseData\.heroImages =)/;
  
  const newDataString = `const courseData = ${JSON.stringify(course.data, null, 2)};\n\n  `;
  
  content = content.replace(regex, newDataString);
  fs.writeFileSync(componentPath, content, 'utf8');
  console.log(`Enriched ${course.componentName}.jsx`);
});

console.log('Batch 1 enrichment complete!');
