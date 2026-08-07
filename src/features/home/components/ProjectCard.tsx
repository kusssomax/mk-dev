"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useTilt } from "@/hooks/useTilt";
import { EASE_OUT } from "@/lib/easing";
import type { ProjectItem } from "@/features/home/data/projects";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const tilt = useTilt();

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_OUT }}
      style={tilt.style}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="group block text-inherit no-underline will-change-transform"
    >
      <div className="relative mb-5.5 aspect-4/3 w-full overflow-hidden bg-sidebar-accent">
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-sidebar to-sidebar-accent font-big-shoulders text-7xl font-black text-sidebar-foreground/10 transition-transform duration-500 group-hover:scale-110">
          {project.name.charAt(0)}
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 font-sans text-[22px] font-semibold">{project.name}</div>
          <p className="m-0 mb-3 max-w-100 font-sans text-[15px] leading-[1.55] text-muted-foreground">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="tagOutline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <ArrowRight
          aria-hidden="true"
          className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </motion.a>
  );
};

export default ProjectCard;
