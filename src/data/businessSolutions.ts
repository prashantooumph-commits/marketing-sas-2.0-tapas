import { BusinessSolution } from '../types';

export const INITIAL_BUSINESS_SOLUTIONS: BusinessSolution[] = [
  {
    id: 'bs-01',
    code: 'BS01',
    title: 'Launch a New Brand',
    outcomeCategory: 'Launch my business',
    shortPromise: 'Move from zero presence to launch-ready brand with strategic positioning, visual foundation, live website, and initial market presence.',
    description: 'A comprehensive multi-agent initiative taking a business through brand positioning, value proposition definition, visual design tokens, website deployment, SEO & AI search grounding, launch content, and initial market awareness.',
    bestFor: 'Early-stage founders, agencies launching client ventures, or established businesses executing a strategic rebrand from scratch.',
    workflowTemplateIds: ['wf-01', 'wf-02', 'wf-06', 'wf-09', 'wf-12', 'wf-24'],
    employeeIds: ['emp-a08', 'emp-a12', 'emp-a18', 'emp-a19', 'emp-a07', 'emp-a03', 'emp-a26', 'emp-a02', 'emp-a24', 'emp-a06', 'emp-a01'],
    requiredConnectionTypes: ['website_cms', 'google_workspace'],
    optionalConnectionTypes: ['linkedin_company', 'meta_business'],
    approvalGateTypes: ['Brand Positioning & Claims Signoff', 'Website Domain & Live Launch Review', 'Initial Campaign Budget Authorization'],
    majorOutputs: [
      'Brand Foundation Guidebook & Value Pillars',
      'Approved Claims & Regulatory Compliance Matrix',
      'Live Responsive Web Presence with Lead Capture',
      'Dual SEO & AEO Structured Schema Architecture',
      '30-Day Multi-Channel Editorial Launch Calendar',
      'Top-of-Funnel Brand Awareness Campaign Kit'
    ],
    successMetrics: [
      '100% Specialist Persona Tone Alignment',
      'Live Web Presence with <60s Lead Sync Latency',
      'Indexed Entities in Google & Top AI Search Engines',
      'Zero Unapproved Trademark or Claim Violations'
    ],
    recommendedNextSolutionIds: ['bs-03', 'bs-05'],
    tags: ['Brand Strategy', 'Launch', 'Positioning', 'Web Design', 'AEO Grounding'],
    featured: true,
    complexity: 'advanced'
  },
  {
    id: 'bs-02',
    code: 'BS02',
    title: 'Build Website & Start Getting Found',
    outcomeCategory: 'Build my website',
    shortPromise: 'Deploy a high-converting web storefront, implement dual SEO & AI visibility, and route inbound visitor leads directly to sales.',
    description: 'Combines responsive website development, conversion copywriting, technical SEO foundation, AEO/GEO structured entity markup, conversion rate optimization (CRO), and instant inbound lead qualification routing.',
    bestFor: 'Businesses needing a new or upgraded website that attracts qualified search and conversational AI traffic from day one.',
    workflowTemplateIds: ['wf-02', 'wf-05', 'wf-06', 'wf-09', 'wf-36'],
    employeeIds: ['emp-a07', 'emp-a12', 'emp-a18', 'emp-a03', 'emp-a26', 'emp-a27', 'emp-a17', 'emp-a06', 'emp-a01'],
    requiredConnectionTypes: ['website_cms'],
    optionalConnectionTypes: ['google_workspace', 'hubspot_crm'],
    approvalGateTypes: ['Website Copy & Legal Claims Review', 'Live Domain Deployment Authorization'],
    majorOutputs: [
      'Responsive Multi-Section Website with One-Click Rollback',
      'High-Conversion Hero Sections & Value Accents',
      'Technical SEO Audit & Schema.org JSON-LD Markup',
      'Answer Engine Optimization (AEO/GEO) Knowledge Block',
      'Instant Speed-to-Lead Inbound Triage Flow'
    ],
    successMetrics: [
      '>8% Inbound Visitor-to-Form Conversion Rate',
      '<60s Speed-to-Lead Inquiry Response Time',
      '100% Mobile Responsiveness & Crawlability Score'
    ],
    recommendedNextSolutionIds: ['bs-11', 'bs-05'],
    tags: ['Web Design', 'SEO', 'AEO', 'CRO', 'Inbound Routing'],
    featured: true,
    complexity: 'moderate'
  },
  {
    id: 'bs-03',
    code: 'BS03',
    title: 'Always-On Content Engine',
    outcomeCategory: 'Create consistent content',
    shortPromise: 'Autonomous recurring monthly-to-weekly editorial and social production rhythm with built-in review gates and performance analysis.',
    description: 'An ongoing operating engine that turns monthly business priorities into weekly content themes, long-form pillar articles, native social posts, short video reels, graphics, review gates, scheduling, community management, and monthly performance reviews.',
    bestFor: 'B2B companies, creator brands, and agencies wanting consistent multichannel authority without manual writing fatigue.',
    workflowTemplateIds: ['wf-12', 'wf-13', 'wf-14', 'wf-15', 'wf-18', 'wf-23'],
    employeeIds: ['emp-a08', 'emp-a03', 'emp-a12', 'emp-a19', 'emp-a20', 'emp-a02', 'emp-a21', 'emp-a13', 'emp-a01'],
    requiredConnectionTypes: ['linkedin_company', 'meta_business'],
    optionalConnectionTypes: ['google_workspace', 'twitter_x'],
    approvalGateTypes: ['Monthly Content Calendar Theme Signoff', 'Pillar Article & Social Copy Review'],
    majorOutputs: [
      '30-Day Cross-Platform Editorial Calendar',
      '4 In-Depth Topical Pillar Guides / Month',
      '20+ Native Social Posts with Platform Line Breaks',
      'Multi-Ratio Branded Visual Assets (1:1 & 9:16)',
      'Subtitled Video Reels & Audiogram Clips',
      'Monthly Attribution & Content ROI Report'
    ],
    successMetrics: [
      '100% On-Time Publishing Cadence Adherence',
      '+45% Cumulative Organic Audience Engagement',
      'Zero Unreviewed Claims or Tone Deviations'
    ],
    recommendedNextSolutionIds: ['bs-06', 'bs-04'],
    tags: ['Content Strategy', 'Social Media', 'Video Reels', 'Thought Leadership', 'Community'],
    featured: true,
    complexity: 'moderate'
  },
  {
    id: 'bs-04',
    code: 'BS04',
    title: 'Grow Brand Awareness',
    outcomeCategory: 'Grow awareness',
    shortPromise: 'Combine organic thought leadership, video reels, brand listening, and calibrated awareness campaigns to expand reach.',
    description: 'Expands market recognition by blending high-credibility executive thought leadership, short-form video reels, brand listening, community engagement, and capped paid awareness campaigns with monthly optimization loops.',
    bestFor: 'Growing companies ready to break out of their existing network and build recognized market presence.',
    workflowTemplateIds: ['wf-16', 'wf-15', 'wf-24', 'wf-20', 'wf-23'],
    employeeIds: ['emp-a08', 'emp-a18', 'emp-a12', 'emp-a20', 'emp-a24', 'emp-a22', 'emp-a21', 'emp-a13', 'emp-a01'],
    requiredConnectionTypes: ['meta_business', 'linkedin_company'],
    optionalConnectionTypes: ['twitter_x', 'google_workspace'],
    approvalGateTypes: ['Creative Concept & Angle Approval', 'Paid Awareness Budget Cap ($50/day max default)'],
    majorOutputs: [
      'Executive Thought Leadership Essay Series',
      'High-Retention 9:16 Short Video Reels',
      'Top-of-Funnel Persona-Targeted Ad Sets',
      'Real-Time Brand Mention & Sentiment Tracker',
      'Monthly Share-of-Voice & Reach Scorecard'
    ],
    successMetrics: [
      '2.5x Increase in Verified Monthly Brand Impressions',
      '>65% Positive Brand Sentiment Score',
      '<$0.04 Cost per Engaged Multi-Touch Interaction'
    ],
    recommendedNextSolutionIds: ['bs-05', 'bs-12'],
    tags: ['Brand Awareness', 'Thought Leadership', 'Brand Listening', 'Creative Direction'],
    featured: false,
    complexity: 'moderate'
  },
  {
    id: 'bs-05',
    code: 'BS05',
    title: 'Generate Qualified Leads',
    outcomeCategory: 'Generate leads',
    shortPromise: 'End-to-end multi-agent acquisition funnel: offer crafting, landing page build, paid ads, CRM deduplication, and meeting booking.',
    description: 'A full-funnel customer acquisition solution connecting target offer definition, dedicated landing page deployment, creative ad pairing across Meta and Google, CRM data hygiene, automated speed-to-lead qualification, and pipeline meeting booking.',
    bestFor: 'Service businesses, high-ticket consultants, and B2B SaaS wanting consistent qualified customer inquiries.',
    workflowTemplateIds: ['wf-03', 'wf-25', 'wf-26', 'wf-29', 'wf-36'],
    employeeIds: ['emp-a08', 'emp-a12', 'emp-a07', 'emp-a19', 'emp-a24', 'emp-a25', 'emp-a29', 'emp-a17', 'emp-a09', 'emp-a13', 'emp-a01'],
    requiredConnectionTypes: ['website_cms', 'google_workspace'],
    optionalConnectionTypes: ['meta_business', 'hubspot_crm'],
    approvalGateTypes: ['Target Offer & Headline Signoff', 'Ad Sets & Daily Spend Authorization', 'Qualification Rubric Approval'],
    majorOutputs: [
      'Conversion Landing Page with Live Lead Form',
      'Meta Direct-Response Ad Sets with Visual Assets',
      'High-Intent Google Search Ads with Negative Keywords',
      'Statistically Evaluated Creative Testing Matrix',
      'Automated Sub-60s Speed-to-Lead Booking Routing'
    ],
    successMetrics: [
      '<$35 Target Cost per Qualified Lead',
      '>25% Lead-to-Discovery Meeting Conversion',
      '100% GDPR/CAN-SPAM Consent Compliance'
    ],
    recommendedNextSolutionIds: ['bs-07', 'bs-13'],
    tags: ['Lead Generation', 'Paid Ads', 'Landing Pages', 'RevOps', 'Inbound Sales'],
    featured: true,
    complexity: 'advanced'
  },
  {
    id: 'bs-06',
    code: 'BS06',
    title: 'Social Engagement to Sales Meeting',
    outcomeCategory: 'Book more meetings',
    shortPromise: 'Turn viral comment conversations into verified, permissioned CRM leads and booked discovery meetings using automated resource delivery.',
    description: 'Our signature social funnel: publishes high-leverage engagement posts, triggers automated private direct message delivery of downloadable PDF guides upon keyword comment, invites optional qualification, records clean marketing consent, and hands off warm prospects to sales.',
    bestFor: 'Companies with active organic social followings that struggle to convert comments and likes into pipeline revenue.',
    workflowTemplateIds: ['wf-19', 'wf-36', 'wf-38'],
    employeeIds: ['emp-a02', 'emp-a23', 'emp-a21', 'emp-a29', 'emp-a17', 'emp-a09', 'emp-a01'],
    requiredConnectionTypes: ['linkedin_company', 'meta_business'],
    optionalConnectionTypes: ['google_workspace'],
    approvalGateTypes: ['Guide Asset & Direct Message Copy Approval', 'Consent Language & Rate Limit Signoff'],
    majorOutputs: [
      'Downloadable Tactical 24-Page PDF Guide Asset',
      'Keyword Comment Trigger & Automated DM Sequence',
      'Public Comment Triage & Friendly Acknowledgments',
      'Clean CRM Contact Records with Consent Verification',
      'Fast-Track Discovery Meeting Booking Link'
    ],
    successMetrics: [
      '>80% Resource Direct Message Delivery Rate',
      '>25% Lead Opt-in Consent Rate',
      'Zero Forced-Follow Social Policy Violations'
    ],
    recommendedNextSolutionIds: ['bs-07', 'bs-05'],
    tags: ['Flagship Funnel', 'Social Selling', 'Lead Capture', 'Instant Qualification'],
    featured: true,
    complexity: 'starter'
  },
  {
    id: 'bs-07',
    code: 'BS07',
    title: 'Build a B2B Outbound Pipeline',
    outcomeCategory: 'Run outbound sales',
    shortPromise: 'Targeted ICP prospecting, multi-layer contact enrichment, domain health defense, 3-touch personalized sequences, and discovery calls.',
    description: 'A disciplined B2B outbound engine discovering high-fit decision makers, scrubbing sender domain health, executing personalized 3-step value cadences, triaging replies, conducting voice phone follow-up where appropriate, and booking pipeline opportunities.',
    bestFor: 'B2B enterprise teams selling high-value contracts to specific corporate titles and industries.',
    workflowTemplateIds: ['wf-37', 'wf-38', 'wf-39', 'wf-41'],
    employeeIds: ['emp-a04', 'emp-a29', 'emp-a16', 'emp-a09', 'emp-a05', 'emp-a31', 'emp-a06', 'emp-a01'],
    requiredConnectionTypes: ['google_workspace'],
    optionalConnectionTypes: ['hubspot_crm', 'linkedin_company'],
    approvalGateTypes: ['Prospect List & Touch 1 Email Signoff', 'Commercial Proposal & Contract Terms Review'],
    majorOutputs: [
      'Enriched ICP Target Account Database',
      'Domain SPF/DKIM Health & Suppression Ledger',
      'Tailored 3-Touch Cold Outreach Cadence',
      'Reply Classification & Discovery Call Calendar',
      'Custom Deal Desk Proposals & Legal Addenda'
    ],
    successMetrics: [
      '<2% Email Bounce Rate',
      '>18% Positive Reply Rate',
      'Zero Suppressed Domain Violations',
      '>$50k Generated Pipeline per 100 Enriched Contacts'
    ],
    recommendedNextSolutionIds: ['bs-14', 'bs-15'],
    tags: ['Outbound Sales', 'Prospecting', 'List Hygiene', 'Deal Desk', 'Pipeline Management'],
    featured: false,
    complexity: 'advanced'
  },
  {
    id: 'bs-08',
    code: 'BS08',
    title: 'Launch a Product or Service',
    outcomeCategory: 'Launch a product',
    shortPromise: 'Coordinate value proposition, sales page build, promotional creative, teaser campaigns, waitlist drip, and early customer onboarding.',
    description: 'An integrated go-to-market release orchestrating product positioning, conversion sales page, video storyboards, 7-day promotional launch sequence, segmented email waitlist reveal, order/lead capture, and smooth customer success kickoff.',
    bestFor: 'Businesses launching a new cohort, product line, premium package, or digital membership.',
    workflowTemplateIds: ['wf-04', 'wf-35', 'wf-14', 'wf-32', 'wf-48'],
    employeeIds: ['emp-a08', 'emp-a12', 'emp-a07', 'emp-a18', 'emp-a19', 'emp-a02', 'emp-a10', 'emp-a17', 'emp-a30', 'emp-a01'],
    requiredConnectionTypes: ['website_cms', 'google_workspace'],
    optionalConnectionTypes: ['meta_business', 'linkedin_company'],
    approvalGateTypes: ['Offer Terms & Early-Bird Pricing Signoff', 'Email Sequence & Public Teaser Launch Authorization'],
    majorOutputs: [
      'Live Sales Page with Live Application Form',
      '7-Day Promotional Launch Sequence Calendar',
      'Multichannel Creative Teaser Graphics & Badges',
      'VIP Waitlist Nurture & Announcement Drip',
      'Customer Onboarding Milestone Checklist'
    ],
    successMetrics: [
      '100% Launch Milestone Adherence',
      '>15% Waitlist-to-Buyer Conversion Rate',
      'Zero Delivery or Enrollment Defects'
    ],
    recommendedNextSolutionIds: ['bs-09', 'bs-14'],
    tags: ['Product Launch', 'Go-To-Market', 'Email Nurture', 'Waitlist', 'Customer Kickoff'],
    featured: false,
    complexity: 'moderate'
  },
  {
    id: 'bs-09',
    code: 'BS09',
    title: 'Sell Products Online',
    outcomeCategory: 'Sell products',
    shortPromise: 'Complete commerce lifecycle: catalog management, high-converting product pages, organic & paid promo, abandoned cart recovery, and upsells.',
    description: 'Manages the complete e-commerce lifecycle from product description copywriting and high-res lookbooks to social shopping links, 3-stage abandoned cart recovery, 1-click post-purchase upsells, review collection, and customer order support.',
    bestFor: 'E-commerce brands, digital course sellers, and merchandise stores aiming to maximize conversion and average order value.',
    workflowTemplateIds: ['wf-42', 'wf-43', 'wf-44', 'wf-45', 'wf-46'],
    employeeIds: ['emp-a32', 'emp-a12', 'emp-a19', 'emp-a24', 'emp-a10', 'emp-a11', 'emp-a13', 'emp-a01'],
    requiredConnectionTypes: ['shopify_store', 'google_workspace'],
    optionalConnectionTypes: ['meta_business'],
    approvalGateTypes: ['Catalog Pricing & Seat Cap Review', 'Cart Recovery Discount Rate Signoff'],
    majorOutputs: [
      'Optimized Product Catalog & Inventory Allocations',
      'Interactive Checkout Flow with Instant Confirmation',
      'Automated 3-Stage Abandoned Cart Recovery Sequence',
      'Post-Purchase 1-Click Upsell Modal',
      'Post-Delivery Review & Referral Perks Flow'
    ],
    successMetrics: [
      '>22% Abandoned Cart Recovery Rate',
      '+18% Average Order Value (AOV) via Upsells',
      '<2min Customer Order Support Resolution'
    ],
    recommendedNextSolutionIds: ['bs-14', 'bs-03'],
    tags: ['E-Commerce', 'Catalog', 'Cart Recovery', 'Upsell', 'Order Support'],
    featured: false,
    complexity: 'moderate'
  },
  {
    id: 'bs-10',
    code: 'BS10',
    title: 'Run a Webinar / Event Funnel',
    outcomeCategory: 'Run an event',
    shortPromise: 'Full event attendance engine: registration page, social promotion, calendar reminders, attendee qualification, and post-session closing.',
    description: 'Maximizes live virtual event impact by coordinating registration page deployment, calendar sync, social promotional countdowns, multi-channel attendance reminders, interactive attendee follow-up, and speed-to-lead qualification.',
    bestFor: 'Companies hosting live workshops, executive masterclasses, client demos, or partner roundtables.',
    workflowTemplateIds: ['wf-31', 'wf-32', 'wf-38', 'wf-40'],
    employeeIds: ['emp-a08', 'emp-a07', 'emp-a02', 'emp-a10', 'emp-a17', 'emp-a09', 'emp-a30', 'emp-a01'],
    requiredConnectionTypes: ['website_cms', 'google_workspace'],
    optionalConnectionTypes: ['linkedin_company'],
    approvalGateTypes: ['Event Agenda & Registration Page Review', 'Attendee Email Broadcast Signoff'],
    majorOutputs: [
      'Dedicated RSVP Landing Page with Calendar Invites',
      'Countdown Social Campaign Post Kit',
      '24h & 1h Multi-Channel Attendance Reminders',
      'Post-Event Diagnostic Follow-Up & Booking Links',
      'Executive Discovery Meeting Pipeline Opportunities'
    ],
    successMetrics: [
      '>55% Live Event Show-Up Rate',
      '>30% Attendee-to-Discovery Meeting Conversion',
      'Zero Calendar Timezone Discrepancies'
    ],
    recommendedNextSolutionIds: ['bs-05', 'bs-07'],
    tags: ['Webinar', 'Virtual Event', 'Registration Funnel', 'Attendance Reminders', 'Post-Event Sales'],
    featured: false,
    complexity: 'moderate'
  },
  {
    id: 'bs-11',
    code: 'BS11',
    title: 'Improve Search & AI Visibility',
    outcomeCategory: 'Improve SEO / AI visibility',
    shortPromise: 'Comprehensive search presence combining traditional Google keyword clusters with generative engine optimization (AEO/GEO).',
    description: 'Establishes sustainable organic visibility by pairing technical SEO audits and long-form topic cluster guides with conversational Answer Engine Optimization (AEO/GEO), structured schema definitions, content refreshes, and monthly dual-engine reviews.',
    bestFor: 'Brands that want to rank in organic Google search and be referenced by ChatGPT, Perplexity, and Claude answer engines.',
    workflowTemplateIds: ['wf-06', 'wf-07', 'wf-08', 'wf-09', 'wf-10'],
    employeeIds: ['emp-a03', 'emp-a26', 'emp-a12', 'emp-a19', 'emp-a07', 'emp-a13', 'emp-a01'],
    requiredConnectionTypes: ['website_cms'],
    optionalConnectionTypes: ['google_workspace'],
    approvalGateTypes: ['SEO Cluster Keyword Plan Signoff', 'Live Schema & Metadata Deployment Authorization'],
    majorOutputs: [
      'Technical SEO Audit & Health Remediation Roadmap',
      'In-Depth Topical Pillar Guide (1,800+ words)',
      'AEO/GEO Brand Entity Schema JSON-LD Markup',
      'Decaying Content Refresh & Re-Indexing Plan',
      'Monthly Unified Search + AI Visibility Review'
    ],
    successMetrics: [
      '+60% Non-Brand Organic Search Impressions',
      'Verified Brand Citations in Top 3 AI Answer Engines',
      'Zero Broken Canonical Links or Schema Errors'
    ],
    recommendedNextSolutionIds: ['bs-03', 'bs-02'],
    tags: ['SEO', 'AEO', 'GEO', 'Generative Search', 'Content Clusters', 'Structured Data'],
    featured: true,
    complexity: 'moderate'
  },
  {
    id: 'bs-12',
    code: 'BS12',
    title: 'Protect & Improve Brand Reputation',
    outcomeCategory: 'Manage reputation',
    shortPromise: 'Continuous brand listening, comment sentiment triage, proactive complaint escalation, and positive customer review generation.',
    description: 'Safeguards public brand trust through 24/7 web and social mention scanning, sentiment classification, structured incident recovery protocols, customer review collection flywheels, and monthly brand performance scorecards.',
    bestFor: 'Established brands protecting their public trust while turning satisfied clients into public advocates.',
    workflowTemplateIds: ['wf-20', 'wf-21', 'wf-22', 'wf-23'],
    employeeIds: ['emp-a22', 'emp-a21', 'emp-a11', 'emp-a06', 'emp-a28', 'emp-a01'],
    requiredConnectionTypes: ['linkedin_company', 'meta_business'],
    optionalConnectionTypes: ['twitter_x', 'google_workspace'],
    approvalGateTypes: ['Sensitive Complaint Public Response Signoff', 'Reputation Recovery Escalation Authorization'],
    majorOutputs: [
      'Real-Time Web & Social Mention Monitoring Feed',
      'Incident De-escalation & Offline Amends Protocols',
      'Automated Testimonial & Social Proof Generator',
      'VIP Client Referral Perks Ledger',
      'Monthly Brand Sentiment & Health Scorecard'
    ],
    successMetrics: [
      '<15min Crisis Response Window for Critical Issues',
      '>85% Positive Net Customer Sentiment Score',
      '+25 Verified 5-Star Reviews / Quarter'
    ],
    recommendedNextSolutionIds: ['bs-04', 'bs-14'],
    tags: ['Brand Listening', 'Sentiment Analysis', 'Crisis Management', 'Customer Reviews', 'Advocacy'],
    featured: false,
    complexity: 'moderate'
  },
  {
    id: 'bs-13',
    code: 'BS13',
    title: 'Nurture Leads Until Ready',
    outcomeCategory: 'Nurture leads',
    shortPromise: 'Automated behavioral segmentation, permission-checked email nurture, high-value content drips, and sales handoff upon buyer readiness.',
    description: 'Ensures leads who download guides or visit webinars receive ongoing tactical value through automated 5-step education journeys, deliverability defense, dormant lead reactivation, and warm intent signal alerts to sales.',
    bestFor: 'Companies with longer consideration cycles or dormant lead databases that need consistent value before buying.',
    workflowTemplateIds: ['wf-33', 'wf-34', 'wf-38', 'wf-36'],
    employeeIds: ['emp-a10', 'emp-a12', 'emp-a29', 'emp-a17', 'emp-a09', 'emp-a01'],
    requiredConnectionTypes: ['google_workspace'],
    optionalConnectionTypes: ['hubspot_crm'],
    approvalGateTypes: ['Nurture Journey Sequence Signoff', 'Reactivation Incentive Authorization'],
    majorOutputs: [
      '5-Step Behavioral Nurture Email Journey',
      'Domain Deliverability & Bounce Suppression Rules',
      'Dormant Lead 9-Word Reactivation Sequence',
      'High-Intent Behavioral Sales Alert Triggers'
    ],
    successMetrics: [
      '>38% Cumulative Nurture Open Rate',
      '+14% Reactivated Pipeline Volume from Inactive Leads',
      '100% Unsubscribe Suppression Compliance'
    ],
    recommendedNextSolutionIds: ['bs-07', 'bs-05'],
    tags: ['Lead Nurturing', 'Email Drip', 'Lifecycle Marketing', 'Reactivation', 'Sales Handoff'],
    featured: false,
    complexity: 'starter'
  },
  {
    id: 'bs-14',
    code: 'BS14',
    title: 'Customer Retention & Growth',
    outcomeCategory: 'Retain customers',
    shortPromise: 'Structured customer onboarding, account health scoring, proactive support intervention, contract renewal reminders, and expansion upsells.',
    description: 'Drives net revenue retention (NRR) and lifetime value by coordinating 30-day onboarding milestones, automated customer health monitoring, early at-risk intervention, QBR presentations, and seamless corporate expansion proposals.',
    bestFor: 'Subscription businesses, retainer agencies, and enterprise providers focused on net revenue retention.',
    workflowTemplateIds: ['wf-48', 'wf-49', 'wf-50', 'wf-46'],
    employeeIds: ['emp-a30', 'emp-a11', 'emp-a31', 'emp-a10', 'emp-a01'],
    requiredConnectionTypes: ['google_workspace'],
    optionalConnectionTypes: ['hubspot_crm'],
    approvalGateTypes: ['Expansion Proposal & Pricing Authorization', 'At-Risk Account Intervention Strategy Signoff'],
    majorOutputs: [
      'Customer Milestone Kickoff & Orientation Schedule',
      'Account Health Scoring & Inactivity Alert Matrix',
      'Quarterly Business Review (QBR) Deck Template',
      'Corporate Expansion & Renewal SOW Addenda'
    ],
    successMetrics: [
      '>94% Annual Customer Retention Rate',
      '+28% Account Expansion Revenue',
      '<1% Unplanned Account Churn'
    ],
    recommendedNextSolutionIds: ['bs-15', 'bs-09'],
    tags: ['Customer Success', 'Onboarding', 'Retention', 'QBR', 'Account Expansion'],
    featured: false,
    complexity: 'moderate'
  },
  {
    id: 'bs-15',
    code: 'BS15',
    title: 'Weekly Business Operating Rhythm',
    outcomeCategory: 'Operate my business',
    shortPromise: 'Streamline the executive rhythm: daily inbox briefings, calendar protection, team priority reviews, pipeline hygiene, and governance.',
    description: 'Empowers founders and executive teams with an automated weekly operating rhythm: Monday morning briefings, calendar focus protection, team goal alignment, deal pipeline hygiene reviews, commercial contract audits, and Friday attribution digests.',
    bestFor: 'Founders, managing partners, and solo operators who need AI specialists to keep operations tight and compliant.',
    workflowTemplateIds: ['wf-51', 'wf-41', 'wf-23', 'wf-53'],
    employeeIds: ['emp-a01', 'emp-a08', 'emp-a09', 'emp-a13', 'emp-a06', 'emp-a15'],
    requiredConnectionTypes: ['google_workspace'],
    optionalConnectionTypes: ['hubspot_crm'],
    approvalGateTypes: ['Weekly Executive Priority Authorization', 'Commercial Contract Review Signoff'],
    majorOutputs: [
      'Monday Morning Executive Inbox & Calendar Briefing',
      'Protected 2-Hour Daily Deep Work Focus Blocks',
      'Weekly Sales Pipeline Hygiene Scorecard',
      'Commercial Agreement & NDA Risk Annotations',
      'Friday Executive Progress & Attribution Digest'
    ],
    successMetrics: [
      'Save 12+ Executive Hours per Week',
      'Zero Stalled Pipeline Deals Exceeding 14 Days',
      '100% Calendar Focus Buffer Adherence'
    ],
    recommendedNextSolutionIds: ['bs-03', 'bs-07'],
    tags: ['Operations', 'Executive Briefing', 'Calendar Defense', 'Pipeline Hygiene', 'Governance'],
    featured: true,
    complexity: 'starter'
  }
];

export const getBusinessSolutionById = (idOrCode: string): BusinessSolution | undefined => {
  return INITIAL_BUSINESS_SOLUTIONS.find(
    (s) =>
      s.id === idOrCode ||
      s.code.toLowerCase() === idOrCode.toLowerCase()
  );
};
