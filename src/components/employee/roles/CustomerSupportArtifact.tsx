import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { MessageSquare, Lock, Unlock, CheckCircle2, AlertCircle, HelpCircle, Send } from 'lucide-react';

interface SupportTicket {
  id: string;
  customerName: string;
  email: string;
  inquiry: string;
  status: 'Open' | 'Resolved' | 'Escalated';
  suggestedAnswer: string;
  groundedSource: string;
  confidenceScore: number;
  orderContext: string;
}

export const CustomerSupportArtifact: React.FC = () => {
  const { activeWorkspace, conversations, toggleTakeover } = useOoumph();

  const isTakeoverActive = conversations['emp-a11']?.takeover || false;

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'tick-101',
      customerName: 'Marcus Brody',
      email: 'marcus@brodylogistics.com',
      inquiry: 'Can I transfer my fellowship enrollment to the Q1 cohort if our quarterly board meeting conflicts with week 4?',
      status: 'Open',
      suggestedAnswer: 'Yes, Marcus! Under our cohort transfer policy, enrolled fellows can request one seamless cohort deferral to the subsequent quarter up to 7 calendar days before session kickoff. I can process this transfer for you right away.',
      groundedSource: 'My Business Knowledge -> FAQ #3 (Refund & Deferral Policy)',
      confidenceScore: 98,
      orderContext: 'Enrolled in Fall 2026 Executive Fellowship ($3,400)'
    },
    {
      id: 'tick-102',
      customerName: 'Elena Smith',
      email: 'elena.smith@biohealth.org',
      inquiry: 'Does our digital completion certificate carry university accreditation for continuing education credits?',
      status: 'Open',
      suggestedAnswer: 'Cedar & Co credentials are industry-recognized professional leadership certificates verified digitally via Accredible. While we do not issue university-accredited continuing education units (CEU), over 2,400 corporate fellows have submitted our syllabus for internal professional development reimbursement.',
      groundedSource: 'My Business Knowledge -> Operational Lesson #1 (Accreditation Policy)',
      confidenceScore: 95,
      orderContext: 'Corporate Participant · BioHealth Dynamics'
    }
  ]);

  const [activeTicketId, setActiveTicketId] = useState('tick-101');
  const [replyText, setReplyText] = useState(tickets[0].suggestedAnswer);
  const [sentTickets, setSentTickets] = useState<string[]>([]);

  const activeTicket = tickets.find((t) => t.id === activeTicketId) || tickets[0];

  const handleSelectTicket = (t: SupportTicket) => {
    setActiveTicketId(t.id);
    setReplyText(t.suggestedAnswer);
  };

  const handleSendReply = () => {
    setSentTickets((prev) => [...prev, activeTicket.id]);
    setTickets((prev) =>
      prev.map((t) => (t.id === activeTicket.id ? { ...t, status: 'Resolved' } : t))
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Shared Customer Support Queue</h3>
            <p className="text-xs text-slate-500">Grounded in {activeWorkspace.name} Approved Knowledge</p>
          </div>
          <button
            onClick={() => toggleTakeover('emp-a11')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
              isTakeoverActive
                ? 'border-rose-300 bg-rose-50 text-rose-800'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isTakeoverActive ? <Lock className="h-3.5 w-3.5 text-rose-600" /> : <Unlock className="h-3.5 w-3.5 text-slate-500" />}
            <span>{isTakeoverActive ? 'Operator Takeover Active' : 'Take Over Conversation'}</span>
          </button>
        </div>

        {/* Ticket Selector */}
        <div className="grid grid-cols-2 gap-2 my-4">
          {tickets.map((t) => {
            const isResolved = sentTickets.includes(t.id) || t.status === 'Resolved';
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTicket(t)}
                className={`p-3 text-left rounded-lg border transition-colors ${
                  activeTicketId === t.id
                    ? 'border-emerald-600 bg-emerald-50/40'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">{t.customerName}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isResolved ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isResolved ? 'RESOLVED' : 'OPEN'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-1">{t.inquiry}</div>
              </button>
            );
          })}
        </div>

        {/* Active Ticket Details & Account Context */}
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-3">
          <div className="flex items-start justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">{activeTicket.customerName} ({activeTicket.email})</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Account Context: {activeTicket.orderContext}</div>
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Confidence: {activeTicket.confidenceScore}%</span>
          </div>

          <div className="rounded border border-slate-200 bg-white p-3 text-xs text-slate-800 leading-relaxed">
            <strong className="text-slate-900 block mb-1">Customer Inquiry:</strong>
            "{activeTicket.inquiry}"
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
            <span>Grounded Source: <strong>{activeTicket.groundedSource}</strong></span>
          </div>

          {/* Draft Reply Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              {isTakeoverActive ? 'Manual Operator Response:' : 'Clara\'s Proposed Grounded Reply:'}
            </label>
            <textarea
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full rounded-md border border-slate-200 p-2.5 text-xs text-slate-800 bg-white leading-relaxed focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">
              {sentTickets.includes(activeTicket.id) ? '✓ Reply delivered to customer' : 'Human review recommended'}
            </span>
            <button
              onClick={handleSendReply}
              disabled={sentTickets.includes(activeTicket.id)}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-800 transition-colors disabled:opacity-50"
            >
              <Send className="h-3 w-3" />
              {sentTickets.includes(activeTicket.id) ? 'Replied' : 'Approve & Send Answer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
