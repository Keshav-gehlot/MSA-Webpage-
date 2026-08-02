import fs from 'fs';

let content = fs.readFileSync('src/components/WhyJoinSection.tsx', 'utf8');
content = content.replace('const reducedMotion = useReducedMotion();', `const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);`);

fs.writeFileSync('src/components/WhyJoinSection.tsx', content);
