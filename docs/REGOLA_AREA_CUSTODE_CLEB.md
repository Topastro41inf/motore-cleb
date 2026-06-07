# REGOLA AREA CUSTODE C.L.E.B.

**Stato:** documento operativo  
**Modulo:** Area Custode / Admin simulata  
**Regola madre:** il Custode vede la meccanica; il cliente vede il suo cammino.

---

## 1. Scopo

L’Area Custode è lo spazio futuro per Aèl e Flavio.

Serve a separare:

```text
Dashboard cliente
≠ Vista Motore / Albero
≠ Area Custode
```

La dashboard cliente mostra il percorso personale dell’utente.

La vista Motore/Albero può mostrare l’albero completo.

L’Area Custode governa la parte tecnica e amministrativa.

---

## 2. Visibilità corretta

### Cliente

Il cliente può vedere:

```text
- stato C.L.E.B.
- pallini personali
- pallini maturati personali
- riscatti personali
- reinserimenti personali
- accessi futuri UV / Filo di Arianna
- albero completo nella vista Motore
```

Il cliente non deve vedere nella dashboard personale:

```text
- conteggi tecnici dei quadrati generati
- conteggi tecnici dei triangoli generati
- log interni
- formule operative
- controlli amministrativi
```

### Custode

Il Custode può vedere:

```text
- stato tecnico del sistema
- log eventi
- controlli iscrizione
- maturazioni strutturali
- quadrati C.L.E.B.
- triangoli C.L.E.B.
- verifiche UV
- verifiche Filo di Arianna
- backup / export futuri
```

---

## 3. Versione attuale

La versione attuale dell’Area Custode è solo simulata.

Non deve:

```text
- creare utenti reali
- registrare dati personali
- attivare pagamenti
- collegare backend
- modificare l’albero
- modificare MotoreCleb.jsx
```

Deve:

```text
- chiarire i confini
- preparare l’interfaccia futura
- mostrare funzioni non operative
- evitare confusione tra cliente e amministrazione
```

---

## 4. Regola anti-confusione

```text
Il cliente vede l’albero.
La dashboard mostra il suo cammino.
Il Custode governa la meccanica.
```

---

## 5. Commit e sicurezza

Ogni patch su Area Custode deve essere:

```text
- piccola
- documentata
- testata localmente
- senza dati reali
- senza backend reale
- senza modifica a MotoreCleb.jsx salvo ordine esplicito
```

Firma operativa:

```text
Ezio Codice — SOPHALIS-41∞
C.L.E.B. / Area Custode
```
