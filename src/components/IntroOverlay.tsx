import React, { useState, useEffect } from 'react';
import { IntroAnimation } from './IntroAnimation';
import { AnimatePresence } from 'motion/react';

export function IntroOverlay({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate checking if main fonts/images are ready
    // You could hook this into document.fonts.ready in the future
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!appReady) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        {/* Empty black screen to prevent flash before intro starts */}
      </div>
    );
  }

  const showIntro = !introComplete;

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation key="intro" onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>
      <div 
        className={showIntro ? "h-screen overflow-hidden pointer-events-none" : "h-full w-full"}
      >
        {children}
      </div>
    </>
  );
}
