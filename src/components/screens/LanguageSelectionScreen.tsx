import React, { useState } from 'react';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ProgrammingLanguage } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/curriculum';
import { sound } from '../../services/sound';

interface LanguageSelectionScreenProps {
  currentLanguage: ProgrammingLanguage;
  onSelect: (lang: ProgrammingLanguage) => void;
  onContinue: () => void;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  currentLanguage,
  onSelect,
  onContinue,
}) => {
  const [selected, setSelected] = useState<ProgrammingLanguage>(currentLanguage || 'python');

  const handleChoose = (id: ProgrammingLanguage) => {
    setSelected(id);
    onSelect(id);
    sound.playClick();
  };

  const getLanguageIcon = (id: ProgrammingLanguage) => {
    switch (id) {
      case 'python':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-yellow-500/80 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-sm text-yellow-400">
              <span className="text-blue-400 font-extrabold mr-0.5">Py</span>th
            </div>
          </div>
        );
      case 'java':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 p-0.5 shadow-md shadow-red-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-xs text-red-400">
              ☕ Java
            </div>
          </div>
        );
      case 'cpp':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 p-0.5 shadow-md shadow-blue-600/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-mono font-extrabold text-sm text-blue-300">
              C++
            </div>
          </div>
        );
      case 'dart':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-sm text-cyan-300">
              🎯 Dart
            </div>
          </div>
        );
      case 'javascript':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 p-0.5 shadow-md shadow-yellow-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-yellow-400 rounded-[10px] flex items-center justify-center font-bold text-base text-slate-900">
              JS
            </div>
          </div>
        );
      case 'typescript':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-sm text-blue-400">
              TS
            </div>
          </div>
        );
      case 'rust':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-amber-700 p-0.5 shadow-md shadow-orange-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-xs text-orange-300">
              🦀 Rust
            </div>
          </div>
        );
      case 'golang':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 p-0.5 shadow-md shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-extrabold text-sm text-cyan-300">
              Go
            </div>
          </div>
        );
      case 'kotlin':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5 shadow-md shadow-purple-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-xs text-purple-300">
              Kotlin
            </div>
          </div>
        );
      case 'swift':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-0.5 shadow-md shadow-red-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-xs text-orange-300">
              Swift
            </div>
          </div>
        );
      case 'php':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-xs text-indigo-300">
              PHP
            </div>
          </div>
        );
      case 'sql':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-extrabold text-xs text-amber-300">
              SQL
            </div>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-purple-600 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#121630] rounded-[10px] flex items-center justify-center font-bold text-xs text-purple-300">
              Code
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between px-6 pt-8 pb-8 bg-gradient-to-b from-[#0b0e1b] via-[#10132e] to-[#080a16] text-white">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          What do you want to learn?
        </h1>
        <p className="mt-1.5 text-sm text-slate-400 font-medium">
          Choose from 12 interactive programming tracks
        </p>
      </div>

      {/* Language Cards with scroll */}
      <div className="my-4 max-h-[480px] overflow-y-auto no-scrollbar space-y-2.5 pr-0.5">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = selected === lang.id;

          return (
            <div
              key={lang.id}
              onClick={() => handleChoose(lang.id)}
              className={`group relative flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-[#1b1f40] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.01]'
                  : 'bg-[#141836]/80 hover:bg-[#181d42] border border-purple-900/30 hover:border-purple-600/40'
              }`}
            >
              <div className="flex items-center gap-4">
                {getLanguageIcon(lang.id)}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white">{lang.name}</h3>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{lang.levelAvailability}</p>
                </div>
              </div>

              <div className="flex items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="mt-auto">
        <button
          onClick={() => {
            sound.playClick();
            onContinue();
          }}
          className="w-full group flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-base shadow-[0_0_24px_rgba(79,70,229,0.5)] hover:shadow-[0_0_32px_rgba(124,58,237,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
