"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/features/home/data/social-links";
import { NAME_LETTERS } from "@/features/home/data/name-letters";
import { EASE_OUT } from "@/lib/easing";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useHeroTerrainCanvas } from "@/features/home/hooks/useHeroTerrainCanvas";

const Hero = () => {
  const canvasRef = useHeroTerrainCanvas();
  const ctaMagnetic = useMagnetic();

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-140 flex-col justify-end overflow-hidden bg-sidebar px-5 pb-10 sm:min-h-160 sm:px-12 sm:pb-16"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_50%_20%,transparent_0%,var(--sidebar)_78%)]"
      />

      <div className="relative z-2 max-w-300">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
          className="mb-4.5 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.08em] text-sidebar-foreground/70 uppercase sm:mb-7 sm:text-[13px]"
        >
          <motion.span
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="size-2 rounded-full bg-primary"
          />
          Available for new projects — remote, worldwide
        </motion.div>

        <h1 className="m-0 font-big-shoulders text-[clamp(56px,13vw,190px)] leading-[0.88] font-black tracking-[-0.02em] text-sidebar-foreground">
          {NAME_LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: letter.delay, ease: EASE_OUT }}
              className={cn("inline-block", letter.accent && "text-primary")}
            >
              {letter.char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT }}
          className="mt-5 mb-8 max-w-150 text-[clamp(15px,2vw,22px)] leading-normal font-normal text-sidebar-foreground/70 sm:mt-7 sm:mb-10"
        >
          Full-stack engineer. I design and ship fast, precise products end to
          end — React and Next.js on the front, Node.js underneath.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE_OUT }}
          className="flex flex-col flex-wrap gap-5 sm:flex-row sm:items-center sm:gap-8"
        >
          <motion.a
            href="#projects"
            style={ctaMagnetic.style}
            onMouseMove={ctaMagnetic.onMouseMove}
            onMouseLeave={ctaMagnetic.onMouseLeave}
            className="inline-flex items-center gap-2.5 bg-primary px-7 py-4 font-sans text-[15px] font-semibold text-primary-foreground no-underline transition-colors hover:bg-accent"
          >
            View Work <ArrowRight className="size-4" aria-hidden="true" />
          </motion.a>

          <div className="flex flex-wrap gap-5.5 font-mono text-[13px]">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sidebar-foreground/70 no-underline transition-colors hover:text-sidebar-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute right-5 bottom-4 z-2 hidden flex-col items-center gap-2.5 sm:right-12 sm:bottom-6 sm:flex">
        <span className="font-mono text-[11px] tracking-[0.15em] text-sidebar-foreground/70 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-sidebar-foreground/70"
        />
      </div>
    </section>
  );
};

export default Hero;
