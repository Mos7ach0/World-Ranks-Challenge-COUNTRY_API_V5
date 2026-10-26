import { ReactNode, useState } from "react";
import { FormContext, TSort, TStatus } from "../Contexts/FormContext";

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [sort, setSort] = useState<TSort>()
    const [region, setRegion] = useState('')
    const [status, setStatus] = useState<TStatus[]>([])
    const [name, setName] = useState('')

    const handleToggleStatus = (s: TStatus) =>
        setStatus(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

    return (
        <FormContext.Provider
            value={{
                sort, region, status, name,
                handleSetSort: setSort,
                handleSetRegion: setRegion,
                handleToggleStatus,
                handleSetName: setName,
            }}>
            {children}
        </FormContext.Provider>
    )
}
