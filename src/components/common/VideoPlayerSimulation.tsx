import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Subtitles, Globe, Film } from 'lucide-react';

interface Scene {
  title: string;
  duration: number; // seconds
  visualDescription: string;
  subtitles: {
    en: string;
    es: string;
    fr: string;
  };
}

export const VideoPlayerSimulation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'fr'>('en');

  const scenes: Scene[] = [
    {
      title: 'Scene 1: The Executive Paradox',
      duration: 5,
      visualDescription: 'Overhead shot of busy founder workspace, multiple calendars flashing with red scheduling alerts.',
      subtitles: {
        en: 'Most founders lose over 60% of their day managing administrative friction.',
        es: 'La mayoría de los fundadores pierden más del 60% de su día en fricción administrativa.',
        fr: 'La plupart des fondateurs perdent plus de 60% de leur journée dans la friction administrative.'
      }
    },
    {
      title: 'Scene 2: Autonomous Team Coordination',
      duration: 6,
      visualDescription: 'Clean split screen showing AI teammates Aria, Jordan, and Soren handling inquiries in real time.',
      subtitles: {
        en: 'With dedicated AI employees, delegation becomes clear, auditable, and instant.',
        es: 'Con empleados de IA dedicados, la delegación es clara, auditable e instantánea.',
        fr: 'Avec des employés d\'IA dédiés, la délégation devient claire, vérifiable et instantanée.'
      }
    },
    {
      title: 'Scene 3: Reclaiming Founder Focus',
      duration: 5,
      visualDescription: 'Executive leading high-leverage strategic session with calm confidence. Cedar & Co logo mark resolves.',
      subtitles: {
        en: 'Master the operating rhythms that give modern leaders their weekends back.',
        es: 'Domine los ritmos operativos que devuelven a los líderes sus fines de semana.',
        fr: 'Maîtrisez les rythmes opérationnels qui redonnent leurs week-ends aux dirigeants.'
      }
    }
  ];

  const currentScene = scenes[activeSceneIndex];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setSceneProgress((prev) => {
          if (prev >= currentScene.duration) {
            // Next scene
            if (activeSceneIndex < scenes.length - 1) {
              setActiveSceneIndex((idx) => idx + 1);
              return 0;
            } else {
              setIsPlaying(false);
              setActiveSceneIndex(0);
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeSceneIndex, currentScene.duration, scenes.length]);

  const restartVideo = () => {
    setIsPlaying(false);
    setActiveSceneIndex(0);
    setSceneProgress(0);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Film className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-semibold text-slate-900">Campaign Teaser Video Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-slate-100 p-1">
            {(['en', 'es', 'fr'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                  selectedLanguage === lang ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
            className={`p-1.5 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors ${
              subtitlesEnabled
                ? 'border-purple-200 bg-purple-50 text-purple-700'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
            title="Toggle Subtitles"
          >
            <Subtitles className="h-3.5 w-3.5" />
            <span className="text-xs">CC</span>
          </button>
        </div>
      </div>

      {/* Video Viewport Simulation */}
      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg bg-slate-950 flex flex-col items-center justify-center text-center p-6 select-none">
        {/* Animated backdrop simulation */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-purple-900 via-indigo-900 to-slate-900" />

        {/* Scene visualization */}
        <div className="relative z-10 max-w-lg">
          <div className="text-xs font-medium uppercase tracking-wider text-purple-400 mb-2">
            {currentScene.title}
          </div>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            {currentScene.visualDescription}
          </p>

          {/* Subtitles Overlay */}
          {subtitlesEnabled && (
            <div className="mt-8 inline-block rounded-md bg-black/85 px-4 py-2 text-sm text-white font-medium shadow-md">
              {currentScene.subtitles[selectedLanguage]}
            </div>
          )}
        </div>

        {/* Timeline bar at bottom of player */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-900 hover:bg-slate-200 transition-colors"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
          </button>

          {/* Progress track */}
          <div className="flex-1 flex items-center gap-1.5">
            {scenes.map((scene, idx) => {
              const isPast = idx < activeSceneIndex;
              const isCurrent = idx === activeSceneIndex;
              const widthRatio = (sceneProgress / scene.duration) * 100;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setSceneProgress(0);
                  }}
                  className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                  title={scene.title}
                >
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{
                      width: isPast ? '100%' : isCurrent ? `${widthRatio}%` : '0%'
                    }}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={restartVideo}
            className="text-white/70 hover:text-white p-1"
            title="Restart"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Storyboard Scene Selector */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {scenes.map((scene, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveSceneIndex(idx);
              setSceneProgress(0);
            }}
            className={`p-2.5 text-left rounded-lg border transition-colors ${
              activeSceneIndex === idx
                ? 'border-purple-600 bg-purple-50/50'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-xs font-semibold text-slate-900">0{idx + 1}. Scene</div>
            <div className="text-xs text-slate-500 truncate mt-0.5">{scene.title.split(': ')[1]}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
