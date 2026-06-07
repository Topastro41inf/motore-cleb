import { useState } from 'react';
import Header from './portal/components/Header';
import PublicSite from './portal/pages/PublicSite';
import EngineView from './portal/pages/EngineView';
import AccessPage from './portal/pages/AccessPage';
import FiloAriannaPage from './portal/pages/FiloAriannaPage';

import DashboardPage from "./portal/pages/DashboardPage";
import CustodePage from "./portal/pages/CustodePage";
import UnitaValorePage from './portal/pages/UnitaValorePage';
export default function ClebPortal() {
  const [view, setView] = useState('site');

  const go = (id) => {
    if (id === 'motore') {
      setView('engine');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'accesso') {
      setView('access');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    
    if (id === 'filo') {
      setView('filo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

if (id === 'dashboard') {
      setView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'custode') {
      setView('custode');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'uv') {
      setView('uv');
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

      {view === 'engine' && <EngineView back={() => go('home')} />}
      {view === 'access' && <AccessPage back={() => go('home')} />}
      {view === 'filo' && <FiloAriannaPage back={() => go('home')} />}      {view === 'dashboard' && <DashboardPage back={() => go('home')} />}
      {view === 'custode' && <CustodePage back={() => go('home')} />}      {view === 'uv' && <UnitaValorePage back={() => go('home')} />}


      {view === 'site' && <PublicSite openEngine={() => go('motore')} openAccess={() => go('accesso')} />}
    </div>
  );
}
