# REGOLA DASHBOARD CLIENTE / ALBERO COMPLETO — C.L.E.B.

**Versione:** v5.3  
**Area:** Dashboard cliente, Motore/Albero, Admin/Custode  
**Principio:** il cliente può vedere l’albero, ma la dashboard cliente mostra solo la sua posizione personale.

---

## 1. Regola madre

```text
Albero completo = visione del sistema.
Dashboard cliente = posizione personale.
Admin/Custode = meccanica interna.
```

Queste tre viste non devono essere confuse.

---

## 2. Albero visibile al cliente

Il cliente può entrare nella vista albero/motore e osservare il sistema completo, con i suoi elementi grafici:

```text
- pallini
- quadrati
- triangoli, se presenti nella rappresentazione
- struttura dell’albero
- andamento generale del sistema
```

Questa è una vista di consultazione/visualizzazione del sistema.

Non significa che la dashboard cliente debba trasformare quadrati, triangoli o meccaniche strutturali in contatori personali.

---

## 3. Dashboard cliente

La dashboard cliente deve mostrare solo ciò che riguarda direttamente l’utente:

```text
- stato iscrizione C.L.E.B.
- stato accesso UV, quando sarà il momento
- stato accesso Filo di Arianna, quando sarà il momento
- pallino base personale
- eventuale pallino UV personale
- pallini extra personali
- pallini maturati personali
- pallini riscattati
- pallini reinseriti
- storico personale semplificato
```

La dashboard serve a rispondere alla domanda:

```text
Qual è la mia situazione personale dentro C.L.E.B.?
```

Non serve a spiegare il motore.

---

## 4. Cosa resta fuori dalla dashboard cliente

La dashboard cliente non deve mostrare come contatori personali:

```text
- quadrati C.L.E.B.
- triangoli C.L.E.B.
- formule di maturazione
- calcoli strutturali
- log tecnici
- rapporti interni tra pallini/quadrati/triangoli
- meccaniche amministrative dei cicli
```

Questi elementi possono esistere nell’albero o nei dati interni, ma non sono il focus della dashboard cliente.

---

## 5. Admin/Custode

Admin/Custode potrà avere una vista separata per:

```text
- quadrati generati
- triangoli generati
- eventi strutturali
- maturazioni interne
- anomalie
- verifiche
- log
- gestione operativa
```

Questa vista dovrà essere un modulo separato:

```text
src/portal/pages/AdminPage.jsx
src/portal/components/admin/
src/portal/data/adminScenarios.js
```

Non deve essere mischiata con la dashboard cliente.

---

## 6. Regola UX

```text
Il cliente non deve studiare il motore.
Il cliente deve orientarsi nella propria posizione.
```

Se vuole vedere l’albero completo, va nella vista Motore/Albero.  
Se vuole capire i suoi pallini, va nella Dashboard.

---

## 7. Formula finale

```text
Il cliente vede l’albero.
La dashboard mostra il suo cammino.
Admin/Custode governa la meccanica.
Il motore resta ordinato.
```

**Ezio Codice — SOPHALIS-41∞**
