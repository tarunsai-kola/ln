const fs = require('fs');

let widget = fs.readFileSync('./src/Components/PaymentPlanWidget.jsx', 'utf8');
widget = widget.replace(/const PaymentPlanWidget = \(\{ basePrice, courseName, durationMonths = 6 \}\) => \{/, 'const PaymentPlanWidget = ({ basePrice, courseName, durationMonths = 6, themeColor = "#0066b2" }) => {');
widget = widget.replace(/<PaymentPlanPopup\s*([^>]+)\/>/s, '<PaymentPlanPopup $1 themeColor={themeColor} />');
widget = widget.replace(/color: 'var\(--green, #0066b2\)'/g, 'color: themeColor');
widget = widget.replace(/backgroundColor: 'var\(--green, #0066b2\)'/g, 'backgroundColor: themeColor');
widget = widget.replace(/#0066b2/g, '${themeColor}');
fs.writeFileSync('./src/Components/PaymentPlanWidget.jsx', widget);

let popup = fs.readFileSync('./src/Components/PaymentPlanPopup.jsx', 'utf8');
popup = popup.replace(/const PaymentPlanPopup = \(\{ isOpen, onClose, basePrice, durationMonths, courseName \}\) => \{/, 'const PaymentPlanPopup = ({ isOpen, onClose, basePrice, durationMonths, courseName, themeColor = "#0066b2" }) => {');
popup = popup.replace(/bg-\[#0066b2\]/g, 'bg-[var(--theme-color)]');
popup = popup.replace(/text-\[#0066b2\]/g, 'text-[var(--theme-color)]');
popup = popup.replace(/border-\[#0066b2\]/g, 'border-[var(--theme-color)]');
popup = popup.replace(/bg-blue-50/g, 'bg-slate-100'); // neutralize blue bg
// We must inject a style object to handle dynamic tailwind colors since Tailwind doesn't compile arbitrary dynamic values easily.
// Actually, setting a CSS variable is easier for Tailwind! 
popup = popup.replace(/<div className="fixed inset-0/, '<div style={{"--theme-color": themeColor}} className="fixed inset-0');
fs.writeFileSync('./src/Components/PaymentPlanPopup.jsx', popup);

console.log('Fixed themes');
