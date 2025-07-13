import { useEffect, useState, useCallback } from "react"

type Data<T> = T | null
type ErrorType = Error | null

interface params<T> {
    data: Data<T>
    error: ErrorType
    loading: boolean
    refetch: () => void
}

export const useFetch = <T>({ url, autoFetch = true }: { url: string, autoFetch?: boolean }): params<T> => {
    const [data, setData] = useState(null as Data<T>)
    const [error, setError] = useState(null as ErrorType)
    const [loading, setLoading] = useState(false)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json() as T
            setData(data)
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }
    }, [url])

    const refetch = useCallback(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
    }, [fetchData, autoFetch])

    return { data, error, loading, refetch }
}
