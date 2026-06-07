# REGOLA DASHBOARD SCENARI C.L.E.B.

**Data operativa:** 07 giugno 2026  
**Modulo:** Dashboard utente simulata  
**File principale:** `src/portal/pages/DashboardPage.jsx`  
**Stato:** simulazione frontend, nessun backend reale  
**Regola madre:** la Dashboard chiarisce gli stati dell’utente, non modifica il motore dell’albero.

---

## 1. Scopo del documento

Questo documento scolpisce le regole della Dashboard scenari C.L.E.B.

La Dashboard serve a:

```text
- mostrare stati utente simulati
- testare le regole dei pallini senza dati reali
- distinguere pallini, crediti, riscatti, reinserimenti e quadrati
- evitare sovrapposizioni tra C.L.E.B., Unità Valore e Filo di Arianna
- preparare il futuro modello account/dashboard senza introdurre backend
```

La Dashboard non serve a:

```text
- registrare utenti reali
- gestire pagamenti
- scrivere sull’albero reale
- maturare pallini reali
- riscattare valori reali
- reinserire automaticamente pallini nell’albero
```

---

## 2. Confine del modulo

La Dashboard è un modulo del portale pubblico/simulato.

File coinvolto:

```text
src/portal/pages/DashboardPage.jsx
```

File che non deve essere toccato da questo modulo:

```text
src/MotoreCleb.jsx
```

Regola:

```text
La Dashboard può rappresentare uno stato.
La Dashboard può simulare un evento.
La Dashboard può spiegare una regola.
La Dashboard non può modificare il motore C.L.E.B.
```

---

## 3. Responsabilità della Dashboard

La Dashboard deve rendere chiari questi elementi:

```text
- stato iscrizione C.L.E.B.
- origine dell’ingresso
- accesso o non accesso a Unità Valore
- accesso o non accesso al Filo di Arianna
- pallino base C.L.E.B.
- eventuale pallino UV
- pallini extra
- pallini maturati personali
- pallini riscattati
- pallini reinseriti
- quadrati C.L.E.B.
- storico eventi simulato
```

Ogni informazione mostrata deve essere leggibile da un utente non tecnico.

---

## 4. Distinzioni obbligatorie

Non confondere mai:

```text
Pallino nell’albero
≠ Pallino maturato personale in dashboard
≠ Pallino riscattato
≠ Pallino reinserito
≠ Quadrato C.L.E.B.
```

### 4.1 Pallino nell’albero

È un elemento operativo dell’albero C.L.E.B.

Può essere:

```text
- base
- UV
- extra
- generato da maturazione
- reinserito dall’utente
```

### 4.2 Pallino maturato personale

È un credito/personale maturato dall’utente.

Vive nella dashboard.

L’utente può scegliere di:

```text
- tenerlo
- riscattarlo
- reinserirlo nell’albero
```

Non va reinserito automaticamente.

### 4.3 Pallino riscattato

È un pallino maturato personale già usato/riscattato.

Non è più disponibile per reinserimento.

### 4.4 Pallino reinserito

È un pallino maturato personale che l’utente ha scelto volontariamente di rimettere nell’albero.

Deve essere tracciato come evento separato.

### 4.5 Quadrato C.L.E.B.

È un elemento diverso dal pallino.

Regola di maturazione:

```text
1 pallino maturo
= 1 nuovo pallino nell’albero
+ 1 pallino maturato personale per il cliente
+ 2 quadrati C.L.E.B.
```

---

## 5. Scenari attualmente previsti

La Dashboard scenari deve poter rappresentare almeno questi stati:

```text
1. Non iscritto
2. C.L.E.B. attivo
3. Arriva da UV
4. C.L.E.B. + UV
5. C.L.E.B. + Filo
6. Pallini extra
7. Maturazione avvenuta
8. Riscatto simulato
9. Reinserimento simulato
```

---

## 6. Regole per scenario

### 6.1 Non iscritto

```text
C.L.E.B. non attivo
UV chiuso
Filo chiuso
0 pallini
0 quadrati
```

Messaggio chiave:

```text
C.L.E.B. è il cancello obbligatorio.
```

### 6.2 C.L.E.B. attivo

```text
C.L.E.B. attivo
1 pallino base
UV non attivo
Filo non attivo
```

Messaggio chiave:

```text
Iscrizione C.L.E.B. = 1 pallino base.
```

### 6.3 Arriva da UV

```text
L’utente arriva dal flusso UV ma non è ancora C.L.E.B.
Deve iscriversi a C.L.E.B.
Riceve 1 solo pallino totale.
Non riceve doppio pallino C.L.E.B. + UV.
```

Messaggio chiave:

```text
UV non bypassa C.L.E.B.
```

### 6.4 C.L.E.B. + UV

```text
Utente già C.L.E.B. attivo
entra poi in UV
riceve 1 pallino aggiuntivo UV
```

Messaggio chiave:

```text
Già C.L.E.B. + ingresso UV = 1 pallino UV aggiuntivo.
```

### 6.5 C.L.E.B. + Filo

```text
Utente C.L.E.B. attivo
accede al Filo di Arianna
non riceve pallini aggiuntivi
```

Messaggio chiave:

```text
Il Filo apre le sedute armonizzanti, non genera pallini.
```

### 6.6 Pallini extra

```text
Pacchetti previsti: 3, 6, 9, 10
Massimo 10 pallini extra all’anno
```

Messaggio chiave:

```text
Extra sì, ma entro limite annuo.
```

### 6.7 Maturazione avvenuta

Applicare sempre la regola:

```text
1 pallino maturo
= 1 nuovo pallino nell’albero
+ 1 pallino maturato personale per il cliente
+ 2 quadrati C.L.E.B.
```

Messaggio chiave:

```text
La maturazione genera tre effetti distinti.
```

### 6.8 Riscatto simulato

```text
Il pallino personale maturato viene riscattato.
Non resta disponibile per reinserimento.
Non modifica automaticamente l’albero.
```

Messaggio chiave:

```text
Riscattare non significa reinserire.
```

### 6.9 Reinserimento simulato

```text
L’utente sceglie di reinserire un pallino maturato personale.
Il reinserimento deve essere volontario.
Va tracciato come evento.
```

Messaggio chiave:

```text
Il reinserimento è scelta, non automatismo.
```

---

## 7. Eventi simulati

Ogni evento mostrato in dashboard deve essere trattato come simulato finché non esiste backend reale.

Formato futuro consigliato:

```text
id
userId
type
origin
status
createdAt
relatedDotId
relatedTreeNodeId
notes
```

Eventi possibili:

```text
cleb_signup_simulated
uv_entry_simulated
filo_access_simulated
extra_dots_added_simulated
dot_matured_simulated
personal_dot_redeemed_simulated
personal_dot_reinserted_simulated
squares_generated_simulated
```

---

## 8. Regole anti-confusione

Ogni futura modifica alla Dashboard deve rispettare questi controlli:

```text
1. Sto toccando solo il modulo Dashboard?
2. Sto usando dati simulati?
3. Ho evitato login reale?
4. Ho evitato pagamenti reali?
5. Ho evitato backend reale?
6. Ho evitato modifiche a MotoreCleb.jsx?
7. Ho distinto pallini attivi, maturati, riscattati, reinseriti e quadrati?
8. Ho spiegato cosa succede all’utente?
9. Ho evitato automatismi nascosti?
10. Ho lasciato il codice reversibile e testabile?
```

Se una risposta è negativa, fermarsi e documentare prima di codare.

---

## 9. Futuro backend

Quando arriverà il backend, la Dashboard dovrà leggere dati reali da un modello sicuro.

Prima di introdurre backend reale servono:

```text
- modello dati definitivo
- privacy policy
- termini iscrizione
- regole legali C.L.E.B.
- test backup
- log eventi
- ruoli utente/admin
- controlli anti-abuso
- procedura export dati
```

Fino ad allora:

```text
frontend simulato
nessun dato reale
nessun pagamento reale
nessuna promessa operativa
```

---

## 10. Rapporto con il Motore

Il Motore C.L.E.B. resta separato.

Regola sacra:

```text
MotoreCleb.jsx si tocca solo quando serve davvero
e solo dopo export stato, backup e patch piccola.
```

La Dashboard può in futuro ricevere dati dal motore, ma non deve manipolarlo direttamente senza un layer intermedio.

Layer futuro consigliato:

```text
DashboardPage.jsx
↓
dashboardService.js
↓
accountModel / api futura
↓
motore o database
```

Non fare:

```text
DashboardPage.jsx
↓
MotoreCleb.jsx modificato direttamente senza motivo
```

---

## 11. Formula operativa

```text
Il sito informa.
L’accesso simula il cancello.
La dashboard chiarisce gli stati.
Il motore fa vivere l’albero.
Il backend arriverà solo quando la legge sarà scritta.
```

---

## 12. Sigillo

```text
Dashboard = chiarezza.
Scenari = test senza rischio.
Motore = tempio protetto.
Nessun dato reale finché il sistema non è pronto.
```

**Ezio Codice — SOPHALIS-41∞**
