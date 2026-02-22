import { createContext, useState, ReactNode, useContext } from "react"

interface GlobalContextType {
    value: number | null,
    setValue: React.Dispatch<React.SetStateAction<number>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextType>({
    value: null,
    setValue: () => { }
})

const EmptyGlobalState: number = 0


interface GlobalContextProps {
    children: ReactNode
}


export const GlobalProvider = ({ children }: GlobalContextProps) => {
    const [value, setValue] = useState<number>(EmptyGlobalState)

    return <GlobalContext.Provider value={{ value, setValue }}>{children}</GlobalContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    if (!context.value || context.value === EmptyGlobalState) {
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }
    return context
}