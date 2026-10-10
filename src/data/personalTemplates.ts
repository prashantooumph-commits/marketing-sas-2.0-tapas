import { WorkflowTemplate } from '../types';

export const INITIAL_PERSONAL_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'tmpl-pers-01',
    code: 'CUSTOM-01',
    name: 'Instagram Comment to Meeting Funnel',
    title: 'Instagram Comment to Meeting Funnel',
    outcome: 'Convert high-intent social commenters into scheduled executive sales discovery meetings.',
    outcomeCategory: 'Turn engagement into meetings',
    shortDescription: 'Monitors Reel comments for trigger keyword, routes lead through qualification, and books discovery calls.',
    description: 'Autonomous Instagram comment qualification funnel. When a prospect comments with a designated keyword, community responses are dispatched, RevOps enriches the contact, Inbound Sales qualifies intent, and meetings are booked with human signoff.',
    category: 'Growth & Sales',
    bestFor: 'B2B Founders and high-ticket service operators driving social engagement directly into pipeline meetings.',
    participatingEmployeeIds: ['emp-a23', 'emp-a21', 'emp-a29', 'emp-a17', 'emp-a10'],
    employeeIds: ['emp-a23', 'emp-a21', 'emp-a29', 'emp-a17', 'emp-a10'],
    expectedSteps: [
      {
        title: 'Monitor Comment Trigger',
        employeeCode: 'A23',
        type: 'employee_task',
        description: 'Listen for Instagram comment containing keyword "DEMO" on promotional Reels.'
      },
      {
        title: 'Human Review & DM Consent',
        employeeCode: 'A01',
        type: 'human_approval',
        description: 'Authorize personalized direct-message outreach and resource link distribution.'
      },
      {
        title: 'Community Response & Resource Dispatch',
        employeeCode: 'A21',
        type: 'employee_task',
        description: 'Reply publicly to comment and send private DM containing executive resource package.'
      },
      {
        title: 'RevOps Lead Enrichment & Deduplication',
        employeeCode: 'A29',
        type: 'employee_task',
        description: 'Parse commenter profile, cross-reference CRM for existing deals, and enrich contact record.'
      },
      {
        title: 'Inbound Sales Lead Qualification',
        employeeCode: 'A17',
        type: 'employee_task',
        description: 'Assess company size, role seniority, and decision timeline against ICP rubric.'
      },
      {
        title: 'Qualification Condition Check',
        employeeCode: 'A17',
        type: 'condition',
        description: 'IF Lead is Qualified THEN continue to Meeting Booking ELSE route to 4-week Nurture sequence.'
      },
      {
        title: 'Discovery Meeting Booking',
        employeeCode: 'A17',
        type: 'employee_task',
        description: 'Provide calendar booking link, confirm protected appointment slot, and notify founder.'
      }
    ],
    approvalPoints: ['Human Review & DM Consent'],
    approvalGates: ['Human Review & DM Consent'],
    typicalDuration: '24-48 hours',
    requiredConnectionTypes: ['meta_business', 'google_workspace'],
    optionalConnectionTypes: ['twilio_voice'],
    inputs: ['Reel URL', 'Keyword ("DEMO")', 'Resource PDF link', 'Calendar slot pool'],
    outputs: ['Enriched CRM Lead', 'DM Conversation Thread', 'Booked Calendar Appointment'],
    successMetrics: [
      'Comment-to-DM Response Rate: Target >85%',
      'Lead Qualification Rate: Target >30%',
      'Discovery Meeting Bookings: Target 10 meetings'
    ],
    tags: ['Custom', 'Instagram', 'Social Selling', 'Meeting Booking', 'Inbound'],
    featured: true,
    complexity: 'moderate',
    templateSource: 'personal',
    status: 'active',
    version: 1,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    createdBy: 'Sarah Jenkins',
    editable: true,
    workspaceId: 'ws-cedar',
    trigger: {
      type: 'SOCIAL_COMMENT_KEYWORD',
      label: 'Social Comment Keyword Trigger',
      description: 'Triggered when an Instagram comment contains the designated trigger keyword.',
      keyword: 'DEMO',
      sourceChannel: 'Instagram Professional',
      simulatedEventNote: 'Demo trigger simulates incoming comment matching "DEMO" keyword.'
    },
    richSteps: [
      {
        id: 'step-1',
        title: 'Monitor Comment Trigger',
        type: 'employee_task',
        employeeCode: 'A23',
        employeeId: 'emp-a23',
        description: 'Listen for Instagram comment containing keyword "DEMO" on promotional Reels.',
        expectedOutput: 'Identified commenter handle and matched keyword payload.',
        impactCategory: 'internal_work',
        requiredConnections: ['meta_business']
      },
      {
        id: 'step-2',
        title: 'Human Review & DM Consent',
        type: 'human_approval',
        description: 'Authorize personalized direct-message outreach and resource link distribution.',
        impactCategory: 'outbound_messaging',
        approvalConfig: {
          approverRole: 'Project Owner',
          approverName: 'Sarah Jenkins',
          subjectToApprove: 'Outreach DM message copy and promotional incentive.',
          riskCategory: 'Public Exposure / DM Outreach',
          onApproveAction: 'Dispatch DM message and update CRM record.',
          onRequestChangesAction: 'Refine DM copy in specialist workspace.'
        }
      },
      {
        id: 'step-3',
        title: 'Community Response & Resource Dispatch',
        type: 'employee_task',
        employeeCode: 'A21',
        employeeId: 'emp-a21',
        description: 'Reply publicly to comment and send private DM containing executive resource package.',
        expectedOutput: 'Published comment reply and dispatched private direct message.',
        impactCategory: 'public_publishing',
        requiredConnections: ['meta_business']
      },
      {
        id: 'step-4',
        title: 'RevOps Lead Enrichment & Deduplication',
        type: 'employee_task',
        employeeCode: 'A29',
        employeeId: 'emp-a29',
        description: 'Parse commenter profile, cross-reference CRM for existing deals, and enrich contact record.',
        expectedOutput: 'De-duplicated lead profile with verified email and company domain.',
        impactCategory: 'internal_work'
      },
      {
        id: 'step-5',
        title: 'Inbound Sales Lead Qualification',
        type: 'employee_task',
        employeeCode: 'A17',
        employeeId: 'emp-a17',
        description: 'Assess company size, role seniority, and decision timeline against ICP rubric.',
        expectedOutput: 'Qualification score (A/B/C) with intent notes.',
        impactCategory: 'internal_work'
      },
      {
        id: 'step-6',
        title: 'Qualification Condition Check',
        type: 'condition',
        description: 'IF Lead is Qualified THEN continue to Meeting Booking ELSE route to 4-week Nurture sequence.',
        conditionConfig: {
          field: 'Lead Qualification Status',
          operator: 'equals',
          value: 'Qualified',
          thenActionDescription: 'Continue to Step 7: Discovery Meeting Booking',
          elseActionDescription: 'Route contact to Elena Rostova (A10) 4-Week Nurture Sequence'
        }
      },
      {
        id: 'step-7',
        title: 'Discovery Meeting Booking',
        type: 'employee_task',
        employeeCode: 'A17',
        employeeId: 'emp-a17',
        description: 'Provide calendar booking link, confirm protected appointment slot, and notify founder.',
        expectedOutput: 'Confirmed calendar invitation and brief prepared for founder.',
        impactCategory: 'commercial_commitment',
        requiredConnections: ['google_workspace']
      }
    ]
  },
  {
    id: 'tmpl-pers-02',
    code: 'CUSTOM-02',
    name: 'Small-Batch Handcrafted Goods Drop',
    title: 'Small-Batch Handcrafted Goods Drop',
    outcome: 'Coordinate product lookbook teaser, customer VIP alert, and stockist wholesale announcement.',
    outcomeCategory: 'Drive store traffic & sales',
    shortDescription: 'Multi-specialist announcement cycle for limited workshop releases.',
    description: 'Autonomous release cycle for limited artisanal inventory. Coordinates product photography teasers, email broadcast to VIP collectors, and wholesale reorder check with human signoff.',
    category: 'Commerce & Support',
    bestFor: 'Artisanal brands and DTC workshops releasing numbered production runs.',
    participatingEmployeeIds: ['emp-a12', 'emp-a19', 'emp-a10', 'emp-a32'],
    employeeIds: ['emp-a12', 'emp-a19', 'emp-a10', 'emp-a32'],
    expectedSteps: [
      {
        title: 'Lookbook & Material Copywriting',
        employeeCode: 'A12',
        type: 'employee_task',
        description: 'Draft evocative story focusing on Tuscan vegetable-tanned leather and brass rivets.'
      },
      {
        title: 'Visual Asset Crop & Story Graphics',
        employeeCode: 'A19',
        type: 'employee_task',
        description: 'Generate 9:16 vertical stories and 1:1 lookbook carousel graphics.'
      },
      {
        title: 'Founder Signoff on Batch Pricing & Allocations',
        employeeCode: 'A01',
        type: 'human_approval',
        description: 'Review final batch pricing and retail stockist reservation split.'
      },
      {
        title: 'VIP Email & Social Broadcast',
        employeeCode: 'A10',
        type: 'employee_task',
        description: 'Send early-access alert to 500 VIP collectors.'
      }
    ],
    approvalPoints: ['Founder Signoff on Batch Pricing & Allocations'],
    approvalGates: ['Founder Signoff on Batch Pricing & Allocations'],
    typicalDuration: '3-5 days',
    requiredConnectionTypes: ['instagram_pro'],
    optionalConnectionTypes: ['stripe_billing'],
    inputs: ['Batch unit count (50)', 'Material specifications', 'Drop date'],
    outputs: ['Lookbook Story Set', 'VIP Email Broadcast', 'Shop Catalog Update'],
    successMetrics: [
      'VIP Open Rate: Target >60%',
      'First 24h Sell-Through: Target >75%'
    ],
    tags: ['Custom', 'Drop', 'Ecommerce', 'Artisanal'],
    featured: true,
    complexity: 'simple',
    templateSource: 'personal',
    status: 'active',
    version: 1,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    createdBy: 'Artisan Workshop Owner',
    editable: true,
    workspaceId: 'ws-acme',
    trigger: {
      type: 'MANUAL',
      label: 'Manual Release Launch',
      description: 'Triggered manually by founder when production batch is numbered and inspected.'
    },
    richSteps: [
      {
        id: 'step-acme-1',
        title: 'Lookbook & Material Copywriting',
        type: 'employee_task',
        employeeCode: 'A12',
        employeeId: 'emp-a12',
        description: 'Draft evocative story focusing on Tuscan vegetable-tanned leather and brass rivets.',
        expectedOutput: 'Product description and 3 social teaser captions.',
        impactCategory: 'internal_work'
      },
      {
        id: 'step-acme-2',
        title: 'Visual Asset Crop & Story Graphics',
        type: 'employee_task',
        employeeCode: 'A19',
        employeeId: 'emp-a19',
        description: 'Generate 9:16 vertical stories and 1:1 lookbook carousel graphics.',
        expectedOutput: 'Lookbook carousel pack and announcement teaser asset.',
        impactCategory: 'internal_work'
      },
      {
        id: 'step-acme-3',
        title: 'Founder Signoff on Batch Pricing & Allocations',
        type: 'human_approval',
        description: 'Review final batch pricing and retail stockist reservation split.',
        impactCategory: 'commercial_commitment',
        approvalConfig: {
          approverRole: 'Workshop Founder',
          approverName: 'Workspace Owner',
          subjectToApprove: 'Drop pricing tier and stock allocation per merchant.',
          riskCategory: 'Commercial Pricing',
          onApproveAction: 'Proceed to VIP collector broadcast.',
          onRequestChangesAction: 'Adjust price point or wholesale ratio.'
        }
      },
      {
        id: 'step-acme-4',
        title: 'VIP Email & Social Broadcast',
        type: 'employee_task',
        employeeCode: 'A10',
        employeeId: 'emp-a10',
        description: 'Send early-access alert to 500 VIP collectors.',
        expectedOutput: 'Dispatched VIP sequence with unique checkout links.',
        impactCategory: 'outbound_messaging',
        requiredConnections: ['instagram_pro']
      }
    ]
  }
];
