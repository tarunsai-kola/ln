const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'page');
const filesToUpdate = [
  { file: 'DataScience.jsx', color: '#eab308', name: 'Data Science', bg: '#050505', price: 91000, duration: 6 },
  { file: 'DataAnalytics.jsx', color: '#0ea5e9', name: 'Data Analytics', bg: '#030712', price: 91000, duration: 6 },
  { file: 'DigitalMarketing.jsx', color: '#f59e0b', name: 'Digital Marketing', bg: '#0f0600', price: 91000, duration: 6 },
  { file: 'Cybersecurity.jsx', color: '#e11d48', name: 'Cybersecurity', bg: '#020408', price: 91000, duration: 6 },
  { file: 'AIFullStack.jsx', color: '#10b981', name: 'AI Full Stack', bg: '#0a0a0a', price: 91000, duration: 6 },
];

function updatePricingSection(filePath, theme) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if missing
  if (!content.includes('PaymentPlanWidget')) {
    // find a good place for import, usually right after React imports
    content = content.replace(/(import React.*?;\n)/, `$1import PaymentPlanWidget from "../Components/PaymentPlanWidget";\n`);
    if (!content.includes('PaymentPlanWidget')) {
      content = `import PaymentPlanWidget from "../Components/PaymentPlanWidget";\n` + content;
    }
  }

  // Replace pricing section
  const oldPricingRegex = /\{\/\*\s*PRICING\s*\*\/\}\s*<section[\s\S]*?<\/section>/;
  const newPricing = `{/* PRICING */}
      <section className="py-24 px-6 bg-[${theme.bg}] border-t border-white/5" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[${theme.color}]/15 text-[${theme.color}] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Pricing & Financing
            </span>
            <h2 className="text-3xl md:text-[44px] font-black text-white tracking-tight mb-3">
              Invest in your future
            </h2>
            <p className="text-gray-400 text-lg">Transparent pricing. Flexible payment options.</p>
          </div>
          <PaymentPlanWidget basePrice={${theme.price}} durationMonths={${theme.duration}} courseName="${theme.name}" themeColor="${theme.color}" />
        </div>
      </section>`;

  if (oldPricingRegex.test(content)) {
    content = content.replace(oldPricingRegex, newPricing);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Could not find pricing section in ${filePath}`);
  }
}

filesToUpdate.forEach(f => {
  const p = path.join(targetDir, f.file);
  if (fs.existsSync(p)) {
    updatePricingSection(p, f);
  } else {
    console.log(`File not found: ${p}`);
  }
});

// Also check AgenticAndGenAI.jsx, it has a different structure, let's fix it manually or via a separate regex.
const agenticPath = path.join(targetDir, 'AgenticAndGenAI.jsx');
if (fs.existsSync(agenticPath)) {
  let content = fs.readFileSync(agenticPath, 'utf8');
  if (!content.includes('PaymentPlanWidget')) {
    content = `import PaymentPlanWidget from "../Components/PaymentPlanWidget";\n` + content;
  }
  const oldPricingAgenticRegex = /\{\/\*\s*PRICING\s*\*\/\}\s*<section[\s\S]*?<\/section>/;
  const newPricingAgentic = `{/* PRICING */}
      <section id="pricing" className="ato-sec bg-[#0b0b0f] border-t border-white/10" style={{padding: '96px 24px'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto'}}>
          <div className="text-center mb-12">
            <h2 className="ato-h2 text-white" style={{marginBottom:14,marginTop:16}}>Transparent pricing. Zero surprises.</h2>
            <p className="ato-sub text-gray-400">Complete curriculum access, mentor reviews, and career support.</p>
          </div>
          <PaymentPlanWidget basePrice={91000} durationMonths={6} courseName="Agentic AI" themeColor="#7c3aed" />
        </div>
      </section>`;
  if (oldPricingAgenticRegex.test(content)) {
    content = content.replace(oldPricingAgenticRegex, newPricingAgentic);
    fs.writeFileSync(agenticPath, content, 'utf8');
    console.log(`Updated ${agenticPath}`);
  } else {
    // Agentic has PRICING written differently? Let's check view_file earlier.
    console.log(`Could not find PRICING in ${agenticPath}`);
  }
}
