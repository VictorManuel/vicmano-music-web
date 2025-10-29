# 📚 Documentación Técnica - Vicmano Music Web

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Arquitectura](#arquitectura)
5. [Componentes Principales](#componentes-principales)
6. [Contextos y Estado Global](#contextos-y-estado-global)
7. [Servicios](#servicios)
8. [Hooks Personalizados](#hooks-personalizados)
9. [Internacionalización](#internacionalización)
10. [Configuración](#configuración)
11. [Flujo de Datos](#flujo-de-datos)
12. [Guía de Desarrollo](#guía-de-desarrollo)

---

## Descripción General

**Vicmano Music Web** es un sitio web portfolio para el DJ **Vicmano**, especializado en Tech House, Minimal Techno y Hard Techno. El proyecto sirve como portfolio digital y presskit, permitiendo explorar música, eventos pasados, galería de imágenes, contacto directo e integración con Instagram.

### Características Principales

- ✅ Portfolio interactivo con múltiples secciones
- ✅ Sistema de internacionalización (ES/EN)
- ✅ Formulario de contacto
- ✅ Integración con Instagram
- ✅ Diseño responsive con TailwindCSS
- ✅ Animaciones con Framer Motion
- ✅ Partículas interactivas de fondo
- ✅ Página Linktree personalizada

---

## Tecnologías Utilizadas

### Core
- **React 18.2.0** - Biblioteca de UI
- **TypeScript 4.9.5** - Tipado estático
- **Vite 5.2.10** - Build tool y dev server

### Estilos y UI
- **TailwindCSS 4.1.12** - Framework CSS utility-first
- **Framer Motion 10.16.4** - Animaciones
- **Lucide React 0.292.0** - Iconos

### Routing y Formularios
- **React Router DOM 7.8.2** - Enrutamiento
- **React Hook Form 7.60.0** - Manejo de formularios
- **Zod 4.0.5** - Validación de esquemas
- **@hookform/resolvers 5.1.1** - Integración Zod + React Hook Form

### Efectos Visuales
- **React Particles 2.12.2** - Sistema de partículas
- **TSParticles Slim 2.12.0** - Motor de partículas

### Testing (Preparado)
- **@testing-library/react 13.3.0**
- **@testing-library/jest-dom 5.16.4**
- **@testing-library/user-event 13.5.0**

---

## Estructura del Proyecto

```
vicmano-music-web/
├── public/                    # Archivos estáticos públicos
│   ├── images/               # Imágenes del sitio
│   ├── fonts/                # Fuentes personalizadas
│   ├── favicon/              # Favicons y manifest
│   └── _redirects            # Configuración de redirects (Netlify)
│
├── src/
│   ├── components/           # Componentes React
│   │   ├── common/          # Componentes reutilizables
│   │   │   ├── CustomForm/  # Formulario genérico (no usado actualmente)
│   │   │   ├── ErrorBoundaryWrapper/ # Wrapper para error boundaries
│   │   │   ├── Footer/      # Footer del sitio
│   │   │   ├── Header/      # Header con navegación
│   │   │   ├── Motion/      # Componentes con animaciones
│   │   │   └── index.ts     # Barrel exports
│   │   ├── sections/        # Secciones principales de la página
│   │   │   ├── AboutSection/      # Sección "Sobre mí"
│   │   │   ├── ContactSection/    # Sección de contacto
│   │   │   ├── GallerySection/    # Galería de fotos/videos
│   │   │   ├── HeroSection/       # Hero section principal
│   │   │   ├── InstagramSection/  # Integración con Instagram
│   │   │   ├── MusicSection/      # Sección de música
│   │   │   ├── PresskitSection/   # Presskit descargable
│   │   │   ├── ShowsSection/      # Próximos shows
│   │   │   └── index.ts           # Barrel exports
│   │   ├── ExampleFetchComponent/ # Componente de ejemplo
│   │   └── ParticleBackground/    # Fondo de partículas
│   │
│   ├── context/              # Contextos de React
│   │   ├── GlobalContext.tsx      # Contexto global (valor numérico)
│   │   ├── LanguageContext.tsx     # Contexto de idioma
│   │   ├── index.ts                # Barrel exports
│   │   └── README.md               # Documentación de contextos
│   │
│   ├── hooks/                # Hooks personalizados
│   │   ├── useErrorHandler.ts      # Manejo de errores
│   │   ├── useFetch.ts             # Fetch con estados
│   │   ├── index.ts                # Barrel exports
│   │   └── README.md               # Documentación de hooks
│   │
│   ├── models/               # Modelos y tipos TypeScript
│   │   ├── form.model.ts           # Schema de formulario (Zod)
│   │   └── index.ts                # Barrel exports
│   │
│   ├── pages/                # Páginas principales
│   │   ├── home.tsx                # Página principal
│   │   ├── LinktreePage.tsx       # Página estilo Linktree
│   │   └── index.ts               # Barrel exports
│   │
│   ├── services/              # Servicios de API
│   │   ├── contact.service.ts     # Servicio de contacto (Formspree/GAS)
│   │   ├── share-value-children.service.ts # Utilidad compartida
│   │   └── index.ts               # Barrel exports
│   │
│   ├── styles/               # Estilos globales
│   │   └── globals.css            # Estilos CSS globales
│   │
│   ├── utils/                # Utilidades
│   │   └── imagePaths.ts          # Utilidad para rutas de imágenes
│   │
│   ├── App.tsx               # Componente raíz de la aplicación
│   ├── ErrorBoundary.tsx     # Error boundary principal
│   ├── index.tsx             # Punto de entrada
│   ├── index.css             # Estilos base
│   └── content.json          # Contenido multiidioma
│
├── docs/                     # Documentación adicional
│   ├── PROBLEMAS_ENCONTRADOS.md   # Lista de problemas encontrados
│   └── ai-reference/              # Referencias para IA
│
├── dist/                     # Build de producción (generado)
├── node_modules/             # Dependencias
├── .gitignore                # Archivos ignorados por Git
├── index.html                # HTML principal
├── package.json              # Dependencias y scripts
├── postcss.config.js         # Configuración PostCSS
├── tailwind.config.js        # Configuración TailwindCSS
├── tsconfig.json             # Configuración TypeScript
├── vite.config.js           # Configuración Vite
└── README.md                 # README principal
```

---

## Arquitectura

### Patrón de Arquitectura

El proyecto sigue una **arquitectura de componentes modular** con separación de responsabilidades:

1. **Presentación**: Componentes en `components/`
2. **Lógica de Negocio**: Servicios en `services/`
3. **Estado Global**: Contextos en `context/`
4. **Lógica Reutilizable**: Hooks en `hooks/`
5. **Tipos y Validación**: Modelos en `models/`
6. **Utilidades**: Funciones helper en `utils/`

### Flujo de Datos

```
Usuario → Componente → Context/Hook → Servicio → API Externa
                ↓
          Estado Local
                ↓
          Re-render
```

### Principios de Diseño

- **Componentes Funcionales**: Todo el código usa funciones en lugar de clases
- **TypeScript Estricto**: Tipado fuerte para prevenir errores
- **Barrel Exports**: Uso de `index.ts` para exportaciones limpias
- **Separación de Concerns**: Cada módulo tiene una responsabilidad clara

---

## Componentes Principales

### App.tsx

Componente raíz que configura:
- Router de React Router
- LanguageProvider para internacionalización
- ErrorBoundary para captura de errores
- Rutas principales (`/` y `/links`)

```typescript
- ErrorBoundary
  └── LanguageProvider
      └── Router
          ├── Route "/" → Home + Header
          └── Route "/links" → LinktreePage
```

### Páginas

#### Home (`pages/home.tsx`)
Página principal que combina todas las secciones:
- HeroSection
- AboutSection
- ContactSection
- (Otras secciones comentadas)

#### LinktreePage (`pages/LinktreePage.tsx`)
Página estilo Linktree con enlaces a redes sociales y servicios.

### Secciones (`components/sections/`)

Cada sección es un componente independiente que se puede incluir en la página principal:

- **HeroSection**: Primera sección con título y animaciones
- **AboutSection**: Información sobre Vicmano
- **ContactSection**: Formulario de contacto y links
- **GallerySection**: Galería de imágenes (comentada)
- **MusicSection**: Integración de música (comentada)
- **ShowsSection**: Próximos eventos (comentada)
- **PresskitSection**: Descarga de presskit (comentada)
- **InstagramSection**: Feed de Instagram (comentada)

### Componentes Comunes (`components/common/`)

- **Header**: Navegación principal con menú responsive
- **Footer**: Footer del sitio (comentado actualmente)
- **MotionDiv**: Wrapper para animaciones con Framer Motion
- **ErrorBoundaryWrapper**: Wrapper para manejo de errores por componente
- **CustomForm**: Formulario genérico (no usado actualmente)

---

## Contextos y Estado Global

### LanguageContext

**Ubicación:** `src/context/LanguageContext.tsx`

Maneja el sistema de internacionalización:

**Funcionalidades:**
- Guarda la preferencia de idioma en `localStorage`
- Detecta el idioma del navegador
- Proporciona función `t()` para traducciones
- Actualiza el contenido dinámicamente

**Uso:**
```typescript
const { language, setLanguage, t } = useLanguage()
const title = t("title", "hero") // Obtiene traducción de la sección hero
```

**Estructura de contenido:**
```json
{
  "es": {
    "hero": { "title": "...", "subtitle": "..." },
    "about": { "title": "...", "text": "..." },
    ...
  },
  "en": { ... }
}
```

### GlobalContext

**Ubicación:** `src/context/GlobalContext.tsx`

Contexto global para compartir un valor numérico entre componentes.

**Nota:** Actualmente tiene un problema de validación que debería corregirse (ver `PROBLEMAS_ENCONTRADOS.md`).

---

## Servicios

### Contact Service

**Ubicación:** `src/services/contact.service.ts`

Maneja el envío de formularios de contacto.

**Funciones:**

1. **`sendContactFormspree`**: Envía a Formspree
   - Endpoint configurable (actualmente placeholder)
   - FormData como body
   - Timeout de 15 segundos

2. **`sendContactGoogleAppsScript`**: Envía a Google Apps Script
   - Endpoint hardcodeado (⚠️ debería moverse a variables de entorno)
   - JSON como body
   - Timeout de 15 segundos

**Interfaces:**
```typescript
interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ContactResponse {
  success: boolean
  message: string
}
```

---

## Hooks Personalizados

### useFetch

**Ubicación:** `src/hooks/useFetch.ts`

Hook para realizar peticiones HTTP con estados de carga y error.

### useErrorHandler

**Ubicación:** `src/hooks/useErrorHandler.ts`

Hook para manejo centralizado de errores.

---

## Internacionalización

### Sistema de Traducciones

El sistema de traducciones funciona con:

1. **`content.json`**: Archivo JSON con todas las traducciones
2. **`LanguageContext`**: Contexto que proporciona la función `t()`
3. **Detección automática**: Detecta el idioma del navegador
4. **Persistencia**: Guarda la preferencia en localStorage

### Estructura de Traducciones

```json
{
  "es": {
    "hero": {
      "title": "Vicmano",
      "subtitle": "..."
    },
    "about": {
      "title": "Sobre mí",
      "text": "..."
    }
  },
  "en": { ... }
}
```

### Uso en Componentes

```typescript
const { t, language } = useLanguage()
const title = t("title", "hero") // Especifica sección
const message = t("text") // Busca en todas las secciones
```

---

## Configuración

### Vite (`vite.config.js`)

```javascript
{
  plugins: [react()],
  base: '/',
  server: { open: true },
  resolve: {
    alias: { '@': '/src' }
  }
}
```

### TypeScript (`tsconfig.json`)

- Target: ES5
- Module: ESNext
- JSX: react-jsx
- Strict mode habilitado
- Incluye solo `src/`

### TailwindCSS (`tailwind.config.js`)

**Configuraciones personalizadas:**
- Fuente: `Audiowide`
- Color: `purple-950: #13001f`
- Animaciones: `pulse-slow`, `fade-in-up`

### PostCSS (`postcss.config.js`)

Configurado para usar TailwindCSS y Autoprefixer.

---

## Flujo de Datos

### Inicialización de la Aplicación

1. `index.tsx` renderiza `App`
2. `App.tsx` envuelve todo en `ErrorBoundary`
3. `LanguageProvider` inicializa y carga idioma desde localStorage
4. `Router` configura las rutas
5. Componentes se renderizan según la ruta

### Flujo de Traducciones

```
LanguageContext (estado: language)
    ↓
content.json (carga inicial)
    ↓
t(key, section) busca traducción
    ↓
Retorna string traducido
```

### Flujo de Formulario de Contacto

```
Usuario completa formulario
    ↓
ContactSection maneja submit
    ↓
Llama a sendContactFormspree()
    ↓
Servicio hace fetch a Formspree
    ↓
Maneja respuesta y muestra feedback
```

---

## Guía de Desarrollo

### Instalación

```bash
# Clonar repositorio
git clone <repo-url>

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo (puerto 5173)
- `npm run build` - Genera build de producción en `dist/`
- `npm run preview` - Previsualiza el build de producción
- `npm test` - Ejecuta tests (actualmente no configurado)

### Agregar Nueva Sección

1. Crear componente en `src/components/sections/NuevaSection/`
2. Exportar en `src/components/sections/index.ts`
3. Importar y usar en `src/pages/home.tsx`
4. Agregar traducciones en `src/content.json`
5. Agregar ruta de navegación en `Header.tsx` si es necesario

### Agregar Nueva Traducción

1. Abrir `src/content.json`
2. Agregar clave en ambas secciones (`es` y `en`)
3. Usar `t("clave", "seccion")` en el componente

### Manejo de Imágenes

**Usar la utilidad de imágenes:**

```typescript
import { IMAGES, getImagePath } from '@/utils/imagePaths'

// Usar imagen predefinida
<img src={IMAGES.logo()} alt="Logo" />

// Usar imagen personalizada
<img src={getImagePath('mi-imagen.png')} alt="Mi imagen" />
```

**Ubicación de imágenes:**
- Colocar imágenes en `public/images/`
- Referenciarlas con `/images/nombre-imagen.png`

### Convenciones de Código

- **Componentes**: Usar `FC` de React o funciones con tipo explícito
- **Exports**: Preferir named exports sobre default exports
- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Tipos**: Interfaces para objetos, types para uniones/primitivos

### Estructura de un Componente

```typescript
import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface ComponentProps {
  // props aquí
}

export const Component: FC<ComponentProps> = () => {
  const { t } = useLanguage()
  
  return (
    <section>
      {/* JSX aquí */}
    </section>
  )
}
```

---

## Despliegue

### Build de Producción

```bash
npm run build
```

El build se genera en `dist/` y está listo para desplegar.

### Plataformas Recomendadas

- **Netlify**: Configuración automática con `_redirects`
- **Vercel**: Despliegue automático desde Git
- **GitHub Pages**: Requiere workflow de GitHub Actions (ver README)

### Variables de Entorno

Actualmente no se usan variables de entorno, pero deberían implementarse para:
- Endpoints de API (Formspree, Google Apps Script)
- URLs de servicios externos
- Configuraciones sensibles

**Recomendación:** Crear `.env.example` y documentar variables necesarias.

---

## Próximos Pasos Recomendados

1. ✅ Corregir problemas listados en `PROBLEMAS_ENCONTRADOS.md`
2. ✅ Implementar variables de entorno
3. ✅ Configurar tests con Vitest
4. ✅ Mejorar manejo de errores (Toast notifications)
5. ✅ Activar formulario de contacto o eliminarlo
6. ✅ Descomentar secciones comentadas o eliminarlas
7. ✅ Crear workflow de GitHub Actions si se usa GitHub Pages

---

## Referencias

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Última actualización:** Diciembre 2024
**Versión del proyecto:** 0.1.0

