import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Heart, RotateCcw, Play, CheckCircle2, Shield, Key, Sparkles, ChevronRight, Lock, Unlock } from 'lucide-react';
import { sound } from '../../services/sound';

interface DecisionMazeGameScreenProps {
  onBack: () => void;
  onSuccess: (xp: number, coins: number) => void;
}

interface MazeRound {
  round: number;
  title: string;
  description: string;
  conditionDescription: string;
  correctSequence: string[];
  doorType: 'locked' | 'elemental' | 'keycard' | 'energy' | 'vault';
  doorState: 'locked' | 'unlocked';
  availableCommands: { id: string; label: string; color: string; icon: string }[];
  hint: string;
}

const MAZE_ROUNDS: MazeRound[] = [
  {
    round: 1,
    title: 'Round 1: The Iron Gate',
    description: 'The entrance gate is locked with a heavy padlock. Check the door condition before moving!',
    conditionDescription: 'if door.is_locked == True:\n    use_key()\nelse:\n    walk_forward()',
    correctSequence: ['if_locked', 'use_key', 'walk_forward'],
    doorType: 'locked',
    doorState: 'locked',
    availableCommands: [
      { id: 'if_locked', label: 'If Door Locked', color: 'from-amber-600 to-orange-600 border-amber-400', icon: '🔒' },
      { id: 'use_key', label: 'Use Key', color: 'from-yellow-500 to-amber-500 border-yellow-300', icon: '🔑' },
      { id: 'walk_forward', label: 'Walk Forward', color: 'from-blue-600 to-cyan-600 border-cyan-400', icon: '➡️' },
      { id: 'else_open', label: 'Else: Open', color: 'from-purple-600 to-indigo-600 border-purple-400', icon: '🚪' },
    ],
    hint: 'If the gate is locked, first apply the key, then walk forward through the opened pathway.',
  },
  {
    round: 2,
    title: 'Round 2: Elemental Flame Barrier',
    description: 'A magical flame barrier is blocking the corridor. Branch your decision based on trap element!',
    conditionDescription: 'if barrier == "flame":\n    cast_ice()\nwalk_forward()',
    correctSequence: ['if_flame', 'cast_ice', 'walk_forward'],
    doorType: 'elemental',
    doorState: 'locked',
    availableCommands: [
      { id: 'if_flame', label: 'If Barrier Flame', color: 'from-rose-600 to-red-600 border-rose-400', icon: '🔥' },
      { id: 'cast_ice', label: 'Cast Ice Spell', color: 'from-cyan-500 to-blue-500 border-cyan-300', icon: '❄️' },
      { id: 'walk_forward', label: 'Walk Forward', color: 'from-blue-600 to-cyan-600 border-cyan-400', icon: '➡️' },
      { id: 'turn_back', label: 'Turn Back', color: 'from-slate-600 to-slate-700 border-slate-500', icon: '↩️' },
    ],
    hint: 'Detect the flame barrier with an if-statement and neutralize it with ice magic.',
  },
  {
    round: 3,
    title: 'Round 3: High-Tech Security Terminal',
    description: 'Requires a digital keycard scan to deactivate the laser tripwire.',
    conditionDescription: 'if keycard.is_valid:\n    scan_card()\n    walk_forward()',
    correctSequence: ['if_keycard', 'scan_card', 'walk_forward'],
    doorType: 'keycard',
    doorState: 'locked',
    availableCommands: [
      { id: 'if_keycard', label: 'If Keycard Valid', color: 'from-emerald-600 to-teal-600 border-emerald-400', icon: '💳' },
      { id: 'scan_card', label: 'Scan Card', color: 'from-cyan-600 to-indigo-600 border-cyan-400', icon: '⚡' },
      { id: 'walk_forward', label: 'Walk Forward', color: 'from-blue-600 to-cyan-600 border-cyan-400', icon: '➡️' },
      { id: 'alarm', label: 'Sound Alarm', color: 'from-red-600 to-rose-700 border-red-400', icon: '🚨' },
    ],
    hint: 'Check if keycard is valid before triggering the scanner to disable lasers.',
  },
  {
    round: 4,
    title: 'Round 4: Energy Bridge Generator',
    description: 'The bridge is retracted. Check if generator power >= 50% before deploying.',
    conditionDescription: 'if power >= 50:\n    activate_bridge()\nelse:\n    charge_battery()',
    correctSequence: ['if_power', 'activate_bridge', 'walk_forward'],
    doorType: 'energy',
    doorState: 'locked',
    availableCommands: [
      { id: 'if_power', label: 'If Power >= 50', color: 'from-amber-500 to-yellow-500 border-amber-300', icon: '🔋' },
      { id: 'activate_bridge', label: 'Activate Bridge', color: 'from-purple-600 to-indigo-600 border-purple-400', icon: '🌉' },
      { id: 'walk_forward', label: 'Walk Forward', color: 'from-blue-600 to-cyan-600 border-cyan-400', icon: '➡️' },
      { id: 'jump_chasm', label: 'Jump Chasm', color: 'from-rose-600 to-red-600 border-rose-400', icon: '⚠️' },
    ],
    hint: 'Activate the light bridge only when sufficient generator power is confirmed.',
  },
  {
    round: 5,
    title: 'Round 5: Boss Vault Chamber',
    description: 'The Grand Vault requires simultaneous biometric check and golden cipher key.',
    conditionDescription: 'if has_golden_key and biometric_verified:\n    unlock_vault()\n    claim_treasure()',
    correctSequence: ['if_both', 'unlock_vault', 'claim_treasure'],
    doorType: 'vault',
    doorState: 'locked',
    availableCommands: [
      { id: 'if_both', label: 'If Key & Biometrics', color: 'from-amber-400 to-yellow-600 border-amber-300 text-slate-950 font-black', icon: '👑' },
      { id: 'unlock_vault', label: 'Unlock Vault Door', color: 'from-purple-600 to-indigo-600 border-purple-400', icon: '🔓' },
      { id: 'claim_treasure', label: 'Claim Treasure', color: 'from-emerald-500 to-green-600 border-emerald-300 text-slate-950 font-black', icon: '💎' },
      { id: 'walk_forward', label: 'Walk Forward', color: 'from-blue-600 to-cyan-600 border-cyan-400', icon: '➡️' },
    ],
    hint: 'The boss chamber requires a compound conditional check before unlocking the vault.',
  },
];

export const DecisionMazeGameScreen: React.FC<DecisionMazeGameScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedCommands, setSelectedCommands] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [characterX, setCharacterX] = useState(20); // starting px
  const [doorOpen, setDoorOpen] = useState(false);
  const [feedback, setFeedback] = useState('Inspect the barrier and arrange conditional commands!');
  const [roundCompleted, setRoundCompleted] = useState(false);

  const roundData = MAZE_ROUNDS[currentRoundIdx];

  const addCmd = (id: string) => {
    if (isRunning || roundCompleted) return;
    sound.playClick();
    if (selectedCommands.length < 4) {
      setSelectedCommands([...selectedCommands, id]);
    }
  };

  const removeCmd = (idx: number) => {
    if (isRunning || roundCompleted) return;
    sound.playClick();
    setSelectedCommands(selectedCommands.filter((_, i) => i !== idx));
  };

  const resetRound = () => {
    setSelectedCommands([]);
    setIsRunning(false);
    setCharacterX(20);
    setDoorOpen(false);
    setRoundCompleted(false);
    setFeedback('Inspect the barrier and arrange conditional commands!');
  };

  const runDecisionLogic = async () => {
    if (isRunning || selectedCommands.length === 0) return;
    setIsRunning(true);
    sound.playMove();

    // Check if player's sequence matches the required logic
    const isSuccess =
      selectedCommands.length === roundData.correctSequence.length &&
      selectedCommands.every((cmd, i) => cmd === roundData.correctSequence[i]);

    // Animate character advancing to door
    setCharacterX(130);
    await new Promise((r) => setTimeout(r, 600));

    if (isSuccess) {
      // Unlock door animation
      sound.playCoin();
      setDoorOpen(true);
      setFeedback('Condition verified: True! Gate unlocking...');
      await new Promise((r) => setTimeout(r, 600));

      // Walk through to the treasure
      setCharacterX(260);
      sound.playCorrect();
      setRoundCompleted(true);
      setFeedback(`🎉 ${roundData.title} Cleared!`);

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {}

      onSuccess(50, 25);
    } else {
      sound.playWrong();
      setLives((prev) => Math.max(0, prev - 1));
      setFeedback('Path blocked! Condition evaluated incorrectly or missing actions.');
      await new Promise((r) => setTimeout(r, 500));
      setCharacterX(20);
    }

    setIsRunning(false);
  };

  const nextRound = () => {
    sound.playClick();
    if (currentRoundIdx < MAZE_ROUNDS.length - 1) {
      setCurrentRoundIdx((prev) => prev + 1);
      setSelectedCommands([]);
      setCharacterX(20);
      setDoorOpen(false);
      setRoundCompleted(false);
      setFeedback('Next maze chamber! Formulate your if-condition.');
    } else {
      sound.playFanfare();
      alert('🏆 MAZE CHAMPION! You have mastered all 5 Decision Maze rounds!');
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
            <h1 className="text-base font-extrabold text-white tracking-wide">
              Decision Maze
            </h1>
            <span className="text-[10px] text-cyan-400 font-mono font-bold">
              Round {roundData.round} of {MAZE_ROUNDS.length}
            </span>
          </div>
        </div>

        {/* Lives Counter */}
        <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-800/40 px-3 py-1.5 rounded-full">
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span className="text-sm font-bold text-red-300">{lives}</span>
        </div>
      </div>

      {/* 2D Maze Chamber Canvas */}
      <div className="relative mx-4 my-2 h-56 rounded-3xl bg-gradient-to-b from-[#111633] via-[#0e142e] to-[#080b1a] border-2 border-purple-500/40 shadow-xl overflow-hidden select-none">
        {/* Dungeon Brick Floor Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f294d_1px,transparent_1px),linear-gradient(to_bottom,#1f294d_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

        {/* Round Badge Banner */}
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold text-amber-300 uppercase font-mono">
            {roundData.title}
          </span>
        </div>

        {/* Gate / Barrier in Middle */}
        <div className="absolute top-0 bottom-0 left-[165px] w-12 flex flex-col items-center justify-center z-10">
          <div
            className={`w-10 h-36 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${
              doorOpen
                ? 'bg-emerald-950/40 border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.5)] scale-y-20 opacity-40'
                : 'bg-gradient-to-b from-amber-900 to-amber-950 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
            }`}
          >
            {doorOpen ? (
              <Unlock className="w-6 h-6 text-emerald-300" />
            ) : (
              <Lock className="w-6 h-6 text-amber-400 animate-pulse" />
            )}
            <span className="text-[9px] font-mono text-amber-200 mt-1 uppercase font-bold">
              {doorOpen ? 'OPEN' : 'GATE'}
            </span>
          </div>
        </div>

        {/* Treasure Chest at End */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-float">
            <div className="w-full h-full bg-[#1b1502] rounded-[14px] flex items-center justify-center text-xl">
              💎
            </div>
          </div>
          <span className="text-[9px] font-mono text-amber-300 font-bold mt-1">GOAL</span>
        </div>

        {/* Animated Hero Character */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-500 ease-out"
          style={{ left: `${characterX}px` }}
        >
          <div className="w-10 h-14 flex flex-col items-center">
            {/* Adventurer Head */}
            <div className="w-7 h-7 rounded-full bg-amber-200 border-2 border-indigo-600 overflow-hidden relative shadow-md">
              <div className="w-full h-2.5 bg-indigo-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ml-2 mt-0.5" />
            </div>
            {/* Green Adventurer Tunic */}
            <div className="w-8 h-5 rounded-md bg-emerald-600 border border-emerald-400 -mt-0.5" />
            {/* Boots */}
            <div className="flex gap-1.5 mt-0.5">
              <div className={`w-2.5 h-3 bg-slate-900 rounded-sm ${isRunning ? 'animate-bounce' : ''}`} />
              <div className={`w-2.5 h-3 bg-slate-900 rounded-sm ${isRunning ? 'animate-bounce delay-75' : ''}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Code Logic Card & Selected Commands */}
      <div className="mx-4 p-3.5 rounded-2xl bg-[#141838] border border-purple-900/50 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 font-mono">
            Conditional Branch: {selectedCommands.length}/3
          </span>
          <button
            onClick={resetRound}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Expected Condition Logic Box */}
        <pre className="p-2.5 rounded-xl bg-[#090b18] text-xs font-mono text-cyan-300 overflow-x-auto border border-purple-950">
          {roundData.conditionDescription}
        </pre>

        {/* Player Built Sequence */}
        <div className="flex flex-wrap gap-2 min-h-[42px] p-2 rounded-xl bg-[#0d1024] border border-purple-950">
          {selectedCommands.length === 0 ? (
            <span className="text-xs text-slate-500 italic my-auto">
              Tap commands below in order to satisfy the condition...
            </span>
          ) : (
            selectedCommands.map((cmdId, i) => {
              const cmdInfo = roundData.availableCommands.find((c) => c.id === cmdId);
              return (
                <button
                  key={i}
                  onClick={() => removeCmd(i)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold bg-gradient-to-r ${cmdInfo?.color} cursor-pointer hover:opacity-80 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm`}
                >
                  <span>{cmdInfo?.icon}</span>
                  <span>{cmdInfo?.label}</span>
                  <span className="ml-1 opacity-70">×</span>
                </button>
              );
            })
          )}
        </div>

        <p className="text-[11px] text-slate-300 font-medium">{feedback}</p>
      </div>

      {/* Available Commands Deck */}
      <div className="px-4 py-1 space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Available Decision Commands
        </span>
        <div className="grid grid-cols-2 gap-2">
          {roundData.availableCommands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => addCmd(cmd.id)}
              className={`flex items-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r ${cmd.color} border text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer`}
            >
              <span className="text-base">{cmd.icon}</span>
              <span className="truncate">{cmd.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Action: Run or Next Round */}
      <div className="px-4 pb-6 pt-1">
        {roundCompleted ? (
          <button
            onClick={nextRound}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(6,182,212,0.5)] cursor-pointer"
          >
            <span>
              {currentRoundIdx < MAZE_ROUNDS.length - 1
                ? `Proceed to Round ${currentRoundIdx + 2}`
                : 'Complete Decision Maze 🏆'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={runDecisionLogic}
            disabled={isRunning || selectedCommands.length === 0}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(34,197,94,0.5)] active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>{isRunning ? 'EVALUATING IF / ELSE...' : 'RUN DECISION'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
