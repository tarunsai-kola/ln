const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  
  let chunks = {};

  for await (const line of rl) {
    if (line.includes('"name":"view_file"') && line.includes('VLSI.jsx') && !line.includes('VLSI.css')) {
       // Look for the tool response for this tool call.
       // Actually, the tool response is in the NEXT line or so.
    }
    
    if (line.includes('The following code has been modified to include a line number before every line') && line.includes('File Path: `file:///e:/testing/frontend/src/page/VLSI.jsx`')) {
       try {
         const obj = JSON.parse(line);
         if (obj.content) {
             const lines = obj.content.split('\n');
             let isCode = false;
             for (let l of lines) {
                if (l.startsWith('The following code has been modified')) {
                   isCode = true;
                   continue;
                }
                if (l.startsWith('The above content does NOT show')) {
                   isCode = false;
                }
                if (l.startsWith('The above content shows the entire')) {
                   isCode = false;
                }
                
                if (isCode) {
                   const match = l.match(/^(\d+):\s(.*)$/);
                   if (match) {
                      chunks[parseInt(match[1])] = match[2];
                   }
                }
             }
         }
       } catch(e) {}
    }
  }

  const sortedLines = Object.keys(chunks).sort((a,b) => parseInt(a) - parseInt(b));
  let fullFile = '';
  for (let i of sortedLines) {
     fullFile += chunks[i] + '\n';
  }

  fs.writeFileSync('VLSI_reconstructed.jsx', fullFile);
  console.log('Reconstructed VLSI.jsx from view_file logs. Total lines:', sortedLines.length);
}

processLineByLine();
