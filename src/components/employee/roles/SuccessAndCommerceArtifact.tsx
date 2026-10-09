import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { ShoppingBag, CheckCircle2, ShieldCheck, Heart, UserCheck, ArrowRight, DollarSign, Send } from 'lucide-react';

interface SuccessAndCommerceProps {
  mode: 'success' | 'commerce';
}

export const SuccessAndCommerceArtifact: React.FC<SuccessAndCommerceProps> = ({ mode }) => {
  const { activeWorkspace } = useOoumph();

  // A30 Customer Success State
  const [onboardingMilestones, setOnboardingMilestones] = useState([
    { title: 'Kickoff Call & AI Team Configuration', completed: true },
    { title: 'Executive Calendar Audit Submission', completed: true },
    { title: 'Module 1 Live Tactical Sprint Attendance', completed: true },
    { title: 'Peer Breakout Group Assignment', completed: false },
    { title: 'Quarterly Executive Review & Renewal', completed: false }
  ]);

  // A32 Commerce Assistant State
  const [catalogItems, setCatalogItems] = useState([
    { id: 'item-1', name: 'Executive Fellowship (Single Seat)', price: 3400, seatsLeft: 4, cohort: 'Fall 2026' },
    { id: 'item-2', name: 'Corporate Manager Cohort (6-Seat Package)', price: 14500, seatsLeft: 2, cohort: 'Fall 2026' },
    { id: 'item-3', name: 'Executive Operations Systems Pass', price: 950, seatsLeft: 18, cohort: 'Self-Paced' }
  ]);

  const [abandonedCartSent, setAbandonedCartSent] = useState(false);

  const toggleMilestone = (idx: number) => {
    setOnboardingMilestones((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, completed: !m.completed } : m))
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* A30 CUSTOMER SUCCESS (SLOANE KELLY) */}
      {mode === 'success' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Client Onboarding & Retention Milestones</h3>
              <p className="text-xs text-slate-500">Sloane Kelly · Cohort Fellow Health Tracking</p>
            </div>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              Account Health: 94% (Green)
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 my-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Apex Media Group (Corporate Cohort · 6 Fellows):</span>
              <span className="text-emerald-700 font-semibold">Active · Week 2</span>
            </div>

            <div className="space-y-2 pt-1">
              {onboardingMilestones.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleMilestone(idx)}
                  className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={m.completed}
                    onChange={() => {}}
                    className="rounded border-slate-300 text-teal-600 pointer-events-none"
                  />
                  <span className={`text-xs ${m.completed ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                    {m.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Upcoming Milestone: Q4 Corporate Seat Expansion</span>
            <button
              onClick={() => alert('Renewal proposal generated and queued for Preston Shaw (A31).')}
              className="flex items-center gap-1.5 rounded-lg bg-teal-800 px-4 py-1.5 text-xs font-medium text-white hover:bg-teal-900"
            >
              <span>Prepare Expansion Proposal</span>
            </button>
          </div>
        </div>
      )}

      {/* A32 COMMERCE ASSISTANT (CALEB RIVERS) */}
      {mode === 'commerce' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Course Catalog & Cart Recovery</h3>
              <p className="text-xs text-slate-500">Caleb Rivers · Inventory & Checkout Inquiries</p>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              Commerce Live
            </span>
          </div>

          {/* Catalog Table */}
          <div className="space-y-2 my-4">
            <div className="text-xs font-bold text-slate-900">Current Program Catalog & Seat Availability:</div>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="p-2.5 font-semibold">Offering Name</th>
                    <th className="p-2.5 font-semibold">Cohort</th>
                    <th className="p-2.5 font-semibold text-right">Price</th>
                    <th className="p-2.5 font-semibold text-right">Seats Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {catalogItems.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2.5 font-medium text-slate-900">{item.name}</td>
                      <td className="p-2.5 text-slate-600">{item.cohort}</td>
                      <td className="p-2.5 text-right tabular-nums font-semibold text-slate-900">
                        ${item.price.toLocaleString()}
                      </td>
                      <td className="p-2.5 text-right tabular-nums text-slate-700 font-medium">
                        {item.seatsLeft} seats left
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Abandoned Cart Recovery Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Abandoned Cart Triage:</span>
              <span className="text-amber-700 text-[11px]">1 Abandoned Checkout Yesterday</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Visitor <strong>Dr. Jonathan Vance</strong> reached payment step for Executive Fellowship ($3,400) but didn't complete. Caleb prepared a recovery note with FAQs regarding company expense approval.
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <span className="text-[11px] text-slate-400">
                {abandonedCartSent ? '✓ Recovery email delivered with syllabus brief' : 'Simulate personalized follow-up'}
              </span>
              <button
                onClick={() => setAbandonedCartSent(true)}
                disabled={abandonedCartSent}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50"
              >
                <Send className="h-3 w-3" />
                <span>{abandonedCartSent ? 'Sent' : 'Dispatch Cart Recovery'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
