# Ooumph - Product Context

## 1. Product Vision & Boundary
Ooumph is an employee-first agentic business platform built for nontechnical business owners.
It combines:
- Dedicated, human-relatable AI employees with clear job roles and visible, editable work outputs.
- Shared business knowledge (brand tone, product offers, approved claims, FAQs, guidelines) with rollback and lesson learning.
- Team coordination where goals turn into editable multi-agent execution plans.
- Deep sales operations (inbound triage & booking, outbound prospect research, CSV import, email sequences, CRM sync).

### Boundary Rules
- **Pure Frontend Demo**: All workflows, conversations, external connections, email dispatches, ad launches, website publication, and call routing are simulated locally in-browser.
- **No Production Backends / OAuth / Models**: No live Gemini API calls, no real external auth, no real payments, no external web scraping.
- **Local Persistence**: Full demo state persists cleanly in browser `localStorage` and memory with schema versioning, reload survival, and a safe Reset Demo mechanism.
- **Honest Simulation**: Clear demo watermarking, explicit simulation feedback, and separated historical seed data from live user session events.

## 2. Reference Map & Influences
- **Marblism Pattern**: Choose a recognizable specialist with a single, clear job; delegate work in chat; review and directly edit tangible, high-fidelity artifacts in the workspace.
- **Sintra Pattern**: Frictionless starter tasks, shared business context memory, proactive suggestions, recurring routines, and automated handoffs without technical complexity.
- **11x Pattern**: Purpose-built sales employees owning end-to-end outbound (prospecting, enrichment, personalized sequences) and inbound (speed-to-lead triage, qualification, calendar booking, pipeline progression).
- **Previous Failure Avoided**: Rejects dense 154-view enterprise admin consoles, microscopic 10px labels, and multi-nested card dashboards in favor of warm, human, uncluttered, focused workspaces.

## 3. Visual & UX Direction
- **Surfaces**: Warm stone/slate backgrounds (`#F8F9FA` / `#FAF9F6`), crisp white workspace canvases (`#FFFFFF`), subtle hairline borders (`#E2E8F0`).
- **Typography**: 16px body prose, 14px controls, balanced headings, zero-pill metadata discipline (`·` separators), tabular numbers for metrics.
- **Employee Identity**: Prominent job titles, distinct color signatures, friendly portrait badges, and consistent names stored in a centralized registry.
- **First-Fold Viewport**: High-leverage task prompt, recommended core team (Executive Assistant, Social Publisher, Inbound Sales, Receptionist), and urgent review inbox ("What do I need to decide?").
