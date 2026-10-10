import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { TaskStatus, Project, WorkflowRun, WorkflowTemplate, BusinessSolution, WorkflowStep, Task } from '../../types';
import { BusinessSolutionCard } from '../workflows/BusinessSolutionCard';
import { WorkflowCard } from '../workflows/WorkflowCard';
import { ProjectExecutionMap } from '../workflows/ProjectExecutionMap';
import { WorkflowStepDetailDrawer } from '../workflows/WorkflowStepDetailDrawer';
import { AutomationsLibraryView } from '../workflows/AutomationsLibraryView';
import { TaskDetailModal } from '../modals/TaskDetailModal';
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
  ShieldCheck,
  Plug,
  RefreshCw,
  UserPlus,
  RotateCcw,
  Info,
  Save,
  Trash2,
  Copy,
  Edit3,
  Eye,
  Settings as SettingsIcon,
  Repeat,
  SlidersHorizontal
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
    businessSolutions,
    selectedSolutionId,
    setSelectedSolutionId,
    selectedWorkflowTemplateId,
    setSelectedWorkflowTemplateId,
    isSolutionDetailOpen,
    setIsSolutionDetailOpen,
    isWorkflowDetailOpen,
    setIsWorkflowDetailOpen,
    setGoalPlannerInitialGoal,
    approvals,
    approveRequest,
    rejectRequest,
    requestChangesOnApproval,
    advanceWorkflowStep,
    startWorkflowFromTemplate,
    openWorkflowSetup,
    openBusinessSolutionSetup,
    openAddTeammateModal,
    advanceWorkflowPhase,
    addWorkflowToProject,
    retryBlockedStep,
    skipOptionalStep,
    submitRevisionForStep,
    startProject,
    activityEvents,
    navigate,
    selectedProjectId,
    setSelectedProjectId,
    setIsGoalPlannerOpen,
    setIsWorkflowBuilderOpen,
    openWorkflowBuilder,
    duplicateWorkflowTemplate,
    archiveWorkflowTemplate,
    restoreWorkflowTemplate,
    deleteCustomWorkflowTemplate,
    saveProjectAsWorkflowTemplate,
    recurringAutomations,
    openAssignmentComposer,
    openProjectSettings
  } = useOoumph();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projectSubTab, setProjectSubTab] = useState<'overview' | 'flow' | 'workflow' | 'tasks' | 'outputs' | 'assets' | 'activity' | 'results'>('overview');
  const [selectedStepForDrawer, setSelectedStepForDrawer] = useState<WorkflowStep | null>(null);
  const [selectedTaskForModal, setSelectedTaskForModal] = useState<Task | null>(null);
  const [workflowCategoryFilter, setWorkflowCategoryFilter] = useState<string>('All');
  const [placeholderModalInfo, setPlaceholderModalInfo] = useState<{ title: string; description: string } | null>(null);
  const [activeProjectChangeRequestId, setActiveProjectChangeRequestId] = useState<string | null>(null);
  const [projectFeedbackText, setProjectFeedbackText] = useState('');
  const [activeStepRevisionId, setActiveStepRevisionId] = useState<string | null>(null);
  const [stepRevisionText, setStepRevisionText] = useState('');

  // Outcome-First Library State (Prompt 2B.1)
  const [selectedOutcomeCategoryId, setSelectedOutcomeCategoryId] = useState<string>('all');
  const [libraryViewMode, setLibraryViewMode] = useState<'solutions' | 'workflows' | 'all'>('solutions');
  const [workflowSearchQuery, setWorkflowSearchQuery] = useState<string>('');
  const [complexityFilter, setComplexityFilter] = useState<'all' | 'starter' | 'moderate' | 'advanced'>('all');

  // Personal Template Management State (Requirement 10, 14, 15, 16)
  const [personalTemplateTab, setPersonalTemplateTab] = useState<'active' | 'archived'>('active');
  const [templateToDelete, setTemplateToDelete] = useState<WorkflowTemplate | null>(null);
  const [isSaveProjectAsTemplateModalOpen, setIsSaveProjectAsTemplateModalOpen] = useState(false);
  const [saveProjectTemplateName, setSaveProjectTemplateName] = useState('');
  const [templateSaveFeedback, setTemplateSaveFeedback] = useState<string | null>(null);

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

  // Pending approvals blocking this project
  const projectPendingApprovals = approvals.filter(
    (a) =>
      a.status === 'pending' &&
      (a.projectId === currentProject?.id ||
        (currentWorkflowRun && a.workflowRunId === currentWorkflowRun.id) ||
        (currentProject && currentProject.participatingEmployeeIds.includes(a.employeeId)))
  );

  // Outcome Categories for Prompt 2B.1
  const OUTCOME_CATEGORIES = [
    { id: 'all', label: 'All Outcomes', solutionCategory: null, shortLabel: 'All Outcomes' },
    { id: 'launch_business', label: 'Start or launch my business', solutionCategory: 'Launch my business', shortLabel: 'Launch Business' },
    { id: 'build_website', label: 'Build or improve my website', solutionCategory: 'Build my website', shortLabel: 'Build / Upgrade Website' },
    { id: 'create_content', label: 'Create consistent content', solutionCategory: 'Create content', shortLabel: 'Create Content' },
    { id: 'seo_ai_visibility', label: 'Improve SEO / AI visibility', solutionCategory: 'Get found on Google & AI', shortLabel: 'SEO & AI Visibility' },
    { id: 'brand_awareness', label: 'Grow brand awareness', solutionCategory: 'Grow awareness', shortLabel: 'Grow Awareness' },
    { id: 'generate_leads', label: 'Generate leads', solutionCategory: 'Generate leads', shortLabel: 'Generate Leads' },
    { id: 'turn_meetings', label: 'Turn engagement into meetings', solutionCategory: 'Turn engagement into meetings', shortLabel: 'Engagement to Meetings' },
    { id: 'launch_product', label: 'Launch a product or offer', solutionCategory: 'Launch a product', shortLabel: 'Launch Product / Offer' },
    { id: 'sell_online', label: 'Sell products online', solutionCategory: 'Sell products online', shortLabel: 'Sell Products Online' },
    { id: 'outbound_sales', label: 'Grow outbound sales', solutionCategory: 'Run outbound sales', shortLabel: 'Outbound Sales' },
    { id: 'nurture_leads', label: 'Nurture existing leads', solutionCategory: 'Nurture leads', shortLabel: 'Nurture Leads' },
    { id: 'retain_customers', label: 'Improve customer retention', solutionCategory: 'Retain customers', shortLabel: 'Retain Customers' },
    { id: 'reputation', label: 'Manage brand reputation', solutionCategory: 'Manage reputation', shortLabel: 'Manage Reputation' },
    { id: 'event_webinar', label: 'Run an event or webinar', solutionCategory: 'Run an event', shortLabel: 'Event or Webinar' },
    { id: 'operations', label: 'Improve internal operations', solutionCategory: 'Operate my business', shortLabel: 'Internal Operations' },
  ];

  // Functional Workflow categories
  const workflowCategories = [
    'All',
    'Brand & Strategy',
    'Web & Digital',
    'Content & Social',
    'SEO & Answer Engine Visibility',
    'Paid Demand & Growth',
    'Events & Lifecycle',
    'Sales & Pipeline',
    'E-Commerce & Merchandising',
    'Customer Success',
    'Business Operations',
    'My templates'
  ];

  // Filter Business Solutions
  const filteredBusinessSolutions = businessSolutions.filter((solution) => {
    if (selectedOutcomeCategoryId !== 'all') {
      const activeOutcome = OUTCOME_CATEGORIES.find((c) => c.id === selectedOutcomeCategoryId);
      if (activeOutcome?.solutionCategory) {
        if (solution.outcomeCategory.toLowerCase() !== activeOutcome.solutionCategory.toLowerCase()) {
          return false;
        }
      }
    }

    if (workflowSearchQuery.trim()) {
      const q = workflowSearchQuery.toLowerCase();
      const matchText = [
        solution.title,
        solution.shortPromise,
        solution.description,
        solution.code,
        solution.bestFor,
        ...(solution.tags || []),
        solution.outcomeCategory
      ].join(' ').toLowerCase();

      const employeeMatch = solution.employeeIds.some((id) => {
        const emp = employees.find((e) => e.id === id);
        return emp && (emp.name.toLowerCase().includes(q) || emp.code.toLowerCase().includes(q) || emp.title.toLowerCase().includes(q));
      });

      if (!matchText.includes(q) && !employeeMatch) return false;
    }

    if (complexityFilter !== 'all' && solution.complexity !== complexityFilter) {
      return false;
    }

    return true;
  });

  // Filter Workflows
  const filteredWorkflows = workflowTemplates.filter((wf) => {
    if (selectedOutcomeCategoryId !== 'all') {
      const activeOutcome = OUTCOME_CATEGORIES.find((c) => c.id === selectedOutcomeCategoryId);
      if (activeOutcome?.solutionCategory) {
        const matchingSolutions = businessSolutions.filter(
          (s) => s.outcomeCategory.toLowerCase() === activeOutcome.solutionCategory?.toLowerCase()
        );
        const includedInMatchingSolutions = matchingSolutions.some((s) =>
          s.workflowTemplateIds.includes(wf.id)
        );

        const categoryMatches =
          wf.outcomeCategory?.toLowerCase() === activeOutcome.solutionCategory.toLowerCase() ||
          wf.category.toLowerCase().includes(activeOutcome.solutionCategory.toLowerCase());

        if (!includedInMatchingSolutions && !categoryMatches) return false;
      }
    }

    if (workflowCategoryFilter === 'My templates') {
      if (wf.templateSource !== 'personal') return false;
      if (wf.workspaceId && wf.workspaceId !== activeWorkspace.id) return false;
      if (personalTemplateTab === 'active' && wf.status === 'archived') return false;
      if (personalTemplateTab === 'archived' && wf.status !== 'archived') return false;
    } else if (workflowCategoryFilter !== 'All') {
      if (wf.category !== workflowCategoryFilter) {
        return false;
      }
      if (wf.status === 'archived') return false;
    } else {
      if (wf.status === 'archived') return false;
    }

    if (workflowSearchQuery.trim()) {
      const q = workflowSearchQuery.toLowerCase();
      const matchText = [
        wf.title || wf.name,
        wf.code || '',
        wf.outcome,
        wf.shortDescription,
        wf.description || '',
        wf.category,
        wf.bestFor || '',
        ...(wf.tags || [])
      ].join(' ').toLowerCase();

      const employeeMatch = (wf.participatingEmployeeIds || []).some((id) => {
        const emp = employees.find((e) => e.id === id);
        return emp && (emp.name.toLowerCase().includes(q) || emp.code.toLowerCase().includes(q) || emp.title.toLowerCase().includes(q));
      });

      if (!matchText.includes(q) && !employeeMatch) return false;
    }

    if (complexityFilter !== 'all') {
      const compMap: Record<string, string> = {
        starter: 'simple',
        moderate: 'moderate',
        advanced: 'comprehensive'
      };
      if (wf.complexity && wf.complexity !== compMap[complexityFilter] && wf.complexity !== complexityFilter) {
        return false;
      }
    }

    return true;
  });

  const personalTemplates = workflowTemplates.filter(
    (t) => t.templateSource === 'personal' && (!t.workspaceId || t.workspaceId === activeWorkspace.id)
  );
  const activePersonalTemplates = personalTemplates.filter((t) => t.status !== 'archived');
  const archivedPersonalTemplates = personalTemplates.filter((t) => t.status === 'archived');

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
            { id: 'routines', label: 'Routines', badge: recurringAutomations.filter((a) => a.workspaceId === activeWorkspace.id).length },
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
                              : proj.status === 'ready'
                              ? 'bg-amber-50 text-amber-900 border border-amber-300 ring-1 ring-amber-400/30'
                              : proj.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {proj.status === 'in_progress' ? 'In Progress' : proj.status === 'ready' ? 'Ready to Start' : proj.status === 'planning' ? 'Planning' : 'Completed'}
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

                  {/* Primary Project Action & Settings */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openProjectSettings(currentProject.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      title="Project Settings, Schedule Cadence & Governance Lifecycle"
                    >
                      <SettingsIcon className="h-3.5 w-3.5 text-slate-500" />
                      <span>Settings</span>
                    </button>
                    {currentProject.status === 'ready' ? (
                      <button
                        onClick={() => startProject(currentProject.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-800 text-white text-xs font-semibold hover:bg-teal-900 transition-colors shadow-xs cursor-pointer ring-2 ring-teal-500/30"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Start Project</span>
                      </button>
                    ) : currentWorkflowRun ? (
                      <button
                        onClick={() => setProjectSubTab('flow')}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>View Execution Map</span>
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

                {/* Explicit Ready to Start banner */}
                {currentProject.status === 'ready' && (
                  <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fade-in">
                    <div className="space-y-0.5">
                      <div className="font-bold text-amber-950 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-700 shrink-0" />
                        <span>Team Plan Staged — Ready to Start</span>
                      </div>
                      <p className="text-amber-900 text-[11px] leading-relaxed">
                        AI specialists, responsibilities, and deliverables are staged. <strong>Execution has NOT silently begun</strong> in the background. Review your plan below and click <strong>"Start Project"</strong> when ready to launch.
                      </p>
                    </div>
                    <button
                      onClick={() => startProject(currentProject.id)}
                      className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Start Project</span>
                    </button>
                  </div>
                )}

                {/* Project Internal Tabs (Requirement E) */}
                <div className="flex items-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-medium text-slate-600">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'flow', label: 'Flow', badge: currentWorkflowRun ? `${currentWorkflowRun.currentStepIndex + 1}/${currentWorkflowRun.steps.length}` : undefined },
                    { id: 'tasks', label: 'Tasks', badge: projectTasks.length },
                    { id: 'outputs', label: 'Outputs' },
                    { id: 'activity', label: 'Activity', badge: projectActivities.length },
                    { id: 'results', label: 'Results' }
                  ].map((tab) => {
                    const isActive =
                      projectSubTab === tab.id ||
                      (tab.id === 'flow' && projectSubTab === 'workflow') ||
                      (tab.id === 'outputs' && projectSubTab === 'assets');
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setProjectSubTab(tab.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white font-semibold'
                            : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span>{tab.label}</span>
                        {tab.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                              isActive ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 1. PROJECT OVERVIEW TAB */}
                {projectSubTab === 'overview' && (
                  <div className="space-y-5 animate-fade-in text-xs">
                    {/* Needs You Area (Human-in-the-loop Gate) */}
                    {projectPendingApprovals.length > 0 && (
                      <div className="rounded-xl border-2 border-amber-400 bg-amber-50/90 p-4 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-xs">!</span>
                            <div>
                              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                                Needs You · Human Approval Required ({projectPendingApprovals.length})
                              </h4>
                              <p className="text-[11px] text-amber-900">
                                Autonomous execution is currently paused. An assigned human gatekeeper must review and authorize the following item(s) before workflow progression resumes.
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => navigate('inbox')}
                            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 hover:text-amber-950 hover:underline cursor-pointer"
                          >
                            <span>Open Inbox Review Queue →</span>
                          </button>
                        </div>

                        <div className="space-y-2.5 pt-1">
                          {projectPendingApprovals.map((req) => (
                            <div key={req.id} className="rounded-lg border border-amber-300 bg-white p-3.5 space-y-2 shadow-2xs">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                                      {req.artifactType.replace('_', ' ')}
                                    </span>
                                    <span className="font-semibold text-xs text-slate-900">{req.summary}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-500 mt-1">
                                    Prepared by <strong>{req.employeeName}</strong>
                                    {req.reviewedBy && <span> · Approver: <strong className="text-slate-700">{req.reviewedBy}</strong></span>}
                                  </div>
                                </div>
                              </div>

                              {req.contextNote && (
                                <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 italic">
                                  "{req.contextNote}"
                                </p>
                              )}

                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100">
                                <button
                                  onClick={() => selectEmployee(req.employeeId)}
                                  className="text-[11px] text-indigo-700 hover:underline font-medium text-left"
                                >
                                  Inspect in {req.employeeName}'s Workspace →
                                </button>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      if (activeProjectChangeRequestId === req.id) {
                                        setActiveProjectChangeRequestId(null);
                                      } else {
                                        setActiveProjectChangeRequestId(req.id);
                                        setProjectFeedbackText('');
                                      }
                                    }}
                                    className={`flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                                      activeProjectChangeRequestId === req.id
                                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <RotateCcw className="h-3 w-3" />
                                    <span>Request Changes</span>
                                  </button>

                                  <button
                                    onClick={() => rejectRequest(req.id)}
                                    className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                  >
                                    Reject
                                  </button>

                                  <button
                                    onClick={() => approveRequest(req.id)}
                                    className="flex items-center gap-1 rounded-md bg-slate-950 px-3 py-1 text-xs font-bold text-white hover:bg-slate-800 shadow-2xs cursor-pointer"
                                  >
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Authorize</span>
                                  </button>
                                </div>
                              </div>

                              {/* Inline Change Request Box */}
                              {activeProjectChangeRequestId === req.id && (
                                <div className="mt-2 p-3 rounded-lg border border-amber-300 bg-amber-50 space-y-2">
                                  <div className="flex items-center justify-between font-semibold text-amber-900 text-[11px]">
                                    <span>Provide required revisions for {req.employeeName}:</span>
                                    <button
                                      type="button"
                                      onClick={() => setActiveProjectChangeRequestId(null)}
                                      className="text-amber-700 hover:text-amber-900"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                  <textarea
                                    rows={2}
                                    value={projectFeedbackText}
                                    onChange={(e) => setProjectFeedbackText(e.target.value)}
                                    placeholder={`Enter specific change instructions for ${req.employeeName}...`}
                                    className="w-full rounded border border-amber-300 bg-white p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                                  />
                                  <div className="flex justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setActiveProjectChangeRequestId(null)}
                                      className="px-2 py-0.5 text-xs text-slate-600 hover:text-slate-800"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        requestChangesOnApproval(req.id, projectFeedbackText.trim() || 'Changes requested by reviewer.');
                                        setActiveProjectChangeRequestId(null);
                                        setProjectFeedbackText('');
                                      }}
                                      disabled={!projectFeedbackText.trim()}
                                      className="px-3 py-1 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded text-xs font-semibold"
                                    >
                                      Submit Revisions
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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

                    {/* Human Oversight & Workspace Team Collaborators */}
                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-slate-600" />
                          <span>Human Workspace Team & Oversight Roles</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => openAddTeammateModal(currentProject.id)}
                          className="flex items-center gap-1 text-[11px] font-bold text-teal-800 hover:text-teal-950 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          <UserPlus className="h-3 w-3" />
                          <span>+ Add Teammate</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(currentProject.collaborators && currentProject.collaborators.length > 0
                          ? currentProject.collaborators
                          : [
                              {
                                teamMemberId: 'tm-1',
                                name: activeWorkspace.name === 'Cedar Learning' ? 'Sarah Jenkins' : 'Workspace Owner',
                                email: 'lead@ooumph.com',
                                role: 'project_owner' as const
                              }
                            ]
                        ).map((collab, idx) => {
                          const isApprover =
                            collab.role === 'approver' ||
                            collab.teamMemberId === currentProject.humanApproverId;
                          return (
                            <div
                              key={idx}
                              className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-2 shadow-2xs"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="h-7 w-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                  {collab.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 truncate">{collab.name}</div>
                                  <div className="text-[10px] text-slate-500 truncate">{collab.email}</div>
                                </div>
                              </div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize whitespace-nowrap ${
                                  collab.role === 'project_owner'
                                    ? 'bg-slate-900 text-white'
                                    : isApprover
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {collab.role.replace('_', ' ')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Infrastructure Readiness & Connected Channels */}
                    {currentProject.requiredConnections && currentProject.requiredConnections.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Plug className="h-3.5 w-3.5 text-slate-600" />
                          <span>Connected Infrastructure & Channel Readiness</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {currentProject.requiredConnections.map((conn, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                                conn.ready
                                  ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                                  : 'border-amber-300 bg-amber-50 text-amber-900'
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  conn.ready ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse'
                                }`}
                              />
                              <span>{conn.label}</span>
                              <span className="text-[10px] font-normal opacity-80">
                                {conn.ready ? '· Connected' : '· Missing'}
                              </span>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => navigate('settings')}
                            className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 underline ml-1 cursor-pointer"
                          >
                            Configure in Settings →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Governance Policies & Approvals Gate Strip */}
                    <div className="space-y-2 pt-2">
                      <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
                        <span>Governance & Approval Gate Policy</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-900">
                            Policy: {currentProject.approvalPolicies?.[0] || 'Mandatory human approval before external distribution.'}
                          </span>
                          <span className="text-slate-500">
                            Designated Gatekeeper: <strong className="text-slate-900">Workspace Approver</strong>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          Autonomous actions pause at designated checkpoints (HITL). Revisions can be submitted and deliverables re-evaluated without resetting project state.
                        </p>
                      </div>
                    </div>

                    {/* Specialist Handoff Trail */}
                    {currentProject.handoffs && currentProject.handoffs.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Activity className="h-3.5 w-3.5 text-indigo-600" />
                          <span>Specialist Deliverable Handoffs ({currentProject.handoffs.length})</span>
                        </div>
                        <div className="space-y-2">
                          {currentProject.handoffs.map((handoff, hIdx) => (
                            <div
                              key={hIdx}
                              className="p-3 rounded-lg border border-indigo-100 bg-indigo-50/40 flex items-start justify-between gap-3 text-xs"
                            >
                              <div className="flex items-start gap-2.5">
                                <div className="flex items-center gap-1 font-mono text-[10px] font-bold bg-white border border-indigo-200 px-2 py-0.5 rounded shadow-2xs">
                                  <span>{handoff.fromCode}</span>
                                  <span>→</span>
                                  <span className="text-indigo-700">{handoff.toCode}</span>
                                </div>
                                <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                                  {handoff.message}
                                </p>
                              </div>
                              <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                                {new Date(handoff.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. PROJECT FLOW / EXECUTION MAP TAB */}
                {(projectSubTab === 'flow' || projectSubTab === 'workflow') && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Visual Execution Map */}
                    <div className="mb-2">
                      <ProjectExecutionMap
                        project={currentProject}
                        run={currentWorkflowRun}
                        onSelectStep={(step) => setSelectedStepForDrawer(step)}
                        activeStepId={selectedStepForDrawer?.id}
                      />
                    </div>

                    {currentWorkflowRun ? (
                      <div className="space-y-3 pt-2 border-t border-slate-100">
                        <div className="flex flex-wrap items-center justify-between pb-2 border-b border-slate-100 text-xs gap-2">
                          <div className="flex items-center gap-2">
                            <div>
                              <span className="font-semibold text-slate-900">Step-by-Step Execution: </span>
                              <span className="text-slate-600">{currentWorkflowRun.templateName}</span>
                            </div>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-500 font-medium">
                              Step {currentWorkflowRun.currentStepIndex + 1} of {currentWorkflowRun.steps.length}
                            </span>
                          </div>

                          {/* Requirement 16 & 17: Save Workflow as Template */}
                          <button
                            type="button"
                            onClick={() => {
                              setSaveProjectTemplateName(`${currentProject?.title || 'Project'} Playbook`);
                              setIsSaveProjectAsTemplateModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                            title="Save this project's workflow structure as a reusable template in My Templates"
                          >
                            <Save className="h-3.5 w-3.5 text-slate-500" />
                            <span>Save Workflow as Template</span>
                          </button>
                        </div>

                        {templateSaveFeedback && (
                          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center justify-between animate-fade-in">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-teal-700 shrink-0" />
                              <span>{templateSaveFeedback}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setTemplateSaveFeedback(null)}
                              className="text-teal-700 hover:text-teal-900"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}

                        <div className="space-y-2.5">
                          {currentWorkflowRun.steps.map((step, idx) => {
                            const isCompleted = step.status === 'completed';
                            const isInProgress = step.status === 'in_progress';
                            const isWaitingApproval = step.status === 'waiting_approval';
                            const isBlocked = step.status === 'blocked';
                            const isSkipped = step.status === 'skipped';
                            const assignedEmp = step.employeeId ? employees.find((e) => e.id === step.employeeId) : null;

                            return (
                              <div
                                key={step.id}
                                className={`rounded-xl border p-4 transition-all ${
                                  isCompleted
                                    ? 'border-slate-200 bg-slate-50/50 text-slate-700'
                                    : isBlocked
                                    ? 'border-amber-400 bg-amber-50/60 text-slate-900 shadow-2xs ring-1 ring-amber-400/20'
                                    : isInProgress
                                    ? 'border-teal-500 bg-teal-50/30 text-slate-900 shadow-2xs ring-1 ring-teal-500/20'
                                    : isWaitingApproval
                                    ? 'border-amber-400 bg-amber-50/40 text-slate-900'
                                    : 'border-slate-200 bg-white text-slate-500'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <div className="pt-0.5 shrink-0">
                                      {isCompleted ? (
                                        <div className="h-5 w-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                                          <Check className="h-3 w-3 stroke-[3]" />
                                        </div>
                                      ) : isBlocked ? (
                                        <div className="h-5 w-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                                          !
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

                                    <div className="space-y-1.5 flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-semibold text-xs text-slate-900">{step.title}</h4>
                                        {step.type === 'human_approval' && (
                                          <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded border border-amber-200">
                                            Human Review
                                          </span>
                                        )}
                                        {isBlocked && (
                                          <span className="text-[10px] font-bold bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded border border-amber-300">
                                            Paused · Connection Required
                                          </span>
                                        )}
                                        {step.revisionFeedback && (
                                          <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200">
                                            Revision Applied
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-slate-600">{step.description}</p>

                                      {/* Blocked Reason Warning Box */}
                                      {isBlocked && (
                                        <div className="p-2.5 rounded-lg border border-amber-300 bg-white space-y-1.5">
                                          <div className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                                            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                            <span>Stage Blocker:</span>
                                          </div>
                                          <p className="text-[11px] text-amber-900">
                                            {step.blockedReason || 'This automated step requires an active integration connection.'}
                                          </p>
                                          <div className="flex items-center gap-2 pt-1 flex-wrap">
                                            <button
                                              type="button"
                                              onClick={() => retryBlockedStep(currentProject.id, step.id)}
                                              className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-semibold shadow-2xs cursor-pointer"
                                            >
                                              <RefreshCw className="h-3 w-3" />
                                              <span>Verify & Retry Stage</span>
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => navigate('settings')}
                                              className="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold cursor-pointer"
                                            >
                                              Settings →
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => skipOptionalStep(currentProject.id, step.id)}
                                              className="text-[11px] text-slate-500 hover:text-slate-800 underline ml-1 cursor-pointer"
                                            >
                                              Skip step
                                            </button>
                                          </div>
                                        </div>
                                      )}

                                      {/* Revision feedback note if any */}
                                      {step.revisionFeedback && (
                                        <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 italic">
                                          "Revision: {step.revisionFeedback}"
                                        </div>
                                      )}

                                      {/* Inline Request Changes Form */}
                                      {activeStepRevisionId === step.id && (
                                        <div className="p-3 rounded-lg border border-amber-300 bg-amber-50 space-y-2 mt-2">
                                          <div className="flex items-center justify-between text-[11px] font-bold text-amber-950">
                                            <span>Request deliverable revision:</span>
                                            <button
                                              type="button"
                                              onClick={() => setActiveStepRevisionId(null)}
                                              className="text-amber-700 hover:text-amber-900"
                                            >
                                              <X className="h-3.5 w-3.5" />
                                            </button>
                                          </div>
                                          <textarea
                                            rows={2}
                                            value={stepRevisionText}
                                            onChange={(e) => setStepRevisionText(e.target.value)}
                                            placeholder="Provide specific feedback or changes for the specialist..."
                                            className="w-full rounded border border-amber-300 bg-white p-2 text-xs text-slate-900 focus:outline-hidden"
                                          />
                                          <div className="flex justify-end gap-2">
                                            <button
                                              type="button"
                                              onClick={() => setActiveStepRevisionId(null)}
                                              className="px-2 py-0.5 text-xs text-slate-600"
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                submitRevisionForStep(
                                                  currentProject.id,
                                                  step.id,
                                                  stepRevisionText.trim() || 'Please adjust deliverable formatting and alignment.'
                                                );
                                                setActiveStepRevisionId(null);
                                                setStepRevisionText('');
                                              }}
                                              className="px-3 py-1 bg-amber-800 hover:bg-amber-900 text-white rounded text-xs font-semibold"
                                            >
                                              Submit Revision
                                            </button>
                                          </div>
                                        </div>
                                      )}

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
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <button
                                          onClick={() => {
                                            const matchedReq = approvals.find((a) => a.workflowRunId === currentWorkflowRun.id && a.status === 'pending');
                                            if (matchedReq) {
                                              approveRequest(matchedReq.id);
                                            } else {
                                              advanceWorkflowStep(currentWorkflowRun.id, step.id);
                                            }
                                          }}
                                          className="flex items-center gap-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
                                        >
                                          <CheckCircle2 className="h-3 w-3" />
                                          <span>Authorize Gate</span>
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => {
                                            setActiveStepRevisionId(step.id);
                                            setStepRevisionText('');
                                          }}
                                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
                                        >
                                          <RotateCcw className="h-3 w-3" />
                                          <span>Request Revision</span>
                                        </button>

                                        <button
                                          onClick={() => navigate('inbox')}
                                          className="flex items-center gap-1.5 rounded-lg bg-amber-100 border border-amber-300 hover:bg-amber-200 px-2.5 py-1.5 text-xs font-semibold text-amber-900 shadow-2xs transition-colors cursor-pointer"
                                        >
                                          <span>Review in Inbox</span>
                                        </button>
                                      </div>
                                    )}
                                    {isCompleted && (
                                      <span className="text-[11px] font-semibold text-teal-700 flex items-center gap-1">
                                        <Check className="h-3 w-3" />
                                        <span>Completed</span>
                                      </span>
                                    )}
                                    {isSkipped && (
                                      <span className="text-[11px] font-medium text-slate-400">
                                        Skipped
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Phase Advancement & Recommended Workflows Continuation (Prompt 2B.2) */}
                        {currentWorkflowRun.steps.every((s) => s.status === 'completed' || s.status === 'skipped') && (
                          <div className="pt-3 space-y-4">
                            {currentProject.upcomingWorkflowIds && currentProject.upcomingWorkflowIds.length > 0 ? (
                              <div className="rounded-xl border border-teal-300 bg-linear-to-b from-teal-50 via-teal-50/50 to-white p-5 space-y-3 shadow-xs">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div>
                                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-teal-900 text-white uppercase tracking-wider">
                                      PHASE COMPLETED
                                    </span>
                                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                                      {currentProject.currentPhaseTitle || 'Current Phase'} Delivered Successfully
                                    </h3>
                                    <p className="text-xs text-slate-600 mt-0.5">
                                      All outputs verified and archived. Ready to advance to{' '}
                                      <strong>
                                        {workflowTemplates.find((w) => w.id === currentProject.upcomingWorkflowIds?.[0])?.name || 'Next Workflow Phase'}
                                      </strong>. Reusing established context and team deliverables.
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => advanceWorkflowPhase(currentProject.id)}
                                    className="flex items-center gap-2 rounded-lg bg-teal-800 hover:bg-teal-900 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 ring-2 ring-teal-500/20"
                                  >
                                    <Sparkles className="h-3.5 w-3.5" />
                                    <span>Prepare & Start Next Phase →</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
                                <div className="flex items-center gap-2 text-emerald-800">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span className="text-xs font-bold uppercase tracking-wider">
                                    Project Milestones Achieved · All Deliverables Archived
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-900">Recommended Next Workflows</h4>
                                  <p className="text-[11px] text-slate-500 mt-0.5">
                                    Continue business momentum with subsequent specialized workflows that build on this deliverable foundation:
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                  {((currentProject.workflowTemplateId
                                    ? workflowTemplates.find((w) => w.id === currentProject.workflowTemplateId)?.recommendedNextWorkflowIds || []
                                    : ['wf-06', 'wf-11']
                                  )
                                    .map((id) => workflowTemplates.find((w) => w.id === id))
                                    .filter(Boolean) as WorkflowTemplate[]
                                  ).slice(0, 2).map((recWf) => (
                                    <div
                                      key={recWf.id}
                                      className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between gap-3"
                                    >
                                      <div>
                                        <div className="flex items-center justify-between gap-1 text-[10px]">
                                          <span className="font-mono font-bold text-slate-700">{recWf.code}</span>
                                          <span className="text-slate-500">{recWf.typicalDuration}</span>
                                        </div>
                                        <h5 className="font-bold text-xs text-slate-900 mt-1">{recWf.name}</h5>
                                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{recWf.outcome}</p>
                                      </div>

                                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                                        <button
                                          type="button"
                                          onClick={() => openWorkflowSetup(recWf.id)}
                                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold cursor-pointer shadow-2xs"
                                        >
                                          <span>Launch Setup</span>
                                          <ArrowRight className="h-3 w-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => addWorkflowToProject(currentProject.id, recWf.id)}
                                          className="px-2.5 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold cursor-pointer"
                                        >
                                          Queue in Project
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
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

                {/* 4. PROJECT OUTPUTS TAB */}
                {(projectSubTab === 'outputs' || projectSubTab === 'assets') && (
                  <div className="space-y-4 animate-fade-in text-xs">
                    {/* Dynamic Milestone Deliverables generated autonomously */}
                    {currentProject.projectAssets && currentProject.projectAssets.length > 0 && (
                      <div className="space-y-2">
                        <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-teal-700" />
                          <span>Generated Milestone Deliverables ({currentProject.projectAssets.length})</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {currentProject.projectAssets.map((asset) => (
                            <div key={asset.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-2xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 truncate">{asset.title}</span>
                                <span className="text-[10px] text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.2 rounded font-semibold capitalize">
                                  {asset.type.replace('_', ' ')}
                                </span>
                              </div>
                              <p className="text-slate-600 text-[11px] line-clamp-3 bg-slate-50 p-2 rounded border border-slate-100 font-mono text-[10px]">
                                {asset.content}
                              </p>
                              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                                <span>Produced by <strong>{asset.employeeName}</strong> ({asset.employeeCode})</span>
                                <span className="tabular-nums">{new Date(asset.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                  <div className="space-y-4 animate-fade-in text-xs">
                    {/* Target Benchmark KPIs Scorecard (Prompt 2B.2) */}
                    {(currentProject.targetMetricsValues || (currentProject.successMetrics && currentProject.successMetrics.length > 0)) && (
                      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Award className="h-3.5 w-3.5 text-teal-700" />
                            <span>Target Success Metrics & Milestone Benchmarks</span>
                          </h4>
                          <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                            Configured in Setup
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          {(currentProject.targetMetricsValues
                            ? Object.entries(currentProject.targetMetricsValues).map(([name, val]) => ({ name, val }))
                            : (currentProject.successMetrics || []).map((m) => {
                                const parts = m.split(':');
                                return { name: parts[0] || m, val: parts[1] || '100% Target' };
                              })
                          ).map((met, idx) => (
                            <div key={idx} className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1">
                              <span className="text-[10px] text-slate-500 font-medium block truncate">{met.name}</span>
                              <div className="text-sm font-bold text-slate-900">{met.val}</div>
                              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                                <Check className="h-2.5 w-2.5" />
                                <span>Benchmark Tracked</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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

              <button
                type="button"
                onClick={() => openAssignmentComposer(employees[0]?.id || 'emp-a02')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer ml-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Assign Task</span>
              </button>
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
                  onClick={() => setSelectedTaskForModal(task)}
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
      {/* SUB-TAB 3: WORKFLOWS & BUSINESS SOLUTIONS LIBRARY (Prompt 2B.1) */}
      {/* ========================================================================= */}
      {workTab === 'workflows' && (
        <div className="space-y-6 animate-fade-in">
          {/* 1. Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-950">Workflows</h2>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                  15 Solutions · 54 Workflows
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Repeatable ways your AI team gets business work done.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsWorkflowBuilderOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-2xs transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-slate-500" />
                <span>+ New workflow</span>
              </button>

              <button
                onClick={() => setIsWorkflowBuilderOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-slate-300" />
                <span>+ New template</span>
              </button>
            </div>
          </div>

          {/* 2. Outcome Selector: "What are you trying to accomplish?" */}
          <div className="rounded-2xl border border-teal-200/80 bg-linear-to-b from-teal-50/40 via-white to-white p-5 space-y-3.5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-teal-700 shrink-0" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    What are you trying to accomplish?
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Filter by business outcome to find complete multi-agent solutions and specific workflow recipes.
                  </p>
                </div>
              </div>

              {selectedOutcomeCategoryId !== 'all' && (
                <button
                  onClick={() => setSelectedOutcomeCategoryId('all')}
                  className="self-start sm:self-auto text-[11px] text-teal-800 hover:text-teal-950 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                  <span>Clear outcome filter</span>
                </button>
              )}
            </div>

            {/* Outcome Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {OUTCOME_CATEGORIES.map((outcome) => {
                const isActive = selectedOutcomeCategoryId === outcome.id;
                return (
                  <button
                    key={outcome.id}
                    onClick={() => setSelectedOutcomeCategoryId(outcome.id)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-teal-900 text-white font-semibold shadow-xs ring-2 ring-teal-900/20'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {outcome.shortLabel}
                  </button>
                );
              })}
            </div>

            {selectedOutcomeCategoryId !== 'all' && (
              <div className="text-[11px] text-teal-900 bg-teal-100/60 px-3 py-2 rounded-lg border border-teal-200 flex items-center justify-between gap-3">
                <span>
                  Filtering by: <strong>{OUTCOME_CATEGORIES.find((c) => c.id === selectedOutcomeCategoryId)?.label}</strong>
                  {' · '}
                  Found <strong>{filteredBusinessSolutions.length}</strong> solutions and <strong>{filteredWorkflows.length}</strong> workflows.
                </span>
                <button
                  onClick={() => setSelectedOutcomeCategoryId('all')}
                  className="font-bold text-teal-800 hover:text-teal-950 shrink-0"
                >
                  Show all
                </button>
              </div>
            )}
          </div>

          {/* 3. Library Navigation, Search, and Filtering Bar */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Primary View Mode Switcher */}
              <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 self-start">
                <button
                  onClick={() => setLibraryViewMode('solutions')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    libraryViewMode === 'solutions'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                  <span>Business Solutions</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-teal-100 text-teal-800 font-bold">
                    {filteredBusinessSolutions.length}
                  </span>
                </button>

                <button
                  onClick={() => setLibraryViewMode('workflows')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    libraryViewMode === 'workflows'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Workflow className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Specialist Workflows</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-bold">
                    {filteredWorkflows.length}
                  </span>
                </button>

                <button
                  onClick={() => setLibraryViewMode('all')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    libraryViewMode === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>All</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-800 font-bold">
                    {filteredBusinessSolutions.length + filteredWorkflows.length}
                  </span>
                </button>
              </div>

              {/* Search & Complexity Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative w-full sm:w-64">
                  <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={workflowSearchQuery}
                    onChange={(e) => setWorkflowSearchQuery(e.target.value)}
                    placeholder="Search titles, outcomes, tags..."
                    className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-7 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-hidden"
                  />
                  {workflowSearchQuery && (
                    <button
                      onClick={() => setWorkflowSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Complexity Selector */}
                <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-white text-xs">
                  {(['all', 'starter', 'moderate', 'advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setComplexityFilter(lvl)}
                      className={`px-2 py-1 rounded text-[11px] font-medium capitalize transition-colors cursor-pointer ${
                        complexityFilter === lvl
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Functional Category Filters (Active when looking at workflows or all) */}
            {(libraryViewMode === 'workflows' || libraryViewMode === 'all') && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pr-1">
                  Domain:
                </span>
                {workflowCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setWorkflowCategoryFilter(cat)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      workflowCategoryFilter === cat
                        ? 'bg-indigo-900 text-white font-semibold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. BUSINESS SOLUTIONS SECTION */}
          {(libraryViewMode === 'solutions' || libraryViewMode === 'all') && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-teal-700" />
                    <span>Business Solution Packs</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    End-to-end multi-agent playbooks combining multiple coordinated workflows to achieve complete business results.
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {filteredBusinessSolutions.length} available
                </span>
              </div>

              {filteredBusinessSolutions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center space-y-2">
                  <Target className="mx-auto h-7 w-7 text-slate-400" />
                  <div className="text-xs font-bold text-slate-800">No matching business solutions</div>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                    Try clearing your search query or selecting "All Outcomes" to see the full catalog.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedOutcomeCategoryId('all');
                      setWorkflowSearchQuery('');
                      setComplexityFilter('all');
                    }}
                    className="text-xs text-teal-800 font-semibold underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
                  {filteredBusinessSolutions.map((solution) => (
                    <BusinessSolutionCard
                      key={solution.id}
                      solution={solution}
                      employees={employees}
                      onClick={() => {
                        setSelectedSolutionId(solution.id);
                        setIsSolutionDetailOpen(true);
                      }}
                      onPlan={(e) => {
                        e.stopPropagation();
                        openBusinessSolutionSetup(solution.id);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. SPECIALIST WORKFLOWS SECTION */}
          {(libraryViewMode === 'workflows' || libraryViewMode === 'all') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Workflow className="h-4 w-4 text-indigo-700" />
                    <span>Specialist Workflows</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Reusable operating processes executed by specialist chains with human approval checkpoints.
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {filteredWorkflows.length} available
                </span>
              </div>

              {workflowCategoryFilter === 'My templates' ? (
                <div className="space-y-4">
                  {/* Header Bar with Sub-tabs and Create Action */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setPersonalTemplateTab('active')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          personalTemplateTab === 'active'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Active Templates ({activePersonalTemplates.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setPersonalTemplateTab('archived')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          personalTemplateTab === 'archived'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Archived ({archivedPersonalTemplates.length})
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => openWorkflowBuilder()}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Create Custom Workflow</span>
                    </button>
                  </div>

                  {/* Lightweight Versioning & Isolation Notice (Requirement 11 & 12) */}
                  <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200/70 text-teal-950 text-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-teal-700 shrink-0" />
                      <span>
                        Personal templates are isolated to <strong>{activeWorkspace.name}</strong>. Changes apply to future runs. Existing Projects are unchanged.
                      </span>
                    </div>
                    <span className="text-[11px] text-teal-800 font-semibold">
                      Workspace-scoped persistence
                    </span>
                  </div>

                  {filteredWorkflows.length === 0 ? (
                    personalTemplateTab === 'active' ? (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center space-y-3">
                        <Workflow className="mx-auto h-8 w-8 text-slate-400" />
                        <div className="text-sm font-bold text-slate-900">No active custom templates yet</div>
                        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                          Author a custom multi-agent workflow using the Step Sequence Builder, or save an existing project's workflow from the Project details view.
                        </p>
                        <button
                          type="button"
                          onClick={() => openWorkflowBuilder()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Author Custom Workflow</span>
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center space-y-2">
                        <RotateCcw className="mx-auto h-7 w-7 text-slate-400" />
                        <div className="text-sm font-semibold text-slate-900">No archived templates</div>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                          Personal templates you archive will appear here and can be restored back to your active library at any time.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredWorkflows.map((workflow) => (
                        <WorkflowCard
                          key={workflow.id}
                          workflow={workflow}
                          employees={employees}
                          isPersonal={true}
                          isArchived={personalTemplateTab === 'archived'}
                          onClick={() => {
                            setSelectedWorkflowTemplateId(workflow.id);
                            setIsWorkflowDetailOpen(true);
                          }}
                          onLaunch={(e) => {
                            e.stopPropagation();
                            openWorkflowSetup(workflow.id);
                          }}
                          onPreview={(e) => {
                            e.stopPropagation();
                            setSelectedWorkflowTemplateId(workflow.id);
                            setIsWorkflowDetailOpen(true);
                          }}
                          onDuplicate={(e) => {
                            e.stopPropagation();
                            duplicateWorkflowTemplate(workflow.id);
                          }}
                          onEdit={(e) => {
                            e.stopPropagation();
                            openWorkflowBuilder(workflow);
                          }}
                          onArchive={(e) => {
                            e.stopPropagation();
                            archiveWorkflowTemplate(workflow.id);
                          }}
                          onRestore={(e) => {
                            e.stopPropagation();
                            restoreWorkflowTemplate(workflow.id);
                          }}
                          onDelete={(e) => {
                            e.stopPropagation();
                            setTemplateToDelete(workflow);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : filteredWorkflows.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center space-y-2">
                  <Workflow className="mx-auto h-7 w-7 text-slate-400" />
                  <div className="text-xs font-bold text-slate-800">No matching workflows found</div>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                    Try adjusting your domain filter, outcome category, or complexity filter.
                  </p>
                  <button
                    onClick={() => {
                      setWorkflowCategoryFilter('All');
                      setSelectedOutcomeCategoryId('all');
                      setWorkflowSearchQuery('');
                      setComplexityFilter('all');
                    }}
                    className="text-xs text-indigo-800 font-semibold underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWorkflows.map((workflow) => {
                    const isPersonal = workflow.templateSource === 'personal';
                    return (
                      <WorkflowCard
                        key={workflow.id}
                        workflow={workflow}
                        employees={employees}
                        isPersonal={isPersonal}
                        isArchived={workflow.status === 'archived'}
                        onClick={() => {
                          setSelectedWorkflowTemplateId(workflow.id);
                          setIsWorkflowDetailOpen(true);
                        }}
                        onLaunch={(e) => {
                          e.stopPropagation();
                          openWorkflowSetup(workflow.id);
                        }}
                        onPreview={(e) => {
                          e.stopPropagation();
                          setSelectedWorkflowTemplateId(workflow.id);
                          setIsWorkflowDetailOpen(true);
                        }}
                        onDuplicate={(e) => {
                          e.stopPropagation();
                          duplicateWorkflowTemplate(workflow.id);
                        }}
                        onEdit={
                          isPersonal
                            ? (e) => {
                                e.stopPropagation();
                                openWorkflowBuilder(workflow);
                              }
                            : undefined
                        }
                        onArchive={
                          isPersonal
                            ? (e) => {
                                e.stopPropagation();
                                archiveWorkflowTemplate(workflow.id);
                              }
                            : undefined
                        }
                        onDelete={
                          isPersonal
                            ? (e) => {
                                e.stopPropagation();
                                setTemplateToDelete(workflow);
                              }
                            : undefined
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: ROUTINES & ACTIVE AUTOMATIONS (Phase 2C.2B) */}
      {/* ========================================================================= */}
      {workTab === 'routines' && (
        <AutomationsLibraryView />
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

      {/* SAFE DELETE CONFIRMATION MODAL (Requirement 15) */}
      {templateToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Delete Template: {templateToDelete.name || templateToDelete.title}?
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  This removes the reusable template. Existing Project history will remain.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTemplateToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteCustomWorkflowTemplate(templateToDelete.id);
                  setTemplateToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
              >
                Delete Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVE WORKFLOW AS TEMPLATE MODAL (Requirement 16 & 17) */}
      {isSaveProjectAsTemplateModalOpen && currentProject && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">Save Workflow as Template</h3>
              </div>
              <button
                onClick={() => setIsSaveProjectAsTemplateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  value={saveProjectTemplateName}
                  onChange={(e) => setSaveProjectTemplateName(e.target.value)}
                  placeholder="e.g. Weekly Content Production Playbook"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Data Sanitization Guarantee Notice (Requirement 16 & 17) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-600">
                <span className="font-bold text-slate-900 block">Reusable Structure Preserved:</span>
                <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-600">
                  <li>Workflow step sequences and assigned AI employee roles</li>
                  <li>Human role placeholders (e.g. "Project Approver", "Workspace Teammate")</li>
                  <li>Trigger configuration, connection requirements, governance policies & metrics</li>
                </ul>

                <div className="pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span className="font-semibold text-teal-800">Private Data Excluded:</span> Personal contact details, CRM prospect records, approval decisions, comments, and timestamps will not be copied.
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                Changes apply to future runs. Existing Projects are unchanged.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsSaveProjectAsTemplateModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const finalName = saveProjectTemplateName.trim() || `${currentProject.title} Playbook`;
                  saveProjectAsWorkflowTemplate(currentProject.id, finalName);
                  setIsSaveProjectAsTemplateModalOpen(false);
                  setTemplateSaveFeedback(`Saved "${finalName}" to My Templates! Find and run it under My Work → Workflows → My Templates.`);
                }}
                className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
              >
                Save to My Templates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Step Detail Drawer (Phase 2C.2A & 2C.2B) */}
      <WorkflowStepDetailDrawer
        step={selectedStepForDrawer}
        project={currentProject}
        run={currentWorkflowRun}
        onClose={() => setSelectedStepForDrawer(null)}
      />

      {/* Task Detail Modal (Phase 2C.2B) */}
      <TaskDetailModal
        task={selectedTaskForModal}
        project={currentProject}
        onClose={() => setSelectedTaskForModal(null)}
      />
    </div>
  );
};
