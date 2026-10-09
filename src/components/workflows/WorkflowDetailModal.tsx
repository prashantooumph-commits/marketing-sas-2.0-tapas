import React from 'react';
import { WorkflowTemplate, Employee } from '../../types';
import {
  X,
  Play,
  Eye,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Layers,
  Plug,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';

interface WorkflowDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: WorkflowTemplate | null;
  employees: Employee[];
  allWorkflows: WorkflowTemplate[];
  onUseWorkflow: (workflowId: string) => void;
  onPreviewSampleData: (workflow: WorkflowTemplate) => void;
  onSelectRecommendedWorkflow?: (workflowId: string) => void;
}

export const WorkflowDetailModal: React.FC<WorkflowDetailModalProps> = ({
  isOpen,
  onClose,
  workflow,
  employees,
  allWorkflows,
  onUseWorkflow,
  onPreviewSampleData,
  onSelectRecommendedWorkflow
}) => {
  if (!isOpen || !workflow) return null;

  const participatingEmployees = employees.filter((e) =>
    workflow.participatingEmployeeIds.includes(e.id)
  );
  const title = workflow.title || workflow.name;
  const gates = workflow.approvalGates || workflow.approvalPoints || [];
  const nextWorkflows = (workflow.recommendedNextWorkflowIds || [])
    .map((id) => allWorkflows.find((w) => w.id === id))
    .filter(Boolean) as WorkflowTemplate[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-scale-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {workflow.code && (
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white tracking-wider">
                  {workflow.code}
                </span>
              )}
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                {workflow.category}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Typical Duration: {workflow.typicalDuration}</span>
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              {workflow.shortDescription || workflow.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs text-slate-700">
          {/* Target Outcome */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 space-y-1">
            <div className="text-[11px] font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-700" />
              <span>Target Business Outcome</span>
            </div>
            <p className="text-teal-950 font-medium leading-relaxed">
              {workflow.outcome}
            </p>
          </div>

          {/* Best For & Example Scenario Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workflow.bestFor && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Best For
                </span>
                <p className="text-slate-800 leading-relaxed">{workflow.bestFor}</p>
              </div>
            )}

            {workflow.exampleScenario && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Example Scenario in Action
                </span>
                <p className="text-slate-800 leading-relaxed italic">
                  "{workflow.exampleScenario}"
                </p>
              </div>
            )}
          </div>

          {/* Structured Step-by-Step Stages */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-700" />
              <span>Structured Stages & Specialist Responsibilities ({workflow.expectedSteps.length})</span>
            </h4>

            <div className="space-y-2">
              {workflow.expectedSteps.map((step, idx) => {
                const assignedEmp = employees.find((e) => e.code === step.employeeCode);
                const isHumanApproval = step.type === 'human_approval';

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all ${
                      isHumanApproval
                        ? 'border-amber-300 bg-amber-50/40 text-amber-950'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-900 text-xs">{step.title}</span>
                          {isHumanApproval && (
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-200 text-amber-900">
                              Human Review Gate
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {assignedEmp && (
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-200/60">
                        <span
                          className={`h-4 w-4 rounded-full ${assignedEmp.avatarColor} text-white font-bold text-[8px] flex items-center justify-center`}
                        >
                          {assignedEmp.code}
                        </span>
                        <span className="font-medium text-slate-800">{assignedEmp.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connections & Approvals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Human Approval Gates */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
              <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
                <span>Human Approval Gates ({gates.length})</span>
              </div>
              {gates.length > 0 ? (
                <ul className="space-y-1 text-amber-950">
                  {gates.map((gate, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold text-amber-700 mt-0.5">•</span>
                      <span>{gate}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-amber-800 italic text-[11px]">No mandatory blocking human approvals in default flow.</p>
              )}
            </div>

            {/* Required Connections */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Plug className="h-3.5 w-3.5 text-slate-700" />
                <span>Connected Channels & Tools</span>
              </div>
              <div className="space-y-1.5">
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase block">Required:</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {(workflow.requiredConnectionTypes || ['google_workspace']).map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-800"
                      >
                        {c.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inputs, Outputs & Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {workflow.inputs && (
              <div className="space-y-1.5">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Inputs Needed</h5>
                <ul className="space-y-1 text-slate-600">
                  {workflow.inputs.map((inp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-400">•</span>
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workflow.outputs && (
              <div className="space-y-1.5">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Key Outputs</h5>
                <ul className="space-y-1 text-slate-600">
                  {workflow.outputs.map((out, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-teal-600 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workflow.successMetrics && (
              <div className="space-y-1.5">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Target Success Metrics</h5>
                <ul className="space-y-1 text-slate-600">
                  {workflow.successMetrics.map((met, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 font-medium text-slate-900">
                      <span className="text-teal-600">✓</span>
                      <span>{met}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Possible Blockers */}
          {workflow.possibleBlockers && workflow.possibleBlockers.length > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-3.5 space-y-1">
              <div className="text-[11px] font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                <span>Possible Blockers & Guardrails</span>
              </div>
              <ul className="space-y-1 text-rose-950">
                {workflow.possibleBlockers.map((blk, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="font-bold text-rose-700">•</span>
                    <span>{blk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Next Workflows */}
          {nextWorkflows.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Recommended Next Workflows in Operating Rhythm
              </h5>
              <div className="flex flex-wrap gap-2">
                {nextWorkflows.map((nw) => (
                  <button
                    key={nw.id}
                    type="button"
                    onClick={() => {
                      if (onSelectRecommendedWorkflow) {
                        onSelectRecommendedWorkflow(nw.id);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 transition-colors cursor-pointer text-xs"
                  >
                    <span className="font-semibold">{nw.title || nw.name}</span>
                    <ArrowRight className="h-3 w-3 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPreviewSampleData(workflow)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-slate-500" />
              <span>Preview with Sample Data</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onUseWorkflow(workflow.id);
              }}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Use Workflow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
