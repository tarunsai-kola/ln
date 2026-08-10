const fs = require('fs');
const path = require('path');
const agenticPath = path.join(__dirname, 'src', 'page', 'AgenticAndGenAI.jsx');
let content = fs.readFileSync(agenticPath, 'utf8');

const regex = /\{\/\* ══════════════════════════════════════════\s*PRICING\s*══════════════════════════════════════════ \*\/\}\s*<section id="pricing" className="ato-sec">[\s\S]*?<\/section>/;

const newPricingAgentic = `{/* ══════════════════════════════════════════
          PRICING
          ══════════════════════════════════════════ */}
      <section id="pricing" className="ato-sec bg-[#0b0b0f] border-t border-white/10" style={{padding: '96px 24px'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto'}}>
          <div className="text-center mb-12">
            <h2 className="ato-h2 text-white" style={{marginBottom:14,marginTop:16}}>Transparent pricing. Zero surprises.</h2>
            <p className="ato-sub text-gray-400">Complete curriculum access, mentor reviews, and career support.</p>
          </div>
          <PaymentPlanWidget basePrice={91000} durationMonths={6} courseName="Agentic AI" themeColor="#7c3aed" />
        </div>
      </section>`;

if (regex.test(content)) {
  content = content.replace(regex, newPricingAgentic);
  fs.writeFileSync(agenticPath, content, 'utf8');
  console.log('Updated AgenticAndGenAI.jsx');
} else {
  console.log('Could not find pricing section in AgenticAndGenAI');
}
