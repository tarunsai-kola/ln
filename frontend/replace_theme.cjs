const fs = require('fs');

const file = 'e:/acc/frontend/src/page/AdvanceDashboardAccess.jsx';
let content = fs.readFileSync(file, 'utf8');

// Modal changes
content = content.replace('bg-[#111217] border border-gray-700', 'bg-white border border-slate-200');
content = content.replace('text-gray-200', 'text-slate-700');
content = content.replace('text-white', 'text-slate-800'); // Modal title "Thank you for registration!"
content = content.replace('text-gray-300', 'text-slate-600'); // Modal desc

// Main container
content = content.replace('bg-[#0B0C10] flex items-center', 'bg-[#f8fafc] flex items-center');
content = content.replace('bg-[#13151A] rounded-2xl shadow-xl border border-gray-800 p-8 md:p-10 text-gray-300', 'bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 text-slate-700');

// Inputs and Labels
content = content.split('bg-[#0B0C10] border border-gray-700').join('bg-slate-50 border border-slate-200 text-slate-800');
content = content.split('text-gray-400').join('text-slate-500');
content = content.split('focus:border-blue-500').join('focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10');
content = content.split('text-gray-300 block mb-1').join('text-slate-700 block mb-1');
content = content.split('text-gray-500 mb-3').join('text-slate-500 mb-3');

// Specific inputs
content = content.split('bg-[#0B0C10] border border-orange-500').join('bg-orange-50 border border-orange-200 text-slate-800');

// Button
content = content.split('bg-[#1E3A8A] hover:bg-[#2563EB]').join('bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200');

// Additional adjustments
content = content.split('text-gray-500').join('text-slate-500'); // for refer a friend label if missed

fs.writeFileSync(file, content);
console.log('Theme changed to white successfully.');
