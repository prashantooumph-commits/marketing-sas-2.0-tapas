import React, { useState, useMemo } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { Employee, EmployeeCategory } from '../../types';
import {
  X,
  Search,
  User,
  ArrowRight,
  Sparkles,
  Send,
  Eye,
  CheckCircle2,
  Filter
} from 'lucide-react';

const EMPLOYEE_BEST_FOR_MAP: Record<string, string> = {
  A01: 'Best for daily morning executive briefings, VIP email triage, and calendar scheduling.',
  A02: 'Best for platform-native social copy, monthly editorial calendars, and multi-channel post queuing.',
  A03: 'Best for search query research, comprehensive SEO pillar articles, and internal linking.',
  A04: 'Best for target ICP prospect enrichment, contact list hygiene, and CSV file column mapping.',
  A05: 'Best for simulated incoming telephone triage, voicemail transcription, and appointment handoffs.',
  A06: 'Best for NDA drafting, legal contract clause audits, redlines, and human review flags.',
  A07: 'Best for responsive landing page deployment, visual headline editing, and live lead capture forms.',
  A08: 'Best for quarterly strategic objectives, audience positioning, and multi-agent plan coordination.',
  A09: 'Best for deal pipeline Kanban stages, qualification criteria (BANT), and deal coaching.',
  A10: 'Best for multi-channel email/WhatsApp drip campaigns, audience segmentation, and consent tracking.',
  A11: 'Best for grounded FAQ customer support, order status lookup, and human takeover lock.',
  A12: 'Best for conversion copywriting, headline variation testing, and value proposition framing.',
  A13: 'Best for multi-touch campaign attribution, ROI calculation, and tabular CSV analytics exports.',
  A14: 'Best for role description crafting, candidate evaluation scorecards, and interview rubrics.',
  A15: 'Best for private founder OKR tracking, confidential weekly reflections, and productivity routines.',
  A16: 'Best for multi-step personalized cold outreach cadences, meeting link delivery, and opt-out suppression.',
  A17: 'Best for sub-60s speed-to-lead qualification, calendar booking, and outbound sequence pausing.',
  A18: 'Best for high-level creative concepts, visual hooks, campaign moodboards, and production briefs.',
  A19: 'Best for multi-ratio social graphics (1:1, 9:16, 16:9), quote cards, and SVG/PNG design assets.',
  A20: 'Best for video storyboard scene sequencing, script production, and interactive video previews.',
  A21: 'Best for public social comment moderation, community sentiment triage, and empathetic reply drafting.',
  A22: 'Best for web and newsletter brand mention monitoring, alert triage, and press sentiment analysis.',
  A23: 'Best for the Flagship Comment-to-Guide funnel, keyword DM delivery, and permission opt-ins.',
  A24: 'Best for Meta feed/story ad creative pairings, $50/day budget safety caps, and audience guardrails.',
  A25: 'Best for Google Search high-intent keyword bidding, negative keyword lists, and search ad copies.',
  A26: 'Best for Perplexity and ChatGPT AI citation audits and structured knowledge gap analysis.',
  A27: 'Best for landing page A/B test split analysis and statistical confidence validation.',
  A28: 'Best for affiliate partner briefs, tracked referral link generation, and commission accounting.',
  A29: 'Best for contact deduplication merge, SPF/DKIM sender domain health, and CRM cleanup.',
  A30: 'Best for client onboarding milestone checklists, customer health scores, and expansion proposals.',
  A31: 'Best for commercial quotations, scope fee tables, and mock customer proposal decisions.',
  A32: 'Best for serialized product catalog seats, inventory monitoring, and cart abandonment recovery.'
};

export const EmployeeChooserModal: React.FC = () => {
  const {
    isEmployeeChooserOpen,
    setIsEmployeeChooserOpen,
    employeeChooserInitialTask,
    setEmployeeChooserInitialTask,
    employees,
    selectEmployee,
    sendMessage
  } = useOoumph();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentTaskInput, setCurrentTaskInput] = useState(employeeChooserInitialTask || '');

  // Keep state synchronized with prop/store
  React.useEffect(() => {
    if (isEmployeeChooserOpen) {
      setCurrentTaskInput(employeeChooserInitialTask || '');
      setSearchQuery('');
      setSelectedCategory('All');
    }
  }, [isEmployeeChooserOpen, employeeChooserInitialTask]);

  const categories: (string | EmployeeCategory)[] = [
    'All',
    'Core',
    'Sales Operations',
    'Growth & Marketing',
    'Content & Creative',
    'Operations & Support',
    'Strategy & Commerce'
  ];

  // Recommended employees heuristic when a task query exists
  const recommendedEmployees = useMemo(() => {
    const text = (currentTaskInput || searchQuery).toLowerCase().trim();
    if (!text) return [];

    return employees
      .filter((emp) => {
        const code = emp.code.toLowerCase();
        const title = emp.title.toLowerCase();
        const bio = emp.bio.toLowerCase();
        const name = emp.name.toLowerCase();
        const caps = emp.capabilities.map((c) => c.toLowerCase()).join(' ');

        if (text.includes('nda') || text.includes('contract') || text.includes('legal')) return emp.code === 'A06';
        if (text.includes('caption') || text.includes('instagram') || text.includes('post') || text.includes('social')) return emp.code === 'A02';
        if (text.includes('seo') || text.includes('article') || text.includes('blog')) return emp.code === 'A03';
        if (text.includes('csv') || text.includes('enrich') || text.includes('lead list')) return emp.code === 'A04';
        if (text.includes('phone') || text.includes('call') || text.includes('voicemail')) return emp.code === 'A05';
        if (text.includes('website') || text.includes('landing page')) return emp.code === 'A07';
        if (text.includes('meta ad') || text.includes('facebook ad') || text.includes('ad spend')) return emp.code === 'A24';
        if (text.includes('google ad') || text.includes('search ad')) return emp.code === 'A25';
        if (text.includes('aeo') || text.includes('geo') || text.includes('citation') || text.includes('perplexity')) return emp.code === 'A26';
        if (text.includes('commerce') || text.includes('product') || text.includes('cart') || text.includes('inventory')) return emp.code === 'A32';
        if (text.includes('outbound') || text.includes('cold email')) return emp.code === 'A16';
        if (text.includes('inbound') || text.includes('speed to lead') || text.includes('qualify')) return emp.code === 'A17';
        if (text.includes('proposal') || text.includes('quote') || text.includes('pricing')) return emp.code === 'A31';

        return (
          title.includes(text) ||
          name.includes(text) ||
          code.includes(text) ||
          caps.includes(text) ||
          bio.includes(text)
        );
      })
      .slice(0, 3);
  }, [currentTaskInput, searchQuery, employees]);

  // Filtered employees list
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        searchQuery === '' ||
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (EMPLOYEE_BEST_FOR_MAP[emp.code] || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || emp.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory, employees]);

  if (!isEmployeeChooserOpen) return null;

  const handleAssignTask = (emp: Employee, taskText?: string) => {
    const finalTask = taskText || currentTaskInput;
    if (finalTask.trim()) {
      sendMessage(emp.id, finalTask);
    }
    selectEmployee(emp.id);
    setIsEmployeeChooserOpen(false);
    setEmployeeChooserInitialTask('');
  };

  const handleViewEmployee = (emp: Employee) => {
    selectEmployee(emp.id);
    setIsEmployeeChooserOpen(false);
    setEmployeeChooserInitialTask('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80 shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Ask One Employee
            </div>
            <h2 className="text-base font-bold text-slate-950">
              Choose an AI Specialist for Your Task
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select one of our 32 dedicated personas with calibrated capabilities and brand guidelines.
            </p>
          </div>
          <button
            onClick={() => setIsEmployeeChooserOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Task Input & Filter Bar */}
        <div className="p-4 sm:p-6 pb-2 space-y-3.5 bg-white shrink-0 border-b border-slate-100">
          {/* Optional Task Context Input */}
          <div className="relative">
            <input
              type="text"
              value={currentTaskInput}
              onChange={(e) => setCurrentTaskInput(e.target.value)}
              placeholder="What do you want this specialist to work on? (e.g. 'Write a LinkedIn post about our workshop')"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-hidden transition-all shadow-2xs"
            />
          </div>

          {/* Search + Category Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, title, skill..."
                className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-slate-800 focus:outline-hidden"
              />
            </div>

            {/* Category Segment Selector */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Cards Grid Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Recommended Section (when query matches) */}
          {recommendedEmployees.length > 0 && (
            <div className="space-y-3 p-4 rounded-xl border border-teal-200 bg-teal-50/40">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-teal-700" />
                <span>Recommended for your task</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {recommendedEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="rounded-xl border border-teal-200 bg-white p-3.5 shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-lg ${emp.avatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                          {emp.code}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-slate-900 truncate">{emp.name}</div>
                          <div className="text-[11px] text-slate-500 truncate">{emp.title}</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                        {EMPLOYEE_BEST_FOR_MAP[emp.code] || emp.bio}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAssignTask(emp)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold py-1.5 transition-colors cursor-pointer"
                    >
                      <span>Assign task to {emp.name}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete Directory Grid */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Specialist Directory ({filteredEmployees.length} of {employees.length})
            </div>

            {filteredEmployees.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
                No specialists match your search criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEmployees.map((emp) => {
                  const bestFor = EMPLOYEE_BEST_FOR_MAP[emp.code] || emp.bio;
                  const capabilitiesList = emp.capabilities.slice(0, 3);
                  const starterTasks = emp.starterPrompts.slice(0, 2);

                  return (
                    <div
                      key={emp.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Identity Line */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`h-9 w-9 rounded-lg ${emp.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                              {emp.avatarInitials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-xs text-slate-900">{emp.name}</span>
                                <span className="text-[10px] font-semibold text-slate-500 font-mono border border-slate-200 rounded px-1 py-0.2">
                                  {emp.code}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-600 font-medium">{emp.title} · <span className="text-slate-400">{emp.category}</span></div>
                            </div>
                          </div>
                        </div>

                        {/* One-Line "Best for" */}
                        <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-[11px] text-slate-700 leading-relaxed font-medium">
                          {bestFor}
                        </div>

                        {/* 3 Concise Capability Examples */}
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Key Capabilities
                          </div>
                          <div className="space-y-1 text-[11px] text-slate-600">
                            {capabilitiesList.map((cap, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3 text-slate-400 shrink-0" />
                                <span className="truncate">{cap}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 2 Starter Tasks */}
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Starter Tasks
                          </div>
                          <div className="space-y-1">
                            {starterTasks.map((prompt, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleAssignTask(emp, prompt)}
                                className="w-full text-left p-1.5 rounded bg-slate-50/70 hover:bg-slate-100 border border-slate-200/60 text-[11px] text-slate-700 truncate block transition-colors cursor-pointer"
                                title="Click to assign this task directly"
                              >
                                "{prompt}"
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewEmployee(emp)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 text-slate-400" />
                          <span>View employee</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAssignTask(emp)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
                        >
                          <span>Assign task</span>
                          <Send className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
