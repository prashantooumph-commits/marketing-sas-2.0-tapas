import { WorkflowTemplate } from '../types';

export const INITIAL_WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'wf-content-engine',
    name: 'Weekly Content Engine',
    outcome: 'Produces and schedules 5 multi-channel posts, 1 pillar article, and visual quote assets',
    shortDescription: 'From strategic weekly themes to polished graphics, copy review, social scheduling, and performance attribution.',
    category: 'Content & Social',
    participatingEmployeeIds: ['emp-a08', 'emp-a03', 'emp-a12', 'emp-a19', 'emp-a02', 'emp-a21', 'emp-a13'],
    typicalDuration: '3–5 days',
    approvalPoints: [
      'Pillar Article Topic & Angle Signoff',
      'Final Social Post Copy & Budget Approval'
    ],
    expectedSteps: [
      { title: 'Determine Weekly Theme & Priority Hook', employeeCode: 'A08', type: 'employee_task', description: 'Analyze market trends and select single core theme aligned with quarterly goals.' },
      { title: 'Draft Long-Form SEO Pillar Article', employeeCode: 'A03', type: 'employee_task', description: 'Write 1,500-word tactical guide with internal linking and search intent clusters.' },
      { title: 'Derive 3 High-Impact Social Copy Hooks', employeeCode: 'A12', type: 'employee_task', description: 'Transform pillar article into LinkedIn thought leadership, X thread, and newsletter blurb.' },
      { title: 'Human Review of Article & Social Copy', employeeCode: 'A01', type: 'human_approval', description: 'Founder reviews copy against approved brand claims and signs off on tone.' },
      { title: 'Design Multi-Ratio Visual Assets (1:1 & 9:16)', employeeCode: 'A19', type: 'employee_task', description: 'Generate brand-calibrated quote cards and infographic slides in Cedar & Co aesthetic.' },
      { title: 'Schedule Across Connected Accounts', employeeCode: 'A02', type: 'employee_task', description: 'Queue posts across connected LinkedIn Page and Meta Instagram professional account.' },
      { title: 'Monitor Public Comments & Triage Inquiries', employeeCode: 'A21', type: 'employee_task', description: 'Respond to community replies, answer FAQs, and filter spam.' },
      { title: 'Consolidate Weekly Engagement & Attribution', employeeCode: 'A13', type: 'employee_task', description: 'Report impressions, CTR, and downstream lead touches in unified CSV dashboard.' }
    ]
  },
  {
    id: 'wf-product-launch',
    name: 'Launch a Product / Offer',
    outcome: 'End-to-end launch of new cohort, course, or service offering across web, email, and social',
    shortDescription: 'Coordinates positioning, landing page build, creative briefs, promo sequences, and sales qualification.',
    category: 'Go-to-Market',
    participatingEmployeeIds: ['emp-a08', 'emp-a12', 'emp-a07', 'emp-a18', 'emp-a19', 'emp-a02', 'emp-a10', 'emp-a17', 'emp-a09'],
    typicalDuration: '10–14 days',
    approvalPoints: [
      'Landing Page Copy & Pricing Table Approval',
      'Email Drip Sequence Schedule Authorization'
    ],
    expectedSteps: [
      { title: 'Define Value Proposition & Pricing Tiers', employeeCode: 'A08', type: 'employee_task', description: 'Structure offer tiers, early-bird deadline, and target executive persona.' },
      { title: 'Draft Conversion Sales Page Copy', employeeCode: 'A12', type: 'employee_task', description: 'Write persuasive headline variations, curriculum breakdown, and objection-handling FAQs.' },
      { title: 'Build Landing Page with Live Lead Form', employeeCode: 'A07', type: 'employee_task', description: 'Deploy responsive landing page on custom domain with rollback history tracking.' },
      { title: 'Founder Review of Web Page & Offer Terms', employeeCode: 'A01', type: 'human_approval', description: 'Verify refund policy, seat caps, and commercial terms before going live.' },
      { title: 'Create Visual Moodboard & Teaser Graphics', employeeCode: 'A19', type: 'employee_task', description: 'Produce promotional carousels and announcement banners.' },
      { title: 'Configure Multi-Touch Email Welcome Sequence', employeeCode: 'A10', type: 'employee_task', description: 'Set up 3-part nurture drip for early waitlist leads with explicit GDPR opt-ins.' },
      { title: 'Launch Organic Multi-Platform Announcements', employeeCode: 'A02', type: 'employee_task', description: 'Broadcast teaser campaign to LinkedIn and Instagram accounts.' },
      { title: 'Activate Inbound Speed-to-Lead Triage', employeeCode: 'A17', type: 'employee_task', description: 'Instantly respond to inbound form applications and qualify seats within 60 seconds.' }
    ]
  },
  {
    id: 'wf-comment-to-lead',
    name: 'Comment-to-Lead Funnel (Flagship)',
    outcome: 'Converts viral social engagement into verified, permissioned CRM leads via automated resource delivery',
    shortDescription: 'Triggers on keyword comments, delivers PDF guide via private DM, invites qualification, and records clean opt-in consent.',
    category: 'Audience Growth',
    participatingEmployeeIds: ['emp-a02', 'emp-a23', 'emp-a21', 'emp-a29', 'emp-a17', 'emp-a09'],
    typicalDuration: 'Ongoing / 48 hrs setup',
    approvalPoints: [
      'Guide PDF Asset & Direct Message Copy Approval'
    ],
    expectedSteps: [
      { title: 'Draft Engagement Prompt Post with Keyword CTA', employeeCode: 'A02', type: 'employee_task', description: 'Write compelling LinkedIn/IG post inviting followers to comment "GROW" for the executive guide.' },
      { title: 'Verify PDF Asset & Delivery DM Template', employeeCode: 'A23', type: 'employee_task', description: 'Link authentic 24-page PDF and configure personalized DM sequence.' },
      { title: 'Founder Authorization of Automation Loop', employeeCode: 'A01', type: 'human_approval', description: 'Sign off on destination accounts, message rate caps, and privacy consent wording.' },
      { title: 'Scan Comments & Deliver Instant Direct Messages', employeeCode: 'A23', type: 'employee_task', description: 'Monitor eligible comments and send direct download links without forced-follow gating.' },
      { title: 'Public Friendly Acknowledgment Replies', employeeCode: 'A21', type: 'employee_task', description: 'Leave public replies on comments confirming guide was delivered to direct messages.' },
      { title: 'Deduplicate & Validate Contacts in CRM', employeeCode: 'A29', type: 'employee_task', description: 'Check email against existing records, verify sender domain hygiene, and log consent status.' },
      { title: 'Speed-to-Lead Follow-up for Qualified Leads', employeeCode: 'A17', type: 'employee_task', description: 'Deliver calendar booking link to leads who answered optional qualification question.' }
    ]
  },
  {
    id: 'wf-outbound-sales',
    name: 'Outbound Sales Campaign',
    outcome: 'Targeted B2B executive prospecting, list hygiene, multi-touch cold cadences, and discovery booking',
    shortDescription: 'ICP list enrichment, CSV column deduplication, personalized 3-step sequences, and automated opt-out suppression.',
    category: 'Sales Operations',
    participatingEmployeeIds: ['emp-a04', 'emp-a29', 'emp-a16', 'emp-a09', 'emp-a05'],
    typicalDuration: '3 weeks',
    approvalPoints: [
      'Prospect List & Personalized Email Step 1 Signoff'
    ],
    expectedSteps: [
      { title: 'Enrich ICP Contacts & Filter Exclusions', employeeCode: 'A04', type: 'employee_task', description: 'Source mid-to-senior operations directors matching industry parameters.' },
      { title: 'Audit Domain Health & Suppress Opt-Outs', employeeCode: 'A29', type: 'employee_task', description: 'Verify SPF/DKIM records, validate bounce risk under 2%, and cross-reference suppression list.' },
      { title: 'Generate Personalized 3-Touch Email Cadence', employeeCode: 'A16', type: 'employee_task', description: 'Write value-first opening email, tactical framework follow-up, and clean permission-to-close.' },
      { title: 'Founder Authorization of Sending Batch', employeeCode: 'A01', type: 'human_approval', description: 'Review recipient count, sending mailbox, and daily dispatch velocity limit.' },
      { title: 'Simulate Step 1 Outbound Dispatch', employeeCode: 'A16', type: 'employee_task', description: 'Queue emails respecting rate limits with automated opt-out monitoring.' },
      { title: 'Triage Inbound Replies & Book Discovery Calls', employeeCode: 'A09', type: 'employee_task', description: 'Classify responses (Interested -> Meeting / Not Interested -> Suppress) and advance deal stage.' }
    ]
  },
  {
    id: 'wf-webinar-event',
    name: 'Webinar / Event Launch',
    outcome: 'Coordinates live executive masterclass registration, reminder cadences, attendee follow-up, and client onboarding',
    shortDescription: 'Registration page deployment, social announcements, attendance reminders, and post-session strategy handoffs.',
    category: 'Go-to-Market',
    participatingEmployeeIds: ['emp-a08', 'emp-a07', 'emp-a02', 'emp-a10', 'emp-a17', 'emp-a30'],
    typicalDuration: '7–10 days',
    approvalPoints: [
      'Event Syllabus & Registration Landing Page Review'
    ],
    expectedSteps: [
      { title: 'Formulate Masterclass Topic & Key Takeaways', employeeCode: 'A08', type: 'employee_task', description: 'Design 45-minute interactive agenda on executive delegation systems.' },
      { title: 'Deploy Dedicated Event RSVP Landing Page', employeeCode: 'A07', type: 'employee_task', description: 'Build one-click RSVP form with calendar invite generation.' },
      { title: 'Broadcast Promo Campaign to Social Channels', employeeCode: 'A02', type: 'employee_task', description: 'Schedule countdown announcements and speaker quotes on LinkedIn.' },
      { title: 'Send Multi-Channel Attendance Reminders', employeeCode: 'A10', type: 'employee_task', description: 'Deliver 24h and 1h reminders with direct Zoom link and workbook.' },
      { title: 'Fast-Track High-Fit Attendees to Discovery Calls', employeeCode: 'A17', type: 'employee_task', description: 'Qualify corporate team leads for full 6-week cohort enrollment.' },
      { title: 'Hand Off Enrolled Fellows to Onboarding Kickoff', employeeCode: 'A30', type: 'employee_task', description: 'Initialize welcome checklist and fellow directory entry.' }
    ]
  },
  {
    id: 'wf-paid-acquisition',
    name: 'Paid Campaign Launch',
    outcome: 'Targeted Meta and Google ad deployment with creative pairings, $50/day guardrails, and conversion tracking',
    shortDescription: 'Creative hook drafting, visual ad pairing, high-intent search keywords, budget safety caps, and CPA attribution.',
    category: 'Growth & Marketing',
    participatingEmployeeIds: ['emp-a08', 'emp-a18', 'emp-a12', 'emp-a19', 'emp-a24', 'emp-a25', 'emp-a27', 'emp-a13'],
    typicalDuration: '5–7 days',
    approvalPoints: [
      'Ad Creative Pairing & Daily Budget Authorization'
    ],
    expectedSteps: [
      { title: 'Define Campaign Objectives & Target CPL Target', employeeCode: 'A08', type: 'employee_task', description: 'Establish $35 target cost-per-lead and define director audience parameters.' },
      { title: 'Develop Campaign Angles & Creative Hooks', employeeCode: 'A18', type: 'employee_task', description: 'Structure headline angles pairing executive pain points with quantifiable solutions.' },
      { title: 'Produce Ad Copy Variations & Search Headlines', employeeCode: 'A12', type: 'employee_task', description: 'Draft 5 short-form feed captions and 8 responsive search ad headlines.' },
      { title: 'Design High-Contrast Ad Visuals & Carousels', employeeCode: 'A19', type: 'employee_task', description: 'Export brand-calibrated visuals with legible typographic hierarchy.' },
      { title: 'Founder Signoff on Ad Sets & Daily Budget Cap', employeeCode: 'A01', type: 'human_approval', description: 'Authorize $50/day spending cap on Meta and Google search bidding.' },
      { title: 'Simulate Meta & Google Ads Launch', employeeCode: 'A24', type: 'employee_task', description: 'Activate ad sets targeting California directors with negative keyword exclusions.' },
      { title: 'Audit Landing Page Conversion Rate & Run A/B Split', employeeCode: 'A27', type: 'employee_task', description: 'Monitor control vs challenger conversion rate and report statistical confidence.' },
      { title: 'Calculate Multi-Touch CPA & Channel Attribution', employeeCode: 'A13', type: 'employee_task', description: 'Consolidate spend, cost-per-lead, and pipeline ROI into analytics table.' }
    ]
  },
  {
    id: 'wf-customer-onboarding',
    name: 'Customer Onboarding & Renewal',
    outcome: 'Seamless transition from signed proposal to kickoff call, calendar defense, and retention milestones',
    shortDescription: 'Deal closure verification, faculty kickoff scheduling, fellow workbook delivery, and quarterly renewal reviews.',
    category: 'Customer Operations',
    participatingEmployeeIds: ['emp-a31', 'emp-a30', 'emp-a01', 'emp-a10'],
    typicalDuration: '4 weeks',
    approvalPoints: [
      'Final Proposal Terms & Corporate Invoice Signoff'
    ],
    expectedSteps: [
      { title: 'Review Custom Scope & Commercial Quotation', employeeCode: 'A31', type: 'employee_task', description: 'Verify seat counts, custom breakout sessions, and payment terms.' },
      { title: 'Execute Client Commercial Signoff', employeeCode: 'A31', type: 'human_approval', description: 'Simulate client digital signature and move opportunity to Closed Won.' },
      { title: 'Initialize Onboarding Milestone Checklist', employeeCode: 'A30', type: 'employee_task', description: 'Set up 5-point fellow onboarding tracker and schedule faculty kickoff.' },
      { title: 'Schedule 30-Min Faculty Orientation Buffers', employeeCode: 'A01', type: 'employee_task', description: 'Coordinate founder calendar slots for orientation calls.' },
      { title: 'Dispatch Orientation Syllabus & Executive Workbook', employeeCode: 'A10', type: 'employee_task', description: 'Send welcome email sequence with portal access credentials.' },
      { title: 'Monitor Account Health & Propose Expansion', employeeCode: 'A30', type: 'employee_task', description: 'Track module completion and prepare 50-seat corporate expansion proposal.' }
    ]
  }
];
