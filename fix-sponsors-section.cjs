const fs = require('fs');
let code = fs.readFileSync('src/components/SponsorSection.tsx', 'utf8');

const toKebab = (str) => str.toLowerCase().replace(/[\s\.]+/g, '-').replace(/^-|-$/g, '').replace(/[^a-z0-9-]/g, '');

const sponsors = [
  "GitHub", "Microsoft", "HackerEarth", "Azure", "Zebronics", "Bitgrit",
  "Bewakoof", "The Souled Store", "Subway", "Monster Energy", "Roll Over Ice Creams",
  "Sunschool", "Forech", "Streams", "Rock N Roll Café", ".xyz", "CodeSizzler",
  "Altruisty", "Interview Cake"
];

let newSponsorsString = "const sponsors = [\n" + sponsors.map(name => {
  return `    { name: "${name}", logo: "/sponsors/${toKebab(name)}.svg" }`;
}).join(",\n") + "\n  ];";

code = code.replace(/const sponsors = \[[\s\S]*?\];/, newSponsorsString);

// Also need to find MLSA SRM
code = code.replace(/MLSA SRM/g, "MSA SRM");

fs.writeFileSync('src/components/SponsorSection.tsx', code);
console.log("Done");
