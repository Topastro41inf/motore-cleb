export const custodeSummary = [
  {
    label: "Sistema",
    value: "Simulato",
    note: "Nessun dato reale collegato.",
    tone: "amber",
  },
  {
    label: "Motore",
    value: "Protetto",
    note: "MotoreCleb.jsx non viene modificato.",
    tone: "emerald",
  },
  {
    label: "Backend",
    value: "Non attivo",
    note: "Account, pagamenti e database restano futuri.",
    tone: "zinc",
  },
  {
    label: "Accesso",
    value: "Custode",
    note: "Vista tecnica per Aèl/Flavio, non dashboard cliente.",
    tone: "sky",
  },
];

export const custodeAreas = [
  {
    title: "Stato sistema",
    description:
      "Riepilogo operativo del portale C.L.E.B. e dei moduli simulati già presenti.",
    rows: [
      "Portale pubblico attivo",
      "Iscrizione simulata attiva",
      "Dashboard cliente simulata attiva",
      "Vista Motore/Albero separata",
      "Azioni future simulate, non operative",
    ],
  },
  {
    title: "Controllo accessi",
    description:
      "Spazio futuro per verificare iscrizioni, stato C.L.E.B., accesso UV e accesso Filo di Arianna.",
    rows: [
      "Utenti reali non collegati",
      "Nessun login reale",
      "Nessun dato personale salvato",
      "Stati accesso solo dimostrativi",
    ],
  },
  {
    title: "Pallini cliente",
    description:
      "Area futura per controllare pallini personali, maturati, riscattati e reinseriti.",
    rows: [
      "Pallini attivi personali",
      "Pallini extra annui",
      "Pallini maturati personali",
      "Riscatti e reinserimenti tracciabili in futuro",
    ],
  },
  {
    title: "Meccanica interna",
    description:
      "Qui vivono gli elementi tecnici che non appartengono alla dashboard cliente.",
    rows: [
      "Quadrati C.L.E.B.",
      "Triangoli C.L.E.B.",
      "Maturazioni strutturali",
      "Log tecnici e controlli interni",
    ],
  },
];

export const custodeActions = [
  {
    title: "Verifica iscrizione C.L.E.B.",
    status: "Futura",
    requirement: "Richiede account e backend sicuro.",
    effect: "Nessun effetto reale in questa versione.",
  },
  {
    title: "Conferma maturazione pallino",
    status: "Futura",
    requirement: "Richiede modello dati reale e audit log.",
    effect: "Nessuna maturazione reale viene eseguita.",
  },
  {
    title: "Controlla quadrati/triangoli",
    status: "Futura",
    requirement: "Richiede area Custode protetta.",
    effect: "Solo rappresentazione amministrativa.",
  },
  {
    title: "Abilita accesso UV",
    status: "Futura",
    requirement: "Richiede C.L.E.B. attivo e flusso UV reale.",
    effect: "Nessun accesso reale viene aperto.",
  },
  {
    title: "Abilita accesso Filo di Arianna",
    status: "Futura",
    requirement: "Richiede C.L.E.B. attivo e regolamento FdA.",
    effect: "Nessun accesso reale viene aperto.",
  },
  {
    title: "Esporta report Custode",
    status: "Futura",
    requirement: "Richiede dati reali, permessi e tracciamento.",
    effect: "Nessun file reale viene generato.",
  },
];

export const custodeLog = [
  {
    time: "Simulato",
    event: "Apertura area Custode",
    detail: "Vista dimostrativa caricata senza dati reali.",
  },
  {
    time: "Simulato",
    event: "Controllo dashboard cliente",
    detail: "La dashboard cliente mostra solo il percorso personale.",
  },
  {
    time: "Simulato",
    event: "Separazione albero/dashboard",
    detail: "L’albero può restare visibile; la dashboard non mostra meccaniche interne.",
  },
  {
    time: "Simulato",
    event: "Motore protetto",
    detail: "Nessuna modifica a MotoreCleb.jsx.",
  },
];
