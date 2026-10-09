import React, { useState, useRef, useEffect } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  SlidersHorizontal,
  Building2,
  CheckCircle2,
  Settings as SettingsIcon,
  RotateCcw,
  Download,
  User,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    currentView,
    navigate,
    allWorkspaces,
    activeWorkspace,
    switchWorkspace,
    setIsDemoToolsOpen,
    approvals,
    resetToFactoryDefaults,
    exportWorkspaceJSON
  } = useOoumph();

  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef<HTMLDivElement>(null);

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;

  // Close avatar menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target as Node)) {
        setIsAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          onClick={() => navigate('sales', null)}
          className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentView === 'sales'
              ? 'text-slate-950 font-semibold border-b-2 border-slate-900 -mb-0.5'
              : 'hover:text-slate-950'
          }`}
        >
          Sales
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
          className="hidden sm:flex h-8.5 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors shadow-2xs"
          title="Open Demo & Scenario Controls"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
          <span>Demo Tools</span>
        </button>

        {/* Account / Avatar Dropdown Menu (Houses Settings) */}
        <div className="relative" ref={avatarMenuRef}>
          <button
            onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
            className="flex items-center gap-1.5 h-8.5 pl-1.5 pr-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
            title="Account & Settings Menu"
          >
            <div className="h-6 w-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
              PR
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {isAvatarMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 text-xs animate-scale-in">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-semibold text-slate-900">Prashant</div>
                <div className="text-[11px] text-slate-500">prashant.ooumph@gmail.com</div>
                <div className="text-[10px] text-teal-700 font-medium mt-0.5">Workspace Owner</div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('settings');
                    setIsAvatarMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentView === 'settings'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <SettingsIcon className="h-3.5 w-3.5 text-slate-500" />
                  <span>Workspace Settings</span>
                </button>

                <button
                  onClick={() => {
                    navigate('business');
                    setIsAvatarMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Building2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>My Business Knowledge</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    exportWorkspaceJSON();
                    setIsAvatarMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left text-slate-600 hover:bg-slate-50 transition-colors text-[11px]"
                >
                  <Download className="h-3.5 w-3.5 text-slate-400" />
                  <span>Export Local JSON</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo state to factory defaults?')) {
                      resetToFactoryDefaults();
                      setIsAvatarMenuOpen(false);
                    }
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left text-rose-600 hover:bg-rose-50 transition-colors text-[11px]"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-rose-500" />
                  <span>Reset Demo State</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

