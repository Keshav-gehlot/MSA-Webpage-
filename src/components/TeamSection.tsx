import { motion } from "motion/react";
import { Linkedin, Github } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

export function TeamSection() {
  const team = [
    { name: "Alex Chen", role: "Gold Ambassador", domain: "AI & Cloud", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80" },
    { name: "Sarah Jenkins", role: "Gold Ambassador", domain: "Community", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
    { name: "David Kim", role: "Technical Lead", domain: "Web Dev", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    { name: "Maya Patel", role: "Design Lead", domain: "UI/UX", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-surface-light/50 backdrop-blur-sm border-y border-white/5" id="team">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Leadership</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Meet the Team
            </h2>
          </div>
          <p className="text-sm md:text-base text-text-muted max-w-md font-light leading-relaxed">
            The passionate students driving innovation, organizing events, and building the local tech ecosystem.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col p-4 rounded-3xl bg-base border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="w-full aspect-square rounded-2xl bg-surface overflow-hidden relative mb-5">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent opacity-80" />
                
                {/* Overlay Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  <MagneticWrapper strength={0.4}>
                    <a href="#" className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Linkedin size={14} />
                    </a>
                  </MagneticWrapper>
                  <MagneticWrapper strength={0.4}>
                    <a href="#" className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Github size={14} />
                    </a>
                  </MagneticWrapper>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-text-muted font-medium">
                    {member.domain}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white">{member.name}</h3>
                <p className="text-sm text-accent-purple font-medium mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

