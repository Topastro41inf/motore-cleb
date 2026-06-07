export default function FdaSimulatorPanel({ simulator }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
      <div className="mb-5">
        <p className="mb-2 text-xs uppercase tracking-[0.28em] text-amber-300">
          Simulazione
        </p>
        <h2 className="text-2xl font-black text-white">{simulator.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
          {simulator.subtitle}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {simulator.cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              {card.label}
            </p>
            <p className="mt-2 text-lg font-bold text-amber-200">
              {card.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-sky-300/20 bg-sky-300/10 p-4 text-sm leading-7 text-sky-50">
        Questo pannello è solo una preview. Non avvia audio, non raccoglie dati,
        non genera letture reali e non sostituisce il percorso FdA separato.
      </div>
    </section>
  );
}
