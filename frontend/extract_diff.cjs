const fs = require('fs');
const readline = require('readline');

async function extractDiff() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let inDiff = false;
  let lines = [];

  for await (const line of rl) {
    if (line.includes('The following changes were made by the multi_replace_file_content tool to: e:\\testing\\frontend\\src\\Components\\PremiumCourseLayout.jsx')) {
      try {
        const obj = JSON.parse(line);
        if (obj.content) {
           const split = obj.content.split('\\n');
           // or if it's already a string, split by newline
           const strLines = obj.content.split(/\r?\n/);
           
           for (let l of strLines) {
              if (l.includes('[diff_block_start]')) {
                 inDiff = true;
                 continue;
              }
              if (l.includes('[diff_block_end]')) {
                 inDiff = false;
              }
              if (inDiff) {
                 if (l.startsWith('-')) {
                    // This line was deleted, so we want it back!
                    lines.push(l.substring(1));
                 } else if (l.startsWith(' ')) {
                    // This line was kept, so we want it!
                    lines.push(l.substring(1));
                 }
              }
           }
        }
      } catch(e) {}
    }
  }
  
  if (lines.length > 0) {
    fs.writeFileSync('RecoveredFromDiff.jsx', lines.join('\n'));
    console.log('Recovered ' + lines.length + ' lines from diff!');
  } else {
    console.log('Diff not found.');
  }
}

extractDiff();
