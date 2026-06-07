// Dashboard C.L.E.B. — dati simulati lato cliente
// Regola di visibilità:
// - Il cliente vede in dashboard solo stato personale, accessi e pallini personali.
// - Il cliente può consultare l’albero completo nella vista Motore/Albero.
// - Quadrati, triangoli, calcoli strutturali e log interni non diventano contatori dashboard.
// - I campi adminOnly possono esistere nei dati simulati, ma NON vanno mostrati nella dashboard cliente.

export const dashboardScenarios = {
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
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      adminOnly: {
        clebSquares: 0,
        clebTriangles: 0,
      },
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
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      adminOnly: {
        clebSquares: 0,
        clebTriangles: 0,
      },
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
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      adminOnly: {
        clebSquares: 0,
        clebTriangles: 0,
      },
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
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      adminOnly: {
        clebSquares: 0,
        clebTriangles: 0,
      },
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
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      adminOnly: {
        clebSquares: 0,
        clebTriangles: 0,
      },
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
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 0,
      adminOnly: {
        clebSquares: 0,
        clebTriangles: 0,
      },
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
    subtitle: "Un pallino matura e aggiorna solo le informazioni utili al cliente.",
    user: {
      name: "Utente con maturazione",
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
      adminOnly: {
        clebSquares: 2,
        clebTriangles: 0,
      },
    },
    events: [
      "Pallino attivo maturato",
      "Aggiornamento visibile nell’albero",
      "Creato 1 pallino personale maturato in dashboard",
      "La parte strutturale interna resta gestita dagli amministratori",
    ],
    rule: "Quando un pallino matura, il cliente vede il credito personale maturato e l’eventuale aggiornamento visibile dell’albero. Calcoli, quadrati e triangoli restano area Admin/Custode.",
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
      maturedPersonalDots: 0,
      redeemedDots: 1,
      reinsertedDots: 0,
      adminOnly: {
        clebSquares: 2,
        clebTriangles: 0,
      },
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
      maturedPersonalDots: 0,
      redeemedDots: 0,
      reinsertedDots: 1,
      adminOnly: {
        clebSquares: 2,
        clebTriangles: 0,
      },
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

export const dashboardScenarioOrder = [
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

export const dashboardCounterDefinitions = [
  {
    label: "Pallino base C.L.E.B.",
    field: "baseDots",
    note: "Nasce con l’iscrizione C.L.E.B. attiva.",
  },
  {
    label: "Pallino UV",
    field: "uvDots",
    note: "Aggiunto solo se l’utente era già C.L.E.B. prima di entrare in UV.",
  },
  {
    label: "Pallini extra",
    field: "extraDots",
    note: "Pacchetti previsti: 3, 6, 9, 10. Massimo 10 extra annui.",
  },
  {
    label: "Pallini maturati personali",
    field: "maturedPersonalDots",
    note: "Crediti personali maturati e ancora disponibili nella dashboard.",
  },
  {
    label: "Pallini riscattati",
    field: "redeemedDots",
    note: "Pallini personali già riscattati dall’utente.",
  },
  {
    label: "Pallini reinseriti",
    field: "reinsertedDots",
    note: "Pallini maturati che l’utente ha scelto di reinserire nell’albero.",
  },
];

export const dashboardSeparationItems = [
  "Pallino nell’albero",
  "Pallino maturato dashboard",
  "Pallino riscattato",
  "Pallino reinserito",
];

export const dashboardAdminOnlyFields = [
  "Quadrati C.L.E.B.",
  "Triangoli C.L.E.B.",
  "Formule di maturazione",
  "Log strutturali",
  "Calcoli interni",
];
