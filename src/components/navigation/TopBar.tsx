import React from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { SlidersHorizontal, Building2, CheckCircle2 } from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    currentView,
    navigate,
    allWorkspaces,
    activeWorkspace,
    switchWorkspace,
    setIsDemoToolsOpen,
    approvals
  } = useOoumph();

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 border-b border-slate-200 bg-white/95 px-6 py-3.5 backdrop-blur-xs">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => navigate('team', null)}
          className="text-xl font-bold tracking-tight text-slate-950 hover:opacity-90 transition-opacity"
        >
          Ooumph
        </button>
        <span className="hidden sm:inline-block text-xs font-medium text-slate-500 border border-slate-200 rounded px-1.5 py-0.5">
          Local Demo
        </span>
      </div>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
        <button
          onClick={() => navigate('team', null)}
          className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentView === 'team'
              ? 'text-slate-950 font-semibold border-b-2 border-slate-900 -mb-0.5'
              : 'hover:text-slate-950'
          }`}
        >
          My team
        </button>

        <button
          onClick={() => navigate('work', null)}
          className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentView === 'work'
              ? 'text-slate-950 font-semibold border-b-2 border-slate-900 -mb-0.5'
              : 'hover:text-slate-950'
          }`}
        >
          My work
        </button>

        <button
          onClick={() => navigate('inbox', null)}
          className={`relative transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
            currentView === 'inbox'
              ? 'text-slate-950 font-semibold border-b-2 border-slate-900 -mb-0.5'
              : 'hover:text-slate-950'
          }`}
        >
          <span>Inbox</span>
          {pendingApprovalsCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-semibold px-1.5 py-0.2">
              {pendingApprovalsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('business', null)}
          className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentView === 'business'
              ? 'text-slate-950 font-semibold border-b-2 border-slate-900 -mb-0.5'
              : 'hover:text-slate-950'
          }`}
        >
          My business
        </button>
      </nav>

      {/* Zone 3: Primary Action & Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Workspace Switcher */}
        <div className="relative flex items-center">
          <Building2 className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-slate-500" />
          <select
            value={activeWorkspace.id}
            onChange={(e) => switchWorkspace(e.target.value)}
            className="h-8.5 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-800 hover:bg-slate-100 focus:border-slate-400 focus:outline-hidden transition-colors cursor-pointer"
          >
            {allWorkspaces.map((ws) => (
              <option key={ws.id} value={ws.id}>
                {ws.name}
              </option>
            ))}
          </select>
        </div>

        {/* Demo Tools Drawer Trigger */}
        <button
          onClick={() => setIsDemoToolsOpen(true)}
          className="flex h-8.5 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors shadow-2xs"
          title="Open Demo & Scenario Controls"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
          <span className="hidden sm:inline">Demo Tools</span>
        </button>
      </div>
    </header>
  );
};
