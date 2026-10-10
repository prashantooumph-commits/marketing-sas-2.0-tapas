# Ooumph - Frontend Architecture & Handoff Guide

## Core Architecture
- **Framework**: React 19 SPA + Vite + TypeScript + Tailwind CSS v4.
- **State Store**: Fully reactive custom hook/store (`src/store/ooumphStore.ts`) backed by `localStorage` with versioned key migration (`ooumph_store_v1`) and memory fallback.
- **Asset Generation**: Real bundled client-side PDF document creator for the Flagship Comment-to-Guide journey (`src/utils/pdfGenerator.ts`), SVG-based audio visualizer for Receptionist Rachel, and HTML5 Canvas interactive video playback for Producer Vivienne.
- **Data Model**:
  - `Employee`: ID, Code (A01-A32), Name, Title, Bio, Category, Avatar Color, Starter Prompts, Capabilities.
  - `Workspace`: ID, Name, Domain, Industry, Mission, Brand Tone, Approved Claims, FAQs, Lessons.
  - `Task`: ID, Title, AssignedEmployeeId, Status, ArtifactType, ArtifactData, CreatedAt.
  - `Approval`: ID, Title, Summary, EmployeeId, Status, Payload, RiskLevel, CreatedAt.
  - `Conversation`: Thread history, Employee, messages with editable draft responses, Takeover status.
  - `Lead / Prospect`: ID, Name, Company, Email, Phone, Status, TouchCount, Consents, Source.
  - `Campaign`: ID, Name, Channel, Budget, Status, LeadsGenerated, Conversions.
  - `SimulationEvent`: Logged user-driven simulated events separated from seed history.
  - `Project`: Project details, stages, target metrics, cadence type (`one_time`, `recurring_weekly`, `event_driven`, `multi_phase_ongoing`), `startDate`, `isOngoing`, `connectionBlockers`.
  - `WorkflowStep`: Step types (`employee_task`, `human_task`, `human_approval`, `condition`, `wait_schedule`, `handoff`), inputs/expectedOutputs, execution status, conditions and wait configs.
  - `ProjectAsset`: Lineage trail with `producedByEmployeeCode`, `usedByEmployeeCode`, `usedByStepTitle`, `sourceType`, and role artifact references.

## Project Command Center Architecture (Phase 2C.2A & 2C.2B)
- **Visual Execution Map (`ProjectExecutionMap.tsx`)**: Directional flow of workflow runs with human and specialist steps, handoff transitions, inputs, outputs, and interactive status inspector.
- **Workflow Step Detail Drawer (`WorkflowStepDetailDrawer.tsx`)**: Slide-out drawer with input/output contracts, step execution status, human task completion, approval actions, blocker diagnostics, and link to specialist workspace.
- **Phase Transition Modal (`PhaseTransitionReviewModal.tsx`)**: Pre-flight review checklist of completed deliverables, pending approvals/blockers, and next phase specialist roster before phase progression.
- **Assignment Composer Modal (`AssignmentComposerModal.tsx`)**: Unified assignment creator for all 32 specialists and human teammates supporting one-time (immediate/scheduled), recurring (daily/weekdays/weekly/monthly), and event-driven cadences with end conditions and output contracts.
- **Automations & Routines Library (`AutomationsLibraryView.tsx`)**: Dedicated workspace management surface for activated recurring automations with Pause, Resume, Skip Next Run, and Cancel Future Runs.
- **Project Settings & Governance Lifecycle (`ProjectSettingsModal.tsx`)**: 8-tab comprehensive settings modal managing Details, Schedule, Team, Governance, Connections, Outputs, Notifications, and Lifecycle (Pause, Resume, End, Archive).
- **Individual Task Detail Modal (`TaskDetailModal.tsx`)**: Dedicated modal for inspecting specialist assignments with expected outputs, direct workspace navigation, and human task completion.
- **Project Scoped Views in `MyWorkView.tsx`**:
  - Command Bar with primary controls (`Start Project`, `View Current Work`, `Resume`, `Review Results`) and secondary action menu.
  - First-Fold Overview: NOW, NEXT, NEEDS YOU, BLOCKED, LATEST OUTPUT.
  - Tabs: Overview, Flow (Execution Map), Tasks, Outputs, Activity, Results.
  - All tasks, approvals, outputs, and results strictly scoped to `projectId` without workspace cross-contamination.

## Running & Testing
- Dev Server: `npm run dev` (starts on port 3000)
- Production Build: `npm run build`
- Type & Syntax Check: `npm run lint`

## Safe Demo Reset & Scenario Controls
- The Demo Drawer (accessible via top-right "Demo Tools" or bottom status bar) provides:
  - Fast Scenario Advance (+1 Day, +1 Week).
  - Seeded Demo Mode vs Fresh Workspace Mode.
  - Plan Tier Selector (Starter, Growth, Scale) with feature gating previews.
  - Client Workspace Switcher (Cedar & Co Learning vs Acme Craft Goods).
  - Factory Reset Button (restores pristine seeded records without affecting app integrity).
