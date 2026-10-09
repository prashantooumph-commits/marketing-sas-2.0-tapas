import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { Sparkles, CheckCircle2, ArrowRight, Copy, Share2 } from 'lucide-react';

export const CopywriterArtifact: React.FC = () => {
  const { activeWorkspace, updateWebsiteHeadline, websitePage } = useOoumph();

  const [selectedAngle, setSelectedAngle] = useState<'efficiency' | 'systems' | 'relief'>('efficiency');
  const [syncedNotice, setSyncedNotice] = useState<string | null>(null);

  const copyVariations = {
    efficiency: {
      title: 'Angle 1: Quantitative Executive Efficiency',
      headline: 'Reclaim 8.5 Hours Every Week with Autonomous Operational Systems',
      subheading: 'Stop drowning in recurring meetings. Install proven delegation frameworks that free executive bandwidth for high-leverage growth.',
      cta: 'View Fellowship Syllabus',
      emailSubject: 'How 40+ directors reclaimed their weekends (without hiring extra staff)'
    },
    systems: {
      title: 'Angle 2: High-Trust Systems & Authority',
      headline: 'Clarity Creates Velocity: Master the Operating Rhythms of Modern Leadership',
      subheading: 'True delegation fails without unambiguous guidelines. Learn how to train, audit, and orchestrate AI and human teammates with zero friction.',
      cta: 'Apply for Executive Cohort',
      emailSubject: 'The delegation formula that turns chaotic teams into self-running operations'
    },
    relief: {
      title: 'Angle 3: Direct Founder Relief & Focus',
      headline: 'Stop Putting Out Administrative Fires Every Morning',
      subheading: 'You did not start a company to spend 65% of your day sorting email threads and updating spreadsheets. Hand over routine execution safely.',
      cta: 'Explore Cohort Curriculum',
      emailSubject: 'The invisible growth ceiling inside your daily schedule'
    }
  };

  const currentCopy = copyVariations[selectedAngle];

  const handleSyncToLandingPage = () => {
    updateWebsiteHeadline(currentCopy.headline, currentCopy.subheading);
    setSyncedNotice(`Successfully synchronized headline to Landing Page (${websitePage.slug})!`);
    setTimeout(() => setSyncedNotice(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Conversion Copy & Asset Synchronization</h3>
            <p className="text-xs text-slate-500">Calibrated for {activeWorkspace.name} ({activeWorkspace.brandTone.substring(0, 45)}...)</p>
          </div>
          <span className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded">
            Porter Hayes
          </span>
        </div>

        {/* Strategic Angle Selector */}
        <div className="grid grid-cols-3 gap-2 my-4">
          {(['efficiency', 'systems', 'relief'] as const).map((angle) => (
            <button
              key={angle}
              onClick={() => setSelectedAngle(angle)}
              className={`p-2.5 rounded-lg border text-left transition-colors ${
                selectedAngle === angle
                  ? 'border-violet-600 bg-violet-50/50 font-medium'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="text-xs font-semibold capitalize text-slate-900">{angle} Angle</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {angle === 'efficiency' ? 'Quantifiable ROI' : angle === 'systems' ? 'Authority & Trust' : 'Direct Relief'}
              </div>
            </button>
          ))}
        </div>

        {/* Copy Presentation Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
          <div className="text-xs font-bold text-slate-900">{currentCopy.title}</div>

          <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-2">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Hero Headline:</span>
              <div className="text-sm font-bold text-slate-900 leading-snug">{currentCopy.headline}</div>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Supporting Subheading:</span>
              <p className="text-xs text-slate-600 leading-relaxed">{currentCopy.subheading}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Primary CTA: <strong>{currentCopy.cta}</strong></span>
              <span className="text-slate-500">Subject Line: <em>"{currentCopy.emailSubject}"</em></span>
            </div>
          </div>

          {/* Synchronized Multi-Asset Linking */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80">
            <span className="text-xs text-slate-500">
              Current live landing headline: <code className="text-slate-800 text-[11px] truncate max-w-xs">{websitePage.heroHeadline}</code>
            </span>

            <button
              onClick={handleSyncToLandingPage}
              className="flex items-center gap-1.5 rounded-lg bg-violet-700 px-4 py-2 text-xs font-medium text-white hover:bg-violet-800 transition-colors shadow-2xs shrink-0"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Sync Copy to Live Landing Page</span>
            </button>
          </div>

          {syncedNotice && (
            <div className="rounded bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>{syncedNotice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
