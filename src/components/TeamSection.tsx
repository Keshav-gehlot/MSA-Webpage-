import { motion } from "motion/react";
import { MagneticWrapper } from "./MagneticWrapper";
import { useState, useEffect } from "react";
import teamData from "../data/team.json";
import { Github, Linkedin } from "lucide-react";
import { cn } from "../lib/utils";

function PlaceholderAvatar() {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden group">
      {/* Custom silhouette */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-24 h-24 relative z-10 transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none" 
        stroke="url(#avatar-gradient)" 
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      >
        <defs>
          <linearGradient id="avatar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-blue)" />
            <stop offset="100%" stopColor="var(--color-accent-purple)" />
          </linearGradient>
          
          <linearGradient id="avatar-gradient-hover" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-blue)" />
            <stop offset="100%" stopColor="var(--color-accent-purple)" />
          </linearGradient>
        </defs>
        
        <circle cx="50" cy="35" r="15" />
        <path d="M 25 85 C 25 65 35 58 50 58 C 65 58 75 65 75 85" strokeLinecap="round" />
        
        {/* We can use CSS to swap the stroke url on hover for non-touch */}
        <style>{`
          @media (hover: hover) and (pointer: fine) {
            .group:hover svg {
              stroke: url(#avatar-gradient-hover);
              filter: drop-shadow(0 0 8px rgba(109, 93, 251, 0.4));
            }
          }
        `}</style>
      </svg>
      
      {/* Scanline sweep */}
      {!reducedMotion && (
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ y: "-100%" }}
          animate={{ y: "200%" }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15) 50%, transparent)",
            height: "30%",
            width: "100%",
          }}
        />
      )}
      
      {/* Typography: [ pending::upload ] */}
      <div className="mt-4 font-mono text-[10px] md:text-xs text-text-muted/60 uppercase tracking-[0.2em]">
        [ pending::upload ]
      </div>
    </div>
  );
}

function TeamCard({ member }: { member: any, key?: any }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isPlaceholder = !member.img;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative w-full aspect-[3/4] [perspective:1000px] cursor-pointer group outline-none"
      onClick={handleFlip}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleFlip();
        }
      }}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-500 ring-offset-black focus-within:ring-2 focus-within:ring-accent-blue focus-within:ring-offset-2 rounded-3xl"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-surface-1 border border-white/10 rounded-3xl overflow-hidden flex flex-col items-center p-6 hover:border-white/20 transition-colors">
          <div className="flex-1 w-full flex items-center justify-center relative">
            {isPlaceholder ? (
              <PlaceholderAvatar />
            ) : (
              <img 
                src={member.img} 
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              />
            )}
          </div>
          
          <div className="mt-6 text-center w-full">
            <h3 className="text-xl md:text-2xl font-display font-semibold text-white truncate">
              {member.name}
            </h3>
            <p className="text-sm md:text-base text-accent-blue font-medium mt-1 truncate">
              {member.role}
            </p>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 [backface-visibility:hidden] bg-surface-1 border border-white/10 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 [transform:rotateY(180deg)] hover:border-white/20 transition-colors text-center"
        >
          {isPlaceholder || !member.bio ? (
            <div className="font-mono text-xs md:text-sm text-text-muted/60 uppercase tracking-[0.2em] mb-8">
              [ bio::pending ]
            </div>
          ) : (
            <p className="text-sm md:text-base text-text-muted leading-relaxed mb-8 line-clamp-6">
              {member.bio}
            </p>
          )}

          <div className="flex gap-4">
            <a 
              href={member.linkedin || "#"} 
              target={member.linkedin ? "_blank" : undefined}
              rel={member.linkedin ? "noopener noreferrer" : undefined}
              onClick={e => {
                e.stopPropagation();
                if (!member.linkedin) e.preventDefault();
              }}
              tabIndex={isFlipped ? 0 : -1}
              aria-disabled={!member.linkedin}
              className={cn(
                "p-3 rounded-full transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue",
                member.linkedin 
                  ? "bg-white/5 text-white hover:bg-white/10 hover:text-accent-blue" 
                  : "bg-transparent text-text-muted/30 cursor-not-allowed pointer-events-none"
              )}
            >
              <Linkedin size={20} />
            </a>
            <a 
              href={member.github || "#"} 
              target={member.github ? "_blank" : undefined}
              rel={member.github ? "noopener noreferrer" : undefined}
              onClick={e => {
                e.stopPropagation();
                if (!member.github) e.preventDefault();
              }}
              tabIndex={isFlipped ? 0 : -1}
              aria-disabled={!member.github}
              className={cn(
                "p-3 rounded-full transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
                member.github 
                  ? "bg-white/5 text-white hover:bg-white/10 hover:text-accent-purple" 
                  : "bg-transparent text-text-muted/30 cursor-not-allowed pointer-events-none"
              )}
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="py-[120px] px-6 bg-transparent" id="team">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent-blue text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Leadership</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-6">
            Meet the Team
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            We are always looking for passionate students to help drive innovation and build the local tech ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <MagneticWrapper>
            <a href="#contact" style={{ color: "#000" }} className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm">
              Reach out to join
            </a>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}