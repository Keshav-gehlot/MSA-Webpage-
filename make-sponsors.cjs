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
  if (kebab === 'github' || kebab === 'hackerearth') continue;

  let normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  let icon = null;
  const key = Object.keys(si).find(k => k.toLowerCase() === 'si' + normalized);
  if (key) icon = si[key];

  let svgContent = '';
  if (icon) {
    svgContent = `<svg fill="#ffffff" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${name}</title><path d="${icon.path}"/></svg>`;
  } else {
    // Generate styled text fallback using initials or nice wordmark
    svgContent = `<svg fill="#ffffff" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
      <style>
        .sponsor-text {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-weight: 700;
          font-size: 28px;
          letter-spacing: -0.02em;
          text-anchor: middle;
          dominant-baseline: middle;
        }
      </style>
      <text x="150" y="32" class="sponsor-text">${name}</text>
    </svg>`;
  }
  fs.writeFileSync('public/sponsors/' + kebab + '.svg', svgContent);
}
console.log("Done");
