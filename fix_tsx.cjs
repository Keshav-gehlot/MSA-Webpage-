const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

// Wrap title and oneliner in sp-tier-info
code = code.replace(/<div className="sp-tier-title-block">\s*<span className="sp-tier-name (.*?)">(.*?)<\/span>\s*<\/div>\s*<div className="sp-tier-oneliner">(.*?)<\/div>/g, 
`<div className="sp-tier-info">
                      <div className="sp-tier-title-block">
                        <span className="sp-tier-name $1">$2</span>
                      </div>
                      <div className="sp-tier-oneliner">$3</div>
                    </div>`);

// Replace the sp-tier-inner with a wrapper for grid animation
// In SponsorsAccessPage.tsx, the body is currently:
// <div className="sp-tier-body" style={{ maxHeight: openTiers['platinum'] ? '800px' : '0' }}>
//   <div className="sp-tier-body-inner">...</div>
// </div>
code = code.replace(/<div className="sp-tier-body" style={{ maxHeight: openTiers\['.*?'\] \? '800px' : '0' }}>/g, '<div className="sp-tier-body">');
code = code.replace(/<div className="sp-tier-body-inner">/g, '<div className="sp-tier-body-inner-wrapper">\n                    <div className="sp-tier-body-inner">');
code = code.replace(/<\/a>\s*<\/div>\s*<\/div>\s*<\/div>/g, '</a>\n                    </div>\n                  </div>\n                  </div>\n                </div>');

// Ensure pricing tiers are clearly visible on mobile without needing manual expansion.
// Maybe that means all tiers should default to true on mount? Or just not be accordions on mobile?
// Let's remove the dummy logos from Trust section
const trustRegex = /<div className="sp-sponsor-wall">.*?<\/div>/s;
code = code.replace(trustRegex, `<div className="sp-sponsor-wall text-center">
              <p className="text-xl text-text-dim">Proudly partnered with over 15+ industry leaders across technology, lifestyle, and education.</p>
            </div>`);

fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', code);
