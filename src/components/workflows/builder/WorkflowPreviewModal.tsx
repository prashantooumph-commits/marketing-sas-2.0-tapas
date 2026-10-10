import React from 'react';
import {
  WorkflowTemplate,
  Employee
} from '../../../types';
import {
  X,
  Play,
  Bot,
  Users,
  ShieldCheck,
  Plug,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Check
} from 'lucide-react';

interface WorkflowPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: WorkflowTemplate | null;
  employees: Employee[];
  onRunWorkflow?: (workflow: WorkflowTemplate) => void;
}

export const WorkflowPreviewModal: React.FC<WorkflowPreviewModalProps> = ({
  isOpen,
  onClose,
  workflow,
  employees,
  onRunWorkflow
}) => {
  if (!isOpen || !workflow) return null;

  const steps = workflow.richSteps || [];

  // Group participants
  const participatingEmployees = Array.from(
    new Set(
      steps
        .map((s) => s.employeeId ? employees.find((e) => e.id === s.employeeId) : employees.find((e) => e.code === s.employeeCode))
        .filter(Boolean) as Employee[]
    )
  );

  const humanTeammates = Array.from(
    new Set(
      steps
        .filter((s) => s.type === 'human_task' || s.type === 'human_approval')
        .map((s) => s.humanAssigneeName || s.approvalConfig?.approverRole || 'Project Contributor')
    )
  );

  const approvalGates = steps
    .filter((s) => s.type === 'human_approval')
    .map((s) => s.approvalConfig?.subjectToApprove || s.title);

  const connectionRequirements = Array.from(
    new Set(
      steps
        .flatMap((s) => s.requiredConnections || [])
        .concat(workflow.trigger?.socialPlatform ? [workflow.trigger.socialPlatform.toLowerCase().includes('insta') ? 'meta_business' : 'linkedin_page'] as any : [])
    )
  );

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-scale-in max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-900 text-white">
                Executive Preview
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Plain Business Narrative
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{workflow.name}</h2>
            <p className="text-xs text-slate-600">{workflow.outcome}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Narrative Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs">
          {/* 1. The "When" (Trigger) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-teal-700" />
              <span>When</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              {workflow.trigger?.label || 'Manual Launch by Operator'}
            </div>
            <p className="text-xs text-slate-600">
              {workflow.trigger?.description || 'Execution begins on demand.'}
            </p>
          </div>

          {/* 2. The "Then" (Chronological Story) */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-700" />
              <span>Then: What Happens Next</span>
            </div>

            <div className="space-y-2.5">
              {steps.map((step, idx) => {
                const emp = step.employeeId
                  ? employees.find((e) => e.id === step.employeeId)
                  : employees.find((e) => e.code === step.employeeCode);

                return (
                  <div
                    key={step.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs text-slate-900">{step.title}</span>

                        {step.type === 'human_approval' && (
                          <span className="text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200 px-1.5 py-0.2 rounded">
                            Human Approval Required
                          </span>
                        )}

                        {step.type === 'condition' && (
                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded">
                            Condition Check
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600">{step.description}</p>

                      {/* Plain business phrasing of who does what */}
                      {step.type === 'employee_task' && emp && (
                        <div className="text-[11px] text-indigo-950 font-medium pt-0.5">
                          Assigned to <strong>{emp.name}</strong> ({emp.title})
                        </div>
                      )}

                      {step.type === 'human_task' && (
                        <div className="text-[11px] text-amber-900 font-medium pt-0.5">
                          Assigned to teammate <strong>{step.humanAssigneeName || 'Workspace Teammate'}</strong>
                        </div>
                      )}

                      {step.type === 'condition' && (
                        <div className="pt-1.5 pl-2 border-l-2 border-emerald-400 text-[11px] space-y-1">
                          <div className="text-emerald-900">
                            <strong>YES:</strong> {step.conditionConfig?.thenActionDescription || 'Book Discovery Meeting'}
                          </div>
                          <div className="text-slate-600">
                            <strong>NO:</strong> {step.conditionConfig?.elseActionDescription || 'Route to Lead Nurture'}
                          </div>
                        </div>
                      )}

                      {step.type === 'handoff' && (
                        <div className="text-[11px] text-purple-900 font-medium pt-0.5">
                          Context handed over from <strong>{step.handoffConfig?.fromEmployeeCode}</strong> to <strong>{step.handoffConfig?.toEmployeeCode}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Team & Operational Overview Grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-100">
            {/* AI Specialist Team */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Bot className="h-3 w-3 text-indigo-700" />
                <span>AI Specialist Team ({participatingEmployees.length})</span>
              </div>
              <div className="space-y-1.5">
                {participatingEmployees.map((e) => (
                  <div key={e.id} className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-[10px] font-bold px-1 rounded bg-white border border-slate-200">
                      {e.code}
                    </span>
                    <span className="font-semibold text-slate-900">{e.name}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 text-[11px]">{e.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Human Team & Governance */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Users className="h-3 w-3 text-amber-700" />
                <span>Human Teammates & Approvers</span>
              </div>
              <div className="space-y-1.5">
                {humanTeammates.length > 0 ? (
                  humanTeammates.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      <span>{h}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-500">Autonomous workflow (No human steps)</span>
                )}
              </div>
            </div>
          </div>

          {/* 4. Connected Channels & Success Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Connections */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Plug className="h-3 w-3 text-teal-700" />
                <span>Connected Channels</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {connectionRequirements.length > 0 ? (
                  connectionRequirements.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-800 capitalize"
                    >
                      {c.replace('_', ' ')}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-500">Internal work (No external channels)</span>
                )}
              </div>
            </div>

            {/* Success Metrics */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Award className="h-3 w-3 text-emerald-700" />
                <span>Target Success Metrics</span>
              </div>
              <div className="space-y-1">
                {(workflow.successMetrics || ['Deliverable 100% Completion']).map((m, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                    <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Close Preview
          </button>

          {onRunWorkflow && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onRunWorkflow(workflow);
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-teal-800 hover:bg-teal-900 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Launch Workflow</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
