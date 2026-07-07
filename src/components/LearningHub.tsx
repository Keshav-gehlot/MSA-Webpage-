import { AppWindow, Cloud, Code2, Database, Shield, Palette, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export function LearningHub() {
  const categories = [
    { icon: Database, title: "AI & Machine Learning", desc: "Build intelligent apps using Azure OpenAI and foundation models.", level: "Advanced", colSpan: "md:col-span-2", featured: true, iconColor: "text-blue-400", bgGlow: "bg-blue-500/10", borderTop: "border-t-blue-500", levelColor: "text-red-400 border-red-400/30 bg-red-400/10" },
    { icon: Cloud, title: "Cloud Architecture", desc: "Master scaling and deployment with Azure.", level: "Intermediate", iconColor: "text-cyan-400", bgGlow: "bg-cyan-500/10", borderTop: "border-t-cyan-500", levelColor: "text-amber-400 border-amber-400/30 bg-amber-400/10" },
    { icon: Code2, title: "Web Development", desc: "Full-stack apps with modern frameworks.", level: "Beginner", iconColor: "text-green-400", bgGlow: "bg-green-500/10", borderTop: "border-t-green-500", levelColor: "text-green-400 border-green-400/30 bg-green-400/10" },
    { icon: Shield, title: "Cybersecurity", desc: "Essential security and identity protocols.", level: "All Levels", iconColor: "text-red-400", bgGlow: "bg-red-500/10", borderTop: "border-t-red-500", levelColor: "text-gray-300 border-white/10 bg-white/5" },
    { icon: Palette, title: "UI/UX Design", desc: "Crafting beautiful digital experiences.", level: "Beginner", iconColor: "text-pink-400", bgGlow: "bg-pink-500/10", borderTop: "border-t-pink-500", levelColor: "text-green-400 border-green-400/30 bg-green-400/10" },
    { icon: AppWindow, title: "Career Growth", desc: "Resume building and interview prep.", level: "All Levels", iconColor: "text-indigo-400", bgGlow: "bg-indigo-500/10", borderTop: "border-t-indigo-500", levelColor: "text-gray-300 border-white/10 bg-white/5" },
  ];

  return (
    <section className="py-[120px] px-6 bg-transparent" id="learning">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Pathways</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white">
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
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative p-6 md:p-8 rounded-3xl bg-surface-1 border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden",
                item.colSpan
              )}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${item.borderTop} border-t-2 opacity-70 group-hover:opacity-100 transition-opacity`} />
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${item.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              <div className="flex justify-between items-start mb-12 md:mb-16 relative z-10">
                <div className={`w-16 h-16 rounded-2xl ${item.bgGlow} border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-700 relative`}>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 bg-current rounded-2xl blur-md transition-opacity duration-700 ${item.iconColor}`} />
                  <item.icon size={28} className={cn("transition-colors stroke-[1.5]", item.iconColor)} />
                </div>
                <span className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${item.levelColor}`}>
                  {item.level}
                </span>
              </div>
              
              <div className="mt-auto relative z-10">
                <h3 className={cn("font-medium text-white mb-2 flex items-center justify-between", item.featured ? "text-2xl" : "text-lg")}>
                  {item.title}
                  <ArrowUpRight size={18} className={`opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all ${item.iconColor}`} />
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

