import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import {
  IntegrationConnection,
  IntegrationProvider,
  TeamMember,
  Workspace
} from '../../types';
import { PROVIDER_CATALOG } from '../../data/integrationDirectory';
import {
  Building2,
  Plug,
  Shield,
  BookOpen,
  Users,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sliders,
  Pause,
  Play,
  X,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Globe,
  PhoneCall,
  CreditCard,
  Search,
  Check
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    activeWorkspace,
    settings,
    updateSettings,
    updateWorkspaceDetails,
    integrationConnections,
    connectIntegration,
    disconnectIntegration,
    reconnectIntegration,
    updateIntegrationStatus,
    employees,
    updateEmployeeAutonomyOverride,
    updateActionRule,
    teamMembers,
    inviteTeamMember,
    removeTeamMember,
    navigate,
    openConnectIntegration,
    openIntegrationDetail
  } = useOoumph();

  const [activeTab, setActiveTab] = useState<'workspace' | 'integrations' | 'autonomy' | 'brand' | 'team'>('workspace');

  // Workspace form state
  const [wsName, setWsName] = useState(activeWorkspace.name);
  const [wsDomain, setWsDomain] = useState(activeWorkspace.domain);
  const [wsTimezone, setWsTimezone] = useState(activeWorkspace.timezone || settings.timezone);
  const [wsCurrency, setWsCurrency] = useState(activeWorkspace.currency || settings.currency);
  const [wsHours, setWsHours] = useState(activeWorkspace.workingHours || settings.workingHours);
  const [wsLanguage, setWsLanguage] = useState(activeWorkspace.primaryLanguage || settings.primaryLanguage);
  const [savedBanner, setSavedBanner] = useState(false);

  // Brand form state
  const [brandTone, setBrandTone] = useState(activeWorkspace.brandTone);
  const [mission, setMission] = useState(activeWorkspace.mission);
  const [audience, setAudience] = useState(activeWorkspace.audience);
  const [approvedClaims, setApprovedClaims] = useState<string[]>(activeWorkspace.approvedClaims || []);
  const [newClaim, setNewClaim] = useState('');
  const [restrictedPhrases, setRestrictedPhrases] = useState<string[]>(activeWorkspace.restrictedPhrases || ['cheap', 'guaranteed wealth', 'zero effort']);
  const [newPhrase, setNewPhrase] = useState('');

  // Modals & Dialogs
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedProviderToConnect, setSelectedProviderToConnect] = useState<IntegrationProvider | null>(null);
  const [disconnectTarget, setDisconnectTarget] = useState<IntegrationConnection | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('member');
  const [autonomyFilter, setAutonomyFilter] = useState('');

  // Integration Filter
  const [integrationFilter, setIntegrationFilter] = useState<'all' | 'connected' | 'needs_attention' | 'disconnected'>('all');

  // Workspace-specific connections
  const wsConnections = integrationConnections.filter((c) => c.workspaceId === activeWorkspace.id);

  const filteredConnections = wsConnections.filter((c) => {
    if (integrationFilter === 'all') return true;
    return c.status === integrationFilter;
  });

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkspaceDetails({
      name: wsName,
      domain: wsDomain,
      timezone: wsTimezone,
      currency: wsCurrency,
      workingHours: wsHours,
      primaryLanguage: wsLanguage
    });
    updateSettings({
      timezone: wsTimezone,
      currency: wsCurrency,
      workingHours: wsHours,
      primaryLanguage: wsLanguage
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkspaceDetails({
      brandTone,
      mission,
      audience,
      approvedClaims,
      restrictedPhrases
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleAddClaim = () => {
    if (!newClaim.trim()) return;
    setApprovedClaims([...approvedClaims, newClaim.trim()]);
    setNewClaim('');
  };

  const handleRemoveClaim = (idx: number) => {
    setApprovedClaims(approvedClaims.filter((_, i) => i !== idx));
  };

  const handleAddPhrase = () => {
    if (!newPhrase.trim()) return;
    setRestrictedPhrases([...restrictedPhrases, newPhrase.trim()]);
    setNewPhrase('');
  };

  const handleRemovePhrase = (idx: number) => {
    setRestrictedPhrases(restrictedPhrases.filter((_, i) => i !== idx));
  };

  const handleSimulateConnect = (provider: IntegrationProvider, accountName: string, accountHandle: string, capabilities: string[]) => {
    connectIntegration({
      provider,
      accountName,
      accountHandle,
      capabilities
    });
    setIsConnectModalOpen(false);
    setSelectedProviderToConnect(null);
  };

  const handleSimulateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    inviteTeamMember(inviteName.trim(), inviteEmail.trim(), inviteRole);
    setInviteName('');
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

  // Provider Catalog for Connecting
  const ALL_PROVIDERS: { provider: IntegrationProvider; name: string; category: string; description: string; defaultHandle: string; defaultCapabilities: string[] }[] = [
    { provider: 'meta_business', name: 'Meta Business Portfolio', category: 'Social & Ads', description: 'Overarching Meta Business Suite portfolio managing verified Pages and Ad accounts.', defaultHandle: 'Portfolio ID: 90218820', defaultCapabilities: ['Page Administration', 'Ad Account Oversight', 'Asset Sharing'] },
    { provider: 'facebook_page', name: 'Facebook Verified Page', category: 'Social', description: 'Public Facebook business page for organic post scheduling and Messenger triage.', defaultHandle: 'fb.com/cedarandlearning', defaultCapabilities: ['Feed Publishing', 'Comment Triage', 'Messenger Routing'] },
    { provider: 'instagram_pro', name: 'Instagram Professional Account', category: 'Social & DM', description: 'Professional creator/business account for feed carousels, reels, and comment-to-guide triggers.', defaultHandle: '@cedarlearning', defaultCapabilities: ['Feed & Reel Publishing', 'Comment Scanning', 'Direct Message Guide Delivery', 'Insights'] },
    { provider: 'linkedin_page', name: 'LinkedIn Company Page', category: 'Social', description: 'Organization page for B2B executive thought-leadership articles and organic posts.', defaultHandle: 'company/cedar-and-co-learning', defaultCapabilities: ['Thought Leadership Publishing', 'Comment Moderation', 'Lead Gen Analytics'] },
    { provider: 'google_workspace', name: 'Google Workspace', category: 'Productivity', description: 'Executive inbox synchronization, Google Calendar defense, and Drive resource access.', defaultHandle: 'admin@cedarlearning.co', defaultCapabilities: ['Executive Inbox Sync', 'Google Calendar Defense', 'Drive Document Access'] },
    { provider: 'whatsapp_business', name: 'WhatsApp Business Cloud', category: 'Messaging', description: 'Direct customer message broadcast for approved HSM utility templates and high-priority alerts.', defaultHandle: '+1 (415) 555-0199', defaultCapabilities: ['HSM Template Broadcast', 'Direct Lead Messaging', 'Opt-out Handling'] },
    { provider: 'google_ads', name: 'Google Ads Account', category: 'Paid Media', description: 'Search campaign management, high-intent keyword bids, and negative keyword exclusions.', defaultHandle: 'CID: 881-224-9011', defaultCapabilities: ['High-Intent Search Bid Simulation', 'Negative Keyword Exclusions'] },
    { provider: 'website_cms', name: 'Website / CMS Webhook', category: 'Web & Forms', description: 'Production website hosting for landing page deploys and instant speed-to-lead form capture.', defaultHandle: 'https://cedarlearning.co', defaultCapabilities: ['Landing Page Deployment', 'Instant Rollback', 'Form Capture Webhook'] },
    { provider: 'voice_twilio', name: 'Twilio Virtual Voice Line', category: 'Telephony', description: 'Dedicated business phone number for virtual receptionist reception, voicemail audio recording, and transcripts.', defaultHandle: '+1 (415) 555-0199', defaultCapabilities: ['Virtual Receptionist Greeting', 'Voicemail Audio Transcription', 'SMS Notifications'] },
    { provider: 'stripe_billing', name: 'Stripe Merchant Billing', category: 'Commerce & Billing', description: 'Corporate invoice generator, checkout links, and enrollment subscription webhooks.', defaultHandle: 'acct_cedar_live_demo', defaultCapabilities: ['Executive Fellowship Checkout', 'Corporate Net-30 Invoicing'] }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Workspace Settings</h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {activeWorkspace.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure business operational parameters, external channel integrations, employee autonomy policies, and shared knowledge.
          </p>
        </div>

        {savedBanner && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            <span>Settings saved successfully.</span>
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-sm">
        {[
          { id: 'workspace', label: 'Workspace', icon: Building2 },
          { id: 'integrations', label: 'Integrations & Channels', icon: Plug, badge: wsConnections.filter(c => c.status === 'needs_attention').length },
          { id: 'autonomy', label: 'AI Employees & Autonomy', icon: Shield },
          { id: 'brand', label: 'Brand & Knowledge Defaults', icon: BookOpen },
          { id: 'team', label: 'Team & Access', icon: Users, badge: teamMembers.filter(m => m.workspaceId === activeWorkspace.id).length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && tab.badge > 0 && (
                <span className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: WORKSPACE */}
      {activeTab === 'workspace' && (
        <form onSubmit={handleSaveWorkspace} className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">General Information</h2>
              <p className="text-xs text-slate-500 mt-0.5">Core identifiers used across all employee work artifacts, customer emails, and invoices.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={wsName}
                  onChange={(e) => setWsName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Primary Domain</label>
                <input
                  type="text"
                  value={wsDomain}
                  onChange={(e) => setWsDomain(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                  placeholder="e.g. example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Operational Timezone</label>
                <select
                  value={wsTimezone}
                  onChange={(e) => setWsTimezone(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden cursor-pointer"
                >
                  <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST / UTC-8)</option>
                  <option value="America/New_York (EST)">America/New_York (EST / UTC-5)</option>
                  <option value="Europe/London (GMT)">Europe/London (GMT / UTC+0)</option>
                  <option value="Europe/Paris (CET)">Europe/Paris (CET / UTC+1)</option>
                  <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT / UTC+8)</option>
                  <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST / UTC+9)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">Used by Aria Vance (A01) to schedule meetings and manage calendar buffers.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Base Currency</label>
                <select
                  value={wsCurrency}
                  onChange={(e) => setWsCurrency(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden cursor-pointer"
                >
                  <option value="USD ($)">USD ($) - US Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                  <option value="CAD ($)">CAD ($) - Canadian Dollar</option>
                  <option value="AUD ($)">AUD ($) - Australian Dollar</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">Applied to sales deals, checkout invoices, and paid ad spend limits.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Working / Office Hours</label>
                <input
                  type="text"
                  value={wsHours}
                  onChange={(e) => setWsHours(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                  placeholder="e.g. 09:00 - 18:00 PST (Mon - Fri)"
                />
                <p className="text-[11px] text-slate-400 mt-1">Outbound sequences and promotional social posts pause outside these hours.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Primary Language</label>
                <select
                  value={wsLanguage}
                  onChange={(e) => setWsLanguage(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden cursor-pointer"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Spanish (ES)">Spanish (ES)</option>
                  <option value="French (FR)">French (FR)</option>
                  <option value="German (DE)">German (DE)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs"
            >
              Save Workspace Details
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: INTEGRATIONS & CHANNELS */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Connected Accounts & Channels</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulated provider connections for marketing publishing, outbound communications, and revenue operations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-xs">
                {(['all', 'connected', 'needs_attention', 'disconnected'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setIntegrationFilter(filter)}
                    className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                      integrationFilter === filter
                        ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <button
                onClick={() => openConnectIntegration()}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Connect Channel</span>
              </button>
            </div>
          </div>

          {/* Special Meta Business -> Facebook Page -> Instagram Relationship Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-slate-900 uppercase tracking-wide">Meta Architecture Hierarchy</span>
                <span className="text-[10px] text-slate-400">· Business Portfolio & Linked Assets</span>
              </div>
              <span className="text-xs text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded font-medium">
                Verified Hierarchy
              </span>
            </div>

            <div className="relative pl-6 space-y-3 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Meta Business */}
              <div className="relative flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Meta Business Portfolio</div>
                    <div className="text-slate-500 text-[11px]">Cedar & Co Learning Inc. · ID: 90218820</div>
                  </div>
                </div>
                <span className="text-xs text-teal-700 font-medium">Active</span>
              </div>

              {/* Linked Facebook Page */}
              <div className="relative flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs ml-4">
                <div className="flex items-center gap-3">
                  <Facebook className="h-5 w-5 text-blue-700" />
                  <div>
                    <div className="font-semibold text-slate-900">Facebook Verified Page</div>
                    <div className="text-slate-500 text-[11px]">Cedar & Co Learning Official (@cedarandlearning)</div>
                  </div>
                </div>
                <span className="text-xs text-teal-700 font-medium">Linked Page</span>
              </div>

              {/* Linked Instagram Professional */}
              <div className="relative flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs ml-8">
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="font-semibold text-slate-900">Instagram Professional Creator</div>
                    <div className="text-slate-500 text-[11px]">@cedarlearning (Flagship Guide Trigger Active: "GROW")</div>
                  </div>
                </div>
                <span className="text-xs text-teal-700 font-medium">Direct Messaging Ready</span>
              </div>
            </div>
          </div>

          {/* Connections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConnections.map((conn) => {
              const isNeedsAttention = conn.status === 'needs_attention';
              const isDisconnected = conn.status === 'disconnected';

              return (
                <div
                  key={conn.id}
                  className={`rounded-xl border bg-white p-5 shadow-2xs flex flex-col justify-between space-y-4 transition-all ${
                    isNeedsAttention
                      ? 'border-amber-300 bg-amber-50/20'
                      : isDisconnected
                      ? 'border-slate-200 opacity-60'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">{conn.accountName}</h3>
                          {conn.status === 'connected' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Connected</span>
                            </span>
                          )}
                          {isNeedsAttention && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                              <AlertTriangle className="h-3 w-3" />
                              <span>Needs Attention</span>
                            </span>
                          )}
                          {isDisconnected && (
                            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                              Disconnected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {conn.accountType} {conn.accountHandle && `· ${conn.accountHandle}`}
                        </p>
                      </div>
                    </div>

                    {/* Permission issue warning */}
                    {isNeedsAttention && conn.permissionIssues && (
                      <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900 space-y-1">
                        <div className="font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                          <span>Permission Refresh Required</span>
                        </div>
                        <p className="text-[11px] text-amber-800">
                          {conn.permissionIssues.join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Capabilities preview */}
                    <div className="pt-2">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Permitted Capabilities
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {conn.capabilities.map((cap, i) => (
                          <span
                            key={i}
                            className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Assigned Employees using this channel */}
                    {(() => {
                      const catalogItem = PROVIDER_CATALOG.find((p) => p.provider === conn.provider);
                      const assignedEmps = employees.filter((e) =>
                        catalogItem?.associatedEmployeeCodes.includes(e.code)
                      );
                      if (assignedEmps.length === 0) return null;
                      return (
                        <div className="pt-1">
                          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                            Assigned AI Employees ({assignedEmps.length})
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {assignedEmps.slice(0, 4).map((emp) => (
                              <span
                                key={emp.id}
                                className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700"
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${emp.avatarColor} text-white font-bold text-[6px] flex items-center justify-center`}
                                >
                                  {emp.code}
                                </span>
                                <span>{emp.name}</span>
                              </span>
                            ))}
                            {assignedEmps.length > 4 && (
                              <span className="text-[10px] text-slate-400 self-center font-medium">
                                +{assignedEmps.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Footer controls & customer-facing sync info */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px]">
                        {conn.lastSyncAt ? (
                          `Synced ${new Date(conn.lastSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        ) : (
                          'Ready to sync'
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openIntegrationDetail(conn.id)}
                        className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                        title="View connection health, audit trail, and diagnostics"
                      >
                        Advanced Diagnostics
                      </button>

                      {isNeedsAttention ? (
                        <button
                          onClick={() => reconnectIntegration(conn.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          <RefreshCw className="h-3 w-3" />
                          <span>Re-authorize</span>
                        </button>
                      ) : isDisconnected ? (
                        <button
                          onClick={() => reconnectIntegration(conn.id)}
                          className="text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          Reconnect
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              updateIntegrationStatus(conn.id, 'needs_attention', ['Simulated OAuth token refresh warning (test trigger)']);
                            }}
                            className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                            title="Simulate token expiration scenario"
                          >
                            Simulate Issue
                          </button>
                          <span>·</span>
                          <button
                            onClick={() => setDisconnectTarget(conn)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-medium transition-colors cursor-pointer"
                          >
                            Disconnect
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: AI EMPLOYEES & AUTONOMY */}
      {activeTab === 'autonomy' && (
        <div className="space-y-6 max-w-4xl">
          {/* Default Level Selector */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Default Autonomy Level</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Controls the balance between requiring explicit founder approval and autonomous execution for routine actions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: 'Strict (Confirm Every Action)',
                  title: 'Strict Mode',
                  desc: 'Every external message, ad spend, and schedule change pauses for approval in Inbox.',
                  badge: 'Highest Control'
                },
                {
                  id: 'Balanced (Auto Draft, Confirm High-Risk)',
                  title: 'Balanced Mode (Recommended)',
                  desc: 'Routine actions execute automatically. Paid budgets >$0, NDAs, and live public posts require review.',
                  badge: 'Recommended'
                },
                {
                  id: 'Autonomous (Execute Routine)',
                  title: 'Autonomous Mode',
                  desc: 'Full autonomous execution for known patterns. Only high-risk financial transfers trigger review.',
                  badge: 'Maximum Speed'
                }
              ].map((tier) => {
                const isSelected = settings.autonomyLevel === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => updateSettings({ autonomyLevel: tier.id as any })}
                    className={`rounded-xl p-4 text-left border transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs">{tier.title}</span>
                      {isSelected ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <span className="text-[10px] text-slate-500 font-medium">{tier.badge}</span>
                      )}
                    </div>
                    <p className={`text-xs mt-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {tier.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Rules Table */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Action Category Rules</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fine-tune which specific categories are safe to execute vs which always produce an item in the Inbox.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {settings.actionRules.map((rule) => (
                <div key={rule.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-semibold text-slate-900">{rule.category}</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">{rule.description}</p>
                  </div>

                  <button
                    onClick={() => updateActionRule(rule.id, !rule.requiresApproval)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      rule.requiresApproval
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                        : 'bg-teal-100 text-teal-800 border border-teal-300 hover:bg-teal-200'
                    }`}
                  >
                    {rule.requiresApproval ? 'Requires Review' : 'Auto Executes'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Employee-Specific Overrides */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Employee Specific Overrides</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Override default autonomy per employee (e.g. keep Legal Assistant strict while letting Receptionist reply freely).
                </p>
              </div>

              <div className="relative">
                <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter employees..."
                  value={autonomyFilter}
                  onChange={(e) => setAutonomyFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs pr-1">
              {employees
                .filter(
                  (e) =>
                    !autonomyFilter ||
                    e.name.toLowerCase().includes(autonomyFilter.toLowerCase()) ||
                    e.title.toLowerCase().includes(autonomyFilter.toLowerCase()) ||
                    e.code.toLowerCase().includes(autonomyFilter.toLowerCase())
                )
                .map((emp) => {
                  const override = settings.employeeOverrides.find((o) => o.employeeId === emp.id);
                  const mode = override ? override.mode : 'default';

                  return (
                    <div key={emp.id} className="py-2.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`h-6 w-6 rounded-md ${emp.avatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                          {emp.code}
                        </span>
                        <div>
                          <div className="font-semibold text-slate-900">{emp.name}</div>
                          <div className="text-slate-500 text-[11px]">{emp.title}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-xs">
                        {(['default', 'strict', 'autonomous'] as const).map((m) => (
                          <button
                            key={m}
                            onClick={() => updateEmployeeAutonomyOverride(emp.id, m)}
                            className={`px-2 py-0.5 rounded capitalize transition-colors ${
                              mode === m
                                ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BRAND & KNOWLEDGE DEFAULTS */}
      {activeTab === 'brand' && (
        <form onSubmit={handleSaveBrand} className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Brand Voice & Core Guidance</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                These guidelines are automatically checked by all 32 employee capability workspaces before generating copy, landing pages, or sales briefs.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Company Mission Statement</label>
                <textarea
                  rows={2}
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Audience Profile</label>
                <textarea
                  rows={2}
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Tone & Communication Style</label>
                <textarea
                  rows={2}
                  value={brandTone}
                  onChange={(e) => setBrandTone(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Approved Claims */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-semibold text-slate-900">
                Approved Claims (Safe to Reference in Copy)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Over 2,400 business leaders trained across 14 countries."
                  value={newClaim}
                  onChange={(e) => setNewClaim(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleAddClaim}
                  className="rounded-lg bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 transition-colors"
                >
                  Add Claim
                </button>
              </div>

              <div className="space-y-1.5">
                {approvedClaims.map((claim, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-teal-50/50 border border-teal-200 text-xs text-teal-950"
                  >
                    <span>{claim}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveClaim(idx)}
                      className="text-teal-700 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Restricted Phrases */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-semibold text-slate-900">
                Restricted / Avoid Phrases (Blacklisted by Employees)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. cheap, guaranteed wealth, zero effort..."
                  value={newPhrase}
                  onChange={(e) => setNewPhrase(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleAddPhrase}
                  className="rounded-lg bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 transition-colors"
                >
                  Add Rule
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {restrictedPhrases.map((phrase, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs text-rose-800"
                  >
                    <span>"{phrase}"</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePhrase(idx)}
                      className="hover:text-rose-950 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs"
            >
              Save Brand & Policy Guidelines
            </button>
          </div>
        </form>
      )}

      {/* TAB 5: TEAM & ACCESS */}
      {activeTab === 'team' && (
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Human Team Collaborators</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage human operator seats, permissions, and client reviewer invitations for {activeWorkspace.name}.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                Plan: <strong className="text-slate-900">{settings.planTier}</strong> (3 of 5 seats used)
              </span>
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Invite Teammate</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teamMembers
                  .filter((m) => m.workspaceId === activeWorkspace.id)
                  .map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                            {member.avatarInitials}
                          </span>
                          <span className="font-semibold text-slate-900">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{member.email}</td>
                      <td className="py-3 px-4">
                        <span className="capitalize font-medium text-slate-800">
                          {member.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                            member.status === 'active'
                              ? 'bg-teal-50 text-teal-700 border border-teal-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {member.role !== 'owner' && (
                          <button
                            onClick={() => removeTeamMember(member.id)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: CONNECT INTEGRATION SIMULATION */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-5 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Connect Simulated Channel</h3>
                <p className="text-xs text-slate-500 mt-0.5">Choose an external provider to connect to {activeWorkspace.name}.</p>
              </div>
              <button
                onClick={() => {
                  setIsConnectModalOpen(false);
                  setSelectedProviderToConnect(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {ALL_PROVIDERS.map((item) => {
                const existing = wsConnections.find((c) => c.provider === item.provider);
                const isSelected = selectedProviderToConnect === item.provider;

                return (
                  <div
                    key={item.provider}
                    onClick={() => setSelectedProviderToConnect(item.provider)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-xs text-slate-900">{item.name}</div>
                      {existing && existing.status === 'connected' ? (
                        <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                          Already Connected
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium">{item.category}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{item.description}</p>
                  </div>
                );
              })}
            </div>

            {selectedProviderToConnect && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="font-semibold text-slate-900">
                  Simulate Authorization for {ALL_PROVIDERS.find(p => p.provider === selectedProviderToConnect)?.name}
                </div>
                <p className="text-slate-600 text-[11px]">
                  Permissions requested: {ALL_PROVIDERS.find(p => p.provider === selectedProviderToConnect)?.defaultCapabilities.join(', ')}.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsConnectModalOpen(false);
                  setSelectedProviderToConnect(null);
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedProviderToConnect}
                onClick={() => {
                  if (!selectedProviderToConnect) return;
                  const prov = ALL_PROVIDERS.find((p) => p.provider === selectedProviderToConnect)!;
                  handleSimulateConnect(
                    prov.provider,
                    prov.name,
                    prov.defaultHandle,
                    prov.defaultCapabilities
                  );
                }}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                Simulate Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DISCONNECT CONFIRMATION */}
      {disconnectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 animate-scale-in">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Disconnect {disconnectTarget.accountName}?</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Active campaigns depending on this channel (such as Flagship comment loops or scheduled social posts) will be immediately paused.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setDisconnectTarget(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Keep Connected
              </button>
              <button
                onClick={() => {
                  disconnectIntegration(disconnectTarget.id);
                  setDisconnectTarget(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700 transition-colors"
              >
                Confirm Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INVITE COLLABORATOR */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <form
            onSubmit={handleSimulateInvite}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 animate-scale-in"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Invite Team Collaborator</h3>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jordan@cedarlearning.co"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Role / Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden cursor-pointer"
                >
                  <option value="admin">Admin (Full delegation & approval rights)</option>
                  <option value="member">Member (Can talk with employees & assign tasks)</option>
                  <option value="client_viewer">Client Viewer (Read-only access to review deliverables)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
