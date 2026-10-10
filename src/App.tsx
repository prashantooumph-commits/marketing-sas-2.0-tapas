import React, { useState } from 'react';
import { OoumphProvider, useOoumph } from './store/ooumphStore';
import { TopBar } from './components/navigation/TopBar';
import { TeamHomeView } from './components/views/TeamHomeView';
import { MyWorkView } from './components/views/MyWorkView';
import { InboxView } from './components/views/InboxView';
import { SalesView } from './components/views/SalesView';
import { MyBusinessView } from './components/views/MyBusinessView';
import { SettingsView } from './components/views/SettingsView';
import { EmployeeWorkspace } from './components/employee/EmployeeWorkspace';
import { FlagshipGuideSimulatorModal } from './components/modals/FlagshipGuideSimulatorModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { DemoToolsDrawer } from './components/modals/DemoToolsDrawer';
import { CustomerBookingModal } from './components/modals/customer/CustomerBookingModal';
import { CustomerProposalModal } from './components/modals/customer/CustomerProposalModal';
import { CustomerPreferenceCenterModal } from './components/modals/customer/CustomerPreferenceCenterModal';
import { CustomerCheckoutModal } from './components/modals/customer/CustomerCheckoutModal';
import { GoalPlannerModal } from './components/modals/GoalPlannerModal';
import { ProductGuideModal } from './components/modals/ProductGuideModal';
import { EmployeeChooserModal } from './components/modals/EmployeeChooserModal';
import { WorkflowSetupWizardModal } from './components/modals/WorkflowSetupWizardModal';
import { AddTeammateModal } from './components/modals/AddTeammateModal';
import { BusinessSolutionDetailModal } from './components/workflows/BusinessSolutionDetailModal';
import { WorkflowDetailModal } from './components/workflows/WorkflowDetailModal';
import { IntegrationConnectModal } from './components/modals/IntegrationConnectModal';
import { IntegrationDetailModal } from './components/modals/IntegrationDetailModal';
import { WorkflowBuilderModal } from './components/workflows/builder/WorkflowBuilderModal';
import { AssignmentComposerModal } from './components/modals/AssignmentComposerModal';
import { ProjectSettingsModal } from './components/modals/ProjectSettingsModal';
import {
  Users,
  Layers,
  Inbox,
  TrendingUp,
  MoreHorizontal,
  SlidersHorizontal,
  Sparkles,
  Building2,
  Settings as SettingsIcon,
  X
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    navigate,
    selectedEmployeeId,
    employees,
    activeWorkspace,
    allWorkspaces,
    switchWorkspace,
    demoMode,
    approvals,
    setIsDemoToolsOpen,
    setIsFlagshipSimulatorOpen,
    isCustomerBookingOpen,
    setIsCustomerBookingOpen,
    isCustomerProposalOpen,
    setIsCustomerProposalOpen,
    isCustomerPreferenceCenterOpen,
    setIsCustomerPreferenceCenterOpen,
    isCustomerCheckoutOpen,
    setIsCustomerCheckoutOpen,
    businessSolutions,
    workflowTemplates,
    selectedSolutionId,
    setSelectedSolutionId,
    isSolutionDetailOpen,
    setIsSolutionDetailOpen,
    selectedWorkflowTemplateId,
    setSelectedWorkflowTemplateId,
    isWorkflowDetailOpen,
    setIsWorkflowDetailOpen,
    setGoalPlannerInitialGoal,
    setIsGoalPlannerOpen,
    startWorkflowFromTemplate,
    openWorkflowSetup,
    openBusinessSolutionSetup,
    setWorkTab,
    isIntegrationConnectModalOpen,
    setIsIntegrationConnectModalOpen,
    connectingProvider,
    isIntegrationDetailOpen,
    setIsIntegrationDetailOpen,
    selectedIntegrationDetailId,
    isWorkflowBuilderOpen,
    setIsWorkflowBuilderOpen,
    duplicateWorkflowTemplate,
    openWorkflowBuilder
  } = useOoumph();

  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  const selectedEmployee = selectedEmployeeId
    ? employees.find((e) => e.id === selectedEmployeeId)
    : null;

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Desktop Navigation */}
      <TopBar />

      {/* Main View Area (with bottom padding on mobile for the bottom bar) */}
      <main className="flex-1 pb-16 md:pb-0">
        {selectedEmployee ? (
          <EmployeeWorkspace employee={selectedEmployee} />
        ) : (
          <>
            {currentView === 'team' && <TeamHomeView />}
            {currentView === 'work' && <MyWorkView />}
            {currentView === 'inbox' && <InboxView />}
            {currentView === 'sales' && <SalesView />}
            {currentView === 'business' && <MyBusinessView />}
            {currentView === 'settings' && <SettingsView />}
          </>
        )}
      </main>

      {/* Discrete Bottom Demo Status Footer (hidden on mobile to make room for bottom nav) */}
      <footer className="hidden md:flex border-t border-slate-200 bg-white px-6 py-2.5 text-xs text-slate-500 items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">Ooumph</span>
          <span>·</span>
          <span>Workspace: <strong className="text-slate-900">{activeWorkspace.name}</strong></span>
          <span>·</span>
          <span className="capitalize">{demoMode} Demo Mode</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFlagshipSimulatorOpen(true)}
            className="text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span>Test Flagship Guide Loop</span>
          </button>
          <span>·</span>
          <button
            onClick={() => setIsDemoToolsOpen(true)}
            className="text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span>Demo Tools</span>
          </button>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR (md:hidden) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xs border-t border-slate-200 md:hidden flex items-center justify-around py-1.5 px-2">
        <button
          onClick={() => {
            navigate('team', null);
            setIsMobileMoreOpen(false);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentView === 'team' && !selectedEmployee
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="h-4 w-4 mb-0.5" />
          <span>Team</span>
        </button>

        <button
          onClick={() => {
            navigate('work', null);
            setIsMobileMoreOpen(false);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentView === 'work'
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="h-4 w-4 mb-0.5" />
          <span>Work</span>
        </button>

        <button
          onClick={() => {
            navigate('inbox', null);
            setIsMobileMoreOpen(false);
          }}
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentView === 'inbox'
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Inbox className="h-4 w-4 mb-0.5" />
          <span>Inbox</span>
          {pendingApprovalsCount > 0 && (
            <span className="absolute top-0.5 right-2 h-4 w-4 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center">
              {pendingApprovalsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            navigate('sales', null);
            setIsMobileMoreOpen(false);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentView === 'sales'
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="h-4 w-4 mb-0.5" />
          <span>Sales</span>
        </button>

        <button
          onClick={() => setIsMobileMoreOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentView === 'business' || currentView === 'settings' || isMobileMoreOpen
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MoreHorizontal className="h-4 w-4 mb-0.5" />
          <span>More</span>
        </button>
      </nav>

      {/* MOBILE MORE SHEET / MODAL */}
      {isMobileMoreOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/40 backdrop-blur-xs md:hidden animate-fade-in">
          <div className="bg-white rounded-t-2xl p-5 border-t border-slate-200 space-y-4 animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="font-bold text-sm text-slate-900">Workspace & Controls</div>
              <button
                onClick={() => setIsMobileMoreOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Workspace Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Current Client Workspace
              </label>
              <select
                value={activeWorkspace.id}
                onChange={(e) => {
                  switchWorkspace(e.target.value);
                  setIsMobileMoreOpen(false);
                }}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-medium text-slate-800"
              >
                {allWorkspaces.map((ws) => (
                  <option key={ws.id} value={ws.id}>{ws.name}</option>
                ))}
              </select>
            </div>

            {/* Navigation links */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  navigate('business');
                  setIsMobileMoreOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-left text-xs font-semibold text-slate-900"
              >
                <Building2 className="h-4 w-4 text-slate-600" />
                <div>
                  <div>My Business Knowledge</div>
                  <div className="text-[11px] text-slate-500 font-normal">Brand tone, offers, claims & FAQ library</div>
                </div>
              </button>

              <button
                onClick={() => {
                  navigate('settings');
                  setIsMobileMoreOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-left text-xs font-semibold text-slate-900"
              >
                <SettingsIcon className="h-4 w-4 text-slate-600" />
                <div>
                  <div>Workspace Settings</div>
                  <div className="text-[11px] text-slate-500 font-normal">Integrations, autonomy rules & team seats</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsFlagshipSimulatorOpen(true);
                  setIsMobileMoreOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-50 text-left text-xs font-semibold text-teal-900"
              >
                <Sparkles className="h-4 w-4 text-teal-600" />
                <div>
                  <div>Test Flagship Guide Loop</div>
                  <div className="text-[11px] text-teal-700 font-normal">Simulate comment trigger & PDF delivery</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsDemoToolsOpen(true);
                  setIsMobileMoreOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-left text-xs font-semibold text-slate-800"
              >
                <SlidersHorizontal className="h-4 w-4 text-slate-600" />
                <div>
                  <div>Demo Tools & Scenarios</div>
                  <div className="text-[11px] text-slate-500 font-normal">Fast forward days, seed modes & reset</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <FlagshipGuideSimulatorModal />
      <OnboardingModal />
      <DemoToolsDrawer />
      <GoalPlannerModal />
      <ProductGuideModal />
      <EmployeeChooserModal />

      {/* Customer-Facing Experience Modals */}
      <CustomerBookingModal
        isOpen={isCustomerBookingOpen}
        onClose={() => setIsCustomerBookingOpen(false)}
      />
      <CustomerProposalModal
        isOpen={isCustomerProposalOpen}
        onClose={() => setIsCustomerProposalOpen(false)}
      />
      <CustomerPreferenceCenterModal
        isOpen={isCustomerPreferenceCenterOpen}
        onClose={() => setIsCustomerPreferenceCenterOpen(false)}
      />
      <CustomerCheckoutModal
        isOpen={isCustomerCheckoutOpen}
        onClose={() => setIsCustomerCheckoutOpen(false)}
      />

      {/* Business Solutions & Workflow Detail Modals */}
      <BusinessSolutionDetailModal
        isOpen={isSolutionDetailOpen}
        onClose={() => setIsSolutionDetailOpen(false)}
        solution={businessSolutions.find((s) => s.id === selectedSolutionId) || null}
        employees={employees}
        workflowTemplates={workflowTemplates}
        onPlanSolution={(sol) => {
          setGoalPlannerInitialGoal(`${sol.title} — ${sol.shortPromise}`);
          setIsGoalPlannerOpen(true);
        }}
        onLaunchSolution={(solId) => {
          openBusinessSolutionSetup(solId);
        }}
        onSelectWorkflow={(wfId) => {
          setSelectedWorkflowTemplateId(wfId);
          setIsWorkflowDetailOpen(true);
        }}
      />
      <WorkflowDetailModal
        isOpen={isWorkflowDetailOpen}
        onClose={() => setIsWorkflowDetailOpen(false)}
        workflow={workflowTemplates.find((w) => w.id === selectedWorkflowTemplateId) || null}
        employees={employees}
        allWorkflows={workflowTemplates}
        onUseWorkflow={(wfId) => {
          openWorkflowSetup(wfId);
        }}
        onPreviewSampleData={(wf) => {
          // Keep preview smooth and focused
        }}
        onSelectRecommendedWorkflow={(wfId) => {
          setSelectedWorkflowTemplateId(wfId);
        }}
        onDuplicate={(wf) => {
          duplicateWorkflowTemplate(wf.id);
        }}
        onEdit={(wf) => {
          openWorkflowBuilder(wf);
        }}
      />

      {/* Generic Workflow & Solution Setup Wizard (Phase 2B.2) */}
      <WorkflowSetupWizardModal />

      {/* Project Teammate Collaboration Modal (Phase 2B.2) */}
      <AddTeammateModal />

      {/* Integration Connection & Diagnostics Modals */}
      <IntegrationConnectModal
        isOpen={isIntegrationConnectModalOpen}
        onClose={() => setIsIntegrationConnectModalOpen(false)}
        initialProvider={connectingProvider}
      />
      <IntegrationDetailModal
        isOpen={isIntegrationDetailOpen}
        onClose={() => setIsIntegrationDetailOpen(false)}
        connectionId={selectedIntegrationDetailId}
      />

      {/* Custom Multi-Agent Workflow Builder */}
      <WorkflowBuilderModal />

      {/* Assignment Composer Modal (Phase 2C.2B) */}
      <AssignmentComposerModal />

      {/* Project Settings & Lifecycle Modal (Phase 2C.2B) */}
      <ProjectSettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <OoumphProvider>
      <AppContent />
    </OoumphProvider>
  );
}
