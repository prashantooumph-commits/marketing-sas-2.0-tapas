import React, { useState, useEffect } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  Zap,
  Repeat,
  ShieldCheck,
  FolderPlus,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Layers,
  FileText
} from 'lucide-react';
import {
  AutomationCadenceType,
  AutomationTriggerEvent,
  TaskType
} from '../../types';

export const AssignmentComposerModal: React.FC = () => {
  const {
    isAssignmentComposerOpen,
    closeAssignmentComposer,
    assignmentComposerTargetEmployeeId,
    assignmentComposerInitialTask,
    assignmentComposerTargetProjectId,
    employees,
    projects,
    activeWorkspaceId,
    createProjectTask,
    createRecurringAutomation,
    createProject,
    settings,
    navigate
  } = useOoumph();

  const employee = employees.find((e) => e.id === assignmentComposerTargetEmployeeId);

  // Form state
  const [taskTitle, setTaskTitle] = useState('');
  const [timingMode, setTimingMode] = useState<
    'once_now' | 'once_later' | 'daily' | 'weekdays' | 'weekly' | 'monthly' | 'event_driven'
  >('once_now');
  const [scheduleDate, setScheduleDate] = useState('2026-10-15');
  const [scheduleTime, setScheduleTime] = useState('09:00 AM');
  const [weeklyDay, setWeeklyDay] = useState('Monday');
  const [monthlyRule, setMonthlyRule] = useState('First Monday of Month');
  const [triggerEvent, setTriggerEvent] = useState<AutomationTriggerEvent>('new_lead');
  const [howLongRule, setHowLongRule] = useState<'one_occurrence' | 'until_date' | 'occurrences_count' | 'ongoing_until_stopped'>('ongoing_until_stopped');
  const [untilDate, setUntilDate] = useState('2026-12-31');
  const [maxOccurrences, setMaxOccurrences] = useState(12);

  const [attachMode, setAttachMode] = useState<'none' | 'existing_project' | 'new_project'>('none');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectGoal, setNewProjectGoal] = useState('');

  const [expectedOutput, setExpectedOutput] = useState('');
  const [outputFormat, setOutputFormat] = useState('Document');
  const [approvalBehavior, setApprovalBehavior] = useState<'none' | 'review_before_completion' | 'review_before_external'>('review_before_external');

  // Pre-fill when opened
  useEffect(() => {
    if (isAssignmentComposerOpen) {
      setTaskTitle(assignmentComposerInitialTask || '');
      if (assignmentComposerTargetProjectId) {
        setAttachMode('existing_project');
        setSelectedProjectId(assignmentComposerTargetProjectId);
      } else {
        const workspaceProjects = projects.filter((p) => p.workspaceId === activeWorkspaceId);
        if (workspaceProjects.length > 0) {
          setSelectedProjectId(workspaceProjects[0].id);
        }
      }

      // Default expected output based on employee code
      if (employee) {
        if (employee.code === 'A01') setExpectedOutput('Daily briefing notes + calendar defense agenda');
        else if (employee.code === 'A02') setExpectedOutput('1 LinkedIn thought leadership post + 1 visual slide');
        else if (employee.code === 'A03') setExpectedOutput('1,800-word comprehensive SEO article');
        else if (employee.code === 'A04') setExpectedOutput('25 enriched ICP corporate leads with verified emails');
        else if (employee.code === 'A06') setExpectedOutput('Audited commercial contract with legal redlines');
        else if (employee.code === 'A07') setExpectedOutput('Responsive landing page draft with live lead capture');
        else if (employee.code === 'A10') setExpectedOutput('3-part personalized email and WhatsApp nurture sequence');
        else if (employee.code === 'A12') setExpectedOutput('3 conversion copy angles for value proposition testing');
        else if (employee.code === 'A16') setExpectedOutput('3-touch outbound cold outreach cadence');
        else if (employee.code === 'A17') setExpectedOutput('Speed-to-lead qualification record + calendar booking slot');
        else if (employee.code === 'A19') setExpectedOutput('Brand-calibrated visual graphic cards in 1:1 and 9:16 formats');
        else if (employee.code === 'A20') setExpectedOutput('Video script scenes + interactive storyboard preview');
        else if (employee.code === 'A24') setExpectedOutput('Meta ad campaign copy variations + $50/day budget cap setup');
        else if (employee.code === 'A31') setExpectedOutput('Commercial scope quotation + legal fee schedule');
        else setExpectedOutput('Verified deliverable aligned with brand parameters');
      }
    }
  }, [isAssignmentComposerOpen, assignmentComposerInitialTask, assignmentComposerTargetProjectId, employee]);

  if (!isAssignmentComposerOpen || !employee) return null;

  const isRecurring = ['daily', 'weekdays', 'weekly', 'monthly', 'event_driven'].includes(timingMode);

  // Intelligent recommendation to create a project if recurring or multi-step
  const shouldRecommendProject = isRecurring && attachMode === 'none';

  const workspaceProjects = projects.filter((p) => p.workspaceId === activeWorkspaceId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = taskTitle.trim() || `Task for ${employee.name}`;
    let targetProjId: string | undefined = undefined;

    // Handle project attachment
    if (attachMode === 'existing_project' && selectedProjectId) {
      targetProjId = selectedProjectId;
    } else if (attachMode === 'new_project' && newProjectName.trim()) {
      targetProjId = createProject({
        workspaceId: activeWorkspaceId,
        title: newProjectName.trim(),
        objective: newProjectGoal.trim() || finalTitle,
        status: 'in_progress',
        projectType: isRecurring ? 'RECURRING_PROGRAMME' : 'ONE_TIME_INITIATIVE',
        cadenceType: isRecurring ? (timingMode === 'weekly' ? 'weekly' : 'daily') : 'one_time',
        participatingEmployeeIds: [employee.id],
        deliverables: [expectedOutput || 'Core Deliverable Package']
      });
    }

    if (isRecurring) {
      // Create Recurring Automation / Routine
      const cadenceMap: Record<string, AutomationCadenceType> = {
        daily: 'daily',
        weekdays: 'weekdays',
        weekly: 'weekly',
        monthly: 'monthly',
        event_driven: 'event_driven'
      };

      createRecurringAutomation({
        workspaceId: activeWorkspaceId,
        projectId: targetProjId,
        employeeId: employee.id,
        title: finalTitle,
        description: `Autonomous assignment executed by ${employee.name} (${employee.code}).`,
        cadenceType: cadenceMap[timingMode] || 'weekly',
        scheduleDetails: {
          daysOfWeek: timingMode === 'weekly' ? [weeklyDay] : timingMode === 'weekdays' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : undefined,
          timeOfDay: scheduleTime,
          timezone: settings.timezone,
          monthlyRule: timingMode === 'monthly' ? monthlyRule : undefined,
          triggerEvent: timingMode === 'event_driven' ? triggerEvent : undefined,
          triggerSummary: timingMode === 'event_driven' ? `Triggered on event "${triggerEvent}"` : undefined
        },
        startDate: new Date().toISOString(),
        endDate: howLongRule === 'until_date' ? untilDate : undefined,
        endRule: howLongRule === 'until_date' ? 'until_date' : howLongRule === 'occurrences_count' ? 'max_occurrences' : 'ongoing',
        occurrenceLimit: howLongRule === 'occurrences_count' ? maxOccurrences : undefined,
        nextRunDate: timingMode === 'event_driven' ? undefined : new Date(Date.now() + 86400000).toISOString(),
        status: 'active',
        approvalBehavior,
        expectedOutput: expectedOutput.trim() || 'Verified deliverable',
        outputFormat
      });
    } else {
      // Create Standalone or Project Task
      const taskType: TaskType = timingMode === 'once_later' ? 'scheduled_one_time' : targetProjId ? 'project_step' : 'one_time';
      createProjectTask({
        workspaceId: activeWorkspaceId,
        projectId: targetProjId,
        title: finalTitle,
        employeeId: employee.id,
        employeeName: employee.name,
        employeeCode: employee.code,
        status: timingMode === 'once_later' ? 'scheduled' : 'in_progress',
        taskType,
        category: employee.category,
        description: `Direct task delegated to ${employee.name}. ${expectedOutput ? `Expected output: ${expectedOutput}.` : ''}`,
        expectedOutput: expectedOutput.trim() || 'Completed deliverable',
        outputFormat,
        scheduledFor: timingMode === 'once_later' ? `${scheduleDate} at ${scheduleTime}` : undefined,
        cadence: timingMode === 'once_later' ? `Scheduled for ${scheduleDate}` : 'One-time immediate',
        needsApproval: approvalBehavior !== 'none',
        approvalMode: approvalBehavior,
        outputData: {
          assignedBy: 'Human Operator',
          format: outputFormat,
          initialInstructions: finalTitle
        }
      });
    }

    closeAssignmentComposer();
    navigate('work');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl ${employee.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}>
              {employee.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">Assign Work to {employee.name}</h3>
                <span className="text-[11px] font-medium bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                  {employee.title}
                </span>
              </div>
              <p className="text-xs text-slate-500">Configure plain-language instructions, schedule cadence, output contracts, and governance.</p>
            </div>
          </div>
          <button
            onClick={closeAssignmentComposer}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: What should this employee do? */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>1. What should {employee.name} do?</span>
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder={`e.g. Create and publish our weekly founder insight post highlighting customer delegation wins...`}
              className="w-full text-xs text-slate-900 placeholder-slate-400 p-3 rounded-xl border border-slate-200 focus:border-slate-800 focus:outline-hidden resize-none bg-white shadow-2xs"
            />
            {/* Starter prompt pills */}
            {employee.starterPrompts.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5 text-indigo-500" />
                  Quick prompts:
                </span>
                {employee.starterPrompts.slice(0, 2).map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTaskTitle(prompt)}
                    className="text-[11px] text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors text-left truncate max-w-[280px] cursor-pointer"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: When? (Cadence) */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>2. When?</span>
              <span className="text-[11px] font-normal text-slate-500 lowercase">
                Timezone: {settings.timezone}
              </span>
            </label>
            
            {/* Timing options grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'once_now', label: 'Once now', desc: 'Immediate run' },
                { id: 'once_later', label: 'Once later', desc: 'Scheduled date' },
                { id: 'daily', label: 'Daily', desc: 'Every day' },
                { id: 'weekdays', label: 'Weekdays', desc: 'Mon – Fri' },
                { id: 'weekly', label: 'Weekly', desc: 'Recurring week' },
                { id: 'monthly', label: 'Monthly', desc: 'Recurring month' },
                { id: 'event_driven', label: 'On event', desc: 'When triggered' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTimingMode(opt.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    timingMode === opt.id
                      ? 'border-slate-950 bg-slate-950 text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="text-xs font-semibold">{opt.label}</div>
                  <div className={`text-[10px] mt-0.5 ${timingMode === opt.id ? 'text-slate-300' : 'text-slate-400'}`}>
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>

            {/* Sub-controls based on timing */}
            {timingMode === 'once_later' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Time</label>
                  <select
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>
            )}

            {timingMode === 'weekly' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Repeat Every</label>
                  <select
                    value={weeklyDay}
                    onChange={(e) => setWeeklyDay(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                      <option key={d} value={d}>Every {d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Time of Day</label>
                  <select
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>
            )}

            {timingMode === 'monthly' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Monthly Schedule</label>
                  <select
                    value={monthlyRule}
                    onChange={(e) => setMonthlyRule(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="First Monday of Month">First Monday of month</option>
                    <option value="1st of Every Month">1st of every month</option>
                    <option value="15th of Every Month">15th of every month</option>
                    <option value="Last Friday of Month">Last Friday of month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Time of Day</label>
                  <select
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                  </select>
                </div>
              </div>
            )}

            {timingMode === 'event_driven' && (
              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 space-y-2 animate-fade-in">
                <label className="block text-[11px] font-bold text-indigo-900">Trigger Event (Local simulation)</label>
                <select
                  value={triggerEvent}
                  onChange={(e) => setTriggerEvent(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-indigo-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                >
                  <option value="new_lead">New qualified lead captured</option>
                  <option value="new_form_submission">New contact form submitted</option>
                  <option value="social_keyword_comment">Social comment matching keyword (e.g. "GROW")</option>
                  <option value="new_inbound_message">Inbound phone call / voicemail transcript</option>
                  <option value="new_order">Course / catalog seat order created</option>
                  <option value="deal_stage_change">Sales deal advanced in pipeline</option>
                  <option value="previous_workflow_completion">Previous workflow milestone completed</option>
                </select>
                <div className="text-[10px] text-indigo-700 flex items-center gap-1">
                  <Info className="h-3 w-3 shrink-0" />
                  <span>Runs automatically whenever this event is simulated in the workspace.</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: How long? (For recurring work) */}
          {isRecurring && (
            <div className="space-y-2 pt-2 border-t border-slate-100 animate-fade-in">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                3. How long should this routine run?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'ongoing_until_stopped', label: 'Keep running until I stop it', desc: 'Continuous routine' },
                  { id: 'until_date', label: 'Until a specific date', desc: 'Ends on scheduled day' },
                  { id: 'occurrences_count', label: 'For N occurrences', desc: 'Stops after cycle limit' }
                ].map((rule) => (
                  <button
                    key={rule.id}
                    type="button"
                    onClick={() => setHowLongRule(rule.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      howLongRule === rule.id
                        ? 'border-slate-900 bg-slate-50 text-slate-950 font-semibold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs">{rule.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{rule.desc}</div>
                  </button>
                ))}
              </div>

              {howLongRule === 'until_date' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-xs">
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Stop After Date</label>
                  <input
                    type="date"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden"
                  />
                </div>
              )}

              {howLongRule === 'occurrences_count' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-xs">
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Occurrence Limit</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={maxOccurrences}
                    onChange={(e) => setMaxOccurrences(parseInt(e.target.value) || 1)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden"
                  />
                </div>
              )}
            </div>
          )}

          {/* Section 4: Attach to Project */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              {isRecurring ? '4. Attach to Project' : '3. Attach to Project'}
            </label>

            {/* Smart Project Recommendation callout */}
            {shouldRecommendProject && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-amber-950">Project Recommended</div>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    This is an ongoing recurring routine. Attaching it to a Project allows you to track outputs, team handoffs, and business outcomes in one command center.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAttachMode('new_project')}
                      className="px-2.5 py-1 rounded bg-amber-900 text-white font-medium text-[11px] hover:bg-black transition-colors cursor-pointer"
                    >
                      Create Project for this Routine
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttachMode('none')}
                      className="px-2.5 py-1 rounded border border-amber-300 text-amber-900 font-medium text-[11px] hover:bg-amber-100/60 transition-colors cursor-pointer"
                    >
                      Keep as Standalone Routine
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAttachMode('none')}
                className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  attachMode === 'none'
                    ? 'border-slate-900 bg-slate-50 text-slate-950 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs">No Project</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Standalone {isRecurring ? 'routine' : 'task'}</div>
              </button>

              <button
                type="button"
                onClick={() => setAttachMode('existing_project')}
                className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  attachMode === 'existing_project'
                    ? 'border-slate-900 bg-slate-50 text-slate-950 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs">Existing Project</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Attach to running initiative</div>
              </button>

              <button
                type="button"
                onClick={() => setAttachMode('new_project')}
                className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  attachMode === 'new_project'
                    ? 'border-slate-900 bg-slate-50 text-slate-950 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs">Create New Project</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Brand new initiative container</div>
              </button>
            </div>

            {attachMode === 'existing_project' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Select Project</label>
                {workspaceProjects.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No existing projects in this workspace.</p>
                ) : (
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer"
                  >
                    {workspaceProjects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.status.replace('_', ' ')})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {attachMode === 'new_project' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 animate-fade-in">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g. Q4 Thought Leadership Engine"
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Business Outcome / Goal</label>
                  <input
                    type="text"
                    value={newProjectGoal}
                    onChange={(e) => setNewProjectGoal(e.target.value)}
                    placeholder="e.g. Establish executive authority and drive 50 qualified inbound leads"
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Expected Output & Acceptance Criteria */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              {isRecurring ? '5. Expected Output' : '4. Expected Output'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Deliverable Description
                </label>
                <input
                  type="text"
                  required
                  value={expectedOutput}
                  onChange={(e) => setExpectedOutput(e.target.value)}
                  placeholder="e.g. 3 LinkedIn posts, 1 visual graphic, 1 landing page draft"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden shadow-2xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Primary Format</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden cursor-pointer shadow-2xs"
                >
                  <option value="Social Post">Social Post</option>
                  <option value="Document">Document</option>
                  <option value="Graphic">Graphic</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Email Sequence">Email Sequence</option>
                  <option value="CRM Update">CRM Update</option>
                  <option value="Report">Report</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 6: Governance & Approval Gate */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              {isRecurring ? '6. Approval Requirement' : '5. Approval Requirement'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'none', label: 'No approval needed', desc: 'Autonomous execution' },
                { id: 'review_before_completion', label: 'Review before completion', desc: 'Check output before signoff' },
                { id: 'review_before_external', label: 'Review external actions', desc: 'Guard public posts & budget' }
              ].map((appr) => (
                <button
                  key={appr.id}
                  type="button"
                  onClick={() => setApprovalBehavior(appr.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    approvalBehavior === appr.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs flex items-center gap-1.5">
                    {approvalBehavior === appr.id && <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />}
                    <span>{appr.label}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{appr.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Honest Demo Simulation Banner */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong>Local simulation:</strong> Scheduled demo work advances while using this demo and through Demo Tools. It does not continue when the browser is closed.
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={closeAssignmentComposer}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-950 text-white hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>{isRecurring ? 'Activate Routine' : 'Assign Task'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
