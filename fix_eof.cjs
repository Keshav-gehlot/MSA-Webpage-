const fs = require('fs');
let code = fs.readFileSync('src/pages/SponsorsAccessPage.tsx', 'utf8');

let counter = 1;
code = code.replace(/data-close="\[EOF section::01\]"/g, () => {
  const result = `data-close="[EOF section::0${counter}]"`;
  counter++;
  return result;
});

// Also fix the initial tags [0X]
counter = 1;
code = code.replace(/<div className="text-accent-blue text-sm font-semibold tracking-\[0\.2em\] uppercase mb-2 block">\[01\]/g, () => {
  const result = `<div className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">[0${counter}]`;
  counter++;
  return result;
});

// And also the final CTA section tag [EOF]
// Let's just fix any instances where I accidentally made [01] for the final CTA text.
// Actually, let's see what the labels are.

fs.writeFileSync('src/pages/SponsorsAccessPage.tsx', code);
