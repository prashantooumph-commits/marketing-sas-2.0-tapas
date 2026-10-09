import { WorkflowTemplate } from '../types';
import { FOUNDATION_WEB_WORKFLOWS } from './workflows/foundationWeb';
import { SEO_AEO_GEO_WORKFLOWS } from './workflows/seoAeoGeo';
import { CONTENT_SOCIAL_WORKFLOWS } from './workflows/contentSocial';
import { BRAND_REPUTATION_WORKFLOWS } from './workflows/brandReputation';
import { PAID_GROWTH_WORKFLOWS } from './workflows/paidGrowth';
import { EVENTS_LIFECYCLE_WORKFLOWS } from './workflows/eventsLifecycle';
import { SALES_WORKFLOWS } from './workflows/sales';
import { ECOMMERCE_WORKFLOWS } from './workflows/ecommerce';
import { CUSTOMER_SUCCESS_WORKFLOWS } from './workflows/customerSuccess';
import { OPERATIONS_WORKFLOWS } from './workflows/operations';

export const INITIAL_WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  ...FOUNDATION_WEB_WORKFLOWS,
  ...SEO_AEO_GEO_WORKFLOWS,
  ...CONTENT_SOCIAL_WORKFLOWS,
  ...BRAND_REPUTATION_WORKFLOWS,
  ...PAID_GROWTH_WORKFLOWS,
  ...EVENTS_LIFECYCLE_WORKFLOWS,
  ...SALES_WORKFLOWS,
  ...ECOMMERCE_WORKFLOWS,
  ...CUSTOMER_SUCCESS_WORKFLOWS,
  ...OPERATIONS_WORKFLOWS
];

export const getWorkflowTemplateById = (idOrLegacy: string): WorkflowTemplate | undefined => {
  return INITIAL_WORKFLOW_TEMPLATES.find(
    (t) =>
      t.id === idOrLegacy ||
      t.legacyId === idOrLegacy ||
      t.code?.toLowerCase() === idOrLegacy.toLowerCase()
  );
};
