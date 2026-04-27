import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Menu, X } from "lucide-react";

const NAV = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-5">
        <Link to="/" className="font-anton text-[18px] uppercase tracking-wide text-cream relative z-[110]">
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
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/vauldyyyy"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="liquid-glass w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-cream hover:text-neon transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/walden-dsouza"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="liquid-glass w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-cream hover:text-neon transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>
        
        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden liquid-glass w-[48px] h-[48px] rounded-[14px] flex items-center justify-center text-cream relative z-[110]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[105] bg-[#010828]/95 backdrop-blur-xl flex flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center gap-8 text-center">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setIsOpen(false)}
                className="font-anton text-[24px] uppercase tracking-[0.15em] text-cream hover:text-neon transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-12">
            <a href="https://github.com/vauldyyyy" target="_blank" rel="noreferrer" className="text-cream hover:text-neon">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com/in/walden-dsouza" target="_blank" rel="noreferrer" className="text-cream hover:text-neon">
              <Linkedin size={28} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
