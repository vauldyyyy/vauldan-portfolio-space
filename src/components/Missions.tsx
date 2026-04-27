import { ArrowRight } from "lucide-react";
import { useFadeUp } from "@/hooks/use-fade-up";

interface Project {
  video: string;
  score: string;
  title: string;
  desc: string;
  tags: string[];
  wide?: boolean;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4",
    score: "9.2/10",
    title: "FraudLens",
    desc: "Real-time UPI fraud detection engine powered by a 5-model stacking ensemble with SHAP explainability and a live React analytics dashboard.",
    tags: ["Python", "FastAPI", "React", "SHAP", "Vercel", "ML Ensemble"],
    link: "https://github.com/vauldyyyy",
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4",
    score: "9.5/10",
    title: "RailGuard AI",
    desc: "End-to-end railway surveillance platform — YOLOv8 object detection, OSNet ReID, ByteTrack tracking, LSTM crowd forecasting & CrewAI multi-agent orchestration. Built at Cyber Dome 2026.",
    tags: ["YOLOv8", "ByteTrack", "LSTM", "CrewAI", "FastAPI", "React"],
    link: "https://github.com/vauldyyyy",
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4",
    score: "8.7/10",
    title: "MedTrack",
    desc: "Smart medicine management app with AI-powered prescription scanning via Gemini, dose reminders, expiry tracking, and cross-device sync via Supabase.",
    tags: ["Flutter", "Supabase", "Gemini API", "Dart", "Push Notifications"],
    link: "https://github.com/vauldyyyy",
  },
  {
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4",
    score: "8.9/10",
    title: "When Retrieval Fails",
    desc: "Research study probing failure modes of Retrieval-Augmented Generation across Gemini API, chunking strategies, query corruption, and context window overflow.",
    tags: ["RAG", "Gemini API", "LangChain", "Python", "Research Paper"],
    wide: true,
    link: "https://github.com/vauldyyyy",
  },
];

function Card({ p }: { p: Project }) {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`fade-up liquid-glass rounded-[32px] p-[18px] transition-transform duration-500 hover:-translate-y-1.5 ${
        p.wide ? "md:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden rounded-[22px] ${p.wide ? "aspect-[2.4/1]" : "aspect-[4/3]"}`}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={p.video}
          autoPlay loop muted playsInline
          style={p.wide ? { filter: "brightness(0.55)" } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      <div className="px-2 pt-5">
        <h3 className="font-anton text-[22px] uppercase text-cream">{p.title}</h3>
        <p className="font-mono text-[11px] uppercase tracking-wider text-cream/65 mt-2 leading-[1.7]">
          {p.desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {p.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] uppercase tracking-[0.15em] text-cream/70 border border-cream/15 rounded-full px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="liquid-glass rounded-[20px] px-5 py-4 mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/70">
            Impact:
          </span>
          <span className="font-anton text-[16px] text-neon">{p.score}</span>
        </div>
        <a
          href={p.link || "#"}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${p.title} project`}
          className="w-12 h-12 rounded-full flex items-center justify-center text-cream shadow-lg transition hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #b724ff, #7c3aed)",
            boxShadow: "0 10px 30px -8px rgba(183,36,255,0.5)",
          }}
        >
          <ArrowRight size={18} />
        </a>
      </div>
    </div>
  );
}

export function Missions() {
  return (
    <section id="missions" className="relative w-full py-28 bg-transparent">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <h2
            className="font-anton uppercase text-cream leading-[0.95]"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            Featured
            <br />
            <span className="pl-12 inline-block"><span className="font-condiment text-neon" style={{ fontSize: "1.05em" }}>Work</span> & Projects</span>
          </h2>
          <a href="https://github.com/vauldyyyy" target="_blank" rel="noreferrer" className="font-anton text-cream uppercase tracking-[0.15em] relative" style={{ fontSize: "clamp(20px, 2vw, 28px)" }}>
            All Projects
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-neon" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
