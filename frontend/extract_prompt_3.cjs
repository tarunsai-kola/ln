const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('const trustStats = [') && line.includes('VLSI')) {
       try {
         const obj = JSON.parse(line);
         if (obj.content && obj.type === "USER_INPUT") {
             const content = obj.content;
             const startIdx = content.indexOf("import");
             if (startIdx !== -1) {
                // Find where the code ends or just take all of it
                const endIdx = content.indexOf("</USER_REQUEST>");
                const code = content.substring(startIdx, endIdx !== -1 ? endIdx : undefined);
                fs.writeFileSync('VLSI_prompt_real.jsx', code);
                console.log('Recovered from transcript!');
                return;
             }
         }
       } catch(e) {}
    }
  }
  console.log('Not found.');
}

processLineByLine();
