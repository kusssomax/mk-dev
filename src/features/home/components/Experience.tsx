"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/features/home/components/SectionHeading";
import { EASE_OUT } from "@/lib/easing";
import { EXPERIENCE, EXPERIENCE_RANGE } from "@/features/home/data/experience";

const Experience = () => {
  return (
    <section
      id="experience"
      className="bg-sidebar px-5 py-22.5 text-sidebar-foreground sm:px-12 sm:py-40"
    >
      <div className="mx-auto max-w-310">
        <SectionHeading
          title="Experience"
          detail={EXPERIENCE_RANGE}
          detailClassName="text-sidebar-foreground/70"
        />

        <div>
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE_OUT }}
              className="grid grid-cols-1 gap-3 border-t border-sidebar-border px-2 py-7 transition-colors hover:bg-white/[0.03] sm:grid-cols-[minmax(110px,160px)_minmax(220px,1fr)_minmax(260px,1fr)] sm:gap-10 sm:px-0 sm:py-9"
            >
              <div className="font-mono text-sm text-sidebar-foreground/70 sm:pl-3">
                {job.dates}
              </div>

              <div>
                <div className="mb-1.5 font-sans text-xl font-semibold">{job.role}</div>
                <div className="font-sans text-[15px] text-primary">{job.company}</div>
              </div>

              <div>
                <p className="m-0 mb-4 max-w-110 text-[15px] leading-[1.6] text-sidebar-foreground/70">
                  {job.highlight}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="tag">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
