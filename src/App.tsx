import React from 'react';
import { OoumphProvider, useOoumph } from './store/ooumphStore';
import { TopBar } from './components/navigation/TopBar';
import { TeamHomeView } from './components/views/TeamHomeView';
import { MyWorkView } from './components/views/MyWorkView';
import { InboxView } from './components/views/InboxView';
import { MyBusinessView } from './components/views/MyBusinessView';
import { EmployeeWorkspace } from './components/employee/EmployeeWorkspace';
import { FlagshipGuideSimulatorModal } from './components/modals/FlagshipGuideSimulatorModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { DemoToolsDrawer } from './components/modals/DemoToolsDrawer';
import { CustomerBookingModal } from './components/modals/customer/CustomerBookingModal';
import { CustomerProposalModal } from './components/modals/customer/CustomerProposalModal';
import { CustomerPreferenceCenterModal } from './components/modals/customer/CustomerPreferenceCenterModal';
import { CustomerCheckoutModal } from './components/modals/customer/CustomerCheckoutModal';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    selectedEmployeeId,
    employees,
    activeWorkspace,
    demoMode,
    setIsDemoToolsOpen,
    setIsFlagshipSimulatorOpen,
    isCustomerBookingOpen,
    setIsCustomerBookingOpen,
    isCustomerProposalOpen,
    setIsCustomerProposalOpen,
    isCustomerPreferenceCenterOpen,
    setIsCustomerPreferenceCenterOpen,
    isCustomerCheckoutOpen,
    setIsCustomerCheckoutOpen
  } = useOoumph();

  const selectedEmployee = selectedEmployeeId
    ? employees.find((e) => e.id === selectedEmployeeId)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Navigation */}
      <TopBar />

      {/* Main View Area */}
      <main className="flex-1">
        {selectedEmployee ? (
          <EmployeeWorkspace employee={selectedEmployee} />
        ) : (
          <>
            {currentView === 'team' && <TeamHomeView />}
            {currentView === 'work' && <MyWorkView />}
            {currentView === 'inbox' && <InboxView />}
            {currentView === 'business' && <MyBusinessView />}
          </>
        )}
      </main>

      {/* Discrete Bottom Demo Status Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-2.5 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
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
            className="text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Test Flagship Guide Loop</span>
          </button>
          <span>·</span>
          <button
            onClick={() => setIsDemoToolsOpen(true)}
            className="text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span>Demo Tools</span>
          </button>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <FlagshipGuideSimulatorModal />
      <OnboardingModal />
      <DemoToolsDrawer />

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
