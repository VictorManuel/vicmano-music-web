# Hook useFetch

Un hook personalizado para manejar peticiones HTTP con funcionalidad de refetch manual.

## Características

- ✅ Fetch automático al montar el componente
- ✅ Fetch manual a través de función refetch
- ✅ Manejo de estados de loading, error y data
- ✅ Tipado con TypeScript
- ✅ Memoización con useCallback para optimización

## Uso Básico

```javascript
import { useFetch } from '../hooks/useFetch'

const MyComponent = () => {
  const { data, error, loading, refetch } = useFetch({
    url: 'https://api.example.com/data'
  })

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Datos: {JSON.stringify(data)}</p>}
      <button onClick={refetch}>Recargar</button>
    </div>
  )
}
```

## Opciones de Configuración

### autoFetch (opcional)
- **Tipo**: `boolean`
- **Por defecto**: `true`
- **Descripción**: Si es `true`, la petición se ejecuta automáticamente al montar el componente.

```javascript
// Auto-fetch (comportamiento por defecto)
const { data, refetch } = useFetch({
  url: 'https://api.example.com/data',
  autoFetch: true
})

// Solo fetch manual
const { data, refetch } = useFetch({
  url: 'https://api.example.com/data',
  autoFetch: false
})
```

## Valores Retornados

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `data` | `T \| null` | Datos de la respuesta |
| `error` | `Error \| null` | Error si la petición falla |
| `loading` | `boolean` | Estado de carga |
| `refetch` | `() => void` | Función para ejecutar la petición manualmente |

## Ejemplos de Uso

### 1. Fetch Automático con Refetch Manual
```javascript
const { data, error, loading, refetch } = useFetch({
  url: 'https://api.example.com/posts'
})

// La petición se ejecuta automáticamente al montar
// Puedes usar refetch() para recargar los datos
```

### 2. Solo Fetch Manual
```javascript
const { data, error, loading, refetch } = useFetch({
  url: 'https://api.example.com/users',
  autoFetch: false
})

// La petición NO se ejecuta automáticamente
// Solo se ejecuta cuando llamas a refetch()
```

### 3. Con Manejo de Estados
```javascript
const { data, error, loading, refetch } = useFetch({
  url: 'https://api.example.com/data'
})

if (loading) return <div>Cargando...</div>
if (error) return <div>Error: {error.message}</div>
if (!data) return <div>No hay datos</div>

return (
  <div>
    <h1>{data.title}</h1>
    <p>{data.description}</p>
    <button onClick={refetch}>Actualizar</button>
  </div>
)
```

## Casos de Uso Comunes

1. **Lista de datos con botón de actualizar**
2. **Formularios que necesitan recargar datos después de enviar**
3. **Dashboards que requieren datos en tiempo real**
4. **Componentes que necesitan datos solo bajo demanda** 