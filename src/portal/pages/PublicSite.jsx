import Card from '../components/Card';

export default function PublicSite({ openEngine }) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 md:px-8">
      <section id="home" className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-7 shadow-2xl backdrop-blur md:p-10">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-amber-200/80">Sistema madre</p>
        <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
          C.L.E.B.
          <span className="block bg-gradient-to-r from-amber-200 via-sky-200 to-white bg-clip-text text-transparent">
            Un ecosistema ordinato di partecipazione, valore e responsabilità.
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
          C.L.E.B. è il punto di accesso centrale: iscrizione, regole condivise,
          responsabilità, situazione personale, servizi collegati e motore ad albero.
          Ogni passaggio importante deve essere chiaro, tracciato e comprensibile.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openEngine}
            className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-950/30 transition hover:bg-amber-200"
          >
            Apri il motore C.L.E.B.
          </button>
          <a
            href="#accesso"
            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Leggi le regole di accesso
          </a>
        </div>
      </section>

      <div id="visione" className="grid gap-6 lg:grid-cols-2">
        <Card title="La visione">
          <p>
            C.L.E.B. nasce per dare una struttura ordinata a persone, quote personali,
            servizi e percorsi collegati. Non è solo un albero grafico: è un sistema
            che deve proteggere fiducia, chiarezza e continuità.
          </p>
          <p>
            Ogni utente dovrà poter accedere alla propria area personale e vedere la
            propria situazione senza ambiguità.
          </p>
        </Card>

        <Card title="Perché serve un account">
          <p>
            L’account personale è il registro dell’utente. Serve a controllare
            iscrizione, documenti accettati, pallini attivi, pallini maturati,
            riscatti, reinserimenti e servizi abilitati.
          </p>
          <p>
            Senza account personale non ci può essere gestione sicura delle maturazioni
            e delle scelte dell’utente.
          </p>
        </Card>
      </div>

      <section id="accesso" className="rounded-3xl border border-amber-200/20 bg-amber-200/10 p-6 backdrop-blur">
        <h2 className="mb-4 text-2xl font-semibold text-amber-100">Accesso, responsabilità e pallini</h2>
        <div className="grid gap-4 text-sm leading-7 text-slate-100 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-950/35 p-4">
            <p className="font-semibold text-white">Iscrizione C.L.E.B.</p>
            <p>L’iscrizione è il cancello principale.</p>
            <p>Chi entra in C.L.E.B. riceve 1 pallino base e accetta i documenti previsti.</p>
          </div>

          <div className="rounded-2xl bg-slate-950/35 p-4">
            <p className="font-semibold text-white">Pallini extra</p>
            <p>Oltre all’iscrizione, l’utente può acquisire pacchetti da 3, 6, 9 o 10 pallini.</p>
            <p>Il limite massimo è 10 pallini extra all’anno.</p>
          </div>

          <div className="rounded-2xl bg-slate-950/35 p-4">
            <p className="font-semibold text-white">Maturazione</p>
            <p>Quando un pallino matura, il sistema genera:</p>
            <p>1 nuovo pallino nell’albero, 1 pallino personale per l’utente, 2 quadrati C.L.E.B.</p>
          </div>

          <div className="rounded-2xl bg-slate-950/35 p-4">
            <p className="font-semibold text-white">Dashboard utente</p>
            <p>Il pallino maturato personale non viene reinserito automaticamente.</p>
            <p>L’utente potrà tenerlo, riscattarlo o reinserirlo secondo regolamento.</p>
          </div>
        </div>
      </section>

      <section id="servizi" className="grid gap-6 lg:grid-cols-2">
        <Card title="Unità Valore">
          <p>
            Unità Valore è un servizio collegato a C.L.E.B. e non una porta separata.
            Per accedere a UV serve iscrizione C.L.E.B. attiva.
          </p>
          <p>
            Se un utente è già iscritto a C.L.E.B. e poi entra in UV, può ricevere
            1 pallino aggiuntivo UV. Se invece arriva da UV e si iscrive a C.L.E.B.
            nello stesso flusso, riceve 1 solo pallino totale.
          </p>
        </Card>

        <Card title="Il Filo di Arianna">
          <p>
            Il Filo di Arianna è accessibile solo a utenti C.L.E.B. attivi.
            Non genera pallini aggiuntivi: abilita le sedute armonizzanti secondo
            le regole e i consensi previsti.
          </p>
          <p>
            Il linguaggio resta responsabile: nessuna promessa medica, nessuna
            garanzia di risultato, massima chiarezza sulle finalità del percorso.
          </p>
        </Card>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-6 text-sm leading-7 text-slate-200">
        <h2 className="mb-3 text-2xl font-semibold text-white">Nota di sviluppo</h2>
        <p>
          Questa è una prima bozza del sito pubblico. Login reale, pagamenti,
          backend, documenti firmati e dashboard operativa saranno sviluppati
          in moduli separati, con backup e test prima di ogni passaggio.
        </p>
      </section>
    </main>
  );
}
