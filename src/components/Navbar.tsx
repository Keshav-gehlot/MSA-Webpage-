import React from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef, Suspense, lazy } from "react";

const ShipItGame = lazy(() => import("./ShipItGame"));
import { Menu, X } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.7]);
  const blurValue = useTransform(scrollY, [0, 100], [0, 16]);
  
  const backgroundColor = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurValue}px)`;

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  const [showGame, setShowGame] = useState(false);
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  const links = [
    { label: "About Us", href: "/#about", id: "about" },
    { label: "Learning Hub", href: "/#learning", id: "learning" },
    { label: "Events", href: "/#events", id: "events" },
    { label: "Team", href: "/#team", id: "team" },
  ];

  useEffect(() => {
    console.log("%cTry clicking the logo 5 times...", "color: #00D9FF; font-size: 14px; font-weight: bold;");
    // Only track scroll on the home page
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const now = Date.now();
    
    if (now - lastClickTime.current > 2000) {
      clickCount.current = 1;
    } else {
      clickCount.current += 1;
    }
    lastClickTime.current = now;

    if (clickCount.current === 5) {
      if (prefersReducedMotion) {
        console.log("You found it! (This game respects your reduced-motion setting, so it's disabled.)");
      } else {
        setShowGame(true);
      }
      clickCount.current = 0;
    }
  };

  return (
    <>
    <motion.nav 
      style={{ backgroundColor, backdropFilter }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" onClick={handleLogoClick} className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm">
          <svg viewBox="0 0 240 92" className="h-[46px] w-auto hover:opacity-90 transition-opacity">
            <defs>
              <linearGradient id="logo-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="50%" stopColor="#6D5DFB" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="238" height="90" rx="16" fill="#000" stroke="url(#logo-border)" strokeWidth="2.5"/>
            <text x="20" y="32" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" letterSpacing="-0.01em">Microsoft</text>
            <text x="20" y="54" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" letterSpacing="-0.01em">Student Ambassadors</text>
            <text x="20" y="78" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="18" letterSpacing="0.05em">SRM</text>
            <rect x="74" y="64" width="146" height="5" rx="2.5" fill="#00D9FF"/>
            <rect x="74" y="73" width="146" height="5" rx="2.5" fill="#A855F7"/>
          </svg>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          {links.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className={cn(
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm",
                "transition-colors",
                activeSection === link.id ? "text-white" : "hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
          <Link to="/sponsors" className="hover:text-white transition-colors text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm">
            Sponsors
          </Link>
        </div>

        <div className="hidden md:flex">
          <MagneticWrapper>
            <a href="/#contact" className="block px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              Contact
            </a>
          </MagneticWrapper>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-text-muted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-surface-1 border-b border-white/10 py-4 px-6 flex flex-col gap-4">
          {links.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={cn(
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm",
                "font-medium transition-colors",
                activeSection === link.id ? "text-white" : "text-text-muted hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
          <Link 
            to="/sponsors"
            onClick={() => setIsOpen(false)}
            className="text-accent-blue hover:text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
          >
            Sponsors
          </Link>
          <a href="/#contact" onClick={() => setIsOpen(false)} className="mt-2 text-center w-full px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black">
            Contact
          </a>
        </div>
      )}
    </motion.nav>
    <Suspense fallback={null}>
      {showGame && <ShipItGame onClose={() => setShowGame(false)} />}
    </Suspense>
    </>
  );
}
