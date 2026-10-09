import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { Download, TrendingUp, BarChart3, ArrowUpRight, DollarSign } from 'lucide-react';

export const AnalystArtifact: React.FC = () => {
  const { leads, deals, flagshipCampaign, activeWorkspace } = useOoumph();

  const [attributionModel, setAttributionModel] = useState<'first_touch' | 'last_touch' | 'multi_touch'>('multi_touch');

  const channelMetrics = [
    {
      channel: 'Flagship Comment Guide',
      leads: flagshipCampaign.stats.optedInLeads,
      spend: '$320.00',
      cpl: '$16.84',
      qualified: flagshipCampaign.stats.meetingsBooked,
      revenue: '$13,600.00',
      roi: '42.5x'
    },
    {
      channel: 'Targeted Outbound Sequence',
      leads: leads.filter((l) => l.source === 'Outbound Research').length,
      spend: '$180.00',
      cpl: '$36.00',
      qualified: 2,
      revenue: '$14,500.00',
      roi: '80.5x'
    },
    {
      channel: 'Inbound Website Form',
      leads: leads.filter((l) => l.source === 'Inbound Contact Form').length,
      spend: '$0.00',
      cpl: '$0.00',
      qualified: 1,
      revenue: '$6,800.00',
      roi: 'Organic'
    },
    {
      channel: 'CSV Imported Lists',
      leads: leads.filter((l) => l.source === 'CSV Import').length,
      spend: '$45.00',
      cpl: '$45.00',
      qualified: 0,
      revenue: '$0.00',
      roi: 'Pending'
    }
  ];

  const handleDownloadCSV = () => {
    const headers = ['Channel', 'Leads Generated', 'Simulated Spend', 'Cost Per Lead', 'Qualified Deals', 'Simulated Revenue', 'ROI Multiple'];
    const rows = channelMetrics.map((c) => [
      `"${c.channel}"`,
      c.leads,
      `"${c.spend}"`,
      `"${c.cpl}"`,
      c.qualified,
      `"${c.revenue}"`,
      `"${c.roi}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attribution_performance_${activeWorkspace.id}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Multi-Touch Attribution & Funnel Analytics</h3>
            <p className="text-xs text-slate-500">Cross-channel ROI modeling for {activeWorkspace.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={attributionModel}
              onChange={(e) => setAttributionModel(e.target.value as any)}
              className="rounded-lg border border-slate-200 text-xs px-2 py-1 bg-white"
            >
              <option value="multi_touch">Multi-Touch Weighted</option>
              <option value="first_touch">First Touch Acquisition</option>
              <option value="last_touch">Last Touch Conversion</option>
            </select>
          </div>
        </div>

        {/* High-Level Overview Strip */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
            <div className="text-xs text-slate-500">Pipeline Total Value</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              ${deals.reduce((a, b) => a + b.value, 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-600 mt-0.5">3 Active deals</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
            <div className="text-xs text-slate-500">Total Enriched Leads</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">{leads.length} Leads</div>
            <div className="text-[11px] text-indigo-600 mt-0.5">Across all channels</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
            <div className="text-xs text-slate-500">Average CPA</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">$24.30</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Sub-industry benchmark</div>
          </div>
        </div>

        {/* Attribution Data Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Channel</th>
                <th className="py-2.5 px-3 font-semibold text-right">Leads</th>
                <th className="py-2.5 px-3 font-semibold text-right">Spend</th>
                <th className="py-2.5 px-3 font-semibold text-right">CPL</th>
                <th className="py-2.5 px-3 font-semibold text-right">Qualified</th>
                <th className="py-2.5 px-3 font-semibold text-right">Revenue</th>
                <th className="py-2.5 px-3 font-semibold text-right">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {channelMetrics.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{m.channel}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-slate-700">{m.leads}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-slate-700">{m.spend}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-slate-700">{m.cpl}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-slate-700">{m.qualified}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-semibold text-slate-900">{m.revenue}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-emerald-700 font-bold">{m.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CSV Export Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Attribution Model: Multi-touch weighted 40/40/20 (First touch, conversion, close).
          </span>
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Metrics to CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
