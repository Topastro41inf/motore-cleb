export default function UVSafetyPanel({ eyebrow, title, items, note }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300"
          >
            {item}
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-2xl border border-amber-300/15 bg-amber-300/[0.06] p-4 text-sm leading-6 text-amber-100">
        {note}
      </p>
    </section>
  );
}
