import { FormData } from '../types';
import { FormInput, FormRadio, FormCheckbox } from './FormInputs';

interface Props {
  data: FormData;
  update: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step4({ data, update, onNext, onPrev }: Props) {
  const isComplete = data.accommodationType && data.caregiverBedroom;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-[#55618b] mb-[20px] text-[20px] border-l-[4px] border-[#55618b] pl-[15px] font-bold">4. Unterkunft</h2>
      
      <FormRadio label="Unterkunftsart" options={["Haus", "Wohnung", "Stadt", "Land"]} value={data.accommodationType} onChange={(v: any) => update({ accommodationType: v })} required />
      
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
         <FormCheckbox label="Einkaufsmöglichkeiten zu Fuß erreichbar" checked={data.shoppingWalkable} onChange={(v: boolean) => update({ shoppingWalkable: v })} />
         <FormCheckbox label="Ein Fernseher ist vorhanden" checked={data.tvAvailable} onChange={(v: boolean) => update({ tvAvailable: v })} />
      </div>

      <div className="mt-4 border-t pt-4">
        <FormRadio label="Internet/WLAN" options={["Ja", "Nein"]} value={data.internetWifi} onChange={(v: any) => update({ internetWifi: v })} />
        <FormRadio label="Schlafzimmer für Pflegekraft" options={["Eigenes Zimmer", "Zimmer mit Bad", "Sonstiges"]} value={data.caregiverBedroom} onChange={(v: any) => update({ caregiverBedroom: v })} required />
      </div>

      <div className="mt-4 border-t pt-4">
        <FormRadio label="Haustiere im Haushalt?" options={["Ja", "Nein"]} value={data.pets} onChange={(v: any) => update({ pets: v })} />
        <FormRadio label="Weitere Personen im Haushalt?" options={["Ja", "Nein"]} value={data.otherPersonsInHousehold} onChange={(v: any) => update({ otherPersonsInHousehold: v })} />
        
        {data.otherPersonsInHousehold === 'Ja' && (
          <div className="mt-4 space-y-4">
            <FormInput label="Wenn ja, bitte beschreiben (z.B. Familie, Besucher)" value={data.otherPersonsDetails} onChange={(v: string) => update({ otherPersonsDetails: v })} />
            <FormInput label="Ihre Beziehung zur pflegebedürftigen Person" value={data.relationshipToPatient} onChange={(v: string) => update({ relationshipToPatient: v })} />
          </div>
        )}
      </div>

      <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-[20px_40px] flex justify-between -mx-[40px] -mb-[30px] mt-8">
        <button onClick={onPrev} className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#e2e8f0] text-[#4a5568] transition-opacity">Zurück</button>
        <button onClick={onNext} disabled={!isComplete} className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#55618b] text-white disabled:opacity-50 transition-opacity">
          Weiter
        </button>
      </div>
    </div>
  );
}
