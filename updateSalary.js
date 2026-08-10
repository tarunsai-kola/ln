const fs = require('fs');
const path = require('path');

const newSalaryComponent = \`import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const domainSalaryData = {
  SoftwareDeveloper: {
    subtitle: "AI engineering roles command strong compensation across all experience levels in India.",
    data: {
      entry: { id: "entry", label: "Entry Level", sub: "0–2 years", min: "₹8 LPA", avg: "₹12 LPA", max: "₹15 LPA", minPct: 35, avgPct: 55, maxPct: 85, companies: ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant"] },
      mid: { id: "mid", label: "Mid-Level", sub: "2–6 years", min: "₹15 LPA", avg: "₹24 LPA", max: "₹35 LPA", minPct: 40, avgPct: 65, maxPct: 92, companies: ["IBM", "Deloitte", "Capgemini", "Oracle", "Microsoft"] },
      senior: { id: "senior", label: "Senior Level", sub: "6–10+ years", min: "₹30 LPA", avg: "₹45 LPA", max: "₹60 LPA", minPct: 45, avgPct: 70, maxPct: 100, companies: ["Amazon", "Google", "Atlassian", "Uber", "Intuit"] }
    }
  },
  DataScience: {
    subtitle: "Data Science & AI roles offer premium compensation across all experience levels globally.",
    data: {
      entry: { id: "entry", label: "Entry Level", sub: "0–2 years", min: "₹10 LPA", avg: "₹14 LPA", max: "₹18 LPA", minPct: 35, avgPct: 55, maxPct: 85, companies: ["MuSigma", "Fractal", "Tredence", "Tiger Analytics", "LatentView"] },
      mid: { id: "mid", label: "Mid-Level", sub: "2–6 years", min: "₹18 LPA", avg: "₹28 LPA", max: "₹40 LPA", minPct: 40, avgPct: 65, maxPct: 92, companies: ["Amazon", "Walmart Labs", "Target", "Mastercard", "Visa"] },
      senior: { id: "senior", label: "Senior Level", sub: "6–10+ years", min: "₹35 LPA", avg: "₹50 LPA", max: "₹65 LPA", minPct: 45, avgPct: 70, maxPct: 100, companies: ["Google", "Meta", "Netflix", "OpenAI", "Anthropic"] }
    }
  },
  DataAnalytics: {
    subtitle: "Data Analytics professionals drive business growth and command highly competitive salaries.",
    data: {
      entry: { id: "entry", label: "Entry Level", sub: "0–2 years", min: "₹6 LPA", avg: "₹8 LPA", max: "₹12 LPA", minPct: 35, avgPct: 55, maxPct: 85, companies: ["Deloitte", "KPMG", "EY", "PwC", "Accenture"] },
      mid: { id: "mid", label: "Mid-Level", sub: "2–6 years", min: "₹12 LPA", avg: "₹18 LPA", max: "₹25 LPA", minPct: 40, avgPct: 65, maxPct: 92, companies: ["Uber", "Swiggy", "Zomato", "Flipkart", "Myntra"] },
      senior: { id: "senior", label: "Senior Level", sub: "6–10+ years", min: "₹25 LPA", avg: "₹35 LPA", max: "₹45 LPA", minPct: 45, avgPct: 70, maxPct: 100, companies: ["Bain & Co", "McKinsey", "BCG", "JPMorgan", "Goldman Sachs"] }
    }
  },
  Cybersecurity: {
    subtitle: "Cybersecurity experts are in high demand, leading to rapid salary growth and premium packages.",
    data: {
      entry: { id: "entry", label: "Entry Level", sub: "0–2 years", min: "₹7 LPA", avg: "₹10 LPA", max: "₹14 LPA", minPct: 35, avgPct: 55, maxPct: 85, companies: ["Cisco", "Palo Alto", "Fortinet", "CrowdStrike", "IBM Security"] },
      mid: { id: "mid", label: "Mid-Level", sub: "2–6 years", min: "₹14 LPA", avg: "₹22 LPA", max: "₹32 LPA", minPct: 40, avgPct: 65, maxPct: 92, companies: ["Tanium", "Zscaler", "Splunk", "FireEye", "Symantec"] },
      senior: { id: "senior", label: "Senior Level", sub: "6–10+ years", min: "₹30 LPA", avg: "₹40 LPA", max: "₹55 LPA", minPct: 45, avgPct: 70, maxPct: 100, companies: ["Google Project Zero", "Microsoft DART", "Mandiant", "NSA", "Apple"] }
    }
  },
  DigitalMarketing: {
    subtitle: "Performance Marketing & AI roles offer lucrative compensation for ROI-driven professionals.",
    data: {
      entry: { id: "entry", label: "Entry Level", sub: "0–2 years", min: "₹4 LPA", avg: "₹6 LPA", max: "₹9 LPA", minPct: 35, avgPct: 55, maxPct: 85, companies: ["GroupM", "Ogilvy", "Performics", "Dentsu", "Publicis"] },
      mid: { id: "mid", label: "Mid-Level", sub: "2–6 years", min: "₹9 LPA", avg: "₹15 LPA", max: "₹22 LPA", minPct: 40, avgPct: 65, maxPct: 92, companies: ["Amazon", "Nykaa", "L'Oreal", "HUL", "ITC"] },
      senior: { id: "senior", label: "Senior Level", sub: "6–10+ years", min: "₹22 LPA", avg: "₹30 LPA", max: "₹40 LPA", minPct: 45, avgPct: 70, maxPct: 100, companies: ["Google", "Meta", "LinkedIn", "HubSpot", "Salesforce"] }
    }
  }
};

const AnimatedBar = ({ pct, color, delay = 0, isVisible }) => (
  <div className="w-full rounded-t-xl overflow-hidden" style={{ height: "100%" }}>
    <motion.div
      className={\`w-full rounded-t-xl \${color}\`}
      initial={{ height: 0 }}
      animate={{ height: isVisible ? \`\${pct}%\` : 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ originY: 1 }}
    />
  </div>
);

const SalaryGrowth = ({ domain = "SoftwareDeveloper" }) => {
  const [activeTab, setActiveTab] = useState("entry");
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: false, margin: "-80px" });

  const currentDomainData = domainSalaryData[domain] || domainSalaryData["SoftwareDeveloper"];
  const d = currentDomainData.data[activeTab];

  const bars = [
    { label: "Min", value: d.min, pct: d.minPct, color: "bg-gradient-to-t from-slate-700 to-slate-500", delay: 0 },
    { label: "Avg", value: d.avg, pct: d.avgPct, color: "bg-gradient-to-t from-[#0F6F42] to-[#1DB865]", delay: 0.1 },
    { label: "Max", value: d.max, pct: d.maxPct, color: "bg-gradient-to-t from-amber-700 to-amber-500", delay: 0.2 },
  ];

  return (
    <section className="py-24 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-14">
          <div>
            <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Career Outcomes
            </span>
            <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight leading-tight">
              Industry Salary Growth
            </h2>
            <p className="text-textMuted mt-3 text-lg max-w-lg">
              {currentDomainData.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-bold text-textMuted uppercase tracking-widest mb-2">
              Select Experience Level
            </div>
            {Object.values(currentDomainData.data).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={\`flex items-center justify-between px-5 py-4 rounded-2xl transition-all text-left border \${
                    isActive
                      ? "bg-surface2 border-primary/40 shadow-[0_0_24px_rgba(19,138,82,0.15)]"
                      : "bg-surface border-border hover:border-white/10"
                  }\`}
                >
                  <div>
                    <div className={\`font-bold text-base \${isActive ? "text-primary" : "text-textMuted"}\`}>
                      {tab.label}
                    </div>
                    <div className="text-[11px] text-textMuted mt-0.5">{tab.sub}</div>
                  </div>
                  {!isActive && <ArrowRight size={16} className="text-textMuted" />}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-6">
            <div
              ref={chartRef}
              className="bg-surface2 rounded-2xl p-8 md:p-10 border border-border"
            >
              <div className="mb-8">
                <h3 className="text-lg font-bold text-text mb-1">Salary Range</h3>
                <p className="text-[11px] text-textMuted font-bold tracking-widest uppercase">
                  Annual Packages (LPA)
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-56 flex items-end justify-center gap-8 md:gap-16"
                >
                  {bars.map((bar) => (
                    <div key={bar.label} className="flex flex-col items-center flex-1 max-w-[110px] h-full">
                      <motion.span
                        key={\`\${activeTab}-\${bar.label}-val\`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: bar.delay + 0.4 }}
                        className="font-bold text-xl md:text-2xl text-text mb-1"
                      >
                        {bar.value}
                      </motion.span>
                      <span className="text-[10px] text-textMuted font-bold tracking-widest mb-3 uppercase">
                        {bar.label}
                      </span>

                      <div className="w-full flex-1 flex items-end">
                        <motion.div
                          key={\`\${activeTab}-\${bar.label}\`}
                          className={\`w-full rounded-t-xl \${bar.color}\`}
                          initial={{ height: 0 }}
                          animate={{ height: isInView ? \`\${bar.pct}%\` : 0 }}
                          transition={{
                            duration: 0.85,
                            delay: bar.delay,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ minHeight: 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 border-t border-border/40 pt-3 flex justify-between">
                <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">0</span>
                <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">Scale (LPA)</span>
              </div>
            </div>

            <p className="text-[11px] text-textMuted italic">
              * Indicative figures sourced from industry reports and job market data. Not a guaranteed outcome.
            </p>

            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[11px] font-bold text-textMuted uppercase tracking-widest">
                  Currently hiring for this role
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + "-companies"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-3"
                >
                  {d.companies.map((company, i) => (
                    <motion.div
                      key={company}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.06 }}
                      className="bg-surface2 rounded-xl px-5 py-3 border border-border font-bold text-text text-sm tracking-tight transition-all hover:-translate-y-0.5 hover:border-primary/40 cursor-default"
                    >
                      {company}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-[10px] text-textMuted italic">
              * All company names and trademarks are property of their respective owners. Does not imply endorsement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalaryGrowth;
\`;

const componentPath = path.join(__dirname, 'frontend/src/Components/SalaryGrowth.jsx');
fs.writeFileSync(componentPath, newSalaryComponent);
console.log("Updated SalaryGrowth.jsx");

const pages = [
  { file: 'frontend/src/page/SoftwareDeveloper.jsx', domain: 'SoftwareDeveloper' },
  { file: 'frontend/FRONTEND/src/page/SoftwareDeveloper.jsx', domain: 'SoftwareDeveloper' },
  { file: 'frontend/src/page/DataScience.jsx', domain: 'DataScience' },
  { file: 'frontend/FRONTEND/src/page/DataScience.jsx', domain: 'DataScience' },
  { file: 'frontend/src/page/DataAnalytics.jsx', domain: 'DataAnalytics' },
  { file: 'frontend/FRONTEND/src/page/DataAnalytics.jsx', domain: 'DataAnalytics' },
  { file: 'frontend/src/page/Cybersecurity.jsx', domain: 'Cybersecurity' },
  { file: 'frontend/FRONTEND/src/page/Cybersecurity.jsx', domain: 'Cybersecurity' },
  { file: 'frontend/src/page/DigitalMarketing.jsx', domain: 'DigitalMarketing' },
  { file: 'frontend/FRONTEND/src/page/DigitalMarketing.jsx', domain: 'DigitalMarketing' }
];

pages.forEach(p => {
  const filePath = path.join(__dirname, p.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<SalaryGrowth \\/>/g, \`<SalaryGrowth domain="\${p.domain}" />\`);
    fs.writeFileSync(filePath, content);
    console.log("Updated " + p.file);
  }
});
