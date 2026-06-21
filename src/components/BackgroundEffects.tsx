import { motion, useScroll, useTransform } from "motion/react";

export function BackgroundEffects() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -300]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Animated Subtle Grid for all sections */}
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
      
      {/* Sweeping Diagonal Glow */}
      <div className="absolute inset-0 bg-grid-glow mix-blend-screen opacity-100" />

      {/* Faint Radial Light Textures */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-accent-purple/5 blur-[150px]" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[40%] right-[-15%] w-[50%] h-[50%] rounded-full bg-accent-blue/5 blur-[150px]" 
      />
      <motion.div 
        className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-accent-violet/5 blur-[150px]" 
      />
    </div>
  );
}
