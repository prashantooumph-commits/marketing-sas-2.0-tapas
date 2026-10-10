import React from 'react';
import {
  CustomWorkflowStepConfig,
  Employee,
  IntegrationProvider
} from '../../../types';
import {
  Bot,
  User,
  ShieldCheck,
  GitBranch,
  Clock,
  ArrowRightLeft,
  ChevronUp,
  ChevronDown,
  Copy,
  Pencil,
  Trash2,
  Plug,
  AlertTriangle,
  ArrowDown,
  CornerDownRight,
  Sparkles,
  Check
} from 'lucide-react';

interface WorkflowStepCardProps {
  step: CustomWorkflowStepConfig;
  index: number;
  totalSteps: number;
  employees: Employee[];
  onEdit: (step: CustomWorkflowStepConfig) => void;
  onDuplicate: (stepId: string) => void;
  onDelete: (stepId: string) => void;
  onMoveUp: (stepId: string) => void;
  onMoveDown: (stepId: string) => void;
}

export const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({
  step,
  index,
  totalSteps,
  employees,
  onEdit,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  const assignedEmployee = step.employeeId
    ? employees.find((e) => e.id === step.employeeId)
    : step.employeeCode
    ? employees.find((e) => e.code === step.employeeCode)
    : null;

  // Type metadata
  const getTypeMeta = () => {
    switch (step.type) {
      case 'employee_task':
        return {
          label: 'AI Employee Task',
          icon: Bot,
          badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          borderColor: 'border-slate-200 hover:border-indigo-300'
        };
      case 'human_task':
        return {
          label: 'Human Task',
          icon: User,
          badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
          borderColor: 'border-slate-200 hover:border-amber-300'
        };
      case 'human_approval':
        return {
          label: 'Human Approval Gate',
          icon: ShieldCheck,
          badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
          borderColor: 'border-rose-200/80 bg-rose-50/20 hover:border-rose-300'
        };
      case 'condition':
        return {
          label: 'Condition / Branch',
          icon: GitBranch,
          badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          borderColor: 'border-emerald-200/80 hover:border-emerald-300'
        };
      case 'wait_schedule':
        return {
          label: 'Wait / Delay',
          icon: Clock,
          badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
          borderColor: 'border-slate-200 hover:border-sky-300'
        };
      case 'handoff':
        return {
          label: 'Specialist Handoff',
          icon: ArrowRightLeft,
          badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
          borderColor: 'border-purple-200/70 hover:border-purple-300'
        };
      default:
        return {
          label: 'Step',
          icon: Bot,
          badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
          borderColor: 'border-slate-200'
        };
    }
  };

  const typeMeta = getTypeMeta();
  const TypeIcon = typeMeta.icon;

  // Impact formatting
  const getImpactBadge = () => {
    if (!step.impactCategory || step.impactCategory === 'internal_work') return null;
    switch (step.impactCategory) {
      case 'paid_advertising':
        return { label: 'Paid Ad Spend', color: 'bg-red-50 text-red-800 border-red-200' };
      case 'commercial_commitment':
        return { label: 'Commercial Contract', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'public_publishing':
        return { label: 'Public Publishing', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'outbound_messaging':
        return { label: 'Outbound Messaging', color: 'bg-orange-50 text-orange-800 border-orange-200' };
      case 'reputation_response':
        return { label: 'Public Reputation', color: 'bg-purple-50 text-purple-800 border-purple-200' };
      default:
        return { label: step.impactCategory.replace('_', ' '), color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const impactBadge = getImpactBadge();

  return (
    <div className="relative group">
      {/* Step Container Card */}
      <div
        className={`rounded-2xl border bg-white p-4 sm:p-5 transition-all shadow-2xs ${typeMeta.borderColor}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          {/* Left info column */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Step Number Circle */}
            <div className="pt-0.5 shrink-0">
              <div className="h-7 w-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {index + 1}
              </div>
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              {/* Badges strip */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${typeMeta.badgeColor}`}
                >
                  <TypeIcon className="h-3 w-3" />
                  <span>{typeMeta.label}</span>
                </span>

                {impactBadge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${impactBadge.color}`}
                  >
                    {impactBadge.label}
                  </span>
                )}

                {step.requiredConnections && step.requiredConnections.length > 0 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1">
                    <Plug className="h-2.5 w-2.5 text-slate-500" />
                    <span>{step.requiredConnections.map((c) => c.replace('_', ' ')).join(', ')}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>

              {/* Description / instructions */}
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>

              {/* Step Context / Assignee preview */}
              {step.type === 'employee_task' && (
                <div className="pt-1 flex items-center gap-2 text-xs">
                  {assignedEmployee ? (
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                      <span className="font-mono text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1 rounded">
                        {assignedEmployee.code}
                      </span>
                      <span className="font-semibold text-slate-900">{assignedEmployee.name}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 text-[11px]">{assignedEmployee.title}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Unassigned AI Specialist</span>
                    </div>
                  )}

                  {step.expectedOutput && (
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      Output: <em>{step.expectedOutput}</em>
                    </span>
                  )}
                </div>
              )}

              {step.type === 'human_task' && (
                <div className="pt-1 flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 bg-amber-50/70 border border-amber-200 px-2.5 py-1 rounded-lg">
                    <User className="h-3 w-3 text-amber-700" />
                    <span className="font-semibold text-slate-900">
                      {step.humanAssigneeName || 'Workspace Teammate'}
                    </span>
                    {step.humanAssigneeRole && (
                      <span className="text-[10px] font-bold text-amber-800 bg-white px-1.5 py-0.2 rounded border border-amber-200">
                        {step.humanAssigneeRole}
                      </span>
                    )}
                  </div>
                  {step.expectedDeliverable && (
                    <span className="text-[11px] text-slate-500">
                      Deliverable: <em>{step.expectedDeliverable}</em>
                    </span>
                  )}
                </div>
              )}

              {step.type === 'human_approval' && (
                <div className="pt-1 flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg text-rose-950 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-rose-700" />
                    <span>
                      Approver: <strong>{step.approvalConfig?.approverRole || 'Designated Gatekeeper'}</strong>
                    </span>
                    <span className="text-rose-400">·</span>
                    <span className="text-[11px]">
                      Risk: <strong>{step.approvalConfig?.riskCategory || 'Standard Review'}</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* Condition Branch Visualization (Simple Indented Cards, No Complex Graph Wiring) */}
              {step.type === 'condition' && (
                <div className="pt-2 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <span>IF</span>
                    <strong className="text-slate-900">{step.conditionConfig?.field || 'Lead Status'}</strong>
                    <span>{step.conditionConfig?.operator?.replace('_', ' ') || 'equals'}</span>
                    <strong className="text-teal-800">"{step.conditionConfig?.value || 'Qualified'}"</strong>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-3 border-l-2 border-emerald-400">
                    {/* YES Branch */}
                    <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs space-y-1">
                      <div className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                        <Check className="h-3 w-3 stroke-[3]" />
                        <span>YES Branch</span>
                      </div>
                      <p className="text-[11px] text-emerald-950 font-medium">
                        {step.conditionConfig?.thenActionDescription || 'Continue to Discovery Meeting Booking'}
                      </p>
                    </div>

                    {/* NO Branch */}
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1">
                      <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <span>NO Branch (Otherwise)</span>
                      </div>
                      <p className="text-[11px] text-slate-800 font-medium">
                        {step.conditionConfig?.elseActionDescription || 'Route contact to Lead Nurture sequence'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step.type === 'wait_schedule' && (
                <div className="pt-1 flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg text-sky-950 font-medium">
                    <Clock className="h-3.5 w-3.5 text-sky-700" />
                    <span>
                      Duration: <strong>{step.waitConfig?.durationValue || '2 business days'}</strong>
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-700 italic">
                    (Demo timing: browser paused when closed)
                  </span>
                </div>
              )}

              {step.type === 'handoff' && (
                <div className="pt-1 flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg text-purple-950">
                    <span className="font-mono text-[10px] font-bold bg-white px-1 rounded border border-purple-200">
                      {step.handoffConfig?.fromEmployeeCode || 'A12'}
                    </span>
                    <span>→</span>
                    <span className="font-mono text-[10px] font-bold bg-white px-1 rounded border border-purple-200">
                      {step.handoffConfig?.toEmployeeCode || 'A18'}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] text-purple-900 font-medium">
                      Passes {step.handoffConfig?.contextArtifacts?.join(', ') || 'approved brief'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right action controls */}
          <div className="flex items-center sm:flex-col sm:items-end justify-end gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onMoveUp(step.id)}
                disabled={index === 0}
                title="Move step up"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onMoveDown(step.id)}
                disabled={index === totalSteps - 1}
                title="Move step down"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onDuplicate(step.id)}
                title="Duplicate step"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onEdit(step)}
                title="Edit step"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                <Pencil className="h-3 w-3" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(step.id)}
                title="Delete step"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Downward flow connector arrow between steps */}
      {index < totalSteps - 1 && (
        <div className="flex justify-center my-1.5">
          <div className="h-5 w-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
            <ArrowDown className="h-3 w-3 stroke-[2.5]" />
          </div>
        </div>
      )}
    </div>
  );
};
