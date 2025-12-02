import React from 'react';
import { Sparkles, Check, X } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Hero Text - Compact */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">
          <span className="text-primary-600">لبخند جدیدت</span> رو ببین!
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[90%] mx-auto">
          بدون مراجعه حضوری، ببین اگر دندوناتو لمینت کنی چه شکلی میشی.
        </p>
      </div>

      {/* Compact Guide */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-secondary-500" />
          <h3 className="font-bold text-gray-800 text-sm">راهنمای عکاسی</h3>
        </div>
        
        <div className="flex gap-3">
          {/* Correct Example */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-green-500/50 shadow-sm">
              <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5">
                <Check size={10} strokeWidth={4} />
              </div>
              <img 
                src="https://i.ibb.co/d0RVk2xY/1.jpg" 
                alt="صحیح" 
                className="w-full h-full object-cover" 
              />
            </div>
            <p className="text-[10px] text-gray-500 text-center font-medium">نمونه عکس صحیح</p>
          </div>
 
          {/* Incorrect Example */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-red-400/50 shadow-sm opacity-80">
               <div className="absolute top-1 right-1 bg-red-400 text-white rounded-full p-0.5">
                <X size={10} strokeWidth={4} />
              </div>
              <img 
                src="https://i.ibb.co/j90NKM7b/2.jpg" 
                alt="غلط" 
                className="w-full h-full object-cover grayscale" 
              />
            </div>
             <p className="text-[10px] text-gray-500 text-center font-medium">نمونه عکس اشتباه</p>
          </div>
        </div>
      </div>
    </div>
  );
};