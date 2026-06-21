import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { MagneticWrapper } from "./MagneticWrapper";

export function EventsSection() {
  const events = [
    { date: "Oct 15", status: "Featured", title: "Global AI Hackathon", desc: "Build the future with generative AI models. 48 hours of coding, mentoring, and prizes from Microsoft.", format: "Online", featured: true },
    { date: "Oct 28", status: "Upcoming", title: "Azure Cloud Fundamentals", desc: "A deep dive into cloud architecture and deployment strategies with Microsoft experts.", format: "Hybrid", featured: false },
    { date: "Nov 05", status: "Open", title: "UI/UX Design Sprint", desc: "Learn accessibility standards, structure, and design thinking methodologies.", format: "In-Person", featured: false },
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-transparent" id="events">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="text-accent-violet text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Agenda</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
            Upcoming Events
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-8 space-y-8 md:space-y-12">
          {events.map((evt, i) => (
            <motion.div 
              key={evt.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline dot */}
              <div className={cn(
                "absolute w-3 h-3 rounded-full -left-[5px] top-4 md:-left-[38px]",
                evt.featured ? "bg-accent-blue shadow-[0_0_12px_rgba(0,217,255,0.8)]" : "bg-white/20"
              )} />
              
              <div className={cn(
                "group p-6 md:p-8 rounded-3xl bg-surface border transition-colors cursor-pointer block hover:border-white/20",
                evt.featured ? "border-white/10 relative overflow-hidden" : "border-white/5"
              )}>
                
                {evt.featured && (
                  <div className="absolute top-0 right-0 p-4 opacity-10 md:opacity-5">
                    <svg width="100" height="100" viewBox="0 0 100 100" className="fill-white"><path d="M0,0 L100,0 L100,100 Z" /></svg>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3 text-xs md:text-sm font-medium">
                    <span className="text-white flex items-center gap-1.5"><Calendar size={16} className="text-accent-violet" /> {evt.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] md:text-xs tracking-wide border",
                      evt.status === "Featured" ? "bg-accent-blue/10 border-accent-blue/20 text-accent-blue" : "bg-white/5 border-white/10 text-white"
                    )}>{evt.status}</span>
                  </div>
                  <span className="text-text-dim text-xs md:text-sm flex items-center gap-1.5"><MapPin size={16} /> {evt.format}</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={cn("font-medium text-white mb-2", evt.featured ? "text-2xl" : "text-xl")}>{evt.title}</h3>
                    <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6 max-w-xl">{evt.desc}</p>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-accent-blue transition-colors">
                  View Details <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <MagneticWrapper>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors border-b border-white/10 hover:border-white pb-1">
              Browse full calendar <ArrowUpRight size={14} />
            </a>
          </MagneticWrapper>
        </motion.div>
      </div>
    </section>
  );
}

