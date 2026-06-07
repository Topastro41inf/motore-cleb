export default function CustodeActionPanel({ actions }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {actions.map((action) => (
        <article
          key={action.title}
          className="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-white">{action.title}</h3>
            <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-200">
              {action.status}
            </span>
          </div>
          <p className="mt-3 text-sm text-zinc-300">{action.requirement}</p>
          <p className="mt-2 text-xs text-zinc-500">{action.effect}</p>
          <button
            type="button"
            disabled
            className="mt-4 w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-400"
            title="Funzione futura: nessuna azione reale in questa versione."
          >
            Non operativo in questa versione
          </button>
        </article>
      ))}
    </div>
  );
}
