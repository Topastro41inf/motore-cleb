export default function CounterRow({ label, value, note }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-white">{label}</h3>
        <span className="rounded-full bg-amber-400/15 px-3 py-1 font-bold text-amber-300">
          {value}
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{note}</p>
    </div>
  );
}
