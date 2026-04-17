import { FormData } from '../types';
import { FormInput, FormRadio, FormCheckboxGroup, FormCheckbox } from './FormInputs';

interface Props {
  prefix: 'p1_' | 'p2_';
  data: FormData;
  update: (data: Partial<FormData>) => void;
}

const diagnosesOptions = ["Alzheimer", "Arthrose", "Demenz", "Dialyse-Patient", "Geistige Behinderung", "Herz-Kreislauf", "Inkontinenz", "Doppelte Inkontinenz", "Krebs", "Schlaganfall", "Multiple Sklerose", "Osteoporose", "Parkinson", "Rheuma"];
const dailyCareOptions = ["Zähne & Haarpflege", "Toilettengang & Körperpflege", "Nahrungsaufnahme", "Medikamente", "Haushalt & soziale Pflichten", "Einkaufen", "Kochen", "Haustierplege"];
const equipmentOptions = ["Transfer-/Hebebilfen", "Treppenlist", "Badewannenlift", "Gehilfen/Walker", "Rollstühle", "Rehabilitationsbett", "Lift/Aufzug", "Duschstühle", "Krücken", "Transferbretter", "Gegensprechanlage", "Kamera", "Anti-Dekubitus-Matratzen", "Stützen"];
const mobilityOptions = ["Vollständig mobil", "leichte Gehbehinderung", "Rollstuhl", "Bettlägerig"];

export default function PersonForm({ prefix, data, update }: Props) {
  const get = (key: string) => (data as any)[`${prefix}${key}`];
  const set = (key: string, val: any) => update({ [`${prefix}${key}`]: val });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Vorname" value={get('firstName')} onChange={(v: string) => set('firstName', v)} required />
        <FormInput label="Nachname" value={get('lastName')} onChange={(v: string) => set('lastName', v)} required />
        
        <div className="sm:col-span-2">
          <FormRadio label="Geschlecht" options={["Weiblich", "Männlich"]} value={get('gender')} onChange={(v: any) => set('gender', v)} />
        </div>
        
        <FormInput label="Gewicht (kg)" value={get('weight')} onChange={(v: string) => set('weight', v)} type="number" />
        <FormInput label="Körpergröße (cm)" value={get('height')} onChange={(v: string) => set('height', v)} type="number" />
        <FormInput label="Alter" value={get('age')} onChange={(v: string) => set('age', v)} type="number" />
        <FormInput label="Geburtsdatum" value={get('birthDate')} onChange={(v: string) => set('birthDate', v)} type="date" />
      </div>

      <div className="border-t pt-4">
        <FormRadio label="Stundenweise Betreuung aktuell?" options={["Ja", "Nein"]} value={get('hourlyCare')} onChange={(v: any) => set('hourlyCare', v)} />
        <FormRadio label="Pflegegrad" options={["1", "2", "3", "4", "5"]} value={get('careLevel')} onChange={(v: any) => set('careLevel', v)} />
        <FormCheckboxGroup label="Mobilitätsgrad" options={mobilityOptions} selected={get('mobility')} onChange={(v: any) => set('mobility', v)} />
      </div>

      <div className="border-t pt-4">
        <FormCheckboxGroup label="Diagnosen" options={diagnosesOptions} selected={get('diagnoses')} onChange={(v: any) => set('diagnoses', v)} />
        <FormInput label="Andere Diagnosen" value={get('otherDiagnoses')} onChange={(v: string) => set('otherDiagnoses', v)} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <FormRadio label="Urinkontrolle" options={["Inkontinenz", "gelegentlich", "ständig"]} value={get('urineControl')} onChange={(v: any) => set('urineControl', v)} />
          <FormRadio label="Stuhlkontrolle" options={["Inkontinenz", "gelegentlich", "ständig"]} value={get('stoolControl')} onChange={(v: any) => set('stoolControl', v)} />
        </div>
      </div>

      <div className="border-t pt-4">
        <FormRadio label="An- und Auskleiden" options={["Unfähig", "Braucht Hilfe (50%)", "Selbstständig"]} value={get('dressing')} onChange={(v: any) => set('dressing', v)} />
        <FormCheckboxGroup label="Tägliche Pflege" options={dailyCareOptions} selected={get('dailyCare')} onChange={(v: any) => set('dailyCare', v)} />
        
        <FormRadio label="Nachtdienste" options={["Nein", "max. 1x Nacht", "mehrmals Nacht"]} value={get('nightShifts')} onChange={(v: any) => set('nightShifts', v)} />
        {get('nightShifts') !== 'Nein' && get('nightShifts') !== '' && (
          <FormInput label="Grund für Nachtdienste" value={get('nightShiftsReason')} onChange={(v: string) => set('nightShiftsReason', v)} />
        )}
      </div>

      <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormRadio label="Körperpflege" options={["Abhängig", "Selbstständig"]} value={get('bodyCare')} onChange={(v: any) => set('bodyCare', v)} />
        <FormRadio label="Toilettenbenutzung" options={["Abhängig", "Selbstständig"]} value={get('toilet')} onChange={(v: any) => set('toilet', v)} />
        <FormRadio label="Baden" options={["Abhängig", "Selbstständig"]} value={get('bathing')} onChange={(v: any) => set('bathing', v)} />
      </div>
      <FormInput label="Andere Pflegeanforderungen" value={get('otherCareNeeds')} onChange={(v: string) => set('otherCareNeeds', v)} />

      <div className="border-t pt-4">
        <FormRadio label="Transfer notwendig?" options={["Ja", "Nein"]} value={get('transferNeeded')} onChange={(v: any) => set('transferNeeded', v)} />
        {get('transferNeeded') === 'Ja' && (
          <FormRadio label="Bett-/Stuhltransfer" options={["Person kann mithelfen", "Person kann nicht mithelfen", "Heben erforderlich", "Erfordert 2 Personen"]} value={get('bedChairTransfer')} onChange={(v: any) => set('bedChairTransfer', v)} />
        )}
      </div>

      <div className="border-t pt-4">
        <FormRadio label="Essen" options={["Unfähig", "Braucht Hilfe", "Selbstständig"]} value={get('eating')} onChange={(v: any) => set('eating', v)} />
        <FormRadio label="Ernährung" options={["Traditionell", "Vegetarisch", "Sonstiges"]} value={get('diet')} onChange={(v: any) => set('diet', v)} />
        {get('diet') === 'Sonstiges' && (
           <FormInput label="Sonstige Diäten" value={get('otherDiets')} onChange={(v: string) => set('otherDiets', v)} />
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex flex-col gap-[6px] mb-4">
          <label className="text-[13px] font-semibold text-[#4a5568]">Tägliche Routine (bitte kurz beschreiben)</label>
          <textarea
            value={get('dailyRoutine')}
            onChange={(e) => set('dailyRoutine', e.target.value)}
            className="p-[10px] border border-[#e2e8f0] rounded-[6px] text-[14px] focus:outline-none focus:border-[#55618b] w-full"
            rows={3}
          />
        </div>
        
        <FormCheckboxGroup label="Spezielle Ausrüstung im Haus" options={equipmentOptions} selected={get('equipment')} onChange={(v: any) => set('equipment', v)} />
        <FormInput label="Andere Ausrüstung" value={get('otherEquipment')} onChange={(v: string) => set('otherEquipment', v)} />
      </div>

    </div>
  );
}
