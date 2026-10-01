import React, { useState } from 'react';
import { ArrowLeft, Medal, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { GLOBAL_LEADERBOARD, FRIENDS_LEADERBOARD, WEEKLY_LEADERBOARD } from '../../data/leaderboard';
import { LeaderboardUser } from '../../types';
import { sound } from '../../services/sound';

interface LeaderboardScreenProps {
  onBack: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [tab, setTab] = useState<'global' | 'friends' | 'weekly'>('global');

  const getList = (): LeaderboardUser[] => {
    switch (tab) {
      case 'friends':
        return FRIENDS_LEADERBOARD;
      case 'weekly':
        return WEEKLY_LEADERBOARD;
      default:
        return GLOBAL_LEADERBOARD;
    }
  };

  const currentList = getList();

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.8)]">
          1
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
          2
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-orange-400 text-white font-black text-xs flex items-center justify-center shadow-md">
          3
        </div>
      );
    }
    return (
      <span className="w-7 text-center font-bold text-slate-400 text-xs font-mono">
        {rank}
      </span>
    );
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col bg-[#0b0e1b] text-white">
      {/* Header matching Screenshot 11 */}
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
            Leaderboard
          </h1>
        </div>

        {/* 3 Tabs: Global, Friends, Weekly matching Screenshot 11 */}
        <div className="flex items-center p-1 rounded-xl bg-[#141836] border border-purple-900/40">
          {(['global', 'friends', 'weekly'] as const).map((t) => (
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

      {/* Leaderboard List matching Screenshot 11 */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-3 no-scrollbar">
        {currentList.map((user) => {
          const isMe = user.isCurrentUser;

          return (
            <div
              key={user.id}
              className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                isMe
                  ? 'bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-[#1e1742] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.02]'
                  : 'bg-[#141838] border border-purple-900/30 hover:border-purple-600/40'
              }`}
            >
              {/* Rank + Avatar + Name */}
              <div className="flex items-center gap-3">
                {getRankBadge(user.rank)}

                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover border border-purple-500/30"
                  />
                  {user.rank <= 3 && (
                    <div className="absolute -top-1 -right-1 text-xs">
                      {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    {user.name}
                  </h4>
                  {isMe && (
                    <span className="text-[10px] text-cyan-400 font-semibold">
                      Your current position
                    </span>
                  )}
                </div>
              </div>

              {/* XP Count matching Screenshot 11 */}
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-xs text-white">
                  {user.xp} XP
                </span>

                {user.change === 'up' && (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                )}
                {user.change === 'down' && (
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                )}
                {user.change === 'same' && (
                  <Minus className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
