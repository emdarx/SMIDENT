import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white text-center shadow-lg">
        <h2 className="text-2xl font-black mb-2">لبخند جدیدت رو ببین!</h2>
        <p className="text-primary-50 text-sm leading-relaxed opacity-90">
          با هوش مصنوعی پیشرفته، بدون نیاز به مراجعه حضوری، ببین اگر دندون‌هاتو لمینت یا کامپوزیت کنی چه شکلی میشی.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Sparkles size={18} className="text-secondary-500" />
          راهنمای عکاسی
        </h3>
        <p className="text-xs text-gray-500">برای بهترین نتیجه طبق الگوی زیر عکس بگیرید:</p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-2 rounded-xl border-2 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">
              صحیح
            </div>
            {/* Good Example: Close up Smile */}
            <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                <img 
                  src="https://i.ibb.co/991r3bMK/1.jpg" 
                  alt="نمونه صحیح - لبخند باز و دندان‌های جفت شده" 
                  className="w-full h-full object-cover" 
                />
            </div>
            <p className="text-[10px] text-center text-gray-600">
              لبخند بسته (دندان‌ها روی هم)، نور کافی
            </p>
          </div>

          <div className="bg-white p-2 rounded-xl border-2 border-red-400 relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-red-400 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">
              غلط
            </div>
            {/* Bad Example: Open mouth / Dental Checkup style */}
            <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                <img 
                  src="https://i.ibb.co/xqqwsq2c/2.jpg" 
                  alt="نمونه غلط - دهان باز" 
                  className="w-full h-full object-cover grayscale opacity-70" 
                />
            </div>
            <p className="text-[10px] text-center text-gray-600">
              دهان خیلی باز، زاویه نامناسب یا تاریک
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};