import React, { useState, useEffect, useMemo } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import {
  WorkflowTemplate,
  WorkflowStepType,
  CustomWorkflowStepConfig,
  StepImpactCategory,
  WorkflowTriggerType,
  IntegrationProvider,
  WorkflowConditionConfig,
  WorkflowWaitConfig,
  WorkflowHandoffConfig,
  WorkflowApprovalConfig,
  GoalIntent
} from '../../../types';
import { PROVIDER_CATALOG } from '../../../data/integrationDirectory';
import { GOAL_INTENT_PROFILES } from '../../../data/goalIntents';
import {
  X,
  Plus,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Shield,
  Clock,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layers,
  Users,
  Play,
  FileCode2,
  Workflow,
  AlertCircle,
  AlertTriangle,
  GitBranch,
  Timer,
  ArrowRightLeft,
  UserCheck,
  HelpCircle,
  Save,
  CheckCircle2,
  Eye,
  Info,
  Calendar,
  MessageSquare,
  Zap,
  Globe
} from 'lucide-react';

interface MetricItem {
  id: string;
  name: string;
  targetValue: string;
}

interface StepItem {
  id: string;
  title: string;
  type: WorkflowStepType;
  employeeCode?: string;
  humanAssigneeName?: string;
  humanAssigneeRole?: string;
  description: string;
  expectedOutput?: string;
  dueTiming?: string;
  impactCategory: StepImpactCategory;
  conditionConfig?: WorkflowConditionConfig;
  waitConfig?: WorkflowWaitConfig;
  handoffConfig?: WorkflowHandoffConfig;
  approvalConfig?: WorkflowApprovalConfig;
}

export const WorkflowBuilderModal: React.FC = () => {
  const {
    isWorkflowBuilderOpen,
    setIsWorkflowBuilderOpen,
    workflowBuilderEditingTemplate,
    setWorkflowBuilderEditingTemplate,
    workflowBuilderInitialIntent,
    setWorkflowBuilderInitialIntent,
    activeWorkspace,
    employees,
    teamMembers,
    integrationConnections,
    createCustomWorkflowTemplate,
    updateCustomWorkflowTemplate,
    openWorkflowSetup
  } = useOoumph();

  // Mode and active tab
  const [activeTab, setActiveTab] = useState<'builder' | 'validation' | 'preview'>('builder');
  const [builderStep, setBuilderStep] = useState<1 | 2 | 3>(1);
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState(false);

  // Form State: Step 1 (Basics & Triggers)
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [versionNumber, setVersionNumber] = useState<number>(1);
  const [name, setName] = useState('');
  const [outcome, setOutcome] = useState('');
  const [category, setCategory] = useState<string>('Growth & Marketing');
  const [typicalDuration, setTypicalDuration] = useState('2-3 business days');
  const [complexity, setComplexity] = useState<'starter' | 'moderate' | 'advanced'>('starter');
  const [triggerType, setTriggerType] = useState<WorkflowTriggerType>('MANUAL');
  const [triggerDetail, setTriggerDetail] = useState('');
  const [triggerScheduleRecurrence, setTriggerScheduleRecurrence] = useState<'daily' | 'weekdays' | 'weekly' | 'monthly'>('weekly');
  const [triggerScheduleTime, setTriggerScheduleTime] = useState('09:00 AM');
  const [triggerScheduleDay, setTriggerScheduleDay] = useState('Monday');
  const [triggerKeyword, setTriggerKeyword] = useState('DEMO');

  // Form State: Step 2 (Steps)
  const [steps, setSteps] = useState<StepItem[]>([
    {
      id: 'step-1',
      title: 'Audience Research & Strategy',
      type: 'employee_task',
      employeeCode: 'A08',
      description: 'Audit target ICP criteria and establish initial campaign scope.',
      expectedOutput: 'Target audience brief and recommended angles.',
      impactCategory: 'internal_work'
    },
    {
      id: 'step-2',
      title: 'Messaging & Asset Drafting',
      type: 'employee_task',
      employeeCode: 'A12',
      description: 'Generate 3 high-converting messaging variations aligned with brand tone.',
      expectedOutput: '3 message draft variants.',
      impactCategory: 'internal_work'
    },
    {
      id: 'step-3',
      title: 'Founder Review & Approval',
      type: 'human_approval',
      description: 'Authorize campaign launch and verify claims against brand guidelines.',
      expectedOutput: 'Approved campaign ready for live dispatch.',
      impactCategory: 'public_publishing',
      approvalConfig: {
        approverRole: 'Project Owner',
        subjectToApprove: 'Campaign assets and claims compliance signoff',
        riskCategory: 'Public Marketing',
        onApproveAction: 'Dispatch campaign schedule',
        onRequestChangesAction: 'Return revisions to Copywriter Porter Hayes'
      }
    }
  ]);

  // Form State: Step 3 (Governance, Channels & Metrics)
  const [selectedConnections, setSelectedConnections] = useState<IntegrationProvider[]>([
    'meta_business',
    'google_workspace'
  ]);
  const [metrics, setMetrics] = useState<MetricItem[]>([
    { id: 'm-1', name: 'Qualified Opportunities', targetValue: '10' },
    { id: 'm-2', name: 'Response Rate', targetValue: '>25%' }
  ]);
  const [newMetricName, setNewMetricName] = useState('');
  const [newMetricTarget, setNewMetricTarget] = useState('');

  // Hydrate from editing template or goal intent when opened
  useEffect(() => {
    if (!isWorkflowBuilderOpen) return;

    if (workflowBuilderEditingTemplate) {
      const t = workflowBuilderEditingTemplate;
      setTemplateId(t.id);
      setVersionNumber(t.version || 1);
      setName(t.name);
      setOutcome(t.outcome);
      setCategory(t.category);
      setTypicalDuration(t.typicalDuration || '2-3 business days');
      setComplexity(
        t.complexity === 'simple' ? 'starter' : t.complexity === 'comprehensive' ? 'advanced' : 'moderate'
      );
      if (t.trigger) {
        setTriggerType(t.trigger.type);
        setTriggerDetail(t.trigger.description || '');
        if (t.trigger.keyword) setTriggerKeyword(t.trigger.keyword);
        if (t.trigger.scheduleRecurrence) setTriggerScheduleRecurrence(t.trigger.scheduleRecurrence as any);
        if (t.trigger.scheduleTime) setTriggerScheduleTime(t.trigger.scheduleTime);
        if (t.trigger.scheduleDayOfWeek) setTriggerScheduleDay(t.trigger.scheduleDayOfWeek);
      }
      if (t.requiredConnectionTypes) {
        setSelectedConnections(t.requiredConnectionTypes as IntegrationProvider[]);
      }
      if (t.successMetrics) {
        setMetrics(
          t.successMetrics.map((m, idx) => {
            const parts = m.split(':');
            return {
              id: `m-${idx}`,
              name: parts[0]?.trim() || m,
              targetValue: parts[1]?.replace(/Target/i, '')?.trim() || '100%'
            };
          })
        );
      }
      if (t.richSteps && t.richSteps.length > 0) {
        setSteps(
          t.richSteps.map((rs) => ({
            id: rs.id,
            title: rs.title,
            type: rs.type,
            employeeCode: rs.employeeCode,
            humanAssigneeName: rs.humanAssigneeName,
            humanAssigneeRole: rs.humanAssigneeRole,
            description: rs.description,
            expectedOutput: rs.expectedOutput,
            impactCategory: rs.impactCategory || 'internal_work',
            conditionConfig: rs.conditionConfig,
            waitConfig: rs.waitConfig,
            handoffConfig: rs.handoffConfig,
            approvalConfig: rs.approvalConfig
          }))
        );
      } else if (t.expectedSteps && t.expectedSteps.length > 0) {
        setSteps(
          t.expectedSteps.map((es, idx) => ({
            id: `step-${idx + 1}`,
            title: es.title,
            type: es.type,
            employeeCode: es.employeeCode,
            description: es.description,
            impactCategory: es.type === 'human_approval' ? 'public_publishing' : 'internal_work'
          }))
        );
      }
      setIsDirty(false);
    } else if (workflowBuilderInitialIntent) {
      // Pre-fill from GoalIntent profile
      const profile = GOAL_INTENT_PROFILES[workflowBuilderInitialIntent as GoalIntent];
      if (profile) {
        setTemplateId(null);
        setVersionNumber(1);
        setName(`${profile.label} Playbook`);
        setOutcome(profile.description);
        setCategory('Custom');
        setTriggerType('MANUAL');
        setTriggerDetail('Triggered on demand for business initiative.');
        setSelectedConnections(profile.requiredConnections.map((c) => c.provider));
        setMetrics(
          profile.successMetrics.map((m, idx) => ({
            id: `m-${idx}`,
            name: m.split(':')[0] || m,
            targetValue: m.split(':')[1]?.replace(/Target/i, '')?.trim() || '100%'
          }))
        );
        setSteps(
          profile.proposedStages.map((stg, idx) => ({
            id: `step-${idx + 1}`,
            title: stg.name,
            type: stg.type,
            employeeCode: stg.ownerEmployeeCode,
            description: stg.description,
            impactCategory: stg.type === 'human_approval' ? 'public_publishing' : 'internal_work'
          }))
        );
      }
      setIsDirty(false);
    } else {
      // Blank reset
      setTemplateId(null);
      setVersionNumber(1);
      setName('');
      setOutcome('');
      setCategory('Growth & Marketing');
      setTriggerType('MANUAL');
      setTriggerDetail('');
      setSteps([
        {
          id: 'step-1',
          title: 'Audience Research & Strategy',
          type: 'employee_task',
          employeeCode: 'A08',
          description: 'Audit target ICP criteria and establish initial campaign scope.',
          expectedOutput: 'Target audience brief and recommended angles.',
          impactCategory: 'internal_work'
        },
        {
          id: 'step-2',
          title: 'Messaging & Asset Drafting',
          type: 'employee_task',
          employeeCode: 'A12',
          description: 'Generate 3 high-converting messaging variations aligned with brand tone.',
          expectedOutput: '3 message draft variants.',
          impactCategory: 'internal_work'
        },
        {
          id: 'step-3',
          title: 'Founder Review & Approval',
          type: 'human_approval',
          description: 'Authorize campaign launch and verify claims against brand guidelines.',
          expectedOutput: 'Approved campaign ready for live dispatch.',
          impactCategory: 'public_publishing'
        }
      ]);
      setSelectedConnections(['meta_business', 'google_workspace']);
      setIsDirty(false);
    }
  }, [isWorkflowBuilderOpen, workflowBuilderEditingTemplate, workflowBuilderInitialIntent]);

  // Track modification
  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  // ---------------------------------------------------------------------------
  // VALIDATION ENGINE (Requirement 8 & 25)
  // ---------------------------------------------------------------------------
  const validationResult = useMemo(() => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Rule 1: Missing Workflow Name
    if (!name.trim()) {
      errors.push('Workflow Title is required.');
    }

    // Rule 2: Missing Business Outcome
    if (!outcome.trim()) {
      errors.push('Business Outcome description is required.');
    }

    // Rule 3: Missing Trigger
    if (!triggerType) {
      errors.push('Workflow Activation Trigger must be configured.');
    }

    // Rule 4: No steps configured
    if (steps.length === 0) {
      errors.push('Workflow must contain at least one step.');
    }

    // Rule 5: Validate each step according to its type
    steps.forEach((st, idx) => {
      const stepNum = idx + 1;
      if (!st.title.trim()) {
        errors.push(`Step ${stepNum} is missing a title.`);
      }

      if (st.type === 'employee_task') {
        if (!st.employeeCode) {
          errors.push(`Step ${stepNum} (AI Task): Missing assigned AI employee.`);
        }
      } else if (st.type === 'human_task') {
        if (!st.humanAssigneeName && !st.humanAssigneeRole) {
          errors.push(`Step ${stepNum} (Human Task): Missing assigned workspace teammate.`);
        }
      } else if (st.type === 'human_approval') {
        if (!st.title.trim() && !st.approvalConfig?.subjectToApprove) {
          errors.push(`Step ${stepNum} (Approval): Must define what is being approved.`);
        }
        if (!st.approvalConfig?.approverRole) {
          errors.push(`Step ${stepNum} (Approval): Missing designated human approver role.`);
        }
      } else if (st.type === 'condition') {
        if (!st.conditionConfig?.field) {
          errors.push(`Step ${stepNum} (Condition): Missing evaluation field.`);
        }
        if (!st.conditionConfig?.thenActionDescription && !st.conditionConfig?.thenStepId) {
          errors.push(`Step ${stepNum} (Condition): Must define a valid THEN destination.`);
        }
        if (!st.conditionConfig?.elseActionDescription && !st.conditionConfig?.elseStepId) {
          errors.push(`Step ${stepNum} (Condition): Must define a valid OTHERWISE destination.`);
        }
        if (st.conditionConfig?.thenStepId && !steps.some((s) => s.id === st.conditionConfig?.thenStepId)) {
          errors.push(`Step ${stepNum} (Condition): Broken step reference for THEN target.`);
        }
        if (st.conditionConfig?.elseStepId && !steps.some((s) => s.id === st.conditionConfig?.elseStepId)) {
          errors.push(`Step ${stepNum} (Condition): Broken step reference for OTHERWISE target.`);
        }
      } else if (st.type === 'wait_schedule') {
        if (!st.waitConfig?.durationValue && !st.waitConfig?.dateTimeValue && !st.waitConfig?.simulatedEventName) {
          errors.push(`Step ${stepNum} (Wait): Must specify duration, date/time, or event.`);
        }
      } else if (st.type === 'handoff') {
        if (!st.handoffConfig?.toEmployeeCode) {
          errors.push(`Step ${stepNum} (Handoff): Missing destination recipient.`);
        }
        const validCodes = [
          ...employees.map((e) => e.code),
          'HUMAN_OWNER',
          'HUMAN_APPROVER',
          'HUMAN_TEAMMATE'
        ];
        if (st.handoffConfig?.toEmployeeCode && !validCodes.includes(st.handoffConfig.toEmployeeCode)) {
          errors.push(`Step ${stepNum} (Handoff): Recipient points to unknown or orphan step.`);
        }
      }
    });

    // Rule 6: Unsupported connection types
    selectedConnections.forEach((provider) => {
      if (!PROVIDER_CATALOG.some((p) => p.provider === provider)) {
        errors.push(`Unsupported connection type: "${provider}".`);
      }
    });

    // Rule 7: High-Risk Action Governance Safeguard (Requirement 25)
    const highRiskSteps = steps.filter((s) =>
      ['paid_advertising', 'commercial_commitment', 'reputation_response', 'destructive_action'].includes(s.impactCategory)
    );
    const hasApproval = steps.some((s) => s.type === 'human_approval');
    if (highRiskSteps.length > 0 && !hasApproval) {
      errors.push(
        `Mandatory governance safeguard: High-risk action (${highRiskSteps.map((s) => s.title).join(', ')}) requires at least one Human Approval gate.`
      );
    }

    // Warnings: Connection status, metrics, optional configs
    selectedConnections.forEach((provider) => {
      const conn = integrationConnections.find(
        (c) => c.workspaceId === activeWorkspace.id && c.provider === provider
      );
      if (!conn || conn.status !== 'connected') {
        const cat = PROVIDER_CATALOG.find((p) => p.provider === provider);
        warnings.push(`${cat?.name || provider} is not connected in this workspace.`);
      }
    });

    if (metrics.length === 0) {
      warnings.push('No success target metrics configured for this workflow.');
    }

    // Advisory warning for steps with incomplete optional instructions
    const stepsWithBriefDescription = steps.filter((s) => s.description.trim().length < 5);
    if (stepsWithBriefDescription.length > 0) {
      warnings.push(`${stepsWithBriefDescription.length} step(s) have very brief or incomplete instructions.`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      checkedCount: 7 + steps.length
    };
  }, [name, outcome, triggerType, steps, selectedConnections, metrics, activeWorkspace, integrationConnections, employees]);

  if (!isWorkflowBuilderOpen) return null;

  // ---------------------------------------------------------------------------
  // STEP BUILDER ACTIONS (Requirement 2 to 6)
  // ---------------------------------------------------------------------------
  const handleAddStep = (type: WorkflowStepType) => {
    markDirty();
    const newId = `step-${Date.now()}`;
    let newStep: StepItem;

    if (type === 'human_task') {
      const defaultAssignee = teamMembers.find((m) => m.workspaceId === activeWorkspace.id) || teamMembers[0];
      newStep = {
        id: newId,
        title: 'Review Product Imagery & Assets',
        type: 'human_task',
        humanAssigneeName: defaultAssignee ? defaultAssignee.name : 'Workspace Teammate',
        humanAssigneeRole: defaultAssignee ? defaultAssignee.role : 'member',
        description: 'Upload high-resolution photographs and verified product specifications.',
        expectedOutput: 'Approved photography package.',
        dueTiming: 'Within 48 hours',
        impactCategory: 'internal_work'
      };
    } else if (type === 'human_approval') {
      newStep = {
        id: newId,
        title: 'Founder Signoff & Compliance Review',
        type: 'human_approval',
        description: 'Verify copy claims and authorize live campaign dispatch.',
        expectedOutput: 'Approved deliverable ready for live publication.',
        impactCategory: 'public_publishing',
        approvalConfig: {
          approverRole: 'Project Owner',
          subjectToApprove: 'Campaign copy & creative assets',
          riskCategory: 'Public Marketing',
          onApproveAction: 'Dispatch live publish sequence',
          onRequestChangesAction: 'Request revisions from responsible specialist'
        }
      };
    } else if (type === 'condition') {
      newStep = {
        id: newId,
        title: 'Lead Qualification Condition',
        type: 'condition',
        description: 'Evaluate prospect ICP fit score and engagement intent.',
        impactCategory: 'internal_work',
        conditionConfig: {
          field: 'Lead Status',
          operator: 'equals',
          value: 'Qualified',
          thenActionDescription: 'Book Discovery Review Meeting with Inbound Specialist',
          elseActionDescription: 'Route contact to Elena Rostova (A10) 4-Week Nurture Sequence'
        }
      };
    } else if (type === 'wait_schedule') {
      newStep = {
        id: newId,
        title: 'Wait for Prospect Engagement',
        type: 'wait_schedule',
        description: 'Allow sufficient time for prospect interaction before subsequent sequence.',
        impactCategory: 'internal_work',
        waitConfig: {
          waitType: 'duration',
          durationValue: '2 business days',
          simulatedEventName: 'Wait until prospect replies'
        }
      };
    } else if (type === 'handoff') {
      newStep = {
        id: newId,
        title: 'Content to Creative Handoff',
        type: 'handoff',
        description: 'Transfer approved copy and strategic brief to production specialist.',
        impactCategory: 'internal_work',
        handoffConfig: {
          fromEmployeeCode: 'A12',
          toEmployeeCode: 'A19',
          contextArtifacts: ['Approved Headline Matrix', 'Creative Campaign Brief', 'Brand Guidelines'],
          handoffNote: 'Generate matching 1:1 and 9:16 visual assets for scheduled post.'
        }
      };
    } else {
      // employee_task
      newStep = {
        id: newId,
        title: 'New Specialist Task',
        type: 'employee_task',
        employeeCode: 'A02',
        description: 'Execute job role deliverable according to business objective.',
        expectedOutput: 'Tangible deliverable artifact.',
        impactCategory: 'internal_work'
      };
    }

    setSteps([...steps, newStep]);
  };

  const handleUpdateStep = (idx: number, partial: Partial<StepItem>) => {
    markDirty();
    const updated = [...steps];
    updated[idx] = { ...updated[idx], ...partial };
    setSteps(updated);
  };

  const handleMoveStep = (idx: number, direction: 'up' | 'down') => {
    markDirty();
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= steps.length) return;
    const updated = [...steps];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    setSteps(updated);
  };

  const handleRemoveStep = (idx: number) => {
    markDirty();
    setSteps(steps.filter((_, i) => i !== idx));
  };

  const handleToggleConnection = (provider: IntegrationProvider) => {
    markDirty();
    if (selectedConnections.includes(provider)) {
      setSelectedConnections(selectedConnections.filter((p) => p !== provider));
    } else {
      setSelectedConnections([...selectedConnections, provider]);
    }
  };

  const handleAddMetric = () => {
    if (!newMetricName.trim()) return;
    markDirty();
    setMetrics([
      ...metrics,
      {
        id: `m-${Date.now()}`,
        name: newMetricName.trim(),
        targetValue: newMetricTarget.trim() || '100%'
      }
    ]);
    setNewMetricName('');
    setNewMetricTarget('');
  };

  const handleRemoveMetric = (id: string) => {
    markDirty();
    setMetrics(metrics.filter((m) => m.id !== id));
  };

  // ---------------------------------------------------------------------------
  // SAVE & RUN LOGIC (Requirement 1: Locked Lifecycle)
  // ---------------------------------------------------------------------------
  const compileTemplatePayload = () => {
    const participatingCodes = Array.from(
      new Set(
        steps
          .map((s) => s.employeeCode || s.handoffConfig?.toEmployeeCode || s.handoffConfig?.fromEmployeeCode)
          .filter(Boolean) as string[]
      )
    );
    const participatingEmployeeIds = participatingCodes
      .map((code) => employees.find((e) => e.code === code)?.id)
      .filter(Boolean) as string[];

    const richSteps: CustomWorkflowStepConfig[] = steps.map((s) => ({
      id: s.id,
      title: s.title,
      type: s.type,
      employeeCode: s.employeeCode,
      humanAssigneeName: s.humanAssigneeName,
      humanAssigneeRole: s.humanAssigneeRole,
      description: s.description,
      expectedOutput: s.expectedOutput,
      impactCategory: s.impactCategory,
      requiredForNextStep: true,
      conditionConfig: s.conditionConfig,
      waitConfig: s.waitConfig,
      handoffConfig: s.handoffConfig,
      approvalConfig: s.approvalConfig
    }));

    const expectedSteps = steps.map((s) => ({
      title: s.title,
      employeeCode: s.employeeCode || 'A01',
      type: s.type,
      description: s.description
    }));

    let triggerConfig = {
      type: triggerType,
      label: triggerType.replace(/_/g, ' '),
      description: triggerDetail.trim() || `Workflow activated by ${triggerType.toLowerCase()} event.`,
      keyword: triggerType === 'SOCIAL_COMMENT_KEYWORD' ? triggerKeyword : undefined,
      scheduleRecurrence: triggerType === 'SCHEDULE' ? triggerScheduleRecurrence : undefined,
      scheduleTime: triggerType === 'SCHEDULE' ? triggerScheduleTime : undefined,
      scheduleDayOfWeek: triggerType === 'SCHEDULE' ? triggerScheduleDay : undefined
    };

    return {
      name: name.trim() || 'Custom Workflow',
      title: name.trim() || 'Custom Workflow',
      outcome: outcome.trim() || 'Custom business outcome.',
      category,
      shortDescription: outcome.trim() || 'Custom multi-agent process.',
      typicalDuration,
      complexity: (complexity === 'starter' ? 'simple' : complexity === 'moderate' ? 'moderate' : 'comprehensive') as 'simple' | 'moderate' | 'comprehensive',
      participatingEmployeeIds,
      employeeIds: participatingEmployeeIds,
      expectedSteps,
      approvalPoints: steps.filter((s) => s.type === 'human_approval').map((s) => s.title),
      requiredConnectionTypes: selectedConnections,
      inputs: ['Business Context', 'Target Parameters'],
      outputs: steps.map((s) => s.expectedOutput || s.title),
      successMetrics: metrics.map((m) => `${m.name}: Target ${m.targetValue}`),
      templateSource: 'personal' as const,
      status: 'active' as const,
      editable: true,
      workspaceId: activeWorkspace.id,
      trigger: triggerConfig,
      richSteps
    };
  };

  const handleSaveDraft = () => {
    const payload = compileTemplatePayload();
    if (templateId) {
      updateCustomWorkflowTemplate(templateId, payload);
    } else {
      createCustomWorkflowTemplate(payload);
    }
    setIsDirty(false);
    setIsWorkflowBuilderOpen(false);
    setWorkflowBuilderEditingTemplate(null);
    setWorkflowBuilderInitialIntent(null);
  };

  // Requirement 1: Run Workflow routes into EXISTING WorkflowSetupWizardModal
  const handleRunWorkflow = () => {
    if (!validationResult.isValid) {
      setActiveTab('validation');
      return;
    }

    const payload = compileTemplatePayload();
    let finalId = templateId;

    if (templateId) {
      updateCustomWorkflowTemplate(templateId, payload);
    } else {
      finalId = createCustomWorkflowTemplate(payload);
    }

    setIsDirty(false);
    setIsWorkflowBuilderOpen(false);
    setWorkflowBuilderEditingTemplate(null);
    setWorkflowBuilderInitialIntent(null);

    // Route to locked WorkflowSetupWizardModal
    if (finalId) {
      openWorkflowSetup(finalId);
    }
  };

  const handleCloseAttempt = () => {
    if (isDirty) {
      setShowUnsavedPrompt(true);
    } else {
      setIsWorkflowBuilderOpen(false);
      setWorkflowBuilderEditingTemplate(null);
      setWorkflowBuilderInitialIntent(null);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER HELPERS
  // ---------------------------------------------------------------------------
  const getStepTypeBadge = (type: WorkflowStepType) => {
    switch (type) {
      case 'employee_task':
        return { label: 'AI Specialist Task', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'human_task':
        return { label: 'Human Teammate Task', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'human_approval':
        return { label: 'Human Approval Gate', color: 'bg-amber-50 text-amber-800 border-amber-300' };
      case 'condition':
        return { label: 'Condition Branch (IF / THEN)', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'wait_schedule':
        return { label: 'Wait Timer / Delay', color: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'handoff':
        return { label: 'Context Handoff', color: 'bg-teal-50 text-teal-800 border-teal-200' };
      default:
        return { label: 'Step', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-slate-900">
                  {templateId ? `Edit Workflow: ${name || 'Untitled'}` : 'Custom Workflow Authoring'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800">
                  v{versionNumber}
                </span>
                {templateId && (
                  <span className="text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-medium">
                    Changes apply to future runs. Existing Projects are unchanged.
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Design multi-agent sequence, human collaboration tasks, review gates, and triggers
              </p>
            </div>
          </div>

          <button
            onClick={handleCloseAttempt}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Top Navigation Tabs: Builder / Validation / Preview */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'builder'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Step Sequence Builder
            </button>

            <button
              onClick={() => setActiveTab('validation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'validation'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Validation Check</span>
              {validationResult.errors.length > 0 ? (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                  {validationResult.errors.length}
                </span>
              ) : validationResult.warnings.length > 0 ? (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {validationResult.warnings.length}
                </span>
              ) : (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                  ✓
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Plain-Language Preview</span>
            </button>
          </div>

          {/* Builder Step Stepper (when in builder tab) */}
          {activeTab === 'builder' && (
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              {[
                { s: 1, label: 'Basics & Trigger' },
                { s: 2, label: 'Steps Sequence' },
                { s: 3, label: 'Governance & Metrics' }
              ].map((b) => (
                <button
                  key={b.s}
                  onClick={() => setBuilderStep(b.s as any)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    builderStep === b.s ? 'bg-slate-100 text-slate-900 font-bold' : 'hover:text-slate-800'
                  }`}
                >
                  {b.s}. {b.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* ================================================================= */}
          {/* TAB 1: BUILDER */}
          {/* ================================================================= */}
          {activeTab === 'builder' && (
            <div className="space-y-6">
              {/* SUB-SECTION 1: BASICS & TRIGGERS (Requirement 7) */}
              {builderStep === 1 && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Workflow Title *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          markDirty();
                        }}
                        placeholder="e.g. Weekly Content Production & Distribution"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          markDirty();
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden cursor-pointer"
                      >
                        <option value="Growth & Marketing">Growth & Marketing</option>
                        <option value="Sales Operations">Sales Operations</option>
                        <option value="Content & Creative">Content & Creative</option>
                        <option value="Operations & Support">Operations & Support</option>
                        <option value="Strategy & Commerce">Strategy & Commerce</option>
                        <option value="Custom">Custom / General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Business Outcome *
                    </label>
                    <textarea
                      rows={2}
                      value={outcome}
                      onChange={(e) => {
                        setOutcome(e.target.value);
                        markDirty();
                      }}
                      placeholder="Describe the measurable business result this workflow achieves (e.g. Schedule and distribute 3 multi-platform articles with founder signoff)."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                    />
                  </div>

                  {/* 10 Triggers Configuration (Requirement 7) */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-600" />
                        <span>Activation Trigger Type (10 Supported Local Triggers)</span>
                      </span>
                      <span className="text-[10px] text-slate-500">Local demo triggers</span>
                    </div>

                    <select
                      value={triggerType}
                      onChange={(e) => {
                        setTriggerType(e.target.value as any);
                        markDirty();
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden cursor-pointer"
                    >
                      <option value="MANUAL">Manual Trigger (Founder / Team Dispatches On Demand)</option>
                      <option value="SCHEDULE">Recurring Schedule (Weekly, Weekdays, Monthly)</option>
                      <option value="NEW_FORM_SUBMISSION">Website Lead Form Submission</option>
                      <option value="NEW_LEAD">New CRM Lead Captured</option>
                      <option value="SOCIAL_COMMENT_KEYWORD">Social Comment Keyword Match (e.g. "DEMO", "GROW")</option>
                      <option value="NEW_INBOUND_MESSAGE">New Inbound Customer Message (Email / WhatsApp)</option>
                      <option value="NEW_ORDER">New E-Commerce Order / Abandoned Cart</option>
                      <option value="DEAL_STAGE_CHANGED">Sales Deal Stage Changed</option>
                      <option value="WORKFLOW_COMPLETED">Preceding Workflow Completed</option>
                      <option value="PROJECT_CREATED">Project Initialized</option>
                    </select>

                    {/* Trigger Parameter Controls */}
                    {triggerType === 'SCHEDULE' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-white border border-slate-200">
                        <div>
                          <label className="block text-[11px] text-slate-600 font-semibold mb-1">Recurrence</label>
                          <select
                            value={triggerScheduleRecurrence}
                            onChange={(e) => {
                              setTriggerScheduleRecurrence(e.target.value as any);
                              markDirty();
                            }}
                            className="w-full rounded border border-slate-200 p-1.5 text-xs text-slate-800"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekdays">Weekdays</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-600 font-semibold mb-1">Day of Week</label>
                          <select
                            value={triggerScheduleDay}
                            onChange={(e) => {
                              setTriggerScheduleDay(e.target.value);
                              markDirty();
                            }}
                            className="w-full rounded border border-slate-200 p-1.5 text-xs text-slate-800"
                          >
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-600 font-semibold mb-1">Scheduled Time</label>
                          <input
                            type="text"
                            value={triggerScheduleTime}
                            onChange={(e) => {
                              setTriggerScheduleTime(e.target.value);
                              markDirty();
                            }}
                            placeholder="09:00 AM"
                            className="w-full rounded border border-slate-200 p-1.5 text-xs text-slate-800"
                          />
                        </div>
                      </div>
                    )}

                    {triggerType === 'SOCIAL_COMMENT_KEYWORD' && (
                      <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                        <label className="block text-[11px] text-slate-600 font-semibold">Trigger Keyword</label>
                        <input
                          type="text"
                          value={triggerKeyword}
                          onChange={(e) => {
                            setTriggerKeyword(e.target.value);
                            markDirty();
                          }}
                          placeholder="e.g. DEMO, GROW, VIP"
                          className="w-full rounded border border-slate-200 p-1.5 text-xs text-slate-800 uppercase font-mono"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Expected Duration
                      </label>
                      <input
                        type="text"
                        value={typicalDuration}
                        onChange={(e) => {
                          setTypicalDuration(e.target.value);
                          markDirty();
                        }}
                        placeholder="e.g. 24-48 hours, 1 week"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Complexity Tier
                      </label>
                      <select
                        value={complexity}
                        onChange={(e) => {
                          setComplexity(e.target.value as any);
                          markDirty();
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden cursor-pointer"
                      >
                        <option value="starter">Starter (Single phase, simple handoff)</option>
                        <option value="moderate">Moderate (Multi-specialist, approval gates)</option>
                        <option value="advanced">Advanced (Condition branching, multi-channel)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setBuilderStep(2)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Continue to Steps Sequence</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-SECTION 2: STEP SEQUENCE (All 6 Step Types - Requirement 2 to 6) */}
              {builderStep === 2 && (
                <div className="space-y-4 animate-fade-in text-xs">
                  {/* Step Action Toolbar */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                        + Add Next Step to Sequence
                      </span>
                      <span className="text-[10px] text-slate-500">6 first-class step types</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAddStep('employee_task')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold transition-all shadow-2xs cursor-pointer"
                      >
                        <Users className="h-3 w-3 text-indigo-600" />
                        <span>AI Employee Task</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddStep('human_task')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold transition-all shadow-2xs cursor-pointer"
                      >
                        <UserCheck className="h-3 w-3 text-blue-600" />
                        <span>Human Teammate Task</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddStep('human_approval')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold transition-all shadow-2xs cursor-pointer"
                      >
                        <Shield className="h-3 w-3 text-amber-600" />
                        <span>Human Approval Gate</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddStep('condition')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold transition-all shadow-2xs cursor-pointer"
                      >
                        <GitBranch className="h-3 w-3 text-purple-600" />
                        <span>Condition (IF / THEN)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddStep('wait_schedule')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold transition-all shadow-2xs cursor-pointer"
                      >
                        <Timer className="h-3 w-3 text-slate-600" />
                        <span>Wait Timer</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddStep('handoff')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold transition-all shadow-2xs cursor-pointer"
                      >
                        <ArrowRightLeft className="h-3 w-3 text-teal-600" />
                        <span>Handoff</span>
                      </button>
                    </div>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-3">
                    {steps.map((st, idx) => {
                      const badge = getStepTypeBadge(st.type);
                      const isApproval = st.type === 'human_approval';
                      const isHumanTask = st.type === 'human_task';
                      const isCondition = st.type === 'condition';
                      const isWait = st.type === 'wait_schedule';
                      const isHandoff = st.type === 'handoff';

                      return (
                        <div
                          key={st.id}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                            isApproval
                              ? 'border-amber-300 bg-amber-50/30'
                              : isCondition
                              ? 'border-purple-200 bg-purple-50/20'
                              : isHumanTask
                              ? 'border-blue-200 bg-blue-50/20'
                              : isHandoff
                              ? 'border-teal-200 bg-teal-50/20'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          {/* Step Header */}
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="h-5 w-5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <input
                                type="text"
                                value={st.title}
                                onChange={(e) => handleUpdateStep(idx, { title: e.target.value })}
                                placeholder="Step Title"
                                className="font-bold text-slate-900 text-xs border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-hidden px-1 bg-transparent"
                              />
                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveStep(idx, 'up')}
                                className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                                title="Move Up"
                              >
                                <ChevronUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === steps.length - 1}
                                onClick={() => handleMoveStep(idx, 'down')}
                                className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                                title="Move Down"
                              >
                                <ChevronDown className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveStep(idx)}
                                disabled={steps.length <= 1}
                                className="p-1 rounded text-rose-500 hover:text-rose-700 disabled:opacity-20 cursor-pointer"
                                title="Remove Step"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Specific Editor based on Type */}

                          {/* TYPE 1: AI EMPLOYEE TASK */}
                          {st.type === 'employee_task' && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                              <div className="sm:col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Instructions & Prompt</label>
                                <input
                                  type="text"
                                  value={st.description}
                                  onChange={(e) => handleUpdateStep(idx, { description: e.target.value })}
                                  placeholder="Specific instructions for this specialist..."
                                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Assigned Specialist</label>
                                <select
                                  value={st.employeeCode || 'A02'}
                                  onChange={(e) => handleUpdateStep(idx, { employeeCode: e.target.value })}
                                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden cursor-pointer"
                                >
                                  {employees.map((emp) => (
                                    <option key={emp.id} value={emp.code}>
                                      {emp.code} · {emp.name} ({emp.title})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}

                          {/* TYPE 2: HUMAN TASK (Requirement 3) */}
                          {isHumanTask && (
                            <div className="space-y-2 pt-1 border-t border-blue-100">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                <div className="sm:col-span-2">
                                  <label className="block text-[10px] font-bold text-blue-900 mb-0.5">Human Task Instructions</label>
                                  <input
                                    type="text"
                                    value={st.description}
                                    onChange={(e) => handleUpdateStep(idx, { description: e.target.value })}
                                    placeholder="e.g. Upload approved product photography set and signoff sheet."
                                    className="w-full rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-blue-900 mb-0.5">Workspace Teammate Assignee</label>
                                  <select
                                    value={st.humanAssigneeName || (teamMembers[0]?.name || 'Prashant')}
                                    onChange={(e) => {
                                      const member = teamMembers.find((m) => m.name === e.target.value);
                                      handleUpdateStep(idx, {
                                        humanAssigneeName: e.target.value,
                                        humanAssigneeRole: member ? member.role : 'member'
                                      });
                                    }}
                                    className="w-full rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden cursor-pointer"
                                  >
                                    {teamMembers.map((tm) => (
                                      <option key={tm.id} value={tm.name}>
                                        {tm.name} ({tm.role})
                                      </option>
                                    ))}
                                    <option value="Project Owner (Placeholder)">Project Owner (Placeholder Role)</option>
                                    <option value="Artisan Specialist (Placeholder)">Artisan Specialist (Placeholder)</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div>
                                  <label className="block text-[10px] font-bold text-blue-900 mb-0.5">Expected Deliverable</label>
                                  <input
                                    type="text"
                                    value={st.expectedOutput || ''}
                                    onChange={(e) => handleUpdateStep(idx, { expectedOutput: e.target.value })}
                                    placeholder="e.g. Final product-image set and verification signature"
                                    className="w-full rounded border border-blue-200 bg-white px-2 py-1 text-xs text-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-blue-900 mb-0.5">Due Timing</label>
                                  <input
                                    type="text"
                                    value={st.dueTiming || ''}
                                    onChange={(e) => handleUpdateStep(idx, { dueTiming: e.target.value })}
                                    placeholder="e.g. Within 2 business days"
                                    className="w-full rounded border border-blue-200 bg-white px-2 py-1 text-xs text-slate-900"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* TYPE 3: HUMAN APPROVAL GATE */}
                          {isApproval && (
                            <div className="space-y-2 pt-1 border-t border-amber-200">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                <div className="sm:col-span-2">
                                  <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Subject to Review</label>
                                  <input
                                    type="text"
                                    value={st.approvalConfig?.subjectToApprove || st.description}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        description: e.target.value,
                                        approvalConfig: {
                                          ...(st.approvalConfig || { approverRole: 'Project Owner', riskCategory: 'Public' }),
                                          subjectToApprove: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="e.g. Review Meta Ad Set budget and creative pairing before live spend"
                                    className="w-full rounded-lg border border-amber-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Reviewer Role</label>
                                  <select
                                    value={st.approvalConfig?.approverRole || 'Project Owner'}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        approvalConfig: {
                                          ...(st.approvalConfig || { subjectToApprove: st.title }),
                                          approverRole: e.target.value
                                        }
                                      })
                                    }
                                    className="w-full rounded-lg border border-amber-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden cursor-pointer"
                                  >
                                    <option value="Project Owner">Project Owner</option>
                                    <option value="Founder / Executive">Founder / Executive</option>
                                    <option value="Compliance Officer">Compliance Officer</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* TYPE 4: CONDITION STEP (Requirement 4: IF / THEN / OTHERWISE) */}
                          {isCondition && (
                            <div className="p-3 rounded-lg bg-purple-50/50 border border-purple-200 space-y-2.5">
                              {/* IF Statement */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="font-bold text-purple-900 uppercase text-[10px] tracking-wider px-2 py-0.5 bg-purple-100 rounded self-start">
                                  IF
                                </span>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <select
                                    value={st.conditionConfig?.field || 'Lead Status'}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        conditionConfig: {
                                          field: e.target.value,
                                          operator: st.conditionConfig?.operator || 'equals',
                                          value: st.conditionConfig?.value || 'Qualified',
                                          thenActionDescription: st.conditionConfig?.thenActionDescription || 'Book Meeting',
                                          elseActionDescription: st.conditionConfig?.elseActionDescription || 'Route to Nurture'
                                        }
                                      })
                                    }
                                    className="rounded border border-purple-300 bg-white p-1.5 text-xs text-slate-800"
                                  >
                                    <option value="Lead Status">Lead Status</option>
                                    <option value="Lead Score / ICP Tier">Lead Score / ICP Tier</option>
                                    <option value="Consent Status">Consent Status</option>
                                    <option value="Reply Status">Reply Status</option>
                                    <option value="Deal Stage">Deal Stage</option>
                                    <option value="Order State">Order State</option>
                                    <option value="Support State">Support State</option>
                                    <option value="Social Keyword Match">Social Keyword Match</option>
                                    <option value="Approval Result">Approval Result</option>
                                    <option value="Campaign Threshold">Campaign Threshold</option>
                                  </select>

                                  <select
                                    value={st.conditionConfig?.operator || 'equals'}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        conditionConfig: {
                                          ...(st.conditionConfig || { field: 'Lead Status', value: 'Qualified' }),
                                          operator: e.target.value as any
                                        }
                                      })
                                    }
                                    className="rounded border border-purple-300 bg-white p-1.5 text-xs text-slate-800"
                                  >
                                    <option value="equals">is equal to</option>
                                    <option value="contains">contains</option>
                                    <option value="greater_than">is greater than</option>
                                    <option value="is_true">is verified / true</option>
                                  </select>

                                  <input
                                    type="text"
                                    value={st.conditionConfig?.value || ''}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        conditionConfig: {
                                          ...(st.conditionConfig || { field: 'Lead Status', operator: 'equals' }),
                                          value: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="e.g. Qualified, >80, DEMO"
                                    className="rounded border border-purple-300 bg-white p-1.5 text-xs text-slate-800"
                                  />
                                </div>
                              </div>

                              {/* THEN Branch */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-4 border-l-2 border-teal-400">
                                <span className="font-bold text-teal-800 uppercase text-[10px] tracking-wider px-2 py-0.5 bg-teal-100 rounded self-start">
                                  THEN
                                </span>
                                <input
                                  type="text"
                                  value={st.conditionConfig?.thenActionDescription || ''}
                                  onChange={(e) =>
                                    handleUpdateStep(idx, {
                                      conditionConfig: {
                                        ...(st.conditionConfig || { field: 'Lead Status', operator: 'equals', value: 'Qualified' }),
                                        thenActionDescription: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="Action or target step (e.g. Book Discovery Meeting with Inbound Sales Jordan Bell)"
                                  className="flex-1 rounded border border-teal-300 bg-white p-1.5 text-xs text-slate-800"
                                />
                              </div>

                              {/* OTHERWISE Branch */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-4 border-l-2 border-amber-400">
                                <span className="font-bold text-amber-800 uppercase text-[10px] tracking-wider px-2 py-0.5 bg-amber-100 rounded self-start">
                                  OTHERWISE
                                </span>
                                <input
                                  type="text"
                                  value={st.conditionConfig?.elseActionDescription || ''}
                                  onChange={(e) =>
                                    handleUpdateStep(idx, {
                                      conditionConfig: {
                                        ...(st.conditionConfig || { field: 'Lead Status', operator: 'equals', value: 'Qualified' }),
                                        elseActionDescription: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="Action or target step (e.g. Route to Elena Rostova 4-Week Nurture Sequence)"
                                  className="flex-1 rounded border border-amber-300 bg-white p-1.5 text-xs text-slate-800"
                                />
                              </div>
                            </div>
                          )}

                          {/* TYPE 5: WAIT STEP (Requirement 5) */}
                          {isWait && (
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Wait Type</label>
                                  <select
                                    value={st.waitConfig?.waitType || 'duration'}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        waitConfig: {
                                          waitType: e.target.value as any,
                                          durationValue: st.waitConfig?.durationValue || '2 days',
                                          simulatedEventName: st.waitConfig?.simulatedEventName || 'Wait until prospect replies'
                                        }
                                      })
                                    }
                                    className="w-full rounded border border-slate-200 bg-white p-1.5 text-xs text-slate-800"
                                  >
                                    <option value="duration">Wait for Duration (e.g. 2 days)</option>
                                    <option value="date_time">Wait until Date / Time (e.g. Monday 9:00 AM)</option>
                                    <option value="simulated_event">Wait for Simulated Event (e.g. Prospect replies)</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Timing Parameter</label>
                                  <input
                                    type="text"
                                    value={
                                      st.waitConfig?.waitType === 'duration'
                                        ? st.waitConfig?.durationValue || '2 days'
                                        : st.waitConfig?.waitType === 'date_time'
                                        ? st.waitConfig?.dateTimeValue || 'Monday at 9:00 AM'
                                        : st.waitConfig?.simulatedEventName || 'Wait until prospect replies'
                                    }
                                    onChange={(e) => {
                                      const wType = st.waitConfig?.waitType || 'duration';
                                      handleUpdateStep(idx, {
                                        waitConfig: {
                                          waitType: wType,
                                          durationValue: wType === 'duration' ? e.target.value : undefined,
                                          dateTimeValue: wType === 'date_time' ? e.target.value : undefined,
                                          simulatedEventName: wType === 'simulated_event' ? e.target.value : undefined
                                        }
                                      });
                                    }}
                                    placeholder="e.g. 2 business days"
                                    className="w-full rounded border border-slate-200 bg-white p-1.5 text-xs text-slate-800"
                                  />
                                </div>
                              </div>

                              {/* Mandatory Disclaimer Banner (Requirement 5) */}
                              <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-center gap-1.5">
                                <Info className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                                <span>Demo timing only. This workflow will not continue while the browser is closed.</span>
                              </div>
                            </div>
                          )}

                          {/* TYPE 6: HANDOFF STEP (Requirement 6) */}
                          {isHandoff && (
                            <div className="p-3 rounded-lg bg-teal-50/40 border border-teal-200 space-y-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-teal-900 mb-0.5">From Role / Specialist</label>
                                  <select
                                    value={st.handoffConfig?.fromEmployeeCode || 'A12'}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        handoffConfig: {
                                          ...(st.handoffConfig || { toEmployeeCode: 'A18', contextArtifacts: [] }),
                                          fromEmployeeCode: e.target.value
                                        }
                                      })
                                    }
                                    className="w-full rounded border border-teal-300 bg-white p-1.5 text-xs text-slate-800"
                                  >
                                    <optgroup label="AI Specialists">
                                      {employees.map((emp) => (
                                        <option key={emp.id} value={emp.code}>{emp.code} · {emp.name} ({emp.title})</option>
                                      ))}
                                    </optgroup>
                                    <optgroup label="Human Roles">
                                      <option value="HUMAN_OWNER">Human: Project Owner</option>
                                      <option value="HUMAN_APPROVER">Human: Project Approver</option>
                                      <option value="HUMAN_TEAMMATE">Human: Workspace Teammate</option>
                                    </optgroup>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-[10px] font-bold text-teal-900 mb-0.5">To Recipient Role</label>
                                  <select
                                    value={st.handoffConfig?.toEmployeeCode || 'A18'}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        handoffConfig: {
                                          ...(st.handoffConfig || { fromEmployeeCode: 'A12', contextArtifacts: [] }),
                                          toEmployeeCode: e.target.value
                                        }
                                      })
                                    }
                                    className="w-full rounded border border-teal-300 bg-white p-1.5 text-xs text-slate-800"
                                  >
                                    <optgroup label="AI Specialists">
                                      {employees.map((emp) => (
                                        <option key={emp.id} value={emp.code}>{emp.code} · {emp.name} ({emp.title})</option>
                                      ))}
                                    </optgroup>
                                    <optgroup label="Human Roles">
                                      <option value="HUMAN_OWNER">Human: Project Owner</option>
                                      <option value="HUMAN_APPROVER">Human: Project Approver</option>
                                      <option value="HUMAN_TEAMMATE">Human: Workspace Teammate</option>
                                    </optgroup>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-teal-900 mb-0.5">Context & Deliverables Passed</label>
                                  <input
                                    type="text"
                                    value={st.handoffConfig?.contextArtifacts?.join(', ') || 'Approved copy, Campaign brief, Brand guidelines'}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        handoffConfig: {
                                          ...(st.handoffConfig || { fromEmployeeCode: 'A12', toEmployeeCode: 'A18' }),
                                          contextArtifacts: e.target.value.split(',').map((s) => s.trim())
                                        }
                                      })
                                    }
                                    placeholder="Approved copy, Campaign brief, Brand guidelines"
                                    className="w-full rounded border border-teal-300 bg-white p-1.5 text-xs text-slate-800"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[10px] font-bold text-teal-900 mb-0.5">Expected Next Responsibility</label>
                                  <input
                                    type="text"
                                    value={st.handoffConfig?.expectedNextResponsibility || ''}
                                    onChange={(e) =>
                                      handleUpdateStep(idx, {
                                        handoffConfig: {
                                          ...(st.handoffConfig || { fromEmployeeCode: 'A12', toEmployeeCode: 'A18', contextArtifacts: [] }),
                                          expectedNextResponsibility: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="e.g. Produce visual assets and draft scheduling queue"
                                    className="w-full rounded border border-teal-300 bg-white p-1.5 text-xs text-slate-800"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Impact Category Flag */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Impact Category:</span>
                            <select
                              value={st.impactCategory}
                              onChange={(e) => handleUpdateStep(idx, { impactCategory: e.target.value as any })}
                              className="text-[11px] rounded border border-slate-200 bg-white px-2 py-0.5 text-slate-700"
                            >
                              <option value="internal_work">Internal Work (Standard)</option>
                              <option value="public_publishing">Public Publishing</option>
                              <option value="paid_advertising">Paid Advertising / Spend (Requires Approval)</option>
                              <option value="commercial_commitment">Commercial Commitment (Requires Approval)</option>
                              <option value="reputation_response">Public Reputation Response</option>
                              <option value="destructive_action">Destructive Action</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setBuilderStep(1)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      <span>Back to Basics</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBuilderStep(3)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Continue to Governance & Metrics</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-SECTION 3: GOVERNANCE, CHANNELS & METRICS */}
              {builderStep === 3 && (
                <div className="space-y-4 animate-fade-in text-xs">
                  {/* Channels selection */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Required Channel Connections</h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Select external providers this workflow relies upon during execution:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PROVIDER_CATALOG.map((item) => {
                      const isChecked = selectedConnections.includes(item.provider);
                      const isConn = integrationConnections.some(
                        (c) => c.workspaceId === activeWorkspace.id && c.provider === item.provider && c.status === 'connected'
                      );

                      return (
                        <div
                          key={item.provider}
                          onClick={() => handleToggleConnection(item.provider)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isChecked
                              ? 'border-slate-900 bg-slate-50 shadow-2xs ring-1 ring-slate-900'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs">{item.name}</span>
                            <div className="flex items-center gap-1.5">
                              {isConn ? (
                                <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                                  Connected
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-medium">Unconnected</span>
                              )}
                              <div
                                className={`h-4 w-4 rounded-md flex items-center justify-center text-white ${
                                  isChecked ? 'bg-slate-900' : 'border border-slate-300 bg-white'
                                }`}
                              >
                                {isChecked && <Check className="h-3 w-3" />}
                              </div>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Target Success Metrics (Requirement 24) */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                        Target Success Metrics ({metrics.length})
                      </span>
                      <span className="text-[10px] text-slate-500">Benchmark scorecard tracking</span>
                    </div>

                    <div className="space-y-2">
                      {metrics.map((m) => (
                        <div key={m.id} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs">
                          <span className="font-semibold text-slate-900">{m.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-teal-700 font-bold">Target: {m.targetValue}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveMetric(m.id)}
                              className="text-slate-400 hover:text-rose-600 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newMetricName}
                        onChange={(e) => setNewMetricName(e.target.value)}
                        placeholder="Metric Name (e.g. Discovery Meetings Booked)"
                        className="flex-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={newMetricTarget}
                        onChange={(e) => setNewMetricTarget(e.target.value)}
                        placeholder="Target (e.g. 15)"
                        className="w-24 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={handleAddMetric}
                        disabled={!newMetricName.trim()}
                        className="px-3 py-1 rounded bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setBuilderStep(2)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      <span>Back to Steps</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Review Plain-Language Preview</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: VALIDATION ENGINE (Requirement 8 & 25) */}
          {/* ================================================================= */}
          {activeTab === 'validation' && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="p-4 rounded-xl border bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {validationResult.isValid ? (
                      <CheckCircle2 className="h-5 w-5 text-teal-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-rose-600" />
                    )}
                    <h3 className="font-bold text-sm text-slate-900">
                      {validationResult.isValid ? 'Validation Passed — Ready to Run' : 'Validation Issues Detected'}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Checked {validationResult.checkedCount} verification rules
                  </span>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {validationResult.isValid
                    ? 'All required step assignments, triggers, governance safety gates, and parameters are verified.'
                    : 'Blocking errors prevent launching this workflow. Fix the blocking errors below before running.'}
                </p>
              </div>

              {/* Blocking Errors */}
              {validationResult.errors.length > 0 && (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-2">
                  <span className="font-bold text-rose-950 uppercase text-[10px] tracking-wider block">
                    Blocking Errors ({validationResult.errors.length}) — Must fix before running
                  </span>
                  <div className="space-y-1.5">
                    {validationResult.errors.map((err, i) => (
                      <div key={i} className="flex items-start gap-2 text-rose-900">
                        <X className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>{err}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Non-Blocking Warnings */}
              {validationResult.warnings.length > 0 && (
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2">
                  <span className="font-bold text-amber-950 uppercase text-[10px] tracking-wider block">
                    Advisory Warnings ({validationResult.warnings.length}) — Will not block saving
                  </span>
                  <div className="space-y-1.5">
                    {validationResult.warnings.map((warn, i) => (
                      <div key={i} className="flex items-start gap-2 text-amber-900">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{warn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scorecard checklist */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block">
                  Workflow Quality Checklist
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-teal-800">
                    <Check className="h-3.5 w-3.5 text-teal-600" />
                    <span>Trigger calibrated: {triggerType.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-800">
                    <Check className="h-3.5 w-3.5 text-teal-600" />
                    <span>Sequence constructed: {steps.length} sequential execution stages</span>
                  </div>
                  <div className={`flex items-center gap-2 ${steps.some(s => s.type === 'human_approval') ? 'text-teal-800' : 'text-slate-500'}`}>
                    {steps.some(s => s.type === 'human_approval') ? <Check className="h-3.5 w-3.5 text-teal-600" /> : <Info className="h-3.5 w-3.5 text-slate-400" />}
                    <span>Founder Approval Gates: {steps.filter(s => s.type === 'human_approval').length} configured</span>
                  </div>
                  <div className={`flex items-center gap-2 ${metrics.length > 0 ? 'text-teal-800' : 'text-amber-800'}`}>
                    {metrics.length > 0 ? <Check className="h-3.5 w-3.5 text-teal-600" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />}
                    <span>Success Target Metrics: {metrics.length} defined</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: PLAIN-LANGUAGE PREVIEW (Requirement 9) */}
          {/* ================================================================= */}
          {activeTab === 'preview' && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{name || 'Custom Multi-Agent Workflow'}</h3>
                    <span className="text-slate-500 text-xs">
                      Category: {category} · Duration: {typicalDuration} · v{versionNumber}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-900 border border-teal-200">
                    Execution Blueprint
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block text-indigo-700">
                    WHEN
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {triggerType === 'MANUAL' && 'The founder or operator launches this workflow on demand.'}
                    {triggerType === 'SCHEDULE' && `Triggered recurringly every ${triggerScheduleRecurrence === 'weekly' ? `${triggerScheduleDay} at ${triggerScheduleTime}` : triggerScheduleRecurrence}.`}
                    {triggerType === 'SOCIAL_COMMENT_KEYWORD' && `A prospect comments on social media with the trigger keyword "${triggerKeyword}".`}
                    {triggerType === 'NEW_FORM_SUBMISSION' && 'A prospect submits an inquiry form on the live landing page.'}
                    {triggerType === 'NEW_LEAD' && 'A new enriched lead enters the sales CRM pipeline.'}
                    {triggerType === 'NEW_INBOUND_MESSAGE' && 'A prospect or customer sends a new inbound message (Email or WhatsApp).'}
                    {triggerType === 'NEW_ORDER' && 'A customer places an order or abandons checkout in the catalog.'}
                    {triggerType === 'DEAL_STAGE_CHANGED' && 'A sales deal progresses to a new pipeline stage.'}
                    {triggerType === 'WORKFLOW_COMPLETED' && 'A preceding prerequisite workflow finishes execution.'}
                    {triggerType === 'PROJECT_CREATED' && 'A new business project is created in the workspace.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block text-teal-700">
                    THEN SEQUENCE
                  </span>

                  <div className="space-y-2.5">
                    {steps.map((st, i) => {
                      const emp = employees.find((e) => e.code === st.employeeCode);

                      if (st.type === 'condition') {
                        return (
                          <div key={st.id} className="p-2.5 rounded-lg bg-purple-50/40 border border-purple-200 space-y-1">
                            <span className="font-bold text-purple-900">{i + 1}. [Condition Evaluation]</span>
                            <p className="text-slate-800">
                              IF <strong>{st.conditionConfig?.field}</strong> {st.conditionConfig?.operator?.replace('_', ' ')} <strong>"{st.conditionConfig?.value}"</strong>:
                            </p>
                            <p className="text-teal-800 pl-3 border-l border-teal-400">
                              → THEN: {st.conditionConfig?.thenActionDescription}
                            </p>
                            <p className="text-amber-800 pl-3 border-l border-amber-400">
                              → OTHERWISE: {st.conditionConfig?.elseActionDescription}
                            </p>
                          </div>
                        );
                      }

                      if (st.type === 'human_approval') {
                        return (
                          <div key={st.id} className="p-2.5 rounded-lg bg-amber-50/40 border border-amber-300 flex items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-amber-900">{i + 1}. [Human Approval Gate] {st.title}</span>
                              <p className="text-slate-700 text-[11px] mt-0.5">{st.description}</p>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                              Founder Signoff
                            </span>
                          </div>
                        );
                      }

                      if (st.type === 'human_task') {
                        return (
                          <div key={st.id} className="p-2.5 rounded-lg bg-blue-50/40 border border-blue-200 flex items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-blue-900">{i + 1}. [Human Task] {st.title}</span>
                              <p className="text-slate-700 text-[11px] mt-0.5">{st.description}</p>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200 shrink-0">
                              Assignee: {st.humanAssigneeName || 'Teammate'}
                            </span>
                          </div>
                        );
                      }

                      if (st.type === 'wait_schedule') {
                        return (
                          <div key={st.id} className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-slate-800">{i + 1}. [Wait Timer] {st.title}</span>
                              <p className="text-slate-600 text-[11px] mt-0.5">{st.waitConfig?.durationValue || st.waitConfig?.simulatedEventName || 'Delay step'}</p>
                            </div>
                            <span className="text-[10px] text-slate-500">Demo timing</span>
                          </div>
                        );
                      }

                      if (st.type === 'handoff') {
                        const fromEmp = employees.find((e) => e.code === st.handoffConfig?.fromEmployeeCode);
                        const toEmp = employees.find((e) => e.code === st.handoffConfig?.toEmployeeCode);
                        const fromName = fromEmp ? fromEmp.name : (st.handoffConfig?.fromEmployeeCode?.replace('HUMAN_', 'Human ') || 'Specialist');
                        const toName = toEmp ? toEmp.name : (st.handoffConfig?.toEmployeeCode?.replace('HUMAN_', 'Human ') || 'Specialist');
                        return (
                          <div key={st.id} className="p-2.5 rounded-lg bg-teal-50/40 border border-teal-200 flex items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-teal-900">{i + 1}. [Handoff] {fromName} → {toName}</span>
                              <p className="text-slate-700 text-[11px] mt-0.5">
                                Pass: {st.handoffConfig?.contextArtifacts?.join(', ') || 'Deliverables and briefs'}
                                {st.handoffConfig?.expectedNextResponsibility && ` · Responsibility: ${st.handoffConfig.expectedNextResponsibility}`}
                              </p>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-900 border border-teal-200 shrink-0">
                              Handoff Trail
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div key={st.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-900">
                              {i + 1}. {emp ? `${emp.name} (${emp.code})` : 'Specialist'}: {st.title}
                            </span>
                            <p className="text-slate-600 text-[11px] mt-0.5">{st.description}</p>
                          </div>
                          {st.expectedOutput && (
                            <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                              Deliverable: {st.expectedOutput}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 6 Required Plain-Language Recap Sections (Requirement 9) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* 1. AI Team */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      AI Team ({Array.from(new Set(steps.map(s => s.employeeCode).filter(Boolean))).length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {Array.from(new Set(steps.map(s => s.employeeCode).filter(Boolean))).map((code) => {
                        const emp = employees.find(e => e.code === code);
                        return (
                          <span key={code} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 text-[10px] font-medium border border-indigo-200">
                            {emp ? `${emp.name} (${emp.code})` : code}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Human Team */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      Human Team Roles
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {steps.filter(s => s.type === 'human_task' || s.type === 'human_approval').length > 0 ? (
                        Array.from(new Set([
                          ...steps.filter(s => s.type === 'human_task').map(s => s.humanAssigneeName || s.humanAssigneeRole || 'Teammate'),
                          ...steps.filter(s => s.type === 'human_approval').map(s => s.approvalConfig?.approverRole || 'Project Approver')
                        ])).map((role, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 text-[10px] font-medium border border-blue-200">
                            {role}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400">Autonomous (no human tasks)</span>
                      )}
                    </div>
                  </div>

                  {/* 3. Connections */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      Connections ({selectedConnections.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {selectedConnections.map((c) => {
                        const cat = PROVIDER_CATALOG.find((p) => p.provider === c);
                        return (
                          <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-medium border border-slate-200">
                            {cat ? cat.name : c}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Approvals */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      Approvals ({steps.filter(s => s.type === 'human_approval').length})
                    </span>
                    <div className="space-y-1">
                      {steps.filter(s => s.type === 'human_approval').map((s) => (
                        <div key={s.id} className="text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 truncate font-medium">
                          {s.approvalConfig?.subjectToApprove || s.title}
                        </div>
                      ))}
                      {steps.filter(s => s.type === 'human_approval').length === 0 && (
                        <span className="text-[10px] text-slate-400">No approval gates</span>
                      )}
                    </div>
                  </div>

                  {/* 5. Expected Outputs */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      Expected Outputs ({steps.filter(s => s.expectedOutput).length})
                    </span>
                    <div className="space-y-1">
                      {steps.filter(s => s.expectedOutput).slice(0, 3).map((s) => (
                        <div key={s.id} className="text-[10px] text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 truncate">
                          {s.expectedOutput}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 6. Success Metrics */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">
                      Success Metrics ({metrics.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {metrics.map((m) => (
                        <span key={m.id} className="px-2 py-0.5 rounded bg-teal-50 text-teal-900 text-[10px] font-semibold border border-teal-200">
                          {m.name}: {m.targetValue}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Locked Execution Path (Requirement 1) */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCloseAttempt}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              <Save className="h-3.5 w-3.5 text-slate-500" />
              <span>Save as Template</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Requirement 1: Run Workflow routes through WorkflowSetupWizardModal */}
            <button
              type="button"
              onClick={handleRunWorkflow}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-xs cursor-pointer ${
                validationResult.isValid
                  ? 'bg-teal-700 hover:bg-teal-800'
                  : 'bg-slate-700 hover:bg-slate-800'
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Run Workflow</span>
            </button>
          </div>
        </div>

        {/* Unsaved Changes Confirmation Dialog (Requirement 18) */}
        {showUnsavedPrompt && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">You have unsaved changes</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Do you want to save this custom workflow as a draft template before leaving?
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUnsavedPrompt(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Continue Editing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUnsavedPrompt(false);
                    setIsDirty(false);
                    setIsWorkflowBuilderOpen(false);
                    setWorkflowBuilderEditingTemplate(null);
                    setWorkflowBuilderInitialIntent(null);
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-50 cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUnsavedPrompt(false);
                    handleSaveDraft();
                  }}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                >
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
