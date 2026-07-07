import { motion, useMotionTemplate, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useState, useEffect, type MouseEvent, lazy, Suspense } from "react";
import { MagneticWrapper } from "./MagneticWrapper";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /**
   * Complex Scroll Animation Mapping
   * --------------------------------
   * 
   * This hero section uses Framer Motion's `useScroll` and `useTransform` to tie 
   * SVG path animations directly to the window's scroll position.
   * 
   * Phase 1 (0.20 -> 0.45): 
   * - The large 'X' morphs into the crossbar of the 'A'. 
   * - This is achieved by animating the x1, y1, x2, y2 coordinates of two SVG lines.
   * 
   * Phase 2 (0.44 -> 0.55):
   * - The legs of the 'A' draw in using `pathLength` and `opacity`.
   * 
   * Phase 3 (0.55 -> 0.65):
   * - The 'M' and 'S' fade in, move up (`y`), and un-blur (`filter`).
   * 
   * Phase 4 (0.65 -> 0.85):
   * - The entire "MSA" logo group shifts right (`groupX`) and scales down (`groupScale`) 
   *   to make room for the text content.
   * 
   * Phase 5 (0.85 -> 0.95):
   * - The main heading and call-to-action buttons fade in and move up.
   * 
   * Note: We exclusively animate GPU-accelerated properties (opacity, scale, x, y, SVG paths)
   * to ensure 60fps performance without layout thrashing.
   */
  
  // We drive the entire animation off a single normalized progress value.
  // If reduced motion is preferred, we snap progress immediately to 1.
  const progress = useTransform(scrollYProgress, v => reducedMotion ? 1 : v);

  // Phase 1: X contracts to become the crossbar of 'A' (0.20 -> 0.45)
  // Base X is a group of two lines from -50 to 50.
  // When x=500, scaleX=14, scaleY=5.6, it matches the original big X (-200 to 1200, -60 to 500).
  // When x=720, scaleX=0.96, scaleY=0.10, it matches the original small X crossbar (672 to 768, 215 to 225).
  const xCrossbar = useTransform(progress, [0.20, 0.45], [500, 720]);
  const scaleXCrossbar = useTransform(progress, [0.20, 0.45], [14, 0.96]);
  const scaleYCrossbar = useTransform(progress, [0.20, 0.45], [5.6, 0.10]);

  // Phase 2: A legs draw in (0.44 -> 0.55)
  const aOpacity = useTransform(progress, [0.44, 0.45], [0, 1]);
  const aLength = useTransform(progress, [0.45, 0.55], [0, 1]);

  // Phase 3: M and S fade in (0.55 -> 0.65)
  const msOpacity = useTransform(progress, [0.55, 0.65], [0, 1]);
  const msBlurValue = useTransform(progress, [0.55, 0.65], [12, 0]);
  const msFilter = useMotionTemplate`blur(${msBlurValue}px)`;
  const msY = useTransform(progress, [0.55, 0.65], [30, 0]);

  // Phase 4: MSA group shifts left and scales down (0.65 -> 0.85)
  const groupY = useTransform(progress, [0.65, 0.85], [0, -120]);
  const groupScale = useTransform(progress, [0.65, 0.85], [1.1, 0.8]);

  // Phase 5: Content fades in (0.85 -> 0.95)
  const contentOpacity = useTransform(progress, [0.85, 0.95], [0, 1]);
  const contentPointerEvents = useTransform(progress, [0.85, 0.95], ["none", "auto"]);
  const contentY = useTransform(progress, [0.85, 0.95], [20, 0]);

  const scrollCueOpacity = useTransform(progress, [0, 0.1], [1, 0]);

  const STROKE_WIDTH = "8";

  // 3D parallax offsets
  const tiltX = useTransform(cursorY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [10, -10]);
  const tiltY = useTransform(cursorX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-14, 14]);

  const dropShadowX = useTransform(cursorX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]);
  const dropShadowY = useTransform(cursorY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [20, -20]);
  const shadowFilter = useMotionTemplate`drop-shadow(${dropShadowX}px ${dropShadowY}px 30px rgba(109, 93, 251, 0.4))`;

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-transparent" id="home">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center" onMouseMove={handleMouseMove}>
        
        {!isTouch && !reducedMotion && (
          <motion.div
            className="absolute pointer-events-none mix-blend-screen"
            style={{
              width: 300,
              height: 300,
              left: cursorX,
              top: cursorY,
              x: "-50%",
              y: "-50%",
              background: "radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
              filter: "blur(30px)",
              zIndex: 0
            }}
          />
        )}
        

        
        <motion.div 
          style={{ scale: groupScale }} 
          className="relative w-full max-w-6xl mx-auto flex justify-center items-center h-[400px] md:h-[500px]"
        >
          <motion.div
            style={{
              perspective: 1200,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <motion.div
              style={
                isTouch || reducedMotion
                  ? {}
                  : { 
                      rotateX: tiltX, 
                      rotateY: tiltY,
                      transformStyle: "preserve-3d"
                    }
              }
              className="w-full h-full flex justify-center items-center"
            >
              <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible relative z-10">
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

                <motion.g 
                  style={
                    isTouch || reducedMotion 
                      ? { y: groupY } 
                      : { y: groupY, filter: shadowFilter, transformStyle: "preserve-3d" }
                  }
                >
                  
                  {/* Background layer (M and S paths) */}
                  <motion.g style={{ z: isTouch || reducedMotion ? 0 : -20, transformStyle: "preserve-3d" } as any}>
                    {/* M path */}
                    <motion.path 
                      d="M 200 300 L 200 100 L 280 220 L 360 100 L 360 300"
                      fill="none" stroke="white" strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round"
                      style={{ opacity: msOpacity, y: msY, filter: msFilter }}
                    />
                    
                    {/* S path */}
                    <motion.path 
                      d="M 560 130 C 560 80, 440 80, 440 140 C 440 200, 560 200, 560 260 C 560 320, 440 320, 440 270"
                      fill="none" stroke="white" strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round"
                      style={{ opacity: msOpacity, y: msY, filter: msFilter }}
                    />
                  </motion.g>

                  {/* Middle layer (A path legs) */}
                  <motion.g style={{ z: 0, transformStyle: "preserve-3d" } as any}>
                    {/* A path (legs only) */}
                    <motion.path 
                      d="M 640 300 L 720 100 L 800 300"
                      fill="none" stroke="white" strokeWidth={STROKE_WIDTH} strokeLinejoin="round" strokeLinecap="round"
                      style={{ pathLength: aLength, opacity: aOpacity }}
                    />
                  </motion.g>

                  {/* Foreground layer (X / Crossbar) */}
                  <motion.g style={{ z: isTouch || reducedMotion ? 0 : 40, transformStyle: "preserve-3d" } as any}>
                    <motion.g filter="url(#glow)">
                      <motion.g style={{ x: xCrossbar, y: 220, scaleX: scaleXCrossbar, scaleY: scaleYCrossbar }}>
                        <line 
                          x1="-50" y1="-50" x2="50" y2="50"
                          stroke="url(#primary-grad)" strokeWidth={STROKE_WIDTH} strokeLinecap="round" vectorEffect="non-scaling-stroke"
                        />
                        <line 
                          x1="-50" y1="50" x2="50" y2="-50"
                          stroke="url(#primary-grad)" strokeWidth={STROKE_WIDTH} strokeLinecap="round" vectorEffect="non-scaling-stroke"
                        />
                      </motion.g>
                    </motion.g>
                  </motion.g>
                  
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Revealing Text Content */}
        <motion.div 
          className="absolute max-w-3xl bottom-12 md:bottom-20 flex flex-col items-center text-center px-6"
          style={{ opacity: contentOpacity, y: contentY, pointerEvents: contentPointerEvents as any }}
        >
           <motion.h1 
             animate={{ textShadow: ["0px 0px 0px rgba(0, 217, 255, 0)", "0px 0px 20px rgba(168, 85, 247, 0.4)", "0px 0px 0px rgba(0, 217, 255, 0)"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="text-3xl md:text-6xl font-display font-medium text-white mb-4 leading-[1.15] md:leading-[1.1]"
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
