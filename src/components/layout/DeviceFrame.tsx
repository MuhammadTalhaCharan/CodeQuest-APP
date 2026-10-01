import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Sparkles, Compass, Layers } from 'lucide-react';
import { ScreenId } from '../../types';
import { sound } from '../../services/sound';
import { FlutterStudioModal } from '../modals/FlutterStudioModal';

interface DeviceFrameProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  currentScreen,
  onNavigate,
  children,
}) => {
  const [isFramed, setIsFramed] = useState(true);
  const [showQuickSwitcher, setShowQuickSwitcher] = useState(false);
  const [showFlutterStudio, setShowFlutterStudio] = useState(false);

  // List of all 15 screens from the reference image
  const screenshotScreens: { id: ScreenId; num: number; name: string }[] = [
    { id: 'splash', num: 1, name: 'Splash Screen' },
    { id: 'onboarding', num: 2, name: 'Onboarding' },
    { id: 'language_selection', num: 3, name: 'Language Selection' },
    { id: 'home', num: 4, name: 'Home Dashboard' },
    { id: 'map', num: 5, name: 'Learning Map' },
    { id: 'game_loop', num: 6, name: 'Game Screen (Loops)' },
    { id: 'code_challenge', num: 7, name: 'Code Challenge' },
    { id: 'ai_mentor', num: 8, name: 'AI Teacher / Hint' },
    { id: 'progress', num: 9, name: 'Progress / Analytics' },
    { id: 'achievements', num: 10, name: 'Achievements' },
    { id: 'leaderboard', num: 11, name: 'Leaderboard' },
    { id: 'daily_challenge', num: 12, name: 'Daily Challenge' },
    { id: 'lesson_explanation', num: 13, name: 'Explanation Screen' },
    { id: 'profile', num: 14, name: 'Avatar / Profile' },
    { id: 'certificates', num: 15, name: 'Certificates' },
    { id: 'decision_maze', num: 16, name: 'Decision Maze (5 Rds)' },
    { id: 'syntax_puzzle', num: 17, name: 'Syntax Puzzle (5 Rds)' },
    { id: 'loop_patterns', num: 18, name: 'Loop Matrix Builder' },
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col items-center justify-start p-2 sm:p-6 overflow-x-hidden">
      {/* Top Inspector & Switcher Bar */}
      <header className="w-full max-w-5xl mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#0f132a]/90 backdrop-blur-md border border-purple-900/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-[#10132b] rounded-[10px] flex items-center justify-center font-black text-cyan-300 text-xs">
              CQ
            </div>
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-extrabold tracking-wide text-white">
              CodeQuest Mobile Engine
            </h1>
            <p className="text-[10px] text-slate-400">15 Mockup Screens Implemented</p>
          </div>
        </div>

        {/* Quick Screen Selector Dropdown / Button */}
        <div className="flex items-center gap-2">
          {/* Flutter App Code & Architecture Studio */}
          <button
            onClick={() => {
              sound.playClick();
              setShowFlutterStudio(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 border border-cyan-400/50 text-white text-xs font-bold cursor-pointer transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            title="Inspect Flutter Mobile source code"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
            <span>Flutter App Source</span>
          </button>

          <button
            onClick={() => setShowQuickSwitcher(!showQuickSwitcher)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/40 text-purple-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Screen Selector (1–18)</span>
            <span className="sm:hidden">Screens</span>
          </button>

          {/* Device Frame View Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setIsFramed(!isFramed);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171c3d] hover:bg-[#202754] border border-cyan-500/30 text-cyan-300 text-xs font-semibold cursor-pointer transition-colors"
          >
            {isFramed ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFramed ? 'Full View' : 'Phone Frame'}</span>
          </button>
        </div>
      </header>

      {/* Screen Selector Drawer Modal */}
      {showQuickSwitcher && (
        <div className="w-full max-w-5xl mb-4 p-4 rounded-2xl bg-[#141838] border border-cyan-500/40 shadow-2xl animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-900/40">
            <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              DIRECT SCREEN JUMP (Matches Reference Image Screens 1–15)
            </span>
            <button
              onClick={() => setShowQuickSwitcher(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {screenshotScreens.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(s.id);
                  setShowQuickSwitcher(false);
                }}
                className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                  currentScreen === s.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-cyan-400 text-white font-bold shadow-md'
                    : 'bg-[#0d1024] border-purple-900/40 text-slate-300 hover:bg-[#1a1f46]'
                }`}
              >
                <span className="text-[10px] font-mono text-purple-300 block mb-0.5">
                  Screen {s.num}
                </span>
                <span className="truncate block font-semibold">{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Container: either Phone Frame or Full Container */}
      <main className="w-full flex justify-center items-center my-auto">
        {isFramed ? (
          /* Realistic Smartphone Bezel Container matching Screenshot */
          <div className="relative w-full max-w-[400px] h-[830px] rounded-[52px] bg-[#1a1d33] p-3 shadow-[0_0_60px_rgba(79,70,229,0.35),0_25px_50px_-12px_rgba(0,0,0,0.8)] border-[4px] border-[#2d3359] flex flex-col overflow-hidden select-none">
            {/* Phone Speaker/Island Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-28 h-5 bg-black rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b] mr-3" />
              <div className="w-2 h-2 rounded-full bg-[#0284c7]/40" />
            </div>

            {/* Status Bar: "9:41", Wifi, Battery matching Screenshot */}
            <div className="relative z-40 flex items-center justify-between px-7 pt-2 pb-1 text-white text-xs font-semibold pointer-events-none">
              <span className="font-bold tracking-tight">9:41</span>
              <div className="flex items-center gap-1.5 text-white">
                <div className="flex gap-0.5 items-end h-2.5">
                  <div className="w-0.5 h-1 bg-white rounded-xs" />
                  <div className="w-0.5 h-1.5 bg-white rounded-xs" />
                  <div className="w-0.5 h-2 bg-white rounded-xs" />
                  <div className="w-0.5 h-2.5 bg-white rounded-xs" />
                </div>
                <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                <Battery className="w-4 h-4 fill-white" />
              </div>
            </div>

            {/* Inner App Screen Viewport */}
            <div className="relative flex-1 w-full h-full rounded-[42px] overflow-hidden bg-[#0b0e1b] flex flex-col">
              <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
                {children}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-full flex justify-center py-1.5 bg-transparent pointer-events-none">
                <div className="w-32 h-1 bg-slate-500/70 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Full Responsive View */
          <div className="w-full max-w-md h-[830px] rounded-3xl bg-[#0b0e1b] border border-purple-900/40 overflow-hidden shadow-2xl flex flex-col relative">
            <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
              {children}
            </div>
          </div>
        )}
      </main>

      {/* Flutter Codebase Studio Modal */}
      <FlutterStudioModal
        isOpen={showFlutterStudio}
        onClose={() => setShowFlutterStudio(false)}
      />
    </div>
  );
};
