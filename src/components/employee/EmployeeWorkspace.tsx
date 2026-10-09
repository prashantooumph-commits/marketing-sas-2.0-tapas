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
  RotateCcw
} from 'lucide-react';

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
    activeWorkspace
  } = useOoumph();

  const conversation = conversations[employee.id] || {
    employeeId: employee.id,
    messages: [],
    takeover: false
  };

  const [inputMessage, setInputMessage] = useState('');
  const [mobileTab, setMobileTab] = useState<'chat' | 'work'>('chat');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(employee.id, inputMessage);
    setInputMessage('');
  };

  const handleStarterPrompt = (prompt: string) => {
    sendMessage(employee.id, prompt);
  };

  return (
    <div className="flex h-[calc(100vh-61px)] flex-col bg-white overflow-hidden">
      {/* Workspace Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3.5 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => selectEmployee(null)}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
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
              </div>
              <p className="text-xs text-slate-500">{employee.title} · {employee.category}</p>
            </div>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2">
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
            className={`p-1.5 rounded-lg border text-xs font-medium transition-colors ${
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
            onClick={() => toggleTakeover(employee.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
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
