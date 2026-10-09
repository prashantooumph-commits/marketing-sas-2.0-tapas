import React, { useState } from 'react';
import { Lock, Sparkles, CheckCircle2, Heart, Target, ArrowRight } from 'lucide-react';

export const ProductivityCoachArtifact: React.FC = () => {
  const [reflectionText, setReflectionText] = useState(
    'This week was heavy on inbound corporate discovery calls. Energy was highest during tactical cohort planning and lowest while manually formatting spreadsheet tables. Next week I need to delegate report formatting to Diane Chen (A13) and protect Friday afternoon for deep strategic thinking.'
  );

  const [savedStatus, setSavedStatus] = useState(false);

  const founderGoals = [
    { title: 'Reclaim 10 hours of personal focus time weekly', progress: 85, target: '8.5 / 10 hrs' },
    { title: 'Zero unreviewed approvals in inbox before 5:00 PM', progress: 100, target: '100% On-time' },
    { title: 'Establish 4-hour uninterrupted creative deep block on Wednesdays', progress: 75, target: '3 / 4 hrs' }
  ];

  const handleSaveReflection = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Private Founder Productivity & Energy Vault</h3>
            <p className="text-xs text-slate-500">Grace Sterling · Confidential Reflection Journal</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-fuchsia-800 bg-fuchsia-50 border border-fuchsia-200 px-2.5 py-0.5 rounded">
            <Lock className="h-3.5 w-3.5" />
            <span>Strictly Isolated Vault</span>
          </div>
        </div>

        {/* Privacy Boundary Banner */}
        <div className="my-4 rounded-lg bg-fuchsia-50/50 border border-fuchsia-200 p-3 text-xs text-fuchsia-950 leading-relaxed">
          <strong>Privacy Boundary:</strong> Information in this workspace is confidential to you as the founder. It is strictly excluded from general company knowledge, customer-facing employees, and team exports.
        </div>

        {/* OKR Progress */}
        <div className="space-y-3 my-4">
          <div className="text-xs font-bold text-slate-900">Founder Personal OKRs & Energy Metrics:</div>
          {founderGoals.map((g, idx) => (
            <div key={idx} className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
              <div className="flex justify-between text-xs text-slate-800 mb-1.5 font-medium">
                <span>{g.title}</span>
                <span className="tabular-nums font-bold text-slate-900">{g.target}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-fuchsia-600 rounded-full" style={{ width: `${g.progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Reflection Journal */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <label className="block text-xs font-bold text-slate-900">
            Weekly Energy Audit & Delegation Reflection:
          </label>
          <textarea
            rows={4}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            className="w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-800 leading-relaxed focus:border-fuchsia-600 focus:outline-hidden"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              {savedStatus ? '✓ Saved securely in private local vault' : 'Stored locally in browser session'}
            </span>
            <button
              onClick={handleSaveReflection}
              className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Save Private Reflection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
