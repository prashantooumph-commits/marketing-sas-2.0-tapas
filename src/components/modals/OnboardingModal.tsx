import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { Check, ArrowRight, Building, Target, Globe, Users, Sparkles, X } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, activeWorkspace, navigate } = useOoumph();

  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState(activeWorkspace.name);
  const [websiteStatus, setWebsiteStatus] = useState<'existing' | 'new'>('existing');
  const [primaryGoal, setPrimaryGoal] = useState<'leads' | 'content' | 'inbox' | 'operations'>('leads');
  const [selectedTools, setSelectedTools] = useState<string[]>(['Google Workspace', 'LinkedIn']);

  if (!isOnboardingOpen) return null;

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleFinishOnboarding = () => {
    setIsOnboardingOpen(false);
    navigate('team', 'emp-a01');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Interactive Onboarding · Step {step} of 3
            </span>
            <h2 className="text-base font-semibold text-slate-900 mt-0.5">
              Set Up Your AI Employee Team
            </h2>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Business or Practice Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Website Presence
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWebsiteStatus('existing')}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      websiteStatus === 'existing'
                        ? 'border-slate-900 bg-slate-50/80 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-900">Existing Website</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Connect to your current domain ({activeWorkspace.domain})
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWebsiteStatus('new')}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      websiteStatus === 'new'
                        ? 'border-slate-900 bg-slate-50/80 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-900">No Website Yet</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Walter Hayes (A07) will build a high-converting landing page
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  What is your primary focus for this month?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'leads', title: 'Acquire Inbound Leads', desc: 'Social guides & speed-to-lead response' },
                    { id: 'inbox', title: 'Reclaim Founder Time', desc: 'Executive inbox & schedule defense' },
                    { id: 'content', title: 'Publish Thought Leadership', desc: 'Weekly posts & SEO articles' },
                    { id: 'operations', title: 'Close High-Value Deals', desc: 'Proposals, legal check & CRM' }
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setPrimaryGoal(goal.id as any)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        primaryGoal === goal.id
                          ? 'border-slate-900 bg-slate-50 shadow-2xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-semibold text-slate-900">{goal.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{goal.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Select Existing Business Channels:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Google Workspace', 'LinkedIn', 'Meta Business', 'Stripe', 'Twilio Phone'].map((tool) => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-950">
                  <Sparkles className="h-4 w-4 text-emerald-700" />
                  Your Recommended Core Team is Ready
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Based on your goal, we activated 4 dedicated AI specialists configured with {businessName}'s approved brand tone.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Aria Vance (A01)', role: 'Executive Assistant', reason: 'Defends your calendar and drafts priority replies.' },
                  { name: 'Jordan Bell (A17)', role: 'Inbound Sales', reason: 'Sub-60 second speed-to-lead response on website leads.' },
                  { name: 'Soren Miller (A02)', role: 'Social Publisher', reason: 'Maintains consistent organic brand presence.' },
                  { name: 'Astrid Lind (A23)', role: 'Audience Growth', reason: 'Automates Flagship comment-to-guide lead loop.' }
                ].map((emp) => (
                  <div key={emp.name} className="flex items-start gap-3 rounded-lg border border-slate-200 p-2.5 bg-white">
                    <div className="h-7 w-7 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        {emp.name} · <span className="font-normal text-slate-600">{emp.role}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{emp.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Next Step <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinishOnboarding}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors shadow-2xs"
            >
              Enter Workspace & Meet Team
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
