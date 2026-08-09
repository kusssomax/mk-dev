"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { NAV_LINKS } from "@/lib/nav-links";
import { useMagnetic } from "@/hooks/useMagnetic";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const resumeMagnetic = useMagnetic();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav
        aria-label="Primary"
        className="fixed top-3.5 left-1/2 z-200 flex w-[calc(100vw_-_32px)] -translate-x-1/2 items-center justify-between gap-0.5 border border-sidebar-border bg-sidebar/86 py-3 px-3.5 backdrop-blur-[14px] sm:top-5 sm:w-auto sm:justify-start sm:py-2 sm:px-4 sm:pl-[22px]"
      >
        <a
          href="#hero"
          onClick={closeMenu}
          className="w-10 sm:w-12"
        >
          <Image
            src="/icons/MKLogo.svg"
            alt="MK Logo"
            width={50}
            height={50}
            className="h-10 w-10 sm:h-12 sm:w-12"
          />
        </a>

        <div className="hidden items-center gap-0.5 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2.5 font-sans text-sm leading-none text-sidebar-foreground/75 no-underline transition-colors hover:text-sidebar-foreground"
            >
              {link.label}
            </a>
          ))}
          <motion.a
            href="https://drive.google.com/file/d/1kzjK4ItaxObQGCLQYDfW2y7-GYuAjzkn/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={resumeMagnetic.style}
            onMouseMove={resumeMagnetic.onMouseMove}
            onMouseLeave={resumeMagnetic.onMouseLeave}
            className="ml-2 bg-primary px-[18px] py-2.5 font-sans text-[13px] leading-none font-semibold whitespace-nowrap text-primary-foreground no-underline transition-colors hover:bg-accent"
          >
            Resume
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          className="flex size-8 flex-col items-center justify-center gap-[5px] bg-transparent sm:hidden"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="block h-0.5 w-full bg-sidebar-foreground"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="block h-0.5 w-full bg-sidebar-foreground"
          />
        </button>
      </nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
