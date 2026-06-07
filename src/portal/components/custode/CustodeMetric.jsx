const toneClasses = {
  amber: "border-amber-300/20 bg-amber-300/10 text-amber-200",
  emerald: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  sky: "border-sky-300/20 bg-sky-300/10 text-sky-200",
  zinc: "border-zinc-300/15 bg-zinc-300/10 text-zinc-200",
};

export default function CustodeMetric({ label, value, note, tone = "zinc" }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        toneClasses[tone] || toneClasses.zinc
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm opacity-85">{note}</p>
    </div>
  );
}
