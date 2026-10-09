import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { TaskStatus, Project, WorkflowRun, WorkflowTemplate } from '../../types';
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
  Users,
  Target,
  Workflow,
  Activity,
  Award,
  HelpCircle,
  X,
  User,
  ShieldAlert,
  Info
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
    navigate,
    selectedProjectId,
    setSelectedProjectId,
    setIsGoalPlannerOpen
  } = useOoumph();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projectSubTab, setProjectSubTab] = useState<'overview' | 'workflow' | 'tasks' | 'assets' | 'activity' | 'results'>('overview');
  const [workflowCategoryFilter, setWorkflowCategoryFilter] = useState<string>('All');
  const [placeholderModalInfo, setPlaceholderModalInfo] = useState<{ title: string; description: string } | null>(null);

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
  const currentProject = wsProjects.find((p) => p.id === selectedProjectId) || wsProjects[0] || projects[0];
  const currentWorkflowRun = workflowRuns.find((r) => r.id === currentProject?.workflowRunId);
  const projectActivities = activityEvents.filter((a) => a.projectId === currentProject?.id);

  // Tasks associated with current project
  const projectTasks = tasks.filter(
    (t) => t.projectId === currentProject?.id || (currentProject?.participatingEmployeeIds.includes(t.employeeId))
  );

  // Workflow categories
  const workflowCategories = [
    'All',
    'Recommended',
    'Marketing',
    'Sales',
    'Operations',
    'Customer Lifecycle',
    'My templates'
  ];

  const getFilteredTemplates = () => {
    if (workflowCategoryFilter === 'All') return workflowTemplates;
    if (workflowCategoryFilter === 'Recommended') {
      return workflowTemplates.filter((t) => ['wf-comment-to-lead', 'wf-content-engine', 'wf-outbound-sales'].includes(t.id));
    }
    if (workflowCategoryFilter === 'Marketing') {
      return workflowTemplates.filter((t) => ['wf-content-engine', 'wf-product-launch', 'wf-paid-acquisition'].includes(t.id));
    }
    if (workflowCategoryFilter === 'Sales') {
      return workflowTemplates.filter((t) => ['wf-outbound-sales', 'wf-product-launch', 'wf-comment-to-lead'].includes(t.id));
    }
    if (workflowCategoryFilter === 'Operations') {
      return workflowTemplates.filter((t) => ['wf-webinar-event', 'wf-customer-onboarding'].includes(t.id));
    }
    if (workflowCategoryFilter === 'Customer Lifecycle') {
      return workflowTemplates.filter((t) => ['wf-customer-onboarding', 'wf-comment-to-lead'].includes(t.id));
    }
    if (workflowCategoryFilter === 'My templates') {
      return []; // empty state
    }
    return workflowTemplates;
  };

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
            Projects, tasks, repeatable workflows, calendar schedules, and verified business results.
          </p>
        </div>

        {/* Sub-tab segment switcher (Reorganized as per Requirement G) */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 overflow-x-auto">
          {[
            { id: 'projects', label: 'Projects', badge: wsProjects.length },
            { id: 'tasks', label: 'Tasks', badge: tasks.length },
            { id: 'workflows', label: 'Workflows', badge: workflowTemplates.length },
            { id: 'calendar', label: 'Calendar' },
            { id: 'assets', label: 'Assets' },
            { id: 'results', label: 'Results' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setWorkTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                workTab === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    workTab === tab.id ? 'bg-slate-200 text-slate-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* RELATIONSHIPS HELPER STRIP (Requirement F) */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 bg-slate-50 border border-slate-200/80 rounded-lg px-3.5 py-2">
        <span className="font-semibold text-slate-700">Vocabulary:</span>
        <span><strong>Project</strong> = Business objective</span>
        <span>·</span>
        <span><strong>Workflow</strong> = Repeatable process</span>
        <span>·</span>
        <span><strong>Task</strong> = Specialist assignment</span>
        <span>·</span>
        <span><strong>Asset</strong> = Output produced</span>
        <span>·</span>
        <span><strong>Approval</strong> = Human decision</span>
        <span>·</span>
        <span><strong>Result</strong> = Measured outcome</span>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: SHARED PROJECTS (Requirement E) */}
      {/* ========================================================================= */}
      {workTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Sidebar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Active Projects ({wsProjects.length})
              </h2>
              <button
                onClick={() => setIsGoalPlannerOpen(true)}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>New Goal Plan</span>
              </button>
            </div>

            <div className="space-y-2">
              {wsProjects.map((proj) => {
                const isSelected = proj.id === currentProject?.id;
                const run = workflowRuns.find((r) => r.id === proj.workflowRunId);
                const completedSteps = run ? run.steps.filter((s) => s.status === 'completed').length : 0;
                const totalSteps = run ? run.steps.length : 0;

                return (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-white shadow-xs ring-1 ring-slate-900/10'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            proj.status === 'in_progress'
                              ? 'bg-teal-50 text-teal-800 border border-teal-200'
                              : proj.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {proj.status === 'in_progress' ? 'In Progress' : proj.status === 'planning' ? 'Planning' : 'Completed'}
                        </span>
                        <h3 className="font-bold text-xs text-slate-900 truncate mt-1">{proj.title}</h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{proj.objective}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{proj.participatingEmployeeIds.length} Specialists</span>
                      {totalSteps > 0 ? (
                        <span className="font-semibold text-teal-700 tabular-nums">
                          Step {completedSteps}/{totalSteps}
                        </span>
                      ) : (
                        <span className="text-slate-400">Custom Plan</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Project Main Container */}
          {currentProject && (
            <div className="lg:col-span-2 space-y-4">
              {/* Project Card Shell */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5">
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Business Objective
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500 font-medium capitalize">Status: {currentProject.status.replace('_', ' ')}</span>
                    </div>
                    <h2 className="text-base font-bold text-slate-900">{currentProject.title}</h2>
                    <p className="text-xs text-slate-600 leading-relaxed">{currentProject.objective}</p>
                  </div>

                  {/* Primary Project Action (Requirement I) */}
                  <div className="shrink-0">
                    {currentWorkflowRun ? (
                      <button
                        onClick={() => setProjectSubTab('workflow')}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>View Execution Stepper</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const firstEmp = employees.find((e) => e.id === currentProject.participatingEmployeeIds[0]);
                          if (firstEmp) selectEmployee(firstEmp.id);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        <span>Collaborate with Lead Specialist</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Project Internal Tabs (Requirement E) */}
                <div className="flex items-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-medium text-slate-600">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'workflow', label: 'Workflow Stepper', badge: currentWorkflowRun ? `${currentWorkflowRun.currentStepIndex + 1}/${currentWorkflowRun.steps.length}` : undefined },
                    { id: 'tasks', label: 'Tasks', badge: projectTasks.length },
                    { id: 'assets', label: 'Assets' },
                    { id: 'activity', label: 'Activity', badge: projectActivities.length },
                    { id: 'results', label: 'Results' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setProjectSubTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                        projectSubTab === tab.id
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            projectSubTab === tab.id ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* 1. PROJECT OVERVIEW TAB */}
                {projectSubTab === 'overview' && (
                  <div className="space-y-5 animate-fade-in text-xs">
                    {/* Next Important Action Box */}
                    {currentProject.nextImportantAction && (
                      <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 space-y-1">
                        <div className="text-[11px] font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal-700" />
                          <span>Next Important Action</span>
                        </div>
                        <p className="text-teal-950 font-medium leading-relaxed">
                          {currentProject.nextImportantAction}
                        </p>
                      </div>
                    )}

                    {/* Progress Summary & Parameters Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 space-y-1">
                        <span className="font-semibold text-slate-500 block text-[11px] uppercase tracking-wider">
                          Progress Summary
                        </span>
                        <p className="text-slate-800 leading-relaxed">
                          {currentProject.progressSummary || 'Plan created. Initial specialist assignments staged.'}
                        </p>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 space-y-1">
                        <span className="font-semibold text-slate-500 block text-[11px] uppercase tracking-wider">
                          Target Offer & Audience
                        </span>
                        <p className="text-slate-800 leading-relaxed">
                          {currentProject.offer || activeWorkspace.name} · {currentProject.audience || 'Target Executive Clients'}
                        </p>
                      </div>
                    </div>

                    {/* Participating Employee Team & Responsibilities */}
                    <div className="space-y-2.5">
                      <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                        Assembled Specialist Team & Responsibilities
                      </div>
                      <div className="space-y-2">
                        {currentProject.participatingEmployeeIds.map((empId) => {
                          const emp = employees.find((e) => e.id === empId);
                          if (!emp) return null;
                          const responsibility =
                            currentProject.employeeResponsibilities?.[emp.id] ||
                            `Lead specialist executing ${emp.capabilities[0] || emp.category}`;

                          return (
                            <div
                              key={emp.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                            >
                              <div className="flex items-center gap-2.5 shrink-0 sm:w-60">
                                <div className={`h-7 w-7 rounded-lg ${emp.avatarColor} text-white font-bold text-[9px] flex items-center justify-center shrink-0`}>
                                  {emp.code}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 truncate">{emp.name}</div>
                                  <div className="text-[11px] text-slate-500 truncate">{emp.title}</div>
                                </div>
                              </div>

                              <div className="text-slate-600 flex-1 min-w-0">
                                {responsibility}
                              </div>

                              <button
                                onClick={() => selectEmployee(emp.id)}
                                className="text-xs font-semibold text-teal-800 hover:text-teal-950 shrink-0 self-end sm:self-center cursor-pointer"
                              >
                                Workspace →
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PROJECT WORKFLOW STEPPER TAB */}
                {projectSubTab === 'workflow' && (
                  <div className="space-y-4 animate-fade-in">
                    {currentWorkflowRun ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                          <div>
                            <span className="font-semibold text-slate-900">Workflow: </span>
                            <span className="text-slate-600">{currentWorkflowRun.templateName}</span>
                          </div>
                          <span className="text-slate-500 font-medium">
                            Step {currentWorkflowRun.currentStepIndex + 1} of {currentWorkflowRun.steps.length}
                          </span>
                        </div>

                        <div className="space-y-2.5">
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
                                          <span>Responsible:</span>
                                          <button
                                            onClick={() => selectEmployee(assignedEmp.id)}
                                            className="font-medium text-slate-800 hover:text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
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

                                  <div className="shrink-0 pt-0.5">
                                    {isInProgress && (
                                      <button
                                        onClick={() => advanceWorkflowStep(currentWorkflowRun.id, step.id)}
                                        className="flex items-center gap-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
                                      >
                                        <Play className="h-3 w-3 fill-current" />
                                        <span>Advance Step</span>
                                      </button>
                                    )}
                                    {isWaitingApproval && (
                                      <button
                                        onClick={() => navigate('inbox')}
                                        className="flex items-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
                                      >
                                        <span>Review in Inbox</span>
                                      </button>
                                    )}
                                    {isCompleted && (
                                      <span className="text-[11px] font-semibold text-teal-700 flex items-center gap-1">
                                        <Check className="h-3 w-3" />
                                        <span>Completed</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center space-y-3">
                        <Workflow className="mx-auto h-8 w-8 text-slate-400" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">No workflow attached yet</div>
                          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                            You can link this business objective to one of our repeatable multi-agent workflows.
                          </p>
                        </div>
                        <button
                          onClick={() => setWorkTab('workflows')}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Attach Proven Workflow</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. PROJECT TASKS TAB */}
                {projectSubTab === 'tasks' && (
                  <div className="space-y-3 animate-fade-in text-xs">
                    {projectTasks.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-xl">
                        No active individual tasks assigned for this project.
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
                        {projectTasks.map((task) => (
                          <div
                            key={task.id}
                            onClick={() => selectEmployee(task.employeeId)}
                            className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <div className="space-y-0.5">
                              <div className="font-semibold text-slate-900">{task.title}</div>
                              <div className="text-[11px] text-slate-500">
                                Assigned to {task.employeeName} ({task.employeeCode}) · Category: {task.category}
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                task.status === 'completed'
                                  ? 'bg-emerald-50 text-emerald-800'
                                  : task.status === 'needs_review'
                                  ? 'bg-amber-50 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {task.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. PROJECT ASSETS TAB */}
                {projectSubTab === 'assets' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fade-in text-xs">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Landing Page Draft</span>
                        <span className="text-[10px] text-slate-500 font-mono">v{websitePage.versionHistory.length}</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">"{websitePage.heroHeadline}"</p>
                      <button
                        onClick={() => {
                          const emp = employees.find((e) => e.code === 'A07');
                          if (emp) selectEmployee(emp.id);
                        }}
                        className="text-cyan-800 font-semibold hover:underline block pt-1 cursor-pointer"
                      >
                        Inspect in Walter's Workspace →
                      </button>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Executive PDF Resource</span>
                        <span className="text-[10px] text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded font-semibold">Ready</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{flagshipCampaign.resourceTitle}</p>
                      <button
                        onClick={() => {
                          const emp = employees.find((e) => e.code === 'A23');
                          if (emp) selectEmployee(emp.id);
                        }}
                        className="text-teal-800 font-semibold hover:underline block pt-1 cursor-pointer"
                      >
                        Inspect in Astrid's Workspace →
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. PROJECT ACTIVITY TAB */}
                {projectSubTab === 'activity' && (
                  <div className="space-y-3 animate-fade-in text-xs">
                    {projectActivities.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 border border-slate-200 rounded-xl bg-slate-50/50">
                        No activity recorded yet for this project.
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white p-4">
                        {projectActivities.map((act) => (
                          <div key={act.id} className="py-2.5 flex items-start justify-between gap-4">
                            <div>
                              <div className="font-bold text-slate-900">
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
                    )}
                  </div>
                )}

                {/* 6. PROJECT RESULTS TAB */}
                {projectSubTab === 'results' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          Qualified Leads
                        </span>
                        <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
                          {leads.filter((l) => l.projectId === currentProject.id || l.workspaceId === activeWorkspace.id).length}
                        </div>
                        <span className="text-[11px] text-teal-700">Captured through campaign</span>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          Pipeline Attributed
                        </span>
                        <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
                          ${deals.filter((d) => d.workspaceId === activeWorkspace.id).reduce((sum, d) => sum + d.value, 0).toLocaleString()}
                        </div>
                        <span className="text-[11px] text-indigo-700">Active deal volume</span>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          Discovery Meetings
                        </span>
                        <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
                          {leads.filter((l) => l.status === 'meeting_booked').length}
                        </div>
                        <span className="text-[11px] text-slate-600">Protected calendar slots</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: INDIVIDUAL TASKS */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* SUB-TAB 3: WORKFLOWS LIBRARY (Requirement H) */}
      {/* ========================================================================= */}
      {workTab === 'workflows' && (
        <div className="space-y-6">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">Workflows</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Repeatable ways your AI team works together.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  setPlaceholderModalInfo({
                    title: 'New Workflow',
                    description: 'Workflow builder will be completed in the next frontend phase.'
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-2xs transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-slate-500" />
                <span>+ New workflow</span>
              </button>

              <button
                onClick={() =>
                  setPlaceholderModalInfo({
                    title: 'New Template',
                    description: 'Workflow builder will be completed in the next frontend phase.'
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-slate-300" />
                <span>+ New template</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {workflowCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setWorkflowCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  workflowCategoryFilter === cat
                    ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Display */}
          {workflowCategoryFilter === 'My templates' ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center space-y-2">
              <Workflow className="mx-auto h-8 w-8 text-slate-400" />
              <div className="text-sm font-semibold text-slate-900">No custom templates yet</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Custom template authoring and recipe saving will be enabled in the upcoming builder phase.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredTemplates().map((template) => (
                <div
                  key={template.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                        {template.category}
                      </span>
                      <span className="text-xs text-slate-400">Duration: {template.typicalDuration}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{template.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{template.shortDescription}</p>

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
                              <span
                                className={`h-3 w-3 rounded-full ${emp.avatarColor} text-white font-bold text-[7px] flex items-center justify-center`}
                              >
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
                      <p className="text-xs text-teal-900 bg-teal-50 p-2.5 rounded-lg border border-teal-200/80 leading-relaxed">
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
                      className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Launch Workflow</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: CALENDAR */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* SUB-TAB 5: ASSETS */}
      {/* ========================================================================= */}
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
              className="text-xs font-semibold text-indigo-700 hover:underline cursor-pointer"
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
              className="text-xs font-semibold text-cyan-700 hover:underline cursor-pointer"
            >
              Open in Walter's Workspace →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 6: RESULTS */}
      {/* ========================================================================= */}
      {workTab === 'results' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          {/* Contextual Flagship Campaign Performance */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{flagshipCampaign.title}</h3>
                <p className="text-xs text-slate-500">Contextual Funnel · Platform: {flagshipCampaign.platform}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Active Funnel
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Comments Scanned</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.scannedComments}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">PDFs Delivered</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.resourcesDelivered}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Opt-in Leads</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.optedInLeads}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Discovery Calls</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.meetingsBooked}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POLISHED EXPLANATORY PLACEHOLDER DIALOG (Requirement H) */}
      {placeholderModalInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">{placeholderModalInfo.title}</h3>
              </div>
              <button
                onClick={() => setPlaceholderModalInfo(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl bg-indigo-50/50 border border-indigo-100 p-4 text-xs text-indigo-950 space-y-2">
              <span className="font-semibold block">Under Active Development</span>
              <p className="text-indigo-800 leading-relaxed">
                {placeholderModalInfo.description}
              </p>
              <p className="text-slate-500 text-[11px]">
                In the meantime, you can launch and execute any of our 7 proven multi-agent recipes below.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPlaceholderModalInfo(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
