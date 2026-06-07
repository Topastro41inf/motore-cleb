const tones = {
  gold: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  blue: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  neutral: "border-white/10 bg-white/[0.06] text-zinc-200",
};

export default function UVBadge({ children, tone = "neutral" }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
