import DocumentStatusBadge from "./DocumentStatusBadge";

export default function DocumentCard({ section }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            {section.group}
          </p>
          <h3 className="mt-2 text-xl font-black text-white">{section.title}</h3>
        </div>
        <DocumentStatusBadge status={section.status} />
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300">{section.summary}</p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
          File / riferimento
        </p>
        <p className="mt-2 break-words font-mono text-xs text-slate-300">
          {section.file}
        </p>
      </div>

      <ul className="mt-5 space-y-2">
        {section.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-6 text-slate-400">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
