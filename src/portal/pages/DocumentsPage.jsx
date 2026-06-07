import { documentiSections, documentiPrinciples, documentiStatuses } from "../data/documentiContent";
import DocumentCard from "../components/documenti/DocumentCard";
import DocumentStatusBadge from "../components/documenti/DocumentStatusBadge";

export default function DocumentsPage({ back }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-slate-100 md:px-8">
      <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
              C.L.E.B. / Documenti
            </p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">
              Regole, confini e documenti del sistema.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              Questa pagina raccoglie le regole operative già scolpite e le aree
              documentali da completare prima di introdurre dati reali, account,
              pagamenti o backend. È una mappa di chiarezza: non sostituisce una
              consulenza legale e non attiva alcuna funzione reale.
            </p>
          </div>

          <button
            type="button"
            onClick={back}
            className="w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-3 text-sm font-bold text-amber-100 transition hover:bg-amber-300/20"
          >
            Torna alla Home
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {documentiStatuses.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-3 text-2xl font-black text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
          Regola anti-disastro
        </p>
        <h2 className="mt-3 text-2xl font-black text-white">
          Prima chiarezza. Poi backend.
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-amber-50/90">
          C.L.E.B. non deve introdurre login reali, pagamenti reali, database o
          gestione di dati personali finché modello dati, documenti, test e
          backup non sono chiari. Questa pagina serve a mantenere visibile il
          confine tra prototipo, simulazione e sistema reale.
        </p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {documentiSections.map((section) => (
          <DocumentCard key={section.title} section={section} />
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Confini del sistema
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">
              Cosa entra nel portale e cosa resta fuori.
            </h2>
          </div>
          <DocumentStatusBadge status="regola operativa" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {documentiPrinciples.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
            >
              <h3 className="font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
