import fs from 'fs';

// fix vite.config.ts
let viteConfig = fs.readFileSync('vite.config.ts', 'utf8');
viteConfig = viteConfig.replace('return \'vendor-icons\';\n            }\n          }\n        }\n      }', 'return \'vendor-icons\';\n            }\n            return null;\n          }\n        }\n      }');
fs.writeFileSync('vite.config.ts', viteConfig);

// fix useReducedMotion.ts
let useReducedMotion = fs.readFileSync('src/hooks/useReducedMotion.ts', 'utf8');
if (!useReducedMotion.includes('return false;')) {
    useReducedMotion = useReducedMotion.replace('return matches;', 'return matches;\n  }\n  return false;');
}
fs.writeFileSync('src/hooks/useReducedMotion.ts', useReducedMotion);

