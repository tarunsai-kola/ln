const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('const PremiumCourseLayout = ({ data }) => {') && line.includes('Hero Section')) {
      // Just write the raw line to a file
      fs.writeFileSync('Found_Layout_Line.txt', line);
      console.log('Found it!');
      return;
    }
  }
  
  // fallback search
  const fileStream2 = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl2 = readline.createInterface({ input: fileStream2, crlfDelay: Infinity });
  
  for await (const line of rl2) {
    if (line.includes('const VLSI = () => {') && line.includes('Hero Section')) {
      fs.writeFileSync('Found_VLSI_Line.txt', line);
      console.log('Found VLSI!');
      return;
    }
  }
  console.log('Not found.');
}

processLineByLine();
