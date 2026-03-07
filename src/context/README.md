# Contextos de la Aplicación

Esta carpeta contiene los contextos de React utilizados en la aplicación para manejar el estado global y la internacionalización.

## 📁 Estructura

```
src/context/
├── README.md              # Este archivo
├── index.ts               # Exportaciones de todos los contextos
├── LanguageContext.tsx    # Contexto para internacionalización
└── GlobalContext.tsx      # Contexto global para estado compartido
```

## 🌍 LanguageContext

### Descripción

Contexto para manejar la internacionalización (i18n) de la aplicación. Permite cambiar entre idiomas y acceder a traducciones de forma dinámica.

### Características

- ✅ Cambio de idioma en tiempo real
- ✅ Persistencia en localStorage
- ✅ Detección automática del idioma del navegador
- ✅ Fallback a inglés si no hay traducción
- ✅ Soporte para múltiples secciones de contenido

### Uso Básico

#### 1. Configurar el Provider

```tsx
import { LanguageProvider } from "./context/LanguageContext"
import contentData from "./content.json"

function App() {
  return (
    <LanguageProvider initialContent={contentData}>
      <YourApp />
    </LanguageProvider>
  )
}
```

#### 2. Usar en Componentes

```tsx
import { useLanguage } from "./context/LanguageContext"

function MyComponent() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div>
      {/* Cambiar idioma */}
      <button onClick={() => setLanguage("es")}>
        Español
      </button>
      <button onClick={() => setLanguage("en")}>
        English
      </button>

      {/* Usar traducciones */}
      <h1>{t("title", "hero")}</h1>
      <p>{t("subtitle", "hero")}</p>
      
      {/* Sin especificar sección (busca en todas) */}
      <span>{t("common_button")}</span>
    </div>
  )
}
```

### Estructura del Contenido

El contenido debe seguir esta estructura:

```json
{
  "en": {
    "hero": {
      "title": "Vicmano",
      "subtitle": "A musical journey from minimal to electrifying dance"
    },
    "about": {
      "title": "About",
      "description": "Electronic music DJ"
    }
  },
  "es": {
    "hero": {
      "title": "Vicmano",
      "subtitle": "Un viaje musical del minimal al éxtasis electrónico"
    },
    "about": {
      "title": "Acerca de",
      "description": "DJ de música electrónica"
    }
  }
}
```

### API del Hook

```typescript
interface LanguageContextType {
  language: string                    // Idioma actual ("en" | "es")
  setLanguage: (lang: string) => void // Función para cambiar idioma
  t: (key: string, section?: string) => string // Función de traducción
  content: ContentData               // Contenido completo
}
```

### Métodos Disponibles

#### `t(key: string, section?: string)`

- **key**: Clave de la traducción
- **section**: (opcional) Sección específica donde buscar
- **returns**: Texto traducido o la clave si no se encuentra

```tsx
// Con sección específica
t("title", "hero") // Busca en content[language].hero.title

// Sin sección (busca en todas las secciones)
t("title") // Busca en todas las secciones del idioma actual
```

#### `setLanguage(lang: string)`

Cambia el idioma de la aplicación y lo guarda en localStorage.

#### `language`

String que indica el idioma actual ("en" o "es").

---

## 🌐 GlobalContext

### Descripción

Contexto global para manejar estado compartido entre componentes. Actualmente maneja un valor numérico simple, pero puede extenderse según las necesidades.

### Uso Básico

#### 1. Configurar el Provider

```tsx
import { GlobalProvider } from "./context/GlobalContext"

function App() {
  return (
    <GlobalProvider>
      <YourApp />
    </GlobalProvider>
  )
}
```

#### 2. Usar en Componentes

```tsx
import { useGlobalContext } from "./context/GlobalContext"

function MyComponent() {
  const { value, setValue } = useGlobalContext()

  return (
    <div>
      <p>Valor actual: {value}</p>
      <button onClick={() => setValue(value + 1)}>
        Incrementar
      </button>
      <button onClick={() => setValue(0)}>
        Resetear
      </button>
    </div>
  )
}
```

### API del Hook

```typescript
interface GlobalContextType {
  value: number                                    // Valor actual
  setValue: React.Dispatch<React.SetStateAction<number>> // Función para cambiar valor
}
```

---

## 🔧 Configuración Avanzada

### Combinar Múltiples Providers

```tsx
import { LanguageProvider } from "./context/LanguageContext"
import { GlobalProvider } from "./context/GlobalContext"

function App() {
  return (
    <LanguageProvider initialContent={contentData}>
      <GlobalProvider>
        <YourApp />
      </GlobalProvider>
    </LanguageProvider>
  )
}
```

### Extender GlobalContext

Para agregar más estado global, modifica `GlobalContext.tsx`:

```tsx
interface GlobalContextType {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  // Agregar nuevas propiedades
  user: User | null
  setUser: (user: User | null) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}
```

### Agregar Nuevos Idiomas

1. Agregar el idioma al contenido:

```json
{
  "fr": {
    "hero": {
      "title": "Vicmano",
      "subtitle": "Un voyage musical du minimal à la danse électrisante"
    }
  }
}
```

1. Actualizar la lógica de detección en `LanguageContext.tsx`:

```tsx
const browserLang = navigator.language.split("-")[0]
if (browserLang === "es") {
  setLanguage("es")
} else if (browserLang === "fr") {
  setLanguage("fr")
}
```

---

## 🚀 Mejores Prácticas

1. **Siempre usar los hooks**: No accedas directamente al contexto
2. **Manejar errores**: Los hooks incluyen validación de contexto
3. **Optimizar re-renders**: Usar `useMemo` o `useCallback` cuando sea necesario
4. **Estructurar contenido**: Organizar traducciones por secciones
5. **Fallbacks**: Siempre proporcionar valores por defecto

---

## 📝 Ejemplos Completos

### Componente con Ambos Contextos

```tsx
import { useLanguage } from "./context/LanguageContext"
import { useGlobalContext } from "./context/GlobalContext"

function ExampleComponent() {
  const { language, t } = useLanguage()
  const { value, setValue } = useGlobalContext()

  return (
    <div>
      <h2>{t("example_title", "examples")}</h2>
      <p>{t("current_value")}: {value}</p>
      <button onClick={() => setValue(value + 1)}>
        {t("increment", "buttons")}
      </button>
    </div>
  )
}
```

### Configuración Completa de App

```tsx
import { LanguageProvider } from "./context/LanguageContext"
import { GlobalProvider } from "./context/GlobalContext"
import contentData from "./content.json"

function App() {
  return (
    <LanguageProvider initialContent={contentData}>
      <GlobalProvider>
        <div className="App">
          <Header />
          <main>
            <Home />
          </main>
        </div>
      </GlobalProvider>
    </LanguageProvider>
  )
}
```
