const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

// Replace terminal log items
code = code.replace(/'event::hackmsa registration \+1'/, "'event::resonate registration +1'");
code = code.replace(/'db::query resumebook\.select 12rows'/, "'db::query resumebook.select 12rows'");

fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', code);
