import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Play, CheckCircle2, XCircle, Sparkles, ChevronRight, Grid, Star } from 'lucide-react';
import { sound } from '../../services/sound';

interface LoopPatternsGameScreenProps {
  onBack: () => void;
  onSuccess: (xp: number, coins: number) => void;
}

interface PatternRound {
  round: number;
  title: string;
  description: string;
  expectedPattern: string[];
  initialOuter: number;
  initialInner: number;
  targetOuter: number;
  targetInner: number;
  targetSymbol: string;
  pythonSnippet: string;
}

const PATTERN_ROUNDS: PatternRound[] = [
  {
    round: 1,
    title: 'Round 1: 5-Star Beam',
    description: 'Construct a single for-loop that renders a 5-star laser beam across the screen.',
    expectedPattern: ['⭐ ⭐ ⭐ ⭐ ⭐'],
    initialOuter: 1,
    initialInner: 3,
    targetOuter: 1,
    targetInner: 5,
    targetSymbol: '⭐',
    pythonSnippet: 'for star in range(5):\n    render("⭐")',
  },
  {
    round: 2,
    title: 'Round 2: Coin Matrix Grid (3x3)',
    description: 'Use nested loops (rows and columns) to generate a 3x3 grid of gold coins.',
    expectedPattern: [
      '🪙 🪙 🪙',
      '🪙 🪙 🪙',
      '🪙 🪙 🪙',
    ],
    initialOuter: 2,
    initialInner: 2,
    targetOuter: 3,
    targetInner: 3,
    targetSymbol: '🪙',
    pythonSnippet: 'for row in range(3):\n    for col in range(3):\n        render("🪙")',
  },
  {
    round: 3,
    title: 'Round 3: Staircase Pyramid',
    description: 'A growing stair loop: each row adds one more crystal gem!',
    expectedPattern: [
      '💎',
      '💎 💎',
      '💎 💎 💎',
      '💎 💎 💎 💎',
    ],
    initialOuter: 2,
    initialInner: 2,
    targetOuter: 4,
    targetInner: 4,
    targetSymbol: '💎',
    pythonSnippet: 'for row in range(1, 5):\n    render("💎" * row)',
  },
  {
    round: 4,
    title: 'Round 4: Boss Matrix Grid (4x5)',
    description: 'Final loop geometry! Render 4 rows by 5 columns of power orbs.',
    expectedPattern: [
      '🔮 🔮 🔮 🔮 🔮',
      '🔮 🔮 🔮 🔮 🔮',
      '🔮 🔮 🔮 🔮 🔮',
      '🔮 🔮 🔮 🔮 🔮',
    ],
    initialOuter: 3,
    initialInner: 3,
    targetOuter: 4,
    targetInner: 5,
    targetSymbol: '🔮',
    pythonSnippet: 'for row in range(4):\n    for col in range(5):\n        render("🔮")',
  },
];

export const LoopPatternsGameScreen: React.FC<LoopPatternsGameScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const currentRound = PATTERN_ROUNDS[roundIdx];

  const [outerCount, setOuterCount] = useState(currentRound.initialOuter);
  const [innerCount, setInnerCount] = useState(currentRound.initialInner);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate preview based on current parameters
  const generateCurrentPattern = (): string[] => {
    if (currentRound.round === 3) {
      // Pyramid
      const rows: string[] = [];
      for (let r = 1; r <= outerCount; r++) {
        rows.push(new Array(r).fill(currentRound.targetSymbol).join(' '));
      }
      return rows;
    }
    const rows: string[] = [];
    for (let r = 0; r < outerCount; r++) {
      rows.push(new Array(innerCount).fill(currentRound.targetSymbol).join(' '));
    }
    return rows;
  };

  const renderedPattern = generateCurrentPattern();

  const handleRun = () => {
    sound.playMove();
    setIsGenerated(true);

    const matches =
      outerCount === currentRound.targetOuter && innerCount === currentRound.targetInner;

    if (matches) {
      sound.playCorrect();
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
      onSuccess(60, 30);
    } else {
      sound.playWrong();
      setIsSuccess(false);
    }
  };

  const handleNextRound = () => {
    sound.playClick();
    if (roundIdx < PATTERN_ROUNDS.length - 1) {
      const next = roundIdx + 1;
      setRoundIdx(next);
      setOuterCount(PATTERN_ROUNDS[next].initialOuter);
      setInnerCount(PATTERN_ROUNDS[next].initialInner);
      setIsGenerated(false);
      setIsSuccess(false);
    } else {
      sound.playFanfare();
      alert('🏆 ALL LOOP PATTERNS MASTERED! You have conquered nested iterations!');
      onBack();
    }
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between px-5 pt-4 pb-8 bg-gradient-to-b from-[#0b0e1b] via-[#10132e] to-[#080a16] text-white">
      {/* Top Header */}
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
                Loop Matrix Builder
              </h1>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">
                Round {currentRound.round} of {PATTERN_ROUNDS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Round Description */}
        <div className="mt-4 p-3 rounded-2xl bg-[#141838] border border-cyan-500/30 space-y-1">
          <span className="text-[10px] font-bold text-amber-400 font-mono uppercase">
            {currentRound.title}
          </span>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {currentRound.description}
          </p>
        </div>

        {/* Visual Target vs Render Canvas */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {/* Target Pattern */}
          <div className="p-3 rounded-2xl bg-[#090b18] border border-purple-900/40 space-y-2">
            <span className="text-[10px] font-mono text-purple-300 font-bold uppercase block">
              Target Blueprint
            </span>
            <div className="min-h-[110px] flex flex-col items-center justify-center font-mono text-xs space-y-1 bg-[#121630] rounded-xl p-2">
              {currentRound.expectedPattern.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          {/* Your Generated Loop Matrix */}
          <div className="p-3 rounded-2xl bg-[#090b18] border border-cyan-500/30 space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
              Your Loop Output
            </span>
            <div className="min-h-[110px] flex flex-col items-center justify-center font-mono text-xs space-y-1 bg-[#121630] rounded-xl p-2 border border-cyan-500/20">
              {renderedPattern.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Loop Variable Sliders / Steppers */}
        <div className="mt-4 p-4 rounded-2xl bg-[#141838] border border-purple-900/50 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">Outer Loop (Rows):</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setOuterCount((c) => Math.max(1, c - 1));
                  setIsGenerated(false);
                }}
                className="w-7 h-7 rounded-lg bg-[#1a1f42] hover:bg-cyan-600 font-bold text-white cursor-pointer"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-cyan-300 text-sm">
                {outerCount}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setOuterCount((c) => Math.min(6, c + 1));
                  setIsGenerated(false);
                }}
                className="w-7 h-7 rounded-lg bg-[#1a1f42] hover:bg-cyan-600 font-bold text-white cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {currentRound.round !== 3 && (
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Inner Loop (Columns):</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setInnerCount((c) => Math.max(1, c - 1));
                    setIsGenerated(false);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#1a1f42] hover:bg-cyan-600 font-bold text-white cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-cyan-300 text-sm">
                  {innerCount}
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setInnerCount((c) => Math.min(6, c + 1));
                    setIsGenerated(false);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#1a1f42] hover:bg-cyan-600 font-bold text-white cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Code Representation */}
          <pre className="p-2 rounded-xl bg-[#090b16] font-mono text-[11px] text-emerald-400 overflow-x-auto">
            {currentRound.pythonSnippet}
          </pre>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          {isGenerated && isSuccess ? (
            <button
              onClick={handleNextRound}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_24px_rgba(6,182,212,0.5)] cursor-pointer"
            >
              <span>
                {roundIdx < PATTERN_ROUNDS.length - 1
                  ? `Proceed to Round ${roundIdx + 2}`
                  : 'All Loop Matrix Puzzles Solved! 🏆'}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleRun}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-slate-950 font-extrabold text-sm tracking-wider uppercase shadow-[0_0_24px_rgba(34,197,94,0.5)] cursor-pointer"
            >
              GENERATE LOOP PATTERN
            </button>
          )}
        </div>

        {/* Feedback Alert */}
        {isGenerated && (
          <div
            className={`mt-4 p-4 rounded-2xl border flex items-start gap-3 transition-all ${
              isSuccess
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/40 border-red-500/50 text-red-200'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm">
                {isSuccess ? 'Matrix Match! Perfect Loops 🎉' : 'Dimensions Mismatch!'}
              </p>
              <p className="text-xs mt-1 text-slate-300">
                {isSuccess
                  ? 'Your outer and inner iteration counters match the target blueprint precisely!'
                  : `Currently ${outerCount} row(s) and ${innerCount} column(s). Target requires ${currentRound.targetOuter} row(s) and ${currentRound.targetInner} column(s).`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
