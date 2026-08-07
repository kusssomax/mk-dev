"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/features/home/components/SectionHeading";
import { EASE_OUT } from "@/lib/easing";
import { ABOUT_HEADLINE, ABOUT_PARAGRAPH } from "@/features/home/data/about-content";
import { SKILL_GROUPS } from "@/features/home/data/skill-groups";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="bg-background px-5 pt-27.5 pb-22.5 text-foreground sm:px-12 sm:pt-45 sm:pb-40"
    >
      <div className="mx-auto max-w-310">
        <SectionHeading title="About" detail="Who I am" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(300px,1.2fr)_minmax(280px,1fr)] lg:gap-25">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="m-0 mb-8 text-[clamp(26px,4vw,46px)] leading-[1.2] font-semibold tracking-[-0.01em]">
              {ABOUT_HEADLINE.before}
              <span className="text-primary">{ABOUT_HEADLINE.accent}</span>
              {ABOUT_HEADLINE.after}
            </p>
            <p className="m-0 max-w-130 text-[17px] leading-[1.7] font-normal text-muted-foreground">
              {ABOUT_PARAGRAPH}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
          >
            <div className="mb-6 font-mono text-[13px] tracking-widest text-muted-foreground uppercase">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
