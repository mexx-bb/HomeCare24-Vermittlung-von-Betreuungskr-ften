import { FormData } from '../types';

export const FormInput = ({ label, value, onChange, type = "text", required = false }: any) => (
  <div className="flex flex-col gap-[6px] mb-4">
    <label className="text-[13px] font-semibold text-[#4a5568]">{label} {required && <span className="text-red-500">*</span>}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-[10px] border border-[#e2e8f0] rounded-[6px] text-[14px] focus:outline-none focus:border-[#55618b] w-full"
      required={required}
    />
  </div>
);

export const FormRadio = ({ label, options, value, onChange, required = false }: any) => (
  <div className="flex flex-col gap-[6px] mb-4">
    <label className="text-[13px] font-semibold text-[#4a5568]">{label} {required && <span className="text-red-500">*</span>}</label>
    <div className="flex flex-wrap gap-[20px] py-[5px]">
      {options.map((opt: string) => (
        <label key={opt} className="flex items-center gap-[8px] text-[14px] cursor-pointer">
          <input
            type="radio"
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="accent-[#55618b] scale-110"
            required={required}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

export const FormCheckbox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-[8px] text-[14px] cursor-pointer mb-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="accent-[#55618b] scale-110"
    />
    <span className="font-semibold text-[#4a5568]">{label}</span>
  </label>
);

export const FormCheckboxGroup = ({ label, options, selected, onChange }: any) => {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((item: string) => item !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="flex flex-col gap-[6px] mb-4">
      <label className="text-[13px] font-semibold text-[#4a5568]">{label}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-[5px]">
        {options.map((opt: string) => (
          <label key={opt} className="flex items-start gap-[8px] text-[14px] cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
              className="accent-[#55618b] scale-110 mt-1"
            />
            <span className="leading-tight">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
