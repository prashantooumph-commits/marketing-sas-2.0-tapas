import React, { useState, useEffect } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { Employee } from '../../types';
import {
  X,
  Target,
  Users,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  ArrowRight,
  SlidersHorizontal,
  Calendar,
  DollarSign,
  Globe,
  Share2,
  Bookmark,
  Check
} from 'lucide-react';

interface PlannedTeamMember {
  employeeId: string;
  roleTitle: string;
  responsibility: string;
}

export const GoalPlannerModal: React.FC = () => {
  const {
    isGoalPlannerOpen,
    setIsGoalPlannerOpen,
    goalPlannerInitialGoal,
    setGoalPlannerInitialGoal,
    employees,
    activeWorkspace,
    createProject,
    navigate,
    setWorkTab
  } = useOoumph();

  const [goal, setGoal] = useState('');
  const [offer, setOffer] = useState('');
  const [audience, setAudience] = useState('');
  const [geography, setGeography] = useState('');
  const [channels, setChannels] = useState('');
  const [deadline, setDeadline] = useState('30 days');
  const [approximateBudget, setApproximateBudget] = useState('$1,500');
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [selectedAddEmployeeId, setSelectedAddEmployeeId] = useState('');

  // Initial recommended team list
  const defaultTeamIds = [
    { code: 'A08', role: 'Strategy', task: 'Define audience and campaign approach' },
    { code: 'A12', role: 'Copywriting', task: 'Create offer and campaign messaging' },
    { code: 'A18', role: 'Creative direction', task: 'Develop concepts and visual hooks' },
    { code: 'A20', role: 'Video & Storyboards', task: 'Produce campaign video and media assets' },
    { code: 'A02', role: 'Social distribution', task: 'Prepare organic distribution across channels' },
    { code: 'A24', role: 'Meta Ads', task: 'Prepare paid social campaign with budget cap' },
    { code: 'A21', role: 'Community', task: 'Handle incoming comment engagement and inquiries' },
    { code: 'A17', role: 'Inbound Sales', task: 'Qualify inbound leads and book discovery calls' }
  ];

  const [plannedTeam, setPlannedTeam] = useState<PlannedTeamMember[]>([]);

  // Initialize when opened
  useEffect(() => {
    if (isGoalPlannerOpen) {
      const initial = goalPlannerInitialGoal || 'Generate qualified leadership-programme enquiries';
      setGoal(initial);
      setOffer(activeWorkspace.products?.[0]?.name || 'Executive Tactical Fellowship ($8,500)');
      setAudience(activeWorkspace.audience || 'Operations Directors and Founders');
      setGeography('United States & Canada');
      setChannels('LinkedIn, Meta Ads, Email, Direct Inbound');

      // Populate default team
      const initialTeam: PlannedTeamMember[] = [];
      defaultTeamIds.forEach((def) => {
        const emp = employees.find((e) => e.code === def.code);
        if (emp) {
          initialTeam.push({
            employeeId: emp.id,
            roleTitle: def.role,
            responsibility: def.task
          });
        }
      });
      setPlannedTeam(initialTeam);
    }
  }, [isGoalPlannerOpen, goalPlannerInitialGoal, activeWorkspace, employees]);

  if (!isGoalPlannerOpen) return null;

  const handleRemoveEmployee = (empId: string) => {
    setPlannedTeam((prev) => prev.filter((item) => item.employeeId !== empId));
  };

  const handleAddEmployee = () => {
    if (!selectedAddEmployeeId) return;
    const emp = employees.find((e) => e.id === selectedAddEmployeeId);
    if (!emp) return;
    if (plannedTeam.some((item) => item.employeeId === emp.id)) return;

    setPlannedTeam((prev) => [
      ...prev,
      {
        employeeId: emp.id,
        roleTitle: emp.title,
        responsibility: `Contribute specialist expertise in ${emp.capabilities[0] || emp.category}`
      }
    ]);
    setSelectedAddEmployeeId('');
  };

  const handleUpdateResponsibility = (empId: string, text: string) => {
    setPlannedTeam((prev) =>
      prev.map((item) => (item.employeeId === empId ? { ...item, responsibility: text } : item))
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setPlannedTeam((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= plannedTeam.length - 1) return;
    setPlannedTeam((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleCreateProject = (status: 'in_progress' | 'planning' = 'in_progress') => {
    if (!goal.trim()) return;

    const responsibilitiesMap: Record<string, string> = {};
    plannedTeam.forEach((item) => {
      responsibilitiesMap[item.employeeId] = item.responsibility;
    });

    const leadEmployee = employees.find((e) => e.id === plannedTeam[0]?.employeeId);

    const newProjId = createProject({
      workspaceId: activeWorkspace.id,
      title: goal.length > 50 ? `${goal.slice(0, 48)}...` : goal,
      objective: goal,
      status,
      participatingEmployeeIds: plannedTeam.map((item) => item.employeeId),
      offer: offer.trim() || undefined,
      audience: audience.trim() || undefined,
      geography: geography.trim() || undefined,
      channels: channels ? channels.split(',').map((c) => c.trim()).filter(Boolean) : undefined,
      approximateBudget: approximateBudget.trim() || undefined,
      employeeResponsibilities: responsibilitiesMap,
      nextImportantAction: leadEmployee
        ? `First kickoff step: ${leadEmployee.name} (${leadEmployee.title}) to begin ${responsibilitiesMap[leadEmployee.id] || 'initial planning'}.`
        : 'Team plan assembled. Ready to begin first initiative phase.',
      progressSummary: `Team plan finalized with ${plannedTeam.length} coordinated specialists.`,
      tags: ['Goal Plan', 'Multi-Agent', activeWorkspace.industry]
    });

    setGoalPlannerInitialGoal('');
    setIsGoalPlannerOpen(false);
    setWorkTab('projects');
    navigate('work');
  };

  const availableEmployees = employees.filter(
    (e) => !plannedTeam.some((item) => item.employeeId === e.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-950">Plan with my team</h2>
              <p className="text-xs text-slate-500">
                Turn a business goal into a coordinated team plan with clear responsibilities.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsGoalPlannerOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Goal Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 block">
              What is your business goal? <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Generate 100 qualified leads for our leadership programme"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-hidden shadow-2xs"
            />
            <p className="text-[11px] text-slate-500">
              Be specific about what outcome you want to achieve. Ooumph suggests the specialists required to execute it.
            </p>
          </div>

          {/* Optional Goal Parameters Accordion */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
            <button
              type="button"
              onClick={() => setShowOptionalFields(!showOptionalFields)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
                <span>Optional parameters (Offer, audience, channels & budget)</span>
              </div>
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                {showOptionalFields ? 'Hide parameters' : 'Customize parameters'}
                {showOptionalFields ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </span>
            </button>

            {showOptionalFields && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200/80 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Offer / Product</label>
                  <input
                    type="text"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder="e.g. Executive Fellowship Winter Cohort"
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. Mid-to-Senior Operations Directors"
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Geography / Market</label>
                  <input
                    type="text"
                    value={geography}
                    onChange={(e) => setGeography(e.target.value)}
                    placeholder="e.g. California & Western US"
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Channels</label>
                  <input
                    type="text"
                    value={channels}
                    onChange={(e) => setChannels(e.target.value)}
                    placeholder="e.g. LinkedIn, Meta Ads, Email"
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Approximate Budget</label>
                  <input
                    type="text"
                    value={approximateBudget}
                    onChange={(e) => setApproximateBudget(e.target.value)}
                    placeholder="e.g. $1,500"
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Deadline</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="e.g. 30 days"
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-slate-400 focus:outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Suggested Team Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Here's the team I'd use ({plannedTeam.length} Specialists)
                </h3>
                <p className="text-xs text-slate-500">
                  You can edit individual responsibilities, reorder the execution flow, or add/remove specialists.
                </p>
              </div>
            </div>

            {/* Team Roster List */}
            <div className="space-y-2 border border-slate-200 rounded-xl p-2 bg-slate-50/30">
              {plannedTeam.map((item, index) => {
                const emp = employees.find((e) => e.id === item.employeeId);
                if (!emp) return null;

                return (
                  <div
                    key={emp.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors text-xs"
                  >
                    {/* Persona Identity */}
                    <div className="flex items-center gap-3 shrink-0 sm:w-56">
                      <div className={`h-8 w-8 rounded-lg ${emp.avatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                        {emp.code}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{emp.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{item.roleTitle}</div>
                      </div>
                    </div>

                    {/* Editable Responsibility Input */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={item.responsibility}
                        onChange={(e) => handleUpdateResponsibility(emp.id, e.target.value)}
                        className="w-full rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 focus:bg-white focus:border-slate-400 focus:outline-hidden transition-colors"
                        title="Click to edit responsibility"
                      />
                    </div>

                    {/* Reordering & Remove Controls */}
                    <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Move stage earlier"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === plannedTeam.length - 1}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Move stage later"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmployee(emp.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 ml-1 transition-colors"
                        title="Remove specialist from plan"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Specialist Picker */}
            {availableEmployees.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                <select
                  value={selectedAddEmployeeId}
                  onChange={(e) => setSelectedAddEmployeeId(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-slate-400 focus:outline-hidden"
                >
                  <option value="">+ Add another specialist to plan...</option>
                  {availableEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.title} · {emp.category})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddEmployee}
                  disabled={!selectedAddEmployeeId}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-800 disabled:opacity-40 transition-colors"
                >
                  Add to plan
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50 shrink-0">
          <button
            type="button"
            onClick={() => handleCreateProject('planning')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Save plan for later</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsGoalPlannerOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleCreateProject('in_progress')}
              disabled={!goal.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-950 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
            >
              <span>Create project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
