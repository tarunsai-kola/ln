const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('const heroImages = [')) {
       try {
         const obj = JSON.parse(line);
         if (obj.content) {
             const content = obj.content;
             const startIdx = content.indexOf("import");
             if (startIdx !== -1) {
                const code = content.substring(startIdx, content.indexOf("</USER_REQUEST>"));
                fs.writeFileSync('VLSI_prompt_recovered.jsx', code);
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
