const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"type":"USER_INPUT"') && line.includes('import PaymentPlanWidget')) {
       try {
         const obj = JSON.parse(line);
         if (obj.content && obj.content.includes('const VLSI = () => {')) {
             // Extract the code between the backticks or just the raw text
             const content = obj.content;
             const startIdx = content.indexOf("import PaymentPlanWidget");
             if (startIdx !== -1) {
                const code = content.substring(startIdx);
                fs.writeFileSync('VLSI_prompt_recovered.jsx', code);
                console.log('Recovered from USER_INPUT!');
                return;
             }
         }
       } catch(e) {}
    }
  }
  console.log('Not found in USER_INPUT.');
}

processLineByLine();
