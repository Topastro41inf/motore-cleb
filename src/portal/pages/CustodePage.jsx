import {
  custodeActions,
  custodeAreas,
  custodeLog,
  custodeSummary,
} from "../data/custodePanels";
import CustodeActionPanel from "../components/custode/CustodeActionPanel";
import CustodeAreaList from "../components/custode/CustodeAreaList";
import CustodeCard from "../components/custode/CustodeCard";
import CustodeLogPreview from "../components/custode/CustodeLogPreview";
import CustodeMetric from "../components/custode/CustodeMetric";

export default function CustodePage({ back }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-zinc-100 md:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-amber-300">
            Area Custode simulata
          </p>
          <h1 className="text-3xl font-black text-white md:text-5xl">
            Controllo interno C.L.E.B.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
            Questa area non è la dashboard cliente. È il futuro spazio tecnico
            per Aèl e Flavio, dove saranno governati controlli, log,
            maturazioni strutturali, quadrati, triangoli e verifiche interne.
            In questa versione tutto è simulato.
          </p>
        </div>

        <button
          type="button"
          onClick={back}
          className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
        >
          Torna alla Home
        </button>
      </div>

      <div className="mb-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-6 text-amber-100">
        <strong>Regola di visibilità:</strong> il cliente può vedere l’albero
        completo nella vista Motore, ma nella dashboard personale vede solo il
        suo cammino. Quadrati, triangoli e meccaniche interne appartengono alla
        gestione Custode.
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {custodeSummary.map((item) => (
          <CustodeMetric
            key={item.label}
            label={item.label}
            value={item.value}
            note={item.note}
            tone={item.tone}
          />
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CustodeCard title="Aree di controllo" kicker="mappa operativa">
          <CustodeAreaList areas={custodeAreas} />
        </CustodeCard>

        <CustodeCard title="Log tecnico simulato" kicker="nessun dato reale">
          <CustodeLogPreview events={custodeLog} />
        </CustodeCard>
      </div>

      <div className="mt-6">
        <CustodeCard title="Azioni future Custode" kicker="bloccate per sicurezza">
          <CustodeActionPanel actions={custodeActions} />
        </CustodeCard>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-6 text-zinc-300">
        <p className="font-semibold text-white">Sigillo operativo</p>
        <p className="mt-2">
          Questa pagina prepara il ruolo Custode senza attivare funzioni reali:
          nessun backend, nessun account reale, nessun pagamento, nessuna
          modifica all’albero, nessun intervento su MotoreCleb.jsx.
        </p>
      </div>
    </main>
  );
}
