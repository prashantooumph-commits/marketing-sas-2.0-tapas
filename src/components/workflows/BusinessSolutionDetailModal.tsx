import React from 'react';
import { BusinessSolution, Employee, WorkflowTemplate } from '../../types';
import {
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Users,
  Target,
  Layers,
  Plug,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface BusinessSolutionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: BusinessSolution | null;
  employees: Employee[];
  workflowTemplates: WorkflowTemplate[];
  onPlanSolution: (solution: BusinessSolution) => void;
  onLaunchSolution?: (solutionId: string) => void;
  onSelectWorkflow: (workflowId: string) => void;
}

export const BusinessSolutionDetailModal: React.FC<BusinessSolutionDetailModalProps> = ({
  isOpen,
  onClose,
  solution,
  employees,
  workflowTemplates,
  onPlanSolution,
  onLaunchSolution,
  onSelectWorkflow
}) => {
  if (!isOpen || !solution) return null;

  const participatingEmployees = employees.filter((e) => solution.employeeIds.includes(e.id));
  const includedWorkflows = workflowTemplates.filter((w) =>
    solution.workflowTemplateIds.includes(w.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-scale-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 text-white tracking-wider">
                {solution.code}
              </span>
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                {solution.outcomeCategory}
              </span>
              <span className="text-xs font-medium text-slate-500 capitalize">
                Complexity: <strong>{solution.complexity}</strong>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {solution.title}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              {solution.shortPromise}
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
          {/* Who It Is For */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-4 space-y-1">
            <div className="text-[11px] font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-teal-700" />
              <span>Who This Business Solution Is Best For</span>
            </div>
            <p className="text-teal-950 font-medium leading-relaxed">
              {solution.bestFor}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Comprehensive Strategic Overview
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              {solution.description}
            </p>
          </div>

          {/* Included Workflows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Workflow className="h-3.5 w-3.5 text-slate-700" />
                <span>Orchestrated Workflows Included ({solution.workflowTemplateIds.length})</span>
              </h4>
              <span className="text-[11px] text-slate-500">Click any workflow to inspect step details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {solution.workflowTemplateIds.map((wfId, idx) => {
                const wf = workflowTemplates.find((w) => w.id === wfId);
                const title = wf ? (wf.title || wf.name) : wfId;
                const category = wf ? wf.category : 'Operational';
                const duration = wf ? wf.typicalDuration : '3–5 days';

                return (
                  <div
                    key={wfId}
                    onClick={() => onSelectWorkflow(wfId)}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer flex items-start justify-between gap-2 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-slate-500">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="font-semibold text-slate-900 text-xs truncate group-hover:text-teal-900">
                          {title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span>{category}</span>
                        <span>·</span>
                        <span>{duration}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Participating AI Specialists */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-slate-700" />
              <span>Participating AI Specialists ({participatingEmployees.length})</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {participatingEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50/50"
                >
                  <div
                    className={`h-8 w-8 rounded-lg ${emp.avatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}
                  >
                    {emp.code}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate text-xs">{emp.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{emp.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connections & Human Gates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Human Approval Gates */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
              <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
                <span>Human Approval Gates ({solution.approvalGateTypes.length})</span>
              </div>
              <ul className="space-y-1.5 text-amber-950">
                {solution.approvalGateTypes.map((gate, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-700 mt-0.5">•</span>
                    <span>{gate}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required & Optional Connections */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2.5">
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Plug className="h-3.5 w-3.5 text-slate-700" />
                <span>Connected Tools & Channels</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase block">Required:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {solution.requiredConnectionTypes.map((conn) => (
                      <span
                        key={conn}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-800"
                      >
                        {conn.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
                {solution.optionalConnectionTypes.length > 0 && (
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Optional:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {solution.optionalConnectionTypes.map((conn) => (
                        <span
                          key={conn}
                          className="px-2 py-0.5 rounded bg-white/70 border border-slate-200 text-[11px] text-slate-600"
                        >
                          {conn.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Major Outputs & Success Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                Major Business Deliverables
              </h4>
              <ul className="space-y-1 text-slate-700">
                {solution.majorOutputs.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                Target Success Metrics
              </h4>
              <ul className="space-y-1 text-slate-700">
                {solution.successMetrics.map((met, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                    <span className="font-medium text-slate-900">{met}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
              onClick={() => {
                onClose();
                onPlanSolution(solution);
              }}
              className="px-3.5 py-2 rounded-lg border border-teal-300 bg-white hover:bg-teal-50 text-teal-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <span>Goal Planner</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onLaunchSolution) {
                  onLaunchSolution(solution.id);
                } else {
                  onPlanSolution(solution);
                }
              }}
              className="flex items-center gap-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white px-4 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer ring-2 ring-teal-500/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Configure & Launch Solution</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
