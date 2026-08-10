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

function convertToLightTheme(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Backgrounds - Section level (F8FAFC and EFF6FF alternating)
  content = content.replace(/bg-\[\#020202\]/g, 'bg-[#F8FAFC]');
  content = content.replace(/bg-\[\#020617\]/g, 'bg-[#F8FAFC]');
  content = content.replace(/bg-\[\#020408\]/g, 'bg-[#EFF6FF]');
  content = content.replace(/bg-slate-900/g, 'bg-white');
  content = content.replace(/bg-\[\#1e1b4b\]/g, 'bg-[#EFF6FF]');
  content = content.replace(/bg-\[\#172554\]/g, 'bg-[#EFF6FF]');
  content = content.replace(/bg-black/g, 'bg-[#F8FAFC]');

  // Cards / Glass / Surfaces
  content = content.replace(/bg-white\/5/g, 'bg-white');
  content = content.replace(/bg-white\/10/g, 'bg-[#F8FAFC]');
  content = content.replace(/bg-slate-900\/50/g, 'bg-white');
  content = content.replace(/bg-slate-800\/50/g, 'bg-white');
  content = content.replace(/bg-\[\#111111\]/g, 'bg-white');

  // Borders
  content = content.replace(/border-white\/10/g, 'border-[#E2E8F0]');
  content = content.replace(/border-white\/20/g, 'border-[#E2E8F0]');
  content = content.replace(/border-white\/5/g, 'border-[#E2E8F0]');
  content = content.replace(/border-slate-800/g, 'border-[#E2E8F0]');
  content = content.replace(/border-gray-800/g, 'border-[#E2E8F0]');

  // Typography - Headings
  content = content.replace(/text-white/g, 'text-[#0F172A]');
  content = content.replace(/text-\[\#ffffff\]/g, 'text-[#0F172A]');
  content = content.replace(/text-slate-100/g, 'text-[#0F172A]');
  content = content.replace(/text-slate-200/g, 'text-[#0F172A]');
  
  // Typography - Body
  content = content.replace(/text-gray-300/g, 'text-[#475569]');
  content = content.replace(/text-gray-400/g, 'text-[#64748B]');
  content = content.replace(/text-slate-300/g, 'text-[#475569]');
  content = content.replace(/text-slate-400/g, 'text-[#64748B]');
  content = content.replace(/text-\[\#94a3b8\]/g, 'text-[#64748B]');

  // Primary Brand Colors (Buttons, Accents)
  content = content.replace(/bg-indigo-600/g, 'bg-[#2563EB]');
  content = content.replace(/hover:bg-indigo-500/g, 'hover:bg-[#1D4ED8]');
  content = content.replace(/bg-\[\#0F7B53\]/g, 'bg-[#2563EB]');
  content = content.replace(/hover:bg-\[\#0A5A3D\]/g, 'hover:bg-[#1D4ED8]');
  
  // Text Accents (Brand)
  content = content.replace(/text-indigo-400/g, 'text-[#2563EB]');
  content = content.replace(/text-cyan-400/g, 'text-[#2563EB]');
  content = content.replace(/text-\[\#22d3ee\]/g, 'text-[#2563EB]');
  content = content.replace(/text-indigo-500/g, 'text-[#2563EB]');
  content = content.replace(/text-\[\#0F7B53\]/g, 'text-[#2563EB]');
  content = content.replace(/text-\[\#10b981\]/g, 'text-[#2563EB]');
  content = content.replace(/text-blue-400/g, 'text-[#2563EB]');

  // Glows / Gradients
  content = content.replace(/from-indigo-500\/20/g, 'from-[#DBEAFE]/50');
  content = content.replace(/from-indigo-500\/10/g, 'from-[#DBEAFE]/30');
  content = content.replace(/bg-indigo-500\/10/g, 'bg-[#DBEAFE]');
  content = content.replace(/bg-indigo-500\/20/g, 'bg-[#DBEAFE]');
  content = content.replace(/shadow-\[0_0_15px_rgba\(99,102,241,0.15\)\]/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_10px_20px_rgba\(99,102,241,0.2\)\]/g, 'shadow-md');
  content = content.replace(/hover:shadow-\[0_20px_40px_rgba\(99,102,241,0.4\)\]/g, 'hover:shadow-lg');

  // Button fixes (Primary button text needs to be white, but we just replaced text-white with text-[#0F172A])
  // We need to specifically restore text-white for buttons with bg-[#2563EB]
  content = content.replace(/bg-\[\#2563EB\] text-\[\#0F172A\]/g, 'bg-[#2563EB] text-white');
  content = content.replace(/bg-\[\#2563EB\]\s+text-\[\#0F172A\]/g, 'bg-[#2563EB] text-white');

  // Secondary Button fixes (White background, blue border, blue text)
  content = content.replace(/border-\[\#E2E8F0\] glass-panel-3d text-\[\#0F172A\] hover:bg-\[\#F8FAFC\] hover:border-\[\#E2E8F0\]/g, 'border-[#2563EB] bg-white text-[#2563EB] hover:bg-[#EFF6FF] hover:border-[#1D4ED8] hover:text-[#1D4ED8]');

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  } else {
    console.log(`No changes needed: ${filePath}`);
  }
}

targetFiles.forEach(convertToLightTheme);
console.log('Light theme conversion completed.');
