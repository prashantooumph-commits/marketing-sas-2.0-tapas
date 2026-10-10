import React, { useState } from 'react';
import {
  CustomWorkflowStepConfig,
  Employee,
  IntegrationProvider,
  StepImpactCategory,
  TeamMember
} from '../../../types';
import {
  X,
  Bot,
  User,
  ShieldCheck,
  GitBranch,
  Clock,
  ArrowRightLeft,
  Search,
  Check,
  AlertTriangle,
  Plug,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface WorkflowStepEditorModalProps {
  isOpen: boolean;
  step: CustomWorkflowStepConfig | null;
  employees: Employee[];
  teamMembers: TeamMember[];
  onClose: () => void;
  onSave: (updatedStep: CustomWorkflowStepConfig) => void;
}

const IMPACT_CATEGORIES: { value: StepImpactCategory; label: string; risk: 'low' | 'med' | 'high' }[] = [
  { value: 'internal_work', label: 'Internal Work Only (Safe, drafts)', risk: 'low' },
  { value: 'public_publishing', label: 'Public Publishing (Live posts/pages)', risk: 'med' },
  { value: 'paid_advertising', label: 'Paid Advertising / Ad Spend', risk: 'high' },
  { value: 'outbound_messaging', label: 'Outbound Messaging (Direct emails/DMs)', risk: 'med' },
  { value: 'new_audience_contact', label: 'New Audience Contact', risk: 'med' },
  { value: 'commercial_commitment', label: 'Commercial Commitment / Proposal', risk: 'high' },
  { value: 'reputation_response', label: 'Public Reputation Response', risk: 'high' },
  { value: 'pricing_change', label: 'Pricing / Promotional Change', risk: 'med' },
  { value: 'destructive_action', label: 'Destructive / Deletion Action', risk: 'high' }
];

const CONNECTION_PROVIDERS: { value: IntegrationProvider; label: string }[] = [
  { value: 'meta_business', label: 'Meta Business Suite' },
  { value: 'facebook_page', label: 'Facebook Verified Page' },
  { value: 'instagram_pro', label: 'Instagram Professional' },
  { value: 'linkedin_page', label: 'LinkedIn Company Page' },
  { value: 'google_workspace', label: 'Google Workspace (G-Suite)' },
  { value: 'gmail', label: 'Google Gmail' },
  { value: 'google_calendar', label: 'Google Calendar' },
  { value: 'google_ads', label: 'Google Ads' },
  { value: 'website_cms', label: 'Headless Website CMS' },
  { value: 'whatsapp_business', label: 'WhatsApp Business' },
  { value: 'voice_twilio', label: 'Twilio Voice' },
  { value: 'stripe_billing', label: 'Stripe Merchant Billing' }
];

const CONDITION_FIELDS = [
  { value: 'Lead status', label: 'Lead status (Qualified, Contacted, Opted out)' },
  { value: 'Lead score / ICP tier', label: 'Lead score / ICP tier (Tier A, Tier B, Tier C)' },
  { value: 'Reply status', label: 'Reply status (Replied, No reply, Unsubscribe)' },
  { value: 'Consent status', label: 'Consent status (Marketing consented, Revoked)' },
  { value: 'Deal stage', label: 'Deal stage (Discovery, Proposal Sent, Closed Won)' },
  { value: 'Campaign result threshold', label: 'Campaign result threshold (e.g. >10 leads)' },
  { value: 'Order state', label: 'Order state (Completed, Abandoned, Refunded)' },
  { value: 'Support/contact state', label: 'Support state (Resolved, Escalated)' },
  { value: 'Social keyword match', label: 'Social keyword match (DEMO, GROW, VIP)' },
  { value: 'Approval result', label: 'Approval result (Approved, Changes requested)' }
];

export const WorkflowStepEditorModal: React.FC<WorkflowStepEditorModalProps> = ({
  isOpen,
  step,
  employees,
  teamMembers,
  onClose,
  onSave
}) => {
  if (!isOpen || !step) return null;

  // Local form state initialized from step
  const [title, setTitle] = useState(step.title);
  const [description, setDescription] = useState(step.description);
  const [type, setType] = useState(step.type);

  // AI Task state
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    step.employeeId || employees.find((e) => e.code === step.employeeCode)?.id || employees[0]?.id || ''
  );
  const [empSearch, setEmpSearch] = useState('');
  const [empCategory, setEmpCategory] = useState<string>('All');
  const [expectedOutput, setExpectedOutput] = useState(step.expectedOutput || '');
  const [inputsText, setInputsText] = useState((step.inputs || []).join(', '));
  const [impactCategory, setImpactCategory] = useState<StepImpactCategory>(step.impactCategory || 'internal_work');
  const [requiredConnection, setRequiredConnection] = useState<IntegrationProvider | ''>(
    step.requiredConnections?.[0] || ''
  );

  // Human Task state
  const [humanAssigneeName, setHumanAssigneeName] = useState(
    step.humanAssigneeName || teamMembers[0]?.name || 'Workspace Teammate'
  );
  const [humanAssigneeRole, setHumanAssigneeRole] = useState(step.humanAssigneeRole || 'Project Contributor');
  const [humanInstructions, setHumanInstructions] = useState(step.humanInstructions || step.description);
  const [expectedDeliverable, setExpectedDeliverable] = useState(step.expectedDeliverable || '');
  const [timingNote, setTimingNote] = useState(step.timingNote || 'Within 24 hours');

  // Approval state
  const [approvalSubject, setApprovalSubject] = useState(step.approvalConfig?.subjectToApprove || step.title);
  const [approverRole, setApproverRole] = useState(step.approvalConfig?.approverRole || 'Project Approver');
  const [approvalRisk, setApprovalRisk] = useState(step.approvalConfig?.riskCategory || 'Standard Review');
  const [onApproveAction, setOnApproveAction] = useState(step.approvalConfig?.onApproveAction || 'Continue to next step');
  const [onRequestChangesAction, setOnRequestChangesAction] = useState(
    step.approvalConfig?.onRequestChangesAction || 'Return to specialist for revision'
  );

  // Condition state
  const [condField, setCondField] = useState(step.conditionConfig?.field || 'Lead status');
  const [condOperator, setCondOperator] = useState(step.conditionConfig?.operator || 'equals');
  const [condValue, setCondValue] = useState(step.conditionConfig?.value || 'Qualified');
  const [thenAction, setThenAction] = useState(step.conditionConfig?.thenActionDescription || 'Continue to Discovery Meeting Booking');
  const [elseAction, setElseAction] = useState(step.conditionConfig?.elseActionDescription || 'Route contact to Lead Nurture sequence');

  // Wait state
  const [waitType, setWaitType] = useState(step.waitConfig?.waitType || 'duration');
  const [durationValue, setDurationValue] = useState(step.waitConfig?.durationValue || '2 business days');
  const [dateTimeValue, setDateTimeValue] = useState(step.waitConfig?.dateTimeValue || 'Monday at 09:00 AM PST');
  const [simulatedEventName, setSimulatedEventName] = useState(step.waitConfig?.simulatedEventName || 'Lead replies with calendar availability');

  // Handoff state
  const [fromCode, setFromCode] = useState(step.handoffConfig?.fromEmployeeCode || step.employeeCode || 'A12');
  const [toCode, setToCode] = useState(step.handoffConfig?.toEmployeeCode || 'A18');
  const [contextArtifactsText, setContextArtifactsText] = useState((step.handoffConfig?.contextArtifacts || ['Approved Copy Brief', 'Brand Guidelines']).join(', '));
  const [handoffNote, setHandoffNote] = useState(step.handoffConfig?.handoffNote || 'Deliverable verified and ready for asset creation');

  // Validation
  const [error, setError] = useState<string | null>(null);

  // Filter employees for selector
  const filteredEmployees = employees.filter((e) => {
    const matchesCat = empCategory === 'All' || e.category === empCategory;
    const matchesSearch =
      e.name.toLowerCase().includes(empSearch.toLowerCase()) ||
      e.title.toLowerCase().includes(empSearch.toLowerCase()) ||
      e.code.toLowerCase().includes(empSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSave = () => {
    if (!title.trim()) {
      setError('Please provide a step title.');
      return;
    }

    const selectedEmp = employees.find((e) => e.id === selectedEmployeeId);

    const updated: CustomWorkflowStepConfig = {
      ...step,
      title: title.trim(),
      description: description.trim() || title.trim(),
      type,
      impactCategory
    };

    if (type === 'employee_task') {
      if (!selectedEmp) {
        setError('Please select an AI employee for this task.');
        return;
      }
      updated.employeeId = selectedEmp.id;
      updated.employeeCode = selectedEmp.code;
      updated.expectedOutput = expectedOutput.trim() || undefined;
      updated.inputs = inputsText ? inputsText.split(',').map((s) => s.trim()).filter(Boolean) : undefined;
      updated.requiredConnections = requiredConnection ? [requiredConnection] : [];
    } else if (type === 'human_task') {
      updated.humanAssigneeName = humanAssigneeName;
      updated.humanAssigneeRole = humanAssigneeRole;
      updated.humanInstructions = humanInstructions;
      updated.expectedDeliverable = expectedDeliverable;
      updated.timingNote = timingNote;
    } else if (type === 'human_approval') {
      updated.approvalConfig = {
        approverRole,
        subjectToApprove: approvalSubject.trim() || title.trim(),
        riskCategory: approvalRisk,
        onApproveAction,
        onRequestChangesAction
      };
      if (selectedEmp) {
        updated.employeeCode = selectedEmp.code;
        updated.employeeId = selectedEmp.id;
      }
    } else if (type === 'condition') {
      if (!thenAction.trim() || !elseAction.trim()) {
        setError('Please specify both the YES (Then) and NO (Otherwise) branch destinations.');
        return;
      }
      updated.conditionConfig = {
        field: condField,
        operator: condOperator as any,
        value: condValue.trim(),
        thenActionDescription: thenAction.trim(),
        elseActionDescription: elseAction.trim()
      };
    } else if (type === 'wait_schedule') {
      updated.waitConfig = {
        waitType: waitType as any,
        durationValue: waitType === 'duration' ? durationValue : undefined,
        dateTimeValue: waitType === 'date_time' ? dateTimeValue : undefined,
        simulatedEventName: waitType === 'simulated_event' ? simulatedEventName : undefined
      };
    } else if (type === 'handoff') {
      if (!toCode) {
        setError('Please select a destination specialist for the handoff.');
        return;
      }
      updated.handoffConfig = {
        fromEmployeeCode: fromCode,
        toEmployeeCode: toCode,
        contextArtifacts: contextArtifactsText ? contextArtifactsText.split(',').map((s) => s.trim()).filter(Boolean) : [],
        handoffNote
      };
      updated.employeeCode = fromCode;
    }

    setError(null);
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-65 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-scale-in max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
                Step Editor
              </span>
              <span className="text-xs text-slate-500 font-semibold capitalize">
                Type: {type.replace('_', ' ')}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Edit Step Parameters</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. General Step Info */}
          <div className="space-y-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Step Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Write 3 lead-generation hooks"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Plain-Language Responsibility / Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="What exactly should happen during this step?"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
              />
            </div>
          </div>

          {/* 2. Step Type Specific Controls */}

          {/* A. AI EMPLOYEE TASK */}
          {type === 'employee_task' && (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/20 p-4 space-y-4">
              <div className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Bot className="h-3.5 w-3.5 text-indigo-700" />
                <span>AI Specialist Assignment</span>
              </div>

              {/* Employee Chooser */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-semibold text-slate-700">Assign AI Specialist</span>
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                    {['All', 'Core', 'Sales Operations', 'Growth & Marketing', 'Content & Creative', 'Operations & Support'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setEmpCategory(cat)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          empCategory === cat ? 'bg-indigo-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={empSearch}
                    onChange={(e) => setEmpSearch(e.target.value)}
                    placeholder="Search by specialist name, title, or code (e.g. Porter, Copywriter, A12)..."
                    className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-hidden"
                  />
                </div>

                {/* Grid of employees */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-lg bg-white">
                  {filteredEmployees.map((emp) => {
                    const isSelected = selectedEmployeeId === emp.id;
                    return (
                      <div
                        key={emp.id}
                        onClick={() => setSelectedEmployeeId(emp.id)}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium ring-1 ring-indigo-600'
                            : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                        }`}
                      >
                        <div
                          className={`h-7 w-7 rounded-lg ${emp.avatarColor} text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0`}
                        >
                          {emp.code}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-900 truncate">{emp.name}</div>
                          <div className="text-[11px] text-slate-500 truncate">{emp.title}</div>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-indigo-700 shrink-0 mt-1" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Context inputs and outputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Context & Inputs Needed
                  </label>
                  <input
                    type="text"
                    value={inputsText}
                    onChange={(e) => setInputsText(e.target.value)}
                    placeholder="e.g. Brand voice, Offer details, Audience persona"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Comma separated tags</span>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Expected Deliverable Output
                  </label>
                  <input
                    type="text"
                    value={expectedOutput}
                    onChange={(e) => setExpectedOutput(e.target.value)}
                    placeholder="e.g. Three verified campaign hook drafts"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Connection & Impact Risk */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Required Channel Connection
                  </label>
                  <select
                    value={requiredConnection}
                    onChange={(e) => setRequiredConnection(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    <option value="">None (Internal work)</option>
                    {CONNECTION_PROVIDERS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Action Risk / Governance Classification
                  </label>
                  <select
                    value={impactCategory}
                    onChange={(e) => setImpactCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    {IMPACT_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* B. HUMAN TASK */}
          {type === 'human_task' && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/20 p-4 space-y-3.5">
              <div className="font-bold text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-amber-700" />
                <span>Human Teammate Assignment</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Human Assignee
                  </label>
                  <select
                    value={humanAssigneeName}
                    onChange={(e) => setHumanAssigneeName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                    <option value="Project Owner">Project Owner (Role placeholder)</option>
                    <option value="Executive Reviewer">Executive Reviewer (Role placeholder)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Teammate Role Title
                  </label>
                  <input
                    type="text"
                    value={humanAssigneeRole}
                    onChange={(e) => setHumanAssigneeRole(e.target.value)}
                    placeholder="e.g. Lead Designer, Operator, Founder"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Instructions for Teammate
                </label>
                <textarea
                  value={humanInstructions}
                  onChange={(e) => setHumanInstructions(e.target.value)}
                  rows={2}
                  placeholder="Specify exactly what file to upload or action to perform..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Expected Deliverable
                  </label>
                  <input
                    type="text"
                    value={expectedDeliverable}
                    onChange={(e) => setExpectedDeliverable(e.target.value)}
                    placeholder="e.g. Approved product photography set"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Timing / Due Window
                  </label>
                  <input
                    type="text"
                    value={timingNote}
                    onChange={(e) => setTimingNote(e.target.value)}
                    placeholder="e.g. Within 24 hours"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* C. HUMAN APPROVAL */}
          {type === 'human_approval' && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/20 p-4 space-y-3.5">
              <div className="font-bold text-rose-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-rose-700" />
                <span>Human-in-the-Loop Governance Checkpoint</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  What is Being Approved? *
                </label>
                <input
                  type="text"
                  value={approvalSubject}
                  onChange={(e) => setApprovalSubject(e.target.value)}
                  placeholder="e.g. Approve $1,500 Meta Ads Campaign Launch"
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Authorized Approver Role
                  </label>
                  <select
                    value={approverRole}
                    onChange={(e) => setApproverRole(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    <option value="Project Owner">Project Owner</option>
                    <option value="Workspace Admin">Workspace Admin</option>
                    <option value="Commercial Approver">Commercial Approver</option>
                    <option value="Legal Counsel">Legal Counsel</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Risk Category
                  </label>
                  <select
                    value={approvalRisk}
                    onChange={(e) => setApprovalRisk(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    <option value="High">High (Public publish / Ad spend / Commercial legal)</option>
                    <option value="Medium">Medium (Content draft / Email sequence)</option>
                    <option value="Low">Low (Internal plan review)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    On Approve
                  </label>
                  <input
                    type="text"
                    value={onApproveAction}
                    onChange={(e) => setOnApproveAction(e.target.value)}
                    placeholder="e.g. Continue to next step"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    On Request Changes
                  </label>
                  <input
                    type="text"
                    value={onRequestChangesAction}
                    onChange={(e) => setOnRequestChangesAction(e.target.value)}
                    placeholder="e.g. Return to specialist for revision"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
                This checkpoint creates an urgent approval card in the shared Inbox. Execution pauses until approved.
              </p>
            </div>
          )}

          {/* D. CONDITION */}
          {type === 'condition' && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/20 p-4 space-y-3.5">
              <div className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <GitBranch className="h-3.5 w-3.5 text-emerald-700" />
                <span>Simple IF / THEN Branch Rule</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    IF Evaluated Field
                  </label>
                  <select
                    value={condField}
                    onChange={(e) => setCondField(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    {CONDITION_FIELDS.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Operator
                  </label>
                  <select
                    value={condOperator}
                    onChange={(e) => setCondOperator(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    <option value="equals">is equal to</option>
                    <option value="contains">contains text</option>
                    <option value="greater_than">is greater than</option>
                    <option value="is_true">is true</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Target Value
                  </label>
                  <input
                    type="text"
                    value={condValue}
                    onChange={(e) => setCondValue(e.target.value)}
                    placeholder="e.g. Qualified"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Branch destinations */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div>
                  <label className="font-semibold text-emerald-950 block mb-1">
                    THEN (If Condition is Met / YES) *
                  </label>
                  <input
                    type="text"
                    value={thenAction}
                    onChange={(e) => setThenAction(e.target.value)}
                    placeholder="e.g. Continue to Discovery Meeting Booking"
                    className="w-full rounded-lg border border-emerald-300 bg-white px-2.5 py-1.5 text-xs text-emerald-950 focus:border-emerald-700 focus:outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    OTHERWISE (If Condition is NOT Met / NO) *
                  </label>
                  <input
                    type="text"
                    value={elseAction}
                    onChange={(e) => setElseAction(e.target.value)}
                    placeholder="e.g. Route contact to 4-Week Lead Nurture sequence"
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* E. WAIT / DELAY */}
          {type === 'wait_schedule' && (
            <div className="rounded-xl border border-sky-200 bg-sky-50/20 p-4 space-y-3.5">
              <div className="font-bold text-sky-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-sky-700" />
                <span>Simulated Delay / Timing Pause</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Wait Trigger Type
                  </label>
                  <select
                    value={waitType}
                    onChange={(e) => setWaitType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    <option value="duration">Wait for duration (e.g. 2 days)</option>
                    <option value="date_time">Wait until specific time (e.g. Monday 9 AM)</option>
                    <option value="simulated_event">Wait for simulated event (e.g. lead replies)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {waitType === 'duration' ? 'Duration Value' : waitType === 'date_time' ? 'Date / Time' : 'Event Name'}
                  </label>
                  <input
                    type="text"
                    value={waitType === 'duration' ? durationValue : waitType === 'date_time' ? dateTimeValue : simulatedEventName}
                    onChange={(e) => {
                      if (waitType === 'duration') setDurationValue(e.target.value);
                      else if (waitType === 'date_time') setDateTimeValue(e.target.value);
                      else setSimulatedEventName(e.target.value);
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                <span>
                  <strong>Demo timing notice:</strong> This timing is simulated locally. This workflow will not continue while the browser is closed.
                </span>
              </div>
            </div>
          )}

          {/* F. HANDOFF */}
          {type === 'handoff' && (
            <div className="rounded-xl border border-purple-200 bg-purple-50/20 p-4 space-y-3.5">
              <div className="font-bold text-purple-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ArrowRightLeft className="h-3.5 w-3.5 text-purple-700" />
                <span>Specialist Context & Asset Handoff</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    From Specialist
                  </label>
                  <select
                    value={fromCode}
                    onChange={(e) => setFromCode(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.code}>
                        {e.code} — {e.name} ({e.title})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    To Specialist
                  </label>
                  <select
                    value={toCode}
                    onChange={(e) => setToCode(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.code}>
                        {e.code} — {e.name} ({e.title})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Context & Artifacts Handed Over
                </label>
                <input
                  type="text"
                  value={contextArtifactsText}
                  onChange={(e) => setContextArtifactsText(e.target.value)}
                  placeholder="e.g. Approved copy, Brand guidelines, Campaign objective"
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Comma separated list</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Expected Next Responsibility
                </label>
                <input
                  type="text"
                  value={handoffNote}
                  onChange={(e) => setHandoffNote(e.target.value)}
                  placeholder="e.g. Produce 9:16 vertical video assets based on approved copy"
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
          >
            Save Step Changes
          </button>
        </div>
      </div>
    </div>
  );
};
