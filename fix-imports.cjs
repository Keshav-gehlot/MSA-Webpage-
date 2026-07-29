const fs = require('fs');

let code = fs.readFileSync('src/components/JourneySection.tsx', 'utf8');
code = 'import { useState, useEffect } from "react";\n' + code;
fs.writeFileSync('src/components/JourneySection.tsx', code);

code = fs.readFileSync('src/components/LearningHub.tsx', 'utf8');
code = 'import { useState, useEffect } from "react";\n' + code;
fs.writeFileSync('src/components/LearningHub.tsx', code);
