import React, { useRef } from 'react';
import { DiscountData } from '../types';
import { Sparkles, Copy, Phone, MapPin, CalendarCheck } from 'lucide-react';

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
  const infoRef = useRef<HTMLDivElement>(null);

  const copyCode = () => {
    if (discount) {
      navigator.clipboard.writeText(discount.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookClick = () => {
    infoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="px-4 pb-20 space-y-6 animate-fade-in">
      {/* Images */}
      <div className="space-y-2">
        <h3 className="font-bold text-gray-800 text-center text-lg">✨ لبخند جدید شما ✨</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="relative rounded-2xl overflow-hidden shadow-md border-4 border-white">
            <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10">بعد (طراحی شده)</span>
            <img src={resultImage} alt="New Smile" className="w-full h-auto object-cover" />
          </div>
          <div className="relative rounded-xl overflow-hidden border border-gray-200 opacity-80 scale-95">
             <span className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10">قبل</span>
            <img src={originalImage} alt="Original" className="w-full h-auto object-cover max-h-40 mx-auto" />
          </div>
        </div>
      </div>

      {/* Info Wrapper for scrolling */}
      <div ref={infoRef} className="space-y-6 scroll-mt-24">
        {/* Discount Card */}
        {discount && (
          <div className="bg-gradient-to-r from-secondary-500 to-yellow-500 rounded-2xl p-1 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="bg-white rounded-xl p-5 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-secondary-500 font-bold">
                <Sparkles size={20} />
                <span>تبریک! شما برنده شدید</span>
              </div>
              
              <div className="text-4xl font-black text-gray-800">
                {discount.percent}٪ <span className="text-lg font-medium text-gray-500">تخفیف</span>
              </div>
              
              <p className="text-sm text-gray-500">
                روی کلیه خدمات زیبایی دندانپزشکی
              </p>

              <div 
                onClick={copyCode}
                className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-between cursor-pointer active:bg-gray-200 transition-colors"
              >
                <code className="font-mono text-lg font-bold text-gray-700 tracking-wider">
                  {discount.code}
                </code>
                <div className="flex items-center gap-1 text-xs text-primary-600 font-bold">
                  {copied ? 'کپی شد!' : 'کپی'}
                  <Copy size={14} />
                </div>
              </div>
               <p className="text-[10px] text-red-500 mt-1">
                * مهلت استفاده از این کد محدود است
              </p>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4 border border-gray-100">
          <h4 className="font-bold text-gray-800 text-center">تماس و رزرو نوبت</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <MapPin className="text-primary-500 shrink-0 mt-1" size={18} />
              <p className="leading-relaxed">
                تهرانپارس، خیابان امیری طائمه، ساختمان میخوش، طبقه ۵
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <a href="tel:09109090921" className="flex items-center justify-center gap-2 bg-primary-50 text-primary-700 py-3 rounded-xl font-bold hover:bg-primary-100 transition-colors">
                <Phone size={18} />
                09109090921
              </a>
              <a href="tel:02177746371" className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
                <Phone size={16} />
                02177746371
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 z-40">
        <div className="max-w-md mx-auto flex gap-3">
          <button 
            onClick={onReset}
            className="flex-1 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl"
          >
            تست مجدد
          </button>
          <button 
            onClick={handleBookClick}
            className="flex-[2] py-3 text-sm font-bold text-white bg-primary-600 rounded-xl shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2 animate-bounce-slow"
          >
            <CalendarCheck size={18} />
            رزرو وقت با تخفیف
          </button>
        </div>
      </div>
    </div>
  );
};