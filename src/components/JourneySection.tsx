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
    { num: "01", title: "Join", desc: "Become part of the local community.", color: "text-cyan-400", borderColor: "border-cyan-400", bgGlow: "bg-cyan-400/50" },
    { num: "02", title: "Learn", desc: "Access Microsoft training & resources.", color: "text-blue-400", borderColor: "border-blue-400", bgGlow: "bg-blue-400/50" },
    { num: "03", title: "Build", desc: "Apply knowledge to real projects.", color: "text-indigo-400", borderColor: "border-indigo-400", bgGlow: "bg-indigo-400/50" },
    { num: "04", title: "Lead", desc: "Organize events and mentor peers.", color: "text-purple-400", borderColor: "border-purple-400", bgGlow: "bg-purple-400/50" },
    { num: "05", title: "Ambassador", desc: "Earn official Microsoft recognition.", color: "text-fuchsia-400", borderColor: "border-fuchsia-400", bgGlow: "bg-fuchsia-400/50" },
  ];

  return (
    <section className="py-[120px] px-6 bg-transparent overflow-hidden" id="journey">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Roadmap</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white">
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
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 origin-left"
            style={{ scaleX: widthProgress }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative pt-12">
            {steps.map((step, i) => {
              const start = Math.max(0, (i - 0.5) / 4);
              const end = Math.max(0.01, i / 4);
              const dotOpacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
              const dotScale = useTransform(scrollYProgress, [start, end], [0.8, 1.2]);

              return (
                <div key={step.num} className="relative group flex flex-row md:flex-col items-start gap-6 md:gap-0">
                  {/* The dot on the timeline */}
                  <motion.div 
                    className={`absolute -top-[55px] md:-top-[54px] left-2 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-surface-1 border-[3px] ${step.borderColor} z-10 hidden md:block`}
                    style={{ opacity: dotOpacity, scale: dotScale }}
                  >
                     <motion.div 
                       className={`absolute inset-0 ${step.bgGlow} blur-sm rounded-full`}
                       animate={{ opacity: [0.3, 0.8, 0.3] }}
                       transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                     />
                  </motion.div>

                  <motion.div 
                    className="flex-1 text-left md:text-center px-2"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className={`${step.color} font-mono text-xs md:text-sm tracking-widest font-semibold block mb-2`}>{step.num}</span>
                    <h3 className="text-white font-medium text-lg md:text-xl mb-2">{step.title}</h3>
                    <p className="text-text-dim text-sm leading-relaxed max-w-[200px] mx-auto md:text-center">{step.desc}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
