const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

if (!code.includes('import { sponsors }')) {
  code = `import { sponsors } from '../data/sponsors';\n` + code;
  fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', code);
}
