import { useContext } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { FormContext, TSort } from '../Contexts/FormContext';

const sortByData: { name: string; value: TSort }[] = [
  { name: 'Name', value: 'name' },
  { name: 'Population', value: 'population' },
  { name: 'Area', value: 'area' },
];

export const Filters = () => {
  const { sort, handleSetSort } = useContext(FormContext);

  return (
    <div className="flex flex-col w-full">
      <label>Sort by</label>
      <Dropdown
        options={sortByData}
        optionLabel="name"
        optionValue="value"
        value={sort ?? null}
        onChange={(e) => handleSetSort(e.value)}
        placeholder="Select a sort option"
        className="w-full"
      />
    </div>
  );
};
