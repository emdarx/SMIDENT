import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { ProcessState } from '../types';

interface UploadSectionProps {
  onImageSelect: (file: File) => void;
  processState: ProcessState;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelect, processState }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const isLoading = processState === ProcessState.PROCESSING || processState === ProcessState.UPLOADING;

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
        className="w-full bg-gray-900 hover:bg-black text-white rounded-2xl p-4 flex items-center justify-between shadow-xl shadow-gray-200 active:scale-[0.98] transition-all duration-200 group relative overflow-hidden h-20"
      >
        <div className="flex items-center gap-4 z-10">
          <div className="bg-white/20 p-2.5 rounded-xl text-white">
            <Camera size={24} />
          </div>
          <div className="text-right">
            <span className="block text-base font-bold">انتخاب تصویر</span>
            <span className="block text-[11px] text-gray-300">از گالری یا دوربین</span>
          </div>
        </div>
        
        {/* Decorative arrow or icon */}
        <div className="bg-white rounded-full p-2 text-gray-900 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all z-10">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>

        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    </div>
  );
};