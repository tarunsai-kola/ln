const fs = require('fs');
const path = require('path');

const filesToFix = [
  'frontend/src/page/SoftwareDeveloper.jsx',
  'frontend/src/page/DataScience.jsx',
  'frontend/FRONTEND/src/page/DataScience.jsx',
  'frontend/src/page/DataAnalytics.jsx',
  'frontend/FRONTEND/src/page/DataAnalytics.jsx',
  'frontend/src/page/Cybersecurity.jsx',
  'frontend/FRONTEND/src/page/Cybersecurity.jsx',
  'frontend/src/page/DigitalMarketing.jsx',
  'frontend/FRONTEND/src/page/DigitalMarketing.jsx'
];

const targetStr = "              <h2 className=\"text-3xl md:text-[44px] font-black sd-font-outfit text-white tracking-tight\">\n                Production Capstones\n          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">";

const replaceStr = "              <h2 className=\"text-3xl md:text-[44px] font-black sd-font-outfit text-white tracking-tight\">\n                Production Capstones\n              </h2>\n            </div>\n          </div>\n          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">";

filesToFix.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(targetStr)) {
      content = content.replace(targetStr, replaceStr);
      fs.writeFileSync(filePath, content);
      console.log("Fixed " + file);
    } else {
      console.log("String not found in " + file);
    }
  } else {
    console.log("File not found: " + file);
  }
});
