import React, { ReactNode } from 'react'
import ErrorBoundary from '../../../ErrorBoundary'
import { AlertTriangle } from 'lucide-react'

interface ErrorBoundaryWrapperProps {
  children: ReactNode
  componentName?: string
  fallback?: ReactNode
}

const DefaultFallback: React.FC<{ componentName?: string }> = ({ componentName }) => (
  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
    <p className="text-red-300 text-sm">
      {componentName 
        ? `Error en ${componentName}` 
        : 'Error en el componente'
      }
    </p>
    <p className="text-red-400/70 text-xs mt-1">
      El componente no se pudo cargar correctamente
    </p>
  </div>
)

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({ 
  children, 
  componentName, 
  fallback 
}) => {
  const customFallback = fallback || <DefaultFallback componentName={componentName} />
  
  return (
    <ErrorBoundary fallback={customFallback}>
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryWrapper
