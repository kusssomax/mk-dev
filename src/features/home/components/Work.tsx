import SectionHeading from "@/features/home/components/SectionHeading";
import ProjectCard from "@/features/home/components/ProjectCard";
import { PROJECTS, PROJECTS_RANGE } from "@/features/home/data/projects";

const Work = () => {
  return (
    <section
      id="projects"
      className="bg-card px-5 py-22.5 text-card-foreground sm:px-12 sm:py-40"
    >
      <div className="mx-auto max-w-310">
        <SectionHeading title="Work" detail={PROJECTS_RANGE} />

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-[repeat(auto-fit,minmax(380px,1fr))]">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
