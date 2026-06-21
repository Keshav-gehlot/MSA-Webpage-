import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "../lib/utils";

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const widthProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { num: "01", title: "Join", desc: "Become part of the local community." },
    { num: "02", title: "Learn", desc: "Access Microsoft training & resources." },
    { num: "03", title: "Build", desc: "Apply knowledge to real projects." },
    { num: "04", title: "Lead", desc: "Organize events and mentor peers." },
    { num: "05", title: "Ambassador", desc: "Earn official Microsoft recognition." },
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-transparent overflow-hidden" id="journey">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Roadmap</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Ambassador Journey
            </h2>
          </div>
          <p className="text-sm md:text-base text-text-muted max-w-md font-light leading-relaxed">
            A clear path to growing your skills, expanding your network, and earning official recognition from Microsoft.
          </p>
        </div>

        <div className="relative mt-20 md:mt-32" ref={containerRef}>
          {/* Background Track */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5" />
          
          {/* Animated Fill Track */}
          <motion.div 
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-violet origin-left"
            style={{ width: widthProgress }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative pt-12">
            {steps.map((step, i) => {
              const dotOpacity = useTransform(scrollYProgress, [(i - 0.5) / 4, i / 4], [0.2, 1]);
              const dotScale = useTransform(scrollYProgress, [(i - 0.5) / 4, i / 4], [0.8, 1.2]);

              return (
                <div key={step.num} className="relative group flex flex-row md:flex-col items-start gap-6 md:gap-0">
                  {/* The dot on the timeline */}
                  <motion.div 
                    className="absolute -top-[55px] md:-top-[54px] left-2 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-base border-[3px] border-accent-purple z-10 hidden md:block"
                    style={{ opacity: dotOpacity, scale: dotScale }}
                  >
                     <div className="absolute inset-0 bg-accent-blue/50 blur-sm rounded-full" />
                  </motion.div>

                  <div className="flex-1 text-left md:text-center px-2">
                    <span className="text-accent-purple/50 font-mono text-xs md:text-sm tracking-widest font-semibold block mb-2">{step.num}</span>
                    <h3 className="text-white font-medium text-lg md:text-xl mb-2">{step.title}</h3>
                    <p className="text-text-dim text-sm leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
