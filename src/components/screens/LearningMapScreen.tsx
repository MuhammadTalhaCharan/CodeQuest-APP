import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Check, Lock, Star, Play, Sparkles, BookOpen, Brain } from 'lucide-react';
import { CurriculumTopic, ScreenId } from '../../types';
import { sound } from '../../services/sound';

interface LearningMapScreenProps {
  topics: CurriculumTopic[];
  onBack: () => void;
  onSelectTopic: (topic: CurriculumTopic) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LearningMapScreen: React.FC<LearningMapScreenProps> = ({
  topics,
  onBack,
  onSelectTopic,
  onNavigate,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<CurriculumTopic | null>(null);

  // Reorder topics from START (bottom) to Advanced (top) matching the screenshot:
  // Top: Functions (locked), OOP (locked), Loops (active), Conditions (yellow check), Data Types (green check), Variables (green check), START (character avatar)
  const mapNodes = [
    { id: 'functions', title: 'Functions', status: 'locked' as const, x: 50, y: 70 },
    { id: 'oop', title: 'OOP', status: 'locked' as const, x: 50, y: 155 },
    { id: 'loops', title: 'Loops', status: 'active' as const, x: 50, y: 245 },
    { id: 'conditions', title: 'Conditions', status: 'completed_yellow' as const, x: 50, y: 335 },
    { id: 'data_types', title: 'Data Types', status: 'completed_green' as const, x: 50, y: 425 },
    { id: 'variables', title: 'Variables', status: 'completed_green' as const, x: 50, y: 515 },
  ];

  const handleNodeClick = (nodeId: string) => {
    sound.playClick();
    const topic = topics.find((t) => t.id === nodeId);
    if (topic) {
      setSelectedTopic(topic);
    }
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col bg-[#0b1626] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 bg-[#0c1424]/90 backdrop-blur-md sticky top-0 z-30 border-b border-cyan-900/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="w-10 h-10 rounded-xl bg-[#131f36] border border-cyan-800/40 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white tracking-wide">
            Python Learning Path
          </h1>
        </div>

        <button
          onClick={() => sound.playClick()}
          className="w-10 h-10 rounded-xl hover:bg-[#131f36] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* RPG Game Map Scrollable Area */}
      <div className="relative flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Background Fantasy Nature SVG Illustration */}
        <div className="relative w-full h-[650px] bg-gradient-to-b from-[#0a232f] via-[#093527] to-[#0d2a1d] overflow-hidden select-none">
          {/* River & Valley Shapes */}
          <svg
            viewBox="0 0 360 650"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="50%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#65a30d" />
              </linearGradient>
              <filter id="glowNode" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* River Stream */}
            <path
              d="M 40,0 Q 15,180 80,300 T 20,520 Q 0,600 30,650 L 0,650 L 0,0 Z"
              fill="url(#riverGrad)"
              opacity="0.65"
            />
            <path
              d="M 330,220 Q 360,350 300,480 T 340,650 L 360,650 L 360,220 Z"
              fill="url(#riverGrad)"
              opacity="0.5"
            />

            {/* Winding Cobblestone Grass Path connecting the nodes */}
            <path
              d="M 180,620 Q 170,560 180,515 Q 210,470 180,425 Q 140,380 180,335 Q 220,290 180,245 Q 150,200 180,155 Q 200,110 180,70"
              fill="none"
              stroke="#4d7c0f"
              strokeWidth="38"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 180,620 Q 170,560 180,515 Q 210,470 180,425 Q 140,380 180,335 Q 220,290 180,245 Q 150,200 180,155 Q 200,110 180,70"
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Stepping Path Dots */}
            <path
              d="M 180,620 Q 170,560 180,515 Q 210,470 180,425 Q 140,380 180,335 Q 220,290 180,245 Q 150,200 180,155 Q 200,110 180,70"
              fill="none"
              stroke="#fef08a"
              strokeWidth="4"
              strokeDasharray="6 14"
              strokeLinecap="round"
            />
          </svg>

          {/* Map Nodes Render */}
          {mapNodes.map((node) => {
            const isLoopsActive = node.status === 'active';
            const isLocked = node.status === 'locked';
            const isGreenDone = node.status === 'completed_green';
            const isYellowDone = node.status === 'completed_yellow';

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer transition-transform active:scale-95 group"
                style={{ top: `${node.y}px` }}
              >
                {/* Node Label Capsule */}
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xl transition-all ${
                    isLoopsActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-300 text-white shadow-[0_0_24px_rgba(6,182,212,0.8)] scale-110'
                      : isLocked
                      ? 'bg-[#182030]/90 border-slate-700/60 text-slate-400'
                      : isYellowDone
                      ? 'bg-[#14231b] border-amber-400/80 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                      : 'bg-[#12281a] border-emerald-400/80 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                  }`}
                >
                  {/* Icon Indicator */}
                  {isLoopsActive ? (
                    <div className="w-5 h-5 rounded-full bg-cyan-200 text-blue-900 flex items-center justify-center">
                      <Star className="w-3.5 h-3.5 fill-blue-900" />
                    </div>
                  ) : isLocked ? (
                    <div className="w-4 h-4 text-slate-400 flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        isYellowDone ? 'bg-amber-400 text-slate-950' : 'bg-emerald-400 text-slate-950'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  <span className="font-extrabold text-xs tracking-wide">{node.title}</span>
                </div>
              </div>
            );
          })}

          {/* START Point at Bottom with 3D Character Avatar */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
            style={{ top: '575px' }}
            onClick={() => handleNodeClick('variables')}
          >
            {/* 3D Character Avatar Standing on Path */}
            <div className="relative mb-1">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/40 animate-bounce">
                <img
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80"
                  alt="Talha Avatar"
                  className="w-full h-full rounded-[14px] object-cover"
                />
              </div>
            </div>

            {/* START Badge */}
            <div className="px-3 py-1 rounded-md bg-[#6d28d9] text-white font-extrabold text-[10px] tracking-widest shadow-md shadow-purple-950">
              START
            </div>
          </div>
        </div>
      </div>

      {/* Selected Topic Details Modal / Action Sheet */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#141838] border border-cyan-500/40 p-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">{selectedTopic.title}</h3>
              </div>
              <span className="text-xs font-bold text-cyan-400 px-2 py-0.5 bg-cyan-950 rounded-full border border-cyan-800">
                {selectedTopic.progress}% Complete
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedTopic.summary}
            </p>

            <div className="space-y-1.5 bg-[#0e122b] p-3 rounded-xl border border-purple-900/30">
              <span className="text-[11px] font-bold text-purple-300">You will learn:</span>
              {selectedTopic.learningPoints.slice(0, 3).map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTopic(selectedTopic);
                  onNavigate('lesson_explanation');
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-600/40 text-purple-200 text-xs font-bold cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explanation</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTopic(selectedTopic);
                  onNavigate('ai_mentor');
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-600/40 text-cyan-200 text-xs font-bold cursor-pointer"
              >
                <Brain className="w-4 h-4" />
                <span>AI Explain</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTopic(selectedTopic);
                  onNavigate('code_challenge');
                }}
                className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Code Challenge
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTopic(selectedTopic);
                  if (selectedTopic.id === 'conditions') {
                    onNavigate('decision_maze');
                  } else if (selectedTopic.id === 'variables') {
                    onNavigate('syntax_puzzle');
                  } else {
                    onNavigate('game_loop');
                  }
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/30 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Play Game</span>
              </button>
            </div>

            <button
              onClick={() => setSelectedTopic(null)}
              className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
