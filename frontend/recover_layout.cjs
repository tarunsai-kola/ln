const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let found = false;

  for await (const line of rl) {
    if (line.includes('const VLSI = () => {') && line.includes('PremiumCourseLayout')) {
       // Wait, no, PremiumCourseLayout didn't exist in the prompt. 
       // Just search for something unique to the original VLSI.jsx
    }
    
    // I am looking for the place where I wrote the refactored PremiumCourseLayout.jsx
    // Or where the user gave me VLSI.jsx. Let's just regex match the whole file out of a USER_INPUT or PLANNER_RESPONSE.
    if (line.includes('"type":"PLANNER_RESPONSE"') && line.includes('const PremiumCourseLayout = ({ data }) => {')) {
       try {
         const obj = JSON.parse(line);
         // Search the tool_calls for write_to_file or multi_replace_file_content that created PremiumCourseLayout.jsx
         if (obj.tool_calls) {
           for (let call of obj.tool_calls) {
             if (call.name === 'write_to_file' && call.args.TargetFile.includes('PremiumCourseLayout.jsx')) {
                fs.writeFileSync('PremiumCourseLayout_recovered.jsx', call.args.CodeContent);
                console.log('Recovered from write_to_file!');
                return;
             }
           }
         }
       } catch(e) {}
    }
  }

  // If not found in write_to_file, let's look for the original VLSI.jsx in USER_INPUT
  const fileStream2 = fs.createReadStream('C:\\Users\\tarun\\.gemini\\antigravity-ide\\brain\\49ec3691-4191-47dd-aad2-19fabcb99aef\\.system_generated\\logs\\transcript_full.jsonl');
  const rl2 = readline.createInterface({ input: fileStream2, crlfDelay: Infinity });
  
  for await (const line of rl2) {
    if (line.includes('const VLSI = () => {') && line.includes('return (')) {
       try {
         const obj = JSON.parse(line);
         if (obj.content && obj.content.includes('const VLSI = () => {')) {
            fs.writeFileSync('VLSI_original_recovered.jsx', obj.content);
            console.log('Recovered original VLSI from transcript content!');
            return;
         }
       } catch(e) {}
    }
  }
}

processLineByLine();
