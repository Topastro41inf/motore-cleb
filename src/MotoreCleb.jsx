import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';

function makeId(prefix = 'Q') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function makeUserCode() {
  return `S_${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

const START_TRIANGLES = 4;
const MAX_ROWS = 18;
const STORAGE_KEY = 'cleb-system';

function makeTimestampForFile() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function isValidClebSystem(candidate) {
  return Boolean(
    candidate
      && typeof candidate === 'object'
      && Array.isArray(candidate.rows)
      && Array.isArray(candidate.quotas)
      && Array.isArray(candidate.payouts)
      && candidate.rowTriggers
      && typeof candidate.rowTriggers === 'object'
      && Array.isArray(candidate.events)
      && Array.isArray(candidate.users)
  );
}

function extractClebSystemFromBackup(parsed) {
  if (isValidClebSystem(parsed)) return parsed;

  if (parsed?.key === STORAGE_KEY && isValidClebSystem(parsed.data)) {
    return parsed.data;
  }

  if (parsed?.project === 'C.L.E.B.' && isValidClebSystem(parsed.data)) {
    return parsed.data;
  }

  throw new Error('Il file selezionato non contiene uno stato C.L.E.B. valido.');
}

function buildBackupEnvelope(data, reason = 'manuale') {
  return {
    project: 'C.L.E.B.',
    app: 'motore-cleb',
    version: 1,
    key: STORAGE_KEY,
    reason,
    exportedAt: new Date().toISOString(),
    data,
  };
}

function downloadJsonFile(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

const BASE_CYCLE = [
  { code: 'R1', note: 'Accensione iniziale', slots: ['P'] },
  { code: 'R2', note: 'Avvio iniziale', slots: ['P', 'P'] },
  { code: 'R4A', note: 'Prima struttura pura', slots: ['P', 'P', 'P', 'P'] },
  { code: 'R8A', note: 'Sostegno triangolare', slots: ['T', 'T', 'P', 'P', 'P', 'P', 'T', 'T'] },
  { code: 'R16A', note: 'Sostegno quadrato largo', slots: ['Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'P', 'P', 'P', 'P', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q'] },
  { code: 'R32', note: 'Massima espansione', slots: ['Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'P', 'P', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q'] },
  { code: 'R16B', note: 'Chiusura con pallino centrale', slots: ['Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'P', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q'] },
  { code: 'R8B', note: 'Riapertura stretta', slots: ['Q', 'Q', 'Q', 'P', 'P', 'Q', 'Q', 'Q'] },
  { code: 'R4B', note: 'Nucleo puro', slots: ['P', 'P', 'P', 'P'] },
];

const REPEATING_CYCLE = BASE_CYCLE.slice(3);

function buildRows() {
  return Array.from({ length: MAX_ROWS }).map((_, i) => {
    const tpl = i < BASE_CYCLE.length
      ? BASE_CYCLE[i]
      : REPEATING_CYCLE[(i - BASE_CYCLE.length) % REPEATING_CYCLE.length];

    return {
      rowId: `row_${i + 1}`,
      rowIndex: i,
      code: tpl.code,
      note: tpl.note,
      slots: tpl.slots.map((expectedType, j) => ({
        cellId: `r${i + 1}_c${j + 1}`,
        rowIndex: i,
        slotIndex: j,
        expectedType,
        quotaId: null,
      })),
    };
  });
}

function createQuota({ kind, ownerId, visibilityType, source = 'manuale', systemGenerated = false }) {
  const prefix = kind === 'pallino' ? 'P' : kind === 'triangolo' ? 'T' : 'Q';

  return {
    id: makeId(prefix),
    kind,
    ownerId,
    visibilityType,
    source,
    systemGenerated,
    state: 'attiva',
    cellId: null,
  };
}

function kindToExpected(kind) {
  if (kind === 'pallino') return 'P';
  if (kind === 'triangolo') return 'T';
  return 'Q';
}

function clone(state) {
  return {
    ...state,
    rows: state.rows.map((r) => ({ ...r, slots: r.slots.map((s) => ({ ...s })) })),
    quotas: state.quotas.map((q) => ({ ...q })),
    payouts: state.payouts.map((p) => ({ ...p })),
    rowTriggers: { ...state.rowTriggers },
    users: state.users.map((u) => ({ ...u })),
    events: [...state.events],
  };
}

function getQuota(state, id) {
  if (!id) return null;
  return state.quotas.find((q) => q.id === id) || null;
}

function getUser(state, id) {
  if (!id) return null;
  return state.users.find((u) => u.id === id) || null;
}

function findSlot(state, kind) {
  const expected = kindToExpected(kind);
  return state.rows.flatMap((r) => r.slots).find((s) => s.expectedType === expected && !s.quotaId) || null;
}

function placeQuota(state, quota) {
  const next = clone(state);
  const slot = findSlot(next, quota.kind);

  if (!slot) {
    throw new Error(`Nessuna cella disponibile per quota ${quota.kind}`);
  }

  next.rows[slot.rowIndex].slots[slot.slotIndex].quotaId = quota.id;
  next.quotas.push({ ...quota, cellId: slot.cellId });
  next.events.push(`Inserita quota ${quota.id} come ${quota.kind} per ${quota.ownerId}`);

  return next;
}

function activeInRow(state, rowIndex, kind) {
  const row = state.rows[rowIndex];
  if (!row) return [];

  return row.slots
    .map((s) => getQuota(state, s.quotaId))
    .filter(Boolean)
    .filter((q) => q.kind === kind && q.state === 'attiva');
}

function triggerCapacity(row) {
  if (row.code === 'R1' || row.code === 'R2') return 0;
  const filled = row.slots.filter((s) => s.quotaId).length;
  return Math.floor(filled / 4);
}

function markQuota(state, quotaId, patch) {
  return {
    ...state,
    quotas: state.quotas.map((q) => (q.id === quotaId ? { ...q, ...patch } : q)),
  };
}

function applyPallino(state, quota, triggerRow) {
  let next = markQuota(state, quota.id, { state: 'pagata' });

  next.payouts.push({
    payoutId: makeId('PAY'),
    quotaId: quota.id,
    ownerId: quota.ownerId,
    amount: 30,
  });

  next.events.push(`Pallino ${quota.id} pagato per ${quota.ownerId}`);

  next = placeQuota(next, createQuota({
    kind: 'pallino',
    ownerId: quota.ownerId,
    visibilityType: quota.visibilityType,
    source: `rigenerata_da_${quota.id}`,
    systemGenerated: true,
  }));

  next = placeQuota(next, createQuota({ kind: 'quadrato', ownerId: 'CLEB', visibilityType: 'sistema', systemGenerated: true }));
  next = placeQuota(next, createQuota({ kind: 'quadrato', ownerId: 'CLEB', visibilityType: 'sistema', systemGenerated: true }));

  next.rowTriggers[triggerRow.rowId] = (next.rowTriggers[triggerRow.rowId] || 0) + 1;
  return next;
}

function applyTriangolo(state, quota, triggerRow) {
  let next = markQuota(state, quota.id, { state: 'chiusa' });

  next.events.push(`Triangolo ${quota.id} maturato`);

  next = placeQuota(next, createQuota({
    kind: 'triangolo',
    ownerId: quota.ownerId,
    visibilityType: quota.visibilityType,
    source: `rigenerata_da_${quota.id}`,
    systemGenerated: true,
  }));

  next = placeQuota(next, createQuota({
    kind: 'triangolo',
    ownerId: quota.ownerId,
    visibilityType: quota.visibilityType,
    source: `rigenerata2_da_${quota.id}`,
    systemGenerated: true,
  }));

  next = placeQuota(next, createQuota({ kind: 'quadrato', ownerId: 'CLEB', visibilityType: 'sistema', systemGenerated: true }));
  next = placeQuota(next, createQuota({ kind: 'quadrato', ownerId: 'CLEB', visibilityType: 'sistema', systemGenerated: true }));

  next.rowTriggers[triggerRow.rowId] = (next.rowTriggers[triggerRow.rowId] || 0) + 1;
  return next;
}

function triggerOnce(state) {
  for (let i = 2; i < state.rows.length; i += 1) {
    const row = state.rows[i];
    const used = state.rowTriggers[row.rowId] || 0;

    if (used >= triggerCapacity(row)) continue;

    const targetRow = i - 2;
    const p = activeInRow(state, targetRow, 'pallino')[0];
    if (p) return applyPallino(state, p, row);

    const t = activeInRow(state, targetRow, 'triangolo')[0];
    if (t) return applyTriangolo(state, t, row);
  }

  return state;
}

function runAuto(state) {
  let cur = clone(state);
  let guard = 0;

  while (guard < 200) {
    const next = triggerOnce(cur);

    if (JSON.stringify(next) === JSON.stringify(cur)) break;

    cur = next;
    guard += 1;
  }

  return cur;
}

function addQuota(state, payload) {
  return runAuto(placeQuota(state, createQuota(payload)));
}

function addSquares(state, count) {
  let cur = clone(state);
  const n = Number(count || 0);

  if (!Number.isFinite(n) || n <= 0) return cur;

  for (let i = 0; i < n; i += 1) {
    cur = placeQuota(cur, createQuota({
      kind: 'quadrato',
      ownerId: 'CLEB',
      visibilityType: 'sistema',
      systemGenerated: true,
    }));
  }

  return runAuto(cur);
}

function addUser(state, userData) {
  const next = clone(state);
  const code = makeUserCode();

  const nome = userData.nome?.trim() || '';
  const cognome = userData.cognome?.trim() || '';
  const label = `${nome} ${cognome}`.trim() || 'Nuovo socio';

  const user = {
    id: code,
    label,
    nome,
    cognome,
    telefono: userData.telefono?.trim() || '',
    email: userData.email?.trim() || '',
    note: userData.note?.trim() || '',
  };

  next.users.push(user);
  next.events.push(`Creato nuovo socio ${code}`);

  return { state: next, user };
}

function createInitial() {
  let s = {
    rows: buildRows(),
    quotas: [],
    payouts: [],
    rowTriggers: {},
    events: [],
    users: [
      { id: 'CLEB', label: 'C.L.E.B.' },
      { id: 'S001', label: 'Socio 1' },
    ],
  };

  for (let i = 0; i < START_TRIANGLES; i += 1) {
    s = placeQuota(s, createQuota({
      kind: 'triangolo',
      ownerId: 'CLEB',
      visibilityType: 'sistema',
      systemGenerated: true,
    }));
  }

  s.events.push(`Inseriti ${START_TRIANGLES} triangoli iniziali di C.L.E.B.`);
  return s;
}

function stats(state) {
  return {
    pallini: state.quotas.filter((q) => q.kind === 'pallino').length,
    triangoli: state.quotas.filter((q) => q.kind === 'triangolo').length,
    quadrati: state.quotas.filter((q) => q.kind === 'quadrato').length,
    pagati: state.quotas.filter((q) => q.kind === 'pallino' && q.state === 'pagata').length,
    soci: state.users.filter((u) => u.id !== 'CLEB').length,
    pagamenti: state.payouts.length,
  };
}

function badgeClass(state) {
  if (state === 'pagata') return 'bg-emerald-100 text-emerald-800';
  if (state === 'chiusa') return 'bg-violet-100 text-violet-800';
  return 'bg-slate-100 text-slate-800';
}

function cellVisual(slot, quota, selectedOwnerId) {
  if (!quota) {
    const symbol = slot.expectedType === 'P' ? '○' : slot.expectedType === 'T' ? '△' : '□';

    const boxClass = slot.expectedType === 'P'
      ? 'border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500'
      : slot.expectedType === 'T'
      ? 'border-violet-200 bg-violet-50 text-violet-300 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300'
      : 'border-blue-200 bg-blue-50 text-blue-300 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300';

    return { symbol, boxClass };
  }

  const isSelectedOwner = quota.ownerId === selectedOwnerId && quota.kind === 'pallino';

  if (quota.kind === 'pallino') {
    return {
      symbol: '●',
      boxClass: isSelectedOwner
        ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300'
        : 'border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
    };
  }

  if (quota.kind === 'triangolo') {
    return {
      symbol: '▲',
      boxClass: 'border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
    };
  }

  return {
    symbol: '■',
    boxClass: 'border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  };
}

export default function MotoreCleb() {
  const [system, setSystem] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : createInitial();
    } catch (error) {
      console.error('Errore caricamento dati salvati:', error);
      localStorage.removeItem(STORAGE_KEY);
      return createInitial();
    }
  });

  const [selectedOwnerId, setSelectedOwnerId] = useState('S001');
  const [quotaKind, setQuotaKind] = useState('pallino');
  const [visibilityType, setVisibilityType] = useState('personale');
  const [squareCount, setSquareCount] = useState('1');
  const [showAdmin, setShowAdmin] = useState(false);
  const [newUser, setNewUser] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    note: '',
  });
  const [darkMode, setDarkMode] = useState(true);
  const [backupStatus, setBackupStatus] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
    } catch (error) {
      console.error('Errore salvataggio dati:', error);
    }
  }, [system]);

  const summary = useMemo(() => stats(system), [system]);

  const selectedUserQuotas = useMemo(
    () => system.quotas.filter((q) => q.ownerId === selectedOwnerId && q.kind === 'pallino'),
    [system, selectedOwnerId]
  );

  const handleAddQuota = () => {
    try {
      const ownerId = quotaKind === 'pallino' ? selectedOwnerId : 'CLEB';

      const next = addQuota(system, {
        kind: quotaKind,
        ownerId,
        visibilityType,
      });

      setSystem(next);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Errore inserimento quota');
    }
  };

  const handleAddSquares = () => {
    try {
      setSystem(addSquares(system, Number(squareCount || 0)));
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Errore inserimento quadrati');
    }
  };

  const handleAddUser = () => {
    const result = addUser(system, newUser);

    setSystem(result.state);
    setSelectedOwnerId(result.user.id);
    setNewUser({
      nome: '',
      cognome: '',
      telefono: '',
      email: '',
      note: '',
    });
  };

  const handleExportBackup = () => {
    const payload = buildBackupEnvelope(system, 'manuale');
    const filename = `cleb-backup-${makeTimestampForFile()}.json`;

    downloadJsonFile(filename, payload);
    setBackupStatus(`Backup esportato: ${filename}`);
  };

  const handleImportBackup = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';

    input.onchange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const raw = await file.text();
        const parsed = JSON.parse(raw);
        const importedSystem = extractClebSystemFromBackup(parsed);

        const confirmed = window.confirm(
          `Importare questo backup C.L.E.B.?\n\n` +
          `Soci: ${importedSystem.users.length}\n` +
          `Quote: ${importedSystem.quotas.length}\n` +
          `Righe: ${importedSystem.rows.length}\n\n` +
          'Lo stato attuale verrà salvato prima in un backup interno del browser.'
        );

        if (!confirmed) return;

        const internalBackupKey = `${STORAGE_KEY}-before-import-${Date.now()}`;
        localStorage.setItem(
          internalBackupKey,
          JSON.stringify(buildBackupEnvelope(system, 'backup-interno-prima-importazione'))
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(importedSystem));
        setSystem(importedSystem);

        const stillExists = importedSystem.users.some((user) => user.id === selectedOwnerId);
        if (!stillExists) {
          setSelectedOwnerId(importedSystem.users.find((user) => user.id !== 'CLEB')?.id || 'CLEB');
        }

        setBackupStatus(`Backup importato: ${file.name}. Copia precedente salvata in localStorage.`);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Errore durante importazione backup C.L.E.B.');
      }
    };

    input.click();
  };

  const resetAll = () => {
    const confirmed = window.confirm(
      'Attenzione: questa azione azzera lo stato C.L.E.B. visibile nel browser.\n\n' +
      'Prima verrà salvato un backup interno automatico. Continuare?'
    );

    if (!confirmed) return;

    const internalBackupKey = `${STORAGE_KEY}-before-reset-${Date.now()}`;
    localStorage.setItem(
      internalBackupKey,
      JSON.stringify(buildBackupEnvelope(system, 'backup-interno-prima-azzeramento'))
    );

    localStorage.removeItem(STORAGE_KEY);
    setSystem(createInitial());
    setBackupStatus('Sistema azzerato. Backup precedente salvato internamente nel browser.');
  };

  return (
    <div className={darkMode ? 'dark min-h-screen bg-slate-950 text-slate-100 p-6 relative overflow-hidden' : 'min-h-screen bg-slate-50 text-slate-900 p-6 relative overflow-hidden'}>
      <style>{`
        .dark * {
          border-color: rgb(30 41 59 / 1) !important;
        }
        .dark .text-slate-500 { color: rgb(148 163 184 / 1) !important; }
        .dark .text-slate-600 { color: rgb(203 213 225 / 1) !important; }
        .dark .text-slate-700 { color: rgb(226 232 240 / 1) !important; }
        .dark .text-slate-900 { color: rgb(241 245 249 / 1) !important; }
        .dark input,
        .dark select,
        .dark textarea {
          background-color: rgb(2 6 23 / 1) !important;
          color: rgb(241 245 249 / 1) !important;
        }
        .dark input::placeholder,
        .dark textarea::placeholder {
          color: rgb(100 116 139 / 1) !important;
        }
        .dark .bg-white { background-color: rgb(2 6 23 / 0.92) !important; }
        .dark .bg-slate-50 { background-color: rgb(2 6 23 / 1) !important; }
        .dark .bg-slate-100 { background-color: rgb(15 23 42 / 1) !important; }
      `}</style>

      <div className={darkMode ? 'pointer-events-none absolute inset-0 overflow-hidden opacity-100' : 'pointer-events-none absolute inset-0 opacity-30'}>
        <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl space-y-6 relative z-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Motore C.L.E.B. </h1>
            <p className="mt-2 text-sm text-slate-600">
              Albero ciclico, quote e soci in espansione continua.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className={darkMode ? 'rounded-2xl border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800' : 'rounded-2xl'}
              onClick={handleExportBackup}
            >
              Esporta stato
            </Button>

            <Button
              variant="outline"
              className={darkMode ? 'rounded-2xl border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800' : 'rounded-2xl'}
              onClick={handleImportBackup}
            >
              Importa stato
            </Button>

            <Button
              variant="outline"
              className={darkMode ? 'rounded-2xl border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800' : 'rounded-2xl'}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? 'Tema chiaro' : 'Tema scuro'}
            </Button>

            <Button
              variant="outline"
              className={darkMode ? 'rounded-2xl border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800' : 'rounded-2xl'}
              onClick={resetAll}
            >
              Azzera
            </Button>
          </div>
        </div>

        {backupStatus && (
          <div className={darkMode ? 'rounded-2xl border border-cyan-900/60 bg-cyan-950/30 p-3 text-sm text-cyan-100' : 'rounded-2xl border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-900'}>
            {backupStatus}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <Card className={darkMode ? 'rounded-2xl border-slate-800 bg-slate-900/90' : 'rounded-2xl'}>
            <CardContent className="p-4">
              <div className="text-sm text-slate-500">Pallini</div>
              <div className="text-2xl font-semibold">{summary.pallini}</div>
            </CardContent>
          </Card>

          <Card className={darkMode ? 'rounded-2xl border-slate-800 bg-slate-900/90' : 'rounded-2xl'}>
            <CardContent className="p-4">
              <div className="text-sm text-slate-500">Triangoli</div>
              <div className="text-2xl font-semibold">{summary.triangoli}</div>
            </CardContent>
          </Card>

          <Card className={darkMode ? 'rounded-2xl border-slate-800 bg-slate-900/90' : 'rounded-2xl'}>
            <CardContent className="p-4">
              <div className="text-sm text-slate-500">Quadrati</div>
              <div className="text-2xl font-semibold">{summary.quadrati}</div>
            </CardContent>
          </Card>

          <Card className={darkMode ? 'rounded-2xl border-slate-800 bg-slate-900/90' : 'rounded-2xl'}>
            <CardContent className="p-4">
              <div className="text-sm text-slate-500">Pallini pagati</div>
              <div className="text-2xl font-semibold">{summary.pagati}</div>
            </CardContent>
          </Card>

          <Card className={darkMode ? 'rounded-2xl border-slate-800 bg-slate-900/90' : 'rounded-2xl'}>
            <CardContent className="p-4">
              <div className="text-sm text-slate-500">Soci</div>
              <div className="text-2xl font-semibold">{summary.soci}</div>
            </CardContent>
          </Card>

          <Card className={darkMode ? 'rounded-2xl border-slate-800 bg-slate-900/90' : 'rounded-2xl'}>
            <CardContent className="p-4">
              <div className="text-sm text-slate-500">Pagamenti creati</div>
              <div className="text-2xl font-semibold">{summary.pagamenti}</div>
            </CardContent>
          </Card>
        </div>

        <Card className={darkMode ? 'rounded-2xl shadow-sm border-slate-800 bg-slate-900/90' : 'rounded-2xl shadow-sm'}>
          <CardHeader>
            <CardTitle>Controlli rapidi</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Socio proprietario del pallino</Label>
              <Select value={selectedOwnerId} onValueChange={setSelectedOwnerId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {system.users.filter((u) => u.id !== 'CLEB').map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.label} · {u.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo quota</Label>
              <Select value={quotaKind} onValueChange={setQuotaKind}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pallino">Pallino</SelectItem>
                  <SelectItem value="triangolo">Triangolo</SelectItem>
                  <SelectItem value="quadrato">Quadrato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Titolo quota</Label>
              <Select value={visibilityType} onValueChange={setVisibilityType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personale">Personale</SelectItem>
                  <SelectItem value="accumulo">Accumulo</SelectItem>
                  <SelectItem value="beneficienza">Beneficienza</SelectItem>
                  <SelectItem value="altro">Altro</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Azioni</Label>
              <div className="flex gap-2">
                <Button className="rounded-2xl flex-1" onClick={handleAddQuota}>
                  Aggiungi quota
                </Button>

                <Button className="rounded-2xl" variant="outline" onClick={() => setShowAdmin(!showAdmin)}>
                  Gestione soci
                </Button>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Quadrati da C.L.E.B.</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  value={squareCount}
                  onChange={(e) => setSquareCount(e.target.value)}
                />

                <Button className="rounded-2xl" variant="outline" onClick={handleAddSquares}>
                  Inserisci quadrati
                </Button>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Pallini del socio selezionato</Label>
              <div className="text-sm text-slate-600">
                Totale: {selectedUserQuotas.length}
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedUserQuotas.slice().reverse().slice(0, 8).map((q) => (
                  <Badge key={q.id} className={badgeClass(q.state)}>
                    {q.id} · {q.visibilityType}
                  </Badge>
                ))}

                {selectedUserQuotas.length === 0 && (
                  <div className="text-sm text-slate-500">Nessun pallino per questo socio.</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="albero" className="space-y-4">
          <TabsList className={darkMode ? 'grid w-full grid-cols-3 rounded-2xl bg-slate-900/90 border border-slate-800' : 'grid w-full grid-cols-3 rounded-2xl'}>
            <TabsTrigger value="albero" className="rounded-2xl p-3">Albero</TabsTrigger>
            <TabsTrigger value="quote" className="rounded-2xl p-3">Quote</TabsTrigger>
            <TabsTrigger value="eventi" className="rounded-2xl p-3">Eventi</TabsTrigger>
          </TabsList>

          <TabsContent value="albero">
            <Card className={darkMode ? 'rounded-2xl shadow-sm border-slate-800 bg-slate-900/90' : 'rounded-2xl shadow-sm'}>
              <CardHeader>
                <CardTitle>Struttura ciclica unica</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 overflow-x-auto pb-2">
                <div className="w-max min-w-full space-y-4">
                  {system.rows.map((row) => (
                    <div key={row.rowId} className="space-y-2 rounded-2xl border bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-medium">{row.code} · riga {row.rowIndex + 1}</div>
                          <div className="text-sm text-slate-500">{row.note}</div>
                        </div>

                        <Badge className="bg-slate-100 text-slate-800">
                          {row.slots.length} celle
                        </Badge>
                      </div>

                      <div className="flex justify-center gap-2">
                        {row.slots.map((slot) => {
                          const quota = getQuota(system, slot.quotaId);
                          const view = cellVisual(slot, quota, selectedOwnerId);
                          const owner = quota ? getUser(system, quota.ownerId) : null;

                          return (
                            <button
                              key={slot.cellId}
                              type="button"
                              className={`flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border text-xs ${view.boxClass}`}
                              title={quota ? `${quota.id} · ${owner?.label || quota.ownerId} · ${quota.visibilityType} · ${quota.state}` : `${slot.expectedType} vuota`}
                            >
                              <div className="text-xl leading-none">{view.symbol}</div>
                              <div className="mt-1 text-[11px]">{slot.slotIndex + 1}</div>

                              {quota ? (
                                <Badge className={`mt-1 ${badgeClass(quota.state)}`}>
                                  {quota.state}
                                </Badge>
                              ) : (
                                <div className="mt-1 text-[10px]">vuota</div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quote">
            <Card className={darkMode ? 'rounded-2xl shadow-sm border-slate-800 bg-slate-900/90' : 'rounded-2xl shadow-sm'}>
              <CardHeader>
                <CardTitle>Registro quote</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {system.quotas.length === 0 && (
                  <div className="text-sm text-slate-500">Nessuna quota inserita.</div>
                )}

                {[...system.quotas].reverse().map((quota) => {
                  const owner = getUser(system, quota.ownerId);

                  return (
                    <div key={quota.id} className="rounded-2xl border bg-white p-4">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-medium">{quota.id}</div>
                          <div className="text-sm text-slate-600">
                            {quota.kind} · {quota.visibilityType} · {owner?.label || quota.ownerId}
                          </div>
                          <div className="text-sm text-slate-500">
                            {quota.ownerId} · {quota.cellId}
                          </div>
                        </div>

                        <Badge className={badgeClass(quota.state)}>
                          {quota.state}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eventi">
            <Card className={darkMode ? 'rounded-2xl shadow-sm border-slate-800 bg-slate-900/90' : 'rounded-2xl shadow-sm'}>
              <CardHeader>
                <CardTitle>Log del motore</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                {system.events.length === 0 && (
                  <div className="text-sm text-slate-500">Ancora nessun evento.</div>
                )}

                {[...system.events].reverse().map((event, idx) => (
                  <div key={`${event}_${idx}`} className="rounded-xl border bg-white p-3 text-sm text-slate-700">
                    {event}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showAdmin && (
          <Card className={darkMode ? 'rounded-2xl shadow-sm border-slate-800 bg-slate-900/90' : 'rounded-2xl shadow-sm'}>
            <CardHeader>
              <CardTitle>Gestione soci</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={newUser.nome}
                    onChange={(e) => setNewUser((p) => ({ ...p, nome: e.target.value }))}
                    placeholder="Nome"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cognome</Label>
                  <Input
                    value={newUser.cognome}
                    onChange={(e) => setNewUser((p) => ({ ...p, cognome: e.target.value }))}
                    placeholder="Cognome"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Telefono</Label>
                  <Input
                    value={newUser.telefono}
                    onChange={(e) => setNewUser((p) => ({ ...p, telefono: e.target.value }))}
                    placeholder="Telefono"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={newUser.email}
                    onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Note</Label>
                <Input
                  value={newUser.note}
                  onChange={(e) => setNewUser((p) => ({ ...p, note: e.target.value }))}
                  placeholder="Note"
                />
              </div>

              <div className="flex justify-end">
                <Button className="rounded-2xl" onClick={handleAddUser}>
                  Crea socio
                </Button>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">Soci esistenti</div>

                {system.users.filter((u) => u.id !== 'CLEB').map((u) => (
                  <div key={u.id} className="rounded-xl border bg-white p-3 text-sm">
                    <div className="font-medium">{u.label}</div>
                    <div className="text-slate-500">{u.id}</div>

                    {(u.telefono || u.email || u.note) && (
                      <div className="mt-1 text-slate-500">
                        {[u.telefono, u.email, u.note].filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}