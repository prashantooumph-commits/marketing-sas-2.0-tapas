import React, { useState } from 'react';
import { useOoumph } from '../../../store/ooumphStore';
import { MessageSquare, ShieldAlert, CheckCircle2, AlertCircle, Send, Trash2 } from 'lucide-react';

interface CommentItem {
  id: string;
  author: string;
  platform: 'LinkedIn' | 'Instagram' | 'X';
  text: string;
  sentiment: 'Positive' | 'Neutral' | 'Critical';
  status: 'Pending' | 'Replied' | 'Escalated';
  proposedReply: string;
}

export const CommunityManagerArtifact: React.FC = () => {
  const { activeWorkspace } = useOoumph();

  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'com-1',
      author: 'Jonathan Reed (COO)',
      platform: 'LinkedIn',
      text: 'Is the time commitment really only 3.5 hours weekly? Most executive seminars claim that and end up requiring 15 hours of busywork.',
      sentiment: 'Critical',
      status: 'Pending',
      proposedReply: 'Fair skepticism, Jonathan! Our 3.5-hour weekly architecture is strictly bounded: one 90-minute tactical live session plus 2 hours of async peer review. We specifically forbid busywork workbooks—every exercise is applied directly to your real operational calendar.'
    },
    {
      id: 'com-2',
      author: 'Maya Lin',
      platform: 'LinkedIn',
      text: 'Our team completed the Q2 fellowship—saved our managers at least 8 hours a week in meeting churn. Highly recommend!',
      sentiment: 'Positive',
      status: 'Pending',
      proposedReply: 'Thank you Maya! Thrilled to hear the operational rhythms are delivering for your leadership team.'
    },
    {
      id: 'com-3',
      author: 'CryptoBountyBot99',
      platform: 'X',
      text: 'DM me for instant 10,000 followers and crypto trading profits telegram link!',
      sentiment: 'Neutral',
      status: 'Pending',
      proposedReply: '[Flagged as promotional spam. Safe removal suggested.]'
    }
  ]);

  const [activeCommentId, setActiveCommentId] = useState('com-1');
  const activeComment = comments.find((c) => c.id === activeCommentId) || comments[0];
  const [replyText, setReplyText] = useState(activeComment.proposedReply);

  const handleSelectComment = (c: CommentItem) => {
    setActiveCommentId(c.id);
    setReplyText(c.proposedReply);
  };

  const handlePublishReply = () => {
    setComments((prev) =>
      prev.map((c) => (c.id === activeCommentId ? { ...c, status: 'Replied' } : c))
    );
  };

  const handleDeleteSpam = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Community Moderation & Sentiment Triage</h3>
            <p className="text-xs text-slate-500">Chloe Mercer · Public Comments Queue</p>
          </div>
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
            Public Reputation
          </span>
        </div>

        {/* Anti-Censorship Policy Banner */}
        <div className="my-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 leading-relaxed">
          <strong>Community Standard:</strong> Critical feedback and thoughtful objections are addressed respectfully with factual evidence. Negative sentiment alone does not trigger automated comment deletion.
        </div>

        {/* Comments Queue */}
        <div className="space-y-2 my-4">
          {comments.map((c) => (
            <div
              key={c.id}
              onClick={() => handleSelectComment(c)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                activeCommentId === c.id
                  ? 'border-rose-400 bg-rose-50/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-900">{c.author}</span>
                  <span className="text-[10px] text-slate-400">{c.platform}</span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      c.sentiment === 'Positive'
                        ? 'bg-emerald-100 text-emerald-800'
                        : c.sentiment === 'Critical'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {c.sentiment}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 mt-1">{c.text}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{c.status}</span>
                {c.author.includes('Bot') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSpam(c.id);
                    }}
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                    title="Remove Spam Comment"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Active Comment Reply Editor */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
          <div className="text-xs">
            <span className="font-bold text-slate-900">{activeComment.author}:</span>
            <p className="text-slate-800 mt-0.5 italic">"{activeComment.text}"</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Chloe's Recommended Public Response:
            </label>
            <textarea
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full rounded-md border border-slate-200 p-2.5 text-xs text-slate-800 bg-white leading-relaxed focus:border-rose-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              {activeComment.status === 'Replied' ? '✓ Public reply posted' : 'Simulate public response'}
            </span>
            <button
              onClick={handlePublishReply}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
            >
              <Send className="h-3 w-3" />
              <span>{activeComment.status === 'Replied' ? 'Sent' : 'Publish Reply'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
