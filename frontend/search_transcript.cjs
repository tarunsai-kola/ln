const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"type":"USER_INPUT"') && line.includes('Hero Section')) {
      try {
        const obj = JSON.parse(line);
        if (obj.content && obj.content.includes('VLSI')) {
           fs.writeFileSync('Found_VLSI.txt', obj.content);
           console.log('Found it!');
           return;
        }
      } catch (e) {}
    }
  }
  console.log('Not found by Hero Section.');
}

searchTranscript();
