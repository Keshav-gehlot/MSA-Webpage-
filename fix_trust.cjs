const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

const pastSponsorsSectionRegex = /<section id="past-sponsors"[\s\S]*?<\/section>/;
const newPastSponsors = `<section id="past-sponsors" data-close="[EOF section::02]" className="sp-section">
          <Reveal delay={0}><div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[02] trust & credibility</div></Reveal>
          <Reveal delay={1}><h2 className="sp-sec-h disp">Past Sponsors</h2></Reveal>
          <Reveal delay={2}>
            <div className="sp-sponsor-wall text-center">
              <p className="text-xl text-text-dim">Proudly partnered with over 15+ industry leaders across technology, lifestyle, and education.</p>
            </div>
          </Reveal>
        </section>`;

code = code.replace(pastSponsorsSectionRegex, newPastSponsors);

fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', code);
