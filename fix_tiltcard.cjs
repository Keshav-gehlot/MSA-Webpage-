const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

// Replace opening tags
code = code.replace(/<TiltCard className="sp-tier-row sp-tier-platinum" data-open={openTiers\['platinum'\]}>/g, '<div className="sp-tier-row sp-tier-platinum" data-open={openTiers[\'platinum\']}>');
code = code.replace(/<TiltCard className="sp-tier-row sp-tier-gold" data-open={openTiers\['gold'\]}>/g, '<div className="sp-tier-row sp-tier-gold" data-open={openTiers[\'gold\']}>');
code = code.replace(/<TiltCard className="sp-tier-row sp-tier-silver" data-open={openTiers\['silver'\]}>/g, '<div className="sp-tier-row sp-tier-silver" data-open={openTiers[\'silver\']}>');
code = code.replace(/<TiltCard className="sp-tier-row sp-tier-bronze" data-open={openTiers\['bronze'\]}>/g, '<div className="sp-tier-row sp-tier-bronze" data-open={openTiers[\'bronze\']}>');

// Replace closing tags
// Let's replace the first 4 </TiltCard> tags
for(let i = 0; i < 4; i++) {
  code = code.replace('</TiltCard>', '</div>');
}

// Remove import
code = code.replace(/import { TiltCard } from '\.\.\/components\/TiltCard';\n/, '');

fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', code);
