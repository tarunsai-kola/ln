const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Move <Route path="*" element={<PageNotFound />} /> to the bottom of <Routes>
const routeStarMatch = content.match(/<Route path="\*" element={<PageNotFound \/>} \/>/);
if (routeStarMatch) {
  content = content.replace(/<Route path="\*" element={<PageNotFound \/>} \/>\s*/, '');
  content = content.replace(/(<\/Routes>)/, `  <Route path="*" element={<PageNotFound />} />\n      $1`);
}

// 2. Add new paths to headerPaths
const newPaths = [
  '"/aiml"', '"/cybersecurity"', '"/cloudcomputing"', '"/iotrobotics"', 
  '"/devops"', '"/embeddedsystems"', '"/autocad"', '"/graphicdesign"', '"/fullstackweb"'
];

// Find headerPaths
const headerPathsRegex = /const headerPaths = \[([^\]]+)\];/;
const match = content.match(headerPathsRegex);
if (match) {
  const currentArray = match[1];
  // Avoid duplicating if already there
  let addedPaths = newPaths.filter(p => !currentArray.includes(p)).join(', ');
  if (addedPaths) {
    const newArray = currentArray + ', ' + addedPaths;
    content = content.replace(headerPathsRegex, `const headerPaths = [${newArray}];`);
  }
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('App.jsx fixed successfully!');
