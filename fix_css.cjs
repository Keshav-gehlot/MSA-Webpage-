const fs = require('fs');
let css = fs.readFileSync('src/pages/sponsors.css', 'utf8');

css = css.replace(/\.sp-hero-title \.strike \{.*?\}\n/g, '');
css = css.replace(/\.sp-tier-stack \{.*?\}\n/g, '');
css = css.replace(/\.sp-tier-code \{.*?\}\n/g, '');
css = css.replace(/\.sp-final-cmd \{[\s\S]*?\}\n/g, '');
css = css.replace(/\.sp-final-cmd \.prompt \{.*?\}\n/g, '');

fs.writeFileSync('src/pages/sponsors.css', css);
