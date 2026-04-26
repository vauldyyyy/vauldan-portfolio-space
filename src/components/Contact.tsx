import { useState, useRef, useEffect } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";

const REPLIES = [
  "Thanks! I'll get back to you soon.",
  "That sounds interesting — let's connect on LinkedIn!",
  "Dattebayo! Always up for a challenge.",
  "Love the energy. Shoot me a message on GitHub!",
];

interface Msg {
  id: number;
  from: "bot" | "user";
  text: string;
}

export function Contact() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 1,
      from: "bot",
      text: "Hello! Open to hackathons, internships, and research collaborations. What's on your mind?",
    },
  ]);
  const [val, setVal] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const send = () => {
    if (!val.trim()) return;
    const id = Date.now();
    setMsgs((m) => [...m, { id, from: "user", text: val.trim() }]);
    setVal("");
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
      setMsgs((m) => [...m, { id: id + 1, from: "bot", text: reply }]);
    }, 900);
  };

  return (
    <section id="summon" className="relative w-full overflow-hidden" style={{ background: "#010828" }}>
      <video
        className="w-full h-auto block"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
        autoPlay loop muted playsInline
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(1,8,40,0.65), rgba(1,8,40,0.4))" }} />

      {/* Right-aligned headline */}
      <div className="absolute top-[8%] right-[6%] lg:pr-[8%] text-right max-w-[80%]">
        <div
          className="font-condiment text-neon mb-2"
          style={{ fontSize: "clamp(22px, 2.5vw, 36px)", transform: "rotate(-1deg)" }}
        >
          Go beyond —
        </div>
        <h2
          className="font-anton uppercase text-cream leading-[1]"
          style={{ fontSize: "clamp(28px, 7vw, 96px)" }}
        >
          JOIN US.
          <span className="block" style={{ marginBottom: "clamp(16px, 4vw, 48px)" }} />
          REVEAL WHAT'S HIDDEN.
          <br />
          DEFINE WHAT'S NEXT.
          <br />
          FOLLOW THE SIGNAL.
        </h2>
      </div>

      {/* Bottom-left vertical socials */}
      <div className="absolute left-[6%] bottom-[10%] hidden md:block">
        <div className="liquid-glass rounded-[1.25rem] flex flex-col w-[14vw] sm:w-[200px] lg:w-[240px]">
          {[
            { Icon: Mail, label: "Mail", href: "mailto:hello@vauldan.dev" },
            { Icon: Github, label: "GitHub", href: "https://github.com" },
            { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
          ].map(({ Icon, label, href }, i, arr) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-3 px-5 py-5 text-cream hover:text-neon transition-colors ${
                i < arr.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <Icon size={18} />
              <span className="font-anton text-[13px] uppercase tracking-[0.15em]">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Chat widget */}
      <div className="absolute right-[6%] bottom-[8%] z-10 max-w-[400px] w-[88vw] md:w-[400px]">
        <div className="liquid-glass rounded-[28px] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-anton text-[#010828] text-lg"
              style={{ background: "linear-gradient(135deg, #6FFF00, #61DAFB)" }}
            >
              V
            </div>
            <div className="flex-1">
              <div className="font-anton text-[14px] uppercase text-cream">Vauldan</div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cream/70">
                <span className="w-1.5 h-1.5 rounded-full bg-neon pulse-dot" />
                Online — ML Engineer
              </div>
            </div>
          </div>
          <div ref={scrollRef} className="min-h-[100px] max-h-[240px] overflow-y-auto space-y-2 mb-4 pr-1">
            {msgs.map((m) =>
              m.from === "bot" ? (
                <div
                  key={m.id}
                  className="bg-white/5 text-cream rounded-tl-2xl rounded-br-2xl rounded-bl-2xl px-4 py-2.5 text-[12px] font-mono max-w-[85%]"
                >
                  {m.text}
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <div
                    className="rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-2.5 text-[12px] font-mono max-w-[85%]"
                    style={{ background: "#6FFF00", color: "#010828" }}
                  >
                    {m.text}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 font-mono text-[12px] rounded-full bg-white/5 border border-cream/10 focus:border-neon focus:outline-none px-4 py-2.5 text-cream placeholder:text-cream/40"
            />
            <button
              onClick={send}
              aria-label="Send"
              className="w-11 h-11 rounded-full flex items-center justify-center hover:scale-105 transition"
              style={{ background: "#6FFF00", color: "#010828" }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
