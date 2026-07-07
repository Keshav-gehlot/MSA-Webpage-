import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <footer ref={footerRef} className="relative py-12 px-6 border-t border-white/10 overflow-hidden">
      {/* Animated Subtle Background */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        {reducedMotion ? (
          <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/10 to-transparent" />
        ) : (
          <>
            <motion.div
              animate={isInView ? {
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0.1, 0.3, 0.1]
              } : { opacity: 0 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[50%] -left-[10%] w-[50%] h-[150%] rounded-full bg-accent-blue/10 blur-[120px]"
            />
            <motion.div
              animate={isInView ? {
                x: [0, -100, 0],
                y: [0, 50, 0],
                opacity: [0.1, 0.2, 0.1]
              } : { opacity: 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[50%] -right-[10%] w-[60%] h-[150%] rounded-full bg-accent-blue/10 blur-[120px]"
            />
          </>
        )}
        <div className="absolute inset-0 bg-canvas/60 backdrop-blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center shrink-0">
          <svg viewBox="0 0 240 92" className="h-[38px] w-auto">
            <defs>
              <linearGradient id="logo-border-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="50%" stopColor="#6D5DFB" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="238" height="90" rx="16" fill="#000" stroke="url(#logo-border-footer)" strokeWidth="2.5"/>
            <text x="20" y="32" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" letterSpacing="-0.01em">Microsoft</text>
            <text x="20" y="54" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" letterSpacing="-0.01em">Student Ambassadors</text>
            <text x="20" y="78" fill="#FFF" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="18" letterSpacing="0.05em">SRM</text>
            <rect x="74" y="64" width="146" height="5" rx="2.5" fill="#00D9FF"/>
            <rect x="74" y="73" width="146" height="5" rx="2.5" fill="#A855F7"/>
          </svg>
        </div>
        <p className="text-sm text-text-dim">
          © {new Date().getFullYear()} Microsoft Student Ambassadors. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-text-muted">
          <a href="/sponsors" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm text-accent-blue font-medium">Sponsors</a>
          <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm">Privacy</a>
          <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm">Terms</a>
        </div>
      </div>
    </footer>
  );
}
