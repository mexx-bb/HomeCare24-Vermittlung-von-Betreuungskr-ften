import { FormData } from '../types';
import { FormInput, FormRadio, FormCheckboxGroup } from './FormInputs';

interface Props {
  data: FormData;
  update: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step5({ data, update, onNext, onPrev }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-[#55618b] mb-[20px] text-[20px] border-l-[4px] border-[#55618b] pl-[15px] font-bold">5. Anforderungen an die Pflegekraft</h2>
      
      <FormCheckboxGroup label="Geschlecht (Mehrfachauswahl möglich)" options={["Weiblich", "Männlich", "Nicht wichtig"]} selected={data.req_gender} onChange={(v: any) => update({ req_gender: v })} />
      <FormCheckboxGroup label="Deutschkenntnisse" options={["Grundlegend", "Mittel", "Gut", "Fließend"]} selected={data.req_german} onChange={(v: any) => update({ req_german: v })} />
      <FormCheckboxGroup label="Alter" options={["18–30", "31–40", "41–50", "50+", "Nicht wichtig"]} selected={data.req_age} onChange={(v: any) => update({ req_age: v })} />
      
      <div className="border-t pt-4">
        <FormRadio label="Führerschein erforderlich?" options={["Ja", "Nein"]} value={data.req_driversLicense} onChange={(v: any) => update({ req_driversLicense: v })} />
      </div>

      <div className="border-t pt-4">
        <FormCheckboxGroup label="Erfahrung" options={["Benötigt", "Erwünscht", "Nicht wichtig"]} selected={data.req_experience} onChange={(v: any) => update({ req_experience: v })} />
      </div>

      <div className="border-t pt-4">
        <FormRadio label="Rauchen" options={["Ja", "Nein", "Nicht wichtig", "Nur draußen"]} value={data.req_smoking} onChange={(v: any) => update({ req_smoking: v })} />
      </div>

      <div className="border-t pt-4">
         <div className="mb-4">
          <label className="text-[13px] font-semibold text-[#4a5568] mb-1">Weitere Anforderungen/Bemerkungen</label>
          <textarea
            value={data.req_otherRequirements}
            onChange={(e) => update({ req_otherRequirements: e.target.value })}
            className="p-[10px] border border-[#e2e8f0] rounded-[6px] text-[14px] focus:outline-none focus:border-[#55618b] w-full"
            rows={4}
          />
        </div>
      </div>

      <div className="border-t pt-4 max-w-sm">
        <FormInput label="Durchschnittliches Wochenbudget für Einkäufe (€)" value={data.req_weeklyBudget} onChange={(v: string) => update({ req_weeklyBudget: v })} type="number" />
      </div>

      <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-[20px_40px] flex justify-between -mx-[40px] -mb-[30px] mt-8">
        <button onClick={onPrev} className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#e2e8f0] text-[#4a5568] transition-opacity">Zurück</button>
        <button onClick={onNext} className="px-[28px] py-[12px] rounded-[6px] font-bold text-[14px] bg-[#55618b] text-white transition-opacity">
          Weiter
        </button>
      </div>
    </div>
  );
}
