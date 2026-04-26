interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

export function Marquee({ text, reverse = false }: MarqueeProps) {
  const items = Array.from({ length: 12 }).map(() => text);
  return (
    <div
      className="relative overflow-hidden border-t border-b py-[14px]"
      style={{
        borderColor: "rgba(111,255,0,0.2)",
        background: "rgba(1,8,40,0.6)",
      }}
    >
      <div className={`flex whitespace-nowrap ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-anton text-[13px] uppercase tracking-[0.15em] text-cream/70 px-6"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
