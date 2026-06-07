export default function CustodePanelCard({ panel }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
      <h3 className="text-xl font-black text-white">{panel.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {panel.description}
      </p>

      <ul className="mt-5 space-y-3">
        {panel.items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200"
          >
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100">
        {panel.footer}
      </p>
    </article>
  );
}
