import React, { useState } from 'react';
import { Project, WorkflowRun, WorkflowStep } from '../../types';
import { useOoumph } from '../../store/ooumphStore';
import {
  Check,
  Clock,
  AlertTriangle,
  ShieldCheck,
  User,
  Sparkles,
  GitBranch,
  ArrowRight,
  ArrowRightLeft,
  ChevronDown,
  Layers,
  LayoutList,
  Eye,
  RefreshCw,
  FileText
} from 'lucide-react';

interface ProjectExecutionMapProps {
  project: Project;
  run?: WorkflowRun | null;
  onSelectStep: (step: WorkflowStep) => void;
  activeStepId?: string | null;
}

export const ProjectExecutionMap: React.FC<ProjectExecutionMapProps> = ({
  project,
  run,
  onSelectStep,
  activeStepId
}) => {
  const { employees } = useOoumph();
  const [viewMode, setViewMode] = useState<'flow' | 'list'>('flow');

  if (!run || !run.steps || run.steps.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center space-y-3">
        <Sparkles className="mx-auto h-8 w-8 text-slate-400" />
        <div className="text-sm font-semibold text-slate-900">No active execution flow attached</div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          This project does not have an attached multi-agent workflow run yet. Attach a workflow from the template library to see the execution map.
        </p>
      </div>
    );
  }

  const steps = run.steps;

  const getStepIcon = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'human_approval':
        return <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />;
      case 'human_task':
        return <User className="h-3.5 w-3.5 text-indigo-600" />;
      case 'condition':
        return <GitBranch className="h-3.5 w-3.5 text-purple-600" />;
      case 'wait_schedule':
        return <Clock className="h-3.5 w-3.5 text-blue-600" />;
      case 'handoff':
        return <ArrowRightLeft className="h-3.5 w-3.5 text-teal-600" />;
      case 'employee_task':
      default:
        return <Sparkles className="h-3.5 w-3.5 text-teal-600" />;
    }
  };

  const getStepTypeLabel = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'human_approval':
        return 'Approval Gate';
      case 'human_task':
        return 'Human Task';
      case 'condition':
        return 'Condition Branch';
      case 'wait_schedule':
        return 'Wait / Schedule';
      case 'handoff':
        return 'Stage Handoff';
      case 'employee_task':
      default:
        return 'AI Specialist Task';
    }
  };

  const getStatusBadge = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="h-2.5 w-2.5 stroke-[3]" />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full border border-teal-300 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600"></span>
            In Progress
          </span>
        );
      case 'waiting_approval':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
            <AlertTriangle className="h-2.5 w-2.5 text-amber-700" />
            Needs Review
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full border border-rose-300">
            <RefreshCw className="h-2.5 w-2.5 text-rose-700" />
            Revision
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full border border-amber-400">
            <AlertTriangle className="h-2.5 w-2.5 text-amber-800" />
            Blocked
          </span>
        );
      case 'skipped':
        return (
          <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            Skipped
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            Queued
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Execution Map Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">{run.templateName}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-600 font-medium">
            Stage {Math.min(run.currentStepIndex + 1, steps.length)} of {steps.length}
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">
            {steps.filter((s) => s.status === 'completed').length} completed
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setViewMode('flow')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              viewMode === 'flow' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Flow View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutList className="h-3.5 w-3.5" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* 1. VISUAL FLOW VIEW */}
      {viewMode === 'flow' ? (
        <div className="space-y-6">
          {/* DESKTOP: Horizontal / Wrapping Connected Flow */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4">
              {steps.map((step, idx) => {
                const assignedEmp = step.employeeCode ? employees.find((e) => e.code === step.employeeCode) : null;
                const isSelected = activeStepId === step.id;
                const isNext = idx === run.currentStepIndex + 1;
                const isCurrent = step.status === 'in_progress' || step.status === 'waiting_approval' || step.status === 'blocked';
                const nextStep = steps[idx + 1];

                // Determine input and output labels
                const inputLabel = step.inputs && step.inputs.length > 0
                  ? step.inputs[0]
                  : idx === 0
                  ? 'Project Scope Brief'
                  : steps[idx - 1]?.expectedOutput || `${steps[idx - 1]?.title} Deliverable`;

                const outputLabel = step.expectedOutput || `${step.title} Package`;

                return (
                  <div key={step.id} className="relative flex flex-col justify-between">
                    <div
                      onClick={() => onSelectStep(step)}
                      className={`group relative rounded-xl border p-4 transition-all cursor-pointer hover:shadow-md flex flex-col justify-between h-full ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-xs'
                          : step.status === 'completed'
                          ? 'border-emerald-200 bg-white hover:border-emerald-300'
                          : step.status === 'in_progress'
                          ? 'border-teal-500 bg-teal-50/30 ring-2 ring-teal-500/20 shadow-xs'
                          : step.status === 'waiting_approval'
                          ? 'border-amber-400 bg-amber-50/40 ring-2 ring-amber-400/20 shadow-xs'
                          : step.status === 'blocked'
                          ? 'border-amber-400 bg-amber-50/60 ring-2 ring-amber-400/20 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 opacity-90'
                      }`}
                    >
                      {/* Top Step Card Header */}
                      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 font-mono text-[10px] font-bold text-slate-700">
                            {idx + 1}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                            {getStepIcon(step.type)}
                            <span>{getStepTypeLabel(step.type)}</span>
                          </span>
                        </div>
                        {getStatusBadge(step.status)}
                      </div>

                      {/* Owner & Title */}
                      <div className="py-2.5 space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          {assignedEmp ? (
                            <div className={`h-6 w-6 rounded-md text-white font-bold text-[10px] flex items-center justify-center ${assignedEmp.avatarColor}`}>
                              {assignedEmp.avatarInitials}
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-md bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center">
                              {step.type === 'human_task' ? 'HU' : step.type === 'human_approval' ? 'AP' : 'SY'}
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate">
                              {assignedEmp ? `${assignedEmp.name} (${assignedEmp.code})` : step.humanAssigneeName || 'Workspace Operator'}
                            </span>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {assignedEmp?.title || (step.type === 'human_approval' ? 'Human Signoff Gate' : 'Human Operator')}
                            </span>
                          </div>
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 pt-1 group-hover:text-indigo-600 transition-colors">
                          {step.title}
                        </h4>

                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Contract: Input -> Output Box */}
                      <div className="pt-2.5 border-t border-slate-100 space-y-1.5 text-[11px] bg-slate-50/70 p-2.5 rounded-lg">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            INPUT:
                          </span>
                          <span className="text-[10px] font-medium text-slate-700 truncate max-w-[190px]">
                            {inputLabel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-teal-600">
                            OUTPUT:
                          </span>
                          <span className="text-[10px] font-bold text-slate-900 truncate max-w-[190px]">
                            {outputLabel}
                          </span>
                        </div>
                      </div>

                      {/* Condition Branch Visualization if applicable */}
                      {step.type === 'condition' && (
                        <div className="mt-2 p-2 rounded bg-purple-50 border border-purple-200 text-[10px] space-y-1">
                          <div className="font-bold text-purple-900 flex items-center gap-1">
                            <GitBranch className="h-3 w-3 text-purple-700" />
                            <span>Branch Logic:</span>
                          </div>
                          <div className="text-purple-800">
                            {step.conditionConfig?.field || 'Qualification Check'}:
                          </div>
                          <div className="flex items-center gap-2 pt-0.5">
                            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                              YES → {step.conditionConfig?.thenActionDescription || 'Book Meeting'}
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                              NO → {step.conditionConfig?.elseActionDescription || 'Nurture Loop'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Footer timing / inspect link */}
                      <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{step.cadence || 'One-time milestone'}</span>
                        <span className="text-indigo-600 font-semibold group-hover:underline flex items-center gap-0.5">
                          <span>Inspect</span>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>

                    {/* Handoff Arrow Indicator to Next Step */}
                    {nextStep && (
                      <div className="py-2 flex items-center justify-center">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs text-[10px] text-slate-600">
                          <span className="text-slate-400">passes</span>
                          <span className="font-semibold text-slate-900 truncate max-w-[140px]">
                            {outputLabel}
                          </span>
                          <ArrowRight className="h-3 w-3 text-slate-400" />
                          <span className="font-bold text-indigo-700">
                            {nextStep.employeeCode || 'Next Stage'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE: Vertical Connected Timeline (Readable at 390px) */}
          <div className="block md:hidden">
            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {steps.map((step, idx) => {
                const assignedEmp = step.employeeCode ? employees.find((e) => e.code === step.employeeCode) : null;
                const isSelected = activeStepId === step.id;

                const inputLabel = step.inputs && step.inputs.length > 0
                  ? step.inputs[0]
                  : idx === 0
                  ? 'Project Scope Brief'
                  : steps[idx - 1]?.expectedOutput || `${steps[idx - 1]?.title} Deliverable`;

                const outputLabel = step.expectedOutput || `${step.title} Package`;

                return (
                  <div key={step.id} className="relative">
                    {/* Circle Node on Timeline */}
                    <div
                      className={`absolute -left-6 top-3 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                        step.status === 'completed'
                          ? 'bg-emerald-600 text-white border-white'
                          : step.status === 'in_progress'
                          ? 'bg-teal-600 text-white border-teal-200 animate-pulse'
                          : step.status === 'waiting_approval'
                          ? 'bg-amber-500 text-white border-amber-200'
                          : step.status === 'blocked'
                          ? 'bg-amber-600 text-white border-white'
                          : 'bg-white text-slate-500 border-slate-300'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <Check className="h-3 w-3 stroke-[3]" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Step Card Content */}
                    <div
                      onClick={() => onSelectStep(step)}
                      className={`rounded-xl border p-4 space-y-3 cursor-pointer shadow-2xs transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                          : step.status === 'in_progress'
                          ? 'border-teal-500 bg-teal-50/30 ring-2 ring-teal-500/20'
                          : step.status === 'waiting_approval'
                          ? 'border-amber-400 bg-amber-50/40'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Step {idx + 1} · {getStepTypeLabel(step.type)}
                        </span>
                        {getStatusBadge(step.status)}
                      </div>

                      <div className="flex items-center gap-2">
                        {assignedEmp ? (
                          <div className={`h-6 w-6 rounded text-white font-bold text-[10px] flex items-center justify-center ${assignedEmp.avatarColor}`}>
                            {assignedEmp.avatarInitials}
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center">
                            OP
                          </div>
                        )}
                        <span className="text-xs font-bold text-slate-900">
                          {assignedEmp ? `${assignedEmp.name} (${assignedEmp.code})` : 'Workspace Operator'}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                      <p className="text-[11px] text-slate-600">{step.description}</p>

                      <div className="p-2.5 rounded bg-slate-50 text-[10px] space-y-1">
                        <div>
                          <span className="font-bold text-slate-500">INPUT: </span>
                          <span className="text-slate-700">{inputLabel}</span>
                        </div>
                        <div>
                          <span className="font-bold text-teal-700">OUTPUT: </span>
                          <span className="text-slate-900 font-semibold">{outputLabel}</span>
                        </div>
                      </div>

                      {step.type === 'condition' && (
                        <div className="p-2 rounded bg-purple-50 text-[10px] text-purple-900">
                          <div className="font-bold">Condition: {step.conditionConfig?.field || 'Qualified Lead?'}</div>
                          <div className="flex gap-2 mt-1">
                            <span className="bg-emerald-100 text-emerald-800 px-1 rounded">YES → Book</span>
                            <span className="bg-slate-100 text-slate-700 px-1 rounded">NO → Nurture</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* 2. LIST VIEW */
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          {steps.map((step, idx) => {
            const assignedEmp = step.employeeCode ? employees.find((e) => e.code === step.employeeCode) : null;
            const isSelected = activeStepId === step.id;

            return (
              <div
                key={step.id}
                onClick={() => onSelectStep(step)}
                className={`p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                  isSelected ? 'bg-indigo-50/50' : ''
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-mono text-xs font-bold text-slate-700 shrink-0">
                    {idx + 1}
                  </div>

                  {assignedEmp ? (
                    <div className={`h-8 w-8 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 ${assignedEmp.avatarColor}`}>
                      {assignedEmp.avatarInitials}
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      HU
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-xs text-slate-900">{step.title}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">
                        · {assignedEmp ? `${assignedEmp.name} (${assignedEmp.code})` : 'Workspace Operator'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{step.description}</p>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-3">
                      <span>Input: {step.inputs?.[0] || 'Project Brief'}</span>
                      <span>→</span>
                      <span className="text-teal-700 font-semibold">Output: {step.expectedOutput || 'Milestone Deliverable'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {getStatusBadge(step.status)}
                  <button
                    type="button"
                    className="p-1 rounded text-slate-400 hover:text-slate-700"
                    title="Inspect details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
