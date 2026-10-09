import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { Users, Link2, DollarSign, CheckCircle2, ShieldCheck, AlertOctagon, RotateCcw } from 'lucide-react';

interface RevOpsAndPartnershipProps {
  mode: 'partnership' | 'revops';
}

export const RevOpsAndPartnershipArtifact: React.FC<RevOpsAndPartnershipProps> = ({ mode }) => {
  const { activeWorkspace, leads } = useOoumph();

  // A28 Partnership State
  const [partnerName, setPartnerName] = useState('Pacific Leadership Association');
  const [affiliateLink, setAffiliateLink] = useState(`https://${activeWorkspace.domain}/partner/pacific-leads?ref=PLA2026`);
  const [referrals, setReferrals] = useState([
    { lead: 'Gregory Hayes', company: 'Cascade Industrial', value: '$3,400', commission: '$510.00', status: 'Pending Review' }
  ]);
  const [isCommissionApproved, setIsCommissionApproved] = useState(false);

  // A29 RevOps State
  const [senderHealthScore, setSenderHealthScore] = useState(98);
  const [outboundSafetyPaused, setOutboundSafetyPaused] = useState(false);
  const [mergePreviewOpen, setMergePreviewOpen] = useState(false);
  const [mergedSuccess, setMergedSuccess] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* A28 PARTNERSHIPS & REFERRALS (PAIGE WINTERS) */}
      {mode === 'partnership' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Affiliate Partnerships & Tracked Referrals</h3>
              <p className="text-xs text-slate-500">Paige Winters · Partner Terms & Commission Tracking</p>
            </div>
            <span className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded">
              Active Partner Brief
            </span>
          </div>

          {/* Partner Link Generator */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 my-4 space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Partner Organization:</label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="w-full rounded border border-slate-200 p-2 text-xs bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Unique Tracked Referral Link:</label>
              <div className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-white">
                <Link2 className="h-4 w-4 text-violet-600 shrink-0" />
                <code className="text-xs text-slate-800 font-mono flex-1 truncate">{affiliateLink}</code>
              </div>
            </div>

            <div className="text-[11px] text-slate-500">
              Commercial Terms: 15% revenue share on verified completed enrollments. No fabricated payouts.
            </div>
          </div>

          {/* Pending Referral Conversions Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-900">Verified Partner Referrals:</div>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="p-2.5 font-semibold">Referred Executive</th>
                    <th className="p-2.5 font-semibold">Company</th>
                    <th className="p-2.5 font-semibold text-right">Value</th>
                    <th className="p-2.5 font-semibold text-right">Commission (15%)</th>
                    <th className="p-2.5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {referrals.map((ref, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium text-slate-900">{ref.lead}</td>
                      <td className="p-2.5 text-slate-600">{ref.company}</td>
                      <td className="p-2.5 text-right tabular-nums text-slate-700">{ref.value}</td>
                      <td className="p-2.5 text-right tabular-nums font-bold text-violet-700">{ref.commission}</td>
                      <td className="p-2.5 text-right">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${isCommissionApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {isCommissionApproved ? 'APPROVED' : ref.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Payout threshold: $500.00 reached</span>
            <button
              onClick={() => setIsCommissionApproved(true)}
              disabled={isCommissionApproved}
              className="flex items-center gap-1.5 rounded-lg bg-violet-700 px-4 py-1.5 text-xs font-medium text-white hover:bg-violet-800 disabled:opacity-50"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isCommissionApproved ? 'Commission Approved' : 'Authorize Referral Payout'}</span>
            </button>
          </div>
        </div>
      )}

      {/* A29 REVENUE OPERATIONS (RORY GALLAGHER) */}
      {mode === 'revops' && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Revenue Operations & Data Integrity</h3>
              <p className="text-xs text-slate-500">Rory Gallagher · Deduplication, Domain Health & Sync</p>
            </div>
            <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
              RevOps Guard
            </span>
          </div>

          {/* Sender Health Strip */}
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="rounded-lg bg-emerald-50/50 p-3 border border-emerald-100 text-xs">
              <span className="text-slate-500">Sender Domain Score</span>
              <div className="text-lg font-bold text-emerald-800 tabular-nums">{senderHealthScore}/100</div>
              <div className="text-[10px] text-emerald-600 mt-0.5">SPF & DKIM Validated</div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 text-xs">
              <span className="text-slate-500">Bounce Rate</span>
              <div className="text-lg font-bold text-slate-800 tabular-nums">0.4%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Under 2% safety cap</div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 text-xs">
              <span className="text-slate-500">Duplicate Conflicts</span>
              <div className="text-lg font-bold text-slate-800 tabular-nums">1 Detected</div>
              <div className="text-[10px] text-amber-600 mt-0.5">Safe merge available</div>
            </div>
          </div>

          {/* Reversible Deduplication Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Duplicate Contact Reconciliation:</span>
              <span className="text-amber-700 font-semibold text-[11px]">Matching Email Detected</span>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-1.5">
              <div className="text-slate-800">
                <strong>Record A:</strong> Sarah Jenkins (VP Operations, Apex Media Group · Source: Outbound)
              </div>
              <div className="text-slate-800">
                <strong>Record B:</strong> Sarah Jenkins (Director, Apex Media · Source: CSV Import)
              </div>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                Reconciliation rule: Retains verified email and consolidates touchpoint history without destructive data loss.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setOutboundSafetyPaused(!outboundSafetyPaused)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                  outboundSafetyPaused
                    ? 'border-rose-300 bg-rose-50 text-rose-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <AlertOctagon className="h-3.5 w-3.5" />
                <span>{outboundSafetyPaused ? 'Emergency Pause Active' : 'Trigger Safety Outbound Pause'}</span>
              </button>

              <button
                onClick={() => setMergedSuccess(true)}
                disabled={mergedSuccess}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{mergedSuccess ? 'Safely Merged' : 'Execute Reversible Merge'}</span>
              </button>
            </div>

            {mergedSuccess && (
              <div className="rounded bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Merged into primary ID. Previous revision preserved in historical snapshot.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
