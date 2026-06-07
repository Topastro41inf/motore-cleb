export default function InfoLine({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-zinc-400">{label}</span>
      <span>{children}</span>
    </div>
  );
}
