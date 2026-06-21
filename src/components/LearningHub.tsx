import { AppWindow, Cloud, Code2, Database, Shield, Palette, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export function LearningHub() {
  const categories = [
    { icon: Database, title: "AI & Machine Learning", desc: "Build intelligent apps using Azure OpenAI and foundation models.", level: "Advanced", colSpan: "md:col-span-2", featured: true },
    { icon: Cloud, title: "Cloud Architecture", desc: "Master scaling and deployment with Azure.", level: "Intermediate" },
    { icon: Code2, title: "Web Development", desc: "Full-stack apps with modern frameworks.", level: "Beginner" },
    { icon: Shield, title: "Cybersecurity", desc: "Essential security and identity protocols.", level: "All Levels" },
    { icon: Palette, title: "UI/UX Design", desc: "Crafting beautiful digital experiences.", level: "Beginner" },
    { icon: AppWindow, title: "Career Growth", desc: "Resume building and interview prep.", level: "All Levels" },
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-surface/50 backdrop-blur-sm border-y border-white/5" id="learning">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-accent-purple text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Pathways</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Learning Hub
            </h2>
          </div>
          <p className="text-sm md:text-base text-text-muted max-w-md font-light leading-relaxed">
            Curated resources, workshops, and pathways designed to take you from foundational concepts to advanced edge computing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "group relative p-6 md:p-8 rounded-3xl bg-base border border-white/5 hover:border-white/20 transition-all cursor-pointer flex flex-col",
                item.colSpan
              )}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent-purple/5 via-transparent to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-12 md:mb-16">
                <item.icon size={28} className={cn("transition-colors stroke-[1.5]", item.featured ? "text-accent-blue" : "text-text-muted group-hover:text-white")} />
                <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-text-dim group-hover:border-white/20 transition-colors">
                  {item.level}
                </span>
              </div>
              
              <div className="mt-auto">
                <h3 className={cn("font-medium text-white mb-2 flex items-center justify-between", item.featured ? "text-2xl" : "text-lg")}>
                  {item.title}
                  <ArrowUpRight size={18} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-accent-blue" />
                </h3>
                <p className="text-sm text-text-dim leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

