import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, BookOpen, Code, HelpCircle, CheckCircle2, XCircle, Play } from 'lucide-react';
import { CurriculumTopic, ScreenId } from '../../types';
import { sound } from '../../services/sound';

interface LessonExplanationScreenProps {
  topic: CurriculumTopic;
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LessonExplanationScreen: React.FC<LessonExplanationScreenProps> = ({
  topic,
  onBack,
  onNavigate,
}) => {
  const [tab, setTab] = useState<'explanation' | 'example' | 'quiz'>('explanation');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [exampleIdx, setExampleIdx] = useState(0);

  const loopExamples = [
    {
      title: 'Example 1: Standard For-Loop Counter',
      code: `# Counting from 1 to 5\nfor i in range(1, 6):\n    print("Iteration step:", i)`,
      output: `Iteration step: 1\nIteration step: 2\nIteration step: 3\nIteration step: 4\nIteration step: 5`,
      explanation: 'range(1, 6) starts at inclusive 1 and stops right before exclusive 6.',
    },
    {
      title: 'Example 2: While-Loop Guard Condition',
      code: `energy = 3\nwhile energy > 0:\n    print("Energy left:", energy)\n    energy -= 1\nprint("Recharging needed!")`,
      output: `Energy left: 3\nEnergy left: 2\nEnergy left: 1\nRecharging needed!`,
      explanation: 'While-loops continue executing as long as their condition evaluates to True.',
    },
    {
      title: 'Example 3: Step-by-Two Loop (Evens)',
      code: `# range(start, stop, step)\nfor even in range(0, 10, 2):\n    print("Even number:", even)`,
      output: `Even number: 0\nEven number: 2\nEven number: 4\nEven number: 6\nEven number: 8`,
      explanation: 'The 3rd argument in range specifies the increment step size.',
    },
    {
      title: 'Example 4: Break and Continue Controls',
      code: `for coin in range(1, 6):\n    if coin == 3:\n        continue # Skip coin 3\n    print("Found coin:", coin)`,
      output: `Found coin: 1\nFound coin: 2\nFound coin: 4\nFound coin: 5`,
      explanation: 'continue skips the rest of the current iteration, moving directly to the next cycle.',
    },
    {
      title: 'Example 5: Nested Loops (2D Coordinate Grid)',
      code: `for row in range(2):\n    for col in range(3):\n        print(f"Cell({row},{col})", end=" ")\n    print()`,
      output: `Cell(0,0) Cell(0,1) Cell(0,2) \nCell(1,0) Cell(1,1) Cell(1,2)`,
      explanation: 'Nested loops run the inner loop completely for each single pass of the outer loop.',
    },
  ];

  const handleQuizSelect = (idx: number) => {
    sound.playClick();
    setSelectedQuizAnswer(idx);
    setIsQuizSubmitted(true);
    if (idx === topic.quiz.correctIndex) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between bg-[#0b0e1b] text-white">
      {/* Header matching Screenshot 13 */}
      <div className="px-5 pt-4 pb-3 bg-[#0d1022]/90 backdrop-blur-md sticky top-0 z-30 border-b border-purple-900/30">
        <div className="flex items-center justify-between mb-4">
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
            <h1 className="text-base font-extrabold text-white tracking-wide">
              Topic: {topic.title}
            </h1>
          </div>

          <button
            onClick={() => sound.playClick()}
            className="w-10 h-10 rounded-xl hover:bg-purple-900/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tabs matching Screenshot 13: [ Explanation ] [ Example ] [ Quiz ] */}
        <div className="flex items-center p-1 rounded-xl bg-[#141836] border border-purple-900/40">
          {(['explanation', 'example', 'quiz'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                sound.playClick();
                setTab(t);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                tab === t
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 no-scrollbar">
        {tab === 'explanation' && (
          /* Exact View matching Screenshot 13 */
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              {topic.explanation.text}
            </p>

            {/* Dark Code Container matching Screenshot 13 */}
            <div className="rounded-2xl bg-[#090b16] border border-purple-900/50 p-4 shadow-xl font-mono text-sm leading-relaxed">
              <pre className="text-slate-200 overflow-x-auto whitespace-pre-wrap">
                {topic.explanation.codeSnippet}
              </pre>
            </div>

            {/* Explanation Breakdown Bullets matching Screenshot 13 */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-400">In this example:</h4>
              <div className="space-y-2 text-xs text-slate-300">
                {topic.explanation.bulletPoints.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'example' && (
          <div className="space-y-4">
            {topic.id === 'loops' ? (
              /* Enhanced Multi-Example Showcase for Loops */
              <div className="space-y-4">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: 0, title: '1. For Counter' },
                    { id: 1, title: '2. While Guard' },
                    { id: 2, title: '3. Step By 2' },
                    { id: 3, title: '4. Break / Skip' },
                    { id: 4, title: '5. Nested Grid' },
                  ].map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => {
                        sound.playClick();
                        setExampleIdx(ex.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                        exampleIdx === ex.id
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-300 text-slate-950 font-black'
                          : 'bg-[#141838] border-purple-900/40 text-slate-300 hover:text-white'
                      }`}
                    >
                      {ex.title}
                    </button>
                  ))}
                </div>

                {/* Example Card Details */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">
                    {loopExamples[exampleIdx].title}
                  </h3>
                  <div className="rounded-2xl bg-[#090b16] border border-purple-900/50 p-4 font-mono text-xs text-slate-200">
                    <pre className="whitespace-pre-wrap">{loopExamples[exampleIdx].code}</pre>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#141838] border border-cyan-500/30">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wide block mb-1">
                      Program Output
                    </span>
                    <p className="font-mono text-xs text-emerald-400 font-semibold whitespace-pre-wrap">
                      {loopExamples[exampleIdx].output}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {loopExamples[exampleIdx].explanation}
                  </p>
                </div>
              </div>
            ) : (
              /* Standard Topic Example */
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">{topic.example.title}</h3>
                <div className="rounded-2xl bg-[#090b16] border border-purple-900/50 p-4 font-mono text-xs text-slate-200">
                  <pre className="whitespace-pre-wrap">{topic.example.code}</pre>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#141838] border border-cyan-500/30">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wide block mb-1">
                    Output
                  </span>
                  <p className="font-mono text-xs text-emerald-400 font-semibold">
                    {topic.example.output}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {topic.example.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {tab === 'quiz' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white leading-relaxed">
              {topic.quiz.question}
            </h3>

            <div className="space-y-2.5">
              {topic.quiz.options.map((opt, idx) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = idx === topic.quiz.correctIndex;

                let btnStyle = 'bg-[#141838] border-purple-900/40 text-slate-200 hover:bg-[#1a1f46]';
                if (isQuizSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-950/60 border-red-500 text-red-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isQuizSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                    {isQuizSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {isQuizSubmitted && (
              <div className="p-3.5 rounded-2xl bg-[#0e122b] border border-cyan-500/30 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-cyan-400 block mb-0.5">Explanation:</span>
                {topic.quiz.explanation}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Practice Call to Action */}
      <div className="p-4 bg-[#0d1024]/90 border-t border-purple-900/30">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('code_challenge');
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch Interactive Challenge</span>
        </button>
      </div>
    </div>
  );
};
