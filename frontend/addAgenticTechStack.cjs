const fs = require('fs');
const path = require('path');
const agenticPath = path.join(__dirname, 'src', 'page', 'AgenticAndGenAI.jsx');
let content = fs.readFileSync(agenticPath, 'utf8');

const regex = /\{\/\* ══════════════════════════════════════════\s*WHAT YOU'LL LEARN \(LIGHT BACKGROUND\)\s*══════════════════════════════════════════ \*\/\}/;

const newTechStack = `{/* ══════════════════════════════════════════
          TECH STACK
          ══════════════════════════════════════════ */}
      <section id="tools" className="py-24 px-6 bg-[#0b0b0f] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#7c3aed]/15 text-[#a78bfa] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black ag-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-slate-400 text-lg">Master the modern Generative AI &amp; Agentic automation stack</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#13131A] rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-[#7c3aed]/50 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={\`w-9 h-9 object-contain \${tool.invert ? "invert opacity-80" : ""}\`} />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest text-center leading-tight uppercase group-hover:text-[#a78bfa] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT YOU'LL LEARN (LIGHT BACKGROUND)
          ══════════════════════════════════════════ */}`;

if (regex.test(content)) {
  content = content.replace(regex, newTechStack);
  fs.writeFileSync(agenticPath, content, 'utf8');
  console.log('Successfully injected Tech Stack into AgenticAndGenAI.jsx');
} else {
  console.log('Could not find the insertion point for Tech Stack');
}
