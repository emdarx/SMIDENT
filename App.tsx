import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { UploadSection } from './components/UploadSection';
import { ResultSection } from './components/ResultSection';
import { generateSmileMakeover } from './services/geminiService';
import { generateDiscountCode } from './utils/discount';
import { DiscountData, ProcessState } from './types';

function App() {
  const [processState, setProcessState] = useState<ProcessState>(ProcessState.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [discount, setDiscount] = useState<DiscountData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    // 1. Reset
    setErrorMessage(null);
    setProcessState(ProcessState.UPLOADING);

    // 2. Read File
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setOriginalImage(base64);
      setProcessState(ProcessState.PROCESSING);

      try {
        // 3. Call API
        const generatedImage = await generateSmileMakeover(base64);
        setResultImage(generatedImage);
        
        // 4. Generate Discount
        const discountData = generateDiscountCode();
        setDiscount(discountData);
        
        setProcessState(ProcessState.SUCCESS);
      } catch (error) {
        console.error(error);
        setErrorMessage("متاسفانه در پردازش تصویر مشکلی پیش آمد. لطفا دوباره تلاش کنید یا از عکس دیگری استفاده کنید.");
        setProcessState(ProcessState.ERROR);
      }
    };
    reader.onerror = () => {
      setErrorMessage("خطا در خواندن فایل.");
      setProcessState(ProcessState.ERROR);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setResultImage(null);
    setDiscount(null);
    setProcessState(ProcessState.IDLE);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        <Header />

        <main className="pt-4">
          {processState === ProcessState.IDLE && (
            <>
              <IntroSection />
              <div className="mt-4">
                <UploadSection 
                  onImageSelect={handleImageSelect} 
                  processState={processState} 
                />
              </div>
            </>
          )}

          {(processState === ProcessState.UPLOADING || processState === ProcessState.PROCESSING) && (
             <div className="flex flex-col h-[60vh] justify-center items-center px-6 text-center">
                <UploadSection 
                  onImageSelect={() => {}} 
                  processState={processState} 
                />
                <p className="text-sm text-gray-500 mt-8 max-w-xs mx-auto animate-pulse">
                   هوش مصنوعی در حال تحلیل فرم دندان‌ها و طراحی لبخند جدید شماست...
                </p>
             </div>
          )}

          {processState === ProcessState.SUCCESS && originalImage && resultImage && (
            <ResultSection 
              originalImage={originalImage}
              resultImage={resultImage}
              discount={discount}
              onReset={handleReset}
            />
          )}

          {processState === ProcessState.ERROR && (
            <div className="p-8 text-center space-y-4">
              <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
                <p className="font-bold">خطا</p>
                <p className="text-sm mt-1">{errorMessage}</p>
              </div>
              <button 
                onClick={handleReset}
                className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold w-full"
              >
                تلاش مجدد
              </button>
            </div>
          )}
        </main>
        
        {/* Simple Footer for IDLE state */}
        {processState === ProcessState.IDLE && (
           <footer className="p-6 text-center text-gray-400 text-xs pb-10">
              <p className="mt-1">نسخه ۱.۰.۰</p>
           </footer>
        )}
      </div>
    </div>
  );
}

export default App;