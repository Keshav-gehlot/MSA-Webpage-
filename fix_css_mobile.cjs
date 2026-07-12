const fs = require('fs');
let css = fs.readFileSync('src/pages/sponsors.css', 'utf8');

css += `
@media (max-width: 900px) {
  .sp-tier-body {
    grid-template-rows: 1fr;
  }
  .sp-tier-toggle {
    display: none;
  }
}
`;

fs.writeFileSync('src/pages/sponsors.css', css);
