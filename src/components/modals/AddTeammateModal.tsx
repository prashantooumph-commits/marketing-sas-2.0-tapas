import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { Employee, ProjectCollaboratorRole, TeamMember } from '../../types';
import { X, Sparkles, Users, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AddTeammateModal: React.FC = () => {
  const {
    isAddTeammateModalOpen,
    setIsAddTeammateModalOpen,
    addTeammateTargetProjectId,
    projects,
    employees,
    teamMembers,
    addProjectTeammate
  } = useOoumph();

  const [activeTab, setActiveTab] = useState<'ai' | 'human'>('ai');

  // AI selection state
  const [selectedAiId, setSelectedAiId] = useState<string>('');
  const [aiTaskHelp, setAiTaskHelp] = useState<string>('');

  // Human selection state
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [humanProjectRole, setHumanProjectRole] = useState<ProjectCollaboratorRole>('contributor');

  const currentProject = projects.find((p) => p.id === addTeammateTargetProjectId) || projects[0];

  if (!isAddTeammateModalOpen || !currentProject) return null;

  const currentProjectAiIds = currentProject.participatingEmployeeIds || [];
  const currentProjectHumanIds = (currentProject.collaborators || []).map((c) => c.teamMemberId);

  const availableEmployees = employees.filter((e) => !currentProjectAiIds.includes(e.id));
  const availableMembers = teamMembers.filter((m) => !currentProjectHumanIds.includes(m.id));

  const handleAddAi = () => {
    if (!selectedAiId) return;
    addProjectTeammate(currentProject.id, {
      type: 'ai',
      employeeId: selectedAiId,
      taskHelp: aiTaskHelp.trim() || 'Provide domain consultation and deliverables support.'
    });
    setIsAddTeammateModalOpen(false);
    setSelectedAiId('');
    setAiTaskHelp('');
  };

  const handleAddHuman = () => {
    if (!selectedMemberId) return;
    addProjectTeammate(currentProject.id, {
      type: 'human',
      memberId: selectedMemberId,
      role: humanProjectRole
    });
    setIsAddTeammateModalOpen(false);
    setSelectedMemberId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-scale-in">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Project:</span>
              <strong className="text-slate-900">{currentProject.title}</strong>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">Add Project Teammate</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Collaborate by adding an AI specialist or assigning a human workspace member.
            </p>
          </div>

          <button
            onClick={() => setIsAddTeammateModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-2 border-b border-slate-100 bg-white">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>Add AI Specialist</span>
          </button>

          <button
            onClick={() => setActiveTab('human')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'human'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="h-3.5 w-3.5 text-indigo-400" />
            <span>Add Human Teammate</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          {activeTab === 'ai' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Select AI Specialist *
                </label>
                <select
                  value={selectedAiId}
                  onChange={(e) => setSelectedAiId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 bg-white focus:outline-hidden"
                >
                  <option value="">Choose an employee from registry...</option>
                  {availableEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.code}) — {emp.title} [{emp.category}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  What should this employee help with? *
                </label>
                <textarea
                  rows={3}
                  value={aiTaskHelp}
                  onChange={(e) => setAiTaskHelp(e.target.value)}
                  placeholder="e.g. Conduct a regulatory compliance review of the ad copy, or draft 3 variations of the landing page headline..."
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-hidden"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  This will generate an official project task assigned to the specialist and record the collaboration handoff.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Select Workspace Member *
                </label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 bg-white focus:outline-hidden"
                >
                  <option value="">Choose existing team member...</option>
                  {availableMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.email}) · Workspace role: {m.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Assign Project Role *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { role: 'contributor', label: 'Contributor', desc: 'Can review and edit deliverables' },
                    { role: 'approver', label: 'Approver', desc: 'Can sign off on approval gates' },
                    { role: 'viewer', label: 'Viewer', desc: 'Read-only visibility' }
                  ].map((r) => (
                    <div
                      key={r.role}
                      onClick={() => setHumanProjectRole(r.role as any)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        humanProjectRole === r.role
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold shadow-2xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs">{r.label}</div>
                      <p className="text-[10px] text-slate-500 font-normal mt-0.5">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsAddTeammateModalOpen(false)}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          {activeTab === 'ai' ? (
            <button
              type="button"
              disabled={!selectedAiId}
              onClick={handleAddAi}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-4 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Add Specialist to Project</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={!selectedMemberId}
              onClick={handleAddHuman}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-4 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Assign Collaborator</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
