const futureActions = [
  {
    title: "Riscatta pallino",
    status: "Funzione futura",
    requires: ["Backend sicuro", "Verifica identità", "Registro eventi"],
    description:
      "Permetterà all’utente di richiedere il riscatto di un pallino maturato personale.",
  },
  {
    title: "Reinserisci pallino",
    status: "Funzione futura",
    requires: ["Scelta esplicita utente", "Collegamento al motore", "Tracciamento evento"],
    description:
      "Permetterà di reinserire volontariamente un pallino maturato nell’albero, senza automatismi.",
  },
  {
    title: "Richiedi accesso UV",
    status: "Funzione futura",
    requires: ["C.L.E.B. attivo", "Accettazione regolamento UV", "Controllo requisiti"],
    description:
      "Mostrerà il percorso per accedere a Unità Valore solo dopo iscrizione C.L.E.B. valida.",
  },
  {
    title: "Richiedi accesso Filo",
    status: "Funzione futura",
    requires: ["C.L.E.B. attivo", "Consenso informato", "Regolamento sedute"],
    description:
      "Mostrerà il percorso per accedere al Filo di Arianna senza generare pallini aggiuntivi.",
  },
  {
    title: "Scarica riepilogo personale",
    status: "Funzione futura",
    requires: ["Dati utente reali", "Privacy policy", "Esportazione controllata"],
    description:
      "Genererà un riepilogo personale scaricabile, quando esisterà un backend sicuro.",
  },
];

function RequirementPill({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

export default function FutureActionsPanel() {
  return (
    <section className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5 shadow-lg">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-amber-300">
            Azioni future simulate
          </p>
          <h2 className="text-xl font-semibold text-white">
            Porte visibili, non ancora attive
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-300">
            Questi comandi anticipano le funzioni future della dashboard. In
            questa versione non modificano dati, non chiamano backend, non
            attivano pagamenti e non toccano il motore dell’albero.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-amber-100">
          Effetto reale: nessuno
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {futureActions.map((action) => (
          <article
            key={action.title}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {action.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {action.description}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-zinc-500/15 px-3 py-1 text-xs font-semibold text-zinc-300">
                {action.status}
              </span>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                Richiede
              </p>
              <div className="flex flex-wrap gap-2">
                {action.requires.map((requirement) => (
                  <RequirementPill key={requirement}>
                    {requirement}
                  </RequirementPill>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled
              className="mt-5 w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-500"
            >
              Non attivo in questa versione
            </button>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-amber-400/20 bg-black/20 p-4 text-sm text-amber-100">
        Regola: la dashboard può mostrare un’azione futura, ma non deve eseguirla
        finché non esistono backend sicuro, modello dati stabile, consenso utente
        e tracciamento eventi.
      </div>
    </section>
  );
}
