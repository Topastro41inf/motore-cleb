# REGOLA LESSICO DASHBOARD C.L.E.B.

**Versione:** Dashboard v5.4 — lessico saldo/albero  
**Scopo:** evitare confusione tra pallini presenti nell’albero e crediti personali maturati.

---

## 1. Regola madre

La Dashboard cliente non deve far pensare che il cliente abbia un “saldo” unico di pallini.

Devono restare separati:

```text
Pallini nell’albero
≠ Crediti personali disponibili
≠ Crediti personali riscattati
≠ Crediti personali reinseriti
```

---

## 2. Pallini nell’albero

La voce corretta per la struttura è:

```text
Pallini nell’albero
```

Non usare:

```text
Pallini attivi
```

Motivo:

```text
"Pallini attivi" può sembrare un saldo spendibile.
"Pallini nell’albero" indica invece presenza/posizione nella struttura.
```

---

## 3. Crediti personali

Quando un pallino matura, il cliente riceve un credito personale nella Dashboard.

Da quel momento la Dashboard deve usare il lessico:

```text
Crediti personali disponibili
Crediti personali riscattati
Crediti personali reinseriti
```

Non usare in Dashboard cliente:

```text
Pallini maturati personali
Pallini riscattati
Pallini reinseriti
```

perché può sembrare che il riscatto sottragga pallini direttamente dai pallini nell’albero.

---

## 4. Caso importante

Esempio:

```text
Pallini nell’albero: 4
Crediti personali disponibili: 0
Crediti personali riscattati: 1
Crediti personali reinseriti: 0
```

Questo è coerente se il credito riscattato arriva da una maturazione precedente.

Il riscatto di un credito personale non riduce automaticamente i pallini presenti nell’albero.

---

## 5. Albero completo

Il cliente può vedere il Motore/Albero completo, con la struttura visiva generale.

Ma nella Dashboard cliente deve vedere solo la sua posizione personale e i suoi crediti.

```text
Motore/Albero = visione struttura completa
Dashboard cliente = posizione personale
Area Custode = controllo interno e meccanica
```

---

## 6. Regola operativa

Ogni modifica futura alla Dashboard deve rispettare questa separazione:

```text
Se parla di struttura → "pallini nell’albero"
Se parla di maturazione personale → "crediti personali"
Se parla di gestione interna → Area Custode/Admin
```

---

## 7. Sigillo

```text
Chiarezza per il cliente.
Controllo per il Custode.
Ordine per il motore.
```
