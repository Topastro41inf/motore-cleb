export default function StatusBadge({ children, active }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-500/15 text-emerald-300"
          : "bg-zinc-500/15 text-zinc-300"
      }`}
    >
      {children}
    </span>
  );
}
