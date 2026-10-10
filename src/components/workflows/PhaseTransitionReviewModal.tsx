import React, { useState } from 'react';
import { Project, WorkflowTemplate } from '../../types';
import { useOoumph } from '../../store/ooumphStore';
import {
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Plug,
  Layers,
  FileText,
  Users
} from 'lucide-react';

interface PhaseTransitionReviewModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const PhaseTransitionReviewModal: React.FC<PhaseTransitionReviewModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const {
    workflowTemplates,
    advanceWorkflowPhase,
    integrationConnections,
    employees
  } = useOoumph();

  const [autoStartImmediate, setAutoStartImmediate] = useState(false);

  if (!isOpen) return null;

  const nextTemplateId = project.upcomingWorkflowIds?.[0];
  const nextTemplate = workflowTemplates.find((t) => t.id === nextTemplateId);

  const currentPhaseIndex = (project.currentWorkflowIndex || 0) + 1;
  const nextPhaseIndex = currentPhaseIndex + 1;

  // Artifacts that will carry forward
  const carryForwardAssets = (project.projectAssets || []).slice(0, 4);

  // Check connection requirements for next template
  const requiredConnections = nextTemplate?.requiredConnectionTypes || ['google_workspace'];
  const hasDisconnectedRequired = requiredConnections.some((connType) => {
    const match = integrationConnections.find((c) => {
      const prov = c.provider.toLowerCase();
      const target = connType.toLowerCase();
      if (prov === target) return true;
      if (target.includes('meta') && (prov.includes('facebook') || prov.includes('instagram') || prov.includes('meta'))) return true;
      if (target.includes('google') && prov.includes('google')) return true;
      return false;
    });
    return !match || match.status !== 'connected';
  });

  const handleStartNextPhase = () => {
    advanceWorkflowPhase(project.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-2xs p-4 animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50/70">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-teal-800 text-white uppercase tracking-wider">
              PHASE ADVANCEMENT REVIEW
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Prepare Phase {nextPhaseIndex}: {nextTemplate?.name || 'Next Initiative Phase'}
            </h3>
            <p className="text-xs text-slate-500">
              Review deliverables to carry forward and connection readiness before advancing.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 text-xs text-slate-700 max-h-[70vh] overflow-y-auto">
          {/* Phase Momentum Banner */}
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 space-y-1">
            <h4 className="font-bold text-teal-900 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-teal-700" />
              <span>Phase {currentPhaseIndex} Milestones Successfully Delivered</span>
            </h4>
            <p className="text-[11px] text-teal-800">
              Outputs and strategy briefs from the current phase will become baseline inputs for Phase {nextPhaseIndex}.
            </p>
          </div>

          {/* Carry-Forward Deliverables */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              1. Carry-Forward Deliverables ({carryForwardAssets.length})
            </span>
            {carryForwardAssets.length === 0 ? (
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-center">
                Project brief and scope parameters will carry forward.
              </div>
            ) : (
              <div className="space-y-1.5">
                {carryForwardAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-teal-700" />
                      <span className="font-semibold text-slate-900">{asset.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      by {asset.employeeName} ({asset.employeeCode})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Connection Readiness */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              2. Channel Connection Readiness
            </span>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Required Integrations:</span>
                {hasDisconnectedRequired ? (
                  <span className="text-amber-800 flex items-center gap-1 text-[11px] font-bold">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    <span>Connection Attention Recommended</span>
                  </span>
                ) : (
                  <span className="text-emerald-800 flex items-center gap-1 text-[11px] font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>All Channels Connected</span>
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {requiredConnections.map((conn) => (
                  <span
                    key={conn}
                    className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                  >
                    {conn.replace('_', ' ').toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Stages Preview */}
          {nextTemplate && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                3. Phase {nextPhaseIndex} Planned Stages ({nextTemplate.expectedSteps.length})
              </span>
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
                {nextTemplate.expectedSteps.map((s, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400">{idx + 1}.</span>
                      <span className="font-semibold text-slate-900">{s.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-indigo-700 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
                      {s.employeeCode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleStartNextPhase}
            className="flex items-center gap-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white px-5 py-2.5 font-bold text-xs shadow-xs cursor-pointer transition-colors ring-2 ring-teal-500/20"
          >
            <Sparkles className="h-4 w-4" />
            <span>Confirm & Start Phase {nextPhaseIndex}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
