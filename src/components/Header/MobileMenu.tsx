import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[240] bg-sidebar/60 backdrop-blur-[6px] transition-opacity duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />
      <div
        id="mobile-nav-panel"
        className={cn(
          "fixed left-1/2 top-[68px] z-[250] w-[calc(100vw_-_32px)] -translate-x-1/2 border border-border bg-background p-7 pb-8 text-foreground shadow-[0_24px_60px_rgba(21,15,13,0.35)] transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:top-[84px] sm:w-[440px]",
          open ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="mb-9 flex items-center justify-between border-b border-border pb-5">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
            Navigate
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex size-8 items-center justify-center border border-border text-foreground"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-baseline py-3.5 px-1 text-foreground no-underline transition-colors hover:text-primary",
                i !== 0 && "border-t border-border"
              )}
            >
              <span className="mr-4 font-mono text-sm text-primary">{link.num}</span>
              <span className="font-big-shoulders text-[clamp(28px,8vw,44px)] font-extrabold leading-none tracking-[-0.01em]">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        <a
          href="#"
          onClick={onClose}
          className="mt-8 block bg-primary p-[18px] text-center font-sans text-[15px] font-semibold text-primary-foreground no-underline hover:bg-accent"
        >
          Download Resume
        </a>
      </div>
    </>
  );
};

export default MobileMenu;
