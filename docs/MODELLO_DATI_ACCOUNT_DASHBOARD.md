# MODELLO DATI ACCOUNT E DASHBOARD C.L.E.B.

## 1. Scopo

Questo documento definisce il modello dati futuro per account personale, dashboard utente, pallini, maturazioni, riscatti, reinserimenti, servizi collegati e storico eventi.

Non modifica il motore attuale.  
Non cambia le regole già definite.  
Serve a mettere ordine prima di scrivere codice.

Ogni valore deve avere:
- proprietario;
- origine;
- stato;
- data;
- evento tracciato;
- collegamento all’albero quando necessario.

---

## 2. User

Ogni persona iscritta a C.L.E.B. deve avere un account personale.

```js
User {
  id: "user_001",
  type: "person",
  displayName: "Mario Rossi",
  email: "mario@example.com",
  phone: null,
  clebStatus: "active",
  createdAt: "2026-06-05T20:00:00.000Z",
  updatedAt: "2026-06-05T20:00:00.000Z"
}
```

Stati:
- `pending`: registrazione iniziata ma non completa;
- `active`: iscritto C.L.E.B. attivo;
- `suspended`: sospeso temporaneamente;
- `revoked`: revocato o chiuso.

Regola: nessun accesso a Unità Valore o Filo di Arianna se `clebStatus` non è `active`.

---

## 3. Agreements

Ogni utente deve avere tracciamento dei documenti accettati.

```js
Agreements {
  userId: "user_001",
  membership: { accepted: true, version: "1.0", acceptedAt: "..." },
  responsibility: { accepted: true, version: "1.0", acceptedAt: "..." },
  guarentigie: { accepted: true, version: "1.0", acceptedAt: "..." },
  privacy: { accepted: true, version: "1.0", acceptedAt: "..." },
  serviceRules: { accepted: true, version: "1.0", acceptedAt: "..." }
}
```

Regola: ogni documento conserva la versione accettata. Se un documento cambia, la nuova versione va riaccettata quando necessario.

---

## 4. Services

C.L.E.B. è il sistema madre. Unità Valore e Filo di Arianna sono servizi accessibili solo dopo iscrizione C.L.E.B. attiva.

```js
Services {
  userId: "user_001",
  cleb: { active: true, joinedAt: "...", entryChannel: "direct" },
  unitaValore: { active: false, joinedAt: null, entryChannel: null, generatedPallino: false },
  filoArianna: { active: false, joinedAt: null, entryChannel: null, generatedPallino: false }
}
```

Entry channel:
- `direct`: iscrizione diretta C.L.E.B.;
- `from_uv`: utente arrivato da Unità Valore;
- `from_filo`: utente arrivato dal Filo di Arianna;
- `admin_import`: inserimento amministrativo.

Regole:
- Solo C.L.E.B. genera 1 pallino base.
- Utente già C.L.E.B. che entra in UV riceve 1 pallino aggiuntivo UV.
- Utente che arriva da UV e si iscrive a C.L.E.B. nello stesso flusso riceve 1 solo pallino totale.
- Filo di Arianna non genera pallini aggiuntivi.

---

## 5. Dashboard

La dashboard è il portafoglio operativo dell’utente.

Deve mostrare:
- stato iscrizione C.L.E.B.;
- documenti accettati;
- pallini attivi nell’albero;
- pallini extra acquisiti nell’anno;
- pallini maturati disponibili;
- pallini riscattati;
- pallini reinseriti;
- accesso UV;
- accesso Filo di Arianna;
- storico eventi.

```js
Dashboard {
  userId: "user_001",
  counters: {
    activeTreePallini: 1,
    extraAcquiredCurrentYear: 0,
    maturedAvailable: 0,
    redeemed: 0,
    reinserted: 0
  },
  currentYearLimit: {
    year: 2026,
    maxExtraAcquirable: 10,
    extraAcquired: 0,
    remaining: 10
  }
}
```

---

## 6. Pallino

Ogni pallino è un elemento distinto.

```js
Pallino {
  id: "pallino_001",
  userId: "user_001",
  type: "cleb_base",
  origin: "cleb_direct",
  status: "active_in_tree",
  treePositionId: "tree_node_001",
  sourcePallinoId: null,
  createdAt: "...",
  updatedAt: "..."
}
```

Tipi:
- `cleb_base`: pallino base da iscrizione C.L.E.B.;
- `cleb_from_uv_base`: pallino unico quando l’utente arriva da UV e si iscrive a C.L.E.B.;
- `cleb_from_filo_base`: pallino base quando l’utente arriva dal Filo;
- `uv_after_cleb`: pallino aggiuntivo UV per utente già C.L.E.B.;
- `extra_acquired`: pallino extra acquisito in pacchetti 3/6/9/10;
- `tree_regenerated`: pallino generato nell’albero quando un pallino matura;
- `matured_credit`: pallino maturato personale nella dashboard utente;
- `reinserted_matured`: pallino reinserito nell’albero partendo da credito maturato.

Stati:
- `active_in_tree`;
- `matured`;
- `available_wallet`;
- `redeemed`;
- `reinserted`;
- `cancelled`.

Regola fondamentale: pallino nell’albero, pallino maturato in dashboard, pallino riscattato e pallino reinserito non sono la stessa cosa.

---

## 7. Pacchetti pallini extra

Oltre al pallino base, l’utente può acquisire pacchetti:
- 3 pallini;
- 6 pallini;
- 9 pallini;
- 10 pallini.

Limite: massimo 10 pallini extra all’anno.

I pallini maturati e poi reinseriti sono separati dai nuovi extra acquisiti.

---

## 8. Regola maturazione pallino

Questa regola non va cambiata.

```text
Pallino maturo
= 1 nuovo pallino nell’albero
+ 1 pallino maturato personale per il cliente
+ 2 quadrati C.L.E.B.
```

```js
MaturationResult {
  sourcePallinoId: "pallino_001",
  userId: "user_001",
  generatedTreePallinoId: "pallino_002",
  generatedMaturedCreditId: "pallino_003",
  generatedSquares: ["square_001", "square_002"],
  createdAt: "..."
}
```

Distinzione:
- `generatedTreePallinoId` continua l’albero;
- `generatedMaturedCreditId` entra nella dashboard utente;
- i due quadrati appartengono al sistema C.L.E.B.

Il pallino maturato personale non viene reinserito automaticamente.

---

## 9. MaturedCredit

```js
MaturedCredit {
  id: "pallino_003",
  userId: "user_001",
  type: "matured_credit",
  sourcePallinoId: "pallino_001",
  status: "available_wallet",
  options: {
    canHold: true,
    canRedeem: true,
    canReinsert: true
  },
  createdAt: "..."
}
```

Azioni possibili:
- tenere in dashboard;
- riscattare;
- reinserire nell’albero.

---

## 10. Redemption

```js
Redemption {
  id: "redemption_001",
  userId: "user_001",
  maturedCreditId: "pallino_003",
  status: "requested",
  requestedAt: "...",
  processedAt: null,
  notes: null
}
```

Stati:
- `requested`;
- `approved`;
- `rejected`;
- `completed`;
- `cancelled`.

Regola: un pallino riscattato non può essere reinserito. Un pallino reinserito non può essere riscattato.

---

## 11. Reinsertion

```js
Reinsertion {
  id: "reinsertion_001",
  userId: "user_001",
  maturedCreditId: "pallino_003",
  newTreePallinoId: "pallino_004",
  status: "completed",
  createdAt: "..."
}
```

Regola: il credito maturato passa da `available_wallet` a `reinserted`, e nasce un nuovo pallino `active_in_tree`.

---

## 12. Square

Quando un pallino matura, nascono 2 quadrati C.L.E.B.

```js
Square {
  id: "square_001",
  sourcePallinoId: "pallino_001",
  sourceUserId: "user_001",
  type: "cleb_square",
  status: "active",
  createdAt: "..."
}
```

I quadrati C.L.E.B. sono separati dai pallini utente.

---

## 13. EventLog

Ogni operazione importante produce un evento.

```js
EventLog {
  id: "event_001",
  userId: "user_001",
  type: "pallino_matured",
  payload: {
    sourcePallinoId: "pallino_001",
    generatedTreePallinoId: "pallino_002",
    generatedMaturedCreditId: "pallino_003",
    generatedSquares: ["square_001", "square_002"]
  },
  createdAt: "..."
}
```

Tipi evento:
- `user_registered`;
- `agreements_accepted`;
- `cleb_membership_activated`;
- `uv_enabled`;
- `filo_enabled`;
- `pallino_created`;
- `pallino_package_acquired`;
- `pallino_matured`;
- `matured_credit_created`;
- `matured_credit_redeemed`;
- `matured_credit_reinserted`;
- `square_created`;
- `admin_correction`.

Regola: nessuna operazione economica o strutturale deve avvenire senza evento.

---

## 14. Controlli obbligatori futuri

Prima di permettere operazioni reali, il sistema dovrà controllare:
- utente attivo C.L.E.B.;
- documenti accettati;
- servizio richiesto abilitato;
- limite annuale pallini extra;
- credito maturato disponibile;
- assenza di doppio riscatto;
- assenza di doppio reinserimento;
- storico eventi coerente.

---

## 15. Principio finale

La dashboard utente non è estetica.

È il registro di:
- proprietà;
- responsabilità;
- maturazione;
- scelta;
- fiducia.

C.L.E.B. deve essere modulare, leggibile, verificabile e prudente.

Prima ordine.  
Poi codice.  
Poi utenti reali.
