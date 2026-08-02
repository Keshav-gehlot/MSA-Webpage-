import fs from 'fs';

const files = [
    "src/components/ApplyNowSection.tsx",
    "src/components/EventsSection.tsx",
    "src/components/Footer.tsx",
    "src/components/HeroSection.tsx",
    "src/components/JourneySection.tsx",
    "src/components/LearningHub.tsx",
    "src/components/Navbar.tsx",
    "src/components/ProjectsSection.tsx",
    "src/components/ShipItGame.tsx",
    "src/components/SponsorSection.tsx",
    "src/components/TeamSection.tsx",
    "src/components/TestimonialsSection.tsx",
    "src/components/TiltCard.tsx",
    "src/components/WhyJoinSection.tsx",
    "src/pages/SponsorsAccessPage.tsx"
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // We want to replace these blocks
    const pattern1 = /const\s+\[(isReducedMotion|reducedMotion),\s*(setIsReducedMotion|setReducedMotion)\]\s*=\s*useState\(false\);[\s\S]*?useEffect\(\(\)\s*=>\s*\{[\s\S]*?(setIsReducedMotion|setReducedMotion)\(window\.matchMedia\([^;]+\)\.matches\);[\s\S]*?\},\s*\[\]\);/g;
    
    if (pattern1.test(content)) {
        content = content.replace(pattern1, (match, varName) => {
            return `const ${varName} = useReducedMotion();`;
        });
        
        let upDirs = "../hooks/useReducedMotion";
        if (file.includes('pages/')) upDirs = "../hooks/useReducedMotion";
        
        content = `import { useReducedMotion } from "${upDirs}";\n` + content;
        fs.writeFileSync(file, content);
        console.log("Fixed", file);
    }
}
