const fs = require('fs');
const files = [
  'AgenticAndGenAI.jsx',
  'AIFullStack.jsx',
  'Cybersecurity.jsx',
  'DataAnalytics.jsx',
  'DataScience.jsx',
  'DigitalMarketing.jsx',
  'SoftwareDeveloper.jsx'
];
files.forEach(f => {
  const path = 'c:/Users/tarun/OneDrive/Desktop/Aiiens Campus/frontend/src/page/' + f;
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    if (!content.includes('ROI on Course')) {
        content = content.replace(/(const trustStats = \[[\s\S]*?)(];)/, '$1  { value: "10X to 20X", label: "ROI on Course" },\n$2');
        fs.writeFileSync(path, content);
        console.log('Updated ' + f);
    } else {
        console.log('Already updated ' + f);
    }
  }
});
