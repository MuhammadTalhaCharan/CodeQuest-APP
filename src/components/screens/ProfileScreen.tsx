import React from 'react';
import { Award, Flame, Briefcase, Shield, Edit3, Settings, Globe, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import { UserProfile, ScreenId } from '../../types';
import { sound } from '../../services/sound';

interface ProfileScreenProps {
  profile: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onEditProfile: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onNavigate,
  onEditProfile,
  onOpenSettings,
  onLogout,
}) => {
  return (
    <div className="min-h-full pb-24 px-5 pt-6 text-white space-y-5">
      {/* User Avatar & Level matching Screenshot 14 */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 p-1 shadow-[0_0_30px_rgba(79,70,229,0.4)]">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full rounded-[22px] object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0b0e1b] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-white">{profile.name}</h2>
          <p className="text-xs text-slate-400 font-semibold capitalize mt-0.5">
            Level {profile.level} • {profile.selectedLanguage}
          </p>
        </div>

        {/* Level XP Bar matching Screenshot 14 */}
        <div className="w-full max-w-xs space-y-1.5 pt-1">
          <div className="flex justify-end text-[11px] font-mono text-slate-400">
            <span>{profile.xp} / {profile.xpToNextLevel} XP</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 border border-purple-900/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
              style={{ width: `${Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Stats Grid matching Screenshot 14 */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {/* Stat 1: Projects */}
        <div className="p-3.5 rounded-2xl bg-[#141838] border border-purple-900/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white font-mono leading-none block">
              {profile.projectsCount}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Projects</span>
          </div>
        </div>

        {/* Stat 2: Certificates */}
        <div
          onClick={() => {
            sound.playClick();
            onNavigate('certificates');
          }}
          className="p-3.5 rounded-2xl bg-[#141838] border border-purple-900/40 flex items-center gap-3 cursor-pointer hover:border-cyan-500/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white font-mono leading-none block">
              {profile.certificatesCount}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Certificates</span>
          </div>
        </div>

        {/* Stat 3: Streak */}
        <div className="p-3.5 rounded-2xl bg-[#141838] border border-purple-900/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white font-mono leading-none block">
              {profile.streak} Day
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Streak</span>
          </div>
        </div>

        {/* Stat 4: Badges */}
        <div
          onClick={() => {
            sound.playClick();
            onNavigate('achievements');
          }}
          className="p-3.5 rounded-2xl bg-[#141838] border border-purple-900/40 flex items-center gap-3 cursor-pointer hover:border-cyan-500/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white font-mono leading-none block">
              {profile.badgesCount}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Badges</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Button matching Screenshot 14 */}
      <div className="pt-1">
        <button
          onClick={() => {
            sound.playClick();
            onEditProfile();
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Navigation Options List */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('certificates');
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#141838] border border-purple-900/30 hover:border-purple-600/40 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 text-slate-200">
            <Award className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold">View My Certificates</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('language_selection');
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#141838] border border-purple-900/30 hover:border-purple-600/40 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 text-slate-200">
            <Globe className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold">Change Learning Language</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenSettings();
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#141838] border border-purple-900/30 hover:border-purple-600/40 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 text-slate-200">
            <Settings className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-bold">App Settings & Audio</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onLogout();
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#181126] border border-rose-900/30 hover:border-rose-600/50 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 text-rose-400">
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-bold">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};
