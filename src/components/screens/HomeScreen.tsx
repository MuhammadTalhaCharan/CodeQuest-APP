import React from 'react';
import { Settings, Flame, Gift, ChevronRight, Play, Coins, Bot, Award } from 'lucide-react';
import { UserProfile, CurriculumTopic, ScreenId } from '../../types';
import { sound } from '../../services/sound';

interface HomeScreenProps {
  profile: UserProfile;
  activeTopic: CurriculumTopic;
  onNavigate: (screen: ScreenId) => void;
  onOpenSettings: () => void;
  onClaimDailyStreakReward: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  activeTopic,
  onNavigate,
  onOpenSettings,
  onClaimDailyStreakReward,
}) => {
  return (
    <div className="min-h-full pb-24 px-5 pt-4 text-white space-y-4">
      {/* Top Header: Avatar, Greeting, Settings */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-purple-600/30">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full rounded-[14px] object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0b0e1b] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium">Good Morning,</p>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-extrabold text-white">{profile.name}</h2>
              <span className="text-base">👋</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenSettings();
          }}
          className="w-10 h-10 rounded-2xl bg-[#141836] border border-purple-900/40 hover:border-purple-600/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shadow-sm"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Streak Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#201530] via-[#2a1b47] to-[#1a1c42] p-4 border border-purple-800/40 shadow-lg shadow-purple-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Flame className="w-7 h-7 text-white fill-white animate-bounce" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white tracking-wide">
                {profile.streak} Day Streak
              </h3>
              <p className="text-xs text-purple-200/80 font-medium">Keep it up!</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playCoin();
              onClaimDailyStreakReward();
            }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 p-0.5 flex items-center justify-center shadow-md shadow-pink-500/30 transition-transform active:scale-95 cursor-pointer"
            title="Claim daily bonus gift"
          >
            <div className="w-full h-full bg-[#1b1033]/80 rounded-[14px] flex items-center justify-center">
              <Gift className="w-5 h-5 text-pink-300 animate-pulse" />
            </div>
          </button>
        </div>
      </div>

      {/* Language & Level Progress Card */}
      <div
        onClick={() => {
          sound.playClick();
          onNavigate('map');
        }}
        className="rounded-2xl bg-gradient-to-r from-[#141838] to-[#181d45] p-4 border border-blue-900/30 hover:border-cyan-500/40 transition-all cursor-pointer shadow-md group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-yellow-500/80 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#10142e] rounded-[9px] flex items-center justify-center text-xs font-bold text-yellow-400">
                Py
              </div>
            </div>
            <div>
              <h4 className="font-extrabold text-base text-white capitalize">
                {profile.selectedLanguage}
              </h4>
              <p className="text-xs text-cyan-400 font-semibold">Level {profile.level}</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
        </div>

        {/* XP Progress Bar */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex justify-end text-[11px] font-mono text-slate-400">
            <span>{profile.xp} / {profile.xpToNextLevel} XP</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-900/90 overflow-hidden p-0.5 border border-purple-900/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-500"
              style={{ width: `${Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Continue Learning Card */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Continue Learning
        </h3>

        <div className="rounded-2xl bg-[#141838] border border-purple-900/40 p-4 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <span className="text-xl">🔁</span>
              </div>
              <div>
                <h4 className="font-extrabold text-base text-white">{activeTopic.title}</h4>
                <p className="text-xs text-slate-400 font-medium">Progress: {activeTopic.progress}%</p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* Mini Interactive Preview Area */}
          <div className="relative h-20 rounded-xl bg-gradient-to-r from-[#0d1024] to-[#121633] border border-purple-900/30 p-2.5 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-base">
                🤖
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-cyan-400 font-mono">Mission: Coin Loop</span>
                <p className="text-xs text-slate-300 font-medium">Execute 5-step loop</p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('game_loop');
              }}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Continue</span>
              <Play className="w-3.5 h-3.5 fill-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Today's Challenge Card */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Today's Challenge
        </h3>

        <div
          onClick={() => {
            sound.playClick();
            onNavigate('daily_challenge');
          }}
          className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#141838] border border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Coins className="w-6 h-6 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Collect 10 Coins</h4>
              <p className="text-xs text-amber-300/80 font-medium">+100 XP • +50 Coins</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Quick Access Grid: AI Mentor & Leaderboard */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('ai_mentor');
          }}
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#141838]/80 hover:bg-[#181d45] border border-cyan-500/20 hover:border-cyan-500/40 text-left transition-all cursor-pointer shadow-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-cyan-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">AI Mentor</h5>
            <span className="text-[10px] text-cyan-400 font-semibold">Online & ready</span>
          </div>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('leaderboard');
          }}
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#141838]/80 hover:bg-[#181d45] border border-purple-500/20 hover:border-purple-500/40 text-left transition-all cursor-pointer shadow-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-purple-500/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Leaderboard</h5>
            <span className="text-[10px] text-purple-300 font-semibold">Rank #3 (Talha)</span>
          </div>
        </button>
      </div>
    </div>
  );
};
