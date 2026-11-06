const fs = require('fs');
const content = fs.readFileSync('e:/acc/accenlearn-website-main/src/shared/workshopContent.js', 'utf8');
const images = {
  "Artificial Intelligence": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
  "DevOps": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop",
  "Medical Coding": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop",
  "Psychology": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop",
  "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
  "Full Stack Software Development": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
  "Digital Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
  "Machine Learning": "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2000&auto=format&fit=crop",
  "Data Analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
  "Cloud Computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  "Cyber Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
  "Data Structures and Algorithms": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000&auto=format&fit=crop",
  "SQL": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2000&auto=format&fit=crop",
  "Human Resource": "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
  "Finance": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop",
  "Stock Market": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop",
  "Business Analytics": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
  "Graphics Designing": "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop"
};

let newContent = content;
for (const [key, value] of Object.entries(images)) {
  newContent = newContent.replace(new RegExp(`  "${key}": \\{\\s*title: "${key}",`), `  "${key}": {\n    title: "${key}",\n    heroImage: "${value}",`);
}
fs.writeFileSync('e:/acc/accenlearn-website-main/src/shared/workshopContent.js', newContent);
console.log('Images added successfully.');
