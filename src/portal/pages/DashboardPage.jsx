import { useMemo, useState } from "react";
import CounterRow from "../components/dashboard/CounterRow";
import DashboardCard from "../components/dashboard/DashboardCard";
import EventList from "../components/dashboard/EventList";
import InfoLine from "../components/dashboard/InfoLine";
import ScenarioSelector from "../components/dashboard/ScenarioSelector";
import SeparationGrid from "../components/dashboard/SeparationGrid";
import StatusBadge from "../components/dashboard/StatusBadge";
import FutureActionsPanel from "../components/dashboard/FutureActionsPanel";
import {
  dashboardCounterDefinitions,
  dashboardScenarioOrder,
  dashboardScenarios,
  dashboardSeparationItems,
} from "../data/dashboardScenarios";

export default function DashboardPage() {
  const [selectedScenario, setSelectedScenario] = useState("clebAttivo");
  const scenario = dashboardScenarios[selectedScenario];
  const user = scenario.user;

  const activeDots = useMemo(
    () => user.baseDots + user.uvDots + user.extraDots,
    [user.baseDots, user.uvDots, user.extraDots]
  );

  const dotRows = dashboardCounterDefinitions.map((definition) => ({
    ...definition,
    value: user[definition.field] ?? 0,
  }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-zinc-100">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-amber-300">
          Dashboard cliente simulata
        </p>
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Area Utente C.L.E.B.
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Questa schermata mostra solo la posizione personale dell’utente: stato,
          accessi e pallini personali. L’albero completo resta consultabile nella
          vista Motore/Albero, mentre quadrati, triangoli e meccaniche interne
          non diventano contatori della dashboard cliente.
        </p>
      </div>

      <ScenarioSelector
        selectedScenario={selectedScenario}
        setSelectedScenario={setSelectedScenario}
        scenario={scenario}
        scenarioOrder={dashboardScenarioOrder}
        scenarios={dashboardScenarios}
      />

      <div className="mb-5 rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-4 text-sm leading-6 text-sky-50">
        <strong className="text-white">Nota vista cliente:</strong> questa dashboard mostra solo i pallini personali dell’utente. 
        L’albero completo resta visibile nella vista Motore/Albero, ma quadrati, triangoli e meccaniche interne sono materia Admin/Custode.
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <DashboardCard title="Stato utente">
          <div className="space-y-3 text-sm">
            <InfoLine label="Nome">{user.name}</InfoLine>
            <InfoLine label="C.L.E.B.">
              <StatusBadge active={user.clebStatus === "attivo"}>
                {user.clebStatus}
              </StatusBadge>
            </InfoLine>
            <InfoLine label="Origine ingresso">{user.entryOrigin}</InfoLine>
            <InfoLine label="Unità Valore">
              <StatusBadge active={user.uvStatus === "attivo"}>
                {user.uvStatus}
              </StatusBadge>
            </InfoLine>
            <InfoLine label="Filo di Arianna">
              <StatusBadge active={user.filoStatus === "attivo"}>
                {user.filoStatus}
              </StatusBadge>
            </InfoLine>
          </div>
        </DashboardCard>

        <DashboardCard title="Pallini attivi">
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-amber-300">
              {activeDots}
            </span>
            <span className="pb-2 text-sm text-zinc-400">
              base + UV + extra
            </span>
          </div>
          <p className="mt-4 text-sm text-zinc-300">
            I pallini attivi non sono la stessa cosa dei pallini maturati,
            riscattati o reinseriti.
          </p>
        </DashboardCard>

        <DashboardCard title="Regola scenario">
          <div className="rounded-xl bg-black/20 p-4 text-sm leading-6 text-zinc-300">
            {scenario.rule}
          </div>
        </DashboardCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <DashboardCard title="Dettaglio contatori">
          <div className="space-y-3">
            {dotRows.map((row) => (
              <CounterRow
                key={row.label}
                label={row.label}
                value={row.value}
                note={row.note}
              />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Storico eventi simulato">
          <EventList events={scenario.events} scenarioKey={selectedScenario} />

          <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
            Questa dashboard è didattica: nessun evento modifica dati reali e
            nessun pallino viene scritto nel motore.
          </div>
        </DashboardCard>
      </div>

      <SeparationGrid items={dashboardSeparationItems} />
    
      <FutureActionsPanel />
</main>
  );
}
