import { FormData } from '../types';
import { FormInput } from './FormInputs';

interface Props {
  data: FormData;
  update: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step6({ data, update, onNext, onPrev }: Props) {
  const isComplete = data.contact_firstName && data.contact_lastName && data.contact_email && data.contact_phone;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-[#55618b] mb-[20px] text-[20px] border-l-[4px] border-[#55618b] pl-[15px] font-bold">6. Ihre Kontaktdaten</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Titel" value={data.contact_title} onChange={(v: string) => update({ contact_title: v })} />
        <FormInput label="Beziehung zum Kunden" value={data.contact_relationship} onChange={(v: string) => update({ contact_relationship: v })} />
        <FormInput label="Vorname" value={data.contact_firstName} onChange={(v: string) => update({ contact_firstName: v })} required />
        <FormInput label="Nachname" value={data.contact_lastName} onChange={(v: string) => update({ contact_lastName: v })} required />
      </div>

      <div className="border-t pt-4 mt-2">
        <h3 className="font-semibold text-[#2d3748] mb-4">Adresse</h3>
        <FormInput label="Adresse (Str. Hausnummer)" value={data.contact_address} onChange={(v: string) => update({ contact_address: v })} />
        <FormInput label="Alternative Anschrift" value={data.contact_street} onChange={(v: string) => update({ contact_street: v })} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Ort" value={data.contact_city} onChange={(v: string) => update({ contact_city: v })} />
          <FormInput label="PLZ, Land" value={data.contact_zipCountry} onChange={(v: string) => update({ contact_zipCountry: v })} />
        </div>
      </div>

      <div className="border-t pt-4 mt-2">
        <h3 className="font-semibold text-[#2d3748] mb-4">Erreichbarkeit</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="E-Mail" value={data.contact_email} onChange={(v: string) => update({ contact_email: v })} type="email" required />
          <FormInput label="Telefonnummer" value={data.contact_phone} onChange={(v: string) => update({ contact_phone: v })} type="tel" required />
        </div>
        <FormInput label="Wie haben Sie uns gefunden?" value={data.contact_howFound} onChange={(v: string) => update({ contact_howFound: v })} />
      </div>

      <div className="border border-[#e2e8f0] border-t pt-4 mt-2 bg-[#f8fafc] p-[20px] rounded-[6px]">
        <h3 className="font-semibold text-[#2d3748] mb-4">Weitere Kontaktperson (optional)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Vorname" value={data.contact_otherPersonFirstName} onChange={(v: string) => update({ contact_otherPersonFirstName: v })} />
          <FormInput label="Nachname" value={data.contact_otherPersonLastName} onChange={(v: string) => update({ contact_otherPersonLastName: v })} />
          <div className="sm:col-span-2">
             <FormInput label="Telefonnummer" value={data.contact_otherPersonPhone} onChange={(v: string) => update({ contact_otherPersonPhone: v })} type="tel" />
          </div>
        </div>
      </div>

      <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-[20px_40px] flex justify-between -mx-[40px] -mb-[30px] mt-8">
        <button onClick={onPrev} className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#e2e8f0] text-[#4a5568] transition-opacity">Zurück</button>
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
