import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { TaskStatus } from '../../types';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  DollarSign,
  Share2
} from 'lucide-react';

export const MyWorkView: React.FC = () => {
  const {
    tasks,
    workTab,
    setWorkTab,
    selectEmployee,
    employees,
    flagshipCampaign,
    deals,
    leads,
    websitePage
  } = useOoumph();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header and Sub-tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">My Work</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified view of cross-employee tasks, calendar schedules, campaigns, and commercial outcomes.
          </p>
        </div>

        {/* Sub-tab segment switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          {[
            { id: 'tasks', label: 'Tasks' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'campaigns', label: 'Campaigns' },
            { id: 'assets', label: 'Assets & Drafts' },
            { id: 'results', label: 'Results' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setWorkTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                workTab === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB 1: TASKS */}
      {workTab === 'tasks' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks by title, role..."
                className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-800 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="needs_review">Needs Review</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>

          {/* Task Cards */}
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No tasks match current filters.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => selectEmployee(task.employeeId)}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900">{task.title}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          task.status === 'needs_review'
                            ? 'bg-amber-100 text-amber-800'
                            : task.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{task.description}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>Owner: <strong className="text-slate-700">{task.employeeName}</strong> ({task.employeeCode})</span>
                      <span>·</span>
                      <span>Category: {task.category}</span>
                      <span>·</span>
                      <span className="tabular-nums">v{task.version}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <span>Inspect</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CALENDAR */}
      {workTab === 'calendar' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Unified Executive & Social Schedule</h2>
            <span className="text-xs text-slate-500">Timezone: America/Los_Angeles (PST)</span>
          </div>

          <div className="space-y-3">
            {[
              {
                time: 'Today · 10:00 AM PST',
                title: 'Discovery Strategy Call with David Kalu (Vanguard Retail)',
                type: 'Meeting',
                owner: 'Aria Vance (A01)',
                tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
              },
              {
                time: 'Tomorrow · 09:15 AM PST',
                title: 'LinkedIn Thought Leadership: "Founder Delegation Framework"',
                type: 'Social Post',
                owner: 'Soren Miller (A02)',
                tagColor: 'bg-sky-50 text-sky-700 border-sky-200'
              },
              {
                time: 'Thursday · 02:00 PM PST',
                title: 'Executive Fellowship Cohort Kickoff Session (24 Fellows)',
                type: 'Live Session',
                owner: 'Sloane Kelly (A30)',
                tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }
            ].map((ev, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-slate-900">{ev.title}</div>
                  <div className="text-[11px] text-slate-500">{ev.time} · Coordinated by {ev.owner}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${ev.tagColor}`}>
                  {ev.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CAMPAIGNS */}
      {workTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{flagshipCampaign.title}</h3>
                <p className="text-xs text-slate-500">Flagship Lead Engine · Platform: {flagshipCampaign.platform}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Active Loop
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 my-4">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Comments Scanned</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.scannedComments}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">PDFs Sent</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.resourcesDelivered}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Opt-in Leads</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.optedInLeads}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Booked Meetings</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{flagshipCampaign.stats.meetingsBooked}</div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  const emp = employees.find((e) => e.code === 'A23');
                  if (emp) selectEmployee(emp.id);
                }}
                className="text-xs font-semibold text-teal-800 hover:underline flex items-center gap-1"
              >
                Inspect Astrid Lind's Campaign Workspace →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ASSETS & DRAFTS */}
      {workTab === 'assets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Executive PDF Resource</h3>
            <p className="text-xs text-slate-500 mb-3">{flagshipCampaign.resourceTitle}</p>
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
              Genuine 24-page PDF document format covering delegation rhythms and inbound lead systems.
            </div>
            <button
              onClick={() => {
                const emp = employees.find((e) => e.code === 'A23');
                if (emp) selectEmployee(emp.id);
              }}
              className="text-xs font-semibold text-indigo-700 hover:underline"
            >
              Open in Astrid's Workspace →
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Landing Page Content</h3>
            <p className="text-xs text-slate-500 mb-3">Slug: {websitePage.slug} (v{websitePage.versionHistory.length})</p>
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
              Headline: "{websitePage.heroHeadline}"
            </div>
            <button
              onClick={() => {
                const emp = employees.find((e) => e.code === 'A07');
                if (emp) selectEmployee(emp.id);
              }}
              className="text-xs font-semibold text-cyan-700 hover:underline"
            >
              Open in Walter's Workspace →
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: RESULTS */}
      {workTab === 'results' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="text-xs text-slate-500">Total Enriched Leads</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{leads.length}</div>
              <div className="text-xs text-emerald-600 mt-1">Cross-channel CRM</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="text-xs text-slate-500">Active Deals Pipeline</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                ${deals.reduce((acc, d) => acc + d.value, 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-1">{deals.length} Opportunities</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="text-xs text-slate-500">Meetings Booked</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {leads.filter((l) => l.status === 'meeting_booked').length}
              </div>
              <div className="text-xs text-indigo-600 mt-1">Direct conversions</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
