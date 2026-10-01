import React from 'react';
import { X, Volume2, VolumeX, Shield, RotateCcw, Bot, Info } from 'lucide-react';
import { UserProfile } from '../../types';
import { sound } from '../../services/sound';

interface SettingsModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  profile,
  isOpen,
  onClose,
  onToggleSound,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl bg-[#141838] border border-cyan-500/40 p-6 space-y-5 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
          <h3 className="text-base font-extrabold text-white">App Settings</h3>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5">
          {/* Audio Setting */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0f24] border border-purple-950">
            <div className="flex items-center gap-3">
              {profile.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-cyan-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-500" />
              )}
              <div>
                <span className="text-xs font-bold text-white block">Sound Effects</span>
                <span className="text-[10px] text-slate-400">Game audio & chime feedback</span>
              </div>
            </div>

            <button
              onClick={() => {
                onToggleSound();
                if (!profile.soundEnabled) sound.playCoin();
              }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                profile.soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  profile.soundEnabled ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* AI Mentor Engine Info */}
          <div className="p-3 rounded-2xl bg-[#0c0f24] border border-purple-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-xs font-bold text-white block">AI Mentor Engine</span>
                <span className="text-[10px] text-slate-400">Gemini 3.8 Flash (Active)</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800">
              Connected
            </span>
          </div>

          {/* Reset Progress */}
          <div className="p-3 rounded-2xl bg-[#181126] border border-rose-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-rose-400" />
              <div>
                <span className="text-xs font-bold text-rose-300 block">Reset Learning Progress</span>
                <span className="text-[10px] text-slate-400">Start learning path from scratch</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all progress?')) {
                  onResetProgress();
                  onClose();
                }
              }}
              className="px-2.5 py-1 rounded-lg bg-rose-900/50 hover:bg-rose-800 text-rose-200 text-xs font-bold cursor-pointer transition-colors"
            >
              Reset
            </button>
          </div>

          {/* About */}
          <div className="p-3 rounded-2xl bg-[#0c0f24] border border-purple-950 text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>CodeQuest v1.0.0</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Gamified programming education with adaptive games, code puzzles, and AI mentorship.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs cursor-pointer shadow-md"
        >
          Done
        </button>
      </div>
    </div>
  );
};
