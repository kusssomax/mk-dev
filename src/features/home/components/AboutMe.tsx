"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/features/home/components/SectionHeading";
import { useScrollReveal } from "@/features/home/hooks/useScrollReveal";
import { ABOUT_HEADLINE, ABOUT_PARAGRAPH } from "@/features/home/data/about-content";
import { SKILL_GROUPS } from "@/features/home/data/skill-groups";

const REVEAL_TRANSITION = "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";

const AboutMe = () => {
  const { ref: sectionRef, revealed } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-background px-5 pt-[110px] pb-[90px] text-foreground sm:px-12 sm:pt-[180px] sm:pb-[160px]"
    >
      <div className="mx-auto max-w-310">
        <SectionHeading num="01" title="About" detail="Who I am" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(300px,1.2fr)_minmax(280px,1fr)] lg:gap-25">
          <div
            className={cn(
              REVEAL_TRANSITION,
              revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <p className="m-0 mb-8 text-[clamp(26px,4vw,46px)] leading-[1.2] font-semibold tracking-[-0.01em]">
              {ABOUT_HEADLINE.before}
              <span className="text-primary">{ABOUT_HEADLINE.accent}</span>
              {ABOUT_HEADLINE.after}
            </p>
            <p className="m-0 max-w-130 text-[17px] leading-[1.7] font-normal text-muted-foreground">
              {ABOUT_PARAGRAPH}
            </p>
          </div>

          <div
            style={{ transitionDelay: revealed ? "120ms" : "0ms" }}
            className={cn(
              REVEAL_TRANSITION,
              revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <div className="mb-6 font-mono text-[13px] tracking-[0.1em] text-muted-foreground uppercase">
              Stack
            </div>

            {SKILL_GROUPS.map((group) => (
              <div key={group.name} className="mb-7 last:mb-0">
                <div className="mb-3 font-sans text-sm font-semibold">{group.name}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="skill">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
