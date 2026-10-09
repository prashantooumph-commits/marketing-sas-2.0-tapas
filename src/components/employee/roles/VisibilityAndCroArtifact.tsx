import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { Search, Split, CheckCircle2, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

interface VisibilityAndCroProps {
  mode: 'visibility' | 'cro';
}

export const VisibilityAndCroArtifact: React.FC<VisibilityAndCroProps> = ({ mode }) => {
  const { activeWorkspace } = useOoumph();

  // A26 Answer Engine State
  const [citationQueries] = useState([
    {
      query: 'Best leadership and delegation training for startup executives',
      citedEngines: ['Perplexity AI', 'Claude 3.5 Sonnet'],
      summary: 'Cited Cedar & Co for tactical 6-week micro-cohort framework and verified Accredible credentials.',
      status: 'Cited'
    },
    {
      query: 'How to fix calendar meeting overload as a director',
      citedEngines: ['Perplexity AI'],
      summary: 'Cited Cedar & Co article on executive operating rhythms and calendar buffers.',
      status: 'Cited'
    },
    {
      query: 'Executive coaching programs with small cohort caps under 25 people',
      citedEngines: ['ChatGPT 4o'],
      summary: 'Competitor programs cited. Missing structured schema on cohort cap size.',
      status: 'Opportunity Gap'
    }
  ]);

  // A27 CRO State
  const [testTraffic, setTestTraffic] = useState(1400);
  const [isTestConclusive, setIsTestConclusive] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* A26 ANSWER-ENGINE VISIBILITY (ANIKA PATEL) */}
      {mode === 'visibility' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Answer-Engine AI Citation & Entity Audit</h3>
              <p className="text-xs text-slate-500">Anika Patel · Perplexity, ChatGPT & Claude Visibility</p>
            </div>
            <span className="text-xs font-semibold text-lime-800 bg-lime-50 border border-lime-200 px-2 py-0.5 rounded">
              Entity Score: 84/100
            </span>
          </div>

          <div className="my-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700 leading-relaxed">
            <strong>Grounded Research:</strong> Evaluates how conversational AI models cite {activeWorkspace.name} when users ask practical advice queries. Focuses on content clarity and schema hygiene without false ranking guarantees.
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900">Conversational Query Citation Results:</div>
            {citationQueries.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 p-3.5 bg-white space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">"{item.query}"</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.status === 'Cited'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{item.summary}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Grounding Engines: {item.citedEngines.join(', ')}</span>
                  <span className="text-slate-600 font-medium">Schema Audit: Valid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* A27 CRO SPECIALIST (CRAIG HOFFMAN) */}
      {mode === 'cro' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Conversion Rate Optimization (CRO) Lab</h3>
              <p className="text-xs text-slate-500">Craig Hoffman · A/B Split Testing & Statistical Confidence</p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Active A/B Test
            </span>
          </div>

          {/* Test Hypothesis */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 my-4 space-y-2 text-xs">
            <div className="font-bold text-slate-900">Hypothesis: Landing Page CTA Framing</div>
            <p className="text-slate-700 leading-relaxed">
              Changing the hero call-to-action from commercial commitment ("Apply for Fellowship") to zero-friction tactical review ("Schedule 15-Min Strategy Review") will increase form conversions without degrading lead quality.
            </p>
          </div>

          {/* Variants Side-by-Side */}
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Control Variant (50% Traffic)</span>
              <div className="font-bold text-slate-900">"Apply for Fellowship"</div>
              <div className="text-slate-500 pt-2 border-t border-slate-100 tabular-nums">
                Conversion Rate: <strong>3.2%</strong> (22 / 700 visitors)
              </div>
            </div>

            <div className="rounded-lg border border-emerald-300 bg-emerald-50/30 p-3.5 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Challenger Variant (50% Traffic)</span>
              <div className="font-bold text-slate-900">"Schedule 15-Min Strategy Review"</div>
              <div className="text-slate-500 pt-2 border-t border-slate-100 tabular-nums">
                Conversion Rate: <strong>4.8%</strong> (34 / 700 visitors)
              </div>
            </div>
          </div>

          {/* Statistical Rigor Warning */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-950 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Sample Size Rigor:</strong> Current sample size (1,400 visitors) has reached 91% confidence, approaching the 95% threshold. We do not declare premature winners from single spikes.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 tabular-nums">Sample: 1,400 / 2,000 visitors</span>
            <button
              onClick={() => setIsTestConclusive(true)}
              className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
            >
              Simulate Reaching Statistical Significance
            </button>
          </div>

          {isTestConclusive && (
            <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>95.4% confidence achieved! Challenger variant (+50% relative lift) recommended for deployment.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
