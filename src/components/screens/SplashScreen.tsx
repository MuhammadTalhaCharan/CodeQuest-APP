import React from 'react';
import { ArrowRight, Gamepad2, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../../services/sound';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between items-center px-6 pt-12 pb-10 bg-gradient-to-b from-[#0b0e1b] via-[#120f30] to-[#070914] text-white overflow-hidden select-none">
      {/* Background Ambient Stars & Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Branding Section */}
      <div className="relative z-10 flex flex-col items-center mt-6 text-center">
        {/* Neon Controller Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 p-0.5 shadow-[0_0_40px_rgba(168,85,247,0.6)] animate-float">
            <div className="w-full h-full bg-[#10132b] rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/20" />
              <Gamepad2 className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
              <Sparkles className="w-4 h-4 text-purple-300 absolute top-2 right-2 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
          CodeQuest
        </h1>
        <p className="mt-2 text-base font-medium tracking-widest text-cyan-400/90 uppercase">
          Learn. Play. Code.
        </p>
      </div>

      {/* Center Illustration: Mountain Night Landscape & Neon Path */}
      <div className="relative w-full max-w-sm h-64 my-auto flex items-end justify-center">
        {/* Mountain Silhouettes */}
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="mountGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="mountGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#070914" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="pathGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Distant Mountains */}
          <polygon points="40,200 110,90 190,200" fill="url(#mountGrad1)" opacity="0.6" />
          <polygon points="130,200 220,70 300,200" fill="url(#mountGrad1)" opacity="0.7" />
          
          {/* Near Mountains */}
          <polygon points="0,220 90,120 180,220" fill="url(#mountGrad2)" />
          <polygon points="140,220 240,110 320,220" fill="url(#mountGrad2)" />

          {/* Winding Neon Road */}
          <path
            d="M 160 220 Q 150 170 170 150 T 160 120"
            fill="none"
            stroke="url(#pathGlow)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />

          {/* Tiny Adventurer Silhouette on Path */}
          <g transform="translate(153, 130)">
            {/* Backpack / Body */}
            <circle cx="7" cy="4" r="4" fill="#38bdf8" />
            <rect x="4" y="9" width="6" height="12" rx="3" fill="#a855f7" />
            <rect x="2" y="10" width="3" height="8" rx="1.5" fill="#f43f5e" />
            <rect x="4" y="21" width="2.5" height="7" rx="1" fill="#1e293b" />
            <rect x="7.5" y="21" width="2.5" height="7" rx="1" fill="#1e293b" />
          </g>
        </svg>

        {/* Floating tiny code sparkles */}
        <div className="absolute top-2 left-6 text-xs font-mono text-cyan-400/40 animate-pulse">
          &lt;/&gt;
        </div>
        <div className="absolute top-10 right-8 text-xs font-mono text-purple-400/40 animate-pulse">
          {"{ }"}
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="relative z-10 w-full max-w-sm">
        <button
          onClick={() => {
            sound.playClick();
            onStart();
          }}
          className="w-full group relative flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-base shadow-[0_0_28px_rgba(79,70,229,0.5)] hover:shadow-[0_0_36px_rgba(124,58,237,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          Over 50,000+ coders playing daily
        </p>
      </div>
    </div>
  );
};
