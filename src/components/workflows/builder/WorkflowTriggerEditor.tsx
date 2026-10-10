import React from 'react';
import {
  WorkflowTriggerConfig,
  WorkflowTriggerType
} from '../../../types';
import {
  Play,
  Calendar,
  FileText,
  UserPlus,
  MessageSquare,
  Mail,
  ShoppingBag,
  TrendingUp,
  CheckCircle2,
  FolderPlus,
  Clock,
  AlertCircle
} from 'lucide-react';

interface WorkflowTriggerEditorProps {
  trigger: WorkflowTriggerConfig;
  onChange: (updated: WorkflowTriggerConfig) => void;
}

const TRIGGER_OPTIONS: {
  type: WorkflowTriggerType;
  label: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  badge: string;
}[] = [
  {
    type: 'MANUAL',
    label: 'Manual Start',
    description: 'You or a teammate manually start the workflow whenever ready.',
    icon: Play,
    badge: 'On Demand'
  },
  {
    type: 'SCHEDULE',
    label: 'Recurring Schedule',
    description: 'Runs on a simulated cadence (daily, weekdays, weekly, monthly).',
    icon: Calendar,
    badge: 'Demo Schedule'
  },
  {
    type: 'SOCIAL_COMMENT_KEYWORD',
    label: 'Social Comment Keyword',
    description: 'Triggers when a prospect comments a keyword (e.g. "DEMO") on a post or Reel.',
    icon: MessageSquare,
    badge: 'Social Event'
  },
  {
    type: 'NEW_FORM_SUBMISSION',
    label: 'Website Form Submission',
    description: 'Triggers when a visitor completes a website inquiry or lead form.',
    icon: FileText,
    badge: 'Inbound Web'
  },
  {
    type: 'NEW_LEAD',
    label: 'New Lead in CRM',
    description: 'Triggers when a new prospect is added to the CRM or imported.',
    icon: UserPlus,
    badge: 'CRM Event'
  },
  {
    type: 'NEW_INBOUND_MESSAGE',
    label: 'Inbound Direct Message / Email',
    description: 'Triggers when a direct message, chat inquiry, or email is received.',
    icon: Mail,
    badge: 'Inbound Inbox'
  },
  {
    type: 'NEW_ORDER',
    label: 'New Customer Order',
    description: 'Triggers when a product purchase or checkout is confirmed.',
    icon: ShoppingBag,
    badge: 'Commerce'
  },
  {
    type: 'DEAL_STAGE_CHANGED',
    label: 'Deal Stage Changed',
    description: 'Triggers when a sales opportunity moves to a specific pipeline stage.',
    icon: TrendingUp,
    badge: 'Pipeline'
  },
  {
    type: 'WORKFLOW_COMPLETED',
    label: 'Prior Workflow Completed',
    description: 'Triggers automatically after another workflow successfully finishes.',
    icon: CheckCircle2,
    badge: 'Chained'
  },
  {
    type: 'PROJECT_CREATED',
    label: 'Project Created',
    description: 'Triggers when a new business project is created in the workspace.',
    icon: FolderPlus,
    badge: 'Project Event'
  }
];

export const WorkflowTriggerEditor: React.FC<WorkflowTriggerEditorProps> = ({
  trigger,
  onChange
}) => {
  const currentOption = TRIGGER_OPTIONS.find((o) => o.type === trigger.type) || TRIGGER_OPTIONS[0];

  const handleTypeSelect = (type: WorkflowTriggerType) => {
    const opt = TRIGGER_OPTIONS.find((o) => o.type === type) || TRIGGER_OPTIONS[0];
    let defaultDetails: Partial<WorkflowTriggerConfig> = {
      type,
      label: opt.label,
      description: opt.description
    };

    if (type === 'SCHEDULE') {
      defaultDetails = {
        ...defaultDetails,
        scheduleRecurrence: 'weekly',
        scheduleTime: '09:00 AM',
        scheduleDayOfWeek: 'Monday',
        simulatedEventNote: 'Demo schedule triggers simulated runs on configured cadence.'
      };
    } else if (type === 'SOCIAL_COMMENT_KEYWORD') {
      defaultDetails = {
        ...defaultDetails,
        keyword: 'DEMO',
        socialPlatform: 'Instagram',
        matchType: 'Case-insensitive',
        sourceChannel: 'Instagram Professional',
        simulatedEventNote: 'Monitors incoming Instagram Reel comments for keyword "DEMO".'
      };
    } else if (type === 'DEAL_STAGE_CHANGED') {
      defaultDetails = {
        ...defaultDetails,
        targetDealStage: 'Proposal Sent'
      };
    }

    onChange({
      ...trigger,
      ...defaultDetails
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-teal-600"></span>
            <span>1. Workflow Trigger</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            What initiates this workflow? Every workflow starts with a trigger.
          </p>
        </div>
        <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
          {currentOption.badge}
        </span>
      </div>

      {/* Trigger Type Selector Grid */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 block">
          Trigger Event Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {TRIGGER_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = trigger.type === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => handleTypeSelect(opt.type)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-800 bg-teal-50/70 text-teal-950 font-bold shadow-xs ring-1 ring-teal-800'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <Icon className={`h-4 w-4 mb-1.5 ${isSelected ? 'text-teal-800' : 'text-slate-500'}`} />
                <span className="text-xs leading-tight line-clamp-1">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trigger Configuration Details */}
      <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3.5">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-teal-800 shrink-0">
            <currentOption.icon className="h-4 w-4" />
          </div>
          <div className="space-y-0.5 flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-900">{trigger.label}</div>
            <p className="text-xs text-slate-600">{trigger.description}</p>
          </div>
        </div>

        {/* Dynamic fields based on trigger type */}
        {trigger.type === 'SCHEDULE' && (
          <div className="space-y-3 pt-2 border-t border-slate-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Recurrence Cadence
                </label>
                <select
                  value={trigger.scheduleRecurrence || 'weekly'}
                  onChange={(e) =>
                    onChange({
                      ...trigger,
                      scheduleRecurrence: e.target.value as any
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                >
                  <option value="daily">Daily</option>
                  <option value="weekdays">Weekdays (Mon - Fri)</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom Schedule</option>
                </select>
              </div>

              {trigger.scheduleRecurrence === 'weekly' && (
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Day of Week
                  </label>
                  <select
                    value={trigger.scheduleDayOfWeek || 'Monday'}
                    onChange={(e) =>
                      onChange({
                        ...trigger,
                        scheduleDayOfWeek: e.target.value
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                  >
                    <option value="Monday">Every Monday</option>
                    <option value="Tuesday">Every Tuesday</option>
                    <option value="Wednesday">Every Wednesday</option>
                    <option value="Thursday">Every Thursday</option>
                    <option value="Friday">Every Friday</option>
                    <option value="Saturday">Every Saturday</option>
                    <option value="Sunday">Every Sunday</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Trigger Time
                </label>
                <input
                  type="text"
                  value={trigger.scheduleTime || '09:00 AM'}
                  onChange={(e) => onChange({ ...trigger, scheduleTime: e.target.value })}
                  placeholder="e.g. 09:00 AM"
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px]">
              <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-700" />
              <span>
                <strong>Demo schedule note:</strong> This cadence is simulated in-browser. The workflow will not continue while the browser is closed.
              </span>
            </div>
          </div>
        )}

        {trigger.type === 'SOCIAL_COMMENT_KEYWORD' && (
          <div className="space-y-3 pt-2 border-t border-slate-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Social Platform
                </label>
                <select
                  value={trigger.socialPlatform || 'Instagram'}
                  onChange={(e) =>
                    onChange({
                      ...trigger,
                      socialPlatform: e.target.value as any,
                      sourceChannel: `${e.target.value} Professional`
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                >
                  <option value="Instagram">Instagram (Reels & Feed)</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook Page</option>
                  <option value="Twitter / X">Twitter / X</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Keyword Trigger
                </label>
                <input
                  type="text"
                  value={trigger.keyword || 'DEMO'}
                  onChange={(e) => onChange({ ...trigger, keyword: e.target.value })}
                  placeholder="e.g. DEMO, GROW, INFO"
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:border-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Match Mode
                </label>
                <select
                  value={trigger.matchType || 'Case-insensitive'}
                  onChange={(e) =>
                    onChange({
                      ...trigger,
                      matchType: e.target.value as any
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
                >
                  <option value="Case-insensitive">Case-insensitive match</option>
                  <option value="Exact">Exact match</option>
                  <option value="Contains">Contains anywhere</option>
                </select>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
              When a commenter posts "{trigger.keyword || 'DEMO'}" on connected {trigger.socialPlatform || 'Instagram'}, the workflow triggers step 1.
            </div>
          </div>
        )}

        {trigger.type === 'DEAL_STAGE_CHANGED' && (
          <div className="space-y-2 pt-2 border-t border-slate-200/80">
            <label className="text-[11px] font-semibold text-slate-700 block">
              When Deal Advances to Stage
            </label>
            <select
              value={trigger.targetDealStage || 'Proposal Sent'}
              onChange={(e) => onChange({ ...trigger, targetDealStage: e.target.value })}
              className="w-full sm:w-72 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
            >
              <option value="Discovery">Discovery</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Commercial Review">Commercial Review</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Onboarding">Onboarding</option>
            </select>
          </div>
        )}

        {trigger.type === 'MANUAL' && (
          <div className="text-[11px] text-slate-500 pt-1">
            Manual start is best for on-demand initiatives, campaign launches, and quarterly strategy cycles.
          </div>
        )}
      </div>
    </div>
  );
};
