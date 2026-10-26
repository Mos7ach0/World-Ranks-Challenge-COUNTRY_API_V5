import { Image } from 'primereact/image';
import HeroImage from '@/assets/hero-image.jpg';
import Logo from '@/assets/Logo.svg';
import { Card } from 'primereact/card';
import { useContext, useMemo } from 'react';
import { Header } from './Components/Header';
import { Filters } from './Components/Filters';
import { Toggle } from './Components/CustomeCheckBox';
import { CustomStatusToggle } from './Components/customStatus';
import { FormProvider } from './Providers/FormProvider';
import { FormContext } from './Contexts/FormContext';
import CountryTable from './Components/CountryTable';
import { useCountries } from './hooks/useCountries';
import { filterCountries } from './utils/filterCountries';

const MainApp = () => {
  const { sort, region, status, name } = useContext(FormContext);
  const { countries, loading, error } = useCountries();
  const visible = useMemo(
    () => filterCountries(countries, { name, region, status, sort }),
    [countries, name, region, status, sort]
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Hero Image & Logo */}
      <div className="flex flex-col">
        <div className="flex justify-center items-center relative">
          <Image src={HeroImage} />
          <Image className="absolute" src={Logo} />
        </div>
      </div>

      {/* Main Card Section */}
      <Card
        className="w-[95%] border border-[#1A1C20] shadow-none relative bottom-[70px]"
        header={<Header count={visible.length} />}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filters Section */}
          <div className="flex flex-col gap-4 w-full md:w-[260px]">
            <Filters />
            <Toggle />
            <CustomStatusToggle />
          </div>

          {/* Country Table Section */}
          <div className="w-full md:w-2/3">
            <CountryTable countries={visible} loading={loading} error={error} />
          </div>
        </div>

      </Card>
    </div>
  );
};

function App() {
  return (
    <FormProvider>
      <MainApp />
    </FormProvider>
  );
}

export default App;
