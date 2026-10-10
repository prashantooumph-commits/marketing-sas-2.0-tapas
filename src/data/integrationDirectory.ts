import { IntegrationProvider } from '../types';

export interface ProviderCatalogItem {
  provider: IntegrationProvider;
  name: string;
  category: 'Social & Ads' | 'Social' | 'Productivity' | 'Messaging' | 'Paid Media' | 'Web & Forms' | 'Telephony' | 'Commerce & Billing';
  description: string;
  defaultHandle: string;
  defaultCapabilities: string[];
  requiredScopes: string[];
  securityNote: string;
  apiProtocol: string;
  apiVersion: string;
  associatedEmployeeCodes: string[];
}

export const PROVIDER_CATALOG: ProviderCatalogItem[] = [
  {
    provider: 'meta_business',
    name: 'Meta Business Portfolio',
    category: 'Social & Ads',
    description: 'Overarching Meta Business Suite portfolio managing verified Pages, Instagram creators, and Ad accounts.',
    defaultHandle: 'Portfolio ID: 90218820',
    defaultCapabilities: ['Page Administration', 'Ad Account Oversight', 'Asset Sharing', 'Pixel / Conversion API'],
    requiredScopes: ['business_management', 'pages_read_engagement', 'ads_management'],
    securityNote: 'Ooumph operates in read-and-draft mode by default. Ad campaigns require explicit founder budget signoff in Inbox.',
    apiProtocol: 'Meta Graph API',
    apiVersion: 'v21.0',
    associatedEmployeeCodes: ['A02', 'A21', 'A24']
  },
  {
    provider: 'facebook_page',
    name: 'Facebook Verified Page',
    category: 'Social',
    description: 'Public Facebook business page for organic post scheduling and Messenger triage.',
    defaultHandle: 'fb.com/cedarandlearning',
    defaultCapabilities: ['Feed Publishing', 'Comment Triage', 'Messenger Routing', 'Page Insights'],
    requiredScopes: ['pages_manage_posts', 'pages_read_user_content', 'pages_messaging'],
    securityNote: 'Comments from critical community members are never auto-deleted. Founder is notified on escalations.',
    apiProtocol: 'Meta Graph API',
    apiVersion: 'v21.0',
    associatedEmployeeCodes: ['A02', 'A21']
  },
  {
    provider: 'instagram_pro',
    name: 'Instagram Professional Account',
    category: 'Social',
    description: 'Professional creator/business account for feed carousels, reels, and comment-to-guide triggers.',
    defaultHandle: '@cedarlearning',
    defaultCapabilities: ['Feed & Reel Publishing', 'Comment Scanning', 'Direct Message Guide Delivery', 'Audience Insights'],
    requiredScopes: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments', 'instagram_manage_messages'],
    securityNote: 'Direct message deliveries are strictly one-to-one in response to genuine user keywords (e.g. "GROW").',
    apiProtocol: 'Instagram Graph API',
    apiVersion: 'v21.0',
    associatedEmployeeCodes: ['A02', 'A21', 'A23']
  },
  {
    provider: 'linkedin_page',
    name: 'LinkedIn Company Page',
    category: 'Social',
    description: 'Organization page for B2B executive thought-leadership articles and organic posts.',
    defaultHandle: 'company/cedar-and-co-learning',
    defaultCapabilities: ['Thought Leadership Publishing', 'Comment Moderation', 'Lead Gen Analytics', 'Article Indexing'],
    requiredScopes: ['w_organization_social', 'r_organization_social', 'rw_organization_admin'],
    securityNote: 'Long-form editorial and executive articles are reviewed in draft mode before publishing.',
    apiProtocol: 'LinkedIn Community API',
    apiVersion: 'v2.0',
    associatedEmployeeCodes: ['A02', 'A03', 'A23']
  },
  {
    provider: 'google_workspace',
    name: 'Google Workspace',
    category: 'Productivity',
    description: 'Executive inbox synchronization, Google Calendar defense, and Drive resource access.',
    defaultHandle: 'admin@cedarlearning.co',
    defaultCapabilities: ['Executive Inbox Sync', 'Google Calendar Defense', 'Drive Document Access', 'Smart Draft Routing'],
    requiredScopes: ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/drive.readonly'],
    securityNote: 'Strict client boundary: never accesses personal financial emails or sensitive attachments. Outbound emails draft into Inbox review.',
    apiProtocol: 'Google Workspace REST APIs',
    apiVersion: 'v1 / v3',
    associatedEmployeeCodes: ['A01', 'A04', 'A06', 'A16', 'A17']
  },
  {
    provider: 'whatsapp_business',
    name: 'WhatsApp Business Cloud',
    category: 'Messaging',
    description: 'Direct customer message broadcast for approved HSM utility templates and high-priority alerts.',
    defaultHandle: '+1 (415) 555-0199',
    defaultCapabilities: ['HSM Template Broadcast', 'Direct Lead Messaging', 'Opt-out Handling', 'Delivery Receipts'],
    requiredScopes: ['whatsapp_business_messaging', 'whatsapp_business_management'],
    securityNote: 'Only delivers pre-approved Meta HSM templates with mandatory "STOP to unsubscribe" opt-out mechanics.',
    apiProtocol: 'Cloud WhatsApp API',
    apiVersion: 'v20.0',
    associatedEmployeeCodes: ['A10']
  },
  {
    provider: 'google_ads',
    name: 'Google Ads Account',
    category: 'Paid Media',
    description: 'Search campaign management, high-intent keyword bids, and negative keyword exclusions.',
    defaultHandle: 'CID: 881-224-9011',
    defaultCapabilities: ['High-Intent Search Bid Simulation', 'Negative Keyword Exclusions', 'Ad Copy Synchronization', 'Conversion Tracking'],
    requiredScopes: ['https://www.googleapis.com/auth/adwords'],
    securityNote: 'Hard budget guardrail active. Spend increases >$0 require founder approval.',
    apiProtocol: 'Google Ads API',
    apiVersion: 'v17',
    associatedEmployeeCodes: ['A13', 'A25']
  },
  {
    provider: 'website_cms',
    name: 'Website / CMS Webhook',
    category: 'Web & Forms',
    description: 'Production website hosting for landing page deploys and instant speed-to-lead form capture.',
    defaultHandle: 'https://cedarlearning.co',
    defaultCapabilities: ['Landing Page Deployment', 'Instant Rollback', 'Form Capture Webhook', 'SEO Metadata Injection'],
    requiredScopes: ['cms.publish', 'webhooks.manage', 'forms.read'],
    securityNote: 'Rollback history preserves previous deployments with 1-click instant revert.',
    apiProtocol: 'Headless Webhook REST',
    apiVersion: 'v3.2',
    associatedEmployeeCodes: ['A03', 'A07', 'A11', 'A12', 'A17', 'A26', 'A27']
  },
  {
    provider: 'voice_twilio',
    name: 'Twilio Virtual Voice Line',
    category: 'Telephony',
    description: 'Dedicated business phone number for virtual receptionist reception, voicemail audio recording, and transcripts.',
    defaultHandle: '+1 (415) 555-0199',
    defaultCapabilities: ['Virtual Receptionist Greeting', 'Voicemail Audio Transcription', 'SMS Notifications', 'Call Routing'],
    requiredScopes: ['voice.incoming', 'recordings.read', 'sms.send'],
    securityNote: 'Recorded voice transcripts are stored with caller privacy compliance and caller ID verification.',
    apiProtocol: 'Twilio Voice API',
    apiVersion: '2010-04-01',
    associatedEmployeeCodes: ['A05', 'A11']
  },
  {
    provider: 'stripe_billing',
    name: 'Stripe Merchant Billing',
    category: 'Commerce & Billing',
    description: 'Corporate invoice generator, checkout links, and enrollment subscription webhooks.',
    defaultHandle: 'acct_cedar_live_demo',
    defaultCapabilities: ['Executive Fellowship Checkout', 'Corporate Net-30 Invoicing', 'Payment Webhook Sync', 'Commission Payouts'],
    requiredScopes: ['invoices.write', 'checkout.sessions.create', 'charges.read'],
    securityNote: 'Strict read & invoice generation mode. Bank payouts and fund withdrawals are restricted to human business owners.',
    apiProtocol: 'Stripe REST API',
    apiVersion: '2024-06-20',
    associatedEmployeeCodes: ['A28', 'A31', 'A32']
  }
];

// Mapping each employee code to the integrations they utilize
export const EMPLOYEE_INTEGRATION_MAP: Record<string, {
  primaryProvider: IntegrationProvider;
  additionalProviders?: IntegrationProvider[];
  usageDescription: string;
}> = {
  A01: {
    primaryProvider: 'google_workspace',
    usageDescription: 'Executive Inbox triage, Google Calendar defense, and meeting scheduling.'
  },
  A02: {
    primaryProvider: 'meta_business',
    additionalProviders: ['facebook_page', 'instagram_pro', 'linkedin_page'],
    usageDescription: 'Cross-platform organic social publishing and content scheduling.'
  },
  A03: {
    primaryProvider: 'website_cms',
    additionalProviders: ['linkedin_page'],
    usageDescription: 'Editorial blog CMS publishing, SEO keyword monitoring, and article deployment.'
  },
  A04: {
    primaryProvider: 'google_workspace',
    usageDescription: 'Contact list research, domain validation, and CRM prospect enrichment.'
  },
  A05: {
    primaryProvider: 'voice_twilio',
    usageDescription: 'Live phone reception, interactive voicemail audio playback, and instant appointment booking.'
  },
  A06: {
    primaryProvider: 'google_workspace',
    usageDescription: 'Drive legal document synchronization and human review signoff flagging.'
  },
  A07: {
    primaryProvider: 'website_cms',
    usageDescription: 'Production landing page visual publishing, speed-to-lead form capture, and version rollback.'
  },
  A08: {
    primaryProvider: 'google_workspace',
    usageDescription: 'Strategic quarterly planning and cross-team execution coordination.'
  },
  A09: {
    primaryProvider: 'google_workspace',
    additionalProviders: ['stripe_billing'],
    usageDescription: 'Sales pipeline deal coaching and CRM revenue tracking.'
  },
  A10: {
    primaryProvider: 'whatsapp_business',
    additionalProviders: ['google_workspace'],
    usageDescription: 'Multi-touch lifecycle email and WhatsApp HSM utility broadcast sequences.'
  },
  A11: {
    primaryProvider: 'website_cms',
    additionalProviders: ['voice_twilio'],
    usageDescription: 'Customer support widget integration, knowledgebase retrieval, and human takeover.'
  },
  A12: {
    primaryProvider: 'website_cms',
    usageDescription: 'Live landing page copy synchronization and headline variant testing.'
  },
  A13: {
    primaryProvider: 'google_ads',
    additionalProviders: ['meta_business'],
    usageDescription: 'Multi-touch attribution reporting and advertising ROI analytics.'
  },
  A14: {
    primaryProvider: 'google_workspace',
    usageDescription: 'Job opening postings, candidate rubric evaluations, and interview calendar slots.'
  },
  A15: {
    primaryProvider: 'google_workspace',
    usageDescription: 'Private founder OKR vault and weekly reflection journal.'
  },
  A16: {
    primaryProvider: 'google_workspace',
    usageDescription: 'High-touch outbound sequence delivery, meeting link dispatches, and opt-out handling.'
  },
  A17: {
    primaryProvider: 'website_cms',
    additionalProviders: ['google_workspace'],
    usageDescription: 'Speed-to-lead form triage, instant qualification, and discovery call booking.'
  },
  A18: {
    primaryProvider: 'meta_business',
    usageDescription: 'Campaign concept briefs and moodboard handoffs.'
  },
  A19: {
    primaryProvider: 'meta_business',
    usageDescription: 'Multi-aspect visual creative generation and asset downloads.'
  },
  A20: {
    primaryProvider: 'meta_business',
    usageDescription: 'Video script development and video preview asset production.'
  },
  A21: {
    primaryProvider: 'facebook_page',
    additionalProviders: ['instagram_pro', 'meta_business'],
    usageDescription: 'Public comment moderation, sentiment triage, and community engagement.'
  },
  A22: {
    primaryProvider: 'website_cms',
    usageDescription: 'Web and newsletter mention monitoring with sentiment tracking.'
  },
  A23: {
    primaryProvider: 'instagram_pro',
    additionalProviders: ['meta_business', 'linkedin_page'],
    usageDescription: 'Flagship Comment-to-Guide trigger listener ("GROW") and resource delivery.'
  },
  A24: {
    primaryProvider: 'meta_business',
    usageDescription: 'Meta Ads campaign setup, creative pairing, and daily budget guardrails.'
  },
  A25: {
    primaryProvider: 'google_ads',
    usageDescription: 'High-intent search keyword bidding and negative keyword exclusion.'
  },
  A26: {
    primaryProvider: 'website_cms',
    usageDescription: 'AI answer engine citation audits (Perplexity, ChatGPT) and schema validation.'
  },
  A27: {
    primaryProvider: 'website_cms',
    usageDescription: 'A/B test split analysis and conversion rate optimization.'
  },
  A28: {
    primaryProvider: 'stripe_billing',
    usageDescription: 'Affiliate tracking link generation and commission payout authorization.'
  },
  A29: {
    primaryProvider: 'google_workspace',
    usageDescription: 'CRM deduplication, contact reconciliation, and sender domain health monitoring.'
  },
  A30: {
    primaryProvider: 'google_workspace',
    usageDescription: 'Client onboarding milestones and expansion proposal alerts.'
  },
  A31: {
    primaryProvider: 'stripe_billing',
    usageDescription: 'Commercial quotation creation, scope fee calculations, and digital agreement signoff.'
  },
  A32: {
    primaryProvider: 'stripe_billing',
    additionalProviders: ['website_cms'],
    usageDescription: 'Course seat catalog inventory, checkout cart recovery, and order capture.'
  }
};
