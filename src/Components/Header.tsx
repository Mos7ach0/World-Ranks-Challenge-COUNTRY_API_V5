import { useContext } from 'react'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { FormContext } from '../Contexts/FormContext'

export const Header = ({ count }: { count: number }) => {
  const { name, handleSetName } = useContext(FormContext)

  return (
    <div className='px-4 pt-6 flex flex-col md:flex-row items-center gap-6 md:gap-0'>
      <div className='mr-auto'>Found {count} countries</div>

      <IconField iconPosition='left'>
        <InputIcon className='pi pi-search'></InputIcon>
        <InputText
          className='h-[40px] !text-sm w-[100%] md:w-[309px]'
          placeholder='Search by Name, Region, Subregion'
          variant='filled'
          value={name}
          onChange={(e) => handleSetName(e.target.value)}
        />
      </IconField>
    </div>
  )
}
