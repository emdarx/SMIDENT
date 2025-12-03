import React, { useState } from 'react';
import { DiscountData } from '../types';
import { Sparkles, Copy, CalendarCheck, RotateCcw, X, MapPin, Phone, Instagram } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const copyCode = () => {
    if (discount) {
      navigator.clipboard.writeText(discount.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col h-full bg-black relative">
        {/* Main Image Area */}
        <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
          <img 
            src={resultImage} 
            alt="New Smile" 
            className="w-full h-full object-contain" 
          />
          
          {/* Picture-in-Picture Original */}
          <div className="absolute top-4 left-4 w-20 h-20 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg bg-gray-800/50 backdrop-blur-sm">
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-cover opacity-90" 
            />
            <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] text-center py-0.5 backdrop-blur-md">قبل</span>
          </div>

          <span className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
            SMIDENT AI
          </span>
        </div>

        {/* Bottom Actions Sheet */}
        <div className="bg-white rounded-t-3xl p-5 pt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] relative z-10 -mt-6 space-y-4">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full"></div>

          {discount && (
            <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-100">
               <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg text-orange-500 shadow-sm">
                     <Sparkles size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">تخفیف ویژه {discount.percent}٪</div>
                    <div className="text-[10px] text-gray-500">کد اختصاصی شما</div>
                  </div>
               </div>
               
               <button 
                  onClick={copyCode}
                  className="flex items-center gap-2 bg-white border border-orange-100 px-3 py-1.5 rounded-lg active:bg-orange-50 transition-colors shadow-sm"
               >
                  <code className="font-mono text-sm font-bold text-orange-600">{discount.code}</code>
                  {copied ? <span className="text-green-600 text-[10px]">کپی شد</span> : <Copy size={12} className="text-gray-400"/>}
               </button>
            </div>
          )}

          <div className="flex gap-3">
            <button 
              onClick={onReset}
              className="flex-none w-14 h-12 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center transition-colors"
            >
              <RotateCcw size={20} />
            </button>
            
            <button 
              onClick={() => setShowModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-[0.98] h-12"
            >
              <CalendarCheck size={18} />
              رزرو وقت مشاوره
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6 mt-2">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-primary-600">
                <CalendarCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">تماس با کلینیک</h3>
              <p className="text-sm text-gray-500 mt-1">برای دریافت مشاوره رایگان تماس بگیرید</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                <MapPin className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-right">
                  <span className="block text-xs font-bold text-gray-400 mb-1">آدرس</span>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
تهران، تهرانپارس، خیابان امیری طائمه، ساختمان میخوش پلاک 125 واحد 5
                  </p>
                </div> 
              </div>

              <a href="tel:02122334455" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <Phone className="text-primary-600 flex-shrink-0" size={20} />
                <div className="text-right flex-1">
                   <span className="block text-xs font-bold text-gray-400 mb-0.5">تلفن ثابت</span>
                   <p className="text-sm font-bold text-gray-800 font-mono dir-ltr text-left">02177746371</p>
                </div>
              </a>

              <a href="tel:09121234567" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <Phone className="text-primary-600 flex-shrink-0" size={20} />
                <div className="text-right flex-1">
                   <span className="block text-xs font-bold text-gray-400 mb-0.5">همراه</span>
                   <p className="text-sm font-bold text-gray-800 font-mono dir-ltr text-left">09109090921</p>
                </div>
              </a>
            </div>

            <button 
               onClick={() => setShowModal(false)}
               className="w-full mt-6 bg-gray-900 text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
};