import React from 'react';
import { Smile } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary-500 p-1.5 rounded-lg text-white">
            <Smile size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-800">SMIDENT</h1>
        </div>
        <span className="text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">
         مرکز زیبایی اسمیدنت
        </span>
      </div>
    </header>
  );
};