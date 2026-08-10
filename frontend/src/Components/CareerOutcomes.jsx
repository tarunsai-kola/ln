import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ArrowRight, Briefcase, Star } from "lucide-react";

const domainCareerData = {
  SoftwareDeveloper: {
    heading: "Career Roles After This Program",
    subtitle: "From full-stack engineers to AI application developers — here's where our graduates land.",
    roles: [
      { title: "Software Development Engineer (SDE)", avg: "₹12–18 LPA", highest: "₹35 LPA", tags: ["Java", "Spring Boot", "React"], growth: "High Demand" },
      { title: "Backend Developer", avg: "₹10–16 LPA", highest: "₹30 LPA", tags: ["Node.js", "REST APIs", "MongoDB"], growth: "Growing Fast" },
      { title: "Full Stack Developer", avg: "₹12–20 LPA", highest: "₹38 LPA", tags: ["MERN Stack", "Next.js", "Docker"], growth: "High Demand" },
      { title: "Cloud & DevOps Engineer", avg: "₹14–22 LPA", highest: "₹42 LPA", tags: ["AWS", "Kubernetes", "CI/CD"], growth: "Booming" },
      { title: "AI Application Developer", avg: "₹16–28 LPA", highest: "₹55 LPA", tags: ["LangChain", "OpenAI API", "Python"], growth: "Booming" },
      { title: "System Design Lead / Tech Lead", avg: "₹25–40 LPA", highest: "₹60 LPA", tags: ["HLD/LLD", "Microservices", "Team Lead"], growth: "Senior Track" },
    ]
  },
  DataScience: {
    heading: "Career Roles After This Program",
    subtitle: "From ML engineers to AI architects — the data science track unlocks elite roles.",
    roles: [
      { title: "Data Scientist", avg: "₹12–20 LPA", highest: "₹40 LPA", tags: ["Python", "ML Models", "Statistics"], growth: "High Demand" },
      { title: "Machine Learning Engineer", avg: "₹14–24 LPA", highest: "₹50 LPA", tags: ["TensorFlow", "PyTorch", "MLOps"], growth: "Booming" },
      { title: "GenAI / LLM Engineer", avg: "₹18–32 LPA", highest: "₹65 LPA", tags: ["LangChain", "RAG", "Vector DBs"], growth: "Booming" },
      { title: "AI Research Engineer", avg: "₹20–35 LPA", highest: "₹65 LPA", tags: ["NLP", "Transformers", "Research"], growth: "Elite Track" },
      { title: "Data Analytics Manager", avg: "₹15–25 LPA", highest: "₹42 LPA", tags: ["BI Tools", "SQL", "Dashboards"], growth: "Growing Fast" },
      { title: "AI Product Manager", avg: "₹20–38 LPA", highest: "₹60 LPA", tags: ["AI Strategy", "Roadmap", "GenAI"], growth: "Senior Track" },
    ]
  },
  DataAnalytics: {
    heading: "Career Roles After This Program",
    subtitle: "From business analysts to analytics leads — data analytics opens doors across every industry.",
    roles: [
      { title: "Business Analyst", avg: "₹6–10 LPA", highest: "₹20 LPA", tags: ["SQL", "Excel", "Dashboards"], growth: "Stable Demand" },
      { title: "Data Analyst", avg: "₹8–14 LPA", highest: "₹28 LPA", tags: ["Power BI", "Tableau", "Python"], growth: "High Demand" },
      { title: "BI Developer / Analyst", avg: "₹10–18 LPA", highest: "₹30 LPA", tags: ["Power BI", "SQL", "ETL"], growth: "Growing Fast" },
      { title: "Analytics Lead / Manager", avg: "₹18–28 LPA", highest: "₹42 LPA", tags: ["Team Lead", "Storytelling", "Strategy"], growth: "Senior Track" },
      { title: "Product Analyst", avg: "₹12–20 LPA", highest: "₹35 LPA", tags: ["A/B Testing", "Funnel Analysis", "SQL"], growth: "High Demand" },
      { title: "Marketing Data Analyst", avg: "₹8–14 LPA", highest: "₹25 LPA", tags: ["Google Analytics", "Meta Ads", "CRM"], growth: "Growing Fast" },
    ]
  },
  Cybersecurity: {
    heading: "Career Roles After This Program",
    subtitle: "From ethical hackers to CISOs — cybersecurity professionals are among the highest-paid in tech.",
    roles: [
      { title: "Ethical Hacker / Penetration Tester", avg: "₹8–14 LPA", highest: "₹28 LPA", tags: ["Kali Linux", "Metasploit", "Bug Bounty"], growth: "High Demand" },
      { title: "SOC Analyst (L1/L2/L3)", avg: "₹7–12 LPA", highest: "₹22 LPA", tags: ["SIEM", "Incident Response", "Threat Intel"], growth: "Stable Demand" },
      { title: "Cloud Security Engineer", avg: "₹14–24 LPA", highest: "₹42 LPA", tags: ["AWS Security", "IAM", "Zero Trust"], growth: "Booming" },
      { title: "Application Security Engineer", avg: "₹12–20 LPA", highest: "₹38 LPA", tags: ["OWASP", "SAST/DAST", "Code Review"], growth: "Growing Fast" },
      { title: "Cybersecurity Architect", avg: "₹22–36 LPA", highest: "₹55 LPA", tags: ["Framework Design", "Risk Mgmt", "Compliance"], growth: "Senior Track" },
      { title: "CISO / Security Manager", avg: "₹30–50 LPA", highest: "₹80 LPA", tags: ["Leadership", "GRC", "Policy"], growth: "Elite Track" },
    ]
  },
  DigitalMarketing: {
    heading: "Career Roles After This Program",
    subtitle: "From performance marketers to growth leads — AI-powered marketing professionals command premium salaries.",
    roles: [
      { title: "Performance Marketing Specialist", avg: "₹5–9 LPA", highest: "₹18 LPA", tags: ["Meta Ads", "Google Ads", "ROAS"], growth: "High Demand" },
      { title: "SEO / SEM Specialist", avg: "₹4–8 LPA", highest: "₹16 LPA", tags: ["SEO", "SEM", "Content Strategy"], growth: "Stable Demand" },
      { title: "Social Media Strategist", avg: "₹5–9 LPA", highest: "₹18 LPA", tags: ["Instagram", "LinkedIn", "Influencer"], growth: "Growing Fast" },
      { title: "Growth Hacker / Growth Lead", avg: "₹10–18 LPA", highest: "₹30 LPA", tags: ["Funnels", "CRO", "Analytics"], growth: "Booming" },
      { title: "Marketing Analytics Manager", avg: "₹12–20 LPA", highest: "₹35 LPA", tags: ["GA4", "CRM", "Attribution"], growth: "High Demand" },
      { title: "CMO / Digital Marketing Head", avg: "₹20–35 LPA", highest: "₹55 LPA", tags: ["Strategy", "Brand", "Team Lead"], growth: "Senior Track" },
    ]
  },
  AgenticAndGenAI: {
    heading: "Career Roles After This Program",
    subtitle: "From AI engineers to agentic system architects — GenAI is the highest-growth domain in tech.",
    roles: [
      { title: "GenAI / LLM Engineer", avg: "₹18–32 LPA", highest: "₹65 LPA", tags: ["LangChain", "RAG", "OpenAI"], growth: "Booming" },
      { title: "AI Automation Engineer", avg: "₹16–28 LPA", highest: "₹55 LPA", tags: ["n8n", "LangGraph", "Agents"], growth: "Booming" },
      { title: "Prompt Engineer", avg: "₹12–22 LPA", highest: "₹40 LPA", tags: ["Prompt Design", "Few-Shot", "GPT-4"], growth: "High Demand" },
      { title: "AI Product Manager", avg: "₹20–38 LPA", highest: "₹65 LPA", tags: ["AI Roadmap", "GenAI Strategy", "LLMs"], growth: "Elite Track" },
      { title: "ML Ops / AI Platform Engineer", avg: "₹18–30 LPA", highest: "₹58 LPA", tags: ["Vector DBs", "Model Serving", "DevOps"], growth: "Growing Fast" },
      { title: "Agentic Systems Architect", avg: "₹28–50 LPA", highest: "₹80 LPA", tags: ["Multi-Agent", "RAG", "LangGraph"], growth: "Elite Track" },
    ]
  },
  AIFullStack: {
    heading: "Career Roles After This Program",
    subtitle: "From full-stack engineers to AI-integrated product builders — the future of engineering is here.",
    roles: [
      { title: "AI-Powered Full Stack Developer", avg: "₹12–20 LPA", highest: "₹40 LPA", tags: ["React", "Node.js", "OpenAI API"], growth: "Booming" },
      { title: "Frontend Engineer", avg: "₹10–18 LPA", highest: "₹32 LPA", tags: ["React", "Next.js", "TypeScript"], growth: "High Demand" },
      { title: "Backend Engineer (Node / Python)", avg: "₹12–22 LPA", highest: "₹38 LPA", tags: ["Node.js", "FastAPI", "MongoDB"], growth: "High Demand" },
      { title: "AI Integration Engineer", avg: "₹16–28 LPA", highest: "₹50 LPA", tags: ["LangChain", "OpenAI", "RAG"], growth: "Booming" },
      { title: "MERN Stack Developer", avg: "₹10–16 LPA", highest: "₹30 LPA", tags: ["MongoDB", "Express", "React", "Node"], growth: "Growing Fast" },
      { title: "Product Engineer / Tech Lead", avg: "₹22–38 LPA", highest: "₹60 LPA", tags: ["Full Stack", "System Design", "AI"], growth: "Senior Track" },
    ]
  },
  VLSI: {
    heading: "Career Roles After This Program",
    subtitle: "From digital design engineers to ASIC architects — here's where our VLSI graduates land.",
    roles: [
      { title: "RTL Design Engineer", avg: "₹8–15 LPA", highest: "₹30 LPA", tags: ["Verilog", "SystemVerilog", "Digital Logic"], growth: "High Demand" },
      { title: "Verification Engineer", avg: "₹10–18 LPA", highest: "₹35 LPA", tags: ["UVM", "SystemVerilog", "Testbenches"], growth: "Booming" },
      { title: "Physical Design Engineer", avg: "₹12–20 LPA", highest: "₹40 LPA", tags: ["Synthesis", "PnR", "STA"], growth: "High Demand" },
      { title: "FPGA Design Engineer", avg: "₹8–16 LPA", highest: "₹32 LPA", tags: ["Xilinx", "VHDL", "FPGA flow"], growth: "Stable Demand" },
      { title: "DFT Engineer", avg: "₹10–18 LPA", highest: "₹35 LPA", tags: ["ATPG", "Scan Insertion", "JTAG"], growth: "Growing Fast" },
      { title: "ASIC Architect / Tech Lead", avg: "₹25–40 LPA", highest: "₹65 LPA", tags: ["SoC Design", "Architecture", "Lead"], growth: "Senior Track" },
    ]
  },
};

const growthColors = {
  "Booming": { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  "High Demand": { bg: "bg-blue-500/15", text: "text-blue-400", dot: "bg-blue-400" },
  "Growing Fast": { bg: "bg-violet-500/15", text: "text-violet-400", dot: "bg-violet-400" },
  "Elite Track": { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400" },
  "Senior Track": { bg: "bg-rose-500/15", text: "text-rose-400", dot: "bg-rose-400" },
  "Stable Demand": { bg: "bg-slate-500/15", text: "text-slate-400", dot: "bg-slate-400" },
};

const CareerOutcomes = ({ domain = "SoftwareDeveloper" }) => {
  const data = domainCareerData[domain] || domainCareerData["SoftwareDeveloper"];

  return (
    <section className="py-24 px-6 bg-bg border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
            Career Outcomes
          </span>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight leading-tight">
                {data.heading}
              </h2>
              <p className="text-textMuted mt-3 text-lg max-w-2xl">
                {data.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.roles.map((role, i) => {
            const gc = growthColors[role.growth] || growthColors["High Demand"];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-surface2 border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Role title + growth badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase size={18} className="text-primary" strokeWidth={1.8} />
                  </div>
                  <span className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full ${gc.bg} ${gc.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${gc.dot}`} />
                    {role.growth}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold text-text leading-snug font-outfit">
                  {role.title}
                </h3>

                {/* Packages */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface rounded-xl p-3 border border-border">
                    <p className="text-[9px] font-bold text-textMuted uppercase tracking-widest mb-1">Avg Package</p>
                    <p className="text-[15px] font-black text-text">{role.avg}</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 border border-primary/20">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Highest</p>
                    <p className="text-[15px] font-black text-primary">{role.highest}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {role.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-semibold bg-surface border border-border text-textMuted px-3 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-[11px] text-textMuted italic text-center">
          * Salary ranges are indicative and sourced from industry reports. Actual packages vary by company, skills, and experience.
        </p>
      </div>
    </section>
  );
};

export default CareerOutcomes;
