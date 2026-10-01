import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { LearningLevel } from '../../types';
import { sound } from '../../services/sound';

interface LevelSelectionScreenProps {
  onSelectLevel: (level: LearningLevel) => void;
  onFinish: () => void;
}

export const LevelSelectionScreen: React.FC<LevelSelectionScreenProps> = ({
  onSelectLevel,
  onFinish,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>('beginner');
  const [showPlacement, setShowPlacement] = useState(false);
  const [placementAnswers, setPlacementAnswers] = useState<number[]>([]);
  const [placementDone, setPlacementDone] = useState(false);

  const levels: { id: LearningLevel; title: string; subtitle: string; icon: string; xpBonus: string }[] = [
    {
      id: 'beginner',
      title: 'Beginner',
      subtitle: 'New to coding or want to build rock-solid fundamentals.',
      icon: '🌱',
      xpBonus: 'Starts from Level 1',
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      subtitle: 'Know variables and loops; ready for functions and data structures.',
      icon: '⚡',
      xpBonus: 'Unlocks Mid-Path Nodes',
    },
    {
      id: 'advanced',
      title: 'Advanced',
      subtitle: 'Experienced developer mastering algorithms, OOP, and system design.',
      icon: '🚀',
      xpBonus: 'Full Speed Boss Challenges',
    },
  ];

  const placementQuestions = [
    {
      q: 'What is the output of print(2 + 3 * 2)?',
      options: ['10', '8', '7', '12'],
      correct: 1, // 8 due to order of operations
    },
    {
      q: 'Which data structure stores key-value pairs?',
      options: ['List', 'Dictionary / Map', 'Set', 'Tuple'],
      correct: 1,
    },
  ];

  const handleLevelPick = (lvl: LearningLevel) => {
    setSelectedLevel(lvl);
    onSelectLevel(lvl);
    sound.playClick();
  };

  const handleAnswerPlacement = (qIdx: number, ansIdx: number) => {
    const updated = [...placementAnswers];
    updated[qIdx] = ansIdx;
    setPlacementAnswers(updated);
    sound.playClick();

    if (updated.length === placementQuestions.length && !updated.includes(undefined as unknown as number)) {
      setPlacementDone(true);
      const correctCount = updated.filter((ans, idx) => ans === placementQuestions[idx].correct).length;
      if (correctCount === 2) {
        setSelectedLevel('intermediate');
        onSelectLevel('intermediate');
      } else {
        setSelectedLevel('beginner');
        onSelectLevel('beginner');
      }
      sound.playCorrect();
    }
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between px-6 pt-10 pb-8 bg-gradient-to-b from-[#0b0e1b] via-[#10132e] to-[#080a16] text-white">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          What is your programming level?
        </h1>
        <p className="mt-1.5 text-sm text-slate-400 font-medium">
          We’ll adapt the challenges and pace for you.
        </p>
      </div>

      {!showPlacement ? (
        <div className="my-6 space-y-3.5">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl.id;
            return (
              <div
                key={lvl.id}
                onClick={() => handleLevelPick(lvl.id)}
                className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-[#1e1b42] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'bg-[#141836]/80 hover:bg-[#181d42] border border-purple-900/30'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#1b2046] flex items-center justify-center text-2xl flex-shrink-0">
                  {lvl.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-white">{lvl.title}</h3>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{lvl.subtitle}</p>
                  <span className="inline-block mt-2 text-[10px] font-semibold text-purple-300">
                    {lvl.xpBonus}
                  </span>
                </div>
              </div>
            );
          })}

          {/* "I don't know" Placement button */}
          <button
            onClick={() => {
              sound.playClick();
              setShowPlacement(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-950/40 border border-purple-700/40 text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors text-xs font-semibold cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Not sure? Take a 2-minute quick placement test</span>
          </button>
        </div>
      ) : (
        /* Placement Test View */
        <div className="my-6 p-4 rounded-2xl bg-[#141836] border border-purple-600/30 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400">PLACEMENT CHECK</span>
            <button
              onClick={() => setShowPlacement(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          {placementQuestions.map((q, qIdx) => (
            <div key={qIdx} className="space-y-2">
              <p className="text-xs font-semibold text-white">{q.q}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerPlacement(qIdx, oIdx)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono transition-all text-left ${
                      placementAnswers[qIdx] === oIdx
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-[#1b2046] text-slate-200 hover:bg-[#232959]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {placementDone && (
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-center animate-pulse">
              <p className="text-xs font-bold text-cyan-300">
                Recommended Level: <span className="capitalize">{selectedLevel}</span>!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Continue */}
      <div className="mt-auto">
        <button
          onClick={() => {
            sound.playClick();
            onFinish();
          }}
          className="w-full group flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-base shadow-[0_0_24px_rgba(79,70,229,0.5)] hover:shadow-[0_0_32px_rgba(124,58,237,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>Enter CodeQuest</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
