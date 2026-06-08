import { useRef, useState } from "react";
import {
  buildEditableContentExport,
  getEditableContent,
  parseEditableContentImport,
  resetEditableContent,
  saveEditableContent,
} from "../../data/siteEditableContent";

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-amber-200/90">
      {children}
    </label>
  );
}

function HelpText({ children }) {
  return <p className="mt-2 text-xs leading-relaxed text-slate-400">{children}</p>;
}

export default function EditableContentPanel() {
  const [content, setContent] = useState(() => getEditableContent());
  const [message, setMessage] = useState(
    "Modifiche locali: visibili su questo browser finché non avremo backend sicuro."
  );
  const importInputRef = useRef(null);

  const status = content.documentsPageStatus;

  function updateStatus(field, value) {
    setContent((current) => ({
      ...current,
      documentsPageStatus: {
        ...current.documentsPageStatus,
        [field]: value,
      },
    }));
  }

  function handleSave() {
    const saved = saveEditableContent(content);
    setContent(saved);
    setMessage("Contenuto salvato nel browser locale del Custode.");
  }

  function handleReset() {
    const ok = window.confirm(
      "Vuoi ripristinare il testo predefinito dello Stato pagina?"
    );
    if (!ok) return;

    const reset = resetEditableContent();
    setContent(reset);
    setMessage("Testo ripristinato ai valori predefiniti.");
  }

  function handleExport() {
    const payload = buildEditableContentExport(content);
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const a = document.createElement("a");
    a.href = url;
    a.download = `cleb-contenuti-custode-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Export JSON generato. Conservare il file fuori dal repository.");
  }

  async function handleImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const imported = parseEditableContentImport(text);
      const saved = saveEditableContent(imported);
      setContent(saved);
      setMessage("Import completato. Il contenuto è stato aggiornato localmente.");
    } catch (error) {
      setMessage(`Import non riuscito: ${error.message}`);
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-lg md:p-6">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-200">
            Contenuti modificabili
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Mini CMS locale Custode
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
            Questa sezione permette di modificare testi pubblici controllati
            senza toccare il codice. In questa fase il salvataggio è locale:
            resta nel browser del Custode.
          </p>
        </div>

        <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-100">
          Prototipo locale
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <FieldLabel>Titolo Stato pagina</FieldLabel>
          <input
            value={status.title}
            onChange={(event) => updateStatus("title", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
            maxLength={80}
          />

          <div className="mt-4">
            <FieldLabel>Testo Stato pagina</FieldLabel>
            <textarea
              value={status.body}
              onChange={(event) => updateStatus("body", event.target.value)}
              rows={7}
              className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm leading-relaxed text-white outline-none transition focus:border-amber-300/60"
              maxLength={1200}
            />
            <HelpText>
              Il testo appare nella pagina Documenti. Evitare promesse legali,
              promesse economiche o dichiarazioni definitive non validate.
            </HelpText>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <FieldLabel>Anteprima</FieldLabel>
          <div className="rounded-2xl border border-amber-300/25 bg-slate-950/60 p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-amber-200">
              {status.title || "STATO PAGINA"}
            </p>
            <div className="space-y-2 text-sm leading-relaxed text-slate-100">
              {(status.body || "Testo vuoto.").split("\n").map((line, index) => (
                <p key={`${line}-${index}`}>{line}</p>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-amber-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-200"
            >
              Salva testo
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            >
              Ripristina default
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            >
              Esporta JSON
            </button>

            <button
              type="button"
              onClick={() => importInputRef.current?.click()}
              className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            >
              Importa JSON
            </button>
          </div>

          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            className="hidden"
          />

          <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-sm leading-relaxed text-amber-100">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
