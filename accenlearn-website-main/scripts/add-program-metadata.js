import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/shared/workshopContent.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Regex to match the start of each course definition in WORKSHOP_CONTENT
const regex = /^\s*"([^"]+)":\s*\{/gm;

fileContent = fileContent.replace(regex, (match, key) => {
  const slug = key.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  return `  "${key}": {
    title: "${key}",
    duration: "2–3 Months",
    brochure: "/brochures/${slug}.pdf",
    highlights: [
      "Designed for students, graduates and professionals",
      "NSDC Accredited",
      "Skill India Certified",
      "Industry Expert Trainers",
      "100+ Internship Partners"
    ],`;
});

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('Successfully updated workshopContent.js!');
