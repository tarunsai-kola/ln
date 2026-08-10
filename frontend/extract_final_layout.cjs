const fs = require('fs');

try {
  const line = fs.readFileSync('Found_Layout_Line.txt', 'utf8');
  const obj = JSON.parse(line);
  let code = '';
  
  if (obj.content) {
     const startIdx = obj.content.indexOf('import');
     const endIdx = obj.content.lastIndexOf('export default PremiumCourseLayout;');
     if (startIdx !== -1 && endIdx !== -1) {
        code = obj.content.substring(startIdx, endIdx + 'export default PremiumCourseLayout;'.length);
     } else {
        code = obj.content;
     }
  } else if (obj.tool_calls) {
     for (let call of obj.tool_calls) {
        if (call.name === 'write_to_file' || call.name === 'multi_replace_file_content') {
           if (call.args && call.args.CodeContent) {
              code = call.args.CodeContent;
           }
        }
     }
  }
  
  if (code) {
     fs.writeFileSync('src/Components/PremiumCourseLayout.jsx', code);
     console.log('Restored PremiumCourseLayout.jsx successfully!');
  } else {
     console.log('Could not extract code from line.');
  }
} catch(e) {
  console.log('Error:', e);
}
