import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Plus,
  HelpCircle,
  FileText,
  ShieldCheck,
  Building,
  Sparkles
} from 'lucide-react';

export const MyBusinessView: React.FC = () => {
  const { activeWorkspace, toggleLesson, addLesson } = useOoumph();

  const [newTrigger, setNewTrigger] = useState('');
  const [newLesson, setNewLesson] = useState('');
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  const handleAddLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrigger.trim() || !newLesson.trim()) return;
    addLesson(newTrigger, newLesson);
    setNewTrigger('');
    setNewLesson('');
    setIsAddingLesson(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">My Business Knowledge</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Central shared memory, brand guidelines, approved claims, FAQs, and reversible operational lessons.
        </p>
      </div>

      {/* 1. Company Profile & Core Context */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-slate-700" />
            <h2 className="text-sm font-bold text-slate-900">Company Profile & Positioning</h2>
          </div>
          <span className="text-xs font-medium text-slate-500 tabular-nums">Domain: {activeWorkspace.domain}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-semibold text-slate-900">Industry & Practice:</div>
            <p className="text-slate-600 mt-0.5">{activeWorkspace.industry}</p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Target Audience:</div>
            <p className="text-slate-600 mt-0.5">{activeWorkspace.audience}</p>
          </div>
          <div className="md:col-span-2">
            <div className="font-semibold text-slate-900">Company Mission:</div>
            <p className="text-slate-600 mt-0.5">{activeWorkspace.mission}</p>
          </div>
        </div>
      </div>

      {/* 2. Brand Voice & Tone */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Brand Voice & Calibration</h2>
        <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 text-xs text-slate-700 leading-relaxed italic">
          "{activeWorkspace.brandTone}"
        </div>
        <p className="text-[11px] text-slate-500">
          All 32 AI employee personas reference this calibration when generating copy, emails, and phone responses.
        </p>
      </div>

      {/* 3. Approved Claims & Value Propositions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Approved Commercial Claims</h2>
          <span className="text-xs text-slate-500">Verified factual assertions</span>
        </div>

        <div className="space-y-2">
          {activeWorkspace.approvedClaims.map((claim, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{claim}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Conflicting Facts Resolver */}
      {activeWorkspace.conflictingFacts.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
            <h2 className="text-sm font-bold text-amber-950">Knowledge Hygiene & Conflicting Facts</h2>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            When imported materials contain contradictory information, Ooumph flags the discrepancy for resolution rather than letting AI employees guess.
          </p>

          <div className="space-y-2 mt-2">
            {activeWorkspace.conflictingFacts.map((cf) => (
              <div key={cf.id} className="rounded-lg border border-amber-200 bg-white p-3 text-xs space-y-1">
                <div className="text-slate-600">Claim A: {cf.claimA}</div>
                <div className="text-slate-600">Claim B: {cf.claimB}</div>
                {cf.resolved && (
                  <div className="text-emerald-700 font-semibold pt-1 border-t border-slate-100">
                    Resolution: {cf.resolution}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Reversible Lessons Learned Engine */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Reversible Operational Lessons</h2>
            <p className="text-xs text-slate-500">
              Learned guidelines derived from founder feedback. Can be toggled on/off or rolled back at any time.
            </p>
          </div>

          <button
            onClick={() => setIsAddingLesson(!isAddingLesson)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Rule</span>
          </button>
        </div>

        {/* Add Lesson Form */}
        {isAddingLesson && (
          <form onSubmit={handleAddLessonSubmit} className="rounded-lg bg-slate-50 p-4 border border-slate-200 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Trigger Condition:</label>
              <input
                type="text"
                required
                value={newTrigger}
                onChange={(e) => setNewTrigger(e.target.value)}
                placeholder="e.g. When communicating with UK prospects..."
                className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Instruction / Rule:</label>
              <input
                type="text"
                required
                value={newLesson}
                onChange={(e) => setNewLesson(e.target.value)}
                placeholder="e.g. Always state prices in GBP (£) and quote VAT separately."
                className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingLesson(false)}
                className="px-3 py-1 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-800"
              >
                Save Operational Rule
              </button>
            </div>
          </form>
        )}

        {/* Lessons List with 1-click Toggle/Rollback */}
        <div className="space-y-3">
          {activeWorkspace.lessons.map((lsn) => (
            <div
              key={lsn.id}
              className={`p-3.5 rounded-lg border transition-colors flex items-center justify-between ${
                lsn.active ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50 opacity-60'
              }`}
            >
              <div>
                <div className="text-xs font-semibold text-slate-900">Trigger: "{lsn.trigger}"</div>
                <div className="text-xs text-slate-600 mt-0.5">Rule: {lsn.lesson}</div>
                <div className="text-[10px] text-slate-400 mt-1 tabular-nums">
                  Recorded {new Date(lsn.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLesson(lsn.id)}
                  className={`text-xs font-medium px-2.5 py-1 rounded border transition-colors ${
                    lsn.active
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {lsn.active ? 'Active Rule' : 'Disabled (Rolled Back)'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Verified FAQs */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Verified FAQs for Inbound & Support</h2>
        <div className="space-y-3">
          {activeWorkspace.faqs.map((faq) => (
            <div key={faq.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1">
              <div className="text-xs font-semibold text-slate-900">Q: {faq.question}</div>
              <p className="text-xs text-slate-600 leading-relaxed">A: {faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
