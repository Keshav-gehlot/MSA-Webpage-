import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useMotionValueEvent } from "motion/react";
import { BookOpen, Hammer, Rocket } from "lucide-react";
import projectsData from "../data/projects.json";
import { useCountUp } from "../hooks/useCountUp";

export function WhyJoinSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMotion = () => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      setIsMobile(window.innerWidth < 768);
    };
    checkMotion();
    window.addEventListener("resize", checkMotion);
    return () => window.removeEventListener("resize", checkMotion);
  }, []);

  const totalProjects = projectsData.length;

  const stages = [
    {
      id: "learn",
      title: "Learn",
      icon: BookOpen,
      statValue: 12,
      statSuffix: "",
      statLabel: "Technical Workshops",
      copy: "Master Azure, AI, cloud, and Microsoft technologies through workshops and certifications.",
      color: "blue",
      rgb: "59, 130, 246",
    },
    {
      id: "build",
      title: "Build",
      icon: Hammer,
      statValue: totalProjects,
      statSuffix: "+",
      statLabel: "Projects Shipped",
      copy: "Create real-world projects, contribute to open source, and compete in hackathons.",
      color: "purple",
      rgb: "168, 85, 247",
    },
    {
      id: "lead",
      title: "Lead",
      icon: Rocket,
      statValue: 850,
      statSuffix: "+",
      statLabel: "Active Students",
      copy: "Organize events, mentor peers, and grow as a technology leader.",
      color: "violet",
      rgb: "139, 92, 246",
    }
  ];

  if (reducedMotion || isMobile) {
    return (
      <section className="py-32 px-6 bg-[#050816] overflow-hidden" id="about">
        <div className="max-w-4xl mx-auto space-y-32">
           {stages.map((stage) => (
              <MobileStage key={stage.id} stage={stage} />
           ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#050816]" id="about">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <Background washProgress={scrollYProgress} stages={stages} />
        
        {stages.map((stage, i) => (
          <DesktopStageWrapper key={stage.id} stage={stage} i={i} scrollYProgress={scrollYProgress} />
        ))}

        <ProgressIndicator progress={scrollYProgress} />
      </div>
    </section>
  );
}

function DesktopStageWrapper({ stage, i, scrollYProgress }: any) {
  const start = i * 0.333;
  const end = start + 0.333;
  
  const s1 = Math.max(0, start - 0.05);
  const s2 = Math.max(0.01, start + 0.05);
  const e1 = Math.min(0.99, end - 0.05);
  const e2 = Math.min(1, end + 0.05);

  const opacity = useTransform(scrollYProgress, [s1, s2, e1, e2], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [s1, s2, e1, e2], [50, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [s1, s2, e1, e2], [0.9, 1, 1, 1.1]);
  const pointerEvents = useTransform(scrollYProgress, [start, end], ["auto", "none"]);

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents: pointerEvents as any }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
    >
      <h2 className="text-[120px] md:text-[160px] font-display font-semibold tracking-tighter text-white leading-none mb-12">
        {stage.title}
      </h2>

      <IconAnimator scrollYProgress={scrollYProgress} start={start} Icon={stage.icon} color={stage.rgb} />
      
      <StatCounter scrollYProgress={scrollYProgress} start={start} end={end} value={stage.statValue} suffix={stage.statSuffix} label={stage.statLabel} color={stage.color} />

      <p className="mt-8 text-xl md:text-2xl text-white/50 max-w-xl mx-auto font-light leading-relaxed">
        {stage.copy}
      </p>
    </motion.div>
  )
}

function MobileStage({ stage }: { stage: any, key?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="text-center">
      <h2 className="text-6xl md:text-8xl font-display font-semibold tracking-tighter text-white leading-none mb-8">
        {stage.title}
      </h2>
      <div 
        className="w-24 h-24 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden"
        style={{ boxShadow: `0 0 40px -10px rgba(${stage.rgb}, 0.3)` }}
      >
         <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, rgb(${stage.rgb}), transparent 70%)` }} />
         <stage.icon size={48} strokeWidth={1.5} color="white" />
      </div>
      <StatCounter scrollYProgress={null} start={0} end={1} value={stage.statValue} suffix={stage.statSuffix} label={stage.statLabel} color={stage.color} forceActive={isInView} />
      <p className="mt-6 text-lg text-white/50 max-w-md mx-auto font-light leading-relaxed">
        {stage.copy}
      </p>
    </div>
  );
}

function IconAnimator({ scrollYProgress, start, Icon, color }: any) {
  const pathLength = useTransform(scrollYProgress, [start, start + 0.15], [0, 1]);
  
  return (
     <motion.div 
        className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden icon-animator-wrapper"
        style={{ 
          boxShadow: `0 0 40px -10px rgba(${color}, 0.3)`,
          "--path-progress": pathLength 
        } as any}
     >
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, rgb(${color}), transparent 70%)` }} />
        <Icon size={48} strokeWidth={1.5} color="white" className="relative z-10" />
        <style>{`
          .icon-animator-wrapper svg path,
          .icon-animator-wrapper svg line,
          .icon-animator-wrapper svg circle,
          .icon-animator-wrapper svg rect,
          .icon-animator-wrapper svg polyline,
          .icon-animator-wrapper svg polygon {
            stroke-dasharray: 1000;
            stroke-dashoffset: calc(1000 - (1000 * var(--path-progress)));
          }
        `}</style>
     </motion.div>
  )
}

function StatCounter({ scrollYProgress, start, end, value, suffix, label, color, forceActive = false }: any) {
  const [isActive, setIsActive] = useState(false);
  const dummyMotionValue = useMotionValue(0);
  const progressToUse = scrollYProgress || dummyMotionValue;

  useMotionValueEvent(progressToUse, "change", (latest: number) => {
    if (latest >= start && latest < end) {
      if (!isActive) setIsActive(true);
    } else {
      if (isActive) setIsActive(false);
    }
  });

  const { displayValue, isFinished } = useCountUp(0, value, forceActive || isActive, 0);

  return (
    <div className="flex flex-col items-center">
      <motion.div 
         animate={isFinished ? { scale: [1, 1.05, 1] } : { scale: 1 }}
         transition={{ duration: 0.4 }}
         className="text-5xl md:text-7xl font-display font-medium text-white mb-2"
      >
        {displayValue}{suffix}
      </motion.div>
      <div className={`text-sm md:text-base font-semibold uppercase tracking-widest text-${color}-400`}>
        {label}
      </div>
    </div>
  );
}

function Background({ washProgress, stages }: any) {
  const bg1 = useTransform(washProgress, [0, 0.33, 0.66], [0.15, 0, 0]);
  const bg2 = useTransform(washProgress, [0, 0.33, 0.66], [0, 0.15, 0]);
  const bg3 = useTransform(washProgress, [0.33, 0.66, 1], [0, 0, 0.15]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <motion.div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(${stages[0].rgb}, 1), transparent 70%)`, opacity: bg1 }} />
      <motion.div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(${stages[1].rgb}, 1), transparent 70%)`, opacity: bg2 }} />
      <motion.div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(${stages[2].rgb}, 1), transparent 70%)`, opacity: bg3 }} />
    </div>
  );
}

function ProgressIndicator({ progress }: { progress: any }) {
  const p1 = useTransform(progress, [0, 0.33], [0, 1]);
  const p2 = useTransform(progress, [0.33, 0.66], [0, 1]);
  const p3 = useTransform(progress, [0.66, 1], [0, 1]);

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden md:flex">
      {[p1, p2, p3].map((p, i) => (
        <div key={i} className="w-1.5 h-16 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="w-full h-full bg-white origin-top" style={{ scaleY: p }} />
        </div>
      ))}
    </div>
  );
}
