"use client";

import { useState, type SubmitEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";
import { EASE_OUT } from "@/lib/easing";
import SectionHeading from "@/features/home/components/SectionHeading";
import { SOCIAL_LINKS } from "@/features/home/data/social-links";
import {
  CONTACT_EMAIL,
  CONTACT_HEADLINE,
  CONTACT_SUCCESS_MESSAGE,
  MARQUEE_SPEED,
  MARQUEE_TEXT,
} from "@/features/home/data/contact";

const MotionButton = motion.create(Button);

const fieldClassName =
  "h-auto rounded-none border-0 border-b border-sidebar-border bg-transparent px-0 py-2.5 text-base text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus-visible:border-primary focus-visible:ring-0";

const labelClassName = "font-mono text-xs tracking-[0.08em] text-sidebar-foreground/70 uppercase";

const Contact = () => {
  const emailMagnetic = useMagnetic();
  const submitMagnetic = useMagnetic();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="bg-sidebar px-5 pt-22.5 text-sidebar-foreground sm:px-12 sm:pt-40"
    >
      <div className="mx-auto max-w-310">
        <SectionHeading title="Contact" />

        <div className="grid grid-cols-1 gap-14 pb-20 lg:grid-cols-[minmax(300px,1fr)_minmax(300px,1fr)] lg:gap-25 lg:pb-30">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <h2 className="m-0 mb-8 font-big-shoulders text-[clamp(32px,5vw,64px)] leading-[1.05] font-extrabold tracking-[-0.01em]">
              {CONTACT_HEADLINE}
            </h2>

            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              style={emailMagnetic.style}
              onMouseMove={emailMagnetic.onMouseMove}
              onMouseLeave={emailMagnetic.onMouseLeave}
              className="mb-12 inline-block border-b border-sidebar-border pb-2 font-mono text-[clamp(17px,2.4vw,26px)] break-all text-sidebar-foreground no-underline transition-colors hover:border-primary hover:text-primary"
            >
              {CONTACT_EMAIL}
            </motion.a>

            <div className="flex flex-col">
              {SOCIAL_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-between border-t border-sidebar-border px-1 py-4 font-sans text-[15px] text-sidebar-foreground no-underline transition-colors hover:text-primary",
                    i === SOCIAL_LINKS.length - 1 && "border-b"
                  )}
                >
                  {link.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
          >
            {submitted ? (
              <div className="py-2">
                <div className="mb-4 font-mono text-[13px] tracking-[0.08em] text-primary uppercase">
                  Message received
                </div>
                <p className="m-0 text-lg leading-[1.6] text-sidebar-foreground">
                  {CONTACT_SUCCESS_MESSAGE}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="flex flex-col gap-2.5">
                  <Label htmlFor="contact-name" className={labelClassName}>
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={fieldClassName}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <Label htmlFor="contact-email" className={labelClassName}>
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={fieldClassName}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <Label htmlFor="contact-message" className={labelClassName}>
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className={cn(fieldClassName, "resize-y")}
                  />
                </div>

                <MotionButton
                  type="submit"
                  style={submitMagnetic.style}
                  onMouseMove={submitMagnetic.onMouseMove}
                  onMouseLeave={submitMagnetic.onMouseLeave}
                  className="mt-2 h-auto self-start rounded-none bg-primary px-8 py-4 font-sans text-[15px] font-semibold text-primary-foreground hover:bg-accent"
                >
                  Send message <ArrowRight className="size-4" aria-hidden="true" />
                </MotionButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <div className="overflow-hidden bg-primary py-5 sm:py-8">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: MARQUEE_SPEED, repeat: Infinity, ease: "linear" }}
          className="flex w-max will-change-transform"
        >
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="pr-12 font-big-shoulders text-[clamp(32px,9vw,130px)] leading-[0.9] font-black tracking-[-0.02em] whitespace-nowrap text-foreground"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 py-5 font-mono text-xs text-sidebar-foreground/70 sm:py-6">
        <span>© {new Date().getFullYear()} Maks. Built by hand.</span>
        <a
          href="#hero"
          className="inline-flex items-center gap-1 text-sidebar-foreground/70 no-underline transition-colors hover:text-sidebar-foreground"
        >
          Back to top <ArrowUp className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Contact;
