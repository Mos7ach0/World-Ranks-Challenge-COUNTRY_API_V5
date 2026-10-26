import { useContext } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { FormContext, TStatus } from '../Contexts/FormContext'

const OPTIONS: { id: string; label: string; value: TStatus }[] = [
  { id: 'un-status', label: 'Member of the United Nations', value: 'unMember' },
  { id: 'independent-status', label: 'Independent', value: 'independent' },
]

export const CustomStatusToggle = () => {
  const { status, handleToggleStatus } = useContext(FormContext)

  return (
    <div className="flex flex-col gap-3">
      <label className="font-medium mb-2">Status</label>
      {OPTIONS.map(({ id, label, value }) => (
        <div key={id} className="flex items-center gap-2">
          <Checkbox
            inputId={id}
            checked={status.includes(value)}
            onChange={() => handleToggleStatus(value)}
          />
          <label htmlFor={id} className="select-none cursor-pointer">{label}</label>
        </div>
      ))}
    </div>
  )
}
