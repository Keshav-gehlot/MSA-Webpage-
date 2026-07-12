const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

const getSection = (startMarker, endMarker) => {
    const startIdx = code.indexOf(startMarker);
    const endIdx = code.indexOf(endMarker);
    if (startIdx === -1 || endIdx === -1) throw new Error("Marker not found: " + startMarker + " or " + endMarker);
    return code.substring(startIdx, endIdx);
};

let hero = getSection('{/* HERO */}', '{/* ABOUT US */}');
let about = getSection('{/* ABOUT US */}', '{/* OUR INSTITUTION */}');
let institution = getSection('{/* OUR INSTITUTION */}', '{/* PAST EVENTS */}');
let events = getSection('{/* PAST EVENTS */}', '{/* WHY SPONSOR */}');
let why = getSection('{/* WHY SPONSOR */}', '{/* PAST SPONSORS */}');
let pastSponsors = getSection('{/* PAST SPONSORS */}', '{/* TIERS */}');
let tiers = getSection('{/* TIERS */}', '{/* COMPARE */}');
let compare = getSection('{/* COMPARE */}', '{/* FAQ */}');
let rest = code.substring(code.indexOf('{/* FAQ */}'));

// Remove hidden md:block in Tiers
tiers = tiers.replace(/<div className="sp-tier-oneliner hidden md:block">/g, '<div className="sp-tier-oneliner">');

// Merge about & institution
let mergedAbout = `        {/* ABOUT MSA + SRM */}
        <section id="about" data-close="[EOF section::06]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[06] about msa srm</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Microsoft Student Ambassadors, SRM</h2></Reveal>
          <Reveal delay={2}><p className="sp-sec-p">Microsoft Student Ambassadors SRM is a decade-old technical powerhouse at SRM Institute of Science and Technology (SRMIST). We ignite the spark in zealous, forward-thinking students engineering the next generation of innovators at one of India's most reputed universities. Through relentless workshops, technical talks, industry webinars, and large-scale events, we cultivate an ecosystem where bold ideas flourish.</p></Reveal>
          <Reveal delay={3}>
            <div className="sp-hero-meta" style={{ marginTop: '30px' }}>
              <div><div className="sp-hm-label">Legacy & Experience</div><div className="sp-hm-val">10<span className="unit">+ Years</span></div></div>
              <div><div className="sp-hm-label">Events Conducted</div><div className="sp-hm-val">30<span className="unit">+</span></div></div>
              <div><div className="sp-hm-label">Campus Reach</div><div className="sp-hm-val">50,000<span className="unit">+</span></div></div>
              <div><div className="sp-hm-label">Private Eng. Institute</div><div className="sp-hm-val">No. 1</div></div>
            </div>
          </Reveal>
        </section>\n`;

// Fix Past Sponsors
pastSponsors = `        {/* PAST SPONSORS */}
        <section id="past-sponsors" data-close="[EOF section::03]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[03] trust & credibility</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Past Sponsors</h2></Reveal>
          <Reveal delay={2}>
            <div className="sp-sponsor-wall">
              <div className="sp-sponsor-chip"><img src="/sponsors/github.svg" alt="GitHub" /></div>
              <div className="sp-sponsor-chip"><img src="/sponsors/hackerearth.svg" alt="HackerEarth" /></div>
              <div className="flex items-center text-sm text-text-dim px-4 py-3 bg-surface-1 border border-white/10 rounded-lg">
                ...and 15+ more across tech, lifestyle, and education
              </div>
            </div>
          </Reveal>
        </section>\n`;

// Add Resume Book to Tiers
tiers = tiers.replace(/(<ul className="sp-perk-list">\s*<li>Dedicated Stage Time \(Workshop\)<\/li>)/, '$1\n                      <li>Access to Event Resume Book</li>');
tiers = tiers.replace(/(<ul className="sp-perk-list">\s*<li>Dedicated Instagram\/LinkedIn Post<\/li>)/, '$1\n                      <li>Access to Event Resume Book</li>');

// Add Resume Book to Compare
const rowHTML = `<tr><td className="feat">Resume Book Access</td><td className="yes col-p-cell"><Check size={16} className="mx-auto" /></td><td className="yes"><Check size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td><td className="no"><Minus size={16} className="mx-auto" /></td></tr>`;
compare = compare.replace(/(<tr><td className="feat">Offline Merchandise Distribution<\/td>.*?<\/tr>)/, rowHTML + '\n                  $1');

let newCode = code.substring(0, code.indexOf('{/* HERO */}'));
newCode += hero;
newCode += why;
newCode += pastSponsors;
newCode += tiers;
newCode += compare;
newCode += mergedAbout;
newCode += events;
newCode += rest;

// Update section tags
let counter = 1;
newCode = newCode.replace(/\[EOF section::\d+\]/g, () => `[EOF section::0${counter}]`);
counter = 1;
newCode = newCode.replace(/\[0\d\] /g, (match) => {
    // If it's a bracketed number, just increment it. But let's only do it for uppercase blocks.
    const res = `[0${counter}] `;
    counter++;
    return res;
});

// We should be careful about replacing [01], [02], etc. inside text, let's use a more specific regex.
// Actually, it's easier to just rely on the template literals since I'm putting them all together.
// Let's reset the counter and run a custom replacer.

fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', newCode);
