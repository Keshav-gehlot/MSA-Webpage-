import fs from 'fs';
import path from 'path';

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

  const r1 = /const\s+\[reducedMotion,\s*setReducedMotion\]\s*=\s*useState\([^)]*\);[\s\S]*?useEffect\(\(\)\s*=>\s*\{[\s\S]*?setReducedMotion\(window\.matchMedia\([^)]*\)\.matches\);?[\s\S]*?\},\s*\[\]\);/g;
  const r2 = /const\s+\[isReducedMotion,\s*setIsReducedMotion\]\s*=\s*useState\([^)]*\);[\s\S]*?useEffect\(\(\)\s*=>\s*\{[\s\S]*?setIsReducedMotion\(window\.matchMedia\([^)]*\)\.matches\);?[\s\S]*?\},\s*\[\]\);/g;

  if (r1.test(content)) {
    content = content.replace(r1, 'const reducedMotion = useReducedMotion();');
    changed = true;
  }
  
  if (r2.test(content)) {
    content = content.replace(r2, 'const isReducedMotion = useReducedMotion();');
    changed = true;
  }

  if (changed) {
    let upDirs = "../hooks/useReducedMotion";
    if (file.includes('pages/')) upDirs = "../hooks/useReducedMotion";
    if (file.includes('hooks/')) upDirs = "./useReducedMotion";
    content = `import { useReducedMotion } from "${upDirs}";\n` + content;
    fs.writeFileSync(file, content);
    console.log("Updated", file);
  }
});
