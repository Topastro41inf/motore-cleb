import { useEffect, useState } from "react";
import { getEditableContent } from "../../data/siteEditableContent";

export default function EditablePageStatus() {
  const [content, setContent] = useState(() => getEditableContent());

  useEffect(() => {
    const sync = () => setContent(getEditableContent());

    window.addEventListener("storage", sync);
    window.addEventListener("cleb-editable-content-updated", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cleb-editable-content-updated", sync);
    };
  }, []);

  const status = content.documentsPageStatus;

  return (
    <section className="rounded-3xl border border-amber-300/25 bg-black/25 p-6 md:p-8">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-amber-200">
        {status.title}
      </p>
      <div className="space-y-3 text-base leading-relaxed text-slate-100 md:text-lg">
        {status.body.split("\n").map((line, index) => (
          <p key={`${line}-${index}`}>{line}</p>
        ))}
      </div>
    </section>
  );
}
