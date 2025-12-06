
import React from 'react';
import { Smile } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors duration-300 border-b border-transparent dark:border-slate-800">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary-500 p-1.5 rounded-lg text-white shadow-sm">
            <Smile size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">SMIDENT</h1>
        </div>
        <span className="text-xs font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-full border border-primary-100 dark:border-primary-800/50">
         مرکز زیبایی اسمیدنت
        </span>
      </div>
    </header>
  );
};