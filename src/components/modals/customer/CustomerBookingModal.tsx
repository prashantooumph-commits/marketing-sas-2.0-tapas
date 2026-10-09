import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Building, Globe } from 'lucide-react';

interface CustomerBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerBookingModal: React.FC<CustomerBookingModalProps> = ({ isOpen, onClose }) => {
  const { activeWorkspace, leads, updateLeadStatus } = useOoumph();

  const [selectedSlot, setSelectedSlot] = useState('Thursday, 10:00 AM PST');
  const [name, setName] = useState('David Kalu');
  const [email, setEmail] = useState('d.kalu@vanguardretail.com');
  const [company, setCompany] = useState('Vanguard Retail Systems');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const slots = [
    'Thursday, 10:00 AM PST',
    'Thursday, 02:30 PM PST',
    'Friday, 11:00 AM PST',
    'Monday, 09:30 AM PST'
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);

    // Update lead in store if exists
    const existing = leads.find((l) => l.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      updateLeadStatus(existing.id, 'meeting_booked');
    }
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
              Schedule 20-Min Executive Strategy Review
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Strategy Review Confirmed!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Calendar invite sent to <strong>{email}</strong> for <strong>{selectedSlot}</strong>.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500 border border-slate-200 max-w-xs mx-auto">
              Timezone: Automatically converted to your local time. Host: Jordan Bell & Founder, {activeWorkspace.name}.
            </div>
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
            >
              Close Preview
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Select Available Operational Review Slot:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSlot(s)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-colors ${
                      selectedSlot === s
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5 text-indigo-600 mb-1" />
                    <div>{s}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Company / Organization</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900"
              />
            </div>

            <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Includes 30-min preparation buffer</span>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Confirm Strategy Review</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
