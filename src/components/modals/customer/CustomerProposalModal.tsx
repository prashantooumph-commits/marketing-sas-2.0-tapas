import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { X, CheckCircle2, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface CustomerProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerProposalModal: React.FC<CustomerProposalModalProps> = ({ isOpen, onClose }) => {
  const { mockClientDecisionOnDeal, activeWorkspace } = useOoumph();

  const [signedName, setSignedName] = useState('Dr. Marcus Morrison');
  const [signedTitle, setSignedTitle] = useState('Chief Scientific Officer, Horizon Labs');
  const [signedSuccess, setSignedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    mockClientDecisionOnDeal('deal-3', 'accept');
    setSignedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              Customer-Facing Experience Preview
            </span>
            <h2 className="text-base font-semibold text-slate-900 mt-1">
              Commercial Proposal: Horizon Labs Executive Leadership Program
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {signedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Agreement Digitally Executed!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Signed by <strong>{signedName}</strong> ({signedTitle}). Deal moved to <strong>Closed Won</strong>.
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-950 max-w-md mx-auto">
              Automated handoff triggered: Sloane Kelly (A30) has initialized the client onboarding milestone checklist and sent invoice instructions.
            </div>
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
            >
              Close Proposal Preview
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Scope of Agreement */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-900">Program Scope & Deliverables</span>
                <span className="text-slate-500 font-mono">Agreement Ref: #CEDAR-2026-HL</span>
              </div>

              <div className="space-y-2 text-slate-700 leading-relaxed">
                <p>
                  <strong>1. Corporate Cohort Access:</strong> Eight (8) executive seats in the Winter 2026 Executive Fellowship with dedicated faculty coaching.
                </p>
                <p>
                  <strong>2. Customized Team Modules:</strong> Two (2) private tactical strategy breakout sessions tailored to Horizon Labs' operational challenges.
                </p>
                <p>
                  <strong>3. Agentic Operating Infrastructure:</strong> Setup of dedicated AI Employee teammates and verified knowledge base integration.
                </p>
              </div>

              {/* Fee Table */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>Total Commercial Contract Value:</span>
                  <span className="text-sm font-bold tabular-nums">$18,500.00 USD</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Payment Terms: Net 30 corporate invoice. Approved by Linda Cross (Legal, A06).
                </div>
              </div>
            </div>

            {/* Simulated Digital Signature Form */}
            <form onSubmit={handleSign} className="rounded-xl border border-slate-200 p-4 space-y-3">
              <div className="text-xs font-bold text-slate-900">
                Authorized Signatory Acceptance:
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Signatory Name</label>
                  <input
                    type="text"
                    required
                    value={signedName}
                    onChange={(e) => setSignedName(e.target.value)}
                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Title & Organization</label>
                  <input
                    type="text"
                    required
                    value={signedTitle}
                    onChange={(e) => setSignedTitle(e.target.value)}
                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  By clicking accept, you execute a legally binding commercial agreement.
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-800 transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Execute Digital Signature</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
