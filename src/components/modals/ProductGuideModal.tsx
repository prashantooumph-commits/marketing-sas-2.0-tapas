import React from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  X,
  Building2,
  Share2,
  Users,
  Layers,
  Inbox,
  Play,
  TrendingUp,
  PhoneCall,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProductGuideModal: React.FC = () => {
  const { isProductGuideOpen, setIsProductGuideOpen, navigate } = useOoumph();

  if (!isProductGuideOpen) return null;

  const steps = [
    {
      num: '1',
      title: 'Tell Ooumph about your business',
      desc: 'Define your brand tone, target audience, core offerings, and approved claims in My Business.',
      icon: Building2,
      accent: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      num: '2',
      title: 'Connect the accounts your team needs',
      desc: 'Authorize channels like LinkedIn, Instagram, Google Workspace, or Twilio so employees can draft and deliver.',
      icon: Share2,
      accent: 'text-sky-600 bg-sky-50 border-sky-200'
    },
    {
      num: '3',
      title: 'Choose how to start work',
      desc: 'Ask one specialist for a focused task, start a business goal with an assembled team, or launch a proven workflow.',
      icon: Users,
      accent: 'text-teal-600 bg-teal-50 border-teal-200'
    },
    {
      num: '4',
      title: 'Employees collaborate through Projects',
      desc: 'Shared business objectives bring specialists together with clear responsibilities and execution handoffs.',
      icon: Layers,
      accent: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    {
      num: '5',
      title: 'Review important decisions',
      desc: 'High-risk items, public messages, and budget approvals route to your Inbox for quick authorization.',
      icon: Inbox,
      accent: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      num: '6',
      title: 'Work is executed safely',
      desc: 'Personas create landing pages, schedule content, enrich leads, and draft proposals within strict guardrails.',
      icon: Play,
      accent: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      num: '7',
      title: 'Results, conversations and leads return',
      desc: 'Track generated leads, incoming prospect comments, and multi-touch analytics directly in your workspace.',
      icon: TrendingUp,
      accent: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      num: '8',
      title: 'Sales specialists continue the journey',
      desc: 'Inbound and outbound sales agents follow up, qualify prospects, and book discovery meetings on your calendar.',
      icon: PhoneCall,
      accent: 'text-rose-600 bg-rose-50 border-rose-200'
    },
    {
      num: '9',
      title: 'Verified learnings improve future work',
      desc: 'Every correction or lesson learned is recorded in shared memory, preventing repeated mistakes.',
      icon: Sparkles,
      accent: 'text-amber-700 bg-amber-50 border-amber-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4.5 bg-slate-50/70">
          <div>
            <div className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
              Product Overview
            </div>
            <h2 className="text-lg font-bold text-slate-950">How Ooumph Works</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              An employee-first operating system connecting dedicated AI specialists to your business goals.
            </p>
          </div>
          <button
            onClick={() => setIsProductGuideOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3.5 divide-y divide-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Step {st.num}</span>
                      <div className={`p-1.5 rounded-lg border ${st.accent}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{st.title}</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50 -mx-6 -mb-6 p-6 border-t border-slate-200">
            <div className="text-slate-600">
              Ready to explore? Delegate a task to an employee or assemble a team for your business goal.
            </div>
            <button
              onClick={() => {
                setIsProductGuideOpen(false);
                navigate('team');
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-950 text-white font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Get started on My Team</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
