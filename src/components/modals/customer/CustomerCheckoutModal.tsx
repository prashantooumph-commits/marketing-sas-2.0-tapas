import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { X, ShoppingBag, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';

interface CustomerCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerCheckoutModal: React.FC<CustomerCheckoutModalProps> = ({ isOpen, onClose }) => {
  const { activeWorkspace } = useOoumph();

  const [selectedOffering, setSelectedOffering] = useState<'single' | 'corporate'>('single');
  const [buyerName, setBuyerName] = useState('Alexandra Wright');
  const [buyerEmail, setBuyerEmail] = useState('a.wright@sterlingtech.io');
  const [paymentMethod, setPaymentMethod] = useState<'invoice' | 'card'>('invoice');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrderNum);
    setOrderConfirmed(true);
  };

  const total = selectedOffering === 'single' ? 3400 : 14500;

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
              Secure Checkout: {activeWorkspace.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {orderConfirmed ? (
          <div className="p-8 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Enrollment Order Confirmed!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Order <strong>#{orderNumber}</strong> confirmed for <strong>{buyerName}</strong> ({buyerEmail}). Receipt and syllabus orientation access dispatched.
            </p>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-950 max-w-xs mx-auto">
              Total Paid / Invoiced: ${total.toLocaleString()}.00 USD. Handed over to Caleb Rivers (A32) & Sloane Kelly (A30).
            </div>
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
            >
              Close Checkout Preview
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Select Enrollment Package:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOffering('single')}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedOffering === 'single'
                      ? 'border-indigo-600 bg-indigo-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">Single Executive Seat</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Fall 2026 Cohort</div>
                  <div className="text-xs font-bold text-indigo-700 mt-1 tabular-nums">$3,400.00</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOffering('corporate')}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedOffering === 'corporate'
                      ? 'border-indigo-600 bg-indigo-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">Corporate Team (6 Seats)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Custom Breakout Coaching</div>
                  <div className="text-xs font-bold text-indigo-700 mt-1 tabular-nums">$14,500.00</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Purchaser Name</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Payment Method</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('invoice')}
                  className={`p-2.5 rounded border text-left ${
                    paymentMethod === 'invoice' ? 'border-slate-900 bg-slate-50 font-bold' : 'border-slate-200'
                  }`}
                >
                  Corporate Net-30 Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded border text-left ${
                    paymentMethod === 'card' ? 'border-slate-900 bg-slate-50 font-bold' : 'border-slate-200'
                  }`}
                >
                  Simulated Corporate Credit Card
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Due:</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">${total.toLocaleString()}.00 USD</span>
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Complete Simulated Order</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
