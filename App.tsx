
import { useState } from 'react';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { UploadSection } from './components/UploadSection';
import { ResultSection } from './components/ResultSection';
import { generateBeautyMakeover } from './services/geminiService';
import { generateDiscountCode } from './utils/discount';
import { DiscountData, ProcessState, ServiceType } from './types';
import { Loader2, Bell, BellRing } from 'lucide-react';

function App() {
  const [processState, setProcessState] = useState<ProcessState>(ProcessState.IDLE);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [discount, setDiscount] = useState<DiscountData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Safe initialization of notification permission
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>(() => {
    if (typeof Notification !== 'undefined') {
      return Notification.permission;
    }
    return 'default';
  });

  const requestNotification = () => {
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then(permission => {
        setNotifPermission(permission);
      });
    }
  };

  const sendSuccessNotification = () => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        const options: any = {
          body: 'تغییر چهره شما آماده است! 😍 برای مشاهده نتیجه کلیک کنید.',
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
    if (!selectedService) return;

    setErrorMessage(null);
    setProcessState(ProcessState.UPLOADING);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setOriginalImage(base64);
      setProcessState(ProcessState.PROCESSING);

      try {
        const generatedImage = await generateBeautyMakeover(base64, selectedService);
        setResultImage(generatedImage);
        const discountData = generateDiscountCode();
        setDiscount(discountData);
        setProcessState(ProcessState.SUCCESS);
        
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
    // Note: We intentionally keep selectedService so user can try again easily, 
    // or they can press "Back" in UploadSection to change service.
  };

  const getServiceNameFA = (type: ServiceType | null) => {
    switch(type) {
      case 'DENTAL': return 'لمینت';
      case 'FILLER': return 'ژل گونه';
      case 'LIFT': return 'لیفت ابرو';
      case 'BOTOX': return 'بوتاکس';
      default: return 'زیبایی';
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-gray-50 text-gray-800 font-sans flex flex-col overflow-hidden max-w-md mx-auto shadow-2xl relative">
      <Header />

      <main className="flex-1 flex flex-col relative overflow-hidden w-full">
        {processState === ProcessState.IDLE && (
          <div className="flex flex-col h-full w-full">
            {/* Top Section: Intro - Hidden when service is selected */}
            {!selectedService && (
              <div className="flex-1 flex flex-col justify-center items-center px-4 overflow-hidden w-full animate-in fade-in slide-in-from-top-4 duration-500">
                 <IntroSection />
              </div>
            )}
            
            {/* Bottom Section: Action - Expands when service selected */}
            <div className={`w-full px-4 pb-4 pt-2 bg-gray-50 z-10 flex flex-col transition-all duration-500 ease-in-out ${selectedService ? 'flex-1 h-full' : 'flex-shrink-0 min-h-[200px]'}`}>
              <UploadSection 
                onImageSelect={handleImageSelect} 
                processState={processState} 
                selectedService={selectedService}
                onSelectService={setSelectedService}
              />
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
                <h3 className="text-xl font-bold text-gray-800 mb-2">در حال زیباسازی...</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[250px] mx-auto">
                  هوش مصنوعی در حال اعمال تغییرات {getServiceNameFA(selectedService)} روی چهره شماست.
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
