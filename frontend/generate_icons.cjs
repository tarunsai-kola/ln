const fs = require('fs');

const tools = [
  { name: 'verilog', color: '#3182CE', text: 'V' },
  { name: 'systemverilog', color: '#DD6B20', text: 'SV' },
  { name: 'cadence', color: '#E53E3E', text: 'Cd' },
  { name: 'synopsys', color: '#805AD5', text: 'Sy' },
  { name: 'modelsim', color: '#38A169', text: 'Ms' },
  { name: 'xilinx', color: '#D69E2E', text: 'X' },
  { name: 'uvm', color: '#319795', text: 'U' }
];

if (!fs.existsSync('public/icons')) {
  fs.mkdirSync('public/icons', { recursive: true });
}

tools.forEach(t => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="${t.color}"/>
  <text x="50" y="55" font-family="sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${t.text}</text>
</svg>`;
  fs.writeFileSync(`public/icons/${t.name}.svg`, svg);
});
console.log('SVGs generated!');
