export default function FdaInfoCard({ eyebrow, title, body }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
      <p className="mb-3 text-xs uppercase tracking-[0.28em] text-amber-300">
        {eyebrow}
      </p>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
    </article>
  );
}
