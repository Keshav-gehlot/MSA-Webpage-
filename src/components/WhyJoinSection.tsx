import { motion } from "motion/react";
import { BookOpen, Hammer, Rocket } from "lucide-react";

export function WhyJoinSection() {
  const pillars = [
    {
      icon: BookOpen,
      title: "Learn",
      desc: "Gain exclusive access to Microsoft training modules, certifications, and hands-on workshops with industry experts.",
      color: "from-blue-500/20 to-cyan-400/20",
      iconColor: "text-cyan-400"
    },
    {
      icon: Hammer,
      title: "Build",
      desc: "Apply your knowledge by building real-world applications using modern AI, cloud, and edge technologies.",
      color: "from-purple-500/20 to-violet-400/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Rocket,
      title: "Lead",
      desc: "Empower your local tech community by organizing hackathons, speaking at events, and mentoring peers.",
      color: "from-fuchsia-500/20 to-pink-400/20",
      iconColor: "text-fuchsia-400"
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-surface-light/50 backdrop-blur-sm border-y border-white/5" id="why-join">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-accent-violet text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Our Mission</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4">
            Why Join MSA?
          </h2>
          <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto font-light leading-relaxed">
            Accelerate your career, build lasting connections, and make an impact on your campus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl p-px bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 mix-blend-screen" 
                   style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
              
              <div className="relative h-full bg-surface/80 backdrop-blur-xl rounded-[calc(1.5rem-1px)] p-8 overflow-hidden flex flex-col items-center text-center">
                 {/* Internal glow */}
                 <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${pillar.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`} />
                 
                 <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-white/20 transition-all duration-700 relative">
                   <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 bg-current rounded-2xl blur-md transition-opacity duration-700 ${pillar.iconColor}`} />
                   <pillar.icon size={28} className={pillar.iconColor} strokeWidth={1.5} />
                 </div>

                 <h3 className="text-2xl font-medium text-white mb-4">{pillar.title}</h3>
                 <p className="text-text-muted text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
