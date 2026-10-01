import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, CheckCircle2, XCircle, Lightbulb, Play, ChevronRight, Sparkles, ArrowUpDown } from 'lucide-react';
import { sound } from '../../services/sound';

interface SyntaxPuzzleScreenProps {
  onBack: () => void;
  onSuccess: (xp: number, coins: number) => void;
}

interface PuzzleRound {
  round: number;
  title: string;
  language: string;
  goal: string;
  shuffledBlocks: string[];
  correctOrder: string[];
  hint: string;
  explanation: string;
}

const PUZZLE_ROUNDS: PuzzleRound[] = [
  {
    round: 1,
    title: 'Round 1: Variable Sequence',
    language: 'Python',
    goal: 'Arrange the blocks to compute the player’s total score and print the result.',
    shuffledBlocks: [
      'print("Score:", total)',
      'total = score + bonus',
      'score = 100',
      'bonus = 50',
    ],
    correctOrder: [
      'score = 100',
      'bonus = 50',
      'total = score + bonus',
      'print("Score:", total)',
    ],
    hint: 'Variables must be assigned before they can be added or printed.',
    explanation: 'First declare score and bonus, calculate total, and then output the sum.',
  },
  {
    round: 2,
    title: 'Round 2: Loop Accumulator',
    language: 'Python',
    goal: 'Arrange the blocks to sum all numbers from the list with a for loop.',
    shuffledBlocks: [
      '    total += coin',
      'for coin in coins:',
      'coins = [10, 20, 30]',
      'print("Sum:", total)',
      'total = 0',
    ],
    correctOrder: [
      'coins = [10, 20, 30]',
      'total = 0',
      'for coin in coins:',
      '    total += coin',
      'print("Sum:", total)',
    ],
    hint: 'Initialize the accumulator total = 0 before entering the loop.',
    explanation: 'The list and sum variable must exist before iterating and accumulating values.',
  },
  {
    round: 3,
    title: 'Round 3: If-Else Branch',
    language: 'JavaScript',
    goal: 'Order the statements to check player lives and output status.',
    shuffledBlocks: [
      '  console.log("Game Over");',
      '} else {',
      'let lives = 3;',
      'if (lives > 0) {',
      '  console.log("Keep Fighting!");',
      '}',
    ],
    correctOrder: [
      'let lives = 3;',
      'if (lives > 0) {',
      '  console.log("Keep Fighting!");',
      '} else {',
      '  console.log("Game Over");',
      '}',
    ],
    hint: 'Declare lives first, then open if (lives > 0), then else branch, and close braces.',
    explanation: 'Condition evaluation requires the variable definition before the if-statement.',
  },
  {
    round: 4,
    title: 'Round 4: Function Recipe',
    language: 'Python',
    goal: 'Arrange the function definition, calculation, return, and invocation.',
    shuffledBlocks: [
      'result = multiply(4, 5)',
      'def multiply(a, b):',
      'print("Result:", result)',
      '    return a * b',
    ],
    correctOrder: [
      'def multiply(a, b):',
      '    return a * b',
      'result = multiply(4, 5)',
      'print("Result:", result)',
    ],
    hint: 'Functions must be defined with def before they can be called.',
    explanation: 'Python defines the function object first, executes the return statement, and then calls it.',
  },
  {
    round: 5,
    title: 'Round 5: Boss Syntax: Class Construction',
    language: 'Python',
    goal: 'Assemble a complete OOP class and instantiate a hero player.',
    shuffledBlocks: [
      'hero = Player("Talha")',
      'class Player:',
      'print("Hero Name:", hero.name)',
      '        self.name = name',
      '    def __init__(self, name):',
    ],
    correctOrder: [
      'class Player:',
      '    def __init__(self, name):',
      '        self.name = name',
      'hero = Player("Talha")',
      'print("Hero Name:", hero.name)',
    ],
    hint: 'Class blueprint comes first, followed by constructor __init__, then object instantiation.',
    explanation: 'Classes define structure. Once defined, instances can be created and attributes accessed.',
  },
];

export const SyntaxPuzzleScreen: React.FC<SyntaxPuzzleScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const currentRound = PUZZLE_ROUNDS[roundIdx];

  const [blocks, setBlocks] = useState<string[]>(() => [...currentRound.shuffledBlocks]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newBlocks = [...blocks];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newBlocks.length) return;

    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIdx];
    newBlocks[targetIdx] = temp;

    setBlocks(newBlocks);
    setIsChecked(false);
  };

  const handleVerify = () => {
    sound.playClick();
    const matches = blocks.every((b, i) => b === currentRound.correctOrder[i]);
    setIsChecked(true);

    if (matches) {
      setIsCorrect(true);
      sound.playCorrect();
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
      onSuccess(60, 30);
    } else {
      setIsCorrect(false);
      sound.playWrong();
    }
  };

  const handleNextRound = () => {
    sound.playClick();
    if (roundIdx < PUZZLE_ROUNDS.length - 1) {
      const next = roundIdx + 1;
      setRoundIdx(next);
      setBlocks([...PUZZLE_ROUNDS[next].shuffledBlocks]);
      setIsChecked(false);
      setIsCorrect(false);
    } else {
      sound.playFanfare();
      alert('🏆 ALL SYNTAX PUZZLES COMPLETED! You have mastered code block construction!');
      onBack();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setBlocks([...currentRound.shuffledBlocks]);
    setIsChecked(false);
    setIsCorrect(false);
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
                Syntax Block Puzzle
              </h1>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">
                Round {currentRound.round} of {PUZZLE_ROUNDS.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Goal Description */}
        <div className="mt-4 p-3 rounded-2xl bg-[#141838] border border-cyan-500/30 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase">
              {currentRound.language} Syntax Goal
            </span>
            <span className="text-[10px] text-purple-300 font-semibold flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              Tap arrows to reorder
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {currentRound.goal}
          </p>
        </div>

        {/* Reorderable Code Blocks List */}
        <div className="mt-4 space-y-2">
          {blocks.map((codeLine, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0d1024] border border-purple-900/50 hover:border-cyan-400/50 transition-all shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono font-bold text-slate-500 w-4 text-center">
                    {idx + 1}
                  </span>
                  <pre className="font-mono text-xs sm:text-sm text-cyan-300 whitespace-pre">
                    {codeLine}
                  </pre>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveBlock(idx, 'up')}
                    className="w-7 h-7 rounded-lg bg-[#181d3d] hover:bg-cyan-600 disabled:opacity-20 flex items-center justify-center text-xs font-bold cursor-pointer transition-colors"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === blocks.length - 1}
                    onClick={() => moveBlock(idx, 'down')}
                    className="w-7 h-7 rounded-lg bg-[#181d3d] hover:bg-cyan-600 disabled:opacity-20 flex items-center justify-center text-xs font-bold cursor-pointer transition-colors"
                  >
                    ▼
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button: Verify or Next Round */}
        <div className="mt-5">
          {isChecked && isCorrect ? (
            <button
              onClick={handleNextRound}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_24px_rgba(6,182,212,0.5)] cursor-pointer"
            >
              <span>
                {roundIdx < PUZZLE_ROUNDS.length - 1
                  ? `Proceed to Round ${roundIdx + 2}`
                  : 'Mastered All Syntax Puzzles! 🏆'}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleVerify}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_24px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
            >
              VERIFY SYNTAX ORDER
            </button>
          )}
        </div>

        {/* Feedback Alert */}
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
                {isCorrect ? 'Valid Syntax Sequence! 🎉' : 'Syntax Error in Order!'}
              </p>
              <p className="text-xs mt-1 text-slate-300 leading-relaxed">
                {isCorrect ? currentRound.explanation : currentRound.hint}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pedagogical Hint Card */}
      <div className="mt-auto p-4 rounded-2xl bg-[#141836]/90 border border-purple-800/40 shadow-md">
        <div className="flex items-center gap-2 text-amber-400">
          <Lightbulb className="w-4 h-4 fill-amber-400" />
          <h4 className="font-bold text-xs uppercase tracking-wide">Mentor Hint</h4>
        </div>
        <p className="mt-1.5 text-xs text-slate-300 pl-6 leading-relaxed">
          • {currentRound.hint}
        </p>
      </div>
    </div>
  );
};
