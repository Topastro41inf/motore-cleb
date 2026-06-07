const toneByStatus = {
  "regola operativa": "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  "bozza interna": "border-amber-300/30 bg-amber-300/10 text-amber-100",
  "da validare": "border-sky-300/30 bg-sky-300/10 text-sky-100",
  "futuro legale": "border-purple-300/30 bg-purple-300/10 text-purple-100",
};

export default function DocumentStatusBadge({ status }) {
  const tone = toneByStatus[status] || "border-white/10 bg-white/[0.06] text-slate-200";

  return (
    <span className={`w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${tone}`}>
      {status}
    </span>
  );
}
