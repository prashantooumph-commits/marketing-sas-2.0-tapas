import React, { useState, useEffect, useMemo } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  WorkflowTemplate,
  BusinessSolution,
  Employee,
  ProjectCollaborator,
  ProjectCollaboratorRole,
  IntegrationProvider,
  WorkflowStep,
  ProjectStage
} from '../../types';
import {
  X,
  Target,
  Users,
  Plug,
  ShieldCheck,
  Award,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  Info,
  DollarSign,
  Calendar,
  Globe,
  Share2,
  ExternalLink,
  Plus,
  Trash2,
  Check
} from 'lucide-react';

interface ConfiguredEmployee {
  employeeId: string;
  name: string;
  code: string;
  role: string;
  avatarColor: string;
  responsibility: string;
  isRemovable: boolean;
  requiredStepTitles: string[];
}

interface TargetMetric {
  name: string;
  targetValue: string;
}

export const WorkflowSetupWizardModal: React.FC = () => {
  const {
    isWorkflowSetupWizardOpen,
    setIsWorkflowSetupWizardOpen,
    wizardTargetWorkflowId,
    wizardTargetSolutionId,
    workflowTemplates,
    businessSolutions,
    employees,
    teamMembers,
    integrationConnections,
    activeWorkspace,
    createProject,
    createWorkflowRun,
    createProjectTask,
    createApprovalRequest,
    setSelectedProjectId,
    setWorkTab,
    navigate
  } = useOoumph();

  // Selected target
  const targetTemplate = useMemo<WorkflowTemplate | null>(() => {
    if (!wizardTargetWorkflowId) return null;
    return (
      workflowTemplates.find(
        (t) =>
          t.id === wizardTargetWorkflowId ||
          t.code?.toLowerCase() === wizardTargetWorkflowId.toLowerCase()
      ) || null
    );
  }, [wizardTargetWorkflowId, workflowTemplates]);

  const targetSolution = useMemo<BusinessSolution | null>(() => {
    if (!wizardTargetSolutionId) return null;
    return (
      businessSolutions.find(
        (s) =>
          s.id === wizardTargetSolutionId ||
          s.code?.toLowerCase() === wizardTargetSolutionId.toLowerCase()
      ) || null
    );
  }, [wizardTargetSolutionId, businessSolutions]);

  // Included templates (if solution, multiple; if workflow, 1)
  const includedTemplates = useMemo<WorkflowTemplate[]>(() => {
    if (targetSolution) {
      return targetSolution.workflowTemplateIds
        .map((id) => workflowTemplates.find((w) => w.id === id))
        .filter(Boolean) as WorkflowTemplate[];
    }
    if (targetTemplate) {
      return [targetTemplate];
    }
    return [];
  }, [targetSolution, targetTemplate, workflowTemplates]);

  // Primary active template for single mode
  const primaryTemplate = includedTemplates[0] || null;

  // Wizard Stage (1 to 6)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // STAGE 1: GOAL STATE
  const [initiativeName, setInitiativeName] = useState('');
  const [goalObjective, setGoalObjective] = useState('');
  const [offer, setOffer] = useState('');
  const [audience, setAudience] = useState('');
  const [geography, setGeography] = useState('');
  const [channels, setChannels] = useState('');
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [timeline, setTimeline] = useState('30 days');
  const [budget, setBudget] = useState('');

  // STAGE 2: TEAM STATE
  const [configuredAiTeam, setConfiguredAiTeam] = useState<ConfiguredEmployee[]>([]);
  const [availableToAddId, setAvailableToAddId] = useState<string>('');
  const [humanCollaborators, setHumanCollaborators] = useState<ProjectCollaborator[]>([]);
  const [removalError, setRemovalError] = useState<string | null>(null);

  // STAGE 3: CONNECTIONS
  // Uses live integrationConnections from store

  // STAGE 4: GOVERNANCE
  const [autonomyMode, setAutonomyMode] = useState<'strict' | 'balanced' | 'autonomous'>('strict');
  const [selectedApproverId, setSelectedApproverId] = useState<string>('');

  // STAGE 5: SUCCESS
  const [metricsList, setMetricsList] = useState<TargetMetric[]>([]);

  // RESET / INITIALIZE ON OPEN
  useEffect(() => {
    if (!isWorkflowSetupWizardOpen) return;
    setCurrentStep(1);
    setRemovalError(null);

    if (targetSolution) {
      setInitiativeName(`${targetSolution.title} Initiative`);
      setGoalObjective(targetSolution.shortPromise);
      setOffer('Leadership Accelerator & Enterprise Advisory');
      setAudience('VP / Director Level Decision Makers');
      setGeography('North America & UK');
      setChannels('LinkedIn, Website, Meta, Email');
      setLandingPageUrl('https://cedarlearning.com/program');
      setEventDetails('Cohort Kickoff Q4');
      setTimeline('45 days');
      setBudget('$3,500');

      // AI Team from solution
      const aiList: ConfiguredEmployee[] = targetSolution.employeeIds
        .map((empId) => {
          const emp = employees.find((e) => e.id === empId);
          if (!emp) return null;
          return {
            employeeId: emp.id,
            name: emp.name,
            code: emp.code,
            role: emp.title,
            avatarColor: emp.avatarColor,
            responsibility: `Coordinates multi-stage deliverables across ${targetSolution.title}.`,
            isRemovable: false,
            requiredStepTitles: ['Key Milestones']
          };
        })
        .filter(Boolean) as ConfiguredEmployee[];
      setConfiguredAiTeam(aiList);

      // Metrics
      setMetricsList(
        targetSolution.successMetrics.map((m) => {
          let defaultVal = '100% Target';
          if (m.includes('Conversion')) defaultVal = '8.5%';
          if (m.includes('Response Time')) defaultVal = '<60s';
          if (m.includes('Retention')) defaultVal = '94%';
          if (m.includes('Expansion')) defaultVal = '+28%';
          return { name: m, targetValue: defaultVal };
        })
      );
    } else if (targetTemplate) {
      setInitiativeName(`${targetTemplate.name}`);
      setGoalObjective(targetTemplate.outcome);
      setTimeline(targetTemplate.typicalDuration || '14 days');

      // Contextual defaults based on category
      const cat = targetTemplate.category;
      if (cat.includes('Paid') || cat.includes('Sales')) {
        setOffer('B2B Leadership Cohort Programme');
        setAudience('Growth stage founders & VP People');
        setGeography('United States & Canada');
        setChannels('LinkedIn, Google, Meta');
        setBudget('$2,000 / month');
      } else if (cat.includes('Web') || cat.includes('SEO')) {
        setOffer('Corporate Website & Resource Hub');
        setAudience('Search queries & AI answer citations');
        setGeography('Global English');
        setLandingPageUrl('https://cedarlearning.com');
        setBudget('');
      } else if (cat.includes('Content')) {
        setOffer('Founder Thought Leadership & Weekly Pillars');
        setAudience('Enterprise operators & L&D managers');
        setChannels('LinkedIn, Substack, YouTube Shorts');
        setBudget('');
      } else {
        setOffer('Cedar Leadership Advisory');
        setAudience('Mid-market decision makers');
        setBudget('');
      }

      // Resolve AI team from expected steps
      const uniqueEmployeeCodes = Array.from(
        new Set(targetTemplate.expectedSteps.map((s) => s.employeeCode))
      );
      const aiList: ConfiguredEmployee[] = targetTemplate.participatingEmployeeIds
        .map((empId) => {
          const emp = employees.find((e) => e.id === empId);
          if (!emp) return null;
          const assignedSteps = targetTemplate.expectedSteps.filter((s) => s.employeeCode === emp.code);
          return {
            employeeId: emp.id,
            name: emp.name,
            code: emp.code,
            role: emp.title,
            avatarColor: emp.avatarColor,
            responsibility:
              assignedSteps.length > 0
                ? assignedSteps.map((s) => s.title).join(', ')
                : `Domain specialist for ${targetTemplate.category}.`,
            isRemovable: assignedSteps.length === 0, // Cannot remove if they own a required step
            requiredStepTitles: assignedSteps.map((s) => s.title)
          };
        })
        .filter(Boolean) as ConfiguredEmployee[];
      setConfiguredAiTeam(aiList);

      // Metrics
      const baseMetrics = targetTemplate.successMetrics || [
        'Specialist Chain Tone Alignment',
        'On-Schedule Milestone Delivery',
        'Human Approval Signoff without Rejection'
      ];
      setMetricsList(
        baseMetrics.map((m) => {
          let defaultVal = 'On Track';
          if (m.includes('Leads') || m.includes('lead')) defaultVal = '50 Leads';
          if (m.includes('Replies') || m.includes('Rate')) defaultVal = '>18%';
          if (m.includes('Citations')) defaultVal = '15+ AI Queries';
          if (m.includes('Time')) defaultVal = '<48 hours';
          return { name: m, targetValue: defaultVal };
        })
      );
    }

    // Default Human Team
    if (teamMembers.length > 0) {
      setHumanCollaborators([
        {
          teamMemberId: teamMembers[0].id,
          name: teamMembers[0].name,
          email: teamMembers[0].email,
          role: 'project_owner'
        },
        ...(teamMembers.slice(1, 3).map((m) => ({
          teamMemberId: m.id,
          name: m.name,
          email: m.email,
          role: 'approver' as ProjectCollaboratorRole
        })))
      ]);
      setSelectedApproverId(teamMembers[0].id);
    }
  }, [
    isWorkflowSetupWizardOpen,
    targetSolution,
    targetTemplate,
    employees,
    teamMembers
  ]);

  if (!isWorkflowSetupWizardOpen || (!targetTemplate && !targetSolution)) {
    return null;
  }

  // FIELD VISIBILITY LOGIC (Driven by metadata & input definitions)
  const categoryString = (targetSolution?.outcomeCategory || primaryTemplate?.category || '').toLowerCase();
  const inputTags = (primaryTemplate?.inputs || []).map((i) => i.toLowerCase()).join(' ');

  const showOffer =
    categoryString.includes('launch') ||
    categoryString.includes('sales') ||
    categoryString.includes('lead') ||
    categoryString.includes('commerce') ||
    categoryString.includes('product') ||
    inputTags.includes('offer') ||
    inputTags.includes('product');

  const showAudience =
    !categoryString.includes('internal operations') &&
    !categoryString.includes('operating rhythm');

  const showGeography =
    categoryString.includes('lead') ||
    categoryString.includes('paid') ||
    categoryString.includes('event') ||
    categoryString.includes('outbound') ||
    inputTags.includes('geography') ||
    inputTags.includes('location');

  const showChannels =
    categoryString.includes('content') ||
    categoryString.includes('social') ||
    categoryString.includes('awareness') ||
    categoryString.includes('outbound') ||
    categoryString.includes('paid');

  const showWebsite =
    categoryString.includes('web') ||
    categoryString.includes('seo') ||
    categoryString.includes('aeo') ||
    categoryString.includes('lead') ||
    categoryString.includes('commerce');

  const showEvent =
    categoryString.includes('event') ||
    categoryString.includes('webinar') ||
    primaryTemplate?.name.toLowerCase().includes('webinar');

  // Strict check: budget is ONLY for paid ads, events, e-commerce, or when template explicitly lists budget in inputs
  const showBudget =
    categoryString.includes('paid') ||
    categoryString.includes('ad ') ||
    categoryString.includes('ads') ||
    categoryString.includes('campaign') ||
    categoryString.includes('commerce') ||
    categoryString.includes('event') ||
    inputTags.includes('budget');

  // RESOLVED CONNECTIONS
  const requiredConnectionTypes = Array.from(
    new Set([
      ...(targetSolution?.requiredConnectionTypes || []),
      ...(primaryTemplate?.requiredConnectionTypes || ['google_workspace'])
    ])
  );

  const optionalConnectionTypes = Array.from(
    new Set([
      ...(targetSolution?.optionalConnectionTypes || []),
      ...(primaryTemplate?.optionalConnectionTypes || [])
    ])
  );

  // Check connection status against store
  const getConnectionStatus = (connType: string): 'connected' | 'needs_connection' | 'needs_attention' => {
    // Map provider strings to active connections
    const match = integrationConnections.find((c) => {
      const prov = c.provider.toLowerCase();
      const target = connType.toLowerCase();
      if (prov === target) return true;
      if (target.includes('meta') && (prov.includes('facebook') || prov.includes('instagram') || prov.includes('meta'))) return true;
      if (target.includes('google') && prov.includes('google')) return true;
      if (target.includes('linkedin') && prov.includes('linkedin')) return true;
      if (target.includes('cms') || target.includes('website')) return prov.includes('website');
      return false;
    });

    if (!match) return 'needs_connection';
    if (match.status === 'connected') return 'connected';
    if (match.status === 'needs_attention') return 'needs_attention';
    return 'needs_connection';
  };

  const hasDisconnectedRequired = requiredConnectionTypes.some(
    (t) => getConnectionStatus(t) === 'needs_connection'
  );

  // HANDLERS FOR TEAM CONFIGURATION
  const handleRemoveAiEmployee = (empId: string) => {
    const target = configuredAiTeam.find((e) => e.employeeId === empId);
    if (!target) return;

    if (!target.isRemovable) {
      setRemovalError(
        `Cannot remove ${target.name} (${target.code}): required for step "${target.requiredStepTitles.join(', ')}". Reassign the step responsibility before removing this employee.`
      );
      return;
    }

    setRemovalError(null);
    setConfiguredAiTeam((prev) => prev.filter((e) => e.employeeId !== empId));
  };

  const handleAddAiEmployee = (empId: string) => {
    if (!empId) return;
    const emp = employees.find((e) => e.id === empId);
    if (!emp) return;
    if (configuredAiTeam.some((e) => e.employeeId === empId)) return;

    setConfiguredAiTeam((prev) => [
      ...prev,
      {
        employeeId: emp.id,
        name: emp.name,
        code: emp.code,
        role: emp.title,
        avatarColor: emp.avatarColor,
        responsibility: 'Assigned as supplementary specialist advisor.',
        isRemovable: true,
        requiredStepTitles: []
      }
    ]);
    setAvailableToAddId('');
    setRemovalError(null);
  };

  const handleUpdateResponsibility = (empId: string, responsibility: string) => {
    setConfiguredAiTeam((prev) =>
      prev.map((e) => (e.employeeId === empId ? { ...e, responsibility } : e))
    );
  };

  // HANDLER FOR HUMAN TEAM
  const handleUpdateHumanRole = (memberId: string, role: ProjectCollaboratorRole) => {
    setHumanCollaborators((prev) =>
      prev.map((c) => (c.teamMemberId === memberId ? { ...c, role } : c))
    );
  };

  const handleAddHumanCollaborator = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (!member) return;
    if (humanCollaborators.some((c) => c.teamMemberId === memberId)) return;

    setHumanCollaborators((prev) => [
      ...prev,
      {
        teamMemberId: member.id,
        name: member.name,
        email: member.email,
        role: 'contributor'
      }
    ]);
  };

  const handleRemoveHumanCollaborator = (memberId: string) => {
    setHumanCollaborators((prev) => prev.filter((c) => c.teamMemberId !== memberId));
  };

  // FINAL CREATION HANDLER
  const handleCreateProject = (status: 'ready' | 'planning') => {
    const newProjectId = `proj-${Date.now()}`;
    const newRunId = `run-${Date.now()}`;

    // Compute stages from primary template or solution phases
    const configuredStages: ProjectStage[] = (primaryTemplate?.expectedSteps || []).map(
      (s, idx) => ({
        id: `stg-${newProjectId}-${idx + 1}`,
        name: s.title,
        ownerEmployeeCode: s.employeeCode,
        status: 'pending',
        type: s.type === 'human_approval' ? 'human_approval' : 'employee_task',
        description: s.description
      })
    );

    // Compute steps for workflow run
    const runSteps: WorkflowStep[] = (primaryTemplate?.expectedSteps || []).map((s, idx) => {
      const rich = primaryTemplate?.richSteps?.[idx];
      return {
        id: `step-${newRunId}-${idx + 1}`,
        title: s.title,
        type: s.type,
        employeeCode: s.employeeCode,
        employeeId: employees.find((e) => e.code === s.employeeCode)?.id,
        description: s.description,
        status: 'pending',
        humanAssigneeName: rich?.humanAssigneeName,
        humanAssigneeRole: rich?.humanAssigneeRole,
        conditionConfig: rich?.conditionConfig,
        waitConfig: rich?.waitConfig,
        handoffConfig: rich?.handoffConfig,
        approvalConfig: rich?.approvalConfig,
        impactCategory: rich?.impactCategory
      };
    });

    // Check for connection blockers on stage 1
    const connectionBlockerTypes = requiredConnectionTypes.filter(
      (t) => getConnectionStatus(t) === 'needs_connection'
    );

    // Build project object
    const newProject = {
      workspaceId: activeWorkspace.id,
      title: initiativeName.trim() || `${primaryTemplate?.name || 'New'} Initiative`,
      objective: goalObjective.trim() || primaryTemplate?.outcome || 'Execute business workflow',
      status: status, // 'ready' for Ready to Start, 'planning' for Draft
      participatingEmployeeIds: configuredAiTeam.map((e) => e.employeeId),
      workflowRunId: newRunId,
      workflowTemplateId: primaryTemplate?.id,
      businessSolutionId: targetSolution?.id,
      plannedWorkflowTemplateIds: targetSolution
        ? targetSolution.workflowTemplateIds
        : [primaryTemplate?.id || 'wf-01'],
      currentWorkflowIndex: 0,
      completedWorkflowIds: [],
      upcomingWorkflowIds: targetSolution
        ? targetSolution.workflowTemplateIds.slice(1)
        : [],
      currentPhaseTitle: targetSolution
        ? `Phase 1: ${includedTemplates[0]?.name || 'Initial Foundation'}`
        : primaryTemplate?.name,
      offer: offer || undefined,
      audience: audience || undefined,
      geography: geography || undefined,
      channels: channels ? channels.split(',').map((c) => c.trim()) : undefined,
      approximateBudget: budget || undefined,
      dueAt: new Date(Date.now() + 30 * 86400000).toISOString(),
      collaborators: humanCollaborators,
      humanApproverId: selectedApproverId || humanCollaborators[0]?.teamMemberId,
      stages: configuredStages,
      deliverables: primaryTemplate?.outputs || [
        'Execution Brief',
        'Specialist Output Package',
        'Performance Attribution Summary'
      ],
      successMetrics: metricsList.map((m) => `${m.name}: Target ${m.targetValue}`),
      targetMetricsValues: metricsList.reduce((acc, m) => {
        acc[m.name] = m.targetValue;
        return acc;
      }, {} as Record<string, string>),
      requiredConnections: requiredConnectionTypes.map((t) => ({
        provider: t as IntegrationProvider,
        label: t.replace('_', ' ').toUpperCase(),
        ready: getConnectionStatus(t) === 'connected'
      })),
      connectionBlockers: connectionBlockerTypes,
      nextImportantAction:
        status === 'ready'
          ? 'Plan Ready to Execute · Click Start Project to begin specialist work.'
          : 'Setup Saved as Draft · Finalize parameters when ready.',
      progressSummary:
        status === 'ready'
          ? `Coordinated plan established with ${configuredAiTeam.length} AI specialists and ${humanCollaborators.length} human team members.`
          : 'Draft configuration preserved.',
      approvalPolicies:
        autonomyMode === 'strict'
          ? ['Mandatory human review for all content and budget milestones']
          : autonomyMode === 'balanced'
          ? ['Review required for external publications and budget overages']
          : ['Autonomous with end-of-week executive digest'],
      tags: targetSolution ? [targetSolution.code, 'Solution Pack'] : [primaryTemplate?.category || 'Workflow']
    };

    // Create the workflow run
    createWorkflowRun({
      workspaceId: activeWorkspace.id,
      templateId: primaryTemplate?.id || 'wf-01',
      templateName: primaryTemplate?.name || 'Initiative',
      title: `${initiativeName} Run`,
      status: 'ready_to_start',
      projectId: newProjectId,
      currentStepIndex: 0,
      steps: runSteps,
      startedAt: new Date().toISOString()
    });

    // Create Project
    createProject(newProject);

    // Create initial project task
    const firstEmp = configuredAiTeam[0];
    if (firstEmp) {
      createProjectTask({
        workspaceId: activeWorkspace.id,
        projectId: newProjectId,
        workflowRunId: newRunId,
        workflowStepId: runSteps[0]?.id,
        title: `Prepare ${runSteps[0]?.title || 'Initial Stage'}`,
        employeeId: firstEmp.employeeId,
        employeeName: firstEmp.name,
        employeeCode: firstEmp.code,
        status: 'pending',
        category: primaryTemplate?.category || 'Operations',
        description: `Execute milestone 1: ${runSteps[0]?.description || 'Initial deliverable'} for project "${initiativeName}".`,
        outputData: null
      });
    }

    // Close wizard and switch to Project view
    setIsWorkflowSetupWizardOpen(false);
    setSelectedProjectId(newProjectId);
    setWorkTab('projects');
    navigate('work');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-scale-in max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              {targetSolution ? (
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-900 text-white tracking-wider">
                  {targetSolution.code} · BUSINESS SOLUTION
                </span>
              ) : (
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-900 text-white tracking-wider">
                  {primaryTemplate?.code} · WORKFLOW
                </span>
              )}
              <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                Step {currentStep} of 6
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {targetSolution ? `Plan Solution: ${targetSolution.title}` : `Setup Workflow: ${primaryTemplate?.name}`}
            </h2>
            <p className="text-xs text-slate-500">
              Configure parameters, AI and human team roles, connections, governance gates, and target metrics.
            </p>
          </div>

          <button
            onClick={() => setIsWorkflowSetupWizardOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Stepper Tabs */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-4 sm:px-6 py-2.5 overflow-x-auto flex items-center gap-2 shrink-0">
          {[
            { num: 1, label: 'Goal', icon: Target },
            { num: 2, label: 'Team', icon: Users },
            { num: 3, label: 'Connections', icon: Plug },
            { num: 4, label: 'Governance', icon: ShieldCheck },
            { num: 5, label: 'Success', icon: Award },
            { num: 6, label: 'Review', icon: FileCheck2 }
          ].map((st) => {
            const Icon = st.icon;
            const isCurrent = currentStep === st.num;
            const isCompleted = currentStep > st.num;
            return (
              <button
                key={st.num}
                onClick={() => setCurrentStep(st.num as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : isCompleted
                    ? 'text-teal-800 hover:text-teal-950 bg-teal-50/70'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    isCurrent
                      ? 'bg-slate-900 text-white'
                      : isCompleted
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? '✓' : st.num}
                </span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs text-slate-700 flex-1">
          {/* ========================================================================= */}
          {/* STEP 1: GOAL (Only fields relevant to selected workflow) */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1">
                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-teal-700" />
                  <span>Initiative Target Outcome</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {targetSolution?.shortPromise || primaryTemplate?.outcome}
                </p>
              </div>

              {/* Form Grid */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Project / Initiative Name *
                  </label>
                  <input
                    type="text"
                    value={initiativeName}
                    onChange={(e) => setInitiativeName(e.target.value)}
                    placeholder="e.g. Q4 Leadership Programme Expansion"
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Specific Business Goal & Scope *
                  </label>
                  <textarea
                    rows={2}
                    value={goalObjective}
                    onChange={(e) => setGoalObjective(e.target.value)}
                    placeholder="Define the exact output or business milestone required..."
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                  />
                </div>

                {/* Conditional Fields based on template metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {showOffer && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Product / Service / Offer
                      </label>
                      <input
                        type="text"
                        value={offer}
                        onChange={(e) => setOffer(e.target.value)}
                        placeholder="e.g. Executive Fellowship or SaaS Core Tier"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                      />
                    </div>
                  )}

                  {showAudience && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Target Audience / ICP
                      </label>
                      <input
                        type="text"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="e.g. VP Operations in Mid-Market Retail"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                      />
                    </div>
                  )}

                  {showGeography && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Target Geography / Region
                      </label>
                      <input
                        type="text"
                        value={geography}
                        onChange={(e) => setGeography(e.target.value)}
                        placeholder="e.g. US, Canada, UK or EMEA"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                      />
                    </div>
                  )}

                  {showChannels && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Channels
                      </label>
                      <input
                        type="text"
                        value={channels}
                        onChange={(e) => setChannels(e.target.value)}
                        placeholder="e.g. LinkedIn, Instagram, Email, Blog"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                      />
                    </div>
                  )}

                  {showWebsite && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Website / Landing Page Destination
                      </label>
                      <input
                        type="text"
                        value={landingPageUrl}
                        onChange={(e) => setLandingPageUrl(e.target.value)}
                        placeholder="e.g. https://cedarlearning.com/apply"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                      />
                    </div>
                  )}

                  {showEvent && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Event / Webinar Specifics
                      </label>
                      <input
                        type="text"
                        value={eventDetails}
                        onChange={(e) => setEventDetails(e.target.value)}
                        placeholder="e.g. Live Q&A Cohort Demo · Nov 14th"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Expected Timeline
                    </label>
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="e.g. 14 days, 30 days"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                    />
                  </div>

                  {showBudget && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Approximate Budget (Media / Campaign)
                      </label>
                      <input
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="e.g. $1,500 / month"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: TEAM (AI Specialists & Human Teammates) */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              {removalError && (
                <div className="p-3.5 rounded-xl border border-rose-300 bg-rose-50/70 text-rose-900 flex items-start gap-2.5 text-xs">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold">Cannot remove required specialist:</span>
                    <p className="mt-0.5">{removalError}</p>
                  </div>
                  <button
                    onClick={() => setRemovalError(null)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Section 1: AI Specialist Team */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-teal-700" />
                      <span>Configured AI Specialist Team ({configuredAiTeam.length})</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Specialists assigned to execute operational stages. Core step owners cannot be removed without reassigning.
                    </p>
                  </div>

                  {/* Add Optional Specialist Dropdown */}
                  <div className="flex items-center gap-1.5">
                    <select
                      value={availableToAddId}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) handleAddAiEmployee(val);
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700 cursor-pointer focus:outline-hidden"
                    >
                      <option value="">+ Add optional specialist...</option>
                      {employees
                        .filter((e) => !configuredAiTeam.some((c) => c.employeeId === e.id))
                        .map((emp) => (
                          <option key={emp.id} value={emp.id}>
                            {emp.name} ({emp.code}) — {emp.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {configuredAiTeam.map((member) => (
                    <div
                      key={member.employeeId}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full ${member.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 ring-2 ring-slate-100 shadow-2xs`}
                        >
                          {member.code}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">
                            {member.name} · <span className="text-slate-500 font-normal">{member.role}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {member.requiredStepTitles.length > 0 ? (
                              <span className="text-teal-800 font-medium">
                                Step Owner: {member.requiredStepTitles.join(', ')}
                              </span>
                            ) : (
                              <span className="text-slate-400">Supplementary collaborator</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          value={member.responsibility}
                          onChange={(e) => handleUpdateResponsibility(member.employeeId, e.target.value)}
                          placeholder="Responsibility in this workflow..."
                          className="flex-1 sm:w-64 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-800 focus:outline-hidden focus:border-slate-400"
                        />
                        <button
                          onClick={() => handleRemoveAiEmployee(member.employeeId)}
                          title={member.isRemovable ? 'Remove optional specialist' : 'Required step owner'}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            member.isRemovable
                              ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                              : 'text-slate-300 hover:text-amber-600 hover:bg-amber-50'
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Human Teammates & Project Roles */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-indigo-700" />
                      <span>Human Teammates & Project Roles ({humanCollaborators.length})</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Define project-specific roles: <strong>Project Owner</strong>, <strong>Contributor</strong>, <strong>Approver</strong>, or <strong>Viewer</strong>.
                    </p>
                  </div>

                  {/* Add Teammate Dropdown */}
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleAddHumanCollaborator(e.target.value);
                      e.target.value = '';
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700 cursor-pointer focus:outline-hidden"
                  >
                    <option value="">+ Add workspace member...</option>
                    {teamMembers
                      .filter((m) => !humanCollaborators.some((c) => c.teamMemberId === m.id))
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.role})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-2">
                  {humanCollaborators.map((collab) => {
                    const workspaceUser = teamMembers.find((m) => m.id === collab.teamMemberId);
                    return (
                      <div
                        key={collab.teamMemberId}
                        className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-xs">
                            {collab.name}{' '}
                            <span className="text-[10px] font-normal text-slate-400">({collab.email})</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Workspace Role: <span className="font-semibold">{workspaceUser?.role || 'Member'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={collab.role}
                            onChange={(e) => handleUpdateHumanRole(collab.teamMemberId, e.target.value as any)}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-800 cursor-pointer focus:outline-hidden"
                          >
                            <option value="project_owner">Project Owner</option>
                            <option value="approver">Approver</option>
                            <option value="contributor">Contributor</option>
                            <option value="viewer">Viewer</option>
                          </select>

                          {humanCollaborators.length > 1 && (
                            <button
                              onClick={() => handleRemoveHumanCollaborator(collab.teamMemberId)}
                              className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: CONNECTIONS (Resolves required/optional against integration state) */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1">
                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Plug className="h-3.5 w-3.5 text-indigo-700" />
                  <span>Channel & Tool Connectivity</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  We check current workspace integrations before execution. You can continue planning even if a service is disconnected; stages requiring that tool will simply pause as blocked until connected.
                </p>
              </div>

              {/* Required Connections List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Required Channels & Accounts
                </h4>

                <div className="space-y-2">
                  {requiredConnectionTypes.map((connType) => {
                    const status = getConnectionStatus(connType);
                    const isConnected = status === 'connected';

                    return (
                      <div
                        key={connType}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                          isConnected
                            ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                            : 'border-amber-200 bg-amber-50/40 text-amber-950'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isConnected ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                            }`}
                          >
                            <Plug className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900">
                              {connType.replace('_', ' ').toUpperCase()}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {isConnected ? (
                                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                  <Check className="h-3 w-3" /> Connected and authenticated
                                </span>
                              ) : (
                                <span className="text-amber-800">
                                  Connection required before this stage can run.
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isConnected ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Ready
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setIsWorkflowSetupWizardOpen(false);
                                navigate('settings');
                              }}
                              className="px-2.5 py-1 rounded-lg border border-amber-300 bg-white text-xs font-bold text-amber-900 hover:bg-amber-50 cursor-pointer shadow-2xs"
                            >
                              Open Settings
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optional Connections */}
              {optionalConnectionTypes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Optional Enhancements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {optionalConnectionTypes.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-[11px] text-slate-600"
                      >
                        {c.replace('_', ' ')} · Optional
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: GOVERNANCE & APPROVAL GATES */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1">
                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                  <span>Human-In-The-Loop Governance</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  AI employees will pause at mandatory review checkpoints. You can make this project stricter than your workspace baseline.
                </p>
              </div>

              {/* Autonomy Strictness Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900">
                  Project Autonomy Policy
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'strict',
                      title: 'Strict Human Oversight',
                      desc: 'Human approver must sign off on copy, budgets, and live rollouts.'
                    },
                    {
                      id: 'balanced',
                      title: 'Balanced Autonomy',
                      desc: 'Only public publishing, pricing, and campaign budgets require signoff.'
                    },
                    {
                      id: 'autonomous',
                      title: 'Digest Mode',
                      desc: 'Specialists proceed with drafts; approver receives an activity recap.'
                    }
                  ].map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => setAutonomyMode(mode.id as any)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        autonomyMode === mode.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="font-bold text-xs">{mode.title}</div>
                      <p
                        className={`text-[11px] mt-1 leading-relaxed ${
                          autonomyMode === mode.id ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {mode.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Approval Gates for this Workflow */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Mandatory Checkpoints in this Workflow
                </h4>

                <div className="space-y-1.5">
                  {(targetSolution?.approvalGateTypes ||
                    primaryTemplate?.approvalGates ||
                    primaryTemplate?.approvalPoints || [
                      'Deliverable Draft & Scope Review',
                      'Executive Claims & Brand Voice Signoff'
                    ]
                  ).map((gate, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/40 text-amber-950 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                        <span className="font-medium">{gate}</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase">
                        Gate {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Designated Approver */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Designated Human Approver
                </label>
                <select
                  value={selectedApproverId}
                  onChange={(e) => setSelectedApproverId(e.target.value)}
                  className="w-full sm:w-80 rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 bg-white"
                >
                  {humanCollaborators.map((c) => (
                    <option key={c.teamMemberId} value={c.teamMemberId}>
                      {c.name} ({c.role.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: SUCCESS (Metrics & Demo Targets) */}
          {/* ========================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1">
                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-teal-700" />
                  <span>Success Targets & Milestone KPIs</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Set target milestones for this initiative. These populate your Project Results scorecard and give your AI team clear benchmark objectives.
                </p>
              </div>

              <div className="space-y-3">
                {metricsList.map((met, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-xs text-slate-900">{met.name}</div>
                      <span className="text-[10px] text-slate-400">Target Benchmark</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={met.targetValue}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMetricsList((prev) =>
                            prev.map((m, i) => (i === index ? { ...m, targetValue: val } : m))
                          );
                        }}
                        placeholder="e.g. 50 Leads, 95% Rate"
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 6: REVIEW (Executive Briefing & Project Creation) */}
          {/* ========================================================================= */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-fade-in text-xs">
              <div className="rounded-xl border border-teal-300 bg-teal-50/40 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                    EXECUTIVE SETUP SUMMARY
                  </span>
                  <span className="text-xs font-bold text-teal-900">
                    Status: Will create "Ready to Start" Project
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{initiativeName}</h3>
                <p className="text-slate-700 leading-relaxed">{goalObjective}</p>
              </div>

              {/* Multi-Phase Breakdown if Solution */}
              {targetSolution && (
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Orchestrated Solution Phases ({includedTemplates.length})
                  </h4>
                  <div className="space-y-1.5">
                    {includedTemplates.map((wf, idx) => (
                      <div
                        key={wf.id}
                        className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-800">
                            Phase {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-900">{wf.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{wf.typicalDuration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Parameters Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Specialist & Human Team
                  </h4>
                  <div className="space-y-1">
                    <div className="text-slate-600">
                      <strong>AI Specialists:</strong> {configuredAiTeam.map((e) => e.name).join(', ')}
                    </div>
                    <div className="text-slate-600">
                      <strong>Human Team:</strong>{' '}
                      {humanCollaborators.map((c) => `${c.name} (${c.role})`).join(', ')}
                    </div>
                    <div className="text-slate-600">
                      <strong>Governance:</strong>{' '}
                      <span className="capitalize">{autonomyMode} oversight mode</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Infrastructure & Connections
                  </h4>
                  <div className="space-y-1">
                    <div className="text-slate-600">
                      <strong>Required Channels:</strong> {requiredConnectionTypes.join(', ')}
                    </div>
                    <div className="text-slate-600">
                      <strong>Readiness:</strong>{' '}
                      {hasDisconnectedRequired ? (
                        <span className="text-amber-700 font-semibold">
                          1+ connections pending (relevant steps will pause as blocked)
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold">
                          All required channels connected
                        </span>
                      )}
                    </div>
                    {budget && (
                      <div className="text-slate-600">
                        <strong>Budget:</strong> {budget}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep === 6 ? (
              <>
                <button
                  type="button"
                  onClick={() => handleCreateProject('planning')}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  Save Setup as Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleCreateProject('ready')}
                  className="flex items-center gap-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white px-5 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer ring-2 ring-teal-500/20"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Create Project</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
