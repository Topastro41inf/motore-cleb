export default function CustodeAreaList({ areas }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {areas.map((area) => (
        <article
          key={area.title}
          className="rounded-2xl border border-white/10 bg-black/20 p-5"
        >
          <h3 className="text-base font-bold text-white">{area.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {area.description}
          </p>
          <ul className="mt-4 space-y-2">
            {area.rows.map((row) => (
              <li key={row} className="flex gap-2 text-sm text-zinc-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                <span>{row}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
