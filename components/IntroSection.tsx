
import React from 'react';

export const IntroSection: React.FC = () => {
  return (
    <div className="space-y-5 w-full text-center mt-6 mb-4 px-2">
      {/* Hero Text */}
      <div className="space-y-4">
        
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          <span className="text-primary-600 dark:text-primary-400">چهره جدیدت</span> رو ببین!
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-[95%] sm:max-w-md mx-auto leading-7 font-medium [text-wrap:balance]">
          در اسمیدنت، پیش از مراجعه حضوری به مرکز زیبایی ابتدا پیش نمایشی از آن چه خواهید شد را ببینید
        </p>
      </div>
      
      {/* Decorative Image/Element (Optional - abstract) */}
      <div className="w-full flex justify-center opacity-40">
        <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};