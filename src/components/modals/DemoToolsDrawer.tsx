import React from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  X,
  RotateCcw,
  FastForward,
  Download,
  Building,
  Sparkles,
  ShieldAlert,
  Layers,
  CheckCircle,
  HelpCircle,
  Play
} from 'lucide-react';

export const DemoToolsDrawer: React.FC = () => {
  const {
    isDemoToolsOpen,
    setIsDemoToolsOpen,
    demoMode,
    setDemoMode,
    advanceScenarioDays,
    resetToFactoryDefaults,
    exportWorkspaceJSON,
    settings,
    updateSettings,
    allWorkspaces,
    activeWorkspace,
    switchWorkspace,
    setIsFlagshipSimulatorOpen,
    setIsOnboardingOpen,
    setIsCustomerBookingOpen,
    setIsCustomerProposalOpen,
    setIsCustomerPreferenceCenterOpen,
    setIsCustomerCheckoutOpen,
    simulationLogs
  } = useOoumph();

  if (!isDemoToolsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-2xs transition-opacity">
      <div className="h-full w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Demo & Scenario Controls</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect simulated edge cases, switch plans, or reset local demo state.
            </p>
          </div>
          <button
            onClick={() => setIsDemoToolsOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Interactive Tours */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-2">Interactive Showcase Launchers</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsDemoToolsOpen(false);
                  setIsFlagshipSimulatorOpen(true);
                }}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-teal-200 bg-teal-50/50 text-left hover:bg-teal-50 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-teal-700 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-teal-950">Flagship Guide</div>
                  <div className="text-[11px] text-teal-700">Test recipient loop</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsDemoToolsOpen(false);
                  setIsOnboardingOpen(true);
                }}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/50 text-left hover:bg-indigo-50 transition-colors"
              >
                <Play className="h-4 w-4 text-indigo-700 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-indigo-950">Onboarding Flow</div>
                  <div className="text-[11px] text-indigo-700">First-time wizard</div>
                </div>
              </button>
            </div>
          </div>

          {/* Customer-Facing Experience Previews */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-2">Customer-Facing Experience Previews</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsDemoToolsOpen(false);
                  setIsCustomerBookingOpen(true);
                }}
                className="p-2.5 rounded-lg border border-slate-200 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="text-xs font-semibold text-slate-900">Strategy Booking</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Calendar appointment page</div>
              </button>

              <button
                onClick={() => {
                  setIsDemoToolsOpen(false);
                  setIsCustomerProposalOpen(true);
                }}
                className="p-2.5 rounded-lg border border-slate-200 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="text-xs font-semibold text-slate-900">Proposal Signoff</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Client digital signature view</div>
              </button>

              <button
                onClick={() => {
                  setIsDemoToolsOpen(false);
                  setIsCustomerCheckoutOpen(true);
                }}
                className="p-2.5 rounded-lg border border-slate-200 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="text-xs font-semibold text-slate-900">Public Checkout</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Seat order preview</div>
              </button>

              <button
                onClick={() => {
                  setIsDemoToolsOpen(false);
                  setIsCustomerPreferenceCenterOpen(true);
                }}
                className="p-2.5 rounded-lg border border-slate-200 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="text-xs font-semibold text-slate-900">Opt-Out Center</div>
                <div className="text-[10px] text-slate-500 mt-0.5">GDPR channel consent</div>
              </button>
            </div>
          </div>

          {/* Seeded vs Fresh Demo Mode */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-1.5">Workspace Mode</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDemoMode('seeded')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  demoMode === 'seeded'
                    ? 'border-slate-900 bg-slate-50 font-medium shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-xs font-semibold text-slate-900">Seeded Demo</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Populated with sample tasks & leads</div>
              </button>

              <button
                onClick={() => setDemoMode('fresh')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  demoMode === 'fresh'
                    ? 'border-slate-900 bg-slate-50 font-medium shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-xs font-semibold text-slate-900">Fresh Workspace</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Clean canvas for new user testing</div>
              </button>
            </div>
          </div>

          {/* Workspace Client Switcher */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-1.5">Client Workspace Separation</div>
            <div className="space-y-1.5">
              {allWorkspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => switchWorkspace(ws.id)}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    activeWorkspace.id === ws.id
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{ws.name}</div>
                    <div className="text-[11px] text-slate-500">{ws.industry}</div>
                  </div>
                  {activeWorkspace.id === ws.id && (
                    <CheckCircle className="h-4 w-4 text-slate-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Plan Tier Selector */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-1.5">Demo Plan Tier</div>
            <div className="grid grid-cols-3 gap-2">
              {(['Starter', 'Growth', 'Scale'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => updateSettings({ planTier: tier })}
                  className={`p-2 rounded-lg border text-center transition-colors ${
                    settings.planTier === tier
                      ? 'border-slate-900 bg-slate-900 text-white font-medium'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-semibold">{tier}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">
                    {tier === 'Starter' ? '3 AI Staff' : tier === 'Growth' ? '12 AI Staff' : 'All 32 Staff'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Time Advancement */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-1.5">Fast Scenario Advancement</div>
            <div className="flex gap-2">
              <button
                onClick={() => advanceScenarioDays(1)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
              >
                <FastForward className="h-3.5 w-3.5" />
                +1 Day
              </button>
              <button
                onClick={() => advanceScenarioDays(7)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
              >
                <FastForward className="h-3.5 w-3.5" />
                +1 Week
              </button>
            </div>
          </div>

          {/* Export & Reset Actions */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <button
              onClick={exportWorkspaceJSON}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5" />
              Download Local State JSON
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all demo state to factory defaults?')) {
                  resetToFactoryDefaults();
                }
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50/60 py-2 text-xs font-medium text-rose-700 hover:bg-rose-100/80 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Factory Reset Demo
            </button>
          </div>

          {/* Recent Simulation Event Stream */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-2">Simulated Event Stream</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 max-h-48 overflow-y-auto space-y-2">
              {simulationLogs.slice(0, 8).map((log) => (
                <div key={log.id} className="text-xs border-b border-slate-200/60 pb-1.5 last:border-none last:pb-0">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">{log.actor}</span>
                    <span className="tabular-nums">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="font-medium text-slate-900 mt-0.5">{log.action}</div>
                  <div className="text-[11px] text-slate-600 line-clamp-1">{log.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
