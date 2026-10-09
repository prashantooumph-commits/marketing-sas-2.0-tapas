import { Employee } from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  // CORE EMPLOYEES
  {
    id: 'emp-a01',
    code: 'A01',
    name: 'Aria Vance',
    title: 'Executive Assistant',
    category: 'Core',
    bio: 'Manages inbox priority, drafts personalized correspondence, syncs executive calendars, and prepares daily briefings.',
    avatarColor: 'bg-indigo-600',
    avatarInitials: 'AV',
    capabilities: [
      'Daily morning executive briefing',
      'VIP email triage & high-touch reply drafting',
      'Calendar conflict resolution & booking buffers',
      'Meeting action item extraction'
    ],
    starterPrompts: [
      'Draft a polite reschedule reply for the partnership inquiry',
      'Generate today\'s morning executive briefing',
      'Review pending meeting invites and spot schedule conflicts'
    ],
    referenceOrigin: 'Marblism: Eva / Sintra: Vizzy',
    pinned: true,
    status: 'active'
  },
  {
    id: 'emp-a02',
    code: 'A02',
    name: 'Soren Miller',
    title: 'Social Publisher',
    category: 'Core',
    bio: 'Designs platform-native organic posts, plans monthly content calendars, and queues multi-channel distribution.',
    avatarColor: 'bg-sky-600',
    avatarInitials: 'SM',
    capabilities: [
      'Multi-platform post creation (LinkedIn, X, Instagram)',
      'Editorial calendar scheduling',
      'Hashtag & hook optimization',
      'Post versioning and review loops'
    ],
    starterPrompts: [
      'Draft 3 LinkedIn thought-leadership posts on founder focus',
      'Build next week\'s social publishing schedule',
      'Repurpose our recent customer success story for Instagram'
    ],
    referenceOrigin: 'Marblism: Sonny / Sintra: Soshie',
    pinned: true,
    status: 'active'
  },
  {
    id: 'emp-a03',
    code: 'A03',
    name: 'Penny Thorne',
    title: 'SEO & Editorial Specialist',
    category: 'Content & Creative',
    bio: 'Identifies high-intent search queries, crafts comprehensive editorial guides, and maintains internal link hygiene.',
    avatarColor: 'bg-emerald-600',
    avatarInitials: 'PT',
    capabilities: [
      'Keyword intent mapping & cluster analysis',
      'Long-form editorial article generation',
      'CMS preview formatting & meta tag generation',
      'Internal linking recommendations'
    ],
    starterPrompts: [
      'Draft a comprehensive guide on "Hybrid Learning for Busy Professionals"',
      'Analyze keywords for our upcoming leadership cohort',
      'Generate meta tags and schema descriptions for our course catalog'
    ],
    referenceOrigin: 'Marblism: Penny / Sintra: Seomi',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a04',
    code: 'A04',
    name: 'Stan Bradley',
    title: 'Prospect Researcher',
    category: 'Sales Operations',
    bio: 'Discovers high-fit B2B prospects matching Ideal Customer Profiles, enriches contact details, and handles CSV list imports.',
    avatarColor: 'bg-amber-600',
    avatarInitials: 'SB',
    capabilities: [
      'Ideal Customer Profile (ICP) filter matching',
      'Local CSV lead list import & column mapping',
      'Exclusion list & duplicate suppression',
      'Fit evidence & qualification notes'
    ],
    starterPrompts: [
      'Import prospect CSV and map name, title, email columns',
      'Filter target educational directors in California',
      'Audit current prospect list for duplicates and missing emails'
    ],
    referenceOrigin: 'Marblism: Stan / Sintra: Scouty',
    pinned: false,
    status: 'active'
  },
  {
    id: 'emp-a05',
    code: 'A05',
    name: 'Rachel Ross',
    title: 'Virtual Receptionist',
    category: 'Core',
    bio: 'Handles inbound phone calls, greets callers with warm company context, transcribes voicemails, and books appointments.',
    avatarColor: 'bg-rose-600',
    avatarInitials: 'RR',
    capabilities: [
      'Simulated virtual phone line greeting & hours check',
      'Voicemail audio simulation & real-time transcription',
      'Caller intent classification & urgent escalation',
      'Direct calendar booking via phone interaction'
    ],
    starterPrompts: [
      'Listen to recent caller voicemail and view transcript',
      'Test inbound call answering flow for Cedar & Co Learning',
      'Update after-hours greeting message and escalation routing'
    ],
    referenceOrigin: 'Marblism: Rachel / 11x: Julian (Voice)',
    pinned: true,
    status: 'active'
  },
  {
    id: 'emp-a06',
    code: 'A06',
    name: 'Linda Cross',
    title: 'Legal Assistant',
    category: 'Operations & Support',
    bio: 'Drafts standard commercial agreements, NDAs, and contractor scopes with clear clause annotations flagged for human signoff.',
    avatarColor: 'bg-slate-700',
    avatarInitials: 'LC',
    capabilities: [
      'Standard Mutual NDA generation from approved templates',
      'Client service agreement clause review',
      'Risk commentary & non-standard term flagging',
      'Human legal review enforcement (no fake certification)'
    ],
    starterPrompts: [
      'Draft a Mutual NDA for corporate training client Acme Corp',
      'Review intellectual property clause in standard instructor contract',
      'Prepare statement of work addendum for enterprise tier'
    ],
    referenceOrigin: 'Marblism: Linda',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a07',
    code: 'A07',
    name: 'Walter Hayes',
    title: 'Website Builder',
    category: 'Growth & Marketing',
    bio: 'Designs high-converting landing pages, tests lead capture forms, manages live previews, and preserves one-click rollback history.',
    avatarColor: 'bg-cyan-600',
    avatarInitials: 'WH',
    capabilities: [
      'Landing page copy and structure design',
      'Live interactive form testing with immediate state updates',
      'Versioned publication simulation (Existing vs New site)',
      'One-click instant version rollback'
    ],
    starterPrompts: [
      'Edit the Summer Executive Bootcamp landing page headline',
      'Test lead capture form submission and verify lead creation',
      'Roll back to previous website version v1.2'
    ],
    referenceOrigin: 'Marblism: Walter / Sintra: Commet',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a08',
    code: 'A08',
    name: 'Sterling Blake',
    title: 'Business Strategist',
    category: 'Strategy & Commerce',
    bio: 'Aligns company quarterly goals with team assignments, evaluates market positioning, and orchestrates multi-agent plans.',
    avatarColor: 'bg-purple-700',
    avatarInitials: 'SB',
    capabilities: [
      'Strategic growth roadmap & OKR definition',
      'Multi-agent cross-functional assignment dispatching',
      'Competitor value proposition matrix',
      'Quarterly priority reviews'
    ],
    starterPrompts: [
      'Break down Q3 goal "Launch B2B Corporate Cohort" into employee tasks',
      'Audit Cedar & Co Learning positioning against traditional bootcamps',
      'Create an action plan for increasing customer lifetime value'
    ],
    referenceOrigin: 'Sintra: Buddy',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a09',
    code: 'A09',
    name: 'Marcus Ward',
    title: 'Sales Manager',
    category: 'Sales Operations',
    bio: 'Supervises deal pipeline stages, validates qualification gates, provides sales coaching, and monitors close probability.',
    avatarColor: 'bg-blue-700',
    avatarInitials: 'MW',
    capabilities: [
      'Visual deal pipeline & stage management',
      'BANT/MEDDIC qualification verification',
      'Sales rep coaching suggestions',
      'Pipeline forecast modeling'
    ],
    starterPrompts: [
      'Review enterprise deal pipeline and identify stalled opportunities',
      'Move "TechCorp Leadership Training" to Commercial Review stage',
      'Audit qualification criteria for pending $12,000 corporate package'
    ],
    referenceOrigin: 'Sintra: Milli',
    pinned: false,
    status: 'active'
  },
  {
    id: 'emp-a10',
    code: 'A10',
    name: 'Elena Rostova',
    title: 'Lifecycle Marketer',
    category: 'Growth & Marketing',
    bio: 'Automates customer onboarding, nurture drips, and reactivation flows across verified email and WhatsApp channels.',
    avatarColor: 'bg-teal-600',
    avatarInitials: 'ER',
    capabilities: [
      'Multi-touch email welcome & nurture journeys',
      'WhatsApp notification template preview & consent check',
      'Audience segmentation by purchase history',
      'Explicit channel opt-out enforcement'
    ],
    starterPrompts: [
      'Build a 3-part email welcome sequence for newly enrolled students',
      'Preview WhatsApp milestone reminder template with opt-out link',
      'Segment inactive learners for a 30-day reactivation campaign'
    ],
    referenceOrigin: 'Sintra: Emmie',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a11',
    code: 'A11',
    name: 'Clara Diaz',
    title: 'Customer Support Lead',
    category: 'Operations & Support',
    bio: 'Provides empathetic support, resolves order & course questions from company knowledge, and supports instant human takeover.',
    avatarColor: 'bg-emerald-700',
    avatarInitials: 'CD',
    capabilities: [
      'Shared customer inbox with knowledge-base auto answers',
      'Human takeover lock preventing automated replies',
      'Escalation routing for billing & sensitive matters',
      'Customer satisfaction tracking'
    ],
    starterPrompts: [
      'Review pending support ticket regarding course refund policy',
      'Take over conversation manually from automated assistant',
      'Update knowledge base response for certificate accreditation'
    ],
    referenceOrigin: 'Sintra: Cassie',
    pinned: false,
    status: 'active'
  },
  {
    id: 'emp-a12',
    code: 'A12',
    name: 'Porter Hayes',
    title: 'Conversion Copywriter',
    category: 'Content & Creative',
    bio: 'Crafts persuasive sales copy, high-converting headlines, and value propositions synchronized across linked marketing assets.',
    avatarColor: 'bg-violet-600',
    avatarInitials: 'PH',
    capabilities: [
      'Direct-response landing page copy',
      'Ad headline and hook variations (A/B testing ready)',
      'Brand tone adherence & voice calibration',
      'Synchronized multi-asset copy updates'
    ],
    starterPrompts: [
      'Generate 5 high-converting headlines for our executive program',
      'Rewrite landing page hero copy using "Direct & Inspiring" tone',
      'Synchronize email subject lines with social campaign hooks'
    ],
    referenceOrigin: 'Sintra: Penn',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a13',
    code: 'A13',
    name: 'Diane Chen',
    title: 'Marketing & Sales Analyst',
    category: 'Operations & Support',
    bio: 'Consolidates multi-channel metrics, models customer acquisition costs, and exports transparent attribution reports.',
    avatarColor: 'bg-zinc-700',
    avatarInitials: 'DC',
    capabilities: [
      'Channel attribution & funnel conversion analysis',
      'Simulated campaign ROI & CPA calculations',
      'Clean tabular metrics with tabular-nums formatting',
      'CSV analytics report download'
    ],
    starterPrompts: [
      'Analyze conversion rates across Outbound vs Flagship Guide leads',
      'Generate monthly executive acquisition summary',
      'Export campaign performance data to CSV'
    ],
    referenceOrigin: 'Sintra: Dexter',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a14',
    code: 'A14',
    name: 'Russell Boyd',
    title: 'Talent Recruiter',
    category: 'Operations & Support',
    bio: 'Generates role scorecards, screens applicant backgrounds, coordinates interview loops, and keeps notes strictly compliant.',
    avatarColor: 'bg-amber-700',
    avatarInitials: 'RB',
    capabilities: [
      'Competency-based job description generation',
      'Applicant evaluation scorecards & interview question guides',
      'Human-only hiring decision safeguards',
      'Interview scheduling coordination'
    ],
    starterPrompts: [
      'Draft job description for "Senior Corporate Training Consultant"',
      'Prepare behavioral interview guide with scoring rubric',
      'Review shortlisted candidate profiles for workshop facilitator'
    ],
    referenceOrigin: 'Sintra: Scouty',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a15',
    code: 'A15',
    name: 'Grace Sterling',
    title: 'Private Productivity Coach',
    category: 'Operations & Support',
    bio: 'Facilitates personal founder OKRs, confidential weekly reflections, and work-life balance inside a private restricted vault.',
    avatarColor: 'bg-fuchsia-700',
    avatarInitials: 'GS',
    capabilities: [
      'Confidential personal goal tracking (isolated from shared company knowledge)',
      'Weekly founder reflection journal & energy check',
      'Delegation audit: what to hand off to AI employees',
      'Strict local privacy boundary'
    ],
    starterPrompts: [
      'Conduct my weekly founder reflection and energy audit',
      'Review my top 3 non-negotiable priorities for this week',
      'Audit tasks I did manually that should be delegated to Aria or Soren'
    ],
    referenceOrigin: 'Sintra: Gigi',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a16',
    code: 'A16',
    name: 'Arthur Pendelton',
    title: 'Advanced Outbound Sales',
    category: 'Sales Operations',
    bio: 'Orchestrates multi-touch outbound sales campaigns, tailors personalization based on prospect context, and triages replies.',
    avatarColor: 'bg-blue-600',
    avatarInitials: 'AP',
    capabilities: [
      'Multi-touch personalized cold outreach sequences',
      'Dynamic prospect snippet insertion (Company, Role, Focus)',
      'Automated opt-out and unsubscribe suppression',
      'Reply intent triage (Interested -> Meeting / Not Interested -> Pause)'
    ],
    starterPrompts: [
      'Launch 3-step outbound sequence to California corporate training directors',
      'Review personalized email drafts for top 5 prospects',
      'Handle opt-out reply and verify prospect is suppressed from future sends'
    ],
    referenceOrigin: '11x: Alice',
    pinned: true,
    status: 'active'
  },
  {
    id: 'emp-a17',
    code: 'A17',
    name: 'Jordan Bell',
    title: 'Inbound Sales Specialist',
    category: 'Sales Operations',
    bio: 'Responds instantly to web forms and chat inquiries, validates budget and timeline, and secures qualified calendar bookings.',
    avatarColor: 'bg-emerald-600',
    avatarInitials: 'JB',
    capabilities: [
      'Sub-60 second speed-to-lead form response simulation',
      'Qualification questionnaire (Budget, Timeline, Decision maker)',
      'Instant calendar booking link delivery',
      'Automatic sync to pause competing outbound outreach'
    ],
    starterPrompts: [
      'Simulate an inbound executive inquiry and trigger instant response',
      'Qualify lead from website contact form for $15,000 corporate package',
      'Book discovery call on calendar and notify sales manager Marcus'
    ],
    referenceOrigin: '11x: Julian',
    pinned: true,
    status: 'active'
  },
  {
    id: 'emp-a18',
    code: 'A18',
    name: 'Camden Cole',
    title: 'Creative Director',
    category: 'Content & Creative',
    bio: 'Develops overarching campaign hooks, creative storyboards, visual direction briefs, and brand moodboards.',
    avatarColor: 'bg-pink-600',
    avatarInitials: 'CC',
    capabilities: [
      'Campaign thematic hook development',
      'Creative moodboard & production briefs',
      'Multi-format storytelling frameworks',
      'Asset review & visual standard gatekeeping'
    ],
    starterPrompts: [
      'Develop creative concept for "Future-Proof Your Team" fall campaign',
      'Create visual moodboard direction for luxury corporate training',
      'Write production brief for social video ad series'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a19',
    code: 'A19',
    name: 'Vera Quinn',
    title: 'Visual Designer',
    category: 'Content & Creative',
    bio: 'Produces brand-aligned social graphics, promotional carousels, and banners across 1:1, 9:16, and 16:9 aspect ratios.',
    avatarColor: 'bg-indigo-500',
    avatarInitials: 'VQ',
    capabilities: [
      'Multi-format social post graphic generator',
      'Aspect ratio switching (Square 1:1, Story 9:16, Banner 16:9)',
      'Brand palette and typography enforcement',
      'Real SVG/PNG downloadable graphic asset export'
    ],
    starterPrompts: [
      'Generate executive quote carousel graphic in 1:1 and 9:16',
      'Design workshop announcement banner in 16:9 for LinkedIn',
      'Export brand-approved testimonial card with Cedar & Co styling'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a20',
    code: 'A20',
    name: 'Vivienne Leigh',
    title: 'Video & Localization Producer',
    category: 'Content & Creative',
    bio: 'Organizes video scene sequences, formats scripts, handles subtitle overlays, and previews sample video playback.',
    avatarColor: 'bg-purple-600',
    avatarInitials: 'VL',
    capabilities: [
      'Video storyboard scene sequencing',
      'Subtitle script generation & timing alignment',
      'Interactive sample video player with subtitle toggles',
      'Multi-language localization preview (English / Spanish / French)'
    ],
    starterPrompts: [
      'Play sample video reel with synchronized subtitles and sound',
      'Arrange 3-scene video storyboard for course teaser',
      'Switch video audio track to Spanish localization preview'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a21',
    code: 'A21',
    name: 'Chloe Mercer',
    title: 'Community Manager',
    category: 'Operations & Support',
    bio: 'Monitors social comments, categorizes sentiment, filters spam, and drafts helpful brand responses.',
    avatarColor: 'bg-rose-500',
    avatarInitials: 'CM',
    capabilities: [
      'Unified comment inbox with sentiment analysis',
      'Spam & toxic comment moderation (no auto-deletion of valid criticism)',
      'Thoughtful public reply drafting',
      'Customer support ticket escalation'
    ],
    starterPrompts: [
      'Review pending comments on latest LinkedIn product launch post',
      'Draft respectful reply to critical comment about pricing',
      'Escalate technical question to support lead Clara'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a22',
    code: 'A22',
    name: 'Ben Albright',
    title: 'Brand Listener',
    category: 'Growth & Marketing',
    bio: 'Tracks web mentions, press coverage, and forum discussions to detect reputation spikes and competitive trends.',
    avatarColor: 'bg-orange-600',
    avatarInitials: 'BA',
    capabilities: [
      'Simulated web & social mention tracking',
      'Brand sentiment breakdown (Positive, Neutral, Critical)',
      'Competitor share-of-voice comparison',
      'Urgent alert notification briefs'
    ],
    starterPrompts: [
      'Audit recent web mentions for "Cedar & Co Learning"',
      'Analyze sentiment breakdown across the last 30 days',
      'Prepare summary brief on competitor training announcements'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a23',
    code: 'A23',
    name: 'Astrid Lind',
    title: 'Audience Growth Specialist',
    category: 'Growth & Marketing',
    bio: 'Drives qualified followers and inbound leads through our Flagship "Comment to Receive Guide" automation loop.',
    avatarColor: 'bg-teal-700',
    avatarInitials: 'AL',
    capabilities: [
      'Flagship Comment-to-Guide campaign setup & monitoring',
      'Keyword trigger configuration (e.g. "GROW", "GUIDE")',
      'Genuine downloadable PDF resource delivery',
      'Separate qualification & explicit marketing consent capture',
      'Interactive recipient simulator modal'
    ],
    starterPrompts: [
      'Open Flagship "Send Guide to Commenters" campaign simulator',
      'Test recipient experience: leave "GROW" comment and receive guide PDF',
      'Verify separate marketing consent opt-in creates verified lead in CRM'
    ],
    referenceOrigin: 'Synthetic',
    pinned: true,
    status: 'active'
  },
  {
    id: 'emp-a24',
    code: 'A24',
    name: 'Maya Lin',
    title: 'Meta Ads Specialist',
    category: 'Growth & Marketing',
    bio: 'Designs Instagram and Facebook advertising campaigns, manages creative assets, and models budget allocations.',
    avatarColor: 'bg-blue-500',
    avatarInitials: 'ML',
    capabilities: [
      'Campaign objective configuration (Leads / Traffic / Sales)',
      'Audience targeting & lookalike simulation',
      'Ad creative pairing & budget safety caps',
      'Simulated campaign launch, pause, and optimization'
    ],
    starterPrompts: [
      'Review pending Meta Ad campaign for Q3 Bootcamp enrollment',
      'Set $50/day budget cap with explicit human approval',
      'Simulate ad launch and review cost-per-lead performance'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a25',
    code: 'A25',
    name: 'Gideon Vance',
    title: 'Google Ads Specialist',
    category: 'Growth & Marketing',
    bio: 'Manages high-intent search ad campaigns, keyword match types, negative keyword exclusions, and quality score checks.',
    avatarColor: 'bg-red-600',
    avatarInitials: 'GV',
    capabilities: [
      'High-intent search keyword list with bid simulations',
      'Negative keyword list hygiene (suppressing wasteful queries)',
      'Responsive Search Ad copy creation & headline testing',
      'Landing page relevance check'
    ],
    starterPrompts: [
      'Audit search keywords for "executive leadership training"',
      'Add negative keywords to eliminate "free online degrees" traffic',
      'Simulate launch of Google Search campaign with $1,500 monthly cap'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a26',
    code: 'A26',
    name: 'Anika Patel',
    title: 'Answer-Engine Visibility Specialist',
    category: 'Growth & Marketing',
    bio: 'Audits visibility across AI search engines (Perplexity, ChatGPT, Claude) and optimizes brand entity citations.',
    avatarColor: 'bg-lime-700',
    avatarInitials: 'AP',
    capabilities: [
      'AI answer engine query citation simulation',
      'Content gap analysis for conversational search queries',
      'Structured brand schema recommendations',
      'Grounded visibility score without false rank promises'
    ],
    starterPrompts: [
      'Audit how Perplexity and ChatGPT cite Cedar & Co for executive training',
      'Identify missing educational topics where competitors get cited',
      'Generate structured FAQ schema to improve AI engine grounding'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a27',
    code: 'A27',
    name: 'Craig Hoffman',
    title: 'Conversion Rate Specialist',
    category: 'Growth & Marketing',
    bio: 'Formulates CRO hypotheses, designs A/B landing page variants, and evaluates statistical test outcomes.',
    avatarColor: 'bg-emerald-800',
    avatarInitials: 'CH',
    capabilities: [
      'Conversion funnel bottleneck identification',
      'A/B test hypothesis drafting (Control vs Variant)',
      'Traffic split testing & sample size simulation',
      'Inconclusive outcome detection (no premature winner declarations)'
    ],
    starterPrompts: [
      'Design A/B test for landing page CTA button ("Enroll Now" vs "Schedule Call")',
      'Simulate test traffic across 1,200 visitors and review confidence interval',
      'Review inconclusive test result and formulate secondary hypothesis'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a28',
    code: 'A28',
    name: 'Paige Winters',
    title: 'Partnerships & Referrals',
    category: 'Sales Operations',
    bio: 'Structures co-marketing agreements, generates tracked affiliate links, and calculates verified referral commissions.',
    avatarColor: 'bg-violet-700',
    avatarInitials: 'PW',
    capabilities: [
      'Affiliate & co-marketing partner onboarding briefs',
      'Unique tracked referral link generation',
      'Sample referral conversion simulation',
      'Commission payout review & approval'
    ],
    starterPrompts: [
      'Generate affiliate brief for Corporate HR Association partner',
      'Create unique tracked link for podcast co-promotion',
      'Review pending referral commission of $600 for verified enrollment'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a29',
    code: 'A29',
    name: 'Rory Gallagher',
    title: 'Revenue Operations Specialist',
    category: 'Sales Operations',
    bio: 'Maintains CRM data integrity, merges duplicate contact records, resolves field conflicts, and safeguards sender domain health.',
    avatarColor: 'bg-stone-700',
    avatarInitials: 'RG',
    capabilities: [
      'Duplicate lead detection & safe reversible merge preview',
      'Field conflict resolution (preserving primary source record)',
      'Email sender domain health & bounce rate monitoring',
      'Outbound emergency pause trigger'
    ],
    starterPrompts: [
      'Run deduplication scan across prospect database and review merge proposal',
      'Check email domain SPF/DKIM authentication and simulated sender score',
      'Trigger safety pause on outbound sequence due to domain health limit'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a30',
    code: 'A30',
    name: 'Sloane Kelly',
    title: 'Customer Success Manager',
    category: 'Operations & Support',
    bio: 'Guides new client onboarding milestones, monitors usage health signals, and surfaces renewal and expansion opportunities.',
    avatarColor: 'bg-teal-800',
    avatarInitials: 'SK',
    capabilities: [
      'Verified purchase to onboarding kickoff transition',
      'Client health score calculation (Green / Yellow / Red)',
      'Quarterly business review (QBR) deck generation',
      'Renewal date alert & upsell opportunity suggestions'
    ],
    starterPrompts: [
      'Trigger kickoff onboarding checklist for new enterprise client',
      'Review account health score for Apex Global training cohort',
      'Generate renewal proposal for 50-seat corporate expansion'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'idle'
  },
  {
    id: 'emp-a31',
    code: 'A31',
    name: 'Preston Shaw',
    title: 'Proposal & Deal Desk Specialist',
    category: 'Sales Operations',
    bio: 'Constructs custom commercial proposals, configures tiered scope options, coordinates legal signoff, and simulates customer decision.',
    avatarColor: 'bg-indigo-700',
    avatarInitials: 'PS',
    capabilities: [
      'Custom commercial proposal generation with scope & pricing table',
      'Legal review requirement enforcement before client delivery',
      'Interactive mock customer decision simulator (Accept / Request Edit)',
      'Confirmed signature handoff to customer success'
    ],
    starterPrompts: [
      'Draft custom $18,500 enterprise training proposal for Horizon Labs',
      'Submit proposal for internal legal review by Linda Cross',
      'Simulate client acceptance and transition deal to Closed Won'
    ],
    referenceOrigin: 'Synthetic',
    pinned: false,
    status: 'active'
  },
  {
    id: 'emp-a32',
    code: 'A32',
    name: 'Caleb Rivers',
    title: 'Commerce & Order Specialist',
    category: 'Strategy & Commerce',
    bio: 'Manages product course catalog, handles stock/seat availability, reviews checkout inquiries, and executes abandoned cart recovery.',
    avatarColor: 'bg-amber-800',
    avatarInitials: 'CR',
    capabilities: [
      'Course & product catalog management (Pricing, Seats, Description)',
      'Simulated interactive checkout preview & order confirmation',
      'Abandoned cart recovery message preview',
      'Post-purchase receipt & access dispatch'
    ],
    starterPrompts: [
      'View course catalog seats and update Summer Cohort pricing',
      'Preview checkout order summary for Executive Leadership Pass',
      'Send abandoned cart reminder email with special single-use promo'
    ],
    referenceOrigin: 'Sintra: Commet',
    pinned: false,
    status: 'idle'
  }
];
