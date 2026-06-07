export default function UVFlowCard({ index, title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 text-sm font-black text-amber-100">
        {index}
      </span>
      <h3 className="mt-4 text-lg font-black text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
    </article>
  );
}
