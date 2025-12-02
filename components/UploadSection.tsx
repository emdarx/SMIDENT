import React, { useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';
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
    <div className="px-4 pb-6">
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
        className={`w-full relative overflow-hidden group bg-white border-2 border-dashed ${isLoading ? 'border-gray-300 cursor-not-allowed' : 'border-primary-500 hover:bg-primary-50 active:scale-95'} transition-all duration-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-center`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 size={40} className="text-primary-500 animate-spin mb-2" />
            <span className="text-primary-600 font-bold">دندانپزشک هوشمند در حال بررسی...</span>
            <span className="text-xs text-gray-400 mt-1">لطفا چند لحظه صبر کنید</span>
          </div>
        ) : (
          <>
            <div className="bg-primary-100 text-primary-600 p-4 rounded-full">
              <Camera size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">آپلود یا گرفتن عکس</h3>
              <p className="text-sm text-gray-500 mt-1">
                برای شروع اینجا کلیک کنید
              </p>
            </div>
          </>
        )}
      </button>
    </div>
  );
};