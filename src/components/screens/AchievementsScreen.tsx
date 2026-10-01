import React, { useState } from 'react';
import { ArrowLeft, Trophy, Star, Shield, Zap, Award, Crown, Lock, CheckCircle2, Flame, Coins, Clock } from 'lucide-react';
import { Achievement } from '../../types';
import { sound } from '../../services/sound';

interface AchievementsScreenProps {
  achievements: Achievement[];
  onBack: () => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  achievements,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'xp_history'>('badges');
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  const getBadgeIcon = (id: string, status: string) => {
    switch (id) {
      case 'var_master':
        return <Trophy className="w-8 h-8 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />;
      case 'cond_ninja':
        return <Star className="w-8 h-8 text-amber-300 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />;
      case 'loop_warrior':
        return <Star className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />;
      case 'func_expert':
        return <Zap className="w-8 h-8 text-slate-500" />;
      case 'oop_legend':
        return <Award className="w-8 h-8 text-slate-500" />;
      case 'python_pro':
        return <Crown className="w-8 h-8 text-slate-500" />;
      default:
        return status === 'locked' ? (
          <Lock className="w-7 h-7 text-slate-500" />
        ) : (
          <Shield className="w-8 h-8 text-amber-400" />
        );
    }
  };

  const xpLogs = [
    { source: 'Completed Loop Platformer Game', amount: '+60 XP', coins: '+30 Coins', time: '10 mins ago', icon: Trophy },
    { source: 'Code Challenge: Loop Limits', amount: '+50 XP', coins: '+20 Coins', time: '25 mins ago', icon: Zap },
    { source: '7 Day Streak Bonus Claimed', amount: '+100 XP', coins: '+50 Coins', time: '1 hour ago', icon: Flame },
    { source: 'Variables Master Badge Earned', amount: '+100 XP', coins: '+40 Coins', time: 'Yesterday', icon: Award },
  ];

  return (
    <div className="relative min-h-[760px] h-full flex flex-col bg-[#0b0e1b] text-white">
      {/* Header matching Screenshot 10 */}
      <div className="px-5 pt-4 pb-3 bg-[#0d1022]/90 backdrop-blur-md sticky top-0 z-30 border-b border-purple-900/30">
        <div className="flex items-center gap-3 mb-4">
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
            Achievements
          </h1>
        </div>

        {/* Segmented Control Tabs matching Screenshot 10 */}
        <div className="flex items-center p-1 rounded-xl bg-[#141836] border border-purple-900/40">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('badges');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Badges
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('xp_history');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'xp_history'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            XP History
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 no-scrollbar">
        {activeTab === 'badges' ? (
          /* Badges 2-Column Grid matching Screenshot 10 */
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((badge) => {
              const isCompleted = badge.status === 'completed';
              const isInProgress = badge.status === 'in_progress';
              const isLocked = badge.status === 'locked';

              return (
                <div
                  key={badge.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedBadge(badge);
                  }}
                  className={`group relative flex flex-col items-center text-center p-4 rounded-3xl border transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-gradient-to-b from-[#18203c] to-[#121630] border-amber-500/40 hover:border-amber-400 shadow-lg shadow-amber-500/10'
                      : isInProgress
                      ? 'bg-[#141838] border-cyan-500/40 hover:border-cyan-400'
                      : 'bg-[#0f1226]/80 border-slate-800/80 opacity-60'
                  }`}
                >
                  {/* Badge Shield Artwork matching Screenshot 10 */}
                  <div className="relative mb-3 flex items-center justify-center">
                    <div
                      className={`w-18 h-18 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isCompleted
                          ? 'bg-gradient-to-br from-amber-500/30 to-yellow-600/20 border-2 border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                          : isInProgress
                          ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                          : 'bg-slate-900 border border-slate-700/50'
                      }`}
                    >
                      {getBadgeIcon(badge.id, badge.status)}
                    </div>

                    {isCompleted && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#121630] flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Badge Title & Status */}
                  <h3 className="font-extrabold text-sm text-white leading-tight">
                    {badge.title}
                  </h3>

                  <span
                    className={`text-[11px] font-semibold mt-1 ${
                      isCompleted
                        ? 'text-emerald-400'
                        : isInProgress
                        ? 'text-cyan-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          /* XP History Feed */
          <div className="space-y-3">
            {xpLogs.map((log, idx) => {
              const Icon = log.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#141838] border border-purple-900/40 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-700/30 flex items-center justify-center text-purple-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">{log.source}</h4>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {log.time}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-cyan-400 block font-mono">
                      {log.amount}
                    </span>
                    <span className="text-[10px] font-semibold text-amber-400 font-mono">
                      {log.coins}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#141838] border border-cyan-500/40 p-6 space-y-4 shadow-2xl text-center">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/30 to-purple-600/20 border-2 border-amber-400 flex items-center justify-center shadow-lg">
              {getBadgeIcon(selectedBadge.id, selectedBadge.status)}
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-white">{selectedBadge.title}</h3>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {selectedBadge.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedBadge.description}
            </p>

            <div className="flex justify-around p-3 rounded-2xl bg-[#0c0f24] border border-purple-900/40 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Reward</span>
                <span className="text-amber-400 font-bold">+{selectedBadge.xpReward} XP</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Unlocked</span>
                <span className="text-emerald-400 font-bold">{selectedBadge.dateUnlocked || 'Locked'}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs cursor-pointer shadow-md"
            >
              Awesome
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
