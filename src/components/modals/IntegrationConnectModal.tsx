import React, { useState, useEffect } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { IntegrationProvider } from '../../types';
import { PROVIDER_CATALOG, ProviderCatalogItem } from '../../data/integrationDirectory';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Shield,
  Activity,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  Plug,
  Check,
  Building2,
  RefreshCw
} from 'lucide-react';

interface IntegrationConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProvider?: IntegrationProvider | null;
}

export const IntegrationConnectModal: React.FC<IntegrationConnectModalProps> = ({
  isOpen,
  onClose,
  initialProvider
}) => {
  const {
    activeWorkspace,
    employees,
    connectIntegration,
    integrationConnections
  } = useOoumph();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedProvider, setSelectedProvider] = useState<IntegrationProvider>(
    initialProvider || 'meta_business'
  );
  const [accountName, setAccountName] = useState('');
  const [accountHandle, setAccountHandle] = useState('');
  const [accountType, setAccountType] = useState('');
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [pingLatency, setPingLatency] = useState<number>(34);

  // Sync when initialProvider changes
  useEffect(() => {
    if (initialProvider) {
      setSelectedProvider(initialProvider);
    }
  }, [initialProvider]);

  const providerMeta: ProviderCatalogItem =
    PROVIDER_CATALOG.find((p) => p.provider === selectedProvider) || PROVIDER_CATALOG[0];

  // Set default values when selected provider changes
  useEffect(() => {
    if (providerMeta) {
      setAccountName(`${activeWorkspace.name} (${providerMeta.name})`);
      setAccountHandle(providerMeta.defaultHandle);
      setAccountType(providerMeta.description);
    }
  }, [selectedProvider, activeWorkspace.name]);

  if (!isOpen) return null;

  const existingConnection = integrationConnections.find(
    (c) => c.workspaceId === activeWorkspace.id && c.provider === selectedProvider
  );

  const associatedEmployees = employees.filter((e) =>
    providerMeta.associatedEmployeeCodes.includes(e.code)
  );

  const handleRunPingTest = () => {
    setPingStatus('testing');
    setTimeout(() => {
      const simulatedLatency = Math.floor(Math.random() * 30) + 20; // 20-50ms
      setPingLatency(simulatedLatency);
      setPingStatus('success');
    }, 700);
  };

  const handleCompleteConnection = () => {
    connectIntegration({
      provider: selectedProvider,
      accountName: accountName.trim() || providerMeta.name,
      accountHandle: accountHandle.trim() || providerMeta.defaultHandle,
      accountType: accountType.trim() || providerMeta.description,
      capabilities: providerMeta.defaultCapabilities
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Plug className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Connect Channel Integration</h2>
              <p className="text-xs text-slate-500">
                Authorizing secure connection for {activeWorkspace.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stepper Header */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between text-xs">
          {[
            { step: 1, label: '1. Select & ID' },
            { step: 2, label: '2. Scopes & Safety' },
            { step: 3, label: '3. Test Ping' },
            { step: 4, label: '4. AI Activation' }
          ].map((item) => (
            <div
              key={item.step}
              className={`flex items-center gap-1.5 font-medium ${
                currentStep === item.step
                  ? 'text-slate-900 font-bold'
                  : currentStep > item.step
                  ? 'text-teal-700'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === item.step
                    ? 'bg-slate-900 text-white'
                    : currentStep > item.step
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {currentStep > item.step ? '✓' : item.step}
              </div>
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Body Content by Step */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* STEP 1: Select & Account Identifier */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Choose Channel to Authorize
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
                  {PROVIDER_CATALOG.map((item) => {
                    const isSelected = selectedProvider === item.provider;
                    const isAlreadyConnected = integrationConnections.some(
                      (c) => c.workspaceId === activeWorkspace.id && c.provider === item.provider && c.status === 'connected'
                    );

                    return (
                      <button
                        key={item.provider}
                        type="button"
                        onClick={() => setSelectedProvider(item.provider)}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-white shadow-2xs ring-1 ring-slate-900'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">{item.name}</span>
                          {isAlreadyConnected && (
                            <span className="text-[10px] text-teal-700 bg-teal-50 px-1 py-0.2 rounded font-semibold">
                              Connected
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Display Account Name
                  </label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="e.g. Cedar & Co Production Account"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Handle / Resource URL / CID
                  </label>
                  <input
                    type="text"
                    value={accountHandle}
                    onChange={(e) => setAccountHandle(e.target.value)}
                    placeholder={providerMeta.defaultHandle}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <Building2 className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Scoping Rule: </span>
                  This credential will be isolated to the active workspace{' '}
                  <span className="font-semibold text-slate-900">{activeWorkspace.name}</span>. Other client workspaces will not access this channel.
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Scopes & Safety Guardrails */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{providerMeta.name}</h3>
                  <span className="text-[11px] text-slate-500">
                    Protocol: {providerMeta.apiProtocol} ({providerMeta.apiVersion})
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Sandboxed Token
                </span>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1.5 uppercase text-[10px] tracking-wider">
                  Granted API Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {providerMeta.defaultCapabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                      <span className="text-slate-800 font-medium">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1.5 uppercase text-[10px] tracking-wider">
                  OAuth Scopes Requested
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {providerMeta.requiredScopes.map((scope, idx) => (
                    <code
                      key={idx}
                      className="px-2 py-1 rounded bg-slate-100 text-[11px] text-slate-700 font-mono border border-slate-200"
                    >
                      {scope}
                    </code>
                  ))}
                </div>
              </div>

              {/* Safety Disclaimers */}
              <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-900 font-bold">
                  <Shield className="h-4 w-4 text-teal-700" />
                  <span>Founder Protection & Autonomy Guardrail</span>
                </div>
                <p className="text-teal-950 text-xs leading-relaxed">
                  {providerMeta.securityNote}
                </p>
                <p className="text-[11px] text-teal-800">
                  Zero sensitive customer data or banking keys are exposed. You can pause or revoke this token anytime in Settings.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Test Ping & Latency */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Channel Connectivity Test</h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Verifying handshake ping against simulated {providerMeta.apiProtocol} endpoint.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4 text-center">
                <div className="flex justify-center">
                  <div
                    className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all ${
                      pingStatus === 'success'
                        ? 'bg-teal-600 text-white shadow-md'
                        : pingStatus === 'testing'
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {pingStatus === 'testing' ? (
                      <RefreshCw className="h-7 w-7 animate-spin" />
                    ) : pingStatus === 'success' ? (
                      <Check className="h-7 w-7" />
                    ) : (
                      <Activity className="h-7 w-7" />
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {pingStatus === 'idle' && 'Ready to Run Diagnostic Ping'}
                    {pingStatus === 'testing' && 'Sending Handshake Request...'}
                    {pingStatus === 'success' && 'Handshake Successful (200 OK)'}
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    {pingStatus === 'idle' &&
                      'Click the button below to test endpoint latency and verify OAuth token readiness.'}
                    {pingStatus === 'testing' && `Negotiating TLS handshake with ${providerMeta.apiProtocol}...`}
                    {pingStatus === 'success' &&
                      `Round-trip latency: ${pingLatency}ms. API version ${providerMeta.apiVersion} confirmed.`}
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleRunPingTest}
                    disabled={pingStatus === 'testing'}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-2xs cursor-pointer"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${pingStatus === 'testing' ? 'animate-spin' : ''}`} />
                    <span>{pingStatus === 'success' ? 'Re-run Test Ping' : 'Run Test Ping'}</span>
                  </button>
                </div>
              </div>

              {pingStatus === 'success' && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Latency</span>
                    <span className="text-sm font-bold text-teal-700 tabular-nums">{pingLatency} ms</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Protocol</span>
                    <span className="text-xs font-bold text-slate-800 truncate">{providerMeta.apiVersion}</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Token State</span>
                    <span className="text-xs font-bold text-emerald-700">Valid</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Associated AI Employee Activation */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Empowered AI Specialists</h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Connecting {providerMeta.name} will grant autonomous and assisted capabilities to these team members:
                  </p>
                </div>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {associatedEmployees.length} Specialists
                </span>
              </div>

              <div className="space-y-2.5">
                {associatedEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${emp.avatarColor}`}
                      >
                        {emp.avatarInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">{emp.name}</span>
                          <span className="text-[10px] text-slate-500 border border-slate-200 px-1 rounded">
                            {emp.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{emp.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Ready to Deploy</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">Next Steps:</span>
                <p>
                  Once authorized, you can delegate tasks to these specialists or launch multi-agent workflows that rely on this channel.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteConnection}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-xs font-semibold text-white transition-colors shadow-2xs cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Authorize & Activate Channel</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
