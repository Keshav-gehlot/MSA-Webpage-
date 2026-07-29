const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf8');

code = code.replace(
  /target="_blank"\s+rel="noopener noreferrer"/g,
  'target="_blank" rel="noopener noreferrer"'
);

fs.writeFileSync('src/components/ProjectsSection.tsx', code);
