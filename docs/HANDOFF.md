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
