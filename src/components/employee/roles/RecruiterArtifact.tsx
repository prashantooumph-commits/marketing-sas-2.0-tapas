import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { UserPlus, ShieldAlert, CheckCircle2, Calendar, FileText } from 'lucide-react';

export const RecruiterArtifact: React.FC = () => {
  const { activeWorkspace } = useOoumph();

  const [candidates, setCandidates] = useState([
    {
      id: 'cand-1',
      name: 'Dr. Evelyn Martinez',
      title: 'Former Director of Executive Leadership',
      experience: '12 years corporate leadership coaching',
      stage: 'Final Interview',
      scorecard: {
        pedagogy: 95,
        delegationSystems: 92,
        facilitation: 98
      },
      status: 'Ready for Founder Decision'
    },
    {
      id: 'cand-2',
      name: 'Julian Hayes',
      title: 'Senior Operations Consultant',
      experience: '8 years scaling operations at Techstars',
      stage: 'Scorecard Review',
      scorecard: {
        pedagogy: 88,
        delegationSystems: 94,
        facilitation: 86
      },
      status: 'Interview Scheduled'
    }
  ]);

  const [activeCandId, setActiveCandId] = useState('cand-1');
  const activeCand = candidates.find((c) => c.id === activeCandId) || candidates[0];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Talent Acquisition & Candidate Scorecards</h3>
            <p className="text-xs text-slate-500">Recruiting: Senior Corporate Cohort Facilitator</p>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            Russell Boyd
          </span>
        </div>

        {/* Ethical Safeguard Banner */}
        <div className="my-4 rounded-lg bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <strong>Ethical Hiring Safeguard:</strong> Russell Boyd manages administrative coordination, competency rubric drafting, and interview scheduling. All hiring evaluations and selection decisions are strictly reserved for human business owners. AI does not score sensitive traits or automate rejections.
          </div>
        </div>

        {/* Candidate Selector */}
        <div className="grid grid-cols-2 gap-2 my-4">
          {candidates.map((cand) => (
            <button
              key={cand.id}
              onClick={() => setActiveCandId(cand.id)}
              className={`p-3 text-left rounded-lg border transition-colors ${
                activeCandId === cand.id
                  ? 'border-amber-600 bg-amber-50/40'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-bold text-slate-900">{cand.name}</div>
              <div className="text-[11px] text-slate-500 truncate">{cand.title}</div>
              <div className="text-[10px] text-amber-800 font-semibold mt-1">{cand.stage}</div>
            </button>
          ))}
        </div>

        {/* Candidate Scorecard */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">{activeCand.name} · Scorecard</span>
            <span className="text-slate-500">{activeCand.experience}</span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>Executive Pedagogy & Teaching Clarity:</span>
                <span className="font-bold tabular-nums">{activeCand.scorecard.pedagogy}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: `${activeCand.scorecard.pedagogy}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>Operational Delegation Frameworks:</span>
                <span className="font-bold tabular-nums">{activeCand.scorecard.delegationSystems}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: `${activeCand.scorecard.delegationSystems}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>Live Group Cohort Facilitation:</span>
                <span className="font-bold tabular-nums">{activeCand.scorecard.facilitation}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: `${activeCand.scorecard.facilitation}%` }} />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">Status: {activeCand.status}</span>
            <button
              onClick={() => alert(`Simulated interview follow-up scheduled with ${activeCand.name}.`)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Schedule 30-Min Founder Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
