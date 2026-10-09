import React, { useState } from 'react';
import { Employee } from '../../types';
import { useOoumph } from '../../store/ooumphStore';
import { AudioPlayerSimulation } from '../common/AudioPlayerSimulation';
import { VideoPlayerSimulation } from '../common/VideoPlayerSimulation';
import { triggerGuideDownload } from '../../utils/pdfGenerator';
import { LifecycleMarketerArtifact } from './roles/LifecycleMarketerArtifact';
import { CustomerSupportArtifact } from './roles/CustomerSupportArtifact';
import { CopywriterArtifact } from './roles/CopywriterArtifact';
import { AnalystArtifact } from './roles/AnalystArtifact';
import { RecruiterArtifact } from './roles/RecruiterArtifact';
import { ProductivityCoachArtifact } from './roles/ProductivityCoachArtifact';
import { CreativeDirectorArtifact } from './roles/CreativeDirectorArtifact';
import { CommunityManagerArtifact } from './roles/CommunityManagerArtifact';
import { BrandListenerArtifact } from './roles/BrandListenerArtifact';
import { PaidAdsArtifact } from './roles/PaidAdsArtifact';
import { VisibilityAndCroArtifact } from './roles/VisibilityAndCroArtifact';
import { RevOpsAndPartnershipArtifact } from './roles/RevOpsAndPartnershipArtifact';
import { SuccessAndCommerceArtifact } from './roles/SuccessAndCommerceArtifact';
import {
  CheckCircle2,
  AlertTriangle,
  Upload,
  Calendar,
  Send,
  Download,
  Copy,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Play,
  FileText,
  ExternalLink,
  PhoneCall,
  Mail,
  UserCheck,
  TrendingUp,
  Tag,
  Search,
  Sliders,
  DollarSign,
  Globe
} from 'lucide-react';

interface RoleArtifactViewerProps {
  employee: Employee;
}

export const RoleArtifactViewer: React.FC<RoleArtifactViewerProps> = ({ employee }) => {
  const {
    activeWorkspace,
    tasks,
    updateTask,
    websitePage,
    updateWebsiteHeadline,
    rollbackWebsiteVersion,
    submitWebsiteContactForm,
    leads,
    importLeadsCSV,
    updateLeadStatus,
    triggerOutboundSequence,
    flagshipCampaign,
    updateFlagshipSettings,
    setIsFlagshipSimulatorOpen,
    deals,
    mockClientDecisionOnDeal,
    toggleLesson,
    addLesson
  } = useOoumph();

  // Local interaction states
  const [copiedNote, setCopiedNote] = useState<string | null>(null);

  // A01 Local state
  const [replyTextA01, setReplyTextA01] = useState(
    'Hi Alex,\n\nLooking forward to our discussion regarding the executive cohort for Horizon Labs. Would Monday at 10:30 AM PST or Tuesday at 2:00 PM PST work better for your schedule?\n\nBest regards,\nCedar & Co Executive Team'
  );
  const [meetingScheduledA01, setMeetingScheduledA01] = useState(false);

  // A02 Local state
  const [postDraftA02, setPostDraftA02] = useState(
    'Most founders think delegation fails because "nobody cares like the founder does."\n\nIn reality, delegation fails because of fuzzy definitions:\n1. What does "done" look like?\n2. What is the explicit boundary of authority?\n3. Where is the single source of truth for lessons learned?\n\nWhen you give employees (AI or human) unambiguous guidelines and reversible test tasks, delegation stops feeling like a gamble.\n\nWhat is the hardest task you have ever handed off?'
  );
  const [postScheduleTime, setPostScheduleTime] = useState('Tomorrow, 09:15 AM PST');
  const [isPostApprovedA02, setIsPostApprovedA02] = useState(false);

  // A03 Local state
  const [articleContentA03, setArticleContentA03] = useState(
    '# Why Traditional Executive Seminars Are Being Replaced by Tactical Micro-Cohorts\n\nBy Cedar & Co Faculty\n\nFor decades, mid-to-senior corporate managers attended three-day offsite retreats, absorbed theoretical slide decks, and returned to their desks on Monday only to drown in the exact same backlog of emails and meetings.\n\nToday, modern business leaders are adopting tactical micro-cohorts: compact, high-leverage 6-week operational sprints designed around real asynchronous execution.'
  );

  // A04 Local state: CSV Importer
  const [csvInput, setCsvInput] = useState(
    'Name, Title, Company, Email\nMarcus Brody, CEO, Brody Logistics, marcus@brodylogistics.com\nSarah Jenkins, VP Operations, Apex Media Group, sarah.jenkins@apexmedia.io\nDr. Aris Thorne, Director of Learning, Nova Health, aris.thorne@novahealth.org\nRachel Vance, Talent Lead, Sterling Corp, rachel@sterlingcorp.co'
  );
  const [csvStats, setCsvStats] = useState<{ added: number; duplicates: number; invalid: number } | null>(null);

  // A07 Local state: Landing page visual editor
  const [headlineEditA07, setHeadlineEditA07] = useState(websitePage.heroHeadline);
  const [formTestName, setFormTestName] = useState('Jordan Miller');
  const [formTestEmail, setFormTestEmail] = useState('jordan.miller@acmecorp.com');
  const [formTestCompany, setFormTestCompany] = useState('Acme Corporation');
  const [formTestMsg, setFormTestMsg] = useState('Requesting information for 6 team seats in the upcoming executive cohort.');
  const [formSubmittedA07, setFormSubmittedA07] = useState(false);

  // A19 Local state: Visual Designer
  const [graphicAspectRatio, setGraphicAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('1:1');

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNote(`Copied ${label}!`);
    setTimeout(() => setCopiedNote(null), 2000);
  };

  // RENDER PER CAPABILITY
  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50/50">
      {copiedNote && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-medium text-white shadow-lg animate-fade-in">
          {copiedNote}
        </div>
      )}

      {/* A01: EXECUTIVE ASSISTANT */}
      {employee.code === 'A01' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Today's Executive Morning Briefing</h3>
                <p className="text-xs text-slate-500 tabular-nums">Prepared for {activeWorkspace.name} · October 9, 2026</p>
              </div>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Daily Rhythms
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Meetings Today</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">3 Events</div>
                <div className="text-[11px] text-emerald-600 mt-0.5">30-min buffer active</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Decisions Awaiting</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">2 Approvals</div>
                <div className="text-[11px] text-amber-600 mt-0.5">1 low risk, 1 high risk</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Priority Follow-up</div>
                <div className="text-lg font-bold text-slate-900">Horizon Labs</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Reschedule draft ready</div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-900">Priority Email Triage & Reply Editor:</div>
              <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>To: <strong>alex@horizonlabs.bio</strong> (Alex Vance, Director)</span>
                  <span className="text-slate-400">Subject: Re: Executive Cohort Reschedule</span>
                </div>
                <textarea
                  rows={4}
                  value={replyTextA01}
                  onChange={(e) => setReplyTextA01(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-600 focus:outline-hidden"
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    {meetingScheduledA01 ? (
                      <span className="text-emerald-700 font-medium">✓ Follow-up email queued & calendar locked</span>
                    ) : (
                      'Simulate dispatch and calendar buffer'
                    )}
                  </div>
                  <button
                    onClick={() => setMeetingScheduledA01(true)}
                    disabled={meetingScheduledA01}
                    className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <Send className="h-3 w-3" />
                    {meetingScheduledA01 ? 'Queued' : 'Send & Lock Slot'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A02: SOCIAL PUBLISHER */}
      {employee.code === 'A02' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Multi-Platform Post Editor & Scheduler</h3>
                <p className="text-xs text-slate-500">Targeting LinkedIn Organic Thought Leadership</p>
              </div>
              <span className="text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                LinkedIn · Scheduled
              </span>
            </div>

            <div className="my-4">
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Editable Post Copy (Respects tone: "{activeWorkspace.brandTone.substring(0, 45)}..."):
              </label>
              <textarea
                rows={8}
                value={postDraftA02}
                onChange={(e) => setPostDraftA02(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-800 leading-relaxed focus:border-sky-600 focus:outline-hidden"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-600">Schedule:</span>
                <input
                  type="text"
                  value={postScheduleTime}
                  onChange={(e) => setPostScheduleTime(e.target.value)}
                  className="rounded border border-slate-200 px-2 py-1 text-xs text-slate-800 bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(postDraftA02, 'Post Draft')}
                  className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
                <button
                  onClick={() => setIsPostApprovedA02(true)}
                  disabled={isPostApprovedA02}
                  className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium text-white transition-colors ${
                    isPostApprovedA02 ? 'bg-emerald-600' : 'bg-sky-600 hover:bg-sky-700'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {isPostApprovedA02 ? 'Scheduled & Approved' : 'Approve & Schedule'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A03: SEO / EDITORIAL SPECIALIST */}
      {employee.code === 'A03' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">SEO Long-Form Article Editor</h3>
                <p className="text-xs text-slate-500">Keyword Cluster: "executive cohort leadership training" · 2,400 mo/vol</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                SEO Pillar Draft
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500">Estimated Reading Time</div>
                <div className="text-sm font-bold text-slate-900 tabular-nums">7 Minutes</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500">Keyword Density</div>
                <div className="text-sm font-bold text-slate-900 tabular-nums">1.8% (Optimal)</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500">Internal Links</div>
                <div className="text-sm font-bold text-slate-900 tabular-nums">4 Links Mapped</div>
              </div>
            </div>

            <textarea
              rows={10}
              value={articleContentA03}
              onChange={(e) => setArticleContentA03(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-3 font-mono text-xs text-slate-800 leading-relaxed focus:border-emerald-600 focus:outline-hidden"
            />

            <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                CMS Slug: <code className="text-slate-800">/insights/micro-cohorts-vs-seminars</code>
              </div>
              <button
                onClick={() => handleCopy(articleContentA03, 'Article Markdown')}
                className="flex items-center gap-1.5 rounded-md bg-emerald-700 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-800"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy Article Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A04: PROSPECT RESEARCHER */}
      {employee.code === 'A04' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Local CSV Import & Column Mapping</h3>
                <p className="text-xs text-slate-500">Import prospect lists with automatic deduplication and validation</p>
              </div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                Prospect Hygiene
              </span>
            </div>

            <div className="my-4">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Paste or Edit Sample CSV Rows (Name, Title, Company, Email):
              </label>
              <textarea
                rows={5}
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                className="w-full rounded-lg border border-slate-200 font-mono p-2.5 text-xs text-slate-800 focus:border-amber-600 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const res = importLeadsCSV(csvInput);
                  setCsvStats(res);
                }}
                className="flex items-center gap-1.5 rounded-md bg-amber-600 px-4 py-2 text-xs font-medium text-white hover:bg-amber-700 shadow-2xs"
              >
                <Upload className="h-3.5 w-3.5" />
                Parse & Import CSV to CRM
              </button>

              {csvStats && (
                <div className="text-xs text-slate-700 flex items-center gap-2">
                  <span className="text-emerald-700 font-semibold">+{csvStats.added} Added</span>
                  <span>·</span>
                  <span className="text-amber-700 font-medium">{csvStats.duplicates} Duplicates suppressed</span>
                  {csvStats.invalid > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-rose-600">{csvStats.invalid} Invalid</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Current Prospect Database Snippet */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-xs font-semibold text-slate-900 mb-3">
              Enriched ICP Prospect Pool ({leads.length} Contacts):
            </div>
            <div className="divide-y divide-slate-100">
              {leads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">{lead.name}</div>
                    <div className="text-slate-500">{lead.title} · {lead.company}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="tabular-nums font-medium text-slate-600">Fit {lead.fitScore}%</span>
                    <span className="text-slate-500 text-[11px]">{lead.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* A05: RECEPTIONIST */}
      {employee.code === 'A05' && (
        <div className="space-y-6 max-w-3xl">
          <AudioPlayerSimulation
            callerName="Marcus Thorne (Director at Apex Media)"
            callerNumber="+1 (415) 890-4491"
            durationSeconds={42}
            transcript="Hi there, I am calling to inquire about Cedar and Co's Fall Executive Cohort for our department leads. We have 6 managers we want to enroll and need to understand the commercial invoice process and start dates. Please call me back at this number or email marcus at apex media dot io. Thanks!"
            summary="High intent enterprise enrollment inquiry (6 seats). Rachel scheduled callback reminder and extracted contact email."
          />
        </div>
      )}

      {/* A06: LEGAL ASSISTANT */}
      {employee.code === 'A06' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Standard Mutual NDA & Agreement Drafter</h3>
                <p className="text-xs text-slate-500">Corporate Training Client: Horizon Labs</p>
              </div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                Human Signoff Required
              </span>
            </div>

            {/* Prominent Human Review Flag */}
            <div className="my-4 rounded-lg bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-2.5">
              <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong>Notice:</strong> This draft is prepared by AI Assistant Linda Cross from approved standard templates. It is strictly for administrative assistance and does not constitute a certified legal opinion or execute a binding signature without founder/counsel authorization.
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-3 bg-slate-50 font-mono text-xs text-slate-800 leading-relaxed max-h-56 overflow-y-auto">
              <p className="font-bold mb-2">MUTUAL NON-DISCLOSURE AGREEMENT (DRAFT)</p>
              <p className="mb-2">This Agreement is entered into by and between Cedar & Co Learning ("Disclosing Party") and Horizon Labs ("Receiving Party").</p>
              <p className="mb-2">1. Confidential Information. Refers to proprietary course curricula, executive operational frameworks, and fellow performance assessments.</p>
              <p className="mb-2">2. Term of Obligation. Receiving Party shall maintain confidentiality for a period of two (2) years from the date of disclosure.</p>
              <p className="text-rose-700 font-semibold">[Linda's Clause Note: Standard template limits term to 2 years. Horizon requested 1 year. Flagged for founder approval.]</p>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">Template v2.4 · Approved Cedar & Co Terms</span>
              <button
                onClick={() => handleCopy('MUTUAL NON-DISCLOSURE AGREEMENT (DRAFT)...', 'NDA Text')}
                className="flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy NDA Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A07: WEBSITE BUILDER */}
      {employee.code === 'A07' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Landing Page Editor & Live Form Capture</h3>
                <p className="text-xs text-slate-500">Page: {websitePage.slug} · Published Status: {websitePage.published ? 'Live' : 'Draft'}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">
                  v{websitePage.versionHistory.length}
                </span>
              </div>
            </div>

            {/* Headline Editor */}
            <div className="my-4">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Hero Headline (Live update with automatic version tracking):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={headlineEditA07}
                  onChange={(e) => setHeadlineEditA07(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-cyan-600 focus:outline-hidden"
                />
                <button
                  onClick={() => updateWebsiteHeadline(headlineEditA07)}
                  className="rounded-lg bg-cyan-700 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-cyan-800 transition-colors"
                >
                  Publish Edit
                </button>
              </div>
            </div>

            {/* Rollback history */}
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 mb-4">
              <div className="text-xs font-semibold text-slate-900 mb-1.5 flex items-center justify-between">
                <span>Version History & Rollback:</span>
                <span className="text-[11px] text-slate-500">Instant 1-Click Rollback</span>
              </div>
              <div className="space-y-1.5">
                {websitePage.versionHistory.map((v) => (
                  <div key={v.version} className="flex items-center justify-between text-xs py-1">
                    <span className="text-slate-700">v{v.version}: "{v.headline}"</span>
                    <button
                      onClick={() => rollbackWebsiteVersion(v.version)}
                      className="text-cyan-700 hover:underline flex items-center gap-1 font-medium text-[11px]"
                    >
                      <RotateCcw className="h-3 w-3" /> Rollback
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Interactive Lead Capture Form */}
            <div className="rounded-lg border border-slate-200 p-4 bg-white">
              <div className="text-xs font-semibold text-slate-900 mb-2">
                Test Live Contact Form (Verifies speed-to-lead & outbound pause sync):
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={formTestName}
                  onChange={(e) => setFormTestName(e.target.value)}
                  placeholder="Your Name"
                  className="rounded border border-slate-200 px-2.5 py-1 text-xs"
                />
                <input
                  type="email"
                  value={formTestEmail}
                  onChange={(e) => setFormTestEmail(e.target.value)}
                  placeholder="Work Email"
                  className="rounded border border-slate-200 px-2.5 py-1 text-xs"
                />
              </div>
              <input
                type="text"
                value={formTestCompany}
                onChange={(e) => setFormTestCompany(e.target.value)}
                placeholder="Company Name"
                className="w-full rounded border border-slate-200 px-2.5 py-1 text-xs mb-2"
              />
              <textarea
                rows={2}
                value={formTestMsg}
                onChange={(e) => setFormTestMsg(e.target.value)}
                className="w-full rounded border border-slate-200 px-2.5 py-1 text-xs mb-3"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {formSubmittedA07 ? '✓ Lead recorded in CRM and outbound sequence paused' : 'Simulate visitor submitting form'}
                </span>
                <button
                  onClick={() => {
                    submitWebsiteContactForm({
                      name: formTestName,
                      email: formTestEmail,
                      company: formTestCompany,
                      message: formTestMsg
                    });
                    setFormSubmittedA07(true);
                  }}
                  className="rounded-md bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                >
                  Submit Test Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A08: BUSINESS STRATEGIST */}
      {employee.code === 'A08' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Quarterly Strategy Roadmap & Team Assignments</h3>
                <p className="text-xs text-slate-500">Multi-agent coordinated execution for {activeWorkspace.name}</p>
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                Strategic Plan
              </span>
            </div>

            <div className="space-y-3 my-4">
              {[
                { title: 'Goal 1: Launch Q4 B2B Corporate Cohort', owner: 'Marcus Ward (A09)', tasks: 'Enterprise deal pipeline & qualification' },
                { title: 'Goal 2: Expand Audience via Flagship Guide', owner: 'Astrid Lind (A23)', tasks: 'Deliver PDF guide to commenters & capture consent' },
                { title: 'Goal 3: Sub-60s Inbound Speed-to-Lead', owner: 'Jordan Bell (A17)', tasks: 'Auto-triage website form captures' }
              ].map((item, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.tasks}</div>
                  </div>
                  <span className="text-xs font-medium text-purple-900 bg-purple-100/70 px-2 py-0.5 rounded">
                    {item.owner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* A09: SALES MANAGER */}
      {employee.code === 'A09' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">B2B Deal Pipeline & Coaching Board</h3>
                <p className="text-xs text-slate-500">Supervises active opportunities and close probability</p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                Active Deals: {deals.length}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4">
              {deals.map((deal) => (
                <div key={deal.id} className="rounded-lg border border-slate-200 p-3 bg-white shadow-2xs">
                  <div className="text-xs font-semibold text-slate-900">{deal.clientName}</div>
                  <div className="text-sm font-bold text-slate-900 mt-1 tabular-nums">
                    ${deal.value.toLocaleString()}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600 font-medium">Stage: {deal.stage}</div>
                  <div className="mt-1 text-[10px] text-slate-500">
                    Legal Signed: {deal.legalReviewSigned ? '✓ Yes' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* A16: ADVANCED OUTBOUND SALES */}
      {employee.code === 'A16' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Personalized Outbound Sequence Engine</h3>
                <p className="text-xs text-slate-500">3-Touch Cadence with Automatic Opt-Out Suppression</p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                Arthur Pendelton
              </span>
            </div>

            <div className="space-y-3 my-4">
              <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
                <div className="text-xs font-semibold text-slate-900 mb-1">
                  Touch 1: Value-led conversation starter (Day 1)
                </div>
                <p className="text-xs text-slate-700 italic">
                  "Hi {'{firstName}'}, noticed your team at {'{company}'} is expanding department operations. Most directors tell us their managers lose 8+ hours a week in meeting churn..."
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
                <div className="text-xs font-semibold text-slate-900 mb-1">
                  Touch 2: Practical framework proof (Day 4)
                </div>
                <p className="text-xs text-slate-700 italic">
                  "Sharing our 1-page executive operating rhythm that 40+ cohort fellows installed this quarter..."
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Opt-out suppression: Verified active across all sending mailboxes.
              </span>
              <button
                onClick={() => triggerOutboundSequence(leads.map((l) => l.id))}
                className="flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
              >
                <Send className="h-3.5 w-3.5" />
                Dispatch Step 1 to Eligible Leads
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A17: INBOUND SALESPERSON */}
      {employee.code === 'A17' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Sub-60s Speed-to-Lead Triage</h3>
                <p className="text-xs text-slate-500">Instant qualification and booking link delivery</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Jordan Bell · Active
              </span>
            </div>

            <div className="my-4 rounded-lg bg-emerald-50/50 border border-emerald-200 p-3.5 text-xs text-emerald-950">
              <strong>Speed-to-Lead Invariant:</strong> Inbound leads are acknowledged in sub-60 seconds. When an inbound inquiry arrives, cold outbound outreach to that lead is immediately frozen to prevent competing messaging.
            </div>

            <div className="rounded-lg border border-slate-200 p-3 bg-white">
              <div className="text-xs font-semibold text-slate-900 mb-2">Recent Inbound Triage Events:</div>
              <div className="space-y-2">
                {leads.filter((l) => l.source === 'Inbound Contact Form' || l.source === 'Flagship Comment Guide').map((lead) => (
                  <div key={lead.id} className="p-2.5 rounded border border-slate-100 bg-slate-50 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{lead.name} ({lead.company})</div>
                      <div className="text-[11px] text-slate-500">{lead.notes}</div>
                    </div>
                    <span className="font-semibold text-emerald-700">{lead.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A19: VISUAL DESIGNER */}
      {employee.code === 'A19' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Social Graphics & Aspect Ratio Formatter</h3>
                <p className="text-xs text-slate-500">Cedar & Co Brand Asset Studio</p>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-slate-100 p-1">
                {(['1:1', '9:16', '16:9'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setGraphicAspectRatio(ratio)}
                    className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                      graphicAspectRatio === ratio ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual preview */}
            <div className="my-6 flex justify-center">
              <div
                className={`rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 text-white flex flex-col justify-between shadow-lg transition-all ${
                  graphicAspectRatio === '1:1'
                    ? 'w-72 h-72'
                    : graphicAspectRatio === '9:16'
                    ? 'w-56 h-96'
                    : 'w-full h-56'
                }`}
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-indigo-300 font-semibold">
                    {activeWorkspace.name}
                  </div>
                  <div className="mt-3 text-sm font-semibold leading-snug">
                    "Clarity creates velocity. True delegation starts with unambiguous guidelines."
                  </div>
                </div>
                <div className="text-[11px] text-indigo-300 border-t border-indigo-800/80 pt-2 flex items-center justify-between">
                  <span>Executive Fellowship</span>
                  <span>Fall 2026</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  alert('Generated brand-compliant PNG asset downloaded.');
                }}
                className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                <Download className="h-3.5 w-3.5" />
                Export {graphicAspectRatio} Graphic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A20: VIDEO PRODUCER */}
      {employee.code === 'A20' && (
        <div className="space-y-6 max-w-3xl">
          <VideoPlayerSimulation />
        </div>
      )}

      {/* A23: AUDIENCE GROWTH SPECIALIST (FLAGSHIP JOURNEY J05) */}
      {employee.code === 'A23' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Flagship Journey: Send Guide to Commenters
                </h3>
                <p className="text-xs text-slate-500">
                  Turns public social engagement into qualified inbound buyers with genuine PDF delivery
                </p>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                Flagship Loop Active
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 my-4">
              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500">Scanned</div>
                <div className="text-base font-bold text-slate-900 tabular-nums">
                  {flagshipCampaign.stats.scannedComments}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500">PDFs Delivered</div>
                <div className="text-base font-bold text-slate-900 tabular-nums">
                  {flagshipCampaign.stats.resourcesDelivered}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500">Opt-in Leads</div>
                <div className="text-base font-bold text-slate-900 tabular-nums">
                  {flagshipCampaign.stats.optedInLeads}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-500">Meetings Booked</div>
                <div className="text-base font-bold text-slate-900 tabular-nums">
                  {flagshipCampaign.stats.meetingsBooked}
                </div>
              </div>
            </div>

            {/* Campaign Parameters */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Keyword Trigger
                  </label>
                  <input
                    type="text"
                    value={flagshipCampaign.keyword}
                    onChange={(e) => updateFlagshipSettings({ keyword: e.target.value.toUpperCase() })}
                    className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Delivered Resource Asset
                  </label>
                  <div className="flex items-center justify-between rounded-md border border-slate-200 px-2.5 py-1 text-xs bg-slate-50">
                    <span className="truncate">{flagshipCampaign.resourceTitle}.pdf</span>
                    <button
                      onClick={() => triggerGuideDownload()}
                      className="text-teal-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" /> Test PDF
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Private DM Delivery Template
                </label>
                <textarea
                  rows={2}
                  value={flagshipCampaign.privateDmTemplate}
                  onChange={(e) => updateFlagshipSettings({ privateDmTemplate: e.target.value })}
                  className="w-full rounded-md border border-slate-200 p-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Privacy Policy: Separate consent check required before marketing emails.
              </span>
              <button
                onClick={() => setIsFlagshipSimulatorOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-xs font-medium text-white hover:bg-teal-800 transition-colors shadow-2xs"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Launch Live Recipient Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A31: PROPOSAL & DEAL DESK */}
      {employee.code === 'A31' && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Commercial Proposal & Customer Decision Desk</h3>
                <p className="text-xs text-slate-500">Enterprise Deal: Horizon Labs Director Program ($18,500)</p>
              </div>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Preston Shaw
              </span>
            </div>

            <div className="my-4 rounded-lg border border-slate-200 p-4 bg-slate-50/70">
              <div className="text-xs font-semibold text-slate-900 mb-2">Scope of Services & Fees:</div>
              <ul className="text-xs text-slate-700 space-y-1 mb-3">
                <li>· 8 Executive Fellowship seats in Winter 2026 cohort</li>
                <li>· 2 Private tactical strategy sessions with founding faculty</li>
                <li>· Dedicated AI Employee setup & knowledge base integration</li>
              </ul>
              <div className="text-sm font-bold text-slate-900 border-t border-slate-200 pt-2 tabular-nums">
                Total Contract Value: $18,500.00 USD
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <div className="text-xs font-semibold text-slate-900 mb-2">
                Simulate Mock Customer Decision (Separates proposal delivery from confirmed sale):
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => mockClientDecisionOnDeal('deal-3', 'accept')}
                  className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700"
                >
                  Simulate Client Signing Agreement
                </button>
                <button
                  onClick={() => mockClientDecisionOnDeal('deal-3', 'request_edit')}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Simulate Client Requesting Scope Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A10: LIFECYCLE MARKETER */}
      {employee.code === 'A10' && <LifecycleMarketerArtifact />}

      {/* A11: CUSTOMER SUPPORT */}
      {employee.code === 'A11' && <CustomerSupportArtifact />}

      {/* A12: CONVERSION COPYWRITER */}
      {employee.code === 'A12' && <CopywriterArtifact />}

      {/* A13: ANALYST */}
      {employee.code === 'A13' && <AnalystArtifact />}

      {/* A14: RECRUITER */}
      {employee.code === 'A14' && <RecruiterArtifact />}

      {/* A15: PRIVATE PRODUCTIVITY COACH */}
      {employee.code === 'A15' && <ProductivityCoachArtifact />}

      {/* A18: CREATIVE DIRECTOR */}
      {employee.code === 'A18' && <CreativeDirectorArtifact />}

      {/* A21: COMMUNITY MANAGER */}
      {employee.code === 'A21' && <CommunityManagerArtifact />}

      {/* A22: BRAND LISTENER */}
      {employee.code === 'A22' && <BrandListenerArtifact />}

      {/* A24: META ADS SPECIALIST */}
      {employee.code === 'A24' && <PaidAdsArtifact platform="meta" />}

      {/* A25: GOOGLE ADS SPECIALIST */}
      {employee.code === 'A25' && <PaidAdsArtifact platform="google" />}

      {/* A26: ANSWER-ENGINE VISIBILITY */}
      {employee.code === 'A26' && <VisibilityAndCroArtifact mode="visibility" />}

      {/* A27: CONVERSION RATE OPTIMIZATION */}
      {employee.code === 'A27' && <VisibilityAndCroArtifact mode="cro" />}

      {/* A28: PARTNERSHIPS & REFERRALS */}
      {employee.code === 'A28' && <RevOpsAndPartnershipArtifact mode="partnership" />}

      {/* A29: REVENUE OPERATIONS */}
      {employee.code === 'A29' && <RevOpsAndPartnershipArtifact mode="revops" />}

      {/* A30: CUSTOMER SUCCESS */}
      {employee.code === 'A30' && <SuccessAndCommerceArtifact mode="success" />}

      {/* A32: COMMERCE ASSISTANT */}
      {employee.code === 'A32' && <SuccessAndCommerceArtifact mode="commerce" />}

      {/* USER CONFIGURED CUSTOM EMPLOYEES */}
      {employee.isCustom && (
        <div className="space-y-6 max-w-3xl">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{employee.name} · Custom Helper Workspace</h3>
                <p className="text-xs text-slate-500">{employee.title} ({employee.category})</p>
              </div>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Custom Specialist
              </span>
            </div>

            <div className="my-4 space-y-3">
              <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100 text-xs">
                <span className="font-bold text-slate-900 block mb-1">Configured Operating Instructions:</span>
                <p className="text-slate-700 leading-relaxed italic">{employee.bio}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-900 mb-1.5 block">Permitted Custom Capabilities:</span>
                <div className="space-y-1">
                  {employee.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-indigo-100 bg-indigo-50/40 p-4 text-xs text-indigo-950">
              <div className="font-semibold mb-1">Interactive Test Prompt Ready:</div>
              <p className="text-indigo-800 leading-relaxed mb-3">
                "{employee.starterPrompts[0] || 'Audit custom business task'}"
              </p>
              <div className="text-[11px] text-slate-500">
                Use the conversational chat panel on the left to assign work to this custom helper.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
