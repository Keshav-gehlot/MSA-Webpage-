import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
}

export function TiltCard({ children, className = "", maxRotation = 8, ...rest }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxRotation}deg`, `-${maxRotation}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxRotation}deg`, `${maxRotation}deg`]);

  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
  const sheenOpacity = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [0.15, 0, 0.15]
  );

  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isTouch || reducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isTouch || reducedMotion) return;
    x.set(0);
    y.set(0);
  };

  if (isTouch || reducedMotion) {
    return <div className={className} {...rest}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 rounded-inherit"
          style={{
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)",
            backgroundSize: "200% 200%",
            backgroundPositionX: sheenX,
            backgroundPositionY: sheenY,
            opacity: sheenOpacity,
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
