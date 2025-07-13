import React from 'react'
import { useFetch } from '../hooks/useFetch'

// Ejemplo de uso del hook useFetch con refetch
const ExampleFetchComponent = () => {
  // Ejemplo 1: Auto-fetch al cargar el componente
  const { 
    data: autoData, 
    error: autoError, 
    loading: autoLoading, 
    refetch: refetchAuto 
  } = useFetch({
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    autoFetch: true // Se ejecuta automáticamente al montar el componente
  })

  // Ejemplo 2: Solo fetch manual (no se ejecuta automáticamente)
  const { 
    data: manualData, 
    error: manualError, 
    loading: manualLoading, 
    refetch: refetchManual 
  } = useFetch({
    url: 'https://jsonplaceholder.typicode.com/users/1',
    autoFetch: false // No se ejecuta automáticamente
  })

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Ejemplo de useFetch con Refetch</h2>
      
      {/* Ejemplo 1: Auto-fetch */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Auto-fetch (se ejecuta al cargar)</h3>
        {autoLoading && <p className="text-blue-600">Cargando datos automáticamente...</p>}
        {autoError && <p className="text-red-600">Error: {autoError.message}</p>}
        {autoData && (
          <div>
            <p className="text-green-600">Datos cargados automáticamente:</p>
            <pre className="bg-white p-2 rounded text-sm">{JSON.stringify(autoData, null, 2)}</pre>
          </div>
        )}
        <button 
          onClick={refetchAuto}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refetch Manual
        </button>
      </div>

      {/* Ejemplo 2: Solo fetch manual */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Fetch Manual (solo con botón)</h3>
        {manualLoading && <p className="text-blue-600">Cargando datos manualmente...</p>}
        {manualError && <p className="text-red-600">Error: {manualError.message}</p>}
        {manualData && (
          <div>
            <p className="text-green-600">Datos cargados manualmente:</p>
            <pre className="bg-white p-2 rounded text-sm">{JSON.stringify(manualData, null, 2)}</pre>
          </div>
        )}
        <button 
          onClick={refetchManual}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Cargar Datos
        </button>
      </div>
    </div>
  )
}

export default ExampleFetchComponent 