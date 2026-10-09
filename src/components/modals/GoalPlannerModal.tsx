import React, { useState, useEffect, useMemo } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  GoalIntent,
  ProjectStage,
  ProjectCollaborator,
  ProjectCollaboratorRole,
  IntegrationProvider
} from '../../types';
import {
  GOAL_INTENT_PROFILES,
  inferGoalIntent,
  GoalIntentProfile
} from '../../data/goalIntents';
import {
  X,
  Target,
  Users,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  DollarSign,
  Globe,
  Share2,
  Bookmark,
  Check,
  CheckCircle2,
  ShieldCheck,
  Workflow,
  Sparkles,
  Layers,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface PlannedTeamMember {
  employeeId: string;
  roleTitle: string;
  responsibility: string;
}

export const GoalPlannerModal: React.FC = () => {
  const {
    isGoalPlannerOpen,
    setIsGoalPlannerOpen,
    goalPlannerInitialGoal,
    setGoalPlannerInitialGoal,
    employees,
    activeWorkspace,
    teamMembers,
    createProject,
    updateProject,
    setSelectedProjectId,
    createProjectTask,
    createApprovalRequest,
    createWorkflowRun,
    navigate,
    setWorkTab,
    workflowTemplates
  } = useOoumph();

  // Wizard Step: 1 = Outcome, 2 = Team, 3 = Plan, 4 = Review
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Outcome State
  const [goal, setGoal] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<GoalIntent>('LEAD_GENERATION');
  const [offer, setOffer] = useState('');
  const [audience, setAudience] = useState('');
  const [geography, setGeography] = useState('');
  const [channels, setChannels] = useState('');
  const [deadline, setDeadline] = useState('30 days');
  const [approximateBudget, setApproximateBudget] = useState('$1,500');

  // Step 2: Team State
  const [plannedTeam, setPlannedTeam] = useState<PlannedTeamMember[]>([]);
  const [selectedAddEmployeeId, setSelectedAddEmployeeId] = useState('');
  const [humanCollaborators, setHumanCollaborators] = useState<ProjectCollaborator[]>([]);
  const [selectedApproverId, setSelectedApproverId] = useState('');

  // Step 3: Plan State
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string | undefined>(undefined);
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [successMetrics, setSuccessMetrics] = useState<string[]>([]);
  const [stages, setStages] = useState<ProjectStage[]>([]);
  const [approvalPolicies, setApprovalPolicies] = useState<string[]>([
    'Ask before external publishing',
    'Ask before sending outbound messages to a new audience',
    'Ask before ad spend or material budget changes',
    'Ask before legal/commercial commitments',
    'Ask before pricing/offer changes'
  ]);

  // Sync when modal opens or initial goal changes
  useEffect(() => {
    if (isGoalPlannerOpen) {
      setWizardStep(1);
      const initialGoal = goalPlannerInitialGoal || 'Generate 100 qualified leads for our leadership programme';
      setGoal(initialGoal);

      // Infer intent locally from text
      const inferred = inferGoalIntent(initialGoal);
      setSelectedIntent(inferred);
      applyIntentProfile(inferred);

      // Human collaborators initialization
      const wsMembers = teamMembers.filter((m) => m.workspaceId === activeWorkspace.id);
      const initialCollabs: ProjectCollaborator[] = wsMembers.map((m, idx) => ({
        teamMemberId: m.id,
        name: m.name,
        email: m.email,
        role: idx === 0 ? 'project_owner' : m.role === 'approver' ? 'approver' : 'contributor'
      }));
      setHumanCollaborators(initialCollabs);
      setSelectedApproverId(wsMembers[0]?.id || '');
    }
  }, [isGoalPlannerOpen, goalPlannerInitialGoal, activeWorkspace.id]);

  // Apply intent profile
  const applyIntentProfile = (intent: GoalIntent) => {
    const profile = GOAL_INTENT_PROFILES[intent] || GOAL_INTENT_PROFILES.CUSTOM;

    // Build team
    const newTeam: PlannedTeamMember[] = [];
    profile.recommendedTeam.forEach((item) => {
      const emp = employees.find((e) => e.code === item.employeeCode);
      if (emp) {
        newTeam.push({
          employeeId: emp.id,
          roleTitle: item.roleTitle,
          responsibility: item.defaultResponsibility
        });
      }
    });
    setPlannedTeam(newTeam);

    // Build stages
    const newStages: ProjectStage[] = profile.proposedStages.map((st, i) => ({
      id: `stage-${i + 1}`,
      name: st.name,
      ownerEmployeeCode: st.ownerEmployeeCode,
      status: 'pending',
      description: st.description,
      type: st.type
    }));
    setStages(newStages);

    // Playbook & metrics
    setSelectedPlaybookId(profile.recommendedPlaybookId);
    setDeliverables(profile.deliverables);
    setSuccessMetrics(profile.successMetrics);

    // Parameters default
    if (intent === 'WEBSITE_LAUNCH') {
      setOffer(activeWorkspace.name + ' Flagship Course Enrollment');
      setAudience(activeWorkspace.audience || 'Directors & Senior Executives');
      setChannels('Direct Website, Google Search');
      setApproximateBudget('$500');
    } else if (intent === 'ECOMMERCE_GROWTH') {
      setOffer('Heritage Handcrafted Catalog Line');
      setAudience('Discerning lifestyle buyers');
      setChannels('Instagram, Meta Dynamic Feed, Email');
      setApproximateBudget('$1,200');
    } else if (intent === 'OUTBOUND_SALES') {
      setOffer('Corporate B2B Cohort Training Package');
      setAudience('VP Operations, Chief People Officers');
      setChannels('Personalized 3-Touch Email Cadence');
      setApproximateBudget('$400');
    } else {
      setOffer(activeWorkspace.products?.[0]?.name || 'Executive Tactical Fellowship ($8,500)');
      setAudience(activeWorkspace.audience || 'Operations Directors & Founders');
      setChannels('LinkedIn, Meta Ads, Email Sequence');
      setApproximateBudget('$1,500');
    }
  };

  const currentProfile = useMemo(() => {
    return GOAL_INTENT_PROFILES[selectedIntent] || GOAL_INTENT_PROFILES.CUSTOM;
  }, [selectedIntent]);

  if (!isGoalPlannerOpen) return null;

  // Handlers
  const handleIntentChange = (newIntent: GoalIntent) => {
    setSelectedIntent(newIntent);
    applyIntentProfile(newIntent);
  };

  const handleGoalBlur = () => {
    if (goal.trim()) {
      const inferred = inferGoalIntent(goal);
      if (inferred !== selectedIntent) {
        setSelectedIntent(inferred);
        applyIntentProfile(inferred);
      }
    }
  };

  const handleRemoveEmployee = (empId: string) => {
    setPlannedTeam((prev) => prev.filter((item) => item.employeeId !== empId));
  };

  const handleAddEmployee = () => {
    if (!selectedAddEmployeeId) return;
    const emp = employees.find((e) => e.id === selectedAddEmployeeId);
    if (!emp) return;
    if (plannedTeam.some((item) => item.employeeId === emp.id)) return;

    setPlannedTeam((prev) => [
      ...prev,
      {
        employeeId: emp.id,
        roleTitle: emp.title,
        responsibility: `Contribute specialist expertise in ${emp.capabilities[0] || emp.category}`
      }
    ]);
    setSelectedAddEmployeeId('');
  };

  const handleUpdateResponsibility = (empId: string, text: string) => {
    setPlannedTeam((prev) =>
      prev.map((item) => (item.employeeId === empId ? { ...item, responsibility: text } : item))
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setPlannedTeam((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= plannedTeam.length - 1) return;
    setPlannedTeam((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleUpdateCollaboratorRole = (memberId: string, role: ProjectCollaboratorRole) => {
    setHumanCollaborators((prev) =>
      prev.map((c) => (c.teamMemberId === memberId ? { ...c, role } : c))
    );
  };

  const toggleApprovalPolicy = (policy: string) => {
    setApprovalPolicies((prev) =>
      prev.includes(policy) ? prev.filter((p) => p !== policy) : [...prev, policy]
    );
  };

  const handleCreateProject = (initialStatus: 'ready' | 'planning' = 'ready') => {
    if (!goal.trim()) return;

    const responsibilitiesMap: Record<string, string> = {};
    plannedTeam.forEach((item) => {
      responsibilitiesMap[item.employeeId] = item.responsibility;
    });

    const leadEmployee = employees.find((e) => e.id === plannedTeam[0]?.employeeId);

    // Initial handoff statement
    const firstEmp = employees.find((e) => e.id === plannedTeam[0]?.employeeId);
    const secondEmp = employees.find((e) => e.id === plannedTeam[1]?.employeeId);
    const initialHandoffs = firstEmp && secondEmp ? [
      {
        fromCode: firstEmp.code,
        toCode: secondEmp.code,
        message: `${firstEmp.name} (${firstEmp.title}) is scheduled to complete initial milestone and hand off deliverables to ${secondEmp.name} (${secondEmp.title}).`,
        timestamp: new Date().toISOString()
      }
    ] : [];

    const newProjectId = createProject({
      workspaceId: activeWorkspace.id,
      title: goal.length > 55 ? `${goal.slice(0, 52)}...` : goal,
      objective: goal,
      status: initialStatus,
      intent: selectedIntent,
      workflowTemplateId: selectedPlaybookId,
      participatingEmployeeIds: plannedTeam.map((item) => item.employeeId),
      offer: offer.trim() || undefined,
      audience: audience.trim() || undefined,
      geography: geography.trim() || undefined,
      channels: channels ? channels.split(',').map((c) => c.trim()).filter(Boolean) : undefined,
      approximateBudget: approximateBudget.trim() || undefined,
      employeeResponsibilities: responsibilitiesMap,
      stages,
      deliverables,
      successMetrics,
      requiredConnections: currentProfile.requiredConnections,
      approvalPolicies,
      humanApproverId: selectedApproverId || undefined,
      collaborators: humanCollaborators,
      handoffs: initialHandoffs,
      nextImportantAction: leadEmployee
        ? `Ready to start: ${leadEmployee.name} (${leadEmployee.title}) will activate first stage "${stages[0]?.name || 'Initial Phase'}".`
        : 'Team plan assembled. Click "Start project" when ready to begin execution.',
      progressSummary: initialStatus === 'ready'
        ? `Project configured with ${plannedTeam.length} AI specialists and ${humanCollaborators.length} teammates. Ready to start.`
        : 'Plan saved in draft mode.',
      tags: [currentProfile.label, 'Multi-Agent', activeWorkspace.industry]
    });

    // 1. Create and attach WorkflowRun if a playbook or stages are defined
    const matchedTemplate = workflowTemplates.find((t) => t.id === selectedPlaybookId);
    const runTitle = `${goal.length > 40 ? `${goal.slice(0, 37)}...` : goal} Execution`;
    const runSteps = matchedTemplate
      ? matchedTemplate.expectedSteps.map((step, idx) => ({
          id: `step-${newProjectId}-${idx + 1}`,
          title: step.title,
          type: step.type,
          employeeCode: step.employeeCode,
          employeeId: employees.find((e) => e.code === step.employeeCode)?.id,
          description: step.description,
          status: 'pending' as const
        }))
      : stages.map((st, idx) => ({
          id: `step-${newProjectId}-${idx + 1}`,
          title: st.name,
          type: (st.type || 'employee_task') as any,
          employeeCode: st.ownerEmployeeCode,
          employeeId: employees.find((e) => e.code === st.ownerEmployeeCode)?.id,
          description: st.description || `Execute milestone: ${st.name}`,
          status: 'pending' as const
        }));

    const createdRunId = createWorkflowRun({
      workspaceId: activeWorkspace.id,
      templateId: selectedPlaybookId || 'custom-plan',
      templateName: matchedTemplate?.name || currentProfile.label,
      title: runTitle,
      status: initialStatus === 'ready' ? 'ready_to_start' : 'paused',
      projectId: newProjectId,
      currentStepIndex: 0,
      steps: runSteps,
      startedAt: new Date().toISOString()
    });

    updateProject(newProjectId, { workflowRunId: createdRunId });

    // 2. Create project-scoped tasks for each stage that involves employee execution
    stages.forEach((st) => {
      if (st.type !== 'human_approval') {
        const emp = employees.find((e) => e.code === st.ownerEmployeeCode) || employees[0];
        createProjectTask({
          workspaceId: activeWorkspace.id,
          projectId: newProjectId,
          title: st.name,
          employeeId: emp.id,
          employeeName: emp.name,
          employeeCode: emp.code,
          status: 'pending',
          category: emp.category,
          description: st.description || `Specialist task for milestone: ${st.name}`,
          outputData: { deliverables, successMetrics, intent: selectedIntent }
        });
      }
    });

    // 3. Create initial approval policy expectation in approvals queue
    const approverMember = teamMembers.find((m) => m.id === selectedApproverId);
    const approverName = approverMember ? approverMember.name : 'Workspace Owner';
    createApprovalRequest({
      workspaceId: activeWorkspace.id,
      projectId: newProjectId,
      workflowRunId: createdRunId,
      title: `Execution Policy Gate: ${goal.length > 32 ? `${goal.slice(0, 30)}...` : goal}`,
      summary: `Governance signoff for project execution. ${approvalPolicies.length} policy rules require human authorization before any external live distribution or ad spend.`,
      employeeId: leadEmployee?.id || employees[0].id,
      employeeName: leadEmployee?.name || 'Initiative Lead',
      employeeCode: leadEmployee?.code || 'A08',
      artifactType: 'Project Governance Policy',
      artifactPayload: {
        projectTitle: goal,
        intent: selectedIntent,
        requiredApprover: approverName,
        enforcedPolicies: approvalPolicies,
        budgetCap: approximateBudget || 'N/A'
      },
      status: 'pending',
      riskLevel: 'Medium',
      contextNote: `Waiting for ${approverName} to confirm policy constraints before live milestones execute.`
    });

    setSelectedProjectId(newProjectId);
    setGoalPlannerInitialGoal('');
    setIsGoalPlannerOpen(false);
    setWorkTab('projects');
    navigate('work');
  };

  const availableEmployees = employees.filter(
    (e) => !plannedTeam.some((item) => item.employeeId === e.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Wizard Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-950">Plan with my team</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                  Step {wizardStep} of 4: {wizardStep === 1 ? 'Outcome' : wizardStep === 2 ? 'Team' : wizardStep === 3 ? 'Plan' : 'Review'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {wizardStep === 1 && 'Define your objective and business parameters.'}
                {wizardStep === 2 && 'Assemble your AI specialists and human collaborators.'}
                {wizardStep === 3 && 'Verify execution stages, deliverables, connections & approval gates.'}
                {wizardStep === 4 && 'Final review before establishing your project.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsGoalPlannerOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Stepper Bar */}
        <div className="flex border-b border-slate-200 bg-white shrink-0 text-xs font-medium text-slate-500">
          {[
            { step: 1, label: '1. Outcome' },
            { step: 2, label: '2. Team' },
            { step: 3, label: '3. Plan' },
            { step: 4, label: '4. Review' }
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => {
                if (wizardStep > item.step || goal.trim()) setWizardStep(item.step as any);
              }}
              className={`flex-1 py-2.5 px-4 text-center border-b-2 transition-colors cursor-pointer ${
                wizardStep === item.step
                  ? 'border-slate-900 text-slate-950 font-bold bg-slate-50/50'
                  : wizardStep > item.step
                  ? 'border-teal-600 text-teal-800 font-semibold'
                  : 'border-transparent text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ========================================================================= */}
          {/* STAGE 1: OUTCOME */}
          {/* ========================================================================= */}
          {wizardStep === 1 && (
            <div className="space-y-5 animate-fade-in text-xs">
              {/* Goal Input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-900 text-xs block">
                  What is your business goal? <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  onBlur={handleGoalBlur}
                  placeholder="e.g. Generate 100 qualified leads for our leadership programme"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-hidden shadow-2xs"
                />
                <p className="text-[11px] text-slate-500">
                  Describe what outcome you want. Ooumph automatically recommends an intent solution, specialists, and milestones.
                </p>
              </div>

              {/* Goal Intent Selection (Use-Case Aware) */}
              <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-teal-700" />
                    <span className="font-bold text-teal-950 text-xs">Recognized Business Solution:</span>
                  </div>

                  <select
                    value={selectedIntent}
                    onChange={(e) => handleIntentChange(e.target.value as GoalIntent)}
                    className="rounded-lg border border-teal-300 bg-white px-3 py-1.5 text-xs font-semibold text-teal-900 focus:outline-hidden cursor-pointer"
                  >
                    {Object.keys(GOAL_INTENT_PROFILES).map((key) => (
                      <option key={key} value={key}>
                        {GOAL_INTENT_PROFILES[key as GoalIntent].label}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-teal-900 text-[11px] leading-relaxed">
                  {currentProfile.description}
                </p>
              </div>

              {/* Business Parameters Grid */}
              <div className="space-y-2 pt-2">
                <div className="font-bold text-slate-900 text-xs">Business Parameters (Optional)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Offer / Product</label>
                    <input
                      type="text"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                      placeholder="e.g. Executive Fellowship Winter Cohort"
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Audience</label>
                    <input
                      type="text"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="e.g. Mid-to-Senior Operations Directors"
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Geography / Market</label>
                    <input
                      type="text"
                      value={geography}
                      onChange={(e) => setGeography(e.target.value)}
                      placeholder="e.g. United States & Canada"
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Channels</label>
                    <input
                      type="text"
                      value={channels}
                      onChange={(e) => setChannels(e.target.value)}
                      placeholder="e.g. LinkedIn, Meta Ads, Email"
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Approximate Budget</label>
                    <input
                      type="text"
                      value={approximateBudget}
                      onChange={(e) => setApproximateBudget(e.target.value)}
                      placeholder="e.g. $1,500"
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Deadline</label>
                    <input
                      type="text"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      placeholder="e.g. 30 days"
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 2: TEAM (AI & Human Collaboration) */}
          {/* ========================================================================= */}
          {wizardStep === 2 && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* AI Specialists Roster */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Recommended AI Specialists ({plannedTeam.length})
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Specialists selected specifically for "{currentProfile.label}". Reorder stages or customize responsibilities.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border border-slate-200 rounded-xl p-2 bg-slate-50/40">
                  {plannedTeam.map((item, index) => {
                    const emp = employees.find((e) => e.id === item.employeeId);
                    if (!emp) return null;

                    return (
                      <div
                        key={emp.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-3 shrink-0 sm:w-56">
                          <div className={`h-8 w-8 rounded-lg ${emp.avatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                            {emp.code}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate">{emp.name}</div>
                            <div className="text-[11px] text-slate-500 truncate">{item.roleTitle}</div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={item.responsibility}
                            onChange={(e) => handleUpdateResponsibility(emp.id, e.target.value)}
                            className="w-full rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                            title="Click to customize specialist responsibility"
                          />
                        </div>

                        <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === plannedTeam.length - 1}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveEmployee(emp.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 ml-1 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {availableEmployees.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    <select
                      value={selectedAddEmployeeId}
                      onChange={(e) => setSelectedAddEmployeeId(e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-slate-400 focus:outline-hidden"
                    >
                      <option value="">+ Add another AI specialist to plan...</option>
                      {availableEmployees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} ({emp.title} · {emp.category})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddEmployee}
                      disabled={!selectedAddEmployeeId}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-800 disabled:opacity-40 cursor-pointer"
                    >
                      Add to plan
                    </button>
                  </div>
                )}
              </div>

              {/* Human Collaborators & Approvers (Requirement E) */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Human Teammates & Collaborators
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    Assign roles to human teammates participating in or approving this project.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden">
                  {humanCollaborators.map((collab) => (
                    <div key={collab.teamMemberId} className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                          {collab.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{collab.name}</div>
                          <div className="text-[11px] text-slate-500">{collab.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={collab.role}
                          onChange={(e) => handleUpdateCollaboratorRole(collab.teamMemberId, e.target.value as ProjectCollaboratorRole)}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-800 focus:bg-white"
                        >
                          <option value="project_owner">Project Owner</option>
                          <option value="contributor">Contributor</option>
                          <option value="approver">Approver</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary Approver Picker */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-xs text-amber-950">
                  <div>
                    <span className="font-bold block">Designated Human Approver</span>
                    <span className="text-[11px] text-amber-800">
                      Authorizes high-stakes gates (publishing, ad budget, commercial offers).
                    </span>
                  </div>

                  <select
                    value={selectedApproverId}
                    onChange={(e) => setSelectedApproverId(e.target.value)}
                    className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-hidden"
                  >
                    {humanCollaborators.map((c) => (
                      <option key={c.teamMemberId} value={c.teamMemberId}>
                        {c.name} ({c.role.replace('_', ' ')})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 3: PLAN (Stages, Deliverables, Connections & Approval Gates) */}
          {/* ========================================================================= */}
          {wizardStep === 3 && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Linked Playbook */}
              {selectedPlaybookId && (
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-indigo-700" />
                    <div>
                      <div className="font-bold text-indigo-950 text-xs">Attached Workflow Recipe</div>
                      <div className="text-[11px] text-indigo-800">{currentProfile.recommendedPlaybookName}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded">
                    Repeatable Playbook
                  </span>
                </div>
              )}

              {/* Proposed Stages */}
              <div className="space-y-2.5">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Proposed Milestone Stages ({stages.length})
                </div>

                <div className="space-y-2">
                  {stages.map((st, i) => (
                    <div
                      key={st.id}
                      className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{st.name}</span>
                            {st.type === 'human_approval' && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-semibold">
                                Approval Gate
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{st.description}</div>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded shrink-0">
                        {st.ownerEmployeeCode}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables & Success Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
                    Expected Deliverables
                  </span>
                  <ul className="space-y-1.5 text-slate-700 text-[11px]">
                    {deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
                    Success Metrics (Target)
                  </span>
                  <ul className="space-y-1.5 text-slate-700 text-[11px]">
                    {successMetrics.map((m, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Required Connections Status */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
                  Required Channel Connections
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentProfile.requiredConnections.map((conn, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-800 font-medium">{conn.label}</span>
                      <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                        Simulated Ready
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Human Approval Policy Gates (Requirement D) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
                    Default Human Approval Policy Gates
                  </span>
                  <span className="text-slate-400 text-[11px]">Enforces safety before execution</span>
                </div>

                <div className="space-y-2">
                  {[
                    'Ask before external publishing',
                    'Ask before sending outbound messages to a new audience',
                    'Ask before ad spend or material budget changes',
                    'Ask before legal/commercial commitments',
                    'Ask before pricing/offer changes'
                  ].map((policy) => {
                    const isChecked = approvalPolicies.includes(policy);
                    return (
                      <label
                        key={policy}
                        onClick={() => toggleApprovalPolicy(policy)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'border-slate-900 bg-slate-50/70 text-slate-900 font-medium'
                            : 'border-slate-200 bg-white text-slate-500'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded border-slate-300 text-slate-900 focus:ring-0"
                        />
                        <span>{policy}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 4: REVIEW & CONFIRMATION */}
          {/* ========================================================================= */}
          {wizardStep === 4 && (
            <div className="space-y-6 animate-fade-in text-xs">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded uppercase tracking-wider">
                      {currentProfile.label}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2">{goal}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{currentProfile.description}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    Ready to Start
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Target Offer</span>
                    <strong className="text-slate-800">{offer || 'Custom'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Audience</span>
                    <strong className="text-slate-800">{audience || 'All'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Budget Cap</span>
                    <strong className="text-slate-800">{approximateBudget || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Deadline</span>
                    <strong className="text-slate-800">{deadline || '30 days'}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Specialists & Collaborators</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      {plannedTeam.slice(0, 5).map((t) => {
                        const emp = employees.find((e) => e.id === t.employeeId);
                        if (!emp) return null;
                        return (
                          <span
                            key={emp.id}
                            className={`h-5 w-5 rounded-full ${emp.avatarColor} text-white font-bold text-[8px] flex items-center justify-center`}
                            title={`${emp.name} (${emp.title})`}
                          >
                            {emp.code}
                          </span>
                        );
                      })}
                      {plannedTeam.length > 5 && (
                        <span className="text-[10px] text-slate-500 font-semibold">
                          +{plannedTeam.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Approval Gates Configured</span>
                    <span className="font-semibold text-slate-900">{approvalPolicies.length} active policy rules</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 text-xs text-teal-950 flex items-start gap-3">
                <Info className="h-4 w-4 text-teal-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Initial State:</strong> Creating this project sets it to <em>"Ready to start"</em>.
                  No external publishing or execution will happen until you click <strong>"Start project"</strong> on the overview screen.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50 shrink-0">
          <div>
            {wizardStep > 1 ? (
              <button
                type="button"
                onClick={() => setWizardStep((prev) => (prev - 1) as any)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleCreateProject('planning')}
                disabled={!goal.trim()}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Save plan for later</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsGoalPlannerOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {wizardStep < 4 ? (
              <button
                type="button"
                onClick={() => setWizardStep((prev) => (prev + 1) as any)}
                disabled={!goal.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleCreateProject('ready')}
                disabled={!goal.trim()}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-950 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <span>Create project</span>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
