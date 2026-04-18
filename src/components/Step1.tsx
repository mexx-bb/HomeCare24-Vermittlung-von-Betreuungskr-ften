import { FormData } from '../types';
import { FormInput, FormRadio } from './FormInputs';

interface Props {
  data: FormData;
  update: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export default function Step1({ data, update, onNext }: Props) {
  const isComplete = data.address && data.cityRegion && data.zipCountry && data.startDateOption && data.numberOfPersons;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-[#55618b] mb-[20px] text-[20px] border-l-[4px] border-[#55618b] pl-[15px] font-bold">1. Standort & Allgemeines</h2>
      
      <FormInput label="Adresse (Str. Hausnummer)" value={data.address} onChange={(val: string) => update({ address: val })} required />
      <FormInput label="Alternative Anschrift (optional)" value={data.street} onChange={(val: string) => update({ street: val })} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Ort, Bundesstaat/Provinz/Region" value={data.cityRegion} onChange={(val: string) => update({ cityRegion: val })} required />
        <FormInput label="PLZ, Land" value={data.zipCountry} onChange={(val: string) => update({ zipCountry: val })} required />
      </div>

      <div className="mt-6 border-t pt-4">
        <FormRadio 
          label="Beginn der Dienstleistung" 
          options={["Sobald wie möglich", "Anderes"]} 
          value={data.startDateOption} 
          onChange={(val: any) => update({ startDateOption: val })} 
          required 
        />
        {data.startDateOption === "Anderes" && (
          <div className="ml-4 pl-4 border-l-2 border-gray-200">
            <FormInput label="Gewünschtes Datum" value={data.startDateCustom} onChange={(val: string) => update({ startDateCustom: val })} type="date" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <FormRadio 
          label="Anzahl der zu betreuenden Personen" 
          options={["Einzelperson", "Paar"]} 
          value={data.numberOfPersons} 
          onChange={(val: any) => update({ 
            numberOfPersons: val,
            hasSecondPerson: val === 'Paar' ? 'Ja' : 'Nein'
          })} 
          required 
        />
      </div>

      <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-[20px_40px] flex justify-end -mx-[40px] -mb-[30px] mt-8">
        <button 
          onClick={onNext}
          disabled={!isComplete}
          className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#55618b] text-white disabled:opacity-50 transition-opacity disabled:cursor-not-allowed"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
