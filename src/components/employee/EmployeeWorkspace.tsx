import React, { useState } from 'react';
import { Employee } from '../../types';
import { useOoumph } from '../../store/ooumphStore';
import { RoleArtifactViewer } from './RoleArtifactViewer';
import {
  Send,
  Pin,
  Lock,
  Unlock,
  Sparkles,
  ArrowLeft,
  MessageSquare,
  FileCode2,
  CheckCircle2,
  RotateCcw,
  Plug,
  AlertTriangle,
  ExternalLink,
  Layers,
  ArrowRight,
  Clock,
  ShieldCheck,
  Check,
  Plus
} from 'lucide-react';
import { EMPLOYEE_INTEGRATION_MAP, PROVIDER_CATALOG } from '../../data/integrationDirectory';

interface EmployeeWorkspaceProps {
  employee: Employee;
}

export const EmployeeWorkspace: React.FC<EmployeeWorkspaceProps> = ({ employee }) => {
  const {
    selectEmployee,
    conversations,
    sendMessage,
    toggleTakeover,
    togglePinEmployee,
    activeWorkspace,
    integrationConnections,
    openIntegrationDetail,
    openConnectIntegration,
    projects,
    tasks,
    workflowRuns,
    activeEmployeeProjectContext,
    setSelectedProjectId,
    setWorkTab,
    navigate,
    openAssignmentComposer
  } = useOoumph();

  // Find all projects in this workspace where this employee participates
  const participatingProjects = projects.filter(
    (p) => p.workspaceId === activeWorkspace.id && p.participatingEmployeeIds.includes(employee.id)
  );

  // Active project context (default to context from navigation if available, else first participating project)
  const [selectedProjectId, setLocalSelectedProjectId] = useState<string | null>(
    activeEmployeeProjectContext?.projectId || (participatingProjects[0]?.id || null)
  );

  const activeProject = selectedProjectId ? projects.find((p) => p.id === selectedProjectId) : null;
  const activeRun = activeProject ? workflowRuns.find((r) => r.id === activeProject.workflowRunId) : null;
  const currentStep = activeRun?.steps.find((s) => s.employeeCode === employee.code);
  const activeTask = tasks.find(
    (t) => t.projectId === selectedProjectId && (t.employeeId === employee.id || t.employeeCode === employee.code) && t.status !== 'completed'
  ) || tasks.find(
    (t) => t.projectId === selectedProjectId && (t.employeeId === employee.id || t.employeeCode === employee.code)
  );

  // Scoped conversation key
  const convKey = selectedProjectId ? `${employee.id}__proj_${selectedProjectId}` : employee.id;
  const conversation = conversations[convKey] || conversations[employee.id] || {
    id: `conv-${convKey}`,
    workspaceId: activeWorkspace.id,
    employeeId: employee.id,
    projectId: selectedProjectId || undefined,
    messages: [],
    takeover: false
  };

  const [inputMessage, setInputMessage] = useState('');
  const [mobileTab, setMobileTab] = useState<'chat' | 'work'>('chat');

  // Integration channel for this employee
  const integrationMapping = EMPLOYEE_INTEGRATION_MAP[employee.code];
  const primaryProvider = integrationMapping?.primaryProvider;
  const connection = primaryProvider
    ? integrationConnections.find((c) => c.workspaceId === activeWorkspace.id && c.provider === primaryProvider)
    : null;
  const providerCatalogItem = primaryProvider
    ? PROVIDER_CATALOG.find((p) => p.provider === primaryProvider)
    : null;

  const isChannelIssue = connection && (connection.status === 'needs_attention' || connection.status === 'disconnected');
  const isChannelMissing = primaryProvider && !connection;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(employee.id, inputMessage, selectedProjectId);
    setInputMessage('');
  };

  const handleStarterPrompt = (prompt: string) => {
    sendMessage(employee.id, prompt, selectedProjectId);
  };

  const handleGoToProject = () => {
    if (activeProject) {
      setSelectedProjectId(activeProject.id);
      setWorkTab('projects');
      navigate('work');
    }
  };

  return (
    <div className="flex h-[calc(100vh-61px)] flex-col bg-white overflow-hidden">
      {/* Workspace Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => selectEmployee(null)}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            title="Back to Team"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-white font-bold text-xs ${employee.avatarColor}`}>
              {employee.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-slate-900">{employee.name}</h1>
                <span className="text-[11px] font-semibold text-slate-500 border border-slate-200 px-1.5 py-0.2 rounded">
                  {employee.code}
                </span>
                {employee.pinned && (
                  <Pin className="h-3 w-3 fill-amber-500 text-amber-500" />
                )}

                {/* Channel Integration Pill */}
                {connection && connection.status === 'connected' && (
                  <button
                    onClick={() => openIntegrationDetail(connection.id)}
                    className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 hover:bg-teal-100 transition-colors cursor-pointer"
                    title={`Channel Connected: ${connection.accountName}. Click for diagnostics.`}
                  >
                    <Plug className="h-2.5 w-2.5 text-teal-600" />
                    <span>{connection.accountHandle || connection.accountName}</span>
                  </button>
                )}
                {isChannelIssue && connection && (
                  <button
                    onClick={() => openIntegrationDetail(connection.id)}
                    className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
                    title="Channel requires attention. Click to resolve."
                  >
                    <AlertTriangle className="h-2.5 w-2.5 text-amber-600" />
                    <span>Channel Attention Required</span>
                  </button>
                )}
                {isChannelMissing && primaryProvider && (
                  <button
                    onClick={() => openConnectIntegration(primaryProvider)}
                    className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Click to connect channel."
                  >
                    <Plug className="h-2.5 w-2.5 text-slate-500" />
                    <span>Connect {providerCatalogItem?.name || 'Channel'}</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500">{employee.title} · {employee.category}</p>
            </div>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Assign Task or Routine */}
          <button
            type="button"
            onClick={() => openAssignmentComposer(employee.id, undefined, selectedProjectId)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            title={`Assign task or recurring routine to ${employee.name}`}
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Assign</span>
          </button>

          {/* Thread / Project Context Selector (Requirement K) */}
          {participatingProjects.length > 0 && (
            <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                Context:
              </span>
              <select
                value={selectedProjectId || ''}
                onChange={(e) => setLocalSelectedProjectId(e.target.value || null)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-semibold focus:outline-hidden cursor-pointer"
              >
                {participatingProjects.map((p) => (
                  <option key={p.id} value={p.id}>
                    Project: {p.title}
                  </option>
                ))}
                <option value="">General Workspace Chat</option>
              </select>
            </div>
          )}

          {/* Mobile Chat vs Work Segmented Switcher */}
          <div className="flex md:hidden rounded-lg bg-slate-100 p-0.5">
            <button
              onClick={() => setMobileTab('chat')}
              className={`px-2.5 py-1 text-xs font-medium rounded ${
                mobileTab === 'chat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setMobileTab('work')}
              className={`px-2.5 py-1 text-xs font-medium rounded ${
                mobileTab === 'work' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Work
            </button>
          </div>

          {/* Pin Employee Toggle */}
          <button
            onClick={() => togglePinEmployee(employee.id)}
            className={`p-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              employee.pinned
                ? 'border-amber-300 bg-amber-50 text-amber-800'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title={employee.pinned ? 'Unpin from Core Team' : 'Pin to Core Team'}
          >
            <Pin className="h-3.5 w-3.5" />
          </button>

          {/* Human Takeover Toggle */}
          <button
            onClick={() => toggleTakeover(employee.id, selectedProjectId)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
              conversation.takeover
                ? 'border-rose-300 bg-rose-50 text-rose-800'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
            title="Take manual control. Automatically stops automated bot responses until released."
          >
            {conversation.takeover ? <Lock className="h-3.5 w-3.5 text-rose-600" /> : <Unlock className="h-3.5 w-3.5 text-slate-500" />}
            <span>{conversation.takeover ? 'Takeover Active' : 'Human Takeover'}</span>
          </button>
        </div>
      </div>

      {/* COMPACT PROJECT CONTEXT BANNER (Requirement K) */}
      {activeProject && (
        <div className="px-6 py-2.5 bg-linear-to-r from-indigo-50/80 via-white to-teal-50/50 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 font-bold text-indigo-950">
              <Layers className="h-4 w-4 text-indigo-700 shrink-0" />
              <span>Working on:</span>
              <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-xs">
                {activeProject.title}
              </span>
            </div>

            <span className="text-slate-300 hidden sm:inline">|</span>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-500">Stage:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[180px]">
                {currentStep?.title || activeTask?.title || 'Execution Stage'}
              </span>
              {currentStep && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white border border-indigo-200 text-indigo-800">
                  {currentStep.status.replace('_', ' ').toUpperCase()}
                </span>
              )}
            </div>

            {currentStep?.expectedOutput && (
              <>
                <span className="text-slate-300 hidden md:inline">|</span>
                <div className="hidden md:flex items-center gap-1.5 text-teal-800 font-medium">
                  <span className="text-slate-400">Target Output:</span>
                  <span className="font-bold truncate max-w-[160px]">{currentStep.expectedOutput}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleGoToProject}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-900 hover:bg-indigo-950 text-white font-semibold text-[11px] transition-colors cursor-pointer shadow-2xs"
            >
              <span>View in Project Flow</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Contextual Channel Warning Banner */}
      {isChannelIssue && connection && (
        <div className="px-6 py-2 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0" />
            <span>
              <strong>Channel Notice:</strong> {connection.accountName} is currently {connection.status.replace('_', ' ')}. Automated external publishing and dispatches for {employee.name} may require re-authorization.
            </span>
          </div>
          <button
            onClick={() => openIntegrationDetail(connection.id)}
            className="px-2.5 py-1 rounded bg-amber-800 hover:bg-amber-900 text-white font-semibold text-[11px] transition-colors shrink-0 cursor-pointer"
          >
            Open Diagnostics
          </button>
        </div>
      )}

      {/* Main Split Body: Conversation (left) and Editable Work (right) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Chat Conversation */}
        <div
          className={`w-full md:w-5/12 lg:w-4/12 border-r border-slate-200 flex flex-col bg-white ${
            mobileTab === 'chat' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Starter Prompts Banner */}
          {conversation.messages.length <= 2 && employee.starterPrompts.length > 0 && (
            <div className="p-3.5 border-b border-slate-100 bg-slate-50/70">
              <div className="text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-indigo-600" />
                Recommended Starter Tasks:
              </div>
              <div className="space-y-1">
                {employee.starterPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleStarterPrompt(prompt)}
                    className="w-full text-left text-xs text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 p-1.5 rounded transition-colors line-clamp-1 border border-slate-200/50 bg-white"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {conversation.messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900 border border-amber-200 text-center">
                    {msg.text}
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-900 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 px-1 tabular-nums">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  conversation.takeover
                    ? 'Typing as operator (Automations paused)...'
                    : `Ask ${employee.name} to write, analyze, or adjust work...`
                }
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-hidden"
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Job-Specific Editable Workspace Artifact */}
        <div
          className={`flex-1 flex flex-col overflow-hidden bg-slate-50/50 ${
            mobileTab === 'work' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <RoleArtifactViewer employee={employee} />
        </div>
      </div>
    </div>
  );
};

