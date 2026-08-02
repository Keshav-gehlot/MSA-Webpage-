import fs from 'fs';

// fix useCountUp.ts
let useCountUp = fs.readFileSync('src/hooks/useCountUp.ts', 'utf8');
useCountUp = useCountUp.replace('setIsFinished(false);\n    }', 'setIsFinished(false);\n    }\n    return undefined;');
fs.writeFileSync('src/hooks/useCountUp.ts', useCountUp);

// fix useReducedMotion.ts
let useReducedMotion = fs.readFileSync('src/hooks/useReducedMotion.ts', 'utf8');
useReducedMotion = useReducedMotion.replace('return () => mediaQuery.removeListener(handleChange);\n    }', 'return () => mediaQuery.removeListener(handleChange);\n    }\n    return undefined;');
fs.writeFileSync('src/hooks/useReducedMotion.ts', useReducedMotion);

