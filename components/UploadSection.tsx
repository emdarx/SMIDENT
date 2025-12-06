
import React, { useRef } from 'react';
import { Camera, Smile, Syringe, MoveUp, ArrowLeft, Sparkles, UploadCloud, Ticket, MapPin } from 'lucide-react';
import { ProcessState, ServiceType } from '../types';

interface UploadSectionProps {
  onImageSelect: (file: File) => void;
  processState: ProcessState;
  selectedService: ServiceType | null;
  onSelectService: (service: ServiceType | null) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ 
  onImageSelect, 
  processState, 
  selectedService,
  onSelectService
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const isLoading = processState === ProcessState.PROCESSING || processState === ProcessState.UPLOADING;

  // Service Configuration
  const services = [
    {
      id: 'DENTAL' as ServiceType,
      title: 'لمینت دندان',
      icon: <Smile size={28} />,
      color: 'bg-teal-50 text-teal-600 border-teal-100',
      darkColor: 'dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800/50',
      instruction: 'یک عکس واضح با لبخند دندان‌نما بگیرید.'
    },
    {
      id: 'FILLER' as ServiceType,
      title: 'تزریق ژل گونه',
      icon: <Syringe size={28} />,
      color: 'bg-rose-50 text-rose-500 border-rose-100',
      darkColor: 'dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/50',
      instruction: 'یک عکس تمام رخ واضح از چهره بگیرید.'
    },
    {
      id: 'LIFT' as ServiceType,
      title: 'لیفت ابرو',
      icon: <MoveUp size={28} />,
      color: 'bg-indigo-50 text-indigo-500 border-indigo-100',
      darkColor: 'dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800/50',
      instruction: 'مطمئن شوید پیشانی و ابروها با مو پوشانده نشده باشند.'
    },
    {
      id: 'BOTOX' as ServiceType,
      title: 'بوتاکس صورت',
      icon: <Sparkles size={28} />,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      darkColor: 'dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/50',
      instruction: 'عکس تمام رخ بگیرید که خطوط صورت مشخص باشد.'
    }
  ];

  const activeServiceConfig = services.find(s => s.id === selectedService);

  return (
    <div className={`w-full transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col h-full ${selectedService ? 'justify-start' : 'justify-end'}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {!selectedService ? (
        // SERVICE SELECTION LIST
        <div className="flex flex-col gap-3 pb-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-full text-center mb-4">
             <h2 className="text-xl font-black text-gray-800 dark:text-white">میخوای چیکار کنی؟</h2>
          </div>
          
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              disabled={isLoading}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`w-full ${service.color} ${service.darkColor} border-2 relative group overflow-hidden rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] h-20 animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-backwards`}
            >
              <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl shadow-sm shrink-0 transition-colors">
                {service.icon}
              </div>
              <span className="font-bold text-lg text-gray-800 dark:text-gray-100 flex-1 text-right">{service.title}</span>
              <div className="bg-white/40 dark:bg-black/20 p-1 rounded-full">
                 <ArrowLeft size={16} className="text-gray-600 dark:text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        // UPLOAD ACTION AREA WITH ROADMAP
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-700 ease-out flex flex-col h-full w-full">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <button 
              onClick={() => onSelectService(null)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft size={16} />
              بازگشت
            </button>
            <span className="text-base font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
              {activeServiceConfig?.title}
            </span>
          </div>

          {/* Roadmap Steps */}
          <div className="flex-1 w-full px-4 pt-6 relative flex flex-col gap-6 overflow-y-auto custom-scrollbar">
             {/* Vertical Line */}
             <div className="absolute top-6 bottom-12 right-[2.25rem] w-0.5 bg-gray-100 dark:bg-slate-800 -z-10"></div>

             {/* Step 1: Upload (Active) */}
             <div className="flex gap-4 relative animate-in slide-in-from-right-4 duration-700 delay-100 fill-mode-backwards">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-200 dark:shadow-none ring-4 ring-primary-50 dark:ring-primary-900/20 z-10">
                        <UploadCloud size={20} />
                    </div>
                </div>
                <div className="flex-1 bg-white dark:bg-slate-800 border border-primary-100 dark:border-slate-700 p-4 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">آپلود تصویر</h3>
                        <span className="text-[10px] font-bold bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full animate-pulse">مرحله جاری</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {activeServiceConfig?.instruction}
                    </p>
                </div>
             </div>

             {/* Step 2: AI Processing (Inactive) */}
             <div className="flex gap-4 opacity-50 grayscale animate-in slide-in-from-right-4 duration-700 delay-200 fill-mode-backwards">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-gray-500 flex items-center justify-center z-10">
                        <Sparkles size={20} />
                    </div>
                </div>
                <div className="pt-2">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">هوش مصنوعی</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">آنالیز چهره و اعمال تغییرات</p>
                </div>
             </div>

             {/* Step 3: Discount (Inactive) */}
             <div className="flex gap-4 opacity-50 grayscale animate-in slide-in-from-right-4 duration-700 delay-300 fill-mode-backwards">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-gray-500 flex items-center justify-center z-10">
                        <Ticket size={20} />
                    </div>
                </div>
                <div className="pt-2">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">دریافت کد تخفیف</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">آفر ویژه مراجعین اسمیدنت</p>
                </div>
             </div>

             {/* Step 4: Visit (Inactive) */}
             <div className="flex gap-4 opacity-50 grayscale animate-in slide-in-from-right-4 duration-700 delay-500 fill-mode-backwards">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-gray-500 flex items-center justify-center z-10">
                        <MapPin size={20} />
                    </div>
                </div>
                <div className="pt-2">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">مراجعه حضوری</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">مشاوره و درمان نهایی</p>
                </div>
             </div>
          </div>
          
          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-xl shadow-gray-200 dark:shadow-none active:scale-[0.98] transition-all duration-200 group h-16 mt-4 mb-6 flex-shrink-0 z-20"
          >
            <Camera size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="text-base font-bold">انتخاب تصویر چهره شما</span>
          </button>
        </div>
      )}
    </div>
  );
};
