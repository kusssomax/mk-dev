import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  detail?: string;
  className?: string;
  detailClassName?: string;
}

const SectionHeading = ({
  title,
  detail,
  className,
  detailClassName,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "mb-12 flex items-baseline justify-between font-mono text-[13px] tracking-[0.08em] text-primary uppercase sm:mb-20",
        className
      )}
    >
      <span>
        {title}
      </span>
      {detail && (
        <span className={cn("text-muted-foreground", detailClassName)}>{detail}</span>
      )}
    </div>
  );
};

export default SectionHeading;
