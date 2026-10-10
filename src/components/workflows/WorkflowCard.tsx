import React from 'react';
import { WorkflowTemplate, Employee } from '../../types';
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Sparkles,
  Workflow,
  Copy,
  Edit3,
  Archive,
  RotateCcw,
  Trash2,
  Eye,
  Lock,
  UserCheck
} from 'lucide-react';

interface WorkflowCardProps {
  workflow: WorkflowTemplate;
  employees: Employee[];
  onClick: () => void;
  onLaunch: (e: React.MouseEvent) => void;
  onPreview?: (e: React.MouseEvent) => void;
  onDuplicate?: (e: React.MouseEvent) => void;
  onEdit?: (e: React.MouseEvent) => void;
  onArchive?: (e: React.MouseEvent) => void;
  onRestore?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  isPersonal?: boolean;
  isArchived?: boolean;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  employees,
  onClick,
  onLaunch,
  onPreview,
  onDuplicate,
  onEdit,
  onArchive,
  onRestore,
  onDelete,
  isPersonal,
  isArchived
}) => {
  const participatingEmployees = employees.filter((e) =>
    workflow.participatingEmployeeIds.includes(e.id)
  );
  const title = workflow.title || workflow.name;
  const gates = workflow.approvalGates || workflow.approvalPoints || [];
  const version = workflow.version || 1;
  const isPersonalTemplate = isPersonal || workflow.templateSource === 'personal';

  return (
    <div
      onClick={onClick}
      className={`group rounded-xl border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xs relative ${
        isArchived
          ? 'border-slate-200 bg-slate-50/70 opacity-80'
          : workflow.featured
          ? 'border-indigo-200 bg-white ring-1 ring-indigo-500/10 hover:border-indigo-300'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="space-y-2.5">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {workflow.code && (
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {workflow.code}
              </span>
            )}
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700">
              v{version}
            </span>
            <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded">
              {workflow.category}
            </span>
            {isPersonalTemplate ? (
              <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                <UserCheck className="h-2.5 w-2.5" />
                <span>Personal</span>
              </span>
            ) : (
              <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 flex items-center gap-0.5">
                <Lock className="h-2.5 w-2.5 text-slate-400" />
                <span>Built-in</span>
              </span>
            )}
            {workflow.featured && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5 fill-current" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <span className="text-[11px] text-slate-400 shrink-0">
            {workflow.typicalDuration}
          </span>
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {workflow.shortDescription || workflow.description}
          </p>
        </div>

        {/* Trigger Badge if available */}
        {workflow.trigger && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">Trigger:</span>
            <span className="truncate">{workflow.trigger.description || workflow.trigger.type.replace(/_/g, ' ')}</span>
          </div>
        )}

        {/* Specialist Chain */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Specialist Chain
          </div>
          <div className="flex flex-wrap gap-1">
            {participatingEmployees.slice(0, 5).map((emp) => (
              <span
                key={emp.id}
                className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${emp.avatarColor} text-white font-bold text-[6px] flex items-center justify-center`}
                >
                  {emp.code}
                </span>
                <span>{emp.name}</span>
              </span>
            ))}
            {participatingEmployees.length > 5 && (
              <span className="text-[10px] text-slate-500 font-semibold self-center">
                +{participatingEmployees.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Target Outcome Box */}
        <div className="text-[11px] text-teal-900 bg-teal-50/70 p-2 rounded-lg border border-teal-200/60 leading-relaxed line-clamp-2">
          {workflow.outcome}
        </div>
      </div>

      {/* Footer & Actions (Requirement 10) */}
      <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>
            {workflow.expectedSteps.length} structured steps
            {gates.length > 0 && <span> · {gates.length} human gate</span>}
          </span>
          {isPersonalTemplate && (
            <span className="text-[10px] text-slate-400">
              Isolated to workspace
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-1.5 pt-1 flex-wrap">
          <div className="flex items-center gap-1 flex-wrap">
            {/* Preview Action */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onPreview) onPreview(e);
                else onClick();
              }}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Preview Workflow"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>

            {/* Duplicate Action (Allowed for both Built-in and Personal - creates personal copy) */}
            {onDuplicate && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(e);
                }}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Duplicate Template"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Personal Actions: Edit, Archive/Restore, Delete */}
            {isPersonalTemplate && (
              <>
                {!isArchived && onEdit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(e);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Edit Template"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                )}

                {isArchived && onRestore && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRestore(e);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold transition-colors cursor-pointer"
                    title="Restore Template"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Restore</span>
                  </button>
                )}

                {!isArchived && onArchive && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onArchive(e);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-amber-700 transition-colors cursor-pointer"
                    title="Archive Template"
                  >
                    <Archive className="h-3.5 w-3.5" />
                  </button>
                )}

                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(e);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete Template"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Primary Action: Use / Launch Workflow */}
          {!isArchived && (
            <button
              type="button"
              onClick={onLaunch}
              className="flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 text-xs font-semibold shadow-2xs transition-colors cursor-pointer shrink-0"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>Use</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
