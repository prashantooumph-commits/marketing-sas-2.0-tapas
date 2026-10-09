import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { DollarSign, ShieldAlert, CheckCircle2, Play, Pause, Search, Target, AlertCircle } from 'lucide-react';

interface PaidAdsArtifactProps {
  platform: 'meta' | 'google';
}

export const PaidAdsArtifact: React.FC<PaidAdsArtifactProps> = ({ platform }) => {
  const { activeWorkspace, approvals } = useOoumph();

  // Meta Ads state (A24)
  const [metaBudget, setMetaBudget] = useState('50.00');
  const [metaStatus, setMetaStatus] = useState<'review_pending' | 'active' | 'paused'>('review_pending');

  // Google Ads state (A25)
  const [keywords, setKeywords] = useState([
    { query: 'executive delegation training', cpc: '$4.20', vol: '1,800/mo', intent: 'High' },
    { query: 'corporate manager cohort 2026', cpc: '$5.50', vol: '950/mo', intent: 'High' },
    { query: 'leadership training for busy founders', cpc: '$3.80', vol: '2,200/mo', intent: 'Medium' }
  ]);
  const [negativeKeywords, setNegativeKeywords] = useState('free leadership courses, university degree, accredited masters, cheap online seminar');
  const [googleStatus, setGoogleStatus] = useState<'draft' | 'simulated_live'>('draft');

  return (
    <div className="space-y-6 max-w-3xl">
      {/* META ADS (A24 - MAYA LIN) */}
      {platform === 'meta' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Meta Paid Acquisition Studio (Instagram & Facebook)</h3>
              <p className="text-xs text-slate-500">Maya Lin · Targeted Lead Generation Campaigns</p>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                metaStatus === 'active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : metaStatus === 'paused'
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {metaStatus === 'active' ? 'Campaign Running' : metaStatus === 'paused' ? 'Paused' : 'Pending Founder Authorization'}
            </span>
          </div>

          {/* Budget Guardrail Banner */}
          <div className="my-4 rounded-lg bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-2.5">
            <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 leading-relaxed">
              <strong>Budget Safety Boundary:</strong> All advertising budgets are simulated locally. No real ad networks or credit cards are charged. Material daily spend caps require explicit founder authorization in the Review Inbox.
            </div>
          </div>

          {/* Ad Configuration Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Target Audience:</label>
                <div className="p-2 rounded bg-white border border-slate-200 text-slate-800">
                  California, Leadership & Operations titles, Ages 30-55
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Simulated Daily Budget Cap:</label>
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-400 font-bold">$</span>
                  <input
                    type="text"
                    value={metaBudget}
                    onChange={(e) => setMetaBudget(e.target.value)}
                    className="flex-1 text-slate-900 font-bold tabular-nums outline-hidden"
                  />
                  <span className="text-slate-400 text-[11px]">/ day</span>
                </div>
              </div>
            </div>

            {/* Ad Creative Mock Preview */}
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                  CC
                </div>
                <span className="font-bold text-slate-900">{activeWorkspace.name} · Sponsored</span>
              </div>
              <p className="text-slate-800 leading-relaxed">
                "Stop putting out administrative fires. Install the 6-week operational rhythms that give corporate directors their weekends back."
              </p>
              <div className="rounded bg-gradient-to-r from-slate-900 to-indigo-900 p-4 text-white text-center">
                <div className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">Executive Fellowship 2026</div>
                <div className="text-xs font-bold mt-1">High-Leverage Delegation Cohort</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <span className="text-slate-500">
                Performance: Simulated CPA $34.20 · Estimated 44 leads/mo
              </span>
              <div className="flex gap-2">
                {metaStatus !== 'active' ? (
                  <button
                    onClick={() => setMetaStatus('active')}
                    className="flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    <Play className="h-3 w-3" />
                    <span>Simulate Launch</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setMetaStatus('paused')}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Pause className="h-3 w-3" />
                    <span>Pause Campaign</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE ADS (A25 - GIDEON VANCE) */}
      {platform === 'google' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Google High-Intent Search Ads Engine</h3>
              <p className="text-xs text-slate-500">Gideon Vance · Intent Targeting & Negative Keywords</p>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                googleStatus === 'simulated_live'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {googleStatus === 'simulated_live' ? 'Search Active' : 'Draft Ready'}
            </span>
          </div>

          {/* Keywords Table */}
          <div className="my-4 space-y-2">
            <div className="text-xs font-bold text-slate-900">Bidded High-Intent Search Queries:</div>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="p-2.5 font-semibold">Keyword Phrase</th>
                    <th className="p-2.5 font-semibold text-right">Search Vol</th>
                    <th className="p-2.5 font-semibold text-right">Est. CPC</th>
                    <th className="p-2.5 font-semibold text-right">Intent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {keywords.map((kw, i) => (
                    <tr key={i}>
                      <td className="p-2.5 font-medium text-slate-900">"{kw.query}"</td>
                      <td className="p-2.5 text-right tabular-nums text-slate-600">{kw.vol}</td>
                      <td className="p-2.5 text-right tabular-nums text-slate-600">{kw.cpc}</td>
                      <td className="p-2.5 text-right font-semibold text-emerald-700">{kw.intent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Negative Keywords List */}
          <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-200 space-y-1.5 text-xs">
            <span className="font-bold text-slate-900 block">Negative Keyword Exclusions (Suppresses wasted ad spend):</span>
            <input
              type="text"
              value={negativeKeywords}
              onChange={(e) => setNegativeKeywords(e.target.value)}
              className="w-full rounded border border-slate-200 p-2 text-xs text-slate-800 bg-white font-mono"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Destination: {activeWorkspace.domain}/executive-fellowship</span>
            <button
              onClick={() => setGoogleStatus(googleStatus === 'simulated_live' ? 'draft' : 'simulated_live')}
              className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition-colors"
            >
              <Search className="h-3 w-3" />
              <span>{googleStatus === 'simulated_live' ? 'Pause Search Ads' : 'Simulate Google Ads Launch'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
