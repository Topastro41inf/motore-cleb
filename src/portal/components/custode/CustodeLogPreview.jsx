export default function CustodeLogPreview({ events }) {
  return (
    <div className="space-y-3">
      {events.map((item, index) => (
        <article
          key={`${item.event}-${index}`}
          className="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-white">{item.event}</h3>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
              {item.time}
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-400">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}
