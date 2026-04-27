import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectUniverse } from "@/components/SolarSystem";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Missions } from "@/components/Missions";
import { Memories } from "@/components/Memories";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { GlobalBackground } from "@/components/GlobalBackground";
import { ProjectCards } from "@/components/ProjectCards";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Vauldan D'Souza — Full-Stack ML Engineer Portfolio" },
      { name: "description", content: "Vauldan D'Souza: Full-stack ML engineer and computer engineering student at GCE Goa. Building intelligent AI systems, shipping production-grade projects, and winning hackathons." },
      { property: "og:title", content: "Vauldan D'Souza — I Build Things That Think" },
      { property: "og:description", content: "Full-stack ML engineer portfolio. Explore projects like FraudLens, RailGuard AI, MedTrack, and more." },
    ],
  }),
  component: Index,
}));

function Index() {
  return (
    <div className="relative text-cream min-h-screen bg-transparent">
      <GlobalBackground />
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <SectionDivider number="01" label="Project Universe" />
      <ProjectUniverse />
      <ProjectCards />
      <SectionDivider number="02" label="Skills & Domains" />
      <Skills />
      <SectionDivider number="03" label="About" />
      <About />
      <SectionDivider number="04" label="Featured Work" />
      <Missions />
      <SectionDivider number="05" label="Journey" />
      <Memories />
      <Contact />
      <Footer />
    </div>
  );
}
