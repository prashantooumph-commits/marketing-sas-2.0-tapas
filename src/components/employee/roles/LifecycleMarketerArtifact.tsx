import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { Mail, MessageSquare, CheckCircle2, Pause, Play, ShieldAlert, Send } from 'lucide-react';

export const LifecycleMarketerArtifact: React.FC = () => {
  const { leads, activeWorkspace } = useOoumph();

  const [activeChannel, setActiveChannel] = useState<'email' | 'whatsapp'>('email');
  const [selectedDripStep, setSelectedDripStep] = useState(1);
  const [sequenceStatus, setSequenceStatus] = useState<'running' | 'paused'>('running');

  // Contact counts with verified channel permissions
  const emailEligibleCount = leads.filter((l) => l.consents.marketingEmail && l.status !== 'opted_out').length;
  const whatsappEligibleCount = leads.filter((l) => l.consents.whatsapp && l.status !== 'opted_out').length;

  const emailSteps = [
    {
      step: 1,
      timing: 'Immediately after enrollment',
      subject: `Welcome to ${activeWorkspace.name}: Your Cohort Orientation & Operating Rhythms`,
      preview: 'Access your syllabus, executive workbook, and faculty introduction.',
      body: `Hi {firstName},\n\nWelcome to ${activeWorkspace.name}. Over the next six weeks, our objective is simple: help you replace administrative fires with predictable, autonomous systems.\n\nHere is your immediate access checklist:\n1. Download the Executive Orientation Syllabus\n2. Add your weekly tactical sprint to your calendar\n3. Review your dedicated AI employee team directory\n\nWe look forward to meeting you on Thursday.\n\nWarm regards,\nThe Faculty Team at ${activeWorkspace.name}`
    },
    {
      step: 2,
      timing: 'Day 3 post-enrollment',
      subject: 'Tactical Workbook: Your High-Leverage Calendar Audit',
      preview: 'Reclaim 4+ hours this week before the first live tactical sprint.',
      body: `Hi {firstName},\n\nBefore our first live session, please complete the 15-minute Calendar Audit workbook attached in your portal.\n\nLook for the recurring meetings where you are purely a passive observer. In Module 1, we will show you how to safely delegate these.\n\nBest,\nElena Rostova, Lifecycle Team`
    },
    {
      step: 3,
      timing: 'Day 7 post-enrollment',
      subject: 'Milestone 1 Complete: Next Step Operational Architecture',
      preview: 'Your initial module progress summary and peer breakout group.',
      body: `Hi {firstName},\n\nCongratulations on completing Module 1! Your peer breakout group has been assigned in the fellow directory.\n\nSee you in the live sprint.\n\nElena`
    }
  ];

  const currentEmail = emailSteps.find((s) => s.step === selectedDripStep) || emailSteps[0];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Lifecycle Onboarding & Nurture Engine</h3>
            <p className="text-xs text-slate-500">Multi-Channel Drip Sequences with Explicit Consent Partitioning</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                sequenceStatus === 'running'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {sequenceStatus === 'running' ? 'Sequence Active' : 'Sequence Paused'}
            </span>
            <button
              onClick={() => setSequenceStatus(sequenceStatus === 'running' ? 'paused' : 'running')}
              className="p-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1"
              title="Toggle sequence running state"
            >
              {sequenceStatus === 'running' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>
          </div>
        </div>

        {/* Channel Permission Audit Strip */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div
            onClick={() => setActiveChannel('email')}
            className={`cursor-pointer rounded-lg p-3 border transition-colors ${
              activeChannel === 'email' ? 'border-teal-600 bg-teal-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-700" />
                <span className="text-xs font-semibold text-slate-900">Email Drip Channel</span>
              </div>
              <span className="text-xs font-bold text-teal-800 tabular-nums">{emailEligibleCount} Eligible</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Verified marketing email opt-in confirmed</p>
          </div>

          <div
            onClick={() => setActiveChannel('whatsapp')}
            className={`cursor-pointer rounded-lg p-3 border transition-colors ${
              activeChannel === 'whatsapp' ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-700" />
                <span className="text-xs font-semibold text-slate-900">WhatsApp Notification Channel</span>
              </div>
              <span className="text-xs font-bold text-emerald-800 tabular-nums">{whatsappEligibleCount} Eligible</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Separate WhatsApp transactional permission required</p>
          </div>
        </div>

        {/* EMAIL PREVIEW */}
        {activeChannel === 'email' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-xs font-medium text-slate-500">Cadence Steps:</span>
              {emailSteps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setSelectedDripStep(s.step)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedDripStep === s.step
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Step {s.step} ({s.timing})
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/50 text-xs space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>From: <strong>orientation@{activeWorkspace.domain}</strong></span>
                <span>Subject: {currentEmail.subject}</span>
              </div>
              <div className="rounded border border-slate-200 bg-white p-3 font-sans leading-relaxed whitespace-pre-wrap text-slate-800">
                {currentEmail.body}
              </div>
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200 flex justify-between items-center">
                <span>Footer: Includes mandatory one-click unsubscribe & physical address.</span>
                <span className="text-emerald-700 font-medium">✓ GDPR & CAN-SPAM Validated</span>
              </div>
            </div>
          </div>
        )}

        {/* WHATSAPP TEMPLATE PREVIEW */}
        {activeChannel === 'whatsapp' && (
          <div className="space-y-3">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 flex items-start gap-2.5">
              <ShieldAlert className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 leading-relaxed">
                <strong>Meta Business Policy Guardrail:</strong> WhatsApp template messages must use pre-approved HSM formats. Promotional marketing blasts without explicit user opt-in are strictly forbidden to protect account standing.
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-emerald-950/5 p-4 max-w-md mx-auto">
              <div className="rounded-lg bg-white p-3 shadow-xs border border-emerald-100 text-xs text-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-emerald-800">WhatsApp HSM Template · Approved</div>
                <p className="leading-relaxed">
                  "Hi <strong>{'{1}'}</strong>, your weekly tactical session with {activeWorkspace.name} starts in <strong>{'{2}'}</strong> minutes. Your Zoom access room is ready: <strong>{'{3}'}</strong>. Reply STOP to mute reminders."
                </p>
                <div className="text-[10px] text-slate-400 text-right tabular-nums">09:45 AM ✓✓</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
