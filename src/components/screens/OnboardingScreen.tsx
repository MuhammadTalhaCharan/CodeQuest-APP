import React from 'react';
import { Gamepad2, Brain, Trophy, ArrowRight, Laptop, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';

interface OnboardingScreenProps {
  onContinue: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onContinue }) => {
  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between px-6 pt-6 pb-8 bg-gradient-to-b from-[#0b0e1b] via-[#10132e] to-[#080a16] text-white">
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className="font-semibold text-purple-400 tracking-wider">STEP 1 OF 3</span>
        <button
          onClick={() => {
            sound.playClick();
            onContinue();
          }}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Hero Header */}
      <div className="text-center mt-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
          Learn Programming<br />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Through Games
          </span>
        </h1>
        <p className="mt-2 text-xs font-semibold tracking-wider text-slate-400 flex items-center justify-center gap-2">
          <span>Play</span>
          <span>•</span>
          <span>Learn</span>
          <span>•</span>
          <span>Code</span>
          <span>•</span>
          <span>Master</span>
        </p>
      </div>

      {/* Center 3D Character Illustration with floating badges */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Ambient Ring */}
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-600/30 to-pink-500/10 blur-xl animate-pulse" />

        {/* Floating Code Badges */}
        <div className="absolute top-2 left-6 w-9 h-9 rounded-xl bg-[#1a1f3d] border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-float">
          <span className="text-cyan-400 font-mono text-xs font-bold">&lt;/&gt;</span>
        </div>

        <div className="absolute top-4 right-8 w-9 h-9 rounded-xl bg-[#1a1f3d] border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-500/20 animate-float" style={{ animationDelay: '1s' }}>
          <span className="text-purple-400 font-mono text-xs font-bold">{"{ }"}</span>
        </div>

        <div className="absolute bottom-6 left-10 w-8 h-8 rounded-xl bg-[#1a1f3d] border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/20 animate-float" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        <div className="absolute bottom-4 right-10 w-9 h-9 rounded-xl bg-[#1a1f3d] border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-float" style={{ animationDelay: '0.5s' }}>
          <span className="text-emerald-400 font-mono text-xs font-bold">#py</span>
        </div>

        {/* Character Illustration SVG */}
        <div className="relative z-10 w-44 h-44 rounded-3xl bg-gradient-to-b from-[#1b1e3f] to-[#12142d] border border-purple-500/30 flex items-center justify-center p-4 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
          <div className="flex flex-col items-center">
            {/* Boy Avatar Head */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 overflow-hidden border-2 border-purple-400/50 shadow-inner">
                {/* Hair */}
                <div className="w-full h-8 bg-amber-950 rounded-b-xl" />
                {/* Face Eyes */}
                <div className="flex justify-center gap-3 mt-2">
                  <div className="w-2 h-2.5 rounded-full bg-slate-900" />
                  <div className="w-2 h-2.5 rounded-full bg-slate-900" />
                </div>
                {/* Smile */}
                <div className="w-4 h-2 border-b-2 border-slate-800 rounded-full mx-auto mt-1" />
              </div>
              {/* Headband / VR / Earphones */}
              <div className="absolute -top-1 left-2 right-2 h-3 bg-indigo-600 rounded-full" />
            </div>

            {/* Glowing Laptop */}
            <div className="mt-2 flex items-center gap-1.5 bg-gradient-to-r from-cyan-900/80 to-purple-900/80 border border-cyan-400/40 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Laptop className="w-4 h-4 text-cyan-300" />
              <span className="text-[10px] font-mono text-cyan-200 font-semibold">print("Quest!")</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards List */}
      <div className="space-y-3">
        {/* Card 1: Fun Games */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#141836]/90 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Fun Games</h3>
            <p className="text-xs text-slate-400">Play interactive coding challenges</p>
          </div>
        </div>

        {/* Card 2: Smart Learning */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#141836]/90 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Smart Learning</h3>
            <p className="text-xs text-slate-400">Learn at your own adaptive pace</p>
          </div>
        </div>

        {/* Card 3: Track Progress */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#141836]/90 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Track Progress</h3>
            <p className="text-xs text-slate-400">Earn XP, unlock badges & compete</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-5">
        <button
          onClick={() => {
            sound.playClick();
            onContinue();
          }}
          className="w-full group flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-base shadow-[0_0_24px_rgba(79,70,229,0.5)] hover:shadow-[0_0_32px_rgba(124,58,237,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
