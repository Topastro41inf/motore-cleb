export default function FdaExternalLinkPanel({ link }) {
  if (!link?.url) {
    return (
      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
        <p className="mb-2 text-xs uppercase tracking-[0.28em] text-amber-300">
          Simulazione esterna
        </p>
        <h2 className="text-2xl font-black text-white">
          Link non configurato.
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Il collegamento alla simulazione Filo di Arianna potrà essere impostato
          dai Custodi senza inserire il programma reale dentro C.L.E.B.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5 shadow-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-emerald-200">
            Simulazione esterna
          </p>
          <h2 className="text-2xl font-black text-white">{link.label}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-50/90">
            {link.note}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-emerald-100/70">
            {link.status}
          </p>
        </div>

        <a
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center rounded-full border border-emerald-200/30 bg-emerald-200/15 px-5 py-3 text-sm font-bold text-emerald-50 transition hover:bg-emerald-200/25"
        >
          Apri simulazione
        </a>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-emerald-50/90">
        Il link apre un servizio esterno in una nuova scheda. Il portale C.L.E.B.
        non incorpora il motore FdA reale, non raccoglie dati da questa sezione e
        non sostituisce la gestione separata del percorso.
      </div>
    </section>
  );
}
