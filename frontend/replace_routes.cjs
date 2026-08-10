const fs = require('fs');

const replaceInFile = (file, oldStr1, oldStr2, newStr) => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.split(oldStr1).join(newStr);
    content = content.split(oldStr2).join(newStr);
    fs.writeFileSync(file, content);
};

replaceInFile('e:/acc/frontend/src/App.jsx', '"/AdvTeamLogin"', '"/advteamlogin"', '"/employlogin"');
replaceInFile('e:/acc/frontend/src/axiosConfig.jsx', '"/AdvTeamLogin"', '"/advteamlogin"', '"/employlogin"');
replaceInFile('e:/acc/frontend/src/AdvTeam/AdvTeamHeader.jsx', '"/AdvTeamLogin"', '"/advteamlogin"', '"/employlogin"');
console.log('Routes replaced successfully.');
