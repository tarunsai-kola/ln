const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'frontend'),
  path.join(__dirname, 'backend'),
];

const extensionsToProcess = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.md', '.cjs', '.mjs'];
const excludeDirs = ['node_modules', 'dist', 'build', '.git'];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Cleanup spaces in identifiers created by previous replacement
  newContent = newContent.replace(/Accenlearn CampusAuth/g, 'AccenlearnCampusAuth');
  newContent = newContent.replace(/Accenlearn Campus_progress/g, 'AccenlearnCampus_progress');
  newContent = newContent.replace(/Accenlearn CampusLogo/g, 'AccenlearnCampusLogo');
  newContent = newContent.replace(/LandingWhyAccenlearn Campus/g, 'LandingWhyAccenlearnCampus');
  newContent = newContent.replace(/Accenlearn CampusM@123/g, 'AccenlearnCampusM@123');
  newContent = newContent.replace(/meta_Accenlearn Campus_/g, 'meta_AccenlearnCampus_');
  newContent = newContent.replace(/Accenlearn Campus_call_recordings/g, 'AccenlearnCampus_call_recordings');
  newContent = newContent.replace(/@Accenlearn CampusSolutions/g, '@AccenlearnCampusSolutions');
  newContent = newContent.replace(/ACCENLEARN CAMPUS24/g, 'ACCENLEARNCAMPUS24');
  newContent = newContent.replace(/ACCENLEARN CAMPUS_SECRET/g, 'ACCENLEARNCAMPUS_SECRET');

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (excludeDirs.includes(file)) continue;

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensionsToProcess.includes(ext) || file === '.env') {
        processFile(filePath);
      }
    }
  }
}

targetDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`Processing directory: ${dir}`);
    walkDir(dir);
  }
});
console.log('Cleanup completed successfully!');
