import { useEffect, useState, useCallback } from "react"

type Data<T> = T | null
type ErrorType = Error | null

interface params<T> {
    data: Data<T>
    error: ErrorType
    loading: boolean
    refetch: (controller: AbortController) => void
}

export const useFetch = <T>({ url, autoFetch = true }: { url: string, autoFetch?: boolean }): params<T> => {
    const [data, setData] = useState(null as Data<T>)
    const [error, setError] = useState(null as ErrorType)
    const [loading, setLoading] = useState(false)

    const fetchData = useCallback(async (controller: AbortController) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(url, controller)
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

    const refetch = useCallback((controller: AbortController) => {
        fetchData(controller)
    }, [fetchData])

    useEffect(() => {
        const controller = new AbortController()

        if (autoFetch) {
            refetch(controller)
        }

        return () => {
            controller.abort()
        }

    }, [fetchData, autoFetch, refetch])

    return { data, error, loading, refetch }
}
