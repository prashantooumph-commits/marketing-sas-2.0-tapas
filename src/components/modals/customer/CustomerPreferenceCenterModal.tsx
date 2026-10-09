import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { X, ShieldCheck, Mail, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

interface CustomerPreferenceCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerPreferenceCenterModal: React.FC<CustomerPreferenceCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const { leads, updateLeadStatus, activeWorkspace } = useOoumph();

  const [selectedEmail, setSelectedEmail] = useState('sarah.jenkins@apexmedia.io');
  const [optOutConfirmed, setOptOutConfirmed] = useState(false);

  if (!isOpen) return null;

  const currentLead = leads.find((l) => l.email.toLowerCase() === selectedEmail.toLowerCase()) || leads[0];

  const handleGlobalUnsubscribe = () => {
    updateLeadStatus(currentLead.id, 'opted_out');
    setOptOutConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              Customer-Facing Experience Preview
            </span>
            <h2 className="text-base font-semibold text-slate-900 mt-1">
              Communication Preferences & Opt-Out Center
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {optOutConfirmed ? (
          <div className="p-8 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Preferences Updated & Suppressed</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              <strong>{currentLead.email}</strong> is marked as <strong>Opted Out</strong> in the CRM. Arthur Pendelton (A16) and Elena Rostova (A10) will automatically suppress this contact from all future outbound mailings.
            </p>
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
            >
              Close Preference Center
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Select Contact to Test:
              </label>
              <select
                value={selectedEmail}
                onChange={(e) => setSelectedEmail(e.target.value)}
                className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white"
              >
                {leads.map((l) => (
                  <option key={l.id} value={l.email}>
                    {l.name} ({l.email}) · Status: {l.status}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs">
              <div className="font-bold text-slate-900">Manage Channels for {currentLead.name}:</div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span>Weekly Executive Dispatch & Case Studies</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentLead.consents.marketingEmail}
                    onChange={() => {}}
                    className="rounded border-slate-300 text-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <span>WhatsApp Milestone & Zoom Reminders</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentLead.consents.whatsapp}
                    onChange={() => {}}
                    className="rounded border-slate-300 text-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span>Direct Telephone Callback Reminders</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentLead.consents.callback}
                    onChange={() => {}}
                    className="rounded border-slate-300 text-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">GDPR & CAN-SPAM compliant</span>
              <button
                onClick={handleGlobalUnsubscribe}
                className="rounded-lg border border-rose-300 bg-rose-50 px-3.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition-colors"
              >
                Unsubscribe From All (Global Opt-Out)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
