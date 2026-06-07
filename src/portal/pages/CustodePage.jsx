import {
  custodeMetrics,
  custodePanels,
  custodeSummary,
  protectedActions,
} from "../data/custodePanels";
import CustodeBadge from "../components/custode/CustodeBadge";
import CustodeMetricCard from "../components/custode/CustodeMetricCard";
import CustodePanelCard from "../components/custode/CustodePanelCard";
import ProtectedActionsPanel from "../components/custode/ProtectedActionsPanel";

export default function CustodePage({ back }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-white md:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
              {custodeSummary.label}
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-5xl">
              {custodeSummary.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              {custodeSummary.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <CustodeBadge tone="warn">{custodeSummary.status}</CustodeBadge>
            <CustodeBadge tone="lock">{custodeSummary.role}</CustodeBadge>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm font-semibold leading-6 text-amber-100">
          {custodeSummary.safety}
        </div>

        {back && (
          <button
            type="button"
            onClick={back}
            className="mt-6 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-100 transition hover:bg-white/15"
          >
            Torna alla Home
          </button>
        )}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {custodeMetrics.map((metric) => (
          <CustodeMetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        {custodePanels.map((panel) => (
          <CustodePanelCard key={panel.title} panel={panel} />
        ))}
      </section>

      <div className="mt-6">
        <ProtectedActionsPanel actions={protectedActions} />
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-6 text-slate-300">
        <h2 className="text-xl font-black text-white">Regola di separazione</h2>
        <p className="mt-3">
          La dashboard cliente mostra il cammino personale. La vista Motore mostra
          l’albero completo. L’Area Custode raccoglie la meccanica interna e le
          future azioni protette, senza attivare nulla in questa versione.
        </p>
      </section>
    </main>
  );
}
