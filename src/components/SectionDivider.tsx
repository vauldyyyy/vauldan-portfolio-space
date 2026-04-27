interface SectionDividerProps {
  number: string;
  label: string;
}

export function SectionDivider({ number, label }: SectionDividerProps) {
  return (
    <div
      className="relative w-full py-6 flex items-center justify-center gap-6 overflow-hidden bg-transparent"
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon/60">
          // {number}
        </span>
        <span className="font-anton text-[12px] uppercase tracking-[0.2em] text-cream/40">
          {label}
        </span>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
    </div>
  );
}
