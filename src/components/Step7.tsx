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

      <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-[20px_40px] flex justify-between -mx-[40px] -mb-[30px] mt-8">
        <button onClick={onPrev} className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#e2e8f0] text-[#4a5568] transition-opacity">
          Zurück
        </button>
        <button 
          onClick={onDownload} 
          className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#55618b] text-white hover:bg-[#3c4564] transition-colors flex items-center justify-center gap-2"
        >
          <Download size={20} />
          PDF herunterladen
        </button>
      </div>
    </div>
  );
}
