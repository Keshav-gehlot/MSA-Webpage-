import { motion } from "motion/react";
import { useMemo } from "react";
import { sponsors } from "../data/sponsors";

export function SponsorMarquee() {
  // Memoize duplicate sponsors to avoid recalculating on re-renders
  const marqueeSponsors = useMemo(() => [...sponsors, ...sponsors], []);

  return (
    <section 
      className="py-12 bg-[#050816] border-y border-white/5 overflow-hidden"
      aria-label="Industry Partners and Sponsors"
    >
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-text-dim text-sm font-semibold tracking-widest uppercase" id="marquee-heading">
          Trusted by industry leaders & past partners
        </p>
      </div>
      <div 
        className="w-full mx-auto overflow-hidden relative"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
        }}
        aria-labelledby="marquee-heading"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex items-center w-max gap-12 md:gap-20"
        >
          {marqueeSponsors.map((sponsor, i) => (
            <div
              key={`${sponsor.name}-${i}`}
              className="flex items-center gap-2.5 flex-shrink-0 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              {sponsor.logo ? (
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`} 
                  loading="lazy"
                  decoding="async"
                  className="h-8 md:h-10 w-auto object-contain" 
                  width="120"
                  height="40"
                />
              ) : (
                <span className="font-display font-medium text-xl md:text-2xl text-white">
                  {sponsor.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
