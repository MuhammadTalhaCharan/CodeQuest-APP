import React from 'react';
import { ArrowLeft, MoreVertical, Heart } from 'lucide-react';
import { sound } from '../../services/sound';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showMore?: boolean;
  onMore?: () => void;
  lives?: number;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  onBack,
  showMore = true,
  onMore,
  lives,
  rightElement,
}) => {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3 sticky top-0 z-30 bg-[#0d1022]/90 backdrop-blur-md border-b border-purple-900/20">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => {
              sound.playClick();
              if (onBack) onBack();
            }}
            className="w-10 h-10 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-700/30 flex items-center justify-center text-slate-200 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-[280px]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {lives !== undefined && (
          <div className="flex items-center gap-1 bg-red-950/40 border border-red-800/40 px-3 py-1.5 rounded-full">
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-xs font-bold text-red-300">{lives}</span>
          </div>
        )}

        {rightElement}

        {showMore && !rightElement && (
          <button
            onClick={() => {
              sound.playClick();
              if (onMore) onMore();
            }}
            className="w-10 h-10 rounded-xl hover:bg-purple-900/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
