import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { Deal, LeadProspect, ScheduledMeeting } from '../../types';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  Plus,
  Search,
  Filter,
  DollarSign,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building,
  UserCheck,
  Send,
  X
} from 'lucide-react';

export const SalesView: React.FC = () => {
  const {
    activeWorkspace,
    leads,
    deals,
    scheduledMeetings,
    conversations,
    employees,
    selectEmployee,
    navigate,
    createDeal,
    updateDealStage,
    simulateNewInboundLead,
    scheduleMeeting,
    cancelMeeting,
    triggerOutboundSequence,
    updateLeadStatus,
    setIsCustomerBookingOpen,
    setIsCustomerProposalOpen
  } = useOoumph();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'contacts' | 'conversations' | 'meetings'>('pipeline');
  const [pipelineViewMode, setPipelineViewMode] = useState<'kanban' | 'list'>('kanban');

  // Contact Filters
  const [contactSearch, setContactSearch] = useState('');
  const [contactStatusFilter, setContactStatusFilter] = useState<string>('all');

  // New Deal Modal State
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
  const [dealTitle, setDealTitle] = useState('');
  const [dealClient, setDealClient] = useState('');
  const [dealEmail, setDealEmail] = useState('');
  const [dealValue, setDealValue] = useState('8500');
  const [dealStage, setDealStage] = useState<Deal['stage']>('Discovery');
  const [dealOwner, setDealOwner] = useState('emp-a09');

  // New Meeting Modal State
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState(false);
  const [meetTitle, setMeetTitle] = useState('Executive Strategy Review');
  const [meetLeadName, setMeetLeadName] = useState('');
  const [meetLeadCompany, setMeetLeadCompany] = useState('');
  const [meetLeadEmail, setMeetLeadEmail] = useState('');
  const [meetDateTime, setMeetDateTime] = useState('Tomorrow, 10:00 AM PST');
  const [meetAgenda, setMeetAgenda] = useState('Diagnose operational bottlenecks and outline cohort fit.');
  const [meetHost, setMeetHost] = useState('emp-a17');

  // Active Sales Conversation Employee
  const [selectedSalesEmpId, setSelectedSalesEmpId] = useState<string>('emp-a17');

  // Workspace-scoped entities
  const wsLeads = leads.filter((l) => l.workspaceId === activeWorkspace.id);
  const wsDeals = deals.filter((d) => d.workspaceId === activeWorkspace.id);
  const wsMeetings = scheduledMeetings.filter((m) => m.workspaceId === activeWorkspace.id);

  // Metrics
  const totalPipelineValue = wsDeals.reduce((sum, d) => sum + (d.stage !== 'Closed Won' ? d.value : 0), 0);
  const totalWonValue = wsDeals.filter((d) => d.stage === 'Closed Won').reduce((sum, d) => sum + d.value, 0);

  // Filtered Contacts
  const filteredLeads = wsLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      lead.company.toLowerCase().includes(contactSearch.toLowerCase()) ||
      lead.email.toLowerCase().includes(contactSearch.toLowerCase());
    const matchesStatus = contactStatusFilter === 'all' || lead.status === contactStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const PIPELINE_STAGES: Deal['stage'][] = [
    'Discovery',
    'Proposal Sent',
    'Commercial Review',
    'Closed Won',
    'Onboarding'
  ];

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    createDeal({
      workspaceId: activeWorkspace.id,
      title: dealTitle,
      clientName: dealClient,
      contactEmail: dealEmail,
      value: parseFloat(dealValue) || 5000,
      stage: dealStage,
      ownerEmployeeId: dealOwner
    });
    setDealTitle('');
    setDealClient('');
    setDealEmail('');
    setIsNewDealModalOpen(false);
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const hostEmp = employees.find((e) => e.id === meetHost) || employees[0];
    scheduleMeeting({
      workspaceId: activeWorkspace.id,
      title: meetTitle,
      leadName: meetLeadName,
      leadCompany: meetLeadCompany,
      leadEmail: meetLeadEmail,
      hostEmployeeId: hostEmp.id,
      hostEmployeeName: hostEmp.name,
      hostEmployeeCode: hostEmp.code,
      dateTime: meetDateTime,
      durationMinutes: 20,
      meetingLink: `https://meet.${activeWorkspace.domain}/room-${Date.now().toString(36)}`,
      agenda: meetAgenda,
      status: 'scheduled'
    });
    setMeetLeadName('');
    setMeetLeadCompany('');
    setMeetLeadEmail('');
    setIsNewMeetingModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Sales Operations</h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {activeWorkspace.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Focused sales surface for inbound speed-to-lead, outbound sequences, deal pipeline, and calendar defense.
          </p>
        </div>

        {/* Quick Simulation Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => simulateNewInboundLead()}
            className="flex items-center gap-1.5 rounded-lg bg-teal-50 border border-teal-200 px-3 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-100 transition-colors shadow-2xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>+ Simulate Inbound Lead</span>
          </button>

          <button
            onClick={() => setIsNewDealModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Deal</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Pipeline</div>
          <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">{wsDeals.filter(d => d.stage !== 'Closed Won').length} active deals</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Closed Won Revenue</div>
          <div className="text-xl font-bold text-teal-700 mt-1 tabular-nums">
            ${totalWonValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-teal-600 mt-0.5">{wsDeals.filter(d => d.stage === 'Closed Won').length} won accounts</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Verified Contacts</div>
          <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
            {wsLeads.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {wsLeads.filter(l => l.status === 'meeting_booked').length} booked meetings
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Upcoming Reviews</div>
          <div className="text-xl font-bold text-indigo-700 mt-1 tabular-nums">
            {wsMeetings.filter(m => m.status === 'scheduled').length}
          </div>
          <div className="text-[11px] text-indigo-600 mt-0.5">Calendar protected</div>
        </div>
      </div>

      {/* Surface Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1">
          {[
            { id: 'pipeline', label: 'Pipeline & Deals', icon: TrendingUp, badge: wsDeals.length },
            { id: 'contacts', label: 'Contacts & Leads', icon: Users, badge: wsLeads.length },
            { id: 'conversations', label: 'Inbound & Outbound Dialogs', icon: MessageSquare },
            { id: 'meetings', label: 'Scheduled Meetings', icon: Calendar, badge: wsMeetings.filter(m => m.status === 'scheduled').length }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                {typeof tab.badge === 'number' && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeTab === 'pipeline' && (
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-xs">
            <button
              onClick={() => setPipelineViewMode('kanban')}
              className={`px-2.5 py-1 rounded transition-colors ${
                pipelineViewMode === 'kanban' ? 'bg-white font-semibold text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setPipelineViewMode('list')}
              className={`px-2.5 py-1 rounded transition-colors ${
                pipelineViewMode === 'list' ? 'bg-white font-semibold text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: PIPELINE & DEALS */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          {pipelineViewMode === 'kanban' ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4">
              {PIPELINE_STAGES.map((stage) => {
                const stageDeals = wsDeals.filter((d) => d.stage === stage);
                const stageSum = stageDeals.reduce((sum, d) => sum + d.value, 0);

                return (
                  <div key={stage} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 flex flex-col min-w-[220px]">
                    {/* Stage Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
                      <div>
                        <div className="font-semibold text-xs text-slate-900">{stage}</div>
                        <div className="text-[11px] text-slate-500 tabular-nums">
                          ${stageSum.toLocaleString()} · {stageDeals.length}
                        </div>
                      </div>
                      <span className="h-5 w-5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">
                        {stageDeals.length}
                      </span>
                    </div>

                    {/* Deal Cards */}
                    <div className="pt-3 space-y-2.5 flex-1">
                      {stageDeals.map((deal) => {
                        const owner = employees.find((e) => e.id === deal.ownerEmployeeId);
                        const nextStageIdx = PIPELINE_STAGES.indexOf(deal.stage) + 1;
                        const nextStage = nextStageIdx < PIPELINE_STAGES.length ? PIPELINE_STAGES[nextStageIdx] : null;

                        return (
                          <div
                            key={deal.id}
                            className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs space-y-2 hover:border-slate-300 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-semibold text-xs text-slate-900 leading-snug">{deal.title}</h4>
                              <span className="font-bold text-xs text-slate-900 whitespace-nowrap tabular-nums">
                                ${deal.value.toLocaleString()}
                              </span>
                            </div>

                            <div className="text-[11px] text-slate-500 flex items-center justify-between">
                              <span>{deal.clientName}</span>
                              {owner && (
                                <button
                                  onClick={() => selectEmployee(owner.id)}
                                  className="text-[10px] font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                                  title={`Assigned to ${owner.name}`}
                                >
                                  <span className={`h-3.5 w-3.5 rounded-full ${owner.avatarColor} text-white font-bold text-[8px] flex items-center justify-center`}>
                                    {owner.code}
                                  </span>
                                  <span>{owner.name.split(' ')[0]}</span>
                                </button>
                              )}
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                              {deal.stage === 'Commercial Review' || deal.stage === 'Proposal Sent' ? (
                                <button
                                  onClick={() => setIsCustomerProposalOpen(true)}
                                  className="text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  <span>Review Proposal</span>
                                </button>
                              ) : (
                                <span className="text-slate-400">Created {new Date(deal.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                              )}

                              {nextStage && (
                                <button
                                  onClick={() => updateDealStage(deal.id, nextStage)}
                                  className="text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-0.5 bg-slate-50 hover:bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200"
                                  title={`Advance to ${nextStage}`}
                                >
                                  <span>Move</span>
                                  <ChevronRight className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {stageDeals.length === 0 && (
                        <div className="text-center py-6 text-slate-400 text-xs italic">
                          No deals in this stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <tr>
                    <th className="py-3 px-4">Deal Title & Client</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Value</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Owner Specialist</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {wsDeals.map((deal) => {
                    const owner = employees.find((e) => e.id === deal.ownerEmployeeId);
                    return (
                      <tr key={deal.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{deal.title}</div>
                          <div className="text-slate-500 text-[11px]">{deal.clientName}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{deal.contactEmail}</td>
                        <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                          ${deal.value.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                            deal.stage === 'Closed Won'
                              ? 'bg-teal-50 text-teal-700 border border-teal-200'
                              : deal.stage === 'Proposal Sent' || deal.stage === 'Commercial Review'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {owner ? (
                            <button
                              onClick={() => selectEmployee(owner.id)}
                              className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900"
                            >
                              <span className={`h-4 w-4 rounded-full ${owner.avatarColor} text-white font-bold text-[9px] flex items-center justify-center`}>
                                {owner.code}
                              </span>
                              <span>{owner.name}</span>
                            </button>
                          ) : (
                            <span className="text-slate-400">Unassigned</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {deal.stage !== 'Closed Won' && (
                              <button
                                onClick={() => {
                                  const idx = PIPELINE_STAGES.indexOf(deal.stage);
                                  if (idx + 1 < PIPELINE_STAGES.length) {
                                    updateDealStage(deal.id, PIPELINE_STAGES[idx + 1]);
                                  }
                                }}
                                className="text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                              >
                                Advance
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CONTACTS & LEADS */}
      {activeTab === 'contacts' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search contacts by name, company, email..."
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <select
                value={contactStatusFilter}
                onChange={(e) => setContactStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="researched">Researched</option>
                <option value="contacted">Contacted</option>
                <option value="replied">Replied</option>
                <option value="meeting_booked">Meeting Booked</option>
                <option value="opted_out">Opted Out</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const eligible = wsLeads.filter(l => l.status === 'researched').map(l => l.id);
                  if (eligible.length > 0) {
                    triggerOutboundSequence(eligible);
                  }
                }}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
              >
                <Send className="h-3 w-3 text-slate-500" />
                <span>Launch Sequence to Researched ({wsLeads.filter(l => l.status === 'researched').length})</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="py-3 px-4">Contact & Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Fit Score</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Consents</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                      <div className="text-slate-500 text-[11px]">{lead.title} · {lead.email}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{lead.company}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold tabular-nums ${lead.fitScore >= 90 ? 'text-teal-700' : lead.fitScore >= 80 ? 'text-indigo-700' : 'text-slate-600'}`}>
                          {lead.fitScore}%
                        </span>
                        <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full ${lead.fitScore >= 90 ? 'bg-teal-500' : lead.fitScore >= 80 ? 'bg-indigo-500' : 'bg-slate-400'}`}
                            style={{ width: `${lead.fitScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                        lead.status === 'meeting_booked'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : lead.status === 'replied'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : lead.status === 'contacted'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : lead.status === 'opted_out'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${lead.consents.marketingEmail ? 'bg-teal-500' : 'bg-slate-300'}`} title="Marketing Email" />
                        <span className={`h-2 w-2 rounded-full ${lead.consents.whatsapp ? 'bg-teal-500' : 'bg-slate-300'}`} title="WhatsApp" />
                        <span className={`h-2 w-2 rounded-full ${lead.consents.callback ? 'bg-teal-500' : 'bg-slate-300'}`} title="Callback" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.status !== 'meeting_booked' && lead.status !== 'opted_out' && (
                          <button
                            onClick={() => {
                              setMeetLeadName(lead.name);
                              setMeetLeadCompany(lead.company);
                              setMeetLeadEmail(lead.email);
                              setIsNewMeetingModalOpen(true);
                            }}
                            className="text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                          >
                            Book Call
                          </button>
                        )}
                        {lead.status === 'meeting_booked' && (
                          <span className="text-[11px] font-medium text-teal-700">
                            {lead.meetingTime || 'Booked'}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: INBOUND & OUTBOUND CONVERSATIONS */}
      {activeTab === 'conversations' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sales Employee Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Sales Specialists</h3>
            <div className="space-y-1.5">
              {[
                { id: 'emp-a17', name: 'Jordan Bell', code: 'A17', role: 'Inbound Salesperson', desc: 'Instant form response & calendar scheduling' },
                { id: 'emp-a16', name: 'Arthur Pendelton', code: 'A16', role: 'Advanced Outbound Sales', desc: 'Personalized sequences & opt-out compliance' },
                { id: 'emp-a05', name: 'Rachel Ross', code: 'A05', role: 'Virtual Receptionist', desc: 'Inbound calls & voicemail triage' },
                { id: 'emp-a09', name: 'Marcus Ward', code: 'A09', role: 'Sales Manager', desc: 'Pipeline progression & deal negotiation' }
              ].map((emp) => {
                const isSelected = selectedSalesEmpId === emp.id;
                return (
                  <button
                    key={emp.id}
                    onClick={() => setSelectedSalesEmpId(emp.id)}
                    className={`w-full rounded-xl p-3 text-left border transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-xs">{emp.name} ({emp.code})</div>
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {emp.role}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conversation Stream & Active Dialog */}
          <div className="md:col-span-3 rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                {(() => {
                  const emp = employees.find(e => e.id === selectedSalesEmpId);
                  return (
                    <>
                      <span className={`h-8 w-8 rounded-lg ${emp?.avatarColor} text-white font-bold text-xs flex items-center justify-center`}>
                        {emp?.code}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{emp?.name} · {emp?.title}</h4>
                        <p className="text-[11px] text-slate-500">Live conversation log with active leads in {activeWorkspace.name}</p>
                      </div>
                    </>
                  );
                })()}
              </div>

              <button
                onClick={() => selectEmployee(selectedSalesEmpId)}
                className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
              >
                <span>Open Full Workspace</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="space-y-3 min-h-[300px]">
              {selectedSalesEmpId === 'emp-a17' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                      <span className="font-semibold text-slate-700">Inbound Contact Form · Sarah Jenkins (Apex Media)</span>
                      <span>Yesterday 14:20 PST</span>
                    </div>
                    <p className="text-slate-800">
                      "We are looking to train 6 senior directors in our Q4 management track. Does Cedar & Co offer corporate packages with invoice billing?"
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 space-y-1 ml-6">
                    <div className="flex items-center justify-between text-teal-800 text-[10px]">
                      <span className="font-semibold">Jordan Bell (A17) · Speed-to-lead response (48 seconds)</span>
                      <span>Yesterday 14:21 PST</span>
                    </div>
                    <p className="text-teal-950">
                      "Hi Sarah! Yes, we have dedicated cohort packages for groups of 4 or more with custom corporate invoicing. I can share our complete enterprise syllabus and fee table right now, or reserve a 20-minute strategy review for next Tuesday at 01:30 PM PST."
                    </p>
                  </div>
                </div>
              )}

              {selectedSalesEmpId === 'emp-a16' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                      <span className="font-semibold text-slate-700">Outbound Step 1 · Arthur Pendelton (A16)</span>
                      <span>Oct 08, 09:15 PST</span>
                    </div>
                    <p className="text-slate-800">
                      "Subject: Quick question regarding BioHealth Dynamics's manager training in Q4\n\nHi Elena, noticed your team expanded headcount by 25% this quarter. Most growing biohealth directors face delegation friction around this milestone. We built a 6-week tactical cohort specifically for scaling operators."
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[11px]">
                    Automatic suppression active: GDPR double opt-in wording included in footer. Sender reputation verified healthy.
                  </div>
                </div>
              )}

              {selectedSalesEmpId === 'emp-a05' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                      <span className="font-semibold text-slate-700">Inbound Virtual Receptionist · +1 (415) 890-1123</span>
                      <span>Today 10:15 AM PST</span>
                    </div>
                    <p className="text-slate-800 italic">
                      "Hi, calling from Vanguard Retail Systems regarding the Executive Revenue Guide. We received the PDF and want to speak with Marcus about the executive cohort seats."
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="rounded bg-teal-100 text-teal-800 px-2 py-0.5 text-[10px] font-semibold">
                        Transcribed & Tagged: High Intent
                      </span>
                      <span className="text-slate-500 text-[10px]">Transferred to Jordan Bell (A17)</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSalesEmpId === 'emp-a09' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                      <span className="font-semibold text-slate-700">Pipeline Progression · Marcus Ward (A09)</span>
                      <span>Today 08:30 AM PST</span>
                    </div>
                    <p className="text-slate-800">
                      "Reviewed Apex Media agreement. Pricing approved at $14,500. Legal Assistant Linda Cross (A06) reviewed NDA redlines and confirmed no liability exceptions. Deal moved to Commercial Review stage."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCHEDULED MEETINGS */}
      {activeTab === 'meetings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Protected Calendar Engagements</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Discovery strategy reviews, cohort scoping calls, and client kickoff meetings protected with 15-minute focus buffers.
              </p>
            </div>

            <button
              onClick={() => setIsNewMeetingModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Schedule Strategy Call</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wsMeetings.map((meet) => {
              const isCancelled = meet.status === 'rescheduled';
              return (
                <div
                  key={meet.id}
                  className={`rounded-xl border bg-white p-5 shadow-2xs space-y-3 ${
                    isCancelled ? 'opacity-60 border-slate-200' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">{meet.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {meet.leadName} · {meet.leadCompany}
                      </p>
                    </div>

                    <span className="rounded bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 text-xs font-semibold">
                      {meet.dateTime}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {meet.agenda}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="text-slate-500 flex items-center gap-1.5">
                      <span className="font-medium text-slate-800">Host:</span>
                      <span>{meet.hostEmployeeName} ({meet.hostEmployeeCode})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isCancelled ? (
                        <>
                          <a
                            href={meet.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsCustomerBookingOpen(true);
                            }}
                            className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                          >
                            <span>Open Room</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <span>·</span>
                          <button
                            onClick={() => cancelMeeting(meet.id)}
                            className="text-xs text-slate-500 hover:text-rose-600 font-medium"
                          >
                            Reschedule
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Slot Rescheduled</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL 1: NEW DEAL */}
      {isNewDealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <form
            onSubmit={handleCreateDeal}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 animate-scale-in"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Create Pipeline Deal</h3>
              <button
                type="button"
                onClick={() => setIsNewDealModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Deal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Executive Cohort - Acme Corp"
                  value={dealTitle}
                  onChange={(e) => setDealTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Client Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={dealClient}
                  onChange={(e) => setDealClient(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. buyer@acme.com"
                  value={dealEmail}
                  onChange={(e) => setDealEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Deal Value ($)</label>
                  <input
                    type="number"
                    required
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Initial Stage</label>
                  <select
                    value={dealStage}
                    onChange={(e) => setDealStage(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden cursor-pointer"
                  >
                    {PIPELINE_STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewDealModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Create Deal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: SCHEDULE MEETING */}
      {isNewMeetingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <form
            onSubmit={handleCreateMeeting}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 animate-scale-in"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Schedule Strategy Session</h3>
              <button
                type="button"
                onClick={() => setIsNewMeetingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  value={meetTitle}
                  onChange={(e) => setMeetTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Lead Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Kalu"
                    value={meetLeadName}
                    onChange={(e) => setMeetLeadName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vanguard Retail"
                    value={meetLeadCompany}
                    onChange={(e) => setMeetLeadCompany(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Lead Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. d.kalu@vanguard.com"
                  value={meetLeadEmail}
                  onChange={(e) => setMeetLeadEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Proposed Slot & Timezone</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thursday, 10:00 AM PST"
                  value={meetDateTime}
                  onChange={(e) => setMeetDateTime(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Session Agenda</label>
                <textarea
                  rows={2}
                  value={meetAgenda}
                  onChange={(e) => setMeetAgenda(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewMeetingModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Confirm & Lock Slot
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
