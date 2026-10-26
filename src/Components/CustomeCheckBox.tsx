import { useContext } from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import { FormContext } from '../Contexts/FormContext';

// label = lo que ve el usuario, value = lo que devuelve la API en el campo "region"
const REGIONS = [
  { label: 'Americas', value: 'Americas' },
  { label: 'Europe', value: 'Europe' },
  { label: 'Africa', value: 'Africa' },
  { label: 'Asia', value: 'Asia' },
  { label: 'Oceania', value: 'Oceania' },
  { label: 'Antarctica', value: 'Antarctic' },
];

export const Toggle = () => {
  const { region, handleSetRegion } = useContext(FormContext);

  return (
    <div className="flex flex-col gap-2">
      <label>Regiones</label>
      {REGIONS.map(({ label, value }) => (
        <ToggleButton
          key={value}
          checked={region === value}
          onChange={() => handleSetRegion(region === value ? '' : value)}
          onLabel={label}
          offLabel={label}
          className={`!border-none ${region === value ? 'rounded-md !bg-gray-300 text-black !ring-0 !outline-none' : ''}`}
        />
      ))}
    </div>
  );
};
