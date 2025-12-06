import React from 'react';

export const IntroSection: React.FC = () => {
  return (
    <div className="space-y-5 w-full text-center mt-6 mb-4 px-2">
      {/* Hero Text */}
      <div className="space-y-4">
        
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">چهره جدیدت</span> رو ببین!
        </h2>
        
        <p className="text-base md:text-lg text-gray-600 max-w-[320px] mx-auto leading-relaxed font-medium">
          در اپ اسمیدنت، پیش از مراجعه حضوری به مرکز زیبایی ابتدا پیش نمایشی از آن چه خواهید شد را ببینید
        </p>
      </div>
      
      {/* Decorative Image/Element (Optional - abstract) */}
      <div className="w-full flex justify-center opacity-40">
        <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};