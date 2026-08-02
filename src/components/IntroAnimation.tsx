import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const JOURNEY = [
  "Learn",
  "Build",
  "Lead",
  "Innovate"
];

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'journey' | 'reveal' | 'done'>('journey');
  const [journeyStep, setJourneyStep] = useState(0);

  // Memoize random particles to avoid re-renders
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 60 + Math.random() * 40,
      size: Math.random() * 3 + 1,
      color: ['#00A4EF', '#7FBA00', '#FFB900', '#F25022', '#FFFFFF'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2
    }));
  }, []);

  useEffect(() => {
    if (phase === 'journey') {
      const interval = setInterval(() => {
        setJourneyStep(prev => {
          if (prev >= JOURNEY.length - 1) {
            clearInterval(interval);
            setTimeout(() => setPhase('reveal'), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 900);
      return () => clearInterval(interval);
    } else if (phase === 'reveal') {
      const doneTimeout = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 4800);
      return () => clearTimeout(doneTimeout);
    }
    return undefined;
  }, [phase, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'done' ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{ pointerEvents: phase === 'done' ? 'none' : 'auto' }}
    >
      {/* Slow camera zoom effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 1 }}
        animate={{ scale: phase === 'done' ? 1.15 : 1.05 }}
        transition={{ duration: 8, ease: "linear" }}
      >
        <AnimatePresence mode="wait">
          {phase === 'journey' && (
            <motion.div
              key={journeyStep}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-light text-white font-display tracking-wide"
            >
              {JOURNEY[journeyStep]}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'reveal' && (
            <motion.div 
              className="relative flex flex-col items-center justify-center text-center z-10 w-full px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {/* MICROSOFT */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xs md:text-sm font-medium tracking-[0.4em] uppercase text-white/70 mb-3 ml-2"
              >
                Microsoft
              </motion.div>
              
              <div className="flex flex-col md:flex-row md:gap-3 items-center overflow-hidden">
                {/* Student */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white"
                >
                  Student
                </motion.div>
                {/* Ambassadors */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white"
                >
                  Ambassadors
                </motion.div>
              </div>

              {/* Blue Light Sweep over the text */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '100%', opacity: [0, 0.4, 0] }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0, 164, 239, 0.8), transparent)',
                  transform: 'skewX(-20deg)',
                  width: '200%'
                }}
              />

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
                className="mt-6 text-sm md:text-base text-white/50 font-light tracking-widest flex flex-col items-center gap-1"
              >
                <span>SRM Institute of Science and Technology</span>
                <span className="text-xs">Kattankulathur</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Particles during reveal/dissolve */}
        <AnimatePresence>
          {phase === 'reveal' && (
            <motion.div 
              className="absolute inset-0 overflow-hidden pointer-events-none z-0"
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full blur-[1px]"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.8, 0], y: -200 }}
                  transition={{ 
                    duration: p.duration, 
                    delay: 2.5 + p.delay, // Starts breaking into particles as it dissolves
                    ease: "easeOut" 
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  );
}
