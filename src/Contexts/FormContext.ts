import { createContext } from "react";

export type TSort = 'name' | 'population' | 'area'
export type TStatus = 'unMember' | 'independent'

export type TFORMContext = {
    sort?: TSort,
    region: string,
    status: TStatus[],
    name: string,
    handleSetSort: (sort: TSort) => void,
    handleSetRegion: (region: string) => void,
    handleToggleStatus: (status: TStatus) => void,
    handleSetName: (name: string) => void
}

export const FormContext = createContext<TFORMContext>({
    region: '',
    status: [],
    name: '',
    handleSetSort: () => {},
    handleSetRegion: () => {},
    handleToggleStatus: () => {},
    handleSetName: () => {},
});
