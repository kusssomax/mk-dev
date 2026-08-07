import Hero from "@/features/home/components/Hero";
import AboutMe from "@/features/home/components/AboutMe";
import Experience from "@/features/home/components/Experience";
import Work from "@/features/home/components/Work";
import Contact from "@/features/home/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
