import FdaInfoCard from "../components/fda/FdaInfoCard";
import FdaRuleList from "../components/fda/FdaRuleList";
import FdaSimulatorPanel from "../components/fda/FdaSimulatorPanel";
import FdaExternalLinkPanel from "../components/fda/FdaExternalLinkPanel";
import {
  filoAriannaSections,
  filoAriannaRules,
  filoAriannaSteps,
  filoAriannaSimulator,
} from "../data/filoAriannaContent";
import { externalServiceLinks } from "../data/externalServiceLinks";

export default function FiloAriannaPage({ back }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-slate-100 md:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-amber-300">
            Filo di Arianna
          </p>
          <h1 className="text-3xl font-black text-white md:text-5xl">
            Porta leggera, esperienza separata.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            Questa pagina spiega il ruolo del Filo di Arianna dentro C.L.E.B.,
            ma non contiene il programma reale. Il Filo resta un percorso
            separato, controllato e responsabile.
          </p>
        </div>

        {back && (
          <button
            type="button"
            onClick={back}
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/15"
          >
            Torna alla Home
          </button>
        )}
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        {filoAriannaSections.map((section) => (
          <FdaInfoCard key={section.title} {...section} />
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <FdaRuleList rules={filoAriannaRules} />

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-amber-300">
            Percorso previsto
          </p>
          <div className="space-y-3">
            {filoAriannaSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FdaSimulatorPanel simulator={filoAriannaSimulator} />
      <FdaExternalLinkPanel link={externalServiceLinks.filoArianna} />

      <section className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm leading-7 text-amber-50">
        <p className="font-semibold text-amber-100">Nota responsabile</p>
        <p className="mt-2">
          Il Filo di Arianna non è terapia medica, non sostituisce professionisti
          sanitari e non promette risultati. Nel portale C.L.E.B. è presentato
          come percorso informativo/simulativo collegato al sistema madre. La
          pratica completa resta fuori dal sito.
        </p>
      </section>
    </main>
  );
}
