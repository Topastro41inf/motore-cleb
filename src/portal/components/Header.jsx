const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'visione', label: 'Visione' },
  { id: 'accesso', label: 'Iscrizione' },
  { id: 'servizi', label: 'Servizi' },
  { id: 'uv', label: 'Unità Valore' },
  { id: "dashboard", label: "Dashboard" },
  { id: 'filo', label: 'Filo di Arianna' },
    { id: 'custode', label: 'Custode' },
    { id: 'documenti', label: 'Documenti' },
  { id: 'motore', label: 'Motore' },
];

export default function Header({ onNavigate }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <button type="button" onClick={() => onNavigate('home')} className="text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/80">C.L.E.B.</p>
          <p className="text-lg font-black text-white">Sistema madre</p>
        </button>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-white/15"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
