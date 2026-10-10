import React, { useState, useEffect } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  X,
  Settings,
  Calendar,
  Users,
  ShieldCheck,
  Radio,
  FileCheck,
  Bell,
  AlertTriangle,
  Play,
  Pause,
  StopCircle,
  Archive,
  SkipForward,
  Check,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  ProjectType,
  ProjectCadenceType,
  ProjectEndRule
} from '../../types';

export const ProjectSettingsModal: React.FC = () => {
  const {
    isProjectSettingsOpen,
    setIsProjectSettingsOpen,
    projectSettingsTargetProjectId,
    projects,
    activeWorkspaceId,
    updateProject,
    pauseProject,
    resumeProject,
    endProject,
    cancelFutureRuns,
    skipNextRecurringRun,
    archiveProject,
    teamMembers,
    employees,
    openAddTeammateModal,
    openIntegrationDetail,
    settings,
    openConnectIntegration
  } = useOoumph();

  const project = projects.find((p) => p.id === projectSettingsTargetProjectId);

  const [activeTab, setActiveTab] = useState<'details' | 'schedule' | 'team' | 'governance' | 'connections' | 'outputs' | 'notifications' | 'lifecycle'>('details');

  // Form states
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('RECURRING_PROGRAMME');
  const [cadenceType, setCadenceType] = useState<ProjectCadenceType>('weekly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endRule, setEndRule] = useState<ProjectEndRule>('ongoing');
  const [scheduleTime, setScheduleTime] = useState('09:00 AM');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday']);
  const [autonomyMode, setAutonomyMode] = useState<'strict' | 'balanced' | 'autonomous'>('balanced');
  const [primaryApproverId, setPrimaryApproverId] = useState('');
  const [deliverablesInput, setDeliverablesInput] = useState('');

  // Notifications preferences (frontend state)
  const [notifyPreferences, setNotifyPreferences] = useState({
    approvalRequired: true,
    humanTaskAssigned: true,
    projectBlocked: true,
    connectionFails: true,
    runCompletes: true,
    leadQualifies: true,
    meetingBooked: true,
    projectCompletes: true
  });

  // End project confirmation dialog
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setObjective(project.objective);
      setProjectType(project.projectType || 'RECURRING_PROGRAMME');
      setCadenceType(project.cadenceType || 'weekly');
      setStartDate(project.startDate || project.createdAt?.split('T')[0] || '');
      setEndDate(project.endDate || project.dueAt?.split('T')[0] || '');
      setEndRule(project.endRule || (project.isOngoing ? 'no_end_date' : 'specific_date'));
      setScheduleTime(project.scheduleDetails?.timeOfDay || '09:00 AM');
      setSelectedDays(project.scheduleDetails?.daysOfWeek || ['Monday']);
      setPrimaryApproverId(project.humanApproverId || 'tm-1');
      setDeliverablesInput(project.deliverables?.join('\n') || '');
    }
  }, [project, isProjectSettingsOpen]);

  if (!isProjectSettingsOpen || !project) return null;

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(project.id, {
      title,
      objective,
      projectType,
      cadenceType,
      startDate,
      endDate: endRule === 'specific_date' ? endDate : undefined,
      endRule,
      isOngoing: endRule === 'no_end_date' || endRule === 'ongoing',
      humanApproverId: primaryApproverId,
      deliverables: deliverablesInput.split('\n').filter((d) => d.trim().length > 0),
      scheduleDetails: {
        ...project.scheduleDetails,
        timeOfDay: scheduleTime,
        daysOfWeek: selectedDays
      }
    });
    setIsProjectSettingsOpen(false);
  };

  const handlePause = () => {
    pauseProject(project.id);
  };

  const handleResume = () => {
    resumeProject(project.id);
  };

  const handleSkipNext = () => {
    skipNextRecurringRun(project.id);
  };

  const handleCancelFuture = () => {
    cancelFutureRuns(project.id);
  };

  const handleConfirmEnd = () => {
    endProject(project.id);
    setShowEndConfirm(false);
    setIsProjectSettingsOpen(false);
  };

  const handleConfirmArchive = () => {
    archiveProject(project.id);
    setShowArchiveConfirm(false);
    setIsProjectSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs shrink-0">
              <Settings className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">Project Settings & Lifecycle</h3>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  project.status === 'in_progress' ? 'bg-emerald-100 text-emerald-800' :
                  project.status === 'paused' ? 'bg-amber-100 text-amber-800' :
                  project.status === 'completed' ? 'bg-slate-200 text-slate-800' :
                  'bg-indigo-100 text-indigo-800'
                }`}>
                  {project.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500">{project.title}</p>
            </div>
          </div>
          <button
            onClick={() => setIsProjectSettingsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Safe Changes Notice Banner */}
        <div className="px-6 py-2 bg-blue-50/80 border-b border-blue-200/60 text-xs text-blue-900 flex items-center gap-2 shrink-0">
          <Info className="h-3.5 w-3.5 text-blue-600 shrink-0" />
          <span>
            <strong>Safe configuration:</strong> Changes apply to future runs. Completed work, past deliverables, and attribution history remain unchanged.
          </span>
        </div>

        {/* Modal Layout: Sidebar tabs (left) + Tab content (right) */}
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* Sidebar Nav */}
          <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 p-2 space-y-0.5 overflow-x-auto md:overflow-y-auto flex md:flex-col shrink-0">
            {[
              { id: 'details', label: 'Details & Scope', icon: FileCheck },
              { id: 'schedule', label: 'Schedule & Cadence', icon: Calendar },
              { id: 'team', label: 'Team & Roster', icon: Users },
              { id: 'governance', label: 'Governance & Rules', icon: ShieldCheck },
              { id: 'connections', label: 'Connections', icon: Radio },
              { id: 'outputs', label: 'Deliverables & Formats', icon: FileCheck },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'lifecycle', label: 'Lifecycle & Danger', icon: AlertTriangle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* TAB: DETAILS */}
            {activeTab === 'details' && (
              <form onSubmit={handleSaveDetails} className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Business Outcome / Goal</label>
                  <textarea
                    rows={3}
                    required
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1">Project Operating Type</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                    >
                      <option value="RECURRING_PROGRAMME">Recurring Programme (Weekly/Monthly cycles)</option>
                      <option value="ONE_TIME_INITIATIVE">One-Time Initiative (Fixed start and finish)</option>
                      <option value="FIXED_CAMPAIGN">Fixed Campaign (30-day, sprint)</option>
                      <option value="ONGOING_OPERATING_PROGRAMME">Ongoing Operating Programme (No end date)</option>
                      <option value="EVENT_DRIVEN_PROGRAMME">Event-Driven Programme (Triggered on leads/orders)</option>
                      <option value="MULTI_PHASE_INITIATIVE">Multi-Phase Initiative (Stage review transitions)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1">Primary Approver</label>
                    <select
                      value={primaryApproverId}
                      onChange={(e) => setPrimaryApproverId(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                    >
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            )}

            {/* TAB: SCHEDULE */}
            {activeTab === 'schedule' && (
              <div className="space-y-5 max-w-2xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Cadence & Timing</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'weekly', label: 'Weekly Cadence', desc: 'Runs every week' },
                      { id: 'daily', label: 'Daily Cadence', desc: 'Every business day' },
                      { id: 'monthly', label: 'Monthly Cadence', desc: 'Once a month' },
                      { id: 'event_driven', label: 'Event-Driven', desc: 'On lead or order event' },
                      { id: 'one_time', label: 'One-Time Project', desc: 'Single run' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCadenceType(c.id as any)}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                          cadenceType === c.id
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-semibold">{c.label}</div>
                        <div className={`text-[10px] mt-0.5 ${cadenceType === c.id ? 'text-slate-300' : 'text-slate-400'}`}>
                          {c.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next Run & Cycle Details */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Next Scheduled Run:</span>
                    <span className="font-mono text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">
                      {project.scheduleDetails?.nextRunDate ? new Date(project.scheduleDetails.nextRunDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Next Tuesday · 09:00 AM EST'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Last Completed Run:</span>
                    <span className="text-slate-600">
                      {project.scheduleDetails?.lastRunDate ? new Date(project.scheduleDetails.lastRunDate).toLocaleDateString() : '6 Oct 2026'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Completed Occurrences:</span>
                    <span className="text-slate-900 font-semibold">
                      {project.scheduleDetails?.occurrencesCompleted || project.runHistory?.length || 3} runs completed
                    </span>
                  </div>

                  {/* Operational controls */}
                  <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSkipNext}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <SkipForward className="h-3.5 w-3.5 text-slate-600" />
                      <span>Skip Next Run</span>
                    </button>
                    {project.status === 'paused' ? (
                      <button
                        type="button"
                        onClick={handleResume}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="h-3.5 w-3.5" />
                        <span>Resume Schedule</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePause}
                        className="px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Pause className="h-3.5 w-3.5 text-amber-700" />
                        <span>Pause Schedule</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1">Time of Day</label>
                    <input
                      type="text"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1">Workspace Timezone</label>
                    <div className="text-xs p-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-600">
                      {settings.timezone}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TEAM */}
            {activeTab === 'team' && (
              <div className="space-y-5 max-w-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Team Roster</h4>
                    <p className="text-xs text-slate-500">Specialists and human teammates authorized to execute or review work.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProjectSettingsOpen(false);
                      openAddTeammateModal(project.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>+ Add Teammate</span>
                  </button>
                </div>

                {/* AI Roster */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-600">Assigned AI Specialists</span>
                  <div className="space-y-1.5">
                    {project.participatingEmployeeIds.map((empId) => {
                      const emp = employees.find((e) => e.id === empId);
                      if (!emp) return null;
                      const roleDesc = project.employeeResponsibilities?.[emp.id] || 'Deliver assigned workflow stage';
                      return (
                        <div key={emp.id} className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`h-8 w-8 rounded-lg ${emp.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                              {emp.code}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-slate-900">{emp.name}</div>
                              <div className="text-[11px] text-slate-500 truncate">{roleDesc}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded shrink-0">
                            AI Specialist
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Human Collaborators */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-600">Human Teammates</span>
                  <div className="space-y-1.5">
                    {(project.collaborators || []).length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No additional human teammates assigned. Operator has primary governance.</p>
                    ) : (
                      project.collaborators?.map((collab) => (
                        <div key={collab.teamMemberId} className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-900">{collab.name}</div>
                            <div className="text-[11px] text-slate-500">{collab.email}</div>
                          </div>
                          <span className="text-[10px] font-medium bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded shrink-0">
                            {collab.role}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: GOVERNANCE */}
            {activeTab === 'governance' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Autonomy Level</h4>
                  <p className="text-xs text-slate-500 mb-3">Controls how freely AI specialists can complete and publish project work.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'strict', label: 'Strict Mode', desc: 'Confirm every single task and deliverable.' },
                      { id: 'balanced', label: 'Balanced Mode', desc: 'Auto-draft routine tasks; confirm public and budget actions.' },
                      { id: 'autonomous', label: 'Autonomous Mode', desc: 'Full automated execution within approved brand bounds.' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setAutonomyMode(mode.id as any)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                          autonomyMode === mode.id
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs">{mode.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-xs font-semibold text-slate-800">Mandatory Review Gates for this Project:</div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Public social media broadcasts and blog publishing.</li>
                    <li>Live website landing page deployment and version rollback.</li>
                    <li>Any outbound email or SMS sequences sent to corporate contacts.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB: CONNECTIONS */}
            {activeTab === 'connections' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Required Channels</h4>
                  <p className="text-xs text-slate-500 mb-3">Channels and APIs required for autonomous execution.</p>
                </div>

                <div className="space-y-2">
                  {(project.requiredConnections || []).length === 0 ? (
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 italic border border-slate-200">
                      No external channels strictly required. Work executes internally.
                    </div>
                  ) : (
                    project.requiredConnections?.map((rc, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-slate-900">{rc.label}</div>
                          <div className="text-[11px] text-slate-500">Provider: {rc.provider}</div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${rc.ready ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {rc.ready ? 'Connected' : 'Missing'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB: OUTPUTS */}
            {activeTab === 'outputs' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Expected Deliverables</h4>
                  <p className="text-xs text-slate-500 mb-3">Specify deliverables produced per run or milestone.</p>
                  <textarea
                    rows={4}
                    value={deliverablesInput}
                    onChange={(e) => setDeliverablesInput(e.target.value)}
                    placeholder="1 LinkedIn Post per week&#10;1 Visual Graphic slide&#10;1 Weekly analytics summary"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">One deliverable per line.</p>
                </div>
              </div>
            )}

            {/* TAB: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Notification Preferences</h4>
                  <p className="text-xs text-slate-500 mb-3">Select which project events trigger Inbox and Needs You alerts.</p>
                </div>

                <div className="space-y-2">
                  {[
                    { key: 'approvalRequired', label: 'Deliverable awaits human approval signoff' },
                    { key: 'humanTaskAssigned', label: 'Human task assigned to workspace operator' },
                    { key: 'projectBlocked', label: 'Stage blocked by missing connection or invalid parameter' },
                    { key: 'connectionFails', label: 'Channel integration handshake latency or token warning' },
                    { key: 'runCompletes', label: 'Recurring run completes new batch of deliverables' },
                    { key: 'leadQualifies', label: 'New high-fit prospect qualifies in downstream funnel' },
                    { key: 'meetingBooked', label: 'Sales discovery meeting scheduled on executive calendar' },
                    { key: 'projectCompletes', label: 'Project reaches final completion milestone' }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(notifyPreferences as any)[item.key]}
                        onChange={(e) =>
                          setNotifyPreferences((prev) => ({
                            ...prev,
                            [item.key]: e.target.checked
                          }))
                        }
                        className="rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
                      />
                      <span className="text-xs text-slate-800">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: LIFECYCLE & DANGER */}
            {activeTab === 'lifecycle' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Project Lifecycle Controls</h4>
                  <p className="text-xs text-slate-500">Safely pause, end, or archive this initiative without losing completed work.</p>
                </div>

                {/* Pause / Resume */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {project.status === 'paused' ? 'Resume Project Execution' : 'Pause Project Execution'}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {project.status === 'paused'
                        ? 'Resumes automated dispatches and stage advancement.'
                        : 'Halts future local execution while leaving history, outputs, and results intact.'}
                    </p>
                  </div>
                  {project.status === 'paused' ? (
                    <button
                      type="button"
                      onClick={handleResume}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                    >
                      Resume
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePause}
                      className="px-3.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                    >
                      Pause
                    </button>
                  )}
                </div>

                {/* Cancel Future Runs */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Cancel Future Recurring Runs</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Permanently cancels upcoming automated occurrences. Does not delete any past runs or deliverables.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelFuture}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                  >
                    Cancel Future Runs
                  </button>
                </div>

                {/* End Project */}
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-rose-950">End Project Permanently</div>
                    <p className="text-[11px] text-rose-800 mt-0.5">
                      Stops future scheduled work permanently. Completed work, outputs, activity, and attributed results remain fully readable.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEndConfirm(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                  >
                    End Project
                  </button>
                </div>

                {/* Archive Project */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Archive Project</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Hides project from active workspace views. Preserved in workspace archives.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowArchiveConfirm(true)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                  >
                    Archive
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal: End Project */}
        {showEndConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xs animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-xl p-5 shadow-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Confirm End Project</span>
              </div>
              <p className="text-xs text-slate-600">
                Future scheduled runs for <strong>"{project.title}"</strong> will be cancelled permanently. All completed runs, outputs, and results will remain intact.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEndConfirm(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmEnd}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
                >
                  Yes, End Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal: Archive Project */}
        {showArchiveConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xs animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-xl p-5 shadow-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Archive className="h-4 w-4 text-slate-700" />
                <span>Archive Project</span>
              </div>
              <p className="text-xs text-slate-600">
                Archive <strong>"{project.title}"</strong>? It will be removed from your active board and stored in your workspace archives.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowArchiveConfirm(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmArchive}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                >
                  Archive Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
