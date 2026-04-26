import { Mail, Github, Linkedin } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden rounded-b-[32px]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(1,8,40,0.55), rgba(1,8,40,0.3), rgba(1,8,40,0.75))",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1831px] min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="flex-1 max-w-[1100px]">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-neon pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/80">
                Available for opportunities
              </span>
            </div>
            <div className="relative">
              <h1
                className="font-anton uppercase text-cream leading-[0.95]"
                style={{ fontSize: "clamp(42px, 8vw, 105px)" }}
              >
                Beyond code
                <br />
                and
                <br />
                <span className="text-neon">(its)</span> limits
              </h1>
              <span
                className="font-condiment text-neon absolute"
                style={{
                  fontSize: "clamp(22px, 3vw, 48px)",
                  transform: "rotate(-2deg)",
                  top: "-18px",
                  right: "8%",
                  opacity: 0.9,
                }}
              >
                ML engineer
              </span>
            </div>
            <p
              className="font-mono text-[13px] uppercase tracking-[0.18em] text-cream/65 mt-8"
              style={{ maxWidth: "280px", lineHeight: 1.8 }}
            >
              Computer Engineering Student / Goa College of Engineering / 2024–2028
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#missions"
                className="font-anton text-[13px] uppercase tracking-[0.15em] rounded-full px-8 py-3.5 bg-neon hover:bg-neon/90 transition"
                style={{ color: "#010828" }}
              >
                See Missions
              </a>
              <a
                href="#summon"
                className="font-anton text-[13px] uppercase tracking-[0.15em] rounded-full px-8 py-3.5 border border-cream/60 text-cream hover:border-neon hover:text-neon transition"
              >
                Summon Me
              </a>
            </div>
          </div>
          <div className="flex flex-row lg:flex-col gap-3">
            {[
              { Icon: Mail, href: "mailto:hello@vauldan.dev", label: "Email" },
              { Icon: Github, href: "https://github.com", label: "GitHub" },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="liquid-glass w-[56px] h-[56px] rounded-[16px] flex items-center justify-center text-cream hover:text-neon transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
