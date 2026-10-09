import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, PhoneCall } from 'lucide-react';

interface AudioPlayerProps {
  callerName: string;
  callerNumber: string;
  durationSeconds: number;
  transcript: string;
  summary: string;
}

export const AudioPlayerSimulation: React.FC<AudioPlayerProps> = ({
  callerName,
  callerNumber,
  durationSeconds,
  transcript,
  summary
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationSeconds]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetAudio = () => {
    setIsPlaying(false);
    setCurrentProgress(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{callerName}</div>
            <div className="text-xs text-slate-500 tabular-nums">{callerNumber}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Volume2 className="h-4 w-4 text-slate-400" />
          <span className="tabular-nums">Simulated Voicemail Audio</span>
        </div>
      </div>

      {/* Simulated waveform visualization */}
      <div className="my-4">
        <div className="flex h-12 items-center gap-1 overflow-hidden px-1">
          {Array.from({ length: 32 }).map((_, i) => {
            const heightMultiplier = Math.sin((i / 32) * Math.PI) * 0.7 + 0.3;
            const barHeight = Math.max(12, Math.floor(40 * heightMultiplier));
            const playedRatio = currentProgress / durationSeconds;
            const isPlayed = i / 32 <= playedRatio;

            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all duration-200 ${
                  isPlayed ? 'bg-rose-500' : 'bg-slate-200'
                }`}
                style={{
                  height: isPlaying ? `${Math.floor(barHeight * (0.8 + Math.random() * 0.4))}px` : `${barHeight}px`
                }}
              />
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-slate-500 tabular-nums">
          <span>{formatTime(currentProgress)}</span>
          <span>{formatTime(durationSeconds)}</span>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
          {isPlaying ? 'Pause Audio' : 'Play Voicemail Recording'}
        </button>

        <button
          onClick={resetAudio}
          className="flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
          title="Restart Recording"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Synchronized Transcript */}
      <div className="mt-5 rounded-lg bg-slate-50 p-4 border border-slate-100">
        <div className="text-xs font-medium text-slate-500 mb-1">Live Transcript:</div>
        <p className="text-sm leading-relaxed text-slate-800 italic">
          "{transcript}"
        </p>
        <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-900">Rachel's Triage Summary:</span>
          <span>{summary}</span>
        </div>
      </div>
    </div>
  );
};
