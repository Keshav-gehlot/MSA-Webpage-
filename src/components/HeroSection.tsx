import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MagneticWrapper } from "./MagneticWrapper";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phases of Scroll:
  const l1x1 = useTransform(scrollYProgress, [0.20, 0.45], [-200, 452]);
  const l1y1 = useTransform(scrollYProgress, [0.20, 0.45], [-60, 215]);
  const l1x2 = useTransform(scrollYProgress, [0.20, 0.45], [1200, 548]);
  const l1y2 = useTransform(scrollYProgress, [0.20, 0.45], [500, 225]);

  const l2x1 = useTransform(scrollYProgress, [0.20, 0.45], [-200, 452]);
  const l2y1 = useTransform(scrollYProgress, [0.20, 0.45], [500, 225]);
  const l2x2 = useTransform(scrollYProgress, [0.20, 0.45], [1200, 548]);
  const l2y2 = useTransform(scrollYProgress, [0.20, 0.45], [-60, 215]);

  const aOpacity = useTransform(scrollYProgress, [0.44, 0.45], [0, 1]);
  const aLength = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

  const msOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const msBlurValue = useTransform(scrollYProgress, [0.55, 0.65], [12, 0]);
  const msFilter = useMotionTemplate`blur(${msBlurValue}px)`;
  const msY = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);

  const groupX = useTransform(scrollYProgress, [0.65, 0.85], [0, 220]);
  const groupScale = useTransform(scrollYProgress, [0.65, 0.85], [1.1, 0.9]);

  const contentOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.85, 0.95], [20, 0]);

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const STROKE_WIDTH = "8";

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-transparent" id="home">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        <motion.div 
          style={{ scale: groupScale }} 
          className="relative w-full max-w-6xl mx-auto flex justify-center items-center h-[400px] md:h-[500px]"
        >
           <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6D5DFB" />
                  <stop offset="40%" stopColor="#00D9FF" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>

              <motion.g style={{ x: groupX }}>
                {/* M path */}
                <motion.path 
                  d="M -20 300 L -20 100 L 60 220 L 140 100 L 140 300"
                  fill="none" stroke="white" strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round"
                  style={{ opacity: msOpacity, y: msY, filter: msFilter }}
                />
                
                {/* S path */}
                <motion.path 
                  d="M 340 130 C 340 80, 220 80, 220 140 C 220 200, 340 200, 340 260 C 340 320, 220 320, 220 270"
                  fill="none" stroke="white" strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round"
                  style={{ opacity: msOpacity, y: msY, filter: msFilter }}
                />

                {/* A path (legs only) */}
                <motion.path 
                  d="M 420 300 L 500 100 L 580 300"
                  fill="none" stroke="white" strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round"
                  style={{ pathLength: aLength, opacity: aOpacity }}
                />

                {/* The Morphing X / Crossbar */}
                <motion.g filter="url(#glow)">
                  <motion.line 
                    x1={l1x1} y1={l1y1} x2={l1x2} y2={l1y2}
                    stroke="url(#primary-grad)" strokeWidth={STROKE_WIDTH} strokeLinecap="round"
                  />
                  <motion.line 
                    x1={l2x1} y1={l2y1} x2={l2x2} y2={l2y2}
                    stroke="url(#primary-grad)" strokeWidth={STROKE_WIDTH} strokeLinecap="round"
                  />
                </motion.g>
              </motion.g>
           </svg>
        </motion.div>

        {/* Revealing Text Content */}
        <motion.div 
          className="absolute max-w-3xl bottom-12 md:bottom-20 flex flex-col items-center text-center px-6"
          style={{ opacity: contentOpacity, y: contentY, pointerEvents: contentOpacity.get() === 0 ? "none" : "auto" }}
        >
           <motion.h1 
             animate={{ textShadow: ["0px 0px 0px rgba(0, 217, 255, 0)", "0px 0px 20px rgba(168, 85, 247, 0.4)", "0px 0px 0px rgba(0, 217, 255, 0)"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="text-3xl md:text-6xl font-display font-medium tracking-tight text-white mb-4"
           >
             Microsoft Student Ambassadors
           </motion.h1>
           <p className="text-sm md:text-xl text-text-muted font-light mb-8 max-w-xl md:leading-relaxed">
             Join a global community of innovators, builders, and future technology leaders shaping the digital world.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-sans">
              <MagneticWrapper className="w-full sm:w-auto">
                <a href="#about" className="block w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm">
                  Join Community
                </a>
              </MagneticWrapper>
              <MagneticWrapper className="w-full sm:w-auto">
                <a href="#events" className="block w-full sm:w-auto px-8 py-3.5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-colors text-sm">
                  Explore Events
                </a>
              </MagneticWrapper>
           </div>
        </motion.div>

        {/* Initial Scroll Hint */}
        <motion.div 
           className="absolute bottom-10 flex flex-col items-center text-text-dim text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase"
           style={{ opacity: scrollCueOpacity }}
        >
           <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-accent-blue/50 to-transparent mb-4 animate-pulse relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-blue blur-sm animate-[ping_2s_ease-in-out_infinite]" />
           </div>
           Scroll Down
        </motion.div>

      </div>
    </section>
  );
}
