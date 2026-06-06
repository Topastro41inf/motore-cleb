import { useMemo, useState } from 'react';

const scenarios = {
  guest: {
    label: 'Non iscritto',
    clebActive: false,
    entry: 'Nessuna iscrizione attiva',
    pallini: '0',
    uv: 'Bloccato',
    filo: 'Bloccato',
    note: 'L’utente deve prima iscriversi a C.L.E.B. e accettare i documenti previsti.',
  },
  cleb: {
    label: 'C.L.E.B. attivo',
    clebActive: true,
    entry: 'Iscrizione C.L.E.B. diretta',
    pallini: '1 pallino base',
    uv: 'Disponibile come servizio successivo',
    filo: 'Disponibile come servizio successivo',
    note: 'L’utente ha il cancello principale attivo e può accedere ai servizi collegati secondo regolamento.',
  },
  fromUv: {
    label: 'Arriva da UV',
    clebActive: true,
    entry: 'Iscrizione C.L.E.B. richiesta dal flusso UV',
    pallini: '1 pallino totale',
    uv: 'Attivabile dopo iscrizione C.L.E.B.',
    filo: 'Disponibile come servizio successivo',
    note: 'Non si genera doppio pallino. C.L.E.B. + UV nello stesso flusso genera un solo pallino totale.',
  },
  fromFilo: {
    label: 'Arriva dal Filo',
    clebActive: true,
    entry: 'Iscrizione C.L.E.B. richiesta dal Filo di Arianna',
    pallini: '1 pallino base',
    uv: 'Disponibile come servizio successivo',
    filo: 'Sedute armonizzanti abilitate',
    note: 'Il Filo di Arianna non genera pallini aggiuntivi. Richiede comunque C.L.E.B. attivo.',
  },
};

function StatusBadge({ active }) {
  return (
    <span
      className={
        active
          ? 'rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-100'
          : 'rounded-full border border-rose-300/30 bg-rose-300/10 px-3 py-1 text-xs font-bold text-rose-100'
      }
    >
      {active ? 'C.L.E.B. attivo' : 'C.L.E.B. non attivo'}
    </span>
  );
}

function Step({ number, title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-sm font-black text-slate-950">
          {number}
        </span>
        <p className="font-semibold text-white">{title}</p>
      </div>
      <div className="text-sm leading-7 text-slate-200">{children}</div>
    </div>
  );
}

export default function AccessPage({ back }) {
  const [scenarioKey, setScenarioKey] = useState('guest');
  const scenario = scenarios[scenarioKey];

  const documents = useMemo(
    () => [
      'Regolamento iscrizione C.L.E.B.',
      'Responsabilità personale',
      'Guarentigie / dichiarazioni',
      'Privacy e trattamento dati',
      'Regole pallini, maturazioni, riscatti e reinserimenti',
      'Condizioni dei servizi collegati',
    ],
    []
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 md:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-7 shadow-2xl backdrop-blur md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-amber-200/80">
              Prototipo interfaccia
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Accesso / Iscrizione C.L.E.B.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
              Questa schermata è una simulazione. Non registra utenti reali, non crea
              pagamenti e non modifica il motore. Serve a verificare il flusso corretto
              prima di costruire login, backend e dashboard reale.
            </p>
          </div>

          <button
            type="button"
            onClick={back}
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
          >
            Torna al sito
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200/20 bg-amber-200/10 p-6">
        <h2 className="mb-4 text-2xl font-semibold text-amber-100">Simula scenario utente</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(scenarios).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setScenarioKey(key)}
              className={
                key === scenarioKey
                  ? 'rounded-2xl bg-amber-300 px-4 py-3 text-sm font-bold text-slate-950'
                  : 'rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15'
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur lg:col-span-2">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-white">Scheda situazione simulata</h2>
            <StatusBadge active={scenario.clebActive} />
          </div>

          <div className="grid gap-4 text-sm leading-7 text-slate-100 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-950/35 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Ingresso</p>
              <p className="mt-2 font-semibold text-white">{scenario.entry}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/35 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Pallini iniziali</p>
              <p className="mt-2 font-semibold text-white">{scenario.pallini}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/35 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Unità Valore</p>
              <p className="mt-2 font-semibold text-white">{scenario.uv}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/35 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Filo di Arianna</p>
              <p className="mt-2 font-semibold text-white">{scenario.filo}</p>
            </div>
          </div>

          <p className="mt-5 rounded-2xl border border-sky-200/20 bg-sky-200/10 p-4 text-sm leading-7 text-sky-50">
            {scenario.note}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur">
          <h2 className="mb-4 text-2xl font-semibold text-white">Documenti previsti</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-200">
            {documents.map((doc) => (
              <li key={doc} className="rounded-2xl bg-slate-950/35 p-3">
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Step number="1" title="Iscrizione C.L.E.B.">
          L’utente entra nel sistema madre, accetta documenti e responsabilità, e ottiene
          lo stato C.L.E.B. attivo.
        </Step>

        <Step number="2" title="Pallino base">
          L’iscrizione genera 1 pallino base. Se l’utente arriva da UV nello stesso flusso,
          non riceve doppio pallino.
        </Step>

        <Step number="3" title="Servizi collegati">
          Solo dopo C.L.E.B. attivo possono aprirsi UV e Filo di Arianna, ciascuno con le
          proprie regole.
        </Step>
      </section>

      <section className="rounded-3xl border border-rose-200/20 bg-rose-200/10 p-6 text-sm leading-7 text-rose-50">
        <h2 className="mb-3 text-2xl font-semibold text-white">Blocco di sicurezza</h2>
        <p>
          Questa pagina è solo dimostrativa. Le funzioni reali di registrazione, firma,
          gestione dati, pagamenti, dashboard, riscatti e reinserimenti saranno attivate
          solo dopo backend, documenti, test e controlli.
        </p>
      </section>
    </main>
  );
}
