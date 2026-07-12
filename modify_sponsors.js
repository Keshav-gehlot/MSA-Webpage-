const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

// 1. Move Why Sponsor to position 2
const whySponsorMatch = code.match(/\{\/\* WHY SPONSOR \*\/\}\s*<section id="why".*?<\/section>/s);
if (whySponsorMatch) {
  code = code.replace(whySponsorMatch[0], '');
  code = code.replace('{/* ABOUT US */}', whySponsorMatch[0] + '\n\n        {/* ABOUT US */}');
}

// 2. Move Past Sponsors to position 3
const pastSponsorsMatch = code.match(/\{\/\* PAST SPONSORS \*\/\}\s*<section id="past-sponsors".*?<\/section>/s);
if (pastSponsorsMatch) {
  code = code.replace(pastSponsorsMatch[0], '');
  code = code.replace('{/* ABOUT US */}', pastSponsorsMatch[0] + '\n\n        {/* ABOUT US */}');
}

// 3. Move Tiers and Compare to position 4 & 5
const tiersMatch = code.match(/\{\/\* TIERS \*\/\}\s*<section id="tiers".*?<\/section>\s*\{\/\* COMPARE \*\/\}\s*<section id="compare".*?<\/section>/s);
if (tiersMatch) {
  code = code.replace(tiersMatch[0], '');
  code = code.replace('{/* ABOUT US */}', tiersMatch[0] + '\n\n        {/* ABOUT US */}');
}

// 4. Update the section numbering based on new order
// Let's do it manually via a simple regex replace if possible, but let's just rewrite the data-close tags.

fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', code);
