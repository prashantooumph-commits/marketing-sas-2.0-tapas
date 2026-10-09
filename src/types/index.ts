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

export interface Workspace {
  id: string;
  name: string;
  domain: string;
  industry: string;
  mission: string;
  audience: string;
  brandTone: string;
  approvedClaims: string[];
  faqs: { id: string; question: string; answer: string; approved: boolean }[];
  sampleDocs: { id: string; title: string; type: string; content: string }[];
  lessons: { id: string; trigger: string; lesson: string; active: boolean; createdAt: string }[];
  conflictingFacts: { id: string; claimA: string; claimB: string; resolved: boolean; resolution?: string }[];
}

export type TaskStatus = 'pending' | 'in_progress' | 'needs_review' | 'approved' | 'scheduled' | 'completed' | 'paused';

export interface Task {
  id: string;
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
  employeeId: string;
  messages: ConversationMessage[];
  takeover: boolean;
}

export interface LeadProspect {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  fitScore: number;
  status: 'researched' | 'contacted' | 'replied' | 'meeting_booked' | 'opted_out';
  source: 'Outbound Research' | 'CSV Import' | 'Flagship Comment Guide' | 'Inbound Contact Form' | 'Website Chat';
  touchPoints: number;
  notes: string;
  consents: {
    marketingEmail: boolean;
    whatsapp: boolean;
    callback: boolean;
  };
  lastContacted?: string;
}

export interface WebsitePage {
  id: string;
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
  title: string;
  platform: 'Instagram' | 'LinkedIn' | 'Twitter';
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

export interface UserSettings {
  timezone: string;
  currency: string;
  workingHours: string;
  autonomyLevel: 'Strict (Confirm Every Action)' | 'Balanced (Auto Draft, Confirm High-Risk)' | 'Autonomous (Execute Routine)';
  planTier: 'Starter' | 'Growth' | 'Scale';
  activeWorkspaceId: string;
  notificationPreferences: {
    emailDigest: boolean;
    slackAlerts: boolean;
    highRiskApprovals: boolean;
  };
  simulatedConnections: {
    googleWorkspace: boolean;
    metaBusiness: boolean;
    linkedInPages: boolean;
    stripeBilling: boolean;
    twilioSms: boolean;
  };
}

export interface SimulationLogEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'pause';
}
