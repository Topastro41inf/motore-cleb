export default function EventList({ events, scenarioKey }) {
  return (
    <div className="space-y-3">
      {events.map((event, index) => (
        <div
          key={`${scenarioKey}-${event}`}
          className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-amber-300">
            {index + 1}
          </span>
          <span className="text-zinc-300">{event}</span>
        </div>
      ))}
    </div>
  );
}
