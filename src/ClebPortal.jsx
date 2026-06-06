import { useState } from 'react';
import Header from './portal/components/Header';
import PublicSite from './portal/pages/PublicSite';
import EngineView from './portal/pages/EngineView';

export default function ClebPortal() {
  const [view, setView] = useState('site');

  const go = (id) => {
    if (id === 'motore') {
      setView('engine');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setView('site');
    requestAnimationFrame(() => {
      const target = id === 'home' ? null : document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <div className="min-h-screen text-white">
      <Header onNavigate={go} />
      {view === 'engine' ? (
        <EngineView back={() => go('home')} />
      ) : (
        <PublicSite openEngine={() => go('motore')} />
      )}
    </div>
  );
}
