import {
  Task,
  ApprovalRequest,
  LeadProspect,
  WebsitePage,
  FlagshipCampaign,
  Deal,
  EmployeeConversation,
  UserSettings,
  Project,
  WorkflowTemplate,
  WorkflowRun,
  IntegrationConnection,
  TeamMember,
  ActivityEvent,
  ScheduledMeeting
} from '../types';

export const INITIAL_USER_SETTINGS: UserSettings = {
  timezone: 'America/Los_Angeles (PST)',
  currency: 'USD ($)',
  workingHours: '09:00 - 18:00 PST (Mon - Fri)',
  primaryLanguage: 'English (US)',
  autonomyLevel: 'Balanced (Auto Draft, Confirm High-Risk)',
  planTier: 'Growth',
  activeWorkspaceId: 'ws-cedar',
  notificationPreferences: {
    approvals: true,
    workflowFailures: true,
    qualifiedLeads: true,
    inboundCalls: true,
    budgetAlerts: true,
    dailyDigest: true
  },
  employeeOverrides: [
    { employeeId: 'emp-a01', mode: 'autonomous' },
    { employeeId: 'emp-a06', mode: 'strict' },
    { employeeId: 'emp-a24', mode: 'strict' }
  ],
  actionRules: [
    { id: 'rule-1', category: 'Paid Media', description: 'Any paid ad launch or budget adjustment > $0', requiresApproval: true },
    { id: 'rule-2', category: 'Commercial Agreements', description: 'Generating or sending proposals, NDAs, or fee schedules', requiresApproval: true },
    { id: 'rule-3', category: 'Public Social', description: 'Publishing live posts to connected LinkedIn or Instagram accounts', requiresApproval: true },
    { id: 'rule-4', category: 'Email Outreach', description: 'Outbound cold sequences sent to new prospect domains', requiresApproval: true },
    { id: 'rule-5', category: 'Inbox Triage', description: 'Drafting routine email responses and calendar buffers', requiresApproval: false }
  ]
};

export const INITIAL_INTEGRATION_CONNECTIONS: IntegrationConnection[] = [
  // CEDAR & CO CONNECTIONS
  {
    id: 'conn-meta-biz-cedar',
    workspaceId: 'ws-cedar',
    provider: 'meta_business',
    accountName: 'Cedar & Co Learning Inc.',
    accountType: 'Business Portfolio (Meta Business Suite)',
    status: 'connected',
    capabilities: ['Page Administration', 'Ad Account Oversight', 'Asset Sharing'],
    connectedAt: '2026-08-10T10:00:00Z',
    lastSyncAt: '2026-10-09T03:00:00Z'
  },
  {
    id: 'conn-fb-page-cedar',
    workspaceId: 'ws-cedar',
    parentConnectionId: 'conn-meta-biz-cedar',
    provider: 'facebook_page',
    accountName: 'Cedar & Co Learning Official',
    accountHandle: 'cedarandlearning',
    accountType: 'Facebook Verified Page',
    status: 'connected',
    capabilities: ['Feed Publishing', 'Comment Triage', 'Messenger Routing'],
    connectedAt: '2026-08-10T10:05:00Z',
    lastSyncAt: '2026-10-09T03:00:00Z'
  },
  {
    id: 'conn-ig-pro-cedar',
    workspaceId: 'ws-cedar',
    parentConnectionId: 'conn-fb-page-cedar',
    provider: 'instagram_pro',
    accountName: 'Cedar & Co Leadership',
    accountHandle: '@cedarlearning',
    accountType: 'Instagram Professional Creator',
    status: 'connected',
    capabilities: ['Feed & Reel Publishing', 'Comment Scanning', 'Direct Message Guide Delivery', 'Insights'],
    connectedAt: '2026-08-10T10:10:00Z',
    lastSyncAt: '2026-10-09T03:15:00Z'
  },
  {
    id: 'conn-linkedin-cedar',
    workspaceId: 'ws-cedar',
    provider: 'linkedin_page',
    accountName: 'Cedar & Co Executive Education',
    accountHandle: 'company/cedar-and-co-learning',
    accountType: 'LinkedIn Company Page',
    status: 'connected',
    capabilities: ['Thought Leadership Publishing', 'Comment Moderation', 'Lead Gen Analytics'],
    connectedAt: '2026-07-15T09:00:00Z',
    lastSyncAt: '2026-10-09T02:45:00Z'
  },
  {
    id: 'conn-gsuite-cedar',
    workspaceId: 'ws-cedar',
    provider: 'google_workspace',
    accountName: 'Cedar & Co Faculty G-Suite',
    accountHandle: 'admin@cedarlearning.co',
    accountType: 'Google Workspace Enterprise',
    status: 'connected',
    capabilities: ['Executive Inbox Sync', 'Google Calendar Defense', 'Drive Document Access'],
    connectedAt: '2026-06-01T12:00:00Z',
    lastSyncAt: '2026-10-09T03:30:00Z'
  },
  {
    id: 'conn-twilio-cedar',
    workspaceId: 'ws-cedar',
    provider: 'voice_twilio',
    accountName: 'Executive Inbound Line (+1 415-555-0199)',
    accountHandle: '+14155550199',
    accountType: 'Virtual Voice & SMS Number',
    status: 'connected',
    capabilities: ['Virtual Receptionist Greeting', 'Voicemail Audio Transcription', 'SMS Notifications'],
    connectedAt: '2026-08-01T14:00:00Z',
    lastSyncAt: '2026-10-09T01:30:00Z'
  },
  {
    id: 'conn-web-cedar',
    workspaceId: 'ws-cedar',
    provider: 'website_cms',
    accountName: 'cedarlearning.co (Custom Domain)',
    accountHandle: 'https://cedarlearning.co',
    accountType: 'Headless Production Website',
    status: 'connected',
    capabilities: ['Landing Page Deployment', 'Instant Rollback', 'Form Capture Webhook'],
    connectedAt: '2026-05-20T11:00:00Z',
    lastSyncAt: '2026-10-08T18:00:00Z'
  },
  {
    id: 'conn-gads-cedar',
    workspaceId: 'ws-cedar',
    provider: 'google_ads',
    accountName: 'Cedar & Co Search Campaigns',
    accountHandle: 'CID: 881-224-9011',
    accountType: 'Google Ads Account',
    status: 'connected',
    capabilities: ['High-Intent Search Bid Simulation', 'Negative Keyword Exclusions'],
    connectedAt: '2026-09-01T10:00:00Z',
    lastSyncAt: '2026-10-08T16:00:00Z'
  },
  {
    id: 'conn-stripe-cedar',
    workspaceId: 'ws-cedar',
    provider: 'stripe_billing',
    accountName: 'Cedar & Co Merchant Billing',
    accountHandle: 'acct_cedar_live_demo',
    accountType: 'Stripe Corporate Billing',
    status: 'connected',
    capabilities: ['Executive Fellowship Checkout', 'Corporate Net-30 Invoicing'],
    connectedAt: '2026-06-15T09:00:00Z',
    lastSyncAt: '2026-10-09T02:00:00Z'
  },

  // ACME CRAFT GOODS CONNECTIONS
  {
    id: 'conn-meta-biz-acme',
    workspaceId: 'ws-acme',
    provider: 'meta_business',
    accountName: 'Acme Craft Goods LLC',
    accountType: 'Business Portfolio',
    status: 'connected',
    capabilities: ['Page Administration', 'Instagram Creator Oversight'],
    connectedAt: '2026-09-10T10:00:00Z',
    lastSyncAt: '2026-10-08T12:00:00Z'
  },
  {
    id: 'conn-ig-pro-acme',
    workspaceId: 'ws-acme',
    parentConnectionId: 'conn-meta-biz-acme',
    provider: 'instagram_pro',
    accountName: 'Acme Heritage Leather',
    accountHandle: '@acmecraftgoods',
    accountType: 'Instagram Creator Account',
    status: 'connected',
    capabilities: ['Product Photo Showcase', 'Direct Message Care Inquiries'],
    connectedAt: '2026-09-10T10:15:00Z',
    lastSyncAt: '2026-10-08T12:00:00Z'
  },
  {
    id: 'conn-web-acme',
    workspaceId: 'ws-acme',
    provider: 'website_cms',
    accountName: 'acmecraftgoods.com Storefront',
    accountHandle: 'https://acmecraftgoods.com',
    accountType: 'Commerce Web Store',
    status: 'connected',
    capabilities: ['Workshop Lookbook', 'Catalog Inventory Sync'],
    connectedAt: '2026-09-01T09:00:00Z',
    lastSyncAt: '2026-10-08T12:00:00Z'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    workspaceId: 'ws-cedar',
    title: 'Q4 Executive Fellowship Cohort Launch',
    objective: 'Launch the Fall 2026 6-week tactical leadership fellowship, deploy revised landing page, and enroll 24 verified fellows.',
    status: 'in_progress',
    participatingEmployeeIds: ['emp-a08', 'emp-a12', 'emp-a07', 'emp-a19', 'emp-a02', 'emp-a17', 'emp-a09'],
    workflowRunId: 'run-1',
    dueAt: '2026-11-01T00:00:00Z',
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-10-09T02:00:00Z',
    tags: ['Go-to-Market', 'Cohort Launch', 'Revenue'],
    offer: 'Executive Fellowship Winter 2026 ($8,500/seat)',
    audience: 'Mid-to-Senior Operations Directors and Founders',
    geography: 'United States & Canada',
    channels: ['LinkedIn Organic', 'Website Landing Page', 'Direct Inbound'],
    approximateBudget: '$2,500',
    nextImportantAction: 'Review and sign off on Walter’s landing page headline variation before public broadcast.',
    progressSummary: 'Strategy defined, copy matrix drafted, and landing page staged. Speed-to-lead queue active for waitlist.',
    employeeResponsibilities: {
      'emp-a08': 'Define cohort curriculum structure and seat economics',
      'emp-a12': 'Draft 3 persuasive value proposition angles for executive directors',
      'emp-a07': 'Deploy responsive registration page with live lead capture form',
      'emp-a19': 'Produce brand-calibrated visual quote slides and curriculum cards',
      'emp-a02': 'Queue organic LinkedIn thought leadership series',
      'emp-a17': 'Triage inbound applications and schedule discovery interviews',
      'emp-a09': 'Track fellowship deal pipeline stages through Closed Won'
    }
  },
  {
    id: 'proj-2',
    workspaceId: 'ws-cedar',
    title: 'Executive Revenue Guide Social Funnel',
    objective: 'Automate qualified lead generation via Flagship Comment-to-Guide campaign delivering 24-page PDF to LinkedIn/IG commenters.',
    status: 'in_progress',
    participatingEmployeeIds: ['emp-a02', 'emp-a23', 'emp-a21', 'emp-a29', 'emp-a17'],
    workflowRunId: 'run-2',
    dueAt: '2026-10-25T00:00:00Z',
    createdAt: '2026-10-01T08:30:00Z',
    updatedAt: '2026-10-09T03:15:00Z',
    tags: ['Audience Growth', 'Flagship Funnel', 'Inbound'],
    offer: 'Free 24-Page Tactical Executive Operating Guide (PDF)',
    audience: 'B2B Business Operators and Agency Leaders',
    geography: 'Global English-speaking markets',
    channels: ['Instagram Professional', 'LinkedIn Company Page'],
    approximateBudget: '$0 (Organic Social)',
    nextImportantAction: 'Approve new batch of 18 delivered PDF guides in Astrid’s audience queue.',
    progressSummary: 'Keyword trigger "GROW" active. 142 comments processed, 118 guides delivered, 38 permissioned leads captured.',
    employeeResponsibilities: {
      'emp-a02': 'Publish weekly hook post inviting followers to comment "GROW"',
      'emp-a23': 'Monitor keyword comments and deliver PDF direct messages',
      'emp-a21': 'Post polite public replies confirming DM delivery',
      'emp-a29': 'Deduplicate lead emails and check domain health',
      'emp-a17': 'Follow up with commenters who answered qualification questions'
    }
  },
  {
    id: 'proj-3',
    workspaceId: 'ws-cedar',
    title: 'California B2B Corporate Outbound Sprint',
    objective: 'Enrich 100 VP Operations leads, verify sender domain health, and run personalized 3-touch sequence for group enrollments.',
    status: 'planning',
    participatingEmployeeIds: ['emp-a04', 'emp-a29', 'emp-a16', 'emp-a09'],
    dueAt: '2026-11-15T00:00:00Z',
    createdAt: '2026-10-05T14:00:00Z',
    updatedAt: '2026-10-08T16:00:00Z',
    tags: ['Outbound Sales', 'Corporate B2B'],
    offer: 'Corporate Group Training Package (5+ seats)',
    audience: 'VP of Operations and Chief People Officers at 50–200 person firms',
    geography: 'California, US',
    channels: ['Direct B2B Email Sequence'],
    approximateBudget: '$400',
    nextImportantAction: 'Import enriched CSV file from Stan Bradley into campaign queue.',
    progressSummary: 'ICP parameters locked. Awaiting initial contact list import and domain health verification.',
    employeeResponsibilities: {
      'emp-a04': 'Filter ICP contacts and enrich verified email addresses',
      'emp-a29': 'Verify SPF/DKIM records and suppress previous opt-outs',
      'emp-a16': 'Compose personalized 3-touch cadence with value-first hook',
      'emp-a09': 'Coach pipeline stages and log booked discovery meetings'
    }
  },

  // ACME CRAFT GOODS PROJECTS
  {
    id: 'proj-acme-1',
    workspaceId: 'ws-acme',
    title: 'Vegetable-Tanned Weekender Bag Holiday Release',
    objective: 'Launch small batch of 50 handcrafted weekender duffel bags, coordinate lookbook photoshoot, and schedule Instagram release.',
    status: 'in_progress',
    participatingEmployeeIds: ['emp-a08', 'emp-a12', 'emp-a19', 'emp-a02', 'emp-a32'],
    dueAt: '2026-11-20T00:00:00Z',
    createdAt: '2026-10-01T09:00:00Z',
    updatedAt: '2026-10-08T14:00:00Z',
    tags: ['Product Release', 'Heritage Leather'],
    offer: 'Weekender Duffel Bag in Saddle Brown ($480)',
    audience: 'Design-conscious travelers and gift buyers',
    geography: 'United States',
    channels: ['Instagram', 'Email Newsletter'],
    approximateBudget: '$1,200',
    nextImportantAction: 'Review Caleb’s inventory allocation of 50 serialized bags.',
    progressSummary: 'Lookbook assets approved. Pre-order catalog listing staged.',
    employeeResponsibilities: {
      'emp-a08': 'Formulate holiday release timeline and early access tier',
      'emp-a12': 'Craft product storytelling focused on vegetable-tanning process',
      'emp-a19': 'Design Instagram carousel lookbook slides',
      'emp-a02': 'Schedule launch countdown teasers',
      'emp-a32': 'Manage serialized inventory seats and recover abandoned carts'
    }
  }
];

export const INITIAL_WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'wf-flagship-guide',
    name: 'Flagship Comment-to-Guide Campaign',
    outcome: 'Turn social comments into verified leads and booked discovery calls via automated PDF delivery.',
    shortDescription: 'Multi-agent funnel combining viral post copywriting, instant keyword DM response, PDF asset verification, and sales qualification.',
    category: 'Growth & Audience',
    participatingEmployeeIds: ['emp-a23', 'emp-a12', 'emp-a19', 'emp-a10', 'emp-a09'],
    approvalPoints: ['Sign off on destination account & keyword rule', 'Review outbound DM template & rate limits'],
    typicalDuration: '3 - 7 days',
    expectedSteps: [
      { title: 'Draft High-Leverage Post & Hook Copy', employeeCode: 'A12', type: 'employee_task', description: 'Write engaging thought-leadership post inviting comments with specific keyword.' },
      { title: 'Create Carousel & Quote Graphics', employeeCode: 'A19', type: 'employee_task', description: 'Design 1:1 and 9:16 high-contrast carousel slides with clear save/comment prompts.' },
      { title: 'Configure Keyword DM Trigger & PDF Asset', employeeCode: 'A23', type: 'employee_task', description: 'Verify downloadable 24-page PDF and link direct message delivery template.' },
      { title: 'Founder Review of Campaign Parameters', employeeCode: 'A01', type: 'human_approval', description: 'Confirm accounts, message rate boundaries, and separate marketing consent notice.' },
      { title: 'Multi-Touch Nurture Drip Configuration', employeeCode: 'A10', type: 'employee_task', description: 'Prepare 3-part follow-up email sequence for readers who request deeper audit.' },
      { title: 'Pipeline Qualification & Deal Sync', employeeCode: 'A09', type: 'employee_task', description: 'Route qualified leads directly to discovery pipeline and allocate calendar slots.' }
    ]
  },
  {
    id: 'wf-inbound-booking',
    name: 'Inbound Lead Qualification & Meeting Booking',
    outcome: 'Sub-60-second speed-to-lead response, automatic ICP triage, calendar slot reservation, and CRM sync.',
    shortDescription: 'Coordinates virtual receptionist, website form listener, inbound sales qualification, and calendar defense.',
    category: 'Sales Operations',
    participatingEmployeeIds: ['emp-a17', 'emp-a05', 'emp-a09', 'emp-a01'],
    approvalPoints: ['Meeting reschedule buffer authorization'],
    typicalDuration: 'Continuous Real-time',
    expectedSteps: [
      { title: 'Inbound Inquiries Speed-to-Lead Triage', employeeCode: 'A17', type: 'employee_task', description: 'Acknowledge website form submits and phone calls in under 60 seconds.' },
      { title: 'Virtual Receptionist Voicemail & Call Routing', employeeCode: 'A05', type: 'employee_task', description: 'Transcribe voicemails, extract caller intent, and categorize urgency.' },
      { title: 'Calendar Defense & Slot Reservation', employeeCode: 'A01', type: 'employee_task', description: 'Offer optimal 20-min strategy review slots with 15-min focus buffers.' },
      { title: 'Deal Creation & Discovery Qualification', employeeCode: 'A09', type: 'employee_task', description: 'Create deal record in pipeline, assign deal size, and prepare discovery brief.' }
    ]
  },
  {
    id: 'wf-outbound-prospecting',
    name: 'Outbound Cold Prospecting to Meeting',
    outcome: 'Enrich verified ICP contacts, validate sender reputation, and execute personalized multi-step sequence.',
    shortDescription: 'Combines prospect research, CSV deduplication, personalized copywriting, and domain health checks.',
    category: 'Sales Operations',
    participatingEmployeeIds: ['emp-a04', 'emp-a16', 'emp-a29', 'emp-a09'],
    approvalPoints: ['Sign off on recipient batch & sender domain check', 'Review Step 1 email subject lines'],
    typicalDuration: '10 - 14 days',
    expectedSteps: [
      { title: 'ICP Prospect Research & Contact Enrichment', employeeCode: 'A04', type: 'employee_task', description: 'Filter target accounts by industry, company size, and executive title.' },
      { title: 'Contact Deduplication & Sender Health Check', employeeCode: 'A29', type: 'employee_task', description: 'Check DKIM/SPF alignment, sanitize duplicate emails, and enforce suppression lists.' },
      { title: 'Founder Approval of Outbound Sequence', employeeCode: 'A01', type: 'human_approval', description: 'Review email batch, personalization quality, and daily dispatch rate.' },
      { title: 'Execute 3-Touch Cold Outreach Sequence', employeeCode: 'A16', type: 'employee_task', description: 'Deliver personalized sequence with automatic opt-out suppression handling.' },
      { title: 'Reply Triage & Meeting Booking Handoff', employeeCode: 'A09', type: 'employee_task', description: 'Classify replies (interested, referral, objection, unsubscribe) and progress pipeline.' }
    ]
  },
  {
    id: 'wf-content-distribution',
    name: 'Weekly Content & Social Distribution',
    outcome: 'Produce SEO long-form article, derivative social thought-leadership posts, and branded visual carousels.',
    shortDescription: 'Editorial engine from high-level business strategy to published assets across web and social channels.',
    category: 'Content & Creative',
    participatingEmployeeIds: ['emp-a08', 'emp-a03', 'emp-a12', 'emp-a19', 'emp-a02'],
    approvalPoints: ['Review long-form article draft', 'Sign off on social post scheduling'],
    typicalDuration: 'Weekly rhythm',
    expectedSteps: [
      { title: 'Quarterly Strategic Theme Alignment', employeeCode: 'A08', type: 'employee_task', description: 'Select high-priority theme aligning with upcoming cohort enrollment milestones.' },
      { title: 'SEO Keyword Research & Long-Form Draft', employeeCode: 'A03', type: 'employee_task', description: 'Write 1,800-word authoritative guide with meta descriptions and header structure.' },
      { title: 'Derivative Headline Angles & Social Hooks', employeeCode: 'A12', type: 'employee_task', description: 'Extract 3 punchy LinkedIn angles and provocative opening hooks.' },
      { title: 'Design Branded Quote Cards & Visuals', employeeCode: 'A19', type: 'employee_task', description: 'Produce 1:1 square graphics matching approved brand typography and colors.' },
      { title: 'Content Calendar Scheduling & Distribution', employeeCode: 'A02', type: 'employee_task', description: 'Queue approved posts across LinkedIn, Twitter, and Instagram at optimal hours.' }
    ]
  },
  {
    id: 'wf-onboarding-retention',
    name: 'Customer Onboarding & Retention Drip',
    outcome: 'Seamless welcome experience for newly signed clients, milestone tracking, and proactive satisfaction checks.',
    shortDescription: 'Ensures zero drop-off after contracts are signed through coordinated customer success and knowledge sharing.',
    category: 'Operations & Support',
    participatingEmployeeIds: ['emp-a30', 'emp-a10', 'emp-a11'],
    approvalPoints: ['Approve client kickoff agenda & milestone timeline'],
    typicalDuration: '30 days',
    expectedSteps: [
      { title: 'Client Onboarding Milestone Setup', employeeCode: 'A30', type: 'employee_task', description: 'Generate custom 4-week milestone checklist and kickoff orientation schedule.' },
      { title: 'Automated Welcome & Resource Delivery Drip', employeeCode: 'A10', type: 'employee_task', description: 'Deliver welcome pack, credentials, and calendar invites via email and WhatsApp.' },
      { title: 'Customer Support FAQ & Proactive Check-in', employeeCode: 'A11', type: 'employee_task', description: 'Monitor incoming client inquiries with grounded business FAQs and fast resolution.' }
    ]
  }
];

export const INITIAL_WORKFLOW_RUNS: WorkflowRun[] = [
  {
    id: 'run-1',
    workspaceId: 'ws-cedar',
    templateId: 'wf-product-launch',
    templateName: 'Launch a Product / Offer',
    title: 'Q4 Executive Fellowship Launch Run',
    status: 'running',
    projectId: 'proj-1',
    currentStepIndex: 3,
    startedAt: '2026-09-22T09:00:00Z',
    steps: [
      { id: 'step-1-1', title: 'Define Value Proposition & Pricing Tiers', employeeCode: 'A08', employeeId: 'emp-a08', type: 'employee_task', description: 'Structure offer tiers ($3,400 single / $14,500 team package) and 24-seat capacity.', status: 'completed' },
      { id: 'step-1-2', title: 'Draft Conversion Sales Page Copy', employeeCode: 'A12', employeeId: 'emp-a12', type: 'employee_task', description: 'Write persuasive headline variations and syllabus breakdown.', status: 'completed' },
      { id: 'step-1-3', title: 'Build Landing Page with Live Lead Form', employeeCode: 'A07', employeeId: 'emp-a07', type: 'employee_task', description: 'Deploy responsive page on cedarlearning.co with version rollback tracking.', status: 'completed' },
      { id: 'step-1-4', title: 'Founder Review of Web Page & Offer Terms', employeeCode: 'A01', employeeId: 'emp-a01', type: 'human_approval', description: 'Review refund policy, calendar dates, and commercial terms before broad distribution.', status: 'waiting_approval', approvalRequestId: 'appr-1' },
      { id: 'step-1-5', title: 'Create Visual Moodboard & Teaser Graphics', employeeCode: 'A19', employeeId: 'emp-a19', type: 'employee_task', description: 'Generate quote cards and promotional banners.', status: 'pending' },
      { id: 'step-1-6', title: 'Configure Multi-Touch Email Welcome Sequence', employeeCode: 'A10', employeeId: 'emp-a10', type: 'employee_task', description: 'Set up 3-part nurture drip with verified GDPR opt-ins.', status: 'pending' }
    ]
  },
  {
    id: 'run-2',
    workspaceId: 'ws-cedar',
    templateId: 'wf-comment-to-lead',
    templateName: 'Comment-to-Lead Funnel (Flagship)',
    title: 'Flagship Revenue Guide Comment Loop',
    status: 'running',
    projectId: 'proj-2',
    currentStepIndex: 3,
    startedAt: '2026-10-02T10:00:00Z',
    steps: [
      { id: 'step-2-1', title: 'Draft Engagement Prompt Post with Keyword CTA', employeeCode: 'A02', employeeId: 'emp-a02', type: 'employee_task', description: 'Write LinkedIn/IG post inviting comments with keyword "GROW".', status: 'completed' },
      { id: 'step-2-2', title: 'Verify PDF Asset & Delivery DM Template', employeeCode: 'A23', employeeId: 'emp-a23', type: 'employee_task', description: 'Link authentic 24-page PDF and configure personalized DM sequence.', status: 'completed' },
      { id: 'step-2-3', title: 'Founder Authorization of Automation Loop', employeeCode: 'A01', employeeId: 'emp-a01', type: 'human_approval', description: 'Sign off on destination accounts, message rate caps, and privacy consent wording.', status: 'completed' },
      { id: 'step-2-4', title: 'Scan Comments & Deliver Instant Direct Messages', employeeCode: 'A23', employeeId: 'emp-a23', type: 'employee_task', description: 'Active loop delivering guide PDF to commenters in real time.', status: 'in_progress' },
      { id: 'step-2-5', title: 'Deduplicate & Validate Contacts in CRM', employeeCode: 'A29', employeeId: 'emp-a29', type: 'employee_task', description: 'Verify sender domain health and record explicit opt-in permissions.', status: 'pending' },
      { id: 'step-2-6', title: 'Speed-to-Lead Follow-up for Qualified Leads', employeeCode: 'A17', employeeId: 'emp-a17', type: 'employee_task', description: 'Deliver calendar booking link to leads who answered optional qualification.', status: 'pending' }
    ]
  }
];

export const INITIAL_ACTIVITY_EVENTS: ActivityEvent[] = [
  {
    id: 'act-1',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    actorName: 'Sterling Blake (A08)',
    actorType: 'employee',
    action: 'Created Strategic Plan',
    details: 'Defined Q4 cohort positioning, $3,400 fee structure, and 24-fellow capacity cap.',
    timestamp: '2026-09-22T09:30:00Z'
  },
  {
    id: 'act-2',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    actorName: 'Porter Hayes (A12)',
    actorType: 'employee',
    action: 'Drafted Headline Angles',
    details: 'Wrote 3 value angles: "Clarity Creates Velocity" and quantitative delegation metrics.',
    timestamp: '2026-09-24T14:15:00Z'
  },
  {
    id: 'act-3',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    actorName: 'Walter Hayes (A07)',
    actorType: 'employee',
    action: 'Published Landing Page Draft',
    details: 'Deployed v2 on cedarlearning.co/executive-fellowship with live form capture.',
    timestamp: '2026-10-08T18:00:00Z'
  },
  {
    id: 'act-4',
    workspaceId: 'ws-cedar',
    projectId: 'proj-2',
    actorName: 'Astrid Lind (A23)',
    actorType: 'employee',
    action: 'Delivered Flagship Guide PDF',
    details: 'Delivered PDF guide to David Kalu (@d_kalu) after "GROW" comment trigger.',
    timestamp: '2026-10-09T02:10:00Z'
  },
  {
    id: 'act-5',
    workspaceId: 'ws-cedar',
    projectId: 'proj-2',
    actorName: 'Jordan Bell (A17)',
    actorType: 'employee',
    action: 'Scheduled Discovery Review',
    details: 'Qualified David Kalu and confirmed 20-min strategy review for Thursday 10:00 AM PST.',
    timestamp: '2026-10-09T02:25:00Z'
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    workspaceId: 'ws-cedar',
    name: 'Prashant',
    email: 'prashant.ooumph@gmail.com',
    role: 'owner',
    avatarInitials: 'PR',
    status: 'active',
    invitedAt: '2026-05-01T00:00:00Z'
  },
  {
    id: 'tm-2',
    workspaceId: 'ws-cedar',
    name: 'Claire Jenkins',
    email: 'claire@cedarlearning.co',
    role: 'admin',
    avatarInitials: 'CJ',
    status: 'active',
    invitedAt: '2026-06-15T10:00:00Z'
  },
  {
    id: 'tm-3',
    workspaceId: 'ws-cedar',
    name: 'Horizon Labs Sponsor',
    email: 'm.morrison@horizonlabs.bio',
    role: 'client_viewer',
    avatarInitials: 'MM',
    status: 'active',
    invitedAt: '2026-10-02T11:00:00Z'
  },

  // ACME TEAM
  {
    id: 'tm-acme-1',
    workspaceId: 'ws-acme',
    name: 'Master Artisan Caleb',
    email: 'caleb@acmecraftgoods.com',
    role: 'owner',
    avatarInitials: 'AC',
    status: 'active',
    invitedAt: '2026-08-01T00:00:00Z'
  }
];

export const INITIAL_WEBSITE_PAGE: WebsitePage = {
  id: 'page-bootcamp',
  workspaceId: 'ws-cedar',
  slug: '/executive-fellowship',
  title: 'Executive Leadership Fellowship 2026',
  heroHeadline: 'Master High-Leverage Delegation & Modern Team Systems',
  heroSubheading: 'A 6-week tactical cohort for founders and directors ready to replace administrative chaos with accountable, autonomous execution.',
  ctaText: 'Apply for the Fall Cohort',
  bodyHtml: `
    <h3>What You Will Build</h3>
    <p>Over six structured modules, fellows develop personal operating procedures, automated customer nurture loops, and high-trust delegation frameworks.</p>
    <ul>
      <li>Module 1: Executive Operating Rhythm & Calendar Defense</li>
      <li>Module 2: Agentic Team Architecture (Hiring AI Teammates)</li>
      <li>Module 3: Inbound Speed-to-Lead & High-Touch Outbound</li>
      <li>Module 4: Institutional Business Knowledge & Reversible Lessons</li>
    </ul>
  `,
  published: true,
  lastPublishedAt: '2026-10-08T18:00:00Z',
  versionHistory: [
    {
      version: 1,
      headline: 'Scale Your Leadership with Modern Executive Systems',
      timestamp: '2026-09-15T12:00:00Z'
    },
    {
      version: 2,
      headline: 'Master High-Leverage Delegation & Modern Team Systems',
      timestamp: '2026-10-08T18:00:00Z'
    }
  ]
};

export const INITIAL_FLAGSHIP_CAMPAIGN: FlagshipCampaign = {
  id: 'camp-flagship-1',
  workspaceId: 'ws-cedar',
  projectId: 'proj-2',
  title: 'Comment "GROW" to Receive Executive Revenue Guide',
  platform: 'Instagram',
  destinationAccountHandle: '@cedarlearning',
  postHeadline: 'The delegation formula that gave 40+ founders their weekends back.',
  postCaption: 'Most founders treat delegation as an afterthought until burnout forces their hand.\n\nWe packaged our complete internal 24-page framework into a concise executive blueprint: "The Modern Founder\'s Guide to Predictable Revenue & AI Operations".\n\nWant the PDF? Comment "GROW" below and my team will send it straight to your inbox.',
  postImagePrompt: 'Minimalist editorial desk with leather journal, brass pen, laptop showing clean revenue charts, soft morning window lighting.',
  keyword: 'GROW',
  resourceTitle: 'The Modern Founder\'s Guide to Predictable Revenue & AI Operations',
  resourceDescription: 'A 24-page tactical roadmap covering high-leverage delegation, autonomous lead response, and business memory hygiene.',
  publicReplyTemplate: 'Just sent the guide to your direct messages, @{username}! Check your inbox.',
  privateDmTemplate: 'Hey {firstName}! Here is the direct download to The Modern Founder\'s Guide as promised: [Download PDF]. Feel free to reply if you would like me to walk through the delegation framework.',
  qualificationQuestion: 'Are you currently looking to streamline corporate team workflows or your personal founder schedule?',
  active: true,
  stats: {
    scannedComments: 48,
    eligibleMatches: 36,
    resourcesDelivered: 36,
    optedInLeads: 19,
    meetingsBooked: 7
  }
};

export const INITIAL_LEADS: LeadProspect[] = [
  // CEDAR & CO LEADS
  {
    id: 'lead-1',
    workspaceId: 'ws-cedar',
    projectId: 'proj-3',
    name: 'Sarah Jenkins',
    title: 'VP of People & Operations',
    company: 'Apex Media Group',
    email: 'sarah.jenkins@apexmedia.io',
    phone: '+1 (415) 890-1123',
    fitScore: 94,
    status: 'replied',
    source: 'Outbound Research',
    touchPoints: 2,
    notes: 'Interested in training 6 senior managers in Q4. Requested pricing proposal.',
    consents: { marketingEmail: true, whatsapp: false, callback: true },
    lastContacted: '2026-10-08T14:22:00Z'
  },
  {
    id: 'lead-2',
    workspaceId: 'ws-cedar',
    projectId: 'proj-2',
    name: 'David Kalu',
    title: 'Managing Director',
    company: 'Vanguard Retail Systems',
    email: 'd.kalu@vanguardretail.com',
    phone: '+1 (206) 441-9980',
    fitScore: 88,
    status: 'meeting_booked',
    source: 'Flagship Comment Guide',
    touchPoints: 3,
    notes: 'Commented "GROW" on Instagram, downloaded guide, completed qualification question, booked discovery call for Thursday.',
    consents: { marketingEmail: true, whatsapp: true, callback: true },
    meetingTime: 'Thursday, 10:00 AM PST',
    lastContacted: '2026-10-09T02:10:00Z'
  },
  {
    id: 'lead-3',
    workspaceId: 'ws-cedar',
    projectId: 'proj-3',
    name: 'Elena Rostova-Smith',
    title: 'Director of Talent Development',
    company: 'BioHealth Dynamics',
    email: 'elena.smith@biohealth.org',
    fitScore: 82,
    status: 'contacted',
    source: 'CSV Import',
    touchPoints: 1,
    notes: 'Imported via California Healthcare CSV. Step 1 cold email dispatched yesterday.',
    consents: { marketingEmail: true, whatsapp: false, callback: false },
    lastContacted: '2026-10-08T09:15:00Z'
  },
  {
    id: 'lead-4',
    workspaceId: 'ws-cedar',
    projectId: 'proj-3',
    name: 'Marcus Brody',
    title: 'Founder & CEO',
    company: 'Brody Logistics',
    email: 'marcus@brodylogistics.com',
    fitScore: 78,
    status: 'opted_out',
    source: 'Outbound Research',
    touchPoints: 1,
    notes: 'Replied "Not interested right now, please unsubscribe". Automatically marked opted-out and suppressed from all future sequences.',
    consents: { marketingEmail: false, whatsapp: false, callback: false },
    lastContacted: '2026-10-07T11:00:00Z'
  },
  {
    id: 'lead-5',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    name: 'Chloe Tanaka',
    title: 'Head of Learning & Culture',
    company: 'Fintech Forge',
    email: 'ctanaka@fintechforge.co',
    phone: '+1 (312) 555-8092',
    fitScore: 91,
    status: 'researched',
    source: 'Outbound Research',
    touchPoints: 0,
    notes: 'Discovered by Stan Bradley (A04). High ICP match. Ready for reviewed sequence launch.',
    consents: { marketingEmail: true, whatsapp: false, callback: false }
  },

  // ACME CRAFT GOODS LEADS
  {
    id: 'lead-acme-1',
    workspaceId: 'ws-acme',
    projectId: 'proj-acme-1',
    name: 'Jonathan Drake',
    title: 'Principal Architect',
    company: 'Drake & Associates Architecture',
    email: 'j.drake@drakedesign.com',
    fitScore: 92,
    status: 'replied',
    source: 'Inbound Contact Form',
    touchPoints: 2,
    notes: 'Requested custom embossing for 5 executive architect fieldfolios.',
    consents: { marketingEmail: true, whatsapp: true, callback: true },
    lastContacted: '2026-10-08T15:00:00Z'
  },
  {
    id: 'lead-acme-2',
    workspaceId: 'ws-acme',
    projectId: 'proj-acme-1',
    name: 'Claire Bennett',
    title: 'Retail Buyer',
    company: 'Monocle Goods Seattle',
    email: 'claire@monoclegoods.com',
    fitScore: 89,
    status: 'meeting_booked',
    source: 'Partner Referral',
    touchPoints: 3,
    notes: 'Interested in stocking 20 weekender bags for holiday showcase.',
    consents: { marketingEmail: true, whatsapp: false, callback: true },
    meetingTime: 'Friday, 02:00 PM PST',
    lastContacted: '2026-10-08T16:30:00Z'
  }
];

export const INITIAL_TASKS: Task[] = [
  // CEDAR & CO TASKS
  {
    id: 'task-1',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    title: 'Draft Executive Weekly Calendar & Morning Briefing',
    employeeId: 'emp-a01',
    employeeName: 'Aria Vance',
    employeeCode: 'A01',
    status: 'completed',
    category: 'Executive Support',
    description: 'Summarize today\'s schedule, identify 2 buffer conflicts, and draft polite reschedule for partner intro.',
    outputData: {
      briefingSummary: 'You have 3 meetings today: 10:00 AM Discovery Call with David Kalu (Vanguard), 1:30 PM Team Sync, 3:00 PM Advisor Catch-up. 1 pending reschedule needed for Friday afternoon.',
      actionItems: ['Approve David Kalu meeting agenda', 'Confirm Friday buffer space']
    },
    createdAt: '2026-10-09T01:00:00Z',
    version: 1
  },
  {
    id: 'task-2',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    title: 'LinkedIn Thought Leadership Post: Founder Delegation',
    employeeId: 'emp-a02',
    employeeName: 'Soren Miller',
    employeeCode: 'A02',
    status: 'needs_review',
    category: 'Social Content',
    description: 'Organic LinkedIn post breaking down why founders fail at delegating before mastering personal systems.',
    outputData: {
      platform: 'LinkedIn',
      content: 'Most business owners think delegation fails because "nobody cares like the founder does."\n\nIn reality, delegation fails because of fuzzy definitions:\n\n1. What does "done" look like?\n2. What is the explicit boundary of authority?\n3. Where is the single source of truth for lessons learned?\n\nWhen you give employees (AI or human) unambiguous guidelines and reversible test tasks, delegation stops feeling like a gamble.\n\nWhat is the hardest task you have ever handed off?',
      scheduledDate: 'Tomorrow at 09:15 AM PST'
    },
    createdAt: '2026-10-08T16:45:00Z',
    version: 2
  },
  {
    id: 'task-3',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    title: 'Long-Form Guide: "Hybrid Learning for Busy Executives"',
    employeeId: 'emp-a03',
    employeeName: 'Penny Thorne',
    employeeCode: 'A03',
    status: 'completed',
    category: 'SEO & Editorial',
    description: '1,800-word comprehensive SEO pillar article targeting "executive cohort leadership training".',
    outputData: {
      targetKeyword: 'executive cohort leadership training',
      searchVolume: '2,400 / mo',
      articleTitle: 'Why Traditional Executive Seminars Are Being Replaced by Tactical Micro-Cohorts',
      wordCount: 1840,
      metaDescription: 'Discover why modern directors are replacing multi-day hotel conferences with 6-week tactical cohorts that embed directly into real business operations.'
    },
    createdAt: '2026-10-08T11:20:00Z',
    version: 1
  },
  {
    id: 'task-4',
    workspaceId: 'ws-cedar',
    projectId: 'proj-3',
    title: '3-Touch Outbound Sequence for Corporate Training Leads',
    employeeId: 'emp-a16',
    employeeName: 'Arthur Pendelton',
    employeeCode: 'A16',
    status: 'needs_review',
    category: 'Outbound Sales',
    description: 'Personalized cold sequence targeting VP People and Operations with verified value props.',
    outputData: {
      step1: 'Subject: Quick question regarding {company}\'s manager training in Q4',
      step2: 'Subject: Re: Follow up on operational systems for {company}',
      step3: 'Subject: Permission to close the loop on leadership cohorts'
    },
    createdAt: '2026-10-08T14:10:00Z',
    version: 1
  },

  // ACME CRAFT GOODS TASKS
  {
    id: 'task-acme-1',
    workspaceId: 'ws-acme',
    projectId: 'proj-acme-1',
    title: 'Prepare Heritage Weekender Lookbook Copy',
    employeeId: 'emp-a12',
    employeeName: 'Porter Hayes',
    employeeCode: 'A12',
    status: 'completed',
    category: 'Product Copy',
    description: 'Focus on vegetable-tanned patina development and solid brass hardware.',
    outputData: {
      headline: 'Built for Decades, Not Seasons',
      subheading: '100% full-grain Tuscan leather that matures with every journey.'
    },
    createdAt: '2026-10-08T10:00:00Z',
    version: 1
  }
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [
  // CEDAR & CO APPROVALS
  {
    id: 'appr-1',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    title: 'Publish LinkedIn Post: "Founder Delegation Framework"',
    summary: 'Soren Miller prepared an organic thought-leadership post for LinkedIn scheduled for tomorrow at 09:15 AM PST to connected account @cedarlearning.',
    employeeId: 'emp-a02',
    employeeName: 'Soren Miller',
    employeeCode: 'A02',
    artifactType: 'Social Post',
    artifactPayload: {
      platform: 'LinkedIn Company Page',
      account: 'Cedar & Co Executive Education',
      scheduledTime: 'Tomorrow, 09:15 AM PST',
      postText: 'Most business owners think delegation fails because "nobody cares like the founder does."\n\nIn reality, delegation fails because of fuzzy definitions:\n1. What does "done" look like?\n2. What is the explicit boundary of authority?\n3. Where is the single source of truth for lessons learned?\n\nWhen you give employees (AI or human) unambiguous guidelines and reversible test tasks, delegation stops feeling like a gamble.',
      mediaAttached: 'Visual Quote Card (1:1 Aspect Ratio)'
    },
    status: 'pending',
    riskLevel: 'Low',
    createdAt: '2026-10-08T16:45:00Z',
    contextNote: 'Approved brand claims checked. No external pricing mentioned.'
  },
  {
    id: 'appr-2',
    workspaceId: 'ws-cedar',
    projectId: 'proj-3',
    title: 'Launch Outbound Email Sequence to 24 Researched Leads',
    summary: 'Arthur Pendelton prepared a 3-touch personalized sequence for 24 high-fit VP of Operations contacts.',
    employeeId: 'emp-a16',
    employeeName: 'Arthur Pendelton',
    employeeCode: 'A16',
    artifactType: 'Sales Sequence',
    artifactPayload: {
      recipientCount: 24,
      sendingDomain: 'cedarlearning.co',
      dailyDispatchLimit: 12,
      optOutIncluded: true,
      senderHealthCheck: 'Pass (DKIM / SPF Validated)'
    },
    status: 'pending',
    riskLevel: 'Medium',
    createdAt: '2026-10-08T14:10:00Z',
    contextNote: 'Includes GDPR double opt-in wording and automated exclusion check.'
  },
  {
    id: 'appr-3',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    title: 'Meta Ads Campaign: Q4 Enrollment Acceleration',
    summary: 'Maya Lin configured a lead generation ad set with a $50/day spending cap targeting director-level titles in California on connected Instagram account @cedarlearning.',
    employeeId: 'emp-a24',
    employeeName: 'Maya Lin',
    employeeCode: 'A24',
    artifactType: 'Paid Ad Budget',
    artifactPayload: {
      channel: 'Meta (Instagram & Facebook Feed)',
      connectedAccount: '@cedarlearning',
      dailyBudget: '$50.00 / day',
      totalPlannedBudget: '$1,500.00 over 30 days',
      targetAudience: 'California, Management & Leadership Interests, Ages 30-55',
      creativeHeadline: 'Stop Putting Out Fires: The Executive Delegation Fellowship'
    },
    status: 'pending',
    riskLevel: 'High',
    createdAt: '2026-10-07T18:00:00Z',
    contextNote: 'Material budget allocation requires explicit founder authorization.'
  },

  // ACME CRAFT GOODS APPROVALS
  {
    id: 'appr-acme-1',
    workspaceId: 'ws-acme',
    projectId: 'proj-acme-1',
    title: 'Broadcast Instagram Lookbook Story to @acmecraftgoods',
    summary: 'Soren Miller prepared a 3-slide visual teaser for the 50-unit handcrafted weekender bag release.',
    employeeId: 'emp-a02',
    employeeName: 'Soren Miller',
    employeeCode: 'A02',
    artifactType: 'Social Story',
    artifactPayload: {
      platform: 'Instagram Story (9:16)',
      connectedAccount: '@acmecraftgoods',
      scheduledTime: 'Saturday, 11:00 AM PST',
      caption: 'Small batch 04: Full-grain vegetable tanned duffels, hand-numbered.'
    },
    status: 'pending',
    riskLevel: 'Low',
    createdAt: '2026-10-08T11:00:00Z',
    contextNote: 'Photography verified from Portland workshop.'
  }
];

export const INITIAL_DEALS: Deal[] = [
  // CEDAR & CO DEALS
  {
    id: 'deal-1',
    workspaceId: 'ws-cedar',
    projectId: 'proj-3',
    title: 'Apex Media Enterprise Manager Cohort',
    clientName: 'Apex Media Group',
    contactEmail: 'sarah.jenkins@apexmedia.io',
    value: 14500,
    stage: 'Commercial Review',
    ownerEmployeeId: 'emp-a09',
    legalReviewSigned: true,
    mockCustomerApproved: false,
    createdAt: '2026-10-05T10:00:00Z'
  },
  {
    id: 'deal-2',
    workspaceId: 'ws-cedar',
    projectId: 'proj-2',
    title: 'Vanguard Retail Systems Executive Onboarding',
    clientName: 'Vanguard Retail Systems',
    contactEmail: 'd.kalu@vanguardretail.com',
    value: 6800,
    stage: 'Discovery',
    ownerEmployeeId: 'emp-a17',
    legalReviewSigned: false,
    mockCustomerApproved: false,
    createdAt: '2026-10-08T14:00:00Z'
  },
  {
    id: 'deal-3',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    title: 'Horizon Labs Director Leadership Program',
    clientName: 'Horizon Labs',
    contactEmail: 'm.morrison@horizonlabs.bio',
    value: 18500,
    stage: 'Proposal Sent',
    ownerEmployeeId: 'emp-a31',
    legalReviewSigned: true,
    mockCustomerApproved: false,
    createdAt: '2026-10-02T11:30:00Z'
  },

  // ACME CRAFT GOODS DEALS
  {
    id: 'deal-acme-1',
    workspaceId: 'ws-acme',
    projectId: 'proj-acme-1',
    title: 'Monocle Goods Seattle Stockist Order',
    clientName: 'Monocle Goods Seattle',
    contactEmail: 'claire@monoclegoods.com',
    value: 7800,
    stage: 'Discovery',
    ownerEmployeeId: 'emp-a09',
    legalReviewSigned: false,
    mockCustomerApproved: false,
    createdAt: '2026-10-08T16:00:00Z'
  }
];

export const INITIAL_CONVERSATIONS: Record<string, EmployeeConversation> = {
  'emp-a01-ws-cedar': {
    id: 'conv-a01-cedar',
    workspaceId: 'ws-cedar',
    employeeId: 'emp-a01',
    projectId: 'proj-1',
    takeover: false,
    messages: [
      {
        id: 'msg-a01-1',
        sender: 'employee',
        text: 'Good morning! I have organized today\'s briefing for Cedar & Co Learning. You have 3 meetings on the calendar and 2 items awaiting your review in the Inbox.',
        timestamp: '2026-10-09T01:00:00Z'
      },
      {
        id: 'msg-a01-2',
        sender: 'user',
        text: 'Can you show me the reschedule draft for Friday?',
        timestamp: '2026-10-09T01:05:00Z'
      },
      {
        id: 'msg-a01-3',
        sender: 'employee',
        text: 'Here is the draft for Alex Vance at Horizon Labs:\n\n"Hi Alex, Looking forward to connecting on the director training scope. To ensure we have uninterrupted focus, would moving our call from Friday 3:00 PM to Monday 10:30 AM PST work well for your calendar?"\n\nWould you like me to send this or adjust the proposed slot?',
        timestamp: '2026-10-09T01:06:00Z',
        suggestedAction: 'Send reschedule email',
        actionPayload: { to: 'alex@horizonlabs.bio', proposedTime: 'Monday 10:30 AM PST' }
      }
    ]
  },
  'emp-a02-ws-cedar': {
    id: 'conv-a02-cedar',
    workspaceId: 'ws-cedar',
    employeeId: 'emp-a02',
    projectId: 'proj-1',
    takeover: false,
    messages: [
      {
        id: 'msg-a02-1',
        sender: 'employee',
        text: 'I have prepared our next LinkedIn organic post focused on founder delegation for Q4 Executive Fellowship Launch. It addresses common misconceptions and reinforces our core philosophy that "clarity creates velocity".',
        timestamp: '2026-10-08T16:40:00Z'
      },
      {
        id: 'msg-a02-2',
        sender: 'user',
        text: 'Make sure it includes a clear question at the end to invite discussion.',
        timestamp: '2026-10-08T16:42:00Z'
      },
      {
        id: 'msg-a02-3',
        sender: 'employee',
        text: 'Done! I added "What is the hardest task you have ever handed off?" and submitted the post for your approval. You can inspect the full copy and visual asset on the right.',
        timestamp: '2026-10-08T16:45:00Z'
      }
    ]
  },
  'emp-a02-ws-acme': {
    id: 'conv-a02-acme',
    workspaceId: 'ws-acme',
    employeeId: 'emp-a02',
    projectId: 'proj-acme-1',
    takeover: false,
    messages: [
      {
        id: 'msg-acme-a02-1',
        sender: 'employee',
        text: 'Greetings from the Acme workshop! I drafted our Instagram story teaser for the handcrafted weekender duffel release scheduled to @acmecraftgoods.',
        timestamp: '2026-10-08T11:00:00Z'
      }
    ]
  }
};

export const INITIAL_SCHEDULED_MEETINGS: ScheduledMeeting[] = [
  {
    id: 'meet-1',
    workspaceId: 'ws-cedar',
    projectId: 'proj-2',
    title: 'Executive Revenue Strategy Discovery Call',
    leadId: 'lead-2',
    leadName: 'David Kalu',
    leadCompany: 'Vanguard Retail Systems',
    leadEmail: 'd.kalu@vanguardretail.com',
    hostEmployeeId: 'emp-a17',
    hostEmployeeName: 'Jordan Bell',
    hostEmployeeCode: 'A17',
    dateTime: 'Thursday, 10:00 AM PST',
    durationMinutes: 20,
    meetingLink: 'https://meet.cedarlearning.co/live-demo-room-kalu',
    agenda: 'Review flagship delegation guide findings, diagnose operational bottlenecks in retail ops team, and determine fit for Q4 Executive Cohort.',
    status: 'scheduled'
  },
  {
    id: 'meet-2',
    workspaceId: 'ws-cedar',
    projectId: 'proj-3',
    title: 'Corporate Cohort Commercial Scope & Legal Review',
    leadId: 'lead-1',
    leadName: 'Sarah Jenkins',
    leadCompany: 'Apex Media Group',
    leadEmail: 'sarah.jenkins@apexmedia.io',
    hostEmployeeId: 'emp-a09',
    hostEmployeeName: 'Marcus Ward',
    hostEmployeeCode: 'A09',
    dateTime: 'Next Tuesday, 01:30 PM PST',
    durationMinutes: 30,
    meetingLink: 'https://meet.cedarlearning.co/live-demo-room-apex',
    agenda: 'Finalize cohort enrollment agreement for 6 senior leaders ($14,500 corporate package) and review custom NDA redlines.',
    status: 'scheduled'
  },
  {
    id: 'meet-3',
    workspaceId: 'ws-cedar',
    projectId: 'proj-1',
    title: 'Horizon Labs Executive Cohort Logistics Alignment',
    leadName: 'Alex Vance',
    leadCompany: 'Horizon Labs',
    leadEmail: 'alex@horizonlabs.bio',
    hostEmployeeId: 'emp-a01',
    hostEmployeeName: 'Aria Vance',
    hostEmployeeCode: 'A01',
    dateTime: 'Monday, 10:30 AM PST',
    durationMinutes: 25,
    meetingLink: 'https://meet.cedarlearning.co/live-demo-room-horizon',
    agenda: 'Confirm calendar defense slots and director onboarding kickoff dates for the Fall leadership cohort.',
    status: 'scheduled'
  },
  {
    id: 'meet-acme-1',
    workspaceId: 'ws-acme',
    projectId: 'proj-acme-1',
    title: 'Wholesale Stockist Holiday Showcase Review',
    leadId: 'lead-acme-2',
    leadName: 'Claire Bennett',
    leadCompany: 'Monocle Goods Seattle',
    leadEmail: 'claire@monoclegoods.com',
    hostEmployeeId: 'emp-a09',
    hostEmployeeName: 'Marcus Ward',
    hostEmployeeCode: 'A09',
    dateTime: 'Friday, 02:00 PM PST',
    durationMinutes: 30,
    meetingLink: 'https://meet.acmecraftgoods.com/wholesale-room',
    agenda: 'Discuss 20-unit handcrafted weekender bag consignment and holiday merchandising display.',
    status: 'scheduled'
  }
];
