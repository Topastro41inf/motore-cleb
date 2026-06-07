export default function SeparationGrid({ items }) {
  return (
    <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold text-white">
        Separazione obbligatoria
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
