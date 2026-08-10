const fs = require('fs');
const path = require('path');
const filesToUpdate = ['DigitalMarketing.jsx', 'DataAnalytics.jsx', 'AIFullStack.jsx'];
const dir = './src/page/';

filesToUpdate.forEach(file => {
  const filePath = path.join(dir, file);
  if(fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if not present
    if (!content.includes('PaymentPlanWidget')) {
      content = content.replace(/import React/, 'import PaymentPlanWidget from "../Components/PaymentPlanWidget";\nimport React');
    }
    
    // Replace the pricing block (flexible regex for different bg colors and classes)
    const regex = /<div className="[^"]*grid grid-cols-1 lg:grid-cols-\[1\.2fr_1fr\][^"]*">[\s\S]*?<\/div>\s*<\/div>/;
    
    const courseNames = {
      'DigitalMarketing.jsx': 'Digital Marketing & AI',
      'DataAnalytics.jsx': 'Data Analytics & AI',
      'AIFullStack.jsx': 'AI-Powered Full Stack'
    };
    
    const courseName = courseNames[file];
    
    const replacement = '<PaymentPlanWidget basePrice={51999} durationMonths={6} courseName="' + courseName + '" />\n        </div>';
    
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + file);
    } else {
      console.log('Regex not matched in ' + file);
    }
  }
});
