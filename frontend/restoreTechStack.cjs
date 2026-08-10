const fs = require('fs');
const path = require('path');
const targetDir = path.join(__dirname, 'src', 'page');

// --- DATASCIENCE.JSX ---
const dsPath = path.join(targetDir, 'DataScience.jsx');
let dsContent = fs.readFileSync(dsPath, 'utf8');

const dsToolsArray = `
const toolsList = [
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "Scikit-Learn", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
  { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Tableau", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png" },
  { name: "Power BI", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invert: true },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", invert: true },
];
`;

const dsTechStack = `
      {/* TOOLS & TECHNOLOGIES */}
      <section id="tools" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#eab308]/15 text-[#eab308] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black ag-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-slate-400 text-lg">Master the modern data science &amp; AI stack</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#0B0F13] rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-[#eab308]/50 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={\`w-9 h-9 object-contain \${tool.invert ? "invert opacity-80" : ""}\`} />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest text-center leading-tight uppercase group-hover:text-[#eab308] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
`;

if (!dsContent.includes("const toolsList = [")) {
  dsContent = dsContent.replace("const careerPaths = [", dsToolsArray + "\nconst careerPaths = [");
}
if (!dsContent.includes("Tools &amp; Technologies")) {
  dsContent = dsContent.replace("{/* SALARY GROWTH */}", dsTechStack + "\n      {/* SALARY GROWTH */}");
}
fs.writeFileSync(dsPath, dsContent, 'utf8');

// --- AIFULLSTACK.JSX ---
const aiPath = path.join(targetDir, 'AIFullStack.jsx');
let aiContent = fs.readFileSync(aiPath, 'utf8');

const aiToolsArray = `
const toolsList = [
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", invert: true },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invert: true },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
];
`;

const aiTechStack = `
      {/* TOOLS & TECHNOLOGIES */}
      <section id="tools" className="py-24 px-6 bg-[#0a0a0a] border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#10b981]/15 text-[#10b981] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black ag-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-slate-400 text-lg">Master the modern AI &amp; Web development stack</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#000000] rounded-2xl flex items-center justify-center overflow-hidden border border-slate-900 transition-all duration-300 group-hover:scale-110 group-hover:border-[#10b981]/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={\`w-9 h-9 object-contain \${tool.invert ? "invert opacity-80" : ""}\`} />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest text-center leading-tight uppercase group-hover:text-[#10b981] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
`;

if (!aiContent.includes("const toolsList = [")) {
  aiContent = aiContent.replace("const careerPaths = [", aiToolsArray + "\nconst careerPaths = [");
}
if (!aiContent.includes("Tools &amp; Technologies")) {
  aiContent = aiContent.replace("{/* SALARY GROWTH */}", aiTechStack + "\n      {/* SALARY GROWTH */}");
}
fs.writeFileSync(aiPath, aiContent, 'utf8');

console.log('Restored toolsList and tech stack with NO Langchain for DataScience and AIFullStack!');
