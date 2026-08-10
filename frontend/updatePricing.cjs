const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'page', 'AdvanceCourse');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'ApplyForm.jsx' && !fs.statSync(path.join(dir, f)).isDirectory());

files.forEach(f => {
  let content = fs.readFileSync(path.join(dir, f), 'utf-8');
  
  if (!content.includes('PaymentPlanWidget')) {
    content = content.replace('import React', 'import PaymentPlanWidget from "../../Components/PaymentPlanWidget";\nimport React');
  }

  const regex = /\{\/\*\s*(?:1[0-2]\.\s*)?PRICING\s*\*\/\}\s*<section[\s\S]*?<\/section>/g;
  
  content = content.replace(regex, `{/* PRICING */}
      <section id="pricing" style={{padding: '100px 0', background: '#fff'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 24px'}}>
           <h2 style={{fontSize: '32px', fontWeight: 800, marginBottom: '16px'}}>Fees & Payment Options</h2>
           <p style={{fontSize: '17px', color: '#6B7280', marginBottom: '48px'}}>Transparent program cost with structured installment plans and financial assistance.</p>
           <PaymentPlanWidget basePrice={5199} durationMonths={3} courseName="${f.replace('.jsx', '')}" />
        </div>
      </section>`);
      
  fs.writeFileSync(path.join(dir, f), content);
});
console.log('Updated Advance Courses');
