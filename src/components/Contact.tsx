import { useState, useRef, useEffect } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";

const REPLIES = [
  "Thanks for reaching out! I'll respond within 24 hours.",
  "Sounds exciting — let's discuss further on LinkedIn!",
  "Always up for an interesting challenge. Let's connect!",
  "Great to hear from you! Check out my GitHub for more of my work.",
  "Appreciate the message! Feel free to email me for longer discussions.",
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
      text: "Hey there! I'm open to internships, hackathon collabs, research opportunities, and freelance projects. What can I help you with?",
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
    <section id="contact" className="relative w-full overflow-hidden" style={{ background: "#010828" }}>
      <video
        className="w-full h-auto block"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
        autoPlay loop muted playsInline
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(1,8,40,0.65), rgba(1,8,40,0.4))" }} />

      {/* Right-aligned headline */}
      <div className="absolute top-[5%] md:top-[8%] right-[6%] lg:pr-[8%] text-right max-w-[90%] md:max-w-[80%]">
        <div
          className="font-condiment text-neon mb-2"
          style={{ fontSize: "clamp(22px, 2.5vw, 36px)", transform: "rotate(-1deg)" }}
        >
          Let's build something —
        </div>
        <h2
          className="font-anton uppercase text-cream leading-[1]"
          style={{ fontSize: "clamp(28px, 7vw, 96px)" }}
        >
          GET IN
          <span className="block" style={{ marginBottom: "clamp(16px, 4vw, 48px)" }} />
          TOUCH.
          <br />
          LET'S COLLABORATE.
          <br />
          SHIP SOMETHING GREAT.
        </h2>
      </div>

      {/* Bottom-left vertical socials */}
      <div className="absolute left-[6%] bottom-[10%] hidden md:block">
        <div className="liquid-glass rounded-[1.25rem] flex flex-col w-[14vw] sm:w-[200px] lg:w-[240px]">
          {[
            { Icon: Mail, label: "Email", href: "mailto:waldendsouza@gmail.com" },
            { Icon: Github, label: "GitHub", href: "https://github.com/vauldyyyy" },
            { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/walden-dsouza" },
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
      <div className="absolute right-[6%] bottom-[4%] md:bottom-[8%] z-10 max-w-[400px] w-[88vw] md:w-[400px]">
        <div className="liquid-glass rounded-[28px] p-4 md:p-8">
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
                Online — Ready to connect
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
              placeholder="Say hello..."
              className="flex-1 font-mono text-[12px] rounded-full bg-white/5 border border-cream/10 focus:border-neon focus:outline-none px-4 py-2.5 text-cream placeholder:text-cream/40"
            />
            <button
              onClick={send}
              aria-label="Send message"
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
