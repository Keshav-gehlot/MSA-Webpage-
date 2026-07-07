import { useMotionValue, useSpring, useTransform, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";

export function useCountUp(from: number, to: number, start: boolean, delay: number = 0) {
  const [displayValue, setDisplayValue] = useState(from);
  const [isFinished, setIsFinished] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.5
  });

  const roundedValue = useTransform(springValue, (v) => Math.round(v));

  useMotionValueEvent(roundedValue, "change", (latest) => {
    setDisplayValue(latest);
    if (latest === to && !reducedMotion) {
      setIsFinished(true);
    }
  });

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);

    if (start) {
      if (isReduced) {
        setDisplayValue(to);
        setIsFinished(true);
      } else {
        const timeout = setTimeout(() => motionValue.set(to), delay * 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      // reset
      motionValue.set(from);
      setDisplayValue(from);
      setIsFinished(false);
    }
  }, [start, to, from, motionValue, delay]);

  return { displayValue, isFinished };
}
