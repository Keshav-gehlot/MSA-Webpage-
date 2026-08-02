const fs = require('fs');
let code = fs.readFileSync('src/components/IntroAnimation.tsx', 'utf8');

code = code.replace(
`      return () => clearTimeout(doneTimeout);
    }`,
`      return () => clearTimeout(doneTimeout);
    }
    return undefined;`
);

fs.writeFileSync('src/components/IntroAnimation.tsx', code);
