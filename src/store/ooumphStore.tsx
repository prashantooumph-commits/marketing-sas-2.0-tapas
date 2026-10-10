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
  SimulationLogEvent,
  Project,
  WorkflowTemplate,
  WorkflowRun,
  IntegrationConnection,
  IntegrationProvider,
  TeamMember,
  ActivityEvent,
  ScheduledMeeting,
  BusinessSolution,
  ProjectAsset,
  WorkflowStep,
  WorkflowStepType,
  CustomWorkflowStepConfig,
  ProjectStage,
  ProjectCollaborator,
  ProjectCollaboratorRole,
  AppView
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
  INITIAL_CONVERSATIONS,
  INITIAL_INTEGRATION_CONNECTIONS,
  INITIAL_PROJECTS,
  INITIAL_WORKFLOW_RUNS,
  INITIAL_WORKFLOW_TEMPLATES,
  INITIAL_BUSINESS_SOLUTIONS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_ACTIVITY_EVENTS,
  INITIAL_SCHEDULED_MEETINGS
} from '../data/seedData';
import { INITIAL_PERSONAL_TEMPLATES } from '../data/personalTemplates';

interface OoumphContextType {
  // Navigation & View State
  currentView: AppView;
  selectedEmployeeId: string | null;
  workTab: 'projects' | 'tasks' | 'workflows' | 'calendar' | 'assets' | 'results' | 'campaigns';
  inboxTab: 'conversations' | 'questions' | 'approvals';
  isDemoToolsOpen: boolean;
  isFlagshipSimulatorOpen: boolean;
  isOnboardingOpen: boolean;
  isCustomerBookingOpen: boolean;
  isCustomerProposalOpen: boolean;
  isCustomerPreferenceCenterOpen: boolean;
  isCustomerCheckoutOpen: boolean;
  isGoalPlannerOpen: boolean;
  isProductGuideOpen: boolean;
  isEmployeeChooserOpen: boolean;
  goalPlannerInitialGoal: string;
  employeeChooserInitialTask: string;
  selectedProjectId: string;
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
  projects: Project[];
  workflowRuns: WorkflowRun[];
  workflowTemplates: WorkflowTemplate[];
  businessSolutions: BusinessSolution[];
  integrationConnections: IntegrationConnection[];
  teamMembers: TeamMember[];
  activityEvents: ActivityEvent[];
  scheduledMeetings: ScheduledMeeting[];

  // Actions
  navigate: (view: AppView, employeeId?: string | null) => void;
  selectEmployee: (employeeId: string | null) => void;
  setWorkTab: (tab: 'projects' | 'tasks' | 'workflows' | 'calendar' | 'assets' | 'results' | 'campaigns') => void;
  setInboxTab: (tab: 'conversations' | 'questions' | 'approvals') => void;
  setIsDemoToolsOpen: (open: boolean) => void;
  setIsFlagshipSimulatorOpen: (open: boolean) => void;
  setIsOnboardingOpen: (open: boolean) => void;
  setIsCustomerBookingOpen: (open: boolean) => void;
  setIsCustomerProposalOpen: (open: boolean) => void;
  setIsCustomerPreferenceCenterOpen: (open: boolean) => void;
  setIsCustomerCheckoutOpen: (open: boolean) => void;
  setIsGoalPlannerOpen: (open: boolean) => void;
  setIsProductGuideOpen: (open: boolean) => void;
  setIsEmployeeChooserOpen: (open: boolean) => void;
  setGoalPlannerInitialGoal: (goal: string) => void;
  setEmployeeChooserInitialTask: (task: string) => void;
  setSelectedProjectId: (id: string) => void;
  selectedSolutionId: string | null;
  setSelectedSolutionId: (id: string | null) => void;
  selectedWorkflowTemplateId: string | null;
  setSelectedWorkflowTemplateId: (id: string | null) => void;
  isSolutionDetailOpen: boolean;
  setIsSolutionDetailOpen: (open: boolean) => void;
  isWorkflowDetailOpen: boolean;
  setIsWorkflowDetailOpen: (open: boolean) => void;
  isWorkflowSetupWizardOpen: boolean;
  setIsWorkflowSetupWizardOpen: (open: boolean) => void;
  wizardTargetWorkflowId: string | null;
  setWizardTargetWorkflowId: (id: string | null) => void;
  wizardTargetSolutionId: string | null;
  setWizardTargetSolutionId: (id: string | null) => void;
  openWorkflowSetup: (workflowId: string) => void;
  openBusinessSolutionSetup: (solutionId: string) => void;
  isAddTeammateModalOpen: boolean;
  setIsAddTeammateModalOpen: (open: boolean) => void;
  addTeammateTargetProjectId: string | null;
  setAddTeammateTargetProjectId: (id: string | null) => void;
  openAddTeammateModal: (projectId: string) => void;
  addProjectTeammate: (projectId: string, teammate: { type: 'ai' | 'human'; employeeId?: string; memberId?: string; taskHelp?: string; role?: ProjectCollaboratorRole }) => void;
  advanceWorkflowPhase: (projectId: string) => void;
  addWorkflowToProject: (projectId: string, workflowTemplateId: string) => void;
  submitRevisionForStep: (projectId: string, stepId: string, revisionSummary: string) => void;
  retryBlockedStep: (projectId: string, stepId: string) => void;
  skipOptionalStep: (projectId: string, stepId: string) => void;
  switchWorkspace: (workspaceId: string) => void;

  // Business Handlers
  sendMessage: (employeeId: string, text: string) => void;
  toggleTakeover: (employeeId: string) => void;
  approveRequest: (approvalId: string) => void;
  rejectRequest: (approvalId: string) => void;
  requestChangesOnApproval: (approvalId: string, feedback: string) => void;
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

  // Multi-Agent & Project Handlers
  advanceWorkflowStep: (runId: string, stepId: string) => void;
  startWorkflowFromTemplate: (templateId: string, customTitle?: string) => string;
  createProject: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (projectId: string, partial: Partial<Project>) => void;
  startProject: (projectId: string) => void;
  createProjectTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'version'>) => string;
  createApprovalRequest: (requestData: Omit<ApprovalRequest, 'id' | 'createdAt'>) => string;
  createWorkflowRun: (runData: Omit<WorkflowRun, 'id'>) => string;
  isWorkflowBuilderOpen: boolean;
  setIsWorkflowBuilderOpen: (open: boolean) => void;
  workflowBuilderEditingTemplate: WorkflowTemplate | null;
  setWorkflowBuilderEditingTemplate: (template: WorkflowTemplate | null) => void;
  workflowBuilderInitialIntent: string | null;
  setWorkflowBuilderInitialIntent: (intent: string | null) => void;
  openWorkflowBuilder: (template?: WorkflowTemplate | null, initialIntentCode?: string) => void;
  createCustomWorkflowTemplate: (templateData: Omit<WorkflowTemplate, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateCustomWorkflowTemplate: (templateId: string, updates: Partial<WorkflowTemplate>) => void;
  duplicateWorkflowTemplate: (templateId: string) => string;
  archiveWorkflowTemplate: (templateId: string) => void;
  restoreWorkflowTemplate: (templateId: string) => void;
  deleteCustomWorkflowTemplate: (templateId: string) => void;
  saveProjectAsWorkflowTemplate: (projectId: string, customName?: string) => string;

  // Integrations & Settings Handlers
  updateIntegrationStatus: (connectionId: string, status: IntegrationConnection['status'], permissionIssues?: string[]) => void;
  connectIntegration: (params: { provider: IntegrationProvider; accountName: string; accountHandle?: string; accountType?: string; capabilities?: string[]; parentConnectionId?: string }) => void;
  disconnectIntegration: (connectionId: string) => void;
  reconnectIntegration: (connectionId: string) => void;
  inviteTeamMember: (name: string, email: string, role: TeamMember['role']) => void;
  removeTeamMember: (memberId: string) => void;
  updateActionRule: (ruleId: string, requiresApproval: boolean) => void;
  updateEmployeeAutonomyOverride: (employeeId: string, mode: 'default' | 'strict' | 'autonomous') => void;
  updateWorkspaceDetails: (details: Partial<Workspace>) => void;
  isIntegrationConnectModalOpen: boolean;
  setIsIntegrationConnectModalOpen: (open: boolean) => void;
  connectingProvider: IntegrationProvider | null;
  setConnectingProvider: (provider: IntegrationProvider | null) => void;
  isIntegrationDetailOpen: boolean;
  setIsIntegrationDetailOpen: (open: boolean) => void;
  selectedIntegrationDetailId: string | null;
  setSelectedIntegrationDetailId: (id: string | null) => void;
  openConnectIntegration: (provider?: IntegrationProvider) => void;
  openIntegrationDetail: (connectionId: string) => void;

  // Sales Surface Handlers
  createDeal: (dealData: Omit<Deal, 'id' | 'createdAt' | 'legalReviewSigned' | 'mockCustomerApproved'>) => void;
  updateDealStage: (dealId: string, stage: Deal['stage']) => void;
  simulateNewInboundLead: (data?: Partial<LeadProspect>) => void;
  scheduleMeeting: (meetingData: Omit<ScheduledMeeting, 'id'>) => void;
  cancelMeeting: (meetingId: string) => void;
}

const STORAGE_KEY = 'ooumph_app_state_v1';

const OoumphContext = createContext<OoumphContextType | null>(null);

export const OoumphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentView, setCurrentView] = useState<AppView>('team');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [workTab, setWorkTab] = useState<'projects' | 'tasks' | 'workflows' | 'calendar' | 'assets' | 'results' | 'campaigns'>('projects');
  const [inboxTab, setInboxTab] = useState<'conversations' | 'questions' | 'approvals'>('approvals');
  const [isDemoToolsOpen, setIsDemoToolsOpen] = useState(false);
  const [isFlagshipSimulatorOpen, setIsFlagshipSimulatorOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCustomerBookingOpen, setIsCustomerBookingOpen] = useState(false);
  const [isCustomerProposalOpen, setIsCustomerProposalOpen] = useState(false);
  const [isCustomerPreferenceCenterOpen, setIsCustomerPreferenceCenterOpen] = useState(false);
  const [isCustomerCheckoutOpen, setIsCustomerCheckoutOpen] = useState(false);
  const [isGoalPlannerOpen, setIsGoalPlannerOpen] = useState(false);
  const [isProductGuideOpen, setIsProductGuideOpen] = useState(false);
  const [isEmployeeChooserOpen, setIsEmployeeChooserOpen] = useState(false);
  const [goalPlannerInitialGoal, setGoalPlannerInitialGoal] = useState('');
  const [employeeChooserInitialTask, setEmployeeChooserInitialTask] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-1');
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
  const [selectedWorkflowTemplateId, setSelectedWorkflowTemplateId] = useState<string | null>(null);
  const [isSolutionDetailOpen, setIsSolutionDetailOpen] = useState(false);
  const [isWorkflowDetailOpen, setIsWorkflowDetailOpen] = useState(false);
  const [isWorkflowSetupWizardOpen, setIsWorkflowSetupWizardOpen] = useState(false);
  const [wizardTargetWorkflowId, setWizardTargetWorkflowId] = useState<string | null>(null);
  const [wizardTargetSolutionId, setWizardTargetSolutionId] = useState<string | null>(null);
  const [isAddTeammateModalOpen, setIsAddTeammateModalOpen] = useState(false);
  const [addTeammateTargetProjectId, setAddTeammateTargetProjectId] = useState<string | null>(null);
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
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>(INITIAL_WORKFLOW_RUNS);
  const [workflowTemplates, setWorkflowTemplates] = useState<WorkflowTemplate[]>([
    ...INITIAL_WORKFLOW_TEMPLATES,
    ...INITIAL_PERSONAL_TEMPLATES
  ]);
  const [isWorkflowBuilderOpen, setIsWorkflowBuilderOpen] = useState(false);
  const [workflowBuilderEditingTemplate, setWorkflowBuilderEditingTemplate] = useState<WorkflowTemplate | null>(null);
  const [workflowBuilderInitialIntent, setWorkflowBuilderInitialIntent] = useState<string | null>(null);
  const [isIntegrationConnectModalOpen, setIsIntegrationConnectModalOpen] = useState(false);
  const [connectingProvider, setConnectingProvider] = useState<IntegrationProvider | null>(null);
  const [isIntegrationDetailOpen, setIsIntegrationDetailOpen] = useState(false);
  const [selectedIntegrationDetailId, setSelectedIntegrationDetailId] = useState<string | null>(null);
  const [businessSolutions] = useState<BusinessSolution[]>(INITIAL_BUSINESS_SOLUTIONS);
  const [integrationConnections, setIntegrationConnections] = useState<IntegrationConnection[]>(INITIAL_INTEGRATION_CONNECTIONS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>(INITIAL_ACTIVITY_EVENTS);
  const [scheduledMeetings, setScheduledMeetings] = useState<ScheduledMeeting[]>(INITIAL_SCHEDULED_MEETINGS);
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
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.workflowRuns) setWorkflowRuns(parsed.workflowRuns);
        if (parsed.integrationConnections) setIntegrationConnections(parsed.integrationConnections);
        if (parsed.teamMembers) setTeamMembers(parsed.teamMembers);
        if (parsed.activityEvents) setActivityEvents(parsed.activityEvents);
        if (parsed.scheduledMeetings) setScheduledMeetings(parsed.scheduledMeetings);
        if (parsed.personalTemplates && Array.isArray(parsed.personalTemplates)) {
          setWorkflowTemplates([
            ...INITIAL_WORKFLOW_TEMPLATES,
            ...parsed.personalTemplates
          ]);
        }
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
        demoMode,
        projects,
        workflowRuns,
        integrationConnections,
        teamMembers,
        activityEvents,
        scheduledMeetings,
        personalTemplates: workflowTemplates.filter((t) => t.templateSource === 'personal')
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
    demoMode,
    projects,
    workflowRuns,
    integrationConnections,
    teamMembers,
    activityEvents,
    scheduledMeetings,
    workflowTemplates
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

  const navigate = (view: AppView, employeeId?: string | null) => {
    const target = view === 'sales-hub' ? 'sales' : view;
    setCurrentView(target);
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

  const requestChangesOnApproval = (approvalId: string, feedback: string) => {
    const target = approvals.find((a) => a.id === approvalId);
    if (!target) return;

    const trimmedFeedback = feedback.trim() || 'Please revise the proposed output according to feedback.';

    setApprovals((prev) =>
      prev.map((a) =>
        a.id === approvalId
          ? {
              ...a,
              status: 'rejected',
              feedback: trimmedFeedback,
              reviewedAt: new Date().toISOString()
            }
          : a
      )
    );

    setTasks((prev) =>
      prev.map((t) =>
        t.employeeId === target.employeeId && (t.status === 'needs_review' || t.projectId === target.projectId)
          ? {
              ...t,
              status: 'in_progress' as const,
              revisionNote: trimmedFeedback,
              description: `${t.description} (Revision: ${trimmedFeedback})`
            }
          : t
      )
    );

    // Update workflow run step status to changes_requested
    if (target.workflowRunId) {
      setWorkflowRuns((prev) =>
        prev.map((r) => {
          if (r.id !== target.workflowRunId) return r;
          return {
            ...r,
            steps: r.steps.map((s) =>
              s.id === target.workflowStepId || (!target.workflowStepId && s.status === 'waiting_approval')
                ? { ...s, status: 'changes_requested' as const, revisionFeedback: trimmedFeedback }
                : s
            )
          };
        })
      );
    }

    // Update project nextImportantAction
    if (target.projectId) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== target.projectId) return p;
          return {
            ...p,
            nextImportantAction: `Revision requested: "${trimmedFeedback.slice(0, 50)}...". Specialist updating deliverable.`
          };
        })
      );
    }

    // Also send feedback directly into the employee conversation so they see it
    if (target.employeeId) {
      sendMessage(
        target.employeeId,
        `[Feedback on Approval "${target.title}"]: ${trimmedFeedback}`
      );
    }

    logEvent(
      target.employeeName,
      'Changes Requested',
      `Revision requested on "${target.title}": "${trimmedFeedback.slice(0, 50)}..."`,
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
      workspaceId: activeWorkspaceId,
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
        workspaceId: activeWorkspaceId,
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
        workspaceId: activeWorkspaceId,
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
    setProjects(INITIAL_PROJECTS);
    setWorkflowRuns(INITIAL_WORKFLOW_RUNS);
    setIntegrationConnections(INITIAL_INTEGRATION_CONNECTIONS);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setActivityEvents(INITIAL_ACTIVITY_EVENTS);
    setScheduledMeetings(INITIAL_SCHEDULED_MEETINGS);
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
      projects,
      workflowRuns,
      integrationConnections,
      teamMembers,
      activityEvents,
      scheduledMeetings,
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

  // MULTI-AGENT & PROJECT HANDLERS
  const advanceWorkflowStep = (runId: string, stepId: string) => {
    let nextStepToProcess: WorkflowStep | null = null;
    let completedStepToProcess: WorkflowStep | null = null;
    let associatedProjectId = '';

    setWorkflowRuns((prev) =>
      prev.map((run) => {
        if (run.id !== runId) return run;
        const stepIndex = run.steps.findIndex((s) => s.id === stepId);
        if (stepIndex === -1) return run;

        associatedProjectId = run.projectId;
        completedStepToProcess = run.steps[stepIndex];

        const updatedSteps = [...run.steps];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], status: 'completed' as const };

        let nextIndex = stepIndex + 1;
        let nextStatus: WorkflowRun['status'] = run.status;

        if (nextIndex < updatedSteps.length) {
          const nextStep = updatedSteps[nextIndex];
          nextStepToProcess = nextStep;

          // Check if next step requires an integration connection
          const titleLower = nextStep.title.toLowerCase();
          const descLower = nextStep.description.toLowerCase();
          let isBlocked = false;
          let blockerReason = '';

          if (titleLower.includes('meta') || titleLower.includes('instagram') || titleLower.includes('facebook') || descLower.includes('meta') || descLower.includes('instagram')) {
            const conn = integrationConnections.find((c) => c.provider === 'meta_business' || c.provider === 'facebook_page' || c.provider === 'instagram_pro');
            if (!conn || conn.status !== 'connected') {
              isBlocked = true;
              blockerReason = 'Connection required: Meta / Instagram account must be connected in Settings.';
            }
          } else if (titleLower.includes('google ads') || descLower.includes('google ads')) {
            const conn = integrationConnections.find((c) => c.provider === 'google_ads');
            if (!conn || conn.status !== 'connected') {
              isBlocked = true;
              blockerReason = 'Connection required: Google Ads account must be connected in Settings.';
            }
          }

          if (isBlocked) {
            updatedSteps[nextIndex] = {
              ...nextStep,
              status: 'blocked' as const,
              blockedReason: blockerReason
            };
          } else if (nextStep.type === 'human_approval') {
            updatedSteps[nextIndex] = {
              ...nextStep,
              status: 'waiting_approval' as const
            };
          } else {
            updatedSteps[nextIndex] = {
              ...nextStep,
              status: 'in_progress' as const
            };
          }
        } else {
          nextStatus = 'completed';
        }

        const completedStep = run.steps[stepIndex];
        logEvent(
          completedStep.employeeCode ? `${completedStep.employeeCode} Specialist` : 'Workflow Engine',
          'Workflow Step Completed',
          `Completed step "${completedStep.title}" for initiative "${run.title}".`,
          'success'
        );

        return {
          ...run,
          steps: updatedSteps,
          currentStepIndex: Math.min(nextIndex, updatedSteps.length - 1),
          status: nextStatus,
          completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined
        };
      })
    );

    // Update project with asset generation, handoffs, and stage progression
    if (completedStepToProcess && associatedProjectId) {
      const completedStep = completedStepToProcess as WorkflowStep;
      const targetEmp = employees.find((e) => e.code === completedStep.employeeCode);

      const assetType = completedStep.title.toLowerCase().includes('copy') ? 'ad_creative' :
        completedStep.title.toLowerCase().includes('page') || completedStep.title.toLowerCase().includes('site') ? 'web_page' :
        completedStep.title.toLowerCase().includes('video') ? 'video_script' :
        completedStep.title.toLowerCase().includes('seo') || completedStep.title.toLowerCase().includes('schema') ? 'schema_markup' : 'document';

      const newAsset: ProjectAsset = {
        id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        projectId: associatedProjectId,
        title: `${completedStep.title} Deliverable`,
        type: assetType as any,
        employeeCode: completedStep.employeeCode || 'A01',
        employeeName: targetEmp?.name || 'Specialist',
        createdAt: new Date().toISOString(),
        status: 'approved',
        content: `Final verified deliverable for "${completedStep.title}". Generated autonomously with full parameter alignment.`
      };

      const nextStep = nextStepToProcess as WorkflowStep | null;
      const handoffObj = nextStep ? {
        fromCode: completedStep.employeeCode || 'SYS',
        toCode: nextStep.employeeCode || 'SYS',
        message: `${completedStep.title} completed, handed off to ${nextStep.employeeCode} for ${nextStep.title}`,
        timestamp: new Date().toISOString()
      } : undefined;

      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== associatedProjectId) return p;
          const currentStageIdx = (p.stages || []).findIndex((stg) => stg.name === completedStep.title);
          const updatedStages = (p.stages || []).map((stg, i) =>
            i === currentStageIdx ? { ...stg, status: 'completed' as const } :
            i === currentStageIdx + 1 && nextStep ? { ...stg, status: 'in_progress' as const } : stg
          );

          const hasUpcoming = p.upcomingWorkflowIds && p.upcomingWorkflowIds.length > 0;
          return {
            ...p,
            projectAssets: [newAsset, ...(p.projectAssets || [])],
            handoffs: handoffObj ? [...(p.handoffs || []), handoffObj] : p.handoffs,
            stages: updatedStages,
            nextImportantAction: nextStep
              ? nextStep.type === 'human_approval'
                ? `Review pending approval gate: "${nextStep.title}"`
                : nextStep.status === 'blocked'
                ? `Action needed: ${nextStep.blockedReason || 'Connection required before stage can run.'}`
                : `Active: ${nextStep.employeeCode} executing "${nextStep.title}"`
              : hasUpcoming
              ? `Phase ${((p.currentWorkflowIndex || 0) + 1)} Complete · Click Prepare Next Phase to advance.`
              : 'Project completed successfully. All deliverables archived.',
            progressSummary: nextStep
              ? `Milestone completed. Handoff to ${nextStep.employeeCode} for "${nextStep.title}".`
              : hasUpcoming
              ? `Phase ${((p.currentWorkflowIndex || 0) + 1)} delivered. Intermediate outputs staged for next phase.`
              : 'All project milestones completed successfully.'
          };
        })
      );

      // If next step is waiting_approval, generate the ApprovalRequest
      if (nextStep && nextStep.type === 'human_approval') {
        const reqId = `appr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const nextEmp = employees.find((e) => e.code === nextStep.employeeCode);
        const newAppr: ApprovalRequest = {
          id: reqId,
          workspaceId: activeWorkspaceId,
          projectId: associatedProjectId,
          workflowRunId: runId,
          workflowStepId: nextStep.id,
          title: nextStep.title,
          summary: `${nextStep.description} — Prepared by ${nextStep.employeeCode || 'Lead Specialist'}. Awaiting human signoff.`,
          employeeId: nextEmp?.id || 'emp-a01',
          employeeName: nextEmp?.name || 'Lead Specialist',
          employeeCode: nextStep.employeeCode || 'A01',
          artifactType: nextStep.title,
          artifactPayload: { stepTitle: nextStep.title, description: nextStep.description },
          status: 'pending',
          riskLevel: 'Medium',
          createdAt: new Date().toISOString(),
          contextNote: 'Human oversight gate reached. Approval required before proceeding.'
        };
        setApprovals((prev) => [newAppr, ...prev]);
      }
    }
  };

  const advanceWorkflowPhase = (projectId: string) => {
    const proj = projects.find((p) => p.id === projectId);
    if (!proj || !proj.upcomingWorkflowIds || proj.upcomingWorkflowIds.length === 0) return;

    const nextTemplateId = proj.upcomingWorkflowIds[0];
    const nextTemplate = workflowTemplates.find((t) => t.id === nextTemplateId);
    if (!nextTemplate) return;

    const newIndex = (proj.currentWorkflowIndex || 0) + 1;
    const completedIds = [...(proj.completedWorkflowIds || []), proj.workflowTemplateId || ''];
    const remainingUpcoming = proj.upcomingWorkflowIds.slice(1);

    const newRunId = `run-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newSteps: WorkflowStep[] = nextTemplate.expectedSteps.map((s, idx) => ({
      id: `step-${newRunId}-${idx + 1}`,
      title: s.title,
      type: s.type,
      employeeCode: s.employeeCode,
      employeeId: employees.find((e) => e.code === s.employeeCode)?.id,
      description: s.description,
      status: idx === 0 ? ('in_progress' as const) : ('pending' as const)
    }));

    const newStages: ProjectStage[] = nextTemplate.expectedSteps.map((s, idx) => ({
      id: `stg-${projectId}-${newIndex + 1}-${idx + 1}`,
      name: s.title,
      ownerEmployeeCode: s.employeeCode,
      status: idx === 0 ? ('in_progress' as const) : ('pending' as const),
      type: s.type === 'human_approval' ? 'human_approval' : 'employee_task',
      description: s.description
    }));

    const newRun: WorkflowRun = {
      id: newRunId,
      workspaceId: proj.workspaceId,
      templateId: nextTemplate.id,
      templateName: nextTemplate.name,
      title: `${proj.title} · Phase ${newIndex + 1}: ${nextTemplate.name}`,
      status: 'running',
      projectId: proj.id,
      currentStepIndex: 0,
      steps: newSteps,
      startedAt: new Date().toISOString()
    };

    setWorkflowRuns((prev) => [newRun, ...prev]);

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              workflowTemplateId: nextTemplate.id,
              workflowRunId: newRunId,
              currentWorkflowIndex: newIndex,
              completedWorkflowIds: completedIds,
              upcomingWorkflowIds: remainingUpcoming,
              currentPhaseTitle: `Phase ${newIndex + 1}: ${nextTemplate.name}`,
              status: 'in_progress',
              stages: newStages,
              nextImportantAction: `Active: ${nextTemplate.expectedSteps[0]?.employeeCode} executing "${nextTemplate.expectedSteps[0]?.title}"`,
              progressSummary: `Advanced to Phase ${newIndex + 1}: ${nextTemplate.name}. Reusing approved context and deliverables.`,
              updatedAt: new Date().toISOString()
            }
          : p
      )
    );

    logEvent(
      'Multi-Agent Coordinator',
      'Phase Advanced',
      `Project "${proj.title}" advanced to Phase ${newIndex + 1}: "${nextTemplate.name}".`,
      'success'
    );
  };

  const addWorkflowToProject = (projectId: string, workflowTemplateId: string) => {
    const proj = projects.find((p) => p.id === projectId);
    const tmpl = workflowTemplates.find((t) => t.id === workflowTemplateId);
    if (!proj || !tmpl) return;

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              upcomingWorkflowIds: [...(p.upcomingWorkflowIds || []), workflowTemplateId],
              plannedWorkflowTemplateIds: [...(p.plannedWorkflowTemplateIds || []), workflowTemplateId],
              nextImportantAction: `Upcoming workflow queued: "${tmpl.name}" added to project execution plan.`
            }
          : p
      )
    );

    logEvent(
      'Workflow Coordinator',
      'Workflow Chained',
      `Appended workflow "${tmpl.name}" to project "${proj.title}".`,
      'info'
    );
  };

  const submitRevisionForStep = (projectId: string, stepId: string, revisionSummary: string) => {
    const trimmed = revisionSummary.trim() || 'Updated deliverable based on reviewer feedback.';

    setWorkflowRuns((prev) =>
      prev.map((run) => {
        if (run.projectId !== projectId) return run;
        return {
          ...run,
          steps: run.steps.map((s) =>
            s.id === stepId
              ? { ...s, status: 'waiting_approval' as const, revisionFeedback: trimmed }
              : s
          )
        };
      })
    );

    // Also update approval request
    setApprovals((prev) =>
      prev.map((a) =>
        a.workflowStepId === stepId
          ? { ...a, status: 'pending' as const, contextNote: `Revision submitted: "${trimmed}". Awaiting re-review.` }
          : a
      )
    );

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              nextImportantAction: `Revised deliverable submitted: "${trimmed.slice(0, 50)}...". Ready for review.`
            }
          : p
      )
    );

    logEvent(
      'Specialist',
      'Revision Submitted',
      `Deliverable revised: "${trimmed}". Resubmitted to approval gate.`,
      'success'
    );
  };

  const retryBlockedStep = (projectId: string, stepId: string) => {
    // Check if relevant connection is now active
    setWorkflowRuns((prev) =>
      prev.map((run) => {
        if (run.projectId !== projectId) return run;
        return {
          ...run,
          steps: run.steps.map((s) =>
            s.id === stepId && s.status === 'blocked'
              ? { ...s, status: 'in_progress' as const, blockedReason: undefined }
              : s
          )
        };
      })
    );

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              nextImportantAction: 'Connection verified. Stage execution resumed.'
            }
          : p
      )
    );

    logEvent('System', 'Connection Verified', 'Blocked stage unblocked and execution resumed.', 'success');
  };

  const skipOptionalStep = (projectId: string, stepId: string) => {
    let runId = '';
    setWorkflowRuns((prev) =>
      prev.map((run) => {
        if (run.projectId !== projectId) return run;
        runId = run.id;
        return {
          ...run,
          steps: run.steps.map((s) =>
            s.id === stepId ? { ...s, status: 'skipped' as const } : s
          )
        };
      })
    );

    if (runId) {
      advanceWorkflowStep(runId, stepId);
    }
    logEvent('Operator', 'Step Skipped', 'Optional workflow step was skipped by operator.', 'info');
  };

  const addProjectTeammate = (
    projectId: string,
    teammate: {
      type: 'ai' | 'human';
      employeeId?: string;
      memberId?: string;
      taskHelp?: string;
      role?: ProjectCollaboratorRole;
    }
  ) => {
    const targetProject = projects.find((p) => p.id === projectId);
    if (!targetProject) return;

    if (teammate.type === 'ai' && teammate.employeeId) {
      const emp = employees.find((e) => e.id === teammate.employeeId);
      if (!emp) return;

      const newTaskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const newTask: Task = {
        id: newTaskId,
        workspaceId: targetProject.workspaceId,
        projectId: targetProject.id,
        workflowRunId: targetProject.workflowRunId,
        title: `Consultation: ${teammate.taskHelp || 'Provide specialist deliverable support'}`,
        employeeId: emp.id,
        employeeName: emp.name,
        employeeCode: emp.code,
        status: 'pending',
        category: 'Project Support',
        description: teammate.taskHelp || `Assigned to collaborate on "${targetProject.title}".`,
        outputData: null,
        createdAt: new Date().toISOString(),
        version: 1
      };

      setTasks((prev) => [newTask, ...prev]);

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                participatingEmployeeIds: Array.from(new Set([...p.participatingEmployeeIds, emp.id]))
              }
            : p
        )
      );

      logEvent(
        emp.name,
        'Teammate Added',
        `${emp.name} (${emp.code}) added to project "${targetProject.title}". Task created: "${newTask.title}".`,
        'success'
      );
    } else if (teammate.type === 'human' && teammate.memberId) {
      const member = teamMembers.find((m) => m.id === teammate.memberId);
      if (!member) return;

      const newCollab: ProjectCollaborator = {
        teamMemberId: member.id,
        name: member.name,
        email: member.email,
        role: teammate.role || 'contributor'
      };

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                collaborators: [...(p.collaborators || []), newCollab]
              }
            : p
        )
      );

      logEvent(
        'Workspace Admin',
        'Collaborator Assigned',
        `${member.name} assigned as ${newCollab.role} on project "${targetProject.title}".`,
        'info'
      );
    }
  };

  const openWorkflowSetup = (workflowId: string) => {
    setWizardTargetWorkflowId(workflowId);
    setWizardTargetSolutionId(null);
    setIsWorkflowDetailOpen(false);
    setIsSolutionDetailOpen(false);
    setIsWorkflowSetupWizardOpen(true);
  };

  const openBusinessSolutionSetup = (solutionId: string) => {
    setWizardTargetSolutionId(solutionId);
    setWizardTargetWorkflowId(null);
    setIsWorkflowDetailOpen(false);
    setIsSolutionDetailOpen(false);
    setIsWorkflowSetupWizardOpen(true);
  };

  const openAddTeammateModal = (projectId: string) => {
    setAddTeammateTargetProjectId(projectId);
    setIsAddTeammateModalOpen(true);
  };

  const startWorkflowFromTemplate = (templateId: string, customTitle?: string): string => {
    const template = workflowTemplates.find(
      (t) =>
        t.id === templateId ||
        t.legacyId === templateId ||
        t.code?.toLowerCase() === templateId.toLowerCase()
    );
    if (!template) return '';

    const newRunId = `run-${Date.now()}`;
    const newProjectId = `proj-${Date.now()}`;
    const runTitle = customTitle || `${template.name} Execution`;

    const newProject: Project = {
      id: newProjectId,
      workspaceId: activeWorkspaceId,
      title: runTitle,
      objective: template.outcome,
      status: 'in_progress',
      participatingEmployeeIds: template.participatingEmployeeIds,
      workflowRunId: newRunId,
      dueAt: new Date(Date.now() + 14 * 86400000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [template.category, 'Multi-Agent']
    };

    const newSteps = template.expectedSteps.map((step, idx) => ({
      id: `step-${newRunId}-${idx + 1}`,
      title: step.title,
      type: step.type,
      employeeCode: step.employeeCode,
      employeeId: employees.find((e) => e.code === step.employeeCode)?.id,
      description: step.description,
      status: idx === 0 ? ('in_progress' as const) : ('pending' as const)
    }));

    const newRun: WorkflowRun = {
      id: newRunId,
      workspaceId: activeWorkspaceId,
      templateId: template.id,
      templateName: template.name,
      title: runTitle,
      status: 'running',
      projectId: newProjectId,
      currentStepIndex: 0,
      steps: newSteps,
      startedAt: new Date().toISOString()
    };

    setProjects((prev) => [newProject, ...prev]);
    setWorkflowRuns((prev) => [newRun, ...prev]);

    logEvent(
      'Multi-Agent Coordinator',
      'Workflow Launched',
      `Initiative "${runTitle}" started with ${template.participatingEmployeeIds.length} coordinated employees.`,
      'success'
    );

    return newRunId;
  };

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const newProjectId = `proj-${Date.now()}`;
    const newProject: Project = {
      ...projectData,
      id: newProjectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects((prev) => [newProject, ...prev]);
    setSelectedProjectId(newProjectId);
    logEvent('Initiative Lead', 'Project Created', `Objective established: "${newProject.title}"`, 'success');
    return newProjectId;
  };

  const updateProject = (projectId: string, partial: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...partial, updatedAt: new Date().toISOString() } : p))
    );
  };

  const startProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedStages = p.stages?.map((s, idx) => ({
          ...s,
          status: idx === 0 ? ('in_progress' as const) : s.status
        }));
        return {
          ...p,
          status: 'in_progress',
          stages: updatedStages,
          updatedAt: new Date().toISOString(),
          progressSummary: `Execution initiated by operator. Milestone "${p.stages?.[0]?.name || 'Initial Phase'}" is actively running.`,
          nextImportantAction: `Active: Review deliverables as specialists execute milestone 1.`
        };
      })
    );

    // Also start any linked workflow run
    setWorkflowRuns((prev) =>
      prev.map((r) => {
        if (r.projectId !== projectId) return r;
        return {
          ...r,
          status: 'running',
          steps: r.steps.map((s, idx) => ({
            ...s,
            status: idx === 0 ? ('in_progress' as const) : s.status
          }))
        };
      })
    );

    // Also start the first pending project task if one exists
    setTasks((prev) => {
      let firstUpdated = false;
      return prev.map((t) => {
        if (t.projectId === projectId && t.status === 'pending' && !firstUpdated) {
          firstUpdated = true;
          return { ...t, status: 'in_progress' as const };
        }
        return t;
      });
    });

    const targetProject = projects.find((p) => p.id === projectId);
    logEvent(
      'Initiative Lead',
      'Project Started',
      `Execution officially initiated for "${targetProject?.title || projectId}". Specialists activated.`,
      'success'
    );
  };

  const createProjectTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'version'>): string => {
    const newTaskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newTask: Task = {
      ...taskData,
      id: newTaskId,
      createdAt: new Date().toISOString(),
      version: 1
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTaskId;
  };

  const createApprovalRequest = (requestData: Omit<ApprovalRequest, 'id' | 'createdAt'>): string => {
    const newApprId = `appr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newAppr: ApprovalRequest = {
      ...requestData,
      id: newApprId,
      createdAt: new Date().toISOString()
    };
    setApprovals((prev) => [newAppr, ...prev]);
    return newApprId;
  };

  const createWorkflowRun = (runData: Omit<WorkflowRun, 'id'>): string => {
    const newRunId = `run-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newRun: WorkflowRun = {
      ...runData,
      id: newRunId
    };
    setWorkflowRuns((prev) => [newRun, ...prev]);
    return newRunId;
  };

  // INTEGRATION & SETTINGS HANDLERS
  const updateIntegrationStatus = (connectionId: string, status: IntegrationConnection['status'], permissionIssues?: string[]) => {
    setIntegrationConnections((prev) =>
      prev.map((c) =>
        c.id === connectionId
          ? {
              ...c,
              status,
              permissionIssues: permissionIssues !== undefined ? permissionIssues : c.permissionIssues,
              lastSyncAt: new Date().toISOString()
            }
          : c
      )
    );
  };

  const connectIntegration = (params: {
    provider: IntegrationProvider;
    accountName: string;
    accountHandle?: string;
    accountType?: string;
    capabilities?: string[];
    parentConnectionId?: string;
  }) => {
    const newConn: IntegrationConnection = {
      id: `conn-${params.provider}-${Date.now()}`,
      workspaceId: activeWorkspaceId,
      provider: params.provider,
      accountName: params.accountName,
      accountHandle: params.accountHandle,
      accountType: params.accountType || 'Simulated Business Connection',
      status: 'connected',
      capabilities: params.capabilities || ['Read Data', 'Publish Content', 'Webhooks'],
      connectedAt: new Date().toISOString(),
      lastSyncAt: new Date().toISOString(),
      parentConnectionId: params.parentConnectionId,
      pingLatencyMs: Math.floor(Math.random() * 25) + 20,
      apiQuotaPercent: 95,
      tokenExpiresInDays: 60,
      auditLogs: [
        {
          id: `log-init-${Date.now()}`,
          timestamp: new Date().toISOString(),
          method: 'GET',
          endpoint: '/v1/handshake',
          statusCode: 200,
          callerEmployeeCode: 'A01',
          callerName: 'System Manager',
          summary: `OAuth token authorized and permission verified for ${params.accountName}.`
        }
      ]
    };

    setIntegrationConnections((prev) => {
      const filtered = prev.filter((c) => !(c.workspaceId === activeWorkspaceId && c.provider === params.provider && !params.parentConnectionId));
      return [...filtered, newConn];
    });

    logEvent('Integration Manager', 'Channel Connected', `Successfully connected ${params.accountName} (${params.provider}).`, 'success');
  };

  const openConnectIntegration = (provider?: IntegrationProvider) => {
    setConnectingProvider(provider || null);
    setIsIntegrationConnectModalOpen(true);
  };

  const openIntegrationDetail = (connectionId: string) => {
    setSelectedIntegrationDetailId(connectionId);
    setIsIntegrationDetailOpen(true);
  };

  const openWorkflowBuilder = (template?: WorkflowTemplate | null, initialIntentCode?: string) => {
    setWorkflowBuilderEditingTemplate(template || null);
    setWorkflowBuilderInitialIntent(initialIntentCode || null);
    setIsWorkflowBuilderOpen(true);
  };

  const createCustomWorkflowTemplate = (
    templateData: Omit<WorkflowTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): string => {
    const newId = `tmpl-custom-${Date.now()}`;
    const personalCount = workflowTemplates.filter((t) => t.templateSource === 'personal').length;
    const newTemplate: WorkflowTemplate = {
      ...templateData,
      id: newId,
      code: `CUSTOM-${personalCount + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      templateSource: 'personal',
      status: 'active',
      version: 1,
      editable: true,
      workspaceId: activeWorkspaceId
    };

    setWorkflowTemplates((prev) => [newTemplate, ...prev]);
    logEvent(
      'Business Owner',
      'Custom Workflow Created',
      `Authored custom workflow "${newTemplate.name}" with ${newTemplate.expectedSteps?.length || 0} stages.`,
      'success'
    );
    return newId;
  };

  const updateCustomWorkflowTemplate = (
    templateId: string,
    updates: Partial<WorkflowTemplate>
  ) => {
    setWorkflowTemplates((prev) =>
      prev.map((t) => {
        if (t.id !== templateId) return t;
        const newVersion = (t.version || 1) + 1;
        return {
          ...t,
          ...updates,
          version: newVersion,
          updatedAt: new Date().toISOString()
        };
      })
    );
    logEvent(
      'Business Owner',
      'Workflow Template Updated',
      `Updated template "${updates.name || 'Template'}". Changes apply to future runs. Existing Projects are unchanged.`,
      'info'
    );
  };

  const duplicateWorkflowTemplate = (templateId: string): string => {
    const original = workflowTemplates.find((t) => t.id === templateId);
    if (!original) return '';
    const newId = `tmpl-custom-${Date.now()}`;
    const personalCount = workflowTemplates.filter((t) => t.templateSource === 'personal').length;
    const copyName = `${original.name} — Copy`;
    const newTemplate: WorkflowTemplate = {
      ...original,
      id: newId,
      code: `CUSTOM-${personalCount + 1}`,
      name: copyName,
      title: copyName,
      templateSource: 'personal',
      status: 'active',
      version: 1,
      editable: true,
      workspaceId: activeWorkspaceId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setWorkflowTemplates((prev) => [newTemplate, ...prev]);
    logEvent(
      'Business Owner',
      'Workflow Template Duplicated',
      `Created personal template copy "${copyName}". Original remains unchanged.`,
      'info'
    );
    // Requirement 13: Open the new copy in Workflow Builder. Never mutate the original.
    openWorkflowBuilder(newTemplate);
    return newId;
  };

  const archiveWorkflowTemplate = (templateId: string) => {
    setWorkflowTemplates((prev) =>
      prev.map((t) => (t.id === templateId ? { ...t, status: 'archived', updatedAt: new Date().toISOString() } : t))
    );
    logEvent('Business Owner', 'Template Archived', `Archived template from active view. Historical projects are preserved.`, 'info');
  };

  const restoreWorkflowTemplate = (templateId: string) => {
    setWorkflowTemplates((prev) =>
      prev.map((t) => (t.id === templateId ? { ...t, status: 'active', updatedAt: new Date().toISOString() } : t))
    );
    logEvent('Business Owner', 'Template Restored', `Restored template to active library.`, 'success');
  };

  const deleteCustomWorkflowTemplate = (templateId: string) => {
    setWorkflowTemplates((prev) => prev.filter((t) => t.id !== templateId));
    logEvent('Business Owner', 'Workflow Template Removed', `Deleted custom workflow template. Existing project history will remain.`, 'info');
  };

  const saveProjectAsWorkflowTemplate = (projectId: string, customName?: string): string => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return '';
    const run = workflowRuns.find((r) => r.projectId === projectId);
    const newId = `tmpl-custom-${Date.now()}`;
    const personalCount = workflowTemplates.filter((t) => t.templateSource === 'personal').length;
    const templateName = customName?.trim() || `${project.title} Playbook`;

    // Convert project stages/steps into generic reusable steps with placeholder roles
    const genericSteps = (run?.steps && run.steps.length > 0)
      ? run.steps.map((st) => ({
          title: st.title,
          employeeCode: st.employeeCode || 'A01',
          type: st.type,
          description: st.description
        }))
      : (project.stages && project.stages.length > 0)
      ? project.stages.map((stg) => ({
          title: stg.name,
          employeeCode: stg.ownerEmployeeCode || 'A01',
          type: stg.type === 'human_approval' ? ('human_approval' as WorkflowStepType) : ('employee_task' as WorkflowStepType),
          description: stg.description || stg.name
        }))
      : [
          { title: 'Project Scoping & Strategy', employeeCode: 'A08', type: 'employee_task' as WorkflowStepType, description: 'Establish scope and objectives.' },
          { title: 'Content & Campaign Execution', employeeCode: 'A02', type: 'employee_task' as WorkflowStepType, description: 'Produce deliverables.' },
          { title: 'Human Approval Gate', employeeCode: 'A01', type: 'human_approval' as WorkflowStepType, description: 'Review and approve output.' }
        ];

    const richSteps: CustomWorkflowStepConfig[] = (run?.steps && run.steps.length > 0)
      ? run.steps.map((st, idx) => ({
          id: `step-${idx + 1}`,
          title: st.title,
          type: st.type,
          employeeCode: st.employeeCode || 'A01',
          humanAssigneeName: st.type === 'human_task' ? 'Workspace Teammate' : undefined,
          humanAssigneeRole: st.type === 'human_task' ? 'Workspace Teammate' : undefined,
          description: st.description,
          expectedOutput: st.type === 'human_approval' ? 'Human Approval Signoff' : 'Deliverables Package',
          impactCategory: st.type === 'human_approval' ? 'public_publishing' : 'internal_work',
          conditionConfig: st.conditionConfig,
          waitConfig: st.waitConfig,
          handoffConfig: st.handoffConfig,
          approvalConfig: st.type === 'human_approval' ? {
            approverRole: 'Project Approver',
            subjectToApprove: st.title,
            riskCategory: 'Governance Gate',
            onApproveAction: 'Advance to next workflow stage',
            onRequestChangesAction: 'Request revision from responsible specialist'
          } : undefined
        }))
      : genericSteps.map((st, idx) => ({
          id: `step-${idx + 1}`,
          title: st.title,
          type: st.type,
          employeeCode: st.employeeCode,
          humanAssigneeRole: st.type === 'human_task' ? 'Workspace Teammate' : undefined,
          description: st.description,
          expectedOutput: st.type === 'human_approval' ? 'Human Approval Signoff' : 'Deliverables Package',
          impactCategory: st.type === 'human_approval' ? 'public_publishing' : 'internal_work'
        }));

    const newTemplate: WorkflowTemplate = {
      id: newId,
      code: `CUSTOM-${personalCount + 1}`,
      name: templateName,
      title: templateName,
      outcome: project.objective,
      category: 'Custom',
      shortDescription: `Reusable execution playbook captured from project "${project.title}".`,
      description: `Created from project "${project.title}". Reusable multi-agent process with sanitized placeholders.`,
      typicalDuration: '1-2 weeks',
      complexity: 'moderate',
      participatingEmployeeIds: project.participatingEmployeeIds,
      employeeIds: project.participatingEmployeeIds,
      expectedSteps: genericSteps,
      approvalPoints: genericSteps.filter((s) => s.type === 'human_approval').map((s) => s.title),
      requiredConnectionTypes: project.requiredConnections?.map((c) => c.provider) || [],
      inputs: ['Project Scope Brief', 'Target Audience Context'],
      outputs: project.deliverables || ['Execution Deliverables Package'],
      successMetrics: project.successMetrics || ['Milestone Completion: Target 100%'],
      templateSource: 'personal',
      status: 'active',
      version: 1,
      editable: true,
      workspaceId: activeWorkspaceId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      richSteps,
      trigger: {
        type: 'PROJECT_CREATED',
        label: 'Project Created Trigger',
        description: 'Automatically initiated when a matching business project is initialized.'
      }
    };

    setWorkflowTemplates((prev) => [newTemplate, ...prev]);
    logEvent(
      'Business Owner',
      'Project Saved as Template',
      `Captured reusable template "${templateName}" from project. Private contact and transaction data excluded.`,
      'success'
    );
    return newId;
  };

  const disconnectIntegration = (connectionId: string) => {
    const target = integrationConnections.find((c) => c.id === connectionId);
    if (!target) return;
    setIntegrationConnections((prev) =>
      prev.map((c) => (c.id === connectionId ? { ...c, status: 'disconnected', permissionIssues: undefined } : c))
    );
    logEvent('Integration Manager', 'Channel Disconnected', `Disconnected ${target.accountName}. Associated automation will pause.`, 'warning');
  };

  const reconnectIntegration = (connectionId: string) => {
    const target = integrationConnections.find((c) => c.id === connectionId);
    if (!target) return;
    setIntegrationConnections((prev) =>
      prev.map((c) => (c.id === connectionId ? { ...c, status: 'connected', permissionIssues: undefined, lastSyncAt: new Date().toISOString() } : c))
    );
    logEvent('Integration Manager', 'Channel Re-authenticated', `Re-connected ${target.accountName} with refreshed permissions.`, 'success');
  };

  const inviteTeamMember = (name: string, email: string, role: TeamMember['role']) => {
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      workspaceId: activeWorkspaceId,
      name,
      email,
      role,
      avatarInitials: name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() || 'TM',
      status: 'invited',
      invitedAt: new Date().toISOString()
    };
    setTeamMembers((prev) => [...prev, newMember]);
    logEvent('Workspace Admin', 'Collaborator Invited', `Sent invitation to ${name} (${email}) as ${role}.`, 'info');
  };

  const removeTeamMember = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId);
    setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));
    if (member) {
      logEvent('Workspace Admin', 'Collaborator Removed', `Removed ${member.name} from workspace seats.`, 'warning');
    }
  };

  const updateActionRule = (ruleId: string, requiresApproval: boolean) => {
    setSettings((prev) => ({
      ...prev,
      actionRules: prev.actionRules.map((r) => (r.id === ruleId ? { ...r, requiresApproval } : r))
    }));
  };

  const updateEmployeeAutonomyOverride = (employeeId: string, mode: 'default' | 'strict' | 'autonomous') => {
    setSettings((prev) => {
      const filtered = prev.employeeOverrides.filter((o) => o.employeeId !== employeeId);
      return {
        ...prev,
        employeeOverrides: [...filtered, { employeeId, mode }]
      };
    });
  };

  const updateWorkspaceDetails = (details: Partial<Workspace>) => {
    setAllWorkspaces((prev) =>
      prev.map((ws) => (ws.id === activeWorkspaceId ? { ...ws, ...details } : ws))
    );
    logEvent('Business Owner', 'Workspace Details Updated', `Updated core operational parameters for ${details.name || activeWorkspace.name}.`, 'info');
  };

  // SALES SURFACE HANDLERS
  const createDeal = (dealData: Omit<Deal, 'id' | 'createdAt' | 'legalReviewSigned' | 'mockCustomerApproved'>) => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      legalReviewSigned: false,
      mockCustomerApproved: false,
      createdAt: new Date().toISOString()
    };
    setDeals((prev) => [newDeal, ...prev]);
    logEvent('Marcus Ward (A09)', 'Deal Created', `Added "${newDeal.title}" ($${newDeal.value.toLocaleString()}) to ${newDeal.stage} stage.`, 'success');
  };

  const updateDealStage = (dealId: string, stage: Deal['stage']) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage } : d))
    );
    const deal = deals.find((d) => d.id === dealId);
    logEvent(
      'Marcus Ward (A09)',
      'Deal Stage Advanced',
      `"${deal?.title || 'Deal'}" advanced to ${stage}.`,
      stage === 'Closed Won' ? 'success' : 'info'
    );
  };

  const simulateNewInboundLead = (data?: Partial<LeadProspect>) => {
    const names = ['Michael Sterling', 'Amanda Torres', 'Kieran Patel', 'Chloe Davenport'];
    const companies = ['Northwest Health Systems', 'Acumen Financial', 'Summit Logistics', 'Vertex Design Group'];
    const idx = Math.floor(Math.random() * names.length);
    const name = data?.name || names[idx];
    const company = data?.company || companies[idx];
    const email = data?.email || `${name.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(/[^a-z]/g, '')}.com`;

    const newLead: LeadProspect = {
      id: `lead-inbound-${Date.now()}`,
      workspaceId: activeWorkspaceId,
      name,
      title: data?.title || 'VP Operations',
      company,
      email,
      phone: '+1 (415) 555-0144',
      fitScore: data?.fitScore || 92,
      status: data?.status || 'replied',
      source: data?.source || 'Inbound Contact Form',
      touchPoints: 1,
      notes: data?.notes || 'Inbound request for executive management cohort. Qualified by Jordan Bell (A17).',
      consents: { marketingEmail: true, whatsapp: true, callback: true },
      lastContacted: new Date().toISOString()
    };

    setLeads((prev) => [newLead, ...prev]);
    logEvent('Jordan Bell (A17)', 'Inbound Lead Qualified', `Simulated new verified inbound lead: ${name} (${company}).`, 'success');
  };

  const scheduleMeeting = (meetingData: Omit<ScheduledMeeting, 'id'>) => {
    const newMeet: ScheduledMeeting = {
      ...meetingData,
      id: `meet-${Date.now()}`
    };
    setScheduledMeetings((prev) => [newMeet, ...prev]);

    if (meetingData.leadId) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === meetingData.leadId
            ? { ...l, status: 'meeting_booked', meetingTime: meetingData.dateTime }
            : l
        )
      );
    }

    logEvent('Aria Vance (A01)', 'Meeting Scheduled', `Confirmed "${newMeet.title}" on ${newMeet.dateTime}. Calendar defense active.`, 'success');
  };

  const cancelMeeting = (meetingId: string) => {
    setScheduledMeetings((prev) =>
      prev.map((m) => (m.id === meetingId ? { ...m, status: 'rescheduled' } : m))
    );
    logEvent('Aria Vance (A01)', 'Meeting Slot Freed', `Cancelled meeting #${meetingId}. Calendar buffer restored.`, 'info');
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
        isGoalPlannerOpen,
        isProductGuideOpen,
        isEmployeeChooserOpen,
        goalPlannerInitialGoal,
        employeeChooserInitialTask,
        selectedProjectId,
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
        projects,
        workflowRuns,
        workflowTemplates,
        businessSolutions,
        integrationConnections,
        teamMembers,
        activityEvents,
        scheduledMeetings,
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
        setIsGoalPlannerOpen,
        setIsProductGuideOpen,
        setIsEmployeeChooserOpen,
        setGoalPlannerInitialGoal,
        setEmployeeChooserInitialTask,
        setSelectedProjectId,
        selectedSolutionId,
        setSelectedSolutionId,
        selectedWorkflowTemplateId,
        setSelectedWorkflowTemplateId,
        isSolutionDetailOpen,
        setIsSolutionDetailOpen,
        isWorkflowDetailOpen,
        setIsWorkflowDetailOpen,
        isWorkflowSetupWizardOpen,
        setIsWorkflowSetupWizardOpen,
        wizardTargetWorkflowId,
        setWizardTargetWorkflowId,
        wizardTargetSolutionId,
        setWizardTargetSolutionId,
        openWorkflowSetup,
        openBusinessSolutionSetup,
        isAddTeammateModalOpen,
        setIsAddTeammateModalOpen,
        addTeammateTargetProjectId,
        setAddTeammateTargetProjectId,
        openAddTeammateModal,
        addProjectTeammate,
        advanceWorkflowPhase,
        addWorkflowToProject,
        submitRevisionForStep,
        retryBlockedStep,
        skipOptionalStep,
        switchWorkspace,
        sendMessage,
        toggleTakeover,
        approveRequest,
        rejectRequest,
        requestChangesOnApproval,
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
        mockClientDecisionOnDeal,
        advanceWorkflowStep,
        startWorkflowFromTemplate,
        createProject,
        updateProject,
        startProject,
        createProjectTask,
        createApprovalRequest,
        createWorkflowRun,
        isWorkflowBuilderOpen,
        setIsWorkflowBuilderOpen,
        workflowBuilderEditingTemplate,
        setWorkflowBuilderEditingTemplate,
        workflowBuilderInitialIntent,
        setWorkflowBuilderInitialIntent,
        openWorkflowBuilder,
        createCustomWorkflowTemplate,
        updateCustomWorkflowTemplate,
        duplicateWorkflowTemplate,
        archiveWorkflowTemplate,
        restoreWorkflowTemplate,
        deleteCustomWorkflowTemplate,
        saveProjectAsWorkflowTemplate,
        isIntegrationConnectModalOpen,
        setIsIntegrationConnectModalOpen,
        connectingProvider,
        setConnectingProvider,
        isIntegrationDetailOpen,
        setIsIntegrationDetailOpen,
        selectedIntegrationDetailId,
        setSelectedIntegrationDetailId,
        openConnectIntegration,
        openIntegrationDetail,
        updateIntegrationStatus,
        connectIntegration,
        disconnectIntegration,
        reconnectIntegration,
        inviteTeamMember,
        removeTeamMember,
        updateActionRule,
        updateEmployeeAutonomyOverride,
        updateWorkspaceDetails,
        createDeal,
        updateDealStage,
        simulateNewInboundLead,
        scheduleMeeting,
        cancelMeeting
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
