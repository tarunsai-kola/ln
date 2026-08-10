const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'frontend'),
  path.join(__dirname, 'backend'),
];

const extensionsToProcess = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.md', '.cjs', '.mjs'];

// Folders to exclude
const excludeDirs = ['node_modules', 'dist', 'build', '.git'];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Replacements
  // Order matters: match more specific cases first
  
  // 1. Logo references
  newContent = newContent.replace(/LOGO3\.png/g, 'accenlearn_logo.jpeg');

  // 2. Company Names
  newContent = newContent.replace(/ΣXPOGRAPH/g, 'ACCENLEARN CAMPUS');
  newContent = newContent.replace(/EXPOGRAPH/g, 'ACCENLEARN CAMPUS');
  newContent = newContent.replace(/Σxpograph/g, 'Accenlearn Campus');
  newContent = newContent.replace(/Expograph/g, 'Accenlearn Campus');
  newContent = newContent.replace(/ΣxpoGraph/g, 'Accenlearn Campus');
  newContent = newContent.replace(/ExpoGraph/g, 'Accenlearn Campus');
  newContent = newContent.replace(/expograph/g, 'accenlearncampus');
  
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
  } else {
    console.warn(`Directory not found: ${dir}`);
  }
});

console.log('Global replacement completed successfully!');
