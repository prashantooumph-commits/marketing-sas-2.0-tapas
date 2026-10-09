import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { EmployeeCategory } from '../../types';
import { X, UserPlus, Check, Sparkles } from 'lucide-react';

interface CustomEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomEmployeeModal: React.FC<CustomEmployeeModalProps> = ({ isOpen, onClose }) => {
  const { createCustomEmployee, selectEmployee } = useOoumph();

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EmployeeCategory>('Core');
  const [bio, setBio] = useState('');
  const [instructions, setInstructions] = useState('');
  const [capabilitiesInput, setCapabilitiesInput] = useState('Custom report generation, Dedicated document auditing');
  const [starterPrompt, setStarterPrompt] = useState('Audit our executive proposal against client guidelines');
  const [avatarColor, setAvatarColor] = useState('bg-indigo-600');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;

    const capabilities = capabilitiesInput.split(',').map((c) => c.trim()).filter(Boolean);
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'CE';

    createCustomEmployee({
      name,
      title,
      category,
      bio: bio || `Specialized helper dedicated to ${title.toLowerCase()} workflows.`,
      avatarColor,
      avatarInitials: initials,
      capabilities: capabilities.length ? capabilities : ['Role-specific task assistance'],
      starterPrompts: [starterPrompt],
      referenceOrigin: 'User Configured Helper'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-slate-800" />
            <h2 className="text-base font-semibold text-slate-900">
              Create Custom AI Employee Helper
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Employee Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Liam Foster"
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Role / Specialization
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Grant Writer / Podcast Booker"
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white"
              >
                <option value="Core">Core</option>
                <option value="Sales Operations">Sales Operations</option>
                <option value="Growth & Marketing">Growth & Marketing</option>
                <option value="Content & Creative">Content & Creative</option>
                <option value="Operations & Support">Operations & Support</option>
                <option value="Strategy & Commerce">Strategy & Commerce</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Avatar Theme
              </label>
              <div className="flex items-center gap-2 pt-0.5">
                {['bg-indigo-600', 'bg-teal-600', 'bg-rose-600', 'bg-amber-600', 'bg-purple-600'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setAvatarColor(color)}
                    className={`h-6 w-6 rounded-full ${color} flex items-center justify-center text-white text-[10px] transition-transform ${
                      avatarColor === color ? 'ring-2 ring-slate-900 ring-offset-2 scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {avatarColor === color && '✓'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Role Instructions & Boundary
            </label>
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Define specific instructions, tone, and prohibited actions (e.g. Always include compliance disclaimer, never quote pricing without owner approval)..."
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Permitted Demo Capabilities (comma-separated)
            </label>
            <input
              type="text"
              value={capabilitiesInput}
              onChange={(e) => setCapabilitiesInput(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Test Starter Prompt
            </label>
            <input
              type="text"
              value={starterPrompt}
              onChange={(e) => setStarterPrompt(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
            />
          </div>

          <div className="border-t border-slate-200 pt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Save & Activate Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
