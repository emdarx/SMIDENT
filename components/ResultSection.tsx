import React, { useRef } from 'react';
import { DiscountData } from '../types';
import { Sparkles, Copy, CalendarCheck, RotateCcw } from 'lucide-react';

interface ResultSectionProps {
  originalImage: string;
  resultImage: string;
  discount: DiscountData | null;
  onReset: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ 
  originalImage, 
  resultImage, 
  discount,
  onReset 
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyCode = () => {
    if (discount) {
      navigator.clipboard.writeText(discount.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-black relative">
      {/* Main Image Area - Takes remaining space */}
      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
        <img 
          src={resultImage} 
          alt="New Smile" 
          className="w-full h-full object-contain" 
        />
        
        {/* Original Image Overlay (Picture-in-Picture) */}
        <div className="absolute top-4 left-4 w-24 h-24 rounded-xl overflow-hidden border-2 border-white/50 shadow-lg bg-gray-800">
          <img 
            src={originalImage} 
            alt="Original" 
            className="w-full h-full object-cover opacity-80" 
          />
          <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] text-center py-0.5">قبل</span>
        </div>

        <span className="absolute top-4 right-4 bg-primary-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ✨ طراحی شده
        </span>
      </div>

      {/* Bottom Sheet - Fixed height content */}
      <div className="bg-white rounded-t-3xl p-5 pt-6 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] relative z-10 -mt-4 space-y-4">
        {/* Handle bar for visual cue */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-200 rounded-full"></div>

        {discount && (
          <div className="flex items-center justify-between bg-orange-50 rounded-xl p-3 border border-orange-100">
             <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                   <Sparkles size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">تخفیف ویژه {discount.percent}٪</div>
                  <div className="text-[10px] text-gray-500">برای خدمات زیبایی</div>
                </div>
             </div>
             
             <button 
                onClick={copyCode}
                className="flex items-center gap-2 bg-white border border-orange-200 px-3 py-2 rounded-lg active:bg-orange-50 transition-colors"
             >
                <code className="font-mono text-sm font-bold text-orange-600 tracking-wider">{discount.code}</code>
                {copied ? <span className="text-green-500 text-xs">کپی!</span> : <Copy size={14} className="text-gray-400"/>}
             </button>
          </div>
        )}

        <div className="flex gap-3">
          <button 
            onClick={onReset}
            className="flex-none w-14 h-14 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl flex items-center justify-center transition-colors"
          >
            <RotateCcw size={22} />
          </button>
          
          <a href="tel:09109090921" className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-[0.98]">
            <CalendarCheck size={20} />
            رزرو وقت مشاوره
          </a>
        </div>
      </div>
    </div>
  );
};