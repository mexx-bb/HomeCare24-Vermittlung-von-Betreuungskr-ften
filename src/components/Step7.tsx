import { FormData } from '../types';
import { CheckCircle, Download } from 'lucide-react';

interface Props {
  data: FormData;
  update: (data: Partial<FormData>) => void;
  onPrev: () => void;
  onDownload: () => void;
}

export default function Step7({ data, update, onPrev, onDownload }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#eef1f6] text-[#55618b] mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-3xl font-bold text-[#55618b]">Fast fertig!</h2>
        <p className="text-[#4a5568] mt-2">Klicken Sie unten auf die Schaltfläche, um das vorausgefüllte Formular als PDF herunterzuladen.</p>
      </div>

      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-6 mt-8 text-left">
        <h3 className="font-bold text-[#55618b] mb-4 text-lg">Rechtlicher Hinweis & Bestätigung</h3>
        <p className="text-sm text-[#4a5568] mb-4">
          Mit dem Bestätigen dieser Checkbox und der Eingabe Ihres Namens bestätigen Sie die Richtigkeit Ihrer Angaben und akzeptieren unsere 
          <a href="https://wiehler-homecare24.de/datenschutzerklaerung/" target="_blank" rel="noreferrer" className="text-[#55618b] underline ml-1 hover:text-[#3c4564]">Datenschutzbestimmungen</a> und 
          <a href="https://wiehler-homecare24.de/agb/" target="_blank" rel="noreferrer" className="text-[#55618b] underline ml-1 hover:text-[#3c4564]">AGB</a>.
        </p>
        
        <label className="flex items-start gap-3 cursor-pointer mb-4">
          <input 
            type="checkbox" 
            checked={data.agbAccepted}
            onChange={(e) => update({ agbAccepted: e.target.checked, signatureDate: e.target.checked ? new Date().toISOString() : "" })}
            className="mt-1 w-4 h-4 text-[#55618b] border-gray-300 rounded focus:ring-[#55618b]"
          />
          <span className="text-sm text-[#2d3748] font-medium leading-tight">
            Ja, ich stimme den Allgemeinen Geschäftsbedingungen (AGB) und der Datenschutzerklärung zu. Die hier eingegebenen Daten sind korrekt.
          </span>
        </label>

        <div>
          <label className="block text-sm font-bold text-[#4a5568] mb-1">Ihr Vor- und Nachname (Digitale Unterschrift) *</label>
          <input 
            type="text" 
            value={data.signatureName}
            onChange={(e) => update({ signatureName: e.target.value })}
            placeholder="Max Mustermann"
            className="w-full md:w-1/2 p-[10px] border border-[#cbd5e0] rounded-[6px] focus:outline-none focus:border-[#55618b] focus:ring-1 focus:ring-[#55618b] transition-all bg-white"
          />
        </div>
      </div>

      <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-[20px_40px] flex justify-between -mx-[40px] -mb-[30px] mt-8">
        <button onClick={onPrev} className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#e2e8f0] text-[#4a5568] transition-opacity hover:bg-[#cbd5e0]">
          Zurück
        </button>
        <button 
          onClick={onDownload}
          disabled={!data.agbAccepted || data.signatureName.trim().length < 3}
          className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#55618b] text-white hover:bg-[#3c4564] disabled:bg-[#cbd5e0] disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          title={!data.agbAccepted || data.signatureName.trim().length < 3 ? "Bitte akzeptieren Sie die AGB und geben Sie Ihren Namen ein" : "PDF herunterladen"}
        >
          <Download size={20} />
          PDF herunterladen
        </button>
      </div>
    </div>
  );
}
