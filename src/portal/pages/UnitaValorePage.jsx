import {
  uvPrinciples,
  uvFlowSteps,
  uvClientView,
  uvCustodeView,
  uvSafetyRules,
  uvFutureActions,
} from "../data/unitaValoreContent";
import UVBadge from "../components/uv/UVBadge";
import UVInfoCard from "../components/uv/UVInfoCard";
import UVFlowCard from "../components/uv/UVFlowCard";
import UVSafetyPanel from "../components/uv/UVSafetyPanel";

export default function UnitaValorePage({ back }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-zinc-100 md:px-8">
      <section className="rounded-3xl border border-amber-300/15 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <UVBadge tone="gold">Servizio interno C.L.E.B.</UVBadge>
          <UVBadge tone="blue">Pilota controllato</UVBadge>
          <UVBadge tone="neutral">Nessuna porta autonoma</UVBadge>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200/80">
              Unità Valore
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white md:text-6xl">
              UV nasce dentro C.L.E.B., non fuori da C.L.E.B.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              Unità Valore è il modulo dedicato a presenza, incontri e scambi
              di valore. Nel sito viene presentato come servizio interno:
              accessibile solo con iscrizione C.L.E.B. attiva, separato dalla
              dashboard cliente e governato dai Custodi.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
              Regola madre
            </p>
            <p className="mt-4 text-2xl font-black text-white">
              Nessun UV senza C.L.E.B. attivo.
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Se una persona arriva da UV ma non è ancora C.L.E.B., entra prima
              in C.L.E.B. e riceve un solo pallino totale nel flusso iniziale.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {uvPrinciples.map((item) => (
          <UVInfoCard key={item.title} title={item.title} text={item.text} />
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80">
              Flusso utente
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Come viene presentato UV nel portale
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Questa pagina è informativa. Non registra utenti, non crea nodi, non
            assegna UV reali e non modifica l’albero.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {uvFlowSteps.map((step, index) => (
            <UVFlowCard
              key={step.title}
              index={index + 1}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <UVSafetyPanel
          eyebrow="Vista cliente"
          title="Cosa vede il cliente"
          items={uvClientView}
          note="Il cliente non vede formule interne, premi stimati, meccaniche anti-abuso o dettagli tecnici di maturazione."
        />

        <UVSafetyPanel
          eyebrow="Vista Custode"
          title="Cosa gestiscono Aèl e Flavio"
          items={uvCustodeView}
          note="La parte tecnica resta nell’Area Custode e nella UV Console. Nel portale pubblico resta spiegata solo in modo ordinato."
        />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/[0.05] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
            Sicurezza
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Regole non negoziabili
          </h2>
          <div className="mt-5 space-y-3">
            {uvSafetyRules.map((rule) => (
              <div
                key={rule}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300"
              >
                {rule}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-300/15 bg-amber-300/[0.05] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Azioni future
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Cosa arriverà quando il backend sarà pronto
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {uvFutureActions.map((action) => (
              <div
                key={action.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="font-bold text-white">{action.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {action.text}
                </p>
                <p className="mt-3 inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-semibold text-amber-100">
                  Funzione futura protetta
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={back}
          className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
        >
          Torna alla Home
        </button>
      </div>
    </main>
  );
}
