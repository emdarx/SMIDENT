import React, { useRef } from 'react';
import { Camera, Smile, Syringe, MoveUp, ArrowLeft, ScanFace } from 'lucide-react';
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
      instruction: 'لطفاً یک عکس واضح با لبخند دندان‌نما بگیرید.'
    },
    {
      id: 'FILLER' as ServiceType,
      title: 'تزریق ژل گونه',
      icon: <Syringe size={28} />,
      color: 'bg-rose-50 text-rose-500 border-rose-100',
      instruction: 'لطفاً یک عکس تمام رخ واضح از چهره بگیرید.'
    },
    {
      id: 'LIFT' as ServiceType,
      title: 'لیفت ابرو',
      icon: <MoveUp size={28} />,
      color: 'bg-indigo-50 text-indigo-500 border-indigo-100',
      instruction: 'لطفاً مطمئن شوید پیشانی و ابروها با مو پوشانده نشده باشند.'
    }
  ];

  const activeServiceConfig = services.find(s => s.id === selectedService);

  return (
    <div className={`w-full transition-all duration-300 h-full flex flex-col ${selectedService ? 'justify-start' : 'justify-end'}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {!selectedService ? (
        // SERVICE SELECTION LIST
        <div className="flex flex-col gap-3 pb-4 w-full">
          <div className="w-full text-center mb-4">
             <h2 className="text-xl font-black text-gray-800">میخوای چیکار کنی؟</h2>
          </div>
          
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              disabled={isLoading}
              className={`w-full ${service.color} border-2 relative group overflow-hidden rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] h-20`}
            >
              <div className="bg-white p-2.5 rounded-xl shadow-sm shrink-0">
                {service.icon}
              </div>
              <span className="font-bold text-lg text-gray-800 flex-1 text-right">{service.title}</span>
              <div className="bg-white/40 p-1 rounded-full">
                 <ArrowLeft size={16} className="text-gray-600" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        // UPLOAD ACTION AREA WITH GUIDE
        <div className="animate-in slide-in-from-bottom-8 duration-500 flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => onSelectService(null)}
              className="text-gray-500 hover:text-gray-800 flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={16} />
              بازگشت
            </button>
            <span className="text-base font-bold text-gray-900">
              {activeServiceConfig?.title}
            </span>
          </div>

          {/* Visual Guide Container */}
          <div className="flex-1 w-full bg-gray-100 rounded-3xl mb-6 relative overflow-hidden border border-gray-200 flex items-center justify-center min-h-[250px]">
             {/* Abstract Face Guide Visualization */}
             <div className="relative text-gray-300">
                <ScanFace size={160} strokeWidth={1} />
                
                {/* Focus Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-xl -translate-x-4 -translate-y-4"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500 rounded-tr-xl translate-x-4 -translate-y-4"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500 rounded-bl-xl -translate-x-4 translate-y-4"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-xl translate-x-4 translate-y-4"></div>
             </div>

             <div className="absolute bottom-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-white">
                راهنمای عکاسی
             </div>
          </div>

          {/* Instruction Text */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center mb-4">
            <p className="text-sm text-blue-900 leading-relaxed font-bold">
              {activeServiceConfig?.instruction}
            </p>
          </div>
          
          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full bg-gray-900 hover:bg-black text-white rounded-2xl p-4 flex items-center justify-center gap-3 shadow-xl shadow-gray-200 active:scale-[0.98] transition-all duration-200 group h-16 mt-auto mb-4"
          >
            <Camera size={24} />
            <span className="text-base font-bold">انتخاب تصویر یا گرفتن عکس</span>
          </button>
        </div>
      )}
    </div>
  );
};