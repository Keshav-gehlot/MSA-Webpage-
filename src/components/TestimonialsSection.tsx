import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import testimonials from "../data/testimonials.json";
import { cn } from "../lib/utils";

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayedText, setDisplayedText] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    if (reducedMotion) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    const timer = setTimeout(() => {
      const intervalId = setInterval(() => {
        i++;
        setDisplayedText(text.substring(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
        }
      }, 15);
      return () => clearInterval(intervalId);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, text, delay, reducedMotion]);

  return (
    <span ref={ref}>
      "{reducedMotion ? text : displayedText}"
    </span>
  );
}

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-fuchsia-500"
];

export function TestimonialsSection() {
  return (
    <section className="py-[120px] px-6 bg-transparent relative overflow-hidden" id="voices">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Community Voices</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white">
            Hear from our members
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((voice, i) => (
            <motion.div
              key={voice.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-3xl bg-surface-1 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between"
            >
              <div className="mb-8 min-h-[120px]">
                <svg className="w-8 h-8 text-white/10 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white md:text-lg font-light leading-relaxed">
                  <TypewriterText text={voice.quote} delay={i * 0.2 + 0.3} />
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm", AVATAR_COLORS[i % AVATAR_COLORS.length])}>
                  {voice.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">{voice.author}</h4>
                  <p className="text-text-dim text-xs mt-0.5">{voice.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
