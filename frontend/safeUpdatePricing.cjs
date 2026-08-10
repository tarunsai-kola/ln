const fs = require('fs');
const path = require('path');
const filesToUpdate = ['DataScience.jsx', 'DigitalMarketing.jsx', 'DataAnalytics.jsx', 'AIFullStack.jsx'];
const dir = './src/page/';

filesToUpdate.forEach(file => {
  const filePath = path.join(dir, file);
  if(fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if not present
    if (!content.includes('PaymentPlanWidget')) {
      content = content.replace(/import React/, 'import PaymentPlanWidget from "../Components/PaymentPlanWidget";\nimport React');
    }
    
    // Only match the specific pricing section
    const regex = /id="pricing">[\s\S]*?<\/section>/;
    
    const courseNames = {
      'DataScience.jsx': 'Data Science & GenAI',
      'DigitalMarketing.jsx': 'Digital Marketing & AI',
      'DataAnalytics.jsx': 'Data Analytics & AI',
      'AIFullStack.jsx': 'AI-Powered Full Stack'
    };
    
    const courseName = courseNames[file];
    
    const replacement = 'id="pricing">\n        <div className="max-w-6xl mx-auto">\n          <PaymentPlanWidget basePrice={51999} durationMonths={6} courseName="' + courseName + '" />\n        </div>\n      </section>';
    
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      fs.writeFileSync(filePath, content);
      console.log('Successfully updated ' + file);
    } else {
      console.log('Regex not matched in ' + file);
    }
  }
});
