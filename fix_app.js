import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// add import
if (!content.includes('IntroOverlay')) {
  content = content.replace(
    "import { SEO } from './components/SEO';",
    "import { SEO } from './components/SEO';\nimport { IntroOverlay } from './components/IntroOverlay';"
  );

  content = content.replace(
    "<Routes>",
    "<IntroOverlay>\n            <Routes>"
  );

  content = content.replace(
    "</Routes>",
    "</Routes>\n          </IntroOverlay>"
  );

  fs.writeFileSync('src/App.tsx', content);
}
