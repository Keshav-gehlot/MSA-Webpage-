const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = findFiles('./src/components');
files.push('./src/pages/SponsorsAccessPage.tsx');
files.push('./src/hooks/useCountUp.ts');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('matchMedia') && !content.includes('useReducedMotion')) {
    let newContent = content.replace(/const\s+\[reducedMotion,\s*setReducedMotion\]\s*=\s*useState\([^)]*\);[\s\S]*?useEffect\(\(\)\s*=>\s*\{[\s\S]*?setReducedMotion\(window\.matchMedia\([^)]*\)\.matches\);?[\s\S]*?\},\s*\[\]\);/m, 'const reducedMotion = useReducedMotion();');
    
    if (newContent !== content) {
        content = newContent;
        changed = true;
    }
    
    newContent = content.replace(/const\s+\[isReducedMotion,\s*setIsReducedMotion\]\s*=\s*useState\([^)]*\);[\s\S]*?useEffect\(\(\)\s*=>\s*\{[\s\S]*?setIsReducedMotion\(window\.matchMedia\([^)]*\)\.matches\);?[\s\S]*?\},\s*\[\]\);/m, 'const isReducedMotion = useReducedMotion();');
    if (newContent !== content) {
        content = newContent;
        changed = true;
    }

    if (changed) {
        const importRegex = /^import.*from ['"]react['"];?/m;
        
        let upDirs = "../hooks/useReducedMotion";
        if (file.includes('pages/')) upDirs = "../hooks/useReducedMotion";
        if (file.includes('hooks/')) upDirs = "./useReducedMotion";

        if (content.match(importRegex)) {
           content = content.replace(/^(import.*from ['"]react['"];?)/m, `$1\nimport { useReducedMotion } from "${upDirs}";`);
        } else {
           content = `import { useReducedMotion } from "${upDirs}";\n${content}`;
        }
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
  }
});
