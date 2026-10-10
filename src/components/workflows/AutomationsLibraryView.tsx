import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  Repeat,
  Zap,
  Calendar,
  Clock,
  Play,
  Pause,
  SkipForward,
  StopCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
  Info,
  Filter,
  Plus
} from 'lucide-react';
import { RecurringAutomation } from '../../types';

export const AutomationsLibraryView: React.FC = () => {
  const {
    recurringAutomations,
    activeWorkspaceId,
    pauseRecurringAutomation,
    resumeRecurringAutomation,
    skipNextRecurringRun,
    cancelFutureRuns,
    openAssignmentComposer,
    setSelectedProjectId,
    setWorkTab,
    employees,
    projects
  } = useOoumph();

  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'paused' | 'event_driven'>('all');

  const workspaceAutomations = recurringAutomations.filter((a) => a.workspaceId === activeWorkspaceId);

  const filteredAutomations = workspaceAutomations.filter((a) => {
    if (filterMode === 'active') return a.status === 'active';
    if (filterMode === 'paused') return a.status === 'paused';
    if (filterMode === 'event_driven') return a.cadenceType === 'event_driven';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Explanation Banner: Template vs Active Automation */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider uppercase text-indigo-300 bg-indigo-900/50 px-2 py-0.5 rounded">
              Active Routines
            </span>
            <span className="text-xs text-slate-300">vs Reusable Templates</span>
          </div>
          <h3 className="text-lg font-bold">Automations & Operating Routines</h3>
          <p className="text-xs text-slate-300 max-w-2xl mt-0.5 leading-relaxed">
            These are your activated, scheduled, and event-driven workflows. Editing schedule parameters here adjusts future occurrences for this workspace without mutating the reusable recipe.
          </p>
        </div>

        <button
          onClick={() => {
            const firstEmp = employees[0]?.id || 'emp-a02';
            openAssignmentComposer(firstEmp);
          }}
          className="px-4 py-2 bg-white text-slate-950 hover:bg-slate-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Routine</span>
        </button>
      </div>

      {/* Honest Demo Simulation Notice */}
      <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong>Local simulation:</strong> Scheduled demo work advances while using this demo and through <strong>Demo Tools (+1 Day / +1 Week)</strong>. It does not continue when the browser is closed.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'all', label: `All Routines (${workspaceAutomations.length})` },
            { id: 'active', label: `Active (${workspaceAutomations.filter((a) => a.status === 'active').length})` },
            { id: 'paused', label: `Paused (${workspaceAutomations.filter((a) => a.status === 'paused').length})` },
            { id: 'event_driven', label: `Event-Driven (${workspaceAutomations.filter((a) => a.cadenceType === 'event_driven').length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterMode(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterMode === tab.id
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          Workspace cadence: <strong>Monday – Friday</strong>
        </div>
      </div>

      {/* Automations Grid */}
      {filteredAutomations.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white">
          <Repeat className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-900">No matching routines found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Create a recurring assignment or activate an event-driven routine to automate work across your team.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAutomations.map((auto) => {
            const emp = employees.find((e) => e.id === auto.employeeId);
            const proj = projects.find((p) => p.id === auto.projectId);
            const isEvent = auto.cadenceType === 'event_driven';

            return (
              <div
                key={auto.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Badges & Status */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isEvent
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {isEvent ? 'Event-Driven' : 'Recurring Schedule'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        auto.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        auto.status === 'paused' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {auto.status.toUpperCase()}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono">
                      #{auto.occurrencesCompleted} runs completed
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{auto.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
                    {auto.description}
                  </p>

                  {/* Metadata Box */}
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-2 text-xs mb-4">
                    {/* Cadence / Trigger */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        {isEvent ? <Zap className="h-3.5 w-3.5 text-indigo-500" /> : <Clock className="h-3.5 w-3.5 text-blue-500" />}
                        {isEvent ? 'Trigger:' : 'Schedule:'}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {isEvent
                          ? auto.scheduleDetails.triggerSummary || 'On event match'
                          : `${auto.scheduleDetails.daysOfWeek?.join(', ') || 'Daily'} at ${auto.scheduleDetails.timeOfDay || '09:00 AM'}`}
                      </span>
                    </div>

                    {/* Next Run / Last Simulated Event */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {isEvent ? 'Last Simulated Event:' : 'Next Scheduled Run:'}
                      </span>
                      <span className="text-slate-700 font-medium">
                        {isEvent
                          ? (auto.lastRunDate ? new Date(auto.lastRunDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Pending event')
                          : (auto.nextRunDate ? new Date(auto.nextRunDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Continuous')}
                      </span>
                    </div>

                    {/* Expected Output per run */}
                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-200/50">
                      <span className="text-slate-500 shrink-0">Outputs Each Run:</span>
                      <span className="text-slate-900 font-medium text-right line-clamp-1">
                        {auto.expectedOutput}
                      </span>
                    </div>

                    {/* Responsible Employee & Project */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/50">
                      <span className="text-slate-500">Owner & Scope:</span>
                      <div className="flex items-center gap-1.5 text-slate-800">
                        {emp && (
                          <span className="font-semibold">
                            {emp.name} ({emp.code})
                          </span>
                        )}
                        {proj && (
                          <span className="text-slate-400">
                            • {proj.title.slice(0, 20)}...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Operational Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    {auto.status === 'active' ? (
                      <button
                        onClick={() => pauseRecurringAutomation(auto.id)}
                        className="px-2.5 py-1 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="Pause schedule"
                      >
                        <Pause className="h-3 w-3" />
                        <span>Pause</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => resumeRecurringAutomation(auto.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="Resume schedule"
                      >
                        <Play className="h-3 w-3" />
                        <span>Resume</span>
                      </button>
                    )}

                    {!isEvent && (
                      <button
                        onClick={() => skipNextRecurringRun(auto.id)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="Skip the next scheduled cycle"
                      >
                        <SkipForward className="h-3 w-3" />
                        <span>Skip Next</span>
                      </button>
                    )}
                  </div>

                  {auto.projectId && (
                    <button
                      onClick={() => {
                        setSelectedProjectId(auto.projectId!);
                        setWorkTab('projects');
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Project</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
