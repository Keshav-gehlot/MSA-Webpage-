const fs = require('fs');
let code = fs.readFileSync('src/components/SponsorSection.tsx', 'utf8');

code = code.replace(/const sponsors = \[[\s\S]*?\];/, '');
code = code.replace(/export function SponsorSection\(\) \{/, 'import { sponsors } from "../data/sponsors";\n\nexport function SponsorSection() {');

fs.writeFileSync('src/components/SponsorSection.tsx', code);
