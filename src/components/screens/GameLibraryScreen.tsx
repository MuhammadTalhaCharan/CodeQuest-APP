import React from 'react';
import { Play, Sparkles, Trophy, RotateCw, GitBranch, Cpu, Shield, Zap, Search, Grid } from 'lucide-react';
import { ScreenId } from '../../types';
import { sound } from '../../services/sound';

interface GameLibraryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const GameLibraryScreen: React.FC<GameLibraryScreenProps> = ({ onNavigate }) => {
  const games = [
    {
      id: 'decision_maze',
      title: 'Decision Maze (5 Rounds)',
      topic: 'Conditions & If-Else',
      difficulty: 'Beginner - Hard',
      xp: '+50 XP / Round',
      icon: GitBranch,
      color: 'from-emerald-600 to-teal-600',
      description: 'Navigate the dungeon using if/else logic, keys, and elemental spells.',
      screen: 'decision_maze' as ScreenId,
      featured: true,
    },
    {
      id: 'loop_collector',
      title: 'Loop Coin Collector (5 Rounds)',
      topic: 'Loops',
      difficulty: 'Intermediate',
      xp: '+60 XP / Round',
      icon: RotateCw,
      color: 'from-blue-600 to-cyan-500',
      description: 'Program loop counters to collect platform coins in minimum steps.',
      screen: 'game_loop' as ScreenId,
      featured: true,
    },
    {
      id: 'loop_patterns',
      title: 'Loop Matrix Builder',
      topic: 'Nested Loops & 2D Geometry',
      difficulty: 'Intermediate',
      xp: '+60 XP',
      icon: Grid,
      color: 'from-cyan-600 to-blue-700',
      description: 'Build 2D star patterns and coin grids using nested loop counters.',
      screen: 'loop_patterns' as ScreenId,
      featured: false,
    },
    {
      id: 'syntax_puzzle',
      title: 'Syntax Block Puzzle',
      topic: 'Code Ordering & Architecture',
      difficulty: 'Beginner - Boss',
      xp: '+60 XP / Round',
      icon: Zap,
      color: 'from-purple-600 to-indigo-600',
      description: 'Drag and reorder shuffled code lines to create valid syntax routines.',
      screen: 'syntax_puzzle' as ScreenId,
      featured: false,
    },
    {
      id: 'calc_boss',
      title: 'Boss: Calculator Quest',
      topic: 'Operators & Functions',
      difficulty: 'Hard',
      xp: '+100 XP',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600',
      description: 'Implement four math operations with edge case zero checks.',
      screen: 'daily_challenge' as ScreenId,
      featured: false,
    },
    {
      id: 'code_blanks',
      title: 'Fill-in-the-Blank Challenges',
      topic: 'Loops & Syntax',
      difficulty: 'Beginner',
      xp: '+50 XP',
      icon: Search,
      color: 'from-indigo-600 to-pink-600',
      description: 'Fill in missing boundaries and operators across multiple languages.',
      screen: 'code_challenge' as ScreenId,
      featured: false,
    },
  ];

  return (
    <div className="min-h-full pb-24 px-5 pt-6 text-white space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          Game Arcade
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Play interactive game missions to master programming algorithms
        </p>
      </div>

      {/* Featured Game Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-purple-950 to-indigo-950 border border-cyan-500/40 p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold font-mono text-cyan-300 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40">
            RECOMMENDED FOR YOU
          </span>
          <span className="text-xs font-bold text-amber-400 font-mono">+60 XP</span>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-white">Loop Coin Collector</h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Your recent accuracy on loops is developing. Collect all 5 coins using an automated loop command deck!
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('game_loop');
          }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Play Now</span>
        </button>
      </div>

      {/* Games Catalog */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          All Interactive Games
        </h3>

        <div className="space-y-3">
          {games.map((g) => {
            const Icon = g.icon;

            return (
              <div
                key={g.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(g.screen);
                }}
                className="p-4 rounded-2xl bg-[#141838] border border-purple-900/30 hover:border-cyan-500/40 transition-all cursor-pointer shadow-md flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${g.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {g.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{g.description}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono">
                      <span className="text-purple-300 font-semibold">{g.topic}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-bold">{g.xp}</span>
                    </div>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-700/30 group-hover:bg-cyan-500 group-hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors flex-shrink-0">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
