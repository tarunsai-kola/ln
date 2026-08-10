const fs = require('fs');

// 1. Update PaymentPlanWidget.jsx
let widget = fs.readFileSync('./src/Components/PaymentPlanWidget.jsx', 'utf8');
widget = widget.replace(/const PaymentPlanWidget = \(\{ basePrice, durationMonths = 6, courseName = '' \}\) => \{/, 'const PaymentPlanWidget = ({ basePrice, durationMonths = 6, courseName = "", themeColor = "#0066b2" }) => {');

// We need to pass themeColor to the Popup
widget = widget.replace(/<PaymentPlanPopup([^>]+)\/>/, '<PaymentPlanPopup$1 themeColor={themeColor} />');

// Replace specific styles where #0066b2 is used
widget = widget.replace(/background: '#0066b2'/g, 'background: themeColor');
widget = widget.replace(/boxShadow: '0 8px 25px -8px rgba\\(0, 102, 178, 0\\.5\\)'/g, 'boxShadow: `0 8px 25px -8px ${themeColor}80`');
widget = widget.replace(/color: '#0066b2'/g, 'color: themeColor');

fs.writeFileSync('./src/Components/PaymentPlanWidget.jsx', widget);

// 2. Update PaymentPlanPopup.jsx
let popup = fs.readFileSync('./src/Components/PaymentPlanPopup.jsx', 'utf8');
popup = popup.replace(/const PaymentPlanPopup = \(\{ isOpen, onClose, basePrice, durationMonths, courseName \}\) => \{/, 'const PaymentPlanPopup = ({ isOpen, onClose, basePrice, durationMonths, courseName, themeColor = "#0066b2" }) => {');

// Replace specific styles where #0066b2 is used
popup = popup.replace(/background: '#0066b2'/g, 'background: themeColor');
popup = popup.replace(/color: '#0066b2'/g, 'color: themeColor');

fs.writeFileSync('./src/Components/PaymentPlanPopup.jsx', popup);

// 3. Update the root course files
const dir = './src/page/';
const filesToUpdate = ['DataScience.jsx', 'DigitalMarketing.jsx', 'DataAnalytics.jsx', 'AIFullStack.jsx', 'SoftwareDeveloper.jsx', 'AgenticAndGenAI.jsx', 'Cybersecurity.jsx'];

const themeColors = {
  'DataScience.jsx': '#eab308',
  'DigitalMarketing.jsx': '#fbbf24',
  'DataAnalytics.jsx': '#06b6d4',
  'AIFullStack.jsx': '#1e293b', // Dark slate instead of white for the button
  'SoftwareDeveloper.jsx': '#6366f1',
  'AgenticAndGenAI.jsx': '#10b981',
  'Cybersecurity.jsx': '#e11d48'
};

filesToUpdate.forEach(file => {
  if (fs.existsSync(dir + file)) {
    let content = fs.readFileSync(dir + file, 'utf8');
    const color = themeColors[file];
    
    // Add themeColor prop to PaymentPlanWidget if not present
    if (color && !content.includes('themeColor="')) {
      content = content.replace(/(<PaymentPlanWidget[^>]*?)( \/>)/g, `$1 themeColor="${color}"$2`);
      fs.writeFileSync(dir + file, content);
      console.log('Updated theme in ' + file);
    }
  }
});
