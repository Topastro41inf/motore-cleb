export const EDITABLE_CONTENT_STORAGE_KEY = "cleb-editable-content-v1";

export const DEFAULT_EDITABLE_CONTENT = {
  documentsPageStatus: {
    title: "STATO PAGINA",
    body:
      "Questa pagina non sostituisce documenti legali definitivi.\nRaccoglie le regole operative già scolpite e indica ciò che è attivo, ciò che è in bozza e ciò che arriverà con backend sicuro.",
  },
};

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function sanitizeText(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.replace(/\r\n/g, "\n").slice(0, 1200);
}

function normalizeEditableContent(value) {
  const source = isPlainObject(value) ? value : {};

  return {
    documentsPageStatus: {
      title: sanitizeText(
        source.documentsPageStatus?.title,
        DEFAULT_EDITABLE_CONTENT.documentsPageStatus.title
      ),
      body: sanitizeText(
        source.documentsPageStatus?.body,
        DEFAULT_EDITABLE_CONTENT.documentsPageStatus.body
      ),
    },
  };
}

export function getEditableContent() {
  if (typeof window === "undefined") {
    return DEFAULT_EDITABLE_CONTENT;
  }

  try {
    const raw = window.localStorage.getItem(EDITABLE_CONTENT_STORAGE_KEY);
    if (!raw) return DEFAULT_EDITABLE_CONTENT;

    const parsed = JSON.parse(raw);
    return normalizeEditableContent(parsed);
  } catch (error) {
    console.warn("C.L.E.B. contenuti modificabili non leggibili:", error);
    return DEFAULT_EDITABLE_CONTENT;
  }
}

export function saveEditableContent(nextContent) {
  if (typeof window === "undefined") return DEFAULT_EDITABLE_CONTENT;

  const normalized = normalizeEditableContent(nextContent);
  window.localStorage.setItem(
    EDITABLE_CONTENT_STORAGE_KEY,
    JSON.stringify(normalized, null, 2)
  );
  window.dispatchEvent(
    new CustomEvent("cleb-editable-content-updated", {
      detail: normalized,
    })
  );
  return normalized;
}

export function resetEditableContent() {
  if (typeof window === "undefined") return DEFAULT_EDITABLE_CONTENT;

  window.localStorage.removeItem(EDITABLE_CONTENT_STORAGE_KEY);
  window.dispatchEvent(
    new CustomEvent("cleb-editable-content-updated", {
      detail: DEFAULT_EDITABLE_CONTENT,
    })
  );
  return DEFAULT_EDITABLE_CONTENT;
}

export function buildEditableContentExport(content = getEditableContent()) {
  return {
    kind: "CLEB_EDITABLE_CONTENT",
    version: 1,
    exportedAt: new Date().toISOString(),
    content: normalizeEditableContent(content),
  };
}

export function parseEditableContentImport(payload) {
  const parsed = typeof payload === "string" ? JSON.parse(payload) : payload;

  if (!isPlainObject(parsed)) {
    throw new Error("File non valido: struttura assente.");
  }

  if (parsed.kind !== "CLEB_EDITABLE_CONTENT") {
    throw new Error("File non valido: kind non riconosciuto.");
  }

  if (!isPlainObject(parsed.content)) {
    throw new Error("File non valido: contenuto assente.");
  }

  return normalizeEditableContent(parsed.content);
}
