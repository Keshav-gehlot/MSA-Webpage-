const fs = require('fs');
let css = fs.readFileSync('src/pages/sponsors.css', 'utf8');

css = css.replace(/\.sp-tier-oneliner \{ font-size: 14px; color: var\(--color-text-dim\); max-width: 340px; \}/g, 
`.sp-tier-info {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}
.sp-tier-oneliner { font-size: 14px; color: var(--color-text-dim); max-width: 340px; }
@media (max-width: 900px) {
  .sp-tier-info { flex-direction: column; align-items: flex-start; gap: 8px; }
  .sp-tier-oneliner { max-width: none; }
}`);

fs.writeFileSync('src/pages/sponsors.css', css);
