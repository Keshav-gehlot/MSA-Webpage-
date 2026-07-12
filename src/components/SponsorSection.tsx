import { motion, useAnimationControls } from "motion/react";
import { Cloud, Database, Send, Shield, Code2, AppWindow, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticWrapper } from "./MagneticWrapper";
import { useState, useEffect } from "react";

export function SponsorSection() {
  const sponsors = [
    { name: "GitHub", logo: "/sponsors/github.svg" },
    { name: "Microsoft" },
    { name: "HackerEarth", logo: "/sponsors/hackerearth.svg" },
    { name: "Azure" },
    { name: "Zebronics" },
    { name: "Bitgrit" },
    { name: "Bewakoof" },
    { name: "The Souled Store" },
    { name: "Subway" },
    { name: "Monster Energy" },
    { name: "Roll Over Ice Creams" },
    { name: "Sunschool" },
    { name: "Forech" },
    { name: "Streams" },
    { name: "Rock N Roll Café" },
    { name: ".xyz" },
    { name: "CodeSizzler" },
    { name: "Altruisty" },
    { name: "Interview Cake" }
  ];

  const controls = useAnimationControls();
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    if (!mediaQuery.matches) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        }
      });
    }
  }, [controls]);

  return (
    <section className="py-[120px] px-6 relative overflow-hidden bg-transparent" id="sponsors">
      
      {/* Soft radial glow behind the logo wall */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-screen-xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Animated Line drawing down */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 60, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-px bg-gradient-to-b from-transparent to-accent-blue/50 mb-8"
        />

        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-4 block"
          >
            [ system::partners ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-display font-medium text-white mb-6"
          >
            Access our talent pipeline.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base text-text-muted max-w-2xl mx-auto font-light leading-relaxed mb-8"
          >
            Your logo on a banner does nothing. We scope partnerships around hiring, product feedback, and community engagement. No ambiguity, no scope creep.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <MagneticWrapper>
              <Link to="/sponsors" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-white font-medium hover:bg-accent-blue/20 transition-all duration-300">
                View partnership tiers
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>

        {/* Marquee Container */}
        {isReducedMotion ? (
          <div className="flex flex-wrap justify-center items-center max-w-4xl mx-auto gap-8 md:gap-x-16 md:gap-y-12">
            {sponsors.map((sponsor, i) => (
              <div
                key={sponsor.name}
                className="flex items-center gap-2.5 opacity-60 hover:opacity-100 flex-shrink-0 transition-all duration-500 text-white"
              >
                {sponsor.logo ? (
                  <img src={sponsor.logo} alt={sponsor.name} className="h-8 md:h-10 w-auto object-contain" />
                ) : (
                  <span className="font-display font-medium text-xl md:text-2xl">{sponsor.name}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="w-full max-w-6xl mx-auto overflow-hidden relative"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() => controls.start({
              x: ["0%", "-50%"],
              transition: {
                ease: "linear",
                duration: 35,
                repeat: Infinity,
              }
            })}
            aria-label="Our sponsors"
          >
            <motion.div
              animate={controls}
              className="flex items-center w-max gap-16 md:gap-24"
            >
              {/* First Set */}
              <div className="flex items-center gap-16 md:gap-24">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="flex items-center gap-2.5 flex-shrink-0 transition-all duration-300 cursor-pointer text-white grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                  >
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="h-8 md:h-10 w-auto object-contain" />
                    ) : (
                      <span className="font-display font-medium text-xl md:text-2xl">{sponsor.name}</span>
                    )}
                  </div>
                ))}
              </div>
              {/* Duplicate Set for Loop */}
              <div className="flex items-center gap-16 md:gap-24" aria-hidden="true">
                {sponsors.map((sponsor) => (
                  <div
                    key={`${sponsor.name}-dup`}
                    className="flex items-center gap-2.5 flex-shrink-0 transition-all duration-300 cursor-pointer text-white grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                  >
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="h-8 md:h-10 w-auto object-contain" />
                    ) : (
                      <span className="font-display font-medium text-xl md:text-2xl">{sponsor.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Curved Horizon Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] sm:w-[150vw] h-[300px] pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scaleY: 0.8 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-[800px] absolute top-[150px] border-t border-accent-blue/30 rounded-[100%]  "
        />
      </div>

    </section>
  );
}
