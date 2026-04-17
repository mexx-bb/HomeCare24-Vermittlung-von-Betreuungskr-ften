import { FormData } from '../types';
import PersonForm from './PersonForm';
import { FormRadio } from './FormInputs';

interface Props {
  data: FormData;
  update: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step3({ data, update, onNext, onPrev }: Props) {
  const isComplete = data.hasSecondPerson === 'Nein' || (data.p2_firstName && data.p2_lastName);

  // Note: if hasSecondPerson is "Nein", step 3 is skipped by the main App component's flow,
  // but just in case, we also allow toggling it here if they navigated directly.

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-[#55618b] mb-[20px] text-[20px] border-l-[4px] border-[#55618b] pl-[15px] font-bold">3. Zweite Person (optional)</h2>
      
      <div className="mb-[24px] p-[20px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[6px]">
        <FormRadio 
          label="Gibt es eine zweite Person im Haushalt, die Betreuung benötigt?"
          options={["Ja", "Nein"]}
          value={data.hasSecondPerson}
          onChange={(v: any) => update({ hasSecondPerson: v })}
        />
      </div>

      {data.hasSecondPerson === 'Ja' && (
        <PersonForm prefix="p2_" data={data} update={update} />
      )}

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
