import { GoalIntent, IntegrationProvider } from '../types';

export interface GoalIntentProfile {
  intent: GoalIntent;
  label: string;
  description: string;
  recommendedPlaybookId?: string;
  recommendedPlaybookName?: string;
  recommendedTeam: {
    employeeCode: string;
    roleTitle: string;
    defaultResponsibility: string;
  }[];
  proposedStages: {
    name: string;
    ownerEmployeeCode: string;
    type: 'employee_task' | 'human_approval';
    description: string;
  }[];
  humanApprovalPoints: string[];
  requiredConnections: {
    provider: IntegrationProvider;
    label: string;
    ready: boolean;
  }[];
  deliverables: string[];
  successMetrics: string[];
}

export const GOAL_INTENT_PROFILES: Record<GoalIntent, GoalIntentProfile> = {
  BRAND_FOUNDATION: {
    intent: 'BRAND_FOUNDATION',
    label: 'Brand Foundation & Positioning',
    description: 'Establish unified brand positioning, value propositions, and calibrated tone guidelines.',
    recommendedTeam: [
      { employeeCode: 'A08', roleTitle: 'Strategy', defaultResponsibility: 'Define market category positioning and competitive moat' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Draft brand narrative, elevator pitch, and approved claims matrix' },
      { employeeCode: 'A18', roleTitle: 'Creative Direction', defaultResponsibility: 'Establish aesthetic rules, visual moodboard, and design tokens' },
      { employeeCode: 'A06', roleTitle: 'Legal Review', defaultResponsibility: 'Verify trademark safety and approved customer disclaimers' }
    ],
    proposedStages: [
      { name: 'Competitive Positioning & ICP Definition', ownerEmployeeCode: 'A08', type: 'employee_task', description: 'Analyze market gap and target buyer profiles.' },
      { name: 'Core Narrative & Value Proposition Matrix', ownerEmployeeCode: 'A12', type: 'employee_task', description: 'Draft messaging pillars and safe approved claims.' },
      { name: 'Founder Signoff on Brand Voice & Claims', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Authorize final messaging calibration before distribution.' },
      { name: 'Visual Moodboard & Design Guidelines', ownerEmployeeCode: 'A18', type: 'employee_task', description: 'Produce creative brief and asset styling system.' }
    ],
    humanApprovalPoints: ['Brand Voice & Approved Claims Signoff', 'Public Trademark & Legal Disclaimers'],
    requiredConnections: [
      { provider: 'website_cms', label: 'Company CMS / Website', ready: true },
      { provider: 'google_workspace', label: 'Google Workspace Docs', ready: true }
    ],
    deliverables: ['Positioning Framework', 'Approved Claims Matrix', 'Brand Voice Guidebook', 'Creative Moodboard'],
    successMetrics: ['100% Specialist Persona Tone Alignment', 'Zero Regulatory Claim Violations']
  },

  WEBSITE_LAUNCH: {
    intent: 'WEBSITE_LAUNCH',
    label: 'Website & Landing Page Launch',
    description: 'Deploy conversion-focused landing pages with lead capture, verified copy, and rollback safety.',
    recommendedPlaybookId: 'wf-product-launch',
    recommendedPlaybookName: 'Product & Landing Page Launch',
    recommendedTeam: [
      { employeeCode: 'A07', roleTitle: 'Website Builder', defaultResponsibility: 'Deploy responsive layout, lead form, and version rollback' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Write headline variations, benefit hooks, and FAQ answers' },
      { employeeCode: 'A18', roleTitle: 'Creative Direction', defaultResponsibility: 'Structure page visual hierarchy and hero styling' },
      { employeeCode: 'A03', roleTitle: 'SEO Specialist', defaultResponsibility: 'Configure meta tags, OpenGraph data, and search clusters' },
      { employeeCode: 'A27', roleTitle: 'Conversion Specialist', defaultResponsibility: 'Validate form conversion telemetry and split test baseline' }
    ],
    proposedStages: [
      { name: 'Page Wireframe & Architecture', ownerEmployeeCode: 'A07', type: 'employee_task', description: 'Build responsive single-page container and form inputs.' },
      { name: 'Conversion Headline & Benefit Copy', ownerEmployeeCode: 'A12', type: 'employee_task', description: 'Draft hero headline variations and objection FAQs.' },
      { name: 'Founder Page Review & Legal Terms Signoff', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Verify offer terms, guarantees, and publish authorization.' },
      { name: 'Live Deployment & Lead Form Testing', ownerEmployeeCode: 'A07', type: 'employee_task', description: 'Simulate lead submission and establish baseline version.' },
      { name: 'SEO Meta Audit & Search Indexing', ownerEmployeeCode: 'A03', type: 'employee_task', description: 'Verify metadata and structured JSON-LD preview.' }
    ],
    humanApprovalPoints: ['Landing Page Copy & Offer Terms Approval', 'Public Domain Live Publish Authorization'],
    requiredConnections: [
      { provider: 'website_cms', label: 'Custom Domain CMS', ready: true },
      { provider: 'google_workspace', label: 'Lead Notification Mailbox', ready: true }
    ],
    deliverables: ['Live Responsive Landing Page', '3 Tested Headline Variations', 'Working Lead Capture Form', 'SEO Meta Audit'],
    successMetrics: ['>8% Inbound Visitor Conversion Rate', '<60s Lead Sync Latency']
  },

  SEO_VISIBILITY: {
    intent: 'SEO_VISIBILITY',
    label: 'SEO & Organic Search Visibility',
    description: 'Target high-intent search queries with long-form pillar content and internal link structure.',
    recommendedPlaybookId: 'wf-content-engine',
    recommendedPlaybookName: 'Weekly Content Engine',
    recommendedTeam: [
      { employeeCode: 'A03', roleTitle: 'SEO & Editorial', defaultResponsibility: 'Conduct search intent research and write 1,500w pillar guides' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Refine editorial readability, titles, and engagement hooks' },
      { employeeCode: 'A19', roleTitle: 'Visual Design', defaultResponsibility: 'Generate branded infographics and article header visuals' },
      { employeeCode: 'A13', roleTitle: 'Attribution Analyst', defaultResponsibility: 'Track organic keyword impressions, clicks, and conversion' }
    ],
    proposedStages: [
      { name: 'High-Intent Search Keyword Research', ownerEmployeeCode: 'A03', type: 'employee_task', description: 'Identify buyer-intent keywords and semantic clusters.' },
      { name: 'Long-Form Pillar Article Drafting', ownerEmployeeCode: 'A03', type: 'employee_task', description: 'Write comprehensive tactical guide with internal links.' },
      { name: 'Editorial Tone & Fact Signoff', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Verify technical accuracy against approved claims.' },
      { name: 'Publish to Editorial CMS', ownerEmployeeCode: 'A03', type: 'employee_task', description: 'Format and schedule article on company blog.' }
    ],
    humanApprovalPoints: ['Pillar Article Editorial Signoff'],
    requiredConnections: [
      { provider: 'website_cms', label: 'Editorial Blog CMS', ready: true },
      { provider: 'google_ads', label: 'Google Search Console', ready: true }
    ],
    deliverables: ['Keyword Intent Cluster Map', '1,500-Word Tactical Pillar Article', 'Infographic Diagram'],
    successMetrics: ['Top 5 Search Rankings for Core Terms', '30%+ Organic Search Reader Engagement']
  },

  AEO_GEO_VISIBILITY: {
    intent: 'AEO_GEO_VISIBILITY',
    label: 'AI & Generative Engine Optimization (AEO/GEO)',
    description: 'Audit citations across Perplexity, ChatGPT, and Claude to ensure accurate brand answers.',
    recommendedTeam: [
      { employeeCode: 'A26', roleTitle: 'Answer-Engine Visibility', defaultResponsibility: 'Audit AI citation frequency and identify structured knowledge gaps' },
      { employeeCode: 'A03', roleTitle: 'SEO Specialist', defaultResponsibility: 'Publish authoritative schema-grounded FAQ references' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Format concise definition snippets for LLM retrieval' }
    ],
    proposedStages: [
      { name: 'Perplexity & ChatGPT Citation Audit', ownerEmployeeCode: 'A26', type: 'employee_task', description: 'Probe generative models with 15 category prompts.' },
      { name: 'Knowledge Gap Extraction & Snippet Drafting', ownerEmployeeCode: 'A12', type: 'employee_task', description: 'Produce citable factual definitions answering missing queries.' },
      { name: 'Review Citation Accuracy & Authorize Knowledge Update', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Ensure generated claims match company factual policy.' },
      { name: 'Deploy Structured Knowledge to Web CMS', ownerEmployeeCode: 'A03', type: 'employee_task', description: 'Update crawlable FAQ schema on company domain.' }
    ],
    humanApprovalPoints: ['AI Citation Audit Review & Factual Knowledge Updates'],
    requiredConnections: [
      { provider: 'website_cms', label: 'Domain Structured Schema', ready: true }
    ],
    deliverables: ['Generative Engine Citation Audit Report', 'Citable Definition Snippets', 'Structured JSON-LD Knowledge Base'],
    successMetrics: ['>80% Accurate Brand Mentions in AI Answers', '0 Hallucinated Competitor Claims']
  },

  CONTENT_ENGINE: {
    intent: 'CONTENT_ENGINE',
    label: 'Content Engine & Social Distribution',
    description: 'Transform strategic business themes into weekly multi-channel posts, graphics, and newsletters.',
    recommendedPlaybookId: 'wf-content-engine',
    recommendedPlaybookName: 'Weekly Content Engine',
    recommendedTeam: [
      { employeeCode: 'A08', roleTitle: 'Strategy', defaultResponsibility: 'Select weekly theme aligned with quarterly commercial goals' },
      { employeeCode: 'A03', roleTitle: 'Editorial', defaultResponsibility: 'Write in-depth pillar article' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Repurpose article into LinkedIn posts, X threads, and newsletter' },
      { employeeCode: 'A19', roleTitle: 'Visual Design', defaultResponsibility: 'Produce 1:1 and 9:16 quote cards and carousels' },
      { employeeCode: 'A02', roleTitle: 'Social Publisher', defaultResponsibility: 'Queue posts across connected LinkedIn and Instagram channels' },
      { employeeCode: 'A21', roleTitle: 'Community Manager', defaultResponsibility: 'Monitor replies, answer comments, and triage questions' }
    ],
    proposedStages: [
      { name: 'Select Weekly Theme & Core Hook', ownerEmployeeCode: 'A08', type: 'employee_task', description: 'Identify market trend aligned with target offer.' },
      { name: 'Draft 3 High-Impact Social Copy Hooks', ownerEmployeeCode: 'A12', type: 'employee_task', description: 'Create platform-native thought leadership drafts.' },
      { name: 'Design Multi-Ratio Visual Assets', ownerEmployeeCode: 'A19', type: 'employee_task', description: 'Export brand-calibrated quote cards.' },
      { name: 'Founder Signoff on Public Posts', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Review copy and tone before scheduling.' },
      { name: 'Schedule Across Connected Channels', ownerEmployeeCode: 'A02', type: 'employee_task', description: 'Queue dispatches on LinkedIn and Meta Instagram.' }
    ],
    humanApprovalPoints: ['Final Social Copy & Visual Signoff'],
    requiredConnections: [
      { provider: 'linkedin_page', label: 'LinkedIn Company Page', ready: true },
      { provider: 'instagram_pro', label: 'Instagram Professional', ready: true }
    ],
    deliverables: ['Weekly Pillar Draft', '5 Multi-Channel Social Posts', '3 Multi-Ratio Visual Cards', 'Weekly Distribution Schedule'],
    successMetrics: ['>15,000 Weekly Impressions', '>25 Meaningful Inbound Engagements']
  },

  AWARENESS_CAMPAIGN: {
    intent: 'AWARENESS_CAMPAIGN',
    label: 'Brand Awareness & Thought Leadership',
    description: 'Amplify executive thought leadership, secure industry mentions, and drive brand recognition.',
    recommendedTeam: [
      { employeeCode: 'A18', roleTitle: 'Creative Direction', defaultResponsibility: 'Formulate provocative industry point-of-view and campaign theme' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Draft executive thought leadership essays and press blurbs' },
      { employeeCode: 'A22', roleTitle: 'Brand Listener', defaultResponsibility: 'Monitor web mentions and track sentiment across newsletters' },
      { employeeCode: 'A02', roleTitle: 'Social Publisher', defaultResponsibility: 'Distribute organic announcements across founder channels' }
    ],
    proposedStages: [
      { name: 'Campaign Angle & Core Narrative', ownerEmployeeCode: 'A18', type: 'employee_task', description: 'Establish contrarian industry point-of-view.' },
      { name: 'Executive Essays & Media Briefs', ownerEmployeeCode: 'A12', type: 'employee_task', description: 'Write 3 thought-leadership articles.' },
      { name: 'Founder Approval on Public Executive Essays', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Verify personal voice and strategic alignment.' },
      { name: 'Multi-Channel Public Broadcast', ownerEmployeeCode: 'A02', type: 'employee_task', description: 'Publish across company and executive feeds.' }
    ],
    humanApprovalPoints: ['Executive Essay & Public Statement Signoff'],
    requiredConnections: [
      { provider: 'linkedin_page', label: 'LinkedIn Company Page', ready: true },
      { provider: 'meta_business', label: 'Meta Business Suite', ready: true }
    ],
    deliverables: ['Campaign Point-of-View Brief', '3 Executive Thought-Leadership Posts', 'Mention Monitoring Stream'],
    successMetrics: ['+50% Growth in Brand Search Impressions', '>30 Media/Peer Re-shares']
  },

  LEAD_GENERATION: {
    intent: 'LEAD_GENERATION',
    label: 'Qualified Inbound Lead Generation',
    description: 'Drive high-intent inquiries with dedicated landing pages, paid ads, and sub-60s qualification.',
    recommendedPlaybookId: 'wf-comment-to-lead',
    recommendedPlaybookName: 'Comment-to-Lead Funnel',
    recommendedTeam: [
      { employeeCode: 'A24', roleTitle: 'Meta Ads', defaultResponsibility: 'Deploy targeted feed ads within $50/day budget cap' },
      { employeeCode: 'A25', roleTitle: 'Google Ads', defaultResponsibility: 'Target high-intent search keywords with negative list hygiene' },
      { employeeCode: 'A17', roleTitle: 'Inbound Sales', defaultResponsibility: 'Qualify inbound inquiries in under 60 seconds and book discovery calls' },
      { employeeCode: 'A29', roleTitle: 'Revenue Operations', defaultResponsibility: 'Deduplicate lead records, sync CRM, and verify contact health' },
      { employeeCode: 'A07', roleTitle: 'Website Builder', defaultResponsibility: 'Host dedicated lead qualification form' },
      { employeeCode: 'A18', roleTitle: 'Creative Direction', defaultResponsibility: 'Pair high-converting visual hooks with offer copy' }
    ],
    proposedStages: [
      { name: 'Lead Form & Conversion Page Setup', ownerEmployeeCode: 'A07', type: 'employee_task', description: 'Deploy frictionless qualification questionnaire.' },
      { name: 'Ad Copy & Creative Hook Generation', ownerEmployeeCode: 'A18', type: 'employee_task', description: 'Produce 3 targeted pain-point ad creatives.' },
      { name: 'Founder Signoff on Ad Sets & Daily Budget Cap', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Authorize ad campaign spend limits and messaging.' },
      { name: 'Activate Ad Sets & Inbound Speed-to-Lead Router', ownerEmployeeCode: 'A24', type: 'employee_task', description: 'Launch ad spend simulation and listen for incoming leads.' },
      { name: 'Triage Inbound Contacts & Calendar Booking', ownerEmployeeCode: 'A17', type: 'employee_task', description: 'Qualify respondents and book calendar meetings.' }
    ],
    humanApprovalPoints: ['Ad Creative & Daily Budget Cap Authorization', 'Outbound SMS/Call Routing Permissions'],
    requiredConnections: [
      { provider: 'google_ads', label: 'Google Ads Account', ready: true },
      { provider: 'meta_business', label: 'Meta Ad Account', ready: true },
      { provider: 'google_workspace', label: 'Google Calendar Scheduling', ready: true }
    ],
    deliverables: ['High-Converting Lead Form', '3 Ad Creative Pairings', 'Inbound Qualification Matrix', 'Automated Calendar Router'],
    successMetrics: ['100+ Qualified Inbound Enquiries', '<$35 Cost Per Lead', '>20 Booked Discovery Calls']
  },

  PRODUCT_LAUNCH: {
    intent: 'PRODUCT_LAUNCH',
    label: 'Product & Offer Launch',
    description: 'Coordinate positioning, conversion sales pages, promotional cadences, and sales qualification.',
    recommendedPlaybookId: 'wf-product-launch',
    recommendedPlaybookName: 'Product / Offer Launch',
    recommendedTeam: [
      { employeeCode: 'A08', roleTitle: 'Strategy', defaultResponsibility: 'Structure offer tiers, pricing economics, and early-bird deadlines' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Draft conversion sales page copy and objection FAQs' },
      { employeeCode: 'A07', roleTitle: 'Website Builder', defaultResponsibility: 'Deploy sales page with live payment or application form' },
      { employeeCode: 'A19', roleTitle: 'Visual Design', defaultResponsibility: 'Produce promotional carousels and announcement graphics' },
      { employeeCode: 'A10', roleTitle: 'Lifecycle Marketing', defaultResponsibility: 'Configure 3-touch launch email sequence to waitlist' },
      { employeeCode: 'A02', roleTitle: 'Social Publisher', defaultResponsibility: 'Broadcast launch countdown across LinkedIn and Instagram' },
      { employeeCode: 'A17', roleTitle: 'Inbound Sales', defaultResponsibility: 'Qualify executive applications and reserve limited seats' }
    ],
    proposedStages: [
      { name: 'Offer Architecture & Pricing Definition', ownerEmployeeCode: 'A08', type: 'employee_task', description: 'Define deliverables, seat caps, and refund terms.' },
      { name: 'Sales Page Copy & Technical Deployment', ownerEmployeeCode: 'A07', type: 'employee_task', description: 'Publish responsive checkout and enrollment page.' },
      { name: 'Founder Signoff on Pricing & Refund Policy', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Authorize commercial terms before public release.' },
      { name: 'Multi-Touch Email & Social Announcement', ownerEmployeeCode: 'A10', type: 'employee_task', description: 'Dispatch teaser and doors-open sequences.' },
      { name: 'Seat Application Triage & Enrollment Closing', ownerEmployeeCode: 'A17', type: 'employee_task', description: 'Qualify applicants and lock in cohort seats.' }
    ],
    humanApprovalPoints: ['Pricing, Guarantee & Refund Terms Authorization', 'Waitlist Email Sequence Schedule Approval'],
    requiredConnections: [
      { provider: 'stripe_billing', label: 'Stripe Merchant Gateway', ready: true },
      { provider: 'website_cms', label: 'Web Landing Page', ready: true },
      { provider: 'google_workspace', label: 'Announcement Mailbox', ready: true }
    ],
    deliverables: ['Live Sales Landing Page', 'Pricing Matrix', '3-Touch Email Sequence', 'Social Countdown Kit', 'Application Pipeline'],
    successMetrics: ['100% Target Seats/Units Sold Out', 'Zero Refund/Chargeback Disputes']
  },

  ECOMMERCE_GROWTH: {
    intent: 'ECOMMERCE_GROWTH',
    label: 'E-Commerce Catalog & Sales Growth',
    description: 'Optimize product catalogs, drive purchase traffic, and recover abandoned shopping carts.',
    recommendedTeam: [
      { employeeCode: 'A32', roleTitle: 'Commerce Assistant', defaultResponsibility: 'Manage serialized product inventory and cart abandonment recovery' },
      { employeeCode: 'A24', roleTitle: 'Meta Ads', defaultResponsibility: 'Deploy dynamic product catalog ads to high-intent shoppers' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Write evocative product descriptions and promotional hooks' },
      { employeeCode: 'A11', roleTitle: 'Customer Support', defaultResponsibility: 'Resolve instant pre-purchase sizing, shipping, and return inquiries' },
      { employeeCode: 'A30', roleTitle: 'Customer Success', defaultResponsibility: 'Monitor repurchase milestones and unboxing feedback' }
    ],
    proposedStages: [
      { name: 'Catalog Inventory & Pricing Audit', ownerEmployeeCode: 'A32', type: 'employee_task', description: 'Audit product variants, available units, and checkout flows.' },
      { name: 'Product Storytelling & Benefit Copy', ownerEmployeeCode: 'A12', type: 'employee_task', description: 'Draft compelling product descriptions and social hooks.' },
      { name: 'Authorize Discount Code & Ad Spend Budget', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Verify margin health and ad spend limit.' },
      { name: 'Launch Catalog Ads & Abandoned Cart Recovery', ownerEmployeeCode: 'A32', type: 'employee_task', description: 'Activate automated checkout recovery reminders.' },
      { name: 'Customer Support FAQ Grounding', ownerEmployeeCode: 'A11', type: 'employee_task', description: 'Load shipping, sizing, and guarantee answers into chat queue.' }
    ],
    humanApprovalPoints: ['Promo Discount & Margin Guardrails Signoff', 'Ad Spend Budget Authorization'],
    requiredConnections: [
      { provider: 'stripe_billing', label: 'Stripe / Shopify Gateway', ready: true },
      { provider: 'meta_business', label: 'Meta Catalog Feed', ready: true }
    ],
    deliverables: ['Optimized Product Catalog', 'Abandoned Cart Automation', 'Product Ad Creative Sets', 'Grounded Support Queue'],
    successMetrics: ['>18% Cart Abandonment Recovery Rate', '3.5x Return on Ad Spend (ROAS)']
  },

  EVENT_WEBINAR: {
    intent: 'EVENT_WEBINAR',
    label: 'Webinar & Virtual Masterclass Launch',
    description: 'Promote live executive sessions, coordinate RSVP landing pages, and nurture attendees to clients.',
    recommendedPlaybookId: 'wf-webinar-event',
    recommendedPlaybookName: 'Webinar / Event Launch',
    recommendedTeam: [
      { employeeCode: 'A08', roleTitle: 'Strategy', defaultResponsibility: 'Design 45-minute tactical masterclass curriculum and pitch framework' },
      { employeeCode: 'A07', roleTitle: 'Website Builder', defaultResponsibility: 'Deploy 1-click RSVP registration page' },
      { employeeCode: 'A02', roleTitle: 'Social Publisher', defaultResponsibility: 'Schedule promotional announcements and speaker quotes' },
      { employeeCode: 'A10', roleTitle: 'Lifecycle Marketing', defaultResponsibility: 'Send 24h and 1h calendar reminders with workbook' },
      { employeeCode: 'A17', roleTitle: 'Inbound Sales', defaultResponsibility: 'Qualify corporate team leads for cohort enrollment' }
    ],
    proposedStages: [
      { name: 'Masterclass Topic & Key Takeaways', ownerEmployeeCode: 'A08', type: 'employee_task', description: 'Outline interactive executive agenda.' },
      { name: 'RSVP Landing Page Deployment', ownerEmployeeCode: 'A07', type: 'employee_task', description: 'Build responsive registration form.' },
      { name: 'Founder Signoff on Masterclass Curriculum & Date', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Verify topic, date, and calendar availability.' },
      { name: 'Social Promotion & Calendar Reminders', ownerEmployeeCode: 'A02', type: 'employee_task', description: 'Broadcast registration links and queue email reminders.' },
      { name: 'Post-Event Attendee Triage & Strategy Handoff', ownerEmployeeCode: 'A17', type: 'employee_task', description: 'Follow up with attendees to book 1-on-1 strategy sessions.' }
    ],
    humanApprovalPoints: ['Event Agenda & Registration Page Review'],
    requiredConnections: [
      { provider: 'website_cms', label: 'Registration Page Host', ready: true },
      { provider: 'google_workspace', label: 'Google Calendar / Meet', ready: true }
    ],
    deliverables: ['Live RSVP Landing Page', 'Masterclass Slide Deck Outline', 'Reminder Email Cadence', 'Attendee Lead List'],
    successMetrics: ['>60 RSVP Registrations', '>45% Live Attendance Rate', '>10 Post-Session Discovery Calls']
  },

  OUTBOUND_SALES: {
    intent: 'OUTBOUND_SALES',
    label: 'B2B Outbound Prospecting & Cadences',
    description: 'Enrich target executive contacts, verify domain health, and run personalized 3-touch email sequences.',
    recommendedPlaybookId: 'wf-outbound-sales',
    recommendedPlaybookName: 'Outbound Sales Campaign',
    recommendedTeam: [
      { employeeCode: 'A04', roleTitle: 'Prospect Researcher', defaultResponsibility: 'Filter ICP leads, enrich emails, and map CSV columns' },
      { employeeCode: 'A29', roleTitle: 'Revenue Operations', defaultResponsibility: 'Audit SPF/DKIM sender health and suppress opt-outs' },
      { employeeCode: 'A16', roleTitle: 'Outbound Sales Specialist', defaultResponsibility: 'Compose personalized 3-step value-first email cadences' },
      { employeeCode: 'A09', roleTitle: 'Sales Manager', defaultResponsibility: 'Track deal stages, coach objection replies, and log meetings' }
    ],
    proposedStages: [
      { name: 'ICP Contact Sourcing & CSV Enrichment', ownerEmployeeCode: 'A04', type: 'employee_task', description: 'Filter target titles and verify email validity.' },
      { name: 'Sender Domain Health & Suppression Audit', ownerEmployeeCode: 'A29', type: 'employee_task', description: 'Verify bounce risk under 2% and check unsubscribe lists.' },
      { name: 'Draft Personalized 3-Touch Email Cadence', ownerEmployeeCode: 'A16', type: 'employee_task', description: 'Write personalized hook, proof story, and soft CTA.' },
      { name: 'Founder Approval on Prospect Batch & Email Steps', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Review recipient list and daily sending rate cap.' },
      { name: 'Simulate Step 1 Outbound Dispatch', ownerEmployeeCode: 'A16', type: 'employee_task', description: 'Queue emails respecting rate limits with opt-out monitoring.' },
      { name: 'Triage Replies & Book Discovery Calls', ownerEmployeeCode: 'A09', type: 'employee_task', description: 'Advance interested replies to Discovery meetings.' }
    ],
    humanApprovalPoints: ['Prospect List & Personalized Email Cadence Authorization'],
    requiredConnections: [
      { provider: 'google_workspace', label: 'Sending Mailbox (SPF/DKIM Verified)', ready: true },
      { provider: 'linkedin_page', label: 'LinkedIn Profile Context', ready: true }
    ],
    deliverables: ['100 Enriched ICP Contacts', 'Personalized 3-Touch Cadence', 'Domain Health Audit', 'Suppression List'],
    successMetrics: ['>45% Email Open Rate', '>12% Positive Reply Rate', '>8 Booked Discovery Calls']
  },

  INBOUND_SALES: {
    intent: 'INBOUND_SALES',
    label: 'Inbound Speed-to-Lead & Qualification',
    description: 'Instantly respond to contact forms, qualify prospect budgets, and book meetings on your calendar.',
    recommendedTeam: [
      { employeeCode: 'A17', roleTitle: 'Inbound Salesperson', defaultResponsibility: 'Qualify inbound inquiries in under 60 seconds and deliver booking links' },
      { employeeCode: 'A05', roleTitle: 'Receptionist', defaultResponsibility: 'Answer simulated phone calls, transcribe voicemails, and route callers' },
      { employeeCode: 'A09', roleTitle: 'Sales Manager', defaultResponsibility: 'Structure qualification criteria (BANT) and stage progression' },
      { employeeCode: 'A31', roleTitle: 'Proposal & Deal Desk', defaultResponsibility: 'Draft commercial scope quotes for qualified prospects' }
    ],
    proposedStages: [
      { name: 'Qualification Criteria & Routing Rules', ownerEmployeeCode: 'A09', type: 'employee_task', description: 'Set budget, authority, and timeline filters.' },
      { name: 'Configure Automated Speed-to-Lead Response', ownerEmployeeCode: 'A17', type: 'employee_task', description: 'Draft instant personalized reply and calendar link.' },
      { name: 'Authorize Inbound Qualification Script & Phone Route', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Sign off on meeting booking rules and voicemail transcript.' },
      { name: 'Simulate Inbound Lead Ingestion & Booking', ownerEmployeeCode: 'A17', type: 'employee_task', description: 'Process form submissions and confirm calendar holds.' }
    ],
    humanApprovalPoints: ['Inbound Qualification Script & Booking Link Authorization'],
    requiredConnections: [
      { provider: 'google_workspace', label: 'Google Calendar Scheduling', ready: true },
      { provider: 'voice_twilio', label: 'Virtual Voice Line', ready: true }
    ],
    deliverables: ['Qualification Criteria Matrix', 'Speed-to-Lead Response Template', 'Calendar Booking Link Router', 'Inbound Lead Pipeline'],
    successMetrics: ['<60s Speed-to-Lead Response Time', '>65% Inbound Qualification Rate']
  },

  RETENTION_RENEWAL: {
    intent: 'RETENTION_RENEWAL',
    label: 'Customer Retention & Account Expansion',
    description: 'Track client onboarding milestones, calculate account health, and propose expansion renewals.',
    recommendedPlaybookId: 'wf-customer-onboarding',
    recommendedPlaybookName: 'Customer Onboarding & Renewal',
    recommendedTeam: [
      { employeeCode: 'A30', roleTitle: 'Customer Success', defaultResponsibility: 'Track client milestone checklist, health scoring, and expansion proposals' },
      { employeeCode: 'A10', roleTitle: 'Lifecycle Marketing', defaultResponsibility: 'Dispatch onboarding emails and portal orientation access' },
      { employeeCode: 'A11', roleTitle: 'Customer Support', defaultResponsibility: 'Resolve implementation blockers and answer technical questions' },
      { employeeCode: 'A31', roleTitle: 'Proposal & Deal Desk', defaultResponsibility: 'Draft annual contract renewals and expansion quotes' }
    ],
    proposedStages: [
      { name: 'Client Onboarding Milestone Checklist', ownerEmployeeCode: 'A30', type: 'employee_task', description: 'Set up 5-point success checklist and kickoff schedule.' },
      { name: 'Dispatch Orientation Workbook & Credentials', ownerEmployeeCode: 'A10', type: 'employee_task', description: 'Send welcome sequence with portal access.' },
      { name: 'Review Account Health & Expansion Terms', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Sign off on renewal terms and corporate seat expansion.' },
      { name: 'Deliver Renewal Agreement & Scope Table', ownerEmployeeCode: 'A31', type: 'employee_task', description: 'Present digital contract to corporate decision-maker.' }
    ],
    humanApprovalPoints: ['Renewal Agreement & Expansion Pricing Signoff'],
    requiredConnections: [
      { provider: 'stripe_billing', label: 'Recurring Subscription Gateway', ready: true },
      { provider: 'google_workspace', label: 'Client Calendar & Email', ready: true }
    ],
    deliverables: ['5-Point Onboarding Checklist', 'Welcome Sequence Kit', 'Health Score Tracker', 'Contract Expansion Quote'],
    successMetrics: ['>95% Client Onboarding Completion', '>85% Account Annual Renewal Rate']
  },

  REPUTATION_MANAGEMENT: {
    intent: 'REPUTATION_MANAGEMENT',
    label: 'Brand Reputation & Sentiment Monitoring',
    description: 'Monitor public web mentions, triage customer sentiment, and address brand reviews with care.',
    recommendedTeam: [
      { employeeCode: 'A22', roleTitle: 'Brand Listener', defaultResponsibility: 'Monitor web, press, and newsletter mentions with sentiment tagging' },
      { employeeCode: 'A21', roleTitle: 'Community Manager', defaultResponsibility: 'Moderate social comments and draft thoughtful, empathetic replies' },
      { employeeCode: 'A11', roleTitle: 'Customer Support', defaultResponsibility: 'Resolve customer service issues surfaced in public reviews' },
      { employeeCode: 'A06', roleTitle: 'Legal Assistant', defaultResponsibility: 'Flag defamatory claims or regulatory compliance risks' }
    ],
    proposedStages: [
      { name: 'Web & Social Sentiment Scan', ownerEmployeeCode: 'A22', type: 'employee_task', description: 'Monitor incoming mentions and classify sentiment.' },
      { name: 'Draft Empathetic Resolution Responses', ownerEmployeeCode: 'A21', type: 'employee_task', description: 'Prepare constructive replies following anti-censorship rules.' },
      { name: 'Founder Review of Sensitive Public Escalations', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Authorize public statement for escalated reviews.' },
      { name: 'Publish Resolution & Internal FAQ Update', ownerEmployeeCode: 'A21', type: 'employee_task', description: 'Post public response and record root lesson in memory.' }
    ],
    humanApprovalPoints: ['Public Dispute Response & Escalation Signoff'],
    requiredConnections: [
      { provider: 'meta_business', label: 'Public Comment Moderation Feed', ready: true },
      { provider: 'linkedin_page', label: 'Company Feed Notifications', ready: true }
    ],
    deliverables: ['Sentiment Distribution Stream', 'Response Protocol Matrix', 'Grounded Lesson Update'],
    successMetrics: ['<30m Response Time to Critical Mentions', '>90% Neutral/Positive Public Sentiment']
  },

  CUSTOM: {
    intent: 'CUSTOM',
    label: 'Custom Multi-Agent Initiative',
    description: 'Assemble a tailored team of AI specialists with custom stages and specific business deliverables.',
    recommendedTeam: [
      { employeeCode: 'A08', roleTitle: 'Strategy Lead', defaultResponsibility: 'Structure overall initiative objectives and milestone checkpoints' },
      { employeeCode: 'A12', roleTitle: 'Copywriting', defaultResponsibility: 'Produce all written messaging and strategic documentation' },
      { employeeCode: 'A18', roleTitle: 'Creative Direction', defaultResponsibility: 'Develop creative concepts, hooks, and asset directions' },
      { employeeCode: 'A02', roleTitle: 'Distribution', defaultResponsibility: 'Coordinate distribution across relevant channels' },
      { employeeCode: 'A17', roleTitle: 'Lead Triage', defaultResponsibility: 'Manage customer responses and conversion steps' }
    ],
    proposedStages: [
      { name: 'Initiative Scope & Deliverables Definition', ownerEmployeeCode: 'A08', type: 'employee_task', description: 'Define primary success criteria and milestone schedule.' },
      { name: 'Draft Campaign Assets & Offer Framing', ownerEmployeeCode: 'A12', type: 'employee_task', description: 'Produce initial draft deliverables.' },
      { name: 'Founder Milestone Review & Authorization', ownerEmployeeCode: 'A01', type: 'human_approval', description: 'Verify deliverables match expected quality standards.' },
      { name: 'Execute Distribution & Monitor Outcomes', ownerEmployeeCode: 'A02', type: 'employee_task', description: 'Launch initiative and log results.' }
    ],
    humanApprovalPoints: ['Core Deliverables & Public Launch Signoff'],
    requiredConnections: [
      { provider: 'google_workspace', label: 'Workspace Collaboration', ready: true }
    ],
    deliverables: ['Initiative Strategy Brief', 'Campaign Creative Kit', 'Outcome Performance Log'],
    successMetrics: ['100% Milestone Completion on Target Deadline']
  }
};

export const inferGoalIntent = (text: string): GoalIntent => {
  const lower = text.toLowerCase().trim();

  // 1. Specific technical or specialized checks
  if (lower.includes('aeo') || lower.includes('geo') || lower.includes('perplexity') || lower.includes('chatgpt') || lower.includes('generative engine') || lower.includes('ai citation')) {
    return 'AEO_GEO_VISIBILITY';
  }
  if (lower.includes('website') || lower.includes('landing page') || lower.includes('web launch') || lower.includes('homepage') || lower.includes('webpage') || lower.includes('sales page')) {
    return 'WEBSITE_LAUNCH';
  }
  if (lower.includes('seo') || lower.includes('organic rank') || lower.includes('search ranking') || lower.includes('pillar article') || lower.includes('google search rank')) {
    return 'SEO_VISIBILITY';
  }
  if (lower.includes('ecommerce') || lower.includes('e-commerce') || lower.includes('shopify') || lower.includes('cart') || lower.includes('catalog') || lower.includes('product store') || lower.includes('duffel bag') || lower.includes('leather bag') || lower.includes('checkout')) {
    return 'ECOMMERCE_GROWTH';
  }
  if (lower.includes('outbound') || lower.includes('cold email') || lower.includes('cadence') || lower.includes('prospecting') || lower.includes('b2b list') || lower.includes('csv lead')) {
    return 'OUTBOUND_SALES';
  }
  if (lower.includes('inbound') || lower.includes('speed to lead') || lower.includes('speed-to-lead') || lower.includes('receptionist') || lower.includes('booking call')) {
    return 'INBOUND_SALES';
  }
  if (lower.includes('webinar') || lower.includes('event') || lower.includes('masterclass') || lower.includes('rsvp') || lower.includes('workshop')) {
    return 'EVENT_WEBINAR';
  }
  if (lower.includes('retention') || lower.includes('renewal') || lower.includes('churn') || lower.includes('onboarding') || lower.includes('expansion') || lower.includes('customer success')) {
    return 'RETENTION_RENEWAL';
  }
  if (lower.includes('reputation') || lower.includes('sentiment') || lower.includes('brand mention') || lower.includes('pr crisis') || lower.includes('customer review')) {
    return 'REPUTATION_MANAGEMENT';
  }
  if (lower.includes('awareness') || lower.includes('brand awareness') || lower.includes('thought leadership') || lower.includes('press') || lower.includes('pr campaign')) {
    return 'AWARENESS_CAMPAIGN';
  }
  if (lower.includes('weekly content') || lower.includes('content engine') || lower.includes('social calendar') || lower.includes('weekly posts')) {
    return 'CONTENT_ENGINE';
  }
  if (lower.includes('brand foundation') || lower.includes('positioning') || lower.includes('brand voice') || lower.includes('messaging guide') || lower.includes('brand identity')) {
    return 'BRAND_FOUNDATION';
  }
  if (lower.includes('product launch') || lower.includes('course launch') || lower.includes('cohort launch') || lower.includes('offer launch') || lower.includes('launch our new')) {
    return 'PRODUCT_LAUNCH';
  }
  if (lower.includes('lead') || lower.includes('leads') || lower.includes('enquiries') || lower.includes('enquiry') || lower.includes('inquiries') || lower.includes('acquisition') || lower.includes('pipeline') || lower.includes('clients')) {
    return 'LEAD_GENERATION';
  }

  return 'CUSTOM';
};
