"use client";

import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/features/home/data/social-links";
import { NAME_LETTERS } from "@/features/home/data/name-letters";
import { magneticMove, magneticLeave } from "@/features/home/lib/magnetic-hover";
import { useHeroTerrainCanvas } from "@/features/home/hooks/useHeroTerrainCanvas";

const Hero = () => {
  const canvasRef = useHeroTerrainCanvas();

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
        <div className="mb-4.5 flex animate-hero-fade items-center gap-2.5 font-mono text-[11px] tracking-[0.08em] text-sidebar-foreground/70 uppercase [animation-delay:0.7s] motion-reduce:animate-none sm:mb-7 sm:text-[13px]">
          <span className="size-2 animate-pulse-dot rounded-full bg-primary motion-reduce:animate-none" />
          Available for new projects — remote, worldwide
        </div>

        <h1 className="m-0 font-big-shoulders text-[clamp(56px,13vw,190px)] leading-[0.88] font-black tracking-[-0.02em] text-sidebar-foreground">
          {NAME_LETTERS.map((letter, i) => (
            <span
              key={i}
              className={cn(
                "inline-block animate-letter-in motion-reduce:animate-none",
                letter.accent && "text-primary"
              )}
              style={{ animationDelay: letter.delay }}
            >
              {letter.char}
            </span>
          ))}
        </h1>

        <p className="mt-5 mb-8 max-w-150 animate-hero-fade text-[clamp(15px,2vw,22px)] leading-normal font-normal text-sidebar-foreground/70 [animation-delay:0.55s] motion-reduce:animate-none sm:mt-7 sm:mb-10">
          Full-stack engineer. I design and ship fast, precise products end to
          end — React and Next.js on the front, Node.js underneath.
        </p>

        <div className="flex flex-col animate-hero-fade flex-wrap gap-5 [animation-delay:0.75s] motion-reduce:animate-none sm:flex-row sm:items-center sm:gap-8">
          <a
            href="#projects"
            onMouseMove={magneticMove}
            onMouseLeave={magneticLeave}
            className="inline-flex items-center gap-2.5 bg-primary px-7 py-4 font-sans text-[15px] font-semibold text-primary-foreground no-underline transition-colors hover:bg-accent"
          >
            View Work <span>→</span>
          </a>

          <div className="flex flex-wrap gap-5.5 font-mono text-[13px]">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sidebar-foreground/70 no-underline transition-colors hover:text-sidebar-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-5 bottom-4 z-2 hidden flex-col items-center gap-2.5 sm:right-12 sm:bottom-6 sm:flex">
        <span className="font-mono text-[11px] tracking-[0.15em] text-sidebar-foreground/70 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="h-10 w-px animate-bounce-arrow bg-sidebar-foreground/70 motion-reduce:animate-none" />
      </div>
    </section>
  );
};

export default Hero;
