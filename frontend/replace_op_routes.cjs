const fs = require('fs');

const replaceInFile = (file, oldStr1, oldStr2, newStr) => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.split(oldStr1).join(newStr);
    content = content.split(oldStr2).join(newStr);
    fs.writeFileSync(file, content);
};

// First, we need to comment out or remove the old /OperationLogin route so it doesn't conflict
let appContent = fs.readFileSync('e:/acc/frontend/src/App.jsx', 'utf8');
appContent = appContent.replace('<Route path="/OperationLogin" element={<OperationLogin />} />', '{/* <Route path="/OperationLogin" element={<OperationLogin />} /> */}');
fs.writeFileSync('e:/acc/frontend/src/App.jsx', appContent);

replaceInFile('e:/acc/frontend/src/App.jsx', '"/AdvOperationLogin"', '"/advoperationlogin"', '"/operationlogin"');
replaceInFile('e:/acc/frontend/src/axiosConfig.jsx', '"/AdvOperationLogin"', '"/advoperationlogin"', '"/operationlogin"');
replaceInFile('e:/acc/frontend/src/AdvOperation/OperationHeader.jsx', '"/AdvOperationLogin"', '"/advoperationlogin"', '"/operationlogin"');
replaceInFile('e:/acc/frontend/src/AdvOperation/OperationAgainLogin.jsx', '"/AdvOperationLogin"', '"/advoperationlogin"', '"/operationlogin"');

console.log('Operation routes replaced successfully.');
