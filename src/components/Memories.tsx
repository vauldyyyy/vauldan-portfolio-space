import { useState } from "react";
import { useFadeUp } from "@/hooks/use-fade-up";

interface Memory {
  title: string;
  date: string;
  category: "Hackathons" | "Projects" | "College";
  img: string;
  desc: string;
}

const MEMORIES: Memory[] = [
  {
    title: "Cyber Dome 2026",
    date: "May 2026",
    category: "Hackathons",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    desc: "BITS Goa × IIT Madras — led ML for RailGuard AI, a full railway surveillance system built in 36 hours as ML lead.",
  },
  {
    title: "FraudLens Ship",
    date: "2025",
    category: "Projects",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    desc: "Deployed real-time UPI fraud detection on Vercel. 5-model stacking ensemble with live SHAP explainability dashboard.",
  },
  {
    title: "RAG Robustness Study",
    date: "2025",
    category: "Projects",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
    desc: "Switched from OpenAI to Gemini API mid-research, resolved rate-limiting, delivered comprehensive failure analysis.",
  },
  {
    title: "Goa College of Engineering",
    date: "2024–2028",
    category: "College",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b6f7e?w=600&q=80",
    desc: "Computer Engineering — Roll No. 24B-CO-074. Building AI systems between Theory of Computation and Compiler Design labs.",
  },
  {
    title: "MedTrack Launch",
    date: "2024",
    category: "Projects",
    img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&q=80",
    desc: "Led 4-member team building full-stack medicine expiry tracker with OCR, Firebase, and automated email alerts.",
  },
  {
    title: "YouTube Shorts Pipeline",
    date: "2025",
    category: "Projects",
    img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80",
    desc: "Automated content pipeline in n8n using Groq, HuggingFace, Creatomate & YouTube Data API.",
  },
];

const TABS = ["All", "Hackathons", "Projects", "College"] as const;
type Tab = (typeof TABS)[number];

function MemoryCard({ m }: { m: Memory }) {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <div ref={ref} className="fade-up liquid-glass rounded-[24px] overflow-hidden group transition-all">
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={m.img}
          alt={m.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.15em] text-neon bg-background/70 backdrop-blur px-3 py-1.5 rounded-full">
          {m.date}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-anton text-[16px] uppercase text-cream">{m.title}</h3>
        <p className="font-mono text-[10px] uppercase tracking-wider text-cream/60 mt-2 leading-[1.7]">
          {m.desc}
        </p>
      </div>
    </div>
  );
}

export function Memories() {
  const [tab, setTab] = useState<Tab>("All");
  const filtered = tab === "All" ? MEMORIES : MEMORIES.filter((m) => m.category === tab);

  return (
    <section id="memories" className="relative w-full py-28" style={{ background: "#010828" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <h2
          className="font-anton uppercase text-cream leading-[0.95] mb-10"
          style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
        >
          Shinobi
          <br />
          <span className="pl-12 inline-block">
            <span className="font-condiment text-neon" style={{ fontSize: "1.05em" }}>Scrolls</span> & Memories
          </span>
        </h2>
        <div className="flex flex-wrap gap-3 mb-10">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-anton text-[12px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-full border transition ${
                tab === t
                  ? "bg-neon border-neon"
                  : "border-cream/15 text-cream hover:border-neon hover:text-neon"
              }`}
              style={tab === t ? { color: "#010828" } : undefined}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all">
          {filtered.map((m) => (
            <MemoryCard key={m.title} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
