import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Country } from '../Service/worldRanks';

interface Props { countries: Country[]; loading: boolean; error: string | null }

export default function CountryTable({ countries, loading, error }: Props) {
  const flagTemplate = (c: Country) =>
    c.flag ? (
      <img src={c.flag} alt={c.name} style={{ width: '30px' }} />
    ) : (
      <span aria-label="No flag available">—</span>
    );

  return (
    <div className="card mt-4">
      {error && <p role="alert" className="text-red-400 mb-2">Could not load countries: {error}</p>}
      <DataTable
        value={countries}
        loading={loading}
        emptyMessage={error ? 'No data available' : 'No countries found'}
        tableStyle={{ minWidth: '50rem' }}
        scrollable
      >
        <Column field="flag" header="Flag" body={flagTemplate} />
        <Column field="name" header="Name" />
        <Column field="population" header="Population" body={(c: Country) => c.population.toLocaleString()} />
        <Column field="area" header="Area (km²)" body={(c: Country) => c.area.toLocaleString()} />
        <Column field="region" header="Region" />
      </DataTable>
    </div>
  );
}
