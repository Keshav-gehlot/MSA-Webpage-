import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { MagneticWrapper } from "./MagneticWrapper";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10"
        >
          <MagneticWrapper>
            <button
              onClick={scrollToTop}
              className="p-3 md:p-4 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 hover:border-accent-blue/50 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              aria-label="Back to top"
            >
              <ArrowUp size={24} />
            </button>
          </MagneticWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
