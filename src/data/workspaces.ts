import { Workspace } from '../types';

export const INITIAL_WORKSPACES: Workspace[] = [
  {
    id: 'ws-cedar',
    name: 'Cedar & Co Learning',
    domain: 'cedarlearning.co',
    industry: 'Executive Education & Leadership Coaching',
    mission: 'Empowering non-technical founders and modern managers with practical leadership systems and AI-augmented operational mastery.',
    audience: 'Mid-to-senior business executives, scaling startup founders, and corporate department leads looking for actionable, cohort-based management training.',
    brandTone: 'Empathetic, crisp, academically grounded yet fiercely practical. Never bureaucratic, jargon-heavy, or breathless.',
    approvedClaims: [
      'Over 2,400 business leaders trained across 14 countries.',
      'Average executive time saved post-cohort: 8.5 hours per week.',
      'Faculty includes former Fortune 500 VPs and recognized operational specialists.',
      'Small group cohort cap: maximum 24 fellows per intensive session.'
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'What is the weekly time commitment for the Executive Cohort?',
        answer: 'Fellows spend approximately 3.5 hours per week: one 90-minute live tactical session, plus 2 hours of async peer review and executive workbook application.',
        approved: true
      },
      {
        id: 'faq-2',
        question: 'Do you offer corporate or team group enrollments?',
        answer: 'Yes. Teams of 4 or more receive customized team breakout sessions and dedicated cohort coaching with a custom commercial invoice.',
        approved: true
      },
      {
        id: 'faq-3',
        question: 'What is the refund and cancellation policy?',
        answer: 'Full refund available up to 7 calendar days before the first cohort session starts. Once the cohort begins, transfers to the subsequent quarter are permitted.',
        approved: true
      }
    ],
    sampleDocs: [
      {
        id: 'doc-1',
        title: 'Cedar & Co Brand Identity & Voice Guide',
        type: 'Brand Guidelines',
        content: 'Our core philosophy is "clarity creates velocity". We speak to seasoned business leaders like respected peers. Avoid tech buzzwords like "synergy", "game-changing", and "revolutionize". Use direct, human sentences with quantifiable outcomes.'
      },
      {
        id: 'doc-2',
        title: 'Executive Fellowship Course Syllabus & Scope',
        type: 'Curriculum Brief',
        content: '6-Week Modular Syllabus: Week 1 Operational Triage; Week 2 Delegation Architecture; Week 3 High-Trust Communication; Week 4 Financial Levers; Week 5 AI & Automation Teammates; Week 6 Capstone Execution.'
      }
    ],
    lessons: [
      {
        id: 'lsn-1',
        trigger: 'When prospects ask about accreditation',
        lesson: 'Do not claim university accreditation. Clarify that Cedar & Co is an industry-recognized professional credential with verified digital credentials through Accredible.',
        active: true,
        createdAt: '2026-09-14T10:00:00Z'
      },
      {
        id: 'lsn-2',
        trigger: 'When emailing European corporate leads',
        lesson: 'Always include explicit GDPR double-opt-in wording and clearly link our privacy policy in the first outreach email footer.',
        active: true,
        createdAt: '2026-09-28T14:30:00Z'
      }
    ],
    conflictingFacts: [
      {
        id: 'cf-1',
        claimA: 'Cohort maximum capacity is 20 fellows (old 2025 marketing flyer)',
        claimB: 'Cohort maximum capacity is 24 fellows (current 2026 executive syllabus)',
        resolved: true,
        resolution: 'Confirmed current policy is 24 fellows per cohort with 2 dedicated faculty coaches.'
      }
    ]
  },
  {
    id: 'ws-acme',
    name: 'Acme Craft Goods',
    domain: 'acmecraftgoods.com',
    industry: 'Artisanal Home & Leather Goods',
    mission: 'Creating timeless, ethically sourced full-grain leather goods and heritage workshop essentials built to endure generations.',
    audience: 'Design-conscious professionals, architects, and discerning hobbyists who value craftsmanship, tactile quality, and sustainable sourcing.',
    brandTone: 'Quietly confident, artisanal, tactile, warm, and honest about materials.',
    approvedClaims: [
      '100% vegetable-tanned full-grain leather sourced from certified Tuscan tanneries.',
      'Lifetime warranty on all solid brass hardware and hand-stitched seams.',
      'Handcrafted in small batches of 50 units in Portland, Oregon.'
    ],
    faqs: [
      {
        id: 'acme-faq-1',
        question: 'How do I care for untreated vegetable-tanned leather?',
        answer: 'We recommend applying our natural beeswax leather balm once every 4 months. Avoid prolonged moisture and let water spots dry naturally.',
        approved: true
      }
    ],
    sampleDocs: [
      {
        id: 'acme-doc-1',
        title: 'Acme Material Standards & Workshop Sourcing',
        type: 'Product Specs',
        content: 'Every hide is inspected for grain uniformity. Natural range marks and patina development are celebrated as evidence of genuine uncorrected full-grain leather.'
      }
    ],
    lessons: [
      {
        id: 'acme-lsn-1',
        trigger: 'When answering leather waterproofing questions',
        lesson: 'Never claim our bags are 100% waterproof. Specify water-resistant and advise against submersion.',
        active: true,
        createdAt: '2026-10-01T09:00:00Z'
      }
    ],
    conflictingFacts: []
  }
];
