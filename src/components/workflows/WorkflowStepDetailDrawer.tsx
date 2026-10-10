import React, { useState } from 'react';
import { WorkflowStep, Project, WorkflowRun, Task, ApprovalRequest } from '../../types';
import { useOoumph } from '../../store/ooumphStore';
import {
  X,
  User,
  Sparkles,
  ShieldCheck,
  Clock,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  FileText,
  Plug,
  CornerDownRight,
  Send,
  HelpCircle
} from 'lucide-react';

interface WorkflowStepDetailDrawerProps {
  step: WorkflowStep | null;
  project: Project;
  run?: WorkflowRun | null;
  onClose: () => void;
}

export const WorkflowStepDetailDrawer: React.FC<WorkflowStepDetailDrawerProps> = ({
  step,
  project,
  run,
  onClose
}) => {
  const {
    employees,
    tasks,
    approvals,
    integrationConnections,
    approveRequest,
    rejectRequest,
    requestChangesOnApproval,
    advanceWorkflowStep,
    completeHumanTask,
    advanceWaitStep,
    retryBlockedStep,
    skipOptionalStep,
    openEmployeeWorkspaceWithProjectContext,
    navigate
  } = useOoumph();

  const [feedbackInput, setFeedbackInput] = useState('');
  const [isRevisionBoxOpen, setIsRevisionBoxOpen] = useState(false);

  if (!step) return null;

  const assignedEmp = step.employeeCode ? employees.find((e) => e.code === step.employeeCode) : null;
  const relatedTask = tasks.find(
    (t) => t.workflowStepId === step.id || (t.projectId === project.id && t.title.toLowerCase().includes(step.title.toLowerCase()))
  );
  const relatedApproval = approvals.find(
    (a) => a.workflowStepId === step.id || (a.projectId === project.id && a.title.toLowerCase().includes(step.title.toLowerCase()))
  );

  // Check required connection status
  const requiredConnectionItem = step.requiredConnection
    ? integrationConnections.find((c) => c.provider === step.requiredConnection && c.workspaceId === project.workspaceId)
    : null;

  // Actual output if step generated one
  const actualAsset = (project.projectAssets || []).find(
    (a) => a.stepId === step.id || a.title.toLowerCase().includes(step.title.toLowerCase())
  );

  const handleApprove = () => {
    if (relatedApproval) {
      approveRequest(relatedApproval.id);
    } else if (run) {
      advanceWorkflowStep(run.id, step.id);
    }
    onClose();
  };

  const handleRequestChanges = () => {
    if (!feedbackInput.trim()) return;
    if (relatedApproval) {
      requestChangesOnApproval(relatedApproval.id, feedbackInput.trim());
    }
    setIsRevisionBoxOpen(false);
    onClose();
  };

  const handleCompleteHuman = () => {
    completeHumanTask(project.id, step.id, 'Operator completed task requirements.');
    onClose();
  };

  const handleAdvanceWait = () => {
    advanceWaitStep(project.id, step.id);
    onClose();
  };

  const handleOpenWorkspace = () => {
    if (assignedEmp) {
      openEmployeeWorkspaceWithProjectContext(assignedEmp.id, project.id, relatedTask?.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-2xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-white shadow-2xl h-full flex flex-col overflow-hidden animate-slide-in-right border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/70">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white uppercase tracking-wider">
                {step.type.replace('_', ' ').toUpperCase()}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  step.status === 'completed'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : step.status === 'in_progress'
                    ? 'bg-teal-50 text-teal-800 border-teal-300'
                    : step.status === 'waiting_approval'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : step.status === 'blocked'
                    ? 'bg-amber-100 text-amber-950 border-amber-400'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {step.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 truncate">{step.title}</h3>
            <p className="text-xs text-slate-500">Project: {project.title}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body Scroll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-slate-700">
          {/* Owner Assignment Card */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Assigned Specialist / Owner
            </span>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {assignedEmp ? (
                  <div className={`h-10 w-10 rounded-xl text-white font-bold text-sm flex items-center justify-center shrink-0 ${assignedEmp.avatarColor}`}>
                    {assignedEmp.avatarInitials}
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {assignedEmp ? `${assignedEmp.name} (${assignedEmp.code})` : step.humanAssigneeName || 'Workspace Operator'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {assignedEmp?.title || step.humanAssigneeRole || 'Human In The Loop'}
                  </p>
                </div>
              </div>

              {assignedEmp && (
                <button
                  type="button"
                  onClick={handleOpenWorkspace}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Workspace Context</span>
                </button>
              )}
            </div>
          </div>

          {/* Instructions & Description */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Operational Instructions
            </span>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 leading-relaxed text-xs">
              {step.description}
            </div>
          </div>

          {/* Input & Output Contracts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                INPUT REQUIRED / CONTEXT
              </span>
              <p className="font-semibold text-slate-900 text-xs">
                {step.inputs?.[0] || 'Project Brief & Strategy Parameters'}
              </p>
              <p className="text-[10px] text-slate-500">Passed from predecessor workflow stages.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/40 space-y-1.5">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-teal-700 block">
                EXPECTED DELIVERABLE
              </span>
              <p className="font-bold text-slate-900 text-xs">
                {step.expectedOutput || `${step.title} Final Package`}
              </p>
              <p className="text-[10px] text-teal-800">Must satisfy project parameters before handoff.</p>
            </div>
          </div>

          {/* Actual Produced Artifact / Deliverable (if any) */}
          {actualAsset && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>Produced Milestone Deliverable</span>
                </span>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-800">
                  v{actualAsset.version || 1}
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-xs">{actualAsset.title}</h5>
              <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-slate-700 text-[11px] font-mono">
                {actualAsset.content}
              </div>
              <div className="pt-1 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Produced by: <strong>{actualAsset.employeeName}</strong></span>
                <span>{new Date(actualAsset.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}

          {/* Blocker diagnostics if blocked */}
          {step.status === 'blocked' && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
                <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                <span>Execution Paused · Blocker Detected</span>
              </div>
              <p className="text-amber-900 text-xs leading-relaxed">
                {step.blockedReason || 'This automated step requires an active integration connection.'}
              </p>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <button
                  type="button"
                  onClick={() => retryBlockedStep(project.id, step.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-800 text-white font-semibold text-xs hover:bg-amber-900 shadow-2xs cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Verify Connection & Retry Stage</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('settings');
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-amber-900 font-semibold text-xs hover:bg-amber-50 cursor-pointer"
                >
                  Settings Diagnostics →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    skipOptionalStep(project.id, step.id);
                    onClose();
                  }}
                  className="text-xs text-amber-800 underline ml-2 cursor-pointer"
                >
                  Skip optional step
                </button>
              </div>
            </div>
          )}

          {/* Revision history note if applied */}
          {step.revisionFeedback && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5 space-y-1">
              <span className="font-bold text-amber-900 text-[11px] block">
                Revision Feedback Recorded:
              </span>
              <p className="text-slate-700 italic text-xs">
                "{step.revisionFeedback}"
              </p>
            </div>
          )}

          {/* Inline Request Changes Form */}
          {isRevisionBoxOpen && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-3">
              <span className="font-bold text-amber-950 text-xs block">
                Specify deliverable revision notes for {assignedEmp?.name || 'specialist'}:
              </span>
              <textarea
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Detail the exact adjustments required (e.g. Tone down promotional claim, add enterprise proof points, adjust target audience)..."
                rows={3}
                className="w-full rounded-lg border border-amber-300 bg-white p-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRequestChanges}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-800 text-white font-semibold text-xs hover:bg-amber-900 cursor-pointer shadow-2xs"
                >
                  <Send className="h-3 w-3" />
                  <span>Submit Revision Request</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsRevisionBoxOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Action Controls Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {/* Human Approval Actions */}
            {step.status === 'waiting_approval' && (
              <>
                <button
                  type="button"
                  onClick={() => setIsRevisionBoxOpen(!isRevisionBoxOpen)}
                  className="px-3.5 py-2 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs cursor-pointer"
                >
                  Request Changes
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Approve & Advance</span>
                </button>
              </>
            )}

            {/* Human Task Action */}
            {step.type === 'human_task' && step.status === 'in_progress' && (
              <button
                type="button"
                onClick={handleCompleteHuman}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mark Human Task Completed</span>
              </button>
            )}

            {/* Wait Step Action */}
            {step.type === 'wait_schedule' && step.status === 'in_progress' && (
              <button
                type="button"
                onClick={handleAdvanceWait}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                <Clock className="h-4 w-4" />
                <span>Trigger Scheduled Event Now</span>
              </button>
            )}

            {/* Completed status indicator */}
            {step.status === 'completed' && (
              <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Stage Completed & Verified</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
