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
  bestFor?: string;
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
  workflowRunId?: string;
  workflowStepId?: string;
  revisionNote?: string;
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

export interface ProjectAsset {
  id: string;
  projectId: string;
  title: string;
  type: 'document' | 'web_page' | 'article' | 'social_post' | 'video_script' | 'ad_creative' | 'email_sequence' | 'report' | 'schema_markup';
  employeeCode: string;
  employeeName: string;
  createdAt: string;
  status: 'draft' | 'ready_for_review' | 'approved' | 'published';
  content?: string;
  metadata?: Record<string, any>;
}

export interface ApprovalRequest {
  id: string;
  workspaceId: string;
  projectId?: string;
  workflowRunId?: string;
  workflowStepId?: string;
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
  reviewedBy?: string;
  feedback?: string;
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

export type GoalIntent =
  | 'BRAND_FOUNDATION'
  | 'WEBSITE_LAUNCH'
  | 'SEO_VISIBILITY'
  | 'AEO_GEO_VISIBILITY'
  | 'CONTENT_ENGINE'
  | 'AWARENESS_CAMPAIGN'
  | 'LEAD_GENERATION'
  | 'PRODUCT_LAUNCH'
  | 'ECOMMERCE_GROWTH'
  | 'EVENT_WEBINAR'
  | 'OUTBOUND_SALES'
  | 'INBOUND_SALES'
  | 'RETENTION_RENEWAL'
  | 'REPUTATION_MANAGEMENT'
  | 'CUSTOM';

export type ProjectStatus = 'planning' | 'ready' | 'in_progress' | 'needs_review' | 'completed' | 'paused';

export interface ProjectStage {
  id: string;
  name: string;
  ownerEmployeeCode: string;
  status: 'completed' | 'in_progress' | 'pending';
  description?: string;
  type?: 'employee_task' | 'human_approval';
}

export type ProjectCollaboratorRole = 'project_owner' | 'contributor' | 'approver' | 'viewer';

export interface ProjectCollaborator {
  teamMemberId: string;
  name: string;
  email: string;
  role: ProjectCollaboratorRole;
}

export interface ProjectHandoff {
  fromCode: string;
  toCode: string;
  message: string;
  timestamp: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  title: string;
  objective: string;
  status: ProjectStatus;
  ownerHumanId?: string;
  participatingEmployeeIds: string[];
  workflowRunId?: string;
  workflowTemplateId?: string;
  intent?: GoalIntent;
  dueAt?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  // Goal Planner & Project Overview extensions:
  offer?: string;
  audience?: string;
  geography?: string;
  channels?: string[];
  approximateBudget?: string;
  employeeResponsibilities?: Record<string, string>; // employeeId -> responsibility description
  nextImportantAction?: string;
  progressSummary?: string;
  stages?: ProjectStage[];
  deliverables?: string[];
  successMetrics?: string[];
  requiredConnections?: { provider: IntegrationProvider; label: string; ready: boolean }[];
  approvalPolicies?: string[];
  humanApproverId?: string;
  collaborators?: ProjectCollaborator[];
  handoffs?: ProjectHandoff[];
  // Phase 2B.2 Business Solution & Orchestration extensions:
  businessSolutionId?: string;
  plannedWorkflowTemplateIds?: string[];
  currentWorkflowIndex?: number;
  completedWorkflowIds?: string[];
  upcomingWorkflowIds?: string[];
  currentPhaseTitle?: string;
  targetMetricsValues?: Record<string, string>;
  projectAssets?: ProjectAsset[];
  connectionBlockers?: string[];
}

export type WorkflowStepType =
  | 'employee_task'
  | 'human_task'
  | 'human_approval'
  | 'condition'
  | 'wait_schedule'
  | 'handoff';

export type StepImpactCategory =
  | 'internal_work'
  | 'public_publishing'
  | 'paid_advertising'
  | 'outbound_messaging'
  | 'new_audience_contact'
  | 'commercial_commitment'
  | 'reputation_response'
  | 'pricing_change'
  | 'destructive_action';

export interface WorkflowConditionConfig {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'is_true';
  value: string;
  thenStepId?: string;
  elseStepId?: string;
  thenActionDescription?: string;
  elseActionDescription?: string;
}

export interface WorkflowWaitConfig {
  waitType: 'duration' | 'date_time' | 'simulated_event';
  durationValue?: string;
  dateTimeValue?: string;
  simulatedEventName?: string;
}

export interface WorkflowHandoffConfig {
  fromEmployeeCode: string;
  toEmployeeCode: string;
  contextArtifacts: string[];
  handoffNote?: string;
}

export interface WorkflowApprovalConfig {
  approverRole: string;
  approverName?: string;
  subjectToApprove: string;
  riskCategory: string;
  onApproveAction: string;
  onRequestChangesAction: string;
}

export interface CustomWorkflowStepConfig {
  id: string;
  title: string;
  type: WorkflowStepType;
  employeeCode?: string;
  employeeId?: string;
  humanAssigneeName?: string;
  humanAssigneeRole?: string;
  description: string;
  inputs?: string[];
  expectedOutput?: string;
  requiredForNextStep?: boolean;
  impactCategory?: StepImpactCategory;
  requiredConnections?: IntegrationProvider[];
  conditionConfig?: WorkflowConditionConfig;
  waitConfig?: WorkflowWaitConfig;
  handoffConfig?: WorkflowHandoffConfig;
  approvalConfig?: WorkflowApprovalConfig;
}

export type WorkflowTriggerType =
  | 'MANUAL'
  | 'SCHEDULE'
  | 'NEW_FORM_SUBMISSION'
  | 'NEW_LEAD'
  | 'SOCIAL_COMMENT_KEYWORD'
  | 'NEW_INBOUND_MESSAGE'
  | 'NEW_ORDER'
  | 'DEAL_STAGE_CHANGED'
  | 'WORKFLOW_COMPLETED'
  | 'PROJECT_CREATED';

export interface WorkflowTriggerConfig {
  type: WorkflowTriggerType;
  label: string;
  description: string;
  scheduleRecurrence?: 'daily' | 'weekdays' | 'weekly' | 'monthly' | 'custom';
  scheduleTime?: string;
  scheduleDayOfWeek?: string;
  keyword?: string;
  sourceChannel?: string;
  parentWorkflowId?: string;
  simulatedEventNote?: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  type: WorkflowStepType;
  employeeId?: string;
  employeeCode?: string;
  description: string;
  status: 'pending' | 'in_progress' | 'waiting_approval' | 'completed' | 'skipped' | 'changes_requested' | 'blocked';
  outputArtifactId?: string;
  approvalRequestId?: string;
  blockedReason?: string;
  requiredConnection?: IntegrationProvider;
  revisionFeedback?: string;
}

export interface BusinessSolution {
  id: string; // 'bs-01' to 'bs-15'
  code: string; // 'BS01' to 'BS15'
  title: string;
  outcomeCategory: string; // one of 15 outcome categories
  shortPromise: string;
  description: string;
  bestFor: string;
  workflowTemplateIds: string[];
  employeeIds: string[];
  requiredConnectionTypes: string[];
  optionalConnectionTypes: string[];
  approvalGateTypes: string[];
  majorOutputs: string[];
  successMetrics: string[];
  recommendedNextSolutionIds: string[];
  tags: string[];
  featured: boolean;
  complexity: 'starter' | 'moderate' | 'advanced';
}

export interface WorkflowTemplate {
  id: string;
  code?: string; // 'WF01' to 'WF54'
  legacyId?: string; // legacy backwards-compat ID
  name: string;
  title?: string;
  outcome: string;
  outcomeCategory?: string;
  shortDescription: string;
  description?: string;
  category: string;
  bestFor?: string;
  employeeIds?: string[];
  participatingEmployeeIds: string[];
  expectedSteps: { title: string; employeeCode: string; type: WorkflowStepType; description: string }[];
  steps?: { title: string; employeeCode: string; type: WorkflowStepType; description: string }[];
  approvalPoints: string[];
  approvalGates?: string[];
  typicalDuration: string;
  requiredConnectionTypes?: string[];
  optionalConnectionTypes?: string[];
  inputs?: string[];
  outputs?: string[];
  successMetrics?: string[];
  possibleBlockers?: string[];
  recommendedNextWorkflowIds?: string[];
  tags?: string[];
  featured?: boolean;
  complexity?: 'simple' | 'moderate' | 'comprehensive';
  templateSource?: 'built_in' | 'personal';
  exampleScenario?: string;
  // Phase 2C.1 Reusable Custom Template & Authoring fields:
  status?: 'draft' | 'active' | 'archived';
  createdAt?: string;
  updatedAt?: string;
  version?: number;
  createdBy?: string;
  editable?: boolean;
  workspaceId?: string;
  trigger?: WorkflowTriggerConfig;
  richSteps?: CustomWorkflowStepConfig[];
}

export interface WorkflowRun {
  id: string;
  workspaceId: string;
  templateId: string;
  templateName: string;
  title: string;
  status: 'ready_to_start' | 'running' | 'paused' | 'completed';
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

export type WorkspaceRole = 'owner' | 'admin' | 'operator' | 'approver' | 'client_reviewer' | 'member' | 'client_viewer';

export interface TeamMember {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  role: WorkspaceRole;
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
