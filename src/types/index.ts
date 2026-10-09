export type AppView = 'team' | 'work' | 'inbox' | 'sales' | 'business' | 'settings' | 'sales-hub';

export type EmployeeCategory = 
  | 'Core'
  | 'Sales Operations'
  | 'Growth & Marketing'
  | 'Content & Creative'
  | 'Operations & Support'
  | 'Strategy & Commerce';

export interface Employee {
  id: string;
  code: string; // e.g. 'A01'
  name: string;
  title: string;
  category: EmployeeCategory;
  bio: string;
  avatarColor: string; // Tailwind bg color class
  avatarInitials: string;
  capabilities: string[];
  starterPrompts: string[];
  referenceOrigin: string; // e.g. 'Marblism: Eva / Sintra: Vizzy'
  pinned?: boolean;
  status: 'active' | 'idle' | 'in_progress';
  isCustom?: boolean;
}

export interface ProductOffer {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'cohort' | 'product' | 'service';
  seatsAvailable?: number;
}

export interface Workspace {
  id: string;
  name: string;
  domain: string;
  industry: string;
  mission: string;
  audience: string;
  brandTone: string;
  approvedClaims: string[];
  restrictedPhrases?: string[];
  workingHours?: string;
  timezone?: string;
  currency?: string;
  primaryLanguage?: string;
  products?: ProductOffer[];
  faqs: { id: string; question: string; answer: string; approved: boolean }[];
  sampleDocs: { id: string; title: string; type: string; content: string }[];
  lessons: { id: string; trigger: string; lesson: string; active: boolean; createdAt: string }[];
  conflictingFacts: { id: string; claimA: string; claimB: string; resolved: boolean; resolution?: string }[];
}

export type TaskStatus = 'pending' | 'in_progress' | 'needs_review' | 'approved' | 'scheduled' | 'completed' | 'paused';

export interface Task {
  id: string;
  workspaceId: string;
  projectId?: string;
  title: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  status: TaskStatus;
  category: string;
  description: string;
  outputData: any;
  createdAt: string;
  scheduledFor?: string;
  version: number;
}

export interface ApprovalRequest {
  id: string;
  workspaceId: string;
  projectId?: string;
  title: string;
  summary: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  artifactType: string;
  artifactPayload: any;
  status: 'pending' | 'approved' | 'rejected';
  riskLevel: 'Low' | 'Medium' | 'High';
  createdAt: string;
  reviewedAt?: string;
  contextNote?: string;
}

export interface ConversationMessage {
  id: string;
  sender: 'user' | 'employee' | 'system';
  text: string;
  timestamp: string;
  suggestedAction?: string;
  actionPayload?: any;
}

export interface EmployeeConversation {
  id: string;
  workspaceId: string;
  employeeId: string;
  projectId?: string;
  messages: ConversationMessage[];
  takeover: boolean;
}

export interface LeadProspect {
  id: string;
  workspaceId: string;
  projectId?: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  fitScore: number;
  status: 'researched' | 'contacted' | 'replied' | 'meeting_booked' | 'opted_out';
  source: 'Outbound Research' | 'CSV Import' | 'Flagship Comment Guide' | 'Inbound Contact Form' | 'Website Chat' | 'Partner Referral';
  touchPoints: number;
  notes: string;
  consents: {
    marketingEmail: boolean;
    whatsapp: boolean;
    callback: boolean;
  };
  meetingTime?: string;
  lastContacted?: string;
}

export interface WebsitePage {
  id: string;
  workspaceId: string;
  slug: string;
  title: string;
  heroHeadline: string;
  heroSubheading: string;
  ctaText: string;
  bodyHtml: string;
  published: boolean;
  lastPublishedAt?: string;
  versionHistory: { version: number; headline: string; timestamp: string }[];
}

export interface FlagshipCampaign {
  id: string;
  workspaceId: string;
  projectId?: string;
  title: string;
  platform: 'Instagram' | 'LinkedIn' | 'Twitter';
  destinationAccountHandle: string;
  postHeadline: string;
  postCaption: string;
  postImagePrompt: string;
  keyword: string;
  resourceTitle: string;
  resourceDescription: string;
  publicReplyTemplate: string;
  privateDmTemplate: string;
  qualificationQuestion: string;
  active: boolean;
  stats: {
    scannedComments: number;
    eligibleMatches: number;
    resourcesDelivered: number;
    optedInLeads: number;
    meetingsBooked: number;
  };
}

export interface Deal {
  id: string;
  workspaceId: string;
  projectId?: string;
  title: string;
  clientName: string;
  contactEmail: string;
  value: number;
  stage: 'Discovery' | 'Proposal Sent' | 'Commercial Review' | 'Closed Won' | 'Onboarding';
  ownerEmployeeId: string;
  legalReviewSigned: boolean;
  mockCustomerApproved: boolean;
  createdAt: string;
}

export type ProjectStatus = 'planning' | 'in_progress' | 'needs_review' | 'completed' | 'paused';

export interface Project {
  id: string;
  workspaceId: string;
  title: string;
  objective: string;
  status: ProjectStatus;
  ownerHumanId?: string;
  participatingEmployeeIds: string[];
  workflowRunId?: string;
  dueAt?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export type WorkflowStepType = 'employee_task' | 'human_approval' | 'condition' | 'wait_schedule' | 'handoff';

export interface WorkflowStep {
  id: string;
  title: string;
  type: WorkflowStepType;
  employeeId?: string;
  employeeCode?: string;
  description: string;
  status: 'pending' | 'in_progress' | 'waiting_approval' | 'completed' | 'skipped';
  outputArtifactId?: string;
  approvalRequestId?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  outcome: string;
  shortDescription: string;
  category: string;
  participatingEmployeeIds: string[];
  expectedSteps: { title: string; employeeCode: string; type: WorkflowStepType; description: string }[];
  approvalPoints: string[];
  typicalDuration: string;
}

export interface WorkflowRun {
  id: string;
  workspaceId: string;
  templateId: string;
  templateName: string;
  title: string;
  status: 'running' | 'paused' | 'completed';
  projectId: string;
  currentStepIndex: number;
  steps: WorkflowStep[];
  startedAt: string;
  completedAt?: string;
}

export type IntegrationProvider = 
  | 'google_workspace'
  | 'gmail'
  | 'google_calendar'
  | 'meta_business'
  | 'facebook_page'
  | 'instagram_pro'
  | 'linkedin_page'
  | 'whatsapp_business'
  | 'google_ads'
  | 'website_cms'
  | 'voice_twilio'
  | 'stripe_billing';

export interface IntegrationConnection {
  id: string;
  workspaceId: string;
  provider: IntegrationProvider;
  accountName: string;
  accountHandle?: string;
  accountType: string;
  status: 'connected' | 'needs_attention' | 'expired' | 'disconnected';
  capabilities: string[];
  lastSyncAt?: string;
  connectedAt?: string;
  permissionIssues?: string[];
  parentConnectionId?: string; // e.g. Meta Business -> Page -> Instagram
}

export interface TeamMember {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'client_viewer';
  avatarInitials: string;
  status: 'active' | 'invited';
  invitedAt: string;
}

export interface ActivityEvent {
  id: string;
  workspaceId: string;
  projectId?: string;
  actorName: string;
  actorType: 'employee' | 'human' | 'system';
  action: string;
  details: string;
  timestamp: string;
}

export interface AutonomyActionRule {
  id: string;
  category: string;
  description: string;
  requiresApproval: boolean;
}

export interface EmployeeAutonomyOverride {
  employeeId: string;
  mode: 'default' | 'strict' | 'autonomous';
}

export interface UserSettings {
  timezone: string;
  currency: string;
  workingHours: string;
  primaryLanguage: string;
  autonomyLevel: 'Strict (Confirm Every Action)' | 'Balanced (Auto Draft, Confirm High-Risk)' | 'Autonomous (Execute Routine)';
  planTier: 'Starter' | 'Growth' | 'Scale';
  activeWorkspaceId: string;
  notificationPreferences: {
    approvals: boolean;
    workflowFailures: boolean;
    qualifiedLeads: boolean;
    inboundCalls: boolean;
    budgetAlerts: boolean;
    dailyDigest: boolean;
  };
  employeeOverrides: EmployeeAutonomyOverride[];
  actionRules: AutonomyActionRule[];
}

export interface SimulationLogEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'pause';
}

export interface ScheduledMeeting {
  id: string;
  workspaceId: string;
  projectId?: string;
  title: string;
  leadId?: string;
  leadName: string;
  leadCompany: string;
  leadEmail: string;
  hostEmployeeId: string;
  hostEmployeeName: string;
  hostEmployeeCode: string;
  dateTime: string;
  durationMinutes: number;
  meetingLink: string;
  agenda: string;
  status: 'scheduled' | 'completed' | 'rescheduled';
}
