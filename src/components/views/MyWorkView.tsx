import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { TaskStatus, Project, WorkflowRun } from '../../types';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  DollarSign,
  Share2,
  Layers,
  Play,
  Check,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Plus,
  Users
} from 'lucide-react';

export const MyWorkView: React.FC = () => {
  const {
    activeWorkspace,
    tasks,
    workTab,
    setWorkTab,
    selectEmployee,
    employees,
    flagshipCampaign,
    deals,
    leads,
    websitePage,
    projects,
    workflowRuns,
    workflowTemplates,
    advanceWorkflowStep,
    startWorkflowFromTemplate,
    activityEvents,
    navigate
  } = useOoumph();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-1');

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Workspace-scoped projects & runs
  const wsProjects = projects.filter((p) => p.workspaceId === activeWorkspace.id);
  const currentProject = wsProjects.find((p) => p.id === selectedProjectId) || wsProjects[0];
  const currentWorkflowRun = workflowRuns.find((r) => r.id === currentProject?.workflowRunId);
  const projectActivities = activityEvents.filter((a) => a.projectId === currentProject?.id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header and Sub-tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">My Work</h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {activeWorkspace.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified view of multi-agent initiatives, workflow runs, tasks, calendar schedules, and commercial results.
          </p>
        </div>

        {/* Sub-tab segment switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 overflow-x-auto">
          {[
            { id: 'projects', label: 'Shared Projects', badge: wsProjects.length },
            { id: 'workflows', label: 'Multi-Agent Workflows', badge: workflowTemplates.length },
            { id: 'tasks', label: 'Individual Tasks', badge: tasks.length },
            { id: 'calendar', label: 'Calendar' },
            { id: 'campaigns', label: 'Campaigns' },
            { id: 'assets', label: 'Assets & Drafts' },
            { id: 'results', label: 'Results' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setWorkTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                workTab === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  workTab === tab.id ? 'bg-slate-200 text-slate-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB 0: SHARED PROJECTS */}
      {workTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project List Sidebar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Active Initiatives</h2>
              <button
                onClick={() => setWorkTab('workflows')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>Launch Template</span>
              </button>
            </div>

            <div className="space-y-2">
              {wsProjects.map((proj) => {
                const isSelected = proj.id === currentProject?.id;
                const run = workflowRuns.find((r) => r.id === proj.workflowRunId);
                const completedSteps = run ? run.steps.filter(s => s.status === 'completed').length : 0;
                const totalSteps = run ? run.steps.length : 0;

                return (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`rounded-xl p-4 border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-white shadow-xs'
                        : 'border-slate-200 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-xs text-slate-900 leading-snug">{proj.title}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-teal-50 text-teal-800 border border-teal-200 whitespace-nowrap">
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{proj.objective}</p>

                    {run && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Progress: {completedSteps}/{totalSteps} steps</span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Details & Stepper */}
          {currentProject && (
            <div className="lg:col-span-2 space-y-6">
              {/* Project Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">{currentProject.title}</h2>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                        {currentProject.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{currentProject.objective}</p>
                  </div>
                </div>

                {/* Participating Specialists Bar */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Coordinated Specialists
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {currentProject.participatingEmployeeIds.map((empId) => {
                      const emp = employees.find((e) => e.id === empId);
                      if (!emp) return null;
                      return (
                        <button
                          key={emp.id}
                          onClick={() => selectEmployee(emp.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 text-xs text-slate-800 transition-colors"
                        >
                          <span className={`h-4 w-4 rounded-full ${emp.avatarColor} text-white font-bold text-[9px] flex items-center justify-center`}>
                            {emp.code}
                          </span>
                          <span className="font-semibold">{emp.name}</span>
                          <span className="text-[10px] text-slate-400">({emp.title})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Workflow Stepper */}
              {currentWorkflowRun && (
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">Multi-Agent Execution Timeline</h3>
                      <p className="text-xs text-slate-500">Run: {currentWorkflowRun.templateName}</p>
                    </div>

                    <span className="text-xs text-slate-500">
                      Step {currentWorkflowRun.currentStepIndex + 1} of {currentWorkflowRun.steps.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentWorkflowRun.steps.map((step, idx) => {
                      const isCompleted = step.status === 'completed';
                      const isInProgress = step.status === 'in_progress';
                      const isWaitingApproval = step.status === 'waiting_approval';
                      const assignedEmp = step.employeeId ? employees.find((e) => e.id === step.employeeId) : null;

                      return (
                        <div
                          key={step.id}
                          className={`rounded-xl border p-4 transition-all ${
                            isCompleted
                              ? 'border-slate-200 bg-slate-50/50 text-slate-700'
                              : isInProgress
                              ? 'border-teal-500 bg-teal-50/30 text-slate-900 shadow-2xs ring-1 ring-teal-500/20'
                              : isWaitingApproval
                              ? 'border-amber-400 bg-amber-50/40 text-slate-900'
                              : 'border-slate-200 bg-white text-slate-500'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              {/* Step State Icon */}
                              <div className="pt-0.5">
                                {isCompleted ? (
                                  <div className="h-5 w-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                                    <Check className="h-3 w-3 stroke-[3]" />
                                  </div>
                                ) : isInProgress ? (
                                  <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-800 border border-teal-300 flex items-center justify-center font-bold text-xs">
                                    {idx + 1}
                                  </div>
                                ) : isWaitingApproval ? (
                                  <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center font-bold text-xs">
                                    !
                                  </div>
                                ) : (
                                  <div className="h-5 w-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs">
                                    {idx + 1}
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-xs text-slate-900">{step.title}</h4>
                                  {step.type === 'human_approval' && (
                                    <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded border border-amber-200">
                                      Human Review
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600">{step.description}</p>

                                {assignedEmp && (
                                  <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-500">
                                    <span>Assigned Specialist:</span>
                                    <button
                                      onClick={() => selectEmployee(assignedEmp.id)}
                                      className="font-medium text-slate-800 hover:text-slate-900 hover:underline flex items-center gap-1"
                                    >
                                      <span className={`h-3.5 w-3.5 rounded-full ${assignedEmp.avatarColor} text-white font-bold text-[8px] flex items-center justify-center`}>
                                        {assignedEmp.code}
                                      </span>
                                      <span>{assignedEmp.name}</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Step Controls */}
                            <div className="flex items-center gap-2">
                              {isInProgress && (
                                <button
                                  onClick={() => advanceWorkflowStep(currentWorkflowRun.id, step.id)}
                                  className="flex items-center gap-1 rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800 transition-colors shadow-2xs"
                                >
                                  <Play className="h-3 w-3 fill-current" />
                                  <span>Simulate Completion</span>
                                </button>
                              )}

                              {isWaitingApproval && (
                                <button
                                  onClick={() => navigate('inbox')}
                                  className="flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors shadow-2xs"
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                  <span>Review in Inbox</span>
                                </button>
                              )}

                              {isCompleted && (
                                <span className="text-xs font-medium text-teal-700 flex items-center gap-1">
                                  <Check className="h-3.5 w-3.5" />
                                  <span>Finished</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Activity Timeline */}
              {projectActivities.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
                  <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Recent Collaborative Activity
                  </h3>
                  <div className="divide-y divide-slate-100 text-xs">
                    {projectActivities.map((act) => (
                      <div key={act.id} className="py-2.5 flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-slate-900">
                            {act.actorName} · <span className="text-slate-600 font-normal">{act.action}</span>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-0.5">{act.details}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 1: MULTI-AGENT WORKFLOW TEMPLATES */}
      {workTab === 'workflows' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Reusable Multi-Agent Workflows</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Coordinated cross-employee recipes connecting marketing, social generation, copywriting, legal sign-off, and CRM deal sync.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflowTemplates.map((template) => (
              <div
                key={template.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                      {template.category}
                    </span>
                    <span className="text-xs text-slate-400">Duration: {template.typicalDuration}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{template.name}</h3>
                  <p className="text-xs text-slate-600">{template.shortDescription}</p>

                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Specialist Chain
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {template.participatingEmployeeIds.map((empId) => {
                        const emp = employees.find((e) => e.id === empId);
                        if (!emp) return null;
                        return (
                          <span
                            key={emp.id}
                            className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                          >
                            <span className={`h-3 w-3 rounded-full ${emp.avatarColor} text-white font-bold text-[7px] flex items-center justify-center`}>
                              {emp.code}
                            </span>
                            <span>{emp.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Target Outcome
                    </div>
                    <p className="text-xs text-teal-800 bg-teal-50 p-2.5 rounded-lg border border-teal-200">
                      {template.outcome}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{template.expectedSteps.length} structured steps</span>
                  <button
                    onClick={() => {
                      const newRunId = startWorkflowFromTemplate(template.id);
                      setWorkTab('projects');
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Launch Workflow</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 1: TASKS */}
      {workTab === 'tasks' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks by title, role..."
                className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-800 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="needs_review">Needs Review</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>

          {/* Task Cards */}
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No tasks match current filters.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => selectEmployee(task.employeeId)}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900">{task.title}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          task.status === 'needs_review'
                            ? 'bg-amber-100 text-amber-800'
                            : task.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{task.description}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>Owner: <strong className="text-slate-700">{task.employeeName}</strong> ({task.employeeCode})</span>
                      <span>·</span>
                      <span>Category: {task.category}</span>
                      <span>·</span>
                      <span className="tabular-nums">v{task.version}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <span>Inspect</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CALENDAR */}
      {workTab === 'calendar' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Unified Executive & Social Schedule</h2>
            <span className="text-xs text-slate-500">Timezone: America/Los_Angeles (PST)</span>
          </div>

          <div className="space-y-3">
            {[
              {
                time: 'Today · 10:00 AM PST',
                title: 'Discovery Strategy Call with David Kalu (Vanguard Retail)',
                type: 'Meeting',
                owner: 'Aria Vance (A01)',
                tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
              },
              {
                time: 'Tomorrow · 09:15 AM PST',
                title: 'LinkedIn Thought Leadership: "Founder Delegation Framework"',
                type: 'Social Post',
                owner: 'Soren Miller (A02)',
                tagColor: 'bg-sky-50 text-sky-700 border-sky-200'
              },
              {
                time: 'Thursday · 02:00 PM PST',
                title: 'Executive Fellowship Cohort Kickoff Session (24 Fellows)',
                type: 'Live Session',
                owner: 'Sloane Kelly (A30)',
                tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }
            ].map((ev, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-slate-900">{ev.title}</div>
                  <div className="text-[11px] text-slate-500">{ev.time} · Coordinated by {ev.owner}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${ev.tagColor}`}>
                  {ev.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CAMPAIGNS */}
      {workTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{flagshipCampaign.title}</h3>
                <p className="text-xs text-slate-500">Flagship Lead Engine · Platform: {flagshipCampaign.platform}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Active Loop
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 my-4">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Comments Scanned</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.scannedComments}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">PDFs Sent</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.resourcesDelivered}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Opt-in Leads</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.optedInLeads}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Booked Meetings</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.meetingsBooked}</div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  const emp = employees.find((e) => e.code === 'A23');
                  if (emp) selectEmployee(emp.id);
                }}
                className="text-xs font-semibold text-teal-800 hover:underline flex items-center gap-1"
              >
                Inspect Astrid Lind's Campaign Workspace →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ASSETS & DRAFTS */}
      {workTab === 'assets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Executive PDF Resource</h3>
            <p className="text-xs text-slate-500 mb-3">{flagshipCampaign.resourceTitle}</p>
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
              Genuine 24-page PDF document format covering delegation rhythms and inbound lead systems.
            </div>
            <button
              onClick={() => {
                const emp = employees.find((e) => e.code === 'A23');
                if (emp) selectEmployee(emp.id);
              }}
              className="text-xs font-semibold text-indigo-700 hover:underline"
            >
              Open in Astrid's Workspace →
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Landing Page Content</h3>
            <p className="text-xs text-slate-500 mb-3">Slug: {websitePage.slug} (v{websitePage.versionHistory.length})</p>
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
              Headline: "{websitePage.heroHeadline}"
            </div>
            <button
              onClick={() => {
                const emp = employees.find((e) => e.code === 'A07');
                if (emp) selectEmployee(emp.id);
              }}
              className="text-xs font-semibold text-cyan-700 hover:underline"
            >
              Open in Walter's Workspace →
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: RESULTS */}
      {workTab === 'results' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="text-xs text-slate-500">Total Enriched Leads</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{leads.length}</div>
              <div className="text-xs text-emerald-600 mt-1">Cross-channel CRM</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="text-xs text-slate-500">Active Deals Pipeline</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                ${deals.reduce((acc, d) => acc + d.value, 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-1">{deals.length} Opportunities</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="text-xs text-slate-500">Meetings Booked</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {leads.filter((l) => l.status === 'meeting_booked').length}
              </div>
              <div className="text-xs text-indigo-600 mt-1">Direct conversions</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
