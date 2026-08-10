const fs = require('fs');
const path = require('path');

const targetFiles = [
  'frontend/src/page/landing.jsx',
  'frontend/src/Components/LandingWhyAccenlearnCampus.jsx',
  'frontend/src/Components/LandingWhoIsThisFor.jsx',
  'frontend/src/Components/LandingCurriculum.jsx',
  'frontend/src/Components/LandingMentors.jsx',
  'frontend/src/Components/LandingPlacementProcess.jsx',
  'frontend/src/Components/LandingPricing.jsx',
  'frontend/src/Components/LandingAdmissionsFlow.jsx',
  'frontend/src/Components/LandingFAQ.jsx',
  'frontend/src/Components/LandingCTA.jsx',
  'frontend/src/Components/Header.jsx',
  'frontend/src/Components/Footer.jsx'
];

function polishTheme(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Fix typos
  content = content.replace(/bg-white0/g, 'bg-white');
  content = content.replace(/bg-white\/90/g, 'bg-white');
  content = content.replace(/hover:border-white\/30/g, 'hover:border-[#2563EB]');
  content = content.replace(/border-white\/30/g, 'border-[#E2E8F0]');
  
  // Specific inline style fixes
  content = content.replace(/color:\s*['"]#94a3b8['"]/g, 'color: "#475569"');
  content = content.replace(/color:\s*['"]#4B5563['"]/g, 'color: "#475569"');
  
  // Secondary button fix (from Schedule Consultation)
  // Find border-[#E2E8F0] ... hover:bg-[#F8FAFC] ... 
  content = content.replace(/border-\[\#E2E8F0\] glass-panel-3d text-\[\#0F172A\] hover:bg-\[\#F8FAFC\] hover:border-\[\#2563EB\]/g, 'border-[#2563EB] bg-white text-[#2563EB] hover:bg-[#EFF6FF] hover:border-[#1D4ED8] hover:text-[#1D4ED8]');

  // Ensure body text is #475569, muted is #64748B
  content = content.replace(/text-\[\#94a3b8\]/g, 'text-[#64748B]');
  content = content.replace(/text-\[\#6B7280\]/g, 'text-[#475569]');
  content = content.replace(/text-gray-500/g, 'text-[#64748B]');
  content = content.replace(/text-gray-400/g, 'text-[#64748B]');
  content = content.replace(/text-gray-300/g, 'text-[#475569]');
  
  // Clean up any remaining dark colors
  content = content.replace(/from-\[\#020617\]/g, 'from-[#F8FAFC]');
  content = content.replace(/to-\[\#020617\]/g, 'to-[#F8FAFC]');
  content = content.replace(/bg-\[\#020202\]/g, 'bg-[#F8FAFC]');
  content = content.replace(/bg-\[\#020408\]/g, 'bg-[#EFF6FF]');
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Polished: ${filePath}`);
  }
}

targetFiles.forEach(polishTheme);
console.log('Polishing completed.');
