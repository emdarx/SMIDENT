import React from 'react';
import { Sparkles, Check, X, Camera } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <div className="space-y-3 w-full">
      {/* Ultra Compact Hero */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-black text-gray-800 tracking-tight">
          <span className="text-primary-600">لبخند جدیدت</span> رو ببین!
        </h2>
        <p className="text-[11px] text-gray-400">
          پیش‌نمایش لمینت دندان با هوش مصنوعی
        </p>
      </div>

      {/* Mini Guide */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-100">
        <div className="flex items-center gap-1.5 mb-2 opacity-80">
          <Camera size={14} className="text-secondary-500" />
          <h3 className="font-bold text-gray-700 text-xs">راهنمای عکاسی</h3>
        </div>
        
        <div className="flex gap-2 h-20">
          {/* Correct Example */}
          <div className="flex-1 relative rounded-lg overflow-hidden border border-green-500/30 group">
            <img 
              src="https://i.ibb.co/d0RVk2xY/1.jpg" 
              alt="صحیح" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent flex items-end justify-center pb-1">
               <div className="flex items-center gap-1 text-[9px] text-white font-bold bg-green-500/80 px-1.5 py-0.5 rounded-full backdrop-blur-md">
                 <Check size={8} strokeWidth={4} />
                 <span>روشن و واضح</span>
               </div>
            </div>
          </div>
 
          {/* Incorrect Example */}
          <div className="flex-1 relative rounded-lg overflow-hidden border border-red-400/30 opacity-90 grayscale-[0.5]">
             <img 
              src="https://i.ibb.co/j90NKM7b/2.jpg" 
              alt="غلط" 
              className="w-full h-full object-cover" 
            />
             <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent flex items-end justify-center pb-1">
               <div className="flex items-center gap-1 text-[9px] text-white font-bold bg-red-500/80 px-1.5 py-0.5 rounded-full backdrop-blur-md">
                 <X size={8} strokeWidth={4} />
                 <span>تاریک یا کج</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};