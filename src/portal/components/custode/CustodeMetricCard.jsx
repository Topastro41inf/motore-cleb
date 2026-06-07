import CustodeBadge from "./CustodeBadge";

export default function CustodeMetricCard({ metric }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
          {metric.label}
        </h3>
        <CustodeBadge tone={metric.tone}>{metric.value}</CustodeBadge>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{metric.note}</p>
    </article>
  );
}
