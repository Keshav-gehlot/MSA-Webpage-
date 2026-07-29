const fs = require('fs');
const si = require('simple-icons');

const sponsors = [
  "GitHub", "Microsoft", "HackerEarth", "Azure", "Zebronics", "Bitgrit",
  "Bewakoof", "The Souled Store", "Subway", "Monster Energy", "Roll Over Ice Creams",
  "Sunschool", "Forech", "Streams", "Rock N Roll Café", ".xyz", "CodeSizzler",
  "Altruisty", "Interview Cake"
];

const toKebab = (str) => str.toLowerCase().replace(/[\s\.]+/g, '-').replace(/^-|-$/g, '').replace(/[^a-z0-9-]/g, '');

for (const name of sponsors) {
  const kebab = toKebab(name);
  if (kebab === 'github' || kebab === 'hackerearth' || kebab === 'microsoft') continue;

  let initials = name.split(/[\s\.]+/).filter(w => w.length > 0).map(w => w[0].toUpperCase()).slice(0, 2).join('');
  if (name === ".xyz") initials = "XYZ";
  if (name === "CodeSizzler") initials = "CS";
  if (name === "Bitgrit") initials = "BG";

  let svgContent = `<svg fill="#ffffff" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#ffffff" fill-opacity="0.1"/>
      <style>
        .sponsor-initials {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-weight: 700;
          font-size: 40px;
          letter-spacing: 0.05em;
          text-anchor: middle;
          dominant-baseline: central;
          fill: #ffffff;
        }
      </style>
      <text x="50" y="52" class="sponsor-initials">${initials}</text>
    </svg>`;

  fs.writeFileSync('public/sponsors/' + kebab + '.svg', svgContent);
}
console.log("Done");
