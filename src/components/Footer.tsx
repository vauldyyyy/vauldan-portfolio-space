export function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 py-10 border-t bg-transparent"
      style={{ borderColor: "rgba(239,244,255,0.08)" }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40">
        © {new Date().getFullYear()} Vauldan D'Souza. All rights reserved.
      </div>
      <div className="font-anton text-[20px] uppercase text-cream/60">
        Vauldan<span className="text-neon">.</span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40">
        Designed & built with passion — Goa, India
      </div>
    </footer>
  );
}
