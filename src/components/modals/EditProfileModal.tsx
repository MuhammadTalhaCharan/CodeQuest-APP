import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { UserProfile, ProgrammingLanguage } from '../../types';
import { sound } from '../../services/sound';

interface EditProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<UserProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [selectedLang, setSelectedLang] = useState<ProgrammingLanguage>(profile.selectedLanguage);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playClick();
    onSave({ name, selectedLanguage: selectedLang });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl bg-[#141838] border border-cyan-500/40 p-6 space-y-5 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">Edit Profile</h3>
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

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-[#0c0f24] border border-purple-900/50 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Current Learning Language
            </label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value as ProgrammingLanguage)}
              className="w-full rounded-xl bg-[#0c0f24] border border-purple-900/50 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none capitalize"
            >
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="dart">Dart</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="rust">Rust</option>
              <option value="golang">Go (Golang)</option>
              <option value="kotlin">Kotlin</option>
              <option value="swift">Swift</option>
              <option value="php">PHP</option>
              <option value="sql">SQL</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#0e122b] text-slate-400 text-xs font-bold hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-md cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
