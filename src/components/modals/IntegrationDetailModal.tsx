import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { IntegrationConnection, IntegrationApiLog } from '../../types';
import { PROVIDER_CATALOG, ProviderCatalogItem, EMPLOYEE_INTEGRATION_MAP } from '../../data/integrationDirectory';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Activity,
  Shield,
  Trash2,
  ExternalLink,
  Users,
  Clock,
  Terminal,
  Zap,
  Check,
  Pause,
  Sliders,
  Info
} from 'lucide-react';

interface IntegrationDetailModalProps {
  connectionId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationDetailModal: React.FC<IntegrationDetailModalProps> = ({
  connectionId,
  isOpen,
  onClose
}) => {
  const {
    integrationConnections,
    updateIntegrationStatus,
    reconnectIntegration,
    disconnectIntegration,
    employees,
    selectEmployee,
    navigate
  } = useOoumph();

  const [activeTab, setActiveTab] = useState<'overview' | 'diagnostics'>('overview');
  const [isPinging, setIsPinging] = useState(false);
  const [localLatency, setLocalLatency] = useState<number | null>(null);
  const [simulatedLogItems, setSimulatedLogItems] = useState<IntegrationApiLog[]>([]);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  if (!isOpen || !connectionId) return null;

  const connection = integrationConnections.find((c) => c.id === connectionId);
  if (!connection) return null;

  const providerMeta: ProviderCatalogItem =
    PROVIDER_CATALOG.find((p) => p.provider === connection.provider) || PROVIDER_CATALOG[0];

  const associatedEmployees = employees.filter((e) =>
    providerMeta.associatedEmployeeCodes.includes(e.code)
  );

  const allLogs: IntegrationApiLog[] = [
    ...(simulatedLogItems),
    ...(connection.auditLogs || [])
  ];

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      const newLatency = Math.floor(Math.random() * 25) + 20;
      setLocalLatency(newLatency);
      setIsPinging(false);
    }, 600);
  };

  const handleSimulateApiCall = () => {
    const caller = associatedEmployees[0] || employees[0];
    const newLog: IntegrationApiLog = {
      id: `log-sim-${Date.now()}`,
      timestamp: new Date().toISOString(),
      method: 'POST',
      endpoint: `/v21.0/channel/sync`,
      statusCode: 200,
      callerEmployeeCode: caller ? caller.code : 'A01',
      callerName: caller ? caller.name : 'System',
      summary: `Sample demo payload synchronized for ${connection.accountName}.`
    };
    setSimulatedLogItems([newLog, ...simulatedLogItems]);
  };

  const handleSimulateIssue = () => {
    updateIntegrationStatus(connection.id, 'needs_attention', [
      'Simulated OAuth token refresh warning (test trigger). Needs re-authorization.'
    ]);
  };

  const handleJumpToEmployee = (employeeId: string) => {
    onClose();
    selectEmployee(employeeId);
    navigate('team', employeeId);
  };

  const isNeedsAttention = connection.status === 'needs_attention';
  const isDisconnected = connection.status === 'disconnected';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Customer-Facing Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {providerMeta.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{connection.accountName}</h2>
                {connection.status === 'connected' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Connected</span>
                  </span>
                )}
                {isNeedsAttention && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Action Required</span>
                  </span>
                )}
                {isDisconnected && (
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    Disconnected
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {connection.accountHandle || providerMeta.defaultHandle} · {providerMeta.category}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher: Primary vs Advanced Diagnostics */}
        <div className="px-6 py-2 bg-white border-b border-slate-100 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Channel Overview
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'diagnostics'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Advanced Diagnostics (Demo)</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: CUSTOMER-FACING OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-fade-in text-xs">
              {/* Needs Attention Warning */}
              {isNeedsAttention && (
                <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/70 text-amber-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span>Re-authorization Required</span>
                    </div>
                    <button
                      onClick={() => reconnectIntegration(connection.id)}
                      className="px-2.5 py-1 rounded bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Re-authorize Channel
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    {connection.permissionIssues?.[0] || 'Simulated OAuth token refresh warning. Outbound actions from this channel are temporarily paused.'}
                  </p>
                </div>
              )}

              {/* Account Overview Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider">Account Identifier</span>
                  <span className="font-bold text-slate-900 font-mono">{connection.accountHandle || providerMeta.defaultHandle}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider">Last Activity Sync</span>
                  <span className="text-slate-700">
                    {connection.lastSyncAt
                      ? new Date(connection.lastSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'Just now'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider">Connection State</span>
                  <span className="text-teal-700 font-bold capitalize">{connection.status.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Authorized Capabilities */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Authorized Capabilities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {connection.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-xs flex items-center gap-1.5 border border-slate-200/60"
                    >
                      <Check className="h-3 w-3 text-teal-600" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Employees Leveraging This Channel */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Assigned AI Specialists ({associatedEmployees.length})
                  </span>
                  <span className="text-[10px] text-slate-400">Can utilize this channel</span>
                </div>

                <div className="space-y-2">
                  {associatedEmployees.map((emp) => {
                    const mapping = EMPLOYEE_INTEGRATION_MAP[emp.code];
                    return (
                      <div
                        key={emp.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${emp.avatarColor}`}
                          >
                            {emp.avatarInitials}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900">{emp.name}</span>
                              <span className="text-[10px] text-slate-500 border border-slate-200 px-1 rounded font-semibold">
                                {emp.code}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">{emp.title}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleJumpToEmployee(emp.id)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                        >
                          <span>Workspace</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety Disclaimers */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-xs space-y-1">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-teal-700" />
                  <span>Security & Isolation Boundaries</span>
                </span>
                <p className="text-[11px] leading-relaxed">
                  {providerMeta.securityNote}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ADVANCED DIAGNOSTICS (SIMULATED) */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-4 animate-fade-in text-xs">
              {/* Honest Demo Diagnostic Disclaimer */}
              <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/70 text-indigo-950 flex items-start gap-2.5">
                <Info className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs">Demo Diagnostic Notice</span>
                  <p className="text-[11px] text-indigo-800 leading-relaxed">
                    Test pings, token expiry, and API activity are generated locally for this interactive browser prototype. No live third-party network traffic is dispatched.
                  </p>
                </div>
              </div>

              {/* Simulated KPI Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Simulated Latency
                  </span>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    {localLatency ?? connection.pingLatencyMs ?? 32} ms
                  </div>
                  <span className="text-[10px] text-teal-700 font-medium">Demo test ping</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Demo Daily Quota
                  </span>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    {connection.apiQuotaPercent ?? 92}%
                  </div>
                  <span className="text-[10px] text-slate-500">Simulated cap</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Token Window
                  </span>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    {connection.tokenExpiresInDays ?? 60} days
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">Simulated renewal</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Mock Protocol
                  </span>
                  <div className="text-base font-bold text-slate-900 truncate">
                    {providerMeta.apiVersion}
                  </div>
                  <span className="text-[10px] text-slate-500">{providerMeta.apiProtocol}</span>
                </div>
              </div>

              {/* Simulated Handshake Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTestPing}
                    disabled={isPinging}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`h-3 w-3 ${isPinging ? 'animate-spin' : ''}`} />
                    <span>{isPinging ? 'Testing...' : 'Run Test Handshake Ping (Demo)'}</span>
                  </button>

                  <button
                    onClick={handleSimulateApiCall}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Zap className="h-3 w-3 text-amber-500" />
                    <span>Inject Sample Event</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {!isNeedsAttention && !isDisconnected && (
                    <button
                      onClick={handleSimulateIssue}
                      className="text-[11px] text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                      title="Trigger simulated token expiration"
                    >
                      Simulate Token Warning
                    </button>
                  )}
                </div>
              </div>

              {/* Simulated Audit Trail */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Demo API Activity / Simulated Audit Trail ({allLogs.length})
                  </span>
                  <span className="text-[10px] text-slate-400">Sample event payloads</span>
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 max-h-56 overflow-y-auto">
                  {allLogs.length === 0 ? (
                    <div className="p-4 text-center text-slate-400">No events logged yet.</div>
                  ) : (
                    allLogs.map((log) => (
                      <div key={log.id} className="p-2.5 bg-white space-y-0.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-1.5 py-0.2 rounded font-mono font-bold text-[9px] ${
                                log.method === 'GET'
                                  ? 'bg-sky-100 text-sky-800'
                                  : log.method === 'POST'
                                  ? 'bg-teal-100 text-teal-800'
                                  : log.method === 'WEBHOOK'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {log.method}
                            </span>
                            <span className="font-mono text-[10px] text-slate-800">{log.endpoint}</span>
                            <span className="text-[10px] font-bold text-teal-700">({log.statusCode})</span>
                          </div>
                          <span className="text-[9px] text-slate-400">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{log.summary}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
          <div>
            {!confirmDisconnect ? (
              <button
                type="button"
                onClick={() => setConfirmDisconnect(true)}
                className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
              >
                Disconnect Channel
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-rose-800 font-medium">Confirm disconnection?</span>
                <button
                  type="button"
                  onClick={() => {
                    disconnectIntegration(connection.id);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDisconnect(false)}
                  className="text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
