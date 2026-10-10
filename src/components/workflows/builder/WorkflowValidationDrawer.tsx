import React from 'react';
import {
  WorkflowTemplate,
  IntegrationConnection,
  CustomWorkflowStepConfig
} from '../../../types';
import {
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  X,
  ArrowRight,
  Info
} from 'lucide-react';

interface WorkflowValidationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: WorkflowTemplate;
  integrationConnections: IntegrationConnection[];
  onFixStep?: (stepId: string) => void;
}

export interface ValidationResult {
  isValidForRun: boolean;
  canSave: boolean;
  errors: { id: string; message: string; stepId?: string }[];
  warnings: { id: string; message: string; stepId?: string; channel?: string }[];
  passedChecks: string[];
}

export const validateWorkflowModel = (
  wf: WorkflowTemplate,
  connections: IntegrationConnection[]
): ValidationResult => {
  const errors: { id: string; message: string; stepId?: string }[] = [];
  const warnings: { id: string; message: string; stepId?: string; channel?: string }[] = [];
  const passedChecks: string[] = [];

  // 1. Name check
  if (!wf.name || !wf.name.trim() || wf.name === 'New Custom Workflow') {
    errors.push({ id: 'err-name', message: 'Workflow must have a descriptive title.' });
  } else {
    passedChecks.push(`Workflow name configured: "${wf.name}"`);
  }

  // 2. Trigger check
  if (!wf.trigger) {
    errors.push({ id: 'err-trigger', message: 'Workflow must have a trigger event.' });
  } else {
    passedChecks.push(`Trigger configured: ${wf.trigger.label || wf.trigger.type}`);
  }

  // 3. Step count check
  const steps = wf.richSteps || [];
  if (steps.length === 0) {
    errors.push({ id: 'err-no-steps', message: 'Workflow must include at least one step.' });
  } else {
    passedChecks.push(`${steps.length} sequential steps configured`);
  }

  // 4. Step-level validation
  let allEmployeesAssigned = true;
  let allHumansAssigned = true;
  let allApproversAssigned = true;
  let hasHighRiskExternalAction = false;
  let hasHumanApprovalGate = false;

  steps.forEach((step, idx) => {
    // High-risk detection
    if (
      step.impactCategory === 'paid_advertising' ||
      step.impactCategory === 'commercial_commitment' ||
      step.impactCategory === 'reputation_response'
    ) {
      hasHighRiskExternalAction = true;
    }

    if (step.type === 'human_approval') {
      hasHumanApprovalGate = true;
      if (!step.approvalConfig?.approverRole && !step.humanAssigneeName) {
        allApproversAssigned = false;
        errors.push({
          id: `err-appr-${step.id}`,
          message: `Step ${idx + 1} ("${step.title}") is missing an authorized approver role.`,
          stepId: step.id
        });
      }
    }

    if (step.type === 'employee_task') {
      if (!step.employeeId && !step.employeeCode) {
        allEmployeesAssigned = false;
        errors.push({
          id: `err-emp-${step.id}`,
          message: `Step ${idx + 1} ("${step.title}") is missing an assigned AI specialist.`,
          stepId: step.id
        });
      }
    }

    if (step.type === 'human_task') {
      if (!step.humanAssigneeName) {
        allHumansAssigned = false;
        errors.push({
          id: `err-human-${step.id}`,
          message: `Step ${idx + 1} ("${step.title}") is missing an assigned human teammate.`,
          stepId: step.id
        });
      }
    }

    if (step.type === 'condition') {
      if (!step.conditionConfig?.thenActionDescription || !step.conditionConfig?.elseActionDescription) {
        errors.push({
          id: `err-cond-${step.id}`,
          message: `Step ${idx + 1} ("${step.title}") must configure both YES and NO branch destinations.`,
          stepId: step.id
        });
      }
    }

    if (step.type === 'handoff') {
      if (!step.handoffConfig?.toEmployeeCode) {
        errors.push({
          id: `err-handoff-${step.id}`,
          message: `Step ${idx + 1} ("${step.title}") is missing destination specialist.`,
          stepId: step.id
        });
      }
    }

    // Connection check
    if (step.requiredConnections && step.requiredConnections.length > 0) {
      step.requiredConnections.forEach((connProvider) => {
        const found = connections.find((c) => c.provider === connProvider && c.status === 'connected');
        if (!found) {
          warnings.push({
            id: `warn-conn-${step.id}-${connProvider}`,
            message: `Step ${idx + 1} requires ${connProvider.replace('_', ' ').toUpperCase()}, but it is not connected in Settings. This step will pause during execution until connected.`,
            stepId: step.id,
            channel: connProvider
          });
        }
      });
    }
  });

  if (allEmployeesAssigned && steps.some((s) => s.type === 'employee_task')) {
    passedChecks.push('All AI tasks assigned to specialists');
  }

  if (allHumansAssigned && steps.some((s) => s.type === 'human_task')) {
    passedChecks.push('All human tasks assigned to teammates');
  }

  // 5. Governance Safety Enforcement
  if (hasHighRiskExternalAction && !hasHumanApprovalGate) {
    errors.push({
      id: 'err-gov-missing-approval',
      message: 'Mandatory Governance Gate: This workflow contains high-impact external actions (ad spend, commercial agreements, or public reputation response) but lacks a Human Approval checkpoint.'
    });
  } else if (hasHumanApprovalGate) {
    passedChecks.push('Governance checkpoint configured for high-impact actions');
  }

  // 6. Success Metrics Check
  if (!wf.successMetrics || wf.successMetrics.length === 0) {
    warnings.push({
      id: 'warn-no-metrics',
      message: 'No success metrics defined. We recommend tracking at least 1 benchmark target.'
    });
  } else {
    passedChecks.push(`${wf.successMetrics.length} success metrics configured`);
  }

  return {
    isValidForRun: errors.length === 0,
    canSave: true, // Warnings and draft errors allow save draft / template
    errors,
    warnings,
    passedChecks
  };
};

export const WorkflowValidationDrawer: React.FC<WorkflowValidationDrawerProps> = ({
  isOpen,
  onClose,
  workflow,
  integrationConnections,
  onFixStep
}) => {
  if (!isOpen) return null;

  const result = validateWorkflowModel(workflow, integrationConnections);

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl p-6 space-y-5 animate-scale-in my-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  result.isValidForRun
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                {result.isValidForRun ? 'Ready to Run' : 'Validation Issues Found'}
              </span>
              <h3 className="text-base font-bold text-slate-900">Workflow Validation</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated audit of trigger, steps, specialist assignments, governance, and integrations.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status Banner */}
        <div
          className={`p-4 rounded-xl border text-xs space-y-1.5 ${
            result.isValidForRun
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}
        >
          <div className="font-bold flex items-center gap-2">
            {result.isValidForRun ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>All Required Checks Passed</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-amber-700" />
                <span>
                  {result.errors.length} Blocking Issue{result.errors.length !== 1 ? 's' : ''} Must Be Fixed Before Run
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] opacity-80 leading-relaxed">
            {result.isValidForRun
              ? 'This workflow is completely valid and can be executed immediately or saved as a reusable template.'
              : 'You can save this workflow as a Draft, but it cannot run until blocking errors are resolved.'}
          </p>
        </div>

        {/* Errors list */}
        {result.errors.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-red-950 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-red-600" />
              <span>Blocking Errors ({result.errors.length})</span>
            </div>
            <div className="space-y-1.5">
              {result.errors.map((err) => (
                <div
                  key={err.id}
                  className="p-2.5 rounded-lg border border-red-200 bg-red-50/50 flex items-start justify-between gap-2 text-xs text-red-900"
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-red-700 shrink-0">✕</span>
                    <span className="text-[11px] leading-relaxed">{err.message}</span>
                  </div>
                  {err.stepId && onFixStep && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onFixStep(err.stepId!);
                      }}
                      className="text-[10px] font-bold text-red-800 underline shrink-0 cursor-pointer"
                    >
                      Fix Step →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings list */}
        {result.warnings.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
              <span>Warnings ({result.warnings.length})</span>
            </div>
            <div className="space-y-1.5">
              {result.warnings.map((warn) => (
                <div
                  key={warn.id}
                  className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 flex items-start gap-2 text-xs text-amber-900"
                >
                  <span className="font-bold text-amber-700 shrink-0">⚠</span>
                  <span className="text-[11px] leading-relaxed">{warn.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passed checks */}
        {result.passedChecks.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Passed Audits ({result.passedChecks.length})</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs">
              {result.passedChecks.map((chk, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{chk}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {result.warnings.length > 0 && 'Warnings do not block saving.'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
