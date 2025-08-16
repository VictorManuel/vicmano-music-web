import { useCallback } from 'react'

interface ErrorHandlerOptions {
  onError?: (error: Error, errorInfo?: any) => void
  logToConsole?: boolean
  showUserMessage?: boolean
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    onError,
    logToConsole = true,
    showUserMessage = true
  } = options

  const handleError = useCallback((error: Error, errorInfo?: any) => {
    // Log del error
    if (logToConsole) {
      console.error('Error handled by useErrorHandler:', error, errorInfo)
    }

    // Callback personalizado
    if (onError) {
      onError(error, errorInfo)
    }

    // Aquí podrías integrar con servicios de reporte de errores
    // como Sentry, LogRocket, etc.
    
    // Ejemplo de integración con servicio externo:
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { extra: errorInfo })
    // }
  }, [onError, logToConsole])

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    fallbackValue?: T
  ): Promise<T | undefined> => {
    try {
      return await asyncFn()
    } catch (error) {
      handleError(error as Error)
      return fallbackValue
    }
  }, [handleError])

  return {
    handleError,
    handleAsyncError
  }
}

// Hook específico para errores de formularios
export const useFormErrorHandler = () => {
  const { handleError } = useErrorHandler({
    logToConsole: true,
    showUserMessage: true
  })

  const handleFormError = useCallback((error: Error, fieldName?: string) => {
    const enhancedError = new Error(
      fieldName 
        ? `Error en el campo ${fieldName}: ${error.message}`
        : error.message
    )
    
    handleError(enhancedError, { fieldName, originalError: error })
  }, [handleError])

  return { handleFormError }
}

// Hook para errores de API
export const useApiErrorHandler = () => {
  const { handleError, handleAsyncError } = useErrorHandler({
    logToConsole: true,
    showUserMessage: true
  })

  const handleApiError = useCallback((error: Error, endpoint?: string) => {
    const enhancedError = new Error(
      endpoint 
        ? `Error en API ${endpoint}: ${error.message}`
        : `Error de API: ${error.message}`
    )
    
    handleError(enhancedError, { endpoint, originalError: error })
  }, [handleError])

  return { handleApiError, handleAsyncError }
}
