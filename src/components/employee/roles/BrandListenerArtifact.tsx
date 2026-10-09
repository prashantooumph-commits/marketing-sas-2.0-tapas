import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { Globe, Radio, TrendingUp, AlertCircle, ArrowUpRight, ExternalLink } from 'lucide-react';

export const BrandListenerArtifact: React.FC = () => {
  const { activeWorkspace } = useOoumph();

  const [mentions] = useState([
    {
      source: 'Founder Systems Weekly (Substack)',
      date: 'Yesterday · 14:10 PST',
      headline: 'The Rise of the 6-Week Tactical Cohort: Why Executive Directors Love Cedar & Co',
      sentiment: 'Positive',
      reach: '18,500 Subscribers',
      snippet: '...unlike standard lecture-heavy offsites, Cedar & Co Learning forces executives to implement live delegation systems before the weekend...'
    },
    {
      source: 'Hacker News (Discussion)',
      date: '2 days ago · 09:30 PST',
      headline: 'Ask HN: What leadership courses actually moved the needle for your managers?',
      sentiment: 'Positive',
      reach: '42 comments',
      snippet: '...seconding the recommendation for Cedar & Co. Their operational rhythms gave our engineering directors back their Fridays...'
    },
    {
      source: 'EdTech Observer Brief',
      date: 'Oct 5, 2026',
      headline: 'Corporate Professional Credentials Surge in Hybrid Workplaces',
      sentiment: 'Neutral',
      reach: '35,000 Readers',
      snippet: '...newer micro-cohort platforms including Cedar & Co are proving that small 24-person cohorts yield significantly higher completion rates...'
    }
  ]);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Brand Mentions & Share-of-Voice Monitor</h3>
            <p className="text-xs text-slate-500">Ben Albright · Web, Forum & Newsletter Listening</p>
          </div>
          <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
            Listening Active
          </span>
        </div>

        {/* Coverage Note */}
        <div className="my-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700 leading-relaxed">
          <strong>Coverage Truth:</strong> Monitored sources include public newsletters, major industry forums, and podcast transcripts. Unmonitored private channels or walled gardens do not represent zero external discussion.
        </div>

        {/* Sentiment Distribution */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="rounded-lg bg-emerald-50/60 p-3 border border-emerald-100 text-xs">
            <span className="text-slate-500 font-medium">Positive Sentiment</span>
            <div className="text-lg font-bold text-emerald-800 tabular-nums">78%</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">High advocacy on cohorts</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">Neutral Industry Cites</span>
            <div className="text-lg font-bold text-slate-800 tabular-nums">18%</div>
            <div className="text-[10px] text-slate-500 mt-0.5">EdTech market overviews</div>
          </div>
          <div className="rounded-lg bg-amber-50/60 p-3 border border-amber-100 text-xs">
            <span className="text-slate-500 font-medium">Critical Questions</span>
            <div className="text-lg font-bold text-amber-800 tabular-nums">4%</div>
            <div className="text-[10px] text-amber-600 mt-0.5">Price & time commitment queries</div>
          </div>
        </div>

        {/* Mentions Stream */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-900">Recent Web Mentions Stream:</div>
          {mentions.map((m, idx) => (
            <div key={idx} className="rounded-lg border border-slate-200 p-3.5 bg-white space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{m.source}</span>
                <span className="text-slate-400 tabular-nums">{m.date}</span>
              </div>
              <div className="text-xs font-semibold text-slate-800">{m.headline}</div>
              <p className="text-xs text-slate-600 italic">"{m.snippet}"</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Audience Reach: <strong className="text-slate-700">{m.reach}</strong></span>
                <span className="font-semibold text-emerald-700">{m.sentiment} Impact</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
