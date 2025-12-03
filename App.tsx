import { useState } from 'react';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { UploadSection } from './components/UploadSection';
import { ResultSection } from './components/ResultSection';
import { generateSmileMakeover } from './services/geminiService';
import { generateDiscountCode } from './utils/discount';
import { DiscountData, ProcessState } from './types';
import { Loader2, Bell, BellRing } from 'lucide-react';

function App() {
  const [processState, setProcessState] = useState<ProcessState>(ProcessState.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [discount, setDiscount] = useState<DiscountData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>(Notification.permission);

  const requestNotification = () => {
    Notification.requestPermission().then(permission => {
      setNotifPermission(permission);
    });
  };

  const sendSuccessNotification = () => {
    if (Notification.permission === 'granted') {
      try {
        // Cast options to any to allow 'vibrate' if supported by browser, bypassing TS check
        const options: any = {
          body: 'طراحی لبخند شما آماده است! 😍 برای مشاهده نتیجه کلیک کنید.',
          icon: 'https://cdn-icons-png.flaticon.com/512/2913/2913504.png',
          vibrate: [200, 100, 200]
        };
        new Notification('SMIDENT', options);
      } catch (e) {
        console.error("Notification failed:", e);
      }
    }
  };

  const handleImageSelect = async (file: File) => {
    setErrorMessage(null);
    setProcessState(ProcessState.UPLOADING);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setOriginalImage(base64);
      setProcessState(ProcessState.PROCESSING);

      try {
        const generatedImage = await generateSmileMakeover(base64);
        setResultImage(generatedImage);
        const discountData = generateDiscountCode();
        setDiscount(discountData);
        setProcessState(ProcessState.SUCCESS);
        
        // Send notification if permitted
        sendSuccessNotification();

      } catch (error: any) {
        console.error(error);
        setErrorMessage(error.message || "خطا در ارتباط با هوش مصنوعی.");
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
    <div className="h-[100dvh] w-full bg-gray-50 text-gray-800 font-sans flex flex-col overflow-hidden max-w-md mx-auto shadow-2xl relative">
      <Header />

      <main className="flex-1 flex flex-col relative overflow-hidden w-full">
        {processState === ProcessState.IDLE && (
          <div className="flex flex-col h-full w-full">
            {/* Top Section: Intro - Flexible Space */}
            <div className="flex-1 flex flex-col justify-center items-center px-4 overflow-hidden w-full">
               <IntroSection />
            </div>
            
            {/* Bottom Section: Action - Fixed Height */}
            <div className="flex-shrink-0 w-full px-4 pb-6 pt-2 bg-gray-50 z-10">
              <UploadSection 
                onImageSelect={handleImageSelect} 
                processState={processState} 
              />
              <p className="text-center text-gray-400 text-[10px] mt-3 opacity-60">
                نسخه ۱.۰.۰ 
              </p>
            </div>
          </div>
        )}

        {(processState === ProcessState.UPLOADING || processState === ProcessState.PROCESSING) && (
           <div className="flex-1 flex flex-col justify-center items-center p-8 text-center space-y-6 animate-fade-in relative w-full h-full">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                <Loader2 size={64} className="text-primary-600 animate-spin relative z-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">در حال طراحی لبخند...</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[250px] mx-auto">
                  هوش مصنوعی در حال آنالیز فرم صورت و دندان‌های شماست.
                </p>
              </div>

              {/* Notification Button */}
              {notifPermission !== 'granted' ? (
                <button 
                  onClick={requestNotification}
                  className="mt-8 flex items-center gap-2 bg-white border border-primary-200 text-primary-700 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all"
                >
                  <Bell size={16} />
                  <span>وقتی آماده شد خبرم کن</span>
                </button>
              ) : (
                <div className="mt-8 flex items-center gap-2 text-primary-600 bg-primary-50 px-4 py-2 rounded-xl text-xs font-bold">
                   <BellRing size={16} />
                   <span>به شما اطلاع خواهیم داد</span>
                </div>
              )}
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
          <div className="flex-1 flex flex-col justify-center items-center p-8 text-center gap-6 w-full h-full">
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 w-full">
              <p className="font-bold text-lg mb-2">خطا</p>
              <p className="text-sm opacity-90">{errorMessage}</p>
            </div>
            <button 
              onClick={handleReset}
              className="bg-gray-800 text-white h-14 rounded-xl font-bold w-full active:scale-95 transition-transform"
            >
              تلاش مجدد
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;