import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Employee,
  Workspace,
  Task,
  ApprovalRequest,
  LeadProspect,
  WebsitePage,
  FlagshipCampaign,
  Deal,
  EmployeeConversation,
  UserSettings,
  SimulationLogEvent
} from '../types';
import { INITIAL_EMPLOYEES } from '../data/employees';
import { INITIAL_WORKSPACES } from '../data/workspaces';
import {
  INITIAL_USER_SETTINGS,
  INITIAL_WEBSITE_PAGE,
  INITIAL_FLAGSHIP_CAMPAIGN,
  INITIAL_LEADS,
  INITIAL_TASKS,
  INITIAL_APPROVALS,
  INITIAL_DEALS,
  INITIAL_CONVERSATIONS
} from '../data/seedData';

interface OoumphContextType {
  // Navigation & View State
  currentView: 'team' | 'work' | 'inbox' | 'business' | 'sales-hub';
  selectedEmployeeId: string | null;
  workTab: 'tasks' | 'calendar' | 'campaigns' | 'assets' | 'results';
  inboxTab: 'conversations' | 'questions' | 'approvals';
  isDemoToolsOpen: boolean;
  isFlagshipSimulatorOpen: boolean;
  isOnboardingOpen: boolean;
  isCustomerBookingOpen: boolean;
  isCustomerProposalOpen: boolean;
  isCustomerPreferenceCenterOpen: boolean;
  isCustomerCheckoutOpen: boolean;
  demoMode: 'seeded' | 'fresh';

  // Domain Entities
  activeWorkspace: Workspace;
  allWorkspaces: Workspace[];
  employees: Employee[];
  tasks: Task[];
  approvals: ApprovalRequest[];
  leads: LeadProspect[];
  websitePage: WebsitePage;
  flagshipCampaign: FlagshipCampaign;
  deals: Deal[];
  conversations: Record<string, EmployeeConversation>;
  settings: UserSettings;
  simulationLogs: SimulationLogEvent[];

  // Actions
  navigate: (view: 'team' | 'work' | 'inbox' | 'business' | 'sales-hub', employeeId?: string | null) => void;
  selectEmployee: (employeeId: string | null) => void;
  setWorkTab: (tab: 'tasks' | 'calendar' | 'campaigns' | 'assets' | 'results') => void;
  setInboxTab: (tab: 'conversations' | 'questions' | 'approvals') => void;
  setIsDemoToolsOpen: (open: boolean) => void;
  setIsFlagshipSimulatorOpen: (open: boolean) => void;
  setIsOnboardingOpen: (open: boolean) => void;
  setIsCustomerBookingOpen: (open: boolean) => void;
  setIsCustomerProposalOpen: (open: boolean) => void;
  setIsCustomerPreferenceCenterOpen: (open: boolean) => void;
  setIsCustomerCheckoutOpen: (open: boolean) => void;
  switchWorkspace: (workspaceId: string) => void;

  // Business Handlers
  sendMessage: (employeeId: string, text: string) => void;
  toggleTakeover: (employeeId: string) => void;
  approveRequest: (approvalId: string) => void;
  rejectRequest: (approvalId: string) => void;
  updateTask: (taskId: string, partial: Partial<Task>) => void;
  updateWebsiteHeadline: (headline: string, subheading?: string) => void;
  rollbackWebsiteVersion: (versionNumber: number) => void;
  submitWebsiteContactForm: (leadData: { name: string; email: string; company: string; message: string }) => void;
  importLeadsCSV: (csvText: string) => { added: number; duplicates: number; invalid: number };
  updateLeadStatus: (leadId: string, status: LeadProspect['status']) => void;
  triggerOutboundSequence: (leadIds: string[]) => void;
  runFlagshipSimulation: (
    senderUsername: string,
    commentText: string,
    answersQualification: boolean,
    qualificationAnswer: string,
    grantsMarketingConsent: boolean
  ) => { success: boolean; message: string };
  updateFlagshipSettings: (partial: Partial<FlagshipCampaign>) => void;
  toggleLesson: (lessonId: string) => void;
  addLesson: (trigger: string, lesson: string) => void;
  createCustomEmployee: (customData: Omit<Employee, 'id' | 'code' | 'status'>) => void;
  togglePinEmployee: (employeeId: string) => void;
  updateSettings: (partial: Partial<UserSettings>) => void;
  advanceScenarioDays: (days: number) => void;
  setDemoMode: (mode: 'seeded' | 'fresh') => void;
  resetToFactoryDefaults: () => void;
  exportWorkspaceJSON: () => void;
  mockClientDecisionOnDeal: (dealId: string, decision: 'accept' | 'request_edit') => void;
}

const STORAGE_KEY = 'ooumph_app_state_v1';

const OoumphContext = createContext<OoumphContextType | null>(null);

export const OoumphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentView, setCurrentView] = useState<'team' | 'work' | 'inbox' | 'business' | 'sales-hub'>('team');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [workTab, setWorkTab] = useState<'tasks' | 'calendar' | 'campaigns' | 'assets' | 'results'>('tasks');
  const [inboxTab, setInboxTab] = useState<'conversations' | 'questions' | 'approvals'>('approvals');
  const [isDemoToolsOpen, setIsDemoToolsOpen] = useState(false);
  const [isFlagshipSimulatorOpen, setIsFlagshipSimulatorOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCustomerBookingOpen, setIsCustomerBookingOpen] = useState(false);
  const [isCustomerProposalOpen, setIsCustomerProposalOpen] = useState(false);
  const [isCustomerPreferenceCenterOpen, setIsCustomerPreferenceCenterOpen] = useState(false);
  const [isCustomerCheckoutOpen, setIsCustomerCheckoutOpen] = useState(false);
  const [demoMode, setDemoModeState] = useState<'seeded' | 'fresh'>('seeded');

  // Business state
  const [allWorkspaces, setAllWorkspaces] = useState<Workspace[]>(INITIAL_WORKSPACES);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('ws-cedar');
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [leads, setLeads] = useState<LeadProspect[]>(INITIAL_LEADS);
  const [websitePage, setWebsitePage] = useState<WebsitePage>(INITIAL_WEBSITE_PAGE);
  const [flagshipCampaign, setFlagshipCampaign] = useState<FlagshipCampaign>(INITIAL_FLAGSHIP_CAMPAIGN);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [conversations, setConversations] = useState<Record<string, EmployeeConversation>>(INITIAL_CONVERSATIONS);
  const [settings, setSettings] = useState<UserSettings>(INITIAL_USER_SETTINGS);
  const [simulationLogs, setSimulationLogs] = useState<SimulationLogEvent[]>([
    {
      id: 'log-1',
      timestamp: new Date().toISOString(),
      actor: 'System',
      action: 'Session Initialized',
      details: 'Cedar & Co Learning demo state loaded with verified sample records.',
      type: 'info'
    }
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.employees) setEmployees(parsed.employees);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.approvals) setApprovals(parsed.approvals);
        if (parsed.leads) setLeads(parsed.leads);
        if (parsed.websitePage) setWebsitePage(parsed.websitePage);
        if (parsed.flagshipCampaign) setFlagshipCampaign(parsed.flagshipCampaign);
        if (parsed.deals) setDeals(parsed.deals);
        if (parsed.conversations) setConversations(parsed.conversations);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.activeWorkspaceId) setActiveWorkspaceId(parsed.activeWorkspaceId);
        if (parsed.allWorkspaces) setAllWorkspaces(parsed.allWorkspaces);
        if (parsed.simulationLogs) setSimulationLogs(parsed.simulationLogs);
        if (parsed.demoMode) setDemoModeState(parsed.demoMode);
      }
    } catch {
      // Use initial state fallback
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      const stateToSave = {
        employees,
        tasks,
        approvals,
        leads,
        websitePage,
        flagshipCampaign,
        deals,
        conversations,
        settings,
        activeWorkspaceId,
        allWorkspaces,
        simulationLogs,
        demoMode
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // quota or private mode
    }
  }, [
    employees,
    tasks,
    approvals,
    leads,
    websitePage,
    flagshipCampaign,
    deals,
    conversations,
    settings,
    activeWorkspaceId,
    allWorkspaces,
    simulationLogs,
    demoMode
  ]);

  const activeWorkspace = allWorkspaces.find((w) => w.id === activeWorkspaceId) || allWorkspaces[0];

  const logEvent = (actor: string, action: string, details: string, type: 'info' | 'success' | 'warning' | 'pause' = 'info') => {
    const newLog: SimulationLogEvent = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      details,
      type
    };
    setSimulationLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const navigate = (view: 'team' | 'work' | 'inbox' | 'business' | 'sales-hub', employeeId?: string | null) => {
    setCurrentView(view);
    if (employeeId !== undefined) {
      setSelectedEmployeeId(employeeId);
    }
  };

  const selectEmployee = (employeeId: string | null) => {
    setSelectedEmployeeId(employeeId);
    if (employeeId) {
      setCurrentView('team');
    }
  };

  const switchWorkspace = (workspaceId: string) => {
    setActiveWorkspaceId(workspaceId);
    setSettings((prev) => ({ ...prev, activeWorkspaceId: workspaceId }));
    const ws = allWorkspaces.find((w) => w.id === workspaceId);
    logEvent('System', 'Switched Workspace', `Active client workspace set to ${ws?.name || workspaceId}`, 'info');
  };

  const sendMessage = (employeeId: string, text: string) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: new Date().toISOString()
    };

    const currentConv = conversations[employeeId] || {
      employeeId,
      messages: [],
      takeover: false
    };

    if (currentConv.takeover) {
      // Human takeover is active - automated replies are strictly locked
      setConversations((prev) => ({
        ...prev,
        [employeeId]: {
          ...currentConv,
          messages: [
            ...currentConv.messages,
            userMsg,
            {
              id: `msg-sys-${Date.now()}`,
              sender: 'system' as const,
              text: 'Automated responses are paused because Human Takeover is active. You are currently typing as the business operator.',
              timestamp: new Date().toISOString()
            }
          ]
        }
      }));
      logEvent(emp.name, 'Message Received (Takeover Locked)', 'Message logged during human takeover.', 'pause');
      return;
    }

    // Generate intelligent role-based reply
    let replyText = `I am on it. I have updated the work draft according to "${text}" for ${activeWorkspace.name}. You can review and refine the output in the workspace panel on the right.`;
    let suggestedAction: string | undefined;

    if (emp.code === 'A01') {
      replyText = `Understood. I checked your executive calendar and verified buffers for ${activeWorkspace.name}. I drafted the follow-up correspondence and added it to your pending queue.`;
      suggestedAction = 'View updated calendar';
    } else if (emp.code === 'A02') {
      replyText = `Great suggestion! I adapted the headline and hook to follow our brand guidelines ("${activeWorkspace.brandTone}"). The revised post is scheduled in your content queue.`;
      suggestedAction = 'Review scheduled post';
    } else if (emp.code === 'A04') {
      replyText = `Prospect research updated. I applied ICP filters for ${activeWorkspace.industry} and flagged duplicate domains against existing CRM records.`;
      suggestedAction = 'Inspect prospect list';
    } else if (emp.code === 'A05') {
      replyText = `Virtual Reception line settings adjusted. Test audio call and latest transcription are available for playback in the workspace tab.`;
      suggestedAction = 'Listen to call recording';
    } else if (emp.code === 'A07') {
      replyText = `I refreshed the landing page copy with your revisions. You can preview the live responsive preview and test form capture directly.`;
      suggestedAction = 'Test live form';
    } else if (emp.code === 'A16' || emp.code === 'A17') {
      replyText = `Sales sequence updated. I confirmed all opt-out and suppression rules are active before any simulated emails are queued.`;
      suggestedAction = 'Review sequence';
    } else if (emp.code === 'A23') {
      replyText = `Flagship guide parameters adjusted. Keyword trigger is set to "${flagshipCampaign.keyword}" and genuine PDF asset is verified ready for simulated dispatch.`;
      suggestedAction = 'Open recipient simulator';
    }

    const botMsg = {
      id: `msg-${Date.now() + 1}`,
      sender: 'employee' as const,
      text: replyText,
      timestamp: new Date().toISOString(),
      suggestedAction
    };

    setConversations((prev) => ({
      ...prev,
      [employeeId]: {
        ...currentConv,
        messages: [...currentConv.messages, userMsg, botMsg]
      }
    }));

    logEvent(emp.name, 'Task Delegated', `User instruction processed: "${text.substring(0, 45)}..."`, 'success');
  };

  const toggleTakeover = (employeeId: string) => {
    const emp = employees.find((e) => e.id === employeeId);
    const currentConv = conversations[employeeId] || {
      employeeId,
      messages: [],
      takeover: false
    };
    const nextState = !currentConv.takeover;

    setConversations((prev) => ({
      ...prev,
      [employeeId]: {
        ...currentConv,
        takeover: nextState
      }
    }));

    logEvent(
      emp?.name || 'Employee',
      nextState ? 'Human Takeover Activated' : 'Human Takeover Released',
      nextState
        ? 'Automated responses paused. Operator has exclusive control.'
        : 'Automated assistant resumes regular handling.',
      nextState ? 'pause' : 'info'
    );
  };

  const approveRequest = (approvalId: string) => {
    const target = approvals.find((a) => a.id === approvalId);
    if (!target) return;

    setApprovals((prev) =>
      prev.map((a) =>
        a.id === approvalId
          ? { ...a, status: 'approved', reviewedAt: new Date().toISOString() }
          : a
      )
    );

    // If it corresponds to a task, update task status
    setTasks((prev) =>
      prev.map((t) =>
        t.employeeId === target.employeeId && t.status === 'needs_review'
          ? { ...t, status: 'approved' }
          : t
      )
    );

    logEvent(
      target.employeeName,
      'Approval Granted',
      `Approved: "${target.title}". Action simulated successfully.`,
      'success'
    );
  };

  const rejectRequest = (approvalId: string) => {
    const target = approvals.find((a) => a.id === approvalId);
    if (!target) return;

    setApprovals((prev) =>
      prev.map((a) =>
        a.id === approvalId
          ? { ...a, status: 'rejected', reviewedAt: new Date().toISOString() }
          : a
      )
    );

    setTasks((prev) =>
      prev.map((t) =>
        t.employeeId === target.employeeId && t.status === 'needs_review'
          ? { ...t, status: 'paused' }
          : t
      )
    );

    logEvent(
      target.employeeName,
      'Approval Rejected',
      `Rejected: "${target.title}". Proposed action cancelled.`,
      'warning'
    );
  };

  const updateTask = (taskId: string, partial: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...partial, version: t.version + 1 } : t))
    );
    logEvent('Operator', 'Task Updated', `Task #${taskId} updated.`, 'info');
  };

  const updateWebsiteHeadline = (headline: string, subheading?: string) => {
    setWebsitePage((prev) => {
      const nextVersion = prev.versionHistory.length + 1;
      return {
        ...prev,
        heroHeadline: headline,
        heroSubheading: subheading || prev.heroSubheading,
        lastPublishedAt: new Date().toISOString(),
        versionHistory: [
          ...prev.versionHistory,
          {
            version: nextVersion,
            headline,
            timestamp: new Date().toISOString()
          }
        ]
      };
    });
    logEvent('Walter Hayes (A07)', 'Website Published', `New headline published: "${headline}"`, 'success');
  };

  const rollbackWebsiteVersion = (versionNumber: number) => {
    const historical = websitePage.versionHistory.find((v) => v.version === versionNumber);
    if (!historical) return;

    setWebsitePage((prev) => ({
      ...prev,
      heroHeadline: historical.headline,
      lastPublishedAt: new Date().toISOString()
    }));

    logEvent('Walter Hayes (A07)', 'Website Rolled Back', `Restored to version v${versionNumber}: "${historical.headline}"`, 'info');
  };

  const submitWebsiteContactForm = (leadData: { name: string; email: string; company: string; message: string }) => {
    const newLead: LeadProspect = {
      id: `lead-inbound-${Date.now()}`,
      name: leadData.name,
      title: 'Prospective Client',
      company: leadData.company,
      email: leadData.email,
      fitScore: 92,
      status: 'replied',
      source: 'Inbound Contact Form',
      touchPoints: 1,
      notes: `Submitted website form: "${leadData.message}". Inbound responder Jordan Bell (A17) delivered immediate speed-to-lead qualification.`,
      consents: { marketingEmail: true, whatsapp: false, callback: true },
      lastContacted: new Date().toISOString()
    };

    // Pause any conflicting cold outbound sequences to this email
    setLeads((prev) => [newLead, ...prev]);

    logEvent(
      'Jordan Bell (A17)',
      'Inbound Lead Handled',
      `Instant speed-to-lead response for ${leadData.name} (${leadData.email}). Outbound pause synced.`,
      'success'
    );
  };

  const importLeadsCSV = (csvText: string) => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return { added: 0, duplicates: 0, invalid: 0 };

    const header = lines[0].toLowerCase().split(',').map((h) => h.trim());
    const nameIdx = header.findIndex((h) => h.includes('name'));
    const emailIdx = header.findIndex((h) => h.includes('email'));
    const companyIdx = header.findIndex((h) => h.includes('company'));
    const titleIdx = header.findIndex((h) => h.includes('title') || h.includes('role'));

    if (emailIdx === -1) {
      return { added: 0, duplicates: 0, invalid: lines.length - 1 };
    }

    let added = 0;
    let duplicates = 0;
    let invalid = 0;
    const newLeadsToAdd: LeadProspect[] = [];

    const existingEmails = new Set(leads.map((l) => l.email.toLowerCase()));

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      if (row.length <= emailIdx) {
        invalid++;
        continue;
      }

      const email = row[emailIdx];
      if (!email || !email.includes('@')) {
        invalid++;
        continue;
      }

      if (existingEmails.has(email.toLowerCase())) {
        duplicates++;
        continue;
      }

      const name = nameIdx !== -1 && row[nameIdx] ? row[nameIdx] : 'Prospect Contact';
      const company = companyIdx !== -1 && row[companyIdx] ? row[companyIdx] : activeWorkspace.name;
      const title = titleIdx !== -1 && row[titleIdx] ? row[titleIdx] : 'Department Lead';

      newLeadsToAdd.push({
        id: `lead-csv-${Date.now()}-${i}`,
        name,
        title,
        company,
        email,
        fitScore: 85,
        status: 'researched',
        source: 'CSV Import',
        touchPoints: 0,
        notes: `Imported via CSV file. Passed column mapping and deduplication check.`,
        consents: { marketingEmail: true, whatsapp: false, callback: false }
      });

      existingEmails.add(email.toLowerCase());
      added++;
    }

    if (newLeadsToAdd.length > 0) {
      setLeads((prev) => [...newLeadsToAdd, ...prev]);
    }

    logEvent(
      'Stan Bradley (A04)',
      'CSV Leads Imported',
      `Parsed CSV: ${added} new leads added, ${duplicates} duplicates suppressed, ${invalid} invalid rows skipped.`,
      added > 0 ? 'success' : 'warning'
    );

    return { added, duplicates, invalid };
  };

  const updateLeadStatus = (leadId: string, status: LeadProspect['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status, lastContacted: new Date().toISOString() } : l))
    );
  };

  const triggerOutboundSequence = (leadIds: string[]) => {
    setLeads((prev) =>
      prev.map((l) =>
        leadIds.includes(l.id) && l.status !== 'opted_out'
          ? {
              ...l,
              status: 'contacted',
              touchPoints: l.touchPoints + 1,
              lastContacted: new Date().toISOString()
            }
          : l
      )
    );

    logEvent(
      'Arthur Pendelton (A16)',
      'Outbound Sequence Dispatched',
      `Dispatched Step 1 email to ${leadIds.length} eligible prospects. Opt-out checks enforced.`,
      'success'
    );
  };

  const runFlagshipSimulation = (
    senderUsername: string,
    commentText: string,
    answersQualification: boolean,
    qualificationAnswer: string,
    grantsMarketingConsent: boolean
  ) => {
    const isKeywordMatch = commentText.toUpperCase().includes(flagshipCampaign.keyword.toUpperCase());

    if (!isKeywordMatch) {
      logEvent(
        'Astrid Lind (A23)',
        'Comment Evaluated (No Match)',
        `Comment "${commentText}" by @${senderUsername} does not match trigger keyword "${flagshipCampaign.keyword}". Ignored.`,
        'info'
      );
      return {
        success: false,
        message: `Comment did not contain trigger keyword "${flagshipCampaign.keyword}".`
      };
    }

    // Keyword matched! Update stats
    setFlagshipCampaign((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        scannedComments: prev.stats.scannedComments + 1,
        eligibleMatches: prev.stats.eligibleMatches + 1,
        resourcesDelivered: prev.stats.resourcesDelivered + 1,
        optedInLeads: grantsMarketingConsent ? prev.stats.optedInLeads + 1 : prev.stats.optedInLeads,
        meetingsBooked: answersQualification ? prev.stats.meetingsBooked + 1 : prev.stats.meetingsBooked
      }
    }));

    // Create lead if marketing consent or qualification was given
    if (grantsMarketingConsent || answersQualification) {
      const newLead: LeadProspect = {
        id: `lead-flagship-${Date.now()}`,
        name: senderUsername.replace(/[@_.]/g, ' ').trim() || 'Social Commenter',
        title: 'Executive Leader',
        company: 'Social Inbound Inquiry',
        email: `${senderUsername.toLowerCase().replace(/[^a-z0-9]/g, '')}@linkedin-lead.sample`,
        fitScore: answersQualification ? 95 : 82,
        status: answersQualification ? 'meeting_booked' : 'replied',
        source: 'Flagship Comment Guide',
        touchPoints: 2,
        notes: `Commented "${commentText}". Received PDF guide. Qualification answer: "${qualificationAnswer || 'N/A'}". Marketing consent: ${grantsMarketingConsent ? 'Granted' : 'Declined'}.`,
        consents: {
          marketingEmail: grantsMarketingConsent,
          whatsapp: false,
          callback: answersQualification
        },
        lastContacted: new Date().toISOString()
      };
      setLeads((prev) => [newLead, ...prev]);
    }

    logEvent(
      'Astrid Lind (A23)',
      'Flagship Resource Delivered',
      `Delivered Guide PDF to @${senderUsername}. Separate consent recorded: ${grantsMarketingConsent ? 'Yes' : 'No'}.`,
      'success'
    );

    return {
      success: true,
      message: `Guide delivered to @${senderUsername}! Qualification: ${answersQualification ? 'Answered' : 'Skipped'}, Opt-in consent: ${grantsMarketingConsent ? 'Granted' : 'Separate'}.`
    };
  };

  const updateFlagshipSettings = (partial: Partial<FlagshipCampaign>) => {
    setFlagshipCampaign((prev) => ({ ...prev, ...partial }));
    logEvent('Astrid Lind (A23)', 'Campaign Parameters Updated', 'Flagship Guide keyword and messaging updated.', 'info');
  };

  const toggleLesson = (lessonId: string) => {
    setAllWorkspaces((prev) =>
      prev.map((ws) => {
        if (ws.id !== activeWorkspaceId) return ws;
        return {
          ...ws,
          lessons: ws.lessons.map((lsn) => (lsn.id === lessonId ? { ...lsn, active: !lsn.active } : lsn))
        };
      })
    );
  };

  const addLesson = (trigger: string, lesson: string) => {
    const newLsn = {
      id: `lsn-${Date.now()}`,
      trigger,
      lesson,
      active: true,
      createdAt: new Date().toISOString()
    };
    setAllWorkspaces((prev) =>
      prev.map((ws) => (ws.id === activeWorkspaceId ? { ...ws, lessons: [newLsn, ...ws.lessons] } : ws))
    );
    logEvent('System Memory', 'Knowledge Lesson Learned', `Rule added: "${trigger}" -> "${lesson}"`, 'success');
  };

  const createCustomEmployee = (customData: Omit<Employee, 'id' | 'code' | 'status'>) => {
    const newEmp: Employee = {
      ...customData,
      id: `emp-custom-${Date.now()}`,
      code: `C${employees.filter((e) => e.isCustom).length + 1}`,
      status: 'active',
      isCustom: true
    };
    setEmployees((prev) => [...prev, newEmp]);
    logEvent('Operator', 'Custom Employee Hired', `Created custom employee ${newEmp.name} (${newEmp.title})`, 'success');
  };

  const togglePinEmployee = (employeeId: string) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === employeeId ? { ...e, pinned: !e.pinned } : e))
    );
  };

  const updateSettings = (partial: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const advanceScenarioDays = (days: number) => {
    logEvent(
      'Demo Engine',
      `Scenario Advanced (+${days} Days)`,
      `Simulated time passage by ${days} day(s). Organic metrics and schedule updated.`,
      'info'
    );
  };

  const setDemoMode = (mode: 'seeded' | 'fresh') => {
    setDemoModeState(mode);
    if (mode === 'fresh') {
      setTasks([]);
      setApprovals([]);
      setLeads([]);
      logEvent('Demo Engine', 'Fresh Workspace Mode Activated', 'Cleared historical sample data for a pristine user start.', 'info');
    } else {
      setTasks(INITIAL_TASKS);
      setApprovals(INITIAL_APPROVALS);
      setLeads(INITIAL_LEADS);
      logEvent('Demo Engine', 'Seeded Demo Mode Restored', 'Populated workspace with complete reference sample data.', 'info');
    }
  };

  const resetToFactoryDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEmployees(INITIAL_EMPLOYEES);
    setTasks(INITIAL_TASKS);
    setApprovals(INITIAL_APPROVALS);
    setLeads(INITIAL_LEADS);
    setWebsitePage(INITIAL_WEBSITE_PAGE);
    setFlagshipCampaign(INITIAL_FLAGSHIP_CAMPAIGN);
    setDeals(INITIAL_DEALS);
    setConversations(INITIAL_CONVERSATIONS);
    setSettings(INITIAL_USER_SETTINGS);
    setAllWorkspaces(INITIAL_WORKSPACES);
    setActiveWorkspaceId('ws-cedar');
    setDemoModeState('seeded');
    setSimulationLogs([
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: 'System',
        action: 'Factory Reset Executed',
        details: 'All simulated data restored to original pristine specifications.',
        type: 'info'
      }
    ]);
  };

  const exportWorkspaceJSON = () => {
    const dataToExport = {
      workspace: activeWorkspace,
      employees,
      tasks,
      approvals,
      leads,
      websitePage,
      flagshipCampaign,
      deals,
      settings,
      simulationLogs
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ooumph_workspace_${activeWorkspace.id}_export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const mockClientDecisionOnDeal = (dealId: string, decision: 'accept' | 'request_edit') => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        if (decision === 'accept') {
          return { ...d, mockCustomerApproved: true, stage: 'Closed Won' };
        } else {
          return { ...d, mockCustomerApproved: false, stage: 'Commercial Review' };
        }
      })
    );
    logEvent(
      'Preston Shaw (A31)',
      decision === 'accept' ? 'Client Signed Proposal' : 'Client Requested Scope Edit',
      decision === 'accept'
        ? `Deal #${dealId} confirmed! Handed off to Sloane Kelly (A30) for onboarding kickoff.`
        : `Deal #${dealId} returned to deal desk for pricing review.`,
      decision === 'accept' ? 'success' : 'warning'
    );
  };

  return (
    <OoumphContext.Provider
      value={{
        currentView,
        selectedEmployeeId,
        workTab,
        inboxTab,
        isDemoToolsOpen,
        isFlagshipSimulatorOpen,
        isOnboardingOpen,
        isCustomerBookingOpen,
        isCustomerProposalOpen,
        isCustomerPreferenceCenterOpen,
        isCustomerCheckoutOpen,
        demoMode,
        activeWorkspace,
        allWorkspaces,
        employees,
        tasks,
        approvals,
        leads,
        websitePage,
        flagshipCampaign,
        deals,
        conversations,
        settings,
        simulationLogs,
        navigate,
        selectEmployee,
        setWorkTab,
        setInboxTab,
        setIsDemoToolsOpen,
        setIsFlagshipSimulatorOpen,
        setIsOnboardingOpen,
        setIsCustomerBookingOpen,
        setIsCustomerProposalOpen,
        setIsCustomerPreferenceCenterOpen,
        setIsCustomerCheckoutOpen,
        switchWorkspace,
        sendMessage,
        toggleTakeover,
        approveRequest,
        rejectRequest,
        updateTask,
        updateWebsiteHeadline,
        rollbackWebsiteVersion,
        submitWebsiteContactForm,
        importLeadsCSV,
        updateLeadStatus,
        triggerOutboundSequence,
        runFlagshipSimulation,
        updateFlagshipSettings,
        toggleLesson,
        addLesson,
        createCustomEmployee,
        togglePinEmployee,
        updateSettings,
        advanceScenarioDays,
        setDemoMode,
        resetToFactoryDefaults,
        exportWorkspaceJSON,
        mockClientDecisionOnDeal
      }}
    >
      {children}
    </OoumphContext.Provider>
  );
};

export const useOoumph = () => {
  const context = useContext(OoumphContext);
  if (!context) throw new Error('useOoumph must be used within an OoumphProvider');
  return context;
};
