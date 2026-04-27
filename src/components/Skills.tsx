import { useFadeUp } from "@/hooks/use-fade-up";
import { Brain, Globe, Eye, Cpu, Workflow, Database, LucideIcon } from "lucide-react";

interface Skill {
  icon: LucideIcon;
  title: string;
  description: string;
  tools: string[];
  color: string;
}

const SKILLS: Skill[] = [
  {
    icon: Brain,
    title: "Machine Learning & AI",
    description: "Building production-grade ML pipelines — from ensemble models and SHAP explainability to real-time inference systems.",
    tools: ["Python", "scikit-learn", "TensorFlow", "SHAP", "XGBoost"],
    color: "#b724ff",
  },
  {
    icon: Globe,
    title: "Full-Stack Development",
    description: "End-to-end web applications with modern frameworks, REST APIs, and cloud deployments.",
    tools: ["React", "TypeScript", "FastAPI", "Next.js", "Vercel"],
    color: "#61DAFB",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Real-time object detection, person re-identification, and multi-object tracking for surveillance and safety systems.",
    tools: ["YOLOv8", "OpenCV", "ByteTrack", "OSNet ReID"],
    color: "#FF6B35",
  },
  {
    icon: Cpu,
    title: "LLMs & RAG Systems",
    description: "Retrieval-augmented generation, prompt engineering, and multi-agent AI orchestration for complex workflows.",
    tools: ["Gemini API", "LangChain", "CrewAI", "RAG Pipelines"],
    color: "#9B59B6",
  },
  {
    icon: Workflow,
    title: "Automation & DevOps",
    description: "No-code automation pipelines, CI/CD workflows, containerized deployments, and workflow orchestration.",
    tools: ["n8n", "Docker", "GitHub Actions", "Vercel", "Groq"],
    color: "#F39C12",
  },
  {
    icon: Database,
    title: "Databases & Backend",
    description: "Data modeling, real-time sync, authentication, and cloud-native backend infrastructure.",
    tools: ["Firebase", "Supabase", "MySQL", "PostgreSQL", "Redis"],
    color: "#2ECC71",
  },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="fade-up liquid-glass rounded-[24px] p-7 group transition-all duration-500 hover:-translate-y-2"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: `linear-gradient(135deg, ${skill.color}33, ${skill.color}11)`,
            border: `1px solid ${skill.color}44`,
          }}
        >
          <skill.icon size={22} style={{ color: skill.color }} />
        </div>
        <div>
          <h3 className="font-anton text-[16px] uppercase text-cream leading-tight">
            {skill.title}
          </h3>
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-cream/55 leading-[1.8] mb-5">
        {skill.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {skill.tools.map((tool) => (
          <span
            key={tool}
            className="font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full transition-colors duration-300"
            style={{
              color: `${skill.color}cc`,
              border: `1px solid ${skill.color}25`,
              background: `${skill.color}08`,
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative w-full py-28 bg-transparent">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-16">
          <h2
            className="font-anton uppercase text-cream leading-[0.95]"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            What I
            <br />
            <span className="pl-12 inline-block">
              <span className="font-condiment text-neon" style={{ fontSize: "1.05em" }}>Work</span> With
            </span>
          </h2>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-cream/50 mt-6 max-w-[500px]">
            Tools, frameworks, and domains I use to build intelligent systems — from concept to deployment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
