import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, Shuffle, ChevronRight, Sparkles } from 'lucide-react';
import { CHALLENGE_ROUNDS_POOL } from '../../data/curriculum';
import { sound } from '../../services/sound';

interface CodeChallengeScreenProps {
  onBack: () => void;
  onSuccess: (xp: number, coins: number) => void;
}

export const CodeChallengeScreen: React.FC<CodeChallengeScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentChallenge = CHALLENGE_ROUNDS_POOL[currentIdx];

  const handleSelect = (opt: string) => {
    sound.playClick();
    setSelectedOption(opt);
    setIsChecked(false);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setIsChecked(true);

    if (selectedOption === currentChallenge.correctAnswer) {
      setIsCorrect(true);
      sound.playCorrect();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {}
      onSuccess(50, 20);
    } else {
      setIsCorrect(false);
      sound.playWrong();
    }
  };

  const handleNextChallenge = () => {
    sound.playClick();
    const nextIdx = (currentIdx + 1) % CHALLENGE_ROUNDS_POOL.length;
    setCurrentIdx(nextIdx);
    setSelectedOption(null);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const handleShuffle = () => {
    sound.playClick();
    let randomIdx = Math.floor(Math.random() * CHALLENGE_ROUNDS_POOL.length);
    if (randomIdx === currentIdx) {
      randomIdx = (currentIdx + 1) % CHALLENGE_ROUNDS_POOL.length;
    }
    setCurrentIdx(randomIdx);
    setSelectedOption(null);
    setIsChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between px-5 pt-4 pb-8 bg-gradient-to-b from-[#0b0e1b] via-[#10132e] to-[#080a16] text-white">
      {/* Top Header matching Screenshot 7 */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-purple-900/30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="w-10 h-10 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-700/30 flex items-center justify-center text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-wide">
                Complete the Code
              </h1>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">
                Challenge {currentIdx + 1} of {CHALLENGE_ROUNDS_POOL.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/40 text-purple-300 text-xs font-semibold cursor-pointer transition-colors"
            title="Randomize challenge"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
        </div>

        {/* Challenge Instruction */}
        <div className="mt-4 flex items-start gap-2">
          <span className="text-cyan-400 font-bold">•</span>
          <p className="text-sm font-medium text-slate-200">
            {currentChallenge.instruction}
          </p>
        </div>

        {/* Code Snippet Box matching Screenshot 7 */}
        <div className="mt-4 rounded-2xl bg-[#090b16] border border-purple-900/50 p-5 shadow-2xl relative overflow-hidden font-mono text-sm leading-relaxed">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs text-slate-500">
            <span>challenge_{currentIdx + 1}.code</span>
            <span className="text-purple-400 font-semibold">{currentChallenge.language}</span>
          </div>

          <pre className="text-slate-100 overflow-x-auto whitespace-pre-wrap">
            {currentChallenge.codeSnippet.split(currentChallenge.blankPlaceholder).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span
                    className={`inline-block px-3 py-0.5 rounded-lg border-2 transition-all font-bold ${
                      selectedOption
                        ? 'bg-purple-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                        : 'bg-slate-900 border-dashed border-slate-600 text-slate-500'
                    }`}
                  >
                    {selectedOption || currentChallenge.blankPlaceholder}
                  </span>
                )}
              </React.Fragment>
            ))}
          </pre>
        </div>

        {/* Options Row */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {currentChallenge.options.map((opt) => {
            const isSel = selectedOption === opt;
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`flex-1 py-3 px-2 rounded-2xl font-mono text-base sm:text-lg font-bold cursor-pointer transition-all border text-center ${
                  isSel
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 border-cyan-400 text-white shadow-[0_0_18px_rgba(6,182,212,0.5)] scale-105'
                    : 'bg-[#141836] border-purple-900/40 text-slate-200 hover:bg-[#1a1f42]'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Action Button: Check or Next Challenge */}
        <div className="mt-5">
          {isChecked && isCorrect ? (
            <button
              onClick={handleNextChallenge}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_24px_rgba(6,182,212,0.5)] cursor-pointer"
            >
              <span>Next Challenge</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_24px_rgba(147,51,234,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              CHECK
            </button>
          )}
        </div>

        {/* Feedback Banner if Checked */}
        {isChecked && (
          <div
            className={`mt-4 p-4 rounded-2xl border flex items-start gap-3 transition-all ${
              isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/40 border-red-500/50 text-red-200'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm">
                {isCorrect ? 'Outstanding! Challenge Completed 🎉' : 'Not quite!'}
              </p>
              <p className="text-xs mt-1 text-slate-300">
                {isCorrect ? currentChallenge.explanation : `You selected ${selectedOption}. Check the hint below!`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hint Card Box matching Screenshot 7 */}
      <div className="mt-auto p-4 rounded-2xl bg-[#141836]/90 border border-purple-800/40 shadow-md">
        <div className="flex items-center gap-2 text-amber-400">
          <Lightbulb className="w-4 h-4 fill-amber-400" />
          <h4 className="font-bold text-xs uppercase tracking-wide">Hint</h4>
        </div>
        <p className="mt-1.5 text-xs text-slate-300 pl-6 leading-relaxed">
          • {currentChallenge.hint}
        </p>
      </div>
    </div>
  );
};
