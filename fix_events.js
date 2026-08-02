import fs from 'fs';

let content = fs.readFileSync('src/components/EventsSection.tsx', 'utf8');

content = content.replace('import { useState, useRef, useEffect } from "react";', 'import { useState, useRef, useEffect, useMemo } from "react";');
content = content.replace(`const filteredEvents = currentCategory === "All" \n    ? events \n    : events.filter(e => e.category === currentCategory);`, `const filteredEvents = useMemo(() => {\n    return currentCategory === "All"\n      ? events\n      : events.filter((e) => e.category === currentCategory);\n  }, [currentCategory]);`);

fs.writeFileSync('src/components/EventsSection.tsx', content);

