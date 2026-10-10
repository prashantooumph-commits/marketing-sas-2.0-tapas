import React from 'react';
import { WorkflowStepType } from '../../../types';
import {
  Bot,
  User,
  ShieldCheck,
  GitBranch,
  Clock,
  ArrowRightLeft,
  X,
  Sparkles
} from 'lucide-react';

interface WorkflowAddStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: WorkflowStepType) => void;
  currentStepCount: number;
}

const STEP_TYPE_OPTIONS: {
  type: WorkflowStepType;
  title: string;
  tagline: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  badge: string;
}[] = [
  {
    type: 'employee_task',
    title: 'AI Employee Task',
    tagline: 'Assign work to an AI employee.',
    description: 'Delegate copywriting, ad design, lead research, CRM triage, or SEO analysis to a specialized team member.',
    icon: Bot,
    color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900 hover:border-indigo-400 hover:bg-indigo-50',
    badge: 'Autonomous AI'
  },
  {
    type: 'human_task',
    title: 'Human Task',
    tagline: 'Assign work to a human teammate.',
    description: 'Task assigned to an operator, designer, or executive teammate (e.g. upload high-res photos, sign off contract).',
    icon: User,
    color: 'border-amber-200 bg-amber-50/50 text-amber-900 hover:border-amber-400 hover:bg-amber-50',
    badge: 'Human Work'
  },
  {
    type: 'human_approval',
    title: 'Human Approval',
    tagline: 'Pause until someone reviews or approves the work.',
    description: 'Human-in-the-loop safety gate. Pauses execution until approved in Inbox. Revisions return work to specialist.',
    icon: ShieldCheck,
    color: 'border-rose-200 bg-rose-50/50 text-rose-900 hover:border-rose-400 hover:bg-rose-50',
    badge: 'Governance Gate'
  },
  {
    type: 'condition',
    title: 'Condition',
    tagline: 'Choose what happens based on a result.',
    description: 'Branch based on lead qualification, deal stage, comment match, or customer reply (IF / THEN / OTHERWISE).',
    icon: GitBranch,
    color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900 hover:border-emerald-400 hover:bg-emerald-50',
    badge: 'Branch Logic'
  },
  {
    type: 'wait_schedule',
    title: 'Wait / Delay',
    tagline: 'Pause for a period or until something happens.',
    description: 'Simulate waiting 2 days, waiting until Monday morning, or pausing until a lead responds.',
    icon: Clock,
    color: 'border-sky-200 bg-sky-50/50 text-sky-900 hover:border-sky-400 hover:bg-sky-50',
    badge: 'Timing Delay'
  },
  {
    type: 'handoff',
    title: 'Specialist Handoff',
    tagline: 'Transfer responsibility and context to someone else.',
    description: 'Deliberately hand over approved copy, creative briefs, or qualified lead dossiers to the next specialist.',
    icon: ArrowRightLeft,
    color: 'border-purple-200 bg-purple-50/50 text-purple-900 hover:border-purple-400 hover:bg-purple-50',
    badge: 'Context Pass'
  }
];

export const WorkflowAddStepModal: React.FC<WorkflowAddStepModalProps> = ({
  isOpen,
  onClose,
  onSelectType,
  currentStepCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl p-6 space-y-5 animate-scale-in my-auto">
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                Step {currentStepCount + 1}
              </span>
              <h3 className="text-base font-bold text-slate-900">Add Step to Workflow</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select the type of step to append to your execution sequence.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STEP_TYPE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => {
                  onSelectType(opt.type);
                  onClose();
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 group ${opt.color}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/80 border border-current opacity-80">
                    {opt.badge}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold">{opt.title}</div>
                  <div className="text-[11px] font-semibold opacity-90 mt-0.5">"{opt.tagline}"</div>
                  <p className="text-[11px] opacity-75 mt-1 leading-relaxed line-clamp-2">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>You can reorder, duplicate, or edit any step anytime.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
