import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { MagneticWrapper } from "./MagneticWrapper";
import events from "../data/events.json";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const categories = ["All", "Workshop", "Hackathon", "Social"];

export function EventsSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const filteredEvents = currentCategory === "All" 
    ? events 
    : events.filter(e => e.category === currentCategory);

  const handleFilter = (cat: string) => {
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <section className="py-[120px] px-6 bg-transparent" id="events">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <div className="text-center mb-8 md:mb-12">
          <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Agenda</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-8">
            Past Events
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={cn(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  "px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300",
                  currentCategory === cat 
                    ? "bg-accent-blue text-white shadow-[0_0_15px_rgba(0,217,255,0.4)]" 
                    : "bg-white/5 text-text-muted hover:text-white hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          
          {/* Filled Animated Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-accent-blue origin-top" 
          />

          <div className="flex flex-col gap-12 relative">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    layout
                    key={evt.title}
                    initial={{ opacity: 0, y: 14, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      "flex w-full items-center justify-start relative pl-12 md:pl-0",
                      isEven ? "md:justify-start" : "md:justify-end"
                    )}
                  >
                    {/* Timeline dot */}
                    <div className={cn(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      "absolute left-[7px] md:left-1/2 -translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full z-10",
                      evt.featured ? "bg-accent-blue shadow-[0_0_12px_rgba(0,217,255,0.8)]" : "bg-white/20 border-2 border-base"
                    )} />
                    
                    <div className="w-full md:w-[45%]">
                      <div className={cn(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                        "group p-6 md:p-8 rounded-3xl bg-surface-1 border transition-colors cursor-pointer block hover:border-white/20",
                        evt.featured ? "border-white/10 relative overflow-hidden" : "border-white/10"
                      )}>
                        

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium">
                            <span className={cn(
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                              "px-2.5 py-1 rounded-full text-[10px] md:text-xs tracking-wide border flex items-center gap-1.5",
                              evt.status === "Completed" ? "bg-white/5 border-white/10 text-text-dim" : "bg-accent-blue/10 border-accent-blue/20 text-accent-blue"
                            )}>
                              <Calendar size={14} className={evt.status === "Completed" ? "opacity-50" : ""} /> {evt.status === "Completed" ? "Completed" : evt.date}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                            <span className="px-2.5 py-1 rounded-full text-[10px] md:text-xs tracking-wide border bg-accent-purple/10 border-accent-purple/20 text-accent-purple">
                              {evt.category}
                            </span>
                          </div>
                          <span className="text-text-dim text-xs md:text-sm flex items-center gap-1.5"><MapPin size={16} /> {evt.format}</span>
                        </div>
                        
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={cn(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black","font-medium text-white mb-2", evt.featured ? "text-2xl" : "text-xl")}>{evt.title}</h3>
                            <p className="text-sm md:text-base text-text-muted leading-relaxed mb-4 max-w-xl">{evt.desc}</p>
                            {evt.bullets && evt.bullets.length > 0 && (
                              <ul className="list-disc pl-5 mb-6 text-sm md:text-base text-text-muted space-y-1">
                                {evt.bullets.map((bullet: string, i: number) => (
                                  <li key={i}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        
                        {evt.repo && (
                          <a href={evt.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent-blue transition-colors mt-2">
                            View Project <ExternalLink size={16}  />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {filteredEvents.length === 0 && (
               <div className="text-center text-text-muted py-12">No events found for this category.</div>
            )}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center"
        >
          <MagneticWrapper>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors border-b border-white/10 hover:border-white pb-1">
              Browse full calendar <ExternalLink size={14} />
            </a>
          </MagneticWrapper>
        </motion.div>
      </div>
    </section>
  );
}

