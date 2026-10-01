import React from 'react';
import { X, Award, CheckCircle2, Download, Share2, ShieldCheck } from 'lucide-react';
import { CertificateItem } from '../../types';
import { sound } from '../../services/sound';

interface CertificateModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0e122b] border-2 border-amber-400/50 p-6 shadow-2xl space-y-6 text-white overflow-hidden">
        {/* Ambient Seal Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800/40 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Canvas / Parchment Layout */}
        <div className="p-6 rounded-2xl bg-[#f8fafc] text-slate-900 border-4 border-double border-amber-600/60 shadow-xl space-y-4 text-center relative">
          <div className="flex items-center justify-between border-b pb-2 border-slate-300">
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">
              OFFICIAL VERIFIED CREDENTIAL
            </span>
            <span className="text-[10px] font-mono text-slate-500">ID: {cert.credentialId}</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 tracking-tight font-serif uppercase">
              CERTIFICATE OF COMPLETION
            </h2>
            <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
          </div>

          <div className="py-1">
            <h3 className="text-2xl font-extrabold text-blue-900 underline decoration-amber-500 decoration-2 font-serif">
              {cert.recipientName}
            </h3>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed max-w-sm mx-auto">
            for successfully mastering the curriculum and interactive coding challenges in
          </p>

          <h4 className="text-base font-bold text-slate-950 bg-amber-100/70 py-1.5 px-3 rounded-lg border border-amber-300">
            {cert.course}
          </h4>

          {/* Seal & Signatures */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-300 text-left">
            <div>
              <span className="text-[9px] text-slate-500 block uppercase font-mono">Issued By</span>
              <span className="text-xs font-bold text-slate-800">{cert.organization}</span>
              <span className="text-[10px] text-slate-500 block">{cert.completionDate}</span>
            </div>

            {/* Gold Seal Graphic */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center p-0.5 shadow-md">
              <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900/60 flex flex-col items-center justify-center text-amber-950 font-bold text-[8px] leading-tight text-center">
                <ShieldCheck className="w-4 h-4 text-amber-900" />
                VERIFIED
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              sound.playClick();
              alert(`Certificate ${cert.credentialId} ready for download!`);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              alert('Credential link copied to clipboard!');
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-600/40 text-purple-200 font-bold text-xs cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Badge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
