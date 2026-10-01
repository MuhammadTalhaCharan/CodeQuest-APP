import React from 'react';
import { Box, GitBranch, RotateCw, Cpu, Layers, ChevronRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { CurriculumTopic, ScreenId, UserProfile } from '../../types';
import { sound } from '../../services/sound';

interface ProgressScreenProps {
  topics: CurriculumTopic[];
  profile: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onSelectTopic: (topic: CurriculumTopic) => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  topics,
  profile,
  onNavigate,
  onSelectTopic,
}) => {
  // Mapping categories matching Screenshot 9
  const skillCategories = [
    {
      id: 'variables',
      name: 'Variables',
      percentage: 100,
      color: 'from-cyan-400 to-teal-400',
      bgColor: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
      icon: Box,
    },
    {
      id: 'conditions',
      name: 'Conditions',
      percentage: 80,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      icon: GitBranch,
    },
    {
      id: 'loops',
      name: 'Loops',
      percentage: 50,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
      icon: RotateCw,
    },
    {
      id: 'functions',
      name: 'Functions',
      percentage: 70,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      icon: Cpu,
    },
    {
      id: 'oop',
      name: 'OOP',
      percentage: 30,
      color: 'from-rose-500 to-red-500',
      bgColor: 'bg-rose-500/20 border-rose-500/30 text-rose-400',
      icon: Layers,
    },
  ];

  const handlePractice = (topicId: string) => {
    sound.playClick();
    const target = topics.find((t) => t.id === topicId) || topics[0];
    onSelectTopic(target);
    onNavigate('game_loop');
  };

  return (
    <div className="min-h-full pb-24 px-5 pt-6 text-white space-y-6">
      {/* Title matching Screenshot 9 */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          Your Programming Skills
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time adaptive tracking across core programming concepts
        </p>
      </div>

      {/* Skill Categories Progress Rows matching Screenshot 9 */}
      <div className="space-y-3.5">
        {skillCategories.map((skill) => {
          const Icon = skill.icon;

          return (
            <div
              key={skill.id}
              className="p-4 rounded-2xl bg-[#141838] border border-purple-900/40 shadow-md space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center ${skill.bgColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-white">{skill.name}</h3>
                </div>

                <span className="font-mono text-xs font-bold text-slate-300">
                  {skill.percentage}%
                </span>
              </div>

              {/* Skill Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-purple-950">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-500`}
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended for you matching Screenshot 9 */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-white tracking-wide">
            Recommended for you
          </h2>
          <span className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Adaptive AI
          </span>
        </div>

        {/* Practice Loops Card */}
        <div
          onClick={() => handlePractice('loops')}
          className="group flex items-center justify-between p-4 rounded-2xl bg-[#141838] border border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-600/30">
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Practice Loops</h3>
              <p className="text-xs text-slate-400">3 challenges</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Practice OOP Card */}
        <div
          onClick={() => handlePractice('oop')}
          className="group flex items-center justify-between p-4 rounded-2xl bg-[#141838] border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Practice OOP</h3>
              <p className="text-xs text-slate-400">3 challenges</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};
