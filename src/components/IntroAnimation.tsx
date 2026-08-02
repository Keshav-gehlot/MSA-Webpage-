import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const JOURNEY = [
  "Learn",
  "Build",
  "Lead",
  "Innovate",
  "Microsoft Learn Student Ambassadors"
];

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<'animating' | 'done'>('animating');

  useEffect(() => {
    // Timing for each word
    const timings = [
      800,   // Learn -> Build
      1600,  // Build -> Lead
      2400,  // Lead -> Innovate
      3200,  // Innovate -> MLSA
      5000,  // MLSA -> dissolve
    ];

    const timeouts = timings.map((time, index) => 
      setTimeout(() => setStep(index + 1), time)
    );

    const doneTimeout = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 6000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(doneTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'done' ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{ pointerEvents: phase === 'done' ? 'none' : 'auto' }}
    >
      {/* Subtle background glow */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,212,0.08)_0%,rgba(0,0,0,1)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Slow camera zoom effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 6, ease: "linear" }}
      >
        <AnimatePresence mode="wait">
          {step < JOURNEY.length && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`text-center font-display tracking-wide px-6 ${
                step === JOURNEY.length - 1 
                  ? "text-3xl md:text-5xl lg:text-6xl font-medium text-white" 
                  : "text-4xl md:text-6xl font-light text-[#00A4EF]"
              }`}
            >
              {JOURNEY[step]}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
