import { ExternalLink, Github, Linkedin } from "lucide-react";

interface ProjectDetails {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  linkedin?: string;
}

const PROJECTS: ProjectDetails[] = [
  {
    title: "Sup-Chain",
    description:
      "Sup-Chain is a blockchain-powered supply chain management solution that replaces traditional centralized systems like Oracle with a decentralized, tamper-proof network.",
    tags: ["Solidity", "Ether.js", "Ethereum", "OpenZeppelin", "MetaMask"],
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=800&q=80",
    github: "https://github.com/vauldyyyy",
  },
  {
    title: "deBay",
    description: "deBay is a decentralized alternative to traditional auction platforms like eBay.",
    tags: ["Solidity", "Ether.js", "Ethereum", "OpenZeppelin", "MetaMask"],
    image: "https://images.unsplash.com/photo-1621504450181-5d156f0627e7?w=800&q=80",
    github: "https://github.com/vauldyyyy",
    linkedin: "https://linkedin.com/in/walden-dsouza",
  },
  {
    title: "Lo-Fi",
    description:
      "Lo-Fi is a decentralized finance (DeFi) application that reimagines lending and borrowing. By using blockchain and smart contracts, it removes traditional barriers.",
    tags: ["Solidity", "Ether.js", "Ethereum", "OpenZeppelin", "MetaMask"],
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80",
  },
  {
    title: "Breast Cancer Diagnosis",
    description:
      "Logistic regression proves to be a powerful tool in healthcare analytics, especially for binary classification problems like distinguishing between benign and malignant tumors.",
    tags: ["Machine Learning", "Python", "AI", "Pandas", "NumPy"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  },
  {
    title: "UNMUTE",
    description:
      "Speech to sign language: YouTube videos, uploads and live meetings become captions and a 3D ASL avatar. Built in a 4-person hackathon team; I led development.",
    tags: ["Next.js", "TypeScript", "Three.js", "Whisper", "Supabase"],
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80",
    demo: "https://unmute-ai.vercel.app",
  },
  {
    title: "Churn Prediction",
    description:
      "Don Bosco Hackathon (Inspirathon 10th Ed.) finalist: 30-day subscriber churn in a 24-hour Kaggle competition, ROC-AUC 0.872 with a LightGBM/CatBoost ensemble.",
    tags: ["Python", "LightGBM", "CatBoost", "Kaggle"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "MedTrack",
    description:
      "Cross-platform medicine-expiry tracker with on-device OCR, offline-first sync and layered reminders. Team project.",
    tags: ["Flutter", "Dart", "Firebase", "ML Kit"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  },
];

function Card({ project }: { project: ProjectDetails }) {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[380px] lg:w-[420px] bg-[#0a1340]/40 backdrop-blur-md border border-cream/10 rounded-[24px] overflow-hidden group hover:bg-[#0a1340]/60 transition-colors">
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05] filter grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1340] to-transparent opacity-80" />
      </div>
      <div className="p-6">
        <h3 className="font-anton text-[24px] uppercase text-cream mb-3">{project.title}</h3>
        <p className="font-mono text-[11px] text-cream/70 leading-[1.6] mb-5 line-clamp-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-[0.1em] text-cream/60 bg-white/5 border border-white/10 rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-anton text-[11px] uppercase tracking-wider text-cream/80 hover:text-neon transition-colors"
            >
              <Github size={14} />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-anton text-[11px] uppercase tracking-wider text-cream/80 hover:text-neon transition-colors"
            >
              <ExternalLink size={14} />
              Live demo
            </a>
          )}
          {project.linkedin && (
            <a
              href={project.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-anton text-[11px] uppercase tracking-wider text-cream/80 hover:text-neon transition-colors"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectCards() {
  // Duplicate array to create a seamless marquee loop
  const duplicatedProjects = [...PROJECTS, ...PROJECTS];

  return (
    <section className="relative w-full py-20 overflow-hidden border-t border-b border-cream/5">
      <div className="absolute top-0 left-0 bottom-0 w-[100px] bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-[100px] bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] px-6">
        {duplicatedProjects.map((p, i) => (
          <Card key={`${p.title}-${i}`} project={p} />
        ))}
      </div>
    </section>
  );
}
