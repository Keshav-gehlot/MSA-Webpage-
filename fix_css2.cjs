const fs = require('fs');
let css = fs.readFileSync('src/pages/sponsors.css', 'utf8');

// Fix sp-tier-body max-height in CSS
css = css.replace(/\.sp-tier-body \{\n  max-height: 0; overflow: hidden;\n  transition: max-height 0\.4s ease;\n  border-top: 1px solid transparent;\n\}/g, 
`.sp-tier-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border-top: 1px solid transparent;
}
.sp-tier-row[data-open="true"] .sp-tier-body {
  grid-template-rows: 1fr;
}
.sp-tier-body-inner-wrapper {
  min-height: 0;
}`);

// We will wrap sp-tier-body-inner inside sp-tier-body-inner-wrapper in JS later.

// Fix sp-tier-main layout
css = css.replace(/\.sp-tier-main \{\n  flex: 1; padding: 26px 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px;\n  flex-wrap: wrap;\n\}/g,
`.sp-tier-main {
  flex: 1; padding: 26px 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px;
}`);

// We'll also change sp-tier-oneliner CSS
css = css.replace(/\.sp-tier-oneliner \{\n  font-size: 14px; color: var\(--color-text-muted\);\n  max-width: 250px; line-height: 1\.4;\n\}/g,
`.sp-tier-info {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}
.sp-tier-oneliner {
  font-size: 14px; color: var(--color-text-muted);
  max-width: 250px; line-height: 1.4;
}
@media (max-width: 900px) {
  .sp-tier-info { flex-direction: column; align-items: flex-start; gap: 8px; }
  .sp-tier-oneliner { max-width: none; }
}`);

// Fix index font size
css = css.replace(/\.sp-tier-index \{\n  width: 90px; flex-shrink: 0;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 12px; color: var\(--sp-dim\);\n  border-right: 1px solid var\(--sp-line\);\n\}/g,
`.sp-tier-index {
  width: 100px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 500; font-family: var(--font-mono); color: var(--sp-dim); letter-spacing: 0.1em; text-transform: uppercase;
  border-right: 1px solid var(--sp-line);
}`);

fs.writeFileSync('src/pages/sponsors.css', css);
