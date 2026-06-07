import { useMemo, useState } from "react";
import {
  dashboardCounterDefinitions,
  dashboardScenarioOrder,
  dashboardScenarios,
  dashboardSeparationItems,
} from "../data/dashboardScenarios";

function StatusBadge({ children, active }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-500/15 text-emerald-300"
          : "bg-zinc-500/15 text-zinc-300"
      }`}
    >
      {children}
    </span>
  );
}

function DashboardCard({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function CounterRow({ label, value, note }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-white">{label}</h3>
        <span className="rounded-full bg-amber-400/15 px-3 py-1 font-bold text-amber-300">
          {value}
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{note}</p>
    </div>
  );
}

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
          Dashboard simulata · dati modulari
        </p>
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Area Utente C.L.E.B.
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Questa schermata testa scenari diversi senza registrare utenti reali,
          senza pagamenti, senza backend e senza modificare il motore dell’albero.
          Gli scenari sono separati in un modulo dati dedicato.
        </p>
      </div>

      <section className="mb-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
        <label
          htmlFor="scenario"
          className="mb-3 block text-sm font-semibold uppercase tracking-[0.22em] text-amber-200"
        >
          Scenario utente
        </label>
        <select
          id="scenario"
          value={selectedScenario}
          onChange={(event) => setSelectedScenario(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none ring-amber-300/30 focus:ring-4"
        >
          {dashboardScenarioOrder.map((key) => (
            <option key={key} value={key}>
              {dashboardScenarios[key].label}
            </option>
          ))}
        </select>
        <p className="mt-3 text-sm text-amber-100">{scenario.subtitle}</p>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        <DashboardCard title="Stato utente">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">Nome</span>
              <span>{user.name}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">C.L.E.B.</span>
              <StatusBadge active={user.clebStatus === "attivo"}>
                {user.clebStatus}
              </StatusBadge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">Origine ingresso</span>
              <span>{user.entryOrigin}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">Unità Valore</span>
              <StatusBadge active={user.uvStatus === "attivo"}>
                {user.uvStatus}
              </StatusBadge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">Filo di Arianna</span>
              <StatusBadge active={user.filoStatus === "attivo"}>
                {user.filoStatus}
              </StatusBadge>
            </div>
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
            riscattati, reinseriti o dei quadrati C.L.E.B.
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
          <div className="space-y-3">
            {scenario.events.map((event, index) => (
              <div
                key={`${selectedScenario}-${event}`}
                className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-amber-300">
                  {index + 1}
                </span>
                <span className="text-zinc-300">{event}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
            Questa dashboard è didattica: nessun evento modifica dati reali e
            nessun pallino viene scritto nel motore.
          </div>
        </DashboardCard>
      </div>

      <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-lg font-semibold text-white">
          Separazione obbligatoria
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {dashboardSeparationItems.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
