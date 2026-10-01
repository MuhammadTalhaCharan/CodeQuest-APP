import React, { useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { INITIAL_CERTIFICATES } from '../../data/certificates';
import { CertificateItem } from '../../types';
import { CertificateModal } from '../modals/CertificateModal';
import { sound } from '../../services/sound';

interface CertificatesScreenProps {
  onBack: () => void;
}

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({ onBack }) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const openCert = (cert: CertificateItem) => {
    sound.playClick();
    setSelectedCert(cert);
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col bg-[#0b0e1b] text-white">
      {/* Header matching Screenshot 15 */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 bg-[#0d1022]/90 backdrop-blur-md sticky top-0 z-30 border-b border-purple-900/30">
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
          Certificates
        </h1>
      </div>

      {/* Certificate List matching Screenshot 15 */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 pb-24 no-scrollbar">
        {/* Certificate Card 1: DigiSkills Data Analytics & BI */}
        <div className="p-4 rounded-3xl bg-[#141838] border border-amber-500/30 shadow-lg space-y-3.5">
          <div className="flex items-start gap-4">
            {/* White Diploma Thumbnail matching Screenshot 15 */}
            <div className="w-16 h-20 rounded-xl bg-white border border-slate-300 p-1.5 shadow-md flex flex-col items-center justify-between flex-shrink-0">
              <div className="w-full h-1 bg-amber-500 rounded" />
              <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-inner">
                <Award className="w-3.5 h-3.5 text-slate-900" />
              </div>
              <div className="space-y-0.5 w-full">
                <div className="w-full h-0.5 bg-slate-300 rounded" />
                <div className="w-3/4 h-0.5 bg-slate-300 rounded" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">DigiSkills</span>
              <h3 className="font-extrabold text-sm text-white leading-tight">
                Data Analytics & BI
              </h3>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openCert(INITIAL_CERTIFICATES[0])}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            View Certificate
          </button>
        </div>

        {/* Certificate Card 2: Python Programming Beginner Level */}
        <div className="p-4 rounded-3xl bg-[#141838] border border-cyan-500/30 shadow-lg space-y-3.5">
          <div className="flex items-start gap-4">
            {/* Python Snake Emblem Badge Thumbnail matching Screenshot 15 */}
            <div className="w-16 h-20 rounded-xl bg-[#0e122b] border border-yellow-500/40 p-2 shadow-md flex flex-col items-center justify-center flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-yellow-500 p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#121630] rounded-[8px] flex items-center justify-center text-xs font-black text-yellow-400">
                  Py
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-cyan-400 mt-1">PYTHON</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-white leading-tight">
                Python Programming
              </h3>
              <p className="text-xs text-slate-400">Beginner Level</p>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openCert(INITIAL_CERTIFICATES[1])}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            View Certificate
          </button>
        </div>
      </div>

      {/* Certificate Detailed Modal */}
      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  );
};
