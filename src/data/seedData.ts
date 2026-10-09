import {
  Task,
  ApprovalRequest,
  LeadProspect,
  WebsitePage,
  FlagshipCampaign,
  Deal,
  EmployeeConversation,
  UserSettings
} from '../types';

export const INITIAL_USER_SETTINGS: UserSettings = {
  timezone: 'America/Los_Angeles (PST)',
  currency: 'USD ($)',
  workingHours: '09:00 - 18:00 PST (Mon - Fri)',
  autonomyLevel: 'Balanced (Auto Draft, Confirm High-Risk)',
  planTier: 'Growth',
  activeWorkspaceId: 'ws-cedar',
  notificationPreferences: {
    emailDigest: true,
    slackAlerts: true,
    highRiskApprovals: true
  },
  simulatedConnections: {
    googleWorkspace: true,
    metaBusiness: true,
    linkedInPages: true,
    stripeBilling: false,
    twilioSms: true
  }
};

export const INITIAL_WEBSITE_PAGE: WebsitePage = {
  id: 'page-bootcamp',
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
  title: 'Comment "GROW" to Receive Executive Revenue Guide',
  platform: 'LinkedIn',
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
  {
    id: 'lead-1',
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
    name: 'David Kalu',
    title: 'Managing Director',
    company: 'Vanguard Retail Systems',
    email: 'd.kalu@vanguardretail.com',
    phone: '+1 (206) 441-9980',
    fitScore: 88,
    status: 'meeting_booked',
    source: 'Flagship Comment Guide',
    touchPoints: 3,
    notes: 'Commented "GROW" on LinkedIn, downloaded guide, completed qualification question, booked discovery call for Thursday.',
    consents: { marketingEmail: true, whatsapp: true, callback: true },
    lastContacted: '2026-10-09T02:10:00Z'
  },
  {
    id: 'lead-3',
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
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
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
  }
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [
  {
    id: 'appr-1',
    title: 'Publish LinkedIn Post: "Founder Delegation Framework"',
    summary: 'Soren Miller prepared an organic thought-leadership post for LinkedIn scheduled for tomorrow at 09:15 AM PST.',
    employeeId: 'emp-a02',
    employeeName: 'Soren Miller',
    employeeCode: 'A02',
    artifactType: 'Social Post',
    artifactPayload: {
      platform: 'LinkedIn',
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
    title: 'Meta Ads Campaign: Q4 Enrollment Acceleration',
    summary: 'Maya Lin configured a lead generation ad set with a $50/day spending cap targeting director-level titles in California.',
    employeeId: 'emp-a24',
    employeeName: 'Maya Lin',
    employeeCode: 'A24',
    artifactType: 'Paid Ad Budget',
    artifactPayload: {
      channel: 'Meta (Instagram & Facebook Feed)',
      dailyBudget: '$50.00 / day',
      totalPlannedBudget: '$1,500.00 over 30 days',
      targetAudience: 'California, Management & Leadership Interests, Ages 30-55',
      creativeHeadline: 'Stop Putting Out Fires: The Executive Delegation Fellowship'
    },
    status: 'pending',
    riskLevel: 'High',
    createdAt: '2026-10-07T18:00:00Z',
    contextNote: 'Material budget allocation requires explicit founder authorization.'
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-1',
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
    title: 'Horizon Labs Director Leadership Program',
    clientName: 'Horizon Labs',
    contactEmail: 'm.morrison@horizonlabs.bio',
    value: 18500,
    stage: 'Proposal Sent',
    ownerEmployeeId: 'emp-a31',
    legalReviewSigned: true,
    mockCustomerApproved: false,
    createdAt: '2026-10-02T11:30:00Z'
  }
];

export const INITIAL_CONVERSATIONS: Record<string, EmployeeConversation> = {
  'emp-a01': {
    employeeId: 'emp-a01',
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
  'emp-a02': {
    employeeId: 'emp-a02',
    takeover: false,
    messages: [
      {
        id: 'msg-a02-1',
        sender: 'employee',
        text: 'I have prepared our next LinkedIn organic post focused on founder delegation. It addresses common misconceptions and reinforces our core philosophy that "clarity creates velocity".',
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
  'emp-a05': {
    employeeId: 'emp-a05',
    takeover: false,
    messages: [
      {
        id: 'msg-a05-1',
        sender: 'employee',
        text: 'Virtual Reception line is active at +1 (415) 555-0199. A new caller left a 42-second message at 08:30 AM PST. I have transcribed the voicemail and summarized the caller intent below.',
        timestamp: '2026-10-09T01:30:00Z'
      }
    ]
  },
  'emp-a17': {
    employeeId: 'emp-a17',
    takeover: false,
    messages: [
      {
        id: 'msg-a17-1',
        sender: 'employee',
        text: 'Inbound speed-to-lead responder is listening. When visitors submit the fellowship application form or initiate chat, I qualify their team size and deliver immediate booking options within 45 seconds.',
        timestamp: '2026-10-08T12:00:00Z'
      }
    ]
  },
  'emp-a23': {
    employeeId: 'emp-a23',
    takeover: false,
    messages: [
      {
        id: 'msg-a23-1',
        sender: 'employee',
        text: 'Welcome to Audience Growth! Our Flagship "Comment to Receive Guide" campaign is active on LinkedIn. Would you like to inspect campaign metrics, configure keywords, or test the live recipient simulation?',
        timestamp: '2026-10-09T02:00:00Z'
      }
    ]
  }
};
