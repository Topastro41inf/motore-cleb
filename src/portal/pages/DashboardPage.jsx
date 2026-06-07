import { useMemo, useState } from "react";

const scenarios = {
  nonIscritto: {
    label: "Non iscritto",
    subtitle: "Utente esterno, nessun accesso operativo.",
    user: {
      name: "Visitatore",
      clebStatus: "non attivo",
      entryOrigin: "Pubblico",
      uvStatus: "chiuso",
      filoStatus: "chiuso",
      baseDots: 0,
      uvDots: 0,
      extraDots: 0,
      treeDotsGenerated: 0,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 0,
    },
    events: [
      "Visita al portale pubblico",
      "Nessuna iscrizione C.L.E.B. attiva",
      "UV e Filo restano chiusi",
    ],
    rule: "Senza iscrizione C.L.E.B. attiva, UV e Filo di Arianna restano chiusi.",
  },

  clebAttivo: {
    label: "C.L.E.B. attivo",
    subtitle: "Iscrizione base completata.",
    user: {
      name: "Utente C.L.E.B.",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B.",
      uvStatus: "non attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 0,
      treeDotsGenerated: 0,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 0,
    },
    events: [
      "Iscrizione C.L.E.B. simulata",
      "Pallino base assegnato",
      "Dashboard utente attivata in modalità simulata",
    ],
    rule: "Chi si iscrive solo a C.L.E.B. riceve 1 pallino base.",
  },

  arrivaDaUv: {
    label: "Arriva da UV",
    subtitle: "Ingresso proveniente da Unità Valore, ma iscrizione C.L.E.B. necessaria.",
    user: {
      name: "Utente da UV",
      clebStatus: "attivo",
      entryOrigin: "Unità Valore",
      uvStatus: "accesso dopo C.L.E.B.",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 0,
      treeDotsGenerated: 0,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 0,
    },
    events: [
      "Utente arrivato dal flusso UV",
      "Iscrizione C.L.E.B. richiesta",
      "Assegnato 1 solo pallino totale",
      "Nessun doppio pallino C.L.E.B. + UV",
    ],
    rule: "Se l’utente arriva da UV ma non è ancora C.L.E.B., deve iscriversi a C.L.E.B. e riceve 1 solo pallino totale.",
  },

  clebUv: {
    label: "C.L.E.B. + UV",
    subtitle: "Utente già C.L.E.B. che entra successivamente in UV.",
    user: {
      name: "Utente C.L.E.B. + UV",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B. poi UV",
      uvStatus: "attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 1,
      extraDots: 0,
      treeDotsGenerated: 0,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 0,
    },
    events: [
      "Utente già C.L.E.B. attivo",
      "Accesso UV simulato",
      "Pallino aggiuntivo UV assegnato",
    ],
    rule: "Se l’utente è già iscritto C.L.E.B. ed entra poi in UV, riceve 1 pallino aggiuntivo UV.",
  },

  clebFilo: {
    label: "C.L.E.B. + Filo",
    subtitle: "Accesso al Filo di Arianna senza pallini aggiuntivi.",
    user: {
      name: "Utente C.L.E.B. + Filo",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B. poi Filo",
      uvStatus: "non attivo",
      filoStatus: "attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 0,
      treeDotsGenerated: 0,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 0,
    },
    events: [
      "Utente già C.L.E.B. attivo",
      "Accesso al Filo di Arianna simulato",
      "Nessun pallino aggiuntivo generato dal Filo",
    ],
    rule: "Il Filo di Arianna è accessibile solo a utenti C.L.E.B. attivi e non genera pallini aggiuntivi.",
  },

  pacchettoExtra: {
    label: "Pallini extra",
    subtitle: "Acquisizione simulata di un pacchetto extra.",
    user: {
      name: "Utente con pacchetto extra",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B.",
      uvStatus: "non attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 3,
      treeDotsGenerated: 0,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 0,
    },
    events: [
      "Iscrizione C.L.E.B. attiva",
      "Pacchetto extra simulato: 3 pallini",
      "Controllo limite annuo: massimo 10 pallini extra",
    ],
    rule: "Oltre al pallino base, l’utente può acquisire 3, 6, 9 o 10 pallini extra, con massimo 10 extra all’anno.",
  },

  maturazione: {
    label: "Maturazione avvenuta",
    subtitle: "Un pallino matura e genera le tre conseguenze distinte.",
    user: {
      name: "Utente con maturazione",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B.",
      uvStatus: "non attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 3,
      treeDotsGenerated: 1,
      maturedPersonalDots: 1,
      redeemedDots: 0,
      reinsertedDots: 0,
      clebSquares: 2,
    },
    events: [
      "Pallino attivo maturato",
      "Creato 1 nuovo pallino nell’albero",
      "Creato 1 pallino personale maturato in dashboard",
      "Creati 2 quadrati C.L.E.B.",
    ],
    rule: "Quando 1 pallino matura: 1 nuovo pallino nell’albero + 1 pallino personale utente + 2 quadrati C.L.E.B.",
  },

  riscatto: {
    label: "Riscatto simulato",
    subtitle: "Il pallino personale maturato viene riscattato dall’utente.",
    user: {
      name: "Utente con riscatto",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B.",
      uvStatus: "non attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 3,
      treeDotsGenerated: 1,
      maturedPersonalDots: 0,
      redeemedDots: 1,
      reinsertedDots: 0,
      clebSquares: 2,
    },
    events: [
      "Maturazione precedente registrata",
      "Pallino personale spostato da maturato a riscattato",
      "Storico evento conservato",
      "Nessun reinserimento automatico",
    ],
    rule: "Il pallino maturato personale può essere riscattato. Non va reinserito automaticamente.",
  },

  reinserimento: {
    label: "Reinserimento simulato",
    subtitle: "Il pallino maturato personale viene reinserito nell’albero su scelta dell’utente.",
    user: {
      name: "Utente con reinserimento",
      clebStatus: "attivo",
      entryOrigin: "C.L.E.B.",
      uvStatus: "non attivo",
      filoStatus: "non attivo",
      baseDots: 1,
      uvDots: 0,
      extraDots: 3,
      treeDotsGenerated: 2,
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 1,
      clebSquares: 2,
    },
    events: [
      "Maturazione precedente registrata",
      "Utente sceglie reinserimento volontario",
      "Pallino personale spostato da maturato a reinserito",
      "Nuovo collegamento simulato all’albero",
    ],
    rule: "L’utente può tenere, riscattare o reinserire il pallino personale maturato. La scelta deve essere tracciata.",
  },
};

const scenarioOrder = [
  "nonIscritto",
  "clebAttivo",
  "arrivaDaUv",
  "clebUv",
  "clebFilo",
  "pacchettoExtra",
  "maturazione",
  "riscatto",
  "reinserimento",
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
  const [selectedScenario, setSelectedScenario] = useState("clebAttivo");
  const scenario = scenarios[selectedScenario];
  const user = scenario.user;

  const activeDots = useMemo(
    () => user.baseDots + user.uvDots + user.extraDots,
    [user.baseDots, user.uvDots, user.extraDots]
  );

  const dotRows = [
    {
      label: "Pallino base C.L.E.B.",
      value: user.baseDots,
      note: "Nasce con l’iscrizione C.L.E.B. attiva.",
    },
    {
      label: "Pallino UV",
      value: user.uvDots,
      note: "Aggiunto solo se l’utente era già C.L.E.B. prima di entrare in UV.",
    },
    {
      label: "Pallini extra",
      value: user.extraDots,
      note: "Pacchetti previsti: 3, 6, 9, 10. Massimo 10 extra annui.",
    },
    {
      label: "Nuovi pallini generati nell’albero",
      value: user.treeDotsGenerated,
      note: "Effetto della maturazione o del reinserimento, distinto dai crediti personali.",
    },
    {
      label: "Pallini maturati personali",
      value: user.maturedPersonalDots,
      note: "Crediti personali maturati e ancora disponibili nella dashboard.",
    },
    {
      label: "Pallini riscattati",
      value: user.redeemedDots,
      note: "Pallini personali già riscattati dall’utente.",
    },
    {
      label: "Pallini reinseriti",
      value: user.reinsertedDots,
      note: "Pallini maturati che l’utente ha scelto di reinserire nell’albero.",
    },
    {
      label: "Quadrati C.L.E.B.",
      value: user.clebSquares,
      note: "Generati dalla maturazione secondo la regola: 1 pallino maturo = 2 quadrati C.L.E.B.",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-zinc-100">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-amber-300">
          Dashboard simulata v2
        </p>
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Area Utente C.L.E.B.
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Questa schermata testa scenari diversi senza registrare utenti reali,
          senza pagamenti, senza backend e senza modificare il motore dell’albero.
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
          {scenarioOrder.map((key) => (
            <option key={key} value={key}>
              {scenarios[key].label}
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
          {[
            "Pallino nell’albero",
            "Pallino maturato dashboard",
            "Pallino riscattato",
            "Pallino reinserito",
            "Quadrato C.L.E.B.",
          ].map((item) => (
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
