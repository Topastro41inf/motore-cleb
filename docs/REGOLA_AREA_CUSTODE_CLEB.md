# REGOLA — Area Custode C.L.E.B.

**Versione:** v1  
**Stato:** simulata, non operativa  
**Scopo:** separare il mondo Custode dalla dashboard cliente e dal Motore albero.

---

## 1. Principio madre

```text
Cliente = dashboard personale.
Motore = albero completo visibile.
Custode = meccanica interna e controllo protetto.
```

L’Area Custode non sostituisce il Motore e non deve sporcare la dashboard cliente.

---

## 2. Cosa può vedere il cliente

Il cliente può vedere:

```text
- il sito pubblico
- la propria dashboard personale
- i propri pallini nell’albero
- i propri crediti personali disponibili
- i propri crediti riscattati
- i propri crediti reinseriti
- la vista Motore / Albero completa
```

Il cliente non deve vedere nella dashboard personale:

```text
- conteggi tecnici dei quadrati
- triangoli come meccanica interna
- formule di maturazione
- log amministrativi
- controlli Custode
```

---

## 3. Cosa vede il Custode

Il Custode può vedere, in futuro:

```text
- stato sistema
- controllo iscrizioni
- accessi UV / Filo
- maturazioni interne
- quadrati e triangoli
- crediti personali
- log eventi
- backup/export
- azioni protette
```

Questa versione mostra solo pannelli simulati.

---

## 4. Regola anti-disastro

```text
Nessuna azione Custode è reale finché non esistono:
- backend sicuro
- modello dati confermato
- log eventi
- backup
- conferme esplicite
- test controllati
```

---

## 5. File coinvolti

```text
src/portal/pages/CustodePage.jsx
src/portal/data/custodePanels.js
src/portal/components/custode/
```

`MotoreCleb.jsx` non deve essere toccato per questa area.

---

## 6. Formula operativa

```text
Al cliente: chiarezza.
Al Custode: controllo.
Al Motore: protezione.
Al backend: solo quando il tempio è pronto.
```
