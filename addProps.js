const fs = require('fs');
const path = require('path');

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
    content = content.replace(/<SalaryGrowth \\/>/g, '<SalaryGrowth domain="' + p.domain + '" />');
    fs.writeFileSync(filePath, content);
    console.log("Updated " + p.file);
  }
});
