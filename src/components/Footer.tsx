export function Footer() {
  return (
    <footer className="py-8 px-6 bg-base border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
