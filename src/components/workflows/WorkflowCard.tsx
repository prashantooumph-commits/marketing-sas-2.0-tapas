import React from 'react';
import { WorkflowTemplate, Employee } from '../../types';
import { ArrowRight, Play, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

interface WorkflowCardProps {
  workflow: WorkflowTemplate;
  employees: Employee[];
  onClick: () => void;
  onLaunch: (e: React.MouseEvent) => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  employees,
  onClick,
  onLaunch
}) => {
  const participatingEmployees = employees.filter((e) =>
    workflow.participatingEmployeeIds.includes(e.id)
  );
  const title = workflow.title || workflow.name;
  const gates = workflow.approvalGates || workflow.approvalPoints || [];

  return (
    <div
      onClick={onClick}
      className={`group rounded-xl border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xs ${
        workflow.featured
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
            <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded">
              {workflow.category}
            </span>
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

      {/* Footer */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500">
          {workflow.expectedSteps.length} structured steps
          {gates.length > 0 && <span> · {gates.length} human gate</span>}
        </span>

        <button
          type="button"
          onClick={onLaunch}
          className="flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 text-xs font-semibold shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <Play className="h-3 w-3 fill-current" />
          <span>Launch</span>
        </button>
      </div>
    </div>
  );
};
