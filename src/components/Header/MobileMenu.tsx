"use client";

import { AnimatePresence, motion } from "motion/react";

import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/easing";
import { listVariants, linkVariants } from "./data/MobileMenu.animations";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="fixed inset-0 z-[240] bg-sidebar/60 backdrop-blur-[6px]"
          />
          <motion.div
            key="panel"
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="fixed left-1/2 top-[68px] z-[250] w-[calc(100vw-32px)] -translate-x-1/2 border border-border bg-background p-7 pb-8 text-foreground shadow-[0_24px_60px_rgba(21,15,13,0.35)] sm:top-[84px] sm:w-[440px]"
          >
            <div className="mb-9 flex items-center justify-between border-b border-border pb-5">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
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

            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  variants={linkVariants}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={cn(
                    "flex items-baseline py-3.5 px-1 text-foreground no-underline transition-colors hover:text-primary",
                    i !== 0 && "border-t border-border"
                  )}
                >
                  <span className="font-big-shoulders text-[clamp(28px,8vw,44px)] font-extrabold leading-none tracking-[-0.01em]">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            <a
              href="#"
              onClick={onClose}
              className="mt-8 block bg-primary p-[18px] text-center font-sans text-[15px] font-semibold text-primary-foreground no-underline hover:bg-accent"
            >
              Download Resume
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
