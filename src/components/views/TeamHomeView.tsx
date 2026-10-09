import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { Employee, EmployeeCategory } from '../../types';
import { CustomEmployeeModal } from '../modals/CustomEmployeeModal';
import {
  Search,
  Sparkles,
  ArrowRight,
  Pin,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Filter,
  Send,
  Calendar,
  Layers
} from 'lucide-react';

export const TeamHomeView: React.FC = () => {
  const {
    employees,
    selectEmployee,
    approvals,
    navigate,
    activeWorkspace,
    sendMessage
  } = useOoumph();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [globalTaskInput, setGlobalTaskInput] = useState('');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Pending decisions
  const pendingApprovals = approvals.filter((a) => a.status === 'pending');

  // Filtered employees
  const categories = [
    'All',
    'Core',
    'Sales Operations',
    'Growth & Marketing',
    'Content & Creative',
    'Operations & Support',
    'Strategy & Commerce'
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || emp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const coreTeam = employees.filter((e) => e.pinned || ['A01', 'A02', 'A05', 'A16', 'A17', 'A23'].includes(e.code));

  const handleGlobalTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalTaskInput.trim()) return;

    // Intelligent dispatch based on keyword
    const input = globalTaskInput.toLowerCase();
    let targetEmployee = employees.find((e) => e.code === 'A01'); // Default Aria

    if (input.includes('post') || input.includes('social') || input.includes('linkedin')) {
      targetEmployee = employees.find((e) => e.code === 'A02');
    } else if (input.includes('outbound') || input.includes('cold') || input.includes('email lead')) {
      targetEmployee = employees.find((e) => e.code === 'A16');
    } else if (input.includes('guide') || input.includes('comment') || input.includes('grow')) {
      targetEmployee = employees.find((e) => e.code === 'A23');
    } else if (input.includes('website') || input.includes('landing page')) {
      targetEmployee = employees.find((e) => e.code === 'A07');
    } else if (input.includes('proposal') || input.includes('contract') || input.includes('quote')) {
      targetEmployee = employees.find((e) => e.code === 'A31');
    }

    if (targetEmployee) {
      sendMessage(targetEmployee.id, globalTaskInput);
      selectEmployee(targetEmployee.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* 1. First-Fold High-Leverage Delegation Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Who can help {activeWorkspace.name} today?
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Describe any task or objective. Ooumph routes it to the right specialist with your approved brand context.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Create Custom Helper</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleGlobalTaskSubmit} className="relative">
          <input
            type="text"
            value={globalTaskInput}
            onChange={(e) => setGlobalTaskInput(e.target.value)}
            placeholder="e.g. Prepare next week's LinkedIn thought leadership post on delegation..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-4 pr-28 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:bg-white focus:outline-hidden transition-all shadow-2xs"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <span>Delegate</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Quick Task Shortcuts */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Quick suggestions:</span>
          {[
            { label: 'Morning executive briefing', code: 'A01' },
            { label: 'Draft LinkedIn post', code: 'A02' },
            { label: 'Test Flagship Guide loop', code: 'A23' },
            { label: 'Import lead CSV', code: 'A04' }
          ].map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const emp = employees.find((e) => e.code === item.code);
                if (emp) selectEmployee(emp.id);
              }}
              className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-slate-700 hover:border-slate-300 hover:text-slate-950 transition-colors shadow-2xs text-[11px]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Urgent Decisions Strip ("What do I need to decide?") */}
      {pendingApprovals.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-700" />
              <span className="text-xs font-semibold text-amber-950 uppercase tracking-wider">
                Decisions Awaiting Your Review ({pendingApprovals.length})
              </span>
            </div>
            <button
              onClick={() => navigate('inbox')}
              className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1"
            >
              Open Review Inbox <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pendingApprovals.slice(0, 3).map((appr) => (
              <div
                key={appr.id}
                onClick={() => navigate('inbox')}
                className="cursor-pointer rounded-lg border border-amber-200 bg-white p-3 shadow-2xs hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-medium text-slate-700">{appr.employeeName}</span>
                  <span className="text-amber-700 font-semibold">{appr.riskLevel} Risk</span>
                </div>
                <div className="text-xs font-semibold text-slate-900 line-clamp-1">{appr.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{appr.summary}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Recommended Core Team */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recommended Core Team</h2>
            <p className="text-xs text-slate-500">Your primary day-to-day operational employees.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreTeam.slice(0, 6).map((emp) => (
            <div
              key={emp.id}
              onClick={() => selectEmployee(emp.id)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4.5 hover:border-slate-400 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-xs ${emp.avatarColor}`}>
                      {emp.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-900">{emp.name}</span>
                        <span className="text-[10px] font-semibold text-slate-500 border border-slate-200 px-1 py-0.2 rounded">
                          {emp.code}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-600">{emp.title}</div>
                    </div>
                  </div>
                  {emp.pinned && <Pin className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />}
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {emp.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">{emp.capabilities.length} capabilities</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Open Workspace →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Complete Specialists Directory (All 32 Capabilities + Custom) */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">All Specialists Directory</h2>
            <p className="text-xs text-slate-500">
              Browse all {employees.length} capabilities spanning sales, marketing, operations, legal, and content.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, name, or skill..."
              className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => selectEmployee(emp.id)}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3.5 hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-white font-bold text-xs shrink-0 ${emp.avatarColor}`}>
                    {emp.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">{emp.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{emp.code}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">{emp.title}</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {emp.bio}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{emp.category}</span>
                <span className="font-medium text-slate-800 hover:underline">Open →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CustomEmployeeModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </div>
  );
};
