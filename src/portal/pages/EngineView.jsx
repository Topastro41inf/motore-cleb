import MotoreCleb from '../../MotoreCleb';

export default function EngineView({ back }) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 md:px-8">
      <div className="mb-5 rounded-3xl border border-amber-200/20 bg-slate-950/65 p-4 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">Motore interno</p>
            <h1 className="text-2xl font-bold text-white">Albero C.L.E.B.</h1>
            <p className="mt-1 text-sm text-slate-300">
              Area operativa. Usa export/import prima di modifiche importanti.
            </p>
          </div>
          <button
            type="button"
            onClick={back}
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
          >
            Torna al sito
          </button>
        </div>
      </div>
      <MotoreCleb />
    </main>
  );
}
