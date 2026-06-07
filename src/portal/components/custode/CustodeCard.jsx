export default function CustodeCard({ title, kicker, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
      {kicker && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80">
          {kicker}
        </p>
      )}
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}
