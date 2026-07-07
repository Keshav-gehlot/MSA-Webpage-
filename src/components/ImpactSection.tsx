import { useInView, motion } from "motion/react";
import { useRef } from "react";
import { Users, Presentation, Laptop, Award } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

function Counter({ from, to, suffix = "", label, icon: Icon, color, delay = 0 }: { from: number, to: number, suffix?: string, label: string, icon: any, color: string, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { displayValue, isFinished } = useCountUp(from, to, isInView, delay);

  return (
    <div className="flex flex-col items-center text-center gap-3 relative group" ref={ref}>
       <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 text-${color}-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(var(--${color}-rgb),0.2)]`}>
          <Icon size={24} strokeWidth={1.5} className={`text-${color}-400`} />
       </div>
       <motion.div 
         animate={isFinished ? { scale: [1, 1.05, 1] } : { scale: 1 }}
         transition={{ duration: 0.4 }}
         className="text-3xl md:text-5xl font-display font-medium text-white"
       >
         {displayValue}{suffix}
       </motion.div>
       <div className="text-text-dim text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em]">{label}</div>
    </div>
  );
}

export function ImpactSection() {
  return (
    <section className="py-[120px] px-6 bg-transparent">
      <div className="max-w-6xl mx-auto rounded-3xl bg-surface-1/50 border border-white/10 px-6 py-12 md:p-16 relative overflow-hidden flex flex-col items-center">
        {/* Showcase Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.05)_0%,rgba(109,93,251,0.05)_50%,transparent_100%)] blur-[40px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 text-center mb-16">
           <h2 className="text-xl md:text-2xl font-display font-medium text-white mb-2">Our Campus Impact</h2>
           <p className="text-text-muted text-sm md:text-base font-light">Driving technology adoption and student success at SRM Institute.</p>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 w-full divide-x-0 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-y-12">
          <Counter from={0} to={850} suffix="+" label="Active Students" icon={Users} color="cyan" delay={0.1} />
          <Counter from={0} to={12} suffix="" label="Technical Workshops" icon={Presentation} color="blue" delay={0.2} />
          <Counter from={0} to={45} suffix="+" label="Projects Shipped" icon={Laptop} color="purple" delay={0.3} />
          <Counter from={0} to={300} suffix="+" label="Azure Certifications" icon={Award} color="fuchsia" delay={0.4} />
        </div>
      </div>
    </section>
  );
}

