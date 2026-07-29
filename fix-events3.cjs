const fs = require('fs');
let code = fs.readFileSync('src/components/EventsSection.tsx', 'utf8');

code = code.replace(
  'const currentCategory = searchParams.get("category") || "All";',
  'const currentCategory = searchParams.get("category") || "All";\n  const [reducedMotion, setReducedMotion] = useState(false);\n  useEffect(() => { setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);'
);

fs.writeFileSync('src/components/EventsSection.tsx', code);
