const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'page', 'VLSI.jsx');
const destPath = path.join(__dirname, 'src', 'Components', 'PremiumCourseLayout.jsx');

let content = fs.readFileSync(srcPath, 'utf8');

// 1. Remove the static data arrays entirely
content = content.replace(/\/\* ─── Static Data ─── \*\/[\s\S]*?(?=const VLSI = \(\) => {)/, '');

// 2. Change Component Signature
content = content.replace(/const VLSI = \(\) => {/, 'const PremiumCourseLayout = ({ data }) => {');
content = content.replace(/export default VLSI;/, 'export default PremiumCourseLayout;');

// 3. Replace Data References
content = content.replace(/careerPaths/g, 'data.careerPaths');
content = content.replace(/heroImages/g, 'data.heroImages'); // Assuming data.heroImages is passed
content = content.replace(/dsPhases/g, 'data.phases');
content = content.replace(/capstoneProjects/g, 'data.capstoneProjects');
content = content.replace(/faqData/g, 'data.faqData');
content = content.replace(/trustStats/g, 'data.trustStats');
content = content.replace(/toolsList/g, 'data.toolsList');

// 4. Replace hardcoded text with props
content = content.replace(
  /Advanced VLSI Design/g,
  '{data.heroTitle}'
);
content = content.replace(
  /Build job-ready skills in RTL Design, SystemVerilog Verification, and SoC Architecture in this intensive 20-week program\./g,
  '{data.heroSubtitle}'
);
content = content.replace(
  /Master the modern VLSI \& Semiconductor design stack/g,
  '{data.toolsSubtitle}'
);
content = content.replace(
  /A dedicated VLSI track for every stage of your career\./g,
  '{data.trackSubtitle}'
);
content = content.replace(
  /Start Your VLSI Career →/g,
  '{data.trackButtonLabel}'
);
content = content.replace(
  /VLSI Project/g,
  '{data.projectLabel || "Advanced Project"}'
);
content = content.replace(
  /<CareerOutcomes domain="VLSI" \/>/,
  '{data.careerOutcomesDomain && <CareerOutcomes domain={data.careerOutcomesDomain} />}'
);

// We need to pass heroImages correctly since they are imported at the top of PremiumCourseLayout now.
// Let's actually keep the heroImage imports, or just let data pass them.
// Let's remove heroImages array definition from the top.
content = content.replace(/const data\.heroImages = \[.*?\];/, '');
// Also remove specific heroImage imports so the component is pure
content = content.replace(/import heroDsGraphic.*?;\n/g, '');
content = content.replace(/import careerPath.*?;\n/g, '');

fs.writeFileSync(destPath, content, 'utf8');
console.log('PremiumCourseLayout.jsx generated!');
