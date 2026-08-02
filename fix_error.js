import fs from 'fs';
let content = fs.readFileSync('src/providers/AppProviders.tsx', 'utf8');
content = content.replace('{error.message}', '{error instanceof Error ? error.message : String(error)}');
fs.writeFileSync('src/providers/AppProviders.tsx', content);
