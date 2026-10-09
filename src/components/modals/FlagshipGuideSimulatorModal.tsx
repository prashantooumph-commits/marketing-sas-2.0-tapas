import React, { useState } from 'react';
import { useOoumph } from '../../store/ooumphStore';
import { triggerGuideDownload } from '../../utils/pdfGenerator';
import {
  X,
  Send,
  Download,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Calendar,
  Share2
} from 'lucide-react';

export const FlagshipGuideSimulatorModal: React.FC = () => {
  const {
    isFlagshipSimulatorOpen,
    setIsFlagshipSimulatorOpen,
    flagshipCampaign,
    runFlagshipSimulation,
    activeWorkspace
  } = useOoumph();

  // Recipient simulator local state
  const [username, setUsername] = useState('alex_director');
  const [commentInput, setCommentInput] = useState('GROW');
  const [followStatus, setFollowStatus] = useState<'Following' | 'Not Following' | 'Unknown'>('Not Following');
  const [hasCommented, setHasCommented] = useState(false);
  const [dmDelivered, setDmDelivered] = useState(false);
  const [answersQualification, setAnswersQualification] = useState(false);
  const [qualificationAnswer, setQualificationAnswer] = useState('Looking to streamline corporate team workflows across 8 managers.');
  const [grantsConsent, setGrantsConsent] = useState(false);
  const [meetingBooked, setMeetingBooked] = useState(false);
  const [simulationResultNote, setSimulationResultNote] = useState<string | null>(null);

  if (!isFlagshipSimulatorOpen) return null;

  const handleSimulateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setHasCommented(true);

    // Run simulation
    const result = runFlagshipSimulation(
      username,
      commentInput,
      answersQualification,
      qualificationAnswer,
      grantsConsent
    );

    if (result.success) {
      setDmDelivered(true);
      setSimulationResultNote(result.message);
    } else {
      setDmDelivered(false);
      setSimulationResultNote(result.message);
    }
  };

  const handleResetSimulation = () => {
    setHasCommented(false);
    setDmDelivered(false);
    setAnswersQualification(false);
    setGrantsConsent(false);
    setMeetingBooked(false);
    setSimulationResultNote(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                Flagship Experience
              </span>
              <h2 className="text-base font-semibold text-slate-900">
                Comment-to-Guide Recipient Journey Preview
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Experience exactly what a prospective buyer sees when triggering "{flagshipCampaign.keyword}".
            </p>
          </div>
          <button
            onClick={() => setIsFlagshipSimulatorOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Split view (Social Post on left, Recipient DM on right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 p-6 gap-6">
          {/* Left Column: Simulated Social Post */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-900">Step 1: Public Social Feed</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Follower State:</span>
                <select
                  value={followStatus}
                  onChange={(e) => setFollowStatus(e.target.value as any)}
                  className="rounded border border-slate-200 text-xs px-1.5 py-0.5 bg-white"
                >
                  <option value="Following">Following</option>
                  <option value="Not Following">Not Following</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>

            {/* Simulated Post Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-9 w-9 rounded-full bg-teal-700 text-white font-semibold flex items-center justify-center text-xs">
                  CC
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">{activeWorkspace.name}</div>
                  <div className="text-[11px] text-slate-500">Public LinkedIn Post · 4h ago</div>
                </div>
              </div>

              <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed mb-3">
                {flagshipCampaign.postCaption}
              </p>

              {/* Graphic Mock */}
              <div className="rounded-lg bg-gradient-to-br from-slate-900 to-teal-950 p-4 text-white text-center mb-4">
                <div className="text-[11px] font-medium tracking-widest uppercase text-teal-300">
                  Executive Briefing 2026
                </div>
                <div className="text-sm font-semibold mt-1">
                  {flagshipCampaign.resourceTitle}
                </div>
                <div className="text-[11px] text-slate-300 mt-2">
                  Comment "{flagshipCampaign.keyword}" for instant PDF download
                </div>
              </div>

              {/* Public Comment Simulator */}
              <form onSubmit={handleSimulateComment} className="border-t border-slate-100 pt-3">
                <div className="text-[11px] font-medium text-slate-600 mb-1.5">
                  Simulate Public Comment:
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder={`Type "${flagshipCampaign.keyword}"...`}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-800 transition-colors"
                  >
                    <Send className="h-3 w-3" />
                    Comment
                  </button>
                </div>
              </form>

              {/* Public Bot Reply preview */}
              {hasCommented && (
                <div className="mt-3 rounded-lg bg-slate-50 p-3 border border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-teal-700 font-semibold mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Public Reply Triggered:
                  </div>
                  <p className="text-slate-700">
                    "{flagshipCampaign.publicReplyTemplate.replace('{username}', username)}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Simulated Direct Message Delivery */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-900">Step 2: Private Resource & Opt-in</span>
              <button
                onClick={handleResetSimulation}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Reset Demo State
              </button>
            </div>

            {!hasCommented ? (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <MessageSquare className="h-8 w-8 text-slate-400 mb-2" />
                <p className="text-xs font-medium text-slate-600">Waiting for simulated comment</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                  Submit "{flagshipCampaign.keyword}" in the post on the left to see the instant private DM sequence.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* DM Chat bubble */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
                    <div className="h-2 w-2 rounded-full bg-teal-600" />
                    Direct Message from {activeWorkspace.name}
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed mb-3">
                    Hey Alex! Here is the direct download to <strong className="font-semibold text-slate-900">{flagshipCampaign.resourceTitle}</strong> as promised:
                  </p>

                  {/* Real Download Button */}
                  <div className="flex items-center gap-3 rounded-lg border border-teal-200 bg-teal-50/70 p-3">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-teal-950">
                        {flagshipCampaign.resourceTitle}.pdf
                      </div>
                      <div className="text-[11px] text-teal-700">
                        24-Page Executive PDF · Verified Genuine Binary
                      </div>
                    </div>
                    <button
                      onClick={() => triggerGuideDownload()}
                      className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-800 transition-colors shadow-2xs"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download PDF
                    </button>
                  </div>

                  {/* Voluntary Follow Invitation (No Forced Follow) */}
                  <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
                    <span>Enjoyed this guide? Follow {activeWorkspace.name} for weekly executive frameworks.</span>
                    <button className="text-xs font-medium text-teal-700 hover:underline">
                      + Follow
                    </button>
                  </div>
                </div>

                {/* Qualification Step */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-semibold text-slate-900 mb-1">
                    Step 3: Optional Tactical Qualification
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    {flagshipCampaign.qualificationQuestion}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      id="qual-check"
                      checked={answersQualification}
                      onChange={(e) => setAnswersQualification(e.target.checked)}
                      className="rounded border-slate-300 text-teal-600"
                    />
                    <label htmlFor="qual-check" className="text-xs text-slate-700 cursor-pointer">
                      Simulate recipient answering qualification question
                    </label>
                  </div>

                  {answersQualification && (
                    <input
                      type="text"
                      value={qualificationAnswer}
                      onChange={(e) => setQualificationAnswer(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 mb-2 focus:border-teal-600 focus:outline-hidden"
                    />
                  )}

                  {/* Separate Explicit Marketing Consent */}
                  <div className="rounded-lg bg-amber-50/70 border border-amber-200 p-3 mt-2">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-amber-950">
                          Separate Explicit Marketing Consent
                        </div>
                        <p className="text-[11px] text-amber-800 leading-tight mt-0.5">
                          In accordance with privacy standards, downloading a resource does not silently authorize outbound marketing.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id="consent-check"
                            checked={grantsConsent}
                            onChange={(e) => setGrantsConsent(e.target.checked)}
                            className="rounded border-amber-300 text-teal-600"
                          />
                          <label htmlFor="consent-check" className="text-xs font-medium text-amber-950 cursor-pointer">
                            "Yes, also send me Cedar & Co's weekly executive dispatch"
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Link */}
                  {answersQualification && (
                    <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <Calendar className="h-4 w-4 text-teal-700" />
                        <span>High ICP Fit: Qualified for 20-min strategy review</span>
                      </div>
                      <button
                        onClick={() => setMeetingBooked(true)}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                          meetingBooked
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-teal-700 text-white hover:bg-teal-800'
                        }`}
                      >
                        {meetingBooked ? 'Meeting Booked!' : 'Simulate Booking'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer with Verification Outcome */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            {simulationResultNote ? (
              <span className="flex items-center gap-1.5 text-teal-900 font-medium">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                {simulationResultNote}
              </span>
            ) : (
              <span>Ready to test simulated recipient engagement.</span>
            )}
          </div>
          <button
            onClick={() => setIsFlagshipSimulatorOpen(false)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
};
