export const documentiStatuses = [
  {
    label: "Modalità attuale",
    value: "Simulata",
    note: "Il portale non gestisce ancora dati reali, pagamenti o account veri.",
  },
  {
    label: "Priorità",
    value: "Chiarezza",
    note: "Le regole vengono rese visibili prima di trasformarle in funzioni operative.",
  },
  {
    label: "Prossimo livello",
    value: "Validazione",
    note: "Prima test controllati, poi eventuale backend sicuro e area protetta reale.",
  },
];

export const documentiSections = [
  {
    group: "Accesso",
    title: "Regole accesso, account e pallini",
    status: "regola operativa",
    file: "docs/REGOLA_ACCESSO_ACCOUNT_PALLINI.md",
    summary:
      "Definisce C.L.E.B. come cancello madre e separa iscrizione, UV, Filo di Arianna, pallini extra e maturazioni.",
    points: [
      "Nessun UV senza iscrizione C.L.E.B. attiva.",
      "Nessun Filo di Arianna senza iscrizione C.L.E.B. attiva.",
      "Il pallino personale maturato non viene reinserito automaticamente.",
    ],
  },
  {
    group: "Dashboard",
    title: "Dashboard cliente e albero",
    status: "regola operativa",
    file: "docs/REGOLA_DASHBOARD_CLIENTE_ALBERO_CLEB.md",
    summary:
      "Stabilisce che la dashboard cliente mostra il percorso personale, mentre l’albero completo resta visibile nella vista Motore.",
    points: [
      "Dashboard cliente: pallini e crediti personali.",
      "Motore/Albero: struttura completa visibile.",
      "Custode: meccaniche interne e controllo protetto.",
    ],
  },
  {
    group: "Lessico",
    title: "Lessico saldo/albero",
    status: "regola operativa",
    file: "docs/REGOLA_LESSICO_DASHBOARD_CLEB.md",
    summary:
      "Evita confusione tra pallini nell’albero e crediti personali disponibili, riscattati o reinseriti.",
    points: [
      "Non usare 'pallini attivi' come se fossero saldo spendibile.",
      "Usare 'pallini nell’albero' per la struttura.",
      "Usare 'crediti personali' per maturati, riscatti e reinserimenti.",
    ],
  },
  {
    group: "Unità Valore",
    title: "UV offline",
    status: "regola operativa",
    file: "docs/REGOLA_UV_OFFLINE_CLEB.md",
    summary:
      "Chiarisce che il programma UV reale resta offline e separato. Il sito mostra solo il suo ruolo dentro C.L.E.B.",
    points: [
      "Non importare nel portale nodi, registry o pendrive reali.",
      "Non esporre algoritmi interni o formule tecniche.",
      "Il Custode governa la porta, non il cliente.",
    ],
  },
  {
    group: "Filo di Arianna",
    title: "FdA separato dal portale",
    status: "regola operativa",
    file: "docs/REGOLA_PAGINA_FDA_CLEB.md",
    summary:
      "Stabilisce che nel sito entra solo una porta informativa/simulativa, non il programma completo del Filo di Arianna.",
    points: [
      "Il link alla simulazione esterna è una porta modificabile dai Custodi.",
      "Audio, frequenze e rituali profondi restano fuori dal portale.",
      "Nessuna memoria rituale reale viene salvata nel sito.",
    ],
  },
  {
    group: "Legale",
    title: "Privacy, termini e consenso",
    status: "futuro legale",
    file: "docs/PRIVACY_TERMINI_CONSENSI_CLEB.md",
    summary:
      "Area futura per privacy policy, termini d’uso, consenso informato e avvertenze prima di ogni apertura pubblica reale.",
    points: [
      "Da completare prima di account reali.",
      "Da validare prima di pagamenti o raccolta dati personali.",
      "Non sostituisce revisione professionale.",
    ],
  },
];

export const documentiPrinciples = [
  {
    title: "C.L.E.B. coordina",
    text:
      "Il portale ordina accessi, informazioni, dashboard e albero. Non deve diventare un contenitore confuso di tutti i sistemi operativi.",
  },
  {
    title: "UV resta offline",
    text:
      "Unità Valore vive tramite strumenti dedicati, pendrive, Custodi e procedure esterne. Nel sito entra solo la spiegazione del suo ruolo.",
  },
  {
    title: "FdA resta separato",
    text:
      "Il Filo di Arianna può avere una porta o una simulazione esterna, ma il programma completo non viene inglobato nel portale C.L.E.B.",
  },
];
