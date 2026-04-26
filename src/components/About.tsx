import { useFadeUp } from "@/hooks/use-fade-up";

const STATS = [
  { num: "4+", label: "Live Projects Shipped" },
  { num: "3+", label: "Hackathon Wins" },
  { num: "2nd", label: "Year at GCE" },
  { num: "8+", label: "Technologies" },
];

const ROW1 = ["Python", "ML/AI", "React", "FastAPI", "C/C++", "YOLOv8", "Hackathons", "LLMs/RAG"];
const ROW2 = ["Docker", "Firebase", "SHAP/XAI", "CrewAI", "n8n", "Gemini API", "Vercel", "Java"];

function Ticker({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const dup = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div className={`flex gap-8 whitespace-nowrap ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {dup.map((t, i) => (
          <span key={i} className="font-anton text-[14px] uppercase tracking-[0.15em] text-cream/80">
            {t} <span className="text-neon">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
        autoPlay loop muted playsInline
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(1,8,40,0.82), rgba(1,8,40,0.5))" }} />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="relative inline-block">
            <h2
              className="font-anton uppercase leading-[1] text-cream"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              Hello!
              <br />
              I'm
              <br />
              Vauldan
            </h2>
            <span
              className="font-condiment text-neon absolute"
              style={{
                fontSize: "clamp(32px, 4.5vw, 68px)",
                transform: "rotate(2deg)",
                bottom: "-12px",
                right: "-90px",
              }}
            >
              Builder
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-12 max-w-[460px]">
            {STATS.map((s) => {
              const ref = useFadeUp<HTMLDivElement>();
              return (
                <div key={s.label} ref={ref} className="fade-up liquid-glass rounded-[16px] p-6">
                  <div
                    className="font-anton text-neon"
                    style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
                  >
                    {s.num}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/60 mt-1">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p
            className="font-mono text-[14px] uppercase tracking-[0.12em] text-cream/75 max-w-[420px]"
            style={{ lineHeight: 2 }}
          >
            A Computer Engineering student at Goa College of Engineering building AI systems
            that solve real problems.
            <br /><br />
            From real-time fraud detection to railway surveillance with multi-agent
            orchestration — every project is a new mission.
            <br /><br />
            Dattebayo.
          </p>
          <div className="mt-12 space-y-2">
            <Ticker items={ROW1} />
            <Ticker items={ROW2} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
