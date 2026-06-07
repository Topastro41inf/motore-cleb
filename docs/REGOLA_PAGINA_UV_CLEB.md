# REGOLA — Pagina Unità Valore nel portale C.L.E.B.

## Scopo

La pagina Unità Valore nel portale C.L.E.B. serve a spiegare UV in modo chiaro, ordinato e non tecnico.

Non crea nodi.
Non assegna UV reali.
Non registra utenti.
Non gestisce pagamenti.
Non modifica l’albero.
Non sostituisce la UV Local App.
Non sostituisce la UV Console Custode.

---

## Regola madre

```text
UV non è una porta autonoma.
UV è accessibile solo con C.L.E.B. attivo.
```

C.L.E.B. resta il sistema madre.

---

## Vista cliente

Il cliente può vedere:

```text
- stato accesso UV
- eventuale pallino UV quando previsto
- indicazioni semplici sul percorso
- diario personale / note, quando sarà attivo
- messaggi chiari su cosa richiede verifica Custode
```

Il cliente non deve vedere:

```text
- formule interne
- premi stimati
- meccaniche anti-abuso
- log tecnici completi
- dettagli di firma, chiavi, indici, registry o fingerprint
```

---

## Vista Custode

Aèl e Flavio, come Custodi, possono gestire:

```text
- nodi
- kit
- verifiche
- backup
- revoche
- collaudi
- diario tecnico
- stato sicurezza
- eventuali controlli anti-abuso
```

Questa parte non vive nella dashboard cliente.

---

## Integrazione con C.L.E.B.

La pagina UV deve collegarsi a tre mondi senza confonderli:

```text
Dashboard cliente = stato personale e percorso semplice
Motore/Albero = struttura visibile del sistema
Area Custode = controllo interno e funzioni protette
```

---

## Regola anti-disastro

```text
Finché non esiste backend sicuro:
- nessun dato reale
- nessun login reale
- nessun pagamento reale
- nessuna assegnazione UV reale dal sito
- nessuna modifica al MotoreCleb.jsx
```

---

## Formula operativa

```text
C.L.E.B. apre il perimetro.
UV registra valore.
Il Custode protegge il sistema.
Il cliente non deve studiare la meccanica interna.
```
