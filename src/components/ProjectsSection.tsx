import { ExternalLink, FolderGit2 } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import projects from "../data/projects.json";

export function ProjectsSection() {
  return (
    <section className="py-[120px] px-6 bg-transparent" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Open Source</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            A collection of tools, platforms, and experiments built by the MLSA SRM community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group p-6 md:p-8 rounded-3xl bg-surface-1 border border-white/10 transition-all hover:border-white/20 hover:-translate-y-1 flex flex-col md:flex-row gap-6 md:gap-8 h-full"
            >
              {/* Content area (left) */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-medium text-white text-xl md:text-2xl">{project.title}</h3>
                  {project.archived && (
                    <span className="px-2 py-1 rounded-md text-[10px] font-medium tracking-wide bg-white/5 text-text-dim uppercase border border-white/10 shrink-0 ml-3">
                      Archived
                    </span>
                  )}
                </div>
                
                <p className="text-sm md:text-base text-text-muted leading-relaxed mb-5">
                  {project.desc}
                </p>
                
                {project.bullets && project.bullets.length > 0 && (
                  <ul className="list-disc pl-5 mb-6 text-sm text-text-muted space-y-1 mt-auto">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                
                <div className="flex items-center gap-4 mt-auto pt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                    {project.tech}
                  </span>
                  
                  <a 
                    href={project.repo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent-blue transition-colors ml-auto relative z-10"
                  >
                    Repository <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              
              {/* Tile area (right) */}
              <a 
                href={project.repo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full md:w-32 lg:w-40 h-32 md:h-auto rounded-2xl border border-white/10 flex flex-col items-center justify-center shrink-0 transition-colors relative overflow-hidden bg-gradient-to-br from-accent-blue/10 via-transparent to-transparent group-hover:from-accent-blue/20 group-hover:via-accent-blue/10 group-hover:border-accent-blue/30"
              >
                <FolderGit2 size={32} className="text-white/60 mb-2 group-hover:text-accent-blue transition-colors relative z-10 group-hover:scale-110 duration-500" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
