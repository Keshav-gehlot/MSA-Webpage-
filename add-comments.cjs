const fs = require('fs');
let code = fs.readFileSync('src/data/sponsors.ts', 'utf8');

code = `// NOTE: Logos for Microsoft, GitHub, and HackerEarth were sourced.
// For the remaining local/smaller sponsors (Azure, Zebronics, Bitgrit, Bewakoof, The Souled Store, Subway,
// Monster Energy, Roll Over Ice Creams, Sunschool, Forech, Streams, Rock N Roll Café, .xyz, CodeSizzler,
// Altruisty, Interview Cake), a styled SVG initials fallback was generated as requested.
// These fallbacks can be replaced with real logos in public/sponsors/ when available.

` + code;

fs.writeFileSync('src/data/sponsors.ts', code);
