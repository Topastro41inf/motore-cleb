# ROADMAP C.L.E.B. — SISTEMA + SITO

## 1. Principio operativo

C.L.E.B. va sviluppato in modo modulare, ordinato e prudente.

Regola madre:

Prima si documenta.  
Poi si modella.  
Poi si implementa.  
Poi si testa.  
Poi si espone agli utenti reali.

Nessun modulo deve rompere:
- albero esistente;
- regole pallini;
- dashboard utente;
- responsabilità documentale;
- fiducia economica;
- tracciabilità degli eventi.

---

## 2. Stato attuale consolidato

Stato raggiunto sul ramo `cleb-ripartenza`:

- motore C.L.E.B. recuperato;
- albero visibile in locale;
- export/import stato aggiunto;
- regole accesso/account/pallini documentate;
- modello dati account/dashboard documentato;
- branch salvato su GitHub.

C.L.E.B. non va più trattato come semplice interfaccia grafica.

C.L.E.B. è:
- sistema madre;
- registro di accesso;
- motore albero;
- base documentale;
- futuro portale utente;
- futuro sistema di controllo pallini, maturazioni, riscatti e reinserimenti.

---

## 3. Modulo 1 — Sito pubblico

### Scopo

Creare la parte visibile a chi non è ancora iscritto.

### Contenuti minimi

- Home;
- Cos’è C.L.E.B.;
- Come funziona;
- Valori e principi;
- Accesso / iscrizione;
- Area informativa su Unità Valore;
- Area informativa su Filo di Arianna;
- Contatti;
- Avvertenze e documenti.

### Regole

Il sito pubblico non deve mostrare logiche sensibili interne.

Il sito pubblico deve:
- spiegare senza promettere troppo;
- invitare all’iscrizione;
- chiarire che UV e Filo richiedono iscrizione C.L.E.B.;
- proteggere il sistema da comunicazioni ambigue.

---

## 4. Modulo 2 — Account utente

### Scopo

Ogni persona deve avere un account personale.

### Funzioni future

- registrazione;
- login;
- recupero accesso;
- stato iscrizione;
- dati personali essenziali;
- documenti accettati;
- servizi attivi;
- dashboard pallini;
- storico eventi.

### Stati utente

- pending;
- active;
- suspended;
- revoked.

### Regola

Nessun accesso a UV o Filo di Arianna se l’utente non è `active` in C.L.E.B.

---

## 5. Modulo 3 — Dashboard pallini

### Scopo

La dashboard è il portafoglio operativo dell’utente.

### Deve mostrare

- pallini attivi nell’albero;
- pallini extra acquisiti;
- limite annuale;
- pallini maturati disponibili;
- pallini riscattati;
- pallini reinseriti;
- origine di ogni pallino;
- storico operazioni.

### Regola

Il pallino maturato personale entra prima nella dashboard.

L’utente può:
- tenerlo;
- riscattarlo;
- reinserirlo.

Nessuna azione deve avvenire senza evento tracciato.

---

## 6. Modulo 4 — Motore albero

### Scopo

Mantenere e migliorare il motore attuale senza rompere la logica viva.

### Regole già consolidate

Quando un pallino matura:

Pallino maturo  
= 1 nuovo pallino nell’albero  
+ 1 pallino maturato personale per il cliente  
+ 2 quadrati C.L.E.B.

### Prossimi interventi futuri

- separare logica e interfaccia;
- rendere esplicito il credito maturato utente;
- collegare pallino a userId;
- collegare quadrati a evento di maturazione;
- mantenere export/import sempre funzionante;
- aggiungere test prima di ogni modifica.

### Regola

Il motore albero si tocca solo dopo backup ed export stato.

---

## 7. Modulo 5 — Admin / Custode

### Scopo

Creare un’area amministrativa per gestire il sistema senza entrare manualmente nel codice.

### Funzioni future

- vedere utenti;
- vedere stato iscrizioni;
- confermare documenti;
- abilitare servizi;
- assegnare pallini;
- vedere maturazioni;
- approvare riscatti;
- registrare reinserimenti;
- correggere errori con evento tracciato;
- esportare report.

### Regola

Nessuna correzione amministrativa deve essere invisibile.

Ogni modifica manuale deve generare evento `admin_correction`.

---

## 8. Modulo 6 — Unità Valore

### Scopo

Collegare UV a C.L.E.B. senza renderlo una porta autonoma.

### Regole

- UV è accessibile solo a utenti C.L.E.B. attivi.
- Se l’utente è già C.L.E.B. e poi entra in UV, riceve 1 pallino aggiuntivo UV.
- Se l’utente arriva da UV e si iscrive a C.L.E.B. nello stesso flusso, riceve 1 solo pallino totale.
- Nel profilo si vede che l’utente è entrato nel sistema UV.
- UV non deve aggirare iscrizione, documenti o responsabilità C.L.E.B.

### Futuro collegamento

Il collegamento tecnico con UV avverrà solo dopo:
- account utente;
- dashboard;
- modello eventi;
- documenti legali;
- controlli backend.

---

## 9. Modulo 7 — Filo di Arianna

### Scopo

Collegare il Filo di Arianna a C.L.E.B. come servizio accessibile solo agli iscritti.

### Regole

- Filo di Arianna è accessibile solo a utenti C.L.E.B. attivi.
- Filo di Arianna non genera pallini aggiuntivi.
- Chi arriva dal Filo deve prima iscriversi a C.L.E.B.
- L’iscrizione genera il pallino base C.L.E.B.
- Il servizio abilita sedute armonizzanti, non quote aggiuntive.

### Avvertenze

Il linguaggio deve restare responsabile:
- nessuna promessa medica;
- nessuna garanzia di guarigione;
- chiarezza su finalità armonizzante/esperienziale;
- documenti e consensi specifici prima dell’accesso.

---

## 10. Modulo 8 — Legale / Documenti

### Scopo

Proteggere utenti, C.L.E.B. e servizi collegati.

### Documenti futuri

- regolamento iscrizione C.L.E.B.;
- responsabilità utente;
- guarentigie;
- privacy policy;
- consenso trattamento dati;
- regolamento pallini;
- regolamento maturazioni;
- regolamento riscatti;
- regolamento reinserimenti;
- condizioni UV;
- condizioni Filo di Arianna;
- disclaimer specifici.

### Regola

Ogni documento deve avere:
- versione;
- data;
- testo conservato;
- accettazione utente;
- evento collegato.

Nota: la parte legale dovrà essere verificata da professionista qualificato prima di uso reale.

---

## 11. Modulo 9 — Backend / Database

### Scopo

Passare dal prototipo locale con localStorage a un sistema reale.

### Da implementare solo dopo modello chiaro

- database utenti;
- database pallini;
- database eventi;
- autenticazione;
- permessi;
- API;
- backup;
- audit log;
- sicurezza;
- esportazioni;
- ambiente staging;
- ambiente produzione.

### Possibile stack futuro

Da decidere con calma.

Opzioni possibili:
- Supabase;
- PostgreSQL + backend Node;
- Firebase;
- backend custom;
- soluzione ibrida temporanea.

### Regola

Il backend non si sceglie per moda.

Si sceglie per:
- sicurezza;
- semplicità;
- costo;
- backup;
- esportabilità;
- controllo;
- scalabilità reale.

---

## 12. Ordine di sviluppo consigliato

### Fase A — Protezione e chiarezza

- mantenere export/import;
- completare documenti tecnici;
- creare mappa moduli;
- verificare regole con calma.

### Fase B — Sito pubblico statico

- home;
- pagine informative;
- accesso al motore separato;
- nessun login reale ancora.

### Fase C — Prototipo area utente simulata

- dati finti;
- dashboard finta;
- pallini simulati;
- nessun dato reale;
- nessun pagamento reale.

### Fase D — Modello backend

- scegliere stack;
- schema database;
- autenticazione;
- ruoli;
- eventi.

### Fase E — Account reale

- registrazione;
- documenti;
- dashboard;
- storico.

### Fase F — Collegamento motore albero

- userId;
- pallini attivi;
- maturazioni;
- crediti dashboard;
- quadrati.

### Fase G — Servizi collegati

- UV;
- Filo di Arianna;
- vantaggi;
- accessi;
- condizioni specifiche.

### Fase H — Test chiuso

- solo utenti controllati;
- export giornaliero;
- backup;
- verifica manuale;
- nessuna esposizione larga.

---

## 13. Regole anti-disastro

- Non modificare main senza ramo.
- Non toccare motore albero senza export stato.
- Non introdurre pagamenti reali prima del backend sicuro.
- Non promettere risultati non garantibili.
- Non mischiare pallini attivi, maturati, riscattati e reinseriti.
- Non dare accesso a UV o Filo senza C.L.E.B. attivo.
- Non fare correzioni invisibili.
- Non lavorare senza commit piccoli e descrittivi.
- Non cancellare backup.
- Non andare veloce se l’ordine non è chiaro.

---

## 14. Principio finale

C.L.E.B. vive se resta ordinato.

La fiducia si protegge con:
- regole chiare;
- dati tracciati;
- dashboard comprensibile;
- documenti accettati;
- backup;
- prudenza;
- sviluppo modulare.

Prima proteggere.  
Poi costruire.  
Poi crescere.
