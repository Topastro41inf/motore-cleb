import { useMemo, useState } from "react";

const SCENARIOS = {
  cleb: {
    label: "C.L.E.B. attivo",
    user: {
      name: "Utente C.L.E.B.",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B.",
      uvStatus: "non attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 3,
      maturedPersonalDots: 1,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 2,
    },
    events: [
      "Iscrizione C.L.E.B. simulata",
      "Pallino base assegnato",
      "Pacchetto extra simulato: 3 pallini",
      "Maturazione simulata: 1 pallino personale + 2 quadrati C.L.E.B.",
    ],
  },
  clebUv: {
    label: "Già C.L.E.B. + UV",
    user: {
      name: "Utente C.L.E.B. + UV",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B. poi UV",
      uvStatus: "attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 1,
      extraDots: 6,
      maturedPersonalDots: 2,
      redeemedDots: 1,
      reinsertedDots: 0,
      clebSquares: 4,
    },
    events: [
      "Iscrizione C.L.E.B. simulata",
      "Pallino base assegnato",
      "Accesso UV simulato per utente già C.L.E.B.",
      "Pallino UV aggiuntivo simulato",
      "Riscatto simulato di 1 pallino personale",
    ],
  },
  uvEntry: {
    label: "Arrivo da UV",
    user: {
      name: "Utente arrivato da UV",
      clebStatus: "attivo",
      entryOrigin: "UV → iscrizione C.L.E.B.",
      uvStatus: "attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 0,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 0,
    },
    events: [
      "Ingresso simulato da Unità Valore",
      "Iscrizione obbligatoria a C.L.E.B.",
      "Assegnato 1 solo pallino totale",
      "Nessun doppio pallino C.L.E.B. + UV",
    ],
  },
  filo: {
    label: "C.L.E.B. + Filo",
    user: {
      name: "Utente Filo di Arianna",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B. → Filo",
      uvStatus: "non attivo",
      filoStatus: "attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 0,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 0,
    },
    events: [
      "Iscrizione C.L.E.B. simulata",
      "Pallino base assegnato",
      "Accesso al Filo di Arianna simulato",
      "Nessun pallino aggiuntivo generato dal Filo",
    ],
  },
};

const COUNTER_NOTES = [
  {
    key: "baseDots",
    label: "Pallino base C.L.E.B.",
    note: "Nasce con l’iscrizione C.L.E.B. attiva.",
  },
  {
    key: "uvDots",
    label: "Pallino UV",
    note: "Aggiunto solo se l’utente era già C.L.E.B. prima di entrare in UV.",
  },
  {
    key: "extraDots",
    label: "Pallini extra",
    note: "Acquisibili nei pacchetti previsti: 3, 6, 9, 10. Massimo 10 extra annui.",
  },
  {
    key: "maturedPersonalDots",
    label: "Pallini maturati personali",
    note: "Crediti personali maturati e visibili in dashboard.",
  },
  {
    key: "redeemedDots",
    label: "Pallini riscattati",
    note: "Pallini personali già riscattati dall’utente.",
  },
  {
    key: "reinsertedDots",
    label: "Pallini reinseriti",
    note: "Pallini maturati che l’utente ha scelto di reinserire nell’albero.",
  },
  {
    key: "clebSquares",
    label: "Quadrati C.L.E.B.",
    note: "Generati dalla maturazione secondo la regola: 1 pallino maturo = 2 quadrati C.L.E.B.",
  },
];

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
  const [scenarioKey, setScenarioKey] = useState("cleb");
  const scenario = SCENARIOS[scenarioKey];
  const user = scenario.user;

  const totalActiveDots = useMemo(
    () => user.baseDots + user.uvDots + user.extraDots,
    [user.baseDots, user.uvDots, user.extraDots]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-zinc-100">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-amber-300">
          Dashboard simulata
        </p>
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Area Utente C.L.E.B.
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Questa schermata non registra dati reali, non modifica l’albero e non
          attiva pagamenti. Serve a distinguere con chiarezza pallini attivi,
          pallini maturati, riscatti, reinserimenti e quadrati C.L.E.B.
        </p>
      </div>

      <section className="mb-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Scenario di simulazione
            </h2>
            <p className="mt-1 text-sm text-amber-100">
              Cambia scenario per verificare le regole senza toccare dati reali.
            </p>
          </div>

          <select
            value={scenarioKey}
            onChange={(event) => setScenarioKey(event.target.value)}
            className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm font-semibold text-white outline-none ring-amber-300/40 transition focus:ring-2"
          >
            {Object.entries(SCENARIOS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
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
              <span className="text-right">{user.entryOrigin}</span>
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
              {totalActiveDots}
            </span>
            <span className="pb-2 text-sm text-zinc-400">
              attivi nella simulazione
            </span>
          </div>
          <p className="mt-4 text-sm text-zinc-300">
            I pallini attivi non sono la stessa cosa dei pallini maturati,
            riscattati o reinseriti.
          </p>
        </DashboardCard>

        <DashboardCard title="Maturazione simulata">
          <div className="rounded-xl bg-black/20 p-4 text-sm text-zinc-300">
            <p className="font-semibold text-white">Quando 1 pallino matura:</p>
            <ul className="mt-3 space-y-2">
              <li>+ 1 nuovo pallino nell’albero</li>
              <li>+ 1 pallino personale in dashboard</li>
              <li>+ 2 quadrati C.L.E.B.</li>
            </ul>
          </div>
        </DashboardCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <DashboardCard title="Dettaglio contatori">
          <div className="space-y-3">
            {COUNTER_NOTES.map((row) => (
              <CounterRow
                key={row.key}
                label={row.label}
                value={user[row.key]}
                note={row.note}
              />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Storico eventi simulato">
          <div className="space-y-3">
            {scenario.events.map((event, index) => (
              <div
                key={event}
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
            Nessun evento qui modifica dati reali. La dashboard è solo una
            rappresentazione didattica del futuro modello account.
          </div>
        </DashboardCard>
      </div>
    </main>
  );
}
