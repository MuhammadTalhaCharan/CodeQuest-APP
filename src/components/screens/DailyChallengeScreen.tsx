import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Trophy, Calculator, Sparkles, Coins, CheckCircle2, Play, AlertCircle } from 'lucide-react';
import { DailyChallenge } from '../../types';
import { sound } from '../../services/sound';

interface DailyChallengeScreenProps {
  challenge: DailyChallenge;
  onBack: () => void;
  onComplete: (xp: number, coins: number) => void;
}

export const DailyChallengeScreen: React.FC<DailyChallengeScreenProps> = ({
  challenge,
  onBack,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeOp, setActiveOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [numA, setNumA] = useState(12);
  const [numB, setNumB] = useState(4);
  const [completed, setCompleted] = useState(challenge.isCompleted);

  const calculateResult = () => {
    switch (activeOp) {
      case '+':
        return numA + numB;
      case '-':
        return numA - numB;
      case '*':
        return numA * numB;
      case '/':
        return numA / numB;
    }
  };

  const handleFinish = () => {
    sound.playCorrect();
    sound.playFanfare();
    setCompleted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {}
    onComplete(challenge.xpReward, challenge.coinReward);
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between px-6 pt-5 pb-8 bg-gradient-to-b from-[#0b0e1b] via-[#12102f] to-[#070914] text-white">
      {/* Top Header */}
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
      </div>

      {!isPlaying ? (
        /* Overview Screen matching Screenshot 12 */
        <div className="my-auto flex flex-col items-center text-center space-y-6">
          {/* Giant Gold Trophy Artwork */}
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-1 shadow-[0_0_50px_rgba(245,158,11,0.5)] animate-float flex items-center justify-center">
              <div className="w-full h-full bg-[#121630] rounded-[22px] flex items-center justify-center">
                <Trophy className="w-16 h-16 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Daily Challenge
            </h1>
            <p className="mt-1.5 text-xs text-slate-400 max-w-xs font-medium">
              Complete today's task and earn bonus XP
            </p>
          </div>

          {/* Challenge Card matching Screenshot 12 */}
          <div className="w-full max-w-sm p-5 rounded-3xl bg-[#141838] border border-blue-500/30 shadow-2xl text-left space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-600/30 flex-shrink-0">
                <Calculator className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white">
                  {challenge.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            </div>

            {/* Reward Badges matching Screenshot 12 */}
            <div className="flex items-center justify-around pt-2 border-t border-purple-900/30">
              <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>+{challenge.xpReward} XP</span>
              </div>

              <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs">
                <Coins className="w-4 h-4 fill-amber-400" />
                <span>+{challenge.coinReward} Coins</span>
              </div>
            </div>
          </div>

          {/* Start Challenge Button matching Screenshot 12 */}
          <div className="w-full max-w-sm pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setIsPlaying(true);
              }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-[0_0_28px_rgba(79,70,229,0.5)] active:scale-98 transition-all cursor-pointer"
            >
              {completed ? 'Play Again' : 'Start Challenge'}
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Calculator Puzzle */
        <div className="my-auto space-y-4">
          <div className="p-4 rounded-2xl bg-[#141838] border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase">
                Interactive Testing Sandbox
              </span>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to Brief
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Test your Python calculator logic by choosing operators and inputs:
            </p>

            {/* Inputs & Operator Selector */}
            <div className="flex items-center justify-center gap-2 py-3 bg-[#0d1024] rounded-xl border border-purple-950 font-mono text-lg">
              <input
                type="number"
                value={numA}
                onChange={(e) => setNumA(Number(e.target.value))}
                className="w-16 bg-[#1a1f3d] text-center rounded-lg py-1 text-white border border-cyan-500/40"
              />

              <div className="flex gap-1">
                {(['+', '-', '*', '/'] as const).map((op) => (
                  <button
                    key={op}
                    onClick={() => {
                      sound.playClick();
                      setActiveOp(op);
                    }}
                    className={`w-8 h-8 rounded-lg font-bold text-sm transition-all ${
                      activeOp === op
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                        : 'bg-[#1b2046] text-slate-300 hover:bg-[#232959]'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={numB}
                onChange={(e) => setNumB(Number(e.target.value))}
                className="w-16 bg-[#1a1f3d] text-center rounded-lg py-1 text-white border border-cyan-500/40"
              />

              <span className="text-slate-400">=</span>
              <span className="text-emerald-400 font-bold px-2 py-1 bg-emerald-950/60 rounded-lg border border-emerald-500/40">
                {calculateResult()}
              </span>
            </div>

            {/* Python Code View */}
            <pre className="p-3 rounded-xl bg-[#090b16] font-mono text-xs text-slate-300 overflow-x-auto">
              <span className="text-purple-400">def</span> <span className="text-blue-400">calculate</span>(a, b, op):{'\n'}
              {'    '}<span className="text-purple-400">if</span> op == <span className="text-emerald-400">'+'</span>: <span className="text-purple-400">return</span> a + b{'\n'}
              {'    '}<span className="text-purple-400">elif</span> op == <span className="text-emerald-400">'-'</span>: <span className="text-purple-400">return</span> a - b{'\n'}
              {'    '}<span className="text-purple-400">elif</span> op == <span className="text-emerald-400">'*'</span>: <span className="text-purple-400">return</span> a * b{'\n'}
              {'    '}<span className="text-purple-400">elif</span> op == <span className="text-emerald-400">'/'</span>: <span className="text-purple-400">return</span> a / b
            </pre>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-[0_0_24px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
          >
            {completed ? 'Challenge Verified! Return' : 'Submit & Claim Rewards'}
          </button>
        </div>
      )}
    </div>
  );
};
