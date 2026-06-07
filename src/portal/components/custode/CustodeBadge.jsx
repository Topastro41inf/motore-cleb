export default function CustodeBadge({ children, tone = "neutral" }) {
  const tones = {
    ok: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
    warn: "border-amber-400/25 bg-amber-400/10 text-amber-200",
    lock: "border-slate-400/20 bg-slate-400/10 text-slate-200",
    neutral: "border-white/10 bg-white/[0.06] text-slate-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        tones[tone] || tones.neutral
      }`}
    >
      {children}
    </span>
  );
}
