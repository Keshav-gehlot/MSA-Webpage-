import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.7]);
  const blurValue = useTransform(scrollY, [0, 100], [0, 16]);
  
  const backgroundColor = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurValue}px)`;

  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "About Us", href: "#about" },
    { label: "Learning Hub", href: "#learning" },
    { label: "Events", href: "#events" },
    { label: "Team", href: "#team" },
  ];

  return (
    <motion.nav 
      style={{ backgroundColor, backdropFilter }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center shrink-0">
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
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <MagneticWrapper>
            <a href="#contact" className="block px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">
              Contact
            </a>
          </MagneticWrapper>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-text-muted hover:text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-surface border-b border-white/5 py-4 px-6 flex flex-col gap-4">
          {links.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-white font-medium"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 text-center w-full px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">
            Contact
          </a>
        </div>
      )}
    </motion.nav>
  );
}
