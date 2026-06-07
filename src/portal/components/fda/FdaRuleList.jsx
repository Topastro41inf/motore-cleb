export default function FdaRuleList({ rules }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
      <p className="mb-2 text-xs uppercase tracking-[0.28em] text-amber-300">
        Regole di accesso
      </p>
      <h2 className="text-2xl font-black text-white">
        Il Filo non è una scorciatoia.
      </h2>
      <div className="mt-4 space-y-3">
        {rules.map((rule, index) => (
          <div
            key={rule}
            className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-xs font-bold text-amber-300">
              {index + 1}
            </span>
            <span>{rule}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
