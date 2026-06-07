export const custodeSummary = {
  label: "Area Custode simulata",
  title: "Controllo interno C.L.E.B.",
  subtitle:
    "Questa sezione non opera su dati reali. Serve a separare il mondo Custode dalla dashboard cliente e dal motore dell’albero.",
  status: "Simulazione protetta",
  role: "Custode / Admin futuro",
  safety:
    "Nessuna azione modifica utenti, pallini, crediti, quadrati, triangoli o albero.",
};

export const custodeMetrics = [
  {
    label: "Motore albero",
    value: "protetto",
    tone: "ok",
    note: "La vista Motore resta separata dalla gestione interna.",
  },
  {
    label: "Dashboard cliente",
    value: "pulita",
    tone: "ok",
    note: "Mostra il percorso personale, non la meccanica interna.",
  },
  {
    label: "Backend reale",
    value: "non attivo",
    tone: "lock",
    note: "Nessun login, pagamento o database reale in questa fase.",
  },
  {
    label: "Azioni Custode",
    value: "simulate",
    tone: "warn",
    note: "Ogni pulsante è informativo: non produce effetti reali.",
  },
];

export const custodePanels = [
  {
    title: "Stato sistema",
    description:
      "Controllo generale della piattaforma C.L.E.B. in modalità prototipo.",
    items: [
      "Portale pubblico presente",
      "Dashboard cliente separata",
      "Motore albero isolato",
      "Backup fuori dal repository",
    ],
    footer: "Serve a capire se il sistema è ordinato prima di attivare dati reali.",
  },
  {
    title: "Controllo iscrizioni",
    description:
      "Area futura per verificare iscrizione C.L.E.B., accesso UV e accesso Filo di Arianna.",
    items: [
      "C.L.E.B. resta cancello obbligatorio",
      "UV richiede C.L.E.B. attivo",
      "Filo richiede C.L.E.B. attivo",
      "Nessuna iscrizione reale viene registrata qui",
    ],
    footer: "La registrazione reale arriverà solo con backend sicuro.",
  },
  {
    title: "Meccanica albero",
    description:
      "Vista interna per Custodi: maturazioni, quadrati, triangoli e coerenza strutturale.",
    items: [
      "Quadrati e triangoli sono materia Custode",
      "Il cliente può vedere l’albero nel Motore",
      "La dashboard cliente non mostra meccaniche interne",
      "Ogni maturazione futura dovrà essere tracciata",
    ],
    footer: "Il motore vive separato. La gestione tecnica resta interna.",
  },
  {
    title: "Crediti personali",
    description:
      "Controllo futuro dei crediti personali derivati da maturazioni.",
    items: [
      "Crediti disponibili",
      "Crediti riscattati",
      "Crediti reinseriti",
      "Storico eventi collegato",
    ],
    footer: "I crediti personali non sono la stessa cosa dei pallini nell’albero.",
  },
  {
    title: "UV / Filo di Arianna",
    description:
      "Controllo futuro dei servizi collegati, senza renderli porte autonome.",
    items: [
      "UV accessibile solo dopo C.L.E.B.",
      "Filo accessibile solo dopo C.L.E.B.",
      "UV può generare regole specifiche sui pallini",
      "Filo non genera pallini aggiuntivi",
    ],
    footer: "I servizi orbitano intorno a C.L.E.B., non lo sostituiscono.",
  },
  {
    title: "Backup e log",
    description:
      "Area futura per controllare export, backup, eventi e tracciabilità.",
    items: [
      "Export stato prima delle modifiche importanti",
      "Backup dati reali fuori dal repo",
      "Log eventi per ogni operazione futura",
      "Nessuna operazione distruttiva senza conferma",
    ],
    footer: "Il registro protegge fiducia, ordine e ricostruibilità.",
  },
];

export const protectedActions = [
  {
    label: "Approva iscrizione",
    status: "futura",
    requirement: "Richiede account reale e verifica documenti.",
  },
  {
    label: "Valida accesso UV",
    status: "futura",
    requirement: "Richiede utente C.L.E.B. attivo e regole UV consolidate.",
  },
  {
    label: "Valida accesso Filo",
    status: "futura",
    requirement: "Richiede consenso, regolamento e stato C.L.E.B. attivo.",
  },
  {
    label: "Registra maturazione",
    status: "futura",
    requirement: "Richiede motore controllato, log e conferma Custode.",
  },
  {
    label: "Esegui backup",
    status: "futura",
    requirement: "Richiede procedura sicura e destinazione fuori repo.",
  },
  {
    label: "Apri log eventi",
    status: "futura",
    requirement: "Richiede database o archivio eventi tracciato.",
  },
];
