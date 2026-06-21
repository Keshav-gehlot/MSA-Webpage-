import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Counter({ from, to, suffix = "", label }: { from: number, to: number, suffix?: string, label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => setValue(Math.round(v))
      });
      return controls.stop;
    }
  }, [isInView, from, to]);

  return (
    <div className="flex flex-col items-center text-center gap-2" ref={ref}>
       <div className="text-3xl md:text-5xl font-display font-medium text-white">
         {value}{suffix}
       </div>
       <div className="text-text-dim text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em]">{label}</div>
    </div>
  );
}

export function ImpactSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto rounded-3xl bg-surface border border-white/5 px-6 py-12 md:p-16 relative overflow-hidden flex flex-col items-center">
        {/* Decorative glows */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent-purple/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center mb-12 md:mb-16">
           <h2 className="text-xl md:text-2xl font-display font-medium text-white mb-2">Our Global Impact</h2>
           <p className="text-text-muted text-sm md:text-base font-light">The scale of our community-driven innovation.</p>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 w-full">
          <Counter from={0} to={500} suffix="+" label="Members" />
          <Counter from={0} to={50} suffix="+" label="Events" />
          <Counter from={0} to={100} suffix="K+" label="Code Commits" />
          <Counter from={0} to={25} suffix="+" label="Speakers" />
        </div>
      </div>
    </section>
  );
}

