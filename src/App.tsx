import { useState } from 'react';
import { initialFormData, FormData } from './types';
import { generatePDF } from './pdfGenerator';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Step7 from './components/Step7';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const totalSteps = 7;

  const updateForm = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      if (currentStep === 2 && formData.hasSecondPerson === 'Nein') {
        setCurrentStep(4); // Skip step 3 if no second person
      } else {
        setCurrentStep(currentStep + 1);
      }
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      if (currentStep === 4 && formData.hasSecondPerson === 'Nein') {
        setCurrentStep(2);
      } else {
        setCurrentStep(currentStep - 1);
      }
      window.scrollTo(0, 0);
    }
  };

  const handleDownloadPDF = () => {
    generatePDF(formData);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col font-sans text-[#2d3748]">
      {/* Header */}
      <header className="h-[80px] bg-white border-b-2 border-[#55618b] flex items-center justify-between px-[40px] shrink-0">
        <div className="flex-shrink-0">
          <img 
            src="https://wiehler-homecare24.de/wp-content/uploads/yootheme/cache/cc/LOGO-HOMECARE-ccdfb350.png" 
            alt="HomeCare24 Logo" 
            className="h-[50px] w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="text-right text-[#55618b] font-bold text-[14px] leading-[1.2]">
          HomeCare24 – Vermittlung von Betreuungskräften<br/>Vanessa Wiehler
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start p-[30px]">
        <div className="w-[850px] max-w-full bg-white rounded-[12px] shadow-[0_10px_25px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          
          <div className="bg-[#eef1f6] px-[30px] py-[15px] border-b border-[#e2e8f0]">
            <div className="h-[8px] bg-[#cbd5e0] rounded-[4px] relative mb-[8px]">
              <div 
                className="bg-[#55618b] h-full rounded-[4px] transition-all duration-300 ease-in-out" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="text-[12px] font-bold text-[#55618b] uppercase tracking-[1px]">
              Schritt {currentStep} von {totalSteps}: 
              {currentStep === 1 && " Standort & Allgemeines"}
              {currentStep === 2 && " Erste Person"}
              {currentStep === 3 && " Zweite Person"}
              {currentStep === 4 && " Unterkunft"}
              {currentStep === 5 && " Anforderungen"}
              {currentStep === 6 && " Ihre Daten"}
              {currentStep === 7 && " Zusammenfassung"}
            </div>
          </div>

          <div className="p-[30px_40px] flex-grow overflow-y-auto">
             {currentStep === 1 && <Step1 data={formData} update={updateForm} onNext={nextStep} />}
             {currentStep === 2 && <Step2 data={formData} update={updateForm} onNext={nextStep} onPrev={prevStep} />}
             {currentStep === 3 && <Step3 data={formData} update={updateForm} onNext={nextStep} onPrev={prevStep} />}
             {currentStep === 4 && <Step4 data={formData} update={updateForm} onNext={nextStep} onPrev={prevStep} />}
             {currentStep === 5 && <Step5 data={formData} update={updateForm} onNext={nextStep} onPrev={prevStep} />}
             {currentStep === 6 && <Step6 data={formData} update={updateForm} onNext={nextStep} onPrev={prevStep} />}
             {currentStep === 7 && <Step7 data={formData} update={updateForm} onPrev={prevStep} onDownload={handleDownloadPDF} />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[60px] bg-white border-t border-[#e2e8f0] flex items-center justify-center text-[12px] text-[#718096] shrink-0">
        <div className="flex gap-[20px]">
          <a href="https://www.wiehler-homecare24.de" target="_blank" rel="noopener noreferrer" className="hover:text-[#2d3748] transition-colors">www.wiehler-homecare24.de</a>
          <span>|</span>
          <span>Handy: 0151 44584307</span>
          <span>|</span>
          <a href="mailto:info@wiehler-homecare24.de" className="hover:text-[#2d3748] transition-colors">E-Mail: info@wiehler-homecare24.de</a>
        </div>
      </footer>
    </div>
  );
}
