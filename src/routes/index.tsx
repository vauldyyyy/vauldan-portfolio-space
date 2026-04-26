import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SolarSystem } from "@/components/SolarSystem";
import { About } from "@/components/About";
import { Missions } from "@/components/Missions";
import { Memories } from "@/components/Memories";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vauldan — ML Engineer Portfolio" },
      { name: "description", content: "Vauldan: ML engineer, computer engineering student at GCE. Real-time AI systems, hackathons, and missions beyond code." },
      { property: "og:title", content: "Vauldan — Beyond code and its limits" },
      { property: "og:description", content: "ML engineer building real-time AI systems. Explore the solar system of skills, missions, and memories." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative bg-background text-cream min-h-screen">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Marquee text="Vauldan ✦ ML Engineer ✦ Computer Engineering ✦ GCE ✦ Hackathon Winner ✦ AI Builder ✦" />
      <SolarSystem />
      <Marquee text="We find the path by walking it, not by waiting for it to be shown ✦" reverse />
      <About />
      <Marquee text="Missions ✦ FraudLens ✦ RailGuard AI ✦ MedTrack ✦ RAG Research ✦ Cyber Dome 2026 ✦" />
      <Missions />
      <Marquee text="Untold stories are some of the best stories ✦" reverse />
      <Memories />
      <Contact />
      <Footer />
    </div>
  );
}
