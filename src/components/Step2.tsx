import { FormData } from '../types';
import PersonForm from './PersonForm';

interface Props {
  data: FormData;
  update: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2({ data, update, onNext, onPrev }: Props) {
  const isComplete = data.p1_firstName && data.p1_lastName; // Basic validation for demo

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-[#55618b] mb-[20px] text-[20px] border-l-[4px] border-[#55618b] pl-[15px] font-bold">2. Erste zu betreuende Person</h2>
      
      <PersonForm prefix="p1_" data={data} update={update} />

      <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-[20px_40px] flex justify-between -mx-[40px] -mb-[30px] mt-8">
        <button onClick={onPrev} className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#e2e8f0] text-[#4a5568] transition-opacity">
          Zurück
        </button>
        <button 
          onClick={onNext}
          disabled={!isComplete}
          className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#55618b] text-white disabled:opacity-50 transition-opacity"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
