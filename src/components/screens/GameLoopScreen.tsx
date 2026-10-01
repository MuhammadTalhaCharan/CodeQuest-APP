import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Heart, RotateCcw, Play, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';
import { sound } from '../../services/sound';

interface GameLoopScreenProps {
  onBack: () => void;
  onSuccess: (xp: number, coins: number) => void;
}

type CommandType = 'move_forward' | 'repeat' | 'if' | 'collect' | 'jump' | 'step_two';

interface LoopRound {
  round: number;
  mission: string;
  coinCount: number;
  codeSnippet: string;
  requiredCommands: CommandType[];
  hazardIndex?: number;
  description: string;
}

const LOOP_ROUNDS: LoopRound[] = [
  {
    round: 1,
    mission: 'MISSION: Collect all 5 coins!',
    coinCount: 5,
    codeSnippet: 'for i in range(5):\n    move_forward()\n    collect()',
    requiredCommands: ['repeat', 'move_forward', 'collect'],
    description: 'Use Repeat (5x), Move Forward, and Collect to gather every coin in sequence.',
  },
  {
    round: 2,
    mission: 'MISSION: Skip the spike trap with Step 2 Loop!',
    coinCount: 4,
    hazardIndex: 2,
    codeSnippet: 'for i in range(0, 8, 2):\n    step_two()\n    collect()',
    requiredCommands: ['repeat', 'step_two', 'collect'],
    description: 'Spikes are at position 2! Use Step by 2 in your loop to leap over the danger.',
  },
  {
    round: 3,
    mission: 'MISSION: While-Loop: Collect while battery is charged!',
    coinCount: 5,
    codeSnippet: 'while battery > 0:\n    move_forward()\n    if_coin: collect()',
    requiredCommands: ['repeat', 'if', 'collect'],
    description: 'Check battery guard condition and collect only when reaching a coin tile.',
  },
  {
    round: 4,
    mission: 'MISSION: Jump & Loop over Floating Platforms!',
    coinCount: 5,
    codeSnippet: 'for platform in range(5):\n    jump()\n    collect()',
    requiredCommands: ['repeat', 'jump', 'collect'],
    description: 'Loop through elevated platforms by combining repeat with jump and collect.',
  },
  {
    round: 5,
    mission: 'MISSION: BOSS LOOP: Master Iteration Speedrun!',
    coinCount: 6,
    codeSnippet: 'for boss_cycle in range(6):\n    move_forward()\n    collect()',
    requiredCommands: ['repeat', 'move_forward', 'collect'],
    description: 'Final loop boss challenge! Execute 6 precise iterations without mistake.',
  },
];

export const GameLoopScreen: React.FC<GameLoopScreenProps> = ({ onBack, onSuccess }) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [characterPos, setCharacterPos] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState<boolean[]>([false, false, false, false, false, false]);
  const [isRunning, setIsRunning] = useState(false);
  const [programSequence, setProgramSequence] = useState<CommandType[]>(['repeat', 'move_forward', 'collect']);
  const [gameState, setGameState] = useState<'ready' | 'running' | 'completed' | 'failed'>('ready');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Construct your loop sequence and press RUN!');

  const round = LOOP_ROUNDS[currentRoundIdx];

  const addCommand = (cmd: CommandType) => {
    if (isRunning || gameState === 'completed') return;
    sound.playClick();
    if (programSequence.length < 5) {
      setProgramSequence([...programSequence, cmd]);
    }
  };

  const removeCommand = (index: number) => {
    if (isRunning || gameState === 'completed') return;
    sound.playClick();
    setProgramSequence(programSequence.filter((_, i) => i !== index));
  };

  const resetGame = () => {
    setCharacterPos(0);
    setCoinsCollected(new Array(round.coinCount).fill(false));
    setIsRunning(false);
    setGameState('ready');
    setFeedbackMessage('Construct your loop sequence and press RUN!');
  };

  const runProgram = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setGameState('running');
    setCharacterPos(0);
    setCoinsCollected(new Array(round.coinCount).fill(false));
    sound.playMove();

    // Check if player's program matches all required commands for this round
    const isCorrect = round.requiredCommands.every((cmd) => programSequence.includes(cmd));

    if (isCorrect) {
      setFeedbackMessage(`Executing: ${round.codeSnippet.replace(/\n/g, ' ')}`);

      for (let i = 1; i <= round.coinCount; i++) {
        await new Promise((res) => setTimeout(res, 450));
        setCharacterPos(i);
        sound.playCoin();
        setCoinsCollected((prev) => {
          const updated = [...prev];
          updated[i - 1] = true;
          return updated;
        });
      }

      await new Promise((res) => setTimeout(res, 350));
      setGameState('completed');
      sound.playFanfare();
      sound.playCorrect();

      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#a855f7', '#eab308', '#22c55e'],
        });
      } catch {}

      onSuccess(60, 30);
    } else {
      await new Promise((res) => setTimeout(res, 600));
      setCharacterPos(1);
      sound.playWrong();
      setGameState('failed');
      setLives((prev) => Math.max(0, prev - 1));

      if (!programSequence.includes('repeat')) {
        setFeedbackMessage('The robot only ran once! Use "Repeat" to loop across all iterations.');
      } else if (!programSequence.includes('collect')) {
        setFeedbackMessage('You reached the destination but forgot the "Collect" command!');
      } else {
        setFeedbackMessage('Missed required commands for this round. Check instructions and retry!');
      }
    }

    setIsRunning(false);
  };

  const handleNextRound = () => {
    sound.playClick();
    if (currentRoundIdx < LOOP_ROUNDS.length - 1) {
      const nextIdx = currentRoundIdx + 1;
      setCurrentRoundIdx(nextIdx);
      setCharacterPos(0);
      setCoinsCollected(new Array(LOOP_ROUNDS[nextIdx].coinCount).fill(false));
      setIsRunning(false);
      setGameState('ready');
      setProgramSequence([]);
      setFeedbackMessage(`Welcome to Round ${nextIdx + 1}! Construct your new loop.`);
    } else {
      sound.playFanfare();
      alert('🏆 ALL 5 LOOP ROUNDS COMPLETED! You have mastered programming loops!');
      onBack();
    }
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between bg-[#0b0e1b] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 bg-[#0d1022]/90 backdrop-blur-md border-b border-purple-900/30">
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
            <h1 className="text-base font-extrabold text-white tracking-wide">Loops Arcade</h1>
            <span className="text-[10px] text-cyan-400 font-mono font-bold">
              Round {round.round} of {LOOP_ROUNDS.length}
            </span>
          </div>
        </div>

        {/* Lives Counter */}
        <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-800/40 px-3 py-1.5 rounded-full">
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span className="text-sm font-bold text-red-300">{lives}</span>
        </div>
      </div>

      {/* 2D Mini Game Platformer Screen */}
      <div className="relative mx-4 my-2 h-64 rounded-3xl bg-gradient-to-b from-[#22d3ee]/80 via-[#38bdf8]/60 to-[#0369a1] border-2 border-cyan-400/40 shadow-xl overflow-hidden select-none">
        {/* Clouds & Sun */}
        <div className="absolute top-3 left-4 w-12 h-6 bg-white/70 rounded-full blur-[1px]" />
        <div className="absolute top-5 right-8 w-16 h-7 bg-white/75 rounded-full blur-[1px]" />

        {/* Mission Overlay Banner */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-400/50 flex items-center gap-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-extrabold text-cyan-300 tracking-wider uppercase">
            {round.mission}
          </span>
        </div>

        {/* Floating Coins */}
        <div className="absolute bottom-20 left-10 right-6 flex justify-between px-2 z-10">
          {Array.from({ length: round.coinCount }).map((_, idx) => {
            const isCollected = coinsCollected[idx];
            return (
              <div
                key={idx}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCollected
                    ? 'opacity-0 scale-150 -translate-y-4'
                    : 'bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-float'
                }`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="w-5 h-5 rounded-full border border-yellow-100 flex items-center justify-center font-bold text-[10px] text-amber-900">
                  $
                </div>
              </div>
            );
          })}
        </div>

        {/* Hazard Spike if round has it */}
        {round.hazardIndex !== undefined && (
          <div
            className="absolute bottom-14 z-15"
            style={{ left: `${30 + round.hazardIndex * 46}px` }}
          >
            <div className="text-xl">⚠️</div>
          </div>
        )}

        {/* Animated Adventurer Character */}
        <div
          className="absolute bottom-12 z-20 transition-all duration-400 ease-out"
          style={{
            left: `${15 + characterPos * 46}px`,
          }}
        >
          <div className="relative">
            <div className="w-10 h-12 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-amber-200 border-2 border-red-600 relative overflow-hidden">
                <div className="w-full h-2.5 bg-red-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ml-1.5 mt-0.5" />
              </div>
              <div className="w-7 h-5 rounded-md bg-blue-600 border border-blue-400 -mt-0.5" />
              <div className="flex gap-1.5">
                <div className={`w-2 h-2.5 bg-slate-800 rounded-sm ${isRunning ? 'animate-bounce' : ''}`} />
                <div className={`w-2 h-2.5 bg-slate-800 rounded-sm ${isRunning ? 'animate-bounce delay-75' : ''}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Grassy Ground Platform */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-b from-[#16a34a] to-[#14532d] border-t-4 border-[#4ade80]">
          <div className="w-full h-full bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:12px_12px] opacity-70" />
        </div>
      </div>

      {/* Program Sequence Deck */}
      <div className="mx-4 p-3 rounded-2xl bg-[#141836] border border-purple-900/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-cyan-400 font-bold">
            Loop Program: {programSequence.length}/5 commands
          </span>
          <button
            onClick={() => {
              sound.playClick();
              resetGame();
            }}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[44px] p-2 rounded-xl bg-[#0d1024] border border-purple-950">
          {programSequence.length === 0 ? (
            <span className="text-xs text-slate-500 italic my-auto">
              Tap commands below to build your loop...
            </span>
          ) : (
            programSequence.map((cmd, idx) => {
              const labels: Record<CommandType, string> = {
                move_forward: 'Move Forward',
                repeat: 'Repeat Loop',
                if: 'If Battery',
                collect: 'Collect',
                jump: 'Jump Over',
                step_two: 'Step by 2',
              };

              const colors: Record<CommandType, string> = {
                move_forward: 'bg-blue-600 border-blue-400 text-white',
                repeat: 'bg-purple-600 border-purple-400 text-white',
                if: 'bg-amber-600 border-amber-400 text-white',
                collect: 'bg-emerald-600 border-emerald-400 text-white',
                jump: 'bg-rose-600 border-rose-400 text-white',
                step_two: 'bg-cyan-600 border-cyan-400 text-white',
              };

              return (
                <button
                  key={idx}
                  onClick={() => removeCommand(idx)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono shadow-sm cursor-pointer hover:opacity-80 active:scale-95 transition-all ${colors[cmd]}`}
                >
                  {labels[cmd]} ×
                </button>
              );
            })
          )}
        </div>

        <p className="mt-2 text-[11px] text-slate-300 font-medium">{feedbackMessage}</p>
      </div>

      {/* Available Command Palette */}
      <div className="px-4 py-1 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => addCommand('move_forward')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-md border border-cyan-400/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>➡️</span>
            <span>Move</span>
          </button>

          <button
            onClick={() => addCommand('repeat')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md border border-purple-400/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>🔁</span>
            <span>Repeat</span>
          </button>

          <button
            onClick={() => addCommand('collect')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs shadow-md border border-emerald-400/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>🪙</span>
            <span>Collect</span>
          </button>

          <button
            onClick={() => addCommand('step_two')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-xs shadow-md border border-cyan-300/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>⏩</span>
            <span>Step +2</span>
          </button>

          <button
            onClick={() => addCommand('jump')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-md border border-rose-400/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>🦘</span>
            <span>Jump</span>
          </button>

          <button
            onClick={() => addCommand('if')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs shadow-md border border-amber-400/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>❓</span>
            <span>If Guard</span>
          </button>
        </div>
      </div>

      {/* Action Button: Run Loop or Next Round */}
      <div className="px-4 pb-6 pt-1">
        {gameState === 'completed' ? (
          <button
            onClick={handleNextRound}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(6,182,212,0.5)] cursor-pointer"
          >
            <span>
              {currentRoundIdx < LOOP_ROUNDS.length - 1
                ? `Proceed to Round ${currentRoundIdx + 2}`
                : 'Mastered All Loop Rounds! 🏆'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={runProgram}
            disabled={isRunning || programSequence.length === 0}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base tracking-wider uppercase shadow-[0_0_28px_rgba(34,197,94,0.5)] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>{isRunning ? 'RUNNING LOOP...' : 'RUN'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
