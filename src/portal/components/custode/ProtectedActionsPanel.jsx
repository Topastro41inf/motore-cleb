import CustodeBadge from "./CustodeBadge";

export default function ProtectedActionsPanel({ actions }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-amber-300">
            Azioni protette
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Comandi futuri, non operativi
          </h2>
        </div>
        <CustodeBadge tone="lock">nessun effetto reale</CustodeBadge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            disabled
            className="cursor-not-allowed rounded-2xl border border-white/10 bg-black/20 p-4 text-left opacity-85"
            title="Funzione futura: non operativa in questa versione"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-bold text-white">{action.label}</span>
              <CustodeBadge tone="warn">{action.status}</CustodeBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {action.requirement}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
