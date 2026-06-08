# REGOLA — CMS locale Custode C.L.E.B.

## Scopo

L'Area Custode può modificare alcuni testi pubblici del portale senza cambiare il codice.

In questa fase non esiste ancora backend sicuro.  
Per questo le modifiche sono salvate nel browser locale tramite `localStorage`.

## Cosa può modificare ora

- Titolo del blocco "Stato pagina" nella pagina Documenti.
- Testo del blocco "Stato pagina" nella pagina Documenti.

## Cosa NON può modificare ora

- MotoreCleb.jsx.
- Stato reale dell'albero.
- Pallini reali.
- Crediti reali.
- Utenti reali.
- Pagamenti.
- Log reali.
- Nodi UV reali.
- Programma FdA reale.

## Regola madre

```text
Il testo può cambiare.
La struttura resta protetta.
Il motore non si tocca.
```

## Export / Import

Il Custode può esportare i contenuti modificabili in un file JSON.

Il file JSON:

- deve restare fuori dal repository pubblico;
- può essere conservato nei backup locali;
- può essere reimportato sullo stesso browser o su un altro browser.

## Limite attuale

Senza backend, la modifica non è globale.

Significa:

```text
Custode modifica testo sul suo browser
→ il suo browser vede il testo modificato
→ altri utenti non lo vedono automaticamente
```

Per rendere le modifiche globali servirà un backend sicuro o un piccolo CMS protetto.

## Regola futura

Quando arriverà il backend:

```text
Area Custode autenticata
→ modifica contenuti consentiti
→ salvataggio su database
→ pubblicazione controllata
→ log evento
```

## Linguaggio

I testi modificabili non devono contenere:

- promesse legali definitive;
- promesse economiche garantite;
- promesse mediche o spirituali assolute;
- informazioni personali;
- dati reali di utenti;
- dettagli interni non destinati al pubblico.

## Formula

```text
C.L.E.B. può parlare con voce viva.
Ma la sua struttura resta custodita.
```
