const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"type":"PLANNER_RESPONSE"') && line.includes('write_to_file') && line.includes('VLSI.jsx')) {
       try {
         const obj = JSON.parse(line);
         if (obj.tool_calls) {
            for (let call of obj.tool_calls) {
               if (call.name === 'write_to_file' && call.args.TargetFile.endsWith('VLSI.jsx')) {
                  fs.writeFileSync('VLSI_planner_recovered.jsx', call.args.CodeContent);
                  console.log('Recovered from planner response!');
               }
            }
         }
       } catch(e) {}
    }
  }
}

processLineByLine();
