export default function Card({ title, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur">
      <h2 className="mb-3 text-2xl font-semibold tracking-tight text-amber-200">{title}</h2>
      <div className="space-y-3 text-sm leading-7 text-slate-100 md:text-base">{children}</div>
    </section>
  );
}
