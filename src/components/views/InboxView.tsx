import React from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  ShieldAlert,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const InboxView: React.FC = () => {
  const {
    inboxTab,
    setInboxTab,
    approvals,
    approveRequest,
    rejectRequest,
    selectEmployee,
    employees,
    conversations
  } = useOoumph();

  const pendingApprovals = approvals.filter((a) => a.status === 'pending');
  const pastApprovals = approvals.filter((a) => a.status !== 'pending');

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header and Sub-tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Inbox</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized hub for decision approvals, employee questions, and customer conversations.
          </p>
        </div>

        {/* Sub-tab segment switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          {[
            { id: 'approvals', label: `Review Requests (${pendingApprovals.length})` },
            { id: 'questions', label: 'Employee Questions' },
            { id: 'conversations', label: 'Customer Threads' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setInboxTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                inboxTab === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB 1: REVIEW REQUESTS (APPROVALS) */}
      {inboxTab === 'approvals' && (
        <div className="space-y-6">
          {pendingApprovals.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500 mb-2" />
              <div className="text-sm font-semibold text-slate-900">You are all caught up!</div>
              <p className="text-xs text-slate-500 mt-1">No pending review requests require your authorization right now.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action Required ({pendingApprovals.length} Pending)
              </div>

              {pendingApprovals.map((appr) => (
                <div
                  key={appr.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{appr.title}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            appr.riskLevel === 'High'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : appr.riskLevel === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {appr.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{appr.summary}</p>
                    </div>

                    <div className="text-right text-[11px] text-slate-400">
                      <div>Prepared by <strong>{appr.employeeName}</strong></div>
                      <div className="tabular-nums">{new Date(appr.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  {/* Explicit Payload Details */}
                  <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100 text-xs text-slate-800 space-y-1.5 font-mono">
                    {Object.entries(appr.artifactPayload).map(([k, v]: [string, any]) => (
                      <div key={k} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                        <span className="text-slate-500 font-sans font-medium capitalize min-w-[130px]">
                          {k.replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <span className="text-slate-900 font-sans font-semibold">
                          {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {appr.contextNote && (
                    <div className="text-[11px] text-slate-500 italic">
                      Note from {appr.employeeName}: {appr.contextNote}
                    </div>
                  )}

                  {/* Authorization Controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      onClick={() => selectEmployee(appr.employeeId)}
                      className="text-xs text-indigo-700 hover:underline font-medium"
                    >
                      Inspect in {appr.employeeName}'s Workspace →
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => rejectRequest(appr.id)}
                        className="rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Reject Proposed Action
                      </button>
                      <button
                        onClick={() => approveRequest(appr.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors shadow-2xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Authorize & Execute
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Decisions History */}
          {pastApprovals.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Decision History ({pastApprovals.length})
              </div>
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
                {pastApprovals.map((appr) => (
                  <div key={appr.id} className="p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{appr.title}</div>
                      <div className="text-slate-500 text-[11px]">Handled by {appr.employeeName}</div>
                    </div>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                        appr.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {appr.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: EMPLOYEE QUESTIONS */}
      {inboxTab === 'questions' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Internal Agentic Questions (1 Pending)
          </div>
          <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Linda Cross (A06) · Legal Assistant</span>
              <span className="text-slate-500">Today · 08:45 AM PST</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              "Horizon Labs asked to reduce the confidentiality term from 2 years to 1 year on the NDA. Does Cedar & Co permit 1-year NDA terms for enterprise training contracts?"
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  const emp = employees.find((e) => e.code === 'A06');
                  if (emp) selectEmployee(emp.id);
                }}
                className="text-xs font-semibold text-indigo-700 hover:underline"
              >
                Reply in Linda's Workspace →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CUSTOMER THREADS */}
      {inboxTab === 'conversations' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            External Inbound Conversations (2 Active)
          </div>
          <div className="space-y-3">
            {[
              {
                customer: 'David Kalu (Managing Director, Vanguard Retail)',
                channel: 'Flagship Comment Loop',
                lastMsg: 'Commented "GROW" and scheduled discovery call for Thursday.',
                owner: 'Astrid Lind (A23)'
              },
              {
                customer: 'Sarah Jenkins (VP People, Apex Media)',
                channel: 'Outbound Cold Email',
                lastMsg: 'Interested in group pricing for 6 managers. Awaiting proposal.',
                owner: 'Arthur Pendelton (A16)'
              }
            ].map((th, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{th.customer}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{th.lastMsg}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Channel: {th.channel} · Owner: {th.owner}</div>
                </div>
                <button
                  onClick={() => {
                    const emp = employees.find((e) => e.name.includes(th.owner.split(' ')[0]));
                    if (emp) selectEmployee(emp.id);
                  }}
                  className="text-xs font-semibold text-slate-900 hover:underline"
                >
                  View Thread →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
