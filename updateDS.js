const fs = require('fs');
const path = require('path');

const newProgramOutline = "[\n  {\n    phase: \"Phase 1: Core Training\",\n    weeks: \"Weeks 1-4\",\n    title: \"Python, Data Analysis, BI & SQL\",\n    focus: [\n      \"Python Fundamentals, OOP & Data Cleaning\",\n      \"EDA, Feature Engineering & Statistical Analysis\",\n      \"Power BI, Tableau & Executive Reporting\",\n      \"Advanced SQL, CTEs & Query Optimization\"\n    ],\n    application: \"Build Sales Dashboards, Customer Segmentation, and BI Reports.\"\n  },\n  {\n    phase: \"Phase 1: Core Training (Contd.)\",\n    weeks: \"Weeks 5-8\",\n    title: \"Machine Learning & Generative AI\",\n    focus: [\n      \"Supervised & Unsupervised Learning\",\n      \"Random Forest, XGBoost & Time Series\",\n      \"Foundations of GenAI, RAG & Vector DBs\",\n      \"LangChain, AI Agents & Cloud Deployment\"\n    ],\n    application: \"Predict Customer Churn, Forecast Sales, and build a Custom AI Chatbot.\"\n  },\n  {\n    phase: \"Phase 2: Implementation & Capstone\",\n    weeks: \"Weeks 9-12\",\n    title: \"Industry Capstone & AI Integration\",\n    focus: [\n      \"Select domain (Marketing/Finance/HR/Healthcare Analytics)\",\n      \"Data Pipeline & Model Architecture\",\n      \"GenAI Implementation & Business Engine\",\n      \"Deployment & GitHub Portfolio Building\"\n    ],\n    application: \"Deliver a complete Portfolio-Ready Industry Project with AI Features.\"\n  },\n  {\n    phase: \"Phase 3: Career Support\",\n    weeks: \"Weeks 13-16\",\n    title: \"Placement Prep & Hiring Challenges\",\n    focus: [\n      \"ATS-Friendly Resume & LinkedIn Branding\",\n      \"Technical Mock Interviews (Python, SQL, ML, GenAI)\",\n      \"Business Case Studies & Analytics Challenges\",\n      \"Dedicated Placement Cell & Salary Negotiation\"\n    ],\n    application: \"Complete Industry Hiring Simulation and apply to Hiring Partners.\"\n  }\n]";

const newCapstoneProjects = "[\n  { icon: LineChart, title: \"Sales Data Dashboard\", desc: \"A comprehensive Power BI/Tableau dashboard analyzing real industry sales data and performance KPIs.\", tools: [\"Power BI\", \"Tableau\", \"SQL\"] },\n  { icon: Users, title: \"Customer Churn Prediction\", desc: \"Supervised machine learning model evaluating metrics to predict and prevent e-commerce customer churn.\", tools: [\"Python\", \"Pandas\", \"Scikit-Learn\"] },\n  { icon: TrendingUp, title: \"Sales Forecasting System\", desc: \"Time series forecasting model utilizing Random Forest and XGBoost to project future revenue.\", tools: [\"XGBoost\", \"Machine Learning\", \"Python\"] },\n  { icon: BrainCircuit, title: \"AI Research Assistant\", desc: \"A robust retrieval-augmented generation (RAG) system using Vector Databases for automated data extraction.\", tools: [\"GenAI\", \"RAG\", \"Vector DB\"] },\n  { icon: TerminalSquare, title: \"Custom AI Chatbot\", desc: \"An intelligent conversational agent deployed via Streamlit, integrated with OpenAI APIs and LangChain.\", tools: [\"LangChain\", \"OpenAI\", \"Streamlit\"] },\n]";

const newCareerPaths = "[\n  {\n    exp: \"Data & BI Analytics\",\n    title: \"Data Analyst / BI Analyst\",\n    desc: \"Generate insights, build executive dashboards, and drive business decisions using Python, SQL, and PowerBI.\",\n    benefits: [\n      \"Master SQL for data querying\",\n      \"Build high-impact BI dashboards\",\n      \"Present actionable insights\"\n    ],\n    image: \"https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop\",\n    quote: \"A strong foundation in data visualization and SQL is the absolute prerequisite for any successful data career.\"\n  },\n  {\n    exp: \"Machine Learning\",\n    title: \"Data Scientist / ML Engineer\",\n    desc: \"Transition from basic analytics to architecting predictive models and machine learning pipelines.\",\n    benefits: [\n      \"Design and train ML models\",\n      \"Predict customer churn & forecast sales\",\n      \"Deploy models via Python and APIs\"\n    ],\n    image: \"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop\",\n    quote: \"The ability to not just analyze data, but predict future outcomes, sets top engineers apart.\"\n  },\n  {\n    exp: \"Generative AI\",\n    title: \"AI Engineer / GenAI Specialist\",\n    desc: \"Lead AI strategy by integrating Large Language Models and building automated AI agents for enterprise workflows.\",\n    benefits: [\n      \"Build RAG systems and autonomous agents\",\n      \"Develop Custom AI Chatbots\",\n      \"Implement LangChain architectures\"\n    ],\n    image: \"https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop\",\n    quote: \"Scaling generative AI is the hardest part. Engineers who understand LLMs and AI Agents are incredibly rare.\"\n  }\n]";

const files = [
  path.join(__dirname, 'frontend/src/page/DataScience.jsx'),
  path.join(__dirname, 'frontend/FRONTEND/src/page/DataScience.jsx')
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace programOutline
    content = content.replace(/const programOutline = \\[[\\s\\S]*?\\];/, "const programOutline = " + newProgramOutline + ";");
    // Replace capstoneProjects
    content = content.replace(/const capstoneProjects = \\[[\\s\\S]*?\\];/, "const capstoneProjects = " + newCapstoneProjects + ";");
    // Replace careerPaths
    content = content.replace(/const careerPaths = \\[[\\s\\S]*?\\];/, "const careerPaths = " + newCareerPaths + ";");
    
    fs.writeFileSync(file, content);
    console.log("Updated " + file);
  }
});
