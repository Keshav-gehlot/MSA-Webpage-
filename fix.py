import re
import os

files = [
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
    "src/pages/SponsorsAccessPage.tsx",
    "src/hooks/useCountUp.ts"
]

def fix_file(path):
    with open(path, "r") as f:
        content = f.read()
    
    # Simple regex to find useState + useEffect block for reduced motion
    # We will just replace it with the hook call
    # Many variations exist, so we will use more permissive regex
    
    # 1. const [reducedMotion, setReducedMotion] = useState(false);
    p1 = re.compile(r"const\s+\[(isReducedMotion|reducedMotion),\s*(setIsReducedMotion|setReducedMotion)\]\s*=\s*useState\([^)]*\);")
    p2 = re.compile(r"useEffect\(\(\)\s*=>\s*\{[^}]*(setIsReducedMotion|setReducedMotion)\(window\.matchMedia\([^)]*\)\.matches\);[^}]*\},\s*\[\]\);")
    
    # Some have `const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");`
    p3 = re.compile(r"useEffect\(\(\)\s*=>\s*\{[^}]*const mediaQuery = window\.matchMedia\(\"(prefers-reduced-motion: reduce)\"\);[^}]*\},\s*\[\]\);")

    # If both p1 and p2 are present in file, we replace them.
    # Note: Navbar just has `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;` inside a callback.
    
    orig = content
    
    # For hooks/useCountUp
    if "useCountUp.ts" in path:
        content = content.replace("const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;", "const isReduced = useReducedMotion();")
        content = 'import { useReducedMotion } from "./useReducedMotion";\n' + content
        with open(path, "w") as f:
            f.write(content)
        print("Fixed", path)
        return
        
    if "Navbar.tsx" in path:
        content = content.replace("const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;", "const prefersReducedMotion = useReducedMotion();")
        # Need to call hook at component top level, this is inside `handleLogoClick`. So Navbar needs manual fix.
        return
        
    if "WhyJoinSection.tsx" in path:
        # has setIsMobile as well
        #     setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        #     setIsMobile(window.innerWidth < 768);
        #   };
        #   checkMotion();
        #   window.addEventListener("resize", checkMotion);
        return # Will fix manually
        
    match1 = p1.search(content)
    match2 = p2.search(content)
    
    if match1 and match2:
        varName = match1.group(1)
        # replace the useState line with hook
        content = content[:match1.start()] + f"const {varName} = useReducedMotion();" + content[match1.end():]
        # remove the useEffect block
        # we have to search again because indices changed
        match2 = p2.search(content)
        content = content[:match2.start()] + content[match2.end():]
        
        # add import
        if "pages/" in path:
            content = 'import { useReducedMotion } from "../hooks/useReducedMotion";\n' + content
        else:
            content = 'import { useReducedMotion } from "../hooks/useReducedMotion";\n' + content
            
        with open(path, "w") as f:
            f.write(content)
        print("Fixed", path)

for f in files:
    fix_file(f)
