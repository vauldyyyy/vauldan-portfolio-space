import { Link } from "@tanstack/react-router";
import { Github, Linkedin } from "lucide-react";

const NAV = [
  { label: "Profile", href: "#hero" },
  { label: "Missions", href: "#missions" },
  { label: "Solar System", href: "#solar-system" },
  { label: "Memories", href: "#memories" },
  { label: "Summon", href: "#summon" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-5">
      <Link to="/" className="font-anton text-[18px] uppercase tracking-wide text-cream">
        Vauldan<span className="text-neon">.</span>
      </Link>
      <div className="liquid-glass hidden md:flex items-center gap-8 rounded-[28px] px-[52px] py-[20px]">
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="font-anton text-[13px] uppercase tracking-[0.12em] text-cream/85 hover:text-neon transition-colors"
          >
            {n.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="liquid-glass w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-cream hover:text-neon transition-colors"
        >
          <Github size={18} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="liquid-glass w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-cream hover:text-neon transition-colors"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </nav>
  );
}
