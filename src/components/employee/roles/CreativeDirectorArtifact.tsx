import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { Sparkles, Palette, Film, CheckCircle2, ArrowRight } from 'lucide-react';

export const CreativeDirectorArtifact: React.FC = () => {
  const { selectEmployee, employees, activeWorkspace } = useOoumph();

  const [selectedConcept, setSelectedConcept] = useState<'calm' | 'velocity' | 'contrast'>('velocity');

  const concepts = {
    velocity: {
      theme: 'Theme: "Clarity Creates Velocity"',
      mood: 'Crisp editorial aesthetic, warm travertine and charcoal surfaces, focused founders leading calm execution.',
      hook: 'Most businesses don\'t have a talent problem; they have an instruction ambiguity problem.',
      designBrief: 'High-contrast quote carousels in 1:1 and 9:16 with signature typography and zero visual clutter.',
      videoBrief: '3-scene micro-documentary featuring executive calendar transformation.'
    },
    calm: {
      theme: 'Theme: "The Calm Executive"',
      mood: 'Deep indigo gradients, quiet early-morning workspace lighting, methodical calendar rhythm.',
      hook: 'What would your Monday look like if 70% of routine questions were answered before you opened your laptop?',
      designBrief: 'Minimalist calendar transformation side-by-side graphic.',
      videoBrief: 'Quiet reflective founder monologue transitioning to energetic team workshop.'
    },
    contrast: {
      theme: 'Theme: "The Delegation Paradox"',
      mood: 'Punchy documentary film grain, split-screen operational chaos vs. systematic automation.',
      hook: 'You didn\'t build this company to become its most expensive administrative assistant.',
      designBrief: 'Bold typographic poster cards pairing raw operational truths with clear frameworks.',
      videoBrief: 'Fast-paced kinetic typography breakdown of founder delegation bottlenecks.'
    }
  };

  const currentConcept = concepts[selectedConcept];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Creative Direction & Campaign Concepts</h3>
            <p className="text-xs text-slate-500">Overarching campaign hooks and production briefs</p>
          </div>
          <span className="text-xs font-semibold text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded">
            Camden Cole
          </span>
        </div>

        {/* Concept Selector */}
        <div className="grid grid-cols-3 gap-2 my-4">
          {(['velocity', 'calm', 'contrast'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedConcept(key)}
              className={`p-3 text-left rounded-lg border transition-colors ${
                selectedConcept === key
                  ? 'border-pink-600 bg-pink-50/40 font-medium'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-bold text-slate-900 capitalize">{key} Concept</div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{concepts[key].theme.split(': ')[1]}</div>
            </button>
          ))}
        </div>

        {/* Concept Detail Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs">
          <div>
            <div className="font-bold text-slate-900 text-sm mb-1">{currentConcept.theme}</div>
            <p className="text-slate-600 italic">"{currentConcept.hook}"</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Palette className="h-3.5 w-3.5 text-indigo-600" />
                <span>Visual Design Brief:</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">{currentConcept.designBrief}</p>
              <button
                onClick={() => {
                  const emp = employees.find((e) => e.code === 'A19');
                  if (emp) selectEmployee(emp.id);
                }}
                className="text-[11px] font-semibold text-indigo-700 hover:underline flex items-center gap-1 pt-1"
              >
                Pass to Vera Quinn (A19) →
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Film className="h-3.5 w-3.5 text-purple-600" />
                <span>Video Producer Brief:</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">{currentConcept.videoBrief}</p>
              <button
                onClick={() => {
                  const emp = employees.find((e) => e.code === 'A20');
                  if (emp) selectEmployee(emp.id);
                }}
                className="text-[11px] font-semibold text-purple-700 hover:underline flex items-center gap-1 pt-1"
              >
                Pass to Vivienne Leigh (A20) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
