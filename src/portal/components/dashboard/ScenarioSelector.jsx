export default function ScenarioSelector({
  selectedScenario,
  setSelectedScenario,
  scenario,
  scenarioOrder,
  scenarios,
}) {
  return (
    <section className="mb-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
      <label
        htmlFor="scenario"
        className="mb-3 block text-sm font-semibold uppercase tracking-[0.22em] text-amber-200"
      >
        Scenario utente
      </label>
      <select
        id="scenario"
        value={selectedScenario}
        onChange={(event) => setSelectedScenario(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none ring-amber-300/30 focus:ring-4"
      >
        {scenarioOrder.map((key) => (
          <option key={key} value={key}>
            {scenarios[key].label}
          </option>
        ))}
      </select>
      <p className="mt-3 text-sm text-amber-100">{scenario.subtitle}</p>
    </section>
  );
}
