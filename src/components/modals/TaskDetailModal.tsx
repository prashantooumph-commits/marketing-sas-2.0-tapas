import React from 'react';
import { Task, Project } from '../../types';
import { useOoumph } from '../../store/ooumphStore';
import {
  X,
  User,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Layers,
  Calendar,
  Check
} from 'lucide-react';

interface TaskDetailModalProps {
  task: Task | null;
  project?: Project | null;
  onClose: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  project,
  onClose
}) => {
  const {
    employees,
    updateTask,
    openEmployeeWorkspaceWithProjectContext,
    completeHumanTask
  } = useOoumph();

  if (!task) return null;

  const assignedEmp = task.employeeId !== 'human-operator'
    ? employees.find((e) => e.id === task.employeeId || e.code === task.employeeCode)
    : null;

  const handleOpenWorkspace = () => {
    if (assignedEmp) {
      openEmployeeWorkspaceWithProjectContext(assignedEmp.id, task.projectId || null, task.id);
      onClose();
    }
  };

  const handleMarkComplete = () => {
    if (task.workflowStepId && task.projectId) {
      completeHumanTask(task.projectId, task.workflowStepId, 'Completed via Task detail modal.');
    } else {
      updateTask(task.id, { status: 'completed' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-2xs p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50/70">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white uppercase tracking-wider">
                {task.category}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  task.status === 'completed'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : task.status === 'in_progress'
                    ? 'bg-teal-50 text-teal-800 border-teal-300'
                    : task.status === 'needs_review'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {task.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 truncate">{task.title}</h3>
            {project && (
              <p className="text-xs text-slate-500">Project: {project.title}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 text-xs text-slate-700">
          {/* Owner Info */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-3">
              {assignedEmp ? (
                <div className={`h-9 w-9 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 ${assignedEmp.avatarColor}`}>
                  {assignedEmp.avatarInitials}
                </div>
              ) : (
                <div className="h-9 w-9 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
              <div>
                <h4 className="font-bold text-slate-900 text-xs">
                  {assignedEmp ? `${assignedEmp.name} (${assignedEmp.code})` : task.employeeName}
                </h4>
                <p className="text-[10px] text-slate-500">
                  {assignedEmp?.title || 'Workspace Collaborator'}
                </p>
              </div>
            </div>

            {assignedEmp && (
              <button
                type="button"
                onClick={handleOpenWorkspace}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs cursor-pointer shadow-2xs"
              >
                <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
                <span>Open Workspace</span>
              </button>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Task Brief & Specification
            </span>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed">
              {task.description}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                DEPENDS ON
              </span>
              <p className="font-semibold text-slate-900 text-xs">
                {task.dependsOn || 'None (Initial Stage)'}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                EXECUTION CADENCE
              </span>
              <p className="font-semibold text-slate-900 text-xs">
                {task.cadence || 'One-time Milestone'}
              </p>
            </div>

            <div className="col-span-2 p-3 rounded-xl border border-teal-200 bg-teal-50/40 space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-teal-800 block">
                EXPECTED DELIVERABLE OUTPUT
              </span>
              <p className="font-bold text-slate-900 text-xs">
                {task.expectedOutput || 'Milestone Deliverable'}
              </p>
            </div>
          </div>

          {/* Revision Note if any */}
          {task.revisionNote && (
            <div className="p-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-950 text-xs space-y-1">
              <span className="font-bold block">Revision Requested:</span>
              <p className="italic">"{task.revisionNote}"</p>
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
            Close
          </button>

          <div className="flex items-center gap-2">
            {task.status !== 'completed' && (
              <button
                type="button"
                onClick={handleMarkComplete}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                <Check className="h-4 w-4" />
                <span>Mark Completed</span>
              </button>
            )}
            {assignedEmp && (
              <button
                type="button"
                onClick={handleOpenWorkspace}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                <span>Specialist Chat</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
