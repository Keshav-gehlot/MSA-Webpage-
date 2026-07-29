const fs = require('fs');

function replaceFile(path) {
  let code = fs.readFileSync(path, 'utf8');
  let originalCode = code;

  // Revert MLSA Think Tank in SponsorsAccessPage
  if (path === 'src/pages/SponsorsAccessPage.tsx') {
    code = code.replace(/MSA Think Tank/g, "MLSA Think Tank");
    code = code.replace(/MSA Forms/g, "MLSA Forms");
    code = code.replace(/MSA SRM ChatBot/g, "MLSA SRM ChatBot");
  }

  // Replace MLSA SRM community
  if (path === 'src/components/ProjectsSection.tsx') {
    code = code.replace(/MLSA SRM community/g, "MSA SRM community");
  }

  // Find any other MLSA references in src components and pages that should be MSA
  if (path.includes('src/components/') || path.includes('src/pages/')) {
    // Only replace MLSA with MSA if it's not followed by Think Tank, Forms, or SRM ChatBot, and not part of a URL
    // Actually, I can just replace all "MLSA" that are standalone and not in those specific phrases
    
    // It's safer to just run this manually if I know the files, but let's check
  }

  if (code !== originalCode) {
    fs.writeFileSync(path, code);
  }
}

replaceFile('src/components/ProjectsSection.tsx');
replaceFile('src/pages/SponsorsAccessPage.tsx');

