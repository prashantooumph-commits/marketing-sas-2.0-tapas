import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { Employee, EmployeeCategory } from '../../types';
import { CustomEmployeeModal } from '../modals/CustomEmployeeModal';
import {
  Search,
  Sparkles,
  ArrowRight,
  Pin,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Send,
  Layers,
  TrendingUp,
  Plug,
  Target,
  User,
  Workflow,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export const TeamHomeView: React.FC = () => {
  const {
    employees,
    selectEmployee,
    approvals,
    navigate,
    activeWorkspace,
    sendMessage,
    projects,
    deals,
    scheduledMeetings,
    setWorkTab,
    setIsGoalPlannerOpen,
    setGoalPlannerInitialGoal,
    setIsProductGuideOpen
  } = useOoumph();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [globalTaskInput, setGlobalTaskInput] = useState('');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [clarificationPrompt, setClarificationPrompt] = useState<{
    text: string;
    singleCandidateId: string;
  } | null>(null);

  // Pending decisions
  const pendingApprovals = approvals.filter((a) => a.status === 'pending');

  // Filtered employees
  const categories = [
    'All',
    'Core',
    'Sales Operations',
    'Growth & Marketing',
    'Content & Creative',
    'Operations & Support',
    'Strategy & Commerce'
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || emp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const coreTeam = employees.filter(
    (e) => e.pinned || ['A01', 'A02', 'A05', 'A16', 'A17', 'A23'].includes(e.code)
  );

  // LIGHTWEIGHT LOCAL DEMO CLASSIFIER
  const classifyIntent = (
    text: string
  ): {
    outcome: 'SINGLE_EMPLOYEE' | 'BUSINESS_GOAL' | 'WORKFLOW_INTENT' | 'AMBIGUOUS';
    employeeCode?: string;
    workflowId?: string;
  } => {
    const lower = text.toLowerCase().trim();

    // 1. Workflow Intent patterns
    if (
      lower.includes('weekly content') ||
      lower.includes('content engine') ||
      lower.includes('run weekly') ||
      lower.includes('proven workflow') ||
      lower.includes('workflow template') ||
      (lower.includes('workflow') && !lower.includes('goal'))
    ) {
      return { outcome: 'WORKFLOW_INTENT', workflowId: 'wf-content-engine' };
    }
    if (lower.includes('comment to lead') || lower.includes('comment to guide') || lower.includes('flagship funnel')) {
      return { outcome: 'WORKFLOW_INTENT', workflowId: 'wf-comment-to-lead' };
    }
    if (lower.includes('outbound sales campaign') || lower.includes('sales campaign workflow')) {
      return { outcome: 'WORKFLOW_INTENT', workflowId: 'wf-outbound-sales' };
    }

    // 2. Business Goal patterns (multi-employee collaboration)
    if (
      lower.includes('launch') ||
      lower.includes('generate leads') ||
      lower.includes('generate 100') ||
      lower.includes('leads for') ||
      lower.includes('programme') ||
      lower.includes('program') ||
      lower.includes('enquiries') ||
      lower.includes('campaign to') ||
      lower.includes('acquire clients') ||
      lower.includes('q4') ||
      lower.includes('business goal') ||
      lower.includes('grow revenue') ||
      lower.includes('cohort launch') ||
      lower.includes('scale our') ||
      lower.includes('team plan')
    ) {
      return { outcome: 'BUSINESS_GOAL' };
    }

    // 3. Single Employee discrete tasks
    if (lower.includes('caption') || lower.includes('post') || lower.includes('linkedin') || lower.includes('instagram') || lower.includes('tweet') || lower.includes('social')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A02' }; // Soren Miller
    }
    if (lower.includes('nda') || lower.includes('contract') || lower.includes('clause') || lower.includes('legal') || lower.includes('terms of service')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A06' }; // Linda Cross
    }
    if (lower.includes('call') || lower.includes('phone') || lower.includes('voicemail') || lower.includes('receptionist') || lower.includes('greeting')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A05' }; // Rachel Ross
    }
    if (lower.includes('article') || lower.includes('seo') || lower.includes('blog') || lower.includes('keyword') || lower.includes('editorial')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A03' }; // Penny Thorne
    }
    if (lower.includes('csv') || lower.includes('enrich') || lower.includes('prospect list') || lower.includes('scout')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A04' }; // Stan Bradley
    }
    if (lower.includes('landing page') || lower.includes('website') || lower.includes('headline rollback') || lower.includes('hero copy')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A07' }; // Walter Hayes
    }
    if (lower.includes('ad budget') || lower.includes('meta ad') || lower.includes('facebook ad') || lower.includes('google ad')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A24' }; // Maya Lin
    }
    if (lower.includes('proposal') || lower.includes('commercial quote') || lower.includes('quotation') || lower.includes('scope table')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A31' }; // Preston Shaw
    }
    if (lower.includes('support') || lower.includes('ticket') || lower.includes('faq answer') || lower.includes('refund request')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A11' }; // Clara Diaz
    }
    if (lower.includes('okr') || lower.includes('reflection') || lower.includes('journal') || lower.includes('personal coach')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A15' }; // Grace Sterling
    }
    if (lower.includes('email') || lower.includes('calendar') || lower.includes('schedule meeting') || lower.includes('briefing')) {
      return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A01' }; // Aria Vance
    }

    // If text has some length but isn't a crisp single-keyword match, mark ambiguous
    if (lower.split(' ').length >= 3) {
      return { outcome: 'AMBIGUOUS', employeeCode: 'A01' };
    }

    // Default short phrase to Aria Vance (Executive Assistant)
    return { outcome: 'SINGLE_EMPLOYEE', employeeCode: 'A01' };
  };

  const handleGlobalTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalTaskInput.trim()) return;

    setClarificationPrompt(null);
    const classification = classifyIntent(globalTaskInput);

    if (classification.outcome === 'BUSINESS_GOAL') {
      setGoalPlannerInitialGoal(globalTaskInput);
      setIsGoalPlannerOpen(true);
      setGlobalTaskInput('');
    } else if (classification.outcome === 'WORKFLOW_INTENT') {
      setWorkTab('workflows');
      navigate('work');
      setGlobalTaskInput('');
    } else if (classification.outcome === 'SINGLE_EMPLOYEE') {
      const target = employees.find((emp) => emp.code === classification.employeeCode) || employees[0];
      if (target) {
        sendMessage(target.id, globalTaskInput);
        selectEmployee(target.id);
        setGlobalTaskInput('');
      }
    } else if (classification.outcome === 'AMBIGUOUS') {
      const defaultEmp = employees.find((emp) => emp.code === classification.employeeCode) || employees[0];
      setClarificationPrompt({
        text: globalTaskInput,
        singleCandidateId: defaultEmp.id
      });
    }
  };

  const handleConfirmSingleEmployee = () => {
    if (!clarificationPrompt) return;
    sendMessage(clarificationPrompt.singleCandidateId, clarificationPrompt.text);
    selectEmployee(clarificationPrompt.singleCandidateId);
    setClarificationPrompt(null);
    setGlobalTaskInput('');
  };

  const handleConfirmTeamPlan = () => {
    if (!clarificationPrompt) return;
    setGoalPlannerInitialGoal(clarificationPrompt.text);
    setIsGoalPlannerOpen(true);
    setClarificationPrompt(null);
    setGlobalTaskInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* 1. First-Fold Three Ways to Start Work */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        {/* Header Strip with Guide Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {activeWorkspace.name} · Operating System
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-950 mt-0.5">
              What do you want to get done?
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProductGuideOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50/70 hover:bg-teal-100 px-3 py-1.5 text-xs font-semibold text-teal-900 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5 text-teal-700" />
              <span>How Ooumph works</span>
            </button>

            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              <UserPlus className="h-3.5 w-3.5 text-slate-500" />
              <span>Create helper</span>
            </button>
          </div>
        </div>

        {/* THREE DIFFERENTIATED OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* OPTION 1: ASK ONE EMPLOYEE */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  Focused Task
                </span>
                <User className="h-4 w-4 text-slate-500" />
              </div>

              <h2 className="text-sm font-bold text-slate-950">Ask One Employee</h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                Best for one focused task. Delegate directly to a specialist like your copywriter, legal assistant, or social publisher.
              </p>

              <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80 italic">
                Example: "Write a LinkedIn post about our workshop."
              </div>
            </div>

            <button
              onClick={() => {
                const defaultEmp = employees.find((e) => e.code === 'A02') || employees[0];
                selectEmployee(defaultEmp.id);
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer shadow-2xs"
            >
              <span>Choose employee / Start task</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* OPTION 2: START A BUSINESS GOAL */}
          <div className="rounded-xl border border-teal-300 bg-teal-50/30 p-5 flex flex-col justify-between space-y-4 hover:border-teal-400 transition-all ring-1 ring-teal-500/10">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                  Team Collaboration
                </span>
                <Target className="h-4 w-4 text-teal-700" />
              </div>

              <h2 className="text-sm font-bold text-slate-950">Start a Business Goal</h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                Best when multiple employees need to collaborate. Ooumph suggests a coordinated team, clear responsibilities, and an execution plan.
              </p>

              <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-teal-200/80 italic">
                Example: "Generate 100 qualified leads for our leadership programme."
              </div>
            </div>

            <button
              onClick={() => {
                setGoalPlannerInitialGoal('Generate qualified leadership-programme enquiries');
                setIsGoalPlannerOpen(true);
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <span>Plan with my team</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* OPTION 3: USE A PROVEN WORKFLOW */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
                  Repeatable Process
                </span>
                <Workflow className="h-4 w-4 text-indigo-600" />
              </div>

              <h2 className="text-sm font-bold text-slate-950">Use a Proven Workflow</h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                Best for repeatable business processes like weekly content distribution, product launches, comment funnels, and outbound sales.
              </p>

              <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                <span className="font-medium text-slate-900">Proven recipes:</span> Content Engine · Product Launch · Comment to Lead · Outbound
              </div>
            </div>

            <button
              onClick={() => {
                setWorkTab('workflows');
                navigate('work');
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer shadow-2xs"
            >
              <span>Browse workflows</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* COMPOSER DELEGATION FORM WITH LOCAL CLASSIFIER */}
        <div className="pt-2">
          <form onSubmit={handleGlobalTaskSubmit} className="relative">
            <input
              type="text"
              value={globalTaskInput}
              onChange={(e) => {
                setGlobalTaskInput(e.target.value);
                if (clarificationPrompt) setClarificationPrompt(null);
              }}
              placeholder="Or type directly: e.g. 'Write an Instagram caption' or 'Launch our new cohort and generate leads'..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-4 pr-28 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden transition-all shadow-2xs"
            />
            <button
              type="submit"
              className="absolute right-2 top-2.5 flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Delegate</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* CLARIFICATION CONFIRMATION PROMPT IF AMBIGUOUS */}
          {clarificationPrompt && (
            <div className="mt-3 p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
              <div>
                <span className="font-semibold block">Would you like one employee to handle this, or should I build a team plan?</span>
                <span className="text-amber-800 text-[11px]">"{clarificationPrompt.text}"</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleConfirmSingleEmployee}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100/50 text-slate-800 font-medium transition-colors cursor-pointer"
                >
                  Assign to single employee
                </button>
                <button
                  type="button"
                  onClick={handleConfirmTeamPlan}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors cursor-pointer"
                >
                  Build a team plan
                </button>
              </div>
            </div>
          )}

          {/* Quick Task Shortcuts */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">Quick starts:</span>
            {[
              { label: 'Morning executive briefing', code: 'A01' },
              { label: 'Draft LinkedIn thought leadership', code: 'A02' },
              { label: 'Review consulting NDA', code: 'A06' },
              { label: 'Test Flagship Guide PDF loop', code: 'A23' },
              { label: 'Import B2B lead CSV', code: 'A04' }
            ].map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const emp = employees.find((e) => e.code === item.code);
                  if (emp) selectEmployee(emp.id);
                }}
                className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-slate-700 hover:border-slate-300 hover:text-slate-950 transition-colors shadow-2xs text-[11px] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Urgent Decisions Strip ("What do I need to decide?") */}
      {pendingApprovals.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-700" />
              <span className="text-xs font-semibold text-amber-950 uppercase tracking-wider">
                Decisions Awaiting Your Review ({pendingApprovals.length})
              </span>
            </div>
            <button
              onClick={() => navigate('inbox')}
              className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Open Review Inbox</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pendingApprovals.slice(0, 3).map((appr) => (
              <div
                key={appr.id}
                onClick={() => navigate('inbox')}
                className="cursor-pointer rounded-lg border border-amber-200 bg-white p-3 shadow-2xs hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-medium text-slate-700">{appr.employeeName}</span>
                  <span className="text-amber-700 font-semibold">{appr.riskLevel} Risk</span>
                </div>
                <div className="text-xs font-semibold text-slate-900 line-clamp-1">{appr.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{appr.summary}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Connective Operating System Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div
          onClick={() => {
            navigate('work');
            setWorkTab('projects');
          }}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-teal-600" />
              <span>Shared Projects</span>
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
              {projects.filter((p) => p.workspaceId === activeWorkspace.id).length} Active
            </span>
          </div>
          <p className="text-xs text-slate-600 line-clamp-1">
            {projects.find((p) => p.workspaceId === activeWorkspace.id)?.title || 'Q4 Executive Fellowship Cohort Launch'}
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-teal-700 font-medium group-hover:translate-x-0.5 transition-transform">
            <span>View project initiatives</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>

        <div
          onClick={() => navigate('sales')}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
              <span>Sales Pipeline & Revenue</span>
            </span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.2 rounded font-semibold tabular-nums">
              ${deals
                .filter((d) => d.workspaceId === activeWorkspace.id && d.stage !== 'Closed Won')
                .reduce((acc, d) => acc + d.value, 0)
                .toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-slate-600 line-clamp-1">
            {scheduledMeetings.filter((m) => m.workspaceId === activeWorkspace.id && m.status === 'scheduled').length} upcoming discovery meetings protected
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-indigo-700 font-medium group-hover:translate-x-0.5 transition-transform">
            <span>Open sales hub</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>

        <div
          onClick={() => navigate('settings')}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Plug className="h-3.5 w-3.5 text-blue-600" />
              <span>Connected Channels</span>
            </span>
            <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-1.5 py-0.2 rounded font-semibold">
              Live Simulated
            </span>
          </div>
          <p className="text-xs text-slate-600 line-clamp-1">
            Meta Suite, LinkedIn, G-Suite, Twilio & Stripe operational
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-blue-700 font-medium group-hover:translate-x-0.5 transition-transform">
            <span>Configure settings</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* 4. Recommended Core Team */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recommended Core Team</h2>
            <p className="text-xs text-slate-500">Your primary day-to-day operational employees.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreTeam.slice(0, 6).map((emp) => (
            <div
              key={emp.id}
              onClick={() => selectEmployee(emp.id)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4.5 hover:border-slate-400 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-xs ${emp.avatarColor}`}>
                      {emp.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-900">{emp.name}</span>
                        <span className="text-[10px] font-semibold text-slate-500 border border-slate-200 px-1 py-0.2 rounded">
                          {emp.code}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-600">{emp.title}</div>
                    </div>
                  </div>
                  {emp.pinned && <Pin className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />}
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {emp.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">{emp.capabilities.length} capabilities</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Workspace</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Complete Specialists Directory */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">All Specialists Directory</h2>
            <p className="text-xs text-slate-500">
              Browse all {employees.length} capabilities spanning sales, marketing, operations, legal, and content.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, name, or skill..."
              className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => selectEmployee(emp.id)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3.5 hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-white font-bold text-xs shrink-0 ${emp.avatarColor}`}>
                    {emp.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">{emp.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{emp.code}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">{emp.title}</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {emp.bio}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{emp.category}</span>
                <span className="font-medium text-slate-800 hover:underline">Open →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CustomEmployeeModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </div>
  );
};
