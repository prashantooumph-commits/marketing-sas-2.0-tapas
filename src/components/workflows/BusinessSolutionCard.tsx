import React from 'react';
import { BusinessSolution, Employee } from '../../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

interface BusinessSolutionCardProps {
  solution: BusinessSolution;
  employees: Employee[];
  onClick: () => void;
  onPlan: (e: React.MouseEvent) => void;
}

export const BusinessSolutionCard: React.FC<BusinessSolutionCardProps> = ({
  solution,
  employees,
  onClick,
  onPlan
}) => {
  const participatingEmployees = employees.filter((e) => solution.employeeIds.includes(e.id));

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-md ${
        solution.featured
          ? 'border-teal-300/80 bg-linear-to-b from-teal-50/40 via-white to-white ring-1 ring-teal-500/10'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="space-y-3">
        {/* Top badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white tracking-wider">
              {solution.code}
            </span>
            <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
              {solution.outcomeCategory}
            </span>
            {solution.featured && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-full flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5 fill-current" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-slate-500 capitalize shrink-0">
            {solution.complexity}
          </span>
        </div>

        {/* Title & Promise */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
            {solution.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
            {solution.shortPromise}
          </p>
        </div>

        {/* Workflows included badge */}
        <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <Workflow className="h-3.5 w-3.5 text-slate-500 shrink-0" />
          <span className="font-medium text-slate-700">
            Includes <strong>{solution.workflowTemplateIds.length} orchestrated workflows</strong>
          </span>
        </div>

        {/* Participating AI specialists */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            AI Specialist Team ({participatingEmployees.length})
          </div>
          <div className="flex items-center -space-x-1.5 overflow-hidden py-0.5">
            {participatingEmployees.slice(0, 6).map((emp) => (
              <div
                key={emp.id}
                title={`${emp.name} (${emp.code}) — ${emp.title}`}
                className={`h-6 w-6 rounded-full ${emp.avatarColor} text-white font-bold text-[8px] flex items-center justify-center ring-2 ring-white shadow-2xs`}
              >
                {emp.code}
              </div>
            ))}
            {participatingEmployees.length > 6 && (
              <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center ring-2 ring-white">
                +{participatingEmployees.length - 6}
              </div>
            )}
          </div>
        </div>

        {/* Human gates badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-amber-900">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span className="line-clamp-1">{solution.approvalGateTypes.length} human approval gates</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          View Solution Details →
        </button>

        <button
          type="button"
          onClick={onPlan}
          className="flex items-center gap-1 rounded-lg bg-teal-800 hover:bg-teal-900 text-white px-3 py-1.5 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          <span>Plan Solution</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
