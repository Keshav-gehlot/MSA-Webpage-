const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

// Add import
if (!code.includes('import { sponsors }')) {
  code = code.replace(/import \{ Reveal \} from '\.\.\/components\/Reveal';/, "import { Reveal } from '../components/Reveal';\nimport { sponsors } from '../data/sponsors';");
}

const pastSponsorRegex = /<div className="sp-sponsor-wall text-center">[\s\S]*?<\/div>/;

const replacement = `<div className="sp-sponsor-wall">
              <p className="text-xl text-text-dim text-center mb-10">Proudly partnered with over 15+ industry leaders across technology, lifestyle, and education.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {sponsors.map((sponsor) => (
                  <div key={sponsor.name} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                    <img src={sponsor.logo} alt={sponsor.name} className="h-10 w-auto opacity-70 group-hover:opacity-100 transition-opacity mb-4" />
                    <span className="text-xs font-mono text-text-dim text-center">{sponsor.name}</span>
                  </div>
                ))}
              </div>
            </div>`;

code = code.replace(pastSponsorRegex, replacement);

// Replace MLSA SRM with MSA SRM
code = code.replace(/MLSA SRM/g, "MSA SRM");
code = code.replace(/MLSA/g, "MSA");

fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', code);
