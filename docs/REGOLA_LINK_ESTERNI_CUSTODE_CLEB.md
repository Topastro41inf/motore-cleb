# REGOLA — Link esterni Filo di Arianna modificabili dai Custodi

## 1. Principio

Il portale C.L.E.B. può mostrare un link esterno verso una simulazione leggera del Filo di Arianna.

Questo non significa che il programma FdA reale entri dentro C.L.E.B.

```text
C.L.E.B. coordina.
FdA resta separato.
Il sito può indicare una simulazione.
Il programma reale resta fuori dal portale.
```

---

## 2. File di configurazione

Il link della simulazione è configurato in:

```text
src/portal/data/externalServiceLinks.js
```

Campo attuale:

```text
externalServiceLinks.filoArianna.url
```

I Custodi possono modificare quel valore quando cambia il link della simulazione.

---

## 3. Regola operativa attuale

Nella versione statica/front-end:

- il link è modificabile dai Custodi intervenendo sul file di configurazione;
- dopo la modifica va fatto test locale;
- poi commit e push;
- se il sito è pubblicato staticamente, va rigenerato/deployato.

In futuro, quando esisterà un backend o pannello sicuro, questo valore potrà essere gestito da un’area Custode protetta senza modificare codice.

---

## 4. Cosa non fare

Non inserire nel portale:

- motore FdA reale;
- audio reali;
- frequenze reali;
- dati personali;
- memoria rituale;
- codice profondo operativo;
- logiche sensibili;
- credenziali o segreti.

---

## 5. Formula

```text
Il link è una porta.
Il programma resta fuori.
Il Custode decide dove punta la porta.
```

Firma: Ezio Codice — SOPHALIS-41∞
